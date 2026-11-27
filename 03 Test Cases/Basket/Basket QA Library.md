---
title: Basket QA Library
tags:
  - qa/test-cases
---

# Basket QA Library

A basket holds a mutable selection before a completed order exists. Inventory reservations, customer identity, discounts and fees can change during this stage. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Start with a fresh basket and record its items, quantities, totals and intended Customer. Change one control or let its timer expire. Compare both the visible basket and what happens to reserved inventory or later checkout.

## Connected features

- [[03 Test Cases/Checkout/Checkout Money Movement Test Drafts]]
- [[03 Test Cases/Holds/Holds QA Library]]
- [[03 Test Cases/Gift Cards/Gift Card Test Cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-244](https://app.qase.io/case/SPT-244) · Web - Public - Cart - Verify Basket Clearing (Web UI) After Tab Closure and Timer Expiry
- [SPT-3294](https://app.qase.io/case/SPT-3294) · Core - Inventory - Change regular ticket quantities in the cart
- [SPT-3339](https://app.qase.io/case/SPT-3339) · Core - Gift Cards - Apply gift card credit at checkout with sufficient or partial balance
