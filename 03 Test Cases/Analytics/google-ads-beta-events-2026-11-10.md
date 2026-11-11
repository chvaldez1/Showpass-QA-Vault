---
title: Google Ads beta event investigation — 2026-11-10
tags:
  - qa/analytics
---

# Browser Test Report: Google Ads events on beta

## Overview

- **What worked:** Beta loaded AW-780079083 and sent a real `view_item` request when the ticket selector opened. Production loaded AW-793802692 and sent its initialization request.
- **What failed:** The reported “none of the events are firing” symptom was not reproduced in the sampled beta session.
- **What remains unverified:** The user's exact page, action and observation tool; add_to_cart, begin_checkout and purchase; Google Ads reporting/attribution and HTTP response status. The browser asset inventory establishes observed requests, not server-side attribution.
- **Scope:** Read-only comparison on November 10, 2026, followed by one beta ticket-view check. No release-wide conclusion.

## Confirmed bugs

No beta-only event-delivery bug confirmed in this run.

## Test index

- [TC-01 Tag setup](#tc-01-tag-setup)
- [TC-02 Tag delivery](#tc-02-tag-delivery)
- [TC-03 Reported failing workflow](#tc-03-reported-failing-workflow)

## Setup / Prerequisites

- **Environment:** https://beta.showpass.com/ and https://www.showpass.com/.
- **Deployed builds:** Beta `sDGqgr6-yI77WFy90HQ1x`; production `yDs9Lt-5s8FRYbiNLo51P`. Git revisions were not established.
- **Browser:** Codex in-app browser. Beta was signed in; production was signed out. Exact viewport size was not established.
- **Record:** TA event for custom gateway (payment intent), Organization For Custom Gateway Payment Intent. Date February 1, 2027.
- **Allowed changes:** Navigation and opening/closing the ticket selector only. No quantities changed, basket created, payment attempted or settings saved.

## TC-01 Tag setup

**What this tests:** Whether the deployed pages load the correct environment-specific Ads tag.

**Start here:** Each site's public homepage. No Dashboard or Admin access required.

### Steps

1. Open each homepage and inspect loaded Google scripts and observed request URLs.

   **Expected:** Beta uses AW-780079083; production uses AW-793802692.

   **Actual — Passed:** Both loaded the expected `gtag/js?id=AW-...` script and produced a `googleads.g.doubleclick.net/pagead/viewthroughconversion/<id>/` request with `en=gtag.config`. No Google-tag-related browser error was captured. This checks initialization only.

   **Evidence:** Browser DOM script inventory and resource inventory, captured around 11:24–11:25 AM MST. A homepage screenshot was not saved during this initial read-only inspection; a screenshot would not establish the request parameters.

## TC-02 Tag delivery

**What this tests:** Whether displaying beta ticket types produces a real Google Ads `view_item` event.

**Start here:** Beta homepage. The tested account was signed in, but no employee permission was used. If the named event or BUY TICKETS control is unavailable, stop and report that difference.

### Steps

1. On beta's homepage, select **TA event for custom gateway (payment intent)**. On its detail page, select **BUY TICKETS**. Inspect the request inventory after the ticket types appear, without changing a quantity.

   **Expected:** The ticket selector displays ticket types and Google receives a `view_item` request addressed to beta's Ads ID.

   **Actual — Passed:** The selector displayed **ga** and **sold out TT**. The browser observed:

   ```text
   Host: googleads.g.doubleclick.net
   Path: /pagead/viewthroughconversion/780079083/
   en: view_item
   data: event=view_item;id=tt-1324152,tt-1324284
   ```

   Additional `view_item` requests were observed at `www.google.com/rmkt/collect/780079083/` and GA4 `analytics.google.com/g/collect` with `tid=G-VC5L0K1EMG`. See [sanitized request evidence](evidence/google-ads-beta-2026-11-10/requests.json). These are actual observed resource entries; response status and Google Ads reporting were not available in this inspection.

   <a href="../../99%20Archive/QA%20Evidence/analytics/google-ads-beta-2026-11-10/view-item.png"><img src="../../99%20Archive/QA%20Evidence/analytics/google-ads-beta-2026-11-10/view-item.png" alt="Beta ticket selector displaying ga and sold out TT" width="600" style="max-width:100%;height:auto;"></a>

   Beta ticket selector, captured November 10, 2026, around 11:28 AM MST. The screenshot establishes the visible action state; the JSON establishes the event request.

## TC-03 Reported failing workflow

**What this tests:** The user's observation that beta events do not fire.

**Start here:** Exact failing page/action and observation tool are still needed.

### Steps

1. Repeat the user's failing action in the same page and reporting tool.

   **Expected:** Determine whether the event is absent from the browser, blocked in transit, or absent only from the selected reporting view.

   **Actual — Blocked:** No exact page/action or observation tool was supplied. No request failure has been established for that workflow.

## Supporting source findings

- `.env.beta` and the deployed beta application bundle contain AW-780079083; production equivalents contain AW-793802692.
- Both deployed bundles use the same event fan-out operation that sends events to active tag IDs. No beta-only exclusion was found in that operation.
- A separate source issue exists: `gtag.awConversion` creates `send_to: ID/LABEL`, but `GTagManager.push` overwrites it with the bare active tag ID. This exists in both deployed bundles and does not explain all events being absent only on beta. Conversion execution was not tested here.
- The published beta GTM container's `view_item` event tag is paused. The published production container also lacks an active Ads event tag; the sampled Ads request comes from the application's direct gtag path. A paused GTM tag alone does not establish missing direct Ads events.

## Postconditions and Cleanup

Closed the beta ticket selector after capture. No business data or settings changed. Retained only the screenshot and sanitized request summary as durable evidence. Existing frontend developer edits were left untouched.

## References / Open Questions

- Tested beta event: https://beta.showpass.com/ta-event-for-custom-gateway-payment/?source_channel=discovery
- What exact beta page/action fails, and is it being checked in browser Network, Tag Assistant or Google Ads?

## Results

The sampled beta `view_item` event passed. The broader reported failure remains inconclusive; a release decision is blocked by the missing failing workflow and untested conversion outcomes.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Tag setup | Passed | Correct Ads IDs and initialization requests on both environments | [TC-01](#tc-01-tag-setup) |
| Tag delivery | Passed | Beta emitted view_item to AW-780079083 and beta GA4 | [TC-02](#tc-02-tag-delivery) |
| Reported failing workflow | Blocked | Exact page/action and observation tool missing | [TC-03](#tc-03-reported-failing-workflow) |
