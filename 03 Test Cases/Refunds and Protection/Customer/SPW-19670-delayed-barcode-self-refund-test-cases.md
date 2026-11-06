---
title: Delayed Barcode Customer Self-Refund Test Cases
jira: SPW-19670
status: published-source-reviewed-not-executed
date: 2026-11-05
tags:
  - qa/test-cases
  - refunds
---

# Delayed Barcode Customer Self-Refund Test Cases

**Published and verified in Qase on 2026-11-05; not executed.** The old release-setup blocker is resolved in these instructions. Use one ordinary ticket per order. Separate cases distinguish a hidden barcode, a released barcode blocked by the Venue setting, and a completed return after release.

| Local case | What it proves | Qase status |
| --- | --- | --- |
| TC-1 | Released delayed barcode + Allow delayed barcode automated returns off → Return order hidden | [SPT-5894](https://app.qase.io/case/SPT-5894), Customer 1108; 6 steps |
| TC-2 | Released delayed barcode + delayed returns on → one Organizer Credit return, even with the general barcode-refund switch off | [SPT-5895](https://app.qase.io/case/SPT-5895), Customer 1108; 12 steps |
| TC-3 | Barcode still hidden → refund preview available with the delayed-return setting either off or on | [SPT-5896](https://app.qase.io/case/SPT-5896), Customer 1108; 8 steps; Single DelayedReturns: Off, On |

## Qase-ready Manual Test Cases

### TC-1: My Orders - Refunds - Hide Return order after delayed barcode release when delayed barcode returns are off

**Description:** The customer can already see the barcode for one ticket bought with delayed barcode delivery. **Allow delayed barcode automated returns = off** blocks that ticket from being returned. The Organization policy and ticket refund switches are on. **Allow customer refunds after barcode delivery = on** remains on, so this case specifically proves that it cannot override the separate delayed-barcode setting.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

The Event starts approximately 48 hours from purchase. **Barcode delivery delay = 72** means release is allowed 72 hours before the Event. Because the purchase happens inside that period, the barcode is available immediately. No scheduled job or wait for the Event is needed.

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events** and **Manage Transactions**. An administrator can edit Venue and Ticket type records and feature flags. Record the original settings before changes.
* In **Admin → Venues → Venues → the selected Organization's Venue**, save **Customer Self Refund Settings = on**, **Allow delayed barcode automated returns = off**, and **Automated return window = 24** hours. These are saved Venue settings. The Event must still be more than 24 hours away throughout the run.
* Enable the **Venue-scoped feature flag enable_venue_policy_customer_self_refunds** for that Venue.
* In **Admin → Venues → Venue customer refund policies**, search for the Venue; reuse its policy or select **Add → Venue → select the Venue → Save**.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Allow customer refunds for tickets = on**, **Cutoff type = No cutoff**, **Orders with mixed eligibility = Refund eligible items independently**, and **Allow customer refunds after barcode delivery = on**. Save both **Allow customer refunds after fulfillment or shipping** and **Allow customer refunds after check-in or scan** off.
* On that same page, save **Automated return medium = Organizer Credit** and **Automated return refund type = Base refund**.
* In **Dashboard → Build → Events → All events**, create or select an event without other customers' sales. Set its start to approximately **48 hours from now**, record the date/time and timezone, publish it and open sales. In **Edit → Tickets**, create one public General Admission ticket priced **10.00**, **Inventory = 10**, with **Basic info → Allow customer-initiated refunds = on**.
* Before purchasing, open **Admin → Tickets → Ticket types**, find that ticket by its Event and name, and save **Barcode delivery = Delayed Activation** and **Barcode delivery delay = 72** hours. Setting these on the ticket type makes the Event/Venue fallback irrelevant for this purchase. Reopen and verify them.
* As the customer who will use My Orders, purchase **one** of that ticket with an approved refundable card payment and electronic delivery. The order contains no package, product, shipping, discount, existing credit, gift card, protection or payment plan. Record the receipt and transaction. Keep the ticket paid, unscanned, unfulfilled, untransferred and off resale.
* Record the customer's **Account → Credits → Organizer Credits** balance for this Organization before checking the order.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the purchasing customer, open Account → My Orders and open the recorded order. | Recorded transaction and ticket name | The order contains the one paid admission ticket. |
| Open the ticket. | The purchased delayed-delivery ticket | Its barcode is visible. A hidden barcode means the required starting state was not prepared. |
| Inspect the order's available actions. | Allow delayed barcode automated returns = off | Return order is hidden. |
| Reload the order. | Same transaction | The ticket remains paid and Return order remains hidden. |
| Open Account → Credits → Organizer Credits. | Recorded starting balance for this Organization | The balance is unchanged. |
| As the employee, open Dashboard → Transactions and find the recorded purchase. | Recorded transaction | No customer return is linked to the sale and the ticket is not marked returned. |

**Postconditions:**

* Restore the Venue, feature flag, Organization policy and ticket settings changed for this case, then save and reopen them. Keep the purchased records and receipt; do not delete financial history.
* Do not use a displayed barcode number as evidence in shared notes. Record whether it was visible.
* Keep the ticket paid and unreturned; no refund is submitted in this case.

### TC-2: My Orders - Refunds - Return a ticket for Organizer Credit after its delayed barcode is released

**Description:** The customer can see the delayed-delivery ticket's barcode. **Allow delayed barcode automated returns = on** allows one completed return when the other refund rules pass. Keep the general **Allow customer refunds after barcode delivery = off** to prove that the separate delayed-barcode setting controls this ticket. This case uses **Organizer Credit**: credit is added for purchases from the same Organization. With **Full refund (Showpass fees invoiced)** and one card-paid ticket without extras, the expected customer credit equals the original receipt's total paid amount, including its charged fees and taxes.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

The Event starts approximately 48 hours from purchase, with **Barcode delivery delay = 72**. The release period is already open, so the purchased barcode is immediately available. This proves the released-barcode return path; scheduled release of an earlier purchase is separate coverage.

**Tags:** my-orders, refunds, post-purchase

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events** and **Manage Transactions**. An administrator can edit Venue and Ticket type records and feature flags. Record the original settings before changes.
* In **Admin → Venues → Venues → the selected Organization's Venue**, save **Customer Self Refund Settings = on**, **Allow delayed barcode automated returns = on**, and **Automated return window = 24** hours. These are saved Venue settings. The Event must still be more than 24 hours away throughout the run.
* Enable the **Venue-scoped feature flag enable_venue_policy_customer_self_refunds** for that Venue.
* In **Admin → Venues → Venue customer refund policies**, search for the Venue; reuse its policy or select **Add → Venue → select the Venue → Save**.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Allow customer refunds for tickets = on**, **Cutoff type = No cutoff**, **Orders with mixed eligibility = Refund eligible items independently**, and **Allow customer refunds after barcode delivery = off**. Save both **Allow customer refunds after fulfillment or shipping** and **Allow customer refunds after check-in or scan** off.
* On that same page, save **Automated return medium = Organizer Credit** and **Automated return refund type = Full refund (Showpass fees invoiced)**.
* In **Dashboard → Build → Events → All events**, create or select an event without other customers' sales. Set its start to approximately **48 hours from now**, record the date/time and timezone, publish it and open sales. In **Edit → Tickets**, create one public General Admission ticket priced **10.00**, **Inventory = 10**, with **Basic info → Allow customer-initiated refunds = on**.
* Before purchasing, open **Admin → Tickets → Ticket types**, find that ticket by its Event and name, and save **Barcode delivery = Delayed Activation** and **Barcode delivery delay = 72** hours. Setting these on the ticket type makes the Event/Venue fallback irrelevant for this purchase. Reopen and verify them.
* As the customer who will use My Orders, purchase **one** of that ticket with an approved refundable card payment and electronic delivery. The order contains no package, product, shipping, discount, existing credit, gift card, protection or payment plan. Record the receipt and transaction. Keep the ticket paid, unscanned, unfulfilled, untransferred and off resale.
* Before opening Return order, record the customer's **Account → Credits → Organizer Credits** balance for this Organization and the original receipt's **total paid amount and currency**. That original total is the expected credit; do not derive it from the refund preview.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the purchasing customer, open Account → My Orders and open the recorded order. | Recorded transaction | The order contains one paid admission ticket. |
| Open the ticket. | Delayed-delivery ticket purchased inside its release period | Its barcode is visible before the return starts. |
| Select Return order. | The same order | The ticket is selectable despite the general barcode-refund switch being off. |
| Select the ticket. | Quantity 1 | The preview shows Organizer Credit equal to the original receipt's total paid amount, with no shipping or shipping tax. |
| Select Next. | Recorded original paid total | Confirm Return shows the same amount and Organizer Credit destination. |
| Choose Bought by mistake under Why are you returning this order? | Bought by mistake | Return Order is available. |
| Select Return Order once. | Recorded credit amount and currency | Return Successful shows that amount. |
| Select Done. | | The success dialog closes. |
| Reopen the order in My Orders. | Original transaction | The ticket is marked returned/refunded and cannot be selected for a second customer return. |
| Open Account → Credits → Organizer Credits. | Starting balance plus original paid total | This Organization's credit balance increased exactly once by the expected amount. |
| As the employee, open Dashboard → Transactions and find the original transaction. | Original sale and linked customer return | Exactly one customer return is linked to the sale, for the recorded ticket and credit amount. |
| Open the transaction's item details. | Recorded ticket | The selected ticket is returned; no extra ticket, item or credit adjustment was created. |

**Postconditions:**

* Restore the Venue, feature flag, Organization policy and ticket settings changed for this case, then save and reopen them. Keep the purchased records and receipt; do not delete financial history.
* Do not use a displayed barcode number as evidence in shared notes. Record whether it was visible.
* Preserve the returned ticket, original receipt, return record and starting/final credit balances. Do not reverse the return or delete its history as cleanup.

### TC-3: My Orders - Refunds - Allow a refund preview before a delayed ticket barcode is released

**Description:** The customer has one paid delayed-delivery ticket whose barcode is still hidden. **Allow delayed barcode automated returns** may be off or on: this setting only adds permission after release. Before release, the ticket should still be selectable when the main Venue, Organization and ticket refund settings allow it. Preview and Cancel leave the ticket paid.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

Run each DelayedReturns value separately. The Event starts approximately 48 hours from purchase. **Barcode delivery delay = 24** leaves the barcode hidden until 24 hours before the Event starts. Finish the preview while the barcode is still hidden; no release wait is part of this case.

| DelayedReturns | Admin → Venues → Venues → selected Venue → Allow delayed barcode automated returns | Expected result before release |
| --- | --- | --- |
| Off | Off | Return order is available and the ticket can be previewed. |
| On | On | Return order is available and the ticket can be previewed. |

**Tags:** my-orders, refunds, post-purchase

**Parameters:**
DelayedReturns: Off, On

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events** and **Manage Transactions**. An administrator can edit Venue and Ticket type records and feature flags. Record the original settings before changes.
* In **Admin → Venues → Venues → the selected Organization's Venue**, save **Customer Self Refund Settings = on**, **Allow delayed barcode automated returns = the selected DelayedReturns value**, and **Automated return window = 24** hours. These are saved Venue settings. The Event must still be more than 24 hours away throughout the run.
* Enable the **Venue-scoped feature flag enable_venue_policy_customer_self_refunds** for that Venue.
* In **Admin → Venues → Venue customer refund policies**, search for the Venue; reuse its policy or select **Add → Venue → select the Venue → Save**.
* In **Dashboard → Organization → Organization settings → Customer refunds**, save **Enable customer refund policy = on**, **Allow customer refunds for tickets = on**, **Cutoff type = No cutoff**, **Orders with mixed eligibility = Refund eligible items independently**, and **Allow customer refunds after barcode delivery = off**. Save both **Allow customer refunds after fulfillment or shipping** and **Allow customer refunds after check-in or scan** off.
* On that same page, save **Automated return medium = Organizer Credit** and **Automated return refund type = Base refund**.
* In **Dashboard → Build → Events → All events**, create or select an event without other customers' sales. Set its start to approximately **48 hours from now**, record the date/time and timezone, publish it and open sales. In **Edit → Tickets**, create one public General Admission ticket priced **10.00**, **Inventory = 10**, with **Basic info → Allow customer-initiated refunds = on**.
* Before purchasing, open **Admin → Tickets → Ticket types**, find that ticket by its Event and name, and save **Barcode delivery = Delayed Activation** and **Barcode delivery delay = 24** hours. Setting these on the ticket type makes the Event/Venue fallback irrelevant for this purchase. Reopen and verify them.
* As the customer who will use My Orders, purchase **one** of that ticket with an approved refundable card payment and electronic delivery. The order contains no package, product, shipping, discount, existing credit, gift card, protection or payment plan. Record the receipt and transaction. Keep the ticket paid, unscanned, unfulfilled, untransferred and off resale.
* Record the customer's **Account → Credits → Organizer Credits** balance for this Organization. Both parameter runs may reuse the same paid order while its barcode remains hidden, because each run cancels without refunding it.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the purchasing customer, open Account → My Orders and open the recorded order. | Recorded transaction | The order contains one paid ticket. |
| Open the ticket. | DelayedReturns; Barcode delivery delay = 24 | The barcode is hidden with delayed-availability information. A visible barcode is the wrong starting state. |
| Select Return order. | Same order | The ticket is selectable for either DelayedReturns value. |
| Select the ticket. | Quantity 1 | A refund amount greater than zero is previewed for that ticket, with Organizer Credit as its destination. |
| Select Cancel. | | No return is submitted. |
| Reopen the order. | Original transaction | The ticket is still paid, not marked returned, and its barcode remains hidden. |
| Open Account → Credits → Organizer Credits. | Recorded starting balance | The Organization's credit balance is unchanged. |
| As the employee, open Dashboard → Transactions and find the purchase. | Recorded transaction | No customer return is linked to the sale. |

**Postconditions:**

* Restore the Venue, feature flag, Organization policy and ticket settings changed for this case, then save and reopen them. Keep the purchased records and receipt; do not delete financial history.
* Do not use a displayed barcode number as evidence in shared notes. Record whether it was visible.
* Keep the ticket paid and unreturned. Finish both parameter runs before its release period opens.

## Source-backed Behavior

* **Customer Self Refund Settings** is the main saved Venue gate. The shared Venue-targeted feature flag **enable_venue_policy_customer_self_refunds** is required by the current policy path; it is not a separate delayed-barcode flag.
* A released delayed ticket additionally needs **Allow delayed barcode automated returns = on** and must pass **Automated return window** in Admin. It also passes the Organization policy cutoff. **No cutoff** does not disable the Admin window.
* Released delayed barcodes are deliberately excluded from the general **Allow customer refunds after barcode delivery** restriction. That general switch does not overrule the delayed-barcode setting. The earlier note claiming both barcode permissions apply was incorrect.
* Before release, the delayed-barcode setting does not block an otherwise eligible ticket. The main Venue/Organization gates, ticket switch, ownership, payment and other rules still apply.
* Barcode mode and delay can be set on a ticket type; otherwise they fall back through Event to Venue. Set the values on the new ticket type before purchase for these cases. Do not attempt to change an already issued ticket by editing its Event.
* Purchase inside the release period marks the new delayed ticket active immediately. Checking My Orders proves customer-visible availability; a generated barcode string alone is insufficient.
* Full refund was chosen for TC-2 so its independent customer-credit expectation is the original receipt total. The old unpublished Base-refund draft was replaced for this clean completion case; Base refund remains used for the preview baseline and other published refund cases. This is not new refund math.

## Sources Reviewed

[SPW-19670](https://showpass.atlassian.net/browse/SPW-19670), description and comment read through Atlassian Rovo on 2026-11-05; status BETA QA. Jira requests default-off Venue opt-in, before/after-release behavior, preserved safeguards and existing refund calculations.

**Backend** `/Users/christianvaldez/Documents/Showpass/repos/web-app`, revision `3550179e4d3ec0788410fd1ef92422f5291cef53`:

* `apps/tickets/mixins.py`, `apps/tickets/models/event_management/event_ticket_types.py`, `event.py`, `apps/tickets/admin/ticket_types.py`, `events.py` — supported Admin fields and ticket → Event → Venue fallback.
* `apps/tickets/models/ticket_lifecycle/ticket.py` → `set_barcode_delivery_delay`, `apps/tickets/services/fulfillment/ticket_generator_service.py` — immediate availability for purchases inside the configured release period.
* `apps/financials/services/invoice/customer_return_eligibility.py` → `_get_item_blocker`, `_get_legacy_cutoff_blocker` — opt-in, main gate, cutoff and general-barcode exception.
* `apps/financials/services/invoice/customer_return_amounts.py`, `user_invoice_return.py`, `apps/financials/payments/refunders/base.py` — original paid values, completed credit and Full-refund amount.
* `apps/venues/models/venue_management/venue.py` — default-off delayed setting and Admin return window in hours.

**Frontend** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, revision `1e6663a3cc6d6a68ada9bd9dbb0d58fea3339fcd`:

* `packages/core/src/app-contexts/user/features/account/features/my-orders/utils/order-actions/return-order.ts`, `order-action-availability.ts` — delayed opt-in filtering and action availability.
* `ui/modals/return-order/MyOrdersReturnOrder.web.tsx` — selection, Next, Confirm Return, reason, Return Order and Return Successful. These paths are relative to the same My Orders feature directory.

Applied the QA Handbook delivery and Refund/Credit walkthroughs, canonical quality standard and Qase writing rules. No repo edits, branch comparison, browser test, purchase, refund or barcode release was performed.

## Qase Review And Publication

Read-only complete SPT snapshot: **2349 cases**, retrieved **2026-11-05T20:51:48.619Z**; 17 broad delayed/19670 candidates. Full-text search across saved definitions found **zero** naming **Allow delayed barcode automated returns** or its exact key. This is a targeted duplicate review, not a full release-coverage audit.

Related cases reviewed: **SPT-3877** configures release timing; **SPT-4108** checks hidden/visible barcodes; **SPT-5325** checks the Default-barcode refund restriction. None asserts the delayed-refund opt-in. **SPT-5309**, **SPT-5314** and **SPT-5327** explicitly prepare Default barcodes; their general ticket, credit and check-in checks do not establish delayed-barcode behavior. Existing cases are preserved.

**Approved and applied:** the user approved these three creates. The maintained batch writer created **SPT-5894 / TC-1**, **SPT-5895 / TC-2** and **SPT-5896 / TC-3** in **Customer (1108)**. All have **my-orders, refunds, post-purchase** tags. Step counts are **6 / 12 / 8**. TC-3's **DelayedReturns = Off, On** was read back as a saved **Single** parameter; the other two have no parameters. Full readback compared Title, Description, Preconditions, Postconditions, suite, tags, parameters and every step with the approved local drafts: all matched. No existing case was changed, moved or deleted. No product test or transaction was executed.

**Evidence and cleanup:** publication IDs, scope, counts and successful full-field comparison are recorded here. The complete temporary Qase snapshot, apply receipt, plans and readback files were removed after verification; no temporary API-output paths remain required by this note.

**Publication history:** on 2026-10-05, the two original drafts were held because “schedule release” lacked executable preparation. The 2026-10-27 batch explicitly excluded them. The current recipes resolve that drafting gap without waiting for scheduled release; no prior executed result is being claimed. The original TC-1 pre-release baseline is now the focused TC-3; TC-1 retains the released-blocked responsibility and TC-2 retains completed return after release.

## State-space / Setup Matrix

| Customer Self Refund Settings | Delayed returns | Barcode | Expected | Coverage |
| --- | --- | --- | --- | --- |
| On | Off | Hidden | Preview allowed | TC-3 Off; not run |
| On | On | Hidden | Preview allowed | TC-3 On; not run |
| On | Off | Visible, delayed mode | Return order hidden | TC-1; not run |
| On | On | Visible, delayed mode | Completed return allowed; general barcode-refund switch off | TC-2; not run |
| Off | On | Visible, delayed mode | Blocked | Additional focused main-gate regression deferred |

## Recommended Test Data And Minimum Execution Set

Use the named one-ticket recipes in each standalone case. Run TC-1, TC-2 and both TC-3 values: **three cases, four runs**. Existing matching owned orders can be reused after verifying their issued barcode mode, release state and all saved gates. TC-3's two values can use the same unreturned order. TC-2 needs an order whose completed refund is authorized; a saved case definition does not authorize executing it against a client purchase.

## Risk Areas And Remaining Coverage

| Proof target | Status / next check |
| --- | --- |
| Unreleased and released allowed/blocked base behavior | Published as SPT-5894–5896; not executed |
| General barcode restriction off with delayed opt-in on | Explicit in TC-2; not executed |
| Main Venue gate off despite delayed opt-in on | Separate focused negative still needed |
| Admin automated-return window and policy cutoff block independently | Separate delayed-ticket cutoff checks still needed; general SPT-5311 is related only |
| Same already-purchased ticket changes from hidden to visible through the scheduled job | Not proved by immediate-at-purchase setup; reuse SPT-3877/4108 for release, then add refund checks around that actual transition |
| Checked-in, refunded, voided, transferred/resale, wrong owner and customer-activation controls | Delayed-specific backend/API checks and separate supported manual preparations still required; standard-barcode cases do not replace them |
| Stale preview, duplicate submit, source financial values, fees/earnings, admission validity and inventory after return | Existing general regressions are related; delayed-specific execution and financial/admission/stock proof remain outstanding |
| Original-card return after release | This completion case uses Organizer Credit only; original-payment delayed completion remains separate |

## Suggested Automated Coverage

Backend: all main-gate/opt-in/release combinations; both independent cutoff sources; general barcode exception; paid/used/voided/ownership states; preview and submit parity; original amount and duplicate protection. Frontend: correct Return order visibility and selection for delayed tickets before/after release with Admin opt-in off/on. Keep real scheduled release and customer-visible timing as separate integration assertions.

## Assumptions and Unknowns

These are source-reviewed definitions. Deployment, migrations, actual Venue settings and release visibility were not verified live. A missing barcode despite the inside-release-period recipe is a blocked starting state to investigate, not a refund pass. Jira says the Venue field is the only rollout control; current source also checks the shared customer-policy rollout flag for released barcodes. That discrepancy remains recorded for product/engineering.

## Open Questions

1. Should the current shared-rollout requirement and general-barcode exception be made explicit in the Jira acceptance text?
2. Which owned order and approved completion scope should be used when the successful return case is executed? No execution is requested by this publication preparation.
