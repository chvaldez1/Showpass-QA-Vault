---
title: "SPW-20176 \u2014 V1 reward allocation"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# SPW-20176 — V1 reward allocation

[[03 Test Cases/Discounts/BOGO/00 Start Here|Start Here]] · [[03 Test Cases/Discounts/BOGO/01 Acceptance Criteria|Acceptance map]]

## Sources Reviewed

- [Jira SPW-20176](https://showpass.atlassian.net/browse/SPW-20176) — [Fan Expo P2] BOGO Backend: Implement Buy/Get evaluator and coordinator; status BETA QA; description, comments, parent, subtasks and links read. Priority: Medium.
- Product Planning: revised technical plan, Product Requirements, Solution Design, Discounts & BOGO and client handoff read through the Coda connector. Document conflicts/phases are retained in the acceptance map.
- [evaluator.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/buy_get/evaluator.py>)
- [test_buy_get_evaluator.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/services/test_buy_get_evaluator.py>)
- [test_buy_get_application.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/services/test_buy_get_application.py>)

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

Evaluator maximizes feasible rewarded count within budgets, then chooses lowest-priced eligible units while preserving Buy capacity. Partial Get blocks need full Buy X. Same/separate/overlapping pools are supported within one event. Coordinator consumes qualifier and reward units across promotions; a rewarded unit cannot qualify another. It chooses the next lowest effective-cost proposal then Discount ID; it is not a global search over alternative reward allocations.

## Recommended Test Data and Setup

Use the actor guide’s preparation procedure, then repeat each selected case’s own Preconditions. Default calculator data: one published event, standalone $20 tickets, controlled customer, unused promotion and independent fee/tax settings. For permissions use a minimum allowed Employee and a denied Employee in the same selected Venue; foreign Venue data is an API-only scoped negative. Record original settings and preserve completed transactions.

## Cases and Verification

TC-C01/C04/C05/C08 plus TC-C09 shared competition. Backend: arbitrary positive ratios, complete/partial Get, constrained overlapping pool, reward-only capacity, stable price/ID/seat ties, nonreuse, independent scope caps, zero-value reward, large grouped quantities, ORM-free operation and exhaustive/randomized independent oracles.

## TC-C01 — Public Checkout - Discounts - Recalculate Buy X Get Y quantity boundaries

**Title:** Public Checkout - Discounts - Recalculate Buy X Get Y quantity boundaries

**Description:** Checks that a customer-selected ticket quantity receives only the rewards supported by the configured Buy X/Get Y rule. Each Offer value below supplies the exact quantity, discount and ticket amount; this prevents extra tickets and stale savings.


Amounts in this Offer table exclude fees and taxes.

| Offer | Buy/Get | Selected quantities in order | Reward counts | Discount amounts | Ticket amounts afterward |
| --- | --- | --- | --- | --- | --- |
| BuyOneGetOne | 1/1 | 1, 2, 3, 4 | 0, 1, 1, 2 | $0, $20, $20, $40 | $20, $20, $40, $40 |
| BuyTwoGetOne | 2/1 | 2, 3, 4, 5, 6 | 0, 1, 1, 1, 2 | $0, $20, $20, $20, $40 | $40, $40, $60, $80, $80 |
| BuyOneGetThree | 1/3 | 1, 2, 3, 4, 5 | 0, 1, 2, 3, 3 | $0, $20, $40, $60, $60 | $20, $20, $20, $20, $40 |
| BuyThreeGetTwo | 3/2 | 3, 4, 5, 10 | 0, 1, 2, 4 | $0, $20, $40, $80 | $60, $60, $60, $120 |


| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Parameters:**

Offer: BuyOneGetOne, BuyTwoGetOne, BuyOneGetThree, BuyThreeGetTwo

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Use one $20 public ticket type on both Buy and Get, a 100% reward, no other promotions and unlimited usage. Configure the selected Offer before opening the basket. Fees and tax are recorded separately.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The $20 eligible ticket type is shown. |
| Set the quantity to the first value in the selected Offer row. | Offer table | Only the requested quantity is selected. |
| Continue to checkout. | Do not enter a discount code. | The order summary shows the selected row’s discount and ticket amount. |
| Return to the event’s ticket selection. | Same basket | Current quantities are shown. |
| Set the next quantity. | Next value in the Offer row | Only that quantity is selected. |
| Continue to checkout again. | Repeat ticket selection, quantity change and checkout for each remaining quantity. | Each latest discount and ticket amount matches its row; no extra ticket appears. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.


## TC-C04 — Public Checkout - Discounts - Apply percentage and fixed rewards without negative prices

**Title:** Public Checkout - Discounts - Apply percentage and fixed rewards without negative prices

**Description:** Checks the configured reduction on one reward ticket. Benefit values map to PercentTwentyFive: 25% and $5 savings; FixedSeven: $7 and $7 savings; FixedAbovePrice: $25 capped to $20 savings. Ticket amounts for three $20 tickets are $55, $53 and $40 respectively, before fees and tax.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Parameters:**

Benefit: PercentTwentyFive, FixedSeven, FixedAbovePrice

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Use the same $20 ticket type on Buy and Get, Buy 2/Get 1, unlimited usage and no other discount. Set the benefit stated in the selected Benefit value; leave the other reward value at zero.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The $20 ticket type is available. |
| Select three eligible tickets. | Quantity 3 | Three tickets are selected. |
| Continue to checkout. | No code | The discount is $5, $7 or $20 for the selected Benefit; ticket amount is $55, $53 or $40. |
| Reload checkout. | Same basket | The selected quantity and saved amount remain the same; no amount is negative. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## TC-C05 — Public Checkout - Discounts - Reward the lowest eligible price in a mixed basket

**Title:** Public Checkout - Discounts - Reward the lowest eligible price in a mixed basket

**Description:** Checks pooled same-event ticket eligibility and cheapest reward selection. All three configured types can count as Buy or Get; adding them in reverse order must produce the same savings. This catches request-order pricing errors.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Prepare three public standalone ticket types priced $40, $30 and $20 in one event. Select all three on both Buy and Get for one Buy 2/Get 1 promotion at 100%, unlimited usage and no other discounts.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | The three priced ticket types are available. |
| Select one ticket of each type. | $40, $30, $20 | Three selected tickets total $90 before discount. |
| Continue to checkout. | No code | BOGO discount is $20 and ticket amount afterward is $70. |
| Remove all three tickets from the basket. | Same basket | The basket is empty and has no BOGO savings. |
| Select one of each type in reverse order. | $20, $30, $40 | Exactly the same three types and quantities are selected. |
| Continue to checkout. | No code | Discount remains $20 and ticket amount remains $70. |

**Postconditions:**

* No purchase is made; remove the selected tickets from the basket after recording the result.
* Restore only promotion settings changed for this case; preserve any previously completed orders.

## TC-C08 — Public Checkout - Discounts - Use separate qualifying and reward ticket types

**Title:** Public Checkout - Discounts - Use separate qualifying and reward ticket types

**Description:** Checks a source-supported offer whose Buy and Get types differ within one event. The Buy types form one combined eligible set. Two $40 Buy tickets unlock one selected $20 Get ticket; the customer must select that Get ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Tags:** public, discounts

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* The administrator has saved a public, non-deleted Buy/Get promotion for one published event, allowed Online public checkout, and selected the stated standalone ticket types on the Buy and Get sides. A standalone ticket type is sold by itself and is not recurring, a package, a package component, or an issued-ticket link.
* Prepare two $40 standalone Buy types and one $20 standalone Get type in one event. Configure Buy 2/Get 1, Buy targets as the two $40 types, Get target as only the $20 type, 100%, unlimited usage and no other discount.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied public event page. | Selected event | All three ticket types are shown. |
| Select one ticket from each $40 Buy type. | Two Buy tickets total | Only two tickets are selected; no reward is added. |
| Continue to checkout. | No Get ticket selected | Ticket amount is $80 and BOGO discount is $0. |
| Return to ticket selection and add one $20 Get ticket. | Keep the two $40 tickets | Exactly three tickets are selected. |
| Continue to checkout. | No code | Ticket amount before discount is $100; discount is $20; ticket amount afterward is $80. |
| Remove one $40 Buy ticket. | Keep one Buy and one Get ticket | BOGO discount disappears; remaining ticket amount is $60. |

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

Phased scope note: PRD same-item/no-pooling statements differ from implemented pooled ticket sets. Keep source-based separate/pool scenarios supplementary until the intended acceptance phase is named. All cases and planned checks are unexecuted. User clarified V1 phased delivery; document differences are noted as phase/revision distinctions without claiming deployed defects.

## Open Questions

Which exact candidate revision/deployment is intended for this card’s execution? Which phase accepts any source/document difference relevant to this card? Record the answer with the execution receipt; no answer is required to finish these local drafts.
