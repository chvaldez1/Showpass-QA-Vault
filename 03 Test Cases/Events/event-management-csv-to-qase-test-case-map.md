---
title: Event Management CSV to Qase Test Case Map
date: 2026-08-24
tags:
  - qa/coverage-map
  - qase
  - events
aliases:
  - Event Management Qase Mapping
---

# Event Management CSV to Qase Test Case Map

This note maps every assignment row in [[03 Test Cases/Events/event-management-qa-assignment-matrix.csv|Event Management QA Assignment Matrix CSV]] to the current cases in [[03 Test Cases/Events/event-management-qase-test-cases|Event Management Qase Test Cases]] and to existing specialist Qase coverage.

> [!success] Qase placement verified
> `SPT-*` is a Qase case. SPT-5071 through SPT-5080 and SPT-5082 were created and verified on 2026-08-24. The approved folder creation and 22 case moves were completed and read back from Qase on the same date. The user later created Event Overview (1053) under Events (79) and moved SPT-5071 into it; a targeted read verified that placement. The 41 approved Core Event Lifecycle case refactors were also applied and passed a consolidated Qase readback. Only each moved case's `suite_id` changed.

The completed suite-80 reorganization ledger is in [[03 Test Cases/Events/event-management-qase-suite-reorganization|Event Management Qase Suite Reorganization]]. This mapping includes the later Event Overview (1053) change.

## Created Qase Case Reference

| Qase Case | Title | Current Qase Suite |
| --- | --- | --- |
| SPT-5071 | Dashboard - Event Overview - Verify totals for single and recurring events | Event Overview (1053) |
| SPT-5072 | Dashboard - Event Management - Show the right pages for each event type | Create Events (80) |
| SPT-5073 | Dashboard - Events - Save, reopen, and publish a draft event | Create / Edit Events (84) |
| SPT-5074 | Dashboard - Event Management - Verify edit entry points | Create / Edit Events (84) |
| SPT-5075 | Dashboard - Event Management - Deny restricted event access | Create / Edit Events (84) |
| SPT-5076 | Dashboard - Edit Event - Prevent changes to protected events | Edge Cases (820) |
| SPT-5077 | Dashboard - Edit Event - Configure Custom Display Fields | Create / Edit Events (84) |
| SPT-5078 | Dashboard - Edit Event - Save Advanced Options | Advanced Options (1049) |
| SPT-5079 | Dashboard - Edit Sellers - Save event seller access | Create Events (80) |
| SPT-5080 | Dashboard - Event Stats & Info - Verify event reporting | Create Events (80) |
| SPT-5082 | Dashboard - Events - Edit one recurring child without changing its parent or siblings | Create / Edit Events (84) |

## Completed Qase Move Checklist

> [!success] Completed and verified
> Qase returned HTTP 200 for all 22 case moves. Readback verified every destination while preserving titles, tags, parameters, and step counts.

### Event-Level Folders Created Under Suite 80

| Folder | Qase Suite | Moved Cases | Qase Description |
| --- | ---: | --- | --- |
| Branding | 1050 | SPT-4126, SPT-4128 | Event-level Branding coverage. See suite 744 for venue-level and shared Branding coverage. |
| Email Customization | 1051 | SPT-3618, SPT-4150, SPT-4151 | Event-level Email Customization coverage. See suite 749 for venue-level, shared, and unsplit hybrid coverage. |
| Tracking Links | 1052 | SPT-4239, SPT-4242, SPT-5010, SPT-5011 | Event-owned Tracking Links coverage. See suite 183 for global list, export, and attribution coverage. |

### Existing Cases Moved

| Cases | Previous Location | Verified Destination |
| --- | --- | --- |
| SPT-5073, SPT-5074, SPT-5075, SPT-5077 | Create Events (80) | Create / Edit Events (84) |
| SPT-5076 | Create Events (80) | Edge Cases (820) |
| SPT-5078 | Create Events (80) | Advanced Options (1049) |
| SPT-786 | Manage Events List (85) | Create / Edit Events (84) |
| SPT-766, SPT-768, SPT-770 | Create / Edit Events (84) | Ticket Types (83) |
| SPT-1784 | Suite 198 | Create / Edit Events (84) |
| SPT-4288 | Manage Events List (85) | Create Events (80) |
| SPT-4902 | Integrations (186) | Create Events (80) |

