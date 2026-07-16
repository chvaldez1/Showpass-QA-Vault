# Major Critical Playwright Automation Candidates

Related notes:
- [[06 Prompts/Major Critical Jira To Playwright Gap Exhaustive Worker]]
- [[02 Feature QA/Major Critical Playwright Gap Analysis]]
- [[02 Feature QA/Major Critical Playwright Gap Worker State.json]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]

## Ranked Recommendation

Automate a small number of representative invariants, not one test per Jira card. The first batch should prioritize money-state and ownership-state failures that current Playwright coverage only partially proves.

| Rank | Candidate | Priority | Coverage status | First proof | Confidence |
| ---: | --- | --- | --- | --- | --- |
| 1 | MC-PW-P0-001 - Provider final-state mismatch guard | P0 | Partial coverage found | Failed provider attempt creates no paid order/tickets, and retry or duplicate submit creates exactly one paid outcome | High |
| 2 | MC-PW-P0-002 - Gateway-switch exchange payout reconciliation | P0 | Partial coverage found | Exchange with gateway switch or externally collected credit has one correct settlement/payout row | Medium |
| 3 | MC-PW-P0-003 - Membership assigned-seat ownership lifecycle | P0 | Partial coverage found | Renew/move/exchange season seat leaves one active owner and releases old ownership | Medium |
| 4 | MC-PW-P0-004 - Gift-card/user-credit redemption reconciliation | P0 | No coverage found in inspected files | Stored value applies once, balance decrements once, transaction/reporting agree | Medium |
| 5 | MC-PW-P0-005 - Financial report reconciliation smoke | P0 | No coverage found in inspected files | Deterministic purchase reconciles transaction page to report/export/settlement amount | High |
| 6 | MC-PW-P1-006 - Fee, tax, and subtotal override reconciliation | P1 | Partial coverage found | Fee/tax/no-fee/subtotal override cart total equals invoice, transaction, and report | Medium |
| 7 | MC-PW-P1-007 - Membership benefit deletion lifecycle | P1 | Partial coverage found | Removed benefit stops applying in checkout and stale discount is not honored | Medium |
| 8 | MC-PW-P1-008 - Waitlist release and offer sequence | P1 | Partial coverage found | Offer goes to intended users in sequence and only finalized checkout charges | Medium |
| 9 | MC-PW-P1-009 - Checkout entry path availability matrix | P1 | Partial coverage found | Widget/calendar/tracking/checkout links respect on-sale, off-sale, hidden, and unavailable item states | Medium |
| 10 | MC-PW-P1-010 - Dashboard employee paid-order permissions | P1 | Partial coverage found | Employee role sees allowed paid-order actions and cannot use hidden/disallowed money actions | Medium |

## P0 Candidates

### MC-PW-P0-001 - Provider Final-State Mismatch Guard

**Impacted invariant:** A provider success must produce exactly one paid Showpass order/invoice/ticket set, and a provider failure must not issue tickets, paid invoices, or inventory ownership.

**Representative Jira keys:** SPD-2411, SPD-2396, SPD-2385, SPD-2332, SPD-2326, SPD-2305, SPD-2304, SPD-2291, SPD-1846, SPD-1840, SPD-1788.

**Business risk:** Duplicate charges, unpaid orders marked paid, tickets issued after failed payment, paid provider events stuck as purchase-in-progress, and inventory ownership corruption.

**Current Playwright coverage:** Partial coverage found. Normal purchase coverage is broad, and Authorize invalid OTS repro coverage exists, but a general negative/final-state guard is missing.

**Inspected Playwright files:** `tests/core/checkout/events/single-events.test.ts`, `tests/core/checkout/events/single-events-config.ts`, `flows/checkout-journey.ts`, `flows/box-office-journey.ts`, `pages/public/checkout/steps/PaymentStep.ts`, `pages/dashboard/box-office/TransactionPage.ts`, `tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.test.ts`.

**Backend references:** `/Users/christianvaldez/Documents/Showpass/repos/web-app/settings.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/routers.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_basket.py`.

