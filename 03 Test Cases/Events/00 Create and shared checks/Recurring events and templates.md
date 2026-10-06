---
title: Event — Recurring events and templates
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Recurring events and templates

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-5082](https://app.qase.io/case/SPT-5082) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-769](https://app.qase.io/case/SPT-769) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-4299](https://app.qase.io/case/SPT-4299) | Edge Cases (820) | Existing case preserved; migration notes below apply |
| [SPT-4879](https://app.qase.io/case/SPT-4879) | Edge Cases (820) | Existing case preserved; migration notes below apply |

### SPT-5082: Dashboard - Events - Edit one recurring child without changing sibling settings

**Priority:** High

**Description:**

Validates child-event editing separately from recurring-series creation. One child-owned area is changed per run, then the child, parent, and an untouched sibling are reopened to prove that the intended change persisted only where expected. Parent-only sections and fields are covered as visibility checks by SPT-5072.

| ChildEditArea | Change |
| --- | --- |
| BasicInfo | Change the child event name and subtitle. |
| EventDateTime | Move the child to a different future start and end without overlapping its sibling. |
| TicketInventory | Increase the child ticket inventory without editing the parent ticket type. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer can edit events.
* A published recurring parent exists with at least two future children and a public General Admission ticket type.
* The parent, target child, and untouched sibling have no sales.
* Record the parent and sibling values before the test.

**Postconditions:**

* Restore the edited child value or remove the test recurring test setup if it has no sales.
* The untouched sibling retains its original values. Parent-owned settings stay unchanged; the parent date range reflects its earliest and latest children.

**Tags:** dashboard, events, edit-event

**Parameters:**

ChildEditArea: BasicInfo, EventDateTime, TicketInventory

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Manage Events**, expand the recurring parent and select **Edit** for one child. | Target child name and date | The editor identifies the selected child, not the parent or sibling. |
| Record the current value in the selected `ChildEditArea`. | Target child baseline | The exact original child value is known for cleanup and comparison. |
| Apply the change shown for `ChildEditArea`. | Unique name/subtitle; non-overlapping future times; or inventory increase from `20` to `30` | The selected child control accepts the new value. |
| Save once. | None | The child saves successfully without creating another event. |
| Return through **Manage Events** and reopen the same child. | Target child | The selected child value persists after a fresh read. |
| Reopen the recurring parent. | **Comparison:** Recorded parent settings and all child dates | Parent-owned settings remain unchanged. For EventDateTime, the parent's date range reflects the earliest start and latest end of its children; a changed outer date is expected, not an unwanted edit. |
| Reopen the untouched sibling. | Sibling child | The sibling retains its recorded value and was not accidentally edited. |
| Restore the target child's original value and save. | **Original value:** Recorded baseline | The child is restored, the sibling remains unchanged, and the parent date range again matches its children. |

### SPT-769: Dashboard - Events - Generate an event from a template

**Description:**

Validates organizer-visible template generation. A superuser creates or updates a template, generates an event for a future date, and confirms that the generated event receives the expected template configuration while the source remains a Template. Backend-only attempts to force template status changes are excluded; SPT-5072 verifies the restricted Dashboard navigation.

| TemplateShape | Template Setup | Generated Proof |
| --- | --- | --- |
| SingleEvent | One event time and one ticket type | One active single event with copied details and ticket type. |
| PasswordProtectedSingleEvent | Single event plus one active event password | Generated event has the copied password configuration. |
| RecurringEvent | Three template occurrences and one parent ticket type | One active recurring parent with three children and propagated ticket type. |
| EditedSingleEvent | Save a single-event template, then change its description and ticket price before generation | Generated event uses the latest edited values, not the template's earlier version. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* A superuser is signed in and can manage events for the venue.
* The venue supports recurring events for `RecurringEvent`.
* A unique template name, future generation date, saved location, and no-sales cleanup plan are available.

**Postconditions:**

* Archive the generated event or series only after confirming it has no sales.
* Keep or archive the test template according to the test environment's data policy.

**Tags:** dashboard, events, create-event

**Parameters:**

TemplateShape: SingleEvent, PasswordProtectedSingleEvent, RecurringEvent, EditedSingleEvent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Manage Events**, open the Templates view and select **Create Event Template**. | Selected venue | The template form opens for the superuser. |
| Configure the required template details for `TemplateShape`. | `QA Template <shape> <unique suffix>`; category; location; event time; General Admission price `20.00`, inventory `30` | The template setup is accepted. |
| Add the shape-specific setup from the Description. | Password or three recurring occurrences when required | The selected optional configuration is visible before saving. |
| Save the event template once. | None | One template is saved with Template status. |
| Return to the Templates view and reopen **Edit**. | Unique template name | The template status, base details, ticket type, and shape-specific setup persist. |
| For `EditedSingleEvent`, change the template description and ticket price, save, leave, and reopen it. | Description `Edited before generation <suffix>`; price `25.00` | The latest edited values persist before generation. |
| Select **Generate Events** and choose one future generation date. | Future date unique to this run | The generation request is accepted once. |
| Return to the active Manage Events list and find the generated event. | Template name and chosen date | One generated event or recurring parent appears separately from the source template. |
| Open the generated event and compare it with the template. | Selected `TemplateShape` row | Event details, location, ticket type, and the expected password or recurrence structure were copied. |
| Reopen the source through the Templates view. | Source template | The source still has Template status and was not converted or overwritten. |

### SPT-4299: Dashboard - Events - Save a former recurring event that retains archived child references

**Description:**

Validates the source-backed regression where archived child IDs can remain in an update payload after the former parent has already been converted to a normal event through an internal test setup operation. This is not the organizer conversion workflow covered by SPT-4879; the proof is that a later ordinary Dashboard edit saves without incorrectly treating archived children as active recurrence.

| Platform | View |
| --- | --- |
| Admin | Desktop |
| Dashboard | Desktop |

**Preconditions:**

* An authorized internal tester can prepare the test setup in Showpass Admin.
* A test recurring parent exists with exactly three children and no sales.
* Record the parent name, subtitle, recurrence state, and child IDs.

**Postconditions:**

* Restore or remove the internal test setup according to the test environment's data policy.
* No active child event or duplicate event remains.

**Tags:** dashboard, events, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Showpass Admin, archive all three child events belonging to the test parent. | Recorded child IDs; Visibility: Archived | Each intended child is archived and no unrelated child is changed. |
| Through the approved internal test setup operation, set the parent recurrence flag to false while retaining the archived child records. | Exact test parent ID | The parent is now a normal event; the archived children remain recorded for the regression setup. |
| In Dashboard **Manage Events**, find and open **Edit** for the former parent. | Parent event name | The event opens as a normal event without exposing active recurring occurrences. |
| Change only the subtitle. | `Archived-child regression <unique suffix>` | The subtitle is accepted without changing event dates, ticket types, or child records. |
| Save once. | None | The save succeeds without a recurring-parent validation error. |
| Return through **Manage Events** and reopen **Edit**. | Same event | The new subtitle persists and the event remains non-recurring. |
| Verify the archived child test setups in Showpass Admin. | Recorded child IDs | The same children remain archived; no active or duplicate children were created. |

### SPT-4879: Dashboard - Events - Block unsafe recurring-event conversions

**Description:**

Validates one unsafe recurrence conversion per run. The selected event must remain in its original state after the blocked save, with no new, removed, or reactivated child events.

| RecurringGuardrail | Fixture | Attempt | Expected Result |
| --- | --- | --- | --- |
| PurchasedEventToRecurring | Single event with one completed purchase | Select a recurring schedule and add occurrences | Conversion is blocked because the event has a previous purchase. |
| DoorsOpenEventToRecurring | Single event with a saved Doors Open time | Select a recurring schedule and add occurrences | Conversion is blocked because recurring parents cannot retain Doors Open time. |
| ActiveChildrenToSingleEvent | Recurring parent with at least two active children | Change Repeat Event to None | Conversion is blocked until all child events are deleted. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer can edit events.
* A prepared event exists for each `RecurringGuardrail` row.
* Record the original recurrence setting, dates, sales state, Doors Open value, and child IDs.

**Postconditions:**

* Do not change or delete the protected test setups.
* Confirm that each attempted conversion left its original event state unchanged.

**Tags:** dashboard, edit-event, edge-case

**Parameters:**

RecurringGuardrail: PurchasedEventToRecurring, DoorsOpenEventToRecurring, ActiveChildrenToSingleEvent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Manage Events**, open **Edit** for the test setup named by `RecurringGuardrail`. | Selected scenario row | The event opens with its recorded original recurrence state. |
| Apply only the conversion attempt shown in the scenario row. | Selected recurrence change | The form shows the requested change but does not yet alter saved event state. |
| Select **Save** once. | None | The save is blocked with an actionable reason matching the selected guardrail. |
| Return through **Manage Events** and reopen the event. | Same test setup | The original recurrence setting, dates, Doors Open value, and sales state remain unchanged. |
| For `ActiveChildrenToSingleEvent`, expand the parent. | Recorded child IDs | Every original child remains present and no child was deleted, duplicated, or reactivated. |
