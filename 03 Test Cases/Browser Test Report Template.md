---
title: Browser Test Report Template
tags:
  - qa/template
  - browser-testing
---

# Browser Test Report: [Behavior being tested]

## Overview

- **What worked:** [Main observed success and the point reached, such as checkout before payment.]
- **What failed:** [Distinct confirmed bugs and their practical effect; do not count several failed checks as several bugs when they share one issue.]
- **What remains unverified:** [Important blocked or unrun checks and why they matter to this scope.]
- **Scope:** [Environment/date, requested workflow and any important boundary.]

Start with the bugs below, follow a test through the [test index](#test-index), or jump to [all results](#results).

## Confirmed bugs

[Use one short row per distinct confirmed bug, linked to its detailed Jira draft. If none were confirmed, replace this table with that statement. Keep known issues and uncertain observations clearly labelled outside this list. Do not invent impact or severity.]

| Bug and reproduction | Where | What went wrong |
| --- | --- | --- |
| [BUG-01](#bug-01-jira-draft) | [Named screen/control] | [Observed failure in everyday language] |

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

Apply [[00 Start Here/World-Class Software Quality Standard#Executable Reproduction Handoff]]. Include the actions needed to reach the starting state in the steps: choosing the Organizer, opening the correct screen, showing a hidden panel or clearing existing filters when applicable and authorized. State whether the reader's own account is suitable; do not assume the original employee must be impersonated. Name a specific stop/report outcome if the required account, record or control is unavailable.

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

For loading, timeout or delayed results, include a case-specific observation window, the action that starts it and when to stop without retrying. Distinguish a displayed zero from blank or still-loading content. Give concrete report choices and any local time needed for correlation. Explain browser filter/display-preference changes separately from transaction or other saved-record changes. Do not apply one incident's time window to every test.

Give independently assessed checks their own ID and heading. For example, separate Build, Operations and Account menu checks rather than reporting one combined Navigation failure. Each results row must link to the exact test heading and name the relevant step; do not leave the reader with plain-text references such as `Dashboard navigation, 1–4`.

### BUG-01 Jira draft

[Include this block for a confirmed bug. Remove it when no bug was confirmed. Keep one draft per distinct issue beside its affected test; link other affected checks to it. Write the Jira text from QA's observed actions and results. Keep source analysis and the full evidence/cleanup record in the surrounding report; do not copy every report field into Jira.]

**Draft only — no Jira issue has been created.**

**Title:** fix ([feature or area]) | [Specific observed problem]

**GIVEN** [Only the employee/customer access, record state and configuration needed to reproduce it. Name relevant flags/settings with their scope, exact name/key and state. Do not list unused controls or assume unverified setup.]

**WHEN** [The person performs the specific action, naming the starting screen and visible control.]

**THEN** [What actually happens. Name the wrong page, field, amount or outcome.] [In a separate sentence, say what should happen instead. Keep actual and intended behavior distinct; label a proposed expectation when the product rule is unresolved.]

[Use short prose for the three GIVEN/WHEN/THEN blocks. A supporting table may follow, but must not replace the explanation in THEN or require a separate Expected section. This compact Jira format does not change the numbered Expected/Actual walkthrough above.]

[Use everyday wording and the verified Showpass names for actors, screens, controls, items and fields. A product-team member must understand the draft without reading code or this chat. Use Organization for the Dashboard business and Venue for its Admin record; distinguish Customer from Attendee when relevant. Keep terms such as Return order, Refund, Void and Exchange accurate to the action. Explain an unfamiliar Showpass term briefly; leave other engineering terms in the internal notes.]

[Add the actual environment/client, affected record/date, useful screenshot, exact error or report-step reference, a brief material limit, impact or cleanup only when needed. Keep source checks, paths, hashes, causal hypotheses and detailed safety/classification notes in the report. Do not imply an additional reported symptom has the same cause.]

[When this is the user's own report, write their observed actions in first person rather than referring to them as "QA" or "the employee". Keep user-reported versus agent-executed evidence clear in the surrounding report.]

## Postconditions and Cleanup

[What remains saved or open, what was restored/deleted, what is preserved for review and what could not be verified.]

## References / Open Questions

[Only the source, ticket, design, existing test/helper or missing fact needed to understand this run. Omit empty sections. Do not replace execution evidence with source claims.]

## Results

Put this results table last. Remove example rows that do not apply and preserve every selected check's outcome. Screenshots remain local in `99 Archive/QA Evidence/<feature>/<run-slug>/`, ignored by Git, and visibly rendered beside the steps.

[Short recommendation for the agreed scope. Keep stronger conclusions blocked when their required proof is missing.]

Click the check name to open its exact step and evidence; click the bug ID for its Jira draft. Keep each row short and leave the full actions, values and screenshots in the walkthrough. Use a dash when no confirmed bug is attached; Blocked and Not run still mean the check has not passed.

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 — Executed check, step 1](#tc-01-descriptive-scenario-name) | Passed | — | [What was proven] |
| [TC-01 — Confirmed failure, step 2](#tc-01-descriptive-scenario-name) | Failed | [BUG-01](#bug-01-jira-draft) | [Specific observed failure] |
| [TC-01 — Required check, step 3](#tc-01-descriptive-scenario-name) | Blocked | — | [Missing access, data or tool capability; proof still needed] |
| [TC-01 — Unrun check, step 4](#tc-01-descriptive-scenario-name) | Not run | — | [Reason it was not run] |
