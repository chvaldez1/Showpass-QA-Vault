---
title: Event-Scoped Tracking Links QA Result
date: 2026-07-29
tags:
  - qa/browser-run
  - tracking-links
status: testing-incomplete
aliases:
  - Event-Scoped Tracking Links Beta QA Result
---

# Event-Scoped Tracking Links QA Result

## Result

> [!bug] One confirmed bug
> The event page shows Affiliate, Checkout Link, and Quick Purchase in the Link Type filter even though those link types cannot be created from this page.

| Result | Count |
| --- | --- |
| Critical bugs | 0 |
| Major bugs | 0 |
| Minor confirmed bugs | 1 |

Copy is not a bug. The user manually selected **Copy**, pasted the URL into a browser, and the linked page worked normally.

Testing is not complete. The named fixture-dependent checks under [[#Not Executed]] remain open, so this report does not claim 100% execution.

Qase coverage was updated after approval. See [[03 Test Cases/Tracking Links/event-scoped-tracking-links-qase-gap-analysis#Qase Sync Result]].

## Confirmed Bug

### BUG-1 — Event page offers Link Type filters that cannot be created there

**Severity:** Minor

**Environment:** Beta

**Data safety:** No data change.

**Starting page:** `/manage/events/super-duper-food-festival-26aug28-1781735621820/tracking-links/`

**Preconditions:**

* Sign in as a venue employee who can manage the event.
* Open the event's **Tracking links** page.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| If the filter sidebar is hidden, select **Toggle filters**. | None | The filter sidebar opens. |
| Select the **Link Type** dropdown. | None | The dropdown contains only **All link types**, **Employee**, and **Custom**. |
| Read every option without selecting one. | None | **Affiliate**, **Checkout Link**, and **Quick Purchase** are not offered on the event page. |

**Actual result:** The dropdown also contains **Affiliate**, **Checkout Link**, and **Quick Purchase**.

**Impact:** The event page advertises filters for link types that cannot be created there. Selecting one can produce an unexplained empty list.

**Cleanup:** Close the dropdown or select **All link types**. No saved data changes.

**Current migrated page — actual result:**

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/09-event-link-type-leaks-venue-wide-options.png]]

**Legacy event page — expected option scope:**

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/10-legacy-event-link-type-options-user-evidence.png]]

**Source confirmation:** The shared migrated filter supplies all user-generated types in `showpass-frontend/packages/core/src/app-contexts/dashboard/features/tracking-links/ui/sidebar/Filters.web.tsx`. The legacy event page restricted the options in `web-app/apps/main/static/src/dashboard/tickets/controllers/EventManage.js`.

## Testing Proof

### Fixed event during creation — Passed

The direct-create modal displayed `SUPER DUPER FOOD FESTIVAL - CODEX TEST` as read-only and did not show a Link Type selector.

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/03-review-link-ready-to-create.png]]

### Link creation — Passed

The success notification and the unique review description appeared together after creation.

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/04-created-success-and-event-list.png]]

### Persistence after reload — Passed

The same tracking-link card remained after a fresh browser reload.

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/05-persisted-after-fresh-reload.png]]

### Custom type and event-only export — Passed

Selecting **Custom** kept the new card visible. The downloaded CSV contained one Venue/Custom row for the selected event and no row from another event.

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/08-custom-filter-keeps-preserved-event-link.png]]

CSV proof: [[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/06-event-scoped-export.csv|Event-scoped export]]

### Public destination — Passed

The new short URL opened the exact selected public event.

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/07-public-link-targets-selected-event.png]]

### Copy — Passed by human verification

The user selected **Copy**, pasted the URL into a browser, and confirmed that the linked page worked normally.

## Preserved Review Data

| Field | Value |
| --- | --- |
| Description | `QA REVIEW EVENT SCOPED LINK 20260729 CODEX 01` |
| Short URL | `https://beta.show.ps/l/39a31eef/` |
| Event | `SUPER DUPER FOOD FESTIVAL - CODEX TEST` |
| Recorded state | 1 visitor, 1 view, 0 purchases, 0 check-ins |
| Cleanup | Do not delete until cleanup is explicitly approved |

The preserved card remains available for independent review:

![[03 Test Cases/Tracking Links/evidence/event-scoped-tracking-links-beta-review-2026-07-29/11-final-preserved-review-state.png]]

## Not Executed

| Check | Reason |
| --- | --- |
| Page-2 pagination | The event has fewer than 21 tracking links. |
| Basic-tier unavailable state | No reusable Basic-tier venue and event fixture was provided. |
| Inaccessible event | No safe event slug inaccessible to the active venue was provided. |
| Missing event-management permission | No reusable restricted employee fixture was provided. |
| Missing Events module | No reusable venue fixture without the Events module was provided. |
| Valid alternate-event URL override | A safe numeric ID for a different accessible event was not available. |
| Forced CSV export failure and retry | No safe deterministic live failure fixture was available. |
