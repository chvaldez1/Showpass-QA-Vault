---
title: Event — Navigation and permissions
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Navigation and permissions

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration corrections

SPT-5072 and SPT-5074 are local refactors for the current page structure. The old Edit Sellers → Edit Event shortcut did **not** establish a path to the legacy edit-form page; it is no longer presented as a supported native entry. Direct legacy-link compatibility remains a separate rollout check, not a fictional click path. Old child-page expectations also cannot be copied unchanged: current Stats & Info, eligible seating and limited Advanced controls differ.

Sources: [route visibility](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>), [page registrations](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>), [backend event write permission and lifecycle guards](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>).

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-5072](https://app.qase.io/case/SPT-5072) | Create Events (80) | Existing case preserved; migration notes below apply |
| [SPT-5074](https://app.qase.io/case/SPT-5074) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-5075](https://app.qase.io/case/SPT-5075) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-5076](https://app.qase.io/case/SPT-5076) | Edge Cases (820) | Existing case preserved; migration notes below apply |

### SPT-5072: Dashboard - Event Management - Show the right pages for each event type

**Description:** The event sidebar exposes the pages allowed for the selected event type and organization. Opening a page keeps the correct event selected.

| EventType | Expected navigation differences |
| --- | --- |
| PublishedSingleEvent | Overview and the supported Manage, Promote, Operations, Settings and Stats pages are available according to permissions and enabled features. |
| DraftEvent | Basic info and Tickets can be edited; Email guests is unavailable for a draft. |
| RecurringChild | Overview, Legal & important info, Donations, Financial settings, Custom fees, Promote, Clone event, Cancel event, Edit attraction and Internal fees are hidden. Stats & Info is not hidden just because this is a child. Seating requires an assigned map; Advanced options can expose reminders or accommodations when enabled. |
| TemplateEvent | Overview, Promote, Operations, Settings, Stats and Admin are hidden; Generate Events and Clone template are available in the template workflow. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for the selected event's owning organization and the Events module is enabled.
* Prepare the selected EventType: an active single event, draft, child of an existing recurring parent, or template. Record its name; for a child record the date and parent name.
* Record which optional features are enabled. Order form requires enable_nextjs_order_form for the organization; Donations and Custom fees need Manage Financials plus their page-specific eligibility.
* Internal fees is checked only with an authorized internal-admin account.
* Fees and seating are presence checks only; do not edit fees, maps or seat assignments.

**Postconditions:** No event data, fees or seating assignments are changed.

**Tags:** dashboard, events, employee-permissions

**Parameters:**

EventType: PublishedSingleEvent, DraftEvent, RecurringChild, TemplateEvent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events and select the prepared event; select the specific occurrence for a recurring child or the template from Templates. | **Event:** recorded name and occurrence date | The correct event is identified in the page header. |
| Inspect the sidebar groups and page labels. | **Groups:** Event, Manage, Promote, Operations, Settings, Stats and Admin as permitted by the selected EventType | Navigation follows the event-type table and the account's enabled capabilities. |
| Open each available in-scope sidebar page without saving anything. | **Scope:** the available pages in those groups; exclude approval workflow actions | Each implemented page identifies the selected event; a placeholder is recorded as incomplete migration coverage, not a successful feature check. |
| Check the available Financial settings, Custom fees, Seating and Internal fees destinations with the applicable authorized account. | **Action:** open only; no changes | The authorized page or section is present without changing configuration. |
| Open View Event when offered. | **Event:** selected event | The public page or authorized preview represents the same event; it does not switch to another occurrence. |
| Return to the event list using the page's back or Events navigation. | | The list returns without creating or changing an event. |

### SPT-5074: Dashboard - Events - Open the correct event for editing

**Description:** An employee opens an event through the event list or its sidebar, saves its subtitle, and confirms the same event was updated.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for two owned single events with no sales.
* Record both event names and subtitles.

**Postconditions:** Restore the edited event's subtitle, save and reopen it; the comparison event is unchanged.

**Tags:** dashboard, edit-event

**Parameters:**

EntryPoint: EventsListEdit, EventSidebar

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events and locate the first recorded event. | **Event:** first recorded name | The correct event appears. |
| Follow the selected entry point. | **EventsListEdit:** event menu → Edit; **EventSidebar:** open the event, then Basic info | Basic info opens for that event, not the comparison event. |
| Open Event details → Advanced and change Subtitle. | **Subtitle:** Entry point check | The changed subtitle is shown. |
| Select Save changes. | | Saving completes for the same event. |
| Return to Events and reopen its Basic info. | | Subtitle remains Entry point check. |
| Open Basic info for the comparison event. | **Event:** second recorded name | Its subtitle is unchanged. |

### SPT-5075: Dashboard - Event Management - Deny restricted event access

**Description:**

Checks that employees, organizers from another venue, and regular organizers cannot open event or template pages they are not allowed to use.

| AccessScenario | Starting Point | Expected Result |
| --- | --- | --- |
| MissingManageEventsPermission | Events while signed in as an employee who cannot manage events | Event editing is unavailable or access is denied |
| EventFromAnotherVenue | A saved link to an event owned by another venue | The other venue's event and information are not shown |
| TemplateCreateWithoutSuperuser | Create Event Template while signed in as a regular organizer | Template creation is unavailable or access is denied |

Current Angular references include /dashboard/events/{slug}/manage/#/edit and /dashboard/events/create-event-template/. They are reference information only and may change during the Next.js migration.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Venue A has an employee who is signed in without permission to manage events.
* Venue B has a separate event and a saved test link to its Edit page.
* A regular organizer account is available and is not a superuser.

**Postconditions:** No data is changed.

**Tags:** dashboard, edit-event, employee-permissions

**Parameters:**

AccessScenario: MissingManageEventsPermission, EventFromAnotherVenue, TemplateCreateWithoutSuperuser

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in with the restricted account named for AccessScenario. | Employee at Venue A or regular organizer | The account is signed in to the intended venue. |
| Follow the starting point shown in the Description. | Selected AccessScenario | The restricted page is unavailable or access is denied. |
| Check the page and any message shown. | Selected AccessScenario | No event details from another venue are shown, and no restricted event or template editor opens. |
| Return to Events. | None | The account can use only the event actions allowed by its permissions. |

### SPT-5076: Dashboard - Edit Event - Prevent changes to protected events

**Description:**

Checks that an event cannot be changed or deleted when its current state makes that action unsafe.

| ProtectedState | Expected Result |
| --- | --- |
| SaveInProgress | A message says previous changes are still saving and another edit cannot be submitted |
| RefundedEvent | The update is rejected and the saved event remains unchanged |
| SoldEventDelete | Delete is rejected because the event has sales |
| RecurringParentDelete | Delete is rejected while child events still belong to the parent |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in and can manage events.
* A prepared test event exists for each ProtectedState.
* Original event values and child-event counts are recorded.
* The prepared events must not be changed outside the action described in this case.

**Postconditions:**

* Confirm that the selected event keeps its original status and values.
* Do not delete or make other changes to the prepared events.

**Tags:** dashboard, edit-event, edge-case

**Parameters:**

ProtectedState: SaveInProgress, RefundedEvent, SoldEventDelete, RecurringParentDelete

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Manage Events, select Edit for the event named for ProtectedState. | Selected test event | The editor or the previous-changes-saving message appears. |
| Attempt only the change described for the selected state. | Subtitle change for RefundedEvent; Delete Event for delete scenarios; no action for SaveInProgress | The change is stopped as described and no success message claims that it completed. |
| Return to Manage Events and reopen the event. | Same event | The event still exists with its original status and values. |
| For RecurringParentDelete, expand the parent event. | Recurring parent | The original child events are still listed under the parent. |
