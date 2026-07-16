# Major Critical Playwright Gap Analysis

Related notes:
- [[06 Prompts/Major Critical Jira To Playwright Gap Exhaustive Worker]]
- [[02 Feature QA/Major Critical Playwright Gap Worker State.json]]
- [[04 Automation/Major Critical Playwright Automation Candidates]]
- [[01 Repositories/QA Automation - showpass-playwright]]
- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]

## Executive Answer

The largest missing Playwright value is not more generic checkout coverage. The current suite already covers many successful purchase paths, discounts, assigned seating purchase, holds, packages, waitlist entry, tracking links, delivery methods, custom questions, exchanges, and ticket credits.

The high-value missing automation is concentrated in five business invariants:

1. Provider final-state mismatch: successful external authorization must create exactly one paid Showpass order, and failed/declined provider attempts must not issue tickets, invoices, or inventory ownership.
2. Dashboard/reporting/payout reconciliation: transaction, report, settlement, payout, tax, fee, discount, credit, and gift-card amounts must agree after money moves.
3. Assigned membership seat ownership lifecycle: renew, move, exchange, resale, and member/non-member conflicts must leave one active owner and no orphaned or duplicated seat permission.
4. Gift card and user-credit redemption: stored value must apply once, decrement correctly, and reconcile through transaction/reporting surfaces.
5. Fee, tax, subtotal override, membership benefit, and permission lifecycle checks: existing tests cover the common happy paths, but repeated incidents show failures in configuration-driven edge states.

The full Major/Critical inventory was processed: 1,352 records, 429 high relevance, 603 medium, and 320 low. No high-relevance records remain ungrouped. Low-signal support, data fix, content/config, demo setup, and hardware-only records were grouped separately and not promoted unless they exposed reusable product-state or money-state risk.

## Existing Playwright Coverage Snapshot

Inspected repo: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Strong existing surfaces:
- Public, Widget, and Box Office checkout purchase paths across Stripe, Authorize.net, Yuno, Affirm, cash, other, comp, card, and 3DS variants.
- Payment flow assertions in `pages/public/checkout/steps/PaymentStep.ts`, including order-confirmed UI and invoice transaction ID comparison.
- Box Office transaction verification in `flows/box-office-journey.ts` and `pages/dashboard/box-office/TransactionPage.ts`.
- Discount and multi-discount checkout coverage in `tests/core/checkout/discounts/`.
- Dashboard discount creation coverage in `tests/core/dashboard/discounts/create-event-discount.test.ts`.
- Exchange happy-path coverage in `tests/core/exchanges/`.
- Ticket-credit coverage in `tests/core/ticket-credits/ticket-credits.test.ts`.
- Assigned seating purchase coverage in `tests/core/assigned-seating/`.
- Regular and group-sale hold checkout in `tests/core/checkout/holds/`.
- Package purchase coverage in `tests/core/packages/`.
- Waitlist join coverage in `tests/core/waitlist/`.
- Tracking-link checkout coverage in `tests/web/checkout/tracking-links/`.
- Custom question and delivery-method coverage in `tests/core/checkout/custom-questions/` and `tests/core/delivery-methods/`.

Key gap: many tests prove that a happy path can complete, but fewer prove the negative or reconciliation invariant that would have caught Major/Critical incidents.

## Incident Pattern Map

