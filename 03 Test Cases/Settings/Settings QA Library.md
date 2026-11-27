---
title: Settings QA Library
tags:
  - qa/test-cases
---

# Settings QA Library

Organization and Event settings may control visibility, consent, payments or ticket permissions for other surfaces. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Identify the owning setting and existing scope. Record both the Organization default and Event override when available, then reopen and observe the feature that consumes it.

## Connected features

- [[03 Test Cases/Organizations/organization-settings-qase-test-cases]]
- [[03 Test Cases/Events/02 Manage/09 Advanced options]]
- [[03 Test Cases/Consent/Consent QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-4009](https://app.qase.io/case/SPT-4009) · Dashboard - Organization - Save enabled modules and their Dashboard access
- [SPT-5433](https://app.qase.io/case/SPT-5433) · Dashboard - Organization - Add a checkout consent item
- [SPT-5442](https://app.qase.io/case/SPT-5442) · Dashboard - Organization - Save payment-plan terms
- [SPT-5353](https://app.qase.io/case/SPT-5353) · Dashboard - Advanced Options - Override and restore the event transfer limit
