---
title: Event Discovery Test Cases
tags:
  - qa/test-cases
---

# Event Discovery Test Cases

Use the actual starting client and carry the exact Event/occurrence into the next check. Public search, a city calendar and the native **Explore** feed can expose different behavior. [[00 Start Here/Showpass QA Handbook/Playbooks/11 Event Sales Calendars and Availability|Event and calendar guide]] · [[03 Test Cases/Test Cases by Feature|Feature index]]

| Starting surface | What to verify | Case reference |
| --- | --- | --- |
| Public homepage | Browse Popular Cities and search, follow the expected result, and return to a usable homepage. | [SPT-204](https://app.qase.io/case/SPT-204) |
| Public discovery search | Set date, category and location. Check active chips, public-only results, empty results and the next page. | [SPT-4790](https://app.qase.io/case/SPT-4790) |
| Public discovery date filter | Verify the browser’s local dates, the UTC range sent in the request and URL, and the matching filter chips after reload. | [SPT-5821](https://app.qase.io/case/SPT-5821) · [[03 Test Cases/Calendar/SPW-20023 Missing Calendar Tag Edge Cases|Calendar tag coverage]] |
| React Native Public → Explore | Open the feed signed out and signed in and verify the correct public details or a valid empty state. | [SPT-3967](https://app.qase.io/case/SPT-3967) |

An Organizer’s saved availability or visibility changes what a visitor can discover, what they can buy, and whether they reach an eligible waitlist. Carry the saved Event and Ticket Type into the [[03 Test Cases/Test Cases by Feature#Connected feature journeys|purchase or waitlist journey]] when that outcome is in scope. These references identify saved cases and local coverage.

### TC-1: Recover a search link with an invalid end date

**Title:** Web Public - Discovery - Keep valid filters when a search link has an invalid end date

**Description:** A shared search link can contain an invalid end date. The visitor still gets results for the saved search term and valid start date, including after returning from Event details or reloading.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* Use English Showpass Web Public in an approved test environment. Start signed out in a desktop browser.
* Use two future public Events with the same unique phrase in both titles and distinct names. The earlier Event ends before the later Event starts by at least one full day. Record both titles and the later Event’s start date in the browser’s local calendar.

**Postconditions:** Close the test browser context. Both Events remain as prepared.

**Tags:** public, discovery, search-filters

| Step Action | Data | Expected Result |
| --- | --- | --- |
| On the Showpass homepage, enter the shared phrase and submit **Search**. | Shared phrase from the two Event titles | Search results open and both recorded Events appear. |
| Under **Date Range**, select **Select a date** and choose the later Event’s recorded date as the start and the following day as the end. | Later Event’s start date and the following day | **Search Terms**, **Start Date** and **End Date** chips appear. The later Event is listed and the earlier Event is absent. The address includes `ends_on__gte` and `starts_on__lte`. |
| In the browser address bar, replace only the value after `starts_on__lte=` with `invalid-end`. Keep the rest of the address and load it. | Same search URL with `starts_on__lte=invalid-end` | The page loads normally and removes `starts_on__lte` from the address. **Search Terms** and **Start Date** retain their previous values. **End Date** is absent. The later Event is listed and the earlier Event is absent. |
| Open the later Event from the result card. | Recorded title of the later Event | The details page opens for that Event. |
| Use browser **Back**. | Same search result page | The **Search Terms** and **Start Date** chips and both Event visibility checks match the recovered results. **End Date** stays absent. |
| Reload the recovered search result page. | Same address | The remaining two chips and both Event visibility checks still match the recovered results. **End Date** stays absent. |

## Proof and sources

**Execution:** Not run. This local draft covers recovery from a malformed saved search link. The SPT project snapshot contained 2,492 definitions. [SPT-5821](https://app.qase.io/case/SPT-5821) verifies valid quick-date controls, timezone boundaries and reload. [SPT-4790](https://app.qase.io/case/SPT-4790) covers manually removing a filter and empty results. [SPT-4282](https://app.qase.io/case/SPT-4282) covers changing dates in the picker. [SPT-3281](https://app.qase.io/case/SPT-3281) covers unmatched search text and generic malformed queries. None of those definitions verifies dropping a malformed date value while applying the other criteria.

Source at frontend `5867dd39dcde15e7424625faee03d583860ab437` validates and normalizes the URL before using its search values. The component test checks remaining chips after cleanup, navigation and reload. Backend `b8dcfa8726db12b759e7960f07455c2e7b8fa8b7` applies public Event filters to the listing. [Date normalization](<../../../showpass-frontend/packages/core/src/app-contexts/public/features/discovery/utils/search-date-query.ts#L48>) · [Search page regression](<../../../showpass-frontend/packages/core/src/app-contexts/public/features/discovery/ui/pages/SearchPage.test.tsx#L114>) · [Public Event filter](<../../../web-app/apps/tickets/api/public/filters/events.py#L33>)
