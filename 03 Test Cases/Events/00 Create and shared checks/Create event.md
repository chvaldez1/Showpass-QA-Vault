---
title: Event — Create event
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Create event

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration notes

SPT-764 below is locally updated for native staged creation: Create event saves a draft and opens Basic info; Tickets is a separate page; Overview → Publish or schedule opens publication. The remaining existing cases still describe the legacy full form. Do not execute their Show Advanced Settings / Save Draft / immediate Publish instructions against native pages unchanged. Their required-field, incomplete-draft and recurring proof targets remain required, but the native click paths and setup need adaptation before those cases are migration-ready. In particular, the new create form requires basic identity, location and schedule before creating a draft; an old placeholder draft is a separate prepared record.

Sources: [backend create/update validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [native draft creation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-create/hooks/useEventCreateDraft.ts>), [publication page and confirmation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/publication/ui/pages/EventPublicationPage.web.tsx>), [Overview publish entry](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/overview/ui/components/EventOverviewReadinessCard/EventOverviewReadinessCard.web.tsx>).

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-764](https://app.qase.io/case/SPT-764) | Create / Edit Events (84) | Locally enhanced for native creation; not pushed |
| [SPT-4874](https://app.qase.io/case/SPT-4874) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-5073](https://app.qase.io/case/SPT-5073) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-4876](https://app.qase.io/case/SPT-4876) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |

### SPT-764: Dashboard - Events - Create and publish a single-day event

**Local enhancement:** Proposed Next.js steps replace the legacy one-page flow. Qase is unchanged.

**Description:** Create one single-day event with its name, images, description, category, tags, location, timezone, doors-open time and ticket requirement. Confirm the initial event is a draft, then publish it and check the saved details and public ticket experience.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The employee has Manage Events permission for the selected organization. No event-approval workflow is configured.
* The native Create event and event-management pages are enabled. A saved physical location is available.
* Use an event created only for testing; do not share its link with customers.
* Have a 1200 × 600 banner and a 1080 × 1080 square image, each JPG or PNG and smaller than 3 MB.
* Use one date at least two days in the future, in the organization's timezone.

**Postconditions:** Delete only the event created by this case after confirming it has no orders. If it unexpectedly has an order, stop cleanup and report it; do not delete or refund that order.

**Tags:** dashboard, events, create-event

**Parameters:**

TicketRequirement: TicketsRequired, FreeEventTicketsNotRequired
View: Desktop, Mobile

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the selected View, open Dashboard → Events and select Create event. | **Organization:** Selected organization | The create form opens for the correct organization and fits the screen. |
| Complete the event name, category and location, and choose a single date rather than recurring dates. | **Event name:** Single-day creation followed by the current date and time<br>**Category:** Select one available category and record its label<br>**Location:** Saved physical location<br>**Timezone:** Organization timezone<br>**Start:** 7:00 PM on the selected future day<br>**End:** 9:00 PM that same day | Required fields accept the values and the schedule contains one occurrence. |
| Select Create event once. | | Basic info opens for the new event. The event is a draft, not yet published. |
| In Basic info, add the images, description and tags. | **Banner:** Prepared 1200 × 600 image<br>**Square:** Prepared 1080 × 1080 image<br>**Description:** Single-day creation check<br>**Tags:** qa-single-day and one unique tag using the event name | Image previews, description and tags appear without validation errors. |
| Open the date-and-time options and set Doors open. Save changes. | **Doors open:** 6:00 PM on the event day | The save completes with doors before the 7:00 PM start and the 9:00 PM end unchanged. |
| Open Tickets and configure the selected TicketRequirement. Save the page. | **TicketsRequired:** Tickets Required; public General Admission ticket; inventory 25; price 25.00; sales open now until event start<br>**FreeEventTicketsNotRequired:** Free Event - Tickets Not Required | Ticket settings save. TicketsRequired has one public ticket; FreeEventTicketsNotRequired does not require a purchasable ticket. |
| Leave the event and reopen it from Events. Inspect Basic info and Tickets. | **Event:** The unique event created above | Exactly one event exists, still a draft. Name, images, description, category, tags, location, timezone, doors, start/end and ticket requirement match the entered values. |
| Open Overview and select Publish or schedule. Choose Publish now, then confirm Publish now. | **Event:** Same single-day event | Publication completes for the same event; it is not duplicated. |
| Return through Events and reopen the event. | | The event is published and its saved settings remain unchanged. |
| Open its public event page in the selected View. | **Expected details:** Same name, banner, description, date, 7:00 PM start, 6:00 PM doors and physical location | The correct event and details appear without a broken narrow-screen layout. |
| Check the public ticket area without completing an order. | **TicketsRequired:** General Admission, price 25.00 and purchase action<br>**FreeEventTicketsNotRequired:** Free Event and tickets-not-required message | The public experience matches the saved requirement. No order or charge is created. |
| From Events, delete only this event after checking that it has no orders. Search again for its unique name. | **Cleanup target:** Exact event created above | The test event is removed; other events remain unchanged. |

### SPT-4874: Dashboard - Events - Block publishing until required event details are valid

**Description:**

Validates one publish-blocking condition per run. The case starts from an otherwise valid event setup, submits the selected invalid value, proves that no unusable active event was created, then corrects the value and proves that the same event can publish successfully. Recurring create validation moved here from SPT-4876 so that SPT-4876 remains a clean recurring-parent creation case.

| ValidationScenario | Invalid Setup | Expected Validation |
| --- | --- | --- |
| MissingEventName | Leave Event Name empty | Event Name is required. |
| MissingCategory | Select no category | A category is required. |
| MissingLocation | Select no event location | A valid location is required. |
| InvalidDateOrder | End is before start | The event time range is rejected. |
| DraftPlaceholderPublish | Reopen a draft that still uses its generated placeholder name, location, or link | The draft cannot become active until placeholder values are replaced. |
| RecurringOneOccurrence | Select a recurring schedule with only one occurrence | At least two occurrences are required. |
| RecurringDuplicateDates | Configure two occurrences with the same start or end | Duplicate occurrence dates are rejected. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer is signed in and can create, edit, and publish events.
* The venue has a saved location and no active event-approval workflow.
* The venue allows recurring events for the recurring scenarios.
* A unique event suffix and valid future event times are available.
* `DraftPlaceholderPublish` uses a test incomplete draft created through **Save Draft**.

**Postconditions:**

* Delete the corrected test event after confirming that it has no sales.
* No active event remains from the invalid submission.

**Tags:** dashboard, create-event, events

**Parameters:**

ValidationScenario: MissingEventName, MissingCategory, MissingLocation, InvalidDateOrder, DraftPlaceholderPublish, RecurringOneOccurrence, RecurringDuplicateDates

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Create Event**, or reopen the prepared draft for `DraftPlaceholderPublish`. | Selected scenario test setup | The full event form opens for the intended event. |
| Complete a valid event setup except for the field identified by `ValidationScenario`. | Unique name; one category; saved location; timezone; future start/end; Free Event - Tickets Not Required; recurring controls when required | Every non-target field is valid and retained in the form. |
| Apply the selected invalid setup. | Selected scenario row | The target field shows the intended invalid or placeholder value. |
| Select **Publish** once. | None | Publication is blocked with an actionable message tied to the invalid field; no success redirect occurs. |
| Review the other values still shown in the form. | Previously entered valid values | Valid entries remain available for correction instead of being cleared. |
| Return to **Manage Events** only if the invalid test setup already existed as a draft. | Attempted event name | The event is not Active; a prepared test setup remains Draft. |
| Correct only the selected invalid value. | Valid replacement from the scenario table | The blocking validation clears without losing the other event details. |
| Select **Publish** once. | None | The event saves once and becomes Active. |
| Return to **Manage Events**, reopen **Edit**, and verify the corrected field. | Published event | The event appears once and all corrected values persist after a fresh read. |

### SPT-5073: Dashboard - Events - Save, reopen, and publish an incomplete draft

**Description:**

Validates that an organizer can save an event before all publish requirements are complete, reopen that draft later, add the missing publish data, and publish it without losing the original draft values.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The organizer is signed in and can create and edit events.
* The venue has a saved test location and no active event-approval workflow.
* A unique event suffix is available.
* The test draft must not receive orders or sales.

**Postconditions:**

* Delete or archive the test event only after confirming that it has no sales.
* Confirm that it no longer appears in the active Manage Events list.

**Tags:** dashboard, create-event, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Dashboard, select **Events**, then **Create Event**. | Selected venue | The form shows **Save Draft** and **Publish**. |
| Enter a unique event name and select the saved location. | `QA Draft <unique suffix>` | The name and location are accepted. |
| Add future start and end times and select **Free Event - Tickets Not Required**. | Start at least two days ahead; end two hours later | The schedule and ticket requirement are accepted. |
| Leave Category empty and select **Save Draft** once. | No category | One event is saved as Draft even though it is not ready to publish. |
| Return to **Manage Events** and find the event. | Unique draft name | The event appears once with Draft status. |
| Reopen **Edit** for the draft. | Draft event | The saved name, location, schedule, and free-event choice remain populated. |
| Change the event name, enter a unique public link name, and select a category. | `QA Published <unique suffix>`; unique link; one category | The missing publish requirement is satisfied and the edited values are accepted. |
| Select **Publish** once. | None | The event becomes Active without creating a second event. |
| Leave the page, return through **Manage Events**, and reopen **Edit**. | Published event | Active status and every draft or edited value persist after a fresh read. |
| Open **View Event**. | Published event | The public page shows the saved name, schedule, location, and Free Event message. |
| Return to **Edit**, remove the test event using the available no-sales cleanup action, and confirm. | Exact unique event name | Only the test event is removed or archived. |
| Return to **Manage Events** and search for the unique name. | Test event name | The event is absent from the active list. |

### SPT-4876: Dashboard - Events - Create and publish a recurring event

**Description:**

Validates recurring-parent creation only. Each run creates one parent with three future occurrences, publishes it directly or through Draft according to the selected scenario, and proves that the parent, child dates, and propagated ticket type survive a fresh read. Editing a child event is intentionally excluded and covered by SPT-5082.

| RecurringCreationScenario | Repeat Event Choice | Save Flow | Occurrences |
| --- | --- | --- | --- |
| HourlyDirectPublish | Hourly | Publish | Three hourly occurrences |
| DailyDraftThenPublish | Daily | Save Draft, reopen, Publish | Three daily occurrences |
| WeeklyDirectPublish | Weekly | Publish | Three weekly occurrences |
| MonthlyDirectPublish | Monthly | Publish | Three monthly occurrences |
| CustomDirectPublish | Custom | Publish | Three distinct future start/end pairs |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The organizer can create and publish events.
* The venue allows recurring events, has a saved location, and has no active event-approval workflow.
* Use a unique test series name and occurrence dates with no sales.

**Postconditions:**

* Archive or remove the test series only when the parent and every child have no sales.
* Confirm that no duplicate parent or child occurrence remains active.

**Tags:** dashboard, events, create-event

**Parameters:**

RecurringCreationScenario: HourlyDirectPublish, DailyDraftThenPublish, WeeklyDirectPublish, MonthlyDirectPublish, CustomDirectPublish

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Create Event** and show the full event settings. | Selected venue | Basic Info, Location & Info, Event Date & Time, and Ticket Types are available. |
| Enter the required parent details. | `QA Recurring <scenario> <unique suffix>`; one category; saved location; venue timezone | The parent details are accepted. |
| Under **Event Date & Time**, select the Repeat Event choice shown for `RecurringCreationScenario`. | Selected scenario row | The matching recurrence controls and occurrence preview appear. |
| Configure exactly three valid future occurrences. | Scenario schedule; each end after its start; no duplicate dates | Three distinct occurrence rows are displayed without validation. |
| Add one public parent ticket type. | General Admission; price `20.00`; inventory `30` | The parent ticket type is accepted. |
| Complete the selected save flow. | Direct Publish or Save Draft, reopen, then Publish | One recurring parent is saved and becomes Active; the draft flow retains its three occurrences before publication. |
| Return through **Manage Events** and expand the recurring parent. | Unique series name | One parent is listed with exactly three child events in chronological order. |
| Reopen **Edit** for the parent. | Recurring parent | The selected recurrence type, all three dates, and the parent ticket type persist after a fresh read. |
| Open each child without editing it. | Three child events | Each child has the expected date and a General Admission ticket type derived from the parent. |
| Open **View Event** for the parent. | Recurring parent | The public experience lists or lets the customer select the three expected occurrences. |
