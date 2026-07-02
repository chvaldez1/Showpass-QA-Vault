# Showpass QA Vault Agent Guide

Use this vault as a QA-first workspace for test creation, QA analysis, and automation planning.

## Source Of Truth

- Backend first: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend follows backend behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright automation patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Backend code is the first source of truth for behavior, schemas, APIs, permissions, and validation. Frontend code follows that behavior and shows how users reach it. The Playwright repo shows durable automation patterns.

## Vault Handshake

Agents should keep work aligned with this folder contract:

- `00 Start Here/` - orientation and basic QA workflow.
- `01 Repositories/` - short reference notes for source repositories.
- `02 Feature QA/` - feature-level QA notes and risk analysis.
- `03 Test Cases/` - manual test case templates and drafted cases.
- `04 Automation/` - automation candidate planning.
- `05 Tooling/` - CLI and workflow tool references.
- `06 Prompts/` - reusable prompts and agent workflows.
- `99 Archive/` - old or inactive notes.

## Agent Rules

- Do not move, copy, or mirror repositories into this vault.
- Reference repo paths instead of copying large code snippets.
- Prefer checklists, short workflows, and focused QA notes.
- Capture behavior, risks, test cases, and automation candidates.
- Update notes only when they make QA work easier to repeat.
- When appending or revising notes, preserve existing user edits, links, IDs, headings, and surrounding content unless the user explicitly asks to remove or rewrite them.
- Keep notes short enough for both humans and AI agents to scan quickly.

## Qase Workflow Rules

Use [[05 Tooling/qasectl]] as the required operating guide for Qase reads, gap analysis, creates, and updates.

To avoid repeated permission prompts and inconsistent Qase payloads:

- Prefer one bulk Qase read plus local filtering for gap analysis. Use the read-only bulk search workflow in `05 Tooling/qasectl.md` and save temporary API output under `/private/tmp`.
- Do not make many ad hoc `curl` calls with slightly different shapes. If a Qase read is needed after the first query, reuse the documented bulk output or the reusable script when possible.
- For Qase creates and updates, use `05 Tooling/scripts/create-or-update-qase-case.mjs`.
- For multi-case Qase writes, use `--batch-plan` so dry-run, apply, and verification happen through one stable command path.
- Always dry-run Qase writes before applying them, and summarize the exact case IDs, local draft labels, titles, suite IDs, tags, parameters, and step counts.
- Do not run Qase apply commands until the user has explicitly confirmed the write scope.
- Do not delete Qase cases unless the user explicitly requests deletion and confirms the exact case IDs.
- If network approval is required, ask for approval on the stable bulk read or batch script command rather than introducing new one-off command shapes.
