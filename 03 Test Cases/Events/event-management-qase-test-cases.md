---
title: Event Management Qase Test Cases
date: 2026-08-24
tags:
  - qa/test-cases
  - qase
  - events
aliases:
  - Event Management Existing and New Qase Cases
  - Event Management Existing Qase Gap Analysis
  - Event Management New Qase Gap Analysis Cases
  - Event Overview New Qase Cases
  - Event Management Core Qase Updates
---

# Event Management Qase Test Cases

> [!success] Canonical merged case set
> This note contains 51 unique Qase cases from the prior existing-case refactors and new-case drafts. Every case uses its real Qase ID and is grouped by its current Qase suite. SPT-5073 appears once using the later verified refactor.

The section names and parent relationships follow the current Qase structure and the assignments in [[03 Test Cases/Events/event-management-csv-to-qase-test-case-map|Event Management CSV to Qase Test Case Map]]. The consolidated source-backed analysis and audit history follows the case set.

## Suite Index

| Qase Section | Parent Suite | Cases | Qase IDs |
| --- | --- | ---: | --- |
| Event Overview (1053) | Events (79) | 1 | SPT-5071 |
| Create Events — Direct Cases (80) | Events (79) | 3 | SPT-5072, SPT-5079, SPT-5080 |
| Create / Edit Events (84) | Create Events (80) | 16 | SPT-764, SPT-775, SPT-4874, SPT-5073, SPT-4876, SPT-5082, SPT-5075, SPT-769, SPT-786, SPT-5074, SPT-5077, SPT-780, SPT-782, SPT-783, SPT-3300, SPT-4877 |
| Google Events - Event Categories (81) | Create / Edit Events (84) | 2 | SPT-745, SPT-749 |
| Ticket Types (83) | Create / Edit Events (84) | 9 | SPT-758, SPT-759, SPT-760, SPT-766, SPT-768, SPT-770, SPT-4063, SPT-4384, SPT-4875 |
| Delivery Settings (448) | Ticket Types (83) | 4 | SPT-3275, SPT-3276, SPT-3277, SPT-3278 |
| Order Form & Custom Questions (446) | Create / Edit Events (84) | 12 | SPT-3247, SPT-3248, SPT-3249, SPT-3251, SPT-3252, SPT-3253, SPT-3261, SPT-3262, SPT-3263, SPT-3264, SPT-3268, SPT-4878 |
| Edge Cases (820) | Create / Edit Events (84) | 3 | SPT-4299, SPT-4879, SPT-5076 |
| Advanced Options (1049) | Create / Edit Events (84) | 1 | SPT-5078 |

## Scope Notes

- Financial Settings and internal/organizer fees remain presence-only in SPT-5072; their specialist cases are not copied here.
- Map Editor remains presence-only in SPT-5072; seat-map creation and seat assignment cases stay in suite 82.
- Branding, Email Customization, Tracking Links, Email Guests, Attraction Configuration, Transactions, Check In, and other destination suites remain mapped in the CSV-to-Qase note and are not duplicated here.
- Workflow Approval remains outside this feature-parity scope.
- The unsupported create-event wizard remains deferred until product support is confirmed.

## Event Overview (1053)

### SPT-5071: Dashboard - Event Overview - Verify totals for single and recurring events

**Description:**

Checks that Event Overview matches known sales, ticket, and check-in activity. The same steps cover both event types; only the details table changes.

| EventType | Event Setup | Expected Details |
| --- | --- | --- |
| SingleEvent | Two standard ticket types and one payment-plan ticket type | Ticket Type Breakdown lists each standard ticket type; the payment-plan ticket type is not listed |
| RecurringParent | At least two child events with different dates and results | Events lists each child with its date, status, Check In link, sold tickets, inventory, and net revenue |

Current Angular reference: /dashboard/events/{slug}/manage/#/overview. This is reference information only and is not required in the steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in and can manage the selected event.
* The event for EventType has the setup shown in the Description.
* Expected sales, net revenue, redeemable tickets, checked-in tickets, and row values are recorded from Dashboard Transactions and Check In.

**Postconditions:** No data is changed.

**Tags:** dashboard, events, reports

**Parameters:**

EventType: SingleEvent, RecurringParent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Dashboard, open Manage Events and select Overview for the event named in the test data. | Event for EventType | Event Overview shows the correct event name, ID, status, and time information. |
| Compare the summary cards with the recorded values. | Net Sales, Net Revenue, Redeemable Tickets, Checked In | Every summary value matches the recorded activity for the selected event. |
| Review the details table shown for the selected event type. | Expected Details from the Description | The correct table and rows appear with the recorded values. |
| Select the first sortable column twice. | Ticket Type for SingleEvent; Date for RecurringParent | The rows sort in both directions without changing their values. |
| For RecurringParent, open Check In for one child event. | RecurringParent only; no action for SingleEvent | Check In opens for the named child event. |

## Create Events — Direct Cases (80)

### SPT-5072: Dashboard - Event Management - Show the right pages for each event type

**Description:**

Checks that organizers see pages that make sense for the selected event. A draft cannot use Check In, a recurring child does not show settings controlled by its parent, and a template only shows template actions.

| EventType | What Should Be Available | What Should Not Be Available |
| --- | --- | --- |
| PublishedEvent | Overview, Edit, Manage, Promote, Reports, and View Event | No main group is hidden because of the event type; individual pages still depend on venue setup and employee permissions |
| DraftEvent | Overview, Edit, Manage, Promote, Reports, View Event, and Transactions for an employee with financial or Box Office access | Email Guests, Check In, Waitlist, and Attraction Configuration |
| RecurringChild | Edit; Email Customization, Branding, Email Guests, Transactions, Check In, and Waitlist when available | Overview, Promote, Reports, View Event, Financial Settings, Assigned Seating, Edit Sellers, Attraction Configuration, Live Stream, Publish Approval, and parent-only Advanced Options |
| EventTemplate | Generate Events and Edit | Overview, Manage, Promote, Reports, and View Event |

For a published event, Financial Settings and Assigned Seating are presence checks only. Stop after confirming that each page or section is available.

Current Angular reference: /dashboard/events/{slug}/manage/ and its hash-based pages. These links may change during the Next.js migration; the visible page names and user flow are what this case protects.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in and can manage events.
* One event exists for each EventType.
* The published event has the permissions and setup needed to show Financial Settings, Assigned Seating, Transactions, and Check In.

**Postconditions:** No data is changed.

**Tags:** dashboard, events, edit-event

**Parameters:**

EventType: PublishedEvent, DraftEvent, RecurringChild, EventTemplate

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Dashboard, open Manage Events. | None | The event named for the selected EventType is listed. |
| Open the available actions for that event. | Selected EventType | The actions match the Description. |
| Open the event's management page. | Selected event | The page shows the correct event name and expected main groups. |
| Compare the visible page names with the Description. | Selected EventType | Expected pages are available and pages that do not apply are not shown. |
| Open one available page from each visible main group. | Edit, Manage, Promote, and Reports when available | Each selected page opens for the same event. |
| For PublishedEvent, open Transactions, Check In, and View Event. | Selected published event | Each destination opens for the selected event; no other event is selected. |
| Select Manage All Events. | None | The organizer returns to Manage Events. |

### SPT-5079: Dashboard - Edit Sellers - Save event seller access

**Description:**

Checks that employee and affiliate-venue seller access can be changed for one event ticket type without changing another ticket type or another event.

An affiliate venue is another organizer allowed to sell tickets for the event.

| SellerType | Change | What Should Remain Saved |
| --- | --- | --- |
| Employee | Enable one disposable employee and set a sales limit | Employee is enabled only for the selected ticket type with the saved limit |
| AffiliateVenue | Add one test affiliate venue, choose payment access, and set a sales limit | Affiliate venue is enabled only for the selected ticket type with the saved choices |

Current Angular reference: /dashboard/events/{slug}/manage/#/ticket-sellers. This is reference information only and is not required in the steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer owns a published, non-recurring test event with two ticket types.
* A disposable employee and a test affiliate venue are not enabled for the first ticket type.
* No live sales depend on the seller access being changed.

**Postconditions:**

* Remove the employee or affiliate access added by this test.
* Reopen Edit Sellers and confirm that the temporary access is gone.

**Tags:** dashboard, events, employee-permissions

**Parameters:**

SellerType: Employee, AffiliateVenue

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the test event, expand Manage, and select Edit Sellers. | Test event | Edit Sellers shows the correct event and both ticket types. |
| Find the first ticket type and enable the seller named for SellerType. | Disposable employee or test affiliate venue | The seller is enabled for the first ticket type only. |
| Set the seller's sales limit. | 5 tickets | The page shows a five-ticket limit. |
| For AffiliateVenue, choose one supported payment option. | Reversible non-default option | The payment choice saves without changing the event owner's access. |
| Leave Edit Sellers and reopen it. | Same event | The seller, limit, and payment choice are still shown for the first ticket type and not the second. |
| Open Edit Sellers for a different test event. | Second event | The temporary seller access is not applied to the other event. |
| Remove the temporary seller access. | Selected SellerType | The seller returns to its original state after reopening Edit Sellers. |

### SPT-5080: Dashboard - Event Stats & Info - Verify event reporting

**Description:**

Checks that Stats & Info shows the correct information for a single event and a recurring parent. SPT-4288 remains the separate test for revenue realization after settlement.

| EventType | What Should Be Shown |
| --- | --- |
| SingleEvent | Summary totals, date filter, quantity, revenue and check-in charts, ticket-type rows, payment-type breakdown, and summary report |
| RecurringParent | Combined totals, date filter, quantity and revenue charts, child-event rows, payment-type breakdown, and summary report |

Current Angular reference: /dashboard/events/{slug}/manage/#/stats. This is reference information only and is not required in the steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer can view financial information for the selected event.
* The single event and recurring parent have known paid, free, checked-in, inventory, discount, gross-revenue, and net-revenue values recorded from Dashboard Transactions and Check In.
* The recurring parent has at least two child events with different dates and results.

**Postconditions:** No data is changed.

**Tags:** dashboard, events, reports

**Parameters:**

EventType: SingleEvent, RecurringParent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the test event, expand Reports, and select Stats & Info. | Event for EventType | Stats & Info opens for the correct event and shows the sections listed in the Description. |
| Compare the totals and visible rows with the recorded values. | Recorded Transactions and Check In values | Ticket, check-in, discount, gross-revenue, and net-revenue values match. |
| Choose a date range that contains only the recorded activity. | Recorded activity dates | The totals, charts, and rows update to include only that activity. |
| Switch between the available charts. | Quantity, Net Sales, and Check In when shown | Each chart loads and keeps the selected event and date range. |
| Sort one available table column twice. | Ticket Type for SingleEvent; Event for RecurringParent | The rows sort in both directions without changing their values. |
| Confirm that the summary report can be opened or downloaded. | Same event and date range | The summary report action is available for the selected event. |

## Create / Edit Events (84)

### SPT-764: Dashboard - Events - Create and publish a single-day event

**Description:**

Validates that an organizer can create and publish a single-day event with its name, images, description, category, tags, location, timezone, start time, **Event Doors Open** time, end time, and ticket requirement. The case uses either a sellable public ticket type or **Free Event - Tickets Not Required**, then confirms the created values survive a fresh Dashboard read and appear correctly to customers.

This case is create-focused. SPT-5077 owns changes made after an event already exists.

Sources reviewed:

* `apps/main/templates/tickets/events/partials/__create-form.html`
* `apps/tickets/api/venue_based/serializers/serializers.py`
* `apps/tickets/models/event_management/event.py`

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The organizer is signed in to the Dashboard and can manage events for the selected venue.
* The selected venue has no active event-approval workflow, so the **Publish** button is available.
* The selected venue has at least one saved event location.
* Valid banner and square image files are available. Each file is smaller than 3 MB.
* Use a unique disposable event name and three future times on the same day: Doors Open, Event Starts, and Event Ends.
* The disposable event must not receive orders or ticket sales.

**Postconditions:**

* The disposable event is deleted after Dashboard and public verification.
* No order, transaction, or ticket exists for the disposable event.

**Tags:** dashboard, events, create-event

**Parameters:**

TicketRequirement: TicketsRequired, FreeEventTicketsNotRequired
View: Desktop, Mobile

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the selected `View`, open the Dashboard Events area and select **Create Event**. | Selected venue; `View` | The Create Event form opens for the selected venue and its controls are usable in the selected view. |
| Select **Show Advanced Settings**. | None | The full event form shows sections including Basic Info, Location & Info, Event Date & Time, and Ticket Types. |
| In **Basic Info**, complete the event identity and customer-facing content. | Event Name: `QA Single-Day Event <unique suffix>`<br>Banner Image: valid 1200 x 600 image smaller than 3 MB<br>Square Image: valid 1080 x 1080 image smaller than 3 MB<br>Description: `Single-day creation check <unique suffix>`<br>Category: one available general category<br>Tags: `qa-single-day`, `qa-<unique suffix>` | The name, both image previews, description, category, and both tags remain visible with no validation message. |
| In **Location & Info**, select the saved physical location and confirm the event timezone. | Location: existing saved location<br>Online Event: Off<br>Timezone: venue timezone | The selected location and timezone appear in the form, and the event is not marked as online. |
| In **Event Date & Time**, configure one occurrence on one future day. | Repeat Event: None<br>Event Doors Open: 6:00 PM<br>Event Starts: 7:00 PM on the same day<br>Event Ends: 9:00 PM on the same day<br>Use a date at least two days in the future | The form shows one occurrence in the event timezone. Doors Open is before Event Starts, and Event Starts is before Event Ends. |
| In **Ticket Types**, configure the selected `TicketRequirement`. | `TicketsRequired`: select **Tickets Required** and set Ticket Name `General Admission`, Inventory `25`, Price `25.00`, and public visibility.<br>`FreeEventTicketsNotRequired`: select **Free Event - Tickets Not Required**. | `TicketsRequired`: the completed public ticket row remains visible.<br>`FreeEventTicketsNotRequired`: ticket-entry fields are hidden because customers do not need tickets. |
| Select **Publish** once. | None | The form shows a successful save message and redirects to management for the newly created event without a validation error. |
| Select **Manage All Events**, then find the event by its unique name. | Disposable event name | The published event appears once with the expected name and event time. |
| Open the event's **Edit** page from Manage Events and inspect the saved values without changing them. | Disposable event | A fresh form load shows the saved name, both images, description, category, tags, location, timezone, Doors Open, start, end, and selected ticket requirement. |
| Open **View Event** for the disposable event in the selected `View`. | `View` | The public event page opens for the same event and shows its name, banner image, description, date, 7:00 PM start time, 6:00 PM **Doors Open** time, and location without a broken mobile layout. |
| Verify the public ticket experience for the selected `TicketRequirement`. | `TicketsRequired`: review the ticket area.<br>`FreeEventTicketsNotRequired`: review the free-event message. | `TicketsRequired`: **General Admission**, its price, and a ticket-purchase action are available.<br>`FreeEventTicketsNotRequired`: the page identifies a **Free Event** and states that tickets are not required. |
| Return to the disposable event's **Edit** page. | Disposable event | The correct event is open and the **Delete Event** control is available. |
| Select **Delete Event** and confirm deletion. | Delete only `QA Single-Day Event <unique suffix>` | The event is deleted without affecting any other event. |
| Return to **Manage All Events** and search for the disposable event name. | Disposable event name | The deleted event no longer appears in the event list. |

### SPT-775: Dashboard - Events - Generate and validate an event's public link

**Description:**

Validates automatic and custom public-link generation for draft and published events. Each run uses one `PublicLinkScenario` from the table so the tester knows the exact event name, save action, and expected result. Current Angular link handling is referenced in `EventCreate.js`; visible Dashboard controls, not the legacy route shape, are the test contract.

