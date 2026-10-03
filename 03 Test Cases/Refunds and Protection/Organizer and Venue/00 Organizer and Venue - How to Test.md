---
title: Customer Refunds - Organizer and Venue Setup
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/runbook
  - refunds
---

# Organizer and Venue — set up customer refunds

Use this page **before** [[00 Customer - How to Test|the customer checks]]. An **organization** in Dashboard is the **venue** in Showpass Admin. The organization policy is one saved record for that business. Each ticket type and product has a separate **Allow customer-initiated refunds** switch. An employee refund in Transactions is a different workflow.

## 1. Check the exact gates

| Check | Who/where | Required state for a venue-policy customer return |
| --- | --- | --- |
| Rollout flag | Showpass Admin → Feature Flags; search `enable_venue_policy_customer_self_refunds` | Active for the selected organization. Target the organization, not a customer or employee. Keep a second organization outside the rollout for the control check. Record the original targeting. |
| Organization policy record | Showpass Admin → Venues → Venue customer refund policies | One record linked to the selected organization. Search by name/slug; reuse it, or **Add** → select that organization in **Venue** → **Save**. This is a separate record from Admin → Venue. |
| Policy editor | Venue Employee with **Manage Organization Info** (`VP_MANAGE_VENUE_INFO`) | Can open Dashboard → Organization → Organization settings → Customer refunds and save. A second employee without that permission is needed for the permission check. |
| Ticket editor | Venue Employee with **Manage Events** | Can edit an event's ticket type → **Basic info** → **Allow customer-initiated refunds**. |
| Product editor | Venue Employee with **Manage Marketplace**, organization with product access | Can edit a product → **Fulfillment** → **Allow customer-initiated refunds**. Make it an event checkout add-on if the customer must buy it with a ticket. |

The rollout flag controls the policy API and the Customer refunds entry. **Enable customer refund policy** is a saved policy switch, not that flag. **Allow customer-initiated refunds** is the item switch. None of these grants an employee refund permission. Do not add `use_manage_page` as a prerequisite for this feature.

For a selected-organization rollout, the flag administrator opens **Feature Flags**, searches `enable_venue_policy_customer_self_refunds`, and records its current values. With **Everyone = Unknown**, add the selected organization's ID (found on its Admin Venue record) to **Included venue ids**, keep it out of **Excluded venue ids**, save, and refresh Dashboard. **Everyone = No** or an exclusion overrides inclusion; a global rollout setting belongs to the release owner. No fixed organization ID is part of this guide.

If the policy record is missing, create it in **Venue customer refund policies**; do not create a new Venue. If the policy form is absent after the rollout flag is active, check the selected organization, employee permission, and deployed version. A saved Admin checkbox alone does not prove the customer UI is available.

## 2. Save a simple baseline

In Dashboard → Organization → Organization settings → Customer refunds, record the original values. For the first customer return, save:

| Visible field | Baseline value | Why |
| --- | --- | --- |
| Enable customer refund policy | On | Use the new venue policy. |
| Customer outcome | Customers can self-refund automatically | Permit a completed customer return. |
| Cutoff type | No cutoff | Remove timing from the first success check. |
| After barcode delivery | Block customer refunds | Start with an unactivated/unreleased ticket. |
| After fulfillment or shipping | Block customer refunds | Start with an unfulfilled ticket. |
| After check-in or scan | Block customer refunds | Start with an unscanned ticket. |
| Orders with mixed eligibility | Refund eligible items independently | Allow a one-item partial return. |
| Enable configurable refund amounts | Off for the first basic return | Check the basic flow before trying the new amount rules. |

Save, reload, and verify each selected value. For the organization-form cases, use [[SPW-19667-customer-refund-policy-test-cases|SPW-19667]], starting with TC-1 (fields and save), then cutoff/validation, item switches, permission, French, and the older Organization Info entry. The page now also contains **Refund amounts**: **Enable configurable refund amounts**; when on, **Shipping refund rule** and **Refundable customer-paid fees** appear. Test those under [[SPW-19669-customer-refund-amount-rules-test-cases|SPW-19669]].

## 3. Prepare a sellable item

1. As the permitted employee, select the same organization in Dashboard.
2. Open **Build → Events → All events**, choose a future event with an open sale window, and edit a paid ticket type. In **Basic info**, turn **Allow customer-initiated refunds** on and save. Keep a second paid ticket type off for the blocked/mixed-order checks. Record both names and prices.
3. If checking products, open **Build → Products → All products**, select a paid product, and set its **Fulfillment → Allow customer-initiated refunds** switch. Link that product to the event's checkout add-ons so a customer can buy it. Record its delivery/fulfillment state.
4. Reopen the edited ticket/product. The switch must retain the saved value. A ticket or product switch can stay saved while the organization policy is off; the form should explain that it will take effect when the policy is enabled.

Use an event and products whose settings you are authorized to change and whose sales can be kept separate from real customers. For amount and delayed-barcode runs, purchase **new** orders after the desired configuration is saved. Record original settings; restore only the settings you changed after execution. Keep completed financial transactions as evidence.

## 4. Set up special scenarios only when you reach them

| Scenario | Exact additional setup | Then follow |
| --- | --- | --- |
| Different cutoff shapes | Change **Cutoff type** to each of: No cutoff, Absolute date and time, Before event start, Before item or session start, Manually closed. Relative types need a positive number and Hours/Days; absolute needs date/time. | 19667 TC-2–TC-3; 19668 TC-3 for customer effect. |
| Mixed order | Save each **Orders with mixed eligibility** choice; buy one on-switch and one off-switch ticket in one order. | 19668 TC-4–TC-5; 19671 TC-2. |
| Shipping/fee amounts | Turn **Enable configurable refund amounts** on; choose **Shipping refund rule** and the fee classes to return. Buy a **new**, compatible ticket order with a recorded receipt, shipping/fee values, and refundable card or credit destination. | 19669 runbook/cases. Existing purchases can use the older calculation. |
| Delayed barcode | In **Admin → Venue**, set **Enable automated returns** on and **Allow delayed barcode automated returns** on/off as the case requires; record the existing cutoff, medium, and refund type. The event's ticket delivery must be delayed. | 19670 cases. This is a Venue field, not the separate policy record. |
| Staff refund types | Use a role with **Manage Transactions** and selected refund-type permissions; release owner controls the global `enable_refund_type_permissions` switch. | [[00 Staff Refund Permissions - How to Test|Staff guide]]. |

**Source-backed limit:** configurable amount calculation currently supports ticket returns on compatible new purchases. With that option on, a product/add-on may be blocked from the customer return even if its item switch is on. Do not use a product to prove amount-rule success. Jira's proposed shipping **approval required** option is absent from current policy choices.

## Finish and evidence

For each scenario, record the selected organization, deployed build, flag state, policy values, employee role, event/ticket/product, purchase reference, and the exact visible result. Configuration success requires saved values after reload; customer success requires [[00 Customer - How to Test|the full order and money checks]]. Restore original policy, item, rollout, and Venue settings through their owners. Leave paid/refunded orders intact.

**Sources reviewed:** [SPW-19667](https://showpass.atlassian.net/browse/SPW-19667), [SPW-19669](https://showpass.atlassian.net/browse/SPW-19669), [SPW-19670](https://showpass.atlassian.net/browse/SPW-19670); backend `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/utils.py`, `apps/venues/api/venue_based/viewsets/refunds.py`, `apps/venues/models/venue_management/customer_refund_policy.py`, `apps/venues/models/venue_management/venue.py`; frontend `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/customer-refunds/` and ticket/product editors. Source reviewed 2026-10-02; no live setup was changed.
