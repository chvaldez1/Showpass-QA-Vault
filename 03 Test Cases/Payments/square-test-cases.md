---
title: Square Terminal Test Cases
date: 2026-07-22
tags:
  - qa
  - test-cases
  - square-terminal
status: review
---

# Square Terminal Test Cases

Draft status: review only. Do not push these cases to Qase without a separate approved dry run.

## What We Are Testing

This work is based on the active backend branch:

`bugfix/SPD-2404-square-terminal-checkout-in-progress-manual-cc`

PR: [web-app #9466](https://bitbucket.org/showpass/web-app/pull-requests/9466/)

The branch changes what happens after a Square Terminal payment is successful, canceled, or failed. It also changes whether the same sale can be retried on the Terminal or completed by entering the card manually.

The main rule is simple:

> [!important] Payment rule
> One customer payment must create exactly one paid Showpass order. A canceled or failed payment must create no paid order and must leave the sale safe to retry.

## Plain-Language Terms

| Term | Meaning in these tests |
| --- | --- |
| Basket | The tickets or products the customer is buying before payment is complete. |
| Square Terminal | The separate Square device where the customer taps, inserts, or swipes a card. |
| Terminal payment screen | The Showpass screen that says it is waiting for the customer to pay. |
| Manual card entry | Entering card details in Showpass instead of using the Square Terminal. |
| Paid order | A completed sale visible in Showpass Transactions with an invoice and the expected tickets or products. |
| Hold | Tickets reserved for a customer but not paid for yet. |
| Exchange credit | Value from the customer's original order that is applied to a replacement order. |

## Entry Points Affected by the Branch

The branch is in `web-app`, but most of the payment-state changes are in shared backend APIs. That means more than the directly edited legacy screen can be affected.

| Entry Point | What the Employee Uses | Why It Is in Scope | Required Coverage |
| --- | --- | --- | --- |
| LegacyWebBoxOffice | The older Web Box Office page in normal Box Office mode | The branch directly changes this page's payment controller and manual-entry control. | Success, cancel, Terminal retry, manual-card retry, failure |
| LegacyWebPOSMode | The older Web Box Office page after selecting POS Mode | It uses the same changed controller, payment choices, and Terminal payment screen. | Success, cancel, Terminal retry, manual-card retry |
| NewWebBoxOffice | The current Web Box Office sell and checkout pages | It calls the changed cancel and Terminal-status APIs. | Success, cancel, Terminal retry, manual-card retry, failure |
| ElectronBoxOffice | The installed desktop Box Office app | It shares the current Box Office payment flow and records a separate Electron payment source. | Success, cancel, Terminal retry, manual-card retry, failure |
| MobilePOS | The iPad POS app | It uses the changed cancel API, Terminal-status API, and Square payment updates. | Success, cancel, Terminal retry, failure |
| Square background update | Square tells Showpass that payment completed, failed, or was canceled | The branch now uses one shared backend process for all final Square results. | Success once, no order after cancel/failure, no late duplicate |

> [!note] Manual card entry on Mobile POS
> Mobile POS offers Square Terminal, Square reader, or Square app payment choices. It does not use the same Showpass manual-card form as Web and Electron, so TC-3 and TC-4 do not include Mobile POS.

## Testing Intent

| Field | Answer |
| --- | --- |
| Criticality | Payment, order creation, ticket delivery, held inventory, and live Box Office sales |
| What must stay true | Square, the Showpass transaction, the amount charged, and the tickets or products delivered must agree. |
| Who is affected | Customer, Box Office employee, organizer, finance, and support |
| Main failures to prevent | Duplicate charge, charge without an order, order without a charge, stuck sale, lost hold, or exchange credit used incorrectly |
| Proof | Square payment result, one Showpass transaction, correct total, correct payment source, and exactly one set of tickets or products |
| Confidence | High for backend and legacy Web Box Office behavior; Medium for current Web, Electron, and Mobile POS cancellation recovery until the branch is tested through those clients |

## Proof Target Map

| Proof | Covered By |
| --- | --- |
| A normal Square Terminal payment succeeds on every supported sales entry point. | TC-1 |
| Canceling on Showpass or on the Terminal creates no paid order and allows one safe retry. | TC-2 |
| An active Terminal payment cannot be bypassed by manual card entry. | TC-3 |
| Manual card entry still works when a Terminal is paired but has not started a payment. | TC-4 |
| A failed or timed-out Terminal payment creates no order and can be retried. | TC-5 |
| Cancel and success arriving at nearly the same time create one final result. | TC-6 |
| Canceling payment does not lose a customer's hold or held inventory. | TC-7 |
| Canceling payment during an exchange does not use exchange credit twice or change the remaining balance. | TC-8 |

## Sources Reviewed

### Branch and backend behavior

- Branch comparison: `origin/develop...bugfix/SPD-2404-square-terminal-checkout-in-progress-manual-cc`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/api/venue_based/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/services/square/terminal_checkout_basket_update.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/integrations/services/square/webhook_handlers/checkout/checkout_updated.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/viewsets.py`
- Branch tests under `apps/integrations/tests/` and `apps/tickets/tests/`

### Sales entry points

- Legacy Web Box Office controller and templates under `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/`
- Current Web and Electron Box Office flow under `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/`
- Mobile POS Square payment flow under `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/`
- Existing Playwright patterns in `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

### Existing Qase coverage

- Read-only search: `Square`
- Qase reported 16 matching cases from 1,567 project cases.
- Full cases reviewed: `SPT-1317`, `SPT-2574`, and `SPT-4918`.
- No Qase changes were made.

| Existing Case | How to Use It |
| --- | --- |
| [SPT-1317 - Pair and unpair Square Terminal](https://app.qase.io/case/SPT-1317) | Use to confirm the test Terminal is connected before payment testing. |
| [SPT-2574 - Complete checkout with Square Terminal](https://app.qase.io/case/SPT-2574) | Existing success and cancel/retry coverage. Enhance it with the clearer platform and proof checks from TC-1 and TC-2 rather than creating a duplicate. |
| [SPT-4918 - Handle Square reader or app-switch failure](https://app.qase.io/case/SPT-4918) | Covers mobile reader/app-switch failures, not Web Box Office Terminal failure. |

## Source-Backed Behavior

| Situation | Expected Customer and Employee Result |
| --- | --- |
| Payment is waiting on the Terminal | The sale stays locked to that payment. Another Terminal payment or manual card payment cannot start. |
| Cancel was requested but Square has not finished canceling | Showpass keeps waiting. The employee cannot treat the sale as canceled yet. |
| Square confirms cancellation | No paid order is created. The same basket can be used again. |
| Square reports failure | No paid order is created. The same basket can be used again. |
| Square confirms success | Showpass creates the order once, stops extending the basket time, and delivers the expected items. |
| The same final Square update arrives again | Showpass does not create a second order. |
| A late update arrives for an old canceled payment | The old payment does not become active again. |
| A held basket is canceled | The hold remains a hold and its reserved ticket quantity stays reserved. |
| The employee changes to manual entry after final cancellation | The sale uses normal Box Office card entry and does not start another Terminal request. |
| The employee tries to cancel another employee's sale or a sale from another venue | Showpass refuses the cancellation before contacting Square. |

## Risk Areas

- The current Web and Mobile clients can receive `payment finished, no status name` after the backend clears a canceled or failed payment. Their screens must still close and allow a new payment.
- Mobile POS closes its payment screen after the employee selects Cancel, so the basket must actually be ready when the employee returns to checkout.
- Mobile POS Retry currently watches the basket again; the test must prove that a fresh payment request is started after the old failed request was cleared.
- A stale browser copy of the basket can still say it is a Terminal sale after the backend canceled it. Manual card entry must not send the sale back to the Terminal path.
- Cancel and card completion can cross in transit. The final Square result and Showpass order must agree.
- Holds and exchanges contain extra customer value. Resetting them like a normal basket can lose inventory or use credit incorrectly.

## Platform and Outcome Matrix

This is the minimum platform coverage for the branch. It is risk-weighted, not every possible combination.

| Entry Point | Clean Success | Cancel in Showpass | Cancel on Terminal | Failure/Timeout | Terminal Retry | Manual-Card Retry |
| --- | --- | --- | --- | --- | --- | --- |
| LegacyWebBoxOffice | Required | Required | Required | Required | Required | Required |
| LegacyWebPOSMode | Required | Required | Extended | Extended | Required | Required |
| NewWebBoxOffice | Required | Required | Required | Required | Required | Required |
| ElectronBoxOffice | Required | Required | Extended | Required | Required | Required |
| MobilePOS | Required | Required | Required | Required | Required | Not applicable |

## Recommended Test Data

- One venue connected to Square with a paired Terminal.
- One Box Office employee allowed to sell tickets and take card payments.
- One second employee and second venue for automated permission checks.
- One low-cost general-admission ticket with at least five available.
- One low-cost product for an extended mixed ticket-and-product sale.
- One existing customer with a unique email address.
- One active held basket containing one ticket.
- One exchangeable order where the replacement costs slightly more than the original, leaving a small card balance.
- A test card for the Terminal and a test card for manual entry.
- Access to Showpass Transactions and the Square payment record.

For every payment attempt, record:

- Entry point used
- Basket total
- Square result: successful, canceled, or failed
- Square payment ID when payment succeeds
- Showpass transaction ID when an order is created
- Number of tickets or products delivered

## Qase-Ready Manual Test Cases

### TC-1: Core - Checkout - Complete a successful Square Terminal sale from every entry point

**Priority:** High  
**Type:** Happy Path  
**Area:** Square Terminal checkout

**Title:** Core - Checkout - Complete a successful Square Terminal sale from every entry point

**Description:** Confirms that an employee can sell a ticket with Square Terminal from every supported Showpass sales entry point. It checks that the Terminal amount, Showpass transaction, customer order, and delivered ticket all match.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

For the mobile row, run the test in authenticated Mobile POS on iPad.

**Preconditions:** The venue is connected to Square, the Terminal is paired, the employee can take card payments, and one low-cost ticket is available.

**Postconditions:** One paid order and one delivered ticket exist for each completed run.

**Tags:** checkout, payment, tickets

**Parameters:**  
SalesEntryPoint: LegacyWebBoxOffice, LegacyWebPOSMode, NewWebBoxOffice, ElectronBoxOffice, MobilePOS

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the Box Office employee and open the selected sales entry point. | SalesEntryPoint | The employee can open the Sell screen for the test venue. |
| Add one ticket and continue to payment. | Record the basket total. | The basket contains one ticket and shows the expected total. |
| Choose Credit and select the connected Square Terminal when a choice is shown. |  | Showpass indicates that the Terminal will be used. |
| Select the button that starts or completes checkout. |  | Showpass waits for the customer, and the Terminal displays the same total. |
| Complete payment on the Terminal. | Terminal test card | Showpass reports success and displays the order or delivery step. |
| Open Showpass Transactions for the venue. | Use Web Dashboard if the sales device does not show Transactions. | Exactly one paid transaction exists for the basket total and identifies the correct Square Terminal entry point. |
| Review the customer order and ticket. |  | The customer has exactly one usable ticket and no duplicate order. |

**Test Case Notes**

- Qase status: Covered in part by [SPT-2574](https://app.qase.io/case/SPT-2574)
- Qase action: Enhance `SPT-2574` with the five entry points and the one-order/one-ticket proof.

### TC-2: Core - Checkout - Cancel Square Terminal payment and retry the same sale

**Priority:** High  
**Type:** Regression  
**Area:** Square Terminal checkout

**Title:** Core - Checkout - Cancel Square Terminal payment and retry the same sale

**Description:** Confirms that canceling an unpaid Terminal request creates no order and leaves the same basket ready for a new Terminal payment. It covers cancellation from Showpass and cancellation from the Square Terminal.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

For the mobile row, run the test in authenticated Mobile POS on iPad.

**Preconditions:** The setup from TC-1 is available. The employee can review Transactions after the attempt.

**Postconditions:** The canceled attempt has no order. The successful retry creates one paid order and one ticket.

**Tags:** checkout, payment, edge-case

**Parameters:**  
SalesEntryPoint: LegacyWebBoxOffice, LegacyWebPOSMode, NewWebBoxOffice, ElectronBoxOffice, MobilePOS  
CancellationSource: ShowpassCancelButton, SquareTerminal

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected sales entry point, add one ticket, and start Square Terminal payment. | SalesEntryPoint | Showpass waits for payment and the Terminal shows the correct total. |
| Cancel before presenting a card. | CancellationSource | Showpass leaves the waiting screen and does not show an order confirmation. |
| Search Showpass Transactions and the customer's orders. |  | No paid transaction, order, or ticket exists for the canceled attempt. |
| Return to the same basket. | Compare ticket and total with the original basket. | The ticket and total are unchanged and payment can be started again. |
| Start a new Square Terminal payment for the same basket. |  | The Terminal displays a fresh payment request for the same total. |
| Complete the new payment. | Terminal test card | One paid order and one ticket are created. |
| Compare Square and Showpass. |  | Only the second attempt is paid; there is no duplicate charge or order. |

**Test Case Notes**

- Qase status: Cancel and Terminal retry are covered in `SPT-2574`; platform and cancellation-source coverage need clarification.
- Qase action: Enhance `SPT-2574`, not a new duplicate.

### TC-3: Core - Checkout - Switch to manual card entry only after Terminal cancellation finishes

**Priority:** High  
**Type:** Regression  
**Area:** Card payment recovery

**Title:** Core - Checkout - Switch to manual card entry only after Terminal cancellation finishes

**Description:** Confirms that an employee cannot start manual card payment while the Terminal may still charge the customer. After Square confirms cancellation, the employee can pay for the same basket by entering the card in Showpass.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Preconditions:** Square Terminal and manual card entry are enabled. The employee can take card payments and one ticket is available.

**Postconditions:** The canceled Terminal request has no charge or order. Manual card entry creates one paid order and one ticket.

**Tags:** checkout, payment, box-office

**Parameters:**  
SalesEntryPoint: LegacyWebBoxOffice, LegacyWebPOSMode, NewWebBoxOffice, ElectronBoxOffice

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected sales entry point, add one ticket, and start Square Terminal payment. | SalesEntryPoint | Showpass and the Terminal wait for customer payment. |
| While payment is still waiting, try to open manual card entry or submit payment again. |  | Showpass does not start manual card payment or a second Terminal payment. |
| Select Cancel in Showpass and wait until the Terminal request is canceled. |  | The payment screen closes and no order is created. |
| Choose manual card entry without rebuilding the basket. |  | Card fields open for the same ticket and total; the Terminal does not receive another request. |
| Enter the manual-entry test card and complete payment. | Manual-entry test card | Showpass creates one paid order and one ticket. |
| Open the transaction and compare it with Square. |  | The paid transaction is recorded as regular Box Office card entry, and the canceled Terminal attempt has no charge. |

### TC-4: Core - Checkout - Use manual card entry while a Square Terminal is paired

**Priority:** High  
**Type:** Happy Path  
**Area:** Manual card payment

**Title:** Core - Checkout - Use manual card entry while a Square Terminal is paired

**Description:** Confirms that an employee can choose manual card entry before a Terminal payment starts. It checks that Showpass uses the entered card, does not send a payment to the Terminal, and creates one order.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Preconditions:** A Terminal is paired, manual card entry is enabled, and one ticket is available.

**Postconditions:** One regular Box Office card transaction and one ticket exist. No Terminal request exists for the sale.

**Tags:** checkout, payment, box-office

**Parameters:**  
SalesEntryPoint: LegacyWebBoxOffice, LegacyWebPOSMode, NewWebBoxOffice, ElectronBoxOffice

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected sales entry point and add one ticket. | SalesEntryPoint | The basket shows one ticket and the expected total. |
| Choose Credit, then choose manual card entry before starting payment. |  | Manual card fields appear and the Terminal does not show a payment request. |
| Enter the manual-entry test card and complete payment. | Manual-entry test card | Showpass reports success and creates one order. |
| Review the transaction and customer ticket. |  | The transaction is regular Box Office card entry, one ticket exists, and Square Terminal was not used. |

### TC-5: Core - Checkout - Recover after Square Terminal failure or timeout

**Priority:** High  
**Type:** Negative  
**Area:** Square Terminal recovery

**Title:** Core - Checkout - Recover after Square Terminal failure or timeout

**Description:** Confirms that a failed or timed-out Terminal request creates no order and lets the employee start a fresh payment for the same basket.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

For the mobile row, run the test in authenticated Mobile POS on iPad.

**Preconditions:** The test environment can safely cause a Square failure or timeout without charging the card.

**Postconditions:** The failed attempt has no order. The successful retry creates one order and one ticket.

**Tags:** checkout, payment, edge-case

**Parameters:**  
SalesEntryPoint: LegacyWebBoxOffice, NewWebBoxOffice, ElectronBoxOffice, MobilePOS

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected sales entry point, add one ticket, and start Terminal payment. | SalesEntryPoint | Showpass waits for payment and the Terminal shows the correct total. |
| Cause the request to fail or time out before payment completes. | Approved failure method | Showpass shows a clear failure or timeout and does not show purchase confirmation. |
| Search Transactions and the customer's orders. |  | No paid transaction, order, or ticket exists for the failed attempt. |
| Select Retry or return to checkout and start payment again. |  | A fresh payment request starts for the same basket total. |
| Complete the new payment. | Terminal test card | Showpass creates one paid order and one ticket. |
| Compare the failed and successful attempts. |  | Only the successful attempt is paid and fulfilled. |

### TC-6: Box Office - Checkout - Resolve a cancel and card completion race as one final result

**Priority:** High  
**Type:** Edge Case  
**Area:** Square Terminal final status

**Title:** Box Office - Checkout - Resolve a cancel and card completion race as one final result

**Description:** Confirms that selecting Cancel at nearly the same time the customer completes payment produces one final result. If Square charged the card, Showpass creates one order. If Square canceled, Showpass creates no order and allows a retry.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:** The environment allows the employee and customer to coordinate Cancel and card completion. Square payment records and Showpass Transactions are available.

**Postconditions:** The sale has one stable final result with no duplicate charge, order, or ticket.

**Tags:** checkout, payment, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add one ticket and start Square Terminal payment. | Record the basket total. | Showpass and the Terminal wait for the same amount. |
| Select Cancel in Showpass while the customer completes the card action on the Terminal. |  | Showpass does not start another payment while the result is still unknown. |
| Wait for Square and Showpass to stop changing. |  | The payment screen closes or shows success; it does not remain stuck. |
| Check the final Square result. | Successful or Canceled | Square has one final result for the request. |
| Check Showpass Transactions and the customer order. |  | A successful Square result has exactly one matching paid order and ticket; a canceled result has no paid order or ticket. |
| Check again after refreshing. |  | A late update does not create a second order or remove the correct order. |

### TC-7: Box Office - Holds - Keep a customer's hold after Terminal cancellation

**Priority:** High  
**Type:** Regression  
**Area:** Held ticket sale

**Title:** Box Office - Holds - Keep a customer's hold after Terminal cancellation

**Description:** Confirms that canceling Terminal payment does not remove the customer's hold or release the held ticket. The employee can complete payment later for the same held ticket.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Preconditions:** One active hold contains one ticket for a known customer. Record the hold name, ticket, expiry, and available inventory before payment.

**Postconditions:** The hold becomes one paid order after retry, and inventory shows one sale rather than a released or duplicate ticket.

**Tags:** holds, payment, box-office

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the customer's held basket. | Hold name and customer | The expected held ticket and customer are shown. |
| Start Square Terminal payment, then cancel before presenting a card. |  | No order is created. |
| Open the hold again and compare it with the recorded details. |  | The same ticket is still held for the same customer and has not returned to available inventory. |
| Start payment again and complete it. | Terminal test card | One paid order and one ticket are created for the customer. |
| Review the hold and inventory. |  | The hold is completed, and inventory reflects one sold ticket with no duplicate or missing reservation. |

### TC-8: Box Office - Exchanges - Keep exchange credit correct after Terminal cancellation

**Priority:** High  
**Type:** Regression  
**Area:** Exchange payment

**Title:** Box Office - Exchanges - Keep exchange credit correct after Terminal cancellation

**Description:** Confirms that canceling the Terminal portion of an exchange does not spend the customer's exchange credit or change the amount still due. A successful retry uses the credit once and creates one replacement order.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:** An exchangeable order exists. The replacement costs more than the original order, leaving a small amount to pay by card. Record the exchange credit and card balance.

**Postconditions:** One replacement order exists. Exchange credit is used once and the customer pays the correct remaining balance once.

**Tags:** exchanges, payment, box-office

**Parameters:**  
SalesEntryPoint: LegacyWebBoxOffice, LegacyWebPOSMode

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the original order and start an exchange from the selected entry point. | SalesEntryPoint | Showpass shows the replacement item, exchange credit, and remaining card balance. |
| Start Square Terminal payment for the remaining balance. | Record the balance. | The Terminal requests only the remaining balance. |
| Cancel before presenting a card. |  | No replacement order or card payment is completed. |
| Review the exchange again. |  | The exchange credit and remaining card balance are unchanged. |
| Start payment again and complete it. | Terminal test card | One replacement order is created and the card is charged once for the remaining balance. |
| Review both orders and the exchange credit. |  | The orders are linked, the credit was used once, and one replacement ticket was delivered. |

## Minimum Execution Set

Run these before release:

- [ ] TC-1 once on all five `SalesEntryPoint` values.
- [ ] TC-2 with `ShowpassCancelButton` on all five entry points.
- [ ] TC-2 with `SquareTerminal` on `LegacyWebBoxOffice`, `NewWebBoxOffice`, and `MobilePOS`.
- [ ] TC-3 on `LegacyWebBoxOffice`, `NewWebBoxOffice`, and `ElectronBoxOffice`.
- [ ] TC-5 on `LegacyWebBoxOffice`, `NewWebBoxOffice`, `ElectronBoxOffice`, and `MobilePOS`.
- [ ] TC-6 once on Web Box Office with Square and Transactions visible.
- [ ] TC-7 once with a real held basket.
- [ ] TC-8 once when exchanges are enabled for the affected venue.

Extended coverage:

- [ ] Repeat TC-1 with one ticket and one product in the same basket.
- [ ] Repeat TC-1 with the other Square account ownership when both client-owned and Showpass-owned Square accounts are supported.
- [ ] Run TC-2 and TC-3 in `LegacyWebPOSMode`.
- [ ] Run TC-7 in Electron when hold pickup is available there.

## Suggested Automated Coverage

- Keep the branch tests for successful payment, cancellation, failure, duplicate Square updates, late old updates, held baskets, and employee/venue access.
- Add a backend race test where cancellation and successful payment arrive together. Assert zero or one order based on Square's final result, never two.
- Add a browser test for legacy Web Box Office: start Terminal payment, confirm manual entry cannot start, cancel, then complete manual card payment.
- Add a browser test for current Web Box Office: cancel a Terminal request after the backend clears its status, then confirm the payment screen closes and a retry starts.
- Add a Mobile POS test: cancel, return to the basket, and start a fresh Terminal request.
- Add a Mobile POS failure test: select Retry and confirm it starts a new payment rather than only checking the cleared old payment.
- Add an exchange test proving credit and remaining balance are unchanged after cancellation.

## Assumptions and Unknowns

- `React Native Public / Mobile` is the available Qase platform label for the authenticated Mobile POS app. Confirm whether Qase should use a dedicated `POS` platform instead.
- The supplied branch exists only in `web-app`; `showpass-frontend` is on `develop` and has no matching branch changes.
- Current Web, Electron, and Mobile POS are included because they call the backend endpoints changed by this branch, not because their client code changed in the PR.
- Safe test tools are available to force Square failure, timeout, and the cancel/success race.
- Backend branch tests were reviewed but not run while rewriting this note.

## Open Questions

- Which of the five entry points are enabled for the clients affected by SPD-2404?
- Is current Web Box Office expected to close its payment screen when the backend returns a finished payment with no status name after cancellation?
- On Mobile POS, should Retry create a new Terminal request after a failed payment, or is the employee expected to leave the screen and submit checkout again?
- Must both client-owned and Showpass-owned Square accounts pass before release?
- Is canceling directly on the Square Terminal a supported client workflow on every platform, or only selected platforms?
- Are holds and exchanges part of the affected clients' normal Square Terminal sales and therefore release blockers?
