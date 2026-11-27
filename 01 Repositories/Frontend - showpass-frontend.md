# Frontend - showpass-frontend

Repo path:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`

Frontend code follows backend schemas, APIs, permissions, and validation while showing how users reach and exercise that behavior.

## What QA Should Inspect

- Routes and navigation paths
- Components involved in the workflow
- Forms, inputs, and submit behavior
- UI validation and error display
- Feature flags and conditional rendering
- API usage and request timing
- User workflows across pages or modals

## QA Notes

- Use frontend findings to build realistic user-facing test steps.
- Compare UI validation with backend validation.
- Note selectors or page structure only when useful for automation.

## Mobile App Automation

The React Native app lives in `packages/mobile`. Follow [[09 Appium/Appium]] for local-first Safari, WebView, and app automation, or [[09 Appium/Showpass Mobile App]] for the beta build types and source-backed setup. Shared tooling and GitHub Actions instructions are maintained there.

## Feature-Aligned Test Case Folders

The canonical test-case folder index is [[03 Test Cases/Test Cases by Feature]].

Frontend feature inventory is derived from:

- `packages/core/src/app-contexts/dashboard/features/`
- `packages/core/src/app-contexts/public/features/`
- `packages/core/src/app-contexts/user/features/`
- `packages/core/src/shared/modules/`

The QA folders use product-facing names instead of mirroring the code tree one-to-one. Features shared across Dashboard, Public, User, or shared modules use one test folder.

| Frontend source examples | QA feature folder |
| --- | --- |
| `auth`, `login`, `resend-confirmation` | `Authentication` |
| `admins/admin-actions` | `Admin Actions` |
| `assigned-seating`, `assigned-seating-builder`, `assigned-seating-assigner` | `Assigned Seating` |
| `configured-fees`, `custom-fees`, `internal-fees` | [[03 Test Cases/Test Cases by Feature#Find topics under their owning feature\|Fees and Financials case references]] |
| `custom-forms`, `form-engine` | `Custom Questions` |
| `group-sales`, `transfers` | `Group Sales and Transfers` |
| `credits`, `ticket-credits` | `Ticket Credits` |
| `tickets`, `ticket-types`, `order-pdfs` | `Ticketing` |
| `waitlist`, `waitlists` | [[03 Test Cases/Events/04 Operations/04 Waitlists\|Event Waitlists]] and the [[03 Test Cases/Test Cases by Feature#Saved Qase cases to start with\|saved allocation and expiry cases]] |

Add a folder when there is a case, coverage note or run for it. The index can point a topic to its owning feature even when several source directories contribute to it.

Code-only scaffolding is not given a test-case folder unless it exposes independent user behavior. Current exclusions include `caching`, `example-dashboard`, `key-value-params`, `layouts`, `navigation`, `realtime`, `route-placeholders`, `temp-files`, and `tracking-tokens`.

Inventory last aligned with the frontend repository on 2026-07-28.

## Product feature coverage inventory

This inventory accounts for all **127 directories** in the four frontend feature trees listed above at `5867dd39dcde`. Shared behavior appears once with its applicable surfaces. The vault links are where to look for cases, a worked path, or a recorded gap. They do not imply that every platform or behavior is covered or that a test ran. Read the [[01 Repositories/Backend - web-app|backend]] at the relevant rule and follow [[05 Tooling/qasectl|qasectl]] for the current saved case when proposing coverage.

| Frontend directories | Surfaces | Test library entry or scope |
| --- | --- | --- |
| `abandoned-carts` | Dashboard | [[03 Test Cases/Abandoned Carts/legacy-abandoned-carts-qase-test-cases]] |
| `access-pin` | Dashboard | [[03 Test Cases/Access PIN/Access PIN QA Library]] |
| `admins` | Dashboard | [[03 Test Cases/Admin Actions/admin-actions-test-cases]] |
| `assigned-seating-builder`, `assigned-seating`, `seating`, `venue-spaces` | Dashboard, Public, Shared | [[03 Test Cases/Seating/Seating QA Library]] |
| `box-office` | Dashboard | [[03 Test Cases/Box Office/Box Office Test Cases]] |
| `check-in`, `entry` | Dashboard | [[03 Test Cases/Check-In/Check-In QA Library]] |
| `configured-fees`, `custom-fees`, `internal-fees` | Dashboard | [[03 Test Cases/Fees/Fees QA Library]] |
| `customer-network`, `customers` | Dashboard, Shared | [[03 Test Cases/Customer Network/Customer Network QA Library]] |
| `developer` | Dashboard | [[03 Test Cases/Organizations/SPW-21369-legacy-api-key-rotation-and-integrations-test-cases]] |
| `discounts` | Dashboard, Public, Account, Shared | [[03 Test Cases/Discounts/discount-creation-qase-gap-analysis]] |
| `domo-dashboard` | Dashboard | [[03 Test Cases/Analytics/analytics-qase-test-cases]]. Advanced Analytics entry is also documented in [SPT-1687](https://app.qase.io/case/SPT-1687). |
| `events`, `event-detail`, `event-purchase` | Dashboard, Public, Shared | [[03 Test Cases/Events/event-management-qase-test-cases]] |
| `financials` | Dashboard, Shared | [[03 Test Cases/Financials/Financials QA Library]] |
| `gift-cards` | Dashboard, Public, Shared | [[03 Test Cases/Gift Cards/Gift Card Test Cases]] |
| `group-sales`, `transfers` | Dashboard, Shared | [[03 Test Cases/Group Sales and Transfers/Transfer Group Sales]] |
| `items`, `item-groups` | Dashboard, Shared | [[03 Test Cases/Items/Items QA Library]] |
| `memberships`, `membership-detail` | Dashboard, Public, Shared | [[03 Test Cases/Memberships/membership-benefit-seating-permissions-test-cases]] |
| `monetization` | Dashboard | [[03 Test Cases/Monetization/manage-dashboard-test-case]] |
| `my-settings`, `account` | Dashboard, Account | [[03 Test Cases/Customer Accounts/Customer Accounts QA Library]] |
| `operations` | Dashboard | [[03 Test Cases/Operations/Operations QA Library]] |
| `organization`, `venues`, `venue`, `org-profile` | Dashboard, Public, Shared | [[03 Test Cases/Venues/Venues QA Library]] |
| `packages` | Dashboard, Shared | [[03 Test Cases/Packages/Packages QA Library]] |
| `products` | Dashboard, Public, Shared | [[03 Test Cases/Products/inventory-qase-test-cases]] |
| `reports` | Dashboard | [[03 Test Cases/Reports/reports-qase-test-cases]] |
| `reservations`, `guestlist` | Dashboard, Public | [[03 Test Cases/Reservations/Reservations QA Library]] |
| `rewards` | Dashboard, Shared | [[03 Test Cases/Rewards/Rewards QA Library]] |
| `showire` | Dashboard | [[03 Test Cases/Showire/Showire QA Library]] |
| `suborganization-review`, `register-suborg`, `organization-registration` | Dashboard, Public | [[03 Test Cases/Organizations/organization-registration-qase-gap-analysis]]. Account for approver and applicant as separate actors. Exact coverage of the standalone review route is still to be checked. |
| `talent`, `talents` | Dashboard, Public, Shared | [[03 Test Cases/Talent/Talent QA Library]] |
| `ticket-credits` | Dashboard | [[03 Test Cases/Ticket Credits/ticket-credits-page-qase-test-cases]] |
| `tracking-links` | Dashboard, Public | [[03 Test Cases/Tracking Links/event-scoped-tracking-links-qase-gap-analysis]] |
| `transactions` | Dashboard | [[03 Test Cases/Transactions/invoice-breakdown-qase-test-cases]] |
| `venue-user-stats` | Dashboard | [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis#Dashboard → Account → My stats]] |
| `waitlist` | Dashboard | [[03 Test Cases/Waitlists/Waitlists QA Library]] |
| `websites` | Dashboard, Public, Shared | [[03 Test Cases/Websites/Websites QA Library]] |
| `widget-editor`, `widget` | Dashboard, Public | [[03 Test Cases/Widget/Widget QA Library]] |
| `workflow-definitions`, `workflows` | Dashboard, Shared | [[03 Test Cases/Workflows/Workflows QA Library]] |
| `ad-placements`, `analytics` | Public, Shared | [[03 Test Cases/Advertising/Advertising QA Library]] |
| `basket` | Public, Account, Shared | [[03 Test Cases/Basket/Basket QA Library]] |
| `calendar`, `discovery`, `detail-pages` | Public | [[03 Test Cases/Event Discovery/Event Discovery Test Cases]] |
| `checkout`, `invoice-staging`, `payments` | Public, Shared | [[03 Test Cases/Checkout/Checkout Money Movement Test Drafts]]. Invoice staging is part of purchase preparation. Follow only its observable payment and order outcomes. |
| `claims` | Public | [[03 Test Cases/Ticket Claims/Ticket Claims QA Library]] |
| `custom-forms`, `form-engine`, `order-form-responses` | Public, Shared | [[03 Test Cases/Custom Questions/custom-questions-qase-gap-analysis]] |
| `exchanges` | Public, Shared | [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario]] |
| `holds` | Public | [[03 Test Cases/Holds/Holds QA Library]] |
| `order-pdfs`, `tickets`, `ticket-types` | Public, Shared | [[03 Test Cases/Ticketing/SPW-19386-hardcopy-ticket-order-page-test-cases]] |
| `promoter-verification` | Public | [[03 Test Cases/Venues/Venues QA Library#Promoter verification]] |
| `protection-upsell`, `refund-request`, `refund-protection` | Public, Shared | [[03 Test Cases/Refunds and Protection/SPW-19666-customer-self-refunds-test-cases]] |
| `payout-payment-preference` | Account | [[03 Test Cases/Payouts/payouts-qase-test-cases#Account payout payment preference]] |
| `presale` | Account | [[03 Test Cases/Presale/Presale QA Library]] |
| `resend-confirmation` | Public | [[03 Test Cases/Orders/customer-email-language-test-cases]] |
| `streaming-participants` | Account | [[03 Test Cases/Streaming/Streaming QA Library]] |
| `ai-chat` | Shared | [[03 Test Cases/AI Chat/AI Chat QA Library]] |
| `auth`, `login` | Shared | [[03 Test Cases/Authentication/login-test]] |
| `branding` | Shared | [[03 Test Cases/Branding/Branding QA Library]] |
| `custom-consent` | Shared | [[03 Test Cases/Consent/Consent QA Library]] |
| `media-library` | Shared | [[03 Test Cases/Media Library/Media Library QA Library]] |
| `printing` | Shared | [[03 Test Cases/Printing/desktop-app-thermal-receipt-blocking-test-cases]] |
| `queue-it` | Shared | [[03 Test Cases/Queue-It/Queue-It QA Library]] |
| `ratings` | Shared | [[03 Test Cases/Ratings/Ratings QA Library]] |
| `example-dashboard`, `layouts`, `route-placeholders`, `key-value-params`, `tracking-tokens`, `temp-files`, `caching`, `navigation`, `realtime` | Dashboard, Public, Account, Shared | Owning product paths. Implementation or shell modules. Verify supported user behavior through the routes, documents, tracking or data updates that consume them. |
