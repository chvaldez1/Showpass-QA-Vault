---
title: New Check In — beta initial smoke — 2026-10-22
date: 2026-10-22
tags:
  - qa/execution
  - check-in
status: Initial named-record smoke finished; broader release decision blocked by unexecuted coverage
---

# New Check In — beta initial smoke

## Result

**The initial checks below passed on the new page. No Critical or Major defect was confirmed in those executed flows.** This is not full release clearance: rejected ticket states, allowance/time boundaries, permission isolation and race/retry paths were not exercised.

* **Environment/actor:** beta.showpass.com, existing Codex browser, Christian Valdez. The Dashboard organization menu showed **Organization for system gateway charge api**; the effective permission set was not independently enumerated. Accepted actions prove this session could perform them, not that restricted employees are denied.
* **Entry:** Dashboard → Check In → Try the new experience. The outer /dashboard/events/check-in/ page embedded **/manage/entry/check-in/?isLegacy=true**, with the new Scan setup / Item selection / Presets interface. The new-version banner remained after a full reload. No legacy Check In admission was executed.
* **Named scope:** Ta event for system gateway (charge api); Ta recurring event for system gateway (charge api); Fancy t-shirt. Intent: admit/pick up the selected eligible item once, reject duplicates and excluded-event barcodes, preserve correct counts and saved history, and keep unrelated items unchanged.
* **Run/data boundary:** only existing User ForTesting items belonging to the supplied records were changed. Retention is **Preserve-for-review**. No purchases, payment refunds, transfers, configuration edits, preset saves, exports or notification jobs were performed. Product Return undoes a pickup; it is not a financial refund.
* **Views/time:** functional execution at 1440×900; the temporary override was reset at the end. Dates shown in MT and action times below are **America/Edmonton (MDT), 2026-10-22**. The events' existing November 2029 dates were retained. No clock or scanning-window setting was changed.
* **Sources:** [[03 Test Cases/Check In/check-in-qase-test-cases]], [[06 Prompts/Interactive Browser Release Testing]], canonical quality standard, handbook Check In and Product playbooks. Backend **bda0dd85f003b598c587c806f0df93a9e2eb86d6**; frontend **bda3539bbab30d0215a2156d2153b4ed8b041ba6**. Backend ticket scan/History validation and the new scanner/history/query-builder hooks informed expected behavior; those local revisions are not proof of the deployed build SHA.
* **Qase:** this is an adapted execution of the business behaviors on the new page. Existing Qase definitions have legacy-page prerequisites; no formal Qase execution result or case definition was changed by this run.

**Observation requiring follow-up:** Previous item rows remained briefly visible while a changed selection loaded, including the Tickets → Products change. I waited for replacement rows before using Scan. Whether actions on a stale row are blocked is **unverified**; no stale-row action was submitted. This is not a reproduced wrong-item admission.

**Release recommendation:** Decision blocked by the named unexecuted validation, boundary, permission and race/recovery evidence below. The listed initial smoke results remain individually Passed.

## Confirmed Bugs

No Critical or Major bug confirmed in the executed scope. Dropdown accessibility and loading-state observations were not independently reproduced as product defects; no physical-device or screen-reader result is claimed.

## Testing Proof

| Check | Result | Observed proof |
| --- | --- | --- |
| Reach the new page in the current venue | Passed | Preview opt-in loaded the new embedded route; full reload retained the new-version banner. |
| Single-day event barcode admission | Passed | ga ticket **7EHY0UXXJ**: Issued + no History → Scanned at **14:09:45**. Checked In **2 → 3 / 12663**, Remaining **12661 → 12660**. Refresh showed one saved Scanned row; full reload/reselection retained the event count. |
| Single-day duplicate rejection | Passed | Same barcode returned **Ticket has already been scanned**. Count stayed 3; saved History still had exactly one Scanned entry. |
| Recurring parent and occurrence selection | Passed for one occurrence | Parent showed Nov 15/16/17, 2029 occurrences. Kept only Nov 15 ga checked; the other two types were unchecked. The selected scope had **0 / 3250** checked in. |
| Recurring row Scan and duplicate barcode | Passed | **45WVX71IX**, confirmed in Ticket Details as Nov 15, 2029 21:00: row Scan saved one admission at **14:12:58**. Count **0 → 1 / 3250**, Remaining **3250 → 3249**. Same barcode rejected on repeat; fresh Item History had only one Scanned entry. |
| Reject a ticket outside the selected event | Passed | Unused single-day control **2EJBSOVHO** submitted under recurring-only selection returned **Ticket matching code not found**. Recurring count stayed 0 before its own valid admission. After a full reload, the control remained Issued with no saved History. |
| Product-only barcode pickup | Passed | Scan setup showed **Events 0 / Ticket types 0**, Fancy t-shirt → **T-shirt all sizes**. **I1VXY1QOA**: Issued + no History → Product scanned! at **14:14:52**. Count **0 → 1 / 22190**, Remaining **22190 → 22189**. |
| Duplicate product pickup | Passed | Repeat barcode returned **Product has already been scanned**, with no extra pickup/history and unchanged count. |
| Product Return and row re-scan | Passed | Return saved **14:16:05**, count restored **1 → 0**, Remaining 22190; refreshed History showed Scanned + Returned. Row Scan saved **14:16:43**, restoring count **1 / 22190**. Final refreshed History had exactly **Scanned → Returned → Scanned**, net one pickup. |
| Search without admission | Passed | After full reload, typed control barcode without Enter. It filtered to the correct unused item without a new admission. |
| Preserve unrelated items | Passed for observed controls only | The explicit single-day control remained Issued with empty History. Other visible product/recurring rows retained unused counts; no complete project-wide comparison was performed. |

