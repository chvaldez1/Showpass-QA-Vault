---
title: Event Management New Qase Gap Analysis Cases
date: 2026-08-24
tags:
  - qa/test-cases
  - qase
  - events
aliases:
  - Event Overview New Qase Cases
---

# Event Management New Qase Gap Analysis Cases

> [!info] Draft only
> These are Qase-ready suggestions from [[03 Test Cases/Events/event-management-existing-qase-gap-analysis|Event Management Existing Qase Gap Analysis]]. No Qase write was performed. Existing broad recurring case SPT-4876 should be enhanced for explicit child editing rather than duplicated here.

## Testing Intent

We are testing whether an organizer can read event state, complete the draft-to-published lifecycle, and use every supported event-management destination while permission, selected-event context, and persistence boundaries remain correct; this matters because incorrect totals, inaccessible controls, lost edits, wrong-event handoffs, or unauthorized changes can block event operations and sales.

| Field | Answer |
| --- | --- |
| Criticality bucket | Reporting/dashboard agreement; permission boundary; live sales completion |
| Business invariant | Overview data agrees with the event's real activity, supported event states expose the right management surfaces, and event changes persist only for authorized venue users. |
| Observable proof | Reconciled overview values, correct state-dependent links, fresh-read persistence, denied restricted routes, and unchanged protected event state. |
| Platform | Dashboard |
| View | Desktop |
| Out of scope | Deep fee calculation/rate cards and detailed seating creation/assignment. |
| Confidence | High except for the unlinked create wizard, which remains Deferred. |

## Proof Target Map

| Proof Target | Covered By |
| --- | --- |
| Single-event Overview agrees with known activity | TC-1 |
| Recurring-parent Overview agrees with child activity | TC-2 |
| Status/type-specific navigation and required page presence are correct | TC-3 |
| A draft can be saved, reopened, edited, and published | TC-4 |
| Both supported edit entry points save and persist | TC-5 |
| Permission, venue ownership, and template-role boundaries are enforced | TC-6 |
| Pending, refunded, sold, and recurring-parent guardrails prevent unsafe changes | TC-7 |
| Custom Display Fields persist and can be removed without affecting the public Showpass event page | TC-8 |
| Applicable Advanced Options save and persist for the selected event | TC-9 |
| Seller permissions change only for the selected event and ticket type | TC-10 |
| Stats & Info agrees with known event activity for single and recurring shapes | TC-11 |

## Recommended Test Data

- One active future single event with two one-time ticket types, one payment-plan ticket type, known completed test orders, and one checked-in ticket.
- One recurring parent with two future children; each child has distinct sold, checked-in, inventory, and revenue values.
- One incomplete draft, one complete active event, one recurring child, and one template.
- One disposable event name suffix unique to the test run and one valid test location.
- One organizer with `VP_MANAGE_EVENTS`, one employee without it, a second venue, and one superuser account.
- One save-pending event, one refunded event, one sold event, and one recurring parent with children. Use seeded/shared guardrail fixtures; do not alter protected records.
- One venue with Custom Display Fields enabled and one integrated test page that renders its event metadata.
- Feature-controlled fixtures for event passwords, exchanges, customer lists, post-event email, Workday, and reminder email; execute only options enabled for the assigned fixture.
- One disposable employee seller and one test affiliate venue that can be enabled and removed without affecting live sales.

## Suggested Qase-Ready Cases

### TC-1: Dashboard - Event Overview - Verify single-event totals and ticket breakdown

**Description:**

Validates that Event Overview for a single event agrees with known Dashboard transactions, ticket inventory, and Check In activity. This protects against incorrect organizer-facing totals and missing one-time ticket rows.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with permission to manage the active venue's events.
* A future or currently occurring single event has two one-time ticket types and one payment-plan ticket type.
* Known values for sales, net revenue, redeemable tickets, checked-in tickets, and each one-time ticket type are recorded from Dashboard Transactions and Check In for the same event.

**Postconditions:** No data is changed.

