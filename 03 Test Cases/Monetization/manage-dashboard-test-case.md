---
title: Manage Dashboard Test Case
date: 2026-09-16
tags:
  - dashboard
  - analytics
---

# Manage Dashboard Test Case

One sequential case for suite **1079 — Manage (Daily Dash)**, based on `showpass-playwright/docs/specs/dashboard/SPEC_manage.md`. The case follows the page from its greeting through shortcuts, the analytics banner, and the analytics cards. No new browser execution was performed.

Standards: [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]], and [[05 Tooling/qasectl]].

## Testing Intent

Verify an authorized employee can use the Manage dashboard's shortcuts, open and dismiss its analytics options, and read the embedded dashboard without changing business data.

| Field | Scope |
| --- | --- |
| Criticality bucket | Dashboard navigation and analytics availability. |
| Business invariant | Each shortcut reaches its intended page; temporary banner/modal actions preserve access to the dashboard. |
| Failure modes | Missing shortcuts, broken destinations, stuck modal/loading state, blank analytics content. |
| Observable proof | Seven loaded destinations, both modal dismissals, refresh, and nine rendered analytics cards. |
| Actor / surface | Organization employee; Dashboard / Desktop. |
| In scope | N0–N4, B1–B4, A1–A2 and cleanup from the supplied spec. |
| Out of scope | Mobile follow-up, alternate permissions/plans, downstream mutations, analytics calculations and controls; deferred by the spec. |
| Confidence | Source-backed behavior plus the spec's historical desktop evidence; no current execution result. |

## Sources Reviewed

Repository roots:

* Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
* Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
* Automation/spec: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

| Source | Evidence |
| --- | --- |
| Automation `docs/specs/dashboard/SPEC_manage.md` | Full desktop plan and recorded 2026-09-11 destination/banner/card evidence; 2026-09-14 automation results. Historical results belong to the spec, not this new case. |
| Backend `apps/venues/constants/employment.py`; permission names confirmed in `apps/main/static/generated-enums.json` | Box Office Sales, Manage Events, Book Guestlists, Use Capacity Counters, View Advanced Analytics, Manage Add-ons. |
| Backend `apps/integrations/api/venue_based/domo.py` | View Advanced Analytics permission; organization/system dashboard access; token request can fail. |
| Frontend `packages/next-app/pages/manage/index.tsx` | Dashboard shell for `/manage/`; individual content uses its own permission checks. |
| Frontend `packages/core/src/app-contexts/dashboard/features/monetization/components/manage/ManageContent/ManageContent.web.tsx` | Greeting, prompt, banner prerequisites, collapsed initial state with enabled analytics module, analytics permission. |
| Frontend `packages/core/src/app-contexts/dashboard/features/monetization/components/manage/ManageNavigation/ManageNavigation.web.tsx` | All seven shortcut names and destinations; permission/module and Basic-plan gates. |
| Frontend `packages/core/src/app-contexts/dashboard/features/monetization/components/advanced-analytics/AdvancedAnalyticsModal/AdvancedAnalyticsModalFooter.web.tsx` | Cancel and separate trial/plan/purchase actions. |
| Frontend `packages/core/src/app-contexts/dashboard/features/domo-dashboard/data/repositories/DomoDashboardRepository.ts`, `hooks/useDomoDashboard.ts`, `ui/components/DomoEmbed/DomoEmbed.web.tsx` | API endpoint, preference for organization dashboard, loaded/unavailable states and embedded rendering. |
| Qase suite 1079 read | Suite title Manage (Daily Dash), zero cases before creation; no project-wide gap analysis performed. |

## Source-backed Behavior

* Shortcut order is Box office, Manage events, My stats, Transactions, Book guestlists, Manage guestlists, Capacity counters. The desktop grid has four columns. My stats is unconditional in this component.
* Box Office Sales also satisfies the Transactions shortcut's any-of permission check; Book Guestlists satisfies both guestlist shortcuts. Events, Guestlists, and Capacity Counters modules must be enabled. Basic pricing disables the last three shortcuts.
* `show_advanced_analytics_upsell_banner` is read from the session's global flag payload; it is not passed a venue ID in this component. The banner additionally requires Manage Add-ons permission and non-Basic pricing. Any enabled advanced analytics module initially collapses it.
* View Advanced Analytics gates the embed. The frontend prefers an organization-specific dashboard over a system dashboard; use the nine-card dashboard described in this case rather than assuming every custom dashboard has the same cards.
* The spec's Book guestlists destination is an analytics page with a Book guestlist action, not an already-open booking form. Box office and Transactions were displayed inside legacy page wrappers. Manual checks therefore use visible destination content rather than hard-coded legacy URLs.

