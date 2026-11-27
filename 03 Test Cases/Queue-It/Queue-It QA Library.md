---
title: Queue-It QA Library
tags:
  - qa/test-cases
---

# Queue-It QA Library

A waiting room applies to configured public paths and can send an admitted visitor back to the initial destination. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Use the assigned sandbox host and known queue rules. Compare protected and permitted control URLs, exact return destination, admission reuse, and the valid flow after navigation or a recoverable failure.

## Connected features

- [[03 Test Cases/Websites/Websites QA Library]]
- [[03 Test Cases/Event Discovery/Event Discovery Test Cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5898](https://app.qase.io/case/SPT-5898) · Queue-it - Protected organizer direct entry, waiting-room return and admission reuse
- [SPT-5899](https://app.qase.io/case/SPT-5899) · Queue-it - Unprotected organizer and first protected client navigation
- [SPT-5902](https://app.qase.io/case/SPT-5902) · Queue-it - Delayed readiness validates only the latest eligible destination
- [SPT-5903](https://app.qase.io/case/SPT-5903) · Queue-it - Script/configuration failures, bounded timeout and navigation recovery
