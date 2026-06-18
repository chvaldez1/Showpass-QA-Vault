# Cash And Other Exchange Qase Test Cases

Draft status: review only. Do not push to Qase until approved.

## Source Context

- Ticket: `SPW-19166`
- Related ticket: `SPW-19169`
- PR: `9012`
- Feature area: Box Office itemized exchanges for Cash and Other payments.

## Behavior Summary

Cash and Other are external-money payment types. The organizer collected the customer money outside Showpass, so a replacement purchase paid by Exchange Credit must not pay the organizer again for the same ticket value. If the original Cash or Other sale owed Showpass fees, the final settlement can be negative; a zero payout is not automatically correct.

Other full-credit exchange behavior is guarded by `enable_box_office_other_full_credit_exchanges`. Repeated exchanges must trace financial context back to the original Cash or Other sale, not the previous Exchange Credit replacement.

## Recommended Test Data

- Venue with Box Office, Cash payments, Other payments, exchanges, and itemized exchanges enabled.
- Other custom payment type named `Cheque`.
- Future event with ticket types `QA Original 50` and `QA Upgrade 75`.
- Customer account that can be reused across Box Office purchases.
- Venue employee with permission to sell Box Office tickets, exchange tickets, and view transactions and settlement data.
- Fee setup where Cash and card fees are visibly different.
- Optional stable data for assigned seating, products, memberships, donations, refund protection, group sales, holds, custom questions, delivery settings, and regular account credit.

## Settlement Values To Watch

Use these numbers as a compact inspection guide. Replace the sample values with the actual invoice values from the test run.

Same-value exchange sample:

| Invoice row                 | Value to check                            | Expected sample                           |
| --------------------------- | ----------------------------------------- | ----------------------------------------- |
| Original Cash/Other sale    | `payment_type`                            | Cash or Other / `Cheque`                  |
| Original Cash/Other sale    | `amount_paid` or `amount_paid_stat`       | `-5.13` fee debt remains owed to Showpass |
| Replacement invoice         | `payment_type`                            | Exchange Credit                           |
| Replacement invoice         | `amount_paid` or `amount_paid_stat`       | `60.00` replacement value                 |
| Exchange adjustment invoice | `amount_paid` or `amount_paid_stat`       | `-60.00` offset for replacement value     |
| Invoice chain               | Replacement plus adjustment               | `0.00`                                    |
| Invoice chain               | Original plus replacement plus adjustment | `-5.13`, not `0.00`                       |

Higher-value replacement sample:

| Scenario | Value to check | Expected sample |
|----------|----------------|-----------------|
| Original external sale | Original fee debt | `-5.13` remains unchanged |
| Replacement upgrade | Exchange Credit applied | `60.00` |
| Replacement upgrade | Remaining top-up | `15.00` if upgrading from `60.00` to `75.00` |
| Exchange adjustment | Offset for credit portion | `-60.00` |
| Settlement | Exchange Credit portion | Nets to `0.00`; only top-up follows normal Cash/Other settlement |

Lower-value or partial-itemized sample:

| Scenario | Value to check | Expected sample |
|----------|----------------|-----------------|
| Lower-value replacement | Credit used | Only the replacement value, such as `40.00` |
| Lower-value adjustment | Offset | Equal and opposite to credit used, such as `-40.00` |
| Partial itemized exchange | Selected item value | Offset uses selected items only, not the full original invoice |

Bug signals:

- Replacement Exchange Credit value is paid out to the organizer again.
- The invoice chain is forced to `0.00` when the original Cash/Other sale had fee debt.
- The adjustment amount does not equal the applied Exchange Credit amount.
- A final Exchange Credit invoice keeps `Cheque` or another stale Other custom type.

## Risk Areas

- Organizer is paid twice for a Cash or Other original sale that is exchanged into a replacement covered by Exchange Credit.
- Other full-credit exchanges are allowed while `enable_box_office_other_full_credit_exchanges` is disabled.
- Replacement invoices keep stale Other custom type values when the final payment type is Exchange Credit.
- Higher-value replacements lose the remaining Cash or Other top-up payment context.
- Partial itemized exchanges offset the full original sale instead of only selected items.
- Repeated exchanges use the previous Exchange Credit invoice as the financial root.
- Payout, payment type breakdown, transaction detail, and exports disagree on Cash, Other, exchange adjustment, or replacement invoice totals.

