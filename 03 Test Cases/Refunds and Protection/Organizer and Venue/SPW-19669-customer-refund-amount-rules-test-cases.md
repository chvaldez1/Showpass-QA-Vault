---
title: Customer Refund Shipping and Fee Amount Rules Test Cases
jira: SPW-19669
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/test-cases
  - refunds
---

# Customer Refund Shipping and Fee Amount Rules Test Cases

> [!important] Buy new orders after saving the amount settings
> The amount controls and calculation are now present in local source. Older purchases can use the previous calculation. These cases are unexecuted and have not been sent to Qase. Start with [[00 Organizer and Venue - How to Test]] and [[00 Customer - How to Test]].

## Testing Intent

Prove that the customer receives the previewed amount once and that returned item, tax, shipping, shipping tax, and fee values reconcile to the original purchase and organizer transaction.

## Jira Intake Summary

[SPW-19669](https://showpass.atlassian.net/browse/SPW-19669) requires matching preview and final amount, correct one-item shipping on partial orders, excluded nonrefundable fees, configurable shipping behavior, and component-level finance evidence. The proposed approval-required shipping choice is absent from the current model/form.

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/venues/models/venue_management/customer_refund_policy.py`, `apps/venues/constants/customer_refunds.py`, `apps/venues/api/venue_based/serializers/refunds.py`, `apps/financials/services/invoice/customer_return_amounts.py`, `user_invoice_return.py`, `apps/financials/models/invoice_management/invoice_items.py`.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/dashboard/features/organization/settings/customer-refunds/constants/customer-refund-policy-form-fields.ts` and `packages/core/src/app-contexts/user/features/account/features/my-orders/ui/modals/return-order/MyOrdersReturnOrder.web.tsx`.

## Source-backed Behavior

* The organization must be included in `enable_venue_policy_customer_self_refunds`, with its policy and **Enable configurable refund amounts** on. Compatible new ticket purchases store component values for preview and final return.
* **Shipping refund rule** offers Never, after all items sharing the charge, proportional, and unshipped-only. Shipping already returned cannot be returned again.
* **Refundable customer-paid fees** offers Showpass fee and Payment processing fee. Empty selection excludes both. Existing Venue **Automated return medium** still decides credit versus original payment.
* The new component calculation is ticket-only. An older/non-itemized order may use the older amount path. With amount rules on, a product/add-on can be blocked even if its item switch is on. A changed quote must be reviewed again before confirmation.

## State-space / setup matrix

| Choice | New order needed | Expected shipping/fee result |
| --- | --- | --- |
| Never | Two tickets with one shared nonzero shipping charge | Zero shipping/tax on both one-ticket returns. |
| After all | Separate two-ticket order | First return has zero shipping; final return gets the remaining charge/tax. |
| Proportional | Separate two-ticket order | Each gets a share; sum never exceeds original shipping/tax. |
| Unshipped only | Separate order with recorded shipped state per ticket | Only unshipped units get a shipping share. |
| Fee class empty vs Showpass fee selected | Two separate new orders with a nonzero customer-paid Showpass fee | Fee excluded from first refund, included in second. |

## Recommended Test Data

Use a future paid ticket type with **Allow customer-initiated refunds** on and a controlled buyer account. For shipping, use a supported physical-delivery checkout that charges nonzero shared shipping on two tickets; record receipt item, tax, shipping, shipping tax, and fee amounts. If that ticket-order setup is unavailable, mark shipping execution Blocked instead of substituting a product under ticket-only amount rules. Use distinct new orders for each nonreversible return. Set the Venue's **Automated return medium** to Organizer Credit for a visible balance check, recording its old value first.

## Qase-ready Manual Test Cases

### TC-1: Dashboard - Refunds - Save shipping and fee choices

**Description:** An authorized employee changes Refund amounts settings for the selected organization and sees the same choices after reopening Customer refunds.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds

**Preconditions:**

* The organization is included in `enable_venue_policy_customer_self_refunds`.
* Employee permission: **Manage Organization Info**.
* In Showpass Admin → Venue customer refund policies, search by organization; reuse its record, or **Add** → select the organization in **Venue** → **Save**. Record its original settings.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. | Selected organization | **Refund amounts** shows **Enable configurable refund amounts**. |
| Turn on Enable configurable refund amounts. | | **Shipping refund rule** and **Refundable customer-paid fees** appear. |
| Open Shipping refund rule. | | Never, after all items sharing the charge, proportional, and unshipped-only choices are available. |
| Choose **Refund shipping proportionally** and select **Showpass fee**. | | Both selections appear. |
| Select Save and reload Customer refunds. | | The amount switch and both selections stay saved. |
| Turn the amount switch off, save and reload, then turn it on again. | | The shipping and fee selections remain stored while amount rules are off. |

**Postconditions:**

* Restore the original policy values and save. No customer order is needed.

### TC-2: My Orders - Refunds - Apply shared shipping across two returns

**Description:** A customer returns two eligible tickets from one newly purchased order, one at a time. The shipping and shipping tax returned must follow the rule saved before purchase and never exceed the original charge.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, shipping

**Parameters:** ShippingRule: Never, AfterAll, Proportional, UnshippedOnly

| ShippingRule | Save as | Expected across two returns |
| --- | --- | --- |
| Never | Never refund shipping | Zero shipping/tax in both. |
| AfterAll | Refund after all shipped items sharing the charge are refunded | Zero in first; remaining original shipping/tax in second. |
| Proportional | Refund shipping proportionally | Each gets a share; total is no more than original. |
| UnshippedOnly | Refund shipping for unshipped items only | Only tickets still unshipped get a share. |

**Preconditions:**

* The organization is included in `enable_venue_policy_customer_self_refunds`. Its policy exists. An employee with **Manage Organization Info** saves policy **on**, automatic customer outcome, **No cutoff**, **Refund eligible items independently**, amount rules **on**, and the selected ShippingRule. Record original settings.
* An employee with **Manage Events** turns **Allow customer-initiated refunds** on for a future paid ticket type. In Admin → Venue, an authorized administrator saves **Automated return medium = Organizer Credit** and records the old value.
* After those saves, the buyer purchases **two of that ticket** in one new card-paid order with shared nonzero physical-delivery shipping. Record receipt shipping/tax, item/tax, shipped state, and opening Organizer Credit balance. Keep tickets unscanned.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As buyer, open Account → My Orders → the order → Return order and select one ticket. | First ticket | Preview includes only the shipping/tax allowed by ShippingRule. |
| Complete the return once and reopen Organizer Credits. | First preview | Credit increases once by the preview; the other ticket remains paid. |
| Reopen Return order and select the remaining ticket. | Second ticket | Preview follows ShippingRule without shipping already returned. |
| Complete the second return once and reopen the balance. | Original receipt and both previews | Two credits equal the previews; combined shipping/tax is no more than originally charged. |
| As a permitted employee, open Dashboard → Transactions for this order. | Order reference | Two return records match selected tickets and credit amounts. |

**Postconditions:**

* Preserve purchase and return records. Restore the policy, ticket, and Venue values changed for this case.

### TC-3: My Orders - Refunds - Return only selected customer-paid fees

**Description:** A customer-paid Showpass fee stays out of one new order's refund when no fee class is selected, and is included in another new order's refund when **Showpass fee** was selected before purchase.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, fees

**Preconditions:**

* The organization is included in `enable_venue_policy_customer_self_refunds`; its policy exists. An employee with **Manage Organization Info** saves policy **on**, automatic outcome, **No cutoff**, independent item selection, amount rules **on**, and **Never refund shipping**. Record original values.
* An employee with **Manage Events** enables customer refunds for a future paid ticket type. An authorized administrator sets **Automated return medium = Organizer Credit** and records the old value.
* Checkout charges a nonzero **customer-paid Showpass fee** on the receipt. With **Refundable customer-paid fees** empty, the buyer purchases one new ticket order. The employee then selects **Showpass fee**, saves, and the buyer purchases a second new order. Record both receipts and opening Organizer Credit balance.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As buyer, open Account → My Orders → first order → Return order. | Fee unselected | Preview excludes the fee and shows it as nonrefundable. |
| Complete the first return once and reopen Organizer Credits. | First preview | Credit increases once by the preview; the excluded fee is not added. |
| Open the second order's Return order. | Showpass fee selected before purchase | Preview includes the eligible fee charged on that receipt. |
| Complete the second return once and reopen Organizer Credits. | Second preview | Credit increases once by the preview and never exceeds original charges. |
| As a permitted employee, compare both orders in Dashboard → Transactions. | Receipts and return records | Item, tax, and fee components match previews and credits. |

**Postconditions:**

* Preserve both purchase and return records. Restore the policy, ticket, and Venue settings changed for this case.

## Risk Areas

* Shared shipping or fee value could be returned twice across partial refunds.
* Preview, final customer balance, and financial components may disagree.
* A selected fee class may not have been charged on this order; check its receipt.

## Minimum Execution Set

Run TC-1, TC-2 with Never and AfterAll, and TC-3. Add Proportional and UnshippedOnly on separate new orders. Compare customer balance and transaction components. Mark shipping Blocked if a two-ticket shared-shipping checkout cannot be prepared.

## Suggested Automated Coverage

Backend calculation/API tests: all shipping rules, fee classes, persisted values, rounding, sequential returns, changed quote, old-order fallback, no double refund, and component records. Frontend tests: form choices and preview rows.

## Assumptions and Unknowns

Current local source has the controls and calculation; deployed build, migrations, checkout setup, and finance report access were not verified live. Approval-required shipping and product amount support are outside this implementation.

## Open Questions

1. Which organization and checkout can create a new two-ticket order with shared shipping and a customer-paid Showpass fee?
2. Which product-team-accessible finance view exposes saved item, tax, shipping, shipping-tax, and fee components? If none, use controlled backend/finance evidence.
3. Is approval-required shipping a follow-up or removed from this phase?
