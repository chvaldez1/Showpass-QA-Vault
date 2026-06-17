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
- Backend source truth:
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/financial_invoices_rate_cards_and_settlements.md`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/itemized_calculations.md`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/domains/core_ticketing_entities_and_relationships.md`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_cost_breakdown.py`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_items.py`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_items_stats.py`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/serializers.py`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/constants/constants.py`

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
- Backend invoice totals and invoice item stat fields can intentionally diverge for packages, memberships, sub tickets, advances, gift-card advance adjustments, and revenue realization adjustments.

## Backend Line Item And Stat Coverage Checklist

Use this checklist when preparing data for these cases. The UI does not necessarily render every backend field as a separate row, but the test data should include each field family somewhere so incorrect row math, suppression, and signs are detectable.

- Backend invoice money fields to cover: `items_total_amount`, `discounts`, `tax`, `service_charges`, `company_charges`, `cc_charges`, `protection_charges`, `kickbacks`, `cash_kickbacks`, `organizer_charges`, `cash_organizer_charges`, `shipping_cost`, `amount_earned`, `amount_company_earned`, `amount_paid`, `final_amount`, `amount_refunded`, `credit_amount_refunded`, `total_commission`, `dispute_fee`, `tip_money`, `tip_charges`, `donation_amount`, `credit_applied`, `amount_credit_issued`, and `final_amount_credit_adjustment`.
- Invoice-level context fields that alter labels, row visibility, or audit copy: `payment_type`, `type`, `purchase_source_platform`, `uses_added_fee_calculation`, `only_company_fee_refunded`, `has_payment_plan`, `payment_plan_total_fees`, `is_disputed`, `is_refunded`, `credit_type`, `fee_structure`, `venue_internal_fees`, `venue_custom_fees`, `refund_reason`, `refund_type`, `refunded_by_user`, `source_channel`, `is_itemized`, `has_protection`, `discount_codes`, and `transfer_user_data`.
- Configured fee and tax rows: venue internal fees, venue custom fees, custom fee names, custom tax names, tax numbers, tax applied to fees, fee/tax values filtered by item type, payment type, purchase platform, price range, and owner object.
- Invoice item identity and relationship fields: `type`, `description`, `quantity`, `transfer_quantity`, `price`, `event`, `ticket_type`, `product`, `product_attribute`, `membership_group`, `membership_level`, `gift_card`, `gift_card_denomination`, `gift_card_recipient`, `price_tier`, `is_sub_ticket`, `parent_ticket_invoice_item`, `invoice_item_being_adjusted`, `payment_plan`, `subscription`, `shipping_type`, `discount_code`, `discounts_applied`, `is_payment_plan`, `is_initial_payment_plan_purchase`, `payment_plan_num_of_installments`, `is_native_donation`, `is_itemized`, and `is_pay_what_you_can`.
- Invoice item type families to cover where data exists: Product, Ticket, Membership, Gift Card, Refund, Transfer, Membership Renewal, Settlement, Fee, Chargeback, Credit Memo, Void, Tip, Payment Plan, Plan Completed, Advance, Donation, Protection, User Credit, Venue Credit, Exchange Credit, Exchange Adjustment, Exchange Refund Correction, Gift Card Advanced Adjustment, Gift Card Advanced Refund Adjustment, Revenue Realization Adjustment, Revenue Realization Negation, Itemization Adjustment, and Exchange Surplus.
- Invoice item base money fields exposed to Transactions: `amount_earned`, `tax`, `final_amount`, `amount_refunded`, `discounts`, `kickbacks`, `service_charges`, `amount_paid`, `shipping_cost`, `cash_kickbacks`, `total_commission`, `organizer_charges`, `cash_organizer_charges`, `company_charges`, `cc_charges`, `credit_applied`, `donation_amount`, `protection_charges`, `amount_company_earned`, `venue_internal_fees`, and `venue_custom_fees`.
- Invoice item stat fields exposed to Transactions: `final_amount_stat`, `amount_refunded_stat`, `discounts_stat`, `kickbacks_stat`, `service_charges_stat`, `amount_paid_stat`, `shipping_cost_stat`, `cash_kickbacks_stat`, `total_commission_stat`, `organizer_charges_stat`, `cash_organizer_charges_stat`, `company_charges_stat`, `cc_charges_stat`, `credit_applied_stat`, `venue_internal_fees_stat`, `venue_custom_fees_stat`, `amount_earned_stat`, and `tax_stat`.
- Additional backend stat fields to consider during data review even if the current dashboard does not expose each one directly: `items_total_amount_stat`, `amount_company_earned_stat`, `credit_amount_refunded_stat`, `protection_charges_stat`, `dispute_fee_stat`, `tip_money_stat`, `tip_charges_stat`, `donation_amount_stat`, `amount_credit_issued_stat`, `final_amount_credit_adjustment_stat`, `cc_charges_tax_stat`, `pre_tax_cc_charges_stat`, `company_charges_tax_stat`, `pre_tax_company_charges_stat`, `organizer_item_tax_stat`, `organizer_fee_tax_stat`, `discovery_charges_stat`, `discovery_charges_tax_stat`, `pre_tax_discovery_charges_stat`, `resale_charges_stat`, `resale_charges_tax_stat`, and `pre_tax_resale_charges_stat`.
- Item state and action fields that affect row behavior: `is_refunded`, `is_customer_refunded`, `is_voided`, `only_company_fee_refunded`, `refund_in_progress`, `max_refundable_amount`, `partial_refund_blocked`, `absorbed_taxes`, `absorbed_fees`, `absorbed_organizer_fees`, `protection`, `shipping_fulfillment_status`, `quantity_included_in_total`, and payout date eligibility.

