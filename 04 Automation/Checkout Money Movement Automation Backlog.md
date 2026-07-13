# Checkout Money Movement Automation Backlog

Automation backlog for checkout paths with high money movement, order integrity, or fixture leverage.

Related notes:
- [[06 Prompts/Checkout Recursive Automation Prioritization Worker]]
- [[02 Feature QA/Checkout Automation Mission Control]]
- [[06 Prompts/Checkout Money Movement Exploration Goal]]
- [[02 Feature QA/Checkout Critical Path Gap Analysis]]
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]
- [[04 Automation/Checkout Playwright Automation Review Checkpoint]]
- [[02 Feature QA/Checkout Automation Decision Queue]]

## Current Recommendation

Current best: `AUTO-CHK-002` - duplicate submit/retry creates one paid outcome.

Recommended next Playwright batch: ranks 1-6. `AUTO-CHK-008` is real P0 reporting/payout coverage, but review it separately unless package reporting is a current business priority.

Current reviewer gate: `DECISION-QUEUE-SYNC-CHK-003`. Review `DEC-CHK-046` through `DEC-CHK-050`, [[04 Automation/Checkout Playwright Automation Review Checkpoint]], [[04 Automation/Checkout Automation Phase 2 Planning]], and this backlog together. `HANDOFF-AUDIT-CHK-001` already confirmed the top-six handoff fields, `P0-SATURATION-CHK-001` confirmed the P0 reviewer set is structurally complete, and `PROMPT-SYNC-CHK-001` / `ARTIFACT-SYNC-CHK-001` confirm fresh sessions should not repeat completed P0 audits unless reviewer feedback or candidate content changes.

Use `LEVERAGE-CHK-001` for the future implementation order: shared `CheckoutResult` / `invoiceData.transaction_id` and final-state proof helpers first, then failed-payment context and narrow adapters for checkout links, add-ons, and assigned seating.

## Candidate Index

| Priority | Score | Candidate | Fixture Need | Status |
| --- | ---: | --- | --- | --- |
| P0 | 96 | AUTO-CHK-002 - Duplicate submit/retry creates one paid outcome | Duplicate submit harness / one-final-paid-outcome proof | Planning Ready / Proof Surface Refined |
| P0 | 94 | AUTO-CHK-001 - Failed payment no paid order/tickets/inventory | Failed Affirm no-paid-outcome context and assertion | Planning Ready / Proof Surface Refined |
| P0 | 92 | AUTO-CHK-003 - Dashboard transaction total reconciliation | Shared Settlement amount assertion helper | Planning Ready / Proof Surface Refined |
| P0 | 91 | AUTO-CHK-006 - Mixed ticket plus checkout add-on reconciliation | Existing CheckoutAddOns path / base-plus-add-on order proof | Planning Ready / Proof Surface Refined |
| P0 | 90 | AUTO-CHK-013 - Assigned seating payment failure/retry preserves seat ownership | Best-available seat identifiers plus failed-payment/retry proof | Planning Ready / Proof Surface Refined |
| P0 | 89 | AUTO-CHK-007 - Checkout tracking-link unavailable-item paid outcome | Checkout-link review-page pruning / pruned paid-order assertion | Planning Ready / Proof Surface Refined |
| P0 | 84 | AUTO-CHK-008 - Package revenue-realization reporting reconciliation | Package revenue-realization fixture plus API-first stat allocation proof | Planning Ready / Review Separately |
| P1 | 79 | AUTO-CHK-011 - Stripe PaymentIntent cancel/webhook recovery creates no paid order and remains retry-safe | Safe provider simulation or test hook for canceled intent / OAuth delay | Planning Ready |
| P1 | 78 | AUTO-CHK-005 - Membership event-batch hold-link checkout reconciliation | Member hold-link basket fixture with price, expiry, and inventory/seat state | Fixture plan tightened |
| P1 | 77 | AUTO-CHK-017 - Credit-applied checkout remaining balance reconciles to charged amount | Partial-credit fixture plus remaining card charge and Dashboard/API Credit applied proof | Planning Ready / Manual-backed |
| P1 | 76 | AUTO-CHK-018 - Configured rate-card fee and tax-on-fee checkout reconciliation | Configured-fee fixture plus fee/tax row and invoice reconciliation proof | Planning Ready / Manual-backed |
| P1 | 75 | AUTO-CHK-019 - Resale checkout buyer charge and seller-side completion reconciliation | Resale listing fixture plus buyer/seller final-state proof | Planning Ready / Manual-backed |
| P1 | 74 | AUTO-CHK-014 - Waitlist async fulfillment creates one paid order and reconciled revenue | Waitlist fulfillment trigger / one paid invoice-ticket-revenue proof | Planning Ready / Manual-backed |
| P1 | 73 | AUTO-CHK-016 - Payment-plan checkout installment totals reconcile to Dashboard/API state | Payment-plan ticket fixture plus initial invoice, fee row, and pending-ticket proof | Planning Ready / Backend-covered |
| P1 | 72 | AUTO-CHK-010 - Guest checkout claim/connect preserves paid order ownership | Guest paid-order claim/connect helper and owner-scoped My Orders assertion | Planning Ready / Manual-backed |
| P1 | 71 | AUTO-CHK-015 - Refund-protection upsell checkout creates linked protection-only invoice | Tokenized upsell basket fixture plus source/upsell invoice proof | Planning Ready / Backend-covered |
| P1 | 70 | AUTO-CHK-020 - Checkout upgrade offer replaces item and reconciles upgraded paid outcome | Upgrade-path fixture plus upgraded item/order/total/inventory proof | Planning Ready / Manual-backed |
| P1 | 69 | AUTO-CHK-012 - One-click wallet checkout cancel/failure/retry creates no paid order until final success | Wallet-capable browser/device or provider simulator strategy | Planning Parked |
| P1 | 68 | AUTO-CHK-009 - Square Terminal async completion finalizes one paid Box Office order | Square Terminal hardware/provider simulator or mocked webhook strategy | Planning Parked |
| P1 | 64 | AUTO-CHK-004 - Gift-card stored value checkout reconciliation | Public gift-card purchase fixture | Needs business priority |

## Shared Batch Leverage

`LEVERAGE-CHK-001` prevents the top-six from turning into six unrelated tests.

| Step | Future Implementation Order | Unlocks |
| ---: | --- | --- |
| 1 | Preserve `CheckoutResult` / `invoiceData.transaction_id` from successful checkout and replay paths | `AUTO-CHK-002`, `AUTO-CHK-003`, `AUTO-CHK-006`, `AUTO-CHK-007` |
| 2 | Reuse Dashboard transaction-id filtering plus My Orders order-detail proof as the default paid final-state surface | `AUTO-CHK-002`, `AUTO-CHK-003`, `AUTO-CHK-006`, `AUTO-CHK-007` |
| 3 | Add failed-payment context for failed Affirm so negative invoice/item lookups have buyer, event, ticket type, quantity, and total context | `AUTO-CHK-001`, `AUTO-CHK-013` |
| 4 | Add narrow adapters for checkout-link review pause, mixed add-on expected lines, and assigned-seat serialized identifiers | `AUTO-CHK-006`, `AUTO-CHK-013`, `AUTO-CHK-007` |

## Shared Proof Contracts

### PROOF-CHK-001 - Checkout Final-State Proof

Use this contract when later implementation handles P0 money-movement packets.

**Supports:** `AUTO-CHK-002`, `AUTO-CHK-001`, `AUTO-CHK-006`, `AUTO-CHK-007`, `AUTO-CHK-013`

**Source references:**
- Playwright invoice data shape: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Purchase.ts:43`
- Public checkout invoice response and confirmation ID match: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:430`
- My Orders confirmation proof: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`
- Dashboard transaction uniqueness proof: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`
- Box Office invoice response capture: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:267`
- Backend user invoice transaction lookup: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/viewsets.py:138`
- Backend venue invoice transaction lookup: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py:179`
- Backend venue invoice-items filter: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:235`

**Later implementation shape:**
- Paid branches assert one Dashboard transaction row by `invoiceData.transaction_id`.
- Buyer-accessible branches assert My Orders order ID, item lines, ticket/barcode quantity, and total.
- API-backed branches assert invoice and invoice-item records by `invoiceData.id` or `invoiceData.transaction_id`.
- Failed branches use a unique buyer/basket context and assert no paid invoice/order/ticket set exists.
- Do not use this worker to implement the helper; it is a planning handoff for a later source-write task.

