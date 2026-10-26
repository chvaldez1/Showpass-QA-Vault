---
title: Browser Test Report Template
tags:
  - qa/template
  - browser-testing
---

# Browser Test Report: [Behavior being tested]

[One sentence describing the goal and the main observed result.]

## Test index

Select a test below, or use the linked test ID in the [results table](#results).

- [TC-01 Descriptive scenario name](#tc-01-descriptive-scenario-name)

Give each check a report-local ID (`TC-01`, `TC-02`, and so on). Use the same ID in the plan, index, test heading and results table. Keep IDs stable when revising the report; add a new ID for a new check. These IDs are not Qase case IDs. Replace this example with links to the actual test headings.

## Setup / Prerequisites

- **Environment and date:** [Site, tested page version and date. State when the deployed build is unknown.]
- **Browser and view:** [Actual browser/sidebar and tested screen size, when verified.]
- **Account and data:** [Signed-in/out state, Organizer, permissions, flags and records needed for this test.]
- **Scope:** [Agreed checks, important variations and exclusions.]
- **Finishing point:** [The observable result that completes the requested check, plus required cleanup. List relevant known issues/deprecated controls without turning them into new bug drafts.]
- **Allowed changes:** [Permitted test-data changes, restoration and preserved review data.]

## TC-01 [Descriptive scenario name]

**What this tests:** [One specific outcome. Say whether this checks a visible link, opening a screen, saving a change or its later effect. Do not leave the reader to infer the goal from the title.]

**Start here:** [The actual starting screen, signed-in employee/customer, selected Organizer and necessary record state. Explain where the control is if it is not obvious. Do not hide navigation or record preparation in an assumption.]

### Steps

1. **[Action and target.]** [Say what to select, enter or open, where it is, and the exact item/text/value to use. A reader should be able to perform this without the earlier conversation.]

   **Expected:** [Name the visible message, fields, controls, values or saved result to check. For example, name the two links that must be absent instead of saying “restricted links are unavailable.”]

   **Actual — [Passed / Failed / Blocked / Not run]:** [What was observed. Separate a tool problem from a product failure.]

   [Render the real screenshot beneath the action it proves. Keep display width at 600px or smaller while retaining the full-size original. Use a valid relative path; URL-encode spaces for HTML image markup.]

   ```html
   <a href="relative/path/to/real-image.jpg"><img src="relative/path/to/real-image.jpg" alt="Description of the observed step" width="600" style="max-width: 100%; height: auto;"></a>
   ```

   [Short caption: environment, relevant record/state, capture time and observed result. If capture was impossible, replace the example with the exact reason; do not add a broken or invented image.]

2. **[Next action and target.]** [State what the previous step must have shown before this action can run. If the page should refuse access, do not imply a blocked user can still select its controls. Repeat Expected / Actual and the relevant evidence.]

Keep coherent steps together. Start a separate scenario when its setup or expected outcome differs. Add source-verified selector/helper hints or a short API note only when they help repeat the test; do not expose temporary browser element indices.

Use one numbered step for a coherent action and its inspectable result; name the exact clicks needed to perform it. Do not turn routine waits or repeated views into extra tests. Capture the ready result, reuse an existing screenshot when it proves the same observation, and keep independently assessed outcomes separate. Each executed step still needs its nearby real evidence or an exact reference to evidence already rendered.

Use the named visible navigation when navigation was tested. Use the exact address when direct access itself is being tested. Distinguish those two paths in both steps and results. Keep technical configuration and long response extracts in supporting notes unless the step needs a particular returned value.

When revising an executed report, clarify the recorded actions without inventing extra actions, clicks, screenshots or successful outcomes. Keep the run date and state when a later wording update did not rerun the tests. A newly suggested step stays Not run. One screenshot may support opening and inspecting the same screen; reference that evidence instead of duplicating it or pretending another capture exists.

Before delivering, follow the steps as a reader: can they identify the starting screen, exact action, target and pass/fail check without asking what to test? Replace vague directions such as “verify access,” “check the menu” or “reload the same page” with the named page, control and expected result.

Give independently assessed checks their own ID and heading. For example, separate Build, Operations and Account menu checks rather than reporting one combined Navigation failure. Each results row must link to the exact test heading and name the relevant step; do not leave the reader with plain-text references such as `Dashboard navigation, 1–4`.

### BUG-01 Jira draft

[Include this block for a confirmed bug. Remove it when no bug was confirmed. Keep one draft per distinct issue beside its affected test; link other affected checks to it. Do not create a second report or duplicate the screenshots.]

**Draft only — no Jira issue has been created.**

**Title:** fix ([feature or area]) | [Specific observed problem]

**GIVEN** [Exact employee/customer permissions, record state and configuration needed to reproduce it. Include short permission values only when relevant.]

**WHEN** [The person performs the specific action, naming the starting screen and visible control.]

**THEN — observed:** [What actually happens. Name the wrong page, field, amount or outcome. Do not present the desired behavior as an observed result.]

**Expected:** [What should happen instead and the applicable rule. Name an unresolved product decision when it matters.]

**Impact:** [How the observed failure affects the person or business. Do not claim an untested saved action succeeds.]

**Page:** [Actual tested page link.]

**Tested on:** [Environment, necessary Organizer/role and execution date.]

**Evidence:** [Link to the exact affected TC heading and step numbers, with the existing screenshot beneath those steps.]

**Verification limit:** [Relevant untested actions, uncertain cause or source-only evidence. Omit this field only when no material limitation remains.]

**Data safety and cleanup:** [No data change / Changes test data / Potentially destructive; what was preserved or restored.]

## Postconditions and Cleanup

[What remains saved or open, what was restored/deleted, what is preserved for review and what could not be verified.]

## References / Open Questions

[Only the source, ticket, design, existing test/helper or missing fact needed to understand this run. Omit empty sections. Do not replace execution evidence with source claims.]

## Results

Put this results table last. Remove example rows that do not apply and preserve every selected check's outcome. Screenshots remain local in `99 Archive/QA Evidence/<feature>/<run-slug>/`, ignored by Git, and visibly rendered beside the steps.

[Short recommendation for the agreed scope. Keep stronger conclusions blocked when their required proof is missing.]

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| [Executed check] | Passed | [What was proven] | [TC-01 — step 1](#tc-01-descriptive-scenario-name) |
| [Confirmed failure, if any] | Failed | [Expected versus actual result and impact] | [TC-01 — affected step](#tc-01-descriptive-scenario-name) |
| [Unavailable required check, if any] | Blocked | [Missing access, data or tool capability and proof needed] | [TC-01 — affected step](#tc-01-descriptive-scenario-name) |
| [Unexecuted/out-of-scope check, if relevant] | Not run | [Reason; do not label it a failure] | [TC-01 — unrun check](#tc-01-descriptive-scenario-name) |

