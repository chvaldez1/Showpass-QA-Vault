## Source Context

- Ticket:
- PR: [https://bitbucket.org/%7Bc541ac30-c239-4506-bdce-4a517dac5fdf%7D/%7B6b5ad812-d5a5-4ed8-9722-1febf4d2fec9%7D/pull-requests/9027](https://bitbucket.org/%7Bc541ac30-c239-4506-bdce-4a517dac5fdf%7D/%7B6b5ad812-d5a5-4ed8-9722-1febf4d2fec9%7D/pull-requests/9027)

## Risk Areas

- Discount is spread across all selected tickets instead of only the eligible discounted quantity.
- Fully free discounted tickets receive free-payment fees, taxes, or service charges.
- Regular-price tickets keep discount information or appear twice after a basket update. ?
- Quantity, discount, payment type, credit, or seat changes leave old hidden ticket values behind. ?
- Assigned seats, seat swaps, or venue-assigned permissions are duplicated, dropped, or attached to the wrong ticket.
- Guest-info tickets are combined and lose attendee data or required blank forms.
- Products, memberships, protection, or non-itemized tickets are split by mistake.
- Box Office Cash, Other, Free, or platform-specific fees diverge from public checkout totals.
- Hold-link or group-sale purchase recalculates differently from the original basket.
- Refund and exchange values come from the whole invoice instead of the selected discounted or regular-price ticket.
- Transaction, payout, and report surfaces show duplicate values, wrong signs, or mismatched totals.

## Pre-requisites:

- Itemized venue with `enable_itemized_partial_apply_to_each_split` on.
- APPLY_TO_EACH discounts with partial limits through basket/global/per-user/per-event constraints.
- Prices that expose rounding: `$10.00`, `$19.99`, and at least one fixed amount discount like `$2.50`.
- Fee configurations:
  - No fees
  - Flat organizer fee plus 5% tax
  - Internal and custom fees with absorbed and matched fee examples
  - Tax on fees enabled
  - Free-payment fee rate card configured
- Public event, widget embed, assigned-seating event, venue-assigned seat event, per-ticket guest info event, package/sub-product ticket type, group-sale customer, held basket, and enabled Card/Cash/Other payment types.

## Manual Test Cases

TC-1: Core - Discounts - Verify Partial Discount With Quantity and Fee Coverage
Impact: Strong

**Description:** Confirms that a customer can buy multiple tickets with a partial discount and see the right discounted and regular-price ticket totals.

| Platform        | View    |
| --------------- | ------- |
| Public Checkout | Desktop |
| Public Checkout | Mobile  |
| Widget Checkout | Desktop |
| Widget Checkout | Mobile  |

**Tags:** discounts, checkout, basket

**Parameters:**

TicketQuantity: FiveSelectedTwoDiscounted
FeeSetup: FullCustomInternalFeesWithTaxOnFees
DiscountType: FullDiscount, PercentageDiscount, FixedAmountDiscount

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add the selected number of tickets to checkout. | TicketQuantity | The basket shows the correct ticket quantity for the selected platform. |
| Apply the discount in checkout. | DiscountType | Only the eligible ticket quantity is discounted. |
| Review subtotal, discount, fees, taxes, and total before payment. | FeeSetup | Free discounted tickets do not receive fees; regular-price tickets show the correct remaining fees and taxes. |
| Complete checkout. |  | Tickets are issued and the amount paid matches the checkout total. |
| Review the order or transaction details. |  | Discounted tickets and regular-price tickets show separate values that add up to the charged amount. |

TC-2: Box Office - Direct Sale Across Tender and Platform Fee Context
Impact: Strong

**Description:** Confirms that a Box Office employee can sell multiple tickets with a partial discount and the total stays correct for each payment type.

| Platform | View |
| --- | --- |
| Box Office | Desktop |

**Tags:** box-office, payment, discounts

**Parameters:**

PaymentType: Cash, OtherCustomType
FeeSetup: FullCustomInternalFeesWithTaxOnFees

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Build a Box Office basket with multiple itemized tickets. | PaymentType | The basket is ready for sale. |
| Apply a partial APPLY_TO_EACH discount. |  | Only the eligible ticket quantity is discounted. |
| Change or confirm the selected payment type. | PaymentType | Fees update for the selected payment type without changing which tickets are discounted. |
| Complete the sale. | PaymentType | The transaction uses the selected payment type, or Free when the final total is $0.00. |
| Review the transaction and payout values. | FeeSetup | Discount, fee, tax, and payment totals match the purchased ticket values. |

TC-3: Holds, Hold Links, and Group Sales - Discounted Values Stay Correct Through Handoff
Impact: Medium (Strengthen on discount application)

**Description:** Confirms that held and group-sale baskets keep the same discounted and regular-price values after handoff.

| Platform | View |
| --- | --- |
| Box Office | Desktop |
| Public Checkout | Desktop |

**Tags:** holds, group-sales, discounts

**Parameters:**

HandoffPath: BoxOfficeHold, CustomerPurchaseFromHoldLink, GroupSaleCustomer

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create the held or group-sale basket with multiple tickets. | HandoffPath | The hold or customer group is saved on the basket. |
| Apply the partial APPLY_TO_EACH discount. | HandoffPath | The basket shows the correct discounted and regular-price quantities. |
| Complete the handoff or purchase path. | HandoffPath | The final order keeps the same ticket values and customer context. |
| Review the order, transaction, and invoice details. |  | Totals do not change unexpectedly during the hold or group-sale handoff. |

TC-4: Checkout - Basket Changes Recalculate Ticket Totals

**Description:** Confirms that changing a discounted basket before purchase updates totals cleanly and does not leave old ticket values behind.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Widget Checkout | Desktop |
| Box Office | Desktop |

**Tags:** basket, checkout, discounts

**Parameters:**

BasketChange: IncreaseQuantity, DecreaseQuantity, ChangePaymentType, AddGiftCard, RemoveCredit

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a basket with multiple tickets and apply a partial APPLY_TO_EACH discount. | BasketChange | The basket shows discounted and regular-price ticket portions. |
| Make the selected basket change before purchase. | BasketChange | Totals update without duplicate tickets or leftover old ticket values. |
| Complete checkout when the basket is still valid. | BasketChange | The final order matches the final basket. |
| Review the order or transaction details. |  | Discounted tickets show the discount; regular-price tickets do not. |

TC-5: Credits and Exchange Credit at Checkout - Credit Applies to Split Total

**Description:** Confirms that credits apply to the discounted checkout total and do not over-apply against the original ticket total.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Box Office | Desktop |

**Tags:** credits, checkout, discounts

**Parameters:**

CreditPath: PartialGiftCard, PartialUserCredit, ExchangeCreditAutoApply, ExchangeCreditManualToggle, RemoveCreditBeforePurchase

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a multi-ticket basket with a partial discount. | CreditPath | The discounted total is visible before credit is applied. |
| Apply or toggle the selected credit. | CreditPath | Credit applies to the discounted total, not the original pre-discount total. |
| Complete checkout. | CreditPath | Payment, credit, and remaining balance are correct. |
| Review the invoice and credit details. |  | Credit values do not exceed the final purchase total or create a negative balance. |

TC-6: Assigned Seating - Seat Ownership and Location Assignment Stay Correct After Discount Updates

**Description:** Confirms that assigned seats and venue-assigned locations stay attached to the correct tickets after the discount is applied and the basket is changed.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Box Office | Desktop |

**Tags:** assigned-seating, box-office, discounts

**Parameters:**

SeatPath: ApplyAfterSeatSelection, ChangeSeatsAfterDiscount, DecreaseQuantityAfterDiscount, TwentySeatSelection, VenueAssignedCreateWithDiscount, VenueAssignedApplyDiscountAfterCreate, VenueAssignedMixedTicketTypes

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select or create seats for the selected scenario and apply the partial discount. | SeatPath | Each selected seat or venue-assigned location appears once in the basket. |
| Make the selected seat, location, or quantity change before purchase. | SeatPath | Seats and venue-assigned locations update without duplicates or missing selections. |
| Complete checkout or the Box Office sale. |  | Each issued ticket is tied to the expected seat or venue-assigned location. |
| Review invoice rows and ticket details. |  | Discounted and regular-price tickets keep the expected seats, location assignments, and values. |

TC-7: Assigned Seating - Seat Swap Keeps Discounted and Regular Tickets Correct

**Description:** Confirms that swapping seats after a partial discount keeps seat ownership and ticket values attached to the correct issued tickets.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Box Office | Desktop |

**Tags:** assigned-seating, seat-swap, discounts

**Parameters:**

SwapPath: SwapDiscountedTicketSeat, SwapRegularPriceTicketSeat, SwapMultipleSeats

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create an assigned-seating basket with discounted and regular-price tickets. | SwapPath | The basket shows each selected seat once with the expected discounted or regular-price value. |
| Swap the selected seat after the discount is applied. | SwapPath | The old seat is released and the new seat is attached to the same ticket value. |
| Complete checkout or the Box Office sale. |  | Tickets issue for the final swapped seats only. |
| Review ticket details and invoice rows. |  | Discounted and regular-price values stay with the correct swapped tickets and no duplicate seat assignment remains. |

TC-8: Per-Ticket Identity - Guest Info and Child Ticket Details Stay Attached

**Description:** Confirms that attendee details and child ticket details stay attached to the correct ticket after the discount is applied.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Widget Checkout | Desktop |
| Box Office | Desktop |

**Tags:** tickets, discounts, edge-case

**Parameters:**

IdentityPath: GuestInfoPerTicket, ExistingGuestInfo, RequiredInfo, TicketTypeSubProduct

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a basket for the selected identity path. | IdentityPath | Required attendee fields or child ticket details are visible. |
| Apply a partial APPLY_TO_EACH discount. | IdentityPath | Discounted and regular-price tickets keep their own attendee or child ticket details. |
| Enter or review attendee details where required. | IdentityPath | Attendee data remains attached to the intended ticket. |
| Complete checkout and review order details. |  | No guest info, required info, or child ticket detail is dropped or moved to the wrong ticket. |

TC-9: Mixed Cart and Non-Target Items - Only Eligible Tickets Change

**Description:** Confirms that only eligible itemized ticket rows are affected and unrelated cart items keep their normal behavior.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Box Office | Desktop |

**Tags:** checkout, discounts, edge-case

**Parameters:**

Scenario: TwoTicketTypesOneEligible, ItemizedAndNonItemizedTickets, TicketPlusProduct, TicketPlusMembership, TicketPlusProtection, FullyAppliedApplyToEachDiscount, ApplyOnceDiscount, ZeroValueDiscount

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create the selected mixed or non-target basket. | Scenario | Basket contents match the scenario. |
| Apply the relevant discount. | Scenario | Only eligible partial APPLY_TO_EACH itemized tickets are separated into discounted and regular-price portions. |
| Complete checkout or confirm the expected validation message. | Scenario | Supported scenarios complete; unsupported scenarios fail without changing unrelated cart items. |
| Review the basket or invoice details. |  | Products, memberships, protection, non-itemized tickets, and non-target discounts remain unchanged. |

TC-10: Refunds and Voids - Selected Tickets Use the Correct Value

**Description:** Confirms that refunds and voids use the value of the selected ticket, whether that ticket was discounted or regular price.

| Platform | View |
| --- | --- |
| Box Office | Desktop |

**Tags:** refunds, transactions, discounts

**Parameters:**

TicketSelection: DiscountedTicket, RegularPriceTicket, MixedSelection, FullInvoice
Action: Refund, PartialRefund, Void

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a completed transaction with both discounted and regular-price tickets. | TicketSelection | Discounted and regular-price tickets can be selected separately. |
| Preview the selected action. | Action | Amount, fee, and tax values are based only on the selected tickets. |
| Complete the action. | Action | Selected tickets update state and unselected tickets remain unchanged. |
| Review original and reversal invoice rows. |  | Reversal rows match the selected ticket values and show the correct signs. |

TC-11: Exchanges - Selected Tickets Create Correct Exchange Credit

**Description:** Confirms that exchanges create credit based on the selected ticket values, not the full original order total.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Box Office | Desktop |

**Tags:** exchanges, credits, discounts

**Parameters:**

ExchangeSelection: DiscountedTicket, RegularPriceTicket, MixedSelection, ExchangeAfterPartialRefund

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start an itemized exchange from a completed order with partial discounts. | ExchangeSelection | Original tickets are selectable by ticket. |
| Select the tickets for exchange. | ExchangeSelection | Exchange preview uses only the selected ticket values. |
| Complete replacement checkout using Exchange Credit. |  | Replacement tickets issue and unselected original tickets remain unchanged. |
| Review original, replacement, and adjustment invoices. |  | Credit, fees, taxes, and adjustment rows match the selected exchanged tickets. |

TC-12: Financial Surfaces - Transaction, Payout, and Report Totals Agree

**Description:** Confirms that transaction, payout, and report totals all tell the same financial story after split-discount purchases and follow-up actions.
Impact: Strong

| Platform | View |
| --- | --- |
| Box Office | Desktop |

**Tags:** reports, transactions, payouts

**Parameters:**

Surface: TransactionDetail, PayoutDetail, PaymentTypeBreakdown, ReportCsv, ReceiptOrConfirmation

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete representative public, widget, Box Office, refund, and exchange examples. | Surface | Source transactions exist in the date range. |
| Open the selected financial surface. | Surface | Purchases and follow-up invoices appear where supported. |
| Compare discounted, regular-price, refund, and exchange values. |  | Values are not duplicated and signs are correct. |
| Cross-check against another financial surface. |  | Business totals agree within expected rounding rules. |

TC-13: Switch Off - Rollback Smoke

**Description:** Confirms that turning the switch off leaves the existing discount behavior stable enough for rollback.

| Platform | View |
| --- | --- |
| Public Checkout | Desktop |
| Box Office | Desktop |

**Tags:** checkout, discounts, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Disable `enable_itemized_partial_apply_to_each_split` for the smoke environment. |  | The switch-off state is confirmed. |
| Create a multi-ticket basket with a partial APPLY_TO_EACH discount. |  | Existing non-split behavior is used. |
| Complete checkout or confirm the expected validation message. |  | No server error, duplicate invoice rows, or leftover hidden rows occur. |
| Review transaction rows when purchase completes. |  | Rollback behavior remains stable. |

## Minimum Execution Set

TC-1: Public and widget checkout with complex fees, taxes, and partial discount quantities.
TC-2: Box Office direct sale with Cash, Other custom type, fee changes, and auto Free from full-free total.
TC-3: Box Office hold to hold-link customer purchase and group sale.
TC-4: Basket quantity, payment type, gift card, and credit changes before purchase.
TC-5: Gift card, user credit, and exchange credit after split.
TC-6: Assigned seating, venue-assigned seating, and 20-seat selection.
TC-7: Seat swap after discount on discounted and regular-price assigned seats.
TC-8: Per-ticket guest info and ticket sub-product paths.
TC-9: Mixed cart with itemized ticket, non-itemized ticket, product, membership, or protection item.
TC-10: Refund, partial refund, and void selected discounted vs regular-price tickets.
TC-11: Exchange selected discounted vs regular-price tickets.
TC-12: Transaction detail, payout detail, payment type breakdown, CSV export, and receipt/confirmation check.
TC-13: Switch-off rollback smoke on public and Box Office.

## Automation Candidates

- Backend API: public/widget basket create, apply discount, change basket, purchase, assert purchased ticket values.
- Backend API: venue basket create, Box Office payment type changes, group sale, hold, hold-link purchase, assert ticket values and payment details.
- Backend API: complex fee matrix with full-free, percentage, and fixed-amount partial discounts.
- Frontend E2E: public discount form, applicable ticket credit tile, widget checkout, Box Office discount modal, and payment method changes.
- Frontend E2E: assigned seating and venue-assigned seating update after discount.
- Backend or E2E: refund discounted vs regular-price ticket; exchange discounted vs regular-price ticket.
- Reporting smoke: compare transaction detail, payout detail, and report export for one split-discount purchase plus one refund and one exchange.

## Open Questions

None blocking for coverage. Finance/Product can still choose which report surface is the final payout signoff source.
