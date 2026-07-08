# Checkout Critical Path Gap Analysis

Living workspace for checkout money-movement exploration.

Related notes:
- [[06 Prompts/Checkout Recursive Automation Prioritization Worker]]
- [[02 Feature QA/Checkout Automation Mission Control]]
- [[06 Prompts/Checkout Money Movement Exploration Goal]]
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]
- [[03 Test Cases/Checkout Money Movement Test Drafts]]

## Scope

Focus on the highest-risk checkout paths where money, order state, inventory, confirmation, or reporting can diverge.

Primary source paths:
- Backend: [[01 Repositories/Backend - web-app]] - `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend: [[01 Repositories/Frontend - showpass-frontend]] - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright: [[01 Repositories/QA Automation - showpass-playwright]] - `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`
- Vault: `/Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault`

## Exploration Passes

| Pass | Lens | Status | Notes |
| --- | --- | --- | --- |
| 1 | Checkout entry paths and platforms that can reach money movement | In progress | Added membership hold-link and mixed ticket plus checkout add-on paths |
| 2 | Realistic scenario mixes: ticket type, fees, discounts, payment type, extra items, identity, and inventory state | In progress | Added ticket plus product add-on mixed-basket risk |
| 3 | Payment success, failure, retry, and duplicate submission | Not started |  |
| 4 | Order creation, payment status, and async provider callbacks | In progress | Parked Square Terminal async completion as hardware/provider-strategy gated |
| 5 | Totals: fees, taxes, discounts, promo codes, credits, and gift cards | Not started |  |
| 6 | Inventory, holds, capacity, and seat ownership tied to payment | Not started |  |
| 7 | Buyer identity: guest, logged-in, claim/connect, and account ownership | In progress | Added AUTO-CHK-010 for guest checkout claim/connect ownership; manual Qase coverage exists, Playwright exact flow not found |
| 8 | Confirmation, receipt, transaction detail, payout, and reporting consistency | Not started |  |
| 9 | Existing Playwright fixtures, factories, and missing reusable setup | Not started |  |

## Entry Path Inventory

Fill this after read-only inspection of backend routes, frontend routes, and existing Playwright coverage.

| Entry Path | Platform / Surface | How Buyer Reaches Checkout | Payment Types | Basket Types Supported | Source Reference | Existing Playwright Coverage | Risk Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public event checkout | Web public |  |  |  |  |  |  |
| Direct checkout URL / checkout link | Web public |  |  |  |  |  |  |
| Hold link checkout | Web public |  |  |  |  |  |  |
| Widget checkout | Widget |  |  |  |  |  |  |
| Assigned seating checkout | Web public / Widget / other |  |  |  |  |  |  |
| Package / membership / extra-item checkout | Web public / Widget / other | Event detail, checkout add-ons, product widget, membership hold link | Card / Affirm where supported | Ticket plus product add-on, product-only, membership hold-link | Product checkout matrix: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products-matrix.ts:55`; membership hold link: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/tests/membership_event_batch_tests/test_membership_event_batch_generation.py:748` | Partial coverage for product add-ons; no complete proof found for base ticket plus add-on product in order detail | Mixed basket can hide missing base ticket, add-on product, total, or fulfillment mismatch |
| Mobile/responsive checkout | Web public / Widget |  |  |  |  |  |  |
| Guest checkout | Web public / Widget / other | Buyer continues as guest with email and contact info | Card / wallet where supported | Public tickets, widgets, products/packages where supported | Playwright guest helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-engine.ts:241` | Generic guest checkout covered; no exact claim/connect ownership flow found | Paid order must remain attached to the purchaser email/account only |
| Logged-in checkout | Web public / Widget / other |  |  |  |  |  |  |
| Account claim/connect checkout | Web public / Widget / other | Post-purchase order view, claim link, connect account flow | N/A after purchase | Paid guest order | Claim API: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/public/viewsets.py:11`; claim UI: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/accounts/claim/ClaimForm.tsx:55` | `No coverage found in inspected files` for exact paid-order claim/connect ownership automation | Same-email connect must attach the order; different-email connect must not expose or move it |
| Other discovered path |  |  |  |  |  |  |  |

## Realistic Scenario Mixes

Use this to avoid bloated permutation testing. Each scenario should combine real customer risk factors that are likely to expose money-movement bugs.

| Scenario Mix | Entry Path | Basket Composition | Pricing Complexity | Payment / Identity Path | Why It Matters | Priority |
| --- | --- | --- | --- | --- | --- | --- |
|  |  | Ticket with unusual fee setup plus discount | Fees, taxes, discount | Card payment / guest or logged-in |  |  |
| Ticket plus product add-on | Web public event checkout with CheckoutAddOns | Event ticket plus product add-on | Product price, ticket price, fees, taxes | Card payment / guest or logged-in | Real buyer basket combines admission plus merch/add-on; both fulfillment lines and total must reconcile | P0 |
|  |  | Mixed ticket quantities or ticket types | Partial discount or promo | Card retry or failed payment then retry |  |  |
|  |  | Assigned seat or limited inventory ticket | Seat/inventory ownership | Payment failure or retry |  |  |
|  |  | Held item or direct checkout link | Hold pricing and inventory | Guest or logged-in checkout |  |  |

## Findings

