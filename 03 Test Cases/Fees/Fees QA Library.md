---
title: Fees QA Library
tags:
  - qa/test-cases
---

# Fees QA Library

Organizer settings affect which fees and taxes are charged, absorbed, reported or retained during an adjustment. [[03 Test Cases/Test Cases by Feature|Test library]]

### TC-1: Return ticket tax and retain taxed custom fees on a Base refund

**Title:** Dashboard - Transactions - Keep the custom fee and its tax when issuing a Base refund

**Description:** Base refund must return the ticket price and the tax on that ticket price. It leaves the customer-paid custom fee and the tax charged on that fee out of the refund. This check uses an exact amount so a refund that loses ticket tax or returns fee tax cannot pass.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

**Venue and employee**

* Use an isolated Beta Venue in CAD with an approved test Stripe card sale and refund path. The employee has **Administer Transactions** and, if separate refund permissions are enabled, **Full Refund**, the permission for the **Base refund** option.
* Reuse an Event whose effective fee rules match the table. If available to the setup owner, verify the rate card under **Finance → Custom Fees** and the Event’s **Manage → Custom fees**. Confirm that ticket tax and fee tax both apply to this purchase channel and payment method. Do not change a shared Venue rate card for this case.

| Saved rule | Expected amount on a two-ticket order |
| --- | --- |
| One regular Ticket Type at `$10.00` per ticket | `$20.00` ticket price |
| `5%` tax on the ticket price | `$1.00` ticket tax |
| `QA facility fee`, `$2.00` per ticket, customer pays | `$4.00` custom fee |
| `5%` tax applied to `QA facility fee` | `$0.20` fee tax |
| Card checkout, electronic delivery, no discounts, credits, shipping, protection, or other customer-paid amounts | `$25.20` paid |

**Starting order**

* In **Operations → Box Office → Transactions**, locate a completed, refundable test order with two unscanned tickets matching the table. Use a controlled Customer whose only refund during the run will be this one. Record the Customer’s email and the original sale reference. Verify the amounts in the receipt or transaction breakdown before opening Refund.
* The order has no previous refund, exchange or dispute. Record the independently expected **Base refund** of `$21.00` and the remaining `$4.20` charge. If the settings or paid breakdown do not match, record the specific prerequisite that is missing before continuing.

**Tags:** dashboard, fees-and-taxes, refunds

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Operations → Box Office → Transactions**, open the original sale and choose **Refund** from its actions. | Original order reference | **Refund transaction** opens with the correct Event and both eligible tickets. |
| Select the ticket line containing both tickets. In **Refund option** choose **Base refund**, in **Refund destination** choose **Original payment source**, and select **Requested by customer**. | The two-ticket line only | **Refunding now** shows `$21.00`, the `$20.00` ticket price plus `$1.00` tax on that price. |
| Click **Refund**, then choose **Agree & Process Refund** or **Confirm refund** if shown. Record the submission time. | Same sale and `$21.00` preview | One refund attempt starts for the original test card. |
| Refresh the original transaction in **Transactions** for up to five minutes. | Original sale reference | **Amount refunded** shows `$21.00` and both original tickets show **Refunded**. If completion is still pending at five minutes, record the last state as inconclusive and stop. Submit the refund only once. |
| Return to **Transactions**. Set **Invoice type = Refund** and search by the controlled Customer’s email. Open the sole result matching the submission time and `$21.00` refund. | Controlled Customer’s email, recorded time, `$21.00` returned | The refund details show one completed `$21.00` refund. Record its new reference alongside the original sale reference. If the result is missing or cannot be matched uniquely, stop and record the lookup as inconclusive. |
| Compare the refund record and original paid breakdown with the expected amounts. | `$25.20` originally paid, `$21.00` returned | The remaining `$4.20` equals the `$4.00` fee and `$0.20` tax on that fee. The original transaction shows only the expected `$21.00` increase in **Amount refunded**. |

**Postconditions:** Record both transaction references and keep the approved test order and refund for review. Leave the configured fee rules unchanged and use only the prepared isolated Event for this case.

## Proof and sources

**Local draft · Not run.** Compared the complete SPT snapshot (2,492 definitions, 2026-11-26) using refund, fees, charge, and fee-tax terms in titles, setup and steps. [SPT-946](https://app.qase.io/case/SPT-946) covers general full-refund types and processors. [SPT-5308](https://app.qase.io/case/SPT-5308) checks saved refund policy choices. [SPT-5532](https://app.qase.io/case/SPT-5532) checks saving the tax on a custom fee. None of these checks a completed Base refund with a separate, nonzero ticket-tax amount and fee-tax amount.

- Backend `b8dcfa8726db` · `apps/financials/tests/fees/test_tax_on_custom_fee_refunds.py:152` proves a Base refund returns ticket value and ticket tax while the original custom fees and fee tax stay out of the adjustment. `apps/financials/services/refunds/refund_type_permissions.py:14` maps Base refund to the **Full Refund** employee permission. The amounts here use a single fee and tax for easier comparison.
- Frontend `5867dd39dcde` · `RefundForm.web.tsx:221` labels **Base refund** and `:418` presents the destination. `RefundTotals.web.tsx:156` displays **Refunding now**. [[00 Start Here/Showpass QA Handbook/Playbooks/02 Fees Taxes and Absorbed Costs|Fees and tax testing guide]]

## Setup and proof

Record effective rate card, item and payment scope, fee payer and any fee tax. Calculate the expected order and adjustment amounts separately, then compare the sales and refund records.

## Connected features

- [[03 Test Cases/Events/02 Manage/08 Custom fees]]
- [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Finance → Custom Fees — published Angular cases]]
- [[03 Test Cases/Financials/Financials QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5667](https://app.qase.io/case/SPT-5667) · Dashboard - Finance - Custom Fees - Save rate-card item selections
- [SPT-5668](https://app.qase.io/case/SPT-5668) · Dashboard - Finance - Custom Fees - Save a rate-card payment method
- [SPT-5670](https://app.qase.io/case/SPT-5670) · Dashboard - Finance - Custom Fees - Save who pays an individual rate card
- [SPT-5532](https://app.qase.io/case/SPT-5532) · Dashboard - Finance - Custom Fees - Save a tax applied to a custom fee
- [SPT-5677](https://app.qase.io/case/SPT-5677) · Dashboard - Finance - Custom Fees - Calculate custom fees and taxes from the legacy page
