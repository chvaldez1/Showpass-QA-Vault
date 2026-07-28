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
3. Record the environment, target, browser, authenticated role, test source, start time, current state, Testing Intent, Proof Target Map, coverage ledger, and release recommendation.
4. Log findings as they are discovered, but continue testing unless:
   - the required page becomes inaccessible;
   - continuing would risk unrecoverable or user-owned data;
   - authentication or external access blocks the run.
5. Do not stop merely because a defect is found.

Data-safety rules:
1. Treat pre-existing records, assignments, quantities, permissions, and configuration as user-owned.
2. Do not delete, overwrite, or clean up user-owned data.
3. Prefer selection-only, navigation-only, or unsaved input checks.
4. When persistence is required, use clearly disposable test data and record every change.
5. Clean up only data created by this run, and only when cleanup is safe and explicitly within scope.
6. If the live state differs from the documented setup, record the difference and preserve it.

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
5. A mutation is not complete until success, persistence or downstream evidence, and cleanup or isolation are accounted for.

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
7. Do not call a mutation covered unless persistence/downstream proof and cleanup are accounted for.

Final response:
- Lead with the release recommendation.
- Summarize confirmed findings, non-blocking findings, and blocked coverage separately.
- State exactly what data was changed and what was preserved.
- Link the single canonical run note.
- State the accounted-for coverage summary and every remaining Manual-only, Deferred, Not applicable, or Blocked category.
- Do not ask me to “review the findings” generally. If another action is required, give one explicit next action.
```

## Operator Notes

- For a map-heavy workflow, provide a fixture that contains at least two compatible regions of each important item type so additive selection can be tested without crossing incompatible inventory.
- For destructive permission or inventory tests, prefer a disposable benefit or resource rather than removing all permissions from shared test data.
- Keep the browser open on a neutral state with no unsaved changes when handing control back.
