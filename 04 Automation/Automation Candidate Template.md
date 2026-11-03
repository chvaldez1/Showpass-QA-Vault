# Automation Candidate Template

Add these sections to the candidate's existing canonical note. Use [[04 Automation/00 Index]] and [[00 Start Here/Showpass QA Handbook/06 Automation Strategy]]. Keep existing candidate IDs and do not create another competing backlog. A candidate is not running protection until applicable execution evidence exists.

## Scenario

- Candidate ID / linked existing work:
- One business outcome or repeated task:
- Who is harmed and how:
- Exact first scope and intentionally excluded variants:
- Named owner / next action / review date:
- Delivery state: Proposed / Ready / Implementing / Verified locally / Running in CI / Blocked / Quarantined.

## Why Automate

- Business impact and incident/repetition evidence:
- Current manual setup/execution/cleanup effort, or Not measured:
- Existing protection and exact missing assertion:
- Expected benefit and likely maintenance cost; do not invent savings:

## Source Behavior

- Backend:
- Frontend:
- Manual test case:
- Reviewed source revisions and deployment/configuration relevance:

## Choose the Layer

- Owning layer: backend unit/integration, component, browser, native/device, or workflow tooling.
- Why it fits this proof; complementary browser/device/backend checks still needed:
- Existing test/helper to extend; compare overlapping candidates before creating another test:

A validated manual case or separate browser spec is useful input when present, not a prerequisite for every automation layer. Resolve the selected scenario's facts and expected results directly when sufficient evidence exists.

## Test Data

- Supported setup and required role/flags/client/provider/build:
- Owned records and safe reset/isolation:
- Missing setup/final-state read/fault/time control, with owner/action:

## Selectors

- Prefer existing page objects and stable selectors.
- 

## Page Objects

- Existing:
- Needed:

## Assertions

- Independently established expected result:
- Exact saved/downstream outcome, including identities/quantities/amounts where relevant:
- Approved final read and bounded completion wait:
- Clean success and affected failure/recovery proof, kept distinct:

## Risks

- Flaky setup:
- External dependencies:
- Data cleanup:
- First-attempt references to retain before retry:
- Replacement manual/device check while implementation/execution is incomplete:

## Execution and CI Evidence

- Actual focused command, date, environment, build/configuration and test revision:
- First-attempt result / retry result / skipped or quarantined work:
- Exact assertions proven and result/trace link, or Not run with reason:
- Verified cleanup or authorized retained state:
- Actual CI job/trigger and run link, or Not integrated / Not run:
- Remaining proof gaps and next action/owner:

Do not mark Running in CI from a test file, local pass or merged PR alone. Use [[03 Test Cases/Release Decision Template]] for candidate-specific release results. A manual repetition can be retired only when the applicable automated proof replaces it; exploration and uncovered device outcomes remain visible.

## Qase Mapping

- Case ID:
- Suite:
- Tags:
