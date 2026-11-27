---
title: Workflows QA Library
tags:
  - qa/test-cases
---

# Workflows QA Library

An Event approval workflow links a saved Event Draft, request, review decision and later publish eligibility. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Prepare an eligible suborganization and authorized organizer and reviewer. Trace the same Event and request through revisions. Confirm that a stale or different request cannot prove the current Event was approved.

## Connected features

- [[03 Test Cases/Events/00 Create and shared checks/Create event]]
- [[03 Test Cases/Settings/Settings QA Library]]
- [[03 Test Cases/Venues/Venues QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-4702](https://app.qase.io/case/SPT-4702) · Workflow Approval - Event creation triggers approval workflow and forces draft status
- [SPT-4706](https://app.qase.io/case/SPT-4706) · Workflow Approval - Single-slot approval completes workflow and allows event publish
- [SPT-4712](https://app.qase.io/case/SPT-4712) · Workflow Approval - Event publish is blocked until workflow approval succeeds
- [SPT-5888](https://app.qase.io/case/SPT-5888) · Workflow Approval - Keep the latest request status when an older page update arrives late
- [SPT-5892](https://app.qase.io/case/SPT-5892) · Workflow Approval - Require a new review when attraction time-slot assignments change