## Candidate Template

```markdown
### [P0/P1/P2/P3] Candidate Title

**Score:** 0/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#heading]]  
**Automation type:** API / E2E / integration / fixture-only  

## Why Automate

- 

## Source Behavior

- Backend:
- Frontend:
- Existing Playwright:
- Existing Qase/manual:

## Test Data

- 

## Fixtures Needed

- Existing:
- Missing:

## Flow

| Step | Data | Expected Result |
| --- | --- | --- |
|  |  |  |

## Assertions

- Payment state:
- Order state:
- Totals:
- Inventory / seats:
- Confirmation / receipt:
- Transaction / payout:

## Risks

- Flaky setup:
- External dependencies:
- Data cleanup:

## Qase Mapping

- Case ID:
- Suite:
- Tags:
```

## Seed Candidate Areas

- Card payment success creates one paid order with amount charged equal to checkout total.
- Card failure does not create a paid order and does not consume inventory or seats.
- Retry after failed payment creates one successful order and does not duplicate payment or ticket issuance.
- Refresh or double-submit during payment does not duplicate charge, order, ticket, or confirmation.
- Discounted checkout keeps subtotal, discount, fees, taxes, and final charge aligned.
- Credit or gift card checkout does not over-apply value and records the remaining payment correctly.
- Sold-out or capacity-change checkout blocks purchase before payment or recovers cleanly after payment failure.
- Confirmation, receipt, order detail, transaction detail, and payout show consistent payment and total values.

## Ready Candidates

### P0 - AUTO-CHK-002 - Duplicate Submit/Retry Creates One Paid Outcome

**Score:** 96/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Duplicate / Retry / Replay Coverage Does Not Prove One Final Paid Outcome]]  
**Automation type:** E2E assertion upgrade on existing Authorize repro harness  
**Status:** Planning packet ready; later source implementation is outside this worker

## QA Handoff

Automate one duplicate-submit/retry final-state proof. The test should submit or replay the same checkout attempt twice, then prove the buyer has exactly one paid transaction, one paid order/invoice, and one issued ticket set.

Default first path: use the existing Authorize.net `diagnostic-replay-purchase` WebPublic guest scenario because that replay harness already exists. If Stripe production volume should drive priority, create or promote the equivalent Stripe duplicate-submit/retry proof first and use the same acceptance criteria.

## Why Automate

- Duplicate charge/order/ticket issuance is the highest direct money-movement risk currently unblocked.
- The Authorize repro matrix already exercises panic-click, slow purchase, and diagnostic replay behavior.
- Existing coverage captures purchase/replay responses and verifies confirmation, but does not prove exactly one final paid transaction/order/ticket set.

## Source Behavior

- Backend idempotency/locking: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/serializers/viewsets.py:380`
- Checkout concurrency docs: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:75`
- Repro scenarios: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.config.ts:53`
- Repro test runner: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.test.ts:87`
- Replay capture: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:379`
- WebPublic/Widget confirmation-only branch: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.helpers.ts:539`
- Checkout result exposes `invoiceData`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1489`
- Dashboard transaction ID filter expects one row: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:315`

## Automation Planning Packet

| Change | File | Expected Result |
| --- | --- | --- |
| Return checkout result from each Authorize surface runner | `tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.config.ts` and `.helpers.ts` | `surface.run(page, view)` returns `CheckoutResult` or invoice data instead of `void` |
| Capture result in the repro test | `tests/core/checkout/misc/Authorize/authorize-invalid-ots-repro.test.ts` | Test has `invoiceData.id`, `invoiceData.transaction_id`, and `ticket_items` after purchase |
| Add final-state helper | Prefer `.helpers.ts` or a shared transaction helper | Assert exactly one final paid transaction/order/ticket set after replay/double-submit stress |
| Use Dashboard transaction ID proof first | `TransactionPage.filterByTransactionId(transaction_id, invoice_id)` | Transaction list filters to exactly one row for the final transaction ID |
| Add API count only if Dashboard proof is insufficient | Financial invoice API filtered by `transaction_id` | One invoice/order exists for the replayed purchase payload |

## Recommended First Test

Use `diagnostic-replay-purchase` on one WebPublic guest surface first unless Stripe provider volume makes a Stripe equivalent the business-priority path. The test should directly replay the same `/purchase/` payload and prove one final paid outcome. Add other surfaces only if this first proof exposes a materially different risk.

## Assertions

- Payment state: one successful final purchase response and no second paid outcome from replay.
- Order state: exactly one invoice/order for `invoiceData.transaction_id`.
- Tickets: issued ticket count matches the purchased quantity; no duplicate ticket set.
- Confirmation / receipt: confirmation still matches the single invoice data.
- Transaction / payout: Dashboard transaction filter by `transaction_id` returns exactly one row.

## PROOF-CHK-002 Refinement

Use this as the first later-implementation shape:

- Start with `diagnostic-replay-purchase` on WebPublic guest only.
- Make the Authorize surface runner return `CheckoutResult` or `invoiceData`.
- Preserve replay response evidence from `state.purchaseReplays`.
- Carry `invoiceData.transaction_id`, `invoiceData.id`, expected quantity, expected total, and buyer identity.
- Prove uniqueness first with Dashboard `filterByTransactionId(transaction_id, invoice_id)`, which already expects one transaction actions row.
- Use venue invoice lookup by `transaction_id` and invoice-items filtered by `invoice__transaction_id` only when Dashboard proof needs item quantity/detail support.
- Do not expand to Widget, Box Office, throttled panic-click, or every replay variant until this first proof is stable.

## Risks

- The repro suite is gated by `RUN_AUTHORIZE_INVALID_OTS_REPRO=true`; keep this as a targeted critical-path repro, not a default broad matrix.
- Dashboard login/navigation may add runtime. If runtime is too high, use one API invoice-count assertion plus one Dashboard proof scenario.
- Later source code changes are outside this worker and should not block further planning.

### P0 - AUTO-CHK-001 - Failed Payment No Paid Order/Tickets/Inventory

**Score:** 94/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Failed Payment Is Not Proven To Avoid Paid Order, Issued Tickets, Or Inventory Consumption]]  
**Automation type:** E2E negative final-state assertion  
**Status:** Planning packet ready

## Why Automate

- Failed payment producing a paid order, usable ticket, or consumed inventory is direct money-movement and fulfillment risk.
- Existing failed Affirm coverage already drives a deterministic provider failure and verifies the buyer returns to payment with an error.
- Current coverage stops at UI failure state; it does not prove no paid invoice/order/tickets were created.

## Source Behavior

- Existing failed Affirm matrix: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:31`
- Failed Affirm WebPublic path: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events-affirm-failed.test.ts:68`
- Failed terminal step returns `void`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1244`
- Failure helper asserts purchase request and provider failure only: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`
- Failure page verifies error toast and payment step visibility: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/external/AffirmPaymentPage.ts:61`

## Representative Path

Use failed Affirm WebPublic guest first. It is the least ambiguous existing failed-payment harness. Stripe card decline or webhook failure can be added later if product wants a different representative path, but they should not block the first no-paid-outcome proof.

## Automation Planning Packet

| Change | File | Expected Result |
| --- | --- | --- |
| Return failure context from failed payment flow | `flows/checkout-journey.ts` and `PaymentStep.ts` | Test can identify buyer/email, basket or request context, and expected item quantity after failure |
| Use a unique buyer identity for the representative case | `single-events-affirm-failed.test.ts` or fixture data | Negative Dashboard/API search is not polluted by prior runs |
| Add no-paid-outcome assertion helper | Existing Dashboard/API helper area | Assert no paid invoice/order exists and no ticket set was issued for the failed attempt |
| Keep the current UI failure assertion | `AffirmPaymentPage.ts` | Buyer still sees failure toast and returns to payment step |

## Assertions

- Payment state: no paid invoice/order is created for the failed attempt.
- Tickets: no usable ticket items are issued.
- Inventory / seats: no permanent inventory or seat ownership is consumed by the failed attempt.
- UI recovery: failure toast appears and checkout remains on the payment step.

## PROOF-CHK-003 Refinement

Use this as the first later-implementation shape:

- Start with failed Affirm WebPublic guest only.
- Make `payWithAffirmExpectingFailure().result()` return a failure context instead of `void`.
- Carry unique buyer email, event id, ticket type id, `CartResult.itemId`, requested quantity, and expected total.
- Keep the existing failure toast and payment-step visibility assertions.
- Prove no paid outcome first with venue invoice lookup by exact buyer email.
- Prove no fulfillment with venue invoice-items filtered by `invoice__email`, `event`, and `ticket_type`.
- Use owner-scoped user ticket items only when the test has authenticated ownership or claim context.
- Do not add Stripe decline, webhook failure, Widget, assigned seating, or deeper inventory counter proof until this first no-paid proof is stable.

## Risks

- Negative assertions require unique buyer/basket context or tight API filters to avoid false positives from previous runs.
- If product wants Stripe card decline as the representative path, that is a separate fixture task; current evidence supports Affirm as the fastest first P0 proof.

### P0 - AUTO-CHK-003 - Dashboard Transaction Total Reconciliation

**Score:** 92/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Transaction Detail Total Reconciliation Is Weaker Than It Appears]]  
**Automation type:** E2E helper/assertion upgrade  
**Status:** Planning packet ready

## Why Automate

- Existing Box Office flows pass an expected transaction total into `verifyTransaction`, but inspected assertions do not verify that value on the Dashboard transaction detail.
- Backend financial invoice data and frontend transaction detail both expose stable post-payment money fields.
- This helper unlocks stronger assertions across existing checkout scenarios without adding many new tests.

## Source Behavior

- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:606`
- Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:226`
- Playwright: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts:210`
- Frontend row test ID source: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/BreakdownLineItem.web.tsx:48`
- Existing callers passing expected totals: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/single-discount-code.test.ts:417`

