---
title: Packages QA Library
tags:
  - qa/test-cases
---

# Packages QA Library

The parent Package is the purchase choice. Included Event tickets or products have their own quantities, inventory, guest information and later validity. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Prepare the parent and distinct child records and compare the resulting order line by line. Include an untouched regular ticket when proving a partial adjustment. Reconcile financial allocation separately from ticket and stock changes.

## Connected features

- [[03 Test Cases/Events/03 Promote/03 Packages]]
- [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario]]
- [[03 Test Cases/Discounts/itemized-partial-apply-to-each-split-test-cases]]
- [[03 Test Cases/Items/Items QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-815](https://app.qase.io/case/SPT-815) · Web Dashboard - Packages - Create Preset Package with Multiple Child Events
- [SPT-3761](https://app.qase.io/case/SPT-3761) · Web Dashboard - Transactions - Refund package items and release package inventory
- [SPT-4043](https://app.qase.io/case/SPT-4043) · Core - Itemized Exchange - Verify Package Items Are Correctly Restricted in Exchange Flow
- [SPT-3879](https://app.qase.io/case/SPT-3879) · Core - Financials - Keep package prices and fees correct after quantity changes
