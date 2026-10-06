---
title: "Customer \u2014 How to Test"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# Customer — How to Test

Start at the public page of the event supplied by the Organizer. The customer needs no employee permission. The administrator prepares a complete promotion using [[03 Test Cases/Discounts/BOGO/Admin and Support/00 Admin and Support - How to Test|Admin setup guide]]; each copied case repeats the essential setup.

1. Identify ticket types by their displayed names and prices. Select every ticket, including the Get reward; use the quantity controls to choose the stated totals.
2. Continue to checkout and review the order summary. On mobile select **Show order summary**. Compare selected quantities, ticket amounts, combined discount, fees, tax, credits and payable total separately. Use **View discounts** where the ordinary multi-discount presentation exposes it; do not assume a new BOGO badge or separate free row.
3. For a basket-only case, change quantities and review the latest result without submitting payment. Reload proves saved display, but a GET alone does not recalculate eligibility.
4. For a purchase case, use the approved test payment supplied for that deployment, complete required purchaser/attendee fields, submit once, and save the order reference. Open My Orders and the delivered ticket/receipt; the Organizer checks Transactions and inventory for that same reference.

| Preparation | Independent expectation |
| --- | --- |
| Same $20 type on Buy and Get; Buy 2/Get 1 at 100% | Quantity 2: $0 discount; quantity 3: $20; quantity 5: $20; quantity 6: $40 |
| Buy 1/Get 3 | Incremental rewards: quantities 2/3/4 reward 1/2/3 |
| Two $40 Buy and one $20 Get, separate types | $100 original ticket amount minus $20 = $80; source-supported supplementary V1 check; PRD phase distinction documented |
| Buy 2/Get 1 at 25% on $20 | One $5 reward reduction; ticket amount $55 |
| Buy 2/Get 1 at $7 on $20 | One $7 reward reduction; ticket amount $53 |

Fees/taxes must come from the saved event/venue rules and their calculation bases, not from the displayed checkout result. Start with a no-fee/no-tax configuration only if legitimately available. For nonzero charges, the setup owner must supply the independent component worksheet before execution. BOGO itself does not waive fees, invent shipping, or override credit rules.

**Run first:** TC-C01 quantities → TC-C02 clean purchase → TC-C03 basket mutations → TC-C06 manual identifier rejection → TC-C07 basket cap. Supplementary: benefit cap, mixed prices, separate/overlap pools, multi-BOGO competition, stacking and abandonment.

Public web source is traced through usePublicBasket and UserBasedTicketBasketRepository. Widget checkout shares public automation patterns but host/frame handoff is an additional entry path: repeat the customer basket and purchase proofs after selecting the event on an approved embedded Widget. Widget host setup is not supplied, so that entry path is Blocked in the ledger and is not silently treated as executed. React Native Public, Electron and Mobile Box Office remain compatibility/device targets until their exact UI consumers and provider flows are bound to the frozen build.

Keep customer change, seat change, out-of-date payment rejection, declined-payment retry and callback duplication in backend/controlled integration coverage until a safe fault setup exists. A delayed payment must be investigated using the first order/payment reference before retry. A success message alone cannot prove one charge.

At completion, empty unpurchased baskets; preserve completed orders and their receipts. No cases here were executed. Read [[03 Test Cases/Discounts/BOGO/Customer/SPW-20176-allocation]] and [[03 Test Cases/Discounts/BOGO/Customer/SPW-20177-baskets-and-checkout]].
