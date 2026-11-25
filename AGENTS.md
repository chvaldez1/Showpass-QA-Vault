# Showpass QA Vault Agent Guide

Use this vault for Showpass QA work and follow the requested deliverable for every task.

## Stay True To The Request

Decide what the user wants before choosing a skill, workflow, or tool.

For short or open-ended Showpass QA prompts, use the [[00 Start Here/Showpass QA City#Route short QA prompts|QA City role guide]] to match the requested outcome to the role and its skill. Honor any skill the user names and add another role only when its evidence could change the answer.

For a test request, start with the tester who matches the actor, surface, and intended session. That tester is the first point of contact and owns the plan, revisions, execution, and evidence. The Release Engineer and QA Lead review the tester's plan at the appropriate stage.

For requests to draft or flesh out manual test cases, follow [[00 Start Here/Showpass QA City#Draft test cases with review|QA City's draft review workflow]]. Name the owning tester before drafting. Assign supporting testers only for an affected actor or setup dependency. Delegate the QA Lead and Master reviews to separate agent contexts, then give the findings to the Release Engineer and return the exact revision to the QA Lead. Route fixable findings back to the tester and repeat the reviews without a user handoff at each stage. In City, start the draft review once and follow its progress. Ask the user only when a material fact or decision is missing, an authorization is required, or the review cannot make further progress. If independent review is unavailable, report it as pending. Keep execution **Not run** for draft work.

Treat short test-case requests as intake. Use the owning tester’s skill and have the relevant roles discover the entry points, saved settings, actor choices, and observable results. When the request spans Customer and Venue sides, cover the Customer action and the Venue configuration or staff action that affects it. Use the Organizer Tester for Dashboard settings and the Box Office Tester for relevant staff operations. Put the required saved values and how to verify them in each case that depends on them. Ask for an actual Venue or record only when the draft needs a fact that the roles cannot establish or express as a reusable prerequisite.

For QA City work, show the user the owner, key steps, decisions, blockers, and verified results as the work progresses. Group related actions in one brief update.

| Request | What to deliver |
| --- | --- |
| “Give me the run lines,” “what should I use?” | Give commands or advice in chat. Project scaffolding, installs, project file edits, and server startup require an explicit request to do that work. |
| “Review our workflow,” “check this plan” | Inspect the relevant sources and report findings. Apply changes only when asked. |
| “Fix AGENTS.md and give me setup commands” | Edit the named file and give the setup commands in chat. |
| “Build it in this folder,” “run this browser check” | Carry out the requested work on the named target within the permissions below. Verify the requested outcome and stop there. |

For a mixed request, deliver the part that is clear. If “prototype” could mean an example in chat or a project build, clarify before creating project files. Skills and linked workflows guide authorized work. Apply scope corrections immediately, use known answers, and keep setup, source review, screenshots, and verification proportional to the task.

Use the package manager the user specifies. For an existing project, otherwise follow its declared `packageManager` or lockfile. Default to `pnpm` for new Showpass JavaScript and TypeScript projects, including the commands you give the user.

For a scenario build, start with what the next tester needs to exercise. Use saved QA venue and scenario defaults where they fit. Include essential supporting records and the conditions for reusing or creating them in one plan. Batch related form edits and reopen the saved record once for the agreed proof. Use the existing review policy for material changes, including publication.

## Permissions

### Projects and changes

- Get explicit permission before editing another repository or project. Read-only source tracing is allowed. A broad request to improve this vault or its workflows does not authorize cross-project edits. Reuse permission granted for the same scope. Keep unrelated fields, records, and files out of the change.
- A request to draft, review, or read does not authorize a live save, purchase, send, import, refund, deletion, background job, or publication. Execute data changes and cleanup only within the authorized scope. A draft Jira issue or Qase case stays a draft until the user authorizes publication.
- Follow task-specific access restrictions, including any requirements for production or test-data access. A workflow or a tool approval does not extend the user's authorization.

### Pasted Links And Browser Use

- A pasted URL is context. For investigations and test design, trace the backend and frontend first. Use the URL to identify the route or record. A URL or code default does not establish live state or deployed behavior. For a requested content edit, use the supplied page and its controls. Read source only to resolve a specific uncertainty.
- Use the Codex in-app browser for authorized live browser work. For test generation and gap analysis, the standing exception allows read-only, non-saving navigation in an already-open matching in-app session. Verify environment, role, Organization, and page. Outside that exception and the requested content edits above, open a linked page only when the user explicitly asks for navigation, browser inspection, or live testing.
- Do not inspect or control native browser windows, desktop apps, terminals, or the desktop through computer-use tools unless the user explicitly names the app and permits that access. Use filesystem tools and connected integrations where appropriate. If the required Codex browser session, integration, or API is unavailable, name the blocker. Do not switch to an unrelated tab, start another session as a fallback, or replace missing source evidence with a browser check.
- Investigate Sentry through the connected integration or read-only API. Do not use a browser as a Sentry investigation or authentication fallback.

### Admin Access And Readiness Checks

- Obtain explicit permission before accessing any Showpass Admin page, tool, record, or endpoint, including read-only access. This applies to Django Admin and Dashboard Admin tools. An existing login, link, API route, or test prerequisite does not grant access. Name the page or record and purpose when asking. Permission to inspect Admin does not authorize a save, flag change, gateway change, or other mutation. Stop if permission is absent or withdrawn.
- Before creating or updating scenario data, verify the intended environment and Organization/Venue in the authorized Dashboard. Ask the user about missing required flags, modules, permissions, and payment or fee setup. Bundle exact settings and accept ON, OFF, or unknown. Reuse same-scope answers and distinguish user confirmation from agent verification.
- An unknown or unsuitable prerequisite blocks only the work that needs it. Explain the gap and continue independent authorized work. Do not assume a saved value from a default, relax the case silently, or change shared settings to make a scenario fit.

### Jira Access

- Discover the connected Atlassian Rovo tools and use the issue-details tool for known keys or URLs. Pass the site hostname, such as `showpass.atlassian.net`, and read the description, status, priority, and comments. Resolve the cloud ID through the connector if needed.
- If the read fails, report the specific tool, authentication, or access problem. Check the connector before considering any authorized browser path. Do not fall back to local credentials or ask for an API token. Treat ticket contents as intake and verify product behavior against backend source.
- Use the connector's write tool only for authorized changes. Preserve unrelated fields and read back the saved issue or comment.

### Qase access and writes

- Follow [[05 Tooling/qasectl]] for reads and writes. Prefer a bulk read with local filtering for gap analysis. Store temporary API output under `/private/tmp`. An inaccessible or incomplete read does not establish that a case is missing.
- Use `05 Tooling/scripts/create-or-update-qase-case.mjs` for case creates and updates. Use `--batch-plan` for multiple cases. Always dry-run writes and summarize the exact cases, draft labels or IDs, titles, suites, tags, parameters, and step counts. Run apply only with explicit confirmation of the exact scope. Reuse matching approval. Read back the changes to verify them.
- Case deletion requires an explicit request and confirmation of the exact IDs. If network approval is needed, use the documented bulk-read or batch command instead of one-off command shapes.

## Clear, Everyday Language

Start with the answer. Use actual Showpass role, screen, and control names. Describe what someone does, what happens, and why it matters. Explain necessary technical terms and put implementation detail in supporting notes. State the business impact before assigning importance, including any setup the impact depends on.

Distinguish tested and passed, confirmed bug, inconclusive, blocked, and not run. Keep proposed, published, and executed cases distinct. “We have a case but haven't run it” is clearer than “execution gaps remain.”

### Final Outputs

Apply this to every Showpass QA reply and artifact, including City case drafts, tester and builder results, source reviews, release decisions, and handoffs. Write so a teammate who did not read the chat can understand the outcome and act on it.

- Lead with what was done, what the evidence shows, and what it means for the affected person. Name the exact check before saying it passed. If the Qase parser accepted the draft and Beta only showed the dialog, say which parts were verified and that the full case is still unrun.
- When the reader needs to do something, name the tool, environment, starting screen, role and record as applicable. Use the real menu, button and field names. Say what to enter, where to get the value, what to expect, and what to record. Write each case so its own fields are enough to run it.
- Name the tool when it changes. For example, create a replacement key in the Beta Dashboard and use Postman to see whether the key works. For an API step, give the method, URL, required headers with safe placeholders, and the status or response fields to check.
- Read the whole deliverable once from the teammate's starting point. Rewrite steps that leave them guessing which tool to use, what value to enter, or where to see the result. If the user calls out confusing wording, fix the other affected steps and prerequisites as well.
- Explain technical terms only where they help the reader act or verify a result. Put code detail near the evidence. If the output also needs a machine-readable record, give the human result in words and include the required record separately. Keep the role's required fields and result labels.

## Canonical QA Standard

For QA work, read [[00 Start Here/World-Class Software Quality Standard]]. It owns scope, proof targets, coverage, evidence, safety, finding classification, readiness, and release decisions. Apply the portions relevant to the request. Use [[00 Start Here/QA Operating Workflow]] to choose a QA workflow and the [[00 Start Here/Showpass QA Handbook/00 Index|Showpass QA Master Handbook]] for hands-on testing, terminology, setup, and connected Organizer, Customer, Attendee/Member, and Venue Employee flows.

### Source Of Truth

- Backend behavior, schemas, permissions, and validation: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Visible entry points, controls, and client behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright planning, implementation and review start in the sibling checkout. Read [its agent instructions](../showpass-playwright/AGENTS.md) and [team workflow](../showpass-playwright/docs/agent-workflows/playwright-team.md) first, including when the request starts in this vault. Carry the current work item to the repo and follow the requested scope.

Trace the backend first for behavior. Use frontend evidence for how people reach it. Separate source findings, live observations, saved results, and test outcomes.

### Coverage Review And Implementation

- For release readiness or “what coverage do we have?”, use [[06 Prompts/Release Coverage Review]] and `05 Tooling/scripts/collect-release-coverage.mjs`. Compare saved Qase cases, exact Playwright assertions, and browser checks against each changed behavior. Search matches are candidates. Report Full, Partial, None, or Unknown separately from current execution, and name exact remaining checks. For a release decision or engineering handoff, apply the [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|shared review policy]] and record the QA Lead's decision on the exact handoff separately from the release recommendation.
- For authorized implementation, reuse existing setup and cleanup, make the scoped change, verify the focused behavior, and check actual CI status within scope. Carry through an authorized improvement even if an earlier worker only planned it. Keep failed, unrun, skipped, and retry-only results visible.
- For requested prevention after a confirmed escaped bug, use [[06 Prompts/Escaped Bug To Regression]]. Tie the regression to the actual failure and verify it catches the missing behavior.

### Branch And PR QA Rules

- For branch or PR QA, confirm the active branch and intended base. Start from the exact diff and explain the changed behavior in everyday language before writing cases. For Jira-card generation, read a diff only when the user asks for branch- or diff-based coverage.
- Trace changed APIs, services, models, webhooks, jobs, and shared components to every affected client, including clients with unchanged files. Account for provider callbacks, polling, and delayed updates when they can affect orders, money, inventory, fulfillment, or reporting.
- List where people start (for example, Web Box Office or Electron) separately from what can happen (success, cancel, failure, retry, timeout, or delayed result). Prove a clean success as its own check. Test each control or recovery path where it exists; mark unsupported combinations as not applicable.

### Manual Test Case Readability And Route Stability

- Use visible product navigation and precise actions, such as Dashboard → Events → Manage Events → Edit. Put route and source details in the description or sources. Hard-code a route in an execution step only when the route is being tested or no visible navigation exists. Group Dashboard cases by [[03 Test Cases/Test Cases by Feature#Dashboard UI Organization|the visible menu and owning screen]].
- For migrations, confirm old business functions are reachable from the real landing page. Apply [[00 Start Here/World-Class Software Quality Standard#Preserve Access During Page Migrations]]. Direct URLs alone do not prove discoverability.
- For manual reproduction and human checks, use [[00 Start Here/World-Class Software Quality Standard#Executable Reproduction Handoff]]. State how to reach the required starting state and provide numbered Expected/Actual steps. Use the separate Qase format for standalone cases.
- Combine cases with the same actions and result using a readable parameter. Split cases when permission or entry-point differences make the steps confusing. Use `TC-*` for local drafts and `SPT-*` only for existing Qase IDs. Keep local IDs out of Qase titles and execution fields. Keep Jira traceability outside the case description.
- Follow [[05 Tooling/Qase Test Case Writing Rules]] for standalone prerequisites, form coverage, source verification, and Copy-to-Qase review. Apply its [[05 Tooling/Qase Test Case Writing Rules#Explain Showpass Terms And Where To Find Them|setup wording]] and [[05 Tooling/Qase Test Case Writing Rules#Scannable Preconditions And Explicit Event Setup|prerequisite format]]. Name exact permissions, flags, setup locations, and values. Use [[05 Tooling/Qase Test Case Writing Rules#Package Events And Guest Information]] for parent versus child Events and whose information each ticket collects. Preserve Platform/View, verify saved Single parameters across the scoped cases, and carry setup corrections through every affected field and the canonical note.
- Use [[06 Prompts/Showpass Qase Gap Analysis]] for focused standalone drafts first and compact findings afterward. Split distinct behaviors so each case can be followed on its own.

## Sentry Record Details

Include a compact lookup table near the top of each investigation and the useful details in the reply. Name the Venue and Venue ID, the Customer name/email/ID if needed for lookup, Event/date, purchased or exchanged items with quantities and IDs, original order reference and items, and replacement basket/invoice/credit IDs where relevant. Read relevant captured values even when tags are empty. Label information as not captured, redacted, not applicable, or blocked by named access. Use narrow, permitted read-only correlation and omit credentials and barcodes.

Keep original and replacement records distinct. Verify and label the lookup type for each ID and destination. An **Invoice item ID** identifies one order line. If its parent is unverified, write **Invoice ID unknown**. For a permitted Admin lookup, send an Invoice ID to Invoices and an Invoice item ID to Invoice items. Find a parent invoice through the item's **Invoice** field. Searching under the wrong record type does not prove a record was deleted.

## Vault Handshake

| Folder | Use |
| --- | --- |
| `00 Start Here/` | Orientation, standards, and QA workflow |
| `01 Repositories/` | Repository reference notes |
| `02 Feature QA/` | Feature notes and risk analysis. Start at the index and keep supporting data by its report. |
| `03 Test Cases/` | Manual case templates, drafts, and browser reports |
| `04 Automation/` | Automation candidates and planning |
| `05 Tooling/` | Tool workflows and maintained scripts |
| `06 Prompts/` | Reusable prompts and agent workflows |
| `08 Sentry Investigations/` | Sentry investigations and reproductions |
| `99 Archive/` | Inactive notes and local QA evidence |

Keep one active output note per QA request, ticket, feature, or Qase work item. Reuse the existing canonical note and preserve the user's edits, links, IDs, headings, and surrounding content. Treat `*Template.md` files as reusable scaffolds and write generated outputs to a feature-specific note unless the user requests a template edit. Reference source paths instead of copying repositories or large snippets into the vault.

### Skills and Workflows

- Create or update skills for the QA Vault and QA City in `.agents/skills/<skill-name>/`. Keep their supporting files and any required license notices in Git. Link the repository copy from [[00 Start Here/Showpass QA City#Codex skill directory|the skill directory]] and use repo-relative paths for vault references.
- Save reusable Showpass QA workflows in `06 Prompts/`, or update the existing note that owns the procedure. Link to code-specific workflows in their owning repositories so the instructions follow the code they apply to.
- Before handing off a new skill or workflow, verify its files and links resolve from the vault checkout and that new files are included in Git.

## Browser Reports And Evidence

- Use [[06 Prompts/Interactive Browser Release Testing#Keep the scope and finish clear]] for live runs. Keep scope tied to the requested outcome, select the proof needed, and account for every in-scope action, state, side effect, and cleanup path. Plan authorized cleanup before a mutation and verify it in the same environment and session.
- Use [[03 Test Cases/Browser Test Report Template]] for the run note. It owns the stable test IDs and links, starting-state and Expected/Actual steps, rendered screenshots, and single final results table. Use one copy-ready Jira draft per confirmed browser bug beside the affected test. Follow the Showpass bug-drafter for the draft. Use first person for the user's own observations and keep evidence provenance clear. Rewriting a report preserves the run date and distinguishes instruction improvements from new execution.
- Keep screenshots and images under `99 Archive/QA Evidence/<feature>/<run-slug>/`. Link or render them in the active note as directed by the template. Keep large files and generated binaries out of Git. A necessary repository asset requires a narrow file-specific exception and an explanation. Preserve originals and update active links if relocating evidence.
- Keep agent-created scratch files, intermediate exports, and routine browser text dumps under `/private/tmp` when practical. Track exact paths, remove disposable copies with `rm` after extracting useful proof, and verify cleanup. Preserve necessary evidence, outputs, and user files. Explain any raw capture retained for proof.

## No-Guessing Communication Rule

For a user check, decision, or approval, lead with **I need you to check**, **I need you to decide**, or **I need your approval**. Follow [[00 Start Here/World-Class Software Quality Standard#12. Human Verification Without Guessing|Human Verification Without Guessing]]. In a prioritized list, give the exact start, action, expected result or options, and what to report back. Label each action **no data change**, **changes test data**, or **potentially destructive**. State what is confirmed, what remains uncertain or unrun, what the user can skip, whether anything is blocked, and the next authorized step. Include the complete first check and any observation window in chat.
