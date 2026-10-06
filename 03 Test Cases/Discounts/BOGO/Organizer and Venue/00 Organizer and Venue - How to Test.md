---
title: "Organizer and Venue \u2014 How to Test"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# Organizer and Venue — How to Test

## V1 delivery phases

Treat the project as phased work, as requested. **Backend V1** is automatic, internal-configuration, standalone tickets. **Organizer configuration delivery** adds Discounts Manage, guided setup and CRUD in SPW-20662–20666 / SPW-20743. **Buyer presentation delivery** is a separate area under SPW-19932. Broad discovery and product documents describe desired capabilities that may belong to another phase.

After the user's fresh pull, relevant source was re-read: HeaderActions still offers Discount Code, Bulk Discount Code and Auto Discount; AutoDiscountForm is a long form; organizer serializers have no nested buy_get_rule; BOGO is not an allowed serializer create type. Jira comments refer to another backend revision and a newer non-BOGO wizard. This is a local revision gap, not a confirmed deployed defect or a reason to stop backend V1 test design.

## What to do now

The Organizer needs **Manage Events** for regular Discount management. A Bulk Discount Order is different: its write permission is **Manage Transactions** (manage_financials). BOGO CRUD's proposed permission is Manage Events, but its BOGO-only list filtering is a future contract not found locally. Transactions use Administer Transactions / View Transaction Totals; reports use Manage Reports.

Open Dashboard → Events → Discounts. Inspect current list/search/filter/edit/status behavior and run the source-supported legacy case below. Prepare BOGO through the internal administrator; do not try to turn an Auto Discount threshold rule into a BOGO rule.

## When the BOGO wizard revision is supplied

Bind the actual fields/labels/defaults to source before writing executable Qase fields. The request's intended order is Basic information → Customer buys → Customer gets → Limits → Active dates / Locations → Review/save. Select one concrete event first. Buy and Get selectors are independent in the proposed CRUD contract; unsupported products/memberships and cross-event targets must not be represented as supported V1 choices.

The initial disabled default is a PRD requirement, not observed in a BOGO form here. Reuse and reopen one unused promotion; exercise Buy/Get/value save, independent selectors, Back preserving compatible state, Next validation, Cancel leaving saved values unchanged, and used-promotion edit restrictions only in the revision that implements them.

| Surface | Planned proof / status |
| --- | --- |
| Manage list | Tabs, active-tab create choice, search, filter, clear, pagination, empty/loading/error; edit, duplicate, activate/deactivate — current legacy checks; BOGO-specific actions Blocked on revision |
| Buy/Get wizard | Current/completed/upcoming steps; minimum 1 whole-number X/Y; empty, zero, negative, decimal, text and maximum boundary; missing targets — Blocked |
| Event/target selectors | Open/search/select/remove/clear, no result, loading/error, keyboard/Escape, event change resets invalid selections, independent Buy/Get sets — Blocked |
| Reward controls | Percentage 0/100/>100; fixed value 0/positive; at least one positive benefit; conditional inputs and preserved draft — Blocked |
| Limits | Blank/unlimited, zero, positive, invalid/negative/fractional; basket/customer/event/global semantics — backend coverage planned; wizard Blocked |
| Dates | Local date/time/timezone, end before start, equality boundary, omitted PATCH partner date, no forced future start — contract; wizard Blocked |
| Footer/review | Save/Cancel/Next/Back; disabled/saving/error/unknown outcome; reopen and no blind POST retry — Blocked |
| Responsive/translated/accessibility | Desktop/mobile layout, focus, keyboard, screen-reader names, translated labels/errors, no clipped footer — Blocked pending rendered wizard |

These are coverage charters, not copy-ready cases with invented fields. Canonical card notes below map every original Jira criterion. No public frontend change is implied by the Dashboard phase.

Read [[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20662-discounts-management]] → [[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20663-contract]] → [[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20664-wizard]] → [[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20665-persistence]] → [[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20666-rollout]]; proposed CRUD is [[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20743-organizer-api]].

## TC-L01 — Dashboard - Discounts - Save and reopen a regular discount without changing its behavior

**Title:** Dashboard - Discounts - Save and reopen a regular discount without changing its behavior

**Description:** Checks the currently implemented Discount Code form after nearby promotion work. Expected sections are code/details, amount and application, eligible items, limits, dates, Accepted Locations and Save. A saved description edit must retain eligibility and discount value.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, discounts

**Preconditions:**

* The Organizer has Manage Events in the selected venue.
* Select an unused regular Discount Code on one standalone ticket type, $5 applied to each ticket, and Online public checkout allowed. Record its code, description, selected event/ticket, limits, dates and locations.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → Discounts. | Selected venue | Discount management and Create discount are shown. |
| Select Edit for the recorded regular code. | Recorded code | The existing form shows details, amount/application, eligibility, limits, active dates, Accepted Locations and Save. |
| Change Description. | Append a short distinguishable note to the recorded description. | Only the description is changed. |
| Select Save. | Same discount | The save succeeds. |
| Leave the form and reopen Edit for the same code. | Recorded code | The changed description persists and the recorded discount value, eligibility, dates, limits and locations remain unchanged. |

**Postconditions:**

* Restore the original description and reopen to prove restoration.
* No BOGO is configured by this case; no purchase or discount deletion is performed.