## Automation Planning Packet

| Change | File | Expected Result |
| --- | --- | --- |
| Add `pricingFeesTaxes` to `verifyTransactionDetails` input | `pages/dashboard/box-office/TransactionPage.ts` | The detail helper can read `valueOnTransactionPage` already passed by callers |
| Locate settlement row by test ID | Same file | Use `transactionRow.getByTestId("financial-breakdown-row-Settlement amount")` |
| Assert expected paid total | Same file | Row contains `pricingFeesTaxes.valueOnTransactionPage` |
| Keep transaction ID filtering | Same file | Continue using `filterByTransactionId(transactionId, transactionNumber)` where available |

## Recommended First Test

Use an existing Box Office discount scenario first, because it already passes `expectedTotalBO` into `verifyTransaction` and exercises a realistic money adjustment. This turns current data into a stronger assertion without adding a new scenario.

## Flow

| Step | Data | Expected Result |
| --- | --- | --- |
| Complete one checkout with fees/taxes/discount complexity | `priceDetails.expectedTotal` | Purchase succeeds and invoice data includes `transaction_id` |
| Open Dashboard transaction detail by transaction ID | `invoiceData.transaction_id` | Exactly one transaction row is shown |
| Assert Dashboard money value | `pricingFeesTaxes.valueOnTransactionPage` | `Settlement amount` / `amount_paid` matches checkout expected total |

## Assertions

- Transaction / payout: Dashboard transaction detail `Settlement amount` matches checkout expected total.
- Totals: add fees, taxes, and discount assertions where the scenario fixture creates those values.

## PROOF-CHK-004 Refinement

Use this as the first later-implementation shape:

- Treat this as a helper assertion upgrade, not a new checkout scenario.
- Add `pricingFeesTaxes` to the private `TransactionPage.verifyTransactionDetails` input.
- Locate `transactionRow.getByTestId("financial-breakdown-row-Settlement amount")`.
- Assert the row contains `pricingFeesTaxes.valueOnTransactionPage`.
- Keep existing customer, seller, phone, and transaction ID assertions unchanged.
- Use the settlement row because frontend source says it reads `amount_paid` / `amountPaid`; do not use header gross revenue.
- Exercise first through the existing Box Office discount caller, then let existing product, membership, hold, and Box Office journey callers inherit the stronger helper.

## Risks

- Header gross revenue and settlement amount intentionally read different fields; use `Settlement amount` / `amount_paid` for buyer paid-total reconciliation.
- Later source code changes are outside this worker and should not block further planning.

### P0 - AUTO-CHK-006 - Mixed Ticket Plus Checkout Add-On Reconciliation

**Score:** 91/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Mixed Ticket Plus Checkout Add-On Coverage Does Not Clearly Prove Both Fulfillment Lines]]  
**Automation type:** E2E assertion upgrade on existing product CheckoutAddOns path  
**Status:** Planning ready

## Why Automate

- This is a realistic buyer basket: event ticket plus product add-on.
- Backend treats tickets and products/add-ons as separate checkout lines that both create fulfillment records.
- Existing Playwright coverage exercises the path, but inspected confirmation verification only passes add-on product details into order verification.

## Source Behavior

- Backend basket scope: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:14`
- Backend purchase outcome split: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md:28`
- Backend purchase service item groups: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:111`
- Backend ticket/product item generation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/ticket_generator_service.py:91`
- Existing Playwright entry path: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:284`
- Existing add-on checkout call: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:405`
- Weak confirmation item list: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:434`
- Confirmation verifier checks supplied items: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`

## Recommended First Test

Do not add a new scenario. Upgrade the existing `CheckoutAddOns` branch so order confirmation receives both:
- base event ticket item details
- add-on product item details

## Assertions

- Order state: one paid order for the mixed basket.
- Tickets/products: confirmation/order detail includes the base event ticket and add-on product.
- Totals: final paid total matches ticket plus add-on pricing.
- Inventory: purchased quantity is correct for ticket and product lines where existing helpers expose it.

## PROOF-CHK-005 Refinement

Keep `AUTO-CHK-006` rank 4 and planning-ready. The first implementation should upgrade the existing `CheckoutAddOns` branch, not add another product checkout scenario.

Implementation handoff:
- Preserve base event ticket `ItemDetails` from `extractEventItemDetails(basketResponse)`.
- Build add-on product `ItemDetails` from `addOns`.
- Pass both lines to `verifyOrderConfirmationThroughCheckout`.
- Use `getVerificationTotal(productData, true)` for the combined paid total.
- Pass per-line `expectedBarcodeQuantity` only if ticket/product barcode counts differ.
- Add venue invoice-items API proof filtered by `invoice__transaction_id`, `event`, `ticket_type`, `product`, and `product_attribute` only if UI order detail cannot prove both fulfillment lines.

Evidence refs: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:284`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:311`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/products/checkout-products.test.ts:434`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/payment-helpers.ts:109`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:239`.

## Risks

- Current `itemDetails` construction in the product test may mix product display data with event item ids for the CheckoutAddOns branch.
- Confirmation coverage may need separate expected barcode quantities for ticket and product lines.

## Qase Mapping

Read-only Qase check on 2026-07-07 found partial related cases but no exact manual case proving one paid event-ticket plus checkout add-on order contains both fulfillment lines and final total.

| Result | Case IDs | Notes |
| --- | --- | --- |
| Partial related coverage | 360, 388, 466, 935, 4763, 4817 | Add-on modal/cart behavior, broad mixed-item attraction purchase, add-on product purchase, transaction item-type rows, and ticket/product refund selection exist. None is an exact substitute for the recommended automation. |

Detail file: `/private/tmp/qase-checkout-addon-case-details.json`.

### P0 - AUTO-CHK-007 - Checkout Tracking-Link Unavailable-Item Paid Outcome

**Score:** 89/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Checkout Tracking-Link Unavailable-Item Pruning Is Not Proven Through Paid Order Reconciliation]]  
**Automation type:** E2E assertion scenario on checkout tracking link  
**Status:** Planning ready / Proof refined

## Why Automate

- Checkout links can pre-populate baskets and append to existing buyer basket state.
- Frontend logic can reduce unavailable quantities and still allow checkout when valid items remain.
- Existing Playwright tracking-link coverage completes normal purchases, but inspected coverage does not prove the final paid order excludes unavailable quantities or reconciles the charged total after pruning.

## Source Behavior

- Frontend retry/pruning logic: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:73`
- Existing basket identity reuse: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:191`
- Unavailable items UI: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx:369`
- Existing Playwright checkout-link entry: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:687`
- Existing tracking-link purchase runner: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/web/checkout/tracking-links/checkout-tracking-links-runner.ts:102`
- Frontend unit coverage for basket reuse and unavailable items: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.test.tsx:319`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.test.tsx:448`
- Qase context: Qase 4802 in `/private/tmp/qase-checkout-tracking-link-case-details.json`