| Pattern | Count | Representative Jira keys and summaries | Business invariant |
| --- | ---: | --- | --- |
| Payment final state | 135 | SPD-2411 basket not connected to purchase; SPD-2396 tickets issued when payment failed; SPD-2332 Square payment processed but not registered; SPD-2304 purchase in progress; SPD-1846 gateway/payment mismatch | Provider, basket, invoice, order, ticket, and inventory state must converge to one correct paid or unpaid outcome. |
| Exchange, refund, void, credit | 133 | SPD-2434 exchangeable items missing; SPD-2381 gateway switch exchange duplicate payout; SPD-2377 refund/exchange state; SPD-2345 credit/refund state | Exchanges and refunds must preserve paid totals, credits, replacement tickets, and settlement once. |
| Gift cards and user credits | 29 | SPD-2432 gift card/credit issue; SPD-2323 user credit issue; SPD-1844 gift card behavior; SPD-1837 credit redemption; SPD-1739 balance issue | Stored value must be issued, redeemed, reported, and decremented exactly once. |
| Pricing, fees, discounts, tax | 161 | SPD-2438 subtotal override; SPD-2437 discount/benefit behavior; SPD-2399 fee/tax issue; SPD-2352 total mismatch; SPD-2300 pricing issue | Displayed cart, invoice, charged total, tax, fee, discount, and reporting values must match configured rules. |
| Assigned seating, inventory, holds | 180 | SPD-2427 seat/inventory issue; SPD-2338 seat hold issue; SPD-2320 assigned membership seating; SPD-2285 ownership; SPD-2226 inventory state | Capacity, holds, seat ownership, and ticket issuance must not oversell or orphan inventory. |
| Membership and season benefits | 127 | SPD-2433 membership issue; SPD-2382 membership benefit; SPD-2366 member checkout; SPD-2361 benefit removal; SPD-2154 membership visibility | Membership level, benefit, pricing, and seat ownership state must match current configuration. |
| Packages and bundles | 27 | SPD-2140 package issue; SPD-2075 bundle/package behavior; SPD-1995 package purchase; SPD-1900 package config | Package inventory, pricing, ticket selection, and reporting allocation must reconcile. |
| Waitlist, guestlist, group sales, transfers | 59 | SPD-2436 guestlist/group issue; SPD-2415 transfer/permission; SPD-2379 waitlist; SPD-2247 group sale; SPD-2209 waitlist release | Entry lists and offers must target the correct user, quantity, price, and final paid order. |
| Box Office/POS payment | 66 | SPD-2404 Box Office payment; SPD-2394 POS issue; SPD-2339 terminal/payment; SPD-2147 in-person payment; SPD-2003 Square/terminal | POS payment and terminal state must match Showpass transaction, customer, inventory, and reporting state. |
| Checkout entry paths, widget, calendar | 51 | SPD-2407 widget/calendar checkout; SPD-2368 entry path; SPD-2324 link path; SPD-2230 off-sale/availability; SPD-2163 mobile/widget behavior | Event detail, checkout links, widgets, calendar, and tracking links must respect sale state and carry the right basket. |
| Reporting, dashboard, payouts | 72 | SPD-2421 dashboard/report issue; SPD-2390 stats/reporting; SPD-2298 financial report; SPD-2279 payout; SPD-2216 export | Reports, exports, dashboards, settlement, and payout views must reconcile to transaction truth. |
| Identity, permissions, accounts | 30 | SPD-2384 account ownership; SPD-2334 login/account issue; SPD-2229 access; SPD-1386 permission display; SPD-1374 seller permission | The right user, employee, seller, or buyer must see and act on paid-order state, and unauthorized users must not. |
| Async provider/background state | 30 | SPD-2392 async/provider state; SPD-2227 callback/retry; SPD-2202 delayed job; SPD-2109 webhook/replay | Webhooks, retries, jobs, and delayed provider state must be idempotent and converge correctly. |
| Custom questions, delivery, barcode, check-in | 62 | SPD-2431 custom data; SPD-2429 delivery/barcode; SPD-2412 fulfillment; SPD-2402 check-in; SPD-2336 barcode/PDF | Collected attendee data, delivery artifacts, barcodes, and check-in state must map to the right ticket/order. |
| Hardware/device/printing | 3 | SPD-2289 printing/device; SPD-1479 hardware; SPD-1316 device path | Physical device behavior needs hardware access unless reduced to product-state verification. |
| Support ops, scripts, config, unclassified low-signal | 187 | SPD-2405 support/data; SPD-2362 config/data; SPD-2318 one-off support; plus thin low-signal records | Usually not a Playwright target unless the card exposes a reusable product invariant. |

## Coverage Map

