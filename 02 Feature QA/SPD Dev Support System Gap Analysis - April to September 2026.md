---
title: SPD Dev Support System Gap Analysis - April to September 2026
date: 2026-09-03
tags:
  - qa/analysis
  - jira/spd
  - dev-support
status: source-reviewed-draft
evidence_level: full-history-summary-coding-plus-2026-jira-intake-backend-frontend-and-playwright-static-review
---

# SPD Dev Support System Gap Analysis - April to September 2026

## Scope and Decision Rule

- Primary source: `/Users/christianvaldez/Downloads/Jira.csv`
- Round-two re-export: `/Users/christianvaldez/Downloads/Jira (1).csv`
- Export population: 2,584 escaped-bug entries created October 3, 2022 through September 3, 2026
- Period analyzed in this note: April 1 through September 3, 2026
- Tickets reviewed in this note: 570
- Primary fields: Summary, Status, Priority
- Supporting evidence: Description, Severity, Support Categorization, Root Cause, Workaround, Steps to Reproduce, Created, Resolved, Resolution, and Problem/Incident links
- Backend source of truth: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend user-path evidence: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Existing browser automation evidence: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`
- Supplemental lessons reviewed October 1, 2026: `SPD-2761` (September 29) and `SPD-2770` (October 1). These later cards are not included in the export counts or historical theme totals above.
- Related note: [[Checkout Criticality From Jira Major Critical Export]]
- Governing standard: [[00 Start Here/World-Class Software Quality Standard]]

Source references below use the short roots `web-app/`, `showpass-frontend/`, and `showpass-playwright/` for those absolute repositories.

> [!note] Round-two export check
> `Jira (1).csv` is the full historical escaped-bug export: 2,584 entries from October 2022 onward. Its 570 April 1–September 3 entries are the same issue-key population used by this note's original recent-period analysis. It is a reduced eight-column export (Issue Type, key, Summary, Priority, Status, Resolution, Created, Description), so it does not add comments, links, or dedicated custom-field values. It does carry one status change in the recent slice: `SPD-2666` moved from On Deck to Code Review. The new analysis below uses the broader issue set to isolate two recurring gaps that were previously folded into other themes; it does not treat the reduced export as new evidence for a production fix.

> [!important] Critical means business-critical in this analysis
> A ticket qualifies when the evidence shows credible impact to money, order completion, usable ticket or membership fulfillment, inventory or seat ownership, refund/credit/payout correctness, financial reporting, a permission boundary, or broad production availability. A deadline, event date, impatient client, or lack of workaround does not make a ticket Critical by itself.

> [!warning] Evidence limit
> Jira evidence can support a reprioritization recommendation when the description or recorded root cause shows the broken invariant. It does not prove that every issue is still reproducible or that a `Complete` status represents durable regression coverage.

## Priority Results — Kept Separate

| Current priority | Tickets | Complete / Completed | Open | Won't Do | Duplicate | Cannot Reproduce | Median recorded resolution |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Critical | 110 | 94 | 2 | 10 | 2 | 2 | 1.1 days |
| Major | 264 | 193 | 19 | 39 | 5 | 8 | 3.3 days |
| Medium | 163 | 98 | 27 | 26 | 8 | 4 | 6.7 days |
| Low | 33 | 14 | 9 | 8 | 1 | 1 | 11.8 days |

The existing labels do not cleanly reflect business impact. Some current Critical tickets are time-sensitive operational requests, while multiple Major and Medium tickets show direct customer charges, unpaid fulfillment, duplicate payment, payout errors, inventory ownership conflicts, or broad system contention.

## Four-Year Escaped-Bug Pattern — October 2022 to September 2026

The recent slice is not an isolated bad release. The full escaped-bug export contains 2,584 records: 12 in late 2022, 38 in 2023, 805 in 2024, 913 in 2025, and 816 through September 3, 2026. The low early counts may reflect a smaller or differently operated queue, so the meaningful comparison starts in 2024.

| Created year | Escaped-bug records | Critical + Major | What the number means |
| --- | ---: | ---: | --- |
| 2024 | 805 | 435 | First full high-volume year in this export. |
| 2025 | 913 | 526 | More than one high-priority escape per day on average. |
| 2026 through Sep. 3 | 816 | 541 | Already exceeds 2025's high-priority total before the year is complete. |

The table below is a **summary-title coding pass** across the full export. Each ticket was assigned one primary signal from its Summary to make the years comparable; the categories are not mutually exhaustive in the product and should not be summed. Descriptions and source review are used for the detailed gap cards below.

| Primary escaped-bug signal | 2024 | 2025 | 2026 to Sep. 3 | Interpretation |
| --- | ---: | ---: | ---: | --- |
| Financial adjustments, discounts, credits, fees, tax, payout | 120 | 146 | 114 | This is the largest recurring named domain. Financial changes repeatedly break after sale, not just at checkout. |
| Memberships | 60 | 92 | 99 | Membership complexity is rising: creation, benefit generation, renewals, seat assignment, and reporting remain coupled. |
| Payment/order | 68 | 79 | 78 | The payment-to-order boundary has not stopped being an escape source. |
| Seating/inventory/holds | 56 | 46 | 56 | Ownership and availability drift remains a durable platform risk. |
| Device/client (POS, Box Office, terminal, printer, mobile/desktop) | 33 | 56 | 29 | A shared backend outcome is not consistently proven at the operational client handoff. |
| Fulfillment/access (ticket, barcode, QR, scan, wallet, confirmation) | 42 | 29 | 38 | A completed sale still does not reliably demonstrate usable admission. |
| Sale time/visibility/calendar/widget | 11 | 52 | 36 | Date, timezone, embed, and sale-state behavior became a material recurring release surface. |
| Explicit scripts/backfills/bulk/manual repair | 37 | 47 | 33 | At least 117 records explicitly requested operational intervention rather than a normal product flow. |
| Package parent/child lifecycle | 5 | 5 | 10 | The smaller but growing cluster spans capacity, barcodes, printing, refunds, and revenue allocation. |

### What the history changes in the QA strategy

1. **Treat payment, fulfillment, seats, memberships, and financial adjustments as enduring system invariants.** They recur across 2024, 2025, and 2026; a ticket-specific regression test is not enough. The P0 suites need modelled lifecycle transitions and fault injection, with a representative browser proof for each supported client.
2. **Test configuration as a customer-facing release.** Ticket Credits, discounts, packages, fees, dates, and calendar visibility are repeatedly saved in one surface and consumed in another. Every high-risk configuration test must save, reload in a fresh session, and prove one allowed and one disallowed customer outcome.
3. **Separate product defect prevention from operational work.** The export labels 2,431 of 2,584 records as `Bug`, even though at least 117 summaries explicitly ask for scripts, backfills, bulk work, or manual repair. That makes raw bug volume an unreliable quality metric and lets recurring repair demand hide inside defect reporting.
4. **Make client handoff a named proof target.** Browser checkout, POS, terminal, desktop printing, mobile scanning, and Box Office are not interchangeable. A sale is not proven complete until the customer or operator can reach the required next state: ticket, barcode, scan, print, refund, or reprint.
5. **Measure prevention, not closure.** Across 2024–2026, 637 records ended Won't Do, Duplicate, or Cannot Reproduce. Those labels may be correct, but they do not establish a regression test, root cause, or accepted risk. Closing an escaped bug should record the prevention owner: product change, backend invariant, Playwright journey, monitoring/reconciliation, manual control, or an explicitly accepted limitation.

> [!important] Historical conclusion
> The central gap is not merely missing happy-path coverage. The system repeatedly loses agreement between representations of the same business fact: provider payment versus invoice, package parent versus child admission, member versus seat permission, configured credit versus customer eligibility, and completed checkout versus operational handoff. QA needs end-to-end reconciliation tests that cross those representations.

## Real System Gaps — Source-Backed and Actionable

### How to read these gap assessments

- **Production evidence** is the exported Jira record: what users, organizers, finance, or support actually observed.
- **System mechanism** comes from the current backend and frontend source. It explains how the state can split; it does not by itself prove that an old production defect is still deployed.
- **Existing automation** means tests found in `showpass-playwright`. Backend tests and frontend unit tests are cited as current engineering controls, but they are not counted as Playwright coverage.
- **Remaining proof gap** is what QA cannot currently claim from the reviewed evidence.
- **Manual and automated actions** are testable work items, with observable pass criteria instead of labels such as “test atomicity.”

> [!note] Current-code qualification
> Several incident classes now have targeted controls and backend regressions. Examples include Stripe basket reconciliation, Box Office-only customer-credit permissions, post-purchase polling before printing, membership batch completion handling, and outbox deduplication. This analysis therefore separates the historical system failure from the proof still missing today.

### Gap 1 — A successful payment can still end without one final, usable order

**Production evidence:** `SPD-2245`, `SPD-2295`, `SPD-2304`, `SPD-2396`, `SPD-2411`, `SPD-2618`, `SPD-2621`, and `SPD-2630` collectively show every harmful split: provider money without a Showpass invoice, invoice without tickets, tickets after a rejected payment, an error after a successful charge that invites a second attempt, and repair attempts that fail.

**What the issue actually is:** checkout does not have one technical commit that can include both an external payment provider and the Showpass database. The backend correctly documents multiple milestones:

1. The pending basket can already reserve capacity.
2. A provider can accept or authorize payment.
3. `BaseTicketBasketPurchaseService.purchase()` locks the basket and tries to persist the invoice and invoice items in a local database transaction.
4. The basket becomes paid and receives a fresh checkout key.
5. Only after commit does the system enqueue ticket generation and other post-purchase work.
6. Membership creation, delivery, wallet work, webhooks, and other downstream work finish independently.

The irreducible break is between steps 2 and 3: provider success cannot be rolled back when the local transaction fails. Another break exists between steps 4 and 6: a saved invoice does not prove usable admission. Relevant source: `web-app/docs/systems/ticket_basket_purchase_flow.md:7-28`, `web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:135-204`, and `web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:849-866`.

**Current controls found:** the purchase service locks the basket and rejects a second direct purchase when `basket.invoice_id` already exists. The shared basket endpoint validates a checkout idempotency key. However, a missing key is currently allowed and a feature switch can bypass the shared guard (`web-app/docs/systems/ticket_basket_lifecycle.md:69-72`). Stripe has a current recovery service that reads the provider state and either expires an unpaid basket or replays successful payment completion (`web-app/apps/integrations/services/stripe/recovery/basket_recovery_service.py:15-71`). These are meaningful defenses, but they require end-to-end proof.

**Existing Playwright coverage:** ordinary public, widget, and Web Box Office checkout matrices verify totals and a final transaction; public and widget ticket checkout then open the order and verify purchased items and barcodes (`showpass-playwright/tests/core/checkout/shared/create-checkout-test-suite.ts:43-201`, `showpass-playwright/flows/checkout-journey.ts:1708-1764`). There is a failed Affirm flow, but it proves a provider-decline UI path, not “provider succeeded and local completion failed” (`showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts`).

**Remaining proof gap:** no reviewed Playwright scenario injects failure after provider success, sends a duplicate/delayed success callback, submits the purchase twice, reloads during finalization, or proves the same provider payment reconciles to exactly one invoice and one usable ticket set. A confirmation page assertion also does not prove provider charge count, inventory restoration, reporting, or safe replay.

#### Manual QA improvement

Create a controlled payment-interruption matrix. Run it for Stripe PaymentIntent, 3DS where supported, Square Terminal, and one direct/non-card Box Office tender. For each case capture the basket ID, provider payment/intent ID, transaction ID, selected ticket/seat, and starting availability.

| Interruption point | Tester action | Required result |
| --- | --- | --- |
| Before provider confirmation | Decline/cancel payment, then retry once | No invoice, no valid ticket, no captured money, and inventory returns or remains safely held according to the documented state. |
| Provider succeeds but purchase response is lost | Allow payment, block or terminate the client response, then reload My Orders before clicking again | The existing order becomes discoverable; the UI must not present a normal second-payment path while the first result is unresolved. |
| Double submit | Trigger rapid double click or two browser requests with the same checkout key | One provider payment, one invoice, one set of tickets, one inventory decrement. The other attempt returns an explicit already-processing/already-complete result. |
| Delayed or duplicate callback | Deliver the same sandbox callback twice and once after the client timeout | The same invoice is returned/reused; no second payment, invoice, credit deduction, ticket, or email is created. |
| Local failure after payment | Use a test-only fault immediately before invoice save and again before post-purchase dispatch | Recovery links the provider payment to one order. It never expires/reopens the paid inventory and never asks the customer to pay again. |
| Post-purchase delay | Delay ticket generation beyond the normal UI wait | UI says the purchase succeeded but fulfillment is pending, gives a safe retry/check-later action, and later resolves to the same order. |

Manual evidence is incomplete unless it shows all five sides of the invariant: provider payment, Showpass invoice, usable ticket/member, inventory, and the customer-facing state.

#### Automated testing improvement

1. **Backend integration:** inject an exception after provider success and before invoice commit; replay the same provider event; assert one invoice, the original provider charge ID, one credit deduction, and one post-purchase obligation.
2. **Backend concurrency:** submit the same basket concurrently with the same, missing, and mismatched idempotency keys. Missing-key behavior must be an explicit accepted-risk test until it is rejected in production.
3. **Playwright:** add a deterministic checkout fault harness that can delay the purchase response and post-purchase completion. From the browser, reload or retry and assert that the existing transaction is recovered without a second payment request.
4. **Playwright plus API read:** after a successful ticket purchase, assert transaction ID, exact ticket/barcode quantity, and that the selected inventory cannot be bought by a second user; after cleanup, assert it becomes sellable again.
5. **Provider sandbox/manual-only:** where the test environment cannot safely query provider objects, keep exact charge-count verification manual-only and record that limitation. Do not replace it with “purchase API returned 200.”

**Exit criterion:** for every supported payment lane, QA can show that one customer intent produces `0 or 1` captured payment and, if captured, exactly one final invoice, the correct usable fulfillment, one inventory mutation, and a deterministic recovery result.

### Gap 2 — Membership and ticket fulfillment can partially finish with no recipient-level guarantee

**Production evidence:** `SPD-2625` recorded 4,399 complimentary transactions but 120 missing memberships after interruption; `SPD-2665` recorded a partially completed ticket batch with five unresolved recipients; `SPD-2521` recorded new membership sales without game tickets or corresponding inventory blocks. `SPD-2207`, `SPD-2316`, `SPD-2473`, and `SPD-2627` show the simpler paid-order/no-usable-ticket form.

**What the issue actually is:** a paid basket and even `post_purchase_completed=true` are not the final membership outcome. The purchase completion signal later schedules `add_users_to_membership_level_from_basket`. That task creates each `Member`, then marks `members_generation_completed`, then schedules member ticket batches. Member creation has two retries for a defined exception list, while PKPass generation failures are caught and reported without rolling back the member. Batch generation then fans out by recipient and uses a separate completion service (`web-app/apps/memberships/tasks.py:89-175` and `web-app/apps/memberships/tasks.py:435-552`). This is a multi-stage, partially successful workflow by design.

**Current controls found:** the basket has a durable `members_generation_completed` marker; member creation is guarded against a second full run; newer batch code passes an attempt identity into completion handling; message processing has retry and dead-letter concepts. Those controls do not create one universal “all 120 recipients received every expected artifact” assertion.

**Existing Playwright coverage:** current membership checkout tests submit the purchase and return `invoiceData`. The newer membership journey's post-purchase step can void the transaction but has no method that verifies the created `Member`, membership barcode, benefit-ticket batch, or recipient count (`showpass-playwright/flows/membership-checkout-journey.ts:294-383`). Assigned-seating membership tests purchase and then void; the public/widget paths do not first verify membership fulfillment (`showpass-playwright/tests/core/assigned-seating/membership/membership-assigned-seating-purchase-flows.ts:60-96`).

**Remaining proof gap:** QA currently cannot claim that a membership invoice produces the expected number of active members, each member owns the correct seat, all scheduled event tickets exist, every recipient was accounted for, or retrying a partially failed batch neither skips nor duplicates recipients.

#### Manual QA improvement

Test three sizes: one member, a small mixed batch of 5–10 recipients, and a production-like bulk batch large enough to create multiple worker chunks. For each, create an expected-recipient ledger before starting:

| Recipient proof | What to record |
| --- | --- |
| Purchase | One invoice item and expected membership quantity. |
| Member | Member ID, active status, level, season/expiry, owner email, and membership barcode. |
| Assigned seat | Exact seat and absence of another active owner. |
| Benefit ticket | Expected event count versus generated usable tickets, including barcode/QR. |
| Inventory effect | Each generated/held seat or GA unit is unavailable to another buyer. |
| Delivery | Intended email/wallet/print result, separated from artifact generation. |

Repeat with a controlled database/worker interruption after some recipients finish. The recovery pass must report succeeded, failed, skipped, and retried recipient IDs; those counts must add back to the submitted set. Rerun recovery once more and prove no duplicate members, tickets, seats, or deliveries.

#### Automated testing improvement

1. **Backend integration:** fault after recipient N in member creation and batch generation. Assert either transaction rollback or a durable partial result that a retry consumes exactly once.
2. **Backend contract:** parameterize guest member with email, account-backed member, missing email, renewal, seasonal membership, assigned seat, GA benefit, and multiple issue-ticket benefits.
3. **Playwright:** extend the membership post-purchase journey with `verifyMembershipInAccount()` and, for issue-ticket benefits, `verifyGeneratedBenefitTickets(expectedEvents)`. Do not treat the purchase invoice as fulfillment proof.
4. **Playwright:** add a Web Box Office membership case that searches the created customer after purchase and verifies the exact member count/level. For assigned seating, verify the member's seat before cleanup and the seat's availability after void.
5. **Batch reliability:** keep large-volume and worker-kill tests below the browser layer; Playwright should cover the customer/operator result for a representative recipient, while backend integration proves all-recipient accounting.

**Exit criterion:** every submitted recipient has exactly one durable terminal result, totals reconcile, a replay is idempotent, and a successful result includes the actual member/ticket/seat artifacts—not only a successful worker status.

### Gap 3 — Seat availability is a projection across records, so cleanup can free one layer but leave another blocked

**Production evidence:** `SPD-2226`, `SPD-2320`, `SPD-2377`, `SPD-2435`, and `SPD-2548` show stale or over-broad blocks; `SPD-2187` shows the inverse—duplicate active ownership of the same seats.

**What the issue actually is:** “Seat A is available” is derived from several records, not one flag. A basket may hold `EventSeatUsage`; sellability also depends on `TTSeatPermission`; memberships propagate seat rules through benefits and recurring child events; event batches can create ticket groups and usages; resale, transfers, exchanges, voids, expiry, and member exit all modify parts of that graph. The presence of `MemberSeatExitReconciliationService`, periodic membership seating synchronization, and sold-out drift repair in current source confirms that legacy/projection drift is a known system boundary—not merely a UI cache issue.

Relevant source: `web-app/apps/tickets/models/seating_management/seating_usage.py`, `web-app/apps/tickets/models/seating_management/seating_permissions.py`, `web-app/apps/tickets/services/seating_management/seating_release_service.py`, `web-app/apps/memberships/services/member_seat_exit_reconciliation.py:25-123`, and `web-app/apps/memberships/services/periodic_membership_seating_synchronization.py`.

**Existing Playwright coverage:** assigned-seating event flows buy a seat, verify order confirmation, and void the transaction. The reviewed flow does not return to the seat map as a second buyer to prove that the same seat was released (`showpass-playwright/tests/core/assigned-seating/events/assigned-seating-purchase-flows.ts:71-203`). Assigned-seating membership flows are weaker: they purchase and void without proving member creation or the seat projection before and after cleanup. Resale has strong customer-visible lifecycle coverage, but it does not substitute for membership expiry, benefit sync, batch removal, or orphan-row cases.

**Remaining proof gap:** a successful void/refund/expiry API response is currently allowed to stand in for actual sellability. QA does not have one transition matrix that proves unique ownership and availability across all participating records.

#### Manual QA improvement

Use one named seat across this lifecycle and record its state on both the event seat map and membership seat map:

1. Available to event buyer and eligible membership buyer.
2. Held in a pending basket; unavailable to a second browser.
3. Basket expires; available again without a script.
4. Purchased; one ticket/member owns it and both maps agree.
5. Transferred; only the new owner can use it.
6. Exchanged or resold; the original barcode is unusable and the new ownership is unique.
7. Voided/refunded; sellability matches the business rule and no stale usage remains.
8. Membership expires or is removed; all future derived event permissions release, while past-event history remains intact.
9. Membership renews or changes seat; old and new seats each have exactly one correct state across all future events.

For recurring/membership batches, compare expected blocks as `selected seats × eligible future events`. This would have made the `7 × 36 = 252` expected scope visible against the 1,008 blocked permissions reported in `SPD-2548`.

#### Automated testing improvement

1. **Backend invariant test:** after every transition, query active ownership, event usages, membership permissions, ticket permissions, and valid tickets; assert at most one active owner and that all availability projections agree.
2. **Backend state-model suite:** parameterize expiry, hold release, purchase, void, partial refund, full refund, exchange, transfer, resale, membership removal, renewal, seat change, and a failed operation rolled back midway.
3. **Playwright:** enhance assigned-seat purchase cleanup: save the selected seat label, void, start a second independent checkout, and prove the exact seat is selectable again.
4. **Playwright:** for a membership seat, verify the seat is blocked on each representative future event after purchase and released after void/member exit. Use a parameter for single versus recurring events when the steps are otherwise identical.
5. **Reconciliation test:** seed one intentionally stale usage/permission in a backend test, run the reconciliation owner, and prove both data repair and a useful metric/audit record.

**Exit criterion:** QA can answer who owns a seat, why it is blocked, and which transition will release it, with all projections agreeing and no duplicate active owner.

### Gap 4 — Refunds, exchanges, credits, packages, and payouts are tested as screens instead of one financial conservation rule

**Production evidence:** `SPD-2228` duplicated organizer payout value for cash/Other exchanges; `SPD-2280` left package-child tickets valid after mass refund; `SPD-2337` exposed gift-card advance/redemption overpayment; `SPD-2153` omitted protection fees; `SPD-2134` understated tax; `SPD-2595` required customer refunds after configured fees were not honored.

**What the issue actually is:** the financial model intentionally carries several meanings of money. `final_amount`, `credit_applied`, `amount_paid`, `amount_earned`, company earnings, tax, and their `*_stat` forms are not interchangeable. `amount_paid` follows settlement direction, not customer cash direction; packages can move reporting value to child items; credits use separate positive and negative ledger rows; payout and advance links are later records. A UI total can therefore look right while settlement or reporting is wrong. Source: `web-app/docs/systems/financial_flows.md:20-39`, `web-app/docs/systems/financial_flows.md:117-158`, and `web-app/docs/systems/financial_invoices_rate_cards_and_settlements.md:20-85`.

**Existing Playwright coverage:** cash and Other full/itemized exchange scenarios exist and verify displayed replacement totals. The final replacement purchase often ends at `.result()` without reopening both transactions and reconciling source ticket validity, exchange-credit consumption, provider movement, report values, or payout impact (`showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.helpers.ts:293-459`). Refund-protection Playwright coverage verifies opt-in/opt-out purchase presentation; it does not execute a mass refund or prove the protection amount is returned (`showpass-playwright/tests/core/refund-protection/refund-protection.test.ts:50-75`). No reviewed Playwright test exercises settlement or payout reporting.

**Remaining proof gap:** the suite proves selected UI totals in individual flows, but not conservation across the original sale, adjustment invoice, provider refund/charge, ticket validity, customer credit, organizer earnings, Showpass fees, taxes, settlement selection, and exported reports.

#### Manual QA improvement

For every financial adjustment test, use a reconciliation worksheet with these columns before and after the action:

| Dimension | Required proof |
| --- | --- |
| Customer | Original cash/credit paid, new charge, provider refund, remaining credit, net customer cost. |
| Access | Original and replacement ticket/member quantities and validity. |
| Organizer | Earnings before adjustment, reversal/new earnings, net payable. |
| Showpass | Service/company fees charged, retained, or reversed. |
| Tax | Tax collected and tax reversed by jurisdiction/rate. |
| Settlement | Source item eligibility, payout/advance links, and net amount selected. |
| Reporting | Transaction detail, sales report, tax report, and settlement report agree with the ledger. |

Run the worksheet for card, cash, Other, complimentary, gift card, venue credit, exchange credit, mixed tender, full/partial adjustment, package parent/child, protection opted in, and an already-settled source sale. For mass refund, reconcile requested, succeeded, failed, skipped, and still-valid ticket counts; those must sum to the target population.

#### Automated testing improvement

1. **Backend financial invariant suite:** parameterize tender × item shape × full/partial adjustment × pre/post settlement. Assert the algebraic net of cash, credits, `amount_paid_stat`, tax, company earnings, organizer earnings, and ticket validity.
2. **Backend retry:** fail after provider refund but before local refund commit, then retry with the same lifecycle identity. Assert one provider refund and one adjustment chain.
3. **Playwright exchange:** after cash/Other exchange, open the original and replacement transactions. Assert original ticket status, replacement barcodes, exact exchange credit created/consumed, and zero unexpected additional payment. Do not stop at the replacement checkout total.
4. **Playwright refund:** add a representative operator refund case for a normal ticket and one package/protection case. Verify the refund preview, submitted amount, transaction status, and customer-visible ticket invalidation. Keep payout/report validation at backend or manual level if the environment cannot safely run settlement.
5. **Report reconciliation:** automatically compare ledger-backed API/report results for a seeded transaction set; reserve downloadable-file layout and finance review for manual coverage.

**Exit criterion:** for every adjustment, the team can explain where every cent and every unit of access moved, and the provider, ledger, tickets, settlement, and reports agree.

### Gap 5 — A repair action can change the basket before proving that repair completed

**Production evidence:** `SPD-2295`, `SPD-2411`, `SPD-2473`, and `SPD-2618` describe payment-intent or post-purchase repair attempts that returned 500, left the basket pending, or still did not create the ticket.

**What the issue actually is:** the legacy admin payment-intent action validates the provider charge and basket identity, confirms no invoice exists, then writes the basket status to pending before replaying the success handler. It catches a validation error but still displays a generic success message afterward (`web-app/apps/tickets/admin/admin.py:947-1027`). The separate “Fix Celery issues” action simply requeues post-purchase when the boolean is false and notes that email is resent (`web-app/apps/tickets/admin/admin.py:906-912`). That means an operator can trigger business effects without a preview of what already exists or a final reconciliation report.

**Current controls found:** the newer `StripeBasketRecoveryService` returns structured results such as `expired`, `replay_failed`, and `replayed_payment_intent_succeeded`, uses the basket's persisted gateway, and has regression tests for missing/wrong gateway context and batch failure isolation. This is safer than the legacy action, but the reviewed evidence does not show that every admin entry point delegates to the newer service or that operators receive a complete final-state view.

**Existing Playwright coverage:** none found for these admin repair actions or for the operator reprint/recovery journey. Frontend unit tests prove that Box Office post-purchase polling times out with a specific “purchase completed, printing could not be started” recovery message, but that is not an end-to-end repair test.

#### Manual QA improvement

Before using any recovery action in a test environment, capture a recovery manifest: basket ID/UUID, current status, invoice link, provider intent/charge state, ticket/member count, seat usages, credits, and prior repair attempts. Exercise these cases:

1. Unpaid basket: recovery expires/releases it and creates no invoice.
2. Paid provider/no invoice: recovery creates one invoice and one fulfillment set.
3. Invoice already exists: recovery is a no-op with an explicit reason.
4. Tickets already exist but completion marker is false: recovery does not duplicate tickets or deliveries.
5. Wrong charge/basket pairing: action fails before any mutation.
6. Provider/API/lock error: basket state is unchanged or restored; result says exactly what failed.
7. Repeated recovery: second run is a no-op and reports the same final identity.

The operator-facing result must show before state, attempted action, provider evidence, final state, created/reused IDs, remaining mismatch, and whether it is safe to retry.

#### Automated testing improvement

1. **Backend:** route all recovery entry points through one reconciliation service and parameterize every provider/local state pair. Assert no mutation for invalid pairings and structured failure for every exception.
2. **Backend:** inject failure after the temporary status transition and assert rollback to the original status. Add a regression that a caught validation error cannot produce a success message.
3. **Backend:** replay post-purchase when some tickets/email work already exists and assert idempotency per effect.
4. **Playwright/admin UI:** for a safe seeded basket, verify preview → confirm → structured result → transaction/ticket outcome. Keep actual provider mutation restricted to a sandbox.
5. **Audit:** assert actor, timestamp, target IDs, provider reference, before/after state, and result are retained for every attempt.

**Exit criterion:** a failed repair never makes diagnosis worse, every retry is safe, and the operator can tell from one result whether money, order, fulfillment, inventory, and reporting now agree.

### Gap 6 — Shared workflows are not proven with the minimum permission and every client-specific post-purchase handoff

**Production evidence:** `SPD-2390` required an over-broad Manage Network workaround for a Box Office credit lookup; `SPD-2178` sent the wrong fee for a Square/gateway combination; `SPD-2600` completed a terminal sale but lost the print handoff after a basket-read lock failure; `SPD-2323` and `SPD-2527` showed credit/fee display drift in New Box Office.

**What the issue actually is:** Web Box Office composes several independently owned contracts: customer search, account credits, ticket credits, basket pricing, provider/terminal payment, transaction lookup, post-purchase polling, and printing. A role may be allowed to sell but denied by an auxiliary read. A sale may be complete while the device handoff fails. A displayed amount may use a client projection while the invoice uses backend truth.

**Current controls found:** the current backend `VenueBasedVenueUserViewSet` explicitly allows either `VP_USE_BOX_OFFICE` or `VP_MANAGE_USERS` for customer list/retrieve/credit reads while keeping mutations under Manage Users (`web-app/apps/users/api/venue_based/viewsets.py:40-50`). Backend regression tests prove either permission independently and reject cross-venue reads (`web-app/apps/venues/tests/test_api.py:8962-9044`). This strongly suggests the `SPD-2390` permission defect has a source-level fix. Frontend Box Office now polls a no-lock basket read until both invoice ID and post-purchase completion exist before printing, and shows a reprint-from-Transactions message on timeout (`showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/checkout/hooks/checkout/useCheckout.ts:469-540`; `showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/checkout/hooks/after-purchase/useAfterPurchasePrint.ts:368-390`).

**Existing Playwright coverage:** Box Office checkout covers new/existing customers and several payment methods, and exchanges cover cash/Other. The reviewed tests use organizer credentials and do not run a restricted Box Office-only role. No Playwright terminal/printing scenario was found. Account/ticket credit tests exercise credit behavior but do not prove the customer-credit panel under the minimum employee role.

#### Manual QA improvement

Use a role/client contract matrix rather than one “Box Office smoke test”:

| Actor/client | Must succeed | Must remain forbidden |
| --- | --- | --- |
| Box Office-only employee | Search/select same-venue customer, read usable credits, build basket, sell, view resulting transaction, reprint | Edit/delete customer, access other venue customer, manage network settings. |
| Transaction-admin without Box Office | View/refund permitted transactions | Start a Box Office sale unless explicitly granted. |
| Public authenticated/guest | Supported checkout and final usable order | Venue-only customer/credit data. |
| Square/Stripe terminal operator | Correct device amount, one completed sale, print/reprint fallback | Broad customer-management operations. |

For every client, compare displayed subtotal, fee, tax, credits, provider/device amount, and saved invoice. After terminal success, disconnect or delay the basket read and prove the sale stays discoverable and reprint works from Transactions without recharging.

#### Automated testing improvement

1. **Playwright permission fixture:** add a Box Office-only employee and run customer selection, credit display, and sale. Add a negative mutation assertion to prove least privilege.
2. **Playwright terminal contract:** use a deterministic terminal simulator where available; assert displayed terminal amount equals saved invoice total, successful terminal payment yields one transaction, and a failed print handoff exposes reprint.
3. **Playwright credit contract:** seed universal, organizer, gift-card, and ticket credit separately. Verify display, eligibility, applied amount, and saved invoice fields for new versus existing customer.
4. **Backend consumer contract:** retain permission/action tests for every auxiliary endpoint used by Box Office; make route additions fail review if a minimum-role test is absent.
5. **Cross-client matrix:** do not assume public/web/widget success covers POS, Electron, mobile, or terminal. Mark unsupported combinations not applicable and give each supported client its own final-outcome assertion.

**Exit criterion:** each supported client completes the same backend invariant with the least permission it needs, and device/print/display failures cannot hide or duplicate the completed sale.

### Gap 7 — Job success is observable, but business completion and workflow correlation are not consistently observable

**Production evidence:** `SPD-2589` had an apparently successful expiry worker while a basket stayed pending and held inventory for more than two hours. `SPD-2646` tied outbox behavior to about 144 active lock-wait sessions and more than 207,000 duplicate prechecks in the inspected period. Only 5 of 570 tickets link a Problem or Incident record, so recurrence and blast radius are difficult to aggregate.

**What the issue actually is:** a queue worker can return without proving the intended customer/business result. Message processing currently tracks message state, retry, failure text, metrics, and dead letters. The outbox inserter also has duplicate and lock-timeout metrics. But support needs a cross-stage answer: provider payment → basket → invoice → ticket/member → inventory → delivery → settlement. Those stages use different IDs and completion markers.

The current outbox implementation also illustrates why “job passed” is insufficient: insertion can return `None` for an existing duplicate or lock/statement timeout, and a generic processor handles messages inside a batch transaction with retries after the transaction (`web-app/apps/main/services/message_processing/outbox_messages/inserter.py:15-29`, `:63-145`; `web-app/apps/main/services/message_processing/core/processor.py:38-104`). That may be correct behavior, but the caller and dashboard must distinguish deduplicated, deferred, timed out, retried, dead-lettered, and actually applied.

**Existing Playwright coverage:** browser tests wait for visible outcomes in some purchase flows, but Playwright does not and should not be the primary load/concurrency proof for outbox processing. No reviewed Playwright test verifies an operator-facing workflow trace or dead-letter recovery.

#### Manual QA improvement

For a seeded failed purchase, membership batch, basket expiry, and notification, require support to answer from normal tools—without direct SQL:

1. What business command started the workflow?
2. Which basket, invoice, provider object, ticket/member batch, and recipient IDs belong to it?
3. Which stage last succeeded?
4. Is the next stage queued, retrying, deduplicated, dead-lettered, blocked on a lock, or missing?
5. What customer/inventory/money state exists right now?
6. What recovery is safe, and has it already been attempted?

If these answers require log archaeology or several engineers, the observability gap remains even when the underlying defect is fixed.

#### Automated testing improvement

1. **Backend message lifecycle:** assert durable command/attempt/target identity through enqueue, duplicate enqueue, handler failure, retry, dead letter, and successful replay.
2. **Backend concurrency/load:** test hot dedup keys, long handler execution, multiple workers, and batch sizes while measuring lock waits, throughput, duplicate outcomes, and unrelated request latency.
3. **Business reconciliation monitors:** scheduled checks should count paid baskets without invoices, invoices without required ticket/member artifacts, expired baskets still holding inventory, member batches with recipient deficits, and completed refunds that leave valid tickets.
4. **Alert quality test:** every synthetic inconsistency should create one actionable alert containing workflow IDs, last successful stage, current business impact, and safe next action; recovery should close or update the same incident.
5. **Playwright/operator surface:** if a support dashboard exists, verify that a known failed workflow displays the correct stage and recovery state. Otherwise classify this as backend/operability automation, not a browser test.

**Exit criterion:** a green job means the named business effect is complete, or it clearly reports a non-success terminal/intermediate state. Support can trace one workflow without manually correlating unrelated logs.

### Gap 8 — Repeated scripts and direct data repairs are replacing a safe product workflow

**Production evidence:** the export includes 79 script-tagged tickets, 77 configuration issues, 76 Customer Success requests, and 47 product limitations; the categories overlap. Examples in the promoted list involve repairing baskets, releasing seat permissions, correcting fee configuration, fixing membership outputs, and forcing settlement-related state.

**What the issue actually is:** a recurring script is a missing operational capability when the same class of request returns. Scripts often bypass the normal validation, permission, idempotency, audit, notification, and cleanup paths. They can fix the immediate row while leaving derived records, caches, ClickHouse/reporting projections, or downstream tasks inconsistent.

**Existing Playwright coverage:** script utilities exist in the Playwright repository, such as transaction cleanup, but these are test-support operations and are not evidence that Customer Success or support has a safe self-service product path. No reviewed Playwright suite covers previewed bulk repair, partial failure reporting, rollback, or audit history for the recurring SPD script categories.

#### Manual QA improvement

Cluster script tickets by intended business operation, not by component name. Promote a self-service candidate when the action recurs, has a defined authorized role, and can be validated safely. For each candidate require:

- target query and exact count before action;
- preview of every proposed change and validation failure;
- explicit confirmation for money, access, inventory, or bulk changes;
- per-target result: changed, unchanged, skipped, failed;
- idempotent rerun behavior;
- before/after audit with actor and reason;
- rollback or compensating action where feasible;
- verification of derived state, cache/report projections, notifications, and inventory;
- downloadable result for finance/support review.

#### Automated testing improvement

1. **Backend command tests:** dry run performs no writes; apply changes only validated targets; partial failure is explicit; replay does not duplicate effects.
2. **Permission tests:** read-only preview and destructive apply have intentionally different roles; cross-venue targets fail closed.
3. **Playwright:** cover preview, confirm, visible progress/result, and audit record for the highest-volume safe self-service action. Do not automate production data repair itself.
4. **Regression from every script:** before closing a data-repair ticket, add either a product regression that prevents the bad state or a reconciliation detector that finds it automatically. Record which one owns future prevention.

**Exit criterion:** high-frequency recovery/configuration work uses a permissioned, previewable, auditable, repeatable operation; one-off scripts remain exceptional and leave proof that every dependent state reconciled.

### Gap 9 — A ticket package is several records with different jobs, but QA mostly proves only that checkout completed

**Production evidence:** `SPD-2280` left 17 package-generated tickets valid after an event cancellation/refund; `SPD-2512` applied processor fees to 19 $0 children in a $30 package; `SPD-2525` printed a package parent plus four child QR codes at POS; `SPD-2597` displayed a $118 refund preview for a $66 package sale; and `SPD-2661` displayed 22/20 redeemed capacity where actual usage was 19/20. These are not five isolated screen defects. They are contradictory interpretations of one package across money, access, printing, and capacity.

**What the issue actually is:** a package sale creates a parent ticket type, child ticket types, invoice-item links, ticket records, and—depending on configuration—one or more redeemable barcodes. Different readers intentionally use different subsets. Financial realization can distribute value to children; the refund preview must use package statistical values to avoid parent-plus-child double-counting; event capacity must exclude a same-event package parent; membership seat synchronization propagates child changes to package parents. Current source has explicit package-aware paths and feature switches because a generic "count every ticket row" rule is wrong (`web-app/apps/financials/services/refund_options/rules.py:745-800`, `web-app/apps/venues/queries/calendar_inventory_helpers.py:7-49`, `web-app/apps/memberships/services/syncer/seat_sync_controller.py:141-318`).

**Current controls found:** backend regression tests cover package revenue allocation and a full admin refund that reverses child tickets; calendar inventory has package-aware SQL; package seat-block tests retain a parent block while another child remains blocked. The dashboard explicitly warns that package-generated tickets can make a visible ticket count differ from order/package count. These are useful component controls, not a full lifecycle reconciliation (`web-app/apps/financials/tests/service_tests/revenue_realization/test_invoice_item_revenue_realization_service.py:20-146`, `web-app/apps/tickets/tests/services/test_package_block_syncer.py:57-180`, `showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/overview/ui/components/EventOverviewOnSaleSummary/EventOverviewOnSaleSummary.web.tsx:150-190`).

**Existing Playwright coverage:** package suites cover custom, preset, single-barcode, multiple-barcode, assigned-seat, and multi-layer purchase setups. The common purchase flow completes checkout, verifies confirmation, and sometimes voids an assigned-seat transaction. It does not reopen the order/transaction to reconcile parent and child records, confirm the intended barcode/print output, validate capacity accounting, or test package cancellation/refund (`showpass-playwright/tests/core/packages/package-purchase-flows.ts:108-204`, `showpass-playwright/tests/core/packages/preset-package-single-barcode.test.ts`, `showpass-playwright/tests/core/packages/preset-package-multiple-barcode.test.ts`).

**Remaining proof gap:** the team cannot currently prove that one package configuration has one coherent meaning across checkout price, fees, capacity, customer access, scanning/printing, refund preview, refund result, and post-cancellation ticket validity. A passing order confirmation cannot detect a fifth misleading QR code, a capacity counter above the configured limit, or a still-valid child after the sale is reversed.

#### Manual QA improvement

Use a disposable package with a declared expected-access model before testing: parent-only barcode, child-only barcodes, or the documented combination. Do not assume that every generated ticket record should be printable or scannable.

| Step | Action | Required proof |
| --- | --- | --- |
| 1 | Configure one parent package containing four child admissions with a known event capacity and a non-zero package price. Record the expected customer-facing barcode count and the capacity contribution. | The expected model is explicit before purchase; it distinguishes financial parent from usable admission records. |
| 2 | Buy one package through Public checkout, Widget, and Web Box Office. Open the customer order and the organizer transaction in a fresh page. | One charge and one package sale; the correct child admissions exist; only the configured barcode/print output is shown as usable. |
| 3 | Compare the event's capacity, tickets sold/redeemable count, and remaining inventory with the four configured admissions. | Counters never count an accounting parent as a fifth admission or exceed the configured capacity because of the package shape. |
| 4 | Open the full-refund preview, refund/void the package in the supported sandbox flow, then reopen both original and adjustment transactions. | Preview equals the actual permitted refund; all required parent/child access records become invalid; money, fees, and remaining inventory reconcile. |
| 5 | Cancel one child event in an issued multi-event package using the documented organizer flow. | The flow either refunds every affected package customer or blocks automatic child-event refund with a clear list and operator action. It must never silently leave valid admission. |

Run the same ledger for single-barcode, multiple-barcode, and child-revenue configurations. Keep full mass-refund execution in an isolated environment because it changes money and access data.

#### Automated testing improvement

1. **Backend lifecycle matrix:** parameterize barcode model × package revenue model × child count × full refund/void/event cancellation. Assert financial totals use the intended parent/child allocation, active admission count equals the configured capacity contribution, and every access record has the intended final validity.
2. **Backend invariant:** purchase a package, alter one child state, and assert parent block/availability persists only while another child still requires it. This extends existing package-block unit coverage to the public sellability outcome.
3. **Playwright:** extend the single- and multiple-barcode package suites to reopen the completed customer order and organizer transaction. Assert the declared scannable/printable count, then compare the event's visible capacity figures with the package's configured child admissions.
4. **Playwright:** add one safe representative package refund journey. Assert the dialog amount before confirmation, the original ticket states after confirmation, and the replacement/refund transaction. Keep provider settlement and bulk cancellation at the backend/manual layer.

**Exit criterion:** for a package sale, the same configured admissions are reflected consistently in money, inventory, displayed statistics, barcode/print output, and cancellation/refund access state.

### Gap 10 — Ticket-credit eligibility is saved through several records, but customer redemption is not part of the save proof

**Production evidence:** `SPD-2558` showed a Ticket Credit edit rejected by timezone validation even though no dates changed. `SPD-2564` then documented a worse form: the UI reported success while a quantity reverted after reload and enabled-event permissions were not saved. `SPD-2465` found 100 bulk discount codes with zero required event and ticket-type permission rows. `SPD-2526` showed a customer unable to use a configured Ticket Credit Only ticket type. Discount incidents `SPD-2145`, `SPD-2233`, and `SPD-2303` show the same business outcome from a different configuration shape: a code exists, but its basket eligibility or arithmetic is wrong at the moment of purchase.

**What the issue actually is:** ticket-credit eligibility is not one saved field. It spans the Discount/Voucher, event-discount permission rows, ticket-type permission rows, issuing ticket types and their voucher quantities, and timezone-governed dates. The backend serializer accepts nested event and ticket-type permissions, while the event API separately owns voucher quantities (`web-app/apps/financials/api/venue_based/serializers/serializers.py:144-193`, `web-app/apps/tickets/models/event_management/event_ticket_types.py:384-385`). The current frontend improves on the reported fire-and-forget flow by awaiting the voucher-clear event updates, discount update, and issuing-event updates before showing success. Those are still separate network mutations; a failure between them can leave a valid but incomplete rule graph (`showpass-frontend/packages/core/src/app-contexts/dashboard/features/ticket-credits/utils/assignment-save.ts:80-160`, `showpass-frontend/packages/core/src/app-contexts/dashboard/features/ticket-credits/hooks/useTicketCreditDefinitionSubmit.ts:57-108`).

**Current controls found:** backend tests now prove that a partial event update changes a submitted voucher quantity without overwriting unrelated ticket types, and that an asynchronous event update persists the changed quantity. The frontend invalidates cached discounts/events when a save fails. These controls prove parts of the mutation contract; they do not prove one completed organizer save creates exactly the intended customer redemption choices (`web-app/apps/tickets/tests/test_api_venue_based_events.py:6049-6181`).

**Existing Playwright coverage:** Ticket Credit tests buy a flex pack and spend the earned credit in Public, Widget, and Web Box Office flows. The credit configuration is pre-seeded; no browser test changes quantity, adds/removes a permitted event or ticket type, reloads the organizer page, or then proves the changed rule to a customer (`showpass-playwright/tests/core/ticket-credits/ticket-credits.test.ts:34-192`).

**Remaining proof gap:** QA can prove a known-good preconfigured credit can be spent, but not that a person configuring the credit actually saved the rule customers see. This leaves silent quantity rollback, missing permission rows, stale client cache, timezone payload regression, and cross-client eligibility drift outside browser coverage.

#### Manual QA improvement

Prepare two issuing ticket types and two redemption events, each with two public ticket types. Start with a credit that grants 10 redemptions on only Event A / Ticket Type A1.

| Step | Action | Required proof |
| --- | --- | --- |
| 1 | In Dashboard → Ticket Credits, set the issuing quantity from 10 to 9; enable Event B / B1; remove Event A / A1; save and fully reload the page. | The saved page shows 9 and exactly the selected event/ticket-type permissions—no stale A1 permission and no missing B1 permission. |
| 2 | Sign in as a customer who owns the credit. Open each eligible and ineligible event in a fresh browser session. | The credit is offered only for B1; it is absent or clearly unavailable for A1 and all unselected ticket types. |
| 3 | Spend the credit once through Public checkout, then repeat the eligibility check through Widget and Web Box Office. | Exactly one eligible redemption is free/credited; the same rule is respected across supported clients; the remaining credit balance changes once. |
| 4 | Make an intentionally invalid mixed assignment or a date change without the required local date/time data, then save. | The UI shows an error—not success—and a reload proves the last known-good rule graph is still intact or gives a precise recovery state. |
| 5 | Repeat a non-date edit in a timezone-enforced venue. | A description, quantity, or assignment-only edit saves without submitting unintended date fields; an intentional date edit follows the supported local-schedule flow. |

#### Automated testing improvement

1. **Backend integration:** submit a multi-event assignment change that updates quantity, adds permissions, and removes permissions. Inject a failure at each mutation boundary. The result must either roll back all related records or expose a retryable, auditable partial state that cannot be reported as success.
2. **Backend contract:** test the boundary between ticket-credit issuing and redemption: source ticket types require a quantity, redemption types carry the correct event and ticket-type permission records, removed assignments are absent, and date fields require local scheduling only when dates change.
3. **Playwright:** create or edit a disposable Ticket Credit in Dashboard, save, start a fresh browser context, and prove both the saved configuration and one eligible/one ineligible customer checkout. Parameterize Public, Widget, and Web Box Office only where the credit is supported.
4. **Playwright negative:** submit a deliberately invalid assignment. Assert no success toast, reload the organizer page, and prove neither the old eligible checkout nor the stored configuration was partially changed.

**Exit criterion:** an organizer can make one configuration change and QA can prove, after reload and from a customer surface, the exact credits, quantities, events, and ticket types that are usable—without a silent partial save or client-specific eligibility drift.

## QA Improvement Backlog Derived From the Gaps

| Priority | QA work item | Best layer | What it closes |
| --- | --- | --- | --- |
| P0 | Payment-success/local-failure and duplicate-callback fault suite | Backend integration plus one Playwright recovery journey | Gaps 1 and 5 |
| P0 | Membership recipient accounting and partial-batch replay suite | Backend integration plus Playwright account verification | Gap 2 |
| P0 | Assigned-seat lifecycle invariant across purchase, expiry, void, exchange, transfer, resale, and member exit | Backend state model plus representative Playwright journeys | Gap 3 |
| P0 | Financial conservation matrix for tender × item shape × adjustment × settlement state | Backend financial tests; manual finance reconciliation; selected Playwright operator flows | Gap 4 |
| P0 | Restricted Box Office employee end-to-end sale with customer credit read | Playwright | Gap 6 |
| P0 | Business-state reconciliation monitors for paid/no-order, order/no-fulfillment, and expired/still-blocking | Backend operability | Gaps 1, 2, 3, and 7 |
| P1 | Terminal sale with delayed post-purchase read, failed print, and reprint | Frontend unit tests plus Playwright/simulator | Gaps 1 and 6 |
| P1 | Waitlist enrollment versus charged fulfillment, including duplicate callback | Backend integration plus Playwright final fulfillment | Gaps 1 and 2 |
| P1 | Recovery preview/result/audit contract | Backend plus admin UI Playwright | Gap 5 |
| P1 | First self-service replacement for the highest-volume recurring script cluster | Product workflow plus Playwright | Gap 8 |
| P1 | Package parent/child lifecycle ledger across barcode model, capacity, refund, and cancellation | Backend lifecycle tests plus one Playwright purchase/refund journey | Gap 9 |
| P1 | Ticket Credit configuration-to-redemption journey with fresh-session persistence | Backend integration plus Playwright | Gap 10 |

> [!important] Highest-value change to QA practice
> Stop closing a payment, refund, membership, seat, or recovery test at the first successful screen or API response. Define the final business invariant before execution and collect evidence from every affected state: money, ledger/order, usable access, inventory/ownership, reporting/settlement, and customer/operator recovery.

## Existing Automation Coverage Snapshot

This is a static review of the current Playwright repository, not an execution result.

| Risk area | What Playwright already proves | Material gap still open |
| --- | --- | --- |
| Ordinary ticket checkout | Public, widget, and Box Office paths across configured payment/customer matrices; public/widget confirmation opens the order and checks items/barcodes | Provider-success/local-failure, duplicate submit/callback, reload during finalization, charge count, and business reconciliation |
| Failed payment | A dedicated failed Affirm flow | Failure after provider acceptance and safe recovery to the original order |
| Membership checkout | Purchase returns invoice data across membership/payment matrices | Created member, membership barcode, exact member count, issue-ticket benefit output, recipient accounting, and recovery |
| Assigned-seating ticket | Seat selection, completed order/barcode, then transaction void | Exact seat becomes sellable again after void; stale usage/permission cleanup across all projections |
| Assigned-seating membership | Purchase and cleanup on public/widget/Box Office paths | Member/seat ownership and benefit-ticket generation before cleanup; full release afterward |
| Waitlist | Join and verify a waitlist entry for public/widget scenarios | SetupIntent versus charge distinction, automated paid fulfillment, duplicate callback, final ticket, and inventory |
| Exchange | Public and Box Office itemized/full paths; cash and Other replacement totals | Original-ticket invalidation, credit ledger, replacement barcodes, provider movement, payout and report result |
| Refund protection | Opt-in/opt-out/suppressed purchase presentation and final order display | Actual refund, mass refund, omitted protection amount, and provider/ledger/ticket reconciliation |
| Credits | Ticket-credit earn/spend flow | Account-credit panel under the minimum Box Office role; universal/organizer/gift-card source separation in saved invoice |
| Ticket Credit configuration | No reviewed browser flow edits the organizer configuration | Saved quantity, added/removed permissions, timezone-safe non-date edit, reload, and one eligible/ineligible customer redemption |
| Ticket packages | Custom/preset, single/multiple barcode, assigned-seat, and multi-layer purchase setups | Parent/child reconciliation across capacity, scannable/printable output, refund preview/result, and child-event cancellation |
| Permissions | No restricted-role Box Office flow found | Minimum-role positive path plus forbidden customer mutations and cross-venue isolation in one browser journey |
| Terminal and printing | No Playwright terminal/printing scenario found | Device amount, successful sale with failed handoff, timeout message, transaction discovery, and reprint |
| Settlement/reporting | No Playwright settlement/payout reconciliation found | Ledger-to-report and settlement proof; much of this belongs below the browser layer or in controlled manual finance testing |

## Current Mitigations Versus Remaining Risk

| Incident class | Current-source mitigation observed | What QA still needs to prove |
| --- | --- | --- |
| `SPD-2390` Box Office credit permission | Backend allows `VP_USE_BOX_OFFICE` or `VP_MANAGE_USERS`; backend tests cover each and cross-venue denial | Browser journey under a real Box Office-only fixture, including credit display and forbidden mutation |
| `SPD-2600` post-sale print handoff | Frontend polls an unlocked basket read for invoice plus post-purchase completion and gives a reprint message on timeout | Real sale remains discoverable, no second charge, and reprint produces the intended tickets/receipt |
| `SPD-2295` / `SPD-2411` / `SPD-2618` stuck paid basket | Dedicated Stripe recovery service reconciles provider state and returns structured outcomes | Every operational entry point uses it; failed replay restores state; one invoice/fulfillment result after retry |
| `SPD-2625` / `SPD-2665` membership fan-out | Retry configuration, member-generation marker, attempt-aware batch completion, and message dead letters exist | All-recipient accounting and idempotent recovery across partial completion |
| `SPD-2646` outbox contention | Fast duplicate precheck, conflict strategy switch, timeout metrics, retry/dead-letter handling | Load/concurrency behavior, caller-visible outcome of `None`, and no unrelated request degradation under a hot key |
| Seat-permission drift tickets | Member-exit reconciliation, periodic membership sync, and sold-out drift repair exist | Every ownership transition immediately reconciles all projections; repair is detection fallback, not routine correctness |

## Major Tickets That Should Be Critical

These 21 Major tickets contain direct evidence of a Critical business invariant failure. The recommendation is independent of deadline or client urgency.

| Ticket | Status | Business-critical evidence |
| --- | --- | --- |
| `SPD-2187` | Complete | Multiple active members held the same seats; ownership and oversell risk. |
| `SPD-2209` | Won't Do | Waitlist preauthorization appears to have collected real customer funds and may affect other cards. |
| `SPD-2226` | Complete | Membership sync logic could block seat permissions across every event when one ticket was sold. |
| `SPD-2228` | Complete | Cash/Other exchanges could duplicate organizer payout; recorded scope was all organizations and no safe workaround existed. |
| `SPD-2304` | Complete | Successful payments were followed by delayed tickets/invoices, causing confirmed duplicate purchases for multiple customers. |
| `SPD-2390` | Complete | Box Office required an unrelated broad permission; workaround expanded employee access beyond the workflow need. |
| `SPD-2396` | Won't Do | Tickets were issued after repeated payment failures on the client processor. |
| `SPD-2411` | Complete | Payment succeeded but the basket did not connect to a purchase; the repair action returned 500. |
| `SPD-2435` | Complete | Voided seats remained blocked and a sellable event remained falsely sold out. |
| `SPD-2473` | Complete | Customer was charged but the ticket was absent and the standard repair action failed. |
| `SPD-2521` | Complete | New membership purchases did not generate game tickets, leaving corresponding game inventory unblocked. |
| `SPD-2545` | Won't Do | Exchange reduced $180 of customer value to $90. |
| `SPD-2548` | Complete | Voiding seven membership seats left 1,008 permissions blocked across 36 future events. |
| `SPD-2595` | Complete | 59 invoices and 88 tickets required $880 in customer refunds because configured fee behavior was not honored. |
| `SPD-2618` | Complete | Customer was charged, tickets did not generate, and the repair action returned 500. |
| `SPD-2621` | In Progress | Multiple customers across two organizations encountered a checkout error and were then charged twice. |
| `SPD-2625` | Complete | 120 memberships were missing after 4,399 successful transactions; the failed generation task did not retry. |
| `SPD-2627` | Complete | Stripe payment succeeded, but no ticket or QR code appeared in email, Dashboard, or the customer app. |
| `SPD-2630` | Complete | A production outage created confirmed payment/order mismatches and duplicate-charge exposure. Retype as Incident as well as reprioritizing. |
| `SPD-2646` | Code Review | Outbox locking amplified to site-wide database contention with roughly 144 active lock-wait sessions. |
| `SPD-2665` | Code Review | Membership batch completed only partially; five recipient identities remained without tickets and recovery failed. |

## Medium Tickets That Should Be Critical

These 15 Medium tickets also contain direct business-critical evidence.

| Ticket | Status | Business-critical evidence |
| --- | --- | --- |
| `SPD-2134` | Complete | Tax reporting understated collected taxes by approximately $4,300 and failed reconciliation. |
| `SPD-2153` | Complete | Mass refund omitted ticket-protection fees, leaving customer money unrefunded. |
| `SPD-2158` | Complete | Customer was charged, but no transaction or ticket ownership appeared and the seats remained on hold. |
| `SPD-2205` | Won't Do | Roughly $7,300 of gift-card sales did not generate expected advances; a gift-card balance also became negative/inflated. |
| `SPD-2207` | Complete | A charged and confirmed order had no ticket items or usable admission; the event passed before recovery. |
| `SPD-2245` | Won't Do | Three payments processed, only one transaction appeared, tickets/barcodes were missing, and seats remained available for resale. |
| `SPD-2253` | Won't Do | A $0 basket charged the customer twice. |
| `SPD-2266` | Won't Do | Organizer banking information disappeared without a known actor or audit history, directly risking payout integrity. |
| `SPD-2280` | Won't Do | Event cancellation/refund left 17 package tickets valid and some paid package value unresolved. |
| `SPD-2295` | Complete | Stripe charge succeeded while Showpass had no invoice or tickets; repeated repair attempts were unsafe. |
| `SPD-2316` | Complete | Card was charged and the order was repaired, but the ticket still did not generate. |
| `SPD-2337` | On Deck | Gift-card advance and redemption settlement can exceed collected cash. |
| `SPD-2408` | Complete | Waitlist customer was charged and invoiced but received no ticket. |
| `SPD-2419` | Won't Do | One waitlist basket generated two customer charges. |
| `SPD-2578` | Complete | Box Office purchase completed, but the replacement memberships and ticket batch were missing or voided. |

## Tickets That Could Be Critical but Need One More Business-Impact Fact

These are not promoted solely from urgency. The named evidence would decide.

### Major

| Ticket | Current evidence | Evidence required for Critical |
| --- | --- | --- |
| `SPD-2178` | Incorrect Square fee reached the terminal for one gateway combination. | Number/value of affected sales or proof the calculation applies broadly. |
| `SPD-2284` | One expected payout failed to generate and required forced settlement. | Evidence of repeated runs, multiple clients, or funds delayed beyond the normal recovery window. |
| `SPD-2320` | Released membership seat remained unavailable because of stale usage. | Number of affected seats/events or proof the stale-row pattern is systemic. |
| `SPD-2426` | A ticket in pending transfer state was already scanned. | Proof of unauthorized admission, ownership loss, or broader recurrence. |
| `SPD-2468` | One propagated datetime was copied to 216 child ticket types. | Confirmed sales outside the intended window, missed sales, or oversell. |
| `SPD-2504` | Scheduled batch repeatedly failed to generate. | Count of customers without usable tickets and admission impact. |
| `SPD-2509` | Voided member seats remained unavailable for sale. | Scope and demonstrated lost-sale impact beyond four seats. |
| `SPD-2597` | Refund preview showed $118 for a $66 refund, but the backend refunder calculated $66. | Evidence that an operator could or did issue an incorrect provider refund. |
| `SPD-2600` | Sale succeeded but the terminal print handoff failed. | Breadth across terminals or proof that buyers could not access tickets another way. |
| `SPD-2637` | A three-membership exchange consistently timed out; no partial purchase occurred. | Recurrence across organizations or evidence of money/ownership becoming inconsistent. |

### Medium

| Ticket | Current evidence | Evidence required for Critical |
| --- | --- | --- |
| `SPD-2092` | Chargeback fee-tax signs broke report reconciliation. | Scope across disputes and proof of incorrect payout, tax filing, or financial decision. |
| `SPD-2181` | One transaction created a $5 report mismatch while auditors waited. | Material amount or systemic recurrence; audit timing alone is not enough. |
| `SPD-2470` | Four customers were charged duplicate tax after duplicate configuration. | Proof the product allowed an unsafe configuration without detection across broader sales. |
| `SPD-2589` | One expired basket held inventory for two hours while the worker appeared successful. | Recurrence or evidence of broader inventory starvation; the ticket found no system-wide backlog. |
| `SPD-2658` | One $85.62 credit refund broke report cross-addition. | Proof that settlement, payout, or a wider report population is wrong. |

## Current Critical Tickets That Look Urgent or Operational, Not Business-Critical

These should be reviewed for demotion or retyping unless hidden evidence shows direct business impact:

| Ticket | Why the current evidence is insufficient for Critical |
| --- | --- |
| `SPD-2605` | Requested season start-date change; operational data update. |
| `SPD-2528` | Request to revert to an older calendar widget; product/configuration preference. |
| `SPD-2472` | Bulk configuration request to remove resale. |
| `SPD-2469` | Membership pricing update request without evidence of incorrect completed charges. |
| `SPD-2361` | Assistance removing a membership benefit. |
| `SPD-2350` | Help obtaining ticket PDFs; scope and access impact are not established. |
| `SPD-2340` | One-off script request to add a handling fee. |
| `SPD-2169` | Data cleanup after an accidental renewal email. |
| `SPD-2159` | Fee override/adjustment assistance rather than a demonstrated product invariant failure. |

Time sensitivity may justify expedited support handling, but it should live in an Urgency or Deadline field, not redefine business Criticality.

## Theme Counts by Priority

Themes overlap and are based primarily on Summary wording; they must not be added together.

| Theme | Critical | Major | Medium | Low |
| --- | ---: | ---: | ---: | ---: |
| Payments, checkout, and order integrity | 22 | 56 | 27 | 2 |
| Refunds, exchanges, credits, and transfers | 15 | 56 | 15 | 4 |
| Inventory, assigned seating, and holds | 15 | 46 | 16 | 3 |
| Memberships, renewals, and benefits | 16 | 41 | 19 | 2 |
| Ticket generation, delivery, and scanning | 13 | 30 | 19 | 2 |
| Fees, taxes, reports, settlements, and payouts | 11 | 24 | 25 | 4 |
| Messaging, integrations, APIs, and analytics | 7 | 30 | 17 | 2 |
| Event discovery, calendars, widgets, and sale timing | 9 | 18 | 15 | 2 |
| Accounts, login, permissions, and security | 10 | 19 | 9 | 5 |
| Mobile, desktop, POS, and device reliability | 8 | 15 | 9 | 3 |

## Priority and Intake System Gaps

### Priority is mixing business impact with urgency

The Critical bucket contains 19 S0, 32 S1, 44 S2, 12 S3, and 3 tickets with no severity. Priority and severity can legitimately differ, but the reason must be explicit. Use separate fields for:

- Business severity
- Client reach
- Money or inventory exposure
- Workaround availability
- Operational urgency/deadline
- Support priority

### Closure does not preserve enough prevention evidence

- Critical: 14 tickets ended as Won't Do, Duplicate, or Cannot Reproduce.
- Major: 52 tickets ended in those states.
- Medium: 38 tickets ended in those states.
- 110 tickets are in Jira's Done category without a populated Resolution.
- Steps to Reproduce are populated on 41.6%, Root Cause on 43.3%, Workaround on 40.0%, and Triage Checklist on 39.5%.

`Duplicate` should require the canonical issue. `Cannot Reproduce` should preserve the attempted state matrix and evidence. `Won't Do` should record the business risk, owner, reason, and accepted workaround.

