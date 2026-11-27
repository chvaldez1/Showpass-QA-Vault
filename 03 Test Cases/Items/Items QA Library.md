---
title: Items QA Library
tags:
  - qa/test-cases
---

# Items QA Library

Ordered ticket, product and membership items are the records used for fulfillment, admission and later adjustments. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Start with a completed order whose lines can be distinguished by item type, name or delivery. Check the resulting ticket, pickup or membership against its own line and use an untouched line as a control.

## Connected features

- [[03 Test Cases/Orders/customer-email-language-test-cases]]
- [[03 Test Cases/Products/inventory-qase-test-cases]]
- [[03 Test Cases/Check In/check-in-qase-test-cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5759](https://app.qase.io/case/SPT-5759) · Dashboard - Check In - Pick up a product using its barcode without selecting an event
- [SPT-891](https://app.qase.io/case/SPT-891) · Dashboard - Reports - Verify Standard Shipping ticket and product rows
- [SPT-892](https://app.qase.io/case/SPT-892) · Dashboard - Reports - Include shipping and pickup memberships
