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

TC-1: Core - Discounts - Verify Partial Discount Split on Tickets (Items)

**Description:** Confirms that a customer can buy multiple tickets with a partial discount and see the right discounted and regular-price ticket totals. This test is not specific to tickets. Test with all item types.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Public Checkout | Mobile |
| Widget Checkout | Desktop |
| Widget Checkout | Mobile |


**Tags:** discounts, checkout, basket

**Parameters:**

TicketQuantity: FiveSelectedTwoDiscounted  
FeeSetup: FullCustomInternalFeesWithTaxOnFees  
DiscountType: FullDiscount, PercentageDiscount, FixedAmountDiscount

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Add the selected number of tickets to checkout. | TicketQuantity | The basket shows the correct ticket quantity for the selected platform. |
| Apply the discount in checkout. | DiscountType | Only the eligible ticket quantity is discounted. |
| Review subtotal, discount, fees, taxes, and total before payment. | FeeSetup | Free discounted tickets do not receive fees; regular-price tickets show the correct remaining fees and taxes. |
| Complete checkout. |  | Tickets are issued and the amount paid matches the checkout total. |
| Review the order or transaction details. |  | Discounted tickets and regular-price tickets show separate values that add up to the charged amount. |


[Core - Discounts - Verify Partial Discount Split on Tickets (Items)](https://app.qase.io/case/SPT-4858)

TC-2: Core - Discounts - Verify Partial Discount on In Person Payment Types

**Description:** Confirms that a Box Office employee can sell multiple tickets with a partial discount and the total stays correct for each payment type.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Box Office | Desktop |


**Tags:** box-office, payment, discounts

**Parameters:**

PaymentType: Cash, OtherCustomType, Square  
FeeSetup: FullCustomInternalFeesWithTaxOnFees

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Build a Box Office basket with multiple itemized tickets. | PaymentType | The basket is ready for sale. |
| Apply a partial APPLY_TO_EACH discount. |  | Only the eligible ticket quantity is discounted. |
| Change or confirm the selected payment type. | PaymentType | Fees update for the selected payment type without changing which tickets are discounted. |
| Complete the sale. | PaymentType | The transaction uses the selected payment type, or Free when the final total is $0.00. |
| Review the transaction and payout values. | FeeSetup | Discount, fee, tax, and payment totals match the purchased ticket values. |


[Core - Discounts - Verify Partial Discount on In Person Payment Types](https://app.qase.io/case/SPT-4859)

TC-3: Core - Checkout - Discounts - Verify Partial Discounts on Held Items

**Description:** Confirms that a Box Office basket keeps the same discounted and regular-price values when the discount is applied before the basket is put on hold and then purchased from the hold link.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Box Office | Desktop |
| Public Checkout | Desktop |


**Tags:** holds, checkout, discounts

**Parameters:**

HoldType: StandardHold, DynamicHold

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Build a Box Office basket with multiple itemized tickets. | HoldType | The basket is ready before it is placed on hold. |
| Apply the partial APPLY_TO_EACH discount before putting the basket on hold. | HoldType | The basket shows the correct discounted and regular-price quantities. |
| Put the discounted basket on hold and open the customer hold link. | HoldType | The hold preserves the split ticket rows, discount allocation, and customer-facing total. |
| Complete checkout from the hold link. | HoldType | The final order keeps the held discounted and regular-price ticket values. |
| Review the order, transaction, and invoice details. |  | Totals do not change unexpectedly between Box Office hold creation and hold-link purchase. |


[https://app.qase.io/case/SPT-4860](https://app.qase.io/case/SPT-4860)

TC-4: Core - Box Office - Discounts - Verify Partial Discounts During Group Sale

**Description:** Confirms that a Box Office group sale applies the partial discount during the group sale flow and keeps the discounted and regular-price values tied to the customer group.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Box Office | Desktop |


**Tags:** group-sales, box-office, discounts

**Parameters:**

GroupSalePath: ExistingCustomerGroup, NewCustomerGroup

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Start a Box Office group sale with multiple itemized tickets. | GroupSalePath | The customer group is selected or created before purchase. |
| Apply the partial APPLY_TO_EACH discount during the group sale. | GroupSalePath | Only the eligible ticket quantity is discounted and remaining tickets stay regular price. |
| Complete the group sale. | GroupSalePath | The transaction is created for the customer group and each item keeps the correct discounted or regular-price value. |
| Review the group sale order, transaction, and invoice details. |  | Customer group ownership, discount allocation, fees, taxes, and totals match the purchased ticket values. |


[Core - Box Office - Discounts - Verify Partial Discounts During Group Sale](https://app.qase.io/case/SPT-4873)

TC-5: Checkout - Basket Changes Recalculate Ticket Totals

**Description:** Confirms that changing a discounted basket before purchase updates totals cleanly and does not leave old ticket values behind.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Widget Checkout | Desktop |
| Box Office | Desktop |


**Tags:** basket, checkout, discounts

**Parameters:**

BasketChange: IncreaseQuantity, DecreaseQuantity, ChangePaymentType, AddGiftCard, RemoveCredit

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Create a basket with multiple tickets and apply a partial APPLY_TO_EACH discount. | BasketChange | The basket shows discounted and regular-price ticket portions. |
| Make the selected basket change before purchase. | BasketChange | Totals update without duplicate tickets or leftover old ticket values. |
| Complete checkout when the basket is still valid. | BasketChange | The final order matches the final basket. |
| Review the order or transaction details. |  | Discounted tickets show the discount; regular-price tickets do not. |


TC-6: Credits and Exchange Credit at Checkout - Credit Applies to Split Total

**Description:** Confirms that credits apply to the discounted checkout total and do not over-apply against the original ticket total.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Box Office | Desktop |


**Tags:** credits, checkout, discounts

**Parameters:**

CreditPath: PartialGiftCard, PartialUserCredit, ExchangeCreditAutoApply, ExchangeCreditManualToggle, RemoveCreditBeforePurchase

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Create a multi-ticket basket with a partial discount. | CreditPath | The discounted total is visible before credit is applied. |
| Apply or toggle the selected credit. | CreditPath | Credit applies to the discounted total, not the original pre-discount total. |
| Complete checkout. | CreditPath | Payment, credit, and remaining balance are correct. |
| Review the invoice and credit details. |  | Credit values do not exceed the final purchase total or create a negative balance. |


[Checkout - Discount - Verify Credit Applies to Split Total](https://app.qase.io/case/SPT-4862)

TC-7: Core - Checkout - Discounts + Assigned Seating - Verify Seat Ownership and Location Assignment Stay Correct After Discount Applied

**Description:** Confirms that assigned seats and venue-assigned locations stay attached to the correct tickets after the discount is applied and the basket is changed.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Box Office | Desktop |


**Tags:** assigned-seating, box-office, discounts

**Parameters:**

SeatPath: ApplyAfterSeatSelection, ChangeSeatsAfterDiscount, DecreaseQuantityAfterDiscount, TwentySeatSelection, VenueAssignedCreateWithDiscount, VenueAssignedApplyDiscountAfterCreate, VenueAssignedMixedTicketTypes

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Select or create seats for the selected scenario and apply the partial discount. | SeatPath | Each selected seat or venue-assigned location appears once in the basket. |
| Make the selected seat, location, or quantity change before purchase. | SeatPath | Seats and venue-assigned locations update without duplicates or missing selections. |
| Complete checkout or the Box Office sale. |  | Each issued ticket is tied to the expected seat or venue-assigned location. |
| Review invoice rows and ticket details. |  | Discounted and regular-price tickets keep the expected seats, location assignments, and values. |


[Core - Checkout - Discounts + Assigned Seating - Verify Seat Ownership and Location Assignment Stay Correct After Discount Applied](https://app.qase.io/case/SPT-4863)

TC-8: Core - Checkout - Discounts + Seating - Verify Seat Swap Keeps Discounted  Items

**Description:** Confirms that swapping seats after a partial discount keeps seat ownership and ticket values attached to the correct issued tickets.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Box Office | Desktop |


**Tags:** assigned-seating, seat-swap, discounts

**Parameters:**

SwapPath: SwapDiscountedTicketSeat, SwapRegularPriceTicketSeat, SwapMultipleSeats

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Create an assigned-seating basket with discounted and regular-price tickets. | SwapPath | The basket shows each selected seat once with the expected discounted or regular-price value. |
| Swap the selected seat after the discount is applied. | SwapPath | The old seat is released and the new seat is attached to the same ticket value. |
| Complete checkout or the Box Office sale. |  | Tickets issue for the final swapped seats only. |
| Review ticket details and invoice rows. |  | Discounted and regular-price values stay with the correct swapped tickets and no duplicate seat assignment remains. |


[Core - Checkout - Discounts + Seating - Verify Seat Swap Keeps Discounted  Items](https://app.qase.io/case/SPT-4864)  

TC-9: Per-Ticket Identity - Guest Info and Child Ticket Details Stay Attached

**Description:** Confirms that attendee details and child ticket details stay attached to the correct ticket after the discount is applied.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Widget Checkout | Desktop |
| Box Office | Desktop |


**Tags:** tickets, discounts, edge-case

**Parameters:**

IdentityPath: GuestInfoPerTicket, ExistingGuestInfo, TicketTypeSubProduct, PackagedTickets

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Create a basket for the selected identity path. | IdentityPath | Required attendee fields or child ticket details are visible. |
| Apply a partial APPLY_TO_EACH discount. | IdentityPath | Discounted and regular-price tickets keep their own attendee or child ticket details. |
| Enter or review attendee details where required. | IdentityPath | Attendee data remains attached to the intended ticket. |
| Complete checkout and review order details. |  | No guest info, required info, or child ticket detail is dropped or moved to the wrong ticket. |


[https://app.qase.io/case/SPT-4865](https://app.qase.io/case/SPT-4865)

TC-10: Edge Case - Checkout - Discount - Verify Itemized Discount Application on Non Itemized Basket

**Description:** Confirms that only eligible itemized ticket rows are affected and unrelated cart items keep their normal behavior.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Box Office | Desktop |


**Tags:** checkout, discounts, edge-case

**Parameters:**

Scenario: ItemizedAndNonItemizedTickets, TicketPlusProtection, BasketWithFreeItems

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Create the selected mixed or non-target basket. | Scenario | Basket contents match the scenario. |
| Apply the relevant discount. | Scenario | Only eligible partial APPLY_TO_EACH itemized tickets are separated into discounted and regular-price portions. |
| Complete checkout or confirm the expected validation message. | Scenario | Supported scenarios complete; unsupported scenarios fail without changing unrelated cart items. |
| Review the basket or invoice details. |  | Products, memberships, protection, non-itemized tickets, and non-target discounts remain unchanged. |


[https://app.qase.io/case/SPT-4866](https://app.qase.io/case/SPT-4866)  
TC-11: Dashboard - Refunds- Verify Refund/Void on Invoices with DiscountedItems

**Description:** Confirms that refunds and voids use the value of the selected ticket, whether that ticket was discounted or regular price.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Box Office | Desktop |


**Tags:** refunds, transactions, discounts

**Parameters:**

TicketSelection: DiscountedTicket, RegularPriceTicket, MixedSelection, FullInvoice  
Action: Refund, PartialRefund, Void

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Open a completed transaction with both discounted and regular-price tickets. | TicketSelection | Discounted and regular-price tickets can be selected separately. |
| Preview the selected action. | Action | Amount, fee, and tax values are based only on the selected tickets. |
| Complete the action. | Action | Selected tickets update state and unselected tickets remain unchanged. |
| Review original and reversal invoice rows. |  | Reversal rows match the selected ticket values and show the correct signs. |


[https://app.qase.io/case/SPT-4867](https://app.qase.io/case/SPT-4867)  
TC-12: Core - Exchanges - Verify Selected Tickets Create Correct Exchange Credit

**Description:** Confirms that exchanges create credit based on the selected ticket values, not the full original order total.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Box Office | Desktop |


**Tags:** exchanges, credits, discounts

**Parameters:**

ExchangeSelection: DiscountedTicket, RegularPriceTicket, MixedSelection, ExchangeAfterPartialRefund

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Start an itemized exchange from a completed order with partial discounts. | ExchangeSelection | Original tickets are selectable by ticket. |
| Select the tickets for exchange. | ExchangeSelection | Exchange preview uses only the selected ticket values. |
| Complete replacement checkout using Exchange Credit. |  | Replacement tickets issue and unselected original tickets remain unchanged. |
| Review original, replacement, and adjustment invoices. |  | Credit, fees, taxes, and adjustment rows match the selected exchanged tickets. |


[https://app.qase.io/case/SPT-4868](https://app.qase.io/case/SPT-4868)  
TC-13: Reports - Verify Transaction, Payout, and Report Totals Down Add

**Description:** Confirms that transaction, payout, and report totals all tell the same financial story after split-discount purchases and follow-up actions.  
Impact: Strong

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Box Office | Desktop |


**Tags:** reports, transactions, payouts

**Parameters:**

Surface: TransactionDetail, PayoutDetail, PaymentTypeBreakdown, ReportCsv, ReceiptOrConfirmation

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Complete representative public, widget, Box Office, refund, and exchange examples. | Surface | Source transactions exist in the date range. |
| Open the selected financial surface. | Surface | Purchases and follow-up invoices appear where supported. |
| Compare discounted, regular-price, refund, and exchange values. |  | Values are not duplicated and signs are correct. |
| Cross-check against another financial surface. |  | Business totals agree within expected rounding rules. |


TC-14: Switch Off - Rollback Smoke

**Description:** Confirms that turning the switch off leaves the existing discount behavior stable enough for rollback.

| Column 1 | Column 2 |
| --- | --- |
| Column 1 | Column 2 |
| Platform | View |
| Public Checkout | Desktop |
| Box Office | Desktop |


**Tags:** checkout, discounts, edge-case

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Column 1 | Column 2 | Column 3 |
| Step Action | Data | Expected Result |
| Disable `enable_itemized_partial_apply_to_each_split` for the smoke environment. |  | The switch-off state is confirmed. |
| Create a multi-ticket basket with a partial APPLY_TO_EACH discount. |  | Existing non-split behavior is used. |
| Complete checkout or confirm the expected validation message. |  | No server error, duplicate invoice rows, or leftover hidden rows occur. |
| Review transaction rows when purchase completes. |  | Rollback behavior remains stable. |


## Minimum Execution Set

TC-1: Public and widget checkout with complex fees, taxes, and partial discount quantities.  
TC-2: Box Office direct sale with Cash, Other custom type, fee changes, and auto Free from full-free total.  
TC-3: Box Office hold with discount applied before putting the basket on hold, then hold-link purchase.  
TC-4: Box Office group sale with discount applied during the group sale flow.  
TC-5: Basket quantity, payment type, gift card, and credit changes before purchase.  
TC-6: Gift card, user credit, and exchange credit after split.  
TC-7: Assigned seating, venue-assigned seating, and 20-seat selection.  
TC-8: Seat swap after discount on discounted and regular-price assigned seats.  
TC-9: Per-ticket guest info and ticket sub-product paths.  
TC-10: Mixed cart with itemized ticket, non-itemized ticket, product, membership, or protection item.  
TC-11: Refund, partial refund, and void selected discounted vs regular-price tickets.  
TC-12: Exchange selected discounted vs regular-price tickets.  
TC-13: Transaction detail, payout detail, payment type breakdown, CSV export, and receipt/confirmation check.  
TC-14: Switch-off rollback smoke on public and Box Office.

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