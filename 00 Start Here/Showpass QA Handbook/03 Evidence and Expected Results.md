---
title: Evidence and Expected Results
date: 2026-10-01
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Evidence and Expected Results

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Build expected results that can catch a wrong system

### Money worksheet

Prepare this from the saved configuration and authoritative pricing/refund rules, not from the displayed total. Use the actual currency and rounding rules; distinguish per-unit, per-item-group, and per-order amounts.

| Component | Expected basis | Where to compare |
| --- | --- | --- |
| Items and quantity | Price × eligible quantity; package allocation recorded separately | Selection, basket, saved purchased items |
| Discount | Eligible items; flat/percentage; once versus each; ordering and rounding | Basket and invoice allocation |
| Customer-paid fees | Fee type, scope, eligible item, quantity, exclusions | Customer total and saved fee lines |
| Absorbed/internal fees | Who bears each fee and where it is recorded | Saved allocation, organizer earnings, Showpass earnings |
| Taxes | Taxable component, rate, fee-tax rules, rounding | Checkout, invoice, refund, reporting |
| Money credits | Opening balance, debit/credit, restrictions, remaining balance | Credit history and saved order |
| External payment | Amount actually taken by each supported payment method | Provider/reference or approved financial record |
| Post-sale adjustment | Cash returned, credit created, fees retained/reversed, replacement items | Refund/exchange records and original order |
| Earnings / settlement | Contractual allocation, deductions, realization, advance/redemption rules | Financial report and settlement evidence |

Example arithmetic **only**, not a universal Showpass formula: two $30 items with a $2 customer-paid fee each, no tax/discount/credit, should collect $64. If a separate $1 per-item fee is organizer-absorbed, the customer can still pay $64 while two $1 costs must appear in the agreed allocation. The customer total alone cannot detect those missing costs. Fill in real rules before using this example as a test.

Do not sum both a package price and its allocated child values as additional revenue. Do not count gift-card purchase money again as new external cash on redemption. Compare collected cash, credits, fees, tax, earnings, and realization on their own defined bases rather than inventing one universal conservation formula.

### Recipient worksheet

For batch fulfillment, preserve the initial eligible-recipient list. Partition every eligible recipient into exactly one result: completed, failed, pending, or explicitly skipped with reason. Ineligible recipients are a separate list. Counts must add up; each completed recipient must have the expected usable items. Compare identities, not just counts: one missing recipient plus one duplicate can leave the total unchanged.

For example, with six eligible customers, four completed, one failed, and one pending accounts for all six but is **not** a fully completed batch. If each successful customer was promised two tickets, inspect eight correct tickets for those four named customers—not any eight tickets in the event.

### Inventory worksheet

Record opening stock/capacity, active basket reservations, sold items, supported holds, released items, and final available quantity using the authoritative rules for that inventory type. For seats, record the exact seat and its final owner. A sales counter, public sold-out flag, and employee seat map are projections that need separate agreement checks; they are not interchangeable ownership evidence.

### Completion deadlines

Agree on the expected final-state deadline for the specific workflow. Use supported expiry settings and service expectations, not an arbitrary sleep or a universal “ten minutes.” If the deadline is exceeded, record pending state, business impact, references, and safe next action. Do not assume retry is safe because the UI timed out.
