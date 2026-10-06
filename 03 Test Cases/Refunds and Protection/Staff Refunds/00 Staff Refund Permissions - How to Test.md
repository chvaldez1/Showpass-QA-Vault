---
title: Staff Refund Types - How to Test
jira: SPW-19326
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/runbook
  - refunds
  - permissions
---

# Staff Refunds — choose who can use each refund type

This is the **employee** side of [SPW-19495](https://showpass.atlassian.net/browse/SPW-19495), tracked by [SPW-19326](https://showpass.atlassian.net/browse/SPW-19326). It is separate from a customer starting **Return order** in My Orders. Use [[SPW-19495-acceptance-criteria|the acceptance map]] for every criterion.

## Set up two roles and one order

1. Have the release owner confirm the global backend switch `enable_refund_type_permissions` is **on** for the permission run. Record the original value; it is a global switch, not a Venue field or customer-refund policy. Check the off state separately only with release-owner coordination.
2. In the selected organization's employee role editor, prepare a role with **Manage Transactions** (`VP_ADMINISTER_TRANSACTIONS`) and none of the five refund-type permissions. Prepare a second role with **Manage Transactions** plus **only one** refund-type permission. The five permissions must be independently selectable in the finance/reporting group. Do not use an all-access role to prove denial.
3. Prepare a new paid transaction eligible for a refund, with known payment type, original item price, taxes, and fees. Keep it unrefunded and unscanned. A refund type can also be disabled by the invoice, payment source, or organization privilege; choose an order where the selected type would otherwise be valid.
4. Use one employee account per role, or change a role and sign in again so effective permissions refresh. Keep a separate account with all five refund-type permissions as a control. Record each employee's actual effective permissions.

The permission names and the newer Refund dialog's labels differ. Use this mapping:

| Permission in Team → Permissions | Choice in the newer Refund dialog | Permission key |
| --- | --- | --- |
| Partial Refund | Custom amount | `VP_ADMINISTER_PARTIAL_REFUNDS` |
| Full Refund | Base refund | `VP_ADMINISTER_FULL_WITHOUT_CHARGES_REFUNDS` |
| Full Refund + Org. Fees + Commissions | Full refund excluding Showpass fees | `VP_ADMINISTER_FULL_WITHOUT_COMPANY_CHARGES_REFUNDS` |
| Full Refund + Org. Fees + Commissions + Showpass Fees (Fees Invoiced) | Full refund (Showpass fees invoiced) | `VP_ADMINISTER_FULL_REFUNDS` |
| Full Admin Refund | Full admin refund | `VP_ADMINISTER_FULL_COMPANY_CHARGES_REFUNDS` |

**Source correction, 2026-10-05:** the current backend can omit **Full admin refund** for an order using added fees or an employee/organization without master refund privileges. Do not require five visible rows for every order. Jira's unconditional five-row criterion remains a product/source discrepancy to resolve. The newer frontend removes its **Revert to old transactions page** action after 2026-08-17; the older dialog needs a separately supported deployed entry point. Its absence is not a failed permission check.

## Run the permission matrix

Open **Dashboard → Transactions**, find the prepared order, and select **Refund**. Run in both the older and newer Dashboard refund dialogs if both are available on the deployed build. Do not submit a refund while checking visibility/disabled states; close the dialog after each role run.

| Employee role | Expected refund-type list |
| --- | --- |
| Manage Transactions; no type permission | The choices supported for display on this order stay visible and disabled. No disabled row can be selected by mouse or keyboard. |
| Manage Transactions; only one type permission | Only the matching choice may be selectable **if the order also permits it**. Repeat for each permission using an order that supports its choice. |
| Manage Transactions; all five type permissions | Any choice invalid for this particular order remains unavailable. Having a permission does not expose an otherwise unsupported Full admin refund. |
| Type permission but **without** Manage Transactions | Cannot access the employee refund action. |
| An existing transaction/financial role that received the rollout backfill | Keeps its prior refund-type access. |

On every run, check that a disabled row is not chosen by default, cannot be selected after switching roles or orders, and gives a clear reason where the UI exposes one. A type-specific permission never overrides a payment, invoice, venue privilege, or refund-in-progress restriction. The backend/API proof is a direct submission of a disallowed type returning **403** with no queued or completed refund; this belongs in automated or controlled API coverage, not a manual click path.

For one **allowed** type, use a separate eligible order and complete exactly one refund. Compare the preview and final transaction/payment or credit record to the original purchase. The permission change must not alter the refund math. Keep a customer self-return control order unchanged while roles are edited.

## Rollback/control

With release-owner coordination, turn `enable_refund_type_permissions` off and repeat the existing-role refund-option check. The per-type permissions should stop narrowing the choices; existing order/payment restrictions still apply. Restore the original global switch state and role permissions. Keep completed financial records.

**Sources reviewed:** [SPW-19326](https://showpass.atlassian.net/browse/SPW-19326); backend `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py`, `apps/financials/services/refunds/refund_type_permissions.py`, `apps/financials/services/refund_options/rules.py`; frontend `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/hooks/useRefundDialog.ts`; legacy refund dialog under backend `apps/main/templates/invoices/dialogs/_refund-dialog.html`. Source reviewed 2026-10-02; no role or switch was changed.

## Qase publication

Published and verified **2026-10-05** after user approval in [Staff Refunds (1109)](https://app.qase.io/project/SPT?suite=1109). Saved fields, parameters, tags, steps, and suite placement matched the local cases. Publication does not mean execution.

| Local draft | Qase case |
| --- | --- |
| TC-1 | [SPT-5317](https://app.qase.io/case/SPT-5317) |

## Qase-ready Manual Test Cases

### TC-1: Dashboard - Refunds - Limit refund choices to the employee's permissions

**Description:** An employee can open a paid order in Transactions. With no refund-type permission they cannot select a refund choice. With only Partial Refund permission they can select Custom amount, while the other displayed choices stay disabled. This case inspects access without submitting a refund.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| PermissionScenario | Employee permissions | Expected choices |
| --- | --- | --- |
| NoRefundTypes | Manage Transactions; none of the five refund-type permissions | All displayed choices disabled; none selected. |
| OnlyPartialRefund | Manage Transactions plus Partial Refund; none of the other four refund-type permissions | Custom amount selectable; other displayed choices disabled. |

**Tags:** dashboard, refunds, employee-permissions

**Parameters:**
PermissionScenario: NoRefundTypes, OnlyPartialRefund

**Preconditions:**

* The employee has the permissions in the selected row and has no other role granting refund access or full administrator access. An employee with **Manage Employees** prepares this in Dashboard → Organization → Team → Permissions and assigns the role under **Employees**. Record original role assignments; sign in again after changing them.
* The global switch `enable_refund_type_permissions` is on. Its release owner confirms the saved state; no customer-refund policy or customer rollout flag is needed.
* Use a paid card transaction with no refund, dispute, transfer, or payment plan. An employee with Manage Transactions and all five refund-type permissions opens that order's **Refund** dialog, verifies **Custom amount** is enabled, records the displayed choices and remaining refundable amount, then closes it without submitting.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the employee for the selected permission row and open Dashboard → Transactions. | Selected organization | Transactions opens. |
| Find the paid order prepared above. | Transaction reference from the purchase receipt | The customer, items, and paid amount match the prepared order. |
| Select Refund. | | The Refund dialog opens. |
| Review the refund choices. | Choices recorded by the control employee | The same choices appear; only those allowed by the selected permission row are selectable. |
| Inspect the currently selected choice. | Selected PermissionScenario row | No disabled choice is selected by default. |
| Attempt to select Base refund with the mouse. | This permission is absent in both rows. | Base refund stays disabled and cannot become selected. |
| Use Tab and the arrow keys to move through the refund choices. | | Keyboard navigation cannot select a disabled choice. |
| Close the Refund dialog without confirming a refund. | | No refund is submitted. |
| Reopen the same order. | Recorded starting refundable amount | The order and remaining refundable amount are unchanged; no refund record was created. |

**Postconditions:**

* Restore the employee's original role assignments. Leave the paid order unrefunded and the global switch in its original state.

## Base coverage and remaining checks

This case is the initial permission check. The full permission matrix, an allowed completed employee refund, the switch-off control, and the older dialog remain in the guide above. Direct-request enforcement needs backend/API coverage. Qase SPT-4757 already checks the base Manage Transactions permission; link it in planning rather than creating that check again.

**Additional source review, 2026-10-05:** `apps/financials/services/refund_options/rules.py` (`_displayable_refund_types`), frontend `RefundDialog/RefundForm.web.tsx`, Organization Team configuration, and `transactions/utils/transactions-cutover.ts`. These are source checks, not live results.
