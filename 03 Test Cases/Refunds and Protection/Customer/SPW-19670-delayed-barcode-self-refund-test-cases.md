---
title: Delayed Barcode Customer Self-Refund Test Cases
jira: SPW-19670
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/test-cases
  - refunds
---

# Delayed Barcode Customer Self-Refund Test Cases

> [!important] Observe customer-visible release
> Current source contains the Venue setting and My Orders behavior that the 2026-09-24 note marked absent. These cases are unexecuted and have not been sent to Qase. A generated barcode value is not proof of release; verify the customer can actually see/use the barcode. Follow [[00 Customer - How to Test]].

**Qase publication review, 2026-10-05:** keep both cases local until the supported Admin/Organizer preparation for delayed delivery and a scheduled customer-visible release is documented. The backend releases tickets when their event enters the configured hours-before-start window, through `apps/tickets/managers/ticket_lifecycle.py` and `apps/tickets/services/fulfillment/activate_delayed_ticket_barcodes.py`; those background calls are not manual customer actions. An instruction to “schedule release” without its preparation steps is not enough for publication.

## Testing Intent

Prove that a delayed-delivery ticket can be returned before barcode release, remains blocked after release with the Venue opt-in off, and can be previewed and returned after release when the opt-in and other return rules allow it.

## Jira Intake Summary

