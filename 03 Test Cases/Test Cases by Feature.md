---
title: Test Cases by Feature
tags:
  - qa/navigation
  - qa/test-cases
aliases:
  - Test Case Index
---

# Test Cases by Feature

Use one feature folder for each test plan, Qase draft, gap analysis, or execution note. Keep related artifacts together and update the existing canonical note for the same request, Jira ticket, feature, or Qase work item.

## Feature Index

- **Admin Actions**
  - [[03 Test Cases/Admin Actions/admin-actions-test-cases|Admin Actions Qase Test Cases]]
- **Authentication**
  - [[03 Test Cases/Authentication/login-test|Login Entry Point Test Cases]]
- **Checkout**
  - [[03 Test Cases/Checkout/Checkout Money Movement Test Drafts]]
  - [[03 Test Cases/Checkout/qase-case-3290-free-event-ticket-update|Qase Case 3290 Free Event Ticket Update]]
- **Custom Questions**
  - [[03 Test Cases/Custom Questions/custom-questions-jira-dev-support-gap-analysis|Custom Questions Jira Dev Support Gap Analysis]]
  - [[03 Test Cases/Custom Questions/custom-questions-qase-gap-analysis|Custom Questions Qase Drafts]]
- **Discounts**
  - [[03 Test Cases/Discounts/itemized-partial-apply-to-each-split-test-cases|Itemized Partial APPLY_TO_EACH Split Test Cases]]
  - [[03 Test Cases/Discounts/SPD-2465-bulk-discount-generation-lifecycle-test-cases|SPD-2465 Bulk Discount Generation Lifecycle Test Cases]]
- **Employees**
  - [[03 Test Cases/Employees/employees-qa-test-cases|Employee Test Cases]]
- **Events**
  - [[03 Test Cases/Events/edit-event-test-cases|Edit Event Test Cases]]
- **Exchanges**
  - [[03 Test Cases/Exchanges/cash-other-exchanges|Cash and Other Exchange Qase Test Cases]]
- **Group Sales and Transfers**
  - [[03 Test Cases/Group Sales and Transfers/Transfer Group Sales]]
- **Memberships**
  - [[03 Test Cases/Memberships/membership-benefit-seating-permissions-test-cases|Membership Benefit Seating Permissions Test Cases]]
  - [[03 Test Cases/Memberships/membership-benefit-seating-permissions-beta-release-run-2026-07-26|Membership Benefit Seating Permissions Beta Release Run]]
  - [[03 Test Cases/Memberships/SPD-2349-qase-case-720-1188-updates|SPD-2349 Qase Case 720 and 1188 Updates]]
  - [[03 Test Cases/Memberships/SPD-2461-manage-membership-renewal-entry-points-qase-case|SPD-2461 Manage Membership Renewal Entry Points Qase Case]]
- **Payments**
  - [[03 Test Cases/Payments/square-test-cases|Square Terminal Test Cases]]
- **Ticket Credits**
  - [[03 Test Cases/Ticket Credits/SPD-2383-ticket-credit-flex-pass-per-event-limit|SPD-2383 Ticket Credit Flex Pass Per-Event Limit]]
- **Ticketing**
  - [[03 Test Cases/Ticketing/SPW-19386-hardcopy-ticket-order-page-test-cases|SPW-19386 Hardcopy Ticket Order Page Test Cases]]
  - [[03 Test Cases/Ticketing/SPW-19386-hardcopy-ticket-order-page-browser-run-2026-07-27|SPW-19386 Hardcopy Ticket Order Page Browser Run]]
- **Transactions**
  - [[03 Test Cases/Transactions/invoice-breakdown-qase-test-cases|Invoice Breakdown Qase Test Cases]]

## Additional Frontend-Aligned Feature Folders

These folders are ready for future notes and are backed by user-facing feature directories documented in [[01 Repositories/Frontend - showpass-frontend]].

| Product area | Available feature folders |
| --- | --- |
| Customer and access | Access PIN; Consent; Customer Accounts; Customer Network; Customers; Ticket Claims |
| Commerce and fulfillment | Abandoned Carts; Basket; Box Office; Gift Cards; Holds; Items; Orders; Packages; Products; Refunds and Protection |
| Events and admission | Assigned Seating; Calendar; Check-In; Event Discovery; Presale; Reservations; Seating; Streaming; Waitlists |
| Organizer and dashboard | Analytics; Branding; Fees; Financials; Media Library; Monetization; Operations; Organizations; Payouts; Reports; Settings; Showire; Venues; Workflows |
| Public experience and integrations | Advertising; AI Chat; Printing; Queue-It; Ratings; Tracking Links; Websites; Widget |

## Reusable Scaffold

- [[03 Test Cases/Test Case Template]]

## Filing Rules

- File a note under the feature that owns the primary user behavior or business invariant.
- Keep test cases, Qase work, gap analyses, and execution evidence for the same feature in that feature folder.
- Use an existing feature folder when one fits. Create a new direct child folder only for a distinct product feature.
- Preserve filenames when moving notes so basename-only Obsidian links remain stable.
- Keep reusable templates at the `03 Test Cases/` root.
- Keep empty feature folders with a hidden `.gitkeep` placeholder, then remove the placeholder when the first test note is added.
- Refresh the folder inventory when `showpass-frontend` adds or removes a user-facing feature directory.
