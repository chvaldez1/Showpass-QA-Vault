---
title: Itemized Partial Apply To Each Split Critical Path Tests
date: 2026-06-22
tags:
  - qa/test-cases
  - discounts
  - checkout
---

## Critical Coverage Model

Use pairwise coverage across these axes. Do not run the full Cartesian product.

| Axis | Minimum Values | Why It Matters |
| --- | --- | --- |
| Entry path | Public checkout, Widget checkout, Box Office direct sale, Box Office hold, hold-link purchase, group sale | Same backend split, different purchase source, permissions, and handoff state |
| Discount source | Manual discount code, applicable ticket credit tile, Box Office applied discount, exchange credit checkout | Different frontend calls update basket or credit state |
| Discount shape | 100% off partial quantity, percentage off partial quantity, fixed amount partial quantity, fully applied APPLY_TO_EACH, non-APPLY_TO_EACH | Confirms only the intended discount shape splits |
| Quantity shape | 2 selected/1 discounted, 5 selected/2 discounted, 23 selected/1 discounted, 20 assigned seats with chunks | Protects rounding, row count, and recombination behavior |
| Fee/tax setup | No fees, flat organizer fee, percentage tax, custom/internal fees, absorbed fees, matched fees, tax on fees, free-payment fee rate card | Most likely source of wrong customer total or payout total |
| Tender | Card, Cash, Other custom type, auto Free for full-free basket, gift card, user credit, exchange credit | Payment type can change fees or validation after split |
| Basket mutation | Apply after item add, create with discount, increase/decrease quantity, remove/reapply discount, change payment type, add/remove credit, change seat | Re-runs normalization and can leave stale hidden rows |
| Item identity | Guest info per ticket, existing attendee info, assigned seat, venue-assigned seat, child/sub-product, membership/non-ticket item | Split must not collapse per-ticket ownership or split non-target items |
| Mixed cart | Same ticket type split, two ticket types one eligible, itemized plus non-itemized, ticket plus product/protection/membership | Confirms split scope is correct |
| Downstream | Transaction detail, refund, exchange, void, transfer, check-in, payout, report export | Proves invoice rows remain usable after purchase |

## Risk Areas

- Discount is proportionally spread across all selected tickets instead of only the discounted quantity.
- Fully free discounted rows receive free-payment fees, taxes, or service charges.
- Full-price remainder keeps discount metadata or appears twice after a basket update.
- Quantity, discount, payment type, credit, or seat changes leave stale hidden rows.
- Assigned seats or venue-assigned permissions are duplicated, dropped, or attached to the wrong split row.
- Guest-info rows collapse and lose attendee data or required blank forms.
- Products, memberships, protection, or non-itemized tickets are split by mistake.
- Box Office Cash, Other, Free, or platform-specific fees diverge from public checkout totals.
- Hold-link or group-sale purchase recalculates differently from the original basket.
- Refund and exchange values come from the whole invoice instead of the selected discounted or full-price split row.
- Transaction, payout, and report surfaces show duplicate rows, wrong signs, or mismatched totals.

## Recommended Test Data

- Itemized venue with `enable_itemized_partial_apply_to_each_split` on.
- APPLY_TO_EACH discounts with partial limits through basket/global/per-user/per-event constraints.
- Ticket quantities: 2, 5, 23, and a 20-seat assigned-seating selection.
- Prices that expose rounding: `$10.00`, `$19.99`, and at least one fixed amount discount like `$2.50`.
- Fee configurations:
  - No fees
  - Flat organizer fee plus 5% tax
  - Internal and custom fees with absorbed and matched fee examples
  - Tax on fees enabled
  - Free-payment fee rate card configured
- Public event, widget embed, assigned-seating event, venue-assigned seat event, per-ticket guest info event, package/sub-product ticket type, group-sale customer, held basket, and enabled Card/Cash/Other payment types.

## Manual Test Cases

### Group 1 - Discount Entry Paths and Purchase Handoff

#### 1. Public and Widget - Partial Discount Split With Quantity and Fee Matrix

**Description:** Validates that customer checkout splits only the discounted quantity and calculates fees/taxes on the correct rows.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

