---
title: Intellitix Integration Test Cases
date: 2026-08-18
tags:
  - qa/test-cases
  - transactions
  - integration
aliases:
  - SPW-20234 Intellitix Test Cases
---

# Intellitix Integration Test Cases

> [!warning] Draft confidence and execution boundary
> Backend behavior is source-confirmed, but the checked-out frontend does not yet contain the SPW-20234 Intellitix action, mutation, confirmation dialog, or result handling. For the synchronous recovery endpoint, a `200` result proves that Showpass sent the server-side request and Intellitix returned a 2xx response. It does not independently prove provider persistence or absence of a duplicate. Automatic purchase, transfer, and invalid-ticket sync remain blocked without server-side evidence or a read-only provider result.

Related: [SPW-20234](https://showpass.atlassian.net/browse/SPW-20234) and [SPW-20293](https://showpass.atlassian.net/browse/SPW-20293)

## Glossary

- **Mapped ticket type:** A Showpass ticket type connected to a specific Intellitix access type and optional access dates.
- **Owner-side transaction:** A transaction owned by the venue currently selected in Dashboard, rather than a transaction the venue only resold for another venue.
- **Recovery sync:** A manual resend of the existing Showpass ticket order to Intellitix. It must not create another Showpass order or charge.
- **Cancellation update:** An Intellitix update sent when every mapped ticket in the current Showpass basket is no longer valid.
- **Provider evidence:** Optional read-only Intellitix evidence showing the transaction ID, ticket barcodes, access types, and current status. It is not available for the current manual run.

## Testing Intent

We are testing whether customers can purchase or transfer mapped tickets and authorized organizers can safely recover their Intellitix sync while the existing Showpass order, charge, ticket ownership, and downstream final state remain aligned; this matters because a missing, duplicated, or stale external order can prevent admission or create contradictory fulfillment, and we will prove it with Showpass transaction evidence plus provider evidence where available.

| Field | Answer |
| --- | --- |
| Criticality bucket | Fulfillment/access, async final state, money/order state, permission boundary |
| Business invariant | Each eligible Showpass basket maps to the correct Intellitix transaction state without a second Showpass order or charge; only authorized owner-side employees can start recovery. |
| User or business impact | Customers and attendees can lose valid admission; organizers and support can see missing, duplicate, or stale external orders. |
| Failure mode | Eligible purchases do not sync, invalid tickets remain valid downstream, retries duplicate an external order, or an unauthorized/wrong-venue user triggers a sync. |
| Observable proof | One Showpass charge, one Showpass transaction, expected ticket ownership/status, an accurate recovery result, and—where available—one matching Intellitix transaction with the expected barcodes and statuses. |
| Source of truth | Backend integration, tasks, permission/scoping, and tests; frontend Transactions routes and action-menu patterns; Jira intake for the proposed recovery UI. |
| Primary surfaces | Public checkout, Widget checkout, Web Box Office, venue Transactions, event Transactions, transfers, and the Intellitix downstream result. |
| In scope | Automatic purchase sync, transfer sync, invalid-ticket updates, mapping/filtering, venue isolation, manual recovery, permissions, result states, duplicate prevention, confirmation, translations, and focus return. |
| Out of scope | Creating Intellitix projects/access types, changing production mappings, historical backfills, provider-side configuration administration, and exhaustive payment-method permutations. |
| Confidence | Medium: backend behavior is clear; the recovery frontend and future feature-flag enablement are not present in the checked-out source, and provider-dashboard access is limited. |

## Jira Intake Summary

- SPW-20234 requests a self-service recovery action in venue and event Transactions for employees with **Administer Transactions** permission.
- The recovery must reuse the current order, explain that it does not create another order or charge, and warn that invalid/refunded ticket state can produce a cancellation update.
- Required outcomes are successful sync, cancellation update, unavailable/not configured, retry-later/failure, and already-in-progress conflict.
- The action is limited to owner-side invoices in the selected venue. It must not be available to Box Office-only, read-only/customer, reseller, or unrelated-venue contexts.
- The card was **Cannot Reproduce** when reviewed on 2026-08-18 and contains no comments clarifying that status.
- Linked SPW-20293 proposes replacing environment-specific venue allowlists with an admin-managed venue feature flag. It was **On Deck** when reviewed; current source still uses the allowlists.

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| PT-1: An eligible purchase produces one matching downstream order | Prevents missing admission and duplicate fulfillment | TC-1, TC-2, TC-3 |
| PT-2: Transfers and invalid tickets produce the correct final access state | Prevents the wrong barcode or owner from retaining admission | TC-4, TC-5, TC-6 |
| PT-3: Manual recovery is safe, scoped, and truthful | Prevents unauthorized or misleading retries | TC-7, TC-8, TC-9, TC-10, TC-11 |
| PT-4: Recovery remains usable across locale and keyboard interaction | Prevents inaccessible or ambiguous recovery | TC-12 |

## Declared Scope and Out-of-Scope Decisions

### In scope

- Automatic sync after a successful mapped ticket purchase.
- Mapped and unmapped tickets in the same basket.
- Customer, shipping, barcode, and assigned-seat/location details sent from Showpass.
- Completed transfer sync and recently invalidated ticket states.
- Venue-wide and event-specific Dashboard Transactions recovery entry points.
- Owner/reseller/venue/permission isolation.
- Recovery success, cancellation, ineligible, unavailable, conflict, and retry-later outcomes.
- Proof that recovery does not create a second Showpass order or charge.

### Out of scope

- Intellitix project, source, access-token, or access-type creation; these require provider/admin ownership.
- Production mapping edits and historical backfill scripts; these are potentially destructive and need a separately approved runbook.
- Broad payment coverage; the integration is triggered from the paid basket rather than a distinct payment UI. One public and one employee-assisted purchase are representative.
- Provider performance, admission-device behavior, and provider reporting beyond the received transaction state.

## Sources Reviewed

### Vault and intake

- [[00 Start Here/World-Class Software Quality Standard]]
- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]
- [[01 Repositories/QA Automation - showpass-playwright]]
- [SPW-20234](https://showpass.atlassian.net/browse/SPW-20234)
- [SPW-20293](https://showpass.atlassian.net/browse/SPW-20293)

### Backend

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/intellitix/client.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/intellitix/data_generator.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/intellitix/manager.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/intellitix/scheduler.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/locks.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/signal_handlers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/transfer_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/intellitix_constants.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/venue.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_venue_based_intellitix.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_intellitix.py`

### Frontend and automation patterns

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionActions/TransactionActions.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/SyncIntellitixModal/SyncIntellitixModal.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/invoice-rules.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/domain/invoice-rules.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionActions/TransactionActions.test.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/SyncIntellitixModal/SyncIntellitixModal.test.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionsPage/TransactionsPage.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ui/pages/EventTransactionsPage.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/shared/services/invoice/useVenueInvoiceService.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/configs/routes.ts`

No branch comparison or changed-file discovery was performed. Qase suite 1047 was read and the publication history is recorded below.

## Assumptions and Unknowns

- Frontend source confirms the visible label **Sync with Intellitix**, the action test ID, modal copy, Confirm and Cancel controls, busy state, notification behavior, and focus return.
- Manual proof is intentionally limited to Showpass UI state and the browser-visible Showpass API request/response. It does not claim Intellitix persistence.
- Current source enables venues through `INTELLITIX_ENABLED` plus production/test venue lists. SPW-20293 intends to replace those lists with a venue feature flag, so eligibility setup may change before execution.
- Backend recovery processes the first ticket basket related to the invoice. Expected behavior for invoices with multiple ticket baskets is not defined for organizers.
- Automatic provider failures retry twice after the initial task attempt; the organizer recovery endpoint is synchronous and returns a retry-later result without its own automatic retry.
- The scheduled invalid-ticket sweep only selects mapped tickets updated within the previous ten minutes and currently checks the production venue list.
- No provider sandbox/dashboard contract or read-only credential was available for this analysis. Provider-dependent expected results must be marked **Blocked** unless equivalent approved evidence is supplied.
- The organizer recovery request intentionally has no browser request body. The transaction ID is part of the URL, and the backend loads the invoice, first related ticket basket, current ticket states, mappings, and payment venue.
- The JSON sent to Intellitix is created and transmitted by the Showpass backend. It cannot be inspected in browser Network tools.
- No live browser execution or backend test run was performed. This note is source-backed test design, not execution evidence.

## Source-Backed Behavior

- A completed ticket-basket purchase schedules Intellitix sync. Completed transfers schedule the transfer basket through the same integration.
- Automatic sync is gated by the global setting, payment venue, and the environment-specific enabled-venue list in current source.
- The provider order ID is the existing Showpass transaction ID. Processing updates or cancels that provider transaction; it does not create a Showpass invoice or charge.
- Only ticket items with configured Intellitix mappings are included. One malformed or unmapped ticket does not stop other valid mapped tickets from being prepared.
- Paid mapped tickets are sent as approved. Other current ticket statuses are sent as denied.
- If every included mapped ticket is denied, the manager sends a canceled transaction. A mixed approved/denied basket is sent as an updated valid transaction.
- Provider data includes purchaser name, email, phone, purchase note, address, shipping method, ticket barcode, access type/date mapping, and assigned seat or general-admission location when present.
- Missing addresses use Will Call and blank address fields. Print or Delivery shipping types map to fulfillment; other supported types map to no provider shipping method.
- The invalid-ticket sweep includes refunded, voided, transferred, transfer-returned, and resold mapped tickets updated within the previous ten minutes.
- The recovery endpoint requires **Administer Transactions**, resolves the transaction through the selected venue, rejects non-owner invoices, and locks one invoice against overlapping recovery attempts.
- Recovery returns distinct success, cancellation, unavailable, ineligible, conflict, and retry-later responses. Provider/configuration exceptions do not become a false success response.
- Recovery is synchronous: Showpass returns `synced` or `canceled` only after the server-side Intellitix request returns a 2xx response.
- The frontend renders **Sync with Intellitix** only for an employee with **Administer Transactions** when the selected venue is Intellitix-enabled, owns the invoice, the invoice has a transaction ID, and its type is sale or ticket transfer.
- Selecting the action opens a confirmation modal. Confirm is disabled while the request is pending; Escape, overlay click, Cancel, and close are also blocked during submission. Success closes the modal, while an API error leaves it open and re-enables Confirm.

## Browser Network Evidence for Recovery

The following browser request is expected to have no Request Payload:

`POST /api/venue/<venue-id>/financials/invoices/<transaction-id>/sync-intellitix/`

The selected venue and transaction are already identified by the URL and authenticated venue session. Inspect **Response** or **Preview**, not **Payload**.

| HTTP status | Expected response | What it proves |
| --- | --- | --- |
| `200` | `result: synced` and `Invoice synced with Intellitix.` | Showpass generated an eligible update, sent it server-side, and received a 2xx provider response. |
| `200` | `result: canceled` and `Invoice cancellation synced with Intellitix.` | Showpass determined that all mapped tickets were denied, sent a cancellation server-side, and received a 2xx provider response. |
| `422` | `result: ineligible` with no basket or no mapped-ticket message | Showpass rejected the recovery before calling Intellitix. |
| `422` | `result: unavailable` | The global integration, payment venue, or current environment's venue eligibility prevented the call. |
| `409` | `This invoice is already being synced. Please try again shortly.` | The invoice-level lock rejected an overlapping recovery attempt. |
| `503` | `Intellitix sync failed. Please try again later.` | Showpass encountered provider/configuration failure and did not report success. |

The browser cannot show the server-to-server Intellitix JSON body. Source confirms that body contains the existing Showpass transaction ID, purchaser/contact/shipping details, and mapped ticket barcodes, access types, dates, and statuses.

## Product-Surface and Complex-Control Inventory

| Surface or control | Expected behavior | Coverage |
| --- | --- | --- |
| Venue Transactions action menu | Shows the action only for an eligible employee, venue, and invoice | TC-1, TC-3 |
| Event Transactions action menu | Uses the same shared transaction action rules | TC-1, TC-3 |
| Confirmation dialog | Shows the transaction ID and resend/no-new-charge/cancellation copy | TC-1, TC-2 |
| Cancel paths | Close without submitting and return focus | TC-2 |
| Successful sync | Submit one bodyless request, show the server message, and close | TC-1 |
| Error response | Show error detail, keep the modal open, and allow retry or cancel | TC-4 |
| Fully invalid order | Present the server-confirmed `canceled` result accurately | TC-5 |
| Pending submission | Disable repeat submission and block dismissal | TC-6 |
| Broader automatic and provider behavior | Retained only as supporting reference | Reference-1–Reference-12 |

## Entry-Point Coverage

| Entry Point | Actor Path | Starting State | Supported Surface |
| --- | --- | --- | --- |
| PublicCheckout | Public event → select mapped ticket → checkout | New customer basket | WebPublic |
| WidgetCheckout | Embedded event widget → select mapped ticket → checkout | New customer widget basket | Widget |
| WebBoxOfficeSale | Dashboard → Box Office → Sell | Employee-assisted basket | WebBoxOffice |
| CompletedTransfer | Customer My Orders → transfer ticket → recipient accepts | Existing paid mapped ticket | WebPublic |
| VenueTransactionsRecovery | Dashboard → Box Office → Transactions → transaction actions | Existing owner-side invoice | Dashboard |
| EventTransactionsRecovery | Dashboard → Events → select event → Transactions → transaction actions | Existing owner-side event invoice | Dashboard |

## Outcome Coverage

| Outcome | Expected Showpass behavior | Downstream proof | Coverage |
| --- | --- | --- | --- |
| Clean button success | One request, success notification, modal closes, Showpass record unchanged | `200 synced`; provider persistence blocked | TC-1 |
| User cancellation | No request or data change | No provider call initiated by the UI | TC-2 |
| Ineligible action | Action is absent | No request | TC-3 |
| Server failure | Error notification, modal remains recoverable | Non-2xx response; no success claim | TC-4 |
| All mapped tickets invalid | Cancellation success is presented accurately | `200 canceled`; provider persistence blocked | TC-5 |
| Rapid repeat input | Only one request while pending | One browser-visible POST | TC-6 |

## Risk Areas

- An incorrect visibility gate can expose the action to an unauthorized employee or hide it for an eligible transaction.
- Environment-specific venue allowlists can disagree with the proposed feature-flag model and with `is_intellitix_enabled` exposed by the venue serializer.
- A provider timeout may leave the caller uncertain whether Intellitix accepted the transaction; safe idempotent reuse of the Showpass transaction ID is essential.
- Recovery uses only the first ticket basket attached to an invoice.
- Unmapped or malformed ticket types are silently excluded from the provider payload in production, which can create partial downstream fulfillment.
- The invalid-ticket sweep has a ten-minute selection window; missed or delayed state changes may need explicit recovery.
- A mixed valid/invalid basket remains a valid provider transaction, so each barcode status—not only the order status—must be checked.
- Current automatic tasks and manual recovery do not share one source-backed venue eligibility helper yet.
- Limited provider access makes absence, duplication, and exact payload correctness impossible to prove from the Showpass UI alone.

## State-Space / Setup Matrix

| Axis | Representative values | Decision |
| --- | --- | --- |
| Button eligibility | EligibleSale, EligibleTicketTransfer, no permission, disabled venue, wrong owner, missing ID, unsupported type | TC-1, TC-3 |
| User decision | Confirm, Cancel, Escape, overlay click | TC-1, TC-2 |
| API result | Synced, Canceled, Ineligible, Conflict, Failure, Unavailable | TC-1, TC-4, TC-5 |
| Submission timing | Idle, pending, complete | TC-1, TC-6 |
| Evidence | UI notification, modal state, request count, response body, unchanged Showpass record | TC-1–TC-6 |

## Coverage Ledger

| Item | Type | Risk | Coverage | Evidence / Gap |
| --- | --- | --- | --- | --- |
| Eligible action and clean success | Manual recovery | Missing or misleading action | Covered: TC-1 | UI plus `200 synced`; persistence blocked |
| Cancel without request | Negative interaction | Accidental resend | Covered: TC-2 | Browser request log and unchanged record |
| Permission, venue, ownership, ID, and type gates | Permission/visibility | Unauthorized or unusable action | Covered: TC-3 | Frontend rules and UI visibility |
| Ineligible/unavailable/conflict/failure results | Error handling | False success or trapped modal | Covered: TC-4 | Controlled response required |
| Fully invalid order cancellation | Business edge | Stale downstream access | Covered: TC-5 | `200 canceled`; persistence blocked |
| Repeated submission while pending | Interaction/concurrency | Duplicate requests | Covered: TC-6 | Browser request count |
| Automatic purchase/transfer sync and exact provider payload | Broader integration | Incorrect downstream order | Reference only | Backend source; provider evidence blocked |
| Provider project/access creation | External administration | Misconfiguration/data damage | Not applicable | Separate provider/admin workflow |
| Historical backfill | Data migration | Duplicate or incorrect external orders | Deferred | Requires separately approved runbook and exact transaction scope |
| Production mapping edits | Configuration mutation | Broad fulfillment impact | Manual-only | Potentially destructive; do not execute in this plan |
| Mobile/Electron-specific presentation | Client presentation | UI inconsistency | Deferred | Automatic backend behavior is shared; no Intellitix-specific client UI exists to inspect |

## Recommended Test Data

- One disposable Intellitix-enabled test venue with valid project/source/token configuration and **Administer Transactions** permission for the organizer employee.
- One employee at the same venue with **Use Box Office** only and one read-only employee.
- One unrelated venue and one reseller relationship to the mapped event.
- One event with:
  - one mapped general-admission ticket type;
  - one mapped assigned-seat ticket type;
  - one mapped general-admission-location ticket type, if available;
  - one intentionally unmapped ticket type.
- A unique customer identity such as `intellitix-qa+<date-time>@showpass.com` and a unique purchase note for correlation.
- Supported Will Call, Print at Home, and Delivery configurations.
- One safe mapped order preserved for recovery, one fully invalid/refunded mapped order, and one mixed valid/invalid order.
- A way to force or simulate provider failure and a slow provider response in a controlled non-production environment.
- Read-only provider evidence keyed by Showpass transaction ID. If this cannot be supplied, execute Showpass-side steps but mark downstream assertions **Blocked**, not Passed.

> [!danger] Data safety
> Do not change production mappings, disable a production venue, refund/void a real customer order, or run a backfill for these cases. Create disposable non-production orders and preserve their transaction IDs as evidence.

## Qase-ready Manual Test Cases

### TC-1: Dashboard - Sync with Intellitix - Sync an eligible sale

**Description:** Base case for SPW-20234. Verifies that an authorized organizer can use the transaction action to submit exactly one sync request and receive the server-confirmed success result without creating or changing a Showpass order or charge.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The selected venue has Intellitix enabled.
* The employee has Administer Transactions permission.
* An owner-side sale invoice has a transaction ID and at least one mapped, valid ticket.
* Record the invoice's transaction ID, order count, charge count, amount, and current ticket states.
* Open browser Network tools and preserve the log.

**Postconditions:** The original Showpass invoice, charge, amount, and tickets remain unchanged. Provider persistence remains Blocked without approved Intellitix-side evidence.

**Tags:** dashboard, transactions, tickets

**Parameters:**

StartingPage: Box Office Transactions, Event Transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Dashboard, select the owning venue and open the selected StartingPage. | Owning venue, StartingPage | The Box Office Transactions page or the selected event's Transactions page opens. |
| Locate the eligible sale and open its actions menu. | Transaction ID | **Sync with Intellitix** is visible and enabled. |
| Select **Sync with Intellitix**. | Action menu | A modal titled **Sync with Intellitix** shows the correct transaction ID, explains that existing details will be resent, states that no new Showpass order or charge will be created, and warns about invalid or refunded tickets. |
| Select **Confirm** once. | Confirm button | Confirm enters a loading/disabled state and one `POST .../sync-intellitix/` request starts. |
| Inspect the request and response in Network tools. | Sync request | The request has no browser payload. The response is `200` with `result: synced` and the success message. |
| Observe the completed UI state. | Server response | A success notification displays the server message and the modal closes. |
| Reload and reopen the transaction. | Transaction ID | The same Showpass invoice, charge, amount, and ticket states remain; no second Showpass order or charge exists. |

### TC-2: Dashboard - Sync with Intellitix - Cancel without submitting

**Description:** Negative case verifying that an organizer can inspect and dismiss the confirmation without sending a sync request or changing transaction data.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** Use the eligible owner-side sale and authorized employee from TC-1. Open browser Network tools and preserve the log.

**Postconditions:** No sync request is submitted and no Showpass data changes.

**Tags:** dashboard, transactions, negative

**Parameters:**

CancelMethod: CancelButton, EscapeKey, OverlayClick

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the eligible transaction's actions menu and select **Sync with Intellitix**. | Transaction ID | The confirmation modal opens for the correct transaction. |
| Dismiss the modal using the selected CancelMethod. | CancelMethod | The modal closes without showing a success or error notification. |
| Inspect Network tools for the transaction. | Sync endpoint | No `sync-intellitix` request was submitted. |
| Check keyboard focus. | Transaction actions trigger | Focus returns to the transaction actions control. |
| Reload and reopen the transaction. | Transaction ID | The invoice, charge, amount, and tickets are unchanged. |

### TC-3: Dashboard - Sync with Intellitix - Enforce action eligibility

**Description:** Negative visibility case verifying that the action cannot be reached outside its source-backed permission, venue, ownership, transaction-ID, and invoice-type gates. It also verifies the supported ticket-transfer edge.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** Prepare transactions and employee accounts for each EligibilityContext. Do not alter production transactions to create a negative fixture.

**Postconditions:** No sync request is submitted and no transaction data changes.

**Tags:** dashboard, transactions, employee-permissions

**Parameters:**

EligibilityContext: EligibleSale, EligibleTicketTransfer, MissingAdministerTransactionsPermission, IntellitixDisabledVenue, DifferentOwningVenue, MissingTransactionId, UnsupportedInvoiceType

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in with the account for the selected EligibilityContext and select its assigned venue. | EligibilityContext | Dashboard exposes only the transactions and controls allowed for the account and venue. |
| Open Box Office → Transactions and locate the prepared transaction when it is available to the account. | Fixture transaction | The intended transaction row is shown only within its permitted venue scope. |
| Open the transaction actions menu. | Fixture transaction | **Sync with Intellitix** is visible and enabled for EligibleSale and EligibleTicketTransfer. It is absent for every negative EligibilityContext. |
| For each negative context, monitor Network tools while opening and closing the menu. | Sync endpoint | No `sync-intellitix` request is submitted. |

### TC-4: Dashboard - Sync with Intellitix - Keep the modal recoverable after failure

**Description:** Negative submission case verifying that an ineligible, unavailable, conflicting, or failed server response is not presented as success and that the organizer can retry or cancel.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Use an approved fixture or response-control mechanism for the selected FailureOutcome.
* The action is visible for the employee and transaction.
* Record the starting Showpass order, charge, and ticket state.

**Postconditions:** The original Showpass transaction remains unchanged. Restore any temporary response-control configuration owned by this run.

**Tags:** dashboard, transactions, negative

**Parameters:**

FailureOutcome: Ineligible422, Conflict409, ProviderFailure502, IntellitixUnavailable503

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Sync with Intellitix** for the prepared transaction and select **Confirm** once. | FailureOutcome fixture | Confirm is disabled while one sync request is pending. |
| Inspect the final response and notification. | Sync request | The expected non-2xx response occurs and its detail is shown as an error; no success notification appears. |
| Observe the modal after the failure. | Failed response | The modal remains open and Confirm becomes enabled again. |
| Select **Cancel**. | Cancel button | The modal closes and focus returns to the transaction actions control. |
| Reload and reopen the transaction. | Transaction ID | The original invoice, charge, amount, and ticket states remain unchanged. |

### TC-5: Dashboard - Sync with Intellitix - Report cancellation for a fully invalid order

**Description:** Realistic edge case for a previously valid order whose mapped tickets are now all invalid or refunded. Verifies that the button reports the server-confirmed cancellation result without changing Showpass records.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The selected venue and employee satisfy the action eligibility rules.
* An owner-side sale has mapped tickets that are all currently invalid or refunded.
* Record the invoice, charge, amount, and ticket states; open browser Network tools.

**Postconditions:** Showpass ticket states remain unchanged. Provider cancellation persistence remains Blocked without Intellitix-side evidence.

**Tags:** dashboard, transactions, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Locate the fully invalid transaction and open its actions menu. | Transaction ID | **Sync with Intellitix** is visible and enabled. |
| Select **Sync with Intellitix**, review the warning, and select **Confirm** once. | Confirm button | One bodyless `POST .../sync-intellitix/` request starts. |
| Inspect the response. | Sync request | The response is `200` with `result: canceled` and the cancellation success message. |
| Observe the completed UI state. | Server response | The cancellation message appears as a success notification and the modal closes. |
| Reload and reopen the transaction. | Transaction ID | The original Showpass invoice, charge, amount, and invalid ticket states remain unchanged. |

### TC-6: Dashboard - Sync with Intellitix - Prevent repeated submission while pending

**Description:** Realistic interaction edge verifying that rapid repeat input cannot submit the same button action more than once while its first request is pending.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** Use an eligible owner-side transaction. Apply only an approved slow-response fixture if the normal response is too fast to observe. Open browser Network tools and preserve the log.

**Postconditions:** Remove any temporary slow-response condition owned by this run. The Showpass transaction remains unchanged.

**Tags:** dashboard, transactions, edge-case

**Parameters:**

RepeatInput: RapidClicks, RepeatedEnter

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Sync with Intellitix** and activate **Confirm** repeatedly using the selected RepeatInput. | RepeatInput | Confirm immediately enters a loading/disabled state. |
| While the request is pending, attempt to dismiss the modal with Escape, overlay click, and the modal controls. | Pending request | The modal cannot be dismissed while submission is pending. |
| Inspect Network tools before the response completes. | Sync endpoint | Exactly one `POST .../sync-intellitix/` request was submitted. |
| Allow the request to finish. | Controlled response | One accurate success or error notification appears and the UI reaches the corresponding final state. |
| Reload and reopen the transaction. | Transaction ID | The original Showpass invoice and charge remain unchanged. |

### TC-7: Dashboard - Sync with Intellitix - Support keyboard and translated confirmation

**Description:** Supporting button case verifying that the transaction action and confirmation remain understandable and operable with keyboard navigation in the supported Dashboard locales.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** Use the eligible transaction and authorized employee from TC-1. Dashboard can be opened in the selected Locale.

**Postconditions:** No sync request is submitted and no Showpass data changes.

**Tags:** dashboard, transactions, accessibility

**Parameters:**

Locale: English, French

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard in the selected Locale and navigate to Box Office → Transactions. | Locale | The Transactions page is shown in the selected language. |
| Use the keyboard to open the eligible transaction's actions menu and select **Sync with Intellitix**. | Transaction ID | The action is keyboard-operable and the modal opens with focus inside it. |
| Read the modal title, transaction ID, explanatory text, warning, and buttons. | Locale | All visible content is understandable and presented in the selected language without clipped or untranslated source keys. |
| Use the keyboard to select **Cancel**. | Cancel button | The modal closes without submitting a request. |
| Check focus and Network tools. | Transaction actions trigger | Focus returns to the actions control and no `sync-intellitix` request exists. |

## Broader Intellitix Reference Scenarios (Not Qase Scope)

### Reference-1: Core - Intellitix - Verify a mapped ticket purchase syncs once

**Description:** Validates that a successful mapped ticket purchase creates one Showpass order and one matching valid Intellitix transaction. This protects against missing or duplicate downstream admission records.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| Widget | Mobile |
| WebBoxOffice | Desktop |

**Preconditions:**

* The selected venue is enabled and fully configured for Intellitix in the current environment.
* The event has one on-sale mapped general-admission ticket type.
* The customer identity and purchase note are unique to this run.
* Read-only provider evidence is available; otherwise mark the provider steps Blocked.

**Postconditions:**

* One Showpass charge, one Showpass transaction, and the purchased ticket remain as evidence.
* One matching Intellitix transaction remains available for review.

**Tags:** checkout, transactions, tickets

**Parameters:**

EntryPoint: PublicCheckout, WidgetCheckout, WebBoxOfficeSale

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the mapped event through the selected EntryPoint and select one mapped ticket. | Mapped general-admission ticket | The basket shows one selected ticket and its checkout total. |
| Complete checkout with the unique customer details and purchase note. | Run-specific customer and purchase note | Checkout succeeds and shows one Showpass transaction ID. |
| Open Dashboard → Box Office → Transactions for the payment venue and search for the transaction ID. | Showpass transaction ID | One transaction appears with the expected customer, amount, and ticket. |
| Compare the charge, transaction, order, and issued ticket. | Completed purchase | Exactly one charge, one transaction, one order, and one ticket exist in Showpass. |
| Open the approved provider evidence for the same transaction ID. | Showpass transaction ID | Exactly one valid Intellitix transaction contains the purchased ticket barcode and mapped access type. |
| Preserve the transaction ID and provider evidence for review. | Evidence location | No additional data is changed. |

### Reference-2: Core - Intellitix - Verify attendee, delivery, and seating details

**Description:** Validates that Showpass sends the current purchaser, delivery, barcode, and seating details for mapped tickets. This protects against an external order that exists but cannot be used for the correct attendee or access location.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:**

* The venue and selected ticket type are mapped and enabled for Intellitix.
* The selected TicketDetail fixture supports the selected DeliveryMethod.
* Read-only provider evidence is available; otherwise mark the provider comparison Blocked.

**Postconditions:** One disposable Showpass order and its provider evidence remain for review.

**Tags:** checkout, tickets, transactions

**Parameters:**

TicketDetail: GeneralAdmission, AssignedSeat, GeneralAdmissionLocation

DeliveryMethod: WillCall, PrintAtHome, Delivery

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the mapped event and select the configured TicketDetail. | Selected test fixture | The chosen ticket or seat/location is shown in the basket. |
| Continue to checkout and select the configured DeliveryMethod. | Selected delivery fixture | The checkout shows the selected delivery choice. |
| Complete the purchase with a unique name, email, phone, address when requested, and purchase note. | Run-specific customer data | One Showpass order completes with the entered details. |
| Open the transaction in Dashboard → Box Office → Transactions. | Showpass transaction ID | The transaction shows the expected customer, delivery, and selected ticket or seat/location. |
| Open the matching provider evidence. | Showpass transaction ID | The purchaser, contact, shipping method, barcode, access mapping, and applicable seat/location match the Showpass order. |
| Preserve the order and evidence for review. | Evidence location | No additional data is changed. |

### Reference-3: Core - Intellitix - Verify unmapped tickets do not block mapped tickets

**Description:** Validates a mixed basket containing mapped and unmapped ticket types. This protects against losing the whole provider order or incorrectly sending an unmapped ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:**

* One event can sell one mapped ticket type and one intentionally unmapped ticket type in the same order.
* The venue is enabled and configured for Intellitix.
* Read-only provider evidence is available; otherwise mark the provider comparison Blocked.

**Postconditions:** One Showpass mixed order and its provider evidence remain for review.

**Tags:** checkout, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event and add one mapped ticket and one unmapped ticket to the basket. | Mixed ticket fixture | The basket contains both selected tickets. |
| Complete checkout with unique customer details. | Run-specific customer | One Showpass order completes for both tickets. |
| Open the transaction in Dashboard → Box Office → Transactions. | Showpass transaction ID | The transaction contains both purchased tickets and one charge. |
| Open the matching provider evidence. | Showpass transaction ID | One provider transaction exists and contains only the mapped ticket barcode. |
| Compare both Showpass tickets after the sync. | Mixed order | Both Showpass tickets remain issued and unchanged. |
| Preserve the order and evidence for review. | Evidence location | No additional data is changed. |

### Reference-4: Core - Intellitix - Verify a completed transfer updates attendee access

**Description:** Validates the automatic sync after a mapped ticket transfer. This protects against the sender retaining usable downstream access or the recipient receiving a Showpass ticket without matching external access.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* A customer owns one valid mapped ticket at an Intellitix-enabled venue.
* A second disposable customer can accept the transfer.
* Browser Network tools are available to capture the Showpass recovery response.

**Postconditions:** The completed transfer and both related transaction IDs remain as evidence.

**Tags:** transfers, tickets, post-purchase

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders as the current ticket owner and start a transfer for the mapped ticket. | Recipient email | Showpass sends or displays the transfer claim path for the recipient. |
| Accept the transfer as the recipient. | Recipient account | The recipient receives a valid Showpass ticket and the sender's original ticket is no longer usable. |
| Open the related transactions in Dashboard → Box Office → Transactions. | Original and transfer transaction IDs | The original and transfer records identify the expected sender, recipient, and ticket state. |
| Open the provider evidence for the related transaction IDs. | Original and transfer transaction IDs | The recipient's current barcode is approved and the sender's replaced barcode is not valid. |
| Compare Showpass charges and orders before and after transfer. | Related orders | The transfer creates no additional customer charge. |
| Preserve both transaction IDs and provider evidence. | Evidence location | No additional data is changed. |

### Reference-5: Core - Intellitix - Verify an invalid ticket updates without canceling valid tickets

**Description:** Validates the scheduled update when one mapped ticket becomes invalid while another remains valid. This protects against canceling an entire external order or leaving an invalid barcode approved.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* One Intellitix-enabled Showpass order contains at least two mapped tickets.
* The selected StateChange can be performed safely on only one ticket.
* The invalid-ticket update is completed within the integration's active processing window.
* Read-only provider evidence is available; otherwise mark downstream assertions Blocked.

**Postconditions:** The changed Showpass ticket remains in its intended final state; do not reverse it unless the fixture runbook requires restoration.

**Tags:** tickets, post-purchase, transactions

**Parameters:**

StateChange: Refund, Void, Transfer, TransferReturn, Resale

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Box Office → Transactions and locate the two-ticket mapped order. | Showpass transaction ID | Both mapped tickets are visible and valid before the state change. |
| Complete the selected StateChange for only one ticket through its supported Showpass workflow. | One selected ticket | The selected ticket reaches the expected invalid/replaced state while the other ticket remains valid. |
| Wait for the documented non-production integration processing interval. | Current run start time | Showpass keeps the intended ticket states without creating another charge. |
| Open the matching provider evidence. | Showpass transaction ID | The changed barcode is denied while the unchanged barcode remains approved in a valid transaction. |
| Record the final Showpass and provider states. | Evidence location | The evidence identifies which barcode changed and which remained valid. |

### Reference-6: Dashboard - Intellitix - Verify all invalid mapped tickets cancel the external order

**Description:** Validates that an order with no currently valid mapped tickets sends a cancellation update. This protects against refunded, voided, transferred, returned, or resold tickets remaining valid downstream.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* A disposable Intellitix-enabled order contains only mapped tickets.
* The selected StateChange can safely invalidate every ticket in the order.
* Read-only provider evidence is available; otherwise mark downstream assertions Blocked.

**Postconditions:** All Showpass tickets remain in their intended invalid/replaced state and the provider transaction remains canceled.

**Tags:** tickets, post-purchase, transactions

**Parameters:**

StateChange: Refund, Void, Transfer, TransferReturn, Resale

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Box Office → Transactions and locate the disposable mapped order. | Showpass transaction ID | Every ticket in the order is valid before the state change. |
| Complete the selected StateChange for every mapped ticket through its supported Showpass workflow. | All mapped tickets | No mapped ticket in the original order remains valid in Showpass. |
| Wait for the documented non-production integration processing interval. | Current run start time | Showpass retains the intended final state without a new charge. |
| Open the matching provider evidence. | Showpass transaction ID | The existing provider transaction is canceled and its ticket barcodes are denied. |
| Preserve the final state and evidence. | Evidence location | No additional data is changed. |

### Reference-7: Dashboard - Intellitix - Verify an owner can recover a valid order

**Description:** Validates the organizer recovery success path from venue-wide and event-specific Transactions. This protects against a missing downstream order while ensuring the resend does not create another Showpass order or charge.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer employee has Administer Transactions permission for the selected Intellitix-enabled venue.
* A safe owner-side mapped order needs recovery and all mapped tickets are currently valid.
* Browser Network tools are available to capture the Showpass recovery response.

**Postconditions:** The same Showpass transaction remains; provider persistence and duplicate-provider proof stay Blocked without Intellitix access.

**Tags:** dashboard, transactions, tickets

**Parameters:**

RecoveryEntryPoint: VenueTransactions, EventTransactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected RecoveryEntryPoint for the order's owning venue and locate the transaction. | Showpass transaction ID | One owner-side transaction appears with its current amount and tickets. |
| Open the transaction actions menu. | Target transaction | A **Sync with Intellitix** recovery action is available. |
| Select **Sync with Intellitix**. | Target transaction | A confirmation explains that current order details will be resent, no new Showpass order or charge will be created, and invalid/refunded tickets can cause a cancellation update. |
| Confirm the recovery once. | Confirmation action | The action remains busy or disabled until the attempt reaches a final result. |
| Read the completed result. | Valid mapped order | The result states that the invoice synced with Intellitix; a task acknowledgement alone is not presented as final success. |
| Open the recovery request in browser Network tools and inspect Response or Preview. | `sync-intellitix` request | The request has no body and the response is `200` with `result: synced`. |
| Reload the Transactions page and reopen the transaction. | Showpass transaction ID | The original transaction, amount, customer, and tickets remain unchanged. |
| Compare Showpass records with the recorded starting state. | Showpass transaction ID | Exactly one Showpass charge and one Showpass order exist; provider persistence remains Blocked. |
| Preserve the transaction ID and Network response for review. | Evidence location | No additional data is changed. |

### Reference-8: Dashboard - Intellitix - Verify recovery sends a cancellation for an invalid order

**Description:** Validates organizer recovery when every mapped ticket is currently invalid. This protects against a successful-looking resend that leaves refunded or otherwise invalid admission active downstream.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer employee has Administer Transactions permission for the owning venue.
* A safe mapped order has no currently valid mapped tickets.
* Browser Network tools are available to capture the Showpass recovery response.

**Postconditions:** The Showpass ticket states remain unchanged; persisted provider cancellation stays Blocked without Intellitix access.

**Tags:** dashboard, transactions, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Box Office → Transactions and locate the fully invalid mapped order. | Showpass transaction ID | The transaction shows that its tickets are refunded, voided, replaced, or otherwise no longer valid. |
| Open the transaction actions menu and select **Sync with Intellitix**. | Target transaction | The confirmation warns that the current ticket state can produce a cancellation update. |
| Confirm the recovery once. | Confirmation action | One recovery attempt starts. |
| Read the completed result. | Fully invalid order | The result states that the invoice cancellation synced with Intellitix. |
| Open the recovery request in browser Network tools and inspect Response or Preview. | `sync-intellitix` request | The request has no body and the response is `200` with `result: canceled`. |
| Reload and reopen the Showpass transaction. | Showpass transaction ID | The original order and invalid ticket states remain unchanged and no new charge exists. |
| Record the provider verification gap. | Showpass transaction ID | Provider persistence and duplicate-provider proof are marked Blocked. |
| Preserve the transaction ID and Network response for review. | Evidence location | No additional data is changed. |

### Reference-9: Dashboard - Intellitix - Verify unavailable, ineligible, and failed recovery results

**Description:** Validates that recovery reports non-success outcomes accurately and leaves the Showpass order unchanged. This protects against false success when configuration, mapping, or the provider prevents completion.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer employee has Administer Transactions permission.
* A controlled non-production fixture exists for the selected RecoveryOutcome.
* Provider failure simulation is approved and isolated from real customer orders.

**Postconditions:** No fixture has a new Showpass order or charge; restore only temporary configuration owned by this run.

**Tags:** dashboard, transactions, edge-case

**Parameters:**

RecoveryOutcome: NoMappedTickets, IntellitixUnavailable, ProviderFailure

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Box Office → Transactions for the fixture venue and locate the selected RecoveryOutcome transaction. | Fixture transaction ID | One target transaction is visible. |
| Open the transaction actions menu. | Target transaction | The recovery action follows the intended eligibility presentation for the controlled fixture. |
| Select **Sync with Intellitix** and confirm once when the action is available. | Target transaction | One recovery attempt starts; no new checkout or payment flow opens. |
| Read the final result. | Selected RecoveryOutcome | NoMappedTickets states that no tickets are configured; IntellitixUnavailable states that Intellitix is unavailable; ProviderFailure asks the organizer to try again later. |
| Reload and reopen the transaction. | Fixture transaction ID | The original order, amount, and ticket state remain unchanged. |
| Compare Showpass order and charge counts with the recorded starting state. | Starting counts | No additional Showpass order or charge exists. |
| Restore temporary failure or availability configuration owned by the run. | Fixture runbook | The controlled environment returns to its recorded starting configuration. |

### Reference-10: Dashboard - Intellitix - Verify recovery permission and venue scope

**Description:** Validates that only an authorized employee can recover an owner-side transaction in the selected venue. This protects against reseller, Box Office-only, read-only, customer, or cross-venue mutation.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Owner-side, reseller, and unrelated-venue mapped transactions exist.
* Employee accounts exist for each AccessContext.
* Record all transaction IDs before execution.

**Postconditions:** No ineligible account or context changes a Showpass or provider transaction.

**Tags:** dashboard, transactions, employee-permissions

**Parameters:**

AccessContext: OwnerAdmin, BoxOfficeOnly, ReadOnly, Reseller, WrongVenue

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in with the account for the selected AccessContext and select its assigned venue. | AccessContext account | Dashboard exposes only the areas permitted to that account. |
| Open Dashboard → Box Office → Transactions or the supported event Transactions page. | Relevant fixture | Only transactions visible to the selected venue and role appear. |
| Locate or attempt to locate the target transaction. | Target transaction ID | OwnerAdmin can see its owner-side transaction; reseller and wrong-venue contexts cannot use their row to reach owner recovery. |
| Open the transaction actions menu when the row is available. | Target transaction | Only OwnerAdmin sees **Sync with Intellitix**; BoxOfficeOnly and ReadOnly do not. |
| Invoke the action only for OwnerAdmin and cancel at confirmation. | Owner-side transaction | Confirmation opens for OwnerAdmin and no sync is submitted after cancellation. |
| Compare the recorded transactions after the access checks. | Recorded transaction IDs | No transaction, ticket, charge, or provider state changed. |

### Reference-11: Dashboard - Intellitix - Verify overlapping recovery attempts do not duplicate an order

**Description:** Validates invoice-level duplicate prevention during a slow recovery. This protects against repeated clicks or concurrent sessions creating overlapping downstream updates or duplicate external orders.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer employee has Administer Transactions permission.
* A safe valid mapped order and an approved slow-response provider fixture are available.
* Two organizer sessions can open the same transaction.
* Read-only provider evidence is available; otherwise mark duplicate-provider proof Blocked.

**Postconditions:** One Showpass order and at most one matching provider transaction remain.

**Tags:** dashboard, transactions, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the same owner-side transaction in two organizer sessions. | Showpass transaction ID | Both sessions show the same original transaction. |
| In the first session, open **Sync with Intellitix** and confirm once. | First session | The first attempt enters a busy state. |
| Before the first attempt finishes, confirm recovery for the same transaction in the second session. | Second session | The second attempt is rejected as already syncing and asks the organizer to try again shortly. |
| Wait for the first session to reach a final result. | First session | One accurate success or cancellation result appears. |
| Reload the transaction in both sessions. | Showpass transaction ID | Both sessions show the same unchanged Showpass order, charge, amount, and tickets. |
| Open the provider evidence for the transaction ID. | Showpass transaction ID | No duplicate provider transaction exists. |
| Remove the temporary slow-response condition owned by this run. | Fixture runbook | The controlled environment returns to its starting state. |

### Reference-12: Dashboard - Intellitix - Verify confirmation cancellation, translation, and keyboard focus

**Description:** Validates the recovery confirmation as a cancelable, translated, keyboard-operable interaction. This protects against accidental recovery, ambiguous warnings, and lost keyboard focus.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer employee has Administer Transactions permission.
* One eligible owner-side mapped transaction is available.
* Dashboard can be opened in English and French.

**Postconditions:** No recovery is submitted and no Showpass or provider data changes.

**Tags:** dashboard, transactions, edge-case

**Parameters:**

Locale: English, French

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard in the selected Locale and navigate to Box Office → Transactions. | Locale | The Transactions page is shown in the selected language. |
| Use the keyboard to focus and open the target transaction's actions menu. | Eligible transaction | The menu opens and focus moves into it. |
| Use the keyboard to select **Sync with Intellitix**. | Recovery action | The confirmation opens with focus inside the dialog. |
| Read the confirmation text. | Selected Locale | The text explains resend, no new Showpass order or charge, and the possible cancellation update in the selected language. |
| Cancel the confirmation with the visible cancel control. | Cancel | The dialog closes and no recovery result appears. |
| Check keyboard focus after the dialog closes. | Transaction actions control | Focus returns to the transaction actions control. |
| Reload and reopen the transaction. | Showpass transaction ID | The Showpass order, charge, and ticket state are unchanged; no recovery request was submitted. |

## Qase Publication

Corrected and verified on 2026-08-18 in [SPT suite 1047 — Transactions - Intellitix](https://app.qase.io/project/SPT?suite=1047). Qase read-back confirmed the seven button-focused cases below. The five off-scope cases SPT-5050–SPT-5054 were deleted with explicit approval; Qase reports seven cases in the suite.

| Local label | Qase case |
| --- | --- |
| TC-1 | SPT-5055 |
| TC-2 | SPT-5056 |
| TC-3 | SPT-5057 |
| TC-4 | SPT-5058 |
| TC-5 | SPT-5059 |
| TC-6 | SPT-5060 |
| TC-7 | SPT-5049 |

## Minimum Execution Set

Execute in this order:

- **TC-1:** base eligible-sale success.
- **TC-2 / CancelButton:** highest-signal no-submit negative.
- **TC-3 / MissingAdministerTransactionsPermission, IntellitixDisabledVenue:** highest-risk visibility negatives.
- **TC-4:** one controlled failure response when a safe fixture exists.
- **TC-5:** fully invalid/refunded order cancellation edge.
- **TC-6:** rapid repeated input.

No Intellitix dashboard is required for this set. Mark provider persistence and exact server-to-provider payload fields **Blocked**; do not infer them from a Showpass `200` response.

## Suggested Automated Coverage

- Backend API tests already cover recovery success/cancellation, current allowlist eligibility, missing basket, no mapped tickets, provider/configuration failure, permission, owner scope, and lock conflict. Preserve these as the primary contract suite.
- Preserve the existing frontend tests for action visibility, modal opening, confirmation copy, pending state, synced/canceled notifications, error recovery, and focus return.
- Add a browser test around `transaction-actions-sync-intellitix` that intercepts the endpoint and proves cancel sends no request, confirm sends one bodyless POST, repeat input sends one POST, success closes, and failure remains recoverable.
- Add an integration test that submits two overlapping recovery requests and asserts one provider call plus one conflict response.
- Add an automatic purchase contract test that proves the paid basket schedules sync once after commit and that a provider exception follows the configured retry count.
- Add transfer contract coverage proving the transfer basket schedules sync only after commit.
- Add invalid-ticket sweep boundary tests for just inside and just outside the ten-minute window, all invalid status families, mixed valid/invalid baskets, and non-production venue eligibility.
- Keep provider end-to-end automation opt-in and keyed to a disposable mapped venue. Assert by Showpass transaction ID and clean only records created by the run.
- Reuse `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts` for Transactions navigation and filtering; add Intellitix selectors only after stable visible labels exist.

## Open Questions

- Which beta venue and disposable transactions provide the EligibleSale, EligibleTicketTransfer, and fully invalid fixtures?
- Can QA safely control one non-2xx response and one delayed response without changing shared venue configuration?
- Should the recovery action be hidden for unavailable/no-mapped invoices, or shown so the organizer can receive an explicit ineligible/unavailable result?
- What is the expected organizer behavior for an invoice with multiple related ticket baskets when backend recovery processes only the first?
- Can engineering provide a sanitized server-side capture, application log correlation, or temporary read-only lookup for provider persistence checks when the Intellitix dashboard is unavailable?
- What non-production fixture can safely produce provider timeout/failure and a slow response for overlap testing?
- Does a provider `settransaction` call guarantee idempotency by Showpass transaction ID, and what evidence proves no duplicate provider order after an ambiguous timeout?
- Should the invalid-ticket sweep use the non-production eligibility source in beta/local before SPW-20293 replaces the current production-only list check?
