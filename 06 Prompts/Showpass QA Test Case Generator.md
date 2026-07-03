# Showpass QA Test Case Generator

This note points to the canonical agent workflow file. The full workflow is not stored in this vault.

## Canonical QA Workflow

Repo:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Workflow file inside repo:
`docs/agent-workflows/showpass-qa-test-case-generator.md`

Full path:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`

Use this workflow when the goal is Qase-ready manual QA coverage, regression coverage, or Playwright-friendly scenarios for a PR or frontend change.

Do not duplicate the workflow content here. Read the canonical QA workflow before generating test cases.

## Vault Output Target

Always write generated test cases under:
`03 Test Cases/`

If the user specifies only a filename, treat it as relative to `03 Test Cases/`.

Example:
`employees-qa-test-cases.md` means `03 Test Cases/employees-qa-test-cases.md`.

Template files are protected reusable scaffolds. If the requested output path is named `*Template.md`, such as `03 Test Cases/Test Case Template.md`, do not overwrite it for generated cases or gap analysis unless the user explicitly says to overwrite or edit the template itself. Instead, create a feature-specific note in the same folder, using a filename such as:
`03 Test Cases/<feature-or-scenario>-test-cases.md`
or
`03 Test Cases/<feature-or-scenario>-qase-gap-analysis.md`

If the user specifies a path outside `03 Test Cases/`, keep the test case output under `03 Test Cases/` unless they explicitly say the file must be outside that folder.

If the user does not specify an output file, create a new note under:
`03 Test Cases/`

Use the best suitable filename for the feature or scenario, such as:
`03 Test Cases/<feature-or-scenario>-test-cases.md`

Use the canonical workflow's preferred style for source review, risk analysis, and coverage grouping. For Qase-ready cases, use [[05 Tooling/Qase Test Case Writing Rules]] instead of GIVEN / WHEN / THEN formatting.

When producing Qase-ready cases or Qase update recommendations, also read and apply [[05 Tooling/Qase Test Case Writing Rules]] for the Showpass Qase standard on user perspective, observable behavior, role-specific language, plain common product wording, 1-3 best approved tags, platform/view parameterization, concise one-sentence expected results, descriptions, and Qase step structure.

## Test Case Voice And Grouping

Write manual test cases so a QA user can execute them without translating implementation language.

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
- For complex features, use one representative parameter value for the primary manual case, then create separate cases for materially different flows such as Box Office payment, basket changes, refunds, exchanges, or assigned seating.
- Choose 1-3 accurate approved tags. Prefer one surface tag, such as `public`, `widget`, or `box-office`, plus one feature tag, such as `discounts`, `checkout`, `basket`, `fees-and-taxes`, `refunds`, `exchanges`, or `reports`.
- Do not tag every related domain in a broad case. Tags should help someone find the case, not list every risk.
- Avoid generated table headers like `Column 1`, `Column 2`, and `Column 3`; use `Platform / View` and `Step Action / Data / Expected Result` for tables.
- Do not put Qase parameters in a `Name / Values` table. Use `ParameterName: Value1, Value2, Value3`.
- Prefer customer-facing terms such as `discounted tickets`, `regular-price tickets`, `checkout total`, `order details`, `transaction details`, `invoice details`, and `credit details`.
- Avoid implementation-heavy wording in manual cases unless it is the exact product term needed for setup: `metadata`, `artifacts`, `mutation`, `split rows`, `full-price rows`, `orphaned rows`, `unsplit`, `parameterized`, and `recalculation drift`.
- Expected results should be observable and testable. State what should be visible, unchanged, issued, selected, charged, refunded, exchanged, or reported.
- When editing an existing generated note, preserve user edits and improve only the requested wording or structure unless the user explicitly asks for a rewrite.

## New Feature Test Case Flow

Use this flow when the user is creating coverage for a new feature, new switch, new route, new behavior, or new regression target and is not asking to compare against existing Qase cases.

Do not label the output as a gap analysis unless the user explicitly asks to compare existing coverage against source behavior.

1. Treat the user request as new coverage.
2. Skip Qase lookup when the user says Qase is not needed or the feature is new and existing coverage is not expected.
3. Inspect backend behavior first when backend source is provided or the feature affects APIs, validation, permissions, checkout, payments, credits, refunds, settlement, reports, or other source-of-truth logic.
4. Inspect frontend behavior when the user flow, route, UI state, or entry path needs frontend confirmation.
5. Identify all meaningful entry paths, setup choices, state transitions, permissions, feature flags, and downstream surfaces.
6. Write the output under `03 Test Cases/` with a `*-test-cases.md` or `*-coverage-plan.md` filename.

The output should separate:

- Summary of new behavior
- Sources reviewed
- Assumptions and unknowns
- Source-backed behavior
- Entry paths
- Risk areas
- State-space / setup matrix
- Recommended test data
- Manual test cases ordered by execution workflow, using `TC-*` labels and Qase-ready structure only when the user asks for that format
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

`03 Test Cases/itemized-partial-apply-to-each-split-test-cases.md`

Example title:

`# Itemized Partial APPLY_TO_EACH Split Test Cases`

## Read / Gap Analysis Flow

Use this flow when the goal is to compare existing Qase knowledge against the codebase before creating or updating cases.

1. Read existing Qase cases for the feature, route, ticket, API, or keyword using `qasectl` when available.
2. Inspect backend behavior as the source of truth.
3. Inspect frontend code to see how users follow that backend behavior.
4. Compare Qase coverage against source behavior.
5. Write the output under `03 Test Cases/`. If the user gave only a filename, place that filename in `03 Test Cases/`; if no output file is specified, create a new suitably named note there. If the requested path is a `*Template.md` file, create a feature-specific gap-analysis note instead unless the user explicitly says to overwrite the template.

The output should separate:

- Existing Qase coverage
- Source-backed behavior found in code
- Coverage gaps
- Risk areas
- Suggested new or updated Qase-ready cases
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

- Backend first source of truth: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend follows backend behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright automation patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

## Agent Reminder

Read the canonical workflow first. For new-feature coverage, use the New Feature Test Case Flow and do not call the output a gap analysis. For gap analysis, read Qase first, inspect source code second, then write findings under `03 Test Cases/`. Bare filenames from the user should be resolved inside `03 Test Cases/`. Never overwrite a `*Template.md` file with generated output unless the user explicitly asks to edit or overwrite that template. Keep vault notes short and reference source paths instead of copying workflow content. Write cases from the perspective of the real Showpass actor, such as customer, organizer, venue employee, Box Office employee, dashboard user, attendee, or authenticated user. Do not use `the tester` phrasing in generated Qase cases. Preserve user edits when revising an existing note. Prefer plain product wording over abstract QA or implementation terms unless the technical term is required for accuracy.