## Recommended Planning Shape

Use one checkout-link scenario with:
- existing basket identity
- partially unavailable configured extras
- valid remaining item
- card payment
- final confirmation/order detail check

## Handoff Checklist

| Area | Decision |
| --- | --- |
| Test scope | One checkout-link scenario; do not expand every tracking-link type |
| Entry path | Reuse `webPublicJourney(...).fromCheckoutLink(...)`, but inspect the review page before `ReviewCheckoutButton.clickCheckoutButton()` |
| Fixture setup | Existing basket identity plus checkout link with two configured extras where one can be unavailable |
| Quantity contract | Track requested quantity, unavailable/removed quantity, expected remaining quantity, expected item lines, and pruned expected total |
| Payment path | Card payment through existing tracking-link runner style |
| Confirmation proof | Verify final order/confirmation contains only remaining available items and expected total |
| Non-goal | do not test every customer state or inventory state in the first implementation |

## Proof Refinement

`PROOF-CHK-007`: assert the unavailable-items review state first, then complete payment and reconcile the final order against the pruned basket. Use `invoiceData.transaction_id` plus confirmation/My Orders item details first; add venue invoice-items API proof only if the UI cannot prove the unavailable line was excluded.

## Assertions

- Review page shows unavailable configured items before checkout continues.
- Basket before payment contains only available remaining items plus intended existing-basket items.
- Payment total matches the pruned basket.
- Confirmation/order detail excludes unavailable quantities.
- Buyer is not charged for unavailable quantities.
- Transaction/order identity remains tied to the same checkout attempt.

### P0 - AUTO-CHK-013 - Assigned Seating Payment Failure/Retry Preserves Seat Ownership

**Score:** 90/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Assigned Seating Failure/Retry Seat Ownership Needs Final-State Proof]]  
**Automation type:** E2E failed-payment branch plus API/Dashboard seat ownership assertion  
**Status:** Planning ready

## Why Automate

- Assigned seating combines payment correctness with scarce inventory ownership.
- Existing Playwright coverage buys assigned seats successfully, but inspected coverage does not prove failed payment avoids sold seats or paid tickets.
- This is a representative realistic path, not a permutation expansion: one seat, one failed payment, one retry, one final owner.

## Source Behavior

- Assigned seating usage model: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/assigned_seating_and_permissions.md:61`
- Basket hold/release model: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_baskets_checkout_state_and_inventory.md:68`
- Seat usage traceability: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_usage.py:14`
- Seat claimed/on-hold claimed distinction: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_permissions.py:431`
- Sold permission transition: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_permissions.py:448`
- Public seating payment types: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/[eventSlug]/seating/index.tsx:61`
- Assigned seating success flow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/events/assigned-seating-purchase-flows.ts:70`
- Generic failed-Affirm helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:386`
- User ticket item serializer exposes seat identity: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1219`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1296`
- User ticket item API uses the seat-aware serializer: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:807`
- Playwright assigned-seat basket capture helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/api-helpers.ts:221`
- My Orders verification helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts:78`

## Recommended First Test

Use one public assigned-seating event:
- select one manual or best-available seat
- fail payment through the existing Affirm failure path
- assert no paid invoice/order/ticket and no sold seat from the failed attempt
- retry once with a successful payment
- assert exactly one paid order owns the expected seat

## Assertions

- Payment state: failed attempt is unpaid; retry is the only paid result.
- Order state: no paid order after failure; one paid order after retry.
- Seats: failed attempt does not permanently sell the seat; retry owns exactly the expected seat.
- Confirmation/Dashboard: final order, transaction, buyer, total, and seat details agree.

## Fixture Contract

- Capture selected seat identity from the assigned-seating basket response with `captureSeatIdentifiers()` before payment.
- Failed attempt proof: assert no paid order or ticket item exists for the failed attempt, and the selected seat is not sold or owned by a paid ticket.
- Retry proof: after one successful retry, assert one paid transaction/order and the final ticket item or order contains the same selected seat identifiers.
- Preferred proof surface: API-first for seat identity, My Orders/confirmation for reviewer-readable order proof, Dashboard transaction filtering for one paid transaction identity.
- Avoid relying only on seating canvas color/state after payment.

## PROOF-CHK-006 Refinement

Keep `AUTO-CHK-013` rank 5 and planning-ready. The first implementation should use WebPublic best-available assigned seating because `clickBestAvailableCheckout` returns a basket response that `captureSeatIdentifiers()` can read.

Implementation handoff:
- Capture `identifier`, `location_identifier`, and `segment_identifier` before payment.
- Make the failed-Affirm branch return scoped failure context instead of `void`.
- Prove no paid invoice/order/ticket item owns that seat after the failed attempt.
- Retry once and prove exactly one paid order/ticket item owns the same seat identifiers.
- Do not start with manual seat selection unless manual `clickCheckout` exposes the same basket response.
- Use API ticket item seat data plus My Orders/Dashboard transaction identity; do not rely only on seating canvas state.

Evidence refs: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:706`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:734`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/assigned-seating/SeatingPage.ts:130`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/api-helpers.ts:221`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-journey.ts:1220`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1219`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1296`.

## Qase Mapping

Related manual coverage exists in Qase 217, 1190, and 1255, but no exact assigned-seat payment failure/retry ownership case was found in `/private/tmp/qase-checkout-money-cases-all.json`.

## Fixture-Design Candidates

### P0 - AUTO-CHK-008 - Package Revenue-Realization Reporting Reconciliation

**Score:** 84/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Package Revenue-Realization Reporting Reconciliation Needs Automation Proof]]  
**Automation type:** E2E purchase plus API-first reporting assertion  
**Status:** Planning packet ready; later source implementation is outside this worker

## Why Automate

- Package checkout already has broad purchase coverage, so this should not replace the current top recommendation.
- The uncovered risk is money reporting: child-based package revenue realization can intentionally diverge parent/child base fields from stat fields.
- A compact representative test would prove the package purchase not only succeeds, but also reports/pays out the realized child allocation correctly.

## Source Behavior

- Backend docs: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/package_revenue_realization.md:14`
- Backend allocation rule: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/package_revenue_realization.md:29`
- Backend financial flow: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/financial_flows.md:134`
- Backend purchase-time hook: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:1442`
- Backend allocation service: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/revenue_realization/ticket_item_group_allocation.py:14`
- Backend stat propagation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/revenue_realization/invoice_item_propagation/invoice_item_propagators.py:36`
- Existing Playwright: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages/package-purchase-flows.ts:109`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages/package-purchase-flows.ts:197`
- Existing Qase/manual: Qase 4229 and Qase 3879 are related but do not explicitly prove child revenue-realization stat allocation or reporting/payout reconciliation.

## Flow

| Step | Data | Expected Result |
| --- | --- | --- |
| Buy package | Custom or preset package with child revenue realization | Checkout succeeds and returns one paid transaction |
| Inspect package invoice items | Venue invoice-items API filtered by `invoiceData.id` | API returns reportable rows for the paid package invoice |
| Verify stat allocation | `final_amount_stat`, `amount_paid_stat`, `amount_earned_stat`, `tax_stat`, `is_sub_ticket` | Child stat fields reconcile to fixture expectations and package reporting totals |
| Verify Dashboard/API reporting | API stat rows plus Dashboard transaction detail | API proves child reporting allocation; Dashboard confirms transaction identity and paid total |

## Assertions

- Payment state: one paid package transaction.
- Order state: package parent and child items belong to the same checkout attempt.
- Totals: charged amount still matches checkout total.
- Reporting / payout: child stat allocation reconciles to fixture expectations and package reporting total.

## Handoff Notes

- Use the venue invoice-items API as the primary proof surface: `/api/venue/financials/invoices/items/?invoice={invoiceId}`.
- Assert exposed stat fields from `VenueBasedInvoiceItemSerializer`: `final_amount_stat`, `amount_paid_stat`, `amount_earned_stat`, `tax_stat`, and `is_sub_ticket`.
- Use Dashboard transaction detail as secondary identity/paid-total proof only.
- Do not assert exact `percent_allocation_applied_from_package` or `parent_ticket_invoice_item` through this API unless another source-backed helper/API exposes those fields.

