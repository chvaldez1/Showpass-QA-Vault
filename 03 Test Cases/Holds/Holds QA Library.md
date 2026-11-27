---
title: Holds QA Library
tags:
  - qa/test-cases
---

# Holds QA Library

An employee's existing hold reserves inventory and may be converted by staff or through a controlled purchase link. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Record hold owner, linked basket, event, quantity, price and expiry. Check that conversion issues one paid order, or that release invalidates the old link and frees the correct stock. Use a separate hold for an expiry or denied employee check.

## Connected features

- [[03 Test Cases/Box Office/Box Office Test Cases]]
- [[03 Test Cases/Basket/Basket QA Library]]
- [[03 Test Cases/Reports/reports-qase-test-cases#SPT-912: Holds Stats]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-1249](https://app.qase.io/case/SPT-1249) · Core - Holds - Checkout - Verify Regular Hold Creation & Complete Purchase for Regular Hold
- [SPT-1247](https://app.qase.io/case/SPT-1247) · Core - Holds - Verify splitting regular holds and blocking invalid split attempts
- [SPT-4824](https://app.qase.io/case/SPT-4824) · Core - Holds - Verify expired or released hold link cannot be purchased
- [SPT-5284](https://app.qase.io/case/SPT-5284) · Core - Inventory - Complete an allocated Box Office hold sale despite public sellout
