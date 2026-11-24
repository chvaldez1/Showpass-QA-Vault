---
name: showpass-organizer-tester
description: Test or guide any permitted Showpass Organizer Dashboard workflow under /manage/ as an Organizer or Venue Employee. Check access, behavior, usability, and recovery, including scoped saves needed to prove a workflow.
---

# Showpass Organizer Tester

Start from the Organizer's goal and the page that owns it. Cover the relevant /manage/ page, such as Organization settings, Events, Products, Memberships, promotions, reports, or staff operations. Reuse the current authorized screen when it matches the target. For a standalone configuration or scenario setup, use the [Organizer Builder skill](<../showpass-beef-up-event/SKILL.md>).

Read the [QA Vault guide](<../../../AGENTS.md>) for authorization and readiness. For code knowledge, start with [Backend - web-app](<../../../01 Repositories/Backend - web-app.md>) for saved fields, permissions, validation, and dependencies. Then use [Frontend - showpass-frontend](<../../../01 Repositories/Frontend - showpass-frontend.md>) for the owning Dashboard page, inputs, and save behavior. Trace only the part that affects the requested job. For a straightforward field edit, use the visible form and check source when the rule or consequence is uncertain.

## Explain the plan and wait for the QA Lead

For a live run or guided live test, share the numbered plan in plain language before opening or using the browser, operating a device, or asking the user to take the first live step. Follow the [QA Lead approval workflow](<../showpass-qa-lead/SKILL.md#tester-and-lead-handoff>). Name the starting screen, role and target. Say what you will verify and capture for each action, which changes and cleanup are in scope, and when you will finish or stop early. Use the [plan and proof guidance](<../../../06 Prompts/Showpass Release Engineering Handoff.md#plan-the-proof-and-stopping-point>) for approved beta preflight and evidence collection.

Follow the [shared engineering review layer](<../../../06 Prompts/Showpass Release Engineering Handoff.md#apply-the-review-layer>) on the exact plan. Use short Release Engineer review for routine live work and the full handoff with both Masters for high-risk or release work. Send the applicable review to the QA Lead and wait for explicit approval of that exact plan. If the Lead is unavailable, share the plan for handoff and leave the run waiting. The approval gate applies when the general browser workflow would otherwise start after showing the plan. Keep the user's permissions separate from the Lead's decision.

If any part of the plan changes, pause live work, show what changed in a new version, update the engineering handoff, and wait for fresh QA Lead approval. Preserve completed checks and their evidence. The same gate applies to live setup and edits. Finish draft-only requests with the draft and label execution Not run.

## Pick the job

| Request | How to work |
| --- | --- |
| “What should I check on this page?” | Guide the user through the assigned behavior and evidence. Route standalone configuration work to Organizer Builder. |
| Verify a save on a named settings page | Confirm the Organization and authorized values. Fill the relevant visible fields, save when requested, and reopen to verify those values. Finish after the requested edit is confirmed. |
| “Test this Organization page as an Organizer” | Use the assigned Organizer-side session and verify the role and selected Organization. Inspect the requested page for access, clarity, validation, and visible behavior. Include save/reopen checks only within approved test-data scope. Use [Interactive Browser Release Testing](<../../../06 Prompts/Interactive Browser Release Testing.md>) for the test and its evidence. |

## Two everyday assignments

- **“Test this Organization report.”** Confirm the expected business result and available data. Check whether the Organizer can find the report, understand the applied filters, and interpret the displayed result. Include export or reconciliation only when it belongs to the requested proof.
- **“Test saving Organization settings → Contact.”** Check the selected Organization and the exact requested contact fields. Primary email, Customer support email, and Accounting email serve different purposes. Use the supplied or approved test contact values and preserve the other fields and communication toggles. If the form requires a support address or some other decision that has not been provided, ask only for the blocking value. Reopen **Contact** to verify the save. Treat message delivery or a check of the public Event page as its own assignment.

For a save that is part of the behavior under test, use supplied or approved test values. Route requests to fill out or configure a page as setup to Organizer Builder. Keep findings and any downstream checks within their assigned scope. Use [competitor comparisons](<../../../06 Prompts/Showpass QA Competitor Comparisons.md>) when they clarify the specific Organizer friction.
