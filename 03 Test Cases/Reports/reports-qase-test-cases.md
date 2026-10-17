---
title: Reports — Qase-ready cases and coverage gaps
date: 2026-10-16
tags:
  - qa/test-cases
  - qase
  - reports
status: Published to Qase and readback verified; product execution pending
---

# Reports — Qase-ready cases and coverage gaps

**A case per report is useful when it proves that report’s actual selectors, supported format and file contents.** At baseline, suite 101 contained 50 cases; 33 descriptions used generic boilerplate and 23 cases had only one generic generation step. The result below is **43 published existing-case enhancements, two new conditional-report cases and one focused over-limit email case**. All 46 definitions were saved to Reports (101) and read back in full. Suite 101 now contains 53 direct cases. No case was deleted or moved, and no live report was saved, generated, emailed or scheduled during this work.

The scope is the **legacy Dashboard → Reports** form currently open at `/dashboard/reports/`, its report-type-specific controls and exported result. The over-limit case includes its actual email completion, while general recurrence remains a separate workflow review. Backend source defines **40 report types**; the inspected session exposed **38**. Base Ticket Revenue Report and Event Settlement Report are source-backed conditional additions. New Next.js form parity, actual financial reconciliation, general scheduled delivery and release readiness are not inferred from this read-only review.

**Keep separate:** Product Summary CSV/PDF, Event Summary CSV/PDF, Ticket Scan History CSV/PDF and Marketing Campaign Detail CSV/PDF have different file meanings or controls. **Propose consolidating:** SPT-895 into SPT-894’s Event/Product runs, and SPT-893 into SPT-891’s event-ticket/product runs. Membership shipping remains SPT-892 because it includes Will Call/Pick Up. No duplicate is deleted or silently retired.

**Held:** SPT-890’s existing discount-count expectations conflict with current query logic. SPT-900’s 60-event direct-download proof and SPT-5516’s 61-event email proof preserve the existing boundary intent in distinct cases; that split was approved and published together. Shared workflow cases 4050/4795/4796/5124 remain intact and their gaps are accounted for after the report cases. Proposed corrections to SPT-917 and SPT-919 explicitly remove controls/formats that source and the inspected UI do not offer; those exact changes were approved, published and readback verified.

## Case index

Click a case heading below to read one report’s standalone setup, field list, columns and expected result. All updates stay in their existing suites unless separately authorized; all three new cases were published to Reports (101).

