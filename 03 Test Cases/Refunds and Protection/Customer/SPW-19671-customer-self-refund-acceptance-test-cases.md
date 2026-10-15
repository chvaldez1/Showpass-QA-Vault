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
> This card proves successful and failed customer return execution, final order/ticket state, credit, and transaction results. Venue configuration belongs to [[SPW-19667-customer-refund-policy-test-cases]]; eligibility-only cases belong to [[SPW-19668-customer-refund-eligibility-test-cases]]. The Jira acceptance list also needs the now source-present amount and delayed-barcode scenarios in separate notes. The cases are unexecuted; the publication section below identifies the published base cases.

## Qase publication

Published and verified **2026-10-05** after user approval in [Customer (1108)](https://app.qase.io/project/SPT?suite=1108). Saved fields, parameters, tags, steps, and suite placement matched the local cases. Publication does not mean execution.

| Local draft | Qase case |
| --- | --- |
| TC-1 | [SPT-5314](https://app.qase.io/case/SPT-5314) |
| TC-2 | [SPT-5315](https://app.qase.io/case/SPT-5315) |
| TC-3 | [SPT-5316](https://app.qase.io/case/SPT-5316) |

TC-5 was published and saved fields verified **2026-10-06** as [SPT-5324](https://app.qase.io/case/SPT-5324): **Require the whole remaining order — return every remaining purchase for organizer credit**. TC-4 remains local as additional duplicate-return coverage. All manual cases remain unexecuted.

**Item-configuration review, 2026-10-06:** TC-1's detailed purchase configurations and setup were applied to SPT-5314 and verified. Existing platform/view coverage and the original scenario are preserved. The manual case has not been executed.

**Title review, 2026-10-06:** SPT-5315 uses the exact **Refund eligible items independently** option in its saved Qase title. The completed whole-order case SPT-5324 uses the exact **Require the whole remaining order** choice.

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
| Whole-order return includes every required purchase and credits the correct total | TC-5 |

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/financials/services/invoice/user_invoice_return.py`, `customer_return_eligibility.py`; `apps/financials/api/user_based/viewsets/invoices.py`; `apps/financials/models/invoice_management/invoice.py`; `apps/financials/constants/refunds.py`; `apps/venues/models/venue_management/customer_refund_policy.py`, `venue.py`; `apps/financials/tests/api/user_based/invoices/test_api_user_based_invoice_return_policy.py`, `test_api_user_based_invoice_returns.py`.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/OrderOptionsList.web.tsx`; `ui/modals/return-order/MyOrdersReturnOrder.web.tsx`, `MyOrdersReturnOrderModalSelection.web.tsx`; `hooks/useReturnOrderPreview.ts`; `data/services/invoice/useReturnOrderAction.ts`; account Credits page; Dashboard Transactions action/details components. Source tests read, not run. No branch comparison or changed-file discovery was performed.

**Additional configuration sources reviewed 2026-10-06:** backend `apps/financials/payments/refunders/base.py`; `apps/financials/models/invoice_management/invoice.py` (`get_partial_return_refunders`); `apps/tickets/models/packages_management/ticket_package.py`; `apps/tickets/models/ticket_lifecycle/ticket.py` (`update_seating_permissions`); `apps/tickets/services/seating_management/seating_release_service.py`. Frontend package/product form sections and My Orders `utils/invoice-ticket-utils.ts`, `utils/order-actions/return-order.ts` establish the visible selection and setup. Source review is not execution.

**Whole-order review, 2026-10-06:** new local TC-5 proves completed whole-order returns for three explicit non-package configurations. Backend `customer_return_eligibility.py` requires all remaining items, `apps/tickets/models/order_management/order_basket.py` (`_build_invoice_items`) creates invoice-item snapshots per basket group, and `invoice.py` creates a refunder per selected invoice-item group. Two different ticket types or a ticket and separately priced product produce two credit records. Seat credit-record counts must follow the original purchase groups shown in Transactions; the case records those rows before return rather than assuming every seating checkout groups them identically. These are source-backed expectations awaiting execution.

## Source-backed Behavior

* My Orders loads return eligibility separately. The customer sees item selection, a return amount, Confirm Return, a required reason, Return Order, and Return Successful; Done refreshes the order.
* These cases keep configurable amount rules off to prove the basic completed-return path. Shipping/fee-specific values are checked in SPW-19669 using new compatible orders.
* Preview and execution use the existing invoice refund calculation. The venue's existing **Automated return medium** determines original payment versus credit; this is separate from the new policy. The return service locks the invoice and rechecks eligibility before refunding.
* The basic return path creates one refunder per selected invoice-item group. A ticket and a separately priced product selected together can therefore produce two credit records whose sum equals the preview; this is not a duplicate return. A parent-priced package selected once cascades returned status to included items.
* A partial return sends only the selected item IDs. Returned tickets change state and a refund/credit history is recorded. A stale item selection returns updated eligibility; repeat selection of a refunded ticket is blocked.
* A later refunder failure can occur after an earlier refunder completed. Manual provider-failure simulation is deferred until a controlled setup and final-state proof exist.

## State-space / Setup Matrix

| Outcome | Order state | Cases |
| --- | --- | --- |
| Clean full or selected-item return | General admission, product add-on, standalone product, separate ticket + product purchase, individual seat, or single-barcode Preset ticket package | TC-1; six independent PurchaseConfiguration runs |
| Clean partial return | One eligible and one blocked ticket | TC-2 |
| Changed eligibility | Valid preview, then cutoff closed before submission | TC-3 |
| Duplicate attempt | One already returned ticket | TC-4 |
| Whole-order completion | Two eligible ticket types, one admission + separately priced product, or two individually sold seats of one type | TC-5; three independent purchases |

## Recommended Test Data

* Purchase a new paid ticket order from the event's public page as the same account that will later open **Account → My Orders**. Record the receipt and transaction ID. Keep tickets unscanned and untransferred unless a case says otherwise.
* In Admin → Venue customer refund policy, find the organization's record or Add → select Venue → Save. An employee with **Manage Organization Info** sets the policy to automatic with the case's cutoff and mixed-order choice. An employee with **Manage Events** sets ticket **Basic info → Allow customer-initiated refunds** per case.
* For credit proof, an authorized administrator opens Admin → Venue and sets **Automated return medium = Organizer Credit**. Record prior values and the customer's starting **Account → Credits → Organizer Credits** balance. Use distinct new orders for each actual return; preserve completed returns as financial evidence.

## Qase-ready Manual Test Cases

**Organizer Credit** is credit the customer can use with that organization. Each case below uses a newly paid order because a completed return cannot simply be undone.

### TC-1: My Orders - Refunds - Return purchased items and receive the previewed organizer credit

**Description:** A customer buys the items listed for PurchaseConfiguration and completes one permitted return. The selected purchase must be marked returned, and the previewed amount must be added once to the customer's Organizer Credits for the same organization. Organizer Credit is spending credit with that organization; this case does not send money back to the customer's card. A ticket package is one purchase containing included tickets; returning its listing also returns the included tickets.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| PurchaseConfiguration | Configure and buy | Select for return | What must be returned | What must remain paid | Credit records expected |
| --- | --- | --- | --- | --- | --- |
| TicketType | One public General Admission ticket, price 10.00, inventory 10; refund switch on; quantity 1. No package or assigned seat. | The one ticket. | One ticket. | Nothing else was purchased. | 1; its amount equals the preview. |
| Product | One General Admission ticket priced 10.00 with switch off, plus one checkout product variant priced 15.00 with inventory 10 and switch on; quantity 1 of each. | The product only. | One unit of the recorded product variant. | The accompanying admission ticket. | 1; its amount equals the preview. |
| StandaloneProduct | One product variant priced 15.00 with inventory 10, Visible on Your Venue Page on and refund switch on; buy quantity 1 without admission. | The product only. | One unit of the recorded product variant. | Nothing else was purchased. | 1; its amount equals the preview. |
| TicketAndProduct | One General Admission ticket priced 10.00 and one checkout product variant priced 15.00 with inventory 10; both switches on; quantity 1 of each. | Both the ticket and product. | The admission ticket and one unit of the recorded product variant. | Nothing else was purchased. | 2: one for the ticket and one for the product; their sum equals the preview. |
| AssignedSeat | One paid ticket for an individually selectable seat in a future event with an existing map; refund switch on; no package, membership, full-table requirement, shared hold, or resale. | The ticket for the recorded section, row, and seat. | The one seat ticket. | Nothing else was purchased. | 1; its amount equals the preview. |
| TicketPackage | One 20.00 Preset package containing quantity 1 of each of two different General Admission ticket types. Listing and both included switches on; Send a single barcode on; Allow redemption on any included item off. | The package listing once; not either included ticket separately. | The package listing and both included tickets. | Nothing else was purchased. | 1; its amount equals the preview. |

**Tags:** my-orders, refunds, post-purchase

**Parameters:**
PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage

**Preconditions:**

* The preparing employee has **Manage Organization Info**, **Manage Events**, and **Manage Transactions**; product configurations also require **Manage Marketplace** and an organization not on Basic pricing.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` rollout flag. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**, so this case does not depend on delayed release or customer activation.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its policy or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, **After barcode delivery = Allow customer refunds**, **After fulfillment or shipping = Block customer refunds**, **After check-in or scan = Block customer refunds**, **Orders with mixed eligibility = Refund eligible items independently**, and **Enable configurable refund amounts = off** before purchase. Record the original settings.
* In **Admin → Venues → Venues**, open the selected organization and save **Automated return medium = Organizer Credit** and **Automated return refund type = Full refund excluding Showpass fees**. Record the original values and the customer's starting **Account → Credits → Organizer Credits** balance for this organization.
* For tickets, open **Dashboard → Build → Events → All events → Edit → Tickets** on a published, single-day event at least seven days in the future with public sales open. Add or select the ticket types listed for PurchaseConfiguration and save their **Basic info → Allow customer-initiated refunds** choices. Use items without unrelated sales and record their names.
* For products, open **Dashboard → Build → Products → All products**; create or select a product, save its variant name, price, and inventory under **Inventory**, and save **Fulfillment → Allow customer-initiated refunds = on**. Product and TicketAndProduct: in **Availability → Checkout add-ons**, enable **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select this event and ticket under **Select tickets to include**, and save. StandaloneProduct: enable **Availability → Sales channels → Visible on Your Venue Page** and save.
* For AssignedSeat, reuse a future event with an individual seat offered to the public for the selected ticket type. Record section, row, seat, and paid price; do not change a shared seating layout or use a seat reserved by another purchase or membership.
* For TicketPackage, use an organization already set to **Admin → Venues → Venues → Package revenue realization type = Parent**. Create three public ticket types with inventory 10: the 20.00 package listing and two included types priced 10.00 and 12.00. In **Dashboard → Promote → Packages → Create package**, choose **Package type = Preset**, this **Event**, and the listing **Ticket type**; under **Included tickets**, use **Add ticket** for each included type with **Qty = 1**. Save the barcode choices in PurchaseConfiguration, then reopen the event's Tickets page and save all three refund switches on. All tickets use the same future event; no product or nested package is included.
* As the customer who will return the purchase, buy exactly the quantities listed for PurchaseConfiguration with an approved refundable card payment. Use a new order for each run; a completed return cannot simply be undone. Record the receipt, transaction, item names, variant or seat labels, quantities, prices, taxes, and fees. Do not apply discounts, existing credit, gift cards, payment plans, shipping, or protection. Keep all items unscanned, unfulfilled, untransferred, and not offered for resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the purchasing customer and open Account → My Orders. | Recorded transaction | The paid order contains the items and quantities listed for PurchaseConfiguration. |
| Open the order's options and select Return order. | PurchaseConfiguration | The intended purchase is selectable, with any off-switch companion ticket blocked. |
| Select exactly the purchases listed under Select for return. | PurchaseConfiguration; one package listing for TicketPackage | The selected names and quantities match the recorded purchase without selecting a blocked companion item. |
| Read the refund preview. | Receipt; record the selected subtotal, taxes, fees, and Organizer Credit amount | The preview shows the selected purchases and a positive credit amount without adding the price of an unselected item. |
| Select Next. | Recorded preview amount | Confirm Return shows the same Organizer Credit amount. |
| Choose a response under Why are you returning this order? | Any listed reason | Return Order becomes available. |
| Select Return Order once. |  | Return Successful shows the same credit amount. |
| Select Done. |  | The success dialog closes. |
| Reopen the order in My Orders. | What must be returned and What must remain paid in PurchaseConfiguration | Returned purchases are marked returned/refunded and any untouched companion ticket remains paid. |
| Inspect the returned purchase's available actions. | Recorded returned purchase | It cannot be selected for another customer return. |
| Open Account → Credits → Organizer Credits. | Starting balance and recorded preview amount | This organization's balance increased by exactly the previewed total, with no additional credit. |
| As the employee, open Dashboard → Transactions and find the original transaction. | Credit records expected in PurchaseConfiguration | The linked credit records have the expected count and their combined amount equals the preview. |
| Open the transaction's item details. | Item names and quantities from PurchaseConfiguration | The intended items show returned status, including both included tickets for TicketPackage; any untouched companion has no refund. |

**Postconditions:**

* Keep the returned order, credit adjustment, receipt, and starting/final balance as evidence; do not reverse the completed return or delete its history.
* Restore the organization policy, item switches, and Automated return settings changed during preparation, then save and reopen them.
* AssignedSeat: open the same event's public seating map in a fresh purchase session and check that the recorded individual seat is available again. Leave without reserving or buying it.
* Product, StandaloneProduct, and TicketAndProduct: do not treat returned status as proof that a physical product was restocked; product inventory and fulfillment are separate checks.

### TC-2: My Orders - Refunds - Refund eligible items independently - Return one ticket and keep the blocked ticket

**Description:** A customer buys two different ticket types in one order. Only one ticket type has **Allow customer-initiated refunds** on. Return that ticket and confirm the other ticket remains paid and is not marked returned, with no refund for it.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* The employee checking the completed refund has **Manage Transactions** for the selected organization.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* An employee with **Manage Organization Info** saves **Enable configurable refund amounts = off** before this order is purchased; this case uses the basic customer-return amount path.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **After barcode delivery = Allow customer refunds**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
* An employee with **Manage Events** prepares two paid ticket types for the same future event. Save **Allow customer-initiated refunds = on** for one and **off** for the other. The customer buys one of each in a single refundable card order; keep both tickets unscanned, unfulfilled, and untransferred, and record the transaction and both ticket prices.
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

* The employee checking Transactions has **Manage Transactions**. In Showpass Admin → Venues → Venues, open the selected organization and set **Automated return medium = Organizer Credit**; record its original value and the customer’s starting **Account → Credits → Organizer Credits** balance.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* An employee with **Manage Organization Info** saves **Enable configurable refund amounts = off** before this order is purchased; this case uses the basic customer-return amount path.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **After barcode delivery = Allow customer refunds**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
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
| Reload the order in My Orders. |  | The ticket remains paid and is not marked returned. |
| Open Account → Credits → Organizer Credits. | Recorded starting balance | The organization’s credit balance is unchanged. |
| As the employee, open Dashboard → Transactions and find the order. | Transaction reference recorded during purchase | No refund or credit adjustment was created for this attempt. |

**Postconditions:**

* Restore the original policy, ticket switch, and Automated return medium. Keep the order unrefunded.

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

### TC-5: My Orders - Refunds - Require the whole remaining order - Return every remaining purchase for organizer credit

**Description:** The customer buys the two items in PurchaseConfiguration with both refund switches on. The organization requires the whole remaining order. Complete one return containing both purchases and verify both are returned, the previewed total is added once to Organizer Credits, and neither purchase can be returned again. Organizer Credits are spending credit with this organization; this case does not send money back to the customer's card.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| PurchaseConfiguration | Configure and buy in one order | Items required in the return | Item used for the deselection check |
| --- | --- | --- | --- |
| TwoTicketTypes | Same future event: one public General Admission ticket type priced 10.00 and another priced 15.00, inventory 10 each. Both refund switches on. Buy quantity 1 of each. | Both admission tickets; quantity 1 each. | The 15.00 ticket. |
| TicketAndProduct | One public General Admission ticket priced 10.00 plus one separately priced product variant priced 15.00, inventory 10 each. Both refund switches on. Buy quantity 1 of each in the event checkout. No package relationship. | The admission ticket and the recorded product variant; quantity 1 each. | The product. |
| TwoAssignedSeats | One public ticket type offered on an existing map in a future event; inventory allows at least two individual seats. Refund switch on. Buy two different available seats of that type in one checkout; record each seat and paid price. No full-table requirement, package, membership, shared hold, or resale. | Both recorded seat tickets; quantity 1 each. | The second recorded seat. |

**Tags:** my-orders, refunds, post-purchase

**Parameters:**
PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats

**Preconditions:**

* The preparing employee has **Manage Organization Info** and **Manage Events**. TicketAndProduct also requires **Manage Marketplace** and an organization not on Basic pricing.
* Enable `enable_venue_policy_customer_self_refunds` for this organization. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **Customers can self-refund automatically**, **No cutoff**, **After barcode delivery = Allow customer refunds**, **After fulfillment or shipping = Block customer refunds**, **After check-in or scan = Block customer refunds**, **Orders with mixed eligibility = Require the whole remaining order**, and **Enable configurable refund amounts = off** before purchase. Record original settings.
* For tickets, open **Dashboard → Build → Events → All events → Edit → Tickets** on a published, single-day event at least seven days in the future with public sales open. Add or select the ticket types in PurchaseConfiguration; save **Basic info → Allow customer-initiated refunds = on**. Record their names and prices; use ticket types without unrelated sales because another run may change their refund switches.
* For TicketAndProduct, open **Dashboard → Build → Products → All products**; create or select a product, save a variant priced 15.00 with inventory 10 under **Inventory**, and save **Fulfillment → Allow customer-initiated refunds = on**. Under **Availability → Checkout add-ons**, turn on **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select the event and admission under **Select tickets to include**, and save. Do not create a Sub-product relation or ticket package.
* For TwoAssignedSeats, reuse a public map that sells seats individually for the selected ticket type. Record the section, row, seat, and paid price for each of two different seats. Do not change a shared layout or use seats tied to another purchase or membership.
* As the customer who will open My Orders, buy exactly the selected row's items in one checkout with an approved refundable card payment. Record the receipt, transaction, item names, quantities, variant or seat labels, prices, taxes, and fees. Keep all purchased items unscanned, unfulfilled, untransferred, and not on resale; do not use discounts, credit, gift cards, payment plans, shipping, or protection.

* The employee checking the result has **Manage Transactions**. Before purchase, an authorized administrator saves **Admin → Venues → Venues → Automated return medium = Organizer Credit** and **Automated return refund type = Full refund excluding Showpass fees**. Record original values and the buyer's starting **Account → Credits → Organizer Credits** balance for this organization.
* Use a new order for each configuration; the actual return cannot simply be undone. Record the expected credit-record count: TwoTicketTypes and TicketAndProduct use two separately priced purchases and expect two credit records; For TwoAssignedSeats, before returning, open **Dashboard → Transactions → the original transaction** and record how many separately priced ticket rows contain the two seats; expect one credit record per recorded row. Their combined amount must match the preview.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction | Both paid purchases from PurchaseConfiguration are shown. |
| Open Return order. | Require the whole remaining order | Both purchases are included. |
| Try to deselect the item listed for the deselection check. | PurchaseConfiguration | Both stay included; a one-item return cannot be selected. |
| Read the preview. | Receipt; record displayed Organizer Credit total | Names and quantities cover both purchases and the total is positive. |
| Select Next. | Recorded preview total | Confirm Return shows the same credit total. |
| Choose a response under Why are you returning this order? | Any listed reason | Return Order becomes available. |
| Select Return Order once. |  | Return Successful shows the previewed total. |
| Select Done. |  | The dialog closes. |
| Reload the order in My Orders. | Both recorded purchases | Both are marked returned/refunded. |
| Inspect the returned purchases' available actions. |  | Neither can be selected for another customer return. |
| Open Account → Credits → Organizer Credits. | Starting balance and preview total | This organization's balance increased by exactly the previewed total with no additional credit. |
| As the employee, open Dashboard → Transactions and find the original transaction. | Recorded transaction and expected credit-record count | The linked credit records have the expected count and sum to the previewed total. |
| Open the transaction's item details. | Both recorded purchases | Both items show returned status with the correct quantities. |

**Postconditions:**

* Preserve the receipt, completed return, credit records, and starting/final balance as evidence. Do not delete the financial records or try to reverse the return.
* Restore changed organization policy, item switches, and automated return settings; save and reopen them.
* TwoAssignedSeats: in a fresh purchase session, open the event's public seating map and verify both recorded individual seats are available again. Leave without reserving or buying either seat.

## Risk Areas and Coverage Accounting

| Risk | Status | Evidence / next proof |
| --- | --- | --- |
| Clean return, preview/credit/ticket/transaction agreement | Manual-only | TC-1; preserve a real completed order. |
| Partial return and untouched companion item | Manual-only | TC-2; separate order from TC-1. |
| Whole-order completion and credit-record counts | Manual-only | TC-5 covers two ticket types, admission + separately priced product, and two individual seats. Package whole-order selection remains blocked in eligibility TC-11. |
| Stale rule and duplicate request | Manual-only plus API automation | TC-3–TC-4; check fresh order and credit state. |
| Provider failure and partial completion | Deferred | Needs controlled provider failure, final refund-history read, and recovery expectation. A client toast alone is insufficient. |
| Selected-venue rollout | Manual-only | Target `enable_venue_policy_customer_self_refunds` to the selected organization; compare an organization outside rollout. |
| Shipping/fee-specific totals and original-payment settlement | Separate execution needed | See [[SPW-19669-customer-refund-amount-rules-test-cases]]; these cases compare the basic preview to organizer credit only. |
| Individual seat availability | Manual-only | TC-1 AssignedSeat and TC-5 TwoAssignedSeats postconditions checks that its simple seat is available again. Full-table, membership, shared-seat, and package seating need separate preparation. |
| Barcode rejection and other inventory | Deferred | Returned status does not prove a rejected admission scan, General Admission stock, or physical-product restock. Separate executable checks are still required. |

## Minimum Execution Set

Run TC-1 first for TicketType, then once for each other PurchaseConfiguration using independent purchases; repeat TicketType in Mobile to retain the original mobile proof. Full view coverage repeats each supported configuration in both views. Then run TC-2 on a separate mixed order, TC-3 with two sessions, and TC-4 with its own completed return. Also run TC-5 once per PurchaseConfiguration on fresh orders. Compare starting and final customer credit and the same transaction in Dashboard each time.

## Suggested Automated Coverage

Test preview/execution amount parity, the expected credit-record count per selected purchase and no duplicate credit on retry, item status and retained companion ticket after partial return, the locked policy recheck, concurrent duplicate POSTs, and a provider failure after one of several refunders completes. Verify final state through a fresh invoice read, not a success toast alone.

## Assumptions and Unknowns

* Current source now has shipping/fee amount rules and the delayed-barcode opt-in. These cases use the basic amount path; run the separate cards for the new choices.
* The examples use organizer credit because its result is visible in the customer account. A return to the original payment method requires a separate controlled provider/settlement check if rollout uses that destination.
* Live payment, credit, ticket, inventory, and deployed-version behavior were not executed.

## Open Questions

1. Is Fan Expo's customer return destination Organizer Credit or original payment for acceptance?
2. Which provider and transaction surface will supply authoritative settlement proof?
3. Which additional seating, General Admission stock, and product-restock configurations are required beyond the simple individually sold seat in TC-1?
4. Which deployed build and prepared orders will be used for the now source-present shipping/fee and delayed-barcode scenarios?
