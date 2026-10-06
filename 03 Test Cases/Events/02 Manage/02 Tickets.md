---
title: Event — Tickets
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Tickets

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Page coverage and source notes

Separate the ticket table/editor from event-wide settings. SPT-758–760 cover pricing/PWYC; SPT-766/768/770 cover inventory and historical pricing; SPT-4063/4875 cover sale windows and visibility; SPT-4384 covers waitlist setup; SPT-3275–3278 cover delivery. The event-wide cap and PDF settings below are not ticket-type fields.

Sources: [event validation and nested saves](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [ticket validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/ticket_types.py>), [event-wide settings](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/event-settings/event-ticket-settings-fields.ts>), [ticket requirement control](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/list/EventTicketTypesPageSections.web.tsx>).

## New local cases

### TC-17: Dashboard - Tickets - Add and remove an unsold ticket type

**Description:** An employee adds a ticket type, saves it, removes it, and confirms other ticket types are unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for an owned single event created for testing with no sales.
* The event has an existing General Admission ticket; record its name, inventory and price.
* No ticket named Added Admission exists, and no package or seating configuration will reference the new ticket.

**Postconditions:** Only Added Admission is removed; the original General Admission ticket remains unchanged.

**Tags:** dashboard, tickets, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → Add ticket type. | | One new ticket row is available. |
| Fill in the new row. | **Name:** Added Admission; **Inventory:** 30; **Price:** 20.00; **Visibility:** Public | The row displays the entered values. |
| Select Save. | | Saving succeeds. |
| Leave and reopen Tickets. | | Added Admission appears once with inventory 30, price 20.00 and Public visibility. |
| Use the remove action on Added Admission. | **Target:** only Added Admission | That ticket is marked for removal or removed from the unsaved list. |
| Save and confirm removal if prompted. | | Removal succeeds for the unsold ticket. |
| Leave and reopen Tickets. | | Added Admission is absent and General Admission retains its recorded values. |

### TC-18: Dashboard - Tickets - Handle unsaved list changes before opening a ticket editor

**Description:** Opening a ticket's detailed editor does not silently save or discard changes made in the ticket list.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event with an unsold standard ticket type.
* Record that ticket's original name and inventory.

**Postconditions:** Restore the ticket's original name, save and reopen Tickets; inventory remains unchanged.

**Tags:** dashboard, tickets, edge-case

**Parameters:**

DialogChoice: Cancel, DiscardChanges, SaveAndContinue

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets and edit the ticket's name in the list without saving. | **Name:** append Updated | The list displays an unsaved change. |
| Open that ticket's detailed edit action. | | A dialog asks about saving list changes before editing the ticket. |
| Select the chosen DialogChoice. | **Cancel:** Cancel; **DiscardChanges:** Discard changes; **SaveAndContinue:** the save-and-continue action | Cancel keeps the unsaved list open; Discard changes opens the editor with the original name; saving first opens it with the updated name. |
| Return to Tickets and reload the page, discarding any remaining unsaved change. | | Only SaveAndContinue retains Updated; Cancel and DiscardChanges leave the original saved name. |
| Inspect the ticket inventory. | **Inventory:** recorded original value | The inventory is unchanged in every scenario. |

### TC-5: Dashboard - Tickets - Enforce the total event inventory across ticket types

**Description:** Two individually available ticket types share one event-wide limit; a customer cannot reserve more than that combined limit.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned, published future single event created for testing, with no orders or reservations.
* The event has two public standard ticket types, each with inventory 10, sales open now, and purchase limits permitting three tickets.
* The event is not available to real customers during this test; use a customer session under your control.
* Record the original Total Event Inventory value.

**Postconditions:** Empty the customer's basket; restore the original event inventory, save and reopen Tickets. Do not complete a purchase.

**Tags:** dashboard, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → event settings. | | Both ticket types and Total Event Inventory are available. |
| Set Total Event Inventory. | **Limit:** 2 | The event-wide limit is 2; both ticket-type inventories remain 10. |
| Save the event settings. | | Saving succeeds. |
| Leave and reopen Tickets. | | The event-wide limit remains 2 and both individual inventories remain 10. |
| Open View Event in the customer session and add one of each ticket type. | **Ticket A:** 1; **Ticket B:** 1 | The basket accepts two tickets in total. |
| Try adding one more of either ticket type. | **Requested total:** 3 | The event capacity prevents the additional ticket, even though the individual type has stock. |
| Remove all tickets from the basket. | | The basket is empty; no order or payment was created. |

### TC-6: Dashboard - Tickets - Save event-wide ticket messages and check the downloaded ticket

**Description:** Event-wide PDF terms and the custom message survive saving and appear on a newly issued electronic ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for a published future single event created for testing.
* It has one public free ticket type with inventory 5, electronic delivery, sales open, and no ticket-specific message or terms override.
* Use an email address under your control and record the original event PDF terms and message.

**Postconditions:** Restore the original PDF text and save. Keep the free order identified for review; do not delete the event or order to hide the issued ticket.

**Tags:** dashboard, tickets, post-purchase

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → event settings. | | Ticket PDF Terms & Conditions and Ticket PDF Custom Message are available. |
| Enter both messages. | **Terms:** Bring this ticket to the entrance.<br>**Custom message:** Entrance opens at 18:30. | Both fields show the entered text. |
| Save the event settings. | | Saving succeeds. |
| Reopen event settings. | | Both exact messages remain saved. |
| Open View Event in the customer session and obtain one free ticket. | **Quantity:** 1; **Email:** controlled inbox | One order containing the intended event ticket is completed without a payment charge. |
| Download the ticket PDF from the order confirmation. | | The PDF identifies the correct event and displays both saved messages. |

### TC-7: Dashboard - Tickets - Save and clear the event inventory display settings

**Description:** Inventory display choices and default sale timing remain saved independently of individual ticket settings.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event with no sales, two ticket types of inventory 10 each, and no total-event override.
* The organization has low_inventory_warning_enabled enabled; record the current event settings.
* One ticket type uses the event's default sale end and the other has a custom sale end; record both.

**Postconditions:** Restore the recorded event settings and verify that the ticket type's custom sale end was not changed.

**Tags:** dashboard, tickets, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → event settings. | | Inventory display and default sale-end controls are available. |
| Select Enable Threshold Displays and set Show Remaining Tickets. | **Amount:** 5 | Both selected values are shown. |
| Choose a different Default End Sale Time. | **Choice:** select a listed choice different from the recorded one and record its label | The new default is shown. |
| Save, leave and reopen event settings. | | All three selected settings are retained. |
| Open the ticket type with a custom sale end. | **Ticket:** the type identified in Preconditions | Its custom sale-end value is unchanged. |
| Clear Show Remaining Tickets and select Disable Threshold Displays. | **Amount:** empty | The amount is blank and threshold displays are disabled. |
| Save, leave and reopen event settings. | | The amount remains blank and threshold displays remain disabled. |

### TC-8: Dashboard - Tickets - Change an unsold event to admission without tickets

**Description:** Turning on Tickets not required changes the event to admission without ticket purchasing; it does not create an order or an admission ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for a published single event created solely for this test, with one public free ticket type and no orders or sales.
* No real customer uses the event; record its original ticket setup.

**Postconditions:** Keep the event identified for review; do not apply this transition to an event with customers. Restore ticket-required admission and its recorded ticket setup only if the event will be reused.

**Tags:** dashboard, events, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → Ticket requirement settings. | | Tickets not required is off and the explanation describes the ticketing features that would no longer be used. |
| Turn on Tickets not required and select Done. | | The page switches to its no-ticket state. |
| Select Save. | | Saving succeeds. |
| Leave and reopen Tickets. | | Tickets not required remains on. |
| Open View Event in the customer session. | | The event explains that admission is free without tickets and does not offer a ticket-purchase flow. |

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-758](https://app.qase.io/case/SPT-758) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-759](https://app.qase.io/case/SPT-759) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-760](https://app.qase.io/case/SPT-760) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-766](https://app.qase.io/case/SPT-766) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-768](https://app.qase.io/case/SPT-768) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-770](https://app.qase.io/case/SPT-770) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-4063](https://app.qase.io/case/SPT-4063) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-4384](https://app.qase.io/case/SPT-4384) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-4875](https://app.qase.io/case/SPT-4875) | Ticket Types (83) | Existing case preserved; migration notes below apply |
| [SPT-3275](https://app.qase.io/case/SPT-3275) | Delivery Settings (448) | Existing case preserved; migration notes below apply |
| [SPT-3276](https://app.qase.io/case/SPT-3276) | Delivery Settings (448) | Existing case preserved; migration notes below apply |
| [SPT-3277](https://app.qase.io/case/SPT-3277) | Delivery Settings (448) | Existing case preserved; migration notes below apply |
| [SPT-3278](https://app.qase.io/case/SPT-3278) | Delivery Settings (448) | Existing case preserved; migration notes below apply |

### SPT-758: Dashboard - Ticket Types - Create and update an active price tier

**Description:**

Validates that a venue using price tiers creates an active tier for a new ticket type and uses a new current tier after its price changes.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** An organizer can edit a future published event at a venue with price tiers enabled. The test ticket type has no sales.

**Postconditions:** Remove the test no-sales ticket type or restore the test setup.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Ticket Types** for the future event and add a ticket type. | `QA Tier <unique suffix>`; price `20.00`; inventory `30`; Public | The new ticket row accepts all values. |
| Save the event once. | None | The ticket type is created with a current active price of `20.00`. |
| Return through **Manage Events** and reopen the ticket type. | Test ticket type | Name, inventory, visibility, and current price persist after a fresh read. |
| Open the public ticket selection. | Same event | The ticket type is available at `20.00` before fees and taxes. |
| Change the price to `25.00` and save once. | New price `25.00` | The edit succeeds and `25.00` becomes the current active price. |
| Reopen Dashboard and public ticket selection. | Same ticket type | Both surfaces show `25.00`; the prior tier is not presented as the current buyer price. |

### SPT-759: Dashboard - Ticket Types - Assign a Pay What You Can configuration

**Description:**

Validates the actual PWYC workflow: a ticket type selects an existing named configuration or creates a new one. A simple enable toggle is not the current product contract.

| ConfigurationSource | Setup |
| --- | --- |
| ExistingConfiguration | Select an existing venue-owned configuration. |
| NewConfiguration | Create `QA PWYC <unique suffix>` with preset amounts `10.00`, `20.00`, `30.00`, Allow free tickets off, and a short description. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The `use_pwyc_configuration` switch is enabled; the organizer can edit a future public ticket type; the venue has an existing configuration for the first parameter.

**Postconditions:** Unassign the test configuration; remove a newly created configuration only when no other ticket type uses it.

**Tags:** dashboard, tickets, pwyc

**Parameters:**

ConfigurationSource: ExistingConfiguration, NewConfiguration

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket type's advanced editor and select **Pay What You Can**. | Public ticket type | **Select Configuration** and configuration details are shown. |
| Complete the setup for `ConfigurationSource`. | Selected row | A venue-owned configuration is selected or the new configuration is created successfully. |
| Save the ticket type once. | None | The selected configuration is assigned to the ticket type. |
| Return through **Manage Events** and reopen the same PWYC tab. | Same ticket type | The assigned configuration and its preset amounts persist. |
| Open buyer ticket selection and choose the PWYC ticket. | Same event | The configured amounts and description are available; a free amount is unavailable because Allow free tickets is off. |

### SPT-760: Dashboard - Ticket Types - Add, edit, and remove PWYC preset amounts

**Description:**

Validates the complete preset-amount lifecycle on one test PWYC configuration and proves that the assigned ticket type reflects the final saved choices.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A test PWYC ticket type uses a configuration containing `10.00`, `20.00`, and `30.00`; no other ticket type uses this configuration.

**Postconditions:** Restore the original three amounts or remove the test configuration.

**Tags:** dashboard, tickets, pwyc

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Pay What You Can** for the test ticket type. | Assigned configuration | The three recorded preset amounts are shown. |
| Add one preset amount. | `40.00` | The fourth amount appears and no more than five options are allowed. |
| Change one existing amount. | `20.00` to `25.00` | The edited amount is accepted without changing the other options. |
| Remove one existing amount. | Remove `10.00` | Only the selected amount is removed. |
| Save or update the configuration and confirm the shared-configuration warning if shown. | Final amounts `25.00`, `30.00`, `40.00` | The final configuration saves once. |
| Reopen the ticket type and buyer ticket selection. | Same event | Both surfaces show the final three amounts and no removed `10.00` option. |

### SPT-766: Dashboard - Ticket Types - Increase inventory and restore buyer availability

**Description:**

Validates that increasing a sold-out ticket type's inventory persists and makes the newly available quantity selectable on the chosen sales surface.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:** The selected future ticket type has inventory `10`, ten completed sales, and shows Sold Out on the parameterized platform. The organizer can edit inventory.

**Postconditions:** Release any unpurchased basket hold. Retain the increased inventory or restore it only when doing so cannot reduce inventory below tickets sold.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Confirm the ticket type is sold out on Web Public and Web Box Office. | Inventory `10`; sold `10` | Neither sales surface allows another ticket to be selected. |
| Open the ticket type in Dashboard and increase inventory. | `10` to `15` | The new inventory is accepted and remains greater than tickets sold. |
| Save once and reopen the ticket type through **Manage Events**. | Same ticket type | Inventory `15` persists; sold count remains `10`; five are available. |
| Refresh Web Public and Web Box Office. | Same event | The ticket type is no longer Sold Out on either surface and exposes up to five available tickets. |
| Add one ticket to a basket on each surface without completing purchase. | Quantity `1` per basket, one surface at a time | Each surface can hold one newly available ticket and reports availability consistently. |
| Remove each held ticket before moving to the next surface. | Same baskets | Every temporary hold is released and availability returns. |

### SPT-768: Dashboard - Ticket Types - Preserve prior order pricing after a price change

**Description:**

Validates both sides of one price change: a completed order keeps the amount paid, while a later buyer receives the new current price. The previous `TicketTypeSaleState` parameter is removed because both observations are required in the same run.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future public ticket type costs `20.00`; one completed order for one ticket exists at `20.00`; a second purchase can be completed after the edit.

**Postconditions:** Retain both test orders for financial audit or void/refund them according to the environment's approved cleanup process.

**Tags:** dashboard, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record the first completed order and its ticket price. | Order A; one ticket at `20.00` before fees/taxes | Order A shows the original paid price and total. |
| Change the ticket type price in Dashboard. | `20.00` to `25.00` | The new price is accepted. |
| Save once and reopen the ticket type. | Same ticket type | Current price `25.00` persists. |
| Reopen Order A in Transactions. | Recorded order | Its ticket line and financial total still use `20.00`; no historical amount was rewritten. |
| Complete a second one-ticket purchase. | Order B | Order B charges the current `25.00` price before fees/taxes. |
| Compare both orders and the current ticket type. | Orders A and B | Historical and current prices remain independently correct. |

### SPT-770: Dashboard - Recurring Ticket Types - Protect sold-child pricing

**Description:**

Validates sold and unsold children together because the regression is the contrast between them. The previous parameter is removed: one child has a sale, a sibling has none, and a parent price update must not corrupt the sold child's historical price.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A recurring parent has two future children and a propagated ticket type at `20.00`; Child A has one completed sale; Child B has no sales.

**Postconditions:** Retain the order for audit. Restore allowed no-sales pricing when needed.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record Child A's completed order and both child ticket prices. | Child A sold; Child B unsold; `20.00` | The baseline distinguishes the sold and unsold child. |
| Open the parent ticket type and change its price. | `20.00` to `25.00`; use the visible propagation control when required | The parent update is accepted without claiming that historical purchases changed. |
| Reopen the parent and both child ticket types. | Same series | Parent and allowed unsold-child current pricing reflect `25.00`; sold-child behavior follows its price-lock rules. |
| Reopen Child A's completed order. | Recorded order | The purchased ticket remains `20.00` with its original financial totals. |
| Open buyer selection for Child A and Child B. | Both child dates | Current selectable prices match the saved price-lock/propagation state; no child has an invalid or missing price. |

### SPT-4063: Dashboard - Ticket Types - Flip visibility to Public at the scheduled time

**Description:**

Validates the timezone-sensitive transition from Hidden or Visible to Sellers into Public visibility. Assertions are required immediately before and after the scheduled instant.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future published single or recurring event has a public ticket type; the tester can observe time in the chosen timezone and wait through a short scheduled transition.

**Postconditions:** Restore Public visibility and remove any test schedule.

**Tags:** dashboard, tickets, events

**Parameters:**

EventShape: SingleEvent, RecurringEvent
TimezoneContext: VenueTimezone, AlternateTimezone
StartingVisibility: Hidden, SellersOnly

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open advanced settings for the target ticket type. | `EventShape`; `TimezoneContext` | Visibility controls use the event's displayed timezone. |
| Select `StartingVisibility`. | Hidden or Visible to Sellers | **Schedule Visibility Flip to Public** becomes available. |
| Schedule the flip shortly in the future and record the exact displayed time and timezone. | At least two minutes ahead | The future timestamp is accepted unambiguously. |
| Save once and reopen the ticket type. | Same event | Starting visibility and scheduled timestamp persist. |
| Before the scheduled instant, refresh normal public ticket selection. | No seller link | The ticket is not publicly selectable. |
| After the scheduled instant, refresh again. | Recorded time reached | The ticket is Public and selectable without a manual Dashboard save. |
| For `RecurringEvent`, inspect one affected child. | Child occurrence | The child visibility is consistent with the recurring ticket propagation rule. |

### SPT-4384: Dashboard - Ticket Types - Save one waitlist setting

**Description:**

Validates one waitlist setting per run. This corrects the current mismatch between the Qase parameter `Configure` and the undefined step reference `@WaitlistConfiguration`.

| WaitlistSetting | Test Value |
| --- | --- |
| CardVerificationRequired | Require credit-card verification on. |
| CardVerificationNotRequired | Require credit-card verification off. |
| PurchaseLimit | Limit `2`. |
| CutoffTime | Future cutoff before the event starts. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue has waitlist/resale enabled; a future event has a sold-out or waitlist-eligible ticket type; the organizer can edit it.

**Postconditions:** Restore the recorded waitlist configuration.

**Tags:** dashboard, tickets, waitlists

**Parameters:**

WaitlistSetting: CardVerificationRequired, CardVerificationNotRequired, PurchaseLimit, CutoffTime

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the target ticket type and enable Waitlist. | Waitlist-eligible ticket | Waitlist settings become editable. |
| Apply only the value for `WaitlistSetting`. | Selected table row | The selected control displays the exact test value. |
| Save once. | None | The ticket type saves successfully. |
| Return through **Manage Events** and reopen the same ticket type. | Same event and ticket | Waitlist remains enabled and the selected value persists. |
| Reopen the waitlist customer entry surface when available. | Same ticket type | The saved requirement or limit is reflected without exposing a contradictory value. |

### SPT-4875: Dashboard - Ticket Types - Enforce one sales-window or visibility state

**Description:**

Validates one buyer-availability state per run instead of reconfiguring the same ticket through every state regardless of the selected parameter.

| TicketAvailabilityState | Setup | Expected Normal Public Access |
| --- | --- | --- |
| SalesNotStarted | Sale starts two hours in the future; Public | Not purchasable before start. |
| OnSalePublic | Current time inside sale window; Public | Visible and purchasable. |
| SalesEnded | Sale ended one hour ago; Public | Not purchasable after end. |
| Hidden | Current sale window; Hidden | Not visible. |
| SellersOnly | Current sale window; Visible to Sellers | Hidden normally; available through an authorized seller link. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future published event has a no-sales test ticket type; seller access exists for `SellersOnly`.

**Postconditions:** Restore the ticket type to a safe Public/current-sale state or remove it if it has no sales.

**Tags:** dashboard, tickets, events

**Parameters:**

TicketAvailabilityState: SalesNotStarted, OnSalePublic, SalesEnded, Hidden, SellersOnly

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open advanced settings for the test ticket type. | Selected event | Sale-window and visibility controls are available. |
| Apply the exact setup for `TicketAvailabilityState`. | Selected table row; event timezone | The form shows the intended dates and visibility. |
| Save once and reopen the ticket type through **Manage Events**. | Same ticket type | The selected state persists after a fresh read. |
| Open normal public ticket selection. | Same event | Availability matches the table's normal-public expectation. |
| For `SellersOnly`, open the authorized seller link. | Approved seller link | The ticket is available through seller access while remaining unavailable normally. |
| Attempt only an allowed ticket selection. | Quantity `1` when available | Available states allow selection; unavailable states expose no active purchase action. |

### SPT-3275: Dashboard - Ticket Types - Configure E-ticket delivery

**Description:** Validates E-ticket as the only delivery method, including its source-backed configurable Handling Fee. The previous claim that E-ticket cannot have a handling fee is removed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket type's **Delivery & Transfers** tab. | No-sales ticket type | E-ticket, Delivery, and Will Call methods are available. |
| Select E-ticket only and set its Handling Fee. | E-ticket on; Delivery off; Will Call off; fee `1.00` | The E-ticket fee and fee method are editable. |
| Save once and reopen the tab through **Manage Events**. | Same ticket | E-ticket-only and `1.00` persist after a fresh read. |
| Add the ticket in buyer checkout. | Quantity `1` | E-ticket is the only delivery choice and its handling fee is included once as configured. |

### SPT-3276: Dashboard - Ticket Types - Configure Delivery with a shipping fee

**Description:** Validates Delivery as the only method with its Shipping & Handling Fee.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration and release the test basket.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | Delivery options are editable. |
| Select Delivery only and configure its fee. | E-ticket off; Delivery on; Will Call off; Shipping & Handling Fee `5.00` | Delivery and `5.00` are accepted. |
| Save once and reopen the same tab. | Same ticket | Delivery-only and `5.00` persist. |
| Add the ticket in buyer checkout. | Quantity `1` | Delivery is the only method, a shipping address is requested, and `5.00` is applied according to the saved fee method. |

### SPT-3277: Dashboard - Ticket Types - Configure Will Call with a handling fee

**Description:** Validates Will Call as the only delivery method with its Handling Fee.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping/delivery controls; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration and release the basket.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | Delivery methods are editable. |
| Select Will Call only and configure its fee. | E-ticket off; Delivery off; Will Call on; Handling Fee `2.00` | Will Call and `2.00` are accepted. |
| Save once and reopen the tab. | Same ticket | Will Call-only and `2.00` persist. |
| Add the ticket in buyer checkout. | Quantity `1` | Will Call is the only method and `2.00` is included according to the saved fee method. |

### SPT-3278: Dashboard - Ticket Types - Offer multiple delivery methods

**Description:** Validates that E-ticket, Delivery, and Will Call can coexist and retain independent fees.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery settings and release all baskets.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | All three methods are available. |
| Enable all delivery methods and enter distinct fees. | E-ticket `1.00`; Delivery `5.00`; Will Call `2.00` | Each fee remains associated with its own method. |
| Save once and reopen the tab. | Same ticket | All methods and fees persist after a fresh read. |
| Add the ticket in buyer checkout and inspect the method selector. | Quantity `1` | All three named methods are available. |
| Select each method one at a time. | E-ticket, Delivery, Will Call | The order total uses `1.00`, `5.00`, or `2.00` for the selected method without combining unrelated fees. |
