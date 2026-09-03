#!/usr/bin/env node
import fs from "node:fs";

function usage() {
  console.log(`Usage:
  node "05 Tooling/scripts/create-qase-test-run.mjs" --plan <path> --dry-run
  node "05 Tooling/scripts/create-qase-test-run.mjs" --plan <path> --apply
  node "05 Tooling/scripts/create-qase-test-run.mjs" --verify <run-id>
  node "05 Tooling/scripts/create-qase-test-run.mjs" --verify <run-id> --plan <path>

Plan format:
  {
    "title": "Transaction Selection Totals Permission",
    "description": "Optional run description",
    "caseIds": [5095, 5096, 5097],
    "environmentSlug": "optional-environment-slug",
    "milestoneId": 123,
    "tags": ["transactions"]
  }

Notes:
  --dry-run is the default and does not call Qase.
  --apply creates one run with include_all_cases=false, then reads it back and verifies the exact unique case IDs.
  --verify reads an existing run. Add --plan to verify its unique case IDs against the plan.
  Parameterized cases appear more than once in Qase run membership. Verification reports both unique cases and expanded executions.
  Omit environment, milestone, plan, and tags unless the requested run explicitly needs them.
  .env must provide QASE_TESTOPS_API_TOKEN or QASE_API_TOKEN, plus QASE_PROJECT_CODE.`);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    if (["apply", "dry-run", "help"].includes(key)) {
      args[key] = true;
      continue;
    }
    args[key] = argv[index + 1];
    index += 1;
  }
  return args;
}

function loadEnv() {
  if (!fs.existsSync(".env")) return;

  const envText = fs.readFileSync(".env", "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}

function requireQaseEnv() {
  loadEnv();
  const token = process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN;
  const project = process.env.QASE_PROJECT_CODE;
  if (!token || !project) {
    throw new Error("Missing Qase token or project code in .env");
  }
  return { token, project };
}

function requiredString(value, field) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing or invalid ${field}`);
  }
  return value.trim();
}

function optionalPositiveInteger(value, field) {
  if (value === undefined || value === null || value === "") return undefined;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`${field} must be a positive integer`);
  }
  return number;
}

function normalizeCaseIds(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("caseIds must be a non-empty array of Qase case IDs");
  }

  const caseIds = values.map((value) => optionalPositiveInteger(value, "case ID"));
  const uniqueCaseIds = [...new Set(caseIds)];
  if (uniqueCaseIds.length !== caseIds.length) {
    throw new Error("caseIds contains duplicates; list every Qase case once");
  }
  return caseIds;
}

function normalizeTags(values) {
  if (values === undefined || values === null) return undefined;
  if (!Array.isArray(values)) throw new Error("tags must be an array of strings");
  const tags = values.map((value) => requiredString(value, "tag"));
  return tags.length > 0 ? tags : undefined;
}

function readPlan(planPath) {
  if (!planPath) throw new Error("Missing --plan");
  const parsed = JSON.parse(fs.readFileSync(planPath, "utf8"));
  const environmentId = optionalPositiveInteger(
    parsed.environmentId ?? parsed.environment_id,
    "environmentId"
  );
  const environmentSlug = parsed.environmentSlug ?? parsed.environment_slug;

  if (environmentId && environmentSlug) {
    throw new Error("Use environmentId or environmentSlug, not both");
  }

  return {
    title: requiredString(parsed.title, "title"),
    description:
      parsed.description === undefined
        ? undefined
        : requiredString(parsed.description, "description"),
    caseIds: normalizeCaseIds(parsed.caseIds ?? parsed.case_ids ?? parsed.cases),
    environmentId,
    environmentSlug:
      environmentSlug === undefined
        ? undefined
        : requiredString(environmentSlug, "environmentSlug"),
    milestoneId: optionalPositiveInteger(
      parsed.milestoneId ?? parsed.milestone_id,
      "milestoneId"
    ),
    planId: optionalPositiveInteger(parsed.planId ?? parsed.plan_id, "planId"),
    tags: normalizeTags(parsed.tags),
  };
}

function buildPayload(plan) {
  return {
    title: plan.title,
    ...(plan.description ? { description: plan.description } : {}),
    include_all_cases: false,
    cases: plan.caseIds,
    ...(plan.environmentId ? { environment_id: plan.environmentId } : {}),
    ...(plan.environmentSlug ? { environment_slug: plan.environmentSlug } : {}),
    ...(plan.milestoneId ? { milestone_id: plan.milestoneId } : {}),
    ...(plan.planId ? { plan_id: plan.planId } : {}),
    ...(plan.tags ? { tags: plan.tags } : {}),
  };
}

function summarizePayload(payload) {
  return {
    title: payload.title,
    description: payload.description ?? null,
    include_all_cases: payload.include_all_cases,
    unique_case_count: payload.cases.length,
    case_ids: payload.cases,
    environment_id: payload.environment_id ?? null,
    environment_slug: payload.environment_slug ?? null,
    milestone_id: payload.milestone_id ?? null,
    plan_id: payload.plan_id ?? null,
    tags: payload.tags ?? [],
  };
}

async function qaseRequest(path, options = {}) {
  const { token, project } = requireQaseEnv();
  const urlPath = path.replace("{project}", encodeURIComponent(project));
  const response = await fetch(`https://api.qase.io/v1${urlPath}`, {
    ...options,
    headers: {
      Token: token,
      "Cache-Control": "no-cache",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers ?? {}),
    },
  });

  const text = await response.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text };
  }

  if (!response.ok || body.status === false) {
    const error = new Error(`Qase request failed: HTTP ${response.status}`);
    error.response = body;
    throw error;
  }

  return { status: response.status, body };
}

