---
title: Checkout Automation Phase 2 Planning
tags:
  - checkout
  - qa
  - automation
  - planning
status: active
---

# Checkout Automation Phase 2 Planning

Planning-only continuation for [[02 Feature QA/Checkout Automation Mission Control]].

## Phase Goal

Turn the current ranked findings into reviewer-ready automation packets without changing source code or Qase.

Primary question:

> What should we automate next to reduce the most checkout money-movement risk?

Current answer:

> `AUTO-CHK-002` - Duplicate submit/retry creates one paid outcome.

Current reviewer gate: `DECISION-QUEUE-SYNC-CHK-003`. Review `DEC-CHK-046` through `DEC-CHK-050`, [[04 Automation/Checkout Playwright Automation Review Checkpoint]], [[04 Automation/Checkout Money Movement Automation Backlog]], and this note together. `HANDOFF-AUDIT-CHK-001` already confirmed the top-six handoff fields, `P0-SATURATION-CHK-001` confirmed the P0 reviewer set is structurally complete, and `PROMPT-SYNC-CHK-001` / `ARTIFACT-SYNC-CHK-001` confirm fresh sessions should not repeat completed P0 audits unless reviewer feedback or candidate content changes.

This phase does not implement tests. When a packet is ready for implementation, keep it ranked and continue with the next read-only planning target.

If the active `/goal` objective says to stop when source-code writes would be required, treat that as a planning boundary only. The correct action is to mark the packet `Planning Ready`, record the later implementation shape, and continue planning.

If the next action would be implementation, convert it into a handoff note and keep planning. The handoff note should identify the later file, assertion, fixture, and review criteria. It is not a blocked step.

## Recommendation

| Rank | ID | Score | Priority | Planning Decision |
| ---: | --- | ---: | --- | --- |
| 1 | AUTO-CHK-002 | 96 | P0 | Keep as first automation planning packet |
| 2 | AUTO-CHK-001 | 94 | P0 | Keep as next packet if duplicate-submit work is deferred |
| 3 | AUTO-CHK-003 | 92 | P0 | Use as helper-leverage packet for Dashboard money assertions |
| 4 | AUTO-CHK-006 | 91 | P0 | Shape mixed-basket assertion packet |
| 5 | AUTO-CHK-013 | 90 | P0 | Planning-ready assigned-seat failed-payment/retry ownership packet; fixture contract refined |
| 6 | AUTO-CHK-007 | 89 | P0 | Proof refined for checkout-link unavailable-item paid outcome |
| 7 | AUTO-CHK-008 | 84 | P0 | Review separately; promote only if package reporting/payout confidence is current priority |
| 8 | AUTO-CHK-011 | 79 | P1 | Planning-ready Stripe PaymentIntent recovery packet; Qase/manual coverage exists |
| 9 | AUTO-CHK-005 | 78 | P1 | Keep as fixture-spike packet |
| 10 | AUTO-CHK-017 | 77 | P1 | Planning-ready partial-credit remaining-balance packet; Qase/manual coverage exists |
| 11 | AUTO-CHK-018 | 76 | P1 | Planning-ready configured rate-card fee/tax-on-fee packet; Qase/manual coverage exists |
| 12 | AUTO-CHK-019 | 75 | P1 | Planning-ready resale checkout buyer/seller final-state packet; Qase/manual coverage exists |
| 13 | AUTO-CHK-014 | 74 | P1 | Planning-ready waitlist async fulfillment packet; Qase/manual coverage exists |
| 14 | AUTO-CHK-016 | 73 | P1 | Planning-ready payment-plan checkout reconciliation packet; backend coverage exists |
| 15 | AUTO-CHK-010 | 72 | P1 | Planning-ready identity-ownership packet; Qase/manual coverage exists |
| 16 | AUTO-CHK-015 | 71 | P1 | Planning-ready refund-protection upsell packet; backend coverage exists |
| 17 | AUTO-CHK-020 | 70 | P1 | Planning-ready checkout upgrade replacement packet; Qase/manual coverage exists |
| 18 | AUTO-CHK-012 | 69 | P1 | Park until wallet-capable browser/provider simulator strategy exists |
| 19 | AUTO-CHK-009 | 68 | P1 | Park until Square Terminal hardware/provider simulator strategy exists |
| 20 | AUTO-CHK-004 | 64 | P1 | Hold until gift-card business priority is confirmed |

## AUTO-CHK-002 Planning Packet

**Intent:** prove duplicate submit, retry, or replay creates one paid outcome only.

**Representative first path:** `diagnostic-replay-purchase` on WebPublic guest checkout.

**Why this path:** existing Authorize repro coverage already exercises risky replay behavior; the gap is final-state proof.

**QA handoff:** automate one duplicate-submit/retry final-state proof. Submit or replay the same checkout attempt twice, then prove exactly one paid transaction, one paid order/invoice, and one issued ticket set.

**Provider decision:** use the existing Authorize.net replay harness by default because it is already available. If Stripe production volume makes Stripe the higher business-priority provider, build or promote the equivalent Stripe duplicate-submit/retry proof first and keep the same acceptance criteria.

**Source references:**
- Backend idempotency/locking: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/serializers/viewsets.py:380`
- Checkout concurrency docs: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:75`
- Repro scenarios: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.config.ts:53`
- Replay capture: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:379`
- Checkout result exposes `invoiceData`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1489`
- Dashboard transaction ID filter expects one row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`

**Expected proof:**
- one successful final purchase response
- exactly one paid invoice/order for `invoiceData.transaction_id`
- ticket count matches purchased quantity
- no duplicate issued ticket set
- confirmation/receipt matches the same invoice
- Dashboard transaction filter returns one row

**Planning output still useful before code:**
- confirm which final-state proof should be preferred first: Dashboard-only, API-only, or Dashboard plus API
- define exact data keys the implementation should carry forward: `invoiceData.id`, `invoiceData.transaction_id`, buyer identity, quantity, expected total
- decide whether this remains a gated repro test or graduates into a regular critical-path suite

## AUTO-CHK-002 Handoff Checklist

Use this checklist for later implementation outside this worker.

| Area | Decision |
| --- | --- |
| Test scope | Start with one `diagnostic-replay-purchase` WebPublic guest path |
| What to automate | duplicate-submit/retry final-state proof |
| Open decision | Authorize existing harness by default, or Stripe equivalent first if provider volume drives priority |
| Suite placement | Keep in the existing Authorize repro area unless the team promotes it to regular critical-path checkout |
| Required returned data | `invoiceData.id`, `invoiceData.transaction_id`, buyer identity, expected quantity, expected total |
| Primary proof | Dashboard transaction filter by `transaction_id` returns one row |
| Secondary proof | API invoice/order count only if Dashboard proof cannot prove uniqueness cleanly |
| Ticket proof | issued ticket count equals purchased quantity |
| Non-goal | do not expand every surface or retry permutation in the first implementation |
| Review acceptance | reviewer can answer “can this double-charge or double-issue?” from the assertion names and failure output |

## AUTO-CHK-002 Assertion Contract

| Assertion | Failure Meaning |
| --- | --- |
| final purchase has one `transaction_id` | checkout did not settle into a single inspectable paid outcome |
| replay does not create a second paid outcome | duplicate submit/replay can create duplicate money movement |
| Dashboard transaction filter shows one row | organizer/support view sees one transaction for the attempt |
| ticket count equals requested quantity | buyer fulfillment was duplicated or under-issued |
| confirmation references the same invoice data | buyer-facing confirmation disagrees with payment/order state |

### PROOF-CHK-002 Duplicate Final-State Proof Refinement

**Result:** `AUTO-CHK-002` remains the best next automation target. This refinement narrows the first implementation to a concrete final-state proof, not a broader matrix.

