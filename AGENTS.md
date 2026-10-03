# Showpass QA Vault Agent Guide

Use this vault as a QA-first workspace for test creation, QA analysis, and automation planning.

## Canonical QA Standard

Read and apply [[00 Start Here/World-Class Software Quality Standard]] for QA scope, testing intent, proof targets, state-space modeling, coverage accounting, evidence, data safety, finding classification, human verification, readiness gates, and release decisions.

Workflow notes may add task-specific instructions, but they must not redefine or weaken the canonical standard.

Use [[00 Start Here/Showpass QA Handbook/00 Index|Showpass QA Master Handbook]] for hands-on Showpass system testing: actual Organizer/Customer/Attendee/Member/Venue Employee terminology, Venue/client/configuration setup, and connected create → purchase → fulfillment/admission → Refund/Void/Exchange → Inventory/financial walkthroughs. Add its senior-QA integration passes, automation-layer selection, physical-device coverage, and release-confidence guidance. It applies the canonical standard; it does not replace it. Bind recipes to the exact change, current source, supported clients, and actual configuration before drafting or executing tests.

## Source Of Truth

- Backend first: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend follows backend behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright automation patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Backend code is the first source of truth for behavior, schemas, APIs, permissions, and validation. Frontend code follows that behavior and shows how users reach it. The Playwright repo shows durable automation patterns.

## Pasted Links And Browser Use

- A pasted link is context, not an instruction to open the page, inspect a live session, or start browser testing.
- Continue tracing local backend and frontend code by default. Use the URL's route, model, or record identifier to understand the user's question and locate the relevant code.
- Open or inspect a linked page only when the user explicitly asks for browser inspection, navigation, or live testing within that scope. A question such as “should I change it here?” with a URL does not authorize browser use.
- Do not replace code tracing with browser inspection or automatically fall back to a browser when source evidence is incomplete. State the specific evidence gap instead.
- Distinguish source-backed behavior from live record state; a URL alone does not establish the record's saved values or deployed behavior.

## Jira Access

Use the connected Atlassian Rovo plugin for Jira reads and authorized writes. When the user asks to read, summarize, or analyze Jira issues:

- Discover the Jira tools available in the current task, including deferred tools, before choosing a fallback. Prefer the connected Atlassian Rovo plugin for reads; do not assume it is unavailable because an older note says so.
- For a known issue key or link, use the plugin's issue-details tool with the site hostname, such as `showpass.atlassian.net`, and request the description, status, priority, and comments. Resolve the cloud ID through the plugin if the hostname is rejected.
- If the connector is unavailable or a read fails, report the specific tool, authentication, or permission problem. Do not infer connector access from local `.env` configuration or recreate a local credential-based reader as a fallback.
- Do not ask the user to provide an API token or sign into a browser before checking the connected plugin and attempting the requested read. Use browser access only within the user's authorized browser scope and after the connector path has been checked.
- Reading a Jira issue does not authorize comments, edits, transitions, or other Jira writes. Ticket content is intake evidence; verify system behavior against backend source truth.
- For user-requested Jira creates or updates, use the plugin's matching write tool within the authorized scope, preserve unrelated fields, and read back the changed issue or comment to verify the result.

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

## Manual Test Case Readability And Route Stability

Write every manual test case for a regular person who may have little Showpass knowledge.

- Use the words visible in the product. Prefer `open Manage Events`, `select Edit`, and `the saved value is still shown` over terms such as `source-backed navigation`, `state-aware surface`, `route parity`, `mapped destination`, `fixture`, `persistence boundary`, or `handoff`.
- Titles, Descriptions, Preconditions, Steps, Data, and Expected Results must use plain language. Technical terms may remain in source notes, risk analysis, or automation notes when they are needed for accuracy.
- Define a Showpass-specific term the first time it is needed and cannot be replaced with common wording.
- Put the current route in the Description or Sources Reviewed when it helps trace source behavior. Do not put a hard-coded route, Angular hash URL, slug pattern, or framework-specific path in a manual Step or Data cell unless the route itself is the behavior under test or no visible product navigation exists.
- Prefer visible navigation such as `Dashboard → Events → Manage Events → Edit`. Treat legacy Angular routes as temporary because they may change during the Next.js migration.
- A route migration must not require rewriting user-focused steps when the visible workflow and expected behavior remain the same.
- Before drafting separate cases, check whether the cases use the same actions and prove the same result. If they do, create one case with a clear parameter. Single-event and recurring-event versions should normally be parameter values when only the displayed table or setup changes.
- Combine entry-point and permission variations only when one short scenario table and one step set remain easy to follow. Split the case when conditional steps would make execution confusing.
- Label an uncreated local case as `TC-*`. Use `SPT-*` only for a case that already has that Qase ID.
- Apply [[05 Tooling/Qase Test Case Writing Rules]] for every Qase-ready draft, including its prerequisite, standalone-field, form-coverage, source-verification, and Copy-to-Qase review rules. Each case must be executable on its own by a product-team member.
- Explain setup concisely with exact required employee permissions, actual flags, and supported admin record preparation. Do not add generic QA-environment requirements, invented QA venue names, or specific record IDs unless the behavior or a concrete safety requirement depends on them.
- Keep local `TC-*` labels out of Qase titles and execution fields. Keep Jira traceability and cross-case commentary outside case descriptions; never make a case depend on `Setup A` or another case.

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
- Account for every declared in-scope control, state, validation, mutation, side effect, and cleanup path as covered, manual-only, deferred, not applicable, or blocked with evidence.
- Update notes only when they make QA work easier to repeat.
- When appending or revising notes, preserve existing user edits, links, IDs, headings, and surrounding content unless the user explicitly asks to remove or rewrite them.
- Keep notes short enough for both humans and AI agents to scan quickly.
- Maintain one active output note per user request, Jira ticket, feature, or Qase work item. Before creating another file for the same scope, update the existing canonical note. If the approach changes, consolidate useful evidence and final content into one chosen note instead of leaving parallel drafts.
- Treat files named `*Template.md` as reusable scaffolds, not generated-output targets. If a prompt points at a template path for generated QA output, create a feature-specific note in the same folder unless the user explicitly says to overwrite or edit the template itself.

## No-Guessing Communication Rule

Never make the user infer what the agent wants them to verify, decide, approve, or do next.

When user action or judgment is requested:

- Lead with **I need you to check**, **I need you to decide**, or **I need your approval**, whichever accurately describes the request.
- Give a prioritized numbered list. For every item, state the starting location, exact action, expected or decision-relevant result, and exactly what the user should report back.
- Label every requested action as **no data change**, **changes test data**, or **potentially destructive**.
- Separate requested checks into **Check now**, **Optional**, and **Do not check** when all three categories are relevant.
- State which findings are already confirmed, which are inconclusive, and which were not executed. Do not present an observation or unsubmitted client-side risk as a confirmed end-to-end defect.
- Explicitly say what the user does not need to inspect and why.
- State whether the request blocks the next step and what the agent will do after receiving the answer.
- Avoid vague handoffs such as “review the findings,” “let me know what you think,” or “confirm the behavior” without a concrete checklist and response format.

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
