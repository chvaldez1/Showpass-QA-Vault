# Showpass QA Vault Agent Guide

Use this vault as a QA-first workspace for test creation, QA analysis, and automation planning.

## Source Of Truth

- Backend first: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend follows backend behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright automation patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Backend code is the first source of truth for behavior, schemas, APIs, permissions, and validation. Frontend code follows that behavior and shows how users reach it. The Playwright repo shows durable automation patterns.

## Branch And PR QA Rules

When the user supplies a branch or PR, treat the exact branch diff as the starting scope. Do not generate coverage from the broad feature name alone.

- Confirm the active branch and compare it with the intended base branch before broad feature analysis.
- Summarize the changed user behavior in plain language before writing cases.
- Trace every changed backend API, service, model, webhook, background task, or shared frontend component to all clients that use it. A client can be affected even when its files are not changed in the branch.
- Build separate lists for entry points and outcomes. Entry points are where the actor starts, such as Web Box Office, POS mode, Electron, or mobile. Outcomes are what happens, such as success, cancel, failure, retry, timeout, or a delayed final update.
- Include a clean successful flow as its own proof target. Do not treat success only as the final step of a cancel, failure, or retry case.
- Cover a control or recovery path only on clients that actually provide it. Mark unsupported combinations as not applicable instead of forcing platform symmetry.
- Include provider callbacks, webhooks, polling, and other background final-state paths when they can change payment, order, inventory, fulfillment, credit, refund, payout, or reporting state.
- Do not limit platform scope to files directly edited in the branch. Include unchanged clients when source shows they call the changed shared behavior, and state that evidence clearly.
- For Jira-card generation, keep the existing no-diff rule unless the user explicitly asks for branch- or diff-based coverage.

Test notes must be executable by someone with little or no Showpass knowledge:

- Define necessary Showpass terms in plain language when the workflow uses product-specific concepts.
- Say where the actor starts, what they select, and what they should see.
- Prefer customer- and employee-visible proof such as one charge, one transaction, one order, and one set of tickets over internal field names.
- Keep implementation details in source-backed behavior or risk sections, not in manual steps.

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
- Maintain one active output note per user request, Jira ticket, feature, or Qase work item. Before creating another file for the same scope, update the existing canonical note. If the approach changes, consolidate useful evidence and final content into one chosen note instead of leaving parallel drafts.
- Treat files named `*Template.md` as reusable scaffolds, not generated-output targets. If a prompt points at a template path for generated QA output, create a feature-specific note in the same folder unless the user explicitly says to overwrite or edit the template itself.

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