**Tags:** dashboard, events, reports

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Event Overview for the named event. | `/dashboard/events/{slug}/manage/#/overview` | `Event Overview`, the event ID, event status, and time-to-event state are visible. |
| Compare the summary cards with the recorded event values. | Net Sales, Net Revenue, Redeemable Tickets, Checked In | Every card agrees with the named Dashboard source and the checked-in percentage uses the recorded sold and checked-in counts. |
| Review Ticket Type Breakdown. | Two one-time ticket types and one payment-plan ticket type | Each one-time ticket type appears once with its price, redeemable count, inventory, checked-in count, and revenue; the payment-plan ticket type is not listed. |
| Select the Ticket Type header twice. | None | Ticket rows sort by name in each direction without changing their values. |
| Select the Redeemable Tickets header twice. | None | Ticket rows sort by redeemable count in each direction without changing their values. |
| Reload Event Overview. | Same event slug | The same event identity and reconciled values load after a fresh read. |

### TC-2: Dashboard - Event Overview - Verify recurring-parent totals and child event rows

**Description:**

Validates that a recurring parent's Event Overview aggregates its child events and shows each child's operational results without substituting the single-event ticket breakdown.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with permission to manage the active venue's events.
* A recurring parent has at least two children with distinct future dates, statuses, inventory, sold-ticket counts, and net revenue.
* At least one child has a checked-in ticket.
* Expected parent totals and child values are recorded from Dashboard Transactions and Check In.

**Postconditions:** No data is changed.

**Tags:** dashboard, events, reports

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the recurring parent's Event Overview. | `/dashboard/events/{parent-slug}/manage/#/overview` | Parent event identity, status, and aggregate summary cards are visible. |
| Compare the parent summary cards with the recorded child totals. | Net Sales, Net Revenue, Redeemable Tickets, Checked In | Each parent value agrees with the combined applicable child activity. |
| Review the Events table. | Two named child events | Each child appears once with its date, status, Check In link, sold/inventory count, and net revenue. |
| Confirm the single-event breakdown is not displayed. | None | `Ticket Type Breakdown` is absent and the child `Events` table remains visible. |
| Select the Date header twice. | None | Child rows sort by date in each direction without changing their values. |
| Open one child's Check In link. | Named child event | Dashboard Check In opens for that child event in a new tab. |

### TC-3: Dashboard - Event Management - Verify pages and sections by event state

**Description:**

Validates the complete source-backed event-management navigation for draft, active, recurring-child, and template events. Financial Settings and Assigned Seating are presence checks only; deep feature behavior remains in its existing case.

| EventState | Expected Navigation and Presence |
| --- | --- |
| DraftSingle | Overview and Edit are available; draft Edit offers save/publish actions; event-list Stats, Check In, and Transactions actions are unavailable. |
| ActiveSingle | Overview, Edit, Manage, Promote, Reports, and View Event are available; Financial Settings is present for an authorized financial user; Assigned Seating is reachable for an eligible venue. |
| RecurringChild | Edit is available from the expanded parent event; parent-owned Overview navigation is not offered; the child editor omits parent-only Financial Settings and Advanced Options navigation. |
| Template | Generate Events and Edit are available; Overview, Manage, Promote, Reports, and View Event navigation are not offered. |

For `ActiveSingle`, account for these destinations; conditional rows are required only when their named fixture condition is met.

| Group | Destinations / Conditions |
| --- | --- |
| Edit | Basic Info; Location & Info; Event Date & Time; conditional Accommodations; Ticket Types; Legal Policies & Important Info; Order Form; conditional Custom Display Fields; conditional Charitable Donations; Financial Settings; Advanced Options |
| Manage | Email Customization; conditional Branding; conditional Waitlist; conditional Attraction Configuration; conditional Live Stream; Edit Sellers; Email Guests; Assigned Seating; permission-controlled Transactions; Check In; conditional Publish Approval |
| Promote | Facebook Integration only with a complete street address; Tracking Links |
| Reports | Stats & Info |
| External / return | View Event opens the selected public event; Manage All Events returns to the event list |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with event-management and financial permissions.
* The active venue is eligible for Assigned Seating.
* The active single-event fixture has the flags, modules, complete address, ticket types, and workflow needed to expose the conditional destinations being assigned.
* One fixture exists for each `EventState` value.

**Postconditions:** No data is changed.

**Tags:** dashboard, events, edit-event

**Parameters:**

