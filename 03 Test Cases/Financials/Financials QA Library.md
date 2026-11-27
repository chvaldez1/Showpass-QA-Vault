---
title: Financials QA Library
tags:
  - qa/test-cases
---

# Financials QA Library

Reports, Transactions and Payouts consume the completed sale and adjustment records. Each surface can count a different part of the financial result. [[03 Test Cases/Test Cases by Feature|Test library]]

### TC-1: Reconcile a discounted Package refund across its included Events

**Title:** Dashboard - Reports - Reconcile a discounted Package sale and full refund across included Events

**Description:** Refund one discounted Package that assigns revenue to tickets on two included Events. Generate an Itemized Sales Report for each Event before and after the refund. Use the change in Net Sales to reconcile the two Event shares to the actual return on the customer’s card.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

**Venue and employees**

* Use an isolated Beta Venue in CAD with approved Stripe test payments/refunds. Confirm **Manage Reports**, **Administer Transactions**, and, where separate refund permissions are enabled, **Full Refund + Org. Fees + Commissions + Showpass Fees (Fees Invoiced)**. Ask the setup owner to confirm `enable_reports_nextjs_embed` and `enable_itemized_sales_report_pdf` are on for this Venue and employee. The test account must be able to generate the Itemized Sales Report in PDF and select **Full refund** marked **Showpass fees invoiced**. Resolve any missing prerequisite before refunding.
* Have the setup owner confirm that the Venue assigns Package revenue to child Events and that this Package distributes revenue in proportion to the included ticket prices. Use an already configured fixture. The parent Event sells the Package, and the two included Events are distinct records with their own ticket types. None of these three Events has other sales or refunds in the report interval.

| Record | Required setup |
| --- | --- |
| Parent Event and Package | One preset General Admission Package priced at `$40.00`. It includes one ticket from each of two other Events. The parent pass is not a separate redeemable ticket. |
| Included Event A and Event B | One unscanned included ticket per Event. Both included ticket types have the same configured `$20.00` allocation weight, giving half the parent Package value to each. |
| Discount | Fixed `$10.00`, **Apply to each**, eligible only for the parent Package type. Use it once on the original order. |
| Customer charge | No customer-paid fee, tax, or shipping. No credit, donation, payment plan, protection, prior refund, or standalone ticket on this order. Record any Organizer-paid fees separately. |

**Starting order and independent amounts**

* In **Operations → Box Office → Transactions**, verify a completed approved test-card order already exists for one Package from this setup. Use a controlled Customer whose only refund during the run will be this one. Record their email, the sale reference and timestamp, and each included Event’s exact ticket name. The order must show `$40.00` before discount, `$10.00` discount and `$30.00` paid. In the refund dialog, both included tickets must be eligible on the Package line.
* Calculate both Event shares before starting. Each Event has `$20.00` gross sales, `$5.00` discount and `$15.00` paid value before refund. Each shares `$15.00` of the full refund. Record the Venue’s timezone and a custom report interval covering the original sale and the planned refund.
* Have the setup owner confirm the Beta reporting-sync observation window separately from the five-minute refund-completion check. Record the allowed wait and polling interval. For the baseline, time the window from the original sale. After refund, start a new reporting window from saved refund completion. Use fresh downloads from the same saved reports for each comparison.