**Proof order for later implementation:**
1. Keep `diagnostic-replay-purchase` on WebPublic guest as the first path.
2. Change the Authorize surface runner so `surface.run(page, view)` can return `CheckoutResult` or `invoiceData`.
3. Preserve replay response evidence from `state.purchaseReplays`.
4. Use `invoiceData.transaction_id` and `invoiceData.id` as the proof keys.
5. Primary uniqueness proof: Dashboard `filterByTransactionId(transaction_id, invoice_id)` returns exactly one transaction actions row.
6. API fallback/detail proof: venue invoice lookup by `transaction_id` plus invoice-items filtered by `invoice__transaction_id` prove the issued item quantity.
7. Do not expand to Widget, Box Office, throttled panic-click, or every replay variant until the first WebPublic diagnostic replay proof is stable.

**Evidence refs:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:379`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:539`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.test.ts:87`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:430`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1489`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:343`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:179`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:623`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:235`.

## AUTO-CHK-001 Planning Packet

**Intent:** prove a failed payment does not create a paid order, usable ticket, or permanent inventory/seat ownership.

**Representative first path:** failed Affirm WebPublic guest checkout.

**Why this path:** existing failed Affirm coverage already drives a deterministic provider failure and verifies UI recovery; the gap is final-state proof.

**Source references:**
- Failed Affirm matrix: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:31`
- WebPublic guest/auth path: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:68`
- Failed payment step returns `void`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1244`
- Failure helper asserts purchase request and provider failure only: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`
- Failure UI recovery: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/external/AffirmPaymentPage.ts:61`

**Expected proof:**
- failed provider path returns to checkout payment step
- no paid invoice/order exists for the failed attempt
- no usable ticket set is issued
- inventory or seat ownership is not permanently consumed
- Dashboard/API search is scoped tightly enough to avoid prior-run false positives

## AUTO-CHK-001 Handoff Checklist

Use this checklist for later implementation outside this worker.

| Area | Decision |
| --- | --- |
| Test scope | Start with failed Affirm WebPublic guest |
| Suite placement | Keep in `single-events-affirm-failed.test.ts` or adjacent failed-payment coverage |
| Required returned data | buyer email/identity, event ID, ticket type, requested quantity, basket/request context if available |
| Primary proof | negative Dashboard/API lookup shows no paid invoice/order for the failed attempt |
| Ticket proof | no active/usable ticket items exist for the buyer and event after failure |
| Inventory proof | selected quantity or seat is not permanently consumed after failure |
| Non-goal | do not add Stripe card decline, webhook failure, or every platform in the first implementation |
| Review acceptance | reviewer can answer “can failed payment create paid fulfillment?” from the assertion names and failure output |

## AUTO-CHK-001 Assertion Contract

| Assertion | Failure Meaning |
| --- | --- |
| failure toast appears and payment step remains visible | buyer recovery path broke before final-state checks |
| no paid invoice/order matches the failed attempt | failed payment can create paid money/order state |
| no issued usable tickets match the failed attempt | failed payment can create fulfillment without payment |
| inventory/seat state is available after failure | failed payment can permanently consume capacity |
| negative lookup uses unique buyer/basket context | assertion may be polluted by previous test data |

### PROOF-CHK-003 Failed Payment No-Paid-Outcome Refinement

**Result:** `AUTO-CHK-001` remains rank 2 and planning-ready. This refinement narrows the first implementation to a source-backed no-paid-outcome proof, not a provider/platform matrix.

**Proof order for later implementation:**
1. Keep failed Affirm WebPublic guest as the first path.
2. Make `payWithAffirmExpectingFailure().result()` return a failure context instead of `void`.
3. Carry unique buyer email, event id, ticket type id, `CartResult.itemId`, requested quantity, and expected total.
4. Keep the current failure toast/payment-step recovery assertion.
5. Primary no-paid proof: venue invoice lookup by exact buyer email returns no paid invoice for the failed attempt.
6. Item proof: venue invoice-items filtered by `invoice__email`, `event`, and `ticket_type` return no paid issued items for the failed attempt.
7. Optional user-side proof: use owner-scoped user ticket items only when the test has authenticated ownership or claim context.
8. Do not add Stripe decline, webhook failure, Widget, assigned seating, or deeper inventory counter proof until the first no-paid WebPublic proof is stable.

**Evidence refs:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:31`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:89`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:135`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:284`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1244`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-engine.ts:80`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/external/AffirmPaymentPage.ts:61`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/external/AffirmPaymentPage.ts:83`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:200`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:226`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:240`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/filters.py:24`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:831`.

## AUTO-CHK-003 Planning Packet

**Intent:** prove Dashboard transaction detail reconciles to the expected checkout paid amount.

**Representative first path:** existing Box Office discount scenario that already passes `expectedTotalBO`.

**Why this path:** it adds a reusable money assertion to an existing flow instead of creating another test permutation.

**Source references:**
- Backend invoice serializer exposes `amount_paid` and transaction fields: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:606`
- Frontend settlement row reads `amountPaid`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:226`
- Frontend row test ID uses `financial-breakdown-row-${label}`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/BreakdownLineItem.web.tsx:48`
- Playwright detail helper currently checks identity and transaction ID: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:210`
- Existing discount caller passes `pricingFeesTaxes.valueOnTransactionPage`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:417`

**Expected proof:**
- transaction list filters to the intended transaction
- transaction detail opens for the intended invoice/order
- `financial-breakdown-row-Settlement amount` is visible
- settlement amount matches `pricingFeesTaxes.valueOnTransactionPage`
- existing customer, seller, and transaction ID assertions still pass

## AUTO-CHK-003 Handoff Checklist

Use this checklist for later implementation outside this worker.

| Area | Decision |
| --- | --- |
| Test scope | Upgrade existing Dashboard transaction verification helper |
| Suite placement | `pages/dashboard/box-office/TransactionPage.ts`, exercised first by existing Box Office discount coverage |
| Required returned data | `transactionNumber`, optional `transactionId`, `pricingFeesTaxes.valueOnTransactionPage` |
| Primary proof | `financial-breakdown-row-Settlement amount` contains expected paid total |
| Data source | Use settlement row / `amount_paid`, not header gross revenue |
| Non-goal | do not add a new checkout scenario just to verify this helper |
| Review acceptance | reviewer can see checkout expected total compared against Dashboard transaction detail total |

## AUTO-CHK-003 Assertion Contract

| Assertion | Failure Meaning |
| --- | --- |
| transaction filter opens the intended transaction | money assertion may be checking the wrong order |
| settlement row is present | Dashboard transaction detail no longer exposes the paid-total row reliably |
| settlement amount equals expected checkout total | buyer paid amount and Dashboard transaction reporting disagree |
| transaction ID remains visible when provided | filtered transaction detail may not match the checkout result |
| customer/seller assertions remain intact | helper upgrade weakened existing transaction identity checks |

### PROOF-CHK-004 Dashboard Settlement Amount Refinement

**Result:** `AUTO-CHK-003` remains rank 3 and planning-ready as a helper assertion upgrade. This should strengthen existing Box Office checkout tests, not create a new scenario.

**Proof order for later implementation:**
1. Add `pricingFeesTaxes` to the private `TransactionPage.verifyTransactionDetails` input.
2. After customer, seller, phone, and transaction ID identity checks, locate `transactionRow.getByTestId("financial-breakdown-row-Settlement amount")`.
3. Assert the row contains `pricingFeesTaxes.valueOnTransactionPage`.
4. Use the settlement row because frontend source says it deliberately reads `amount_paid` / `amountPaid`, while header gross revenue can differ.
5. Exercise the helper first through an existing Box Office discount caller, then benefit from existing product, membership, hold, and Box Office journey callers that already pass `valueOnTransactionPage`.
6. Do not add a new checkout scenario for the first implementation.