| Pattern | Coverage classification | Inspected Playwright paths | Gap that matters |
| --- | --- | --- | --- |
| Payment final state | Partial coverage found | `tests/core/checkout/events/single-events.test.ts`, `tests/core/checkout/events/single-events-config.ts`, `flows/checkout-journey.ts`, `flows/box-office-journey.ts`, `pages/public/checkout/steps/PaymentStep.ts`, `pages/dashboard/box-office/TransactionPage.ts`, `tests/core/checkout/misc/Authorize/` | Happy paths and one gated Authorize repro exist. Missing durable negative/final-state guard for failed provider, provider success not registered, duplicate submit, and retry convergence. |
| Async provider/background state | Needs product/provider strategy | `tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.test.ts`, provider-specific checkout configs | Browser tests need safe provider simulation, webhook replay, or deterministic test hook before this is durable. |
| Exchange/refund/void/credit | Partial coverage found | `tests/core/exchanges/`, `tests/core/ticket-credits/ticket-credits.test.ts`, `tests/core/refund-protection/`, `tests/scripts/void-transactions.test.ts` | Exchange and ticket-credit happy paths exist. Missing gateway-switch payout duplication and settlement/reporting proof after exchange/refund/credit. |
| Gift cards/user credits | No coverage found in inspected files | `tests/core/ticket-credits/ticket-credits.test.ts`, `pages/public/checkout/steps/ReviewStep.ts`, `pages/dashboard/box-office/helpers/payment-helper.ts`, `pages/dashboard/box-office/TransactionPage.ts` | Ticket credits are covered, but gift-card sale/redemption and user-credit stored-value reconciliation were not found. |
| Pricing/fees/discounts/tax | Partial coverage found | `tests/core/checkout/discounts/`, `tests/core/dashboard/discounts/create-event-discount.test.ts`, `tests/core/checkout/events/single-events-config.ts` | Discounts are well covered. Fee/tax/subtotal override/no-fee/membership benefit lifecycle and reporting reconciliation are not covered enough. |
| Reporting/dashboard/payout | No coverage found in inspected files | Reporting searches across `tests/`, checkout transaction verification paths | Transaction pages are checked, but dashboard reports, exports, settlement, payout, stats, and payment breakdown reconciliation were not found. |
| Assigned seating/inventory/holds | Partial coverage found | `tests/core/assigned-seating/`, `tests/core/checkout/holds/`, `tests/core/packages/` | Purchase, hold, and cleanup paths exist. Missing renewal/move/exchange/resale seat ownership and member/non-member conflict proof. |
| Membership/season benefits | Partial coverage found | `tests/core/checkout/memberships/`, `tests/core/assigned-seating/membership/`, `tests/core/dashboard/memberships/` | Membership purchase and dashboard setup exist. Missing benefit deletion/removal, stale benefit non-application, and season-seat lifecycle proof. |
| Packages/bundles | Partial coverage found | `tests/core/packages/` | Package purchases exist. Missing package revenue realization/reporting and some skipped Box Office multi-ticket package combinations. |
| Waitlist/guestlist/group sales/transfers | Partial coverage found | `tests/core/waitlist/`, `tests/core/group-sales/`, `tests/core/checkout/holds/group-sale-hold-checkout.test.ts` | Join and hold flows exist. Missing release/offer sequence, pre-auth/final charge state, and transfer/permission final-state checks. |
| Box Office/POS payment | Partial coverage found | `flows/box-office-journey.ts`, `pages/dashboard/box-office/`, checkout event configs | Box Office purchase and transaction checks exist. Missing terminal/provider failure convergence, Square custom fee paths, and report/payout reconciliation. |
| Checkout entry/widget/calendar/tracking | Partial coverage found | `tests/core/widget/`, `tests/web/checkout/tracking-links/`, `tests/core/checkout/attraction-events/` | Entry paths are covered for successful purchase. Missing on-sale/off-sale, unavailable item pruning, mobile scroll/state regressions, and tracking attribution report proof. |
| Identity/permission/account | Partial coverage found | `tests/core/authentication/`, `tests/core/account/`, dashboard setup tests | Login/account navigation exists. Missing employee/seller permission checks that affect paid order visibility, payment methods, cash/comp, refunds, and reports. |
| Custom questions/delivery/barcode/check-in | Partial coverage found | `tests/core/checkout/custom-questions/`, `tests/core/delivery-methods/` | Basic capture/delivery paths exist. Missing recurring artifact/report/check-in edge states only if they recur again. |
| Hardware/device/printing | Not a Playwright candidate | Hardware/device terms searched in repo | Needs real hardware or a lower-level simulator. Only product-state surfaces like printable template/PDF link are browser candidates. |
| Support ops/data/config/unclassified | Not a Playwright candidate | Grouped from durable Jira JSON | One-off scripts, imports, data moves, demo setup, and content/config requests are not reusable browser behavior by default. |

## Backend References Used For Behavior Checks

Backend remained the behavior source of truth. Useful references for future implementation planning:

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/settings.py` for payment/webhook routes and the stuck purchase-in-progress task.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/routers.py` for provider webhook routing.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_basket.py` for payment intent, Square terminal, invoice, and basket final-state coverage.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py` for user-credit purchase, refund, and settlement behavior.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py` and `itemized_calculator.py` for credit/gift-card application.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/tests/test_settlement_report.py`, `test_will_call_financial_report.py`, `test_gift_card_reciepients_report.py`, and `test_marketing_campaign_detail_report.py` for report expectations.
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_refund_protection_scenarios.py` for webhook simulation patterns.

## Not Recommended For Playwright First

- Hardware-only printer, scanner, iPad, terminal, and device handling: keep out of browser automation unless reduced to a product-state assertion.
- One-off support scripts, imports, manual data moves, content fixes, and demo/environment setup: not a reusable Playwright target.
- Thin, low-context historical cards with no repeated invariant: keep grouped in state, but do not create a browser test from the card alone.
- Async provider callback internals without a safe provider simulator or test hook: use backend/API coverage first, then add a browser proof only after the final observable user/business state is deterministic.

## Worker Status

Exhausted for read-only planning. The next steps are candidate review and product/provider/fixture decisions for the P0s in [[04 Automation/Major Critical Playwright Automation Candidates]]. No Playwright source, backend source, frontend source, or Qase changes were made.
