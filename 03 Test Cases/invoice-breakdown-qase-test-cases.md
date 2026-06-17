# Invoice Breakdown Qase Test Cases

Draft status: review only. Do not push to Qase until approved.

## Sources Reviewed

- Personal note: `07 Personal Notes/Chicken Scratch/Transactions test.md`
- Frontend feature spec: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/docs/plans/feature-specs/FEATURE_SPEC_transaction-financial-breakdown.md`
- Frontend implementation:
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/FinancialBreakdown.web.tsx`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/fee-breakdown-rules.ts`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/invoice-variants/invoice-variant-config.ts`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transaction-items-detail/TransactionItemsDetail.web.tsx`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transaction-items-detail/TransactionInvoiceItem/TransactionInvoiceItem.web.tsx`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transaction-items-detail/invoice-item/InvoiceItemBreakdownRows.web.tsx`
- Frontend tests:
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transactions-detail/financial-breakdown/FinancialBreakdown.test.tsx`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/fee-breakdown-rules.test.ts`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transaction-items-detail/TransactionItemsDetail.test.tsx`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transaction-items-detail/TransactionInvoiceItem/TransactionInvoiceItem.test.tsx`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transaction-items-detail/invoice-item/InvoiceItemBreakdownRows.test.tsx`

## Assumptions And Unknowns

- Existing Qase coverage was not queried for this draft. Run the `qasectl` read-first workflow before pushing these cases.
- Test data must already contain representative transaction invoices, or QA must create them in beta before execution.
- The primary user flow is Box Office Transactions at `/manage/box-office/transactions` with `enable_transaction_financial_breakdown` enabled.
- Platform coverage is listed as `WebBoxOffice / Desktop` because this is a dashboard Box Office workflow. Responsive layout checks are included where source and scratch notes call out mobile behavior.

## Risk Areas

- Financial rows can use similar-looking fields with different meanings, especially sale service fees versus refund service charges.
- Configured fee venues render named custom fee and tax rows instead of legacy aggregate tax and organizer fee rows.
- Some invoice families should show invoice items and context copy but no financial breakdown table.
- Breakdown child rows load lazily and must not hide already-rendered invoice item information.
- Header and invoice-item selection can include unloaded rows, while membership rows are download-only and not check-in eligible.

## Recommended Test Data

- Venue with `enable_transaction_financial_breakdown` enabled.
- User with `VP_ADMINISTER_TRANSACTIONS` and `VP_SCAN_TICKETS`.
- Sale, exchange, payment plan, refund, venue credit, payment due/service fee, exchange adjustment, exchange refund correction, ticket transfer, donation payout, payout, payment received, advance, attributed advance, dispute, credit memo, void, complimentary, and free payment invoices.
- Sale invoices with protection, service fees, payment plan fees, organizer fees, seller commissions, tax, tip, charity donation, shipping, partial refund, and amount paid.
- Configured-fee venue invoice with at least one named fee and one named tax, including tax applied to a fee.
- Invoice items covering tickets, products, memberships, ticket credits, assigned seats, and more child rows than the first loaded page.

## Qase-Ready Manual Test Cases

### Test Case 1: Dashboard - Transactions - Verify migrated financial breakdown layout opens from transaction detail

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify migrated financial breakdown layout opens from transaction detail

**Description:** Validates that a Box Office employee can expand a transaction and see the migrated Breakdown view with invoice item details, financial breakdown content, and purchase note content in the expected layout. This protects against missing expanded invoice details, hidden financial panels, broken default tab selection, and unreadable responsive layout.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |
| WebBoxOffice | Mobile |

**Preconditions:** A venue has `enable_transaction_financial_breakdown` enabled. The tester has dashboard access to `/manage/box-office/transactions`. At least one sale-style transaction has invoice items and financial data.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, box-office

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions for the enabled venue. | `/manage/box-office/transactions` | The transactions feed loads with transaction cards. |
| Expand a transaction that contains invoice items. | Sale, exchange, or payment plan invoice | The expanded detail area opens. |
| Review the selected tab and panel layout. |  | `Breakdown` is selected by default, invoice item details render on the left, and financial breakdown plus purchase note content render in the right column. |
| Resize or open the page in a narrow viewport and review the expanded detail. | Mobile-width browser viewport | The Breakdown content stacks without overlapping invoice item rows, financial rows, purchase note content, action buttons, or transaction metadata. |

### Test Case 2: Dashboard - Transactions - Verify sale-style financial breakdown rows

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify sale-style financial breakdown rows

**Description:** Validates that sale-style invoices show the expected Showpass financial rows for net sales, deductions, net revenue, add-backs, and settlement amount. This protects against incorrect row visibility, incorrect signs, and incorrect use of invoice money fields in expanded transaction details.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. The tester can access transactions for sale, exchange, and payment plan invoices with protection, service fees, payment plan fees, organizer fees, seller commissions, tax, tip, donation, shipping, partial refund, and amount paid where applicable.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, payment, fees-and-taxes