### The Bug issue type is not measuring defect demand

566 of 570 entries are typed as Bug. Jira support categorization shows that many are scripts, configuration issues, Customer Success requests, product limitations, finance work, and product feedback. Separate issue types are required for defect, incident, data repair, script/bulk operation, configuration, credential/access, finance/reporting, product limitation, and product feedback.

## Recommended Proof Targets

### P0 — business-critical

1. One provider payment maps to exactly one final order, one correct fulfillment result, one inventory mutation, and matching reports.
2. Decline, retry, timeout, duplicate callback, browser retry, and delayed callback cannot create unpaid tickets, duplicate charges, or missing orders.
3. Ticket/member generation is retryable, idempotent, recipient-accounted, and monitored through usable delivery.
4. Seat and membership ownership remains unique and sellability is restored after expiry, void, refund, exchange, transfer, resale, and renewal.
5. Refund, exchange, credit, gift-card, package, chargeback, settlement, and payout paths reconcile collected cash and ticket validity.
6. Recovery tools are guarded, idempotent, auditable, and prove final state across provider, order, fulfillment, inventory, and reporting.
7. Permission checks authorize the minimum role required on every shared Box Office and Dashboard endpoint.

### P1 — important but not automatically Critical

1. Calendar, widget, sale-time, and event-visibility correctness across recurring events and timezones.
2. POS, mobile, desktop, embedded, and Web Box Office parity for supported workflows.
3. Email, SMS, analytics, and integration failures expose actionable state and safe retry.
4. Financial displays match source-of-truth values even when the underlying ledger is correct.
5. Recurring scripts and data repairs become permissioned, previewable, reversible self-service actions.

