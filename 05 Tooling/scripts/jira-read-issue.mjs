#!/usr/bin/env node
import fs from "node:fs";

const DEFAULT_FIELDS = [
  "summary",
  "status",
  "issuetype",
  "priority",
  "assignee",
  "reporter",
  "labels",
  "components",
  "fixVersions",
  "created",
  "updated",
  "description",
  "comment",
];

function usage() {
  console.log(`Usage:
  node "05 Tooling/scripts/jira-read-issue.mjs" <issue-key-or-url>
  node "05 Tooling/scripts/jira-read-issue.mjs" --issue <issue-key-or-url>
  node "05 Tooling/scripts/jira-read-issue.mjs" --issue <issue-key-or-url> --format json
  node "05 Tooling/scripts/jira-read-issue.mjs" --issue <issue-key-or-url> --save /private/tmp/jira-issue.json

Notes:
  .env must provide JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN.
  This script is read-only. It fetches one Jira issue through Jira Cloud REST API v3.
  Output defaults to markdown so pasted card links are quick to inspect in-agent.`);
}

function parseArgs(argv) {
  const args = { format: "markdown" };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }
    if (arg === "--format") {
      args.format = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--issue") {
      args.issue = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--save") {
      args.save = argv[index + 1];
      index += 1;
      continue;
    }
    if (!arg.startsWith("--") && !args.issue) {
      args.issue = arg;
    }
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

function requireJiraEnv() {
  loadEnv();
  const baseUrl = process.env.JIRA_BASE_URL?.replace(/\/+$/, "");
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;

  if (!baseUrl || !email || !token) {
    throw new Error(
      "Missing Jira configuration. Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN in .env."
    );
  }

  return { baseUrl, email, token };
}

function extractIssueKey(input) {
  if (!input) throw new Error("Missing Jira issue key or URL.");

  const directMatch = input.match(/\b[A-Z][A-Z0-9]+-\d+\b/i);
  if (!directMatch) {
    throw new Error(`Could not find a Jira issue key in: ${input}`);
  }

  return directMatch[0].toUpperCase();
}

function flattenAdf(node) {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(flattenAdf).filter(Boolean).join("");
  if (node.type === "text") return node.text || "";
  if (node.type === "hardBreak") return "\n";

  const content = flattenAdf(node.content);
  if (!content) return "";

  if (
    [
      "paragraph",
      "heading",
      "blockquote",
      "listItem",
      "bulletList",
      "orderedList",
      "rule",
      "codeBlock",
      "panel",
    ].includes(node.type)
  ) {
    return `${content.trim()}\n`;
  }

  return content;
}

function compactText(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  return flattenAdf(value)
    .split(/\n{3,}/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n\n");
}

function names(items) {
  return (items || []).map((item) => item?.name).filter(Boolean);
}

function simplifyIssue(issue, baseUrl) {
  const fields = issue.fields || {};
  const comments = fields.comment?.comments || [];

  return {
    key: issue.key,
    url: `${baseUrl}/browse/${issue.key}`,
    summary: fields.summary || "",
    status: fields.status?.name || "",
    issue_type: fields.issuetype?.name || "",
    priority: fields.priority?.name || "",
    assignee: fields.assignee?.displayName || "Unassigned",
    reporter: fields.reporter?.displayName || "",
    labels: fields.labels || [],
    components: names(fields.components),
    fix_versions: names(fields.fixVersions),
    created: fields.created || "",
    updated: fields.updated || "",
    description: compactText(fields.description),
    comments: comments.map((comment) => ({
      author: comment.author?.displayName || "",
      created: comment.created || "",
      updated: comment.updated || "",
      body: compactText(comment.body),
    })),
  };
}

function formatList(items) {
  return items?.length ? items.join(", ") : "None";
}

function truncate(text, maxLength = 1200) {
  if (!text || text.length <= maxLength) return text || "None";
  return `${text.slice(0, maxLength).trim()}...`;
}

function toMarkdown(issue) {
  const lines = [
    `# ${issue.key}: ${issue.summary}`,
    "",
    `- URL: ${issue.url}`,
    `- Status: ${issue.status || "Unknown"}`,
    `- Type: ${issue.issue_type || "Unknown"}`,
    `- Priority: ${issue.priority || "None"}`,
    `- Assignee: ${issue.assignee}`,
    `- Reporter: ${issue.reporter || "Unknown"}`,
    `- Labels: ${formatList(issue.labels)}`,
    `- Components: ${formatList(issue.components)}`,
    `- Fix Versions: ${formatList(issue.fix_versions)}`,
    `- Created: ${issue.created || "Unknown"}`,
    `- Updated: ${issue.updated || "Unknown"}`,
    "",
    "## Description",
    "",
    truncate(issue.description),
  ];

  if (issue.comments.length > 0) {
    lines.push("", "## Comments");
    for (const comment of issue.comments) {
      lines.push(
        "",
        `### ${comment.author || "Unknown"} - ${comment.updated || comment.created}`,
        "",
        truncate(comment.body, 900)
      );
    }
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }

  if (!["markdown", "json"].includes(args.format)) {
    throw new Error("--format must be markdown or json.");
  }

  const issueKey = extractIssueKey(args.issue);
  const { baseUrl, email, token } = requireJiraEnv();
  const url = new URL(
    `${baseUrl}/rest/api/3/issue/${encodeURIComponent(issueKey)}`
  );
  url.searchParams.set("fields", DEFAULT_FIELDS.join(","));

  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${auth}`,
    },
  });

  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(`Jira read failed (${response.status}): ${bodyText}`);
  }

  const rawIssue = JSON.parse(bodyText);
  if (args.save) {
    fs.writeFileSync(args.save, `${JSON.stringify(rawIssue, null, 2)}\n`);
  }

  const issue = simplifyIssue(rawIssue, baseUrl);
  if (args.format === "json") {
    console.log(JSON.stringify(issue, null, 2));
    return;
  }

  console.log(toMarkdown(issue));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
