---
title: Event — Facebook
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Facebook

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration coverage

SPT-4902 is the detailed baseline; SPT-5142 is an overlapping migration smoke with weak result pairing. Cover disconnected/setup guidance, missing-location guidance, connected publishing and saved integration state. Use only an approved Facebook test destination; do not publish a real public event while checking migration parity. External publication is manual-only until that destination and authorization exist.

Source: [Facebook page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/facebook/ui/pages/EventFacebookPage.web.tsx>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-4902: Dashboard - Integrations - Facebook official event creation and ticket sync

**Description:**

Verifies that an organizer can connect Facebook event publishing, create or link an official Facebook event, and synchronize selected ticket information.

**Preconditions:**

- Venue has Facebook integration access and a test Facebook page or sandbox setup.
- Organizer has permission to manage event integrations.
- Test event has ticket types available for sync.

**Postconditions:**

- Facebook official event linkage/sync state is visible in Showpass.
- Test Facebook event or linkage can be removed/reset after validation.

**Tags:** dashboard, facebook, events

**Parameters:**

SyncAction: CreateEvent, LinkExisting, UpdateTickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the dashboard integration or event social/Facebook settings for the test event. |  | Facebook settings load and show the required connection state. |
| Connect or confirm the Facebook page used for official event publishing. |  | Expected Facebook page/account is connected. |
| Create a new official Facebook event or link an existing one. |  | Official Facebook event linkage is created or selected successfully. |
| Select ticket tiers or ticket information to sync. |  | Ticket sync selection is saved. |
| Save and trigger the Facebook sync. |  | Showpass shows a successful sync or actionable error, and the Facebook event reflects the expected ticket information. |
| Update a synced ticket tier and trigger sync again. |  | Updated ticket data is reflected in the next sync result. |

