---
title: Seating QA Library
tags:
  - qa/test-cases
---

# Seating QA Library

Space and seat configuration determine what a buyer may select, what inventory is held and what is released after a sale adjustment. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Prepare the actual Event occurrence, space, section and known seat identifiers. Compare the selected assigned seat against a nearby control. Follow purchase, hold, release or exchange through the same seat map and order.

## Connected features

- [[03 Test Cases/Events/02 Manage/04 Seating]]
- [[03 Test Cases/Assigned Seating/SPD-2635-full-table-partial-removal-qase-case]]
- [[03 Test Cases/Holds/Holds QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-4722](https://app.qase.io/case/SPT-4722) · Core - Assigned Seating - Verify real-time seat reservation and release updates
- [SPT-2873](https://app.qase.io/case/SPT-2873) · Core - Packages + Assigned Seating - Verify Seat Release on Custom Package Void/Refund/Hold Release
- [SPT-2876](https://app.qase.io/case/SPT-2876) · Core - Packages + Assigned Seating - Verify Seat Release on Preset Package Void/Refund/Hold Release
- [SPT-5265](https://app.qase.io/case/SPT-5265) · Core - Inventory - Keep package seats correct and prevent a second sale of occupied seats
