---
title: Event — Waitlists
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Waitlists

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Existing coverage and migration gap

Ticket setup remains in [[03 Test Cases/Events/02 Manage/02 Tickets|Tickets]], SPT-4384. List/actions/filtering remain in [Waitlists — suite 796](https://app.qase.io/project/SPT?suite=796), SPT-4224/4225; public join/offer/expiry behavior remains in suites 621/598.

**Blocked for native destination parity:** the event page is currently registered as RoutePlaceholderPage. A configured ticket waitlist does not establish that this destination works. Later verify event/ticket context and employee permission from the new sidebar.

Source: [page registration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>).

