---
title: Customer Refund Eligibility Test Cases
jira: SPW-19668
status: source-reviewed-not-executed
date: 2026-09-24
tags:
  - qa/test-cases
  - refunds
  - my-orders
---

# Customer Refund Eligibility Test Cases

> [!important] Scope
> This card tests whether the venue policy and each purchased item's switch control customer return eligibility. Organization and item form editing is covered in [[SPW-19667-customer-refund-policy-test-cases]]. Completed refund accounting and recovery are in [[SPW-19671-customer-self-refund-acceptance-test-cases]]. These are unexecuted local drafts; Qase was not accessed.

## Testing Intent

We are testing whether My Orders offers only the customer-return selections allowed by the current organization policy and item state, because an incorrect selection can refund the wrong item or bypass a cutoff; the proof is the visible selection, reason, and fresh preview while blocked orders remain unchanged.

## Jira Intake Summary

[SPW-19668](https://showpass.atlassian.net/browse/SPW-19668) asks for venue-policy and item-flag eligibility in My Orders, mixed-order choices, blocked reasons, ownership/payment checks, API enforcement, and non-Fan Expo legacy compatibility. Its request/approval wording is not implemented by the current two-outcome policy.

## Proof Targets

| Target | Cases |
| --- | --- |
| Item and policy choices gate the purchased item | TC-1, TC-2 |
| Cutoff and restriction states change eligibility | TC-3, TC-6 |
| Mixed-order choice determines selection | TC-4, TC-5 |
| Legacy behavior and ownership remain isolated | TC-7, TC-8 |

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/financials/services/invoice/customer_return_eligibility.py`, `user_invoice_return.py`; `apps/financials/api/user_based/viewsets/invoices.py`, `serializers/returns.py`; `apps/venues/models/venue_management/customer_refund_policy.py`, `venue.py`; `apps/venues/constants/customer_refunds.py`; `apps/venues/admin/financial_configuration.py`, `venue_admin.py`; `apps/financials/tests/test_customer_return_eligibility.py`, `apps/financials/tests/api/user_based/invoices/test_api_user_based_invoice_returns.py`.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/user/features/account/features/my-orders/utils/order-actions/return-order.ts`, `order-action-availability.ts`; `hooks/useMyOrdersDetailPageState.ts`, `useReturnOrderPreview.ts`; `ui/components/OrderOptionsList.web.tsx`; `ui/modals/return-order/MyOrdersReturnOrder.web.tsx`, `MyOrdersReturnOrderModalSelection.web.tsx`; product `ProductAvailabilitySection.web.tsx`, `ProductVisibilityCheckoutAddOns.web.tsx`; ticket type `basic-info/form-sections.ts`.

**Automation patterns:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/account/account-navigation.config.ts`. Source tests/patterns were read, not executed. No branch comparison or changed-file discovery was performed.

## Source-backed Behavior

* An enabled venue policy uses its automatic/blocked outcome and the ticket/product switch. A disabled or absent policy uses the legacy `enable_automated_returns` path. No request/approval outcome exists in the current policy.
* A blocked item remains listed in the Return Order dialog but is not selectable. The backend returns a reason code; the current customer item message is generic. The entire venue-policy order may still expose Return order so the customer can read the block.
* Absolute and relative cutoffs block at or after the cutoff instant; item/session timing uses a ticket-type custom start when present, otherwise the event start. Manually closed blocks.
* Mixed-order rules provide independent selection, require the whole remaining order, or block when any remaining item is ineligible. Already refunded items do not count as remaining. The backend also checks owner, paid/payment status, barcode activation, fulfillment, and scan status.
* The preview and return endpoints re-evaluate the same selection. A direct request cannot safely substitute a foreign, duplicate, or omitted selection; those API-only permutations belong in automated coverage.

## State-space / Setup Matrix

| Axis | States | Cases |
| --- | --- | --- |
| Policy and item | On/off ticket or product; automatic/blocked outcome | TC-1, TC-2 |
| Cutoff | Absolute, event-relative, item-relative, manually closed | TC-3 |
| Mixed order | Whole remaining, block if any ineligible | TC-4, TC-5; independent selection is accepted in the completion card. |
| Restriction | Visible barcode, fulfilled product, checked-in ticket | TC-6 |
| Legacy and owner | Disabled new policy; a different customer | TC-7, TC-8 |

## Recommended Test Data

* Use a published future event, a paid card order owned by the customer, and ticket types whose **Basic info → Allow customer-initiated refunds** switch can be changed. Use new orders for any state that cannot be safely reset. Record the order transaction ID from My Orders.
* In Admin → Venue customer refund policy, find the organization's record or Add → select Venue → Save. An employee with **Manage Organization Info** sets the required policy values in Dashboard → Organization → Organization settings → Customer refunds. The separate policy record is not on Admin → Venue.
* For Product, an employee with **Manage Marketplace** on a non-Basic organization creates/selects a priced product, enables **Availability → Checkout add-ons → Add to event checkout process** for the event, and edits **Fulfillment → Allow customer-initiated refunds**. Purchase it with a ticket on the event's public checkout.
* Record original settings before changing them. No case here submits a customer refund; preserve orders and restore settings after the run.

## Qase-ready Manual Test Cases

In these cases, an item is **returnable** when the customer is allowed to select it in **Return order**. The organization-wide Customer refunds page and each ticket type or product's **Allow customer-initiated refunds** choice both affect that result. A **cutoff** is the last time a customer may request a refund.

### TC-1: My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it

**Description:** A customer buys a ticket or product whose **Allow customer-initiated refunds** choice is off. They cannot select it in **Return order**. After an employee turns that choice on and saves, the same purchase becomes selectable without changing the organization settings.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| ItemType | Purchased order and employee edit location |
| --- | --- |
| TicketType | One paid ticket; event → Tickets → Edit ticket type → Basic info. |
| Product | One paid ticket plus one product offered during that event's checkout; Build → Products → All products → select product → Fulfillment. |

**Tags:** my-orders, refunds

**Parameters:**
ItemType: TicketType, Product

**Preconditions:**

* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**.
* For TicketType, an employee with **Manage Events** saves **Allow customer-initiated refunds = off** on the purchased ticket type. For Product, an employee with **Manage Marketplace** creates or selects a priced product on a non-Basic organization, sets **Availability → Checkout add-ons → Add to event checkout process** for the event, and saves its **Fulfillment → Allow customer-initiated refunds = off**. Keep the accompanying ticket's switch off so only the product can become selectable.
* The customer buys the order described by ItemType with a refundable card payment. Record its transaction and the original item switch; do not refund the order.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the purchasing customer, open Account → My Orders and select the purchased order's Return order action. | Ticket or product from the chosen row | The purchased item is listed but cannot be selected; a message says it cannot be returned. |
| As the employee, open the item edit location from the ItemType table. | Purchased item | Allow customer-initiated refunds is off. |
| Turn on Allow customer-initiated refunds. |  | The item switch is on. |
| Select Save. |  | The item change is saved. |
| As the customer, reload the same order and select Return order. | Recorded transaction | The purchased item is now selectable while the policy remains enabled. |
| Select the newly returnable item. |  | A refund amount greater than zero appears for that item alone; no refund is submitted. |
| Select Cancel. |  | The order remains paid and no item is marked returned. |

**Postconditions:**

* Restore the item switch and policy values, save, and reopen them. Keep the paid order unrefunded.

### TC-2: My Orders - Refunds - Block a customer return when the organization outcome is blocked

**Description:** A paid ticket has **Allow customer-initiated refunds** on, but the organization has chosen **Customers cannot initiate refunds**. The customer must not be able to select the ticket or see a refund amount.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on** and **Customer outcome = Customers cannot initiate refunds**; record prior values.
* An employee with **Manage Events** saves **Allow customer-initiated refunds = on** for a future event ticket type. The customer buys one paid, unscanned ticket with a refundable card payment and records the transaction.

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

* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, and the **Cutoff type** from the chosen row; record its original settings.
* An employee with **Manage Events** prepares the future event and ticket timing from the row, turns **Allow customer-initiated refunds = on** in ticket Basic info, and saves. The customer buys one paid ticket with a refundable card payment before the cutoff is applied; record the order.
* Use an unscanned, untransferred ticket and keep barcode delivery, fulfillment, and check-in restrictions from independently blocking it.

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

### TC-4: My Orders - Refunds - Require both tickets in a whole-order return

**Description:** A customer bought two tickets in one order, and both can be returned. When the organization chooses **Require the whole remaining order**, the customer cannot return only one ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Require the whole remaining order**; record prior settings.
* An employee with **Manage Events** turns on **Allow customer-initiated refunds** for two ticket types. The customer buys one paid ticket of each type in the same refundable card order; both remain unscanned and unreturned.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and select Return order for the two-ticket order. | Purchased order | Both tickets are included in the return selection. |
| Try to deselect one ticket. |  | Individual selection is unavailable while the whole-order rule is active. |
| Read the preview. |  | The quantity and amount cover both tickets, not one. |
| Select Cancel. |  | Both tickets remain paid; no refund or credit is created. |

**Postconditions:**

* Restore the original policy and ticket switches; leave the order unrefunded.

### TC-5: My Orders - Refunds - Block an order when one ticket cannot be returned

**Description:** A customer bought two tickets in one order. One ticket has **Allow customer-initiated refunds** off. When the organization chooses **Block when any remaining item is ineligible**, the customer cannot return either ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Block when any remaining item is ineligible**; record prior settings.
* An employee with **Manage Events** turns on **Allow customer-initiated refunds** for one ticket type and off for another. The customer buys one paid ticket of each type in one refundable card order; record the transaction.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and select Return order for the mixed order. | Purchased order | The dialog explains that an ineligible item blocks the order; neither ticket can be submitted for return. |
| Close the dialog. |  | No return is submitted. |
| Reopen the order. |  | Both tickets remain paid and neither is marked returned; no refund or credit exists. |

**Postconditions:**

* Restore policy and ticket switches; leave the order unrefunded.

### TC-6: My Orders - Refunds - Block or allow returns after barcode delivery, fulfillment, or check-in

**Description:** Check a ticket whose barcode was delivered, a product marked fulfilled, or a checked-in ticket. The organization setting for that state must decide whether the customer can select the purchase in **Return order**. No refund is submitted.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| RestrictedState | Prepare the purchased item |
| --- | --- |
| DeliveredBarcode | Use a paid standard-barcode ticket whose barcode is visible in My Orders; do not use a customer-activation ticket. |
| FulfilledProduct | In an organization above the Basic plan, add a paid product to an event checkout. As an employee who can use the order's Fulfillment action, open Dashboard → Transactions → the order → Fulfillment, mark the product Fulfilled, and save. |
| CheckedInTicket | Use an event with Check in available and an employee with **Scan Tickets**; open the event's **Check in** and scan the paid ticket once. |

| RestrictedState | Policy field |
| --- | --- |
| DeliveredBarcode | After barcode delivery |
| FulfilledProduct | After fulfillment or shipping |
| CheckedInTicket | After check-in or scan |

**Tags:** my-orders, refunds, edge-case

**Parameters:**
RestrictedState: DeliveredBarcode, FulfilledProduct, CheckedInTicket

**Preconditions:**

* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = on**, **Customer outcome = Customers can self-refund automatically**, **Cutoff type = No cutoff**, and **Orders with mixed eligibility = Refund eligible items independently**; record prior settings.
* An employee with **Manage Events** or **Manage Marketplace** enables **Allow customer-initiated refunds** on the purchased ticket/product. Prepare a paid, refundable-card order and the selected restriction state using the table; keep all other restrictions set to **Allow customer refunds**.
* Before the customer check, save the selected policy field as **Block customer refunds**. Record the order, item status, and previous policy values. For a fulfilled product, keep the accompanying ticket's refund switch off so the product is the only candidate after the policy changes.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and select Return order for the prepared order. | Chosen barcode, fulfillment, or check-in row | The purchase is listed but cannot be selected; a message says it cannot be returned. |
| As the employee, open Organization → Organization settings → Customer refunds. | Policy field in the table | Block customer refunds is shown for the selected restriction. |
| Change that field to Allow customer refunds. |  | The new choice is shown. |
| Select Save. |  | Customer refund policy saved appears. |
| As the buyer, reload the same order and select Return order. |  | The purchase is selectable and a refund amount greater than zero appears. |
| Select Cancel. |  | No return is submitted; the item retains its delivered/fulfilled/checked-in state. |

**Postconditions:**

* Restore policy and item switches. Preserve the checked-in or fulfilled test item if reversing that state would change operational history; do not submit a refund.

### TC-7: My Orders - Refunds - Keep existing customer returns working when the new policy is off

**Description:** An organization already allows customer returns through its older **Enable automated returns** Venue setting. With the new **Enable customer refund policy** setting off, the customer must still see the return option for a qualifying ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds

**Preconditions:**

* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. An employee with **Manage Organization Info** saves **Enable customer refund policy = off**; record the previous value.
* In Showpass Admin → Venue, an authorized administrator sets **Enable automated returns = on**, **Automated return window = 0**, and **Automated return medium = Organizer Credit**; record the original values. These older Venue settings are separate from the new Customer refunds page.
* An employee with **Manage Events** prepares a paid ticket type with delayed barcode delivery whose barcode has not yet been released, leaves **Allow customer-initiated refunds = off**, and sells one ticket to the customer with a refundable card payment.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the buyer and open Account → My Orders. | Purchased order | The paid order appears. |
| Open Return order. |  | The ticket can be selected even though the new organization policy and ticket setting are off. |
| Review the refund preview. |  | A refund amount greater than zero is shown. |
| Select Cancel. |  | No refund is submitted. |

**Postconditions:**

* Restore the original policy, Venue settings, and item switch. Leave the order unrefunded.

### TC-8: My Orders - Refunds - Keep another customer from opening or returning an order

**Description:** A signed-in customer who did not buy an order cannot find it in My Orders or use another customer's order link to see its details or request a refund.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, authenticated-user

**Preconditions:**

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

## Risk Areas and Coverage Accounting

| Risk | Status | Evidence / next proof |
| --- | --- | --- |
| Customer item/policy/cutoff/mixed/restriction selection | Manual-only | TC-1–TC-6; execute on the deployed code before marking passed. |
| Legacy compatibility and order ownership | Manual-only | TC-7–TC-8. |
| Direct API bypass, foreign or duplicate item IDs, invalid payment and invoice states | API/backend verification | Current validator and API tests cover examples; run and extend them before release. |
| Package parent/child selection | Deferred to focused automated/API and manual setup | The service checks descendants and blocks independent child selection; a realistic package order needs a separate fixture. |
| Specific customer-facing blocked-reason wording | Product-expectation question | Distinct backend codes currently map to generic item copy in My Orders. |
| Request/approval mode | Not applicable to current model | Only automatic and blocked outcomes exist. |
| Venue shipping/fee amount rules; separate delayed-barcode opt-in | Blocked by local source | Tracked in [[SPW-19669-customer-refund-amount-rules-test-cases]] and [[SPW-19670-delayed-barcode-self-refund-test-cases]]. |

## Minimum Execution Set

Run TC-1 for TicketType and Product, TC-2, all TC-3 cutoff rows, TC-4–TC-5, each available TC-6 restriction, TC-7, and TC-8. Record unavailable state preparation as blocked, not passed.

## Suggested Automated Coverage

Cover exact cutoff boundaries and timezones; all item and mixed-order variants; barcode/fulfillment/scan status; ownership and unsupported payment; item/package descendants; preview/POST parity; and no refund record or credit on rejection. Verify a policy/item change after an eligibility read does not bypass the locked return recheck.

## Assumptions and Unknowns

* The local checkout contains eligibility code, but its deployed revision and test records were not verified. All cases are drafts.
* The item message is generic even when the backend reason code is specific. Do not infer a more detailed customer explanation from Jira.
* The separate delayed-barcode venue field and venue shipping/fee policy fields were not present locally; their behavior is not asserted here.

## Open Questions

1. Should the customer see precise reasons for item flag, barcode, shipping, and scan blocks, or is the current generic item message accepted?
2. Which product and package purchase variants must be accepted manually beyond the ticket and checkout add-on cases?
3. Which deployed build and preparation accounts will be used for fulfillment and check-in states?
