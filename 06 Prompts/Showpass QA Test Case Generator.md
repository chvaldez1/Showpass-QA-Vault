---
title: Showpass QA Test Case Generator
tags:
  - qa/prompt
  - test-design
  - qase
---

# Showpass QA Test Case Generator

Use this workflow for Qase-ready manual coverage, regression planning, PR QA plans, Jira-derived coverage, and Playwright-friendly scenarios.

## Canonical Relationship

Read [[00 Start Here/World-Class Software Quality Standard]] first. It owns the cross-cutting rules for scope, proof targets, state-space, coverage accounting, evidence, complex controls, mutation lifecycle, data safety, findings, readiness, and release decisions.

This note owns the test-design workflow and Showpass-specific Qase preparation. It no longer depends on a separate canonical workflow outside the vault.

Start with:

- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]
- [[01 Repositories/QA Automation - showpass-playwright]]
- [[02 Feature QA/Checkout Criticality From Jira Major Critical Export]]
- [[05 Tooling/Qase Test Case Writing Rules]] when Qase-ready formatting is requested

## Testing Intent Gate

Before writing test cases, answer: **what are we testing and why does it matter?**

Use the Major/Critical Jira calibration in [[02 Feature QA/Checkout Criticality From Jira Major Critical Export]] as a quality bar, not as a reason to over-test. A test case should protect a reusable product behavior or business invariant, not just mirror a support request.

Start with this one-sentence intent:

`We are testing whether <actor/surface> can <workflow> while <business invariant> stays true; this matters because <bad outcome>, and we will prove it with <observable proof>.`

Every generated test-case note should include a short `Testing Intent` section before the cases:

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Money/order state, fulfillment/access, inventory/ownership, refund/exchange/credit/payout math, reporting/dashboard agreement, permission boundary, async final state, live sales completion, or lower-signal support task. |
| Business invariant | What must always remain true? |
| User or business impact | Who is hurt if this breaks: customer, organizer, Box Office employee, support, finance, attendee, or reporting user? |
| Failure mode | What bad outcome are we preventing? |
| Observable proof | What visible or source-backed result proves the invariant is still true? |
| Source of truth | Backend, frontend, Jira intake, product behavior, or existing Playwright pattern used to prove the behavior. |
| Primary surfaces | Public checkout, Widget, Box Office, Dashboard, My Orders, mobile app, API, reports, payouts, or another named surface. |
| In scope | The exact workflows, states, roles, and data that must be covered. |
| Out of scope | Similar-looking variants that should not be tested now because they do not change the risk. |
| Confidence | High / Medium / Low, based on source evidence and unresolved questions. |

If the testing intent cannot be stated clearly, stop and add `Open Questions` instead of creating a broad case list.

## Branch / PR Scope Gate

Use this gate whenever the user supplies a PR, names a branch, says the changes are already checked out, or asks for coverage of code changes.

1. Confirm the active repository branch and the intended base branch.
2. Inspect the branch comparison before searching the broad feature area.
3. Describe the changed user behavior in plain language. Do not use the feature name as a substitute for understanding the diff.
4. Trace changed backend endpoints, services, models, webhooks, background tasks, and shared frontend code to every client that consumes them.
5. Include affected clients even when their files are unchanged on the branch. State whether each client is directly changed or indirectly affected through shared behavior.
6. Keep entry points and outcome states separate:
   - Entry points answer **where does the actor start?**
   - Outcomes answer **how can the workflow finish or recover?**
7. Create an entry-point coverage table for multi-surface work:

| Entry Point | Actor Flow | Why It Is Affected | Required Outcomes |
| --- | --- | --- | --- |
| Example: Electron Box Office | Employee sells from the installed desktop app | Uses the changed shared payment API | Clean success, cancel, retry, failure |

8. Create an outcome matrix when payment, checkout, async state, or recovery is involved. At minimum, consider:
   - clean success without a prior failure
   - user cancellation
   - provider/device cancellation when different
   - failure or timeout
   - retry through the same path
   - recovery through another supported path
   - duplicate or delayed final updates
   - cancel/success or other realistic final-state races
