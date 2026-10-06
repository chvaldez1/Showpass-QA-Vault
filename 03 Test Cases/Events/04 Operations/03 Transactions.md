---
title: Event — Transactions
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Transactions

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Existing coverage and migration gap

Refer to [Transactions — suite 103](https://app.qase.io/project/SPT?suite=103), especially SPT-5064–5070/5153 for seller access, event selection and export scope. Do not duplicate the financial suite here.

**Blocked for native destination parity:** current event page registration is RoutePlaceholderPage. Once available, check owner and seller entry separately, correct selected event/child, independent Manage Transactions permission and return navigation. Sales, refunds and exports must not leak another organization's data.

Source: [page registration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>).