Evidence below records the route, action, expectation, observed result and capture time. Screenshots supplement the refreshed Item History/count checks above. Stored contact details belong to the selected test records, not unrelated customers.

> [!example]- Single-day event — screenshots
> **14:08:59 MDT — /dashboard/events/check-in/ → new embedded Check In:** Selected single-day event before mutation; starting count 2/12663 and unused test groups.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/01-single-event-baseline.png]]
>
> **14:09:34 MDT — /dashboard/events/check-in/ → new embedded Check In:** Ticket Details before submission; expected unused ticket, observed Issued and No history found.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/02-single-ticket-before.png]]
>
> **14:09:51 MDT — /dashboard/events/check-in/ → new embedded Check In:** One barcode submission; expected one admission, observed Ticket scanned!, Scanned and count 3/12663.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/03-single-ticket-scan-result.png]]
>
> **14:10:17 MDT — /dashboard/events/check-in/ → new embedded Check In:** Repeated barcode; expected rejection, observed Ticket has already been scanned with unchanged count.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/04-single-ticket-duplicate.png]]
>
> **14:10:39 MDT — /dashboard/events/check-in/ → new embedded Check In:** After Refresh and reopening Item History; expected one saved admission, observed Scanned at 14:09:45.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/05-single-ticket-persisted-history.png]]
>

> [!example]- Recurring event and event isolation — screenshots
> **14:11:55 MDT — /dashboard/events/check-in/ → new embedded Check In:** Scan setup; expected only first occurrence ticket type active, observed Nov 15 checked and Nov 16/17 unchecked.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/06-recurring-occurrence-selection.png]]
>
> **14:12:36 MDT — /dashboard/events/check-in/ → new embedded Check In:** Single-day control barcode under recurring selection; expected no admission, observed Ticket matching code not found and 0/3250.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/07-wrong-event-rejected.png]]
>
> **14:12:51 MDT — /dashboard/events/check-in/ → new embedded Check In:** Ticket Details; expected Nov 15 occurrence and unused ticket, observed matching date, Issued and empty History.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/08-recurring-ticket-before.png]]
>
> **14:13:04 MDT — /dashboard/events/check-in/ → new embedded Check In:** Row Scan; expected one admission, observed Ticket scanned! and 1/3250.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/09-recurring-scan-result.png]]
>
> **14:13:22 MDT — /dashboard/events/check-in/ → new embedded Check In:** Repeated recurring barcode; expected rejection, observed already-scanned error without another admission.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/10-recurring-duplicate.png]]
>
> **14:13:29 MDT — /dashboard/events/check-in/ → new embedded Check In:** After Refresh; expected one saved recurring admission, observed only Scanned at 14:12:58.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/11-recurring-persisted-history.png]]
>

> [!example]- Product pickup, Return and re-scan — screenshots
> **14:13:58 MDT — /dashboard/events/check-in/ → new embedded Check In:** Scan setup; expected product-only selection, observed Events 0, Ticket types 0 and T-shirt all sizes checked.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/12-product-only-selection.png]]
>
> **14:14:43 MDT — /dashboard/events/check-in/ → new embedded Check In:** Product Details before pickup; expected correct variant and no pickup, observed Fancy t-shirt / T-shirt all sizes and empty History.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/13-product-before.png]]
>
> **14:15:00 MDT — /dashboard/events/check-in/ → new embedded Check In:** Typed product barcode; expected successful pickup without events, observed Product scanned! and 1/22190.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/14-product-barcode-result.png]]
>
> **14:15:21 MDT — /dashboard/events/check-in/ → new embedded Check In:** Repeated product barcode; expected rejection, observed Product has already been scanned and unchanged count.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/15-product-duplicate.png]]
>
> **14:15:41 MDT — /dashboard/events/check-in/ → new embedded Check In:** After Refresh; expected one saved pickup, observed Scanned at 14:14:52.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/16-product-persisted-history.png]]
>
> **14:16:14 MDT — /dashboard/events/check-in/ → new embedded Check In:** Return on this run’s item; expected pickup reversed, observed Product returned! and 0/22190.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/17-product-return-result.png]]
>
> **14:16:37 MDT — /dashboard/events/check-in/ → new embedded Check In:** After Refresh; expected retained audit trail, observed Returned at 14:16:05 plus original Scanned.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/18-product-return-persisted.png]]
>
> **14:16:50 MDT — /dashboard/events/check-in/ → new embedded Check In:** Scan button after Return; expected one new authorized pickup, observed Product scanned! and net 1/22190.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/19-product-row-rescan.png]]
>
> **14:17:11 MDT — /dashboard/events/check-in/ → new embedded Check In:** After final Refresh; expected exact scan/return/re-scan sequence, observed three entries at 14:14:52 / 14:16:05 / 14:16:43.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/20-product-final-history.png]]
>

