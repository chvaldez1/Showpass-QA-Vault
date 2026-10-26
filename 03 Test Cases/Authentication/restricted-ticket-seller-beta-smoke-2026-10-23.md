---
title: Restricted employee dashboard access — beta smoke
date: 2026-10-23
updated: 2026-10-25
tags:
  - qa/browser-testing
  - authentication
---

# Browser Test Report: Box Office and card-sales permissions

**Result: the six selected restricted pages were blocked, but Gift Cards remained accessible.** The employee could see an existing gift card and open a blank creation form. No gift card was created or edited. This run does not pass the requested restriction to Box Office and card sales alone.

**Read this as a step-by-step guide.** Each test names its starting point, actions and expected result. **Actual** records what happened on October 23; this wording update on October 25 did not rerun the tests. The steps are read-only. Do not create a cart, submit a payment or save a form.

## Test index

Select a test below, or use the linked test ID in the [results table](#results). IDs belong to this report; they are not Qase case IDs.

- [TC-01 Confirm the employee and Organizer](#tc-01-confirm-the-employee-and-organizer)
- [TC-02 Allowed Box Office access](#tc-02-allowed-box-office-access)
- [TC-03 Operations menu](#tc-03-operations-menu)
- [TC-04 Build menu](#tc-04-build-menu)
- [TC-05 Account menu](#tc-05-account-menu)
- [TC-06 Dashboard home shortcuts](#tc-06-dashboard-home-shortcuts)
- [TC-07 Products list](#tc-07-products-list)
- [TC-08 Create product](#tc-08-create-product)
- [TC-09 Saved reports](#tc-09-saved-reports)
- [TC-10 Create report](#tc-10-create-report)
- [TC-11 Customers](#tc-11-customers)
- [TC-12 Payouts](#tc-12-payouts)
- [TC-13 Unexpected Gift Cards access](#tc-13-unexpected-gift-cards-access)
- [TC-14 Direct reports data request](#tc-14-direct-reports-data-request)
- [TC-15 Checks not run](#tc-15-checks-not-run)
- [TC-16 Postconditions and Cleanup](#tc-16-postconditions-and-cleanup)
- [BUG-01 Jira draft — Gift Cards access](#bug-01-jira-draft)

## Setup / Prerequisites

- **Environment:** beta.showpass.com, October 23, 2026, Codex browser sidebar; new `/manage/` pages only.
- **Employee:** **qa qa**, with only **Box Office** and **card sales**. This was checked from the saved permission values, not assumed from a role name. The employee was neither an owner nor unrestricted.
- **Organizer:** 1859-qa-cad, confirmed by the current-session response as Organizer 1859. No Organizer was switched.
- **View:** the existing desktop browser sidebar. Exact screen dimensions and mobile behavior were not checked.
- **Scope:** allowed selling-screen access; Dashboard navigation; six restricted pages through direct URLs and reload; unexpected Gift Cards access; one direct reports data request.
- **Allowed changes:** read-only navigation. No item was added to a cart, no sale submitted, no records saved, no report generated, and no Qase or permission changes.
- **Build:** user-reported Next.js version bump. The exact deployed build was not established.
- **Evidence:** screenshots below are local, ignored by Git, and displayed at 600px wide. Click to open the original.
- **Run used for these results:** the October 23 rerun after the two permissions were clarified. The earlier interrupted attempt is not counted. To repeat a test, first confirm the same employee, Organizer and two permissions. This report does not change them for you.

## TC-01 Confirm the employee and Organizer

**What this tests:** Confirm that this is the employee and Organizer needed for the restricted-access tests.

**Start here:** The beta browser is already signed in as **qa qa**. Do not sign out or change the employee’s permissions.

### Steps

1. **Check the employee’s permissions.** Enter `https://beta.showpass.com/api/user/venues/employments/` in the browser address bar and press Enter. In the returned text, find the entry whose `venue.id` is `1859`. Read that entry’s `permissions`, `is_owner` and `no_restrictions` values.

   **Expected:** the `permissions` list contains exactly `use_box_office` (Box Office) and `use_box_office_card` (card sales). Both `is_owner` and `no_restrictions` are `false`.

   **Actual — Passed:** **1859-qa-cad** returned exactly those two permissions, with both owner and unrestricted access set to false. The original permission values are retained under [Supporting source and open question](#supporting-source-and-open-question).

   2026-10-23, 4:20:58 p.m. MDT — live browser response. Only these relevant fields are retained; a screenshot of the full response would include unrelated Organizer details.

2. **Check the selected Organizer.** Enter `https://beta.showpass.com/api/user/venues/session/get/` in the address bar and press Enter. Read the returned `id` and `name`.

   **Expected:** the response contains `id: 1859` and `name: 1859-qa-cad`. If either differs, these are not the recorded employee/Organizer conditions for this run.

   **Actual — Passed:** the response identified **1859-qa-cad (1859)**. This check was made at the end of the run; no selection was changed. Only the relevant ID/name are retained.

## TC-02 Allowed Box Office access

**What this tests:** Confirm that the employee can open Box Office and see tickets available to sell. This does not test completing a card payment.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**. The cart must be empty; leave it empty.

### Steps

1. **Open the selling screen.** Enter `https://beta.showpass.com/manage/box-office/sell/` in the address bar and press Enter. Check that ticket names, prices and quantity controls load and that the cart is empty. Leave all quantities at zero.

   **Expected:** the selling screen shows ticket inventory, prices and quantity controls. The cart shows **Your cart is empty**. The page does not refuse access. No purchase is needed to pass this screen-access check.

   **Actual — Passed:** Tickets, Products, Memberships and Gift Cards selling tabs were available. Ticket inventory and prices loaded, and the cart was empty. This proves screen access; no card payment was attempted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/11-box-office.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/11-box-office.jpg" alt="Allowed Box Office selling screen with empty cart" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:06 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-03 Operations menu

**What this tests:** Check which links appear in the **Operations** menu for an employee with only Box Office and card sales.

**Start here:** Use the signed-in Dashboard sidebar. The October 23 screenshot was taken from **Box Office → Sell**.

### Steps

1. **Check the Box Office links.** Select **Operations** in the left sidebar. In the menu that opens, read the links under **Box Office** and check whether any other Operations sections are offered.

   **Expected:** **Sell** and **Settings** appear under **Box Office**. No **Check-in**, **Holds**, **Guestlists** or **Transactions** management link appears in this menu for the tested two-permission setup. This menu check does not prove that every corresponding direct URL is blocked.

   **Actual — Passed:** the refreshed menu contained Sell and Settings. It did not contain Transactions, Check-in or other Operations management links.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/12-operations-current.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/12-operations-current.jpg" alt="Operations menu contains Sell and Settings" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:07 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-04 Build menu

**What this tests:** Check whether the **Build** menu offers gift-card management to an employee intended only to use Box Office and card sales.

**Start here:** Use the signed-in Dashboard sidebar. The October 23 screenshot was taken from **Box Office → Sell**.

### Steps

1. **Check for gift-card management links.** Select **Build** in the left sidebar. Look specifically for **Gift Cards → All gift cards** and **Gift Cards → Create gift card**. Record whether those links appear; do not select either link for this menu check.

   **Expected:** for the requested Box Office-only restriction, **All gift cards** and **Create gift card** should be unavailable. This step checks the links only; [TC-13](#tc-13-unexpected-gift-cards-access) checks whether the linked screens actually open.

   **Actual — Failed against the requested restriction:** the menu displayed **Gift Cards → All gift cards** and **Gift Cards → Create gift card**. Products management was absent. The screenshot below shows the unexpected links; [TC-13, steps 1–3](#tc-13-unexpected-gift-cards-access) records the screen-access checks. No saved create/edit action was tested.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/13-build-current.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/13-build-current.jpg" alt="Build menu exposes Gift Cards links" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:15 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-05 Account menu

**What this tests:** Check that the **Account** menu offers personal account pages without Organizer management pages.

**Start here:** Use the signed-in Dashboard home page for **1859-qa-cad**.

### Steps

1. **Check the personal account links.** Select **Account** in the left sidebar and read all links in the opened menu.

   **Expected:** the menu contains **Profile** and **Notifications**. It does not offer Organizer settings, employee management or payout management.

   **Actual — Passed:** only Profile and Notifications appeared.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/31-account-menu.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/31-account-menu.jpg" alt="Account menu shows personal account links" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:23:26 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-06 Dashboard home shortcuts

**What this tests:** Record the shortcuts displayed on the Dashboard home page. Opening Transactions and checking whose sales appear is a separate test that was not run.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**.

### Steps

1. **Inspect the home-page shortcuts.** Open `https://beta.showpass.com/manage/` in the address bar. Read the links under **What would you like to do?** Do not open **Transactions** as part of this recorded check.

   **Expected:** the page identifies the signed-in employee and offers **Box office** and **My stats**. Record whether **Transactions** is also shown. Seeing a Transactions link alone is not a failure: Box Office employees can have access to their own sales.

   **Actual — Observed; transaction access not run:** Box office, My stats and Transactions shortcuts were visible. The Operations menu hid Transactions. The backend permits Box Office employees to read their own sales, so this shortcut is not classified as an unauthorized-data bug. The Transactions page and record ownership checks were not run.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/29-dashboard-current.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/29-dashboard-current.jpg" alt="Dashboard shortcuts for restricted employee" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:23:16 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-07 Products list

**What this tests:** Check that typing the Products management address directly does not reveal the product list or product-management controls.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**, on any page. Do not use Box Office’s **Products** selling tab; that is a different screen.

### Steps

1. **Try the page without using its menu.** Enter `https://beta.showpass.com/manage/products/` in the browser address bar and press Enter. Read the message and check whether the protected content listed below is visible.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show a product-management list or product create/edit controls.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The product-management list or create/edit controls did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/14-products-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/14-products-direct.jpg" alt="Products list direct shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:22 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

2. **Repeat after refresh.** Use the browser’s Reload button while still on `https://beta.showpass.com/manage/products/`. Check the same message and protected content again.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show a product-management list or product create/edit controls.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The product-management list or create/edit controls did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/15-products-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/15-products-reload.jpg" alt="Products list reload shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:33 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-08 Create product

**What this tests:** Check that typing the Create product address directly does not open a product-creation form.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**, on any page.

### Steps

1. **Try the page without using its menu.** Enter `https://beta.showpass.com/manage/products/create/` in the browser address bar and press Enter. Read the message and check whether the protected content listed below is visible.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show a product-creation form or fields to enter a new product.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The product creation form did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/16-create-product-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/16-create-product-direct.jpg" alt="Create product direct shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:42 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

2. **Repeat after refresh.** Use the browser’s Reload button while still on `https://beta.showpass.com/manage/products/create/`. Check the same message and protected content again.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show a product-creation form or fields to enter a new product.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The product creation form did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/17-create-product-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/17-create-product-reload.jpg" alt="Create product reload shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:43 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-09 Saved reports

**What this tests:** Check that typing the saved Reports address directly does not reveal reports or report actions.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**, on any page.

### Steps

1. **Try the page without using its menu.** Enter `https://beta.showpass.com/manage/reports/` in the browser address bar and press Enter. Read the message and check whether the protected content listed below is visible.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show saved report names or **Download**, **Edit**, **Clone** or **Delete** actions.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The saved reports or Download/Edit/Clone/Delete actions did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/18-saved-reports-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/18-saved-reports-direct.jpg" alt="Saved reports direct shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:44 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

2. **Repeat after refresh.** Use the browser’s Reload button while still on `https://beta.showpass.com/manage/reports/`. Check the same message and protected content again.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show saved report names or **Download**, **Edit**, **Clone** or **Delete** actions.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The saved reports or Download/Edit/Clone/Delete actions did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/19-saved-reports-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/19-saved-reports-reload.jpg" alt="Saved reports reload shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:46 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-10 Create report

**What this tests:** Check that typing the Create report address directly does not open the report-generation form.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**, on any page.

### Steps

1. **Try the page without using its menu.** Enter `https://beta.showpass.com/manage/reports/create/` in the browser address bar and press Enter. Read the message and check whether the protected content listed below is visible.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show a report-type selector, report settings or a report-generation form.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The report-generation form did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/20-create-report-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/20-create-report-direct.jpg" alt="Create report direct shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:52 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

2. **Repeat after refresh.** Use the browser’s Reload button while still on `https://beta.showpass.com/manage/reports/create/`. Check the same message and protected content again.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show a report-type selector, report settings or a report-generation form.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The report-generation form did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/21-create-report-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/21-create-report-reload.jpg" alt="Create report reload shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:53 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-11 Customers

**What this tests:** Check that typing the customer-management address directly does not reveal the customer list or management actions.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**, on any page. Box Office’s permitted customer search is not the screen under test.

### Steps

1. **Try the page without using its menu.** Enter `https://beta.showpass.com/manage/network/customers/` in the browser address bar and press Enter. Read the message and check whether the protected content listed below is visible.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show the customer-management list or customer-management actions.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The customer-management records or actions did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/22-customers-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/22-customers-direct.jpg" alt="Customers direct shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:55 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

2. **Repeat after refresh.** Use the browser’s Reload button while still on `https://beta.showpass.com/manage/network/customers/`. Check the same message and protected content again.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show the customer-management list or customer-management actions.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The customer-management records or actions did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/23-customers-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/23-customers-reload.jpg" alt="Customers reload shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:56 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-12 Payouts

**What this tests:** Check that typing the Payouts address directly does not reveal financial amounts or payout actions.

**Start here:** Stay signed in as **qa qa** for **1859-qa-cad**, on any page.

### Steps

1. **Try the page without using its menu.** Enter `https://beta.showpass.com/manage/finance/payouts/` in the browser address bar and press Enter. Read the message and check whether the protected content listed below is visible.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show payout amounts, a payout list or payout actions.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The payout amounts or payout actions did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/24-payouts-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/24-payouts-direct.jpg" alt="Payouts direct shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:57 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

2. **Repeat after refresh.** Use the browser’s Reload button while still on `https://beta.showpass.com/manage/finance/payouts/`. Check the same message and protected content again.

   **Expected:** the page shows **“It appears you don’t have permission to view this page”** and **“Please speak to your administrator if you require access.”** It does not show payout amounts, a payout list or payout actions.

   **Actual — Passed:** The page showed “It appears you don’t have permission to view this page” and “Please speak to your administrator if you require access.” The payout amounts or payout actions did not appear in the observed page.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/25-payouts-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/25-payouts-reload.jpg" alt="Payouts reload shows No Permission" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:21:58 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-13 Unexpected Gift Cards access

**What this tests:** Check whether the employee can reach the Gift Cards list and blank creation form. This tests screen access, not whether a saved create or edit request succeeds.

**Start here:** Keep the same employee and Organizer. Do not open the existing card’s Edit form, enter new values or submit **Create gift card**.

### Steps

**Business impact:** an employee intended only to sell tickets can enter Gift Cards management, see an existing gift card, and open the creation form. Access to these screens is confirmed. Creating, editing or deleting a saved gift card was not tested.

1. **Try the Gift Cards list directly.** Enter `https://beta.showpass.com/manage/gift-cards/` in the address bar and press Enter. Check whether access is refused or the list opens. If it opens, record only whether a card, **Edit gift card** and **Create** are visible. Do not open the existing card.

   **Expected:** the employee receives **No Permission**. No existing gift card, **Edit gift card** control or **Create** link is shown.

   **Actual — Failed against the requested restriction:** the Active list displayed an existing gift card, a price-options count, an Edit gift card button and a Create link. No existing gift-card record was opened.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/26-gift-cards-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/26-gift-cards-direct.jpg" alt="Existing gift card visible to the restricted employee" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:22:35 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

2. **Try the blank creation form, only if the list opened.** Select the **Create** link at the top of the Gift Cards list. Check whether a blank form opens. Do not type a name, add an option or press **Create gift card**. If step 1 correctly refuses access, leave steps 2–3 unrun.

   **Expected:** the page refuses access. The **Name**, **Price options / Add option** and **Create gift card** controls do not become available.

   **Actual — Failed against the requested restriction:** the blank Create gift card form opened with Name, Logo image, Background color, Active, Add option and Create gift card controls. Nothing was entered or submitted.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/27-gift-card-create.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/27-gift-card-create.jpg" alt="Restricted employee can open the blank gift card creation form" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:22:50 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

3. **Repeat access after refresh.** If the blank Create gift card form opened, use the browser’s Reload button. Check whether the form and **Create gift card** button remain available. Do not submit it.

   **Expected:** the page refuses access after refresh. A blank form and **Create gift card** button must not remain available under the requested restriction.

   **Actual — Failed against the requested restriction:** the same creation form and Create gift card button remained visible. This is reproducible access to the form; successful creation remains untested.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/28-gift-card-create-reload.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/28-gift-card-create-reload.jpg" alt="Gift card creation form remains accessible after reload" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:22:51 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

### BUG-01 Jira draft

**Draft only — no Jira issue has been created.** This is one access issue affecting the menu, gift-card list and creation form; it is not three separate bugs.

**Title:** fix (employee permissions) | Gift Cards management accessible with Box Office-only permissions

**GIVEN** an employee with only these permissions, without owner or unrestricted access:

```json
"permissions": [
  "use_box_office_card",
  "use_box_office"
]
```

**WHEN** the employee opens **Build** in the `/manage/` sidebar

**THEN — observed:** **All gift cards** and **Create gift card** are available. Opening the [Gift Cards page](https://beta.showpass.com/manage/gift-cards/) directly also displays an existing gift card with an **Edit gift card** control. Selecting **Create** opens a blank creation form, and the form remains accessible after refreshing.

**Expected:** Gift Cards management should be unavailable to an employee with only Box Office and card-sales permissions.

**Impact:** an employee intended only to sell through Box Office can see gift-card management information and reach its creation controls.

**Tested on:** Beta, **qa qa**, Organizer **1859-qa-cad**, October 23, 2026.

**Evidence:** [TC-04 step 1 — sidebar links](#tc-04-build-menu) and [TC-13 steps 1–3 — list, creation form and refresh](#tc-13-unexpected-gift-cards-access). Screenshots are beneath those steps.

**Verification limit:** viewing the list and opening the creation form are confirmed. Creating, editing or deleting a saved gift card was not tested. The expected restriction follows the requested Box Office-only role; the current code permits access. The exact permission that should authorize gift-card management remains a product decision.

**Data safety and cleanup:** no data change. No fields were entered or saved; the signed-in Dashboard was restored.

## TC-14 Direct reports data request

**What this tests:** Check that requesting the saved-report data directly is refused, even without using the Reports page.

**Start here:** Keep the beta browser signed in as **qa qa** for **1859-qa-cad**. This is a read-only data request, not report generation.

### Steps

1. **Request the saved-report list.** Enter `https://beta.showpass.com/api/venue/1859/reports/report/` in the address bar and press Enter. Read the response text. Do not add `/export/` or select a report to generate.

   **Expected:** the response says **“You are not permitted to manage reports”** and does not contain a saved-report list. This is a data-access check, separate from whether the Reports screen opens.

   **Actual — Passed:** the visible response was `{"detail":"You are not permitted to manage reports"}`. No saved reports were returned in this response. HTTP status and response headers were not captured.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/30-reports-api-denied.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/30-reports-api-denied.jpg" alt="Reports API refuses the restricted employee" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:23:16 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## TC-15 Checks not run

These are limits of the October 23 run, not instructions to execute more tests now. They have no Passed result.

- **Card-only payment choices:** no item was added and checkout was not opened because a cart can reserve stock or create saved test state. The two permission values were confirmed, but card availability and rejection of Cash/Other/Complimentary payment were not executed.
- **Saved changes and unauthorized requests:** no create, edit, delete, export, generate, refund, void or purchase request was submitted. Visible controls do not prove the server accepts these actions.
- **Other data requests:** only the reports list was challenged directly. Products, customer and payout API responses, individual record URLs and other Organizers were not tested. Some Box Office reads are legitimately allowed for selling; management-screen denial does not mean all item/customer reads must be denied.
- **Transactions:** the own-sales page and attempts to access another employee’s transactions were not executed.
- **Loading:** no frame-by-frame recording or full network trace. This is outside the focused smoke checks, rather than a blocker for the observed page-access results.
- **Other views:** mobile, other roles, changed-role cache behavior and expired sessions were outside this run.

## TC-16 Postconditions and Cleanup

**What this tests:** Leave the browser signed in on the Dashboard without changing the Organizer or saved records.

**Start here:** Finish or leave any read-only inspection without submitting forms. The blank Gift Cards form, if open, contains no user-entered values.

### Steps

1. **Restore the starting page.** Enter `https://beta.showpass.com/manage/` in the address bar and press Enter. Check that the employee is still signed in. Do not log out, clear browser data or switch Organizers.

   **Expected:** the Dashboard greets **qa qa**, the selected Organizer remains **1859-qa-cad**, and no records or cart contents were changed. The current-Organizer response in TC-01 step 2 confirms the Organizer at the end of the run.

   **Actual — Passed:** the signed-in Dashboard was restored. No login, logout, cookie clearing, Organizer switch, cart change or saved-record mutation was performed. No temporary dump files were created.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/32-restored-dashboard.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/restricted-ticket-seller-beta-smoke-2026-10-23/32-restored-dashboard.jpg" alt="Signed-in Dashboard restored after the smoke check" width="600" style="max-width: 100%; height: auto;"></a>

   2026-10-23, 4:23:53 p.m. MDT — beta, qa qa, Organizer 1859-qa-cad.

## Supporting source and open question

### Original permission response

Read on October 23 at 4:20:58 p.m. MDT for TC-01 step 1. Keys below are a shortened record of the returned permission fields, not a new test result.

```json
{
  "venueId": 1859,
  "venueName": "1859-qa-cad",
  "isOwner": false,
  "noRestrictions": false,
  "permissions": [
    "use_box_office_card",
    "use_box_office"
  ],
  "roles": [
    {
      "id": 7912,
      "role": 6628
    }
  ]
}
```


Source explains the expected permissions; the browser observations above supply the executed proof. Local source versions were backend `607ba2e538` and frontend `7164d84fd0`; these were not confirmed as the deployed beta revisions.

- Backend `apps/venues/constants/employment.py`: Box Office and card sales are separate permissions. The standard Ticket Sellers role contains additional payment permissions, so that role label was not used as proof for this employee.
- Backend [saved-report permissions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/api/venue_based/viewsets.py:39>): the saved-report endpoint requires Manage Reports.
- Backend `apps/financials/api/venue_based/viewsets/invoices.py`: Box Office permits reading own sales; broader transaction access is separate.
- Frontend `products-detail-config.ts`, `reports-config.ts`, `customer-network-config.ts` and Payouts `config.ts`: the six selected pages require permissions absent from this employee. `DashboardPagePermission.web.tsx` supplies their No Permission screen.
- **Gift Cards access gap:** frontend [Gift Cards configuration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/gift-cards/constants/gift-cards-config.ts:29>) sets `employeePermissions` to an empty list; Build navigation checks the Gift Cards module rather than employee permission. Backend [Gift Cards API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/gift_card_viewsets.py:12>) declares no additional employment permission, while its base defaults to no extra required permission. This matches the observed open screens. It is an existing access-policy gap against the requested restriction, not proof that the Next.js bump introduced it.
- **Open decision:** which employee permission should authorize managing gift cards? Until that rule is established and enforced, these screens remain accessible under the two-permission setup. No user action is required to finish the recorded smoke checks.

## Results

**The requested restriction is not fully met because Gift Cards management remains reachable.** Six selected restricted pages passed on both direct access and reload, and the reports list request was refused. Do not treat this sample as proof that every protected page or write endpoint is safe.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Employee permissions and Organizer | Passed | Exactly Box Office and card sales; no owner/unrestricted access; Organizer 1859 unchanged | [TC-01 — steps 1–2](#tc-01-confirm-the-employee-and-organizer) |
| Allowed Box Office | Passed | Inventory loaded; cart empty; no sale submitted | [TC-02 — step 1](#tc-02-allowed-box-office-access) |
| Operations menu | Passed | Sell and Settings shown; restricted Operations links absent | [TC-03 — step 1](#tc-03-operations-menu) |
| Build menu | Failed | All gift cards and Create gift card links are visible; [BUG-01 Jira draft](#bug-01-jira-draft) | [TC-04 — step 1](#tc-04-build-menu) |
| Account menu | Passed | Only Profile and Notifications shown | [TC-05 — step 1](#tc-05-account-menu) |
| Dashboard home shortcuts | Not run | Shortcuts observed; Transactions page and own-sales access were not tested | [TC-06 — step 1](#tc-06-dashboard-home-shortcuts) |
| Products list | Passed | No Permission on direct access and reload; management content/actions absent | [TC-07 — steps 1–2](#tc-07-products-list) |
| Create product | Passed | No Permission on direct access and reload; management content/actions absent | [TC-08 — steps 1–2](#tc-08-create-product) |
| Saved reports | Passed | No Permission on direct access and reload; management content/actions absent | [TC-09 — steps 1–2](#tc-09-saved-reports) |
| Create report | Passed | No Permission on direct access and reload; management content/actions absent | [TC-10 — steps 1–2](#tc-10-create-report) |
| Customers | Passed | No Permission on direct access and reload; management content/actions absent | [TC-11 — steps 1–2](#tc-11-customers) |
| Payouts | Passed | No Permission on direct access and reload; management content/actions absent | [TC-12 — steps 1–2](#tc-12-payouts) |
| Gift Cards access | Failed | Existing card and Edit control visible; blank Create form accessible, including after reload; no save attempted. Same [BUG-01](#bug-01-jira-draft) | [TC-13 — steps 1–3](#tc-13-unexpected-gift-cards-access) |
| Reports data request | Passed | “You are not permitted to manage reports”; no report list returned | [TC-14 — step 1](#tc-14-direct-reports-data-request) |
| Card-only payment choices | Not run | No cart or checkout interaction; Cash/Other/Complimentary rejection not exercised | [TC-15 — payment checks](#tc-15-checks-not-run) |
| Unauthorized saved actions and other API/record checks | Not run | Read-only scope; no write, export, payment or other record requests submitted | [TC-15 — unrun checks](#tc-15-checks-not-run) |
| Session and record preservation | Passed | Same Organizer; signed-in Dashboard restored; no saved records changed | [TC-16 — step 1](#tc-16-postconditions-and-cleanup) |
