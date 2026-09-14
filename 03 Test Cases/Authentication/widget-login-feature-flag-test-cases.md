---
title: Widget Login Feature Flag Test Cases
date: 2026-09-09
tags:
  - widget
  - login
aliases:
  - SPW-20277 Manual Test Case
---

# Widget Login Feature Flag Test Cases

One parameterized manual case for [SPW-20277](https://showpass.atlassian.net/browse/SPW-20277). Status: published to Qase; no browser execution performed.

Standards: [[06 Prompts/Showpass QA Test Case Generator]], [[00 Start Here/World-Class Software Quality Standard]], and [[05 Tooling/Qase Test Case Writing Rules]].

## Testing Intent

We are testing whether a customer can log in during widget checkout when the venue enables account login, while venues without it retain guest checkout; this matters because customers could otherwise lose the intended login option, and we will prove it through the displayed form and successful login.

| Field | Scope |
| --- | --- |
| Criticality bucket | Live sales completion — account access during checkout; no purchase completion claim. |
| Business invariant | The venue's login setting determines whether account login is available. |
| User impact / failure mode | Customers cannot enter account credentials at enabled venues, or see account login at disabled venues. |
| Observable proof | Enabled: editable email/password fields and login advances checkout. Disabled: guest details appear without account login. |
| Source of truth | Backend venue-flag rules; frontend checkout/form behavior. |
| Primary surface / actor | Customer login in an embedded Showpass checkout widget, opened through the widget tool on Desktop or Mobile. A widget is the embedded Showpass ticket-buying window. |
| In scope | Logged-out customer, ordinary event checkout, venue login enabled/disabled, valid email/password login across the browser/device combinations listed in the case. |
| Out of scope | Credit redemption, purchases, alternate login methods, validation/lockout, cookie-denial and recovery flows, other checkout entry points. |
| Confidence | High for local form gating; deployed settings and browser behavior remain unverified. |

## Proof Target Map

| Proof target | Covered by |
| --- | --- |
| Enabled venue exposes editable account login and accepts valid credentials. | TC-1 / Enabled |
| Disabled venue hides account login and retains guest details. | TC-1 / Disabled |

## Jira Intake Summary

Jira title: **feat(sdk) | implement login support for sdk / safari**. Read through the Atlassian connector on 2026-09-09; status: Complete. The description concerns missing WordPress widget login and customers having to leave the venue website to use imported gift card credits. The user narrowed this request to one case covering login enabled/disabled. Credit use is therefore deferred. The retrieved description has no separate acceptance-criteria list; comments were not reviewed. Jira status does not establish deployment or test results.

## Sources Reviewed

Paths below are relative to these repository roots:

* Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
* Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
* Automation: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

| Source | Evidence |
| --- | --- |
| User-provided workflow: [Widget tool](https://spwidgettool.netlify.app/) | Open the tool and enter the organization slug. Entry instructions supplied by the user; the tool was not inspected live. |
| Backend `apps/main/models/feature_flags.py` — `FeatureFlag.is_active` | Venue inclusion/exclusion and global flag precedence. |
| Backend `apps/main/admin/admin.py` — `FeatureFlagForm`, `FeatureFlagAdmin`, registration; `apps/core/admin/mixins.py` — `BaseModelAdmin` | Supported Feature Flags admin search/add/edit and configuration fields; standard model permissions. |
| Backend `apps/main/front/waffle_view.py` — `_generate_waffle_js` | Exports flag state and venue overrides for frontend evaluation. |
| Backend `apps/main/api/auth/views.py` — `AppLoginView`; `apps/main/api/auth/serializers.py` — `AppLoginSerializer` | Password authentication, required credentials, and conditional security challenges. |
| Frontend `packages/core/src/shared/constants/waffle-flags.ts` | `enable_sdk_storage_access_login` is documented as venue-scoped and off by default. |
| Frontend `packages/core/src/app-contexts/public/features/checkout/components/CheckoutSteps/CheckoutSteps.web.tsx` and `LoginStep.web.tsx` | Flag evaluated with `basket.paymentVenue`; login eligibility and next-step behavior. |
| Frontend `packages/core/src/app-contexts/public/shared/checkout/components/steps/login/CheckoutLogin/CheckoutLogin.web.tsx` | Forced guest form versus account login; profile refresh and persisted basket customer after login. |
| Frontend `packages/core/src/app-contexts/public/shared/checkout/components/steps/login/StorageAccessPrompt/StorageAccessPrompt.web.tsx` and `StorageAccessPromptContent.web.tsx` | Cookie permission/recovery can precede the login form. |
| Frontend `packages/core/src/app-contexts/public/shared/checkout/components/PurchaseWizardModal/PurchaseWizardModal.tsx`; `packages/core/src/app-contexts/public/features/event-purchase/ui/components/EventPurchaseFlow.web.tsx` | Standard event purchase continuation control defaults to Continue. |
| Frontend `packages/core/src/shared/modules/login/components/LoginForm/LoginForm.web.tsx` | Email address, Password, Log in, field editing and submission. |
| Frontend `packages/core/src/app-contexts/public/shared/checkout/components/guest-checkout/components/GuestCheckout/GuestCheckout/GuestCheckout.web.tsx` | Guest heading and absence of Back to login when forced guest checkout is active. |
| Frontend `packages/core/src/app-contexts/public/features/checkout/components/CheckoutSteps/CheckoutSteps.web.test.tsx` | Existing component checks cover enabled/disabled payment-venue gating; read only, not run. |
| Automation `tests/core/widget/widget-login-options.test.ts` | Existing widget entry, form availability and sign-in pattern; read only, not run. |

## Assumptions and Unknowns

* The selected venue must run the reviewed implementation with a deterministic enabled/disabled flag state. Reuse suitable venues or prepare the selected venue for each run; two dedicated QA venues are not required. No live venue or account was verified.
* Start logged out. Already logged-in customers, group sales, and checkouts with locked purchaser information can skip the login step and are unsuitable for this case.
* For Enabled, Showpass cookie access must already be allowed in the embedded widget. An initial cookie prompt is not evidence that venue gating failed. Cookie permission/recovery testing is deferred to keep this case focused.
* The older [[03 Test Cases/Authentication/login-test]] note describes widget login as unsupported. That historical blanket expectation is not applicable to the current enabled-venue implementation; the existing note was not rewritten.

## Source-backed Behavior

* `CheckoutSteps` checks `enable_sdk_storage_access_login` using the basket's payment venue and sets `forceGuestCheckout` to the inverse result.
* Disabled selects the guest details form directly, including **Where should we send your order?**, without **Back to login**. Guest email entry is not the account login form and must remain visible.
* Enabled permits account login, subject to browser cookie access. The account form has **Email address**, **Password**, and **Log in**.
* After successful login, checkout refreshes the account profile, saves the customer on the basket, and advances to the next checkout step. Form visibility alone does not prove login completion.
* Backend flag exclusions override inclusion; global `everyone=False` disables the flag even for included venues. These are administrator configuration details, not additional customer prerequisites. Admin → Feature Flags supports searching and editing `enable_sdk_storage_access_login`; in rollout mode (`Everyone = Unknown`), Included venue ids enables a venue and Excluded venue ids disables it. The case only requires the resulting enabled/disabled state.

## Risk Areas

* A previously authenticated session can hide the login step and falsely resemble disabled behavior.
* Browser cookie restrictions can hide the form behind a permission prompt even when the venue is enabled, especially in the Safari context named by Jira.
* The wrong payment venue or global flag override can invalidate the setup. Use ordinary single-venue events.
* A form can accept typing while login fails to advance checkout; the enabled run includes successful submission.

## State-space / Setup Matrix and Coverage Ledger

| Item / outcome | Setup | Coverage decision |
| --- | --- | --- |
| Account login visible, editable, clean success | Enabled; logged out; cookie access allowed; valid account | Manual-only: TC-1 / Enabled, not executed. |
| Account login hidden; guest details visible | Disabled; logged out | Manual-only: TC-1 / Disabled, not executed. |
| Browser coverage | Desktop: Chrome, Edge, Firefox on Windows; Safari on macOS. Mobile: Safari on iOS; Chrome on Android. Both venue states in each combination. | Manual-only: TC-1, 12 planned runs; not executed. |
| Session/basket changes and cleanup | Login and ticket selection | Manual-only: TC-1 postconditions; use an account and inventory approved for this check. |
| Cookie permission, denial, popup recovery, retry | Browser-dependent states | Deferred: distinct recovery behavior beyond requested form gate. |
| Invalid/blank/boundary credentials, OTP, captcha failures, password reveal/reset, signup, social/SSO login | Shared authentication controls | Deferred: broader authentication regression, not separate variants of the requested setting. |
| Guest submission, logout/reload persistence, alternate widget entry points | Additional workflows | Deferred: not claimed by this focused case. |
| Credits, payment, orders, fulfillment | Purchase after login | Deferred: user expressly narrowed Jira scope. |
| Employee permissions | Customer-only flow | Not applicable to the manual actor. |

## Recommended Test Data

Select an existing published single-day event with an available public, unassigned ticket type and editable purchaser details. Have the organization slug used by the widget tool (the organization’s URL name). Use inventory approved for a temporary basket reservation and a customer account approved for login checks. Record the event, ticket type, browser/view, and effective venue flag state in execution evidence; keep passwords out of notes and screenshots.

The case below includes the required flag state and parameter mapping. Two venues, newly created events, a gift card balance, and a completed purchase are not prerequisites.

## Qase-ready Manual Test Cases

### TC-1: Widget - Login - Verify account login follows the venue setting

**Title:** Widget - Login - Verify account login follows the venue setting

**Description:** Starting logged out, verify a customer can enter an email and password and log in through the embedded Showpass ticket-buying window in the [widget tool](https://spwidgettool.netlify.app/) when venue login is enabled. When disabled, verify guest details appear with account login hidden. Repeat in each browser/device combination below to check for missing or unusable account login and login appearing for a venue that has not enabled it.

| Platform | View | Browser | Operating system |
| --- | --- | --- | --- |
| Widget | Desktop | Google Chrome | Windows |
| Widget | Desktop | Microsoft Edge | Windows |
| Widget | Desktop | Mozilla Firefox | Windows |
| Widget | Desktop | Safari | macOS |
| Widget | Mobile | Safari | iOS |
| Widget | Mobile | Google Chrome | Android |

Run both VenueLogin values in every row: **12 executions of this one case**. Use the current stable browser release and record its exact version, operating system version, and device. Use the named browser on the listed operating system; a resized desktop window does not complete a Mobile row.

| VenueLogin | Venue login flag | Expected checkout form / execution |
| --- | --- | --- |
| Enabled | Enabled for the venue. | Email address, Password, and Log in are visible; complete all steps. |
| Disabled | Disabled for the venue. | Where should we send your order? is visible; account Password, Log in, and Back to login are absent. Finish after step 5, then follow Postconditions. |

**Preconditions:**

* The venue's enable_sdk_storage_access_login flag matches VenueLogin.
* Have the organization slug to enter in the [widget tool](https://spwidgettool.netlify.app/).
* Start logged out with an empty basket in each browser being checked.
* Enabled: have an active Showpass account with a known email and password and no pending verification challenge.
* Enabled: allow Showpass cookies in that browser; if prompted, select Continue to log in and Allow.

**Postconditions:**

* Enabled: checkout has advanced after login with the selected event and one ticket still shown; the account is associated with the unpaid basket.
* Disabled: the customer remains logged out on guest details; no guest information was submitted.
* Do not complete a purchase. Close the widget and reset the login session and basket before the next run.
* Restore the original venue flag state if it was changed for this check.

**Tags:** widget, login

**Parameters:**

VenueLogin: Enabled, Disabled

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the selected browser, open the widget tool. | https://spwidgettool.netlify.app/ | The tool is ready for an organization slug. |
| Enter the organization slug. | The selected organization's slug. | The tool loads the selected organization's widget. |
| Open the selected event in the widget. | Event with an available public, unassigned ticket. | The selected event's available tickets appear. |
| Select one ticket of the chosen type. | Available public, unassigned ticket type; quantity: 1. | The window shows one ticket for the selected event. |
| Select Continue at the bottom of the ticket selection window. | Expected form and stopping point from the VenueLogin table. | The window shows the form specified for VenueLogin. |
| Enabled only: enter the account email in Email address. | The selected customer account's email. | The entered email is visible in the account login form. |
| Enabled only: enter the account password in Password. | The selected customer account's password. | The password field accepts the value and masks its characters. |
| Enabled only: select Log in. | The credentials entered above. | Checkout advances beyond login with the selected event and one ticket still shown. |

## Minimum Execution Set

Execute TC-1 with Enabled and Disabled in each of the six browser/device rows in its Description: **12 runs total**. Start with Safari on macOS and iOS because the Jira title explicitly names Safari, then complete Chrome, Edge, and Firefox on Windows and Chrome on Android. Keep the same event and account where practical so browser and venue flag state are the intended differences.

Record VenueLogin, venue/event, browser and exact version, operating system/version, device/view, observed form, and whether Enabled advanced after login. Record a separate result for each combination; one browser passing does not cover another. If cookie access cannot be prepared or a required browser/device is unavailable, mark that run Blocked with the reason rather than Passed or Not applicable. All runs remain unexecuted.

## Suggested Automated Coverage

Reuse the existing `tests/core/widget/widget-login-options.test.ts` pattern for both venue states, isolated sessions, widget-frame form assertions, and valid sign-in. Assert the enabled form accepts input and checkout advances with the same ticket; assert disabled guest details are visible and account controls are absent. Map automated runs to the same browser/device matrix and both venue states. Engine-only runs or mobile viewport emulation do not establish results for the named browser/device combinations; keep actual Safari/iOS and Chrome/Android checks manual where automation cannot provide those environments. Keep real Safari cookie permission/recovery as separately accounted-for coverage. No automation was added or executed.

## Open Questions

No product decision is needed to draft this focused case. Execution still needs an organization slug and suitable event, both effective venue flag states, and an approved customer account/browser profile. Deployed form behavior and cookie permissions remain unverified. This note does not establish release readiness or credit-redemption coverage.

## Writing Rules Review

The case keeps only essential prerequisites: venue flag state, an available event widget, a logged-out empty basket, account credentials, and cookie access. Both venue states, all six browser/device combinations, editable fields, successful login, and the disabled guest-form check remain included. The entry steps use the widget tool and organization slug supplied by the user. Admin rollout details are source notes, not customer prerequisites. No live execution was performed.

## Qase Publication

Created [SPT-5220](https://app.qase.io/case/SPT-5220) in suite 597 from local draft TC-1. Verified title, suite, tags, VenueLogin values, eight steps, and stored Description/Preconditions/Postconditions against the local payload. The Description retains all six browser/device combinations and 12 planned executions. No manual test runs were executed.