SPT-5072, SPT-5079, and SPT-5080 remain directly in Create Events (80). SPT-5071 is now in the user-created Event Overview (1053) suite under Events (79). Suite 949 Workflow Approval remains unchanged because it is outside this feature-parity move.

## CSV Mapping

CSV numbers exclude the header row.

### Core Event Lifecycle and Existing Feature Coverage

> Content audit and Qase update completed 2026-08-24: 51 mapped cases reviewed; 41 existing-case refactors were applied and SPT-5082 was created for recurring-child editing. A consolidated Qase readback matched all 41 intended updates. Six strong cases remain unchanged, and four fee cases remain untouched because this scope uses presence checks only. Cases and dispositions are in [[03 Test Cases/Events/event-management-qase-test-cases|Event Management Qase Test Cases]].

| CSV # | Page / Section / Feature | Qase Test Case Mapping | Current Qase Suite(s) | Action Needed | Coverage Notes |
| ---: | --- | --- | --- | --- | --- |
| 1 | Event Overview — single event | SPT-5071 | Event Overview (1053) | Stay | User moved SPT-5071 into the event-level overview suite; targeted read verified the placement |
| 2 | Event Overview — recurring parent | SPT-5071 | Event Overview (1053) | Stay | User moved SPT-5071 into the event-level overview suite; targeted read verified the placement |
| 3 | Management navigation by event state | SPT-5072 | Create Events (80) | Stay | Created in suite 80 |
| 4 | Create Event — basic flow | SPT-764 | Create / Edit Events (84) | Stay | Refactored and verified with an exact start location, fresh-read persistence, public proof, and cleanup |
| 5 | Create Event — advanced validation | SPT-775, SPT-4874 | Create / Edit Events (84) | Stay | Refactored and verified with scenario-driving parameters and plain-language validation steps |
| 6 | Draft lifecycle | SPT-5073 | Create / Edit Events (84) | Stay | Moved, refactored, and verified |
| 7 | Recurring event creation | SPT-4876 | Create / Edit Events (84) | Stay | Refactored and verified as recurring-parent creation, publication, child-count, and ticket propagation proof only |
| 8 | Child event editing | SPT-5082 | Create / Edit Events (84) | Stay | Created and verified as the dedicated child-edit case so SPT-4876 does not mix parent creation with later child editing |
| 9 | Recurring conversion guardrails | SPT-4299, SPT-4879 | Edge Cases (820) | Stay | Refactored and verified with explicit fixtures, scenario parameters, and fresh-read proof |
| 10 | Permissions and venue ownership | SPT-5075 | Create / Edit Events (84) | Stay | Moved and verified |
| 11 | Protected event states | SPT-5076 | Edge Cases (820) | Stay | Moved and verified |
| 12 | Event templates | SPT-769 | Create / Edit Events (84) | Stay | Refactored and verified with organizer-visible generation and persistence proof |
| 13 | Clone Event | SPT-786 | Create / Edit Events (84) | Stay | Moved, refactored, and verified |
| 14 | Ticket type inventory and pricing | SPT-766, SPT-768, SPT-770 | Ticket Types (83) | Stay | Moved, refactored, and verified |
| 15 | Ticket type sales settings | SPT-758–760, SPT-4063, SPT-4384, SPT-4875 | Ticket Types (83) | Stay | Refactored and verified |
| 16 | Ticket delivery settings | SPT-3275–3278 | Delivery Settings (448) | Stay | Refactored and verified |
| 17 | Order Form | SPT-3247–3249, SPT-3251–3252, SPT-3263–3264 | Order Form & Custom Questions (446) | Stay | Refactored and verified |
| 18 | Custom Questions | SPT-3253, SPT-3261–3262, SPT-3268–3270 | Order Form & Custom Questions (446) | Stay | SPT-3253, SPT-3261–3262, and SPT-3268 were refactored and verified; SPT-3269–3270 remain unchanged |
| 19 | Terms acceptance | SPT-4878 | Order Form & Custom Questions (446) | Stay | Refactored and verified |
| 20 | Event category metadata | SPT-745, SPT-749 | Google Events - Event Categories (81) | Stay | Refactored and verified |
| 21 | Donations | SPT-780, SPT-782–783, SPT-3300 | Create / Edit Events (84) | Stay | Refactored and verified |
| 22 | Online and livestream events | SPT-4877 | Create / Edit Events (84) | Stay | Refactored and verified |
| 23 | Financial Settings and internal fees | SPT-772, SPT-3501, SPT-3810–3811; SPT-5072 for presence | Ticket Types (83); Create / Edit Events (84); Create Events (80) | Stay | Existing; execute only the SPT-5072 presence check in this scope |
| 24 | Map Editor / Assigned Seating | Qase suite 82 `Map Editor`; SPT-5072 for presence | Map Editor (82); Create Events (80) | Stay | Existing specialist suite; execute only the SPT-5072 presence check in this scope |
| 25 | `/dashboard/events/create-event/` wizard | No case | — | Stay | Deferred until the unlinked route is confirmed as supported |

