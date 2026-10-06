---
title: Event — Overview
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Overview

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration coverage

SPT-5071 owns totals, child rows, sorting and Check In links; SPT-5114 is a weaker overlapping migration case, not extra reporting proof. Compare known orders with saved totals, not just a rendered card. Draft readiness, no-sales/empty totals, failed loading and refreshed values after a sale remain gaps; the retained case below does not yet prove them. Shared protected-state checks are in SPT-5076.

Sources: [event statistics API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>), [Overview page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/overview/ui/pages/EventOverviewPage.web.tsx>).

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-5071](https://app.qase.io/case/SPT-5071) | Event Overview (1053) | Existing case preserved; migration notes below apply |

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