## Next Planning Step

Planning packet is ready. Keep lower than duplicate/failure/reconciliation P0s unless incident or business signal raises package reporting risk.

## Qase Detail Check

- Detail file: `/private/tmp/qase-package-revenue-case-details.json`
- Qase 4229 checks parent/child itemized setting mismatch and balanced totals.
- Qase 3879 checks final amount accuracy in checkout, invoice, and processor dashboard for package types.
- Neither case explicitly proves child revenue-realization stat allocation or reporting/payout reconciliation after checkout.

### P1 - AUTO-CHK-010 - Guest Checkout Claim/Connect Preserves Paid Order Ownership

**Score:** 86/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P1 - Guest Checkout Claim/Connect Ownership Has Manual Coverage But No Exact Playwright Flow Found]]  
**Automation type:** E2E ownership assertion  
**Status:** Planning ready; Qase/manual coverage exists

## Why Automate

- Buyer identity mismatch can attach or expose a paid order to the wrong account, which is a P0 override category.
- Backend source shows claim and guest-merge paths can update invoice, basket, ticket, member, and email ownership.
- Qase has related manual coverage, so this is lower than duplicate charge, failed-payment, and total reconciliation packets.

## Representative Flow

1. Complete one low-value public or widget checkout as a guest with a unique email.
2. Open the post-purchase order/connect path.
3. Create or log in with the same email and confirm the order connects.
4. Verify the order appears in My Orders with the same transaction and total.
5. In a clean session, use a different account and assert the same order cannot be connected or viewed.

## Source Behavior

- Claim API: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/public/viewsets.py:11`
- Claim serializer: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/public/serializers.py:53`
- Guest merge service: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/services/venue_user_merge_service.py:104`
- Invoice/basket/ticket/member reassignment: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/services/venue_user_merge_service.py:276`
- Claim UI states: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/accounts/claim/ClaimForm.tsx:55`
- Playwright guest checkout helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/checkout-engine.ts:241`

## Existing Coverage

- Backend unit/API coverage exists for public claim and guest merge/adopt behavior.
- Playwright: `No coverage found in inspected files` for exact paid guest order claim/connect ownership automation.
- Qase/manual: Qase 2946 covers same-email connect and different-email rejection. Qase 2558, 4056, 4907, and 4966 are related.

## Data Contract

| Data | Source |
| --- | --- |
| `guestBuyerEmail` | unique generated buyer for guest checkout |
| `differentBuyerEmail` | second clean account/session |
| `invoiceData.transaction_id` | checkout journey result |
| `basket.uuid` / staging `uuid1` | confirmation/staging path |
| `expectedTotal` | event fixture or checkout result |
| expected item name and quantity | event fixture / purchased item details |

## Assertion Contract

- Guest staging order opens and shows `Connect account` before claim.
- Same-email login or signup can confirm connection.
- Authenticated My Orders page shows the same transaction id, expected total, and expected item quantity.
- Different-email account cannot connect the same guest order.
- Different-email account cannot view authenticated transaction detail, or receives a permission-safe redirect/error.
- Same-email account still owns the order after the rejection attempt.

## Ranking Decision

Keep below AUTO-CHK-002, AUTO-CHK-001, AUTO-CHK-003, AUTO-CHK-006, AUTO-CHK-007, AUTO-CHK-008, and AUTO-CHK-005 unless there is incident signal around guest order ownership.

### P1 - AUTO-CHK-019 - Resale Checkout Buyer Charge And Seller-Side Completion Reconciliation

**Score:** 86/100  
**Automation type:** E2E resale checkout final-state proof  
**Status:** Planning ready; Qase/manual coverage exists

## Why Automate

- Resale checkout combines buyer payment, transferred ticket ownership, seller refund/payout state, resale fees, inventory, gateway switching, and reporting.
- Backend tests prove the API path, and Qase/manual coverage is broad, but inspected Playwright coverage did not find exact resale checkout final-state automation.
- This is a realistic customer scenario without needing a permutation suite: one resale listing plus one resale purchase can prove a lot of money-movement risk.

## Representative Flow

1. Original buyer purchases eligible event tickets.
2. Original buyer lists those tickets for resale from My Orders or a source-backed resale API setup.
3. Second buyer purchases the resale ticket through public checkout.
4. Verify one paid buyer invoice/order and issued ticket set.
5. Verify seller-side resale submission completion/refund/payout state and Dashboard/API fee/total reconciliation.

## Source Behavior

- Backend resale purchase flow: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1206`
- Resale basket purchase and webhook completion: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1266`
- Paid basket and ticket item proof: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1274`
- Completed resale submission proof: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1282`
- Post-purchase resale finalization tasks: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:2723`
- Resale refund/completion task: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py:2881`
- Resale invoice-item snapshots for refund/payout/reporting: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py:2910`
- Completion status and original-ticket update: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/resale/refund_resale_submission.py:145`
- System-gateway switch for resale basket: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1932`
- Frontend My Orders resale API: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/repositories/UserBasedTicketResaleDetailRepository.ts:13`
- Frontend resale refund amount and submit action: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/data/services/resales/useResellTicketsAction.ts:35`
- Frontend resale modal submission: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/modals/resale/MyOrdersResellTicketsModalSelection.web.tsx:100`
- Dashboard resale fee type: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/internal-fees/application/config.ts:57`
- Dashboard reseller transaction filter: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/sidebar/TransactionsFilterSidebar.web.tsx:322`

## Existing Coverage

- Backend coverage is strong for resale basket purchase, completion, assigned-seat variants, inventory, gateway switching, and waitlist/resale automation.
- Playwright: `No coverage found in inspected files` for exact resale/resell/resold checkout purchase, buyer paid order, seller completion/refund state, or resale fee reconciliation.
- Qase/manual: related cases include 2878, 2974, 3515, 3521, 3537, 288, 918, 2975-2985, and 4257.

## Assertion Contract

- Original paid order can list selected tickets for resale.
- Resale checkout creates exactly one paid buyer invoice/order.
- Buyer My Orders shows the resold tickets under the second buyer.
- Original ticket items are marked resold or excluded from active total according to backend resale state.
- Resale submission reaches Completed or the source-backed refund-failed/payout state expected for the path.
- Dashboard/API transaction amount, resale fees, and invoice item fields reconcile to checkout total.
- Retry/refresh does not duplicate buyer charge or seller resale completion.

## Resume Criteria

Start with one GA public resale checkout. Add widget or assigned-seat resale only if the first fixture is stable and reviewers need platform or seat-specific risk proof.

### P1 - AUTO-CHK-020 - Checkout Upgrade Offer Replaces Item And Reconciles Upgraded Paid Outcome

**Score:** 82/100  
**Automation type:** WebPublic checkout E2E final-state proof  
**Status:** Planning ready; Qase/manual coverage exists

## Why Automate

- Upgrade offers can replace the item being purchased immediately before payment.
- The risk is not just UI display: the paid result must charge the upgraded total, issue the upgraded item only, avoid issuing the original base ticket, and reconcile inventory/capacity.
- Qase/manual coverage exists, so this stays lower P1 below duplicate-charge, failed-payment, total reconciliation, mixed-basket, assigned-seat failure, and unavailable-item gaps.

## Representative Flow

1. Add a base ticket with one eligible higher-priced upgrade option.
2. Click the checkout review upgrade offer.
3. Verify the basket now contains only the upgraded target item with `is_upgraded=true`.
4. Pay by card.
5. Verify one paid invoice/order/ticket set for the upgraded item, no original ticket issued, Dashboard/API total matches, and inventory reflects the replacement.

## Source Behavior

