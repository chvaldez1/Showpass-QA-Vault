---
title: Customer Self-Refund Acceptance Test Cases
jira: SPW-19671
status: source-reviewed-not-executed
date: 2026-10-27
tags:
  - qa/test-cases
  - refunds
  - my-orders
---

# Customer Self-Refund Acceptance Test Cases

> [!important] Current-page review — 2026-10-27
> **Published and verified:** the cases listed below now match Qase after the approved 21 updates and 14 creates. Required gates, current controls, item setup, and expected results were reviewed in plain language. No purchases, refunds, or scans were executed. The table is the current publication map; older dated records below are history.

| Local draft | Current Qase case | Suite |
| --- | --- | --- |
| TC-1 | [SPT-5314](https://app.qase.io/case/SPT-5314) | 1108 |
| TC-2 | [SPT-5315](https://app.qase.io/case/SPT-5315) | 1108 |
| TC-3 | [SPT-5316](https://app.qase.io/case/SPT-5316) | 1108 |
| TC-4 | [SPT-5808](https://app.qase.io/case/SPT-5808) | 1108 |
| TC-5 | [SPT-5324](https://app.qase.io/case/SPT-5324) | 1108 |
| TC-6 | [SPT-5809](https://app.qase.io/case/SPT-5809) | 1108 |
| TC-7 | [SPT-5810](https://app.qase.io/case/SPT-5810) | 1108 |
| TC-8 | [SPT-5811](https://app.qase.io/case/SPT-5811) | 1108 |

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

**Whole-order review, 2026-10-06:** new local TC-5 proves completed whole-order returns for three explicit non-package configurations. Backend `customer_return_eligibility.py` requires all remaining items, `apps/tickets/models/order_management/order_basket.py` (`_build_invoice_items`) creates invoice-item snapshots per basket group, and `invoice.py` creates a refunder per selected invoice-item group. **Historical note:** the October 6 credit-record-count expectation is superseded by the October 27 source review. A current customer return may combine multiple item adjustments. Compare their combined amount and customer balance; do not require a separate credit record for every item. No live return was executed in this review.

## Source-backed Behavior

**Reviewed 2026-10-27 against current local develop in both repositories; see the Start Here review for exact revisions.**

* The organization rollout flag and Admin **Customer Self Refund Settings** gate access. With the Admin setting off, the employee sees the disabled notice and no editable form; saving is also rejected by the backend.
* The policy has one enable switch plus separate organization ticket and product switches. There is no Customer outcome dropdown. Individual item participation remains separate and saved values survive policy changes.
* New policies start off, with both organization item-type switches on. New individual ticket/product defaults follow whether the policy is on; changing the policy does not rewrite existing item settings.
* Five cutoff shapes remain supported. Absolute needs a date/time in the organization timezone; relative needs a positive whole number and Hours/Days. Switching shapes clears irrelevant details.
* Barcode, fulfillment/shipping, and check-in restrictions are on/off switches; on allows that state but does not bypass the other eligibility checks. The three mixed-order choices are unchanged.
* Refund amounts always shows Automated return medium (Revert Funds / Organizer Credit), Automated return refund type (three ordinary refund types), and Shipping refund rule (four choices), including while the policy is off. The old amount-enable switch and fee multiselect are retired.
* Policy and organization money settings save together. A refused or invalid save must not update only one part. Organization permissions, ownership, and rollout checks still apply.
* With nothing eligible, My Orders hides Return order. Current returns retain the purchased package parent; the previous blanket package-selection failure is not a current expected result. Unsupported Child-revenue packages remain blocked.
* The current amount calculation follows the saved refund type and refund medium plus the shipping rule. A previously reviewed amount cannot be submitted after destination/type/rule changes, even if its total stays equal. Old or incomplete shipping records can require organizer assistance rather than a guessed refund.

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
| TicketAndProduct | One General Admission ticket priced 10.00 and one checkout product variant priced 15.00 with inventory 10; both switches on; quantity 1 of each. | Both the ticket and product. | The admission ticket and one unit of the recorded product variant. | Nothing else was purchased. | One customer return with ticket and product adjustments; their combined amount equals the preview. |
| AssignedSeat | One paid ticket for an individually selectable seat in a future event with an existing map; refund switch on; no package, membership, full-table requirement, shared hold, or resale. | The ticket for the recorded section, row, and seat. | The one seat ticket. | Nothing else was purchased. | 1; its amount equals the preview. |
| TicketPackage | One 20.00 Preset package containing quantity 1 of each of two different General Admission ticket types. Listing and both included switches on; Send a single barcode on; Allow redemption on any included item off. | The package listing once; not either included ticket separately. | The package listing and both included tickets. | Nothing else was purchased. | 1; its amount equals the preview. |

**Tags:** my-orders, refunds, post-purchase

**Parameters:**
PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage

**Preconditions:**

* Before opening Return order, calculate the expected credit from the selected purchases’ original paid subtotal, item taxes, and customer-paid organizer fees with their taxes. Exclude customer-paid Showpass/processing fees; do not add a package’s included face prices to its already-paid package price. Record the separate original amounts first; missing component evidence blocks the amount check.
* The preparing employee has **Manage Organization Info**, **Manage Events**, and **Manage Transactions**; product configurations also require **Manage Marketplace** and an organization not on Basic pricing.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on; record their original values.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` rollout flag. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**, so this case does not depend on delayed release or customer activation.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its policy or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Cutoff type = No cutoff**, **Allow customer refunds after barcode delivery = on**, **Allow customer refunds after fulfillment or shipping = off**, **Allow customer refunds after check-in or scan = off**, **Orders with mixed eligibility = Refund eligible items independently** before purchase. Record the original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Automated return medium = Organizer Credit** and **Automated return refund type = Full refund excluding Showpass fees**. Record the original values and the customer's starting **Account → Credits → Organizer Credits** balance for this organization.
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
| Read the refund preview. | Receipt; record the selected subtotal, taxes, fees, and Organizer Credit amount | The preview equals the independent expected amount for the selected purchases, without adding an unselected item or double-counting included package tickets. |
| Select Next. | Recorded preview amount | Confirm Return shows the same Organizer Credit amount. |
| Choose a response under Why are you returning this order? | Any listed reason | Return Order becomes available. |
| Select Return Order once. |  | Return Successful shows the same credit amount. |
| Select Done. |  | The success dialog closes. |
| Reopen the order in My Orders. | What must be returned and What must remain paid in PurchaseConfiguration | Returned purchases are marked returned/refunded and any untouched companion ticket remains paid. |
| Inspect the returned purchase's available actions. | Recorded returned purchase | It cannot be selected for another customer return. |
| Open Account → Credits → Organizer Credits. | Starting balance and recorded preview amount | This organization's balance increased by exactly the previewed total, with no additional credit. |
| As the employee, open Dashboard → Transactions and find the original transaction. | Credit records expected in PurchaseConfiguration | One customer return is linked to the sale; its item adjustments and total match the selected purchases and preview. |
| Open the transaction's item details. | Item names and quantities from PurchaseConfiguration | The intended items show returned status, including both included tickets for TicketPackage; any untouched companion has no refund. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
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

* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* The employee checking the completed refund has **Manage Transactions** for the selected organization.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Allow customer refunds after barcode delivery = on**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
* An employee with **Manage Events** prepares two paid ticket types for the same future event. Save **Allow customer-initiated refunds = on** for one and **off** for the other. The customer buys one of each in a single refundable card order; keep both tickets unscanned, unfulfilled, and untransferred, and record the transaction and both ticket prices.
* In **Dashboard → Organization → Organization settings → Customer refunds**, the permitted employee sets **Automated return medium = Organizer Credit** and records the customer's initial Organizer Credits balance plus the original Venue values.

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

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Preserve the partially returned order as evidence. Restore policy, ticket, and Venue settings changed for this case.

### TC-3: My Orders - Refunds - Stop a return if the refund deadline changes before confirmation

**Description:** A customer opens **Return order** while a ticket can still be returned. Before they confirm, an employee closes customer refunds for the organization. The customer must see that the return is no longer allowed, and no refund or credit may be created.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* The employee checking Transactions has **Manage Transactions**. In **Dashboard → Organization → Organization settings → Customer refunds**, set **Automated return medium = Organizer Credit**; record its original value and the customer’s starting **Account → Credits → Organizer Credits** balance.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Allow customer refunds after barcode delivery = on**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
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

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy, ticket switch, and Automated return medium. Keep the order unrefunded.

### TC-4: My Orders - Refunds - Prevent a second return of an already refunded ticket

**Description:** A customer returns a paid ticket once, then opens the same order again. They must not be able to return that ticket a second time or receive more credit for it.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
* An employee with **Manage Events** enables **Allow customer-initiated refunds** on one future event ticket type. The customer buys one paid, unscanned ticket with a refundable card payment. In **Dashboard → Organization → Organization settings → Customer refunds**, the permitted employee sets **Automated return medium = Organizer Credit** and records previous settings.
* Record the customer's initial **Account → Credits → Organizer Credits** balance and the transaction ID. This case completes a real return of its own order.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders → the order → Return order. | Purchased order | The ticket is selectable and a credit amount greater than zero appears. |
| Select Next. | Record preview amount. | Confirm Return shows the same amount. |
| Choose a return reason. | Any listed reason | Return Order becomes available. |
| Select Return Order once. |  | Return Successful shows one completed return. |
| Select Done. |  | The success dialog closes. |
| Reload the same order. |  | The returned ticket cannot be selected again. |
| Inspect the fully returned order’s options again. |  | Return order is absent; the already-returned ticket cannot start another return. |
| Open Account → Credits → Organizer Credits. | Starting balance and preview amount | The balance increased only once by the previewed amount. |
| As an authorized employee, open Dashboard → Transactions for the order. | Transaction ID | One corresponding refund result exists. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
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
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on; record their original values.
* Enable `enable_venue_policy_customer_self_refunds` for this organization. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **No cutoff**, **Allow customer refunds after barcode delivery = on**, **Allow customer refunds after fulfillment or shipping = off**, **Allow customer refunds after check-in or scan = off**, **Orders with mixed eligibility = Require the whole remaining order** before purchase. Record original settings.
* For tickets, open **Dashboard → Build → Events → All events → Edit → Tickets** on a published, single-day event at least seven days in the future with public sales open. Add or select the ticket types in PurchaseConfiguration; save **Basic info → Allow customer-initiated refunds = on**. Record their names and prices; use ticket types without unrelated sales because another run may change their refund switches.
* For TicketAndProduct, open **Dashboard → Build → Products → All products**; create or select a product, save a variant priced 15.00 with inventory 10 under **Inventory**, and save **Fulfillment → Allow customer-initiated refunds = on**. Under **Availability → Checkout add-ons**, turn on **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select the event and admission under **Select tickets to include**, and save. Do not create a Sub-product relation or ticket package.
* For TwoAssignedSeats, reuse a public map that sells seats individually for the selected ticket type. Record the section, row, seat, and paid price for each of two different seats. Do not change a shared layout or use seats tied to another purchase or membership.
* As the customer who will open My Orders, buy exactly the selected row's items in one checkout with an approved refundable card payment. Record the receipt, transaction, item names, quantities, variant or seat labels, prices, taxes, and fees. Keep all purchased items unscanned, unfulfilled, untransferred, and not on resale; do not use discounts, credit, gift cards, payment plans, shipping, or protection.
* The employee checking the result has **Manage Transactions**. Before purchase, an employee with Manage Organization Info saves **Dashboard → Organization → Organization settings → Customer refunds → Automated return medium = Organizer Credit** and **Automated return refund type = Full refund excluding Showpass fees**. Record original values and the buyer's starting **Account → Credits → Organizer Credits** balance for this organization.
* Use a new order for each configuration; the actual return cannot simply be undone. Record the original charges for both purchases and calculate their combined refundable amount before opening Return order. For assigned seats, also record each seat label. One customer return may include several item adjustments; their combined value must match the expected amount without creating extra credit.

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
| As the employee, open Dashboard → Transactions and find the original transaction. | Recorded transaction and selected purchases and independently expected amount | One customer return contains the intended item adjustments, whose combined amount equals the previewed total. |
| Open the transaction's item details. | Both recorded purchases | Both items show returned status with the correct quantities. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Preserve the receipt, completed return, credit records, and starting/final balance as evidence. Do not delete the financial records or try to reverse the return.
* Restore changed organization policy, item switches, and automated return settings; save and reopen them.
* TwoAssignedSeats: in a fresh purchase session, open the event's public seating map and verify both recorded individual seats are available again. Leave without reserving or buying either seat.

### TC-6: My Orders - Refunds - Revert Funds returns only the selected ticket or product to the original card

**Description:** A customer buys one ticket and one separately priced product by card. Return only the ItemType purchase using Revert Funds and Base refund. The other purchase remains paid, and no new Organizer Credit is issued.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, payment

**Parameters:**
ItemType: Ticket, Product

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, **Manage Marketplace**, and **Manage Transactions**; product access is available. The employee checking payment can view the organization’s gateway refund record.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* On Customer refunds save Revert Funds and Base refund. Prepare a published future event with a 10.00 General Admission ticket, inventory 10, Allow customer-initiated refunds on, and Electronic Ticket delivery.
* Prepare a product with one Standard variant, price 15.00, inventory 10, Electronic delivery, and Allow customer-initiated refunds on. Under Availability → Checkout add-ons enable Add to event checkout process, Include for certain items, and select this event/ticket; Save. Do not create a package relationship.
* Buy one ticket and one product together through public checkout with a refundable card. Record the order, original payment reference, original selected item tax, both paid prices, fees, and opening Organizer Credit. Use customer-paid rather than absorbed fees; no shipping, discounts, gift cards, existing credit, plans, protection, or commissions are included. Keep both items unscanned, unfulfilled, untransferred, and off resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and this order’s Return order. |  | Both purchases can be selected. |
| Select only the ItemType purchase. | Ticket: 10.00 ticket. Product: 15.00 Standard variant. | Only that purchase contributes to the preview. |
| Compare the amount and destination. | Selected paid price plus its original item tax; customer-paid fees excluded | The amount is correct and the message says funds return to the card. |
| Select Next, then choose a listed return reason. |  | Confirmation retains the correct amount and original-payment destination. |
| Select Return Order once. |  | The selected return is accepted. |
| Select Done and reopen the order. |  | Only the selected purchase is returned; the other remains paid. |
| Inspect Account → Credits → Organizer Credits. | Opening balance | No new Organizer Credit was issued. |
| As the employee, open the related transaction and original gateway payment. | Recorded payment reference and expected amount | Exactly one completed refund for the selected purchase reaches the original card; a pending record does not count as completed. |
| Inspect the original order’s return options again. |  | The returned purchase cannot be selected again; the untouched purchase remains eligible. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

### TC-7: My Orders - Refunds - Require the whole remaining order after one ticket was already returned

**Description:** One ticket from a two-ticket order was already returned. After the organization requires the whole remaining order, only the still-paid ticket belongs in the next return; the previous ticket and its value must not return again.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* Prepare a published future single-day event with two General Admission ticket types priced 10.00 and 15.00, inventory 10 each. Save both individual refund switches on and Electronic Ticket delivery. Buy one of each by refundable card in one order; no discount, shipping, credit, gift card, plan, package, or protection is included.
* While Refund eligible items independently is saved, return only the 10.00 ticket through Account → My Orders → Return order → select the ticket → Next → choose a return reason → Return Order → Done. Confirm it is returned and the 15.00 ticket is still paid; record the first returned amount and the current Organizer Credit.
* Save Orders with mixed eligibility = Require the whole remaining order. Record the remaining ticket’s original item tax and expected Base refund of 15.00 plus that tax. Do not reuse a wholly returned order.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, reopen the order in My Orders and open Return order. |  | Only the still-paid 15.00 ticket is required. |
| Inspect the selection and preview. | 15.00 plus this ticket’s original item tax | The previous ticket and its already-returned value are excluded. |
| Select Next. |  | Confirmation matches the remaining ticket’s amount and Organizer Credit destination. |
| Choose a listed return reason. |  | Return Order becomes available. |
| Select Return Order once. |  | The remaining ticket is returned. |
| Select Done and reopen the order. |  | Both tickets are returned; neither can be returned again. |
| Inspect Organizer Credits and the order’s related return records in Transactions. | Opening balance after the first return; second expected amount | Only the second expected amount is newly credited; combined returns contain each purchased ticket once. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

### TC-8: Dashboard - Refunds - Reject a returned ticket at check-in and admit an untouched ticket

**Description:** One of two purchased tickets is returned by the customer. The returned barcode must be refused because it was refunded, while the untouched ticket can still admit its attendee. A closed scan window or missing employee permission is not a valid pass.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds, check-in

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**. The door employee has **Scan Tickets** for this event and can use its normal Check in scanning workflow.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* Use Admin → Venue → Barcode delivery = Default. Create a published single-day event starting two hours from now and ending at least five hours from now, with public sales open. Add two General Admission ticket types, 10.00 and 15.00, inventory 10 each, customer refunds on, Electronic Ticket delivery, and no unlimited/multiple scanning.
* On each ticket’s Basic info → Ticket timing, save Custom scan start time one hour before now and Custom scan end time equal to the event end. Record the event timezone; finish the case within that saved scan window.
* As one customer, buy one ticket of each type in one refundable card order. Record both barcodes and the transaction; keep both unscanned, unfulfilled, untransferred, and off resale. Do not use a package, seat, discount, shipping, credit, gift card, plan, or protection.
* Before starting, return only the 10.00 ticket through My Orders → Return order → select that ticket → Next → choose a reason → Return Order → Done. Confirm it is returned and the 15.00 ticket is still paid. Record the returned amount and credit; do not scan either ticket during setup.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the door employee, open this event’s Check in. | Recorded event and scan window | The employee can scan for the correct event. |
| Scan the barcode of the returned 10.00 ticket. | Recorded refunded barcode | Admission is refused with refunded-ticket feedback, such as has been refunded; no admission is recorded. |
| Scan the untouched 15.00 ticket. | Recorded paid barcode | Admission succeeds once and this ticket is checked in. |
| As the employee, reopen the original transaction’s item details. |  | The first ticket remains returned and the second is checked in; no extra refund or credit was created. |

**Postconditions:**

* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.
* Keep the refund and successful control admission as evidence. Do not undo financial history or scan a real attendee’s ticket for this case.

## Risk Areas and Coverage Accounting

| Risk | Status | Evidence / next proof |
| --- | --- | --- |
| Clean return, preview/credit/ticket/transaction agreement | Manual-only | TC-1; preserve a real completed order. |
| Partial return and untouched companion item | Manual-only | TC-2; separate order from TC-1. |
| Whole-order completion | Published, not run | TC-5 covers two ticket types, admission + separately priced product, and two individual seats. Compare total item adjustments; the historical package-negative TC-11 is withheld. |
| Stale rule and duplicate request | Manual-only plus API automation | TC-3–TC-4; check fresh order and credit state. |
| Provider failure and partial completion | Deferred | Needs controlled provider failure, final refund-history read, and recovery expectation. A client toast alone is insufficient. |
| Selected-venue rollout | Manual-only | Target `enable_venue_policy_customer_self_refunds` to the selected organization; compare an organization outside rollout. |
| Shipping/fee-specific totals and original-payment settlement | Separate execution needed | See [[SPW-19669-customer-refund-amount-rules-test-cases]]; these cases compare the basic preview to organizer credit only. |
| Individual seat availability | Manual-only | TC-1 AssignedSeat and TC-5 TwoAssignedSeats postconditions checks that its simple seat is available again. Full-table, membership, shared-seat, and package seating need separate preparation. |
| Barcode rejection and other inventory | Published, not run / partly deferred | TC-8 checks refund-specific admission refusal plus a paid control. General Admission stock and physical-product restock still need separate setup and execution. |

## Minimum Execution Set

Run TC-1 first for TicketType, then once for each other PurchaseConfiguration using independent purchases; repeat TicketType in Mobile to retain the original mobile proof. Full view coverage repeats each supported configuration in both views. Then run TC-2 on a separate mixed order, TC-3 with two sessions, and TC-4 with its own completed return. Also run TC-5 once per PurchaseConfiguration on fresh orders. Compare starting and final customer credit and the same transaction in Dashboard each time.

## Suggested Automated Coverage

Test preview/execution amount parity, the selected purchases and independently expected amount per selected purchase and no duplicate credit on retry, item status and retained companion ticket after partial return, the locked policy recheck, concurrent duplicate POSTs, and a provider failure after one of several refunders completes. Verify final state through a fresh invoice read, not a success toast alone.

## Assumptions and Unknowns

* Current source now has shipping/fee amount rules and the delayed-barcode opt-in. These cases use the basic amount path; run the separate cards for the new choices.
* The examples use organizer credit because its result is visible in the customer account. A return to the original payment method requires a separate controlled provider/settlement check if rollout uses that destination.
* Live payment, credit, ticket, inventory, and deployed-version behavior were not executed.

## Open Questions

1. Is Fan Expo's customer return destination Organizer Credit or original payment for acceptance?
2. Which provider and transaction surface will supply authoritative settlement proof?
3. Which additional seating, General Admission stock, and product-restock configurations are required beyond the simple individually sold seat in TC-1?
4. Which deployed build and prepared orders will be used for the now source-present shipping/fee and delayed-barcode scenarios?
