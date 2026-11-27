---
title: Customers QA Library
tags:
  - qa/test-cases
---

# Customers QA Library

A staff sale can find, reuse or create a Venue Customer. Verify identity on the saved order rather than inferring from display name. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Prepare a controlled Customer with a known order and a different same-Venue control. Use the exact search result and compare order history, credit owner and issued item recipient where applicable.

## Connected features

- [[03 Test Cases/Customer Network/Customer Network QA Library]]
- [[03 Test Cases/Customer Accounts/Customer Accounts QA Library]]
- [[03 Test Cases/Box Office/Box Office Test Cases]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5755](https://app.qase.io/case/SPT-5755) · Box Office — email-less customer creation, phone-only matching and switch behavior
- [SPT-1343](https://app.qase.io/case/SPT-1343) · WebBoxOffice - Basket - Add, view, and clear new or existing customer
- [SPT-5768](https://app.qase.io/case/SPT-5768) · Dashboard - Customers - Open a customer hold in Box Office
- [SPT-1093](https://app.qase.io/case/SPT-1093) · Read the Customer’s saved account credit in Box Office.
- [SPT-1094](https://app.qase.io/case/SPT-1094) · Apply the intended Customer’s account credit to a purchase.

When the request says “credit,” name the record first. Account credit belongs to the Customer. [[03 Test Cases/Ticket Credits/ticket-credits-page-qase-test-cases|Ticket Credits]] have their own eligibility and uses, and [[03 Test Cases/Gift Cards/Gift Card Test Cases|Gift Cards]] carry an issued balance. [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario|Exchange credit]] comes from an existing order’s eligible selected items. Verify the intended balance or use counter after the applicable order or adjustment.
