#!/usr/bin/env node
import fs from "node:fs";

// A suite batch changes only its declared titles/parents; it never deletes suites.
const args = process.argv.slice(2);
const planPath = args[args.indexOf("--batch-plan") + 1];
if (!args.includes("--batch-plan") || !planPath) {
  throw new Error("Use --batch-plan <file> [--dry-run | --apply]");
}
const apply = args.includes("--apply");
if (apply && args.includes("--dry-run")) throw new Error("Choose one mode");
for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
  const match = line.trim().match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
}
const token = process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN;
const project = process.env.QASE_PROJECT_CODE;
if (!token || !project) throw new Error("Missing Qase configuration");
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
if (!Array.isArray(plan.operations) || !plan.operations.length) throw new Error("Empty plan");
if (apply && !plan.approved) throw new Error("Exact suite scope must be approved first");
const receiptPath = plan.receiptPath;
if (apply && !receiptPath) throw new Error("Apply requires a durable receiptPath");
if (apply && fs.existsSync(receiptPath)) throw new Error("Receipt exists; inspect it before any retry");

async function request(path, method = "GET", payload) {
  const response = await fetch(`https://api.qase.io/v1${path}`, {
    method,
    headers: { Token: token, "Cache-Control": "no-cache", ...(payload ? { "Content-Type": "application/json" } : {}) },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  });
  const body = await response.json();
  if (!response.ok || body.status !== true) throw new Error(`Qase suite ${method}: HTTP ${response.status}`);
  return body.result;
}
function selected(suite, fields) {
  return Object.fromEntries(fields.map(field => [field, suite[field] ?? null]));
}
const result = { mode: apply ? "suite-batch-apply" : "suite-batch-dry-run", results: [] };
function save() {
  if (apply) fs.writeFileSync(receiptPath, JSON.stringify(result, null, 2) + "\n");
}
for (const operation of plan.operations) {
  const { action, key, suiteId, payload } = operation;
  if (!["create", "update"].includes(action) || !key) throw new Error("Invalid suite operation");
  const fields = Object.keys(payload ?? {});
  if (!fields.length || fields.some(field => !["title", "parent_id"].includes(field))) {
    throw new Error(`Unsupported fields for ${key}`);
  }
  if ("parent_id" in payload && (!Number.isInteger(payload.parent_id) || payload.parent_id <= 0)) {
    throw new Error(`Invalid parent for ${key}`);
  }
  if (payload.title !== undefined && !payload.title.trim()) throw new Error(`Empty title for ${key}`);
  if (action === "update" && (!Number.isInteger(suiteId) || suiteId <= 0)) throw new Error(`Invalid suite ID: ${key}`);
  if (action === "create" && suiteId) throw new Error(`Create cannot supply suite ID: ${key}`);
  const before = action === "update" ? await request(`/suite/${project}/${suiteId}`) : null;
  if (before && operation.expectedBefore) {
    for (const [field, value] of Object.entries(operation.expectedBefore)) {
      if ((before[field] ?? null) !== value) throw new Error(`Suite drift for ${key}: ${field}`);
    }
  }
  const row = { key, action, ...(suiteId ? { suiteId } : {}), before: before ? selected(before, fields) : null, after: payload };
  result.results.push(row);
  if (!apply) continue;
  row.status = "request-started";
  save();
  // No automatic write retries: a lost response must be reconciled before repeating a create.
  const written = await request(`/suite/${project}${suiteId ? `/${suiteId}` : ""}`, action === "create" ? "POST" : "PATCH", payload);
  row.suiteId = suiteId || written.id;
  row.status = "written-awaiting-readback";
  save();
  const verified = await request(`/suite/${project}/${row.suiteId}`);
  for (const field of fields) {
    if (verified[field] !== payload[field]) throw new Error(`Suite readback mismatch: ${key}.${field}`);
  }
  row.verified = { id: verified.id, title: verified.title, parent_id: verified.parent_id };
  row.status = "verified";
  save();
}
result.operation_count = result.results.length;
save();
console.log(JSON.stringify(result, null, 2));