**Evidence refs:** `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:600`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:74`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:218`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:226`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/BreakdownLineItem.web.tsx:48`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:210`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:276`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/box-office-journey.ts:460`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:417`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:578`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/memberships/checkout-memberships.test.ts:448`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/holds/regular-hold-checkout.test.ts:570`.

## AUTO-CHK-003 Selected Packet Readiness

**Current selected packet:** AUTO-CHK-003.

**Later implementation target:** upgrade `verifyTransactionDetails` so the existing `verifyTransaction` caller can prove Dashboard settlement amount equals the checkout expected total.

**Related test draft:** [[03 Test Cases/Checkout Money Movement Test Drafts#TC-CHK-002 Dashboard - Transaction Detail - Settlement Reconciliation - Verify Paid Total]]

| Readiness Item | Decision |
| --- | --- |
| First file to change later | `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts` |
| First caller to exercise it | `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:417` |
| Existing input to preserve | `pricingFeesTaxes.valueOnTransactionPage` |
| Assertion target | `transactionRow.getByTestId("financial-breakdown-row-Settlement amount")` |
| Backend field represented | `amount_paid` from venue invoice serializer |
| Frontend source of row | `SaleStyleBreakdown.web.tsx` renders `Settlement amount` from `amountPaid` |
| Do not use | header gross revenue / `amount`, because frontend source says it can intentionally differ |
| Qase context | partial related case found: Qase 935; no exact reusable settlement assertion case |

**Later code-change shape:**
- add `pricingFeesTaxes` to `verifyTransactionDetails` input
- after transaction identity assertions, locate the settlement row by test ID
- assert the row contains `pricingFeesTaxes.valueOnTransactionPage`
- keep customer, seller, phone, and transaction ID assertions unchanged
- do not add a new scenario for the first implementation; use the existing discount caller

## AUTO-CHK-006 Planning Packet

**Intent:** prove a mixed event-ticket plus checkout product add-on purchase creates a correct paid order with both fulfillment lines.

**Representative first path:** existing product `CheckoutAddOns` entry path.

**Why this path:** it already exercises the realistic mixed-basket route, so the planning target is assertion quality, not a new permutation.

**Source references:**
- Basket supports tickets and products/add-ons: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:14`
- Ticket/product lines create issued outcomes: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md:28`
- Existing path adds an event ticket first: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:284`
- Existing path completes checkout with `addOns`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:405`
- Existing confirmation item list is built from add-ons only: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:434`

**Expected proof:**
- paid order contains base event ticket line
- paid order contains checkout add-on product line
- final paid total matches ticket plus add-on total
- confirmation/order detail uses the same transaction id

**Planning output still useful before code:**
- identify exact base ticket item details to preserve from `extractEventItemDetails`
- define item-details array shape for base ticket plus add-on product
- decide whether expected barcode quantities need to differ between ticket and product lines

## AUTO-CHK-006 Handoff Checklist

Use this checklist when implementation is later handled outside this worker.

| Area | Decision |
| --- | --- |
| Test scope | Upgrade existing product `CheckoutAddOns` branch |
| Suite placement | `tests/core/checkout/products/checkout-products.test.ts` |
| Base ticket data | Preserve `extractEventItemDetails(basketResponse)` from the event-ticket add step |
| Add-on product data | Preserve `addOns` product id, name, variant, and quantity |
| Confirmation proof | Pass base ticket plus add-on product into `verifyOrderConfirmationThroughCheckout` |
| Total proof | Use existing `getVerificationTotal(productData, true)` for mixed-basket total |
| Non-goal | do not add another product entry-path permutation |
| Qase context | partial related cases found: Qase 360, 388, 466, 935, 4763, 4817; no exact case proves one paid event-ticket plus checkout add-on order contains both fulfillment lines and final total |

## AUTO-CHK-006 Assertion Contract

| Assertion | Failure Meaning |
| --- | --- |
| base event ticket appears in order detail | paid mixed basket can omit or fail to verify admission fulfillment |
| add-on product appears in order detail | paid mixed basket can omit or fail to verify product fulfillment |
| order total equals ticket plus add-on total | checkout charged amount and order detail disagree |
| transaction id matches confirmation/order detail | mixed-basket assertion may be checking the wrong order |
| item quantities match selected quantities | buyer fulfillment can under- or over-issue ticket/product lines |

### PROOF-CHK-005 Mixed Basket Ticket Plus Add-On Final-State Refinement

**Result:** keep `AUTO-CHK-006` rank 4 and planning-ready. The first implementation should upgrade the existing `CheckoutAddOns` branch, not add a new product permutation.

**Future implementation shape:**
- Preserve the base event ticket `ItemDetails` immediately after `extractEventItemDetails(basketResponse)`.
- Build add-on product `ItemDetails` from `addOns`.
- Pass both the base ticket line and add-on product line to `verifyOrderConfirmationThroughCheckout`.
- Keep `getVerificationTotal(productData, true)` as the combined paid-total proof.
- If ticket/product barcode expectations differ, pass `expectedBarcodeQuantity` as an array aligned to `itemDetails`.
- Use venue invoice-items API filtered by `invoice__transaction_id` plus `event`, `ticket_type`, `product`, and `product_attribute` only if UI order detail cannot prove both fulfillment lines.

**Evidence refs:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:284`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:311`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:434`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:442`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/payment-helpers.ts:109`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:239`.

## AUTO-CHK-007 Planning Packet

**Intent:** prove checkout tracking links do not charge or fulfill unavailable configured extras after review-page pruning.

**Representative first path:** WebPublic checkout link with existing basket identity, partially unavailable configured extras, one valid remaining item, and card payment.

**Why this path:** it combines realistic buyer state, inventory drift, basket mutation, and payment. Existing tracking-link E2E coverage proves normal purchase, while frontend unit/Qase coverage proves review behavior; the missing proof is the final paid order after pruning.

**Source references:**
- Retry/pruning logic reduces failed extra quantity and retries: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:102`
- Existing basket identity is threaded into `modifyItems`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:191`
- Unavailable item section is rendered from failed extras: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:341`
- Existing checkout-link entry opens review and clicks checkout: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:687`
- Tracking-link runner already completes normal card purchase and confirmation: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/web/checkout/tracking-links/checkout-tracking-links-runner.ts:102`
- Cart result is fixture-derived and should represent the pruned remaining items for this path: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-engine.ts:108`
- Confirmation helper verifies order details and expected total: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1322`
- Payment completion returns invoice data and checks confirmation order id: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:430`
- Unit tests cover basket reuse and unavailable-item display only: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.test.tsx:319`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.test.tsx:448`
- Qase 4802 covers review behavior but stops at continuing checkout when valid items remain: `/private/tmp/qase-checkout-tracking-link-case-details.json`

**Expected proof:**
- review page shows configured extras and unavailable quantities
- checkout proceeds only with available remaining items
- paid order excludes unavailable quantities
- charged total matches the pruned basket
- confirmation/order detail uses the same transaction id and expected remaining items

**Planning output still useful before code:**
- identify a deterministic fixture that makes only part of the checkout-link extras unavailable
- define how the test records expected requested quantity, removed quantity, and remaining purchasable quantity
- decide whether the existing-basket item should be the same event or a separate event to best prove basket identity preservation

## AUTO-CHK-007 Handoff Checklist

Use this checklist when implementation is later handled outside this worker.

| Area | Decision |
| --- | --- |
| Test scope | Add one checkout-link scenario; do not expand every tracking-link type |
| Suite placement | `tests/web/checkout/tracking-links` or adjacent checkout-link-specific spec |
| Entry path | Reuse `webPublicJourney(...).fromCheckoutLink(...)`, but inspect the review page before `ReviewCheckoutButton.clickCheckoutButton()` |
| Fixture setup | Existing basket identity plus checkout link with at least two configured extras where one can be unavailable |
| Quantity contract | Track requested quantity, unavailable/removed quantity, expected remaining quantity, expected item lines, and pruned expected total |
| Payment path | Card payment through existing tracking-link runner style |
| Confirmation proof | Verify final order/confirmation contains only remaining available items and expected total |
| Dashboard/API proof | Add only if confirmation/order detail cannot prove no unavailable quantity was charged |
| Non-goal | do not test every tracking-link type, customer state, or inventory state in the first implementation |
| Qase context | partial related case Qase 4802; no exact paid-order reconciliation case found |

## AUTO-CHK-007 Proof Refinement

