---
title: Checkout and Post-Purchase Coverage
date: 2026-10-03
tags:
  - qa/system-handbook
  - qa/integration
status: Source-informed test-design guidance; not executed coverage
---

# Checkout and Post-Purchase Coverage

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Configuration and production-to-TEA comparison]] · [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes|Realistic Customer scenarios]]

A checkout test is not finished when the payment button works or a receipt appears. Prove what the **Customer bought**, what the **Attendee/Member can use**, and what the **Organizer must fulfill and account for**. Analytics is one of these outcomes, not the umbrella for all of them.

Use this checklist to design the selected journey, not to require every feature on every order. For every applicable row, declare the expected result, where it will be checked, completion deadline, coverage layer and evidence. Disabled/unsupported rows require a reason and source/configuration evidence. Applicable but inaccessible evidence is Blocked, not Not applicable. Follow the canonical coverage and execution statuses; this chapter does not create a new quality standard.

## 1. Keep the completion milestones separate

| Milestone | What it proves | What still needs checking |
| --- | --- | --- |
| Provider outcome | The original test payment is authorized/captured/declined/pending under its actual mode | Local saved sale, promised items and later settlement; saving a method with a SetupIntent is not payment |
| Saved order and financial lines | One sale and its intended amounts are recorded | Complete issuance, delivery, benefits, external consumers and reports |
| Primary item issuance | Expected tickets/Products are generated | Every item identity/quantity; later Membership work, wallets, emails and integrations |
| Downstream completion | Each enabled consumer has applied its promised result | Actual admission/pickup, adjustment and final financial reconciliation |
| Later business operation | Fulfillment, Check In, Transfer, Refund, Void or Exchange occurred as intended | Unaffected items, old/new rights, remaining balances, Inventory and net reporting |

**Source-backed caution:** backend `post_purchase_completed` covers primary post-purchase work, not all downstream completion. Membership creation/confirmation can be chained later. Wallet generation failure can be reported while the ticket still saves. A receipt, completed task, emitted event or HTTP success is therefore insufficient proof of the entire purchase.

## 2. Account for the outcomes checkout can leave behind

Start with rows A–E for every paid journey; inspect the remaining rows for applicability. Add any changed consumer not listed here. The linked walkthroughs contain the detailed operations; this inventory prevents their omission from the overall test design.

