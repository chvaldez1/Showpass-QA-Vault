---
title: Shipping sale and refund rows do not balance in Itemized Sales Report
date: 2026-10-29
tags:
  - qa/reporting
  - qa/refunds
status: Confirmed CSV discrepancy; draft not published
---

# Shipping sale and refund rows do not balance

The supplied CSV confirms a $5 difference between **Net Revenue + Adjustments** and **Settlement Amount** on each of the shipping sale and refund rows. The differences cancel across the pair. The report records a $47.92 purchase and matching $47.92 refund; this evidence does not establish an incorrect payment or payout.

Existing issue: [SPW-20827 — Fix shipping adjustments cross-add in Connect itemized sales reports](https://showpass.atlassian.net/browse/SPW-20827). Its sale-side example matches this reporting symptom. The refund row is additional evidence; a shared cause and deployed fix status are not confirmed. Keep this as supporting material for that issue unless investigation establishes a separate defect.

## BUG-01 — Copy-ready QA report

**Draft only — no Jira issue or comment has been created.**

**Title:** fix (itemized sales report) | Shipping sale and refund rows do not balance

**GIVEN** an order contains **2 × $20 tickets**, **$5 shipping** and **$2.92 tax**, totaling **$47.92**, and the full **$47.92 is refunded, including shipping**, with Refund Type **Full refund (Showpass fees invoiced)**.

**WHEN** I open the exported **Itemized Sales Report** and add **Net Revenue + Adjustments** for the sale and refund rows.

**THEN** the sale row adds up to **−$5.00** and the refund row adds up to **$5.00**, even though both show a **$0.00 Settlement Amount**. Both calculations should equal the displayed settlement amount.

**Impact:** The Organizer cannot reconcile the individual sale and refund rows, even though the combined $5 differences cancel.

**Evidence:** October 29, 2026 export; **MEGACON Orlando → TEST**, ticket type **shipping**, sale reference **16-dcdf-49af-9453-edc3dc207500**, CSV rows **3–4** (header is row 1). Review was performed on the supplied CSV; no live purchase, refund or payout was executed during this investigation.

## Internal evidence and verification limits

| Row | Net Revenue | Adjustments | Net Revenue + Adjustments | Settlement Amount |
| --- | ---: | ---: | ---: | ---: |
| Sale | $39.20 | −$44.20 | **−$5.00** | $0.00 |
| Refund | −$40.00 | $45.00 | **$5.00** | $0.00 |

With the displayed Net Revenue and $0 settlement, the matching Adjustments would be **−$39.20 for the sale** and **$40.00 for the refund**. Shipping remains recorded separately under **Shipping & Handling Fees**.

- Source file: [Itemized Sales Report supplied by the user](</Users/christianvaldez/Downloads/Itemized-Sales-Report-29-10-26T3208.csv>). Preserved unchanged. Customer contact and card details are intentionally omitted from this note.
- Sale reference: `16-dcdf-49af-9453-edc3dc207500`; refund reference: `d9-c855-4e35-aea1-198c87e23247`.
- Event **649250 — TEST**, Venue **2241 — MEGACON Orlando**, ticket type **1627755 — shipping**. These IDs identify evidence, not reusable setup requirements.
- Purchase source is **Web**. The export does not establish whether its host was Beta or production, the employee permissions, the selected report filters or deployed revisions. Do not add those as verified prerequisites.
- Row 2 is the no-shipping comparison: $39.20 Net Revenue + −$39.20 Adjustments = $0 Settlement Amount. This row balances; it does not prove every non-shipping order is unaffected.
- Row 3: $47.92 − $0.80 Showpass fees − $2.92 tax − $5 shipping = $39.20 Net Revenue.
- Row 4: −$47.92 + $2.92 tax + $5 shipping = −$40 Net Revenue.
- Shipping & Handling Fees is **−$5 on the sale** and **$5 on the refund**. Gross Sales of $47.92 and Refunds of −$47.92 cancel. Account Credit Refunds is $0; this is not evidence of an Organizer Credit refund.
- Local source reviewed: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/queries/invoice/item_export.py`, financial annotations and adjustment expressions. Displayed Net Revenue subtracts shipping. A guarded Connect sale correction reverses displayed Net Revenue instead of an amount that still includes shipping.
- Local source reviewed: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/queries/invoice/test_item_export.py`, `test_annotate__confirmed_connect_shipping__corrects_only_adjustments`. It establishes the sale-row cross-add expectation for its confirmed application-fee setup. Tests were read, not run.
- Report wiring reviewed: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/csvs/invoice_items.py`. The sale correction is passed through a global switch; the export does not prove that switch's deployed state or the order's application-fee evidence. The refund's exact code path remains unverified.
- Jira read on October 29, 2026: SPW-20827 is **Complete**, priority **Medium**. Its description explicitly requires affected Connect sale rows to satisfy Net Revenue + Adjustments = $0 Settlement and preserves refund behavior unless a separate defect is demonstrated. Complete does not establish that the fix was active for this export.

## Internal PR history review — October 29, 2026

**Finding:** The original introducing PR is not confirmed. The affected calculation predates the recent customer-refund work. Do not assign the bug to a PR merely because blame points at a refactor or because it introduced one of the current conditions.

Reviewed backend `develop` at `2f7515c35e5e92375ecef0a0221a91c55b11f526` using focused file history, copy-aware blame and historical source. The user requested PR attribution; no branches were switched, fetched or edited.

| PR | Verified role | Attribution limit |
| --- | --- | --- |
| [#9034 — SPW-19128 application-fee itemized-sales adjustment](https://bitbucket.org/showpass/web-app/pull-requests/9034) | Merged May 29, 2026, commit `80543fee3591789811868c2cb61e9bffee2aa79c`. Added the confirmed-application-fee custom-gateway condition whose adjustment excludes taxes/Organizer fees but does not subtract shipping. | The parent already subtracts shipping from displayed Net Revenue while its earlier custom-gateway adjustment also omits a shipping deduction. That earlier adjustment additionally includes company earnings. Thus #9034 introduced the current branch, but is not proven to have introduced the underlying shipping mismatch. The actual saved inputs and deployed build for this export are not verified. |
| [#11595 — shared invoice-item export ownership](https://bitbucket.org/showpass/web-app/pull-requests/11595) and [#11839 — invoice CSV projection query](https://bitbucket.org/showpass/web-app/pull-requests/11839) | September 2026 refactors moved the relevant existing expressions into the current query location. Copy-aware blame traces the application-fee condition through those moves to #9034. | A file move is not evidence that the shipping error started there. |
| [#12017 — SPW-20827 shipping report fix](https://bitbucket.org/showpass/web-app/pull-requests/12017) | Merged October 5, 2026, commit `552dfdf21ebca7fc87a9ab768869c81e0a52f1d2`. Adds the guarded correction for qualifying Connect sale rows. | This is a fix, not a demonstrated introducing PR. Its global-switch state, application-fee qualification and active code in the exporting environment are unknown. It does not establish a fix for the supplied refund row. |
| [#12022 — SPW-20835 report alignment](https://bitbucket.org/showpass/web-app/pull-requests/12022) | Merged October 6, 2026; extracts/reuses financial annotations and presents shipping with deduction signs. | The Net Revenue shipping deduction and application-fee adjustment were present before this PR. No evidence from this investigation makes it the origin of the observed difference. |

The earlier code proves that the two expressions already treated shipping differently; it does not prove the earlier live report failed for the exact same stored order. No historical report was executed, no database state was inspected, and no deployed build or switch was verified. Historical source lineage is verified; original live regression attribution remains inconclusive. Keep this analysis outside the copy-ready Jira draft.

## Classification and repeatable check

- **Proof target:** Individual Itemized Sales Report rows agree with their displayed Settlement Amount under the report's documented accounting rule.
- **Confidence:** Confirmed exported-report arithmetic discrepancy. Root cause, fix activation and any wider refund impact remain unverified.
- **Severity:** Proposed Medium for misleading individual report rows. No incorrect customer return or actual payout is established.
- **Data safety:** No data change. Read-only file, local source and Jira review; no browser or database inspection, refunds, flag changes or settlement edits.
- **Cleanup:** No temporary files or test records created. User-owned CSV preserved.
- **Release classification:** Reporting reconciliation proof target fails for the supplied rows. Broader payment/refund/payout correctness and whether a deployed fix resolves this are blocked by missing live evidence; this is not a release pass or evidence of lost money.

To repeat the verified check without changing Showpass data:

1. Open the linked user-supplied CSV and locate sale reference **16-dcdf-49af-9453-edc3dc207500** in **Sale Transaction ID**.
   - **Expected:** The original sale and its refund are present.
   - **Actual:** Rows 3 and 4 contain the linked sale/refund; verified from the CSV.
2. Add **Net Revenue** and **Adjustments** separately on each row, then compare with **Settlement Amount**.
   - **Expected:** Both sums equal the displayed $0 settlement.
   - **Actual:** The sale sum is −$5 and the refund sum is $5; verified from the CSV.
3. Compare the sale's **Gross Sales** and the refund's **Refunds**, and inspect **Shipping & Handling Fees**.
   - **Expected:** The full refunded customer amount and shipping reversal agree with the original sale.
   - **Actual:** $47.92 and −$47.92 cancel; shipping is −$5 and $5. This is report evidence, not independent gateway verification.

Fresh export after confirmed deployment/switch state: **Not run**. No further user check is required to use this draft; any fix verification should preserve this original export and obtain a fresh report rather than editing financial records.
