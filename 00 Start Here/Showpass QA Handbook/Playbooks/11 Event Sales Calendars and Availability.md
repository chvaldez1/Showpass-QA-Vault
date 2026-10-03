---
title: Create an Event and Test Its Full Lifecycle
date: 2026-10-03
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Create an Event and Test Its Full Lifecycle

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Choose Venue and client]]

The Organizer creates the Event. The Customer purchases it. The Attendee uses admission. The Venue Employee performs Check In and post-purchase actions. Test these handoffs as one connected system; saving the Event is only the first part.

## 1. Prepare the Venue, Organizer, Customer, and client

Use the linked setup chapter to record Venue currency/timezone, Location/Event timezone, gateway/account/test mode, effective fees/taxes, relevant flags, and sales client.

The Organizer needs Event ownership and Manage Events. A Venue Employee handling Transactions, Refund, paid Void, Exchange, Box Office, or Check In needs those specific capabilities. Manage Events alone does not grant all of them.

Use a controlled Customer inbox and approved payment setup. Do not advertise or sell the test Event to real Customers. Set up in Dashboard, but purchase on the client being tested: Public Web, Widget, Web Box Office, Electron, public mobile/webview, POS, or Kiosk where supported.

## 2. What your Event setup should look like

These example values create a useful baseline in owned test data. Prices use the selected Venue currency. Record actual inherited fees/taxes; do not assume zero.

For a real Organizer's on-sale, this generic baseline is only a clean control. Use [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|the production-to-TEA Organization/Admin/Event comparison]] for the actual launch setup. Design realistic Customer baskets and retain earlier VIP orders through the general-sale transition using [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes|the scenario and phase passes]].

| Setting | Baseline setup | Why you need it |
| --- | --- | --- |
| Event name | Unique descriptive name with your run date | Locate the exact Event in Dashboard, Customer orders, and reports. |
| Category | Valid supported category | Required publish information and public presentation. |
| Location | Actual test Location | Location is not the owning Venue; its timezone matters. |
| Event Date & Time | Start seven days ahead; end two hours after start; record actual timezone | Avoid accidentally testing a past Event or a closed sale. |
| Event type | Single Event | Establish a clean baseline before recurring/template differences. |
| Status | Save Draft first when available; then Publish using the supported flow | Draft persistence is not yet purchasability. |
| Visibility | Supported value that permits the intended isolated test purchase | Discovery visibility and direct-link purchase are separate checks. |
| Ticket Type 1 | General Admission; Inventory 20; Price 30 | Paid purchase, Inventory change, Refund and Void. |
| Ticket Type 2 | Second admission option; Inventory 20; Price 35 | Eligible replacement for Exchange with a price difference. |
| Sale window | Open now and ending after planned test purchases | Event start date alone does not determine Ticket Type sellability. |
| Purchase limit | Allows one-ticket and two-ticket orders | Partial refund and unaffected-ticket checks. |
| Fees / taxes | Recorded effective settings or an approved owned override | Independent Customer total and Organizer/Showpass allocations. |
| Delivery | Immediate supported delivery for baseline | Obtainable ticket; delayed barcode belongs in a separate scenario. |
| Order Form & Messaging | One required question if this integration is in scope | Checkout answer persists on the correct Customer/order. |
| Other options | No password, waitlist, plan, Package, or Assigned Seating unless selected for this scenario | Avoid unexplained configuration hiding the cause of a failure. |

## 3. Organizer creates and reopens the Event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage Events. | Selected Venue | The intended Organizer's Events are shown. |
| Select Create Event. | Single Event baseline | Supported Event creation form opens. Do not substitute a deferred wizard path. |
| Enter the Event name. | Unique run name | Correct name is shown. |
| Choose its category. | Valid category | Required category is selected. |
| Set the Location. | Actual test Location | Correct Location and timezone information. |
| Set Event Date & Time. | Recorded future start/end | End follows start; selected timezone matches the scenario. |
| Set Event visibility. | Chosen supported option | Correct intended Customer access/discovery setting. |
| Add the first Ticket Type. | General Admission, Inventory 20, Price 30 | Correct option, Inventory, and Price. |
| Add the replacement Ticket Type. | Second option, Inventory 20, Price 35 | Two distinct purchase options, not a duplicate of the first. |
| Set the sale window and purchase limits. | Open sale; intended quantities | Planned orders are eligible. |
| Select Save Draft when available. | Same Event | One saved draft; not a second Event. |
| Open Manage Events → this Event → Edit. | Same Event | Saved fields and both Ticket Types are still correct. |
| Select Publish when ready for approved testing. | Complete required information | Valid information accepted; applicable approval workflow honored. |
| Reopen after saving/generation finishes. | Same Event | Final saved state and complete Ticket Types; no partial generation. |
| Select View Event. | Same Event | Correct public name, Location, date/time, and available Ticket Types. |

