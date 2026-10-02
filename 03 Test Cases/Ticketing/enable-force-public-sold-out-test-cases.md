---
title: Public Sold Out Switch — Manual Test Cases
date: 2026-09-14
tags:
  - qa/test-cases
  - tickets
  - public
---

# Public Sold Out Switch — Manual Test Cases

**Status: Published in Core - Inventory (625): TC-02 → [SPT-5230](https://app.qase.io/case/SPT-5230); TC-11 → [SPT-5236](https://app.qase.io/case/SPT-5236); TC-12 → [SPT-5237](https://app.qase.io/case/SPT-5237); TC-17 → [SPT-5238](https://app.qase.io/case/SPT-5238). Package cases TC-24 and TC-31–TC-36 and lifecycle cases TC-03, TC-20, TC-22, TC-23, TC-26, TC-28, TC-29 and TC-30 are also published in suite 625; their IDs appear beside each case below. The eight additions listed below are also published in suite 625; the remaining local drafts are explicitly listed below. No tests executed.**

See [[#Qase Regression Gap Analysis — 2026-09-14]] for reusable existing cases and remaining regression gaps.

## Updated Requirements Checklist — 2026-10-01

**Published means the manual case exists in Qase, not that the requirement has passed. No manual execution results are recorded here.** R01 is the fixed switch-OFF regression. Every other executable case requires switch ON in Preconditions; the ticket toggle is separate.

This list combines the Jira requirements, the source-reviewed purchase paths and the client’s three offerings: regular tickets, ticket + product bundles, and ticket + ticket packages. “Family pack” is descriptive, not a Showpass configuration.

| Requirement | What must be verified | Local / Qase case | Coverage status |
| --- | --- | --- | --- |
| R01 | Switch OFF: the organizer toggle/help text is hidden; saved public-sellout values do not block available tickets; actual-zero tickets remain blocked. | TC-01 → [SPT-5307](https://app.qase.io/case/SPT-5307); [SPT-402](https://app.qase.io/case/SPT-402) | Published |
| R02 | Save and reopen the ticket toggle without changing actual inventory; cancel an unsaved change without changing availability. | TC-04, TC-08 | Local drafts |
| R03 | Switch ON: a checked ticket cannot be selected publicly; an available comparison ticket completes purchase through the same entry. | TC-02 → [SPT-5230](https://app.qase.io/case/SPT-5230) | Published |
| R04 | Clear the ticket toggle: available stock becomes selectable; zero stock remains sold out. | TC-05 → [SPT-5301](https://app.qase.io/case/SPT-5301) | Published |
| R05 | An internal sale cannot add an actually exhausted ticket to a fresh cart while the switch is ON. | TC-14, TC-16 | Local drafts; OFF baseline is R01 |
| R06 | After 25 minutes, all-forced, all-exhausted and mixed ticket types make the event sold out on public detail, widgets, calendar and discovery. | TC-09 → [SPT-5302](https://app.qase.io/case/SPT-5302) | Published |
| R07 | Clear one stocked ticket type: the event reopens after 25 minutes and its other unavailable types stay blocked. | TC-06 → [SPT-5303](https://app.qase.io/case/SPT-5303) | Published |
| R08 | A recurring parent change reaches matching ticket types on both dates; clearing one occurrence reopens only that date. | TC-07 → [SPT-5300](https://app.qase.io/case/SPT-5300) | Published |
| R09 | Web Box Office, desktop, Mobile Box Office and POS can complete an ordinary in-person sale with actual stock despite public sellout. | TC-13 → [SPT-5305](https://app.qase.io/case/SPT-5305); TC-15 → [SPT-5306](https://app.qase.io/case/SPT-5306) | Published |
| R10 | Existing employee holds/group allocations and basic/branded customer hold links still complete purchase of allocated tickets. | TC-22 → [SPT-5284](https://app.qase.io/case/SPT-5284); TC-23 → [SPT-5285](https://app.qase.io/case/SPT-5285) | Published; regular tickets |
| R11 | Void the internal sale: stock returns, the old ticket is voided, no refund occurs, and public sales stay closed until the toggle is cleared. | TC-03 → [SPT-5282](https://app.qase.io/case/SPT-5282) | Published; regular tickets |
| R12 | Refund the internal sale: stock returns, the refund amount is unchanged by the toggle, and public sales stay closed until it is cleared. | TC-26 → [SPT-5286](https://app.qase.io/case/SPT-5286) | Published; regular tickets |
| R13 | Exchange the internal sale: the replacement is issued, stock returns to the original type, credit is unchanged, and the original type stays publicly sold out. | TC-30 → [SPT-5289](https://app.qase.io/case/SPT-5289) | Published; regular tickets |
| R14 | Release an allocated hold: stock returns but public sales remain closed until the ticket toggle is cleared. | TC-28 → [SPT-5287](https://app.qase.io/case/SPT-5287) | Published; regular tickets |
| R15 | Increase actual inventory: the type stays publicly sold out until the ticket toggle is cleared. | TC-29 → [SPT-5288](https://app.qase.io/case/SPT-5288) | Published; regular tickets |
| R16 | Mark a regular ticket or package parent sold out after selection: existing checkout cannot issue a completed or partial order. | TC-19 → [SPT-5304](https://app.qase.io/case/SPT-5304); TC-34 → [SPT-5267](https://app.qase.io/case/SPT-5267) | Published |
| R17 | An ordinary mixed checkout link rejects the sold-out ticket and allows the available ticket to complete purchase; existing items are preserved without duplicates. Repeat through the app abandoned-cart recovery push. | TC-20 → [SPT-5283](https://app.qase.io/case/SPT-5283) | Published; regular tickets |
| R18 | For ticket + ticket and ticket + product packages, a forced parent blocks purchase; clearing only the parent permits the configured contents. Forced included tickets remain blocked when sold separately; actual child/product shortages still limit purchase. | TC-24 → [SPT-5263](https://app.qase.io/case/SPT-5263); TC-31 → [SPT-5264](https://app.qase.io/case/SPT-5264); TC-33 → [SPT-5266](https://app.qase.io/case/SPT-5266); [SPT-4832](https://app.qase.io/case/SPT-4832) | Published; exact client composition still needed |
| R19 | In-person package sales use actual stock and issue the complete configured ticket/product contents. | TC-36 → [SPT-5269](https://app.qase.io/case/SPT-5269) | Published; Web Box Office / desktop |
| R20 | A seat with only an unavailable type cannot be selected; a shared seat permits only an available type; best-available excludes forced types; purchased seats cannot be sold again. | TC-10 local; TC-11 → [SPT-5236](https://app.qase.io/case/SPT-5236); TC-12 → [SPT-5237](https://app.qase.io/case/SPT-5237); TC-17 → [SPT-5238](https://app.qase.io/case/SPT-5238); TC-32 → [SPT-5265](https://app.qase.io/case/SPT-5265) | Partly published; shared-seat label question remains |
| R21 | Existing waitlist signup remains available for a forced ticket with stock, records one pending entry and does not issue a purchased ticket. | TC-25 | Local draft; automatic fulfillment deferred |
| R22 | Add-on and upgrade offers cannot add a forced ticket or replace the available base ticket; the original ticket can still complete purchase. | TC-21 | Local draft |
| R23 | Fresh self-service kiosk selection blocks a forced ticket while an available comparison ticket completes purchase. | TC-18 | Local draft; already-selected kiosk checkout unresolved |
| R24 | Refund amounts, exchange credit, fees, taxes, shipping and shipping tax remain unchanged by public sellout. | TC-26 → [SPT-5286](https://app.qase.io/case/SPT-5286); TC-30 → [SPT-5289](https://app.qase.io/case/SPT-5289) | Representative checks published; full financial combinations deferred |
| R25 | Prove refund, void, exchange, hold release and allocated-hold checkout separately for the client’s ticket + product and ticket + ticket packages. | No package-specific lifecycle cases yet | Gap; regular-ticket lifecycle cases do not prove this |

**Purchase entries for R01/R03:** single-day and recurring event detail, direct occurrence links, attractions (calendar, quantity first and fixed event), modal/embedded event widgets, current/legacy/attraction calendar widgets, Showpass-built website modal/separate checkout, and native customer app Explore/recurring/attraction/Saved. Record iOS and Android separately. Seating, in-person sales, carts, checkout links and holds have their separate rows above.

**Required follow-up beyond the published manual cases:**

* **Direct API enforcement — deferred:** reject a direct public basket add/update and final purchase for a forced selling type. UI rejection alone is insufficient proof.
* **Default/migration, permissions and organization isolation — deferred:** existing/new ticket types default to no public override, authorized event editors can save it, unauthorized accounts cannot change another organization’s records, and no client-specific IDs or calculated inventory fields are used as the durable setting.
* **Admin generation and complimentary imports — deferred:** these separate internal paths must use actual stock and preserve normal generation/fulfillment behavior; a Box Office sale does not prove imports.
* **Separate venue UI flag and Box Office indicator — blocked implementation question:** Jira describes enable_force_public_sold_out_ui and an internal indicator; reviewed source gates the legacy editor with the global switch and does not establish the separate flag/indicator.
* **Timing — open question:** 25 minutes is the requested event-status observation point. Jira also asks for immediate reopening of an otherwise eligible ticket; delayed event projections must not silently replace that ticket-level requirement.


**Review update — 2026-09-15:** TC-03 now covers voiding the internal sale and reopening only after the ticket field is cleared. Its former clean purchase is retained through the existing SPT-3290 regression reference. Refund, hold release, manual inventory increase and exchange now have explicit return-and-reopen coverage. Seat, link, offer and package cases include fulfillment where needed. TC-02 / SPT-5230 was not changed.

**Package review — 2026-09-17:** TC-24 now covers preset package shapes with the global switch ON. TC-31–TC-36 add custom choices, seating, ticket + product contents, existing-cart rejection, actual shortages and in-person sales. These package cases were subsequently published on 2026-09-21 as SPT-5263–SPT-5269. The previously published cases and the user-edited SPT-402 content were not changed by that upload.

**ON-prerequisite cleanup — 2026-09-21:** TC-01 / SPT-402 are the fixed-OFF regression. Every other active case has an ON prerequisite; switch-state parameters and conditional OFF results are removed. TC-27 is retired without renumbering. Qase audit: SPT-5230, SPT-5236 and SPT-5237 already comply; SPT-5238 was updated and verified with the same ON-prerequisite rule. No new Qase cases are proposed, and no manual tests were executed.

**Readability cleanup — 2026-09-21:** Shortened descriptions, prerequisites and cleanup throughout the active cases; parameter tables explain each choice. Updated and verified TC-02 / SPT-5230, TC-11 / SPT-5236, TC-12 / SPT-5237, TC-17 / SPT-5238 and the SPT-402 regression mirror. Existing steps, parameters, titles and tags are preserved. The seven package cases already match this format. SPT-402 keeps your tables and extra setup text removed; SPT-5263 retains your edits. No manual tests were executed.

**Package consolidation — 2026-09-22:** SPT-5265 now checks that buying the last eligible seat blocks a second package sale. SPT-5266 now checks that insufficient product stock blocks another bundle purchase and explains how to prepare both ticket + product setups. Both updates were saved and verified. SPT-5268 remains in Qase with a `[DELETE]` title for cleanup; TC-35 is retired from execution. Existing ticket-shortage coverage remains in SPT-4832. No manual tests were executed.

**Client-offering review — 2026-09-22:** The reported client sells regular tickets, a ticket + product bundle, and a ticket + ticket package described as a family pack. “Family pack” describes its purpose, not a Showpass configuration or test parameter. Use TC-02 for the regular ticket and TC-33 with `TicketAndProduct` for the bundle. For the ticket + ticket package, use TC-24 with `SingleEvent` or `MultipleEvents` according to its included event dates if the contents are fixed; use TC-31 if the customer chooses included tickets. The `TicketChildrenAndProduct` value in TC-33 is a separate three-part configuration; it is not required for this client's three offerings. Run TC-09 and TC-06 with all three public selling types on the same event if that matches the client's setup. The client's actual package type, included ticket types/counts/dates, product quantity/variants, and whether a child is also sold as a regular ticket have not been established. The broader `SingleEvent` and `MultipleEvents` setups below are local clarifications pending a Qase update to SPT-5263; that existing case was not changed by the client review or lifecycle upload.

**Lifecycle upload — 2026-09-22:** Created and verified TC-03, TC-20, TC-22, TC-23, TC-26, TC-28, TC-29 and TC-30 as SPT-5282–SPT-5289 in Core - Inventory (625). These are the standalone-ticket cases named in the client lifecycle map; package-specific refund, void, exchange and hold paths remain uncovered. No manual tests were executed.

**Qase additions — 2026-10-01:** Created eight cases in Core - Inventory (625). All execution fields were verified against the local drafts. TC-01 requires the global switch OFF; the other seven require ON in Preconditions. SPT-402 and the previously published cases were preserved.

| Local case | Behavior | Qase case |
| --- | --- | --- |
| TC-07 | Recurring parent and one occurrence reopened | [SPT-5300](https://app.qase.io/case/SPT-5300) |
| TC-05 | Clear the toggle with available or zero inventory | [SPT-5301](https://app.qase.io/case/SPT-5301) |
| TC-09 | All ticket types unavailable: event-level sellout | [SPT-5302](https://app.qase.io/case/SPT-5302) |
| TC-06 | One available type reopens the event | [SPT-5303](https://app.qase.io/case/SPT-5303) |
| TC-19 | Existing regular-ticket cart is blocked | [SPT-5304](https://app.qase.io/case/SPT-5304) |
| TC-13 | Web Box Office / desktop in-person sale | [SPT-5305](https://app.qase.io/case/SPT-5305) |
| TC-15 | Mobile Box Office / POS in-person sale | [SPT-5306](https://app.qase.io/case/SPT-5306) |
| TC-01 | Switch-OFF completed public purchase | [SPT-5307](https://app.qase.io/case/SPT-5307) |

**Remaining local drafts:** TC-04, TC-08, TC-10, TC-14, TC-16, TC-18, TC-21 and TC-25. TC-27 and TC-35 are retired. Package-specific refund, void, exchange and hold coverage remains a separate gap; this upload does not close it. No manual tests were executed.

## How to run this note

**“Switch OFF” and “Switch ON” always mean the global `enable_force_public_sold_out` switch.** The ticket-type checkbox is a separate saved value.

| Control | Meaning |
| --- | --- |
| Global switch `enable_force_public_sold_out` | Turns the new public-sellout behavior OFF or ON for the platform. |
| Ticket-type `public_sold_out` / **Show as sold out publicly** | Marks that particular ticket type for public sellout; has effect only while the global switch is ON. |

**Execution rule — confirmed 2026-09-21:** Run TC-01 and the existing [SPT-402](https://app.qase.io/case/SPT-402) with the global switch **OFF**. Every other active local case requires the switch **ON in Preconditions**. The switch is not a parameter, and feature cases do not repeat an OFF run.

The ticket-type **Show as sold out publicly** checkbox is separate: checked blocks ordinary public purchase while the global switch is ON; unchecked follows actual availability. A case may change this checkbox without changing the waffle switch.

### Regression — global switch OFF

* **TC-01:** existing public purchase through every listed PurchaseEntry, including single-day/recurring events, attractions, widgets, Showpass-built websites and the native customer app.
* **SPT-402:** existing actual-zero inventory and available-comparison checks across its saved sales surfaces, plus the organizer checkbox and help text remaining hidden.
* Keep OFF fixed throughout these regression cases. An administrator prepares any saved public-sellout values needed while the organizer control is hidden. SPT-402’s user-edited content is preserved below; no tables or extra parameters are being added to that Qase case.

### Feature cases — global switch ON

Every case in this checklist has **enable_force_public_sold_out ON as a prerequisite**. Change the ticket-type checkbox only where the steps say to do so.

| Area to check | Case | Run these values | Expected result |
| --- | --- | --- | --- |
| Fresh public purchase entry points | [TC-02](#tc-02--global-switch-on--forced-sellout-across-public-purchase-entry-points) | Every PurchaseEntry, including all four mobile app entries | TRUE blocks the target; FALSE control completes purchase through the same entry. |
| Void an internal sale, retain sellout, then clear the ticket field | [TC-03](#tc-03--void-an-internal-sale-keep-public-sales-closed-then-reopen-the-ticket) | Global ON throughout | Void returns inventory without refunding money; public sale reopens only after the ticket checkbox is cleared. |
| Save, clear at positive/zero inventory, Cancel | [TC-04](#tc-04--save-the-public-sellout-without-changing-inventory), [TC-05](#tc-05--clear-the-setting-at-positive-and-zero-remaining-inventory), [TC-08](#tc-08--cancel-an-unsaved-checkbox-change) | Both RemainingTickets values | Saved state persists; actual zero never reopens; Cancel does not save. |
| Event soldout and recovery after 25 minutes | [TC-09](#tc-09--all-ticket-types-produce-event-sellout-after-25-minutes), [TC-06](#tc-06--one-available-type-reopens-the-event) | AllForced, AllEmpty, Mixed; then reopen one stocked type | Event-level soldout and inverse reach page, widgets, calendar and discovery. |
| Recurring inheritance and single occurrence reopened | [TC-07](#tc-07--recurring-event-inheritance-and-one-occurrence-reopened) | Matching parent/child values | Both children inherit; clearing one child reopens only that occurrence. |
| Assigned seating across all mapped entry points | [TC-10](#tc-10--a-seat-with-only-a-sold-out-ticket-type), [TC-11](#tc-11--a-seat-with-available-and-sold-out-ticket-types) | TC-10 and TC-11: ForcedSoldOut / InventoryEmpty. Each SeatEntry; global ON throughout. | Sole unavailable type blocks seat; mixed seat permits only available type. |
| Best-available seating | [TC-12](#tc-12--public-best-available-seating--switch-on) | Global switch ON prerequisite; every SeatHost | Forced target cannot allocate; available control gets the selected seat. |
| Already selected cart and all resume paths | [TC-19](#tc-19--existing-cart--resume-after-the-ticket-setting-changes) | every ResumeEntry | No completed order after the target becomes forced sold out. |
| Checkout links, ticket add-ons and upgrades | [TC-20](#tc-20--checkout-link--automatic-ticket-selection), [TC-21](#tc-21--checkout-ticket-add-on-and-upgrade-offers) | all mapped values | No forced ticket is added; existing allowed ticket is retained. |
| Web/Electron and native Mobile Box Office/POS | [TC-13](#tc-13--in-person-sale-with-actual-inventory), [TC-14](#tc-14--fresh-staff-basket-cannot-sell-actual-zero), [TC-15](#tc-15--mobile-box-office-and-pos--available-inventory), [TC-16](#tc-16--mobile-box-office-and-pos--actual-zero-inventory), [TC-17](#tc-17--in-person-assigned-seat-sale--box-office-and-pos) | every mapped app/seat entry | Actual inventory is still sellable internally; no oversell. |
| Customer kiosk | [TC-18](#tc-18--customer-kiosk--public-selection-and-control-purchase) | both KioskEvent values | Fresh selection blocks target; unforced control can complete. Existing-cart gap stays open. |
| In-person hold/group-sale checkout | [TC-22](#tc-22--staff-checkout-of-an-existing-hold-or-group-sale) | BasicHold and GroupSale; Web Box Office and Electron | The saved public-sellout value does not block an allocated staff sale. |
| Allocated holds, waitlists and refund return | [TC-23](#tc-23--existing-allocated-hold-link), [TC-25](#tc-25--existing-waitlist-entry), [TC-26](#tc-26--refund-an-internal-sale-without-reopening-public-sales-or-changing-the-refund-amount) | All HoldLink values; forced-sold-out waitlist; inventory-return refund | Allocations and waitlist signup work; refund does not reopen a forced type. |
| Packages: preset, custom, seating and ticket + product | [TC-24](#tc-24--preset-packages--parent-restriction-and-included-ticket-access), [TC-31](#tc-31--custom-packages--required-choices-and-publicly-sold-out-included-tickets), [TC-32](#tc-32--assigned-seat-packages--included-public-sellout-and-seat-ownership), [TC-33](#tc-33--ticket--product-packages--selection-quantities-and-fulfillment) | Global ON throughout; parent checked → unchecked, included tickets remain checked | Parent blocks public purchase; clearing only the parent permits the complete configured contents. |
| Package checkout after sellout, actual shortages and in-person sales | [TC-34](#tc-34--existing-package-cart--parent-becomes-publicly-sold-out), [TC-36](#tc-36--in-person-package-sale--tickets-and-products-remain-sellable); TC-32 / TC-33 for seat/product shortages | Global ON throughout | Final checkout rejects a forced parent; seat and product shortages block incomplete packages; in-person sales use actual stock. Ticket-inventory shortage is covered by SPT-4832. |
| Refund, release a hold, add inventory, or exchange the original sale | TC-26, TC-28, TC-29, TC-30 | Global ON; keep the original type checked until the explicit clear step | Actual inventory returns; customers remain blocked; clearing the ticket field restores selection. Refund/credit previews remain unchanged. |

### Retired switch-transition case

TC-27 is retired from the execution set. Its label remains for traceability, but there is no ON → OFF → ON procedure to run. This supersedes the earlier smoke-test request; use the fixed-state regression and feature cases above.

### Execution recording

For each entry record **case + remaining parameter values + ticket checkbox value + actual remaining inventory + app/host + OS + event/date/seat + result**. The prerequisite supplies the switch state; do not choose an OFF/ON parameter. Record a setup failure if the required state is unavailable. Record iOS and Android separately for app runs; a mobile browser does not replace the native app.

A missing host, record or app configuration is Blocked for that entry. Existing baseline links and the historical gap analysis remain references, not instructions to rerun each feature case with the switch OFF. Remaining blocked/deferred paths are named in the scope ledger.

## Commit-scoped regression focus — 6cc497ff9b

Reviewed the exact backend commit `6cc497ff9bfacfc4161930e2a31dee3e70287ac8` against its single parent `be0222383e355ac3f687a1361d9fec5ecd95ba78`. Both local repos are on `develop`; the supplied commit exists in `web-app`, not `showpass-frontend`. This review uses the commit delta for backend scope and current frontend source for the client callers. No execution results or Qase changes were made during this review.

**Finding:** actual inventory arithmetic, the inventory recalculation service, sold-out repair/outbox processing, refund/void/exchange implementations and payment processing were not edited by this commit. Shared basket sold-out validation **was** edited: `BaseTicketBasketSerializer.clean_validate_is_tt_sold_out` now resolves the payment-plan issued type, retains the held-allocation exception, and calls a new public-only restriction hook. Public basket allocation and final checkout, public ticket/event responses, calendar SQL, discovery projections, the editor and recurring-field inheritance also changed. Calling this only a display change would miss the checkout risk.

For the current regression pass, keep **enable_force_public_sold_out OFF throughout**. Admin-prepared saved TRUE values deliberately test whether the disabled feature affects existing behavior; include ordinary existing/default-false data as a baseline. The organizer-facing toggle and its help text must remain hidden.

Prioritize these proof targets:

1. **Editor and saved settings:** hidden toggle/help text; existing single-day and recurring ticket-type edits still save and reopen normally. The model/serializer additions and recurring propagation execute outside the UI gate.
2. **Selection through completed purchase:** actual-positive tickets with saved TRUE still sell, while actual-zero tickets remain unavailable. Include fresh selection, quantity changes and an existing cart through final confirmation. Verify the right ticket/order and the expected inventory decrement. SPT-402 proves visibility/selection only; TC-01 supplies fresh completed-purchase proof. Existing-cart OFF completion is deferred from the revised manual set; TC-19 now tests ON rejection only.
3. **Public availability across changed response paths:** single-day and recurring detail, selected dates, attraction/calendar views, widgets, search/listing cards and the native customer app must agree with actual availability. Keep real zero-inventory controls; a saved TRUE value alone must not mark an available item sold out. Calendar and discovery are separate query/cache paths, not covered by checking one detail page.
4. **Shared-validation exceptions:** ordinary in-person Box Office/POS sales, real allocated hold checkout, package parent/child selection, and payment-plan tickets. These deserve targeted regression because the shared validation method changed even with the new switch OFF. Existing Qase hold/package baselines remain reference procedures. The local hold and package cases keep ON fixed; additional OFF runs of these workflows are outside the requested execution set. The focused payment-plan case remains deferred in the scope ledger.
5. **Seating:** sole exhausted type, mixed available/exhausted choices on one seat, best-available selection and an in-person seat sale. Check issued-seat ownership and no double allocation. Seating algorithms were not edited, but their clients consume the changed availability values and basket validation.

A representative inventory-return smoke is useful. An exhaustive refund, void, exchange, payment-provider or financial-calculation matrix is not the first priority for this commit's OFF regression: those implementations were not edited. The requested ON retention lifecycles remain separate feature acceptance coverage; they are not removed from this note.

Evidence: backend `apps/tickets/api/serializers/general.py`, `apps/tickets/api/user_based/serializers/baskets.py`, `apps/tickets/api/public/serializers/{ticket_types,events}.py`, `apps/tickets/models/event_management/event_ticket_types.py`, `apps/main/templates/tickets/dialogs/_edit-ticket-type.html`, `apps/venues/queries/calendar/{calendar_events_query,calendar_event_detail_query,calendar_public_sold_out}.py`, `apps/main/queries/discovery_materialized_view.py`. Frontend callers: `packages/core/src/shared/modules/ticket-types/utils/ticket-type-utils.ts`, `packages/core/src/shared/modules/events/utils/event-utils.ts`, `packages/core/src/shared/modules/seating/services/SeatingService.ts`, and public/venue basket repositories in F3. Added helper tests use mocks; reading them does not establish an end-to-end pass.

## Minimum Execution Set

Run the OFF regression first: TC-01 for its public purchase entries and SPT-402 for its existing inventory/sales-surface scenarios. Then run active TC-02–TC-36 with the switch ON; skip retired TC-27 and TC-35. No active case uses the waffle switch as a parameter.

For TC-10 and TC-11, run ForcedSoldOut for every SeatEntry and InventoryEmpty at least once per distinct host family (web page, widget, native app). Run best-available selection and both positive/zero-inventory in-person cases on their listed clients with ON fixed. Keep all three TC-09 sellout reasons and TC-06 reopening after 25 minutes. Preserve cart resume, link retry, offer rejection, allocated holds, waitlist signup and inventory-return checks.

Do not repeat every event/seat/payment permutation across every device unless a failure or source difference justifies it. Still record the deliberately sampled dimensions and all missing entry-point evidence. Run a clean available-ticket purchase using [SPT-3290](https://app.qase.io/case/SPT-3290) with global ON and the ticket field unchecked; this preserves clean-success proof without the former duplicate TC-03. The core organizer lifecycle also requires TC-03, TC-26, TC-28, TC-29 and TC-30. No result is currently Passed; blocked/deferred ledger rows prevent claiming full purchase-flow sign-off.

For **package acceptance**, keep global ON and run TC-24 for each supported PackageShape. PurchaseEntry was removed by the user from SPT-5263; use the selected package’s purchase flow without restoring that parameter. Run TC-31; both TC-32 seating configurations, including its final no-seat check; both TC-33 bundle compositions, including its final product-shortage check; each TC-34 package-content value; and TC-36 in Web Box Office and Electron. SPT-4832 covers preset/custom child-ticket inventory exhaustion. Cover each supported shape/entry at least once without inventing unsupported combinations. Record missing supported setup as Blocked. Validate existing barcode mode in every successful order; sample both parent-barcode and separate-item configurations across the set. These manual cases have not been executed.

For **this client's purchase shapes**, use TC-02 (regular ticket), TC-33 `TicketAndProduct` (ticket + product), TC-24 `SingleEvent` or `MultipleEvents` for a fixed ticket + ticket package, or TC-31 for customer-chosen contents, and TC-09 → TC-06 with all three public selling types on the same event if applicable. This is only the purchase-shape slice; the lifecycle and access checks below are also part of the client review. The other TC-24 shapes and TC-33 `TicketChildrenAndProduct` are broader platform coverage, not prerequisites for these three offerings. Record each package's actual contents, quantities, variants and dates and whether an included ticket is also sold separately; do not assume two identical included tickets or an extra product. TC-24 and TC-33 currently use zero-total test orders, and TC-33 uses fixed product quantities, so they prove the switch and configured bundle mechanics on controlled data; they do not alone prove a paid checkout using this client's exact products.

| Client offering | Set Show as sold out publicly on | Public result to verify | Case |
| --- | --- | --- | --- |
| Regular ticket | The regular selling ticket type | It cannot be bought while actual stock remains; clearing it restores selection if stock remains. | TC-02, TC-05 |
| Ticket + product | The selling ticket type with the attached product | The whole bundle is blocked; clearing the selling type allows its configured ticket and product quantities, with no product-only order. | TC-33 `TicketAndProduct` |
| Ticket + ticket package (the client's “family pack”) | The package's selling ticket type; also check included ticket types for the child-exemption run | A checked parent blocks the package. After clearing only the parent, its configured included tickets are issued even if an included type remains publicly sold out; that type stays blocked as a standalone purchase. | TC-24 `SingleEvent` or `MultipleEvents` if preset; TC-31 if customer-chosen |

If an included ticket is also the separately sold regular ticket, use that same type for the standalone-versus-included check. Its public checkbox must block the standalone sale without reducing the package's actual child capacity.

**Client lifecycle and access coverage — global switch ON**

| Requirement | Existing cases | What they currently prove for this client |
| --- | --- | --- |
| Save and clear the setting without changing actual stock | TC-04, TC-05, TC-08 | Ticket-type setting, actual-positive/zero boundary and unsaved change; prepare the relevant selling type. |
| Void an internal sale, then keep returned stock publicly closed until clearing the setting | TC-03 | Standalone regular ticket only; its setup excludes packages. |
| Refund an internal sale without changing the refund amount or reopening public sales | TC-26 | Standalone regular ticket only; its setup excludes packages. |
| Exchange an internal sale; retain public sellout on the returned type and preserve credit | TC-30 | Standalone regular ticket only; its setup excludes packages. |
| Release a hold or manually increase inventory; do not reopen public sales | TC-28, TC-29 | Standalone regular ticket only; both setups exclude packages. |
| Complete an allocated hold or group sale in person; purchase an existing allocated hold link | TC-22, TC-23 | Standalone regular ticket only; each allocates one ticket, not a package. |
| Reject an ordinary checkout link that requests a forced ticket | TC-20 | Standalone regular ticket only; it explicitly excludes packages. An allocated hold link is the separate TC-23 exception. |
| Reject a cart after its selling type becomes publicly sold out | TC-19, TC-34 | TC-19 covers a regular ticket; TC-34 covers preset/custom ticket packages and ticket + product bundles at final checkout. |
| Permit an in-person sale with actual stock despite public sellout; block actual-zero sales | TC-13–TC-17, TC-36, SPT-4832 | TC-13–TC-17 cover ordinary tickets/seats. TC-36 covers in-person package sale; SPT-4832 is the existing child-ticket shortage baseline. |
| Keep waitlist registration available without issuing a ticket | TC-25 | Standalone ticket; run only if the client's selling type has an active waitlist. |
| Recurring dates, seating, native app, widgets and discovery | TC-02, TC-07, TC-09–TC-12, TC-17, TC-32 | Run the supported client entry points and configurations; TC-02 includes the native customer app, and TC-09/TC-06 cover event-level status. |

**Uncovered for this client:** the existing inventory-return and allocated-hold cases do not establish refund, void, exchange, hold release or hold-link behavior for the ticket + product or ticket + ticket package. Do not mark those package paths covered by the standalone-ticket cases. They need package-specific setup and source-verified expected results before they can be accepted as package coverage.

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
| P1 — Public restriction and rollback | Customers cannot bypass an active sellout; rollback restores actual-inventory behavior. | TC-03, TC-04, TC-05, TC-19, TC-08, TC-01, TC-02, TC-18, TC-20, TC-21 |
| P2 — Event availability converges | Individual sellouts and reopening are reflected in event entry points. | TC-09, TC-06, TC-07, TC-01, TC-02 |
| P3 — Seat availability stays correct | An unavailable ticket cannot claim a seat; another available ticket can. | TC-10, TC-11, TC-12, TC-17 |
| P4 — Actual inventory and allocated access remain usable | Staff and allocated hold customers retain supported access; zero stock remains zero. | TC-03, TC-13, TC-14, TC-23, TC-26, TC-15, TC-16, TC-17, TC-22, TC-28, TC-29, TC-30 |
| P5 — Related public sales preserve their rules | Package restrictions apply to the purchased parent; included ticket/product quantities, selections, seats and real stock remain correct; waitlist signup stays available. | TC-24, TC-25, TC-31–TC-36 |


## Qase-ready Manual Test Cases

Each active case is complete below. TC-01 is OFF; all other active cases have ON prerequisites. TC-27 and TC-35 are retired. Qase regression references appear directly under each case heading; they are note-only links and are not part of the fields to copy into Qase. A related or partial match does not mean the local draft already has that Qase ID.

### Global switch OFF — fresh public purchase regression

#### TC-01 — Global switch OFF — regression across public purchase entry points

**Qase case:** [SPT-5307](https://app.qase.io/case/SPT-5307) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 8 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **Purchase baselines:** [Single-day (SPT-3287)](https://app.qase.io/case/SPT-3287), [recurring (SPT-3288)](https://app.qase.io/case/SPT-3288), [free checkout (SPT-3290)](https://app.qase.io/case/SPT-3290), [attraction (SPT-3513)](https://app.qase.io/case/SPT-3513), [mobile app (SPT-4003)](https://app.qase.io/case/SPT-4003).
> **Actual sold-out regression:** [Ticket availability (SPT-402)](https://app.qase.io/case/SPT-402) and [calendar availability (SPT-3505)](https://app.qase.io/case/SPT-3505).
> **Partial entry coverage:** [quantity-first (SPT-3512)](https://app.qase.io/case/SPT-3512), [calendar hosts (SPT-4979)](https://app.qase.io/case/SPT-4979), [website handoff (SPT-4981)](https://app.qase.io/case/SPT-4981), [SDK modal/embedded (SPT-4982)](https://app.qase.io/case/SPT-4982), [native Saved (SPT-2024)](https://app.qase.io/case/SPT-2024). These stop before completing the purchase from each named entry; legacy calendar remains a gap.
> **Match scope:** SPT-402 now keeps the global switch OFF and covers actual-zero rejection plus adding/removing an available comparison ticket. Both types have Public sold out = Yes to detect an effect from the disabled feature. It does not complete a purchase or cover all 17 PurchaseEntry values; retain TC-01 for that proof.

**Title:** Core - Tickets - Global switch OFF preserves public purchases despite a saved public-sellout value

**Description:** Buy an available ticket even though its saved public-sellout value is Yes. With the switch disabled, that value must not affect public purchases; actually exhausted tickets stay unavailable.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| PurchaseEntry | Where the customer starts |
| --- | --- |
| EventDetailSingleDay | Public single-day event page → ticket selection. |
| EventDetailRecurring | Public recurring event page → prepared date/time → tickets. |
| RecurringOccurrenceLink | The public link for one specific occurrence; start directly on that date. |
| AttractionCalendar | Attraction page → ticket section → date/time selection. |
| AttractionQuantityFirst | Attraction section configured for quantity first → request 1 → choose date/time. |
| AttractionSingleEvent | Attraction section linked to one fixed event → purchase button. |
| EventWidgetModal | Host website → event purchase button → ticket modal. |
| EventWidgetEmbedded | Host website with ticket selection embedded in the page. |
| CalendarWidget | Current organizer calendar widget → date/time → event. |
| LegacyCalendarWidget | Existing older organizer calendar widget → date/time → event → its checkout. |
| AttractionWidget | Attraction calendar widget → section → prepared date/time. |
| WebsitePurchaseButton | Showpass-built organization website → event purchase button; purchase stays in its modal. |
| WebsiteCheckoutHandoff | Showpass-built website → event purchase button → its separate checkout page; selected tickets must carry over. |
| MobileExplore | Showpass app → Explore → single-day event card. |
| MobileRecurring | Showpass app → Explore → recurring event → date/time → tickets. |
| MobileAttraction | Showpass app → Explore → attraction → ticket section → date/time. |
| MobileSaved | Showpass app → Saved → an event already saved to the customer’s account. |

**Parameters:**

PurchaseEntry: EventDetailSingleDay, EventDetailRecurring, RecurringOccurrenceLink, AttractionCalendar, AttractionQuantityFirst, AttractionSingleEvent, EventWidgetModal, EventWidgetEmbedded, CalendarWidget, LegacyCalendarWidget, AttractionWidget, WebsitePurchaseButton, WebsiteCheckoutHandoff, MobileExplore, MobileRecurring, MobileAttraction, MobileSaved

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is OFF throughout. Record its original value for restoration after the regression pass.
* Published future event with 2 free, public, on-sale general-admission types, each with at least 2 remaining. Target: Public sold out = Yes; comparison: No. No waitlist, package, password, paid extras or event-wide capacity block.
* A third public, on-sale type has 0 remaining because test orders consumed a positive ticket limit. Do not set Inventory to 0.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values.
* For recurring events/attractions, prepare the actual date’s ticket types. Record event/date, type names and the host or app entry from PurchaseEntry.
* Start with an empty cart and customer-owned contact details. Mobile runs stay inside the Showpass app.

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

* Keep the completed order. Restore the administrator-prepared ticket values and, after the OFF regression pass, the original global switch value; reopen to verify.

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

**Description:** A ticket marked Show as sold out publicly cannot be selected, even with inventory remaining. Buy an available comparison ticket through the same entry point.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| PurchaseEntry | Where the customer starts |
| --- | --- |
| EventDetailSingleDay | Public single-day event page → ticket selection. |
| EventDetailRecurring | Public recurring event page → prepared date/time → tickets. |
| RecurringOccurrenceLink | The public link for one specific occurrence; start directly on that date. |
| AttractionCalendar | Attraction page → ticket section → date/time selection. |
| AttractionQuantityFirst | Attraction section configured for quantity first → request 1 → choose date/time. |
| AttractionSingleEvent | Attraction section linked to one fixed event → purchase button. |
| EventWidgetModal | Host website → event purchase button → ticket modal. |
| EventWidgetEmbedded | Host website with ticket selection embedded in the page. |
| CalendarWidget | Current organizer calendar widget → date/time → event. |
| LegacyCalendarWidget | Existing older organizer calendar widget → date/time → event → its checkout. |
| AttractionWidget | Attraction calendar widget → section → prepared date/time. |
| WebsitePurchaseButton | Showpass-built organization website → event purchase button; purchase stays in its modal. |
| WebsiteCheckoutHandoff | Showpass-built website → event purchase button → its separate checkout page; selected tickets must carry over. |
| MobileExplore | Showpass app → Explore → single-day event card. |
| MobileRecurring | Showpass app → Explore → recurring event → date/time → tickets. |
| MobileAttraction | Showpass app → Explore → attraction → ticket section → date/time. |
| MobileSaved | Showpass app → Saved → an event already saved to the customer’s account. |

**Parameters:**

PurchaseEntry: EventDetailSingleDay, EventDetailRecurring, RecurringOccurrenceLink, AttractionCalendar, AttractionQuantityFirst, AttractionSingleEvent, EventWidgetModal, EventWidgetEmbedded, CalendarWidget, LegacyCalendarWidget, AttractionWidget, WebsitePurchaseButton, WebsiteCheckoutHandoff, MobileExplore, MobileRecurring, MobileAttraction, MobileSaved

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Published future event with 2 free, public, on-sale general-admission types, each with at least 2 remaining. Target: Public sold out = Yes; comparison: No. No waitlist, package, password, paid extras or event-wide capacity block.
* A third public, on-sale type has 0 remaining because test orders consumed a positive ticket limit. Do not set Inventory to 0.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values.
* For recurring events/attractions, prepare the actual date’s ticket types. Record event/date, type names and the host or app entry from PurchaseEntry.
* Start with an empty cart and customer-owned contact details. Mobile runs stay inside the Showpass app.

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

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.
* Record an incorrectly selectable sold-out ticket as a display failure, even if checkout later rejects it.

#### TC-03 — Void an internal sale, keep public sales closed, then reopen the ticket

**Qase case:** [SPT-5282](https://app.qase.io/case/SPT-5282) — Core - Inventory (625). Created and verified on 2026-09-22; no manual execution.

> **Qase regression references (note only):** [Void event tickets and return inventory (SPT-938)](https://app.qase.io/case/SPT-938) is a related regression baseline identified in the prior Qase scan. The forced-sellout and reopening sequence is the addition here.

**Title:** Dashboard - Tickets - Voiding an internal sale keeps public sales closed until the ticket setting is cleared

**Description:** Void the internal sale that used the last ticket. Returned inventory stays publicly sold out until the organizer clears Show as sold out publicly.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Manage Events, Administer Transactions, Use Box Office, View Box Office Stats.
* Published future event: 1 public, on-sale general-admission type, Inventory 1, consumed by 1 test-owned internal cash sale. Record event/type, transaction, amount and barcode; no real customer refund is owed.
* Ticket is unscanned and not transferred, refunded or exchanged. No other orders/holds, waitlist, resale to another type, package, refund protection, shipping or event-wide capacity block.
* Record the original checkbox; save Show as sold out publicly checked in Manage Events → Edit → Ticket Types → General → Next → Save Event.

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

* Clear the public cart and restore the ticket checkbox. Keep the sale and void records; do not reactivate the ticket. Record inventory-return and public-display failures separately.

#### TC-04 — Save the public sellout without changing inventory

> **Qase regression references (note only)**
>
> **No corresponding Qase case found** for saving the public-sellout checkbox while preserving actual inventory.

**Title:** Dashboard - Tickets - Save Show as sold out publicly without changing the ticket inventory

**Description:** Save Show as sold out publicly and reopen the editor. Public sales close without changing the ticket’s inventory.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats.
* Published future event owned by the organizer: public, on-sale ticket type with at least 2 remaining, checkbox unchecked, no password or waitlist.
* Record Inventory, the remaining count in Box Office and the public page. No other sales occur while comparing counts.

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

**Postconditions:**

Uncheck **Show as sold out publicly**, select Next and Save Event, and reopen the dialog to verify restoration.

#### TC-05 — Clear the setting at positive and zero remaining inventory

**Qase case:** [SPT-5301](https://app.qase.io/case/SPT-5301) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 7 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **Partial match:** [Restore availability by increasing inventory (SPT-766)](https://app.qase.io/case/SPT-766) and [actual sold-out rejection (SPT-402)](https://app.qase.io/case/SPT-402). These do not clear the checkbox; increasing capacity is a different change. Keep the positive/zero-remaining checks here.

**Title:** Core - Tickets - Clearing public sellout respects the actual remaining tickets

**Description:** Clear Show as sold out publicly. The ticket becomes purchasable only when actual inventory remains.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |
| Widget | Desktop |

| RemainingTickets | What to use |
| --- | --- |
| Available | At least 2 actual tickets remain. |
| Empty | A positive ticket limit is consumed by test purchases; 0 remain. Never set Inventory to 0. |

**Parameters:**

RemainingTickets: Available, Empty

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events.
* Published future event: public, on-sale type with Show as sold out publicly checked and inventory matching RemainingTickets. Keep another available type so the event remains accessible.
* Record Inventory and the public page or event widget. No password, waitlist or event-wide capacity restriction.

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

* Clear the cart. Restore the checkbox through Next → Save Event and reopen to verify; keep the orders that consumed inventory.

#### TC-06 — One available type reopens the event

**Qase case:** [SPT-5303](https://app.qase.io/case/SPT-5303) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 11 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **Partial matches:** [Inventory recovery (SPT-766)](https://app.qase.io/case/SPT-766) and [calendar availability (SPT-3505)](https://app.qase.io/case/SPT-3505). Neither clears one stocked type’s public-sellout setting or proves the event reopens after 25 minutes.

**Title:** Core - Events - Reopen an event by clearing public sellout on one ticket type with inventory

**Description:** Clear Show as sold out publicly on one available ticket type. It becomes selectable, and the event reopens after 25 minutes; other sold-out types stay unavailable.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| Dashboard | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events.
* Published future event already showing sold out, with at least 2 public, on-sale selling types. First: at least 2 remaining, checkbox checked. Every other public selling type: 0 remaining or checkbox checked. For the client's combined event, include its regular ticket, ticket + product bundle, and ticket + ticket package parent.
* No password, waitlist or event-wide capacity block. Record original checkboxes, public page, event widget, organizer calendar date and searchable event name.

**Tags:** public, events, discovery

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events → event → Edit → Ticket Types → edit the first type. | General tab | **Show as sold out publicly** is checked. |
| Uncheck **Show as sold out publicly**. | First type only | The checkbox is unchecked. |
| Select Next. | — | The event editing form is shown. |
| Select Save Event and record the save time. | — | The save completes successfully. |
| Open a fresh public event page. | Same event | The first type is available for selection; record any stale sold-out state separately. |
| Wait until 25 minutes after the save. | Recorded save time | The observation time is at least 25 minutes later. |
| Reload the public event page. | Same event | The event is no longer sold out, the reopened type is selectable and every other prepared type remains unavailable. |
| Open a fresh event widget. | Same event | Only the reopened type is available for selection. |
| Open the organizer calendar widget and select the event’s date. | Recorded date | The event is offered as available. |
| Search Showpass for the exact event name. | Recorded name | The matching event result is no longer marked sold out. |
| Select one reopened ticket in the public event page or event widget. | Quantity 1 | One ticket is accepted into the cart. |

**Postconditions:**

* Clear the cart and restore the checkbox through Next → Save Event; reopen to verify. Record immediate and 25-minute results separately.

#### TC-07 — Recurring event inheritance and one occurrence reopened

**Qase case:** [SPT-5300](https://app.qase.io/case/SPT-5300) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 15 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **No direct inheritance-setting case found.** [Recurring public purchase (SPT-3288)](https://app.qase.io/case/SPT-3288) is a purchase baseline; it does not prove checkbox inheritance or reopening only one occurrence.

**Title:** Dashboard - Events - Apply public sellout to matching recurring ticket types and reopen one occurrence

**Description:** Enable Show as sold out publicly on a recurring event’s parent ticket type. Matching types on both dates inherit it; clearing it on one date reopens only that occurrence.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events.
* Test-owned, published recurring event with exactly 2 future public dates. Each has 1 matching public, on-sale type with at least 2 remaining; no password, waitlist, event-wide sellout or other available types.
* Parent and both date-specific ticket checkboxes are unchecked, with matching inherited values and no separate overrides. Record dates, public links and original settings.

**Tags:** dashboard, events, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events → recurring event → Edit → Ticket Types → edit the parent type. | General tab | The parent’s public-sellout checkbox is unchecked. |
| Check **Show as sold out publicly**. | Checked | The checkbox is checked. |
| Select Next. | — | The parent event form is shown. |
| Select Save Event and record the save time. | — | The parent save completes. |
| Open the first occurrence’s Edit → Ticket Types → matching type. | First recorded date | Its public-sellout checkbox is checked. |
| Open the second occurrence’s Edit → Ticket Types → matching type. | Second recorded date | Its public-sellout checkbox is checked. |
| Open each occurrence’s public ticket selection. | Both recorded dates | Both occurrences’ ticket types are sold out. |
| Open the recurring parent’s public page at least 25 minutes after the parent save. | Recorded parent save time; both dates forced sold out | The parent is marked sold out because no public occurrence can be purchased. |
| In the first occurrence’s ticket editor, uncheck **Show as sold out publicly**. | First occurrence only | The checkbox is unchecked. |
| Select Next. | — | The first occurrence’s event form is shown. |
| Select Save Event and record the save time. | — | The occurrence save completes. |
| Reopen both occurrences’ public ticket selections. | Both recorded dates | The first occurrence is selectable and the second remains sold out. |
| Open the recurring parent’s public event page at least 25 minutes after the occurrence save. | Recorded occurrence save time; first date reopened | The customer can open date selection and reach the available first date. |
| Select the first date and add one ticket. | First date; quantity 1 | The cart contains the reopened date’s ticket, not the sold-out date’s ticket. |
| Remove that ticket, then select the second date. | Second date | The second date’s ticket remains unavailable. |

**Postconditions:**

* Clear the cart. Restore and verify the parent and both dates individually; restoring the parent may not reset a date edited separately.

#### TC-08 — Cancel an unsaved checkbox change

> **Qase regression references (note only)**
>
> **No corresponding Qase case found** for cancelling an unsaved public-sellout checkbox change.

**Title:** Dashboard - Tickets - Discard an unsaved public-sellout change

**Description:** Cancel an unsaved checkbox change. The ticket editor and public page must keep the original availability.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events.
* Published future event: public, on-sale type with at least 2 remaining, checkbox unchecked, no password or waitlist. The event editor has no other unsaved changes.

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

**Postconditions:**

Leave the event editor without saving; the original saved setting remains unchanged.

### Feature behavior and existing functionality — global switch ON

#### TC-09 — All ticket types produce event sellout after 25 minutes

**Qase case:** [SPT-5302](https://app.qase.io/case/SPT-5302) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 6 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **Partial matches:** [Event/timeslot sold-out state (SPT-402)](https://app.qase.io/case/SPT-402), [calendar availability (SPT-3505)](https://app.qase.io/case/SPT-3505) and [discovery indicators (SPT-214)](https://app.qase.io/case/SPT-214). None verifies forced/actual/mixed aggregation after 25 minutes.

**Title:** Core - Events - Show the event as sold out when every public ticket type is unavailable

**Description:** After 25 minutes, an event with every public ticket type unavailable shows sold out on its public page, event widget, organizer calendar and discovery result.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |

| SelloutReason | First type | Second type |
| --- | --- | --- |
| AllForced | Setting checked; at least 1 remaining | Setting checked; at least 1 remaining |
| AllEmpty | Setting unchecked; 0 remaining | Setting unchecked; 0 remaining |
| Mixed | Setting checked; at least 1 remaining | Setting unchecked; 0 remaining |

**Parameters:**

SelloutReason: AllForced, AllEmpty, Mixed

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events.
* Published future single-day event with at least 2 public, on-sale selling types; no waitlist, password or event-wide capacity limit. Record names, original inventory limits and checkboxes. For the client's combined event, include its regular ticket, ticket + product bundle, and ticket + ticket package parent.
* Prepare SelloutReason in Manage Events → Edit → Ticket Types → Next → Save Event. Apply the same chosen reason to every additional public selling type: checked for AllForced; actually exhausted for AllEmpty; either checked or actually exhausted for Mixed. For 0 remaining, use test purchases that consume positive limits. Record when the last change was saved.
* Before setup, locate the event on its public page, event widget, organizer calendar and search results; keep those links and the calendar date.

**Tags:** public, events, discovery

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public event page. | Selected event | The page opens; record the initial ticket availability and event-level label. |
| Wait until 25 minutes have elapsed since the final setup change. | Recorded change time | The observation time is at least 25 minutes later. |
| Reload the public event page. | Same event | The event shows sold out and offers no normal ticket purchase. |
| Open a fresh event widget. | Same event | The event shows sold out and no prepared ticket type can be selected. |
| Open the organizer calendar widget and select the event’s date. | Recorded date | The event is marked sold out rather than offered as an available purchase. |
| Search Showpass for the exact event name. | Recorded name | The matching event result is marked sold out. |

**Postconditions:**

* Record change/observation times and screenshots. Restore and verify the ticket checkboxes; keep the orders that consumed inventory.

#### TC-10 — A seat with only a sold-out ticket type

> **Qase regression references (note only)**
>
> **Related regression:** [Public seat-map purchase (SPT-217)](https://app.qase.io/case/SPT-217), [exclude unavailable seats (SPT-2935)](https://app.qase.io/case/SPT-2935) and [attraction seating purchase (SPT-4049)](https://app.qase.io/case/SPT-4049). **Gap:** an unoccupied seat whose only ticket type is exhausted or forced sold out; unavailable-seat checks do not prove this type-level state.

**Title:** Core - Assigned Seating - Prevent selection of a seat whose only ticket type is sold out

**Description:** An unoccupied seat cannot be selected when its only ticket type is publicly sold out or has no inventory. Buy a different available seat to check that seat selection still works.

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

| SoldOutReason | Sole type |
| --- | --- |
| ForcedSoldOut | Setting checked; at least 1 actual ticket remaining |
| InventoryEmpty | Setting unchecked; positive cap consumed by test purchases on other seats, 0 remaining |

**Parameters:**

SoldOutReason: ForcedSoldOut, InventoryEmpty
SeatEntry: EventDetailMap, DirectSeatingPage, EventWidgetMap, AttractionSeatMap, MobileAppMap

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events. Use a separate customer session with an empty cart and no hold link.
* Published future seated event: an unoccupied seat has exactly 1 public, on-sale ticket type. Another available seat/type keeps the map accessible. Record section, row and seat labels.
* Prepare SoldOutReason through Manage Events → Edit → Ticket Types → General → Next → Save Event. Record original values and reopen to verify. Use the actual date’s types for recurring events/attractions.
* Both types are free, with no paid extras, password or waitlist. Use customer-owned contact details and the page/app listed in SeatEntry.

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

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.
* Save a screenshot if the unavailable seat is selectable or labelled incorrectly.

#### TC-11 — A seat with available and sold-out ticket types

**Qase case:** [SPT-5236](https://app.qase.io/case/SPT-5236) — Core - Inventory (suite 625). Updated and read back on 2026-09-21: clearer ON-only wording, both ON scenarios, all five purchase entries, all 11 steps, description, preconditions and postconditions match. Suite and tags are unchanged. No execution result recorded.

> **Qase regression references (note only)**
>
> **Related regression:** [Multiple ticket types on a seat (SPT-217)](https://app.qase.io/case/SPT-217), [best available with multiple types (SPT-2927)](https://app.qase.io/case/SPT-2927) and [attraction seating purchase (SPT-4049)](https://app.qase.io/case/SPT-4049). **Gap:** mixed available/sold-out types on the same seat and the sold-out option’s visible marking.

**Title:** Core - Assigned Seating - Buy the available ticket type when another type for the same seat is sold out

**Description:** Buy available ticket type A on a seat shared with sold-out type B. The seat stays selectable, but B must show Sold Out and cannot be purchased.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| WebPublic | Mobile |
| Widget | Mobile |
| React Native Public | Mobile |

| SoldOutReason | Ticket type A | Ticket type B |
| --- | --- | --- |
| ForcedSoldOut | At least 1 remaining; Show as sold out publicly unchecked | At least 1 remaining; Show as sold out publicly checked |
| InventoryEmpty | At least 1 remaining; Show as sold out publicly unchecked | 0 remaining; Show as sold out publicly unchecked |

| SeatEntry | Where the customer starts |
| --- | --- |
| EventDetailMap | Open the public event page and open seat selection. |
| DirectSeatingPage | Open the event’s public seat-selection link supplied with the event setup. |
| EventWidgetMap | Open the website containing the event widget and open its seat selection. |
| AttractionSeatMap | Open the attraction page, choose the prepared date/time and open seat selection. |
| MobileAppMap | In the Showpass app, open Explore → the event, choose the prepared date if recurring and open seat selection. |

**Parameters:**

SoldOutReason: ForcedSoldOut, InventoryEmpty
SeatEntry: EventDetailMap, DirectSeatingPage, EventWidgetMap, AttractionSeatMap, MobileAppMap

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events. Use a separate customer session with an empty cart.
* Published future seated event: 1 unsold, unreserved seat offers public, on-sale types A and B. Record their names and the seat’s section, row and number.
* Prepare SoldOutReason in Manage Events → Edit → Ticket Types → General → Next → Save Event. Record original checkboxes and reopen to verify. For recurring events/attractions, use the date being purchased.
* InventoryEmpty: test orders on other seats consume B’s positive inventory limit. The shared seat stays unsold; never set Inventory to 0.
* Both types are free; no paid extras, password, waitlist or event-wide capacity block. Use customer-owned details, ordinary public access and the page/app listed in SeatEntry.

**Tags:** public, assigned-seating, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event’s seating map from the chosen starting point listed above. | SeatEntry; prepared event and date/time | The correct event’s seating map opens. |
| Select the prepared unsold seat. | Recorded section, row and seat number | The seat is selectable and its ticket-type choices open. |
| Check ticket type B and try to select it if a control is offered. | B’s actual name | B is visibly marked Sold Out and cannot be added to the cart. |
| Select ticket type A for the seat. | A’s actual name; quantity 1 | The cart contains one ticket for A at the selected seat. |
| Remove the ticket from the cart. | The selected seat | The cart is empty and the seat is released from this cart. |
| Select the same seat again. | Same section, row and seat number | A is still available; B still shows Sold Out and cannot be selected. |
| Select ticket type A again. | Quantity 1 | The cart contains only A for the selected seat. |
| Continue to checkout. | One ticket for A | The summary shows the correct event, date/time, ticket type A and seat. |
| Enter the required customer details and accept the displayed terms. | Customer-owned contact details | The free order is ready to submit. |
| Select Complete transaction once. | Order total 0 | One successful order is confirmed. |
| Open the issued ticket from the confirmation. | New order | Exactly one ticket was issued for A at the selected seat; no ticket for B was issued. |

**Postconditions:**

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.

#### TC-12 — Public best-available seating — switch ON

**Qase case:** [SPT-5237](https://app.qase.io/case/SPT-5237) — Core - Inventory (suite 625). Updated and read back on 2026-09-21: switch ON is a prerequisite; all 9 steps, title, description, preconditions and postconditions match. The user’s SeatHost-only parameters, suite and tags are preserved. No execution result recorded.

> **Qase regression references (note only)**
>
> **Reusable best-available baselines:** [Single ticket type (SPT-2926)](https://app.qase.io/case/SPT-2926), [multiple ticket types (SPT-2927)](https://app.qase.io/case/SPT-2927), [exclude unavailable seats (SPT-2935)](https://app.qase.io/case/SPT-2935) and [excess quantity (SPT-2934)](https://app.qase.io/case/SPT-2934). **Gap:** forced ticket-type exclusion while actual seat inventory remains. Run only source-supported platform paths.

**Title:** Core - Assigned Seating - Exclude publicly sold-out ticket types from best-available seating

**Description:** Best-available seating suggests seats after the customer chooses a ticket type and quantity. Buy available type A; publicly sold-out type B must not enter the cart.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| React Native Public | Mobile |

| SeatHost | Where the customer starts |
| --- | --- |
| PublicPage | Open the public event page and open seat selection. |
| EventWidget | Open the website containing the event widget and open its seat selection. |
| MobileApp | In the Showpass customer app, open Explore → the event and open seat selection. |

**Parameters:**

SeatHost: PublicPage, EventWidget, MobileApp

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Organizer permission: Manage Events. Use a separate customer session with an empty cart.
* Organization flag enable_best_assigned_seating is ON.
* Published future seated event: public, on-sale types A and B each have at least 2 remaining and 2 unsold, unreserved eligible seats. Record type names and event/date.
* In Manage Events → Edit → Ticket Types → General, leave A unchecked and check Show as sold out publicly for B. Select Next → Save Event and reopen to verify; record original values. Use the actual date’s types if recurring.
* Both types are free; no paid extras, password, waitlist or event-wide capacity block. Use customer-owned details and the page/app listed in SeatHost.

**Tags:** public, assigned-seating, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event’s seat selection from the chosen starting point listed above. | SeatHost; prepared event/date | The map offers ticket-type and quantity selection for suggested seats. |
| Find ticket type B in the ticket-selection controls and try to request one ticket if a control is offered. | B’s actual name; quantity 1 | B cannot be selected for a best-available purchase or added to the cart, despite having inventory. |
| Check the cart. | Ticket type B | No B ticket or seat has entered the cart. |
| Request one ticket for A using the ticket-type and quantity controls. | A’s actual name; quantity 1 | An eligible available seat is suggested. |
| Select Select seats to accept the suggested seat. | Record its section, row and seat number | One A ticket for the suggested seat enters the cart. |
| Continue to checkout. | One A ticket | The summary shows the correct event, date/time, ticket type A and accepted seat. |
| Enter the required customer details and accept the displayed terms. | Customer-owned contact details | The free order is ready to submit. |
| Select Complete transaction once. | Order total 0 | One successful order is confirmed. |
| Open the issued ticket from the confirmation. | New order | Exactly one ticket was issued for A at the accepted seat; no ticket for B was issued. |

**Postconditions:**

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.

#### TC-13 — In-person sale with actual inventory

**Qase case:** [SPT-5305](https://app.qase.io/case/SPT-5305) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 10 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **Reusable staff baselines:** [Single-day sale (SPT-4066)](https://app.qase.io/case/SPT-4066) and [recurring sale (SPT-4069)](https://app.qase.io/case/SPT-4069) include Web Box Office and Electron. Neither sets the public-sellout value explicitly.
> **Separate attraction entry, partial:** [Staff attraction calendar (SPT-1077)](https://app.qase.io/case/SPT-1077) stops at basket addition; it does not replace a completed sale from that entry.

**Title:** Box Office - Tickets - Sell an available ticket despite its public-sellout setting

**Description:** Complete an in-person cash sale of a publicly sold-out ticket with inventory remaining. Verify one transaction, one ticket and the inventory reduction.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

| InPersonEventEntry | In-person sales entry |
| --- | --- |
| SingleDay | Box Office → Sell → single-day event. |
| RecurringDate | Box Office → Sell → recurring event → prepared date/time. |
| AttractionCalendar | Box Office → attraction → enabled ticket calendar section → prepared date/time. |

**Parameters:**

InPersonEventEntry: SingleDay, RecurringDate, AttractionCalendar

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Use Box Office, Cash Box Office Sales, View Box Office Stats, Administer Transactions.
* Published future event: public, on-sale ticket priced above 0, Public sold out = Yes, at least 2 remaining. No password, package, assigned seat or event-wide capacity block.
* Use InPersonEventEntry; attraction calendar must already be enabled. Record event/date, ticket name and remaining count for the selected date.
* An organizer with Manage Events checks Show as sold out publicly in Manage Events → event → Edit → Ticket Types → General → Next → Save Event; reopen to verify. Record the original checkbox.
* Start with an empty in-person sales cart and a test-owned customer/cash sale.

**Tags:** box-office, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Box Office or the Showpass desktop app and follow the selected InPersonEventEntry path. | Selected event/type | The type can be selected despite its saved public-sellout setting. |
| Add one ticket. | Quantity 1 | The in-person sales cart contains one ticket. |
| Select Continue to open checkout. | — | The sale summary contains the single ticket. |
| Select Cash as the payment method. | Cash | The sale total is shown for the single ticket. |
| Complete the displayed customer and receipt fields. | Team-owned customer details | The sale is ready for completion. |
| Select Process Transaction. | Record the displayed total | A sale confirmation is shown. |
| Open Web Dashboard → Transactions and find the new transaction. | Confirmation’s transaction/order reference | One completed cash transaction matches the selected ticket and total. |
| Open the transaction’s ticket details. | Same transaction | Exactly one ticket of the selected type was issued. |
| Reopen the event in Box Office. | Same type | Actual remaining inventory is one lower than the recorded count. |
| Open a fresh public event page. | Same type | The type remains publicly sold out despite its remaining inventory. |

**Postconditions:**

* Restore the recorded checkbox through Next → Save Event and reopen to verify. Keep the cash order, transaction and ticket.

#### TC-14 — Fresh staff basket cannot sell actual zero

> **Qase regression references (note only)**
>
> **Reusable actual-zero regression:** [Sold-out ticket states (SPT-402)](https://app.qase.io/case/SPT-402) includes Web Box Office and Electron; [prevent overselling (SPT-3295)](https://app.qase.io/case/SPT-3295) adds reservation/release checks. Explicit switch and saved-value setup remain local.

**Title:** Box Office - Tickets - Keep a ticket type with zero remaining inventory unavailable

**Description:** A fresh Box Office cart cannot add a ticket with no actual inventory. An available comparison ticket can still be selected.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

| StaffEventEntry | In-person sales entry |
| --- | --- |
| SingleDay | Box Office → Sell → single-day event. |
| RecurringDate | Box Office → Sell → recurring event → prepared date/time. |
| AttractionCalendar | Box Office → attraction → enabled ticket calendar section → prepared date/time. |

**Parameters:**

StaffEventEntry: SingleDay, RecurringDate, AttractionCalendar

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Use Box Office, View Box Office Stats.
* Public, on-sale type with Public sold out = No and a positive ticket limit fully consumed by test orders. Another type in the event remains available.
* Use StaffEventEntry; attraction calendar must already be enabled. Record event/date/type. Start with a fresh cart, without a hold, group sale or existing allocation.

**Tags:** box-office, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Box Office or the Showpass desktop app and follow the selected StaffEventEntry path. | Selected event | The exhausted type shows no available inventory. |
| Attempt to add one ticket of the exhausted type using its displayed control. | Quantity 1 | No ticket of that type is added. |
| Add one ticket of the other available type. | Quantity 1 | The available type is accepted into the cart. |

**Postconditions:**

* Remove the available comparison ticket; keep existing inventory-consuming orders.

#### TC-15 — Mobile Box Office and POS — available inventory

**Qase case:** [SPT-5306](https://app.qase.io/case/SPT-5306) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 9 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **Reusable POS baseline:** [Event ticket sale (SPT-2650)](https://app.qase.io/case/SPT-2650); [Square reader purchase (SPT-2688)](https://app.qase.io/case/SPT-2688) covers a paid-card variant, not this cash method.
> **Mobile Box Office gap:** [Staff guest-information requirement (SPT-3251)](https://app.qase.io/case/SPT-3251) reaches validation/cancellation only. It does not provide a completed native Mobile Box Office ticket-sale baseline.

**Title:** Box Office - Tickets - Complete a mobile in-person sale of a publicly sold-out ticket

**Description:** Complete an in-person cash sale in Mobile Box Office or native POS. The ticket remains sellable internally despite being publicly sold out.

| Platform | View |
| --- | --- |
| MobileBoxOffice | Mobile |

| InPersonEntry | Where to start | Final submission |
| --- | --- | --- |
| MobileBoxOffice | Showpass app → organization Dashboard → Box Office → Sell → event/date → Tickets; Continue opens cart review, then Payment info. | Process order |
| NativePos | Native POS app → organization → Sell → event/date → Tickets; Continue through purchaser information to payment. | Checkout |

**Parameters:**

InPersonEntry: MobileBoxOffice, NativePos

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Use Box Office, Cash Box Office Sales, View Box Office Stats, Administer Transactions (for the Dashboard check).
* Published future public, on-sale general-admission type priced above 0, with at least 2 remaining and Public sold out = Yes. No password, package or event-wide sellout.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values.
* Use InPersonEntry with an empty cart and a test-owned customer/cash sale. Record event/date, type and starting inventory.

**Tags:** box-office, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected Mobile Box Office or POS entry point. | InPersonEntry path in Description | The event’s available ticket type can be selected. |
| Add one ticket. | Quantity 1 | The staff cart contains one ticket. |
| Continue through cart review and purchaser information. | Team-owned customer details | Payment information is shown for the same ticket. |
| Select Cash and enter the displayed total as cash received. | Exact displayed total | No additional cash is due. |
| Use the final submission button shown for InPersonEntry. | Process order or Checkout, as mapped | A successful sale confirmation is shown. |
| In Web Dashboard → Transactions, open the new transaction. | Confirmation reference | One cash transaction matches the selected ticket and total. |
| Open its ticket details. | New transaction | Exactly one ticket is issued. |
| Return to the app’s Sell screen and reopen the event. | Same type | Actual remaining inventory is one lower. |
| As the customer, open a fresh public page for the same event/date. | Same type | The type remains publicly sold out despite its remaining inventory. |

**Postconditions:**

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.

#### TC-16 — Mobile Box Office and POS — actual zero inventory

> **Qase regression references (note only)**
>
> **Partial POS match:** [Event ticket configuration rules (SPT-2700)](https://app.qase.io/case/SPT-2700) checks invalid selections, but has no explicit actual-zero ticket-type scenario. [Sold-out ticket regression (SPT-402)](https://app.qase.io/case/SPT-402) covers web/desktop surfaces only. **No direct native Mobile Box Office zero-stock case found.**

**Title:** Box Office - Tickets - Mobile in-person sales cannot sell a ticket with no inventory

**Description:** Mobile Box Office and native POS cannot add a ticket with no actual inventory. An available comparison ticket can still be selected.

| Platform | View |
| --- | --- |
| MobileBoxOffice | Mobile |

| StaffEntry | In-person sales entry |
| --- | --- |
| MobileBoxOffice | Showpass app → organization Dashboard → Box Office → Sell → event/date → Tickets. |
| NativePos | Native POS app → organization → Sell → event/date → Tickets. |

**Parameters:**

StaffEntry: MobileBoxOffice, NativePos

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Use Box Office, View Box Office Stats.
* Public, on-sale type with Public sold out = No and a positive ticket limit fully consumed by test orders. Another type in the event remains available.
* Use StaffEntry with a fresh cart, without a hold or existing allocation. Record event/date and ticket names.

**Tags:** box-office, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected native staff entry point and event. | StaffEntry; recorded event/date | The exhausted type shows no available inventory. |
| Attempt to add one exhausted ticket through its normal control. | Quantity 1 | No exhausted ticket enters the cart. |
| Add one ticket of the available control type. | Quantity 1 | The available ticket enters the cart. |

**Postconditions:**

* Remove the comparison ticket; keep existing orders.

#### TC-17 — In-person assigned-seat sale — Box Office and POS

**Qase case:** [SPT-5238](https://app.qase.io/case/SPT-5238) — Core - Inventory (suite 625). Updated and verified in Qase on 2026-09-21: global switch ON is a prerequisite, SwitchState is removed, and description, preconditions and postconditions match. All four InPersonSeatEntry values, seven steps, title, tags and suite are preserved. No execution result recorded.

> **Qase regression references (note only)**
>
> **Reusable in-person seating baselines:** [Web/Electron map purchase (SPT-4074)](https://app.qase.io/case/SPT-4074) and [Box Office best-available purchase (SPT-4075)](https://app.qase.io/case/SPT-4075); [shared-seat ownership and release (SPT-2357)](https://app.qase.io/case/SPT-2357) adds allocation regression. **Gap:** a distinct native Mobile Box Office journey and explicit saved public-sellout setup.

**Title:** Box Office - Assigned Seating - Complete an in-person cash sale of a publicly sold-out ticket

**Description:** Complete an in-person cash sale of a publicly sold-out ticket with an available seat. The issued seat must be unavailable for another sale.

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

InPersonSeatEntry: WebMap, DesktopMap, MobileBestAvailable, PosBestAvailable

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Use Box Office, Cash Box Office Sales, View Box Office Stats, Manage Transactions.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values. Set the selected type to Yes.
* An event with seating enabled in Box Office: public, on-sale type priced above 0, at least 2 tickets remaining and an unoccupied eligible seat. No password or event-wide sellout.
* MobileBestAvailable/PosBestAvailable require an organization and device with in-person best-available selection enabled. Record the suggested seat before accepting it.
* Use InPersonSeatEntry with an empty cart and a test-owned customer/cash sale. Record event/date and seat labels.

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

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.

#### TC-18 — Customer kiosk — public selection and control purchase

> **Qase regression references (note only)**
>
> **Reusable kiosk purchase baseline:** [Square ticket purchase (SPT-2688)](https://app.qase.io/case/SPT-2688). **Partial negative coverage:** [Kiosk sold-out display (SPT-2684)](https://app.qase.io/case/SPT-2684) does not attempt selection; [attraction quantity/calendar behavior (SPT-2707)](https://app.qase.io/case/SPT-2707) covers a separate kiosk entry. Keep this case’s explicit selection/control checks and the unresolved existing-cart policy.

**Title:** Core - Tickets - Kiosk selection blocks publicly sold-out tickets

**Description:** At a self-service kiosk, block a publicly sold-out ticket and buy an available comparison ticket. Start with a fresh selection.

| Platform | View |
| --- | --- |
| MobileBoxOffice | Mobile |

| KioskEvent | What to use |
| --- | --- |
| SingleDay | One public future event. |
| Recurring | One prepared future date/time of a public recurring event; use that date’s ticket types. |

**Parameters:**

KioskEvent: SingleDay, Recurring

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values. Target: Yes; comparison: No.
* Kiosk mode is configured for the organization/events, with a saved Square location and the employee’s unlock PIN. A location is required even for this free order.
* Use KioskEvent with 2 free, public, on-sale general-admission types, each with at least 2 remaining. No password, waitlist, paid extras or event-wide sellout.
* Start at Touch to start. Use customer-owned email and the selected date’s ticket types.

**Tags:** public, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| At the configured kiosk, select Touch to start. | KioskEvent | The kiosk opens event selection. |
| Select the recorded event and, for Recurring, its recorded date/time. | Recorded event/date/time | The ticket selection screen opens. |
| Attempt to select one target ticket. | Public sold out = Yes; quantity 1 | The target is sold out/unavailable and cannot be selected. |
| Check the target quantity. | Target ticket type | No target ticket is selected. |
| Select one control ticket and continue. | Public sold out = No; quantity 1 | The cart overview contains one control ticket. |
| Choose Email delivery and enter the customer-owned address. | Recorded email | The delivery address is accepted. |
| Continue through the displayed checkout for the zero-total order. | One free control ticket | The kiosk shows its successful purchase confirmation. |
| Open the delivered ticket using the customer-owned email. | New confirmation | One control ticket is delivered and no target ticket is issued. |

**Postconditions:**

* The configuration owner exits kiosk mode with the unlock PIN. Clear unfinished selections, restore ticket values and keep the completed order.

#### TC-19 — Existing cart — resume after the ticket setting changes

**Qase case:** [SPT-5304](https://app.qase.io/case/SPT-5304) — Core - Inventory (625). Created and read back on 2026-10-01; title, description, preconditions, postconditions, tags, parameters and all 7 steps match. No manual execution.

> **Qase regression references (note only)**
>
> **Partial matches:** [Widget cart reopen/handoff (SPT-2439)](https://app.qase.io/case/SPT-2439), [cross-widget basket persistence (SPT-2435)](https://app.qase.io/case/SPT-2435) and [expired/empty cart recovery, including native app (SPT-4928)](https://app.qase.io/case/SPT-4928). None completes checkout after this ticket-setting change. TC-19 now includes the native cart-icon and legacy express-widget checkout attempts; their execution remains unverified.

**Title:** Core - Checkout - Reject an existing cart after its ticket type is marked publicly sold out

**Description:** Add a ticket to the cart, then mark it publicly sold out. Resuming checkout must fail without issuing an order.

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

ResumeEntry: OpenWebCheckout, WidgetCart, MobileAppCart, ExpressWidget

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Free public, on-sale ticket type with at least 2 remaining and Public sold out = No. No hold, waitlist, package, password or paid extras.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values. An employee with Administer Transactions checks the resulting transaction state.
* Use ResumeEntry with an empty cart and customer-owned email. Keep the cart unexpired during the setting change.

**Tags:** public, checkout, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public event purchase flow in the chosen host/app and select one ticket. | ResumeEntry; quantity 1 | One ticket enters the customer cart. |
| As the administrator, open Admin → Tickets → Ticket types and find the selected event/type. | Recorded event/type | Public sold out is No. |
| Save Public sold out as Yes. | Yes | Reopening the record shows Yes. |
| As the customer, use the ResumeEntry path in the Description. | Existing unexpired cart | Checkout resumes for the selected cart, or shows the sold-out rejection. |
| Complete the displayed customer details and terms if checkout remains available. | Customer-owned details | The forced ticket cannot complete purchase. |
| Attempt final order submission using the mapped button if it is available. | Existing selection | No successful order confirms. |
| As the employee, search Web Dashboard → Transactions for the customer email and attempt time. | Recorded email/time | No completed purchase exists for the attempt. |

**Postconditions:**

* Clear rejected selections and restore the ticket value; reopen to verify. Record where checkout was blocked and confirm no completed transaction exists.

#### TC-20 — Checkout link — automatic ticket selection

**Qase case:** [SPT-5283](https://app.qase.io/case/SPT-5283) — Core - Inventory (625). Created on 2026-09-22; browser mixed-link purchase and the paid abandoned-cart push scenario pushed and verified on 2026-09-23. No manual execution.

> **Qase regression references (note only)**
>
> **Closest regression match:** [Checkout-link unavailable items (SPT-4802)](https://app.qase.io/case/SPT-4802) covers empty/existing carts and all/partially unavailable extras. [Create checkout link (SPT-4241)](https://app.qase.io/case/SPT-4241) supplies related setup. **Gaps:** explicit switch-ON setup and completed purchase. The app entry is an abandoned-cart push sent after a recovery email; the email link opened in a phone browser is a web entry.

**Title:** Core - Checkout - A checkout link cannot bypass an active public sellout

**Description:** Open a checkout link that requests a publicly sold-out ticket. In a browser, use an ordinary link; in the Showpass app, tap the abandoned-cart push sent after a recovery email. The sold-out ticket must stay out of checkout while an available ticket remains purchasable.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| Entry scenario | Cart before opening the link | Tickets requested by the link | Expected cart |
| --- | --- | --- | --- |
| Browser mixed link | Empty. | 1 publicly sold-out free ticket and 1 different available free ticket from the same organization. | The available ticket from the link only. |
| Browser sold-out only | Empty. | 1 publicly sold-out free ticket. | Empty; no order can be placed. |
| Browser existing ticket | 1 different available free ticket from the same organization. | 1 publicly sold-out free ticket. | The existing available ticket only. |
| App abandoned-cart push | No other active cart after the original paid cart expires. | The recovery link requests 1 publicly sold-out paid ticket and 1 different available paid ticket from the same organization. | The available ticket from the recovery link only. |

**Parameters:**

EntryScenario: Browser mixed link, Browser sold-out only, Browser existing ticket, App abandoned-cart push

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* An employee with Administer Transactions can check whether an order was created.
* An administrator can save Public sold out in Admin → Tickets → Ticket types; record original target and comparison values.
* Use two public, on-sale general-admission ticket types from the same organization, each with at least 2 remaining. No waitlist, package, assigned seat, password or hold allocation.
* For a Browser scenario, use free tickets. Save target Public sold out = Yes and comparison = No. Record an ordinary checkout link that requests exactly the tickets in the selected row; prepare the cart as shown.
* For App abandoned-cart push, use paid tickets for an event that starts more than 5 hours after the cart expires; keep ticket sales open through push arrival. The organization allows abandoned-cart emails; the signed-in customer accepts these emails, has the Showpass app on a push-enabled device and uses the same account and email for the cart.
* For App abandoned-cart push, start with Public sold out = No on both tickets. In the app, add 1 of each to the cart, leave without purchasing and let the cart expire. Wait for the recovery email and its push notification. After the push arrives, save target Public sold out = Yes while the comparison remains No; do not open the push yet.
* Record ticket names, customer-owned contact details and original inventory. For the paid app order, use an approved customer-owned payment method and record the displayed amount.

**Tags:** public, tracking-links, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the recorded browser link, or tap the abandoned-cart push in the Showpass app. | Selected Entry scenario | The checkout link opens in the selected browser or app and attempts to add its requested tickets. |
| Inspect the cart and any unavailable-ticket notice. | Recorded ticket names | The publicly sold-out ticket is absent, its failure is visible, and the cart matches the selected Entry scenario row. |
| For Browser scenarios, reopen the same link once. | Same customer session; skip for App abandoned-cart push | The cart still matches the selected Entry scenario row; any available ticket is not duplicated. |
| Continue to checkout if the cart contains an available ticket. | Browser mixed link, Browser existing ticket or App abandoned-cart push | The summary contains exactly one available ticket and no sold-out ticket. |
| Enter customer details, accept the displayed terms and choose payment when required. | Customer-owned details; approved payment method for App abandoned-cart push | The order can be submitted for only the available ticket and its displayed total. |
| Select Complete transaction once when checkout is available. | Available ticket only | One order confirms with no sold-out ticket or duplicate ticket. |
| Open the issued tickets and find the order in Dashboard → Transactions; for Browser sold-out only, check that no order exists. | Selected Entry scenario; customer email and attempt time | The successful order has exactly one available ticket and, for the paid app order, one charge for the displayed total; no completed order exists for the empty-cart run. |

**Postconditions:**

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.

#### TC-21 — Checkout ticket add-on and upgrade offers

> **Qase regression references (note only)**
>
> **Corresponding scenarios:** [Ticket add-on purchase (SPT-3096)](https://app.qase.io/case/SPT-3096) and [ticket upgrade (SPT-3743)](https://app.qase.io/case/SPT-3743). Both need refinement: add-on step/results are shifted; upgrade is only a two-row replacement outline. Forced-target rejection and preservation of the original item remain local additions.

**Title:** Core - Checkout - Ticket offers cannot add a publicly sold-out type when the switch is ON

**Description:** A ticket add-on or upgrade cannot add a publicly sold-out ticket or replace the available base ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |
| React Native Public | Mobile |

| TicketOffer | What to use |
| --- | --- |
| AddOn | An existing offer adds another ticket alongside the base ticket. |
| Upgrade | An existing ticket-to-ticket upgrade replaces the base ticket. Neither ticket uses assigned seating. |

**Parameters:**

TicketOffer: AddOn, Upgrade

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values. Target: Yes; base: No.
* Free public, on-sale general-admission base ticket with at least 2 remaining and a target with actual stock. No paid extras, password, waitlist, package or event-wide sellout.
* Use an existing TicketOffer configuration. Record base/target event names and the displayed offer button; upgrade buttons may use custom wording.
* Start with an empty cart on public web, its event widget or in the Showpass app. Use customer-owned contact details.

**Tags:** public, checkout, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected public purchase flow and add one base ticket. | Quantity 1; base type | One base ticket enters the cart. |
| Continue to the configured ticket offer. | TicketOffer | The customer reaches the add-on or upgrade offer area. |
| Attempt to select the target using its offer action if shown. | Recorded target offer | The target is unavailable or the attempted change is rejected. |
| Inspect the resulting cart. | TicketOffer | The original base ticket remains; no target ticket is added or substituted. |
| Continue to the order summary. | Current cart | The summary preserves the expected types and quantities without duplicates. |
| Enter the required customer details and accept the displayed terms. | Current accepted selection | The zero-total order is ready to submit. |
| Select Complete transaction. | Current cart | One order completes. |
| Open the issued tickets. | Selected TicketOffer | Only the original base ticket is issued, with no duplicates. |

**Postconditions:**

* Clear unpurchased items and restore the recorded ticket checkbox values; reopen to verify. Keep completed orders and their sold inventory.
* Record a wrongly enabled offer separately from checkout rejection.

#### TC-22 — Staff checkout of an existing hold or group sale

**Qase case:** [SPT-5284](https://app.qase.io/case/SPT-5284) — Core - Inventory (625). Created and verified on 2026-09-22; no manual execution.

> **Qase regression references (note only)**
>
> **Closest existing-hold match:** [Held basket checkout integrity (SPT-1255)](https://app.qase.io/case/SPT-1255); [regular hold checkout (SPT-1249)](https://app.qase.io/case/SPT-1249) also completes staff checkout.
> **Related group-sale baselines:** [General-admission group sale (SPT-1291)](https://app.qase.io/case/SPT-1291) and [assigned-seat group sale (SPT-1307)](https://app.qase.io/case/SPT-1307) create a new group sale. They do not prove checkout of an existing group allocation. Explicit switch/saved-value setup remains local.

**Title:** Box Office - Holds - Complete an allocated hold sale while public sellout is enabled

**Description:** Sell a previously reserved ticket from Box Office → Holds. Marking it publicly sold out must not block the existing allocation.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

| HeldSale | What to use |
| --- | --- |
| BasicHold | An employee-owned basic hold reserving 1 ticket. |
| GroupSale | An employee-owned hold labelled Group sale, reserving 1 ticket for a customer group. |

**Parameters:**

HeldSale: BasicHold, GroupSale

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Use Box Office, Cash Box Office Sales, Manage Holds, Manage Transactions. Manage All Holds is needed only for another employee’s hold.
* Box Office → Holds: an unexpired test-owned HeldSale reserves exactly 1 general-admission ticket before public sellout is enabled. Record hold, ticket and event/date.
* On-sale type priced above 0, with at least 1 additional actual ticket available; no password or event-wide capacity block.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values. Set the reserved type to Yes, preserving its allocation.
* Use a test-owned customer/cash sale. Start outside any other in-person checkout.

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

* Restore and verify the ticket checkbox. Keep the completed hold, transaction and ticket; do not recreate the consumed allocation.

#### TC-23 — Existing allocated hold link

**Qase case:** [SPT-5285](https://app.qase.io/case/SPT-5285) — Core - Inventory (625). Created and verified on 2026-09-22; no manual execution.

> **Qase regression references (note only)**
>
> **Related allocated-hold cases:** [Regular hold checkout (SPT-1249)](https://app.qase.io/case/SPT-1249), [branded hold link (SPT-1253)](https://app.qase.io/case/SPT-1253) and [complimentary basic hold purchase (SPT-5104)](https://app.qase.io/case/SPT-5104). Regular hold coverage emphasizes staff checkout; branded coverage stops at checkout; the complimentary case is a separate payment variant. None explicitly covers this public-sellout exception.

**Title:** Public Checkout - Holds - Purchase allocated tickets while public sellout is enabled

**Description:** Buy a ticket through its existing hold link while ordinary public selection is blocked. A hold reserves tickets for a customer before purchase.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| HoldLink | What to use |
| --- | --- |
| Basic | The basic hold’s customer purchase link. |
| Branded | The branded hold’s customer purchase link, with 1 ticket still allocated. |

**Parameters:**

HoldLink: Basic, Branded

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Preparation permissions: Manage Events, Use Box Office, Manage Holds.
* Employee-owned, unexpired hold for a published future event: 1 free public ticket reserved before enabling public sellout. Record the hold/type and HoldLink from Box Office → Holds.
* At least 1 additional ticket remains. Event/type is on sale, without password, paid extras or assigned seating. Use test-owned allocation and customer details.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values. Set the reserved type to Yes, preserving its allocation.

**Tags:** public, holds, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ordinary public event page without using the hold link. | Same ticket type | Normal public selection shows sold out and cannot add the ticket. |
| Open the recorded hold purchase link. | Selected HoldLink | The reserved ticket allocation is offered to the customer. |
| Continue with one ticket from that allocation. | Quantity 1 | Checkout includes the held ticket without a public-sellout rejection. |
| Enter the required customer information. | Customer-owned details | The checkout allows the customer to continue. |
| Accept the displayed terms. | — | The order can be submitted. |
| Select Complete transaction. | Allocated zero-total ticket | One order confirmation is shown. |
| Open the tickets from the confirmation. | New order | Exactly one allocated ticket is accessible. |

**Postconditions:**

* Restore and verify the ticket checkbox. Keep the hold and order; do not reopen the consumed allocation.

### Preset package acceptance — global switch ON

#### TC-24 — Preset packages — parent restriction and included-ticket access

**Qase case:** [SPT-5263](https://app.qase.io/case/SPT-5263) — Core - Inventory (suite 625). Synced the user-edited case and added the PackageShape explanation table on 2026-09-21. The `SingleEvent` and `MultipleEvents` descriptions below now use recorded included-ticket counts; this local clarification from the 2026-09-22 client review has not been pushed to Qase. No execution result recorded.

> **Qase regression references (note only):** [Preset purchase (SPT-429)](https://app.qase.io/case/SPT-429), [calendar package purchase (SPT-3860)](https://app.qase.io/case/SPT-3860), and [child-capacity limits (SPT-4832)](https://app.qase.io/case/SPT-4832) remain related baselines. TC-24 is the ON-only acceptance case linked above.

**Title:** Core - Packages - Buy a preset package with publicly sold-out included tickets after reopening its parent

**Description:** A preset package supplies fixed included tickets. A customer cannot add the package while its own public-sellout checkbox is checked. Clearing only the package checkbox allows purchase even while the included tickets remain publicly sold out. Quantities and included event dates must match the configured package.

Global switch (`enable_force_public_sold_out`): ON throughout.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |
| Widget | Desktop |
| Widget | Mobile |

**What PackageShape means**

PackageShape describes what tickets the preset package contains. It is a test parameter, not a field to find in Showpass. Use the row matching the package you are testing.

The **parent** is the package ticket the customer buys. **Children** are the tickets included in it. **Leaf tickets** are the final event tickets inside a nested package.

| PackageShape | Package to use | Expected contents when buying 3 packages |
| --- | --- | --- |
| SingleEvent | One preset package includes fixed tickets for the same event. Record every included ticket type and quantity; the package may include more than one type. | 3 times each recorded included-ticket quantity for that event. |
| MultipleEvents | One preset package includes fixed tickets for more than one event or date. Record every included ticket type, event/date and quantity. | 3 times each recorded included-ticket quantity for the correct events/dates. |
| NestedPreset | One outer package includes 1 inner preset package, which includes 2 final event tickets. | 3 inner packages containing 6 final event tickets total. |
| ReverseRatio | The package is configured so 2 purchased parent tickets provide 1 included ticket. | 2 included tickets: 3 parent tickets require 1.5 included tickets, rounded up to 2. |

**Parameters:**

PackageShape: SingleEvent, MultipleEvents, NestedPreset, ReverseRatio

**Preconditions:**

* Global enable\_force\_public\_sold\_out is ON. Record original ticket checkbox values and any global setting changed for preparation; keep the global switch ON during execution.
* SingleEvent: one preset package includes fixed tickets for the same event; record each included ticket type and count. MultipleEvents: one preset package includes fixed tickets for more than one event/date; record each included type, event/date and count. For either value, ensure actual stock can support 3 purchases. NestedPreset: one outer package includes 1 inner preset package that includes 2 leaf tickets; the organization has enable\_multi\_layer\_packages enabled. ReverseRatio: an existing supported 2-parent-to-1-child package, without assigned seating or child revenue allocation; use\_reverse\_ratio\_packages is enabled for the organization. For NestedPreset, the inner package and leaf ticket remain checked when the outer package is cleared.
* Use a published, on-sale package with actual stock for 3 purchases, an empty customer cart, and a zero-total order including fees and shipping. Check Show as sold out publicly on its selling ticket and included ticket types; record their original values.

**Tags:** public, packages, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected purchase entry and attempt to add the package. | Quantity 1; parent and included tickets checked | The parent is publicly unavailable and no package or included ticket enters the cart. |
| As the organizer, open Manage Events → the package event → Edit → Ticket Types → edit the package ticket → General. | Parent only | Show as sold out publicly is checked. |
| Uncheck Show as sold out publicly. | Leave all included ticket checkboxes checked | The parent checkbox is unchecked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| As the customer, reopen the same purchase entry and add one package. | Parent unchecked; included types still checked | One package with its configured contents enters the cart. |
| Increase the package quantity to 3. | Quantity 3 | Included ticket types and counts match the selected PackageShape row above. |
| Review the event/date and package contents at checkout. | Recorded included events and quantities | The summary retains the selected dates and quantities without duplicate or standalone child lines. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The order summary is ready for the zero-total purchase. |
| Select Complete transaction once. | Recorded package contents | One successful order confirmation is shown. |
| Open the order and its issued tickets. | New order; recorded barcode mode | The configured package contents are present; parent-only, child or all-item barcodes follow the existing package setting. |
| As the organizer, reopen Box Office inventory for the included types. | Counts recorded before selection | The included ticket quantities are consumed once; the child public-sellout settings have not cleared. |
| Open an included ticket’s direct public event page and attempt to select that ticket separately. | Included type still checked; real inventory remains | It remains unavailable as a standalone public purchase even though it was just included in the package. |

**Postconditions:**

* Restore the recorded ticket checkbox values and clear unpurchased cart items. Keep the completed order and its sold inventory.

### Waitlist and refund behavior — global switch ON

#### TC-25 — Existing waitlist entry

> **Qase regression references (note only)**
>
> **Reusable waitlist baselines:** [Single-day signup (SPT-2880)](https://app.qase.io/case/SPT-2880), [public-calendar signup (SPT-3514)](https://app.qase.io/case/SPT-3514) and [widget-to-web signup (SPT-3520)](https://app.qase.io/case/SPT-3520). Keep the ON prerequisite and forced-sold-out setup here; later automatic fulfillment is not covered by these signup cases.

**Title:** Public Checkout - Waitlists - Keep waitlist registration available for a publicly sold-out ticket type

**Description:** Join the waitlist for a publicly sold-out ticket that still has inventory. Joining records interest in a later release; it must not issue a ticket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Signed-in customer-owned account with no pending waitlist entry for this ticket type. Its existing waitlist requires no card at signup; do not release or process inventory.
* Published future event: public, on-sale type with an active waitlist, at least 1 ticket remaining and Public sold out = Yes.
* An administrator saves Public sold out in Admin → Tickets → Ticket types → matching event/type. Record original values. Use the ordinary public event page, without a hold link.

**Tags:** public, waitlists, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public event page. | Selected type | The type offers the existing waitlist action instead of normal purchase. |
| Select the waitlist action for that type. | Selected type | The waitlist registration flow opens for that type. |
| Select one waitlist place and continue to registration. | Quantity 1 | The registration shows the correct event/date and ticket type. |
| Enter the required details and submit the waitlist signup. | Customer-owned details; no card required | One waitlist signup confirmation is shown. |
| Open the customer account → Waitlists and find this event. | Same account/type | Exactly one pending entry exists; signup has not created a paid ticket order. |

**Postconditions:**

* Account → Waitlists → the new entry → Leave waitlist → Leave. Verify that entry is no longer pending; restore the ticket checkbox.

#### TC-26 — Refund an internal sale without reopening public sales or changing the refund amount

**Qase case:** [SPT-5286](https://app.qase.io/case/SPT-5286) — Core - Inventory (625). Created and verified on 2026-09-22; no manual execution.

> **Qase regression references (note only):** [Full invoice refund (SPT-946)](https://app.qase.io/case/SPT-946) and [Selected-item refund (SPT-4763)](https://app.qase.io/case/SPT-4763) are related baselines; the amount comparison and explicit public reopening are required here.

**Title:** Dashboard - Tickets - Refund inventory stays publicly sold out until the ticket setting is cleared

**Description:** Refund an internal sale after marking its ticket publicly sold out. The refund amount stays unchanged; returned inventory reopens only when the ticket checkbox is cleared.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Manage Events, Administer Transactions, Administer Cash Refunds, Full Refund, Use Box Office, View Box Office Stats.
* Published future event: 1 public, on-sale general-admission type, Inventory 1, consumed by 1 test-owned internal cash sale. No actual customer cash is owed.
* Ticket is unscanned and not transferred, refunded or exchanged. No other holds/orders, packages, resale, protection or event-wide capacity restriction.
* Record order, ticket, amount and checkbox; start unchecked. Keep price, fees, tax, refund option and order contents unchanged.

**Tags:** dashboard, tickets, refunds

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions → the recorded sale → Refund. | One internal sale | The refund form shows the original ticket. |
| Select Base refund and record the displayed refund amount and breakdown. | Refund All selected | The amount is recorded before changing the ticket setting. |
| Select Close without submitting. | — | No refund has been processed. |
| As the organizer, open Manage Events → event → Edit → Ticket Types → edit the recorded type → General. | Same event/type | Show as sold out publicly is unchecked. |
| Check Show as sold out publicly. | Same ticket type | The checkbox is checked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| Reopen the same transaction’s Refund form and select Base refund. | Same order, item selection and refund option | The refund amount and displayed breakdown equal the earlier preview. |
| Enter the required Reason and submit the refund form. | Inventory-return check for the owned internal sale | The cash-refund confirmation shows the unchanged amount. |
| Select Agree & Process Refund once. | Recorded internal cash sale | The refund completes for the previewed amount. |
| Reopen the transaction and its ticket details. | Original ticket | The refund is recorded once and the original ticket is no longer active. |
| Open Box Office → Sell and select the event. | Same type | Actual remaining inventory returns from 0 to 1 after processing completes. |
| As the customer, open a fresh public event page. | Returned ticket type | The type remains sold out despite the returned inventory. |
| As the organizer, reopen Manage Events → event → Edit → Ticket Types → edit the recorded type → General. | Same type | Show as sold out publicly is still checked; the refund did not clear it. |
| Uncheck Show as sold out publicly. | Same type | The checkbox is unchecked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| As the customer, reopen the public event page and add one returned ticket. | Quantity 1 | The returned type can enter the cart. |

**Postconditions:**

* Clear the cart and restore the ticket checkbox; reopen to verify. Keep the original sale and refund record; do not reverse the refund.

### Retired switch-transition case — do not execute

#### TC-27 — Switch-on/off/on smoke with a stored true setting

**Status: Retired from the execution set on 2026-09-21.** The user confirmed that OFF testing belongs in TC-01 / SPT-402 and every feature case must keep the global switch ON. This former ON → OFF → ON smoke is no longer an executable case. Its number and heading remain for existing references; do not copy it to Qase or run it.

Use TC-01 / SPT-402 for OFF regression and TC-02 for ON public-sellout behavior. No switching during a feature case is required.

### Additional inventory-return regressions — global switch ON

#### TC-28 — Release a hold without reopening public sales

**Qase case:** [SPT-5287](https://app.qase.io/case/SPT-5287) — Core - Inventory (625). Created and verified on 2026-09-22; no manual execution.

> **Qase regression references (note only):** [Held basket checkout (SPT-1255)](https://app.qase.io/case/SPT-1255) is related allocated-access coverage; this release-to-public-availability sequence is a separate case.

**Title:** Box Office - Holds - Released inventory remains publicly sold out until the ticket setting is cleared

**Description:** Release the hold reserving the last ticket. Returned inventory stays publicly sold out until the ticket checkbox is cleared.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Use Box Office, Manage Holds, Manage Events, View Box Office Stats.
* Published future event: 1 public, on-sale general-admission type, Inventory 1, reserved by 1 employee-owned basic hold. No sales or other reservations.
* Show as sold out publicly is checked. No waitlist, resale, package, password or event-wide limit.
* Record original checkbox, hold/customer, event/type and link. Use a test-owned allocation; releasing it makes its purchase link unusable.

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

* Clear the cart and restore the ticket checkbox. Keep the released hold’s history; do not recreate its allocation.

#### TC-29 — Increase inventory without accidentally reopening public sales

**Qase case:** [SPT-5288](https://app.qase.io/case/SPT-5288) — Core - Inventory (625). Created and verified on 2026-09-22; no manual execution.

> **Qase regression references (note only):** [Increase inventory and restore availability (SPT-766)](https://app.qase.io/case/SPT-766) is the OFF/unforced baseline. The ON + checked outcome here must stay closed until the checkbox is cleared.

**Title:** Dashboard - Tickets - Extra inventory remains publicly sold out until the ticket setting is cleared

**Description:** Increase a sold-out ticket type’s inventory. Public sales stay closed until Show as sold out publicly is cleared.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Manage Events, Use Box Office, View Box Office Stats.
* Published future event: 1 public, on-sale general-admission type, Inventory 1, consumed by exactly 1 test-owned sale. No tickets remain; Show as sold out publicly is checked.
* Record original values and sale. No other reservations, waitlist, resale, package, password or event-wide limit; pause concurrent sales while comparing counts.

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

* Clear the cart. Restore Inventory to 1 only if no new sale or reservation consumed the added capacity. Restore and verify the checkbox; keep the original sale.

#### TC-30 — Exchange an internal sale while keeping the returned type publicly sold out

**Qase case:** [SPT-5289](https://app.qase.io/case/SPT-5289) — Core - Inventory (625). Created and verified on 2026-09-22; no manual execution.

> **Qase regression references (note only):** [Exchange price/quantity scenarios (SPT-1275)](https://app.qase.io/case/SPT-1275) and [Same-value cash exchange (SPT-4823)](https://app.qase.io/case/SPT-4823) are related baselines. This case adds retained public sellout and a same-order credit comparison.

**Title:** Box Office - Exchanges - Exchanged inventory stays publicly sold out without changing the exchange credit

**Description:** Exchange an internal sale without changing its exchange credit. Returned inventory stays publicly sold out until the original ticket’s checkbox is cleared.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Global waffle switch enable_force_public_sold_out is ON throughout.
* Employee permissions: Administer Transactions, Use Box Office, Manage Events, View Box Office Stats.
* Organization allows in-person exchanges. Use whole-order exchange with enable_itemized_exchanges_on_all_item_types OFF; record its original value.
* Test-owned internal cash sale for exactly 1 ticket: original type has Inventory 1, 0 remaining and checkbox unchecked. Ticket is unscanned, not transferred/refunded/exchanged, and within the allowed exchange dates.
* Replacement: another on-sale type in the same organization, with inventory and checkbox unchecked. Its checkout total exactly matches the exchange credit. Record both amounts; no extra payment or leftover credit.
* Both types are public general admission, without package, resale, waitlist, protection, shipping or event-wide capacity restrictions. Use test-owned orders/customer details.

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

* Clear the cart; restore the ticket checkbox and exchange-flow flag. Keep both orders and credit history; do not reverse the exchange or reactivate the original ticket.

### Additional package coverage — global switch ON

These cases use the global switch ON throughout. The organizer can check or clear the visible ticket-type checkbox in this state; an unchecked package parent is needed to prove the included-ticket exception. A product has no ticket-type public-sellout checkbox.

#### TC-31 — Custom packages — required choices and publicly sold-out included tickets

**Qase case:** [SPT-5264](https://app.qase.io/case/SPT-5264) — Core - Inventory (625). Wording cleanup applied and verified on 2026-09-21. Steps, parameters, title, platforms and tags preserved; no test execution recorded.

> **Qase regression references (note only):** [Custom package purchase (SPT-3334)](https://app.qase.io/case/SPT-3334) is a related baseline from the earlier scan. This case adds the parent/child switch-ON rule, required choice and replacement proof.

**Title:** Public Checkout - Packages - Complete custom ticket choices without treating included public sellout as exhausted inventory

**Description:** Reopen a custom package while its included tickets remain publicly sold out. A required choice must be selected, and changing A to B must issue only B.

Parent = package ticket. Children = included tickets.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:**

* Organizer permission: Manage Events. Use a separate customer session with an empty cart.
* Global waffle switch enable_force_public_sold_out is ON throughout.
* Published, on-sale free custom package: choose exactly 1 general-admission ticket from A or B, each with at least 3 remaining. No seats/products, paid extras, hold, waitlist, password or event-wide capacity block.
* Record original settings; save Show as sold out publicly checked on the package, A and B. Record their names, dates, barcode setting and direct public pages.
* Start on the public event page or Showpass → Explore → event. Use customer-owned contact details.

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

* Clear unpurchased items and restore ticket checkbox values. Keep completed orders and their sold inventory.

#### TC-32 — Assigned-seat packages — included public sellout and seat ownership

**Qase case:** [SPT-5265](https://app.qase.io/case/SPT-5265) — Core - Inventory (625). Updated and verified on 2026-09-22 with the last eligible seat check; both SeatingPackage values and 14 steps remain. No manual test executed.

> **Qase regression references (note only):** [Assigned seating purchase (SPT-217)](https://app.qase.io/case/SPT-217) and [shared-seat ownership (SPT-2357)](https://app.qase.io/case/SPT-2357) are related coverage, not an exact package-override match.

**Title:** Public Checkout - Packages - Preserve assigned seats when included tickets are publicly sold out

**Description:** Buy a seated package after clearing its parent checkbox. Included tickets remain publicly sold out. Buy the last eligible seat, then check that another package cannot take an occupied seat or complete without an available seat.

Parent = package ticket. Children = included tickets.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

| SeatingPackage | Package/setup to use |
| --- | --- |
| PresetSameSeat | A 1:1 preset package: the parent and included event use the same seating space and linked seat. |
| CustomChosenSeats | A general-admission custom package with 2 required choices, each for a seated ticket at a different event. Choose 1 seat per included event. |

**Parameters:**

SeatingPackage: PresetSameSeat, CustomChosenSeats

**Preconditions:**

* Organizer permission: Manage Events. Use a separate customer session with an empty cart.
* Global waffle switch enable_force_public_sold_out is ON throughout.
* Published, on-sale free package matching SeatingPackage, with inventory and supported seat selection on public web or the Showpass app. No paid extras, hold, waitlist, password or event-wide capacity block.
* Record original settings; save Show as sold out publicly checked on the package and included tickets.
* Record dates and barcode settings. On each required map, prepare exactly one unoccupied eligible seat and at least one different seat occupied by a test-owned order; no other eligible seats remain. Quantity 1 must meet seating rules; use customer-owned contact details.

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
| Open a fresh public purchase session and attempt to buy another package seat. | Previously purchased seats; no other eligible seats | No eligible seat can be allocated and no second package order is created. |

**Postconditions:**

* Clear unpurchased items and restore ticket checkbox values. Keep completed orders and their sold inventory.

#### TC-33 — Ticket + product packages — selection, quantities and fulfillment

**Qase case:** [SPT-5266](https://app.qase.io/case/SPT-5266) — Core - Inventory (625). Updated and verified on 2026-09-22 with clearer bundle setup and a final product-shortage check; both BundleContents values and 17 steps remain. No manual test executed.

> **Qase regression references (note only):** [Preset package purchase (SPT-429)](https://app.qase.io/case/SPT-429) supplies a related baseline. No exact ticket + product public-sellout case was established by the earlier Qase scan.

**Title:** Core - Packages - Keep ticket and product contents together when reopening a publicly sold-out bundle

**Description:** Reopen a ticket + product bundle and buy 3. Check its included items and product stock. Then leave less product stock than another bundle requires and confirm another bundle cannot be purchased.

The parent is the ticket type customers buy. An included ticket is a separate ticket type supplied by a preset package. BundleContents names these test setups; it is not a Showpass setting. Configure the ticket and product links before any sales.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| BundleContents | Package/setup to use |
| --- | --- |
| TicketAndProduct | Attach a product to a ticket type through Admin → Tickets → Sub-product relations, quantity 2. It has no included ticket. Buying 3 gives 3 selling tickets and 6 product units. |
| TicketChildrenAndProduct | Create a Preset package with 1 included ticket for another future event. Attach the same product, quantity 2, to its selling ticket type through Sub-product relations. Buying 3 gives 3 selling tickets, 3 included event tickets and 6 product units. |

**Parameters:**

BundleContents: TicketAndProduct, TicketChildrenAndProduct

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats, Administer Transactions. Use a separate customer session with an empty cart.
* Global waffle switch enable_force_public_sold_out is ON throughout.
* Published, on-sale bundle matching BundleContents, with ticket stock for at least 3 purchases. Configure its product relation before the selling ticket has any sales.
* The product has exactly 2 variants (such as sizes), each with Inventory 10, no prior sales or active reservations, and Purchase limit 6. Record these values; this case changes them only after the first purchase.
* Record original ticket settings; check Show as sold out publicly on the selling ticket and any included ticket. Products have no such checkbox.
* Use public web, its event widget or Showpass → Explore → event with product choices available. Record dates, variant names/counts in Box Office and barcode/delivery settings.
* Use test-owned records/contact details. Order total must be 0, including fees/shipping; no hold, waitlist, password or event-wide capacity block.

**Tags:** public, packages, products

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected public purchase entry and attempt to add one bundle. | Package ticket checked | Neither the bundle nor a product-only purchase is added. |
| As the organizer, open Manage Events → the package event → Edit → Ticket Types → edit the package ticket → General. | Parent only | Show as sold out publicly is checked. |
| Uncheck Show as sold out publicly. | Leave all included ticket checkboxes checked | The parent checkbox is unchecked. |
| Select Next. | — | The event form is shown. |
| Select Save Event. | — | The event saves successfully. |
| Reopen the public purchase entry and add one bundle. | Package unchecked; included child tickets remain checked | The bundle is accepted with its ticket contents and 2 product units. |
| Increase the bundle quantity to 3. | Quantity 3 | The cart contains 3 selling tickets and 6 product units; TicketChildrenAndProduct also includes 3 tickets for the other event. |
| Choose the recorded second product variant for each required product selection. | Second variant; 6 units total | The selected variant replaces the temporary/default choice without adding extra product units. |
| Continue to checkout and review the summary. | Ticket dates, selected variant, quantities and zero total | The summary shows the configured contents and chosen variant. |
| Enter the required customer details and accept the displayed terms. | Customer-owned details | The order summary is ready for the zero-total purchase. |
| Select Complete transaction once. | Recorded package contents | One successful order confirmation is shown. |
| As the organizer, open Dashboard → Transactions and find the new order. | Confirmation reference | One order records the configured ticket entitlements and 6 units of the selected product variant, with no duplicate order or product-only order. |
| Inspect the order’s ticket and product details. | Recorded barcode and redemption/delivery settings | Ticket and product fulfillment follow the package configuration; a shared barcode is not mistaken for a missing child barcode. |
| Open Box Office and compare the selected product variant’s remaining stock with the recorded count. | Completed order quantity | Exactly 6 units of the selected variant were consumed; the unused variant has no retained reservation from this purchase. |
| As the organizer, open Dashboard → Products → the recorded product → Inventory. Set the selected variant’s Inventory to 6 and the unused variant’s Inventory and Purchase Limit to 1; then save. | Selected variant: 6 sold of 6 total. Unused variant: 1 available, while each bundle requires 2. | Neither variant can supply the 2 product units another bundle requires; the completed order still contains its 6 product units. |
| In a fresh customer session, open the same bundle and attempt to buy one more. Complete any checkout steps offered. | Selling ticket unchecked; included ticket checked if present | The product shortage prevents another complete bundle purchase; no new package ticket or product is issued. |
| Reopen Dashboard → Transactions for the same customer and compare with the first confirmation. | First completed order reference | Only the first order exists; no second or product-only order was created. |

**Postconditions:**

* Clear unpurchased items. Restore the product variants’ recorded Inventory and Purchase limit values and the ticket checkbox values. Keep the completed order and its sold inventory.

#### TC-34 — Existing package cart — parent becomes publicly sold out

**Qase case:** [SPT-5267](https://app.qase.io/case/SPT-5267) — Core - Inventory (625). Wording cleanup applied and verified on 2026-09-21. Steps, parameters, title, platforms and tags preserved; no test execution recorded.

> **Qase regression references (note only):** [Existing-cart recovery (SPT-4928)](https://app.qase.io/case/SPT-4928) cover related cart recovery. This is a separate local package final-purchase check; no exact Qase match is claimed.

**Title:** Public Checkout - Packages - Reject a package at checkout when its parent becomes publicly sold out

**Description:** Mark a package publicly sold out after the customer adds it to the cart. Final checkout must fail without issuing any part of the package.

Parent = package ticket. Children = included tickets.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

| PackageContents | Package/setup to use |
| --- | --- |
| PresetTickets | A preset package including 1 ticket for a future event; no customer choice. |
| CustomTickets | A custom package requiring 1 ticket choice; record an available choice. |
| TicketAndProduct | A package including 1 product unit; record the product option to select. |

**Parameters:**

PackageContents: PresetTickets, CustomTickets, TicketAndProduct

**Preconditions:**

* Organizer permissions: Manage Events and Administer Transactions. Use separate organizer/customer sessions.
* Global waffle switch enable_force_public_sold_out is ON throughout.
* Public, on-sale free package matching PackageContents, with stock for every item. No seats, hold, waitlist, password or paid extras.
* Record original settings; package checkbox unchecked, included ticket checkboxes checked.
* Use public web or the in-app event page. Start with an empty cart; record the test customer, expected contents and existing order count.
* Keep the cart unexpired; do not change stock, dates, products or prices.

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

* Clear the unpurchased package and verify its reservations are released. Restore ticket checkbox values.

#### TC-35 — Package contents actually unavailable — no overselling

**Qase case:** [SPT-5268](https://app.qase.io/case/SPT-5268) — Core - Inventory (625). Retired from execution; its Qase title was marked `[DELETE]` on 2026-09-22. The case still exists in Qase, with its original steps and parameters. No manual test was executed.

> **Qase regression references (note only):** [Package child-capacity constraints (SPT-4832)](https://app.qase.io/case/SPT-4832) is the related inventory baseline. Product and seat shortages require their own component setup.

> **Coverage moved:** SPT-5266 checks a product shortage after its successful ticket + product sale. SPT-5265 checks that no eligible seat remains after its successful seated package sale. SPT-4832 covers preset/custom ticket shortages. Do not run TC-35 separately.

**Title:** [DELETE] Duplicate package shortage coverage — moved to SPT-4832, SPT-5265 and SPT-5266

**Description:** Attempt to buy a package with one required ticket, product or seat unavailable. Actual shortages must still block purchase, with no partial order or oversale.

Parent = package ticket. Children = included tickets.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| React Native Public | Mobile |

| UnavailableComponent | Package/setup to use |
| --- | --- |
| PresetTicket | The preset package’s required included ticket has 0 remaining. |
| CustomRequiredChoice | The custom package requires 1 choice, but every offered ticket has 0 remaining. |
| BundledProduct | The included product has 0 stock in every eligible variant. |
| AssignedSeat | The included event has no unoccupied eligible seat for the required selection. |

**Parameters:**

UnavailableComponent: PresetTicket, CustomRequiredChoice, BundledProduct, AssignedSeat

**Preconditions:**

* Organizer permissions: Manage Events, Use Box Office, View Box Office Stats. Use a separate customer session with an empty cart.
* Global waffle switch enable_force_public_sold_out is ON throughout.
* Published, on-sale package matching UnavailableComponent. All other items have stock; no hold, waitlist or password.
* Record original settings; package checkbox unchecked, included ticket checkboxes checked.
* Use test-owned orders to exhaust positive ticket limits or occupy seats; never set the ticket limit to 0. Record orders/counts and leave package contents unchanged.
* Start on the public event page or in-app event page.

**Tags:** public, packages, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the package’s public purchase flow. | Recorded UnavailableComponent | The recorded package is located; its unavailable state or the relevant selection restriction is visible. |
| Attempt to select one package and complete its required component selection. | Quantity 1 | The unavailable component cannot be fulfilled; no complete purchasable package is accepted. |
| If the flow reaches checkout, attempt to continue with the unavailable component. | Same package | Checkout remains blocked and no successful order is created. |
| Inspect the customer cart and order history. | Execution-owned customer | There are no issued package tickets or partial product-only orders from the attempt. |
| As the organizer, recheck the exhausted component in Box Office. | Recorded counts and retained orders | No oversale occurred; existing ticket/seat ownership is unchanged. |

**Postconditions:**

* Clear unpurchased selections and restore checkbox values. Keep the orders that exhausted inventory or occupied seats.

#### TC-36 — In-person package sale — tickets and products remain sellable

**Qase case:** [SPT-5269](https://app.qase.io/case/SPT-5269) — Core - Inventory (625). Wording cleanup applied and verified on 2026-09-21. Steps, parameters, title, platforms and tags preserved; no test execution recorded.

> **Qase regression references (note only):** [Preset package purchase (SPT-429)](https://app.qase.io/case/SPT-429) and existing Box Office sale baselines are related coverage. This is a local package-specific in-person case.

**Title:** Box Office - Packages - Complete an in-person package sale despite public sellout

**Description:** Complete an in-person cash sale while the package and included tickets remain publicly sold out. Check the issued contents, inventory and continued public restriction.

Parent = package ticket. Children = included tickets.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

| PackageContents | Package/setup to use |
| --- | --- |
| PresetTickets | A preset package including 1 ticket for another future event. |
| CustomTickets | A custom package requiring 1 choice from 2 available ticket types; record the choice to buy. |
| TicketAndProduct | A package including 1 product unit with exactly 1 eligible variant; no product-option selection is needed. |

**Parameters:**

PackageContents: PresetTickets, CustomTickets, TicketAndProduct

**Preconditions:**

* Employee permissions: Use Box Office, Cash Box Office Sales, View Box Office Stats, Administer Transactions. Manage Events is needed to prepare ticket settings.
* Global waffle switch enable_force_public_sold_out is ON throughout.
* On-sale general-admission package matching PackageContents: price above 0, stock for 2 purchases, no waitlist/password/seats.
* Record original settings; check Show as sold out publicly on the package and included tickets.
* Use Web Box Office → Sell or Showpass desktop app → Box Office → Sell with an empty cart and test-owned customer/cash sale, not a hold link.
* Record event/date, contents, barcode/delivery settings, inventory and total. CustomTickets uses the package-choice dialog.

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

* Clear unpurchased items and restore ticket checkbox values. Keep completed orders and their sold inventory.

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

TC-04, TC-05, TC-09, TC-06, TC-07 and TC-08 remain ON-only feature checks. TC-27 was retired on 2026-09-21. They are not duplicates of generic Qase purchase cases. Do not create all local drafts in Qase simply because they are local: first reuse the mapped baseline and retain only the missing proof as additions or enhancements.

### Priority gaps and corrections

1. **High — explicit native Mobile Box Office ticket sale and zero-stock rejection.** The broad POS rows do not close this distinct client gap. TC-15, TC-16 remain necessary; record the actual app/mode.
2. **High — exhausted ticket-type combinations on assigned seats.** Existing cases cover occupied seats and choosing among available types, but not both sole exhausted type and mixed available/exhausted types on one unoccupied seat. Keep TC-10, TC-11 and the visible-label implementation question.
3. **High — checkout after selecting tickets earlier.** Widget reopen, Saved, native cart, website checkout and legacy express/calendar hosts need completed-order evidence from their own starting state. Existing handoff/recovery checks are partial. TC-19, TC-01, TC-02, TC-20 supply much of this work; legacy hosts still require usable setup.
4. **High — kiosk negative assertion and existing-cart policy.** SPT-2684 needs an actual failed selection attempt and unambiguous zero-remaining setup. The previously allocated kiosk cart remains a product-expectation gap; Qase's normal kiosk sale does not resolve it.
5. **High — two omissions from the local checklist found during this search:** one-click public wallet purchase, and staff sale started through the attraction calendar. Use SPT-4903 for the former; extend the SPT-1077 basket handoff through a supported staff sale for the latter. The current feature pass requires ON execution records; any additional OFF coverage is deferred outside TC-01/SPT-402. These remain accounted-for gaps, not silently covered by generic checkout.
6. **Medium — incomplete legacy case fields.** SPT-217/4074 end with a blank final expected result; SPT-3096 has misaligned action/results; SPT-3743 is a two-row upgrade outline; SPT-1253 does not complete branded purchase; SPT-5135/5138 have missing expected results. Recommend focused enhancements that preserve their existing purpose and parameters, not wholesale replacement. No enhancement was applied.

### Search evidence and source cross-check

Read-only retrieval: **1,731 unique SPT cases and 261 suites**, all pages fetched; 72 selected cases re-read by ID. The narrow API search `sold out` returned only SPT-3136 (product inventory), which is not the ticket baseline. Local full-field search for `sold.?out` found 45 cases, including SPT-402. A title-only or exact-phrase search would miss useful regression coverage.

The first broad title/suite filter found 908 candidates using purchase, checkout, Box Office, seating, attraction, recurring, kiosk, widget, holds, group sale, waitlist, add-on, upgrade, exchange, refund, inventory, mobile and POS terms. A focused title filter found 150 candidates using sold-out, event-checkout, calendar/attraction/kiosk, full-purchase, seat/best-available, link, offer, native-sale, Saved and express terms. These are **candidate counts**, not coverage counts. Full text fields—title, description, prerequisites, cleanup, steps, tags and both parameter formats—were also searched for state/client terminology. No exact `enable_force_public_sold_out`, `public_sold_out` or `force_public_sold_out` reference was found; that is a missing explicit run setup, not evidence that baseline regression is absent.

Selected detail IDs: SPT-214, SPT-217, SPT-358, SPT-388, SPT-389, SPT-402, SPT-429, SPT-766, SPT-1070, SPT-1077, SPT-1163, SPT-1249, SPT-1253, SPT-1255, SPT-1291, SPT-1307, SPT-2024, SPT-2357, SPT-2435, SPT-2439, SPT-2451, SPT-2650, SPT-2684, SPT-2688, SPT-2689, SPT-2700, SPT-2707, SPT-2880, SPT-2926, SPT-2927, SPT-2934, SPT-2935, SPT-3096, SPT-3251, SPT-3287, SPT-3288, SPT-3290, SPT-3295, SPT-3334, SPT-3349, SPT-3505, SPT-3512, SPT-3513, SPT-3514, SPT-3520, SPT-3743, SPT-3860, SPT-4003, SPT-4049, SPT-4066, SPT-4069, SPT-4074, SPT-4075, SPT-4241, SPT-4802, SPT-4832, SPT-4903, SPT-4904, SPT-4928, SPT-4979, SPT-4980, SPT-4981, SPT-4982, SPT-4983, SPT-5135, SPT-5138, SPT-5146, SPT-946, SPT-4763, SPT-1275, SPT-4823, SPT-5104.

Evidence snapshots: `/private/tmp/qase-public-soldout-regression/{metadata,targeted,case-all,suite-all,details}.json`. These are temporary review evidence; the important findings and links are retained here. The details' update timestamps matched the bulk snapshot. No run history, latest pass status or automation implementation was verified.

Additional source reviewed for the newly found wallet entry, under `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/`: `packages/core/src/app-contexts/public/features/detail-pages/components/modals/ExpressCheckoutSection.web.tsx` and `hooks/useExpressCheckout.ts` under the same feature. The component uses the public/user basket, excludes free baskets and renders no express checkout in the native webview; it confirms why the free local smoke and native app pass do not cover this wallet entry. Backend public-sellout enforcement remains the previously reviewed `web-app/apps/tickets/api/user_based/serializers/baskets.py`; this source cross-check is not a live payment result.


### SPT-402 — Existing zero-inventory regression

**Qase update: [SPT-402](https://app.qase.io/case/SPT-402) hidden-toggle enhancement saved and verified on 2026-09-15.** Based on the user's current Qase version; description tables remain removed. The organizer's ticket-type editor must hide **Show as sold out publicly** while the global switch is OFF. Admin preparation of a saved true value is separate from that organizer UI. Existing zero-inventory and available-comparison checks, title, tags, suite 625 and all 11 grouped parameter rows remain intact.

Wording cleanup saved and verified on 2026-09-21; current title, tags and user-shortened prerequisites are mirrored here.

Source: backend `apps/main/templates/tickets/dialogs/_edit-ticket-type.html` wraps the checkbox and explanatory text in the `enable_force_public_sold_out` switch. Public ticket serialization and basket enforcement remain covered by B4/B5. No live behavior was executed.

**Title:** Core - Inventory - Verify sold-out event ticket states across sales platforms

**Description:** With the switch disabled, the ticket editor hides Show as sold out publicly. An administrator has prepared Public sold out = Yes on both the exhausted and available comparison types. The available ticket must enter the cart; actual zero inventory must still block selection. No payment is submitted.

Keep grouped parameter rows together. RegularEvent = single-day event; RecurringEvent = separate dates/times. SoldOutScope identifies the event, date/time choice or ticket type to inspect.

- WebPublic: public event page.
- Widget: host website’s event widget.
- WebBoxOffice: Box Office → Sell.
- Electron: Showpass desktop app → Box Office → Sell.

**Preconditions:**

- Global waffle switch enable_force_public_sold_out is OFF throughout.
- An organizer with Manage Events can open the prepared event’s ticket-type editor to check that the public-sellout toggle is hidden. This organizer may be different from the employee performing the Box Office checks.

**Postconditions:**

- Leave the cart empty; no order or payment is created.
- Restore and verify original ticket settings and the global switch after the regression pass. Keep existing orders that consume inventory.

**Tags:** inventory, box-office

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

Qase-ready manual **drafts**, not execution results. No browser testing, behavioral API testing, branch comparison, or changed-file discovery was performed. A read-only Qase regression gap analysis was added on 2026-09-14 after the user authorized it. Subsequent authorized writes created TC-02 as SPT-5230, TC-11 as SPT-5236, TC-12 as SPT-5237 and TC-17 as SPT-5238 in suite 625, and enhanced SPT-402 with fixed switch-OFF regression setup. TC-24 and TC-31–TC-36 were created as SPT-5263–SPT-5269 on 2026-09-21; TC-03, TC-20, TC-22, TC-23, TC-26, TC-28, TC-29 and TC-30 were created as SPT-5282–SPT-5289 on 2026-09-22. TC-01, TC-05, TC-06, TC-07, TC-09, TC-13, TC-15 and TC-19 were created as SPT-5300–SPT-5307 on 2026-10-01; the exact mapping appears in the additions table and beside each case. All new cases are in suite 625 and their saved fields were verified. All execution remains unverified; this note does not establish release readiness.

Scope: `enable_force_public_sold_out` across source-discovered purchase entry points, including native customer/staff apps, plus the associated ticket-type setting, public availability and controlled staff access. Traceability: [SPW-19405](https://showpass.atlassian.net/browse/SPW-19405). The Jira read failed because configuration was missing; work stopped until the user supplied readable card content in `/Users/christianvaldez/Downloads/tmp/del.txt`. That file supplies the requirements below, but does not establish live Jira status, comments, or subsequent acceptance-criteria changes.

The supplied requirement is to keep a ticket type publicly sold out even when inventory becomes available again, while allowing controlled internal sales. Additional proofs are clearing the setting with zero inventory, all ticket types sold out after 25 minutes, reopening one available type, and normal assigned-seat behavior. The earlier switch-transition smoke request was superseded on 2026-09-21: OFF is confined to regression; all feature cases keep ON fixed.

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
| B5 | `apps/tickets/api/serializers/general.py`: `clean_validate_is_tt_sold_out`; `apps/tickets/api/user_based/serializers/basket_checkout.py`: `should_apply_public_sold_out`; `basket_invoice_sale.py`: `clean_public_sold_out`, `_validate_purchase_items`; `basket_holds.py`: `UserBasedTicketBasketHoldsSerializer` | Add/update and final purchase validation; trusted hold and package-child exceptions; sold-out error. |
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
| F22 | `packages/core/src/app-contexts/dashboard/features/packages/ui/components/form/PresetPackageCompositionSection.web.tsx` | The preset-package editor has included-ticket rows and quantities; different ticket types can be included, but an identical type cannot be added twice as separate rows. |
| C1 | `/Users/christianvaldez/Downloads/tmp/del.txt` (client planning context, not repository behavior) | States the Fan Expo sellout goal and package-parent/child expectation; does not define the family's actual ticket types, counts, or product configuration. Some proposed field/flag names differ from current source. |

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
| F9 | `packages/mobile/src/screens/BuyerScreens/PurchaseScreen/PurchaseScreen.tsx`; `packages/mobile/src/hooks/useWebviewUrls/index.ts`; `packages/mobile/src/components/Explore/DiscoveryCard/DiscoveryCard.tsx`; `packages/mobile/src/screens/BuyerScreens/Saved/SavedScreen/SavedScreen.tsx`; `packages/mobile/src/components/Icons/CartIcon.tsx`; `packages/mobile/src/hooks/usePushNotifcationListeners/index.tsx`; backend `apps/emails/models/abandoned_cart.py` | Mobile Explore/Saved cards open the public event in a webview; cart icon resumes checkout. For an eligible paid expired cart, backend sends a recovery email and then a redirect push; tapping the push opens the checkout link in PurchaseScreen. This is distinct from opening the email link in a phone browser. |
| F10 | `packages/mobile/src/components/BoxOffice/TicketSelect/TicketSelect.tsx`; `packages/mobile/src/hooks/dashboard/box-office/useMobileVenueBasket/index.ts`; `useBoxOfficePurchase/index.tsx`; `packages/mobile/src/hooks/dashboard/pos/payment/usePointOfSalePayment/index.ts`; `packages/mobile/src/screens/Dashboard/BoxOffice/MobileBoxOffice/MobilePaymentInfo/MobilePaymentInfo.tsx`; `packages/mobile/src/components/BoxOffice/PointOfSaleFooter/PaymentInfoFooter.tsx`; `packages/mobile/src/constants/box-office.tsx` | Native staff selection reads venue event/access inventory; mobile staff and native POS write/purchase venue baskets; final buttons differ. |
| F11 | `packages/desktop/src/main/window/MainWindow.ts` | Desktop app opens the web Box Office Sell route in Electron; it still needs its own execution row. |
| F12 | `packages/mobile/src/components/BoxOffice/KioskMode/KioskMode.tsx`; `packages/mobile/src/screens/Dashboard/BoxOffice/Kiosk/SelectTicketsScreen/SelectTicketsScreen.tsx`, `SelectSeatsScreen/SelectSeatsScreen.tsx`; `packages/mobile/src/components/Footer/KioskPurchaseFooter/KioskPurchaseFooter.tsx`; `packages/core/src/shared/modules/basket/services/useKioskBasket.ts`; `packages/mobile/src/constants/kiosk.tsx` | Self-service kiosk reads public ticket/calendar availability, but creates and purchases venue baskets; a public restriction at final purchase cannot be inferred from public display. |
| F13 | `packages/next-app/pages/[eventSlug]/seating/index.tsx`; `packages/core/src/app-contexts/public/shared/checkout/components/steps/assigned-seating/AssignedSeatingStep.tsx`; `packages/core/src/shared/modules/seating/features/BestAvailable/components/BestAvailableSeatingHeader/BestAvailableSeatingHeader.web.tsx`; `packages/mobile/src/screens/Dashboard/BoxOffice/PointOfSale/SellScreen/SellScreen.tsx` | Direct seating page, embedded seat step, public venue flag enable_best_assigned_seating, native staff best-available path. |
| F14 | `packages/core/src/app-contexts/public/shared/checkout/components/CheckoutTrackingLinkReview/CheckoutTrackingLinkReview.web.tsx`; `packages/next-app/pages/checkout/link/[id].tsx` | Ordinary checkout links process requested tickets one by one, keep successful items when another request fails, can reuse an existing basket and reduce failed quantities; distinct from allocated holds. |
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
* **Client sale mix:** the three offerings come from the user's message, not from an inspected client record. Family-pack mode, included types/counts/dates, product choices/quantity and overlap with separately sold regular tickets remain unknown. Do not treat `TicketChildrenAndProduct` as part of this client setup without a real record showing it.
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
6. Package children are exempt from public override validation when bought inside an unforced parent. The sellable parent must be forced to stop that package. Actual child capacity still limits the package. Preset packages can include multiple recorded child ticket types and quantities; product relations are separate from those ticket children. [B5, B8, B9, B18, F22]
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
| Ordinary checkout link with a sold-out ticket, or mixed sold-out and available tickets | B5, F9, F14 | Manual-only: TC-20 | Reject the sold-out ticket, complete purchase of the available ticket, preserve an existing browser cart, and reopen browser links without duplicates. App entry uses a paid abandoned-cart recovery push after the email; no hold exception. |
| Ticket add-on and ticket upgrade | B4/B5, F15 | Manual-only: TC-21 | Additional item vs replacing base; retain base on rejection; offer display is not backend proof. |
| Web Box Office | B11, F3 | Manual-only: TC-13 / TC-14 | Staff actual-positive sale and actual-zero rejection. |
| Electron desktop Box Office | F11, B11/F3 | Manual-only: TC-13 / TC-14 | Same route, separately executed application. |
| Native Mobile Box Office and native POS | B11, F10 | Manual-only: TC-15 / TC-16 | Native venue inventory, staff payment screen and transaction evidence. |
| In-person assigned seating — Box Office/POS maps and best available | B11/B12, F10/F11/F13 | Manual-only: TC-17 | Seat and ticket ownership after an in-person sale; an occupied seat cannot sell again. |
| Customer kiosk — single day and recurring | F12 | Manual-only selection/control purchase: TC-18 | Public selection + venue purchase boundary. See unresolved final-purchase gap below. |
| Basic and branded allocated hold purchase links | B5/B11, F1 | Manual-only: TC-23, global ON | Validated existing allocation remains usable. |
| Preset packages, including same/multiple events, nested and reverse ratio | B5/B8/B18, F21 | Manual-only: TC-24, global ON | Parent restriction, child exemption, direct-child rejection, selected calendar dates and configured quantities through purchase. |
| Custom ticket choices | B5/B18, F21 | Manual-only: TC-31, global ON | Required choices, replacement of a selected choice, correct fulfillment and standalone child restriction. |
| Seated preset/custom packages | B5/B18, F21 | Manual-only: TC-32, global ON | Actual occupied seats rejected; correct included seats retained through purchase. Display compatibility remains a source risk. |
| Ticket + product bundles | B5/B18, F21 | Manual-only: TC-33, global ON | Product variants, package quantity scaling, configured barcode/fulfillment and one complete order. |
| Package already selected when parent is forced | B5, F21 | Manual-only: TC-34, global ON | No completed/partial ticket or product order through stale checkout. |
| Actual ticket/product/seat shortage | B5/B8/B18, F21 | TC-32 no-seat check, TC-33 product-shortage check, SPT-4832 preset/custom ticket shortages; TC-35 retired | Product stock and seat ownership still block incomplete packages. Preset/custom ticket exhaustion remains in the Qase baseline. |
| In-person preset/custom/product package sale | B11/B18, F21 | Manual-only: TC-36, global ON; Web Box Office and Electron | Actual-stock sale and correct fulfillment while parent remains publicly closed. |
| Custom-package widgets and native in-person package combinations | F21 | Blocked supported-entry confirmation | Dashboard warns custom packages cannot be sold via widgets, while shared checkout has a custom step. Native customer webview is covered separately; native Box Office/POS package-choice/variant support is not established by generic sale tests. |
| Nested custom packages | B18 | Not applicable: source rejects a custom child that is itself a bundle | Test supported nested preset packages; do not invent a purchasable nested-custom configuration. |
| Exact-last-unit product boundary, shipping modes and all barcode/ratio combinations | B18/F21 | Deferred focused follow-up | Core cases use existing configured fulfillment and stock headroom; they do not prove every product-capacity boundary or delivery permutation. |
| Active waitlist entry | B5, F1/F20 | Manual-only: TC-25 | ON forced signup with remaining inventory; confirm one pending entry and leave it during cleanup. Automatic release/payment is a separate follow-up. |
| Refund returns actual inventory | B10/B15, F4/F18 | Manual-only: TC-26, global ON | Compare the same refund preview before/after the field change; returned inventory stays publicly closed until the ticket checkbox is cleared. Full financial permutations remain deferred. |
| Dashboard checkbox, persistence, clear at zero and cancel | B1–B3 | Manual-only: TC-04, TC-05, TC-08, global ON | Next + Save Event, restoration, actual count and stored value. |
| Event-wide delayed display and one type reopened | B4/B6/B7 | Manual-only: TC-09 / TC-06 | All-forced/all-empty/mixed and inverse after 25 minutes. Extend observations to selected attraction/recurring dates during their entry runs. |
| Search, organizer listing and city/discovery cards | B7, F9 | Manual-only: TC-09 / TC-06 plus public entry runs | Launchers/display projections; do not count a listing view as a completed purchase. |
| Mobile notification or external deep-link entry | F9 | Blocked execution pending an existing event notification/link | PurchaseScreen caller exists; do not send a notification merely to prepare this read-only task. Reuse one if available and record route/event state. |
| Kiosk cart allocated before forced sellout, including seating | F12, B11 | Blocked product-expectation decision; API follow-up required | Kiosk purchase is venue-based and does not inherit normal customer final-purchase enforcement. Fresh selection proof does not close this gap. |
| Public one-click wallet purchase — detail modal, attraction sidebar, mobile web cart | SPT-4903/4904; source cross-check in Qase regression analysis | Manual-only baseline in Qase; explicit switch-state regression deferred | Paid eligible basket required; separate from legacy express widget. Native webview is excluded. |
| Staff attraction-calendar checkout through completed sale | B11, F3; SPT-1077/5138 | Manual-only: TC-13 InPersonEventEntry / TC-14 StaffEventEntry = AttractionCalendar | Existing Qase baseline reaches the basket; TC-13 now continues through the cash sale. Run with global ON in Web Box Office and Electron. |
| Staff checkout of basic hold or group sale | B5/B11, F16 | Manual-only: TC-22, global ON | Holds list hydrates the existing venue basket before checkout; separately execute Web Box Office and Electron. |
| Exchange replacement purchase | B5/B11/B17, F17/F19 | Manual-only: TC-30, whole-order staff exchange | Proves original ticket replacement, returned stock, retained public sellout and unchanged previewed credit; itemized and other eligibility modes remain deferred. |
| Payment-plan sellable copy; membership-qualified ticket access | B1/B4/B5 | Deferred focused setup/validation cases | These alter item identity or eligibility. Package results do not stand in for these flows. Pure product/membership sales without tickets are not affected by this ticket-type field. |
| Admin ticket generation / bulk complimentary imports | B1/B5, B14 | Deferred import workflow regression | Organizer import has its own enable_venue_comp_tickets_import venue flag, Bulk Import Complimentary Tickets permission, preview/confirm and async generation; ordinary checkout does not prove this workflow. |
| Direct API bypass, malformed inputs, tenant/permission isolation, omitted/null values | B1/B3/B5/B9/B11 | Deferred backend integration | Verify real endpoints, not only mocked helpers; boolean text/numeric boundary cases are not manual checkbox actions. |
| Separate UI flag / Box Office indicator | B2 and frontend search | Blocked implementation question | Current source exposes the backend-gated editor checkbox; no separate UI flag/indicator was found. |
| Void, refund, hold release, inventory increase and whole-order exchange return | B10/B15–B17, F18/F19 | Manual-only: TC-03, TC-26, TC-28, TC-29, TC-30 | Inventory return → public remains closed → clear ticket field → customer selection. Refund/credit previews compared; no execution yet. |
| Provider failure/retry/webhooks, timed hold expiry, itemized exchanges and complete financial matrices | B1/B5/B8/B10 | Deferred focused regression | The representative lifecycle cases do not cover every provider, fee/tax/shipping configuration, expiry worker or exchange mode. |
| Map editor, unrelated responsive controls, pure product/membership purchase, off-site vendor purchase | Field belongs to TicketType; route review | Not applicable to this ticket-type purchase matrix, except ticket-bearing packages/access above | Do not manufacture new-ticket assertions for a flow that does not sell a Showpass ticket type. |

**Scope change — 2026-09-21:** OFF variants were removed from feature cases at the user’s request. Existing-cart completion, checkout links/offers, in-person sales, holds, waitlist signup, refund return and the 25-minute aggregate check now run with ON only in this manual set. Their additional OFF executions are deferred unless already included by TC-01/SPT-402; related baseline links do not prove those executions occurred. TC-27’s transition/rollback timing test is retired. This change does not remove their ON entry points or outcome assertions.

The draft accounts for discovered paths; it does **not** claim every path is execution-ready or tested. Blocked and deferred rows are named work, not an accepted release waiver.

## Risk Areas

* **Package partial fulfillment:** a forced parent must not issue only its products or selected children. Included public sellout must not reduce real capacity, erase custom choices, replace product variants or lose seat assignments. Preserve existing fulfillment/barcode configuration; do not require a separate child barcode where the package uses the parent barcode.
* **Client package mismatch:** generic zero-total cases with hard-coded quantities can pass even if the client's paid bundle or family pack has different contents. Record the real composition before execution and use the relevant existing paid checkout baseline if payment itself is in scope.

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
| Off | True | At least 1 | Available if otherwise eligible | Available | TC-01 public purchase; SPT-402 comparison selection |
| Off | True or False | 0 | Sold out | Sold out | TC-01 actual-zero check; SPT-402 |
| On | False | At least 1 | Available | Available | TC-02 control, TC-05 |
| On | True | At least 1 | Sold out | Available | TC-02, TC-04, TC-13 |
| On | True → False | 0 | Remains sold out | Sold out | TC-05, TC-14 |
| On | Null | At least 1 | Same as false | Available | Deferred backend null/default test |

| Aggregation / seating state | Required proof | Coverage |
| --- | --- | --- |
| All public types forced, all actually empty, or mixed | Event sold out after 25 minutes | TC-09: three ON reasons |
| One forced type with inventory is cleared; others unavailable | Event no longer sold out; reopened type selectable after 25 minutes | TC-06 |
| One sold-out ticket type on an unoccupied seat | Seat unavailable | TC-10 |
| Available and sold-out types on the same unoccupied seat | Seat selectable; sold-out option marked and unavailable | TC-11 |

## Recommended Test Data and Setup

* Package data: retain a known preset, custom-choice, seated and ticket + product configuration; record composition, ratios, barcode mode, dates/seats and product variants before execution. Reuse existing reverse-ratio/nested configurations with their supported gates. Public success cases use zero-total orders; in-person cases use execution-owned cash sales. Actual-stock shortage cases consume positive caps through retained owned records.

* For inventory-return cases, a positive cap of 1 consumed by one owned sale or hold makes the transition measurable: 0 remaining → 1 returned → still publicly sold out → ticket field cleared → customer can select 1. Never set Inventory to 0 to mean empty.
* Refund and exchange amount comparisons use the same order and option before/after changing the ticket field. Do not substitute different orders, prices, fees or shipping options and then call the totals equivalent.

* Use published future events with public, currently on-sale ticket types. Unless a case says otherwise, avoid access passwords, waitlists, packages, distributed inventory, membership restrictions and event-wide capacity exhaustion so those rules cannot explain a sellout.
* An employee editing events needs **Manage Events** (`manage_events`). Cash sale requires **Use Box Office** (`use_box_office`) and **Cash Box Office Sales** (`sell_cash_tickets`). Add **View Box Office Stats** for count proof. Refund and transaction access are specified in their cases. Administer Transactions, rather than a generic viewing permission alone, is explicitly required for the refund/void/exchange actions used here.
* The release owner can prepare **Admin → Waffle → Switches**: find `enable_force_public_sold_out`, or add that named switch if absent; record its Active value. It is global, so execution needs a coordinated window that will not change unrelated live sales. Coordinate the change between the OFF regression pass and ON feature pass; restore the original global value only after the entire coordinated pass.
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
| P1 browser | TC-04, TC-05, TC-08 | Role-based checkbox access, save/reopen/cancel, public effect, actual inventory unchanged; restore global state in teardown. Serialize global-switch tests to avoid interfering runs. |
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
7. For this client, does the ticket + ticket package have fixed included tickets or does the customer choose them? Record each included ticket type, count and event/date, whether any included type also sells separately as a regular ticket, and the ticket + product bundle's actual product quantity/variants. These details determine the exact TC-24/TC-31 and TC-33 executions.

No user action is required to read or use these drafts. Resolve the named implementation questions before treating the entire card as accepted; all cases still require execution and evidence.


## Exchange Baseline Description Clarification — 2026-09-23

Applied and verified description-only Qase updates for SPT-1275 (suite 669) and SPT-4823 (suite 594) after user approval. Each existing description was preserved and the wording below appended. Titles, steps, parameters, tags and suites remain unchanged. [SPT-5289](https://app.qase.io/case/SPT-5289) remains the separate returned-inventory/public-sellout case.

**SPT-1275 — published addition:** Use this case as the exchange price-and-quantity baseline when testing public sold-out changes. It checks exchange credit, any extra payment or remaining credit, and replacement quantities; it does not check whether returned tickets stay sold out to customers.

**SPT-4823 — published addition:** Use this case as the Cash or Other settlement baseline when testing public sold-out changes. It checks that a same-value replacement uses the original exchange credit without duplicate payout; it does not check whether returned tickets stay sold out to customers.