EventState: DraftSingle, ActiveSingle, RecurringChild, Template

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard Manage Events. | `/dashboard/events/` | The fixture for the selected `EventState` is visible to the organizer. |
| Open the fixture's available management actions. | Selected `EventState` | The actions match the `EventState` mapping in the Description. |
| Open each route or section named as available in the selected mapping. | Selected `EventState` and the ActiveSingle destination table | Every mapped destination loads for the selected event; the fee and seating checks stop after confirming the section or page is present. |
| For Transactions, Check In, View Event, and Manage All Events, inspect the destination after the handoff. | ActiveSingle | Transactions is filtered to the selected event, Check In names the selected event, View Event opens its public slug, and Manage All Events returns to the event list. |
| Open Edit for the fixture. | Selected `EventState` | The correct event or template editor loads with only the sections supported by that state. |
| Review the editor navigation. | Selected `EventState` | The state-specific editor sections match the Description mapping. |

### TC-4: Dashboard - Events - Verify draft save, reopen, edit, and publish lifecycle

**Description:**

Validates a clean draft lifecycle from the current full Create Event page through fresh-read editing and publication. This protects against lost draft data, placeholder publication, and an event stuck in the wrong state.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with permission to create and edit events.
* The venue has a valid test location and no approval workflow that changes direct publication.
* A unique disposable event-name suffix is available.

**Postconditions:**

* Archive the disposable event only after confirming it has no sales.
* Verify the archived event no longer appears in the active Manage Events list.

**Tags:** dashboard, create-event, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the full Create Event page. | `/dashboard/events/create/` | The Create Event form loads with Save Draft and Publish actions. |
| Enter a unique event name and one valid location. | `QA Draft {unique-suffix}` | The entered name and location are accepted. |
| Add the minimum valid future schedule and one basic ticket type. | Future date/time; `General Admission`; inventory `10`; price `0` | The schedule and ticket type are accepted without blocking validation. |
| Select Save Draft. | None | One draft event is saved and the organizer reaches that event's management flow. |
| Open Manage Events. | `/dashboard/events/` | Exactly one event with the unique name appears with Draft status. |
| Open Edit for the draft. | Draft event slug | The saved name, location, schedule, and ticket type load from persisted state. |
| Change the event name and slug to non-placeholder values. | `QA Published {unique-suffix}`; unique slug | The new values are accepted and the slug-change warning appears when applicable. |
| Publish the event. | None | Publication succeeds and the event status becomes Active. |
| Reload the event editor. | Published event slug | The active status and edited values persist after a fresh read. |
| Open View Event. | Published event | The public event page opens for the published slug with the saved event name and ticket type. |

### TC-5: Dashboard - Edit Event - Verify supported edit entry points save and persist

**Description:**

Validates the primary manage editor and the standalone editor still linked from legacy Dashboard workflows. Both must load the same event and persist a safe change, although their post-save destination differs.

| EditEntryPoint | Actor Path | Expected Post-Save Destination |
| --- | --- | --- |
| ManageEditor | Manage Events → Edit | Event Overview |
| StandaloneEditor | Edit Sellers → Edit Event | Edit Sellers for the event |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with permission to manage an active, unsold, non-recurring test event.
* The original event subtitle is recorded.
* The organizer can open Edit Sellers for the same event.

**Postconditions:**

* Restore the original subtitle through the same `EditEntryPoint`.
* Reopen the editor and verify the original subtitle is restored.

**Tags:** dashboard, edit-event, events

**Parameters:**

EditEntryPoint: ManageEditor, StandaloneEditor

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Follow the selected `EditEntryPoint` path from its named starting screen. | Event slug | The editor loads the correct event and displays Basic Info, Location & Info, Event Date & Time, Ticket Types, Legal Policies, and Order Form. |
| Change only the event subtitle. | `QA edit {unique-suffix}` | The new subtitle remains visible before save. |
| Save the event. | None | One save completes without duplicate submission or a stuck loading state. |
| Wait for the post-save destination. | Selected `EditEntryPoint` | The destination matches the Description mapping. |
| Reopen the event through the selected entry point. | Same event slug | The changed subtitle persists after a fresh read. |
| Open the other editor entry point. | Same event slug | The other editor displays the same saved subtitle for the same event. |

### TC-6: Dashboard - Event Management - Enforce route permission and venue ownership

**Description:**

Validates that event create/manage/edit routes require event-management permission, event-specific routes remain scoped to the active venue, and template creation remains superuser-only.

