---
title: Event — Internal fees
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Internal fees

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Presence only

Use an authorized internal-admin account to open Internal fees for an eligible single/parent event. Confirm the page exists and leave without saving. Ordinary organizers must not be given admin access for this check. SPT-5072 covers navigation; detailed rate-card behavior stays in [SPT-772](https://app.qase.io/case/SPT-772) and [SPT-3501](https://app.qase.io/case/SPT-3501).

No internal fee, rate card or organizer fee is edited by this refactor.

Source: [admin-only navigation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>).

