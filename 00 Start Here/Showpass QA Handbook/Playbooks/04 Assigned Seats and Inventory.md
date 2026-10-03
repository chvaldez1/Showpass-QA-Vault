---
title: Configure Assigned Seating and Prove Seat Ownership
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Configure Assigned Seating and Prove Seat Ownership

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Organizer makes specific seats available for an Event. The Customer selects and buys a seat. The Attendee receives admission for that seat. The Venue Employee can find it, Check In the Attendee, and perform an allowed adjustment without leaving duplicate ownership or stranded Inventory.

An Assigned Seating Map describes the layout. Ticket Type permissions decide which seats may be sold. A reserved or purchased seat has an owner or claim. Hiding a seat from public sale does not necessarily reserve it.

## Prepare the seating scenario

Use the Venue/client setup chapter and an isolated Event with an approved small Assigned Seating Map. Do not edit an operating Event's layout. Identify two real seat labels from the map, one available seat for a competition test, a control seat, and the applicable basket expiry. Record the Event, Ticket Type, price, fees, accessible-seat rules, permitted sections, and which clients support seat selection.

The Organizer needs Manage Events for Event configuration; layout work requires the relevant Manage Venue Layouts permission. These Employee permissions are different from seat sellability permissions. Use a separate Customer for each competing purchase.

## Organizer setup → Customer purchase → Attendee admission

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | Open Manage Events, select the isolated Event, and select Edit. Choose the supported Assigned Seating setup and existing map. | Prepared layout and Ticket Type | The correct map and Event are selected; no other Event's layout is changed. |
| 2 | Set the seats or sections available to the Ticket Type, price, sale window, and allowed purchase limits. Save and reopen the Event. | Two known available seats and one excluded/control seat | Saved settings match the intended selection. Excluded seats are not accidentally offered. |
| 3 | As the Customer, open the published Event and choose one known seat. Continue to checkout. | Seat label, Ticket Type, quantity one | The selected seat, Event, price, and fees remain correct throughout checkout. |
| 4 | Complete the approved test purchase and reopen the order. Open the Event in a new Customer session. | Independent expected total | One paid order contains the correct issued seat ticket. The purchased seat is no longer available to another Customer. |
| 5 | As the Venue Employee, find the order and the seat. Use Check In for the Attendee on an admission-enabled test Event. | Purchased barcode and seat label | The Employee finds the same Event and seat; actual admission is recorded. Looking up a ticket is not itself Check In. |

## Prove a seat cannot be sold twice

1. Open the same isolated available seat in two independent Customer sessions.
2. Have both Customers select it, then attempt purchase using supported controls. Record which selection or purchase loses the competition.
3. The losing Customer must get a clear unavailability/recovery result, not an unintended charge or silently substituted seat.
4. Reopen both orders and the map. Exactly one Customer has active ownership of that seat. Verify payment outcomes for both attempts through approved test records.

A browser test can exercise competing sessions; deterministic simultaneous ownership and row-lock behavior also need backend tests. A UI rejection alone does not establish that the losing attempt was never charged.

## Prove release, adjustment, and Membership behavior

| Separate scenario | What to do | What to prove afterward |
| --- | --- | --- |
| Abandoned selection | Reserve a known seat in checkout, leave through the supported path, and wait for the documented expiry | Another Customer can actually buy it; a changed map color alone is insufficient. |
| Refund or Void | Use a separate unscanned paid order and the allowed adjustment | Old admission, money, and resale/restock behavior follow the configured policy. Do not assume every Refund releases a seat. |
| Exchange | Exchange an owned seat to another eligible seat using the supported workflow | New seat has one owner; old ticket validity and old-seat availability match policy. |
| Transfer | Transfer a separate eligible ticket to a controlled recipient | Seat is not newly counted as sold; ownership and barcode validity follow transfer rules. |
| Membership seat | Where supported, assign a seat through Membership, then renew, transfer, or end that Membership in separate runs | Event sale availability reflects the actual Membership seat assignment and release reason, not merely one old display. |

## Senior-QA variations

Compare Customer and Employee maps; hidden versus blocked seats; accessible and restricted sections; Ticket Types with overlapping permission sets; existing sold seats after a supported configuration change; recurrence-specific maps; Package or Membership seat claims; and old/new clients that use different availability displays. Reopen every relevant screen after each transition.

Keep the original seat labels and order references. Do not “repair” inconsistent ownership by changing the live map. Record the inconsistency for engineering and preserve the evidence.

**Source route:** B2, B5, B6. The backend seating document separates layout, sale permissions, Event seat usage, and Membership seat assignment; these are distinct proof targets.

## Source-backed cautions and automation reference

**Business risk:** two customers own one seat, a paid customer's seat becomes unsellable incorrectly, or released inventory remains stranded. Anchors: SPD-2187, SPD-2226, SPD-2435, SPD-2548.

**Source note:** seat sellability permissions, usage/claim records, membership relationships, and old/new projections are distinct. Public hiding is not the same as blocking ownership. A seat color alone is weak proof.

**Automation:** Playwright two contexts for supported contention and release/resale journey; backend tests for row locking, causal assignment/release, projections, and concurrent transitions. Source route: B2, B5, B6.