| AccessScenario | Route | Expected Access |
| --- | --- | --- |
| AuthorizedVenueEvent | `/dashboard/events/{owned-slug}/manage/#/overview` | Page loads |
| MissingManageEventsPermission | `/dashboard/events/{owned-slug}/manage/#/edit` | Access denied |
| DifferentVenueEvent | `/dashboard/events/{other-venue-slug}/manage/#/overview` | Event is not found or exposed |
| NonSuperuserTemplateCreate | `/dashboard/events/create-event-template/` | Access denied |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* One organizer has `VP_MANAGE_EVENTS` for Venue A.
* One employee can sign in to Venue A without `VP_MANAGE_EVENTS`.
* Venue A and Venue B each have a named event.
* The standard organizer is not a superuser.

**Postconditions:** No event data is changed.

**Tags:** dashboard, events, employee-permissions

**Parameters:**

AccessScenario: AuthorizedVenueEvent, MissingManageEventsPermission, DifferentVenueEvent, NonSuperuserTemplateCreate

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in with the account mapped to `AccessScenario`. | Venue and role from Preconditions | The account is active in the intended venue context. |
| Open the route mapped to `AccessScenario`. | Route from Description | Access matches the Description mapping without exposing another venue's event form or data. |
| Open Dashboard Manage Events when the selected account is allowed to use it. | `/dashboard/events/` | Authorized accounts see only events available to their active venue; the missing-permission account remains denied. |

### TC-7: Dashboard - Edit Event - Verify pending, refunded, and archive guardrails

**Description:**

Validates that the event editor prevents conflicting updates and unsafe archival for source-backed protected states.

| Guardrail | Expected Result |
| --- | --- |
| SavePending | The editor is replaced by the previous-changes-saving message and no new edit can be submitted. |
| Refunded | An attempted update is rejected and the saved event remains unchanged. |
| SoldEventDelete | Delete is rejected because sales exist and the event remains available. |
| RecurringParentDelete | Delete is rejected while child events exist and the parent and children remain available. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with permission to manage events.
* A named seeded fixture exists for each `Guardrail` value.
* Original values and child-event counts are recorded.
* Protected fixtures are shared and must not be altered outside the blocked action.

**Postconditions:**

* Verify the selected fixture retains its original status, values, and child-event count.
* Do not delete or modify the shared guardrail fixtures.

**Tags:** dashboard, edit-event, edge-case

**Parameters:**

Guardrail: SavePending, Refunded, SoldEventDelete, RecurringParentDelete

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit for the fixture mapped to `Guardrail`. | Fixture slug | The page shows the editable form or the protected-state message appropriate to the selected guardrail. |
| Perform only the blocked update or delete action mapped to `Guardrail`. | Safe subtitle change for `Refunded`; Delete Event for delete guardrails; no action for `SavePending` | The action is rejected as described in the mapping and no success message claims that the protected change completed. |
| Reopen the event from Manage Events. | Same fixture slug | The event still exists with its original status and recorded values. |
| For `RecurringParentDelete`, expand the parent event. | Named recurring parent | The original child events remain linked to the parent. |

### TC-8: Dashboard - Edit Event - Configure Custom Display Fields

**Description:**

Validates that event metadata for an integrated event page can be added, formatted, persisted, and removed without appearing on the standard Showpass public event page.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer can manage an active, non-child test event.
* The venue has Custom Display Fields enabled and an integrated test event-detail page that renders event metadata.
* The event has no existing field named `QA Contact`.

**Postconditions:**

* Remove the `QA Contact` field.
* Reopen Edit and verify the field remains removed.

**Tags:** dashboard, events, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit for the test event and select Custom Display Fields. | `/dashboard/events/{slug}/manage/#/edit` | The section explains that its fields apply to integrated event pages and not the Showpass event page. |
| Select Add Field. | None | One empty Display Title and Value row appears. |
| Enter the field title and value. | Display Title `QA Contact`; Value `qa-{unique-suffix}@example.com` | The values remain visible and no validation error appears. |
| Enable the basic text formatter for the field. | None | The Value control changes to the formatted editor without losing the entered value. |
| Save the event. | None | The event saves once without an error. |
| Reload Edit and return to Custom Display Fields. | Same event | The title, value, and formatter selection persist after a fresh read. |
| Open the integrated event-detail page and the standard Showpass event page. | Same event | The field appears on the integrated page and does not appear on the standard Showpass event page. |
| Delete the field and save the event. | `QA Contact` | The field is removed and remains absent after reload. |

### TC-9: Dashboard - Edit Event - Persist Advanced Options

**Description:**

Validates each source-backed Advanced Options control independently. Run only the parameter value whose feature/module precondition is enabled; unavailable combinations are not applicable.