| PublicLinkScenario | Event Name / Public Link Name | Save Action | Expected Result |
| --- | --- | --- | --- |
| AlphanumericNameDraft | `QA Summer Market <unique suffix>` / leave blank | Save Draft | A non-empty normalized link is generated and persists on reopen. |
| AlphanumericNamePublished | `QA Winter Concert <unique suffix>` / leave blank | Publish | A non-empty normalized link is generated and opens the published event. |
| NumericNamePublished | `<unique digits>` / leave blank | Publish | A unique usable link is generated; a collision suffix may be added. |
| SpecialCharactersPublished | `QA !@# <unique digits>` / leave blank | Publish | Unsupported characters are removed and the generated link remains non-empty and usable. |
| NormalizeCustomLink | Valid event name / `QA Custom Link <unique suffix>` | Publish | The saved link is lowercase and hyphenated. |
| RejectDuplicateCustomLink | Valid event name / link already used by another event | Publish | Save is blocked and the existing event keeps its link. |
| RejectReservedCustomLink | Valid event name / `site` | Publish | Save is blocked because the link name is reserved. |
| EditCustomLink | Existing published event / new unique custom link | Save | The new link persists and the Dashboard warns that the old link will break. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The organizer is signed in and can create and edit events.
* The venue has a saved location and does not require event approval.
* A reusable valid event setup and unique suffix are available.
* For `RejectDuplicateCustomLink`, a disposable event already owns the test link.
* For `EditCustomLink`, a disposable published event exists without sales.

**Postconditions:**

* Delete successful disposable events only after confirming that they have no sales.
* Leave the pre-existing duplicate-link fixture unchanged.

**Tags:** dashboard, events, create-event

**Parameters:**

PublicLinkScenario: AlphanumericNameDraft, AlphanumericNamePublished, NumericNamePublished, SpecialCharactersPublished, NormalizeCustomLink, RejectDuplicateCustomLink, RejectReservedCustomLink, EditCustomLink

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Use the row for the selected `PublicLinkScenario` to identify the required fixture, event name, public link name, and save action. | Selected scenario row | The required unique data or existing disposable event is available. |
| For `EditCustomLink`, open **Edit** for the existing event. For every other scenario, select **Create Event**. | Selected scenario | The correct event form opens. |
| Complete all required event fields and select **Free Event - Tickets Not Required**. | Saved location; one category; future start and end | The form has no unrelated blocking validation. |
| Enter the event name and public link name specified by the scenario. | Selected scenario row | The form displays the entered values or an automatically generated link preview. |
| Select the scenario's save action once. | Save Draft, Publish, or Save | Successful scenarios save once. Duplicate and reserved custom links show actionable validation and do not redirect as if saved. |
| For a rejected scenario, return to **Manage Events** and search for the attempted event name. | Rejected event name | No new event was published, and the pre-existing link owner remains unchanged. |
| For a successful scenario, return to **Manage Events**, find the event, and reopen **Edit**. | Saved event name | The event appears once and the saved public link value survives a fresh read. |
| For a published successful scenario, open **View Event**. | Saved event | The public page opens using the saved normalized link and shows the correct event. |
| For `EditCustomLink`, compare the new and previous links after saving. | Previous link; new unique link | The new link opens the event, and the previous link no longer resolves to that event. |

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
* `DraftPlaceholderPublish` uses a disposable incomplete draft created through **Save Draft**.

**Postconditions:**

* Delete the corrected disposable event after confirming that it has no sales.
* No active event remains from the invalid submission.

**Tags:** dashboard, create-event, events

**Parameters:**

ValidationScenario: MissingEventName, MissingCategory, MissingLocation, InvalidDateOrder, DraftPlaceholderPublish, RecurringOneOccurrence, RecurringDuplicateDates

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Create Event**, or reopen the prepared draft for `DraftPlaceholderPublish`. | Selected scenario fixture | The full event form opens for the intended event. |
| Complete a valid event setup except for the field identified by `ValidationScenario`. | Unique name; one category; saved location; timezone; future start/end; Free Event - Tickets Not Required; recurring controls when required | Every non-target field is valid and retained in the form. |
| Apply the selected invalid setup. | Selected scenario row | The target field shows the intended invalid or placeholder value. |
| Select **Publish** once. | None | Publication is blocked with an actionable message tied to the invalid field; no success redirect occurs. |
| Review the other values still shown in the form. | Previously entered valid values | Valid entries remain available for correction instead of being cleared. |
| Return to **Manage Events** only if the invalid fixture already existed as a draft. | Attempted event name | The event is not Active; a prepared fixture remains Draft. |
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
* The disposable draft must not receive orders or sales.

**Postconditions:**

* Delete or archive the disposable event only after confirming that it has no sales.
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
| Return to **Edit**, remove the disposable event using the available no-sales cleanup action, and confirm. | Exact unique event name | Only the disposable event is removed or archived. |
| Return to **Manage Events** and search for the unique name. | Disposable event name | The event is absent from the active list. |

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
* Use a unique disposable series name and occurrence dates with no sales.

**Postconditions:**

* Archive or remove the disposable series only when the parent and every child have no sales.
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

### SPT-5082: Dashboard - Events - Edit one recurring child without changing its parent or siblings

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

* Restore the edited child value or remove the disposable recurring fixture if it has no sales.
* The parent and untouched sibling retain their original values.

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
| Reopen the recurring parent. | Parent event | Parent-owned setup and the parent's recorded value remain unchanged. |
| Reopen the untouched sibling. | Sibling child | The sibling retains its recorded value and was not accidentally edited. |
| Restore the target child's original value and save. | Recorded baseline | The disposable edit is cleaned up without changing the parent or sibling. |

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
* Keep or archive the disposable template according to the test environment's data policy.

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
* Record all source values and confirm that the source fixture can remain unchanged.
* The clone must not receive orders or sales.

**Postconditions:**

* Delete or archive only the cloned Draft after confirming it has no sales.
* Confirm that the source event and its sales history remain unchanged.

**Tags:** dashboard, events, create-event

**Parameters:**

Occurrence: SingleDay, Recurring

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Manage Events**, locate the source fixture and select **Clone**. | Source for `Occurrence` | The clone form opens with reusable source configuration prefilled. |
| Compare the prefilled clone form with the recorded source values. | Description, location, ticket type, password, custom question, and recurrence schedule when applicable | Reusable configuration is present; the clone has no saved event ID or source public link. |
| Give the clone a unique name and future dates. | `QA Clone <occurrence> <unique suffix>`; unused future dates | The new identity and dates are accepted without modifying the source form. |
| Select **Save Draft** once. | None | One separate Draft is created. |
| Return through **Manage Events**, find the clone, and reopen **Edit**. | Unique clone name | The clone appears once with Draft status and its own public link. |
| Verify copied configuration. | Recorded source configuration | Description, location, ticket type, event password, custom question, and recurring schedule when applicable persist on the clone. |
| Verify data that must not be copied. | Source event ID, public link, orders, transactions, tickets sold, Facebook identifiers, live-room state | The clone has a new identity and no source sales, transactions, social publishing state, or active room. |
| Change the clone subtitle and save. | `Independent clone <unique suffix>` | The change persists on the clone. |
| Reopen the source event. | Source fixture | The source subtitle, setup, recurrence structure, and sales history are unchanged. |
| Remove or archive the no-sales clone and return to **Manage Events**. | Exact clone name | Only the clone is removed from the active list; the source remains available. |

### SPT-5074: Dashboard - Event Management - Verify edit entry points

**Description:**

Checks that an authorized organizer can open and save the same event from each supported starting point.

| Scenario | Starting Point | Expected Result |
| --- | --- | --- |
| ManageEventsEdit | Manage Events → Edit | The event opens for editing and saving returns to Event Overview |
| EditSellersEditEvent | Event → Manage → Edit Sellers → Edit Event | The same event opens for editing and saving returns to Edit Sellers |

Current Angular references include /dashboard/events/{slug}/manage/#/edit, /dashboard/events/{slug}/edit-form/, and /dashboard/events/create-event-template/. They are reference information only and may change during the Next.js migration.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer can manage a published, unsold, non-recurring event at Venue A.
* The event's original subtitle is recorded.

**Postconditions:**

* Restore the original subtitle after an authorized scenario.
* Reopen Edit and confirm that the original subtitle is restored.

**Tags:** dashboard, edit-event

**Parameters:**

Scenario: ManageEventsEdit, EditSellersEditEvent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the organizer and follow the starting point shown in the Description. | Selected Scenario | The correct event opens for editing. |
| Confirm the event name and main Edit sections. | Selected event | Basic Info, Location & Info, Event Date & Time, Ticket Types, Legal Policies & Important Info, and Order Form are available. |
| Change only the event subtitle. | QA edit {unique-suffix} | The new subtitle is shown before saving. |
| Save the event. | None | The event saves once and returns to the page shown in the Description. |
| Reopen the event from the same starting point. | Selected Scenario | The changed subtitle is still shown. |

### SPT-5077: Dashboard - Edit Event - Save changes in every event section

**Description:**

Validates that an organizer can edit a published single-day event, save the changes, reopen the event, and see the saved values. Each run covers one event section selected through `EditScenario` and confirms the related customer-facing result when one exists.

Recurring-event behavior remains in its dedicated cases. Financial Settings and Workday Integration are presence checks only; detailed ticket pricing, waitlist, fees, donations, and order-form behavior also remains in their dedicated cases.

Current Angular reference: /dashboard/events/{slug}/manage/#/edit. This is reference information only and is not required in the steps.

| Platform  | View    |
| --------- | ------- |
| Dashboard | Desktop |
| Dashboard | Mobile  |

**Preconditions:**

- An organizer can manage a published, single-day event that is not a recurring child and has no orders or ticket sales.
- Record every original value before changing it.
- Use a venue and organizer that expose the fields required by the selected `EditScenario`.
- Two saved physical locations and two valid timezones are available for Location & Info.
- Valid replacement banner and square images are available; each file is smaller than 3 MB.
- The required artists, comedians, shows, teams, accommodation partners, charity, customer list, and feature flags are available for their matching scenarios.
- For `CustomDisplayFields`, Custom Display Fields is enabled, an integrated test page is available, and no field named **QA Contact** exists.
- For `AdvancedOptions`, no disposable QA password or report receiver from a previous run remains.

**Postconditions:**

- Restore every original event value changed by the selected scenario.
- Remove disposable ticket types, questions, custom display fields, passwords, report receivers, tags, and other records created by the run.
- Reopen Edit and confirm the event matches its original setup.

**Tags:** dashboard, events, edit-event

**Parameters:**

EditScenario: BasicInfoGeneral, BasicInfoGoogleThings, BasicInfoMusic, BasicInfoComedy, BasicInfoArts, BasicInfoSports, LocationPhysical, LocationOnline, EventDateAndTime, Accommodations, TicketTypes, EventTicketSettings, LegalPoliciesAndImportantInfo, OrderFormAndMessaging, CustomDisplayFields, CharitableDonations, FinancialSettingsPresence, AdvancedOptions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Manage Events**, select **Edit** for the published single-day test event. Execute only the step matching the selected `EditScenario`. For that step, record the original values, make the listed changes, save once, leave and reopen Edit, verify the saved result, restore the originals, save again, and reopen for a final cleanup check. | **EditScenario:** selected parameter value<br>**Event:** published single-day event with no sales<br>**Unique data:** unique suffix | The correct event opens. Only the matching scenario step is executed, and the other scenario steps are not applicable to this run. |
| For `BasicInfoGeneral`, open **Basic Info** and perform the scenario procedure. | **Event Name:** append `Edited`<br>**Sub-title:** `QA subtitle <suffix>`<br>**Desired event link:** `qa-edited-<suffix>`<br>**Banner Image:** valid replacement smaller than 3 MB<br>**Square Image:** valid replacement smaller than 3 MB<br>**Description:** `Edited description <suffix>`<br>**Categories:** select up to three<br>**Tags:** `qa-edit`, `qa-<suffix>`<br>**Visibility:** another allowed value<br>**Display on Calendar Widget:** opposite of original | Every changed value persists after reopening. The public page or Dashboard follows the selected visibility, shows the saved customer-facing details, and the new public link opens the same event. Original values and link are restored during cleanup. |
| For `BasicInfoGoogleThings`, open **Basic Info** and perform the scenario procedure. | **Google things to do categories:** another available selection<br>**Guided Tour:** opposite of original | Both selections persist after reopening and return to their original values during cleanup. |
| For `BasicInfoMusic`, open **Basic Info** and perform the scenario procedure. | **Category:** Music<br>**Headliner(s):** another available artist<br>**Supporting Artist(s):** another available artist<br>**Genres:** another available genre | The artists and genres persist in their correct roles after reopening and return to their original values during cleanup. |
| For `BasicInfoComedy`, open **Basic Info** and perform the scenario procedure. | **Category:** Comedy<br>**Headliner(s):** another available comedian<br>**Supporting Comedian(s):** another available comedian<br>**Add Comedian:** use only if the required comedian is unavailable | The comedians persist in their correct roles after reopening. Any disposable comedian created by the run is removed when supported, and the original event values are restored. |
| For `BasicInfoArts`, open **Basic Info** and perform the scenario procedure. | **Category:** Arts or Theatre<br>**Name:** another available show<br>**Add Show:** use only if the required show is unavailable | The show persists after reopening. Any disposable show created by the run is removed when supported, and the original event values are restored. |
| For `BasicInfoSports`, open **Basic Info** and perform the scenario procedure. | **Category:** Sports<br>**Home team:** another available team<br>**Away team:** a different available team<br>**Add Team:** use only if a required team is unavailable | Both teams persist in the correct home and away positions. Any disposable team is removed when supported, and the original event values are restored. |
| For `LocationPhysical`, open **Location & Info** and perform the scenario procedure. | **Location:** another saved physical location<br>**Online Event:** Off<br>**Timezone:** another valid timezone | Location, online status, and timezone persist. The intended local event times remain correct, and the original location and timezone are restored. |
| For `LocationOnline`, open **Location & Info** and perform the scenario procedure. | **Online Event:** On<br>**Timezone:** another valid timezone | Online Event and timezone persist without retaining a conflicting physical location. The original physical location, online status, and timezone are restored. |
| For `EventDateAndTime`, open **Event Date & Time** and perform the scenario procedure. | **Event Doors Open:** 6:30 PM<br>**Event Starts:** 7:30 PM on the same future day<br>**Event Ends:** 9:30 PM on the same day<br>**Repeat Event:** None<br>**Display date and time as To Be Determined:** On<br>**Hide event end time on downloaded tickets:** On | Doors Open is before Event Starts, and Event Starts is before Event Ends. All values persist; the public page displays To Be Determined and the event remains single-day. Original times and display choices are restored. |
| For `Accommodations`, open **Accommodations** and perform the scenario procedure. | **Event detail page accommodation partner:** another available partner<br>**Post-purchase email accommodation partner:** another available partner | Both partner selections persist after reopening and return to their original values during cleanup. |
| For `TicketTypes`, open **Ticket Types** and perform the scenario procedure. | **Ticket Name:** `QA Admission <suffix>`<br>**Inventory:** `30`<br>**Price:** `20.00`<br>**Visibility:** Public<br>**Waitlist:** opposite of original when enabled<br>**Ticket Type:** add one disposable ticket type<br>**Scope:** do not test price tiers, fee calculations, or detailed waitlist behavior | Every ticket-type value persists exactly once and the public ticket area follows the saved visibility. The disposable ticket type is removed and the original ticket types are restored. |
| For `EventTicketSettings`, open **Ticket Types** and perform the scenario procedure. | **Sale Starts On Time:** change when available<br>**Ticket Requirements:** Free Event <--> Paid Event<br>**Total Event Inventory:** valid limit when available<br>**Enable Event Inventory Threshold Displays:** opposite of original when available<br>**Show Remaining Tickets:** another valid amount when available<br>**Default End Sale Time:** another available choice<br>**No Ticket Types Message:** `QA no tickets message <suffix>`<br>**Ticket PDF Terms & Conditions:** `QA ticket terms <suffix>`<br>**Ticket PDF Custom Message:** `QA ticket message <suffix>` | Every event-level ticket setting persists. The public ticket area follows the saved ticket requirement, inventory display, sale timing, and customer-facing messages. All original event-level ticket settings are restored. |
| For `LegalPoliciesAndImportantInfo`, open **Legal Policies & Important Info** and perform the scenario procedure. | **Refund Policy:** `QA refund policy <suffix>`<br>**Require customers to accept terms & conditions before purchasing:** On<br>**Custom terms URL:** valid QA URL<br>**Important Info & Restrictions:** add `QA restriction <suffix>` | All values persist. Checkout requires terms acceptance, the saved terms URL opens, and the original policies and restrictions are restored. |
| For `OrderFormAndMessaging`, open **Order Form** and perform the scenario procedure. | **Display & Email Message:** `QA order message <suffix>`<br>**Collection Method:** Enhanced<br>**Ticket Button Verbiage:** another available value<br>**Require guest information for each ticket:** opposite of original<br>**Require guest information for staff box office and POS sales:** opposite of original<br>**Sync Custom Questions & Info to Customer Profile:** opposite of original when allowed<br>**Enhanced fields:** toggle First Name, Last Name, Email, Phone Number, Home Address, Company Name, Job Title, Student ID Number, Birthday, and License Plate<br>**Custom Question:** add one disposable question | All available choices persist. Checkout shows the selected button wording, collection fields, and custom question; the supported post-purchase surface shows the message. The disposable question is removed and original settings are restored. |
| For `CustomDisplayFields`, open **Custom Display Fields** and perform the scenario procedure. | **Field action:** select Add Field<br>**Display Title:** `QA Contact`<br>**Value:** `qa-<suffix>@example.com`<br>**Use basic text formatter:** On | Title, value, and formatter persist. QA Contact appears on the integrated event page but not the standard Showpass page. The field is removed and remains absent after cleanup. |
| For `CharitableDonations`, open **Charitable Donations** and perform the scenario procedure. | **Charity:** available QA charity<br>**Suggested Donation Amount:** another available amount<br>**Display Verbiage:** `QA donation <suffix>`<br>**Purchase:** do not complete a donation payment | All three values persist and appear in checkout. The original donation configuration is restored without purchasing. |
| For `FinancialSettingsPresence`, open **Financial Settings**. Do not change fee values. | **Organizer:** authorized with Manage Financials<br>**Data change:** none | **Edit Service Fee Settings** is present and opens. Organizer and internal fee values remain unchanged. |
| For `AdvancedOptions`, open **Advanced Options** and perform the scenario procedure. | **Password:** add a disposable event password<br>**Password-page message:** `QA password message <suffix>`<br>**Exchange cutoff:** another valid value when enabled<br>**Add to list:** another available list<br>**Third-Party Ticket Page URL:** valid QA URL<br>**Redirect choice:** another available choice<br>**Event-report receiver:** add one disposable email<br>**Post-Event Email status:** another available choice<br>**Thermal Ticket Title Line Text:** `QA Title <suffix>`<br>**Thermal Message:** `QA thermal message <suffix>`<br>**Workday Configure Integration:** confirm presence when enabled<br>**Send reminder emails:** opposite of original when enabled | Every changed value persists and appears in its intended Dashboard or customer surface. Workday is presence-only. The password, receiver email, and list selection are removed, and all original values are restored. |

