---
title: "Box Office \u2014 How to Test"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# Box Office — How to Test

A separate folder is justified: the backend's is_box_office branch checks the Box office allowed location, and the frontend uses VenueBasedTicketBasketRepository rather than the public user repository.

**Prepare:** employee with Use Box Office (permission key use_box_office), selected Venue, complete public BOGO configured internally, and Box office included in Allowed checkouts. Use a real controlled customer identity, not the logged-in employee. Global and Venue gates are exactly those in [[03 Test Cases/Discounts/BOGO/Admin and Support/00 Admin and Support - How to Test|Admin setup guide]].

Open Dashboard → Box Office, select the event, add the stated tickets, select the customer and inspect the basket before choosing payment. Use Cash for the representative V1 in-person proof: it exercises saved sale and delivery without adding a terminal/device dependency. Record sale source, payment type, customer, inventory and delivered quantity in Transactions after completion.

Complimentary, auto-generated, waitlist and a basket containing a payment plan are excluded by the BOGO application service. Cash is not Complimentary. Do not force terminal cancel, Square timeout, POS or Electron actions into this web cash case; these require provider/device-specific evidence and separate controlled cases.

Minimum execution is TC-B01 below plus the customer shared amount checks. Supplementary employee customer-switch and cash/credit/Other compatibility belong to controlled integration until their exact setup is supplied. Native clients are neither declared unsupported nor verified from this one web sale.

Sources: [VenueBasedTicketBasketRepository.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/basket/data/repositories/VenueBasedTicketBasketRepository.ts>); [application.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/buy_get/application.py>) (_evaluate / _can_evaluate); [employment.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py>).

## TC-B01 — Box Office - Discounts - Complete an in-person cash sale with a Buy Get reward

**Title:** Box Office - Discounts - Complete an in-person cash sale with a Buy Get reward

**Description:** Checks that a Box Office employee sells three $20 tickets for the selected customer under automatic Buy 2/Get 1 at 100%. The $20 reward leaves $40 ticket amount before the configured charges; all three tickets are issued and inventory falls by three.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Tags:** box-office, discounts, transactions

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The employee has Use Box Office; a second employee checking Transactions has Administer Transactions and View Transaction Totals.
* Administrator prepares an automatic Buy 2/Get 1 promotion, 100%, same $20 standalone ticket type on both sides, unlimited usage, Box office allowed and no other discount. Record starting inventory and approved fee/tax calculation.
* Use a controlled customer email and an event approved for recorded test cash sales.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Box Office and select the supplied event. | Selected venue and event | The $20 type is available. |
| Add three tickets of that type. | Quantity 3 | Exactly three tickets are in the basket. |
| Select the controlled customer for the sale. | Customer email | The purchaser is the customer rather than the logged-in employee. |
| Review the basket totals. | No code | Discount is $20; ticket amount is $40; total agrees with the charges worksheet. |
| Choose Cash and complete the sale once. | Displayed payable amount | One cash transaction completes. |
| Deliver the tickets using the offered email delivery control. | Controlled customer email | Three purchased tickets are sent through the supported delivery path. |
| Open Dashboard → Transactions and select the saved transaction. | Recorded reference | Customer, Cash payment, three tickets and saved discount/total agree with the sale. |
| Open Manage Events and inspect availability for that type. | Recorded starting inventory | Available quantity fell by three. |

**Postconditions:**

* Preserve the recorded cash transaction and delivery evidence.
* Deactivate only the promotion prepared for the case after finishing later checks; do not Void or Refund this baseline as cleanup.