With asynchronous create/update enabled, a job can be accepted before all Event work finishes. Wait for the actual saved Event/Ticket Types; do not repeatedly Publish while work is pending. A validation error must leave no unintended published Event.

## 4. Customer purchases the Event

Start in the Customer's session. For Box Office/POS, the Venue Employee selects and sells to the Customer; the order still needs the correct Customer ownership.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Event on the selected sales client. | Same Event | Correct Organizer, Event date, currency, and sales eligibility. |
| Select General Admission. | Quantity 1 | Basket has exactly the selected Ticket Type. |
| Continue to checkout. | Same selection | Correct Event and quantity remain attached. |
| Enter Customer details or sign in as the Customer. | Controlled account/inbox | Correct purchaser, not the Employee's account. |
| Answer questions at their configured before/after-payment stage. | Recorded answer and collection stage | Missing required answer blocks its intended submission; deferred information completes separately after payment. |
| Select delivery. | Baseline supported method | Correct choice and any cost. |
| Compare all charges with your independent calculation. | Base 30 plus actual fees/taxes | Correct subtotal, fee/tax components, credit, and external payment. |
| Complete payment once. | Approved test method | One final successful payment or explicit pending result. |
| Open confirmation/order details. | Saved order reference | Correct Customer, Event, Ticket Type, quantity, and amount. |
| Reopen the Customer's order/tickets from a fresh view. | Same reference | One issued ticket with correct date and expected barcode availability. |
| Open the controlled Customer inbox if email delivery is promised. | Same order | Actual delivered message and usable ticket link, not only preview. |
| As the Venue Employee, open this Event's Transactions. | Same order/Customer | One matching financial sale and correct saved amounts. |
| Open Event Overview or Ticket Type availability. | General Admission | Sold/reserved/available values agree with the saved sale and reservation rules. |

If the payment result is uncertain, do not buy again. Use [[00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders|payment reconciliation and recovery]].

## 5. Venue Employee admits the Attendee

Use a successful order on an admission-enabled test Event for Check In. The future-dated setup above must not bypass its admission window; create a separate appropriately timed test Event with the same relevant configuration when necessary. Keep adjustment orders unscanned.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open this Event's Check In as the authorized Venue Employee. | Event and issued ticket | Correct Event selected. |
| Look up or scan the baseline ticket. | Barcode | Correct Ticket Type, date/seat, and Attendee found. Lookup alone is not admission. |
| Complete the supported Check In action. | Baseline ticket | Admission and history/count change according to the Check In preset. |
| Attempt the repeated scan relevant to that preset. | Same ticket | Correct multiscan allowance or duplicate rejection; no unintended admission. |

If Customer and Attendee are different, verify checkout answers, ticket information, and Check In use the correct identity.

## 6. Refund, Void, and Exchange different orders

Create a fresh purchase for each action. Record original money, status, stock, and Customer before changing it. [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges|The post-purchase walkthrough]] provides the step-by-step actions.

| Separate order | Venue Employee action | Results to check |
| --- | --- | --- |
| Refund order: two unscanned tickets | Transactions → matching order → Refund; select one ticket and the permitted partial type, or use another order for full refund | Final cash/credit, fee/tax treatment, correct validity, unaffected ticket remains valid, actual restock policy, saved adjustment/reporting. |
| Void order: one unscanned paid ticket | Transactions → matching order → Void; select the supported paid-item action | Correct validity, Inventory and void record. Cash return must be established separately; Void is not a synonym for Refund. |
| Exchange order: one unscanned ticket | Supported Exchange action → eligible second Ticket Type | Original validity, one usable replacement, correct owner, extra payment/refund/credit, original/replacement Inventory, net financial records. |

