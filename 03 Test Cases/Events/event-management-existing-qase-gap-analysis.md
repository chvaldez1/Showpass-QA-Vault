---
title: Event Management Existing Qase Gap Analysis
date: 2026-08-24
tags:
  - qa/gap-analysis
  - qase
  - events
aliases:
  - Event Overview Existing Qase Coverage
---

# Event Management Existing Qase Gap Analysis

> [!info] Read-only result
> Qase was read on 2026-08-24. No Qase case was created, updated, deleted, or pushed. Suggested new cases are in [[03 Test Cases/Events/event-management-new-qase-gap-analysis|Event Management New Qase Gap Analysis]].

## Testing Intent

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

## Proof Target Map

| Proof Target | Why It Matters | Current Coverage |
| --- | --- | --- |
| Event Overview reports the current event accurately | Prevents organizer decisions from stale or mismatched sales, inventory, and check-in data | Gap; SPT-4288 is settlement-focused and does not cover this page |
| Create, draft, publish, and edit form a persistent lifecycle | Prevents unusable or lost event configuration | Partial: SPT-764, SPT-4874 |
| Recurring parent and child edits preserve ownership boundaries | Prevents parent, sibling, or child schedule/configuration corruption | Partial: SPT-4876; guardrails in SPT-4879 and SPT-4299 |
| Only the correct venue user can manage an event | Prevents unauthorized event changes | Gap |
| All supported event create/edit entry points remain usable | Prevents hidden legacy links and specialized lifecycle routes from breaking | Partial: SPT-769, SPT-786; standalone editor and route parity are gaps |
| Every event-management destination is visible only when supported and opens the selected event | Prevents inaccessible or cross-event organizer workflows | Partial; several feature cases exist outside suite 79, while Edit Sellers and some edit sections are true gaps |

## Scope Decisions

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

## Sources Reviewed

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

## Qase Read Summary

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

### Why Suite 79 Has So Many Cases

Suite 79 is an empty parent. The Qase UI expands 15 descendant suites, so the search page combines the core event form with large specialist areas. Assigned Seating alone contributes 25 cases; Hard Copy and Email Guest add seven each.

| Suite | Count | Relevance to This Analysis |
| --- | ---: | --- |
| 79 Events | 0 | Parent only |
| 80 Manage Events (Legacy) | 0 | Parent only |
| 81 Google Events - Event Categories | 2 | Direct form controls |
| 82 Dashboard - Assigned Seating | 25 | Presence-only in this analysis |
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
| 1035 Email Guest | 7 | Separate manage page |

## Full Sidebar and Edit-Section Re-audit

The first pass was too narrow: it counted the create/edit form and closely coupled settings, but did not account for every destination in the event-management shell. The screenshot is consistent with the source-owned navigation in `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/manage/partials/_event-manage-sidebar.html` and `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form-nav.html`.

| Group | Page / Section / Feature | Existing Qase Coverage | Classification / Recommendation |
| --- | --- | --- | --- |
| Overview | Single and recurring Event Overview | None dedicated | True gap → TC-1 and TC-2 |
| Edit | Basic Info, Location & Info, Event Date & Time | SPT-764, SPT-4874, SPT-4876 | Existing but broad; keep in Events and improve persistence wording |
| Edit | Accommodations | SPT-359 in Core - Events; SPT-1784 in suite 198 | Partial and scattered; refactor SPT-1784 as the Dashboard configuration case and move it under Events; keep SPT-359 as public-output proof |
| Edit | Ticket Types | SPT-758–760, SPT-766, SPT-768, SPT-770, SPT-4063, SPT-4384, SPT-4875 | Existing under Events |
| Edit | Legal Policies & Important Info | SPT-4878 covers terms acceptance | Partial; retain and add exact policy persistence only if not covered by the basic edit case |
| Edit | Order Form and Custom Questions | SPT-3247–3270 | Existing under Events |
| Edit | Custom Display Fields | None | True gap → TC-8 |
| Edit | Charitable Donations | SPT-780, SPT-782–783, SPT-3300 | Existing under Events |
| Edit | Financial Settings and internal fees | SPT-772, SPT-3501, SPT-3810–3811 | Presence-only in this analysis |
| Edit | Advanced Options — event password and message | SPT-3807 proves public password access; no Dashboard configuration case | True configuration gap → TC-9; keep SPT-3807 in Core |
| Edit | Advanced Options — exchanges, customer list, third-party URL, report recipients, post-event email status, thermal text, Workday, and reminder email | No dedicated event-edit persistence case | True gap → TC-9 parameter mapping; execute only applicable controls |
| Manage | Email Customization | 12 cases in suite 749 under Emails | Existing but scattered; move event-only cases into an Events child suite as listed below |
| Manage | Branding | 7 cases in suite 744 under Dashboard | Existing but scattered; nest Branding under Events or move the event-owned subset |
| Manage | Waitlist | SPT-4384; SPT-4087 covers cancellation email customization | Partial; keep deep behavior in its feature cases and add route presence to TC-3 |
| Manage | Attraction configuration | SPT-3524–3529, SPT-4090, SPT-4829 | Existing and already under Events descendants |
| Manage | Live Stream | SPT-4877 plus public-output SPT-3291 | Existing configuration/output coverage; add conditional page presence to TC-3 |
| Manage | Edit Sellers | None dedicated | True gap → TC-10 |
| Manage | Email Guests | SPT-5012–5018 | Existing and already under Events > Email Guest |
| Manage | Assigned Seating | 25 cases in suite 82 | Presence-only in this analysis |
| Manage | Transactions | Deep cases in suite 103; event-scoped cases SPT-5064–5070 | Keep deep behavior in Transactions; TC-3 verifies the sidebar opens Transactions filtered to the selected event |
| Manage | Check In | Deep cases in suites 184–185 | Keep deep behavior in Check In; TC-3 verifies the selected-event handoff |
| Manage | Publish Approval | SPT-4699–4718 and SPT-4750–4754 in root suite 949 | Existing but scattered; nest the workflow suite under Events because its cases are event lifecycle coverage |
| Promote | Facebook Integration | SPT-4902 in Integrations | Existing but scattered; move the event-specific case under Events |
| Promote | Tracking Links | 11 cases in suite 183 | Existing but scattered; move event-route cases under Events and keep cross-event/global cases in Tracking Links |
| Reports | Stats & Info | SPT-4288 covers revenue realization only | True baseline gap → TC-11; do not count SPT-4288 as general page coverage |
| External | View Event | No dedicated event-management handoff case | Cover in TC-3; public feature behavior remains outside this analysis |
| External | Manage All Events | SPT-784 covers the Manage Events page generally | Cover the return handoff in TC-3; do not duplicate list behavior |

