# Login Qase Gap Analysis

## Scope

Read-only comparison between [[03 Test Cases/login-test]] and Qase login-related cases.

Qase query method:

- `search=login` returned 12 cases.
- Full pagination across 1,529 Qase cases found 31 title-or-tag login matches.
- Filter used: case title contains `login` or tags include `login`.
- No Qase writes were performed.

## Existing Qase Coverage

Strong existing coverage:

| Area | Qase cases |
| --- | --- |
| Basic login and validation | 3202, 3203, 3204 |
| Logout and Electron session persistence | 3205, 1357, 4923 |
| Password reset and account creation | 1879, 3206, 3207, 4908 |
| OTP login and OTP negatives | 3214, 3215, 3216, 3217, 3218, 3219 |
| Social and SAML SSO | 3220, 3221, 3222, 4394, 4897, 4898 |
| Checkout login or guest checkout adjacency | 4055, 2437, 4929 |
| Order claim/login modal adjacency | 2558, 2559 |
| Login analytics | 3317 |

Adjacent or false-positive login matches:

- 2692 covers an SMS ticket link that requires no login.
- 2437 and 4929 are mainly guest-checkout coverage, not authenticated login preservation.
- 3317 is analytics coverage, not functional login entry-point coverage.

## TC Cross-Match

| Local case | Qase match | Gap |
| --- | --- | --- |
| TC-1 Direct login methods | Partial: 3202, 3215, 3220, 3221, 4394 | Qase splits method coverage across separate cases. Social provider cases now use public-page customer flows, but there is still no single direct `/accounts/login/` method matrix for email/password, OTP, Google, Facebook, and SAML. |
| TC-2 Protected account pages return after login | Covered separately: 4772, 4773 | Existing account-suite coverage already protects logged-out account pages and account redirects, so no duplicate suite 605 case was created. |
| TC-3 Dashboard protected pages return after login | Covered after update: 4939 | Qase 4939 is now the single parameterized protected-pages case covering account, manage, and Box Office pages for logged-out users. |
| TC-4 Box Office protected pages return after login | Covered after update: 4939, plus 4923 | Qase 4939 covers logged-out Box Office page protection. Existing Electron case 4923 continues to cover desktop app session persistence. |
| TC-5 Public checkout continues after authentication | Covered after update: 4055 | Updated checkout login/signup preservation to include checkout page, checkout link, hold link, and transfer checkout entry points. |
| TC-6 Widget embedded checkout login keeps context | Do not push | New SDK widget does not support login, so authenticated widget login preservation is not valid coverage. |
| TC-7 Public page login actions return to intended context | Weak partial: 3317 | Qase has analytics for login interaction events, but not functional return behavior for header login, favorite/save, ticket voucher, or Spotify presale login actions. |
| TC-8 Account modal login returns to original action | Partial: 2559 | Qase covers claimed order page login modal without redirection. Missing broader modal continuation for account/order actions. |
| TC-9 Signup and password reset paths return to login | Partial: 3206, 3207, 4908 | Password reset and account creation exist, but return-to-login and preserved return-context behavior are not explicit. |
| TC-10 Native mobile login methods | Partial: 1877, 3202, 3214-3219, 4898 | Qase covers native UI, credentials, OTP, and mobile SAML. Missing a complete native login method matrix including Facebook, Google, SAML, and Apple as user-facing native flows. |
| TC-11 Native webview content uses native session | Do not create standalone | Treat mobile app webview as part of protected-page coverage where relevant, not a separate Qase case. |
| TC-12 Desktop startup opens Box Office after login | Covered: 4923 | Qase covers Electron sign-in, Box Office Sell loading, restart persistence, and logout relaunch state. |
| TC-13 Provider callback URLs return authenticated | Covered after update: 3220, 3221, 3222, 4394, 4898 | Google, Facebook, and Apple cases were updated to public-page customer flows. SAML web/mobile callback coverage remains in 4394 and 4898. |
| TC-14 Logout removes protected access | Covered after update: 3205, plus 1357, 4923 | Updated logout coverage to include account, dashboard, Box Office, checkout, back, and refresh behavior. |

## Main Gaps To Add Or Update In Qase

1. ~~Account protected-page return paths after login: saved events, my orders, profile/payment.~~ Already covered by Qase 4772 and 4773; no duplicate created.
2. ~~Dashboard protected-page return paths after login for organizer dashboard pages.~~ Resolved in the consolidated Qase 4939 protected-pages case.
3. ~~Web Box Office protected-page return paths and blocked access for accounts without Box Office permission.~~ Consolidated into Qase 4939; duplicate Qase 4940 was deleted.
4. ~~Checkout entry-point variants beyond standard checkout: checkout link, hold link, transfer checkout.~~ Resolved by updating Qase 4055.
5. ~~Authenticated widget checkout login preserving embedded context and basket.~~ Do not push because new SDK widget login is not supported.
6. Functional public login actions: header login, favorite/save, ticket voucher, Spotify presale. Keep deferred until canonical fixtures are agreed.
7. ~~Native app webview token/session reuse for protected web content.~~ Do not create standalone; fold into protected-page coverage where relevant.
8. ~~Real user-facing Google/Facebook/Apple callback completion, not only backend-simulated SSO handling.~~ Resolved by updating Qase cases 3220, 3221, and 3222 to public-page customer flows.
9. ~~Logout cleanup across protected account, dashboard, Box Office, checkout, back, and refresh.~~ Resolved by updating Qase 3205.

## Qase Coverage Not In Local Doc

The local doc does not explicitly cover several existing Qase areas:

- Invalid credential validation and repeated failed login lockout: 3203, 4909.
- Show-password UI behavior: 3204.
- Captcha during login/account creation: 3202, 3207.
- OTP negative and resend scenarios: 3216, 3217, 3218, 3219.
- Password reset link invalid/reused token behavior: 4908.
- Login analytics events: 3317.
- Guest checkout availability rules: 2437, 4929.

## Recommendation

Do not duplicate Qase cases for basic credentials, OTP, password reset, account protected-page coverage, widget login, or standalone mobile webview auth. Remaining deferred gap: functional public login actions after canonical fixtures are agreed.
