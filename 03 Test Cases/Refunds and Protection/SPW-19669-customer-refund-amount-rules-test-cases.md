---
title: Customer Refund Shipping and Fee Amount Rules Test Cases
jira: SPW-19669
status: blocked-source-not-merged
date: 2026-09-24
tags:
  - qa/test-cases
  - refunds
---

# Customer Refund Shipping and Fee Amount Rules Test Cases

> [!important] No Qase-ready manual cases yet
> [SPW-19669](https://showpass.atlassian.net/browse/SPW-19669) calls for new choices about returning shipping charges and customer-paid fees. Those choices and their customer-facing amount breakdown were absent from the checked-out code on 2026-09-24. There are no runnable cases for this card yet. No Qase access, diff, or browser run was performed.

## Testing Intent

We need to prove that a customer sees the correct refund amount before confirmation and receives that amount once, with item, tax, shipping, and fee components reconciling to the organizer's records.

## Jira Intake Summary

The card proposes venue-level shipping choices: never, all shipped items, proportional, unshipped only, and approval required. It proposes fee choices: refund all customer-paid fees, none, or selected classes. It also requires partial refunds not to double-return order-level charges. These are requested behavior, not confirmed current controls.

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/venues/models/venue_management/customer_refund_policy.py`; `apps/financials/models/invoice_management/invoice.py` (`get_return_amounts`, `get_refund_amounts`); `apps/financials/services/invoice/user_invoice_return.py`. The existing return uses saved venue medium/type and the existing invoice/refunder math; the new venue amount-rule fields were absent.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/dashboard/features/organization/settings/customer-refunds/constants/customer-refund-policy-form-fields.ts`; `packages/core/src/app-contexts/user/features/account/features/my-orders/ui/modals/return-order/MyOrdersReturnOrder.web.tsx`. The form has eligibility restrictions but no separate shipping/fee amount selectors; the preview lists existing subtotal, service fees, taxes, and total.

## Source-backed Behavior

The current My Orders preview calls the existing invoice calculation. An enabled venue policy controls eligibility, while existing Venue automated-return medium and refund type still determine destination and refund type. No source-backed venue-level shipping/fee amount selection can be asserted yet.

## State-space / Setup Matrix

| Requested axis | Planned proof | Current status |
| --- | --- | --- |
| Shipping | Never, all items, proportional, unshipped only, approval | Blocked: no control/contract found. |
| Customer-paid fees | All, none, selected classes | Blocked: no venue policy fields found. |
| Order shape | Single item; one item of a mixed order; sequential partial returns | Planned after amount contract lands. |
| Evidence | Preview, completed refund, invoice component records, reports | Existing total preview only; new component breakdown unverified. |

## Recommended Test Data

When the code lands, use distinct new paid orders with two shipped products, an order-level shipping charge/tax, one ticket, and known item-level and order-level fees/discounts. Record the original receipt and all component amounts before any return. Use separate orders for each nonreversible refund.

## Qase-ready Manual Test Cases

None until the card's venue controls, calculation contract, preview labels, and reporting proof are available in source. The current end-to-end amount check using existing rules is in [[SPW-19671-customer-self-refund-acceptance-test-cases]].

## Risk Areas

* A partial refund could return shipping or fee amounts twice if order-level allocation is not tracked.
* Preview and actual payment/credit may disagree, including tax, discounts, or fees.
* Provider and reporting records may disagree even when My Orders shows success.

## Minimum Execution Set

Blocked. When implemented, start with one clean full return, then one-item and sequential partial returns under each materially different shipping/fee rule. Compare preview, customer destination, and component ledger records.

## Suggested Automated Coverage

Use backend calculation and API tests with persisted invoice values, rounding boundaries, sequential partial refunds, no double shipping, no uncharged value, provider failure/retry, and component reporting. Add frontend tests for visible rule-specific preview rows and total agreement.

## Assumptions and Unknowns

* Jira is a proposed contract; no new amount-rule implementation was found in the local checkout. Deployed behavior and unmerged branches were not inspected.
* No approval-request outcome exists in the current venue policy, so the proposed shipping-approval choice cannot be made executable yet.

## Open Questions

1. Which branch or commits contain the amount-rule implementation and migrations?
2. What exact choices, calculations, and customer preview labels were accepted for v1?
3. Which report or ledger surface is the source of truth for component reconciliation?
