---
name: showpass-customer-tester
description: Draft or test a signed-in Showpass Customer journey through checkout, Account, or transfers.
---

# Showpass Customer Tester

Use one assigned signed-in account and one job. A purchase, transfer send, and transfer acceptance are separate assignments even when the Customer Tester owns all three.

## Draft a Customer case

For [QA City’s written-case review](<../../../00 Start Here/Showpass QA City.md#draft-test-cases-with-review>), start from the signed-in Customer’s action and follow the result to the person who should receive it. Identify the record, owner or recipient that distinguishes this attempt from an earlier success. Look for a source-supported way the confirmation could look right while access, delivery or ownership is wrong. Put observations from the same journey in one case. Ask the appropriate tester to challenge a staff, Organizer or signed-out path when its behavior changes what the Customer receives.

## Explain the plan and wait for the QA Lead

For a live run or guided live test, share the numbered plan in plain language before opening or using the browser, operating a device, or asking the user to take the first live step. Follow the [QA Lead approval workflow](<../showpass-qa-lead/SKILL.md#tester-and-lead-handoff>). Name the starting screen, role and target. Say what you will verify and capture for each action, which changes and cleanup are in scope, and when you will finish or stop early. Use the [plan and proof guidance](<../../../06 Prompts/Showpass Release Engineering Handoff.md#plan-the-proof-and-stopping-point>) for approved beta preflight and evidence collection.

Follow the [shared engineering review layer](<../../../06 Prompts/Showpass Release Engineering Handoff.md#apply-the-review-layer>) on the exact plan. Use short Release Engineer review for routine live work and the full handoff with both Masters for high-risk or release work. Send the applicable review to the QA Lead and wait for explicit approval of that exact plan. If the Lead is unavailable, share the plan for handoff and leave the run waiting. The approval gate applies when the general browser workflow would otherwise start after showing the plan. Keep the user's permissions separate from the Lead's decision.

If any part of the plan changes, pause live work, show what changed in a new version, update the engineering handoff, and wait for fresh QA Lead approval. Preserve completed checks and their evidence. The same gate applies to live setup and edits. Finish draft-only requests with the draft and label execution Not run.

## Start with the assignment

- **Test it for me.** Use the matching Codex in-app browser. Verify the intended environment, entry point and assigned signed-in Customer account. Confirm the offering, payment setup and supported platform when the assigned job needs them. Use the [QA Vault guide](<../../../AGENTS.md>) for authorization and readiness.
- **Help me test it.** Guide the user through the next action and the result to look for. Let them handle their own sign-in or approved payment control when needed. Record whether each observation came from the user, the browser, or source.
- **Review or plan.** Trace the selected flow and describe what would prove it. Make payment or record changes only when the user authorizes live execution.

For code knowledge, read [Backend - web-app](<../../../01 Repositories/Backend - web-app.md>) for basket, validation, payment status, order ownership, and issuance. Read [Frontend - showpass-frontend](<../../../01 Repositories/Frontend - showpass-frontend.md>) for checkout entry points, visible steps, and My Orders. Use [Payments and Orders](<../../../00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders.md>) for sale and recovery. Use [Interactive Browser Release Testing](<../../../06 Prompts/Interactive Browser Release Testing.md>) for live QA.

## Choose one job

| Job | Proof and stopping point |
| --- | --- |
| Signed-in discovery | Use the assigned test account on the requested public entry, such as Calgary discovery. Verify filters, results and what changes for the signed-in visitor. |
| Public checkout | Start on the assigned public website, Showpass page or widget. Complete the authorized checkout with the assigned signed-in account. Stop at the verified order and issued items. |
| Account | Verify one Account action or saved result such as finding a ticket or Membership. Give transfers their own jobs. |
| Send transfer | Use the original buyer account and saved order. Send the authorized quantity once to the designated test recipient. Reopen the original order and record the safe transfer reference, pending count and retained count. |
| Accept transfer | Use the designated recipient account and secure claim for the exact transfer. Accept within scope and reopen Account to verify what was issued. Request the authorized claim handoff if it is unavailable. |

For a transfer handoff, pass the Event, order reference, transfer reference, quantities and the pending or accepted outcome. Keep claim links, credentials, card data and raw barcodes out of the run record. Verify the original result before retrying an ambiguous action. Use [the shared transfer workflow](<../../../06 Prompts/Interactive Browser Release Testing.md#builder-purchase-and-transfer-handoff>) for case quantities and evidence.

## Verify the checkout outcome when assigned

- Review item, variant or ticket type, quantity, fees, currency, final amount, and expected recipient before submitting. Use only approved test payment data. Treat a free registration as an order submission.
- Submit once for a clean purchase. Reopen the same order and verify the intended item was issued to the right Customer or Attendee. Check delivery through the agreed surface. A confirmation screen alone does not prove issuance or delivery.
- Choose decline, cancel, delayed confirmation, or retry checks when requested. For a timeout or ambiguous result, preserve the attempt reference and check My Orders or a permitted same-order staff/provider result. Stop charge-producing actions until the original attempt's final state is known.
- Finish at the verified order and issued items. Give a later transfer, Refund, Void, Exchange, resend or second order its own scope and owner. For a staff handoff, pass the safe order reference, selected client, and exact pending check.

For a UX review, ask whether a buyer could tell what they will pay, what they received, and what to do next. Use the [competitor comparison guide](<../../../06 Prompts/Showpass QA Competitor Comparisons.md>) when a peer example would clarify recovery, fee presentation, or ticket access.

Example assignment: “Buy one General Admission ticket in the approved beta setup. Check the total, one order in My Orders, and whether the ticket is available.”
