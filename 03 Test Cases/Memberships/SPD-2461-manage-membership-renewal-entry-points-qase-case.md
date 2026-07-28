---
title: SPD-2461 Manage Membership Renewal Entry Points Qase Case
tags:
  - qa/qase
  - qa/memberships
  - qa/regression
---

# SPD-2461 Manage Membership Renewal Entry Points Qase Case

Related Jira:

- [SPD-2461 - Membership Renewal by Box Office not populating member's seats](https://showpass.atlassian.net/browse/SPD-2461)
- [SPW-18428 - Seat map should open instantly in Box Office after adding customer](https://showpass.atlassian.net/browse/SPW-18428)

Vault guides:

- [[01 Repositories/Frontend - showpass-frontend]]
- [[05 Tooling/qasectl]]
- [[05 Tooling/Qase Test Case Writing Rules]]

## Testing Intent

We are testing whether a Box Office employee can renew an assigned-seating membership from every state-distinct `/manage/` customer entry path while the member's assigned seat remains available to that member.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Fulfillment/access and inventory/ownership |
| Business invariant | A seat reserved for an active member remains available to that member during renewal. |
| User or business impact | A Box Office employee cannot complete the customer's in-person membership renewal. |
| Failure mode | The renewal seat map omits the member's seat or shows it as unavailable. |
| Observable proof | The seat map loads the assigned seat, allows the employee to keep or change it, and completes one correct renewal order. |
| Primary surfaces | Box Office Sell, Box Office Checkout, and Customer Network |
| Out of scope | Membership configuration, non-seating renewal, and public seat blocking for other buyers |
| Confidence | High |

## Jira Intake Summary

SPD-2461 reports that Box Office renewal did not populate the member's seats and then showed those seats as unavailable even though they remained assigned to that member. SPW-18428 identifies a related difference between adding the customer first and renewing while the customer information modal remains open.

## Sources Reviewed

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/basket/components/Basket.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/customers/components/CustomerInfo/modals/CustomerInfoModal/CustomerInfoModal.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/customers/components/CustomerInfo/modals/hooks/useCustomerInfoModal.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/customers/components/CustomerInfo/CustomerInfoTabs/CustomerInfoTabs.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/customers/hooks/useCustomerMembershipsDeepLink.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/memberships/components/MembershipRenewalModal/MembershipRenewalModal.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_serializer_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_renewal_service.py`

## Source-Backed Behavior

- Adding an existing customer closes the search modal, attaches the customer to the basket, and exposes **View profile** from the selected-customer card.
- **View info** opens the same customer profile without first attaching the customer and keeps the customer modal open.
- **Renew in Box Office** from Customer Network redirects to Box Office Sell, selects the customer, and automatically opens the matching renewal modal.
- The checkout basket exposes the customer modal while existing items remain in the basket.
- All four paths converge on the shared membership renewal modal with different customer, modal, persistence, or basket state.
- Renewal item groups expose the renewing member's original seat or location, and **Edit selection** opens the assigned-seating editor.

## Coverage Decision

Create a separate `/manage/` regression case. These entry points reach the same renewal modal with different customer and basket state:

- The customer is added to the basket before the profile is reopened.
- The customer profile remains open without first adding the customer.
- Customer Network hands the customer and membership group to Box Office.
- Renewal starts from the checkout customer modal with existing basket items.

The entry-point choice is one Qase single parameter. Platform and View remain execution context in the Description.

Qase search reviewed 1,564 cases. SPT-1196 already covers broad cross-platform seating renewal, but it does not isolate these state-distinct `/manage/` customer paths. A separate focused case avoids overloading that broader case.

## Proposed Qase Case

TC-1: Box Office - Membership Renewals - Verify assigned seats across customer entry points

**Description:** Verify that a Box Office employee can renew an assigned-seating membership from every customer entry point available under `/manage/`. The renewal must load the correct customer, member, membership level, and assigned seat regardless of whether the customer was added to the basket first, viewed without being added, handed off from Customer Network, or opened during checkout. This protects against a member's seats being omitted or shown as unavailable during renewal.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

Execute the selected ManageRenewalEntryPoint as follows:

| ManageRenewalEntryPoint | Entry path | Starting state |
| --- | --- | --- |
| AddCustomerThenViewProfile | From `/manage/box-office/sell`, select **Search customer** → **Add Customer**. After the modal closes, select **View profile** → **Memberships**. | The customer is attached to an empty basket before the profile is reopened. |
| ViewInfoWithoutAddingCustomer | From `/manage/box-office/sell`, select **Search customer** → **View info** → **Memberships** without selecting **Add Customer**. | The customer is not attached first and the customer modal remains open. |
| CustomerNetworkHandoff | From `/manage/network/customers/{customer id}/memberships`, select **Renew in Box Office**. | Box Office Sell selects the customer and automatically opens the matching renewal modal. |
| CheckoutCustomerModal | Prepare one regular basket item, continue to `/manage/box-office/checkout`, then select **Add customer** → **Existing customer** → **View info** → **Memberships**. | The customer is viewed from the checkout modal while the regular item remains in the basket. |

**Preconditions:**

* Memberships and the new customer information modal are enabled for the venue.
* The Box Office employee can use Box Office, manage customers, and manage memberships.
* A renewable seasonal membership has an assigned-seating benefit and an upcoming season available for renewal.
* An existing customer has an active member within the renewal window, a known membership level, and a known assigned seat in that membership.
* For CheckoutCustomerModal, prepare a basket with one regular item and continue to `/manage/box-office/checkout`.
* For all other ManageRenewalEntryPoint values, start without basket items.
* Record the customer, member, membership level, and assigned seat before starting.

**Postconditions:**

* One renewal order exists for the correct customer and member.
* The renewed member retains the recorded seat unless the employee intentionally chose another eligible seat.
* Any regular item prepared for CheckoutCustomerModal remains in the completed order exactly once.
* No duplicate customer, member, membership, seat, or basket item is created.

**Priority:** High

**Tags:** box-office, memberships, assigned-seating

**Parameters:**
ManageRenewalEntryPoint: AddCustomerThenViewProfile, ViewInfoWithoutAddingCustomer, CustomerNetworkHandoff, CheckoutCustomerModal

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Follow the selected ManageRenewalEntryPoint to the customer's Memberships view. |  | The correct customer's Memberships view opens with the required starting basket state. |
| Review the prepared membership before renewing it. | Recorded member, membership level, and assigned seat | The renewable membership shows the correct member, level, status, and assigned seat. |
| Select **Renew** for the prepared membership group. |  | The renewal modal opens for the correct membership group and lists the eligible member. |
| Select **Edit selection**, keep the prepared member selected, and continue. |  | The assigned-seating map opens immediately for the membership renewal. |
| Review the renewing member's assigned seat on the map. | Recorded assigned seat | The assigned seat is loaded for the member and is not greyed out or unavailable to that member. |
| Keep the assigned seat or select another eligible seat, then continue to the basket. |  | The basket shows the correct customer, member, membership level, and selected seat exactly once; the regular checkout item remains exactly once when applicable. |
| Continue to checkout and complete the order with a supported payment or complimentary path. |  | One order completes for the correct customer with the membership renewal and all intentionally retained basket items. |
| Open the completed order and the customer's renewed membership. |  | The order contains the expected items, and the renewed member has the selected seat in the upcoming season. |

## Parameter Applicability

| ManageRenewalEntryPoint | Supported Platform | Starting Customer State | Starting Basket State |
| --- | --- | --- | --- |
| AddCustomerThenViewProfile | WebBoxOffice, Electron | Added before reopening profile | Empty |
| ViewInfoWithoutAddingCustomer | WebBoxOffice, Electron | Viewed while the search modal remains open | Empty |
| CustomerNetworkHandoff | WebBoxOffice | Selected automatically during the handoff | Empty |
| CheckoutCustomerModal | WebBoxOffice, Electron | Viewed from the checkout customer modal | One regular item |

## Qase Target

- Action: Created
- Suite: 610
- Qase case: [SPT-4986 - Box Office - Membership Renewals - Verify assigned seats across customer entry points](https://app.qase.io/case/SPT-4986)
- Local draft label: TC-1
- Step count: 8

## Suggested Automated Coverage

- Parameterize the four ManageRenewalEntryPoint values in a dashboard Playwright regression.
- For each value, verify the same member and assigned seat reach the renewal seat map.
- Assert one final renewal order and no duplicate customer, member, seat, or retained basket item.
