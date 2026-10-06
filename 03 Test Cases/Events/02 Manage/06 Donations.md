---
title: Event — Donations
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Donations

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration coverage

Existing SPT-780/782/783/3300 cover setup, currency rejection, attractions and prior-order preservation. SPT-5112/5113 add native-page eligibility intent, but their current steps have missing/misaligned expected results; use the concrete cases here, not their titles as proof.

Native access additionally checks Manage Financials, a supported system gateway, CAD/USD, and a non-child event. Fields: charity search/selection/clear, Suggested donation amount (excluding Other), Display verbiage (1024 characters), Save/Discard. Record the currency and gateway before execution; never change an organization's live gateway to make the page available. A saved charity is not proof of a completed donation payment.

Sources: [charity validation called by event serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [native eligibility](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/donations/utils/event-donations-utils.ts>), [donation fields](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/donations/utils/event-donations-form-fields.ts>).

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-780](https://app.qase.io/case/SPT-780) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-782](https://app.qase.io/case/SPT-782) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-783](https://app.qase.io/case/SPT-783) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-3300](https://app.qase.io/case/SPT-3300) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |

### SPT-780: Dashboard - Events - Configure charitable donations

**Description:** Validates the source-backed Charitable Donations controls for supported CAD and USD venues: one charity, one suggested default amount, and checkout display verbiage.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The organizer has Manage Financials; the venue uses the system payment gateway and `Currency`; a future event and searchable test charity exist.

**Postconditions:** Clear the test charity or restore the original donation settings; release the basket.

**Tags:** dashboard, donations, checkout

**Parameters:**

Currency: CAD, USD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Charitable Donations** for the event. | Venue currency `Currency` | Select a Charity, Suggested Donation Amount, and Display Verbiage are available. |
| Select the test charity and configure its display. | Suggested amount `10`; verbiage `Support our charity <suffix>` | Amount and verbiage become editable after charity selection. |
| Save once and reopen the section. | Same event | Charity, suggested amount, and verbiage persist. |
| Start public checkout. | One event ticket | The selected charity, exact verbiage, and suggested `10 Currency` donation appear. |
| Change the donation to a valid custom amount without purchasing. | `15 Currency` | Checkout accepts the custom donation amount in the venue currency. |

### SPT-782: Dashboard - Events - Hide charitable donations for unsupported currencies

**Description:** Validates the source-backed visibility rule: Charitable Donations is available only when the system gateway venue currency is CAD or USD.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** The organizer has Manage Financials; an editable event belongs to a system-gateway venue using `UnsupportedCurrency`.

**Postconditions:** No data is changed.

**Tags:** dashboard, donations, edge-case

**Parameters:**

UnsupportedCurrency: EUR, GBP, OtherNonCADOrUSD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the full event editor for the unsupported-currency venue. | `UnsupportedCurrency` | The correct event and venue are shown. |
| Review the edit navigation and page sections. | None | **Charitable Donations** is absent; no enabled charity/amount controls are exposed. |
| Reopen the event after a normal no-op navigation. | Same event | Donations remain unavailable and no donation configuration was added. |

### SPT-783: Dashboard - Attraction Event - Configure charitable donations

**Description:** Validates donation persistence and buyer output on an attraction-style event without expanding attraction configuration itself.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A supported CAD or USD venue uses the system gateway, the organizer has Manage Financials, and an editable attraction event exists.

**Postconditions:** Restore the attraction event's original donation configuration.

**Tags:** dashboard, donations, attraction

**Parameters:**

Currency: CAD, USD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Charitable Donations** for the attraction event. | Venue currency `Currency` | The standard charity, suggested amount, and verbiage controls are available. |
| Select the test charity and save a suggested amount and verbiage. | `10 Currency`; `Attraction charity <suffix>` | The values are accepted. |
| Save once and reopen the event. | Same attraction event | Donation values persist after a fresh read. |
| Start the attraction buyer flow and reach checkout without purchasing. | One eligible date/time and ticket | The configured charity, verbiage, and suggested amount appear in `Currency`. |

### SPT-3300: Dashboard - Events - Change donations without rewriting a prior order

**Description:** Validates that an active event's new donation configuration reaches later checkouts while a completed prior donation remains financially unchanged. This repairs the current case's shifted and missing expected results.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** An active CAD or USD event has charity A, suggested amount `10`, verbiage A, and one completed order containing a `10` donation.

**Postconditions:** Restore the event's original donation display. Retain the financial test order for audit.

**Tags:** dashboard, donations, transactions

**Parameters:**

Currency: CAD, USD

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record the completed order's charity and donation amount. | Order A; `10 Currency` | The historical donation is known before editing. |
| Change the event's Suggested Donation Amount and Display Verbiage. | `20 Currency`; `Updated charity message <suffix>` | The new display values are accepted. |
| Save once and reopen **Charitable Donations**. | Same event | The updated `20` and verbiage persist. |
| Start a new public checkout without completing it. | One ticket | Checkout shows the updated message and suggests `20 Currency`. |
| Reopen Order A in Transactions. | Recorded order | Its charity, `10 Currency` donation, and totals remain unchanged. |
