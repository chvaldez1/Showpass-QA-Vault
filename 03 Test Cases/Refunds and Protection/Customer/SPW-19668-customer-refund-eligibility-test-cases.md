---
title: Customer Refund Eligibility Test Cases
jira: SPW-19668
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/test-cases
  - refunds
  - my-orders
---

# Customer Refund Eligibility Test Cases

> [!important] Scope
> This card tests whether the venue policy and each purchased item's switch control customer return eligibility. Organization and item form editing is covered in [[SPW-19667-customer-refund-policy-test-cases]]. Completed refund accounting and recovery are in [[SPW-19671-customer-self-refund-acceptance-test-cases]]. The cases are unexecuted; the publication section below identifies the published base cases.

## Qase publication

Published and verified **2026-10-05** after user approval in [Customer (1108)](https://app.qase.io/project/SPT?suite=1108). Saved fields, parameters, tags, steps, and suite placement matched the local cases. Publication does not mean execution.

| Local draft | Qase case |
| --- | --- |
| TC-1 | [SPT-5309](https://app.qase.io/case/SPT-5309) |
| TC-2 | [SPT-5310](https://app.qase.io/case/SPT-5310) |
| TC-3 | [SPT-5311](https://app.qase.io/case/SPT-5311) |
| TC-5 | [SPT-5312](https://app.qase.io/case/SPT-5312) |
| TC-8 | [SPT-5313](https://app.qase.io/case/SPT-5313) |

Additional cases published and saved fields verified **2026-10-06** after approval:

| Local draft | Qase case | Check |
| --- | --- | --- |
| TC-4 | [SPT-5321](https://app.qase.io/case/SPT-5321) | Require the whole remaining order — preview includes all purchases. |
| TC-10 | [SPT-5322](https://app.qase.io/case/SPT-5322) | Require the whole remaining order — a blocked item prevents the return until enabled. |
| TC-11 | [SPT-5323](https://app.qase.io/case/SPT-5323) | Require the whole remaining order — package purchases stay paid when selection is unavailable. |
| TC-6 | [SPT-5325](https://app.qase.io/case/SPT-5325) | After barcode delivery — Block and Allow. |
| TC-12 | [SPT-5326](https://app.qase.io/case/SPT-5326) | After fulfillment or shipping — Block and Allow for a fulfilled product. |
| TC-13 | [SPT-5327](https://app.qase.io/case/SPT-5327) | After check-in or scan — Block and Allow for a checked-in ticket. |

Only TC-7 and TC-9 remain local; see [[SPW-19666-customer-self-refunds-test-cases|the publication map]] for their status. All manual cases remain unexecuted.

**Item-configuration review, 2026-10-06:** TC-1's detailed purchase configurations and setup were applied to SPT-5309 and verified. Existing platform/view coverage and the original scenario are preserved. The manual case has not been executed.

**Title review, 2026-10-06:** SPT-5312 uses the exact **Block when any remaining item is ineligible** option in its saved Qase title. Barcode, fulfillment/shipping, and check-in/scan are separate published cases SPT-5325, SPT-5326, and SPT-5327. Whole-order titles also contain the exact **Require the whole remaining order** choice.

## Testing Intent

We are testing whether My Orders offers only the customer-return selections allowed by the current organization policy and item state, because an incorrect selection can refund the wrong item or bypass a cutoff; the proof is the visible selection, reason, and fresh preview while blocked orders remain unchanged.

## Jira Intake Summary

[SPW-19668](https://showpass.atlassian.net/browse/SPW-19668) asks for venue-policy and item-flag eligibility in My Orders, mixed-order choices, blocked reasons, ownership/payment checks, API enforcement, and non-Fan Expo legacy compatibility. Its request/approval wording is not implemented by the current two-outcome policy.

## Proof Targets

| Target | Cases |
| --- | --- |
| Item and policy choices gate the purchased item | TC-1, TC-2 |
| Cutoff and restriction states change eligibility | TC-3; barcode TC-6, shipping fulfillment TC-12, check-in TC-13 |
| Mixed-order choice determines selection | TC-4, TC-5, TC-10, TC-11 |
| Legacy behavior and ownership remain isolated | TC-7, TC-8 |

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/financials/services/invoice/customer_return_eligibility.py`, `user_invoice_return.py`; `apps/financials/api/user_based/viewsets/invoices.py`, `serializers/returns.py`; `apps/venues/models/venue_management/customer_refund_policy.py`, `venue.py`; `apps/venues/constants/customer_refunds.py`; `apps/venues/admin/financial_configuration.py`, `venue_admin.py`; `apps/financials/tests/test_customer_return_eligibility.py`, `apps/financials/tests/api/user_based/invoices/test_api_user_based_invoice_returns.py`.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/user/features/account/features/my-orders/utils/order-actions/return-order.ts`, `order-action-availability.ts`; `hooks/useMyOrdersDetailPageState.ts`, `useReturnOrderPreview.ts`; `ui/components/OrderOptionsList.web.tsx`; `ui/modals/return-order/MyOrdersReturnOrder.web.tsx`, `MyOrdersReturnOrderModalSelection.web.tsx`; product `ProductAvailabilitySection.web.tsx`, `ProductVisibilityCheckoutAddOns.web.tsx`; ticket type `basic-info/form-sections.ts`.

**Automation patterns:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/account/account-navigation.config.ts`. Source tests/patterns were read, not executed. No branch comparison or changed-file discovery was performed.


**Additional configuration sources reviewed 2026-10-06:** backend `apps/tickets/models/packages_management/sub_ticket_option.py`, `ticket_package.py`; `apps/tickets/admin/packages.py`; `apps/tickets/services/fulfillment/ticket_generator_service.py`; frontend `packages/core/src/app-contexts/dashboard/features/packages/ui/components/form/`, `features/products/ui/components/form/`; My Orders `utils/invoice-ticket-utils.ts` and `utils/order-actions/return-order.ts`. These distinguish ticket packages, ticket + product packages, and separate checkout add-ons.

**Whole-order review, 2026-10-06:** backend `customer_return_eligibility.py` admits only selections covering all non-returned/non-voided items, including descendants; one blocked remaining item blocks the whole order. Frontend My Orders `ReturnOrderItemSelection.web.tsx` disables individual selection. `utils/order-actions/return-order.ts` rejects whole-order selection when visible items omit entries from backend eligibility. That currently blocks the package configurations in TC-11, even with all switches on. This is current-source behavior, not live execution or confirmed product acceptance. Already-returned-item whole-order behavior still needs a dedicated prepared-order case.

**Restriction-title review, 2026-10-06:** the former local TC-6 parameter rows are now three standalone cases with the exact policy-field names in their titles: TC-6, TC-12, TC-13. This preserves barcode, fulfillment, and checked-in proof while making each setting searchable. Backend `apps/tickets/services/shipping_fulfillment/fulfillment_service.py` rejects fulfilled updates to non-shipping items; therefore TC-12 explicitly purchases Standard Shipping and records Fulfilled through Update → Confirm. The action in `apps/tickets/api/venue_based/viewsets/ticket_items.py` requires Scan Tickets. Product delivery controls and Transactions fulfillment modals confirm the setup. Scan timing labels come from frontend `features/events/ticket-types/basic-info/form-sections.ts`; admission is recorded before testing the policy.

## Source-backed Behavior

**Fresh-source check, 2026-10-06 — SPT-5310 setup correction:** the organizer form now shows **Allow customer refunds for tickets** and **Allow customer refunds for products** instead of **Customer outcome**. Frontend `features/organization/settings/customer-refunds/constants/customer-refund-policy-form-fields.ts`, `utils/customer-refund-policy-utils.ts`, and `data/services/useVenueBasedCustomerRefundPolicyService.ts` send `tickets_enabled` and `products_enabled` directly to the customer-refund-policy API; they do not translate them into `outcome`. The current local backend model and `apps/venues/api/venue_based/serializers/refunds.py` have neither field, and `customer_return_eligibility.py` still blocks through `outcome`. This is a confirmed source mismatch, not an executed save failure or a reproduced live defect. The new switches' saved customer-refund behavior is blocked for source verification until the matching backend is available. Frontend creation defaults use policy enablement; that does not establish backend enforcement of the two new switches.

TC-2 retains its organization-wide blocking purpose and now names the supported **Admin → Venues → Venue customer refund policies → Outcome** setup. Its Qase copy **SPT-5310 has not been updated in this check**. Other earlier case instructions mentioning Customer outcome also refer to the older form; do not treat the new ticket/product switches as equivalent to that field without the matching backend evidence.

* An enabled venue policy uses its automatic/blocked outcome and the ticket/product switch. A disabled or absent policy uses the legacy `enable_automated_returns` path. No request/approval outcome exists in the current policy.
* When no visible item can be returned, My Orders shows a blocked-return message rather than a usable selection screen. If another item is returnable, a blocked companion may appear but cannot be selected. Do not expect every blocked order to show an item list.
* Absolute and relative cutoffs block at or after the cutoff instant; item/session timing uses a ticket-type custom start when present, otherwise the event start. Manually closed blocks.
* Mixed-order rules provide independent selection, require the whole remaining order, or block when any remaining item is ineligible. Already refunded items do not count as remaining. The backend also checks owner, paid/payment status, barcode activation, fulfillment, and scan status.
* The preview and return endpoints re-evaluate the same selection. A direct request cannot safely substitute a foreign, duplicate, or omitted selection; those API-only permutations belong in automated coverage.
* Package eligibility checks the package ticket and every included item. Included items cannot be selected independently. The single-barcode ticket-package setup in TC-1 keeps the package ticket visible under independent-item selection; whole-order mode has the additional visibility restriction in TC-11. A ticket + product package uses a separate Sub-product relation; without a single-barcode TicketPackage record, its package ticket is filtered out of the current My Orders selection (TC-9).
* Current source adds configurable amount rules that support ticket returns only. TC-1's Product and TC-6's FulfilledProduct runs keep amount rules off so they measure item eligibility; amount-rule product blocking is recorded under SPW-19669.

## State-space / Setup Matrix

| Axis | States | Cases |
| --- | --- | --- |
| Policy and item | General admission, product add-on, standalone product, individual seat, single-barcode ticket package; automatic/blocked outcome | TC-1, TC-2 |
| Ticket + product package | Ticket linked to an included product through Admin; separate barcode mode | TC-9; current-source blocked selection, not successful return coverage |
| Cutoff | Absolute, event-relative, item-relative, manually closed | TC-3 |
| Mixed order | Whole-order selection for two ticket types, ticket + separate product, and two individual seats; one blocked item; package selection boundary | TC-4, TC-10, TC-11; completed whole-order return in completion TC-5. Block-if-any uses TC-5. |
| Restriction | After barcode delivery; After fulfillment or shipping; After check-in or scan | TC-6, TC-12, TC-13; one searchable title per setting |
| Legacy and owner | Disabled new policy; a different customer | TC-7, TC-8 |

## Recommended Test Data

* Use a published future event, a paid card order owned by the customer, and ticket types whose **Basic info → Allow customer-initiated refunds** switch can be changed. Use new orders for any state that cannot be safely reset. Record the order transaction ID from My Orders.
* In Admin → Venue customer refund policy, find the organization's record or Add → select Venue → Save. An employee with **Manage Organization Info** sets the required policy values in Dashboard → Organization → Organization settings → Customer refunds. The separate policy record is not on Admin → Venue.
* For Product, an employee with **Manage Marketplace** on a non-Basic organization creates/selects a priced product, enables **Availability → Checkout add-ons → Add to event checkout process** for the event, and edits **Fulfillment → Allow customer-initiated refunds**. Purchase it with a ticket on the event's public checkout.
* Record original settings before changing them. No case here submits a customer refund; preserve orders and restore settings after the run.

## Qase-ready Manual Test Cases

In these cases, an item is **returnable** when the customer is allowed to select it in **Return order**. The organization-wide Customer refunds page and each ticket type or product's **Allow customer-initiated refunds** choice both affect that result. A **cutoff** is the last time a customer may request a refund.

### TC-1: My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it

**Description:** A customer buys the items listed for ItemType while the selected item's **Allow customer-initiated refunds** switch is off. An employee turns that switch on, and the customer reopens the same order to check that the correct purchase becomes selectable. This case reads the return preview and cancels; it does not complete a refund. A ticket package is one purchase containing included tickets; the package listing is selected for return, not an included ticket on its own.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| ItemType | Configure before purchase | Buy and identify | Switch changed during this case | Expected return selection after saving |
| --- | --- | --- | --- | --- |
| TicketType | A public General Admission ticket, price 10.00, inventory 10; no package, assigned seat, discount, or payment plan. Refund switch off. | Buy quantity 1 and record event and ticket type. | Purchased ticket type → Basic info. | Exactly that ticket; quantity 1. |
| Product | A General Admission ticket, price 10.00, plus one product variant, price 15.00, inventory 10. Both refund switches off. Offer the product as a checkout add-on for this event. | Buy quantity 1 of the ticket and quantity 1 of the product in the same checkout; record product and variant names. | Purchased product → Fulfillment. | Exactly the product variant; the accompanying ticket stays blocked. |
| StandaloneProduct | One product variant, price 15.00, inventory 10; refund switch off; Visible on Your Venue Page on. | On the organization's public page, buy quantity 1 of that product without a ticket. | Purchased product → Fulfillment. | Exactly the product variant; there is no admission ticket in the order. |
| AssignedSeat | A public, paid ticket for one individually selectable seat in a future event with an existing seating map. Refund switch off; no package, full-table requirement, membership, shared hold, or resale. | Buy one available seat and record event, ticket type, section, row, seat, and paid price. | Purchased ticket type → Basic info. | The one ticket for the recorded seat; it remains owned by the customer because the return is cancelled. |
| TicketPackage | A Preset package priced 20.00 containing quantity 1 of each of two different General Admission ticket types. Included ticket switches on; package listing ticket switch off. Send a single barcode on; Allow redemption on any included item off. | Buy quantity 1 of the package and record its listing plus both included ticket types. | Package listing ticket type → Basic info. | The package listing is selectable as one purchase; included tickets cannot be returned independently. |

**Tags:** my-orders, refunds

**Parameters:**
ItemType: TicketType, Product, StandaloneProduct, AssignedSeat, TicketPackage

**Preconditions:**

* The preparing employee has **Manage Organization Info** and **Manage Events**; Product and StandaloneProduct also require **Manage Marketplace** and an organization not on Basic pricing.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` rollout flag. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**, so this case does not depend on delayed release or customer activation.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its policy or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, **After barcode delivery = Allow customer refunds**, **After fulfillment or shipping = Block customer refunds**, **After check-in or scan = Block customer refunds**, **Orders with mixed eligibility = Refund eligible items independently**, and **Enable configurable refund amounts = off** before purchase. Record the original settings.
* For tickets, open **Dashboard → Build → Events → All events → Edit → Tickets** on a published, single-day event at least seven days in the future with public sales open. Add or select the ticket types in ItemType; edit **Basic info → Allow customer-initiated refunds** and save the starting values. Record event and item names; use items without unrelated sales because their refund switches will change.
* For products, open **Dashboard → Build → Products → All products**; create or select a product and use **Inventory** to save the variant's name, price, and inventory from ItemType. In **Fulfillment**, save **Allow customer-initiated refunds = off**. Product: in **Availability → Checkout add-ons**, turn on **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select this event and accompanying ticket under **Select tickets to include**, and save. StandaloneProduct: in **Availability → Sales channels**, turn on **Visible on Your Venue Page** and save.
* For AssignedSeat, reuse an event whose public seating map offers an individual seat for the selected ticket type; choose and record the seat before payment. Do not change a shared seating layout to prepare this case.
* For TicketPackage, use an organization already set to **Admin → Venues → Venues → Package revenue realization type = Parent**. Create three public ticket types with inventory 10: the 20.00 package listing and two included types priced 10.00 and 12.00. In **Dashboard → Promote → Packages → Create package**, choose **Package type = Preset**, this **Event**, and the listing **Ticket type**; under **Included tickets**, use **Add ticket** for each included type with **Qty = 1**. Save the barcode choices in ItemType, then reopen the event's Tickets page to save the listing switch off and both included switches on. All tickets use the same future event; no nested package or product is included.
* As the customer who will use My Orders, complete the purchase listed for ItemType with an approved refundable card payment. Record the receipt, transaction, item quantities, prices, taxes, fees, variant or seat labels, and original switches. Keep every purchased item unscanned, unfulfilled, untransferred, and not offered for resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the purchasing customer, open Account → My Orders. | Recorded transaction | The order contains the names and quantities listed for ItemType. |
| Read the order details. | ItemType; product variant, seat, or package listing recorded at purchase | The order contains the correct purchase, not another ticket, variant, or seat. |
| Open that order's Return order action. | The item whose switch is off | A blocked-return message is shown and no usable return selection or positive amount is offered. |
| As the employee, open the purchased ticket type's Basic info or product's Fulfillment page listed for ItemType. | Recorded item name | Allow customer-initiated refunds is off for the intended item. |
| Turn on Allow customer-initiated refunds. |  | The item switch is on. |
| Select Save. |  | The item change is saved. |
| Reopen the same item settings. |  | Allow customer-initiated refunds remains on. |
| As the customer, reload the same order. | Recorded transaction | The original paid purchase is still shown with its recorded quantity. |
| Open Return order again. | Expected return selection in ItemType | The intended purchase is selectable and any accompanying blocked ticket remains unselectable. |
| Select the newly returnable purchase. | Quantity 1 of the ticket, variant, seat ticket, or package listing | The preview shows a positive amount for the selected purchase without including a blocked companion item. |
| Read the selected purchase's description and quantity. | Original receipt and ItemType | The selection matches the recorded ticket, product variant, seat ticket, or single package purchase. |
| Select Cancel. |  | The dialog closes without submitting a return. |
| Reopen the order in My Orders. | Recorded transaction | All purchased items remain paid and none is marked returned. |

**Postconditions:**

* Restore the changed item switches and organization policy values, save, and reopen them. Keep the order paid and unrefunded.
* AssignedSeat: the customer still owns the recorded seat; cancelling the return must not release it.
* TicketPackage: the package and both included tickets remain paid; neither included ticket was returned separately.

### TC-2: My Orders - Refunds - Block a customer return when the organization outcome is blocked

**Description:** A paid ticket has **Allow customer-initiated refunds** on, but the organization has chosen **Customers cannot initiate refunds**. The customer must not be able to select the ticket or see a refund amount.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* An administrator can add or change Venue customer refund policies. In **Showpass Admin → Venues → Venue customer refund policies**, search by organization name; open its policy, or select **Add → Venue → select the organization**. Record the original values, check **Is enabled**, set **Outcome = Customers cannot initiate refunds**, and select **Save**. Reopen the record to confirm both values. This setting is on the policy record, not the Venue edit page.
* An employee with **Manage Events** identifies a published future event with public ticket sales open and a ticket type whose saved **Allow customer-initiated refunds** switch is already on. The customer buys one paid, unscanned ticket with a refundable card payment and records the transaction.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the buyer and open Account → My Orders. | Purchased order | The paid ticket appears. |
| Open the order's Return order action. |  | The dialog explains the order cannot be automatically refunded and provides no usable return selection or amount. |
| Close the dialog. |  | No return is submitted. |
| Reopen the order. |  | The ticket remains paid and is not marked returned; no refund or credit has been created. |

**Postconditions:**

* Restore the original organization policy and item switch; leave the order unrefunded.

### TC-3: My Orders - Refunds - Stop a return after the saved deadline

**Description:** A paid ticket can normally be returned. Set each deadline below so it has already passed; the customer must not be able to select the ticket. Change the organization back to **No cutoff** and confirm the same ticket becomes selectable.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| CutoffScenario | Event and policy preparation |
| --- | --- |
| Absolute | Event starts in 10 days; choose Absolute date and time and set Cutoff date and time to yesterday in the organization's displayed timezone. |
| EventStart | Event starts in 10 days; choose Before event start, Time before cutoff reference = 11, Unit = Days. |
| ItemStart | Event starts in 10 days; on the ticket type's Basic info set Ticket timing → Custom ticket event start time to two days from now, then choose Before item or session start, value = 3, Unit = Days. |
| ManuallyClosed | Event starts in 10 days; choose Manually closed. |

**Tags:** my-orders, refunds, edge-case

**Parameters:**
CutoffScenario: Absolute, EventStart, ItemStart, ManuallyClosed

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **After barcode delivery = Allow customer refunds**, and **Cutoff type = No cutoff**; record its original settings. After the purchase below, save the deadline from the selected row before starting the customer check.
* An employee with **Manage Events** prepares the future event and ticket timing from the row, turns **Allow customer-initiated refunds = on** in ticket Basic info, and saves. The customer buys one paid ticket with a refundable card payment before the cutoff is applied; record the order.
* Use an unscanned, untransferred ticket and leave it unfulfilled and save **After barcode delivery = Allow customer refunds** so barcode delivery does not independently block it.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the customer, open Account → My Orders and select Return order for the prepared order. | Chosen deadline row | The ticket cannot be selected and the dialog says the refund deadline has passed. |
| As the employee, open Organization → Organization settings → Customer refunds. |  | The selected cutoff and its saved date or duration are shown. |
| Select Cutoff type = No cutoff. |  | No cutoff is selected. |
| Select Save. |  | Customer refund policy saved appears. |
| As the customer, reload the same order and select Return order. |  | The ticket is selectable and a refund amount greater than zero appears. |
| Select Cancel. |  | No return is submitted. |

**Postconditions:**

* Restore the original policy and ticket timing, save and reopen them. Leave the paid order unrefunded.

### TC-4: My Orders - Refunds - Require the whole remaining order - Include every remaining purchase in the preview

**Description:** A customer buys the two items in PurchaseConfiguration, and both have **Allow customer-initiated refunds** on. With **Require the whole remaining order**, both must be included in the preview, and the customer cannot deselect either item. This check cancels before submitting. “Remaining” means items that have not already been returned or voided; this case starts with two paid items.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| PurchaseConfiguration | Configure and buy in one order | Items required in the return | Item used for the deselection check |
| --- | --- | --- | --- |
| TwoTicketTypes | Same future event: one public General Admission ticket type priced 10.00 and another priced 15.00, inventory 10 each. Both refund switches on. Buy quantity 1 of each. | Both admission tickets; quantity 1 each. | The 15.00 ticket. |
| TicketAndProduct | One public General Admission ticket priced 10.00 plus one separately priced product variant priced 15.00, inventory 10 each. Both refund switches on. Buy quantity 1 of each in the event checkout. No package relationship. | The admission ticket and the recorded product variant; quantity 1 each. | The product. |
| TwoAssignedSeats | One public ticket type offered on an existing map in a future event; inventory allows at least two individual seats. Refund switch on. Buy two different available seats of that type in one checkout; record each seat and paid price. No full-table requirement, package, membership, shared hold, or resale. | Both recorded seat tickets; quantity 1 each. | The second recorded seat. |

**Tags:** my-orders, refunds

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

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction | The paid order contains both purchases from PurchaseConfiguration. |
| Open the order details. | Recorded item names, variant, or seats | The names and quantities match the receipt. |
| Open Return order. | Items required in the return | Both purchases are included in the return selection. |
| Try to deselect the item listed for the deselection check. | PurchaseConfiguration | Individual selection is unavailable; both purchases remain included. |
| Read the preview. | Receipt; both item quantities and paid prices | The preview covers both purchases and shows a positive amount; it does not quote a one-item return. |
| Select Cancel. |  | The dialog closes without submitting a return. |
| Reopen the order. | Recorded transaction | Both purchases remain paid and neither is marked returned. |

**Postconditions:**

* Restore changed policy and item-switch values, save, and reopen them. Preserve the unrefunded order.
* TwoAssignedSeats: the buyer retains both recorded seats; neither seat is released by cancelling the return.

### TC-5: My Orders - Refunds - Block when any remaining item is ineligible - Block the entire order

**Description:** A customer bought two tickets in one order. One ticket has **Allow customer-initiated refunds** off. When the organization chooses **Block when any remaining item is ineligible**, the customer cannot return either ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **After barcode delivery = Allow customer refunds**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Block when any remaining item is ineligible**; record prior settings.
* An employee with **Manage Events** turns on **Allow customer-initiated refunds** for one ticket type and off for another. The customer buys one paid ticket of each type in one refundable card order; keep both tickets unscanned, unfulfilled, and untransferred, and record the transaction.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and select Return order for the mixed order. | Purchased order | The dialog explains that an ineligible item blocks the order; neither ticket can be submitted for return. |
| Close the dialog. |  | No return is submitted. |
| Reopen the order. |  | Both tickets remain paid and neither is marked returned; no refund or credit exists. |

**Postconditions:**

* Restore policy and ticket switches; leave the order unrefunded.

### TC-6: My Orders - Refunds - After barcode delivery - Block or allow customer refunds

**Description:** A customer has one paid ticket whose standard barcode is already available in My Orders. After barcode delivery must block selection when set to Block customer refunds and allow a positive preview after it is saved as Allow customer refunds. Cancel without returning the ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The preparing employee has **Manage Organization Info** and **Manage Events**.
* Enable `enable_venue_policy_customer_self_refunds` for the selected organization. Use **Admin → Venues → Venues → Barcode delivery = Default**; do not use customer activation or delayed barcode delivery.
* In **Admin → Venues → Venue customer refund policies**, find the organization or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **Customers can self-refund automatically**, **No cutoff**, **Refund eligible items independently**, and **Enable configurable refund amounts = off** before purchase. Set the restriction being checked to **Block customer refunds** and the other two restrictions to **Allow customer refunds**. Record the original policy and item switches.
* Set **After barcode delivery = Block customer refunds**. Set **After fulfillment or shipping** and **After check-in or scan** to **Allow customer refunds**.
* In **Dashboard → Build → Events → All events → Edit → Tickets**, use a published, single-day event at least seven days in the future with public sales open. Create or select one public General Admission ticket priced 10.00, inventory 10, without a package or assigned seat; save **Basic info → Allow customer-initiated refunds = on**. Use electronic delivery, with no shipping, discount, credit, gift card, or payment plan.
* As the buyer, buy quantity 1 with an approved refundable card payment. Open **Account → My Orders → the order's tickets** and confirm its barcode is available; record the transaction, ticket name, and displayed barcode. Keep it unscanned, unfulfilled, untransferred, and not on resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction and ticket | The original paid purchase is present. |
| Open Return order. | After barcode delivery = Block customer refunds | A blocked-return message is shown; no usable return selection or positive amount is offered for the ticket. |
| Close the dialog. |  | No return is submitted. |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. | Selected organization | After barcode delivery shows Block customer refunds. |
| Change After barcode delivery to Allow customer refunds. |  | The new choice is shown. |
| Select Save. |  | Customer refund policy saved appears. |
| Reopen Customer refunds. |  | After barcode delivery still shows Allow customer refunds. |
| As the buyer, reload the same order in My Orders. | Recorded transaction | The original purchase is still shown. |
| Open Return order. | ticket | The ticket is selectable. |
| Select the ticket. | Quantity 1 | A positive preview applies only to the selected purchase. |
| Select Cancel. |  | No return is submitted. |
| Reopen the order. | Recorded transaction | Nothing is marked returned; the purchase retains its delivered-barcode, unscanned state. |

**Postconditions:**

* Restore the original policy and item switches, save, and reopen them. Keep the order unrefunded.
* Preserve the original delivered-barcode, unscanned evidence; do not erase operational history to reset the case.

### TC-7: My Orders - Refunds - Keep existing customer returns working outside the new rollout

**Description:** An organization already allows customer returns through its older **Enable automated returns** Venue setting. When that organization is outside the new customer-policy rollout, the buyer still sees the return option for a qualifying ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* In Showpass Admin → Feature Flags, confirm the organization is outside `enable_venue_policy_customer_self_refunds`; record its original targeting. No Customer refunds page or policy record is needed for this legacy path.
* In Showpass Admin → Venue, an authorized administrator sets **Enable automated returns = on**, **Automated return window = 0**, and **Automated return medium = Organizer Credit**; record the original values. These older Venue settings are separate from the new Customer refunds page.
* An employee with **Manage Events** prepares a paid ticket type with delayed barcode delivery whose barcode has not yet been released, leaves **Allow customer-initiated refunds = off**, and sells one ticket to the customer with a refundable card payment.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the buyer and open Account → My Orders. | Purchased order | The paid order appears. |
| Open Return order. |  | The ticket can be selected through the older automated-return settings even though the organization is outside the new rollout and the ticket switch is off. |
| Review the refund preview. |  | A refund amount greater than zero is shown. |
| Select Cancel. |  | No refund is submitted. |

**Postconditions:**

* Restore the original rollout targeting, Venue settings, and item switch. Leave the order unrefunded.

### TC-8: My Orders - Refunds - Keep another customer from opening or returning an order

**Description:** A signed-in customer who did not buy an order cannot find it in My Orders or use another customer's order link to see its details or request a refund.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, authenticated-user

**Preconditions:**

* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, and **Cutoff type = No cutoff**; record prior settings.
* An employee with **Manage Events** enables **Allow customer-initiated refunds** for a future event ticket type. Customer A buys one paid ticket with a refundable card payment. Customer B has a separate Showpass account and no ownership of or transfer access to the order.
* Customer A opens the order in Account → My Orders and copies its order-detail link. Record the transaction and both account identities for execution evidence, without placing IDs in this case.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as Customer B and open Account → My Orders. | Customer A's transaction | Customer A's order does not appear in Customer B's list. |
| Open the copied order-detail link while still signed in as Customer B. | Link copied by Customer A | The order is unavailable; no ticket details, Return order action, or refund preview are shown. |
| Sign back in as Customer A. |  | Customer A's account opens. |
| Reopen the order. |  | Customer A still sees the unchanged paid order. |

**Postconditions:**

* Restore policy and ticket switch. Leave the purchased order unrefunded.

### TC-9: My Orders - Refunds - Keep a ticket and its included product together when a package return is unavailable

**Description:** A customer buys one admission ticket that includes one product through a saved package relationship. This is one package, not a separately priced checkout add-on. In the current separate-barcode configuration, My Orders does not offer a usable package return. The included product must not become independently returnable, and closing the dialog must leave both items paid.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The preparing employee has **Manage Events**, **Manage Marketplace**, and **Manage Organization Info**, and the organization is not on Basic pricing. An administrator can add **Sub-product relations** in Showpass Admin.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**.
* In **Admin → Venues → Venue customer refund policies**, find the organization or select **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **Customers can self-refund automatically**, **No cutoff**, **After barcode delivery = Allow customer refunds**, **After fulfillment or shipping = Block customer refunds**, **After check-in or scan = Block customer refunds**, **Refund eligible items independently**, and **Enable configurable refund amounts = off**. Record original values.
* In **Dashboard → Build → Events → All events → Edit → Tickets**, create a public General Admission ticket priced 25.00, inventory 10, on a published event at least seven days in the future with sales open. Use a new ticket type without sales; save **Basic info → Allow customer-initiated refunds = on**. Do not attach a separate ticket package, assigned seat, or membership to it.
* In **Dashboard → Build → Products → All products**, create a product with one variant priced 15.00 and inventory 10 under **Inventory**. Save **Fulfillment → Allow customer-initiated refunds = on**. Leave **Availability → Checkout add-ons → Add to event checkout process = off** so it is included through the package rather than added separately.
* Before any sale, open **Admin → Tickets → Sub-product relations → Add**. Select the new admission **Ticket type** and **Product**, set **Quantity = 1**, **Use parent barcode = off**, and **Include in fees = on**; save and reopen to verify those values. Saving the relationship makes this ticket a package. Do not add or change the relationship after sales.
* As the customer who will open My Orders, buy quantity 1 of that admission ticket with an approved refundable card payment. Complete any required product-variant choice. Verify checkout includes exactly one admission and one included variant, without a second independently purchased product. Record the receipt, transaction, item names, quantities, and starting Organizer Credits balance. Keep both items unscanned, unfulfilled, untransferred, and not on resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction | The paid package purchase is present. |
| Open the order details. | Recorded admission and included variant | The purchase contains one admission and one included product, with the recorded quantities. |
| Open Return order. | Ticket + product package | The dialog offers no usable package selection or positive return amount. |
| Read the dialog and available controls. | Included product | The included product cannot be returned independently, and a return cannot be confirmed. |
| Close the dialog. |  | No return is submitted. |
| Reopen the order details. | Recorded admission and included variant | Both items remain paid; neither is marked returned. |
| Open Account → Credits → Organizer Credits. | Starting balance for this organization | The balance is unchanged. |

**Postconditions:**

* Preserve the paid order and package relationship as evidence. Restore policy and item refund switches changed for this run; do not delete or edit the package composition after sales.

### TC-10: My Orders - Refunds - Require the whole remaining order - Block the order until every remaining item allows refunds

**Description:** The customer bought two items, but one has **Allow customer-initiated refunds** off. With **Require the whole remaining order**, the eligible item cannot be returned alone. After the employee enables refunds for the blocked item, the same order must allow a preview containing both purchases. Cancel without submitting.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| PurchaseConfiguration | Configure and buy in one order | Item that starts blocked | Expected result after its switch is enabled |
| --- | --- | --- | --- |
| TwoTicketTypes | One public General Admission ticket priced 10.00 with switch on; a second type priced 15.00 with switch off; inventory 10 each. Buy quantity 1 of each. | The 15.00 ticket type. | Both tickets are required; neither can be deselected. |
| TicketAndProduct | One public General Admission ticket priced 10.00 with switch on; one checkout product variant priced 15.00 with switch off; inventory 10 each. Buy quantity 1 of each. No package relationship. | The product. | Admission and product are required; neither can be deselected. |

**Tags:** my-orders, refunds, edge-case

**Parameters:**
PurchaseConfiguration: TwoTicketTypes, TicketAndProduct

**Preconditions:**

* The preparing employee has **Manage Organization Info** and **Manage Events**. TicketAndProduct also requires **Manage Marketplace** and an organization not on Basic pricing.
* Enable `enable_venue_policy_customer_self_refunds` for this organization. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **Customers can self-refund automatically**, **No cutoff**, **After barcode delivery = Allow customer refunds**, **After fulfillment or shipping = Block customer refunds**, **After check-in or scan = Block customer refunds**, **Orders with mixed eligibility = Require the whole remaining order**, and **Enable configurable refund amounts = off** before purchase. Record original settings.
* For tickets, open **Dashboard → Build → Events → All events → Edit → Tickets** on a published, single-day event at least seven days in the future with public sales open. Add or select the ticket types in PurchaseConfiguration; save **Basic info → Allow customer-initiated refunds = on**. Record their names and prices; use ticket types without unrelated sales because another run may change their refund switches.
* For TicketAndProduct, open **Dashboard → Build → Products → All products**; create or select a product, save a variant priced 15.00 with inventory 10 under **Inventory**, and save **Fulfillment → Allow customer-initiated refunds = on**. Under **Availability → Checkout add-ons**, turn on **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select the event and admission under **Select tickets to include**, and save. Do not create a Sub-product relation or ticket package.
* Before purchase, save the starting switch values from PurchaseConfiguration: the 15.00 ticket's **Basic info → Allow customer-initiated refunds = off**, or the product's **Fulfillment → Allow customer-initiated refunds = off**. The other item stays on.
* As the customer who will open My Orders, buy exactly the selected row's items in one checkout with an approved refundable card payment. Record the receipt, transaction, item names, quantities, variant or seat labels, prices, taxes, and fees. Keep all purchased items unscanned, unfulfilled, untransferred, and not on resale; do not use discounts, credit, gift cards, payment plans, shipping, or protection.


| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction | Both purchased items are present. |
| Open Return order. | Require the whole remaining order; one item switch off | The dialog explains the whole order cannot be returned; no usable one-item preview or confirmation is available. |
| Close the dialog. |  | No return is submitted. |
| As the employee, open the blocked ticket type's Basic info or product's Fulfillment page. | Item that starts blocked in PurchaseConfiguration | Allow customer-initiated refunds is off for the intended item. |
| Turn on Allow customer-initiated refunds. |  | The switch is on. |
| Select Save. |  | The item change is saved. |
| Reopen the same item settings. |  | Allow customer-initiated refunds remains on. |
| As the buyer, reload the same order. | Recorded transaction | Both original purchases remain paid. |
| Open Return order. | Both item switches now on | Both purchases are required and a positive whole-order preview is shown. |
| Try to deselect either purchase. |  | Both stay included; a partial return cannot be selected. |
| Select Cancel. |  | No return is submitted. |
| Reopen the order. |  | Both items remain paid; neither is marked returned. |

**Postconditions:**

* Restore changed policy and item-switch values, save, and reopen them. Keep the purchase unrefunded.

### TC-11: My Orders - Refunds - Require the whole remaining order - Keep package purchases paid when selection is unavailable

**Description:** All items in the customer's package allow refunds, and the organization requires the whole remaining order. For the package configurations below, the current My Orders page does not offer a usable whole-order return. The customer must not be able to return only an included item; closing the dialog must leave the full purchase paid.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| PackageConfiguration | Configure before purchase | Buy and identify |
| --- | --- | --- |
| TicketPackage | Preset listing priced 20.00 includes quantity 1 of two different General Admission types; listing and included switches on; Parent revenue; Send a single barcode on; Allow redemption on any included item off. | Buy quantity 1 of the listing. Record the listing and both included ticket types. |
| TicketProductPackage | General Admission ticket priced 25.00 includes quantity 1 of a product with one variant; both switches on. Sub-product relation with Use parent barcode off and Include in fees on; no separate TicketPackage record. | Buy quantity 1 of the admission package and complete any required variant choice. Record the admission and included variant. |

**Tags:** my-orders, refunds, edge-case

**Parameters:**
PackageConfiguration: TicketPackage, TicketProductPackage

**Preconditions:**

* The preparing employee has **Manage Organization Info** and **Manage Events**. TicketProductPackage also requires **Manage Marketplace**, an organization not on Basic pricing, and an administrator allowed to add **Sub-product relations**.
* Enable `enable_venue_policy_customer_self_refunds` for the organization. Use **Admin → Venues → Venues → Barcode delivery = Default**.
* In **Admin → Venues → Venue customer refund policies**, find the organization or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **Customers can self-refund automatically**, **No cutoff**, **After barcode delivery = Allow customer refunds**, **After fulfillment or shipping = Block customer refunds**, **After check-in or scan = Block customer refunds**, **Orders with mixed eligibility = Require the whole remaining order**, and **Enable configurable refund amounts = off**. Record original values.
* Use a published, single-day event at least seven days in the future with public sales open. In **Dashboard → Build → Events → All events → Edit → Tickets**, create the public ticket types listed for PackageConfiguration with inventory 10 and no prior sales. Save **Basic info → Allow customer-initiated refunds = on** for each.
* TicketPackage: use an organization already set to **Admin → Venues → Venues → Package revenue realization type = Parent**. Create the listing at 20.00 and two included ticket types at 10.00 and 12.00. In **Dashboard → Promote → Packages → Create package**, select **Preset**, this **Event**, and the listing **Ticket type**. Under **Included tickets → Add ticket**, select each included type with **Qty = 1**. Save **Send a single barcode = on** and **Allow redemption on any included item = off**; reopen to verify composition and all three refund switches.
* TicketProductPackage: create one product with a variant priced 15.00 and inventory 10 under **Dashboard → Build → Products → All products → Inventory**; save **Fulfillment → Allow customer-initiated refunds = on** and **Availability → Checkout add-ons → Add to event checkout process = off**. In **Admin → Tickets → Sub-product relations → Add**, select the new 25.00 ticket and this product, save **Quantity = 1**, **Use parent barcode = off**, and **Include in fees = on**, then reopen to verify. Do this before sales; do not add a separate ticket package.
* As the buyer, purchase quantity 1 of the configured package with an approved refundable card payment. Record the receipt, transaction, included item names, quantities, and any variant choice. Keep all items paid, unscanned, unfulfilled, untransferred, and not on resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction | The package purchase is present. |
| Open the order details. | Recorded package and included items | The purchase matches the configured package and quantities. |
| Open Return order. | PackageConfiguration; Require the whole remaining order | No usable whole-order selection or positive preview is offered. |
| Inspect the available return controls. | Included items | An included ticket or product cannot be returned independently. |
| Close the dialog. |  | No return is submitted. |
| Reopen the order. | Recorded transaction | The package and all included items remain paid; none is marked returned. |

**Postconditions:**

* Restore changed policy and refund-switch values. Keep the paid order and package relationship; do not edit or remove package composition after sales.

### TC-12: My Orders - Refunds - After fulfillment or shipping - Block or allow customer refunds for a fulfilled product

**Description:** A customer bought an admission ticket and a product using Standard Shipping. The employee has marked the product Fulfilled; the admission refund switch remains off. After fulfillment or shipping must decide whether the product can be selected. Cancel without returning either purchase.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The preparing employee has **Manage Organization Info**, **Manage Events**, **Manage Marketplace**, **Manage Transactions**, and **Scan Tickets**. The organization is not on Basic pricing; Scan Tickets is also required by the fulfillment update action.
* Enable `enable_venue_policy_customer_self_refunds` for the selected organization. Use **Admin → Venues → Venues → Barcode delivery = Default**; do not use customer activation or delayed barcode delivery.
* In **Admin → Venues → Venue customer refund policies**, find the organization or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **Customers can self-refund automatically**, **No cutoff**, **Refund eligible items independently**, and **Enable configurable refund amounts = off** before purchase. Set the restriction being checked to **Block customer refunds** and the other two restrictions to **Allow customer refunds**. Record the original policy and item switches.
* Set **After fulfillment or shipping = Block customer refunds**. Set **After barcode delivery** and **After check-in or scan** to **Allow customer refunds**.
* In **Dashboard → Build → Events → All events → Edit → Tickets**, use a published, single-day event at least seven days in the future with public sales open. Create or select a public General Admission ticket priced 10.00, inventory 10, and save **Basic info → Allow customer-initiated refunds = off**. This accompanying ticket must stay blocked throughout the case.
* In **Dashboard → Build → Products → All products**, create or select a product with one variant priced 15.00 and inventory 10 under **Inventory**. Under **Fulfillment**, save **Allow customer-initiated refunds = on** and **Product Delivery Method(s) = Standard Shipping** only, **Shipping Cost = 0.00**, **Fee Method = Per item**. Under **Availability → Checkout add-ons**, enable **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select the event and admission under **Select tickets to include**, and save.
* As the buyer, buy quantity 1 of the admission and quantity 1 of the product variant in the same checkout with an approved refundable card payment. Select Standard Shipping for the product and enter a supported shipping address you control. Record the receipt, transaction, product variant, and quantities; do not use discounts, credit, gift cards, payment plans, protection, or a package.
* As the employee, open **Dashboard → Transactions → the original transaction → Fulfillment**. For the product, choose **Fulfillment status = Fulfilled**, select **Update**, then **Confirm**. Reopen Fulfillment and verify the product remains Fulfilled; do not fulfill the admission. This is a saved shipping-status setup; no physical shipment is required. Keep both purchases unscanned, untransferred, and not on resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction and product | The original paid purchase is present. |
| Open Return order. | After fulfillment or shipping = Block customer refunds | A blocked-return message is shown; no usable return selection or positive amount is offered for the product. |
| Close the dialog. |  | No return is submitted. |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. | Selected organization | After fulfillment or shipping shows Block customer refunds. |
| Change After fulfillment or shipping to Allow customer refunds. |  | The new choice is shown. |
| Select Save. |  | Customer refund policy saved appears. |
| Reopen Customer refunds. |  | After fulfillment or shipping still shows Allow customer refunds. |
| As the buyer, reload the same order in My Orders. | Recorded transaction | The original purchase is still shown. |
| Open Return order. | product | The product is selectable while the accompanying ticket remains blocked. |
| Select the product. | Quantity 1 | A positive preview applies only to the selected purchase. |
| Select Cancel. |  | No return is submitted. |
| Reopen the order. | Recorded transaction | Nothing is marked returned; the purchase retains its fulfilled shipping state. |

**Postconditions:**

* Restore the original policy and item switches, save, and reopen them. Keep the order unrefunded.
* Preserve the original fulfilled shipping evidence; do not erase operational history to reset the case.

### TC-13: My Orders - Refunds - After check-in or scan - Block or allow customer refunds for a checked-in ticket

**Description:** An attendee has used one paid ticket for admission. After check-in or scan must block the customer return when set to Block customer refunds and allow selection after the employee saves Allow customer refunds. Cancel without returning or undoing admission.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The preparing employee has **Manage Organization Info**, **Manage Events**, and **Scan Tickets**.
* Enable `enable_venue_policy_customer_self_refunds` for the selected organization. Use **Admin → Venues → Venues → Barcode delivery = Default**; do not use customer activation or delayed barcode delivery.
* In **Admin → Venues → Venue customer refund policies**, find the organization or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **Customers can self-refund automatically**, **No cutoff**, **Refund eligible items independently**, and **Enable configurable refund amounts = off** before purchase. Set the restriction being checked to **Block customer refunds** and the other two restrictions to **Allow customer refunds**. Record the original policy and item switches.
* Set **After check-in or scan = Block customer refunds**. Set **After barcode delivery** and **After fulfillment or shipping** to **Allow customer refunds**.
* In **Dashboard → Build → Events → All events → Edit → Tickets**, use a published, single-day event that starts within the next hour and ends at least two hours later, with public sales open. Create a public General Admission ticket priced 10.00, inventory 10, without a package or assigned seat. Save **Basic info → Allow customer-initiated refunds = on** and, under Ticket timing, **Custom scan start time = one hour before now** and **Custom scan end time = the event end**. Use electronic delivery; do not enable unlimited scanning or a custom multiple-scan limit. Record the event's displayed timezone and timing.
* As the buyer, purchase quantity 1 with an approved refundable card payment and record the transaction, ticket name, and barcode from My Orders. Do not use shipping, discounts, credit, gift cards, protection, or payment plans. Keep the ticket untransferred and not on resale.
* As the employee, open the event's **Check in** and scan the recorded barcode once. Confirm successful admission and that this ticket is checked in; record the scan result. Do not scan another ticket or override a failed scan. Complete the customer steps before the event ends.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction and checked-in ticket | The original paid purchase is present. |
| Open Return order. | After check-in or scan = Block customer refunds | A blocked-return message is shown; no usable return selection or positive amount is offered for the checked-in ticket. |
| Close the dialog. |  | No return is submitted. |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. | Selected organization | After check-in or scan shows Block customer refunds. |
| Change After check-in or scan to Allow customer refunds. |  | The new choice is shown. |
| Select Save. |  | Customer refund policy saved appears. |
| Reopen Customer refunds. |  | After check-in or scan still shows Allow customer refunds. |
| As the buyer, reload the same order in My Orders. | Recorded transaction | The original purchase is still shown. |
| Open Return order. | checked-in ticket | The checked-in ticket is selectable. |
| Select the checked-in ticket. | Quantity 1 | A positive preview applies only to the selected purchase. |
| Select Cancel. |  | No return is submitted. |
| Reopen the order. | Recorded transaction | Nothing is marked returned; the purchase retains its checked-in state. |

**Postconditions:**

* Restore the original policy and item switches, save, and reopen them. Keep the order unrefunded.
* Preserve the original checked-in evidence; do not erase operational history to reset the case.

## Risk Areas and Coverage Accounting

| Risk | Status | Evidence / next proof |
| --- | --- | --- |
| Customer item/policy/cutoff/mixed/restriction selection | Manual-only | TC-1–TC-6; TC-4 now has three exact purchase configurations. Execute on the deployed code before marking passed. |
| Whole-order blocked-item recovery | Manual-only | TC-10; two ticket types or admission + separate product, with one switch off → on. |
| Package whole-order selection | Source-based integration concern; manual-only check | TC-11; all switches on still yield no usable current frontend selection for the specified packages. Successful package return is not covered. |
| Already-returned item in whole-order mode | Deferred | Requires a separate prepared partial-return order; do not infer coverage from the all-paid cases. |
| Legacy compatibility and order ownership | Manual-only | TC-7–TC-8. |
| Direct API bypass, foreign or duplicate item IDs, invalid payment and invoice states | API/backend verification | Current validator and API tests cover examples; run and extend them before release. |
| Package selection | Manual-only for the specified configurations | TC-1 prepares a single-barcode Preset ticket package; TC-9 prepares a ticket + product package. Separate-barcode ticket packages, nested/custom packages, and blocked descendants need distinct checks. |
| Specific customer-facing blocked-reason wording | Product-expectation question | Distinct backend codes currently map to generic item copy in My Orders. |
| Request/approval mode | Not applicable to current model | Only automatic and blocked outcomes exist. |
| Venue shipping/fee amount rules; separate delayed-barcode opt-in | Separate executable scope | Current source now contains both. Follow [[SPW-19669-customer-refund-amount-rules-test-cases]] and [[SPW-19670-delayed-barcode-self-refund-test-cases]]. |

## Minimum Execution Set

Run TC-1 once for each of its five ItemType values, TC-9 for the ticket + product package, TC-2, all TC-3 cutoff rows, each TC-4 PurchaseConfiguration, TC-5, both TC-10 PurchaseConfiguration values, both TC-11 PackageConfiguration values, TC-6, TC-12, and TC-13, TC-7, and TC-8. Record unavailable state preparation as blocked, not passed.

## Suggested Automated Coverage

Cover exact cutoff boundaries and timezones; all item and mixed-order variants; barcode/fulfillment/scan status; ownership and unsupported payment; item/package descendants; preview/POST parity; and no refund record or credit on rejection. Verify a policy/item change after an eligibility read does not bypass the locked return recheck.

## Assumptions and Unknowns

* The local checkout contains eligibility code, but its deployed revision and test records were not verified. All cases are drafts.
* The item message is generic even when the backend reason code is specific. Do not infer a more detailed customer explanation from Jira.
* Current local source now contains the delayed-barcode Venue field and shipping/fee amount choices. Their scenarios are in separate card notes; deployment has not been verified live.

## Open Questions

1. Should the customer see precise reasons for item flag, barcode, shipping, and scan blocks, or is the current generic item message accepted?
2. Should a ticket + product package be returnable as one purchase? Current backend admits the package ticket when all included items qualify, but the customer page filters it out for the separate-barcode configuration in TC-9. This is a source-based integration concern, not an executed defect.
3. Which deployed build and preparation accounts will be used for fulfillment and check-in states?
