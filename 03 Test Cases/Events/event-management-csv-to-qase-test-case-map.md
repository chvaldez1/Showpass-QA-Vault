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

This note maps every assignment row in [[03 Test Cases/Events/event-management-qa-assignment-matrix.csv|Event Management QA Assignment Matrix CSV]] to existing Qase coverage or a local suggested case in [[03 Test Cases/Events/event-management-new-qase-gap-analysis|Event Management New Qase Gap Analysis Cases]].

> [!info] Read-only mapping
> `SPT-*` is an existing Qase case. `TC-*` is a new local draft and does not have a Qase ID. `Enhance`, `move`, and `re-parent` recommendations do not authorize a Qase change. No Qase case was created, updated, moved, or pushed.

## New TC Reference

| Local Case | Suggested Title |
| --- | --- |
| TC-1 | Dashboard - Event Overview - Verify single-event totals and ticket breakdown |
| TC-2 | Dashboard - Event Overview - Verify recurring-parent totals and child event rows |
| TC-3 | Dashboard - Event Management - Verify pages and sections by event state |
| TC-4 | Dashboard - Events - Verify draft save, reopen, edit, and publish lifecycle |
| TC-5 | Dashboard - Edit Event - Verify supported edit entry points save and persist |
| TC-6 | Dashboard - Event Management - Enforce route permission and venue ownership |
| TC-7 | Dashboard - Edit Event - Verify pending, refunded, and archive guardrails |
| TC-8 | Dashboard - Edit Event - Configure Custom Display Fields |
| TC-9 | Dashboard - Edit Event - Persist Advanced Options |
| TC-10 | Dashboard - Edit Sellers - Persist event seller access |
| TC-11 | Dashboard - Event Stats & Info - Verify baseline event reporting |

## CSV Mapping

CSV numbers exclude the header row.

### Core Event Lifecycle and Existing Feature Coverage

| CSV # | Page / Section / Feature | Qase Test Case Mapping | Classification / Action |
| ---: | --- | --- | --- |
| 1 | Event Overview — single event | TC-1 | New |
| 2 | Event Overview — recurring parent | TC-2 | New |
| 3 | Management navigation by event state | TC-3 | New |
| 4 | Create Event — basic flow | SPT-764 | Existing; improve exact start route and fresh-read persistence |
| 5 | Create Event — advanced validation | SPT-775, SPT-4874 | Existing; refactor SPT-775 and clarify parameter mapping in SPT-4874 |
| 6 | Draft lifecycle | TC-4 | New |
| 7 | Recurring event creation | SPT-4876 | Existing; improve parent/child persistence proof |
| 8 | Child event editing | SPT-4876 | Enhance the existing case; do not create a duplicate |
| 9 | Recurring conversion guardrails | SPT-4299, SPT-4879 | Existing; improve fixture and parameter clarity |
| 10 | Permissions and venue ownership | TC-6 | New |
| 11 | Protected event states | TC-7 | New |
| 12 | Event templates | SPT-769 | Existing; improve role, route, and persistence proof |
| 13 | Clone Event | SPT-786 | Existing |
| 14 | Ticket type inventory and pricing | SPT-766, SPT-768, SPT-770 | Existing |
| 15 | Ticket type sales settings | SPT-758–760, SPT-4063, SPT-4384, SPT-4875 | Existing |
| 16 | Ticket delivery settings | SPT-3275–3278 | Existing |
| 17 | Order Form | SPT-3247–3249, SPT-3251–3252, SPT-3263–3264 | Existing |
| 18 | Custom Questions | SPT-3253, SPT-3261–3262, SPT-3268–3270 | Existing |
| 19 | Terms acceptance | SPT-4878 | Existing |
| 20 | Event category metadata | SPT-745, SPT-749 | Existing |
| 21 | Donations | SPT-780, SPT-782–783, SPT-3300 | Existing |
| 22 | Online and livestream events | SPT-4877 | Existing |
| 23 | Financial Settings and internal fees | SPT-772, SPT-3501, SPT-3810–3811; TC-3 for presence | Existing; execute only the TC-3 presence check in this scope |
| 24 | Assigned Seating | Qase suite 82; TC-3 for presence | Existing specialist suite; execute only the TC-3 presence check in this scope |
| 25 | `/dashboard/events/create-event/` wizard | No case | Deferred until the unlinked route is confirmed as supported |

### Edit Sections and Advanced Options

