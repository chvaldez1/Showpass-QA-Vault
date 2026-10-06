---
title: Event — Sellers
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Sellers

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration coverage

SPT-5079 covers seller assignment, access and persistence. SPT-5132's seller step overlaps it. Verify the selected event, correct organization/employee, ticket selection, sell permissions and limits. This is not the legacy standalone Edit Event entry point: see SPT-5074's correction.

Source: [Sellers page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/sellers/ui/pages/EventTicketSellersPage.web.tsx>).

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-5079](https://app.qase.io/case/SPT-5079) | Create Events (80) | Existing case preserved; migration notes below apply |

### SPT-5079: Dashboard - Edit Sellers - Save event seller access

**Description:**

Checks that employee and affiliate-venue seller access can be changed for one event ticket type without changing another ticket type or another event.

An affiliate venue is another organizer allowed to sell tickets for the event.

| SellerType | Change | What Should Remain Saved |
| --- | --- | --- |
| Employee | Enable one test employee and set a sales limit | Employee is enabled only for the selected ticket type with the saved limit |
| AffiliateVenue | Add one test affiliate venue, choose payment access, and set a sales limit | Affiliate venue is enabled only for the selected ticket type with the saved choices |

Current Angular reference: /dashboard/events/{slug}/manage/#/ticket-sellers. This is reference information only and is not required in the steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer owns a published, non-recurring test event with two ticket types.
* A test employee and a test affiliate venue are not enabled for the first ticket type.
* No live sales depend on the seller access being changed.

**Postconditions:**

* Remove the employee or affiliate access added by this test.
* Reopen Edit Sellers and confirm that the temporary access is gone.

**Tags:** dashboard, events, employee-permissions

**Parameters:**

SellerType: Employee, AffiliateVenue

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the test event, expand Manage, and select Edit Sellers. | Test event | Edit Sellers shows the correct event and both ticket types. |
| Find the first ticket type and enable the seller named for SellerType. | Test employee or test affiliate venue | The seller is enabled for the first ticket type only. |
| Set the seller's sales limit. | 5 tickets | The page shows a five-ticket limit. |
| For AffiliateVenue, choose one supported payment option. | Reversible non-default option | The payment choice saves without changing the event owner's access. |
| Leave Edit Sellers and reopen it. | Same event | The seller, limit, and payment choice are still shown for the first ticket type and not the second. |
| Open Edit Sellers for a different test event. | Second event | The temporary seller access is not applied to the other event. |
| Remove the temporary seller access. | Selected SellerType | The seller returns to its original state after reopening Edit Sellers. |
