# Login Entry Point Test Cases

## Summary of Change

This note covers all known entry points where a Showpass user can reach login, plus the login methods available by platform. The goal is broad entry-point coverage without duplicating storage-state setup cases.

## Sources Reviewed

- [[Frontend - showpass-frontend]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/accounts/login.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/login/components/Login/Login.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/login/components/LoginForm/LoginForm.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/login/components/AccountModal/AccountModal.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/login/CheckoutLogin/CheckoutLogin.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/gssp-subroutines/withUser/withUser.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/gssp-subroutines/getServerAuthHeaders.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/AuthScreens/LoginScreen/LoginScreen.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/AuthScreens/SsoLoginScreen/SsoLoginScreen.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/desktop/src/main/window/MainWindow.ts`

## Assumptions and Unknowns

- Google, Facebook, SAML SSO, Apple, and OTP coverage depends on enabled providers and available test accounts in the target environment.
- Guest checkout is checkout coverage, not a login method.
- The deprecated SDK login popup should be marked not applicable if product or engineering no longer supports it.
- Backend auth contracts were not re-reviewed for this note; this is frontend entry-point coverage.

## Source-Backed Behavior

- `/accounts/login/` supports email/password, OTP continuation, Google, Facebook, and SAML SSO when enabled.
- `/accounts/login/?next=<path>` returns the authenticated user to the requested path.
- Protected account and dashboard pages redirect logged-out users to `/accounts/login/?next=<requested-path>`.
- Checkout can use an embedded authentication container and may also offer guest checkout.
- Native mobile login supports email/password, Facebook, Google, SAML SSO, Apple, signup, password reset, and OTP screens.
- Mobile app webview auth can use the native app token cookie instead of normal browser login.
- Electron desktop app starts at `/manage/box-office/sell`, then relies on web login before Box Office access.

## Entry Paths

| Platform / View                | Entry Path                                                                                         | Login Surface                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| WebPublic / Desktop            | `/accounts/login/`                                                                                 | Full login page                           |
| WebPublic / Desktop            | `/accounts/login/?next=<protected-path>`                                                           | Full login page with return URL           |
| WebPublic / Desktop and Mobile | Public header/login action                                                                         | Login page or account modal               |
| WebPublic / Desktop and Mobile | Public event, venue/profile, favorite/save, ticket voucher, Spotify presale                        | Login page or account modal               |
| WebPublic / Desktop            | `/account/*`                                                                                       | Login redirect with `next`                |
| WebBoxOffice / Desktop         | `/manage/*`                                                                                        | Login redirect with `next`                |
| WebBoxOffice / Desktop         | `/manage/box-office/*`                                                                             | Login redirect with `next`                |
| WebPublic / Desktop and Mobile | `/checkout/`, `/checkout/link/[id]`, `/checkout/hold/[id]`, `/checkout/transfers/[transaction_id]` | Checkout authentication or login redirect |
| Widget / Desktop and Mobile    | `/widget/tickets/events/checkout`                                                                  | Embedded checkout authentication          |
| WebPublic / Desktop            | `/accounts/signup/`, `/accounts/password-reset/`, `/accounts/claim/[uuid]`                         | Account auth pages                        |
| WebPublic / Desktop            | OAuth/SAML callback routes                                                                         | Provider callback                         |
| React Native Public / Mobile   | `LoginScreen`, `SsoLoginScreen`, signup, password reset, OTP                                       | Native auth screens                       |
| React Native Public / Mobile   | Authenticated webview content                                                                      | Native webview token                      |
| Electron / Desktop             | `/manage/box-office/sell` startup                                                                  | Web login in desktop shell                |

## Risk Areas

- Return URLs can break and send the authenticated user to the wrong page.
- Protected pages can briefly expose account, dashboard, checkout, or Box Office data before redirecting.
- Provider callbacks can strand the user on a blank or unauthenticated page.
- Checkout login can lose basket, customer, or widget context.
- Native mobile and webview auth can diverge from browser auth behavior.
- Desktop session persistence can fail across refresh or app restart.
- Logout can leave protected content available through back/refresh.

## State-Space / Initial Condition Matrix

| Axis | Values | Why It Matters |
| --- | --- | --- |
| Platform | WebPublic, Widget, WebBoxOffice, React Native Public, Electron | Login entry points and available methods differ by platform. |
| View | Desktop, Mobile | Public, widget, and mobile app flows can use different login surfaces. |
| LoginMethod | EmailPassword, OtpEmailPassword, Google, Facebook, SamlSso, Apple, WebviewToken | Method availability and callback behavior differ. |
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

**Description:** Validates that customer login during public checkout keeps the basket and customer context intact across checkout entry points.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out and has a valid checkout entry point.  
**Postconditions:** The customer is logged in and checkout still contains the expected basket.  
**Tags:** login, checkout, basket

**Parameters:**  
CheckoutEntryPoint: CheckoutPage, CheckoutLink, HoldLink, TransferCheckout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start checkout from the selected entry point. | CheckoutEntryPoint | Checkout opens and asks the customer to authenticate when required. |
| Log in from the checkout authentication step or login redirect. | Email and password | Checkout continues after login. |
| Review the checkout customer details and basket. |  | Customer details belong to the logged-in account and the basket is unchanged. |
| Refresh checkout. |  | Checkout remains available without losing the basket or returning unexpectedly to login. |

### TC-6: Widget - Login - Verify embedded checkout login keeps widget context

**Description:** Validates that login from embedded checkout completes without breaking the widget or host checkout flow.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:** The customer is logged out and the widget checkout is available for a public event.  
**Postconditions:** The widget checkout remains usable after login.  
**Tags:** login, widget, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open widget checkout. | `/widget/tickets/events/checkout` | The widget checkout loads in the embedded context. |
| Continue to the authentication step. |  | The widget shows the login flow without leaving the embedded checkout unexpectedly. |
| Log in with a valid customer account. | Email and password | The widget returns to checkout after authentication. |
| Review the checkout contents. |  | Basket and customer details are still correct for the logged-in customer. |

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

### TC-13: Core - Login - Verify provider callback URLs return authenticated

**Description:** Validates that social and SAML provider callbacks return customers to Showpass in an authenticated state.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out and the selected provider is enabled in the environment.  
**Postconditions:** The customer is authenticated or the unavailable provider is marked not applicable.  
**Tags:** login, google, facebook

**Parameters:**  
ProviderCallback: Google, Facebook, SamlSso

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start login with the selected provider. | ProviderCallback | The customer is sent to the provider login flow. |
| Complete provider authentication. | Provider account | The provider returns the customer to the matching Showpass callback route. |
| Review the Showpass page after callback. |  | The customer is authenticated and not stranded on a blank or error page. |
| Open a protected account page. | `/account/my-orders` | The protected page opens for the provider-authenticated customer. |

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
| Use back and refresh on any protected page that appears. |  | Previous account data is not visible or usable. |

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
- Deprecated SDK login popup if still supported.
- Password reset and reset-key return to login.
- Provider-specific callback routes.

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