function extractRunCaseId(value) {
  if (Number.isInteger(value)) return value;
  const candidate = value?.id ?? value?.case_id;
  return optionalPositiveInteger(candidate, "run case ID");
}

function summarizeRun(run, project) {
  const executionCaseIds = (run.cases ?? []).map(extractRunCaseId);
  const uniqueCaseIds = [...new Set(executionCaseIds)].sort((left, right) => left - right);
  const executionCountsByCase = uniqueCaseIds.map((caseId) => ({
    case_id: caseId,
    executions: executionCaseIds.filter((value) => value === caseId).length,
  }));

  return {
    id: run.id,
    title: run.title,
    status: run.status,
    environment: run.environment ?? null,
    unique_case_count: uniqueCaseIds.length,
    unique_case_ids: uniqueCaseIds,
    execution_count: executionCaseIds.length,
    execution_counts_by_case: executionCountsByCase,
    url: `https://app.qase.io/run/${encodeURIComponent(project)}/dashboard/${run.id}`,
  };
}

function assertExpectedCaseIds(expectedCaseIds, actualCaseIds) {
  const expected = [...expectedCaseIds].sort((left, right) => left - right);
  if (JSON.stringify(expected) !== JSON.stringify(actualCaseIds)) {
    throw new Error(
      `Qase run verification failed: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actualCaseIds)}`
    );
  }
}

async function readRun(runId) {
  const verifiedRunId = optionalPositiveInteger(runId, "run ID");
  const { project } = requireQaseEnv();
  const { body } = await qaseRequest(
    `/run/{project}/${verifiedRunId}?include=cases`
  );
  return summarizeRun(body.result, project);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }
  if (args.apply && args["dry-run"]) {
    throw new Error("Use --dry-run or --apply, not both");
  }

  if (args.verify) {
    const run = await readRun(args.verify);
    if (args.plan) {
      const plan = readPlan(args.plan);
      assertExpectedCaseIds(plan.caseIds, run.unique_case_ids);
    }
    console.log(
      JSON.stringify(
        {
          mode: "verify-run",
          verified_against_plan: Boolean(args.plan),
          run,
        },
        null,
        2
      )
    );
    return;
  }

  if (!args.plan) {
    usage();
    process.exitCode = 1;
    return;
  }

  const plan = readPlan(args.plan);
  const payload = buildPayload(plan);
  if (!args.apply) {
    console.log(
      JSON.stringify(
        {
          mode: "dry-run-create-test-run",
          qase_write: false,
          qase_will_assign_run_id: true,
          run: summarizePayload(payload),
        },
        null,
        2
      )
    );
    return;
  }

  const { status, body } = await qaseRequest("/run/{project}", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const createdRunId = optionalPositiveInteger(body.result?.id, "created run ID");
  const run = await readRun(createdRunId);
  assertExpectedCaseIds(plan.caseIds, run.unique_case_ids);

  console.log(
    JSON.stringify(
      {
        mode: "apply-create-test-run",
        ok: true,
        http_status: status,
        created_run_id: createdRunId,
        run,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message);
  if (error.response) console.error(JSON.stringify(error.response, null, 2));
  process.exitCode = 1;
});