| AdvancedOption | Required Fixture | Test Data | Save / Expected Persistence |
| --- | --- | --- | --- |
| EventPassword | Saved non-child event | Unique password and `QA access {unique-suffix}` message | Save in Add Password, then save the event; password and message remain listed |
| ExchangeCutoff | Venue has Exchanges | `12` hours | Save event; event override and organizer-override notice remain visible |
| CustomerList | Venue has at least one customer list | Named disposable list | Save event; selected list remains selected |
| ThirdPartyRedirect | None beyond base fixture | `https://example.com/{unique-suffix}` and one redirect source | Save event; URL and redirect selection remain visible |
| EventReportRecipient | Active non-template event | Controlled QA mailbox | Add email and save event; recipient remains listed |
| PostEventEmailStatus | Post-event email flag enabled | `Do Not Send Post-Event Email` | Save event; selected override remains visible |
| ThermalTicketText | None beyond base fixture | Unique title and message within displayed limits | Save event; both values remain visible with correct character counts |
| WorkdayIntegration | Venue Workday integration enabled | Reversible test configuration | Save through the integration modal; configuration reopens with saved values |
| EventReminder | Venue can send event reminders | Enable reminder | Save event; the reminder control remains enabled |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer can manage the active, non-child event mapped to `AdvancedOption`.
* The mapped feature, module, list, or integration is enabled as described above.
* Original values are recorded before the test.

**Postconditions:**

* Restore the mapped original value through its supported save action.
* Reopen Advanced Options and verify the original value is restored.

**Tags:** dashboard, events, edit-event

**Parameters:**

AdvancedOption: EventPassword, ExchangeCutoff, CustomerList, ThirdPartyRedirect, EventReportRecipient, PostEventEmailStatus, ThermalTicketText, WorkdayIntegration, EventReminder

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit for the mapped event and select Advanced Options. | `/dashboard/events/{slug}/manage/#/edit` | Advanced Options loads and the control mapped to `AdvancedOption` is visible. |
| Record the mapped control's current value. | Selected `AdvancedOption` | The original state is available for cleanup. |
| Enter or select only the mapped test value. | Mapping in Description | The control accepts the test value without an unrelated validation error. |
| Use the mapped save action. | Modal save where specified; otherwise Save Event | One success result appears and no duplicate save is submitted. |
| Reload the event editor and return to Advanced Options. | Same event | The mapped value matches the Description after a fresh read. |
| Restore the recorded original value and reopen the section. | Original value | The original value is restored and the temporary test value is absent. |

### TC-10: Dashboard - Edit Sellers - Persist event seller access

**Description:**

Validates that employee and affiliate-venue seller permissions can be changed for one selected event ticket type without changing another ticket type or event.

| SellerType | Actor Action | Persisted Proof |
| --- | --- | --- |
| Employee | Enable one disposable employee and set a sales limit | Employee is enabled only for the selected ticket type with the saved limit |
| AffiliateVenue | Add one test affiliate venue, set visibility/payment access, and set a sales limit | Affiliate venue is enabled only for the selected ticket type with the saved controls |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer owns an active, non-recurring test event with two ticket types.
* A disposable employee and a test affiliate venue are available and are not enabled for the selected ticket type.
* No live sales depend on the seller permissions being changed.

**Postconditions:**

* Remove the employee or affiliate permission created by the selected parameter.
* Reopen Edit Sellers and verify the temporary permission is absent.

**Tags:** dashboard, events, employee-permissions

**Parameters:**

SellerType: Employee, AffiliateVenue

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit Sellers from the selected event's Manage group. | `/dashboard/events/{slug}/manage/#/ticket-sellers` | The page names the selected event and lists both ticket types. |
| Open the first ticket type and enable the seller mapped to `SellerType`. | Mapping in Description | The selected employee or affiliate venue becomes enabled for only that ticket type. |
| Set the mapped seller's sales limit. | `5` tickets | The limit saves and displays as five tickets. |
| For `AffiliateVenue`, set one supported payment method and visibility option. | One reversible non-default combination | The selected controls save without changing the owning venue's permission. |
| Reload Edit Sellers. | Same event | The seller, limit, and applicable affiliate controls persist for the first ticket type and remain absent from the second. |
| Open Edit Sellers for a different test event. | Second event | The temporary seller permission is not applied to the other event. |
| Remove the temporary seller permission. | Selected `SellerType` | The seller returns to its original disabled/absent state after reload. |

