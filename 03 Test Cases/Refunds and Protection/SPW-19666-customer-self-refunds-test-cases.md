---
title: Customer Refund Policy Feature Coverage Index
jira: SPW-19666
status: source-reviewed-not-executed
date: 2026-09-24
tags:
  - qa/test-cases
  - refunds
---

# Customer Refund Policy Feature Coverage Index

[SPW-19666](https://showpass.atlassian.net/browse/SPW-19666) coordinates the Fan Expo customer refund subtasks. Use each card's note for its own setup, source evidence, and standalone Qase-ready cases.

| Jira card | Scope | Local note | Current result |
| --- | --- | --- | --- |
| SPW-19667 | Save organization refund settings and ticket/product choices | [[SPW-19667-customer-refund-policy-test-cases]] | Six existing Qase cases updated for clarity; six more remain local. |
| SPW-19668 | Show which purchases customers can select in Return order | [[SPW-19668-customer-refund-eligibility-test-cases]] | Eight unexecuted local cases. |
| SPW-19669 | Decide how shipping and fees affect the refund amount | [[SPW-19669-customer-refund-amount-rules-test-cases]] | No runnable cases yet; the new choices are absent from local code. |
| SPW-19670 | Let customers return released delayed-barcode tickets | [[SPW-19670-delayed-barcode-self-refund-test-cases]] | No runnable cases yet; the new Venue setting is absent from local code. |
| SPW-19671 | Complete a return and check credit, tickets, and orders | [[SPW-19671-customer-self-refund-acceptance-test-cases]] | Four unexecuted local cases. |

The subtasks define one venue-level policy with an on/off switch on each sellable item. The customer cases in 19668 and 19671 use current local backend and frontend behavior. The amount and delayed-barcode notes record Jira requirements separately because their proposed controls were absent in the checked-out code on 2026-09-24. No Qase read/write, browser run, branch comparison, or diff was performed for this split.