Do not assume every Refund restocks or every Void returns money. Use the actual supported policy in the expected result. An unresolved policy is a Product-expectation question.

## 7. Organizer reconciles the complete Event

Open Event Overview, Transactions, relevant reports/exports, and Customer tickets. Compare the baseline, Refund, Void, Exchange, and replacement records. Check identities and amounts—not only a total count.

Event creation is not complete integration coverage if the Event saves but cannot be purchased, misses fees, issues the wrong dated ticket, loses an answer, cannot admit the Attendee, or leaves the wrong post-purchase result.

Account for all applicable [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|purchase outcomes]], including deferred questions, shipping fulfillment, analytics/attribution, benefits/rewards, communications and enabled integrations. Each needs its own expected result/evidence; a sale in Transactions is not proof of all downstream work.

## 8. Senior-QA passes: change setup and follow the whole path

| Scenario | What to do | Integration outcome to challenge |
| --- | --- | --- |
| Recurring Event | Generate two dated children; purchase each through affected calendar/Widget; edit supported parent/child fields | Correct child dates, pricing, cutoffs and tickets; no wrong-date propagation; combined reporting reconciles. |
| Timezone / cutoff | Use relevant Customer timezone; inspect before/at/after sale cutoff with approved time control | Backend eligibility agrees with the intended authoritative timezone, not only a device display. |
| Assigned Seating | Link a supported Map; purchase an exact seat; use permitted release/reassignment | One owner; correct seat on ticket/print/Check In; actual repurchase after release. |
| Internal/absorbed fees + Package | Use Ticket + Product Package, quantity >1, known fees and discount | Customer total AND saved earnings; complete children and correct descendant adjustment. |
| Discount / Ticket Credit | Configure, reopen, then redeem through sales client | Setting genuinely affects checkout; usage and issued tickets agree. |
| Existing order / basket | Allowed Event/price edit with an old basket open and an earlier paid order | Supported pricing policy; old order not silently rewritten; no stale unintended charge. |
| Last capacity | Two controlled Customers contend for isolated last ticket | One intended sale; safe rejection; no oversale or stranded reservation. |
| Cross-client | Purchase through affected Public Web, Widget, Box Office, Electron, mobile/POS | Supported actions and final results—not invented platform symmetry. |
| Permission | Allowed minimum Employee and denied Employee attempt relevant action | Correct access; no unauthorized mutation or Customer-data exposure. |
| Delayed/partial work | Engineering-supported isolated failure and recovery | One Event/order and complete items; no duplicate charge or missing child records. |
| Boundary / invalid input | Blank required field, end before start, zero/negative/over-limit Inventory or quantity where safe | Relevant rejection; valid correction saves; no partial published Event. |

For every selected row, repeat the applicable purchase → issued item → post-purchase checks. A configuration screenshot alone does not test the integration.

## 9. Finish safely

Record Venue, Event/Ticket Types, timezone, client/build, gateway/method, fees/flags, Customer/order/payment references, delivered/admitted items, adjustments, and final Inventory/report values. Identify pending/failed/unavailable checks explicitly.

Stop further test sales using the supported safe action. Restore only owned authorized settings. Preserve financial records; sold Events may be protected from deletion.

## Source and existing automation

[Current Event API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>), [Event/Ticket Type domain](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/domains/events_and_ticket_types.md>), [Event fields](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html>), [Save Draft/Publish](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/_create-form.html>), [frontend navigation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/legacy-angular-routes.ts>).

The Event API references `WAFFLE_SWITCH_ENABLE_ASYNC_CREATE_UPDATE_EVENT`; deployed value was not read. Current navigation can lead to the legacy editor; manual steps use visible product navigation. [[03 Test Cases/Events/event-management-qase-test-cases]] supplies existing Event cases, but field-presence cases do not establish this full chain.

**Business risk:** customers cannot find/purchase a valid event, buy the wrong recurring date, or bypass a sales restriction. Severity depends on actual sales/access impact, not proximity to the event alone.

**Automation:** existing single/recurring/password event tests plus chosen boundary journeys; backend time/availability/cache-refresh cases. Do not label the unavailable clock boundary passed. Source route: B15, B16, B2.
