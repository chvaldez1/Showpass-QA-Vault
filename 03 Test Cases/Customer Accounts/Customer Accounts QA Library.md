---
title: Customer Accounts QA Library
tags:
  - qa/test-cases
---

# Customer Accounts QA Library

Sign-in, guest ownership claims and My Orders determine who can access a previously purchased order. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Prepare two controlled accounts and an isolated order. Match order references in both sessions so a previously owned order cannot make the check pass. Use the claim, transfer or sign-in case that matches the actual entry.

## Connected features

- [[03 Test Cases/Authentication/login-test]]
- [[03 Test Cases/Ticket Claims/Ticket Claims QA Library]]
- [[03 Test Cases/Orders/customer-email-language-test-cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-2558](https://app.qase.io/case/SPT-2558) · Core - Authentication - Orders - Verify error when claiming guest purchase with different email
- [SPT-4966](https://app.qase.io/case/SPT-4966) · Core - Authentication - Orders - Verify claim links preserve login and claim context
- [SPT-2946](https://app.qase.io/case/SPT-2946) · Core - Checkout - Guest checkout - Claim or connect purchased basket to account