### SPT-780: Dashboard - Events - Configure charitable donations

**Description:** Validates the source-backed Charitable Donations controls for supported CAD and USD venues: one charity, one suggested default amount, and checkout display verbiage.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The organizer has Manage Financials; the venue uses the system payment gateway and `Currency`; a future event and searchable test charity exist.

**Postconditions:** Clear the test charity or restore the original donation settings; release the basket.

**Tags:** dashboard, donations, checkout

**Parameters:**

Currency: CAD, USD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Charitable Donations** for the event. | Venue currency `Currency` | Select a Charity, Suggested Donation Amount, and Display Verbiage are available. |
| Select the test charity and configure its display. | Suggested amount `10`; verbiage `Support our charity <suffix>` | Amount and verbiage become editable after charity selection. |
| Save once and reopen the section. | Same event | Charity, suggested amount, and verbiage persist. |
| Start public checkout. | One event ticket | The selected charity, exact verbiage, and suggested `10 Currency` donation appear. |
| Change the donation to a valid custom amount without purchasing. | `15 Currency` | Checkout accepts the custom donation amount in the venue currency. |

### SPT-782: Dashboard - Events - Hide charitable donations for unsupported currencies

**Description:** Validates the source-backed visibility rule: Charitable Donations is available only when the system gateway venue currency is CAD or USD.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** The organizer has Manage Financials; an editable event belongs to a system-gateway venue using `UnsupportedCurrency`.

**Postconditions:** No data is changed.

**Tags:** dashboard, donations, edge-case

**Parameters:**

UnsupportedCurrency: EUR, GBP, OtherNonCADOrUSD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the full event editor for the unsupported-currency venue. | `UnsupportedCurrency` | The correct event and venue are shown. |
| Review the edit navigation and page sections. | None | **Charitable Donations** is absent; no enabled charity/amount controls are exposed. |
| Reopen the event after a normal no-op navigation. | Same event | Donations remain unavailable and no donation configuration was added. |

### SPT-783: Dashboard - Attraction Event - Configure charitable donations

**Description:** Validates donation persistence and buyer output on an attraction-style event without expanding attraction configuration itself.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A supported CAD or USD venue uses the system gateway, the organizer has Manage Financials, and an editable attraction event exists.

**Postconditions:** Restore the attraction event's original donation configuration.

**Tags:** dashboard, donations, attraction

**Parameters:**

Currency: CAD, USD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Charitable Donations** for the attraction event. | Venue currency `Currency` | The standard charity, suggested amount, and verbiage controls are available. |
| Select the test charity and save a suggested amount and verbiage. | `10 Currency`; `Attraction charity <suffix>` | The values are accepted. |
| Save once and reopen the event. | Same attraction event | Donation values persist after a fresh read. |
| Start the attraction buyer flow and reach checkout without purchasing. | One eligible date/time and ticket | The configured charity, verbiage, and suggested amount appear in `Currency`. |

### SPT-3300: Dashboard - Events - Change donations without rewriting a prior order

**Description:** Validates that an active event's new donation configuration reaches later checkouts while a completed prior donation remains financially unchanged. This repairs the current case's shifted and missing expected results.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** An active CAD or USD event has charity A, suggested amount `10`, verbiage A, and one completed order containing a `10` donation.

**Postconditions:** Restore the event's original donation display. Retain the financial test order for audit.

**Tags:** dashboard, donations, transactions

**Parameters:**

Currency: CAD, USD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record the completed order's charity and donation amount. | Order A; `10 Currency` | The historical donation is known before editing. |
| Change the event's Suggested Donation Amount and Display Verbiage. | `20 Currency`; `Updated charity message <suffix>` | The new display values are accepted. |
| Save once and reopen **Charitable Donations**. | Same event | The updated `20` and verbiage persist. |
| Start a new public checkout without completing it. | One ticket | Checkout shows the updated message and suggests `20 Currency`. |
| Reopen Order A in Transactions. | Recorded order | Its charity, `10 Currency` donation, and totals remain unchanged. |

### SPT-4877: Dashboard - Events - Configure one online event scenario

**Description:**

Validates one online-event behavior per run. Public and Private online events require a Session room; Livestream requires a Live Stream room; an active room's maximum participants cannot be edited.

| VirtualEventScenario | Setup / Attempt | Expected Result |
| --- | --- | --- |
| PrivateSession | Private online event; Session room; max attendees `10` | Saves as an online private session. |
| PublicSession | Public online event; Session room; max attendees `10` | Saves as an online public session. |
| Livestream | Livestream; Live Stream room; supported provider | Saves and displays as Online. |
| MissingRoomConfiguration | Select Public Session but omit room data | Save is blocked and requests virtual room fields. |
| ActiveRoomCapacityEdit | Existing in-progress room; change max attendees | Save is blocked because maximum participants cannot change while active. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue is enabled for virtual experiences; the organizer can edit events; the selected scenario's provider/active-room fixture is available.

**Postconditions:** Restore or remove no-sales virtual fixtures; do not disrupt the in-progress room.

**Tags:** dashboard, events, edge-case

**Parameters:**

VirtualEventScenario: PrivateSession, PublicSession, Livestream, MissingRoomConfiguration, ActiveRoomCapacityEdit

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the virtual-event fixture or create a disposable event for `VirtualEventScenario`. | Selected table row | The intended event form and online controls are available. |
| Apply only the setup or edit shown for the scenario. | Scenario data | The form shows the intended virtual type and room state. |
| Save once. | None | Valid scenarios save; invalid or active-room scenarios show the exact actionable restriction and do not claim success. |
| Leave and reopen the event. | Same event | Valid virtual type/room values persist; rejected scenarios retain their original saved state. |
| For a valid scenario, open the public event page. | Same event | The event is identified as Online and exposes the correct session/livestream customer experience without a physical-location contradiction. |

## Google Events - Event Categories (81)

### SPT-745: Dashboard - Events - Save category-specific Google metadata

**Description:**

Validates that one supported category exposes and saves only its matching metadata.

| GoogleEventCategory | Metadata |
| --- | --- |
| Music | Headliner and supporting artist |
| Sports | Home team and away team |
| Comedy | Headlining comedian and supporting comedian |
| ArtsAndTheatre | One event entity/show |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** The applicable tagging switch is enabled; the organizer can edit a disposable event; saved metadata entities exist.

**Postconditions:** Restore the event category and metadata.

**Tags:** dashboard, events, google

**Parameters:**

GoogleEventCategory: Music, Sports, Comedy, ArtsAndTheatre

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Basic Info** and select `GoogleEventCategory`. | Selected category | Only the matching metadata controls from the table appear. |
| Select distinct saved entities for each displayed role. | Named test artist/team/comedian/entity | The form accepts each entity once in its intended role. |
| Save once and reopen **Basic Info** through **Manage Events**. | Same event | Category and exact role assignments persist. |
| Change to a different general category and review the prior metadata controls. | Nonmatching category | Inapplicable category metadata is removed or no longer submitted as valid metadata. |

### SPT-749: Dashboard - Events - Create and select a category helper entity

**Description:** Validates creating a missing helper entity without losing the in-progress event form.

| CategoryHelperEntity | Required Category | New Entity |
| --- | --- | --- |
| SportsTeam | Sports | `QA Team <unique suffix>` |
| Comedian | Comedy | `QA Comedian <unique suffix>` |
| Show | ArtsAndTheatre | `QA Show <unique suffix>` |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** The applicable tagging switch is enabled; the organizer can create/edit events and helper entities.

**Postconditions:** Remove the disposable event; retain or remove the helper according to shared-test-data policy.

**Tags:** dashboard, events, google

**Parameters:**

CategoryHelperEntity: SportsTeam, Comedian, Show

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Basic Info**, select the category mapped to `CategoryHelperEntity`. | Selected table row | The matching helper search and Add control appear. |
| Enter another unsaved event value before opening Add. | Subtitle `State retained <suffix>` | The unsaved value remains in the form. |
| Open Add, complete the new helper's required details, and save it. | Unique entity name | The helper is created once and the event form stays open with its prior state. |
| Search for and select the new helper in its intended role. | New helper name | It is immediately selectable without reloading the event form. |
| Save and reopen the event. | Same event | The helper assignment and previously entered subtitle persist. |

## Ticket Types (83)

### SPT-758: Dashboard - Ticket Types - Create and update an active price tier

**Description:**

Validates that a venue using price tiers creates an active tier for a new ticket type and uses a new current tier after its price changes.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** An organizer can edit a future published event at a venue with price tiers enabled. The disposable ticket type has no sales.

**Postconditions:** Remove the disposable no-sales ticket type or restore the fixture.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Ticket Types** for the future event and add a ticket type. | `QA Tier <unique suffix>`; price `20.00`; inventory `30`; Public | The new ticket row accepts all values. |
| Save the event once. | None | The ticket type is created with a current active price of `20.00`. |
| Return through **Manage Events** and reopen the ticket type. | Disposable ticket type | Name, inventory, visibility, and current price persist after a fresh read. |
| Open the public ticket selection. | Same event | The ticket type is available at `20.00` before fees and taxes. |
| Change the price to `25.00` and save once. | New price `25.00` | The edit succeeds and `25.00` becomes the current active price. |
| Reopen Dashboard and public ticket selection. | Same ticket type | Both surfaces show `25.00`; the prior tier is not presented as the current buyer price. |

### SPT-759: Dashboard - Ticket Types - Assign a Pay What You Can configuration

**Description:**

Validates the actual PWYC workflow: a ticket type selects an existing named configuration or creates a new one. A simple enable toggle is not the current product contract.

| ConfigurationSource | Setup |
| --- | --- |
| ExistingConfiguration | Select an existing venue-owned configuration. |
| NewConfiguration | Create `QA PWYC <unique suffix>` with preset amounts `10.00`, `20.00`, `30.00`, Allow free tickets off, and a short description. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The `use_pwyc_configuration` switch is enabled; the organizer can edit a future public ticket type; the venue has an existing configuration for the first parameter.

**Postconditions:** Unassign the disposable configuration; remove a newly created configuration only when no other ticket type uses it.

**Tags:** dashboard, tickets, pwyc

**Parameters:**

ConfigurationSource: ExistingConfiguration, NewConfiguration

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket type's advanced editor and select **Pay What You Can**. | Public ticket type | **Select Configuration** and configuration details are shown. |
| Complete the setup for `ConfigurationSource`. | Selected row | A venue-owned configuration is selected or the new configuration is created successfully. |
| Save the ticket type once. | None | The selected configuration is assigned to the ticket type. |
| Return through **Manage Events** and reopen the same PWYC tab. | Same ticket type | The assigned configuration and its preset amounts persist. |
| Open buyer ticket selection and choose the PWYC ticket. | Same event | The configured amounts and description are available; a free amount is unavailable because Allow free tickets is off. |

### SPT-760: Dashboard - Ticket Types - Add, edit, and remove PWYC preset amounts

**Description:**

Validates the complete preset-amount lifecycle on one disposable PWYC configuration and proves that the assigned ticket type reflects the final saved choices.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A disposable PWYC ticket type uses a configuration containing `10.00`, `20.00`, and `30.00`; no other ticket type uses this configuration.

**Postconditions:** Restore the original three amounts or remove the disposable configuration.

**Tags:** dashboard, tickets, pwyc

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Pay What You Can** for the disposable ticket type. | Assigned configuration | The three recorded preset amounts are shown. |
| Add one preset amount. | `40.00` | The fourth amount appears and no more than five options are allowed. |
| Change one existing amount. | `20.00` to `25.00` | The edited amount is accepted without changing the other options. |
| Remove one existing amount. | Remove `10.00` | Only the selected amount is removed. |
| Save or update the configuration and confirm the shared-configuration warning if shown. | Final amounts `25.00`, `30.00`, `40.00` | The final configuration saves once. |
| Reopen the ticket type and buyer ticket selection. | Same event | Both surfaces show the final three amounts and no removed `10.00` option. |

### SPT-766: Dashboard - Ticket Types - Increase inventory and restore buyer availability

**Description:**

Validates that increasing a sold-out ticket type's inventory persists and makes the newly available quantity selectable on the chosen sales surface.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:** The selected future ticket type has inventory `10`, ten completed sales, and shows Sold Out on the parameterized platform. The organizer can edit inventory.

**Postconditions:** Release any unpurchased basket hold. Retain the increased inventory or restore it only when doing so cannot reduce inventory below tickets sold.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Confirm the ticket type is sold out on Web Public and Web Box Office. | Inventory `10`; sold `10` | Neither sales surface allows another ticket to be selected. |
| Open the ticket type in Dashboard and increase inventory. | `10` to `15` | The new inventory is accepted and remains greater than tickets sold. |
| Save once and reopen the ticket type through **Manage Events**. | Same ticket type | Inventory `15` persists; sold count remains `10`; five are available. |
| Refresh Web Public and Web Box Office. | Same event | The ticket type is no longer Sold Out on either surface and exposes up to five available tickets. |
| Add one ticket to a basket on each surface without completing purchase. | Quantity `1` per basket, one surface at a time | Each surface can hold one newly available ticket and reports availability consistently. |
| Remove each held ticket before moving to the next surface. | Same baskets | Every temporary hold is released and availability returns. |

### SPT-768: Dashboard - Ticket Types - Preserve prior order pricing after a price change

**Description:**

Validates both sides of one price change: a completed order keeps the amount paid, while a later buyer receives the new current price. The previous `TicketTypeSaleState` parameter is removed because both observations are required in the same run.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future public ticket type costs `20.00`; one completed order for one ticket exists at `20.00`; a second purchase can be completed after the edit.

**Postconditions:** Retain both test orders for financial audit or void/refund them according to the environment's approved cleanup process.

**Tags:** dashboard, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record the first completed order and its ticket price. | Order A; one ticket at `20.00` before fees/taxes | Order A shows the original paid price and total. |
| Change the ticket type price in Dashboard. | `20.00` to `25.00` | The new price is accepted. |
| Save once and reopen the ticket type. | Same ticket type | Current price `25.00` persists. |
| Reopen Order A in Transactions. | Recorded order | Its ticket line and financial total still use `20.00`; no historical amount was rewritten. |
| Complete a second one-ticket purchase. | Order B | Order B charges the current `25.00` price before fees/taxes. |
| Compare both orders and the current ticket type. | Orders A and B | Historical and current prices remain independently correct. |