> [!example]- Fresh reload and unchanged control — screenshots
> **14:19:33 MDT — /dashboard/events/check-in/ → new embedded Check In:** After full browser reload and reselecting the single-day event; expected no admission from wrong-event rejection or search, observed Issued and No history found for the control.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/21-control-ticket-unchanged.png]]
>

> [!example]- Final browser state — 14:21:57 MDT
> /dashboard/events/check-in/ → new embedded page. Temporary search and viewport override cleared; single-day count remains 3/12663 and the unused control is still Issued.
> ![[99 Archive/QA Evidence/Check In/check-in-beta-new-page-smoke-2026-10-22/22-final-review-state.png]]

## Preserved Review Data

All three changed items are **Scanned** at the end; the product has one net pickup after its Return/re-scan. Histories are retained. Search the appropriate selected scope by barcode **without pressing Enter**, expand the item, then use **Item History** to review it.

| Record | Barcode | Retained result |
| --- | --- | --- |
| Ta event for system gateway (charge api) → ga → User ForTesting | 7EHY0UXXJ | One Scanned entry, 14:09:45 |
| Ta recurring event for system gateway (charge api) → Nov 15, 2029 → ga → User ForTesting | 45WVX71IX | One Scanned entry, 14:12:58 |
| Fancy t-shirt → T-shirt all sizes → User ForTesting | I1VXY1QOA | Scanned 14:14:52; Returned 14:16:05; Scanned 14:16:43; net one pickup |
| Untouched single-day control → ga → User ForTesting | 2EJBSOVHO | Issued, empty History; wrong-event attempt rejected |

The browser is left on the new Check In page in the same venue; the viewport override and temporary search were cleared. Full reload clears the page's recent **My History** panel; the saved **Item History** remains available. No cleanup was performed after the run because these admissions/pickup are retained for review. A permitted owner can later Return only the two recorded ticket admissions and one net product pickup if reset is desired; do not refund purchases or erase histories.

## Not Executed

| Remaining check | Status / exact limit |
| --- | --- |
| Refunded, voided, transfer-pending and completed-transfer/resale rejection | Deferred: no such saved-state items were selected/prepared in this initial run; no financial or ownership changes authorized for setup. |
| Multi-scan allowance, scan-window edges, venue/event timezone differences and DST | Deferred: observed items use the ordinary single-use flow; no dedicated limit/boundary setup or clock changes. Only displayed MT dates were checked. |
| Recurring Nov 16/17 admissions and cross-occurrence barcode rejection | Deferred: these types were deliberately unchecked; one Nov 15 admission was the recurring smoke target. |
| Scan while selection is changing / stale row actions | Unverified: previous rows were briefly visible during loading, but no stale-row Scan/Return was submitted. Needs a controlled check of scope and saved item history. |
| Simultaneous scans, last-use contention and lost-response recovery | Blocked for this run: no second controlled employee/session or response-loss setup; sequential duplicates do not prove concurrency/retry safety. |
| Memberships and enforced membership capacity | Outside this named events/products run; no active/inactive member or capacity fixture selected. |
| Restricted permissions, revoked access and other-organization isolation | Not executed: only the current employee/session and supplied organization were used. |
| Shared order/customer codes, ticket packages, bulk Scan, presets, date-range/past searches and exports | Deferred: separate entry paths and side effects beyond the initial individual-item smoke. No bulk mutation, preset save or export job was triggered. |
| Physical barcode scanner, camera, NFC and full mobile UX | Manual-only / not executed: typed barcode and desktop row controls were tested; restoring the initial viewport is not a mobile/device pass. |
| Purchase, refunds, service-fee accounting, stock resale and reports | Outside admission/pickup execution. No payment/fee or financial-correctness result is claimed. |
