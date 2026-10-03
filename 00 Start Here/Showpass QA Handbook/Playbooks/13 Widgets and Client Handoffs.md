---
title: Test Embedded Widgets Through Purchase and Post-Purchase
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test Embedded Widgets Through Purchase and Post-Purchase

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Organizer offers an Event, Product, Membership, or calendar on another website. The Customer starts there, may pass through login or another checkout surface, and must finish with the same items, quantities, ownership, price, and usable order.

An embedded Widget, a modal Widget, a calendar, and a guestlist booking Widget are not interchangeable clients. Test the actual type used by the Organizer.

## Prepare a real host scenario

Use an approved owned test website with the deployed SDK/embed configuration, prepared sellable item, supported browser, and allowed host domain. Record embedded versus modal, old/new calendar, WordPress integration where applicable, login state, language, and any expected redirect. Compare with a direct public-web control purchase using equivalent independent orders.

Do not copy production secrets into the website or capture real Customer information. Choose one ordinary Event first; add Package, Product, Membership, or recurring date selection when those flows are affected.

## Organizer embed → Customer checkout → Venue Employee result

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the Organizer, prepare the Event or other sellable item and the supported embed configuration. Open the owned host website. | Known published item and saved Widget configuration | The host shows the intended Organizer, item, available dates, and correct purchasing entry point. |
| 2 | As the Customer, select a date/item and quantity, then open checkout through the Widget. | Explicit item/date and independent total | The selection survives the host-to-checkout handoff with the correct Venue and price. |
| 3 | If login is required, sign in through the offered flow and return to checkout. | Controlled Customer; separate signed-out and signed-in runs | The basket is retained or clearly restored according to the supported flow; no wrong account or lost selection. |
| 4 | Complete the approved test purchase and follow the confirmation/delivery links. | Original payment attempt reference | One payment and order exist; promised items and delivery belong to the correct Customer or Attendee. |
| 5 | As the Venue Employee, find the order and complete the relevant Check In, pickup, or Membership verification. | Actual issued items | The host-originated sale is usable exactly like the supported direct purchase. |
| 6 | Refund, Void, or Exchange a separate eligible Widget-originated order. | Supported adjustment | The order remains adjustable; money, validity, and Inventory agree with the same configured business rules. |

## Senior-QA host variations

| Scenario | Concrete check |
| --- | --- |
| Cancel the modal before payment | Reopen it and verify basket retention/expiry policy; no accidental charge. |
| Refresh/back through a handoff | Verify no duplicate submission, wrong Event date, or abandoned paid order. |
| Two Widgets on one host page | Select different items and verify each action affects the intended Widget/basket. |
| Login popup/redirect unavailable | Check the clear recovery path and preserve the basket; do not bypass browser security settings to hide the defect. |
| Restricted cookies/storage | Test the supported browser policy and actual error/recovery behavior; document unsupported combinations. |
| Old/new calendar or shared-component rollout | Repeat selection → checkout → purchase on each affected consumer, not just the new public page. |
| Package or Membership | Verify every promised child/benefit and its recipient after the handoff. |
| Duplicate host events | Engineering/component tests prove repeated messages cannot duplicate checkout actions; browser tests prove the visible journey. |

Use an actual host/embed browser test when testing embedding. Opening checkout directly misses parent-window communication and host restrictions. Mocked message tests establish only their component boundary, not a completed payment.

**Source route:** B18; SDK bootstrap, embedded app, served routes/templates, and guestlist Widget configuration are separate layers. The Critical Business E2E reference helps choose actual clients; it is not evidence each combination was run.

## Source-backed cautions and automation reference

**Business risk:** purchase works on Showpass but fails or loses selections/customer state on a partner website, redirect, webview, or migrated client.

**Automation:** actual embedding host + real supported redirect journey; request mocking alone cannot prove cross-site cookies/payment/host messaging. Critical Business E2E's redirect/login/custom-selection issues are investigation anchors, not automatic current findings. Source route: B18; affected public/widget components.
