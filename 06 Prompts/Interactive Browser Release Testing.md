---
title: Interactive Browser Release Testing
date: 2026-07-26
tags:
  - qa/prompt
  - browser-testing
  - release-readiness
aliases:
  - Deep Browser QA Prompt
  - Browser Smoke Testing
---

# Interactive Browser Release Testing

Use this workflow to test in the in-app browser. Choose a focused smoke check to find important problems quickly, or a deep review of the declared release scope. Reuse the current session, source knowledge and existing test notes.

The reusable QA tester entrypoint is `$showpass-qa-tester`, installed in the user's Codex skills. This note maintains its detailed browser execution rules; [[06 Prompts/Example - Browser Testing]] provides copyable skill requests.

## Canonical Relationship

Read [[00 Start Here/World-Class Software Quality Standard]] first. It defines the shared coverage contract, evidence rules, complex-control decomposition, data safety, finding classification, readiness gates, and release vocabulary.

Reuse relevant cases from [[06 Prompts/Showpass QA Test Case Generator]] when available. A focused smoke check can start from the requested page without first generating a full test suite. Trace the selected behavior in source and use the relevant handbook sections. Creating cases and comparing Qase coverage remain separate tasks.

## Standard for Every Run: Plan → Test → Evidence

Act as the QA tester responsible for carrying the requested checks through to a clear result. The user supplies the goal and any necessary boundaries. Resolve known details from the conversation, source, existing notes and the authorized browser session. Choose useful checks, execute them, investigate failures and preserve proof. Ask the user to perform a check only when their access, judgment, physical device or independent reproduction is actually needed.

### 1. Show the Plan

Before the first browser test action, share a short plan in chat. Record the same plan in the single run note; reuse existing case IDs when available. A task stated in one sentence is enough to begin; a separate generated test suite is optional.

State the environment, requested page/version, signed-in or signed-out state, selected Organizer when applicable, and the important exclusions. Identify any session or saved-data changes. For each selected check, use:

| Check | Starting page / record / state | What I will do | Expected result and proof |
| --- | --- | --- | --- |

Keep the chat plan readable. For a deep review, summarize groups of checks and link their full scope in the run note. For a focused quest, name the actual pages and variations selected, and why they matter. A version-bump request does not require inventing feature changes: inspect the supplied exact diff when present, then select affected behavior and useful regression checks. State when the deployed version is unknown.

**Default: show the plan, then execute the requested checks within the existing authorization.** The plan is visible before testing; it is not an extra approval request. Do not add a waiting period or ask for the same permission again. If the user says `Plan only` or `Wait for my approval`, stop after the reviewable plan and wait. Ask a targeted question when a missing fact or an action outside the authorized scope genuinely blocks a check; continue independent authorized checks meanwhile.

### 2. Test and Follow Through

Execute the selected checks in risk order using the relevant source rules and handbook guidance. Establish the required starting state before judging the result. An unavailable browser capability or missing test record is a named gap, not a reason to silently substitute another check or claim success.

Investigate suspicious results safely. Check whether the failure repeats and whether the actual configuration explains it. Finish other independent checks when a finding does not prevent them. If new evidence changes the plan, briefly explain the change and update the same note. Expanding into a new feature or an unapproved data change requires its own scope decision.

### 3. Bring Back Evidence

Use [[03 Test Cases/Browser Test Report Template]] for one readable walkthrough: setup, numbered actions, **Expected**, **Actual**, and the real screenshot beneath each executed step. Give each screenshot a short environment/state/time caption. If a step or capture could not run, state the exact reason there and identify dependent steps left unrun. Source/API/helper hints belong beside the relevant step only when useful and grounded; temporary browser element numbers are not reusable selectors.

Each test must state **What this tests** and **Start here** before its numbered **Steps**. Name the starting screen, person, Organizer and required record state. Write concrete actions in order, naming the exact visible control, item or entered value. Expected results must say exactly what to inspect: a named message, link, field, amount or saved outcome. “Open Build” followed by “restricted actions are unavailable” is insufficient; name **All gift cards** and **Create gift card** when those are the links being assessed. Do not force an arbitrary number of steps; include the actions needed to follow the test without the chat history.

