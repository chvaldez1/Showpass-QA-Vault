---
title: SHOWPASS-LIVE-FKS - Boodang transaction totals timeout
date: 2026-10-26
tags:
  - qa/sentry
  - qa/transactions
aliases:
  - Sentry 7813154303
status: Database timeout confirmed; manual reproduction not run
---

# SHOWPASS-LIVE-FKS — Boodang transaction totals timeout

## Overview

- **Confirmed cause of this failure:** PostgreSQL cancelled the transaction-totals query after approximately **25 seconds** because it exceeded its statement time limit.
- **Where:** **Boodang → Transactions → Selection totals**, with no filters applied. The recorded employee is **Todd Showpass 👮‍♂️**.
- **What the query was doing:** Adding up all eligible invoice items for Boodang across all dates. No date, Event, employee, Product or Membership filter reduced that selection.
- **Code issue found:** The service asks to use a reporting replica, but the SQL helper directly opens the default database connection. Sentry confirms this execution used `default`. The helper bypasses the intended replica routing.
- **What remains unknown:** Whether the query was slow mainly because of data volume, its execution plan, database load, or waiting. There is no query plan or database wait evidence here. The routing issue is established; its share of the 25-second delay is not.
- **Impact:** This request could not return the totals. The employee's final screen and the separate transaction-list request were not observed. This is not evidence of incorrect charges or damaged financial records.

