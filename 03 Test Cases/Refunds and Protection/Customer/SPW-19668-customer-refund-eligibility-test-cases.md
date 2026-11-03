---
title: Customer Refund Eligibility Test Cases
jira: SPW-19668
status: source-reviewed-not-executed
date: 2026-10-27
tags:
  - qa/test-cases
  - refunds
  - my-orders
---

# Customer Refund Eligibility Test Cases

> [!important] SPT-5326 readability update — 2026-11-02
> **Published and read back successfully:** TC-12 / [SPT-5326](https://app.qase.io/case/SPT-5326) is now **My Orders - Refunds - Block or allow a refund for a product already marked Fulfilled**. Its Description identifies one admission plus one separately purchased product and explains why the admission's refund switch stays off. The 18 steps now include the previously prerequisite-only fulfillment update, confirmation and reopening, followed by policy off → on, preview/Cancel and unchanged order/fulfillment checks. The case checks return eligibility with Shipping Cost 0.00; it does not prove shipping-charge allocation. Title, Description, Preconditions, Postconditions and Steps were saved and verified. Existing WebPublic/Desktop, no parameters, tags, suite 1108 and other metadata are preserved. No Showpass order was changed or test executed.
>
> Source review: backend `customer_return_eligibility.py` checks the saved Fulfilled status against the policy; `apps/tickets/api/venue_based/viewsets/ticket_items.py` provides the fulfillment update with Scan Tickets authority. Frontend `ProductDeliverySection.web.tsx`, `ShippingFulfillmentPage.web.tsx` and the Transactions fulfillment dialog confirm the preparation controls. Handbook Playbook 15 supplies the supported transaction/fulfillment walkthrough. The source revisions are recorded in the package update below. Only SPT-5326 was changed by this update; broader requested writes await exact case scope.

> [!important] SPT-5325 readability update — 2026-11-02
> **Latest title, published and verified:** My Orders - Refunds - Block or allow a refund when the customer can already see the ticket barcode. This title-only update preserves all execution fields; the earlier title below is publication history.
>
> **Published and read back successfully:** TC-6 / [SPT-5325](https://app.qase.io/case/SPT-5325) is now **My Orders - Refunds - Block or allow a ticket return after barcode delivery**. The case states that the standard barcode is already visible and the ticket's own refund switch stays on. One table explains the Organization setting: off hides Return order; on allows a preview. The 13 steps include an explicit barcode check, save/reopen, preview/Cancel and an unchanged paid ticket. Existing WebPublic/Desktop, no parameters, tags, suite 1108 and other metadata are preserved. No test was executed.
>
> Refactor evidence: current backend `customer_return_eligibility.py` checks delivered barcode status against the policy's barcode behavior; frontend `customer-refund-policy-form-fields.ts` confirms the control label and My Orders `order-action-availability.ts` controls Return order visibility. Revisions are the same backend/frontend revisions recorded in the package update below. The unrelated Organization Product switch remains in the existing preparation; no product purchase or product assertion was added.

> [!important] SPT-5309 package update — 2026-11-02
> **Published and read back successfully:** TC-1 / [SPT-5309](https://app.qase.io/case/SPT-5309) now includes **ItemType = TicketProductPackage**. One admission ticket includes one product variant; the product's refund switch off blocks the package, and turning it on allows the package ticket to be selected once. Preview and Cancel only. The original five configurations, WebPublic/Desktop, title, tags, suite 1108, metadata and 13-step count are preserved. Description, Preconditions, Postconditions, Single ItemType values and Steps were verified after saving. This is an enhancement to one existing case; no new Qase case or purchase was created, and the manual test has not been run. The Organization Products-off scenario in the Fan Expo checklist remains separate.
>
> Source review: backend `03544e62cd3a93e92112e5759b9918e7bf1cdf07` — `apps/financials/services/invoice/customer_return_eligibility.py` (included-item blockers and package selection), `customer_return_amounts.py` (included items do not add a second refund), `apps/tickets/models/packages_management/sub_ticket_option.py` and `apps/tickets/admin/packages.py` (supported Sub-product relation setup and sales lock). Frontend `cc59dd9de4ab94d28aaff199d288d615ca39f115` — `packages/core/src/app-contexts/user/features/account/features/my-orders/utils/order-actions/return-order.ts` retains the purchased package ticket for return selection. No branch comparison or code changes were made.

> [!important] Current-page review — 2026-10-27
> **Published and verified:** the cases listed below now match Qase after the approved 21 updates and 14 creates. Required gates, current controls, item setup, and expected results were reviewed in plain language. No purchases, refunds, or scans were executed. The table is the current publication map; older dated records below are history.

| Local draft | Current Qase case | Suite |
| --- | --- | --- |
| TC-1 | [SPT-5309](https://app.qase.io/case/SPT-5309) | 1108 |
| TC-2 | [SPT-5310](https://app.qase.io/case/SPT-5310) | 1108 |
| TC-3 | [SPT-5311](https://app.qase.io/case/SPT-5311) | 1108 |
| TC-4 | [SPT-5321](https://app.qase.io/case/SPT-5321) | 1108 |
| TC-5 | [SPT-5312](https://app.qase.io/case/SPT-5312) | 1108 |
| TC-6 | [SPT-5325](https://app.qase.io/case/SPT-5325) | 1108 |
| TC-8 | [SPT-5313](https://app.qase.io/case/SPT-5313) | 1108 |
| TC-10 | [SPT-5322](https://app.qase.io/case/SPT-5322) | 1108 |
| TC-12 | [SPT-5326](https://app.qase.io/case/SPT-5326) | 1108 |
| TC-13 | [SPT-5327](https://app.qase.io/case/SPT-5327) | 1108 |
| TC-14 | [SPT-5804](https://app.qase.io/case/SPT-5804) | 1108 |
| TC-15 | [SPT-5805](https://app.qase.io/case/SPT-5805) | 1108 |

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

| Axis | States | Cases |
| --- | --- | --- |
| Policy and item | General admission, product add-on, standalone product, individual seat, single-barcode ticket package; automatic/blocked outcome | TC-1, TC-2 |
| Ticket + product package | Ticket includes one product through Admin; separate barcode mode; included product switch off → on | TC-1 TicketProductPackage / SPT-5309; blocked → selectable package preview and Cancel. Published 2026-11-02; not executed. TC-9 is historical and withheld. |
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

**Current review:** published customer cases need current gates and switch labels. Fully blocked orders hide Return order. TC-14 covers the three selectable organization ticket/product combinations; TC-15 separately covers both type switches off. Historical package-limitation recipes TC-9/TC-11 are withheld from publication for the reasons stated beside them.


In these cases, an item is **returnable** when the customer is allowed to select it in **Return order**. The organization-wide Customer refunds page and each ticket type or product's **Allow customer-initiated refunds** choice both affect that result. A **cutoff** is the last time a customer may request a refund.

### TC-1: My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it

**Description:** A customer buys the items listed for ItemType while the named item's **Allow customer-initiated refunds** switch is off. An employee turns that switch on, and the customer reopens the same order to check that the correct purchase becomes selectable. This case reads the return preview and cancels; it does not complete a refund. A package is one purchase containing included tickets or products. Select the purchased package ticket for return; its included items cannot be returned separately. For TicketProductPackage, the included product starts with refunds off: this blocks the package until the product's switch is turned on. Buying a separate checkout add-on is a different setup.

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
| TicketProductPackage | One General Admission ticket priced 25.00 includes quantity 1 of one product variant through a saved Sub-product relation. Ticket refund switch on; included product refund switch off. One event sells the package ticket; the product has no event. No child events, included tickets, separate checkout add-on or separate TicketPackage record. | Buy quantity 1 of the package ticket and record its admission and included product variant. Do not buy the product again as an add-on. | Included product → Fulfillment. | Before the product switch is enabled, Return order is hidden. After saving, select the package ticket once; the included product cannot be selected separately. The preview uses the paid package amount without adding the included product's standalone price again. |

**Tags:** my-orders, refunds

**Parameters:**
ItemType: TicketType, Product, StandaloneProduct, AssignedSeat, TicketPackage, TicketProductPackage

**Preconditions:**

* The preparing employee has **Manage Organization Info** and **Manage Events**; Product, StandaloneProduct and TicketProductPackage also require **Manage Marketplace** and an organization not on Basic pricing. TicketProductPackage requires an administrator able to add **Sub-product relations** before the ticket has sales.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` rollout flag. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**, so this case does not depend on delayed release or customer activation.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its policy or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Cutoff type = No cutoff**, **Allow customer refunds after barcode delivery = on**, **Allow customer refunds after fulfillment or shipping = off**, **Allow customer refunds after check-in or scan = off**, **Orders with mixed eligibility = Refund eligible items independently** before purchase. Record the original settings.
* For tickets, open **Dashboard → Build → Events → All events → Edit → Tickets** on a published, single-day event at least seven days in the future with public sales open. Add or select the ticket types in ItemType; edit **Basic info → Allow customer-initiated refunds** and save the starting values. Record event and item names; use items without unrelated sales because their refund switches will change.
* For products, open **Dashboard → Build → Products → All products**; create or select a product and use **Inventory** to save the variant's name, price, and inventory from ItemType. In **Fulfillment**, save **Allow customer-initiated refunds = off**. Product: in **Availability → Checkout add-ons**, turn on **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select this event and accompanying ticket under **Select tickets to include**, and save. StandaloneProduct: in **Availability → Sales channels**, turn on **Visible on Your Venue Page** and save. TicketProductPackage: use the included-product preparation below instead of enabling checkout add-ons.
* For AssignedSeat, reuse an event whose public seating map offers an individual seat for the selected ticket type; choose and record the seat before payment. Do not change a shared seating layout to prepare this case.
* For TicketPackage, use an organization already set to **Admin → Venues → Venues → Package revenue realization type = Parent**. Create three public ticket types with inventory 10: the 20.00 package listing and two included types priced 10.00 and 12.00. In **Dashboard → Promote → Packages → Create package**, choose **Package type = Preset**, this **Event**, and the listing **Ticket type**; under **Included tickets**, use **Add ticket** for each included type with **Qty = 1**. Save the barcode choices in ItemType, then reopen the event's Tickets page to save the listing switch off and both included switches on. All tickets use the same future event; no nested package or product is included.
* For TicketProductPackage, prepare one unsold General Admission ticket priced 25.00 with Inventory 10 and **Basic info → Allow customer-initiated refunds = on** on the selected event. Create one product with a single variant priced 15.00 and Inventory 10; save **Fulfillment → Allow customer-initiated refunds = off** and **Availability → Checkout add-ons → Add to event checkout process = off**. In **Admin → Tickets → Sub-product relations → Add**, select that **Ticket type** and **Product**, then save **Quantity = 1**, **Use parent barcode = off**, and **Include in fees = on**. Reopen the relation to check it. Create this relationship before purchase; it cannot be added or changed after the ticket has sales. Do not add a separate ticket package or another event. Both Organization ticket and product refund switches stay on throughout this case.
* As the customer who will use My Orders, complete the purchase listed for ItemType with an approved refundable card payment. Record the receipt, transaction, item quantities, prices, taxes, fees, variant or seat labels, and original switches. Keep every purchased item unscanned, unfulfilled, untransferred, and not offered for resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the purchasing customer, open Account → My Orders. | Recorded transaction | The order contains the names and quantities listed for ItemType. |
| Read the order details. | ItemType; product variant, seat, or package listing recorded at purchase | The order contains the correct purchase, not another ticket, variant, or seat. For TicketProductPackage, the package contains one admission and one included product variant, without a second separately purchased product. |
| As the buyer, open the prepared order in Account → My Orders and inspect its order options. | The item whose switch is off | Return order is not offered; no customer return or positive refund preview can be started. |
| As the employee, open the ticket type's Basic info or product's Fulfillment page named in the ItemType table. | Recorded item name; TicketProductPackage uses the included product's Fulfillment page. | Allow customer-initiated refunds is off for the intended item. For TicketProductPackage, the package ticket's own switch remains on. |
| Turn on Allow customer-initiated refunds. |  | The item switch is on. |
| Select Save. |  | The item change is saved. |
| Reopen the same item settings. |  | Allow customer-initiated refunds remains on. |
| As the customer, reload the same order. | Recorded transaction | The original paid purchase is still shown with its recorded quantity. |
| Open Return order again. | Expected return selection in ItemType | The intended purchase is selectable and any accompanying blocked ticket remains unselectable. For either package setup, select the purchased package ticket; included tickets or products cannot be selected separately. |
| Select the newly returnable purchase. | Quantity 1 of the ticket, variant, seat ticket, or package listing | The preview shows a positive amount for the selected purchase without including a blocked companion item. A package is counted once; the included tickets' or product's standalone prices are not added again to its paid package amount. |
| Read the selected purchase's description and quantity. | Original receipt and ItemType | The selection matches the recorded ticket, product variant, seat ticket, or single package purchase. |
| Select Cancel. |  | The dialog closes without submitting a return. |
| Reopen the order in My Orders. | Recorded transaction | All purchased items remain paid and none is marked returned. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the changed item switches and organization policy values, save, and reopen them. Keep the order paid and unrefunded.
* AssignedSeat: the customer still owns the recorded seat; cancelling the return must not release it.
* TicketPackage: the package and both included tickets remain paid; neither included ticket was returned separately.
* TicketProductPackage: the admission and included product remain paid, unfulfilled and unreturned. Restore the included product's original refund switch. Keep the sold package relationship unchanged; do not delete it as cleanup.

### TC-2: My Orders - Refunds - Block a customer return when the organization policy is off

**Description:** A paid ticket has its individual refund switch on, but the organization policy is off. The customer cannot start a return and the order, payment, and credit remain unchanged.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In Dashboard → Organization → Organization settings → Customer refunds, save both ticket/product switches on, No cutoff, Allow customer refunds after barcode delivery on, and Enable customer refund policy off. Record the original settings.
* In Build → Events → All events, prepare a published single-day event at least seven days ahead with public sales open. Create one General Admission ticket at 10.00, inventory 10; save Basic info → Allow customer-initiated refunds on.
* As the buyer, purchase one ticket with a refundable card payment. Record the order, original payment, and opening Organizer Credit. Keep it unscanned, unfulfilled, untransferred, and off resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and the purchased order. | Recorded order | The paid ticket is present. |
| Open the order options. |  | Return order is not offered. |
| Reload the order. |  | The ticket is still paid and no return is recorded. |
| Inspect Organizer Credits and, as the employee, the order in Transactions. | Recorded opening values | No credit or payment refund was created. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

### TC-3: My Orders - Refunds - Stop a return after the saved deadline

**Description:** A paid ticket can normally be returned. Set each deadline below so it has already passed; the customer must not be offered **Return order**. Change the organization back to **No cutoff** and confirm the same ticket becomes selectable.

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

* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Allow customer refunds after barcode delivery = on**, and **Cutoff type = No cutoff**; record its original settings. After the purchase below, save the deadline from the selected row before starting the customer check.
* An employee with **Manage Events** prepares the future event and ticket timing from the row, turns **Allow customer-initiated refunds = on** in ticket Basic info, and saves. The customer buys one paid ticket with a refundable card payment before the cutoff is applied; record the order.
* Use an unscanned, untransferred ticket and leave it unfulfilled and save **Allow customer refunds after barcode delivery = on** so barcode delivery does not independently block it.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open the prepared order in Account → My Orders and inspect its order options. | Chosen deadline row | Return order is not offered; no customer return or positive refund preview can be started. |
| As the employee, open Organization → Organization settings → Customer refunds. |  | The selected cutoff and its saved date or duration are shown. |
| Select Cutoff type = No cutoff. |  | No cutoff is selected. |
| Select Save. |  | Customer refund policy saved appears. |
| As the customer, reload the same order and select Return order. |  | The ticket is selectable and a refund amount greater than zero appears. |
| Select Cancel. |  | No return is submitted. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
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
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* Enable `enable_venue_policy_customer_self_refunds` for this organization. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **No cutoff**, **Allow customer refunds after barcode delivery = on**, **Allow customer refunds after fulfillment or shipping = off**, **Allow customer refunds after check-in or scan = off**, **Orders with mixed eligibility = Require the whole remaining order** before purchase. Record original settings.
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

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore changed policy and item-switch values, save, and reopen them. Preserve the unrefunded order.
* TwoAssignedSeats: the buyer retains both recorded seats; neither seat is released by cancelling the return.

### TC-5: My Orders - Refunds - Block when any remaining item is ineligible - Block the entire order

**Description:** A customer bought two tickets in one order. One ticket has **Allow customer-initiated refunds** off. When the organization chooses **Block when any remaining item is ineligible**, the customer cannot return either ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Allow customer refunds after barcode delivery = on**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Block when any remaining item is ineligible**; record prior settings.
* An employee with **Manage Events** turns on **Allow customer-initiated refunds** for one ticket type and off for another. The customer buys one paid ticket of each type in one refundable card order; keep both tickets unscanned, unfulfilled, and untransferred, and record the transaction.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open the prepared order in Account → My Orders and inspect its order options. | Purchased order | Return order is not offered; no customer return or positive refund preview can be started. |
| Leave the order without submitting any return. |  | No refund or credit is created. |
| Reopen the order. |  | Both tickets remain paid and neither is marked returned; no refund or credit exists. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore policy and ticket switches; leave the order unrefunded.

### TC-6: My Orders - Refunds - Block or allow a refund when the customer can already see the ticket barcode

**Description:** The customer already has one paid ticket and can see its barcode in My Orders. Check whether **Allow customer refunds after barcode delivery** controls the customer's ability to return that same ticket. The ticket type's **Allow customer-initiated refunds** stays **on** throughout. Use **Barcode delivery = Default**, so the barcode is available without waiting for a delayed release or asking the customer to activate it. Preview the refund, then Cancel.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| Organization setting being tested | What the customer should see on the same order |
| --- | --- |
| Allow customer refunds after barcode delivery = off | The barcode is visible, but Return order is hidden. |
| Allow customer refunds after barcode delivery = on | The barcode is still visible. Return order is available, and the ticket can be selected for a refund preview. |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The preparing employee has **Manage Organization Info** and **Manage Events**. Record the original settings before changing them.
* An administrator opens **Admin → Venues → Venues → the selected Organization's Venue record** and saves **Customer Self Refund Settings = on** and **Barcode delivery = Default**.
* The Venue-scoped feature flag **enable_venue_policy_customer_self_refunds = on** for the selected Venue.
* In **Admin → Venues → Venue customer refund policies**, search for the selected Venue. Reuse its policy, or select **Add → Venue → select the Venue → Save**.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Allow customer refunds for tickets = on**, **Allow customer refunds for products = on**, **Automated return refund type = Base refund**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**.
* On that same settings page, save **Allow customer refunds after barcode delivery = off**. Save **Allow customer refunds after fulfillment or shipping = on** and **Allow customer refunds after check-in or scan = on**.
* In **Dashboard → Build → Events → All events → Edit → Tickets**, prepare one public General Admission ticket priced **10.00**, with **Inventory = 10**, on a published single-day event at least seven days in the future with sales open. Save **Basic info → Allow customer-initiated refunds = on**. Leave this ticket switch on for the whole test.
* As the customer who will open My Orders, buy **one** of that ticket with an approved refundable card payment and electronic delivery. The order contains only that ticket: no package, assigned seat, product, shipping, discount, credit, gift card or payment plan. Record the transaction and ticket name.
* Keep the ticket unscanned, unfulfilled, untransferred and off resale. The customer must already be able to see its barcode before checking the refund setting.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the purchasing customer, open Account → My Orders and open the recorded order. | Recorded transaction and ticket name | The order contains one paid ticket with the recorded name. |
| Open the ticket to view its barcode. | The purchased General Admission ticket | The barcode is visible before any refund setting is changed. |
| Open the order's available actions. | Allow customer refunds after barcode delivery = off | Return order is hidden even though the ticket's barcode is visible and its own refund switch is on. |
| Leave the order without returning the ticket. | | No return is submitted and no refund or credit is created. |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. | The Organization that sold the ticket | Allow customer refunds after barcode delivery is off. |
| Turn on Allow customer refunds after barcode delivery. | Leave the ticket type's own refund switch on. | The Organization setting now shows on. |
| Select Save. | | Customer refund policy saved appears. |
| Leave Customer refunds and reopen it. | Same Organization | Allow customer refunds after barcode delivery is still on. |
| As the customer, reload the same order in My Orders. | Recorded transaction | The same ticket is still paid. |
| Select Return order. | The purchased ticket | The return dialog opens and the ticket can be selected. |
| Select the ticket. | Quantity 1 | The preview shows a refund amount greater than zero for that ticket only. |
| Select Cancel. | | The return dialog closes without submitting a refund. |
| Reopen the order and view the ticket. | Recorded transaction | The ticket remains paid and unscanned, is not marked returned, and its barcode is still available. |

**Postconditions:**

* Restore every Organization, Venue and ticket setting changed for this case, including the barcode-delivery setting and rollout flag if changed. Save and reopen to check the original values.
* Keep the purchased ticket paid and unrefunded. Do not scan, fulfill or delete it to clean up this preview test.
* Keep evidence that the barcode was visible in both settings and that Cancel left the ticket unchanged; do not include the usable barcode value in shared notes.

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

* Have the administrator restore Enable automated returns to its recorded original value if it was changed for this case.
* Restore the original rollout targeting, Venue settings, and item switch. Leave the order unrefunded.


### TC-8: My Orders - Refunds - Keep another customer from opening or returning an order

**Description:** A signed-in customer who did not buy an order cannot find it in My Orders or use another customer's order link to see its details or request a refund.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, authenticated-user

**Preconditions:**

* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, and **Cutoff type = No cutoff**; record prior settings.
* An employee with **Manage Events** enables **Allow customer-initiated refunds** for a future event ticket type. Customer A buys one paid ticket with a refundable card payment. Customer B has a separate Showpass account and no ownership of or transfer access to the order.
* Customer A opens the order in Account → My Orders and copies its order-detail link. Record the transaction and both account identities for execution evidence, without placing IDs in this case.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as Customer B and open Account → My Orders. | Customer A's transaction | Customer A's order does not appear in Customer B's list. |
| Open the copied order-detail link while still signed in as Customer B. | Link copied by Customer A | The order is unavailable; no ticket details, Return order action, or refund preview are shown. |
| Sign back in as Customer A. |  | Customer A's account opens. |
| Reopen the order. |  | Customer A still sees the unchanged paid order. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore policy and ticket switch. Leave the purchased order unrefunded.

### TC-9: My Orders - Refunds - Keep a ticket and its included product together when a package return is unavailable

> [!warning] Historical package-selection expectation
> Do not run or publish this old negative case against current develop. Purchased package parents are now retained; distinguish supported Parent-revenue packages from unsupported Child-revenue packages. The corresponding Qase case needs a replacement decision.


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
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* Enable `enable_venue_policy_customer_self_refunds` for this organization. Use an organization with **Admin → Venues → Venues → Barcode delivery = Default**.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **No cutoff**, **Allow customer refunds after barcode delivery = on**, **Allow customer refunds after fulfillment or shipping = off**, **Allow customer refunds after check-in or scan = off**, **Orders with mixed eligibility = Require the whole remaining order** before purchase. Record original settings.
* For tickets, open **Dashboard → Build → Events → All events → Edit → Tickets** on a published, single-day event at least seven days in the future with public sales open. Add or select the ticket types in PurchaseConfiguration; save **Basic info → Allow customer-initiated refunds = on**. Record their names and prices; use ticket types without unrelated sales because another run may change their refund switches.
* For TicketAndProduct, open **Dashboard → Build → Products → All products**; create or select a product, save a variant priced 15.00 with inventory 10 under **Inventory**, and save **Fulfillment → Allow customer-initiated refunds = on**. Under **Availability → Checkout add-ons**, turn on **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select the event and admission under **Select tickets to include**, and save. Do not create a Sub-product relation or ticket package.
* Before purchase, save the starting switch values from PurchaseConfiguration: the 15.00 ticket's **Basic info → Allow customer-initiated refunds = off**, or the product's **Fulfillment → Allow customer-initiated refunds = off**. The other item stays on.
* As the customer who will open My Orders, buy exactly the selected row's items in one checkout with an approved refundable card payment. Record the receipt, transaction, item names, quantities, variant or seat labels, prices, taxes, and fees. Keep all purchased items unscanned, unfulfilled, untransferred, and not on resale; do not use discounts, credit, gift cards, payment plans, shipping, or protection.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction | Both purchased items are present. |
| As the buyer, open the prepared order in Account → My Orders and inspect its order options. | Require the whole remaining order; one item switch off | Return order is not offered; no customer return or positive refund preview can be started. |
| Leave the order without submitting any return. |  | No refund or credit is created. |
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

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore changed policy and item-switch values, save, and reopen them. Keep the purchase unrefunded.

### TC-11: My Orders - Refunds - Require the whole remaining order - Keep package purchases paid when selection is unavailable

> [!warning] Historical package-selection expectation
> Do not run or publish this old negative case against current develop. Purchased package parents are now retained; distinguish supported Parent-revenue packages from unsupported Child-revenue packages. The corresponding Qase case needs a replacement decision.


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

### TC-12: My Orders - Refunds - Block or allow a refund for a product already marked Fulfilled

**Description:** A customer buys one admission ticket and one separately priced product in the same checkout. An employee marks the product **Fulfilled**, recording that its shipping has been completed. Check whether **Allow customer refunds after fulfillment or shipping** blocks or allows a refund preview for that product. No physical shipment is needed to prepare the saved status for this test. The product's own refund switch stays on. The admission ticket's switch stays off, so the ticket cannot make Return order appear while the product is blocked. Preview the product refund, then Cancel.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| What to buy | Refund switch | Delivery and order state |
| --- | --- | --- |
| One General Admission ticket priced 10.00 | Allow customer-initiated refunds = off throughout | Electronic delivery; unscanned and unfulfilled. This is the accompanying admission, not the item being returned. |
| One product variant priced 15.00, added separately at checkout | Allow customer-initiated refunds = on throughout | Standard Shipping. An employee must save Fulfillment status = Fulfilled before the refund checks. This is not a ticket + product package. |

| Organization setting being tested | Expected result for that same order |
| --- | --- |
| Allow customer refunds after fulfillment or shipping = off | Return order is hidden: the product is blocked because it is Fulfilled, and the ticket's own refund switch is off. |
| Allow customer refunds after fulfillment or shipping = on | Return order is available. The fulfilled product can be selected; the admission ticket stays blocked. |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The preparing employee has **Manage Organization Info**, **Manage Events**, **Manage Marketplace**, **Manage Transactions**, and **Scan Tickets**. Scan Tickets is required to update fulfillment. The Organization is not on Basic pricing. Record original settings before changing them.
* In **Admin → Venues → Venues → the selected Organization's Venue record**, an administrator saves **Customer Self Refund Settings = on** and **Barcode delivery = Default**.
* The Venue-scoped feature flag **enable_venue_policy_customer_self_refunds = on** for the selected Venue.
* In **Admin → Venues → Venue customer refund policies**, search for the Venue. Reuse its policy, or select **Add → Venue → select the Venue → Save**.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets / products = on**, **Automated return refund type = Base refund**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**.
* On that same page, save **Allow customer refunds after fulfillment or shipping = off**. Leave **Allow customer refunds after barcode delivery = on** and **Allow customer refunds after check-in or scan = on**.
* In **Dashboard → Organization → Organization settings → Shipping and fulfillment**, save **Fulfillment features enabled = on**.
* In **Dashboard → Build → Events → All events → Edit → Tickets**, prepare the admission from What to buy with **Inventory = 10** and **Basic info → Allow customer-initiated refunds = off**. Use a published single-day event at least seven days in the future with sales open.
* In **Dashboard → Build → Products → All products**, prepare one product with a single variant priced **15.00** and **Inventory = 10**. Under **Fulfillment**, save **Allow customer-initiated refunds = on**, **Product Delivery Method(s) = Standard Shipping** only, **Shipping Cost = 0.00**, and **Fee Method = Per item**. Zero shipping cost keeps this case focused on whether the product can be returned.
* For that product, open **Availability → Checkout add-ons**. Turn on **Add to event checkout process**, choose **Event checkout visibility = Include for certain items**, select the prepared event and admission under **Select tickets to include**, and Save.
* As the customer who will use My Orders, buy one admission and one product variant together with an approved refundable card payment. Choose **Standard Shipping** for the product and use a supported shipping address you control. Record the transaction, receipt and product variant. Do not include a package, discount, credit, gift card, payment plan or protection. Keep both purchases unscanned, untransferred and off resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the employee, open Dashboard → Transactions and open the recorded purchase. | Recorded transaction | The order contains one admission and the recorded product variant. |
| Select Fulfillment. | The recorded product | The product is listed with a Fulfillment status control. |
| Set the product's Fulfillment status to Fulfilled. | Change only the product; leave the admission unchanged. | Fulfilled is selected for the product. |
| Select Update. | | A confirmation is shown. |
| Select Confirm. | | The product's fulfillment change is saved. |
| Reopen Fulfillment for the same transaction. | Recorded product variant | The product still shows Fulfilled; the admission was not fulfilled. |
| As the customer, open Account → My Orders and inspect the recorded order's available actions. | Allow customer refunds after fulfillment or shipping = off | Return order is hidden. Neither purchase can be returned with these settings. |
| Leave the order without returning either purchase. | | No return is submitted and no refund or credit is created. |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. | The Organization that sold the items | Allow customer refunds after fulfillment or shipping is off. |
| Turn on Allow customer refunds after fulfillment or shipping. | Keep the product's own refund switch on and the ticket's off. | The Organization setting shows on. |
| Select Save. | | Customer refund policy saved appears. |
| Leave Customer refunds and reopen it. | Same Organization | Allow customer refunds after fulfillment or shipping is still on. |
| As the customer, reload the same order in My Orders. | Recorded transaction | The admission and product are still paid. |
| Select Return order. | Recorded product variant | The fulfilled product can be selected. The admission ticket cannot be selected. |
| Select the product. | Quantity 1 | The preview shows a refund amount greater than zero for the product only, with no admission or shipping charge included. |
| Select Cancel. | | The dialog closes without submitting a refund. |
| Reopen the order in My Orders. | Recorded transaction | Both purchases remain paid; neither is marked returned. |
| As the employee, reopen the transaction's Fulfillment. | Recorded product variant | The product still shows Fulfilled. Cancelling the refund did not reset its shipping status. |

**Postconditions:**

* Restore the original Organization, Venue and item settings changed for this case, including the rollout flag, barcode-delivery setting and fulfillment feature setting if changed. Save and reopen to check the original values.
* Keep both purchased items paid and unrefunded. Preserve the product's saved Fulfilled status and its history; do not delete the order or reset that status as cleanup.

### TC-13: My Orders - Refunds - Allow customer refunds after check-in or scan - Block or allow customer refunds for a checked-in ticket

**Description:** An attendee has used one paid ticket for admission. With **Allow customer refunds after check-in or scan** off, **Return order** must be hidden. Turn the switch on and verify the customer can preview a return. Cancel without returning the ticket or undoing admission.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* The preparing employee has **Manage Organization Info**, **Manage Events**, and **Scan Tickets**.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save both **Allow customer refunds for tickets** and **Allow customer refunds for products** on, and **Automated return refund type = Base refund**; record their original values.
* Enable `enable_venue_policy_customer_self_refunds` for the selected organization. Use **Admin → Venues → Venues → Barcode delivery = Default**; do not use customer activation or delayed barcode delivery.
* In **Admin → Venues → Venue customer refund policies**, find the organization or **Add → Venue → select the organization → Save**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy on, **No cutoff**, **Refund eligible items independently** before purchase. Record the original policy and item switches.
* Set **Allow customer refunds after check-in or scan = off**. Set **Allow customer refunds after barcode delivery** and **Allow customer refunds after fulfillment or shipping** to **on**.
* In **Dashboard → Build → Events → All events → Edit → Tickets**, use a published, single-day event that starts within the next hour and ends at least two hours later, with public sales open. Create a public General Admission ticket priced 10.00, inventory 10, without a package or assigned seat. Save **Basic info → Allow customer-initiated refunds = on** and, under Ticket timing, **Custom scan start time = one hour before now** and **Custom scan end time = the event end**. Use electronic delivery; do not enable unlimited scanning or a custom multiple-scan limit. Record the event's displayed timezone and timing.
* As the buyer, purchase quantity 1 with an approved refundable card payment and record the transaction, ticket name, and barcode from My Orders. Do not use shipping, discounts, credit, gift cards, protection, or payment plans. Keep the ticket untransferred and not on resale.
* As the employee, open the event's **Check in** and scan the recorded barcode once. Confirm successful admission and that this ticket is checked in; record the scan result. Do not scan another ticket or override a failed scan. Complete the customer steps before the event ends.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders. | Recorded transaction and checked-in ticket | The original paid purchase is present. |
| As the buyer, open the prepared order in Account → My Orders and inspect its order options. | Allow customer refunds after check-in or scan = off | Return order is not offered; no customer return or positive refund preview can be started. |
| Leave the order without submitting any return. |  | No refund or credit is created. |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. | Selected organization | Allow customer refunds after check-in or scan is off. |
| Change Allow customer refunds after check-in or scan to on. |  | The new choice is shown. |
| Select Save. |  | Customer refund policy saved appears. |
| Reopen Customer refunds. |  | Allow customer refunds after check-in or scan still is on. |
| As the buyer, reload the same order in My Orders. | Recorded transaction | The original purchase is still shown. |
| Open Return order. | checked-in ticket | The checked-in ticket is selectable. |
| Select the checked-in ticket. | Quantity 1 | A positive preview applies only to the selected purchase. |
| Select Cancel. |  | No return is submitted. |
| Reopen the order. | Recorded transaction | Nothing is marked returned; the purchase retains its checked-in state. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and item switches, save, and reopen them. Keep the order unrefunded.
* Preserve the original checked-in evidence; do not erase operational history to reset the case.

### TC-14: My Orders - Refunds - Apply the organization ticket and product switches

**Description:** A customer buys one ticket and one separately priced product with both individual refund switches on. The organization-level switches decide which purchased items can be selected; Cancel leaves both paid.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| AllowedItems | Allow customer refunds for tickets | Allow customer refunds for products | Expected selection |
| --- | --- | --- | --- |
| Both | On | On | Both items can be selected. |
| TicketsOnly | On | Off | Ticket only; product blocked. |
| ProductsOnly | Off | On | Product only; ticket blocked. |

**Tags:** my-orders, refunds

**Parameters:**
AllowedItems: Both, TicketsOnly, ProductsOnly

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Marketplace**; product access is available.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* In Build → Events → All events, prepare a published future single-day event with public sales open. Create a General Admission ticket at 10.00, inventory 10, with Basic info → Allow customer-initiated refunds on.
* In Build → Products → All products, prepare one product with a Standard variant at 15.00, inventory 10. Save Fulfillment → Allow customer-initiated refunds on and **Electronic Ticket** delivery. In Availability → Checkout add-ons, turn on Add to event checkout process, choose Include for certain items, and select this event and ticket; Save.
* As the buyer, purchase one ticket and one product together by refundable card. Record the order and both item names. Keep them unscanned, unfulfilled, untransferred, and off resale; no package, shipping, discount, credit, or payment plan is included.
* Save the AllowedItems row on Customer refunds and reopen to verify. Leave both individual item switches on.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and the recorded order. |  | Both paid purchases are present. |
| Open the order options. | AllowedItems | Return order is offered. |
| Open Return order. | AllowedItems | Only the permitted purchase types can be selected, as listed in the table. |
| Read the selected items and preview. | Selected row | No blocked item contributes to a positive preview. |
| Select Cancel. |  | No return is submitted. |
| Reopen the order. |  | Both items remain paid; neither is returned. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

### TC-15: My Orders - Refunds - Block returns when both organization item-type switches are off

**Description:** The policy is on and both purchased items individually allow refunds. Turning off both organization item-type switches must remove the customer Return order action without changing the purchased items.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Marketplace**; product access is available.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* In Build → Events → All events, prepare a published future single-day event with public sales open. Create a General Admission ticket at 10.00, inventory 10, with Basic info → Allow customer-initiated refunds on.
* In Build → Products → All products, prepare one product with a Standard variant at 15.00, inventory 10. Save Fulfillment → Allow customer-initiated refunds on and **Electronic Ticket** delivery. In Availability → Checkout add-ons, turn on Add to event checkout process, choose Include for certain items, and select this event and ticket; Save.
* As the buyer, purchase one ticket and one product together by refundable card. Record the order and both item names. Keep them unscanned, unfulfilled, untransferred, and off resale; no package, shipping, discount, credit, or payment plan is included.
* On Customer refunds save **Allow customer refunds for tickets = off** and **Allow customer refunds for products = off**. Leave both individual item refund switches on and the policy itself on; save and reopen to verify.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and the recorded order. |  | Both paid purchases are present. |
| Inspect the order options. |  | Return order is not offered. |
| Reload the order. |  | Both purchases remain paid; neither is returned. |
| As the employee, reopen the ticket’s Basic info and product’s Fulfillment page. |  | Both individual Allow customer-initiated refunds switches are still on. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

## Risk Areas and Coverage Accounting

| Risk | Status | Evidence / next proof |
| --- | --- | --- |
| Customer item/policy/cutoff/mixed/restriction selection | Manual-only | TC-1–TC-6; TC-4 now has three exact purchase configurations. Execute on the deployed code before marking passed. |
| Whole-order blocked-item recovery | Manual-only | TC-10; two ticket types or admission + separate product, with one switch off → on. |
| Package whole-order selection | Source-based integration concern; manual-only check | TC-11; all switches on still yield no usable current frontend selection for the specified packages. Successful package return is not covered. |
| Already-returned item in whole-order mode | Deferred | Requires a separate prepared partial-return order; do not infer coverage from the all-paid cases. |
| Legacy compatibility and order ownership | Manual-only | TC-7–TC-8. |
| Direct API bypass, foreign or duplicate item IDs, invalid payment and invoice states | API/backend verification | Current validator and API tests cover examples; run and extend them before release. |
| Package selection | Manual-only; cases published, not executed | TC-1 prepares a single-barcode Preset ticket package and a separate-barcode ticket + product package. The included product's switch off → on is covered by TicketProductPackage. Other blocked descendant states, separate-barcode ticket-only packages and nested/custom packages need distinct checks. |
| Specific customer-facing blocked-reason wording | Product-expectation question | Distinct backend codes currently map to generic item copy in My Orders. |
| Request/approval mode | Not applicable to current model | Only automatic and blocked outcomes exist. |
| Venue shipping/fee amount rules; separate delayed-barcode opt-in | Separate executable scope | Current source now contains both. Follow [[SPW-19669-customer-refund-amount-rules-test-cases]] and [[SPW-19670-delayed-barcode-self-refund-test-cases]]. |

## Minimum Execution Set

Run TC-1 once for each of its six ItemType values, including TicketProductPackage. TC-9 and TC-11 are historical withheld cases; do not execute their obsolete blanket package-failure expectations. Also run TC-2, all TC-3 cutoff rows, each TC-4 PurchaseConfiguration, TC-5, both TC-10 PurchaseConfiguration values, TC-6, TC-12, TC-13, TC-7 and TC-8. Record unavailable state preparation as blocked, not passed.

## Suggested Automated Coverage

Cover exact cutoff boundaries and timezones; all item and mixed-order variants; barcode/fulfillment/scan status; ownership and unsupported payment; item/package descendants; preview/POST parity; and no refund record or credit on rejection. Verify a policy/item change after an eligibility read does not bypass the locked return recheck.

## Assumptions and Unknowns

* The local checkout contains eligibility code, but its deployed revision and test records were not verified. All cases are drafts.
* The item message is generic even when the backend reason code is specific. Do not infer a more detailed customer explanation from Jira.
* Current local source now contains the delayed-barcode Venue field and shipping/fee amount choices. Their scenarios are in separate card notes; deployment has not been verified live.

## Open Questions

1. Should the customer see precise reasons for item flag, barcode, shipping, and scan blocks, or is the current generic item message accepted?
2. Ticket + product package selection now has a current-source recipe in TC-1 / SPT-5309. The earlier frontend-filter concern in historical TC-9 is superseded by the 2026-11-02 source review; the new case still needs execution on the deployed build. Completed refund amounts, included-item validity and inventory effects remain outside this preview case.
3. Which deployed build and preparation accounts will be used for fulfillment and check-in states?