Keep navigation checks, direct-address checks and saved-action checks distinguishable. Explain dependencies: if access is correctly refused, dependent form actions remain unrun. When rewriting an old report, preserve the original run date, observations and evidence; label the wording update and do not turn added instructions into newly executed results. Move lengthy technical extracts into supporting notes so they do not obscure the user's actions.

Render screenshots with standard Markdown image syntax or HTML image markup that limits display width to **600px**, preserving the original image files. Use paths relative to the report; enclose spaces in angle brackets for Markdown and URL-encode them for HTML. Use the template's clickable image example to open the full-size original. Do not put screenshots in collapsed callouts, replace them with download links, or rely only on Obsidian-specific embeds. Keeping images ignored by Git must not prevent their local display. Verify every referenced image exists and use the correct file extension. A single capture can support opening and inspecting the same screen; do not duplicate captures just to fill newly split instructions.

Maintain one canonical run note under `03 Test Cases/<feature>/`; reuse a matching note first. Images remain local under `99 Archive/QA Evidence/<feature>/<run-slug>/` and out of Git by default, following `AGENTS.md`. Other necessary outputs may remain beside the note under its evidence folder, subject to existing ignore rules. Keep temporary captures under `/private/tmp` and delete them after use. Never invent or substitute screenshots to fill a missing step.

Show failures where they occurred, keeping Expected separate from Actual. A screenshot does not replace API, saved-state, count, downstream or cleanup proof. Record user-reported results separately from agent-executed checks. Support the stronger claim only when the available evidence establishes it.

After the walkthrough, include cleanup/restored or preserved data and only useful references/open questions. **The report ends with one results table:** `Check / scenario | Status | Observed result or exact gap | Go to test`. Use Passed, Failed, Blocked and Not run; explain uncertainty in the affected row. Match the plan's check names so every selected check is accounted for. Assign stable report-local IDs (`TC-01`, `TC-02`, and so on) in the plan, clickable index, test headings and results rows. Link each result to the exact test heading and name its relevant step. Split independently assessed checks so a failed Build-menu check does not point vaguely to several Navigation steps. State the canonical release recommendation for the agreed scope before this final table. Do not create a separate evidence gallery, status dashboard or duplicate report.

Before delivery, read each test without relying on the chat: could the user identify where to start, what to do, what to inspect and why it passed or failed? Rewrite any step that requires guessing. The Playwright [forced-sold-out walkthrough](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/specs/discovery/SPEC_single-day-event-forced-sold-out.md>) demonstrates concrete actions, per-step expected results, conditional unrun steps and nearby screenshots. Use that writing pattern without importing its feature setup or replacing this vault's final results table.

### Jira drafts for confirmed bugs

Include a copy-ready Jira draft for each distinct confirmed bug in the same run note, beside the affected test and before the final results table. Use a report-local ID such as `BUG-01`; link the affected test results and index to it. Several failed checks caused by the same issue share one draft. Inconclusive observations, unsubmitted risks and checks not run stay clearly labelled; do not turn them into confirmed bugs just to populate this section.

Follow the template's format: **Title: `fix (area) | specific observed problem`**, **GIVEN**, **WHEN**, **THEN — observed**, and a separate **Expected** result. Add concise business impact, tested page/environment/date, exact test-step/evidence links, material verification limits and data safety/cleanup. State actual role permissions and configuration when needed to reproduce. Keep the draft understandable without the chat, and distinguish a visible control or opened form from a successful saved action.

Reuse the detailed reproduction and screenshots already recorded under the test; do not create a second long reproduction or image gallery. Label the card **Draft only**. Drafting does not authorize creating, updating, commenting on or transitioning a Jira issue. Use the connected Atlassian Rovo tools only when the user separately requests a Jira write, following `AGENTS.md`.

### Example Quest: Signed-Out Dashboard Access

Goal: `Open protected dashboard pages directly while signed out. Confirm no protected data appears.`

