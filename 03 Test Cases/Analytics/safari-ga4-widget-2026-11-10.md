---
title: Safari beta widget GA4 investigation — 2026-11-10
tags:
  - qa/analytics
  - qa/safari
---

# Browser Test Report: Safari blocks GA4 loading

## Overview

- **Confirmed cause:** Safari blocked the Google Analytics loader as a known tracker. The inspected Safari setting **Use advanced tracking and fingerprinting protection** was enabled **in all browsing**. This applies to normal windows as well as Private windows.
- **What failed:** On the Netlify testing tool's beta **Comedy Event (HAHAHA)** widget, Network with resource type **All** and `/g/collect` filtering showed **No Filter Results**. Console explicitly reported a blocked connection to `https://www.googletagmanager.com/gtag/js?id=G-VC5L0K1EMG`.
- **What worked:** The widget displayed its ticket types and application logs reached `PAGE_VIEW`, `VENUE_INIT`, `VIEW_ITEMS` and `VIEW_CONTENT`. The browser blocked the vendor script before GA4 could create collection requests.
- **Earlier hypothesis corrected:** Third-party cookie denial remains a possible later constraint for embedded analytics, but it is not the established cause of this run. Here the GA4 script itself was blocked before cookie/session setup could complete.
- **Scope:** November 10, 2026. Read-only diagnosis in the user's normal Safari session, explicitly authorized by the user. This is separate from the earlier Google Ads investigation.
- **Limits:** Protection was not disabled and no recovery A/B test was run. Cookie/storage access was not measured because the explicit blocked-loader message established the earlier failure. No production Safari comparison or checkout/purchase event execution.

## Confirmed bugs

No Showpass product bug was established for the missing collection requests in this run. Safari's configured tracker protection explains the observed result. There is a separate source-backed diagnostic gap: our loader's initialization promise only handles onload, so a failed vendor-script load never resolves or rejects it. That gap does not remove the browser's block.

## Test index