[Sentry issue](https://showpass.sentry.io/issues/7813154303/) · [Recorded event](https://showpass.sentry.io/organizations/showpass/issues/7813154303/events/bdf5cf63dbf6416cbdbaec92cadbe32c/)

**Read this note:** The cause and proof are in [Recorded evidence](#recorded-evidence) and [Why the code matters](#why-the-code-matters). The optional manual attempt below uses the requested walkthrough format. It has not been run.

## Test index

- [TC-01 — Open Boodang transaction totals without filters](#tc-01-open-boodang-transaction-totals-without-filters)
- [Results and remaining proof](#results)

## Setup and boundaries

- **Environment/date:** Original failure on production, release `36.36.0`, October 26, 2026 at **9:01:10 a.m. MDT** / `2026-10-26T15:01:10.134326Z`. The current deployed build has not been checked.
- **Organizer:** **Boodang**, venue ID `42`. Use its existing authorized session or an approved equivalent test setup; a small unrelated Organizer does not represent the same reporting workload.
- **Employee:** The captured employment object says **Todd Showpass 👮‍♂️**. It does not supply an employee account ID. The current account and employment have not been verified, and no impersonation was performed. Another employee can reach the same query if permitted to view the same Organizer's totals; the captured request has no employee filter.
- **Access:** The employee must already be able to open Transactions and see totals. The backend uses `VP_VIEW_TRANSACTION_TOTALS` when `enable_transaction_totals_permission` is active, otherwise `VP_MANAGE_FINANCIALS`, with its existing unrestricted-employee/PIN rules. The event establishes `totals_visible=True`, not which permission or unrestricted state granted access. Do not add permissions or change flags for this check.
- **Page:** The recorded request came from the newer Transactions view embedded in the older dashboard. Its visible totals panel is labelled **Selection totals**. The recorded page address is retained in the evidence below, outside manual steps.
- **Starting state:** Use your own authorized session. The steps below show how to clear its transaction filters and display totals. Note your original filter values and whether totals were checked if you want to restore those browser preferences afterward. You do not need to impersonate Todd if your account can already access Boodang and its totals. If you cannot access Boodang or its totals, stop and report that exact blocker.
- **Data safety:** **No data change to transactions, orders or payments.** The steps change only your browser's filter/display preferences, which can be saved for the session or account on this browser. The totals query only reads financial records. An all-history read can still be expensive; observe one unfiltered load and do not keep retrying. No live application request or impersonation was executed by this investigation.
- **Finishing point:** Observe one totals load and stop. Do not change prices, create a sale, refund, export, change database settings, switch the reporting backend, or repeatedly reload to force the timeout.

<a id="tc-01-open-boodang-transaction-totals-without-filters"></a>
## TC-01 — Open Boodang transaction totals without filters

**What this tests:** An authorized employee can view the Organizer's transaction totals when no filters limit the selection.

**Start here:** Signed in to production with your own authorized account. Start in the Organizer dashboard. You must be able to select **Boodang** and view its transaction totals. Do not impersonate Todd just to follow these steps. If your account cannot access Boodang or its totals, stop and report which access is missing.

**The check:** Can Boodang's **Selection totals** finish loading when no filters limit the transactions? No purchase, refund or transaction edit is needed.

### Steps

<a id="tc-01-step-1"></a>
1. **Select Boodang in the Organizer selector, then select Transactions in the dashboard navigation.** Open the Organizer's main Transactions screen, rather than Transactions inside a particular Event.

   **Expected:** **Boodang** is the selected Organizer and the page title is **Transactions**. You are not limited to one Event's transactions.

   **Actual — Not run:** The recorded request is for Boodang's main Transactions page. The current page and your access have not been inspected.

   **Stop here if:** Boodang is not available, Transactions is denied, or the page clearly belongs to another Organizer. Report that result instead of changing permissions.

<a id="tc-01-step-2"></a>
2. **Open the filters panel.** It may already be open on the right. If it is closed, select the funnel-shaped button in the page header; its tooltip is **Filters**. If the panel shows an active-filter count and **Clear**, select **Clear** once.

   **Expected:** **Start date**, **End date**, and **Event** have no selected value. No other transaction filter is selected. The active-filter badge and **Clear** disappear when no filters remain. If there was no **Clear** button to begin with, leave the empty fields as they are.

   **Actual — Not run:** The Filters button, Clear action and field names were verified in source. No browser filter was changed by this investigation.

   **Do not add a date range or choose an Event:** This attempt needs the same unfiltered selection as the recorded request.

<a id="tc-01-step-3"></a>
3. **In the filters panel, make sure Show selection totals is checked.** If it is already checked, leave it checked. At the top of the transaction list, select the **Selection totals** heading only if its panel is collapsed.

   **Expected:** The totals panel is shown. It can display **Net sales**, **Gross revenue**, **Taxes**, and **Refunds**, plus **Organizer fees** when applicable.

   **Actual — Not run:** Source confirms the checkbox and panel labels. No display preference was changed by this investigation.

   **Stop here if:** The checkbox and totals panel are both unavailable. Report **“Boodang is accessible, but I cannot show Selection totals.”** Do not add permissions or change rollout settings.

<a id="tc-01-step-4"></a>
4. **Allow up to 30 seconds for that unfiltered totals load. Do not refresh, change a filter or toggle totals again.** Count from the last action that started the load: opening Transactions if it was already unfiltered with totals shown, selecting Clear, or checking Show selection totals. If amounts or an error are already visible, record them now without another request.

   **Expected:** Amounts appear under **Net sales**, **Gross revenue**, **Taxes**, and **Refunds**. The panel finishes loading. Zero can be a valid displayed amount; a blank panel is not the same as a displayed zero.

   **Actual — Not run:** The original server query timed out after approximately 25 seconds. The 30-second observation window is a practical limit for this attempt, not a guaranteed application response time. We do not know which visible error, blank state or loading indicator accompanied the original timeout.

   **Report exactly one outcome:** **“Totals loaded in about __ seconds”**, **“Still loading/blank after 30 seconds”**, **“Error: __”**, or the access/page mismatch from an earlier step. Also give the local time and say whether the transaction rows underneath appeared. If amounts load, this attempt did not reproduce the timeout. If they fail, matching server evidence is still needed to establish the same cause.

**Finishing point:** Stop after recording that result. Do not repeatedly retry, export, purchase, refund, or edit a transaction. No Sentry or database inspection is needed from you for this first check.

**Evidence:** No screenshot is available because this walkthrough has not been run. The recorded Sentry request, SQL and timestamps are the evidence for the confirmed server timeout.

## Postconditions and cleanup

No Showpass records, employee sessions, filters, preferences or reporting flags were changed. No temporary exports or screenshots were created. There is no test data to restore. The investigation used read-only Sentry API access and local source review. If the user later runs these steps, only their browser filter/display preferences may need restoring to the values they noted; no transaction record cleanup is required.

## Recorded evidence

| Item | Recorded value |
| --- | --- |
| Issue | `SHOWPASS-LIVE-FKS`, unresolved, Sentry priority High |
| Occurrences | One when read; no claim of a broad outage |
| Exceptions | PostgreSQL `QueryCanceled`, surfaced by Django as `OperationalError: canceling statement due to statement timeout` |
| Request | GET `/api/venue/42/financials/invoices/stats/` |
| Request query | Empty; captured `query_params={}`, `date_data={}`, `selection_filters={}` |
| Referring page | `https://www.showpass.com/manage/box-office/transactions/?isLegacy=true` |
| Organizer / employee | `<Venue: Boodang>` / `<VenueEmployment: Todd Showpass 👮‍♂️>` |
| Branches used | `totals_visible=True`; `use_clickhouse=False` |
| Database alias | `default`, database process `1813350` |
| SQL began | `2026-10-26T15:00:45.087184+00:00` |
| Failed execution breadcrumb | `2026-10-26T15:01:10.090019Z` |
| Observed interval | **25.002835 seconds** between those recorded times |
| Runtime | Release `36.36.0`, Django `5.2.18`, venue-based web-server pod |
| Correlation | Datadog trace `6adf6b1c00000000998ccd90ecf10c2f`, span `3147ac319bcc9898` |

The captured statement sums `final_amount_stat`, `amount_earned_stat`, Organizer charges, taxes, kickbacks and refunds from `financials_invoiceitem`. Its restrictions are Boodang's `venue_id=42`, the included payment methods, and `is_sub_ticket=false`. There is **no date or event condition**. Aggregate `FILTER` clauses choose the appropriate invoice-item types for each total. There is no join or list-page limit in this captured statement.

This proves an all-history aggregate over eligible Boodang items. It does not prove a full table scan, the number of rows read, missing indexes or blocked execution; those require a query plan and database evidence.

## Why the code matters

1. **Unfiltered totals have no time boundary.** The invoice-stats handler validates the supplied filters, then passes the empty selection to `TransactionStatisticsService.summarize`. The query builder adds a date restriction only when one was supplied. Opening all-history totals can therefore require adding up a large selection.
2. **The PostgreSQL helper bypasses the requested replica connection.** Both the handler and reporting service enter `use_replica_primary_for_read`. That context controls the application's database router. The PostgreSQL branch then calls `retrieve_from_query`, which uses `django.db.connection.cursor()` directly. In the installed Django source, `connection` is explicitly a proxy for `DEFAULT_DB_ALIAS`. It does not ask the router which read connection to use. The runtime breadcrumb's `connection_alias=default` agrees with that path. Whether a separate physical replica was enabled for this deployment was not captured.
3. **The error propagates to the request.** The reporting service adds no retry or fallback. The query-attribution wrapper records the execution and re-raises the database error. The highlighted `core/database/attribution.py` line is the execution boundary, not the transaction calculation or the proven source of the slowdown.

The code's intended read routing and actual raw connection differ. This is a concrete implementation issue for configurations that expect these reads on a replica. It does **not** establish that replica routing alone would make this query fast enough.

The project also configures a database statement limit on venue-based and order-management pods. Source defaults that setting to 10 seconds; the deployed override was not read. This event was cancelled after approximately 25 seconds, so do not treat the source default as the observed limit.

For the underlying framework behavior, see [Django's raw-cursor guidance for multiple databases](https://docs.djangoproject.com/en/5.2/topics/db/multi-db/#using-raw-cursors-with-multiple-databases), which requires choosing the desired connection alias explicitly.

## Impact and engineering follow-up

**Classification:** Confirmed reporting-performance failure, with an identified database-routing issue in the code path. No incorrect fee formula or malformed financial data was identified.

The failed statement only reads totals. It did not perform a charge or update financial records. This event does not establish whether the separate invoice list loaded, which visual error appeared, or whether other Organizers were affected. Other clients of this shared stats endpoint have possible exposure, but their failure has not been observed.

The focused engineering follow-up is to inspect a safe execution plan and database waits for this exact all-history aggregate, verify intended database routing against the real connection alias, and review the all-history totals workload. A routing change must preserve connection behavior for other helper callers. A narrower date selection may reduce work, but that workaround has not been tested. Turning on ClickHouse or raising the timeout has not been validated as a fix; totals correctness, data freshness and deployment settings would still need proof.

Existing service tests mock both reporting backends. They check router state and verify that failures propagate without retry/fallback. They do not execute the real `retrieve_from_query` cursor, so those tests do not prove the physical read used the replica or that the all-history query meets a production time limit. These tests were read, not run in this investigation.

## Did a commit introduce this failure?

**No causal commit has been established.** Comparing local release tags `v36.35.27` and `v36.36.0` shows no changes to the invoice-statistics handler, query builder, reporting service, raw SQL helper, database router or connection-timeout hook. The timeout being first seen in `36.36.0` does not prove the version bump caused it.

| History checked | What the actual diff shows |
| --- | --- |
| [September 9 service extraction, PR 11404](https://bitbucket.org/showpass/web-app/pull-requests/11404), commit `f212c642a891cc39f1cdcdf77412ff997d105272` | The previous handler already wrapped the PostgreSQL path in replica-read context and called `retrieve_from_query`. The refactor moved that work into the service; it did not introduce the default-connection bypass. |
| [July 13 query-boundary change, PR 10104](https://bitbucket.org/showpass/web-app/pull-requests/10104), commit `29d42e6e13a3442cf5d65f84bbeac1c852f44dbe` | Parameterized the SQL and changed literal `IN` expressions to bound `ANY` expressions. The unfiltered query already aggregated eligible invoice items without a default date boundary. No before/after execution plan establishes that this older change caused this timeout. |
| Raw-helper line history, commit `03d86e1c7e4` from November 19, 2019 | The helper used the default `connection.cursor()` from its introduction. That dates the helper behavior, not the first time this endpoint timed out. |
| Database-query attribution, PR 12237, commit `47bc5564b0d` | Adds the wrapper named in the Sentry frame. The inspected wrapper preserves the underlying database exception. Its presence in the stack is not evidence that it made the totals query slow. |

There is no matched successful baseline using Boodang's same data, database conditions, timeout settings and reporting-flag state. Data volume, database load, waiting, or configuration/flag changes remain possible explanations for why an existing path timed out now. Those factors were not measured. Do not blame a refactor, the attribution wrapper, or the release bump without that evidence.

## Source evidence and build limits

Backend inspected on clean `develop` at `e21b0a3918a55c119e1692aa37ec546c7c0e1205` (one commit behind its tracking branch at inspection). Frontend inspected on clean `develop` at `7164d84fd0b1735ae19dbf6848fb3c80e1dd54ed` (seven behind). The reviewed handler, query builder, service, SQL helper, router, attribution wrapper, connection-timeout hook and service-test files have no diff from local release tag `v36.36.0` at `0844c86ad5d646f9efa06952b59235a5ed2acd6b`. `settings.py` has other differences; its statement-timeout setting has the same 10-second default in the tag. Sentry names release `36.36.0`; its exact deployed commit and frontend commit were not independently established. The captured call path and SQL agree with this source.

| Source | What it establishes |
| --- | --- |
| [Invoice statistics handler](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/invoices.py:267) | Date/filter validation, totals permission and backend selection |
| [Statistics service](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/reporting/transaction_statistics.py:23) | Intended replica-read context and no retry/fallback |
| [PostgreSQL reader branch](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/reporting/transaction_statistics.py:45) | Raw-query helper used when ClickHouse is false |
| [Date restrictions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/queries/clickhouse/transaction_page_queries.py:77) | A date condition exists only when supplied |
| [PostgreSQL totals query](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/queries/clickhouse/transaction_page_queries.py:139) | All eligible matching items are aggregated; no automatic date window |
| [Raw-query helper](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/models/utils.py:138) | Uses imported `connection` directly |
| [Read-routing context](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/models/routers.py:72) | Context requests `replica_primary` through the router |
| [Installed Django connection proxy](/Users/christianvaldez/Documents/Showpass/repos/web-app/venv3.12.10/lib/python3.12/site-packages/django/db/__init__.py:43) | `django.db.connection` is fixed to `DEFAULT_DB_ALIAS` |
| [Connection timeout hook](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/database/connection_signals.py:7) | Venue-based pods receive a configured statement limit |
| [Timeout setting](/Users/christianvaldez/Documents/Showpass/repos/web-app/settings.py:226) | The deployed setting can override the source default |
| [Query execution boundary](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/database/attribution.py:52) | Executes SQL, records evidence and preserves the database error |
| [Frontend totals request](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionStats/TransactionStats.web.tsx:37) | The Selection totals panel requests shared invoice stats when visible and permitted |
| [Filters button](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/header/TransactionsFilterToggle.web.tsx:29) | Header button tooltip is Filters; icon is a funnel |
| [Clear action](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/shared/services/declarative-filters/components/FilterSidebarHeader/FilterSidebarHeader.web.tsx:18) | Clear and active-filter count appear only while filters are active |
| [Filter fields and totals checkbox](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/sidebar/TransactionsFilterSidebar.web.tsx:282) | Start date, End date, Event and Show selection totals wording |
| [Totals permission](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/hooks/useTransactionTotalsPermission.ts:7) | Totals permission changes with the permission flag |
| [Backend service tests](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/services/reporting/test_transaction_statistics.py:34) | Mocked read results and router-state assertion; actual cursor not exercised |

Related policy: [[00 Start Here/World-Class Software Quality Standard]]. No Jira issue was created, no production fix was applied, and no release decision is made from this single event.

## Results

| Check | Status | Evidence or remaining limit |
| --- | --- | --- |
| Sentry issue/event read | Passed | One production occurrence and selected event evidence read through the API |
| Immediate timeout cause | Confirmed | PostgreSQL statement-timeout error; recorded execution interval approximately 25 seconds |
| Unfiltered aggregate | Confirmed | Empty captured filters and actual SQL without date/Event restriction |
| Default connection bypasses intended replica routing | Confirmed in source; runtime alias corroborates | Direct default cursor and captured `connection_alias=default`; physical replica enablement unverified |
| [TC-01 — Transactions and Selection totals, steps 1–4](#tc-01-open-boodang-transaction-totals-without-filters) | Not run | Source-backed walkthrough only; no screenshot or visible failure observed |
| Why execution took 25 seconds | Blocked | Query plan, row counts, database load and waits were not captured |
| Commit attribution | Not established | Relevant backend path unchanged between `36.35.27` and `36.36.0`; prior refactor preserved the helper call |
| Narrow-date workaround | Not run | Plausible way to reduce work; speed and correctness untested |
| Regression after a fix | Deferred | No code change made; needs actual connection routing and totals-correctness proof |
| Payments, refunds and exports | Not applicable | Not performed by this read-only request or investigation |
| Cleanup | Complete | No application mutations, screenshots or temporary files created |