`PROOF-CHK-007`: pause on the checkout-link review page, assert unavailable items are visible, carry pruned expected quantity/line/total data into checkout, complete card payment, then prove the paid confirmation/order contains only the available remaining items.

## AUTO-CHK-007 Assertion Contract

| Assertion | Failure Meaning |
| --- | --- |
| existing basket identity is reused before checkout | checkout link can fork or replace the buyer basket incorrectly |
| unavailable quantity is shown before checkout | buyer may not be told configured extras were pruned |
| requested, removed, remaining, and pruned total data are carried into the payment proof | final assertions may still compare against the original requested link quantity |
| checkout proceeds with only valid remaining items | unavailable items may still reach payment |
| final paid total equals pruned basket total | buyer can be charged for unavailable or removed quantities |
| confirmation/order detail excludes unavailable items | paid fulfillment can include inventory that was unavailable |
| transaction id matches payment/order detail | final assertion may be checking the wrong order |

## AUTO-CHK-008 Investigation Packet

**Intent:** prove a package checkout with child revenue realization reports the correct parent/child stat allocation after payment.

**Representative first path:** one package checkout with revenue realization enabled and known child allocation expectations.

**Why this path:** package purchase coverage is broad, so the value is not another purchase permutation. The value is proving reporting/payout truth after checkout.

**Source references:**
- Package realization mental model: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/package_revenue_realization.md:14`
- Allocation can differ at purchase time: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/package_revenue_realization.md:29`
- Package realization changes reporting/settlement truth: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/financial_flows.md:134`
- Purchase-time revenue realization hook: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:1442`
- Child allocation field set on item groups: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/revenue_realization/ticket_item_group_allocation.py:14`
- Parent stat fields dispersed to child invoice items: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/revenue_realization/invoice_item_propagation/invoice_item_propagators.py:36`
- Existing package purchase coverage: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages/package-purchase-flows.ts:109`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages/package-purchase-flows.ts:197`
- Existing Qase context: Qase 4229 and Qase 3879 are related but do not explicitly prove child revenue-realization stat allocation or reporting/payout reconciliation.

## AUTO-CHK-008 Handoff Checklist

Use this checklist when implementation is later handled outside this worker.

| Area | Decision |
| --- | --- |
| Test scope | One package checkout with revenue realization enabled and known child reporting expectations |
| First path | Reuse existing package purchase flow; prefer one custom or preset package fixture with deterministic child rows |
| Primary proof | Venue invoice-items API filtered by checkout `invoiceData.id` |
| API route | `/api/venue/financials/invoices/items/?invoice={invoiceId}` via `financials/invoices/items` |
| Assertable API fields | `final_amount_stat`, `amount_paid_stat`, `amount_earned_stat`, `tax_stat`, `is_sub_ticket` |
| Secondary proof | Dashboard transaction detail verifies transaction identity and paid total only |
| Do not assume | `percent_allocation_applied_from_package` or `parent_ticket_invoice_item` is exposed by this API; inspected serializer does not list those fields |
| Non-goal | Do not add another package purchase permutation just to prove checkout success |
| Review acceptance | Reviewer can answer “did the package sale report child revenue correctly after payment?” from assertion names and failure output |

## AUTO-CHK-008 Assertion Contract

| Assertion | Failure Meaning |
| --- | --- |
| package checkout returns one paid invoice/transaction | purchase did not settle into an inspectable paid outcome |
| venue invoice-items API returns rows for the paid invoice | reporting proof cannot find the checkout ledger items |
| expected child/sub-ticket rows are present | package sale did not create reportable child revenue rows |
| child `*_stat` values match fixture expectations | package revenue realization is reporting wrong child allocation |
| child stat totals reconcile to package reporting total | package reporting/payout truth disagrees with the sale |
| Dashboard transaction detail matches the same transaction and paid total | support/organizer view may disagree with the paid checkout outcome |

## AUTO-CHK-008 Proof Surface Decision

Use API first, Dashboard second. Backend source shows package realization flows into child invoice-item `*_stat` fields, and the venue invoice-items API exposes those stat fields plus `is_sub_ticket`. Dashboard transaction detail is still valuable for transaction identity and paid-total reconciliation, but inspected Dashboard code does not expose child package stat allocation.

**Qase detail result:** `/private/tmp/qase-package-revenue-case-details.json`
- Qase 4229 checks parent/child itemized setting mismatch and balanced totals.
- Qase 3879 checks final amount accuracy in checkout, invoice, and processor dashboard for package types.
- Neither case explicitly proves child revenue-realization stat allocation or reporting/payout reconciliation after checkout.

## AUTO-CHK-005 Fixture Planning Packet

**Intent:** create a reusable fixture path for membership event-batch hold-link checkout.

**Representative first path:** generated HOLD membership event batch with known member price, then public hold checkout purchase.

**Why this path:** it combines membership entitlements, generated hold links, public checkout, payment, and inventory/seat ownership in one realistic scenario.

**Source references:**
- Dashboard delivery method exposes hold links: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-batches-form/DeliveryMethod.web.tsx:122`
- Backend factory uses `HoldGeneratorService` for hold batches: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/batch_ticket_generator_factory.py:17`
- Venue route registers membership event batches: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/routers.py:244`
- Venue generate action starts batch generation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/venue_based/viewsets.py:740`
- Backend test proves generated hold basket can be purchased: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/tests/membership_event_batch_tests/test_membership_event_batch_generation.py:787`
- User route exposes membership benefit issue tickets: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/routers.py:96`
- User route exposes memberships members lookup: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/routers.py:90`
- User member serializer includes `id`, membership level, membership group, and user fields: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/serializers.py:139`
- User member filter supports `id`, status, membership level, membership group, and expiry filters: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/filters.py:21`
- User serializer exposes `member_ticket_batches[].hold_link`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/serializers.py:390`
- User filter requires `member`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/filters.py:156`
- Existing regular hold checkout normalizes and opens hold links: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/holds/regular-hold-checkout.test.ts:261`

## AUTO-CHK-005 Refined Fixture Path

1. Use existing membership checkout or fixture setup to create the member.
2. Query `/api/user/memberships/members/` as that buyer and filter by known membership level/group context.
3. Select the intended `member.id`; use newest/unique buyer data to avoid stale member collisions.
4. Call `/api/user/memberships/membership-benefit-issue-tickets/?member={memberId}`.
5. Extract `member_ticket_batches[].hold_link` from the HOLD batch.
6. Normalize/open the long hold URL using the regular hold checkout link helper.
7. Complete public hold checkout and assert paid amount, issued ticket quantity, and inventory/seat ownership.

## AUTO-CHK-005 Fixture Questions

| Question | Why It Matters |
| --- | --- |
| How should Playwright create or identify the `memberId`? | Preferred path is user member API lookup after membership purchase; verify static data does not return stale members. |
| Should setup use venue API, user API, or existing membership purchase flow? | Determines fixture stability and runtime. |
| Can batch generation be made deterministic in test env? | Async generation can make the fixture flaky. |
| Where should the hold-link slug be normalized? | Existing regular hold checkout has link handling that should be reused. |
| What is the expected hold-link amount source? | Total reconciliation needs a reliable member hold price. |

## AUTO-CHK-005 Fixture Contract

| Fixture Output | Required For |
| --- | --- |
| `memberId` from `/api/user/memberships/members/` | retrieve generated hold-link issue-ticket data |
| `holdLink` or normalized hold URL | open public hold checkout |
| `holdLinkSlug` if available | API hold lookup and purchase path |
| `expectedTotal` / member hold price | payment and Dashboard reconciliation |
| membership level / benefit / event IDs | debugging and repeatability |
| expected ticket quantity / seat or inventory state | fulfillment and ownership assertions |

## AUTO-CHK-005 Assertion Contract