### SPT-770: Dashboard - Recurring Ticket Types - Protect sold-child pricing

**Description:**

Validates sold and unsold children together because the regression is the contrast between them. The previous parameter is removed: one child has a sale, a sibling has none, and a parent price update must not corrupt the sold child's historical price.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A recurring parent has two future children and a propagated ticket type at `20.00`; Child A has one completed sale; Child B has no sales.

**Postconditions:** Retain the order for audit. Restore allowed no-sales pricing when needed.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record Child A's completed order and both child ticket prices. | Child A sold; Child B unsold; `20.00` | The baseline distinguishes the sold and unsold child. |
| Open the parent ticket type and change its price. | `20.00` to `25.00`; use the visible propagation control when required | The parent update is accepted without claiming that historical purchases changed. |
| Reopen the parent and both child ticket types. | Same series | Parent and allowed unsold-child current pricing reflect `25.00`; sold-child behavior follows its price-lock rules. |
| Reopen Child A's completed order. | Recorded order | The purchased ticket remains `20.00` with its original financial totals. |
| Open buyer selection for Child A and Child B. | Both child dates | Current selectable prices match the saved price-lock/propagation state; no child has an invalid or missing price. |

### SPT-4063: Dashboard - Ticket Types - Flip visibility to Public at the scheduled time

**Description:**

Validates the timezone-sensitive transition from Hidden or Visible to Sellers into Public visibility. Assertions are required immediately before and after the scheduled instant.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future published single or recurring event has a public ticket type; the tester can observe time in the chosen timezone and wait through a short scheduled transition.

**Postconditions:** Restore Public visibility and remove any disposable schedule.

**Tags:** dashboard, tickets, events

**Parameters:**

EventShape: SingleEvent, RecurringEvent
TimezoneContext: VenueTimezone, AlternateTimezone
StartingVisibility: Hidden, SellersOnly

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open advanced settings for the target ticket type. | `EventShape`; `TimezoneContext` | Visibility controls use the event's displayed timezone. |
| Select `StartingVisibility`. | Hidden or Visible to Sellers | **Schedule Visibility Flip to Public** becomes available. |
| Schedule the flip shortly in the future and record the exact displayed time and timezone. | At least two minutes ahead | The future timestamp is accepted unambiguously. |
| Save once and reopen the ticket type. | Same event | Starting visibility and scheduled timestamp persist. |
| Before the scheduled instant, refresh normal public ticket selection. | No seller link | The ticket is not publicly selectable. |
| After the scheduled instant, refresh again. | Recorded time reached | The ticket is Public and selectable without a manual Dashboard save. |
| For `RecurringEvent`, inspect one affected child. | Child occurrence | The child visibility is consistent with the recurring ticket propagation rule. |

### SPT-4384: Dashboard - Ticket Types - Save one waitlist setting

**Description:**

Validates one waitlist setting per run. This corrects the current mismatch between the Qase parameter `Configure` and the undefined step reference `@WaitlistConfiguration`.

| WaitlistSetting | Test Value |
| --- | --- |
| CardVerificationRequired | Require credit-card verification on. |
| CardVerificationNotRequired | Require credit-card verification off. |
| PurchaseLimit | Limit `2`. |
| CutoffTime | Future cutoff before the event starts. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue has waitlist/resale enabled; a future event has a sold-out or waitlist-eligible ticket type; the organizer can edit it.

**Postconditions:** Restore the recorded waitlist configuration.

**Tags:** dashboard, tickets, waitlists

**Parameters:**

WaitlistSetting: CardVerificationRequired, CardVerificationNotRequired, PurchaseLimit, CutoffTime

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the target ticket type and enable Waitlist. | Waitlist-eligible ticket | Waitlist settings become editable. |
| Apply only the value for `WaitlistSetting`. | Selected table row | The selected control displays the exact test value. |
| Save once. | None | The ticket type saves successfully. |
| Return through **Manage Events** and reopen the same ticket type. | Same event and ticket | Waitlist remains enabled and the selected value persists. |
| Reopen the waitlist customer entry surface when available. | Same ticket type | The saved requirement or limit is reflected without exposing a contradictory value. |

### SPT-4875: Dashboard - Ticket Types - Enforce one sales-window or visibility state

**Description:**

Validates one buyer-availability state per run instead of reconfiguring the same ticket through every state regardless of the selected parameter.

| TicketAvailabilityState | Setup | Expected Normal Public Access |
| --- | --- | --- |
| SalesNotStarted | Sale starts two hours in the future; Public | Not purchasable before start. |
| OnSalePublic | Current time inside sale window; Public | Visible and purchasable. |
| SalesEnded | Sale ended one hour ago; Public | Not purchasable after end. |
| Hidden | Current sale window; Hidden | Not visible. |
| SellersOnly | Current sale window; Visible to Sellers | Hidden normally; available through an authorized seller link. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future published event has a no-sales disposable ticket type; seller access exists for `SellersOnly`.

**Postconditions:** Restore the ticket type to a safe Public/current-sale state or remove it if it has no sales.

**Tags:** dashboard, tickets, events

**Parameters:**

TicketAvailabilityState: SalesNotStarted, OnSalePublic, SalesEnded, Hidden, SellersOnly

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open advanced settings for the disposable ticket type. | Selected event | Sale-window and visibility controls are available. |
| Apply the exact setup for `TicketAvailabilityState`. | Selected table row; event timezone | The form shows the intended dates and visibility. |
| Save once and reopen the ticket type through **Manage Events**. | Same ticket type | The selected state persists after a fresh read. |
| Open normal public ticket selection. | Same event | Availability matches the table's normal-public expectation. |
| For `SellersOnly`, open the authorized seller link. | Approved seller link | The ticket is available through seller access while remaining unavailable normally. |
| Attempt only an allowed ticket selection. | Quantity `1` when available | Available states allow selection; unavailable states expose no active purchase action. |

## Delivery Settings (448)

### SPT-3275: Dashboard - Ticket Types - Configure E-ticket delivery

**Description:** Validates E-ticket as the only delivery method, including its source-backed configurable Handling Fee. The previous claim that E-ticket cannot have a handling fee is removed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket type's **Delivery & Transfers** tab. | No-sales ticket type | E-ticket, Delivery, and Will Call methods are available. |
| Select E-ticket only and set its Handling Fee. | E-ticket on; Delivery off; Will Call off; fee `1.00` | The E-ticket fee and fee method are editable. |
| Save once and reopen the tab through **Manage Events**. | Same ticket | E-ticket-only and `1.00` persist after a fresh read. |
| Add the ticket in buyer checkout. | Quantity `1` | E-ticket is the only delivery choice and its handling fee is included once as configured. |

### SPT-3276: Dashboard - Ticket Types - Configure Delivery with a shipping fee

**Description:** Validates Delivery as the only method with its Shipping & Handling Fee.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration and release the test basket.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | Delivery options are editable. |
| Select Delivery only and configure its fee. | E-ticket off; Delivery on; Will Call off; Shipping & Handling Fee `5.00` | Delivery and `5.00` are accepted. |
| Save once and reopen the same tab. | Same ticket | Delivery-only and `5.00` persist. |
| Add the ticket in buyer checkout. | Quantity `1` | Delivery is the only method, a shipping address is requested, and `5.00` is applied according to the saved fee method. |

### SPT-3277: Dashboard - Ticket Types - Configure Will Call with a handling fee

**Description:** Validates Will Call as the only delivery method with its Handling Fee.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping/delivery controls; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration and release the basket.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | Delivery methods are editable. |
| Select Will Call only and configure its fee. | E-ticket off; Delivery off; Will Call on; Handling Fee `2.00` | Will Call and `2.00` are accepted. |
| Save once and reopen the tab. | Same ticket | Will Call-only and `2.00` persist. |
| Add the ticket in buyer checkout. | Quantity `1` | Will Call is the only method and `2.00` is included according to the saved fee method. |

### SPT-3278: Dashboard - Ticket Types - Offer multiple delivery methods

**Description:** Validates that E-ticket, Delivery, and Will Call can coexist and retain independent fees.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery settings and release all baskets.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | All three methods are available. |
| Enable all delivery methods and enter distinct fees. | E-ticket `1.00`; Delivery `5.00`; Will Call `2.00` | Each fee remains associated with its own method. |
| Save once and reopen the tab. | Same ticket | All methods and fees persist after a fresh read. |
| Add the ticket in buyer checkout and inspect the method selector. | Quantity `1` | All three named methods are available. |
| Select each method one at a time. | E-ticket, Delivery, Will Call | The order total uses `1.00`, `5.00`, or `2.00` for the selected method without combining unrelated fees. |

## Order Form & Custom Questions (446)

### SPT-3247: Dashboard - Order Form - Show the saved Display & Email Message

**Description:** Validates the saved post-purchase message after checkout and in the standard confirmation email. Source states that a custom confirmation email replaces this message in email, so the fixture must use the standard email.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future public event uses the standard confirmation email and has a purchasable ticket; the organizer can edit Order Form.

**Postconditions:** Restore the prior message; retain or clean the test order according to policy.

**Tags:** dashboard, post-purchase, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event's **Order Form** and enter **Display & Email Message**. | `QA arrival instructions <unique suffix>` | The message and character count are shown. |
| Save once, leave the page, and reopen **Order Form**. | Same event | The exact message persists. |
| Complete one buyer checkout. | One ticket; unique buyer email | The success page displays the exact saved message. |
| Open the standard confirmation email. | Same order | The exact message appears because no custom confirmation email overrides it. |

### SPT-3248: Dashboard - Order Form - Change Ticket Button Verbiage

**Description:** Validates one supported public purchase-button label per run.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future public event has a purchasable ticket and editable Order Form.

**Postconditions:** Restore **Buy Tickets**.

**Tags:** dashboard, events, public

**Parameters:**

ButtonLabel: Register, RSVP, GetTickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Order Form** and choose `ButtonLabel` under **Ticket Button Verbiage**. | Register, RSVP, or Get Tickets | The selected supported label is shown. |
| Save once and reopen **Order Form**. | Same event | The label persists after a fresh read. |
| Open the public event page. | Same event | The main purchase action uses the selected human-readable label. |
| Select the action. | None | Ticket selection opens for the same event. |

### SPT-3249: Dashboard - Order Form - Collect guest information for every ticket

**Description:** Validates that **Require guest information for each ticket** changes a two-ticket checkout from one shared guest form to separate ticket-level guest forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future event has a ticket type allowing quantity `2`; Order Form uses Standard Info.

**Postconditions:** Restore the original toggle and release the basket.

**Tags:** dashboard, custom-questions, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enable **Require guest information for each ticket** in **Order Form**. | Toggle on | The help text explains that each ticket and purchaser require information. |
| Save once and reopen **Order Form**. | Same event | The toggle remains on. |
| Add two tickets in public checkout. | Quantity `2` | Checkout displays separate guest-information fields for Ticket 1 and Ticket 2 plus purchaser data as applicable. |
| Enter information for only one ticket and attempt to continue. | Leave Ticket 2 required fields empty | Checkout is blocked at the incomplete ticket. |
| Complete both ticket forms. | Two distinct guest names/emails | Checkout can continue past guest information. |

### SPT-3251: Dashboard - Order Form - Require guest information in staff sales

**Description:** Validates the saved staff-sales requirement on each client that provides it.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| MobileBoxOffice | Mobile |

**Preconditions:** The organizer can edit Order Form; the event has required guest fields; tester can start a staff sale on `Platform`.

**Postconditions:** Restore the toggle and cancel the unpaid sale.

**Tags:** dashboard, custom-questions, box-office

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enable **Require guest information for staff box office and POS sales**. | Same event | The setting can be enabled. |
| Save once and reopen **Order Form**. | Same event | The staff-sales requirement persists. |
| In Web Box Office, start a sale for one event ticket. | Quantity `1` | Guest-information entry is required before completion. |
| Leave required guest data empty and try to continue. | No guest data | The staff sale cannot complete and identifies the missing information. |
| Enter valid guest data, then cancel before payment. | Unique test guest | The requirement is satisfied and the Web Box Office sale can proceed to the next stage. |
| Repeat the sale attempt in Mobile Box Office. | Quantity `1`; leave required data empty, then enter it | Mobile Box Office enforces the same required guest information before the sale can proceed. |

### SPT-3252: Dashboard - Order Form - Save Standard Info collection

**Description:** Validates Standard Info selection, its visible controls, persistence, and basic checkout collection.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** An editable event currently uses Enhanced Info and has a purchasable ticket.

**Postconditions:** Restore the original collection method and release the basket.

**Tags:** dashboard, custom-questions, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select **Standard Info** under **Collection Method**. | None | Ticket Button Verbiage and Add Question remain available; Enhanced Info field toggles are not shown as the active method. |
| Save once and reopen **Order Form**. | Same event | Standard Info remains selected. |
| Start buyer checkout for one ticket. | Quantity `1` | The standard name, email, and phone information is collected according to the event setup. |

### SPT-3253: Dashboard - Order Form - Add a custom question by type

**Description:**

Validates one custom-question type per run. Use `QA <QuestionType> <unique suffix>` as the question. SelectBox uses options `Red` and `Blue`; Checkboxes uses `Email` and `SMS`; numeric and date types use their matching input controls.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Standard Info is selected; the event has General Admission and VIP ticket types.

**Postconditions:** Delete the disposable question and confirm its removal.

**Tags:** dashboard, custom-questions, checkout

**Parameters:**

QuestionType: TextInput, Textarea, SelectBox, Decimal, Integer, LongInteger, DatePicker, Checkboxes

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Order Form**, select **Add Question** and choose `QuestionType`. | Selected type | The editor displays controls appropriate to that type. |
| Enter the unique question, help text, and type-specific options. | Description data; required on; General Admission only | All values are accepted and the ticket scope names only General Admission. |
| Save once and reopen **Order Form**. | Same event | Type, question, help text, required status, options, and ticket scope all persist. |
| Start checkout with General Admission. | One ticket | The required question appears with the correct input control and options. |
| Start checkout with VIP instead. | One ticket | The General-Admission-only question does not appear for VIP. |

### SPT-3261: Dashboard - Order Form - Edit a custom question

**Description:** Validates that editing one existing question persists and reaches checkout without creating a duplicate.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Standard Info has one disposable Text Input question scoped to General Admission.

**Postconditions:** Restore or delete the disposable question.

**Tags:** dashboard, custom-questions, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Edit the disposable question. | Original title recorded | The existing question editor opens. |
| Change its title, help text, required state, and ticket scope. | `QA Updated Question <suffix>`; Required on; VIP only | The edited values are accepted. |
| Save once and reopen **Order Form**. | Same event | One updated question appears; the original wording is absent. |
| Start VIP checkout. | One VIP ticket | The updated required question and help text appear. |
| Start General Admission checkout. | One GA ticket | The VIP-only question does not appear. |

### SPT-3262: Dashboard - Order Form - Delete a custom question

**Description:** Validates confirmed deletion in Dashboard and absence from a fresh read and checkout.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Standard Info has one uniquely named disposable question shown in checkout.

**Postconditions:** The disposable question remains deleted.

**Tags:** dashboard, custom-questions, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select Delete for the uniquely named question. | Exact question title | A confirmation appears when required. |
| Confirm deletion and save once. | None | Only the selected question is removed. |
| Leave and reopen **Order Form**. | Same event | The deleted question is absent; unrelated questions remain. |
| Start checkout for its former ticket scope. | One ticket | The deleted question is no longer requested. |

### SPT-3263: Dashboard - Order Form - Save Enhanced Info collection

**Description:** Validates Enhanced Info selection and its field controls after a fresh read.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** An editable event currently uses Standard Info.

**Postconditions:** Restore the original collection method.

**Tags:** dashboard, custom-questions, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select **Enhanced Info** under **Collection Method**. | None | Standard enhanced fields and Add Question are shown. |
| Enable **Require guest information for each ticket**. | Toggle on | Enhanced field toggles become editable. |
| Save once and reopen **Order Form**. | Same event | Enhanced Info and the per-ticket toggle persist; the enhanced fields remain available. |

### SPT-3264: Dashboard - Order Form - Configure one Enhanced Info field

