---
title: Organizer Profile — French tab URL, reload and fresh-tab check
date: 2026-11-19
status: Tested and passed for Events to About on the selected beta Organizer
---

# Organizer Profile — French tab URL

**Result:** The reported language loss was **not reproduced** on the refreshed beta page. Switching Événements → À propos retained `/fr/`; reload and a fresh tab retained French, About selection and the same Organizer.

## Setup and scope

- November 19, 2026; beta; Codex in-app browser; signed-in Christian Valdez session. Deployed revision unknown.
- Organizer: **Organization For System Gateway Payment Intent**, Venue ID 1547 identified in the earlier normal Dashboard view. The tested public page displayed this same name throughout.
- Original page: `https://beta.showpass.com/o/organization-for-system-gateway-payment-intent/`, English, Events selected.
- Available tabs: Events, Memberships, Products, Gift Cards, About. This focused sample used Events → About.
- Allowed actions: refresh, language selection, tab navigation, a fresh tab and restoration. No business records, rich text, purchases, Admin settings or other configuration were changed.
- The fresh tab shared the existing browser session; this was not a signed-out/private-browser test. French was checked through translated interface labels and `html lang="fr"`, not the Organizer-authored English About copy.

## Test index

- [TC-01 — French tab switch](#tc-01-french-tab-switch)
- [TC-02 — Reload the resulting URL](#tc-02-reload-the-resulting-url)
- [TC-03 — Open the resulting URL in a fresh tab](#tc-03-open-the-resulting-url-in-a-fresh-tab)

## TC-01 French tab switch

**What this tests:** Changing the selected profile tab preserves French in the URL and interface.

**Start here:** Open the original beta public profile above. Confirm the Organizer name and Events selected. The user explicitly authorized refreshing the page before this test.

1. **Refresh the profile. Open the English language menu and choose French.**

   **Expected:** Same Organizer; French interface; URL includes `/fr/`.

   **Actual — Passed:** URL became `https://beta.showpass.com/fr/o/organization-for-system-gateway-payment-intent/`. Événements was selected; the language control showed French, and the interface displayed Tableau de bord and Soutien.

   <img src="../../99%20Archive/QA%20Evidence/organizations/french-profile-tabs-2026-11-19/01-french-before-tab.jpg" width="600" alt="French Organizer profile before switching tabs" />

2. **Select À propos.**

   **Expected:** Same Organizer and French interface; About selected; `/fr/` retained in the resulting URL.

   **Actual — Passed:** À propos was selected, `html lang` was `fr`, and the URL was `https://beta.showpass.com/fr/o/organization-for-system-gateway-payment-intent/about/`.

   <img src="../../99%20Archive/QA%20Evidence/organizations/french-profile-tabs-2026-11-19/02-after-tab-switch.jpg" width="600" alt="About selected with the French interface retained" />

## TC-02 Reload the resulting URL

**What this tests:** The selected tab's URL reopens the same Organizer and tab in French after reload.

**Start here:** The French About URL recorded in TC-01 step 2, with À propos selected.

1. **Reload that page and wait for the profile tabs.**

   **Expected:** Same `/fr/.../about/` URL, same Organizer, À propos selected and French interface.

   **Actual — Passed:** All remained. The Organizer heading was unchanged; `html lang` remained `fr` and À propos remained selected.

   <img src="../../99%20Archive/QA%20Evidence/organizations/french-profile-tabs-2026-11-19/03-after-reload.jpg" width="600" alt="French About selection retained after reload" />

## TC-03 Open the resulting URL in a fresh tab

**What this tests:** Opening the actual resulting URL in another tab preserves French, selected tab and Organizer.

**Start here:** Use the exact French About URL recorded above, in the same authorized browser session.

1. **Open that URL in a fresh in-app browser tab.**

   **Expected:** Same Organizer, À propos selected, French interface and `/fr/` URL.

   **Actual — Passed:** The fresh tab opened the same `/fr/o/organization-for-system-gateway-payment-intent/about/` URL. The Organizer heading matched, À propos was selected, and `html lang` was `fr`.

   <img src="../../99%20Archive/QA%20Evidence/organizations/french-profile-tabs-2026-11-19/04-fresh-tab.jpg" width="600" alt="Fresh tab opens the same Organizer and About tab in French" />

## Cleanup and limits

The temporary fresh tab was closed. The original tab was switched back to English and returned to its original profile URL. Final read confirmed `html lang="en"` and Events selected. No saved business data changed.

No bug was confirmed in this run. Other tab transitions, other Organizers, narrow screens and private-browser sessions were not tested. This result does not establish which code change fixed the earlier reported behavior.

## Results

| Check and step | Status | Observed result |
| --- | --- | --- |
| [TC-01 — Tab switch, steps 1–2](#tc-01-french-tab-switch) | Passed | `/fr/`, French interface, same Organizer and About selection retained |
| [TC-02 — Reload, step 1](#tc-02-reload-the-resulting-url) | Passed | Same French URL, Organizer and selected tab |
| [TC-03 — Fresh tab, step 1](#tc-03-open-the-resulting-url-in-a-fresh-tab) | Passed | Same French URL, Organizer and selected tab |