| Assertion | Failure Meaning |
| --- | --- |
| generated issue-ticket response contains a hold link | membership hold batch generation did not create checkout entry path |
| public hold checkout opens from normalized link | generated hold link is unusable by buyers |
| paid invoice amount equals member hold price | membership hold checkout charges wrong amount |
| issued ticket count matches expected member batch quantity | member hold checkout under- or over-fulfills tickets |
| inventory/seat ownership moves from hold to purchased state | payment does not correctly resolve held inventory |

## AUTO-CHK-004 Parked Scope Decision

**Intent if resumed:** prove public gift-card checkout creates correct stored value and reconciles transaction amount.

**Why parked:** gift-card purchase is source-backed, but current priority depends on whether gift cards are business-critical for this checkout money-movement pass.

**Source references:**
- Public gift-card route renders purchase flow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/o/[venueSlug]/purchase-gift-card/index.tsx:13`
- Gift-card form redirects to checkout: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/gift-cards/GiftCardPurchaseForm.tsx:90`
- Gift-card checkout button exists: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/gift-cards/GiftCardPurchaseForm.tsx:451`
- Backend purchase docs state gift-card lines create stored value: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md:28`

**Resume only if:** product or QA confirms gift-card purchases belong in the current money-movement automation scope.

## AUTO-CHK-010 Planning Packet

**Intent:** prove a paid guest order connects only to the intended purchaser account.

**Why lower priority:** Qase/manual coverage already exists for same-email connect, different-email rejection, guest order view, owner scoping, and claim-context preservation. This is still useful automation, but it should not displace the current duplicate-charge, failed-payment, total-reconciliation, mixed-basket, or package-reporting candidates.

**Representative proof:**
- purchase as guest with a unique email
- connect or claim with the same email
- verify the transaction appears under that account's My Orders
- attempt different-email connect or direct access from another account
- assert rejection and no ownership transfer

**Source references:**
- Claim API: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/public/viewsets.py:11`
- Guest merge ownership reassignment: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/services/venue_user_merge_service.py:276`
- Claim UI wrong-account state: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/accounts/claim/ClaimForm.tsx:109`
- Existing Playwright guest auth helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-engine.ts:241`

**Data contract:**

| Data | Source |
| --- | --- |
| `guestBuyerEmail` | unique generated buyer for guest checkout |
| `differentBuyerEmail` | second clean buyer account/session |
| `invoiceData.transaction_id` | `checkout-journey.result()` |
| staging UUID | basket `uuid` from confirmation/staging path |
| expected total | event fixture or checkout result |
| expected item name and quantity | event fixture / purchased item details |

**Assertion contract:**

| Assertion | Failure Meaning |
| --- | --- |
| guest staging order opens and shows `Connect account` | guest order cannot reach the claim/connect path |
| same-email buyer confirms connection | intended purchaser cannot attach their paid order |
| My Orders shows same transaction, total, item, and quantity | order attached to wrong or incomplete account state |
| different-email buyer cannot connect the same order | paid order can move to the wrong buyer |
| different-email buyer cannot view authenticated transaction detail | paid order data leaks across accounts |
| original same-email buyer still owns the order | rejection path changed ownership or corrupted access |

## AUTO-CHK-019 Planning Packet

**Intent:** prove one resale checkout creates the correct buyer paid order and seller-side resale completion/refund/payout state.

**Why lower priority:** backend coverage and Qase/manual coverage are broad, so this should not displace duplicate-charge, failed-payment, Dashboard reconciliation, mixed-basket, assigned-seat failure/retry, tracking-link pruning, or membership hold-link packets. It remains valuable because inspected Playwright coverage did not prove the full resale buyer/seller final state.

**Representative proof:**
- original buyer purchases eligible event tickets
- original buyer lists one or more tickets for resale from My Orders or a source-backed API setup
- second buyer purchases resale ticket through public checkout
- assert one paid buyer invoice/order and expected issued ticket count
- assert resale submission reaches the expected Completed or refund-failed/payout state
- assert Dashboard/API totals, resale fees, and invoice-item snapshots reconcile

**Source references:**
- Backend resale purchase flow: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1206`
- Resale basket purchase and webhook completion: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1266`
- Paid buyer basket/ticket proof: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1274`
- Completed resale submission proof: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1282`
- Post-purchase resale finalization: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:2723`
- Resale refund/completion task: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py:2881`
- Resale invoice-item snapshot task: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py:2910`
- Completion status/original-ticket update: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/resale/refund_resale_submission.py:145`
- System-gateway resale basket behavior: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1932`
- My Orders resale API: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/repositories/UserBasedTicketResaleDetailRepository.ts:13`
- My Orders resale action: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/services/resales/useResellTicketsAction.ts:35`
- Resale modal submit: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/modals/resale/MyOrdersResellTicketsModalSelection.web.tsx:100`

**Coverage note:** Playwright: `No coverage found in inspected files` for exact resale/resell/resold checkout purchase, buyer paid order, seller completion/refund state, or resale fee reconciliation. Qase/manual coverage is broad: 2878, 2974, 3515, 3521, 3537, 288, 918, 2975-2985, and 4257.

**Future handoff note:** start with one GA public resale checkout. Widget and assigned-seat resale should be follow-ups only if they prove different platform or seat-ownership risk.

## AUTO-CHK-011 Planning Packet

**Intent:** prove Stripe PaymentIntent failure, cancellation, or OAuth-delay recovery creates no paid outcome before retry and exactly one paid outcome after retry.

**Why lower priority:** backend tests and Qase/manual coverage already exist for the failure/cancel class, while Playwright lacks exact final-state coverage. This is useful automation only if a safe non-secret provider simulator or test hook exists.

**Representative proof:**
- create a low-value Stripe PaymentIntent basket
- simulate canceled intent, webhook failure, or OAuth refresh delay safely
- assert no paid invoice/order/tickets from the failed attempt
- retry the same buyer path
- assert exactly one final paid invoice/order/ticket set and matching confirmation total

**Source references:**
- PaymentIntent endpoint: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:316`
- Canceled intent replacement rule: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:385`
- Stripe-reported cancellation before webhook catch-up: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:402`
- Webhook data and amount consistency: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:4021`
- Backend canceled-intent replacement test: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:956`
- Backend OAuth refresh delay test: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:3304`
- Frontend upsert route: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/basket/data/repositories/UserBasedTicketBasketRepository/UserBasedTicketBasketRepository.ts:28`
- Playwright normal PaymentIntent success polling: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:415`

**Assertion contract:**

| Assertion | Failure Meaning |
| --- | --- |
| failed/canceled/delayed attempt has no paid invoice/order | failed provider state can create paid order |
| failed/canceled/delayed attempt issues no usable tickets | buyer fulfillment can happen without paid payment |
| basket remains retryable or on hold | buyer recovery path is broken |
| retry creates exactly one paid invoice/order/ticket set | retry can duplicate or miss money movement |
| final confirmation total matches the retry transaction | failed attempt and retry state disagree |

**Coverage note:** Playwright: `No coverage found in inspected files` for webhook failure, canceled PaymentIntent recovery, OAuth refresh lock, or one-click wallet cancel final no-paid-order proof. Qase 4893, 4905, and 4910 provide manual coverage.

## AUTO-CHK-012 Planning Packet

**Intent:** prove one-click/express wallet cancel, blocked address, or provider failure creates no paid outcome, and retry creates exactly one final paid order.

**Why parked:** source behavior and manual Qase coverage exist, but useful Playwright automation depends on a stable wallet-capable browser/device, provider sandbox, or mocked wallet/provider simulator.

**Representative proof:**
- open an eligible public checkout with one-click wallet available
- cancel or fail the wallet authorization, or trigger blocked address behavior
- assert no completed order and no usable tickets
- retry with wallet or normal checkout
- assert exactly one final paid order, expected total, and wallet/provider metadata

**Source references:**
- Wallet/webhook success state: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:241`
- Skip local charging for provider-paid wallet path: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:424`
- Invoice wallet intent id: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice.py:495`
- Invoice wallet type: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice.py:2092`
- One-click feature flag: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/constants/waffle-flags.ts:19`
- Express checkout render condition: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/payment/components/PaymentSection/components/ExpressCheckoutSection.web.tsx:45`
- Stripe wallet dispatch: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/gateways/StripePaymentGateway/StripePaymentGateway.ts:563`
- Yuno wallet purchase: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/components/yuno/YunoWalletElement/YunoWalletElement.web.tsx:268`

