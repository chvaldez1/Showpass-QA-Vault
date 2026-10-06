---
title: Event — Check in
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Check in

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Existing coverage and migration gap

Use [Check In — suite 184](https://app.qase.io/project/SPT?suite=184), SPT-1663–1665/1671 and Order form's SPT-3270. Preserve the selected event/occurrence when following its entry; verify scan permissions separately from Manage Events.

**Blocked for native destination parity:** current event page registration is RoutePlaceholderPage. Do not call the event-scoped destination complete because the shared Check In page works. Real scan/admission and hardware checks stay in the specialist suite; no check-in data is changed by this analysis.

Source: [page registration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>).

