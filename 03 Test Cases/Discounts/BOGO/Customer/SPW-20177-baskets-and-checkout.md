---
title: "SPW-20177 \u2014 V1 baskets and checkout"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# SPW-20177 — V1 baskets and checkout

[[03 Test Cases/Discounts/BOGO/00 Start Here|Start Here]] · [[03 Test Cases/Discounts/BOGO/01 Acceptance Criteria|Acceptance map]]

## Sources Reviewed

- [Jira SPW-20177](https://showpass.atlassian.net/browse/SPW-20177) — [Fan Expo P2] BOGO Backend: Integrate automatic basket application and purchase validation; status BETA QA; description, comments, parent, subtasks and links read. Priority: Medium.
- Product Planning: revised technical plan, Product Requirements, Solution Design, Discounts & BOGO and client handoff read through the Coda connector. Document conflicts/phases are retained in the acceptance map.
- [general.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py>)
- [application.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/buy_get/application.py>)
- [order_basket.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py>)
- [test_api_buy_get_discounts.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_buy_get_discounts.py>)
- [test_buy_get_provider_finalization.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/services/test_buy_get_provider_finalization.py>)

## Testing Intent

We are testing whether the relevant actor can complete this card’s V1 workflow while quantities, permissions and saved money remain correct; this matters because an incorrect offer can overcharge, over-discount or leave inconsistent tickets, and we will prove it through saved configuration, basket, order and lifecycle evidence appropriate to this slice.

| Field | Scope |
| --- | --- |
| Criticality / invariant | Money, inventory, financial math and permission safety; selected quantities and saved values stay correct |
| Actor impact / failure | Customers, Organizers and Operations; incorrect rewards, charges, ownership or access |
| Observable proof / surfaces | Named actor workflow and owning-layer checks below; fresh saved configuration/order/adjustment read |
| Source of truth / scope | Backend first; frontend for visible paths; exact card requirements mapped separately |
| Out of scope / confidence | No live execution, diffs or external writes; High source confidence, draft manual/revision confidence limited by named gaps |

## Source-backed Behavior

POST/full PUT recalculate and clear historical BOGO state atomically; GET is read-only. Manual BOGO codes are rejected. Compatible Apply to each discounts require existing stacking controls; Apply once suppresses BOGO. Locked payment setup rejects changed allocations; confirmed provider completion uses saved values rather than repricing after irreversible payment. Complimentary/auto-generated, waitlist and payment-plan contexts do not receive BOGO.

## Recommended Test Data and Setup

Use the actor guide’s preparation procedure, then repeat each selected case’s own Preconditions. Default calculator data: one published event, standalone $20 tickets, controlled customer, unused promotion and independent fee/tax settings. For permissions use a minimum allowed Employee and a denied Employee in the same selected Venue; foreign Venue data is an API-only scoped negative. Record original settings and preserve completed transactions.

## Cases and Verification

TC-C02/C03/C06/C07/C09/C10/C11; shared Box Office TC-B01. Backend: full PUT history cleanup, retained/manual code fields, compatible/incompatible stacking, reward value cap, customer/seat/payment changes, date/usage/checkout gates, locked limit races, stale allocation rejection, callback duplicate/delay and retry.

## TC-C02 — Public Checkout - Discounts - Complete one purchase with an automatic Buy Get reward

**Title:** Public Checkout - Discounts - Complete one purchase with an automatic Buy Get reward

**Description:** Checks a clean successful customer purchase, saved order and delivered ticket count. Three $20 tickets under Buy 2/Get 1 at 100% have a $20 discount and $40 ticket amount before saved fees, tax and credit. No prior failure or retry is required.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts, payment

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Prepare one $20 public standalone ticket type on both Buy and Get, Buy 2/Get 1 at 100%, unlimited usage and no other discount. Record starting inventory and the independent fee/tax worksheet.
* Use a customer-controlled email/account that can receive the order and an approved test payment. The Organizer checking this order has Administer Transactions and View Transaction Totals.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The eligible $20 ticket type is available. |
| Select three tickets. | Quantity 3 | Only three tickets are selected. |
| Continue to checkout and view the order summary. | Do not enter a code. | The discount is $20 and ticket amount is $40; fees, tax, credits and payable total match the prepared worksheet. |
| Enter the purchaser information requested by checkout. | Controlled customer details | The customer is identified correctly and required fields are complete. |
| Complete payment once. | Approved test payment for the displayed payable total | One completed order is shown with an order reference. |
| Open My Orders for the purchasing customer. | Recorded order reference | The order contains three tickets and the same saved payment and discount amounts. |
| Open the delivered receipt or tickets. | Same order | The promised delivery contains the three purchased tickets. |
| As the Organizer, open Dashboard → Transactions and select the recorded order. | Order reference | One transaction belongs to that customer; its totals agree with checkout and approved payment evidence. |
| Open Manage Events for the purchased event and inspect ticket availability. | Recorded starting inventory | Available inventory fell by three; the discounted ticket also consumed inventory. |

**Postconditions:**

* Preserve the completed order, receipt and payment reference.
* No live order is refunded or deleted as cleanup; use independent approved orders for later adjustment cases.

## TC-C03 — Public Checkout - Discounts - Remove stale rewards after ticket changes

**Title:** Public Checkout - Discounts - Remove stale rewards after ticket changes

**Description:** Checks a basket receiving Buy 2/Get 1 rewards through increases and decreases. A $15 excluded ticket does not count toward the Buy quantity and keeps its price.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Use a $20 type on both Buy and Get with Buy 2/Get 1, 100%, unlimited usage and no other discount. Prepare a $15 public ticket type in the same event excluded from both sides.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | Both ticket types are available. |
| Select six eligible $20 tickets. | Quantity 6 | Six eligible tickets are selected. |
| Continue to checkout. | No code | BOGO discount is $40; ticket amount is $80. |
| Return to the event’s ticket selection. | Keep the existing basket. | The current ticket quantities are shown. |
| Reduce eligible quantity to five. | Quantity 5 | Only the requested ticket quantities are selected. |
| Continue to checkout and view the order summary. | Same basket | Discount becomes $20; ticket amount remains $80. |
| Return to the event’s ticket selection. | Keep the existing basket. | The current ticket quantities are shown. |
| Reduce eligible quantity to two. | Quantity 2 | Only the requested ticket quantities are selected. |
| Continue to checkout and view the order summary. | Same basket | Discount becomes $0; ticket amount is $40. |
| Return to the event’s ticket selection. | Keep the existing basket. | The current ticket quantities are shown. |
| Add one excluded $15 ticket. | Keep two eligible tickets | Only the requested ticket quantities are selected. |
| Continue to checkout and view the order summary. | Same basket | No BOGO reward appears; ticket amount is $55. |
| Return to the event’s ticket selection. | Keep the existing basket. | The current ticket quantities are shown. |
| Increase eligible quantity to three. | Keep the excluded ticket | Only the requested ticket quantities are selected. |
| Continue to checkout and view the order summary. | Same basket | Discount is $20; ticket amount is $55; selected total is four tickets. |
| Return to the event’s ticket selection. | Keep the existing basket. | The current ticket quantities are shown. |
| Remove the excluded ticket. | Keep three eligible tickets | Only the requested ticket quantities are selected. |
| Continue to checkout and view the order summary. | Same basket | BOGO stays $20; ticket amount becomes $40. |
| Reload checkout. | Same basket | Three tickets and the saved $20 discount remain shown. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## TC-C06 — Public Checkout - Discounts - Reject a Buy Get identifier entered as a discount code

**Title:** Public Checkout - Discounts - Reject a Buy Get identifier entered as a discount code

**Description:** Checks that entering an internal Buy/Get promotion identifier does not activate BOGO. The customer receives the normal invalid-code result without changing selected tickets.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Administrator supplies the internal identifier for one Buy 2/Get 1 promotion on a $20 ticket type. Start with only two selected eligible tickets and no other discounts.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The eligible $20 ticket type is available. |
| Select two eligible tickets. | Quantity 2 | Two tickets cost $40 before fees and tax; there is no BOGO reward. |
| Continue to checkout. | No payment | The order summary shows no BOGO savings. |
| Open the discount-code input in the order summary. | On mobile first select Show order summary. | A code input and Apply control are shown. |
| Enter the supplied identifier and select Apply. | Internal BOGO identifier | The normal invalid-code error is shown; no reward or additional ticket is added. |
| Reload checkout. | Same basket | Two selected tickets and no BOGO savings remain. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## TC-C07 — Public Checkout - Discounts - Cap rewards at the basket usage limit

**Title:** Public Checkout - Discounts - Cap rewards at the basket usage limit

**Description:** Checks that a use means one rewarded ticket, not one set of Buy tickets. Buy 1/Get 3 with four $20 selected tickets would unlock three rewards; a basket limit of two permits a $40 discount only.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Prepare the same $20 type on both sides, Buy 1/Get 3, 100%, basket limit 2, all other limits unlimited and no other discounts.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The $20 type is available. |
| Select four eligible tickets. | Quantity 4 | Exactly four tickets are selected. |
| Continue to checkout. | No code | Discount is $40, leaving $40 ticket amount; the basket limit caps reward count at two. |
| Return to the event’s ticket selection. | Keep the existing basket. | The current ticket quantities are shown. |
| Increase quantity to five. | Quantity 5 | Only the requested ticket quantities are selected. |
| Continue to checkout and view the order summary. | Same basket | Discount remains $40, leaving $60 ticket amount; no third reward is granted. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## TC-C09 — Public Checkout - Discounts - Share qualifying capacity between competing offers

**Title:** Public Checkout - Discounts - Share qualifying capacity between competing offers

**Description:** Checks two source-supported same-event offers with a shared Buy ticket. Both are Buy 1/Get 1 at 100%. One $40 qualifier can fund only one reward; the cheaper $10 reward wins over the $20 reward. Two separate qualifiers allow both.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* Administrator prepares two public automatic promotions in one event: offer one buys the $40 type and gets the $10 type; offer two buys the $40 type and gets the $20 type. Limits are unlimited, Online public checkout is allowed, and no other discount exists.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The $40, $10 and $20 types are shown. |
| Select one ticket of each type. | One $40 Buy ticket; one $10 and one $20 Get ticket | Exactly three tickets are selected. |
| Continue to checkout. | No code | Only the $10 reward applies; ticket amount after discount is $60. |
| Return to the event’s ticket selection. | Keep the existing basket. | The current ticket quantities are shown. |
| Add a second $40 Buy ticket. | Keep both Get tickets | Only the requested ticket quantities are selected. |
| Continue to checkout and view the order summary. | Same basket | Four selected tickets support two distinct qualifiers. |
| Review the order summary. | Same basket | Both offers apply for $30 combined savings; ticket amount is $80. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## TC-C10 — Public Checkout - Discounts - Abandon checkout before payment without creating an order

**Title:** Public Checkout - Discounts - Abandon checkout before payment without creating an order

**Description:** Checks customer cancellation before submitting payment. A qualifying basket may reserve usage until the normal reservation expiry, but it must not create a paid order or permanently spend promotion usage.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts, abandoned-carts

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Use Buy 2/Get 1 at 100% on $20 tickets. Record the normal basket expiry/release deadline from the deployment configuration and current available usage. A customer account with no order for this attempt is available.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The eligible ticket type is available. |
| Select three eligible tickets. | Quantity 3 | Exactly three tickets are selected. |
| Continue to checkout. | No code | Ticket amount is $40 after the $20 reward. |
| Leave checkout before submitting payment. | Close the checkout page | No payment confirmation was requested. |
| Open My Orders for that customer. | Same account | No completed order exists for this abandoned attempt. |
| After the recorded reservation deadline, open the event and select three tickets in a fresh basket. | Same promotion; no competing use | The abandoned attempt has not permanently consumed reward availability. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## TC-C11 — Public Checkout - Discounts - Recalculate compatible discount stacking

**Title:** Public Checkout - Discounts - Recalculate compatible discount stacking

**Description:** Checks that an automatic Buy/Get reward and a permitted manual discount combine without negative prices. For three $20 tickets, Buy 2/Get 1 at 50% reduces one reward by $10. A compatible $5-per-ticket manual discount reduces the three remaining ticket values by another $15, leaving $35 ticket amount.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts, basket

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Global enable_manual_and_auto_discount_stacking is on. Configure Buy 2/Get 1 at 50%, $20 tickets, unlimited limits. Prepare a regular $5-per-ticket code using Apply to each, eligible for the same three tickets, and no other discount.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The eligible $20 ticket type is available. |
| Select three eligible tickets. | Quantity 3 | Three $20 tickets are selected. |
| Continue to checkout. | No code | BOGO savings are $10 and ticket amount is $50. |
| Open the discount-code input and enter the supplied regular code. | $5 per ticket; select Apply | Total savings become $25; ticket amount is $35. |
| Remove the regular code using its displayed remove control. | Same basket | Only the $10 BOGO savings remain; ticket amount is $50. |
| Reload checkout. | Same basket | Three tickets and the saved $10 discount remain shown. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## Risk Areas

Source presence is not deployed proof. Partial saved graphs, stale baskets, per-discount rounding, financial representation, restricted access and overlapping promotions must be checked at their owning layer. A temporary reservation is not completed usage; a success toast is not payment/fulfillment evidence.

## Minimum Execution Set

Run the card’s focused owning-layer checks above, then the relevant clean purchase and saved-state smoke. Backend V1 smoke is TC-C01 → TC-C02 → TC-B01 → TC-O01; additional cases follow risk, not a full Cartesian product. For planning/UI-unavailable cards, the minimum is a concrete review/revision receipt, not invented clicks.

## Suggested Automated Coverage

Use the owning-layer checks in Cases and Verification above. Calculation/validation/cache/race/provider work belongs in backend tests; saved browser journeys belong in Playwright. Configuration, independent assertions and safe restoration are mandatory.

Existing patterns: [PublicCheckoutDiscounts.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/PublicCheckoutDiscounts.ts>) (web/Widget summary and code handling), [dashboard-discounts.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/helpers/dashboard-discounts.ts>) and checkout-journey composition. Extend independent expected amounts, purchase references, saved allocation, ticket count, inventory and cleanup. The repository search found no named BOGO-specific automation; no absence claim is made about all generic coverage. Backend evaluator/oracle, model, cache, race, provider, financial and usage tests are references only, not passing execution evidence.

## Assumptions and Unknowns

The BOGO read-only summary requested by discovery is absent locally; generic totals remain the draft observable proof. Controlled stale/provider/error checks need a safe test deployment. All cases and planned checks are unexecuted. User clarified V1 phased delivery; document differences are noted as phase/revision distinctions without claiming deployed defects.

## Open Questions

Which exact candidate revision/deployment is intended for this card’s execution? Which phase accepts any source/document difference relevant to this card? Record the answer with the execution receipt; no answer is required to finish these local drafts.