**Tags:** public, widget, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| QuantityShape | 2Selected1Discounted, 5Selected2Discounted, 23Selected1Discounted |
| FeeSetup | NoFees, FlatFeePlusTax, FullCustomInternalFeesWithTaxOnFees |
| DiscountShape | FullFreePartialQuantity, PercentagePartialQuantity, FixedAmountPartialQuantity |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add the selected ticket quantity to checkout. | QuantityShape | The basket shows the intended quantity and platform. |
| Apply the discount from checkout. | DiscountShape | Only the eligible quantity receives the discount. |
| Review subtotal, discount, fees, taxes, and total before payment. | FeeSetup | Fully free split rows have no fees; full-price rows carry the correct remaining fees/taxes. |
| Complete checkout. |  | Tickets are issued and the paid total matches the reviewed basket. |
| Review the order or transaction invoice rows. |  | Discounted and full-price invoice rows are separate and total to the charged amount. |

#### 2. Box Office - Direct Sale Across Tender and Platform Fee Context

**Description:** Validates that Box Office direct sale preserves split economics across payment types and fee contexts.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Tags:** box-office, payment, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| PaymentType | Card, Cash, OtherCustomType, AutoFreeFromFullDiscount |
| FeeSetup | NoFees, PlatformSpecificFees, FreePaymentFeeRateCard |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Build a Box Office basket with multiple itemized tickets. | PaymentType | The basket is valid for sale. |
| Apply a partial APPLY_TO_EACH discount. |  | Only the covered quantity receives the discount. |
| Change or confirm the selected payment type. | PaymentType | Payment-specific fees recalculate without changing discount scope. |
| Complete the sale. | PaymentType | The transaction uses the selected payment type or auto Free when the final total is zero. |
| Review transaction and payout values. | FeeSetup | Discount, fee, tax, and payment values agree with the split rows. |

#### 3. Holds, Hold Links, and Group Sales - Split Values Persist Through Handoff

**Description:** Validates split stability when a basket is created by Box Office and purchased or attributed later.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| WebPublic | Desktop |

**Tags:** holds, group-sales, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| HandoffPath | BoxOfficeHold, HoldLinkCustomerPurchase, GroupSaleCustomer |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create the held or group-sale basket with multiple tickets. | HandoffPath | Hold or customer group context is saved. |
| Apply the partial APPLY_TO_EACH discount. | HandoffPath | Discounted and full-price quantities are separated. |
| Complete the handoff or purchase path. | HandoffPath | The final order preserves the original split values and customer context. |
| Review order, transaction, and invoice rows. |  | No recalculation drift occurs across hold or group-sale handoff. |

### Group 2 - Basket Recalculation, Fees, and Tender

#### 4. Checkout - Basket Mutations Recalculate Split Rows

**Description:** Validates that pre-purchase basket changes do not leave stale hidden full-price rows or stale discount metadata.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebBoxOffice | Desktop |

**Tags:** basket, checkout, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| Mutation | IncreaseQuantity, DecreaseQuantity, RemoveDiscount, ReapplyDiscount, ChangePaymentType, AddGiftCard, RemoveCredit |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a multi-ticket basket and apply a partial APPLY_TO_EACH discount. | Mutation | The basket shows discounted and full-price portions. |
| Perform the selected mutation before purchase. | Mutation | Totals recalculate without duplicate rows or orphaned full-price remainders. |
| Complete checkout when the basket remains valid. | Mutation | The final invoice rows match the final basket state. |
| Review discount metadata on invoice rows. |  | Discounted rows keep discount data; full-price rows do not. |

#### 5. Fees and Taxes - Complex Fee Setup on Free and Non-Free Splits

**Description:** Validates the highest-risk financial math independent of route coverage.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Tags:** fees-and-taxes, discounts, edge-case

**Parameters:**

| Name | Values |
| --- | --- |
| DiscountShape | FullFreePartialQuantity, PercentagePartialQuantity, FixedAmountPartialQuantity |
| FeeSetup | FlatOrganizerFee, PercentageTax, AbsorbedFees, MatchedFees, TaxOnFees, FreePaymentFeeRateCard |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a basket using the selected discount and fee setup. | DiscountShape, FeeSetup | The basket accepts the configuration. |
| Review each visible fee and tax line after discount application. | FeeSetup | Fees and taxes apply to the correct discounted or full-price units. |
| Complete purchase. |  | Purchase succeeds without total mismatch. |
| Compare basket total, invoice total, transaction detail, and payout total. |  | All surfaces agree within expected rounding rules. |

#### 6. Credits and Exchange Credit at Checkout - Credit Applies to Split Total