- Ticket type upgrade relationships: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:459`
- Sold-out upgrade filtering: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:488`
- Basket item group upgrade flag: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_items.py:382`
- User basket serializer exposes `is_upgraded`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:351`
- Public event list returns upgrades with `include_upgrade_options=true`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/serializers/test_ticket_type_upgrade_serializers.py:313`
- Frontend requests upgrade options for basket item data: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/basket/services/usePublicBasketItemData.ts:101`
- Upgrade option computes price delta/display metadata: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/domain/services/BasketUpgradesService.ts:217`
- Checkout review renders `UpgradeOffer`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/review/components/ReviewItemGroup/ReviewItemGroup.web.tsx:313`
- Upgrade action removes original item group and persists the upgraded group: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/services/useBasket.ts:1283`

## Existing Coverage

- Frontend unit coverage exists for upgrade offer display/click behavior.
- Playwright: `No coverage found in inspected files` for upgrade offer click, upgraded paid order, original item exclusion, total/inventory reconciliation, or issued upgraded ticket proof.
- Qase/manual: Qase 3743 covers `Core - Checkout - Upgrade Your Tickets`; Qase 4298 covers upgrade messaging visibility.

## Assertion Contract

- Base item shows one eligible upgrade offer.
- Upgrade replaces the original item group with the target item group.
- Replacement item group has `is_upgraded=true`.
- Checkout total updates by expected price delta plus related fees/taxes.
- Purchase creates exactly one paid invoice/order.
- Final order/ticket set contains the upgraded target item only.
- Dashboard/API transaction total matches the upgraded checkout total.
- Inventory/capacity reflects the upgraded target purchase and does not consume the original base item after replacement.

## Resume Criteria

Start with one WebPublic checkout review upgrade. Add cart-summary, hold-link, tracking-link, membership-upgrade, or responsive variants only if they prove a distinct money-movement risk.

### P1 - AUTO-CHK-014 - Waitlist Async Fulfillment Creates One Paid Order And Reconciled Revenue

**Score:** 85/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P1 - Waitlist Async Fulfillment Final Paid Outcome Is Not Proven In Playwright]]  
**Automation type:** E2E/API-assisted async fulfillment proof  
**Status:** Planning ready; Qase/manual coverage exists

## Why Automate

- Waitlist is a checkout entry path where money movement can happen later through inventory or resale fulfillment.
- Existing Playwright waitlist coverage proves join/Pending state, but inspected coverage does not prove the later fulfilled paid order, issued tickets, completed subscriber, and revenue stats.
- Backend and Qase coverage are strong, so this stays below higher duplicate-charge, failed-payment, and reconciliation gaps.

## Representative Flow

1. Join one CC-required waitlist as an authenticated buyer.
2. Verify the waitlist entry is Pending and no paid tickets are issued yet.
3. Trigger a safe inventory/resale fulfillment path.
4. Process provider-confirmed payment through a safe test hook or fixture.
5. Verify one paid invoice/order, issued ticket count, completed subscriber, and waitlist revenue stats.

## Source Behavior

- Waitlist uses basket/purchase flow and async fulfillment: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/waitlist_fulfillment_and_holds.md:36`
- CC-required waitlist validates setup intent: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:6007`
- Fulfillment purchase service locks basket/subscriber and validates before payment: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/waitlist/subscriber_processing/utils/subscriber_purchase.py:46`
- Off-session Stripe PaymentIntent is created from setup intent: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/waitlist/subscriber_processing/utils/subscriber_purchase.py:126`
- Backend full-flow revenue test: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket_waitlist_resale.py:1872`
- Existing Playwright waitlist entry flow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/waitlist/waitlist-single-event.test.ts:89`
- Existing Pending-only verification helper: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/user/account/waitlists/WaitlistsPage.ts:50`

## Existing Coverage

- Playwright: `No coverage found in inspected files` for fulfilled waitlist final paid order, issued ticket set, completed subscriber, or revenue-stat reconciliation.
- Qase/manual: Qase 2880, 2881, 2882, 2952, 2983, 4235, and 4804 are related and cover join, notification/hold-link purchase, failed auto-payment, resale auto-processing, purchase waitlisted item, and gateway-change edge cases.

## Assertion Contract

- Pending waitlist entry exists after join and no paid tickets are issued yet.
- Fulfillment creates exactly one paid invoice/order or one hold-link fallback according to gateway path.
- Issued ticket quantity equals requested waitlist quantity.
- Subscriber status becomes Completed for paid fulfillment or Hold for hold-link fallback.
- Dashboard/API transaction amount matches fulfilled basket total.
- Waitlist revenue stats include the fulfilled invoice once.

## Resume Criteria

Start only if a later implementation task has a safe fixture or test hook to advance a waitlisted basket from Pending to fulfilled without destructive setup or provider secrets.

### P1 - AUTO-CHK-011 - Stripe PaymentIntent Cancel/Webhook Recovery Creates No Paid Order And Remains Retry-Safe

**Score:** 88/100  
**Automation type:** E2E recovery proof if a safe provider/test hook exists  
**Status:** Planning ready; Qase/manual coverage exists

## Why Automate

- Async payment callback/webhook behavior is a P0 override class.
- Stripe can report a canceled PaymentIntent before local basket state catches up.
- The missing Playwright proof is end-to-end final state: failed/canceled/delayed attempt creates no paid order or tickets, and retry creates exactly one paid outcome.

## Source Behavior

- PaymentIntent endpoint: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:316`
- Canceled intent replacement rule: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:385`
- Stripe-reported cancellation before webhook catch-up: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/viewsets.py:402`
- PaymentIntent webhook attaches data and validates purchase amount consistency: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:4021`
- Backend canceled-intent replacement-once test: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:956`
- Backend Stripe-reported-canceled test: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:997`
- Backend OAuth refresh delay test: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:3304`
- Frontend upsert route: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/basket/data/repositories/UserBasedTicketBasketRepository/UserBasedTicketBasketRepository.ts:28`
- Payment redirect params: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/sdk/features/payment-redirect.ts:40`
- Playwright normal PaymentIntent success polling: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:415`

## Existing Coverage

- Playwright: `No coverage found in inspected files` for webhook failure, canceled PaymentIntent recovery, OAuth refresh lock, or one-click wallet cancel final no-paid-order proof. Inspected `showpass-playwright/tests`, `showpass-playwright/pages`, and `showpass-playwright/flows`.
- Qase/manual: Qase 4893 covers Stripe payment-intent webhook failure/cancellation states; Qase 4905 covers wallet cancel/failure retry; Qase 4910 covers OAuth refresh delay with no charge.

## Assertion Contract

- Failed, canceled, or delayed PaymentIntent attempt creates no paid invoice/order.
- Failed, canceled, or delayed PaymentIntent attempt issues no usable tickets.
- Basket remains retryable or on hold according to path.
- Retry creates exactly one paid invoice/order/ticket set.
- Final transaction amount and confirmation agree with the retry, not the failed/canceled attempt.

## Resume Criteria

Promote only if Playwright can safely simulate canceled PaymentIntent, webhook failure, or OAuth-delay recovery without provider secrets or destructive setup. Otherwise keep this as backend-unit plus manual-Qase-backed.

### P1 - AUTO-CHK-012 - One-Click Wallet Checkout Cancel/Failure/Retry Creates No Paid Order Until Final Success

**Score:** 87/100  
**Automation type:** E2E wallet provider/browser automation if strategy exists  
**Status:** Planning parked; needs wallet provider/browser strategy

## Why Automate

- One-click/express wallet checkout is a distinct public money-movement entry path.
- Wallet provider success can skip local card charging and finalizes from provider-confirmed state.
- The missing Playwright proof is final state after cancel, blocked address, payment failure, and retry.

## Source Behavior