**Description:** Validates one enhanced field per run, including the prerequisite that per-ticket guest collection is enabled before field toggles become editable.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** Enhanced Info is selected; **Require guest information for each ticket** is on; the event has a purchasable ticket.

**Postconditions:** Restore recorded Enhanced Info fields and release the basket.

**Tags:** dashboard, custom-questions, checkout

**Parameters:**

EnhancedField: FirstName, Email, PhoneNumber, Birthday

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enable and require `EnhancedField`; leave one recorded comparison field off. | Selected field | The selected field is on/required and the comparison field remains off. |
| Save once and reopen **Order Form**. | Same event | Both on/off states persist. |
| Start checkout for one ticket. | Quantity `1` | The selected field appears and is required; the disabled comparison field is absent. |
| Leave `EnhancedField` empty and continue. | No value | Checkout identifies the required field and does not continue. |
| Enter a valid value. | Type-appropriate data | The enhanced-information stage can continue. |

### SPT-3268: Dashboard - Package Event - Keep a custom question on one child

**Description:** Validates that a child-specific question persists only on the selected package child and does not leak to the parent or sibling.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A package has a parent plus two identifiable child events/ticket types; the selected child permits Order Form editing.

**Postconditions:** Delete the disposable child question and confirm isolation remains.

**Tags:** dashboard, custom-questions, packages

| Step Action | Data | Expected Result |
| --- | --- | --- |
| From the package setup, open **Order Form** for Child A. | Recorded parent, Child A, Child B | The page identifies Child A. |
| Add a required Select Box question. | `Meal Choice <suffix>`; Vegetarian, Standard; Child A ticket only | The child-specific configuration is accepted. |
| Save once and reopen Child A. | Same child | The question, options, and scope persist. |
| Open the package parent and Child B Order Forms. | Parent and sibling | Neither contains Child A's question. |
| Start checkout for Child A and then Child B where supported. | Matching child tickets | Meal Choice appears only for Child A. |

### SPT-4878: Dashboard - Order Form - Enforce one event-terms scenario

**Description:**

Validates one terms behavior per run so missing-URL validation, event overrides, and venue inheritance are not repeated together regardless of parameter.

| TermsScenario | Setup | Expected Result |
| --- | --- | --- |
| MissingUrlValidation | Require terms on; URL empty | Save is blocked because the URL is required. |
| EventOverride | Venue default off; event requirement on with unique valid URL | Event values persist and checkout requires acceptance. |
| VenueDefaultInheritance | New event at venue with default requirement and valid default URL | New event inherits the venue values and checkout requires acceptance. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The organizer can edit events; a future event has a purchasable ticket; venue defaults can be controlled for the selected scenario.

**Postconditions:** Restore event and venue terms settings; release the basket.

**Tags:** dashboard, events, checkout

**Parameters:**

TermsScenario: MissingUrlValidation, EventOverride, VenueDefaultInheritance

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Prepare or open the event described by `TermsScenario`. | Selected table row | The event uses the intended event/venue baseline. |
| Apply only the scenario's terms setup. | Unique URL `https://example.com/qa-terms-<suffix>` when required | The form shows the selected requirement and URL source. |
| Save once. | None | Missing URL is rejected; valid override or inherited values save. |
| Leave and reopen **Order Form**. | Same event | Successful scenario values persist and show the intended event or venue source; rejected values were not partially saved. |
| For a valid scenario, start checkout and try to continue without accepting terms. | One ticket | The terms link is available and checkout is blocked until acceptance. |
| Accept terms and continue. | Acceptance checked | Checkout can proceed past the terms requirement. |

## Edge Cases (820)

### SPT-4299: Dashboard - Events - Save a former recurring event that retains archived child references

**Description:**

Validates the source-backed regression where archived child IDs can remain in an update payload after the former parent has already been converted to a normal event through an internal fixture operation. This is not the organizer conversion workflow covered by SPT-4879; the proof is that a later ordinary Dashboard edit saves without incorrectly treating archived children as active recurrence.

| Platform | View |
| --- | --- |
| Admin | Desktop |
| Dashboard | Desktop |

**Preconditions:**

* An authorized internal tester can prepare the fixture in Showpass Admin.
* A disposable recurring parent exists with exactly three children and no sales.
* Record the parent name, subtitle, recurrence state, and child IDs.

**Postconditions:**

* Restore or remove the internal fixture according to the test environment's data policy.
* No active child event or duplicate event remains.

**Tags:** dashboard, events, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Showpass Admin, archive all three child events belonging to the disposable parent. | Recorded child IDs; Visibility: Archived | Each intended child is archived and no unrelated child is changed. |
| Through the approved internal fixture operation, set the parent recurrence flag to false while retaining the archived child records. | Exact disposable parent ID | The parent is now a normal event; the archived children remain recorded for the regression setup. |
| In Dashboard **Manage Events**, find and open **Edit** for the former parent. | Parent event name | The event opens as a normal event without exposing active recurring occurrences. |
| Change only the subtitle. | `Archived-child regression <unique suffix>` | The subtitle is accepted without changing event dates, ticket types, or child records. |
| Save once. | None | The save succeeds without a recurring-parent validation error. |
| Return through **Manage Events** and reopen **Edit**. | Same event | The new subtitle persists and the event remains non-recurring. |
| Verify the archived child fixtures in Showpass Admin. | Recorded child IDs | The same children remain archived; no active or duplicate children were created. |

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

* Do not change or delete the protected fixtures.
* Confirm that each attempted conversion left its original event state unchanged.

**Tags:** dashboard, edit-event, edge-case

**Parameters:**

RecurringGuardrail: PurchasedEventToRecurring, DoorsOpenEventToRecurring, ActiveChildrenToSingleEvent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Manage Events**, open **Edit** for the fixture named by `RecurringGuardrail`. | Selected scenario row | The event opens with its recorded original recurrence state. |
| Apply only the conversion attempt shown in the scenario row. | Selected recurrence change | The form shows the requested change but does not yet alter saved event state. |
| Select **Save** once. | None | The save is blocked with an actionable reason matching the selected guardrail. |
| Return through **Manage Events** and reopen the event. | Same fixture | The original recurrence setting, dates, Doors Open value, and sales state remain unchanged. |
| For `ActiveChildrenToSingleEvent`, expand the parent. | Recorded child IDs | Every original child remains present and no child was deleted, duplicated, or reactivated. |

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

## Advanced Options (1049)

### SPT-5078: Dashboard - Edit Event - Save Advanced Options

**Description:**

Checks that each available Advanced Options setting remains saved for the selected event. Run only the option enabled for the test venue.

| AdvancedOption | Required Setup | Test Value | What Should Remain Saved |
| --- | --- | --- | --- |
| EventPassword | Saved event that is not a recurring child | Unique password and QA access {unique-suffix} message | Password and message |
| ExchangeCutoff | Venue has Exchanges | 12 hours | Event cutoff and the organizer-override notice |
| CustomerList | Venue has a customer list | Named test list | Selected list |
| ThirdPartyRedirect | Standard published event | https://example.com/{unique-suffix} and one redirect choice | URL and redirect choice |
| EventReportRecipient | Published event that is not a template | Controlled QA mailbox | Added email address |
| PostEventEmailStatus | Post-event email setting is available | Do Not Send Post-Event Email | Selected option |
| ThermalTicketText | Standard published event | Unique title and message within the shown limits | Both text values |
| WorkdayIntegration | Venue has Workday enabled | Reversible test setup | Saved Workday setup |
| EventReminder | Venue can send event reminders | Turn reminder on | Reminder remains on |

Current Angular reference: /dashboard/events/{slug}/manage/#/edit. This is reference information only and is not required in the steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer can manage the event used for AdvancedOption.
* The required setup shown in the Description is available.
* The original setting is recorded before the test.

**Postconditions:**

* Restore the original setting.
* Reopen Advanced Options and confirm that the original setting is restored.

**Tags:** dashboard, events, edit-event

**Parameters:**

AdvancedOption: EventPassword, ExchangeCutoff, CustomerList, ThirdPartyRedirect, EventReportRecipient, PostEventEmailStatus, ThermalTicketText, WorkdayIntegration, EventReminder

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Manage Events, select Edit for the test event and open Advanced Options. | Event for AdvancedOption | The selected option is available. |
| Record the option's current value. | Selected option | The original value is available for cleanup. |
| Enter or select the test value shown in the Description. | Selected AdvancedOption | The value is accepted. |
| Save the setting using the button shown on the page. | Selected option | A success message appears. |
| Leave Edit, reopen it, and return to Advanced Options. | Same event | The selected value is still shown. |
| Restore the original value and reopen Advanced Options. | Original value | The original value is shown and the temporary value is gone. |

## Consolidated Analysis and Audit History

> [!info] Migrated before source-note cleanup
> The sections below preserve the non-case content from the former existing-case analysis, new-case draft, and core-refactor record. Historical recommendations are retained as audit evidence; current Qase placement and completion status are controlled by the Suite Index above and the CSV-to-Qase mapping note.

### Existing Coverage Gap Analysis

#### Testing Intent

We are testing whether an organizer can create, reopen, edit, and understand single, draft, recurring-parent, recurring-child, and template events while saved configuration, permissions, and organizer-facing totals stay correct; this matters because an unusable event, lost edit, exposed event, or misleading sales state can block sales and operations, and we will prove it through saved state, route access, page content, and reconciled overview values.

| Field | Answer |
| --- | --- |
| Criticality bucket | Reporting/dashboard agreement; permission boundary; live sales completion |
| Business invariant | Only authorized organizers can manage their venue's events, saved event state persists, and Event Overview agrees with the event's transactions, inventory, and check-ins. |
| User or business impact | Organizers and venue employees can publish bad data, lose configuration, or act on incorrect event results. |
| Failure mode | Missing routes or sections, incomplete draft/publish behavior, over-permissive access, stale edits, or incorrect overview totals. |
| Observable proof | Expected routes and sections load; saves persist after a fresh read; restricted routes are denied; overview totals reconcile with named Dashboard surfaces. |
| Source of truth | `web-app` backend, server-rendered Dashboard templates, and legacy Dashboard controllers; Qase is existing-coverage evidence only. |
| Primary surfaces | Dashboard desktop: Event Overview; every Edit, Manage, Promote, and Reports destination in the event-management shell; Create Event; recurring child edit; template create; clone; and standalone legacy edit. |
| In scope | `/dashboard/events/{slug}/manage/` hash routes and external handoffs, `/dashboard/events/create/`, draft edit/publish, recurring parent/child, source-discovered event create/edit routes, and presence-only checks for fees and seating. |
| Out of scope | Deep fee calculation/rate-card behavior; seating map creation, editing, and seat assignment behavior; hardcopy orders; and deep functional retesting of Transactions or Check In beyond the event-scoped handoff. |
| Confidence | High for source and Qase inventory; Medium for whether the unlinked `/dashboard/events/create-event/` wizard remains a supported user path. |

#### Proof Target Map

| Proof Target | Why It Matters | Current Coverage |
| --- | --- | --- |
| Event Overview reports the current event accurately | Prevents organizer decisions from stale or mismatched sales, inventory, and check-in data | Gap; SPT-4288 is settlement-focused and does not cover this page |
| Create, draft, publish, and edit form a persistent lifecycle | Prevents unusable or lost event configuration | Partial: SPT-764, SPT-4874 |
| Recurring parent and child edits preserve ownership boundaries | Prevents parent, sibling, or child schedule/configuration corruption | Partial: SPT-4876; guardrails in SPT-4879 and SPT-4299 |
| Only the correct venue user can manage an event | Prevents unauthorized event changes | Gap |
| All supported event create/edit entry points remain usable | Prevents hidden legacy links and specialized lifecycle routes from breaking | Partial: SPT-769, SPT-786; standalone editor and route parity are gaps |
| Every event-management destination is visible only when supported and opens the selected event | Prevents inaccessible or cross-event organizer workflows | Partial; several feature cases exist outside suite 79, while Edit Sellers and some edit sections are true gaps |

#### Scope Decisions

| Area | Decision | Reason |
| --- | --- | --- |
| Current Event Overview | In scope, full page behavior | It is the primary requested route and has no dedicated Qase case. |
| Single-event create/edit | In scope | Primary organizer workflow. |
| Draft save, reopen, edit, and publish | In scope | Draft is a distinct lifecycle state with different actions and navigation. |
| Recurring parent and child edit | In scope | Child routes and editable state differ from parents. |
| Event templates and cloning | In scope as source-discovered entry points | Both reuse the event form with different lifecycle rules. |
| `/dashboard/events/{slug}/edit-form/` | In scope | Source links to this standalone editor from Edit Sellers and the Facebook call-to-action. |
| `/dashboard/events/{slug}/edit/#/...` | Accounted as a compatibility alias | It renders the same manage shell and state templates as `/manage/`; no separate behavior case is needed. |
| `/dashboard/events/create-event/` | Deferred | The full-screen wizard route exists, but no active in-repo navigation entry was found. |
| Financial Settings/internal fees | Presence-only | Requested depth limit; existing focused rate-card cases remain separate. |
| Assigned Seating | Presence/page-only | Requested depth limit; 25 focused seating cases remain separate. |
| Full event-management sidebar | In scope | The screenshot matches the source-owned sidebar; every Edit, Manage, Promote, Reports, external, and conditional destination is accounted below. |

#### Sources Reviewed

- [[00 Start Here/World-Class Software Quality Standard]]
- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/qasectl]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- Qase project `SPT`: all 1,627 case summaries, all 233 suites, and the 103 cases under suite 79 descendants
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/dashboard/urls.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/dashboard/views.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/config/dynamic-routes.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/manage/overview.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/manage/partials/_event-manage-sidebar.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form-nav.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/EventManage.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/EventManageOverview.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/EventCreate.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/tickets/models.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/main/loaders.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/event_management/event_archival.py`
- Focused `web-app` Dashboard, event API, recurring-event, and event-archival tests

#### Qase Read Summary

| Item | Result |
| --- | --- |
| Query method | One bulk read of all project cases and suites; filtered locally by suite ancestry and global event-management keywords |
| Total cases scanned | 1,627 |
| Total suites scanned | 233 |
| Requested parent | Suite 79, `Events` |
| Descendant suite IDs | 79, 80, 81, 82, 83, 84, 85, 86, 446, 448, 480, 674, 820, 999, 1034, 1035 |
| Cases under the parent | 103 |
| Cases directly relevant to the create/edit form or closely coupled settings | 48-case core subset; not the complete event-management sidebar portfolio |
| Dedicated Event Overview cases found in the full project scan | 0 |

##### Why Suite 79 Has So Many Cases

Suite 79 is an empty parent. The Qase UI expands 15 descendant suites, so the search page combines the core event form with large specialist areas. Assigned Seating alone contributes 25 cases; Hard Copy and Email Guest add seven each.

| Suite | Count | Relevance to This Analysis |
| --- | ---: | --- |
| 79 Events | 0 | Parent only |
| 80 Manage Events (Legacy) | 0 | Parent only |
| 81 Google Events - Event Categories | 2 | Direct form controls |
| 82 Map Editor | 25 | Assigned Seating presence-only in this analysis |
| 83 Ticket Types | 8 | Direct form controls; internal fees are presence-only |
| 84 Create / Edit Events | 16 | Direct core coverage |
| 85 Manage Events | 6 | Clone and one stats case are adjacent; list behavior is otherwise separate |
| 86 Bulk Update | 3 | Separate recurring bulk-update workflow |
| 446 Order Form & Custom Questions | 14 | Direct embedded/legacy form area |
| 448 Ticket Type Delivery Settings | 4 | Direct ticket-type settings |
| 480 Special Events | 6 | Separate attraction configuration workflow |
| 674 Attraction Configuration | 2 | Separate manage page |
| 820 Edge Cases | 2 | Direct recurring edit guardrails |
| 999 Event & Ticket Display | 1 | Public display behavior |
| 1034 Hard Copy | 7 | Separate workflow |
| 1035 Email Guests | 7 | Separate manage page under suite 80 |

#### Full Sidebar and Edit-Section Re-audit

The first pass was too narrow: it counted the create/edit form and closely coupled settings, but did not account for every destination in the event-management shell. The screenshot is consistent with the source-owned navigation in `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/manage/partials/_event-manage-sidebar.html` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form-nav.html`.

