# Cash And Other Exchange Qase Test Cases

Draft status: review only. Do not push to Qase until approved.

## Source Context

- Ticket: [https://showpass.atlassian.net/browse/SPW-19166](https://showpass.atlassian.net/browse/SPW-19166)
- PR: [fix (financials) | [SPW-19166] Enhance itemized exchange logic to handle cash and other payments](https://bitbucket.org/%7Bc541ac30-c239-4506-bdce-4a517dac5fdf%7D/%7B6b5ad812-d5a5-4ed8-9722-1febf4d2fec9%7D/pull-requests/9012)

## Behavior Summary

Cash and Other are external-money payment types. The organizer collected the customer money outside Showpass, so a replacement purchase paid by Exchange Credit must not pay the organizer again for the same ticket value. If the original Cash or Other sale owed Showpass fees, the final settlement can be negative; a zero payout is not automatically correct.

Other full-credit exchange behavior is guarded by `enable_box_office_other_full_credit_exchanges`. Repeated exchanges must trace financial context back to the original Cash or Other sale, not the previous Exchange Credit replacement.

## Recommended Test Data

- Venue with Box Office, Cash payments, Other payments, exchanges, and itemized exchanges enabled.
- Future event with ticket types `TT worth $50` and `TT worth 75`.
- Venue employee with permission to sell Box Office tickets, exchange tickets, and view transactions and settlement data.
- Optional stable data for assigned seating, products, memberships, donations, refund protection, group sales, holds, delivery settings, and regular account credit.

## Settlement Values To Watch

Use these numbers as a compact inspection guide. Replace the sample values with the actual invoice values from the test run.

Same-value exchange sample:

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Invoice row | Value to check | Expected sample |
| Original Cash/Other sale | `payment_type` | Cash or Other / `Cheque` |
| Original Cash/Other sale | `amount_paid` or `amount_paid_stat` | `-5.13` fee debt remains owed to Showpass |
| Replacement invoice | `payment_type` | Exchange Credit |
| Replacement invoice | `amount_paid` or `amount_paid_stat` | `60.00` replacement value |
| Exchange adjustment invoice | `amount_paid` or `amount_paid_stat` | `-60.00` offset for replacement value |
| Invoice chain | Replacement plus adjustment | `0.00` |
| Invoice chain | Original plus replacement plus adjustment | `-5.13`, not `0.00` |


Higher-value replacement sample:

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Scenario | Value to check | Expected sample |
| Original external sale | Original fee debt | `-5.13` remains unchanged |
| Replacement upgrade | Exchange Credit applied | `60.00` |
| Replacement upgrade | Remaining top-up | `15.00` if upgrading from `60.00` to `75.00` |
| Exchange adjustment | Offset for credit portion | `-60.00` |
| Settlement | Exchange Credit portion | Nets to `0.00`; only top-up follows normal Cash/Other settlement |


Lower-value or partial-itemized sample:

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Scenario | Value to check | Expected sample |
| Lower-value replacement | Credit used | Only the replacement value, such as `40.00` |
| Lower-value adjustment | Offset | Equal and opposite to credit used, such as `-40.00` |
| Partial itemized exchange | Selected item value | Offset uses selected items only, not the full original invoice |


Bug signals:

- Replacement Exchange Credit value is paid out to the organizer again.
- The adjustment amount does not equal the applied Exchange Credit amount.

## Risk Areas

- 🚨 Organizer is paid twice for a Cash or Other original sale that is exchanged into a replacement covered by Exchange Credit.
- Other full-credit exchanges are allowed while `enable_box_office_other_full_credit_exchanges` is disabled.
- Higher-value replacements lose the remaining Cash or Other top-up payment context.
- Partial itemized exchanges offset the full original sale instead of only selected items.
- Payout, payment type breakdown, transaction detail, and exports disagree on Cash, Other, exchange adjustment, or replacement invoice totals.

## Gap Analysis Addendum

Sources reviewed for missing practical coverage:

- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/credit_management/user_credit.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/user_credits/exchanges/credit_create_validation.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/user_credits/exchanges/exchange_cancellations.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_invoice_exchange.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_admin_refunds.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_discounts.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_square_oauth_invoice_refund.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/services/financial_reports/financial_report.py`
- Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reports/constants.py`
- Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/exchanges/hooks/usePublicExchangeManager.ts`
- Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/components/application/data-display/NavBarBanners/NavBarExchangeBanner.web.tsx`
- Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/exchanges/components/CancelItemizedExchangeBanner/CancelItemizedExchangeBanner.web.tsx`
- Playwright patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/box-office-journey.ts`
- Playwright patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/shared/banner/ExchangeCreditBanner.ts`

Missing practical cases added:

- Canceling an active temporary exchange before replacement checkout, to verify the original Cash or Other sale is not left in an in-progress exchange state.
- Refunding a completed Cash or Other exchange chain, to verify the refund, exchange adjustment, and exchange refund correction remain aligned.
- Exchanging Square Terminal purchases across internal Showpass Square and external client Square setups, to verify settlement and fee attribution.

## Qase-Ready Manual Test Cases

### Test Case 1: Box Office - Exchanges - Verify same-value Cash or Other exchange settlement

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify same-value Cash or Other exchange settlement

**Description:** Validates that a venue employee can exchange a same-value Cash or enabled Other Box Office sale into a replacement fully covered by Exchange Credit. This protects against duplicate organizer payout, wrong replacement payment type, and lost original external-payment context.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** Cash and Other Box Office payments are enabled. `enable_box_office_other_full_credit_exchanges` is enabled for the Other parameter value. `QA Original 50` exists and can be exchanged without extra fees.

**Postconditions:** Created exchange invoices and tickets remain available for settlement/report review.

**Tags:** box-office, exchanges, payouts

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Complete a Box Office sale for one `QA Original 50`. | OriginalPayment | The original invoice is completed with the selected external payment type. |
| Start an exchange from the original transaction and select a same-value replacement. | OriginalPayment | The replacement checkout is fully covered by Exchange Credit. |
| Complete the replacement checkout. | OriginalPayment | New tickets are issued and the replacement invoice payment type is Exchange Credit. |
| Review replacement and exchange adjustment invoice values. | OriginalPayment | Replacement `amount_paid` and adjustment `amount_paid` are equal and opposite. |
| Review settlement or payout detail for the invoice chain. | OriginalPayment | Chain total remains the original fee debt, such as `-5.13`, instead of becoming `0.00`. |


[https://app.qase.io/case/SPT/edit/4823](https://app.qase.io/case/SPT/edit/4823)

### Test Case 2: Box Office - Exchanges - Verify disabled Other full-credit exchange remains blocked

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify disabled Other full-credit exchange remains blocked

**Description:** Validates that Other-origin full-credit exchanges are blocked when the Other exchange switch is disabled. This protects against bypassing the feature guard and creating replacement invoices or settlement adjustments from an unsupported Other exchange path.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** Other Box Office payments are enabled. `enable_box_office_other_full_credit_exchanges` is disabled. `QA Original 50` exists.

**Postconditions:** No replacement invoice or consumed exchange credit should exist for the blocked attempt.

**Tags:** box-office, exchanges, edge-case

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Complete a Box Office sale for one `QA Original 50` using Other / `Cheque`. |  | The original invoice is completed as an Other sale. |
| Start an exchange from the original transaction and select a same-value replacement. |  | The exchange flow reaches the guarded full-credit path. |
| Attempt to complete checkout with full Exchange Credit coverage. |  | The system blocks the Other-origin exchange. |
| Review transactions and settlement data. |  | No replacement invoice, consumed exchange credit, voided old ticket, or settlement adjustment is committed. |
| Repeat the same-value flow with a Cash original sale. |  | Cash-origin exchange remains available while the Other switch is disabled. |


> Can initiate purchase but blocked at the end

### Test Case 3: Box Office - Exchanges - Verify higher-value replacement top-up handling

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify higher-value replacement top-up handling

**Description:** Validates that a venue employee can exchange an external-payment sale into a higher-value replacement and collect only the remaining balance. This protects against losing the final Cash or Other top-up payment type and treating the Exchange Credit portion as new organizer money.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** `QA Original 50` and `QA Upgrade 75` exist. Higher-value exchanges are enabled. The Other switch is enabled for the Other parameter value.

**Postconditions:** Created exchange invoices remain available for settlement/report review.

**Tags:** box-office, exchanges, payouts

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Complete a Box Office sale for one `QA Original 50`. | OriginalPayment | The original invoice is completed with the selected external payment type. |
| Start an exchange and select one `QA Upgrade 75`. | OriginalPayment | Checkout shows Exchange Credit applied and a remaining balance. |
| Pay the remaining balance with the same external payment type. | OriginalPayment | The replacement purchase succeeds and collects only the additional amount. |
| Review the replacement invoice. | OriginalPayment | The invoice preserves the top-up payment type and applied credit amount, such as `60.00` credit plus `15.00` top-up. |
| Review settlement or payout detail. | OriginalPayment | The Exchange Credit portion has a matching negative adjustment and only the top-up follows normal settlement. |


[https://app.qase.io/case/SPT-4825](https://app.qase.io/case/SPT-4825)

### Test Case 4: Box Office - Exchanges - Verify lower-value replacement credit handling

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify lower-value replacement credit handling

**Description:** Validates that lower-value replacements apply only the used Exchange Credit amount from a Cash or Other original sale. This protects against incorrect payout offsets and unused credit creating extra settlement movement.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** A Cash or enabled Other original sale exists with a value higher than the replacement basket. Venue has to have overflow enabled.

**Postconditions:** Created credit and exchange invoices remain available for review.

**Tags:** box-office, exchanges, credits

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Start an exchange from the higher-value original transaction. | OriginalPayment | The selected original item creates exchange credit. |
| Select a lower-value replacement item. | OriginalPayment | Checkout applies only the amount needed for the replacement. |
| Complete the replacement checkout. | OriginalPayment | The replacement succeeds according to the expected leftover-credit behavior. |
| Review credit and settlement data. | OriginalPayment | The adjustment offsets only used credit, such as `-40.00` for a `40.00` replacement. |


[https://app.qase.io/case/SPT-4828](https://app.qase.io/case/SPT-4828)

### Test Case 5: Box Office - Exchanges - Verify repeated Cash or Other exchange ancestry

**Priority:** High  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify repeated Cash or Other exchange ancestry

**Description:** Validates that repeated exchanges keep settlement context tied to the original Cash or Other sale. This protects against using the previous Exchange Credit replacement as the financial root or duplicating the original exchange adjustment.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** A same-value exchange from Test Case 1 has been completed and the first replacement invoice is eligible for exchange.

**Postconditions:** Original and replacement invoice IDs remain available for reporting review.

**Tags:** box-office, exchanges, payouts

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Start an exchange from the first replacement transaction. | OriginalPayment | The replacement invoice is eligible for another exchange. |
| Complete a second same-value replacement fully covered by Exchange Credit. | OriginalPayment | A second replacement invoice is created with Exchange Credit payment type. |
| Review invoice ancestry for the exchange chain. | OriginalPayment | The second replacement traces back to the original external-payment sale. |
| Review settlement or payout detail. | OriginalPayment | Each replacement has its own equal-and-opposite adjustment and the original fee debt remains unchanged. |
| Review final replacement invoice metadata. | OriginalPayment | Exchange Credit invoices do not retain stale external-payment metadata. |


[https://app.qase.io/case/SPT-4827](https://app.qase.io/case/SPT-4827)

### Test Case 6: Box Office - Exchanges - Verify temporary Cash or Other exchange can be canceled before checkout

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify temporary Cash or Other exchange can be canceled before checkout

**Description:** Validates that a customer can cancel a temporary exchange credit from a Box Office Cash or enabled Other sale before replacement checkout. This protects against stuck exchange credit, missing tickets, and blocked follow-up exchanges after the replacement purchase is not completed.

| Platform     | View    |
|--------------|---------|
| WebBoxOffice | Desktop |
| WebPublic    | Desktop |

**Preconditions:** Cash and Other Box Office payments are enabled. `enable_box_office_other_full_credit_exchanges` is enabled for the Other parameter value. The original sale is attached to a customer account that can access the order from My Orders.

**Postconditions:** No replacement invoice or exchange adjustment invoice should remain for the canceled attempt.

**Tags:** box-office, exchanges, edge-case

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete a Box Office sale for one `QA Original 50` assigned to the customer account. | OriginalPayment | The original invoice is completed with the selected external payment type and appears in the customer's orders. |
| Sign in as the customer and start an itemized exchange from the order. | OriginalPayment | A temporary Exchange Credit is created and the replacement checkout path is available. |
| Leave the replacement checkout without completing the purchase. |  | No replacement invoice is created. |
| Cancel the active exchange from the visible exchange banner or exchange control. |  | The temporary Exchange Credit is removed and the exchange banner no longer appears. |
| Review the original transaction and tickets. |  | The original transaction remains available and the original tickets are still valid. |
| Start a new exchange from the same original transaction. | OriginalPayment | A new exchange can be started without an unused-credit error. |

### Test Case 7: Box Office - Exchanges - Verify itemized external-payment exchange scoping

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify itemized external-payment exchange scoping

**Description:** Validates that itemized exchanges from Cash or enabled Other sales offset only selected eligible items. This protects against full-invoice offsets, duplicated adjustment rows, and unrelated item revenue changes.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** Itemized exchanges are enabled. Test data exists for each item mix that is stable in the environment.

**Postconditions:** Created exchange invoices remain available for settlement/report review.

**Tags:** box-office, exchanges, tickets

**Parameters:**
ItemMix: MultipleTickets, AssignedSeating, TicketAndProduct, TicketAndMembership, TicketAndAddOn

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Complete a Cash or enabled Other Box Office sale for the selected item mix. | ItemMix | The original invoice records each item and payment value correctly. |
| Start an itemized exchange and select only eligible target items. | ItemMix | Only the selected items are included in the exchange. |
| Complete a replacement purchase using Exchange Credit. | ItemMix | Selected original items are replaced and unselected items remain valid. |
| Review settlement or invoice item detail. | ItemMix | Adjustment value matches selected exchanged items only, not the full original invoice. |
| Review mixed-item adjustment rows where available. | ItemMix | Adjustment rows are not duplicated across item handlers. |




### Test Case 8: Box Office - Exchanges - Verify original sale modifiers do not break exchange settlement

**Priority:** Medium  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify original sale modifiers do not break exchange settlement

**Description:** Validates that supported original sale modifiers are preserved through Cash or enabled Other exchanges. This protects against incorrect credit amount, lost customer context, stale basket validation, and settlement offsets based on pre-discount or unrelated values.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** The selected modifier is enabled and stable in the environment.

**Postconditions:** Created exchange invoices remain available for review.

**Tags:** box-office, exchanges, edge-case

**Parameters:**  
Modifier: Discount, AccountCredit, GroupSale, HoldPurchase, RequiredQuestions, FulfillmentOptions

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Complete a Cash or enabled Other Box Office sale using the selected modifier. | Modifier | The original invoice preserves the modifier data and payment context. |
| Complete an exchange from the modified original sale. | Modifier | The exchange completes or follows existing eligibility rules. |
| Review replacement invoice details. | Modifier | Customer, credit, fulfillment, or metadata fields remain consistent with the selected modifier. |
| Review settlement or payout detail. | Modifier | Settlement uses the discounted, credited, or otherwise modified exchanged value instead of the original face value. |


### Test Case 9: Box Office - Exchanges - Verify refund after Cash or Other exchange keeps correction totals aligned

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify refund after Cash or Other exchange keeps correction totals aligned

**Description:** Validates that refunding a completed Cash or enabled Other exchange chain creates the expected refund and exchange refund correction records. This protects against duplicate organizer payout, missing correction rows, and mismatched totals after the replacement tickets are refunded.

| Platform     | View    |
|--------------|---------|
| WebBoxOffice | Desktop |

**Preconditions:** A same-value or higher-value exchange from Test Case 1 or Test Case 3 has been completed and the replacement transaction is refundable.

**Postconditions:** Refund, exchange adjustment, and exchange refund correction invoices remain available for settlement/report review.

**Tags:** box-office, exchanges, refunds

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the completed replacement transaction from the Cash or enabled Other exchange chain. | OriginalPayment | The replacement transaction and linked exchange adjustment are visible. |
| Refund the replacement transaction using an available full refund option. | OriginalPayment | The replacement tickets are refunded or voided according to normal refund behavior. |
| Review the linked invoice chain. |  | A refund invoice and exchange refund correction invoice are created for the exchange chain. |
| Compare the exchange adjustment and exchange refund correction values. |  | The correction offsets the exchange adjustment without changing the original external-payment sale total. |
| Review payout or transaction detail for the full chain. |  | Original sale, replacement, adjustment, refund, and correction totals do not duplicate organizer payout. |

### Test Case 10: Box Office - Exchanges - Verify reporting agrees across Cash and Other exchange chains

**Priority:** High  
**Type:** Regression  
**Area:** Reporting

**Title:** Box Office - Exchanges - Verify reporting agrees across Cash and Other exchange chains

**Description:** Validates that reporting surfaces agree for Cash and Other exchange chains. This protects against mismatched signs or totals across Transactions, payout detail, payment type breakdowns, and exports.

| Column 1 | Column 2 |
| --- | --- |
| Platform | View |
| WebBoxOffice | Desktop |


**Preconditions:** Representative Cash and Other exchange chains have been completed, including same-value, higher-value, repeated, and itemized examples where feasible.

**Postconditions:** Report outputs and invoice IDs are saved with the test run.

**Tags:** reports, exchanges, payouts

**Parameters:**  
ReportSurface: TransactionsDetail, PayoutDetail, PaymentTypeBreakdown, CsvExport

**Steps:**

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Step Action | Data | Expected Result |
| Open the selected report surface for the venue and date range. | ReportSurface | The report includes the original, replacement, and exchange adjustment invoices. |
| Compare the invoice chain totals. | ReportSurface | Replacement plus adjustment nets to `0.00` and the original fee debt remains visible. |
| Review signs for original sale, replacement, and adjustment rows. | ReportSurface | Signs and totals are consistent with the settlement expectation for the exchange chain. |
| Compare the selected surface with another available reporting surface. | ReportSurface | The same invoice chain has matching business totals across surfaces. |


[https://showpass.atlassian.net/browse/SPW-19636](https://showpass.atlassian.net/browse/SPW-19636)

### Test Case 11: Box Office - Exchanges - Verify Square settlement and fees across account setups

**Priority:** High
**Type:** Regression
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify Square settlement and fees across account setups

**Description:** Validates that a venue employee can exchange a Square Terminal Box Office sale and collect any upgrade balance through the selected Square account setup. This protects against incorrect Square fee attribution, missing Square account context, and duplicate settlement when Exchange Credit covers part of the replacement purchase.

| Platform     | View    |
|--------------|---------|
| WebBoxOffice | Desktop |

**Preconditions:** Square Terminal payments, exchanges, and itemized exchanges are enabled. `QA Original 50` and `QA Upgrade 75` exist with stable fees and taxes. One venue or account setup uses the Showpass Square account, and one uses the client's connected Square account.

**Postconditions:** Original, replacement, exchange adjustment, and report rows remain available for settlement and fee review.

**Tags:** box-office, exchanges, fees-and-taxes

**Parameters:**
SquareAccountSetup: InternalShowpassSquare, ExternalClientSquare

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete a Box Office sale for one `QA Original 50` using Square Terminal. | SquareAccountSetup | The original invoice completes as a Square Terminal sale for the selected account setup. |
| Start an exchange from the original transaction and select one `QA Upgrade 75`. | SquareAccountSetup | Checkout shows Exchange Credit applied and a remaining upgrade balance. |
| Collect the remaining upgrade balance with Square Terminal. | SquareAccountSetup | The replacement purchase succeeds and records the selected Square account setup. |
| Review the original, replacement, and exchange adjustment invoices. | SquareAccountSetup | Square fees, taxes, Exchange Credit, and adjustment values are on the expected rows without duplicate settlement. |
| Review payout detail or financial report output for the date range. | SquareAccountSetup | Internal Square and external client Square rows use the correct Square settlement or adjustment columns and match invoice totals. |

[https://app.qase.io/case/SPT-4914](https://app.qase.io/case/SPT-4914)

## Minimum Execution Set

Run these first if time is limited:

1. Test Case 1 with Cash.
2. Test Case 1 with Other.
3. Test Case 2.
4. Test Case 3 with Other.
5. Test Case 5 with Cash and Other.
6. Test Case 6 with Cash.
7. Test Case 7 with `MultipleTickets`.
8. Test Case 8 with `Discount` and `AccountCredit`.
9. Test Case 9 with Cash.
10. Test Case 10 with `PayoutDetail` and `PaymentTypeBreakdown`.
11. Test Case 11 with both Square account setups.

## Open Questions

- Should `enable_box_office_other_full_credit_exchanges` apply to all Box Office platforms, including desktop and mobile Box Office, or only web Box Office?
- For original purchases that combine regular account credit or gift-card credit with Cash/Other, should the exchange settlement offset only the external tender portion or the full exchanged item value?
- Are products, packages, donation items, refund protection, and membership/member items all expected to participate in itemized exchange for this PR?
- Which reporting surface is the source of truth for QA signoff: settlement invoice detail, payout detail, payment type breakdown PDF/CSV, or direct invoice-item verification?
