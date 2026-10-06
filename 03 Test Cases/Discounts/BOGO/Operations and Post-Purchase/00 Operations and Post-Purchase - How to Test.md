---
title: "Operations and Post-Purchase \u2014 How to Test"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# Operations and Post-Purchase — How to Test

The refund choice **Base refund** uses the employee permission named **Full Refund** (administer_full_without_charges_refunds); the choice label and permission label differ.

The purchase is complete only when money, saved order, issued tickets, inventory, delivered receipt and reporting agree. Use separate approved orders for Refund, Void, Exchange and Transfer. These actions change test data; Refund/Exchange can move money or credit. None was executed.

## Permissions and start locations

| Action | Required access |
| --- | --- |
| Transaction read / totals | Administer Transactions; View Transaction Totals for totals |
| Base refund used here | Administer Transactions plus Full Refund (administer_full_without_charges_refunds); Cash orders additionally need Administer Cash Refunds |
| Other refund choices | Partial Refund; Full Refund + Org. Fees + Commissions; Full Refund + Org. Fees + Commissions + Showpass Fees (Fees Invoiced); or the company-only permission — bind the selected refund choice using refund_type_permissions.py |
| Paid Void | Transaction or Box Office access plus Void Items and Void Paid Items; a Void is not a Refund |
| Reports / download | Manage Reports |
| Exchange | Transaction authorization and the selected event's supported Exchange enablement; exact exchange-control path and current additional permission requirements must be bound before a Qase case is promoted |
| Transfer | Purchasing customer owns a ticket that offers Transfer; record permitted recipient/acceptance policy |

Open Dashboard → Transactions, search the recorded order, then choose the distinct permitted action. For customer ownership/delivery, open My Orders for that customer. Inspect event availability through Manage Events. Reports begin at Dashboard → Reports; use the actual report name supplied by the run owner rather than inventing a new BOGO report.

## Financial interpretation

BOGO reuses automatic Apply to each financial behavior. When splitting is off, a $40 saved amount for three identical $20 tickets can be distributed proportionally with currency rounding. Do not promise a $0 refund for a particular barcode. No qualifier-linked clawback is introduced: refunding a Buy ticket does not create a new charge for an untouched ticket.

Usage follows each saved group's remaining included tickets: new count = min(original rewarded count, remaining count), independently per discount. For an unsplit group with one reward and three tickets: remove one → count remains one; remove all → count zero. A split group can release differently. Transfer may move ownership through existing representation; do not infer release from the action name.

## How to test the remaining operations

| Action | Preparation and exact proof | Coverage disposition |
| --- | --- | --- |
| Exchange | Independent unscanned order; record selected item’s saved exchange value and a $30 replacement; preview must use saved value, positive amount owed is $30 minus that value plus actual configured adjustments; complete once, reopen old/new order, compare validity, customer, stock, credit and reports | Backend/integration planned; manual Qase blocked on supported Exchange configuration/control and independent saved-value read |
| Transfer | Independent customer-owned transferable order; Customer My Orders → selected ticket → Transfer; use controlled recipient; follow offered send/accept steps; reopen both accounts and prove only intended ownership/validity changes, unchanged financial history and no duplicate tickets | Manual charter; exact transfer offer/recipient policy must be supplied before copying to Qase |
| Usage release | Compare report before/after separate full Refund and full Void; create another qualifying basket after release; partial unsplit changes use cap behavior above | TC-O02/O03 plus backend integration; actual report and expiry setup required |
| Failed Refund/Exchange, uncertain result, retry | Engineering-controlled failure and original references; do not retry an unknown payment outcome; prove one adjustment/credit and untouched controls | Controlled integration, Blocked until fault injection and provider evidence are provided |
| Fees/tax/credits/shipping | Bind same settings as equivalent automatic discount; independent worksheet and saved allocation/earnings; merchandise discount is not a universal fee waiver | Backend matrix planned; nonzero configurations need worksheet; shipping requires a supported separate item/delivery setup |
| Admission | Delivered tickets for baseline order; scan each through supported Check In; inspect duplicate rejection and old validity after adjustments | Manual-only; approved device/scanner and Check In permissions required; not inferred from delivery |
| Historical switch-off | After owned promotion is disabled, reopen completed order/receipt/report: saved money/tickets remain; editable basket recalculation must remove BOGO | TC-O04 and backend tests; global switch changes reserved for isolated release owner |

Minimum execution: TC-O01 reconciliation → TC-O02 separate Refund → TC-O03 separate Void → TC-O04 disabled-history read. Finish with adjustment reports and control-order comparison. Preserve complete financial history; restore only owned settings.

Sources: [refund choice labels](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/constants/refunds.py>); [discount_usage_adjustment_service.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/discounts/discount_usage_adjustment_service.py>); [refund_type_permissions.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/refunds/refund_type_permissions.py>); [employment.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py>); [invoice_items.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_items.py>); [test_buy_get_csv_exports.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_buy_get_csv_exports.py>); [test_discount_usage_stats_csv.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/csvs/test_discount_usage_stats_csv.py>). Shared case details are in [[03 Test Cases/Discounts/BOGO/Operations and Post-Purchase/SPW-20178-financial-lifecycle]].
