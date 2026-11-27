---
title: Customer Network QA Library
tags:
  - qa/test-cases
---

# Customer Network QA Library

The Organizer's Customer Network groups Venue customer information, credits, holds, and segments. A Venue customer record and a Showpass account can differ. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Use two Customers with distinct records in the same Venue. Compare the selected person's orders and credits, then follow the matching hold or staff sale without switching the linked Customer.

## Connected features

- [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis#Dashboard → Customers → Customers → Manage customers → Credits]]
- [[03 Test Cases/Customers/Customers QA Library]]
- [[03 Test Cases/Box Office/Box Office Test Cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-3145](https://app.qase.io/case/SPT-3145) · Web Dashboard - CRM - Verify Main Network Page Appearance and Navigation Elements
- [SPT-5755](https://app.qase.io/case/SPT-5755) · Box Office — email-less customer creation, phone-only matching and switch behavior
- [SPT-5767](https://app.qase.io/case/SPT-5767) · Dashboard - Customers - Limit Holds to the selected customer
- [SPT-5768](https://app.qase.io/case/SPT-5768) · Dashboard - Customers - Open a customer hold in Box Office