- Wallet/webhook success marks Yuno webhook or Stripe wallet purchase: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:241`
- Purchase skips local charging for Stripe wallet intent or Yuno webhook purchase: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:424`
- Invoice copies Stripe wallet PaymentIntent id: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice.py:495`
- Invoice records Stripe wallet type: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice.py:2092`
- One-click checkout flag: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/constants/waffle-flags.ts:19`
- Express checkout visibility: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/payment/components/PaymentSection/components/ExpressCheckoutSection.web.tsx:45`
- Wallet flows clear stale shipping because wallet SDK captures shipping: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/PaymentManager.ts:753`
- Stripe wallet dispatch: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/gateways/StripePaymentGateway/StripePaymentGateway.ts:563`
- Yuno wallet purchase path: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/components/yuno/YunoWalletElement/YunoWalletElement.web.tsx:268`

## Existing Coverage

- Playwright: `No coverage found in inspected files` for one-click wallet purchase cancel/failure/retry final-state proof. Inspected `showpass-playwright/tests`, `showpass-playwright/pages`, and `showpass-playwright/flows`; hits found were wallet exposure analytics and post-purchase add-to-wallet, not express wallet checkout purchase.
- Qase/manual: Qase 4905 covers one-click wallet cancel, blocked address, payment failure, recoverable basket, no completed order, and retry success. Qase 652 covers Stripe PaymentIntent wallet purchase success with Apple Pay or Google Pay.

## Resume Criteria

Promote only if QA chooses a stable wallet-capable browser/device, provider sandbox, or mocked wallet/provider simulator for Playwright. Otherwise keep as manual-backed and parked.

### P1 - AUTO-CHK-017 - Credit-Applied Checkout Remaining Balance Reconciles To Charged Amount

**Score:** 85/100  
**Automation type:** E2E checkout plus Dashboard/API reconciliation  
**Status:** Planning ready; Qase/manual coverage exists

## Why Automate

- Partial credits change the amount charged while preserving invoice earned/paid accounting.
- Existing Playwright credit coverage proves zero-cost ticket-credit flows and exchange-credit UI, but inspected coverage does not prove a partial credit plus remaining card charge.
- This is one representative scenario, not every credit family.

## Source Behavior

- Backend user-credit test applies `credit_applied` and asserts invoice `final_amount`, `credit_applied`, earned/paid values, and no-credit comparison: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:100`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:128`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:138`
- Backend exchange-credit tests cover remaining-balance and zero-total behavior: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:180` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_credits_user_based.py:261`
- Calculator validates and allocates credits to item groups: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:468`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:527`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:540`
- Purchase service validates and charges invoice-applied credit: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:589`
- Mixed fee-calculation baskets reject credits: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/mixed_fee_item_group_validation_service.py:64`
- Public checkout summary reads and displays applied credit: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutSummary/CheckoutSummary.web.tsx:402` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/CheckoutSummary/CheckoutSummary.web.tsx:450`
- Dashboard transaction detail maps and labels `credit_applied`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:77`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx:129`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/HeaderSummaryBlock.web.tsx:254`

## Existing Coverage

- Playwright covers ticket-credit earn/spend and zero-cost credit checkout: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/ticket-credits/ticket-credits.test.ts:99` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/ticket-credits/ticket-credits.test.ts:222`
- Playwright has user-credit and exchange-credit UI helpers: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/steps/PaymentStep.ts:327` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/ExchangeCredit.ts:32`
- Playwright: `No coverage found in inspected files` for partial credit plus remaining card charge plus Dashboard/API `Credit applied` reconciliation.
- Qase/manual: related cases include 3336, 3337, 3338, 3890, 2532, and 4941.

## Assertion Contract

- Credit applies to an eligible authenticated buyer basket.
- Basket total before credit minus `credit_applied` equals remaining card charge.
- Purchase creates exactly one paid invoice/order.
- Invoice and Dashboard/API show the same `credit_applied` and charged amount.
- Buyer credit balance is reduced once and cannot be reused beyond the remaining value.

## Resume Criteria

Keep below stronger P0 gaps because manual/Qase coverage and zero-cost automation exist. Promote if incidents involve partial credits, duplicated credit consumption, settlement mismatch, or Dashboard credit rows.

### P1 - AUTO-CHK-016 - Payment-Plan Checkout Installment Totals Reconcile To Dashboard/API State

**Score:** 84/100  
**Automation type:** E2E checkout plus Dashboard/API reconciliation  
**Status:** Planning ready; backend coverage exists

## Why Automate

- Payment-plan checkout charges a first installment, creates later recurring invoices, and delays ticket redeemability until final payment.
- Dashboard financial breakdown has dedicated payment-plan fee handling, so a UI-only checkout success assertion is not enough.
- Backend tests cover core calculations and lifecycle, but inspected Playwright coverage did not find an exact payment-plan checkout plus reconciliation proof.

## Source Behavior

- Checkout includes the first payment-plan charge while later recurring charges are separate: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:562`
- Payment-plan groups compute installment count and `payment_plan_total_fees`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:573` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/calculator.py:587`
- Basket validation requires one payment plan and rejects discounts with payment-plan items: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:2096` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py:4394`
- Payment-plan ticket items remain pending/not redeemable until final payment: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/ticket_generator_service.py:115`
- Backend tests assert recurring total, initial invoice final amount, `payment_plan_total_fees`, recurring invoice creation, final release, one-plan-per-basket rejection, and discount rejection: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:619`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:639`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:644`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:654`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:704`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:786`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_ticket_basket.py:1212`
- Venue and user invoice serializers expose payment-plan state: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:607`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py:657`, and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:257`
- Frontend disables Affirm for payment-plan ticket types and Dashboard maps/renders payment-plan fees: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/tickets/components/TicketTypesContainer/TicketTypesContainer.web.tsx:505`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:88`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:81`

## Existing Coverage

- Playwright: `No coverage found in inspected files` for payment-plan checkout, initial installment invoice reconciliation, recurring invoice/final release proof, or Dashboard payment-plan fee assertion. Inspected `showpass-playwright/tests`, `showpass-playwright/pages`, `showpass-playwright/flows`, and broader repo terms; hits were generated constants and architecture notes.
- Qase/manual: Qase 4759 and 4818 are related, but no exact payment-plan checkout E2E proof was found in the local export.

## Assertion Contract

- Initial checkout creates exactly one paid initial invoice.
- Initial invoice `final_amount` matches first installment plus expected payment-plan fees.
- User/API invoice has `has_payment_plan=true`.
- Dashboard transaction detail renders `Payment plan fees` and net service fees consistently.
- Ticket items remain payment-pending/not redeemable before final installment.
- Final release is asserted only if a safe non-destructive recurring-payment trigger exists.

## Resume Criteria

Keep below stronger P0 gaps because backend coverage is strong. Promote if incidents occur around installment totals, early redemption, payment-plan fee reporting, or Dashboard/API reconciliation.

### P1 - AUTO-CHK-018 - Configured Rate-Card Fee And Tax-On-Fee Checkout Reconciles Charged Amount And Dashboard Fee Rows

**Score:** 84/100  
**Automation type:** E2E checkout plus Dashboard/API reconciliation  
**Status:** Planning ready; Qase/manual coverage exists

## Why Automate

- Real checkout totals can include internal Showpass fees, organizer/custom fees, and tax-on-fee values.
- Existing Playwright helpers verify generic service-fee totals, but inspected coverage did not prove configured fee row names, tax-on-fee rows, and API/Dashboard settlement agree for the same transaction.
- Qase/manual coverage is broad, so this stays lower P1 below duplicate charge, failed payment, mixed basket, and seat-ownership risks.

## Source Behavior

- Fee service returns matched internal fee, custom fee, and tax totals: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/fees_json_service.py:120`
- Custom fee parsing extracts `taxes_applied_to_fee`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/fees_json_service.py:295`
- Backend custom-fee API test asserts service fees, taxes, `Fee Tax - Service Fees`, and fee-tax types: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_custom_fees.py:293` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_custom_fees.py:336`
- Itemization splits `taxes_applied_to_fee` when invoice items are split: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/itemization_services.py:121`
- Purchase service asserts basket service fees match invoice service charges before charging: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:379`
- Dashboard maps configured fee data and renders configured fee/tax rows: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/toTransaction.ts:85`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/fee-breakdown-rules.ts:120`, and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/variants/SaleStyleBreakdown.web.tsx:47`

## Existing Coverage

- Playwright verifies generic checkout `Service Fees` and Box Office `expectedFeeAndTaxes`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/components/Checkout/Review.ts:365` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/helpers/payment-helper.ts:187`
- Playwright: `No coverage found in inspected files` for explicit configured rate-card, organizer fee, or tax-on-fee checkout proof. Inspected `showpass-playwright/tests`, `showpass-playwright/pages`, `showpass-playwright/flows`, and repo-wide rate-card/fee/tax-on-fee terms; hits were generic service-fee assertions and generated enum constants.
- Qase/manual: related cases include 3142, 3156, 3168, 3169, 3493, 3876, 3883, and 3889.

## Assertion Contract

- Checkout review total equals subtotal plus configured fees/taxes.
- Purchase creates exactly one paid invoice/order.
- Invoice service charges and tax fields match expected configured-fee math.
- Dashboard renders expected configured fee row names and tax-on-fee rows.
- Dashboard Settlement amount equals charged amount.
- API and Dashboard agree on final amount, service charges, organizer/custom fees, and tax-on-fee totals.

## Resume Criteria

Keep as one representative configured-fee test, not a rate-card permutation suite. Promote if incidents occur around fee pass-through, tax-on-fee display, configured fee settlement, or Dashboard/API fee row disagreement.