### TC-11: Dashboard - Event Stats & Info - Verify baseline event reporting

**Description:**

Validates that Stats & Info loads the correct single-event or recurring-parent layout and agrees with known Transactions and Check In activity. SPT-4288 remains the separate revenue-realization/settlement regression.

| EventShape | Required Layout |
| --- | --- |
| Single | Summary totals, date filter, quantity/revenue/check-in charts, ticket-type rows, payment-type breakdown, and summary-report control |
| RecurringParent | Aggregate totals, date filter, quantity/revenue charts, child-event rows, payment-type breakdown, and summary-report control |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer has financial access to the selected event.
* A single event and recurring parent have known paid, complimentary, checked-in, inventory, discount, gross-revenue, and net-revenue values recorded from Dashboard Transactions and Check In.
* The recurring parent has at least two children with distinct dates and results.

**Postconditions:** No data is changed.

**Tags:** dashboard, events, reports

**Parameters:**

EventShape: Single, RecurringParent

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Stats & Info from the selected event's Reports group. | `/dashboard/events/{slug}/manage/#/stats` | Stats & Info loads for the selected event with the layout mapped to `EventShape`. |
| Compare the summary totals and visible breakdown with the recorded source values. | Known Transactions and Check In values | Ticket, scan, discount, gross-revenue, and net-revenue values agree with the named sources. |
| Apply a date range that includes only the known activity. | Recorded activity dates | The totals, charts, and rows update to the expected included activity. |
| Switch each available timeline chart. | Quantity, Net Sales, and Check In when supported | Each mapped chart loads without replacing the selected event or date range. |
| Review the mapped ticket-type or child-event table and sort one supported column twice. | Mapping in Description | Correct rows are present and sort in both directions without changing their values. |
| Confirm the summary-report control is available. | Same event and date range | The report control is enabled for the selected event context. |

## Existing Case Enhancement Instead of Duplication

Enhance SPT-4876 rather than adding another child-edit case:

- Start from Manage Events, expand the recurring parent, and select Edit on one named child.
- State the exact route `/dashboard/events/{child-slug}/manage/#/edit`.
- Change one child-owned schedule value, save, and reopen the child.
- Reopen the parent and one sibling to prove parent metadata and sibling schedule were not overwritten.
- Verify parent-owned fields and navigation are unavailable on the child rather than saying they are “blocked or limited.”

Also improve and reorganize existing coverage instead of duplicating it:

- Refactor and move SPT-1784 for Dashboard Accommodations configuration; keep SPT-359 for public output.
- Move event-owned Branding, Email Customization, Tracking Links, Facebook Integration, and Workflow Approval cases according to the suite-placement table in the existing-coverage note.
- Keep SPT-5012–5018 and the Attraction Configuration cases where they are; they are already under Events.

## Minimum Execution Set

- TC-1: Single-event Overview reconciliation
- TC-2: Recurring-parent Overview reconciliation
- TC-4: Draft save, reopen, edit, and publish
- TC-5 with `ManageEditor` and `StandaloneEditor`
- TC-6 with every access scenario
- TC-8: Custom Display Fields add/save/output/remove
- TC-10 with both seller types
- TC-11 with both event shapes
- SPT-4876 after the child-edit enhancement

Run TC-3, TC-7, and applicable TC-9 parameter values when the required state, feature, and guardrail fixtures are available.

## Automation Candidates

- Automate TC-1 and TC-2 with deterministic event, transaction, inventory, and check-in fixtures.
- Automate TC-4 with a unique disposable event and verified archival cleanup.
- Automate TC-5 as one parameterized entry-point test with a restored subtitle.
- Automate TC-6 at the HTTP route layer plus one browser-visible denial assertion.
- Automate TC-8 with one integrated-page metadata assertion and deterministic cleanup.
- Automate TC-9 as independent feature-controlled tests rather than one long end-to-end flow.
- Automate TC-10 with disposable employee/affiliate permissions and API-backed cleanup.
- Automate TC-11 using deterministic transaction and scan fixtures for both event shapes.
- Automate save-task success, failure, and timeout separately; the manual cases should not depend on forcing Celery failures.
- Keep TC-3 fee and seating checks shallow: section/link visible and destination loads.

## Open Questions

- None blocks the Qase-ready cases; each conditional TC-9 parameter is not applicable when its required fixture is unavailable.
- Defer a case for `/dashboard/events/create-event/` until product confirms that the unlinked wizard is still supported.