| Group | Page / Section / Feature | Existing Qase Coverage | Classification / Recommendation |
| --- | --- | --- | --- |
| Overview | Single and recurring Event Overview | SPT-5071 | Gap closed with one parameterized case |
| Edit | Basic Info, Location & Info, Event Date & Time | SPT-764, SPT-4874, SPT-4876 | Existing but broad; keep in Events and improve persistence wording |
| Edit | Accommodations | SPT-359 in Core - Events; SPT-1784 in suite 198 | Partial and scattered; refactor SPT-1784 as the Dashboard configuration case and move it under Events; keep SPT-359 as public-output proof |
| Edit | Ticket Types | SPT-758–760, SPT-766, SPT-768, SPT-770, SPT-4063, SPT-4384, SPT-4875 | Existing under Events |
| Edit | Legal Policies & Important Info | SPT-4878 covers terms acceptance | Partial; retain and add exact policy persistence only if not covered by the basic edit case |
| Edit | Order Form and Custom Questions | SPT-3247–3270 | Existing under Events |
| Edit | Custom Display Fields | SPT-5077 | Gap closed |
| Edit | Charitable Donations | SPT-780, SPT-782–783, SPT-3300 | Existing under Events |
| Edit | Financial Settings and internal fees | SPT-772, SPT-3501, SPT-3810–3811 | Presence-only in this analysis |
| Edit | Advanced Options — event password and message | SPT-5078; SPT-3807 proves public password access | Dashboard configuration gap closed; keep SPT-3807 in Core |
| Edit | Advanced Options — exchanges, customer list, third-party URL, report recipients, post-event email status, thermal text, Workday, and reminder email | SPT-5078 parameter mapping | Gap closed; execute only applicable controls |
| Manage | Email Customization | 12 cases in suite 749 under Emails | Existing but scattered; move event-only cases into an Events child suite as listed below |
| Manage | Branding | 7 cases in suite 744 under Dashboard | Existing but scattered; nest Branding under Events or move the event-owned subset |
| Manage | Waitlist | SPT-4384; SPT-4087 covers cancellation email customization | Partial; keep deep behavior in its feature cases and add route presence to SPT-5072 |
| Manage | Attraction configuration | SPT-3524–3529, SPT-4090, SPT-4829 | Existing and already under Events descendants |
| Manage | Live Stream | SPT-4877 plus public-output SPT-3291 | Existing configuration/output coverage; add conditional page presence to SPT-5072 |
| Manage | Edit Sellers | SPT-5079 | Gap closed |
| Manage | Email Guests | SPT-5012–5018 | Existing under suite 80 > Email Guests |
| Manage | Map Editor / Assigned Seating | 25 cases in suite 82 | Presence-only in this analysis |
| Manage | Transactions | Deep cases in suite 103; event-scoped cases SPT-5064–5070 | Keep deep behavior in Transactions; SPT-5072 verifies the sidebar opens Transactions filtered to the selected event |
| Manage | Check In | Deep cases in suites 184–185 | Keep deep behavior in Check In; SPT-5072 verifies the selected-event handoff |
| Manage | Publish Approval | SPT-4699–4718 and SPT-4750–4754 in root suite 949 | Existing but scattered; nest the workflow suite under Events because its cases are event lifecycle coverage |
| Promote | Facebook Integration | SPT-4902 in Integrations | Existing but scattered; move the event-specific case under Events |
| Promote | Tracking Links | 11 cases in suite 183 | Existing but scattered; move event-route cases under Events and keep cross-event/global cases in Tracking Links |
| Reports | Stats & Info | SPT-5080; SPT-4288 covers revenue realization only | Baseline gap closed; retain SPT-4288 as specialized coverage |
| External | View Event | No dedicated event-management handoff case | Cover in SPT-5072; public feature behavior remains outside this analysis |
| External | Manage All Events | SPT-784 covers the Manage Events page generally | Cover the return handoff in SPT-5072; do not duplicate list behavior |

##### Recommended Qase Suite Placement

> [!warning] Superseded proposal
> Do not use the historical structure below for folder moves. The current live-tree review and outstanding changes are in [[03 Test Cases/Events/event-management-qase-suite-reorganization|Event Management Qase Suite Reorganization]]. It preserves suite 85 as a sibling, keeps suite 84 named `Create / Edit Events`, and leaves cross-scope suites such as Branding in their broader location.

These folder recommendations remain read-only. Creating SPT-5071 through SPT-5080 in suite 80 did not create or rename folders, move cases, or update existing cases.

Use suite 80 as the canonical event-management container. Rename `Manage Events (Legacy)` to `Event Management` only when the later Qase reorganization is approved. Suite 85 `Manage Events` should be absorbed into the folders below instead of remaining as a competing sibling.

```text
Events (79)
└── Event Management (80)
    ├── Manage Events List
    ├── Create & Lifecycle
    ├── Overview & Navigation
    ├── Edit
    │   ├── Ticket Types
    │   ├── Order Form & Custom Questions
    │   ├── Advanced Options
    │   └── Google Event Categories
    ├── Manage
    │   ├── Email Customization
    │   ├── Branding
    │   ├── Attraction Configuration
    │   ├── Email Guests
    │   ├── Assigned Seating
    │   └── Publish Approval
    ├── Promote
    │   └── Tracking Links
    └── Reports
```

Do not create a folder for every CSV row. Put cases directly in the nearest page-group folder unless a feature already has several cases or is likely to keep growing.

| Proposed Folder | What Belongs There | Folder Rule |
| --- | --- | --- |
| Manage Events List | Event search, filtering, list navigation, visibility actions, and browser title | Keep list-level behavior separate from one event's management pages |
| Create & Lifecycle | Create, draft, publish, recurring events, child events, templates, clone, permissions, and protected event states | One lifecycle folder; do not split draft, recurring, template, and guardrail rows into separate folders |
| Overview & Navigation | Single and recurring Overview, sidebar pages by event type, View Event, and Manage All Events | Combine Overview and navigation because each has a small focused case set |
| Edit | Basic Info, Location & Info, Event Date & Time, Accommodations, Legal Policies & Important Info, Custom Display Fields, Donations, and Financial Settings | Keep these cases directly under Edit unless a section grows into several cases |
| Edit > Ticket Types | Inventory, pricing, sales settings, visibility, waitlist setup, internal rate cards, and delivery settings | Combine the current Ticket Types and Delivery Settings suites |
| Edit > Order Form & Custom Questions | Order Form settings, Standard Info, Enhanced Info, custom questions, and event terms | Keep the existing related cases together |
| Edit > Advanced Options | Password, exchanges, customer list, third-party ticket page, reports and email controls, thermal ticket text, and Workday | All Advanced Options cases belong in this one folder |
| Edit > Google Event Categories | Google category and helper-entity configuration | Keep the existing small feature folder under Edit |
| Manage | Waitlist page access, Live Stream, Edit Sellers, Transactions, Check In, and other small Manage-page checks | Keep one- or two-case areas directly under Manage |
| Manage > Email Customization | Event email customization only | Move only event-owned variants; keep venue-wide or hybrid coverage outside this folder until split |
| Manage > Branding | Event branding | Re-parent the existing event-branding suite rather than recreating its cases |
| Manage > Attraction Configuration | Attraction setup and special-event configuration | Merge the current Attraction Configuration and Special Events coverage here |
| Manage > Email Guests | Event guest-email behavior | Re-parent the existing Events child suite |
| Manage > Assigned Seating | Existing assigned-seating coverage | Keep as a specialist folder; this analysis requires only page presence |
| Manage > Publish Approval | Event creation, edit, request-publish, review, and approval states | Re-parent the existing workflow suite as a unit |
| Promote | Facebook Integration and any small event-promotion checks | Keep a single Facebook case directly under Promote |
| Promote > Tracking Links | Event-owned tracking-link cases | Keep global tracking-link list, export, and attribution coverage in its broader feature suite |
| Reports | Stats & Info and event-level reporting | Do not move unrelated platform-wide reports here |

###### Later Move Map

| Current Qase Location | Proposed Destination | Later Action |
| --- | --- | --- |
| Suite 85 `Manage Events` | Split between `Manage Events List`, `Create & Lifecycle`, and `Reports` | Move SPT-784, SPT-788, SPT-797, and SPT-4005 to Manage Events List; SPT-786 to Create & Lifecycle; SPT-4288 to Reports |
| Suite 84 `Create / Edit Events` and suite 820 `Edge Cases` | `Create & Lifecycle` or `Edit` based on the case's main action | Split by user flow; do not preserve the mixed Create/Edit folder |
| Suites 83 and 448 | `Edit > Ticket Types` | Combine ticket setup and ticket-delivery coverage under the visible Edit section |
| Suite 446 | `Edit > Order Form & Custom Questions` | Re-parent as one unit |
| Suite 81 | `Edit > Google Event Categories` | Re-parent as one unit |
| Suite 82 | `Manage > Assigned Seating` | Re-parent as one unit; no deep case rewrite in this scope |
| Suites 480 and 674 | `Manage > Attraction Configuration` | Combine Special Events with Attraction Configuration |
| Suite 1035 `Email Guest` | `Manage > Email Guests` | Re-parent as one unit and use the page's plural label |
| Suite 744 `Branding` | `Manage > Branding` | Re-parent the event-owned suite or its event-owned subset |
| Suite 749 `Email Customization` | `Manage > Email Customization` | Move SPT-3618, SPT-4150, and SPT-4151; split event variants from hybrid cases before moving |
| Suite 183 `Tracking Links` | `Promote > Tracking Links` | Move SPT-4239, SPT-4242, SPT-5010, and SPT-5011; retain global cases in the broader Tracking Links suite |
| Suite 186 `Integrations` | `Promote` | Move event-specific Facebook case SPT-4902 directly under Promote |
| Root suite 949 `Workflow Approval - V1` | `Manage > Publish Approval` | Re-parent the full suite as a unit |
| Suite 198 accommodation case | `Edit` | SPT-1784 moved to Create / Edit Events (84); refactor its wording; retain public rendering case SPT-359 in Core - Events |
| Suite 1034 `Hard Copy` | Keep directly under Events | It is event-related but is not a page or section of the event-management sidebar covered by this map |

#### Existing Qase Coverage

The following 48 cases are the core create/edit-form set. They are not the complete sidebar portfolio; the re-audit above records relevant cases outside this subset. Seating cases are represented by their suite count because this analysis only requires the page to exist.

| Qase ID | Suite | Title | Steps |
| --- | ---: | --- | ---: |
| SPT-745 | 81 | Dashboard - Google Events - Configure category-specific event metadata | 5 |
| SPT-749 | 81 | Dashboard - Google Events - Add category helper entity from event form | 6 |
| SPT-758 | 83 | Web Dashboard - Events - Ticket Types - Create active price tier for a new ticket type | 5 |
| SPT-759 | 83 | Web Dashboard - Events - Ticket Types - Enable Pay What You Can (PWYC) Option | 7 |
| SPT-760 | 83 | Web Dashboard - Events - Ticket Types - Configure Suggested Prices for PWYC | 6 |
| SPT-764 | 84 | Web Dashboard - Events - Create event with ticket type | 6 |
| SPT-766 | 84 | Dashboard - Events - Increase ticket type inventory and verify availability updates | 6 |
| SPT-768 | 84 | Web Dashboard - Events - Ticket Types - Preserve purchased ticket price after ticket type price change | 6 |
| SPT-769 | 84 | Web Dashboard - Events - Generate events from template | 6 |
| SPT-770 | 84 | Web Dashboard - Events - Ticket Types - Verify recurring event child price lock | 5 |
| SPT-772 | 83 | Ticket - Internal Rate Cards - Create New Internal Rate Cards for Ticket | 5 |
| SPT-775 | 84 | Create event with different slug names | 4 |
| SPT-777 | 84 | Web Dashboard - Events - Configure Event for NFC Only Redemption | 6 |
| SPT-780 | 84 | Web - Dashboard - Events - Enable Donations for Event | 7 |
| SPT-782 | 84 | Web - Dashboard - Events - Attempt to Enable Donations for Event (Unsupported Currency) | 4 |
| SPT-783 | 84 | Web - Dashboard - Events - Enable Donations for Attraction Style Event | 7 |
| SPT-786 | 85 | Web Dashboard - Manage Events - Clone event with configured setup | 6 |
| SPT-3247 | 446 | Web Dashboard - Event Settings - Order Form - Configure Post-Checkout Message | 3 |
| SPT-3248 | 446 | Web Dashboard - Event Settings - Order Form - Configure Ticket Button Verbiage | 4 |
| SPT-3249 | 446 | Web Dashboard - Event Settings - Order Form - Configure 'Require guest information for each ticket' | 3 |
| SPT-3251 | 446 | Web Dashboard - Event Settings - Order Form - Enable 'Require guest information for staff box office and POS sales' | 3 |
| SPT-3252 | 446 | Web Dashboard - Event Settings - Order Form - Select 'Standard Info' Collection Method | 3 |
| SPT-3253 | 446 | Web Dashboard - Event Settings - Standard Info - Add custom question by question type | 7 |
| SPT-3261 | 446 | Web Dashboard - Event Settings - Standard Info - Edit Existing Custom Question | 4 |
| SPT-3262 | 446 | Web Dashboard - Event Settings - Standard Info - Delete Custom Question | 4 |
| SPT-3263 | 446 | Web Dashboard - Event Settings - Order Form - Select 'Enhanced Info' Collection Method | 3 |
| SPT-3264 | 446 | Web Dashboard - Event Settings - Enhanced Info - Toggle Standard Enhanced Fields (e.g., First Name, Email, Phone, Birthday) | 4 |
| SPT-3268 | 446 | Web Dashboard - Event Settings - Package Event - Configure custom questions on child event/ticket type | 5 |
| SPT-3269 | 446 | Dashboard - Reports - Verify custom-question answers display as readable labels in Will Call | 4 |
| SPT-3270 | 446 | Dashboard - Check In - Verify custom-question answers display as readable labels in ticket details | 5 |
| SPT-3275 | 448 | Web Dashboard - Events - Configure E-ticket Only Delivery for Ticket Type | 6 |
| SPT-3276 | 448 | Web Dashboard - Events - Configure Shipping Only Delivery for Ticket Type with Handling Fee | 5 |
| SPT-3277 | 448 | Web Dashboard - Events - Configure Will Call Only Delivery for Ticket Type with Handling Fee | 5 |
| SPT-3278 | 448 | Web Dashboard - Events - Configure Multiple Delivery Options for Ticket Type with Handling Fees | 7 |
| SPT-3300 | 84 | Web - Dashboard - Events - Modify Donation Settings for an Active Event | 7 |
| SPT-3501 | 83 | Ticket - Internal Rate Cards - Override Rate Card | 5 |
| SPT-3810 | 84 | Events - Internal Rate Cards - Create New Internal Rate Cards | 5 |
| SPT-3811 | 84 | Events - Internal Rate Cards - Override Rate Card | 5 |
| SPT-4063 | 83 | Web Dashboard - Events - Ticket Types - Verify that ticket type visibility flips at the scheduled date/time | 7 |
| SPT-4288 | 85 | Web Dashboard - Manage - Events - Verify Accuracy of Event Stats When it has Revenue Realization | 4 |
| SPT-4299 | 820 | Web Dashboard - Edit Event - Update Parent Event to Non-Recurring with Archived Child Events | 3 |
| SPT-4384 | 83 | Dashboard - Waitlist/Resale - Configure Waitlist Settings for Ticket Type | 6 |
| SPT-4874 | 84 | Web Dashboard - Events - Validate required event setup fields before save or publish | 5 |
| SPT-4875 | 83 | Web Dashboard - Events - Configure ticket type sales window and visibility | 5 |
| SPT-4876 | 84 | Web Dashboard - Events - Create and edit recurring event with child events | 6 |
| SPT-4877 | 84 | Web Dashboard - Events - Configure online and livestream event settings | 6 |
| SPT-4878 | 446 | Web Dashboard - Event Settings - Configure event terms acceptance | 6 |
| SPT-4879 | 820 | Web Dashboard - Edit Event - Validate recurring conversion guardrails | 7 |

#### Source-Backed Behavior