[SPW-19670](https://showpass.atlassian.net/browse/SPW-19670) adds one ordinary Venue field, `allow_delayed_barcode_automated_returns`, default off. The Jira card says no **separate** delayed-barcode waffle flag. Current source nevertheless requires the shared `enable_venue_policy_customer_self_refunds` rollout flag for a released delayed barcode; record this difference. Existing **Enable automated returns**, window, medium, and refund type remain relevant. Staff refunds are outside this card.

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/venues/models/venue_management/venue.py`, `apps/venues/utils.py`, `apps/financials/services/invoice/customer_return_eligibility.py`, `user_invoice_return.py`, `apps/financials/api/user_based/serializers/invoices/detail.py` and `lists.py`.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/user/features/account/features/my-orders/utils/order-actions/return-order.ts` and `ui/modals/return-order/MyOrdersReturnOrder.web.tsx`.

## Source-backed Behavior

* The Venue field starts off. For a released delayed barcode, current backend requires the organization rollout flag, Venue **Allow delayed barcode automated returns = on**, and Venue **Enable automated returns = on**. The old automated-return window still applies.
* If the new organization policy is on, its item switch, outcome, cutoff, and barcode restrictions also apply. A released delayed barcode cannot bypass another blocker.
* A customer-activation ticket after activation remains blocked. Scanned/checked-in, refunded, voided, non-paid, transfer/resale-in-progress, and wrong-customer items remain blocked.
* Preview and submission recheck eligibility. Refund amount uses the saved purchase and Venue's existing automated-return medium/type; this card does not introduce new refund math.

## State-space / Setup Matrix

| Venue automated returns | Delayed-barcode opt-in | Customer-visible barcode | Expected selection |
| --- | --- | --- | --- |
| On | Off | Not released | Eligible if all other rules pass. |
| On | Off | Released | Blocked. |
| On | On | Not released | Eligible if all other rules pass. |
| On | On | Released | Eligible if rollout and all other rules pass. |
| Off | On | Released | Blocked. |

Also check activated customer-activation, checked-in/scanned, refunded/voided/non-paid, and inside the automated-return window. Prepare separate tickets for irreversible states.

## Recommended Test Data

Use an event/ticket type configured for **delayed barcode delivery**, with its release scheduled during the run. An authorized Admin can set the selected Venue's **Enable automated returns**, **Allow delayed barcode automated returns**, **Automated return window**, **Automated return medium**, and **Automated return refund type**; record their original values. Include the organization in `enable_venue_policy_customer_self_refunds`. If the new organization policy is enabled, save automatic outcome, no cutoff, **After barcode delivery = Allow customer refunds**, and ticket switch on. Buy separate new paid tickets as the customer who will open My Orders. Keep them unscanned/untransferred. Record receipt and the actual customer-visible before/after barcode states. If release cannot be safely scheduled or observed, mark the post-release cases Blocked with that exact setup gap.

## Qase-ready Manual Test Cases

### TC-1: My Orders - Refunds - Block a released delayed barcode when the Venue opt-in is off

**Description:** The buyer can inspect the return before a delayed barcode is released. After release, the same ticket cannot be returned while **Allow delayed barcode automated returns** is off.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* The organization is included in `enable_venue_policy_customer_self_refunds`. In Admin → Venue, an authorized administrator saves **Enable automated returns = on** and **Allow delayed barcode automated returns = off**, with an event outside the saved automated-return window. Record original Venue values.
* In Showpass Admin → Venue customer refund policies, reuse the organization's policy or **Add** → select the organization in **Venue** → **Save**. An employee with **Manage Organization Info** saves policy on, automatic outcome, no cutoff, and **After barcode delivery = Allow customer refunds**. An employee with **Manage Events** turns on the ticket type's **Allow customer-initiated refunds**. Record original values.
* The buyer has a newly paid, unscanned delayed-delivery ticket whose barcode has not yet been released. Its scheduled release occurs during this run; record the receipt and how the buyer will see the barcode.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As buyer, open Account → My Orders → the order → Return order before release. | Paid delayed ticket | The ticket is selectable and a refund preview is available; do not submit. |
| Close the return dialog and wait for scheduled barcode release. | Customer ticket view | The buyer can now see the released barcode. |
| Reload My Orders and inspect the same order; open Return order if that action remains available. | Venue opt-in off | The action is unavailable or the ticket cannot be selected; no refund is submitted. |
| Reopen the order and customer credit/payment history. | Original order | Ticket remains paid and no refund/credit was created. |

**Postconditions:**

* Keep the paid order for evidence. Restore policy, ticket, and Venue values changed for this case.

### TC-2: My Orders - Refunds - Return an eligible ticket after delayed barcode release

**Description:** With the Venue opt-in on, the buyer can preview and complete one return after the delayed barcode is visible, receiving only the amount supported by the original purchase.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* The organization is included in `enable_venue_policy_customer_self_refunds`. In Admin → Venue, an authorized administrator saves **Enable automated returns = on**, **Allow delayed barcode automated returns = on**, a return window that still permits this future event, and **Automated return medium = Organizer Credit**. Record original values.
* The organization's separate customer refund policy exists. An employee with **Manage Organization Info** saves policy on, automatic outcome, no cutoff, and **After barcode delivery = Allow customer refunds**. An employee with **Manage Events** turns on the ticket type's **Allow customer-initiated refunds**. Record original values.
* The buyer has a **new** paid, unscanned delayed-delivery ticket and its original receipt. Schedule release during the run and record the buyer's starting Organizer Credit balance.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As buyer, open Account → My Orders → Return order before release. | Paid delayed ticket | The ticket is selectable and preview shows an amount from the purchase; do not submit yet. |
| Close the dialog and wait until the buyer can see the released barcode. | Customer ticket view | Barcode is visibly available to the buyer. |
| Reload My Orders → Return order and select the same ticket. | Released barcode | The ticket remains selectable and a current preview appears. |
| Record the preview and complete Return order once. | Current preview amount | Return Successful shows one refund/credit equal to the preview. |
| Reopen the order, Organizer Credits, and the organizer transaction. | Original receipt and order reference | Ticket is returned, cannot be returned again, credit increased once, and one matching return record exists. |

**Postconditions:**

* Preserve the paid and returned records. Restore policy, ticket, and Venue settings changed for this case.

## Risk Areas

* My Orders may offer Return order while preview or submission rejects a released barcode, or the reverse.
* A generated barcode may be mistaken for customer-visible release.
* The opt-in may bypass cutoff, checked-in, payment, ownership, or amount safeguards.

## Minimum Execution Set

Run TC-1 and TC-2 on separate new paid tickets. Also check one activated customer-activation ticket, one checked-in ticket, one ticket inside the automated-return window, one order with automated returns off, and one duplicate attempt. Record the exact blocked message and verify no refund record was created. Use backend/API tests for wrong-customer and state combinations that cannot be prepared safely through product UI.

## Suggested Automated Coverage

Assert field default off and invoice serialization; rollout/opt-in/automated-return combinations; frontend selection; preview and submission parity; activation, scan, cutoff, ownership, paid status; no uncharged value; and rollback to off.

## Assumptions and Unknowns

Local source contains the field and return path; deployment, migration, saved Venue values, and customer-visible barcode release were not checked live. The shared rollout flag requirement for released barcodes is source-backed and differs from Jira's wording if read as “no flag at all.”

## Open Questions

1. Which event/ticket setup provides a scheduled, observable delayed barcode release during the manual run?
2. Should released delayed-barcode returns require the shared customer-policy rollout flag even when the new organization policy is disabled?
