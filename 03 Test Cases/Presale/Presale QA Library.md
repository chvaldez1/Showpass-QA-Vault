---
title: Presale QA Library
tags:
  - qa/test-cases
---

# Presale QA Library

A password-protected purchase path can offer specific ticket types and apply purchase limits before or during regular sales. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Prepare a protected Ticket Type plus a visible control on the same Event. Record sales window, exact code scope and limit. Compare the allowed selection and order before testing refund, transfer or exchange effects against the same policy.

## Connected features

- [[03 Test Cases/Events/02 Manage/09 Advanced options]]
- [[03 Test Cases/Event Discovery/Event Discovery Test Cases]]
- [[03 Test Cases/Exchanges/cash-other-exchanges]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-281](https://app.qase.io/case/SPT-281) · Core - Events - Event Password - Verify purchase quantity respects "Max item purchase limit"
- [SPT-283](https://app.qase.io/case/SPT-283) · Core - Events - Event Password - Verify re-purchase restriction with "Max item purchase limit" after partial refund (active tickets remain)
- [SPT-285](https://app.qase.io/case/SPT-285) · Core - Exchanges - Verify Exchange to Password-Protected Event or Item
- [SPT-3517](https://app.qase.io/case/SPT-3517) · Core - Calendar - Complete password-protected ticket purchase
- [SPT-3807](https://app.qase.io/case/SPT-3807) · Core - Events - Event Password - Verify access with password validation
