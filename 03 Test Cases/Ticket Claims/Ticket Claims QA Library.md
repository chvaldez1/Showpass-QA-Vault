---
title: Ticket Claims QA Library
tags:
  - qa/test-cases
---

# Ticket Claims QA Library

A guest order claim and a Group Sales distribution claim both hand a preexisting record to the intended recipient, through different entry points. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Use a controlled pending claim and a separate matching account. Verify that sign-in returns to the same claim, that the recipient sees the correct issued items, and that the existing purchase is counted once.

## Connected features

- [[03 Test Cases/Customer Accounts/Customer Accounts QA Library]]
- [[03 Test Cases/Group Sales and Transfers/Transfer Group Sales]]
- [[03 Test Cases/Orders/customer-email-language-test-cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-1309](https://app.qase.io/case/SPT-1309) · Core - Group Sales - Claim distributed items after recipient authentication
- [SPT-2558](https://app.qase.io/case/SPT-2558) · Core - Authentication - Orders - Verify error when claiming guest purchase with different email
- [SPT-2946](https://app.qase.io/case/SPT-2946) · Core - Checkout - Guest checkout - Claim or connect purchased basket to account
- [SPT-4966](https://app.qase.io/case/SPT-4966) · Core - Authentication - Orders - Verify claim links preserve login and claim context