- [TC-01 Source and security-policy review](#tc-01-source-and-security-policy-review)
- [TC-02 Safari widget reproduction](#tc-02-safari-widget-reproduction)
- [TC-03 GA4 loading failure](#tc-03-ga4-loading-failure)
- [TC-04 Safari protection scope](#tc-04-safari-protection-scope)

## Setup / Prerequisites

- **Host page:** [Showpass Widget Testing Tool](https://spwidgettool.netlify.app/?api=beta.showpass.com&venue=organization-for-system-gateway-charge-api&hex=%23dd3333&purchase_source_platform=psp_widget&theme-dark=false&keep-shopping=false&prompt-for-quantity=false&open-calendar=false&tags=&show-specific-tickets=&ticket-type-selection-required=false&lang=en&gtmId=). Host `spwidgettool.netlify.app`, API/SDK environment `beta.showpass.com`.
- **Event:** `comedy-event-hahaha`, displayed as **Comedy Event (HAHAHA)**, Organization For System Gateway Charge API, venue 1432. Event date November 12, 2032.
- **Widget route:** `https://beta.showpass.com/widget/tickets/events/purchase/comedy-event-hahaha/`. Actual iframe/query parameters are preserved in the [embed evidence](evidence/safari-ga4-widget-2026-11-10/embed.json).
- **Browser/state:** User's existing normal Safari window and existing widget-tool tab. Web Inspector docked beside the page. No viewport override changed. Exact Safari build was not independently established.
- **Widget options:** PSP_Widget; Dark Theme, Keep Shopping, Prompt For Quantity, Ticket Type Selection Required and Embedded unchecked. The modal still uses an iframe: `is_embedded=false` selects a modal presentation, not a top-level document. Parent GTM ID empty; ordinary checkout mode.
- **Permissions/sandbox:** The inspected SDK iframe used `allow="payment *; storage-access *"` and no sandbox attribute in the in-app-browser comparison. This alone does not grant cookie access.
- **Allowed changes:** Open the event widget, inspect Network/Console, and read Safari settings. No privacy setting, consent, ticket quantity or business record changed.

## TC-01 Source and security-policy review

**What this tests:** Configuration and possible failure paths before executing Safari checks.

**Start here:** Current frontend/backend source and public Google GA4 script.

### Steps

1. Trace the Next GA4 loader and backend Angular GtagConfig, and inspect Google's public beta GA4 script and beta homepage security headers.

   **Expected:** Identify configuration, load failure handling and whether policy permits the Google hosts.

   **Actual — Passed (source/HTTP review):** Both widget implementations use `cookie_flags: SameSite=None;Secure`. The Next loader waits for onload before defining `window.gtag` and configuring tags; it has no onerror completion path. Google's current GA4 script also has cookie-persistence failure branches, recorded in [source analysis](evidence/safari-ga4-widget-2026-11-10/google-source-findings.json). Beta homepage CSP permits the tag and collector hosts; [sanitized policy evidence](evidence/safari-ga4-widget-2026-11-10/csp.txt). The exact Safari widget failure was subsequently established by its Console, rather than inferred from these headers. Screenshots do not apply to file/HTTP inspections.

   Source owners: frontend `packages/core/src/shared/lib/analytics/loader/gtag.ts` and `gtag.ts`; backend `apps/main/static/src/core/generic/gtag.js`.

## TC-02 Safari widget reproduction

**What this tests:** Whether the reported `/g/collect` absence occurs on the exact event widget.

**Start here:** The linked Netlify tool in a normal Safari window. No employee role or Admin access required. Stop and report if the tool cannot load beta's SDK or the named event.

### Steps

1. Open Safari Web Inspector using **Develop → Show JavaScript Console**, select **Network**, and ensure the resource-type selector is **All**. In the testing tool's **Event Widgets** section, enter `comedy-event-hahaha` into the custom **Event ID or slug** field and select **event**. Once **Comedy Event (HAHAHA)** and its ticket types appear, enter `/g/collect` in **Filter Full URL**. Leave every ticket quantity at zero.

   **Expected:** A GA4 page-view or ticket-view request would be visible if GA4 could initialize and send in this browser configuration.

   **Actual — Failed for GA4 delivery:** Network showed **No Filter Results**, zero resources. The widget loaded its content; its Continue button remained disabled with zero quantities. This is an observed failure of collection in the configured session, explained by the browser restriction in TC-03; it is not a Showpass bug classification.

   <a href="../../99%20Archive/QA%20Evidence/analytics/safari-ga4-widget-2026-11-10/no-collect.png"><img src="../../99%20Archive/QA%20Evidence/analytics/safari-ga4-widget-2026-11-10/no-collect.png" alt="Safari shows Comedy Event HAHAHA and no network results for g collect with All types selected" width="600" style="max-width:100%;height:auto;"></a>

   Normal Safari, beta event widget hosted on Netlify, November 10, 2026, approximately 3:35 PM MST. Inspector was open before launching this widget.

## TC-03 GA4 loading failure

**What this tests:** Why GA4 cannot produce a collection request.

**Start here:** Same widget and inspector capture from TC-02. Do not change browser protection or consent settings.

### Steps

1. Select **Console** and search for `googletagmanager`.

   **Expected:** Identify a script load failure or another specific reason before attributing missing events to widget logic.

   **Actual — Passed for diagnosis:** Safari explicitly logged **Blocked connection to known tracker** for:

   ```text
   https://www.googletagmanager.com/gtag/js?id=G-VC5L0K1EMG
   https://www.googletagmanager.com/gtm.js?id=GTM-M754HLGP&l=dataLayer_GTM_M754HLGP
   ```

   The unfiltered Console also showed app-level `AnalyticsService::PAGE_VIEW`, `VENUE_INIT – 1432`, `VIEW_ITEMS` and `VIEW_CONTENT`. The application reaches its analytics calls, but Safari prevents the Google loader from loading. This establishes a failure earlier than any collector HTTP response or GA4 cookie-write outcome.

   <a href="../../99%20Archive/QA%20Evidence/analytics/safari-ga4-widget-2026-11-10/blocked-tag.png"><img src="../../99%20Archive/QA%20Evidence/analytics/safari-ga4-widget-2026-11-10/blocked-tag.png" alt="Safari Console explicitly blocks the GA4 gtag script and GTM container as known trackers" width="600" style="max-width:100%;height:auto;"></a>

   Same Safari widget/session, November 10, 2026. Console source was beta's `_app-773ec0e6387b8054.js`.

## TC-04 Safari protection scope

**What this tests:** Why tracker blocking occurs in the user's normal window.

**Start here:** Same Safari application. This check reads preferences without toggling them.

### Steps

1. Open **Safari → Settings → Advanced** and read the privacy protection checkbox and its scope.

   **Expected:** Establish the actual scope rather than assume that normal browsing has no tracker protection.

   **Actual — Passed:** **Use advanced tracking and fingerprinting protection** was checked, and its scope was **in all browsing**. **Block all cookies** was unchecked. The setting was left unchanged.

   <a href="../../99%20Archive/QA%20Evidence/analytics/safari-ga4-widget-2026-11-10/protection-setting.png"><img src="../../99%20Archive/QA%20Evidence/analytics/safari-ga4-widget-2026-11-10/protection-setting.png" alt="Safari advanced tracking and fingerprinting protection enabled in all browsing" width="600" style="max-width:100%;height:auto;"></a>

   User's Safari Advanced settings, November 10, 2026. Read-only inspection.

## Supporting comparison and follow-up

- In the Chromium-based in-app-browser comparison, the same Netlify tool/event displayed ticket types and inserted the GA4 loader and Ads `view_item` request. [Embed evidence](evidence/safari-ga4-widget-2026-11-10/embed.json). The asset inventory did not expose iframe collector requests; no GA4 delivery conclusion is based on that inventory.
- The user also reported missing `/g/collect` at `https://beta.showpass.com/ta-event-for-group-sales-custom-gateway-payment-intents/?source_channel=discovery`. That standalone page was not independently executed. The verified **in all browsing** setting also covers standalone normal-window pages, making the same script block the leading explanation there; do not label this a separately reproduced pass/failure.
- WebKit documents this tracker-blocking Console message and that enhanced protection can apply in normal browsing: [Private Browsing 2.0](https://webkit.org/blog/15697/private-browsing-2-0/).
- The source-based third-party cookie theory remains background information: [WebKit tracking prevention](https://webkit.org/tracking-prevention/). It does not supersede the explicit script-load block captured here.
- A check with protection disabled was not performed; no recovery claim or recommendation to change the user's global privacy settings is implied. Any controlled recovery test must be separately authorized.

## Postconditions and Cleanup

No code, Safari privacy setting, consent, ticket quantity, basket or transaction changed. Safari Settings was closed. The user's existing widget-tool tab and Console remain open on the confirmed tracker block, with all quantities zero. The event slug field now contains `comedy-event-hahaha`. No new Safari tab was created or existing tab closed. The in-app-browser comparison widget was closed after evidence capture.

Screenshots and sanitized embed/source evidence are retained beside this note and in the ignored QA archive. Temporary text captures can be removed after copying; keep screenshot originals.

## Results

**Investigation complete for the sampled widget:** Safari's configured tracker protection blocks the GA4 loader before collection can start. This is a browser-environment restriction, not evidence of a Showpass-wide analytics outage. No release sign-off was requested or established; collection under another privacy configuration and the additional standalone page remain untested.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Source and security-policy review | Passed | Load failure handling traced; homepage policy permits Google hosts | [TC-01](#tc-01-source-and-security-policy-review) |
| Safari widget reproduction | Failed | Zero g/collect requests in the configured Safari session | [TC-02](#tc-02-safari-widget-reproduction) |
| GA4 loading failure | Passed | Console identifies blocked Google loader as the immediate cause | [TC-03](#tc-03-ga4-loading-failure) |
| Safari protection scope | Passed | Advanced tracking protection enabled in all browsing; unchanged | [TC-04](#tc-04-safari-protection-scope) |
