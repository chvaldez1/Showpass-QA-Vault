---
title: Event — Discounts
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Discounts

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Existing coverage and migration gap

Use [Single Discounts — suite 469](https://app.qase.io/project/SPT?suite=469), [Auto Discounts — suite 470](https://app.qase.io/project/SPT?suite=470), and [Bulk Discounts — suite 471](https://app.qase.io/project/SPT?suite=471). Relevant event filtering: SPT-3480/3481; create/edit behavior: SPT-1743/1745/1749/1759/1760/1761. These are shared organization features and are not copied or moved here.

**Blocked for native destination parity:** the current event page registration uses RoutePlaceholderPage. SPT-5072 can inventory the link, but cannot claim an operational event-scoped discount page. Once the destination is implemented, verify the selected event is retained in filtering and creation, and run the existing discount cases from that entry. Do not invent a supported create action on a placeholder.

Source: [current page registration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>).

