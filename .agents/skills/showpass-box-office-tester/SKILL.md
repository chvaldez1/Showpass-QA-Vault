---
name: showpass-box-office-tester
description: Manually test or guide Showpass Box Office work as a Venue Employee. Use for staff-side order lookup, in-person sales, Check In, ticket delivery at the venue, and explicitly scoped post-sale actions.
---

# Showpass Box Office Tester

Act as the assigned Venue Employee on the actual client. Verify one staff operation per assignment. Give a later sale, Check In, or post-sale operation its own proof and stop point.

## Explain the plan and wait for the QA Lead

For a live run or guided live test, share the numbered plan in plain language before opening or using the browser, operating a device, or asking the user to take the first live step. Follow the [QA Lead approval workflow](<../showpass-qa-lead/SKILL.md#tester-and-lead-handoff>). Name the starting screen, role and target. Say what you will verify and capture for each action, which changes and cleanup are in scope, and when you will finish or stop early. Use the [plan and proof guidance](<../../../06 Prompts/Showpass Release Engineering Handoff.md#plan-the-proof-and-stopping-point>) for approved beta preflight and evidence collection.

Follow the [shared engineering review layer](<../../../06 Prompts/Showpass Release Engineering Handoff.md#apply-the-review-layer>) on the exact plan. Use short Release Engineer review for routine live work and the full handoff with both Masters for high-risk or release work. Send the applicable review to the QA Lead and wait for explicit approval of that exact plan. If the Lead is unavailable, share the plan for handoff and leave the run waiting. The approval gate applies when the general browser workflow would otherwise start after showing the plan. Keep the user's permissions separate from the Lead's decision.

If any part of the plan changes, pause live work, show what changed in a new version, update the engineering handoff, and wait for fresh QA Lead approval. Preserve completed checks and their evidence. The same gate applies to live setup and edits. Finish draft-only requests with the draft and label execution Not run.

## Start with the assignment

- **Test it for me.** Use the matching authorized Codex in-app browser. Verify environment, Organization, Event, exact role and permissions, and whether the requested surface is Web Box Office, POS mode, Electron, or another client. Use [QA Vault permissions](<../../../AGENTS.md>) for browser, device, access, and mutation boundaries.
- **Help me test it.** Give the Venue Employee the exact screen, next action, and expected visible result. Use this mode for an action they must take on a terminal, printer, scanner, or native client. Say which device results were reported by the user and which were observed directly.
- **Review or plan.** Trace the requested path and give steps or findings. Live sales, scans, or adjustments require their own authorization.

For code knowledge, use [Backend - web-app](<../../../01 Repositories/Backend - web-app.md>) first for employee permissions, transaction rules, admission state, and side effects. Use [Frontend - showpass-frontend](<../../../01 Repositories/Frontend - showpass-frontend.md>) to verify the exact client and visible controls. Use [Interactive Browser Release Testing](<../../../06 Prompts/Interactive Browser Release Testing.md>) for live QA.

## Choose the employee's job

| Job | What proves it |
| --- | --- |
| Find an existing order | Open Transactions or the owning screen on the selected client. Search for the authorized order and match the Event, Customer, ticket, and status. Stop at lookup if that is the request. |
| Sell one ticket | Confirm the sales channel, inventory, fees and allowed test payment method before submitting. Use the [payment workflow](<../../../00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders.md>). Verify one persisted order and the requested ticket/receipt. Reconcile an uncertain payment against the original attempt before repeating a charge. |
| Check someone in | Verify the correct Event occurrence, ticket validity, and admission rules before using the approved Check In action. Confirm the saved admission once. Test duplicate or re-entry only when requested and compare it with the configured policy. Follow the [admission playbook](<../../../00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale.md>). |
| Adjust, resend, or reprint | Verify the original transaction and exact requested action. Follow the applicable Handbook playbook. Confirm its saved outcome and only the requested or necessary downstream effects. |

Use the [hardware playbook](<../../../00 Start Here/Showpass QA Handbook/Playbooks/14 Mobile POS Kiosk and Hardware.md>) for physical-device proof. Report any unsupported client action as a concrete gap. In a handoff, record the Event, safe order reference, completed action, saved result, and anything an employee still needs to verify. Never include raw ticket barcodes or payment credentials.

For a workflow review, ask whether staff can find the right person under time pressure, distinguish a lookup from an admission, and recover from a delayed or failed action. Use the [competitor comparison guide](<../../../06 Prompts/Showpass QA Competitor Comparisons.md>) for the relevant device or operational scenario.

Example assignment: “Find the Customer Tester's order for the concert in Web Box Office. Tell me whether it shows the same ticket and order status.”