## Qase-Ready Manual Test Cases

### Test Case 1: Box Office - Exchanges - Verify same-value Cash or Other exchange settlement

**Priority:** High  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify same-value Cash or Other exchange settlement

**Description:** Validates that a venue employee can exchange a same-value Cash or enabled Other Box Office sale into a replacement fully covered by Exchange Credit. This protects against duplicate organizer payout, wrong replacement payment type, and lost original external-payment context.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** Cash and Other Box Office payments are enabled. `enable_box_office_other_full_credit_exchanges` is enabled for the Other parameter value. `QA Original 50` exists and can be exchanged without extra fees.

**Postconditions:** Created exchange invoices and tickets remain available for settlement/report review.

**Tags:** box-office, exchanges, payouts

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete a Box Office sale for one `QA Original 50`. | OriginalPayment | The original invoice is completed with the selected external payment type. |
| Start an exchange from the original transaction and select a same-value replacement. | OriginalPayment | The replacement checkout is fully covered by Exchange Credit. |
| Complete the replacement checkout. | OriginalPayment | New tickets are issued and the replacement invoice payment type is Exchange Credit. |
| Review replacement and exchange adjustment invoice values. | OriginalPayment | Replacement `amount_paid` and adjustment `amount_paid` are equal and opposite. |
| Review settlement or payout detail for the invoice chain. | OriginalPayment | Chain total remains the original fee debt, such as `-5.13`, instead of becoming `0.00`. |

### Test Case 2: Box Office - Exchanges - Verify disabled Other full-credit exchange remains blocked

**Priority:** High  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify disabled Other full-credit exchange remains blocked

**Description:** Validates that Other-origin full-credit exchanges are blocked when the Other exchange switch is disabled. This protects against bypassing the feature guard and creating replacement invoices or settlement adjustments from an unsupported Other exchange path.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** Other Box Office payments are enabled. `enable_box_office_other_full_credit_exchanges` is disabled. `QA Original 50` exists.

**Postconditions:** No replacement invoice or consumed exchange credit should exist for the blocked attempt.

**Tags:** box-office, exchanges, edge-case

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete a Box Office sale for one `QA Original 50` using Other / `Cheque`. |  | The original invoice is completed as an Other sale. |
| Start an exchange from the original transaction and select a same-value replacement. |  | The exchange flow reaches the guarded full-credit path. |
| Attempt to complete checkout with full Exchange Credit coverage. |  | The system blocks the Other-origin exchange. |
| Review transactions and settlement data. |  | No replacement invoice, consumed exchange credit, voided old ticket, or settlement adjustment is committed. |
| Repeat the same-value flow with a Cash original sale. |  | Cash-origin exchange remains available while the Other switch is disabled. |

### Test Case 3: Box Office - Exchanges - Verify higher-value replacement top-up handling

**Priority:** High  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify higher-value replacement top-up handling

**Description:** Validates that a venue employee can exchange an external-payment sale into a higher-value replacement and collect only the remaining balance. This protects against losing the final Cash or Other top-up payment type and treating the Exchange Credit portion as new organizer money.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** `QA Original 50` and `QA Upgrade 75` exist. Higher-value exchanges are enabled. The Other switch is enabled for the Other parameter value.

**Postconditions:** Created exchange invoices remain available for settlement/report review.

**Tags:** box-office, exchanges, payouts

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete a Box Office sale for one `QA Original 50`. | OriginalPayment | The original invoice is completed with the selected external payment type. |
| Start an exchange and select one `QA Upgrade 75`. | OriginalPayment | Checkout shows Exchange Credit applied and a remaining balance. |
| Pay the remaining balance with the same external payment type. | OriginalPayment | The replacement purchase succeeds and collects only the additional amount. |
| Review the replacement invoice. | OriginalPayment | The invoice preserves the top-up payment type and applied credit amount, such as `60.00` credit plus `15.00` top-up. |
| Review settlement or payout detail. | OriginalPayment | The Exchange Credit portion has a matching negative adjustment and only the top-up follows normal settlement. |

### Test Case 4: Box Office - Exchanges - Verify lower-value replacement credit handling

