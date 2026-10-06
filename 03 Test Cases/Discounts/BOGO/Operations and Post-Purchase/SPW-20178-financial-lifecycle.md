---
title: "SPW-20178 \u2014 V1 financial lifecycle"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# SPW-20178 — V1 financial lifecycle

[[03 Test Cases/Discounts/BOGO/00 Start Here|Start Here]] · [[03 Test Cases/Discounts/BOGO/01 Acceptance Criteria|Acceptance map]]

## Sources Reviewed

- [Jira SPW-20178](https://showpass.atlassian.net/browse/SPW-20178) — [Fan Expo P2] BOGO Backend: Prove financial lifecycle and operations parity; status BETA QA; description, comments, parent, subtasks and links read. Priority: Medium.
- Product Planning: revised technical plan, Product Requirements, Solution Design, Discounts & BOGO and client handoff read through the Coda connector. Document conflicts/phases are retained in the acceptance map.
- [reconciliation.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/buy_get/reconciliation.py>)
- [discount_usage_adjustment_service.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/discounts/discount_usage_adjustment_service.py>)
- [test_buy_get_csv_exports.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_buy_get_csv_exports.py>)
- [test_discount_usage_stats_csv.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/csvs/test_discount_usage_stats_csv.py>)
- [test_buy_get_post_purchase_diagnostics.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/services/test_buy_get_post_purchase_diagnostics.py>)
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

Reconciliation preserves rewarded counts while aligning saved amounts; zero-value BOGO provenance can survive capped stacks for history. Invoice exports recognize BOGO and stable applied code order. Usage after reversals caps each saved discount independently by remaining included tickets; it does not claw back paid qualifiers or assign exact reward-ticket ownership. Historical values remain authoritative.

## Recommended Test Data and Setup

Use the actor guide’s preparation procedure, then repeat each selected case’s own Preconditions. Default calculator data: one published event, standalone $20 tickets, controlled customer, unused promotion and independent fee/tax settings. For permissions use a minimum allowed Employee and a denied Employee in the same selected Venue; foreign Venue data is an API-only scoped negative. Record original settings and preserve completed transactions.

## Cases and Verification

TC-O01/O02/O03/O04 and operations charters. Backend: equivalent auto-discount fees/tax/shipping/credits/rounding, per-discount saved invoice reconciliation, proportional refund/exchange, partial/full usage, transfer and historical reads, disablement, callback finalization, bounded metrics/diagnostics.

## TC-O01 — Dashboard - Discounts - Reconcile a Buy Get purchase in Transactions and reports

**Title:** Dashboard - Discounts - Reconcile a Buy Get purchase in Transactions and reports

**Description:** Checks that saved BOGO purchase amounts remain consistent across transaction details and the existing discount report/export. Three $20 tickets bought with Buy 2/Get 1 at 100% have $60 original ticket amount, $20 discount and $40 ticket amount afterward; usage is one rewarded unit.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, discounts, reports

**Preconditions:**

* The employee has Administer Transactions, View Transaction Totals and Manage Reports.
* Have an approved completed three-ticket purchase: $20 same type, Buy 2/Get 1 at 100%, no other discount. Record order/customer/payment reference, purchase time and fee/tax/credit worksheet. The setup owner supplies the exact existing discount report name and its time-zone/date filter for this deployment.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions and search for the recorded order. | Order reference | The customer and one saved transaction match the purchase. |
| Open its details. | Same order | Original ticket amount $60, discount $20, ticket amount $40 and saved charges reconcile. |
| Open Dashboard → Reports and choose the supplied discount report. | Exact report name supplied in preconditions | The supported report opens. |
| Set the recorded purchase period and promotion filter. | Purchase time and supplied promotion identifier | The relevant BOGO result is included and quantity used is one, not three. |
| Download the report using its export control. | Same filters | A file is produced. |
| Open the downloaded file and locate this order or its promotion totals. | Isolate this purchase from other activity using the recorded filters. | Saved discount, rewarded count and available financial columns agree with the transaction; unrelated rows are unchanged. |

**Postconditions:**

* Preserve the downloaded report and order evidence.
* No promotion or transaction is modified.

## TC-O02 — Dashboard - Refunds - Refund selected Buy Get tickets using their saved value

**Title:** Dashboard - Refunds - Refund selected Buy Get tickets using their saved value

**Description:** Checks a selected-item Base refund on a purchased Buy/Get order. This refund choice returns the selected tickets’ saved ticket value and tax under the configured policy while retaining service charges; it must not assume an identifiable free ticket or reprice surviving tickets.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, discounts, refunds

**Preconditions:**

* The employee has Administer Transactions and Full Refund (administer_full_without_charges_refunds). Use a non-Cash order; this case needs no cash-refund permission.
* Prepare an independent approved order with three unscanned $20 same-type tickets bought under Buy 2/Get 1 at 100%, generic splitter off, no fees, no taxes and no credits. Its $40 saved ticket amount is shared under the existing group policy. Select one ticket and independently record its saved refundable component amount, including the currency rounding, before executing; if that saved allocation cannot be read, execution is blocked.
* The order allows employee refunds; preserve the other two tickets as controls and record original inventory, usage and payment reference.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions and select the prepared order. | Recorded reference | Correct customer, three tickets and the $20 purchase discount are shown. |
| Select Refund. | One selected unscanned ticket | The refund form opens for the selected ticket. |
| Choose Base refund. | Selected ticket only | Preview equals its independently recorded saved refundable amount, not $20 list price. |
| Confirm the refund once. | Approved test return destination | One refund is accepted for the selected ticket. |
| Reopen the transaction after the supported refund completion deadline. | Original order and refund reference | One final refund is recorded; the two unselected tickets keep their recorded purchase values. |
| Inspect the approved payment evidence. | Refund reference | Exactly the saved refundable amount was returned once. |
| Open the customer tickets and event inventory. | Selected and untouched tickets | The selected ticket is invalid; untouched tickets remain valid; inventory follows the configured restock policy. |

**Postconditions:**

* Preserve sale, refund, payment and inventory evidence; do not delete financial records.
* Inspect saved promotion usage: in an unsplit group with original rewarded count 1 and two remaining tickets, the existing cap keeps usage at 1. Refunding one arbitrary ticket must not be assumed to release one reward use.

## TC-O03 — Dashboard - Transactions - Void Buy Get tickets without returning money

**Title:** Dashboard - Transactions - Void Buy Get tickets without returning money

**Description:** Checks a paid-ticket Void separately from Refund. A Void removes ticket validity and follows the saved inventory/usage policy; it does not return customer payment.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, discounts, transactions

**Preconditions:**

* The employee has Administer Transactions, Void Items and Void Paid Items.
* Prepare an independent approved paid order of three unscanned $20 tickets with Buy 2/Get 1 at 100%, no other discount. Record its payment amount, inventory, original rewarded usage and customer. The deployment’s supported restock policy is supplied. The setup owner also supplies the existing discount report name and purchase-period/promotion filters for inspecting this order’s usage.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions and select the prepared order. | Recorded reference | Correct customer, payment and three tickets are shown. |
| Select Void for all three tickets. | All tickets in this independent order | The review identifies those tickets only. |
| Confirm Void once. | Selected tickets | One saved Void is recorded. |
| Reopen the transaction. | Same order | The sale remains in history and no customer cash refund is recorded. |
| Open the customer tickets and event inventory. | Same three tickets | All three tickets are invalid; inventory matches the supplied Void policy. |
| Inspect promotion usage through the existing discount report. | Original promotion and this order | This group has no remaining included tickets, so its rewarded usage is released. |

**Postconditions:**

* Preserve the original payment and Void records.
* No replacement cash refund is issued; do not delete the order.

## TC-O04 — Dashboard - Discounts - Preserve purchased amounts after a promotion is disabled

**Title:** Dashboard - Discounts - Preserve purchased amounts after a promotion is disabled

**Description:** Checks that deactivating an owned promotion stops new automatic rewards while completed orders retain their saved values. It does not require a global rollout-switch change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, discounts, post-purchase

**Preconditions:**

* An administrator has enabled global switches enable_bogo_discounts and enable_multi_auto_discount, included the selected venue in multi_auto_discount_venue_ids, and saved Allow auto discount and Allow multi discounts on that Standard or Premium venue.
* An internal administrator can change the owned Discount record; the employee inspecting its completed order has Administer Transactions and View Transaction Totals.
* Prepare a completed purchase of three $20 tickets, Buy 2/Get 1 at 100%, $20 discount and $40 ticket amount. Record order and original promotion visibility. No other promotion is eligible.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the administrator, open Admin → Discounts and find the prepared promotion. | Recorded internal identifier | The correct owned promotion is selected. |
| Clear Is public and select Save. | Owned promotion only | The disabled value is saved. |
| Reopen the same Discount. | Recorded identifier | Is public remains off. |
| As the customer, open the event and select three tickets in a fresh basket. | Three $20 tickets | BOGO does not apply; ticket amount is $60. |
| As the employee, open Dashboard → Transactions and select the earlier completed order. | Original reference | The original $20 discount and $40 ticket amount remain saved. |
| As the customer, reopen that order in My Orders. | Original reference | All three purchased tickets and the original recorded total remain available. |

**Postconditions:**

* Restore the original Is public value on the owned promotion and reopen it.
* Empty the unpurchased basket; preserve the completed order.

## Risk Areas

Source presence is not deployed proof. Partial saved graphs, stale baskets, per-discount rounding, financial representation, restricted access and overlapping promotions must be checked at their owning layer. A temporary reservation is not completed usage; a success toast is not payment/fulfillment evidence.

## Minimum Execution Set

Run the card’s focused owning-layer checks above, then the relevant clean purchase and saved-state smoke. Backend V1 smoke is TC-C01 → TC-C02 → TC-B01 → TC-O01; additional cases follow risk, not a full Cartesian product. For planning/UI-unavailable cards, the minimum is a concrete review/revision receipt, not invented clicks.

## Suggested Automated Coverage

Use the owning-layer checks in Cases and Verification above. Calculation/validation/cache/race/provider work belongs in backend tests; saved browser journeys belong in Playwright. Configuration, independent assertions and safe restoration are mandatory.

Existing patterns: [PublicCheckoutDiscounts.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/PublicCheckoutDiscounts.ts>) (web/Widget summary and code handling), [dashboard-discounts.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/helpers/dashboard-discounts.ts>) and checkout-journey composition. Extend independent expected amounts, purchase references, saved allocation, ticket count, inventory and cleanup. The repository search found no named BOGO-specific automation; no absence claim is made about all generic coverage. Backend evaluator/oracle, model, cache, race, provider, financial and usage tests are references only, not passing execution evidence.

## Assumptions and Unknowns

Overlapping BOGO itemized multi-discount rounding is recorded in Dashboard rollout cards; do not label it verified fixed. Nonzero fee/tax, exchange, transfer and physical admission checks need actual configuration and approved reads. All cases and planned checks are unexecuted. User clarified V1 phased delivery; document differences are noted as phase/revision distinctions without claiming deployed defects.

## Open Questions

Which exact candidate revision/deployment is intended for this card’s execution? Which phase accepts any source/document difference relevant to this card? Record the answer with the execution receipt; no answer is required to finish these local drafts.