| CSV # | Page / Section / Feature | Qase Test Case Mapping | Classification / Action |
| ---: | --- | --- | --- |
| 26 | Edit — Basic Info | SPT-764, SPT-4874; TC-5 for edit-entry persistence | Existing plus new entry-point coverage |
| 27 | Edit — Location & Info | SPT-764, SPT-4874 | Existing but broad; no separate new case proposed |
| 28 | Edit — Event Date & Time | SPT-4874, SPT-4876 | Existing but broad |
| 29 | Edit — Accommodations | SPT-1784 for Dashboard setup; SPT-359 for public output | Refactor and move SPT-1784 under Events; retain SPT-359 in Core |
| 30 | Edit — Legal Policies & Important Info | SPT-4878; TC-5 provides generic edit persistence | Partial existing coverage; do not duplicate unless policy-specific persistence is later proven absent |
| 31 | Edit — Custom Display Fields | TC-8 | New |
| 32 | Advanced Options — Event Password | TC-9 `EventPassword`; SPT-3807 for public password access | New Dashboard configuration coverage plus existing public-output proof |
| 33 | Advanced Options — Exchanges and Customer List | TC-9 `ExchangeCutoff`, `CustomerList` | New parameter coverage |
| 34 | Advanced Options — Third-Party Ticket Page | TC-9 `ThirdPartyRedirect` | New parameter coverage |
| 35 | Advanced Options — Event Reports and Email Controls | TC-9 `EventReportRecipient`, `PostEventEmailStatus`, `EventReminder` | New parameter coverage |
| 36 | Advanced Options — Thermal Tickets and Workday | TC-9 `ThermalTicketText`, `WorkdayIntegration` | New parameter coverage |

### Manage, Promote, Reports, and Handoffs

| CSV # | Page / Section / Feature | Qase Test Case Mapping | Classification / Action |
| ---: | --- | --- | --- |
| 37 | Manage — Email Customization | SPT-3617–3621, SPT-3626, SPT-4087, SPT-4148, SPT-4150–4151, SPT-4836–4837 | Existing but scattered; move SPT-3618, SPT-4150, and SPT-4151 under Events; split event variants from hybrid SPT-3619 and SPT-4087 before moving |
| 38 | Manage — Branding | SPT-4124–4128, SPT-4335, SPT-4742 | Existing but scattered; re-parent Branding under Events or move its event-owned subset |
| 39 | Manage — Waitlist | SPT-4384; TC-3 for conditional route presence | Existing setup coverage plus new navigation smoke |
| 40 | Manage — Attraction Configuration | SPT-3524–3529, SPT-4090, SPT-4829 | Existing and already under Events |
| 41 | Manage — Live Stream | SPT-4877, SPT-3291; TC-3 for conditional route presence | Existing configuration/public-output coverage plus new navigation smoke |
| 42 | Manage — Edit Sellers | TC-10 | New |
| 43 | Manage — Email Guests | SPT-5012–5018 | Existing and already under Events |
| 44 | Manage — Transactions | SPT-5064–5070; TC-3 for selected-event handoff | Existing destination coverage plus new event-sidebar handoff proof |
| 45 | Manage — Check In | SPT-1663, SPT-1664, SPT-1665, SPT-3270; TC-3 for selected-event handoff | Existing destination coverage plus new event-sidebar handoff proof |
| 46 | Manage — Publish Approval | SPT-4699–4718, SPT-4750–4754 | Existing but scattered; re-parent Workflow Approval suite 949 under Events |
| 47 | Promote — Facebook Integration | SPT-4902; TC-3 for conditional route presence | Existing but scattered; move SPT-4902 under Events |
| 48 | Promote — Tracking Links | SPT-4236–4242, SPT-4800–4801, SPT-5010–5011; TC-3 for route presence | Existing but scattered; move event-owned SPT-4239, SPT-4242, SPT-5010, and SPT-5011 under Events |
| 49 | Reports — Stats & Info | TC-11; SPT-4288 for revenue-realization settlement | New baseline case; retain the specialized existing case |
| 50 | View Event | TC-3 | New handoff assertion inside the navigation case; no separate case proposed |
| 51 | Manage All Events | SPT-784; TC-3 for return handoff | Existing list coverage plus new event-sidebar return assertion |

## Totals

| Classification | Count / Scope |
| --- | --- |
| Local new cases | 11: TC-1 through TC-11 |
| Deferred without a case | 1: unsupported-status create wizard |
| Existing cases needing enhancement | SPT-764, SPT-769, SPT-775, SPT-1784, SPT-4288, SPT-4299, SPT-4874, SPT-4876, SPT-4879 |
| Existing coverage needing suite review | Branding, Email Customization, Tracking Links, Facebook Integration, Workflow Approval, and Dashboard Accommodations setup |
| Existing coverage already correctly under Events | Email Guests and Attraction Configuration |

## Qase Handling

- Use `TC-*` only until a new case is created and Qase assigns a real `SPT-*` ID.
- Replace the local `TC-*` reference in this map only after successful Qase creation and readback verification.
- Moving or enhancing an `SPT-*` case does not create a new `TC-*` label.
- Do not create, update, move, or push any mapped Qase case without explicit approval.
