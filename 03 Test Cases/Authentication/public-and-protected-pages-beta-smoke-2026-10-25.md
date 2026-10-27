---
title: Public pages — beta smoke
date: 2026-10-25
tags:
  - qa/browser-testing
  - authentication
  - localization
---

# Browser Test Report: Public pages on beta

## Overview

- **What worked:** Five public purchase flows reached checkout: seated event, membership, product, general-admission ticket and custom seated package. No payment was submitted.
- **What failed:** Four confirmed public-page bugs leave application text in English after choosing French. See the bug summary below.
- **Widget result:** The ready event reached checkout through the actual widget tool in an English modal and a French embedded view. Fresh hosted checkout was empty after cleanup.
- **What remains uncertain:** The membership widget's season dates differ by one day from the full page. Special-link pages and other untested variations are listed in [TC-19](#tc-19-public-pages-needing-special-records-or-links). This run does not establish full release readiness.
- **Scope:** Public pages only; no login is needed. [Earlier protected checks](#earlier-protected-checks-outside-current-scope) remain separate, outside the current recommendation. The earlier [protected Dashboard language report](protected-dashboard-english-french-beta-smoke-2026-10-25.md) is unchanged.

**Read this report:** Start with the bugs below, use the [test index](#test-index) to follow the steps and screenshots, or jump to [all results](#results).

## Confirmed public-page bugs

Each row is one distinct bug. Several failed checks can point to the same bug.

| Bug and reproduction | Where | What went wrong |
| --- | --- | --- |
| [BUG-01](#bug-01-jira-draft) | Shared public controls and calendar | Search, footer headings and the calendar availability legend still contain English in French. |
| [BUG-02](#bug-02-jira-draft) | Checkout language switch | Switching an already-open English checkout to French leaves the progress labels in English. A freshly opened French checkout worked. |
| [BUG-03](#bug-03-jira-draft) | Membership purchase and seating | Purchase buttons, seat-selection instructions and other application labels contain English in French. |
| [BUG-05](#bug-05-jira-draft) | Public error pages | French 404/500 pages show English explanations and recovery controls. |

**Other observations:**

- **Outside this scope:** BUG-04 belongs to the earlier protected checks.
- **Known issue:** The first French general-admission reservation hit the high-demand error. A later English reservation and French checkout handoff worked. The user confirmed that the error is known and is not being fixed.
- **Deprecated control:** The widget tool's standalone Cart button is not a bug.
- **Unconfirmed:** The membership season-date difference needs the intended timezone rule before we can call it a bug.

**Report update:** This layout update clarifies the October 25 run; it does not represent a new test run.

## Test index

**Latest widget follow-up:**

- [TC-21 — Widget host setup](#tc-21-widget-host-setup)
- [TC-22 — Mounted calendar reaches checkout](#tc-22-mounted-calendar-reaches-checkout)
- [TC-23 — Ready event modal retains the ticket](#tc-23-ready-event-modal-retains-the-ticket)
- [TC-24 — French ready event with Embedded checked](#tc-24-french-ready-event-with-embedded-checked)

Select a test to see its exact starting screen, actions, expected result and evidence. Local TC numbers below are report references, not Qase IDs.

- [TC-01 — Public homepage and language switch](#tc-01-public-homepage-and-language-switch)
- [TC-02 — Event search and city discovery](#tc-02-event-search-and-city-discovery)
- [TC-03 — Organizer profile tabs](#tc-03-organizer-profile-tabs)
- [TC-04 — Seated event to checkout](#tc-04-seated-event-to-checkout)
- [TC-05 — Membership to checkout](#tc-05-membership-to-checkout)
- [TC-06 — Product variant to checkout](#tc-06-product-variant-to-checkout)
- [TC-07 — Gift card purchase forms](#tc-07-gift-card-purchase-forms)
- [TC-08 — General admission to checkout](#tc-08-general-admission-to-checkout)
- [TC-09 — Public login signup and password reset](#tc-09-public-login-signup-and-password-reset)
- [TC-13 — Confirmation and refund entry pages](#tc-13-confirmation-and-refund-entry-pages)
- [TC-14 — Embedded purchase and calendar entry pages](#tc-14-embedded-purchase-and-calendar-entry-pages)
- [TC-15 — Package picker and required selections](#tc-15-package-picker-and-required-selections)
- [TC-16 — Signed out proof and final cleanup](#tc-16-signed-out-proof-and-final-cleanup)
- [TC-17 — Public error pages in French](#tc-17-public-error-pages-in-french)
- [TC-18 — Public suborganization application form](#tc-18-public-suborganization-application-form)
- [TC-19 — Public pages needing special records or links](#tc-19-public-pages-needing-special-records-or-links)

[Earlier protected checks — outside current scope](#earlier-protected-checks-outside-current-scope). TC-20 was removed from the active plan when the user clarified public pages only.

## Setup and boundaries

- **Environment/date:** beta.showpass.com, October 25, 2026, America/Edmonton. Evidence captures start at 2026-10-25, 18:23:41. The deployed Next.js version and release commit were not independently verified. No version-bump PR/diff was supplied for this run.
- **Browser:** Codex in-app sidebar, desktop screenshots; capture dimensions vary with the sidebar size. One separate test tab was used serially. The original user tab was preserved. No headless runner, external browser, build or development server was launched. No mobile viewport or physical-device check was run.
- **Session:** signed out before and after testing. The profile endpoint returned an unauthenticated response. No credentials were entered and no new sign-in was performed.
- **Records:** user-supplied seated event and membership Goood Old Hockeeeyyyyyyyyy; public Organizer Once; T Shirt → XXL; Ta event for system gateway (charge api) → ga. These are existing records; their saved setup was preserved.
- **Allowed changes:** temporary cart items and seat reservations needed to reach checkout. Each was removed; fresh checkout confirmed empty. No purchases, emails, account/organizer applications, refunds, saved card changes, permissions, report jobs, Qase writes or Jira writes.
- **Checkout boundary:** stop before submitting customer details or payment. Opening checkout proves purchase entry, not a completed sale, delivered ticket, member benefit, Showpass earnings or downstream stock ownership.
- **Unique cases:** select distinct page and purchase behaviors instead of repeating hundreds of equivalent URLs. Every selected public check is accounted for below. Untested token/record-dependent pages and other public variations are listed in TC-19.
- **French boundary:** distinguish application labels from organizer-written event names, level names, descriptions and refund policies. This is a functional translation smoke, not a professional language-quality review.
- **Evidence:** screenshots remain local and ignored by Git. Images below display at 480px; select an image to open its full-size original. Some early loading/intermediate captures are preserved locally but are not used as final-state proof.

<a id="tc-01-public-homepage-and-language-switch"></a>
## TC-01 Public homepage and language switch

**What this tests:** A visitor can open the homepage, switch language and find the main search and account controls.

**Start here:** Signed out on the beta homepage. No cart items.

### Steps

<a id="tc-01-step-1"></a>
1. **Open [the English homepage](https://beta.showpass.com/).**

   **Expected:** Search events, Date, Search, Create Account and Log In are available. Popular cities and event cards load.

   **Actual — Passed:** The homepage loaded with its search and public navigation.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/00-english-public-homepage.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/00-english-public-homepage.jpg" alt="English public homepage" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:23:41 America/Edmonton · [captured page](https://beta.showpass.com/).*

<a id="tc-01-step-2"></a>
2. **Open the EN language menu and select French.**

   **Expected:** The address becomes /fr/. The search, account links, section headings and footer use French.

   **Actual — Failed:** The page switched to French. Rechercher des événements, Créer un compte and Se connecter appeared, but the Search button stayed English. See BUG-01.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/01-public-language-menu.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/01-public-language-menu.jpg" alt="Public language menu" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:23:56 America/Edmonton · [captured page](https://beta.showpass.com/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/02-french-public-homepage.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/02-french-public-homepage.jpg" alt="French public homepage" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:24:20 America/Edmonton · [captured page](https://beta.showpass.com/fr/).*

<a id="tc-01-step-3"></a>
3. **Go to the bottom of the French homepage.**

   **Expected:** Shared footer headings use French.

   **Actual — Failed:** About Showpass, Help & Support and Connect With Us stayed English while their links were translated. Organizer-entered event names are not counted as translation failures.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/03-french-public-footer.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/03-french-public-footer.jpg" alt="French public footer" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:24:39 America/Edmonton · [captured page](https://beta.showpass.com/fr/).*


### BUG-01 Jira draft

**Draft only — no Jira issue has been created.**

**Title:** fix (French public pages) | shared search footer and calendar labels remain English

**GIVEN** a signed-out visitor has selected French on beta.

**WHEN** they open the French homepage, search results or Once calendar widget.

**THEN — observed:** The homepage button says Search. Footer headings say About Showpass, Help & Support and Connect With Us. Search results retain Search Terms and Highly recommended by. The French calendar legend retains Available and Over …% sold.

**Expected:** Application controls and shared labels use French. Organizer-written names and descriptions may remain as written.

**Impact:** French customers must interpret a mixed-language interface while searching or choosing dates.

**Tested on:** beta, Codex browser sidebar, desktop, signed out, October 25, 2026 (America/Edmonton).

**Evidence:** [TC-01 steps 2–3](#tc-01-step-2), [TC-02 step 1](#tc-02-step-1) and [TC-14 step 3](#tc-14-step-3). Screenshots are beneath those steps.

**Verification limit:** This confirms missing interface translations. It does not establish that these labels were introduced by the version bump. No professional French-language review was performed.

**Data safety and cleanup:** No data change. Test cart items from the purchase checks were removed.


<a id="tc-02-event-search-and-city-discovery"></a>
## TC-02 Event search and city discovery

**What this tests:** A visitor can search for an event, open a result, browse a city and return home without losing French.

**Start here:** Signed out on the French homepage. Search for Ta event for system gateway.

### Steps

<a id="tc-02-step-1"></a>
1. **Enter Ta event for system gateway in Rechercher des événements and select Search.**

   **Expected:** The French result page shows matching event cards, the search term and working filter controls.

   **Actual — Passed:** The French search results loaded, including Ta event for system gateway (charge api). The fixed Search Terms label and recommendation text still contained English; these belong to BUG-01.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/42-french-search-results.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/42-french-search-results.jpg" alt="french search results" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:33:08 America/Edmonton · [captured page](https://beta.showpass.com/fr/s/events/all/?search_string=Ta+event+for+system+gateway).*

<a id="tc-02-step-2"></a>
2. **Select Ta event for system gateway (charge api) from those results.**

   **Expected:** The event opens in French with the same name and 110,03 $ CAD price.

   **Actual — Passed:** The result opened the correct event at a /fr/ address. Ticket selection is covered separately in TC-08.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/44-french-single-day-event-loaded.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/44-french-single-day-event-loaded.jpg" alt="french single day event loaded" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:33:21 America/Edmonton · [captured page](https://beta.showpass.com/fr/ta-event-for-system-gateway-charge-api-2/?source_channel=non_discovery).*

<a id="tc-02-step-3"></a>
3. **Open [the same search in English](https://beta.showpass.com/s/events/all/?search_string=Ta+event+for+system+gateway).**

   **Expected:** The matching event cards and search controls load in English.

   **Actual — Passed:** The same search worked in English.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/52-english-search-results.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/52-english-search-results.jpg" alt="english search results" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:34:39 America/Edmonton · [captured page](https://beta.showpass.com/s/events/all/?search_string=Ta+event+for+system+gateway).*

<a id="tc-02-step-4"></a>
4. **Open [Calgary discovery in French](https://beta.showpass.com/fr/discover/calgary/). Select the visible Organismes de bienfaisance et causes category.**

   **Expected:** City content and category results load in French.

   **Actual — Passed:** The city page and charity category loaded with French headings, dates and currency. Off-screen carousel links were not counted as successful clicks.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/53-french-city-discovery.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/53-french-city-discovery.jpg" alt="french city discovery" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:34:47 America/Edmonton · [captured page](https://beta.showpass.com/fr/discover/calgary/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/55-french-charity-category-loaded.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/55-french-charity-category-loaded.jpg" alt="french charity category loaded" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:17 America/Edmonton · [captured page](https://beta.showpass.com/fr/discover/calgary/charity-and-causes/).*

<a id="tc-02-step-5"></a>
5. **On the French category page, select the Accueil breadcrumb. Then open [Calgary discovery in English](https://beta.showpass.com/discover/calgary/).**

   **Expected:** Accueil returns to the French homepage. The English city page also loads.

   **Actual — Passed:** Accueil correctly returned to /fr/, despite its unprefixed link address. The English city page loaded. No language-loss bug was confirmed for this breadcrumb.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/56-french-breadcrumb-preserves-language.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/56-french-breadcrumb-preserves-language.jpg" alt="french breadcrumb preserves language" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:31 America/Edmonton · [captured page](https://beta.showpass.com/fr/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/57-english-city-discovery.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/57-english-city-discovery.jpg" alt="english city discovery" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:34 America/Edmonton · [captured page](https://beta.showpass.com/discover/calgary/).*



<a id="tc-03-organizer-profile-tabs"></a>
## TC-03 Organizer profile tabs

**What this tests:** The new public organizer profile exposes its Events, Memberships, Products, Gift Cards and About screens.

**Start here:** Signed out. Organizer Once. The event’s visible Once link currently opens the older /o/once/ profile; the new profile is checked directly.

### Steps

<a id="tc-03-step-1"></a>
1. **Select Once from the seated event.**

   **Expected:** The organizer profile opens. Record which version is actually reached.

   **Actual — Passed:** The visible link opened the older /o/once/ profile. This does not prove the new profile is reachable from that link.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/29-organizer-link-current-legacy-page.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/29-organizer-link-current-legacy-page.jpg" alt="organizer link current legacy page" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:31 America/Edmonton · [captured page](https://beta.showpass.com/o/once/).*

<a id="tc-03-step-2"></a>
2. **Open [the new Once profile](https://beta.showpass.com/org/new/once/). Select Memberships.**

   **Expected:** Events lists upcoming events. Memberships lists membership offerings.

   **Actual — Passed:** Both lists loaded. Products and Gift Cards are exercised in TC-06 and TC-07.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/30-new-organizer-events.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/30-new-organizer-events.jpg" alt="new organizer events" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:39 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/31-organizer-memberships.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/31-organizer-memberships.jpg" alt="organizer memberships" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:43 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/memberships/).*

<a id="tc-03-step-3"></a>
3. **Open [the French Once profile](https://beta.showpass.com/fr/org/new/once/). Select Adhésions.**

   **Expected:** French tabs and event/membership cards are visible.

   **Actual — Passed:** Événements, Adhésions, Produits, Cartes-cadeaux and À propos were available. Event and membership listings loaded.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/104-french-organizer-events.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/104-french-organizer-events.jpg" alt="french organizer events" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:42:01 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/105-french-organizer-memberships.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/105-french-organizer-memberships.jpg" alt="french organizer memberships" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:42:01 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/memberships/).*

<a id="tc-03-step-4"></a>
4. **Open About / À propos in each language.**

   **Expected:** The organizer description is visible and interface labels use the chosen language. Organizer-written text does not need automatic translation.

   **Actual — Passed:** Both About screens loaded. The English Lorem Ipsum description is organizer content, not a confirmed application translation bug.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/106-english-organizer-about.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/106-english-organizer-about.jpg" alt="english organizer about" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:42:04 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/about/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/103-french-organizer-about.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/103-french-organizer-about.jpg" alt="french organizer about" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:27 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/about/).*

<a id="tc-03-step-5"></a>
5. **Open the verified T Shirt category directly in [English](https://beta.showpass.com/org/new/once/categories/2324/) and [French](https://beta.showpass.com/fr/org/new/once/categories/2324/).**

   **Expected:** The category entry point renders the organizer’s product screen with T Shirt available.

   **Actual — Passed:** Both addresses loaded the product screen and T Shirt card. The category identifier was read from the public product response, not guessed. Filtering against a different category was not tested.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/123-en-organizer-product-category.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/123-en-organizer-product-category.jpg" alt="en organizer product category" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:56:05 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/categories/2324/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/124-fr-organizer-product-category.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/124-fr-organizer-product-category.jpg" alt="fr organizer product category" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:56:07 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/categories/2324/).*



<a id="tc-04-seated-event-to-checkout"></a>
## TC-04 Seated event to checkout

**What this tests:** A visitor can choose a performance and exact seat, reach checkout, keep the selection when switching to French and remove the test ticket.

**Start here:** Signed out. [Goood Old Hockeeeyyyyyyyyy](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-4/), Organizer Once. Cart initially empty.

### Steps

<a id="tc-04-step-1"></a>
1. **Open the supplied event and select Buy Tickets.**

   **Expected:** A recurring-event calendar appears with available dates and CAD prices. Checkout is disabled before an item is selected.

   **Actual — Passed:** The event and date calendar loaded.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/04-english-seated-event-details.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/04-english-seated-event-details.jpg" alt="English seated event details" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:24:48 America/Edmonton · [captured page](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-4/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/05-english-seated-event-date-calendar.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/05-english-seated-event-date-calendar.jpg" alt="English seated event date calendar" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:24:56 America/Edmonton · [captured page](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-4/).*

<a id="tc-04-step-2"></a>
2. **Choose Friday December 11, 2026. Select Find seats. In Tickets, select one Centre Ice - Front ticket. Close the ticket filter with its X to see the map.**

   **Expected:** The performance is Dec 11, 2026, 11:00 AM–1:00 PM CT. The map offers seats priced at $25.99 CAD.

   **Actual — Passed:** The map loaded and offered Centre Ice - Front seats. During exploration, Continue in the ticket-filter dialog returned to the date wizard; reopening Find seats and closing only that filter exposed the map. That behavior was not treated as a confirmed bug without further investigation.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/06-seating-ticket-type-selection.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/06-seating-ticket-type-selection.jpg" alt="seating ticket type selection" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:27:18 America/Edmonton · [captured page](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-4/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/09-seating-map-and-seat-suggestions.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/09-seating-map-and-seat-suggestions.jpg" alt="seating map and seat suggestions" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:28:29 America/Edmonton · [captured page](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-4/).*

<a id="tc-04-step-3"></a>
3. **Select the suggested Section 4, Row 7, Seat 5.**

   **Expected:** Selected seats shows exactly that seat and a $25.99 subtotal. It explains that the ticket is not reserved until Continue.

   **Actual — Passed:** The selected seat, ticket type and subtotal matched.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/10-selected-seat-before-reservation.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/10-selected-seat-before-reservation.jpg" alt="selected seat before reservation" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:28:36 America/Edmonton · [captured page](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-4/).*

<a id="tc-04-step-4"></a>
4. **Select Continue | 1. On checkout, select Continue as guest. Do not enter or submit customer details.**

   **Expected:** Checkout opens with one item for $25.99 CAD and a blank guest-details form.

   **Actual — Passed:** Checkout was reached. The blank Full name, Email address and Phone number fields appeared. No payment or order was submitted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/11-seated-ticket-checkout-login.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/11-seated-ticket-checkout-login.jpg" alt="seated ticket checkout login" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:28:46 America/Edmonton · [captured page](https://beta.showpass.com/checkout/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/12-seating-checkout-guest-details.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/12-seating-checkout-guest-details.jpg" alt="seating checkout guest details" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:28:50 America/Edmonton · [captured page](https://beta.showpass.com/checkout/).*

<a id="tc-04-step-5"></a>
5. **Use the checkout language menu to select French.**

   **Expected:** The cart retains one item and the same amount. All checkout interface labels use French.

   **Actual — Failed:** The guest form changed to French and the cart stayed at one item, $25,99 CAD. The progress labels Log in, Add-ons, Review and Payment stayed English. Functional handoff passed; translation failed. See BUG-02.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/13-seating-french-guest-checkout.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/13-seating-french-guest-checkout.jpg" alt="seating french guest checkout" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:29:01 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*

<a id="tc-04-step-6"></a>
6. **Return to [the French event](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-4/). Select Acheter des Billets, December 11, Trouver des sièges, then close the Tickets filter. Select Voir le panier | 1.**

   **Expected:** The cart still identifies Dec 11 at 11:00 AM CT, Centre Ice - Front, Section 4, Row 7, Seat 5.

   **Actual — Passed:** The French date picker, map and cart summary retained the exact performance and seat.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/15-french-seating-date-picker.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/15-french-seating-date-picker.jpg" alt="french seating date picker" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:29:21 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-4/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/17-reserved-seat-cart-summary.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/17-reserved-seat-cart-summary.jpg" alt="reserved seat cart summary" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:29:49 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-4/).*

<a id="tc-04-step-7"></a>
7. **Select Supprimer for that seat. Open [checkout afresh](https://beta.showpass.com/checkout/).**

   **Expected:** The test ticket is removed and checkout shows an empty cart.

   **Actual — Passed:** The cart item disappeared. Fresh checkout showed Oops! Your cart is empty! Availability of that exact seat to a different buyer was not checked.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/19-fresh-checkout-confirms-empty-cart.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/19-fresh-checkout-confirms-empty-cart.jpg" alt="fresh checkout confirms empty cart" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:30:06 America/Edmonton · [captured page](https://beta.showpass.com/checkout/).*


### BUG-02 Jira draft

**Draft only — no Jira issue has been created.**

**Title:** fix (French checkout) | progress labels remain English after selecting French

**GIVEN** a visitor has one test ticket or membership in checkout on beta.

**WHEN** they use the checkout language menu to select French.

**THEN — observed:** The form and cart translate, but the checkout progress labels remain Log in, Add-ons, Review and Payment for a ticket, or Log in, Review, Questions and Payment for the membership.

**Expected:** The progress labels use French along with the rest of checkout.

**Impact:** French customers must interpret English steps while completing a purchase.

**Tested on:** beta, Codex browser sidebar, desktop, signed out, October 25, 2026 (America/Edmonton).

**Evidence:** [TC-04 step 5](#tc-04-step-5) and [TC-05 step 4](#tc-05-step-4).

**Verification limit:** No payment was submitted. The cart amount and item count remained correct at the stage inspected.

**Data safety and cleanup:** Changes test data: one reversible cart item. Removed afterward; fresh checkout confirmed empty.

**Later clarification:** [TC-15 step 9](#tc-15-step-9) opened checkout directly in French and its progress labels translated correctly. Keep BUG-02 scoped to changing language on an already-open checkout.


<a id="tc-05-membership-to-checkout"></a>
## TC-05 Membership to checkout

**What this tests:** The supplied membership can be selected by seat and carried into checkout without changing its level, season or displayed amount.

**Start here:** Signed out. [Goood Old Hockeeeyyyyyyyyy membership](https://beta.showpass.com/m/goood-old-hockeeeyyyyyyyyy/), Organizer Once. Cart empty after TC-04.

### Steps

<a id="tc-05-step-1"></a>
1. **Open the supplied membership and select BUY MEMBERSHIPS.**

   **Expected:** The page shows its season, price range and membership map. Checkout is disabled before a seat is chosen.

   **Actual — Passed:** The detail page showed Dec 7, 2026–Jan 31, 2027 and $379.81–$569.81 CAD. Season 1 and the map loaded.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/20-english-membership-details.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/20-english-membership-details.jpg" alt="english membership details" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:30:15 America/Edmonton · [captured page](https://beta.showpass.com/m/goood-old-hockeeeyyyyyyyyy/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/21-membership-seat-map-empty.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/21-membership-seat-map-empty.jpg" alt="membership seat map empty" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:30:27 America/Edmonton · [captured page](https://beta.showpass.com/m/goood-old-hockeeeyyyyyyyyy/seating/).*

<a id="tc-05-step-2"></a>
2. **Select an available Centre Ice - Front seat. In this run it was Section 2, Row 4, Seat 4.**

   **Expected:** The selected seat, Centre Ice - Front level and $493.81 CAD amount appear.

   **Actual — Passed:** Success: Item(s) added to cart! appeared. The exact seat, level and amount were shown.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/22-membership-selected-seat.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/22-membership-selected-seat.jpg" alt="membership selected seat" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:30:34 America/Edmonton · [captured page](https://beta.showpass.com/m/goood-old-hockeeeyyyyyyyyy/seating/).*

<a id="tc-05-step-3"></a>
3. **Select Checkout | 1. Stop at the login/guest choice.**

   **Expected:** Checkout shows one membership item at $493.81 CAD.

   **Actual — Passed:** Checkout opened with one item and the same amount. The membership flow includes Review, Questions and Payment stages; those later stages were not executed.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/23-membership-english-checkout.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/23-membership-english-checkout.jpg" alt="membership english checkout" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:30:51 America/Edmonton · [captured page](https://beta.showpass.com/checkout/).*

<a id="tc-05-step-4"></a>
4. **Select French from the checkout language menu.**

   **Expected:** The same cart remains, with French login labels and $493,81 CAD.

   **Actual — Failed:** The cart and amount remained correct, and the login fields translated. The progress labels stayed English, as in BUG-02.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/24-membership-french-checkout.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/24-membership-french-checkout.jpg" alt="membership french checkout" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:30:59 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*

<a id="tc-05-step-5"></a>
5. **Open [the French membership](https://beta.showpass.com/fr/m/goood-old-hockeeeyyyyyyyyy/), select BUY ADHÉSIONS and inspect the selected seat on the map.**

   **Expected:** The same membership and seat remain. Purchase and map controls use French.

   **Actual — Failed:** The seat and $493,81 amount remained correct. BUY ADHÉSIONS, More Info, 1 items selected and the map control labels contained English. See BUG-03.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/25-french-membership-details.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/25-french-membership-details.jpg" alt="french membership details" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:05 America/Edmonton · [captured page](https://beta.showpass.com/fr/m/goood-old-hockeeeyyyyyyyyy/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/26-french-membership-seat-retained.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/26-french-membership-seat-retained.jpg" alt="french membership seat retained" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:11 America/Edmonton · [captured page](https://beta.showpass.com/fr/m/goood-old-hockeeeyyyyyyyyy/seating/).*

<a id="tc-05-step-6"></a>
6. **Select Retirer l’objet for the test membership. Open [French checkout afresh](https://beta.showpass.com/fr/checkout/).**

   **Expected:** The membership is removed, the map total becomes $0,00 and fresh checkout is empty.

   **Actual — Passed:** The selected row disappeared, map total became zero and checkout said Oups ! Votre panier est vide ! No membership was purchased.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/27-membership-removed.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/27-membership-removed.jpg" alt="membership removed" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:16 America/Edmonton · [captured page](https://beta.showpass.com/fr/m/goood-old-hockeeeyyyyyyyyy/seating/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/28-membership-fresh-empty-checkout.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/28-membership-fresh-empty-checkout.jpg" alt="membership fresh empty checkout" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:23 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*


### BUG-03 Jira draft

**Draft only — no Jira issue has been created.**

**Title:** fix (French memberships) | purchase and seating controls contain English

**GIVEN** a signed-out visitor opens the supplied French Goood Old Hockeeeyyyyyyyyy membership on beta.

**WHEN** they view the membership details, select BUY ADHÉSIONS and inspect the seating page.

**THEN — observed:** The purchase button mixes BUY with ADHÉSIONS. The full seating page retains More Info, Select a seat or 1 items selected and English map control labels. The French membership widget also retains Assigned Seating in its step heading.

**Expected:** The membership purchase and seating controls use French.

**Impact:** French customers receive mixed-language instructions while choosing a membership seat.

**Tested on:** beta, Codex browser sidebar, desktop, signed out, October 25, 2026 (America/Edmonton).

**Evidence:** [TC-05 step 5](#tc-05-step-5), [TC-05 step 6](#tc-05-step-6) and [TC-14 step 2](#tc-14-step-2).

**Verification limit:** The separate season-date difference is unresolved and is not part of this confirmed translation bug. Organizer-written Season 1 and level names are not treated as missing translations.

**Data safety and cleanup:** Changes test data: one reversible membership cart selection. Removed and fresh empty cart verified.


<a id="tc-06-product-variant-to-checkout"></a>
## TC-06 Product variant to checkout

**What this tests:** A product keeps its exact variant and quantity when opened in French and carried to checkout.

**Start here:** Signed out. [Once → Products](https://beta.showpass.com/org/new/once/products/). Cart empty.

### Steps

<a id="tc-06-step-1"></a>
1. **Open T Shirt from Products. Inspect XXL and XL.**

   **Expected:** The two options have separate quantities and prices.

   **Actual — Passed:** XXL was $15.00 CAD; XL showed $15.00 plus $1.19 fees, $16.19 before applicable checkout taxes. Both quantities started at zero.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/32-public-products-list.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/32-public-products-list.jpg" alt="public products list" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:55 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/products/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/33-product-variants.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/33-product-variants.jpg" alt="product variants" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:31:59 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/products/).*

<a id="tc-06-step-2"></a>
2. **Increase XXL to 1, leave XL at 0, and select Add. Select Checkout | 1.**

   **Expected:** Checkout shows one item for $15.00 CAD.

   **Actual — Passed:** The product was added and checkout opened with one item for $15.00 CAD. No payment was submitted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/34-product-added.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/34-product-added.jpg" alt="product added" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:09 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/products/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/35-product-english-checkout.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/35-product-english-checkout.jpg" alt="product english checkout" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:09 America/Edmonton · [captured page](https://beta.showpass.com/checkout/).*

<a id="tc-06-step-3"></a>
3. **Open [French Products](https://beta.showpass.com/fr/org/new/once/products/) and reopen T Shirt.**

   **Expected:** French controls appear; XXL remains 1 and XL remains 0.

   **Actual — Passed:** The selected variant, quantities and prices were retained with French controls.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/36-french-products-list.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/36-french-products-list.jpg" alt="french products list" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:20 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/products/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/37-french-product-variant-retained.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/37-french-product-variant-retained.jpg" alt="french product variant retained" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:28 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/products/).*

<a id="tc-06-step-4"></a>
4. **Close the product dialog and select Voir le panier.**

   **Expected:** The cart names XXL - T Shirt and quantity 1.

   **Actual — Passed:** The correct variant and quantity appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/38-french-product-cart-exact-variant.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/38-french-product-cart-exact-variant.jpg" alt="french product cart exact variant" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:36 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/products/).*

<a id="tc-06-step-5"></a>
5. **Select Supprimer for XXL - T Shirt. Open French checkout afresh.**

   **Expected:** No test product remains in the cart.

   **Actual — Passed:** Fresh checkout displayed the empty-cart message.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/39-product-cleanup-empty-cart.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/39-product-cleanup-empty-cart.jpg" alt="product cleanup empty cart" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:39 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*



<a id="tc-07-gift-card-purchase-forms"></a>
## TC-07 Gift card purchase forms

**What this tests:** The public gift-card form opens from the organizer profile and its standalone page in both languages. This checks form display, not gift-card creation.

**Start here:** Signed out. Once gift card. Do not enter a recipient, send a message or select Continue.

### Steps

<a id="tc-07-step-1"></a>
1. **Open [Once → Gift Cards](https://beta.showpass.com/org/new/once/gift-cards/).**

   **Expected:** A Friend / For Me, sender, recipient, email, amount, quantity, message and delivery-date controls appear.

   **Actual — Passed:** The form loaded with $50.00 and quantity 1.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/40-english-gift-card-form.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/40-english-gift-card-form.jpg" alt="english gift card form" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:48 America/Edmonton · [captured page](https://beta.showpass.com/org/new/once/gift-cards/).*

<a id="tc-07-step-2"></a>
2. **Open [the French Gift Cards tab](https://beta.showpass.com/fr/org/new/once/gift-cards/).**

   **Expected:** The same form is available in French with 50,00 $ and quantity 1.

   **Actual — Passed:** Un ami, Pour moi, Nom de l’expéditeur, C’est pour qui ?, Courriel, Quantité, Message personnalisé, La date de livraison and Continuer appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/41-french-gift-card-form.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/41-french-gift-card-form.jpg" alt="french gift card form" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:32:51 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/gift-cards/).*

<a id="tc-07-step-3"></a>
3. **Open the standalone [English gift-card form](https://beta.showpass.com/o/once/purchase-gift-card/) and [French version](https://beta.showpass.com/fr/o/once/purchase-gift-card/).**

   **Expected:** Both direct entry points load the gift-card controls.

   **Actual — Passed:** Both forms loaded. No gift card, recipient or email was created. Validation, multi-recipient submission and payment were not run.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/97-standalone-gift-card-en.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/97-standalone-gift-card-en.jpg" alt="standalone gift card en" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:15 America/Edmonton · [captured page](https://beta.showpass.com/o/once/purchase-gift-card/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/98-standalone-gift-card-fr.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/98-standalone-gift-card-fr.jpg" alt="standalone gift card fr" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:16 America/Edmonton · [captured page](https://beta.showpass.com/fr/o/once/purchase-gift-card/).*



<a id="tc-08-general-admission-to-checkout"></a>
## TC-08 General admission to checkout

**What this tests:** A normal ticket without an assigned seat can reach checkout and retain its displayed fee breakdown in French.

**Start here:** Signed out. Ta event for system gateway (charge api), ga ticket, Nov 15, 2029 at 9:00 PM MT. Cart empty.

### Steps

<a id="tc-08-step-1"></a>
1. **From the French search results, open the event and select ACHETER DES BILLETS.**

   **Expected:** The picker shows ga at $110,03, including $100,00 base price and $10,03 fees.

   **Actual — Passed:** The correct event, ticket and displayed amounts appeared.

   Evidence: [TC-02, step 2](#tc-02-step-2) already shows this screen.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/45-french-ga-ticket-picker.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/45-french-ga-ticket-picker.jpg" alt="french ga ticket picker" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:33:30 America/Edmonton · [captured page](https://beta.showpass.com/fr/ta-event-for-system-gateway-charge-api-2/?source_channel=non_discovery).*

<a id="tc-08-step-2"></a>
2. **Increase ga from 0 to 1.**

   **Expected:** One ticket is reserved and checkout becomes available.

   **Actual — Blocked:** This attempt returned the translated high-demand error and reset quantity to zero. The user confirmed this is a known issue that is not being fixed. No new Jira draft was created.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/46-ga-reservation-rejected-french.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/46-ga-reservation-rejected-french.jpg" alt="ga reservation rejected french" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:33:49 America/Edmonton · [captured page](https://beta.showpass.com/fr/ta-event-for-system-gateway-charge-api-2/?source_channel=non_discovery).*

<a id="tc-08-step-3"></a>
3. **Open [the same event in English](https://beta.showpass.com/ta-event-for-system-gateway-charge-api-2/), select BUY TICKETS and increase ga to 1. Select Checkout | 1.**

   **Expected:** The retry opens checkout with one ticket and the expected displayed total.

   **Actual — Passed:** The retry succeeded. Checkout displayed $100.00 subtotal + $5.00 Facility fee + $5.03 Service fees = $110.03 CAD. This checks the visible breakdown; it does not prove the saved fee allocation or payment.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/48-english-ga-reservation-result.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/48-english-ga-reservation-result.jpg" alt="english ga reservation result" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:34:09 America/Edmonton · [captured page](https://beta.showpass.com/ta-event-for-system-gateway-charge-api-2/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/49-english-ga-checkout-recovered.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/49-english-ga-checkout-recovered.jpg" alt="english ga checkout recovered" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:34:17 America/Edmonton · [captured page](https://beta.showpass.com/checkout/).*

<a id="tc-08-step-4"></a>
4. **Open [French checkout](https://beta.showpass.com/fr/checkout/) with that same cart.**

   **Expected:** One item and the same amounts remain; the cart labels use French.

   **Actual — Passed:** The cart survived the language change. Checkout progress-label translation is tracked separately in BUG-02.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/50-french-ga-checkout-recovered.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/50-french-ga-checkout-recovered.jpg" alt="french ga checkout recovered" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:34:19 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*

<a id="tc-08-step-5"></a>
5. **Return to the French event, open ACHETER DES BILLETS and decrease ga from 1 to 0. Open checkout afresh.**

   **Expected:** The ticket is removed and the cart is empty.

   **Actual — Passed:** Fresh French checkout showed an empty cart. No order or charge was created.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/51-ga-ticket-cleanup-empty-cart.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/51-ga-ticket-cleanup-empty-cart.jpg" alt="ga ticket cleanup empty cart" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:34:37 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*



<a id="tc-09-public-login-signup-and-password-reset"></a>
## TC-09 Public login signup and password reset

**What this tests:** The three account entry forms render in English and French. No account is created and no email is sent.

**Start here:** Signed out. Leave every field blank and do not submit.

### Steps

<a id="tc-09-step-1"></a>
1. **Open [English login](https://beta.showpass.com/accounts/login/) and [French login](https://beta.showpass.com/fr/accounts/login/).**

   **Expected:** Email/password fields, sign-up, password-reset and social sign-in options appear in the selected language.

   **Actual — Passed:** Both forms loaded. The French form used Adresse courriel, Mot de passe and Se connecter. Actual sign-in and provider callbacks were not run.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/58-english-login-form.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/58-english-login-form.jpg" alt="english login form" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:41 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/59-french-login-form.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/59-french-login-form.jpg" alt="french login form" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:41 America/Edmonton · [captured page](https://beta.showpass.com/fr/accounts/login/).*

<a id="tc-09-step-2"></a>
2. **Open [English signup](https://beta.showpass.com/accounts/signup/) and [French signup](https://beta.showpass.com/fr/accounts/signup/).**

   **Expected:** First/last name, email, password and confirmation fields load. The French form uses translated labels.

   **Actual — Passed:** Both signup forms loaded, including Prénom, Nom de famille and Confirmer le mot de passe. No information was submitted and no terms were accepted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/60-english-signup-form.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/60-english-signup-form.jpg" alt="english signup form" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:42 America/Edmonton · [captured page](https://beta.showpass.com/accounts/signup/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/61-french-signup-form.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/61-french-signup-form.jpg" alt="french signup form" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:51 America/Edmonton · [captured page](https://beta.showpass.com/fr/accounts/signup/).*

<a id="tc-09-step-3"></a>
3. **Open [English password reset](https://beta.showpass.com/accounts/password-reset/) and [French password reset](https://beta.showpass.com/fr/accounts/password-reset/).**

   **Expected:** A blank email field and translated reset-link button appear.

   **Actual — Passed:** Both forms loaded, including Envoyer le lien de réinitialisation. No reset email was sent.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/62-english-password-reset.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/62-english-password-reset.jpg" alt="english password reset" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:51 America/Edmonton · [captured page](https://beta.showpass.com/accounts/password-reset/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/63-french-password-reset.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/63-french-password-reset.jpg" alt="french password reset" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:35:52 America/Edmonton · [captured page](https://beta.showpass.com/fr/accounts/password-reset/).*



<a id="tc-13-confirmation-and-refund-entry-pages"></a>
## TC-13 Confirmation and refund entry pages

**What this tests:** Customers can open the resend-confirmation form, and an invalid refund request gives a readable explanation. No email or refund is submitted.

**Start here:** Signed out. Use the known GA event for resend confirmation. No valid refund-request link was supplied.

### Steps

<a id="tc-13-step-1"></a>
1. **Open [English resend confirmation](https://beta.showpass.com/ta-event-for-system-gateway-charge-api-2/resend-confirmation/) and [French resend confirmation](https://beta.showpass.com/fr/ta-event-for-system-gateway-charge-api-2/resend-confirmation/).**

   **Expected:** The email field and resend instructions use the selected language.

   **Actual — Passed:** Both forms loaded, including Renvoyer le courriel de confirmation and Renvoyer la confirmation. No email was entered or sent.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/78-resend-confirmation-en.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/78-resend-confirmation-en.jpg" alt="resend confirmation en" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:37:14 America/Edmonton · [captured page](https://beta.showpass.com/ta-event-for-system-gateway-charge-api-2/resend-confirmation/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/79-resend-confirmation-fr.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/79-resend-confirmation-fr.jpg" alt="resend confirmation fr" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:37:15 America/Edmonton · [captured page](https://beta.showpass.com/fr/ta-event-for-system-gateway-charge-api-2/resend-confirmation/).*

<a id="tc-13-step-2"></a>
2. **Open [Refund Request without a valid link](https://beta.showpass.com/refund-request/), then [the French version](https://beta.showpass.com/fr/refund-request/).**

   **Expected:** An invalid/expired-request message appears rather than an editable customer refund.

   **Actual — Passed:** English and French explanations appeared. French said Désolé, nous n’avons pas pu trouver de demande de remboursement valide. No refund was submitted. A valid refund form remains blocked by the missing link.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/76-refund-request-missing-link-en.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/76-refund-request-missing-link-en.jpg" alt="refund request missing link en" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:37:13 America/Edmonton · [captured page](https://beta.showpass.com/refund-request/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/77-refund-request-missing-link-fr.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/77-refund-request-missing-link-fr.jpg" alt="refund request missing link fr" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:37:13 America/Edmonton · [captured page](https://beta.showpass.com/fr/refund-request/).*



<a id="tc-14-embedded-purchase-and-calendar-entry-pages"></a>
## TC-14 Embedded purchase and calendar entry pages

**What this tests:** The ticket, membership and organizer-calendar widgets can open outside the full public pages. This checks rendering, not a host website integration or completed widget checkout.

**Start here:** Signed out. Same known ticket event, supplied membership and Once organizer. Do not select more stock.

### Steps

<a id="tc-14-step-1"></a>
1. **Open the [English ticket widget](https://beta.showpass.com/widget/tickets/events/purchase/ta-event-for-system-gateway-charge-api-2/) and [French ticket widget](https://beta.showpass.com/fr/widget/tickets/events/purchase/ta-event-for-system-gateway-charge-api-2/).**

   **Expected:** Ticket selection loads at quantity zero; Continue is disabled until an item is selected. French controls use French.

   **Actual — Passed:** Both pickers loaded. French showed Choisir des options, Continuer and Retour boutique. The widget displayed the $100 base amount; the fee-inclusive full-page price was $110.03. Widget final fees/payment were not tested.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/87-english-ticket-widget.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/87-english-ticket-widget.jpg" alt="english ticket widget" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:39:06 America/Edmonton · [captured page](https://beta.showpass.com/widget/tickets/events/purchase/ta-event-for-system-gateway-charge-api-2/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/88-french-ticket-widget.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/88-french-ticket-widget.jpg" alt="french ticket widget" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:39:07 America/Edmonton · [captured page](https://beta.showpass.com/fr/widget/tickets/events/purchase/ta-event-for-system-gateway-charge-api-2/).*

<a id="tc-14-step-2"></a>
2. **Open the [English membership widget](https://beta.showpass.com/widget/tickets/memberships/goood-old-hockeeeyyyyyyyyy/) and [French membership widget](https://beta.showpass.com/fr/widget/tickets/memberships/goood-old-hockeeeyyyyyyyyy/).**

   **Expected:** Season 1 and its map load. The displayed season dates should be understandable and consistent with the intended timezone.

   **Actual — Blocked:** Both widgets loaded. They displayed Dec 6, 2026–Jan 30, 2027; the full membership pages displayed Dec 7–Jan 31. The public API returned start 2026-12-07T04:00:00Z and end 2027-01-31T04:00:00Z. A timezone conversion may explain the difference. The intended display rule was not established, so this is an unresolved observation, not a confirmed wrong-date bug. The French heading also kept Assigned Seating in English.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/89-english-membership-widget.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/89-english-membership-widget.jpg" alt="english membership widget" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:39:17 America/Edmonton · [captured page](https://beta.showpass.com/widget/tickets/memberships/goood-old-hockeeeyyyyyyyyy/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/91-french-membership-widget-loaded.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/91-french-membership-widget-loaded.jpg" alt="french membership widget loaded" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:39:53 America/Edmonton · [captured page](https://beta.showpass.com/fr/widget/tickets/memberships/goood-old-hockeeeyyyyyyyyy/).*

<a id="tc-14-step-3"></a>
3. **Open the [English Once calendar widget](https://beta.showpass.com/widget/calendar/venue/once/) and [French version](https://beta.showpass.com/fr/widget/calendar/venue/once/).**

   **Expected:** A calendar, month controls, quantity and price filters load. French labels use French.

   **Actual — Failed:** Both calendars loaded, initially January 2026 with sold-out dates. French translated the month, navigation and price controls but kept Available and the Over …% sold legend in English. No date was selected and later month navigation was not exercised. See BUG-01 for shared public translation gaps.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/92-english-venue-calendar-widget.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/92-english-venue-calendar-widget.jpg" alt="english venue calendar widget" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:40:53 America/Edmonton · [captured page](https://beta.showpass.com/widget/calendar/venue/once/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/94-french-calendar-loaded.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/94-french-calendar-loaded.jpg" alt="french calendar loaded" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:03 America/Edmonton · [captured page](https://beta.showpass.com/fr/widget/calendar/venue/once/).*

<a id="tc-14-step-4"></a>
4. **Open the verified T Shirt widget in [English](https://beta.showpass.com/widget/tickets/products/purchase/2033/) and [French](https://beta.showpass.com/fr/widget/tickets/products/purchase/2033/).**

   **Expected:** XL and XXL options load at quantity zero; Continue / Continuer stays disabled.

   **Actual — Passed:** Both product pickers loaded. The French widget used Produit, Continuer and Retour boutique. Both variants displayed a $15 base price. No widget item was added, so the final widget fees, cart amount and payment were not verified.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/121-en-product-widget.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/121-en-product-widget.jpg" alt="en product widget" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:56:01 America/Edmonton · [captured page](https://beta.showpass.com/widget/tickets/products/purchase/2033/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/122-fr-product-widget.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/122-fr-product-widget.jpg" alt="fr product widget" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:56:02 America/Edmonton · [captured page](https://beta.showpass.com/fr/widget/tickets/products/purchase/2033/).*



<a id="tc-15-package-picker-and-required-selections"></a>
## TC-15 Package picker and required selections

**What this tests:** A package can open its selection page and prevent continuation before its required choices are made.

**Start here:** Signed out. Package fixtures found on the Once public event list. Cart empty.

### Steps

<a id="tc-15-step-1"></a>
1. **Open [Christmas Market Package](https://beta.showpass.com/christmas-market-package/), select BUY TICKETS and increase package 1 to one.**

   **Expected:** An on-sale package can be selected, or a clear sale-period restriction is shown.

   **Actual — Blocked:** The page advertised 8 Tickets Remaining and $64.58, but selecting it returned Sorry, sales for package 1 ticket package have ended. Quantity returned to zero. Its saved sale schedule was not checked, so no incorrect rejection was claimed. This fixture could not reach checkout.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/80-package-event-details.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/80-package-event-details.jpg" alt="package event details" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:37:59 America/Edmonton · [captured page](https://beta.showpass.com/christmas-market-package/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/82-package-sales-ended.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/82-package-sales-ended.jpg" alt="package sales ended" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:38:21 America/Edmonton · [captured page](https://beta.showpass.com/christmas-market-package/).*

<a id="tc-15-step-2"></a>
2. **Open [Goood Old Hockeeeyyyyyyyyy - Package in French](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/). Select ACHETER DES BILLETS. Set Centre Ice - Front (Choose 3 for January) to 1.**

   **Expected:** The custom package builder opens and requests exactly three eligible selections. Continue stays disabled at 0 / 3.

   **Actual — Passed:** The French builder opened with Sélection obligatoire : 0 / 3, January choices and disabled Continuer. No child performance or seat was selected.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/84-french-hockey-package-picker.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/84-french-hockey-package-picker.jpg" alt="french hockey package picker" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:38:41 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/85-french-custom-package-builder.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/85-french-custom-package-builder.jpg" alt="french custom package builder" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:38:49 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

<a id="tc-15-step-3"></a>
3. **Open [the same builder in English](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).**

   **Expected:** The same three-choice requirement appears in English.

   **Actual — Passed:** Required selection : 0 / 3 and disabled Continue appeared. The four listed choices were Jan 1, 4, 8 and 11 at 11:00 AM CT. This was a direct-page rendering check, not an English click-through from the picker.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/107-english-package-builder-ready.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/107-english-package-builder-ready.jpg" alt="english package builder ready" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:42:14 America/Edmonton · [captured page](https://beta.showpass.com/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

<a id="tc-15-step-4"></a>
4. **Select the January 1, 2027 performance.**

   **Expected:** The count becomes 1 / 3, and Continuer stays disabled until all three required choices are made.

   **Actual — Passed:** The builder showed exactly 1 / 3 and kept Continuer disabled.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/110-package-one-of-three-required.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/110-package-one-of-three-required.jpg" alt="package one of three required" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:51:49 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

<a id="tc-15-step-5"></a>
5. **Also select January 4 and January 8, 2027.**

   **Expected:** Exactly those three performances appear, the count becomes 3 / 3 and Continuer becomes available.

   **Actual — Passed:** January 1, 4 and 8 appeared in the selection summary. The requirement changed to 3 / 3 and Continuer became available.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/111-package-three-required-selections.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/111-package-three-required-selections.jpg" alt="package three required selections" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:51:49 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

<a id="tc-15-step-6"></a>
6. **Select Continuer. On the January 1 map, choose an available green Centre Ice - Front seat.**

   **Expected:** Seat assignment is required before checkout; a successful selection moves to January 4.

   **Actual — Passed:** The package entered the cart and the seating screen required one seat per performance. After selecting the first seat, January 1 showed Modifier les sièges and the map advanced to January 4.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/112-package-seat-assignment-required.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/112-package-seat-assignment-required.jpg" alt="package seat assignment required" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:52:01 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/113-package-first-seat-assigned.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/113-package-first-seat-assigned.jpg" alt="package first seat assigned" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:52:14 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

<a id="tc-15-step-7"></a>
7. **On the January 4 map, choose an available green Centre Ice - Front seat.**

   **Expected:** January 4 becomes assigned and the map advances to January 8.

   **Actual — Passed:** January 1 and January 4 both showed Modifier les sièges; January 8 became active.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/115-package-second-seat-confirmed.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/115-package-second-seat-confirmed.jpg" alt="package second seat confirmed" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:52:26 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

<a id="tc-15-step-8"></a>
8. **On the January 8 map, choose an available green Centre Ice - Front seat.**

   **Expected:** The final seat is shown and Paiement becomes available only after all required assignments are complete.

   **Actual — Passed:** The last selected seat was Section 2, Row 1, Seat 1. Paiement became available. The same top-left green seat position was selected on the earlier two maps, but their exact seat labels were not independently reopened.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/116-package-all-seats-assigned.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/116-package-all-seats-assigned.jpg" alt="package all seats assigned" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:52:41 America/Edmonton · [captured page](https://beta.showpass.com/fr/goood-old-hockeeeyyyyyyyyy-package/ticket-package/?ticketType=1623740&ticketQuantity=1).*

<a id="tc-15-step-9"></a>
9. **Select Paiement to open checkout. Stop at the login/guest choice.**

   **Expected:** French checkout shows one package at $77,97 CAD, matching the selected January package.

   **Actual — Passed:** Checkout opened with one item and $77,97 CAD. Its progress labels were translated: Connexion, Articles, Examen and Paiement. This direct French load worked; BUG-02 concerns switching an already-open English checkout to French. No customer details or payment were submitted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/117-french-package-checkout-reached.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/117-french-package-checkout-reached.jpg" alt="french package checkout reached" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:52:43 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*

<a id="tc-15-step-10"></a>
10. **Return to Once → Produits and open the cart button. Inspect the package, then select its Supprimer control. Open French checkout afresh.**

   **Expected:** The cart contains one Choose 3 for January package and three included tickets. Removing the parent removes the package selection; fresh checkout is empty.

   **Actual — Passed:** The summary showed the correct parent and three Centre Ice - Front child entries. It did not show each child’s date/seat detail. Removing the parent left fresh checkout empty. Seat release to a second buyer was not independently checked.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/118-custom-package-cart-with-three-children.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/118-custom-package-cart-with-three-children.jpg" alt="custom package cart with three children" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:53:23 America/Edmonton · [captured page](https://beta.showpass.com/fr/org/new/once/products/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/119-package-cleanup-empty-cart.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/119-package-cleanup-empty-cart.jpg" alt="package cleanup empty cart" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:53:26 America/Edmonton · [captured page](https://beta.showpass.com/fr/checkout/).*



<a id="tc-16-signed-out-proof-and-final-cleanup"></a>
## TC-16 Signed out proof and final cleanup

**What this tests:** The run ends signed out with no test cart items.

**Start here:** Same sidebar session. The original user tab is preserved; all testing used the separate tab.

### Steps

<a id="tc-16-step-1"></a>
1. **Open the read-only [authentication profile endpoint](https://beta.showpass.com/api/auth/profile/).**

   **Expected:** The visitor receives an unauthenticated response rather than a user profile.

   **Actual — Passed:** The displayed response was {"detail":"Authentication credentials were not provided."}. The browser view did not independently expose the HTTP status code. No other protected API was probed.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/75-signed-out-profile-refused.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/75-signed-out-profile-refused.jpg" alt="signed out profile refused" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:37:05 America/Edmonton · [captured page](https://beta.showpass.com/api/auth/profile/).*

<a id="tc-16-step-2"></a>
2. **After all item checks, open [French checkout afresh](https://beta.showpass.com/fr/checkout/).**

   **Expected:** The cart is empty.

   **Actual — Passed:** After the final custom-package check, fresh checkout showed Oups ! Votre panier est vide ! All five test purchase selections had been removed.

   Evidence: [TC-15, step 10](#tc-15-step-10) already shows this screen.

<a id="tc-16-step-3"></a>
3. **Return the test tab to [the French homepage](https://beta.showpass.com/fr/).**

   **Expected:** The page is neutral, signed out and has no unfinished form.

   **Actual — Passed:** Se connecter was visible. The original user tab was not closed. No login, purchase, Qase or Jira write took place in this run.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/120-public-only-final-home.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/120-public-only-final-home.jpg" alt="public only final home" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:53:27 America/Edmonton · [captured page](https://beta.showpass.com/fr/).*



<a id="tc-17-public-error-pages-in-french"></a>
## TC-17 Public error pages in French

**What this tests:** A visitor sees a readable error page in their chosen language. This opens existing error pages; it does not deliberately break the service.

**Start here:** Signed out. Direct error-page navigation.

### Steps

<a id="tc-17-step-1"></a>
1. **Open [English 404](https://beta.showpass.com/404/) and [French 404](https://beta.showpass.com/fr/404/).**

   **Expected:** The missing-page explanation and Browse Events recovery control use the chosen language.

   **Actual — Failed:** Both rendered. The French 404 still showed Oops, We can’t find the page you are looking for… and Browse Events in English. See BUG-05.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/99-en-error-404.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/99-en-error-404.jpg" alt="en error 404" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:22 America/Edmonton · [captured page](https://beta.showpass.com/404/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/100-fr-error-404.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/100-fr-error-404.jpg" alt="fr error 404" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:23 America/Edmonton · [captured page](https://beta.showpass.com/fr/404/).*

<a id="tc-17-step-2"></a>
2. **Open [English 500](https://beta.showpass.com/500/) and [French 500](https://beta.showpass.com/fr/500/).**

   **Expected:** The server-error explanation uses the chosen language.

   **Actual — Failed:** Both rendered. The French page still showed Server Error and Please try again in a few moments. We’ll be back up in no time. in English. No runtime server failure was induced.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/101-en-error-500.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/101-en-error-500.jpg" alt="en error 500" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:23 America/Edmonton · [captured page](https://beta.showpass.com/500/).*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/102-fr-error-500.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/102-fr-error-500.jpg" alt="fr error 500" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:24 America/Edmonton · [captured page](https://beta.showpass.com/fr/500/).*


### BUG-05 Jira draft

**Draft only — no Jira issue has been created.**

**Title:** fix (French error pages) | 404 and 500 explanations remain English

**GIVEN** a signed-out visitor uses a French beta address.

**WHEN** they open /fr/404/ or /fr/500/.

**THEN — observed:** The missing-page explanation, Browse Events button and server-error explanation remain English.

**Expected:** The error explanation and available recovery controls use French.

**Impact:** French customers get English recovery instructions when they cannot open a page.

**Tested on:** beta, Codex browser sidebar, desktop, signed out, October 25, 2026 (America/Edmonton).

**Evidence:** [TC-17 steps 1–2](#tc-17-step-1).

**Verification limit:** These are direct views of existing error pages. A real server error was not triggered and no server recovery was tested.

**Data safety and cleanup:** No data change. Test cart items from the purchase checks were removed.


<a id="tc-18-public-suborganization-application-form"></a>
## TC-18 Public suborganization application form

**What this tests:** A visitor can open the public form to apply as an organization under Once. Opening this form is separate from the protected main organizer-registration flow.

**Start here:** Signed out. Once. Leave the form blank and do not submit.

### Steps

<a id="tc-18-step-1"></a>
1. **Open [Once Registration in English](https://beta.showpass.com/o/once/register/).**

   **Expected:** The application explains the approval process and displays organization name, phone, currency and timezone.

   **Actual — Passed:** Once Registration loaded with those fields, Canadian Dollars (CAD) and America/Halifax. No organization application was saved.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/95-public-sub-organizer-registration-en.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/95-public-sub-organizer-registration-en.jpg" alt="public sub organizer registration en" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:03 America/Edmonton · [captured page](https://beta.showpass.com/o/once/register/).*

<a id="tc-18-step-2"></a>
2. **Open [Once Registration in French](https://beta.showpass.com/fr/o/once/register/).**

   **Expected:** The heading, instructions and form labels use French.

   **Actual — Passed:** Inscription Once, Nom de l’organisation, Téléphone and Devise appeared. Currency option names remained English; form submission and approval were not tested.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/96-public-sub-organizer-registration-fr.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/96-public-sub-organizer-registration-fr.jpg" alt="public sub organizer registration fr" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:41:14 America/Edmonton · [captured page](https://beta.showpass.com/fr/o/once/register/).*



<a id="tc-19-public-pages-needing-special-records-or-links"></a>
## TC-19 Public pages needing special records or links

**What this tests:** Keep the untested public branches visible instead of implying the smoke sample covered them.

**Start here:** No valid owned token, saved order, website host or product-widget identifier was supplied for these branches.

### Steps

<a id="tc-19-step-1"></a>
1. **Open valid claim, password-reset-key, hold/link checkout, transfer, refund-protection upsell and post-purchase confirmation pages.**

   **Expected:** Each opens only the intended customer/order and preserves its supported language.

   **Actual — Blocked:** These need valid owned links or an existing approved transaction. No token or order identifier was guessed. Creating orders, sending emails or consuming one-time links was outside this run.

   *No screenshot: this action was not executed. The reason is stated above.*

<a id="tc-19-step-2"></a>
2. **Open the standalone product widget and organizer category using the verified T Shirt parent product/category identifiers.**

   **Expected:** The intended product options and category contents load in both languages.

   **Actual — Passed:** Resolved during the run: a read-only public-product query filtered to Once and T Shirt returned parent product 2033 and category 2324. Both widget languages and category entry points were then opened successfully. See TC-14 step 4 and TC-03 step 5.

   Evidence: [TC-14, step 4](#tc-14-step-4) already shows this screen.

   Evidence: [TC-14, step 4](#tc-14-step-4) already shows this screen.

   Evidence: [TC-03, step 5](#tc-03-step-5) already shows this screen.

   Evidence: [TC-03, step 5](#tc-03-step-5) already shows this screen.

<a id="tc-19-step-3"></a>
3. **Run an embedded checkout on its actual host website, attraction calendar, mobile-specific page and website-builder site.**

   **Expected:** The supported host or device preserves selection, language and checkout handoff.

   **Actual — Not run:** The original direct checks are in TC-14. Follow-up TC-21–TC-24 exercised the supplied Netlify host, mounted calendar, ready event modal, French toggle, Embedded setting and checkout. Other websites, attraction-specific configuration, actual mobile/device behavior and a website-builder host were not exercised.

   *No screenshot: this action was not executed. The reason is stated above.*

<a id="tc-19-step-4"></a>
4. **Exercise every equivalent city/date discovery URL and each demo, developer or metadata endpoint.**

   **Expected:** Relevant user page families work without treating source files as executed proof.

   **Actual — Not run:** One city, one category, search and result navigation represent discovery in TC-02. Other date/city variants were deferred. Deliberate error/demo pages, OAuth callbacks without provider state, browserconfig and sitemap endpoints were not part of this customer smoke. Logout was not repeated because this run started signed out.

   *No screenshot: this action was not executed. The reason is stated above.*




<a id="widget-tool-follow-up"></a>
## Widget tool follow-up — ready events, French and Embedded

**Tested October 25, 2026, approximately 19:00–19:19 America/Edmonton.** The user supplied the actual host tool and Organizer 1859 QA CAD, then narrowed the check to its ready event buttons, French toggle and Embedded checkbox. The selected event flows reached checkout with one ticket at $58.51 CAD. No customer details or payment were submitted.

**Scope correction:** the standalone **Cart** button is deprecated, as confirmed by the user. Its 404 observation is **not a bug finding** and is excluded from the supported-flow results. No Jira card was created for it. Extra product/membership exploration was stopped when the user narrowed the scope.

<a id="tc-21-widget-host-setup"></a>
### TC-21 Widget host setup

**What this tests:** The tool launches beta widgets for the requested organizer, with the intended purchase source and no initial cart items.

**Start here:** [Showpass Widget Testing Tool](https://spwidgettool.netlify.app/). Use [1859 QA CAD](https://beta.showpass.com/o/1859-qa-cad/).

#### Steps

<a id="tc-21-step-1"></a>
1. **Paste https://beta.showpass.com/o/1859-qa-cad/ into the organizer field and select Create. Leave SDK URL override blank.**

   **Expected:** Current target shows beta.showpass.com and 1859-qa-cad (1859). The resolved SDK is the beta SDK.

   **Actual — Passed:** The tool showed the correct host, organizer and https://beta.showpass.com/static/platform/sdk/sdk.js. Ordinary checkout and PSP_Widget were selected; Cart Count was 0. No token or partner-attribution option was used.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-00-beta-organizer-setup.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-00-beta-organizer-setup.jpg" alt="beta organizer setup" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:00:02 America/Edmonton.*

<a id="tc-22-mounted-calendar-reaches-checkout"></a>
### TC-22 Mounted calendar reaches checkout

**What this tests:** A calendar mounted inside the host page can reserve a ticket and continue into its checkout form.

**Start here:** Widget tool configured for 1859 QA CAD, English, PSP_Widget, empty cart.

#### Steps

<a id="tc-22-step-1"></a>
1. **Select mount calendar widget. Go to the calendar below the event buttons.**

   **Expected:** The calendar loads inside the Netlify host and shows available dates for this organizer.

   **Actual — Passed:** October 2026 rendered with October 30 available. The frame used beta /widget/calendar/venue/1859/ with isEmbedded=true and lang=en. The screenshot shows dates even though an early accessibility capture contained only the weekday headers.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-01-mounted-calendar-no-dates.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-01-mounted-calendar-no-dates.jpg" alt="mounted calendar no dates" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:00:22 America/Edmonton.*

<a id="tc-22-step-2"></a>
2. **Select October 30. Increase Grounds Admission to 1; leave Grandstand Box at 0.**

   **Expected:** Greenwich Polo Club, Oct 30, 7:00 AM–10:00 PM EDT appears. Grounds Admission shows $30.00 plus $20.79 fees and applicable checkout taxes. The host cart count becomes 1.

   **Actual — Passed:** The correct performance and ticket options appeared. Grounds Admission became 1, Grandstand Box stayed 0 and host Cart Count became 1.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-02-calendar-performance-and-ticket-options.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-02-calendar-performance-and-ticket-options.jpg" alt="calendar performance and ticket options" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:01:07 America/Edmonton.*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-04-calendar-one-ticket-reserved.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-04-calendar-one-ticket-reserved.jpg" alt="calendar one ticket reserved" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:01:38 America/Edmonton.*

<a id="tc-22-step-3"></a>
3. **Select Continue. At checkout, select Continue as guest. Leave all customer fields blank.**

   **Expected:** The embedded flow reaches checkout with the same one-item selection and a blank guest form.

   **Actual — Passed:** Checkout opened inside the host. The displayed breakdown was $30.00 + $12.10 Ticket fee + $8.69 Service fees + $2.01 GST + $3.10 HST + $2.61 VAT = $58.51 CAD. The guest form appeared. These displayed lines add correctly; saved rate-card rules, revenue allocation and payment were not verified.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-05-embedded-calendar-checkout-en.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-05-embedded-calendar-checkout-en.jpg" alt="embedded calendar checkout en" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:02:04 America/Edmonton.*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-06-embedded-guest-details-en.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-06-embedded-guest-details-en.jpg" alt="embedded guest details en" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:02:12 America/Edmonton.*

<a id="tc-23-ready-event-modal-retains-the-ticket"></a>
### TC-23 Ready event modal retains the ticket

**What this tests:** A ready event button reopens the held ticket and reaches checkout without adding a duplicate.

**Start here:** Widget tool, English, Embedded unchecked. One existing Greenwich Polo Club Grounds Admission ticket is held from TC-22.

#### Steps

<a id="tc-23-step-1"></a>
1. **Close the checkout modal if one is open, reload the host, and select the ready greenwich-polo-club button.**

   **Expected:** The event picker reopens with Grounds Admission 1 and Grandstand Box 0. Host cart count stays 1.

   **Actual — Passed:** The same Oct 30 event and quantity were retained after reopening. No second ticket was selected.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-11-event-modal-retains-calendar-ticket.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-11-event-modal-retains-calendar-ticket.jpg" alt="event modal retains calendar ticket" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:04:13 America/Edmonton.*

<a id="tc-23-step-2"></a>
2. **Select Continue.**

   **Expected:** The ready event modal reaches checkout with one item and the same $58.51 CAD total.

   **Actual — Passed:** The event modal reached Log in, 2 of 5, with one item at $58.51 CAD. No login or payment was submitted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-12-event-modal-checkout-en.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-12-event-modal-checkout-en.jpg" alt="event modal checkout en" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:04:19 America/Edmonton.*

<a id="tc-23-step-3"></a>
3. **Select Back, then decrease Grounds Admission from 1 to 0.**

   **Expected:** The test ticket is removed and the host count becomes 0.

   **Actual — Passed:** Both ticket quantities were 0, Continue became disabled and host Cart Count became 0. This removed the calendar/event ticket.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-13-event-ticket-removed.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-13-event-ticket-removed.jpg" alt="event ticket removed" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:04:50 America/Edmonton.*

<a id="tc-24-french-ready-event-with-embedded-checked"></a>
### TC-24 French ready event with Embedded checked

**What this tests:** The host’s French toggle and Embedded checkbox launch the ready event in French and preserve its selection through checkout.

**Start here:** Widget tool configured for 1859 QA CAD. Start with Cart Count 0. The prior product reservation had expired before this check.

#### Steps

<a id="tc-24-step-1"></a>
1. **Set Language to French and check Embedded. Select the ready greenwich-polo-club button.**

   **Expected:** The event opens inline in French. Its frame targets beta, with isEmbedded=true and lang=fr.

   **Actual — Passed:** French and Embedded were selected. The inline event showed Choisir des options, Acheter des billets and French date/time labels for Oct 30. Changing the host language applies to a newly launched widget; it did not rewrite an already-open English frame.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-26-french-embedded-controls-empty-cart.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-26-french-embedded-controls-empty-cart.jpg" alt="french embedded controls empty cart" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:17:17 America/Edmonton.*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-27-greenwich-embedded-fr-options.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-27-greenwich-embedded-fr-options.jpg" alt="greenwich embedded fr options" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:17:19 America/Edmonton.*

<a id="tc-24-step-2"></a>
2. **Increase Grounds Admission from 0 to 1.**

   **Expected:** Grounds Admission is 1, Grandstand Box is 0 and the host cart count is 1.

   **Actual — Passed:** The exact ticket quantities and host count matched.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-28-greenwich-embedded-fr-selected.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-28-greenwich-embedded-fr-selected.jpg" alt="greenwich embedded fr selected" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:17:28 America/Edmonton.*

<a id="tc-24-step-3"></a>
3. **Select Continuer. Stop at the sign-in/guest choice.**

   **Expected:** The inline widget reaches French checkout with one article and the same total.

   **Actual — Passed:** The flow reached Connexion, 2 sur 5. It showed Se connecter, Adresse courriel, Mot de passe and Continuer en tant qu’invité. The cart retained one item and $58.51 CAD. No customer details or payment were submitted. This is an actual host embed check, not a direct visit to the widget address.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-29-ready-event-embedded-checkout-fr.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-29-ready-event-embedded-checkout-fr.jpg" alt="ready event embedded checkout fr" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:17:41 America/Edmonton.*

<a id="tc-24-step-4"></a>
4. **Select Retourner and decrease Grounds Admission to 0.**

   **Expected:** The ticket is removed and Cart Count returns to 0.

   **Actual — Passed:** Both quantities became 0, Continuer was disabled and the host count returned to 0.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-30-embedded-event-ticket-removed.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-30-embedded-event-ticket-removed.jpg" alt="embedded event ticket removed" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:18:41 America/Edmonton.*

<a id="tc-24-step-5"></a>
5. **Select the host’s Checkout button to open a fresh checkout. Then reload the host and check Embedded again.**

   **Expected:** Fresh checkout reports no items. The host ends with French selected, Embedded checked and Cart Count 0.

   **Actual — Passed:** Fresh hosted checkout showed Aucun article dans votre panier and the empty-cart explanation. The final host has French and Embedded selected, Cart Count 0 and no mounted frames. No widgets remain running in the background.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-31-fresh-hosted-checkout-empty.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-31-fresh-hosted-checkout-empty.jpg" alt="fresh hosted checkout empty" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:19:09 America/Edmonton.*

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-32-host-final-french-embedded-clean.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/widget-host-32-host-final-french-embedded-clean.jpg" alt="host final french embedded clean" width="480" style="max-width: 100%; height: auto;"></a>

   *Widget tool → beta · 2026-10-25, 19:19:10 America/Edmonton.*

### Earlier exploration and cleanup limits

Before the user narrowed the scope to ready event buttons, Anime Shirt (product 1891) → Unisex - Male reached hosted checkout in English and French at $41.41 CAD. Female remained 0. Setting the Male quantity to 0 in the product picker changed the draft but disabled Continue and left the saved cart at 1. No claim is made that removal is impossible throughout the whole checkout. The [product selection hook](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/hooks/useProductAddonSelection.ts) keeps local draft quantities, and [ProductStep](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/add-ons/product-add-ons/ProductStep.tsx) applies them on Continue. This was recorded as an observed limitation, not a new payment bug or a completed removal. The timed reservation later expired; host count returned to 0 before TC-24. Fresh hosted checkout at the end was also empty.

Fight Night Scan Access rejected selection because it was no longer for sale; no membership was added. The on-sale Skate Show Season 2 levels and map rendered, but seat selection and membership checkout were stopped at the user’s scope clarification. Movie Night’s ready button rendered its November 5 time choices and ticket options with Embedded enabled; no Movie Night ticket was reserved. These exploratory views do not count as completed purchase flows. The requested ready-event smoke does not require further product or membership investigation.

No new bug draft was created from this focused ready-event follow-up. The deprecated Cart button is not applicable. Existing French issues elsewhere in this report remain separate. No Qase or Jira write took place.

**Remaining limits:** no payment, customer login, external website beyond this host tool, physical device, provider callback, delivered order, background API sweep, alternate browser-storage policy, full price/rate-card audit or full event-button matrix was executed. Membership/product checkout gaps are not hidden by the event passes. Exact inventory availability to a second buyer after removal/expiry was not independently checked.

<a id="earlier-protected-checks-outside-current-scope"></a>
## Earlier protected checks — outside current scope

These checks were executed before the user clarified public pages only. They are retained as prior observations, not unfinished public checks. **No sign-in is requested.** BUG-04 below concerns these earlier protected redirects; the four current public drafts are BUG-01, BUG-02, BUG-03 and BUG-05.

<a id="tc-10-signed-out-dashboard-access"></a>
## TC-10 Signed out Dashboard access

**What this tests:** Direct Dashboard entry refuses protected page content. French navigation must also retain the chosen language.

**Start here:** Signed out. Products and Reports represent the shared Dashboard access check; this is not a test of every Dashboard feature.

### Steps

<a id="tc-10-step-1"></a>
1. **Open https://beta.showpass.com/manage/products/ directly.**

   **Expected:** Login appears instead of the product list or product actions.

   **Actual — Passed:** English login appeared with next=/manage/products/. The inspected page contained the login form, not product data.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/64-en-dashboard-product-list-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/64-en-dashboard-product-list-signed-out.jpg" alt="en dashboard product list signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:17 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=/manage/products/).*

<a id="tc-10-step-2"></a>
2. **Open https://beta.showpass.com/fr/manage/products/ directly.**

   **Expected:** French login appears instead of product data, retaining the intended return page and language.

   **Actual — Failed:** Access stayed behind login, but the redirect opened English login and its next value omitted /fr/. See BUG-04. No product data was visible in the inspected final page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/65-fr-dashboard-product-list-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/65-fr-dashboard-product-list-signed-out.jpg" alt="fr dashboard product list signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:18 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=/manage/products/).*

<a id="tc-10-step-3"></a>
3. **Open https://beta.showpass.com/manage/reports/ directly.**

   **Expected:** Login appears instead of reports and report-generation controls.

   **Actual — Passed:** English login appeared with next=/manage/reports/. No report data was visible in the inspected page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/66-en-dashboard-reports-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/66-en-dashboard-reports-signed-out.jpg" alt="en dashboard reports signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:19 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=/manage/reports/).*

<a id="tc-10-step-4"></a>
4. **Open https://beta.showpass.com/fr/manage/reports/ directly.**

   **Expected:** French login appears and the French destination is retained.

   **Actual — Failed:** English login appeared instead. The access restriction itself worked for this sample; French navigation did not.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/67-fr-dashboard-reports-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/67-fr-dashboard-reports-signed-out.jpg" alt="fr dashboard reports signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:20 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=/manage/reports/).*


### BUG-04 Jira draft

**Draft only — no Jira issue has been created.**

**Title:** fix (French sign in) | protected page redirects lose the selected language

**GIVEN** a signed-out visitor opens a French protected beta page directly.

**WHEN** they open /fr/manage/products/, /fr/manage/reports/, /fr/account/my-orders/, /fr/account/profile/update-payment/ or /fr/organizations/register/.

**THEN — observed:** Each redirects to /accounts/login/ with English labels. The next value omits the /fr/ prefix.

**Expected:** The login screen and intended return page retain French.

**Impact:** A French user is switched to English when trying to access their work or account.

**Tested on:** beta, Codex browser sidebar, desktop, signed out, October 25, 2026 (America/Edmonton).

**Evidence:** [TC-10 steps 2 and 4](#tc-10-step-2), [TC-11 steps 2 and 4](#tc-11-step-2), [TC-12 step 2](#tc-12-step-2).

**Verification limit:** The Dashboard part was already recorded as BUG-03 in [the earlier language report](protected-dashboard-english-french-beta-smoke-2026-10-25.md). This reconfirms it and adds customer/onboarding entry points; do not create a duplicate Jira issue if one already exists. No login was completed, so the post-login return was not executed.

**Data safety and cleanup:** No data change. Test cart items from the purchase checks were removed.


<a id="tc-11-signed-out-customer-account-access"></a>
## TC-11 Signed out customer account access

**What this tests:** A signed-out visitor cannot open customer orders or saved payment settings.

**Start here:** Signed out. No customer account or order is selected.

### Steps

<a id="tc-11-step-1"></a>
1. **Open https://beta.showpass.com/account/my-orders/ directly.**

   **Expected:** Login appears without order history or customer order details.

   **Actual — Passed:** The page redirected to English login, with the orders page in next. No orders appeared in the inspected page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/68-en-customer-orders-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/68-en-customer-orders-signed-out.jpg" alt="en customer orders signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:21 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=%2Faccount%2Fmy-orders%2F).*

<a id="tc-11-step-2"></a>
2. **Open https://beta.showpass.com/fr/account/my-orders/ directly.**

   **Expected:** Login appears in French without customer orders.

   **Actual — Failed:** The page stayed protected, but English login appeared and /fr/ was missing from next. Same BUG-04.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/69-fr-customer-orders-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/69-fr-customer-orders-signed-out.jpg" alt="fr customer orders signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:22 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=%2Faccount%2Fmy-orders%2F).*

<a id="tc-11-step-3"></a>
3. **Open https://beta.showpass.com/account/profile/update-payment/ directly.**

   **Expected:** Login appears without saved cards, card details or payment-management actions.

   **Actual — Passed:** The page redirected to English login. No saved payment information appeared in the inspected page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/70-en-customer-saved-payments-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/70-en-customer-saved-payments-signed-out.jpg" alt="en customer saved payments signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:22 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=%2Faccount%2Fprofile%2Fupdate-payment%2F).*

<a id="tc-11-step-4"></a>
4. **Open https://beta.showpass.com/fr/account/profile/update-payment/ directly.**

   **Expected:** French login appears without payment information.

   **Actual — Failed:** English login appeared instead. No saved payment data was visible in the inspected page. Same BUG-04.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/71-fr-customer-saved-payments-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/71-fr-customer-saved-payments-signed-out.jpg" alt="fr customer saved payments signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:23 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=%2Faccount%2Fprofile%2Fupdate-payment%2F).*



<a id="tc-12-signed-out-organizer-registration"></a>
## TC-12 Signed out organizer registration

**What this tests:** The main organizer-registration page requires login and retains French when requested.

**Start here:** Signed out. This is the main Register Organization page, not the public application to become a child of Once in TC-18.

### Steps

<a id="tc-12-step-1"></a>
1. **Open https://beta.showpass.com/organizations/register/ directly.**

   **Expected:** Login appears before the organizer-registration form.

   **Actual — Passed:** English login appeared. No organizer was created.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/72-en-organizer-registration-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/72-en-organizer-registration-signed-out.jpg" alt="en organizer registration signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:24 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=%2Forganizations%2Fregister%2F).*

<a id="tc-12-step-2"></a>
2. **Open https://beta.showpass.com/fr/organizations/register/ directly.**

   **Expected:** French login appears before the form, retaining the French return address.

   **Actual — Failed:** English login appeared and the return address omitted /fr/. Same BUG-04.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/73-fr-organizer-registration-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/73-fr-organizer-registration-signed-out.jpg" alt="fr organizer registration signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:36:25 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=%2Forganizations%2Fregister%2F).*

<a id="tc-12-step-3"></a>
3. **Reload the login page reached by step 2.**

   **Expected:** The visitor stays signed out and only the login form appears.

   **Actual — Passed:** Reload still showed English login. This reload checks the redirected login page, not an authenticated page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/74-login-reload-stays-signed-out.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/public-and-protected-pages-beta-smoke-2026-10-25/74-login-reload-stays-signed-out.jpg" alt="login reload stays signed out" width="480" style="max-width: 100%; height: auto;"></a>

   *Beta · 2026-10-25, 18:37:05 America/Edmonton · [captured page](https://beta.showpass.com/accounts/login/?next=%2Forganizations%2Fregister%2F).*


## Postconditions and cleanup

**Widget-host follow-up:** the calendar/event tickets were removed through their active pickers. The exploratory Anime Shirt reservation expired before the final French embedded check. A fresh checkout inside the actual Netlify host reported no items at the end. The tool is left on 1859 QA CAD with French and Embedded selected, Cart Count 0 and no mounted frames. No payment or customer details were submitted.

- Removed the seated-event ticket (Section 4, Row 7, Seat 5), membership selection (Section 2, Row 4, Seat 4), XXL T Shirt, ga ticket and custom seated package with its three child tickets. Fresh checkout showed an empty cart after each flow and at the end.
- No purchase/order, payment, email, customer account, organizer application, gift card or refund was submitted. No existing record configuration was changed.
- The test tab is left on the signed-out French homepage. The original user tab was preserved.
- Cart removal was proved with a fresh page. Exact seat availability to a second buyer and release timing were not independently verified. No second buyer was used.
- The custom package contained January 1, 4 and 8 performances. Seats were assigned, checkout was reached, then its parent and three child entries were removed. The final checkout was empty.
- Screenshots remain in the ignored local archive. The temporary route-inventory output was deleted with rm after its useful facts were recorded. No raw browser text-dump file was retained.

## Sources and important limits

**Source inventory is not executed coverage.** The local Next pages inventory contained 455 route patterns: 65 public/onboarding/integration patterns, 27 customer-account patterns, 186 static Dashboard patterns and 177 dynamic Dashboard patterns. This includes developer, metadata and special-link pages; it is not a list of 455 supported customer journeys. The run grouped equivalent routes and tested the public families recorded above. Remaining public branches are explicit in TC-19. Protected checks are outside the user’s final scope.

Backend was used for authentication/public-data boundaries, membership seasons and cart validation/removal. Frontend source was used for page families, protected entry points, localization and checkout/widget differences. Source review does not establish the deployed build or turn an unrun branch into a pass. Relevant anchors:

- [Backend public product filters](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/inventory/api/public/filters.py) support exact organizer/name filtering. The live query /api/public/products/?venue__slug=once&name=T%20Shirt returned the T Shirt parent and category used in TC-14 and TC-03.
- [Backend membership public viewsets](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/public/viewsets.py) expose public membership definitions. [Public membership serializer](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/public/serializers.py) supplies the season and reserved-seating benefit.
- [Backend cart serializer](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py) applies inventory/seat changes when cart items change; its OperationalError path uses the high-demand message. The browser observation does not prove which database condition caused this run’s known error.
- [Frontend Dashboard middleware](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/middleware.ts), [customer authentication gate](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/gssp-subroutines/withUser/withUser.ts), [saved-payment route](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/account/profile/update-payment.tsx) and [main organizer registration](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/organizations/register/index.tsx) establish the distinct protected entry points.
- [Membership full-page seating](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/m/[membershipSlug]/seating/index.tsx) and [membership widget](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/widget/tickets/memberships/[membershipSlug].tsx) use different page wrappers. Full-page seating requests purchases/account/constants translations; the widget also requests seating translations. This supports investigation of BUG-03, not a claim that its cause was patched.
- [Public seating modal](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/seating/components/PublicAssignedSeatingModal/PublicAssignedSeatingModal.web.tsx) converts membership seasons using a browser-timezone value. Backend season fields are timestamps. Live public membership data for the supplied fixture returned Season 1, start 2026-12-07T04:00:00Z and end 2027-01-31T04:00:00Z; level Centre Ice - Front was 493.81 CAD. Browser-timezone formatting and the desired display policy still need a focused check before calling either displayed date wrong.
- Handbook recipes used: [[00 Start Here/Showpass QA Handbook/Playbooks/05 Memberships and Ticket Benefits]], [[00 Start Here/Showpass QA Handbook/Playbooks/12 Permissions Ownership and Authentication]], plus the canonical [[00 Start Here/World-Class Software Quality Standard]].

**No full security claim:** final page contents and one refused profile response were checked. Raw protected HTML/data responses, all background APIs, cache contents, every loading frame, cross-customer ownership and all permission combinations were not verified. No API status code was inferred from the JSON body.

**No full financial claim:** displayed item counts and amounts were compared through checkout entry. Paid success, saved fee allocation, double-charge prevention, inventory contention, member benefit issuance, delivery, refunds/exchanges and reporting were outside this no-payment run.

## Results

**Recommendation: Decision blocked by named missing evidence for a full public-page release decision.** The tested purchase flows reached checkout, but French has confirmed bugs. We still need valid special-link records and the intended membership date-display rule to resolve the blocked checks. Other host sites, completed payments and the deployed version-bump commit were not verified. The passes below apply only to the checks we ran.

**Result count:** 19 Passed, 5 Failed, 4 Blocked and 1 Not run. The five failed checks relate to four distinct public bugs.

**How to use the table:** Click a check to open its exact step and screenshot. Click a bug ID for the Jira draft. A dash means no confirmed bug is attached; a Blocked or Not run check has not passed. The [bug summary](#confirmed-public-page-bugs) lists the four distinct public bugs.

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [Homepage navigation — TC-01 — step 1](#tc-01-step-1) | Passed | — | English/French homepage loads and language switch work. |
| [French shared labels — TC-01 — step 2](#tc-01-step-2) | Failed | [BUG-01](#bug-01-jira-draft) | Search button and shared footer headings remain English. |
| [Discovery — TC-02 — step 1](#tc-02-step-1) | Passed | — | Search, result opening, city/category browsing and French breadcrumb worked. |
| [Organizer profile — TC-03 — step 2](#tc-03-step-2) | Passed | — | New organizer Events, Memberships and About loaded in both languages; Products/Gift Cards below. Existing event link still opens older profile. |
| [Seated ticket — TC-04 — step 4](#tc-04-step-4) | Passed | — | Exact Dec 11 seat reached checkout at $25.99 CAD; language change kept cart; removed and empty cart verified. |
| [French checkout progress — TC-04 — step 5](#tc-04-step-5) | Failed | [BUG-02](#bug-02-jira-draft) | Switching an open English checkout to French leaves the progress labels in English. |
| [Membership checkout — TC-05 — step 3](#tc-05-step-3) | Passed | — | Centre Ice - Front, Section 2 Row 4 Seat 4 reached checkout at $493.81 CAD; selection removed. |
| [French membership controls — TC-05 — step 5](#tc-05-step-5) | Failed | [BUG-03](#bug-03-jira-draft) | Membership purchase/map labels contain English. |
| [Product variant — TC-06 — step 2](#tc-06-step-2) | Passed | — | XXL T Shirt quantity 1 reached checkout at $15.00 CAD, retained its variant in French and was removed. |
| [Gift-card forms — TC-07 — step 1](#tc-07-step-1) | Passed | — | Gift-card forms loaded in both languages from both entry points; no submission. |
| [GA checkout retry — TC-08 — step 3](#tc-08-step-3) | Passed | — | Retry reached GA checkout at $110.03 CAD; French cart retained it; removed afterward. |
| [Known reservation interruption — TC-08 — step 2](#tc-08-step-2) | Blocked | Known issue | First French reservation hit the known high-demand issue. User says it is known and not being fixed; no new bug draft. |
| [Public account forms — TC-09 — step 1](#tc-09-step-1) | Passed | — | Login, signup and password-reset forms rendered in both languages; nothing submitted. |
| [Support entry pages — TC-13 — step 1](#tc-13-step-1) | Passed | — | Resend form and missing-refund-link message rendered in both languages; no email/refund submitted. |
| [Widget page loading — TC-14 — step 1](#tc-14-step-1) | Passed | — | Ticket, membership, product and calendar widgets rendered directly; no host integration or completed widget purchase proved. |
| [Widget season dates — TC-14 — step 2](#tc-14-step-2) | Blocked | Unconfirmed | Membership widget season dates differ by one day from full pages; intended timezone display rule unverified. |
| [French widget legend — TC-14 — step 3](#tc-14-step-3) | Failed | [BUG-01](#bug-01-jira-draft) | French calendar availability legend remains English. |
| [Custom seated package — TC-15 — step 9](#tc-15-step-9) | Passed | — | Custom package enforced 3 choices, required 3 seat assignments and reached French checkout at $77,97 CAD. Parent and three child entries removed; cart empty. |
| [Preset package checkout — TC-15 — step 1](#tc-15-step-1) | Blocked | Setup blocked | Christmas Market package selection was rejected because sales ended; schedule not independently checked. |
| [Session and cleanup — TC-16 — step 2](#tc-16-step-2) | Passed | — | Signed-out public session preserved; final fresh checkout empty after all five flows; French homepage restored. |
| [French error pages — TC-17 — step 1](#tc-17-step-1) | Failed | [BUG-05](#bug-05-jira-draft) | French 404/500 core text stayed English. Pages did render. |
| [Suborganization form — TC-18 — step 1](#tc-18-step-1) | Passed | — | Public Once application form rendered in both languages; no application submitted. |
| [Special public records — TC-19 — step 1](#tc-19-step-1) | Blocked | — | Special-link pages still need valid owned tokens, holds or saved transactions. Product-widget and organizer-category records were resolved and checked. |
| [Remaining public variations — TC-19 — step 3](#tc-19-step-3) | Not run | — | The supplied widget-tool host is now checked. Other host websites, physical mobile, attraction-specific setup, other equivalent discovery variants and developer endpoints remain unrun. |
| [Widget tool configuration — TC-21 — step 1](#tc-21-step-1) | Passed | — | Correct beta SDK and 1859 QA CAD; ordinary checkout, PSP_Widget, initial cart 0. |
| [Mounted host calendar — TC-22 — step 3](#tc-22-step-3) | Passed | — | October 30 Grounds Admission reached guest checkout at $58.51 CAD inside the actual host. |
| [Ready English event modal — TC-23 — step 2](#tc-23-step-2) | Passed | — | Existing ticket reopened without duplication and reached checkout at $58.51 CAD. |
| [Ready French embedded event — TC-24 — step 3](#tc-24-step-3) | Passed | — | French toggle plus Embedded checked; one ticket reached French checkout at $58.51 CAD. |
| [Hosted cleanup — TC-24 — steps 4–5](#tc-24-step-4) | Passed | — | Fresh hosted checkout empty; final host Cart Count 0; French and Embedded retained; no mounted frames. Product cleaned up by expiry, event tickets by quantity removal. |