**Coverage note:** Playwright: `No coverage found in inspected files` for one-click wallet purchase cancel/failure/retry final-state proof. Qase 4905 and Qase 652 provide manual coverage.

## AUTO-CHK-013 Planning Packet

**Intent:** prove failed payment on an assigned-seat checkout does not create a paid order, usable ticket, or sold seat, and that one retry creates exactly one paid order owning the expected seat.

**Representative proof:**
- open a public assigned-seating event
- select one seat through existing assigned-seating helpers
- fail payment through the existing Affirm failure path
- assert no paid invoice/order/ticket and no sold seat from the failed attempt
- retry once successfully
- assert final confirmation, Dashboard/API order, and seat ownership agree

**Source references:**
- Assigned seating usage model: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/assigned_seating_and_permissions.md:61`
- Seat usage traceability: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_usage.py:14`
- Seat claimed/on-hold distinction: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_permissions.py:431`
- Sold permission transition: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_permissions.py:448`
- Public seating payment types: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/[eventSlug]/seating/index.tsx:61`
- Assigned seating success flow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/events/assigned-seating-purchase-flows.ts:70`
- Failed-Affirm helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`
- User ticket item serializer exposes seat identity: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1219`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1296`
- User ticket item API uses the seat-aware serializer: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:807`
- Playwright selected-seat capture helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/api-helpers.ts:221`
- My Orders proof helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`

**Coverage note:** Playwright: `No coverage found in inspected files` for assigned-seat payment failure/retry final-state proof. Qase 217, 1190, and 1255 are adjacent success/hold cases only.

**Fixture contract:**
- Capture selected seat identifiers from the assigned-seating basket response before payment.
- Failed attempt proof must show no paid order/ticket item exists and the selected seat is not sold or owned by a paid ticket.
- Retry proof must show one paid transaction/order and the final ticket item/order contains the same selected seat identifiers.
- Prefer API seat identity proof plus My Orders/confirmation and Dashboard transaction identity; do not rely only on seating canvas state.

### PROOF-CHK-006 Assigned-Seat Failure/Retry Final-State Refinement

**Result:** keep `AUTO-CHK-013` rank 5 and planning-ready. The first implementation should use WebPublic best-available assigned seating because `clickBestAvailableCheckout` already returns a basket response that `captureSeatIdentifiers()` can read.

**Future implementation shape:**
- Start with WebPublic best-available assigned seating, not manual seat selection.
- Preserve selected `identifier`, `location_identifier`, and `segment_identifier` before payment.
- Make the failed-Affirm branch return scoped failure context instead of `void`.
- Prove no paid invoice/order/ticket item owns the selected seat after the failed attempt.
- Retry once successfully and prove exactly one paid order/ticket item contains the same seat identifiers.
- Do not start with manual seat selection unless the manual `clickCheckout` helper is upgraded to expose the same basket response.

**Proof surface:** API ticket item seat data first, then My Orders/confirmation and Dashboard transaction identity. Do not rely only on seating canvas visual state.

**Evidence refs:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:706`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:734`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/assigned-seating/SeatingPage.ts:130`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/assigned-seating/SeatingPage.ts:141`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/api-helpers.ts:221`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1220`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1219`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1296`.

## AUTO-CHK-014 Planning Packet

**Intent:** prove async waitlist fulfillment creates exactly one paid outcome and reconciled revenue after a buyer has already joined the waitlist.

**Representative proof:**
- join one CC-required system-gateway waitlist as an authenticated buyer
- verify Pending state and no paid tickets immediately after join
- trigger safe inventory or resale fulfillment
- process provider-confirmed payment through a safe fixture or test hook
- assert one paid invoice/order, issued ticket quantity, completed subscriber, and waitlist revenue stats

**Source references:**
- Waitlist join and fulfillment model: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/waitlist_fulfillment_and_holds.md:36`
- CC-required waitlist setup intent validation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:6007`
- Fulfillment purchase service: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/waitlist/subscriber_processing/utils/subscriber_purchase.py:46`
- Off-session PaymentIntent creation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/waitlist/subscriber_processing/utils/subscriber_purchase.py:126`
- Backend full-flow revenue proof: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1872`
- Existing Playwright waitlist join: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/waitlist/waitlist-single-event.test.ts:89`
- Pending-only verification helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/waitlists/WaitlistsPage.ts:50`

**Coverage note:** Playwright: `No coverage found in inspected files` for fulfilled waitlist final paid order, issued ticket set, completed subscriber, or revenue-stat reconciliation. Qase 2880, 2881, 2882, 2952, 2983, 4235, and 4804 provide related manual coverage.

**Future handoff note:** a separate implementation task may need a safe non-destructive fixture or test hook to advance a waitlisted basket from Pending to fulfilled without provider secrets. This is not a blocked step for this planning worker.

## NO-GAP-CHK-001 Donation Checkout Confirmation

**Result:** donation checkout does not change the automation ranking.

**Why:** existing Playwright coverage already uses Qase 3297 and the shared checkout matrix to add a configured donation during checkout. Related Qase/manual cases cover donation-only purchase, confirmation/receipt, refund retention, reports, and unsupported states.

**Source references:**
- Backend donation validation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:1937`
- Backend donation invoice item fields: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:3830`
- Backend invoice donation rollup: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:3972`
- Frontend Dashboard `Charity donation` row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:145`
- Frontend non-refundable donation row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/RefundDialog/InvoiceItemRow.web.tsx:117`
- Playwright donation suite: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/donations/purchase-donations.test.ts:5`
- Playwright donation fixture: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/donations/purchase-donations.config.ts:62`

**Optional future handoff note:** if reviewers want deeper proof, strengthen existing donation coverage with explicit Dashboard/API `donation_amount`, `Charity donation` breakdown row, refund retention, and report/payout checks. This is not a new top-ranked candidate.

## NO-GAP-CHK-002 Refund Protection Checkout Confirmation

**Result:** refund-protection core checkout does not change the automation ranking.

**Why:** existing Playwright coverage already drives refund protection opt-in, opt-out, and high-value suppression across WebPublic and Widget matrices, then verifies order detail protection UI or hidden state. Related Qase/manual coverage is broad enough that this should stay below the current P0 duplicate-charge and failed-payment gaps.

**Source references:**
- WebPublic matrix: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection.test.ts:40`
- Widget matrix: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection.test.ts:53`
- Opt-in, opt-out, and high-value suppression test data: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/refund-protection/refund-protection-config.ts:16`
- Checkout opt-in/hidden handling: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Purchase.ts:261`
- My Orders protection proof: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:389`
- Backend protection fields: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:145`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:446`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:611`
- Frontend confirmation and Dashboard fields: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/hooks/useCheckoutConfirmation.tsx:199`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:54`

**Optional future handoff note:** if reviewers want deeper proof, strengthen an existing refund-protection path with explicit Dashboard/API `protection_charges`, `has_protection`, and financial breakdown assertions. This is not a new top-ranked candidate.

## AUTO-CHK-018 Configured Rate-Card Fee And Tax-On-Fee Checkout Packet

**Intent:** prove one configured-fee checkout reconciles charged amount, configured fee rows, tax-on-fee rows, and Dashboard/API settlement fields.

**Representative proof:**
- use one configured-fee public event ticket with internal Showpass fee, organizer/custom fee, and tax-on-fee
- complete card checkout
- assert checkout review total equals subtotal plus configured fees/taxes
- assert exactly one paid invoice/order
- assert Dashboard configured fee row names, tax-on-fee rows, and Settlement amount
- assert venue invoice/API final amount, service charges, organizer/custom fees, and tax-on-fee totals agree

