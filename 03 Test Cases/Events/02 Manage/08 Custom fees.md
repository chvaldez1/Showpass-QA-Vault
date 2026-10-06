---
title: Event — Custom fees
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Custom fees

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Presence only

Run SPT-5072 from [[03 Test Cases/Events/00 Create and shared checks/Navigation and permissions]]. Custom fees requires configured-fee-structure support and Manage Financials, and is hidden for recurring children. Confirm the destination exists for an eligible organization; do not save, add, delete or calculate fees.

Retain shared fee cases in their existing suites. A hidden link for an ineligible organization is not automatically a migration defect.

Source: [custom-fee navigation gates](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>).

