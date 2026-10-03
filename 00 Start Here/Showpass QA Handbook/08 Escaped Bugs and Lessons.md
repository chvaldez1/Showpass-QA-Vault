---
title: Escaped Bugs and Lessons
date: 2026-10-01
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