**Source references:**
- Fee totals and tax-on-fee parsing: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/fees_json_service.py:120` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/fees_json_service.py:295`
- Backend fee/tax-on-fee tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_custom_fees.py:293` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_custom_fees.py:336`
- Pre-charge service-fee guard: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:379`
- Dashboard configured fee mapping/rendering: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:85`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/fee-breakdown-rules.ts:120`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:47`
- Existing generic Playwright total checks: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Review.ts:365` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:187`

**Coverage note:** Playwright: `No coverage found in inspected files` for explicit configured rate-card, organizer fee, or tax-on-fee checkout proof. Generic `Service Fees`/`expectedFeeAndTaxes` checks exist. Qase/manual coverage is broad in cases 3142, 3156, 3168, 3169, 3493, 3876, 3883, and 3889.

**Future handoff note:** keep this as one representative configured-fee scenario. Do not create a rate-card permutation suite unless a different fee path proves a different money-movement risk.

## AUTO-CHK-015 Refund-Protection Upsell Checkout Packet

**Intent:** prove post-purchase refund-protection upsell creates exactly one protection-only paid invoice linked to the original transaction and does not create duplicate ticket artifacts.

**Representative proof:**
- complete one eligible paid ticket order without refund protection
- obtain a source-backed upsell token from My Orders CTA or email-link path
- open `/checkout/refund-protection/upsell/{token}/`
- create/fetch the protection-only basket and complete card payment
- assert the upsell invoice has `source_transaction_id` equal to the original transaction
- assert the original order now exposes protection
- assert the upsell confirmation has no duplicate ticket, wallet, or SMS artifacts

**Source references:**
- Public upsell details and create-basket APIs: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/api/public/viewsets.py:655` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/api/public/viewsets.py:675`
- Upsell record links source/upsell basket and invoice: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/models/basket_protection.py:343`
- Purchase source validation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1016`
- SOLD conversion: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tasks/protection_tasks.py:417`
- Source transaction and CTA fields: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:238`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:483`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:490`
- Frontend upsell route and purchase path: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/constants/public-routes.ts:54`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/hooks/useRefundProtectionUpsellCheckout.ts:53`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/ui/components/RefundProtectionUpsellCheckoutContent.web.tsx:241`
- Protection upsell confirmation handling: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/hooks/useCheckoutConfirmation.tsx:206`
- Backend tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:736`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1047`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1551`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1720`

**Coverage note:** Playwright: `No coverage found in inspected files` for refund-protection upsell token checkout, create-basket, purchase, `source_transaction_id`, or linked invoice proof. Local Qase export did not show an exact tokenized upsell purchase case.

**Future handoff note:** later implementation should prefer the My Orders CTA token if it is easier to retrieve deterministically than an email token. This worker does not implement the test.

## PROOF-CHK-001 Shared Final-State Proof Contract

**Result:** shared proof contract recorded for P0 checkout money-movement packets.

**Why:** several top packets need the same final-state answers: did exactly one paid order exist, did no paid order exist after failure, did ticket/item counts match, and did Dashboard/API agree with checkout.

**Source references:**
- `InvoiceData` carries `transaction_id`, `ticket_items`, and `invoice_items`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Purchase.ts:43`
- Public checkout captures financial invoice response and checks confirmation order ID against `transaction_id`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:430`
- My Orders verifies order detail items and totals: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`
- Dashboard transaction filter proves one visible transaction row by transaction ID: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`
- Backend user invoice detail can retrieve by transaction ID: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/viewsets.py:138`
- Backend venue invoice and invoice-item APIs support transaction and invoice-item reconciliation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:179` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:235`

**Use for later implementation:**
- `AUTO-CHK-002`: one paid Dashboard/API outcome for replayed purchase payload.
- `AUTO-CHK-001`: no paid invoice/order/ticket set after failed payment.
- `AUTO-CHK-006`: base ticket plus add-on item lines and total reconcile.
- `AUTO-CHK-007`: paid order excludes pruned unavailable items and matches final total.
- `AUTO-CHK-013`: failed assigned-seat attempt creates no paid ownership; retry owns selected seat once.

**Non-goal:** this worker does not implement the helper. It records the reusable proof shape for later source-write work.

## NO-GAP-CHK-005 Core Exchange Checkout Confirmation

**Result:** core exchange checkout does not change the automation ranking.

**Why:** existing Playwright exchange suites already start from real purchases, initiate public/My Orders and Box Office exchanges, apply exchange credit, and verify replacement totals across same-ticket, different-ticket, full-exchange, card, cash, mobile, and desktop paths. Backend and Qase/manual coverage are also broad.

**Source references:**
- Backend exchange-credit creation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/viewsets.py:205`
- Backend exchange replacement invoice and itemized side effects: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:492` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:722`
- Backend exchange fee context: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:2928`
- Backend higher-value/consecutive/expired-credit tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_basket.py:6797`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_basket.py:6873`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_api.py:2063`
- Frontend My Orders exchange API and Dashboard settlement row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/repositories/UserBasedInvoiceRepository.ts:32` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/ExchangeAdjustmentStyleBreakdown.web.tsx:48`
- Playwright exchange flows and matrices: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.helpers.ts:168`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.helpers.ts:217`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.helpers.ts:295`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange.test.config.ts:65`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/single-item-itemized-exchange-box-office-cash.test.config.ts:44`

**Optional future handoff note:** if reviewers want deeper proof, strengthen existing exchange coverage with explicit Dashboard/API exchange-adjustment `Settlement amount` and invoice-item reconciliation. This is not a new broad exchange candidate.

## AUTO-CHK-020 Checkout Upgrade Offer Planning Packet

**Result:** lower P1/manual-backed candidate. Current best automation remains `AUTO-CHK-002`.

**Representative path:** WebPublic checkout review upgrade from a base ticket to one higher-priced target ticket.

**Source references:**
- Backend upgrade relationships and sold-out filtering: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:459` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:488`
- Backend `is_upgraded` persistence and serializer exposure: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_items.py:382` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:351`
- Frontend upgrade data and checkout review offer: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/basket/services/usePublicBasketItemData.ts:101`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/domain/services/BasketUpgradesService.ts:217`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/review/components/ReviewItemGroup/ReviewItemGroup.web.tsx:313`
- Frontend replacement/persist action: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/services/useBasket.ts:1283`

**Coverage note:** Playwright: `No coverage found in inspected files` for upgrade offer click, upgraded paid order, original item exclusion, total/inventory reconciliation, or issued upgraded ticket proof. Qase 3743 and 4298 provide manual coverage.

**Later handoff:** assert base item offer -> upgraded basket only -> `is_upgraded=true` -> upgraded total -> one paid order/invoice/ticket set -> no original ticket issued -> Dashboard/API total match -> upgraded target inventory consumed. Do not expand to cart-summary/hold-link/tracking-link/mobile variants unless they prove a distinct risk.

## NO-GAP-CHK-006 Core Pay What You Can Checkout Confirmation

**Result:** no new automation candidate. Current best automation remains `AUTO-CHK-002`.

**Why:** backend basket tests cover PWYC price application, free-allowed behavior, and invalid values; frontend carries `pay_what_you_can_price` from selector to basket modification; Playwright has dedicated PWYC checkout coverage across WebPublic, Widget, Box Office, and assigned seating; Qase/manual coverage is broad.

**Source references:**
- Backend basket validation and reporting fields: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_pay_what_you_can.py:83`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_pay_what_you_can.py:160`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_pay_what_you_can.py:200`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/csvs.py:378`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/csvs.py:698`
- Frontend selector and basket propagation: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/events/components/tickets/pay-what-you-can/PWYCTicketType/PWYCTicketType.web.tsx:40`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/tickets/components/TicketTypesContainer/TicketTypesContainer.web.tsx:288`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/utils/helpers.ts:181`
- Playwright PWYC suites: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc/pwyc-single-events.test.ts:51`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/pwyc/pwyc-single-events.test.ts:195`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/events/assigned-seating-config.ts:84`

