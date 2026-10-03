---
title: Test Holds Waitlist Fulfillment and Guestlist Check In
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test Holds Waitlist Fulfillment and Guestlist Check In

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## Choose the actual workflow

A **Hold** reserves items for a supported sales workflow. A **Waitlist** records demand and may later allocate and purchase available items. A **Guestlist** booking records a party's arrival/approval and Check In. These are not interchangeable reservations or admission tickets.

Use independent owned data for each workflow. Start with ordinary General Admission. Assigned Seating Waitlist support is narrower and must be verified from the actual supported path.

## Hold → Customer purchase or release

Prepare an isolated Event/Ticket Type, finite available Inventory, supported Hold type, owning Employee/Customer, expiry, fees, and permitted conversion/release. Record whether it is an ordinary basket, Employee Hold, or Waitlist fulfillment Hold.

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the permitted Venue Employee, create the Hold through the supported Box Office flow and open Holds. | Known quantity and expiry/recipient | Held items, owner, and expiry are saved; availability changes by the configured rule. |
| 2 | As the designated Customer or Employee, use the supported purchase/conversion flow. | Original Hold, approved payment | Held selection becomes one usable order with one payment and no second Inventory deduction. |
| 3 | For a separate Hold, use the supported release/cancel action or wait for actual expiry. Reopen Holds and the Event. | Independent held quantity | Final Hold state is clear and the intended Inventory can actually be bought again. |

Test partial conversion/splitting only when that Hold/client supports it. Compare item identity, remaining quantity, expiry, recipient, and money; a remaining Hold is not a duplicate sale.

## Waitlist join → Inventory available → final Customer result

Prepare an enabled Waitlist with known limits, queue/selection rules, two controlled Customers, supported payment setup, and one unit of released Inventory. Confirm the applicable UI flag and Ticket Type support before setting it up.

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the Organizer, configure the eligible Ticket Type's Waitlist and save/reopen it. | Actual Waitlist limits and purchasing rules | The published Event offers the correct Waitlist behavior. |
| 2 | As each Customer, join through the actual Waitlist checkout flow. | Known order of joins and quantities | Each enrollment is saved once with correct eligibility/contact/payment setup. Joining is not proof of a completed ticket sale. |
| 3 | Through the supported Organizer action, make the one prepared unit available. | Isolated test Inventory | Fulfillment considers the recorded queue/selection and eligibility rules. Do not assume simple first-in-first-out universally. |
| 4 | Wait for the selected Customer's real final result. Reopen both Customer records and Employee Transactions. | Original enrollment/payment references | Correct Customer is fulfilled once, with one known payment and usable ticket; the other Customer's status is accurate. |
| 5 | In separate runs, cancel enrollment, fail payment, or let the fulfillment Hold expire. | Approved test scenarios | Queue, recovery, released Inventory, and notifications follow the actual rule without duplicate charge or stranded capacity. |

Use backend/sandbox tests for competing fulfillment workers, duplicate updates, simultaneous release, and expiry during processing. A job “completed” message is not proof every subscriber received the correct result.

## Guestlist request → approval → arrival

Prepare the Venue's supported Guestlist/Widget configuration, booking reason, date/timezone, party size/capacity, approved test email, Employee authority, and Check In category. Customer-facing bookings and staff bookings can have different capacity rules.

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the Customer, submit through the actual Guestlist Widget; separately, as Employee, use Guestlists → New guestlist and Submit Guestlist when supported. | Controlled contact, arrival date/time, party size and reason | A correct booking is saved with the intended Pending/Approved state. This does not issue an Event ticket. |
| 2 | As the authorized Employee, approve one Pending booking and reject a separate booking. Leave and reopen each. | Two independent requests | Decision persists and the correct recipient receives the corresponding actual notification. |
| 3 | Edit an approved booking's arrival date through the supported form and save. | New arrival date/time | Saved date and actual notification agree; an unsaved or rolled-back edit must not be presented as completed. |
| 4 | Use the supported Guestlist Check In action/category for an approved party. Reopen history/counts. | Prepared party and Venue category | Correct booking and Check In are recorded. Ticket scan history is not the Guestlist proof. |

Senior variations: public/staff capacity, minimum/maximum party size, timezone/day boundary, denied Employee, wrong-Venue category, repeated decisions, concurrent edits, canceled versus changed arrival, reconnecting live lists, and actual exported guest count. Use only supported correction/removal controls and verify their specific effect.

**Source route:** B2, B21, B22. The backend Guestlist model is Reservation with its own CheckIn record; browser-visible state, persisted decision, and notification are separate checks.

## Source-backed cautions and automation reference

**Business risk:** reserved stock never releases, waitlist fulfillment skips/duplicates customers, or guestlist approval/check-in differs from saved state.

**Source cautions:** a generic waitlist basket may not count normal stock, but some scheduled-subscriber paths allocate discrete inventory; assigned-seat support is narrower than general admission. Guestlist bookings/check-ins are not ticket basket/ticket scan records.

**Automation:** one supported browser journey per distinct feature; backend ordering/concurrency/expiry/recipient tests. Source route: B2, B21, B22.