- Trace the relevant frontend access checks and backend authorization. Select exact pages from the requested scope that exercise meaningfully different access paths, including a sensitive page. State what the sample leaves untested; it does not prove every dashboard page or endpoint is protected.
- Use an already-signed-out session or a supported separate test session when available and authorized. Another tab may share the same login. Do not call it signed out without checking. Preserve the user's working session; if signing it out or clearing its stored data is necessary and outside the user's permission, ask about that specific change.
- Open each selected protected URL directly and reload it. Observe the page while it loads as well as its final state. Check for the source-defined login/access response and for customer, order, sales, financial or other protected content appearing before it. A redirect alone is insufficient proof. Direct URLs belong in these test steps because direct access is the behavior under test.
- Use supported browser evidence to check responses or the loading sequence when available. If the available tool cannot observe an early data flash, initial response or protected API response, name that limit. Report only the visible checks actually proven; leave the stronger no-data-exposure conclusion unverified when necessary. Do not turn source review into an executed security pass.
- Save the checked URLs, verified session state, observed loading/final results and evidence. If protected data appears, preserve only the minimum safe proof and stop exploring those records. Report the exposure and continue only checks that do not increase it. Do not submit forms, trigger jobs or modify Qase as part of this quest.

## Choose the Depth

| Request | What to do | What the result means |
| --- | --- | --- |
| Smoke test, quick browser check, or what should I test first? | Select the most important business checks and execute them within the authorized data boundaries. | Evidence for those specific checks, with important untested behavior named. |
| Deep review, release readiness, or execute this full test note | Execute the declared cases and applicable control, state, error, keyboard and responsive checks. | A release recommendation for the declared scope, supported by the complete coverage accounting. |

Do not silently turn a smoke check into a full-page audit. Do not narrow an explicit full-review request into a smoke check. For an unspecified browser-testing request, state the chosen depth and scope briefly, then proceed using the user's context.

## Focused Smoke Check

1. **Confirm the starting point once.** Reuse the matching open tab. Identify the environment, selected Organizer, employee role and requested page version. When the user requests the new page, test that page; use legacy source to understand business rules and migration risks. Compare legacy UI only when that comparison is in scope.
2. **Pick checks by business impact.** Start with what an employee or customer must be able to finish. Use backend rules, frontend behavior, relevant handbook guidance and previous failures to choose the checks. Add the existing-data state most likely to expose a different result. Show a short prioritized table: `Check | Why it matters | Required setup / data change`. A handful of distinct checks is a useful starting point, not a fixed limit or permission to omit an applicable critical risk.
3. **Prove a clean success first.** For example: save an item and reopen it; generate one representative report and inspect its contents; check in one valid ticket and verify its saved status. A page loading or a form opening proves only that observation. Use only actions authorized for the available test data; mark the success check blocked when the necessary action is outside that scope.
4. **Choose meaningful variations.** Examples include sold versus unsold products, available versus fully used membership benefits, and reports with different filter fields. Reuse one sample only when the source shows that it proves the same behavior. Record which types and fields were actually tested; do not claim the whole family passed. For migrations, check important functions are reachable from the actual user landing page, including moved functions such as custom fees.
5. **Add focused interaction checks.** Exercise the search, filters, row actions, validation and cancel/reopen behavior needed for the selected workflows. When desktop/mobile UX is requested, name the tested screen sizes and check key actions on both. Browser resizing does not prove a physical-device pass. Before reporting a keyboard bug, try the control with normal Tab, Enter, Space, arrows and Escape as applicable.
6. **Follow suspicious results far enough.** Check the actual rule, record state and saved result before deciding something is a bug. A sold-item price field being editable deserves investigation even if the rest of the page looks fine. Continue independent checks after a finding; pause only the work that needs unavailable access, unsafe data changes or missing setup.
7. **Finish with results and the next useful checks.** Account for every selected or discovered in-scope check as tested, failed, blocked, deferred or not applicable, using the canonical statuses in the note. Name important work outside the sample separately. Do not keep testing equivalent variations merely to increase the count. Do not leave selected checks unaccounted for when a time limit or missing setup prevents execution.