### Edit Sections and Advanced Options

| CSV # | Page / Section / Feature | Qase Test Case Mapping | Current Qase Suite(s) | Action Needed | Coverage Notes |
| ---: | --- | --- | --- | --- | --- |
| 26 | Edit — Basic Info | SPT-764, SPT-4874; SPT-5074 for edit-entry persistence | Create / Edit Events (84) | Stay | SPT-5074 moved here; SPT-764 and SPT-4874 remain here |
| 27 | Edit — Location & Info | SPT-764, SPT-4874 | Create / Edit Events (84) | Stay | Existing but broad; no separate new case proposed |
| 28 | Edit — Event Date & Time | SPT-4874, SPT-4876 | Create / Edit Events (84) | Stay | Existing but broad |
| 29 | Edit — Accommodations | SPT-1784 for Dashboard setup; SPT-359 for public output | Create / Edit Events (84); Core - Events (613) | Stay | SPT-1784 moved to suite 84; wording refactor remains; SPT-359 stays in Core |
| 30 | Edit — Legal Policies & Important Info | SPT-4878; SPT-5074 provides generic edit persistence | Order Form & Custom Questions (446); Create / Edit Events (84) | Stay | Partial existing coverage; do not duplicate unless policy-specific persistence is later proven absent |
| 31 | Edit — Custom Display Fields | SPT-5077 | Create / Edit Events (84) | Stay | Moved and verified |
| 32 | Advanced Options — Event Password | SPT-5078 `EventPassword`; SPT-3807 for public password access | Advanced Options (1049); Core - Events (613) | Stay | SPT-5078 moved to suite 1049; SPT-3807 remains in Core |
| 33 | Advanced Options — Exchanges and Customer List | SPT-5078 `ExchangeCutoff`, `CustomerList` | Advanced Options (1049) | Stay | Placement verified |
| 34 | Advanced Options — Third-Party Ticket Page | SPT-5078 `ThirdPartyRedirect` | Advanced Options (1049) | Stay | Placement verified |
| 35 | Advanced Options — Event Reports and Email Controls | SPT-5078 `EventReportRecipient`, `PostEventEmailStatus`, `EventReminder` | Advanced Options (1049) | Stay | Placement verified |
| 36 | Advanced Options — Thermal Tickets and Workday | SPT-5078 `ThermalTicketText`, `WorkdayIntegration` | Advanced Options (1049) | Stay | Placement verified |

### Manage, Promote, Reports, and Handoffs

