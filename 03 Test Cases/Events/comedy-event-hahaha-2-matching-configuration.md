---
title: Comedy Event (HAHAHA) 2 — match original configuration
date: 2026-11-11
tags:
  - qa/events
  - qa/browser-run
status: Configuration complete; basket add and cleanup passed; one checkout time bug confirmed
---

# Comedy Event (HAHAHA) 2 — match original configuration

The user requested the existing [target Event](https://beta.showpass.com/manage/events/comedy-event-hahaha-2/basic-info/) match [the original comedy Event](https://beta.showpass.com/comedy-event-hahaha/). The user will add the image. This note owns the new Venue's work; the original Event and its [historical setup report](comedy-event-hahaha-rich-configuration.md) remain separate.

## Original baseline — November 11, 2026

- Codex in-app browser, signed in as Christian Valdez. Selected Organization: **Organization For System Gateway Payment Intent**, confirmed in the Organization drawer. Numeric Venue ID not exposed in the screens inspected.
- Target: Draft / Public, Comedy category, Location **155 Wellington Street West**, Toronto, timezone America/Toronto. Start **November 12, 2032, 7 PM**; end **November 26, 2032, 8:30 PM**. No doors time, description or images. No ticket types. Order form: Standard Info, three collection switches OFF, no custom fields, blank post-purchase message.
- Original public Event freshly inspected: **Organization For System Gateway Charge API**, November 12, 2032, 7–8:30 PM EST, standard doors 6 PM. Subtitle and Ryan Long/rush-seating description captured from the visible page. Six public ticket types and their wording/prices/timing matched the historical report; seller-only comps were absent. No source quantities selected.
- **User-confirmed readiness:** correct target Venue; Manage Events and Discounts/Upgrades/Waitlists available; existing fee/payment setup ready for unpaid basket checks. No readiness values were obtained from Admin, source defaults or the prior Venue's confirmations.
- The baseline above describes the original state. The progress section below records changes. No Admin access, orders, payments, Refunds, sends, Qase or Jira writes. The temporary reference browser tab was closed.

## Saved progress

- Basic info saved and reloaded: end corrected to November 12, 2032, 8:30 PM; start remains 7 PM; standard doors November 12 at 6 PM; reference subtitle, tags and rush-seating/Ryan Long description entered. Artwork left blank for the user. A plain-text HTML paste was corrected before saving; no literal HTML tags were intentionally retained.
- All seven ticket rows saved, zero sold, combined inventory 100198, no Event-wide inventory override. IDs: GA **1629833**, Early Bird **1629834**, VIP **1629835**, Group **1629836**, Accessible **1629837**, Staff **1629838**, Workshop **1629839**. Prices, inventory and visibility read back after save in a fresh page.
- Early Bird description, 6/6 limits, Ticket icon and First 40 tickets label saved; sale opening Nov 9, 2026 at 10 AM and cutoff Nov 5, 2032 at 11:59 PM entered. Reopened sale dates, 10 AM opening, 11:59 PM cutoff, 6/6 limits and Box Office bypass OFF verified on November 11.
- VIP 4/4 limits, Star icon, priority-entry description saved. Reopened custom dates show Nov 12 at doors **5:30 PM**, scan start **5:30 PM**, scan end **7:30 PM**; start/end inherit the main Event.
- Group minimum 4, max 12, per-user 12, Users icon and complete-party description saved. Accessible 4/4 limits, Heart icon and supplied coordination wording saved. Staff remains Sellers only with price 0, 2/2 limits, Box Office limit 16 and User icon. Reopened November 12: Group minimum 4/max 12/per-Customer 12; Accessible 4/4; Staff 2/2 with Box Office 16 verified.
- Workshop 4/4 limits and description saved. Reopened sale cutoff **5:30 PM**, start **6 PM**, end **6:30 PM**, doors **5:45 PM**, scan start **5:45 PM**, scan end **6:15 PM**, all Nov 12, 2032, read back exactly. Start/end do not alter the main-show schedule.
- PDF terms and message saved; default sale end is Start of the event. No-ticket message saved. Issued PDFs, printed tickets and actual time enforcement not tested.
- VIP waitlist enabled and settings saved. Reopened: enabled, purchase limit **2**, cutoff **4 hours**, CC verification **OFF**. No customer joined and no waitlist allocation was made.
- Order form saved and reloaded: Standard Info; after-payment, per-ticket and required Box Office collection all ON. Three questions saved: required Rush seating acknowledgement on six main-show types, optional What brings you to the show? on the same six, and required Party name for group arrival on Group only, max length 80. Workshop excluded from those main-show questions, matching the original's later workshop addition. Reopened acknowledgement explicitly showed before-payment ON and exactly six types selected. Reopened November 12: Group-only required question, max 80; optional occasion question with all four choices, six main-show types selected and Workshop excluded verified. Post-purchase message saved/reloaded with all three arrival/experience schedules.
- Advanced saved and reloaded: Customer maximum 12, exchange cutoff override 24h, thermal title COMEDY EVENT (HAHAHA), message Enjoy the laughs!, Performance language = English and Show format with the 90-minute rush-seating schedule. Organization transfer/reminder settings left inherited; no recipients added.
- Legal baseline freshly read: target Organization default **Flexible refund policy**; Event override blank. Existing terms acceptance is ON with `https://www.showpass.com/sell/terms-of-service`. These Venue-specific rules are retained rather than copying the source Organization's inherited no-refund wording. All four arrival notices saved and reloaded: complete-party arrival; standard doors 6 PM/show 7 PM Toronto time; VIP entry 5:30 PM; separate workshop doors 5:45 PM/workshop 6–6:30 PM, main show excluded.
- HAHA 10 saved and listed Active: Regular 10%, description 10% off General Admission for comedy night, total uses 50, per-Customer uses 1 and items 4, online and Box Office available. Before submitting, only target GA 1629833 was selected; reopened November 12 and confirmed exactly GA 1629833 checked, six other types unchecked, limits 1/4/50, startsNow/endsNever, online and Box Office ON (Discount ID 281138). No code was redeemed.
- Three Custom tracking links created, then reloaded together. Seller-only ticket display left blank: Instagram https://beta.show.ps/l/6b 01644e/ ; Newsletter https://beta.show.ps/l/8b 0113ef/ ; Venue Posters https://beta.show.ps/l/a 199a 141/ . All showed zero usage. No links distributed.
- November 11 historical blocker: Draft destination search returned No results found. Read-only source confirmed unspecified-status Event searches exclude drafts. Automatic approval review blocked publishing for lack of explicit public-release authorization; no publish action ran then. **Resolved November 12:** user published the Event and asked to finish. Overview freshly showed **Live / Selling now**, zero sold, 100198 capacity. No agent publication or Admin action.
- November 12: both upgrade offers created and reloaded: GA 1629833→VIP 1629835, title Make it a VIP comedy night, button Upgrade to VIP (Solid); Early Bird 1629834→VIP 1629835, title Give your early-bird ticket a VIP boost, button Choose VIP (Outline). Same Event/date on both ends. Checkout rendered the actual destination and differences **$15** / **$25** with 5:30 PM priority entry and unchanged 7–8:30 PM main show. Upgrade buttons were not pressed.
- Browser controls stalled intermittently. Reload/reconnection/reset and a fresh tab in the **same in-app browser** were tried; normal navigation to the public Event restored usable input. No further user refresh requests, external browser, production inspection, Admin or direct application API workaround. The cause remains unproven; tool errors are not product bugs.
- November 12 public Event verified subtitle, correct main schedule/doors, reference description, four arrival notices and target Organization name. Public picker showed six sellable types, Workshop validity 6–6:30 PM, and no Staff complimentary type. Branding left alone per latest user request.
- November 12 basket baseline empty. All six public types added in one mixed basket (GA 1/Early 1/VIP 1/Group 4/Accessible 1/Workshop 1). Real Review and a refreshed Review showed six lines, nine tickets, base subtotal **CAD 279.55**, host fee 9.00, service fees 34.94, PST 16.23, displayed total 339.72. Fees were observed, not independently certified. Both upgrade offers appeared correctly.
- All six lines removed through their named confirmation dialogs. Refreshed checkout showed **Oops! Your cart is empty!** VIP waitlist table then showed total 30 / available 30 / queue 0 / hold 0. No purchases, legal acceptance, payments, orders, codes redeemed, waitlist allocations or shared settings changes.
- **BUG-01 confirmed:** checkout Review shows Workshop at 7 PM despite saved custom start 6 PM and correct public 6–6:30 PM validity. Reproduced independently with only one Workshop ticket; Review still 7 PM. That ticket was removed and empty basket rechecked. See TC-10 and the local draft below. No Jira write or source edit.

## Selected scope

Use **one existing Event**, no new Events. Match compatible Event-owned configuration; retain target Venue fees, taxes and Organization policy. Correct the target end date to **November 12** to match the requested single-night show. The user published the Event; Live state, unpaid basket checks and cleanup were verified November 12. Artwork remains for the user.

| Check | Planned proof | Starting state / outcome |
| --- | --- | --- |
| TC-01 — Event copy and one-night schedule | Saved description/subtitle/tags/doors and corrected end date; public read | Passed — saved setup and public schedule/subtitle checked |
| TC-02 — Seven ticket types and timing | Save/reopen rows, limits, sale/scan/custom dates and delivery wording | Passed — all remaining ticket limits reopened; timing checked |
| TC-03 — Order form | Three collection switches, three scoped questions and confirmation message saved/reopened | Passed — all selected question settings reopened |
| TC-04 — Advanced and public notices | Limit 12, printed wording, language/format, four arrival notices saved | Passed for saved configuration; printed/issued output not run |
| TC-05 — HAHA 10 | 10% on target GA only; user/use/item limits 1/50/4; no source Event IDs | Passed — GA-only scope and limits reopened; redemption not run |
| TC-06 — Two VIP upgrades | Target GA/Early Bird → target VIP, same Event; saved offers | Passed — both offers saved/reloaded and displayed in checkout |
| TC-07 — Tracking links and VIP waitlist | Three target-specific links; VIP enabled, claim limit 2, cutoff 4h, CC verification OFF | Passed for saved configuration; no join/claim or attribution flow run |
| TC-08 — Public baskets | All six public types at valid quantities; reload actual checkout lines; preserve baseline; remove only test additions | Add/refresh/cleanup Passed; Workshop time Failed (BUG-01) |
| TC-09 — Seller-only comps | Hidden from public picker; seller basket only if supported authorized path and safe cleanup are available | Public exclusion Passed; seller basket Not run |

### Ticket plan

All prices CAD; no assigned seats or Packages. All custom same-day times below are November 12, 2032 in America/Toronto. Main-show tickets inherit 7–8:30 PM unless specified. Quantity limit columns are per transaction / per Customer.

| Ticket | Price | Inventory | Visibility | Limits | Timing or special rule |
| --- | --- | --- | --- | --- | --- |
| General Admission - Rush Seating | 34.95 | 100000 | Public | Standard limits; Event Customer maximum 12 | Standard doors 6 PM |
| Early Bird - Rush Seating | 24.95 | 40 | Public | 6 / 6 | Sale opens Nov 9, 2026, 10 AM; closes Nov 5, 2032, 11:59 PM; First 40 tickets |
| VIP - Priority Entry | 49.95 | 30 | Public | 4 / 4 | Doors 5:30 PM; scans 5:30–7:30 PM; no separate main-show start |
| Group Night Out - 4+ Tickets | 29.95 | 80 | Public | Minimum 4; maximum 12 / 12 | Price per person; complete-party arrival |
| Accessible Admission | 34.95 | 12 | Public | 4 / 4 | Match supplied coordination wording; no medical details collected |
| Staff & Industry - Complimentary | 0.00 | 16 | Sellers only | 2 / 2; Box Office limit 16 | Authorized seller issuance only; no comp order in this run |
| Pre-show Comedy Workshop - Separate Admission | 14.95 | 20 | Public | 4 / 4 | Doors/scans start 5:45 PM; workshop 6–6:30 PM; scans end 6:15 PM; sale ends 5:30 PM. Main show excluded |

## Confirmed bugs and limits

One product bug confirmed on November 12: checkout displays the main Event start for the earlier Workshop. See [BUG-01](#bug-01--checkout-shows-the-wrong-workshop-start). The target's two-week end date is an existing configuration difference, not a reproduced save defect. Browser-control timing/selector recoveries are not classified as product bugs.

## Saved-check walkthrough and evidence

Index: [TC-01](#tc-01--event-copy-and-schedule), [TC-02](#tc-02--ticket-rules), [TC-03](#tc-03--order-form), [TC-04](#tc-04--advanced-and-notices), [TC-05](#tc-05--discount), [TC-06](#tc-06--upgrades), [TC-07](#tc-07--links-and-waitlist), [TC-08](#tc-08--public-basket), [TC-09](#tc-09--seller-only-comps), [TC-10](#tc-10--workshop-time-in-checkout), [BUG-01](#bug-01--checkout-shows-the-wrong-workshop-start).

Initial saved checks ran November 11, 2026; the completion checks and bug reproduction below ran November 12, 2026. They do not establish purchase, email, printing, admission, Refund or Exchange behavior. Screenshots were captured during setup; later input failures were recovered, allowing real basket, cleanup and saved-offer screenshots. Outcomes requiring purchase remain unrun.

### TC-01 — Event copy and schedule

**What this tests:** the existing Event was enriched without creating another Event. **Start here:** Christian Valdez → Organization For System Gateway Payment Intent → Manage Events → Comedy Event (HAHAHA) → Basic info.

1. Save the one-night schedule and reference text, then reload Basic info. **Expected:** November 12, 2032, 7–8:30 PM, doors 6 PM, reference copy and tags retained. **Actual:** schedule, doors, description and tags reloaded. November 12 public page showed the exact subtitle, reference description, Nov 12 start 7 PM/end 8:30 PM/doors 6 PM and all four notices. Branding was not changed during completion.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/basic-info-saved.jpg" width="600" alt="Saved Basic info" />

### TC-02 — Ticket rules

**What this tests:** seven ticket types and their separate timing. **Start here:** the same Event → Tickets; seven saved rows, zero sold.

1. Reload Tickets and reopen Early Bird, VIP and Workshop. **Expected:** table values above; VIP doors/scans and Workshop's six custom times saved. **Actual:** seven rows/prices/inventory/visibility verified; Early Bird sale dates and 6/6 limits, VIP timing and Workshop timing reopened successfully. November 12 Group minimum 4/max 12/per-Customer 12, Accessible 4/4, and Staff 2/2 with Box Office 16 reopened correctly. Workshop custom start 6 PM/end 6:30 PM and admission/sale windows reopened again for BUG-01.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/workshop-saved.jpg" width="600" alt="Saved separate Workshop timing" />

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/vip-timing-saved.jpg" width="600" alt="Saved VIP timing" />

### TC-03 — Order form

**What this tests:** saved collection rules and scoped questions. **Start here:** the same Event → Order form.

1. Save and reload collection settings, questions and confirmation message; reopen acknowledgement. **Expected:** three collection switches ON, acknowledgement required before payment on six main-show types, optional occasion question on those same types, required Party name on Group only. **Actual:** switches, three question rows and confirmation message reloaded; acknowledgement timing and six-type scope reopened. November 12 occasion options/six main-show types/Workshop exclusion and Group-only required/max 80 values reopened correctly. No customer form was submitted.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/order-form-saved.jpg" width="600" alt="Saved order form" />

### TC-04 — Advanced and notices

**What this tests:** saved Event limits, printed wording and arrival notices. **Start here:** the same Event → Advanced options, then Legal & important info.

1. Save and reload both pages. **Expected:** Customer maximum 12, 24h exchange cutoff, language/format fields, thermal wording and four selected arrival notices. **Actual:** values reloaded. Target Organization's Flexible refund policy and existing terms requirement retained. Issued/printed output and time enforcement not run.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/advanced-saved.jpg" width="600" alt="Saved Advanced options" />

### TC-05 — Discount

**What this tests:** HAHA 10 saves on the target Event. **Start here:** the same Event → Discounts → Single codes.

1. Create HAHA 10 with only target General Admission checked, then read the saved list. **Expected:** 10%, Active, 0/50 uses, customer limit 1, item limit 4. **Actual:** list matched. November 12 edit form (Discount ID 281138) confirmed GA 1629833 as the only selected ticket, 10%, limits 1/4/50, Now/Never, and both sale locations. No redemption test was run.

### TC-06 — Upgrades

**What this tests:** same-Event GA/Early Bird to VIP offers. **Start here:** Christian Valdez, Organization For System Gateway Payment Intent → Manage Events → Comedy Event (HAHAHA) → Upgrades; Event Live after user publication.

1. November 11: search for Draft destination. **Expected:** published Event required by this search. **Actual:** no result; no different Event substituted. This was a setup dependency, not a product bug.
2. November 12: select each source ticket and the same Event's VIP destination, fill the two offers, Create, then reload. **Expected:** exactly two rows with GA/Early Bird→VIP and same Nov 12 Event. **Actual:** both rows saved/reloaded, correct target IDs selected. Checkout showed the two titles, VIP destination and $15/$25 differences, including after refresh. Upgrade actions themselves not run.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/upgrades-saved-2026-11-12.jpg" width="600" alt="Both saved same-Event VIP offers" />

### TC-07 — Links and waitlist

**What this tests:** target-specific promotion links and saved VIP waitlist settings. **Start here:** the same Event → Tracking links, then Tickets → VIP → Waitlist.

1. Create three Custom links with seller-only display blank, reload the list; enable/save VIP waitlist and reopen. **Expected:** three links above; waitlist enabled, limit 2, cutoff 4h, CC verification OFF. **Actual:** all read back. No subscribers, allocation, sent links or attribution purchases.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/vip-waitlist-saved.jpg" width="600" alt="Saved VIP waitlist settings" />

### TC-08 — Public basket

**What this tests:** all six public ticket types reach a real basket without a purchase. **Start here:** November 12, Christian Valdez signed in on beta, public Comedy Event (HAHAHA) owned by Organization For System Gateway Payment Intent. Initial checkout showed Oops! Your cart is empty! Supported cleanup: Review → Remove → confirm the named ticket/quantity.

1. Open BUY TICKETS, select GA 1, Early Bird 1, VIP 1, Group 4, Accessible 1 and Workshop 1. Wait for Checkout 9, open it and select Continue through optional Add-ons. **Expected:** Review contains six distinct ticket lines, quantities 1/1/1/4/1/1, same Nov 12 Event and CAD 279.55 base subtotal. **Actual:** matched. Displayed host fee 9.00/service 34.94/PST 16.23/total 339.72 recorded as observations. Workshop displayed time was wrong; see TC-10.
2. Refresh checkout and Continue through Add-ons again. **Expected:** same six lines/nine tickets once, same subtotal and both correct VIP offers. **Actual:** matched after refresh; no duplicate/substituted tickets.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/basket-review-2026-11-12.jpg" width="600" alt="Actual refreshed nine-ticket basket and GA VIP offer" />

3. For each line, select Remove and confirm its actual name/quantity: GA 1, Early Bird 1, VIP 1, Group 4, Accessible 1, Workshop 1. Refresh checkout. **Expected:** original empty basket restored. **Actual:** Oops! Your cart is empty! VIP available inventory returned to 30/30 with hold 0/queue 0. No other per-type reserved-count screen was inspected; no claim of independent financial/inventory reconciliation. A later isolated BUG-01 reproduction was also removed, and the empty basket was verified again.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/basket-empty-2026-11-12.jpg" width="600" alt="Empty basket after all test additions were removed" />

### TC-09 — Seller-only comps

**What this tests:** ordinary customers cannot see Staff complimentary inventory. **Start here:** the same published Event → BUY TICKETS; seven Dashboard ticket types exist, Staff remains Sellers only.

1. Read the ordinary public picker. **Expected:** six public types; Staff & Industry - Complimentary absent. **Actual:** passed. Staff saved 2/2 limits and Box Office 16 were reopened. Seller basket and actual comp issuance were not run; no $0 order created. This conditional seller variation remains outside the completed public basket check.

### TC-10 — Workshop time in checkout

**What this tests:** the earlier Workshop keeps its own start time in Review. **Start here:** November 12 on beta, Christian Valdez signed in, Organization For System Gateway Payment Intent. Event is Live, main show Nov 12 2032 at 7 PM Toronto time; Workshop 1629839 has saved custom start 6 PM/end 6:30 PM. Use a permitted empty/isolated basket and stop if unrelated items exist; do not clear them.

1. In Manage Events → Comedy Event (HAHAHA) → Tickets, select the pencil beside Pre-show Comedy Workshop - Separate Admission. Under Basic info → Ticket timing inspect Custom ticket event start/end time. **Expected:** Nov 12 2032 at 6 PM/6:30 PM, distinct from parent 7 PM. **Actual:** exact saved values reopened; no edits made.
2. Close the dialog. Open View event → BUY TICKETS. Set Workshop quantity 1 with all other types 0 and read validity. **Expected:** 6–6:30 PM EST. **Actual:** correct public validity. Wait until Checkout 1 is available.
3. Select Checkout 1, then Continue through optional Add-ons. **Expected:** Review identifies the Workshop with its 6 PM start. **Actual:** Nov 12 2032 | **7:00 PM EST** shown above the Workshop line. The same mismatch had already survived refresh in TC-08's mixed basket; the Workshop-only basket independently reproduced it.

<img src="../../99 Archive/QA Evidence/events/comedy-event-hahaha-2-2026-11-11/workshop-review-wrong-time-2026-11-12.jpg" width="600" alt="Workshop-only Review wrongly showing 7 PM" />

4. Remove → confirm 1x Workshop, then refresh checkout. **Expected:** empty baseline restored. **Actual:** Oops! Your cart is empty! No Questions acknowledgement, legal acceptance, payment or order submission.

### BUG-01 — Checkout shows the wrong Workshop start

**Draft only — no Jira issue has been created.**

**Title:** fix (checkout) | Review shows the main show time for a ticket with an earlier custom start

**GIVEN** Comedy Event (HAHAHA) is Live on beta under Organization For System Gateway Payment Intent. The main show starts November 12, 2032 at 7 PM Toronto time. In Manage Events → Edit → Tickets, the Pre-show Comedy Workshop - Separate Admission ticket has Custom ticket event start time set to 6 PM and end time 6:30 PM on that date. The public ticket picker correctly shows 6–6:30 PM.

**WHEN** I add one Workshop ticket, open Checkout and Continue through optional Add-ons to Review.

**THEN** Review shows 7:00 PM EST above the Workshop ticket instead of its 6 PM custom start. It should show the Workshop's saved 6 PM start so the Customer can arrive for the experience they are buying.

Observed November 12, 2026 in the Codex in-app browser on beta. Customers relying on checkout could arrive after the workshop and its entry window have ended. Also reproduced in the nine-ticket mixed basket after refresh. Ticket Type ID 1629839. Evidence: TC-10 step 3 above. No purchase, issued ticket/email, scan or other client outcome was tested. Both baskets were restored empty. No workaround changed the Workshop schedule.

**Internal finding record:** confirmed display defect, high confidence; suggested severity Medium/P 2, because the incorrect arrival time affects tickets with different custom schedules. Data-safety: reversible owned beta basket reservations only; all additions removed, no money or order changes. Affected proof: TC-08 time display / TC-10 step 3. Release classification: affected custom-time checkout display fails; no broad release sign-off is claimed. Deployed commit/root cause not proven; no Jira duplicate search or write performed.

**Source support, read-only:** backend `web-app/apps/tickets/models/event_management/event.py` `get_start_date(type=...)` selects the ticket's custom start ahead of the Event's start. Local frontend `packages/core/src/shared/components/application/data-display/item-group/ItemGroupEvent/ItemGroupEvent.web.tsx:59` supplies `eventData.starts_on` to the displayed date; `ItemGroupDisplay.web.tsx:96` formats that value. These source observations support the failure mechanism but do not establish the exact deployed revision. No source edits/tests were made.

## Continuation handoff

> These Events exist; what do I do next? **One existing Event was enriched:** beta [Comedy Event (HAHAHA)](https://beta.showpass.com/comedy-event-hahaha-2/) ([editor](https://beta.showpass.com/manage/events/comedy-event-hahaha-2/basic-info/)), **Organization For System Gateway Payment Intent**, verified November 12, 2026. The user published it; Dashboard confirmed Live/Selling now. Numeric Venue ID was not exposed. Readiness for Manage Events, Discounts, Upgrades, Waitlists and unpaid payment/fee checks was user-confirmed for this Organization; reuse it for this same scope. **No Admin, production activity, shared settings changes, legal acceptance, purchases, sends or Jira writes.** Branding is excluded per the user's latest instruction.
>
> Seven ticket types 1629833–1629839, custom timing, VIP waitlist, three scoped questions, notices, HAHA 10 (Discount 281138), three tracking links and two same-Event VIP offers are saved. Final ticket limits, question scopes and discount eligibility read back correctly. All six public types reached a real refreshed basket (nine tickets/CAD 279.55 base), with both VIP offers displayed correctly. Staff comp was absent publicly. All test basket additions, including one isolated Workshop reproduction, were removed; refreshed basket empty and VIP available 30/30. No order/issued ticket exists from this work. Seller basket, actual code redemption, pressing upgrades, purchase/fulfillment/admission, exchange and waitlist allocation remain unrun outcomes, not setup gaps.
>
> **One confirmed bug:** BUG-01 / TC-10 — Workshop's saved/public 6 PM start becomes 7 PM in checkout Review. A local Jira-ready draft and screenshot are in this note; no Jira issue created. First next action for bug investigation: use TC-10 steps 1–4 with an empty owned beta basket, compare the 6 PM saved/picker time to Review, stop before payment and remove the one Workshop ticket. Expected after a fix: Review 6 PM. Keep the rich setup in place and do not duplicate Events/tickets/codes. Further purchase, Admin, source changes or Jira publication require their own requested scope.

## Final results — November 12, 2026

| Result | Exact check and step | Limits |
| --- | --- | --- |
| Passed | [TC-01 step 1](#tc-01--event-copy-and-schedule) | Branding excluded |
| Passed — saved settings | [TC-02 step 1](#tc-02--ticket-rules) | Actual scan/sale-window enforcement not run |
| Passed — saved settings | [TC-03 step 1](#tc-03--order-form) | Customer answers/issued forms not submitted |
| Passed — saved settings | [TC-04 step 1](#tc-04--advanced-and-notices) | Purchase/printing/exchange not run |
| Passed — saved settings | [TC-05 step 1](#tc-05--discount) | Actual redemption not run |
| Passed | [TC-06 step 2](#tc-06--upgrades) | Saved relationships and displayed offers verified; upgrade action not run |
| Passed — saved settings | [TC-07 step 1](#tc-07--links-and-waitlist) | Customer claim/attribution not run |
| Passed — add/refresh/cleanup | [TC-08 steps 1–3](#tc-08--public-basket) | Six lines/nine tickets; wrong Workshop time separately failed below |
| Passed — public exclusion | [TC-09 step 1](#tc-09--seller-only-comps) | Seller basket/comp issuance Not run |
| Failed — [BUG-01](#bug-01--checkout-shows-the-wrong-workshop-start) | [TC-10 step 3](#tc-10--workshop-time-in-checkout) | Displays 7 PM instead of 6 PM; cleanup step 4 Passed |

No checks remain blocked by publication or browser input. Configured features beyond the explicit checks above are not claimed to be fully tested. Other app features (Packages, assigned seating, membership benefits, donations, payment completion and reporting) were not added to this reference-matching Event; no app-wide coverage claim.
