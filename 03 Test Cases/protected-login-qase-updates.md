# Protected Login Qase Updates

## Duplicate Check

- Account protected-page coverage already exists as Qase 4772: `Core - User Account - Verify protected account pages are blocked for logged-out users`.
- Do not create a duplicate account-protection case in suite 605.
- New coverage in this file focuses on one parameterized protected-pages case for account, manage, and Box Office pages.
- Existing checkout and logout cases are updated instead of duplicated.

## Qase Push Result

- Created Qase 4939 from TC-1 in suite 605, then updated it into the single parameterized protected-pages case.
- Deleted duplicate Qase 4940 after consolidating protected dashboard and Box Office coverage into Qase 4939.
- Updated Qase 4055 from TC-3 in suite 597.
- Updated Qase 3205 from TC-4 in suite 605.

## Qase-Ready Manual Test Cases

TC-1: Core - Login - Verify protected pages require login for logged-out users

**Description:** Validates that account, manage, and Box Office pages are not available to logged-out users and return authorized users to the requested protected page after login.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| WebBoxOffice | Desktop |

**Preconditions:** The user is logged out. An authorized account is available for each selected protected area. Account examples include saved events, my orders, and profile or payment pages. Manage examples include events, orders, and reports. Box Office examples include sell, checkout, transactions, holds, and settings.  
**Postconditions:** The user is logged in on the selected protected page, or the protected page still requires login if authentication is not completed.  
**Tags:** login, authenticated-user, edge-case

**Parameters:**
ProtectedArea: Account, Manage, BoxOffice

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a protected page for the selected area while logged out. | ProtectedArea | Protected account, manage, or Box Office content is not visible and the user is sent to login with the requested page preserved. |
| Refresh the login page or use browser back before authenticating. |  | Protected content remains unavailable while the user is logged out. |
| Log in with an account authorized for the selected protected area. | Email and password | The requested protected page opens after authentication. |
| Review the visible account, organization, or venue context. |  | Protected content belongs to the logged-in account or an organization or venue the account can access. |

TC-3: Public Checkout - Login - Verify authentication preserves checkout entry point and basket

**Description:** Validates that a signed-out buyer can log in or sign up during public checkout, return to the same checkout flow, and keep the basket and account ownership correct.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:** The buyer starts signed out with an eligible public item available for the selected platform and checkout entry point. Existing-account credentials are available for login. A unique email address is available for sign-up.  
**Postconditions:** The completed order belongs to the authenticated buyer account, or the checkout can be safely abandoned without leaving another buyer's data visible.  
**Tags:** checkout, login

**Parameters:**
LoginAction: Login, SignUp
CheckoutEntryPoint: CheckoutPage, CheckoutLink, HoldLink, TransferCheckout
Platform: WebPublic, WebPublic, ReactNativePublic
View: Desktop, Mobile, Mobile

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start signed out and open checkout from the selected entry point. | CheckoutEntryPoint | Checkout loads with the expected item and asks the buyer to authenticate when required. |
| Choose the selected authentication action from checkout. | LoginAction | Login or sign-up starts without clearing the basket. |
| Complete authentication and return to checkout. | LoginAction | The buyer returns to the same checkout flow or purchase webview. |
| Review basket and customer details after authentication. |  | Basket contents are preserved and buyer information belongs to the authenticated account. |
| Complete payment. |  | Purchase completes successfully for the authenticated buyer. |
| Open buyer orders or the order detail page. |  | The completed order is visible under the authenticated buyer account. |

TC-4: Core - Authentication - Verify logout removes access to protected pages

**Description:** Validates that logout removes access to protected account, dashboard, Box Office, and checkout pages, including browser back and refresh behavior.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

**Preconditions:** The selected account is logged in and can access the selected protected area.  
**Postconditions:** The selected account is logged out and the protected page requires login again.  
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