### Recommended Qase Suite Placement

These are read-only recommendations; no case or suite was moved.

| Current Location | Recommended Event Ownership | Cases |
| --- | --- | --- |
| Suite 744 `Branding` under Dashboard | Nest the suite under Events, or create `Events > Branding` if the suite cannot be re-parented | SPT-4124–4128, SPT-4335, SPT-4742 |
| Suite 749 `Email Customization` under Emails | Move event-only cases to `Events > Email Customization`; split hybrid event/venue cases before moving their event coverage | Move SPT-3618, SPT-4150, SPT-4151; split the event variants from SPT-3619 and SPT-4087; review SPT-3617, SPT-3620, SPT-3626, and SPT-4836 before changing their multi-scope ownership |
| Suite 183 `Tracking Links` under Dashboard | Move event-route/event-owned cases to `Events > Tracking Links`; keep global list/export/attribution cases in the feature suite | SPT-4239, SPT-4242, SPT-5010, SPT-5011 |
| Suite 186 `Integrations` | Move the event-specific Facebook case to `Events > Facebook Integration` | SPT-4902 |
| Root suite 949 `Workflow Approval - V1` | Nest the full suite under Events; its coverage is tied to event create, edit, request-publish, review, and publish states | SPT-4699–4718, SPT-4750–4754 |
| Suite 198 accommodation case | Refactor and move the Dashboard configuration case under `Events > Create / Edit Events`; leave public rendering in Core | SPT-1784; retain SPT-359 in Core - Events |
| Events descendants | No move | Email Guests SPT-5012–5018 and Attraction Configuration SPT-3524–3529, SPT-4090, SPT-4829 are already placed correctly |

## Existing Qase Coverage

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

## Source-Backed Behavior

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

## Product-Surface and Complex-Control Inventory

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
| Accommodations configuration | Accommodation-enabled venue | SPT-1784 is not executable; SPT-359 proves public output only | Refactor/move SPT-1784; do not duplicate SPT-359 |
| Custom Display Fields | Venue allows integrated display fields; non-child event | None | New coverage required |
| Advanced Options configuration | Mostly non-child event; several controls are conditional | Public password/output cases only | New parameterized persistence coverage required |
| Email Customization and Branding | Eligible event and organizer | Existing in suites 749 and 744 | Existing coverage; suite-placement correction, not new cases |
| Edit Sellers | Parent/single event with ticket types | None | New focused permission-persistence coverage required |
| Email Guests and Attraction Configuration | Eligible active event | SPT-5012–5018; SPT-3524–3529, SPT-4090, SPT-4829 | Existing under Events |
| Transactions, Check In, View Event | State/permission-dependent handoffs | Deep destination coverage exists outside Events | Add event-scoped handoff assertions to navigation case |
| Facebook and Tracking Links | Parent/single event; Facebook also needs complete address | SPT-4902; suite 183 | Existing coverage; move event-owned cases under Events |
| Publish Approval | Applicable active workflow; non-child event | SPT-4699–4718, SPT-4750–4754 | Existing; re-parent suite 949 under Events |
| Stats & Info | Single or recurring parent | SPT-4288 is settlement-only | New baseline page case required |