**Recommended first Playwright proof:** Use the safest existing provider path to force a declined/failed payment response, then assert no order-confirmed UI, no paid invoice transaction, no ticket items, and no inventory ownership. Add the paired positive retry/duplicate-submit proof only if the same helper can preserve `invoiceData.transaction_id` and dashboard transaction evidence.

**Acceptance criteria:** One failed attempt leaves zero paid outcomes; one retry or duplicate submit leaves exactly one paid transaction, one invoice, one order, and the expected ticket count; the assertion fails if provider and Showpass final states disagree.

**Fixture/helper needs:** Reusable final-state assertion helper for buyer order, dashboard transaction, invoice, ticket item, and inventory state; provider failure strategy; duplicate/retry evidence capture.

**What not to test first:** Do not create a provider matrix. Start with one deterministic provider path and one event fixture.

**Priority:** P0

**Confidence:** High

**Open questions:** Which provider path is safest and most production-representative for deterministic failed-payment and retry simulation?

### MC-PW-P0-002 - Gateway-Switch Exchange Payout Reconciliation

**Impacted invariant:** Exchanges, refunds, voids, and credits must create one correct financial outcome and must not duplicate payout or settlement rows.

**Representative Jira keys:** SPD-2434, SPD-2386, SPD-2381, SPD-2377, SPD-2364, SPD-2357, SPD-2345, SPD-2333, SPD-2279, SPD-2228, SPD-1870, SPD-1857.

**Business risk:** Duplicate payout, wrong settlement, incorrect exchange credit, missing replacement ticket, or incorrect report after an exchange.

**Current Playwright coverage:** Partial coverage found. Exchange and ticket-credit happy paths exist, but report/payout reconciliation after exchange/refund/credit was not found.

**Inspected Playwright files:** `tests/core/exchanges/`, `tests/core/ticket-credits/ticket-credits.test.ts`, `tests/core/refund-protection/`, `tests/scripts/void-transactions.test.ts`, `pages/dashboard/box-office/TransactionPage.ts`.

**Backend references:** `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/tests/test_settlement_report.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/tests/test_will_call_financial_report.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py`.

**Recommended first Playwright proof:** Complete one representative exchange that uses credit or a gateway-switch-like financial path, then assert replacement ticket state and one matching settlement/reporting row for the expected amount.

**Acceptance criteria:** Original and replacement orders are traceable; credit/refund amount is correct; payout/settlement/reporting surface has one row for the outcome; no duplicate payout appears.

**Fixture/helper needs:** Stable exchange fixture with reportable financial state; report/export reader helper; expected amount calculator shared with existing exchange expected totals.

**What not to test first:** Do not cover every exchange matrix. Avoid provider-specific gateway switching until a deterministic fixture exists.

**Priority:** P0

**Confidence:** Medium

**Open questions:** Which dashboard/report surface is the accepted source for exchange payout correctness?

### MC-PW-P0-003 - Membership Assigned-Seat Ownership Lifecycle

**Impacted invariant:** Assigned membership seat ownership must remain unique through renewal, move, exchange, resale, and member/non-member conflict paths.

**Representative Jira keys:** SPD-2320, SPD-2288, SPD-2285, SPD-2189, SPD-2176, SPD-2160, SPD-2105, SPD-2079, SPD-2054, SPD-1933, SPD-1584, SPD-1404, SPD-1154.

**Business risk:** Oversold seats, blocked seats that cannot be sold, member seats claimed by non-members, or orphaned seat permissions after season changes.

**Current Playwright coverage:** Partial coverage found. Assigned seating and membership assigned-seat purchase paths exist, including cleanup, but lifecycle ownership transitions were not found.

**Inspected Playwright files:** `tests/core/assigned-seating/events/`, `tests/core/assigned-seating/membership/`, `tests/core/checkout/holds/`, `flows/box-office-journey.ts`, `pages/dashboard/box-office/TransactionPage.ts`.

**Backend references:** `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/` seat permission models, migrations, and assigned seating tests.

**Recommended first Playwright proof:** Use one stable season membership assigned-seat fixture. Buy or renew a member seat, move or exchange it through the supported user/admin path, then assert the old seat is released and the new seat has exactly one active owner.

