---
title: Signed-out dashboard access — beta smoke
date: 2026-10-23
tags:
  - qa/browser-testing
  - authentication
---

# Browser Test Report: Signed-out dashboard access on beta

Check that a signed-out visitor cannot open protected Dashboard pages directly. The profile request was refused, and six Dashboard pages showed login on both direct requests. No protected data was visible in the observed states.

Screenshots are local-only evidence under `99 Archive/QA Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/`. They render below the steps but are ignored by Git and will not appear in a fresh checkout.

## Test index

Select a test below, or use the linked test ID in the [results table](#results). IDs belong to this report; they are not Qase case IDs.

- [TC-01 Confirm the session is signed out](#tc-01-confirm-the-session-is-signed-out)
- [TC-02 Dashboard home](#tc-02-dashboard-home)
- [TC-03 Products](#tc-03-products)
- [TC-04 Saved reports](#tc-04-saved-reports)
- [TC-05 Create report](#tc-05-create-report)
- [TC-06 Customers](#tc-06-customers)
- [TC-07 Payouts](#tc-07-payouts)
- [TC-08 Checks that could not be completed](#tc-08-checks-that-could-not-be-completed)
- [TC-09 Postconditions and Cleanup](#tc-09-postconditions-and-cleanup)

## Setup / Prerequisites

- **Environment:** `https://beta.showpass.com/`, October 23, 2026, in the Codex browser sidebar.
- **View:** desktop browser. Mobile and physical devices were not tested; CSS viewport dimensions were not independently recorded.
- **Account:** signed out, confirmed through the profile response below. No employee role, Organizer or test record was required.
- **Starting page:** `https://beta.showpass.com/accounts/login/?next=%2Faccount%2Fmy-orders%2F`, with empty email and password fields.
- **Scope:** direct and repeat requests to Dashboard home, Products, saved Reports, Create report, Customers and Payouts. The exact page plan was shown before execution.
- **Allowed changes:** read-only navigation. No logout, cookie clearing, login submission, saved-record changes or Qase changes.
- **Version:** the user reported a Next.js version bump; no PR, exact version or deployed build identifier was provided or verified.
- **Evidence limit:** these screenshots show the observed page states. They cannot establish that no protected data flashed earlier or appeared in an uninspected response.

## TC-01 Confirm the session is signed out

1. Check the existing login page before entering any credentials.

   **Expected:** an empty login form is shown. This is a starting observation; the profile check below establishes whether access is refused.

   **Actual — Passed:** the sidebar showed the login form with empty email and password fields.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/00-starting-login.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/00-starting-login.jpg" alt="Starting beta login page with empty fields" width="600" style="max-width: 100%; height: auto;"></a>

   Beta, desktop sidebar: existing login page before the first API check.

2. Open `https://beta.showpass.com/api/auth/profile/` directly in the address bar.

   **Expected:** the signed-out request is refused and no user profile is returned.

   **Actual — Passed:** the visible response was `{"detail":"Authentication credentials were not provided."}`. No user profile appeared. HTTP status and response headers were not captured.

   The original tab became unavailable during capture. A test tab in the same sidebar browser was opened, and this profile check returned the same refusal again. No logout or session clearing was performed.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/01-profile-denied.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/01-profile-denied.jpg" alt="Profile endpoint refuses access without authentication" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:33:19 p.m. MDT — Beta, signed out: profile access was refused.

## TC-02 Dashboard home

1. Open `https://beta.showpass.com/manage/` directly in the address bar.

   **Expected:** login appears with `/manage/` as the return path. Do not show organizer or Dashboard data.

   **Actual — Passed:** the browser ended at `https://beta.showpass.com/accounts/login/?next=/manage/`. It showed the empty login form; no organizer or Dashboard data appeared in that observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/02-home-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/02-home-direct.jpg" alt="Dashboard home direct request shows login instead of protected content" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:00 p.m. MDT — Beta, signed out: direct request ended on login.

2. Enter `https://beta.showpass.com/manage/` in the address bar again.

   **Expected:** the protected URL is refused again. Repeating the protected URL exercises access again; reloading the login page alone would not do that.

   **Actual — Passed:** the second request returned to the same login URL and expected return path. No protected area data was visible in the observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/03-home-repeat.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/03-home-repeat.jpg" alt="Dashboard home repeat direct request also shows login" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:01 p.m. MDT — Beta, signed out: repeated protected URL ended on login.

## TC-03 Products

1. Open `https://beta.showpass.com/manage/products/` directly in the address bar.

   **Expected:** login appears with `/manage/products/` as the return path. Do not show products, prices or stock.

   **Actual — Passed:** the browser ended at `https://beta.showpass.com/accounts/login/?next=/manage/products/`. It showed the empty login form; no products, prices or stock appeared in that observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/04-products-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/04-products-direct.jpg" alt="Products direct request shows login instead of protected content" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:11 p.m. MDT — Beta, signed out: direct request ended on login.

2. Enter `https://beta.showpass.com/manage/products/` in the address bar again.

   **Expected:** the protected URL is refused again. Repeating the protected URL exercises access again; reloading the login page alone would not do that.

   **Actual — Passed:** the second request returned to the same login URL and expected return path. No protected area data was visible in the observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/05-products-repeat.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/05-products-repeat.jpg" alt="Products repeat direct request also shows login" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:12 p.m. MDT — Beta, signed out: repeated protected URL ended on login.

## TC-04 Saved reports

1. Open `https://beta.showpass.com/manage/reports/` directly in the address bar.

   **Expected:** login appears with `/manage/reports/` as the return path. Do not show saved reports.

   **Actual — Passed:** the browser ended at `https://beta.showpass.com/accounts/login/?next=/manage/reports/`. It showed the empty login form; no saved reports appeared in that observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/06-reports-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/06-reports-direct.jpg" alt="Saved reports direct request shows login instead of protected content" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:13 p.m. MDT — Beta, signed out: direct request ended on login.

2. Enter `https://beta.showpass.com/manage/reports/` in the address bar again.

   **Expected:** the protected URL is refused again. Repeating the protected URL exercises access again; reloading the login page alone would not do that.

   **Actual — Passed:** the second request returned to the same login URL and expected return path. No protected area data was visible in the observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/07-reports-repeat.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/07-reports-repeat.jpg" alt="Saved reports repeat direct request also shows login" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:15 p.m. MDT — Beta, signed out: repeated protected URL ended on login.

## TC-05 Create report

1. Open `https://beta.showpass.com/manage/reports/create/` directly in the address bar.

   **Expected:** login appears with `/manage/reports/create/` as the return path. Do not show the report form or its protected choices.

   **Actual — Passed:** the browser ended at `https://beta.showpass.com/accounts/login/?next=/manage/reports/create/`. It showed the empty login form; no the report form or its protected choices appeared in that observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/08-create-report-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/08-create-report-direct.jpg" alt="Create report direct request shows login instead of protected content" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:23 p.m. MDT — Beta, signed out: direct request ended on login.

2. Enter `https://beta.showpass.com/manage/reports/create/` in the address bar again.

   **Expected:** the protected URL is refused again. Repeating the protected URL exercises access again; reloading the login page alone would not do that.

   **Actual — Passed:** the second request returned to the same login URL and expected return path. No protected area data was visible in the observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/09-create-report-repeat.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/09-create-report-repeat.jpg" alt="Create report repeat direct request also shows login" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:24 p.m. MDT — Beta, signed out: repeated protected URL ended on login.

## TC-06 Customers

1. Open `https://beta.showpass.com/manage/network/customers/` directly in the address bar.

   **Expected:** login appears with `/manage/network/customers/` as the return path. Do not show customer records.

   **Actual — Passed:** the browser ended at `https://beta.showpass.com/accounts/login/?next=/manage/network/customers/`. It showed the empty login form; no customer records appeared in that observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/10-customers-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/10-customers-direct.jpg" alt="Customers direct request shows login instead of protected content" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:25 p.m. MDT — Beta, signed out: direct request ended on login.

2. Enter `https://beta.showpass.com/manage/network/customers/` in the address bar again.

   **Expected:** the protected URL is refused again. Repeating the protected URL exercises access again; reloading the login page alone would not do that.

   **Actual — Passed:** the second request returned to the same login URL and expected return path. No protected area data was visible in the observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/11-customers-repeat.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/11-customers-repeat.jpg" alt="Customers repeat direct request also shows login" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:26 p.m. MDT — Beta, signed out: repeated protected URL ended on login.

## TC-07 Payouts

1. Open `https://beta.showpass.com/manage/finance/payouts/` directly in the address bar.

   **Expected:** login appears with `/manage/finance/payouts/` as the return path. Do not show payout or financial details.

   **Actual — Passed:** the browser ended at `https://beta.showpass.com/accounts/login/?next=/manage/finance/payouts/`. It showed the empty login form; no payout or financial details appeared in that observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/12-payouts-direct.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/12-payouts-direct.jpg" alt="Payouts direct request shows login instead of protected content" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:48 p.m. MDT — Beta, signed out: direct request ended on login.

2. Enter `https://beta.showpass.com/manage/finance/payouts/` in the address bar again.

   **Expected:** the protected URL is refused again. Repeating the protected URL exercises access again; reloading the login page alone would not do that.

   **Actual — Passed:** the second request returned to the same login URL and expected return path. No protected area data was visible in the observed state.

   <a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/13-payouts-repeat.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/13-payouts-repeat.jpg" alt="Payouts repeat direct request also shows login" width="600" style="max-width: 100%; height: auto;"></a>

   Oct 23, 2026, 3:34:49 p.m. MDT — Beta, signed out: repeated protected URL ended on login.

## TC-08 Checks that could not be completed

1. Observe every loading frame from entering a protected URL until login appears.

   **Expected:** protected data never appears, even briefly.

   **Actual — Blocked:** the available capture showed the page after navigation. There was no continuous recording of the earlier frames. The screenshots above do not prove this stronger claim.

   **Screenshot unavailable:** no recording or capture of every loading frame was obtained.

2. Inspect the original protected-page HTML and any Next.js page-data response.

   **Expected:** anonymous responses contain no protected data.

   **Actual — Blocked:** the sidebar tools used for this run did not expose those response bodies or a network trace. Source review supplied the expected rule, not executed response proof.

   **Evidence unavailable:** no original protected-response capture was obtained.

3. Check the data APIs used by Products, Customers, Reports and Payouts.

   **Expected:** the relevant anonymous requests are refused without returning protected records.

   **Actual — Not run:** only the profile endpoint was directly inspected. No controlled venue/record context was introduced for the other data APIs, and their status codes, headers and response bodies were not captured.

   **Evidence unavailable:** no pass is claimed for these data endpoints.

## TC-09 Postconditions and Cleanup

The browser was returned to the original login URL and that login page was reloaded:

`https://beta.showpass.com/accounts/login/?next=%2Faccount%2Fmy-orders%2F`

**Expected:** empty login fields, with no unsaved input or saved-data changes.

**Actual — Passed:** the empty login form was shown. The recovered sidebar tab was left available for the user. No unrelated tabs were inspected.

<a href="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/14-restored-login.jpg"><img src="../../99%20Archive/QA%20Evidence/Authentication/signed-out-dashboard-beta-smoke-2026-10-23/14-restored-login.jpg" alt="Original login URL restored after the read-only checks" width="600" style="max-width: 100%; height: auto;"></a>

Beta, signed out: original login URL restored after reload.

No saved records, Qase cases, roles, flags, credentials or permissions changed. No logout, cookie clearing or authentication submission occurred. No temporary browser text dumps or downloads were created. All 15 screenshots remain local and ignored by Git.

## References

Backend local revision `6167c9c9c0`; frontend local revision `7164d84fd0`. These identify local source, not beta deployment.
Backend: `apps/core/api/permissions.py:17–18` defines authenticated default access; `apps/core/api/viewsets/base.py:106–107` applies it; `apps/main/api/auth/viewsets.py:20–34` serves the current profile through that base.
Frontend: `packages/next-app/middleware.ts:650–686` validates the existing Django session through `/api/auth/profile/`; `:724–756` guards `/manage` and sends anonymous visitors to login with the return path. The matching page adapters for all six routes and `helpers/createDashboardPage.tsx` were reviewed.
The canonical quality standard, browser execution workflow and Handbook Playbook 12 — Permissions, Ownership and Authentication guided this pass. The existing authentication note supplied related protected-page expectations; no Qase API was read or changed.

Report layout follows the user-selected Playwright browser-spec format. This is a reformat of the existing run; no additional browser execution is implied.

## Results

**Seven access checks passed; no product failure was confirmed.** The two missing loading/response checks below block the stronger conclusion that protected data never appears or is returned. **Recommendation: Decision blocked by named missing evidence** for that broader claim.

| Check | Status | What was proven or what is missing  Go to test |
| --- | --- | --- | --- |
| Profile endpoint | Passed | Anonymous response refused access and returned no user profile. HTTP status/headers remain unverified.  [TC-01 — step 2](#tc-01-confirm-the-session-is-signed-out) |
| Dashboard home — `/manage/` | Passed | Both direct requests ended on login with the correct return path; no protected data visible in those states.  [TC-02 — steps 1–2](#tc-02-dashboard-home) |
| Products — `/manage/products/` | Passed | Both direct requests ended on login with the correct return path; no protected data visible in those states.  [TC-03 — steps 1–2](#tc-03-products) |
| Saved reports — `/manage/reports/` | Passed | Both direct requests ended on login with the correct return path; no protected data visible in those states.  [TC-04 — steps 1–2](#tc-04-saved-reports) |
| Create report — `/manage/reports/create/` | Passed | Both direct requests ended on login with the correct return path; no protected data visible in those states.  [TC-05 — steps 1–2](#tc-05-create-report) |
| Customers — `/manage/network/customers/` | Passed | Both direct requests ended on login with the correct return path; no protected data visible in those states.  [TC-06 — steps 1–2](#tc-06-customers) |
| Payouts — `/manage/finance/payouts/` | Passed | Both direct requests ended on login with the correct return path; no protected data visible in those states.  [TC-07 — steps 1–2](#tc-07-payouts) |
| Protected data briefly flashing during loading | Blocked | No continuous recording of the earlier loading frames.  [TC-08 — unverified checks](#tc-08-checks-that-could-not-be-completed) |
| Original protected HTML / Next.js page-data response | Blocked | Original response bodies and network trace were unavailable.  [TC-08 — unverified checks](#tc-08-checks-that-could-not-be-completed) |
| Product, customer, report and payout data APIs | Not run | Only the profile endpoint was inspected; the other API responses were not verified.  [TC-08 — unverified checks](#tc-08-checks-that-could-not-be-completed) |
| Other routes, record-detail URLs, alternate locales and stale/expired sessions | Not run | Outside the six-page sample declared for this run.  [TC-08 — unverified checks](#tc-08-checks-that-could-not-be-completed) |
