---
title: Event — Financial settings
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Financial settings

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Presence only

Run SPT-5072 from [[03 Test Cases/Events/00 Create and shared checks/Navigation and permissions]]. Open Financial settings for an eligible parent/single event with the required financial access. Confirm the section is available; leave without saving. Recurring children do not expose this destination.

Existing fee coverage: [SPT-3810](https://app.qase.io/case/SPT-3810), [SPT-3811](https://app.qase.io/case/SPT-3811). Fee calculations, settlements and configuration edits are deliberately outside this pass.

Source: [page routing and gates](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>).