**Optional future handoff note:** if reviewers need deeper reporting proof, strengthen existing coverage with explicit Dashboard/API `Pay What You Can Enabled` and `Pay What You Can Surplus/Deficit` assertions. This is not a new broad PWYC candidate.

## POLICY-CHK-002 P0 Scope Focus

**Result:** active worker scope is P0/highest-risk checkout planning only.

Preserve all existing P1/lower backlog packets, no-gap records, decision rows, and planning notes, but do not continue discovering or refining P1/lower candidates in this goal phase unless the user explicitly reopens lower-priority planning. Use [[06 Prompts/Checkout P1 Lower Automation Continuation Worker]] later when the team wants to carry on below P0.

## Phase 2 Planning Loop

For each pass, do one compact planning improvement:

1. Choose the highest-ranked packet whose handoff is incomplete.
2. Tighten the automation intent, data contract, assertions, fixture needs, and review checklist.
3. Link only source-backed evidence.
4. Avoid expanding permutations unless they prove a different risk.
5. Update [[02 Feature QA/Checkout Automation Worker State.json]] first and [[02 Feature QA/Checkout Automation Mission Control]] last.

## Next Planning Tasks

| Order | Task | Output |
| ---: | --- | --- |
| 1 | Finalize AUTO-CHK-002 handoff checklist | done - assertion contract and test-data contract drafted |
| 2 | Convert AUTO-CHK-001 into the same packet shape | done - failed-payment negative final-state contract drafted |
| 3 | Convert AUTO-CHK-003 into helper contract | done - Dashboard settlement assertion contract drafted |
| 4 | Shape AUTO-CHK-006 mixed-basket packet | done - handoff checklist and assertion contract drafted |
| 5 | Check AUTO-CHK-006 against Qase coverage | done - partial related cases found; no exact mixed-basket fulfillment proof |
| 6 | Refine AUTO-CHK-006 final-state proof contract | done - PROOF-CHK-005 recorded for base ticket plus add-on item lines |
| 7 | Shape AUTO-CHK-007 checkout-link unavailable-item packet | done - fixture needs, data contract, and assertion contract drafted |
| 8 | Investigate AUTO-CHK-008 package revenue-realization reporting | done - API-first proof surface, fixture expectations, and assertion contract drafted |
| 9 | Investigate Square Terminal async completion | done - AUTO-CHK-009 parked for hardware/provider simulator strategy |
| 10 | Split AUTO-CHK-005 fixture spike into setup questions | done - member ID, hold link retrieval, reusable fixture contract drafted |
| 11 | Investigate guest checkout claim/connect ownership | done - AUTO-CHK-010 added as lower P1 candidate with Qase/manual coverage |
| 12 | Shape AUTO-CHK-010 ownership packet | done - data contract and assertion contract drafted |
| 13 | Investigate Stripe PaymentIntent recovery | done - AUTO-CHK-011 added as manual-backed P1 candidate |
| 14 | Shape AUTO-CHK-011 recovery packet | done - source refs, assertion contract, and safe-simulation gate drafted |
| 15 | Investigate one-click wallet checkout | done - AUTO-CHK-012 added as source-backed parked P1 branch |
| 16 | Investigate assigned seating failure/retry ownership | done - AUTO-CHK-013 added as planning-ready P0 candidate |
| 17 | Refine AUTO-CHK-013 fixture contract | done - selected-seat capture, failed-attempt no-paid proof, and retry same-seat proof surface drafted |
| 18 | Refine AUTO-CHK-013 final-state proof contract | done - PROOF-CHK-006 recorded for best-available seat capture, failed-payment no-ownership, and retry same-seat ownership |
| 17 | Investigate waitlist async fulfillment | done - AUTO-CHK-014 added as lower P1 manual-backed planning-ready candidate |
| 18 | Investigate donation checkout coverage | done - NO-GAP-CHK-001 recorded; existing Playwright/Qase/manual coverage means no ranking change |
| 19 | Define shared final-state proof contract | done - PROOF-CHK-001 recorded for paid/no-paid Dashboard/API/My Orders proof |
| 20 | Investigate refund-protection checkout coverage | done - NO-GAP-CHK-002 recorded; existing Playwright/Qase/manual coverage means no ranking change |
| 21 | Investigate refund-protection upsell checkout | done - AUTO-CHK-015 recorded as lower P1 planning-ready packet |
| 22 | Investigate payment-plan checkout reconciliation | done - AUTO-CHK-016 recorded as lower P1 planning-ready packet |
| 23 | Investigate credit-applied partial payment reconciliation | done - AUTO-CHK-017 recorded as lower P1 manual-backed planning-ready packet |
| 24 | Investigate core discount checkout coverage | done - NO-GAP-CHK-003 recorded; existing backend, Playwright, Dashboard, and Qase/manual coverage means no ranking change |
| 25 | Investigate configured rate-card fee/tax-on-fee checkout | done - AUTO-CHK-018 recorded as lower P1 manual-backed planning-ready packet |
| 26 | Investigate delivery-method shipping/Will Call checkout | done - NO-GAP-CHK-004 recorded; existing backend, Playwright, Dashboard/frontend, and Qase/manual coverage means no ranking change |
| 27 | Investigate resale checkout buyer/seller final state | done - AUTO-CHK-019 recorded as lower P1 manual-backed planning-ready packet |
| 28 | Investigate core exchange checkout coverage | done - NO-GAP-CHK-005 recorded; existing backend, Playwright, Dashboard/frontend, and Qase/manual coverage means no broad exchange ranking change |
| 29 | Investigate checkout upgrade offer paid outcome | done - AUTO-CHK-020 recorded as lower P1 manual-backed planning-ready packet |
| 30 | Investigate core Pay What You Can checkout coverage | done - NO-GAP-CHK-006 recorded; existing backend, frontend, Playwright, and Qase/manual coverage means no broad PWYC ranking change |
| 31 | Refocus active worker scope on P0/highest-risk only | done - POLICY-CHK-002 recorded; preserve P1/lower backlog context and use the P1/lower continuation prompt later |
| 32 | Refine AUTO-CHK-002 duplicate final-state proof | done - PROOF-CHK-002 recorded; first implementation should carry invoice data out of diagnostic replay and prove one Dashboard/API paid outcome |
| 33 | Refine AUTO-CHK-001 failed-payment no-paid proof | done - PROOF-CHK-003 recorded; first implementation should return failed-payment context and prove no venue invoice/invoice-items for the failed buyer/event/ticket |
| 34 | Refine AUTO-CHK-003 Dashboard settlement proof | done - PROOF-CHK-004 recorded; helper should assert `financial-breakdown-row-Settlement amount` using existing `valueOnTransactionPage` inputs |
| 35 | Hold AUTO-CHK-004 | parked - resume only if gift-card purchases are confirmed in scope |
| 36 | Sync Phase 2 planning with latest reviewer gate | superseded - PHASE2-REVIEW-SYNC-CHK-001 first aligned P1 scores; use PHASE2-GATE-SYNC-CHK-002 for the current gate |
| 37 | Sync Phase 2 planning with current reviewer gate | done - PHASE2-GATE-SYNC-CHK-002 recorded; resume now points at `DECISION-QUEUE-SYNC-CHK-003` / `DEC-CHK-046` through `DEC-CHK-050` |

## Exit Rules

Stop planning when:

- all high-value P0 packets have reviewer-ready handoff checklists and remaining work is low-risk duplication; P1/lower packets stay preserved for the separate continuation prompt
- the next useful planning step requires secrets, product confirmation, destructive setup, provider/hardware strategy, or missing read-only access/context
- planning starts duplicating existing packet content without changing planning clarity

Do not stop because a packet is ready for source implementation. Mark it `Planning Ready`, keep it ranked, and continue to another read-only planning loop.

Do not ask to implement from this worker. Implementation belongs to a later human or separately authorized task.

Do not create blocked steps for missing source-write authorization. Source implementation is outside this worker by design.

If a step is only "write the test", "change the fixture", "edit app code", or "write Qase", convert it to a `Planning Ready` handoff note and continue.
