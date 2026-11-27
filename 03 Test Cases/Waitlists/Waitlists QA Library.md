---
title: Waitlists QA Library
tags:
  - qa/test-cases
---

# Waitlists QA Library

A request, allocation or offer and final completed order are separate states. Inventory can change after someone joins. [[03 Test Cases/Test Cases by Feature|Test library]]

### TC-1: Keep a package request pending when its included product sells out

**Title:** Dashboard - Waitlists - Restore a package request when its included product sells out

**Description:** A Customer joins the waitlist for a sold-out Ticket Package while one included Product unit is still available. Another Customer buys that last unit. Processing the request must leave it Pending without selling or holding an incomplete Package.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

**Venue and test accounts**

* Use an isolated Beta Venue with a configured test Stripe gateway and permission to process this request. The Organizer has **Manage Events**, **Manage Marketplace** and **Administer Transactions**. Use two signed-in test Customers with separate inboxes and empty carts.
* Reuse a published, future general-admission Event and a preset Package which includes one unit of the one-variant Product below. In **Operations → Waitlists → Waitlists**, confirm the Package’s ticket type is listed and the Waitlist is open through the run. Confirm card verification is off and one Customer may request quantity `1`. There are no other subscribers, shared capacity restrictions, assigned seats, holds or concurrent sales.

| Record | Starting state |
| --- | --- |
| Package ticket type | Exactly `1` listed under **Total inventory**, already sold. No actual Package tickets remain. Use a fixture with an existing completed Package purchase consuming this ticket. |
| Included Product | One definite variant that is also available as a standalone Product. In **Build → Products → All products**, open the Product and select **Inventory**. Its variant has **Inventory = 2** and **Sold = 1** after the existing Package sale, so one unit remains. Use the same variant that the Package includes. |

**Starting waitlist request**

* As Customer A, open the Event’s public page and follow its Waitlist action for the Package. Request `1`, keep the included variant, and submit the signup. In Customer A’s Account → **Waitlists**, verify one **Pending** request for the Package. Record the Customer email, Event, ticket type and quantity. Confirm no payment, offer or Package order was created by signup.

**Tags:** dashboard, waitlists, packages

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As Customer B, buy `1` of the included Product variant from its standalone storefront. | Approved test payment. Record the confirmation order reference. | The paid order contains one unit of the named variant. |
| As the Organizer, reopen the Product’s **Inventory** page. | Same variant | **Inventory = 2** and **Sold = 2**, so no units remain. |
| Open **Operations → Waitlists → Waitlists**. On the row for the Package ticket type, record **Total inventory** and **Tickets on hold**, then click the row to open **Subscribers**. | `1` total inventory, `0` on hold, Customer A and quantity `1` | Customer A’s request is **Pending**. |
| Select only Customer A and click **Process Order**. | Customer A and quantity `1` in the dialog | **Process Order** lists one ticket for the selected request. |
| Click **Complete Order** once and immediately watch Customer A’s row in **Subscribers**. | Selected request and submission time | One subscriber is scheduled. The scheduling message confirms submission. |
| Refresh **Subscribers** immediately and then regularly for up to five minutes. | Same Customer A, Package ticket type and quantity `1` | Record **Scheduled** or **In Progress** on that exact row, followed by **Pending**. If the row stays **Pending** throughout or has not returned to **Pending** by five minutes, record the states and times as inconclusive for this recovery check. Submit the request only once. |
| Reopen the Package ticket type row after the request returns to **Pending**. | Same Package ticket type | **Total inventory** returns to `1` and **Tickets on hold** is `0`. |
| Search **Operations → Box Office → Transactions** for Customer A’s email, and check Customer A’s Account → **My Orders** and inbox. | Request and submission time | No new confirmed sale, Package ticket or purchase offer exists for Customer A. |
| Reopen Customer B’s order in **Transactions** and the Product’s **Inventory** page. | Customer B’s order reference and the same variant | The paid variant remains in Customer B’s order. **Inventory = 2** and **Sold = 2** still. |

**Postconditions:** Record the request status sequence and observation times, observed inventory, original Package sale reference and Customer B’s Product order reference. Leave the owned orders and waitlist request isolated for review.

## Proof and sources

**Local draft · Not run.** Compared the complete SPT snapshot (2,492 definitions, 2026-11-26) using Waitlist, Package, Product, inventory and processing terms in titles, setup and steps. [SPT-5266](https://app.qase.io/case/SPT-5266) checks regular bundle checkout with insufficient Product units. [SPT-5757](https://app.qase.io/case/SPT-5757) checks successful Waitlist allocation and purchase. [SPT-2952](https://app.qase.io/case/SPT-2952) starts with a payment failure. [SPT-4280](https://app.qase.io/case/SPT-4280) checks processing a selection with mixed request states. These cases leave the stock-loss-after-signup and Pending recovery sequence untested.

- Backend `b8dcfa8726db` · `apps/tickets/tests/api/user/baskets/test_api_user_based_basket_waitlist_packages.py:91` covers enrollment without consuming stock. `apps/tickets/tests/services/waitlist_processing/test_package_product_stock.py:143` and `:181` cover the missing Product stock before payment or hold. `apps/tickets/services/waitlist/venue_subscriber_actions.py:85` reserves the one-unit shortfall. `apps/tickets/services/waitlist/subscriber_processing/purchase_single_subscriber_on_inventory.py:86` restores Pending and rolls back the allocation.
- Frontend `5867dd39dcde` · `WaitlistedTicketTypesTable.tsx` displays the inventory and held counts. `ProcessWaitlistSubscribers.web.tsx` and `ProcessOrderModal.tsx` expose **Process Order** and **Complete Order**. `waitlist-status-utils.ts:15` identifies the processing and pending badges. [[00 Start Here/Showpass QA Handbook/Playbooks/17 Holds Waitlists and Guestlists#Waitlist join → Inventory available → final Customer result|Waitlist testing guide]]

## Setup and proof

Prepare a known request, exact quantity, applicable payment path and controlled inventory. Match the request to the final order and separately verify expiry, failed eligibility or stock return only for the requested branch.

## Connected features

- [[03 Test Cases/Events/04 Operations/04 Waitlists]]
- [[03 Test Cases/Packages/Packages QA Library]]
- [[03 Test Cases/Reports/reports-qase-test-cases#SPT-917: Waitlist Subscribers Report]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5757](https://app.qase.io/case/SPT-5757) · Core - Inventory - Allocate waitlist inventory and complete purchase while public sales stay closed
- [SPT-2957](https://app.qase.io/case/SPT-2957) · Core - Waitlist - Handle Expired Event Waitlist Offers & Unprocessed Event Resale Baskets
- [SPT-917](https://app.qase.io/case/SPT-917) · Dashboard - Reports - Verify Waitlist Subscribers Report CSV contents
