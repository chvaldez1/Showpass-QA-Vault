---
title: Consent QA Library
tags:
  - qa/test-cases
---

# Consent QA Library

An Organizer's saved checkout consent rules affect the Customer's purchase and the response later read in Reports. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Start with the saved consent item, including its required status, default and reporting label. Use the applicable Customer or Guest checkout. Match the resulting response to the order or transaction in the report.

## Connected features

- [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Settings → Checkout Consent]]
- [[03 Test Cases/Reports/reports-qase-test-cases#SPT-4798: Custom Consent Items]]
- [[03 Test Cases/Advertising/Advertising QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5433](https://app.qase.io/case/SPT-5433) · Dashboard - Organization - Add a checkout consent item
- [SPT-4970](https://app.qase.io/case/SPT-4970) · Custom Marketing Consent - Required custom clickwrap blocks checkout until accepted
- [SPT-4798](https://app.qase.io/case/SPT-4798) · Dashboard - Reports - Verify Custom Consent Items CSV contents