**Parameters:**
InvoiceType: Sale, Exchange, PaymentPlan

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the invoice. | InvoiceType | The expanded detail opens on the Breakdown tab. |
| Review the top rows of the financial breakdown. |  | Protection Fees appears when the invoice has protection, Net Sales appears for the invoice type, and Service Fees uses the sale-style service fee value. |
| Review deduction rows. |  | Payment Plan Fees, Organizer Fees, configured custom fees, Seller Commissions, Tax, Tip, and Charity Donation appear only when their invoice values apply. Deduction rows display as deductions. |
| Review subtotal and add-back rows. |  | Net Revenue appears when the invoice meets the visibility conditions, and Tax, Organizer Fee, configured fee rows, Shipping, and Tip are added back only when applicable. |
| Review the final row. |  | Settlement Amount appears and matches the invoice amount paid, including cases where amount paid differs from gross revenue because of partial refund or installment payment state. |

### Test Case 3: Dashboard - Transactions - Verify configured fee and tax breakdown rows

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify configured fee and tax breakdown rows

**Description:** Validates that configured-fee venues display named custom fee and tax rows in the transaction financial breakdown. This protects against showing legacy aggregate tax or organizer fee rows when the invoice uses configured venue fees.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** A configured-fee venue has an enabled transaction financial breakdown. A sale-style invoice includes at least one named fee, one named tax, and one tax applied to a fee.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, fees-and-taxes

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions for the configured-fee venue. |  | The transactions feed loads. |
| Expand the configured-fee invoice. | Sale-style invoice with custom fees | The Breakdown tab opens with the financial breakdown. |
| Review the fee deduction rows. |  | Named configured fee rows appear as deductions and are grouped by fee name where applicable. |
| Review the tax rows. |  | Named configured tax rows appear with tax number where available, including taxes applied to fees. |
| Confirm legacy aggregate rows are not incorrectly shown. |  | Legacy Organizer Fees and aggregate Tax rows do not replace the configured fee and configured tax rows for this invoice. |

### Test Case 4: Dashboard - Transactions - Verify refund and venue credit financial breakdown rows

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify refund and venue credit financial breakdown rows

**Description:** Validates that refund-style invoices show base refund, tax, fees, total refund, refund reason, and refunded-by information where available. This protects against incorrect refund math, missing refund audit details, and incorrect display of company-fee-only refunds.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. Refund and venue credit invoices exist with tax, service charges, protection charges, refund reason, and refunded-by user where applicable. A company-fee-only refund exists if available.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, refunds, fees-and-taxes

**Parameters:**
InvoiceType: Refund, VenueCredit

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the invoice. | InvoiceType | The expanded detail opens on the Breakdown tab. |
| Review refund-style financial rows. |  | Protection Fees appears only when applicable, Base Refund subtracts tax, service charges, and protection charges from the final amount, Tax and Fees appear only when non-zero, and Total Refund appears. |
| Review refund audit information. | Refund reason and refunded-by user present | Refund reason and Refunded by details appear with the expected user name and email where the API provides them. |
| Expand a company-fee-only refund if test data exists. | `only_company_fee_refunded` invoice | The refund-style financial table is suppressed when the invoice has no eligible breakdown table, and no detached refunded-by footer appears by itself. |

### Test Case 5: Dashboard - Transactions - Verify payment due service fee financial breakdown rows

**Priority:** Medium  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify payment due service fee financial breakdown rows

**Description:** Validates that payment due invoices show the service-fee style financial breakdown instead of sale or refund rows. This protects against incorrect labels, incorrect base service fee math, and missing tax or protection rows.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. A payment due or service fee invoice exists with tax, service charges, final amount, and optional protection charges.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, payment, fees-and-taxes

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the payment due invoice. | Payment due/service fee invoice | The expanded detail opens on the Breakdown tab. |
| Review the financial breakdown rows. |  | Protection Fees appears when applicable, Base Service Fee appears when tax is non-zero, Tax appears when non-zero, Fees appears when service charges are non-zero, and Total Service Fee appears. |
| Compare row labels against the invoice type. |  | Sale-style rows such as Net Sales and Settlement Amount do not appear, and refund-style labels such as Base Refund or Total Refund do not replace the service-fee labels. |

### Test Case 6: Dashboard - Transactions - Verify exchange adjustment financial breakdown rows

**Priority:** Medium  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify exchange adjustment financial breakdown rows

**Description:** Validates that exchange adjustment invoices show the minimal exchange adjustment breakdown with net sales, service fees, and settlement amount. This protects against incorrect signs and unrelated sale, refund, or payment due rows appearing for exchange adjustment invoices.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. Exchange adjustment and exchange refund correction invoices exist with final amount, service charges, organizer charges, protection charges, and amount paid.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, exchanges, fees-and-taxes

**Parameters:**
InvoiceType: ExchangeAdjustment, ExchangeRefundCorrection

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the invoice. | InvoiceType | The expanded detail opens on the Breakdown tab. |
| Review exchange adjustment rows. |  | Net Sales, Service Fees, and Settlement Amount appear with the expected values for the exchange adjustment invoice. |
| Check for unrelated financial rows. |  | Sale-style, refund-style, and payment due rows do not appear for this invoice type. |

### Test Case 7: Dashboard - Transactions - Verify invoices without financial tables still show correct breakdown context