**Priority:** High  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify lower-value replacement credit handling

**Description:** Validates that lower-value replacements apply only the used Exchange Credit amount from a Cash or Other original sale. This protects against incorrect payout offsets and unused credit creating extra settlement movement.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A Cash or enabled Other original sale exists with a value higher than the replacement basket.

**Postconditions:** Created credit and exchange invoices remain available for review.

**Tags:** box-office, exchanges, credits

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Start an exchange from the higher-value original transaction. | OriginalPayment | The selected original item creates exchange credit. |
| Select a lower-value replacement item. | OriginalPayment | Checkout applies only the amount needed for the replacement. |
| Complete the replacement checkout. | OriginalPayment | The replacement succeeds according to the expected leftover-credit behavior. |
| Review credit and settlement data. | OriginalPayment | The adjustment offsets only used credit, such as `-40.00` for a `40.00` replacement. |

### Test Case 5: Box Office - Exchanges - Verify repeated Cash or Other exchange ancestry

**Priority:** High  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify repeated Cash or Other exchange ancestry

**Description:** Validates that repeated exchanges keep settlement context tied to the original Cash or Other sale. This protects against using the previous Exchange Credit replacement as the financial root or duplicating the original exchange adjustment.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A same-value exchange from Test Case 1 has been completed and the first replacement invoice is eligible for exchange.

**Postconditions:** Original and replacement invoice IDs remain available for reporting review.

**Tags:** box-office, exchanges, payouts

**Parameters:**
OriginalPayment: Cash, Other

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Start an exchange from the first replacement transaction. | OriginalPayment | The replacement invoice is eligible for another exchange. |
| Complete a second same-value replacement fully covered by Exchange Credit. | OriginalPayment | A second replacement invoice is created with Exchange Credit payment type. |
| Review invoice ancestry for the exchange chain. | OriginalPayment | The second replacement traces back to the original external-payment sale. |
| Review settlement or payout detail. | OriginalPayment | Each replacement has its own equal-and-opposite adjustment and the original fee debt remains unchanged. |
| Review final replacement invoice metadata. | OriginalPayment | Exchange Credit invoices do not retain stale external-payment metadata. |

### Test Case 6: Box Office - Exchanges - Verify non-external origin exchanges are unchanged

**Priority:** Medium  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify non-external origin exchanges are unchanged

**Description:** Validates that Cash and Other settlement correction does not apply to unrelated exchange origins. This protects against suppressing legitimate settlement behavior for system-collected or out-of-scope exchange paths.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** At least one supported non-Cash/Other origin flow is available.

**Postconditions:** No transaction data is changed outside normal exchange behavior.

**Tags:** box-office, exchanges, edge-case

**Parameters:**
Origin: Card, GiftCard, OwnGateway, PublicExchange

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete or locate an exchangeable original sale for the selected origin. | Origin | The original invoice is not a Cash or Other external-money invoice. |
| Complete an eligible exchange where the selected origin is supported. | Origin | Existing exchange behavior is unchanged. |
| Review settlement or transaction detail. | Origin | Cash/Other external-money correction is not applied to the selected origin. |
| Record the result for unsupported origins. | Origin | Unsupported or out-of-scope origins are documented without creating false failures. |

### Test Case 7: Box Office - Exchanges - Verify itemized Cash or Other with Mixed Item Groups

**Priority:** High  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify itemized Cash or Other exchanges use selected items only

**Description:** Validates that a Box Office employee can exchange selected items from a Cash or enabled Other sale without changing items that were not selected. This protects against using the full invoice amount, paying out unrelated items, duplicating adjustment rows, or ignoring discounts and credits from the original sale.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** Itemized exchanges are enabled. Test data exists for each scenario that is stable in the environment.

**Postconditions:** Created exchange invoices remain available for settlement/report review.

**Tags:** box-office, exchanges, tickets