**Description:** Validates that credits are applied after split totals and do not over-apply against the original unsplit value.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Tags:** credits, checkout, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| CreditPath | GiftCardPartial, UserCreditPartial, ExchangeCreditAutoApply, ExchangeCreditManualToggle, RemoveCreditBeforePurchase |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a partially discounted multi-ticket basket. | CreditPath | The discounted total is visible before credit. |
| Apply or toggle the selected credit. | CreditPath | Credit applies to the recalculated split total, not the original unsplit total. |
| Complete checkout. | CreditPath | Payment, credit, and remaining balance are correct. |
| Review invoice and credit metadata. |  | Credit values do not exceed selected split economics or create negative totals. |

### Group 3 - Item Identity and Split Boundaries

#### 7. Assigned Seating - Seat Ownership Survives Split and Updates

**Description:** Validates that assigned seats remain attached to exactly one purchased ticket after split and basket changes.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Tags:** assigned-seating, basket, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| SeatPath | ApplyAfterSeatSelection, CreateWithDiscount, ChangeSeatsAfterDiscount, DecreaseQuantityAfterDiscount, TwentySeatSelection |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select assigned seats and apply the partial discount. | SeatPath | Each selected seat remains represented once. |
| Perform the selected seat or quantity update. | SeatPath | Seat ownership rebalances without duplicates or missing seats. |
| Complete checkout. |  | Issued tickets map one-to-one with selected seats. |
| Review invoice rows and ticket details. |  | Discounted and full-price seat rows preserve the expected values and seats. |

#### 8. Venue-Assigned Seating - Location Permission Survives Split

**Description:** Validates Box Office venue-assigned seats where location permissions, not explicit seats, carry the basket identity.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Tags:** assigned-seating, box-office, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| SeatPath | CreateWithDiscount, ApplyDiscountAfterCreate, MixedTicketTypes |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a venue-assigned seat basket for the selected scenario. | SeatPath | Location permissions are present before purchase. |
| Apply or preserve the partial APPLY_TO_EACH discount. | SeatPath | Discounted and full-price rows keep the required location permission context. |
| Complete the Box Office sale. |  | Tickets issue without duplicate or missing venue-assigned permissions. |
| Review transaction item rows. |  | Discounted and full-price values align with the selected venue-assigned seats. |

#### 9. Per-Ticket Identity - Guest Info and Child Rows Are Not Collapsed

**Description:** Validates that split normalization does not merge rows that must stay distinct for per-ticket data.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebBoxOffice | Desktop |

**Tags:** tickets, discounts, edge-case

**Parameters:**

| Name | Values |
| --- | --- |
| IdentityPath | GuestInfoPerTicket, ExistingGuestInfo, RequiredInfo, TicketTypeSubProduct |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a basket for the selected identity path. | IdentityPath | Required identity fields or child rows are visible or available. |
| Apply a partial APPLY_TO_EACH discount. | IdentityPath | Discounted and full-price rows keep their required identity boundaries. |
| Enter or review attendee details where required. | IdentityPath | Attendee data remains attached to the intended ticket. |
| Complete checkout and review order details. |  | No guest info, required info, or child row is dropped or merged into the wrong row. |

#### 10. Mixed Cart and Non-Target Items - Only Eligible Ticket Rows Split

**Description:** Validates that the switch does not reshape unrelated discounts or non-ticket items.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Tags:** checkout, discounts, edge-case

**Parameters:**

| Name | Values |
| --- | --- |
| Scenario | TwoTicketTypesOneEligible, ItemizedAndNonItemizedTickets, TicketPlusProduct, TicketPlusMembership, TicketPlusProtection, FullyAppliedApplyToEach, ApplyOnceDiscount, ZeroValueDiscount |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create the selected mixed or non-target basket. | Scenario | Basket contents match the scenario. |
| Apply the relevant discount. | Scenario | Only eligible partial APPLY_TO_EACH itemized ticket rows split. |
| Complete checkout or confirm expected validation. | Scenario | Supported scenarios complete and unsupported scenarios fail without partial split artifacts. |
| Review basket or invoice rows. |  | Products, memberships, protection, non-itemized rows, and non-target discounts remain unchanged. |

### Group 4 - Post-Transaction Financial Workflows

#### 11. Refunds and Voids - Selected Split Tickets Use Selected Value

**Description:** Validates post-purchase reversal behavior for discounted and full-price tickets from the same order.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Tags:** refunds, transactions, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| RefundTarget | DiscountedTicket, FullPriceTicket, MixedSelection, FullInvoice |
| Action | Refund, PartialRefund, Void |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a completed split-discount transaction. | RefundTarget | Discounted and full-price tickets can be selected separately. |
| Preview the selected action. | Action | Previewed amount, fee, and tax values come from selected tickets only. |
| Complete the action. | Action | Selected tickets update state and unselected tickets remain unchanged. |
| Review original and reversal invoice rows. |  | Reversal rows match discounted or full-price economics with correct signs. |

