---
title: Public Sold Out Switch — Manual Test Cases
date: 2026-09-14
tags:
  - qa/test-cases
  - tickets
  - public
---

# Public Sold Out Switch — Manual Test Cases

**Status: Published in Core - Inventory (625): TC-02 → [SPT-5230](https://app.qase.io/case/SPT-5230); TC-11 → [SPT-5236](https://app.qase.io/case/SPT-5236); TC-12 → [SPT-5237](https://app.qase.io/case/SPT-5237); TC-17 → [SPT-5238](https://app.qase.io/case/SPT-5238). The three seating cases were created and verified on 2026-09-15. Other cases remain local drafts; no tests executed.**

See [[#Qase Regression Gap Analysis — 2026-09-14]] for reusable existing cases and remaining regression gaps.


**Review update — 2026-09-15:** TC-03 now covers voiding the internal sale and reopening only after the ticket field is cleared. Its former clean purchase is retained through the existing SPT-3290 regression reference. Refund, hold release, manual inventory increase and exchange now have explicit return-and-reopen coverage. Seat, link, offer and package cases include fulfillment where needed. TC-02 / SPT-5230 was not changed.

**Package review — 2026-09-17:** TC-24 now covers preset package shapes with the global switch ON. TC-31–TC-36 add custom choices, seating, ticket + product contents, existing-cart rejection, actual shortages and in-person sales. All remain local drafts. Published Qase cases and the user-edited SPT-402 content were not changed.

## How to run this note

**“Switch OFF” and “Switch ON” always mean the global `enable_force_public_sold_out` switch.** The ticket-type checkbox is a separate saved value.

| Control | Meaning |
| --- | --- |
| Global switch `enable_force_public_sold_out` | Turns the new public-sellout behavior OFF or ON for the platform. |
| Ticket-type `public_sold_out` / **Show as sold out publicly** | Marks that particular ticket type for public sellout; has effect only while the global switch is ON. |

Run **Pass 1 with the global switch OFF**, then **Pass 2 with it ON**. For shared cases, choose the exact parameter shown for that pass and keep the global state fixed throughout that case. Case numbers follow the order below: TC-01 starts with switch-OFF regression, followed by switch-ON behavior and shared checks. Every case below shows both control states at the start of its Description.

An administrator prepares saved TRUE values through **Admin → Tickets → Ticket types** when the employee checkbox is hidden with the switch OFF. Record original values and coordinate global changes. Each case remains standalone and includes its own cleanup. When executing a whole pass together, the release owner records the original global value once, keeps the pass state fixed, and restores it after the pass; restore each case’s ticket/cart data as written. Check the global state before each case.

### Pass 1 — Global switch OFF: current-behavior regression

Leave saved public-sellout values TRUE where specified. This proves the switch really ignores them. Check purchase completion, actual zero stock and the correct event/date/seat; loading a page is not a pass.

| Area to check | Case | Run these values | Expected regression result |
| --- | --- | --- | --- |
| Event detail — single day and recurring, including occurrence links | [TC-01](#tc-01--global-switch-off--regression-across-public-purchase-entry-points) | EventDetailSingleDay, EventDetailRecurring, RecurringOccurrenceLink | Saved TRUE does not block purchase; correct date/type reaches the order. |
| Attraction page — date/time, quantity-first and fixed event | [TC-01](#tc-01--global-switch-off--regression-across-public-purchase-entry-points) | AttractionCalendar, AttractionQuantityFirst, AttractionSingleEvent | The selected child event remains purchasable despite saved TRUE. |
| Widgets — event modal/embedded, current/legacy calendar, attraction | [TC-01](#tc-01--global-switch-off--regression-across-public-purchase-entry-points) | All five Widget purchase entries | Each real host can carry the available ticket through checkout. |
| Showpass-built website — modal and checkout page | [TC-01](#tc-01--global-switch-off--regression-across-public-purchase-entry-points) | WebsitePurchaseButton, WebsiteCheckoutHandoff | The ticket survives the website’s actual checkout path. |
| Mobile customer app — single day, recurring, attraction and Saved | [TC-01](#tc-01--global-switch-off--regression-across-public-purchase-entry-points) | MobileExplore, MobileRecurring, MobileAttraction, MobileSaved; iOS and Android | Purchase completes inside the app; do not substitute mobile web. |
| Assigned seating — detail, direct map, widget, attraction, mobile | [TC-10](#tc-10--a-seat-with-only-a-sold-out-ticket-type), [TC-11](#tc-11--a-seat-with-available-and-sold-out-ticket-types) | SelloutState = SwitchOffEmpty; every SeatEntry | Actual empty type remains unavailable; shared seat still permits its available type. |
| All public types actually empty — event-level display after 25 minutes | [TC-09](#tc-09--all-ticket-types-produce-event-sellout-after-25-minutes) | SelloutReason = SwitchOffAllEmpty | The event remains sold out on page, widgets, calendar and discovery. |
| Public best-available seating | [TC-12](#tc-12--public-best-available-seating--off-and-on) | SwitchState = Off; every SeatHost | Saved TRUE with real stock can allocate a seat. |
| Existing cart — web, widget, app cart and express | [TC-19](#tc-19--existing-cart--resume-after-the-ticket-setting-changes) | SwitchState = Off; every ResumeEntry | A saved TRUE change does not stop an unexpired cart purchase. |
| Automatic checkout links and ticket add-on/upgrade offers | [TC-20](#tc-20--checkout-link--automatic-ticket-selection), [TC-21](#tc-21--checkout-ticket-add-on-and-upgrade-offers) | SwitchState = Off; all mapped starting states/offers | Link/offer uses actual inventory, without duplicate items. |
| Web Box Office and Electron desktop app | [TC-13](#tc-13--staff-sale-with-actual-inventory), [TC-14](#tc-14--fresh-staff-basket-cannot-sell-actual-zero), [TC-17](#tc-17--in-person-assigned-seat-sale--box-office-and-pos) | SwitchState = Off; execute both apps | Actual available tickets/seats sell; exhausted tickets and owned seats do not. |
| Native Mobile Box Office and POS | [TC-15](#tc-15--mobile-box-office-and-pos--available-inventory), [TC-16](#tc-16--mobile-box-office-and-pos--actual-zero-inventory), [TC-17](#tc-17--in-person-assigned-seat-sale--box-office-and-pos) | SwitchState = Off; both native staff entries | Staff sale and seat ownership remain correct. |
| Customer kiosk — single day and recurring | [TC-18](#tc-18--customer-kiosk--public-selection-and-control-purchase) | SwitchState = Off; both KioskEvent values | Saved TRUE is ignored by fresh selection; control purchase completes. |
| Staff hold/group-sale checkout | [TC-22](#tc-22--staff-checkout-of-an-existing-hold-or-group-sale) | SwitchState = Off; BasicHold and GroupSale; Web Box Office and Electron | Existing allocation completes without an empty-cart redirect or sellout rejection. |
| Allocated hold links / waitlist / refund return | [TC-23](#tc-23--existing-allocated-hold-link), [TC-25](#tc-25--existing-waitlist-entry), [TC-26](#tc-26--refund-an-internal-sale-without-reopening-public-sales-or-changing-the-refund-amount) | Off; all hold values; WaitlistState = SwitchOffEmpty | Existing access and actual sold-out behavior remain; returned inventory reopens publicly. |
| Existing package OFF baseline | [SPT-429](https://app.qase.io/case/SPT-429), [SPT-3334](https://app.qase.io/case/SPT-3334), [SPT-3860](https://app.qase.io/case/SPT-3860) | Use the separate OFF regression setup | Existing package purchase remains available. TC-24 and TC-31–TC-36 below are now ON-only acceptance cases. |

### Pass 2 — Global switch ON: new behavior and regression

The saved ticket value now matters: TRUE blocks normal public sale, FALSE follows actual availability. Staff and validated allocated holds retain their distinct rules.

| Area to check | Case | Run these values | Expected result |
| --- | --- | --- | --- |
| All fresh public purchase entry points above | [TC-02](#tc-02--global-switch-on--forced-sellout-across-public-purchase-entry-points) | Every PurchaseEntry, including all four mobile app entries | TRUE blocks the target; FALSE control completes purchase through the same entry. |
| Void an internal sale, retain sellout, then clear the ticket field | [TC-03](#tc-03--void-an-internal-sale-keep-public-sales-closed-then-reopen-the-ticket) | Global ON throughout | Void returns inventory without refunding money; public sale reopens only after the ticket checkbox is cleared. |
| Save, clear at positive/zero inventory, Cancel | [TC-04](#tc-04--save-the-public-sellout-without-changing-inventory), [TC-05](#tc-05--clear-the-setting-at-positive-and-zero-remaining-inventory), [TC-08](#tc-08--cancel-an-unsaved-checkbox-change) | Both RemainingTickets values | Saved state persists; actual zero never reopens; Cancel does not save. |
| Event soldout and recovery after 25 minutes | [TC-09](#tc-09--all-ticket-types-produce-event-sellout-after-25-minutes), [TC-06](#tc-06--one-available-type-reopens-the-event) | AllForced, AllEmpty, Mixed; then reopen one stocked type | Event-level soldout and inverse reach page, widgets, calendar and discovery. |
| Recurring inheritance and single occurrence reopened | [TC-07](#tc-07--recurring-event-inheritance-and-one-occurrence-reopened) | Matching parent/child values | Both children inherit; clearing one child reopens only that occurrence. |
| Assigned seating across all mapped entry points | [TC-10](#tc-10--a-seat-with-only-a-sold-out-ticket-type), [TC-11](#tc-11--a-seat-with-available-and-sold-out-ticket-types) | SwitchOnForced and SwitchOnEmpty; each SeatEntry | Sole unavailable type blocks seat; mixed seat permits only available type. |
| Best-available seating | [TC-12](#tc-12--public-best-available-seating--off-and-on) | SwitchState = On; every SeatHost | Forced target cannot allocate; available control gets the selected seat. |
| Already selected cart and all resume paths | [TC-19](#tc-19--existing-cart--resume-after-the-ticket-setting-changes) | SwitchState = On; every ResumeEntry | No completed order after the target becomes forced sold out. |
| Checkout links, ticket add-ons and upgrades | [TC-20](#tc-20--checkout-link--automatic-ticket-selection), [TC-21](#tc-21--checkout-ticket-add-on-and-upgrade-offers) | SwitchState = On; all mapped values | No forced ticket is added; existing allowed ticket is retained. |
| Web/Electron staff and native Mobile Box Office/POS | [TC-13](#tc-13--staff-sale-with-actual-inventory), [TC-14](#tc-14--fresh-staff-basket-cannot-sell-actual-zero), [TC-15](#tc-15--mobile-box-office-and-pos--available-inventory), [TC-16](#tc-16--mobile-box-office-and-pos--actual-zero-inventory), [TC-17](#tc-17--in-person-assigned-seat-sale--box-office-and-pos) | SwitchState = On; every mapped app/seat entry | Actual inventory is still sellable internally; no oversell. |
| Customer kiosk | [TC-18](#tc-18--customer-kiosk--public-selection-and-control-purchase) | SwitchState = On; both KioskEvent values | Fresh selection blocks target; unforced control can complete. Existing-cart gap stays open. |
| Staff hold/group-sale checkout | [TC-22](#tc-22--staff-checkout-of-an-existing-hold-or-group-sale) | SwitchState = On; BasicHold and GroupSale; Web Box Office and Electron | The saved public-sellout value does not block an allocated staff sale. |
| Allocated holds, waitlists and refund return | [TC-23](#tc-23--existing-allocated-hold-link), [TC-25](#tc-25--existing-waitlist-entry), [TC-26](#tc-26--refund-an-internal-sale-without-reopening-public-sales-or-changing-the-refund-amount) | On; all hold values; WaitlistState = SwitchOnForced | Allocations and waitlist signup work; refund does not reopen a forced type. |
| Packages: preset, custom, seating and ticket + product | [TC-24](#tc-24--preset-packages--parent-restriction-and-included-ticket-access), [TC-31](#tc-31--custom-packages--required-choices-and-publicly-sold-out-included-tickets), [TC-32](#tc-32--assigned-seat-packages--included-public-sellout-and-seat-ownership), [TC-33](#tc-33--ticket--product-packages--selection-quantities-and-fulfillment) | Global ON throughout; parent checked → unchecked, included tickets remain checked | Parent blocks public purchase; clearing only the parent permits the complete configured contents. |
| Package checkout after sellout, actual shortages and in-person sales | [TC-34](#tc-34--existing-package-cart--parent-becomes-publicly-sold-out), [TC-35](#tc-35--package-contents-actually-unavailable--no-overselling), [TC-36](#tc-36--in-person-package-sale--tickets-and-products-remain-sellable) | Global ON throughout; use each case’s component setup | Final checkout rejects a forced parent; actual shortages still block; in-person sales work on actual stock. |
| Refund, release a hold, add inventory, or exchange the original sale | TC-26, TC-28, TC-29, TC-30 | Global ON; keep the original type checked until the explicit clear step | Actual inventory returns; customers remain blocked; clearing the ticket field restores selection. Refund/credit previews remain unchanged. |

### Switch-transition smoke

Run **[TC-27](#tc-27--switch-onoffon-smoke-with-a-stored-true-setting) once on public web and once through the event widget**: ON → OFF → ON while the saved ticket value stays TRUE. This is the deliberate switch-change test; do not mix its switch changes into either fixed-state pass.

### Execution recording

For each entry record **case + parameter values + global switch + saved ticket value + actual remaining + app/host + OS + event/date/seat + result**. Mobile browser and native customer app are separate entries. Use desktop/mobile views where listed and record iOS/Android for app runs. A missing host, record or app configuration is Blocked for that entry, not Passed or silently replaced.

The Qase regression analysis below adds one-click wallet checkout and attraction-started staff checkout to the execution scope; both still need OFF/ON records. The full scope ledger below names unresolved/deferred paths such as kiosk existing-cart final purchase, itemized exchanges and other special ticket-eligibility paths. These are not closed by this smoke set.

## Commit-scoped regression focus — 6cc497ff9b

Reviewed the exact backend commit `6cc497ff9bfacfc4161930e2a31dee3e70287ac8` against its single parent `be0222383e355ac3f687a1361d9fec5ecd95ba78`. Both local repos are on `develop`; the supplied commit exists in `web-app`, not `showpass-frontend`. This review uses the commit delta for backend scope and current frontend source for the client callers. No execution results or Qase changes were made during this review.

**Finding:** actual inventory arithmetic, the inventory recalculation service, sold-out repair/outbox processing, refund/void/exchange implementations and payment processing were not edited by this commit. Shared basket sold-out validation **was** edited: `BaseTicketBasketSerializer.clean_validate_is_tt_sold_out` now resolves the payment-plan issued type, retains the held-allocation exception, and calls a new public-only restriction hook. Public basket allocation and final checkout, public ticket/event responses, calendar SQL, discovery projections, the editor and recurring-field inheritance also changed. Calling this only a display change would miss the checkout risk.

For the current regression pass, keep **enable_force_public_sold_out OFF throughout**. Admin-prepared saved TRUE values deliberately test whether the disabled feature affects existing behavior; include ordinary existing/default-false data as a baseline. The organizer-facing toggle and its help text must remain hidden.

Prioritize these proof targets:

1. **Editor and saved settings:** hidden toggle/help text; existing single-day and recurring ticket-type edits still save and reopen normally. The model/serializer additions and recurring propagation execute outside the UI gate.
2. **Selection through completed purchase:** actual-positive tickets with saved TRUE still sell, while actual-zero tickets remain unavailable. Include fresh selection, quantity changes and an existing cart through final confirmation. Verify the right ticket/order and the expected inventory decrement. SPT-402 proves visibility/selection only; TC-01 and TC-19 OFF supply completed-purchase proof.
3. **Public availability across changed response paths:** single-day and recurring detail, selected dates, attraction/calendar views, widgets, search/listing cards and the native customer app must agree with actual availability. Keep real zero-inventory controls; a saved TRUE value alone must not mark an available item sold out. Calendar and discovery are separate query/cache paths, not covered by checking one detail page.
4. **Shared-validation exceptions:** ordinary in-person Box Office/POS sales, real allocated hold checkout, package parent/child selection, and payment-plan tickets. These deserve targeted regression because the shared validation method changed even with the new switch OFF. Hold cases exist locally. Existing Qase package baselines supply OFF regression procedures; the expanded local package acceptance cases now keep ON fixed. The focused payment-plan case remains deferred in the scope ledger.
5. **Seating:** sole exhausted type, mixed available/exhausted choices on one seat, best-available selection and an in-person seat sale. Check issued-seat ownership and no double allocation. Seating algorithms were not edited, but their clients consume the changed availability values and basket validation.

A representative inventory-return smoke is useful. An exhaustive refund, void, exchange, payment-provider or financial-calculation matrix is not the first priority for this commit's OFF regression: those implementations were not edited. The requested ON retention lifecycles remain separate feature acceptance coverage; they are not removed from this note.

Evidence: backend `apps/tickets/api/serializers/general.py`, `apps/tickets/api/user_based/serializers/baskets.py`, `apps/tickets/api/public/serializers/{ticket_types,events}.py`, `apps/tickets/models/event_management/event_ticket_types.py`, `apps/main/templates/tickets/dialogs/_edit-ticket-type.html`, `apps/venues/queries/calendar/{calendar_events_query,calendar_event_detail_query,calendar_public_sold_out}.py`, `apps/main/queries/discovery_materialized_view.py`. Frontend callers: `packages/core/src/shared/modules/ticket-types/utils/ticket-type-utils.ts`, `packages/core/src/shared/modules/events/utils/event-utils.ts`, `packages/core/src/shared/modules/seating/services/SeatingService.ts`, and public/venue basket repositories in F3. Added helper tests use mocks; reading them does not establish an end-to-end pass.

## Minimum Execution Set

Use the two passes above as the execution order. For the requested purchase-entry regression, **every listed PurchaseEntry and named client needs an OFF and ON record**; testing one web event does not cover the rest. Keep one baseline purchase per fresh public entry/state, both native staff modes, Electron, the customer app, and the listed cart handoffs.

For seating, run each SeatEntry with SwitchOffEmpty and SwitchOnForced; run SwitchOnEmpty at least once per distinct host family (web page, widget, mobile app). Run both positive and actual-zero staff inventory cases in both states. Keep the switch-OFF actual-empty 25-minute check, all three switch-ON sellout reasons and the stocked-type inverse, and execute [TC-27](#tc-27--switch-onoffon-smoke-with-a-stored-true-setting) separately.

Do not repeat every event/seat/payment permutation across every device unless a failure or source difference justifies it. Still record the deliberately sampled dimensions and all missing entry-point evidence. Run a clean available-ticket purchase using [SPT-3290](https://app.qase.io/case/SPT-3290) with global ON and the ticket field unchecked; this preserves clean-success proof without the former duplicate TC-03. The core organizer lifecycle also requires TC-03, TC-26, TC-28, TC-29 and TC-30. No result is currently Passed; blocked/deferred ledger rows prevent claiming full purchase-flow sign-off.

For **package acceptance**, keep global ON and run TC-24 for each PackageShape, plus its recurring/attraction and widget/app entries where an existing supported package is available. Run TC-31; both TC-32 seating configurations; both TC-33 bundle compositions; each TC-34 package-content value; each TC-35 shortage; and TC-36 in Web Box Office and Electron. Cover each supported shape/entry at least once without inventing unsupported combinations. Record missing supported setup as Blocked. Validate existing barcode mode in every successful order; sample both parent-barcode and separate-item configurations across the set. These are manual drafts, not executed results.

## Testing Intent

We are testing whether customers see and can buy only publicly available tickets while employees can still sell actual available inventory; this matters because a forced sellout must neither reopen accidentally nor prevent controlled sales, and we will prove it through saved settings, public ticket and event states, rejected checkout, and completed orders.

| Field | Answer |
| --- | --- |
| Criticality bucket | Inventory/ownership; live sales completion; asynchronous public availability |
| Business invariant | With the switch on, public availability requires both actual inventory and no public sellout setting; the setting does not consume inventory or grant extra capacity. |
| Actor impact | Customers, event employees, Box Office employees, and customers purchasing allocated holds |
| Failure mode | Public sale of intentionally unavailable tickets; oversell after clearing the setting; blocked staff sales; stale event sellout; incorrect seat choices |
| Observable proof | Saved checkbox survives reopening; sold-out tickets cannot be bought; one available ticket can be bought; staff sale has one transaction and one ticket; event state changes after the requested interval. |
| Source of truth | Backend model, serializers, SQL, basket validation, inventory service; frontend editor and public selection code |
| Primary surfaces | Existing Dashboard event editor, public event page, event widget, calendar widget, discovery, Web/Electron Box Office, mobile customer app, native Mobile Box Office/POS, kiosk, ticket offers and checkout links, public hold checkout |
| In scope | On/off rollout, per-type setting, zero/positive inventory, event aggregation and recovery, single/shared seats, stale checkout, staff sale, allocated hold links, refund return, package boundary, recurring children, waitlist entry |
| Out of scope | Changing payment/refund formulas, full refund/exchange financial matrix, seating-map editing, new bulk editor, unrelated browser/device permutations (the supported purchase clients remain in scope), provider failure/cancel/webhook matrix unrelated to public availability |
| Confidence | High for field name and backend gates; medium overall because UI requirements and seating display differ from the supplied text, and no deployment was inspected. |


## Proof Target Map

| Proof | Why it matters | Cases |
| --- | --- | --- |
| P1 — Public restriction and rollback | Customers cannot bypass an active sellout; rollback restores actual-inventory behavior. | TC-03, TC-27, TC-04, TC-05, TC-19, TC-08, TC-01, TC-02, TC-18, TC-20, TC-21 |
| P2 — Event availability converges | Individual sellouts and reopening are reflected in event entry points. | TC-09, TC-06, TC-07, TC-01, TC-02 |
| P3 — Seat availability stays correct | An unavailable ticket cannot claim a seat; another available ticket can. | TC-10, TC-11, TC-12, TC-17 |
| P4 — Actual inventory and allocated access remain usable | Staff and allocated hold customers retain supported access; zero stock remains zero. | TC-03, TC-13, TC-14, TC-23, TC-26, TC-15, TC-16, TC-17, TC-22, TC-28, TC-29, TC-30 |
| P5 — Related public sales preserve their rules | Package restrictions apply to the purchased parent; included ticket/product quantities, selections, seats and real stock remain correct; waitlist signup stays available. | TC-24, TC-25, TC-31–TC-36 |


## Qase-ready Manual Test Cases

Each case is complete below. The shared cases are stored once; the pass checklist tells you which state to execute. Qase regression references appear directly under each case heading; they are note-only links and are not part of the fields to copy into Qase. A related or partial match does not mean the local draft already has that Qase ID.

### Global switch OFF — fresh public purchase regression

#### TC-01 — Global switch OFF — regression across public purchase entry points

> **Qase regression references (note only)**
>
> **Purchase baselines:** [Single-day (SPT-3287)](https://app.qase.io/case/SPT-3287), [recurring (SPT-3288)](https://app.qase.io/case/SPT-3288), [free checkout (SPT-3290)](https://app.qase.io/case/SPT-3290), [attraction (SPT-3513)](https://app.qase.io/case/SPT-3513), [mobile app (SPT-4003)](https://app.qase.io/case/SPT-4003).
> **Actual sold-out regression:** [Ticket availability (SPT-402)](https://app.qase.io/case/SPT-402) and [calendar availability (SPT-3505)](https://app.qase.io/case/SPT-3505).
> **Partial entry coverage:** [quantity-first (SPT-3512)](https://app.qase.io/case/SPT-3512), [calendar hosts (SPT-4979)](https://app.qase.io/case/SPT-4979), [website handoff (SPT-4981)](https://app.qase.io/case/SPT-4981), [SDK modal/embedded (SPT-4982)](https://app.qase.io/case/SPT-4982), [native Saved (SPT-2024)](https://app.qase.io/case/SPT-2024). These stop before completing the purchase from each named entry; legacy calendar remains a gap.
> **Match scope:** SPT-402 now keeps the global switch OFF and covers actual-zero rejection plus adding/removing an available comparison ticket. Both types have Public sold out = Yes to detect an effect from the disabled feature. It does not complete a purchase or cover all 17 PurchaseEntry values; retain TC-01 for that proof.

**Title:** Core - Tickets - Global switch OFF preserves public purchases despite a saved public-sellout value

**Description:** With enable_force_public_sold_out OFF and the selected ticket type’s public_sold_out value TRUE, a customer can still select and purchase an actually available ticket through the chosen entry point. The saved value must have no public sales effect.

**Global switch (`enable_force_public_sold_out`): OFF.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE on the selected type; it must be ignored.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| PurchaseEntry | Platform | Where the customer starts | Required starting state |
| --- | --- | --- | --- |
| EventDetailSingleDay | WebPublic | Open the selected single-day event’s public detail page and its ticket selection. | One date; no ticket selected. |
| EventDetailRecurring | WebPublic | Open the recurring event’s public detail page, select the recorded date/time and open its tickets. | Parent page → selected occurrence; apply the setting to that occurrence’s ticket type. |
| RecurringOccurrenceLink | WebPublic | Open the public link for a specific occurrence, recorded from that occurrence’s event details. | An occurrence is already identified; do not start at the parent calendar. |
| AttractionCalendar | WebPublic | Open the attraction page, choose its recorded ticket section, then select the date and time. | Attraction section opens a date/time selection modal. |
| AttractionQuantityFirst | WebPublic | Open the attraction’s ticket section, request 1 ticket, then select the date and time. | Use a section configured to ask for quantity before the calendar. |
| AttractionSingleEvent | WebPublic | Open the attraction page and select the recorded single-event section’s purchase button. | A fixed event is supplied by the section rather than chosen from the full calendar. |
| EventWidgetModal | Widget | On the host website, select the recorded event purchase button. | Ticket purchase opens in a modal; begin with an empty cart. |
| EventWidgetEmbedded | Widget | Open the host page and use its event purchase panel. | Ticket selection is embedded in the host page. |
| CalendarWidget | Widget | Open the organizer calendar widget, select the recorded date/time and event. | Current calendar widget opens the selected event’s tickets. |
| LegacyCalendarWidget | Widget | Open the existing older organizer calendar widget, select the recorded date/time and event. | Use a host confirmed to use the older calendar; retain its checkout handoff. |
| AttractionWidget | Widget | Open the attraction’s calendar widget and select the recorded section/date/time. | Attraction-scoped widget; selected child event owns the ticket setting. |
| WebsitePurchaseButton | Widget | Open the organization’s Showpass-built website and select the event’s recorded purchase button. | Website event modal; purchase continues in the modal. |
| WebsiteCheckoutHandoff | Widget | Open the organization’s Showpass-built website, select its recorded event purchase button and continue to its checkout page after choosing tickets. | Website configured with a separate checkout page; basket must survive that handoff. |
| MobileExplore | React Native Public | In the Showpass app, open Explore, search for the single-day event and tap its event card. | Native discovery → single-day public event page inside the app; remain in the app. |
| MobileRecurring | React Native Public | In the Showpass app, open Explore → recurring event card, select the recorded date/time and open its tickets. | The customer stays inside the app; the selected occurrence owns the ticket setting. |
| MobileAttraction | React Native Public | In the Showpass app, open Explore → attraction card, select the recorded ticket section and date/time. | Native discovery opens the attraction purchase flow inside the app. |
| MobileSaved | React Native Public | In the Showpass app, open Saved and tap the recorded event. | Event is already saved to the signed-in customer account; opens purchase inside the app. |

**Parameters:**

PurchaseEntry: EventDetailSingleDay, EventDetailRecurring, RecurringOccurrenceLink, AttractionCalendar, AttractionQuantityFirst, AttractionSingleEvent, EventWidgetModal, EventWidgetEmbedded, CalendarWidget, LegacyCalendarWidget, AttractionWidget, WebsitePurchaseButton, WebsiteCheckoutHandoff, MobileExplore, MobileRecurring, MobileAttraction, MobileSaved

**Preconditions:**

* Global switch enable_force_public_sold_out is OFF for the entire case; a release owner records its original value and coordinates this global change.
* The selected ticket type has Public sold out = Yes; the control has Public sold out = No.
* Use a published future event with two available free public, on-sale general-admission ticket types and no waitlist, package, password, paid add-on or event-wide capacity block. The selected type has at least 2 actual tickets remaining; the control type has at least 2 remaining and Public sold out = No.
* Include a third public on-sale ticket type with a positive finite cap fully consumed by owned test purchases, leaving 0 actual remaining; record its name. Do not set configured Inventory to 0.
* For recurring/attraction entries, prepare those values on the actual selected occurrence’s ticket types. Record the attraction section, event/date/time, both ticket-type names and the selected host link or app entry.
* An administrator can prepare saved values in Admin → Tickets → Ticket types: search by event/type name, open the matching row, set Public sold out and Save. Record original values; do not edit calculated inventory flags.
* Use the PurchaseEntry mapping to select the required host/configuration. Modal and embedded hosts must point to the recorded event; website handoff requires a configured checkout page. MobileSaved requires the event already saved by the signed-in customer.
* Start with an empty customer cart and customer-owned contact information. Keep mobile-app executions inside the Showpass app rather than opening an external browser.

**Tags:** public, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected purchase entry point using the path in the Description. | PurchaseEntry; recorded event/date/time | The selected event/date is available for purchase. |
| Attempt to select one ticket of the actually exhausted type. | Recorded third type; 0 remaining | The exhausted type remains unavailable and no ticket is added. |
| Select one ticket of the type with saved Public sold out = Yes. | Quantity 1 | One ticket is accepted into the cart despite the saved setting. |
| Continue through that entry point to checkout. | For the website handoff, use its configured checkout button. | The same event/date and one selected ticket remain in the order summary. |
| Enter the required customer information. | Customer-owned details | The checkout can continue. |
| Accept the displayed terms. | — | The order can be submitted. |
| Select Complete transaction. | Zero-total order | One successful order confirmation is shown. |
| Open the tickets from the confirmation. | New order | Exactly one ticket for the selected event/date and type is accessible. |

**Postconditions:**

* Retain the order and ticket reference; restore and reopen the administrator-prepared ticket settings and global switch record to verify their original values.
* Record the actual app/host and date selected for this parameter run; a web-browser pass does not count as a mobile-app pass.

### Global switch ON — fresh public purchase and saved-setting behavior

#### TC-02 — Global switch ON — forced sellout across public purchase entry points

**Qase case:** [SPT-5230](https://app.qase.io/case/SPT-5230) — Core - Inventory (suite 625). Created from TC-02; all 8 steps, 17 PurchaseEntry values, description/setup tables and tags verified after creation. Title synced from Qase on 2026-09-15; all 8 steps, 17 PurchaseEntry values and tags still match. No Qase fields were changed during this merge.

> **Qase regression references (note only)**
>
> **Purchase baselines:** [Single-day (SPT-3287)](https://app.qase.io/case/SPT-3287), [recurring (SPT-3288)](https://app.qase.io/case/SPT-3288), [free checkout (SPT-3290)](https://app.qase.io/case/SPT-3290), [attraction (SPT-3513)](https://app.qase.io/case/SPT-3513), [mobile app (SPT-4003)](https://app.qase.io/case/SPT-4003).
> **Actual sold-out regression:** [Ticket availability (SPT-402)](https://app.qase.io/case/SPT-402) and [calendar availability (SPT-3505)](https://app.qase.io/case/SPT-3505).
> **Partial entry coverage:** [quantity-first (SPT-3512)](https://app.qase.io/case/SPT-3512), [calendar hosts (SPT-4979)](https://app.qase.io/case/SPT-4979), [website handoff (SPT-4981)](https://app.qase.io/case/SPT-4981), [SDK modal/embedded (SPT-4982)](https://app.qase.io/case/SPT-4982), [native Saved (SPT-2024)](https://app.qase.io/case/SPT-2024). These stop before completing the purchase from each named entry; legacy calendar remains a gap.
> **Match scope:** existing purchase cases cover the available control and existing actual-zero rejection. **No direct forced-sellout equivalent found** for the TRUE target; keep the ON-specific assertions here.

**Title:** Core - Tickets - Verify that Force Public Sold Out is Respected

**Description:** With enable_force_public_sold_out ON, a ticket type with public_sold_out TRUE is unavailable even when inventory remains. A second type with the ticket setting FALSE remains purchasable through the same entry point.

**Global switch (`enable_force_public_sold_out`): ON.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE on target; FALSE on available control.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| PurchaseEntry | Platform | Where the customer starts | Required starting state |
| --- | --- | --- | --- |
| EventDetailSingleDay | WebPublic | Open the selected single-day event’s public detail page and its ticket selection. | One date; no ticket selected. |
| EventDetailRecurring | WebPublic | Open the recurring event’s public detail page, select the recorded date/time and open its tickets. | Parent page → selected occurrence; apply the setting to that occurrence’s ticket type. |
| RecurringOccurrenceLink | WebPublic | Open the public link for a specific occurrence, recorded from that occurrence’s event details. | An occurrence is already identified; do not start at the parent calendar. |
| AttractionCalendar | WebPublic | Open the attraction page, choose its recorded ticket section, then select the date and time. | Attraction section opens a date/time selection modal. |
| AttractionQuantityFirst | WebPublic | Open the attraction’s ticket section, request 1 ticket, then select the date and time. | Use a section configured to ask for quantity before the calendar. |
| AttractionSingleEvent | WebPublic | Open the attraction page and select the recorded single-event section’s purchase button. | A fixed event is supplied by the section rather than chosen from the full calendar. |
| EventWidgetModal | Widget | On the host website, select the recorded event purchase button. | Ticket purchase opens in a modal; begin with an empty cart. |
| EventWidgetEmbedded | Widget | Open the host page and use its event purchase panel. | Ticket selection is embedded in the host page. |
| CalendarWidget | Widget | Open the organizer calendar widget, select the recorded date/time and event. | Current calendar widget opens the selected event’s tickets. |
| LegacyCalendarWidget | Widget | Open the existing older organizer calendar widget, select the recorded date/time and event. | Use a host confirmed to use the older calendar; retain its checkout handoff. |
| AttractionWidget | Widget | Open the attraction’s calendar widget and select the recorded section/date/time. | Attraction-scoped widget; selected child event owns the ticket setting. |
| WebsitePurchaseButton | Widget | Open the organization’s Showpass-built website and select the event’s recorded purchase button. | Website event modal; purchase continues in the modal. |
| WebsiteCheckoutHandoff | Widget | Open the organization’s Showpass-built website, select its recorded event purchase button and continue to its checkout page after choosing tickets. | Website configured with a separate checkout page; basket must survive that handoff. |
| MobileExplore | React Native Public | In the Showpass app, open Explore, search for the single-day event and tap its event card. | Native discovery → single-day public event page inside the app; remain in the app. |
| MobileRecurring | React Native Public | In the Showpass app, open Explore → recurring event card, select the recorded date/time and open its tickets. | The customer stays inside the app; the selected occurrence owns the ticket setting. |
| MobileAttraction | React Native Public | In the Showpass app, open Explore → attraction card, select the recorded ticket section and date/time. | Native discovery opens the attraction purchase flow inside the app. |
| MobileSaved | React Native Public | In the Showpass app, open Saved and tap the recorded event. | Event is already saved to the signed-in customer account; opens purchase inside the app. |

**Parameters:**

PurchaseEntry: EventDetailSingleDay, EventDetailRecurring, RecurringOccurrenceLink, AttractionCalendar, AttractionQuantityFirst, AttractionSingleEvent, EventWidgetModal, EventWidgetEmbedded, CalendarWidget, LegacyCalendarWidget, AttractionWidget, WebsitePurchaseButton, WebsiteCheckoutHandoff, MobileExplore, MobileRecurring, MobileAttraction, MobileSaved

**Preconditions:**

* Global switch enable_force_public_sold_out is ON for the entire case.
* The selected ticket type has Public sold out = Yes; the available control has Public sold out = No.
* Use a published future event with two available free public, on-sale general-admission ticket types and no waitlist, package, password, paid add-on or event-wide capacity block. The selected type has at least 2 actual tickets remaining; the control type has at least 2 remaining and Public sold out = No.
* Include a third public on-sale ticket type with a positive finite cap fully consumed by owned test purchases, leaving 0 actual remaining; record its name. Do not set configured Inventory to 0.
* For recurring/attraction entries, prepare those values on the actual selected occurrence’s ticket types. Record the attraction section, event/date/time, both ticket-type names and the selected host link or app entry.
* An administrator can prepare saved values in Admin → Tickets → Ticket types: search by event/type name, open the matching row, set Public sold out and Save. Record original values; do not edit calculated inventory flags.
* Use the PurchaseEntry mapping to select the required host/configuration. Modal and embedded hosts must point to the recorded event; website handoff requires a configured checkout page. MobileSaved requires the event already saved by the signed-in customer.
* Start with an empty customer cart and customer-owned contact information. Keep mobile-app executions inside the Showpass app rather than opening an external browser.

**Tags:** public, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected purchase entry point using the path in the Description. | PurchaseEntry; recorded event/date/time | The event/date remains accessible because the control type is available. |
| Attempt to select one ticket of the actually exhausted type. | Recorded third type; 0 remaining | The exhausted type remains unavailable and no ticket is added. |
| Inspect the selected ticket type and attempt normal selection. | Type with Public sold out = Yes | The type is sold out or not offered for purchase, and cannot enter the cart. |
| Select one ticket of the available control type. | Public sold out = No; quantity 1 | One control ticket enters the cart. |
| Continue through that entry point to checkout. | Recorded host/app path | The summary contains only the control ticket for the selected event/date. |
| Enter customer information and accept the displayed terms. | Customer-owned details | The zero-total order can be submitted. |
| Select Complete transaction. | Control ticket only | One successful order confirmation is shown. |
| Open the tickets from the confirmation. | New order | One control ticket is issued and no forced ticket is issued. |

**Postconditions:**

* Retain the control order; restore and reopen the original ticket-type settings to verify restoration.
* Record any entry point that offers the forced type but rejects it later as a separate display mismatch; successful backend rejection does not pass the earlier selection check.

#### TC-03 — Void an internal sale, keep public sales closed, then reopen the ticket

> **Qase regression references (note only):** [Void event tickets and return inventory (SPT-938)](https://app.qase.io/case/SPT-938) is a related regression baseline identified in the prior Qase scan. The forced-sellout and reopening sequence is the addition here.

**Title:** Dashboard - Tickets - Voiding an internal sale keeps public sales closed until the ticket setting is cleared

**Description:** An organizer voids the internal sale that used the last ticket. The original ticket becomes void and inventory returns, but customers still cannot buy it while Show as sold out publicly is checked. Clearing that checkbox allows a customer to select the returned ticket.

**Global switch (`enable_force_public_sold_out`): ON throughout; do not turn it OFF to reopen this ticket.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Checked during the void and inventory return; cleared only in the reopening steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Employee permissions: Manage Events, Administer Transactions, Use Box Office and View Box Office Stats.
* Global enable_force_public_sold_out is ON. The release owner coordinates this global state and records its original value.
* Select a published future event with one public on-sale general-admission ticket type, a positive inventory cap of 1, and exactly one completed internal cash sale consuming that ticket. The order belongs to the execution team. Record the event, type, transaction, original amount and ticket barcode.
* The ticket is unscanned and has not been transferred, refunded or exchanged. There are no other orders/holds, waitlist, resale-to-another-type setting, package, refund protection, shipping or event-wide capacity restriction.
* The organizer has enabled Show as sold out publicly for this type through Manage Events → Edit → Ticket Types → General, then Next → Save Event. Record the original checkbox value. No real customer refund is owed for this internal test sale.

**Tags:** dashboard, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions and find the recorded internal cash sale. | Recorded transaction | The transaction contains exactly the one ticket being voided. |
| Open the transaction’s Void action. | One-ticket transaction | The Void transaction dialog shows the ticket under Items to void. |
| Select all items, then select Void. | The recorded one-ticket transaction only | The confirmation warns that the tickets will become void and that voiding does not refund money. |
| Select Yes. | Confirm once | The void completes successfully; do not treat the processing message as completion. |
| Reopen the transaction and its ticket details. | Original ticket barcode | The original ticket is marked Voided; no cash refund was recorded. |
| Open Box Office → Sell and select the same event. | Same type | Actual remaining inventory returns from 0 to 1 after processing completes. |
| As the customer, open a fresh public event page and attempt to select that type. | Same type; no hold link | The type remains sold out and cannot be added to the cart. |
| Open Manage Events → the event → Edit → Ticket Types → edit the same type. | General tab | Show as sold out publicly is still checked. |
| Uncheck Show as sold out publicly. | Leave the global switch ON | The ticket-type checkbox is unchecked. |
| Select Next, then Save Event. | Same type | The event saves successfully. |
| Reopen the same ticket-type editor. | General tab | The checkbox is still unchecked. |
| As the customer, reopen the public event page and select one returned ticket. | Quantity 1 | The ticket can be added to the cart for the correct event and type. |

**Postconditions:**

* Remove the newly selected public ticket from the cart. Restore and reopen the original ticket checkbox and global switch values.
* Retain the original sale and void records; do not recreate or reactivate the voided ticket. Record inventory-return and public-display failures separately.

#### TC-04 — Save the public sellout without changing inventory

> **Qase regression references (note only)**
>
> **No corresponding Qase case found** for saving the public-sellout checkbox while preserving actual inventory.

**Title:** Dashboard - Tickets - Save Show as sold out publicly without changing the ticket inventory

**Description:** An employee enables the public-sellout checkbox on an available ticket type, saves the event and reopens the editor. Customers then see the type as sold out while its configured inventory stays unchanged.

**Global switch (`enable_force_public_sold_out`): ON.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Unchecked → checked; save the ticket setting.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer owns this event and can inspect the selected type’s remaining inventory in Box Office with Use Box Office and View Box Office Stats; record the starting count with no other sales in progress.
* Employee permission: **Manage Events**; global switch `enable_force_public_sold_out` on.
* Select a published future event with an on-sale public ticket type, at least 2 remaining, no password or waitlist, and **Show as sold out publicly** unchecked. Record its Inventory value and public event page.

**Tags:** dashboard, tickets, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the customer, open the public event page and add one ticket of the selected type. | Quantity 1 | The type is purchasable before the organizer changes its setting. |
| Remove that ticket from the cart. | Same ticket | No public reservation remains. |
| Open Manage Events → select the event → Edit → Ticket Types → edit the selected type. | General tab | The dialog shows Inventory, Visibility, **Show as sold out publicly**, its public-versus-Box-Office explanation, Next and Cancel. |
| Check **Show as sold out publicly**. | Checked | The checkbox is checked and the Inventory value is unchanged. |
| Select Next. | — | The event editing form is shown. |
| Select Save Event. | — | The event save completes successfully. |
| Reopen Edit → Ticket Types → the same ticket type. | General tab | The checkbox remains checked and Inventory equals the recorded value. |
| Open the public event page. | Same type | The ticket type is sold out and cannot be selected. |
| Open Box Office → Sell and select the event. | Same type | The remaining count matches the starting count; enabling public sellout did not consume tickets. |

**Postconditions:** Uncheck **Show as sold out publicly**, select Next and Save Event, and reopen the dialog to verify restoration.

#### TC-05 — Clear the setting at positive and zero remaining inventory

> **Qase regression references (note only)**
>
> **Partial match:** [Restore availability by increasing inventory (SPT-766)](https://app.qase.io/case/SPT-766) and [actual sold-out rejection (SPT-402)](https://app.qase.io/case/SPT-402). These do not clear the checkbox; increasing capacity is a different change. Keep the positive/zero-remaining checks here.

**Title:** Core - Tickets - Clearing public sellout respects the actual remaining tickets

**Description:** An employee clears the saved public-sellout setting. A customer can select the ticket type only if actual inventory remains; clearing the setting cannot reopen a type with zero remaining tickets.

**Global switch (`enable_force_public_sold_out`): ON.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Checked → unchecked; run both actual remaining-inventory values.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |
| Widget | Desktop |

**Parameters:**

RemainingTickets: Available, Empty

**Preconditions:**

* Employee permission: **Manage Events**; global switch `enable_force_public_sold_out` on.
* Select a published future event with a public on-sale type whose **Show as sold out publicly** is checked; no password, waitlist or event-wide capacity restriction applies. Record its Inventory value.
* For Available, have at least 2 tickets remaining. For Empty, use a positive inventory cap fully consumed by owned test purchases, leaving 0 remaining; do not set Inventory to 0. Include a second available type so the event can still be opened normally.
* Have the event’s public page or event widget.

**Tags:** public, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events → event → Edit → Ticket Types → edit the selected type. | General tab | **Show as sold out publicly** is checked. |
| Uncheck **Show as sold out publicly**. | Unchecked | The checkbox is unchecked. |
| Select Next. | — | The event editing form is shown. |
| Select Save Event. | — | The event save completes successfully. |
| Reopen the selected ticket type. | General tab | The checkbox remains unchecked and Inventory has not changed. |
| Open a fresh public event page or event widget. | Same type | Available: the type is selectable; Empty: the type remains sold out. |
| Attempt to select one ticket of the type using its displayed control. | Quantity 1 | Available: one ticket enters the cart; Empty: no ticket can be added. |

**Postconditions:**

* Remove any ticket added to the cart.
* Restore the original checkbox state through Next → Save Event and verify it after reopening; leave existing test purchases intact.

#### TC-06 — One available type reopens the event

> **Qase regression references (note only)**
>
> **Partial matches:** [Inventory recovery (SPT-766)](https://app.qase.io/case/SPT-766) and [calendar availability (SPT-3505)](https://app.qase.io/case/SPT-3505). Neither clears one stocked type’s public-sellout setting or proves the event reopens after 25 minutes.

**Title:** Core - Events - Reopen an event by clearing public sellout on one ticket type with inventory

**Description:** All public ticket types are unavailable, but one has actual inventory and is blocked only by its public-sellout setting. Clearing that one setting makes it selectable and removes the event-level sellout after 25 minutes; other unavailable types stay sold out.

**Global switch (`enable_force_public_sold_out`): ON.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Clear only the first type, which already has actual inventory.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events**; global switch `enable_force_public_sold_out` on.
* Select a published future event already showing sold out, with exactly two public on-sale types and no password/waitlist/event-wide capacity block. The first has at least 2 remaining and **Show as sold out publicly** checked; the second is actually empty or also checked.
* Have its public page, event widget, organizer calendar date and searchable name; record original checkbox values.

**Tags:** public, events, discovery

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events → event → Edit → Ticket Types → edit the first type. | General tab | **Show as sold out publicly** is checked. |
| Uncheck **Show as sold out publicly**. | First type only | The checkbox is unchecked. |
| Select Next. | — | The event editing form is shown. |
| Select Save Event and record the save time. | — | The save completes successfully. |
| Open a fresh public event page. | Same event | The first type is available for selection; record any stale sold-out state separately. |
| Wait until 25 minutes after the save. | Recorded save time | The observation time is at least 25 minutes later. |
| Reload the public event page. | Same event | The event is no longer sold out, the first type is selectable and the second remains unavailable. |
| Open a fresh event widget. | Same event | Only the reopened type is available for selection. |
| Open the organizer calendar widget and select the event’s date. | Recorded date | The event is offered as available. |
| Search Showpass for the exact event name. | Recorded name | The matching event result is no longer marked sold out. |
| Select one reopened ticket in the public event page or event widget. | Quantity 1 | One ticket is accepted into the cart. |

**Postconditions:**

* Remove the ticket from the cart and restore the checkbox through Next → Save Event; reopen it to verify restoration.
* Keep immediate and 25-minute observations separate, including any delayed recovery.

#### TC-07 — Recurring event inheritance and one occurrence reopened

> **Qase regression references (note only)**
>
> **No direct inheritance-setting case found.** [Recurring public purchase (SPT-3288)](https://app.qase.io/case/SPT-3288) is a purchase baseline; it does not prove checkbox inheritance or reopening only one occurrence.

**Title:** Dashboard - Events - Apply public sellout to matching recurring ticket types and reopen one occurrence

**Description:** A recurring event repeats on separate dates. When the employee enables public sellout on the parent ticket type, matching ticket types on two upcoming dates inherit it. Clearing it on one date makes only that occurrence available again.

**Global switch (`enable_force_public_sold_out`): ON.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Parent FALSE → TRUE; later clear one child occurrence.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events**; global switch `enable_force_public_sold_out` on.
* Select a published recurring event with exactly two upcoming public occurrences and one corresponding public on-sale ticket type per occurrence, each with at least 2 remaining; no password, waitlist, event-wide sellout or other available types apply.
* The parent and both child ticket types have **Show as sold out publicly** unchecked and matching inherited values; neither occurrence has an independent override. Record dates, public links and original settings. Choose an event owned for this execution because saving the parent changes both dates.

**Tags:** dashboard, events, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events → recurring event → Edit → Ticket Types → edit the parent type. | General tab | The parent’s public-sellout checkbox is unchecked. |
| Check **Show as sold out publicly**. | Checked | The checkbox is checked. |
| Select Next. | — | The parent event form is shown. |
| Select Save Event. | — | The parent save completes. |
| Open the first occurrence’s Edit → Ticket Types → matching type. | First recorded date | Its public-sellout checkbox is checked. |
| Open the second occurrence’s Edit → Ticket Types → matching type. | Second recorded date | Its public-sellout checkbox is checked. |
| Open each occurrence’s public ticket selection. | Both recorded dates | Both occurrences’ ticket types are sold out. |
| Open the recurring parent’s public page after the saved changes appear. | Both dates forced sold out | The parent is marked sold out because no public occurrence can be purchased. |
| In the first occurrence’s ticket editor, uncheck **Show as sold out publicly**. | First occurrence only | The checkbox is unchecked. |
| Select Next. | — | The first occurrence’s event form is shown. |
| Select Save Event. | — | The occurrence save completes. |
| Reopen both occurrences’ public ticket selections. | Both recorded dates | The first occurrence is selectable and the second remains sold out. |
| Open the recurring parent’s public event page. | First date reopened; second date still forced sold out | The customer can open date selection and reach the available first date. |
| Select the first date and add one ticket. | First date; quantity 1 | The cart contains the reopened date’s ticket, not the sold-out date’s ticket. |
| Remove that ticket, then select the second date. | Second date | The second date’s ticket remains unavailable. |

**Postconditions:** Remove any selected ticket from the cart. Restore and verify the parent and each child’s original values individually; do not assume restoring the parent resets an independently edited child.

#### TC-08 — Cancel an unsaved checkbox change

> **Qase regression references (note only)**
>
> **No corresponding Qase case found** for cancelling an unsaved public-sellout checkbox change.

**Title:** Dashboard - Tickets - Discard an unsaved public-sellout change

**Description:** An employee changes the public-sellout checkbox but cancels the ticket-type dialog. Reopening the dialog and the public event must show the original saved availability.

**Global switch (`enable_force_public_sold_out`): ON.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Unsaved change from unchecked to checked; Cancel must discard it.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events**; global switch `enable_force_public_sold_out` on.
* Select a published future event with a public on-sale ticket type, at least 2 remaining, no password or waitlist, and **Show as sold out publicly** unchecked. No other unsaved changes exist in the event editor.

**Tags:** dashboard, tickets, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events → event → Edit → Ticket Types → edit the selected type. | General tab | **Show as sold out publicly** is unchecked. |
| Check **Show as sold out publicly**. | Checked | The checkbox appears checked in the open dialog. |
| Select Cancel. | — | The ticket-type dialog closes. |
| Reopen the same ticket-type dialog. | General tab | **Show as sold out publicly** remains unchecked. |
| Open a fresh public event page. | Same type | The ticket type remains available for selection. |
| Add one ticket of the unchanged type from the public page. | Quantity 1 | The cancelled change has not blocked the customer’s selection. |
| Remove that ticket from the cart. | Same ticket | The cart is empty and the ticket setting remains unchanged. |

**Postconditions:** Leave the event editor without saving; the original saved setting remains unchanged.

### Shared regression — use the OFF or ON value from the current pass

#### TC-09 — All ticket types produce event sellout after 25 minutes

> **Qase regression references (note only)**
>
> **Partial matches:** [Event/timeslot sold-out state (SPT-402)](https://app.qase.io/case/SPT-402), [calendar availability (SPT-3505)](https://app.qase.io/case/SPT-3505) and [discovery indicators (SPT-214)](https://app.qase.io/case/SPT-214). None verifies forced/actual/mixed aggregation after 25 minutes.

**Title:** Core - Events - Show the event as sold out when every public ticket type is unavailable

**Description:** A customer views an event 25 minutes after every public ticket type becomes unavailable. Forced sellout, exhausted inventory and a mixture must all produce an event-level sold-out state on the public page, event widget, organizer calendar widget and discovery result.

**Global switch (`enable_force_public_sold_out`): OFF for SwitchOffAllEmpty; ON for AllForced / AllEmpty / Mixed.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Use SelloutReason; the OFF value is SwitchOffAllEmpty, and the ON pass uses the other three values.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |

**Parameters:**

SelloutReason: SwitchOffAllEmpty, AllForced, AllEmpty, Mixed

**Preconditions:**

* Global switch `enable_force_public_sold_out` is OFF for SwitchOffAllEmpty and ON for the other SelloutReason values; a release owner records/co-ordinates its original value. Preparation employee has **Manage Events**.
* Use a published future single-date event with exactly two public, currently on-sale types, no waitlist/password and no event-wide capacity limit. Both types were available before setup; record the event/type names, original caps and settings.
* Prepare the selected row using **Manage Events → event → Edit → Ticket Types**, saving checkbox changes through Next → Save Event while the switch is ON. For SwitchOffAllEmpty, an administrator verifies Public sold out = No on both matching types through Admin → Tickets → Ticket types; no employee checkbox is expected. Prepare actual zero using positive finite caps consumed by test purchases; record the time of the final change.

| SelloutReason | First type | Second type |
| --- | --- | --- |
| SwitchOffAllEmpty | Saved Public sold out = No; 0 remaining | Saved Public sold out = No; 0 remaining |
| AllForced | Setting checked; at least 1 remaining | Setting checked; at least 1 remaining |
| AllEmpty | Setting unchecked; 0 remaining | Setting unchecked; 0 remaining |
| Mixed | Setting checked; at least 1 remaining | Setting unchecked; 0 remaining |

* Have the event’s public page, event widget, organizer calendar widget/date and exact searchable event name; verify these entries showed the event before setup.

**Tags:** public, events, discovery

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public event page. | Selected event | The page opens; record the initial ticket availability and event-level label. |
| Wait until 25 minutes have elapsed since the final setup change. | Recorded change time | The observation time is at least 25 minutes later. |
| Reload the public event page. | Same event | The event shows sold out and offers no normal ticket purchase. |
| Open a fresh event widget. | Same event | The event shows sold out and neither ticket type can be selected. |
| Open the organizer calendar widget and select the event’s date. | Recorded date | The event is marked sold out rather than offered as an available purchase. |
| Search Showpass for the exact event name. | Recorded name | The matching event result is marked sold out. |

**Postconditions:**

* Record the final-change time, observation times and screenshots of each event state.
* Restore and verify the original global switch and only the ticket settings changed for this execution; preserve consumed test inventory and its order references for review.

#### TC-10 — A seat with only a sold-out ticket type

> **Qase regression references (note only)**
>
> **Related regression:** [Public seat-map purchase (SPT-217)](https://app.qase.io/case/SPT-217), [exclude unavailable seats (SPT-2935)](https://app.qase.io/case/SPT-2935) and [attraction seating purchase (SPT-4049)](https://app.qase.io/case/SPT-4049). **Gap:** an unoccupied seat whose only ticket type is exhausted or forced sold out; unavailable-seat checks do not prove this type-level state.

**Title:** Core - Assigned Seating - Prevent selection of a seat whose only ticket type is sold out

**Description:** A customer opens an unoccupied seat that has only one assigned ticket type. The seat must be unavailable when that ticket type is publicly sold out or has no remaining inventory.

**Global switch (`enable_force_public_sold_out`): OFF for SwitchOffEmpty; ON for SwitchOnForced / SwitchOnEmpty.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Use the SelloutState table; SeatEntry chooses the purchase path.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebPublic | Mobile |
| Widget | Mobile |
| React Native Public | Mobile |

| SeatEntry | Starting action | Platform |
| --- | --- | --- |
| EventDetailMap | Open the event detail page and select its seat-selection action. | WebPublic |
| DirectSeatingPage | Open the recorded public seat-selection link for the event. | WebPublic |
| EventWidgetMap | Open the host’s event widget and continue to its seat-selection step. | Widget |
| AttractionSeatMap | Open the attraction’s ticket section, select the recorded date/time and open seat selection. | WebPublic |
| MobileAppMap | In the Showpass app, open Explore → event card, choose the recorded date if recurring, then open seat selection. | React Native Public |

**Parameters:**

SelloutState: SwitchOnForced, SwitchOnEmpty, SwitchOffEmpty
SeatEntry: EventDetailMap, DirectSeatingPage, EventWidgetMap, AttractionSeatMap, MobileAppMap

**Preconditions:**

* Use free ticket types with no required paid extras and customer-owned contact details so the selected available seat can be issued in a zero-total order.
* Select a published future assigned-seating event with a known unoccupied seat assigned to exactly one public on-sale type, no waitlist/password, and a separate available seat/type that keeps the seating map accessible. Record section, row and seat label.
* An administrator prepares Public sold out in Admin → Tickets → Ticket types by searching the event/type name, saving the required Yes/No value and recording the original; a release owner prepares and records the global switch.

| SelloutState | Global enable_force_public_sold_out | Sole type |
| --- | --- | --- |
| SwitchOnForced | On | Setting checked; at least 1 actual ticket remaining |
| SwitchOnEmpty | On | Setting unchecked; positive cap consumed by test purchases on other seats, 0 remaining |
| SwitchOffEmpty | Off | Setting unchecked; positive cap consumed by test purchases on other seats, 0 remaining |

* For SeatEntry, have the recorded host/page and event/date in the Description; for attraction or recurring entry use the child occurrence’s ticket types.
* Use an empty public cart with no hold link or staff session; have the event’s public page or seating-enabled event widget. Coordinate switch changes because they are global.

**Tags:** public, assigned-seating, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Follow the SeatEntry starting action in the Description. | SeatEntry; recorded event/date | The seating map is shown. |
| Locate the recorded seat. | Section, row and seat | The seat is displayed as unavailable. |
| Attempt to select that seat. | Recorded seat | The seat is not added to the cart. |
| Select the separate available seat. | Recorded available seat/type | The available seat can be added to the cart. |
| Continue to checkout with the available seat. | One available seat; no unavailable type | The summary retains the selected event, type and seat. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The zero-total order can be submitted. |
| Select Complete transaction. | One available seat | One successful order is confirmed. |
| Open the issued ticket from the confirmation. | New order | Exactly one ticket carries the selected available type and seat; no unavailable type was issued. |

**Postconditions:**

* Retain the completed order and seat reference; remove only unpurchased cart items. Do not make a sold seat available as cleanup. Restore the recorded switch/type settings and verify them; retain a screenshot if the unavailable seat is selectable or mislabelled.

#### TC-11 — A seat with available and sold-out ticket types

**Qase case:** [SPT-5236](https://app.qase.io/case/SPT-5236) — Core - Inventory (suite 625). Created from TC-11 and verified on 2026-09-15: title, description/setup tables, all 11 steps, parameters, tags and postconditions match. No execution result recorded.

> **Qase regression references (note only)**
>
> **Related regression:** [Multiple ticket types on a seat (SPT-217)](https://app.qase.io/case/SPT-217), [best available with multiple types (SPT-2927)](https://app.qase.io/case/SPT-2927) and [attraction seating purchase (SPT-4049)](https://app.qase.io/case/SPT-4049). **Gap:** mixed available/sold-out types on the same seat and the sold-out option’s visible marking.

**Title:** Core - Assigned Seating - Keep a shared seat selectable while marking its sold-out ticket option

**Description:** An unoccupied seat offers two ticket types: one available and one sold out. The customer can select the seat using the available type, while the sold-out type is visibly marked and cannot be selected.

**Global switch (`enable_force_public_sold_out`): OFF for SwitchOffEmpty; ON for SwitchOnForced / SwitchOnEmpty.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Use the SelloutState table; SeatEntry chooses the purchase path.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebPublic | Mobile |
| Widget | Mobile |
| React Native Public | Mobile |

| SeatEntry | Starting action | Platform |
| --- | --- | --- |
| EventDetailMap | Open the event detail page and select its seat-selection action. | WebPublic |
| DirectSeatingPage | Open the recorded public seat-selection link for the event. | WebPublic |
| EventWidgetMap | Open the host’s event widget and continue to its seat-selection step. | Widget |
| AttractionSeatMap | Open the attraction’s ticket section, select the recorded date/time and open seat selection. | WebPublic |
| MobileAppMap | In the Showpass app, open Explore → event card, choose the recorded date if recurring, then open seat selection. | React Native Public |

**Parameters:**

SelloutState: SwitchOnForced, SwitchOnEmpty, SwitchOffEmpty
SeatEntry: EventDetailMap, DirectSeatingPage, EventWidgetMap, AttractionSeatMap, MobileAppMap

**Preconditions:**

* Use free ticket types with no required paid extras and customer-owned contact details so the selected available seat can be issued in a zero-total order.
* Select a published future assigned-seating event with one known unoccupied seat assigned to two public on-sale ticket types, no waitlists/passwords, and no event-wide capacity exhaustion. Record section, row, seat and both type names.
* The available type has **Show as sold out publicly** unchecked and at least 1 remaining. Prepare the other type as follows; actual zero must come from a positive cap consumed by test purchases on other seats.

| SelloutState | Global enable_force_public_sold_out | Other type |
| --- | --- | --- |
| SwitchOnForced | On | Setting checked; at least 1 remaining |
| SwitchOnEmpty | On | Setting unchecked; 0 remaining |
| SwitchOffEmpty | Off | Setting unchecked; 0 remaining |

* An administrator prepares Public sold out in Admin → Tickets → Ticket types by searching the event/type name and saving the required Yes/No value; a release owner prepares the global switch in a coordinated window. Record original settings.
* For SeatEntry, have the recorded host/page and event/date in the Description; for attraction or recurring entry use the child occurrence’s ticket types.
* Have an empty public cart and the event page or seating-enabled event widget; do not enter through a hold link.

**Tags:** public, assigned-seating, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Follow the SeatEntry starting action in the Description. | SeatEntry; recorded event/date | The seating map is shown. |
| Select the recorded seat. | Section, row and seat | The seat’s ticket choices are shown. |
| Inspect the unavailable ticket type in those choices. | Recorded sold-out type name | That type is marked sold out and cannot be selected. |
| Select the available ticket type. | Quantity 1 | The cart contains the recorded seat with the available type. |
| Remove that seat from the cart. | Recorded seat | The seat is released from the cart. |
| Reopen the same seat’s choices. | Same seat | The available type remains selectable and the sold-out type remains unavailable. |
| Select the available type on the recorded shared seat again. | Same seat; available type | Only the available type is added to the cart. |
| Continue to checkout with the available seat. | One available seat; no unavailable type | The summary retains the selected event, type and seat. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The zero-total order can be submitted. |
| Select Complete transaction. | One available seat | One successful order is confirmed. |
| Open the issued ticket from the confirmation. | New order | Exactly one ticket carries the selected available type and seat; no unavailable type was issued. |

**Postconditions:**

* Retain the completed order and seat reference; remove only unpurchased cart items. Do not make a sold seat available as cleanup. Restore the recorded settings and verify them. If the sold-out choice is omitted, record it as a requirement mismatch rather than passing the visible-marking check.

#### TC-12 — Public best-available seating — OFF and ON

**Qase case:** [SPT-5237](https://app.qase.io/case/SPT-5237) — Core - Inventory (suite 625). Created from TC-12 and verified on 2026-09-15: title, description/setup tables, all 9 steps, parameters, tags and postconditions match. No execution result recorded.

> **Qase regression references (note only)**
>
> **Reusable best-available baselines:** [Single ticket type (SPT-2926)](https://app.qase.io/case/SPT-2926), [multiple ticket types (SPT-2927)](https://app.qase.io/case/SPT-2927), [exclude unavailable seats (SPT-2935)](https://app.qase.io/case/SPT-2935) and [excess quantity (SPT-2934)](https://app.qase.io/case/SPT-2934). **Gap:** forced ticket-type exclusion while actual seat inventory remains. Run only source-supported platform paths.

**Title:** Core - Assigned Seating - Best-available ticket selection respects the global public-sellout switch

**Description:** Best-available seating lets the customer request tickets and receive suggested seats rather than picking a seat first. An available target with saved public sellout can be allocated only with the global switch OFF; the available unforced control works in both states.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE on target; FALSE on control.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| React Native Public | Mobile |

| SwitchState | Global enable_force_public_sold_out | Target public_sold_out | Expected public target |
| --- | --- | --- | --- |
| Off | OFF | TRUE | Available when actual inventory exists |
| On | ON | TRUE | Unavailable despite actual inventory |

**Parameters:**

SwitchState: Off, On
SeatHost: PublicPage, EventWidget, MobileApp

**Preconditions:**

* Use free ticket types with no required paid extras and customer-owned contact details so the selected available seat can be issued in a zero-total order.
* A release owner sets global enable_force_public_sold_out to SwitchState in a coordinated window and records its original value; keep that state for the entire case.
* An administrator prepares Public sold out = Yes in Admin → Tickets → Ticket types by searching the recorded event/type and saving the value; record its original value. The control type has Public sold out = No.
* Venue flag enable_best_assigned_seating is ON. Select a published future seated event with two public on-sale types, at least 2 actual remaining of each, at least two unoccupied seats eligible for each, and no password/waitlist/event-wide sellout. Record target/control names and the event/date.
* For SeatHost PublicPage open the event detail page → seat selection; for EventWidget open its seating-enabled event widget; for MobileApp use Showpass app → Explore → event card → seat selection. Start with an empty cart.

**Tags:** public, assigned-seating, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected SeatHost path. | Recorded event/date | The map and ticket-based best-available selection are shown. |
| Request one target ticket using the ticket-based selection. | Public sold out = Yes; quantity 1 | Off: an eligible seat can be selected; On: the target cannot be allocated into the customer cart. |
| Remove any selected target ticket/seat. | Target only | No target seat remains in the cart. |
| Request one control ticket using the ticket-based selection. | Public sold out = No; quantity 1 | An eligible available seat is offered. |
| Select seats to accept the offered control seat. | Recorded offered section/row/seat | One control ticket with the offered seat enters the cart. |
| Continue to checkout with the available seat. | One available seat; no unavailable type | The summary retains the selected event, type and seat. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The zero-total order can be submitted. |
| Select Complete transaction. | One available seat | One successful order is confirmed. |
| Open the issued ticket from the confirmation. | New order | Exactly one ticket carries the selected available type and seat; no unavailable type was issued. |

**Postconditions:**

* Retain the completed order and seat reference; remove only unpurchased cart items. Do not make a sold seat available as cleanup.

* Verify the completed purchase cleared the cart; remove only any remaining unpurchased selection.
* Restore and reopen the recorded ticket settings and global switch to verify restoration; retain any test order and ticket references instead of deleting accounting records.

#### TC-13 — Staff sale with actual inventory

> **Qase regression references (note only)**
>
> **Reusable staff baselines:** [Single-day sale (SPT-4066)](https://app.qase.io/case/SPT-4066) and [recurring sale (SPT-4069)](https://app.qase.io/case/SPT-4069) include Web Box Office and Electron. Neither sets the public-sellout value explicitly.
> **Separate attraction entry, partial:** [Staff attraction calendar (SPT-1077)](https://app.qase.io/case/SPT-1077) stops at basket addition; it does not replace a completed sale from that entry.

**Title:** Box Office - Tickets - Sell an available ticket despite its public-sellout setting

**Description:** A Box Office employee completes a cash sale of a ticket type whose public-sellout setting is enabled. The sale must use actual inventory with either global switch state and produce one transaction and one ticket.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE in both runs.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Parameters:**

SwitchState: Off, On
StaffEventEntry: SingleDay, RecurringDate, AttractionCalendar

**Preconditions:**

* For StaffEventEntry: SingleDay starts at Box Office → Sell → the event; RecurringDate starts at its recurring event → recorded date/time; AttractionCalendar starts at the attraction → supported ticket calendar section → recorded date/time. Use the selected child’s ticket type and record the path. The attraction calendar must already be enabled for that organization.
* Employee permissions: **Use Box Office**, **Cash Box Office Sales**, **View Box Office Stats**, and **Manage Transactions** for the transaction check.
* A release owner sets global `enable_force_public_sold_out` to SwitchState in a coordinated window and records its original value.
* Select a published future event with a public on-sale type, price greater than zero, **Public sold out = Yes**, at least 2 remaining, no password, package or assigned seat, and no event-wide capacity exhaustion. Record its remaining count.
* Use a cash order created for this execution and a customer identity owned by the execution team; cash is recorded by Showpass, not charged to a card. Start with an empty staff cart.

**Tags:** box-office, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Box Office or the Showpass desktop app and follow the selected StaffEventEntry path. | Selected event/type | The type can be selected despite its saved public-sellout setting. |
| Add one ticket. | Quantity 1 | The staff cart contains one ticket. |
| Select Continue to open checkout. | — | The sale summary contains the single ticket. |
| Select Cash as the payment method. | Cash | The sale total is shown for the single ticket. |
| Complete the displayed customer and receipt fields. | Team-owned customer details | The sale is ready for completion. |
| Select Process Transaction. | Record the displayed total | A sale confirmation is shown. |
| Open Web Dashboard → Transactions and find the new transaction. | Confirmation’s transaction/order reference | One completed cash transaction matches the selected ticket and total. |
| Open the transaction’s ticket details. | Same transaction | Exactly one ticket of the selected type was issued. |
| Reopen the event in Box Office. | Same type | Actual remaining inventory is one lower than the recorded count. |
| Open a fresh public event page. | Same type | On: the type remains sold out; Off: its remaining inventory is publicly selectable. |

**Postconditions:** Restore the original global switch value and verify it. Retain the cash order and ticket reference as test accounting records; do not delete or refund them without the execution’s agreed cleanup scope.

#### TC-14 — Fresh staff basket cannot sell actual zero

> **Qase regression references (note only)**
>
> **Reusable actual-zero regression:** [Sold-out ticket states (SPT-402)](https://app.qase.io/case/SPT-402) includes Web Box Office and Electron; [prevent overselling (SPT-3295)](https://app.qase.io/case/SPT-3295) adds reservation/release checks. Explicit switch and saved-value setup remain local.

**Title:** Box Office - Tickets - Keep a ticket type with zero remaining inventory unavailable

**Description:** A fresh Box Office basket cannot add a ticket type whose actual inventory is exhausted, regardless of the global public-sellout switch. This excludes existing holds because already allocated inventory has a different access path.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** FALSE; actual remaining inventory is 0.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Parameters:**

SwitchState: Off, On
StaffEventEntry: SingleDay, RecurringDate, AttractionCalendar

**Preconditions:**

* For StaffEventEntry: SingleDay starts at Box Office → Sell → the event; RecurringDate starts at its recurring event → recorded date/time; AttractionCalendar starts at the attraction → supported ticket calendar section → recorded date/time. Use the selected child’s ticket type and record the path. The attraction calendar must already be enabled for that organization.
* Employee permissions: **Use Box Office** and **View Box Office Stats**.
* A release owner sets global `enable_force_public_sold_out` to SwitchState in a coordinated window and records its original value.
* Select a public on-sale ticket type with **Public sold out = No** and a positive finite cap fully consumed by owned test purchases, leaving zero actual remaining. Keep a second available type in the event.
* Start a fresh staff basket; do not resume a hold, group sale or existing allocated cart.

**Tags:** box-office, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Box Office or the Showpass desktop app and follow the selected StaffEventEntry path. | Selected event | The exhausted type shows no available inventory. |
| Attempt to add one ticket of the exhausted type using its displayed control. | Quantity 1 | No ticket of that type is added. |
| Add one ticket of the other available type. | Quantity 1 | The available type is accepted into the cart. |

**Postconditions:** Remove the added ticket, restore and verify the original switch value, and preserve the existing capacity-consuming test orders.

#### TC-15 — Mobile Box Office and POS — available inventory

> **Qase regression references (note only)**
>
> **Reusable POS baseline:** [Event ticket sale (SPT-2650)](https://app.qase.io/case/SPT-2650); [Square reader purchase (SPT-2688)](https://app.qase.io/case/SPT-2688) covers a paid-card variant, not this cash method.
> **Mobile Box Office gap:** [Staff guest-information requirement (SPT-3251)](https://app.qase.io/case/SPT-3251) reaches validation/cancellation only. It does not provide a completed native Mobile Box Office ticket-sale baseline.

**Title:** Box Office - Tickets - Mobile staff can sell actual inventory with either global switch state

**Description:** Mobile Box Office and native POS employees sell one actually available ticket even when its saved public-sellout value is TRUE. Customer mobile checkout is a separate flow.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE; actual inventory exists.

| Platform | View |
| --- | --- |
| MobileBoxOffice | Mobile |

| StaffEntry | Where to start | Final submission |
| --- | --- | --- |
| MobileBoxOffice | Showpass app → organization Dashboard → Box Office → Sell → event/date → Tickets; Continue opens cart review, then Payment info. | Process order |
| NativePos | Native POS app → organization → Sell → event/date → Tickets; Continue through purchaser information to payment. | Checkout |

**Parameters:**

SwitchState: Off, On
StaffEntry: MobileBoxOffice, NativePos

**Preconditions:**

* Employee permissions: Use Box Office, Cash Box Office Sales, View Box Office Stats and Manage Transactions for the separate Web Dashboard verification.
* A release owner sets global enable_force_public_sold_out to SwitchState, records the original value and coordinates the global change.
* Use the Showpass app’s Mobile Box Office or the native POS application for StaffEntry; select the organization and start a fresh staff cart. Record the event, date and ticket names.
* Select a published future public on-sale general-admission type priced above zero, with at least 2 remaining, Public sold out = Yes and no password/package/event-wide sellout. Prepare the saved value in Admin → Tickets → Ticket types → matching event/type → Public sold out = Yes → Save.
* Use a team-owned customer and cash test order; record the initial remaining count. No unrelated customer cash or order may be changed.

**Tags:** box-office, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected native staff entry point. | StaffEntry path in Description | The event’s available ticket type can be selected. |
| Add one ticket. | Quantity 1 | The staff cart contains one ticket. |
| Continue through cart review and purchaser information. | Team-owned customer details | Payment information is shown for the same ticket. |
| Select Cash and enter the displayed total as cash received. | Exact displayed total | No additional cash is due. |
| Use the final submission button shown for StaffEntry. | Process order or Checkout, as mapped | A successful sale confirmation is shown. |
| In Web Dashboard → Transactions, open the new transaction. | Confirmation reference | One cash transaction matches the selected ticket and total. |
| Open its ticket details. | New transaction | Exactly one ticket is issued. |
| Return to the app’s Sell screen and reopen the event. | Same type | Actual remaining inventory is one lower. |
| As the customer, open a fresh public page for the same event/date. | Same type | On: the type remains sold out; Off: its remaining stock is publicly selectable. |

**Postconditions:**

* Retain the transaction/ticket; restore and verify original admin ticket settings and global switch value.

#### TC-16 — Mobile Box Office and POS — actual zero inventory

> **Qase regression references (note only)**
>
> **Partial POS match:** [Event ticket configuration rules (SPT-2700)](https://app.qase.io/case/SPT-2700) checks invalid selections, but has no explicit actual-zero ticket-type scenario. [Sold-out ticket regression (SPT-402)](https://app.qase.io/case/SPT-402) covers web/desktop surfaces only. **No direct native Mobile Box Office zero-stock case found.**

**Title:** Box Office - Tickets - Mobile staff cannot sell a ticket type with no actual inventory

**Description:** A fresh mobile staff cart cannot add an actually exhausted ticket type under either global switch state.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** FALSE; actual inventory is 0.

| Platform | View |
| --- | --- |
| MobileBoxOffice | Mobile |

**Parameters:**

SwitchState: Off, On
StaffEntry: MobileBoxOffice, NativePos

**Preconditions:**

* Employee permissions: Use Box Office and View Box Office Stats.
* A release owner sets global enable_force_public_sold_out to SwitchState in a coordinated window and records its original state.
* Select a public on-sale type with a positive finite cap fully consumed by owned test purchases and Public sold out = No; retain another available type in the same event. Start a fresh cart, not a hold or existing allocation.
* For StaffEntry open either Showpass app → organization Dashboard → Box Office → Sell, or native POS app → organization → Sell; select the recorded event/date → Tickets.

**Tags:** box-office, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected native staff entry point and event. | StaffEntry; recorded event/date | The exhausted type shows no available inventory. |
| Attempt to add one exhausted ticket through its normal control. | Quantity 1 | No exhausted ticket enters the cart. |
| Add one ticket of the available control type. | Quantity 1 | The available ticket enters the cart. |

**Postconditions:**

* Remove the control ticket and restore/verify the original global switch value; retain all existing test purchases.

#### TC-17 — In-person assigned-seat sale — Box Office and POS

**Qase case:** [SPT-5238](https://app.qase.io/case/SPT-5238) — Core - Inventory (suite 625). Created from TC-17 and verified on 2026-09-15: title, description/setup tables, all 7 steps, parameters, tags and postconditions match. No execution result recorded.

> **Qase regression references (note only)**
>
> **Reusable in-person seating baselines:** [Web/Electron map purchase (SPT-4074)](https://app.qase.io/case/SPT-4074) and [Box Office best-available purchase (SPT-4075)](https://app.qase.io/case/SPT-4075); [shared-seat ownership and release (SPT-2357)](https://app.qase.io/case/SPT-2357) adds allocation regression. **Gap:** a distinct native Mobile Box Office journey and explicit saved public-sellout setup.

**Title:** Box Office - Assigned Seating - Complete an in-person cash sale of a publicly sold-out ticket

**Description:** A Box Office employee completes an in-person cash sale through Web Box Office, the Showpass desktop app, Mobile Box Office, or POS. A ticket type marked publicly sold out can still be sold with an available seat when the global switch is OFF or ON. The completed sale issues the selected seat and prevents it from being sold again.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE; seats with actual availability remain sellable through in-person checkout.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| MobileBoxOffice | Mobile |

| InPersonSeatEntry | Where to select a seat | Payment submission |
| --- | --- | --- |
| WebMap | Web Box Office → event/date → seat map; select one recorded unoccupied seat. | Process Transaction |
| DesktopMap | Showpass desktop app → Box Office → event/date → seat map; select one recorded unoccupied seat. | Process Transaction |
| MobileBestAvailable | Showpass app → organization Dashboard → Box Office → event/date → best-available ticket selection; request one ticket and accept one suggested seat. | Process order |
| PosBestAvailable | Native POS app → Sell → event/date → best-available ticket selection; request one ticket and accept one suggested seat. | Checkout |

**Parameters:**

SwitchState: Off, On
InPersonSeatEntry: WebMap, DesktopMap, MobileBestAvailable, PosBestAvailable

**Preconditions:**

* A release owner sets global enable_force_public_sold_out to SwitchState in a coordinated window and records its original value; keep that state for the entire case.
* An administrator prepares Public sold out = Yes in Admin → Tickets → Ticket types by searching the recorded event/type and saving the value; record its original value. The control type has Public sold out = No.
* Employee permissions: Use Box Office, Cash Box Office Sales, View Box Office Stats and Manage Transactions. Use an event with assigned seating enabled in Box Office with a public on-sale target priced above zero, at least 2 remaining and a recorded unoccupied eligible seat; no password or event-wide sellout applies.
* For the native best-available entries, use an organization/device whose existing Box Office/POS best-available selection is enabled and accessible. Record the suggested seat before accepting it; do not substitute public mobile checkout.
* Use an empty cart in the selected Box Office or POS app and a cash order owned by the execution team. Record the chosen event/date and actual seat identifiers.

**Tags:** box-office, assigned-seating, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the chosen InPersonSeatEntry and select one target seat as mapped. | One seat; saved Public sold out = Yes | One target ticket with an actual available seat enters the Box Office or POS cart. |
| Continue to customer/payment information. | Team-owned customer | The cart retains the same seat. |
| Select Cash and enter the displayed total if cash received is requested. | Exact displayed total | The sale is ready for completion. |
| Submit using the mapped payment button. | InPersonSeatEntry | A successful sale confirmation is shown. |
| Open Web Dashboard → Transactions and find the confirmation reference. | New transaction | One cash transaction contains the selected event, type and seat. |
| Open its ticket details. | New transaction | Exactly one ticket bears the same seat. |
| Return to seat selection in the same Box Office or POS app with an empty cart. | Recorded purchased seat | The purchased seat cannot be allocated to another new sale. |

**Postconditions:**

* Restore and reopen the recorded ticket settings and global switch to verify restoration; retain any test order and ticket references instead of deleting accounting records.
* Retain the issued seat and transaction as test sale records; do not release a sold seat by editing inventory.

#### TC-18 — Customer kiosk — public selection and control purchase

> **Qase regression references (note only)**
>
> **Reusable kiosk purchase baseline:** [Square ticket purchase (SPT-2688)](https://app.qase.io/case/SPT-2688). **Partial negative coverage:** [Kiosk sold-out display (SPT-2684)](https://app.qase.io/case/SPT-2684) does not attempt selection; [attraction quantity/calendar behavior (SPT-2707)](https://app.qase.io/case/SPT-2707) covers a separate kiosk entry. Keep this case’s explicit selection/control checks and the unresolved existing-cart policy.

**Title:** Core - Tickets - Kiosk selection follows public availability with the global switch OFF and ON

**Description:** A customer uses an already configured self-service kiosk. The target type has its saved public-sellout value TRUE: switch OFF allows selection and switch ON prevents fresh selection. An unforced available control can still be bought. This case does not prove a kiosk cart already allocated before the setting changed is rejected at final purchase.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE on target; FALSE on control.

| Platform | View |
| --- | --- |
| MobileBoxOffice | Mobile |

| SwitchState | Global enable_force_public_sold_out | Target public_sold_out | Expected public target |
| --- | --- | --- | --- |
| Off | OFF | TRUE | Available when actual inventory exists |
| On | ON | TRUE | Unavailable despite actual inventory |

**Parameters:**

SwitchState: Off, On
KioskEvent: SingleDay, Recurring

**Preconditions:**

* A release owner sets global enable_force_public_sold_out to SwitchState in a coordinated window and records its original value; keep that state for the entire case.
* An administrator prepares Public sold out = Yes in Admin → Tickets → Ticket types by searching the recorded event/type and saving the value; record its original value. The control type has Public sold out = No.
* An employee has configured Kiosk mode for the selected organization and test events, with a Square location saved and the unlock PIN known to that employee. A configured location is needed by kiosk purchase even for this free order. The customer starts at Touch to start; no card payment is submitted.
* For KioskEvent SingleDay use one public future event; for Recurring use a public recurring event with a recorded future date/time. The selected event/occurrence has two free on-sale general-admission types, both with at least 2 remaining, no password/waitlist/paid add-on or event-level sellout.
* Have a customer-owned email for ticket delivery. Use the target/control on the selected occurrence, not just the recurring parent.

**Tags:** public, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| At the configured kiosk, select Touch to start. | KioskEvent | The kiosk opens event selection. |
| Select the recorded event and, for Recurring, its recorded date/time. | Recorded event/date/time | The ticket selection screen opens. |
| Attempt to select one target ticket. | Public sold out = Yes; quantity 1 | Off: one target can be selected; On: the target is sold out/unavailable. |
| Clear any selected target quantity. | Quantity 0 | No target is selected. |
| Select one control ticket and continue. | Public sold out = No; quantity 1 | The cart overview contains one control ticket. |
| Choose Email delivery and enter the customer-owned address. | Recorded email | The delivery address is accepted. |
| Continue through the displayed checkout for the zero-total order. | One free control ticket | The kiosk shows its successful purchase confirmation. |
| Open the delivered ticket using the customer-owned email. | New confirmation | One control ticket is delivered and no target ticket is issued. |

**Postconditions:**

* The configuration owner exits kiosk mode using the unlock PIN; clear any unfinished selection.
* Restore and reopen the recorded ticket settings and global switch to verify restoration; retain any test order and ticket references instead of deleting accounting records.

#### TC-19 — Existing cart — resume after the ticket setting changes

> **Qase regression references (note only)**
>
> **Partial matches:** [Widget cart reopen/handoff (SPT-2439)](https://app.qase.io/case/SPT-2439), [cross-widget basket persistence (SPT-2435)](https://app.qase.io/case/SPT-2435) and [expired/empty cart recovery, including native app (SPT-4928)](https://app.qase.io/case/SPT-4928). None completes checkout after this ticket-setting change. Native cart-icon and legacy express-widget completion remain gaps.

**Title:** Core - Checkout - Apply the global switch when resuming a cart after public sellout is saved

**Description:** A customer selects a ticket while its saved public-sellout value is FALSE. An administrator changes that value to TRUE while the cart exists. Switch OFF allows the resumed purchase; switch ON rejects it.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** FALSE → TRUE while a real customer cart exists.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| ResumeEntry | Starting path after selection | Final order button |
| --- | --- | --- |
| OpenWebCheckout | Keep the public checkout open while the administrator saves the setting. | Complete transaction |
| WidgetCart | Close the purchase widget after selection, then open the host website’s shopping cart and continue to checkout. | Complete transaction |
| MobileAppCart | Select in the Showpass app, return to Explore, then tap the app cart icon. | Complete transaction |
| ExpressWidget | Select tickets on the host and open its existing express-checkout button. | Complete for a free order |

**Parameters:**

SwitchState: Off, On
ResumeEntry: OpenWebCheckout, WidgetCart, MobileAppCart, ExpressWidget

**Preconditions:**

* Global enable_force_public_sold_out stays at SwitchState throughout the case; a release owner records/co-ordinates the original global state.
* Select a free public on-sale ticket type with at least 2 remaining, Public sold out = No, no hold/waitlist/package/password or required paid extras; start with an empty cart.
* An administrator can find the type in Admin → Tickets → Ticket types and change Public sold out. An employee with Manage Transactions can check the resulting transaction state.
* Have the ResumeEntry host/app path, a customer-owned email and a cart that remains unexpired throughout the setting change.

**Tags:** public, checkout, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public event purchase flow in the chosen host/app and select one ticket. | ResumeEntry; quantity 1 | One ticket enters the customer cart. |
| As the administrator, open Admin → Tickets → Ticket types and find the selected event/type. | Recorded event/type | Public sold out is No. |
| Save Public sold out as Yes. | Yes | Reopening the record shows Yes. |
| As the customer, use the ResumeEntry path in the Description. | Existing unexpired cart | Checkout resumes for the selected cart, or shows the sold-out rejection when SwitchState is On. |
| Complete the displayed customer details and terms if checkout remains available. | Customer-owned details | Off: the order can continue; On: the forced ticket cannot complete purchase. |
| Attempt final order submission using the mapped button if it is available. | Existing selection | Off: one order confirms; On: no successful order confirms. |
| As the employee, search Web Dashboard → Transactions for the customer email and attempt time. | Recorded email/time | Off: one completed transaction exists; On: no completed purchase exists for the attempt. |

**Postconditions:**

* Remove any rejected selection; retain successful test orders; restore and reopen the original ticket value and global switch to verify restoration.
* Record where an ON rejection occurs; absence of a completed transaction is required even if the cart still displays the selected ticket.

#### TC-20 — Checkout link — automatic ticket selection

> **Qase regression references (note only)**
>
> **Closest regression match:** [Checkout-link unavailable items (SPT-4802)](https://app.qase.io/case/SPT-4802) covers empty/existing carts and all/partially unavailable extras. [Create checkout link (SPT-4241)](https://app.qase.io/case/SPT-4241) supplies related setup. **Gaps:** explicit switch states, completed purchase, and a genuine in-app link path.

**Title:** Core - Checkout - A checkout link cannot bypass an active public sellout

**Description:** A checkout link requests one ticket automatically, without the customer first using ticket quantity controls. The saved public-sellout value is ignored with switch OFF and enforced with switch ON. An unrelated existing cart ticket must remain intact.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE on the link’s target; no hold allocation exists.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| SwitchState | Global enable_force_public_sold_out | Target public_sold_out | Expected public target |
| --- | --- | --- | --- |
| Off | OFF | TRUE | Available when actual inventory exists |
| On | ON | TRUE | Unavailable despite actual inventory |

**Parameters:**

SwitchState: Off, On
CartStart: Empty, ExistingControl
LinkHost: Web, MobileApp

**Preconditions:**

* Have customer-owned contact details; all accepted target/control tickets are free and have no required paid extras. An employee with Administer Transactions can check that an all-unavailable attempt created no completed order.
* A release owner sets global enable_force_public_sold_out to SwitchState in a coordinated window and records its original value; keep that state for the entire case.
* An administrator prepares Public sold out = Yes in Admin → Tickets → Ticket types by searching the recorded event/type and saving the value; record its original value. The control type has Public sold out = No.
* Use a public on-sale free general-admission target with at least 2 remaining and no password/waitlist/package/paid add-on. Have an existing event checkout link that requests exactly one of that type; record it from the event’s tracking-link details. It must be an ordinary checkout link, not a staff-created hold allocation.
* For CartStart Empty, use an empty customer cart. For ExistingControl, first add one different free, available unforced ticket in the same organization. Record both type names and the cart contents.
* For LinkHost Web open the recorded link in the browser; for MobileApp use the checkout link already available in the app’s purchase flow. Only mark MobileApp executable when that real in-app link entry exists; do not replace it with an external mobile browser.

**Tags:** public, tracking-links, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the recorded checkout link. | CartStart; LinkHost | The link attempts to populate the requested ticket. |
| Inspect the cart after the link finishes loading. | Target quantity 1 | Off: exactly one target is included; On: no target is added and its failure is visible. |
| Check any pre-existing control ticket. | CartStart | ExistingControl: the original control ticket remains; Empty: no unrelated ticket was created. |
| Reopen the same link once. | Same customer session | The target is not duplicated; with On it remains excluded. |
| Continue to checkout if the cart contains tickets. | Accepted tickets only | The summary contains only the tickets allowed by the selected switch state. |
| Complete customer details and terms when the cart contains an accepted ticket. | Off, or ExistingControl with On | The order remains limited to the accepted ticket types. |
| Select Complete transaction when the cart contains tickets. | Accepted tickets only | One order confirms with exactly the accepted tickets and no duplicates. |
| Open the tickets from the confirmation; for On + Empty, check Dashboard → Transactions for the attempted customer/time instead. | Selected CartStart/SwitchState | A successful order issues only accepted tickets; On + Empty creates no completed order. |

**Postconditions:**

* Remove only unpurchased cart items. Retain issued tickets and their completed order.
* Restore and reopen the recorded ticket settings and global switch to verify restoration; retain any test order and ticket references instead of deleting accounting records.

#### TC-21 — Checkout ticket add-on and upgrade offers

> **Qase regression references (note only)**
>
> **Corresponding scenarios:** [Ticket add-on purchase (SPT-3096)](https://app.qase.io/case/SPT-3096) and [ticket upgrade (SPT-3743)](https://app.qase.io/case/SPT-3743). Both need refinement: add-on step/results are shifted; upgrade is only a two-row replacement outline. Forced-target rejection and preservation of the original item remain local additions.

**Title:** Core - Checkout - Ticket offers cannot add a publicly sold-out type when the switch is ON

**Description:** A customer already has a base ticket in the cart. A configured ticket add-on offers an additional ticket; a configured ticket upgrade replaces the base ticket. The target saved public-sellout value is ignored with switch OFF and enforced with switch ON.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE on target offer; FALSE on base ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| React Native Public | Mobile |

| SwitchState | Global enable_force_public_sold_out | Target public_sold_out | Expected public target |
| --- | --- | --- | --- |
| Off | OFF | TRUE | Available when actual inventory exists |
| On | ON | TRUE | Unavailable despite actual inventory |

**Parameters:**

SwitchState: Off, On
TicketOffer: AddOn, Upgrade

**Preconditions:**

* Use free base and target ticket types, with no required paid extras, and customer-owned contact details.
* A release owner sets global enable_force_public_sold_out to SwitchState in a coordinated window and records its original value; keep that state for the entire case.
* An administrator prepares Public sold out = Yes in Admin → Tickets → Ticket types by searching the recorded event/type and saving the value; record its original value. The base type has Public sold out = No.
* Select a public on-sale base ticket with at least 2 remaining and Public sold out = No, plus an actual-available target ticket with Public sold out = Yes. Use general-admission types without passwords, waitlists, packages or event-wide sellout.
* For TicketOffer AddOn, select an event whose checkout already offers the target as a ticket add-on; record the base and target event/type names. For Upgrade, use a configured ticket-to-ticket upgrade from the base type to the target, with no assigned seating on either type.
* Use a fresh public cart on the event page, event widget or inside the Showpass app. Record the actual displayed offer action; custom upgrade copy may name the target rather than use a fixed Upgrade label.

**Tags:** public, checkout, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected public purchase flow and add one base ticket. | Quantity 1; base type | One base ticket enters the cart. |
| Continue to the configured ticket offer. | TicketOffer | The customer reaches the add-on or upgrade offer area. |
| Attempt to select the target using its offer action if shown. | Recorded target offer | Off: the target change is accepted; On: the target is unavailable or the attempted change is rejected. |
| Inspect the resulting cart. | TicketOffer and SwitchState | Off AddOn: base plus target; Off Upgrade: target replaces base; On: base remains without target. |
| Continue to the order summary. | Current cart | The summary preserves the expected types and quantities without duplicates. |
| Enter the required customer details and accept the displayed terms. | Current accepted selection | The zero-total order is ready to submit. |
| Select Complete transaction. | Current cart | One order completes. |
| Open the issued tickets. | Selected TicketOffer/SwitchState | Off AddOn: base and target tickets; Off Upgrade: only the target; On: only the original base ticket, with no duplicates. |

**Postconditions:**

* Remove only unpurchased cart items. Retain issued tickets and their completed order.
* Restore and reopen the recorded ticket settings and global switch to verify restoration; retain any test order and ticket references instead of deleting accounting records.
* For On, record a visible enabled target offer separately from the backend rejection; the offer’s availability display and purchase enforcement are separate results.

#### TC-22 — Staff checkout of an existing hold or group sale

> **Qase regression references (note only)**
>
> **Closest existing-hold match:** [Held basket checkout integrity (SPT-1255)](https://app.qase.io/case/SPT-1255); [regular hold checkout (SPT-1249)](https://app.qase.io/case/SPT-1249) also completes staff checkout.
> **Related group-sale baselines:** [General-admission group sale (SPT-1291)](https://app.qase.io/case/SPT-1291) and [assigned-seat group sale (SPT-1307)](https://app.qase.io/case/SPT-1307) create a new group sale. They do not prove checkout of an existing group allocation. Explicit switch/saved-value setup remains local.

**Title:** Box Office - Holds - Complete an allocated hold sale with either global public-sellout switch state

**Description:** An employee opens an existing allocated hold from the Holds list and completes its sale. A group sale is a hold allocated to a customer group. Its saved public-sellout ticket value must not block the existing staff allocation under either global switch state.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE on the already allocated type.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Parameters:**

SwitchState: Off, On
HeldSale: BasicHold, GroupSale

**Preconditions:**

* Employee permissions: Use Box Office, Cash Box Office Sales, Manage Holds and Manage Transactions. Use a hold created by this employee; Manage All Holds is required only if another employee owns it.
* A release owner sets global enable_force_public_sold_out to SwitchState in a coordinated window and records its original value.
* In Box Office → Holds, select an unexpired test hold containing exactly one general-admission ticket already allocated before Public sold out was enabled. For BasicHold select a basic hold; for GroupSale select a hold labelled Group sale. Record the hold name, ticket type and event/date.
* The ticket type is on sale, priced above zero, with at least one additional actual ticket available, no password and no event-wide capacity block. An administrator has since saved Public sold out = Yes through Admin → Tickets → Ticket types for that event/type and recorded its original value.
* Use an allocation and customer owned by this execution because completing checkout consumes the allocation and creates a cash transaction. Start outside any other staff checkout.

**Tags:** box-office, holds, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Box Office or the Showpass desktop app → Holds. | Selected organization | The recorded hold is listed. |
| Select Checkout on the recorded hold. | HeldSale | Checkout opens with the already allocated ticket; it is not replaced by an empty cart. |
| Inspect the order summary. | Recorded type/event/date; quantity 1 | The original allocation is present without a public-sellout rejection. |
| Complete customer information and select Cash. | Team-owned customer; exact displayed total | The held sale is ready to submit. |
| Select Process Transaction. | Allocated ticket only | A successful sale confirmation is shown. |
| Open Web Dashboard → Transactions and find the confirmation reference. | New transaction | One cash transaction contains the original allocated ticket. |
| Open its ticket details. | Same transaction | Exactly one ticket for the allocated event/date and type is issued. |

**Postconditions:**

* Retain the completed hold and new transaction/ticket references; do not restore a consumed allocation or delete accounting records.
* Restore and reopen the original ticket-type value and global switch record to verify restoration.

#### TC-23 — Existing allocated hold link

> **Qase regression references (note only)**
>
> **Related allocated-hold cases:** [Regular hold checkout (SPT-1249)](https://app.qase.io/case/SPT-1249), [branded hold link (SPT-1253)](https://app.qase.io/case/SPT-1253) and [complimentary basic hold purchase (SPT-5104)](https://app.qase.io/case/SPT-5104). Regular hold coverage emphasizes staff checkout; branded coverage stops at checkout; the complimentary case is a separate payment variant. None explicitly covers this public-sellout exception.

**Title:** Public Checkout - Holds - Purchase allocated tickets with either global public-sellout switch state

**Description:** A hold reserves tickets for a customer before the public-sellout setting is enabled. The customer uses the existing staff-created link to buy those allocated tickets while ordinary public selection is blocked only when the global switch is ON.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE; a real hold allocation already exists.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Parameters:**

SwitchState: Off, On
HoldLink: Basic, Branded

**Preconditions:**

* Global switch `enable_force_public_sold_out` remains at SwitchState; a release owner records/co-ordinates the original state. The preparation employee has **Manage Events**, **Use Box Office** and **Manage Holds**.
* Select an unexpired hold owned by that employee for a published future event, containing one free public ticket allocated before the setting was enabled. For Basic, use a basic hold purchase link; for Branded, use a branded hold purchase link with one ticket still available from that allocation. Record the hold, ticket-type name and link from the hold’s details in Box Office → Holds.
* At least one additional ticket remains in actual inventory; the event/type is on sale and has no password, required paid add-on or assigned seat. Use only an allocation created for this execution.
* An administrator has since saved Public sold out = Yes in Admin → Tickets → Ticket types for the recorded type, preserving the hold allocation. Have customer-owned contact details.

**Tags:** public, holds, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ordinary public event page without using the hold link. | Same ticket type | On: normal public selection shows sold out; Off: it remains available. |
| Open the recorded hold purchase link. | Selected HoldLink | The reserved ticket allocation is offered to the customer. |
| Continue with one ticket from that allocation. | Quantity 1 | Checkout includes the held ticket without a public-sellout rejection. |
| Enter the required customer information. | Customer-owned details | The checkout allows the customer to continue. |
| Accept the displayed terms. | — | The order can be submitted. |
| Select Complete transaction. | Allocated zero-total ticket | One order confirmation is shown. |
| Open the tickets from the confirmation. | New order | Exactly one allocated ticket is accessible. |

**Postconditions:** Retain the hold and order references; restore and verify the original global switch and public-sellout setting changed for this work. Do not reopen consumed allocations or delete their order records.

### Preset package acceptance — global switch ON

#### TC-24 — Preset packages — parent restriction and included-ticket access

> **Qase regression references (note only):** [Preset purchase (SPT-429)](https://app.qase.io/case/SPT-429), [calendar package purchase (SPT-3860)](https://app.qase.io/case/SPT-3860), and [child-capacity limits (SPT-4832)](https://app.qase.io/case/SPT-4832) remain related baselines. TC-24 is a local ON-only draft; no new Qase write was made.

**Title:** Core - Packages - Buy a preset package with publicly sold-out included tickets after reopening its parent

**Description:** A preset package supplies fixed included tickets. A customer cannot add the package while its own public-sellout checkbox is checked. Clearing only the package checkbox allows purchase even while the included tickets remain publicly sold out. Quantities and included event dates must match the configured package.

**Global switch (`enable_force_public_sold_out`): ON throughout.**

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |
| Widget | Desktop |
| Widget | Mobile |

**Parameters:**

PackageShape: SingleEvent, MultipleEvents, NestedPreset, ReverseRatio
PurchaseEntry: EventDetail, RecurringDate, AttractionCalendar, EventWidget, MobileApp

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats and Administer Transactions. The organizer prepares ticket settings; the customer uses a separate public session.
* Global enable_force_public_sold_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* A parent is the package ticket the customer selects; children are its included tickets. Through Manage Events → Edit → Ticket Types → edit each relevant type → General, save Show as sold out publicly checked on the parent and the recorded included types. Select Next and Save Event; reopen to verify the saved values.
* Use an empty customer cart and customer-owned contact details. The package is free with no required paid extras, hold allocation, waitlist, access password or independent event-wide capacity restriction.
* Select an existing published, on-sale general-admission preset package matching PackageShape. All included events are in the future and their ticket types are public and otherwise on sale. Have at least 10 actual tickets remaining in each affected type and sufficient package capacity for 3 purchases; record each type’s remaining count and the configured barcode mode.
* SingleEvent: one package includes 2 tickets of one type in the same event. MultipleEvents: one package includes 1 ticket for each of two different events/dates. NestedPreset: one outer package includes 1 inner preset package that includes 2 leaf tickets; the organization has enable_multi_layer_packages enabled. ReverseRatio: an existing supported 2-parent-to-1-child package, without assigned seating or child revenue allocation; use_reverse_ratio_packages is enabled for the organization. For NestedPreset, the inner package and leaf ticket remain checked when the outer package is cleared.
* Choose an existing PurchaseEntry that sells this configured package: EventDetail opens its public event; RecurringDate opens the recurring parent and selected date/time; AttractionCalendar opens its configured attraction section and selected date/time; EventWidget uses the recorded embedded/modal host; MobileApp uses Showpass → Explore → the package event or attraction and stays inside the app. For calendar entries, prepare the selected occurrence’s package and record its included dates.

**Tags:** public, packages, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected purchase entry and attempt to add the package. | Quantity 1; parent and included tickets checked | The parent is publicly unavailable and no package or included ticket enters the cart. |
| As the organizer, open Manage Events → the package event → Edit → Ticket Types → edit the package ticket → General. | Parent only | Show as sold out publicly is checked. |
| Uncheck Show as sold out publicly. | Leave all included ticket checkboxes checked | The parent checkbox is unchecked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| As the customer, reopen the same purchase entry and add one package. | Parent unchecked; included types still checked | One package with its configured contents enters the cart. |
| Increase the package quantity to 3. | Quantity 3 | SingleEvent/NestedPreset: 6 leaf tickets; MultipleEvents: 3 tickets for each included event; ReverseRatio: 2 included tickets. |
| Review the event/date and package contents at checkout. | Recorded included events and quantities | The summary retains the selected dates and quantities without duplicate or standalone child lines. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The order summary is ready for the zero-total purchase. |
| Select Complete transaction once. | Recorded package contents | One successful order confirmation is shown. |
| Open the order and its issued tickets. | New order; recorded barcode mode | The configured package contents are present; parent-only, child or all-item barcodes follow the existing package setting. |
| As the organizer, reopen Box Office inventory for the included types. | Counts recorded before selection | The included ticket quantities are consumed once; the child public-sellout settings have not cleared. |
| Open an included ticket’s direct public event page and attempt to select that ticket separately. | Included type still checked; real inventory remains | It remains unavailable as a standalone public purchase even though it was just included in the package. |

**Postconditions:**

* Remove only unpurchased cart items. Retain completed orders, tickets, product lines and seat assignments; do not refund, void or release sold inventory as routine cleanup.
* Restore and reopen the original ticket checkbox values; restore any global setting changed for preparation after the coordinated ON pass.

### Shared regression continued — use the case’s switch state

#### TC-25 — Existing waitlist entry

> **Qase regression references (note only)**
>
> **Reusable waitlist baselines:** [Single-day signup (SPT-2880)](https://app.qase.io/case/SPT-2880), [public-calendar signup (SPT-3514)](https://app.qase.io/case/SPT-3514) and [widget-to-web signup (SPT-3520)](https://app.qase.io/case/SPT-3520). Keep the explicit switch/actual-empty/forced setup here; later automatic fulfillment is not covered by these signup cases.

**Title:** Public Checkout - Waitlists - Keep waitlist registration available for a publicly sold-out ticket type

**Description:** A public ticket type with an active waitlist is actually empty with the global switch OFF, or forced sold out despite remaining inventory with the switch ON. Both use the existing waitlist-registration path instead of normal ticket purchase.

**Global switch (`enable_force_public_sold_out`): OFF for SwitchOffEmpty; ON for SwitchOnForced.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** TRUE; actual zero supplies the OFF waitlist sellout.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Parameters:**

WaitlistState: SwitchOffEmpty, SwitchOnForced

**Preconditions:**

* Use a waitlist configured not to require a card at signup, a signed-in customer-owned account and no other pending waitlist entry for the same type. Do not release or process waitlist inventory during this case.
* A release owner sets global enable_force_public_sold_out OFF for SwitchOffEmpty or ON for SwitchOnForced in a coordinated window and records its original state.
* Select a published future event with a public on-sale ticket type, an active waitlist already attached, Public sold out = Yes; for SwitchOffEmpty its positive capacity is consumed by owned test purchases (0 remaining), and for SwitchOnForced it has at least 1 remaining. A waitlist lets customers register interest for tickets released later; it is not a completed ticket purchase.
* An administrator has saved Public sold out = Yes in Admin → Tickets → Ticket types for the selected type. Have the public event page; do not use a hold link.

**Tags:** public, waitlists, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public event page. | Selected type | The type offers the existing waitlist action instead of normal purchase. |
| Select the waitlist action for that type. | Selected type | The waitlist registration flow opens for that type. |
| Select one waitlist place and continue to registration. | Quantity 1 | The registration shows the correct event/date and ticket type. |
| Enter the required details and submit the waitlist signup. | Customer-owned details; no card required | One waitlist signup confirmation is shown. |
| Open the customer account → Waitlists and find this event. | Same account/type | Exactly one pending entry exists; signup has not created a paid ticket order. |

**Postconditions:**

* After recording the new entry, open the account’s Waitlists page, select Leave waitlist on that entry, then Leave in the confirmation. Verify it is no longer pending. Do not cancel another customer’s entry.
* Restore and verify the original global switch and checkbox values. Later allocation/payment remains outside this signup check.

#### TC-26 — Refund an internal sale without reopening public sales or changing the refund amount

> **Qase regression references (note only):** [Full invoice refund (SPT-946)](https://app.qase.io/case/SPT-946) and [Selected-item refund (SPT-4763)](https://app.qase.io/case/SPT-4763) are related baselines; the amount comparison and explicit public reopening are required here.

**Title:** Dashboard - Tickets - Refund inventory stays publicly sold out until the ticket setting is cleared

**Description:** An organizer previews the refund, enables the ticket’s public-sellout setting, and refunds the internal sale. The refund amount stays the same. Returned inventory remains publicly unavailable with the global switch ON; clearing the ticket setting reopens it. The OFF run preserves normal inventory-return behavior.

**Global switch (`enable_force_public_sold_out`): OFF or ON, selected by SwitchState; keep it fixed.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Initially No for the refund preview; Yes during the refund; No after clearing.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Parameters:**

SwitchState: Off, On

**Preconditions:**

* Employee permissions: Manage Events, Administer Transactions, Administer Cash Refunds, Full Refund, Use Box Office and View Box Office Stats.
* A release owner sets global enable_force_public_sold_out to SwitchState and records the original value. An administrator can edit Public sold out in Admin → Tickets → Ticket types when the employee checkbox is hidden in the OFF run.
* Select a published future event with one public on-sale general-admission type, a positive inventory cap of 1, and one completed internal cash sale for that ticket. The ticket is unscanned and not transferred, previously refunded or exchanged. There are no other holds, orders, packages, resale, protection or event-wide capacity restrictions.
* Use an execution-owned order with no real customer cash owed. Record its reference, ticket, original amount and ticket setting; start with Public sold out = No. Keep its price, fees, tax, refund option and order contents unchanged throughout.

**Tags:** dashboard, tickets, refunds

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions → the recorded sale → Refund. | One internal sale | The refund form shows the original ticket. |
| Select Base refund and record the displayed refund amount and breakdown. | Refund All selected | The amount is recorded before changing the ticket setting. |
| Select Close without submitting. | — | No refund has been processed. |
| As the administrator, open Admin → Tickets → Ticket types and save Public sold out = Yes for the recorded type. | Record and reopen the same event/type | The saved ticket field is Yes; the global switch remains at SwitchState. |
| Reopen the same transaction’s Refund form and select Base refund. | Same order, item selection and refund option | The refund amount and displayed breakdown equal the earlier preview. |
| Enter the required Reason and submit the refund form. | Inventory-return check for the owned internal sale | The cash-refund confirmation shows the unchanged amount. |
| Select Agree & Process Refund once. | Recorded internal cash sale | The refund completes for the previewed amount. |
| Reopen the transaction and its ticket details. | Original ticket | The refund is recorded once and the original ticket is no longer active. |
| Open Box Office → Sell and select the event. | Same type | Actual remaining inventory returns from 0 to 1 after processing completes. |
| As the customer, open a fresh public event page. | SwitchState | On: the type remains sold out; Off: the returned ticket is selectable. |
| As the administrator, reopen the type in Admin → Tickets → Ticket types. | Same type | Public sold out is still Yes; the refund did not clear it. |
| Save Public sold out = No and reopen the record. | Leave the global switch at SwitchState | The ticket setting remains No. |
| As the customer, reopen the public event page and add one returned ticket. | Quantity 1 | The returned type can enter the cart in either switch state. |

**Postconditions:**

* Remove the returned ticket from the cart and restore/reopen the original ticket field and global switch values.
* Retain the original sale and refund record. Do not delete accounting records or reverse the refund as cleanup.

### Switch-transition smoke — intentionally changes the global switch

#### TC-27 — Switch-on/off/on smoke with a stored true setting

> **Qase regression references (note only)**
>
> **No direct switch-transition case found.** Related baselines: [public/widget purchase (SPT-3287)](https://app.qase.io/case/SPT-3287) and [actual sold-out behavior (SPT-402)](https://app.qase.io/case/SPT-402). Neither performs ON → OFF → ON with the ticket setting retained.

**Title:** Core - Tickets - Restore current public sales behavior when the global switch is turned off

**Description:** With public sellout saved on an available ticket type, a release owner turns the global switch on, off and on again. The available type alternates between sold out and selectable, the employee control follows the switch, and a second type with no remaining tickets stays sold out throughout.

**Global switch (`enable_force_public_sold_out`): ON → OFF → ON.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Checked (TRUE) throughout; the global switch is the value being changed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |
| Widget | Desktop |

**Preconditions:**

* A release owner can change **Admin → Waffle → Switches → enable_force_public_sold_out** in a coordinated window because this switch affects all venues; record its original Active value.
* An employee has **Manage Events**.
* Select a published future event with two public on-sale types: one with at least 2 remaining and **Public sold out = Yes**, and one with a positive inventory cap fully consumed by test purchases. There is no event-wide capacity limit blocking the first type.
* An administrator prepares the first type in **Admin → Tickets → Ticket types**, finding it by event/type name and saving **Public sold out = Yes**; record its original value. Have the event’s public page and event widget.

**Tags:** public, tickets, admin-actions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Admin → Waffle → Switches, save the named switch with Active checked. | enable_force_public_sold_out | Reopening the switch shows Active checked. |
| As the employee, open Manage Events → select the event → Edit → Ticket Types → edit the available type. | General tab | **Show as sold out publicly** is visible and checked. |
| Open a fresh public event page or event widget. | Same event | Both ticket types show sold out and cannot be added. |
| As the release owner, save the switch with Active unchecked. | Leave both ticket-type values unchanged | Reopening the switch shows Active unchecked. |
| As the employee, reload the event editor and reopen the same ticket type. | General tab | **Show as sold out publicly** is absent. |
| Open a fresh public event page or event widget. | Same event | The type with remaining inventory is selectable, while the empty type stays sold out. |
| Select one ticket of the available type. | Quantity 1 | One ticket is accepted into the cart. |
| Remove that ticket from the cart. | Quantity 0 | The cart is empty. |
| As the release owner, save the switch with Active checked again. | Do not edit the ticket type | Reopening the switch shows Active checked. |
| As the employee, reload the editor and reopen the ticket type. | General tab | **Show as sold out publicly** is still checked. |
| Open a fresh public event page or event widget. | Same event | Both types are sold out and unavailable for selection again. |

**Postconditions:**

* Restore the switch and ticket-type values to their recorded originals and verify them by reopening the admin records.
* Record timestamps for each switch save and public response; if the first fresh view is stale, record that result before checking again at 25 minutes.

### Additional inventory-return regressions

#### TC-28 — Release a hold without reopening public sales

> **Qase regression references (note only):** [Held basket checkout (SPT-1255)](https://app.qase.io/case/SPT-1255) is related allocated-access coverage; this release-to-public-availability sequence is a separate case.

**Title:** Box Office - Holds - Released inventory remains publicly sold out until the ticket setting is cleared

**Description:** An organizer releases a basic hold that reserved the last ticket. Inventory becomes available for staff, but customers remain blocked until the organizer clears the ticket’s public-sellout checkbox.

**Global switch (`enable_force_public_sold_out`): ON throughout; do not turn it OFF to reopen this ticket.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Checked through hold release; then cleared.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Employee permissions: Use Box Office, Manage Holds, Manage Events and View Box Office Stats.
* Global enable_force_public_sold_out is ON; record its original value and coordinate the global state.
* Select a published future event with one public on-sale general-admission type, a positive inventory cap of 1, and one employee-owned basic hold reserving that ticket. There are no completed sales or other reservations. Record the hold, customer, event/type and hold link.
* The organizer has saved Show as sold out publicly as checked. No waitlist, resale, package, password or event-wide limit applies. This allocation belongs to the execution team; releasing it makes its purchase link unusable.

**Tags:** box-office, holds, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Box Office → Holds and find the recorded hold. | Employee-owned hold | The hold is active with one allocated ticket. |
| Open Box Office → Sell for that event in a separate tab. | Fresh cart | There are 0 unallocated tickets remaining. |
| Return to Holds and select Release Hold. | Recorded hold only | Release Inventory warns that the hold will return to general inventory. |
| Select Confirm. | Release once | The release completes and the hold is no longer active. |
| Reopen Box Office → Sell for the event. | Same type | One ticket is available again. |
| As the customer, open the ordinary public event page. | No hold link | The type remains sold out and cannot be selected. |
| Open the released hold’s purchase link. | Recorded link | The released allocation cannot be purchased through that link. |
| Open Manage Events → the event → Edit → Ticket Types → edit the same type. | General tab | Show as sold out publicly is still checked. |
| Uncheck Show as sold out publicly. | Leave the global switch ON | The ticket-type checkbox is unchecked. |
| Select Next, then Save Event. | Same type | The event saves successfully. |
| Reopen the same ticket-type editor. | General tab | The checkbox is still unchecked. |
| As the customer, reopen the public event page and select one returned ticket. | Quantity 1 | The ticket can be added to the cart for the correct event and type. |

**Postconditions:**

* Remove any unpurchased public ticket from the cart; restore and reopen the original ticket checkbox and global switch values.
* Retain the released hold’s reference and history; do not recreate its allocation as cleanup.

#### TC-29 — Increase inventory without accidentally reopening public sales

> **Qase regression references (note only):** [Increase inventory and restore availability (SPT-766)](https://app.qase.io/case/SPT-766) is the OFF/unforced baseline. The ON + checked outcome here must stay closed until the checkbox is cleared.

**Title:** Dashboard - Tickets - Extra inventory remains publicly sold out until the ticket setting is cleared

**Description:** An organizer increases a sold-out ticket type’s inventory. The additional ticket becomes available internally without reopening public sales; clearing Show as sold out publicly then allows customer selection.

**Global switch (`enable_force_public_sold_out`): ON throughout; do not turn it OFF to reopen this ticket.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Checked while Inventory changes; then cleared.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Employee permissions: Manage Events, Use Box Office and View Box Office Stats.
* Global enable_force_public_sold_out is ON; record its original value and coordinate the global state.
* Select a published future event with one public on-sale general-admission type: Inventory is 1, exactly one ticket was sold by the execution team, 0 remain, and Show as sold out publicly is checked. Record original values and the retained sale.
* No other reservations, waitlist, resale, package, password or event-wide limit applies. No other sales occur while the organizer compares counts.

**Tags:** dashboard, tickets, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events → the event → Edit → Ticket Types → edit the selected type. | General tab | Inventory is 1 and Show as sold out publicly is checked. |
| Change Inventory from 1 to 2. | Leave the checkbox checked | The extra capacity is entered without changing the public-sellout setting. |
| Select Next, then Save Event. | Same event | The event saves successfully. |
| Reopen the ticket-type editor. | Same type | Inventory remains 2 and Show as sold out publicly remains checked. |
| Open Box Office → Sell for the event. | Same type | The original sale is still recorded and one additional ticket is available. |
| As the customer, open the public event page and try to select the type. | Same type | The added inventory has not reopened public selection. |
| Open Manage Events → the event → Edit → Ticket Types → edit the same type. | General tab | Show as sold out publicly is still checked. |
| Uncheck Show as sold out publicly. | Leave the global switch ON | The ticket-type checkbox is unchecked. |
| Select Next, then Save Event. | Same type | The event saves successfully. |
| Reopen the same ticket-type editor. | General tab | The checkbox is still unchecked. |
| As the customer, reopen the public event page and select one returned ticket. | Quantity 1 | The ticket can be added to the cart for the correct event and type. |

**Postconditions:**

* Remove the newly selected ticket from the cart. Restore Inventory to 1 only after confirming no additional sale or reservation consumed the added capacity.
* Restore and reopen the original checkbox and global switch values; retain the original sale.

#### TC-30 — Exchange an internal sale while keeping the returned type publicly sold out

> **Qase regression references (note only):** [Exchange price/quantity scenarios (SPT-1275)](https://app.qase.io/case/SPT-1275) and [Same-value cash exchange (SPT-4823)](https://app.qase.io/case/SPT-4823) are related baselines. This case adds retained public sellout and a same-order credit comparison.

**Title:** Box Office - Exchanges - Exchanged inventory stays publicly sold out without changing the exchange credit

**Description:** An employee exchanges an internal sale for a different eligible ticket. The original ticket is replaced, its inventory returns, and its public-sellout setting stays checked. The credit shown before and after enabling that setting must match; only clearing the setting reopens the returned type.

**Global switch (`enable_force_public_sold_out`): ON throughout; do not turn it OFF to reopen this ticket.**

**Ticket-type setting (`public_sold_out` / Show as sold out publicly):** Original type No → Yes before exchange; original type cleared after inventory returns.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Employee permissions: Administer Transactions, Use Box Office, Manage Events and View Box Office Stats.
* Global enable_force_public_sold_out is ON. The organization has Exchanges enabled and allows staff exchanges. Use the whole-order exchange flow; enable_itemized_exchanges_on_all_item_types is OFF for this run so the stated dialog is used. Record original switch/flag values.
* Select an execution-owned completed internal cash sale for exactly one ticket of an original type with Inventory 1 and 0 remaining. The ticket is unscanned, not previously transferred/refunded/exchanged, and eligible under the organization’s exchange date/time rules. Start with the original type’s public-sellout field unchecked.
* Have a different on-sale replacement ticket in the same organization with actual stock available and public sellout unchecked. Choose a replacement whose displayed checkout total equals the exchange credit so no additional payment or leftover credit is needed; record the replacement and exact credit/total.
* Both types are public general-admission tickets without package, resale, waitlist, protection, shipping or event-wide capacity complications. All orders and customer details belong to the execution team.

**Tags:** box-office, exchanges, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Box Office → Transactions → the recorded original sale → Exchange. | One-ticket internal sale | The exchange summary shows the original ticket and available credit. |
| Record the exchange credit and displayed fee/tax breakdown, then close the dialog before starting the exchange. | Original field unchecked | No replacement sale has started; the baseline amounts are recorded. |
| Open Manage Events → original event → Edit → Ticket Types → edit the original type. | General tab | Show as sold out publicly is unchecked. |
| Check Show as sold out publicly, then select Next and Save Event. | Original type only | Reopening the editor shows the saved checkbox checked. |
| Reopen the original transaction’s Exchange action. | Same original sale | The credit and displayed fee/tax breakdown equal the earlier preview. |
| Select Start Exchange or Begin exchange, as displayed. | Whole original order | Box Office opens the replacement sale for the original customer. |
| Select one ticket of the recorded replacement type. | Matching credit and replacement total | The replacement cart contains only that ticket. |
| Apply the original order’s Exchange Credit to the replacement checkout. | Recorded credit | The credit covers the displayed total and the amount due is zero. |
| Select Process Transaction once. | No additional payment | One replacement order completes. |
| Open the original and replacement transaction details. | Linked exchange records | The original ticket is inactive, one replacement ticket is issued, and the original exchange credit was consumed once. |
| Open Box Office → Sell for the original event/type. | Original type | One original-type ticket is available again after exchange processing completes. |
| As the customer, open the original event’s public page. | Original type; no hold link | The returned original type remains sold out and cannot enter the cart. |
| Open Manage Events → the event → Edit → Ticket Types → edit the same type. | General tab | Show as sold out publicly is still checked. |
| Uncheck Show as sold out publicly. | Leave the global switch ON | The ticket-type checkbox is unchecked. |
| Select Next, then Save Event. | Same type | The event saves successfully. |
| Reopen the same ticket-type editor. | General tab | The checkbox is still unchecked. |
| As the customer, reopen the public event page and select one returned ticket. | Quantity 1 | The ticket can be added to the cart for the correct event and type. |

**Postconditions:**

* Remove any unpurchased public ticket from the cart; restore and reopen the original ticket checkbox and global switch values.
* Retain the original and replacement orders and exchange-credit history. Do not reverse the exchange or reactivate the original ticket as cleanup. Restore any exchange-flow flag changed for this execution.

### Additional package coverage — global switch ON

These cases use the global switch ON throughout. The organizer can check or clear the visible ticket-type checkbox in this state; an unchecked package parent is needed to prove the included-ticket exception. A product has no ticket-type public-sellout checkbox.

#### TC-31 — Custom packages — required choices and publicly sold-out included tickets

> **Qase regression references (note only):** [Custom package purchase (SPT-3334)](https://app.qase.io/case/SPT-3334) is a related baseline from the earlier scan. This new local case adds the parent/child switch-ON rule, required choice and replacement proof.

**Title:** Public Checkout - Packages - Complete custom ticket choices without treating included public sellout as exhausted inventory

**Description:** A custom package asks the customer to choose its included tickets. With the global switch ON, the parent checkbox blocks the package; after only the parent is cleared, publicly sold-out included tickets with real inventory remain usable inside the package. Changing a choice must replace the old selection.

**Global switch (`enable_force_public_sold_out`): ON throughout.**

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats and Administer Transactions. The organizer prepares ticket settings; the customer uses a separate public session.
* Global enable_force_public_sold_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* A parent is the package ticket the customer selects; children are its included tickets. Through Manage Events → Edit → Ticket Types → edit each relevant type → General, save Show as sold out publicly checked on the parent and the recorded included types. Select Next and Save Event; reopen to verify the saved values.
* Use an empty customer cart and customer-owned contact details. The package is free with no required paid extras, hold allocation, waitlist, access password or independent event-wide capacity restriction.
* Select an existing public custom package with one category requiring exactly 1 choice from two different general-admission ticket types, A and B. Both choices are otherwise eligible and each has at least 3 actual tickets remaining. Check public sellout on both choices and the package parent. Record their event dates, names, quantities and barcode mode. No seat or product selection is required.
* Start at the package’s public event page, or inside Showpass → Explore → its event card. Record both included tickets’ direct public event pages to check their standalone availability.

**Tags:** public, packages, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the package’s public event and attempt to select it. | Parent checked | The package cannot be added. |
| As the organizer, open Manage Events → the package event → Edit → Ticket Types → edit the package ticket → General. | Parent only | Show as sold out publicly is checked. |
| Uncheck Show as sold out publicly. | Leave all included ticket checkboxes checked | The parent checkbox is unchecked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| Reopen the public event and select one package. | Parent unchecked; A and B remain checked | The custom package choices open. |
| Leave the category unselected and try Continue. | Required choices: 1 | The customer cannot proceed without the required choice. |
| Select choice A. | Quantity 1 package | A is the category’s selected ticket despite its public-sellout checkbox. |
| Select choice B instead. | Same category | B replaces A; exactly one choice remains selected. |
| Select Continue and review checkout. | Choice B | The package includes B for the correct date; A is not included. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The order summary is ready for the zero-total purchase. |
| Select Complete transaction once. | Recorded package contents | One successful order confirmation is shown. |
| Open the order and issued tickets. | Recorded barcode mode | The completed package includes B exactly once and no ticket for A. |
| Open the direct public event pages for A and B. | Same saved checked values | Neither ticket can be selected as an ordinary standalone public purchase. |

**Postconditions:**

* Remove only unpurchased cart items. Retain completed orders, tickets, product lines and seat assignments; do not refund, void or release sold inventory as routine cleanup.
* Restore and reopen the original ticket checkbox values; restore any global setting changed for preparation after the coordinated ON pass.

#### TC-32 — Assigned-seat packages — included public sellout and seat ownership

> **Qase regression references (note only):** [Assigned seating purchase (SPT-217)](https://app.qase.io/case/SPT-217) and [shared-seat ownership (SPT-2357)](https://app.qase.io/case/SPT-2357) are related coverage, not an exact package-override match.

**Title:** Public Checkout - Packages - Preserve assigned seats when included tickets are publicly sold out

**Description:** A customer buys a seated preset or custom package. The parent’s public-sellout checkbox blocks selection until cleared. Public sellout on an included ticket must not by itself prevent the package’s legitimate seat allocation; actual occupied seats remain unavailable.

**Global switch (`enable_force_public_sold_out`): ON throughout.**

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Parameters:**

SeatingPackage: PresetSameSeat, CustomChosenSeats

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats and Administer Transactions. The organizer prepares ticket settings; the customer uses a separate public session.
* Global enable_force_public_sold_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* A parent is the package ticket the customer selects; children are its included tickets. Through Manage Events → Edit → Ticket Types → edit each relevant type → General, save Show as sold out publicly checked on the parent and the recorded included types. Select Next and Save Event; reopen to verify the saved values.
* Use an empty customer cart and customer-owned contact details. The package is free with no required paid extras, hold allocation, waitlist, access password or independent event-wide capacity restriction.
* PresetSameSeat: use an existing 1:1 preset package whose parent and included event share the same assigned space and linked seat. CustomChosenSeats: use a general-admission custom parent with two required categories, each offering one seated ticket for a different event, so the customer chooses one seat per included event. Each included ticket type has real inventory and its public-sellout checkbox checked.
* Record one unoccupied eligible seat per required map and a different seat already owned by an execution-owned completed order. Existing configured seat-selection rules must allow the requested quantity. Record all event dates, seat labels and the package’s barcode mode.
* Use the package’s public event page or the Showpass app’s event page. The configured purchase flow must already support this package’s seat selection; do not substitute a normal standalone seat purchase.

**Tags:** public, packages, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public package event and attempt to select the package. | Parent checked | The package cannot be added. |
| As the organizer, open Manage Events → the package event → Edit → Ticket Types → edit the package ticket → General. | Parent only | Show as sold out publicly is checked. |
| Uncheck Show as sold out publicly. | Leave all included ticket checkboxes checked | The parent checkbox is unchecked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| Reopen the public event and select one package. | Parent unchecked; included types remain checked | The package’s seat-selection flow is reachable. |
| For a custom package, confirm the required included choices and select Continue. | CustomChosenSeats; skip for PresetSameSeat | Every required included event is present for seat selection. |
| Attempt to select the recorded occupied seat on its map. | Seat already owned by the retained order | It cannot be allocated to this purchase. |
| Select the recorded available seat on each required map. | One seat per required event | The package retains the configured seat assignments despite the included ticket checkboxes. |
| Continue to checkout and inspect the package summary. | Recorded event/date/seat labels | The selected assignments are correct and none is duplicated. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The order summary is ready for the zero-total purchase. |
| Select Complete transaction once. | Recorded package contents | One successful order confirmation is shown. |
| Open the completed order and its tickets. | Package barcode mode and recorded seats | The configured entitlements carry the selected dates/seats. |
| Open a fresh public purchase session and try the purchased package seat again. | Previously purchased seats | An owned seat cannot be allocated to a second order. |

**Postconditions:**

* Remove only unpurchased cart items. Retain completed orders, tickets, product lines and seat assignments; do not refund, void or release sold inventory as routine cleanup.
* Restore and reopen the original ticket checkbox values; restore any global setting changed for preparation after the coordinated ON pass.

#### TC-33 — Ticket + product packages — selection, quantities and fulfillment

> **Qase regression references (note only):** [Preset package purchase (SPT-429)](https://app.qase.io/case/SPT-429) supplies a related baseline. No exact ticket + product public-sellout case was established by the earlier Qase scan.

**Title:** Core - Packages - Keep ticket and product contents together when reopening a publicly sold-out bundle

**Description:** A ticket + product package includes merchandise with the package ticket, and can also include other tickets. Public sellout on the package ticket blocks the whole bundle. After clearing only that checkbox, the customer can purchase the configured ticket/product contents and choose the correct product variant.

**Global switch (`enable_force_public_sold_out`): ON throughout.**

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |
| Widget | Desktop |
| Widget | Mobile |

**Parameters:**

BundleContents: TicketAndProduct, TicketChildrenAndProduct

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats and Administer Transactions. The organizer prepares ticket settings; the customer uses a separate public session.
* Global enable_force_public_sold_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* Use an empty customer cart and customer-owned contact details. The package is free with no required paid extras, hold allocation, waitlist, access password or independent event-wide capacity restriction.
* Select an existing published on-sale general-admission ticket bundle containing 2 units of one product per purchased package. The product has two selectable variants with at least 10 actual units remaining in each and a per-order limit of at least 6. The package ticket has capacity for at least 3 purchases. Record variant names, available stock and the product redemption/delivery mode.
* TicketAndProduct: the package ticket itself supplies admission plus the product. TicketChildrenAndProduct: the package also includes 1 ticket of a separate future event; that child has at least 3 remaining. All ticket and product components have zero price/fees for this zero-total checkout, and no shipping payment is required.
* Through Manage Events → Edit → Ticket Types, save Show as sold out publicly checked on the package ticket and every included child ticket. Record original values. Products have no ticket-type public-sellout checkbox.
* Use the public event page, its working event-widget host, or Showpass → Explore → the event. Select a bundle that already exposes its product variant choices through that entry. Record initial counts from Box Office; all records and customer details belong to the execution team.

**Tags:** public, packages, products

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected public purchase entry and attempt to add one bundle. | Package ticket checked | Neither the bundle nor a product-only purchase is added. |
| As the organizer, open Manage Events → the package event → Edit → Ticket Types → edit the package ticket → General. | Parent only | Show as sold out publicly is checked. |
| Uncheck Show as sold out publicly. | Leave all included ticket checkboxes checked | The parent checkbox is unchecked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| Reopen the public purchase entry and add one bundle. | Package unchecked; included child tickets remain checked | The bundle is accepted with its ticket contents and 2 product units. |
| Increase the bundle quantity to 3. | Quantity 3 | The cart contains 3 package admissions and 6 product units; TicketChildrenAndProduct also includes 3 child tickets. |
| Choose the recorded second product variant for each required product selection. | Second variant; 6 units total | The selected variant replaces the temporary/default choice without adding extra product units. |
| Continue to checkout and review the summary. | Ticket dates, selected variant, quantities and zero total | The summary shows the configured contents and chosen variant. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The order summary is ready for the zero-total purchase. |
| Select Complete transaction once. | Recorded package contents | One successful order confirmation is shown. |
| As the organizer, open Dashboard → Transactions and find the new order. | Confirmation reference | One order records the configured ticket entitlements and 6 units of the selected product variant, with no duplicate order or product-only order. |
| Inspect the order’s ticket and product details. | Recorded barcode and redemption/delivery settings | Ticket and product fulfillment follow the package configuration; a shared barcode is not mistaken for a missing child barcode. |
| Open Box Office and compare the selected product variant’s remaining stock with the recorded count. | Completed order quantity | Exactly 6 units of the selected variant were consumed; the unused variant has no retained reservation from this purchase. |

**Postconditions:**

* Remove only unpurchased cart items. Retain completed orders, tickets, product lines and seat assignments; do not refund, void or release sold inventory as routine cleanup.
* Restore and reopen the original ticket checkbox values; restore any global setting changed for preparation after the coordinated ON pass.

#### TC-34 — Existing package cart — parent becomes publicly sold out

> **Qase regression references (note only):** [Existing-cart recovery (SPT-4928)](https://app.qase.io/case/SPT-4928) cover related cart recovery. This is a separate local package final-purchase check; no exact Qase match is claimed.

**Title:** Public Checkout - Packages - Reject a package at checkout when its parent becomes publicly sold out

**Description:** A customer selects an available package before the organizer enables public sellout on its parent. Checkout must reject that package even though it was already selected, without creating an order containing only some of its tickets or products.

**Global switch (`enable_force_public_sold_out`): ON throughout.**

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Parameters:**

PackageContents: PresetTickets, CustomTickets, TicketAndProduct

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats and Administer Transactions. The organizer prepares ticket settings; the customer uses a separate public session.
* Global enable_force_public_sold_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* Use an existing public on-sale package with actual inventory available in every required component, no seats/hold/waitlist/password, and a zero-total purchase without paid extras. Its parent checkbox starts unchecked; all included ticket checkboxes are checked. Record original settings and order counts for the execution-owned customer.
* PresetTickets includes 1 ticket for a future event. CustomTickets requires 1 choice and has an eligible recorded choice. TicketAndProduct includes 1 unit of a recorded product variant. Record the expected complete contents and use the package’s public event page or its in-app public event page.
* Keep the customer’s cart unexpired while a separate organizer session changes the parent checkbox. Do not change actual stock, sales dates, product settings or prices during the case.

**Tags:** public, packages, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the package’s public event and select one package. | Recorded PackageContents | The package can be selected while the parent checkbox is unchecked. |
| Complete the required ticket choice or product-variant selection. | Recorded contents; no extra choice for a preset package | The cart contains the complete configured bundle. |
| Continue to checkout and enter the required customer details. | Execution-owned customer | The package is ready for final submission. |
| As the organizer, open Manage Events → package event → Edit → Ticket Types → edit the package ticket. | General tab | Show as sold out publicly is unchecked. |
| Check Show as sold out publicly. | Parent only | The parent checkbox is checked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The parent setting saves successfully. |
| As the customer, accept terms and attempt Complete transaction in the existing checkout. | Same unexpired cart | Purchase is blocked with sold-out/unavailable feedback; no successful order confirmation appears. |
| As the organizer, check Dashboard → Transactions for that customer and attempt time. | Recorded customer and starting order count | No new completed order, partial product-only order, or new issued package tickets were created. |

**Postconditions:**

* Remove the unpurchased package from the customer cart, including its ticket/product selections, and verify its temporary reservations are released.
* Restore and reopen the original parent/child checkbox values. Restore any global setting changed for preparation after the coordinated ON pass.

#### TC-35 — Package contents actually unavailable — no overselling

> **Qase regression references (note only):** [Package child-capacity constraints (SPT-4832)](https://app.qase.io/case/SPT-4832) is the related inventory baseline. Product and seat shortages require their own component setup.

**Title:** Public Checkout - Packages - Keep actual ticket and product shortages enforced with public sellout enabled

**Description:** The package parent is publicly available, but one required component has no real stock or no available seat. Ignoring an included ticket’s public-sellout checkbox must not bypass actual ticket capacity, product stock or seat ownership.

**Global switch (`enable_force_public_sold_out`): ON throughout.**

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Parameters:**

UnavailableComponent: PresetTicket, CustomRequiredChoice, BundledProduct, AssignedSeat

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats and Administer Transactions. The organizer prepares ticket settings; the customer uses a separate public session.
* Global enable_force_public_sold_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* Use an execution-owned published package whose parent checkbox is unchecked and all included ticket checkboxes are checked. Parent inventory and all unrelated components have stock; no hold, waitlist, password or sale-time restriction applies. Record existing order references and component counts.
* PresetTicket: the sole required included ticket has 0 remaining from a positive cap consumed by retained orders. CustomRequiredChoice: the package requires exactly 1 choice and every offered choice has actual 0 remaining. BundledProduct: the included product has no remaining stock in any eligible variant. AssignedSeat: an included seated event has no unoccupied eligible seat for the required selection. Use an existing correctly configured package for the selected condition.
* All zero-stock/occupied-seat records belong to the execution team. Use the package’s public event page or in-app public page and an empty cart; do not alter package composition or release the capacity-consuming orders.

**Tags:** public, packages, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the package’s public purchase flow. | Recorded UnavailableComponent | The recorded package is located; its unavailable state or the relevant selection restriction is visible. |
| Attempt to select one package and complete its required component selection. | Quantity 1 | The unavailable component cannot be fulfilled; no complete purchasable package is accepted. |
| If the flow reaches checkout, attempt to continue with the unavailable component. | Same package | Checkout remains blocked and no successful order is created. |
| Inspect the customer cart and order history. | Execution-owned customer | There are no issued package tickets or partial product-only orders from the attempt. |
| As the organizer, recheck the exhausted component in Box Office. | Recorded counts and retained orders | No oversale occurred; existing ticket/seat ownership is unchanged. |

**Postconditions:**

* Remove any unpurchased cart contents. Retain the orders that consumed capacity; do not refund or void them as cleanup.
* Restore original checkbox/global values changed for preparation after the coordinated ON pass.

#### TC-36 — In-person package sale — tickets and products remain sellable

> **Qase regression references (note only):** [Preset package purchase (SPT-429)](https://app.qase.io/case/SPT-429) and existing Box Office sale baselines are related coverage. This is a local package-specific in-person case.

**Title:** Box Office - Packages - Complete an in-person package sale despite public sellout

**Description:** A Box Office employee sells a package whose parent and included ticket types are marked publicly sold out. Actual available inventory still permits the in-person sale, including required custom choices or bundled products.

**Global switch (`enable_force_public_sold_out`): ON throughout.**

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

**Parameters:**

PackageContents: PresetTickets, CustomTickets, TicketAndProduct

**Preconditions:**

* Employee permissions: Use Box Office, Cash Box Office Sales, View Box Office Stats and Administer Transactions. An organizer with Manage Events prepares and records the ticket checkboxes.
* Global enable_force_public_sold_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* Select an existing on-sale general-admission package priced above zero, with actual stock for at least 2 purchases, no waitlist/password or seat selection, and its parent/included ticket checkboxes all checked. Use a customer and cash order owned by the execution team.
* PresetTickets includes 1 ticket of another future event. CustomTickets requires exactly 1 choice from two recorded available types. TicketAndProduct includes 1 product unit with exactly one eligible variant, so no unsupported in-person variant picker is assumed. Record complete contents, configured barcode/fulfillment mode, starting component counts and the displayed total.
* Use Web Box Office → Sell or the Showpass desktop app → Box Office → Sell. For CustomTickets, use the existing Box Office package-choice dialog. Record the selected event/date; do not use a public hold link.

**Tags:** box-office, packages, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected Box Office app → Sell → the package event/date. | Recorded package | The package can be selected despite its public-sellout checkbox. |
| Select one package. | Quantity 1 | The package enters the in-person purchase flow. |
| For CustomTickets, choose the recorded included ticket and select Continue. | Required choices: 1; skip for fixed contents | The cart retains the complete configured package; the custom choice is retained. |
| Select Continue to checkout. | Configured ticket/product contents | The sale summary contains the correct contents and total. |
| Complete customer details and select Cash. | Execution-owned customer; displayed total | The sale is ready for processing. |
| Select Process Transaction once. | One package | One successful cash-sale confirmation is shown. |
| Open Dashboard → Transactions and find that confirmation reference. | New sale | Exactly one cash transaction/order contains the configured ticket and product entitlements. |
| Check the issued items and Box Office inventory. | Recorded counts and fulfillment mode | The correct included quantities are consumed once and tickets/products follow the configured fulfillment mode. |
| Open a fresh public event page for the package. | Parent checkbox still checked | The in-person sale has not reopened the package for public purchase. |

**Postconditions:**

* Remove only unpurchased cart items. Retain completed orders, tickets, product lines and seat assignments; do not refund, void or release sold inventory as routine cleanup.
* Restore and reopen the original ticket checkbox values; restore any global setting changed for preparation after the coordinated ON pass.


## Qase Regression Gap Analysis — 2026-09-14

**There is substantial reusable regression coverage in Qase. Keep the existing baseline cases and use the local drafts for the missing switch-specific checks and purchase paths.** This review concerns regression reuse, not whether Qase already contains the new feature tests. At the time of this read-only review, no cases were created, edited, moved or deleted; no runs or execution results were queried. Subsequently, the user authorized creation of TC-02 as [SPT-5230](https://app.qase.io/case/SPT-5230) in suite 625; the search results below describe the earlier snapshot.

### How to use existing cases in the OFF and ON passes

* **OFF:** execute the selected baseline cases with the global switch OFF. For available-ticket purchase checks, use a stored Public sold out = Yes value as specified in the local pass to prove it is ignored. Keep genuinely exhausted ticket types for the existing sold-out/oversell checks.
* **ON, unchanged public behavior:** execute the same available-ticket purchase cases with Public sold out = No. Actual-zero inventory cases remain unchanged. Use the local forced-sellout cases for the separate Yes result; an existing success case cannot prove that rejection.
* **ON, staff behavior:** execute the existing staff purchase cases with Public sold out = Yes and actual inventory remaining. Keep actual-zero rejection checks separate. Customer kiosk selection is its own public-facing rule, even though its purchase endpoint is venue-based.
* Put global state, saved ticket setting, entry point, app/OS and record names in execution evidence. These are proposed run conditions; they are **not currently stored in the Qase cases**. Preserve existing platform/payment parameters and useful assertions when selecting regression rows. No Qase changes are needed simply to identify reusable cases.

### Existing coverage and remaining regression gaps

**Reuse baseline** means the case contains a relevant procedure, not that it has passed or fully covers this switch. **Partial** means it stops before the required result, lacks a specific entry/state, or needs clearer execution steps.

| Regression area | Existing Qase cases | Local mapping | What can be reused / what is missing |
| --- | --- | --- | --- |
| Actual sold-out tickets; single/recurring, public/widget and staff | [SPT-402](https://app.qase.io/case/SPT-402), [SPT-3295](https://app.qase.io/case/SPT-3295), [SPT-3505](https://app.qase.io/case/SPT-3505), [SPT-2451](https://app.qase.io/case/SPT-2451) | TC-09, TC-14, TC-01, TC-02 | Reuse baseline. SPT-402 explicitly prevents adding exhausted tickets and checks an available control; SPT-3505 allows opening a sold-out calendar date but prevents adding tickets. Neither establishes the 25-minute aggregate change. |
| Public single-day and recurring purchase | [SPT-3287](https://app.qase.io/case/SPT-3287), [SPT-3288](https://app.qase.io/case/SPT-3288), [SPT-3290](https://app.qase.io/case/SPT-3290) | TC-01, TC-02 | Reuse baseline. Full purchase, order/ticket and inventory checks; WebPublic, Widget and ReactNativePublic are explicit. Generic Widget does not separately prove modal, embedded, legacy or website handoffs. |
| Attraction: fixed event, timeslot, quantity-first and mixed items | [SPT-3513](https://app.qase.io/case/SPT-3513), [SPT-3512](https://app.qase.io/case/SPT-3512), [SPT-388](https://app.qase.io/case/SPT-388), [SPT-389](https://app.qase.io/case/SPT-389) | TC-01, TC-02 | Reuse purchase baseline plus selection checks. SPT-3513 completes public/widget purchase for SingleEvent and TimeslotEvent. SPT-3512 only carries quantity into checkout; execute the full purchase from that starting state. |
| Current calendar hosts, embedded/modal SDK and website checkout | [SPT-4979](https://app.qase.io/case/SPT-4979), [SPT-4980](https://app.qase.io/case/SPT-4980), [SPT-4981](https://app.qase.io/case/SPT-4981), [SPT-4982](https://app.qase.io/case/SPT-4982) | TC-01, TC-02 | Partial. Hosts and selected-event scope are explicit; website basket commit and checkout handoff are covered. These stop before completed purchase. SPT-4979 explicitly targets current calendars; it does not cover legacy calendar. |
| Customer mobile app: Explore, seating and attraction | [SPT-4003](https://app.qase.io/case/SPT-4003), [SPT-3287](https://app.qase.io/case/SPT-3287), [SPT-3288](https://app.qase.io/case/SPT-3288) | TC-01, TC-02, TC-10, TC-11 | Reuse baseline. SPT-4003 completes an in-app purchase for Event, SeatingEvent and AttractionEvent and checks app recovery; SPT-3288 includes native recurring purchase. Record iOS and Android separately. |
| Customer mobile app: Saved and cart resume | [SPT-2024](https://app.qase.io/case/SPT-2024), [SPT-3349](https://app.qase.io/case/SPT-3349), [SPT-4928](https://app.qase.io/case/SPT-4928) | TC-01, TC-02, TC-19 | Partial. Saved opens the correct purchase page; empty/expired basket recovery is covered. No reviewed case completes a purchase specifically from Saved or the native cart icon after availability changes. |
| Public assigned-seat map and best available | [SPT-217](https://app.qase.io/case/SPT-217), [SPT-2927](https://app.qase.io/case/SPT-2927), [SPT-2935](https://app.qase.io/case/SPT-2935), [SPT-2934](https://app.qase.io/case/SPT-2934), [SPT-4049](https://app.qase.io/case/SPT-4049) | TC-10, TC-11, TC-12 | Reuse positive purchase and occupied-seat/quantity controls. Missing: a seat whose only ticket type is exhausted, and a shared seat with one exhausted type and one available type. A sold seat is a different state from an available seat with an exhausted ticket type. |
| Web Box Office and Electron: single-day and recurring | [SPT-4066](https://app.qase.io/case/SPT-4066), [SPT-4069](https://app.qase.io/case/SPT-4069), [SPT-402](https://app.qase.io/case/SPT-402) | TC-13, TC-14 | Reuse positive purchase and actual-zero rejection for the named web/desktop rows. Preserve customer, payment and occurrence coverage; select supported rows instead of multiplying every processor permutation. |
| Staff attraction calendar | [SPT-1077](https://app.qase.io/case/SPT-1077), [SPT-5138](https://app.qase.io/case/SPT-5138) | TC-13, purchase-entry ledger | Partial and a local-draft gap. SPT-1077 verifies child-ticket mapping and venue basket addition but stops before sale completion. SPT-5138 also stops early and has a missing expected result. Add an attraction-started staff purchase execution; ordinary event-list sale is insufficient. |
| Native POS event sale | [SPT-2650](https://app.qase.io/case/SPT-2650), [SPT-2688](https://app.qase.io/case/SPT-2688), [SPT-2700](https://app.qase.io/case/SPT-2700) | TC-15, TC-16 | Reuse POS purchase baseline. SPT-2650 has SingleDay/Recurring; SPT-2688 completes Square payment and checks transaction source. SPT-2700 checks configuration/invalid selections but does not explicitly prove exhausted ticket-type rejection. |
| Native Mobile Box Office event sale | [SPT-3251](https://app.qase.io/case/SPT-3251) | TC-15, TC-16 | Gap. SPT-3251 explicitly exercises Mobile Box Office but only guest-information validation and cancellation. Broad staff cases list POS/Kiosk/WebBoxOffice/Electron, not a distinct native Mobile Box Office ticket-sale journey. Keep the dedicated local cases. |
| Staff assigned seating | [SPT-4074](https://app.qase.io/case/SPT-4074), [SPT-4075](https://app.qase.io/case/SPT-4075), [SPT-2357](https://app.qase.io/case/SPT-2357) | TC-17 | Reuse baseline for supported maps/best-available and seat ownership. The broad best-available platform labels require source-supported actions; do not treat a public Buy Tickets step as an executable native staff flow. |
| Customer kiosk: sale, sold-out display and attraction quantity | [SPT-2688](https://app.qase.io/case/SPT-2688), [SPT-2684](https://app.qase.io/case/SPT-2684), [SPT-2707](https://app.qase.io/case/SPT-2707) | TC-18 | Partial. SPT-2688 completes kiosk payment; SPT-2707 has quantity-first attraction checks. SPT-2684 only observes display and says likely unselectable. It needs a definite selection attempt, unavailable result and available control; its Inventory=0 preparation is ambiguous because configured zero can mean unlimited. |
| Widget cart reopen and ordinary checkout links | [SPT-2439](https://app.qase.io/case/SPT-2439), [SPT-2435](https://app.qase.io/case/SPT-2435), [SPT-4802](https://app.qase.io/case/SPT-4802) | TC-19, TC-20 | Reuse basket/handoff baseline. SPT-4802 covers empty/existing baskets and available/partially/all unavailable extras. These do not finish purchase after a saved ticket setting changes. Legacy express-widget and native cart-icon completion remain gaps. |
| One-click wallet checkout on public detail surfaces | [SPT-4903](https://app.qase.io/case/SPT-4903), [SPT-4904](https://app.qase.io/case/SPT-4904) | Newly discovered regression entry; no existing local case | Reuse SPT-4903 for DetailPageModal, AttractionSidebar and MobileCartSummary with a paid eligible ticket. SPT-4904 preserves eligibility exclusions, including ReactNativeWebview. This is separate from legacy ExpressWidget; the local free-ticket smoke cannot exercise it. |
| Ticket add-on and upgrade | [SPT-3096](https://app.qase.io/case/SPT-3096), [SPT-3743](https://app.qase.io/case/SPT-3743) | TC-21 | Add-on purchase baseline exists, but SPT-3096 has shifted step/result pairs. Upgrade case SPT-3743 has only two GIVEN/THEN rows and ends at replacement; it needs executable selection, unavailable-target/base-retention checks and purchase completion. |
| Allocated holds and staff/group sales | [SPT-1249](https://app.qase.io/case/SPT-1249), [SPT-1253](https://app.qase.io/case/SPT-1253), [SPT-1255](https://app.qase.io/case/SPT-1255), [SPT-1291](https://app.qase.io/case/SPT-1291), [SPT-1307](https://app.qase.io/case/SPT-1307), [SPT-5104](https://app.qase.io/case/SPT-5104) | TC-23, TC-22 | Reuse SPT-1255 for held staff checkout, SPT-1291/1307 for new group-sale purchases, and SPT-5104 for complimentary public basic links. SPT-1253 reaches branded checkout without completing payment. New group sale does not prove checkout of an existing group allocation. |
| Preset/custom package purchase and actual inventory | [SPT-429](https://app.qase.io/case/SPT-429), [SPT-3334](https://app.qase.io/case/SPT-3334), [SPT-3860](https://app.qase.io/case/SPT-3860), [SPT-4832](https://app.qase.io/case/SPT-4832) | TC-24, TC-31–TC-36; remaining client/configuration gaps in the ledger | Baseline exists, including custom-package selection and child-inventory exhaustion/recovery. Reuse it for unchanged purchase behavior; actual child depletion must remain distinct from a public-only override. Existing coverage reduces the missing-baseline gap but does not prove the new override exception. |
| Waitlist registration | [SPT-2880](https://app.qase.io/case/SPT-2880), [SPT-3514](https://app.qase.io/case/SPT-3514), [SPT-3520](https://app.qase.io/case/SPT-3520) | TC-25 | Reuse single-day/public-calendar/widget-handoff signup. Confirm pending interest without an issued active ticket. Automatic later fulfillment remains outside these entry/signup cases. |
| Refund inventory return and exchange replacement | [SPT-946](https://app.qase.io/case/SPT-946), [SPT-4763](https://app.qase.io/case/SPT-4763), [SPT-1275](https://app.qase.io/case/SPT-1275), [SPT-4823](https://app.qase.io/case/SPT-4823), [SPT-766](https://app.qase.io/case/SPT-766) | TC-03, TC-26, TC-28, TC-29, TC-30 | Reuse refund/exchange baselines and inventory recovery controls. SPT-766 expects both public and staff to reopen after increasing stock; use it unchanged only with the ticket override false, or with the global switch OFF. It conflicts with intentionally forced public sellout while ON. |

### Recommended regression selection

Start with these existing case families in **both global switch passes**, using the setup rules above. This is a practical baseline, not permission to omit the entry-point variations in the main checklists.

1. **Public single/recurring and actual inventory:** SPT-3287, SPT-3288, SPT-402 and SPT-3295. Use SPT-3290 for the free-order variant instead of duplicating its same purchase path with a second free draft.
2. **Attraction and calendar:** SPT-3513, SPT-3512 and SPT-3505; select the applicable host rows from SPT-4979/4981/4982 and continue each required host through a real order.
3. **Customer mobile:** SPT-4003 for Event, SeatingEvent and AttractionEvent; native rows of SPT-3288 for recurring. Retain local completion checks for Saved and cart resume.
4. **Seating:** SPT-217/2927/4049 for public map, best available and attraction calendar; SPT-4074/4075 for staff; SPT-2935 for unavailable-seat suggestions. Keep TC-10, TC-11 for exhausted ticket-type combinations on a seat.
5. **Staff and kiosk:** SPT-4066/4069, SPT-2650 and SPT-2688 on their actual supported clients. Keep TC-15, TC-16 for distinct Mobile Box Office and explicit native exhausted-stock checks, and TC-18 for kiosk selection.
6. **Alternate checkout paths:** SPT-2439, SPT-4802 and SPT-4903. Add the missing full purchase after cart reopen/handoff; a cart display alone is not completion.
7. **Affected allocations/lifecycle:** SPT-1255, SPT-1291, SPT-429/4832, SPT-3514/3520 and SPT-946; include SPT-3334/3860 and SPT-1275/4823 for custom-package/exchange paths rather than claiming those baseline procedures do not exist.

The local TC-27, TC-04, TC-05, TC-09, TC-06, TC-07, TC-08 remain feature-specific additions or mixed feature/regression checks. They are not duplicates of generic Qase purchase cases. Do not create all local drafts in Qase simply because they are local: first reuse the mapped baseline and retain only the missing proof as additions or enhancements.

### Priority gaps and corrections

1. **High — explicit native Mobile Box Office ticket sale and zero-stock rejection.** The broad POS rows do not close this distinct client gap. TC-15, TC-16 remain necessary; record the actual app/mode.
2. **High — exhausted ticket-type combinations on assigned seats.** Existing cases cover occupied seats and choosing among available types, but not both sole exhausted type and mixed available/exhausted types on one unoccupied seat. Keep TC-10, TC-11 and the visible-label implementation question.
3. **High — checkout after selecting tickets earlier.** Widget reopen, Saved, native cart, website checkout and legacy express/calendar hosts need completed-order evidence from their own starting state. Existing handoff/recovery checks are partial. TC-19, TC-01, TC-02, TC-20 supply much of this work; legacy hosts still require usable setup.
4. **High — kiosk negative assertion and existing-cart policy.** SPT-2684 needs an actual failed selection attempt and unambiguous zero-remaining setup. The previously allocated kiosk cart remains a product-expectation gap; Qase's normal kiosk sale does not resolve it.
5. **High — two omissions from the local checklist found during this search:** one-click public wallet purchase, and staff sale started through the attraction calendar. Use SPT-4903 for the former; extend the SPT-1077 basket handoff through a supported staff sale for the latter. Both require OFF/ON execution records. These remain accounted-for gaps, not silently covered by generic checkout.
6. **Medium — incomplete legacy case fields.** SPT-217/4074 end with a blank final expected result; SPT-3096 has misaligned action/results; SPT-3743 is a two-row upgrade outline; SPT-1253 does not complete branded purchase; SPT-5135/5138 have missing expected results. Recommend focused enhancements that preserve their existing purpose and parameters, not wholesale replacement. No enhancement was applied.

### Search evidence and source cross-check

Read-only retrieval: **1,731 unique SPT cases and 261 suites**, all pages fetched; 72 selected cases re-read by ID. The narrow API search `sold out` returned only SPT-3136 (product inventory), which is not the ticket baseline. Local full-field search for `sold.?out` found 45 cases, including SPT-402. A title-only or exact-phrase search would miss useful regression coverage.

The first broad title/suite filter found 908 candidates using purchase, checkout, Box Office, seating, attraction, recurring, kiosk, widget, holds, group sale, waitlist, add-on, upgrade, exchange, refund, inventory, mobile and POS terms. A focused title filter found 150 candidates using sold-out, event-checkout, calendar/attraction/kiosk, full-purchase, seat/best-available, link, offer, native-sale, Saved and express terms. These are **candidate counts**, not coverage counts. Full text fields—title, description, prerequisites, cleanup, steps, tags and both parameter formats—were also searched for state/client terminology. No exact `enable_force_public_sold_out`, `public_sold_out` or `force_public_sold_out` reference was found; that is a missing explicit run setup, not evidence that baseline regression is absent.

Selected detail IDs: SPT-214, SPT-217, SPT-358, SPT-388, SPT-389, SPT-402, SPT-429, SPT-766, SPT-1070, SPT-1077, SPT-1163, SPT-1249, SPT-1253, SPT-1255, SPT-1291, SPT-1307, SPT-2024, SPT-2357, SPT-2435, SPT-2439, SPT-2451, SPT-2650, SPT-2684, SPT-2688, SPT-2689, SPT-2700, SPT-2707, SPT-2880, SPT-2926, SPT-2927, SPT-2934, SPT-2935, SPT-3096, SPT-3251, SPT-3287, SPT-3288, SPT-3290, SPT-3295, SPT-3334, SPT-3349, SPT-3505, SPT-3512, SPT-3513, SPT-3514, SPT-3520, SPT-3743, SPT-3860, SPT-4003, SPT-4049, SPT-4066, SPT-4069, SPT-4074, SPT-4075, SPT-4241, SPT-4802, SPT-4832, SPT-4903, SPT-4904, SPT-4928, SPT-4979, SPT-4980, SPT-4981, SPT-4982, SPT-4983, SPT-5135, SPT-5138, SPT-5146, SPT-946, SPT-4763, SPT-1275, SPT-4823, SPT-5104.

Evidence snapshots: `/private/tmp/qase-public-soldout-regression/{metadata,targeted,case-all,suite-all,details}.json`. These are temporary review evidence; the important findings and links are retained here. The details' update timestamps matched the bulk snapshot. No run history, latest pass status or automation implementation was verified.

Additional source reviewed for the newly found wallet entry, under `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/`: `packages/core/src/app-contexts/public/features/detail-pages/components/modals/ExpressCheckoutSection.web.tsx` and `hooks/useExpressCheckout.ts` under the same feature. The component uses the public/user basket, excludes free baskets and renders no express checkout in the native webview; it confirms why the free local smoke and native app pass do not cover this wallet entry. Backend public-sellout enforcement remains the previously reviewed `web-app/apps/tickets/api/user_based/serializers/baskets.py`; this source cross-check is not a live payment result.


### SPT-402 — Existing zero-inventory regression

**Qase update: [SPT-402](https://app.qase.io/case/SPT-402) hidden-toggle enhancement saved and verified on 2026-09-15.** Based on the user's current Qase version; description tables remain removed. The organizer's ticket-type editor must hide **Show as sold out publicly** while the global switch is OFF. Admin preparation of a saved true value is separate from that organizer UI. Existing zero-inventory and available-comparison checks, title, tags, suite 625 and all 11 grouped parameter rows remain intact.

Source: backend `apps/main/templates/tickets/dialogs/_edit-ticket-type.html` wraps the checkbox and explanatory text in the `enable_force_public_sold_out` switch. Public ticket serialization and basket enforcement remain covered by B4/B5. No live behavior was executed.

**Title:** Core - Inventory - Verify sold-out event ticket states across sales surfaces

**Description:** Verify that an event, recurring date/time, or ticket type with zero available inventory remains marked unavailable and cannot enter a cart. Keep enable\_force\_public\_sold\_out OFF throughout. An administrator has prepared Public sold out = Yes on both the exhausted and available comparison types. The organizer must not see Show as sold out publicly in the ticket-type editor, and the saved setting must have no effect on selection while the switch is disabled. Zero inventory must still block selection, and available inventory must still enter the cart. These checks cover public checkout and in-person selection through Box Office; no payment is submitted.

Global switch: `enable_force_public_sold_out` is OFF for the entire regression case.

Keep the existing grouped parameter rows together. RegularEvent means a single-day event; RecurringEvent means an event with separate dates or times. For WebPublic, open the recorded public event page; for Widget, open the recorded host page’s event widget; for WebBoxOffice, open Box Office → Sell; for Electron, open the Showpass desktop app → Box Office → Sell. Select the recorded event/date and inspect the event, date/time choice, or ticket type named by SoldOutScope.

**Preconditions:**
- An organizer with Manage Events can open the prepared event’s ticket-type editor to check that the public-sellout toggle is hidden. This organizer may be different from the employee performing the Box Office checks.
- For Box Office rows, the employee has Use Box Office and View Box Office Stats. An administrator prepares the saved Public sold out values through Admin → Tickets → Ticket types; the organizer does not enable a toggle in the event editor while the switch is OFF.
- Global enable\_force\_public\_sold\_out is OFF and stays OFF for the entire case. If the release owner changes it during preparation, record its original value for restoration after the regression pass.
- Select a published future event matching EventShape. Its exhausted ticket types are otherwise public and on sale, without a waitlist or password. Use positive finite inventory caps consumed by recorded orders owned by the execution team; verify 0 remaining in Box Office. Do not set Inventory to 0 to simulate exhaustion.
- For event-level rows, every ticket type offered on the selected surface has 0 remaining. For recurring date/time rows, every offered type on the selected occurrence has 0 remaining. For ticket-type rows, the target type has 0 remaining and the event remains accessible through another available type. Record the event, date/time and target type names.
- Select a matching available comparison event/date/type with at least 2 tickets remaining and no other sales restriction. Use the same sales surface and event shape as the exhausted item; use another event/date when the exhausted event/date has no available tickets.
- In Admin → Tickets → Ticket types, the administrator finds the selected types by event/name and saves Public sold out = Yes on both the exhausted and available comparison types. For recurring events, prepare the actual occurrence’s types. Save, reopen and verify the values; record their original values. Do not edit calculated sold-out fields.
- For public and widget rows, all comparison ticket types needed to reach the available event/date have Public sold out = Yes. For event-level exhaustion, all exhausted types also have Public sold out = Yes.
- For widget rows, record the existing host page and its event purchase control. Begin each scenario with an empty cart in the selected browser or app, after the prepared inventory/settings are reflected on that surface.

**Postconditions:**
- No new order or payment was created. The cart is empty, and the exhausted item was never added.
- Restore and reopen the original ticket settings and global switch to verify restoration after the coordinated pass. Retain the existing orders that consume inventory; do not refund or void them as cleanup.

**Tags:** events, core, inventory, ui-interaction, box-office

| Step Action | Data | Expected Result |
| --- | --- | --- |

| As the organizer, open Manage Events → the prepared event → Edit → Ticket Types → edit the comparison ticket type → General. | Prepared comparison type; global switch OFF | The normal ticket-type fields are shown, but Show as sold out publicly and its explanatory text are not displayed. |

| Close the ticket-type editor without saving. |  | The prepared ticket settings remain unchanged. |

| Open the sales surface named by Platform using the navigation in the Description. | Platform, View, EventShape and SoldOutScope | The selected sales surface opens and the recorded exhausted event, date/time or type can be located. |

| Locate the recorded exhausted item. | Recorded event, date/time or ticket type | The item is marked Sold Out or unavailable. |

| Inspect its purchase, quantity or add-to-cart controls. | Exhausted item | The controls are disabled, absent, or show an unavailable state. |

| Attempt to select or add the exhausted item if an action is offered. | Quantity 1 | No exhausted ticket enters the cart; an unavailable control cannot proceed to purchase. |

| Open the recorded available comparison event/date/type on the same surface. | Comparison type with Public sold out = Yes; actual inventory available | The comparison ticket is selectable and is not incorrectly marked sold out. |

| Select one comparison ticket. | Quantity 1 | Exactly one comparison ticket enters the cart; no exhausted ticket is included. |

| Remove the comparison ticket from the cart. | The selected comparison ticket | The cart is empty and no order has been submitted. |

## Status and Jira Intake Summary

Qase-ready manual **drafts**, not execution results. No browser testing, behavioral API testing, branch comparison, or changed-file discovery was performed. A read-only Qase regression gap analysis was added on 2026-09-14 after the user authorized it. Subsequent authorized writes created TC-02 as SPT-5230, TC-11 as SPT-5236, TC-12 as SPT-5237 and TC-17 as SPT-5238 in suite 625, and enhanced SPT-402 with fixed switch-OFF regression setup. Saved case fields were verified. All execution remains unverified; this note does not establish release readiness.

Scope: `enable_force_public_sold_out` across source-discovered purchase entry points, including native customer/staff apps, plus the associated ticket-type setting, public availability and controlled staff access. Traceability: [SPW-19405](https://showpass.atlassian.net/browse/SPW-19405). The Jira read failed because configuration was missing; work stopped until the user supplied readable card content in `/Users/christianvaldez/Downloads/tmp/del.txt`. That file supplies the requirements below, but does not establish live Jira status, comments, or subsequent acceptance-criteria changes.

The supplied requirement is to keep a ticket type publicly sold out even when inventory becomes available again, while allowing controlled internal sales. Additional requested proofs are switch-on/off smoke, clearing the setting with zero inventory, all ticket types sold out after 25 minutes, reopening one available type, and normal assigned-seat behavior.

Apply [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass QA Test Case Generator]], and [[05 Tooling/Qase Test Case Writing Rules]].

## Sources Reviewed

Source references below are relative to these repository roots; symbols are preferred over line numbers because the local files may continue changing.

* **Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app`
* **Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
* **Automation:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

| Ref | Source paths / symbols | Evidence |
| --- | --- | --- |
| B1 | `apps/tickets/models/event_management/event_ticket_types.py`: `public_sold_out`, `sold_out`, `get_inventory_left`, recurring propagation; `apps/tickets/migrations/0366_historicaltickettype_public_sold_out_and_more.py` | Nullable saved boolean, false default; actual inventory remains separate; child inheritance. |
| B2 | `apps/core/flags.py`: `WAFFLE_SWITCH_ENABLE_FORCE_PUBLIC_SOLD_OUT`; `apps/main/templates/tickets/dialogs/_edit-ticket-type.html`; `apps/main/static/src/dashboard/tickets/controllers/EventCreate.js`: `updateTicketType`; `apps/main/templates/tickets/events/manage/edit.html`; `apps/main/templates/tickets/events/partials/__create-form-nav.html` | Global switch; exact checkbox, Inventory, General, Next, Cancel, Ticket Types and Save Event controls; Next merges into the event form before final save. |
| B3 | `apps/tickets/api/venue_based/serializers/ticket_types.py`; `apps/tickets/api/venue_based/serializers/access.py`; `apps/tickets/api/venue_based/viewsets/events.py`: `MANAGE_PERMISSIONS`; `apps/tickets/api/venue_based/viewsets/ticket_types.py`; `apps/venues/constants/employment.py`; `apps/tickets/admin/ticket_types.py`: `TicketTypeAdmin` | Venue fields, Manage Events permission, supported admin field preparation; standalone ticket-type viewset rejects normal create/update, so use the event editor. |
| B4 | `apps/tickets/api/public/serializers/ticket_types.py`: `PublicTicketTypeSoldOutMixin`; `apps/tickets/api/public/serializers/events.py`: `get_sold_out`, `get_ticket_types` | Switch-gated public ticket state and event aggregation. |
| B5 | `apps/tickets/api/serializers/general.py`: `clean_validate_is_tt_sold_out`; `apps/tickets/api/user_based/serializers/baskets.py`: `should_apply_public_sold_out`, `UserBasedTicketBasketHoldsSerializer`, `clean_public_sold_out`, `_validate_purchase_items` | Add/update and final purchase validation; trusted hold and package-child exceptions; sold-out error. |
| B6 | `apps/venues/queries/calendar/calendar_public_sold_out.py`; `calendar_event_detail_query.py`; `calendar_events_query.py`; `apps/tickets/services/event_management/public_event_calendar_detail.py`; `apps/venues/services/calendar/public_venue_calendar.py` | Public calendar/detail SQL and switch binding; recurring child scope; visible ticket-type filtering. |
| B7 | `apps/main/queries/discovery_materialized_view.py`; `apps/main/tasks/discovery.py`; `apps/venues/queries/upcoming_events_materialized.py`; `settings.py`: `refresh_discovery_view`, `refresh_upcomingevents`; `apps/tickets/caching/event_detail_payload.py`; `apps/tickets/services/cache_update/event_cache_update/updater_service.py` | Discovery calculates public soldout at refresh; scheduled discovery refresh every 10 minutes and upcoming view every 5 minutes; event cache uses public serializer. |
| B8 | `apps/tickets/services/inventory/sold_out_service.py`: event and venue-inventory strategies | Actual capacity, event limits, package capacity, sold-out recalculation; override is not folded into actual capacity. |
| B9 | `apps/tickets/tests/test_public_ticket_type_sold_out.py`; `test_public_basket_sold_out.py`; `apps/tickets/tests/api/public/events/test_api_public.py`; `apps/main/tests/discovery/test_discovery_views.py`; `apps/tickets/tests/api/venue/events/test_api_venue_based_events.py`: recurring public sellout propagation | Existing regression assertions inspected, not run; unit helpers do not prove complete checkout or deployed caches. |
| B10 | `apps/financials/payments/refunders/base.py`: `_refund_operations`; `apps/financials/payments/refunders/cash.py`; `apps/financials/payments/voiders.py`: `void_tickets` | Refund finalization marks issued items refunded; cash reversal records balances; voiding schedules post-commit inventory refresh. These are distinct lifecycle paths. |
| F1 | `packages/core/src/shared/modules/ticket-types/utils/ticket-type-utils.ts`; `packages/core/src/shared/modules/events/utils/event-utils.ts`; `packages/core/src/app-contexts/public/features/tickets/components/TicketTypesContainer/TicketTypesContainer.web.tsx` | Public sold-out state, existing waitlist rules, dynamic-hold display exception, different internal event availability helper. |
| F2 | `packages/core/src/shared/modules/seating/services/SeatingService.ts`: `createItemTypeMap`, and its `.test.tsx`; `factories/SeatFactory.ts`: `isSeatSoldOut`; `packages/core/src/app-contexts/public/features/seating/components/DefaultSeatSelectModal/DefaultSeatSelect/useDefaultSeatSelect.ts` and `DefaultSeatSelect.web.tsx` | Available-item filtering, seat occupancy, per-seat ticket choices and sold-out display. |
| F3 | `packages/core/src/shared/modules/basket/factory/BasketRepositoryFactory.ts`; `packages/core/src/app-contexts/public/features/basket/data/repositories/PublicBasketRepository.ts`; `packages/core/src/app-contexts/dashboard/features/box-office/basket/data/repositories/VenueBasedTicketBasketRepository.ts`; `packages/core/src/app-contexts/dashboard/features/box-office/checkout/components/Checkout.web.tsx`, `PaymentMethod.web.tsx`, `CashCalculator/CashCalculator.web.tsx` | Public/user baskets share user-based backend; venue basket uses a separate backend; staff checkout and Cash controls. |
| F4 | `packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/RefundDialog/RefundForm.web.tsx`, `RefundConfirmation.web.tsx`; `apps/financials/models/invoice_management/invoice.py` in backend | Refund option/reason/confirmation wording; exchange linkage inspected only, not a complete financial trace. |
| F5 | `packages/core/src/app-contexts/public/shared/checkout/components/steps/payment/components/PurchaseButton.web.tsx`; `packages/core/src/shared/components/application/form/CheckoutButton/CheckoutButton.web.tsx` | Public **Complete transaction** and staff **Process Transaction** button labels. |
| A1 | `tests/core/packages/preset-package-assigned-seating.test.ts` | Existing composable public/widget/Box Office package suite pattern; no tests executed or modified. |

### Additional purchase-entry audit

The audit followed public and user ticket serializers into callers, user/venue basket factories and purchase viewsets, then web routes, SDK hosts, desktop startup and native navigation. File searches were by symbols and routes, never by changed files or a branch diff.

| Ref | Additional source paths | What they establish |
| --- | --- | --- |
| B11 | Backend `apps/tickets/api/user_based/viewsets/baskets.py`; `apps/tickets/api/venue_based/viewsets/baskets.py`; `apps/tickets/api/venue_based/serializers/baskets.py`; `apps/tickets/api/user_based/serializers/ticket_types.py` | Normal and hold customer endpoints; validated hold context; venue endpoints; user-specific ticket serialization uses the public sold-out mixin. |
| B12 | Backend `apps/tickets/api/public/viewsets/seating.py`; `apps/tickets/services/best_available/public_best_available_seating.py`; `apps/tickets/api/serializers/general.py` | Best-available request path, public/box-office search context, later basket capacity/sellout validation. Search results alone do not prove allocation. |
| B13 | Backend `apps/tickets/embedded/urls.py`, `views.py`; `apps/main/templates/embedded/tickets/express-checkout.html` | Existing express-checkout widget route and free-order Complete button; it is an existing-cart purchase path. |
| F6 | Frontend `packages/core/src/app-contexts/public/features/event-detail/hooks/useEventDetailPage.ts`; `features/detail-pages/components/attractions/AttractionItemsTab.web.tsx`, `AttractionEventModal.web.tsx`; `features/detail-pages/components/products/DateTimeSelector.web.tsx`; `features/calendar/ui/components/CalendarModalAdapter.web.tsx`; `features/widget/ui/components/calendar/SdkCalendarAdapter.web.tsx`, `LegacyCalendarWidgetAdapter.web.tsx` (all features relative to `packages/core/src/app-contexts/public/`) | Single-date/recurring detail, attraction fixed-event and calendar sections, quantity-before-date option, different calendar hosts. |
| F7 | `packages/core/src/app-contexts/sdk/features/checkout.ts`, `calendar.ts`, `tickets.ts`; `packages/core/src/app-contexts/sdk/services/config/constants.ts`; `packages/next-app/pages/widget/tickets/events/purchase/[eventSlug].tsx`; `packages/next-app/pages/widget/calendar/attraction/[eventSlug].tsx` | SDK event modal/embedded host, calendar → event → checkout handoff, express checkout and cart entry. |
| F8 | `packages/core/src/shared/modules/websites/puck-editor/showpass/public/PuckPurchaseWidgetModal.web.tsx`; `packages/core/src/app-contexts/public/features/event-purchase/ui/components/EventPurchaseFlow.web.tsx` | Website button opens event purchase; optional checkout-page redirect carries the basket; selected-ticket filtering is host state. |
| F9 | `packages/mobile/src/screens/BuyerScreens/PurchaseScreen/PurchaseScreen.tsx`; `packages/mobile/src/hooks/useWebviewUrls/index.ts`; `packages/mobile/src/components/Explore/DiscoveryCard/DiscoveryCard.tsx`; `packages/mobile/src/screens/BuyerScreens/Saved/SavedScreen/SavedScreen.tsx`; `packages/mobile/src/components/Icons/CartIcon.tsx`; `packages/mobile/src/hooks/usePushNotifcationListeners/index.tsx` | Mobile Explore/Saved cards open the public event in a webview; cart icon resumes checkout; notifications can also route to PurchaseScreen. |
| F10 | `packages/mobile/src/components/BoxOffice/TicketSelect/TicketSelect.tsx`; `packages/mobile/src/hooks/dashboard/box-office/useMobileVenueBasket/index.ts`; `useBoxOfficePurchase/index.tsx`; `packages/mobile/src/hooks/dashboard/pos/payment/usePointOfSalePayment/index.ts`; `packages/mobile/src/screens/Dashboard/BoxOffice/MobileBoxOffice/MobilePaymentInfo/MobilePaymentInfo.tsx`; `packages/mobile/src/components/BoxOffice/PointOfSaleFooter/PaymentInfoFooter.tsx`; `packages/mobile/src/constants/box-office.tsx` | Native staff selection reads venue event/access inventory; mobile staff and native POS write/purchase venue baskets; final buttons differ. |
| F11 | `packages/desktop/src/main/window/MainWindow.ts` | Desktop app opens the web Box Office Sell route in Electron; it still needs its own execution row. |
| F12 | `packages/mobile/src/components/BoxOffice/KioskMode/KioskMode.tsx`; `packages/mobile/src/screens/Dashboard/BoxOffice/Kiosk/SelectTicketsScreen/SelectTicketsScreen.tsx`, `SelectSeatsScreen/SelectSeatsScreen.tsx`; `packages/mobile/src/components/Footer/KioskPurchaseFooter/KioskPurchaseFooter.tsx`; `packages/core/src/shared/modules/basket/services/useKioskBasket.ts`; `packages/mobile/src/constants/kiosk.tsx` | Self-service kiosk reads public ticket/calendar availability, but creates and purchases venue baskets; a public restriction at final purchase cannot be inferred from public display. |
| F13 | `packages/next-app/pages/[eventSlug]/seating/index.tsx`; `packages/core/src/app-contexts/public/shared/checkout/components/steps/assigned-seating/AssignedSeatingStep.tsx`; `packages/core/src/shared/modules/seating/features/BestAvailable/components/BestAvailableSeatingHeader/BestAvailableSeatingHeader.web.tsx`; `packages/mobile/src/screens/Dashboard/BoxOffice/PointOfSale/SellScreen/SellScreen.tsx` | Direct seating page, embedded seat step, public venue flag enable_best_assigned_seating, native staff best-available path. |
| F14 | `packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx`; `packages/next-app/pages/checkout/link/[id].tsx` | Ordinary checkout link attempts ticket quantities automatically, can reuse an existing basket and reduce failed quantities; distinct from allocated holds. |
| F15 | `packages/core/src/app-contexts/public/shared/checkout/components/steps/add-ons/EventAddons/helpers/index.ts`; `packages/core/src/app-contexts/public/features/basket/hooks/useItemGroupUpgrade.ts`; `packages/core/src/shared/modules/basket/domain/services/BasketUpgradesService.ts`; backend public `TicketTypeUpgradeOptionSerializer` | Ticket add-ons filter sold-out public data; upgrade offers use target serializers and replace existing items through the public basket. Upgrade offer generation does not itself establish an available target. |


| F16 | `packages/core/src/app-contexts/dashboard/features/box-office/holds/ui/components/Hold/Hold.web.tsx`; `packages/core/src/app-contexts/dashboard/features/box-office/holds/hooks/useRedirectHold.web.ts` | Checkout action exists for listed holds, including group-sale holds; preloads the venue basket and navigates directly to checkout. |
| F17 | `packages/core/src/app-contexts/dashboard/features/box-office/sell/components/menu-items/ExchangeLookupButton.web.tsx`; `packages/core/src/app-contexts/dashboard/features/box-office/exchange/components/VenueInvoiceExchangeFlow/VenueInvoiceExchangeFlow.web.tsx`; `packages/core/src/shared/modules/exchanges/components/ExchangeTicketModal/ExchangeTicketModal.web.tsx` | Exchange lookup and Start Exchange/Begin exchange flow exist; itemized/credit eligibility is additional state requiring separate focused coverage. |
| B14 | Backend `apps/tickets/api/venue_based/viewsets/comp_tickets_import_viewsets.py`; `apps/tickets/services/comp_tickets_import/validators.py`, `persister.py` | Separate venue import permission/flag, capacity warning and async generation path; not a normal public ticket purchase. |


### 2026-09-15 source review — organizer and customer lifecycle

Reviewed [[01 Repositories/Backend - web-app]], [[01 Repositories/Frontend - showpass-frontend]], the supplied Jira text at `/Users/christianvaldez/Downloads/tmp/del.txt`, and the implementation below. No branch/diff discovery or live mutations were used.

| Ref | Source paths / symbols | What the case must prove |
| --- | --- | --- |
| B15 | Backend `apps/financials/api/venue_based/viewsets/invoices.py`: `void`, `refund`, permission map; `apps/financials/api/venue_based/serializers/refunds.py`: `VenueBasedInvoiceVoidSerializer`; `apps/financials/payments/voiders.py`: `mark_tickets_as_voided`, `create_void_invoice_items`; `apps/financials/payments/refunders/base.py`: `mark_tickets_as_refunded` | Void and refund have distinct actions and money outcomes; completion schedules inventory refresh. A processing message is not restored inventory. Neither clears the saved public-sellout field. |
| B16 | Backend `apps/tickets/services/holds/release_held_basket.py`; `apps/tickets/models/order_management/order_basket.py`: `release_hold`; `apps/tickets/api/venue_based/viewsets/baskets.py`: `release_hold` | Releasing a real allocation expires the hold and refreshes inventory after commit; released-link and ordinary public access are distinct checks. |
| B17 | Backend `apps/financials/models/invoice_management/invoice.py`: `get_exchange_amounts`; `apps/financials/services/user_credits/exchanges/handlers/ticket_exchange_handler.py`; `credit_deduction.py`; `create_invoice_exchange_credit.py`; `apps/venues/constants/employment.py` | Exchange amounts derive from invoice/refund rules; returned ticket state and replacement ownership must both be checked. Representative same-value credit comparison is not proof of every shipping/tax/provider permutation. |
| F18 | Frontend `packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/VoidDialog/VoidDialog.web.tsx`, `VoidConfirmation.web.tsx`; `ui/hooks/useVoidSubmit.ts`; `RefundDialog/RefundDialog.web.tsx`, `RefundConfirmation.web.tsx`; Box Office `holds/ui/components/HoldReleaseModal/HoldReleaseModal.web.tsx` | Verified Void transaction → Select all → Void → Yes, completion feedback, Base refund/Agree & Process Refund, and Release Hold → Confirm. Void explicitly does not refund money. |
| F19 | Frontend transactions `domain/invoice-rules.ts`: `canExchangeInvoice`; Box Office `exchange/components/VenueInvoiceExchangeFlow/VenueInvoiceExchangeFlow.web.tsx`; shared `modules/exchanges/components/ExchangeTicketModal/ExchangeTicketModal.web.tsx` | Exchanges module, staff visibility and whole-order versus itemized presentation change the executable path. TC-30 states the whole-order setup and uses the displayed Start Exchange/Begin exchange control. |
| F20 | Frontend `packages/core/src/app-contexts/public/shared/checkout/components/steps/payment/components/PaymentSection/PaymentSection.web.tsx`; `packages/core/src/app-contexts/user/features/account/features/waitlists/ui/pages/WaitlistsPage.web.tsx`; `ui/components/WaitlistListItem.web.tsx` and `ui/components/LeaveWaitlistModal/LeaveWaitlistModalConfirm.web.tsx` under that account waitlists feature | Waitlist checkout supports a no-card-required path. Account entry and Leave waitlist → Leave support verification and cleanup of an actual signup. |

### 2026-09-17 package expansion — source evidence

* **B18 — Backend:** `apps/tickets/constants/packages.py` defines Preset and Custom. `apps/tickets/models/packages_management/{ticket_package,sub_ticket_option}.py` defines required choices, fixed/reverse ratios, SubProductInfo and barcode settings. `apps/tickets/api/serializers/general.py` builds normal/custom/product child groups, checks actual sold-out inventory, required choices and real product stock. `apps/tickets/api/user_based/serializers/baskets.py` excludes package children from the public override at allocation and only rejects top-level overridden ticket groups at final checkout. `apps/tickets/services/inventory/package_capacity_calculator.py` handles actual package capacity. `apps/tickets/api/public/{serializers,viewsets}/packages.py` and `filters.py` provide custom-choice data.
* **F21 — Frontend:** `packages/core/src/shared/modules/packages/components/PackageSelector/usePackageSelector.ts`, `components/suboptions/SelectSubOption/SelectSubOption.tsx`, `components/seating/PackageMapContainer/PackageMapContainer.web.tsx`, and `components/buttons/CheckoutButton/CheckoutButton.web.tsx` implement choices, replacement and seat selection. `packages/core/src/app-contexts/public/shared/checkout/components/steps/custom-package/CustomPackageStep.tsx` validates required choices before modifying the public basket. `packages/core/src/shared/components/application/data-display/item-group/ItemGroupPackage/ItemGroupProductSelection.tsx` persists product variants. Dashboard Box Office `packages/components/PackageModal/PackageModal.web.tsx` uses the venue basket and shared package selector. `packages/core/src/app-contexts/dashboard/features/packages/hooks/useTicketPackageCapabilities.ts` gates reverse-ratio UI with venue flag `use_reverse_ratio_packages`; `constants/packages-config.ts` still warns against custom-package widgets.

## Assumptions and Unknowns

* **Package ON scope:** the parent checkbox must be unchecked to test a checked included ticket’s exemption. This is reachable through the organizer editor with global ON; the earlier OFF regression simplification does not remove this ON setup.
* **Package configuration versus type:** ticket + product relations can exist on a ticket independently of a Preset/Custom TicketPackage record. Recurring/calendar entry, seats, nesting, ratios and barcode modes are coverage dimensions, not new backend enum values.
* **Package clients:** the custom-widget warning conflicts with the shared custom checkout step; no live support claim is made. Native customer app cases use its public webview. Native in-person package configuration/selection requires additional evidence and is not inferred from TC-17.
* **Seated package display:** backend child groups are exempt from public override checks, but seating UI consumes public sold-out data. TC-32 is the acceptance check for that integration; no successful execution is claimed.
* **Product boundary:** `_add_sub_product_groups` currently chooses a temporary variant only when used quantity plus requested quantity is strictly less than its configured inventory. The new success cases use headroom; exact-last-unit behavior is an explicit deferred boundary, not silently assumed correct.

* **Recurring parent versus available child:** the public event serializer calculates from the parent’s own ticket types, while calendar SQL can include child types. A parent can therefore disagree with an independently reopened child. TC-07 now checks the parent entry after reopening one date; this is a source-backed risk, not a confirmed deployed defect. An all-unavailable parent being sold out is expected; a remaining purchasable date being inaccessible is a separate result.

* **Implemented name:** `TicketType.public_sold_out`. The supplied card alternates between this and `force_public_sold_out`; use the implemented name for setup and automation.
* **Implemented UI gate:** global `enable_force_public_sold_out` gates the legacy editor checkbox. No `enable_force_public_sold_out_ui` or public-soldout field/control references were found in the searched modern frontend packages. Do not require that unverified flag or promise a Box Office indicator in the executable cases.
* **Current editor:** manual editing cases target the existing Edit Event → Ticket Types → Edit Ticket Type dialog identified in backend templates. If the deployment opens a migrated editor without this checkbox, record the entry point and block the editing case; do not silently substitute admin editing for the employee action under test.
* **Timing:** 25 minutes is the user's requested observation point, not a proven cache SLA. Scheduled refresh intervals do not prove workers ran or all response caches expired. Record immediate behavior and 25-minute behavior separately. A 25-minute check cannot pass an immediate-reopening requirement by itself.
* **Seating conflict:** user intent requires the sold-out choice to remain properly marked on a shared seat; `createItemTypeMap` explicitly omits sold-out, non-waitlisted types, with unit assertions for omission. End-to-end display is inconclusive until executed. TC-10/TC-11 retain the requested acceptance outcome rather than treating omission as a pass.
* **No live record assumptions:** suitable events, holds, orders, permissions, and flags must be selected/prepared for execution. No IDs or existing records were inferred from the Jira URL.
* **Mobile is in scope:** native Explore/Saved/cart navigation, customer webview checkout, native staff modes and kiosk are now traced separately. Mobile web is not the Showpass app. Record iOS/Android and the actual host for each run.
* **Kiosk is mixed:** public selection is backed by public data, but allocation/purchase uses a venue basket. Treat final-purchase behavior after an already-selected kiosk ticket becomes forced sold out as an unresolved requirement, not a demonstrated public enforcement guarantee.
* **Upgrade display:** target serialization is public, but upgrade-option assembly was not shown to exclude sold-out targets. TC-21 records visible offers separately from acceptance/rejection.


## Source-backed Behavior

1. With the switch off, a saved true value is ignored by public ticket serialization and normal public basket validation. Actual sellout still blocks sales. With the switch on, either actual sellout or `public_sold_out=True` makes public ticket serialization sold out. Null acts as no override. [B1, B4, B5]
2. The employee control is **Show as sold out publicly**, with help text explaining that Box Office uses actual inventory. It sits in **General**, beside **Visibility**. **Next** updates the event form; **Save Event** is the persistence step. [B2]
3. Actual `TicketType.sold_out` proxies `base_inventory.sold_out`. The setting is not a replacement for capacity and does not change the count. In particular, configured **Inventory = 0** means no ticket-type cap; it is **not** a safe way to prepare zero remaining tickets. Use a positive capacity fully consumed by owned test purchases/holds. [B1, B8]
4. Public add/update rejects a forced top-level type; final purchase checks again if the setting changed after allocation. The error is “All available tickets have been sold.” Generic held status alone does not grant override bypass. [B5, B9]
5. Venue operations use actual availability. Validated hold paths bypass the public restriction; dynamic-hold purchase bypass is limited to types allocated to that parent hold. Existing allocated inventory may count toward actual sellout, so TC-14 deliberately tests a **fresh** staff basket without a hold allocation. [B5]
6. Package children are exempt from public override validation when bought inside an unforced parent. The sellable parent must be forced to stop that package. Actual child capacity still limits the package. [B5, B8, B9]
7. Public event serializers and calendar SQL combine existing event sellout with all eligible public ticket types being actually or forcibly sold out. Discovery applies the switch when its materialized view refreshes. Stored `inventory_sold_out` and `public_inventory_sold_out` still derive from actual inventory in the reviewed inventory service; do not expect those stored fields themselves to become the durable override. [B4, B6–B8]
8. Recurring propagation updates matching inherited child values; null child public-soldout values continue inheriting. Child overrides and explicit inheritance can change which values propagate, so TC-07 uses initially matching children. [B1, B9]
9. Public and Widget customers use shared ticket/event availability and user-based baskets. Web Box Office uses venue-based baskets and excludes `public_inventory_sold_out` from its event sellout helper. Dynamic holds also have a frontend availability exception. [F1, F3]
10. Mobile customer Explore/Saved entries open the event route in an app webview; the app cart opens existing checkout. Mobile staff/POS use venue inventory and venue baskets. Electron opens web Box Office. Kiosk combines public selection with venue baskets. These are separately accounted entry paths. [B11, F9–F12]
11. Checkout links add requested ticket types through public basket updates without quantity selection first. Checkout ticket add-ons filter sold-out types; ticket upgrades replace an existing item through the public basket. Neither ordinary checkout links nor upgrade offers grant a hold exemption. [B5/B11, F14/F15]


## Entry Points, Outcomes, and Coverage Ledger

Every row below comes from a source caller or route, not only the examples in the request. **Manual-only** means a case is drafted, not passed. Shared components do not make app/host executions interchangeable. OFF and ON use the explicit run values in the two execution checklists above.

| Purchase entry / state | Source | Cases / status | Distinct proof or remaining gap |
| --- | --- | --- | --- |
| Event detail — single day | B4/B5, F1/F6 | Manual-only: TC-01 / TC-02, EventDetailSingleDay | Public selection and complete order. |
| Event detail — recurring parent date/time selection | B6, F6 | Manual-only: TC-01 / TC-02, EventDetailRecurring; TC-07 | Select actual child occurrence; setting on parent alone is insufficient. |
| Direct recurring-occurrence link | B4/B6, F6 | Manual-only: TC-01 / TC-02, RecurringOccurrenceLink | Occurrence already selected before entering purchase. |
| Attraction — calendar, quantity-first calendar, fixed event | B6, F6 | Manual-only: TC-01 / TC-02, three Attraction values | Modal carries selected section/event/time; quantity-first starts with requested quantity. |
| Event widget — modal and embedded | F7 | Manual-only: TC-01 / TC-02, EventWidgetModal / EventWidgetEmbedded | Separate host lifecycle and checkout handoff. |
| Current organizer calendar widget | B6, F7 | Manual-only: TC-01 / TC-02, CalendarWidget | Calendar → selected event → checkout. |
| Existing legacy calendar widget | B6, F7 | Manual-only: TC-01 / TC-02, LegacyCalendarWidget | Use actual existing host; do not substitute a current widget. |
| Attraction calendar widget | B6, F7 | Manual-only: TC-01 / TC-02, AttractionWidget | Attraction-scoped child selection. |
| Showpass-built website purchase modal and separate checkout page | F8 | Manual-only: TC-01 / TC-02, two Website values | Preserve selected ticket through modal and optional page handoff. |
| Mobile customer app — single day, recurring, attraction and Saved | F9 | Manual-only: TC-01 / TC-02, MobileExplore / MobileRecurring / MobileAttraction / MobileSaved | Native navigation → in-app public webview → order; both iOS and Android require execution records. |
| Public map from detail, direct seat page, widget, attraction and mobile app | B12, F2/F13 | Manual-only: TC-10 / TC-11, all SeatEntry values | Sole unavailable type and mixed types on same seat; retain visible-marking conflict. |
| Public best-available seating | B12, F13 | Manual-only: TC-12 | Request ticket quantity first; resulting seat allocation must obey public restriction. |
| Open checkout, reopened widget cart, mobile app cart, express widget | B5/B13, F7/F9 | Manual-only: TC-19, all ResumeEntry values | Real existing basket, not fresh selection; final purchase gate. |
| Ordinary checkout link, empty or existing cart | B5, F14 | Manual-only: TC-20 | Automatic ticket insertion and repeat link; no hold exception. Mobile link execution blocked if no genuine in-app link exists. |
| Ticket add-on and ticket upgrade | B4/B5, F15 | Manual-only: TC-21 | Additional item vs replacing base; retain base on rejection; offer display is not backend proof. |
| Web Box Office | B11, F3 | Manual-only: TC-13 / TC-14 | Staff actual-positive sale and actual-zero rejection. |
| Electron desktop Box Office | F11, B11/F3 | Manual-only: TC-13 / TC-14 | Same route, separately executed application. |
| Native Mobile Box Office and native POS | B11, F10 | Manual-only: TC-15 / TC-16 | Native venue inventory, staff payment screen and transaction evidence. |
| In-person assigned seating — Box Office/POS maps and best available | B11/B12, F10/F11/F13 | Manual-only: TC-17 | Seat and ticket ownership after an in-person sale; an occupied seat cannot sell again. |
| Customer kiosk — single day and recurring | F12 | Manual-only selection/control purchase: TC-18 | Public selection + venue purchase boundary. See unresolved final-purchase gap below. |
| Basic and branded allocated hold purchase links | B5/B11, F1 | Manual-only: TC-23 in both switch states | Validated existing allocation remains usable. |
| Preset packages, including same/multiple events, nested and reverse ratio | B5/B8/B18, F21 | Manual-only: TC-24, global ON | Parent restriction, child exemption, direct-child rejection, selected calendar dates and configured quantities through purchase. |
| Custom ticket choices | B5/B18, F21 | Manual-only: TC-31, global ON | Required choices, replacement of a selected choice, correct fulfillment and standalone child restriction. |
| Seated preset/custom packages | B5/B18, F21 | Manual-only: TC-32, global ON | Actual occupied seats rejected; correct included seats retained through purchase. Display compatibility remains a source risk. |
| Ticket + product bundles | B5/B18, F21 | Manual-only: TC-33, global ON | Product variants, package quantity scaling, configured barcode/fulfillment and one complete order. |
| Package already selected when parent is forced | B5, F21 | Manual-only: TC-34, global ON | No completed/partial ticket or product order through stale checkout. |
| Actual ticket/product/seat shortage | B5/B8/B18, F21 | Manual-only: TC-35, global ON | Child public-sellout exemption cannot bypass real component stock or seat ownership. |
| In-person preset/custom/product package sale | B11/B18, F21 | Manual-only: TC-36, global ON; Web Box Office and Electron | Actual-stock sale and correct fulfillment while parent remains publicly closed. |
| Custom-package widgets and native in-person package combinations | F21 | Blocked supported-entry confirmation | Dashboard warns custom packages cannot be sold via widgets, while shared checkout has a custom step. Native customer webview is covered separately; native Box Office/POS package-choice/variant support is not established by generic sale tests. |
| Nested custom packages | B18 | Not applicable: source rejects a custom child that is itself a bundle | Test supported nested preset packages; do not invent a purchasable nested-custom configuration. |
| Exact-last-unit product boundary, shipping modes and all barcode/ratio combinations | B18/F21 | Deferred focused follow-up | Core cases use existing configured fulfillment and stock headroom; they do not prove every product-capacity boundary or delivery permutation. |
| Active waitlist entry | B5, F1/F20 | Manual-only: TC-25 | OFF actual-empty signup; ON forced signup; confirm one pending entry and leave it during cleanup. Automatic release/payment is a separate follow-up. |
| Refund returns actual inventory | B10/B15, F4/F18 | Manual-only: TC-26 in both switch states | Compare the same refund preview before/after the field change; OFF reopens, ON stays closed until the field is cleared. Full financial permutations remain deferred. |
| Dashboard checkbox, persistence, clear at zero, cancel; rollout switch | B1–B3 | Manual-only: TC-27, TC-04, TC-05, TC-08 | Next + Save Event, restoration, actual count and stored value. |
| Event-wide delayed display and one type reopened | B4/B6/B7 | Manual-only: TC-09 / TC-06 | All-forced/all-empty/mixed and inverse after 25 minutes. Extend observations to selected attraction/recurring dates during their entry runs. |
| Search, organizer listing and city/discovery cards | B7, F9 | Manual-only: TC-09 / TC-06 plus public entry runs | Launchers/display projections; do not count a listing view as a completed purchase. |
| Mobile notification or external deep-link entry | F9 | Blocked execution pending an existing event notification/link | PurchaseScreen caller exists; do not send a notification merely to prepare this read-only task. Reuse one if available and record route/event state. |
| Kiosk cart allocated before forced sellout, including seating | F12, B11 | Blocked product-expectation decision; API follow-up required | Kiosk purchase is venue-based and does not inherit normal customer final-purchase enforcement. Fresh selection proof does not close this gap. |
| Public one-click wallet purchase — detail modal, attraction sidebar, mobile web cart | SPT-4903/4904; source cross-check in Qase regression analysis | Manual-only baseline in Qase; explicit switch-state regression deferred | Paid eligible basket required; separate from legacy express widget. Native webview is excluded. |
| Staff attraction-calendar checkout through completed sale | B11, F3; SPT-1077/5138 | Manual-only: TC-13 / TC-14, StaffEventEntry = AttractionCalendar | Existing Qase baseline reaches the basket; TC-13 now continues through the cash sale. Run both switch states in Web Box Office and Electron. |
| Staff checkout of basic hold or group sale | B5/B11, F16 | Manual-only: TC-22 in both switch states | Holds list hydrates the existing venue basket before checkout; separately execute Web Box Office and Electron. |
| Exchange replacement purchase | B5/B11/B17, F17/F19 | Manual-only: TC-30, whole-order staff exchange | Proves original ticket replacement, returned stock, retained public sellout and unchanged previewed credit; itemized and other eligibility modes remain deferred. |
| Payment-plan sellable copy; membership-qualified ticket access | B1/B4/B5 | Deferred focused setup/validation cases | These alter item identity or eligibility. Package results do not stand in for these flows. Pure product/membership sales without tickets are not affected by this ticket-type field. |
| Admin ticket generation / bulk complimentary imports | B1/B5, B14 | Deferred import workflow regression | Organizer import has its own enable_venue_comp_tickets_import venue flag, Bulk Import Complimentary Tickets permission, preview/confirm and async generation; ordinary checkout does not prove this workflow. |
| Direct API bypass, malformed inputs, tenant/permission isolation, omitted/null values | B1/B3/B5/B9/B11 | Deferred backend integration | Verify real endpoints, not only mocked helpers; boolean text/numeric boundary cases are not manual checkbox actions. |
| Separate UI flag / Box Office indicator | B2 and frontend search | Blocked implementation question | Current source exposes the backend-gated editor checkbox; no separate UI flag/indicator was found. |
| Void, refund, hold release, inventory increase and whole-order exchange return | B10/B15–B17, F18/F19 | Manual-only: TC-03, TC-26, TC-28, TC-29, TC-30 | Inventory return → public remains closed → clear ticket field → customer selection. Refund/credit previews compared; no execution yet. |
| Provider failure/retry/webhooks, timed hold expiry, itemized exchanges and complete financial matrices | B1/B5/B8/B10 | Deferred focused regression | The representative lifecycle cases do not cover every provider, fee/tax/shipping configuration, expiry worker or exchange mode. |
| Map editor, unrelated responsive controls, pure product/membership purchase, off-site vendor purchase | Field belongs to TicketType; route review | Not applicable to this ticket-type purchase matrix, except ticket-bearing packages/access above | Do not manufacture new-ticket assertions for a flow that does not sell a Showpass ticket type. |

The draft accounts for discovered paths; it does **not** claim every path is execution-ready or tested. Blocked and deferred rows are named work, not an accepted release waiver.

## Risk Areas

* **Package partial fulfillment:** a forced parent must not issue only its products or selected children. Included public sellout must not reduce real capacity, erase custom choices, replace product variants or lose seat assignments. Preserve existing fulfillment/barcode configuration; do not require a separate child barcode where the package uses the parent barcode.

* **Rollout cache lag:** switch-off can restore basket behavior before cached event/search display catches up. A hidden control alone proves neither rollback nor deletion of the saved value.
* **Zero-stock setup:** changing a configured cap to zero can accidentally make inventory unlimited. Use a positive consumed cap and verify the remaining amount in Box Office.
* **Aggregation:** mixed true/false settings, hidden/non-public types, expired sales, recurring children and event-level limits can produce different result sets. The core matrix uses active public types; visibility/expiry filtering is a backend follow-up.
* **Seat rendering:** ticket-type filtering can remove the very unavailable option the requirement expects to label. Test a real unoccupied seat, not a seat already owned by another order.
* **Hold authorization:** preserve genuine allocations without accepting a forged hold or an unrelated forced ticket added to a hold customer’s basket.
* **State races:** fresh ticket UI does not prove final checkout enforcement; TC-19 starts with a real selected basket.
* **Native and kiosk boundaries:** public APIs in a native screen do not establish that its final purchase is public; use the actual basket repository.
* **Handoffs and offers:** website checkout redirects, widget reopen, mobile cart resume, link retry and upgrade replacement can carry existing cart state; a fresh event-page test does not cover them.


## State-space / Setup Matrix

Package ON coverage: parent checked with stock (public blocked); parent unchecked with included tickets checked and stocked (complete bundle succeeds); included ticket/product/seat actually unavailable (no oversale); parent becomes checked after selection (no completed/partial order); in-person parent checked with stock (sale succeeds). Covered by TC-24 and TC-31–TC-36.

| Global switch | Saved public sellout | Actual remaining | Public result | Fresh staff result | Coverage |
| --- | --- | --- | --- | --- | --- |
| Off | True | At least 1 | Available if otherwise eligible | Available | TC-27, TC-13 |
| Off | True or False | 0 | Sold out | Sold out | TC-27 control, TC-14 |
| On | False | At least 1 | Available | Available | TC-02 control, TC-05 |
| On | True | At least 1 | Sold out | Available | TC-27, TC-04, TC-13 |
| On | True → False | 0 | Remains sold out | Sold out | TC-05, TC-14 |
| On | Null | At least 1 | Same as false | Available | Deferred backend null/default test |

| Aggregation / seating state | Required proof | Coverage |
| --- | --- | --- |
| All public types forced, all actually empty, or mixed | Event sold out after 25 minutes | TC-09: three ON reasons plus OFF actual-empty regression |
| One forced type with inventory is cleared; others unavailable | Event no longer sold out; reopened type selectable after 25 minutes | TC-06 |
| One sold-out ticket type on an unoccupied seat | Seat unavailable | TC-10 |
| Available and sold-out types on the same unoccupied seat | Seat selectable; sold-out option marked and unavailable | TC-11 |

## Recommended Test Data and Setup

* Package data: retain a known preset, custom-choice, seated and ticket + product configuration; record composition, ratios, barcode mode, dates/seats and product variants before execution. Reuse existing reverse-ratio/nested configurations with their supported gates. Public success cases use zero-total orders; in-person cases use execution-owned cash sales. Actual-stock shortage cases consume positive caps through retained owned records.

* For inventory-return cases, a positive cap of 1 consumed by one owned sale or hold makes the transition measurable: 0 remaining → 1 returned → still publicly sold out → ticket field cleared → customer can select 1. Never set Inventory to 0 to mean empty.
* Refund and exchange amount comparisons use the same order and option before/after changing the ticket field. Do not substitute different orders, prices, fees or shipping options and then call the totals equivalent.

* Use published future events with public, currently on-sale ticket types. Unless a case says otherwise, avoid access passwords, waitlists, packages, distributed inventory, membership restrictions and event-wide capacity exhaustion so those rules cannot explain a sellout.
* An employee editing events needs **Manage Events** (`manage_events`). Cash sale requires **Use Box Office** (`use_box_office`) and **Cash Box Office Sales** (`sell_cash_tickets`). Add **View Box Office Stats** for count proof. Refund and transaction access are specified in their cases. Administer Transactions, rather than a generic viewing permission alone, is explicitly required for the refund/void/exchange actions used here.
* The release owner can prepare **Admin → Waffle → Switches**: find `enable_force_public_sold_out`, or add that named switch if absent; record its Active value. It is global, so execution needs a coordinated window that will not change unrelated live sales. This concrete global effect is why the smoke case requires coordinated setup.
* For stored true while the switch is off, an administrator can use **Admin → Tickets → Ticket types**, search by event and ticket-type name, open the matching row and save **Public sold out = Yes**. `TicketTypeAdmin` exposes the model field and only excludes the deprecated distributed-inventory field. Do not alter calculated sold-out fields or base-inventory records.
* Use a positive finite inventory cap and retained test purchases to prepare zero remaining. Keep all capacity-consuming records under the execution team’s control. Record event names, type names, original caps, original settings and order references.
* Purchase/refund cases must use orders created for this work and a payment setup approved for test orders; never buy/refund an unrelated customer's order. Keep accounting records as evidence rather than deleting them. A free public ticket is sufficient for the clean public fulfillment proof; TC-13 provides the staff cash transaction proof.
* Supply a known event-widget host and, for calendar checks, an organizer calendar widget containing the selected event. Use the same event/date across public, widget and discovery checks.

## Suggested Automated Coverage

| Priority / layer | Target | Required proof |
| --- | --- | --- |
| P0 backend integration | Boolean switch × saved true/false/null × actual zero/positive | Real public detail/calendar/discovery output, normal user basket create/update/final purchase, no unauthorized bypass; keep actual counts unchanged. |
| P0 backend integration | Final checkout after selection and override activation | Reject before paid order/ticket issuance; request retry still rejects; clearing setting allows a fresh valid selection. |
| P0 backend integration | Venue basket and real hold routes | Staff sale succeeds on actual inventory; basic/branded allocated purchases succeed; forged hold state and unrelated forced types cannot use the exemption; actual zero still blocks fresh staff sale. |
| P0 frontend + end-to-end | TC-10/TC-11 seat maps | Real public serialized data through item-map filtering; sole sold-out seat unavailable, shared seat usable, sold-out choice marked, no seat double allocation. Unit omission expectations must not substitute for the requested visible behavior. |
| P1 browser | TC-27, TC-04, TC-05, TC-08 | Role-based checkbox access, save/reopen/cancel, public effect, actual inventory unchanged; restore global state in teardown. Serialize global-switch tests to avoid interfering runs. |
| P1 backend + browser | TC-09/TC-06 public aggregates | All-forced/all-empty/mixed, one type reopened, hidden/private/expired type exclusion, recurring children, independent actual event cap; compare refreshed discovery/calendar/cache to live serializers. Keep one real scheduled 25-minute run separate from tests that force refresh. |
| P1 backend lifecycle | Refund, exchange, void, hold expiry, inventory increase | Actual count returns; saved boolean remains true; ordinary public checkout still rejects; equivalent off/false controls remain available. |
| P1 financial integration | Card’s unchanged refund/exchange amounts | Matched orders, same price/fees/tax/shipping/options, switch on/off; compare refund, exchange credit and replacement invoice amounts and records. |
| P1 backend | Migration, omitted value, recurring inheritance, employee access | New/existing defaults false, null behavior, Manage Events permission, cross-venue rejection, inherited versus divergent child values, no unintended standalone endpoint assumption. |
| P1 package integration | TC-24 and TC-31–TC-36 | Exercise real preset/custom and ticket + product baskets: parent rejects add/final purchase; included override remains exempt; required choices, ratios, variants, seats, real stock and one-order fulfillment remain correct. Add venue-basket purchase and reject unsupported nested custom inputs. |

Reuse the existing backend regression files in B9, but supplement their mocked helpers with real endpoints and transactional order/ticket assertions. Automation suggestions are not new tests or evidence of passing existing tests.

Add separate native app journeys for Explore, Saved and cart resume on iOS/Android; native Mobile Box Office and POS; kiosk public-selection/venue-purchase boundary; and Electron startup → sale. Parameterize the public PurchaseEntry table instead of claiming one shared web component covers every host. Add checkout-link retry/existing-cart, add-on and upgrade replacement assertions. Tests for kiosk final purchase require the product decision in Open Questions.


## Open Questions

1. Does the intended delivery now use only `public_sold_out` and the backend-gated **Show as sold out publicly** checkbox, or must the separate venue-scoped `enable_force_public_sold_out_ui` and internal indicator still be delivered? Local source supports the former, supplied card describes both.
2. For a shared seat, must a sold-out non-waitlisted ticket choice remain visibly labelled, as requested, or may it be omitted? The current item-map unit contract expects omission. This blocks accepting TC-11’s visible-label outcome as implemented, not writing the requested regression.
3. Is 25 minutes the accepted maximum propagation delay on every public surface, or only the requested regression observation time? The card also asks for immediate reopening; cache refresh timing alone does not settle that requirement.
4. Should a customer kiosk reject a previously allocated ticket after public sellout is enabled? It currently uses public selection data but a venue purchase endpoint. The answer determines whether the final-purchase behavior is a defect or an intended exception.
5. Which real host pages are available for legacy calendar, express checkout, website checkout handoff and in-app checkout links? Their source callers exist; missing execution data must be recorded per entry, not replaced by a different host.
6. Package coverage is now TC-24 and TC-31–TC-36 with global ON. Confirm custom-package widget support and native Box Office/POS package choices/product variants before adding those entry combinations. Nested custom packages are explicitly unsupported by the reviewed backend. Payment-plan/access-qualified tickets, additional exchange modes and admin imports remain separate deferred coverage.

No user action is required to read or use these drafts. Resolve the named implementation questions before treating the entire card as accepted; all cases still require execution and evidence.
