---
name: showpass-bug-drafter
description: Draft a copy-ready Showpass bug from a verified investigation or test result. Use for confirmed browser, source/API, or Sentry findings that need a Jira-ready draft; preserve the existing report and do not create a Jira issue unless separately requested.
---

# Showpass Bug Drafter

Turn a verified Showpass failure into one clear, reproducible draft. Read the QA Vault's `AGENTS.md` and `00 Start Here/World-Class Software Quality Standard.md`, especially **Finding Classification** and **Executable Reproduction Handoff**. The vault is `/Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault`.

## Establish what is verified

Identify the exact expected result and its authority, the observed result, the first point where they differ, the affected environment and record, and the evidence that proves the result through the relevant layer. A visible control, unsaved setting, API acceptance, candidate code change, or screenshot of one state alone does not prove an end-to-end failure. Separate a confirmed product failure from an unproven root cause. If the evidence is inconclusive, state the precise missing check and keep it labelled Inconclusive; do not manufacture a confirmed-bug draft.

Check for an existing issue or draft for the same cause and outcome when available. Several failed checks caused by one issue share one draft. A known issue can still be a failed check, but do not create a duplicate draft without a distinct reason. Correct or withdraw a draft if later evidence disproves it.

## Write the draft where the evidence lives

In a browser run, add the draft beside the affected test in the existing `03 Test Cases/` note, with a report-local `BUG-01` style ID; link its heading from the test index and final results row. Keep the full numbered Expected/Actual walkthrough and rendered screenshot at the actual step. The Jira draft summarizes that proof instead of copying the entire walkthrough or adding an image gallery. For a source-led investigation, use the existing canonical note under `02 Feature QA/`; for a Sentry-led investigation, use `08 Sentry Investigations/`. Update the existing note for the same issue before creating another.

## Write the Jira card from QA's perspective

Default to a short report that says what QA prepared, did and observed. Keep only the setup needed to repeat that observation. Do not turn a configuration inventory or a source investigation into prerequisites. Do not add an unrun working control, a successful save, an exact server status, a deployed revision, or a shared cause merely because the code suggests it.

Write for a Showpass product-team member who has not read the code or this chat. Use short, everyday sentences and the actual Showpass names for the actor, screen, action, item and field. Follow the terminology in [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup]]: use **Organization** for the Dashboard business, **Venue** for the Admin record, and distinguish **Customer**, **Attendee**, **Organizer** and **Venue Employee** when their role matters. Preserve visible labels such as **My Orders**, **Return order**, **Exchange items**, **Web Box Office**, **Ticket Type**, **Product** and **Itemized Sales Report** when verified for the affected screen. Do not replace them with invented labels or substitute Refund, Void and Exchange for one another. Explain an unfamiliar Showpass term briefly when needed. Say "the saved value is still shown" instead of "persistence" and "the report columns do not add up" instead of "cross-add discrepancy." Exact relevant flag keys and error text remain unchanged; other code terms belong in internal notes.

Write in the voice of the person filing the bug. For the user's own reported actions, use first person, such as "I saw a server error when I tried to exchange in Web Box Office." Do not refer to the user as "QA", "the employee reports", or "the user has not supplied" in their Jira description. Actor names still belong in GIVEN/WHEN when needed to reproduce the flow. Preserve internally that this was user-reported, not agent-executed; first-person wording does not authorize inventing actions or verification.

Name each relevant flag's exact key, scope (Venue, event, ticket type, product, user or global), and required state. Distinguish feature flags from modules, saved settings and permissions. Include visible navigation when a setting would otherwise be hard to find. Omit unrelated scopes and controls instead of listing every unused setting or inventing a flag. Record unknown setup in the local investigation; do not present it as verified QA preparation.

Keep source checks, code paths, commit hashes, technical root-cause analysis, confidence matrices and agent process notes in the local investigation. Do not copy them into Jira unless the user specifically requests technical detail. A concise screenshot, order reference, exact error or failed response belongs in Jira when it proves the observation. State a material reproduction limit briefly; do not pad the card with every untested variation.

Code behavior does not establish the intended product rule. When that rule is unclear, label the intended result as proposed and add one short Product question; do not call the implementation correct or the regression proven. An additional user-reported symptom may be included when requested, labelled as reported and with no assumed common cause. Do not invent the missing steps for it.

Default to a direct **GIVEN → WHEN → THEN** bug statement, using short prose under those three labels. GIVEN states the essential setup; WHEN states the action; THEN states the observed failure followed by a separate sentence explaining what should happen. Keep actual and intended behavior distinguishable within THEN instead of requiring a fourth **Expected** section. A table can support a complex comparison after the statement, but must not replace the plain-language THEN. Add environment, impact or evidence only when useful; do not expand every short draft into the full local investigation format.

Use this compact copy-ready form, in everyday language:

```markdown
### BUG-01 — [short problem name]

**Draft only — no Jira issue has been created.**

**Title:** fix (area) | specific observed problem

**GIVEN** [Actual role and essential saved setup. For relevant flags/settings, name the scope, exact control/key and state.]

**WHEN** [Visible user actions, in order, or the precise API/job trigger when no user action exists.]

**THEN** [What actually happens: the missing control, wrong value or actual error.] [In a separate sentence, say what should happen instead. Label a proposed expectation when the rule is unresolved.]

[Only when useful: actual environment/client, affected record/date, evidence, impact, a material verification limit or an unresolved Product question. Keep the full evidence, classification and data-safety record in the local investigation.]
```

Make the draft understandable without this chat. Keep manual actions in the product's visible words, with the actual starting navigation and required record state; put code paths and commit details in the local investigation's supporting evidence. State an exact observation window only for timing-dependent failures, and give a stop condition. Do not claim an unrun action was tested. State the business impact before severity or release classification; apply the vault's financial and access gates where relevant.

Before publishing, read only the Jira text: does it read as one clear GIVEN → WHEN → THEN scenario, can QA follow it without interpreting code, and can every factual statement be tied to a recorded observation or supplied evidence? THEN must explain the failure without requiring a table, an Expected section or this chat. Remove source-review wording and unsupported assumptions. The compact card does not replace the canonical standard's complete local evidence and classification requirements or the numbered Expected/Actual steps in a reproduction walkthrough.

Read it once more as a product-team member: is it clear where to start, what to select and what is wrong, using the words shown in Showpass? Replace jargon and vague words such as "entity," "surface" or "state" with the actual order, ticket, Product, screen or saved value.

Drafting is not a Jira write. Use connected Atlassian Rovo tools only if the user separately asks to create or change a Jira issue, then read back the result. End the user response with the draft location, what was verified, what remains unverified, and any single safe check needed next.