#### 12. Exchanges - Selected Split Tickets Create Correct Exchange Credit

**Description:** Validates that exchange credit and adjustment invoices use the selected split ticket values.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Tags:** exchanges, credits, discounts

**Parameters:**

| Name | Values |
| --- | --- |
| ExchangeTarget | DiscountedTicket, FullPriceTicket, MixedSelection, ExchangeAfterPartialRefund |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start an itemized exchange from a completed split-discount order. | ExchangeTarget | Original tickets are selectable by ticket. |
| Select the parameterized ticket set. | ExchangeTarget | Exchange preview uses selected ticket values only. |
| Complete replacement checkout using Exchange Credit. |  | Replacement tickets issue and unselected originals remain unchanged. |
| Review original, replacement, and adjustment invoices. |  | Credit, fees, taxes, and adjustment rows match the selected split tickets. |

#### 13. Financial Surfaces - Transaction, Payout, and Report Totals Agree

**Description:** Validates that split purchases and downstream actions stay consistent across dashboard financial surfaces.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Tags:** reports, transactions, payouts

**Parameters:**

| Name | Values |
| --- | --- |
| Surface | TransactionDetail, PayoutDetail, PaymentTypeBreakdown, ReportCsv, ReceiptOrConfirmation |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete representative public, widget, Box Office, refund, and exchange examples. | Surface | Source transactions exist in the date range. |
| Open the selected financial surface. | Surface | Purchases and downstream invoices appear where supported. |
| Compare discounted, full-price, refund, and exchange values. |  | Rows are not duplicated and signs are correct. |
| Cross-check against another financial surface. |  | Business totals agree within expected rounding rules. |

### Group 5 - Rollback

#### 14. Switch Off - Rollback Smoke

**Description:** Validates that disabling the switch leaves the existing partial APPLY_TO_EACH path stable enough for rollback.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Tags:** checkout, discounts, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Disable `enable_itemized_partial_apply_to_each_split` for the smoke environment. |  | The switch-off state is confirmed. |
| Create a multi-ticket basket with a partial APPLY_TO_EACH discount. |  | Existing non-split behavior is used. |
| Complete checkout or confirm the existing validation block. |  | No server error, duplicate invoice rows, or orphaned hidden rows occur. |
| Review transaction rows when purchase completes. |  | Rollback behavior remains stable. |

## Minimum Execution Set

1. Public checkout, 5 selected/2 discounted, flat fee plus tax.
2. Widget checkout, 23 selected/1 discounted, no fees.
3. Box Office direct sale with Card, Cash, Other custom type, and auto Free from full-free total.
4. Box Office hold to hold-link customer purchase and group sale.
5. Basket mutation: increase quantity, decrease quantity, remove/reapply discount.
6. Full fee setup with absorbed fees, matched fees, tax on fees, and free-payment fee rate card.
7. Gift card, user credit, and exchange credit after split.
8. Assigned seating with seat change after discount and 20-seat selection.
9. Venue-assigned seating in Box Office.
10. Per-ticket guest info and ticket sub-product paths.
11. Mixed cart with itemized ticket, non-itemized ticket, product, membership, or protection item.
12. Refund, partial refund, void, and exchange selected discounted vs full-price tickets.
13. Transaction detail, payout detail, payment type breakdown, CSV export, and receipt/confirmation check.
14. Switch-off rollback smoke on public and Box Office.

## Automation Candidates

- Backend API: public/widget basket create, apply discount, mutate basket, purchase, assert itemized invoice rows.
- Backend API: venue basket create, Box Office payment type changes, group sale, hold, hold-link purchase, assert split rows and payment metadata.
- Backend API: complex fee matrix with full-free, percentage, and fixed-amount partial discounts.
- Frontend E2E: public discount form, applicable ticket credit tile, widget checkout, Box Office discount modal, and payment method changes.
- Frontend E2E: assigned seating and venue-assigned seating update after discount.
- Backend or E2E: refund discounted vs full-price split ticket; exchange discounted vs full-price split ticket.
- Reporting smoke: compare transaction detail, payout detail, and report export for one split-discount purchase plus one refund and one exchange.

## Open Questions

None blocking for coverage. Finance/Product can still choose which report surface is the final payout signoff source.