| Outcome | Actionable check and final proof | Follow-up walkthrough |
| --- | --- | --- |
| A. One payment and one saved sale | Preserve the first basket/order/payment references. Match actual provider outcome and amount to the saved order. Distinguish authorization, capture and pending states. Refresh/reopen through supported recovery; no additional payment or sale. | [[00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders\|Payments]] |
| B. Money and financial allocation | Calculate base price, discount, shipping, fee and tax independently. Compare both Customer charge and saved absorbed/internal/Organizer allocation. Same displayed total does not prove correct earnings; a Package can hide missing child allocation. | [[00 Start Here/Showpass QA Handbook/Playbooks/02 Fees Taxes and Absorbed Costs\|Fees and taxes]] |
| C. Exact purchased composition | Compare every promised Event/date/Ticket Type/seat, Package child, Product variant/SKU and quantity against issued items. Check who owns each item. Donations need their financial result, not admission; Gift Cards need stored value; Memberships need Member/benefits. | [[00 Start Here/Showpass QA Handbook/Playbooks/03 Packages and Parent-Child Items\|Packages]]; [[00 Start Here/Showpass QA Handbook/Playbooks/05 Memberships and Ticket Benefits\|Memberships]]; [[00 Start Here/Showpass QA Handbook/Playbooks/10 Products Variants and Stock\|Products]] |
| D. Inventory and availability | Compare opening reservation/sold/available quantities with final accepted quantities for each item/variant/seat. Refresh the Customer and Employee views. A public sold-out flag is not the inventory ledger; release triggers and remaining stock need separate checks. | [[00 Start Here/Showpass QA Handbook/Playbooks/04 Assigned Seats and Inventory\|Seats]]; [[00 Start Here/Showpass QA Handbook/Playbooks/11 Event Sales Calendars and Availability\|Availability]] |
| E. Order access and correct identities | Guest follows the real receipt/claim flow; signed-in Customer reopens My Orders; Employee locates the same sale in Transactions. Purchaser, Attendee, Employee and group distributor must not be confused. An unrelated account cannot claim/access protected information. | [[00 Start Here/Showpass QA Handbook/Playbooks/12 Permissions Ownership and Authentication\|Ownership]] |
| F. Post-purchase information | When enabled, leave required deferred questions incomplete, return, complete and reopen. Compare separate Attendee answers and Employee/export records. Partial answer save is not full completion; changing Attendee email is not changing purchaser or delivery email. | [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations\|Questions]] |
| G. Delivery and notifications | Inspect the actual controlled email/SMS/push or supported print/PDF; follow its order/ticket links. Compare recipient, Event/timezone, contents and applicable opt-out/delay rules. Missing delivery must not invite another charge. Resend must not create more admission. | [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations\|Communication]]; [[00 Start Here/Showpass QA Handbook/Playbooks/14 Mobile POS Kiosk and Hardware\|Physical print]] |
| H. Barcode, wallet and admission | Before/after the configured barcode release boundary, inspect what the recipient can actually obtain. Open the real wallet pass if promised, then use a separate eligible ticket for Check In. Verify correct Event, one allowed admission, re-entry policy and rejection of invalid tickets. | [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale\|Delivery and Check In]] |
| I. Shipping and operational fulfillment | Confirm allowed/blocked destinations, billing different from shipping, effective shipping charge/tax, per-item method and saved address. As permitted Employee, fulfill only one shipping item and reopen the order's partial/full status; remaining items stay unfulfilled. Status update is not proof of physical carrier delivery. | [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale\|Shipping and pickup]] |
| J. Discounts, credits and referral rewards | Check exact eligibility, usage/caps, Customer credit spend/balance and enabled reward recipient/amount. Reopen or replay through supported tests: no second grant/spend/usage. Bind reversal on adjustment to its actual policy; do not assume automatic restoration. | [[00 Start Here/Showpass QA Handbook/Playbooks/06 Discounts and Ticket Credits\|Discounts/Ticket Credits]]; [[00 Start Here/Showpass QA Handbook/Playbooks/07 Money Credits and Gift Cards\|Money credit]] |
| K. Memberships, plans and saved methods | Inspect the actual Member and every promised benefit, or the Payment Plan's schedule/provider ownership and intended admission rule. Saving a card and paying an installment are separate outcomes. A Membership confirmation does not prove all benefit tickets exist. | [[00 Start Here/Showpass QA Handbook/Playbooks/05 Memberships and Ticket Benefits\|Memberships]]; [[00 Start Here/Showpass QA Handbook/Playbooks/09 Payment Plans and Saved Methods\|Plans]] |
| L. Protection and post-purchase offers | If enabled, compare accepted/declined protection, amount, covered order and final provider protection record. A later protection upsell has its own purchase outcome; cancellation/failure must not corrupt or repurchase the original ticket order. Do not treat protection as an extra admission item. | [[00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders\|Payment boundaries]]; current protection owner in the source map |
| M. Analytics and attribution | Compare enabled internal/browser/server/tracking-token destinations against the known saved sale. Check transaction identity, currency, defined revenue, items/quantities and retained attribution. Receipt reload/question save must not count another purchase; investigate browser/server deduplication under its actual contract. | Detailed pass below |
| N. Organizer-facing activity and Customer records | Locate the purchase under the right Customer/Organization and permitted Employee. Compare intended profile/CRM fields and actual consent rules; Attendee details must not overwrite the wrong identity. If enabled, a completed sale should not retain inappropriate abandoned-cart reminders. | [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations\|Forms and integrations]] |
| O. External admission/booking/webhooks | For the enabled service, compare all expected recipients/items and external identifiers in its approved test destination. Check usable external access/booking, not just request accepted. Test supported delay/retry with one final effect; provider payment callbacks and outbound Organizer webhooks are different paths. | [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations\|External consumers]] |
| P. Conditional release and risk handling | Where configured, verify another Ticket Type releases only on the actual sales-trigger rule; abandoned/failed attempts do not prematurely satisfy it. Bind any fraud/risk-review outcome and fulfillment restriction to actual policy—paid must not be assumed to mean immediately admissible in every setup. | [[00 Start Here/Showpass QA Handbook/Playbooks/11 Event Sales Calendars and Availability\|Release/availability]]; current risk owner |
| Q. Transfer or Resale | Use an independent eligible order; compare old/new recipient access and barcode validity, ownership and Inventory. For Resale, separately reconcile seller proceeds/payout eligibility; a new buyer's receipt is not seller settlement. | [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale\|Transfer/Resale]] |
| R. Refund, Void and Exchange | Use independent orders. Verify selected versus untouched items, real return/credit/difference, fees/taxes, validity, shipping/pickup implications, Inventory, Customer messages and enabled external-system effects. Never assume all consumers reverse automatically. | [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges\|Adjustments]] |
| S. Reports and settlement | Obtain the actual authorized report/export with the correct Venue/date/timezone/status filters. Reconcile known sale and adjustment lines, quantity, shipping, fee/tax and net earnings. Check cash balances/provider settlement/payout eligibility where affected, without generating live payouts. | [[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts\|Reporting]] |