## Recommended Test Data

- Venue with `enable_transaction_financial_breakdown` enabled.
- User with `VP_ADMINISTER_TRANSACTIONS` and `VP_SCAN_TICKETS`.
- Sale, exchange, payment plan, payment plan completed, refund, venue credit, user credit, exchange credit, payment due/service fee, exchange adjustment, exchange surplus, exchange refund correction, ticket transfer, donation payout, payout, payment received, advance, attributed advance, dispute, credit memo, void, complimentary, free payment, gift card, gift-card advance adjustment, revenue realization adjustment, revenue realization negation, and itemization adjustment invoices.
- Sale invoices with discounts, protection, service fees, payment plan fees, organizer fees, seller commissions, tax, tip, charity donation, shipping, credit applied, credit issued, partial refund, dispute fee, and amount paid.
- Configured-fee venue invoice with at least one named internal fee, one named custom fee, one named tax, and tax applied to a fee.
- Invoice items covering tickets, products, memberships, membership renewals, gift cards, donations, protection, tips, fees, settlements, credits, refunds, advances, ticket credits, assigned seats, sub tickets/package children, and more child rows than the first loaded page.
- At least one invoice item where base financial fields and `*_stat` fields differ because of package/sub-ticket allocation, membership revenue realization, advance handling, gift-card adjustment, or itemization adjustment.

## Qase-Ready Manual Test Cases

### Test Case 2: Dashboard - Transactions - Verify financial breakdown rows by invoice variant

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify financial breakdown rows by invoice variant

**Description:** Validates that each supported invoice breakdown variant displays the correct Showpass financial rows and labels in expanded transaction details. This protects against incorrect row visibility, incorrect signs, incorrect service-fee math, and unrelated rows appearing for the wrong invoice type.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. A venue employee can access invoices for each invoice variant listed in the Parameters section. Test data includes applicable discounts, protection, service charges, payment plan fees, organizer fees, seller commissions, tax, tip, donation, shipping, credits, dispute fee, partial refund, and amount paid values.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, fees-and-taxes

**Parameters:**
InvoiceVariant: Sale, Exchange, PaymentPlan, PaymentPlanCompleted, Refund, VenueCredit, UserCredit, ExchangeCredit, PaymentDue, ExchangeAdjustment, ExchangeSurplus, ExchangeRefundCorrection

**Steps:**

| Step Action                                                       | Data           | Expected Result                                                                    |
| ----------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| Open Box Office Transactions and expand the invoice.              | InvoiceVariant | The expanded detail opens on the Breakdown tab.                                    |
| Review the financial row labels for the selected invoice variant. | InvoiceVariant | The breakdown shows only the row labels supported by the selected invoice variant. |
| Review financial row signs and values.                            | InvoiceVariant | Row signs and totals match the selected invoice's backend financial values.        |
| Confirm unrelated rows are absent.                                | InvoiceVariant | Rows from other invoice variants do not appear in the breakdown.                   |

### Test Case 3: Dashboard - Transactions - Verify fee, tax, protection, and refund audit details

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify fee, tax, protection, and refund audit details

