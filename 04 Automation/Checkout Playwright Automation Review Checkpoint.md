# Checkout Playwright Automation Review Checkpoint

Related notes:
- [[02 Feature QA/Checkout Automation Mission Control]]
- [[02 Feature QA/Checkout Automation Worker State.json]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]
- [[04 Automation/Checkout Automation Phase 2 Planning]]
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]

Status: awaiting reviewer check  
Checkpoint: `REVIEW-CHK-001`  
Created: 2026-07-13
Mode: planning recommendation only; no Playwright tests are being written by this worker
Latest ranking check: `RANK-CHK-002`
Latest duplicate-outcome proof check: `DUP-CHK-003`
Latest provider handoff check: `STRIPE-CHK-001`
Latest failed-payment check: `FAILED-CHK-002`
Latest Dashboard settlement check: `DASH-CHK-002`
Latest mixed-basket check: `MIXED-CHK-002`
Latest assigned-seat check: `SEAT-CHK-002`
Latest checkout-link check: `TRACK-CHK-002`
Latest package reporting check: `PACKAGE-CHK-001`
Latest readiness audit: `READY-CHK-001`
Latest leverage check: `LEVERAGE-CHK-001`
Latest handoff clarity audit: `HANDOFF-AUDIT-CHK-001`
Latest reviewer gate sync: `DECISION-QUEUE-SYNC-CHK-003`
Latest P0 saturation audit: `P0-SATURATION-CHK-001`
Latest prompt sync: `PROMPT-SYNC-CHK-001`
Latest artifact sync: `ARTIFACT-SYNC-CHK-001`

## Review Goal

Use this checkpoint to decide whether the current high-value Playwright automation list is right before the worker keeps refining lower-ranked details.

The goal is not to create every checkout permutation. The goal is to pick the smallest set of Playwright tests that catches the highest-risk checkout money-movement failures.

Read each row as "what to automate next," not as an active implementation task. Implementation should happen later in a separate Playwright task after the shortlist is approved or revised.

## What Good Means

A candidate is good for this list when it:

- protects money movement, paid/unpaid state, fulfillment, inventory/seat ownership, reporting, or async final state
- has one representative Playwright proof, not a broad matrix
- has source-backed behavior and a clear missing assertion
- can fail in a way that would matter to customers, organizers, support, finance, or reporting users
- has acceptance criteria that say exactly what must be true after checkout

## Recommended Playwright Shortlist

| Rank | ID | Area To Automate Next | Why It Is High Value | First Playwright Proof | Reviewer Verdict |
| ---: | --- | --- | --- | --- | --- |
| 1 | `AUTO-CHK-002` | Duplicate submit/retry creates one paid outcome | Prevents duplicate charge, duplicate order, duplicate confirmation, and duplicate tickets after retry/replay | Use the existing Authorize.net `diagnostic-replay-purchase` WebPublic guest path. Preserve replay evidence, return `invoiceData.transaction_id`, filter Dashboard by that transaction id, and verify confirmation/My Orders shows exactly one expected ticket set. If Stripe volume should drive the first proof, build the same capture/replay proof on WebPublic Stripe first. | [ ] Keep [ ] Revise [ ] Defer |
| 2 | `AUTO-CHK-001` | Failed payment creates no paid order, tickets, or inventory ownership | Prevents unpaid fulfillment after a failed payment | Start with failed Affirm WebPublic guest. Make `payWithAffirmExpectingFailure().result()` return a failed-checkout context with buyer email, event id, ticket type id, cart item id, quantity, and expected total. Keep the failure toast/payment-step assertion, then prove no paid invoice/order and no invoice-items/tickets exist for that failed attempt. Stripe decline/failure is a later provider-priority variant unless explicitly promoted. | [ ] Keep [ ] Revise [ ] Defer |
| 3 | `AUTO-CHK-003` | Dashboard transaction total reconciliation | Strengthens many checkout tests by proving Dashboard settlement total matches checkout's expected paid total | Upgrade `TransactionPage.verifyTransactionDetails` to assert `financial-breakdown-row-Settlement amount` against `pricingFeesTaxes.valueOnTransactionPage`, then prove it through an existing Box Office discounted checkout caller. Do not create a new checkout scenario first. | [ ] Keep [ ] Revise [ ] Defer |
| 4 | `AUTO-CHK-006` | Mixed ticket plus checkout add-on reconciliation | Covers a realistic basket where paid fulfillment can miss either the ticket or add-on line | Keep the existing WebPublic `CheckoutAddOns` flow. Capture the base ticket expectation from the basket response plus event ticket fixture fields, build add-on product details, pass both expected lines into order confirmation verification, and assert the existing combined total. Use venue invoice-items only if UI order detail cannot prove both lines. | [ ] Keep [ ] Revise [ ] Defer |
| 5 | `AUTO-CHK-013` | Assigned seating payment failure/retry preserves seat ownership | Protects scarce seat ownership across failed payment and retry | Use WebPublic best-available assigned seating. Capture serialized seat identifiers from the basket response, fail Affirm, prove no paid order/ticket owns that seat, retry once, and prove exactly one paid ticket owns the same identifiers. Do not use canvas color as the primary proof. | [ ] Keep [ ] Revise [ ] Defer |
| 6 | `AUTO-CHK-007` | Checkout link unavailable-item pruning before paid order | Prevents charging or fulfilling items that became unavailable before payment | Open checkout link and pause before the review checkout button. Assert unavailable items are visible, carry pruned expected lines and total, pay only valid remaining items, then prove final order excludes unavailable quantities and matches the pruned total. | [ ] Keep [ ] Revise [ ] Defer |
| 7 | `AUTO-CHK-008` | Package revenue-realization reporting reconciliation | Real reporting/payout risk, but backend covers allocation math and it is less direct than the first six checkout failures | Only automate now if package reporting is a current priority: complete one package checkout with known allocation expectations, then assert child/sub-ticket `*_stat` rows reconcile to package reporting totals | [ ] Keep [ ] Revise [ ] Defer |