## Coverage Gaps

| Gap | Evidence | Recommendation |
| --- | --- | --- |
| No Event Overview case | Full-project Qase search found no title, description, or step for the route or page sections | Add separate single-event and recurring-parent overview cases |
| No setup-progress/navigation state case | Overview and sidebar are conditional by completeness, event type, status, permissions, flags, and pricing tier | Add one state-aware navigation/presence case |
| No clean draft lifecycle | SPT-4874 mixes several invalid inputs and ends with an ambiguous draft-or-publish action | Add a successful save-draft, reopen, edit, publish, and cleanup case |
| Child edit proof is vague | SPT-4876 says edits are “blocked or limited” without naming the child route, allowed values, or parent/sibling proof | Enhance SPT-4876 with exact child edit steps and fresh-read checks |
| Standalone edit entry is absent | Source links to `/edit-form/`; Qase cases use generic “open event edit” wording | Add an edit-entry-point persistence case |
| Manage permission and venue ownership are absent | All page routes require manage-events permission; lookups are venue-scoped | Add one parameterized permission-boundary case |
| Pending/refunded/archive guardrails are absent | Backend blocks pending/refunded updates and protected archival | Add one parameterized lifecycle-guardrail case |
| Wizard support is unknown | `/create-event/` exists, but no current source link was found | Keep Deferred until product confirms it is supported |
| Full sidebar was not explicitly enumerated | Source and screenshot show Edit, Manage, Promote, Reports, and external destinations with distinct conditions | Expand TC-3 with the exact destination/condition map and selected-event handoff proof |
| Custom Display Fields have no case | Source provides add, formatted/plain value, delete, and integrated-page-only behavior | Add TC-8 |
| Advanced Options configuration is unowned | Public password and email cases do not prove Dashboard add/save/remove behavior for the controls in this section | Add parameterized TC-9; keep public-output cases separate |
| Edit Sellers has no dedicated case | Source mutates venue and employee seller permission, visibility, payment methods, sales limits, and full-stats access | Add TC-10 with reversible employee and affiliate-seller variants |
| Stats & Info baseline is absent | SPT-4288 only validates revenue realization after settlement and has no named baseline page assertions | Add TC-11 for single and recurring shapes |
| Relevant cases are scattered outside Events | Global scan found Branding, Email Customization, Tracking Links, Facebook integration, Workflow Approval, and accommodation setup in other suites | Apply the suite-placement recommendations above; do not create duplicates |

## Qase Case Improvements

### Portfolio-Wide for the 48 Direct Cases

- Add the required `Platform / View` table to every Description. None of the 48 descriptions currently includes it; use `Dashboard / Desktop`.
- Reduce tags to 1–3 approved tags. Thirty-four cases have more than three tags, and 31 use at least one unapproved tag. Common invalid tags include `ticket-types`, `event-settings`, `validation`, `web`, `pricing`, `info-collection`, and delivery-specific tags.
- Use asterisk bullets for multi-item Preconditions and Postconditions. SPT-775, SPT-4063, and SPT-4299 also need missing or incomplete final-state instructions.
- Split multi-action steps so each row contains one user action and one visible expected result. Move backend rules and exhaustive variant mapping into Description or test data.
- Keep current case purpose and supported behavior when refining. No Qase write should silently remove a pricing, delivery, recurring, or custom-question variant.

### Priority Case-Specific Suggestions

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

## Coverage Ledger