**Description:** Validates that transaction financial breakdown details display configured fee rows, legacy aggregate rows, protection rows, payment-plan fees, credit rows, dispute state, refund reason, and refunded-by information only when the invoice data supports them. This protects against missing named fee and tax rows, incorrect legacy fee rows, missing refund audit details, and detached audit details for company-fee-only refunds.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. Test data includes a legacy-fee sale invoice, a configured-fee sale invoice with named internal fees, custom fees, taxes, and fee taxes, a protected invoice, a payment-plan invoice, an invoice with credits applied or issued, a disputed invoice, a refund with reason and refunded-by user, and a company-fee-only refund where available.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions, fees-and-taxes

**Parameters:**
BreakdownDetail: LegacyFees, ConfiguredFees, ProtectionFees, PaymentPlanFees, SellerCommission, Tip, Donation, Shipping, CreditApplied, CreditIssued, DisputeState, RefundAudit, CompanyFeeOnlyRefund

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the matching invoice. | BreakdownDetail | The expanded detail opens on the Breakdown tab. |
| Review the financial detail rows or audit detail for the selected scenario. | BreakdownDetail | LegacyFees shows aggregate Organizer Fees and aggregate Tax rows only when applicable. ConfiguredFees shows named internal fee, custom fee, and tax rows with tax number where available, including taxes applied to fees; legacy aggregate Organizer Fees or aggregate Tax rows do not replace configured rows. ProtectionFees, PaymentPlanFees, SellerCommission, Tip, Donation, Shipping, CreditApplied, CreditIssued, and DisputeState show only when their backend fields are populated and use the selected invoice variant's expected sign and label treatment. RefundAudit shows refund reason and Refunded by details with the expected user name and email where the API provides them. CompanyFeeOnlyRefund suppresses the refund-style financial table and does not show a detached refunded-by footer by itself. |
| Confirm unrelated detail rows are absent. | BreakdownDetail | The expanded financial detail does not show fee, tax, protection, payment-plan, commission, tip, donation, shipping, credit, dispute, refund audit, or refunded-by rows that are not supported by the selected invoice data. |

### Test Case 4: Dashboard - Transactions - Verify invoices without financial tables still show correct breakdown context

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
InvoiceFamily: Transfer, ComplimentaryPayment, FreePayment, Settlement, Fee, Dispute, Void, CreditMemo, Payout, PaymentReceived, Advance, AttributedAdvance, TicketTransfer, DonationPayout, GiftCardAdvancedAdjustment, GiftCardAdvancedRefundAdjustment, RevenueRealizationAdjustment, RevenueRealizationNegation, ItemizationAdjustment

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the invoice. | InvoiceFamily | The transaction detail expands without a financial table where that invoice family is excluded from financial breakdown rendering. |
| Review the expanded content. |  | Invoice item details and applicable context messages still render where supported. |
| Review the right-side financial area. |  | No sale-style, refund-style, payment due, or exchange adjustment financial rows appear for the excluded invoice family. |
| Review transfer or donation payout cases where available. | TicketTransfer or DonationPayout | The items list can render while the financial table remains suppressed. |

### Test Case 5: Dashboard - Transactions - Verify invoice item breakdown rows by item type

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify invoice item breakdown rows by item type

**Description:** Validates that the Breakdown tab displays parent invoice item rows, child item rows, and backend stat values for Showpass tickets, products, memberships, gift cards, credits, fees, and adjustment item types. This protects against missing purchased item details, incorrect child status badges, missing seat information, incorrect stat/base field usage, and duplicated fallback item descriptions.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. Transactions exist with invoice items matching the Parameters section, including at least one invoice item where base financial fields and `*_stat` fields intentionally differ.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions

