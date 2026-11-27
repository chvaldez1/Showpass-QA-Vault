---
title: Operations QA Library
tags:
  - qa/test-cases
---

# Operations QA Library

Venue employees use Operations for Box Office, Entry, and conditional bulk work. Visibility, permission and effect depend on the selected action. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Choose the actual menu and an isolated record. For bulk work compare every intended row against a known control record and check the saved result after the job.

## Connected features

- [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis#Dashboard → Operations → Bulk actions → Comp upload]]
- [[03 Test Cases/Box Office/Box Office Test Cases]]
- [[03 Test Cases/Check In/check-in-qase-test-cases]]

## Existing cases

These saved cases cover issuing selected complimentary tickets, denial without the feature gate, and rejection of inventory from another Venue. Follow the issued tickets into Check In when that is in scope.

- [SPT-5762](https://app.qase.io/case/SPT-5762) · Issue selected complimentary tickets
- [SPT-5763](https://app.qase.io/case/SPT-5763) · Deny access when the gate is missing
- [SPT-5764](https://app.qase.io/case/SPT-5764) · Reject another Venue’s inventory
