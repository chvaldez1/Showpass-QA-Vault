---
title: Fan Expo Refunds - Acceptance Criteria and Test Map
jira: SPW-19495
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/acceptance-criteria
  - refunds
---

# Fan Expo Refunds — acceptance criteria and test map

Start with [[SPW-19666-customer-self-refunds-test-cases|the test order and setup map]]. **Organization** is the business selected in Dashboard; backend and Jira often call it a **venue**. A **customer return** starts in Account → My Orders. An **employee refund** starts in Dashboard → Transactions. They have different controls.

This page translates every acceptance criterion in [SPW-19326](https://showpass.atlassian.net/browse/SPW-19326) and [SPW-19667](https://showpass.atlassian.net/browse/SPW-19667)–[SPW-19671](https://showpass.atlassian.net/browse/SPW-19671) into an observable check. [SPW-19495](https://showpass.atlassian.net/browse/SPW-19495) and [SPW-19666](https://showpass.atlassian.net/browse/SPW-19666) organize that work but have no separate acceptance-criteria list. No item below has been executed. A checked box is **not** implied by code presence or Jira status.

## How to use this page

1. Follow [[00 Organizer and Venue - How to Test|Organizer and Venue setup]] to select an organization, prepare its policy and ticket settings, and record original values.
2. Follow [[00 Customer - How to Test|Customer setup]] to create **new** paid orders and check My Orders. Use separate orders for each completed refund.
3. Follow [[00 Staff Refund Permissions - How to Test|Staff refund setup]] for the separate employee-permission work.
4. Mark each criterion **Pass**, **Fail**, **Blocked**, **Deferred**, or **Not applicable** in an execution record. A form save proves configuration only; a completed return needs fresh order, ticket, money, and reporting evidence.

## SPW-19667 — Organization policy and item switches

Run [[SPW-19667-customer-refund-policy-test-cases|the Organizer/Venue cases]]. The first two items are configuration checks; the remaining items need the customer checks named below.

| ID | Acceptance criterion in plain language | Where to prove it |
| --- | --- | --- |
| P1 | An authorized employee can open, change, save, and reopen the selected organization's Customer refunds settings. | 19667 TC-1–TC-4, TC-7, TC-10 |
| P2 | Customer refunds can be switched on/off separately for a ticket type and a product/add-on. | 19667 TC-5, TC-10; 19668 TC-1 |
| P3 | Turning an item's switch on can make a previously blocked purchase returnable without a code change. | 19668 TC-1 |
| P4 | Changing the organization policy can block a previously returnable purchase without a code change. | 19668 TC-2–TC-3 |
| P5 | Saved organization choices determine what happens after shipping/fulfillment, barcode delivery, and check-in/scan. | 19667 TC-4 saves; 19668 TC-6 checks the customer result. Released delayed barcodes also need 19670. |
| P6 | The system can explain that both the organization policy and the item's switch affected the result. | 19668 TC-1–TC-2; record the visible message and backend reason if customer copy is generic. Do not claim a specific explanation is visible until observed. |

## SPW-19668 — Customer return eligibility

Run [[SPW-19668-customer-refund-eligibility-test-cases|the Customer eligibility cases]]. These cases inspect selection and preview; do not submit a refund unless the case says so.

| ID | Acceptance criterion in plain language | Where to prove it |
| --- | --- | --- |
| E1 | My Orders offers only the return actions permitted by the organization's saved policy and the purchased item's switch. | 19668 TC-1–TC-2 |
| E2 | A mixed order follows the saved rule: eligible items separately, whole remaining order, or blocked when one item cannot be returned. | 19668 TC-4–TC-5; 19671 TC-2 for a completed partial return |
| E3 | The customer gets the right block result for item switch, cutoff, barcode, shipping, scan, ownership, payment, and order status. | 19668 TC-1–TC-3, TC-6, TC-8; payment/order-status combinations need backend coverage and a controlled order. |
| E4 | Calling the customer return API directly cannot bypass the same rules shown in My Orders. | Backend/API automated coverage; manual cases prove visible paths only. |
| E5 | An organization outside the new rollout continues its existing automated-return behavior. | 19668 TC-7, plus a control organization not included in the rollout flag. |

## SPW-19669 — Shipping and fee refund amounts

Run [[SPW-19669-customer-refund-amount-rules-test-cases|the amount-rule cases]] with a newly purchased, compatible ticket order. The current form offers **Never refund shipping**, **Refund after all shipped items sharing the charge are refunded**, **Refund shipping proportionally**, and **Refund shipping for unshipped items only**. It offers **Showpass fee** and **Payment processing fee** as selectable customer-paid fee classes. Jira's proposed **require approval for shipping refund** choice is not in the current form/model; record it as **Not applicable to this implementation / scope decision needed**, not a test failure.

| ID | Acceptance criterion in plain language | Where to prove it |
| --- | --- | --- |
| A1 | The amount shown before confirmation equals the completed refund or credit. | 19669 amount cases; 19671 TC-1 |
| A2 | Returning one item from a mixed order does not return the entire order's shipping charge. | 19669 TC-2 covers sequential ticket returns. A ticket-plus-product amount run remains blocked by the current ticket-only amount contract. |
| A3 | Fees left unselected in the policy stay out of the customer refund. | 19669 fee scenario; compare original fee lines to preview and result. |
| A4 | Changing the saved shipping rule changes the shipping fee/tax result on a compatible **new** order, without a code change. | 19669 shipping-rule matrix; do not reuse an older purchase to prove this. |
| A5 | Finance evidence identifies returned item value, item tax, shipping, shipping tax, and fee components. | 19669 financial-evidence check; access to component-level records/report is required. |

## SPW-19670 — Delayed-barcode customer returns

Run [[SPW-19670-delayed-barcode-self-refund-test-cases|the delayed-barcode cases]]. The ordinary Venue field **Allow delayed barcode automated returns** starts off. Current source also requires the shared `enable_venue_policy_customer_self_refunds` rollout flag for a **released** delayed barcode; this is a source-vs-Jira difference to record. The Jira card explicitly says no *separate* delayed-barcode waffle flag.

| ID | Acceptance criterion in plain language | Where to prove it |
| --- | --- | --- |
| D1 | An eligible delayed-delivery ticket can be returned before its barcode is released. | 19670 unreleased baseline. |
| D2 | With Allow delayed barcode automated returns off, release of the barcode blocks the customer return. | 19670 off/released. |
| D3 | With Automated returns and Allow delayed barcode automated returns on, an eligible released-barcode ticket can be previewed and returned. | 19670 on/released, fresh paid order. |
| D4 | The same eligible delayed-delivery type remains returnable after its barcode is present. | 19670 before/after release comparison on separate tickets. |
| D5 | A customer-activation ticket remains blocked after the customer activates it. | 19670 activation control. |
| D6 | Checked-in/scanned, refunded, voided, and other non-paid tickets cannot be returned. | 19670 negative-state matrix; separate tickets or backend tests. |
| D7 | The existing automated-return deadline still blocks a return inside that window. | 19670 cutoff control. |
| D8 | Automated returns off still blocks customer returns. | 19670 configuration control. |
| D9 | Automated returns on but the delayed-barcode setting off still blocks a released barcode. | Same off/released control as D2. |
| D10 | Preview and final submission apply the same eligibility decision. | 19670 success and stale-state checks; backend/API tests. |
| D11 | The amount comes from the saved purchase, not a new estimate. | 19670 receipt → preview → final comparison. |
| D12 | The return creates no cash, credit, fees, taxes, or shipping value the customer was never charged. | 19670 financial comparison; backend amount tests. |
| D13 | These customer settings do not change employee refund tools or permissions. | 19667 TC-12 and staff control. |

## SPW-19671 — Selected-organization acceptance

Run [[SPW-19671-customer-self-refund-acceptance-test-cases|the Customer completion cases]] after the relevant setup and amount scenarios. The Jira card includes some expected outcomes that need separate financial/admission evidence; a success message alone is insufficient.

| ID | Acceptance criterion in plain language | Where to prove it |
| --- | --- | --- |
| F1 | Only explicitly selected organizations use the new policy. | Rollout flag on for the selected organization, off for a control organization; 19668 TC-7. |
| F2 | The buyer can finish one clean, eligible return. | 19671 TC-1. |
| F3 | Each blocked scenario is blocked for the configured reason, with no refund. | 19668 cases and 19671 TC-3–TC-4; record actual copy/reason. |
| F4 | Final refund totals follow the saved shipping and fee rules. | 19669 amount matrix plus completed 19671 return. |
| F5 | After success, the selected ticket/barcode, inventory where applicable, and payment/credit record have the correct final state. | 19671 TC-1–TC-2, plus independent admission/inventory/financial evidence. |
| F6 | The representative matrix below is signed off with actual evidence, or each unavailable row has a named blocker. | Rows M1–M9 below. |

| Matrix ID | Representative order/state | Primary check |
| --- | --- | --- |
| M1 | Refund-enabled item before cutoff | 19671 TC-1 clean success |
| M2 | Purchased item switch off | 19668 TC-1 blocked state |
| M3 | Barcode delivered but policy permits it | 19668 TC-6; 19670 for delayed release |
| M4 | Shipped item under the selected rule | 19668 TC-6 and 19669 shipping amount |
| M5 | Checked-in/scanned ticket under the selected rule | 19668 TC-6; record ticket validity after any allowed return |
| M6 | One returnable and one blocked item in one order | 19668 TC-4–TC-5; 19671 TC-2 |
| M7 | Partial return with shipping and fees | 19669 partial amount scenario |
| M8 | Return after cutoff | 19668 TC-3 or 19671 TC-3 |
| M9 | Return the same item twice | 19671 TC-4 |

The card also asks for payment-provider failure and a changed item after page load. A changed eligibility result is covered by 19671 TC-3; provider failure requires a controlled test payment/refund setup and remains **Blocked for manual execution until that setup is supplied**. The card's request-for-approval outcome is conditional; the current policy has only **automatic** and **blocked**, so it is **Not applicable** unless scope changes. The card does not require retroactive migration of already sold orders.

## Coverage accounting before execution

| Criteria | Current classification | Evidence still needed |
| --- | --- | --- |
| P1–P5, E1–E3, E5, A1–A4, D1–D10, F1–F4, M1–M9, S1–S11, S13–S16, S18 | Manual-only drafts | Run on the deployed build with the stated roles, flags, orders, and final-state checks. Some rows require special shipping or barcode-release setup. |
| P6, E3 blocked-reason copy | Manual-only with product-expectation question | Record the exact customer message and backend reason; Jira's “explain” wording may be stronger than current generic copy. |
| E4, S12, S17 | API/backend verification plus source review | Direct-request enforcement and absence of identity hard-coding cannot be proved from ordinary UI steps alone. |
| A5, D11–D13, F5, S19 | Manual-only plus finance/admission evidence | Compare purchase, preview, final refund/credit, ticket validity, and component records. A success message alone is insufficient. |
| Jira shipping approval choice and conditional request-only outcome | Not applicable to current implementation; scope decision open | Current policy has neither control. |
| Ticket-plus-product amount, provider failure, and post-release delayed barcode without an observable release setup | Blocked for manual execution | Current amount rules support tickets only; a controlled payment failure and a scheduled barcode release are still needed. |

The classifications describe the **test design**, not results. No criteria have been marked Passed. If a scenario cannot be prepared, capture the exact missing setup and leave its status Blocked.

## SPW-19326 — Employee refund-type permissions

Run [[00 Staff Refund Permissions - How to Test|the Staff guide]]. These criteria are separate from customer self-returns. Use a paid order whose refund types would otherwise be valid, and test **both** the older and newer Dashboard refund dialogs.

**Current-source qualification, 2026-10-05:** S1's unconditional five-row expectation differs from the current backend: **Full admin refund** may be omitted based on order fee calculation and master refund privileges. The newer dialog also uses different names from Team → Permissions; the Staff guide now maps them. Its old-page navigation action expired in current source on 2026-08-17. Keep the Jira criteria below intact, but record these differences and the supported legacy entry point before judging those rows. The new Staff base case checks permission denial and **Partial Refund → Custom amount** on the current dialog; it does not claim all five types or both dialogs have been executed.

| ID | Acceptance criterion in plain language | Where to prove it |
| --- | --- | --- |
| S1 | Both Dashboard refund dialogs show all five current refund choices when the refund-type form opens. | Staff guide, both dialogs. |
| S2 | A choice the employee lacks stays visible but disabled, including mouse, keyboard, and a previously selected value. | Staff denied-role run; backend/API regression. |
| S3 | With Manage Transactions but no refund-type permission, all five are disabled when `enable_refund_type_permissions` is on. | Staff zero-permission role. |
| S4 | With only Partial Refund permission, only Partial Refund is selectable when the order allows it. | Staff one-permission matrix. |
| S5 | With only Full Refund permission, only that mapped full-refund choice is selectable when the order allows it. | Staff one-permission matrix. |
| S6 | With only Full Refund + Org. Fees + Commissions permission, only that mapped choice is selectable. | Staff one-permission matrix. |
| S7 | With only Full Refund + Org. Fees + Commissions + Showpass Fees permission, only that mapped choice is selectable. | Staff one-permission matrix. |
| S8 | With only Full Admin Refund permission, only that mapped choice is selectable. | Staff one-permission matrix. |
| S9 | Having all five permissions does not enable a choice that the order, payment, or organization itself disallows. | Staff ineligible-order control. |
| S10 | With the global switch off, current refund choices and submissions behave as before. | Staff rollout-off control. |
| S11 | With the global switch on, visible choices and submissions follow each refund-type permission. | Staff rollout-on matrix. |
| S12 | A direct refund request for a type the employee lacks fails with 403 and makes no refund. | Backend/API automated coverage; manual UI must not submit it. |
| S13 | The dialog never preselects a disabled choice. | Staff denied-role run. |
| S14 | Existing roles that were backfilled keep their previous refund access after rollout. | Role comparison before/after switch; migration evidence. |
| S15 | A new role can hold any subset of the five permissions, but still needs Manage Transactions to refund. | Staff role setup and denied-base-permission control. |
| S16 | Role management lists all five permissions independently. | Staff role editor. |
| S17 | The behavior uses role and order state, not a hard-coded Fan Expo identity. | Selected and control organizations; source review. |
| S18 | Customer self-returns remain unaffected by staff refund-type permission changes. | One customer control order before/after role change. |
| S19 | Permissions change access only; saved refund/exchange amounts and cash/credit, tax, fee, and shipping values remain tied to the original purchase. | Staff refund financial control and backend amount coverage. |

## Source and readiness notes

Read on 2026-10-02: the Jira cards above, backend policy/rollout/eligibility/amount/refund-option code, and frontend Dashboard/My Orders code. Current local source contains the amount-rule controls and delayed-barcode field that earlier notes marked absent. That does **not** confirm migrations or deployed behavior. The manual run needs the actual deployed build, a supported test payment path, an organization-specific rollout decision, and representative paid orders. Source anchors: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/customer_refund_policy.py`, `apps/venues/utils.py`, `apps/financials/services/invoice/customer_return_amounts.py`, `apps/financials/services/invoice/customer_return_eligibility.py`; `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/customer-refunds/` and `packages/core/src/app-contexts/user/features/account/features/my-orders/`.