Use the template from [[02 Feature QA/Checkout Money Movement Risk Scoring#Finding Template]].

### Findings Index

| Priority | Score | Finding | Status | Next Action |
| --- | ---: | --- | --- | --- |
| P0 | 94 | Failed payment is not proven to avoid paid order, issued tickets, or inventory consumption | Planning packet drafted | Default to failed Affirm and add Dashboard/API no-paid-outcome proof |
| P0 | 92 | Transaction detail total reconciliation is weaker than it appears | Source-backed gap | Add post-payment Dashboard `amount_paid` / Settlement amount assertion |
| P0 | 96 | Duplicate/retry/replay coverage does not prove one final paid outcome | Planning packet drafted | Add one retry/replay scenario proving one paid transaction/order/ticket set |
| P0 | 91 | Mixed ticket plus checkout add-on coverage does not clearly prove both fulfillment lines | Planning packet ready | Upgrade existing CheckoutAddOns path to verify base ticket, add-on product, and final paid total |
| P0 | 89 | Checkout tracking-link unavailable-item pruning is not proven through paid order reconciliation | Planning packet ready | One checkout-link scenario proving only available items are paid/fulfilled after pruning |
| P1 | 90 | Membership event-batch hold-link checkout lacks reusable Playwright fixture coverage | Fixture spike refined | Retrieve generated hold link through user membership-benefit issue-ticket API |
| P1 | 83 | Refund-protection upsell checkout lacks Playwright source/upsell invoice proof | Planning ready; backend covered | One tokenized upsell purchase proving linked protection-only invoice and no duplicate ticket artifacts |
| P1 | 78 | Gift card purchase path appears uncovered in Playwright checkout money movement | Source-backed gap | Confirm business priority and add stored-value purchase reconciliation if in scope |

### 2026-07-07 Open-Ended Exploration Report

No code, Qase, or vault changes were made during the exploration pass. The report below was generated from read-only backend, frontend, Playwright, and vault inspection.

#### P0 - Failed Payment Is Not Proven To Avoid Paid Order, Issued Tickets, Or Inventory Consumption

**Score:** 91/100  
**Surface:** Web public / Widget  
**Money movement area:** Payment failure, order state, tickets, inventory  
**Confidence:** High

**Entry path and realistic scenario mix:**  
WebPublic or Widget checkout, guest or authenticated buyer, paid ticket with fees, payment-provider failure.

**Evidence:**  
- Backend user purchase endpoint validates and returns purchase serializer data for basket purchase: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:191`.
- Backend purchase docs state order language maps mutable `TicketBasket` to immutable `Invoice`, with ticket/product lines creating `TicketItem`, memberships creating `Member`, and gift-card lines creating stored value: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md:24`.
- Existing failed Affirm tests run only the failure flow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:68`.
- `submitAffirmFailureOrder` asserts the purchase request shape and then fails Affirm, but does not assert no paid order, no ticket issuance, no Dashboard transaction, or no inventory consumption: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts`

**Existing Playwright coverage:**  
Failure UI/request path only.

**Qase/manual:**  
Read-only Qase check found partial related coverage in Qase 660, 661, and 4905; see [[#Secondary Manual / Qase Context]].

**Missing fixture or setup:**  
`failedPaymentNoOrderFixture`, plus Dashboard/API helper to assert no paid invoice/order/tickets.

**Recommended Playwright test:**  
One representative failed-payment test that confirms Dashboard/API has no paid transaction and inventory/seats are not consumed.

**Verification needed:**  
Choose the most production-representative failure path: Stripe decline, Affirm failure, 3DS failure, or webhook failure.

##### 2026-07-07 Worker Result - AUTO-CHK-001 Representative Path

**Result:** Default to failed Affirm first. Product can still override the failure type later, but existing source evidence is strong enough to stop blocking the first no-paid-outcome automation packet.

**Why Affirm first:**  
Failed Affirm is the only inspected failed-payment path with an existing deterministic Playwright flow. It already drives provider failure and verifies the buyer returns to the payment step. Stripe card decline or webhook failure would require new fixture design.

**Additional evidence:**
- Failed Affirm matrix covers WebPublic and Widget, including authenticated and guest WebPublic states: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:31`.
- Failed Affirm WebPublic path calls `payWithAffirmExpectingFailure`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:68`.
- Failed payment step returns `void`, so current flow cannot carry final-state context for negative assertions: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1244`.
- `submitAffirmFailureOrder` asserts the purchase request and provider failure path, but not no-paid invoice/order/ticket state: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`.
- `AffirmPaymentPage.fail` verifies failure toast and payment step visibility: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/external/AffirmPaymentPage.ts:61`.

**Automation planning packet:**  
Use failed Affirm WebPublic guest as the representative first test. Return enough failure context from the failed-payment flow to support a negative Dashboard/API assertion, use a unique buyer or basket context, and prove no paid invoice/order, no usable ticket items, and no permanent inventory consumption after the failure UI assertion.

##### 2026-07-07 Worker Result - PROOF-CHK-003 Failed Payment No-Paid-Outcome Refinement

**Result:** `AUTO-CHK-001` remains rank 2 and planning-ready, with a tighter first implementation contract.

**Evidence:**
- Failed Affirm matrix covers WebPublic and Widget, while the recommended first path is the WebPublic guest branch: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:31`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:68`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:89`.
- Journey runner already receives `cartResult` for failed Affirm but its interface returns `void`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:135`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:284`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:480`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1244`.
- `CartResult` carries item type, item id, quantity, requested quantity, and items added: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-engine.ts:80`.
- Failed payment helper asserts purchase request shape, then Affirm failure returns the buyer to payment with failure toast: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/external/AffirmPaymentPage.ts:61`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/external/AffirmPaymentPage.ts:83`.
- Venue invoice filters support exact buyer email, and invoice-item filters support `invoice__email`, `event`, and `ticket_type`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:200`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:226`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:240`.
- User ticket item API is owner-scoped and supports status/invoice/group filters, so use it only when authenticated ownership or claim context is available: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/filters.py:24` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:831`.

**Refined proof contract:**  
Start with failed Affirm WebPublic guest; return failure context instead of `void`; carry unique buyer email, event id, ticket type id, `CartResult.itemId`, requested quantity, and expected total; assert existing UI failure recovery; then prove no paid venue invoice by exact email and no venue invoice-items by `invoice__email`, `event`, and `ticket_type`. Do not add Stripe decline, webhook failure, Widget, assigned seating, or deeper inventory counter proof until this first no-paid proof is stable.

#### P0 - Transaction Detail Total Reconciliation Is Weaker Than It Appears

**Score:** 92/100  
**Surface:** Box Office, with reusable pattern for one public/widget critical checkout  
**Money movement area:** Totals, fees, taxes, discounts, Dashboard reconciliation  
**Confidence:** High

**Entry path and realistic scenario mix:**  
Box Office checkout with discounts, fees, taxes, products, or memberships; then reuse the same assertion pattern for one public/widget critical checkout.

**Evidence:**  
- Venue invoice serializer exposes `items_total_amount`, `tax`, `discounts`, `amount_paid`, `transaction_id`, `amount_earned`, `final_amount`, `service_charges`, and related reconciliation fields: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:606`.
- Venue financial invoice reads are served by `VenueBasedInvoiceViewSet`, which uses the venue invoice serializer and supports transaction ID search/lookup: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:181`.
- Dashboard transaction detail renders stable header-summary test IDs for amount, fees, taxes, and extra lines such as discounts: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx:309`.
- Dashboard financial breakdown rows expose stable row test IDs by label: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/BreakdownLineItem.web.tsx:48`.
- Sale-style transaction detail renders `Settlement amount` from `amount_paid`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:226`.
- `verifyTransaction` accepts `pricingFeesTaxes.valueOnTransactionPage`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:276`.
- Inspected transaction detail assertions verify buyer, email, phone, sold-by, transaction ID, and labels, but not the expected transaction-page total: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:210`.
- Box Office journey passes expected total into `verifyTransaction`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/box-office-journey.ts:460`.
- Box Office payment helper verifies checkout summary totals before payment, not necessarily post-payment Dashboard transaction detail totals: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:163`.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/invoice-variants/invoice-variant-config.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/BreakdownLineItem.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/box-office-journey.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts`

**Existing Playwright coverage:**  
Box Office tests pass expected totals through the API, but inspected transaction detail assertions do not use them. Existing coverage checks buyer and transaction identity, not post-payment money reconciliation.

**Qase/manual:**  
Read-only Qase check found partial related coverage in Qase 935; see [[#Secondary Manual / Qase Context]].

**Missing fixture or setup:**  
`dashboardTransactionReconciliationFixture` or a small transaction-detail assertion helper that reads the existing Dashboard financial breakdown rows.

**Recommended Playwright test:**  
Assert transaction detail `Settlement amount` / `amount_paid` matches the checkout expected total for one complex P0 money basket; add fees, taxes, and discount checks using the existing header-summary or financial-breakdown row IDs where the fixture creates those values.

**Verification needed:**  
Confirm whether the first implementation should use the existing Box Office scenarios only, or also one public/widget checkout that navigates to Dashboard transaction detail after purchase.

##### 2026-07-07 Worker Result - AUTO-CHK-003 Evidence Confirmation

**Result:** Planning packet ready.  
**Score:** 92/100  
**Confidence:** High

**Why this matters:**  
This is a reusable assertion gap. The Playwright helper already receives the expected transaction total, and the Dashboard frontend/backend expose stable money fields, but the current helper does not assert the post-payment total.

**Recommended automation:**  
Extend `TransactionPage.verifyTransactionDetails` to assert `pricingFeesTaxes.valueOnTransactionPage` against the Dashboard `Settlement amount` / `amount_paid` row, then add optional fees, taxes, and discount checks for one complex money basket.

##### 2026-07-07 Worker Result - AUTO-CHK-003 Automation Planning Packet

**Result:** Planning packet ready.  
**Best first scenario:** Existing Box Office discount checkout, because it already passes `expectedTotalBO` into `verifyTransaction` and exercises a realistic adjusted money total.

**Additional evidence:**
- Frontend breakdown rows expose `data-testid="financial-breakdown-row-{label}"`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/BreakdownLineItem.web.tsx:48`.
- Sale-style transaction detail renders `Settlement amount` from `amountPaid`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:226`.
- `verifyTransaction` accepts `pricingFeesTaxes.valueOnTransactionPage`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:276`.
- `verifyTransactionDetails` currently verifies buyer, phone, sold-by, transaction ID, and labels, but not `pricingFeesTaxes`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:210`.
- Existing discount checkout passes `expectedTotalBO` into `verifyTransaction`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:417`.

**Automation planning packet:**  
Add `pricingFeesTaxes` to `verifyTransactionDetails`, locate `transactionRow.getByTestId("financial-breakdown-row-Settlement amount")`, and assert it contains `pricingFeesTaxes.valueOnTransactionPage`. This strengthens every existing caller that already passes expected totals, without adding a new broad scenario.

##### 2026-07-07 Worker Result - PROOF-CHK-004 Dashboard Settlement Amount Refinement

**Result:** `AUTO-CHK-003` remains rank 3 and planning-ready as a helper assertion upgrade.

**Evidence:**
- Venue invoice serializer exposes transaction and amount fields used by Dashboard transaction detail: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:600`.
- Frontend normalizes `amount_paid` into `amountPaid`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:74`.
- Frontend source explicitly says `Settlement amount` deliberately reads `amount_paid` / `amountPaid`, while header gross revenue can differ: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:218`.
- `Settlement amount` is rendered through the stable row test id pattern: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:226` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/BreakdownLineItem.web.tsx:48`.
- Playwright `verifyTransactionDetails` verifies identity fields but does not currently assert `pricingFeesTaxes`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:210`.
- Playwright `verifyTransaction` already accepts `pricingFeesTaxes.valueOnTransactionPage`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:276`.
- Existing Box Office callers already pass expected totals, including discount, product, membership, hold, and shared Box Office journey paths: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:417`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:578`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/memberships/checkout-memberships.test.ts:448`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/holds/regular-hold-checkout.test.ts:570`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/box-office-journey.ts:460`.

**Refined proof contract:**  
Add `pricingFeesTaxes` to private `TransactionPage.verifyTransactionDetails`; after existing identity checks, assert `transactionRow.getByTestId("financial-breakdown-row-Settlement amount")` contains `pricingFeesTaxes.valueOnTransactionPage`; do not use header gross revenue; do not add a new checkout scenario for the first implementation.

#### P0 - Duplicate / Retry / Replay Coverage Does Not Prove One Final Paid Outcome

**Score:** 85/100  
**Surface:** Web public / Widget / Box Office  
**Money movement area:** Duplicate charge, idempotency, retry, order integrity  
**Confidence:** Medium

**Entry path and realistic scenario mix:**  
WebPublic or Widget card payment with slow submit, repeated click or replay, paid ticket with fees.

**Evidence:**  
- Backend basket updates are protected by checkout idempotency and row locking: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/serializers/viewsets.py:380`.
- Backend checkout concurrency docs call out idempotency, row locks, purchase-limit locks, and reset behavior for `purchase_in_progress`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:75`.
- Authorize repro scenarios include throttled panic-click, slow purchase, and diagnostic replay: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.config.ts:53`.
- Diagnostic replay records replay response evidence but does not assert one successful paid transaction/order/ticket set: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:379`.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/serializers/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.config.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts`

**Existing Playwright coverage:**  
Authorize repro suite exercises repeated click/replay scenarios when explicitly enabled, but the final money state proof is not present in inspected files.

**Qase/manual:**  
Read-only Qase check found no exact duplicate submit/replay one-paid-outcome case; see [[#Secondary Manual / Qase Context]].

**Missing fixture or setup:**  
`duplicateSubmitHarness`, plus one-invoice assertion helper.

**Recommended Playwright test:**  
One retry or double-submit scenario that proves exactly one successful transaction, one order, and expected issued ticket count.

**Verification needed:**  
Decide whether Dashboard-only proof is enough or API invoice/payment lookup is required.

##### 2026-07-07 Worker Result - AUTO-CHK-002 Ranking Update

**Score:** 96/100  
**Confidence:** High  
**Result:** Promote to best unblocked automation target.

**Evidence:**  
- Backend basket updates use idempotency and row locking: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/serializers/viewsets.py:380`.
- Backend checkout concurrency docs call out idempotency, row locks, purchase-limit locks, and reset behavior for `purchase_in_progress`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:75`.
- Authorize repro scenarios include panic-click, slow purchase, and diagnostic replay: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.config.ts:53`.
- Diagnostic replay posts the same purchase payload and records replay response evidence, but does not assert one final paid outcome: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:379`.
- WebPublic and Widget repro surfaces finish at `verifyConfirmation`; Box Office uses `andVerifyTransaction`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:539`.
- Dashboard `filterByTransactionId` expects exactly one transaction row action menu after filtering: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`.

**Recommended automation:**  
Extend one existing Authorize panic-click or diagnostic replay path to assert exactly one Dashboard transaction/order/ticket set using `invoiceData.transaction_id` and `filterByTransactionId`; add API invoice/payment count if Dashboard proof is insufficient.

##### 2026-07-07 Worker Result - AUTO-CHK-002 Automation Planning Packet

**Result:** Planning packet ready.  
**Best first scenario:** `diagnostic-replay-purchase` on one WebPublic guest checkout. This directly replays the same `/purchase/` payload and avoids turning the full Authorize repro matrix into a broad test expansion.

**Additional evidence:**
- Repro test runs each scenario/surface inside `withAuthorizeInvalidOtsReproEnv` and installs capture hooks before `surface.run`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.test.ts:87`.
- WebPublic and Widget branches currently await `.verifyConfirmation(...).result()` but discard the returned checkout result: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:539`.
- `PostPurchaseStep.result()` returns `CheckoutResult`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1489`.
- Payment completion returns `invoiceData` and asserts the confirmation order ID matches `invoiceData.transaction_id`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:430`.
- `TransactionPage.filterByTransactionId` filters by transaction ID and expects exactly one actions-menu row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`.

**Automation planning packet:**  
Change the Authorize surface runner type to return checkout result or invoice data, capture it in `authorize-invalid-ots-repro.test.ts`, and add a final-state assertion helper that proves exactly one paid transaction/order/ticket set for `invoiceData.transaction_id`. Use Dashboard transaction filtering first; add an API invoice-count assertion only if Dashboard proof is not enough.

##### 2026-07-07 Worker Result - PROOF-CHK-002 Duplicate Final-State Proof Refinement

**Result:** `AUTO-CHK-002` remains the best next automation target, with a tighter first implementation contract.

**Evidence:**
- Diagnostic replay posts the same purchase payload and stores replay response evidence in `state.purchaseReplays`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:379`.
- WebPublic currently awaits confirmation result but discards the returned checkout result: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:539`.
- The test runner currently awaits `surface.run(page, view)` without capturing invoice data: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.test.ts:87`.
- Checkout payment captures `invoiceData` from the financial invoice response: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:430`.
- `CheckoutResult` can be returned from post-purchase result: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1489`.
- Dashboard transaction filtering by `transaction_id` expects exactly one transaction actions row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:343`.
- Venue invoice lookup uses `transaction_id`, and venue invoice-items can filter by `invoice__transaction_id`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:179`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:623`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:235`.

**Refined proof contract:**  
Start with WebPublic guest `diagnostic-replay-purchase`; return `CheckoutResult` or `invoiceData`; preserve replay response evidence; prove exactly one Dashboard transaction row by `transaction_id`; use venue invoice/invoice-items API only for item quantity/detail support; do not expand to Widget, Box Office, throttled panic-click, or every replay variant until the first proof is stable.

#### P0 - Mixed Ticket Plus Checkout Add-On Coverage Does Not Clearly Prove Both Fulfillment Lines

**Score:** 91/100  
**Surface:** Web public event checkout / CheckoutAddOns  
**Money movement area:** Mixed basket totals, ticket/product fulfillment, confirmation/order detail  
**Confidence:** Medium

**Entry path and realistic scenario mix:**  
Buyer adds an event ticket, reaches checkout, adds a product from checkout add-ons, pays by card, then confirmation/order detail should show both the base ticket and add-on product with the final paid total.

**Evidence:**
- Backend checkout docs treat `TicketBasket` as the mutable order container for tickets, products/add-ons, memberships, gift cards, donations, protection, and related checkout lines: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:14`.
- Purchase docs state ticket/product lines create `TicketItem` outcomes: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md:28`.
- Purchase service selects item groups with `type` and `product_attribute` data: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:111`.
- Ticket generator copies ticket/product, invoice, price, and payment fields into generated items: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/ticket_generator_service.py:91`.
- Playwright `CheckoutAddOns` path adds an event ticket first: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:284`.
- Same path completes checkout with `addOns` only for the CheckoutAddOns branch: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:405`.
- Same path builds order-confirmation item details from `addOns` only: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:434`.
- Order confirmation verifier checks the item details it receives: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`.

**Coverage gap:**  
Existing product coverage is not absent; the gap is weaker than it first looks. The inspected mixed-basket path exercises ticket plus checkout add-on, but does not clearly prove the paid order contains both the base event ticket and add-on product in confirmation/order detail.

**Recommended next test:**  
Upgrade the existing `CheckoutAddOns` branch instead of adding a new scenario: pass both base event ticket details and add-on product details into order confirmation verification, then assert final paid total.

**Verification needed:**  
No further Qase read is needed for the scanned project/scope unless reviewers know a hidden case outside the local bulk scan. A separate Playwright case may still exist outside inspected files.

##### 2026-07-07 Worker Result - AUTO-CHK-006 Qase Coverage Check

**Result:** Partial related Qase coverage found; no exact case found.  
**Reviewed source:** `/private/tmp/qase-checkout-money-cases-all.json` plus `/private/tmp/qase-checkout-addon-case-details.json`.  
**Cases reviewed:** Qase 360, 388, 466, 935, 4763, 4817.

**Evidence summary:**  
- Qase 360 covers add-on modal/cart behavior, but not paid order fulfillment.
- Qase 388 covers a broad attraction mixed-item purchase with products, but not specifically event ticket plus checkout add-on fulfillment-line reconciliation.
- Qase 466 covers product add-on purchase and confirmation of the add-on product, but does not clearly require the base event ticket to appear in the same final paid order proof.
- Qase 935 covers transaction/module price fee fields by item type.
- Qase 4763 covers refund selection for `TicketAndProduct`, not the purchase confirmation gap.
- Qase 4817 covers transaction item breakdown rows by item type, not mixed ticket-plus-add-on checkout confirmation.

**Planning impact:**  
Keep AUTO-CHK-006 as a valid planning-ready automation gap. The best automation remains upgrading the existing `CheckoutAddOns` branch to assert base ticket, add-on product, and final paid total for the same paid transaction.

##### 2026-07-07 Worker Result - PROOF-CHK-005 Mixed Basket Final-State Refinement

**Result:** `AUTO-CHK-006` remains rank 4 and planning-ready. The first implementation should refine the existing `CheckoutAddOns` path instead of adding another product permutation.

**Refined proof contract:**
- Preserve base event ticket `ItemDetails` from `extractEventItemDetails(basketResponse)`.
- Build add-on product `ItemDetails` from `addOns`.
- Pass both lines into `verifyOrderConfirmationThroughCheckout`.
- Keep `getVerificationTotal(productData, true)` as the combined paid-total proof.
- Use per-line `expectedBarcodeQuantity` only if ticket/product barcode counts differ.
- Use venue invoice-items API proof filtered by `invoice__transaction_id`, `event`, `ticket_type`, `product`, and `product_attribute` only if UI order detail cannot prove both fulfillment lines.

**Evidence refs:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:284`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:311`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:434`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:442`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:269`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/payment-helpers.ts:109`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:239`.

#### P0 - Checkout Tracking-Link Unavailable-Item Pruning Is Not Proven Through Paid Order Reconciliation

**Score:** 89/100  
**Surface:** Web public checkout tracking link  
**Money movement area:** Inventory, basket mutation, payment total, order fulfillment  
**Confidence:** Medium

**Entry path and realistic scenario mix:**  
Buyer opens a checkout tracking link that seeds configured ticket extras, already has an existing basket or prior basket identity, some configured extras are unavailable, then continues checkout with valid remaining items.

**Evidence:**  
- Frontend checkout-link review uses `modifyItems` and retries lower quantities when an extra cannot be added: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:73`.
- The review seeds mutation state with existing basket identity to preserve append-to-current-basket behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:191`.
- Unavailable quantities render in the unavailable items section: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:369`.
- Playwright `fromCheckoutLink` opens the checkout link and continues to auth: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:687`.
- Tracking-link runner pays normal tracking links and verifies confirmation: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/web/checkout/tracking-links/checkout-tracking-links-runner.ts:102`.
- Frontend unit coverage checks latest basket config reuse and unavailable-items rendering: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.test.tsx:319`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.test.tsx:448`.
- Qase 4802 covers checkout-link review with unavailable items and existing basket, but only says checkout can continue when valid items remain: `/private/tmp/qase-checkout-tracking-link-case-details.json`.

**Coverage gap:**  
Existing coverage is split: Playwright proves normal tracking-link purchase, frontend unit tests prove review mutation behavior, and Qase 4802 covers review handling. Inspected coverage does not prove a paid order contains only available items, excludes unavailable quantities, preserves existing-basket identity, and charges the correct final total after pruning.

**Recommended next test:**  
One checkout-link scenario with existing basket plus partially unavailable configured extras. Continue to checkout only when valid items remain, complete payment, then assert final order/confirmation contains only available items and the charged total matches the remaining basket.

**Verification needed:**  
Later implementation should confirm fixture control can deterministically make only some configured extras unavailable without destructive setup.

##### 2026-07-07 Worker Result - AUTO-CHK-007 Planning Packet

**Result:** Planning packet ready.  
**Best first scenario:** WebPublic checkout link with existing basket identity, partially unavailable configured extras, one valid remaining item, and card payment.

**Handoff summary:**  
Use the existing checkout-link entry and payment helpers, but add a fixture contract that records requested quantity, unavailable/removed quantity, expected remaining quantity, and expected pruned total. Final proof should assert that the paid order excludes unavailable quantities, the charged total matches the remaining basket, and confirmation/order detail references the same transaction.

#### P1 - Membership Event-Batch Hold-Link Checkout Lacks Reusable Playwright Fixture Coverage

**Score:** 90/100  
**Surface:** Membership ticket-batch hold link to public hold checkout  
**Money movement area:** Member ticket pricing, public payment, hold expiry, ticket issuance, inventory/seats  
**Confidence:** Medium

**Entry path and realistic scenario mix:**  
Member receives a hold link for unpaid ticket-batch tickets or seats, pays through public hold checkout, and should receive the correct ticket/seat entitlement at the expected member price.

**Evidence:**  
- Membership ticket-batch UI supports `Send hold link for unpaid tickets` and states seats remain on hold until expiry: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-batches-form/DeliveryMethod.web.tsx:122`.
- Ticket pricing copy states hold-link customers have not paid yet and the ticket price is used to charge members: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-batches-form/TicketPricing.web.tsx:66`.
- Membership batch factory returns `HoldGeneratorService` for hold batches and passes `hold_expiry_date`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/batch_ticket_generator_factory.py:17`.
- Membership hold batch pricing resolves level-specific price, `hold_default_ticket_price`, or membership level price: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/batch_ticket_group_builder.py:192`.
- Dynamic hold purchase logic performs membership limit and inventory validation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/dynamic_hold/dynamic_hold.py:296`.
- Public hold links bypass the venue login requirement and keep pre-saved discounts: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:635`.
- Existing Playwright regular hold checkout captures and buys a Box Office hold link: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/holds/regular-hold-checkout.test.ts:242`.
- Existing Playwright membership journey supports assigned-seating membership purchase, not membership event-batch hold-link checkout in inspected files: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/membership-checkout-journey.ts:146`.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-batches-form/DeliveryMethod.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-batches-form/TicketPricing.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/batch_ticket_generator_factory.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/batch_ticket_group_builder.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/dynamic_hold/dynamic_hold.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/holds/regular-hold-checkout.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/membership-checkout-journey.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/membership/membership-assigned-seating-purchase-flows.ts`

**Existing Playwright coverage:**  
No coverage found in inspected files for membership event-batch hold-link checkout. Related coverage exists for regular Box Office hold checkout and assigned-seating membership purchase.

**Qase/manual:**  
Read-only Qase check found partial related coverage in Qase 431, 863, and 2868; see [[#Secondary Manual / Qase Context]].

**Missing fixture or setup:**  
Membership event-batch hold-link fixture that can create or retrieve a member-specific hold basket with known price, expiry, and optional seat/inventory state.

**Recommended Playwright test:**  
One representative membership hold-link checkout proving paid amount, ticket/member entitlement, Dashboard transaction, and inventory/seat ownership after purchase.

**Verification needed:**  
Confirm fixture feasibility and whether membership hold-link purchases are frequent or incident-prone enough to promote above ready P0 enablers.

##### 2026-07-07 Worker Result - AUTO-CHK-005 Fixture Feasibility

**Result:** Keep as P1, change next action to fixture spike. Backend source proves the API and purchase path exist, but inspected Playwright helpers do not yet provide reusable setup for creating a membership event-batch hold link.

**Additional evidence:**
- Venue router registers `/api/venue/memberships/membership-event-batches/`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/routers.py:244`.
- Membership event-batch viewset exposes `POST .../generate/` and queues hold-link generation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/venue_based/viewsets.py:740`.
- Backend tests create a HOLD membership event batch, generate it, verify `hold_link` / `hold_link_slug`, retrieve the hold basket, purchase it through `/api/user/tickets/baskets/holds/{slug}/purchase/`, and assert invoice/ticket outcomes: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/tests/membership_event_batch_tests/test_membership_event_batch_generation.py:787`.
- Playwright fixture layer inspected at `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/fixtures.ts:9` only re-exports base Playwright test.
- Playwright API helpers inspected at `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/api-helpers.ts:255` include transaction voiding, but no generalized membership event-batch hold-link seeding helper.

**Next action:**  
Create a fixture spike before full E2E automation: create the membership event batch through the venue API, trigger `generate/`, retrieve the generated `hold_link_slug`, then reuse regular hold checkout helpers for public purchase and amount, entitlement, Dashboard transaction, and inventory/seat assertions.

##### 2026-07-07 Worker Result - AUTO-CHK-005 Fixture Retrieval Path

**Result:** Fixture spike is more concrete. The generated hold link can likely be retrieved through user membership-benefit issue-ticket data after the member and batch are generated.

**Additional evidence:**
- User route registers `memberships/membership-benefit-issue-tickets`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/routers.py:96`.
- The user issue-ticket viewset requires authentication and filters by `member`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/viewsets.py:177`.
- The filter requires `member`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/filters.py:156`.
- The serializer includes `member_ticket_batches` and exposes `hold_link` for HOLD batches: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/serializers.py:390`.
- Member ticket batch creation links the generated member, event batch, generated tickets, and source basket: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/member_batch_generator.py:168`.

**Refined fixture spike:**  
Create/generate the hold batch through the venue API, identify the generated member ID from the membership purchase/setup path, call `/api/user/memberships/membership-benefit-issue-tickets/?member={memberId}`, extract `member_ticket_batches[].hold_link`, normalize it with existing hold-link navigation, then complete public hold checkout and assert amount, entitlement, Dashboard transaction, and inventory/seat state.

**Remaining uncertainty:**  
The spike still needs a reliable Playwright setup path for creating or identifying the member ID without direct database access.

##### 2026-07-07 Worker Result - AUTO-CHK-005 Member ID Retrieval Path

**Result:** Fixture plan tightened. Prefer retrieving `memberId` through the user memberships members API after membership purchase, then using that member id to retrieve generated issue-ticket hold links.

**Additional evidence:**
- User route registers `memberships/members`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/routers.py:90`.
- User member viewset is read-only and exposes searchable/filterable member records: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/viewsets.py:54`.
- User member serializer includes `id`, user, membership level, membership group, and status: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/serializers.py:139`.
- User member filter supports membership level/group filters: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/filters.py:21`.
- Existing Playwright membership checkout returns `invoiceData` and item context, but the `InvoiceData` type does not explicitly expose a member id: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Purchase.ts:43`.

**Refined fixture path:**  
After membership purchase, query `/api/user/memberships/members/` as the buyer using known membership level/group context, select the intended `member.id`, call `/api/user/memberships/membership-benefit-issue-tickets/?member={memberId}`, extract `member_ticket_batches[].hold_link`, normalize it with regular hold checkout link handling, then complete public hold checkout.

**Verification needed:**  
Confirm the user member lookup can uniquely identify the newly purchased member in Playwright static data. If reused users can have stale members, the fixture should create or select a unique buyer/member context before retrieving the hold link.

#### P1 - Gift Card Purchase Path Appears Uncovered In Playwright Checkout Money Movement

**Score:** 78/100  
**Surface:** Public gift-card purchase to checkout  
**Money movement area:** Stored value, checkout total, transaction reconciliation  
**Confidence:** Medium

**Entry path and realistic scenario mix:**  
Public gift-card purchase page, known gift-card amount, buyer identity, checkout, stored-value creation, Dashboard/API confirmation.

**Evidence:**  
- Frontend has a public gift-card purchase route: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/o/[venueSlug]/purchase-gift-card/index.tsx:13`.
- Gift-card form redirects to checkout: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/gift-cards/GiftCardPurchaseForm.tsx:90`.
- Gift-card checkout button is exposed by `gift-card-purchase-form-checkout`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/gift-cards/GiftCardPurchaseForm.tsx:451`.
- Backend purchase docs state gift-card lines create stored value: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md:28`.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/o/[venueSlug]/purchase-gift-card/index.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/gift-cards/GiftCardPurchaseForm.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages`

**Existing Playwright coverage:**  
No coverage found in inspected files for `gift card`, `gift-card`, `GiftCard`, or `purchase-gift-card`.

**Qase/manual:**  
Read-only Qase check still needs business-priority interpretation before creating or updating gift-card cases.

**Missing fixture or setup:**  
Public gift-card purchase fixture with known amount and buyer identity.

**Recommended Playwright test:**  
One gift-card purchase test proving paid checkout creates stored value and reconciles transaction amount.

**Verification needed:**  
Confirm whether gift cards are in the current money-movement critical path for the business.

#### Recommended Representative Automation Set

- Failed payment does not create paid order, usable tickets, or consumed inventory.
- Duplicate submit, replay, refresh, or retry produces exactly one successful paid outcome.
- One complex money basket reconciles checkout total, receipt/order detail, and Dashboard transaction detail.
- One package revenue-realization purchase reconciles child stat allocation against parent package sale and reporting surface if Qase detail check does not prove existing automation.
- One gift-card purchase creates correct stored value and transaction amount if gift cards are business-critical.

### P0 - Package Revenue-Realization Reporting Reconciliation Needs Automation Proof

**Score:** 84/100  
**Surface:** Package Checkout / Dashboard Reporting / API  
**Money movement area:** Reporting / Payout / Transaction detail  
**Confidence:** Medium  

**Risk:**  
- Package checkout can succeed while child revenue-realization stat allocation or reporting/payout values are wrong.
- This is lower than duplicate/failure risks because inspected package purchase coverage is broad, but it still maps to the P0 override for reporting, transaction, and payout disagreement.

**Evidence:**  
- Backend docs say package revenue realization applies stored child percentages at purchase/invoice time and changes reporting/settlement truth.
- Backend purchase serializer rebuilds package child groups and calls revenue-realization processing.
- Backend financial services set `percent_allocation_applied_from_package` and disperse parent stat fields to child invoice items.
- Venue invoice-items API can be filtered by invoice and exposes stat fields such as `final_amount_stat`, `amount_paid_stat`, `amount_earned_stat`, `tax_stat`, and `is_sub_ticket`.
- Playwright package suites cover WebPublic, Widget, and WebBoxOffice purchase flows, but inspected package tests did not show stat-field or package revenue-realization reporting assertions.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/package_revenue_realization.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/financial_flows.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/revenue_realization/ticket_item_group_allocation.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/revenue_realization/invoice_item_propagation/invoice_item_propagators.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/routers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/package-checkout-engine.ts`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Source behavior:**  
- Backend: package revenue realization is a two-stage system and can diverge base parent/child fields from `*_stat` fields.
- Frontend/Dashboard: transaction detail can support transaction identity and paid-total proof, but inspected code does not expose child package stat allocation.
- Playwright: broad package purchase coverage exists; no inspected package test proves child revenue-realization stat reconciliation.
- Qase/manual: Qase 4229 and Qase 3879 are related but do not explicitly prove child revenue-realization stat allocation or reporting/payout reconciliation.

**Coverage gap:**  
- Existing package automation proves purchase/confirmation paths, but not that package child `*_stat` fields and reporting/payout surfaces reconcile after checkout.

**Missing fixture or setup:**  
- Package fixture with child revenue realization enabled and known parent/child allocation expectations.

**Recommended next test:**  
- One representative custom or preset package checkout with child revenue realization enabled, followed by venue invoice-items API proof that child `*_stat` fields reconcile to known fixture expectations and package reporting totals. Use Dashboard transaction detail only as secondary transaction identity and paid-total proof.

**Resolved planning decision:**  
- Use `/api/venue/financials/invoices/items/?invoice={invoiceId}` as the primary proof surface. Do not assert exact `percent_allocation_applied_from_package` or `parent_ticket_invoice_item` through this API unless another source-backed helper/API exposes those fields.

**Verification needed:**  
- Future handoff note: a separate implementation task should use deterministic package fixture expectations for exposed child stat fields. This is not a blocked step for the planning worker.

### P1 - Square Terminal Async Completion Is Hardware-Gated For Playwright

**Candidate:** AUTO-CHK-009  
**Score:** 82/100  
**Money movement area:** Async payment completion / Box Office / Terminal checkout  
**Confidence:** Medium  

**Risk:**  
- Square Terminal checkout can leave the basket in an async pending/completed/canceled state, and webhook or polling completion finalizes the paid Box Office order.
- This is important, but not the current best Playwright automation target because real automation likely needs terminal hardware, provider access, or a simulator design.

**Evidence:**  
- Backend docs describe terminal checkout as a Box Office special case where Square webhook or Shift4 task updates terminal completion/cancellation state and then Showpass finalizes the same basket.
- Backend docs say Square terminal checkout is asynchronous and relies on webhook completion for final purchase handling.
- Square webhook factory routes `terminal.checkout.updated` to the terminal checkout service.
- Webhook handler locks the basket, exits idempotently for final states, and calls purchase completion when Square reports `COMPLETED`.
- Venue purchase service creates a terminal payment request first, then later validates Square completion and payment IDs.
- Playwright exact Square Terminal purchase coverage was not found in inspected files.
- Qase/manual coverage exists for Square Terminal checkout amount, cancel/retry, success, source-platform, payment switching, and settlement/exchange paths.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/square_terminal_box_office.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/services/square/webhook_handlers/factory.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/services/square/webhook_handlers/checkout/checkout_updated.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage gap:**  
- Playwright: `No coverage found in inspected files` for exact Square Terminal purchase automation; only generated enum constants matched the exact Square Terminal search.
- Qase/manual: Qase 2574 covers Square Terminal checkout amount, cancel/retry, and success. Qase 2653, 4097, and 4914 are related source-platform, switching, settlement, and exchange cases.

**Planning decision:**  
- Park this branch until QA/product chooses one strategy: keep manual/Qase-backed, run a controlled hardware suite, or build a mocked webhook/provider simulator.

**Verification needed:**  
- Confirm whether Square Terminal should be automated with real hardware, simulated provider/webhook completion, or kept as manual regression coverage.

### P1 - Guest Checkout Claim/Connect Ownership Has Manual Coverage But No Exact Playwright Flow Found

**Candidate ID:** AUTO-CHK-010  
**Score:** 86/100  
**Money movement area:** Buyer identity / paid order ownership / account claim-connect  
**Confidence:** Medium  

**Risk:**  
- A paid guest order must connect only to the purchaser's intended account.
- A different signed-in buyer must not be able to claim, view, or attach the paid order.

**Evidence:**  
- Public claim API retrieves claimable users by UUID and claims them by setting password, clearing `to_be_claimed`, activating the user, and auto-logging in.
- Guest merge/adopt logic can reassign paid invoices, baskets, ticket item groups, ticket items, memberships, notification tokens, and email ownership to a target user.
- Frontend claim UI explicitly handles logged-out, already-claimed, claim-owner, and wrong-logged-in-user states.
- Playwright has guest/auth/new-user checkout helpers and My Orders verification helpers, but no exact claim/connect ownership flow was found in inspected files.
- Qase 2946 covers same-email connect plus different-email rejection; Qase 2558, 4056, 4907, and 4966 are related.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/public/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/public/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/services/venue_user_merge_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/tests/test_venue_user_merge_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/accounts/claim/ClaimForm.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-engine.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage gap:**  
- Playwright: `No coverage found in inspected files` for exact paid guest order claim/connect ownership automation.
- Qase/manual: Qase 2946 is the closest manual case; related cases cover mismatch error, guest order view, owner scoping, and claim context preservation.

**Recommended automation:**  
- One representative paid guest checkout: connect with same email, verify the order appears under that account's My Orders, then attempt different-email connect or direct access and assert rejection/no ownership transfer.

**Verification needed:**  
- Confirm whether a hidden Playwright claim/connect spec exists outside inspected paths before shaping this into a full handoff packet.

### P1 - Stripe PaymentIntent Cancel/Webhook Recovery Has Manual Coverage But No Exact Playwright Final-State Proof Found

**Candidate ID:** AUTO-CHK-011  
**Score:** 88/100  
**Money movement area:** async payment callback / canceled PaymentIntent / retry-safe failure  
**Confidence:** Medium  

**Risk:**  
- A canceled, failed, or delayed PaymentIntent must not create a paid order or usable tickets.
- A retry after cancellation or OAuth-delay recovery must create exactly one final paid outcome.

**Evidence:**  
- Backend exposes `POST /stripe/payment-intent/` for basket PaymentIntent create/update.
- Backend logic treats canceled PaymentIntents as unsafe to modify and can replace them even when Stripe reports cancellation before local webhook state catches up.
- Backend invoice creation attaches Stripe PaymentIntent webhook data and validates purchase amount consistency.
- Backend tests cover canceled-intent replacement once, Stripe-reported canceled-intent replacement, and OAuth refresh lock retry-safe payment delay behavior.
- Frontend calls the basket PaymentIntent upsert route and carries Stripe redirect payment intent parameters.
- Playwright normal PaymentIntent checkout waits for basket status plus invoice id and verifies confirmation transaction id, but inspected coverage did not prove webhook/cancel/OAuth recovery final state.
- Qase 4893, 4905, and 4910 cover the manual failure/cancel/retry classes.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/basket/data/repositories/UserBasedTicketBasketRepository/UserBasedTicketBasketRepository.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/sdk/features/payment-redirect.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage gap:**  
- Playwright: `No coverage found in inspected files` for webhook failure, canceled PaymentIntent recovery, OAuth refresh lock, or one-click wallet cancel final no-paid-order proof.
- Qase/manual: manual coverage exists in Qase 4893, 4905, and 4910, so this should stay below stronger uncovered P0 charging/reconciliation gaps.

**Recommended automation:**  
- One representative Stripe PaymentIntent recovery scenario only if Playwright can safely simulate cancellation, webhook failure, or OAuth delay without provider secrets or destructive setup.
- Assert no paid invoice/order/tickets from the failed attempt, then retry and assert exactly one paid invoice/order/ticket set.

**Verification needed:**  
- Confirm whether a safe non-secret provider simulator or test hook exists. If not, keep this backend-unit plus manual-Qase-backed.

### P1 - One-Click Wallet Checkout Is Source-Backed But Needs Provider/Browser Automation Strategy

**Candidate ID:** AUTO-CHK-012  
**Score:** 87/100  
**Money movement area:** express checkout / wallet payment / retry-safe failure  
**Confidence:** Medium  

**Risk:**  
- Wallet cancel, blocked address, or provider failure must not create a paid order or usable tickets.
- A successful retry must create exactly one final paid order and preserve wallet/provider metadata.

**Evidence:**  
- Backend finalization marks Stripe wallet or Yuno webhook purchases as already provider-paid and skips local card charging.
- Invoice stores wallet PaymentIntent id and wallet type for provider/transaction reconciliation.
- Frontend exposes one-click checkout through feature flags, Express Checkout, WalletElement, Stripe wallet dispatch, and Yuno wallet purchase callbacks.
- Playwright inspected files only showed wallet exposure analytics and post-purchase add-to-wallet helpers, not express wallet checkout purchase final-state coverage.
- Qase 4905 covers wallet cancel, blocked address, payment failure, no completed order, recoverable basket, and retry success. Qase 652 covers successful Stripe PaymentIntent wallet checkout.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/constants/waffle-flags.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/payment/components/PaymentSection/components/ExpressCheckoutSection.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/PaymentManager.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/gateways/StripePaymentGateway/StripePaymentGateway.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/components/yuno/YunoWalletElement/YunoWalletElement.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage gap:**  
- Playwright: `No coverage found in inspected files` for one-click wallet purchase cancel/failure/retry final-state proof.
- Qase/manual: manual coverage exists in Qase 4905 and Qase 652, so this is parked below stronger uncovered P0 charging/reconciliation gaps.

**Recommended automation:**  
- Only automate after choosing a stable wallet-capable browser/device, provider sandbox, or mocked wallet/provider simulator.
- Representative proof: cancel/fail one express wallet attempt, assert no paid order/tickets, retry successfully, assert exactly one paid order and matching wallet metadata.

**Verification needed:**  
- Confirm whether Apple Pay, Google Pay, Stripe express checkout, or Yuno wallet can be driven deterministically in Playwright without provider secrets or real device/browser constraints.

### P0 - Assigned Seating Failure/Retry Seat Ownership Needs Final-State Proof

**Candidate ID:** AUTO-CHK-013  
**Score:** 90/100  
**Money movement area:** payment failure / retry / assigned-seat ownership  
**Confidence:** Medium  

**Risk:**  
- A failed payment must not mark a selected seat sold, issue a usable ticket, or create a paid order.
- A retry must create exactly one paid order and attach the expected seat to the correct buyer.

**Evidence:**  
- Backend docs define assigned seating as event-time usage records and note basket-hold/dynamic-hold state can create temporary usage before purchase.
- `EventSeatUsage` carries basket and `basket_hold_child` traceability.
- `TTSeatPermission` distinguishes directly claimed seats from child-basket hold claims and marks purchased seat permissions sold under lock.
- Frontend public seating checkout exposes web/widget purchase platform handling and payment types including Affirm.
- Existing Playwright assigned-seating event and membership specs prove successful card purchase paths, but inspected coverage does not prove failed payment or retry final seat ownership.
- Generic failed-Affirm checkout coverage exists, but it is not tied to assigned-seat selection.
- Local Qase scan found adjacent assigned-seating success/hold cases, but no exact assigned-seat payment failure/retry ownership case in the inspected export.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/assigned_seating_and_permissions.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_usage.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_permissions.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/[eventSlug]/seating/index.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/assigned-seating/AssignedSeatingStep.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage gap:**  
- Playwright: `No coverage found in inspected files` for assigned-seat payment failure/retry final-state proof.
- Qase/manual: related cases 217, 1190, and 1255 cover assigned-seating purchase and held checkout integrity, but not the exact failure/retry ownership invariant.

**Recommended automation:**  
- One representative public assigned-seating event: select one seat, fail payment through the existing Affirm failure helper, assert no paid order/ticket/seat sale, retry once, and assert one final paid order owns the expected seat.

**Fixture refinement:**  
- Capture selected seat identifiers from the assigned-seating basket response before payment.
- Prove the failed attempt has no paid order/ticket item and does not sell or attach the selected seat to a paid ticket.
- Prove the retry creates one paid transaction/order whose ticket item or order contains the same selected seat identifiers.
- Prefer API seat identity proof, then My Orders/confirmation and Dashboard transaction identity for reviewer-readable evidence.

**Verification needed:**  
- Confirm whether later implementation can read selected `TTSeatPermission` / `EventSeatUsage` by basket, invoice, or transaction id without destructive setup.
- Exact no-paid-order/ticket query path still needs implementation-time selection; do not infer it from UI absence alone.

##### 2026-07-07 Worker Result - PROOF-CHK-006 Assigned-Seat Failure/Retry Final-State Refinement

**Result:** `AUTO-CHK-013` remains rank 5 and planning-ready. The first implementation should use WebPublic best-available assigned seating because `clickBestAvailableCheckout` already returns a basket response that `captureSeatIdentifiers()` can read.

**Refined proof contract:**
- Preserve selected `identifier`, `location_identifier`, and `segment_identifier` before payment.
- Make the failed-Affirm branch return scoped failure context instead of `void`.
- Prove no paid invoice/order/ticket item owns that seat after the failed attempt.
- Retry once and prove exactly one paid order/ticket item contains the same seat identifiers.
- Do not start with manual seat selection unless manual `clickCheckout` exposes the same basket response.
- Use API ticket item seat data plus My Orders/Dashboard transaction identity; do not rely only on seating canvas visual state.

**Evidence refs:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:706`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:734`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/assigned-seating/SeatingPage.ts:130`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/assigned-seating/SeatingPage.ts:141`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/api-helpers.ts:221`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1220`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1219`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1296`.

### P1 - Waitlist Async Fulfillment Final Paid Outcome Is Not Proven In Playwright

**Candidate ID:** AUTO-CHK-014  
**Score:** 85/100  
**Money movement area:** async waitlist fulfillment / off-session payment / revenue stats  
**Confidence:** Medium  

**Risk:**  
- A waitlist buyer can join through checkout, then the eventual paid outcome happens later through inventory or resale fulfillment.
- The final fulfilled state must create one paid invoice/order, issue the expected ticket quantity, complete the subscriber, and report revenue once.

**Evidence:**  
- Backend docs state waitlist join happens through basket/purchase flow and fulfillment/hold expiry are first-class behavior.
- Backend validation requires payment information for paid CC-required waitlist joins.
- Waitlist subscriber purchase locks basket/subscriber, validates the basket, creates an off-session Stripe PaymentIntent, or puts the basket on hold.
- Backend full-flow tests cover waitlisted basket creation, setup intent, waitlisted state, scheduled fulfillment, payment webhook, paid basket, completed subscriber, ticket issuance, and revenue stats.
- Existing Playwright waitlist tests cover public/widget entry paths and Pending entry verification, but inspected coverage does not prove later fulfilled paid outcome.
- Local Qase export has substantial related manual coverage, so this stays below the higher P0 charging/reconciliation gaps.

**Inspected files:**  
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/waitlist_fulfillment_and_holds.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/waitlist/subscriber_processing/utils/subscriber_purchase.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/waitlist`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/waitlists/WaitlistsPage.ts`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage gap:**  
- Playwright: `No coverage found in inspected files` for fulfilled waitlist final paid order, issued ticket set, completed subscriber, or revenue-stat reconciliation.
- Qase/manual: Qase 2880, 2881, 2882, 2952, 2983, 4235, and 4804 are related and cover join, notification/hold-link purchase, failed auto-payment, resale auto-processing, purchase waitlisted item, and gateway-change edge cases.

**Recommended automation:**  
- One representative CC-required system-gateway waitlist: join waitlist, verify Pending with no paid tickets, trigger safe inventory fulfillment/payment webhook, then assert one paid invoice/order, issued ticket count, completed subscriber, and waitlist revenue stats.

**Verification needed:**  
- Future handoff note: a separate implementation task may need a safe fixture or test hook to advance a waitlisted basket from Pending to fulfilled without destructive setup or provider secrets. This is not a blocked step for the planning worker.

#### Recommended Manual / Qase Cases

- Failed payment creates no paid order, no usable ticket, and no permanent inventory loss.
- Duplicate submit, back, refresh, or retry results in a single charge/order/ticket set.
- Dashboard transaction detail amount equals checkout and receipt for discounts, fees, and taxes.
- Gift-card purchase creates the correct stored value and receipt/transaction reconciliation.

#### No Gap - Donation Checkout Core Purchase Is Already Covered

**Result:** NO-GAP-CHK-001  
**Confidence:** High  
**Ranking impact:** No change. Current best automation remains `AUTO-CHK-002`.

**Evidence:**
- Backend validates donation item groups, requires `charity_id`, and sets donation price from `donation_amount`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:1937`.
- Backend invoice items persist `donation_amount`, `charity_id`, and native donation status: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:3830`.
- Backend invoice totals roll up `donation_amount`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:3972`.
- Backend financial breakdown includes donation amount in final amount math: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_cost_breakdown.py:369`.
- Backend donation payout service keeps donation settlement separate from ordinary settlements: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/payout_service/services/donation/donation_payout_service.py:8`.
- Frontend public checkout renders donation add-ons when a charity is configured: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/add-ons/DonationAddons/DonationAddons.web.tsx:7`.
- Frontend Dashboard transaction detail renders `Charity donation`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:145`.
- Frontend refund UI marks donations non-refundable: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/RefundDialog/InvoiceItemRow.web.tsx:117`.
- Playwright donation suite uses shared checkout matrix and Qase 3297: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/donations/purchase-donations.test.ts:5` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/donations/purchase-donations.config.ts:62`.
- Shared checkout matrix covers WebPublic desktop/mobile, Widget desktop/mobile, and WebBoxOffice desktop by default: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/shared/create-checkout-test-suite.ts:56`.

**Inspected files:**
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_cost_breakdown.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/payout_service/services/donation/donation_payout_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/add-ons/DonationAddons/DonationAddons.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/RefundDialog/InvoiceItemRow.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/donations`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/shared/create-checkout-test-suite.ts`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage note:**  
Core donation checkout is not an empty automation area. Existing Playwright coverage proves adding the donation through the shared checkout suite, and Qase/manual coverage includes donation-only purchase, confirmation/receipt, refund retention, report generation, and unsupported states.

**Lower-priority refinement:**  
If reviewers want deeper automated proof later, refine existing donation coverage to explicitly assert Dashboard/API `donation_amount`, the `Charity donation` transaction breakdown row, refund retention, and donation report/payout appearance. This is a future handoff note, not a new top-ranked candidate.

#### No Gap - Refund Protection Core Checkout Is Already Covered

**Result:** NO-GAP-CHK-002  
**Confidence:** High  
**Ranking impact:** No change. Current best automation remains `AUTO-CHK-002`.

**Evidence:**
- Playwright WebPublic matrix covers desktop/mobile and authenticated/guest states: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection.test.ts:40`.
- Playwright Widget matrix covers desktop/mobile: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection.test.ts:53`.
- Playwright test data maps Qase 3899 opt-in, Qase 3900 opt-out, and Qase 3944 high-value suppression: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection-config.ts:16`.
- Checkout flow passes refund-protection opt-in/hidden state into payment: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection.test.ts:146`.
- Order confirmation verifies protection UI or hidden state after purchase: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection.test.ts:181`.
- Shared checkout helper clicks opt-in/opt-out and waits for basket update: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Purchase.ts:261`.
- My Orders verifies protected purchase UI and hidden state: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:389`.
- Backend user invoice ticket item serializer exposes policy and claim status: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:145`.
- Backend user invoice serializer exposes basket protection fees and order id: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:446`.
- Backend venue invoice serializer exposes `has_protection` and `protection_charges`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:538` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:611`.
- Frontend confirmation detects protection invoice items and passes protection into order status: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/hooks/useCheckoutConfirmation.tsx:199` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/confirmation/Confirmation/Confirmation.web.tsx:227`.
- Frontend Dashboard transaction model maps `protection_charges` and `has_protection`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:54`.
- Dashboard fee-breakdown rules subtract protection charges from net sales/revenue/refund base: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/fee-breakdown-rules.ts:99`.

**Inspected files:**
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Purchase.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions`
- `/private/tmp/qase-checkout-money-cases-all.json`

**Coverage note:**  
Core refund-protection checkout is not an empty automation area. Existing Playwright coverage proves opt-in, opt-out, high-value suppression, confirmation, and order-detail protection UI. Local Qase/manual coverage includes purchase, quote updates, excluded baskets, transfer/exchange/resell/refund flows, webhooks, claims, analytics, and Dashboard behavior.

**Lower-priority refinement:**  
If reviewers want deeper automated proof later, refine an existing refund-protection path to explicitly assert Dashboard/API `protection_charges`, `has_protection`, and the Dashboard financial breakdown. This is a future handoff note, not a new top-ranked candidate.

#### No Gap - Core Discount Checkout Has Existing Automation And Manual Coverage

**Result:** NO-GAP-CHK-003  
**Confidence:** High  
**Ranking impact:** No ranking change. Current best automation remains `AUTO-CHK-002`.

**Coverage note:**  
Core discount checkout is not an empty automation area. Existing coverage spans single discount codes, auto-discounts, 100 percent discounts, review totals, Box Office transaction verification, backend allocation math, Dashboard discount rows, and broad Qase/manual scenarios.

**Evidence:**
- Backend discount equivalency test covers basket-level discount allocation and resulting service fees: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_ticket_basket_financials_service_discount_equivalency.py:21`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_ticket_basket_financials_service_discount_equivalency.py:75`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_ticket_basket_financials_service_discount_equivalency.py:82`.
- Itemized calculator handles discount normalization and apply-once proportional allocation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/itemized_calculator.py:55` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/itemized_calculator.py:82`.
- Dashboard maps and renders discount rows: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:44`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx:133`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx:256`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/invoice-variants/invoice-variant-config.ts:259`.
- Playwright single-discount checkout applies the code, completes checkout, verifies order confirmation, and verifies Box Office transaction total: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:191`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:238`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:430`.
- Playwright auto-discount checkout verifies discounted totals and Box Office transaction proof: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/auto-discount.test.ts:272`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/auto-discount.test.ts:284`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/auto-discount.test.ts:389`.
- Shared Playwright review helpers verify discounted item values and discount summary rows: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Review.ts:119` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Review.ts:373`.
- Box Office payment helper verifies transaction totals and discount line presence: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:163` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:182`.

**Qase/manual:**  
Related local Qase export includes 3306 single valid discount, 3308 auto-discount, 3309 100 percent discount, 3310 remove discount, 4769/4770 basket allocation, 4776/4777/4778 usage limits, 4779/4789 stacked discounts, 4858 partial discount split, 4859 in-person partial discount, and 4863 discounts plus assigned seating.

**Lower-priority refinement:**  
If reviewers want deeper proof later, refine an existing discount path to assert Dashboard/API `Discounts` row and invoice discount allocation explicitly. This is a future assertion refinement, not a new top-ranked candidate.

#### No Gap - Delivery-Method Shipping And Will Call Checkout Has Existing Automation And Manual Coverage

**Result:** NO-GAP-CHK-004  
**Confidence:** High  
**Ranking impact:** No ranking change. Current best automation remains `AUTO-CHK-002`.

**Coverage note:**  
Delivery-method checkout is not an empty automation area. Existing coverage spans backend delivery selection and shipping-address validation, invoice shipping cost and fulfillment status, frontend delivery selection and shipping restrictions, Playwright WebPublic/Widget/WebBoxOffice delivery-method checkout, My Orders barcode behavior, and broad Qase/manual shipping/fulfillment cases.

**Evidence:**
- Backend rejects purchase when delivery method is required but not selected, and leaves no invoice: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_basket_shipping.py:675`.
- Backend rejects delivery purchase without shipping address: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_basket_shipping.py:820`.
- Backend shipping basket purchase asserts invoice `shipping_cost`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_basket_shipping.py:875`.
- Backend invoice item records `shipping_type`, `shipping_cost`, and fulfillment status, then rolls invoice `shipping_cost` up from invoice items: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:3817` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:3971`.
- Frontend public checkout handles mixed delivery methods, shipping quantity restrictions, shipping-country warnings, and delivery selection: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/review/Review.web.tsx:131`.
- Frontend Dashboard financial breakdown renders Shipping and Settlement amount rows: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/FinancialBreakdown.test.tsx:68`.
- Playwright delivery-method suite generates email, standard delivery, and Will Call tests across supported platforms/views: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/delivery-methods/delivery-methods.test.ts:521` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/delivery-methods/delivery-methods.test.ts:623`.
- Playwright checkout review selects shipping methods and verifies Shipping & Handling Fees: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Review.ts:308` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Review.ts:380`.
- Playwright My Orders checks barcode availability for standard delivery and Will Call states: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:327`.

**Qase/manual:**  
Related local export cases include 3088, 3089, 3090, 3279, 3745, 3884, 4933, 2303, 3373, 891, 892, and 893 for delivery options, shipping restrictions, shipping quantity thresholds, barcode visibility, address updates, and fulfillment reporting.

**Lower-priority refinement:**  
If reviewers want deeper proof later, refine an existing delivery-method path with explicit Dashboard/API `shipping_cost`, `shipping_fulfillment_status`, shipping report, or fulfillment-state reconciliation. This is a future assertion refinement, not a new top-ranked candidate.

#### P1 - Credit-Applied Checkout Lacks Playwright Partial-Payment And Dashboard/API Reconciliation Proof

**Result:** AUTO-CHK-017  
**Score:** 85/100  
**Confidence:** Medium  
**Ranking impact:** New lower P1 candidate. Current best automation remains `AUTO-CHK-002`.

**Entry path and realistic scenario mix:**  
Authenticated public checkout where the buyer has a known universal or organizer/account credit balance smaller than the basket total. Buyer applies the credit, pays the remaining balance by card, and confirmation, invoice, Dashboard/API, and remaining credit balance all agree.

**Evidence:**
- Backend user-credit test applies `credit_applied` and `USER_CREDIT`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:100`.
- Backend asserts invoice `final_amount`, `credit_applied`, earned/paid values, and no-credit comparison: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:128` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:138`.
- Backend exchange-credit tests cover credit application, remaining-balance behavior, and zero-total behavior: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:180` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:261`.
- Calculator validates and allocates credits to item groups: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:468`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:527`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:540`.
- Purchase service validates and charges invoice-applied credit: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:589`.
- Mixed fee-calculation baskets reject credits: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/mixed_fee_item_group_validation_service.py:64`.
- Public checkout summary reads and displays applied credit state: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutSummary/CheckoutSummary.web.tsx:402` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutSummary/CheckoutSummary.web.tsx:450`.
- Dashboard transaction detail maps and labels `credit_applied`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:77`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx:129`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx:254`.

**Existing Playwright coverage:**  
Playwright covers ticket-credit earn/spend and zero-cost credit checkout at `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/ticket-credits/ticket-credits.test.ts:99` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/ticket-credits/ticket-credits.test.ts:222`. It also has user-credit and exchange-credit UI helpers at `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:327` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/ExchangeCredit.ts:32`.

`No coverage found in inspected files` for partial credit plus remaining card charge plus Dashboard/API `Credit applied` reconciliation. Inspected `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows`.

**Qase/manual:**  
Related cases exist in local read-only export: Qase 3336 universal credits, 3337 organizer credits, 3338 ticket credits, 3890 checkout final amount with varying credits, 2532 membership credits, and 4941 automated ticket-credit flex-pack case.

**Recommended Playwright test:**  
One representative partial-credit checkout, preferably universal or organizer credit: apply known credit smaller than basket total, pay remaining balance by card, assert exactly one paid invoice/order, assert `credit_applied`, remaining charged amount, Dashboard/API `Credit applied`, and post-purchase credit balance.

**Verification needed:**  
Choose the first fixture path: universal credit is broadest; organizer credit is closer to venue-scoped money movement. Do not automate every credit family in the first pass.

#### P1 - Payment-Plan Checkout Lacks Playwright Installment And Dashboard/API Reconciliation Proof

**Result:** AUTO-CHK-016  
**Score:** 84/100  
**Confidence:** Medium  
**Ranking impact:** New lower P1 candidate. Current best automation remains `AUTO-CHK-002`.

**Entry path and realistic scenario mix:**  
Public event checkout with a payment-plan ticket type. Buyer selects one payment-plan ticket, pays the initial installment by card, sees one initial paid invoice, and later ticket redeemability depends on final installment completion. Dashboard/API values must agree on `has_payment_plan`, `payment_plan_total_fees`, payment-plan fee rows, and pending ticket state.

**Evidence:**
- Checkout includes the first payment-plan charge while later recurring charges are counted separately: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:562`.
- Payment-plan groups derive installment count and add payment-plan fees into basket data: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:573` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:587`.
- Backend validation requires one payment plan per basket and rejects discounts with payment-plan items: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:2096` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:4394`.
- Payment-plan ticket items are payment-pending and not redeemable until final payment: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/ticket_generator_service.py:115`.
- Backend tests assert recurring total, initial invoice final amount, `payment_plan_total_fees`, recurring invoice creation, final release to redeemable tickets, one-plan-per-basket rejection, and discount rejection: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:619`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:639`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:644`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:654`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:704`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:786`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:1212`.
- Venue/user invoice serializers expose payment-plan state and installment metadata: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:607`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:657`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:257`.
- Frontend detects payment-plan ticket types and disables Affirm for that path: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/tickets/components/TicketTypesContainer/TicketTypesContainer.web.tsx:163` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/tickets/components/TicketTypesContainer/TicketTypesContainer.web.tsx:505`.
- Dashboard maps and renders payment-plan fee rows: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:88`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/fee-breakdown-rules.ts:69`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:81`.

**Existing Playwright coverage:**  
`No coverage found in inspected files` for payment-plan checkout, initial installment invoice reconciliation, recurring invoice/final release proof, or Dashboard payment-plan fee assertion. Inspected `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows`, and broader payment-plan terms; hits were generated constants and architecture notes only.

**Qase/manual:**  
Related Qase cases found in the local export: Qase 4759 blocks refunds for payment-plan invoices, and Qase 4818 covers financial-breakdown rows by invoice variant. No exact payment-plan checkout E2E proof was found for initial charge, Dashboard/API reconciliation, and pending/final ticket state.

**Recommended Playwright test:**  
One representative public payment-plan checkout: create or use a payment-plan ticket with known installment count and fees, complete initial card checkout, assert exactly one initial paid invoice, assert `final_amount`, `has_payment_plan`, and `payment_plan_total_fees`, assert Dashboard `Payment plan fees` and net service fees, and assert ticket items are pending/not redeemable before final installment. Add final-release proof only if a safe non-destructive recurring-payment trigger exists.

**Verification needed:**  
Confirm whether the first implementation should include only initial installment plus pending-ticket proof or also use a safe backend/API trigger for final installment release.

#### P1 - Configured Rate-Card Fee And Tax-On-Fee Checkout Lacks Playwright Row-Level Reconciliation Proof

**Result:** AUTO-CHK-018  
**Score:** 84/100  
**Confidence:** Medium  
**Ranking impact:** New lower P1 candidate. Current best automation remains `AUTO-CHK-002`.

**Entry path and realistic scenario mix:**  
Public event checkout with a configured-fee venue or event. Buyer purchases a paid ticket with internal Showpass fee, organizer/custom fee, and tax-on-fee by card. Checkout total, invoice/API fields, Dashboard configured fee rows, tax-on-fee rows, and settlement amount must agree.

**Evidence:**
- Fee service returns matched internal fee, custom fee, and tax totals for customer-paid fees: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/fees_json_service.py:120`.
- Custom fee parsing extracts `taxes_applied_to_fee`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/fees_json_service.py:295`.
- Backend custom-fee API test calculates service fees, taxes, internal fees, custom fees, and `Fee Tax - Service Fees`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_custom_fees.py:293` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_custom_fees.py:336`.
- Itemization splits `taxes_applied_to_fee` proportionally when invoice items are split: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/itemization_services.py:121`.
- Purchase service asserts basket service fees match invoice service charges before charging: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:379`.
- Dashboard maps configured fee fields and renders configured fee/tax rows: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:85`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/fee-breakdown-rules.ts:120`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:47`.

**Existing Playwright coverage:**  
Playwright verifies generic checkout `Service Fees` and Box Office `expectedFeeAndTaxes` totals at `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Review.ts:365` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:187`.

`No coverage found in inspected files` for explicit configured rate-card, organizer fee, or tax-on-fee checkout proof. Inspected `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows`, and repo-wide rate-card/fee/tax-on-fee terms; hits were generic service-fee assertions and generated enum constants.

**Qase/manual:**  
Related local export cases include Qase 3142 internal Stripe processing rate card passed to customer, 3156 internal Showpass rate card checkout, 3168 organizer fees passed to customer, 3169 custom taxes on organizer fees, 3493 internal tax-on-fee, and 3876/3883/3889 fee-breakdown final amount scenarios.

**Recommended Playwright test:**  
One representative configured-fee checkout: use a configured-fee ticket with known internal fee, organizer/custom fee, and tax-on-fee; complete card payment; assert checkout total, one paid invoice/order, Dashboard configured fee rows, Dashboard Settlement amount, and venue invoice/API final amount, service charges, organizer/custom fee, and tax-on-fee totals.

**Verification needed:**  
Choose the first fixture path from existing configured-fee/rate-card data. Do not automate every rate-card permutation in the first pass.

#### P1 - Refund-Protection Upsell Checkout Lacks Playwright Source/Upsell Invoice Proof

**Result:** AUTO-CHK-015  
**Score:** 83/100  
**Confidence:** Medium  
**Ranking impact:** New lower P1 candidate. Current best automation remains `AUTO-CHK-002`.

**Entry path and realistic scenario mix:**  
Post-purchase refund-protection upsell from order detail or email link. Original ticket order was paid without protection; buyer opens tokenized upsell URL, creates a protection-only basket, pays by card, and expects exactly one upsell invoice linked to the original transaction without duplicate tickets or wallet artifacts.

**Evidence:**
- Public refund-protection API exposes tokenized upsell details and create-basket endpoints: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/api/public/viewsets.py:655` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/api/public/viewsets.py:675`.
- `RefundProtectionUpsellRecord` links source basket, upsell basket, source invoice, upsell invoice, token, and purchase source: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/models/basket_protection.py:343`.
- Purchase serializer accepts and validates `refund_protection_upsell_purchase_source`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1016` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1043`.
- Purchased upsell baskets trigger `mark_upsell_sold`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/signal_handlers.py:99`.
- `mark_upsell_sold` stores the upsell invoice and transitions the record to SOLD: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tasks/protection_tasks.py:417`.
- User invoice serializers expose `source_transaction_id`, `protection_upsell_invoice`, and `protection_upsell_cta`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:238`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:483`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:490`.
- Frontend route builds `/checkout/refund-protection/upsell/{token}/`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/constants/public-routes.ts:54`.
- Frontend upsell checkout loads details, creates/fetches basket, includes `refund_protection_upsell_purchase_source`, and calls payment manager purchase: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/hooks/useRefundProtectionUpsellCheckout.ts:53`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/ui/components/RefundProtectionUpsellCheckoutContent.web.tsx:241`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/ui/components/RefundProtectionUpsellCheckoutContent.web.tsx:269`.
- Confirmation treats `source_transaction_id` invoices as protection upsell purchases without ticket/wallet/SMS artifacts: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/hooks/useCheckoutConfirmation.tsx:206`.
- Backend tests cover create-basket, SOLD conversion, public create-basket response, and purchase-source persistence: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:736`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1047`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1551`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1720`.

**Existing Playwright coverage:**  
`No coverage found in inspected files` for refund-protection upsell token checkout, create-basket, purchase, `source_transaction_id`, or linked invoice proof. Inspected `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright` with upsell, protection upsell, route, purchase-source, and source-transaction search terms.

**Qase/manual:**  
No exact refund-protection upsell purchase case found in local read-only Qase export using upsell/source-transaction/protection-only search terms. Related refund-protection manual coverage exists, but not this tokenized post-purchase protection-only checkout path.

**Recommended Playwright test:**  
One representative tokenized upsell checkout: start from an eligible paid ticket order without protection, obtain the order-detail CTA token or equivalent source-backed token, complete the upsell protection-only checkout with card, assert one paid upsell invoice linked by `source_transaction_id`, assert the original order now exposes protection, and assert no duplicate ticket/wallet artifacts were created.

**Verification needed:**  
Confirm the first implementation should use the My Orders CTA token rather than a generated email token; both are source-backed entry paths.

#### Fixture Contract - Shared Checkout Final-State Proof

**Result:** PROOF-CHK-001  
**Confidence:** High  
**Ranking impact:** No change. Current best automation remains `AUTO-CHK-002`, but this contract should support later implementation for several P0 packets.

**Evidence:**
- Playwright `InvoiceData` already exposes `transaction_id`, `ticket_items`, and `invoice_items`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Purchase.ts:43`.
- Public checkout payment step captures financial invoice response and checks confirmation order ID equals `invoiceData.transaction_id`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:430`.
- My Orders helper verifies order items, item count/barcode expectations, user-specific order ID, and total: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`.
- Dashboard transaction page can filter by transaction ID and expects exactly one transaction action row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`.
- Box Office payment helper waits for `/financials/invoices/` and returns invoice data from the response: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:267`.
- Backend user invoice view supports transaction lookup/detail with ticket and invoice item prefetching: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/viewsets.py:138`.
- Backend user invoice V2 uses `transaction_id` as lookup field: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/viewsets.py:325`.
- Backend venue invoice view uses `transaction_id` lookup: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:179`.
- Backend venue invoice item API is read-only and filterable by invoice or `invoice__transaction_id`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:623` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:235`.

**Contract for later automation:**
- Paid outcome proof: carry `invoiceData.id`, `invoiceData.transaction_id`, buyer identity, expected total, expected item lines, and expected ticket quantity.
- Dashboard uniqueness proof: filter Dashboard transactions by `transaction_id`; paid branches should show exactly one row.
- Buyer proof: use My Orders/order detail for item names, quantities, ticket/barcode count, order ID, and total where the buyer-facing flow can access it.
- API reconciliation proof: use venue invoice or invoice-items APIs when Dashboard cannot prove itemized totals, package allocations, or issued ticket/item lines.
- Failed/no-paid proof: use a unique buyer/basket context and assert no paid invoice/order/ticket set exists for the failed attempt; do not rely only on absence of confirmation UI.

**Supported packets:**  
`AUTO-CHK-002`, `AUTO-CHK-001`, `AUTO-CHK-006`, `AUTO-CHK-007`, and `AUTO-CHK-013`.

#### P1 - Resale Checkout Buyer Charge And Seller-Side Completion Reconciliation

**Result:** AUTO-CHK-019  
**Score:** 86/100  
**Confidence:** Medium  
**Ranking impact:** New lower P1 candidate. Current best automation remains `AUTO-CHK-002`.

**Entry path and realistic scenario mix:**  
Original buyer purchases eligible event tickets, lists them for resale from My Orders, second buyer purchases a resale ticket through public checkout, and final state proves buyer paid order/tickets plus seller-side resale completion/refund/payout status and resale fee/total reconciliation.

**Evidence:**
- Backend resale purchase flow starts from original paid tickets, creates resale submission, links resale tickets to a new basket, completes payment, creates buyer ticket items, and completes resale submission: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1206`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1266`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1274`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1282`.
- Purchase finalization schedules resale refund/completion and invoice-item snapshot tasks: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:2723`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py:2881`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py:2910`.
- Resale completion marks original tickets resold, excludes them from active totals, updates inventory, and sets resale submission status: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/resale/refund_resale_submission.py:145`.
- Resale baskets can force the system payment gateway even when the venue has a non-system gateway: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1932`.
- Frontend My Orders lists tickets for resale through `api/user/tickets/resale`, calculates resale refund amount with `is_resale=true`, and submits selected ticket item IDs: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/repositories/UserBasedTicketResaleDetailRepository.ts:13`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/services/resales/useResellTicketsAction.ts:35`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/modals/resale/MyOrdersResellTicketsModalSelection.web.tsx:100`.
- Dashboard has resale fee and reseller transaction surfaces: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/internal-fees/application/config.ts:57` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/sidebar/TransactionsFilterSidebar.web.tsx:322`.

**Existing Playwright coverage:**  
`No coverage found in inspected files` for exact resale/resell/resold checkout purchase, buyer paid order, seller completion/refund state, or resale fee reconciliation. Inspected `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows` with resale/resell/resold terms.

**Qase/manual:**  
Broad related coverage exists: Qase 2878, 2974, 3515, 3521, 3537, 288, 918, 2975-2985, and 4257 cover resale purchase, assigned-seat/widget variants, reporting, payout fallback, resale management, and waitlist/resale processing.

**Recommended Playwright test:**  
One representative GA public resale checkout: original buyer paid order -> list selected ticket for resale -> second buyer public checkout card payment -> assert one paid buyer order/ticket set, seller resale submission completion/refund/payout state, invoice-item snapshot availability, Dashboard/API amount and resale fee reconciliation, and no duplicate buyer charge or seller completion after retry/refresh.

**Verification needed:**  
Decide during later implementation whether setup should drive the My Orders resale modal or use a direct source-backed resale API setup. Keep widget and assigned-seat resale as follow-ups unless they prove a different risk.

#### P1 - Checkout Upgrade Offer Replaces Item And Reconciles Upgraded Paid Outcome

**Result:** AUTO-CHK-020  
**Score:** 82/100  
**Confidence:** Medium  
**Ranking impact:** New lower P1 candidate. Current best automation remains `AUTO-CHK-002`.

**Entry path and realistic scenario mix:**  
WebPublic checkout review with a base ticket, one higher-priced upgrade target, low inventory, card payment, upgraded paid order proof, original item exclusion, Dashboard/API total agreement, and inventory/capacity reconciliation.

**Evidence:**
- Backend ticket types can define ticket and membership upgrade options through `UpgradePath`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:459` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:463`.
- Backend filters sold-out upgrade targets: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:488`.
- Backend persists and serializes upgraded basket item group state through `is_upgraded`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_items.py:382` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:351`.
- Backend tests cover sold-out upgrade filtering and `include_upgrade_options=true` response behavior: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/serializers/test_ticket_type_upgrade_serializers.py:243` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/serializers/test_ticket_type_upgrade_serializers.py:313`.
- Frontend requests upgrade options for public basket item data: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/basket/services/usePublicBasketItemData.ts:101`.
- Frontend computes upgrade price delta and metadata: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/domain/services/BasketUpgradesService.ts:217`.
- Checkout review renders an `UpgradeOffer` for eligible non-upgraded items and calls the upgrade handler: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/review/components/ReviewItemGroup/ReviewItemGroup.web.tsx:313` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/review/components/ReviewItemGroup/ReviewItemGroup.web.tsx:264`.
- Frontend `upgradeItemGroup` removes the original group, creates the target group with `is_upgraded=true`, and persists the replacement basket: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/services/useBasket.ts:1283`.

**Existing Playwright coverage:**  
`No coverage found in inspected files` for upgrade offer click, upgraded paid order, original item exclusion, total/inventory reconciliation, or issued upgraded ticket proof. Inspected `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright` with upgrade terms.

**Qase/manual:**  
Qase 3743 covers `Core - Checkout - Upgrade Your Tickets`; Qase 4298 covers upgrade messaging visibility and replacement behavior.

**Recommended Playwright test:**  
One representative WebPublic checkout review upgrade: add base ticket -> click upgrade offer -> assert basket contains only upgraded target with `is_upgraded=true` and updated total -> pay by card -> assert one paid invoice/order/ticket set for upgraded item, no original ticket issued, Dashboard/API total match, and upgraded target inventory/capacity consumed.

**Verification needed:**  
During later implementation, decide whether inventory proof should use a direct API count, Dashboard capacity surface, or existing fixture helper. Keep cart-summary, hold-link, tracking-link, membership-upgrade, and responsive variants out unless they prove a different money-movement risk.

#### No Gap - Core Exchange Checkout

**Result:** NO-GAP-CHK-005  
**Confidence:** High  
**Ranking impact:** No new candidate. Current best automation remains `AUTO-CHK-002`.

**Evidence:**
- Backend creates exchange credit from an invoice and marks the source invoice exchange-in-progress: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/viewsets.py:205`.
- Purchase finalization links exchange replacement invoices and applies regular or itemized exchange-credit side effects: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:492` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:722`.
- Exchange fee context follows the original payment type for full-credit Box Office exchanges: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:2928`.
- Backend tests cover higher-value partial exchange, consecutive exchange, and expired exchange-credit webhook purchase behavior: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_basket.py:6797`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_basket.py:6873`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_api.py:2063`.
- Frontend exposes My Orders exchange endpoints and Dashboard exchange-adjustment settlement rows: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/repositories/UserBasedInvoiceRepository.ts:32` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/ExchangeAdjustmentStyleBreakdown.web.tsx:48`.
- Playwright exchange suites start from a real purchase, initiate public/My Orders or Box Office exchange, apply exchange credit, and verify replacement totals across public, Box Office, card, cash, mobile, desktop, same-ticket, different-ticket, and full-exchange paths: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.helpers.ts:168`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.helpers.ts:217`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.helpers.ts:295`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.test.config.ts:65`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange-box-office-cash.test.config.ts:44`.

**Existing Playwright coverage:**  
Core exchange checkout coverage exists in `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges`.

**Qase/manual:**  
Broad related coverage exists: Qase 1275, 1276, 1281, 2479, 2482, 2634, 2886, 2939, 2943, 2968, 2969, 2971, 3948, 3949, 3950, 3951, 4017, 4018, 4019, 4023, 4040, 4052, 4059, 4061, 4089, 4823, 4825, 4827, 4828, 4868, and 4914.

**Optional future refinement:**  
Add explicit Dashboard/API exchange-adjustment `Settlement amount` and invoice-item reconciliation only if reviewers want stronger reporting proof. Do not create a new broad exchange checkout candidate.

#### No Gap - Core Pay What You Can Checkout

**Result:** NO-GAP-CHK-006  
**Confidence:** High  
**Ranking impact:** No new candidate. Current best automation remains `AUTO-CHK-002`.

**Evidence:**
- Backend basket tests prove PWYC prices apply to PWYC ticket types, free PWYC is accepted only when configured, and below-minimum values are rejected: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_pay_what_you_can.py:83`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_pay_what_you_can.py:160`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_pay_what_you_can.py:200`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_pay_what_you_can.py:231`.
- Backend invoice/reporting fields expose PWYC state and surplus/deficit reporting: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_items.py:326`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/csvs.py:378`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/csvs.py:698`.
- Frontend renders the PWYC selector, stores buyer-selected price, sends `pay_what_you_can_price` into basket modification, and carries the value through basket helpers: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/events/components/tickets/pay-what-you-can/PWYCTicketType/PWYCTicketType.web.tsx:40`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/tickets/components/TicketTypesContainer/TicketTypesContainer.web.tsx:288`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/utils/helpers.ts:181`.
- Playwright has dedicated PWYC coverage across WebPublic, Widget, and Box Office for standard, free, and custom amounts: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc/pwyc-single-events.test.ts:51`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc/pwyc-single-events.test.ts:132`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc/pwyc-single-events.test.ts:195`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc/pwyc-config.ts:10`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/staticData/pwyc.ts:7`.
- Assigned-seating PWYC coverage also exists: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/events/assigned-seating-config.ts:84`.

**Existing Playwright coverage:**  
Core PWYC checkout coverage exists in `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc` and assigned-seating PWYC coverage exists under `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/events`.

**Qase/manual:**  
Broad related coverage exists: Qase 379, 759, 760, 959, 2626, 2866, 3171, 3198, 3199, 3200, and 3201.

**Optional future refinement:**  
Add explicit Dashboard/API report-level proof for `Pay What You Can Enabled` and `Pay What You Can Surplus/Deficit` only if reviewers want stronger reporting confidence. Do not create a new broad PWYC checkout candidate.

## Existing Playwright Cases

Fill this during exploration after a read-only inspection of [[01 Repositories/QA Automation - showpass-playwright]].

| Spec File | Test / Scenario | Coverage Area | Money Movement Assertion | Fixture / Factory Used | Gap or Follow-up |
| --- | --- | --- | --- | --- | --- |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages/package-purchase-flows.ts` | `purchasePackageWebPublic`, `purchasePackageWidget`, `purchasePackageBoxOffice` | Package checkout purchase paths | Confirms package checkout/confirmation and Box Office totals/transaction flow | Package test data matrices | Does not prove package child revenue-realization `*_stat` allocation or reporting reconciliation. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright` | Exact Square Terminal search | Square Terminal checkout | No exact Playwright purchase coverage found in inspected files; only generated enum constants matched | N/A | AUTO-CHK-009 parked until hardware/provider simulator strategy exists. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts` | PaymentIntent success polling | Stripe PaymentIntent checkout | Waits for basket status `2` with `invoice_id` and verifies confirmation transaction id | Existing checkout journey helpers | Does not prove canceled/webhook failure/OAuth delay creates no paid outcome before retry. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/buttons/ItemQuantitySelect.ts` | Wallet exposure analytics | One-click / wallet exposure | Records wallet exposure analytics | Item quantity/select flow | Does not prove express wallet checkout purchase, cancel/failure, no-paid outcome, or retry success. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating` | Assigned-seating event and membership purchases | Assigned seat selection plus successful card checkout | Confirms successful purchase/confirmation and cleanup | Assigned seating event and membership static data | Does not prove failed payment or retry preserves/reassigns seat ownership correctly. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/waitlist` | Waitlist single event and assigned-seating waitlist | Joins waitlist and verifies Pending entry | Waitlist static data and `WaitlistsPage` | Does not prove later async fulfillment creates one paid order, issued tickets, completed subscriber, or revenue stats. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/donations/purchase-donations.test.ts` | `Core - Purchase Donation` / Qase 3297 | Donation checkout | Adds configured donation through shared checkout suite across public/widget/Box Office matrix | Donation event static data with `donationAmount: "5.00"` | No core gap; optional future refinement is explicit Dashboard/API donation amount, refund retention, and reporting/payout proof. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges` | Itemized/full exchange suites | Public My Orders exchange and Box Office exchange | Starts from real purchase, applies exchange credit, verifies replacement totals across same/different/full, card/cash, desktop/mobile paths | Single-item exchange static data and exchange runner | No core gap; optional future refinement is Dashboard/API exchange-adjustment Settlement amount and invoice-item reconciliation. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright` | Exact upgrade offer search | Checkout Upgrade Your Tickets | No exact Playwright coverage found for upgrade offer click, upgraded paid order, original item exclusion, total/inventory reconciliation, or issued upgraded ticket proof | N/A | AUTO-CHK-020 added as lower P1/manual-backed candidate. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc/pwyc-single-events.test.ts` | Core - Single Event Checkout with PWYC Ticket Type / Qase 3198 | Pay What You Can checkout | Covers standard, free, and custom PWYC amounts across WebPublic, Widget, and WebBoxOffice; public/widget flows verify confirmation totals and Box Office verifies totals plus transaction detail | PWYC static data in `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/staticData/pwyc.ts` | No core gap; optional future refinement is report-level PWYC surplus/deficit proof. |
| `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/events/location-seating.test.ts` | PWYC assigned-seating purchase / Qase 2866 | Assigned seating plus Pay What You Can | Covers assigned-seating PWYC purchase configs including free and custom amount variants | Assigned-seating PWYC config in `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/events/assigned-seating-config.ts` | No core gap for broad PWYC checkout. |

## Secondary Manual / Qase Context

Read-only Qase bulk scan on 2026-07-07:
- Bulk scan: `/private/tmp/qase-checkout-money-cases-all.json`
- Details reviewed: `/private/tmp/qase-checkout-money-case-details.json`
- Cases scanned: 1566

| Case / Note | Coverage Area | Money Movement Assertion | Gap or Follow-up |
| --- | --- | --- | --- |
| Qase 3287, 4066, 4905 | Generic purchase and wallet recovery | Purchase success and final successful wallet retry | No exact duplicate submit/replay one-paid-outcome case found. |
| Qase 660, 661, 4905 | Failed payment / recovery | Declined payment case mentions no paid order; recovery case says only successful final attempt creates order | Automation still needs source-backed no-paid invoice/ticket/inventory proof. |
| Qase 935 | Dashboard transaction module-price fees | Checks fee fields and totals for module-price-backed invoice items | Does not cover reusable Dashboard `Settlement amount` assertion gap. |
| Qase 431, 863, 2868 | Membership holds, batch emails, branded hold purchase | Covers hold reservation/release, hold email links, and branded hold checkout | Does not cover membership event-batch hold-link purchase reconciliation. |
| Qase 4229, 3879 | Package itemized settings and package final amount accuracy | Qase 4229 checks parent/child itemized mismatch; Qase 3879 checks final amount accuracy for package types | Related coverage only; neither explicitly proves child revenue-realization stat allocation or reporting/payout reconciliation. |
| Qase 2574, 2653, 4097, 4914 | Square Terminal checkout and related source-platform/settlement paths | Qase 2574 covers terminal amount, cancel/retry, and success; related cases cover source platform, payment switching, and Square settlement/exchange checks | Manual coverage exists; Playwright automation is parked until terminal hardware/provider simulator strategy is confirmed. |
| Qase 2946, 2558, 4056, 4907, 4966 | Guest checkout claim/connect and owner-scoped access | Qase 2946 covers same-email connect and different-email rejection; related cases cover guest order view, signed-in owner scoping, and claim-context preservation | Manual coverage exists; exact Playwright paid-order claim/connect ownership flow was not found in inspected files. |
| Qase 3743, 4298 | Checkout upgrade offer and upgrade messaging | Manual cases cover Upgrade Your Tickets replacement behavior, low-inventory/sold-out considerations, and upgrade messaging visibility | Add one representative Playwright paid-outcome proof only; do not create a variant suite unless a variant proves distinct money risk. |
| Qase 4893, 4905, 4910 | Stripe PaymentIntent webhook/cancel, wallet cancel, and OAuth refresh delay recovery | Manual cases assert no paid order/charge from failed or canceled attempts and successful retry creates only the final paid record | Manual coverage exists; Playwright final-state automation depends on safe provider simulation or test hook. |
| Qase 4905, 652 | One-click wallet cancel/failure and Stripe wallet success | Qase 4905 covers cancel, blocked address, failed payment, no completed order, recoverable basket, and retry success; Qase 652 covers Apple Pay / Google Pay success | Manual coverage exists; Playwright automation needs wallet-capable browser/provider strategy. |
| Qase 217, 1190, 1255 | Assigned-seating purchase and held checkout integrity | Success and held-basket payment integrity are covered adjacent to the risk | No exact assigned-seat payment failure/retry ownership case found in the inspected local export. |
| Qase 2880, 2881, 2882, 2952, 2983, 4235, 4804 | Waitlist join, auto-processing, failed payment, hold-link purchase, gateway-change edge | Substantial manual coverage exists for waitlist lifecycle and edge cases | Playwright inspected coverage stops at Pending entry and does not prove final fulfilled paid outcome/revenue. |
| Qase 719, 919, 3297, 3298, 3299, 3301, 4936 | Donation checkout, donation-only, confirmation/receipt, refund retention, reporting, unsupported states | Strong manual coverage plus Playwright Qase 3297 for adding configured donation to checkout | No ranking change; only optional assertion refinement remains for Dashboard/API donation amount and reporting/payout proof. |
| Qase 1275, 1276, 1281, 2479, 2482, 2634, 2886, 2939, 2943, 2968, 2969, 2971, 3948, 3949, 3950, 3951, 4017, 4018, 4019, 4023, 4040, 4052, 4059, 4061, 4089, 4823, 4825, 4827, 4828, 4868, 4914 | Core exchange checkout, itemized exchange, assigned seating, credits, fees, packages, refund protection, Box Office settlement | Broad manual coverage across price/quantity changes, credit integrity, fee calculation, inventory/seat release, package restrictions, and settlement | No new broad exchange automation candidate; optional future refinement is explicit Dashboard/API exchange-adjustment reconciliation. |
| Qase 379, 759, 760, 959, 2626, 2866, 3171, 3198, 3199, 3200, 3201 | Pay What You Can checkout, config, basket recalculation, input rules, assigned seating, refund, exchange, and internal fee application | Broad PWYC purchase and configuration coverage; Playwright also covers core PWYC checkout matrices | No new broad PWYC candidate; optional future refinement is Dashboard/API PWYC reporting surplus/deficit proof. |

## Fixture Gaps To Automate Checkout

Fill this during exploration when existing Playwright fixtures or factories do not support a high-priority checkout money-movement test.

| Fixture Need | Unlocks | Priority | Notes |
| --- | --- | --- | --- |
| Paid public checkout order | Confirmation, receipt, order detail, transaction detail assertions |  |  |
| Failed card/payment attempt | Failed payment state, retry, no paid order, no inventory loss |  |  |
| Checkout with fees and taxes | Total calculation, receipt, payout, reporting assertions |  |  |
| Checkout with partial discount | Discount allocation, itemized totals, final payment amount |  |  |
| Checkout with credit or gift card | Split payment, remaining balance, over-apply prevention |  |  |
| Limited inventory or sold-out event | Capacity, hold release, retry behavior |  |  |
| Assigned seating event | Seat ownership after payment success, failure, retry, or abandonment |  |  |
| Guest buyer and logged-in buyer | Ownership, claim/connect, account mismatch prevention |  |  |
| Shared final-state proof helper | Duplicate paid outcome, failed payment no-paid outcome, mixed basket reconciliation, checkout-link pruning, assigned-seat retry | P0 | PROOF-CHK-001: reuse invoiceData, Dashboard transaction filter, My Orders item/total proof, and venue invoice/invoice-items APIs. |

## Open Questions

- 

## Next Recommendations

- Start with P0 override paths from [[02 Feature QA/Checkout Money Movement Risk Scoring#P0 Overrides]].
- Prefer extending existing checkout/payment fixtures when they already cover setup reliably.
- Convert only source-backed findings into [[04 Automation/Checkout Money Movement Automation Backlog]] or [[03 Test Cases/Checkout Money Movement Test Drafts]].
