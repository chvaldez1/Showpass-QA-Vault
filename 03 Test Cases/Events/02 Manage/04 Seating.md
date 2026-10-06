---
title: Event — Seating
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Seating

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Presence only

Run SPT-5072 from [[03 Test Cases/Events/00 Create and shared checks/Navigation and permissions]]. An eligible event must expose Seating; a recurring child requires an assigned map. Open the destination, then leave without saving. Do not create a map or assign seats in this pass.

Detailed coverage remains in [Map Editor — suite 82](https://app.qase.io/project/SPT?suite=82), including SPT-752–755/757 and the larger map/editor regressions. No Qase move is proposed or performed.

Source: [seating navigation gates](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>).