**Priority:** Medium  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify invoices without financial tables still show correct breakdown context

**Description:** Validates that invoice families excluded from financial table rendering still show the appropriate transaction context and item details without rendering an incorrect financial breakdown. This protects against false financial rows on payout, transfer, void, dispute, credit memo, complimentary, free, and related invoice families.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. Test data includes representative excluded invoice families and payment types.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, edge-case

**Parameters:**
InvoiceFamily: Transfer, ComplimentaryPayment, FreePayment, Dispute, Void, CreditMemo, Payout, PaymentReceived, Advance, AttributedAdvance, TicketTransfer, DonationPayout

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the invoice. | InvoiceFamily | The transaction detail expands without a financial table where that invoice family is excluded from financial breakdown rendering. |
| Review the expanded content. |  | Invoice item details and applicable context messages still render where supported. |
| Review the right-side financial area. |  | No sale-style, refund-style, payment due, or exchange adjustment financial rows appear for the excluded invoice family. |
| Review transfer or donation payout cases where available. | TicketTransfer or DonationPayout | The items list can render while the financial table remains suppressed. |

### Test Case 8: Dashboard - Transactions - Verify invoice item breakdown rows for tickets, products, and memberships

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify invoice item breakdown rows for tickets, products, and memberships

**Description:** Validates that the Breakdown tab displays parent invoice item rows and child item rows for Showpass tickets, products, memberships, ticket credits, and assigned seats. This protects against missing purchased item details, incorrect child status badges, missing seat information, and duplicated fallback item descriptions.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. Transactions exist with ticket, product, membership, ticket credit, and assigned seating invoice items.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, tickets, products, memberships

**Parameters:**
ItemType: Ticket, Product, Membership, TicketCredit, AssignedSeat

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the transaction. | ItemType | The Breakdown tab opens and displays parent invoice item rows. |
| Review the parent invoice item row. |  | Event or item name, ticket type or subtitle, quantity, price, and total appear where applicable. |
| Expand the parent invoice item row. |  | Child rows load under the correct parent item. |
| Review child row details. |  | Ticket rows show barcode, attendee name, status, and seat details where applicable. Product rows show product details and supported status. Membership rows show member username and membership status. Ticket credit rows show ticket credit copy and usage instead of barcode/status copy. |
| Collapse and re-expand the parent row. |  | Child rows hide and return under the same parent without duplicating fallback descriptions or moving to another invoice item. |

### Test Case 9: Dashboard - Transactions - Verify breakdown pagination and loading preserves visible item details

**Priority:** Medium  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify breakdown pagination and loading preserves visible item details

**Description:** Validates that invoice item child rows load lazily and paginate without replacing already-visible invoice item information. This protects against blank parent rows, lost child rows, and loading states affecting unrelated invoice items or financial panels.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. A transaction exists with at least one invoice item containing more child rows than the initial page size.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, tickets, memberships

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the transaction. | Invoice with paginated child rows | The Breakdown tab opens with parent invoice item rows visible. |
| Expand an invoice item that has additional child rows. |  | The child rows load under that invoice item. |
| Load additional child rows. | Show more or infinite loading control | Existing child rows remain visible while new rows load, and new rows append under the correct invoice item. |
| Review unrelated page content during loading. |  | Other invoice item rows and the financial breakdown panel remain visible and readable while the selected invoice item loads more children. |

### Test Case 10: Dashboard - Transactions - Verify breakdown selection, download, and check-in behavior

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify breakdown selection, download, and check-in behavior

**Description:** Validates that Box Office employees can select invoice items and child items from the Breakdown tab for download and check-in workflows. This protects against selected unloaded items being ignored, memberships being sent to check-in, incorrect all-item labels, and stale selection state after printing or check-in.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. The tester has `VP_SCAN_TICKETS`. Transactions exist with ticket-only, product-only, membership-only, and mixed invoices, including checked-in and unchecked ticket/product rows.

**Postconditions:** Any checked-in items used during the test are returned to their original state where necessary.

**Tags:** dashboard, transactions, tickets, products, memberships, check-in, printing

**Parameters:**
SelectionScope: ChildRow, ParentInvoiceItem, AllInvoiceItems

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand a transaction. | SelectionScope | The Breakdown tab opens with available selection controls. |
| Select items using the requested selection scope. | SelectionScope | The selected state is reflected on child rows, parent rows, or the header checkbox as applicable. |
| Use Download for the selected scope. | Tickets, products, memberships, or mixed invoice | Selected downloadable items are included. Memberships can be selected for download where supported. Mixed invoices do not download only tickets when products or memberships are selected. |
| Use Check in for eligible selected items. | Tickets or products | Eligible unchecked ticket/product items check in successfully. |
| Select already checked-in eligible items and use Undo check-in if available. | Checked-in ticket/product rows | Eligible checked-in items can be undone. |
| Select membership rows and review available actions. | Membership invoice item | Memberships do not show or trigger check-in actions and are not sent in check-in payloads. |
| Clear selection or complete print/check-in. |  | Button labels and disabled states return to the unselected state, and stale selection does not remain after the workflow completes. |
