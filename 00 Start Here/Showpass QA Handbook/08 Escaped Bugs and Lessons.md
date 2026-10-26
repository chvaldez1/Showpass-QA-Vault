---
title: Escaped Bugs and Lessons
date: 2026-10-07
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Escaped Bugs and Lessons

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Convert escaped bugs into prevention

1. Preserve the reported configuration, client/build, record references, business harm, and uncertainty. Do not reduce the incident to its title.
2. Reproduce through the affected layer with owned data. Determine the first wrong business result, not just the final error.
3. Trace why prior tests missed it: absent configuration, wrong actor/client, shallow assertion, only new data, missing async result, unavailable hardware, or flaky/quarantined coverage.
4. Add the smallest regression that fails for the original harm. Pair backend protection with a realistic user journey where each catches a different failure.
5. Challenge nearby configurations: quantity >1, absorbed/zero-priced children, old/new data, least permissions, retry/resume, other clients sharing the rule.
6. Add operational detection where a test cannot ensure every real recipient/payment completes. Name the reconciliation signal and owner.
7. Close prevention only with fix evidence, relevant regression execution, configuration/deployment evidence when in scope, and remaining risks explicitly recorded.

### Lessons that must survive the next release

- **SPD-2761:** fee QA must pass beyond preview into saved sale and earnings. Preserve ticket-plus-product relationships, actual pricing modes, quantity, discounts, internal/absorbed cost allocation, and fresh/existing baskets. The card's reported beta checks stopped before completed-payment/fulfillment/settlement proof; that is an evidence boundary, not proof those outcomes failed.
- **SPD-2770:** persisted settings and native SDK/hardware lifecycle deserve a named release owner. Connected-hardware purchase alone can miss a crash caused by the setting while hardware is disconnected. Keep report versus independently verified device evidence separate.
- **Membership batches:** a high success count can hide missing customers. Identity-based recipient accounting and safe resume are required.
- **Seat and package incidents:** test lifecycle after the sale—expiry, refund, void, transfer, renewal, printing, and check-in—not just selection.

## Test-writing lessons — refund policy review, 2026-10-07

These are lessons from case review and publication, not escaped defects or executed refund results. [[03 Test Cases/Refunds and Protection/Organizer and Venue/SPW-19669-customer-refund-amount-rules-test-cases|SPW-19669]] and SPT-5308 exposed the following gaps:

| Lesson | Prevention now in the workflow |
| --- | --- |
| Covering every dropdown option is not covering every combination. | State the selected combination scope and run count. The initial five pairs did not cover all 16 shipping/fee pairs requested by the user. |
| Long combined parameter names make execution harder. | Separate independent ShippingRule and FeeSelection values; map each to exact UI choices. Keep dependent setup together. |
| Saving settings does not prove refund amounts. | Account separately for form persistence, customer preview, completed credit/payment refund, and financial reconciliation. |
| A fresh source revision can invalidate older setup advice. | Record exact reviewed backend/frontend revisions and recheck controls. Source presence does not prove deployment. |
| A preview cannot be its own financial expectation. | Obtain original component amounts independently; aggregate Tax/Fees lines cannot prove every component. Mark unavailable evidence Blocked. |
| Setup must explain how, without irrelevant boilerplate. | Give exact permissions, required flags, supported find-or-create Admin steps, and item/delivery choices. Keep arbitrary venue IDs, generic QA-environment wording, and shared setup labels out of cases. |
| Saved Qase definitions are not executed coverage. | Dry-run, apply only the approved scope, verify stored fields and parameter structure, and synchronize publication status separately from execution. |

Durable rules live in [[05 Tooling/Qase Test Case Writing Rules#Readable Parameters And Combination Accounting]], [[05 Tooling/Qase Test Case Writing Rules#Settings Coverage Versus Financial Proof]], [[06 Prompts/Showpass QA Test Case Generator#Settings And Amount Coverage Review]], and [[05 Tooling/qasectl]]. The canonical standard still governs risk-weighted selection; the requested 16-pair settings scope is not a requirement to enumerate every feature permutation.

## Browser execution lessons — public pages and widget smoke, 2026-10-25

This was a broad, evolving request. The useful coverage included real customer journeys, English/French checks and checkout inside an actual embedding website. The avoidable work came from extra record searches, repeated observations, a deprecated control and cleanup that had not been planned before selection. These are execution lessons, not evidence that all public pages or payments passed.

| Lesson | Do this next time |
| --- | --- |
| A clear goal still needs a finishing point. | State the requested outcome and cleanup before testing. Stop when those checks are accounted for; expand only for a relevant failure or an explicit wider request. |
| Many addresses can exercise the same behavior. | Group by distinct business result and affected entry path. Add a language, view or record state when it can change that result; avoid automatically testing every combination. Keep genuinely different flows separate. |
| Ready examples are usually faster than discovering more data. | Start with the supplied records and ready buttons. Check sale dates and availability before reserving stock. If setup is unsuitable, use a known alternative or record the exact blocker. |
| Opening a widget URL misses part of the customer journey. | For embedding checks, use the actual host, its SDK, visible toggles and ready launches. Prove that the selected item reaches checkout through that host. |
| A test tool may still show an unsupported control. | Check current support and user clarification before treating its error as a release defect. The standalone Cart button in the supplied widget tool was deprecated; its 404 was withdrawn as a bug. This does not exclude active cart behavior elsewhere. |
| Known errors can consume the run without adding confidence. | Record the affected attempt and the user's known-issue context. Retry only to answer a new recovery question; keep any unresolved effect on the requested outcome visible. |
| A draft quantity is different from the saved cart. | Plan removal before selection and confirm it with a fresh read in the same host/session. Do not infer removal from zero in a picker or from a different browser context. |
| Waiting for a reservation to expire is expensive cleanup. | Prefer quickly reversible data. If expiry becomes necessary, stop extending the reservation, verify the final empty cart and say that expiry performed cleanup. Do not claim another buyer's inventory was verified without checking it. |
| More captures do not necessarily provide more proof. | Observe once per decision, capture the ready outcome and reuse that evidence. Keep exact steps and visible small screenshots, but omit duplicate captures, routine waits and repeated summaries. |
| A user correction must change the remaining work. | Narrow the active plan and conclusion immediately. Retain useful earlier results as earlier evidence; do not keep requesting access for checks the user removed. |

Keep the strongest parts: backend-first expectations, a clean successful journey, business-important variations, readable steps, actual-host evidence, fresh cleanup proof and honest limits. Efficiency must not weaken checks for saved prices/fees, successful allowed actions, stock, service-fee revenue or unauthorized access.

Run evidence: [[03 Test Cases/Authentication/public-and-protected-pages-beta-smoke-2026-10-25]]. The reusable decisions now live in [[06 Prompts/Interactive Browser Release Testing#Keep the scope and finish clear]], [[06 Prompts/Interactive Browser Release Testing#Check test data and cleanup before changing it]] and [[06 Prompts/Interactive Browser Release Testing#Keep the Run Light]].
