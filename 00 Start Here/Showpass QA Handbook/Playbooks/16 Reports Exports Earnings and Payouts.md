---
title: Reconcile Transactions Reports Earnings and Payouts
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Reconcile Transactions Reports Earnings and Payouts

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Organizer and authorized Venue Employee can explain what was sold, refunded, credited, allocated, and owed. Reports and exports must represent the right records, dates, Venue, and financial meaning—not merely download a non-empty file.

Gross Customer charges, Organizer earnings, fees/taxes, revenue realization, and payouts are different amounts. Compare equivalent definitions and time windows before calling two totals inconsistent.

## Build a small known ledger

Use owned test orders: one ordinary Card sale, Cash/Other where supported, a quantity-two sale with one-item Refund, a separate Void, Exchange/credit, and Package or Membership when relevant. Record original references, quantities, independent expected amounts, payment method/account, adjustment timing, and applicable accounting policy. Include a control order outside the selected Event/date filter.

Determine the exact report type and supported format before execution. Capture report date basis/timezone and whether it includes pending, invalidated, or adjusted items. Do not invent a universal “net revenue” formula.

## Transactions → report → actual file → earnings

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As an authorized Venue Employee, open Transactions and find each prepared order and adjustment. | Known reference list | Exact original/adjustment records are present, with correct quantities and final state. |
| 2 | As the Organizer or authorized Employee, open the supported report builder. Select the report, Event, date range, filters, and supported output format. | Recorded report definition and expected included references | Filters save/apply correctly. The control order is excluded for the intended reason. |
| 3 | Generate the report and wait for its actual file or approved test email. Open the file. | CSV/PDF/XLSX supported for that report | Correct Venue, headers, rows, currency, dates, and totals. “Report generated” or “email queued” alone is insufficient. |
| 4 | Match every included reference and adjustment to the prepared ledger. | Expected quantities and money by definition | No missing/duplicate order, Package child double counting, dropped fee, wrong payment method, or unaccounted adjustment. |
| 5 | Compare the corresponding earnings/allocation view using equivalent scope and definitions. | Package/Membership realization rules where relevant | Differences are explained by the agreed accounting rules, not dismissed because the Customer total matched. |
| 6 | Where authorized test data exposes settlement/payout status, inspect it without initiating payment. | Supported test settlement/payout record | Correct payee, account, amount, and state; Cash/Other or Gift Card redemption does not create duplicate payable money. |

## Senior-QA reconciliation passes

- **Date boundaries:** an order just inside/outside the range, Venue timezone versus UTC, purchase before midnight and Refund after midnight. Know which date each report uses.
- **Pagination and volume:** a controlled count spanning pages/export batches; compare exact unique references, not only row count.
- **Small amounts:** fee/tax rounding, quantity greater than one, fully discounted/zero-price children, included/excluded taxes, internal and absorbed fees.
- **Historical/current configuration:** report an old order after a supported fee/account change. Historical amounts must not be silently recalculated from today's settings unless that report explicitly does so.
- **Saved reports:** save and reopen filter configuration, regenerate it, and verify current intended filters. A saved report name is not a snapshot guarantee.
- **Failure:** controlled job/attachment failure remains visible and safe to retry; retry does not change the underlying ledger.
- **Authorization:** a restricted Employee cannot retrieve another Venue's report or financial export, including an existing file link.
- **CSV content:** commas, quotes, newlines, Unicode, leading-zero identifiers, and spreadsheet-formula-looking user text follow the supported escaping/security policy.

Mask Customer data in evidence. Never run a real payout or alter settlement entries to make totals agree. Escalate unexplained money differences with original order/adjustment/file references.

**Source route:** B3, B8–B12, B19, B20. Report registry determines format support; generation can be asynchronous.

## Source-backed cautions and automation reference

**Business risk:** the UI sale is correct but finance sees incorrect totals, omits transactions, pays twice, or exports misleading values.

**Automation:** Playwright actual download/content assertions for a small deterministic ledger; backend financial projection/report/settlement tests for broad permutations. A report smoke test cannot prove payout logic. Production payouts remain out of scope without explicit authority. Source route: B12, B20, B8–B11.
