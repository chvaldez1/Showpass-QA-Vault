---
title: Customer Refund Shipping and Fee Amount Rules Test Cases
jira: SPW-19669
status: source-reviewed-not-executed
date: 2026-10-07
tags:
  - qa/test-cases
  - refunds
---

# Customer Refund Shipping and Fee Amount Rules Test Cases

> [!important] Buy new orders after saving the amount settings
> The amount controls and calculation are now present in local source. Older purchases can use the previous calculation. The cases are unexecuted; the publication section below lists which are saved in Qase. Start with [[00 Organizer and Venue - How to Test]] and [[00 Customer - How to Test]].

## Qase publication

Published and verified **2026-10-05** after user approval in [Organizer and Venue (1107)](https://app.qase.io/project/SPT?suite=1107). Saved fields, parameters, tags, steps, and suite placement matched the local cases. Publication does not mean execution.

| Local draft | Qase case |
| --- | --- |
| TC-1 | [SPT-5308](https://app.qase.io/case/SPT-5308) |

**Review, 2026-10-07:** SPT-5308 was read by exact ID. Before this enhancement, it had no parameters and covered only Proportional + Showpass fee. The local TC-1 enhancement below retains its title, Dashboard/Desktop coverage, tags, original choices, save/reload checks, and hidden-value retention; it now adds all 16 combinations of four shipping rules and four fee selections. The earlier five-row sample did not cover every combination and is superseded. The user approved the revised two-parameter update, which is saved and verified in Qase. TC-2 and TC-3 have been rewritten locally, and TC-4 remains a new local amount-change check. No manual cases were executed.

| Case | Responsibility | Publication |
| --- | --- | --- |
| TC-1 / SPT-5308 | Organizer saves all 16 shipping/fee combinations; turning amounts off retains each combination. | Enhanced and verified 2026-10-07; two single parameters and 13 steps. |
| TC-2 | Customer returns two shipping tickets separately under all four shipping rules. | Local; purchase compatibility and original financial values must be established. |
| TC-3 | Customer returns only the fee classes selected in the current policy. | Local; both original customer-paid fee amounts must be established. |
| TC-4 | An older amount preview cannot be confirmed after shipping or fee choices change. | Local; preview recovery and Cancel, with no completed return. |

**Copy-to-Qase review, 2026-10-07:** the earlier five-scenario SPT-5308 dry run is superseded by the full 16-combination draft. The 13 steps, title, Dashboard/Desktop coverage, tags `dashboard, refunds`, suite **1107**, and unrelated metadata are preserved. Only Description, Preconditions, Postconditions, Steps, and Parameters are proposed for update. The approved SPT-5308 update has been applied and verified. The combined scenario names have been replaced with two independent parameters, ShippingRule and FeeSelection, using the same short values as the customer cases. The full 16 combinations and 13 steps remain. The prior single-parameter preview is superseded. Local parsing and the read-only API dry run passed for both parameters and all 13 steps. Evidence: `/private/tmp/qase-5308-two-parameter-local-review-2026-10-07.json` and `/private/tmp/qase-5308-two-parameter-dry-run-2026-10-07.json`. Only SPT-5308 was updated; the helper read back and compared every selected text field, step, and parameter.

**Applied and verified, 2026-10-07:** the user's “update the qase” approved the current SPT-5308 draft only. Updated Description, Preconditions, Postconditions, Steps, and Parameters. Readback matched the approved content, both separate single-parameter collections, and all 13 steps; title, tags, suite 1107, and case classifications were preserved. No other case was created, updated, moved, or deleted. Publication is not manual execution. Final dry run: `/private/tmp/qase-5308-approved-dry-run-2026-10-07.json`; apply and verification: `/private/tmp/qase-5308-approved-applied-2026-10-07.json`.

## Testing Intent

### 2026-10-07 delivery amount prediction worksheet

**Independent spreadsheet model, 2026-10-13:** user explicitly requested a new file without using web-app behavior: [[outputs/refund-shipping-2026-10-13/Independent Refund Calculator.xlsx|Independent Refund Calculator]]. It uses editable prices, quantities, shipping and example fee rates with explicit order-total rounding and fee-base assumptions. It retains the hypothetical organizer-fee refund comparison and the missing organizer-HST withheld-display offset (0.54 for three 20.00 tickets at the example rates). It is not source-backed QA expected behavior or execution evidence. The earlier calculator is preserved as a separate version because a new file was explicitly requested.

**Excel calculator, 2026-10-13:** [[outputs/refund-shipping-2026-10-13/Shipping Refund Calculator.xlsx|Shipping Refund Calculator]] replaces the oversized execution matrix at the user’s request. One input panel controls ticket price, total tickets, equal-sized ticket groups, tickets being returned, shipping charge and editable original rate-card rates. Three tables show flat rate, per group and per item, with current credit → hypothetical credit including organizer fee/HST. Assumes itemized calculation, first return, group 1 selected first and holding the flat-rate charge, no discounts/absorption/overrides. Formula checks covered original one-ticket reconciliation, partial/full shipping, two groups and input recalculation; render/export passed. Native Excel interaction was not tested. No Qase changes or customer returns were performed.

Read SPT-5308 by exact ID; current Qase description also asks to test the user side. No Qase changes made. This worksheet extends the settings combinations with predicted customer amounts; it does not mark completed returns as passed. Source: backend `develop` HEAD `9e495a6a5c153e4ec1d55d12cfadb9306b8d3314`, `apps/financials/services/invoice/customer_return_amounts.py` (total: 70; shared shipping: 276–342; original item tax: 400; fee selection: 550; excluded fees: 485). The earlier source snapshot elsewhere in this note is historical.

**Exact baseline:** supplied `/Users/christianvaldez/Downloads/tmp/del.json`; one 20.00 ticket, quantity 1, Delivery, one flat-rate 10.00 shipping charge, no discount/credit/prior refund. Purchase total 41.76. Item HST 1.80; shipping HST 0.90; organizer Ticket Fee 2.01 + its HST 0.18; Showpass Fee 3.11 + VAT 0.62 = 3.73; processing fee 2.62 + VAT 0.52 = 3.14. These are saved purchase amounts, not recalculated no-delivery rates. Fulfillment/account eligibility must independently allow the preview/return.

**Adjustment meanings:** correcting the missing organizer fee tax in the excluded-fee display changes no credit amount. The hypothetical second amounts below instead refund the organizer Ticket Fee AND its HST, adding 2.19. That organizer-refund change is not implemented or selectable in the current policy and is not an approved requirement. Removing the organizer fee from the original purchase is a different scenario and requires new fee calculations.

Each cell is **current predicted credit / hypothetical credit including organizer fee + HST**, CAD:

| Shipping rule / item state | None | ShowpassOnly | ProcessingOnly | Both |
| --- | --- | --- | --- | --- |
| Never | 21.80 / 23.99 | 25.53 / 27.72 | 24.94 / 27.13 | 28.67 / 30.86 |
| AfterAll; only ticket returned | 32.70 / 34.89 | 36.43 / 38.62 | 35.84 / 38.03 | 39.57 / 41.76 |
| Proportional; only ticket returned | 32.70 / 34.89 | 36.43 / 38.62 | 35.84 / 38.03 | 39.57 / 41.76 |
| UnshippedOnly; ticket not fulfilled | 32.70 / 34.89 | 36.43 / 38.62 | 35.84 / 38.03 | 39.57 / 41.76 |
| UnshippedOnly; ticket fulfilled, if otherwise eligible | 21.80 / 23.99 | 25.53 / 27.72 | 24.94 / 27.13 | 28.67 / 30.86 |

Formula: 20.00 + 1.80 + selected saved fees + eligible shipping/tax (0 or 10.90). AfterAll does not require fulfillment: it releases the charge when every original ticket sharing it is selected or already Refunded/Voided. A fulfillment policy can block a return before amount calculation; such a block must not be recorded as a zero-shipping completed return.

**Excluded-fee preview check (current credit unchanged):** None: 8.88 displayed → 9.06 including missing HST; ShowpassOnly: 5.15 → 5.33; ProcessingOnly: 5.74 → 5.92; Both: 2.01 → 2.19. These rows describe fees/tax on fees only; never add withheld shipping to this fee row. Withheld shipping/tax adds 10.90 to the difference between original payment and credit.

**Shared flat-rate proof:** a single-ticket order cannot distinguish AfterAll from Proportional. For a separate two-ticket order sharing the same 10.00 charge, Never returns 0 shipping; AfterAll returns 0 on the first return and 10.00 + all original shipping tax on the last; Proportional returns 5.00 + half original shipping tax per ticket; UnshippedOnly returns that share only for each not-fulfilled ticket. If one is fulfilled, its share stays withheld. With original shipping tax 0.90, each eligible half is 5.45. Ticket/fee credit totals for that new order must use its own original invoice components; do not reuse the one-ticket fee totals above.

**Evidence status:** user reports Never execution and supplied no-delivery previews of 24.24 and 24.62. Screenshots confirm the preview exclusion row omits 0.18 compared with the purchase breakdown; source supports the omission. No final credit issuance, persisted invoice components, or other shipping-rule execution was inspected in this request. Remaining table cells are predictions. Use fresh independent orders for completed-return permutations and verify credit balance change and transaction amount; repeated previews alone prove only previews.

Prove that the customer receives the previewed amount once and that returned item, tax, shipping, shipping tax, and fee values reconcile to the original purchase and organizer transaction. Primary risk buckets are financial math, money/order state, and reporting agreement. Source review and case preparation are complete; execution, financial-component evidence, and release acceptance remain outstanding.

## Jira Intake Summary

[SPW-19669](https://showpass.atlassian.net/browse/SPW-19669) requires matching preview and final amount, correct one-item shipping on partial orders, excluded nonrefundable fees, configurable shipping behavior, and component-level finance evidence. The proposed approval-required shipping choice is absent from the current model/form.

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/venues/models/venue_management/customer_refund_policy.py`, `apps/venues/constants/customer_refunds.py`, `apps/venues/api/venue_based/serializers/refunds.py`, `apps/financials/services/invoice/customer_return_amounts.py`, `user_invoice_return.py`, `apps/financials/models/invoice_management/invoice_items.py`.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/dashboard/features/organization/settings/customer-refunds/constants/customer-refund-policy-form-fields.ts` and `packages/core/src/app-contexts/user/features/account/features/my-orders/ui/modals/return-order/MyOrdersReturnOrder.web.tsx`.

**Source review, 2026-10-07:** backend working branch `develop` is 92 commits behind its already-fetched `origin/develop`. This review reads the saved `origin/develop` snapshot `85b3fc96f047cb7b3d6f71a26c0442574cc7f403` without changing the checkout. Frontend working `develop`/`origin/develop` is `baa3ccfadead29f2ca9f296affebf6e46043e20d`; the supplied remote branch `SPW-19669-venue-level-configurable-shipping-and-fee-refund-rules` resolves to `695e0794bd3f887a5fb8cbdb230b39fa702c1874`. Its amount controls were reviewed alongside current develop. No fetch, diff, branch comparison, or changed-file discovery was performed; this is a behavior review, not a claim about the exact branch delta or deployed build.

Additional backend sources: `apps/venues/api/venue_based/serializers/refunds.py`; `apps/tickets/models/order_management/order_basket.py`, `order_items.py`; `apps/tickets/services/financials/calculator.py`; `apps/core/constants/shipping.py`; `apps/core/models/abstract/itemized_calculations.py`; `apps/financials/admin/invoices.py`. Additional frontend sources under `packages/core/src/app-contexts/`: Dashboard `features/organization/settings/ui/pages/ShippingFulfillmentPage.web.tsx`, `features/events/ticket-types/delivery/Editor.web.tsx`, `MethodPanel.web.tsx`; My Orders `data/services/invoice/useReturnOrderAction.ts`, `ui/modals/return-order/MyOrdersReturnOrderModalSelection.web.tsx`; Dashboard Transactions `ui/components/transactions-detail/financial-breakdown/variants/RefundStyleBreakdown.web.tsx`.

**Existing-case preservation and duplicate review:** change classification is Enhance. SPT-5308's current 12 steps and fields are saved in `/private/tmp/qase-5308-before-2026-10-07.json`; no existing platform, assertion, or parameter is removed. One read-only scan retrieved 1,791 SPT cases and identified 14 refund/return titles also containing shipping, fee, amount, discount, credit, or preview. Related employee refunds and protection cases do not establish these customer amount rules. SPT-5316 checks a deadline change, whereas TC-4 keeps the item eligible and changes its amount. SPT-5314/5324 cover basic Organizer Credit returns with configurable amounts off. Evidence: `/private/tmp/qase-19669-all-cases-2026-10-07.json` and `/private/tmp/qase-19669-candidates-2026-10-07.json`.

## Source-backed Behavior

* The organization must be included in `enable_venue_policy_customer_self_refunds`, with its policy and **Enable configurable refund amounts** on. Compatible new ticket purchases store component values for preview and final return.
* **Shipping refund rule** offers Never, after all items sharing the charge, proportional, and unshipped-only. Shipping already returned cannot be returned again.
* **Refundable customer-paid fees** offers Showpass fee and Payment processing fee. Empty selection excludes both. Existing Venue **Automated return medium** still decides credit versus original payment.
* Fee and shipping selections are read from the current policy when the customer previews/submits a return; saving a selection before purchase does not freeze that selection for the order. Purchase component amounts are saved at purchase.
* The new component calculation is ticket-only. An older/non-itemized order may use the older amount path. With amount rules on, a product/add-on can be blocked even if its item switch is on. A changed quote must be reviewed again before confirmation.

## State-space / setup matrix

| Check | Parameters and preparation | Proof |
| --- | --- | --- |
| Organizer form | All 16 shipping/fee combinations in TC-1; no purchase. | Every shipping rule combined with None, ShowpassOnly, ProcessingOnly, and Both; save/reload and hidden-value retention for each. |
| Shared shipping | TC-2: Never, AfterAll, Proportional, UnshippedOnly; a fresh two-ticket order for each. | Shipping and its tax returned once according to the rule. |
| Customer-paid fees | TC-3: None, ShowpassOnly, ProcessingOnly, Both; two fresh orders per run. | Only originally charged selected fee classes and their taxes are included. |
| Policy changes after preview | TC-4: ExcludeShowpassFee, ExcludeShipping; one fresh order per run and two sessions. | Old amount rejected, new amount shown, Cancel leaves payment and credit unchanged. |

**Combination boundary:** TC-1 now explicitly includes every shipping/fee pair, including **Never refund shipping + Payment processing fee only**. This is full combination coverage for those two organizer controls, with configurable amounts saved on and off in every run. TC-2 isolates shipping with fees excluded, TC-3 isolates fee selection without shipping, and TC-4 checks a changed preview. They do not establish all 16 completed customer-return combinations or every tax, funding, fulfillment, discount, and package state; those interactions remain separate financial coverage.

## Recommended Test Data

For shipping, create a new future event after enabling **Enable itemized calculations** in Admin → Venue. Enable **Fulfillment features enabled** in Organization settings → Shipping and fulfillment. Configure a 10.00 General Admission ticket with **Standard Shipping**, **Shipping & Handling Fee = 8.00**, **Fee Method = Flat rate**; buy two tickets and confirm shipping is charged once. TC-2 contains the complete standalone setup, including the Fulfilled state for UnshippedOnly.

For fee checks, use Electronic Ticket orders whose saved fee rules charge the customer both Showpass and payment-processing fees. Record each original fee and fee tax separately; selecting a refundable fee does not create a charge that was absent from the purchase. Use Organizer Credit for the completion cases, preserving the old venue setting for restoration.

Record an independent worksheet before returning anything: order reference, ticket barcodes, item subtotal and item tax, shipping and shipping tax, each customer-paid fee and its tax, and opening Organizer Credit. A combined receipt Tax/Fees line cannot establish separate nonzero component expectations. If those original values are unavailable, mark that proof Blocked rather than copying the preview as the expected result. Use separate fresh orders for each completed-return parameter.

## Acceptance criteria and coverage decisions

| Required proof | Coverage / remaining evidence |
| --- | --- |
| Preview matches the completed return | TC-2 and TC-3; unexecuted manual coverage. Compare balance changes and Transactions, not just a success message. |
| One-item return does not return all shared shipping | TC-2; exact 8.00 shipping example and sequential return expectations. Cross-ticket-type shared shipping remains a separate deferred integration run. |
| Excluded fee classes stay excluded | TC-3; None, ShowpassOnly, ProcessingOnly, Both. Organizer/custom fees are not additional selectable fee classes. |
| Shipping cost and shipping tax follow policy | TC-1 saves all choices; TC-2 measures actual returns. Nonzero shipping-tax proof requires a separately established original shipping-tax amount. |
| Finance records identify individual refunded components | Backend persists component values, but the reviewed Transactions refund view combines item and shipping tax under Tax and does not expose the full stored breakdown. Component-level reporting proof remains Blocked pending an approved read-only finance/backend comparison. Do not mark it passed from Transactions totals. |
| Outdated amount cannot be submitted | TC-4; change the current rule after preview while the item remains eligible. |
| Product face value, approval-required shipping, arbitrary organizer fee classes | Not implemented in this version. Products are blocked under amount rules; report these as scope questions, not positive test parameters. |
| Discounted tickets, odd-cent allocations, mixed credit/card funding, old-order fallback, packages | Deferred manual recipes; named backend automation targets below. These are not covered by the undiscounted card-funded baseline. |

## Qase-ready Manual Test Cases

### TC-1: Dashboard - Refunds - Save shipping and fee choices

**Description:** An employee saves a shipping rule and a fee selection, then reopens Customer refunds to confirm both choices. Turning configurable amounts off hides the controls without deleting those saved choices. Run each ShippingRule with each FeeSelection: four shipping rules × four fee selections = 16 runs. No customer return is submitted in this case.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| ShippingRule | Select under Shipping refund rule |
| --- | --- |
| Never | Never refund shipping |
| AfterAll | Refund after all shipped items sharing the charge are refunded |
| Proportional | Refund shipping proportionally |
| UnshippedOnly | Refund shipping for unshipped items only |

| FeeSelection | Select under Refundable customer-paid fees |
| --- | --- |
| None | Clear both choices. |
| ShowpassOnly | Showpass fee only. |
| ProcessingOnly | Payment processing fee only. |
| Both | Showpass fee and Payment processing fee. |

For example, ShippingRule = Never with FeeSelection = ProcessingOnly means save **Never refund shipping** with only **Payment processing fee** selected.

**Tags:** dashboard, refunds

**Parameters:**
ShippingRule: Never, AfterAll, Proportional, UnshippedOnly
FeeSelection: None, ShowpassOnly, ProcessingOnly, Both

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Enable `enable_venue_policy_customer_self_refunds` for the selected organization.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record the original amount switch, shipping rule, and fee selections. No purchase is needed.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. | Selected organization | Refund amounts contains Enable configurable refund amounts. |
| Turn on Enable configurable refund amounts. | | Shipping refund rule and Refundable customer-paid fees are visible. |
| Open Shipping refund rule. | Four choices in the ShippingRule table | All four shipping choices are available. |
| Select the shipping rule listed for ShippingRule. | ShippingRule | The selected rule is displayed. |
| Open Refundable customer-paid fees. | | Showpass fee and Payment processing fee are available. |
| Clear any current fee selections. | | Neither fee class is selected. |
| Set the fee selection listed for FeeSelection. | FeeSelection; leave both clear for None. | Exactly the required fee selection is shown. |
| Select Save. | | Customer refund policy saved appears. |
| Reload Customer refunds. | ShippingRule and FeeSelection | The amount switch is on and both saved choices match the selected parameters. |
| Turn off Enable configurable refund amounts. | | Shipping and fee controls are hidden. |
| Select Save. | | Customer refund policy saved appears. |
| Reload Customer refunds. | | The amount switch remains off and the dependent controls remain hidden. |
| Turn on Enable configurable refund amounts without saving. | ShippingRule and FeeSelection | The previously saved shipping and fee selections are retained. |

**Postconditions:**

* Restore the original amount switch, shipping rule, and fee selections; save and reopen to confirm them. No customer order was created.

### TC-2: My Orders - Refunds - Apply shared shipping across two returns

**Description:** A customer buys two identical General Admission tickets with one 8.00 shipping charge, then returns one ticket at a time. Each preview and completed Organizer Credit must follow ShippingRule. A shipping share is half the original shipping charge and half its separately recorded tax; fees remain excluded. Organizer Credit is spending credit with this organization, not money sent to the customer's card.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| ShippingRule | Save Shipping refund rule as | First ticket / remaining ticket | Shipping returned first / second | Shipping tax returned first / second |
| --- | --- | --- | --- | --- |
| Never | Never refund shipping | Both Unfulfilled. | 0.00 / 0.00 | 0.00 / 0.00 |
| AfterAll | Refund after all shipped items sharing the charge are refunded | Both Unfulfilled; this rule follows whether all items sharing the charge have been returned. | 0.00 / 8.00 | 0.00 / the full original shipping tax. |
| Proportional | Refund shipping proportionally | Both Unfulfilled. | 4.00 / 4.00 | Half / half of the original shipping tax. |
| UnshippedOnly | Refund shipping for unshipped items only | First ticket Fulfilled; remaining ticket Unfulfilled. | 0.00 / 4.00 | 0.00 / half of the original shipping tax; the fulfilled ticket's share stays excluded. |

Use an original shipping-tax amount evenly divisible into cents, including zero, for this case. Odd-cent allocation is separate rounding coverage.

**Tags:** my-orders, refunds, fees-and-taxes

**Parameters:**
ShippingRule: Never, AfterAll, Proportional, UnshippedOnly

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**; UnshippedOnly also needs **Scan Tickets** to record fulfillment.
* Enable `enable_venue_policy_customer_self_refunds` for the organization. In **Admin → Venues → Venue customer refund policies**, find or add its record. In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Allow customer refunds for tickets = on**, **No cutoff**, all three delivery/fulfillment/check-in restrictions **Allow customer refunds**, **Refund eligible items independently**, **Enable configurable refund amounts = on**, ShippingRule's shipping choice, and **Refundable customer-paid fees = empty**. Record original values.
* In **Admin → Venues → Venues**, find the organization and save **Automated return medium = Organizer Credit** and **Enable itemized calculations = on**. In **Dashboard → Organization → Organization settings → Shipping and fulfillment**, save **Fulfillment features enabled = on** and **Enable shipping quantity threshold = off**. Record prior values.
* In **Dashboard → Build → Events → All events**, create a published single-day event at least seven days ahead with public sales open. Create a General Admission ticket priced **10.00**, inventory **10**, with **Basic info → Allow customer-initiated refunds = on**. In **Delivery & transfers → Ticket Delivery Methods**, keep **Standard Shipping** as the only method, set **Shipping & Handling Fee = 8.00**, **Fee Method = Flat rate**, and leave **Override basket delivery shipping with this ticket's shipping cost** off. Save before any sale; shipping prices lock after sales. No package, seat, discount, payment plan, gift card, or credit is included.
* As the buyer, purchase quantity **2** with an approved refundable card payment; select **Standard Shipping** and a delivery address you control. Confirm checkout charges shipping **8.00 once**. Record both ticket barcodes, the receipt, order reference, original per-ticket tax, shipping tax, customer-paid fees, and opening Organizer Credit balance. Obtain separate tax values from the saved financial details or the authorized finance owner before calculating expected totals; a combined Tax line alone is insufficient for nonzero shipping-tax proof. The purchase must support individual ticket amounts; if it falls back to the older refund preview, stop and record that compatibility gap.
* UnshippedOnly: in **Dashboard → Transactions → Fulfillment**, find the first recorded barcode, set **Fulfillment status = Fulfilled**, select **Update → Confirm**, and reopen to confirm it. Leave the second ticket **Unfulfilled**. Keep both unscanned and untransferred; no physical shipment is required to prepare the saved fulfillment state.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and open the purchased order. | Recorded order | Both recorded tickets are paid. |
| Open Return order. | | The two tickets can be selected separately. |
| Select only the first recorded ticket. | First ticket from ShippingRule | Only that ticket contributes to the preview. |
| Read the amount breakdown. | Subtotal 10.00; original per-ticket tax; first shipping/tax amounts from ShippingRule | Shipping, shipping tax, and excluded fees match the selected rule; zero shipping rows may be omitted. |
| Record the total and destination message. | Expected total = 10.00 + original per-ticket tax + allowed shipping + allowed shipping tax | The preview equals the independently calculated total and identifies Organizer Credit. |
| Select Next. | | Confirmation shows the same total and destination. |
| Select the confirmation option acknowledging the return. | Displayed acknowledgement | Return Order becomes available. |
| Select Return Order once. | First preview | The return succeeds. |
| Select Done. | | The order reopens with only the first ticket returned. |
| Open Account → Credits → Organizer Credits. | Opening balance and first preview | Credit for this organization increased by exactly the first preview. |
| Reopen the same order in My Orders and open Return order. | Remaining ticket | The returned ticket cannot be selected again. |
| Select the remaining ticket. | Second shipping/tax amounts from ShippingRule | The preview contains only its 10.00 price, its tax, and the allowed remaining shipping/tax. |
| Record the second total. | Second independently calculated total | Shipping already returned is not included again; UnshippedOnly does not release the fulfilled ticket's excluded share. |
| Select Next. | | Confirmation matches the second preview. |
| Select the acknowledgement. | | Return Order becomes available. |
| Select Return Order once. | Second preview | The remaining ticket is returned. |
| Select Done. | | Both tickets show returned. |
| Open Organizer Credits again. | Opening balance plus both previews | The total balance increase equals the sum of both previews. |
| As the employee, find the original order in Dashboard → Transactions and open its related return/credit records. | Recorded order, two previews, receipt | Combined adjustments equal both previews and neither ticket was returned twice. |

**Postconditions:**

* Preserve the original purchase and all return/credit records. Several adjustment records may represent one customer return; reconcile their sum rather than assuming exactly two records.
* Restore the original policy, shipping, and Venue settings. Keep the ticket type and its locked delivery pricing as purchase evidence; do not delete paid or returned orders.

### TC-3: My Orders - Refunds - Return only selected customer-paid fees

**Description:** A customer has two new, card-paid ticket orders with nonzero customer-paid Showpass and payment-processing fees. Return the first with no refundable fees, then return the second with FeeSelection. Only the fee classes currently selected may be added to Organizer Credit. Amounts and fee taxes come from each order's original charge, not its ticket's current price.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| FeeSelection | Select under Refundable customer-paid fees | Second return's Refundable fees | Excluded non-refundable fees |
| --- | --- | --- | --- |
| None | Neither choice. | 0.00 | All originally charged customer-paid fees. |
| ShowpassOnly | Showpass fee only. | Original customer-paid Showpass fee, including its applicable tax. | Processing fee and other unselected customer-paid fees. |
| ProcessingOnly | Payment processing fee only. | Original customer-paid processing fee, including its applicable tax. | Showpass fee and other unselected customer-paid fees. |
| Both | Showpass fee and Payment processing fee. | Sum of those two original fee classes, including their applicable taxes. | Any other customer-paid fee class; selecting Both does not make arbitrary organizer fees refundable. |

**Tags:** my-orders, refunds, fees-and-taxes

**Parameters:**
FeeSelection: None, ShowpassOnly, ProcessingOnly, Both

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**.
* Enable `enable_venue_policy_customer_self_refunds` for the organization. In **Admin → Venues → Venue customer refund policies**, find or add its record. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy **on**, **Allow customer refunds for tickets = on**, **No cutoff**, all three restrictions **Allow customer refunds**, **Refund eligible items independently**, configurable amounts **on**, **Never refund shipping**, and refundable fees **empty**. Record original settings.
* In **Admin → Venues → Venues**, save **Automated return medium = Organizer Credit** and **Enable itemized calculations = on**. Create a published future single-day event with public sales open and one General Admission ticket priced **10.00**, inventory **10**, **Allow customer-initiated refunds = on**, and **Electronic Ticket** delivery. No package, assigned seat, discount, plan, shipping, protection, gift card, or credit is included.
* Use saved fee rules that charge the customer both a positive Showpass fee and a positive payment-processing fee. Record those two fee amounts and their fee taxes separately from the original finance breakdown or the authorized fee owner; do not use organizer-absorbed costs as customer-paid fees. Do not change a shared rate card to create this data.
* As the buyer, purchase one ticket in each of **two separate new orders** with an approved refundable card payment. Record both order references, receipts, per-ticket item tax, the separate original fee amounts, and opening Organizer Credit balance. Confirm the preview supports the new separate Item taxes/Refundable fees breakdown before executing a return; an older amount path does not prove these rules.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. | Selected organization | Refund amounts controls are shown. |
| Clear Refundable customer-paid fees. | | Neither fee class is selected. |
| Select Save. | | Customer refund policy saved appears. |
| Reopen Customer refunds. | | Neither fee class is selected. |
| As the buyer, open Account → My Orders → the first order → Return order. | First order | The paid ticket is selectable. |
| Select its one ticket. | First receipt | Refundable fees is 0.00 and Excluded non-refundable fees contains the originally charged fees. |
| Record the total. | 10.00 plus original item tax | No excluded fee is added to the return total. |
| Select Next. | | Confirmation matches the preview and identifies Organizer Credit. |
| Select the acknowledgement. | | Return Order becomes available. |
| Select Return Order once. | First preview | The first ticket is returned. |
| Select Done. | | The first order shows its ticket returned. |
| Open Account → Credits → Organizer Credits. | Opening balance and first preview | Credit increased by exactly the first preview. |
| As the employee, reopen Customer refunds and set Refundable customer-paid fees to FeeSelection. | Selected row | Exactly the required fee classes are selected. |
| Select Save. | | Customer refund policy saved appears. |
| Reopen Customer refunds. | Selected row | The saved selection is retained. |
| As the buyer, open the second order's Return order and select its ticket. | Second receipt and FeeSelection | Refundable fees and Excluded non-refundable fees match the selected row. |
| Record the second total. | 10.00 + original item tax + selected original fee classes | The total includes no unselected or uncharged fee. |
| Select Next. | | Confirmation matches this preview and identifies Organizer Credit. |
| Select the acknowledgement. | | Return Order becomes available. |
| Select Return Order once. | Second preview | The second ticket is returned. |
| Select Done. | | The second order shows its ticket returned. |
| Open Organizer Credits again. | Opening balance plus both previews | The combined balance increase equals both preview totals. |
| As the employee, open both original orders and their related adjustments in Dashboard → Transactions. | Original receipts and recorded previews | Each order's combined adjustment equals its preview, with the expected refunded Fees and Tax totals. |

**Postconditions:**

* Preserve both paid/returned orders and adjustment records. Restore policy and Venue values changed for the run.
* Customer Organizer Credit is checked; this case does not prove a refund to the original payment method or a split credit/card refund.

### TC-4: My Orders - Refunds - Refresh the amount after shipping or fee choices change

**Description:** A customer reviews a positive refund amount, then an employee changes a refundable shipping or fee choice while leaving the ticket eligible. Confirming the older amount must fail without returning the ticket or issuing credit. The customer must review the new lower amount before any new confirmation; Cancel leaves the order paid.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| AmountChange | Starting policy and purchase | Employee change after customer reaches confirmation | New amount |
| --- | --- | --- | --- |
| ExcludeShowpassFee | Showpass fee selected; electronic ticket with a positive customer-paid Showpass fee. | Clear Refundable customer-paid fees and save. | Original preview minus the originally included Showpass fee and its fee tax. |
| ExcludeShipping | Refund shipping proportionally; one ticket purchased with Standard Shipping and an 8.00 Flat rate Shipping & Handling Fee. | Set Shipping refund rule to Never refund shipping and save. | Original preview minus 8.00 shipping and its shipping tax. |

**Tags:** my-orders, refunds, edge-case

**Parameters:**
AmountChange: ExcludeShowpassFee, ExcludeShipping

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**. Use separate customer and employee sessions so the customer's confirmation stays open.
* Enable `enable_venue_policy_customer_self_refunds` for the organization; find or add its policy through **Admin → Venues → Venue customer refund policies**. In **Dashboard → Organization → Organization settings → Customer refunds**, save policy **on**, tickets **on**, **No cutoff**, all three restrictions **Allow customer refunds**, **Refund eligible items independently**, and configurable amounts **on**. Save the row's starting shipping and fee choices; ExcludeShipping uses fees empty and ExcludeShowpassFee uses Never refund shipping. Record original settings.
* In **Admin → Venues → Venues**, save **Automated return medium = Organizer Credit** and **Enable itemized calculations = on**. Prepare a new published future single-day event with one public General Admission ticket, price **10.00**, inventory **10**, and **Allow customer-initiated refunds = on**. Use the delivery method in AmountChange. ExcludeShipping: enable **Fulfillment features enabled** in Organization settings → Shipping and fulfillment, disable the shipping quantity threshold, and set ticket **Delivery & transfers → Standard Shipping only → Shipping & Handling Fee 8.00 → Fee Method Flat rate** before any sale.
* As the buyer, purchase quantity **1** with an approved refundable card payment. Record the receipt, applicable tax and fee values, opening Organizer Credit balance, and order reference. Keep the ticket unscanned, unfulfilled, and untransferred. ExcludeShowpassFee requires a positive customer-paid Showpass fee; organizer-absorbed fees do not qualify.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders → the recorded order → Return order. | AmountChange | The ticket is selectable. |
| Select the ticket and record the preview breakdown and total. | Original receipt | The row's shipping or Showpass fee is included and the total is positive. |
| Select Next. | | The older amount is shown on confirmation. |
| In the employee's session, open Customer refunds and make AmountChange's listed change. | Selected row | Only the shipping or fee choice changes; the ticket remains eligible. |
| Select Save. | | Customer refund policy saved appears. |
| Reopen Customer refunds in the employee session. | Selected row | The changed amount choice is retained. |
| In the buyer's still-open confirmation, select the acknowledgement. | Older preview | The existing confirmation can be attempted. |
| Select Return Order once. | Older preview | The older amount is rejected with a message to review the changed refund amount; no return succeeds. |
| Review the refreshed amount selection screen. | New amount from AmountChange | The removed shipping or fee is no longer included and the total matches the current policy. |
| Select Cancel. | | No new return is submitted. |
| Reload the original order in My Orders. | Recorded ticket | The ticket is still paid and not returned. |
| Open Account → Credits → Organizer Credits. | Opening balance | Credit is unchanged. |
| As the employee, reopen the original order in Dashboard → Transactions. | Recorded order | No refund or credit adjustment was created by the rejected confirmation. |

**Postconditions:**

* Restore the original policy, shipping, and Venue settings. Preserve the unchanged paid order; no return was completed.

## Risk Areas

* Shared shipping or fee value could be returned twice across partial refunds.
* Preview, final customer balance, and financial components may disagree.
* A selected fee class may not have been charged on this order; check its receipt.

## Minimum Execution Set

1. TC-1: run each ShippingRule with each FeeSelection (16 runs); no purchase needed. This covers the shipping/fee settings combinations, not all purchase or customer-refund states.
2. TC-2: first Never and AfterAll, then Proportional and UnshippedOnly on separate fresh orders. Record exact preview totals before each return.
3. TC-3: first None and ShowpassOnly, then ProcessingOnly and Both. The original charged fee amounts must be independently established.
4. TC-4: both AmountChange values; verify rejection, refreshed preview, and unchanged order/credit.

Publication status: TC-1 / SPT-5308 is saved and verified with two independent four-value parameters for 16 settings combinations. Customer drafts require the documented purchase and original financial values; do not import them as runnable if that evidence is missing. A zero shipping-tax run proves shipping cost only; nonzero shipping-tax and stored component reporting remain separate proof targets.

## Suggested Automated Coverage

* Backend: all shipping rules, same-type and cross-type shared charges, fulfilled/unfulfilled units, odd-cent allocation in different return orders, selected/unselected fee classes and fee taxes, uncharged/absorbed fees, discounted items, and persisted purchase-time values.
* Backend/API: reject missing/outdated previews; changing policy, refund destination, or funding while the dialog is open; duplicate/concurrent requests; legacy and non-itemized orders; a prior return without compatible component history.
* Money destinations: full-card Revert Funds, Organizer Credit, supported mixed credit/card funding, full credit restoration, rejected gift-card/unsupported credits, and unsupported asynchronous Square payment refunds.
* Ledger: compare saved item, discount, item tax, shipping, shipping tax, fee, payment, and restored-credit components to an independent calculation. Verify cumulative refunds never exceed each originally charged component.
* Frontend: all 16 TC-1 settings rows, hidden-value retention, fee deselection, exact preview labels, zero-row omission, stale-response protection, changed-amount recovery, and duplicate confirmation prevention.
* Integration: supported Parent-revenue ticket packages, blocked child-revenue/product-containing packages, older organization settings entry, staff refunds, and provider failures that leave earlier completed returns recorded.

## Assumptions and Unknowns

* The reviewed saved develop revisions contain amount controls and calculation, including the new organization ticket/product switches. This supersedes the earlier checkout-only mismatch for these revisions; it does not establish the deployed server's revision.
* No browser, purchase, refund, credit, fulfillment update, or live report was executed. Qase reads were read-only.
* Customer amount cases use card-funded purchases returned to Organizer Credit, without discounts or packages. Other funding, pricing, and package combinations are explicitly deferred above.
* Purchase compatibility matters: the amount service falls back for historical/non-itemized data and refuses unsafe mixed prior-refund histories. Do not edit saved financial values to make an order compatible.
* Receipt or Transactions Tax totals may combine components. Nonzero shipping-tax expectations and fee-class expectations need original independently established amounts; a preview cannot serve as its own expected result.

## Open Questions

1. Which approved finance/backend read can provide the separate original shipping tax and customer-paid fee-class values and verify saved refund components? The reviewed refund Transactions panel does not expose every component separately.
2. Does the deployed server include the reviewed develop model/serializer and compatible purchase calculation? Confirm before customer execution; source presence alone is insufficient.
3. Are shipping approval, product amounts, and arbitrary organizer-fee choices deferred or removed from the ticket? They remain in Jira intake but are absent from the implemented options.