9. Include a clean successful flow as a dedicated proof target and case or explicit existing-case reference. A successful retry does not replace baseline success coverage.
10. Do not force all outcomes onto all platforms. Verify which controls and recovery choices each client actually exposes, and mark unsupported combinations as not applicable.

Do not use this gate to override the Jira-card no-diff rule. For Jira-card generation, inspect a branch comparison only when the user explicitly asks for diff-based coverage.

## State-Distinct Entry Point Audit

Use this audit whenever a workflow can be reached from more than one visible action, route, modal, client, or handoff. An entry point is the complete actor path and the state carried into the shared workflow, not only the final route or component.

Ask:

> Can the actor reach this action another way that leaves the application in a different state?

If yes, treat it as a separate candidate entry point until source evidence proves the behavior is equivalent.

1. Find every route and component that exposes the action.
2. Trace every visible actor path into each caller. Do not stop when multiple paths converge on the same modal, hook, service, or shared component.
3. Record the state at the moment the shared workflow begins:
   - entity already selected or added vs only viewed
   - modal kept open vs closed and reopened
   - empty basket vs existing items
   - direct navigation vs redirect, deep link, or cross-page handoff
   - client-only state vs state already persisted to the backend
   - permission, feature-flag, venue, customer, or role differences
4. Treat paths with materially different starting state as separate entry-point values even when their later steps and expected result are identical.
5. Keep entry-point variants separate from outcome variants. Entry points describe how the actor arrives; outcomes describe how the workflow completes, fails, cancels, retries, or recovers.
6. For one shared behavior, prefer one Qase single parameter such as `EntryPoint` or a specific name such as `ManageRenewalEntryPoint`. Encode dependent setup in the entry-point value or its Description mapping instead of creating invalid independent-parameter combinations.
7. Put the complete path-to-parameter mapping and starting-state requirements in the Qase Description. Keep Steps focused on the shared actor actions and observable proof after the parameterized path is followed.
8. Before enhancing an existing broad Qase case, finish this audit. Create a focused regression case when the defect depends on state-distinct paths that would overload or change the existing case's responsibility.

Add an entry-point table when two or more state-distinct paths are in scope:

| Entry Point | Actor Path | Starting State | Supported Surface |
| --- | --- | --- | --- |
| Example: ViewWithoutAdding | Search customer → View info → start action | Customer is viewed but not attached; modal remains open | Web Box Office |

After `Testing Intent`, add a compact `Proof Target Map`:

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| Example: failed payment does not issue tickets | Prevents unpaid fulfillment | TC-1 |

Keep the map small. Most requests should have 1-5 proof targets. Every generated case must map to a proof target or it should be removed, deferred, or called out as a lower-priority manual check.

Use this criticality filter:

- Prioritize cases that protect money movement, paid/unpaid final state, order or ticket fulfillment, inventory/seat ownership, refund/exchange/credit/payout math, live sales completion, reporting disagreement, permissions/ownership, or async provider/background task final state.
- Treat scripts, imports, one-off data moves, config/content requests, hardware/printer issues, and demo setup as lower signal unless they reveal reusable product behavior.
- Prefer one representative high-risk path over a matrix of low-signal permutations.
- Add a new case only when it proves a different invariant, actor impact, entry path, state transition, permission boundary, or financial/fulfillment outcome.

Use these CSV-calibrated proof buckets when deciding what is worth testing:

