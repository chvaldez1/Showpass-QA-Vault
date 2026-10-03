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

The five types shown in the product are **Partial Refund**, **Full Refund**, **Full Refund + Org. Fees + Commissions**, **Full Refund + Org. Fees + Commissions + Showpass Fees (Fees Invoiced)**, and **Full Admin Refund**. Their permission keys, in that order, are `VP_ADMINISTER_PARTIAL_REFUNDS`, `VP_ADMINISTER_FULL_WITHOUT_CHARGES_REFUNDS`, `VP_ADMINISTER_FULL_WITHOUT_COMPANY_CHARGES_REFUNDS`, `VP_ADMINISTER_FULL_REFUNDS`, and `VP_ADMINISTER_FULL_COMPANY_CHARGES_REFUNDS`.

## Run the permission matrix

Open **Dashboard → Transactions**, find the prepared order, and select **Refund**. Run in both the older and newer Dashboard refund dialogs if both are available on the deployed build. Do not submit a refund while checking visibility/disabled states; close the dialog after each role run.

| Employee role | Expected refund-type list |
| --- | --- |
| Manage Transactions; no type permission | All five visible and disabled. No disabled row can be selected by mouse or keyboard. |
| Manage Transactions; only one type permission | All five visible; only the matching type may be selectable **if the order also permits it**. Repeat for each of the five permissions. |
| Manage Transactions; all five type permissions | All five visible; any type invalid for this particular order remains disabled. |
| Type permission but **without** Manage Transactions | Cannot access the employee refund action. |
| An existing transaction/financial role that received the rollout backfill | Keeps its prior refund-type access. |

On every run, check that a disabled row is not chosen by default, cannot be selected after switching roles or orders, and gives a clear reason where the UI exposes one. A type-specific permission never overrides a payment, invoice, venue privilege, or refund-in-progress restriction. The backend/API proof is a direct submission of a disallowed type returning **403** with no queued or completed refund; this belongs in automated or controlled API coverage, not a manual click path.

For one **allowed** type, use a separate eligible order and complete exactly one refund. Compare the preview and final transaction/payment or credit record to the original purchase. The permission change must not alter the refund math. Keep a customer self-return control order unchanged while roles are edited.

## Rollback/control

With release-owner coordination, turn `enable_refund_type_permissions` off and repeat the existing-role refund-option check. The per-type permissions should stop narrowing the choices; existing order/payment restrictions still apply. Restore the original global switch state and role permissions. Keep completed financial records.

**Sources reviewed:** [SPW-19326](https://showpass.atlassian.net/browse/SPW-19326); backend `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py`, `apps/financials/services/refunds/refund_type_permissions.py`, `apps/financials/services/refund_options/rules.py`; frontend `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/hooks/useRefundDialog.ts`; legacy refund dialog under backend `apps/main/templates/invoices/dialogs/_refund-dialog.html`. Source reviewed 2026-10-02; no role or switch was changed.
