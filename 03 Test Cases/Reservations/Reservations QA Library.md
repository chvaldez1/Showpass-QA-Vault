---
title: Reservations QA Library
tags:
  - qa/test-cases
---

# Reservations QA Library

In Showpass Guestlists, a request creates a reservation for a date and party size. Approval and guest check-in change that same booking. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Use an enabled Guestlist configuration, controlled contact details, requested date and independently known party size. Match the new pending row in staff view, then check approval and saved arrived count when assigned.

## Connected features

- [[03 Test Cases/Check-In/Check-In QA Library]]
- [[03 Test Cases/Widget/Widget QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-3769](https://app.qase.io/case/SPT-3769) · Widget - Guest List - Submission - Submit a guestlist request via public widget
- [SPT-3776](https://app.qase.io/case/SPT-3776) · Dashboard - Guestlists - Approval - Approve a pending widget submission
- [SPT-3775](https://app.qase.io/case/SPT-3775) · Dashboard - Guestlists - Check in guests using plus/minus controls
- [SPT-4805](https://app.qase.io/case/SPT-4805) · Core - Guestlists - Update Arrival Date and Time for Approved Guestlists Entry
