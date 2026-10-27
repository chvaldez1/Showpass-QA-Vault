---
title: SHOWPASS-LIVE-FKN - My Stats inventory worker abort
date: 2026-10-26
tags:
  - qa/sentry
  - qa/my-stats
aliases:
  - Sentry 7813062728
status: Recorded failure confirmed; manual reproduction not run
---

# SHOWPASS-LIVE-FKN — My Stats inventory worker abort

## Overview

- **What happened:** Showpass recorded one failed request from **Vancouver Bandits Basketball → My Stats** while preparing ticket prices.
- **Where to try it:** On the older My Stats page, open **Filter by Event** in **Your Ticket Sales**. A second possible starting point is the same filter in **Tracking Links**.
- **What is confirmed:** The server stopped that request. We do not know what the employee saw on the page.
- **What has not been tested:** Neither walkthrough below has been run. They may load successfully now; the exact condition that caused the server to stop is still unknown.

**Do I need the original employee?** Not necessarily. **My Stats** displays the signed-in employee's totals, but the failed request was loading shared event ticket types and calculating their prices. In the traced code, that happens before personal ticket-sales statistics are requested. Your account can exercise that pricing path if it has access to the same Organizer, events and ticket types. Matching your own sales totals to the original employee is not a known requirement. We still do not know which employee made the original request or whether another account will reproduce the abort.

