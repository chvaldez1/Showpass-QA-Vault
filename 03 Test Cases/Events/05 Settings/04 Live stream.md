---
title: Event — Live stream (conditional)
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Live stream (conditional)

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Conditional page

This page may not appear in the supplied screenshot. Current navigation exposes it only when live streaming is enabled and the event is not a template. Event setup is SPT-4877 under [[03 Test Cases/Events/02 Manage/01 Basic info|Basic info]]; purchase/access is [SPT-3291](https://app.qase.io/case/SPT-3291). Check that the saved event and room stay paired; do not broadcast to a real audience.

Sources: [live-stream registration and gate](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>), [virtual event and assigned-space validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>).