**Parameters:**
ItemType: Ticket, Product, Membership, MembershipRenewal, GiftCard, Donation, Protection, Tip, PaymentPlan, PlanCompleted, Fee, Settlement, Refund, Transfer, Chargeback, CreditMemo, Void, Advance, UserCredit, VenueCredit, ExchangeCredit, ExchangeAdjustment, ExchangeSurplus, ExchangeRefundCorrection, GiftCardAdvancedAdjustment, GiftCardAdvancedRefundAdjustment, RevenueRealizationAdjustment, RevenueRealizationNegation, ItemizationAdjustment, TicketCredit, AssignedSeat, SubTicketOrPackageChild

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the transaction. | ItemType | The Breakdown tab opens and displays parent invoice item rows. |
| Review the parent invoice item row. | ItemType | Event or item name, ticket type or subtitle, product, membership, gift card, credit, fee, adjustment, or fallback description appears as applicable with quantity, price, total, and status fields supported by that item type. |
| Expand the parent invoice item row. | ItemType | Child rows load under the correct parent item. |
| Review child row details. | ItemType | Ticket rows show barcode, attendee name, status, and seat details where applicable. Product rows show product details and supported status. Membership rows show member username and membership status. Gift card rows show gift-card identity where available. Ticket credit and credit rows show credit copy and usage instead of barcode/status copy. Non-child item types remain readable and do not show unrelated child controls. |
| Compare visible item money to backend stats for the selected item. | ItemType | Rows that are driven by invoice item stats use the `*_stat` values when available, including custom/internal fee stat JSON. Rows do not fall back to base fields when the stat fields intentionally differ for package/sub-ticket allocation, membership realization, advances, gift-card adjustments, or itemization adjustments. |
| Collapse and re-expand the parent row. |  | Child rows hide and return under the same parent without duplicating fallback descriptions or moving to another invoice item. |

### Test Case 6: Dashboard - Transactions - Verify breakdown pagination preserves visible item details

**Priority:** Medium  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify breakdown pagination preserves visible item details

**Description:** Validates that invoice item child rows load lazily and paginate without replacing already-visible invoice item information. This protects against blank parent rows, lost child rows, and loading states affecting unrelated invoice items or financial panels.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. A transaction exists with at least one invoice item containing more child rows than the initial page size.

**Postconditions:** No transaction data is changed.

**Tags:** dashboard, transactions

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand the transaction. | Invoice with paginated child rows | The Breakdown tab opens with parent invoice item rows visible. |
| Expand an invoice item that has additional child rows. |  | The child rows load under that invoice item. |
| Load additional child rows. | Show more or infinite loading control | Existing child rows remain visible while new rows load, and new rows append under the correct invoice item. |
| Review unrelated page content during loading. |  | Other invoice item rows and the financial breakdown panel remain visible and readable while the selected invoice item loads more children. |

### Test Case 7: Dashboard - Transactions - Verify breakdown selection, download, and check-in behavior

**Priority:** High  
**Type:** Regression  
**Area:** Dashboard transactions

**Title:** Dashboard - Transactions - Verify breakdown selection, download, and check-in behavior

**Description:** Validates that Box Office employees can select invoice items and child items from the Breakdown tab for download and check-in workflows. This protects against selected unloaded items being ignored, memberships being sent to check-in, incorrect all-item labels, and stale selection state after printing or check-in.

| Platform | View |
|----------|------|
| WebBoxOffice | Desktop |

**Preconditions:** The venue has `enable_transaction_financial_breakdown` enabled. A venue employee has `VP_SCAN_TICKETS`. Transactions exist with ticket-only, product-only, membership-only, and mixed invoices, including checked-in and unchecked ticket/product rows.

**Postconditions:** Any checked-in items used during the test are returned to their original state where necessary.

**Tags:** dashboard, transactions, check-in

**Parameters:**
SelectionScenario: ChildTicketDownload, ParentTicketItemCheckIn, AllTicketItemsCheckIn, MixedItemsDownload, MembershipDownloadOnly

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open Box Office Transactions and expand a transaction matching the selected scenario. | SelectionScenario | The Breakdown tab opens with available selection controls for the selected scenario. |
| Select items using the scenario scope. | SelectionScenario | ChildTicketDownload selects a child ticket row. ParentTicketItemCheckIn selects one ticket invoice item. AllTicketItemsCheckIn selects all eligible ticket items, including unloaded items. MixedItemsDownload selects downloadable ticket, product, and membership items. MembershipDownloadOnly selects membership rows without selecting check-in targets. |
| Run the scenario action. | SelectionScenario | ChildTicketDownload downloads the selected child ticket. ParentTicketItemCheckIn checks in eligible child tickets under the selected parent invoice item. AllTicketItemsCheckIn checks in all eligible tickets, including unloaded rows. MixedItemsDownload includes selected tickets, products, and memberships instead of downloading only tickets. MembershipDownloadOnly allows download where supported and does not show or trigger check-in actions. |
| Review completed state. | SelectionScenario | Button labels and disabled states return to the unselected state, stale selection does not remain after printing or check-in, and memberships are never sent in check-in payloads. |