**Acceptance criteria:** Active ownership count is one; old seat is available or correctly released; new seat is unavailable to another buyer; buyer order and dashboard transaction still reference the expected seat.

**Fixture/helper needs:** Seat identifier capture helper, season membership fixture, read-only seat permission lookup or UI-equivalent ownership proof.

**What not to test first:** Do not start with every venue map or seat-selection algorithm. Use one deterministic seat map and one lifecycle transition.

**Priority:** P0

**Confidence:** Medium

**Open questions:** Which API or UI surface should be treated as the durable seat-permission oracle?

### MC-PW-P0-004 - Gift-Card/User-Credit Redemption Reconciliation

**Impacted invariant:** Stored value must be issued, redeemed, decremented, displayed, and reported exactly once.

**Representative Jira keys:** SPD-2432, SPD-2323, SPD-2046, SPD-1844, SPD-1837, SPD-1831, SPD-1829, SPD-1828, SPD-1791, SPD-1739, SPD-1686, SPD-1607, SPD-1563.

**Business risk:** Lost stored value, duplicated credits, incorrect charge remainder, wrong customer balance, and financial report mismatch.

**Current Playwright coverage:** No coverage found in inspected files for gift-card purchase/redemption. Ticket credits and exchange credits have partial adjacent coverage.

**Inspected Playwright files:** `tests/core/ticket-credits/ticket-credits.test.ts`, `pages/public/checkout/steps/ReviewStep.ts`, `pages/dashboard/box-office/helpers/payment-helper.ts`, `pages/dashboard/box-office/TransactionPage.ts`.

**Backend references:** `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/itemized_calculator.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/tests/test_gift_card_reciepients_report.py`.

**Recommended first Playwright proof:** Seed or create one gift card/user credit, redeem it against a Box Office or public checkout purchase with a remaining balance, then assert applied amount, charged remainder, displayed transaction, customer balance, and report row.

**Acceptance criteria:** Credit applies once; remaining charge is correct; stored balance decrements once; transaction and report surfaces agree; repeated redemption attempt cannot reuse spent value.

**Fixture/helper needs:** Gift-card or user-credit seed helper, balance lookup, transaction/report assertion helper.

**What not to test first:** Do not cover all gift-card denominations, recipient flows, and public/Box Office variants. Start with one partial redemption.

**Priority:** P0

**Confidence:** Medium

**Open questions:** Is gift-card redemption still a strategic Playwright target, or should user-credit redemption be the first stored-value path?

### MC-PW-P0-005 - Financial Report Reconciliation Smoke

**Impacted invariant:** Dashboard reports, exports, settlement, payout, stats, and payment breakdown surfaces must reconcile to transaction truth.

**Representative Jira keys:** SPD-2421, SPD-2420, SPD-2390, SPD-2298, SPD-2284, SPD-2279, SPD-2260, SPD-2254, SPD-2250, SPD-2216, SPD-2195, SPD-1980, SPD-1870, SPD-1810, SPD-1665, SPD-1375, SPD-1187.

**Business risk:** Organizers receive wrong financial data, payouts disagree with sales, exports mislead accounting, or tax/fee/credit rows do not match actual transactions.

**Current Playwright coverage:** No coverage found in inspected files for dashboard report/export/settlement/payout reconciliation. Transaction page verification exists but is not enough.

**Inspected Playwright files:** `pages/dashboard/box-office/TransactionPage.ts`, checkout flow files, repo-wide reporting/report/export/payout searches.

