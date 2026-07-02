# Public Provider Login Qase Updates

## Qase-Ready Manual Test Cases

TC-1: Public - Login - Verify Google login returns to Showpass from public pages

**Description:** Validates that a customer can start Google login from a public Showpass login surface, complete Google authentication, and return to Showpass signed in.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out. Google login is enabled on the public login surface. Test Google accounts are available for the selected provider account state.  
**Postconditions:** The customer can log out and repeat the case with another provider account state.  
**Tags:** login, google, public

**Parameters:**
Platform: WebPublic, WebPublic
View: Desktop, Mobile

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a public Showpass page with a login action. | Public page or `/accounts/login/` | The public page or login page is visible while the customer is logged out. |
| Start Google login from the public login surface. | New or linked Google account | The customer is sent to the Google authentication flow. |
| Complete Google authentication. | Google account | The customer returns to Showpass without a blank page or provider error. |
| Review the signed-in state on Showpass. |  | New Google accounts create a Showpass customer account and linked Google accounts sign in to the existing customer account. |
| Open a protected customer page. | `/account/my-orders` | The page opens for the Google-authenticated customer without another login prompt. |

TC-2: Public - Login - Verify Facebook login returns to Showpass from public pages

**Description:** Validates that a customer can start Facebook login from a public Showpass login surface, complete Facebook authentication, and return to Showpass signed in.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out. Facebook login is enabled on the public login surface. Test Facebook accounts are available for the selected provider account state.  
**Postconditions:** The customer can log out and repeat the case with another provider account state.  
**Tags:** login, facebook, public

**Parameters:**
Platform: WebPublic, WebPublic
View: Desktop, Mobile

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a public Showpass page with a login action. | Public page or `/accounts/login/` | The public page or login page is visible while the customer is logged out. |
| Start Facebook login from the public login surface. | New or linked Facebook account | The customer is sent to the Facebook authentication flow. |
| Complete Facebook authentication. | Facebook account | The customer returns to Showpass without a blank page or provider error. |
| Review the signed-in state on Showpass. |  | New Facebook accounts create a Showpass customer account and linked Facebook accounts sign in to the existing customer account. |
| Open a protected customer page. | `/account/my-orders` | The page opens for the Facebook-authenticated customer without another login prompt. |

TC-3: Public - Login - Verify Apple login returns to Showpass from public pages

**Description:** Validates that a customer on an Apple device can start Apple login from a public Showpass login surface, complete Apple authentication, and return to Showpass signed in.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** The customer is logged out on an Apple device where Apple login is available. Apple login is enabled on the public login surface. Test Apple accounts are available for the selected provider account state.  
**Postconditions:** The customer can log out and repeat the case with another provider account state.  
**Tags:** login, public, registration

**Parameters:**
Platform: WebPublic, WebPublic
View: Desktop, Mobile

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a public Showpass page with a login action on an Apple device. | Public page or `/accounts/login/` | The public page or login page is visible while the customer is logged out, and Apple login is available. |
| Start Apple login from the public login surface. | New or linked Apple account | The customer is sent to the Apple authentication flow. |
| Complete Apple authentication. | Apple account | The customer returns to Showpass without a blank page or provider error. |
| Review the signed-in state on Showpass. |  | New Apple accounts create a Showpass customer account and linked Apple accounts sign in to the existing customer account. |
| Open a protected customer page. | `/account/my-orders` | The page opens for the Apple-authenticated customer without another login prompt. |