## Assumptions and Unknowns

* Reuse an organization with the stated entitlements and the standard nine-card analytics dashboard. No plan purchase or permission administration is part of execution.
* The supplied spec establishes the historical destination content and card names. Current deployed behavior was not inspected; an unavailable dashboard is not an acceptable substitute for the required loaded dashboard.
* English labels are used. The full mobile scenario, other browser combinations, and alternative permission/plan/error states remain deferred as in the supplied spec.

## Risk Areas

* A shortcut can navigate without loading the correct page; each click requires destination content and a return check.
* A blank frame or permanently loading report must not pass as rendered analytics. Data can legitimately be empty, but card titles and a completed content/empty state must render.
* Analytics options include subscription-changing controls. Only open, inspect and dismiss the options in this case.

## Coverage Ledger / Minimum Execution Set

| Spec scenarios | Coverage |
| --- | --- |
| N0–N3: entry, identity, greeting, seven shortcuts and refresh | TC-1 opening steps; manual-only, not executed. |
| N4.1–N4.7: all shortcut destinations and browser Back | TC-1 seven click/return pairs; manual-only, not executed. |
| B1–B4: expand/collapse, options, Cancel and Close modal | TC-1 banner/modal sequence; manual-only, not executed. |
| A1–A2: all nine cards and final page usability | TC-1 final steps; manual-only, not executed. |
| Cleanup | TC-1 Postconditions; no business records changed. |
| Basic tier, missing permissions/modules/banner, unavailable analytics, auth/API failure | Deferred: require different setup; not the spec's loaded baseline. |
| Mobile, sidebar/profile workflows, analytics filters/share/export/card interactions, calculations, billing and destination workflows | Deferred: outside the spec's completed desktop plan. |
| Input validation and business-data save/delete | Not applicable to this read-only page check. |

Minimum: one complete desktop execution of TC-1 from top to bottom. A source or historical spec pass does not count as a pass for this new run.

## Recommended Test Data

Use an employee and organization meeting the case's four prerequisites. Record the selected organization and employee username in execution evidence. No specific organization ID, example username, event, order, or financial total is required. The spec's existing automation account is a reusable option, not a mandatory identity for the manual case.

## Qase-ready Manual Test Case

### TC-1: Dashboard - Manage - Check the page from top to bottom

**Title:** Dashboard - Manage - Check the page from top to bottom

**Description:** Check Dashboard home from top to bottom: the greeting, each shortcut button, the Advanced analytics offer, and the reports below it. Open each shortcut and return, try both ways to close the analytics options window, and check that all nine reports appear. This checks for missing content and links or windows that do not work.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Sign in as an employee with these permissions: Box Office Sales, Manage Events, Book Guestlists, Use Capacity Counters, Manage Add-ons, and View Advanced Analytics, or full organization access.
* Use an organization on a plan other than Basic, with Events, Guestlists, and Capacity Counters available.
* Advanced analytics is already enabled, and the show_advanced_analytics_upsell_banner flag is on so its offer appears with Show more.
* Use the organization’s standard analytics dashboard with the nine reports named below, in English on a desktop browser.

**Postconditions:**

* Leave Dashboard home showing the short analytics offer and Show more, with the options window closed.
* No sales, guestlist bookings, capacity counts, subscriptions, or organization settings were changed.