**Read this note:** Start with [TC-01](#tc-01-open-the-ticket-sales-event-filter). The second possible path is [TC-02](#tc-02-open-the-tracking-links-event-filter). Technical details are [below the walkthroughs](#recorded-facts), followed by [all results](#results).

**Report update:** This rewrite clarifies the October 26, 2026 investigation. It is not a new browser test run.

[Sentry issue](https://showpass.sentry.io/issues/7813062728/) · [Recorded event](https://showpass.sentry.io/organizations/showpass/issues/7813062728/events/885b24dd993a41ef84444c4289f6fe83/)

## Test index

- [TC-01 — Open the ticket-sales event filter](#tc-01-open-the-ticket-sales-event-filter)
- [TC-02 — Open the tracking-links event filter](#tc-02-open-the-tracking-links-event-filter)

## Setup and boundaries

- **Environment:** The original error was on **www.showpass.com**, release **36.36.0**, on October 26, 2026 at **8:11:54 a.m. MDT**. The current production version has not been checked. The beta site used in the authentication report is a format reference, not the environment where this error was recorded.
- **Account:** An employee already allowed to open the **Vancouver Bandits Basketball** dashboard and view its events and ticket types. Do not add permissions for this check.
- **What narrows the employee choice:** The account must be able to see the original ten events and **4 Point Play Meal Deal - Purple** under **Vancouver Bandits Basketball** (venue `6362`). Employees with an Organizer-wide full-access inventory grant or an individual grant for those ticket types can reach this code. The source does not require that employee to have sold tickets. Simply opening My Stats under a different selected Organizer does not match the incident.
- **Employee to impersonate:** The Sentry event has no employee name, username or user ID, and its captured permission-query fragments do not identify one. No particular live employee has been verified. The supported lookup is your profile menu → **Impersonate Employee** → search **Vancouver Bandits Basketball**. Searching the employee list makes no data change; starting impersonation changes the session and saves an impersonation audit field. Use an employee already approved for testing who can see the relevant events and ticket types. After any separately authorized impersonation, **Stop Impersonate** ends it. [Employee list and search source](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/admin/employment.py:38).
- **Starting page:** The Organizer dashboard, with **Vancouver Bandits Basketball** already selected. Use an approved test copy if ordinary access to the original Organizer is not authorized.
- **Page version:** The older My Stats page has two separate sections named **Your Ticket Sales** and **Tracking Links**. Each has its own **Filter by Event** box. If your page does not have those controls, stop: the walkthrough does not match your page version. Do not change a production setting to get the old page.
- **Records:** The original request included ten events and the ticket type **4 Point Play Meal Deal - Purple**. Their IDs are in the supporting evidence below. Their current names, availability and employee access have not been checked. Another Organizer or a different event list may not reproduce this error.
- **Allowed changes:** No manual edits are needed. However, viewing these stats can cause Showpass to save calculated ticket prices automatically. **Changes test data** if run on an approved test copy; on production, those automatic price updates affect production records. Use only an account and records already approved for this access.
- **Finishing point:** Open an event filter once, note whether the event choices load, and close it. Do not select an event, change prices, clear saved prices, change page settings, make a purchase, or repeatedly reload to force an error.
- **Execution and screenshots:** These instructions come from source review and the recorded Sentry event. No browser steps were run, so there are no screenshots for them.

<a id="tc-01-open-the-ticket-sales-event-filter"></a>
## TC-01 — Open the ticket-sales event filter

**What this tests:** An employee can open the event choices in **Your Ticket Sales** without the list failing to load.

**Start here:** Signed in as an authorized employee on the **Vancouver Bandits Basketball** Organizer dashboard, or its approved test copy. That Organizer must already be selected. You need the older My Stats page described in the setup above.

### Steps

<a id="tc-01-step-1"></a>
1. **Select My Stats in the dashboard navigation.**

   **Expected:** My Stats opens. Find the **Your Ticket Sales** section. Its header has a **Filter by Event** box on the right. There is also a separate **Tracking Links** section farther down the page.

   **Actual — Not run:** The navigation and control names were checked in source. The live page has not been opened for this investigation.

   **If your page differs:** Stop here. Record whether My Stats failed to open or whether it opened with different section names. Do not use the newer page as proof that this older-page attempt passed.

<a id="tc-01-step-2"></a>
2. **In Your Ticket Sales, click Filter by Event. Leave the search box empty. Do not choose an event.**

   **Expected:** A list of available events appears with readable event names and dates. It does not stay loading or show a failed-load message.

   **Actual — Not run:** This is the first suggested attempt. The recorded request matches the work this filter can start, but Sentry does not prove the employee clicked this particular filter.

   **What to record:** Did the event choices appear, did the list stay loading, or did an error appear? Record the exact error text, if any, and the local time. A failure here needs to be matched to a new server error before we can call it the same issue.

<a id="tc-01-step-3"></a>
3. **Click the Your Ticket Sales heading to close the event list. Stop this attempt.**

   **Expected:** The event list closes. No event has been selected and no price has been manually edited.

   **Actual — Not run:** No filter was opened or closed during this investigation.

**Evidence:** No screenshot is available because these steps have not been run. The [recorded facts](#recorded-facts) establish the server failure, not the dropdown's visible state.

**If the list loads:** Record that it worked on this attempt. A successful load now does not explain the earlier failure. Showpass may already have saved the prices it needed to calculate during the original request.

<a id="tc-02-open-the-tracking-links-event-filter"></a>
## TC-02 — Open the tracking-links event filter

**What this tests:** An employee can open the event choices in **Tracking Links**. This is the other control that can start the same kind of request.

**Start here:** Signed in as an authorized employee with **Vancouver Bandits Basketball**, or its approved test copy, selected in the Organizer dashboard. Use the older My Stats page with a **Tracking Links** section and its own **Filter by Event** box. This is an alternative attempt; the original event does not identify which of the two filters was used.

### Steps

<a id="tc-02-step-1"></a>
1. **Select My Stats in the dashboard navigation. Scroll to Tracking Links.**

   **Expected:** The **Tracking Links** section is visible. Its header has a **Filter by Event** box on the right. Use that box, rather than the one in **Your Ticket Sales**.

   **Actual — Not run:** The section and control were checked in source. The live page has not been inspected for this investigation.

   **If your page differs:** Stop here and record the section names you see. Do not change the page's rollout setting.

<a id="tc-02-step-2"></a>
2. **In Tracking Links, click Filter by Event. Leave the search box empty. Do not choose an event.**

   **Expected:** Available event names and dates appear. The list does not stay loading or show a failed-load message.

   **Actual — Not run:** This filter is another possible starting point supported by source review. We do not know whether it was used when the recorded error happened.

   **What to record:** Whether choices appeared, whether loading finished, any exact error text, and the local time. A blank or failed list alone does not prove the same server failure.

<a id="tc-02-step-3"></a>
3. **Click the Tracking Links heading to close the event list. Stop this attempt.**

   **Expected:** The list closes without selecting an event or making a manual edit.

   **Actual — Not run:** No filter was opened or closed during this investigation.

**Evidence:** No screenshot is available because these steps have not been run. See the [recorded facts](#recorded-facts) for the original server evidence.

**Starting-state limit:** If another attempt already saved the missing prices, this attempt may be faster. Do not clear those prices to force the problem to return.

## Postconditions and cleanup

No live Showpass request was replayed and no Showpass records were created or edited by this investigation. There is no test data to clean up.

If someone runs a walkthrough later, record any automatic price updates that can be established. Do not delete or reset production prices. Any test-copy preparation or restoration needs supported setup on owned records and a cleanup plan before it is performed.

## Proof and stopping point

You do not need to read Sentry, inspect payment methods, edit fees, or find the ticket type in order to follow the basic walkthrough. The actions are simply **open My Stats → open one named event filter → note what happens → close it**.

The original error is confirmed in Sentry. A repeatable browser failure is not confirmed. No reliable UI-only way has been established to recreate the original missing-price state or make the server stop again.

For a later attempt, record the Organizer, page version, section, local time, whether choices loaded, and any exact error. Matching server evidence is needed to establish the same cause. Optional technical evidence is the inventory request's event list, duration and response status, plus a new Sentry event with the same abort path. Worker logs around the original event are needed to determine whether it was a timeout.

Do not clear saved prices, edit internal fees, change rollout flags, stop server workers, send heavy traffic, buy/refund tickets, or repeat the actions in a loop. None is needed for this focused attempt.

## Recorded facts

| Item | Evidence read through the Sentry API |
| --- | --- |
| Issue | `SHOWPASS-LIVE-FKN`, `SystemExit: 1`, unresolved, Sentry priority High |
| Occurrences | One at investigation time; this is not evidence of a widespread outage |
| Environment / release | Production, `36.36.0` |
| Time | October 26, 2026, **8:11:54 a.m. MDT** / `2026-10-26T14:11:54.119195Z` |
| Organizer | **Vancouver Bandits Basketball**, venue ID `6362` |
| Referring screen | My Stats; recorded referrer `/dashboard/venues/users/me/` |
| Request | GET ticket-type inventory for ten events; page size 1,000; Web Box Office pricing; 14 payment methods |
| Ticket type being processed | **4 Point Play Meal Deal - Purple** |
| Application work underway | Filling missing cached fee/price information, then calculating internal fees |
| Final frame | Gunicorn `handle_abort`, signal `6`, followed by `sys.exit(1)` |
| Recorded client | Chrome 156 on macOS; no evidence that other browsers cannot encounter it |

The API request used `/api/venue/6362/events/ticket-types/inventory/` with `ticket_type__event__in=1574247,1574248,1574249,1574250,1574251,1574252,1574253,1574254,1574255,1574256`, `page_size=1000`, `purchase_platform=psp_web_box_office`, and `payment_type=1,2,3,4,5,6,7,9,10,11,12,13,14,15`. These IDs document the original request; their current names, availability and saved values have not been checked.

## What this means

**Confirmed:** the worker handling the request aborted. Sentry captured a failure while a ticket-type price was being prepared. It did not record the user's final screen, the HTTP response status, or a completed purchase.

**Likely, but not confirmed:** the worker exceeded a server time limit. The abort handler supports that explanation, but worker logs are needed to distinguish a timeout from another abort signal. The line that happened to be running is not proof that the Square fee switch or this ticket's fee configuration is broken.

**Possible user impact:** the employee may see event choices or sales statistics fail to load. The legacy helper logs an inventory error and continues, so incomplete results are also possible. Neither visible symptom has been observed in this investigation. There is no evidence here of a duplicate charge, lost order, or changed admission rights.

The ten-event request matches the legacy event-search controls more closely than the initial ticket-sales table, which normally loads four events at a time. Both **Your Ticket Sales → Filter by Event** and **Tracking Links → Filter by Event** request up to ten event choices and then fetch their inventory. The event does not identify which control the employee used.

### Employee identity follow-up

The event's user name, username and ID are empty. No employee-identifying tags, selected identity headers, numeric employee/user references in the retained breadcrumbs, or direct identity frame variables were found. These checks do not identify a particular employee or establish the current employee list.

The `/dashboard/venues/users/me/` page always refers to the signed-in account; appending `#/customers` does not choose a different employee. For this error, the important difference is which Organizer and ticket inventory that account can access. The legacy controller loads inventory before calling `myTicketTypeStats` for the employee's sales. The inventory endpoint filters by the selected venue and employee inventory grants, then calculates shared ticket-type prices.

An attempt to load Datadog guidance for narrowly correlated runtime evidence failed with `Unknown tool (datadog.list_datadog_skills)`. No Datadog trace or employee lookup was completed; no employee identity or timeout cause was inferred from that integration.

## Source evidence and limits

Source review used clean local checkouts: backend `develop` at `607ba2e538adf77e2687afcc1468c86190c53fdb`; frontend `develop` at `7164d84fd0b1735ae19dbf6848fb3c80e1dd54ed` (seven commits behind its tracking branch at inspection). The captured release `36.36.0` had no matching local tag found. The relevant captured code excerpts agree with the traced pricing path, but current checkout source is not proof of the full deployed build or current production flags.

| Source | What it establishes |
| --- | --- |
| [Legacy My Stats navigation](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/navigation/dashboard/side-menu.html:62) | Visible **My Stats** link |
| [Legacy ticket-sales event search](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/users/controllers/VenueMyProfileController.js:179) | Ten event choices followed by inventory retrieval |
| [Legacy tracking event search](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/users/controllers/VenueMyProfileController.js:154) | The alternative ten-event request path |
| [Ticket-sales filter wording](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/dashboard/venues/users/my-profile.html:86) | **Your Ticket Sales** and **Filter by Event** |
| [Tracking-links filter wording](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/dashboard/venues/users/my-profile.html:303) | **Tracking Links** and its event filter |
| [Shared legacy inventory request](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/tickets/utils.js:244) | Page size 1,000, event IDs and all payment types; errors are caught and logged |
| [Inventory API](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/access.py:45) | Employee-visible, published, configurable ticket inventory |
| [Inventory grants](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/managers/inventory_management.py:34) | Organizer-wide or individual employee access |
| [Inventory before personal sales totals](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/users/controllers/VenueMyProfileController.js:215) | Inventory retrieval finishes before the page requests the employee's per-ticket sales statistics; the event search also retrieves inventory without requiring sales history |
| [Inventory response pricing](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/access.py:283) | Nested ticket types include fee/price information |
| [Automatic cache updates](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/serializers/mixins.py:20) | A read can calculate and save missing ticket-type and active-tier prices |
| [Missing-price loop](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/fees/pricing_info.py:4) | Calculation per missing payment/platform combination |
| [Interrupted fee calculation](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/models/abstract/fees.py:1201) | The application line interrupted in the recorded event |
| [Page-version selection](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/dashboard/views.py:76) | Organizer-specific old/new My Stats flag |
| [New My Stats consumer](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/venue-user-stats/hooks/useMyStatsTicketSales.ts:121) | New page also loads inventory through a shared hook; its event-search control does not follow the same legacy path |
| [Shared modern inventory hook](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/sell/hooks/useInlineEventInventories.ts:149) | New My Stats also reaches the pricing API; this event does not prove a failure there |

Related standard: [[00 Start Here/World-Class Software Quality Standard]]. Repository guides: [[01 Repositories/Backend - web-app]] and [[01 Repositories/Frontend - showpass-frontend]].

## Skill validation and access

The reusable `showpass-sentry-investigator` skill uses the existing Sentry plugin reader and local configuration at `~/.config/showpass/sentry.env`, with verified TLS. Its API wrapper successfully read issue `7813062728`. The skill creator's validator passed; Python syntax and all 15 local source links were checked. The full investigation also read the issue event list and selected event details, then traced both repositories. Credentials were not copied into the skill or vault.

No connected Sentry tool was exposed in this chat. The frontend's `.sentryclirc` credential returned HTTP 403; the established Showpass configuration found in the referenced **Investigate 500 error** chat succeeded. Use that established configuration first in future investigations.

The vault's agent rules and this skill explicitly prohibit desktop-app access and Sentry browser fallbacks. An initial desktop Chrome inspection happened before the user's correction; it is not evidence for this investigation. All Sentry findings above came from the API. No browser reproduction was performed.

<a id="results-and-remaining-checks"></a>
<a id="results"></a>
## Results

No release decision or confirmed browser-bug Jira draft is warranted from this single recorded abort.

| Check | Status | Evidence or reason |
| --- | --- | --- |
| Sentry API issue access | Passed | Working Showpass credential read the exact issue |
| Recorded failure details | Passed | One production event; selected request, offering and abort frames read |
| Backend and frontend tracing | Passed | Source links above; deployed-build limits stated |
| [TC-01 — Ticket-sales filter, steps 1–3](#tc-01-open-the-ticket-sales-event-filter) | Not run | Walkthrough clarified; live page and records remain unverified |
| [TC-02 — Tracking-links filter, steps 1–3](#tc-02-open-the-tracking-links-event-filter) | Not run | Alternative walkthrough supplied; original control remains unknown |
| Deterministic worker-abort reproduction | Blocked | No equivalent preserved price-cache/worker state or timeout log |
| Clean successful filter load and correct sales statistics | Not run | Required control for a later verification run; an API issue read is not a product pass |
| New-page and Box Office regression | Deferred | Shared pricing API creates possible exposure; no failure observed there and no fix under review |
| Purchases, refunds, admission and deliveries | Not applicable | This focused investigation does not exercise those workflows; no such harm established |
| Test-data cleanup | Not applicable | No Showpass execution or record preparation performed |
