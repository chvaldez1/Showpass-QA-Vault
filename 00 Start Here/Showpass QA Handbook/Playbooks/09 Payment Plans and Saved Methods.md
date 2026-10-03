---
title: Test Payment Plans and Saved Payment Methods
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test Payment Plans and Saved Payment Methods

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Organizer offers an eligible Payment Plan. The Customer understands the deposit and schedule, purchases, and receives the admission allowed by that plan. Later installments and failure handling must stay attached to the original payment account and order.

A saved payment method is a Customer account feature. It is not the same as Apple Pay or Google Pay, and saving a method is not proof that a purchase succeeded.

## Prepare before checkout

Use an isolated Event with supported Payment Plan configuration and a supported test processor. Record the plan price, deposit, installments, due dates/timezone, fee/tax treatment, rounding, initial ticket-validity rule, failure/grace/cancellation policy, and Employee permissions. Verify the current plan editor from the active client before writing exact field steps; do not infer its controls from an ordinary Ticket Type.

Prepare distinct Customers/orders for successful completion, failed installment, cancellation, and saved-method removal. Time advancement or forced installment failure belongs in an approved sandbox/backend test, not a real Customer schedule.

## Organizer configuration → Customer enrollment

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the Organizer, open the isolated Event's supported Payment Plan settings and create the intended plan. Save and reopen it. | Deposit, installment amounts/dates, applicable Ticket Types | The saved plan offers exactly the intended items and schedule. Unsupported combinations are rejected, not silently changed. |
| 2 | As the Customer, select the eligible Ticket Type and Payment Plan. Review the schedule before submitting payment. | Independent calculation of deposit, remaining installments, and fees | Today’s charge and future amounts/dates are understandable and match the saved plan. |
| 3 | Complete enrollment with an approved test payment method. Reopen the order and Customer account. | Controlled Customer | One initial charge and one plan enrollment exist. Admission is issued or withheld according to the actual plan rule. |
| 4 | As the Venue Employee, find the order and plan. Compare the initial payment and remaining schedule. | Original order reference | The Employee sees the same Customer, Event, amounts, and payment progress. |
| 5 | In an approved time-controlled run, process the next installment and then the last installment. Reopen each result. | Known due dates and test provider outcomes | Each due charge is recorded once; the remaining balance changes correctly; final payment changes eligibility only as specified. |

## Failure and post-purchase passes

| Scenario | Action | Required final check |
| --- | --- | --- |
| Installment decline | Use a designated failing test payment on an independent plan | Failure is visible; retry/grace/admission follows policy; no duplicate installment or false paid status. |
| Duplicate or delayed provider update | Exercise the provider integration in an isolated backend/sandbox test | Same installment is not collected or credited twice; a late message cannot undo a newer final state. |
| Cancellation or Refund | Use the supported adjustment on a separate plan | Future collection, refunded amounts, fees, and ticket validity follow policy. Refunding the deposit does not by itself prove future installments stopped. |
| Organizer changes pricing | Change only supported inputs on a separate test plan, then reopen checkout | Refreshed configuration is consistent. Existing enrollments follow their own agreed contract; do not assume they are repriced. |
| Payment-account migration | Engineering prepares old and new test accounts and existing plans | Existing plans remain on their original provider ownership; new ordinary sales use their current configured account. No live gateway change for QA. |

## Saved-method journey

1. As Customer A, use the supported save-card/setup flow with an approved test method. Leave and reopen the account.
2. Verify only masked details are displayed and the method belongs to Customer A.
3. Complete a separate eligible purchase using that saved method. Verify the actual charge, order, and tickets.
4. Remove the method through the supported account controls and reopen. A new ordinary checkout must not silently reuse a removed selection.
5. Sign in as Customer B in an independent session. Customer A's method must not appear or be usable.
6. For Waitlist/off-session enrollment, test the real setup and later charge separately; method setup alone is not a paid order.

For an active plan, removing an account method may not cancel a subscription or detach its original provider method. Bind that expected behavior to current source and policy; do not assume cancellation.

**Source route:** B13. Backend plans freeze Stripe gateway ownership; existing provider objects without established ownership fail closed. These implementation checks belong in migration/integration tests as well as the Customer-facing walkthrough.

## Source-backed cautions and automation reference

**Business risk:** first installment looks successful while later collections, access, remaining balance, or refunds are wrong.

**Automation:** backend schedule/provider/idempotency tests carry most coverage; Playwright proves plan selection and customer-visible state with supported setup. Unavailable time control is a named blocker, not covered by an initial sale. Source route: B13.
