---
title: Test Cases by Feature
tags:
  - qa/navigation
  - qa/test-cases
aliases:
  - Test Case Index
---

# Test Cases by Feature

This is the [[00 Start Here/Showpass QA City#Find cases and plan a handoff|QA City knowledge base]] for case definitions, coverage reviews and execution evidence. Use the [[00 Start Here/Showpass QA Handbook/00 Index|Showpass QA Master Handbook]] to choose setup, test actions and the proof that matters. Keep each case, gap review or run in its owning feature folder and update the existing canonical note for the same work.

Use the [[01 Repositories/Frontend - showpass-frontend#Product feature coverage inventory|product feature coverage inventory]] when a request starts from a route or source module. For each feature, open the local note for setup, related records and saved case coverage. Use [[01 Repositories/Backend - web-app]] to confirm the governing rules and [[05 Tooling/qasectl]] to check the current saved case fields before drafting a new one.

## Connected feature journeys

Start at the feature that owns the first check. Carry the safe reference and verified state of the existing record to the next role. Use the linked run note to check which variant actually ran.

| Journey | Existing record and handoff | Testing guide and case evidence |
| --- | --- | --- |
| Event setup → public purchase → Check In | Organizer Builder verifies the published Event and Ticket Type. The Guest or Customer Tester uses them to create a new order. The Box Office Tester uses its issued ticket to verify admission. | [[00 Start Here/Showpass QA Handbook/Playbooks/11 Event Sales Calendars and Availability\|Event lifecycle]] · [[03 Test Cases/Events/event-management-qase-test-cases\|Event case index]] · [[03 Test Cases/Check In/check-in-qase-test-cases\|Check In cases]] |
| Order Form → checkout → Check In and Will Call | The Organizer saves the questions. A buyer creates a new order with known answers. The Box Office Tester checks the issued ticket, and the Organizer Tester checks the report for that order. Both check the submitted labels. | [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations\|Forms and downstream results]] · [[03 Test Cases/Events/02 Manage/05 Order form#Additional existing Qase cases\|SPT-3269 and SPT-3270]] |
| Package → checkout → child items | The Organizer verifies the parent and child ticket setup. A buyer creates a new order. Use the order to check child ticket quantities and whose information belongs on each item. | [[00 Start Here/Showpass QA Handbook/Playbooks/03 Packages and Parent-Child Items\|Package walkthrough]] · [[03 Test Cases/Events/03 Promote/03 Packages\|Package cases and saved Qase references]] |
| Order Form → ticket transfer → recipient order | The sender uses an existing order to create a pending transfer. A separate recipient accepts it and checks the new order, issued ticket and saved answer. | [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale#Transfer to a different Customer\|Transfer walkthrough]] · [[03 Test Cases/Group Sales and Transfers/spw-21449-required-ticket-transfer-question-test-cases\|SPT-6025 and the local rename draft]] · [[03 Test Cases/Group Sales and Transfers/SPT-6025 Transfer Acceptance Browser Run - 2026-11-23#Results\|Public and Box Office run results]] |
| Membership benefit → seating → admission and reporting | The Organizer supplies the configured Group, Level and entitlement. The Member uses their existing Membership to obtain the eligible ticket. Verify the exact seat, then check admission or benefit usage as scoped. | [[00 Start Here/Showpass QA Handbook/Playbooks/05 Memberships and Ticket Benefits\|Membership walkthrough]] · [[03 Test Cases/Memberships/membership-benefit-seating-permissions-test-cases\|Benefit seating cases]] · [[03 Test Cases/Reports/reports-qase-test-cases#SPT-920: Member Seating Report\|Member Seating report]] |
| Waitlist signup → inventory allocation → purchase | The visitor creates a waitlist request. The Organizer uses that existing request to allocate inventory. The buyer uses the resulting offer to create a new order and verify issuance and the final subscriber state. | [[00 Start Here/Showpass QA Handbook/Playbooks/17 Holds Waitlists and Guestlists#Waitlist join → Inventory available → final Customer result\|Waitlist walkthrough]] · [[03 Test Cases/Events/04 Operations/04 Waitlists\|Event and Dashboard paths]] · [[#Saved Qase cases to start with\|Qase allocation and expiry cases]] |
| Discount or Ticket Credit → checkout → usage report | The Organizer supplies the existing Offer or code and its limits. The buyer creates a new order using it. The Organizer verifies usage for that code or Offer and checks any scoped adjustment against the same order. | [[00 Start Here/Showpass QA Handbook/Playbooks/06 Discounts and Ticket Credits\|Redemption walkthrough]] · [[03 Test Cases/Ticket Credits/ticket-credits-page-qase-test-cases\|Ticket Credit cases]] · [[03 Test Cases/Reports/reports-qase-test-cases#SPT-4393: Ticket Credit Usage Report\|Ticket Credit Usage report]] |
| Gift Card → delivery or redemption → balance | The Organizer configures the card type. A buyer creates the gift-card order. The recipient uses the issued code to create a separate order and verifies the applied amount and remaining value. | [[00 Start Here/Showpass QA Handbook/Playbooks/07 Money Credits and Gift Cards\|Gift Card walkthrough]] · [[#Saved Qase cases to start with\|Qase purchase and redemption cases]] · [[03 Test Cases/Reports/reports-qase-test-cases#SPT-3832: Gift Card Recipient Report\|Gift Card Recipient report]] |
| Fees → checkout → adjustment → financial reporting | The Organizer records the effective settings. The buyer creates an order with a known total. Use that order to verify the selected Refund, Void, or Exchange, then reconcile the matching transaction and report rows. | [[00 Start Here/Showpass QA Handbook/Playbooks/02 Fees Taxes and Absorbed Costs\|Fees walkthrough]] · [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges\|Adjustment walkthrough]] · [[03 Test Cases/Checkout/Checkout Money Movement Test Drafts\|Money movement drafts]] · [[03 Test Cases/Reports/reports-qase-test-cases#Case index\|Reports case index]] |
| Complex Event build → discounted Package → Exchange | The Organizer Builder prepares the parent and child Events, discount, Order form and inventory. The purchase creates the original order for the intended Customer. The next tester establishes eligibility and tracks the replacement through money, inventory and admission. | [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario\|Worked example with variations and case links]] |
| Embedded Widget → checkout → order | The Organizer supplies the existing website and widget configuration. The Guest or Customer Tester follows the supported handoff and verifies the original selection and final order. | [[00 Start Here/Showpass QA Handbook/Playbooks/13 Widgets and Client Handoffs\|Widget walkthrough]] · [[03 Test Cases/Authentication/widget-login-feature-flag-test-cases\|Widget sign-in cases]] · [[03 Test Cases/Analytics/safari-ga4-widget-2026-11-10\|Safari widget analytics evidence]] |

## Fill a gap

1. Search this index, the owning note and linked features for the exact setup, action and result. Add an Obsidian link when the case or run already exists. Link both sides of a handoff from their owning notes.
2. If the exact case is still missing from the vault, use the [[05 Tooling/qasectl#Read-Only Bulk Search Workflow|read-only Qase workflow]]. Compare case prerequisites, parameters, steps and expected results. Link a matching saved case by ID. If the comparison could not be completed, record coverage as **Unknown** and name the missing evidence.
3. For an unclear behavior, trace saved rules and downstream effects in [[01 Repositories/Backend - web-app]], then verify supported entry points and observable results in [[01 Repositories/Frontend - showpass-frontend]]. Update the relevant handbook walkthrough with reusable guidance when needed. Keep case details and evidence with the owning feature.
4. When the evidence confirms a distinct missing check, use [[06 Prompts/Showpass Qase Gap Analysis|Qase Gap Analysis]] and [[00 Start Here/Showpass QA City#Draft test cases with review|City draft review]]. Link the local draft for the next assignment and mark its execution **Not run**. A saved case ID shows publication. Use the exact run evidence for execution results.

### Saved Qase cases to start with

These case definitions were checked in project SPT on 2026-11-26. The owning notes and the handbook give the surrounding workflow. For a named run, open Qase and use the current case fields and parameter values.

| Feature | Saved cases and what they check |
| --- | --- |
| Basket expiry | [SPT-244](https://app.qase.io/case/SPT-244) checks that a shared Web Public cart clears in the remaining tab after expiry. Use the [[00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders\|Payments and Orders guide]] for purchase and retry checks. |
| Box Office Holds | [SPT-1249](https://app.qase.io/case/SPT-1249) checks conversion of a regular hold to an invoice and releases the original hold. [SPT-4824](https://app.qase.io/case/SPT-4824) checks that expired or released links block purchase and free inventory. [SPT-912](https://app.qase.io/case/SPT-912) checks the included hold records in the generated CSV. [[00 Start Here/Showpass QA Handbook/Playbooks/17 Holds Waitlists and Guestlists#Hold → Customer purchase or release\|Hold walkthrough]] |
| Branding | [SPT-4125](https://app.qase.io/case/SPT-4125) checks Organization branding in a received preview email. [SPT-4126](https://app.qase.io/case/SPT-4126) checks that Event settings override the matching branding fields and that unset fields use the fallback. |
| Checkout consent | [SPT-5433](https://app.qase.io/case/SPT-5433) checks saving a consent item. [SPT-4970](https://app.qase.io/case/SPT-4970) checks that required consent blocks payment until it is accepted and saved. [SPT-4798](https://app.qase.io/case/SPT-4798) checks the checkout responses in the report. [[03 Test Cases/Consent/Consent QA Library\|Consent setup and downstream checks]] |
| Event discovery | [SPT-4790](https://app.qase.io/case/SPT-4790) checks Public Web filters, empty results and pagination. [SPT-3967](https://app.qase.io/case/SPT-3967) checks the React Native Public Explore feed in guest and signed-in sessions. |
| Gift Cards | [SPT-4064](https://app.qase.io/case/SPT-4064) verifies saved denominations and inventory. [SPT-562](https://app.qase.io/case/SPT-562) checks the saved future date and that the email stays unsent at purchase. [SPT-3339](https://app.qase.io/case/SPT-3339) checks the paid amount and remaining gift-card balance. [SPT-3845](https://app.qase.io/case/SPT-3845) checks restored value after a refund. |
| Guestlists | [SPT-3769](https://app.qase.io/case/SPT-3769) creates a pending booking from the Widget. [SPT-3776](https://app.qase.io/case/SPT-3776) approves an existing pending booking, and [SPT-3775](https://app.qase.io/case/SPT-3775) verifies the saved arrival count for a booked party. [[00 Start Here/Showpass QA Handbook/Playbooks/17 Holds Waitlists and Guestlists#Guestlist request → approval → arrival\|Guestlist walkthrough]] |
| Payment plan terms | [SPT-5442](https://app.qase.io/case/SPT-5442) verifies the requirement and terms persist in Organization settings. [SPT-4759](https://app.qase.io/case/SPT-4759) checks the refund restriction for an existing invoice paid by payment plan. [[00 Start Here/Showpass QA Handbook/Playbooks/09 Payment Plans and Saved Methods\|Payment plan lifecycle guide]] |
| Waitlists | [SPT-5757](https://app.qase.io/case/SPT-5757) follows allocation through purchase while public tickets stay sold out. [SPT-2957](https://app.qase.io/case/SPT-2957) covers expired or cancelled offers and released inventory. [SPT-917](https://app.qase.io/case/SPT-917) covers the generated subscriber CSV. |
| Queue-it | [SPT-5898](https://app.qase.io/case/SPT-5898) checks the protected Organizer URL, waiting-room return and reused admission. Use the relevant case in [suite 1256](https://app.qase.io/project/SPT?suite=1256) for the other supported navigation and client cases. |
| Websites and Widget checkout | [SPT-5135](https://app.qase.io/case/SPT-5135) follows the saved website control to the public Event selection. [SPT-5021](https://app.qase.io/case/SPT-5021) checks that checkout keeps the intended parent-page return URL and attribution. [[00 Start Here/Showpass QA Handbook/Playbooks/13 Widgets and Client Handoffs\|Widget walkthrough]] |

## New case drafts

These standalone local drafts use the saved SPT snapshot of 2,492 definitions retrieved on 2026-11-26 and the linked backend and frontend evidence. Open each case for its setup, steps, scope and review. Execution is **Not run**.

The QA Lead and Qase Police marked all 12 written drafts **Ready to use**. Case-specific prerequisites and unverified extensions remain with the owning note.

| Feature interaction | Draft case |
| --- | --- |
| Packages and exchange quote | [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario#TC-1: Quote only the paid value of a discounted Package in a mixed order\|Quote only the paid value of a discounted Package in a mixed order]] |
| Box Office and Customer ownership | [[03 Test Cases/Box Office/Box Office Test Cases#TC-1: Require an account before offering individual ticket exchange in Box Office\|Require an account before offering individual ticket exchange in Box Office]] |
| Package refund and financial reports | [[03 Test Cases/Financials/Financials QA Library#TC-1: Reconcile a discounted Package refund across its included Events\|Reconcile a discounted Package refund across its included Events]] |
| Fees and refund value | [[03 Test Cases/Fees/Fees QA Library#TC-1: Return ticket tax and retain taxed custom fees on a Base refund\|Return ticket tax and retain taxed custom fees on a Base refund]] |
| Waitlist and Product inventory | [[03 Test Cases/Waitlists/Waitlists QA Library#TC-1: Keep a package request pending when its included product sells out\|Keep a package request pending when its included product sells out]] |
| Event email preview | [[03 Test Cases/Events/05 Settings/02 Email customization#TC-1: Preview uses the saved Event subject until the Organizer saves a new one\|Preview uses the saved Event subject until the Organizer saves a new one]] |
| Website AI Assistant | [[03 Test Cases/AI Chat/AI Chat QA Library#TC-1: A Website checkout label changes only after its AI settings proposal is approved\|A Website checkout label changes only after its AI settings proposal is approved]] |
| Website images and Venue context | [[03 Test Cases/Media Library/Media Library QA Library#TC-1: Image search stays in the Venue of the Website being edited\|Image search stays in the Venue of the Website being edited]] |
| Organization and Event Branding | [[03 Test Cases/Branding/Branding QA Library#TC-1: Restore the Organization logo on a public Event after clearing its override\|Restore the Organization logo on a public Event after clearing its override]] |
| Access PIN and Box Office | [[03 Test Cases/Access PIN/Access PIN QA Library#TC-1: A replaced Access PIN cannot be used for a new Box Office session\|A replaced Access PIN cannot be used for a new Box Office session]] |
| Discovery link recovery | [[03 Test Cases/Event Discovery/Event Discovery Test Cases#TC-1: Recover a search link with an invalid end date\|Recover a search link with an invalid end date]] |
| Embedded Widget and basket | [[03 Test Cases/Widget/Widget QA Library#TC-1: Keep the loaded Event list and basket when returning from checkout\|Keep the loaded Event list and basket when returning from checkout]] |

## Feature Index

- **Abandoned Carts**
  - [[03 Test Cases/Abandoned Carts/legacy-abandoned-carts-qase-test-cases|Legacy Abandoned Carts — Suite 102 Review]]
- **Access PIN**
  - [[03 Test Cases/Access PIN/Access PIN QA Library|Setup, cases and related features]]
- **Admin Actions**
  - [[03 Test Cases/Admin Actions/admin-actions-test-cases|Admin Actions Qase Test Cases]]
- **Advertising**
  - [[03 Test Cases/Advertising/Advertising QA Library|Setup, cases and related features]]
- **AI Chat**
  - [[03 Test Cases/AI Chat/AI Chat QA Library|Setup, cases and related features]]
- **Analytics**
  - [[03 Test Cases/Analytics/analytics-qase-test-cases|Analytics Qase cases]] · [[03 Test Cases/Analytics/safari-ga4-widget-2026-11-10|Safari widget QA]]
- **Assigned Seating**
  - [[03 Test Cases/Assigned Seating/SPD-2635-full-table-partial-removal-qase-case|Full-table partial removal]]
- **Authentication**
  - [[03 Test Cases/Authentication/login-test|Login Entry Point Test Cases]]
- **Basket**
  - [[03 Test Cases/Basket/Basket QA Library|Setup, cases and related features]]
- **Box Office**
  - [[03 Test Cases/Box Office/Box Office Test Cases|Sell, Transactions, Holds, customer selection and staff operations]]
- **Branding**
  - [[03 Test Cases/Branding/Branding QA Library|Setup, cases and related features]]
- **Calendar**
  - [[03 Test Cases/Calendar/SPW-20023 Missing Calendar Tag Edge Cases|Missing calendar tag cases]]
- **Check In**
  - [[03 Test Cases/Check In/check-in-qase-test-cases|Check In cases]] · [[03 Test Cases/Check In/check-in-beta-new-page-smoke-2026-10-22|Beta page smoke]]
- **Check-In**
  - [[03 Test Cases/Check-In/Check-In QA Library|Setup, cases and related features]]
- **Checkout**
  - [[03 Test Cases/Checkout/Checkout Money Movement Test Drafts]]
  - [[03 Test Cases/Checkout/qase-case-3290-free-event-ticket-update|Qase Case 3290 Free Event Ticket Update]]
- **Consent**
  - [[03 Test Cases/Consent/Consent QA Library|Setup, cases and related features]]
- **Custom Questions**
  - [[03 Test Cases/Custom Questions/custom-questions-jira-dev-support-gap-analysis|Custom Questions Jira Dev Support Gap Analysis]]
  - [[03 Test Cases/Custom Questions/custom-questions-qase-gap-analysis|Custom Questions Qase Drafts]]
- **Customer Accounts**
  - [[03 Test Cases/Customer Accounts/Customer Accounts QA Library|Setup, cases and related features]]
- **Customer Network**
  - [[03 Test Cases/Customer Network/Customer Network QA Library|Setup, cases and related features]]
- **Customers**
  - [[03 Test Cases/Customers/Customers QA Library|Setup, cases and related features]]
- **Dashboard**
  - [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis|Dashboard page coverage review]]
- **Digital Wallets**
  - [[03 Test Cases/Digital Wallets/orders-digital-wallet-qase-test-cases|Orders and wallet cases]]
- **Discounts**
  - [[03 Test Cases/Discounts/itemized-partial-apply-to-each-split-test-cases|Itemized Partial APPLY_TO_EACH Split Test Cases]]
  - [[03 Test Cases/Discounts/SPD-2465-bulk-discount-generation-lifecycle-test-cases|SPD-2465 Bulk Discount Generation Lifecycle Test Cases]]
  - [[03 Test Cases/Discounts/BOGO/00 Start Here|BOGO role walkthroughs and coverage]]
- **Employees**
  - [[03 Test Cases/Employees/employees-qa-test-cases|Employee Test Cases]]
- **Event Discovery**
  - [[03 Test Cases/Event Discovery/Event Discovery Test Cases|Homepage, search, calendar and native Explore]]
- **Events**
  - [[03 Test Cases/Events/event-management-qase-test-cases|Events — Page-by-page Test Cases and Gap Analysis]]
- **Exchanges**
  - [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario|Discounted Package exchange scenario]]
  - [[03 Test Cases/Exchanges/cash-other-exchanges|Cash and Other Exchange Qase Test Cases]]
- **Fees**
  - [[03 Test Cases/Fees/Fees QA Library|Setup, cases and related features]]
- **Financials**
  - [[03 Test Cases/Financials/Financials QA Library|Setup, cases and related features]]
- **Gift Cards**
  - [[03 Test Cases/Gift Cards/Gift Card Test Cases|Create, deliver, redeem and adjust a Gift Card]]
- **Group Sales and Transfers**
  - [[03 Test Cases/Group Sales and Transfers/Transfer Group Sales]]
  - [[03 Test Cases/Group Sales and Transfers/spw-21449-required-ticket-transfer-question-test-cases|Required transfer answers]] · [[03 Test Cases/Group Sales and Transfers/Partial Ticket Transfer Pilot - 2026-11-23|Partial transfer pilot]]
- **Holds**
  - [[03 Test Cases/Holds/Holds QA Library|Setup, cases and related features]]
- **Homepage**
  - [[03 Test Cases/Homepage/Homepage QA Library|Setup, cases and related features]]
- **Items**
  - [[03 Test Cases/Items/Items QA Library|Setup, cases and related features]]
- **Marketing**
  - [[03 Test Cases/Marketing/Creator Partnerships - Quick UX Review|Creator Partnerships UX review]]
- **Media Library**
  - [[03 Test Cases/Media Library/Media Library QA Library|Setup, cases and related features]]
- **Memberships**
  - [[03 Test Cases/Memberships/membership-benefit-seating-permissions-test-cases|Membership Benefit Seating Permissions Test Cases]]
  - [[03 Test Cases/Memberships/membership-benefit-seating-permissions-beta-release-run-2026-07-26|Membership Benefit Seating Permissions Beta Release Run]]
  - [[03 Test Cases/Memberships/SPD-2349-qase-case-720-1188-updates|SPD-2349 Qase Case 720 and 1188 Updates]]
  - [[03 Test Cases/Memberships/SPD-2461-manage-membership-renewal-entry-points-qase-case|SPD-2461 Manage Membership Renewal Entry Points Qase Case]]
- **Monetization**
  - [[03 Test Cases/Monetization/manage-dashboard-test-case|Monetization Dashboard case]]
- **Operations**
  - [[03 Test Cases/Operations/Operations QA Library|Setup, cases and related features]]
- **Orders**
  - [[03 Test Cases/Orders/customer-email-language-test-cases|Customer email language cases]]
- **Organizations**
  - [[03 Test Cases/Organizations/organization-settings-qase-test-cases|Organization Settings — Qase-Ready Cases]]
  - [[03 Test Cases/Organizations/organization-registration-qase-gap-analysis|Organization Registration — Qase-Ready Cases]]
- **Packages**
  - [[03 Test Cases/Packages/Packages QA Library|Setup, cases and related features]]
- **Payments**
  - [[03 Test Cases/Payments/square-test-cases|Square Terminal Test Cases]]
- **Payouts**
  - [[03 Test Cases/Payouts/payouts-qase-test-cases|Finance — Payouts Base Cases]]
- **Presale**
  - [[03 Test Cases/Presale/Presale QA Library|Setup, cases and related features]]
- **Printing**
  - [[03 Test Cases/Printing/desktop-app-thermal-receipt-blocking-test-cases|Desktop thermal receipt cases]]
- **Products**
  - [[03 Test Cases/Products/inventory-qase-test-cases|Marketplace Inventory — Qase-Ready Cases]]
- **Queue-It**
  - [[03 Test Cases/Queue-It/Queue-It QA Library|Setup, cases and related features]]
- **Ratings**
  - [[03 Test Cases/Ratings/Ratings QA Library|Setup, cases and related features]]
- **Refunds and Protection**
  - [[03 Test Cases/Refunds and Protection/SPW-19666-customer-self-refunds-test-cases|Customer self-refund cases and Qase coverage]] · [[03 Test Cases/Refunds and Protection/Staff Refunds/00 Staff Refund Permissions - How to Test|Staff Refund permissions]]
- **Reports**
  - [[03 Test Cases/Reports/reports-qase-test-cases|Reports cases and coverage]] · [[03 Test Cases/Reports/reports-beta-smoke-2026-10-21|Beta reports smoke]]
- **Reservations**
  - [[03 Test Cases/Reservations/Reservations QA Library|Setup, cases and related features]]
- **Rewards**
  - [[03 Test Cases/Rewards/Rewards QA Library|Setup, cases and related features]]
- **Seating**
  - [[03 Test Cases/Seating/Seating QA Library|Setup, cases and related features]]
- **Settings**
  - [[03 Test Cases/Settings/Settings QA Library|Setup, cases and related features]]
- **Showire**
  - [[03 Test Cases/Showire/Showire QA Library|Setup, cases and related features]]
- **Streaming**
  - [[03 Test Cases/Streaming/Streaming QA Library|Setup, cases and related features]]
- **Talent**
  - [[03 Test Cases/Talent/Talent QA Library|Setup, cases and related features]]
- **Ticket Claims**
  - [[03 Test Cases/Ticket Claims/Ticket Claims QA Library|Setup, cases and related features]]
- **Ticket Credits**
  - [[03 Test Cases/Ticket Credits/SPD-2383-ticket-credit-flex-pass-per-event-limit|SPD-2383 Ticket Credit Flex Pass Per-Event Limit]]
- **Ticketing**
  - [[03 Test Cases/Ticketing/enable-force-public-sold-out-test-cases|Public Sold Out Switch Manual Test Cases]]
  - [[03 Test Cases/Ticketing/SPD-2607 - Recurring Ticket Wallet Customization|SPD-2607 Recurring Ticket Wallet Customization]]
  - [[03 Test Cases/Ticketing/SPW-19386-hardcopy-ticket-order-page-test-cases|SPW-19386 Hardcopy Ticket Order Page Test Cases]]
  - [[03 Test Cases/Ticketing/SPW-19386-hardcopy-ticket-order-page-browser-run-2026-07-27|SPW-19386 Hardcopy Ticket Order Page Browser Run]]
- **Tracking Links**
  - [[03 Test Cases/Tracking Links/event-scoped-tracking-links-qase-gap-analysis|Event-Scoped Tracking Links Qase Gap Analysis]]
  - [[03 Test Cases/Tracking Links/event-scoped-tracking-links-beta-qa-result|Consolidated Event-Scoped Tracking Links beta results]]
- **Transactions**
  - [[03 Test Cases/Transactions/invoice-breakdown-qase-test-cases|Invoice Breakdown Qase Test Cases]]
  - [[03 Test Cases/Transactions/intellitix-integration-test-cases|Intellitix Integration Test Cases]]
  - [[03 Test Cases/Transactions/SPW-20252-transaction-selection-totals-permission-test-cases|SPW-20252 Transaction Selection Totals Permission Test Cases]]
- **Venues**
  - [[03 Test Cases/Venues/Venues QA Library|Setup, cases and related features]]
- **Waitlists**
  - [[03 Test Cases/Waitlists/Waitlists QA Library|Setup, cases and related features]]
- **Websites**
  - [[03 Test Cases/Websites/Websites QA Library|Setup, cases and related features]]
- **Widget**
  - [[03 Test Cases/Widget/Widget QA Library|Setup, cases and related features]]
- **Widgets**
  - [[03 Test Cases/Widgets/sdk-cloudflare-access-2026-11-15|Widget SDK access check]]
- **Workflows**
  - [[03 Test Cases/Workflows/Workflows QA Library|Setup, cases and related features]]

## Find topics under their owning feature

Use the owning note or saved case when a screen or setup affects another feature. [[01 Repositories/Frontend - showpass-frontend#Feature-Aligned Test Case Folders|Frontend inventory]]

| Topic | Where to start |
| --- | --- |
| Access PIN, Check-In and Holds | Start at [[03 Test Cases/Box Office/Box Office Test Cases\|Box Office]]. Use [SPT-3406](https://app.qase.io/case/SPT-3406) for PIN generation and [[03 Test Cases/Check In/check-in-qase-test-cases\|Check In]] for admission. |
| Advertising and Widget | [[03 Test Cases/Analytics/analytics-qase-test-cases#SPT-4958: Confirmation ad placement and internal analytics\|Confirmation ads]] · [[03 Test Cases/Analytics/analytics-qase-test-cases#SPT-5964: Showpass Google Ads checkout\|Google Ads checkout]] · [[03 Test Cases/Widgets/sdk-cloudflare-access-2026-11-15\|Widget SDK evidence]]. |
| Basket and Items | Start with [[03 Test Cases/Checkout/Checkout Money Movement Test Drafts\|Checkout]] and [SPT-244](https://app.qase.io/case/SPT-244) for cart expiry. Follow the issued item to [[03 Test Cases/Ticketing/SPW-19386-hardcopy-ticket-order-page-test-cases\|Ticketing]] or [[03 Test Cases/Products/inventory-qase-test-cases\|Products]] as applicable. |
| Branding, Settings and Venues | [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Branding → Identity\|Organization Identity]] · [[03 Test Cases/Events/05 Settings/01 Branding\|Event Branding]] · [[03 Test Cases/Organizations/organization-settings-qase-test-cases\|Organization settings]]. |
| Consent, Customer Accounts and Ticket Claims | [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Settings → Checkout Consent\|Consent setup]] · [[03 Test Cases/Authentication/login-test\|Authentication]] · [SPT-2946](https://app.qase.io/case/SPT-2946) for linking a guest order · [SPT-1309](https://app.qase.io/case/SPT-1309) for claiming a Group Sales distribution. |
| Customers and Customer Network | [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis#Dashboard → Customers → Customers → Manage customers → Credits\|Customer credit and hold checks]] · [SPT-3145](https://app.qase.io/case/SPT-3145) for Network navigation. |
| Fees and Financials | [[03 Test Cases/Events/02 Manage/08 Custom fees\|Event custom fees]] · [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Finance → Custom Fees — published Angular cases\|Organization fee cases]] · [[03 Test Cases/Reports/reports-qase-test-cases\|Reports]] · [[03 Test Cases/Payouts/payouts-qase-test-cases\|Payouts]]. |
| Homepage and Presale | [[03 Test Cases/Event Discovery/Event Discovery Test Cases\|Homepage and discovery]] · [SPT-3517](https://app.qase.io/case/SPT-3517) for password-protected calendar purchase. |
| Operations and Reservations | [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis#Dashboard → Operations → Bulk actions → Comp upload\|Operational bulk actions]] · [SPT-3769](https://app.qase.io/case/SPT-3769) and [SPT-3776](https://app.qase.io/case/SPT-3776) for the Widget booking and its approval. |
| Packages and Seating | [[03 Test Cases/Events/03 Promote/03 Packages\|Package setup and checkout]] · [[03 Test Cases/Events/02 Manage/04 Seating\|Seating editor cases]] · [[03 Test Cases/Assigned Seating/SPD-2635-full-table-partial-removal-qase-case\|Full-table removal]]. |
| Queue-it and Websites | [[#Saved Qase cases to start with\|Waiting-room and checkout references]] · [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Integrations → Domains\|Domain settings]]. |
| Ratings, Showire and Workflows | [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis#Dashboard → Customers → Feedback → Ratings\|Ratings cases]] · [SPT-1762](https://app.qase.io/case/SPT-1762) for Showire access and [SPT-1765](https://app.qase.io/case/SPT-1765) for a request · [SPT-4702](https://app.qase.io/case/SPT-4702) and [SPT-4706](https://app.qase.io/case/SPT-4706) for Event approval and publish. |
| Streaming and Waitlists | [[03 Test Cases/Events/05 Settings/04 Live stream\|Live stream setup]] · [[03 Test Cases/Events/04 Operations/04 Waitlists\|Event Waitlists]] · [[#Saved Qase cases to start with\|Waitlist allocation, expiry and report cases]]. |

The [[03 Test Cases/AI Chat/AI Chat QA Library|AI Chat]] and [[03 Test Cases/Media Library/Media Library QA Library|Media Library]] notes describe their own setup and source. Use the exact case or recorded gap in those folders when a scenario depends on either feature.

## Reusable Scaffold

- [[03 Test Cases/Test Case Template]]

## Dashboard UI Organization

For Dashboard `/manage/` coverage, organize by what employees see: **navigation section → visible menu group, when present → destination page → actual tab/subpage**. Keep groups even when they contain one destination; omit levels that do not exist. Use the current UI labels and order, verified against frontend navigation definitions and an already-open relevant browser when available.

- The screen that owns the tested behavior determines its group. Setup screens, purchase channels, backend model names and URL segments do not determine placement.
- Group cases, gap rows and minimum execution selections consistently inside the canonical feature note. Keep one cross-screen journey at its owning page and reference other touchpoints; do not duplicate it across groups.
- Add a compact mapping when several pages or suite choices are involved: `Visible navigation | Current route/source | Owning feature folder / case group | Existing or proposed Qase suite`. Routes are evidence, not manual navigation steps unless the route itself is tested.
- Reuse existing feature folders and active notes. For new or explicitly reorganized Dashboard work, nested folders may mirror verified navigation using displayed labels. Keep one note for a single request; use headings for its pages rather than creating parallel drafts. Do not move existing notes as a side effect of generation or gap analysis.
- Suggest Qase suite placement using the same visible hierarchy, but preserve actual suite names/IDs in the coverage baseline. Mark proposed placement when the tree has not been read; never invent suite IDs. Creating/moving suites or cases requires separate authorized scope.
- UI organization does not change platform scope. Browser layout does not prove native app/hardware behavior, and shared implementation alone does not make a case cross-platform. Parameterize equivalent scenarios instead of duplicating them by page or client.

This adapts the Playwright repository's [Dashboard folder guidance](../../showpass-playwright/docs/playwright-handbook/foundations/project-structure.md#dashboard-tests-follow-the-menu) to vault notes. Automation uses its own repository folder conventions. Verify current navigation and record conflicts rather than guessing from a legacy route or folder name.

## Filing Rules

- File a note under the feature that owns the primary user behavior or business invariant.
- Keep test cases, Qase work, gap analyses, and execution evidence for the same feature in that feature folder.
- Use an existing feature folder when one fits. Create a new direct child folder only for a distinct product feature; apply Dashboard UI Organization to case grouping and any new or explicitly reorganized nested navigation folders.
- Preserve filenames when moving notes so basename-only Obsidian links remain stable.
- Keep reusable templates at the `03 Test Cases/` root.
- Keep the feature's own folder and populate it with the applicable local cases, saved Qase references and source-backed setup. When a case lives with another feature, link the exact case and explain the shared record or handoff. Record an actual gap in the owning note.
- When an older note points to a consolidated case or run, index the canonical destination. Keep links to useful historical evidence with the owning note.
- Update the index when a feature gains a useful case or when its owning screen or case note changes.