| Bucket | Test When The Case Proves |
| --- | --- |
| Money/order state | Charged amount, payment status, order, invoice, receipt, or Dashboard state cannot disagree. |
| Fulfillment/access | A paid customer gets usable tickets/orders, and an unpaid customer does not. |
| Inventory/ownership | Ticket quantity, holds, seats, memberships, packages, resale, waitlist, or transfers remain owned by the right party. |
| Financial math | Refunds, exchanges, discounts, credits, gift cards, fees, taxes, payouts, or settlements calculate and display correctly. |
| Reporting/dashboard agreement | Organizer-facing totals, transaction details, reports, and payout views match the real order state. |
| Permission boundary | The wrong user, employee, organizer, or account cannot view, claim, refund, edit, or fulfill the wrong thing. |
| Async final state | Provider callbacks, scheduled jobs, webhooks, retries, cancels, or delayed payment states cannot create duplicate, stuck, or incorrect final outcomes. |
| Live sales completion | A real checkout, Box Office, transfer, or assigned seating sales path is not blocked. |

If a request only describes a script, import, data cleanup, configuration, hardware/printer issue, demo setup, or one-off support workaround, narrow the output to the reusable product behavior. If no reusable behavior is source-backed, write narrow verification notes and `Open Questions` instead of broad regression cases.

## Workflow Routing

Default to test-case generation unless the user explicitly asks to compare against existing Qase coverage.

