# Login Entry Point Test Cases

## Summary of Change

This note covers all known entry points where a Showpass user can reach login, plus the login methods available by platform. The goal is broad entry-point coverage without duplicating storage-state setup cases.

## Sources Reviewed

- [[Backend - web-app]]
- [[Frontend - showpass-frontend]]
- [[Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- Merged local login notes: `protected-login-qase-updates.md`, `public-provider-login-qase-updates.md`, `login-qase-gap-analysis.md`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/api/urls.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/auth/urls.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/auth/views.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/auth/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/accounts/urls.py`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/login.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/signup.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/password-reset.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/password/reset/key/[slug].tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/claim/[uuid].tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/google/login/callback.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/facebook/login/callback.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/sso/login/callback.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/middleware.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/login/components/Login/Login.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/login/components/LoginForm/LoginForm.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/login/components/SsoLoginForm/SsoLoginForm.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/login/components/AccountModal/AccountModal.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/login/CheckoutLogin/CheckoutLogin.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/login/CheckoutLoginContent/CheckoutLoginContent.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/auth/AuthRepository.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/auth/services/GoogleOAuthService.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/auth/services/FacebookOAuthService.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/auth/services/SamlOAuthService.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/gssp-subroutines/withUser/withUser.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/gssp-subroutines/getServerAuthHeaders.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/AuthScreens/LoginScreen/LoginScreen.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/AuthScreens/SsoLoginScreen/SsoLoginScreen.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/AuthScreens/OtpScreen/OtpScreen.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/util/auth/sso.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/util/webview/helpers/index.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/desktop/src/main/window/MainWindow.ts`

## Assumptions and Unknowns

- Google, Facebook, SAML SSO, Apple, and OTP coverage depends on enabled providers and available test accounts in the target environment.
- Guest checkout is checkout coverage, not a login method.
- The deprecated SDK login popup should be marked not applicable if product or engineering no longer supports it.
- New SDK widget checkout does not support authenticated widget login; keep widget coverage as a regression that unsupported login is not exposed or required.
- API token refresh, JWT refresh, JWT verify, and auth profile checks are support contracts, not separate user entry points.
- Apple login is backend-supported and native-mobile exposed, but no current Next.js web Apple login button or callback route was found.

## Source-Backed Behavior

- `/accounts/login/` supports email/password, OTP continuation, Google, Facebook, and SAML SSO when enabled.
- `/accounts/login/?next=<path>` returns the authenticated user to the requested path.
- Protected account pages redirect through `withUser`; protected `/manage` pages redirect through Next middleware after auth hint or Django session checks.
- Checkout can use an embedded authentication container and may also offer guest checkout.
- Public checkout authentication supports login and sign-up paths while preserving basket context.
- Checkout inside the native app can hand the buyer to native login through a webview `LOGIN` message, then reload checkout after native authentication.
- Native mobile login supports email/password, Facebook, Google, SAML SSO, Apple, signup, password reset, and OTP screens.
- Native mobile SAML uses domain lookup, mobile PKCE, an in-app browser, and the `showpass://sso/callback` deep link before token exchange.
- Mobile app webview auth can use the native app token cookie instead of normal browser login.
- Electron desktop app starts at `/manage/box-office/sell`, then relies on web login before Box Office access.
- Backend legacy account URLs still exist for `/accounts/password/reset/`, `/accounts/password/reset/key/<uid>-<key>/`, `/accounts/claim/<uuid>/<uuid2>/`, `/accounts/t-claim/<uuid>/<uuid2>/`, and `/accounts/social/login/error/`.
- Backend auth APIs support login, logout, registration, password reset/change, Google, Facebook, Apple, SAML, token refresh/verify, JWT obtain/refresh/verify, auth profile, and SAML metadata.

## Entry Paths

| Platform / View                | Entry Path                                                                                         | Login Surface                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| WebPublic / Desktop and Mobile | `/accounts/login/`                                                                                 | Full login page                           |
| WebPublic / Desktop and Mobile | `/accounts/login/?next=<protected-path>`                                                           | Full login page with return URL           |
| WebPublic / Desktop and Mobile | Public header/login action                                                                         | Login page or account modal               |
| WebPublic / Desktop and Mobile | Public event, venue/profile, favorite/save, ticket voucher, Spotify presale                        | Login page or account modal               |
| WebPublic / Desktop and Mobile | Account or order action that opens `AccountModal`                                                  | Account modal authentication              |
| WebPublic / Desktop and Mobile | `/account/*`                                                                                       | Login redirect with `next`                |
| WebBoxOffice / Desktop         | `/manage/*`                                                                                        | Login redirect with `next`                |
| WebBoxOffice / Desktop         | `/manage/box-office/*`                                                                             | Login redirect with `next`                |
| WebPublic / Desktop and Mobile | `/checkout/`, `/checkout/link/[id]`, `/checkout/hold/[id]`, `/checkout/transfers/[transaction_id]` | Checkout authentication or login redirect |
| React Native Public / Mobile   | Public checkout purchase webview                                                                   | Checkout authentication or sign-up        |
| Widget / Desktop and Mobile    | `/widget/tickets/events/checkout`                                                                  | No supported authenticated widget login   |
| WebPublic / Desktop            | `/accounts/signup/`, `/accounts/password-reset/`, `/accounts/claim/[uuid]`                         | Account auth pages                        |
| WebPublic / Desktop and Mobile | `/accounts/google/login/callback/`, `/accounts/facebook/login/callback/`, `/accounts/sso/login/callback/` | Provider callback                         |
| WebPublic / Desktop            | Legacy `/accounts/password/reset/`, `/accounts/password/reset/key/<uid>-<key>/`, `/accounts/claim/<uuid>/<uuid2>/`, `/accounts/t-claim/<uuid>/<uuid2>/` | Legacy account recovery or claim links    |
| React Native Public / Mobile   | `LoginScreen`, `SsoLoginScreen`, signup, password reset, OTP                                       | Native auth screens                       |
| React Native Public / Mobile   | Facebook, Google, SAML, and Apple native provider flows                                            | Native provider authentication            |
| React Native Public / Mobile   | Authenticated webview content                                                                      | Native webview token                      |
| Electron / Desktop             | `/manage/box-office/sell` startup                                                                  | Web login in desktop shell                |

## FE / BE Entry-Point Gap Analysis

| Area                           | Backend Source Of Truth                                                                              | Frontend Exposure                                                                                                         | Coverage Status / Gap                                                                                                                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Direct web login               | `/api/auth/login/` with email/password, OTP, captcha, and platform-aware captcha actions             | `/accounts/login/`, `LoginForm`, `OtpForm`, checkout auth container, account modal                                        | Covered by TC-1, TC-5, TC-8, and existing Qase OTP cases. Missing local negative coverage for invalid credentials, captcha-required states, OTP resend, and invalid OTP; keep these in existing Qase unless a fresh local regression case is needed. |
| Protected account pages        | Backend session/profile check plus frontend `withUser` redirect                                      | `/account/*` pages using `withUser` redirect to `/accounts/login/?next=<resolvedUrl>`                                     | Covered by TC-2 and TC-14. Entry table is complete for account-page entry points at the wildcard level.                                                                                                                                              |
| Dashboard and Box Office pages | Auth/profile and permission-backed APIs protect dashboard and employee data                          | `/manage/*` middleware redirects logged-out users; Electron starts at `/manage/box-office/sell`                           | Covered by TC-3, TC-4, TC-12, and TC-14. Keep permission-denied checks in TC-4 because login success alone is not enough for Box Office access.                                                                                                      |
| Public checkout                | Backend checkout APIs rely on authenticated customer or guest customer data                          | Checkout uses `AuthenticationContainer`, sign-up, login, and guest checkout; native webview sends `LOGIN` to native app   | Covered by TC-5 and TC-11. Gap: native checkout webview should explicitly verify checkout reloads after native login and does not lose basket context.                                                                                               |
| Widget checkout                | No supported authenticated widget login path found in current frontend coverage                      | Widget checkout route should stay embedded and avoid unsupported auth redirects                                           | Covered by TC-6. No extra login entry path found.                                                                                                                                                                                                    |
| Web social login               | Backend supports Google, Facebook, and Apple API endpoints                                           | Web login renders Google, Facebook, and SAML; no Next.js Apple button or Apple callback route found                       | Correct TC-13 to Google, Facebook, and SAML only for web. Apple remains native-mobile/API coverage unless a web Apple login surface is added.                                                                                                        |
| Native social login            | Backend supports Facebook, Google, Apple, and SAML token exchange                                    | Native `LoginScreen` renders Facebook, Google, SAML, and Apple buttons                                                    | Covered by TC-10. Keep Apple coverage here, not in web provider callbacks.                                                                                                                                                                           |
| SAML web login                 | Backend has domain check, initiate, ACS, metadata, and token exchange                                | Web login uses SSO email lookup, popup auth window, `/accounts/sso/login/callback/`, and broadcast-channel reconciliation | Success covered by TC-1 and TC-13. Gap: unsupported SSO domain, popup blocked, callback `error`, missing code, replayed code, and failed token exchange should be covered by one focused SAML error case.                                            |
| SAML mobile login              | Backend requires `platform=mobile`, valid `pkce_challenge`, one-time code, and valid `pkce_verifier` | Native SAML generates PKCE, opens IdP in app browser, receives `showpass://sso/callback`, and exchanges the code          | Success covered by TC-10. Gap: mobile SAML cancel, invalid callback, missing/malformed PKCE, and token exchange failure are not covered locally.                                                                                                     |
| Account creation               | Backend `/api/auth/registration/` requires first name and can require captcha                        | Web signup page, account modal signup, checkout signup, native create-account screen                                      | Covered by TC-5 and TC-9 as login-adjacent paths. Email verification endpoints exist but are not a current login entry point unless product enables verification.                                                                                    |
| Password reset                 | Backend exposes dj-rest-auth reset plus legacy `/accounts/password/reset/` and reset-key URL         | Frontend page is `/accounts/password-reset/`; reset-key page is `/accounts/password/reset/key/[slug]`                     | Covered by TC-9. Gap: verify legacy `/accounts/password/reset/` links still render or redirect correctly because backend and frontend paths differ.                                                                                                  |
| Account claim                  | Backend legacy claim routes use two path params, including ticket claim redirect                     | Frontend has `/accounts/claim/[uuid]` and reads optional `uuid2`/`id` query params                                        | Regression listed, but gap remains for claim-link variants from email/order/ticket sources, especially `/accounts/t-claim/<uuid>/<uuid2>/`.                                                                                                          |
| Social account conflict        | Backend returns explicit conflicts when provider email matches an unconnected account                | Web callbacks currently show generic login failure and close the popup after a delay                                      | Gap: verify customers with existing email/password accounts get a recoverable message or support path when trying provider login with the same email.                                                                                                |
| Token refresh/profile support  | Backend supports token refresh/verify, JWT obtain/refresh/verify, and `/api/auth/profile/`           | Middleware, `withUser`, native auth, and webview cookie renewal rely on these support APIs                                | Not a separate manual entry path. Cover through session persistence, webview auth, logout cleanup, and automation/API checks.                                                                                                                        |

## Risk Areas

- Return URLs can break and send the authenticated user to the wrong page.
- Protected pages can briefly expose account, dashboard, checkout, or Box Office data before redirecting.
- Provider callbacks can strand the user on a blank or unauthenticated page.
- Social provider conflicts can leave customers without a clear recovery path when the provider email already exists as an unlinked Showpass account.
- SAML can fail at domain lookup, popup/deep-link return, one-time code exchange, or mobile PKCE validation.
- Checkout login can lose basket, customer, or purchase context.
- Widget checkout can accidentally expose or require unsupported login.
- Native mobile and webview auth can diverge from browser auth behavior.
- Desktop session persistence can fail across refresh or app restart.
- Logout can leave protected content available through back/refresh.

## State-Space / Initial Condition Matrix

| Axis | Values | Why It Matters |
| --- | --- | --- |
| Platform | WebPublic, Widget, WebBoxOffice, React Native Public, Electron | Login entry points and available methods differ by platform. |
| View | Desktop, Mobile | Public, widget, and mobile app flows can use different login surfaces. |
| LoginMethod | EmailPassword, OtpEmailPassword, Google, Facebook, SamlSso, Apple, WebviewToken | Method availability and callback behavior differ. Apple is native-mobile/API only unless a web Apple surface is added. |
| EntryPoint | DirectLogin, PublicAction, AccountDeepLink, DashboardDeepLink, BoxOfficeDeepLink, Checkout, WidgetCheckout, NativeApp, Webview, DesktopStartup | Return behavior depends on where login starts. |
| AccountType | Customer, DashboardUser, BoxOfficeEmployee, OtpEnabledCustomer, ProviderLinkedCustomer | Permissions and expected landing pages differ. |
| AuthState | LoggedOut, LoggedIn, LoggedOutAfterLogout | Confirms login requirement, persistence, and logout cleanup. |

## Recommended Test Data

- Customer account with saved events, orders, and profile/payment data.
- Dashboard user with access to `/manage/events`.
- Box Office employee with access to `/manage/box-office/sell`.
- OTP-enabled customer account.
- Google, Facebook, SAML SSO, and Apple provider accounts where enabled.
- Public event or venue page with a visible login-dependent action.
- Valid public checkout basket, checkout link, hold link, transfer checkout, and widget checkout.
- Unique email address for checkout sign-up.
- Native mobile app build and Electron desktop app build for the same environment.

## Qase-Ready Manual Test Cases

### TC-1: Core - Login - Verify direct login methods authenticate the correct user

**Description:** Validates that supported login methods authenticate a Showpass user from the direct login page and leave the user in a logged-in state.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out. Provider accounts are available for each enabled login method.  
**Postconditions:** The customer can log out and repeat the case with another login method.  
**Tags:** login, public, authenticated-user

**Parameters:**  
LoginMethod: EmailPassword, OtpEmailPassword, Google, Facebook, SamlSso

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the direct login page. | `/accounts/login/` | The login page is visible with the selected login method available when that method is enabled. |
| Complete login with the selected method. | LoginMethod | The customer is authenticated as the expected account. |
| For OTP login, complete the verification step before continuing. | Valid OTP code | Protected content is not available until the valid code is accepted. |
| Refresh the logged-in page. |  | The customer remains logged in as the same account. |

### TC-2: Core - Login - Verify protected account pages return after login

**Description:** Validates that a logged-out customer is sent to login from protected account pages and returns to the requested account page after authenticating.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out and has account data for the selected account page.  
**Postconditions:** The customer is logged in on the selected account page.  
**Tags:** login, authenticated-user, my-orders

**Parameters:**  
AccountPage: SavedEvents, MyOrders, ProfilePayment

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected protected account page directly. | AccountPage | The customer is redirected to login with the account page preserved as the return path. |
| Log in with a valid customer account. | Email and password | The selected account page opens after login. |
| Review the account information shown on the page. |  | The page shows account data for the logged-in customer only. |
| Refresh the page. |  | The same account page remains available without another login prompt. |

### TC-3: Dashboard - Login - Verify dashboard deep links return after login

**Description:** Validates that dashboard users must log in before accessing organizer dashboard pages and return to the requested page when they have permission.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:** The dashboard user is logged out and has organizer dashboard access.  
**Postconditions:** The dashboard user is logged in and can access the selected dashboard page.  
**Tags:** login, dashboard, organizer

**Parameters:**  
DashboardPage: ManageEvents, ManageOrders, ManageReports

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected dashboard page directly. | DashboardPage | The dashboard user is redirected to login with the dashboard page preserved as the return path. |
| Log in with a dashboard-capable account. | Email and password | The selected dashboard page opens after login. |
| Confirm the visible organization context. |  | Dashboard content belongs to an organization the user can access. |
| Refresh the dashboard page. |  | The page remains available without another login prompt. |

### TC-4: Box Office - Login - Verify Box Office deep links return after login

**Description:** Validates that Box Office employees must log in before accessing Box Office pages and return to the requested Box Office page after authenticating.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:** The Box Office employee is logged out and has Box Office access.  
**Postconditions:** The Box Office employee is logged in and can access the selected Box Office page.  
**Tags:** login, box-office, employee-permissions

**Parameters:**  
BoxOfficePage: Sell, Checkout, Transactions, Holds, Settings

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected Box Office page directly. | BoxOfficePage | The Box Office employee is redirected to login with the Box Office page preserved as the return path. |
| Log in with a Box Office-capable account. | Email and password | The selected Box Office page opens after login. |
| Confirm the visible venue or organization context. |  | Box Office content belongs to a venue or organization the employee can access. |
| Try the same page with an account missing Box Office access. | Account without Box Office permission | The account does not get usable Box Office access. |

### TC-5: Public Checkout - Login - Verify checkout continues after authentication

**Description:** Validates that a signed-out buyer can log in or sign up during public checkout, return to the same checkout flow, and keep basket and account ownership correct.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:** The buyer starts signed out with an eligible public item available for the selected platform and checkout entry point. Existing-account credentials are available for login. A unique email address is available for sign-up.  
**Postconditions:** The completed order belongs to the authenticated buyer account, or checkout can be safely abandoned without leaving another buyer's data visible.  
**Tags:** login, checkout, basket

**Parameters:**  
LoginAction: Login, SignUp  
CheckoutEntryPoint: CheckoutPage, CheckoutLink, HoldLink, TransferCheckout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start signed out and open checkout from the selected entry point. | CheckoutEntryPoint | Checkout loads with the expected item and asks the buyer to authenticate when required. |
| Choose the selected authentication action from checkout. | LoginAction | Login or sign-up starts without clearing the basket. |
| Complete authentication and return to checkout. | LoginAction | The buyer returns to the same checkout flow or purchase webview. |
| Review basket and customer details after authentication. |  | Basket contents are preserved and buyer information belongs to the authenticated account. |
| Complete payment. |  | Purchase completes successfully for the authenticated buyer. |
| Open buyer orders or the order detail page. |  | The completed order is visible under the authenticated buyer account. |

### TC-6: Widget - Login - Verify widget checkout does not expose unsupported login

**Description:** Validates that new SDK widget checkout does not require or expose an unsupported authenticated login flow.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:** The buyer is signed out and widget checkout is available for a public event.  
**Postconditions:** Widget checkout remains usable without creating an invalid authenticated widget-login path.  
**Tags:** login, widget, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open widget checkout. | `/widget/tickets/events/checkout` | The widget checkout loads in the embedded context. |
| Continue through the purchase flow until an authentication choice would normally appear. |  | The widget does not expose an unsupported authenticated login path. |
| Continue using the supported widget purchase path. |  | Widget checkout remains in the embedded context. |
| Review the checkout contents. |  | Basket contents remain correct and the widget does not send the buyer into a login loop. |

### TC-7: Public - Login - Verify public page login actions return to the intended context

**Description:** Validates that login-dependent public actions start login and return the customer to the intended public page or action.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out and a public page has the selected login-dependent action.  
**Postconditions:** The customer is logged in and the public page shows the correct logged-in state.  
**Tags:** login, public, events

**Parameters:**  
PublicAction: HeaderLogin, FavoriteEvent, TicketVoucherLogin, SpotifyPresaleLogin

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a public page with the selected action. | PublicAction | The public page is visible while the customer is logged out. |
| Trigger the selected login action. | PublicAction | The customer reaches the login surface for that action. |
| Log in with a valid customer account. | Email and password | The customer returns to the public page or completes the selected action where supported. |
| Refresh the public page. |  | The page still shows the customer as logged in. |

### TC-8: Core - Login - Verify account modal login returns to the original action

**Description:** Validates that in-page login through the account modal authenticates the customer and allows the original account or order action to continue.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out and can start an action that opens the account modal.  
**Postconditions:** The customer is logged in and the original action can continue.  
**Tags:** login, authenticated-user, orders

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start an account or order action that requires login. | Account modal action | The account modal opens with the login flow. |
| Log in from the modal. | Email and password | The modal closes or advances without sending the customer to an unrelated page. |
| Continue the original action. |  | The action can continue with data for the logged-in customer. |

### TC-9: Core - Login - Verify signup and password reset paths return to login

**Description:** Validates that signup and password reset entry points remain reachable from the login flow and allow customers to authenticate afterward.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out. A disposable email is available for signup and a reset-capable account is available for password reset.  
**Postconditions:** The customer can log in successfully after signup or password reset.  
**Tags:** login, registration, user-settings

**Parameters:**  
AuthEntryPoint: Signup, PasswordReset

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected auth entry point. | AuthEntryPoint | The signup or password reset flow is visible. |
| Complete the selected flow with valid data. | New account details or reset email | The customer reaches the expected post-submit state. |
| Return to login when the flow requires it. |  | The login page is available without losing the relevant return context. |
| Log in with the new or updated credentials. | Email and password | The customer is authenticated successfully. |

### TC-10: Mobile App - Login - Verify native login methods authenticate the correct user

**Description:** Validates that native mobile login methods authenticate the correct customer and return the app to a logged-in state.

| Platform | View |
| --- | --- |
| React Native Public | Mobile |

**Preconditions:** The customer is logged out of the native app. Provider accounts are available for enabled native login methods.  
**Postconditions:** The customer can log out and repeat the case with another native login method.  
**Tags:** login, mobile-view, authenticated-user

**Parameters:**  
NativeLoginMethod: EmailPassword, OtpEmailPassword, Facebook, Google, SamlSso, Apple

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the native app login screen. |  | The native login screen is visible with the selected method available when enabled. |
| Complete login with the selected method. | NativeLoginMethod | The app authenticates the expected customer. |
| For OTP login, complete the OTP screen before continuing. | Valid OTP code | The app does not complete login until the valid code is accepted. |
| Navigate to an account or home area. |  | The app shows the logged-in customer's information. |

### TC-11: Mobile App - Login - Verify authenticated webview content uses the native session

**Description:** Validates that protected web content opened inside the native app uses the native app session instead of asking for normal browser login.

| Platform | View |
| --- | --- |
| React Native Public | Mobile |

**Preconditions:** The customer is logged in to the native app and can open protected web content in the app webview.  
**Postconditions:** The customer remains logged in to native and webview content.  
**Tags:** login, mobile-view, authenticated-user

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open protected web content from the native app. | Account, checkout, or protected webview page | The page opens inside the app webview. |
| Review the webview authentication state. |  | The page does not show normal `/accounts/login/`. |
| Navigate to another protected webview page. |  | Protected content belongs to the native-app customer. |
| Refresh or reopen the webview when supported. |  | The page does not enter a login loop. |

### TC-12: Desktop App - Login - Verify desktop startup opens Box Office after login

**Description:** Validates that the Electron desktop app starts from the Box Office route, requires login when needed, and opens Box Office after authentication.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:** The Box Office employee is logged out of the Electron desktop app and has Box Office access.  
**Postconditions:** The Box Office employee is logged in or cleanly returned to login without a redirect loop.  
**Tags:** login, box-office

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Electron desktop app. |  | The app opens `/manage/box-office/sell` or redirects to login for that route. |
| Log in with a Box Office-capable account. | Email and password | Box Office Sell opens for the expected venue or organization. |
| Refresh the desktop window. |  | Box Office remains available without another login prompt. |
| Quit and reopen the desktop app. |  | The app restores the expected session or cleanly asks for login without looping. |

### TC-13: Public - Login - Verify provider callbacks return authenticated

**Description:** Validates that public provider login sends customers through the provider flow and returns them to Showpass in an authenticated state.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out. The selected provider is enabled on the public login surface.  
**Postconditions:** The customer can log out and repeat the case with another provider or account state.  
**Tags:** login, public

**Parameters:**  
Provider: Google, Facebook, SamlSso  
ProviderAccountState: NewProviderAccount, LinkedProviderAccount

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a public Showpass page with a login action. | Public page or `/accounts/login/` | The public page or login page is visible while the customer is logged out. |
| Start login with the selected provider. | Provider | The customer is sent to the provider authentication flow. |
| Complete provider authentication. | Provider account | The provider returns the customer to the matching Showpass callback route. |
| Review the signed-in state on Showpass. | ProviderAccountState | New provider accounts create a Showpass customer account and linked provider accounts sign in to the existing customer account. |
| Open a protected customer page. | `/account/my-orders` | The page opens for the provider-authenticated customer without another login prompt. |

### TC-14: Core - Login - Verify logout removes protected access

**Description:** Validates that logout removes access to protected account, dashboard, Box Office, and checkout entry points.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

**Preconditions:** The user is logged in on each selected platform and can access representative protected pages.  
**Postconditions:** The user is logged out and protected pages require login again.  
**Tags:** login, authenticated-user, edge-case

**Parameters:**  
ProtectedArea: Account, Dashboard, BoxOffice, Checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected protected area while logged in. | ProtectedArea | Protected content is visible for the logged-in account. |
| Log out using the normal logout action. |  | The app shows a logged-out state. |
| Reopen the same protected area. | ProtectedArea | The app requires login before protected content is available. |
| Use browser back or app back to return to the previous protected page. |  | Protected account, dashboard, Box Office, or checkout data is not visible or usable. |
| Refresh any protected page that appears after logout. |  | The app keeps the user logged out and does not restore protected content. |

## Minimum Execution Set

- TC-1: Core - Login - Verify direct login methods authenticate the correct user
- TC-2: Core - Login - Verify protected account pages return after login
- TC-3: Dashboard - Login - Verify dashboard deep links return after login
- TC-4: Box Office - Login - Verify Box Office deep links return after login
- TC-5: Public Checkout - Login - Verify checkout continues after authentication
- TC-7: Public - Login - Verify public page login actions return to the intended context
- TC-10: Mobile App - Login - Verify native login methods authenticate the correct user
- TC-11: Mobile App - Login - Verify authenticated webview content uses the native session
- TC-12: Desktop App - Login - Verify desktop startup opens Box Office after login
- TC-14: Core - Login - Verify logout removes protected access

## Regression Coverage

- Public header login action.
- Public event or venue favorite/save login action.
- `/accounts/claim/[uuid]` existing-user login links.
- Legacy claim links: `/accounts/claim/<uuid>/<uuid2>/` and `/accounts/t-claim/<uuid>/<uuid2>/`.
- Deprecated SDK login popup if still supported.
- Password reset, legacy password reset, and reset-key return to login.
- Provider-specific callback routes for Google, Facebook, and SAML.
- Native Apple login until a web Apple login surface exists.
- SAML error handling for unsupported domain, popup/deep-link failure, callback error, and token exchange failure.

## Existing Qase Coverage Notes

Strong existing login coverage:

| Area | Qase Cases |
| --- | --- |
| Basic login and validation | 3202, 3203, 3204 |
| Logout and Electron session persistence | 3205, 1357, 4923 |
| Password reset and account creation | 1879, 3206, 3207, 4908 |
| OTP login and OTP negatives | 3214, 3215, 3216, 3217, 3218, 3219 |
| Social and SAML SSO | 3220, 3221, 3222, 4394, 4897, 4898 |
| Checkout login or guest checkout adjacency | 4055, 2437, 4929 |
| Order claim/login modal adjacency | 2558, 2559 |
| Login analytics | 3317 |

Qase update status from the merged notes:

- Qase 4939 is the consolidated protected-pages case for logged-out account, manage, and Box Office access.
- Duplicate Qase 4940 was deleted after dashboard and Box Office protected-page coverage moved into Qase 4939.
- Qase 4055 was updated for checkout login/sign-up preservation across checkout page, checkout link, hold link, and transfer checkout.
- Qase 3205 was updated for logout cleanup across account, dashboard, Box Office, checkout, back, and refresh behavior.
- Google and Facebook provider cases were updated to public-page customer flows in Qase 3220 and 3221. Apple coverage in Qase 3222 should be treated as native-mobile/API coverage unless a web Apple login surface is confirmed.

Do not duplicate Qase cases for basic credentials, OTP, password reset, account protected-page coverage, widget login, or standalone mobile webview auth. Remaining deferred gaps: functional public login actions after canonical fixtures are agreed; SAML error handling; provider-email conflict recovery; legacy claim-link variants.

## Suggested New Or Updated Qase Coverage

- Add one SAML error-handling case with parameters for UnsupportedDomain, PopupBlockedOrClosed, CallbackError, MissingCode, ReplayedCode, and TokenExchangeFailed.
- Add one mobile SAML recovery case with parameters for CancelledBrowser, InvalidDeepLinkCallback, MissingOrMalformedPkce, and TokenExchangeFailed.
- Add one provider conflict case for Google/Facebook login attempted with an email already registered as an unlinked Showpass account.
- Update claim-link coverage to include `/accounts/claim/<uuid>/<uuid2>/`, `/accounts/t-claim/<uuid>/<uuid2>/`, and the frontend `/accounts/claim/[uuid]` route with `uuid2` query data.
- Update password reset coverage to include both frontend `/accounts/password-reset/` and backend legacy `/accounts/password/reset/` links, plus reset-key completion.

## Suggested Automated Coverage

- **GIVEN** a logged-out customer opens `/accounts/login/?next=/account/saved-events`, **WHEN** the customer logs in, **THEN** `/account/saved-events` opens for that customer.
- **GIVEN** a logged-out dashboard user opens `/accounts/login/?next=/manage/events`, **WHEN** the user logs in, **THEN** the dashboard events page opens.
- **GIVEN** a logged-out Box Office employee opens `/accounts/login/?next=/manage/box-office/sell`, **WHEN** the employee logs in, **THEN** Box Office Sell opens.
- **GIVEN** a logged-out customer starts checkout, **WHEN** the customer logs in from checkout authentication, **THEN** customer details update and the basket remains unchanged.
- **GIVEN** the Electron desktop app starts logged out, **WHEN** the Box Office employee logs in, **THEN** `/manage/box-office/sell` opens and survives refresh.

## Questions for Developer or Product

- Which providers are enabled in beta for web: Google, Facebook, SAML SSO?
- Which providers are enabled in the native app for the release: Facebook, Google, SAML SSO, Apple?
- Which public event or venue page should QA use as the canonical login-dependent public action?
- Is the deprecated SDK login popup still supported enough to test, or should it be marked not applicable?
