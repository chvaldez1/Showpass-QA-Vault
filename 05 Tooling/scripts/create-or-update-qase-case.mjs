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
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --verify <case-id>
  node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-info <suite-id>

Notes:
  --dry-run is the default for create payloads.
  --apply is required before creating or updating a Qase case.
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
  const heading = new RegExp(`^### Test Case ${caseNumber}: .*$`, "m");
  const match = markdown.match(heading);
  if (!match || match.index === undefined) {
    throw new Error(`Could not find Test Case ${caseNumber}`);
  }

  const rest = markdown.slice(match.index);
  const nextCase = rest.slice(match[0].length).search(/^### Test Case \d+:/m);
  return nextCase === -1
    ? rest.trim()
    : rest.slice(0, match[0].length + nextCase).trim();
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

function getDescription(section) {
  const description = getBoldField(section, "Description");
  const lines = section.split(/\r?\n/);
  const descriptionIndex = lines.findIndex((line) =>
    line.startsWith("**Description:**")
  );
  const tableLines = [];
  for (let index = descriptionIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;
    if (line.trim().startsWith("|")) {
      tableLines.push(line);
      continue;
    }
    if (tableLines.length > 0) break;
  }
  return tableLines.length > 0
    ? `${description}\n\n${tableLines.join("\n")}`
    : description;
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

function parseMarkdownTableRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return null;
  return trimmed
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function parseSteps(section) {
  const start = section.search(/^\*\*Steps:\*\*$/m);
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

function buildPayload({ caseFile, caseNumber, suiteId }) {
  const markdown = fs.readFileSync(caseFile, "utf8");
  const section = extractCase(markdown, caseNumber);
  const priorityText = getBoldField(section, "Priority").toLowerCase();
  const priority = PRIORITY[priorityText];
  if (!priority) throw new Error(`Unsupported priority: ${priorityText}`);

  return {
    title: getBoldField(section, "Title"),
    description: getDescription(section),
    preconditions: getBoldField(section, "Preconditions"),
    postconditions: getBoldField(section, "Postconditions"),
    priority,
    type: DEFAULT_TYPE,
    behavior: DEFAULT_BEHAVIOR,
    layer: DEFAULT_LAYER,
    suite_id: Number(suiteId),
    tags: parseTags(section),
    params: parseParams(section),
    steps: parseSteps(section),
  };
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
    step_count: payload.steps.length,
    steps: payload.steps.map((step, index) => ({
      position: index + 1,
      action: step.action,
      data: step.data || null,
      expected_result: step.expected_result,
    })),
  };
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
      priority: existing.priority !== payload.priority,
      tags: JSON.stringify((existing.tags ?? []).map((tag) => tag.title)) !==
        JSON.stringify(payload.tags),
      params:
        JSON.stringify(existing.params ?? null) !==
        JSON.stringify(
          payload.params
            ? Object.fromEntries(
                payload.params.map((param) => [param.title, param.values])
              )
            : null
        ),
      steps_count: (existing.steps?.length ?? 0) !== payload.steps.length,
      description: existing.description !== payload.description,
      preconditions: existing.preconditions !== payload.preconditions,
      postconditions: existing.postconditions !== payload.postconditions,
    },
  };
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
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

  if (!args["case-file"] || !args["case-number"] || !args["suite-id"]) {
    usage();
    process.exitCode = 1;
    return;
  }

  const payload = buildPayload({
    caseFile: args["case-file"],
    caseNumber: args["case-number"],
    suiteId: args["suite-id"],
  });

  const mode = args.apply ? "apply" : "dry-run";

  if (args.update) {
    const { body: existingBody } = await qaseRequest(
      `/case/{project}/${args.update}`
    );

    if (!args.apply) {
      console.log(
        JSON.stringify(
          summarizeUpdate({
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