## Reviewer Decisions

| Decision | Default If No Answer | Why It Matters |
| --- | --- | --- |
| Should `AUTO-CHK-002` start with the existing Authorize.net replay harness or should Stripe volume promote a Stripe duplicate-submit proof first? | Use the existing Authorize.net replay harness because it is the fastest ready duplicate-submit proof; `DUP-CHK-003` confirmed it can compose replay evidence, `invoiceData.transaction_id`, Dashboard transaction-id filtering, and confirmation/My Orders item proof | Provider volume can change business priority, but Stripe promotion needs both volume/business input and a safe deterministic replay/retry design |
| Should `AUTO-CHK-001` start with failed Affirm or Stripe decline/failure? | Use failed Affirm WebPublic guest because it is the inspected deterministic failed-payment Playwright path; `FAILED-CHK-002` makes the first proof explicit: return failed-checkout context, then assert no paid invoice/order and no invoice-items/tickets for the failed buyer/event/ticket context | Provider priority can choose Stripe later, but the first no-paid-outcome proof should not wait for a new Stripe failure harness |
| Should `AUTO-CHK-003` be a new checkout scenario or a shared assertion upgrade? | Treat it as a shared Dashboard assertion upgrade; `DASH-CHK-001` found existing callers already pass expected totals and Dashboard exposes a stable Settlement amount row | One helper assertion can strengthen multiple existing checkout tests without adding scenario bloat |
| Should `AUTO-CHK-006` become a product/add-on/membership matrix? | No. `MIXED-CHK-002` synced this as one existing CheckoutAddOns verification upgrade: base ticket line, add-on product line, combined paid total | The value is proving mixed-basket final state, not adding permutations |
| Should `AUTO-CHK-013` become a seating-platform/payment-failure matrix? | No. `SEAT-CHK-002` synced this as one WebPublic best-available assigned-seat failure/retry proof using serialized seat identifiers | The value is proving failed payment does not create paid seat ownership and retry creates exactly one paid owner, not testing every seating surface first |
| Should `AUTO-CHK-007` become a checkout-link matrix? | No. `TRACK-CHK-002` synced this as one deterministic partial-unavailability proof from review page to paid order | The value is proving unavailable items are not charged or fulfilled, not testing every checkout-link configuration first |
| Should `AUTO-CHK-008` stay in the immediate Playwright shortlist? | Defer behind ranks 1-6 unless package reporting/payout confidence is a current priority | `PACKAGE-CHK-001` found source-backed reporting risk and no inspected Playwright stat-allocation assertion, but backend tests already cover the allocation math and the risk is less direct than duplicate charge, failed payment, and fulfillment failures |
| Are the first six candidates enough for the next automation batch? | Treat the first six as the strongest next Playwright batch | They cover duplicate charge, failed payment, total reconciliation, mixed fulfillment, seat ownership, and unavailable inventory |

## My Current Recommendation