**Parameters:**
Scenario: MultipleTickets, AssignedSeating, TicketAndProduct, TicketAndMembership, TicketAndAddOn, Discount, AccountCredit, GroupSale, HoldPurchase, RequiredQuestions, FulfillmentOptions

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Complete a Cash or enabled Other Box Office sale for the selected scenario. | Scenario | The original invoice shows the selected items, discounts, credits, and payment values correctly. |
| Start an itemized exchange and select only the items being exchanged. | Scenario | Only the selected items are included in the exchange. |
| Complete a replacement purchase using Exchange Credit. | Scenario | The selected items are replaced and unselected items stay unchanged. |
| Review the replacement invoice details. | Scenario | Customer, credit, delivery, and item details stay correct where the scenario uses them. |
| Review settlement or invoice item detail. | Scenario | The adjustment amount matches the selected exchanged items, not the full original invoice. |
| Review mixed-item adjustment rows where available. | Scenario | Adjustment rows appear once and are not duplicated. |

### Test Case 8: Box Office - Exchanges - Verify blocked post-purchase states do not create settlement artifacts

**Priority:** Medium  
**Type:** Regression  
**Area:** Box Office exchanges

**Title:** Box Office - Exchanges - Verify blocked post-purchase states do not create settlement artifacts

**Description:** Validates that existing exchange eligibility rules still apply to Cash or Other purchases after post-purchase state changes. This protects against blocked exchanges creating exchange credit, replacement invoices, or settlement adjustments.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** Cash or enabled Other original purchases exist and can be placed into the selected post-purchase state.

**Postconditions:** Any state changes used during the test are documented for cleanup.

**Tags:** box-office, exchanges, edge-case

**Parameters:**
PostPurchaseState: CheckedIn, Transferred, PartiallyRefunded, FullyRefunded, Voided, NameChanged

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Place the original purchase into the selected state. | PostPurchaseState | The transaction reflects the selected post-purchase state. |
| Attempt to begin or complete an exchange. | PostPurchaseState | Existing eligibility rules are respected. |
| Review transactions and settlement data after a blocked attempt. | PostPurchaseState | Blocked exchanges do not create replacement invoices, exchange credit, or settlement adjustments. |

### Test Case 9: Box Office - Exchanges - Verify reporting agrees across Cash and Other exchange chains

**Priority:** High  
**Type:** Regression  
**Area:** Reporting

**Title:** Box Office - Exchanges - Verify reporting agrees across Cash and Other exchange chains

**Description:** Validates that reporting surfaces agree for Cash and Other exchange chains. This protects against mismatched signs or totals across Transactions, payout detail, payment type breakdowns, and exports.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** Representative Cash and Other exchange chains have been completed, including same-value, higher-value, repeated, and itemized examples where feasible.

**Postconditions:** Report outputs and invoice IDs are saved with the test run.

**Tags:** reports, exchanges, payouts

**Parameters:**
ReportSurface: TransactionsDetail, PayoutDetail, PaymentTypeBreakdown, CsvExport

**Steps:**

| Step Action | Data | Expected Result |
|-------------|------|-----------------|
| Open the selected report surface for the venue and date range. | ReportSurface | The report includes the original, replacement, and exchange adjustment invoices. |
| Compare the invoice chain totals. | ReportSurface | Replacement plus adjustment nets to `0.00` and the original fee debt remains visible. |
| Review signs for original sale, replacement, and adjustment rows. | ReportSurface | Signs and totals are consistent with the settlement expectation for the exchange chain. |
| Compare the selected surface with another available reporting surface. | ReportSurface | The same invoice chain has matching business totals across surfaces. |

## Minimum Execution Set

Run these first if time is limited:

1. Test Case 1 with Cash.
2. Test Case 1 with Other.
3. Test Case 2.
4. Test Case 3 with Other.
5. Test Case 5 with Cash and Other.
6. Test Case 7 with `MultipleTickets`.
7. Test Case 7 with `Discount` and `AccountCredit`.
8. Test Case 9 with `PayoutDetail` and `PaymentTypeBreakdown`.

## Open Questions

- Should `enable_box_office_other_full_credit_exchanges` apply to all Box Office platforms, including desktop and mobile Box Office, or only web Box Office?
- For original purchases that combine regular account credit or gift-card credit with Cash/Other, should the exchange settlement offset only the external tender portion or the full exchanged item value?
- Are products, packages, donation items, refund protection, and membership/member items all expected to participate in itemized exchange for this PR?
- Which reporting surface is the source of truth for QA signoff: settlement invoice detail, payout detail, payment type breakdown PDF/CSV, or direct invoice-item verification?
