---
title: Test POS Kiosk and Physical Hardware as a Venue Employee
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test POS Kiosk and Physical Hardware as a Venue Employee

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Venue Employee can configure and operate the supported Showpass app, collect a known payment, issue the right items, and print or Check In without losing the sale. Kiosk is the Customer's self-service entry point, not simply an Employee screen with different styling.

A native Square Reader path, a Square Terminal flow, Electron, mobile web, and public-app webviews are distinct. A passing browser test does not certify native hardware.

## Prepare the device and Venue

Use the Venue/client setup chapter. Record device model, exact OS, Showpass app version/build, processor/account, reader/stand/terminal model, printer/scanner model, wired/Bluetooth/network connection, and Employee permissions. Confirm each combination is supported; keep unavailable combinations Blocked with an owner rather than calling them covered.

Prepare one ordinary Event with immediate delivery, one Ticket Type and known fees. Use approved test-mode payments and isolated admission data. Record what should happen if printing fails after payment.

## Employee setup → sale → physical ticket → admission

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | Sign in as the Venue Employee, select the intended Organization, and open the app's supported POS mode. | Exact app build and Employee role | Correct Venue, Event list, and permitted payment methods are shown. |
| 2 | Open the payment settings and select the supported processor/hardware option. Save, close, and reopen the app. | Approved test processor and device configuration | Saved setting persists; startup and returning from the background do not make the app unusable. |
| 3 | Connect the approved hardware using its supported procedure. Open the prepared Event and select the Ticket Type. | Quantity one and independent price/fees | Readiness is clear; correct item and total reach payment. |
| 4 | Complete a clean approved payment. Keep the first payment/order reference. | Test payment method | One payment creates one saved order with the correct issued items and Inventory change. |
| 5 | Print the ticket or obtain the configured delivery. Use the physical barcode with the supported Check In device. | Actual printed/delivered ticket | Barcode is readable and maps to the correct Event/item. Actual Check In is recorded once under the configured admission rule. |
| 6 | As a second authorized Employee, find the same Transaction. | Original order reference | The saved sale is available independently of the selling device's local success screen. |

## Physical failure and recovery passes

| Independent scenario | Action | Expected outcome |
| --- | --- | --- |
| Disconnected reader | Open settings and checkout with the reader disconnected where supported | Clear readiness/error; no crash or misleading completed sale. |
| Terminal cancellation | Cancel using the control actually provided on that client | Payment and order outcome are known; no charge or issued admission unless the payment genuinely completed. |
| Connection loss around payment | Use an approved sandbox fault scenario and return to the original sale | Employee can determine the first result before retrying. Unknown payment is not treated as unpaid. |
| Printer unavailable after payment | Disconnect or safely disable the test printer, finish a sale, then restore it | Paid order remains findable; supported reprint does not create a new charge/order/entitlement. |
| Background/foreground or app restart | Repeat before payment and after a completed sale in separate runs | No lost paid order, duplicate charge, stuck payment screen, or unexpected saved-setting reset. |
| Scanner reconnect | Disconnect/reconnect through the supported process and scan a controlled ticket | Correct readiness and admission; no invented offline support. Test offline behavior only when supported. |
| Kiosk session turnover | Customer A finishes/leaves, then Customer B starts | No previous Customer details or payment selection leak; correct fresh basket and permissions. |

## Incident regression and deeper selection

For SPD-2770, preserve the **reported** setup: Showpass 3.7.1 build 137, iPadOS 27.0, POS → Settings → Square → Use In-App Payment Processing; the report includes crashes with Square Stand disconnected. Verify the actual device/build/log before claiming reproduction or a supported-device requirement. Its native crash interpretation is unconfirmed here.

For the affected release, select normal supported hardware, the incident combination if available, relevant old/new supported OS and app builds, connected/disconnected states, and fresh/persisted settings. Add internal/absorbed fees, Package or Ticket Credit, Cash/Other, and Refund when those shared paths changed. Do not multiply every scenario onto every device without a reason; do not omit an affected shared payment client merely because its files were unchanged.

No dedicated mobile QA does not remove the coverage need. Name the tester and record unavailable equipment. Physical device runs are manual/native coverage; existing Playwright covers only appropriate browser/Electron portions.

**Source route:** F4 and [[09 Appium/Showpass Mobile App]]. Preserve approved crash logs and order references without card data or Customer personal information.

## Source-backed cautions and automation reference

**Business risk:** a saved payment setting crashes the client, a terminal succeeds but no ticket prints, or staff retry an already-paid sale. Anchors: SPD-2770, SPD-2600, SPD-2178.

**Evidence limit:** SPD-2770's described SquareReader crash interpretation, reported OS, and breadth were not independently reproduced for this handbook. Treat native root cause as unconfirmed without the log and device evidence.

**Automation boundary:** Playwright can protect browser/appropriate Electron paths, not native Square SDK compatibility. Existing mobile/Appium guidance can support a separately scoped native run; actual reader/stand/printer/scanner compatibility still needs physical evidence. Source route: F4; [[09 Appium/Showpass Mobile App]].