Approve ranks 1-6 as the next high-value Playwright automation areas.

`READY-CHK-001` confirms ranks 1-6 are structurally ready in Worker State: each has a proof contract, QA handoff fields, and acceptance criteria. The next step is reviewer approval or revision, not broad exploration.

`HANDOFF-AUDIT-CHK-001` confirms the top-six rows already have reviewer-readable automation targets, first actions, decisions/defaults, acceptance criteria, first-test guidance, not-a-matrix guidance, and proof contracts. Do not repeat the handoff audit unless candidate content changes.

`LEVERAGE-CHK-001` says the future implementation should not be six disconnected tests. Start with shared `CheckoutResult` / `invoiceData.transaction_id` and final-state proof helpers, then add failed-payment context and the narrow entry adapters for checkout links, add-ons, and assigned seating.

`RANK-CHK-002` confirms the shortlist is stable after the assigned-seat refinement: `AUTO-CHK-002` remains first, ranks 1-6 remain the next recommended batch, and `AUTO-CHK-008` stays review-separately unless package reporting/payout confidence is a current priority.

`DUP-CHK-003` tightens rank 1. `AUTO-CHK-002` should not just replay a request; it should prove the duplicate attempt happened and then prove exactly one paid outcome by transaction id and order/ticket detail.

Review rank 7 separately. Default to deferring `AUTO-CHK-008` behind the first six. Keep it in the immediate batch only if package revenue reporting or payout reconciliation is a current business concern.

`STRIPE-CHK-001` does not change rank 1. It clarifies that `AUTO-CHK-002` is first because duplicate-submit final state is the highest-value proof and the Authorize replay harness is ready. It is not saying Authorize.net is more important than Stripe. If Stripe provider volume is the deciding business input, promote a Stripe duplicate-submit proof first.

`FAILED-CHK-002` does not change rank 2. It makes `AUTO-CHK-001` implementation-ready for a QA handoff: failed Affirm WebPublic guest should return failed-checkout context, keep the existing failure UI proof, then assert no paid venue invoice/order and no invoice-items/tickets for the failed buyer/event/ticket context. Stripe decline/failure can be added later if provider priority requires it.

`DASH-CHK-002` does not change rank 3. It confirms `AUTO-CHK-003` is a helper/assertion upgrade: assert the Dashboard `financial-breakdown-row-Settlement amount` row using expected totals that existing Box Office checkout callers already pass.

`MIXED-CHK-002` does not change rank 4. It syncs `AUTO-CHK-006` into the proof-contract shape: the existing CheckoutAddOns path should prove the base event ticket line, the product add-on line, and the combined paid total for the same order. This is still not a product/add-on/membership matrix.

`SEAT-CHK-002` does not change rank 5. It syncs `AUTO-CHK-013` into the proof-contract shape: capture serialized seat identifiers before payment, fail Affirm, prove no paid owner, retry once, and prove exactly one paid ticket owns the same identifiers. Canvas state is supporting context only, not the primary proof.

`TRACK-CHK-002` does not change rank 6. It syncs `AUTO-CHK-007` into the proof-contract shape: pause on checkout-link review, assert unavailable items, carry pruned expected lines and total, pay only remaining items, and prove the final paid order excludes unavailable quantities.

`PACKAGE-CHK-001` does not change the next-batch recommendation. It confirms `AUTO-CHK-008` is real coverage, but optional for the immediate batch unless package reporting/payout confidence is the priority.

`P0-SATURATION-CHK-001` does not change the next-batch recommendation. It confirms ranks 1-6 have the required reviewer handoff fields and proof contracts, and `AUTO-CHK-008` now has a proof contract if package reporting is explicitly promoted.

`PROMPT-SYNC-CHK-001` and `ARTIFACT-SYNC-CHK-001` do not change the next-batch recommendation. They keep fresh sessions from repeating completed P0 saturation, handoff, ranking, assertion-contract, CSV, or broad exploration audits unless reviewer feedback or candidate content changes.

## Not Asking For

- Do not implement these tests inside the planning worker.
- Do not create every platform, payment type, customer state, or package permutation.
- Do not write Qase updates from this checkpoint.
- Do not treat lower P1/P2 backlog items as rejected; they are just not the next highest-value Playwright batch.

## Review Outcome

- [ ] Approved as current Playwright next list
- [ ] Revise ranking
- [ ] Promote Stripe duplicate-submit/retry proof
- [ ] Defer package revenue-realization proof
- [ ] Add missing high-value checkout risk

Reviewer notes:
