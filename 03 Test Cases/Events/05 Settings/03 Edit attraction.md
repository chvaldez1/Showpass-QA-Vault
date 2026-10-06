---
title: Event — Edit attraction
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Edit attraction

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Existing coverage and migration gap

Cases below retain configuration, special-event selection, add/edit/remove, required fields and multiple event choices. They stay in [Attraction Configuration — suite 674](https://app.qase.io/project/SPT?suite=674) and [Special Events — suite 480](https://app.qase.io/project/SPT?suite=480); SPT-5143 adds richer special-event content. SPT-3526 was not present in the current bulk read, so the old 3524–3529 shorthand is not retained as proof of six cases.

**Blocked for native destination parity:** the current registration is RoutePlaceholderPage. Creation/editing tests remain useful for the legacy destination, but are not proof of the new sidebar route. Link calendar/public assertions to SPT-5144/5148 rather than duplicating them here.

Source: [page registration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-4090: Web - Dashboard - Attraction Configuration - Build Attraction Event

**Description:**

Verify that an attraction page can be created, configured with multiple content sections (events, products, memberships, single events), reordered by the employee, and displayed correctly on the public attraction page.

**Preconditions:**

- Required items already exist:
    - Recurring or individual events
    - (If applicable) Parent event with child time slots for timed attractions
    - Products
    - Memberships
- Events are configured with enforced inventory
- Attraction calendar event (grandparent) exists

**Postconditions:**

- Attraction sections can be created and configured successfully
- Sections support drag-and-drop reordering
- Reordered sections persist after saving
- Expand/collapse behavior works before and after reordering
- Public attraction page reflects:
    - Correct section order
    - Correct titles and descriptions
    - Correct linked events/items
- No missing, duplicated, or broken sections

**Tags:** dashboard, attraction-event

**Parameters:**

AttractionType: Calendar, Calendar, Calendar, Product, Memberships, SingleEvent, ExternalLink, TicketType
Config: SingleEvent, RecurringEvent, TimelotEvent, Product, MembershipGroup, TicketType, URL, TicketType

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Find your parent event and click on the attraction edit page |  | I framed attraction edit page loads |
| Add multiple attraction sections (e.g. Events, Products, Memberships) |  | Sections are added and displayed in a list |
| Link existing events/items to each section |  | Linked items appear correctly in each section |
| Save the attraction sections |  | Sections save successfully |
| Hover over a collapsed section |  | Move/drag icon becomes visible |
| Drag a section to a new position |  | Section order updates immediately |
| Expand and collapse sections after reordering |  | Accordion behavior continues to work |
| Save the attraction configuration |  | Changes save successfully |
| Visit the public attraction page |  | Attraction page loads with configured sections |
| Review section order and content |  | Sections appear in the configured order with correct content |

### SPT-4829: Web - Dashboard - Attraction Configuration - Verify that you can add multiple events for "Ticket Type" section type

**Description:**

This test verifies that you can add multiple events for "Ticket Type" section type

**Preconditions:**

At least 2 events with more than 1 ticket type each<br/>An event to be configured as attraction configuration

**Postconditions:**

Not supplied in Qase.

**Tags:** 

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Navigate to this event in the dashboard |  | The manage event page is displayed for this event |
| Click "Attraction configuration" to the left |  | Setup for the attraction is displayed |
| Click "Add Section"<br/>Select "Ticket types" as the section type<br/>Add the events with more than 1 ticket type<br/>Save |  | It should succeed |
| Open the event on the frontend and confirm that you're seeing the ticket types |  | Verified to be correct |
| 1. Confirm a section with explicit `item_ids` only renders those selected ticket types, including selected ticket types from later configured event ids. (Can modify this in the config of the attraction event in admin)<br>2. Confirm sold-out ticket types still render after available ticket types for <u>each event result</u>.<br>3. Add a ticket type from a later configured event id to cart and confirm the cart flow uses that event correctly. |  | Verified to be correct |

### SPT-3524: Web Dashboard - Edit Event - Add special event to parent event timeslots

**Description:**

Verifies that an organizer can add a special-event configuration to parent-event timeslots and that the consumer calendar reflects it.

**Preconditions:**

A dashboard user can edit an attraction parent event with multiple timeslots. The consumer attraction calendar is available for verification.

**Postconditions:**

The special event is saved, remains assigned to the selected timeslots, and appears in the consumer attraction calendar marker/filter.

**Tags:** edit-event, dashboard, events, calendar

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the attraction parent event in the dashboard edit flow. |  | The attraction configuration section is available. |
| Add a special event with name/description and assign two timeslots. |  | The selected timeslots are attached to the special event configuration. |
| Save the event and reload the edit page. |  | The special event and assigned timeslots persist. |
| Open the consumer attraction calendar. |  | The configured timeslots show special-event markers and can be filtered by the special event. |

### SPT-3525: Web Dashboard - Edit Event - Add special event to single event

**Description:**

Verifies that an organizer can add and persist a special-event configuration for a single attraction event and see it reflected on the consumer calendar.

**Preconditions:**

A dashboard user can edit a single attraction event that supports special-event configuration. The consumer attraction calendar is available for verification.

**Postconditions:**

The special event is saved for the single event and appears on the consumer attraction calendar.

**Tags:** edit-event, dashboard, events, calendar

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the single attraction event in the dashboard edit flow. |  | The attraction special-event configuration is available. |
| Add a special event with valid name and description. |  | The special event can be entered without validation errors. |
| Save and reload the event. |  | The special event persists on the dashboard. |
| Open the consumer attraction calendar. |  | The single event date shows the special-event marker/filter details. |

### SPT-3527: Web Dashboard - Edit Event - Edit an existing special event

**Description:**

Verifies that an organizer can edit special-event name, description, and assigned timeslots and that changes reach the consumer calendar.

**Preconditions:**

An attraction event already has a special event assigned to one or more timeslots.

**Postconditions:**

The updated special-event configuration persists in the dashboard and consumer calendar.

**Tags:** edit-event, dashboard, events, calendar

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the attraction event with an existing special event. |  | The existing special event is visible in the edit flow. |
| Change the special-event name/description and adjust assigned timeslots. |  | Updated values are accepted and selected timeslots are changed. |
| Save and reload the event. |  | Updated name/description and timeslot assignments persist. |
| Open the consumer attraction calendar. |  | Markers, filters, and tooltip/popover content reflect the updated special event. |

### SPT-3528: Web Dashboard - Edit Event - Remove special event from attraction configuration

**Description:**

Verifies that an organizer can remove or disable a special-event configuration and that the consumer calendar no longer shows its marker/filter.

**Preconditions:**

An attraction event has a saved special event visible on the consumer calendar.

**Postconditions:**

The special event is removed from the dashboard configuration and no longer appears on the consumer calendar.

**Tags:** edit-event, dashboard, events, calendar

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the attraction event with a saved special event. |  | The special event is present in the dashboard configuration. |
| Remove or disable the special event and save. |  | The event saves without validation errors. |
| Reload the dashboard edit page. |  | The special event is no longer present or is disabled as expected. |
| Open the consumer attraction calendar. |  | The removed special event marker, tooltip/popover, and filter option are absent. |

### SPT-3529: Web Dashboard - Edit Event - Validate special-event required fields

**Description:**

Verifies special-event form validation for missing name and missing timeslot/event assignment.

**Preconditions:**

A dashboard user can edit an attraction event and open the special-event configuration form.

**Postconditions:**

Invalid special-event configurations are blocked with clear validation messages and are not saved.

**Tags:** edit-event, validation, dashboard, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the attraction special-event form and leave the name blank. |  | A required-name validation error is shown and the event cannot be saved. |
| Enter a valid name but leave required event/timeslot assignment empty. |  | A required-selection validation error is shown and the event cannot be saved. |
| Correct all required fields and save. |  | The event saves successfully and the special-event configuration persists. |

