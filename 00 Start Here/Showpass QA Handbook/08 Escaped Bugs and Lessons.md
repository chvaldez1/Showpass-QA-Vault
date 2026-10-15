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