Waitlist enrollment, Guestlists and Holds have different contracts; they are not failed ordinary purchases. Declare their expected reservation/payment/approval behavior using [[00 Start Here/Showpass QA Handbook/Playbooks/17 Holds Waitlists and Guestlists|their guide]]. Auto Check In is also configuration-dependent; do not require an unscanned ticket where the configured flow intentionally checks it in.

## 3. Run the analytics outcome as part of the purchase

1. Record enabled destinations and their approved test IDs/endpoints. Include the host website/Widget context and attribution link if applicable. Do not pollute production metrics or transmit real Customer answers.
2. Use one known basket and independent expected sale values. Inspect the actual purchase payload in the supported browser path and the authorized received record for each applicable destination. Browser emission and server-side receipt are separate proof targets; internal asynchronous ingestion may need its own completion deadline.
3. Check transaction identity, currency, item/variant identities and quantities, and the destination's **defined** revenue basis. Current frontend external formatting excludes protection items and subtracts protection fees; do not force external marketing revenue to equal the raw charged total without reconciling that definition. Shipping, taxes, discounts and Package grouping also need the current destination contract.
4. Trace applicable link/token attribution across Organizer website → checkout/authentication → completed order. Missing attribution on a Widget/redirect cannot be disproved by a direct public-page test.
5. Refresh the receipt, reopen My Orders, save deferred questions, and use supported resend/recovery. Verify these actions do not become a new sale in the configured purchase-counting contract. Where browser and server events coexist, inspect the actual shared identity/deduplication arrangement; two network requests need not mean two counted purchases.
6. On separate failed/abandoned attempts, prove no false completed-sale attribution. On adjustments, verify only the refund/adjustment events actually promised by the integration; do not invent a universal reversal event.

Check approved consent/privacy requirements against the actual host and source. The reviewed backend marketing guide does not establish a universal runtime consent gate. Question-stage telemetry records stage/count information, not answers; ensure sensitive answers and order-access credentials are absent from collected test evidence and payloads where that contract applies.

## 4. Follow the branches that a real Customer leaves open

For a supported comic-con Package scenario, design multiple **independent** orders around the same verified catalog:

- **Admission/pickup order:** two Attendees, different supported merch variants, complete deferred questions later, receive delivery, admit the correct Attendees and pick up the correct Products. Shipping fulfillment and admission are not interchangeable.
- **Shipping order:** controlled allowed destination different from billing, one-item fulfillment then remaining-item fulfillment. Observe partial versus full order status without changing an electronic/pickup item into a shipped item.
- **Partial Refund order:** adjust one eligible item under the actual Package rules; compare unaffected admission/merch, return destination, shipping treatment, credits, reports and enabled external access.
- **Void order:** verify old validity and configured stock effect without assuming money return.
- **Exchange order:** choose the actual supported replacement/upgrade; reconcile old/new entitlements, extra charge or credit, questions/delivery and Inventory.
- **Recovery order:** prepare an approved failed/delayed downstream dependency, reconcile the original payment and retry only the supported failed work. Compare every promised item after recovery, not just the successfully retried one.

Across these orders, keep one untouched control and preserve the VIP phase's existing orders when rehearsing general on-sale. Use [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes#Rehearse the on-sale transition with existing data intact|the phase-transition pass]]. Actual Calgary options, permissions and policies must be established before execution; Cleveland is an automation pattern, not Calgary's configuration oracle.

## 5. Close the journey with explicit evidence and gaps

In the run's canonical note, keep one row per applicable business outcome:

| Field | What to record |
| --- | --- |
| Promise | Exact item/person/money/operational result and independent expected value |
| Context | Organization, saved configuration, client/build, phase, order and related references |
| Coverage and result | Applicable automation/backend/manual/device responsibility, plus separate execution status |
| Completion | Fresh persisted result or actual received/usable artifact; deadline and observed pending/failure state |
| Follow-up | Missing evidence, responsible owner and next action, or explicit risk acceptance |
| Final data | Retained financial references, remaining stock/balances/validity, verified isolation/cleanup |

Example: “Two VIP Packages paid; both admission tickets issued; one promised merch child absent; email delivered; external admission pending” is a useful partial result. “Checkout passed” is not. A later-stage failure must not erase evidence that money was already taken or invite an uncontrolled new charge.

## Source-backed behavior and limits

Reviewed on 2026-10-03 against local backend `252ab19313` and frontend `2c809125f2`. This is a selective source review, not an exhaustive audit of all consumers or proof of deployed configuration. No purchase, live production/TEA comparison, analytics query, device test or fault injection was executed.

- [Purchase lifecycle](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md>), [primary issuance](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py>) (`post_purchase_event`, `handle_post_purchase_task_links`, `claim`) and [completion fan-out](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/signal_handlers.py>) (`ticket_basket_post_purchase_event_complete_handler`). These establish conditional consumers; not every Venue enables them.
- [Paid response contract](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/post_purchase_responses.md>) and [response service](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/order_questions/post_purchase_responses.py>); [Customer paid-form hook](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/checkout/hooks/usePostPurchaseQuestionStageForm.ts>). Answers can remain pending after a partial save; full completion validation rejects missing required answers without keeping a partial update from that submission.
- [Shipping fulfillment service](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/shipping_fulfillment/fulfillment_service.py>) and [shipping status definitions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/constants/shipping.py>). Partial fulfillment is an order-level status, not a per-ticket status.
- [Issued-ticket finalization](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/fulfillment/issued_ticket_post_purchase_finalization.py>) separates configured auto Check In and pass generation from primary issuance. External barcode issuance also needs stock/capacity evidence: the reviewed purchase guide does not establish a shared pre-charge barcode-stock gate. Treat that as a targeted risk question, not an executed defect.
- [Internal analytics pipeline](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/analytics_taxonomy_and_pipeline.md>), [marketing tags/pixels/CAPI](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/marketing_analytics_tags_pixels_and_capi.md>), [purchase logging](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/checkout/analytics/logPostPurchase.ts>), [external value formatting](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/services/analytics/formatters/external.ts>) and [question-stage telemetry](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/checkout/analytics/logPostPurchaseQuestionStage.ts>).

These sources show where to investigate adjustment propagation, reward reversal, risk holds and consumer-specific retry/deduplication. They do not establish one universal policy for those outcomes. Bind the actual consumer before writing its expected result. See [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|the source map]] and [[00 Start Here/Showpass QA Handbook/06 Automation Strategy|existing automation guidance]].
