---
title: Test Ticket Delivery Attendee Check In Transfer and Resale
date: 2026-10-03
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test Ticket Delivery Attendee Check In Transfer and Resale

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Customer receives the promised order. The Attendee can obtain and use the correct ticket. The Venue Employee admits only an eligible ticket and can see the real Check In history. Transfer and Resale change ownership or validity according to their own rules, not merely the displayed name.

Product pickup, Membership access, and Guestlist Check In are different workflows. Use their own guide rather than assuming every barcode or Guestlist entry is an Event admission ticket.

## Prepare separate tickets for each outcome

Prepare owned orders for first Check In, duplicate Check In, wrong Event, Refund/Void rejection, Transfer, and Resale. Record Event date/timezone, admission window, re-entry rules, ticket delivery timing, delayed barcode configuration, Package barcode mode, recipient, and Employee scan permission.

Use a purchaser Customer and a different controlled recipient/Attendee where supported. If the Event is future-dated, do not bypass admission rules; use a separate appropriately timed test Event for Check In.

## Delivery → real admission

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the Customer, reopen the paid order and obtain the ticket through the configured account, email, PDF, print, or wallet option. | Original order and promised delivery timing | Correct Event/date, seat or Ticket Type, quantity, and intended recipient. Every promised item is available at the promised time. |
| 2 | Open the actual delivered link or barcode as the Attendee. | Controlled recipient account/inbox | The Attendee can access the item; Customer payment data is not unnecessarily exposed. |
| 3 | As the Venue Employee, open Check In and choose the intended Event. Look up or scan the ticket. | Correct Event and barcode | Matching ticket is found with correct eligibility. Lookup alone does not prove admission. |
| 4 | Complete the actual Check In action. Reopen its history or current count. | One eligible Attendee | Successful admission is recorded once with the correct Event and item. |
| 5 | Attempt another Check In for the same ticket. | Same barcode | Duplicate/re-entry result follows the configured rule, without an unintended extra admission. |
| 6 | In separate runs, present a wrong-Event or refunded/voided ticket. | Controlled invalid tickets | Clear rejection and no new admission. |

For delayed delivery, verify before and after the agreed release boundary using approved time-controlled tests. An invoice or preview is not proof that the Customer received an email or can obtain the barcode.

## Shipping choice → partial fulfillment → complete fulfillment

Use an order with at least two actual shipping-enabled items and known shipping charges. Include a separate electronic or pickup item only if that mixed basket is supported. Record the saved destination and each item's method. Shipping status is operational preparation/fulfillment, not a claim that a carrier delivered a parcel.

1. As Customer, choose the actual supported delivery method. Try an approved blocked destination on a separate validation attempt, then correct to an allowed controlled address. Compare shipping price/tax and retained item/variant selections; use different billing and shipping addresses in one valid purchase.
2. Reopen the paid order. Verify the saved shipping destination, exact items and quantities, shipping charge and initial fulfillment status. An electronic ticket is not automatically a shipped item; Will Call/Pick Up follows its own collection procedure.
3. As the permitted Venue Employee, open **Transactions → the order → Fulfillment**. Inspect Order Information, Shipping Address and all items; use **Load more items** if shown so omitted pages do not hide unfinished items.
4. Set only one eligible shipping item's status to **Fulfilled**, leave another **Unfulfilled**, select **Update** and complete the confirmation. Reopen the order and the dialog. The selected item persists; the untouched item remains Unfulfilled; the order shows **Partially Fulfilled** where that aggregation applies. Partial is an order-level result, not a selectable per-item status.
5. Fulfill the remaining eligible items through the same supported action. Reopen and compare **Fulfilled** order status, all quantities and the Employee attribution through approved evidence. Repeat/cancel a separate supported update to check persistence without extra stock, charge or admission.
6. On an independent shipping order, run the eligible Refund/Exchange branch before versus after fulfillment. Check shipping-money policy, retained destination, which items remain to fulfill, any replacement and reports. Do not assume Refund automatically recalls a parcel or resets fulfillment.

The reviewed shipping-update API uses the Ticket Item viewset's default **Scan Tickets** (`VP_SCAN_TICKETS`) authority. Reaching the order through Transactions also requires its actual viewing/access authority, such as **Manage Transactions** (`VP_MANAGE_FINANCIALS`); these are not the same permission. Bind the effective role, Venue scope and fulfillment configuration for the deployed client; a visible action is not permission proof. Use a denied/other-Venue API check for the affected service. Membership fulfillment can change Member access and needs its own promised-access checks.

The actual shipping-status service accepts only supported per-item states and rejects changing an item whose current status is Shipping Not Selected to a shipping state. Use backend tests for mixed valid/invalid updates and rollback; the manual journey proves the supported Employee workflow.

## Transfer to a different Customer

1. As the original Customer, open the eligible ticket and its supported transfer action. Send only to a controlled recipient.
2. Verify pending status and notification before acceptance. Cancel a separate pending transfer when that client supports cancellation.
3. As the recipient, follow the actual acceptance flow and reopen the account/order.
4. Check both parties' access, ticket ownership, old/new barcode validity, admission, seat ownership, and Inventory according to the transfer rule.
5. Confirm transfer does not create a second sale or accidental duplicate admission. The purchaser's financial history and recipient's entitlement need not be identical records.

## Resale as a separate lifecycle

With resale-enabled configuration, submit a separate eligible owned ticket through the supported Customer flow. Verify eligibility, submitted price/fees, pending state, and whether the original ticket remains usable while listed according to policy.

Complete purchase as another Customer through the supported public flow. The new Customer must receive one usable entitlement; the original ownership/validity and seat claim must follow policy. Reopen the resale status and both orders. Separately reconcile seller proceeds and payout eligibility using approved read-only test records; purchase completion is not proof a seller payout happened.

Test cancellation/expiry, sold-versus-cancel competition, and refund/dispute-generated Resale in isolated backend/sandbox tests where applicable. Do not create a real payout as a handbook verification step.

## Senior-QA variations

Mixed Package barcodes; multiple Attendees on one order; required attendee information; authorized Employee reprint; transfer limits; partial Refund after one admission; scan on two supported devices; stale saved PDF after Transfer; wrong Venue/Event selected; public app/webview delivery; and repeated resend requests.

Use actual scanner/camera/print quality and native-wallet evidence when affected. Browser lookup assertions cannot replace those checks.

**Source route:** B4, B10, B19 and backend terminology. Record exact identities and ticket references, not just total count.

Use [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the complete purchase checklist]] to retain related information, messages, analytics, external admission and reporting outcomes. Shipping sources: B28, the [Ticket Item API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/ticket_items.py>) and the [Fulfillment dialog](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/UpdateFulfillmentModal/UpdateFulfillmentModal.web.tsx>). Pass generation and a usable installed wallet pass are separate evidence.

## Source-backed cautions and automation reference

**Business risk:** a valid paid ticket is not obtainable, wrong barcode is printed, duplicate scan admits someone twice, or transferred/resold tickets retain the wrong owner/validity.

**Automation:** supported order/delivery/ownership journeys and browser check-in where applicable; backend barcode/eligibility/idempotency/payout tests. Physical camera/scanner, print quality, and native wallet behavior need separate evidence. Source route: B4, B19, B10.
