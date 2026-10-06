---
title: Event — Clone event
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Clone event

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration coverage

SPT-786 preserves ordinary clone independence. [[03 Test Cases/Events/04 Operations/SPW-20014-event-clone-resale-waitlist-test-case|SPT-5154 clone resale/waitlist regression]] contains the detailed focused case and now uses its existing Qase ID. SPT-5131 mixes cloning and template management; avoid another duplicate clone draft.

The native clone page has **Tickets being copied** and **Clone event**, then opens the new draft's Basic info page. The old SPT-786 Save Draft flow is a legacy reference; use the native clone controls for migration execution and retain its copied-field, new-identity and source-unchanged assertions.

Sources: [clone page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-clone/ui/pages/EventClonePage.web.tsx>), [clone validation/reset](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>).

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-786](https://app.qase.io/case/SPT-786) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |

### SPT-786: Dashboard - Manage Events - Clone an event into an independent draft

**Description:**

Validates that Clone creates one independent Draft. The clone retains reusable event configuration while receiving a new identity and no sales history. The source code intentionally clears IDs, public links, Facebook identifiers, live-room data, attraction configuration, and sale-derived ticket fields before creating the clone.

| Occurrence | Source Fixture | Expected Clone |
| --- | --- | --- |
| SingleDay | Published single event | One separate single-event Draft. |
| Recurring | Published recurring parent with three children | One separate recurring Draft with the expected three-child schedule. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer can create and manage events.
* The source event for `Occurrence` has a description, location, General Admission ticket type, one event password, and one Order Form custom question.
* Record all source values and confirm that the source test setup can remain unchanged.
* The clone must not receive orders or sales.

**Postconditions:**

* Delete or archive only the cloned Draft after confirming it has no sales.
* Confirm that the source event and its sales history remain unchanged.

**Tags:** dashboard, events, create-event

**Parameters:**

Occurrence: SingleDay, Recurring

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Manage Events**, locate the source test setup and select **Clone**. | Source for `Occurrence` | The clone form opens with reusable source configuration prefilled. |
| Compare the prefilled clone form with the recorded source values. | Description, location, ticket type, password, custom question, and recurrence schedule when applicable | Reusable configuration is present; the clone has no saved event ID or source public link. |
| Give the clone a unique name and future dates. | `QA Clone <occurrence> <unique suffix>`; unused future dates | The new identity and dates are accepted without modifying the source form. |
| Select **Save Draft** once. | None | One separate Draft is created. |
| Return through **Manage Events**, find the clone, and reopen **Edit**. | Unique clone name | The clone appears once with Draft status and its own public link. |
| Verify copied configuration. | Recorded source configuration | Description, location, ticket type, event password, custom question, and recurring schedule when applicable persist on the clone. |
| Verify data that must not be copied. | Source event ID, public link, orders, transactions, tickets sold, Facebook identifiers, live-room state | The clone has a new identity and no source sales, transactions, social publishing state, or active room. |
| Change the clone subtitle and save. | `Independent clone <unique suffix>` | The change persists on the clone. |
| Reopen the source event. | Source test setup | The source subtitle, setup, recurrence structure, and sales history are unchanged. |
| Remove or archive the no-sales clone and return to **Manage Events**. | Exact clone name | Only the clone is removed from the active list; the source remains available. |