| Report / behavior | Existing case or local draft | Why it earns a separate execution |
| --- | --- | --- |
| Itemized Sales Report (CSV/PDF) | [[#SPT-880: Itemized Sales Report\|SPT-880]] | The selected sale and adjustment records are included, the other-event control is excluded, and line values and totals match the recorded ledger |
| Settlement Report (CSV/PDF) | [[#SPT-881: Settlement Report\|SPT-881]] | Only sales attached to the selected settlement invoices appear; Settlement Date and proceeds agree with those saved payouts, and the unselected settlement is absent |
| Advance Report (CSV/PDF) | [[#SPT-882: Advance Report\|SPT-882]] | Only the selected advance’s financial rows appear; Advance Date and the advance amount match its saved invoice |
| Payment Type Breakdown (PDF) | [[#SPT-883: Payment Type Breakdown\|SPT-883]] | The chosen method and the control method have separate correct totals under the purchase platform and item breakdowns |
| Event Financial Summary (PDF) | [[#SPT-884: Event Financial Summary\|SPT-884]] | The PDF identifies only the selected event and reconciles its displayed sales, discounts, refunds, fees, taxes, net revenue and settlement figures against the ledger; event totals are not duplicated for separate payment methods. |
| Ticket Type Financial Summary (PDF) | [[#SPT-885: Ticket Type Financial Summary\|SPT-885]] | The selected event’s ticket types appear separately; each type’s financial values match its own ledger and their displayed subtotals reconcile to the event total without another event’s sales. |
| Product Summary (PDF) | [[#SPT-886: Product Summary\|SPT-886]] | The PDF names the selected product, shows the selected variant breakdown and reconciles its displayed inventory, sold quantities, revenue, refunds, fees and settlement amounts with those records |
| Product Summary (CSV) | [[#SPT-887: Product Summary\|SPT-887]] | Each selected product has its own row and correct quantities; the two products’ money and inventory are not combined into one product |
| Existing settlements in event/product summary PDFs | [[#SPT-888: Event Summary\|SPT-888]] | The selected summary includes the recorded settlement in its financial breakdown, with the correct sign and amount, without adding it to sales a second time |
| Marketing Campaign Summary (CSV) | [[#SPT-889: Marketing Campaign Summary\|SPT-889]] | Only selected campaigns appear; campaign/source/medium and Items Sold match the known attributed orders |
| Shipping Fulfillment Stats (CSV) | [[#SPT-891: Shipping Fulfillment Stats\|SPT-891]] | Only eligible Standard Shipping orders for the selected item appear; Will Call and electronic-delivery controls are excluded |
| Shipping Fulfillment Stats (CSV) | [[#SPT-892: Shipping Fulfillment Stats\|SPT-892]] | Both eligible Standard Shipping and Will Call/Pick Up memberships appear, with the correct membership group, level, member/order, quantities and fulfillment details; a membership delivery rule is not replaced by the event-ticket shipping-only rule. |
| Transactions (CSV) | [[#SPT-894: Transactions\|SPT-894]] | Every matching invoice appears once with its correct transaction type, payment method, customer and whole-invoice money |
| Customers and Employees (CSV) | [[#SPT-896: Customers and Employees\|SPT-896]] | The event/ticket-type selections include only the correct customer/employee records; each identity, contact field, employee/seller value and chosen count matches the record |
| Will Call (CSV) | [[#SPT-897: Will Call\|SPT-897]] | Only the selected event/type/status tickets appear |
| Ticket Sales History (PDF) | [[#SPT-898: Ticket Sales History\|SPT-898]] | The timeline and table place the selected sales in the correct local time periods and ticket types |
| Employee Sales History (PDF) | [[#SPT-899: Employee Sales History\|SPT-899]] | The table and graph show only the selected employee/platform’s sales in the correct local time periods; quantities and revenue reconcile to that employee’s records, with the other employee excluded. |
| Event Summary (PDF) | [[#SPT-901: Event Summary\|SPT-901]] | The PDF identifies the selected event, reconciles selected ticket-type and financial/inventory figures with its records, and excludes another event |
| Event Audit (XLSX) | [[#SPT-902: Event Audit\|SPT-902]] | The workbook opens as XLSX and contains Summary, Details - Ticket Type, Summary - Purchase Platforms and Details - Purchase Platforms sheets |
| Financial Scan Summary (PDF) | [[#SPT-903: Financial Scan Summary\|SPT-903]] | The PDF distinguishes issued, sold and complimentary/free counts and their scanned counts |
| Ticket Type Summary (CSV) | [[#SPT-904: Ticket Type Summary\|SPT-904]] | Only the selected ticket types appear; choosing all includes both |
| Password Used Summary (CSV) | [[#SPT-905: Password Used Summary\|SPT-905]] | Password, Event/Ticket Type, Password Entered Count and Ticket Quantity match the recorded password data |
| Seller Stats (CSV) | [[#SPT-906: Seller Stats\|SPT-906]] | Each selling employee’s row has its own contact, sold quantities, financial values and commissions; the sale without a selling employee does not become a fabricated seller row. |
| Ticket Scan History Report (CSV) | [[#SPT-907: Ticket Scan History Report\|SPT-907]] | Each included history action has the correct barcode, item, created time, action, status before/after and employee |
| Ticket Scan History Report (PDF) | [[#SPT-908: Ticket Scan History Report\|SPT-908]] | The PDF’s scan timeline/table matches the selected events/types and time periods; totals agree with the recorded actions, and the excluded scan is absent |
| Employee Scan History Report (PDF) | [[#SPT-909: Employee Scan History Report\|SPT-909]] | Employee labels, timeline periods and scan totals match only the selected employee’s recorded histories; the other employee’s scans are excluded. |
| Seller Cash Out Report (PDF) | [[#SPT-910: Seller Cash Out Report\|SPT-910]] | The PDF belongs to the selected seller and date window and its sales/cash-out amounts reconcile to that seller’s recorded transactions |
| Discount Creation Report (CSV) | [[#SPT-911: Discount Creation Report\|SPT-911]] | Code, type, amount/percentage, description, total/per-customer limits, allowed checkout settings and created-by/time match the saved discounts; the out-of-range discount is excluded. |
| Holds Stats (CSV) | [[#SPT-912: Holds Stats\|SPT-912]] | Only selected holds appear with the correct customer, basket reference, held item quantity, seat and link |
| Event/Product Inventory Report (CSV) | [[#SPT-913: Event/Product Inventory Report\|SPT-913]] | The CSV shows the selected event/product records with correct item, variant, customer, quantity, picked-up state, billed amount, fees and taxes |
| Member Report (CSV) | [[#SPT-914: Member Report\|SPT-914]] | Member identity/contact, group, level, status, quantity, expiry and usage fields match the selected members, while the unselected level is excluded. |
| Member History Report (CSV) | [[#SPT-915: Member History Report\|SPT-915]] | Each history row matches its recorded member, time, action, type, before/after status, amount and benefit; excluded dates and levels are absent. |
| Member Benefit Usage Report (CSV) | [[#SPT-916: Member Benefit Usage Report\|SPT-916]] | Each benefit row has the correct group/level and benefit type; scan and discount allowances and used totals match the independently recorded usage without counting one benefit as another. |
| Member Seating Report (CSV) | [[#SPT-920: Member Seating Report\|SPT-920]] | Member, group/level, reserved-seating state, section/row/seat and quantity match the sold assignments; the other group’s seat is excluded and no seat is assigned to two unintended members. |
| Waitlist Subscribers Report (CSV) | [[#SPT-917: Waitlist Subscribers Report\|SPT-917]] | Only subscribers for the explicitly selected events/types appear |
| Reselling Submissions Report (CSV) | [[#SPT-918: Reselling Submissions Report\|SPT-918]] | Customer identity, event/time, ticket type, submitted quantity, refund amount and status match the selected submissions; another event’s submission is excluded |
| Donations History (CSV) | [[#SPT-919: Donations History\|SPT-919]] | Each included donation has its recorded donor, charity, registration number, currency, amount, donation date and event |
| Gift Card Recipient Report (CSV) | [[#SPT-3832: Gift Card Recipient Report\|SPT-3832]] | Each selected card has its correct purchaser/sender/recipient, denomination and quantity |
| Marketing Campaign Detail (CSV) | [[#SPT-921: Marketing Campaign Detail\|SPT-921]] | Transaction-level campaign/source/medium, item details and money match the selected campaign sales; the unselected campaign is absent |
| Marketing Campaign Detail (PDF) | [[#SPT-922: Marketing Campaign Detail\|SPT-922]] | The PDF identifies the selected campaign scope and includes only its item/financial breakdown |
| Ticket Credit Usage Report (CSV) | [[#SPT-4393: Ticket Credit Usage Report\|SPT-4393]] | Before redemption, the selected code has Times Used 0 and Usage Limit 5 |
| Custom Consent Items (CSV) | [[#SPT-4798: Custom Consent Items\|SPT-4798]] | The file includes the selected checkout responses and correct customer, transaction, basket and event details |
| Base Ticket Revenue Report (PDF) | [[#SPT-5514: Base Ticket Revenue Report\|SPT-5514]] | The PDF identifies that event, preserves the recorded ticket-type/price-tier breakdown and reconciles its base revenue and adjustments with the source ledger; a second event cannot silently join the report. |
| Event Settlement Report (PDF) | [[#SPT-5515: Event Settlement Report\|SPT-5515]] | The PDF belongs to that event and reconciles its displayed revenue, tax, fee and settlement breakdown against the source ledger without counting already settled money twice. |
| Discount Usage Stats | SPT-890 held | Retain item/basket × normal/refund/void counts until the oracle conflict is resolved. |
| Event Summary CSV at 60 events | [[#SPT-900: Event Summary CSV at 60 events\|SPT-900]] | Exact-limit direct download with complete event rows. |
| Event Summary CSV above 60 events | [[#SPT-5516: Event Summary CSV above 60 events\|SPT-5516]] | Automatic controlled-recipient selection and actual email/file completion. |

## Reports → Generate Custom Report

The cases below are **published definitions**, with full readback verification recorded below. Existing titles/tags/parameters/priority and suite are captured in the linked baseline. Unrelated live metadata was preserved during the updates. Run the Dashboard form in desktop and narrow mobile views; actual downloaded PDF/XLSX viewing needs a capable file viewer. Record the organization and computer timezone for time-sensitive runs. No artificial Platform/View parameter matrix is added.

### SPT-880: Itemized Sales Report

**Title:** Dashboard - Reports - Verify Itemized Sales Report CSV/PDF contents

**Description:**

Generate Itemized Sales Report for the recorded selection and verify its specific fields and completed file.

File checks: The selected sale and adjustment records are included, the other-event control is excluded, and line values and totals match the recorded ledger. Reconcile Gross Sales, Refunds, Discounts, Net Sales, Service Fees, Gross Revenue, Organizer Fees, Organizer Taxes, Net Revenue and the relevant adjustment amount using their displayed signed meanings; do not compare an invoice total with a single line total.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV, PDF only; run both ReportFormat values. |
| Report selectors | Events; Products; Ticket Types; Membership Groups; Membership Levels; Employees; Purchase Platform; Select All Invoices; item selectors hide when it is on; PDF hides Ticket Types, Employees and Purchase Platform; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Transaction ID | Transaction ID |
| Sale Transaction ID | Sale Transaction ID |
| Item Type | Item Type |
| Description | Description |
| Transaction Quantity | Transaction Quantity |
| Item Quantity | Item Quantity |
| Payment Method | Payment Method |
| Gross Sales | Gross Sales |
| Refunds | Refunds |
| Discounts | Discounts |
| Net Sales | Net Sales |
| Service Fees | Service Fees |
| Gross Revenue | Gross Revenue |
| Net Revenue | Net Revenue |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* For the PDF run, the effective Waffle flag enable_itemized_sales_report_pdf is on for the signed-in employee’s request.
* Use a selected event with a completed sale, a discounted sale and a completed partial refund in a known date window, plus a control order for another event.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, fees-taxes, dashboard, web

**Parameters:**

ReportFormat: CSV, PDF

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Itemized Sales Report under Report Type. | Choose the selected ReportFormat under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Itemized Sales Report check plus the current date/time. Choose Events for the prepared event; leave Products and Membership Groups empty. In CSV also choose the recorded employee and Purchase Platform; in PDF those two filters and Ticket Types are absent. Leave Select All Invoices off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | For PDF runs, use the PDF detail controls instead of Select Columns. | Only the intended CSV columns or supported PDF detail fields are selected. |
| Select Save + Generate Report and open the completed file. | For ReportFormat CSV, open the actual CSV download; for PDF, open the generated PDF tab. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | The selected sale and adjustment records are included, the other-event control is excluded, and line values and totals match the recorded ledger. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-881: Settlement Report

**Title:** Dashboard - Reports - Verify Settlement Report CSV/PDF contents

**Description:**

Generate Settlement Report for the recorded selection and verify its specific fields and completed file.

File checks: Only sales attached to the selected settlement invoices appear; Settlement Date and proceeds agree with those saved payouts, and the unselected settlement is absent. PDF payment-method and event subtotals add to its displayed report total.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV, PDF only; run both ReportFormat values. |
| Report selectors | Payout Invoices; Select All Payout Invoices; Group Events By: Individual Occurrences or Main Events (for event selection). Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Transaction ID | Transaction ID |
| Sale Transaction ID | Sale Transaction ID |
| Description | Description |
| Settlement Date | Settlement Date |
| Item Quantity | Item Quantity |
| Payment Method | Payment Method |
| Gross Sales | Gross Sales |
| Refunds | Refunds |
| Discounts | Discounts |
| Net Sales | Net Sales |
| Service Fees | Service Fees |
| Gross Revenue | Gross Revenue |
| Net Revenue | Net Revenue |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use existing completed settlement invoices with known included sales and a different unselected settlement invoice.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, post-purchase, dashboard, web

**Parameters:**

ReportFormat: CSV, PDF

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Settlement Report under Report Type. | Choose the selected ReportFormat under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Settlement Report check plus the current date/time. Select only the recorded Payout Invoices; leave Select All Payout Invoices off. Use Individual Occurrences under Group Events By for PDF. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | For PDF runs, use the PDF detail controls instead of Select Columns. | Only the intended CSV columns or supported PDF detail fields are selected. |
| Select Save + Generate Report and open the completed file. | For ReportFormat CSV, open the actual CSV download; for PDF, open the generated PDF tab. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only sales attached to the selected settlement invoices appear; Settlement Date and proceeds agree with those saved payouts, and the unselected settlement is absent. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-882: Advance Report

**Title:** Dashboard - Reports - Verify Advance Report CSV/PDF contents

**Description:**

Generate Advance Report for the recorded selection and verify its specific fields and completed file.

File checks: Only the selected advance’s financial rows appear; Advance Date and the advance amount match its saved invoice. Reconcile the displayed signed sales, discounts, refunds, fees, taxes, revenue and adjustments against the independent ledger; PDF uses Advance Amount rather than treating it as an additional settlement.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV, PDF only; run both ReportFormat values. |
| Report selectors | Advance Invoices; Select All Advance Invoices; Group Events By: Individual Occurrences or Main Events (for event selection). Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Transaction ID | Transaction ID |
| Sale Transaction ID | Sale Transaction ID |
| Description | Description |
| Advance Date | Advance Date |
| Item Quantity | Item Quantity |
| Payment Method | Payment Method |
| Gross Sales | Gross Sales |
| Refunds | Refunds |
| Discounts | Discounts |
| Net Sales | Net Sales |
| Service Fees | Service Fees |
| Gross Revenue | Gross Revenue |
| Net Revenue | Net Revenue |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* The effective Waffle flag enable_advance_report_type is on for the signed-in employee’s request.
* Use an existing advance invoice with known included sales, plus an unselected advance invoice.
* Do not create an advance or initiate a payout for this report check.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:**

ReportFormat: CSV, PDF

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Advance Report under Report Type. | Choose the selected ReportFormat under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Advance Report check plus the current date/time. Select only the recorded Advance Invoices; leave Select All Advance Invoices off. Use Individual Occurrences under Group Events By for PDF. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | For PDF runs, use the PDF detail controls instead of Select Columns. | Only the intended CSV columns or supported PDF detail fields are selected. |
| Select Save + Generate Report and open the completed file. | For ReportFormat CSV, open the actual CSV download; for PDF, open the generated PDF tab. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only the selected advance’s financial rows appear; Advance Date and the advance amount match its saved invoice. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-883: Payment Type Breakdown

**Title:** Dashboard - Reports - Verify Payment Type Breakdown PDF contents

**Description:**

Generate Payment Type Breakdown for the recorded selection and verify its specific fields and completed file.

File checks: The chosen method and the control method have separate correct totals under the purchase platform and item breakdowns. Payment-method subtotals add to the displayed report total without treating a generated or complimentary ticket as a card charge.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Products; Membership Groups; Membership Levels; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled; Group Events By: Individual Occurrences or Main Events (for event selection). Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use a selected event containing a known sale for the chosen PaymentTypes value plus a known sale through another method.
* Card means paid card; Cash means paid cash; Other means a recorded custom Other method; Comp means a complimentary ticket; Affirm means an approved sandbox Affirm order; Credit means an order using customer credit; AutoGenerated means a generated entitlement recorded with the AutoGenerated payment type.
* Record the actual displayed method names.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:**

PaymentTypes: Card, Cash, Other, Comp, Affirm, Credit, AutoGenerated

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Payment Type Breakdown under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Payment Type Breakdown check plus the current date/time. Select the prepared event, leave Select All Events off, and choose Individual Occurrences under Group Events By. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The chosen method and the control method have separate correct totals under the purchase platform and item breakdowns. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-884: Event Financial Summary

**Title:** Dashboard - Reports - Verify Event Financial Summary PDF contents

**Description:**

Generate Event Financial Summary for the recorded selection and verify its specific fields and completed file.

File checks: The PDF identifies only the selected event and reconciles its displayed sales, discounts, refunds, fees, taxes, net revenue and settlement figures against the ledger; event totals are not duplicated for separate payment methods.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled; Group Events By: Individual Occurrences or Main Events (for event selection). Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use an event with paid card and cash sales, a discount and a recorded partial refund, plus a different event with sales.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Event Financial Summary under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Event Financial Summary check plus the current date/time. Select the prepared event, leave Select All Events off, and choose Individual Occurrences under Group Events By. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF identifies only the selected event and reconciles its displayed sales, discounts, refunds, fees, taxes, net revenue and settlement figures against the ledger; event totals are not duplicated for separate payment methods. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-885: Ticket Type Financial Summary

**Title:** Dashboard - Reports - Verify Ticket Type Financial Summary PDF contents

**Description:**

Generate Ticket Type Financial Summary for the recorded selection and verify its specific fields and completed file.

File checks: The selected event’s ticket types appear separately; each type’s financial values match its own ledger and their displayed subtotals reconcile to the event total without another event’s sales.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled; Group Events By: Individual Occurrences or Main Events (for event selection). Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use one event with at least two ticket types and recorded sales/refunds with different quantities for each type.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Ticket Type Financial Summary under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Ticket Type Financial Summary check plus the current date/time. Select the prepared event, leave Select All Events off, and choose Individual Occurrences under Group Events By. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The selected event’s ticket types appear separately; each type’s financial values match its own ledger and their displayed subtotals reconcile to the event total without another event’s sales. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-886: Product Summary

**Title:** Dashboard - Reports - Verify Product Summary PDF contents

**Description:**

Generate Product Summary for the recorded selection and verify its specific fields and completed file.

File checks: The PDF names the selected product, shows the selected variant breakdown and reconciles its displayed inventory, sold quantities, revenue, refunds, fees and settlement amounts with those records. It does not combine the other product into the selected summary.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Products; Product Attributes and financial/inventory detail fields after selecting a product. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* The effective Waffle flag enable_product_summary_report_type is on for the employee’s request.
* Use a product with two variants, known stock and paid sales in each, plus a separate product control.
* Record per-variant quantities, recorded receipts, refunds and already-completed settlements before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Product Summary under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Product Summary check plus the current date/time. Select one prepared product. Select its recorded Product Attributes in the PDF detail controls; leave the unrelated product unselected. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select the recorded ticket types or product attributes and financial/inventory details in the PDF controls. | Keep only the intended rows and financial figures. | The PDF selections match the prepared scope. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF names the selected product, shows the selected variant breakdown and reconciles its displayed inventory, sold quantities, revenue, refunds, fees and settlement amounts with those records. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-887: Product Summary

**Title:** Dashboard - Reports - Verify Product Summary CSV contents

**Description:**

Generate Product Summary for the recorded selection and verify its specific fields and completed file.

File checks: Each selected product has its own row and correct quantities; the two products’ money and inventory are not combined into one product. Recorded refunds, fees and settlements remain attributable to the correct product.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Products. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Product Name | Product |
| Total Redeemable Tickets | Redeemable Tickets |
| Num Cash Tickets Sold | Cash Tickets Sold |
| Num Credit Tickets Sold | Credit Tickets Sold |
| Cash Revenue | Cash Revenue |
| Credit Revenue | Credit Revenue |
| Gross Sales | Gross Sales |
| Refunds | Refunds |
| Discounts | Discounts |
| Net Sales | Net Sales |
| Service Fees | Service Fees |
| Gross Revenue | Gross Revenue |
| Net Revenue | Net Revenue |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* The effective Waffle flag enable_product_summary_report_type is on for the employee’s request.
* Use two products with different known inventory and sales quantities.
* Record each product’s sold quantities and financial amounts from its source records before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Product Summary under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Product Summary check plus the current date/time. Select the two prepared products in Products. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Each selected product has its own row and correct quantities; the two products’ money and inventory are not combined into one product. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-888: Event Summary

**Title:** Dashboard - Reports - Include existing settlements in summary PDFs

**Description:**

Generate the selected event or product summary PDF and prove its already-completed settlement is included correctly. SummaryKind Event uses Event Summary → Events; Product uses Product Summary → Products and requires enable_product_summary_report_type on for the employee’s request. Run both values separately.

File checks: The selected summary includes the recorded settlement in its financial breakdown, with the correct sign and amount, without adding it to sales a second time. No settlement from the other selected-context record is included.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | SummaryKind Event: Events, Recurring Events/Search past events when enabled, then Ticket Types. SummaryKind Product: Products, then Product Attributes. Both PDFs offer their financial/inventory detail fields. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

Product Summary additionally exposes Products and Product Attributes. Event Summary exposes Events and Ticket Types. Each PDF has financial/inventory field selections; neither PDF uses the CSV Select Columns control.

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* For SummaryKind Product, the effective Waffle flag enable_product_summary_report_type is on for the employee’s request.
* Use one event and one product with already-completed settlements.
* Record each saved settlement’s reference, date and amount and the corresponding sales totals.
* Do not create or send a payout to obtain test data.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, post-purchase, dashboard, web

**Parameters:**

SummaryKind: Event, Product

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose the report for the selected SummaryKind under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Event Summary check plus the current date/time. For SummaryKind Event choose Event Summary and one event; for Product choose Product Summary and one product. Select the matching financial fields in the PDF controls. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select the recorded ticket types or product attributes and financial/inventory details in the PDF controls. | Keep only the intended rows and financial figures. | The PDF selections match the prepared scope. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The selected summary includes the recorded settlement in its financial breakdown, with the correct sign and amount, without adding it to sales a second time. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-889: Marketing Campaign Summary

**Title:** Dashboard - Reports - Verify Marketing Campaign Summary CSV contents

**Description:**

Generate Marketing Campaign Summary for the recorded selection and verify its specific fields and completed file.

File checks: Only selected campaigns appear; campaign/source/medium and Items Sold match the known attributed orders. Page Views, Add To Cart Events, Initiate Checkout Events and Purchase Events match the independently recorded counts for the same window; rates use their documented denominator and do not become undefined for zero input.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Marketing Campaigns; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| UTM Campaign | UTM Campaign |
| UTM Source | UTM Source |
| UTM Medium | UTM Medium |
| Items Sold | Items Sold |
| Page Views | Page Views |
| Add To Cart Events | Add To Cart Events |
| Initiate Checkout Events | Initiate Checkout Events |
| Purchase Events | Purchase Events |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* The effective Waffle flag enable_marketing_campaign_report is on for the employee’s request.
* Use two recorded campaigns with different campaign/source/medium values and known attributed sales.
* Record their analytics counts and order references using the same date window; keep a sale from an unselected campaign as a control.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Marketing Campaign Summary under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Marketing Campaign Summary check plus the current date/time. Select the prepared Events and Marketing Campaigns. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only selected campaigns appear; campaign/source/medium and Items Sold match the known attributed orders. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-891: Shipping Fulfillment Stats

**Title:** Dashboard - Reports - Verify Standard Shipping ticket and product rows

**Description:**

Generate Shipping Fulfillment Stats for the recorded selection and verify its specific fields and completed file. EventTickets selects event ticket orders; Products selects product orders. Membership fulfillment follows a different pickup rule and is outside this ticket/product selection.

File checks: Only eligible Standard Shipping orders for the selected item appear; Will Call and electronic-delivery controls are excluded. Order references, quantities, addresses, fulfillment status, employee and fulfillment date match the recorded orders. EventTickets rows identify the recorded event/type; Products rows identify the product/variant/SKU.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Membership Groups; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Transaction ID | Transaction ID |
| Purchase Date | Purchase Date |
| Name On Ticket | Name On Ticket |
| Quantity Per Order | Quantity Per Order |
| Fulfillment Status | Fulfillment Status |
| Fulfilled By Employee | Fulfilled By Employee |
| Fulfillment Date | Fulfillment Date |
| Event Name | Event Name |
| Ticket Type Name | Ticket Type Name |
| Product Name | Product Name |
| Product Attribute Name | Product Attribute Name |
| SKU | SKU |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Shipping is enabled.
* Use paid event-ticket or product orders for the selected ItemSelection, with Standard Shipping and recorded fulfillment details.
* Include Will Call and electronic-delivery controls for the same item.
* For Products, record its variant/SKU; for EventTickets, record the event and ticket type.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:**

ItemSelection: EventTickets, Products

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Shipping Fulfillment Stats under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Shipping Fulfillment Stats check plus the current date/time. For ItemSelection EventTickets choose the prepared Events and leave Products empty; for Products choose the prepared Products and leave Events empty. Leave Membership Groups empty. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only eligible Standard Shipping orders for the selected item appear; Will Call and electronic-delivery controls are excluded. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-892: Shipping Fulfillment Stats

**Title:** Dashboard - Reports - Include shipping and pickup memberships

**Description:**

Generate Shipping Fulfillment Stats for the recorded selection and verify its specific fields and completed file.

File checks: Both eligible Standard Shipping and Will Call/Pick Up memberships appear, with the correct membership group, level, member/order, quantities and fulfillment details; a membership delivery rule is not replaced by the event-ticket shipping-only rule.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Membership Groups; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Transaction ID | Transaction ID |
| Purchase Date | Purchase Date |
| Name On Ticket | Name On Ticket |
| Quantity Per Order | Quantity Per Order |
| Fulfillment Status | Fulfillment Status |
| Fulfilled By Employee | Fulfilled By Employee |
| Fulfillment Date | Fulfillment Date |
| Membership Group Name | Membership Group Name |
| Membership Level Name | Membership Level Name |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Memberships and shipping are enabled.
* Use existing Active memberships with Standard Shipping and Will Call/Pick Up delivery, with known member, order and fulfillment details.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, memberships

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Shipping Fulfillment Stats under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Shipping Fulfillment Stats check plus the current date/time. Select the prepared Membership Groups; leave Events and Products empty. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Both eligible Standard Shipping and Will Call/Pick Up memberships appear, with the correct membership group, level, member/order, quantities and fulfillment details; a membership delivery rule is not replaced by the event-ticket shipping-only rule. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-894: Transactions

**Title:** Dashboard - Reports - Verify Transactions for selected events or products

**Description:**

Generate Transactions for the recorded selection and verify its specific fields and completed file. Run both ItemSelection values: Event uses Events and Product uses Products.

File checks: Every matching invoice appears once with its correct transaction type, payment method, customer and whole-invoice money. The unselected control is excluded. Selecting an item finds matching invoices; it does not turn this invoice report into an itemized line report.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Select All Invoices; Events/Products hide when it is on. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Transaction ID | Transaction ID |
| Invoice Type | Invoice Type |
| Customer Name | Username |
| Payment Method | Payment Method |
| Total Sales | Gross Sales |
| Revenue | Gross Revenue |
| Purchase Date | Sold At |
| Refunds | Refunds |
| Discounts | Discount Amount |
| Net Sales | Net Sales |
| Service Fees | Service Fees |
| Net Revenue | Net Revenue |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use completed invoices containing the selected event or product and an unselected event or product control.
* Include one recorded adjustment and record whole-invoice amounts, not only the selected item’s price.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:**

ItemSelection: Event, Product

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Transactions under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Transactions check plus the current date/time. For ItemSelection Event choose the prepared Events and leave Products empty; for Product choose Products and leave Events empty. Leave Select All Invoices off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Every matching invoice appears once with its correct transaction type, payment method, customer and whole-invoice money. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-896: Customers and Employees

**Title:** Dashboard - Reports - Verify Customers and Employees CSV contents

**Description:**

Generate Customers and Employees for the recorded selection and verify its specific fields and completed file.

File checks: The event/ticket-type selections include only the correct customer/employee records; each identity, contact field, employee/seller value and chosen count matches the record. Do not duplicate a customer for multiple selected purchases.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Ticket Types; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Customer Name | Full Name |
| Customer Email | Email |
| Seller Status | Is Seller |
| Employee Status | Is Employee |
| Subscribed to Email | Subscribed to Email |
| Tickets Purchased | Total External Ticket Quantity |
| Tickets Sold | Tickets Sold |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use a recorded event with customers who bought different ticket types and an employee with known seller/employee details.
* Include one customer who belongs only to an unselected ticket type.
* Record contact, consent and purchased/sold counts before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Customers and Employees under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Customers and Employees check plus the current date/time. Select the prepared Events and one of their Ticket Types; leave Select All Events off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | The event/ticket-type selections include only the correct customer/employee records; each identity, contact field, employee/seller value and chosen count matches the record. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-897: Will Call

**Title:** Dashboard - Reports - Verify Will Call CSV contents

**Description:**

Generate Will Call for the recorded selection and verify its specific fields and completed file.

File checks: Only the selected event/type/status tickets appear. Names, customer contacts, barcode, ticket status and assigned section/row/seat match each ticket; the excluded control does not appear.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Ticket Types; Ticket Status; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Name On Ticket | Name on Ticket |
| Customer Email | Email Address |
| Event | Event Name |
| Ticket Type Name | Ticket Type Name |
| Ticket Status | Status |
| Barcode String | Barcode String |
| Seat Section | Section |
| Row/Area | Location |
| Seat | Seat |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use tickets for one event with known names, ticket types, statuses, barcodes and assigned seats.
* Include a ticket in another type or status as an excluded control.
* Record selected ticket details before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Will Call under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Will Call check plus the current date/time. Select the prepared event, one Ticket Type and a recorded Ticket Status; leave Products empty and Select All Events off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only the selected event/type/status tickets appear. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-898: Ticket Sales History

**Title:** Dashboard - Reports - Verify Ticket Sales History PDF contents

**Description:**

Generate Ticket Sales History for the recorded selection and verify its specific fields and completed file.

File checks: The timeline and table place the selected sales in the correct local time periods and ticket types. Ticket quantities and displayed revenue match the recorded sales; the other-platform control is excluded.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Ticket Types; Purchase Platform; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use recorded ticket sales with different quantities in at least two time periods and a sale through a different purchase platform.
* Record each sale’s time in the organization’s timezone and its money/quantity before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Ticket Sales History under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Ticket Sales History check plus the current date/time. Select the prepared event and Ticket Types, and choose the recorded Purchase Platform; leave Select All Events off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The timeline and table place the selected sales in the correct local time periods and ticket types. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-899: Employee Sales History

**Title:** Dashboard - Reports - Verify Employee Sales History PDF contents

**Description:**

Generate Employee Sales History for the recorded selection and verify its specific fields and completed file.

File checks: The table and graph show only the selected employee/platform’s sales in the correct local time periods; quantities and revenue reconcile to that employee’s records, with the other employee excluded.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Ticket Types; Employees; Purchase Platform; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use two employees with different recorded sales and a known platform for the selected employee.
* Record sale times, quantities and revenue for each employee before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Employee Sales History under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Employee Sales History check plus the current date/time. Select the prepared event, Ticket Types, one recorded Employee and Purchase Platform; leave Select All Events off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The table and graph show only the selected employee/platform’s sales in the correct local time periods; quantities and revenue reconcile to that employee’s records, with the other employee excluded. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-900: Event Summary CSV at 60 events

**Title:** Dashboard - Reports - Download Event Summary CSV at the 60-event limit

**Description:**

Select 60 events for Event Summary CSV and verify the complete direct download without a PDF one-event error or an email-only requirement.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Report | Report Name; Report Type = Event Summary; Format = CSV. PDF is not used. |
| Selection | Recurring Events when enabled, Search past events, Events, Select All Events; select the individual recorded events and leave Select All Events off. |
| Columns | Select Columns and Select All; select the fields mapped below. |
| Dates and delivery | Filter By Date Range → Custom → Start Date/End Date; Email Report; Report Frequency = One Time; Save; Save + Generate Report. |

| Select Columns label | Expected file header |
| --- | --- |
| Event | Event |
| Event Start Time | Event Start Time |
| Total Redeemable Tickets | Redeemable Tickets |
| Num Cash Tickets Sold | Cash Tickets Sold |
| Num Credit Tickets Sold | Credit Tickets Sold |
| Gross Sales | Gross Sales |
| Refunds | Refunds |
| Net Revenue | Net Revenue |

**Preconditions:**

* Employee permission: **Manage Reports**. The employee’s profile email belongs to a controlled inbox approved to receive the selected organization’s report.
* Select an organization with at least 61 existing approved events. Record 60 individual event names and the references used to distinguish them, plus one unselected control event. Use Search past events for past records; do not select a recurring parent that expands into an uncounted set.
* For each selected event, record the date/time, redeemable quantity, cash/card sold quantities and signed sales/refund/net-revenue figures from independently known source records. Record a Custom interval containing those source records.
* No email recipients are entered in the new report before generation; it starts as One Time. Do not use a recipient outside the controlled employee profile.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Event Summary, then CSV. | Enter a unique Report Name containing the current date/time. | CSV and the event, column, date and delivery controls listed in Description appear. |
| Select the 60 recorded individual events. | Leave Select All Events off; exclude the control event. | All 60 event selections remain shown; the PDF one-event restriction is not applied. |
| Apply the recorded date interval and selected columns. | Custom Start Date/End Date; use the column mapping in Description. Leave Report Frequency = One Time and do not add recipients manually. | The dates and selected columns remain shown. |
| Select Save + Generate Report and open the completed CSV. | Wait for the actual file. | The CSV downloads directly and no email-only delivery is required at exactly 60 events. |
| Compare the CSV with the recorded event list and source values. | Expected headers and 60 selected events; one unselected control. | All 60 selected events are included once with their correct recorded fields and money; the control event and unchecked ordinary columns are absent. |

**Postconditions:**

* Retain the report and private masked file as evidence; source event/order records are unchanged.
* The saved report remains One Time with no email recipients.

### SPT-901: Event Summary

**Title:** Dashboard - Reports - Verify Event Summary PDF contents

**Description:**

Generate Event Summary for the recorded selection and verify its specific fields and completed file. This retains the existing one-event restriction. Do not generate a different report to stand in for the Event Summary PDF.

File checks: The PDF identifies the selected event, reconciles selected ticket-type and financial/inventory figures with its records, and excludes another event. The selector permits one event for PDF; the CSV multi-event rule is not applied to this format.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled; Ticket Types and financial/inventory detail fields after selecting the event. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use one event with two ticket types, known stock, paid sales, discounts, a refund, and package/complimentary/free counts where they are already present.
* Record the exact quantities and signed money before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Event Summary under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Event Summary check plus the current date/time. Select exactly one prepared event; select its Ticket Types and financial/inventory fields in the PDF controls. A second event must not remain selected. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select the recorded ticket types or product attributes and financial/inventory details in the PDF controls. | Keep only the intended rows and financial figures. | The PDF selections match the prepared scope. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF identifies the selected event, reconciles selected ticket-type and financial/inventory figures with its records, and excludes another event. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-902: Event Audit

**Title:** Dashboard - Reports - Verify Event Audit XLSX contents

**Description:**

Generate Event Audit for the recorded selection and verify its specific fields and completed file.

File checks: The workbook opens as XLSX and contains Summary, Details - Ticket Type, Summary - Purchase Platforms and Details - Purchase Platforms sheets. Event, ticket-type and purchase-platform totals match the recorded data and reconcile across sheets without duplicated sales.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | XLSX only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | No Filter By Date Range control for this report. |

**Preconditions:**

* Employee permission: **Manage Reports**.
* Use two events with different ticket-type and purchase-platform totals.
* Record each event’s inventory, sales, refunds, fees, taxes and financial totals before generating the workbook.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Event Audit under Report Type. | Choose XLSX under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Event Audit check plus the current date/time. Select the prepared Events. No CSV Columns control or Filter By Date Range is offered. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Select Save + Generate Report and open the completed file. | Wait for the actual XLSX file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The workbook opens as XLSX and contains Summary, Details - Ticket Type, Summary - Purchase Platforms and Details - Purchase Platforms sheets. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-903: Financial Scan Summary

**Title:** Dashboard - Reports - Verify Financial Scan Summary PDF contents

**Description:**

Generate Financial Scan Summary for the recorded selection and verify its specific fields and completed file.

File checks: The PDF distinguishes issued, sold and complimentary/free counts and their scanned counts. Scan percentages equal the relevant scanned count divided by its issued count, rounded to two decimals; a zero denominator shows zero. Event/report percentages are recomputed from totals rather than summed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use an event with recorded issued, sold, complimentary/free and scanned ticket counts.
* Include an unscanned ticket and a ticket type with zero issued tickets; record the matching revenue totals and scan histories.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Financial Scan Summary under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Financial Scan Summary check plus the current date/time. Select the prepared event. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF distinguishes issued, sold and complimentary/free counts and their scanned counts. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-904: Ticket Type Summary

**Title:** Dashboard - Reports - Verify Ticket Type Summary CSV contents

**Description:**

Generate Ticket Type Summary for the recorded selection and verify its specific fields and completed file.

File checks: Only the selected ticket types appear; choosing all includes both. Ticket Type, Ticket Price, Event, Redeemable Tickets and refunded/sold quantities match the recorded type, and quantities are not copied from one type to another.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Ticket Types; Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | No Filter By Date Range control for this report. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Ticket Type Name | Ticket Type |
| Ticket Type Price | Ticket Price |
| Event | Event |
| Total Redeemable Tickets | Redeemable Tickets |
| Num Cash Tickets Sold | Cash Tickets Sold |
| Num Credit Tickets Sold | Credit Tickets Sold |
| Num Tickets Refunded | Refunded Tickets |

**Preconditions:**

* Employee permission: **Manage Reports**.
* Use an event with two ticket types that have different prices, inventory and sold/refunded quantities.
* Record the expected per-type counts and money before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:**

ReportType: CSV

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Ticket Type Summary under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Ticket Type Summary check plus the current date/time. Select the prepared Events, then individual Ticket Types; also run the Select All Ticket Types selection in a separate execution. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only the selected ticket types appear; choosing all includes both. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-905: Password Used Summary

**Title:** Dashboard - Reports - Verify Password Used Summary CSV contents

**Description:**

Generate Password Used Summary for the recorded selection and verify its specific fields and completed file.

File checks: Password, Event/Ticket Type, Password Entered Count and Ticket Quantity match the recorded password data. Entering a password is not counted as a ticket sale, and recurring children use the supported parent password relationship.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | No Filter By Date Range control for this report. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Password | Password |
| Event | Event/Ticket Type |
| Number Of Passwords Used | Password Entered Count |
| Tickets Sold | Ticket Quantity |

**Preconditions:**

* Employee permission: **Manage Reports**.
* Use an event with two event/ticket passwords whose entered counts and sold-ticket quantities are known, including a password entered without a completed sale.
* For a recurring-event run, record its parent password relationship.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Password Used Summary under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Password Used Summary check plus the current date/time. Select the prepared event; there is no Filter By Date Range control for this report. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Password, Event/Ticket Type, Password Entered Count and Ticket Quantity match the recorded password data. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-906: Seller Stats

**Title:** Dashboard - Reports - Verify Seller Stats CSV contents

**Description:**

Generate Seller Stats for the recorded selection and verify its specific fields and completed file.

File checks: Each selling employee’s row has its own contact, sold quantities, financial values and commissions; the sale without a selling employee does not become a fabricated seller row.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Membership Groups; Membership Levels; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Customer Name | Username |
| Customer Email | Email |
| Tickets Sold | Tickets Sold |
| Total Sales | Net Sales |
| Revenue | Gross Revenue |
| Cash Commission | Cash Commission Earned |
| Credit Commission | Credit Commission Earned |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use two employees with recorded attributed sales and a customer purchase with no selling employee.
* Record per-employee quantities, revenue and commissions before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Seller Stats under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Seller Stats check plus the current date/time. Select the prepared event; leave Products and Membership Groups empty and Select All Events off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Each selling employee’s row has its own contact, sold quantities, financial values and commissions; the sale without a selling employee does not become a fabricated seller row. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-907: Ticket Scan History Report

**Title:** Dashboard - Reports - Verify Ticket Scan History Report CSV contents

**Description:**

Generate Ticket Scan History Report for the recorded selection and verify its specific fields and completed file.

File checks: Each included history action has the correct barcode, item, created time, action, status before/after and employee. Out-of-window and other-event histories are excluded; a history row is not an additional ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Ticket Types; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Barcode String | Barcode String |
| Event Name | Event Name |
| Ticket Type Name | Ticket Type Name |
| Created On | Created On |
| Action | Action |
| Status Before | Status Before |
| Status After | Status After |
| Created By | Created By |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use tickets with recorded scan and status-change histories at known local times.
* Include a scan before the window and another event’s scan as controls.
* Record barcode, action, old/new status and acting employee from each history.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Ticket Scan History Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Ticket Scan History Report check plus the current date/time. Select the prepared event, Ticket Types and a date window covering the recorded scan actions. Leave Products empty. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Each included history action has the correct barcode, item, created time, action, status before/after and employee. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-908: Ticket Scan History Report

**Title:** Dashboard - Reports - Verify Ticket Scan History Report PDF contents

**Description:**

Generate Ticket Scan History Report for the recorded selection and verify its specific fields and completed file.

File checks: The PDF’s scan timeline/table matches the selected events/types and time periods; totals agree with the recorded actions, and the excluded scan is absent. Product scan support in CSV is not assumed for PDF.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Products; Ticket Types; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use recorded ticket scan history across two time periods and two ticket types, including an excluded scan outside the chosen range.
* Record the expected scan counts and local times.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Ticket Scan History Report under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Ticket Scan History Report check plus the current date/time. Select the prepared Events and Ticket Types. Products are not available for this PDF. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF’s scan timeline/table matches the selected events/types and time periods; totals agree with the recorded actions, and the excluded scan is absent. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-909: Employee Scan History Report

**Title:** Dashboard - Reports - Verify Employee Scan History Report PDF contents

**Description:**

Generate Employee Scan History Report for the recorded selection and verify its specific fields and completed file.

File checks: Employee labels, timeline periods and scan totals match only the selected employee’s recorded histories; the other employee’s scans are excluded.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Ticket Types; Employees; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use recorded scan histories performed by two different employees.
* Record the selected employee’s scan counts, local times and ticket types and keep the other employee as a control.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Employee Scan History Report under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Employee Scan History Report check plus the current date/time. Select the prepared event and Ticket Types, then one Employee. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | Employee labels, timeline periods and scan totals match only the selected employee’s recorded histories; the other employee’s scans are excluded. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-910: Seller Cash Out Report

**Title:** Dashboard - Reports - Verify Seller Cash Out Report PDF contents

**Description:**

Generate Seller Cash Out Report for the recorded selection and verify its specific fields and completed file.

File checks: The PDF belongs to the selected seller and date window and its sales/cash-out amounts reconcile to that seller’s recorded transactions. Another seller is not included; the report does not itself create a payout.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Employees. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use a seller with recorded cash/card/Other sales in a known range and another seller’s sales as a control.
* Record the selected seller’s source cash-out figures before opening Reports; do not request a payment or send the POS cash-out email.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Seller Cash Out Report under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Seller Cash Out Report check plus the current date/time. Choose exactly one Employee and expand Filter By Date Range; choose Custom and provide both dates. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF belongs to the selected seller and date window and its sales/cash-out amounts reconcile to that seller’s recorded transactions. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-911: Discount Creation Report

**Title:** Dashboard - Reports - Verify Discount Creation Report CSV contents

**Description:**

Generate Discount Creation Report for the recorded selection and verify its specific fields and completed file.

File checks: Code, type, amount/percentage, description, total/per-customer limits, allowed checkout settings and created-by/time match the saved discounts; the out-of-range discount is excluded.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | No item selector; use the date range and selected columns.. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Discount Code Used | Code |
| Discount Type | Discount Type |
| Discount Code Percentage | Percentage |
| Discount Code Amount | Dollar amount |
| Total Limit | Total Limit |
| Usage Limit Per User | Limit usage per user |
| Discount Created By | User that created the discount |
| Discount Created On | Created On |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use two discounts with different percentage/amount, limits, allowed checkout settings and creation dates.
* Record the settings from Discounts and one discount created outside the selected range.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Discount Creation Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Discount Creation Report check plus the current date/time. Use Filter By Date Range → Custom with dates containing the recorded discount creation times. No Events selector is offered. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Code, type, amount/percentage, description, total/per-customer limits, allowed checkout settings and created-by/time match the saved discounts; the out-of-range discount is excluded. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-912: Holds Stats

**Title:** Dashboard - Reports - Verify Holds Stats CSV contents

**Description:**

Generate Holds Stats for the recorded selection and verify its specific fields and completed file.

File checks: Only selected holds appear with the correct customer, basket reference, held item quantity, seat and link. A held quantity is not counted as an additional paid sale.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Ticket Types; Products; Membership Groups; Membership Levels; Select All Events (hidden for Event Summary PDF); Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Customer Name | Customer Name |
| Customer Email | Customer Email |
| Basket UUID | Basket UUID |
| Quantity | Quantity |
| Event Name | Event Name |
| Ticket Type Name | Ticket Type Name |
| Seat Section | Section |
| Row/Area | Row/Area |
| Seat | Seat |
| Last Updated | Last Updated |
| Hold Link | Hold Link |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use existing recorded customer holds with known quantities and assigned seats, plus a hold for another event.
* Record customer, basket reference, hold link, quantities and last-updated time before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Holds Stats under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Holds Stats check plus the current date/time. Select the prepared event and Ticket Types; leave Products and Membership Groups empty and Select All Events off. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only selected holds appear with the correct customer, basket reference, held item quantity, seat and link. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-913: Event/Product Inventory Report

**Title:** Dashboard - Reports - Verify Event/Product Inventory Report CSV contents

**Description:**

Generate Event/Product Inventory Report for the recorded selection and verify its specific fields and completed file.

File checks: The CSV shows the selected event/product records with correct item, variant, customer, quantity, picked-up state, billed amount, fees and taxes. Uncollected quantities do not become picked-up quantities. The explicitly unselected product is excluded.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | No Filter By Date Range control for this report. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Customer Email | Customer email |
| Product Name | Product |
| Product Attribute Name | Product Attribute |
| Quantity | Quantity |
| Picked Up | Picked up |
| Event | Event |
| Ticket Type Name | Ticket Type |
| Total Sales | Final amount |
| Billing Address | Billing address |

**Preconditions:**

* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use an event and product with known purchased and picked-up quantities, including an uncollected item.
* Record the selected product variant, customer, quantity, picked-up amount and financial fields from source orders.
* Include another product as an excluded control.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Event/Product Inventory Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Event/Product Inventory Report check plus the current date/time. Select the prepared event and one prepared product together. No Filter By Date Range is offered. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | The CSV shows the selected event/product records with correct item, variant, customer, quantity, picked-up state, billed amount, fees and taxes. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-914: Member Report

**Title:** Dashboard - Reports - Verify Member Report CSV contents

**Description:**

Generate Member Report for the recorded selection and verify its specific fields and completed file.

File checks: Member identity/contact, group, level, status, quantity, expiry and usage fields match the selected members, while the unselected level is excluded.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Membership Groups; Membership Levels. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Member Name | Username |
| Member Email | Email |
| Member Status | Status |
| Member Quantity | Quantity |
| Member Expiry Date | Expiry Date |
| Membership Group Name | Membership Group |
| Membership Level Name | Membership Level |
| Member Scans Used | Scans Used |
| Member Discounts Used | Discounts Used |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Memberships are enabled.
* Use a membership group with two levels and members in different recorded statuses.
* Record member name, contact, status, quantity, expiry and scan/discount usage; retain a member in the unselected level as a control.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, memberships

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Member Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Member Report check plus the current date/time. Select the prepared Membership Groups and Membership Levels. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Member identity/contact, group, level, status, quantity, expiry and usage fields match the selected members, while the unselected level is excluded. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-915: Member History Report

**Title:** Dashboard - Reports - Verify Member History Report CSV contents

**Description:**

Generate Member History Report for the recorded selection and verify its specific fields and completed file.

File checks: Each history row matches its recorded member, time, action, type, before/after status, amount and benefit; excluded dates and levels are absent.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Membership Groups; Membership Levels. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Created | Created |
| Member Name | Username |
| Membership Group Name | Membership Group |
| Membership Level Name | Membership Level |
| Member History Action | Action |
| Member History Type | Type |
| Member Status Before | Member Status Before |
| Member Status After | Member Status After |
| Amount | Amount |
| Membership Benefit | Membership Benefit |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Memberships are enabled.
* Use a selected group/level with recorded membership history, including a known status change and another activity at a different time.
* Record the action, type, old/new status, amount and benefit where applicable.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, memberships

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Member History Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Member History Report check plus the current date/time. Select the prepared Membership Groups and Membership Levels. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Each history row matches its recorded member, time, action, type, before/after status, amount and benefit; excluded dates and levels are absent. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-916: Member Benefit Usage Report

**Title:** Dashboard - Reports - Verify Member Benefit Usage Report CSV contents

**Description:**

Generate Member Benefit Usage Report for the recorded selection and verify its specific fields and completed file.

File checks: Each benefit row has the correct group/level and benefit type; scan and discount allowances and used totals match the independently recorded usage without counting one benefit as another.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Membership Groups; Membership Levels. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Membership Group Name | Membership Group |
| Membership Level Name | Membership Level |
| Membership Benefit | Membership Benefit |
| Membership Benefit Type | Benefit Type |
| Member Scans Allowed | Scans Allowed Per Member |
| Member Scans Used | Total Scans Used |
| Member Discounts Allowed | Discount Usages Allowed Per Member |
| Member Discounts Used | Total Discounts Used |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Memberships are enabled.
* Use a selected group/level with known scan-access and discount benefit usage.
* Record the configured benefit allowances and used totals from the member/benefit history before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, memberships

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Member Benefit Usage Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Member Benefit Usage Report check plus the current date/time. Select the prepared Membership Groups and Membership Levels. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Each benefit row has the correct group/level and benefit type; scan and discount allowances and used totals match the independently recorded usage without counting one benefit as another. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-920: Member Seating Report

**Title:** Dashboard - Reports - Verify Member Seating Report CSV contents

**Description:**

Generate Member Seating Report for the recorded selection and verify its specific fields and completed file.

File checks: Member, group/level, reserved-seating state, section/row/seat and quantity match the sold assignments; the other group’s seat is excluded and no seat is assigned to two unintended members.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Membership Groups. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Member Name | Member |
| Member Email | Email |
| Membership Group Name | Membership Group |
| Membership Level Name | Membership Level |
| Seat Section | Section |
| Row/Area | Row/Area |
| Seat | Seat |
| Seating Reserved | Seating Reserved |
| Quantity | Quantity |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Memberships are enabled.
* Use a membership group with sold assigned-seat issue-ticket benefits.
* Record member, group, level, seat section/row/seat, reserved-seating state and quantity; include another group’s assignment as a control.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, assigned-seating, dashboard, memberships

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Member Seating Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Member Seating Report check plus the current date/time. Select the prepared Membership Groups. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Member, group/level, reserved-seating state, section/row/seat and quantity match the sold assignments; the other group’s seat is excluded and no seat is assigned to two unintended members. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-917: Waitlist Subscribers Report

**Title:** Dashboard - Reports - Verify Waitlist Subscribers Report CSV contents

**Description:**

Generate Waitlist Subscribers Report for the recorded selection and verify its specific fields and completed file. The report does not provide a waitlist join-date column.

File checks: Only subscribers for the explicitly selected events/types appear. Names, email, quantity, prices and status match the recorded subscriptions, including the different states; status is an output column, not a selectable report filter.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Ticket Types; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | No Filter By Date Range control for this report. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| First Name | Customer First name |
| Last Name | Customer Last name |
| Customer Email | Customer email |
| Event | Event |
| Ticket Type Name | Ticket Type |
| Quantity | Quantity |
| Total Price | Total Price |
| Total Price No Fees | Total Price No Fees |
| Status | Status |

**Preconditions:**

* Employee permission: **Manage Reports**.
* Use two events with recorded waitlist subscribers, including pending, fulfilled and cancelled states.
* Record each subscriber’s name/email, event, ticket type, requested quantity, prices and current status before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, waitlists

**Parameters:**

EventFilter: SpecificEvent, SelectedEvents

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Waitlist Subscribers Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Waitlist Subscribers Report check plus the current date/time. Select one prepared event for EventFilter SpecificEvent; select both prepared events explicitly for EventFilter SelectedEvents. Choose Ticket Types belonging to those events. No Select All Events, Status or Filter By Date Range control is offered. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Only subscribers for the explicitly selected events/types appear. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-918: Reselling Submissions Report

**Title:** Dashboard - Reports - Verify Reselling Submissions Report CSV contents

**Description:**

Generate Reselling Submissions Report for the recorded selection and verify its specific fields and completed file.

File checks: Customer identity, event/time, ticket type, submitted quantity, refund amount and status match the selected submissions; another event’s submission is excluded. A resale submission is not assumed to be a completed sale.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | No Filter By Date Range control for this report. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| First Name | Customer First name |
| Last Name | Customer Last name |
| Customer Email | Customer email |
| Event | Event |
| Ticket Type Name | Ticket Type |
| Quantity | Quantity |
| Refund Amount | Refund Amount |
| Status | Status |

**Preconditions:**

* Employee permission: **Manage Reports**.
* Use an event with recorded resale submissions in different statuses, including known submitted quantities and refund amounts.
* Include another event’s submission as an excluded control.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Reselling Submissions Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Reselling Submissions Report check plus the current date/time. Select the prepared Events. No Filter By Date Range or status selector is offered. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Customer identity, event/time, ticket type, submitted quantity, refund amount and status match the selected submissions; another event’s submission is excluded. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-919: Donations History

**Title:** Dashboard - Reports - Verify Donations History CSV contents

**Description:**

Generate Donations History for the recorded selection and verify its specific fields and completed file. CSV is the only supported format. Choose the organization before opening Reports; there is no organization picker inside this form.

File checks: Each included donation has its recorded donor, charity, registration number, currency, amount, donation date and event. Out-of-range donations are excluded and the file does not relabel charity currency using the organization’s currency.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | No item selector; use the date range and selected columns.. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Customer Name | Customer Name |
| Customer Email | Customer Email |
| Purchase Date | Donation Date |
| Donation Total | Donation Amount |
| Charity Registration Number | Charity Registration Number |
| Charity Name | Charity Name |
| Charity Currency | Charity Currency |
| Event | Related Event |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Use a selected organization operating in Currency CAD or USD with existing completed donations in a recorded date window.
* Record each donation’s donor, charity, charity registration number, charity currency, amount and related event; include a donation outside the range.
* Charity currency is recorded independently and need not equal the organization’s currency.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, donations, dashboard, web

**Parameters:**

Currency: CAD, USD

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Donations History under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Donations History check plus the current date/time. Choose the organization for the selected Currency before opening Reports. Use Filter By Date Range; no Events or organization selector appears inside this report form. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Each included donation has its recorded donor, charity, registration number, currency, amount, donation date and event. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-3832: Gift Card Recipient Report

**Title:** Dashboard - Reports - Verify Gift Card Recipient Report CSV contents

**Description:**

Generate Gift Card Recipient Report for the recorded selection and verify its specific fields and completed file.

File checks: Each selected card has its correct purchaser/sender/recipient, denomination and quantity. Amount paid, total value, redeemed state, used/remaining/advanced amounts and redemption code match its saved records. No member-seat fields are expected in this report.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Gift Cards; Gift Card Denominations. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Purchaser Name | Purchaser Name |
| Sender Name | Sender Name |
| Recipient Name | Recipient Name |
| Gift Card Name | Gift Card Name |
| Gift Card Denomination Price | Gift Card Denomination Price |
| Quantity | Quantity |
| Amount Paid | Amount Paid |
| Total Amount | Total Gift Card Amount |
| Is Redeemed | Is redeemed |
| Amount Used | Amount Used |
| Amount Remaining | Amount Remaining |
| Amount Advanced | Amount Advanced |
| Redemption Code | Redemption Code |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Gift Cards is enabled for the organization.
* Use purchased gift cards with different recipients/denominations, including one partly redeemed card.
* Record purchaser, sender, recipient, amount paid, total value, amount used, remaining amount, amount advanced and redemption code from their source records.
* Never use a real recipient’s code in shared evidence.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web, gift-card

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Gift Card Recipient Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Gift Card Recipient Report check plus the current date/time. Select the prepared Gift Cards and their Gift Card Denominations. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Each selected card has its correct purchaser/sender/recipient, denomination and quantity. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-921: Marketing Campaign Detail

**Title:** Dashboard - Reports - Verify Marketing Campaign Detail CSV contents

**Description:**

Generate Marketing Campaign Detail for the recorded selection and verify its specific fields and completed file.

File checks: Transaction-level campaign/source/medium, item details and money match the selected campaign sales; the unselected campaign is absent. Multiple selected campaigns do not duplicate a shared financial record.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Products; Membership Groups; Marketing Campaigns; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| UTM Campaign | UTM Campaign |
| UTM Source | UTM Source |
| UTM Medium | UTM Medium |
| Transaction ID | Transaction ID |
| Item Type | Item Type |
| Event Name | Event Name |
| Item Quantity | Item Quantity |
| Payment Method | Payment Method |
| Gross Sales | Gross Sales |
| Refunds | Refunds |
| Discounts | Discounts |
| Net Sales | Net Sales |
| Service Fees | Service Fees |
| Gross Revenue | Gross Revenue |
| Net Revenue | Net Revenue |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* The effective Waffle flag enable_marketing_campaign_detail_report is on for the employee’s request.
* Use two recorded campaigns with distinct source/medium values and completed event sales; retain a sale from a third unselected campaign.
* Record each selected sale and its attributed campaign/source/medium.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard, web

**Parameters:**

CampaignFilter: SingleCampaign, MultipleCampaigns

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Marketing Campaign Detail under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Marketing Campaign Detail check plus the current date/time. Select one recorded Marketing Campaign for CampaignFilter SingleCampaign; select the two recorded campaigns for MultipleCampaigns. Select the prepared event and leave Products/Membership Groups empty. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | Transaction-level campaign/source/medium, item details and money match the selected campaign sales; the unselected campaign is absent. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-922: Marketing Campaign Detail

**Title:** Dashboard - Reports - Verify Marketing Campaign Detail PDF contents

**Description:**

Generate Marketing Campaign Detail for the recorded selection and verify its specific fields and completed file.

File checks: The PDF identifies the selected campaign scope and includes only its item/financial breakdown. Signed sales, refunds, discounts, fees, taxes and revenue reconcile to that campaign’s ledger; the other campaign is absent.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Products; Membership Groups; Marketing Campaigns; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* The effective Waffle flag enable_marketing_campaign_detail_report is on for the employee’s request.
* Use an existing campaign with attributed event sales and recorded signed financial totals, plus a different campaign’s sale as a control.
* Record each selected order and adjustment from Transactions: reference, quantity, payment method, gross sales, discounts, refunds, fees, taxes and organizer proceeds.
* Derive expected totals from those records before opening the report; keep signed adjustment values.
* Select only records whose financial meaning is known.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard

**Parameters:**

ReportFormat: PDF

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Marketing Campaign Detail under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Marketing Campaign Detail check plus the current date/time. Select the recorded Marketing Campaign and the prepared event; leave Products and Membership Groups empty. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF identifies the selected campaign scope and includes only its item/financial breakdown. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-4393: Ticket Credit Usage Report

**Title:** Dashboard - Reports - Update ticket credit usage after one redemption

**Description:**

Generate Ticket Credit Usage Report before and after one approved redemption. Verify that the same code’s count increases once while its limit remains 5.

File checks: Before redemption, the selected code has Times Used 0 and Usage Limit 5. After exactly one approved redemption and regeneration, the same code has Times Used 1 and Usage Limit 5; the customer and code remain unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Customer Name | Customer Name |
| Email | Email |
| Discount Code | Discount Code |
| Times Used | Times Used |
| Usage Limit | Usage Limit |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use a customer-controlled unused ticket credit with a usage limit of 5, eligible for one known ticket.
* Record its code, customer and initial zero usage.
* The customer can complete one approved ticket-credit redemption without an unexpected cash charge; do not redeem a real customer’s credit.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.
* The customer has the selected unused credit in their account and can choose the recorded eligible ticket through the supported checkout.
* Record the order produced by this one redemption.

**Tags:** reports, dashboard

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Ticket Credit Usage Report under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Ticket Credit Usage Report check plus the current date/time. Select the prepared event and date window containing the original credit and planned redemption times; reuse the same saved scope after redemption. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the first file’s headers and the recorded credit. | The selected unused code. | The same customer/code shows Times Used 0 and Usage Limit 5; the listed headers are present. |
| As the customer, redeem this credit once for the prepared ticket. | The recorded code with limit 5; one eligible ticket. | One redemption order completes and consumes one use of that code. |
| Return to Dashboard → Reports and select Download CSV on the saved Ticket Credit Usage Report. | Keep its original scope and columns. | The regenerated file shows Times Used 1 and Usage Limit 5 for the same code, with no second redemption. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.
* Retain the one redemption order and the before/after files; do not delete or silently restore a real customer’s credit.

### SPT-4798: Custom Consent Items

**Title:** Dashboard - Reports - Verify Custom Consent Items CSV contents

**Description:**

Generate Custom Consent Items for the recorded selection and verify its specific fields and completed file.

File checks: The file includes the selected checkout responses and correct customer, transaction, basket and event details. Selecting Consent Items expands the real consent question names into columns with the recorded values; the specific-event run excludes the other event’s responses.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | CSV only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

| Select Columns label (CSV) | Expected file header |
| --- | --- |
| Submitted At | Submitted At |
| Customer Name | Customer Name |
| Customer Email | Customer Email |
| Transaction ID | Transaction ID |
| Basket UUID | Basket UUID |
| Event IDs | Event IDs |
| Event Names | Event Names |
| Consent Items | One column per recorded consent question |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* Use two events with completed checkout consent responses.
* ConsentType Clickwrap uses a recorded explicit checkbox consent; Browserwrap uses the recorded browserwrap consent configuration.
* Record the consent question names, response values, customer, transaction, basket reference and submitted time for each checkout.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** reports, dashboard

**Parameters:**

EventFilter: AllEvents, SpecificEvent
ConsentType: Clickwrap, Browserwrap

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Custom Consent Items under Report Type. | Choose CSV under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Custom Consent Items check plus the current date/time. For EventFilter SpecificEvent choose one prepared event; for AllEvents leave Events unselected. Use the recorded date window. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Open Select Columns, clear Select All, and select the labels listed in Description. | Use the exact column labels in Description. | The selected columns are retained and at least one is selected. |
| Select Save + Generate Report and open the completed file. | Wait for the actual CSV file to download, then open it. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Check the file headers and the recorded report data. | Compare the header mapping and included/excluded references in this case. | The file includes the selected checkout responses and correct customer, transaction, basket and event details. All file checks in Description hold; listed headers are present and unchecked ordinary columns are absent. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-5514: Base Ticket Revenue Report

**Title:** Dashboard - Reports - Verify Base Ticket Revenue Report PDF contents

**Description:**

Generate Base Ticket Revenue Report for the recorded selection and verify its specific fields and completed file.

File checks: The PDF identifies that event, preserves the recorded ticket-type/price-tier breakdown and reconciles its base revenue and adjustments with the source ledger; a second event cannot silently join the report.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | Filter By Date Range → Preset; choose Custom, then Start Date and End Date covering the recorded source records. Start must not be after End. |

**Preconditions:**

* Record the organization and computer timezone; write down the intended start/end times with their offsets before using Custom dates.
* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Organization-scoped Waffle flag base_ticket_revenue_report is on for the selected organization.
* Use one event with recorded ticket-type/price-tier sales, discounts, refunds and complimentary/free tickets.
* Record quantities and the base ticket revenue calculation for each source entry before generating the report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** dashboard, reports

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Base Ticket Revenue Report under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Base Ticket Revenue Report check plus the current date/time. Select exactly one prepared event; do not select all events. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Set Filter By Date Range to the recorded Custom interval. | Enter Start Date and End Date containing the source records; leave Email Report off and Report Frequency = One Time. | Both dates are retained and the displayed local times match the recorded interval. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF identifies that event, preserves the recorded ticket-type/price-tier breakdown and reconciles its base revenue and adjustments with the source ledger; a second event cannot silently join the report. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-5515: Event Settlement Report

**Title:** Dashboard - Reports - Verify Event Settlement Report PDF contents

**Description:**

Generate Event Settlement Report for the recorded selection and verify its specific fields and completed file.

File checks: The PDF belongs to that event and reconciles its displayed revenue, tax, fee and settlement breakdown against the source ledger without counting already settled money twice.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Common controls | Report Name, Report Type, Format, Email Report, Report Frequency, Save, Save + Generate Report. Leave Email Report off and Report Frequency = One Time for direct generation. |
| Format | PDF only. |
| Report selectors | Events; Recurring Events and Search past events when recurring events are enabled. Membership and Gift Card selectors require their modules; those module conditions apply only to reports listing the corresponding fields. Dependent level/type selectors need their parent selection. |
| Dates | No Filter By Date Range control for this report. |

**Preconditions:**

* Employee permission: **Manage Reports**.
* An employee with **Manage Transactions** has recorded the source orders and financial amounts described below.
* Organization-scoped Waffle flag base_ticket_revenue_report is on for the selected organization.
* Use one event with already-recorded payments, fees/taxes and settlements.
* Record the exact event ledger and settlement amounts; do not initiate a payout to set up this report.
* Use only the selected organization’s approved records; record the intended included references and at least one excluded control before generating.
* Do not create sales, refunds or payouts merely to make report totals match.

**Tags:** dashboard, reports

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Event Settlement Report under Report Type. | Choose PDF under Format. | The report’s form fields and formats listed in Description appear; unrelated selectors are absent. |
| Enter Report Name and choose the report selection. | Name = Event Settlement Report check plus the current date/time. Select exactly one prepared event; do not select all events. | The chosen records are shown in the correct selectors; dependent selections belong to those records. |
| Select Save + Generate Report and open the completed file. | Wait for the generated PDF tab to open. A generating message alone is insufficient. | A file of the selected format opens and the named saved report appears in the list. |
| Compare the report’s sections and totals with the recorded source data. | Use the selected organization, records and date interval. | The PDF belongs to that event and reconciles its displayed revenue, tax, fee and settlement breakdown against the source ledger without counting already settled money twice. All file checks in Description hold. |

**Postconditions:**

* Keep the report file private; mask customer details and redemption codes in shared evidence.
* Retain the saved report with its recorded name for review; it remains One Time with no email recipients. Source orders, settlements and memberships are unchanged by report generation.

### SPT-5516: Event Summary CSV above 60 events

**Title:** Dashboard - Reports - Email Event Summary above the direct-download limit

**Description:**

Select 61 events for Event Summary CSV and prove the completed report reaches the signed-in employee’s controlled inbox, including every selected event. The legacy form automatically adds that employee’s profile email when the selection exceeds 60.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| Form area | Fields and selection rule |
| --- | --- |
| Report | Report Name; Report Type = Event Summary; Format = CSV. PDF is not used. |
| Selection | Recurring Events when enabled, Search past events, Events, Select All Events; select the individual recorded events and leave Select All Events off. |
| Columns | Select Columns and Select All; select the fields mapped below. |
| Dates and delivery | Filter By Date Range → Custom → Start Date/End Date; Email Report; Report Frequency = One Time; Save; Save + Generate Report. |

| Select Columns label | Expected file header |
| --- | --- |
| Event | Event |
| Event Start Time | Event Start Time |
| Total Redeemable Tickets | Redeemable Tickets |
| Num Cash Tickets Sold | Cash Tickets Sold |
| Num Credit Tickets Sold | Credit Tickets Sold |
| Gross Sales | Gross Sales |
| Refunds | Refunds |
| Net Revenue | Net Revenue |

**Preconditions:**

* Employee permission: **Manage Reports**. The employee’s profile email belongs to a controlled inbox approved to receive the selected organization’s report.
* Select an organization with at least 62 existing approved events. Record 61 individual event names and the references used to distinguish them, plus one unselected control event. Use Search past events for past records; do not select a recurring parent that expands into an uncounted set.
* For each selected event, record the date/time, redeemable quantity, cash/card sold quantities and signed sales/refund/net-revenue figures from independently known source records. Record a Custom interval containing those source records.
* No email recipients are entered in the new report before generation; it starts as One Time. Do not use a recipient outside the controlled employee profile.

**Tags:** reports, dashboard, web

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Reports and choose Event Summary, then CSV. | Enter a unique Report Name containing the current date/time. | CSV and the event, column, date and delivery controls listed in Description appear. |
| Select the 61 recorded individual events. | Leave Select All Events off; exclude the control event. | All 61 event selections remain shown; the PDF one-event restriction is not applied. |
| Apply the recorded date interval and selected columns. | Custom Start Date/End Date; use the column mapping in Description. Leave Report Frequency = One Time and do not add recipients manually. | The dates and selected columns remain shown. |
| Select Save + Generate Report. | Signed-in employee with the controlled profile inbox. | The report is saved and the page says to check email within ten minutes; no missing-recipient or PDF one-event error prevents submission. |
| Open that employee’s inbox and open this report’s delivered CSV. | Identify it by the unique report name. | The email is received at the controlled address and its actual CSV opens; the queue message alone is not a pass. |
| Compare the CSV with the recorded event list and source values. | Expected headers and 61 selected events; one unselected control. | All 61 selected events are included once with their correct recorded fields and money; the control event and unchecked ordinary columns are absent. |
| Select Edit Report on this run’s saved report and inspect Email Recipients. | The employee’s controlled profile address. | The saved report contains the automatically added controlled address, not another employee’s or customer’s address. |

**Postconditions:**

* Retain the report and private masked file as evidence; source event/order records are unchanged.
* After recording receipt, edit only this run’s saved report, remove its Email Recipients entries using their close controls, and Save with One Time still selected.

## Held cases and retained workflow coverage

**SPT-890 — Discount Usage Stats:** preserve its six existing scenarios (per-item/basket × ordinary/partial refund/partial void) and financial reconciliation. Its old per-item void row expects Quantity Discount Used = 3 and Ticket Quantity = 1; current `get_discount_usage_stats_query` calculates the per-item Ticket Quantity from the same per-discount application sum used for Quantity Discount Used. That is a **source/definition conflict, not a confirmed live defect**. The real form is CSV, Columns, Filter By Date Range, Email Report and Report Frequency; there is no Events selector. Required output labels include Discount Code Used → Discount Code, Discount Description, Purchase Platform, Quantity Discount Used and Ticket Quantity plus the selected financial columns. Do not replace the old expected counts with guesses or discard refund/void coverage. A business-approved count oracle and a bound six-order setup block a runnable replacement.

**SPT-900 — Event Summary CSV preservation:** the published SPT-900 proves the 60-event download, while **SPT-5516** proves 61-event email completion. Source `updateEmailRecipientsRequired()` marks an over-limit selection; `$save()` automatically adds the signed-in employee’s profile address and a send time when none was entered. The selector does not impose a hard CSV 60-event choice cap. Direct API submission over the limit without recipients is rejected by the configuration policy; that negative assertion is **API/backend coverage, not an executable missing-recipient branch in this legacy UI**. The focused split retains the supported UI outcomes and was explicitly approved before SPT-900 was updated. A controlled profile inbox is mandatory because the app can add it even when the employee did not select Email Report manually. No email was sent during this review.

| Existing case(s) | Disposition | Preserve / gap |
| --- | --- | --- |
| SPT-895 | Consolidation candidate only | Proposed SPT-894 carries Event and Product with the same invoice-level proof. Keep SPT-895 unchanged until consolidation is explicitly approved; no deletion is authorized. |
| SPT-893 | Consolidation candidate only | Proposed SPT-891 carries Standard Shipping event tickets and products; SPT-892 retains the different membership pickup rule. Keep SPT-893 unchanged pending approval. |
| SPT-4050 | Keep; scheduling enhancement deferred | Native Frequency Daily/Weekly/Monthly must remain. Its data invents report names such as Attendance/CustomerList/OrderSummary and treats all format/event combinations alike. Replace those names with supported reports before execution; also cover Recur Hourly, Recur Every Ten Minutes, required recipients/Email At/Stop Recurring At, the eight-hour cap, actual receipt, and stopping recurrence. Do not trigger schedules during this review. |
| SPT-4795 | Keep; proposed split needed | Preserve FilterState None/SearchText/ReportType and RowAction Edit/Clone/Delete/Generate. Current expectations are mostly empty, all actions are bundled, and it calls the legacy card list a table. Separate list filtering from each row action before narrowing it. |
| SPT-4796 | Keep; proposed split needed | Preserve BuilderMode Create/Edit/Clone × DeliveryPath SaveOnly/DirectDownload/EmailOnly × ReportFormat CSV/PDF. Do not blindly run combinations against a report that lacks that format. Clean Save-only, Edit persistence, Clone independence and received email need distinct focused responsibilities. |
| SPT-5124 | Overlap candidate; keep unchanged | Overlaps 4796’s create/edit/clone/delivery scope and has a JSON “Parameters” block embedded inside Description rather than real native parameters. It references the migrated builder; do not count it as legacy field coverage or retire it without reviewing its retained migration purpose. |
| SPT-917 | Source correction proposed | Old StatusFilter Pending/Fulfilled/Any and join-date expectation are unsupported by the reviewed form/export. New draft checks real output statuses; SpecificEvent/SelectedEvents uses actual event choices. The old AllEvents value is not implemented by a Select All Events control for this report. Approval must explicitly cover the parameter correction. |
| SPT-919 | Source correction proposed | Keep CAD/USD runs. Remove unsupported PDF and in-form organization selection; organization selection occurs before the form, while Charity Currency is an independent exported field. Approval must explicitly cover removing the unsupported ReportFormat variation. |
| SPT-883 / 904 / 921 / 922 / 4798 | Preserve meaningful native selections | PaymentTypes seven values; ReportType CSV; CampaignFilter single/multiple; ReportFormat PDF; EventFilter × ConsentType are retained in the proposed standalone fields. |
| SPT-920 / 3832 / 4393 | Correct obsolete output wording | Member Seating has no Season/Event column in the reviewed exporter; Gift Card Recipient has no member-seat column; Ticket Credit Usage labels are Times Used and Usage Limit. Retain each real behavior while correcting those unsupported words. |
| SPT-888 | Preserve both summary responsibilities | Event and Product use SummaryKind with one settlement-inclusion step set; neither existing scenario is removed. |
| SPT-884/885/886/887/889 | Historical intake retained in baseline | Old PR links remain available as historical evidence. No old PR diff was supplied for this task or reviewed; current source replaces “follow that PR” as test setup. |

## Coverage accounting and evidence

**Intent:** an employee with Manage Reports can select the intended organization/report/filter set and obtain a file whose records, fields, dates and totals agree with independently recorded source data. Reports must not expose another organization, silently use incompatible filters, double-count money or label a queued job as a completed delivery. We reviewed definitions and source, not report execution.

| Control or proof target | Coverage / status |
| --- | --- |
| Report name/type/format and report-specific fields | The standalone drafts list the real controls. Name can be generated by the backend when blank; a required-name rule must not be invented. All 40 source types are mapped through drafts or the explicit discount-count hold. |
| Format availability | CSV/PDF/XLSX comes from catalog and frontend gates. Event Audit XLSX and Donations CSV were confirmed in the open legacy UI; ordinary Transactions is CSV only. |
| Columns and exported headers | Each proposed CSV case names a selected source-verified subset and maps picker labels to actual headers. Labels are not assumed identical to file headers. Unchecked columns and dynamic Consent Items expansion are explicit. This is selected-field proof, not every financial-column permutation. |
| Recurring/past-event search, ticket-type dependency, selection limits | Described per form. Ordinary report runs do not execute pagination or every dependent-selector transition. Parent/child event expansion, past/future event search, all limits and stale selections remain deferred focused checks; SPT-900/SPT-5516 define the exact 60/61-event delivery boundary; API missing-recipient rejection remains separately classified, not implied by a UI message. |
| All Events / All Invoices / parent organizations | Available only for supported report types. All Invoices requires a date range; Transactions permits one local year or less, parent/direct-child invoice scope and CSV for sub-organizations. Baseline normal-event/product cases do not prove broad selections; dedicated validation/ownership execution is deferred. |
| PDF differences | Event Summary and Product Summary permit one selected item, with PDF-specific detail controls; Ticket Scan History PDF has no Products selection. Group Events By supports Individual Occurrences/Main Events for applicable financial PDFs. Wrong-format columns are rejected by backend compatibility validation. |
| Money correctness | Ledger comparison is included per relevant report. No universal unsigned net-revenue formula is invented. Full fee/tax, absorbed costs, credits, package/membership realization, refund/void/exchange, historical configuration and payout math remain separate domain proofs; related cases below are reused. |
| Empty data, invalid input and failures | Zero-row CSV behavior, all columns cleared, missing required selectors, unsupported formats, invalid/reversed ranges, stale report selections, job errors and safe retries need focused checks. Current baseline workflow cases are weak; source validation is evidence of intended rejection, not execution. No fault injection, export or job was triggered. |
| Permissions and organization isolation | Dashboard landing and report CRUD/export require Manage Reports and active organization context. Restricted role, cross-organization saved report/file access and role revocation remain deferred API/browser proof. No employee role or organization was changed. |
| Date/timezone and presets | The form offers Custom plus Today/Yesterday/This Week/Last Week/This Month/Last Month/This Quarter/Last Quarter/Year to Date/Last Year. Source generates presets in the organization timezone; custom legacy dates carry the picker’s offset. Different computer/organization zones, midnight boundaries and daylight-saving schedules need dedicated execution with known boundary records. Do not assume all report types filter the same timestamp. |
| Schedule and delivery | Email Recipients, Add email, Email At, Report Frequency and Stop Recurring At are declared; six frequency options are in source. Export can queue a job, email may take up to ten minutes, and completion is actual private file/received message. Scheduling/one-time email, repeated generation, partial delivery/failure and stop boundaries remain SPT-4050/workflow enhancement work, not a pass. |
| Saved-list search, filter, edit, clone, download and delete | Existing 4795/4796/5124 are retained with their useful scopes. The legacy list is cards with Edit Report, Clone Report, Download [format] and Delete plus pagination. No saved reports existed in the inspected organization, so row actions and saved-state proof were not executed. |
| Accessibility, responsive and large exports | Cases select desktop/narrow views; only desktop was inspected. Full keyboard/focus, accessible errors, translated labels/headers, file handling, pagination/batch completeness and realistic volume remain deferred. No broad builds/tests or repeated browser captures were run. |
| Migration and shared consumers | Legacy Angular and Next.js Reports share the venue report API/export backend. Current browser shows Angular controls. The backend landing can embed the new page through Dashboard preview configuration; a direct URL does not establish replacement access. New form parity and saved-report compatibility are explicit follow-up scope, not inferred from SPT-5124’s generic steps. |
| Cleanup and privacy | Drafts retain named One Time reports, no email recipients, unchanged source sales/settlements and private masked files. Ticket Credit Usage explicitly retains the one redemption and before/after proof. No live data or files were generated here. |

### Related coverage reused

* **SPT-3269**: readable select/checkbox custom-question answers in Will Call; **SPT-4955**: membership custom-question answers in Member Report. Keep those dedicated content assertions; no duplicate was proposed.
* **SPT-2943**: issued-ticket exchange negation in itemized reports. Keep zero/remaining-money reconciliation with its own setup.
* **SPT-5084 / SPT-5091 / SPT-5298**: membership allocation, package independence and advance-before/after allocation. Their source-record and downstream-money obligations are not replaced by choosing report fields.
* **SPT-3282** has a reports tag but native SearchSurface values do not name this report builder. It is not sufficient proof of report timezone/date boundaries.
* Other matched mobile stats, Event Stats, product stats, guestlist exports, tracking-link exports and POS cash-out cases own other screens. They were not treated as legacy saved-report field coverage merely because their titles/tags matched “report.”

### Query completeness and sources

* Local Qase parser validation: **46 complete definitions, 258 step rows**, field/header tables retained, standalone setup/cleanup present, all 46 index links resolved. Parameter corrections are explicitly limited to SPT-917 and SPT-919; meaningful native selections elsewhere are preserved. This is format/content review, not an API dry-run or product execution. [Local review summary](evidence/reports-2026-10-16/local-format-review.json).
* An additional full-snapshot search for `base[ _-]ticket[ _-]revenue|event[ _-]settlement[ _-]report` returned **zero matches**, supporting SPT-5514/SPT-5515 as missing named report coverage; aliases with unrelated wording remain a search limitation. [Duplicate-search evidence](evidence/reports-2026-10-16/conditional-report-duplicate-search.json).
* One complete read-only **SPT** snapshot at **2026-10-16T18:23:41.951066+00:00**: **1977 records, 1977 unique IDs, 20 pages**, stable reported total and successful responses. Filter full case JSON by suite 101, Reports routes, Dashboard Reports wording or reports tag: **82 matches**. All **50 direct suite-101 cases** and the seven named related cases above were compared by full fields/assertions; the remaining matched cases are retained as other-screen context, not claimed as fully reviewed. Full baselines and query metadata: [Qase snapshot evidence](evidence/reports-2026-10-16/qase-baseline.json). Subsequent Qase changes are outside that snapshot.
* Backend **b5f397a0438910435e0d537f47e12d6064d7e019**; frontend **f1acf48189e6f783b1e31e5cd218f679dab1d92e**. Source revisions do not establish the deployed demo build. No PR/branch was supplied for this scope; old Qase-linked PRs are historical intake, not an exact diff review.
* Backend sources: `apps/reports/constants/{catalog,column_vocabulary,columns,summary_columns,scheduling}.py`; `apps/reports/models/saved_reports.py`; `apps/reports/api/venue_based/{serializers,viewsets}.py`; saved report configuration, column compatibility, submission and completion services; `apps/main/templates/dashboard/reports/index.html`; `apps/main/static/src/dashboard/reports/landing.js`; `apps/reports/dashboard/views.py`. Report-specific CSV classes, PDF financial/timeline classes and Event Audit workbooks are mapped in [the source field/export catalog](evidence/reports-2026-10-16/source-form-catalog.json). Backend root: [[01 Repositories/Backend - web-app]].
* The shared Next.js consumer is `showpass-frontend/packages/core/src/app-contexts/dashboard/features/reports/data/repositories/VenueBasedReportsRepository.ts`. No Next.js page was opened as a substitute for legacy inspection. The configuration policy, export services and selected transaction-export assertions were read for contracts; no test suite was run. Existing assertions do not establish current pass status.
* Handbook applied: [[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts|known ledger → actual file → reconciliation]], plus the canonical QA and Qase writing rules. All UI field/format claims are bound to the current source and the declared conditional gates.

### Retained non-saving browser checks

Already-open **demo** legacy Reports tab, signed-in display **Christian Valdez**, selected organization **Calgary Outlaws**. The menu includes Reports. The form initially selected Event Summary; no saved reports were listed. Read-only selections checked Transactions, Waitlist Subscribers Report, Donations History and Event Audit; no event, customer or organization was changed. Waitlist showed Events/Ticket Types without status/date controls, Donations showed CSV/date controls without an in-form venue selector, and Event Audit showed XLSX without Columns/date controls. Event Summary was restored. Save, Save + Generate Report, Download, Delete, email and scheduling were never submitted. [Retained form text](evidence/reports-2026-10-16/browser-smoke.txt).

**Readiness:** report-specific source comparison and approved Qase publication are complete; the held contradiction and deferred execution remain explicit. Saved definitions and field verification are not an executed report result or release sign-off.

## Qase publication — approved, applied and verified

Dry run passed for **46 operations: 43 updates + 3 creates**, all in **Reports (suite 101)**. Fresh reads of the 43 existing cases matched the saved baseline for the fields being enhanced. The user approved this exact preview with **yes**; all 46 operations were then applied and verified.

Update fields: Title, Description, Preconditions, Postconditions and Steps. Also update parameters only on SPT-880/881/882/888/891/894/917/919 as shown below. Preserve existing suite, tags, priority, type, behavior, layer and all other parameters. New cases use the tags shown below; type = Functional (1), behavior = Positive (1), layer = Not set (0), priority omitted.

**Explicit scope changes included in this approval:**

- **SPT-917:** replace unsupported AllEvents with explicit SelectedEvents, remove the nonexistent StatusFilter and redundant CSV-only parameter; retain status checking in the file. The legacy form offers neither Status nor Date Range filters.
- **SPT-919:** remove unsupported PDF; retain Currency CAD/USD and CSV file assertions. Choose the organization before opening the form; there is no organization selector inside it.
- **SPT-900 + TC-3:** preserve the boundary intent in two focused tests: 60 selected events download directly; 61 selected events use the controlled profile inbox and require actual email/file completion. Automatic profile-recipient selection replaces an impossible manual missing-recipient failure branch; direct API rejection remains separately recorded.
- **TC-1/TC-2:** new conditional PDF definitions require the organization flag `base_ticket_revenue_report`; they were source-reviewed, not executed in the inspected demo session.

**Unchanged:** SPT-890, SPT-893, SPT-895, SPT-4050, SPT-4795, SPT-4796 and SPT-5124. No deletions, moves or suite changes. Publishing definitions does not generate, save, email or schedule a report.

| Local / existing ID | Action | Title | Suite | Tags (retained on updates) | Parameters after publication | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| SPT-880 | update | Dashboard - Reports - Verify Itemized Sales Report CSV/PDF contents | 101 | reports, fees-taxes, dashboard, web | ReportFormat: CSV, PDF | 6 |
| SPT-881 | update | Dashboard - Reports - Verify Settlement Report CSV/PDF contents | 101 | reports, post-purchase, dashboard, web | ReportFormat: CSV, PDF | 6 |
| SPT-882 | update | Dashboard - Reports - Verify Advance Report CSV/PDF contents | 101 | reports, dashboard, web | ReportFormat: CSV, PDF | 6 |
| SPT-883 | update | Dashboard - Reports - Verify Payment Type Breakdown PDF contents | 101 | reports, dashboard, web | PaymentTypes: Card, Cash, Other, Comp, Affirm, Credit, AutoGenerated | 5 |
| SPT-884 | update | Dashboard - Reports - Verify Event Financial Summary PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-885 | update | Dashboard - Reports - Verify Ticket Type Financial Summary PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-886 | update | Dashboard - Reports - Verify Product Summary PDF contents | 101 | reports, dashboard, web | None | 6 |
| SPT-887 | update | Dashboard - Reports - Verify Product Summary CSV contents | 101 | reports, dashboard, web | None | 6 |
| SPT-888 | update | Dashboard - Reports - Include existing settlements in summary PDFs | 101 | reports, post-purchase, dashboard, web | SummaryKind: Event, Product | 6 |
| SPT-889 | update | Dashboard - Reports - Verify Marketing Campaign Summary CSV contents | 101 | reports, dashboard, web | None | 6 |
| SPT-891 | update | Dashboard - Reports - Verify Standard Shipping ticket and product rows | 101 | reports, dashboard, web | ItemSelection: EventTickets, Products | 6 |
| SPT-892 | update | Dashboard - Reports - Include shipping and pickup memberships | 101 | reports, dashboard, memberships | None | 6 |
| SPT-894 | update | Dashboard - Reports - Verify Transactions for selected events or products | 101 | reports, dashboard, web | ItemSelection: Event, Product | 6 |
| SPT-896 | update | Dashboard - Reports - Verify Customers and Employees CSV contents | 101 | reports | None | 6 |
| SPT-897 | update | Dashboard - Reports - Verify Will Call CSV contents | 101 | reports, dashboard, web | None | 6 |
| SPT-898 | update | Dashboard - Reports - Verify Ticket Sales History PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-899 | update | Dashboard - Reports - Verify Employee Sales History PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-900 | update | Dashboard - Reports - Download Event Summary CSV at the 60-event limit | 101 | reports, dashboard, web | None | 5 |
| SPT-901 | update | Dashboard - Reports - Verify Event Summary PDF contents | 101 | reports, dashboard, web | None | 6 |
| SPT-902 | update | Dashboard - Reports - Verify Event Audit XLSX contents | 101 | reports, dashboard, web | None | 4 |
| SPT-903 | update | Dashboard - Reports - Verify Financial Scan Summary PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-904 | update | Dashboard - Reports - Verify Ticket Type Summary CSV contents | 101 | reports, dashboard, web | ReportType: CSV | 5 |
| SPT-905 | update | Dashboard - Reports - Verify Password Used Summary CSV contents | 101 | reports, dashboard, web | None | 5 |
| SPT-906 | update | Dashboard - Reports - Verify Seller Stats CSV contents | 101 | reports, dashboard, web | None | 6 |
| SPT-907 | update | Dashboard - Reports - Verify Ticket Scan History Report CSV contents | 101 | reports, dashboard, web | None | 6 |
| SPT-908 | update | Dashboard - Reports - Verify Ticket Scan History Report PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-909 | update | Dashboard - Reports - Verify Employee Scan History Report PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-910 | update | Dashboard - Reports - Verify Seller Cash Out Report PDF contents | 101 | reports, dashboard, web | None | 5 |
| SPT-911 | update | Dashboard - Reports - Verify Discount Creation Report CSV contents | 101 | reports, dashboard, web | None | 6 |
| SPT-912 | update | Dashboard - Reports - Verify Holds Stats CSV contents | 101 | reports, dashboard, web | None | 6 |
| SPT-913 | update | Dashboard - Reports - Verify Event/Product Inventory Report CSV contents | 101 | reports, dashboard, web | None | 5 |
| SPT-914 | update | Dashboard - Reports - Verify Member Report CSV contents | 101 | reports, dashboard, memberships | None | 6 |
| SPT-915 | update | Dashboard - Reports - Verify Member History Report CSV contents | 101 | reports, dashboard, memberships | None | 6 |
| SPT-916 | update | Dashboard - Reports - Verify Member Benefit Usage Report CSV contents | 101 | reports, dashboard, memberships | None | 6 |
| SPT-920 | update | Dashboard - Reports - Verify Member Seating Report CSV contents | 101 | reports, assigned-seating, dashboard, memberships | None | 6 |
| SPT-917 | update | Dashboard - Reports - Verify Waitlist Subscribers Report CSV contents | 101 | reports, dashboard, waitlists | EventFilter: SpecificEvent, SelectedEvents | 5 |
| SPT-918 | update | Dashboard - Reports - Verify Reselling Submissions Report CSV contents | 101 | reports, dashboard, web | None | 5 |
| SPT-919 | update | Dashboard - Reports - Verify Donations History CSV contents | 101 | reports, donations, dashboard, web | Currency: CAD, USD | 6 |
| SPT-3832 | update | Dashboard - Reports - Verify Gift Card Recipient Report CSV contents | 101 | reports, dashboard, web, gift-card | None | 6 |
| SPT-921 | update | Dashboard - Reports - Verify Marketing Campaign Detail CSV contents | 101 | reports, dashboard, web | CampaignFilter: SingleCampaign, MultipleCampaigns | 6 |
| SPT-922 | update | Dashboard - Reports - Verify Marketing Campaign Detail PDF contents | 101 | reports, dashboard | ReportFormat: PDF | 5 |
| SPT-4393 | update | Dashboard - Reports - Update ticket credit usage after one redemption | 101 | reports, dashboard | None | 8 |
| SPT-4798 | update | Dashboard - Reports - Verify Custom Consent Items CSV contents | 101 | reports, dashboard | EventFilter: AllEvents, SpecificEvent; ConsentType: Clickwrap, Browserwrap | 6 |
| TC-1 → [SPT-5514](https://app.qase.io/case/SPT-5514) | create | Dashboard - Reports - Verify Base Ticket Revenue Report PDF contents | 101 | dashboard, reports | None | 5 |
| TC-2 → [SPT-5515](https://app.qase.io/case/SPT-5515) | create | Dashboard - Reports - Verify Event Settlement Report PDF contents | 101 | dashboard, reports | None | 4 |
| TC-3 → [SPT-5516](https://app.qase.io/case/SPT-5516) | create | Dashboard - Reports - Email Event Summary above the direct-download limit | 101 | reports, dashboard, web | None | 7 |

Evidence: [[03 Test Cases/Reports/evidence/reports-2026-10-16/qase-publication-preview.json|exact publication manifest]], [[03 Test Cases/Reports/evidence/reports-2026-10-16/qase-dry-run.json|read-only dry-run before/after]], [[03 Test Cases/Reports/evidence/reports-2026-10-16/qase-batch-plan.json|reusable batch plan]].

This completed publication followed [[05 Tooling/qasectl#Ambiguous Or Bulk Request Guard|the bulk-write confirmation rule]]. The linked batch plan and frozen payloads are historical publication evidence; **do not rerun this applied create batch**.

### Publication verification

- Published **43 enhancements** and created **SPT-5514** (Base Ticket Revenue PDF), **SPT-5515** (Event Settlement PDF) and **SPT-5516** (61-event Event Summary email) in [Reports suite 101](https://app.qase.io/project/SPT?suite=101). All **258 step rows** were retained.
- One complete post-publication snapshot retrieved **1980 unique cases across 20 pages**, with a stable reported total. Full intended text, steps, tags, suite and native parameter structure were compared; all 46 cases matched. Suite 101 has **53 direct cases**.
- Unrelated metadata was checked against the baseline: priority, type, behavior, layer, tags, suite, custom fields, status and unchanged parameters. Held SPT-890/893/895/4050/4795/4796/5124 were read back unchanged.
- [Full verification results](evidence/reports-2026-10-16/qase-publication-verified.json) · [full published and held case fields](evidence/reports-2026-10-16/qase-post-publication-cases.json) · [apply receipt](evidence/reports-2026-10-16/qase-publication-apply.json).
- **Execution remains pending:** publishing Qase definitions did not generate files, reconcile financial totals, send email, schedule reports or establish production readiness. The source contradiction in SPT-890 remains held.