| CSV # | Page / Section / Feature | Qase Test Case Mapping | Current Qase Suite(s) | Action Needed | Coverage Notes |
| ---: | --- | --- | --- | --- | --- |
| 37 | Manage — Email Customization | SPT-3617–3621, SPT-3626, SPT-4087, SPT-4148, SPT-4150–4151, SPT-4836–4837 | Email Customization (1051, event-level); Email Customization (749, shared) | Stay | SPT-3618, SPT-4150, and SPT-4151 are in suite 1051; venue/shared cases remain in suite 749; hybrid-case splitting remains a content improvement |
| 38 | Manage — Branding | SPT-4124–4128, SPT-4335, SPT-4742 | Branding (1050, event-level); Branding (744, shared) | Stay | SPT-4126 and SPT-4128 are in suite 1050; venue/shared cases remain in suite 744 |
| 39 | Manage — Waitlist | SPT-4384; SPT-5072 for conditional route presence | Ticket Types (83); Create Events (80) | Stay | Existing setup coverage plus new navigation smoke |
| 40 | Manage — Attraction Configuration | SPT-3524–3529, SPT-4090, SPT-4829 | Special Events (480); Attraction Configuration (674) | Stay | Existing placement under the suite-80 attraction hierarchy |
| 41 | Manage — Live Stream | SPT-4877, SPT-3291; SPT-5072 for conditional route presence | Create / Edit Events (84); Core - Events (613); Create Events (80) | Stay | Existing configuration/public-output coverage plus new navigation smoke |
| 42 | Manage — Edit Sellers | SPT-5079 | Create Events (80) | Stay | Created in suite 80 |
| 43 | Manage — Email Guests | SPT-5012–5018 | Email Guests (1035) | Stay | Existing placement under suite 80; no move needed |
| 44 | Manage — Transactions | SPT-5064–5070; SPT-5072 for selected-event handoff | Transactions (103); Create Events (80) | Stay | Existing destination coverage plus new event-sidebar handoff proof |
| 45 | Manage — Check In | SPT-1663, SPT-1664, SPT-1665, SPT-3270; SPT-5072 for selected-event handoff | Check In (184); Order Form & Custom Questions (446); Create Events (80) | Stay | Existing destination coverage plus new event-sidebar handoff proof |
| 46 | Manage — Publish Approval | SPT-4699–4718, SPT-4750–4754 | Workflow Approval - V1 (949) | Stay | Leave unchanged; outside this feature-parity move |
| 47 | Promote — Facebook Integration | SPT-4902; SPT-5072 for conditional route presence | Create Events (80) | Stay | SPT-4902 moved here; no one-case folder was created |
| 48 | Promote — Tracking Links | SPT-4236–4242, SPT-4800–4801, SPT-5010–5011; SPT-5072 for route presence | Tracking Links (1052, event-level); Tracking Links (183, shared); Create Events (80) | Stay | Event-owned cases are in suite 1052; global cases remain in suite 183 |
| 49 | Reports — Stats & Info | SPT-5080; SPT-4288 for revenue-realization settlement | Create Events (80) | Stay | SPT-5080 remains here; SPT-4288 moved here from suite 85 |
| 50 | View Event | SPT-5072 | Create Events (80) | Stay | New handoff assertion inside the navigation case; no separate case proposed |
| 51 | Manage All Events | SPT-784; SPT-5072 for return handoff | Manage Events List (85); Create Events (80) | Stay | Existing list coverage plus new event-sidebar return assertion |

## Totals

| Classification | Count / Scope |
| --- | --- |
| Created cases | 11: SPT-5071 through SPT-5080, plus SPT-5082 |
| Deferred without a case | 1: unsupported-status create wizard |
| Core lifecycle case refactors completed | 41 existing cases; all intended fields matched on consolidated Qase readback |
| Created event-level folders | Branding (1050), Email Customization (1051), and Tracking Links (1052) under suite 80 |
| User-created overview folder | Event Overview (1053) under Events (79), containing SPT-5071 |
| Completed case moves | 22 cases; every destination passed Qase readback verification |
| Existing coverage now correctly placed | Event Overview, Create / Edit Events, Ticket Types, Edge Cases, Advanced Options, Branding, Email Customization, Tracking Links, Map Editor, Email Guests, Attraction Configuration, Special Events, Delivery Settings, and Order Form & Custom Questions |

## Qase Handling

- Use `TC-*` only until a new case is created and Qase assigns a real `SPT-*` ID.
- SPT-5071 through SPT-5080 and SPT-5082 have passed creation and readback verification.
- Moving or enhancing an `SPT-*` case does not create a new `TC-*` label.
- Future Qase creates, content updates, or placement changes require a new explicit approval.
