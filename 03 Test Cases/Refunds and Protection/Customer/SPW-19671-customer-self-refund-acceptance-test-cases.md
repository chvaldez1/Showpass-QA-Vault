---
title: Customer Self-Refund Acceptance Test Cases
jira: SPW-19671
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/test-cases
  - refunds
  - my-orders
---

# Customer Self-Refund Acceptance Test Cases

> [!important] Scope
> This card proves successful and failed customer return execution, final order/ticket state, credit, and transaction results. Venue configuration belongs to [[SPW-19667-customer-refund-policy-test-cases]]; eligibility-only cases belong to [[SPW-19668-customer-refund-eligibility-test-cases]]. The Jira acceptance list also needs the now source-present amount and delayed-barcode scenarios in separate notes. These local cases are unexecuted and have not been sent to Qase.

## Testing Intent

We are testing whether an order owner can complete one allowed return while the amount, ticket state, customer credit, and organizer transaction agree, and whether a late rule change or duplicate attempt leaves money and access unchanged.

## Jira Intake Summary

[SPW-19671](https://showpass.atlassian.net/browse/SPW-19671) requests Fan Expo end-to-end acceptance: selected-venue enablement, customer preview/confirmation, valid final payment and ticket states, mixed-order partial returns, blocked scenarios, and failure recovery. Current local source supports the venue-policy flow and now includes shipping/fee choices and the delayed-barcode control. Deployment and end-to-end results are not yet verified.

## Proof Targets

| Target | Cases |
| --- | --- |
| One clean return matches its preview and final records | TC-1 |
| Only a selected eligible item is returned | TC-2 |
| Late policy change rejects a stale return | TC-3 |
| Repeat attempt creates no second refund | TC-4 |

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/financials/services/invoice/user_invoice_return.py`, `customer_return_eligibility.py`; `apps/financials/api/user_based/viewsets/invoices.py`; `apps/financials/models/invoice_management/invoice.py`; `apps/financials/constants/refunds.py`; `apps/venues/models/venue_management/customer_refund_policy.py`, `venue.py`; `apps/financials/tests/api/user_based/invoices/test_api_user_based_invoice_return_policy.py`, `test_api_user_based_invoice_returns.py`.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/OrderOptionsList.web.tsx`; `ui/modals/return-order/MyOrdersReturnOrder.web.tsx`, `MyOrdersReturnOrderModalSelection.web.tsx`; `hooks/useReturnOrderPreview.ts`; `data/services/invoice/useReturnOrderAction.ts`; account Credits page; Dashboard Transactions action/details components. Source tests read, not run. No branch comparison or changed-file discovery was performed.

## Source-backed Behavior

* My Orders loads return eligibility separately. The customer sees item selection, a return amount, Confirm Return, a required reason, Return Order, and Return Successful; Done refreshes the order.
* These four cases keep configurable amount rules off to prove the basic completed-return path. Shipping/fee-specific values are checked in SPW-19669 using new compatible orders.
* Preview and execution use the existing invoice refund calculation. The venue's existing **Automated return medium** determines original payment versus credit; this is separate from the new policy. The return service locks the invoice and rechecks eligibility before refunding.
* A partial return sends only the selected item IDs. Returned tickets change state and a refund/credit history is recorded. A stale item selection returns updated eligibility; repeat selection of a refunded ticket is blocked.
* A later refunder failure can occur after an earlier refunder completed. Manual provider-failure simulation is deferred until a controlled setup and final-state proof exist.

## State-space / Setup Matrix

| Outcome | Order state | Cases |
| --- | --- | --- |
| Clean full return | One eligible paid ticket | TC-1 |
| Clean partial return | One eligible and one blocked ticket | TC-2 |
| Changed eligibility | Valid preview, then cutoff closed before submission | TC-3 |
| Duplicate attempt | One already returned ticket | TC-4 |

## Recommended Test Data

* Purchase a new paid ticket order from the event's public page as the same account that will later open **Account → My Orders**. Record the receipt and transaction ID. Keep tickets unscanned and untransferred unless a case says otherwise.
* In Admin → Venue customer refund policy, find the organization's record or Add → select Venue → Save. An employee with **Manage Organization Info** sets the policy to automatic with the case's cutoff and mixed-order choice. An employee with **Manage Events** sets ticket **Basic info → Allow customer-initiated refunds** per case.
* For credit proof, an authorized administrator opens Admin → Venue and sets **Automated return medium = Organizer Credit**. Record prior values and the customer's starting **Account → Credits → Organizer Credits** balance. Use distinct new orders for each actual return; preserve completed returns as financial evidence.

## Qase-ready Manual Test Cases

**Organizer Credit** is credit the customer can use with that organization. Each case below uses a newly paid order because a completed return cannot simply be undone.

### TC-1: My Orders - Refunds - Return one eligible ticket and receive the previewed organizer credit

**Description:** A customer returns one paid ticket they bought. Organizer Credit is money they can use with that organization. The amount shown before confirmation must be added once to that balance, and the ticket must be marked returned so it cannot be returned again.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* An employee with **Manage Organization Info** saves **Enable configurable refund amounts = off** before this order is purchased; this case uses the basic customer-return amount path.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** sets **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**, then saves.
* An employee with **Manage Events** sets **Allow customer-initiated refunds = on** in a future event ticket type's **Basic info**. The customer buys exactly one paid ticket with a refundable card payment; record its transaction ID and receipt. Keep it unscanned and untransferred.
* In Admin → Venue, an authorized administrator sets **Automated return medium = Organizer Credit** and **Automated return refund type = Full refund excluding Showpass fees**. Record the previous values and the customer's starting **Account → Credits → Organizer Credits** balance.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the purchasing customer and open Account → My Orders. | Purchased order | The paid order and ticket appear. |
| Open the order's options and select Return order. |  | The Return Order dialog lists the ticket as selectable. |
| Read the refund preview. | Record the displayed Organizer Credit amount. | The selected ticket, quantity, subtotal, fees/taxes, and a credit amount greater than zero are shown before confirmation. |
| Select Next. |  | Confirm Return shows the same credit amount. |
| Choose a response under Why are you returning this order? | Any listed reason | Return Order becomes available. |
| Select Return Order once. |  | Return Successful shows the same credit amount. |
| Select Done. |  | The success dialog closes. |
| Reopen the order in My Orders. | Recorded transaction | The ticket is marked returned/refunded and cannot be selected for another customer return. |
| Open Account → Credits → Organizer Credits. | Starting balance and preview amount | The organization's credit increased once by the displayed amount. |
| As an authorized employee, open Dashboard → Transactions and find the recorded transaction. | Transaction ID | The transaction shows one corresponding refund/credit result for the returned ticket. |

**Postconditions:**

* Keep the returned order and credit as execution evidence; do not try to reverse the completed return. Restore policy, ticket, and Venue settings changed during setup.

### TC-2: My Orders - Refunds - Return one ticket while keeping the other ticket

**Description:** A customer buys two different ticket types in one order. Only one ticket type has **Allow customer-initiated refunds** on. Return that ticket and confirm the other ticket remains paid and is not marked returned, with no refund for it.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* An employee with **Manage Organization Info** saves **Enable configurable refund amounts = off** before this order is purchased; this case uses the basic customer-return amount path.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
* An employee with **Manage Events** prepares two paid ticket types for the same future event. Save **Allow customer-initiated refunds = on** for one and **off** for the other. The customer buys one of each in a single refundable card order; record the transaction and both ticket prices.
* In Admin → Venue, an authorized administrator sets **Automated return medium = Organizer Credit** and records the customer's initial Organizer Credits balance plus the original Venue values.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and select Return order for the two-ticket order. | Two purchased ticket types | Both tickets appear; only the ticket with Allow customer-initiated refunds on can be selected. |
| Review the preview. | Record Organizer Credit amount. | The return quantity and amount apply only to the selected ticket. |
| Select Next. |  | Confirm Return shows the previewed amount. |
| Choose a return reason. | Any listed reason | Return Order becomes available. |
| Select Return Order once. |  | Return Successful shows the previewed amount. |
| Select Done. |  | The success dialog closes. |
| Reopen the order. |  | The selected ticket is marked returned; the other ticket remains paid and is not marked returned. |
| Open Account → Credits → Organizer Credits. | Starting balance and preview amount | The balance increased once by the previewed amount. |
| As an authorized employee, open Dashboard → Transactions for the same transaction. | Transaction ID | The refund is attributed to the selected item; the other item has no refund. |

**Postconditions:**

* Preserve the partially returned order as evidence. Restore policy, ticket, and Venue settings changed for this case.

### TC-3: My Orders - Refunds - Stop a return if the refund deadline changes before confirmation

**Description:** A customer opens **Return order** while a ticket can still be returned. Before they confirm, an employee closes customer refunds for the organization. The customer must see that the return is no longer allowed, and no refund or credit may be created.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* An employee with **Manage Organization Info** saves **Enable configurable refund amounts = off** before this order is purchased; this case uses the basic customer-return amount path.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
* An employee with **Manage Events** enables **Allow customer-initiated refunds** for a future event ticket type. The customer buys one paid, unscanned ticket with a refundable card payment. The customer and employee can use separate sessions for the same organization.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders → the order → Return order. | Purchased order | The ticket is selectable and a refund amount greater than zero appears. |
| Select Next. |  | Confirm Return shows the original preview amount. |
| Choose a return reason, leaving Confirm Return open. | Any listed reason | Return Order becomes available without changing the preview amount. |
| In the employee session, open Organization → Organization settings → Customer refunds. | Same organization | The current policy is shown. |
| Choose Manually closed for Cutoff type. |  | The cutoff selection changes. |
| Select Save. |  | Customer refund policy saved appears. |
| In the customer session, select Return Order once. |  | The return is rejected, the page shows that the ticket can no longer be returned, and Return Successful does not appear. |
| Reload the order in My Orders. |  | The ticket remains paid and is not marked returned; no organizer credit or refund transaction was created. |

**Postconditions:**

* Restore the original policy and ticket switch. Keep the order unrefunded.

### TC-4: My Orders - Refunds - Prevent a second return of an already refunded ticket

**Description:** A customer returns a paid ticket once, then opens the same order again. They must not be able to return that ticket a second time or receive more credit for it.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* An employee with **Manage Organization Info** saves **Enable configurable refund amounts = off** before this order is purchased; this case uses the basic customer-return amount path.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
* An employee with **Manage Events** enables **Allow customer-initiated refunds** on one future event ticket type. The customer buys one paid, unscanned ticket with a refundable card payment. In Admin → Venue, an authorized administrator sets **Automated return medium = Organizer Credit** and records previous settings.
* Record the customer's initial **Account → Credits → Organizer Credits** balance and the transaction ID. This case completes a real return of its own order.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders → the order → Return order. | Purchased order | The ticket is selectable and a credit amount greater than zero appears. |
| Select Next. | Record preview amount. | Confirm Return shows the same amount. |
| Choose a return reason. | Any listed reason | Return Order becomes available. |
| Select Return Order once. |  | Return Successful shows one completed return. |
| Select Done. |  | The success dialog closes. |
| Reload the same order. |  | The returned ticket cannot be selected again. |
| Open Return order again if the action remains available. |  | No second return can be confirmed for the already refunded ticket. |
| Open Account → Credits → Organizer Credits. | Starting balance and preview amount | The balance increased only once by the previewed amount. |
| As an authorized employee, open Dashboard → Transactions for the order. | Transaction ID | One corresponding refund result exists. |

**Postconditions:**

* Preserve the completed return and credit as evidence. Restore policy, ticket, and Venue settings without trying to reverse the return.

## Risk Areas and Coverage Accounting

| Risk | Status | Evidence / next proof |
| --- | --- | --- |
| Clean return, preview/credit/ticket/transaction agreement | Manual-only | TC-1; preserve a real completed order. |
| Partial return and untouched companion item | Manual-only | TC-2; separate order from TC-1. |
| Stale rule and duplicate request | Manual-only plus API automation | TC-3–TC-4; check fresh order and credit state. |
| Provider failure and partial completion | Deferred | Needs controlled provider failure, final refund-history read, and recovery expectation. A client toast alone is insufficient. |
| Selected-venue rollout | Manual-only | Target `enable_venue_policy_customer_self_refunds` to the selected organization; compare an organization outside rollout. |
| Shipping/fee-specific totals and original-payment settlement | Separate execution needed | See [[SPW-19669-customer-refund-amount-rules-test-cases]]; these four cases compare the basic preview to organizer credit only. |
| Barcode and inventory after refund | Deferred | TC-1 checks the returned ticket status in My Orders, not a Check in scan. Scan rejection and inventory restock need a separate executable setup and source trace. |

## Minimum Execution Set

Run TC-1 as a clean success first, then TC-2 on a separate mixed order, TC-3 with two sessions, and TC-4 with its own completed return. Compare starting and final customer credit and the same transaction in Dashboard each time.

## Suggested Automated Coverage

Test preview/execution amount parity, one credit/refund history per successful request, item status and retained companion ticket after partial return, the locked policy recheck, concurrent duplicate POSTs, and a provider failure after one of several refunders completes. Verify final state through a fresh invoice read, not a success toast alone.

## Assumptions and Unknowns

* Current source now has shipping/fee amount rules and the delayed-barcode opt-in. These cases use the basic amount path; run the separate cards for the new choices.
* The examples use organizer credit because its result is visible in the customer account. A return to the original payment method requires a separate controlled provider/settlement check if rollout uses that destination.
* Live payment, credit, ticket, inventory, and deployed-version behavior were not executed.

## Open Questions

1. Is Fan Expo's customer return destination Organizer Credit or original payment for acceptance?
2. Which provider and transaction surface will supply authoritative settlement proof?
3. Which ticket inventory configuration makes a returned seat or ticket available again, and is that required for this card?
4. Which deployed build and prepared orders will be used for the now source-present shipping/fee and delayed-barcode scenarios?
