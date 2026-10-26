---
title: Protected Dashboard navigation in English and French — beta smoke
date: 2026-10-25
tags:
  - qa/browser-testing
  - authentication
  - localization
---

# Browser Test Report: Protected pages in English and French

**Access protection passed for the selected pages. French-language checks found three issues.** The same restricted employee could open Dashboard home and Box Office in both languages. Products, Reports, Create report, Customers and Payouts stayed blocked. After the requested profile-menu logout, all six sampled protected addresses went to login. French requests went to English login.

**This is an executed read-only smoke report, not a full permission or security audit.** Numbered steps describe what was performed; screenshots and capture times are beside the observations. No new login was submitted after signing out.

## Test index

Select a test to read its actions and screenshots. The final [results table](#results) links to the same IDs. These IDs belong to this report, not Qase.

- [TC-01 Confirm the logged-in employee and Organizer](#tc-01-confirm-the-logged-in-employee-and-organizer)
- [TC-02 English Dashboard and Box Office navigation](#tc-02-english-dashboard-and-box-office-navigation)
- [TC-03 French Dashboard and Box Office navigation](#tc-03-french-dashboard-and-box-office-navigation)
- [TC-04 Products access in both languages](#tc-04-products-access-in-both-languages)
- [TC-05 Saved reports access in both languages](#tc-05-saved-reports-access-in-both-languages)
- [TC-06 Create report access in both languages](#tc-06-create-report-access-in-both-languages)
- [TC-07 Customer management access in both languages](#tc-07-customer-management-access-in-both-languages)
- [TC-08 Payouts access in both languages](#tc-08-payouts-access-in-both-languages)
- [TC-09 Sign out through the top-right profile menu](#tc-09-sign-out-through-the-top-right-profile-menu)
- [TC-10 French protected addresses while signed out](#tc-10-french-protected-addresses-while-signed-out)
- [TC-11 English protected addresses while signed out](#tc-11-english-protected-addresses-while-signed-out)
- [TC-12 Compare French login with the protected-page redirect](#tc-12-compare-french-login-with-the-protected-page-redirect)
- [TC-13 Finish signed out in English](#tc-13-finish-signed-out-in-english)
- [BUG-01 French navigation controls remain English](#bug-01-jira-draft)
- [BUG-02 French Products permission message remains English](#bug-02-jira-draft)
- [BUG-03 French protected addresses lead to English login](#bug-03-jira-draft)

## Setup and agreed plan

- **Environment/date:** beta.showpass.com, October 25, 2026; new `/manage/` pages. Exact deployed Next.js version/build was not verified.
- **Browser:** the existing Codex sidebar, desktop view. No external browser, headless run, build or second session was started. Screen dimensions and mobile behavior were not tested.
- **Employee/Organizer:** **qa qa**, **1859-qa-cad (1859)**. Current permissions were exactly **Box Office** and **card sales**; owner and unrestricted access were false.
- **Languages:** default English `/manage/...`; French `/fr/manage/...`. Source supports both. Explicit language addresses were used; the desktop profile menu was used for logout, not for a language-setting change.
- **Plan:** TC-01 confirms setup; TC-02–08 compare signed-in English/French navigation and restrictions; TC-09 logs out through the top-right profile; TC-10–12 compare signed-out routes and login language; TC-13 leaves the browser signed out in English.
- **Refresh coverage:** Box Office and saved Reports were reloaded in both languages; French Products was also reloaded to reproduce its translation issue. While signed out, Reports was requested directly twice in each language. Reloading the resulting login screen was not counted as another protected-page check.
- **Allowed changes:** logout was explicitly requested. No cart item, payment, save, permission change, report generation, export, check-in, Qase write or Jira write was performed. No saved language preference was deliberately changed.
- **Evidence:** 43 real screenshots retained locally under `99 Archive/QA Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/`. They are Git-ignored and render at up to 600px wide; select an image to view its original.
- **How to repeat:** the signed-in checks require this employee to be signed in first. The recorded run already performed logout; do not assume that an open login page is still an employee session.

## TC-01 Confirm the logged-in employee and Organizer

**What this tests:** Establish that the browser starts with a logged-in employee and the correct restricted permissions.

**Start here:** The existing beta Dashboard is open. Keep its employee and Organizer unchanged.

### Steps

1. Select the **qa qa profile icon in the top-right corner**. Read the employee name and confirm that **Log Out** is offered. Do not log out yet.

   **Expected:** The employee profile menu opens for qa qa and offers Log Out.

   **Actual — Passed:** qa qa was signed in; the menu offered Log Out. It was left signed in for the English/French page checks.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/00-signed-in-profile-menu.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/00-signed-in-profile-menu.jpg" alt="Logged-in profile menu — en starting state" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:04:38 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Enter `https://beta.showpass.com/api/user/venues/session/get/` in the address bar. Then open `https://beta.showpass.com/api/user/venues/employments/` and inspect only the entry for Organizer **1859**.

   **Expected:** The current Organizer is 1859-qa-cad. The employee has only `use_box_office` and `use_box_office_card`, with `is_owner=false` and `no_restrictions=false`.

   **Actual — Passed:** both read-only responses confirmed those exact conditions. Relevant values were retained without capturing unrelated Organizer configuration.

   No screenshot was retained for these full responses because they contain other Organizer details. The relevant live-read values were:

   ```json
   {
     "organizer": {
       "id": 1859,
       "name": "1859-qa-cad"
     },
     "is_owner": false,
     "no_restrictions": false,
     "permissions": [
       "use_box_office_card",
       "use_box_office"
     ]
   }
   ```

## TC-02 English Dashboard and Box Office navigation

**What this tests:** Confirm that the allowed English pages open and the English home-page link reaches English Box Office.

**Start here:** qa qa is signed in for 1859-qa-cad; the cart is empty. Leave quantities at zero.

### Steps

1. Enter `https://beta.showpass.com/manage/` in the address bar. Check the greeting and home-page links.

   **Expected:** The signed-in Dashboard greets qa qa in English and offers Box office.

   **Actual — Passed:** the page showed “Hi” and “What would you like to do?” with Box office and My stats links.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/01-en-signed-in-home.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/01-en-signed-in-home.jpg" alt="Dashboard home — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:28 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Enter `https://beta.showpass.com/manage/box-office/sell/` directly. Wait for the selling screen to finish loading.

   **Expected:** Box Office shows the selling tabs and an empty Cart. The page does not refuse access.

   **Actual — Passed:** the English selling screen loaded with inventory and “Your cart is empty.” Nothing was added.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/02-en-signed-in-box-office.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/02-en-signed-in-box-office.jpg" alt="Box Office — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:29 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

3. Use the browser Reload button on that English Box Office page.

   **Expected:** Box Office remains available in English, with the cart empty.

   **Actual — Passed:** the screen reopened in English without a permission error or cart item.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/03-en-box-office-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/03-en-box-office-reload.jpg" alt="Box Office — en reload" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:53 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

4. Open the English Dashboard home again, then select its visible **Box office** link.

   **Expected:** The link opens `/manage/box-office/sell/` in English, keeping the employee signed in.

   **Actual — Passed:** the observed destination was the English Box Office URL.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/22-signed-in-en-box-office-home-link-home-link.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/22-signed-in-en-box-office-home-link-home-link.jpg" alt="Box Office home link — en home link" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:07:42 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

## TC-03 French Dashboard and Box Office navigation

**What this tests:** Compare allowed French pages and visible navigation text, and confirm that actual links preserve the French route.

**Start here:** Keep the same employee and Organizer. The cart remains empty.

### Steps

1. Enter `https://beta.showpass.com/fr/manage/` directly. Read the greeting, home links and left sidebar.

   **Expected:** The Dashboard remains accessible and its user-facing navigation is French.

   **Actual — Failed — language:** the French greeting “Salut” and “Que souhaitez-vous faire ?” appeared, with Billetterie and Mes statistiques. The left sidebar still showed Dashboard, Build, Operations and Account in English. Access itself passed.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/10-signed-in-fr-dashboard-home-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/10-signed-in-fr-dashboard-home-direct.jpg" alt="Dashboard home — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:33 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Enter `https://beta.showpass.com/fr/manage/box-office/sell/` directly. Read the selling screen and its item-category tabs.

   **Expected:** Box Office remains available, with French controls and an empty cart.

   **Actual — Failed — language:** the title was Vendre and the cart said “Votre panier est vide,” but the tabs still read Tickets, Products, Memberships and Gift Cards. The allowed selling screen loaded; no sale was attempted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/11-signed-in-fr-box-office-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/11-signed-in-fr-box-office-direct.jpg" alt="Box Office — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:47 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

3. Reload the French Box Office page.

   **Expected:** The same access and language behavior remains after a fresh page load.

   **Actual — Failed — language:** allowed access persisted, but the English category tabs and sidebar labels remained.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/12-signed-in-fr-box-office-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/12-signed-in-fr-box-office-reload.jpg" alt="Box Office — fr reload" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:48 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

4. From a French permission-denied page, select the left-sidebar **Dashboard** link.

   **Expected:** The link keeps `/fr/` and returns to the French Dashboard home.

   **Actual — Passed:** the destination was `https://beta.showpass.com/fr/manage/`; the French greeting appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/19-signed-in-fr-dashboard-sidebar-link-sidebar-link.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/19-signed-in-fr-dashboard-sidebar-link-sidebar-link.jpg" alt="Dashboard sidebar link — fr sidebar link" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:07:24 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

5. On that French home page, select **Billetterie**.

   **Expected:** The link opens `/fr/manage/box-office/sell/`, keeping French and the signed-in employee.

   **Actual — Passed:** the observed destination was the French Box Office URL.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/20-signed-in-fr-box-office-home-link-home-link.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/20-signed-in-fr-box-office-home-link-home-link.jpg" alt="Box Office home link — fr home link" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:07:25 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

### BUG-01 Jira draft

**Draft only — no Jira issue created.**

**Title:** fix (dashboard translations) | Navigation and Box Office category labels remain English on French pages

**GIVEN** an employee signed into the French Dashboard, with Box Office access

**WHEN** they open `/fr/manage/` and `/fr/manage/box-office/sell/`

**THEN — observed:** the sidebar still shows **Dashboard, Build, Operations and Account**. Box Office category tabs still show **Tickets, Products, Memberships and Gift Cards**, while the greeting, cart and other controls are French. The mixed-language state remains after refreshing Box Office.

**Expected:** user-facing navigation and category labels use the selected French language.

**Impact:** a French-speaking employee encounters English navigation while performing their normal selling workflow. Allowed access still works; this is a translation issue.

**Tested on:** beta, October 25, 2026, qa qa, Organizer 1859-qa-cad; Box Office and card sales only.

**Evidence:** [TC-03 steps 1–3](#tc-03-french-dashboard-and-box-office-navigation).

**Verification limit:** the exact deployed code and translation cause were not established. This does not claim that navigation is blocked or that data was exposed.

**Data safety and cleanup:** no saved-record change; no cart items or sales. Logout and final state are recorded separately.

## TC-04 Products access in both languages

**What this tests:** Confirm that this employee cannot view the product-management list or create/edit controls by typing the English or French page address. Also compare the language of the denial message.

**Start here:** Keep qa qa signed in for 1859-qa-cad with the two verified permissions. Do not save or generate anything.

### Steps

1. Enter `https://beta.showpass.com/manage/products/` in the address bar and press Enter. Read the page message and check that the product-management list or create/edit controls are unavailable.

   **Expected:** Access is refused. The page shows “It appears you don't have permission to view this page.” in English and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected English message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/04-signed-in-en-products-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/04-signed-in-en-products-direct.jpg" alt="Products — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:54 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Enter `https://beta.showpass.com/fr/manage/products/` in the address bar and press Enter. Read the page message and check that the product-management list or create/edit controls are unavailable.

   **Expected:** Access is refused. The page shows “Il semble que vous n'ayez pas l'autorisation d'afficher cette page.” in French and does not show the protected management content.

   **Actual — Failed — language:** access was refused and no product-management content appeared, but the title “Pas de permission” was followed by the English denial and administrator messages.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/13-signed-in-fr-products-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/13-signed-in-fr-products-direct.jpg" alt="Products — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:52 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

3. Use the browser Reload button while still on `https://beta.showpass.com/fr/manage/products/`. Read the denial message again.

   **Expected:** The same permission restriction remains, with the message in French.

   **Actual — Failed — language:** access remained blocked, but the English denial messages persisted on the French Products URL.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/21-signed-in-fr-products-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/21-signed-in-fr-products-reload.jpg" alt="Products — fr reload" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:07:27 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

### BUG-02 Jira draft

**Draft only — no Jira issue created.**

**Title:** fix (products translations) | French Products page shows its permission-denied message in English

**GIVEN** a signed-in employee without product-management permission; tested permissions were `use_box_office` and `use_box_office_card` only

**WHEN** they directly open `https://beta.showpass.com/fr/manage/products/` and refresh the page

**THEN — observed:** access is correctly refused, and the title is **Pas de permission**, but the body says **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”**

**Expected:** the denial text is French: **“Il semble que vous n’ayez pas l’autorisation d’afficher cette page.”** and **“Veuillez contacter votre administrateur si vous avez besoin d’un accès.”**

**Impact:** a French-speaking employee receives an untranslated explanation of why Products is unavailable. The access restriction itself is working.

**Tested on:** beta, October 25, 2026, qa qa, Organizer 1859-qa-cad.

**Evidence:** [TC-04 French direct access and refresh](#tc-04-products-access-in-both-languages). Reports, Create report, Customers and Payouts supplied French denial text under the same session.

**Verification limit:** local source contains the French strings, but the precise deployed cause was not established. No save or permission change was attempted.

**Data safety and cleanup:** no data change; the employee was later signed out as requested.

## TC-05 Saved reports access in both languages

**What this tests:** Confirm that this employee cannot view saved report names or Download/Edit/Clone/Delete actions by typing the English or French page address. Also compare the language of the denial message.

**Start here:** Keep qa qa signed in for 1859-qa-cad with the two verified permissions. Do not save or generate anything.

### Steps

1. Enter `https://beta.showpass.com/manage/reports/` in the address bar and press Enter. Read the page message and check that saved report names or Download/Edit/Clone/Delete actions are unavailable.

   **Expected:** Access is refused. The page shows “It appears you don't have permission to view this page.” in English and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected English message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/05-signed-in-en-saved-reports-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/05-signed-in-en-saved-reports-direct.jpg" alt="Saved reports — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:55 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Use the browser Reload button while still on `https://beta.showpass.com/manage/reports/`. Read the denial message again.

   **Expected:** The same permission restriction remains, with the message in English.

   **Actual — Passed:** the page remained blocked and the denial message retained the expected language.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/06-signed-in-en-saved-reports-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/06-signed-in-en-saved-reports-reload.jpg" alt="Saved reports — en reload" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:56 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

3. Enter `https://beta.showpass.com/fr/manage/reports/` in the address bar and press Enter. Read the page message and check that saved report names or Download/Edit/Clone/Delete actions are unavailable.

   **Expected:** Access is refused. The page shows “Il semble que vous n'ayez pas l'autorisation d'afficher cette page.” in French and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected French message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/14-signed-in-fr-saved-reports-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/14-signed-in-fr-saved-reports-direct.jpg" alt="Saved reports — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:53 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

4. Use the browser Reload button while still on `https://beta.showpass.com/fr/manage/reports/`. Read the denial message again.

   **Expected:** The same permission restriction remains, with the message in French.

   **Actual — Passed:** the page remained blocked and the denial message retained the expected language.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/15-signed-in-fr-saved-reports-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/15-signed-in-fr-saved-reports-reload.jpg" alt="Saved reports — fr reload" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:54 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

## TC-06 Create report access in both languages

**What this tests:** Confirm that this employee cannot view a report-generation form by typing the English or French page address. Also compare the language of the denial message.

**Start here:** Keep qa qa signed in for 1859-qa-cad with the two verified permissions. Do not save or generate anything.

### Steps

1. Enter `https://beta.showpass.com/manage/reports/create/` in the address bar and press Enter. Read the page message and check that a report-generation form are unavailable.

   **Expected:** Access is refused. The page shows “It appears you don't have permission to view this page.” in English and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected English message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/07-signed-in-en-create-report-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/07-signed-in-en-create-report-direct.jpg" alt="Create report — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:57 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Enter `https://beta.showpass.com/fr/manage/reports/create/` in the address bar and press Enter. Read the page message and check that a report-generation form are unavailable.

   **Expected:** Access is refused. The page shows “Il semble que vous n'ayez pas l'autorisation d'afficher cette page.” in French and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected French message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/16-signed-in-fr-create-report-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/16-signed-in-fr-create-report-direct.jpg" alt="Create report — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:55 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

## TC-07 Customer management access in both languages

**What this tests:** Confirm that this employee cannot view the customer-management list or actions by typing the English or French page address. Also compare the language of the denial message.

**Start here:** Keep qa qa signed in for 1859-qa-cad with the two verified permissions. Do not save or generate anything.

### Steps

1. Enter `https://beta.showpass.com/manage/network/customers/` in the address bar and press Enter. Read the page message and check that the customer-management list or actions are unavailable.

   **Expected:** Access is refused. The page shows “It appears you don't have permission to view this page.” in English and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected English message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/08-signed-in-en-customers-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/08-signed-in-en-customers-direct.jpg" alt="Customers — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:58 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Enter `https://beta.showpass.com/fr/manage/network/customers/` in the address bar and press Enter. Read the page message and check that the customer-management list or actions are unavailable.

   **Expected:** Access is refused. The page shows “Il semble que vous n'ayez pas l'autorisation d'afficher cette page.” in French and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected French message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/17-signed-in-fr-customers-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/17-signed-in-fr-customers-direct.jpg" alt="Customers — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:57 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

## TC-08 Payouts access in both languages

**What this tests:** Confirm that this employee cannot view payout amounts or payout actions by typing the English or French page address. Also compare the language of the denial message.

**Start here:** Keep qa qa signed in for 1859-qa-cad with the two verified permissions. Do not save or generate anything.

### Steps

1. Enter `https://beta.showpass.com/manage/finance/payouts/` in the address bar and press Enter. Read the page message and check that payout amounts or payout actions are unavailable.

   **Expected:** Access is refused. The page shows “It appears you don't have permission to view this page.” in English and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected English message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/09-signed-in-en-payouts-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/09-signed-in-en-payouts-direct.jpg" alt="Payouts — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:05:59 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Enter `https://beta.showpass.com/fr/manage/finance/payouts/` in the address bar and press Enter. Read the page message and check that payout amounts or payout actions are unavailable.

   **Expected:** Access is refused. The page shows “Il semble que vous n'ayez pas l'autorisation d'afficher cette page.” in French and does not show the protected management content.

   **Actual — Passed:** the page refused access with the expected French message. No protected management content or its actions appeared in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/18-signed-in-fr-payouts-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/18-signed-in-fr-payouts-direct.jpg" alt="Payouts — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:06:58 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

## TC-09 Sign out through the top-right profile menu

**What this tests:** End the existing employee session using the requested top-right profile menu, then independently check that the profile is no longer accessible.

**Start here:** Signed in as qa qa on the French Reports denial page. The English and French signed-in checks are complete.

### Steps

1. Select the **qa qa profile icon in the top-right corner**. Find **Se déconnecter** in the opened menu.

   **Expected:** The French logout option is available for the current employee.

   **Actual — Passed:** the profile menu opened and offered Se déconnecter.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/23-signed-in-fr-profile-menu-before-logout-profile-click.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/23-signed-in-fr-profile-menu-before-logout-profile-click.jpg" alt="Profile menu before logout — fr profile click" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:07:51 p.m. MDT — beta; qa qa, Organizer 1859-qa-cad.

2. Select **Se déconnecter** once. Wait for the employee profile to disappear and read the destination.

   **Expected:** The employee is signed out; protected Reports content is unavailable and login is shown.

   **Actual — Passed:** the browser reached `https://beta.showpass.com/fr/accounts/login/?next=/manage/reports/`, showing Se connecter, Adresse courriel and Mot de passe. No credentials were entered.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/24-signed-out-fr-after-profile-logout-logout-click.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/24-signed-out-fr-after-profile-logout-logout-click.jpg" alt="After profile logout — fr logout click" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:08:06 p.m. MDT — beta; signed out.

3. Enter `https://beta.showpass.com/api/auth/profile/` directly. Read the response without logging in.

   **Expected:** The profile request is refused and no employee profile is returned.

   **Actual — Passed:** the response was `{"detail":"Informations d'authentification non fournies."}`. HTTP status and response headers were not captured.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/25-signed-out-fr-profile-refused-after-logout-direct-data-request.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/25-signed-out-fr-profile-refused-after-logout-direct-data-request.jpg" alt="Profile refused after logout — fr direct data request" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:08:22 p.m. MDT — beta; signed out.

## TC-10 French protected addresses while signed out

**What this tests:** Confirm that a signed-out visitor is sent to login for each protected address, and check that the login language matches the requested page.

**Start here:** The profile-menu logout and refused profile response are complete. Stay signed out; do not submit login or use social sign-in.

### Steps

1. Enter `https://beta.showpass.com/fr/manage/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in French, with the intended Dashboard home page as the return destination. Expected login address: `https://beta.showpass.com/fr/accounts/login/?next=/manage/`. No protected page content or employee profile is shown.

   **Actual — Failed — language:** access was blocked, but the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/` with English labels Email address, Password and Log in. French was lost.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/26-signed-out-fr-dashboard-home-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/26-signed-out-fr-dashboard-home-direct.jpg" alt="Dashboard home — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:08:54 p.m. MDT — beta; signed out.

2. Enter `https://beta.showpass.com/fr/manage/products/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in French, with the intended Products page as the return destination. Expected login address: `https://beta.showpass.com/fr/accounts/login/?next=/manage/products/`. No protected page content or employee profile is shown.

   **Actual — Failed — language:** access was blocked, but the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/products/` with English labels Email address, Password and Log in. French was lost.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/27-signed-out-fr-products-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/27-signed-out-fr-products-direct.jpg" alt="Products — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:08:58 p.m. MDT — beta; signed out.

3. Enter `https://beta.showpass.com/fr/manage/reports/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in French, with the intended Saved reports page as the return destination. Expected login address: `https://beta.showpass.com/fr/accounts/login/?next=/manage/reports/`. No protected page content or employee profile is shown.

   **Actual — Failed — language:** access was blocked, but the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/reports/` with English labels Email address, Password and Log in. French was lost.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/28-signed-out-fr-saved-reports-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/28-signed-out-fr-saved-reports-direct.jpg" alt="Saved reports — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:03 p.m. MDT — beta; signed out.

4. Enter the protected Reports address `https://beta.showpass.com/fr/manage/reports/` again. This is another protected-page request, not a reload of the resulting login form.

   **Expected:** Access is refused again and the login language remains French.

   **Actual — Failed — language:** the repeated protected request again reached English login. The Reports page remained unavailable.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/29-signed-out-fr-saved-reports-repeat-protected-url.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/29-signed-out-fr-saved-reports-repeat-protected-url.jpg" alt="Saved reports — fr repeat protected URL" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:29 p.m. MDT — beta; signed out.

5. Enter `https://beta.showpass.com/fr/manage/reports/create/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in French, with the intended Create report page as the return destination. Expected login address: `https://beta.showpass.com/fr/accounts/login/?next=/manage/reports/create/`. No protected page content or employee profile is shown.

   **Actual — Failed — language:** access was blocked, but the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/reports/create/` with English labels Email address, Password and Log in. French was lost.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/30-signed-out-fr-create-report-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/30-signed-out-fr-create-report-direct.jpg" alt="Create report — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:30 p.m. MDT — beta; signed out.

6. Enter `https://beta.showpass.com/fr/manage/network/customers/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in French, with the intended Customers page as the return destination. Expected login address: `https://beta.showpass.com/fr/accounts/login/?next=/manage/network/customers/`. No protected page content or employee profile is shown.

   **Actual — Failed — language:** access was blocked, but the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/network/customers/` with English labels Email address, Password and Log in. French was lost.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/31-signed-out-fr-customers-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/31-signed-out-fr-customers-direct.jpg" alt="Customers — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:32 p.m. MDT — beta; signed out.

7. Enter `https://beta.showpass.com/fr/manage/finance/payouts/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in French, with the intended Payouts page as the return destination. Expected login address: `https://beta.showpass.com/fr/accounts/login/?next=/manage/finance/payouts/`. No protected page content or employee profile is shown.

   **Actual — Failed — language:** access was blocked, but the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/finance/payouts/` with English labels Email address, Password and Log in. French was lost.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/32-signed-out-fr-payouts-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/32-signed-out-fr-payouts-direct.jpg" alt="Payouts — fr direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:33 p.m. MDT — beta; signed out.

### BUG-03 Jira draft

**Draft only — no Jira issue created.**

**Title:** fix (dashboard authentication) | French protected URLs redirect signed-out visitors to English login

**GIVEN** a signed-out visitor who requests a French protected Dashboard page

**WHEN** they directly open `https://beta.showpass.com/fr/manage/reports/`

**THEN — observed:** the browser redirects to `https://beta.showpass.com/accounts/login/?next=/manage/reports/`, with **Email address**, **Password** and **Log in** in English. The same language loss occurred for Dashboard home, Products, Create report, Customers and Payouts. A repeated Reports request produced the same result.

**Expected:** access remains blocked, but login stays French, for example `https://beta.showpass.com/fr/accounts/login/?next=/manage/reports/`, with **Adresse courriel**, **Mot de passe** and **Se connecter**.

**Impact:** a French-speaking visitor loses their selected language when asked to authenticate for a protected page. No protected-data exposure was observed.

**Tested on:** beta, October 25, 2026, after signing qa qa out through the top-right profile menu. The profile request refused access.

**Evidence:** [TC-10 all six French addresses](#tc-10-french-protected-addresses-while-signed-out) and [TC-12 French login comparison](#tc-12-compare-french-login-with-the-protected-page-redirect).

**Verification limit:** no login was submitted after the redirect; the actual destination and language after signing back in were not tested. This is a language-preservation defect, not an authentication bypass.

**Data safety and cleanup:** no saved-record change. Browser left signed out on English login.

## TC-11 English protected addresses while signed out

**What this tests:** Confirm that a signed-out visitor is sent to login for each protected address, and check that the login language matches the requested page.

**Start here:** The profile-menu logout and refused profile response are complete. Stay signed out; do not submit login or use social sign-in.

### Steps

1. Enter `https://beta.showpass.com/manage/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in English, with the intended Dashboard home page as the return destination. Expected login address: `https://beta.showpass.com/accounts/login/?next=/manage/`. No protected page content or employee profile is shown.

   **Actual — Passed:** the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/` with English login. No protected page content or qa qa profile appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/33-signed-out-en-dashboard-home-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/33-signed-out-en-dashboard-home-direct.jpg" alt="Dashboard home — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:34 p.m. MDT — beta; signed out.

2. Enter `https://beta.showpass.com/manage/products/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in English, with the intended Products page as the return destination. Expected login address: `https://beta.showpass.com/accounts/login/?next=/manage/products/`. No protected page content or employee profile is shown.

   **Actual — Passed:** the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/products/` with English login. No protected page content or qa qa profile appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/34-signed-out-en-products-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/34-signed-out-en-products-direct.jpg" alt="Products — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:35 p.m. MDT — beta; signed out.

3. Enter `https://beta.showpass.com/manage/reports/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in English, with the intended Saved reports page as the return destination. Expected login address: `https://beta.showpass.com/accounts/login/?next=/manage/reports/`. No protected page content or employee profile is shown.

   **Actual — Passed:** the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/reports/` with English login. No protected page content or qa qa profile appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/35-signed-out-en-saved-reports-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/35-signed-out-en-saved-reports-direct.jpg" alt="Saved reports — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:36 p.m. MDT — beta; signed out.

4. Enter the protected Reports address `https://beta.showpass.com/manage/reports/` again. This is another protected-page request, not a reload of the resulting login form.

   **Expected:** Access is refused again and the login language remains English.

   **Actual — Passed:** the repeated request again reached English login; Reports remained unavailable.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/36-signed-out-en-saved-reports-repeat-protected-url.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/36-signed-out-en-saved-reports-repeat-protected-url.jpg" alt="Saved reports — en repeat protected URL" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:39 p.m. MDT — beta; signed out.

5. Enter `https://beta.showpass.com/manage/reports/create/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in English, with the intended Create report page as the return destination. Expected login address: `https://beta.showpass.com/accounts/login/?next=/manage/reports/create/`. No protected page content or employee profile is shown.

   **Actual — Passed:** the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/reports/create/` with English login. No protected page content or qa qa profile appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/37-signed-out-en-create-report-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/37-signed-out-en-create-report-direct.jpg" alt="Create report — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:40 p.m. MDT — beta; signed out.

6. Enter `https://beta.showpass.com/manage/network/customers/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in English, with the intended Customers page as the return destination. Expected login address: `https://beta.showpass.com/accounts/login/?next=/manage/network/customers/`. No protected page content or employee profile is shown.

   **Actual — Passed:** the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/network/customers/` with English login. No protected page content or qa qa profile appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/38-signed-out-en-customers-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/38-signed-out-en-customers-direct.jpg" alt="Customers — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:41 p.m. MDT — beta; signed out.

7. Enter `https://beta.showpass.com/manage/finance/payouts/` in the address bar and press Enter. Check the destination, login labels and absence of the employee’s page content.

   **Expected:** Login appears in English, with the intended Payouts page as the return destination. Expected login address: `https://beta.showpass.com/accounts/login/?next=/manage/finance/payouts/`. No protected page content or employee profile is shown.

   **Actual — Passed:** the browser landed at `https://beta.showpass.com/accounts/login/?next=/manage/finance/payouts/` with English login. No protected page content or qa qa profile appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/39-signed-out-en-payouts-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/39-signed-out-en-payouts-direct.jpg" alt="Payouts — en direct" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:09:42 p.m. MDT — beta; signed out.

## TC-12 Compare French login with the protected-page redirect

**What this tests:** Distinguish an unavailable French login page from a protected-page redirect that loses French.

**Start here:** Remain signed out. Both language passes are complete; do not enter login credentials.

### Steps

1. Open `https://beta.showpass.com/fr/accounts/login/?next=/manage/reports/` directly.

   **Expected:** The existing French login page renders in French.

   **Actual — Passed:** the direct French login page showed Adresse courriel and Se connecter.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/40-signed-out-fr-french-login-direct-control-direct-login-control.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/40-signed-out-fr-french-login-direct-control-direct-login-control.jpg" alt="French login direct control — fr direct login control" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:10:51 p.m. MDT — beta; signed out.

2. From that French login page, enter `https://beta.showpass.com/fr/manage/reports/` in the address bar.

   **Expected:** The access check refuses Reports while preserving French login.

   **Actual — Failed — language:** the browser again went to English `/accounts/login/?next=/manage/reports/`. This reproduced the redirect issue even after the French login page had just rendered successfully.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/41-signed-out-fr-french-report-loses-locale-after-french-login-control-direct-protected-url.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/41-signed-out-fr-french-report-loses-locale-after-french-login-control-direct-protected-url.jpg" alt="French report loses locale after French login control — fr direct protected URL" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:10:52 p.m. MDT — beta; signed out.

## TC-13 Finish signed out in English

**What this tests:** Leave the requested final session state without creating records or submitting credentials.

**Start here:** The employee has already been signed out through the profile menu.

### Steps

1. Enter `https://beta.showpass.com/manage/` in the address bar and leave the resulting login screen open. Check the email and password fields without typing.

   **Expected:** English login appears; both credential fields are empty and the employee remains signed out.

   **Actual — Passed:** the final URL was `https://beta.showpass.com/accounts/login/?next=/manage/`. Both visible email and password inputs were empty.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/42-signed-out-en-final-english-login-finish.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/protected-dashboard-english-french-beta-smoke-2026-10-25/42-signed-out-en-final-english-login-finish.jpg" alt="Final English login — en finish" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-25, 6:10:53 p.m. MDT — beta; signed out.

## Postconditions and cleanup

- The user-requested logout changed the browser session only. The employee remains signed out.
- No new login was submitted; user action is not needed to complete these recorded checks. A later signed-in task will need the user to log in.
- No cart items, purchases, saved forms, permission changes, report jobs, exports, Qase changes or Jira issues were created.
- No browser data was manually cleared. No temporary text dumps or inspection scripts were saved. Images are preserved for review and remain ignored by Git.

## Scope limits

- **Post-login return:** not run. The `next` query text was observed, but no sign-in was submitted to prove the final page or language after login.
- **Loading and response contents:** no frame-by-frame capture, protected HTML/page-data inspection or full network trace. Page observations do not prove that no earlier frame or uninspected response contained data. Those checks are outside this focused smoke run.
- **Saved actions:** no server-side create/edit/delete, payment, refund or report-generation permission challenge.
- **Other clients/pages:** no mobile/device testing, other roles or Organizers, arbitrary record-detail pages, or all Dashboard pages. Signed-out Box Office was outside the declared six-page sample.
- **Previous Gift Cards issue:** not retested in this language quest; its October 23 report remains separate.
- **Tool observation:** the first French home wait expected Tableau de bord, but the actual sidebar label was Dashboard. The visible French greeting and `/fr/` URL established French. French-login expectations also failed because the application actually redirected to English; subsequent checks used the observed English form while retaining the Failed language result. No application error was inferred from a locator timeout alone.

## Supporting source

Local backend `607ba2e538` and frontend `7164d84fd0` were reviewed; deployed beta revisions were not established. Source explains expectations and possible causes, not live passes.

- Frontend [supported languages](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/next-i18next.config.js>): English and French, default English.
- Frontend [navigation language and logout actions](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/navigation/hooks/useNavBarActions.ts>): locale-aware router navigation and the session logout action. The profile control itself is in [DashboardNavBarUserMenu](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/components/navigation/DashboardNavBarUserMenu/DashboardNavBarUserMenu.web.tsx>).
- Frontend [French Dashboard strings](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/assets/locales/fr/dashboard.json>) contain both translated permission-denied messages. [DashboardUnavailable](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/layouts/DashboardUnavailable/DashboardUnavailable.web.tsx>) reads the dashboard translation group. The [Products page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/manage/products/index.tsx>) supplies product/constants translations to its static-props helper. This is a source lead for BUG-02, not a confirmed deployed root cause.
- Frontend [Dashboard route labels](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/components/navigation/DashboardNavBarUserMenu/hooks/useDashboardRoutes.tsx>) use the dashboard translation group. The observed missing French labels are recorded under BUG-01.
- Frontend [authentication middleware](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/middleware.ts:724>) checks `/manage` and builds a login URL from SITE_URL plus `accounts/login/?next=` and the normalized pathname. The local construction does not explicitly preserve the requested locale; this is consistent with BUG-03, but the deployed build was not inspected.
- Backend [logout test](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/tests/auth/test_profile.py>) establishes supported session logout. The live profile refusal after the UI logout supplied this run’s independent signed-out evidence.

## Results

**The sampled access restrictions passed. The English/French navigation check has three recorded language failures.** There was no observed protected-page exposure. This does not clear the untested saved-action, response-body or post-login checks. The user has not classified the translation findings as release-blocking or accepted them; this is not an overall release approval.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Employee and Organizer | Passed | Current qa qa session; Organizer 1859; exactly Box Office and card sales. | [TC-01 — steps 1–2](#tc-01-confirm-the-logged-in-employee-and-organizer) |
| English allowed pages and links | Passed | Dashboard and Box Office opened; link and Box Office reload stayed English. | [TC-02 — steps 1–4](#tc-02-english-dashboard-and-box-office-navigation) |
| French allowed pages and links | Failed | Allowed access and French routes worked; sidebar and category labels remained English (BUG-01). | [TC-03 — steps 1–5](#tc-03-french-dashboard-and-box-office-navigation) |
| Products — English/French | Failed | Access denied in both; French page kept English denial text after refresh (BUG-02). | [TC-04 — steps 1–3](#tc-04-products-access-in-both-languages) |
| Saved reports — English/French | Passed | Both languages refused access with the correct denial language, including reloads. | [TC-05 — steps 1–4](#tc-05-saved-reports-access-in-both-languages) |
| Create report — English/French | Passed | Both languages refused access with the expected denial text. | [TC-06 — steps 1–2](#tc-06-create-report-access-in-both-languages) |
| Customers — English/French | Passed | Both languages refused customer management with the expected denial text. | [TC-07 — steps 1–2](#tc-07-customer-management-access-in-both-languages) |
| Payouts — English/French | Passed | Both languages refused payout data/actions with the expected denial text. | [TC-08 — steps 1–2](#tc-08-payouts-access-in-both-languages) |
| Profile-menu logout | Passed | Se déconnecter ended the employee session; profile request was refused. | [TC-09 — steps 1–3](#tc-09-sign-out-through-the-top-right-profile-menu) |
| Signed-out French protected addresses | Failed | All six pages blocked, but login switched to English (BUG-03). Repeated Reports request did the same. | [TC-10 — steps 1–7](#tc-10-french-protected-addresses-while-signed-out) |
| Signed-out English protected addresses | Passed | All six pages sent to English login; repeated Reports request stayed protected. | [TC-11 — steps 1–7](#tc-11-english-protected-addresses-while-signed-out) |
| French login comparison | Failed | Direct French login worked; requesting French Reports then switched back to English login (BUG-03). | [TC-12 — steps 1–2](#tc-12-compare-french-login-with-the-protected-page-redirect) |
| Final session state | Passed | Signed out in English; email/password empty; no saved records changed. | [TC-13 — step 1](#tc-13-finish-signed-out-in-english) |
| Post-login destination and language | Not run | No credentials submitted after logout; no proof of the final return page. Refer to scope limits. | [Scope limits — post-login check](#scope-limits) |
| Saved-action, loading, response-body and other-client checks | Not run | Outside the focused read-only navigation sample. Refer to scope limits. | [Scope limits — checks not run](#scope-limits) |
