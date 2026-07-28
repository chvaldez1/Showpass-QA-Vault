---
title: Qase Case 3290 Free Event Ticket Update
tags:
  - qa/test-case
  - qase
  - checkout
---

# Qase Case 3290 Free Event Ticket Update

Use with [[05 Tooling/qasectl]] and [[05 Tooling/Qase Test Case Writing Rules]].

## Testing Intent

We are testing whether a customer or Box Office employee can complete checkout for a free event ticket while order, ticket, and inventory state stay aligned; this matters because a failed or duplicated free order can block admission or oversell the event, and we will prove it with a $0.00 order, the expected issued tickets, and the matching inventory reduction.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Fulfillment/access and inventory/ownership |
| Business invariant | A completed $0.00 checkout creates one order with the selected tickets, reduces available inventory once, and does not charge the customer. |
| User or business impact | Customer, attendee, organizer, and Box Office employee |
| Failure mode | Checkout requests payment, creates no tickets, creates duplicate tickets, or leaves inventory inconsistent with the order. |
| Observable proof | The checkout total is $0.00, no payment details are requested, one confirmation is shown, the expected tickets are accessible, and available inventory decreases by the purchased quantity. |
| Source of truth | Backend user and venue purchase tests, shared frontend free-payment handler, and the existing Playwright free-event checkout flow |
| Primary surfaces | Public checkout, Widget, Box Office, Electron, and React Native Public |
| In scope | A published event ticket priced at $0.00, supported customer states, successful checkout, ticket issuance, and inventory reduction |
| Out of scope | Tickets made free by discounts or credits, paid tickets, refunds, returns, assigned seating, and failure or retry behavior |
| Confidence | High for shared free-purchase behavior; Medium for Electron and React Native presentation because the current Playwright flow covers WebPublic, Widget, and WebBoxOffice only. |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| A free ticket completes without payment details or a charge. | Prevents a free event from being blocked by paid-checkout behavior. | TC-1 |
| The completed order issues exactly the selected tickets. | Ensures an attendee receives usable admission. | TC-1 |
| Available inventory decreases exactly once. | Prevents overselling or duplicate reservation state. | TC-1 |

## Existing Case Preservation Baseline

- Qase case: SPT-3290 in suite 613
- Classification: Refactor; preserve the existing free-event-ticket purpose and successful-flow coverage.
- Preserve the existing customer contexts: guest, authenticated customer, new Box Office customer, and existing Box Office customer.
- Preserve the existing surfaces, normalized to approved names: WebPublic, Widget, WebBoxOffice, Electron, and React Native Public.
- Preserve the useful assertions: $0.00 cart, no payment processing, one completed order, issued tickets, and reduced inventory.
- No behavioral coverage is removed or narrowed.

## Sources Reviewed

- Backend purchase behavior: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_user_based_basket.py`
- Backend Box Office purchase behavior: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_basket.py`
- Backend purchase flow: `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md`
- Shared frontend free-payment behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/payments/handlers/FreePaymentHandler/FreePaymentHandler.ts`
- Existing automation flow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/free-event.test.ts`

## Qase-Ready Update

TC-1: Core - Checkout - Verify a free event ticket completes without payment

**Description:** Validates that a customer or Box Office employee can complete checkout for an event ticket priced at $0.00 without entering payment details or creating a charge. It protects against blocked free checkout, missing or duplicate tickets, and inventory that does not match the completed order.

| Platform            | View    |
| ------------------- | ------- |
| WebPublic           | Desktop |
| WebPublic           | Mobile  |
| Widget              | Desktop |
| Widget              | Mobile  |
| WebBoxOffice        | Desktop |
| Electron            | Desktop |
| React Native Public | Mobile  |

**Preconditions:** A published event has one available ticket type priced at $0.00 with at least three tickets remaining. Use Guest or AuthenticatedCustomer for public checkout, Widget, or React Native Public. Use NewBoxOfficeCustomer or ExistingBoxOfficeCustomer for WebBoxOffice or Electron. The actor can access the selected event and checkout surface.

**Postconditions:** One completed $0.00 order contains three issued tickets of the selected type, and the event's available inventory is reduced by three.

**Tags:** checkout, tickets, purchases

**Parameters:**
CustomerState: Guest, AuthenticatedCustomer, NewBoxOfficeCustomer, ExistingBoxOfficeCustomer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event on the selected Platform and View. For Box Office, start on the Sell screen and select the event. | CustomerState | The prepared free ticket type is available for selection at $0.00. |
| Select three of the free tickets and add them to the basket. | Quantity: 3 | The basket contains three tickets and shows a $0.00 checkout total. |
| Continue to checkout using the customer option that matches CustomerState. | Valid customer name and email when requested | Checkout accepts the required customer information and does not request card or other payment details. |
| Complete the free order. |  | One confirmation is shown for a $0.00 order, and no charge or paid payment method is shown. |
| From the confirmation, receipt, My Orders, or Box Office transaction details available on the selected surface, review the completed order and its tickets. |  | One completed order contains exactly three issued and accessible tickets of the selected type. |
| In the organizer Dashboard, review the event's ticket sales or remaining inventory. | The same event and ticket type | Three tickets are recorded for the order and the available inventory is reduced by exactly three. |