## Lessons Learned — September 29 and October 1, 2026

These lessons extend Gap 4 (financial agreement), Gap 6 (client and device handoffs), and Gap 9 (package lifecycle). They are prevention actions derived from Jira intake and the source references below; no new purchases or hardware checks were executed for this update.

### 1. Be especially cautious with fees, including internal and absorbed fees

**Incident:** [SPD-2761 — Fees on product packages not calculating properly](https://showpass.atlassian.net/browse/SPD-2761), Critical, Complete when read October 1. The report says merchandise included through a package's sub-product relationship did not collect fees per eligible item as expected, losing Showpass revenue. A similar incident had occurred earlier in the year. A customer could still buy successfully, so ordinary checkout success would not expose the missing fees.

**Lesson:** prove both the customer's bill and where the money goes. Internal fees are Showpass fee amounts defined by rate cards. Absorbed fees are borne by the organizer instead of added to the customer's bill; absorption must not silently remove the fee from the financial calculation. Confirm the applicable business rule for each fee rather than assuming every package child should be charged. Customer-visible fee lines alone cannot prove this: the frontend intentionally omits absorbed fees from those lines.

**What QA should improve:**

- Before testing, record the actual fee configuration and calculate an independent expected subtotal, fee, tax, customer total, Showpass earnings, and organizer earnings. Include fixed and percentage fees, processing fees, and taxes on fees where configured. Do not derive the expected number from the checkout response being tested.
- Compare a normal ticket, a ticket package, and a ticket-plus-merchandise package. Exercise included/excluded products and more than one package quantity. State which parent or child items attract each fee so missing multiplication or double charging is visible.
- Repeat the relevant cases with customer-paid, absorbed, and mixed fee configurations. An unchanged customer total in an absorbed case is only one part of the proof; the expected fee and organizer deduction must still appear in the saved financial records.
- Test no discount, fixed discount, percentage discount, and a fully discounted purchase where supported. Record whether each rate applies before or after the discount, and whether processing includes other fees. Cover legacy and itemized calculation modes when both remain applicable, using the actual saved mode rather than the ticket's name.
- In isolated test data, complete representative purchases and reopen Transactions. Reconcile the charge, invoice fee breakdown, and organizer/Showpass amounts; then test the permitted refund or void and check the resulting financial records. If settlement or reporting cannot be exercised, keep that proof gap explicit.
- After changing fees, compare a fresh basket with an already-open basket using the intended price-lock behavior. Test the supported pricing refresh rather than assuming saved settings immediately change every cached price.

**Automation action:** extend the existing Playwright product-package purchase scenario (`SPT-3760`) with independently calculated expected values and representative absorbed/internal-fee variants. Check checkout and the saved transaction after purchase. Use backend tests for the broader fee matrix and financial allocation; browser checks should prove representative customer journeys, not reproduce the entire fee engine.

**Existing evidence limit:** the card records 18 passing beta pricing scenarios, including absorbed fees and discounts. Those checks stopped before purchase. They do not establish beta payment, fulfillment, realized revenue, refund, settlement, or pricing-reset coverage. Internal/absorbed-fee caution is a wider prevention lesson, not a claim that absorption was the confirmed cause of SPD-2761.

**Source anchors:** `web-app/docs/systems/financial_invoices_rate_cards_and_settlements.md` (fee applicability, absorption, invoice and settlement meanings); `showpass-frontend/packages/core/src/shared/modules/basket/services/useBasket.ts:759` and `showpass-frontend/packages/core/src/shared/modules/basket/fees/helpers.ts:83` (customer fee presentation); `showpass-playwright/tests/core/packages/product-package-config.ts` and `product-package.runner.ts` (existing product-package scenario across public checkout, widget, and Box Office).

### 2. Treat payment hardware and mobile OS compatibility as part of QA scope

**Incident:** [SPD-2770 — Showpass POS crashing after enabling in-app payment processing](https://showpass.atlassian.net/browse/SPD-2770), Critical, In Progress when read October 1. The report identifies Showpass 3.7.1 build 137 on iPadOS 27.0 and the trigger **POS → Settings → Square → Use In-App Payment Processing**. It says repeated crashes continue after disconnecting the Square Stand. The business risk is losing the ability to take payments at the venue, rather than simply missing a deadline.

**Lesson:** an app opening normally is insufficient proof that its payment integration works. Enabling a payment setting, reconnecting hardware, or upgrading the OS can introduce a different failure state. Lack of a dedicated mobile QA person does not remove that scope; it means the team needs a small, assigned compatibility check and visible untested combinations.

**What QA should improve:**

- For mobile/POS releases, payment-library changes, and OS upgrades, name a person responsible for the physical-device check. Record device model, OS version, app version/build, environment, and reader/stand model. Prioritize combinations used at upcoming onsales and venue operations, including the OS implicated in an incident and a known supported comparison version.
- Start with in-app processing disabled, enable it through POS Settings, and confirm the app remains usable. Disconnect and reconnect the reader/stand, send the app to the background and return, then close and reopen it with the setting still enabled. Include recovery through the product's supported controls; a fresh install is not proof that existing users can recover.
- Complete a permitted test payment on the actual device and verify one charge, one transaction, and the expected tickets or products. Exercise cancellation and reconnection around an interrupted payment; inspect the saved payment result before retrying so recovery cannot duplicate a charge.
- Keep web Box Office, Square Terminal, and the iPad's in-app reader integration as separate evidence. A web sale or Terminal check does not exercise the iPad's native reader library. Extend the same compatibility habit to receipt printers and scanners when their workflows are affected.
- When the required device or OS is unavailable, record the exact untested combination and arrange coverage with a developer or someone who has the hardware. Give it an owner and retain the gap in the release decision.

**Automation action:** retain Playwright coverage for browser payment/order behavior, but classify this native crash as physical-device manual coverage until an appropriate mobile test exists. Mobile automation can cover enabling the setting and reopening the app; actual reader/stand compatibility still needs device evidence. Browser viewport emulation cannot prove native library or hardware compatibility.

**Evidence limit:** the Jira description includes an AI interpretation of a crash log, but the current card returns no attached log or comments. The native root cause, the stated OS version, and the claim that all upgraded iPads are affected have not been independently verified. Record the reported combination without treating that interpretation as a confirmed diagnosis.

**Source anchors:** `showpass-frontend/packages/mobile/src/native-modules/ios/square-reader/index.tsx` and `packages/mobile/src/util/pos/square.tsx` identify the native reader integration. Existing device guidance: [[09 Appium/Showpass Mobile App]]. Related payment-state coverage: [[03 Test Cases/Payments/square-test-cases]], which addresses Square Terminal behavior and is not proof of this in-app reader path.

### Prevention habit for both lessons

- Promote an escaped bug into a reusable regression scenario with exact setup, expected business result, evidence, and a named owner. A Complete Jira status alone does not prove that the regression is protected.
- Treat financial loss and inability to take payments as business-critical even when the checkout looks normal or the failing platform is not the main QA platform.
- Preserve the incident's configuration and lifecycle: package relationships and fee settings for SPD-2761; saved payment setting, app build, OS, and connected/disconnected hardware for SPD-2770.

## Confidence

- Round-two export comparison: High that it contains the same in-period issue-key population; it is lower-detail than the primary export and supplies one observed status refresh only.
- Priority/status/count findings: High
- `Should be Critical` recommendations: High based on explicit Jira description or recorded root-cause evidence of a business invariant failure
- `Could be Critical` recommendations: Medium pending the named impact evidence
- Failure-mechanism analysis: High for the documented architecture and reviewed source boundaries; Medium where Jira did not preserve a complete root cause
- Existing Playwright coverage mapping: High as a static repository review; tests were inspected but not executed for this analysis
- Current-source mitigation mapping: High for the checked-in code and backend/frontend tests cited above
- Production deployment, current reproducibility, and whether each mitigation is enabled by its feature switch: Unknown; a source-level fix is not a production verification