Apply the canonical [[00 Start Here/World-Class Software Quality Standard#Financial and Core Transaction Gates|financial and core transaction rules]] in both modes. Money, fees, item/rate-card saving, purchases, duplicate charges, stock and service-fee revenue need their applicable proof. A read-only inspection cannot clear their save/payment checks. If required proof is missing, the decision for that scope remains blocked; individual UI checks can still pass. A purely visual check does not automatically require an unrelated purchase.

### Keep the Run Light

- Reuse the current session and verified setup; do not launch another browser, build, development server or broad automation suite just for this check.
- Read only the source and handbook sections needed to establish the selected behavior. Do not rescan the full repository or Qase project on every browser check. Query Qase when comparison with existing cases is requested or needed for a proposed new case, following [[05 Tooling/qasectl]].
- Observe and collect evidence in the same pass. Capture the required success, saved-state and finding evidence; avoid repeated screenshots or interactions that add no proof. One screenshot can support several clearly named observations.
- Reuse one canonical feature/run note. A smoke check does not require separate planning, findings and summary files. Keep source details and lengthy evidence in a collapsed callout.
- Save routine browser text dumps under `/private/tmp` while investigating. After recording the useful findings and required proof, delete redundant dumps with `rm` and remove their links. Keep a raw capture only when it supplies necessary evidence unavailable elsewhere, with its purpose stated. Preserve screenshots, real CSV/PDF outputs and user-provided files.
- Reuse existing mutation and cleanup authorization. When it is missing, continue useful non-saving checks and name exactly which save, purchase, import or other action was not run. A smoke request alone does not authorize live data changes or Qase publication.

### Smoke Results

Use the same step-by-step report format for smoke and deep runs; the selected depth changes the checks, not their readability. Start with a short important result, then the setup and walkthrough with visible screenshots. Put the Passed / Failed / Blocked / Not run table at the end, after cleanup and supporting references. Keep the main text in everyday language.

For a bug, apply the finding rules below without repeating the same reproduction in another section. Say `No critical bugs found in the checks run` only when supported, and name important untested behavior. Do not turn a sample into whole-feature readiness. If the user must act, give the exact starting place, action, expected outcomes, data-change label and what to report. Do not ask them to repeat proven checks.

Shared safety, evidence, findings and decision rules apply to both modes. A deep review accounts for its declared control/state scope; a focused smoke report makes the sample and its limits explicit.

## Quick Start

Copyable examples: [[06 Prompts/Example - Browser Testing]].

For a focused smoke check:

```text
Use $showpass-qa-tester.
Mode: Focused smoke.
Test the new page in the open browser. Prioritize business-critical behavior.
Tell me what passed, any bugs, and the most important checks not run.
```

Add specific records or authorized test-data changes only when needed. The workflow should reuse known context instead of asking for it again.

For a deep review of an existing test note:

```text
Use $showpass-qa-tester to execute:
[[03 Test Cases/<feature>/<test-case-note>]]
```

Example:

```text
Use $showpass-qa-tester to execute:
[[03 Test Cases/Memberships/membership-benefit-seating-permissions-test-cases]]
```

That two-line request is sufficient when the test note or its linked sources identify the workflow, role, route, environment, fixtures, and data boundaries.

### Quick-Start Resolution Contract

When invoked with only a test-note link:

1. Treat that note as the canonical declared scope and test source.
2. Read the complete note and every directly linked vault instruction required to execute it.
3. Derive the following from the note, linked repository notes, current browser state, and source evidence:
   - Testing Intent and business invariant;
   - target route or URL;
   - required role and permissions;
   - environment and fixture;
   - authentication method and named credential variables;
   - test-data ownership and cleanup boundaries;
   - Critical, Major, and remaining applicable cases;
   - entry paths, outcomes, viewports, and complex controls;
   - existing canonical execution note for the same test scope.
4. Use the already-open in-app browser when it matches the declared scope. Do not treat an unrelated open page as proof of the intended target.
5. If an execution note already exists for the same test note and environment, update it. Otherwise create one execution note named from the test-note slug and run date.
6. Make safe, evidence-backed assumptions that do not change user-owned data or expand scope.
7. Ask one targeted question only when a missing URL, required fixture, credential-variable name, role, destructive-data decision, or other fact genuinely blocks execution.
8. Do not make the user repeat information already present in the test note, its links, the vault, the source repositories, or the current browser.

## Optional Overrides

Add only the values that differ from the test note:

```text
Use $showpass-qa-tester to execute:
[[03 Test Cases/<feature>/<test-case-note>]]

Overrides:
- Environment: <environment>
- Target URL: <URL>
- Existing run note: <path>
- Test-data boundary: <override>
- Evidence retention: <cleanup-required or preserve-for-review>
- Release goal: <override>
```

The full input form below is for cases where no complete test note exists. It is not required for normal execution.

```text
Perform a release-readiness browser test of the supplied workflow.

Fallback inputs:
- Target URL: <target URL>
- Required page or resource: <page/resource that must be accessible>
- Login URL or expected redirect: <login URL or redirect>
- Email environment variable: <email variable name>
- Password environment variable: <password variable name>
- OTP expected: <yes/no>
- Test-case source: <path to the canonical test-case note>
- Existing run note, if any: <path or none>
- Testing intent or business invariant: <what must stay true>
- Declared in-scope roles, entry paths, states, outcomes, clients, and viewports: <scope>
- Declared out-of-scope areas and reasons: <scope exclusions>
- Source or change context, if applicable: <Jira, PR, branch, route, or source paths>
- Test-data boundaries: <data that may be created or changed>
- Release goal: <what must be true for this to be releasable>

Quality-standard preflight:
1. Read `00 Start Here/World-Class Software Quality Standard.md`.
2. Read the complete canonical test-case source.
3. Confirm or create:
   - Testing Intent;
   - Proof Target Map;
   - declared in-scope and out-of-scope coverage;
   - state-space and initial-condition matrix;
   - state-distinct entry-path inventory;
   - supported success, cancellation, failure, retry, recovery, and delayed outcomes;
   - product-surface and complex-control inventory;
   - data ownership and cleanup rules;
   - initial coverage ledger.
4. Do not claim release readiness for undeclared or implicitly covered scope.
5. If the test-case source lacks this contract, add the missing execution-facing sections to the single run note before testing. Do not create a competing planning file.

Browser and authentication:
1. Use the existing in-app browser tab when one is already open.
2. Navigate to the target URL and authenticate only if required.
3. Read credentials from the named environment variables. Never print, log, or expose their values.
4. If an OTP prompt appears, stop and ask me for the OTP. Do not guess it, retrieve it elsewhere, or attempt to continue.
5. After login, navigate to the required page or resource.
6. If the required page is inaccessible, stop the run immediately and report the exact access failure. Do not substitute a similar page.

Run-note rule:
1. Maintain exactly one canonical execution note for this run under the matching `03 Test Cases/<feature>/` folder.
2. If a run note already exists for the same scope, update it instead of creating another file.
3. Record the environment, target, browser, authenticated role, test source, start time, current state, Testing Intent, Proof Target Map, coverage ledger, evidence-retention class, screenshot index, and release recommendation.
4. Log findings as they are discovered, but continue testing unless:
   - the required page becomes inaccessible;
   - continuing would risk unrecoverable or user-owned data;
   - authentication or external access blocks the run.
5. Do not stop merely because a defect is found.

Data-safety rules:
1. Treat pre-existing records, assignments, quantities, permissions, and configuration as user-owned.
2. Do not delete, overwrite, or clean up user-owned data.
3. Prefer selection-only, navigation-only, or unsaved input checks.
4. Before creating persistent test data, classify it as either:
   - **Cleanup-required**: temporary data whose review value ends after evidence is captured; or
   - **Preserve-for-review**: a clearly named artifact the user must be able to inspect in the product after the run.
5. When the user asks to review the work, asks for screenshots, questions confidence, or otherwise needs independently inspectable proof, classify the critical-path result as Preserve-for-review unless the user explicitly says to clean it up.
6. Never delete a Preserve-for-review artifact during the same run. Record its exact identifier, route, creation time, owner, state, and intended cleanup condition. Leave the browser on a neutral page where the user can inspect it.
7. Delete Cleanup-required data only when cleanup is safe, explicitly within scope, and the artifact is not needed for user review. Capture proof before deletion and prove the final state afterward.
8. If retention intent is ambiguous after a persistent mutation exists, preserve the artifact and ask for cleanup approval instead of deleting it.
9. If the live state differs from the documented setup, record the difference and preserve it.

Reviewable evidence and screenshots:
1. A Markdown statement is an evidence index, not a substitute for independently reviewable proof.
2. Capture screenshots for:
   - every Critical or Major clean-success proof target;
   - every persistent mutation after success and again after a fresh reload or reopen;
   - every confirmed visible defect;
   - every safe error, unavailable, or access-denied state that affects the release decision;
   - the final preserved review state or verified cleanup state.
3. For a critical mutation, capture at minimum:
   - the starting context before submission;
   - the visible success result with the unique test identifier;
   - the persisted result after a fresh reload or reopen;
   - the downstream or cross-route result when applicable.
4. Save screenshots locally under `99 Archive/QA Evidence/<feature>/<run-slug>/` with deterministic, descriptive filenames. Keep this directory ignored by Git; a necessary repository file uses the narrow exception described in `AGENTS.md`. Do not place durable evidence only in a temporary directory or the Downloads folder. The active run note remains under `03 Test Cases/` and embeds the archive paths.
5. Render each real screenshot directly beneath its numbered step following the template's image markup and display width of up to 600px. Keep a valid relative path and the full-size original. Include the environment, action, observed result and capture time in a short caption. Do not collapse screenshots or provide only links. If capture is unavailable, state why instead of creating a missing-image embed.
6. Link the screenshot files directly in the final response so the user can review them without trusting the narrative alone.
7. Screenshots must show enough page context to identify the route or workflow and the key result. Do not crop away information needed to judge the claim.
8. Do not capture or expose passwords, tokens, payment credentials, personal data not required by the proof target, or unrelated user-owned information.
9. Screenshots supplement rather than replace CSV parsing, fresh persistence checks, downstream verification, console evidence, or source-backed reasoning.

Execution order:

Apply [[00 Start Here/World-Class Software Quality Standard#Financial and Core Transaction Gates]] before execution and before reporting a smoke result. Name the applicable money, item/rate-card saving, purchase, duplicate-charge and stock proof targets. Verify actual exceptions and configuration; a suspected financial protection must be resolved or explicitly blocked. A read-only run can pass individual UI assertions while the financial/core transaction decision remains blocked. Existing authorization and data-safety boundaries still apply.

1. Prove a clean successful path independently of retry or recovery coverage.
2. Execute Critical and Major cases first.
3. For a deep review, continue through all remaining applicable declared cases. For focused smoke, complete the selected checks and explicitly account for important behavior outside the sample; do not claim a full release review.
4. Execute every state-distinct entry path when it carries materially different state.
5. Cover each supported outcome only on clients that actually provide it.
6. Mark fixture-dependent cases Manual-only, Deferred, Blocked, or Not Applicable with the exact reason and evidence needed.
7. Do not force a scenario onto a fixture that cannot represent it.
8. After the scripted cases, perform the product-surface and interaction checks appropriate to the selected depth and declared scope. Keep untested controls and states explicit.
9. Update the coverage ledger so every discovered in-scope item is accounted for.

Coverage-ledger rule:
1. Track each meaningful route, control, state, validation, mutation, side effect, permission gate, complex-control child, and cleanup path.
2. Use only these coverage labels:
   - Visible only;
   - Automated;
   - Browser-verified only;
   - API/backend verified;
   - Manual: executed;
   - Manual-only;
   - Deferred;
   - Not applicable;
   - Blocked.
3. Visibility does not count as interaction coverage.
4. Every Manual-only, Deferred, Not applicable, or Blocked row needs a reason and the evidence or fixture required to change it.
5. A mutation is not complete until success, persistence or downstream evidence, and cleanup, safe isolation, or explicit Preserve-for-review retention are accounted for.

Deep interaction audit:

For deep review, audit every visible control in the declared scope. For focused smoke, apply this inventory to the selected workflows and name untested behavior. Include applicable:
- buttons, links, tabs, menus, dropdowns, comboboxes, checkboxes, radios, toggles, steppers, text fields, numeric fields, rich-text controls, modal close controls, and footer actions;
- disabled, enabled, loading, empty, error, saved, unsaved, dirty, and reopened states;
- keyboard focus, Tab order, Enter, Space, Escape, arrow keys, and Shift-modified actions;
- modal open, close, nested modal, discard, reopen, and state-preservation behavior;
- responsive layout and controls at a smaller supported viewport.

Decompose complex controls before claiming coverage:
- list every meaningful rich-text toolbar action, combobox state, modal child control, table row action, upload path, map family, canvas control, or virtualized-list state;
- give each child control a coverage status;
- do not call the parent control covered because one representative interaction passed.

For every input, cover applicable boundaries without saving unsafe values:
- blank and whitespace-only;
- valid minimum, representative valid value, and valid maximum;
- zero and negative;
- decimal in whole-number fields;
- value above the allowed maximum;
- text in numeric fields;
- duplicate value;
- dependent-field conflicts, such as a limit greater than inventory;
- keyboard increments and decrements;
- sanitization or silent transformation of typed values.

For an interactive map or canvas, audit every available item family:
- regular selectable items;
- grouped or atomic items;
- general-admission or region items;
- straight, curved, transformed, mirrored, circular, table, row, or segment variants available in the fixture;
- visible status, label, selection count, color, and corresponding side-panel state.

For every canvas item family, test:
1. Single click.
2. Repeated click on the selected item.
3. Double-click when safe.
4. Plain click on another item.
5. Shift-click to add multiple compatible items.
6. Shift-click on an already-selected item.
7. Drag selection and repeated Shift-drag across compatible item types.
8. Mixed selection across incompatible item types.
9. Enter and Space selection.
10. Arrow-key focus movement.
11. Escape behavior.
12. Explicit Clear behavior.
13. Zoom in, zoom out, wheel zoom, pan, and supported zoom boundaries.
14. Reset or recenter behavior, including whether it unexpectedly changes selection.
15. Switching between segments, regions, seats, tables, or other item families.

Do not assume two paths are equivalent because they use the same component. Test every visible entry path when it can carry different state into the workflow.

Finding standard:

For every finding, record:
- ID and concise title;
- severity;
- affected test case;
- confidence: Confirmed, Inconclusive, or Client-side risk not submitted;
- data safety: No data change, Changes test data, or Potentially destructive;
- exact starting state;
- exact numbered reproduction steps;
- visible expected result;
- visible actual result;
- user or release impact;
- cleanup or reset steps;
- whether the user classified it as blocking or non-blocking.
- the proof target, coverage-ledger row, entry path, and state-space values affected.

Write every finding so a QA employee who has not seen the feature can reproduce it without reading the browser log or source code:
1. Name the environment, role, exact starting route or screen, and a current fixture.
2. Define any product term needed to recognize the fixture or control.
3. Put exact numbered actions and Expected/Actual results in the affected test. The copy-ready Jira draft summarizes the reproduction with GIVEN / WHEN / THEN — observed and a separate Expected result; a second Step Action table is unnecessary when it would repeat those steps.
4. Name controls exactly as displayed in the product.
5. Identify the first step where Actual differs from Expected. In the Jira draft, keep the observed problem separate from the expected behavior.
6. Add impact, data-safety classification, and cleanup or preserved-fixture instructions.
7. Embed the relevant screenshot immediately under the finding. If a screenshot cannot prove the result, state why and name the independent proof required.
8. Do not expose automation mechanics such as locators, DOM state, hidden inputs, sentinels, isolated clipboards, programmatic clicks, or request interception in the manual reproduction.
9. If browser permissions, operating-system state, timing, or the automation interface could explain the result, classify it as Inconclusive until it is repeated through normal user interaction.
10. Use a currently available Preserve-for-review artifact where safe. Never give a reviewer steps that depend silently on deleted test data.

Do not overclaim:
- A client-side enabled button is not an end-to-end defect unless submission was safely attempted.
- A result involving incompatible item types does not prove same-type additive selection is broken.
- Separate confirmed defects, observations, fixture gaps, and product-expectation questions.
- Correct the run note if later evidence weakens or disproves an earlier finding.

Human verification — no guessing:
1. Ask me to verify only findings where my judgment or an independent reproduction materially changes the release decision.
2. Present one check at a time.
3. Start with `Check N of M` and the finding title.
4. State whether the check changes saved data.
5. Give only the exact starting location and actions for that single check.
6. Tell me the exact outcomes I should choose between and exactly what to report.
7. Wait for my answer before presenting the next check.
8. Record my result in the canonical run note.
9. Explicitly identify checks I should not perform because they are destructive, already confirmed, inconclusive, or require another fixture.

Release decision:
1. Distinguish functional correctness, usability findings, fixture-blocked coverage, and unsubmitted risks.
2. Do not assign release-blocker status merely from severity labels. Apply the canonical [[00 Start Here/World-Class Software Quality Standard#Financial and Core Transaction Gates]]: confirmed required-gate failures are No-Go; missing proof blocks the decision. Do not soften either into an overall smoke pass.
3. Preserve my explicit blocker/non-blocker classification.
4. After testing and requested human checks are complete, provide exactly one recommendation:
   - Go;
   - Go with known non-blocking issues;
   - No-Go;
   - Decision blocked by named missing evidence.
5. State the specific findings driving that recommendation and the blocked coverage that remains.
6. Do not call execution complete until every planned and discovered in-scope coverage-ledger row has an explicit status.
7. Do not call a mutation covered unless persistence/downstream proof and cleanup, safe isolation, or explicit Preserve-for-review retention are accounted for.

Reviewer-report format and deduplication:
1. Use [[03 Test Cases/Browser Test Report Template]] for setup, numbered steps with Expected/Actual and rendered screenshots, cleanup, useful references/questions, and one final results table.
2. Record each bug at the step where it occurs; add impact and reproducible conditions there. Avoid a second copy of the reproduction or evidence.
3. Render each evidence image once, beside its step. Use step references in the final table rather than repeating the screenshots in a separate gallery.
4. Pair claims with actual screenshots, inspected outputs, saved records, downstream results or named human verification as required. Screenshots alone do not establish hidden outcomes.
5. Correct disproven findings and keep the reason brief. Never rewrite the expected behavior to make a genuine failure pass.
6. The final table can provide the coverage accounting; do not add duplicate proof-target, inventory and ledger tables when they repeat it. Keep every in-scope gap and its reason visible.
7. Keep source detail and browser mechanics out of the manual actions. Include short source-verified helper/selector or API notes only when they help repeat a step or explain nonvisual proof.
8. Reuse the existing canonical note. Do not migrate an unrelated or handed-off source spec without a revision request; record this run in the matching vault note instead.

Final response:
- For deep review, lead with the release recommendation. For focused smoke, lead with the important observed result and use the compact Smoke Results format above; include the recommendation for that limited scope.
- Summarize confirmed findings, non-blocking findings, and blocked coverage separately.
- State exactly what data was changed, what was cleaned up, and what was deliberately preserved for review.
- Link the single canonical run note.
- Link each critical-path and finding screenshot directly.
- Keep the canonical review note self-contained: put each current finding, its executable reproduction, and its evidence in that note. A detailed execution log may supplement it but must not be required to understand or reproduce a finding.
- State the accounted-for coverage summary and every remaining Manual-only, Deferred, Not applicable, or Blocked category.
- Do not ask me to “review the findings” generally. If another action is required, give one explicit next action.
```

## Operator Notes

- For a map-heavy workflow, provide a fixture that contains at least two compatible regions of each important item type so additive selection can be tested without crossing incompatible inventory.
- For destructive permission or inventory tests, prefer a disposable benefit or resource rather than removing all permissions from shared test data.
- When a persisted result is the object the user needs to review, preserve it until the user explicitly approves cleanup; do not treat same-run deletion as evidence quality.
- Keep the browser open on a neutral state with no unsaved changes when handing control back.


## Maintained Sources and Adaptation

The reusable report shape was traced on 2026-10-23 at local Playwright revision `d32ac168`:

- [Write browser test](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/workflows/write-browser-test.md>) routes to [SPEC_TEMPLATE.md](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/specs/SPEC_TEMPLATE.md>) for setup, numbered actions, expected results, screenshots and cleanup.
- [Browser spec lifecycle](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/standards/browser-spec-lifecycle.md>) supplies real local screenshots beneath steps, concise captions and preserving a handed-off guide.
- [Run browser test](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/workflows/run-browser-test.md>) supplies execution, stopping dependent actions when blocked and separating tool limits from product failures. Locator/evidence and verification/reporting standards supply grounded targets and bounded retries.

Adopt these reusable mechanics without copying the repository workflow wholesale. The vault retains backend-first business investigation, its canonical quality standard, the user's browser-sidebar preference, one canonical run note, ignored archive images, temporary-file cleanup, and the user's requested **final results table**. Upstream preferences against tables or vault evidence accounting do not override these local requirements.

Use available integrations selectively: Jira/Confluence for the supplied acceptance context; Qase for requested coverage comparison; source/PR tools for exact changes; Datadog or Sentry for a relevant runtime failure; design tools for a supplied design comparison. Discover current tools and check access. Correlate evidence to the tested environment, time and record/request when available. Do not assume an integration is accessible, search unrelated data, query every connector, or treat a log entry as proof of an unobserved user outcome. Writes and messages require their own authorization. Integration limits block only the assertions that need them.