- Use [[#Test Case Generator Flow]] for new test cases, regression coverage, PR QA plans, Jira-card coverage, and source-backed manual case drafts.
- Use [[#Read / Gap Analysis Flow]] only when the user asks for gap analysis, existing Qase coverage, coverage comparison, whether Qase coverage is enough, or suggested Qase updates.
- Do not query Qase during the generator flow.
- Do not call generated test cases a gap analysis unless existing Qase coverage was read and compared against source behavior.
- Do not write to Qase from either flow unless the user explicitly approves a Qase update after a dry-run preview.

Example prompts:
- New cases without Qase comparison: [[06 Prompts/Example - Generate Test Cases]]
- Jira-card test cases: [[06 Prompts/Example - Jira Card To Test Cases]]
- Existing Qase coverage comparison: [[06 Prompts/Example - Qase Gap Analysis]]

## Vault Output Target

Always write generated test cases in the matching feature folder under:
`03 Test Cases/<feature>/`

If the user specifies only a filename, classify the request by its primary product behavior or business invariant and treat the filename as relative to the matching feature folder. Reuse an existing feature folder whenever one fits.

Example:
`employees-qa-test-cases.md` means `03 Test Cases/Employees/employees-qa-test-cases.md`.

Template files are protected reusable scaffolds. If the requested output path is named `*Template.md`, such as `03 Test Cases/Test Case Template.md`, do not overwrite it for generated cases or gap analysis unless the user explicitly says to overwrite or edit the template itself. Instead, create a feature-specific note in the matching feature folder, using a filename such as:
`03 Test Cases/<feature>/<feature-or-scenario>-test-cases.md`
or
`03 Test Cases/<feature>/<feature-or-scenario>-qase-gap-analysis.md`

If the user specifies a path outside `03 Test Cases/`, keep the test case output under `03 Test Cases/` unless they explicitly say the file must be outside that folder.

If the user does not specify an output file, create a new note under the matching feature folder:
`03 Test Cases/<feature>/`

Use the best suitable filename for the feature or scenario, such as:
`03 Test Cases/<feature>/<feature-or-scenario>-test-cases.md`

Use [[03 Test Cases/Test Cases by Feature]] as the current folder index and filing guide.

Use [[00 Start Here/World-Class Software Quality Standard]] for source review, risk analysis, coverage accounting, evidence, and readiness. For Qase-ready cases, use [[05 Tooling/Qase Test Case Writing Rules]] instead of GIVEN / WHEN / THEN formatting.

When producing Qase-ready cases or Qase update recommendations, also read and apply [[05 Tooling/Qase Test Case Writing Rules]] for the Showpass Qase standard on user perspective, observable behavior, role-specific language, plain common product wording, 1-3 best approved tags, platform/view parameterization, concise one-sentence expected results, descriptions, and Qase step structure.

## Jira Card Intake

Use this flow when the user says to generate tests from a Jira card, pastes a Jira issue key, or pastes an Atlassian card link.

1. Read [[05 Tooling/jiractl]].
2. Fetch the Jira card with `05 Tooling/scripts/jira-read-issue.mjs`, using the pasted issue key or URL.
3. Treat Jira as intake context only. Extract the problem statement, requested behavior, acceptance criteria, affected role or surface, comments, known edge cases, and unresolved questions.
4. Save the raw Jira API response under `/private/tmp` only when repeat local inspection is useful.
5. Continue through [[00 Start Here/World-Class Software Quality Standard]] and this generator workflow before writing test cases.
6. Verify behavior against backend source first when the Jira card touches APIs, validation, permissions, checkout, payments, credits, refunds, settlement, reports, or other source-of-truth logic.
7. Verify frontend behavior for routes, UI state, forms, copy, entry paths, permissions, and visible outcomes.
8. Classify the card by business invariant before writing cases. If it is mainly a one-off script, import, config, printer/device, or demo request, generate only narrow verification cases unless source review shows recurring product behavior.
9. Do not run git diff, branch comparison, or changed-file discovery for Jira-card test generation unless the user explicitly asks for diff-based coverage. Inspect the relevant source files directly from the Jira context, branch name, route, API, or feature terms.
10. Use Playwright only for existing automation patterns unless the user asks for automation work.
11. If the user asks for new coverage from the Jira card, use [[#Test Case Generator Flow]] unless they explicitly ask for Qase gap analysis.
12. If the user asks whether existing Qase coverage is enough, use [[#Read / Gap Analysis Flow]] and [[05 Tooling/qasectl]].

Example request:

```text
Use 06 Prompts/Showpass QA Test Case Generator.md.

Goal:
Generate Qase-ready manual test cases from this Jira card:
https://showpass.atlassian.net/browse/SPW-12345

Jira:
- Use [[05 Tooling/jiractl]] to read the card.
- Treat Jira as intake only, not source of truth.

Source code:
- Start from the vault repo notes:
  [[01 Repositories/Backend - web-app]], [[01 Repositories/Frontend - showpass-frontend]], and [[01 Repositories/QA Automation - showpass-playwright]]
- Verify backend behavior first:
  /Users/christianvaldez/Documents/Showpass/repos/web-app
- Verify the frontend user flow:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend
- Use Playwright only for automation pattern references:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Output:
Write Qase-ready cases to:
03 Test Cases/<feature>/<jira-key-or-feature>-test-cases.md

Constraints:
- Do not query or update Qase unless I explicitly ask for a gap analysis.
- Do not run git diff or branch comparison unless I explicitly ask for diff-based coverage.
- Use [[05 Tooling/Qase Test Case Writing Rules]].
- Include Testing Intent, a short Jira Intake Summary, Sources Reviewed, source-backed behavior, risks, manual test cases, minimum execution set, automation candidates, and open questions.
```

## Test Case Voice And Grouping

Write manual test cases so a QA user can execute them without translating implementation language.

Apply this beginner-readability check before finalizing the note:

- Assume the reader is new to Showpass.
- Add a short plain-language glossary when product-specific terms are required.
- Name the starting screen or route in the first step.
- Use visible control names where source confirms them.
- Explain where to verify a result when the selling device does not expose the proof surface, such as opening Web Dashboard Transactions after a Mobile POS sale.
- Use one observable sentence per Expected Result whenever possible.
- Prefer `one charge, one transaction, one order, and one ticket` over internal payment-state or basket-field wording.
- Move checkout IDs, stored statuses, flags, webhook names, and implementation fields to Sources Reviewed, Source-Backed Behavior, Risk Areas, or automation notes unless they are required test data.
- Read every case once as if the reader has never used the product. If a step requires unstated Showpass knowledge, add the missing navigation, setup, or visible result.
- Treat the canonical output note as the complete reviewer handoff. Do not require a QA employee to open source code, a PR, or a separate execution narrative to understand a case or finding.
- For every multi-action case or defect reproduction, use `Step Action | Data | Expected Result` with one visible action and decision per row.
- Give exact routes or named product areas, visible control labels, and current fixture names or clear fixture-creation instructions.
- Put actual defect behavior in a separate Actual Result field, not inside an expected-result sentence.
- Keep automation-only terms such as locator, DOM, hidden input, sentinel, isolated clipboard, mocked response, and programmatic click out of manual procedures.
- Place screenshots beside the behavior they prove. If browser execution produced evidence, embed it in the active gap-analysis or test-case note rather than making the reviewer discover it in another file.
- If an action depends on browser permission, operating-system state, timing, or test-tool behavior, do not call it Confirmed until a normal user path independently reproduces it.
- Include a final data-state instruction: no change, cleanup steps, or the exact Preserve-for-review artifact and cleanup condition.

- Start from the `Testing Intent` section. Test cases should trace back to the business invariant and failure mode.
- Order cases by execution workflow, not by backend class or implementation detail.
- Prefer an execution order such as discount entry paths and purchase handoff, basket recalculation with fees and tender, item identity and split boundaries, post-transaction financial workflows, and rollback.
- Do not use Markdown numbered lists for test case titles because they are hard to copy and paste. Label each test case as `TC-1: Title`, `TC-2: Title`, and so on.
- Use the title format from [[05 Tooling/Qase Test Case Writing Rules#Title Naming Rules]]: `Core - [Feature] - [Description]`.
- Use `Core` only when the same behavior can be tested across more than one platform or entry point. For one-surface cases, start with the surface or app area, such as `Box Office`, `Public Checkout`, `Widget`, or `Dashboard`.
- Use `[Feature]` for the main app area or workflow the case mostly touches. Use `[Description]` for a short one-line behavior statement that someone can understand without reading the steps.
- Avoid cramped or malformed title wording. Titles should read naturally after the prefix, with a space after `Verify`.
- Use the same `TC-*` labels in the Minimum Execution Set.
- Keep technical source behavior in source-backed behavior or risk sections; keep test steps focused on what the customer, Box Office employee, organizer, or dashboard user sees and does.
- Use plain titles and step wording, but keep parameter names and values in PascalCase per [[05 Tooling/Qase Test Case Writing Rules]].
- Prefer readable PascalCase parameter names such as `TicketQuantity`, `FeeSetup`, `PaymentType`, `BasketChange`, `SeatPath`, and `TicketSelection`.
- Prefer readable PascalCase parameter values such as `TwoSelectedOneDiscounted`, `FlatFeePlusTax`, `OtherCustomType`, and `ExchangeAfterPartialRefund`.
- Keep parameters easy to execute. Prefer one high-signal value for baseline coverage and only add variants when they materially change behavior or risk.
- Do not combine too many broad axes in one test case. If a case needs more than 2-3 parameters, split it or move lower-risk variants to the minimum execution set, test data notes, or automation candidates.
- Do not create every platform, role, payment type, or state permutation. Add a variant only when it changes the invariant being proved or catches a realistic Major/Critical-style failure.
- For complex features, use one representative parameter value for the primary manual case, then create separate cases for materially different flows such as Box Office payment, basket changes, refunds, exchanges, or assigned seating.
- Choose 1-3 accurate approved tags. Prefer one surface tag, such as `public`, `widget`, or `box-office`, plus one feature tag, such as `discounts`, `checkout`, `basket`, `fees-and-taxes`, `refunds`, `exchanges`, or `reports`.
- Do not tag every related domain in a broad case. Tags should help someone find the case, not list every risk.
- Avoid generated table headers like `Column 1`, `Column 2`, and `Column 3`; use `Platform / View` and `Step Action / Data / Expected Result` for tables.
- Do not put Qase parameters in a `Name / Values` table. Use `ParameterName: Value1, Value2, Value3`.
- Prefer customer-facing terms such as `discounted tickets`, `regular-price tickets`, `checkout total`, `order details`, `transaction details`, `invoice details`, and `credit details`.
- Avoid implementation-heavy wording in manual cases unless it is the exact product term needed for setup: `metadata`, `artifacts`, `mutation`, `split rows`, `full-price rows`, `orphaned rows`, `unsplit`, `parameterized`, and `recalculation drift`.
- Expected results should be observable and testable. State what should be visible, unchanged, issued, selected, charged, refunded, exchanged, or reported.
- When editing an existing generated note, preserve user edits and improve only the requested wording or structure unless the user explicitly asks for a rewrite.

## Test Case Generator Flow

Use this flow when the user wants new source-backed test cases or a QA plan and is not asking to compare against existing Qase cases. This includes new features, switches, routes, PRs, APIs, workflows, regressions, bug fixes, and Jira-card coverage.

Do not label the output as a gap analysis unless the user explicitly asks to compare existing coverage against source behavior.

1. Treat the user request as new coverage.
2. Do not query Qase in this flow.
3. Write a concise Testing Intent draft before case generation. Identify the criticality bucket, business invariant, affected actor, failure mode, observable proof, primary surfaces, in-scope paths, out-of-scope variants, and confidence.
4. Create a small Proof Target Map with the specific outcomes the cases must prove.
5. Inspect backend behavior first when backend source is provided or the feature affects APIs, validation, permissions, checkout, payments, credits, refunds, settlement, reports, or other source-of-truth logic.
6. Inspect frontend behavior when the user flow, route, UI state, or entry path needs frontend confirmation.
7. For branch or PR work, complete the Branch / PR Scope Gate and distinguish directly changed clients from unchanged clients that consume the changed shared behavior.
8. Complete the State-Distinct Entry Point Audit, then identify the remaining setup choices, state transitions, permissions, feature flags, outcome states, and downstream surfaces.
9. Add a clean successful path before recovery and edge cases when the changed workflow can complete successfully.
10. Remove low-value permutations. Keep only cases that prove a distinct invariant, actor impact, state transition, permission boundary, financial outcome, fulfillment outcome, reporting outcome, or materially different client recovery path.
11. Apply the beginner-readability check to the full note and every manual case.
12. Write the output under the matching `03 Test Cases/<feature>/` folder with a `*-test-cases.md` or `*-coverage-plan.md` filename. Reuse the active note for the same request, Jira ticket, feature, or Qase work item; do not create a parallel draft when the approach changes.

The output should separate:

- Testing Intent
- Proof Target Map
- Declared scope and out-of-scope decisions
- Summary of new behavior
- Sources reviewed
- Assumptions and unknowns
- Source-backed behavior
- Product-surface and complex-control inventory
- Entry-point coverage, including directly changed and indirectly affected clients when applicable
- Outcome coverage, including clean success and supported recovery states
- Risk areas
- Coverage decisions: why these cases were included and what was intentionally excluded
- State-space / setup matrix
- Coverage ledger with every in-scope item marked covered, manual-only, deferred, not applicable, or blocked
- Recommended test data
- Manual test cases ordered by execution workflow, using `TC-*` labels and Qase-ready structure when the user asks for Qase-ready output
- Minimum execution set
- Suggested automated coverage
- Open questions that block confident coverage

Example request:

```text
Use 06 Prompts/Showpass QA Test Case Generator.md.

Goal:
Create test cases for the new switch `enable_itemized_partial_apply_to_each_split` enabled.
Focus on switch-on behavior across every entry path where a discount can be applied, such as public checkout, widget checkout, Box Office direct sale, holds, hold-link purchase, group sales, basket updates, and tender or credit combinations.
Include downstream post-transaction checks for refunds, exchanges, voids, transfers, check-in, transactions, payouts, and reports.
Include a small switch-off rollback smoke.

Source code:
/Users/christianvaldez/Documents/Showpass/repos/web-app

Output:
Write to 03 Test Cases.

Constraints:
Keep output concise. This is a new feature, so do not query or update Qase.
```

Example output target:

`03 Test Cases/Discounts/itemized-partial-apply-to-each-split-test-cases.md`

Example title:

`# Itemized Partial APPLY_TO_EACH Split Test Cases`

## Read / Gap Analysis Flow

Use this flow only when the goal is to compare existing Qase knowledge against the codebase before creating or updating cases.

1. Read existing Qase cases for the feature, route, ticket, API, or keyword using `qasectl` when available.
2. Inspect backend behavior as the source of truth.
3. Inspect frontend code to see how users follow that backend behavior.
4. Compare Qase coverage against source behavior.
5. Write the output under the matching `03 Test Cases/<feature>/` folder. Reuse the active note for the same request, Jira ticket, feature, or Qase work item and consolidate revisions there instead of creating parallel gap-analysis and final-case drafts. If the user gave only a filename, place that filename in the matching feature folder; if no output file is specified and no active note exists, create a new suitably named note there. If the requested path is a `*Template.md` file, create a feature-specific gap-analysis note instead unless the user explicitly says to overwrite the template.

The output should separate:

- Testing Intent
- Proof Target Map
- Declared scope and out-of-scope decisions
- Existing Qase coverage
- Source-backed behavior found in code
- Product-surface and complex-control inventory
- Coverage gaps
- Coverage ledger
- Risk areas
- Suggested new or updated Qase-ready cases
- Browser findings with beginner-executable reproduction tables and evidence when browser execution has occurred
- Open questions that block confident coverage

Do not push changes to Qase during read/gap analysis. Treat Qase updates as a separate sign-off step.

When a user does approve Qase updates, follow [[05 Tooling/qasectl#Qase Update Workflow]] before writing: use the existing `.env`, dry run the exact changes, apply only after the preview is clean, then re-read Qase to verify.

## When To Use

- Generate QA test cases from backend and frontend code.
- Turn source behavior into structured QA coverage.
- Prepare test cases that may later become Playwright automation.
- Create broader manual QA coverage separate from `SPEC_*.md` browser plans.
- Compare existing Qase coverage against backend/frontend source behavior.

## Source Context

- Backend first source of truth: [[01 Repositories/Backend - web-app]] (`/Users/christianvaldez/Documents/Showpass/repos/web-app`)
- Frontend follows backend behavior: [[01 Repositories/Frontend - showpass-frontend]] (`/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`)
- Playwright automation patterns: [[01 Repositories/QA Automation - showpass-playwright]] (`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`)

## Agent Reminder

Read [[00 Start Here/World-Class Software Quality Standard]] first, then apply this test-design workflow. Before writing cases, complete the Testing Intent gate and Proof Target Map so the output states the criticality bucket, business invariant, actor impact, failure mode, observable proof, scope, non-goals, and confidence. Every generated case should map back to one proof target and every declared in-scope item must be accounted for in the coverage ledger or equivalent artifact. If the input is a Jira card, read [[05 Tooling/jiractl]], fetch the card, summarize Jira intake briefly, classify the business invariant, then verify behavior against source before generating cases. For Jira-card test generation, do not run git diff or branch comparison unless the user explicitly asks for diff-based coverage. For simple generation, PR coverage, new-feature coverage, or regression coverage, use the Test Case Generator Flow and do not query Qase. For gap analysis, read Qase first, inspect source code second, then write findings under the matching `03 Test Cases/<feature>/` folder. Bare filenames from the user should be resolved inside the matching feature folder. Never overwrite a `*Template.md` file with generated output unless the user explicitly asks to edit or overwrite that template. Keep vault notes short and reference source paths instead of copying repository implementation. Write cases from the perspective of the real Showpass actor, such as customer, organizer, venue employee, Box Office employee, dashboard user, attendee, or authenticated user. Do not use `the tester` phrasing in generated Qase cases. Preserve user edits when revising an existing note. Prefer plain product wording over abstract QA or implementation terms unless the technical term is required for accuracy.