**Backend references:** `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/tests/test_settlement_report.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/tests/test_will_call_financial_report.py`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/services/financial_reports/financial_report.py`.

**Recommended first Playwright proof:** Create one deterministic paid purchase with known total, fee, tax, and discount/credit shape, then compare transaction page amount to one selected dashboard report/export/settlement field.

**Acceptance criteria:** Report row exists for the transaction; gross/net/fee/tax/credit fields match expected values; export and UI agree if both are in scope; no duplicate row appears.

**Fixture/helper needs:** Stable reportable checkout fixture, dashboard report navigation helper, export/API parser if UI table is not durable.

**What not to test first:** Do not automate every report. Start with the report most directly tied to payout or organizer accounting.

**Priority:** P0

**Confidence:** High

**Open questions:** Which report should be the first business-approved reconciliation oracle: settlement, sales report, payment breakdown, or payout view?

## P1 Candidates

### MC-PW-P1-006 - Fee, Tax, And Subtotal Override Reconciliation

**Impacted invariant:** Configured fee, tax, no-fee, and subtotal override rules must produce matching cart, invoice, transaction, and report totals.

**Representative Jira keys:** SPD-2438, SPD-2399, SPD-2352, SPD-2235, SPD-2178, SPD-2127, SPD-2104, SPD-2059, SPD-2019, SPD-1841, SPD-1741, SPD-1399, SPD-1271, SPD-1029.

**Business risk:** Wrong customer charge or wrong organizer accounting.

**Current Playwright coverage:** Partial coverage found. Discounts are covered well; override and fee/tax edge states are not.

**Inspected Playwright files:** `tests/core/checkout/discounts/`, `tests/core/dashboard/discounts/create-event-discount.test.ts`, checkout event configs.

**Backend/frontend references:** Backend financial calculators and report tests listed in [[02 Feature QA/Major Critical Playwright Gap Analysis]].

**Recommended first Playwright proof:** One Box Office or public checkout fixture with subtotal override/no-fee/tax-on-fee rules; assert cart, invoice, transaction, and selected report totals.

**Acceptance criteria:** All displayed and persisted totals match the configured expected amount.

**Fixture/helper needs:** Configured event fixture with explicit expected fee/tax rows.

**What not to test first:** Do not expand the discount matrix; target the override/fee/tax path missing today.

**Priority:** P1

**Confidence:** Medium

**Open questions:** Which fee/tax setting causes the most production risk today?

### MC-PW-P1-007 - Membership Benefit Deletion Lifecycle

**Impacted invariant:** Removed membership benefits and discounts must stop applying immediately, and visible membership levels must match current config.

**Representative Jira keys:** SPD-2437, SPD-2382, SPD-2366, SPD-2361, SPD-2154, SPD-2149, SPD-1842, SPD-1162.

**Business risk:** Incorrect discounted sales, member access failures, or stale benefits visible to customers.

**Current Playwright coverage:** Partial coverage found. Membership purchase and dashboard creation paths exist.

**Inspected Playwright files:** `tests/core/checkout/memberships/`, `tests/core/dashboard/memberships/`, `tests/core/assigned-seating/membership/`.

**Backend/frontend references:** Membership/benefit backend behavior should be checked before implementation.

**Recommended first Playwright proof:** Create or use a membership benefit, verify it applies, remove it, then verify checkout no longer applies it for the same member path.

**Acceptance criteria:** Benefit applies before removal, does not apply after removal, and stale checkout state cannot preserve the removed discount.

**Fixture/helper needs:** Dashboard membership benefit setup/removal helper and member checkout fixture.

**What not to test first:** Do not test every membership level. Use one benefit type with direct money impact.

**Priority:** P1

**Confidence:** Medium

**Open questions:** Which benefit type is most representative: discount, access, seat, or package benefit?

### MC-PW-P1-008 - Waitlist Release And Offer Sequence

**Impacted invariant:** Waitlist offers must go to the intended users in the intended order, and pre-auth or offer state must not charge until finalized.

**Representative Jira keys:** SPD-2379, SPD-2335, SPD-2209, SPD-2095, SPD-1987, SPD-1782.

**Business risk:** Tickets released to the wrong user, public oversell, unexpected charges, or missed waitlist revenue.

**Current Playwright coverage:** Partial coverage found. Waitlist join exists; release/offer/finalization sequence was not found.

**Inspected Playwright files:** `tests/core/waitlist/`, `tests/core/group-sales/`, `tests/core/checkout/holds/group-sale-hold-checkout.test.ts`.

**Backend/frontend references:** Waitlist release backend path should be inspected before implementation.

**Recommended first Playwright proof:** Put two users on a waitlist, release one offer, verify only the intended user can complete checkout, and assert final paid state after completion.

**Acceptance criteria:** Offer sequence is correct; unintended user cannot claim; finalized checkout creates one paid order; pre-finalized state has no charge.

**Fixture/helper needs:** Waitlist release trigger, two-user fixture, final-state helper.

**What not to test first:** Do not start with every waitlist configuration or notification channel.

**Priority:** P1

**Confidence:** Medium

**Open questions:** Is there a safe non-email release trigger for Playwright?

### MC-PW-P1-009 - Checkout Entry Path Availability Matrix

**Impacted invariant:** Widget, calendar, attraction, tracking, and direct checkout links must respect availability, visibility, on-sale/off-sale windows, and unavailable item pruning.

**Representative Jira keys:** SPD-2407, SPD-2368, SPD-2363, SPD-2324, SPD-2310, SPD-2274, SPD-2257, SPD-2230, SPD-2163, SPD-2126, SPD-2080, SPD-1891, SPD-1778.

**Business risk:** Customers cannot buy available tickets, can reach unavailable tickets, or tracking attribution becomes unreliable.

**Current Playwright coverage:** Partial coverage found. Successful widget/tracking/attraction paths exist.

**Inspected Playwright files:** `tests/core/widget/`, `tests/web/checkout/tracking-links/`, `tests/core/checkout/attraction-events/`.

**Backend/frontend references:** Frontend path behavior may be useful for entry-specific routing, but Playwright page objects are enough for first proof.

**Recommended first Playwright proof:** One direct checkout link or widget path with an unavailable item at review; assert user-visible pruning and successful checkout for remaining available item.

**Acceptance criteria:** Unavailable item is not sold; available item can still be purchased; paid order excludes pruned quantity; tracking token or entry metadata is preserved if relevant.

**Fixture/helper needs:** Checkout-link review-pause helper and expected-line adjustment.

**What not to test first:** Do not build a full browser/device/widget matrix.

**Priority:** P1

**Confidence:** Medium

**Open questions:** Which entry path has the highest incident and revenue volume: widget, checkout link, calendar, or attraction?

### MC-PW-P1-010 - Dashboard Employee Paid-Order Permissions

**Impacted invariant:** Employees and sellers must see only permitted paid-order actions and payment methods, and authorized users must still be able to complete required operations.

**Representative Jira keys:** SPD-2415, SPD-2390, SPD-1853, SPD-1386, SPD-1374, SPD-1244.

**Business risk:** Unauthorized refunds/cash/comp/payment access, missing seller visibility, or blocked paid-order operations for authorized staff.

**Current Playwright coverage:** Partial coverage found. Authentication/account navigation exists, but paid-order permission behavior was not found.

**Inspected Playwright files:** `tests/core/authentication/`, `tests/core/account/`, dashboard discount/membership setup tests, Box Office transaction page objects.

**Backend/frontend references:** Backend permission model should be checked before selecting the first role pair.

**Recommended first Playwright proof:** Use two employee roles against the same venue/event. Verify one role can access the allowed paid-order action and the restricted role cannot see or execute the disallowed action.

**Acceptance criteria:** Allowed role succeeds; restricted role is blocked in UI and, where practical, by API response; paid-order state remains unchanged after restricted attempt.

**Fixture/helper needs:** Employee role fixture, permission setup helper, paid transaction fixture.

**What not to test first:** Do not attempt the whole permission matrix. Use one money-affecting permission.

**Priority:** P1

**Confidence:** Medium

**Open questions:** Which permission caused the highest production impact: cash, complimentary, refund, seller view, or report access?

## P2 Or Parked

| Area | Recommendation | Reason |
| --- | --- | --- |
| Custom questions, delivery, barcode, check-in | P2 unless a fresh incident recurs | Basic coverage exists; promote only a repeated artifact/report/check-in invariant. |
| Packages/bundles beyond purchase | P2 or fold into reporting candidate | Package purchase is covered; reporting allocation can be covered by MC-PW-P0-005 if prioritized. |
| Hardware/printer/scanner/device | Parked | Needs hardware/device access unless reduced to printable product-state checks. |
| Async provider callbacks/webhooks | Parked behind strategy | Browser proof needs a safe provider simulator, webhook replay hook, or deterministic backend setup. |
| Support scripts/imports/data moves/demo setup | Not recommended | Not reusable browser behavior unless a product invariant is identified. |