- `/manage/` and `/edit/` host the same hash-router states. Unknown hashes default to `overview`; source registers Overview, Edit, Stats, ticket sellers, Email Guests, Assigned Seating, Facebook, Tracking Links, Publish Approval, Attraction Configuration, Branding, Email Customization, Waitlist, and Live Stream states.
- All event create, manage, edit, clone, and partial page views require `VP_MANAGE_EVENTS`. Event lookup in the server-rendered routes is scoped to the active venue; template creation additionally requires a superuser.
- Event Overview shows event ID/status/time, Net Sales, Net Revenue, redeemable-ticket count, checked-in percentage, conditional setup progress, and either a single-event ticket-type breakdown or a recurring-parent child-event table.
- The single-event ticket breakdown omits payment-plan ticket types. Recurring-parent rows show each child's date/status, Check In link, sold/inventory count, and net revenue.
- The create/edit form exposes Basic Info, Location & Info, Event Date & Time, conditional Accommodations, Ticket Types, Legal Policies, Order Form, conditional Custom Display Fields and Donations, Financial Settings, and Advanced Options. Advanced Options contains event passwords, exchange cutoff, customer-list assignment, third-party ticket redirects, event-report recipients, post-event email status, thermal-ticket text, conditional Workday integration, and reminder-email control.
- The Manage group conditionally exposes Email Customization, Branding, Waitlist, Attraction Configuration, Live Stream, Edit Sellers, Email Guests, Assigned Seating, Transactions, Check In, and Publish Approval. Promote contains Facebook Integration and Tracking Links; Reports contains Stats & Info; View Event and Manage All Events are external/return handoffs.
- Transactions requires financial or Box Office permission, Check In and Email Guests are hidden for drafts, parent-owned groups are hidden for recurring children, Facebook requires a complete street address, and several pages require a feature flag, venue module, pricing tier, or workflow state.
- Drafts can be saved with generated placeholder name/location/schedule values, but activation requires a non-placeholder name, location, and slug. Approval-workflow events cannot publish without approval.
- Recurring creation requires at least two unique child schedules. Child edits preserve `parent_event`, recurring status, venue, and passwords; parent edits propagate eligible values while preserving child-specific values unless explicit propagation is requested.
- Template status cannot be added to or removed from an existing event. `/dashboard/events/create-event-template/` is superuser-only; templates can generate events and have their own Edit route.
- `/dashboard/events/{slug}/edit-form/` remains an active standalone editor linked from Edit Sellers and the Facebook call-to-action. `/dashboard/events/{slug}/edit/` is a compatibility manage-shell alias.
- Create and update may run asynchronously. The client polls until the event is no longer save-pending; a pending event cannot be edited, and a refunded event cannot be updated.
- Event archival is blocked for sold events and for recurring parents that still have child events.

#### Product-Surface and Complex-Control Inventory

| Surface / Control | Applicable State | Existing Coverage | Decision |
| --- | --- | --- | --- |
| Event Overview summary cards | Single, draft, recurring parent | None dedicated | New coverage required |
| Setup progress and corrective links | Incomplete future/current event | None | New coverage required |
| Single-event ticket breakdown and sorting | Non-parent event | None | New coverage required |
| Recurring-parent child table and sorting | Recurring parent | None | New coverage required |
| Full create form | New event | SPT-764, SPT-4874 | Keep; add distinct draft lifecycle |
| Draft edit and publish | Draft event | Partial SPT-4874 | New clean lifecycle required |
| Recurring child editor | Recurring child | Broad SPT-4876 | Strengthen SPT-4876; do not duplicate |
| Template create/edit/generate | Template | SPT-769 | Strengthen role, route, and persistence proof |
| Clone | Single/recurring/template | SPT-786 | Existing |
| Standalone editor | Active route `/edit-form/` | None | New entry-point coverage required |
| Legacy `/edit/` manage alias | Direct compatibility route | None | Accounted as same implementation; no separate case |
| Full-screen create wizard | Unlinked route `/create-event/` | None | Deferred pending support status |
| Order Form legacy/embedded variants | Existing event vs unsaved create/clone | SPT-3247–3270, SPT-4878 | Existing behavior coverage; feature-flag route/state should be clarified in descriptions |
| Financial Settings/internal fees | Authorized non-child event | SPT-772, SPT-3501, SPT-3810, SPT-3811 | Presence-only smoke in this scope |
| Assigned Seating page | Eligible non-child event | 25 cases in suite 82 | Presence-only smoke in this scope |
| Accommodations configuration | Accommodation-enabled venue | SPT-1784 is not executable and is now in suite 84; SPT-359 proves public output only | Refactor SPT-1784; do not duplicate SPT-359 |
| Custom Display Fields | Venue allows integrated display fields; non-child event | None | New coverage required |
| Advanced Options configuration | Mostly non-child event; several controls are conditional | Public password/output cases only | New parameterized persistence coverage required |
| Email Customization and Branding | Eligible event and organizer | Existing in suites 749 and 744 | Existing coverage; suite-placement correction, not new cases |
| Edit Sellers | Parent/single event with ticket types | None | New focused permission-persistence coverage required |
| Email Guests and Attraction Configuration | Eligible active event | SPT-5012–5018; SPT-3524–3529, SPT-4090, SPT-4829 | Existing under Events |
| Transactions, Check In, View Event | State/permission-dependent handoffs | Deep destination coverage exists outside Events | Add event-scoped handoff assertions to navigation case |
| Facebook and Tracking Links | Parent/single event; Facebook also needs complete address | SPT-4902; suite 183 | Existing coverage; move event-owned cases under Events |
| Publish Approval | Applicable active workflow; non-child event | SPT-4699–4718, SPT-4750–4754 | Existing; re-parent suite 949 under Events |
| Stats & Info | Single or recurring parent | SPT-4288 is settlement-only | New baseline page case required |

#### Coverage Gaps

| Gap | Evidence | Recommendation |
| --- | --- | --- |
| No Event Overview case | Full-project Qase search found no title, description, or step for the route or page sections | Add separate single-event and recurring-parent overview cases |
| No setup-progress/navigation state case | Overview and sidebar are conditional by completeness, event type, status, permissions, flags, and pricing tier | Add one state-aware navigation/presence case |
| No clean draft lifecycle | SPT-4874 mixes several invalid inputs and ends with an ambiguous draft-or-publish action | Created SPT-5073 for save-draft, reopen, edit, publish, and cleanup |
| Child edit proof is vague | SPT-4876 says edits are “blocked or limited” without naming the child route, allowed values, or parent/sibling proof | Enhance SPT-4876 with exact child edit steps and fresh-read checks |
| Standalone edit entry is absent | Source links to `/edit-form/`; Qase cases use generic “open event edit” wording | Created SPT-5074 for edit-entry persistence |
| Manage permission and venue ownership are absent | All page routes require manage-events permission; lookups are venue-scoped | Created parameterized SPT-5075 |
| Pending/refunded/archive guardrails are absent | Backend blocks pending/refunded updates and protected archival | Created parameterized SPT-5076 |
| Wizard support is unknown | `/create-event/` exists, but no current source link was found | Keep Deferred until product confirms it is supported |
| Full sidebar was not explicitly enumerated | Source and screenshot show Edit, Manage, Promote, Reports, and external destinations with distinct conditions | Use SPT-5072's plain page list for each event type and confirm selected-event links open the correct event |
| Custom Display Fields have no case | Source provides add, formatted/plain value, delete, and integrated-page-only behavior | Created SPT-5077 |
| Advanced Options configuration is unowned | Public password and email cases do not prove Dashboard add/save/remove behavior for the controls in this section | Created parameterized SPT-5078; keep public-output cases separate |
| Edit Sellers has no dedicated case | Source mutates venue and employee seller permission, visibility, payment methods, sales limits, and full-stats access | Created SPT-5079 with reversible employee and affiliate-seller variants |
| Stats & Info baseline is absent | SPT-4288 only validates revenue realization after settlement and has no named baseline page assertions | Created SPT-5080 for single and recurring shapes |
| Relevant cases are scattered outside Events | Global scan found Branding, Email Customization, Tracking Links, Facebook integration, Workflow Approval, and accommodation setup in other suites | Apply the suite-placement recommendations above; do not create duplicates |

#### Qase Case Improvements

##### Portfolio-Wide for the 48 Direct Cases

- Add the required `Platform / View` table to every Description. None of the 48 descriptions currently includes it; use `Dashboard / Desktop`.
- Reduce tags to 1–3 approved tags. Thirty-four cases have more than three tags, and 31 use at least one unapproved tag. Common invalid tags include `ticket-types`, `event-settings`, `validation`, `web`, `pricing`, `info-collection`, and delivery-specific tags.
- Use asterisk bullets for multi-item Preconditions and Postconditions. SPT-775, SPT-4063, and SPT-4299 also need missing or incomplete final-state instructions.
- Split multi-action steps so each row contains one user action and one visible expected result. Move backend rules and exhaustive variant mapping into Description or test data.
- Keep current case purpose and supported behavior when refining. No Qase write should silently remove a pricing, delivery, recurring, or custom-question variant.

##### Priority Case-Specific Suggestions

| Qase Case | Keep | Improve |
| --- | --- | --- |
| SPT-764 | Clean basic event creation and paid/free ticket coverage | Use the exact `/dashboard/events/create/` start, make the baseline outcome Published, add persistence after reopen, and leave the successful Draft lifecycle to a separate case. Reduce tags to `dashboard`, `events`, `create-event`. |
| SPT-775 | Numeric and special-character slug coverage | Fully refactor the description, role, route, cleanup, and step table. Add `SlugInput` and `SaveOutcome` mappings or fold only the invalid/duplicate values into SPT-4874 without losing numeric/special-character coverage. |
| SPT-769 | Template create, edit, generate, and immutable status | State that `/dashboard/events/create-event-template/` requires a superuser, verify saved template persistence before generation, and keep status-transition checks explicit. |
| SPT-4288 | Revenue-realization/settlement regression | Do not count it as Event Overview coverage. Move technical settlement setup to Preconditions, replace “Now check if stats are correct” with named source and expected totals, and identify the exact stats screen. |
| SPT-4299 | Archived-child conversion behavior | Remove the Admin action from manual steps by preparing archived children in Preconditions; add observable results and cleanup. |
| SPT-4874 | Required-field and publish validation | Map each `ValidationScenario` to exact data and one expected message. Do not execute all invalid combinations in every parameter row. Keep the new clean Draft lifecycle separate. |
| SPT-4876 | Recurring creation and parent/child state | Name the child path `/dashboard/events/{child-slug}/manage/#/edit`, identify a child-owned change, reopen parent and sibling, and replace “blocked or limited” with exact expected behavior. |
| SPT-4879 | Purchased, doors-open, and active-child conversion guardrails | Make each parameter run only its mapped setup and assertion; remove the current repetition where every run executes all three scenarios. |
| SPT-3247–SPT-3270 | Order form and custom-question behaviors | Add Dashboard/Desktop tables, use `dashboard` plus `custom-questions` or `checkout`, and state whether the existing-event embedded editor or legacy builder is used. |
| SPT-3275–SPT-3278 | Delivery configuration variants | Keep distinct flows only where the visible setup differs; otherwise consider one `DeliverySetup` parameter after preserving handling-fee and downstream delivery assertions. |
| SPT-1784 | Dashboard accommodation setup | Replace the two screenshot-only steps with add, save, reopen, edit, remove, and cleanup proof; move the case under Events > Create / Edit Events. Keep SPT-359 as the public accommodation-block case. |
| SPT-3618, SPT-4150, SPT-4151 | Event-only email customization behavior | Preserve their functional coverage and move them into an Events > Email Customization child suite. |
| SPT-3619, SPT-4087 | Hybrid event/venue email behavior | Split the event variant before moving it under Events so venue-level coverage is not silently relocated or lost. |
| SPT-4124–SPT-4128, SPT-4335, SPT-4742 | Branding lifecycle and inheritance | Keep the cases; re-parent Branding under Events so the event sidebar feature is discoverable. Add exact event-management start paths to event-specific cases. |
| SPT-4239, SPT-4242, SPT-5010, SPT-5011 | Event-owned Tracking Links flows | Move under Events > Tracking Links and name `/dashboard/events/{slug}/manage/#/tracking-links` where it is the actor entry point. |
| SPT-4902 | Facebook official event integration | Move under Events > Facebook Integration and use the event sidebar as the primary start path. |
| SPT-4699–SPT-4718, SPT-4750–SPT-4754 | Event approval lifecycle | Re-parent suite 949 under Events; retain its focused workflow structure rather than copying cases into Create / Edit Events. |

#### Coverage Ledger

| Item | Type | Risk | Coverage | Evidence / Decision |
| --- | --- | --- | --- | --- |
| Single-event overview | Route/page | Reporting disagreement | Created SPT-5071 | Source template/controller; prior Qase gap |
| Recurring-parent overview | Route/page | Child totals disagreement | Created SPT-5071 | Source template/controller; prior Qase gap |
| State-aware sidebar and setup progress | Navigation/conditional UI | Missing operational access | Created SPT-5072 | Source sidebar and overview progress |
| Basic event creation | Mutation | Unsellable event | Existing | SPT-764 |
| Invalid create/publish | Validation | Bad active event | Existing, improve | SPT-4874 |
| Draft save/reopen/publish | Lifecycle mutation | Lost or stuck draft | Created SPT-5073 | Source model defaults and publish validation |
| Parent/child create and edit | Lifecycle mutation | Recurrence corruption | Existing, improve | SPT-4876 |
| Recurring conversions | Validation | Invalid recurrence state | Existing, improve | SPT-4879; SPT-4299 |
| Template create/edit/generate | Specialized create | Wrong generated configuration | Existing, improve | SPT-769 |
| Clone | Specialized create | Original/clone corruption | Existing | SPT-786 |
| Standalone edit route | Entry path | Broken linked editor | Created SPT-5074 | Active source links to `/edit-form/` |
| `/edit/` manage alias | Entry path | Compatibility break | Not applicable as separate case | Same manage shell and hash states |
| Create wizard | Entry path | Unsupported route ambiguity | Deferred | Route/template exist; no active link found |
| Route permissions/venue scope | Permission boundary | Unauthorized edit | Created SPT-5075 | View decorators and venue-scoped lookup |
| Pending/refunded/delete guards | Mutation guardrail | Conflicting save or data loss | Created SPT-5076 | API viewset and archival service |
| Financial Settings/internal fees | Section | Missing configuration access | Presence-only in SPT-5072 | Existing detailed rate-card cases excluded from deep review |
| Assigned Seating | Page | Missing seating entry | Presence-only in SPT-5072 | Existing 25-case suite excluded from deep review |
| Accommodations | Conditional edit section | Lost or unusable lodging information | Existing but unusable/scattered → refactor SPT-1784 | SPT-359 proves public output only |
| Custom Display Fields | Conditional edit section | Missing integrated-site metadata | Created SPT-5077 | Source add/edit/delete controls; prior Qase gap |
| Advanced Options | Conditional edit section | Lost visibility, redirect, reporting, email, or print configuration | Created SPT-5078 | Source controls; public-output cases are not configuration proof |
| Branding | Manage page | Lost event presentation or inheritance | Existing; suite move | SPT-4124–4128, SPT-4335, SPT-4742 in suite 744 |
| Email Customization | Manage page | Wrong event email content or fallback | Existing; selective suite move | Event-specific cases in suite 749 |
| Edit Sellers | Manage mutation | Wrong seller access, payment method, or sales limit | Created SPT-5079 | Source template/controller; prior Qase gap |
| Email Guests | Manage mutation | Blocked or invalid attendee communication | Existing | SPT-5012–5018 under Events |
| Attraction Configuration | Manage mutation | Broken attraction composition | Existing | SPT-3524–3529, SPT-4090, SPT-4829 under Events |
| Waitlist and Live Stream pages | Conditional manage pages | Missing configured workflow access | Existing functional coverage plus SPT-5072 smoke | SPT-4384, SPT-4877 |
| Transactions / Check In / View Event | External handoffs | Wrong event context or inaccessible operation | SPT-5072 navigation smoke; deep destination cases remain separate | Source uses event slug and state/permission conditions |
| Facebook / Tracking Links | Promote pages | Broken event promotion entry | Existing; suite move plus SPT-5072 smoke | SPT-4902 and event-owned suite 183 cases |
| Publish Approval | Conditional manage lifecycle | Unauthorized or stuck publication | Existing; suite re-parent | Suite 949 workflow cases |
| Stats & Info | Reports page | Misleading sales, scan, or revenue reporting | Created SPT-5080 plus specialized SPT-4288 | SPT-4288 covers settlement-specific realization only |
| Loading/API error states on Overview | Error/recovery | Blank or stale dashboard | Deferred to automation | Deterministic request control is preferable |

