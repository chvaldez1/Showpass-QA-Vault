---
title: Event-Scoped Tracking Links Qase Gap Analysis
date: 2026-07-29
tags:
  - qa/gap-analysis
  - tracking-links
status: pushed-to-qase
---

# Event-Scoped Tracking Links Qase Gap Analysis

## Status

This is the complete source- and Qase-backed gap analysis. The five approved cases were pushed to Qase on 2026-07-29.

The concise Beta bug and execution-proof report is separate:

[[03 Test Cases/Tracking Links/event-scoped-tracking-links-beta-qa-result]]

| Local Draft | Qase Result |
| --- | --- |
| TC-1 | Updated SPT-4236 |
| TC-2 | Updated SPT-4237 |
| TC-3 | Created SPT-5009 |
| TC-4 | Created SPT-5010 |
| TC-5 | Created SPT-5011 |

## Testing Intent

Verify that an authorized venue employee can manage tracking links from one event's dashboard page while the event resolved from the route remains the fixed list, export, and creation context. Prevent cross-event data exposure, incorrect event attribution, access-boundary failures, and regressions to the venue-wide Tracking Links page.

**Criticality:** High-risk organizer data scope; no Critical or Major browser defect was confirmed.

**Confirmed browser defect:** One Minor migration regression. The event page exposes venue-wide-only Link Type filters. See [[03 Test Cases/Tracking Links/event-scoped-tracking-links-beta-qa-result#Confirmed Bug]].

## Proof Target Map

| Proof Target | Required Outcome | Coverage Decision |
| --- | --- | --- |
| PT-1: Event list context stays fixed | Only the route event appears across filters, pagination, reload, and URL manipulation | New TC-3 |
| PT-2: Event direct-create stays fixed | Create intent opens once; event is read-only; Custom type is forced; link persists | New TC-4 |
| PT-3: Access boundaries are enforced | Invalid/inaccessible events, Basic tier, missing permission, and missing module expose no tracking-link data | New TC-5 |
| PT-4: Event export matches the page | CSV contains the route event only and respects supported Link Type filtering | Enhance Qase 4237 with TC-2 |
| PT-5: Venue-wide behavior remains broad | Event filter, multi-event rows, creation types, pagination, reload, and export remain available | Enhance Qase 4236 with TC-1; retain 4239-4242 |

## Declared Scope

| Entry Point | Required Outcomes |
| --- | --- |
| `/manage/events/{slug}/tracking-links/` | Event title, event-only rows, no Event filter, event-appropriate Link Type options, search, Created by Me, pagination, reload, fixed URL scope, CSV |
| `/manage/events/{slug}/tracking-links/?create=true` | Modal opens once, query is removed, event is read-only, type selector is hidden, Custom link persists under the event |
| Invalid or inaccessible event route | Safe error with no list, export, or create controls |
| Basic tier, missing permission, or missing Events module | Unavailable or denied state with no data exposure |
| `/manage/tracking-links/` | Event filter and multi-event behavior remain; all four venue-wide creation types remain |

**Terms:**

- **Event-scoped:** the event is fixed by the event slug in the URL.
- **Created by Me:** when Employee is selected, show only Employee links created by the signed-in employee.
- **Custom:** the visible name for the Venue tracking-link type.
- **Event-management permission (`VP_MANAGE_EVENTS`):** the employee can open and manage Events in the dashboard.
- **Preserve-for-review:** leave the uniquely named test record available until cleanup is explicitly approved.

## Existing Qase Coverage

Read-only review of suite 183 covered Qase IDs 4236, 4237, 4238, 4239, 4240, 4241, 4242, 4800, and 4801.

| Qase ID | Existing Responsibility | Event-Scoped Assessment |
| --- | --- | --- |
| 4236 | Search, Link Type, Created by Me, Event, and clear filters | Partial: no event route, pagination, reload, or immutable event-scope proof |
| 4237 | All/filtered CSV and performance columns | Partial: no event-scoped export or Event A/Event B exclusion |
| 4238 | Employee link created from Web Box Office | Useful fixture path; not event-page management coverage |
| 4239 | Venue-wide Custom link creation | Retain as venue-wide regression |
| 4240 | Venue-wide Affiliate creation | Retain as venue-wide regression |
| 4241 | Venue-wide Checkout Link creation | Retain as venue-wide regression |
| 4242 | Venue-wide Quick Purchase creation | Retain as venue-wide regression |
| 4800 | Card statistics, Copy, edit, and deletion rules | Shared card behavior covered; event placement is not |
| 4801 | Public redirect and attribution | Downstream behavior covered; not event-page scope |

Qase source: [SPT suite 183](https://app.qase.io/project/SPT?search=tracking&search_by=%5B%22title%22%5D&suite=183).

## Source-Backed Behavior

### Backend

- `web-app/apps/analytics/api/venue_based/viewsets.py` — user-generated list scope, search, `/me`, pagination by 20, and filtered CSV action.
- `web-app/apps/analytics/filters.py` — exact Link Type and event-list filtering.
- `web-app/apps/analytics/managers.py` — user-generated tracking-link scope and export venue scope.
- `web-app/apps/analytics/services/generate_tracking_links_export.py` and `apps/analytics/csvs.py` — export columns and values.
- `web-app/apps/analytics/api/venue_based/serializers.py` — active-venue ticket validation and serialized event/type data.
- `web-app/apps/tickets/api/venue_based/viewsets/viewsets.py` — owned/reseller event resolution and safe inaccessible lookup.

### Frontend

- `showpass-frontend/packages/core/src/app-contexts/dashboard/features/tracking-links/ui/pages/EventTrackingLinksPage.web.tsx` — resolves the event slug, shows the event name, applies fixed event scope, hides Event, handles errors and Basic tier, and consumes `create=true`.
- `showpass-frontend/packages/core/src/app-contexts/dashboard/features/tracking-links/utils/build-tracking-link-query-params.ts` — applies fixed event parameters after editable URL parameters.
- `showpass-frontend/packages/core/src/app-contexts/dashboard/features/tracking-links/ui/sidebar/Filters.web.tsx` — supplies Search, Link Type, Created by Me, and the conditional Event filter. It currently exposes all user-generated Link Types in event mode.
- `showpass-frontend/packages/core/src/app-contexts/dashboard/features/tracking-links/ui/header/HeaderActions.web.tsx` — sends the fixed event scope to CSV export.
- `showpass-frontend/packages/core/src/app-contexts/dashboard/features/tracking-links/ui/components/CreateEditTrackingLinkModal.web.tsx` and `utils/build-tracking-link-payload.ts` — display the event read-only, hide type selection, and force Custom/Venue with the resolved event.
- `showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts` — native event component and permission boundary.
- `web-app/apps/main/static/src/dashboard/tickets/controllers/EventManage.js` — legacy event page restricted Link Type to Employee and Custom.

### Automation

`showpass-playwright/tests/web/checkout/tracking-links/` covers public tracking-link checkout and attribution. No existing dashboard Playwright test was found for event-scoped list, export, create, or access behavior.

## Coverage Gaps

| Gap | Risk | Decision |
| --- | --- | --- |
| No event-route title and event-only list proof | Wrong event context or cross-event exposure | New TC-3 |
| No proof that URL event filters cannot override the slug | Cross-event data exposure | New TC-3 |
| No event-scoped search, type, Created by Me, pagination, or reload case | Shared controls can drop fixed scope | New TC-3 |
| No migrated Link Type option-parity assertion | Event page exposes venue-wide-only choices | New TC-3; confirmed Minor browser regression |
| No event-only CSV proof | Export may disagree with the page | Enhance 4237 with TC-2 |
| No one-time `create=true` lifecycle or fixed fields | Modal loop or wrong-event link | New TC-4 |
| No invalid/inaccessible, Basic, missing-module, or missing-permission case | Unsafe access or confusing failure | New TC-5 |
| Venue-wide case lacks explicit multi-event, pagination, and reload assertions | Broad workflow may regress | Enhance 4236 with TC-1 |

## Risk Areas

- Every list, filter, pagination, reload, and export action must retain the event fixed by the route.
- Event-mode Link Type should remain All, Employee, and Custom; Affiliate, Checkout Link, and Quick Purchase belong to the venue-wide workflow.
- Created by Me switches to the current employee's Employee links. Search and Created by Me export behavior remain open product questions.
- The list and export may disagree for seller-created links because their venue scopes differ in source.
- `create=true` must not open an unscoped modal while event resolution is loading or failing.
- Dashboard event-scoped behavior has no current Playwright protection.

## Suggested Qase-Ready Cases

### TC-1: Update Qase 4236 — Dashboard - Tracking Links - Filter tracking links

**Title:** Dashboard - Tracking Links - Filter tracking links

**Change classification:** Enhance. Preserve the existing title, FilterType values, Event filter, Created by Me behavior, and clear-filter assertion. Add explicit multi-event baseline, Pagination, and Reload values.

**Description:** Verify the venue-wide Tracking Links page displays links from multiple events and applies search, Link Type, employee ownership, Event, clear, pagination, and reload behavior.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* A venue employee is signed in to a Standard or Premium venue with event-management permission.
* More than 20 tracking links exist across at least two events and all five user-generated Link Types.
* Employee links exist for the signed-in employee and another employee.
* Record one known description, one event name, the expected first card for each Link Type, and the expected first card on page 2.

**Postconditions:** No tracking-link data is changed.

**Tags:** tracking-links, dashboard, search-filters

**Parameters:**

FilterType: Search, LinkTypeEmployee, LinkTypeCustom, LinkTypeAffiliate, LinkTypeCheckoutLink, LinkTypeQuickPurchase, Event, ClearFilters, Pagination, Reload

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open `/manage/tracking-links/`. | Standard or Premium venue | The venue-wide page loads, the Event filter is available, and links from more than one event can be displayed. |
| For `Search`, enter the recorded description or employee username in **Search**. | Recorded search value | Only links matching the description, username, or slug appear. |
| For a `LinkType...` value, open **Link Type** and select its matching visible option. | Employee, Custom, Affiliate, Checkout Link, or Quick Purchase | Only links with the selected Link Type appear. |
| For `LinkTypeEmployee`, select **Created by Me**. | Signed-in employee | Created by Me is available only for Employee and shows only this employee's Employee links. |
| For `Event`, open **Event** and select the recorded event. | Recorded event | Only links for the selected event appear. |
| For `ClearFilters`, apply the recorded Event filter and then select **Clear all**. | Recorded event | The Event filter remains available and the unfiltered multi-event list returns. |
| For `Pagination`, leave all filters clear and select the next-page control. | Recorded first card on page 2 | Page 2 opens with the expected next set of venue-wide links. |
| For `Reload`, leave all filters clear and reload the browser. | None | The venue-wide page remains usable, the Event filter remains available, and no tracking-link data changes. |

**Data safety:** No data change.

### TC-2: Update Qase 4237 — Dashboard - Tracking Links - Export tracking links CSV

**Title:** Dashboard - Tracking Links - Export tracking links CSV

**Change classification:** Enhance. Preserve `Export: All, Filtered`, the existing CSV columns, and venue-wide responsibility. Add `TrackingLinksScope`.

**Description:** Verify venue-wide and event-scoped Tracking Links pages export rows allowed by the supported Link Type and Event filters, with event-scoped output restricted to the event in the route.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* A venue employee is signed in to a Standard or Premium venue with event-management permission.
* Record Event A's slug, exact name, and one tracking-link description.
* Record Event B's exact name and one tracking-link description.
* Both events have user-generated tracking links with performance data.
* Record one Link Type that produces a smaller result set.
* Do not use Search or Created by Me until the open export questions are resolved.

**Postconditions:** The local CSV may be removed after evidence is recorded; Showpass data is unchanged.

**Tags:** tracking-links, dashboard, reports

**Parameters:**

TrackingLinksScope: VenueWide, EventScoped
Export: All, Filtered

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the route for the current `TrackingLinksScope`. | VenueWide: `/manage/tracking-links/`; EventScoped: `/manage/events/{event-a-slug}/tracking-links/` | VenueWide shows Event. EventScoped shows Event A in the heading and no Event filter. |
| For `Filtered` only, open **Link Type** and select the recorded Link Type. | Recorded Link Type | Every visible card has the selected type. |
| Select **Export CSV**. | None | One CSV downloads successfully. |
| Open the downloaded CSV. | Latest tracking-links CSV | The file contains owner venue, venue, event, referred by user, redirect URL, tracking link, Link Type, visitors, views, description, tickets purchased, checked in, organizer charges, tax, and gross revenue columns with accurate data. |
| Read the Event column for every row. | Event A and Event B names | EventScoped contains Event A only. VenueWide may contain both unless a filter excludes one. |
| For `Filtered` only, read the Link Type column for every row. | Recorded Link Type | Every exported row has the selected type. |

**Data safety:** No Showpass data change; local download only.

### TC-3: Dashboard - Tracking Links - Keep the event list scoped to the route event

**Target:** Create in suite 183.

**Description:** Verify the event Tracking Links page keeps Event A fixed across visible controls, pagination, URL manipulation, and browser reload.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* A venue employee is signed in to a Standard or Premium venue with event-management permission.
* Record Event A's slug, name, numeric ID, page-2 first card, and two distinct tracking-link descriptions.
* Record Event B's name, numeric ID, and one distinct tracking-link description.
* Event A has more than 20 Employee and Custom links.
* Event A has Employee links created by the signed-in employee and another employee.

**Postconditions:** No tracking-link data is changed.

**Tags:** tracking-links, dashboard, employee-permissions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open `/manage/events/{event-a-slug}/tracking-links/`. | Event A slug | The current event dashboard loads directly, the URL remains on this route, and the heading contains Event A. |
| If the filter sidebar is hidden, select **Toggle filters**. | None | Search and Link Type are visible; Event is absent. |
| Open **Link Type** and read every option. | None | Only All link types, Employee, and Custom appear. Affiliate, Checkout Link, and Quick Purchase are absent. |
| Close Link Type and review every card on page 1. | Event A and Event B names | Every card belongs to Event A. |
| Select the next-page control. | Recorded page-2 first card | Page 2 opens with Event A cards only. |
| Return to page 1 and enter Event A's description in **Search**. | Event A description | The matching Event A card appears. |
| Clear **Search**. | None | Event A's unfiltered page-1 list returns. |
| Enter Event B's description in **Search**. | Event B description | No Event B card appears. |
| Clear **Search**. | None | Event A's unfiltered page-1 list returns. |
| Open **Link Type** and select **Employee**. | None | Only Event A Employee links appear and Created by Me becomes available. |
| Select **Created by Me**. | Signed-in employee | Only Event A Employee links created by this employee appear. |
| Open **Link Type** and select **Custom**. | None | Only Event A Custom links appear and Created by Me disappears. |
| Add `?event__in={event-b-id}` to the current URL and load it. | Event B numeric ID | Event A remains in the heading and no Event B card appears. |
| Reload the browser. | None | Event A remains fixed and the Event filter remains absent. |

**Data safety:** No data change.

### TC-4: Dashboard - Tracking Links - Create a fixed Custom link from the event route

**Target:** Create in suite 183.

**Description:** Verify the event-route create intent opens once, fixes the selected event and Custom type, and saves the new link into the same event list.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* A venue employee is signed in to a Standard or Premium venue with event-management permission.
* Event A has at least one public ticket type.
* Record Event A's slug and exact public event name.
* Use a unique description containing the current date and QA employee initials.

**Postconditions:**

* Classify the link as Cleanup-required or Preserve-for-review before execution.
* If Cleanup-required, delete only the created link after verifying it has no completed purchases, then reload and verify it is gone.
* If Preserve-for-review, record its description and short URL and do not delete it until cleanup is explicitly approved.

**Tags:** tracking-links, dashboard, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open `/manage/events/{event-a-slug}/tracking-links/?create=true`. | Event A slug | Create Tracking Link opens once and `create=true` disappears from the URL. |
| Read the Event field and creation controls. | Event A name | Event A is read-only and no Link Type selector is available. |
| Select **Cancel** and wait five seconds. | None | The modal stays closed. |
| Select **Create tracking link** on the page. | None | A new modal opens with Event A still fixed and no Link Type selector. |
| Enter the unique description. | Unique description | The description is accepted. |
| Select **Create tracking link** in the modal. | None | A success message appears and one card with the unique description appears. |
| Reload the browser. | None | The same card remains and no duplicate appears. |
| Open **Link Type** and select **Custom**. | None | The new card remains visible. |
| Record the short URL displayed on the new card. | Unique description | One short URL is visible. |
| Open a private browser window and enter the recorded short URL. | Recorded short URL | The public page opens. |
| Read the public event name. | Event A public name | The page shows Event A. |

**Data safety:** Changes isolated test data; follow the declared cleanup or preservation rule.

### TC-5: Dashboard - Tracking Links - Enforce event page access boundaries

**Target:** Create in suite 183.

**Description:** Verify the event Tracking Links route exposes neither list data nor creation controls when event access, venue plan, Events module, or employee permission does not allow access.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The fixture owner supplies the exact account, venue, and slug for each AccessState. Do not change plans, modules, permissions, or event ownership.
* InvalidSlug uses the current authorized venue and a documented nonexistent slug.
* InaccessibleSlug uses an event the active venue does not own and cannot resell.
* BasicTier uses an existing Basic venue with an otherwise authorized employee.
* MissingManageEvents uses an existing Standard/Premium employee without event-management permission.
* MissingEventsModule uses an existing Standard/Premium venue without the Events module.

**Postconditions:** No data is changed.

**Tags:** tracking-links, dashboard, employee-permissions

**Parameters:**

AccessState: InvalidSlug, InaccessibleSlug, BasicTier, MissingManageEvents, MissingEventsModule

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in with the supplied account and select its supplied venue. | AccessState account and venue | The intended existing fixture is active. |
| Open `/manage/events/{slug}/tracking-links/` using the supplied slug. | AccessState slug | Invalid/inaccessible events show a safe load error; Basic shows unavailable; missing permission/module prevents access. |
| Look for tracking-link cards. | None | No tracking-link card or performance data is visible. |
| Look for **Export CSV** and **Create tracking link**. | None | Neither action is available. |

**Data safety:** No data change.

## Suggested Automation

| Priority | Candidate | Assertions | Status |
| --- | --- | --- | --- |
| High | Event list scope and URL override | Event title, absent Event filter, every page's event IDs, Event B exclusion after URL change and reload | Proposed |
| High | Event direct-create lifecycle | One modal, query removal, fixed event, hidden type, Custom payload/result, persistence, cleanup or preservation | Proposed |
| High | Event-scoped CSV | Parse the download; Event A only; active Link Type respected | Proposed |
| Medium | Access matrix | Basic, missing permission/module, invalid slug, inaccessible slug | Proposed |
| Medium | Export failure recovery | Failed export notification and successful retry | Proposed |
| Medium | Venue-wide smoke | Event filter, multi-event rows, four creation types, filtered export | Proposed |

Prefer new dashboard tests in `showpass-playwright` instead of extending the existing public checkout tracking-link runner.

## Open Questions

1. Should Export CSV honor Search and Created by Me? Current source does not apply both in the same way as the visible list.
2. Should an owner venue's export include seller-created links visible in the list? The list and export use different venue-scope rules.

These questions block claiming complete list/export parity. They do not block TC-3 through TC-5.

## Qase Sync Result

The approved five-case batch is complete and verified in suite 183:

- SPT-4236 now includes Pagination and Reload while preserving its existing filter values, title, priority, type, behavior, and layer.
- SPT-4237 now covers VenueWide and EventScoped exports while preserving Export: All and Filtered, its title, priority, type, behavior, and layer.
- SPT-5009 covers fixed event-list scope.
- SPT-5010 covers fixed event-route Custom creation.
- SPT-5011 covers the five access states.
- Qase 4239-4242 and 4800-4801 were not changed.