**Tags:** dashboard, reports, packages

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Reports**, click **Create report**, and set **Report type = Itemized Sales Report**, **Format = PDF** and **Date range = Custom**. Enter the recorded **Start** and **End**, then select **Save and download** and open the PDF. | Unique **Report name** ending in `Event A`. Use **Search events** to select only Event A. Leave **Select all invoices** off and select **Download** under **Delivery method**. | After the sale is available to reporting, Event A’s PDF shows its included ticket, `$20.00` gross sales, `$5.00` discount, `$0.00` refunds and `$15.00` net sales. |
| Repeat **Create report** with the same format, date range and delivery method for included Event B. | Unique **Report name** ending in `Event B`. Use **Search events** to select only Event B. | After the sale is available to reporting, Event B’s PDF shows only its included ticket and the same gross sales, discount and net sales. Save both baseline files. |
| If the new sale is missing from either PDF, repeat **More actions → Download** on the affected saved report at the recorded polling interval until the reporting deadline. | Same saved report, original sale time and reporting-sync window | Both freshly downloaded baselines show the sale. If either sale is still missing at the deadline, mark reporting inconclusive and stop before refunding. |
| In **Operations → Box Office → Transactions**, open the recorded sale and choose **Refund** from its actions. | Original order reference | **Refund transaction** shows the Package and the two included tickets from the recorded Events. |
| Select the entire Package. Under **Refund option**, choose **Full refund** with **Showpass fees invoiced**. Under **Refund destination**, choose **Original payment source**, then select **Requested by customer** as the reason. | Both included tickets on the same Package order | **Refunding now** is `$30.00`. The amount and the selected tickets match the planned refund. |
| Click **Refund**, then confirm once using **Agree & Process Refund** or **Confirm refund**, as shown. Record the submission time. | Same sale and `$30.00` preview | One refund attempt starts for this sale. |
| Refresh the original transaction in **Transactions** for up to five minutes. | Original sale reference | **Amount refunded** shows `$30.00` and the selected Package tickets for both Events are refunded. If completion is still pending at five minutes, record the last state as inconclusive and stop. Submit the refund only once. |
| Return to **Transactions**. Set **Invoice type = Refund** and search by the controlled Customer’s email. Open the sole result matching the submission time and `$30.00` refund. | Controlled Customer’s email, recorded time, `$30.00` returned | The refund details show one completed `$30.00` refund to the original test card. Record the new refund reference alongside the original sale reference. If the result is missing or cannot be matched uniquely, stop and record the lookup as inconclusive. |
| In **Reports**, select **More actions → Download** for the saved Event A report. Open the just-downloaded PDF and record its download time. | Same Event A and report interval. This download follows the completed refund. | After the refund is available to reporting, the fresh PDF covers only Event A, includes its adjustment in **Refunds**, and shows `$0.00` **Net Sales**, down by `$15.00`. |
| Repeat **More actions → Download** for the saved Event B report. Open the just-downloaded PDF and record its download time. | Same Event B and report interval. This download follows the completed refund. | After the refund is available to reporting, the fresh PDF covers only Event B, includes its adjustment in **Refunds**, and shows `$0.00` **Net Sales**, down by `$15.00`. |
| If a fresh post-refund PDF still shows the baseline amounts, repeat **More actions → Download** at the recorded polling interval until the separate reporting deadline. | Completed refund time and same saved reports | Both fresh PDFs reflect the refund before comparison. If either remains unchanged at the deadline, record the latest files and reporting as inconclusive. |
| Add the two decreases in **Net Sales**. Compare them with the completed refund. | Event A `$15.00`, Event B `$15.00`, recorded refund reference | The decreases total `$30.00` and reconcile to the one recorded refund. Use the change in **Net Sales** because a report’s **Refunds** column can also reflect the reversal of the original discount. |

**Postconditions:** Keep both test transaction references and the private report files for review. Keep the financial records intact. Record the two saved report names for the owner and leave their delivery set to **Download**.

## Proof and sources

**Local draft · Not run.** Compared the complete SPT snapshot (2,492 definitions, 2026-11-26) using Package, child Event, realized revenue, discount, refund and report terms in titles, setup and steps. [SPT-946](https://app.qase.io/case/SPT-946) includes Package revenue realization in its full-refund parameters. [SPT-3761](https://app.qase.io/case/SPT-3761) checks Package inventory and issued items after refund. [SPT-880](https://app.qase.io/case/SPT-880), [SPT-884](https://app.qase.io/case/SPT-884) and [SPT-901](https://app.qase.io/case/SPT-901) check output per report. [SPT-5091](https://app.qase.io/case/SPT-5091) uses a different Package reporting mode. These cases do not isolate one completed discounted sale and refund by reconciling the separately generated included-Event reports.

- Backend `b8dcfa8726db` · `apps/financials/tests/services/revenue_realization/test_revenue_realization_cross_adds.py:42` checks each Event PDF and aggregate values. `:139` sets child realization with proportional allocation and `:348` purchases one discounted Package and runs its full refund. `apps/financials/api/venue_based/serializers/refunds.py:284` includes linked accounting adjustments when refunding the parent. `apps/tickets/reports/financial_breakdown_pdfs/queries/shared_stat_maps.py:60` distinguishes refunded ledger amounts from the report’s refund and discount columns.
- Frontend `5867dd39dcde` · `operations-routes.ts:110` routes staff to **Transactions**. `RefundForm.web.tsx:221` labels the full and base refund choices. `ReportSubmitActions.web.tsx:65` and `useSavedReportsColumns.tsx:100` confirm modern report creation and repeated download. [[03 Test Cases/Reports/reports-qase-test-cases#SPT-880: Itemized Sales Report|Related Itemized Sales Report case]] · [[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts|Financial reconciliation guide]]

## Setup and proof

Prepare known order references and an independent amount ledger. Match event, tender, fee, tax and adjustment direction before comparing report totals or a payout. Use a different Event as an exclusion control.

## Connected features

- [[03 Test Cases/Reports/reports-qase-test-cases]]
- [[03 Test Cases/Transactions/invoice-breakdown-qase-test-cases]]
- [[03 Test Cases/Payouts/payouts-qase-test-cases]]
- [[03 Test Cases/Fees/Fees QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-880](https://app.qase.io/case/SPT-880) · Dashboard - Reports - Verify Itemized Sales Report CSV/PDF contents
- [SPT-881](https://app.qase.io/case/SPT-881) · Dashboard - Reports - Verify Settlement Report CSV/PDF contents
- [SPT-884](https://app.qase.io/case/SPT-884) · Dashboard - Reports - Verify Event Financial Summary PDF contents
- [SPT-894](https://app.qase.io/case/SPT-894) · Dashboard - Reports - Verify Transactions for selected events or products