**Tags:** dashboard, analytics

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Click Dashboard in the navigation menu. | Your selected organization. | You see the correct organization, Hi followed by your username, and What would you like to do? |
| Look at the buttons below the greeting, reading left to right across both rows. | Box office; Manage events; My stats; Transactions; Book guestlists; Manage guestlists; Capacity counters. | You see these seven buttons, with four in the first row and three in the second, and none are greyed out. |
| Click your browser’s Reload button. | | Your organization, greeting, seven buttons, short analytics offer and reports appear again without asking you to sign in or showing an error. |
| Click Box office. | | Box Office opens in the same tab with Cart and Tickets visible. |
| Click your browser’s Back button. | | You are back on Dashboard home with your greeting and all seven buttons ready to use. |
| Click Manage events. | | Manage Events opens in the same tab with Create Event shown. |
| Click your browser’s Back button. | | You are back on Dashboard home with your greeting and all seven buttons ready to use. |
| Click My stats. | | Profile & Stats opens in the same tab. |
| Click your browser’s Back button. | | You are back on Dashboard home with your greeting and all seven buttons ready to use. |
| Click Transactions. | | Transactions opens in the same tab with Toggle filters shown. |
| Click your browser’s Back button. | | You are back on Dashboard home with your greeting and all seven buttons ready to use. |
| Click Book guestlists. | A guestlist is a list of guests managed by the organization; do not make a booking. | The page opens in the same tab and shows Book guestlist; a booking form does not need to be open yet. |
| Click your browser’s Back button. | | You are back on Dashboard home with your greeting and all seven buttons ready to use. |
| Click Manage guestlists. | | The Guestlists page opens in the same tab with New Guestlist ready to use and Upload Guestlist shown. |
| Click your browser’s Back button. | | You are back on Dashboard home with your greeting and all seven buttons ready to use. |
| Click Capacity counters. | Do not click -1 or +1. | Capacity Counters opens in the same tab with -1 and +1 buttons that are not greyed out, and the counts stay unchanged. |
| Click your browser’s Back button. | | You are back on Dashboard home with your greeting and all seven buttons ready to use. |
| Read the Advanced analytics offer below the seven buttons. | Enjoying these stats? Enhance your event management with our Advanced analytics Add-On. | You see the short message and a Show more button. |
| Click Show more. | The description continues: Choose the tier that fits your needs and unlock the analytics and reporting tools to optimize your events. | The offer opens to show Add-on, Advanced analytics, the full message, a picture, View options and a close button. |
| Click the close button on the analytics offer. | | The offer returns to its short message with Show more. |
| Click Show more again. | | The full offer opens again without leaving Dashboard home. |
| Click View options. | | An Advanced analytics window opens with Industry dashboard, Custom dashboard and Partner Program, a description of each, Cancel and a close button. |
| Click Cancel. | Do not select Add, Learn more, Start trial, Add to plan, Submit, or Create account. | The options window closes and you can use Dashboard home again. |
| Click View options again. | | The options window opens again with the same three choices. |
| Click the close button on the options window. | Use the close button instead of Cancel. | The window closes and your greeting and seven shortcut buttons are still shown. |
| Click the close button on the analytics offer. | | Only the short offer and Show more are shown again. |
| Scroll down to the reports below the analytics offer and check the first four. | Net Sales This Year; Gross Revenue This Year; Tickets Sold This Year; Products Sold This Year. | Each named report shows its title and either figures or a message saying there is no data; none stays blank or keeps loading. |
| Continue down the page and check the other five reports. | Items Sold by Payment Type; Revenue By Day; Top Ticket Types; Tickets Sold by Event; Upcoming Event Stats. | Each named report shows its title and either a chart, a table or a message saying there is no data; none stays blank or keeps loading. |
| Scroll back to the top of Dashboard home. | Only check that the reports appear; do not change filters, share, export, or check the accuracy of the totals. | Your greeting, What would you like to do?, all seven buttons and the short analytics offer are still shown, with no options window or error message in the way. |

## Suggested Automated Coverage

Map the single manual case to the spec's existing three automation scenarios in `tests/core/dashboard/manage/manage.test.ts`: page/navigation, banner/options, and analytics. Keep the seven destination checks and nine-card assertions explicit. Do not count frame presence alone as analytics coverage. The spec reports earlier desktop passes; no automated tests were run for this publication.

## Open Questions

No blocking drafting question. Missing entitlements or the nine-card dashboard block execution of the corresponding checks; they are not reasons to silently skip them. Browser execution and release readiness are not claimed.

## Qase Publication

Created [SPT-5240](https://app.qase.io/case/SPT-5240) in suite 1079 — Manage (Daily Dash), from local TC-1. Readback comparison confirmed the title, suite, tags, description, prerequisites, postconditions and 29-step count match the intended payload. Qase stores the omitted parameters as empty lists, as expected. No browser or manual test execution was performed.

Plain-language revision: updated SPT-5240’s Description, Preconditions, Postconditions and Steps after reading the current case. The selected-field apply verified the saved wording. All 29 steps, seven shortcut return checks, both options-window dismissals, and nine reports are retained; title, suite, tags and parameter state are unchanged.