### P1 - AUTO-CHK-015 - Refund-Protection Upsell Checkout Creates Linked Protection-Only Invoice

**Score:** 83/100  
**Automation type:** E2E post-purchase checkout assertion  
**Status:** Planning ready; backend coverage exists

## Why Automate

- Refund-protection upsell is a separate post-purchase checkout entry path that can move money after the original ticket order.
- The buyer reaches a tokenized upsell URL from an email or order-detail CTA, creates a protection-only basket, pays, and expects the original order to become protected.
- Inspected Playwright coverage did not find the end-to-end token checkout, linked source/upsell invoice proof, or no-duplicate-ticket-artifact proof.

## Source Behavior

- Public upsell details API: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/api/public/viewsets.py:655`
- Public upsell create-basket API: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/api/public/viewsets.py:675`
- Upsell record links source basket, upsell basket, source invoice, upsell invoice, token, and purchase source: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/models/basket_protection.py:343`
- Purchase serializer accepts and validates `refund_protection_upsell_purchase_source`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py:1016`
- Purchased upsell baskets trigger sold conversion: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/signal_handlers.py:99`
- `mark_upsell_sold` stores the upsell invoice and transitions the record to SOLD: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tasks/protection_tasks.py:417`
- User invoice serializers expose `source_transaction_id`, `protection_upsell_invoice`, and `protection_upsell_cta`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:238`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:483`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/user_based/serializers.py:490`
- Frontend route: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/constants/public-routes.ts:54`
- Frontend upsell checkout hook: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/hooks/useRefundProtectionUpsellCheckout.ts:53`
- Frontend purchase options include `refund_protection_upsell_purchase_source`: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/ui/components/RefundProtectionUpsellCheckoutContent.web.tsx:241`
- Frontend upsell checkout calls payment manager purchase: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/protection-upsell/ui/components/RefundProtectionUpsellCheckoutContent.web.tsx:269`
- Confirmation treats `source_transaction_id` invoices as protection upsell purchases with no ticket/wallet/SMS artifacts: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/hooks/useCheckoutConfirmation.tsx:206`

## Existing Coverage

- Backend tests cover creating the upsell basket, marking the upsell record SOLD, public create-basket response, and purchase-source persistence: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:736`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1047`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1551`, `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/tests/test_refund_protection_upsell.py:1720`
- Playwright: `No coverage found in inspected files` for refund-protection upsell token checkout, create-basket, purchase, `source_transaction_id`, or linked invoice proof.
- Qase/manual: no exact refund-protection upsell purchase case found in local read-only Qase export using upsell/source-transaction/protection-only search terms.

## Assertion Contract

- Original ticket order is paid and initially unprotected.
- Eligible order exposes a `protection_upsell_cta` token or equivalent source-backed token.
- Upsell link creates or fetches one protection-only basket.
- Upsell purchase creates exactly one paid upsell invoice.
- Upsell invoice `source_transaction_id` matches the original transaction.
- Confirmation does not create duplicate tickets, wallet passes, or SMS artifacts.
- Original order now exposes protection and the upsell invoice relationship.

## Resume Criteria

Keep below the current P0/P1 charging and final-state gaps unless there is incident signal around post-purchase protection charging, duplicate protection purchases, source/upsell invoice mismatch, or missing protection on the original order.

### P1 - AUTO-CHK-009 - Square Terminal Async Completion Finalizes One Paid Box Office Order

**Score:** 82/100  
**Automation type:** E2E or mocked-provider automation, if hardware/provider strategy exists  
**Status:** Planning parked; needs hardware/provider simulator strategy

## Why Park

- Square Terminal checkout is a real async money-movement path: Square webhook or terminal polling can finalize a paid Box Office basket.
- Manual/Qase coverage exists for the real terminal flow, including cancel/retry/success.
- Inspected Playwright coverage did not find an exact Square Terminal purchase test; `rg` found only generated enum constants.
- Playwright automation should not be promoted until QA/product chooses real terminal hardware, provider simulator, or mocked webhook strategy.

## Source Behavior

- Backend system doc: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/square_terminal_box_office.md:32`
- Async completion rule: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/square_terminal_box_office.md:55`
- Webhook routing: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/services/square/webhook_handlers/factory.py:7`
- Webhook basket lock/idempotency: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/services/square/webhook_handlers/checkout/checkout_updated.py:59`
- Completed webhook purchase: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/services/square/webhook_handlers/checkout/checkout_updated.py:78`
- Terminal purchase service path: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:1082`
- Completed payment validation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:1175`

## Existing Coverage

- Playwright: `No coverage found in inspected files` for exact Square Terminal purchase; inspected `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`, and the only exact Square Terminal hit was `shared/constants/enums/index.ts`.
- Qase/manual: Qase 2574 covers Square Terminal checkout amount, cancel/retry, and success. Qase 2653, 4097, and 4914 cover related source-platform, payment switching, and settlement/exchange paths.

## Resume Criteria

Promote only if one of these becomes available:

- a stable mocked terminal/webhook provider path that can finalize a basket without real hardware
- a controlled hardware-backed Playwright environment
- a product/QA decision that manual Qase coverage is no longer sufficient for Square Terminal checkout

### P1 - AUTO-CHK-005 - Membership Event-Batch Hold-Link Checkout Reconciliation

**Score:** 90/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P1 - Membership Event-Batch Hold-Link Checkout Lacks Reusable Playwright Fixture Coverage]]  
**Automation type:** E2E fixture + checkout assertion  
**Status:** Fixture plan tightened; implementation is out of scope for this worker

## Why Automate

- This path combines unpaid member tickets, hold-link expiry, member pricing, public checkout, and inventory/seat ownership.
- Existing Playwright coverage found regular hold checkout and membership purchases, but not the combined membership event-batch hold-link purchase.

## Source Behavior

- Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-batches-form/DeliveryMethod.web.tsx:122`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/batch_ticket_generator_factory.py:17`
- Backend API route: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/routers.py:244`
- Backend generate action: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/venue_based/viewsets.py:740`
- Backend purchase proof: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/tests/membership_event_batch_tests/test_membership_event_batch_generation.py:787`
- Backend level-price proof: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/tests/membership_event_batch_tests/test_membership_event_batch_generation.py:849`
- User member lookup route: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/routers.py:90`
- User member serializer exposes `id` and membership context: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/serializers.py:139`
- User member filters include membership level/group: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/filters.py:21`
- User hold-link retrieval route: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/routers.py:96`
- User hold-link serializer: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/user_based/serializers.py:390`
- Playwright: `No coverage found in inspected files` for membership event-batch hold-link checkout.

## Fixture Spike

1. Create a HOLD membership event batch with known member price through `/api/venue/memberships/membership-event-batches/`.
2. Trigger `POST /api/venue/memberships/membership-event-batches/{id}/generate/`.
3. Identify the generated member ID through `/api/user/memberships/members/` using the buyer session and known membership level/group filters.
4. Retrieve generated hold-link data through `/api/user/memberships/membership-benefit-issue-tickets/?member={memberId}`.
5. Read `member_ticket_batches[].hold_link` from the response, then normalize it using the existing regular hold helper.
6. Reuse regular hold checkout navigation and payment helpers for the public purchase.
7. Assert paid amount, ticket/member entitlement, Dashboard transaction, and inventory/seat ownership.

## Remaining Fixture Question

The blocker is not whether a hold link exists; backend source proves it. The remaining verification is whether static Playwright membership data can identify the intended newly purchased member without stale-member collisions. Prefer unique buyer/member setup if the user member API can return prior members for the same account.

## Flow

| Step | Data | Expected Result |
| --- | --- | --- |
| Create or locate membership event-batch hold link | Member, membership level, hold price, expiry | Public hold checkout can be opened |
| Complete public hold checkout | Card payment, known expected total | Invoice is paid for exactly the hold-link amount |
| Verify entitlement and inventory | Ticket/member entitlement, seat or inventory state | Tickets are issued and held inventory/seat ownership moves correctly |

## Assertions

- Payment state: one paid invoice for the hold-link checkout.
- Totals: charged amount matches member hold-link price.
- Inventory / seats: held inventory or seats resolve to purchased ownership.
- Confirmation / receipt: confirmation shows the member ticket(s) purchased through the hold link.

## Risks

- Fixture setup may require backend/API seeding instead of UI setup.
- Business priority needs confirmation before promoting above ready P0 implementation work.
