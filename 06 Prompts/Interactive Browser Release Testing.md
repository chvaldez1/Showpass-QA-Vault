---
title: Interactive Browser Release Testing
date: 2026-07-26
tags:
  - qa/prompt
  - browser-testing
  - release-readiness
aliases:
  - Deep Browser QA Prompt
---

# Interactive Browser Release Testing

Use this prompt for release-oriented exploratory testing in the in-app browser. The preferred invocation points to one canonical test note under `03 Test Cases/`; the workflow derives everything else it safely can from that note, its links, the open browser, and the vault.

## Canonical Relationship

Read [[00 Start Here/World-Class Software Quality Standard]] first. It defines the shared coverage contract, evidence rules, complex-control decomposition, data safety, finding classification, readiness gates, and release vocabulary.

Use [[06 Prompts/Showpass QA Test Case Generator]] before this prompt when source-backed test cases or a coverage plan still need to be created. This browser workflow executes and extends that declared coverage; it does not replace the design standard.

## Quick Start

This is the normal reusable prompt:

```text
Use [[06 Prompts/Interactive Browser Release Testing]] to execute:
[[03 Test Cases/<feature>/<test-case-note>]]
```

Example:

```text
Use [[06 Prompts/Interactive Browser Release Testing]] to execute:
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
Use [[06 Prompts/Interactive Browser Release Testing]] to execute:
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
4. Save screenshots under `03 Test Cases/<feature>/evidence/<run-slug>/` with deterministic, descriptive filenames. Do not place durable evidence only in a temporary directory or the Downloads folder.
5. Embed every screenshot in the canonical run note with an Obsidian image embed and a caption stating the route, action, expected result, observed result, and capture time.
6. Link the screenshot files directly in the final response so the user can review them without trusting the narrative alone.
7. Screenshots must show enough page context to identify the route or workflow and the key result. Do not crop away information needed to judge the claim.
8. Do not capture or expose passwords, tokens, payment credentials, personal data not required by the proof target, or unrelated user-owned information.
9. Screenshots supplement rather than replace CSV parsing, fresh persistence checks, downstream verification, console evidence, or source-backed reasoning.

Execution order:
1. Prove a clean successful path independently of retry or recovery coverage.
2. Execute Critical and Major cases first.
3. Continue through the remaining applicable cases because the goal is release readiness, not only priority smoke coverage.
4. Execute every state-distinct entry path when it carries materially different state.
5. Cover each supported outcome only on clients that actually provide it.
6. Mark fixture-dependent cases Manual-only, Deferred, Blocked, or Not Applicable with the exact reason and evidence needed.
7. Do not force a scenario onto a fixture that cannot represent it.
8. After the scripted cases, perform the product-surface and deep interaction audits below.
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

Audit every visible control a user can interact with, including:
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
3. Use a `Step Action | Data | Expected Result` table with one visible action per row.
4. Name controls exactly as displayed in the product.
5. Put the Actual Result after the table and identify the first step where it differs.
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
2. Do not assign release-blocker status merely from severity labels.
3. Preserve my explicit blocker/non-blocker classification.
4. After testing and requested human checks are complete, provide exactly one recommendation:
   - Go;
   - Go with known non-blocking issues;
   - No-Go;
   - Decision blocked by named missing evidence.
5. State the specific findings driving that recommendation and the blocked coverage that remains.
6. Do not call execution complete until every planned and discovered in-scope coverage-ledger row has an explicit status.
7. Do not call a mutation covered unless persistence/downstream proof and cleanup, safe isolation, or explicit Preserve-for-review retention are accounted for.

Reviewer-report deduplication:
1. When the user asks for a concise test report, use one canonical reviewer-facing note with only:
   - Result;
   - Confirmed Bugs;
   - Testing Proof;
   - Preserved Review Data, when applicable;
   - Not Executed.
2. Record each confirmed bug once. Put its reproduction, actual result, impact, and screenshots in that single section.
3. Record each screenshot or evidence file once. Do not repeat it in a separate evidence index, product-surface inventory, finding summary, and coverage ledger.
4. Testing Proof must pair every claimed pass with its screenshot, downloaded file, persisted record, downstream result, or named human verification.
5. Do not list an observation as a bug after human verification disproves it. If traceability matters, record one short closed-observation sentence in Result instead of retaining a second reproduction section.
6. Use the Testing Proof and Not Executed tables as the coverage accounting when separate proof-target, product-inventory, and ledger sections would repeat the same facts.
7. Keep planning detail, source analysis, Qase case drafts, and the chronological browser log out of the reviewer report unless the user explicitly requests them.
8. If a detailed execution note already exists, consolidate the reviewer-relevant evidence into the canonical report and replace the duplicate note with a short link to the canonical report.

Final response:
- Lead with the release recommendation.
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
