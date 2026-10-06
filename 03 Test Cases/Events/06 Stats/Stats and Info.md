---
title: Event — Stats & Info
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Stats & Info

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration coverage

SPT-5080 covers event reports; SPT-4288 covers revenue realization. SPT-5114 is an overlapping native smoke. Current navigation does not hide Stats & Info solely because the event is a recurring child; template navigation is different. Reconcile known records and report scopes, not just visible totals or a downloaded filename.

Sources: [Stats & Info page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/stats-info/ui/pages/EventStatsInfoPage.web.tsx>), [event API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-4288: Web Dashboard - Manage - Events - Verify Accuracy of Event Stats When it has Revenue Realization

**Description:**

This test validates that event statistics for parent and child events accurately reflect revenue realization after settlement generation. It ensures that revenue from multiple purchase scenarios—including standalone packages, mixed carts, and standalone tickets—is correctly attributed to the child event's stats and processed accurately during the venue settlement workflow.

**Preconditions:**

* A "Package" event is created containing at least one "Child Ticket" from a separate "Child Event."


* The "Child Event" has standalone tickets available for purchase.

**Postconditions:**

* Settlement is generated and verified.
* Statistics for the child event reflect the realized revenue.

**Tags:** 

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete a purchase for a Package only via the public event page.<br><br>Complete a purchase containing both a Package and a standalone ticket for the child event.<br><br>Complete a purchase for a standalone ticket of the child event only. |  | The order is successfully processed and a confirmation is displayed. |
| Locate the invoice items for the completed transactions and set the payout date to a date in the past. |  |  |
| Generate a settlement for the venue. |  |  |
| Now check if the event stats are correct.<br><br>Do this for the parent and child events |  |  |


## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-5080](https://app.qase.io/case/SPT-5080) | Create Events (80) | Existing case preserved; migration notes below apply |

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
