---
title: Customer Refund Shipping and Fee Amount Rules Test Cases
jira: SPW-19669
status: source-reviewed-not-executed
date: 2026-10-27
tags:
  - qa/test-cases
  - refunds
---

# Customer Refund Shipping and Fee Amount Rules Test Cases

> [!important] Current-page review — 2026-10-27
> **Published and verified:** the cases listed below now match Qase after the approved 21 updates and 14 creates. Required gates, current controls, item setup, and expected results were reviewed in plain language. No purchases, refunds, or scans were executed. The table is the current publication map; older dated records below are history.

| Local draft | Current Qase case | Suite |
| --- | --- | --- |
| TC-1 | [SPT-5308](https://app.qase.io/case/SPT-5308) | 1107 |
| TC-4 | [SPT-5806](https://app.qase.io/case/SPT-5806) | 1108 |
| TC-5 | [SPT-5807](https://app.qase.io/case/SPT-5807) | 1108 |

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

**Workbook update, 2026-10-27:** both linked files now use the current three refund types and Automated return medium. Their original input rates and distinct rounding approaches are preserved. The arrow comparisons and old fee selectors described in the dated history below are retired. Calculation and layout checks passed; no live refund or native Excel execution was performed.

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

**Reviewed 2026-10-27 against current local develop in both repositories; see the Start Here review for exact revisions.**

* The organization rollout flag and Admin **Customer Self Refund Settings** gate access. With the Admin setting off, the employee sees the disabled notice and no editable form; saving is also rejected by the backend.
* The policy has one enable switch plus separate organization ticket and product switches. There is no Customer outcome dropdown. Individual item participation remains separate and saved values survive policy changes.
* New policies start off, with both organization item-type switches on. New individual ticket/product defaults follow whether the policy is on; changing the policy does not rewrite existing item settings.
* Five cutoff shapes remain supported. Absolute needs a date/time in the organization timezone; relative needs a positive whole number and Hours/Days. Switching shapes clears irrelevant details.
* Barcode, fulfillment/shipping, and check-in restrictions are on/off switches; on allows that state but does not bypass the other eligibility checks. The three mixed-order choices are unchanged.
* Refund amounts always shows Automated return medium (Revert Funds / Organizer Credit), Automated return refund type (three ordinary refund types), and Shipping refund rule (four choices), including while the policy is off. The old amount-enable switch and fee multiselect are retired.
* Policy and organization money settings save together. A refused or invalid save must not update only one part. Organization permissions, ownership, and rollout checks still apply.
* With nothing eligible, My Orders hides Return order. Current returns retain the purchased package parent; the previous blanket package-selection failure is not a current expected result. Unsupported Child-revenue packages remain blocked.
* The current amount calculation follows the saved refund type and refund medium plus the shipping rule. A previously reviewed amount cannot be submitted after destination/type/rule changes, even if its total stays equal. Old or incomplete shipping records can require organizer assistance rather than a guessed refund.

## State-space / setup matrix

| Proof | Current values | What this establishes |
| --- | --- | --- |
| Saved money controls | 2 methods × 3 refund types × 4 shipping rules | 24 settings combinations in TC-1; no purchase and no claim of 24 money-movement passes. |
| Shared shipping | Never, AfterAll, Proportional, UnshippedOnly | TC-2 returns two identical tickets separately and checks shipping/tax once. |
| Actual refunded fees | OriginalPayment / OrganizerCredit × Base / ExcludeShowpass / Full | TC-3 uses independent original components and six separate orders. |
| Stale method/type | Destination changes with equal total; refund type changes with positive fees | TC-4 rejects the old confirmation and requires review. |
| Stale shipping | Proportional → Never after preview | TC-5 excludes the original shipping/tax before any new confirmation. |

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

**Current case responsibilities:** TC-1 updates existing SPT-5308 for the two refund methods, three refund types, and four shipping rules. TC-2 checks sequential shared shipping. TC-3 replaces the retired fee-selection recipe with actual refund-type and destination checks. TC-4 checks changed method/type; TC-5 preserves the changed-shipping-preview check. All are source-reviewed drafts; component-level fee/tax execution needs the original independent values and permitted finance/payment access. The dated delivery calculator above is historical and must not be treated as current selectable fee options.


### TC-1: Dashboard - Refunds - Save shipping and fee choices

**Description:** Save a refund method, refund type, and shipping rule. Reopening must show all three exact choices. Run every combination of refund method, refund type, and shipping rule: 24 settings combinations. This case saves settings only.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| ReturnMedium | Automated return medium |
| --- | --- |
| OriginalPayment | Revert Funds |
| OrganizerCredit | Organizer Credit |

| RefundType | Automated return refund type |
| --- | --- |
| Base | Base refund |
| ExcludeShowpass | Full refund excluding Showpass fees |
| Full | Full refund (Showpass fees invoiced) |

| ShippingRule | Shipping refund rule |
| --- | --- |
| Never | Never refund shipping |
| AfterAll | Refund after all shipped items sharing the charge are refunded |
| Proportional | Refund shipping proportionally |
| UnshippedOnly | Refund shipping for unshipped items only |

**Tags:** dashboard, refunds

**Parameters:**
ReturnMedium: OriginalPayment, OrganizerCredit
RefundType: Base, ExcludeShowpass, Full
ShippingRule: Never, AfterAll, Proportional, UnshippedOnly

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* Record the entire form and leave Enable customer refund policy off. All three Refund amounts dropdowns must remain editable; no purchase is needed.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. |  | All three Refund amounts dropdowns are visible while the policy is off. |
| Select Automated return medium. | ReturnMedium | The matching refund method is shown. |
| Select Automated return refund type. | RefundType | The matching refund type is shown; Full Admin Refund is not offered. |
| Select Shipping refund rule. | ShippingRule | The matching shipping rule is shown. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload Customer refunds. | ReturnMedium, RefundType, ShippingRule | All three choices remain saved and the policy remains off. |
| Compare the rest of the form to its recorded values. |  | Ticket/product switches, cutoffs, and restrictions are unchanged. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

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
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* Enable `enable_venue_policy_customer_self_refunds` for the organization. In **Admin → Venues → Venue customer refund policies**, find or add its record. In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Allow customer refunds for tickets = on**, **No cutoff**, all three delivery/fulfillment/check-in restrictions **on**, **Refund eligible items independently**, ShippingRule's shipping choice, and **Automated return refund type = Base refund**. Record original values.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Automated return medium = Organizer Credit**. In **Admin → Venues → Venues**, save **Enable itemized calculations = on** before creating the event. In **Dashboard → Organization → Organization → Shipping & Fulfillment**, save **Fulfillment features enabled = on** and **Enable shipping quantity threshold = off**. Record prior values.
* In **Dashboard → Build → Events → All events**, create a published single-day event at least seven days ahead with public sales open. Create a General Admission ticket priced **10.00**, inventory **10**, with **Basic info → Allow customer-initiated refunds = on**. In **Delivery & transfers → Ticket Delivery Methods**, keep **Standard Shipping** as the only method, set **Shipping & Handling Fee = 8.00**, **Fee Method = Flat rate**, and leave **Override basket delivery shipping with this ticket's shipping cost** off. Save before any sale; shipping prices lock after sales. No package, seat, discount, payment plan, gift card, or credit is included.
* As the buyer, purchase quantity **2** with an approved refundable card payment; select **Standard Shipping** and a delivery address you control. Confirm checkout charges shipping **8.00 once**. Record both ticket barcodes, the receipt, order reference, original per-ticket tax, shipping tax, customer-paid fees, and opening Organizer Credit balance. Obtain separate tax values from the saved financial details or the authorized finance owner before calculating expected totals; a combined Tax line alone is insufficient for nonzero shipping-tax proof. The new purchase must support individual ticket amounts; an assistance message is not a successful shipping calculation.
* UnshippedOnly: in **Dashboard → Transactions → Fulfillment**, find the first recorded barcode, set **Fulfillment status = Fulfilled**, select **Update → Confirm**, and reopen to confirm it. Leave the second ticket **Unfulfilled**. Keep both unscanned and untransferred; no physical shipment is required to prepare the saved fulfillment state.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and open the purchased order. | Recorded order | Both recorded tickets are paid. |
| Open Return order. |  | The two tickets can be selected separately. |
| Select only the first recorded ticket. | First ticket from ShippingRule | Only that ticket contributes to the preview. |
| Read the amount breakdown. | Subtotal 10.00; original per-ticket tax; first shipping/tax amounts from ShippingRule | Shipping, shipping tax, and excluded fees match the selected rule; zero shipping rows may be omitted. |
| Record the total and destination message. | Expected total = 10.00 + original per-ticket tax + allowed shipping + allowed shipping tax | The preview equals the independently calculated total and identifies Organizer Credit. |
| Select Next. |  | Confirmation shows the same total and destination. |
| Select the confirmation option acknowledging the return. | Displayed acknowledgement | Return Order becomes available. |
| Select Return Order once. | First preview | The return succeeds. |
| Select Done. |  | The order reopens with only the first ticket returned. |
| Open Account → Credits → Organizer Credits. | Opening balance and first preview | Credit for this organization increased by exactly the first preview. |
| Reopen the same order in My Orders and open Return order. | Remaining ticket | The returned ticket cannot be selected again. |
| Select the remaining ticket. | Second shipping/tax amounts from ShippingRule | The preview contains only its 10.00 price, its tax, and the allowed remaining shipping/tax. |
| Record the second total. | Second independently calculated total | Shipping already returned is not included again; UnshippedOnly does not release the fulfilled ticket's excluded share. |
| Select Next. |  | Confirmation matches the second preview. |
| Select the acknowledgement. |  | Return Order becomes available. |
| Select Return Order once. | Second preview | The remaining ticket is returned. |
| Select Done. |  | Both tickets show returned. |
| Open Organizer Credits again. | Opening balance plus both previews | The total balance increase equals the sum of both previews. |
| As the employee, find the original order in Dashboard → Transactions and open its related return/credit records. | Recorded order, two previews, receipt | Combined adjustments equal both previews and neither ticket was returned twice. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Preserve the original purchase and all return/credit records. Several adjustment records may represent one customer return; reconcile their sum rather than assuming exactly two records.
* Restore the original policy, shipping, and Venue settings. Keep the ticket type and its locked delivery pricing as purchase evidence; do not delete paid or returned orders.

### TC-3: My Orders - Refunds - Return the fees allowed by Automated return refund type

**Description:** Return one new ticket using the saved refund type and method. Compare the preview and completed return to the original purchased amounts, including which fees remain with Showpass and which the customer receives. Run each ReturnMedium with each RefundType: six runs on separate orders.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| ReturnMedium | Automated return medium |
| --- | --- |
| OriginalPayment | Revert Funds |
| OrganizerCredit | Organizer Credit |

| RefundType | Automated return refund type |
| --- | --- |
| Base | Base refund |
| ExcludeShowpass | Full refund excluding Showpass fees |
| Full | Full refund (Showpass fees invoiced) |


| RefundType | Expected amount with shipping excluded and all fees customer-paid |
| --- | --- |
| Base | Purchased item subtotal plus its item tax; customer-paid fees and their taxes excluded. |
| ExcludeShowpass | Base amount plus customer-paid organizer fees and their taxes; customer-paid Showpass/processing fees retained. |
| Full | Full original customer-paid total; the organizer remains responsible for invoiced Showpass fees. |

**Tags:** my-orders, refunds, fees-and-taxes

**Parameters:**
ReturnMedium: OriginalPayment, OrganizerCredit
RefundType: Base, ExcludeShowpass, Full

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**. The employee checking an original-payment refund can view that organization’s gateway refund record.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* Use saved ordinary fee rules with positive customer-paid organizer fees, Showpass fees, and processing fees. No fees are absorbed by the organizer, and there is no commission, shipping, discount, protection, credit, gift card, or payment plan. Record the separate original fee/tax amounts from the saved fee rules and financial records; do not change a shared rate card to prepare this run.
* In Build → Events → All events, create a published future event with public sales open and one General Admission ticket at 20.00, inventory 10; save Basic info → Allow customer-initiated refunds on. Keep Electronic Ticket delivery.
* On Customer refunds, save the selected ReturnMedium and RefundType, No cutoff, barcode refunds on, and Never refund shipping. Buy one ticket by an approved refundable card through the event’s public checkout. Use a fresh order for each run.
* Record the original paid total, item subtotal, item tax, each customer-paid fee and its tax, card payment reference, and opening Organizer Credit. Calculate the expected amount from the table before opening Return order. Keep the ticket unscanned, unfulfilled, untransferred, and off resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open Account → My Orders and the purchased order. |  | The correct paid ticket is present. |
| Open Return order and select the ticket. | Quantity 1 | The preview shows only this purchased ticket. |
| Compare the fee and tax breakdown with the original values. | RefundType table | Refundable fees and excluded fees follow the selected refund type; organizer-absorbed costs are not charged to the customer. |
| Compare the total and refund destination. | Independent expected amount; ReturnMedium | Both the amount and the original-payment or Organizer Credit message match the selected row. |
| Select Next. |  | Confirmation shows the same amount and destination. |
| Choose a listed return reason. |  | Return Order becomes available. |
| Select Return Order once. |  | The return succeeds for the reviewed amount. |
| Select Done and reopen the order. |  | The selected ticket is returned and cannot be selected again. |
| Inspect the destination evidence listed for ReturnMedium. | OriginalPayment: original gateway refund record. OrganizerCredit: Account → Credits → Organizer Credits. | Exactly the expected value is returned to the selected destination; no additional payment refund or new credit is created. |
| As the employee, open the original order and related return in Dashboard → Transactions. | Original receipt and expected fee treatment | The returned amount, fees, taxes, and linked payment/credit records agree with the selected refund type. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.
* Preserve the original purchase, completed refund/credit, and fee calculation. A pending provider refund is not a completed money-return result.

### TC-4: My Orders - Refunds - Review a new amount or refund method before confirming

**Description:** A customer reaches confirmation, then an employee changes the refund method or type. The old confirmation must be rejected even when changing only the destination leaves the total unchanged. Review the refreshed preview and Cancel.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| Change | Starting values | Employee change | Expected refreshed preview |
| --- | --- | --- | --- |
| ReturnMedium | Revert Funds; Base refund | Select Organizer Credit. | Same amount; destination is Organizer Credit. |
| RefundType | Revert Funds; Full refund (Showpass fees invoiced) | Select Base refund. | Customer-paid fees excluded; total lower by those original fees and taxes. |

**Tags:** my-orders, refunds, edge-case

**Parameters:**
Change: ReturnMedium, RefundType

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**. Use separate employee and customer sessions.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* Prepare a published future event with one 20.00 General Admission ticket, inventory 10, Electronic Ticket delivery, and Allow customer-initiated refunds on. Use saved rules charging a positive customer-paid fee; no discount, shipping, existing credit, gift card, plan, or package is included.
* Save the Starting values from Change, then buy one ticket by refundable card. Record the original order, fee breakdown, payment record, and opening Organizer Credit. Keep it unscanned, unfulfilled, untransferred, and off resale.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open the order in My Orders and select Return order. |  | The paid ticket is selectable. |
| Select the ticket and record the displayed total, fee breakdown, and destination. | Starting values in Change | The preview shows the starting refund method and type. |
| Select Next and choose a return reason; leave confirmation open. |  | Return Order is available for the original preview. |
| As the employee, open Customer refunds and make the change in the table. | Change | The new method or type is displayed. |
| Select Save and reopen Customer refunds. |  | The changed choice is saved. |
| As the buyer, select Return Order once on the original confirmation. |  | The old confirmation is rejected; no successful return is shown. |
| Read the refreshed selection and preview. | Change | The current destination/type and recalculated amount replace the old preview; it is not resubmitted automatically. |
| Select Cancel. |  | No new return is submitted. |
| Reload the order and Organizer Credits; as the employee inspect its Transactions record. | Opening payment and credit values | The ticket remains paid; no payment refund, credit, or return adjustment was created. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

### TC-5: My Orders - Refunds - Reject an old preview after Shipping refund rule changes

**Description:** The customer previews a return that includes shipping. The employee then saves Never refund shipping. The old confirmation must not return that shipping; the refreshed amount must exclude it.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** my-orders, refunds, edge-case

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Transactions**. Use separate customer and employee sessions.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, both **Allow customer refunds for tickets = on** and **Allow customer refunds for products = on**, **No cutoff**, **Allow customer refunds after barcode delivery = on**, the fulfillment and check-in switches **off**, **Refund eligible items independently**, **Automated return medium = Organizer Credit**, **Automated return refund type = Base refund**, and **Shipping refund rule = Never refund shipping**.
* Save Organizer Credit, Base refund, Refund shipping proportionally, and Allow customer refunds after fulfillment or shipping on. In Admin → Venue enable itemized calculations before creating the event.
* In Organization → Shipping & Fulfillment, turn Fulfillment features enabled on and shipping quantity threshold off. Create a new published future event and one 10.00 ticket with its refund switch on. Under Delivery & transfers set Standard Shipping only, Shipping & Handling Fee 8.00, Fee Method Flat rate; leave basket delivery override off and save before any sale.
* Buy quantity 1 by refundable card, with a controlled shipping address. Record the original 8.00 shipping charge, its separately established tax, the paid order, original Organizer Credit, and independently calculated starting return. Keep the ticket unfulfilled, unscanned, and untransferred.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the buyer, open the order’s Return order and select its ticket. |  | The preview includes the original shipping charge and applicable shipping tax. |
| Select Next and choose a reason; leave confirmation open. |  | Return Order is available for the original amount. |
| As the employee, save Shipping refund rule = Never refund shipping and reopen Customer refunds. |  | Never refund shipping remains saved. |
| As the buyer, select Return Order once. |  | The old amount is rejected without completing a return. |
| Inspect the refreshed preview. | Original total minus 8.00 and its original shipping tax | The new preview excludes shipping and its tax. |
| Select Cancel and reopen the order. |  | The ticket remains paid. |
| Inspect Organizer Credit and, as the employee, the transaction. | Opening values | No new credit or refund was created. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

## Risk Areas

* Shared shipping or fee value could be returned twice across partial refunds.
* Preview, final customer balance, and financial components may disagree.
* A selected fee class may not have been charged on this order; check its receipt.

## Minimum Execution Set

1. TC-1: each ReturnMedium, RefundType and ShippingRule combination; 24 settings runs, still only form coverage.
2. TC-2: all four rules on separate two-ticket orders; independently record original shipping and shipping tax.
3. TC-3: all six refund method/type pairs; customer-paid organizer, Showpass and processing fees must be known and positive so the refund types are distinguishable.
4. TC-4: both method and refund-type changes after confirmation opens; no completed return or credit.
5. TC-5: shipping-rule change after preview, rejected old confirmation, then Cancel.

These are current local drafts, not newly published or executed Qase cases. TC-1 replaces the old SPT-5308 setup choices. Financial cases require independently established purchase components and permitted payment/credit evidence; missing setup remains Blocked. The older dated prediction worksheet is preserved as history, not current selectable options or execution proof.

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