| Item | Type | Risk | Coverage | Evidence / Decision |
| --- | --- | --- | --- | --- |
| Single-event overview | Route/page | Reporting disagreement | Gap → proposed TC-1 | Source template/controller; no Qase match |
| Recurring-parent overview | Route/page | Child totals disagreement | Gap → proposed TC-2 | Source template/controller; no Qase match |
| State-aware sidebar and setup progress | Navigation/conditional UI | Missing operational access | Gap → proposed TC-3 | Source sidebar and overview progress |
| Basic event creation | Mutation | Unsellable event | Existing | SPT-764 |
| Invalid create/publish | Validation | Bad active event | Existing, improve | SPT-4874 |
| Draft save/reopen/publish | Lifecycle mutation | Lost or stuck draft | Gap → proposed TC-4 | Source model defaults and publish validation |
| Parent/child create and edit | Lifecycle mutation | Recurrence corruption | Existing, improve | SPT-4876 |
| Recurring conversions | Validation | Invalid recurrence state | Existing, improve | SPT-4879; SPT-4299 |
| Template create/edit/generate | Specialized create | Wrong generated configuration | Existing, improve | SPT-769 |
| Clone | Specialized create | Original/clone corruption | Existing | SPT-786 |
| Standalone edit route | Entry path | Broken linked editor | Gap → proposed TC-5 | Active source links to `/edit-form/` |
| `/edit/` manage alias | Entry path | Compatibility break | Not applicable as separate case | Same manage shell and hash states |
| Create wizard | Entry path | Unsupported route ambiguity | Deferred | Route/template exist; no active link found |
| Route permissions/venue scope | Permission boundary | Unauthorized edit | Gap → proposed TC-6 | View decorators and venue-scoped lookup |
| Pending/refunded/delete guards | Mutation guardrail | Conflicting save or data loss | Gap → proposed TC-7 | API viewset and archival service |
| Financial Settings/internal fees | Section | Missing configuration access | Presence-only → proposed TC-3 | Existing detailed rate-card cases excluded from deep review |
| Assigned Seating | Page | Missing seating entry | Presence-only → proposed TC-3 | Existing 25-case suite excluded from deep review |
| Accommodations | Conditional edit section | Lost or unusable lodging information | Existing but unusable/scattered → refactor SPT-1784 | SPT-359 proves public output only |
| Custom Display Fields | Conditional edit section | Missing integrated-site metadata | Gap → proposed TC-8 | Source add/edit/delete controls; no Qase match |
| Advanced Options | Conditional edit section | Lost visibility, redirect, reporting, email, or print configuration | Gap → proposed TC-9 | Source controls; public-output cases are not configuration proof |
| Branding | Manage page | Lost event presentation or inheritance | Existing; suite move | SPT-4124–4128, SPT-4335, SPT-4742 in suite 744 |
| Email Customization | Manage page | Wrong event email content or fallback | Existing; selective suite move | Event-specific cases in suite 749 |
| Edit Sellers | Manage mutation | Wrong seller access, payment method, or sales limit | Gap → proposed TC-10 | Source template/controller; no Qase match |
| Email Guests | Manage mutation | Blocked or invalid attendee communication | Existing | SPT-5012–5018 under Events |
| Attraction Configuration | Manage mutation | Broken attraction composition | Existing | SPT-3524–3529, SPT-4090, SPT-4829 under Events |
| Waitlist and Live Stream pages | Conditional manage pages | Missing configured workflow access | Existing functional coverage plus TC-3 smoke | SPT-4384, SPT-4877 |
| Transactions / Check In / View Event | External handoffs | Wrong event context or inaccessible operation | TC-3 navigation smoke; deep destination cases remain separate | Source uses event slug and state/permission conditions |
| Facebook / Tracking Links | Promote pages | Broken event promotion entry | Existing; suite move plus TC-3 smoke | SPT-4902 and event-owned suite 183 cases |
| Publish Approval | Conditional manage lifecycle | Unauthorized or stuck publication | Existing; suite re-parent | Suite 949 workflow cases |
| Stats & Info | Reports page | Misleading sales, scan, or revenue reporting | Partial → proposed TC-11 | SPT-4288 covers settlement-specific realization only |
| Loading/API error states on Overview | Error/recovery | Blank or stale dashboard | Deferred to automation | Deterministic request control is preferable |

## Risk Areas

- Event Overview labels `gross_sales` as Net Sales while separately displaying Net Revenue; a regression can create a misleading organizer-facing reconciliation.
- The checked-in percentage combines used redeemable tickets with a sold-ticket denominator and must remain stable at zero when no applicable tickets exist.
- Single-event breakdown excludes payment-plan ticket types, while recurring parents use child aggregation APIs; testing only one event shape misses a distinct data path.
- Create/update waits on an asynchronous task or save-pending poll. Timeouts, duplicate submission, or stale reloads can leave an organizer unsure whether the change persisted.
- Parent propagation intentionally preserves child values that have diverged unless explicit propagation is requested; vague recurring tests can miss sibling corruption.
- Draft, template, child, active, and approval-workflow events expose different status actions and sidebar links.
- The standalone editor remains linked from older workflows even though the manage editor is the primary path.
- Feature flags, venue modules, pricing tier, permissions, address completeness, event state, and recurring ownership all change the visible sidebar; one fully enabled active event does not prove the hidden-state rules.
- Scattered suite ownership makes existing coverage look absent and encourages duplicates. Suite reorganization must preserve cross-scope cases whose parameters also cover venues, memberships, holds, or global tracking-link behavior.

## Automation Candidates

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

## Open Questions

- Non-blocking: is `/dashboard/events/create-event/` intentionally retired/unlinked? If it is supported, add a separate wizard case; otherwise document or remove the route rather than adding Qase coverage.
- Non-blocking: should event-scoped rows be split out of multi-scope Email Customization cases before moving them, or should those cross-scope cases remain under Emails with explicit `events` tags and links from the Event suite?