#### Risk Areas

- Event Overview labels `gross_sales` as Net Sales while separately displaying Net Revenue; a regression can create a misleading organizer-facing reconciliation.
- The checked-in percentage combines used redeemable tickets with a sold-ticket denominator and must remain stable at zero when no applicable tickets exist.
- Single-event breakdown excludes payment-plan ticket types, while recurring parents use child aggregation APIs; testing only one event shape misses a distinct data path.
- Create/update waits on an asynchronous task or save-pending poll. Timeouts, duplicate submission, or stale reloads can leave an organizer unsure whether the change persisted.
- Parent propagation intentionally preserves child values that have diverged unless explicit propagation is requested; vague recurring tests can miss sibling corruption.
- Draft, template, child, active, and approval-workflow events expose different status actions and sidebar links.
- The standalone editor remains linked from older workflows even though the manage editor is the primary path.
- Feature flags, venue modules, pricing tier, permissions, address completeness, event state, and recurring ownership all change the visible sidebar; one fully enabled active event does not prove the hidden-state rules.
- Scattered suite ownership makes existing coverage look absent and encourages duplicates. Suite reorganization must preserve cross-scope cases whose parameters also cover venues, memberships, holds, or global tracking-link behavior.

#### Automation Candidates

- Deterministic single-event Overview test with known orders and check-ins; assert the five summary cards, one-time ticket rows, sorting, and zero-denominator behavior.
- Recurring-parent Overview test with two children and distinct inventory/revenue; assert aggregation and child-row values.
- Route/permission matrix for authorized venue, missing `VP_MANAGE_EVENTS`, other-venue slug, and non-superuser template creation.
- Draft create → reopen → publish flow using a disposable event, with fresh API read and archive cleanup.
- Parent and child edit persistence with sibling non-regression.
- Async create/update task success, failure, and polling timeout; assert one saved event and no duplicate submission.
- One shallow smoke for Financial Settings visibility and one for Assigned Seating page reachability; keep detailed feature automation in their own suites.
- A source-derived route matrix for every sidebar destination, including selected-event query/slug assertions for Transactions, Check In, View Event, and Manage All Events.
- Custom Display Fields add/save/reopen/delete and a parameterized Advanced Options persistence set with feature-controlled fixtures.
- Edit Sellers employee and affiliate-venue permission mutations with cleanup and fresh-read proof.
- Stats & Info single/recurring rendering, date filtering, sorting, chart toggles, and report-download availability with deterministic stats fixtures.

#### Open Questions

- Non-blocking: is `/dashboard/events/create-event/` intentionally retired/unlinked? If it is supported, add a separate wizard case; otherwise document or remove the route rather than adding Qase coverage.
- Non-blocking: should event-scoped rows be split out of multi-scope Email Customization cases before moving them, or should those cross-scope cases remain under Emails with explicit `events` tags and links from the Event suite?

### New-Case Design Record

#### Testing Intent

We are checking that organizers can see correct event information, create and edit events, open the pages available for each event type, and are blocked from events they are not allowed to change.

| Field | Answer |
| --- | --- |
| Main risks | Incorrect event reports, lost event changes, blocked sales setup, and unauthorized event access |
| What must remain true | Event information stays correct, saved changes remain after reopening the event, and only authorized organizers can make changes. |
| What proves it | Dashboard totals match known activity, expected pages are available, saved values remain after reopening, and restricted accounts cannot see or change the event. |
| Platform | Dashboard |
| View | Desktop |
| Out of scope | Detailed fee calculations and detailed seating-map creation or seat assignment |
| Confidence | High, except for the unlinked create-event wizard, which remains deferred |

#### Proof Target Map

| Proof Target | Covered By |
| --- | --- |
| Event Overview agrees with known activity for single and recurring events | SPT-5071 |
| Each event type shows the pages and actions that apply to it | SPT-5072 |
| A draft can be saved, reopened, edited, and published | SPT-5073 |
| Supported edit entry points open and save the correct event | SPT-5074 |
| Restricted accounts cannot open event or template pages they are not allowed to use | SPT-5075 |
| Events in protected states cannot be changed or deleted incorrectly | SPT-5076 |
| Custom Display Fields can be added, saved, shown in the correct place, and removed | SPT-5077 |
| Available Advanced Options remain saved for the selected event | SPT-5078 |
| Seller access changes only for the selected event and ticket type | SPT-5079 |
| Stats & Info agrees with known activity for single and recurring events | SPT-5080 |

#### Recommended Test Data

- One published single event with two standard ticket types, one payment-plan ticket type, known orders, and one checked-in ticket.
- One recurring parent with two future child events that have different sales, check-in, inventory, and revenue values.
- One draft event, one recurring child, and one event template.
- One organizer who can manage events, one employee who cannot, a second venue, and one superuser.
- One event whose save is still in progress, one refunded event, one sold event, and one recurring parent with children.
- One venue with Custom Display Fields enabled and an integrated test page that shows those fields.
- Events with the required Advanced Options enabled.
- One disposable employee seller and one test affiliate venue. An affiliate venue is another organizer allowed to sell tickets for the event.

#### Existing Case Improvements Instead of New Cases

Improve SPT-4876 instead of adding another recurring-child case:

- In Manage Events, expand the recurring parent and select Edit for one child.
- Change one date or time that belongs to the child, save, and reopen the child.
- Reopen the parent and one sibling to confirm that their information did not change.
- Confirm that settings controlled by the parent are not shown on the child.

Also improve and reorganize existing coverage instead of duplicating it:

- Refactor SPT-1784 for Dashboard Accommodations setup; its move to Create / Edit Events (84) is complete. Keep SPT-359 for the public accommodation display.
- Event-owned Branding, Email Customization, Tracking Links, and Facebook Integration moves are complete. Leave Workflow Approval unchanged because it is outside this feature-parity scope.
- Keep SPT-5012–5018 and the Attraction Configuration cases where they are because they are already under Events.

#### Minimum Execution Set

- SPT-5071 with both event types
- SPT-5073 for the full draft lifecycle
- SPT-5074 with both authorized edit starting points
- SPT-5075 with every restricted-access scenario
- SPT-5077 for Custom Display Fields
- SPT-5079 with both seller types
- SPT-5080 with both event types
- SPT-4876 after the recurring-child improvements

Run SPT-5072, SPT-5076, and each available SPT-5078 option when the required events and venue settings are available.

#### Automation Candidates

- Automate SPT-5071 and SPT-5080 with event activity that has known totals.
- Automate SPT-5072 as a page-visibility check for each event type.
- Automate SPT-5073 with a disposable event and verified archive cleanup.
- Automate SPT-5074 with both supported edit starting points.
- Automate SPT-5075 with restricted accounts and cross-venue test data.
- Automate SPT-5077 with an integrated-page check and cleanup.
- Automate each SPT-5078 option as a separate test so one unavailable option does not block the others.
- Automate SPT-5079 with disposable employee and affiliate access plus cleanup.
- Automate save success, failure, and timeout separately.
- Keep Financial Settings and Assigned Seating checks limited to confirming that the page or section is available.

#### Open Questions

- None blocks these cases. A SPT-5078 option is not applicable when its required venue setting is unavailable.
- Do not add a case for the unlinked create-event wizard until the product team confirms that it is supported.

### Core Lifecycle Refactor Record

#### Full Core Audit Disposition

The audit used a fresh read of all 51 explicitly mapped Qase cases on 2026-08-24. `Improve` means the case has at least one material problem such as ambiguous actions, missing test data or expected results, a parameter that does not control the steps, missing fresh-read or downstream proof, or multiple unrelated workflows in one case.

| Feature Group | Qase Cases | Decision | Reason |
| --- | --- | --- | --- |
| Event Overview and navigation | SPT-5071, SPT-5072 | Leave unchanged | Clear event-shape parameters, expected-page matrices, and observable results are already present. |
| Single-event create and validation | SPT-764, SPT-775, SPT-4874 | Improve | Correct the ticket-requirement parameter, replace the unusable slug case, and map each validation parameter to one executable scenario. |
| Draft lifecycle | SPT-5073 | Improve | The case does not explicitly add the category required before Publish and does not execute its stated cleanup. |
| Recurring lifecycle | SPT-4876 | Split | Keep recurring parent creation in SPT-4876; move child-event editing into a dedicated new case after duplicate review. |
| Recurring conversion guardrails | SPT-4299, SPT-4879 | Improve | SPT-4299 needs an explicit internal fixture and fresh-read proof; SPT-4879 currently executes every guardrail on every parameter run. |
| Permissions and protected states | SPT-5075, SPT-5076 | Leave unchanged | The scenario matrices, actors, actions, and non-mutation proof are already clear. |
| Event templates | SPT-769 | Improve | Keep organizer-visible template generation in the case and remove the backend-only status-mutation attempt; SPT-5072 already proves that template actions are restricted in the Dashboard. |
| Clone Event | SPT-786 | Improve | Define what is copied, what is intentionally reset, and how single and recurring clones differ. |
| Ticket inventory and pricing | SPT-758–SPT-760, SPT-766, SPT-768, SPT-770 | Improve | Add exact data and fresh reads; remove or correct parameters that currently cause the same combined workflow to run repeatedly. |
| Ticket sales settings | SPT-4063, SPT-4384, SPT-4875 | Improve | Replace vague results, repair mismatched parameter names, and make each availability/waitlist state executable. |
| Ticket delivery settings | SPT-3275–SPT-3278 | Improve | Add exact delivery/fee data, fresh-read persistence, and buyer-facing availability proof. |
| Order Form and Custom Questions | SPT-3247–SPT-3253, SPT-3261–SPT-3264, SPT-3268 | Improve | Several cases have missing or misaligned expected results and do not prove saved configuration after reopening. |
| Custom-question downstream labels | SPT-3269, SPT-3270 | Leave unchanged | Exact setup, surfaces, and readable-label proof are already present. |
| Terms acceptance | SPT-4878 | Improve | Its parameter does not select a scenario; the current steps always execute validation, override, and inheritance together. |
| Google event metadata | SPT-745, SPT-749 | Improve | Map each category/helper parameter to its visible fields and exact saved data. |
| Donations | SPT-780, SPT-782, SPT-783, SPT-3300 | Improve | Remove optional/ambiguous actions, repair missing or shifted expected results, and verify Dashboard plus buyer-facing persistence. |
| Online and livestream events | SPT-4877 | Improve | Its parameter does not select a scenario; valid, invalid, and restricted-active-room behavior are currently mixed. |
| Financial Settings and internal fees | SPT-772, SPT-3501, SPT-3810, SPT-3811 | Presence only; leave unchanged | Deep fee behavior is outside this gap-analysis scope; SPT-5072 checks that the section exists. |
| Map Editor / Assigned Seating | SPT-5072 plus suite 82 | Presence only; leave unchanged | Confirm the page or section exists; do not expand seat creation or assignment coverage here. |
| Unsupported create wizard | No case | Deferred | The unlinked `/dashboard/events/create-event/` flow remains deferred until product support is confirmed. |

**Audit count:** 41 improve or split, 6 leave unchanged, 4 fee cases intentionally untouched, and 1 route deferred without a case.

#### Testing Intent

We are testing whether organizers can create, validate, save, publish, reopen, clone, template, and safely edit events while event-owned ticket, order-form, delivery, metadata, donation, virtual-event, and terms settings remain correct on their downstream surfaces. These workflows protect event availability, customer sales, inventory, and historical financial state. Proof requires fresh Dashboard reads and the customer or staff surface affected by each setting.

| Field | Answer |
| --- | --- |
| Criticality bucket | Live sales completion, inventory integrity, historical financial integrity, and event configuration |
| Business invariant | A saved event and its owned settings remain internally consistent, survive a fresh read, and produce the intended customer or staff behavior. |
| Actor impact | Organizer, employee, customer, and internal fixture operator for one archived-child regression |
| Failure mode | Invalid events publish, saved values disappear, recurrence corrupts parent/child state, buyer availability is wrong, or later edits rewrite prior transactions. |
| Observable proof | Fresh Dashboard state plus public checkout, event page, Widget, staff-sale surface, transaction, or email output as appropriate |
| Primary surfaces | Dashboard Desktop, WebPublic Desktop, Widget Desktop when configured, WebBoxOffice Desktop, PointOfSale Mobile, Admin Desktop |
| In scope | Every case mapped in Core Event Lifecycle and Existing Feature Coverage, plus one dedicated child-edit case |
| Out of scope | Deep internal/organizer fee behavior, Map Editor creation/seat assignment, Workflow Approval, and the unsupported create wizard |
| Confidence | High for source-backed validation and visible controls; conditional fixtures are explicitly called out |

#### Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| A valid single event publishes and survives a fresh Dashboard read | Prevents lost or incomplete event setup | SPT-764 |
| Public output matches the selected ticket requirement | Prevents customers from seeing the wrong purchase or attendance instructions | SPT-764 `TicketRequirement` |
| Disposable test data is removed | Prevents abandoned public test events | SPT-764 cleanup steps |

#### SPT-764 Preservation and Refactor Decision

| Existing Coverage | Decision |
| --- | --- |
| Organizer creates a basic event | Preserve and make the starting location and required setup executable. |
| Paid ticket and free admission parameter values | Preserve the two behaviors; rename them to the visible product choices `TicketsRequired` and `FreeEventTicketsNotRequired`. |
| Draft or published outcome in one step | Remove the draft branch from SPT-764 because SPT-5073 now owns the complete draft lifecycle. |
| Saved event appears in Manage Events | Preserve and strengthen with a fresh reopen through Manage Events. |
| Public page and configured Widget output | Preserve with parameter-specific public assertions and a conditional Widget step. |
| Image and custom slug in the required-details step | Do not require them; source shows they are optional for this clean publish case. |

#### Sources Reviewed

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/dashboard/urls.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/dashboard/views.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/_create-form.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/EventCreate.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/recurring_event_reconciliation.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/complete_event_clone.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/event_template/bulk_event_generation.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/event_template/bulk_events_builder.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/streaming/models.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/dialogs/_edit-ticket-type.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/components/pay-what-you-can-configuration.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/generic/constants.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/front/tickets/events/event-detail.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/front/tickets/events/partials/__button-verbiage.html`

#### Coverage Ledger

| Area | Coverage | Evidence / Decision |
| --- | --- | --- |
| Single create, public link, required fields, and draft lifecycle | SPT-764, SPT-775, SPT-4874, SPT-5073 | Clean success, negative validation, draft recovery, public proof, and cleanup are separate. |
| Recurring creation, child edit, and conversion guardrails | SPT-4876, SPT-5082, SPT-4299, SPT-4879 | Parent creation no longer edits children; SPT-5082 is the dedicated split. |
| Templates and cloning | SPT-769, SPT-786 | Generated/cloned identity, copied configuration, intentional resets, and source preservation are explicit. |
| Ticket pricing, inventory, visibility, and waitlist | SPT-758, SPT-759, SPT-760, SPT-766, SPT-768, SPT-770, SPT-4063, SPT-4384, SPT-4875 | Incorrect or redundant parameters are removed or replaced with scenario-driving parameters. |
| Delivery settings | SPT-3275–SPT-3278 | All methods, independent fees, persistence, and buyer selection are covered; E-ticket fee behavior is corrected. |
| Order Form and custom questions | SPT-3247–SPT-3249, SPT-3251–SPT-3253, SPT-3261–SPT-3264, SPT-3268 | Dashboard persistence and downstream checkout, staff, and package behavior are connected. |
| Google metadata and helper entities | SPT-745, SPT-749 | Category parameters map to exact visible roles and data. |
| Donations | SPT-780, SPT-782, SPT-783, SPT-3300 | Supported currency, unsupported visibility, attraction output, and historical-order preservation are covered. |
| Virtual events and event terms | SPT-4877, SPT-4878 | Each parameter now selects one valid, invalid, inherited, or protected scenario. |
| Existing cases left unchanged | SPT-5071, SPT-5072, SPT-5075, SPT-5076, SPT-3269, SPT-3270 | Already executable and correctly parameterized. |
| Fees and Map Editor | Presence only | SPT-5072 checks availability; deep behavior is intentionally unchanged. |
| Unsupported create wizard | Deferred | No case until product support is confirmed. |
| Qase writes | Applied and verified | 41 existing cases updated; SPT-5082 created as the dedicated child-edit case. No cases were moved or deleted in this content batch. |
