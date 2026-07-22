#!/usr/bin/env node
import fs from "node:fs";

const DEFAULT_TYPE = 1;
const DEFAULT_BEHAVIOR = 1;
const DEFAULT_LAYER = 0;

const PRIORITY = {
  high: 1,
  medium: 2,
  low: 3,
};

function usage() {
  console.log(`Usage:
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-id <id> --case-file <path> --case-number <n> --dry-run
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-id <id> --case-file <path> --case-number <n> --apply
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-id <id> --case-file <path> --case-number <n> --update <case-id> --dry-run
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-id <id> --case-file <path> --case-number <n> --update <case-id> --apply
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-id <id> --case-file <path> --case-number <n> --update <case-id> --only-fields <field,...> --dry-run
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --batch-plan <path> --dry-run
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --batch-plan <path> --apply
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-id <id> --case-file <path> --case-number <n> --update <case-id> --parameters-file <path> --dry-run
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --verify <case-id>
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --delete <case-id> --apply
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-info <suite-id>

Notes:
  --case-number maps to a local markdown label such as "TC-1:" or "### Test Case 1:".
  Local labels are not Qase case IDs. Qase assigns a new ID on create.
  --update must only be used with an existing Qase case ID.
  --only-fields limits a single-case update to the named payload fields and preserves all other live Qase fields.
  --dry-run is the default for create payloads.
  --apply is required before creating or updating a Qase case.
  --delete requires --apply and must only be used after explicit user confirmation.
  --batch-plan runs multiple create/update operations in one process, including apply-time verification.
  --parameters-file sends an explicit Qase parameters payload, including true grouped parameters.
  Markdown Parameters are sent as Qase single params. Keep Platform/View in the description table unless a grouped-param workflow is explicitly requested.
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

function extractCase(markdown, caseNumber) {
  const heading = new RegExp(
    `^(?:### Test Case ${caseNumber}: .*|TC-${caseNumber}: .*)$`,
    "m"
  );
  const match = markdown.match(heading);
  if (!match || match.index === undefined) {
    throw new Error(`Could not find local test case ${caseNumber}`);
  }

  const rest = markdown.slice(match.index);
  const nextCase = rest
    .slice(match[0].length)
    .search(/^(?:### Test Case \d+:|TC-\d+:)/m);
  return nextCase === -1
    ? rest.trim()
    : rest.slice(0, match[0].length + nextCase).trim();
}

function getTitle(section) {
  const explicitTitle = getBoldField(section, "Title", false);
  if (explicitTitle) return explicitTitle;

  const headingMatch = section.match(/^(?:### Test Case \d+:|TC-\d+:)\s*(.*)$/m);
  if (!headingMatch?.[1]) throw new Error("Missing field: Title");
  return headingMatch[1].trim();
}

function getBoldField(section, label, required = true) {
  const regex = new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.*)$`, "m");
  const match = section.match(regex);
  if (!match && required) throw new Error(`Missing field: ${label}`);
  return match?.[1]?.trim() ?? "";
}

function getBlockAfterLabel(section, label) {
  const start = section.search(new RegExp(`^\\*\\*${label}:\\*\\*$`, "m"));
  if (start === -1) return "";
  const after = section.slice(start).split(/\r?\n/).slice(1);
  const lines = [];
  for (const line of after) {
    if (!line.trim()) {
      if (lines.length > 0) break;
      continue;
    }
    if (/^\*\*[^*]+:\*\*/.test(line) || /^### /.test(line)) break;
    lines.push(line);
  }
  return lines.join("\n").trim();
}

function getLongTextField(section, label) {
  return getBoldField(section, label, false) || getBlockAfterLabel(section, label);
}

function getDescription(section) {
  const description = getBoldField(section, "Description");
  const lines = section.split(/\r?\n/);
  const descriptionIndex = lines.findIndex((line) =>
    line.startsWith("**Description:**")
  );
  const additionalLines = [];
  for (let index = descriptionIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\*\*[^*]+:\*\*/.test(line) || /^### /.test(line)) break;
    additionalLines.push(line);
  }
  const additional = additionalLines.join("\n").trim();
  return additional ? `${description}\n\n${additional}` : description;
}

function parseTags(section) {
  return getBoldField(section, "Tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseParams(section) {
  const block = getBlockAfterLabel(section, "Parameters");
  if (!block) return undefined;

  const params = block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, valuesText] = line.split(":");
      if (!title || !valuesText) {
        throw new Error(`Invalid parameter line: ${line}`);
      }
      return {
        title: title.trim(),
        values: valuesText
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      };
    });

  return params.length > 0 ? params : undefined;
}

function formatParamsForQase(params) {
  if (!params) return undefined;
  return Object.fromEntries(params.map((param) => [param.title, param.values]));
}

function parseMarkdownTableRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return null;
  return trimmed
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function parseSteps(section) {
  let start = section.search(/^\*\*Steps:\*\*$/m);
  if (start === -1) {
    start = section.search(/^\| Step Action \| Data \| Expected Result \|$/m);
  }
  if (start === -1) throw new Error("Missing Steps block");

  const rows = [];
  for (const line of section.slice(start).split(/\r?\n/)) {
    const cells = parseMarkdownTableRow(line);
    if (!cells) continue;
    if (cells.length !== 3) continue;
    if (cells[0] === "Step Action") continue;
    if (/^-+$/.test(cells[0].replace(/\s/g, ""))) continue;
    rows.push({
      action: cells[0],
      data: cells[1] || "",
      expected_result: cells[2],
    });
  }

  if (rows.length === 0) throw new Error("No Qase steps found");
  return rows;
}

function readExplicitParameters(parametersFile) {
  if (!parametersFile) return undefined;

  const parsed = JSON.parse(fs.readFileSync(parametersFile, "utf8"));
  const parameters = Array.isArray(parsed) ? parsed : [parsed];

  for (const parameter of parameters) {
    if (parameter.type !== "group" || !Array.isArray(parameter.items) || parameter.items.length === 0) {
      throw new Error(`Explicit parameters files support grouped parameters only: ${parametersFile}`);
    }
    const rowCounts = parameter.items.map((item) => item.values?.length ?? 0);
    if (rowCounts.some((count) => count === 0 || count !== rowCounts[0])) {
      throw new Error(`Grouped parameter row counts do not match: ${parametersFile}`);
    }
  }

  return parameters;
}

function buildPayload({ caseFile, caseNumber, suiteId, parametersFile }) {
  const markdown = fs.readFileSync(caseFile, "utf8");
  const section = extractCase(markdown, caseNumber);
  const priorityText = getBoldField(section, "Priority", false).toLowerCase();
  const priority = priorityText ? PRIORITY[priorityText] : undefined;
  if (priorityText && !priority) throw new Error(`Unsupported priority: ${priorityText}`);
  const explicitParameters = readExplicitParameters(parametersFile);

  return {
    title: getTitle(section),
    description: getDescription(section),
    preconditions: getLongTextField(section, "Preconditions"),
    postconditions: getLongTextField(section, "Postconditions"),
    priority,
    type: DEFAULT_TYPE,
    behavior: DEFAULT_BEHAVIOR,
    layer: DEFAULT_LAYER,
    suite_id: Number(suiteId),
    tags: parseTags(section),
    params: explicitParameters ? undefined : formatParamsForQase(parseParams(section)),
    parameters: explicitParameters,
    steps: parseSteps(section),
  };
}

function readBatchPlan(planPath) {
  const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
  const operations = Array.isArray(plan.operations) ? plan.operations : plan;
  if (!Array.isArray(operations) || operations.length === 0) {
    throw new Error("Batch plan must be a non-empty array or contain an operations array");
  }

  return operations.map((operation, index) => {
    const action = operation.action ?? (operation.caseId ? "update" : "create");
    const normalized = {
      label: operation.label ?? `operation-${index + 1}`,
      action,
      caseFile: operation.caseFile ?? plan.caseFile,
      caseNumber: operation.caseNumber ?? operation.case_number,
      suiteId: operation.suiteId ?? operation.suite_id ?? plan.suiteId ?? plan.suite_id,
      caseId: operation.caseId ?? operation.case_id ?? operation.update,
      parametersFile: operation.parametersFile ?? operation.parameters_file ?? plan.parametersFile ?? plan.parameters_file,
    };

    if (!["create", "update"].includes(normalized.action)) {
      throw new Error(`Invalid batch action for ${normalized.label}: ${normalized.action}`);
    }
    if (!normalized.caseFile) throw new Error(`Missing caseFile for ${normalized.label}`);
    if (!normalized.caseNumber) throw new Error(`Missing caseNumber for ${normalized.label}`);
    if (!normalized.suiteId) throw new Error(`Missing suiteId for ${normalized.label}`);
    if (normalized.action === "update" && !normalized.caseId) {
      throw new Error(`Missing caseId for update ${normalized.label}`);
    }
    if (normalized.action === "create" && normalized.caseId) {
      throw new Error(`Create operation ${normalized.label} must not include caseId`);
    }

    return normalized;
  });
}

function summarizePayload(payload, mode) {
  return {
    mode,
    suite_id: payload.suite_id,
    title: payload.title,
    priority: payload.priority,
    type: payload.type,
    behavior: payload.behavior,
    layer: payload.layer,
    tags: payload.tags,
    params: payload.params,
    parameters: summarizeExplicitParameters(payload.parameters),
    step_count: payload.steps.length,
    steps: payload.steps.map((step, index) => ({
      position: index + 1,
      action: step.action,
      data: step.data || null,
      expected_result: step.expected_result,
    })),
  };
}

function summarizeExplicitParameters(parameters) {
  return parameters?.map((parameter) => ({
    type: parameter.type,
    item: parameter.item
      ? {
          title: parameter.item.title,
          value_count: parameter.item.values?.length ?? 0,
          values: parameter.item.values ?? [],
        }
      : undefined,
    items: parameter.items?.map((item) => ({
      title: item.title,
      row_count: item.values?.length ?? 0,
      values: [...new Set(item.values ?? [])],
    })),
  }));
}

function assertParametersPersisted(payload, result) {
  if (payload.parameters) {
    const expected = summarizeExplicitParameters(payload.parameters);
    const actual = summarizeExplicitParameters(result.parameters);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(
        `Qase parameter verification failed: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`
      );
    }
    return;
  }

  const expected = payload.params ?? [];
  const actual = result.params ?? [];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Qase parameter verification failed: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`
    );
  }
}

function summarizeCase(result) {
  return {
    id: result.id,
    title: result.title,
    suite_id: result.suite_id,
    priority: result.priority,
    type: result.type,
    behavior: result.behavior,
    layer: result.layer,
    tags: (result.tags ?? []).map((tag) => tag.title),
    params: result.params,
    parameters: summarizeExplicitParameters(result.parameters),
    step_count: result.steps?.length ?? 0,
  };
}

function summarizeUpdate({ existing, payload, mode, caseId }) {
  return {
    mode,
    update_case_id: Number(caseId),
    before: summarizeCase(existing),
    after: summarizePayload(payload, mode),
    changed_fields: {
      title: existing.title !== payload.title,
      suite_id: existing.suite_id !== payload.suite_id,
      priority: payload.priority !== undefined && existing.priority !== payload.priority,
      tags: JSON.stringify((existing.tags ?? []).map((tag) => tag.title)) !==
        JSON.stringify(payload.tags),
      params: payload.parameters
        ? JSON.stringify(existing.parameters ?? null) !== JSON.stringify(payload.parameters)
        : JSON.stringify(existing.params ?? null) !== JSON.stringify(payload.params ?? null),
      steps_count: (existing.steps?.length ?? 0) !== payload.steps.length,
      description: existing.description !== payload.description,
      preconditions: existing.preconditions !== payload.preconditions,
      postconditions: existing.postconditions !== payload.postconditions,
    },
  };
}

function selectUpdateFields(payload, fieldsText) {
  if (!fieldsText) return payload;

  const allowedFields = new Set([
    "title", "description", "preconditions", "postconditions", "priority",
    "type", "behavior", "layer", "suite_id", "tags", "params", "parameters", "steps",
  ]);
  const fields = fieldsText.split(",").map((field) => field.trim()).filter(Boolean);
  if (fields.length === 0) throw new Error("--only-fields requires at least one field");

  const selected = {};
  for (const field of fields) {
    if (!allowedFields.has(field)) throw new Error(`Unsupported --only-fields value: ${field}`);
    if (!(field in payload)) throw new Error(`Selected field is not present in payload: ${field}`);
    selected[field] = payload[field];
  }
  return selected;
}

function normalizeExistingField(existing, field) {
  if (field === "tags") return (existing.tags ?? []).map((tag) => tag.title);
  return existing[field];
}

function summarizeSelectedUpdate({ existing, payload, caseId }) {
  const fields = Object.keys(payload);
  const before = Object.fromEntries(fields.map((field) => [field, normalizeExistingField(existing, field)]));
  return {
    mode: "dry-run-update",
    update_case_id: Number(caseId),
    selected_fields: fields,
    before,
    after: payload,
    changed_fields: Object.fromEntries(
      fields.map((field) => [field, JSON.stringify(before[field]) !== JSON.stringify(payload[field])])
    ),
  };
}

function assertSelectedFieldsPersisted(payload, result) {
  for (const [field, expected] of Object.entries(payload)) {
    const actual = normalizeExistingField(result, field);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(
        `Qase field verification failed for ${field}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`
      );
    }
  }
}

async function qaseRequest(path, options = {}) {
  const { token, project } = requireQaseEnv();
  const urlPath = path.replace("{project}", encodeURIComponent(project));
  const response = await fetch(`https://api.qase.io/v1${urlPath}`, {
    ...options,
    headers: {
      Token: token,
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

async function dryRunBatchOperation(operation) {
  const payload = buildPayload({
    caseFile: operation.caseFile,
    caseNumber: operation.caseNumber,
    suiteId: operation.suiteId,
    parametersFile: operation.parametersFile,
  });

  if (operation.action === "update") {
    const { body: existingBody } = await qaseRequest(
      `/case/{project}/${operation.caseId}`
    );
    return {
      label: operation.label,
      action: operation.action,
      ...summarizeUpdate({
        existing: existingBody.result,
        payload,
        mode: "dry-run-update",
        caseId: operation.caseId,
      }),
    };
  }

  return {
    label: operation.label,
    action: operation.action,
    qase_will_assign_case_id: true,
    ...summarizePayload(payload, "dry-run-create"),
  };
}

async function applyBatchOperation(operation) {
  const payload = buildPayload({
    caseFile: operation.caseFile,
    caseNumber: operation.caseNumber,
    suiteId: operation.suiteId,
    parametersFile: operation.parametersFile,
  });

  if (operation.action === "update") {
    const { body: beforeBody } = await qaseRequest(
      `/case/{project}/${operation.caseId}`
    );
    const { status } = await qaseRequest(`/case/{project}/${operation.caseId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    const { body: verifiedBody } = await qaseRequest(
      `/case/{project}/${operation.caseId}`
    );
    assertParametersPersisted(payload, verifiedBody.result);

    return {
      label: operation.label,
      action: operation.action,
      ok: true,
      http_status: status,
      updated_case_id: Number(operation.caseId),
      before: summarizeCase(beforeBody.result),
      verified: summarizeCase(verifiedBody.result),
    };
  }

  const { status, body } = await qaseRequest("/case/{project}", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const createdCaseId = body.result?.id;
  const { body: verifiedBody } = await qaseRequest(
    `/case/{project}/${createdCaseId}`
  );
  assertParametersPersisted(payload, verifiedBody.result);

  return {
    label: operation.label,
    action: operation.action,
    ok: true,
    http_status: status,
    created_case_id: createdCaseId,
    verified: summarizeCase(verifiedBody.result),
  };
}

async function runBatchPlan({ planPath, apply }) {
  const operations = readBatchPlan(planPath);
  const results = [];

  for (const operation of operations) {
    results.push(
      apply
        ? await applyBatchOperation(operation)
        : await dryRunBatchOperation(operation)
    );
  }

  return {
    mode: apply ? "batch-apply" : "batch-dry-run",
    operation_count: operations.length,
    results,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }

  if (args["batch-plan"]) {
    console.log(
      JSON.stringify(
        await runBatchPlan({
          planPath: args["batch-plan"],
          apply: Boolean(args.apply),
        }),
        null,
        2
      )
    );
    return;
  }

  if (args["suite-info"]) {
    const { body } = await qaseRequest(`/suite/{project}/${args["suite-info"]}`);
    console.log(
      JSON.stringify(
        {
          id: body.result?.id,
          title: body.result?.title,
          parent_id: body.result?.parent_id,
          cases_count: body.result?.cases_count,
        },
        null,
        2
      )
    );
    return;
  }

  if (args.verify) {
    const { body } = await qaseRequest(`/case/{project}/${args.verify}`);
    console.log(JSON.stringify(summarizeCase(body.result), null, 2));
    return;
  }

  if (args.delete) {
    if (!args.apply) {
      const { body } = await qaseRequest(`/case/{project}/${args.delete}`);
      console.log(
        JSON.stringify(
          {
            mode: "dry-run-delete",
            delete_case_id: Number(args.delete),
            before: summarizeCase(body.result),
          },
          null,
          2
        )
      );
      return;
    }

    const { body: beforeBody } = await qaseRequest(`/case/{project}/${args.delete}`);
    const { status } = await qaseRequest(`/case/{project}/${args.delete}`, {
      method: "DELETE",
    });
    console.log(
      JSON.stringify(
        {
          ok: true,
          mode: "apply-delete",
          http_status: status,
          deleted_case_id: Number(args.delete),
          before: summarizeCase(beforeBody.result),
        },
        null,
        2
      )
    );
    return;
  }

  if (!args["case-file"] || !args["case-number"] || !args["suite-id"]) {
    usage();
    process.exitCode = 1;
    return;
  }

  const fullPayload = buildPayload({
    caseFile: args["case-file"],
    caseNumber: args["case-number"],
    suiteId: args["suite-id"],
    parametersFile: args["parameters-file"],
  });
  if (args["only-fields"] && !args.update) {
    throw new Error("--only-fields is supported only with --update");
  }
  const payload = selectUpdateFields(fullPayload, args["only-fields"]);

  const mode = args.apply ? "apply" : "dry-run";

  if (args.update) {
    const { body: existingBody } = await qaseRequest(
      `/case/{project}/${args.update}`
    );

    if (!args.apply) {
      console.log(
        JSON.stringify(
          args["only-fields"]
            ? summarizeSelectedUpdate({
                existing: existingBody.result,
                payload,
                caseId: args.update,
              })
            : summarizeUpdate({
                existing: existingBody.result,
                payload,
                mode: "dry-run-update",
                caseId: args.update,
              }),
          null,
          2
        )
      );
      return;
    }

    const { status } = await qaseRequest(`/case/{project}/${args.update}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    const { body: verifiedBody } = await qaseRequest(
      `/case/{project}/${args.update}`
    );
    if (args["only-fields"]) {
      assertSelectedFieldsPersisted(payload, verifiedBody.result);
    }

    console.log(
      JSON.stringify(
        {
          ok: true,
          mode: "apply-update",
          http_status: status,
          updated_case_id: Number(args.update),
          verified: summarizeCase(verifiedBody.result),
        },
        null,
        2
      )
    );
    return;
  }

  if (!args.apply) {
    console.log(JSON.stringify(summarizePayload(payload, mode), null, 2));
    return;
  }

  const { status, body } = await qaseRequest("/case/{project}", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        http_status: status,
        created_case_id: body.result?.id,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(
    JSON.stringify(
      {
        error: error.message,
        response: error.response,
      },
      null,
      2
    )
  );
  process.exit(1);
});
