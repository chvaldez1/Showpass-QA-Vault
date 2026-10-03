---
title: Complete a Customer Purchase and Reconcile the Order
date: 2026-10-03
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Complete a Customer Purchase and Reconcile the Order

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Full path:** Customer selection → correct price → payment → saved transaction → issued items → every applicable post-purchase outcome → separate later operations → Inventory and financial reconciliation. For Box Office/POS, the Venue Employee acts on behalf of the Customer. This is a branching business lifecycle, not one script that ends at the receipt.

## Prepare
Choose Venue, client, gateway/account/test mode, payment method, currency, fees/taxes, delivery, and permissions using [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|the setup guide]]. Create a purchasable Event/Product/Membership first. Record opening Inventory and independently calculate total and promised items.

Use a Customer account/inbox you control. A Free/Comp control does not prove a card sale. Set up separate baskets for clean success, decline, cancellation, and uncertain-result recovery.

Declare applicable outcomes using [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the purchase completion checklist]] before buying. Include deferred information, guest claim, shipping/pickup, barcode/wallet, benefits/credits, protection, analytics, notifications, integrations, reporting and adjustments where configured. A disabled feature needs a reason; an enabled consumer without evidence remains a gap.

## Customer or Venue Employee completes the clean sale
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the chosen sales client. | Actual Venue/item | Correct Organizer, item, currency, and availability. |
| Select the intended option and quantity. | Named Ticket Type, Product variant, or Membership Level | Exact selection in basket; no unexpected prior items. |
| Enter/select the Customer. | Controlled Customer | Purchase owner is not accidentally the Employee. |
| Complete questions collected before payment and choose delivery. | Recorded answers/method and question stage | Required input blocks its intended submission; explicitly deferred questions remain to complete after payment. |
| Review all charges before submitting. | Independent base/fee/tax/credit calculation | Correct amount and allocation; not merely the same total copied from another screen. |
| Complete the supported test payment once. | Actual method | Final status known or clearly pending; no uncontrolled second charge. |
| Open the resulting order. | Saved reference | One correct sale with intended Customer/items/amount. |
| Reopen Customer tickets, Products, or Membership from a fresh view; complete deferred information when enabled. | Same order and each Attendee's answers | Promised items actually issued with correct owner/date/seat/variant; required post-purchase information completes and persists separately. |
| Obtain the promised delivery. | Controlled inbox/PDF/print | Actual usable delivery, not only an enqueued email or print request. |
| Open Organizer Transactions and availability/reporting. | Same order | Matching payment, once-only stock effect, correct earnings. |

## Decline and cancellation
Begin another basket. Use an approved decline scenario or a cancel control actually present on this client. Inspect the original attempt, Customer items, and availability: no successful unintended charge, no paid usable order, and reservation release follows the real lifecycle. Record unexpected errors separately from the planned decline.

## Reconcile before retrying an uncertain sale
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Preserve the first attempt's visible message and references. | Basket/order/payment reference | Original attempt remains traceable; no new purchase yet. |
| As the permitted Venue Employee, locate it in Transactions. | Customer and original reference | Order/pending/final state can be established or explicitly remains unknown. |
| Obtain the matching provider result through the authorized setup owner if needed. | Original payment reference; no raw card data | Charged/not charged/pending is known; missing receipt is not assumed to mean no charge. |
| Use the supported retrieve/recover/reprint action appropriate to that result. | Original sale | Customer gets the intended result without charging again. |
| Reopen final order, items, Inventory and financial records. | Same original attempt | One payment, one sale, complete fulfillment, one intended Inventory effect. |

If payment remains unknown, stop charge-producing retries and record the named missing evidence.

## Senior-QA integration passes
- Existing basket after price/fee change; signed-in versus guest Customer; new/existing Customer in Box Office.
- System/Custom account, applicable API mode, wallet/3DS/redirect and original gateway ownership.
- Engineering-controlled delayed/duplicate callback, provider success followed by local failure, and interrupted post-purchase issuance.
- Terminal payment followed by delayed print; Membership payment followed by benefit issuance; Package payment followed by child generation.
- Separate [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges|Refund/Void/Exchange]] orders after success.

Browser response interception proves client handling only, not provider-success/database-rollback behavior. Use isolated engineering-supported fault setup. Preserve failed first-attempt evidence even if retry passes.

## Finish
Record original and final references and each applicable outcome from [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the completion checklist]]. Keep pending questions, missing children/benefits, unfulfilled shipping and delayed external results visible; do not summarize them as a passed checkout. Restore owned configuration and preserve financial records. Unavailable provider/downstream evidence remains Blocked.

## Source-backed cautions and automation reference

**Business risk:** customer is charged but lacks an order/tickets, or a retry creates duplicate charges/orders. Historical anchors: SPD-2245, SPD-2396, SPD-2618, SPD-2630.

**Automation:** Playwright for clean real journey and fresh-order evidence; backend integration tests for provider-success/local-failure, duplicate callbacks, concurrency, and idempotent recovery. Mocking the purchase response does not prove a real provider/order chain. Source route: B1, B2, F1.
