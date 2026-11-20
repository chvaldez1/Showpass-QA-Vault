---
title: Christmas Market 7 — rich configuration
date: 2026-11-12
tags: [qa/events, qa/browser-run]
status: Configuration complete; basket add and cleanup passed; checkout findings recorded
---

# Christmas Market 7 — rich configuration

Target: [Event editor](https://beta.showpass.com/manage/events/christmas-market-7/basic-info/). Authorized: enrich this owned beta Event, flag confirmed bugs, bounded unpaid basket checks and cleanup. User said everything is ready; recorded as user-confirmed readiness for the current scope, not Admin-verified flags. No Admin, production, payment/order, legal acceptance, sends, Jira/Qase writes or shared settings changes.

## Baseline

November 12, 2026; Codex in-app browser; Christian Valdez. Organization drawer selected **1786-Anime**, parent **2218-chris-parent-org**. Numeric Venue ID not independently read; 1786 is part of the displayed Organization name. Live/Public single Event, Friday **December 18, 2026, 5–11 PM America/Toronto**. Location **Montréal-Pierre Elliott Trudeau International Airport (YUL), 975 boul. Roméo-Vachon N, Dorval, Québec**. Preserve existing location, dates, name, banner/square images and inherited fee/payment/refund rules. Fairs & Festivals and Seasonal & Holiday categories. Description/tags/doors blank. No ticket types, therefore no sold ticket types to rewrite. Default sale end End of the event; blank ticket PDF wording. Order form initially Standard Info with collection switches OFF and no questions. Advanced Customer limit and thermal fields blank; exchange/transfer rules inherited. No existing Event discounts or upgrades. Product search found no Christmas Market Product.

## Chosen scope and expected data

One existing Event; no extra Events. Test-only Christmas market story with distinct entry windows and a separate ornament-making activity. Images/branding preserved. No claim of real vendors, performers, transport, catering or accessibility provisions.

| ID | Area | Planned configuration | Proof and cleanup |
| --- | --- | --- | --- |
| TC-01 | Presentation | Market description/subtitle/tags; doors 4:45 PM; inherited location/schedule | Save/reload; public inspect |
| TC-02 | Tickets | Eight types below; custom entry/performance/scan/sale timing; quantity limits; PDF instructions | Reopen selected fields and public picker |
| TC-03 | Forms | Required workshop choice only Workshop; group arrival name only Group; optional shopping interests; confirmation | Saved readback; no customer submission |
| TC-04 | Selling | HOLIDAY 10 scoped Standard; Standard→First Look offer; two source links; Workshop waitlist | Saved relationships and visible checkout offer; no allocation/send |
| TC-05 | Product | Owned market tote with two variants and pickup, if supported | Save/reopen; intended variant basket; remove test additions |
| TC-06 | Basket | All seven public types plus tote variants if available; preserve original basket | Actual refreshed Review; remove only run additions and verify original state |
| TC-07 | Vendor access | Seller-only Vendor pass absent from public picker | Public absence; seller issuance not run |

All ticket prices CAD; exact date December 18, 2026, timezone America/Toronto. Start/end/doors inherit Event unless below; normal electronic delivery/default one scan unless specifically configured. Standard sale starts now and ends at Event end; other blank sales inherit. No assigned seats, Package or membership dependencies.

| Ticket (Ticket Type ID) | Price | Inventory | Visibility | Quantity per transaction / Customer | Distinct timing |
| --- | --- | --- | --- | --- | --- |
| General Admission - Evening Market (1630075) | 12 | 300 | Public | max 8 / 12 | Event 5–11 PM; doors 4:45 PM |
| Early Bird - Evening Market (1630076) | 9 | 60 | Public | max 6 / 6 | Sale closes Dec 11 at 11:59 PM |
| First Look - Early Shopping Pass (1630077) | 22 | 30 | Public | max 2 / 2 | Start 4 PM/end 11 PM; doors 3:45 PM; scans 3:45–6 PM; sale end 5:30 PM |
| Twilight Entry - After 8 PM (1630078) | 7 | 100 | Public | max 6 / 6 | Start 8 PM/end 11 PM; doors/scans 7:45 PM; scans end 10:30 PM; sale ends 10:15 PM |
| Friends & Family - 4+ Admissions (1630079) | 10 | 160 | Public | min 4/max 8 / 12 | Individual per-person admission; no single-ticket family bundle |
| Little Elves - Ages 5 and Under (1630080) | 0 | 80 | Public | max 4 / 4 | Requires accompanying adult with separate admission; no child personal data |
| Ornament Workshop - 6:30 PM Session (1630081) | 18 | 24 | Public | max 2 / 2 | Start 6:30 PM/end 7:15 PM; doors/scans 6:15 PM; scans end 6:45 PM; sale end 6 PM; market admission separate |
| Vendor & Crew - Setup Access (1630082) | 0 | 40 | Sellers only | max 2 / 2; Box Office 10 | Start 3 PM/end 11 PM; doors 2:45 PM; setup wording; no public exposure |

Expected public mixed basket: GA 1 + Early 1 + FirstLook 1 + Twilight 1 + Group 4 + LittleElves 1 + Workshop 1 = **10 tickets on 7 lines, CAD 108 base subtotal**, before fees/taxes/products. The saved Event Customer maximum is 12. Both tote variants add CAD 18, giving **CAD 126 base subtotal for 12 items on 9 lines**; this actual refreshed basket passed. Stop before acknowledgement/legal acceptance/payment/order. This is setup plus basket proof, not full lifecycle coverage.

## Saved configuration and limits

- All eight ticket types saved, zero sold; combined Inventory **794**, no Event override. Standard 8/12, Early Bird 6/6 plus Dec 11 cutoff, First Look 2/2 and all six custom times, Twilight 6/6 and all six times, Group 4/8/12, Child 4/4, Vendor 2/2/Box Office 10/start 3 PM/doors 2:45 PM reopened. Workshop's six custom times reopened and maximum 2 shown in checkout. PDF wording and no-ticket message saved/reloaded. Actual sale/scan boundaries, issuance and printing not executed.
- Subtitle **Festive finds, early shopping and a little handmade magic.** Description explains all admission types, separate Workshop, child supervision and purchases not included. Tags handmade-gifts/evening-shopping/craft-workshop; standard doors 4:45 PM. Public read confirms these, inherited name/date/location/images and four arrival notices.
- Advanced reopened: Customer maximum 12, thermal title **CHRISTMAS MARKET**, message **Check entry time**. Exchange cutoff stays inherited 24h, transfer limit inherited 1; no recipients added. Existing event reminderON and inherited post-event emailOFF retained. No sends.
- Order form saved/reloaded and three questions reopened: required **Workshop ornament style** (Woodland star/Winter snowflake/Festive tree), Workshop only; required **Group arrival name**, Group only, max 60; optional **What are you shopping for?** (Handmade gifts/Seasonal decorations/Craft activities), all seven public types, Vendor excluded. Standard Info; per-ticket and after-payment collection OFF retained. Required Box Office collection ON; complete arrival confirmation message saved. No answers submitted.
- **HOLIDAY 10**, Discount ID 281276, reopened:10%, GA 1630075 only; limits 1 use per Customer/4 items/100 total; Now/Never; Box Office and onlineON. No redemption test. **One upgrade**: GA 1630075→First Look 1630077 in the same Event/date; title Get first pick of the festive finds, button Choose First Look/Solid. Saved/reloaded; checkout rendered destination and **$10** difference correctly. Upgrade action not pressed.
- **Workshop waitlist** enabled, claim limit 2, CC verification OFF. Final additional cutoff **blank**, so the custom **6 PM sale end** governs. This was reopened after saving. No join/allocation. A draft 2h cutoff was removed because backend `event_ticket_types.py:_get_default_sale_ends_on` gives waitlist cutoff priority over the custom sale end; retaining it would close sales at 3 PM. This is a configuration correction, not a bug.
- Two Custom tracking links saved, seller-only display blank: [Gift Guide Newsletter](https://beta.show.ps/l/092494c 6/) and [Local Posters](https://beta.show.ps/l/a 7acba 75/). No distribution or attribution purchase.
- **Product 2278:** [Christmas Market 7 - Reusable Tote](https://beta.showpass.com/manage/products/2278/basic-info/), categoryProducts. Both variants saved/reopened, Published, zero sold. Event checkoutON with Include for certain items and **Event ID 650449** selected in the saved UI relationship. Venue page/staff Box Office/membership checkoutOFF; no unrelated Event association. Required electronic voucher and Will Call/Pick UpON; shippingOFF, transfersOFF, confirmation PDF retained. Description and Display & Email Message saved/reloaded with pickup at market help desk during purchased admission hours. No notification recipients added. Product fees/taxes inherited. No issued Product or actual pickup tested.

| Tote variant | Base price CAD | Inventory | Purchase limit | SKU |
| --- | --- | --- | --- | --- |
| Festive Red | 8 | 50 | 2 | XMAS 7-TOTE-RED |
| Natural Canvas | 10 | 40 | 2 | XMAS 7-TOTE-NATURAL |

Two existing Organization Products also appeared as add-ons. They were not edited or added to the basket. The newly created tote is restricted to this Event.

## Execution walkthrough — November 12, 2026

Index: [TC-01](#tc-01--presentation), [TC-02](#tc-02--ticket-rules), [TC-03](#tc-03--questions), [TC-04](#tc-04--selling-and-waitlist), [TC-05](#tc-05--tote), [TC-06](#tc-06--mixed-basket-and-cleanup), [TC-07](#tc-07--vendor-visibility), [BUG-01](#bug-01--custom-ticket-times-wrong-in-review), [OBS-02](#obs-02--tote-colours-missing-from-review).

### TC-01 — Presentation

**What this tests:** a believable one-evening market is saved in the existing Event. **Start here:** Christian Valdez → Organization 1786-Anime → Manage Events → Christmas Market → Basic info; Live/Event ID 650449, no tickets sold.

1. Save description, subtitle, tags and 4:45 PM doors while preserving name, dates, location and images. **Expected:** schedule and copy saved. **Actual:** initial save rejected because the 3 PM vendor start could not inherit later public doors. Exact validation: `Tickettype Set: Doors open at must occur before start date`. Check save status resolved the uncertain result before retry. Vendor doors were set to 2:45 PM, then Basic info saved successfully. Valid protection, not a product defect.
2. Reload and open the public Event. **Expected:** December 18, 2026,5–11 PM EST/doors 4:45 PM, exact subtitle, description, categories/tags and four notices. **Actual:** matched; no extra Event or branding edits.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/public-market-saved.jpg" width="600" alt="Completed public Christmas Market" />

### TC-02 — Ticket rules

**What this tests:** distinct entry/session rules and finite stock. **Start here:** same Organization/Event → Tickets; eight saved rows, zero sold.

1. Save each ticket's description, limits and selected dates through Continue and the owning Tickets Save. Reload/reopen. **Expected:** exact ticket table above; earlier First Look and vendor doors before their own starts; Twilight restricted to later entry; Workshop 6:30–7:15 PM. **Actual:** saved rows/IDs/prices/visibility/stock and selected schedules matched the saved-configuration ledger. Workshop sale end 6 PM retained after final waitlist correction.
2. Open BUY TICKETS. **Expected:** seven public types, each custom validity, group minimum 4, no Vendor. **Actual:** correct; First Look 4–11 PM, Twilight 8–11 PM, Workshop 6:30–7:15 PM. Checkout time display separately fails BUG-01.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/first-look-timing-saved.jpg" width="600" alt="Saved First Look timing" />

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/workshop-timing-saved.jpg" width="600" alt="Saved Workshop timing" />

### TC-03 — Questions

**What this tests:** the relevant purchaser sees operational questions without requesting child personal details. **Start here:** same Event → Order form; Standard Info, per-ticket collection OFF.

1. Save the three scoped questions and confirmation; reload, then open each question. **Expected:** Workshop-only required style with three choices; Group-only required name/max 60; optional three shopping interests on seven public types. **Actual:** each scope/required state/options and Group max read back. Required Box Office collection ON; collection stays before payment. No Customer answers or post-purchase messages submitted/delivered.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/order-form-saved.jpg" width="600" alt="Saved market order form" />

### TC-04 — Selling and waitlist

**What this tests:** discount scope, same-Event upgrade and Workshop queue settings. **Start here:** same Event → Discounts/Upgrades/Tickets/Tracking links.

1. Save and reopen HOLIDAY 10 and the Standard→First Look offer. **Expected:** GA-only discount and correct destination 1630077. **Actual:** exact scope/limits read back; one offer saved and present after navigation/reload. A too-early route reload opened an empty Create dialog; it was cancelled after confirming the existing row, and no duplicate was created.
2. Save/reopen Workshop waitlist. **Expected:** enabled, claim 2, CC verification OFF, additional cutoff blank. **Actual:** matched. Public sale cutoff remains custom 6 PM; no subscribers or allocation. Both Custom tracking links created, with seller-only display left blank.
3. Read the offer in TC-06's real refreshed Review. **Expected:** First Look destination with$10 difference and correct arrival wording. **Actual:** matched; upgrade action and discount redemption unrun.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/upgrade-saved.jpg" width="600" alt="Saved same-Event First Look upgrade" />

### TC-05 — Tote

**What this tests:** separate variants, stock, eligibility and pickup settings save. **Start here:** Christian Valdez,1786-Anime → Build → All products. Search Christmas Market first; no matching Product existed.

1. Create the owned tote, two variants, stock/SKUs, Event-only add-on association, fulfillment and pickup message. Reload the relevant pages. **Expected:** Product 2278 and variant table above; only Event 650449 eligible; electronic voucher/pickup, shippingOFF, transfersOFF. **Actual:** saved details, Inventory, selected Event relationship, fulfillment and communication message read back. No existing catalog records changed.
2. Select both variants in TC-06. **Expected:** Red 1 at 8 and Natural 1 at 10 reach the basket separately. **Actual:** both prices/quantities present; Remove confirmations later named each correct variant. Review omits their colour labels (OBS-02). This does not prove purchase or pickup.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/tote-inventory-saved.jpg" width="600" alt="Saved distinct tote variants and stock" />

### TC-06 — Mixed basket and cleanup

**What this tests:** all seven public types and both tote variants can reach a real refreshed basket and be removed. **Start here:** beta, Christian Valdez signed in; public Christmas Market for 1786-Anime. Checkout baseline verified **Oops! Your cart is empty!** Cleanup path established: Review → Remove → confirm the named item/quantity.

1. Open BUY TICKETS. Select GA 1, Early Bird 1, First Look 1, Twilight 1, Group 4, Little Elves 1 and Workshop 1. Wait for Checkout 10; open it. **Expected:**10 tickets, CAD 108 base subtotal. **Actual:** matched in checkout Add-ons.
2. Open the tote add-on, select Festive Red 1 and Natural Canvas 1, Add, then Continue to Review. Choose Will Call. **Expected:** nine lines/12 items; base 126. **Actual:** matched. The Will Call action initially returned a tool checked-state error during the asynchronous update; fresh UI confirmed it selected and retained after refresh. No duplicate action required.
3. Refresh checkout, Continue through optional Add-ons. **Expected:** all intended lines once, same quantities/prices, Will Call retained, correct upgrade difference. **Actual:** all present; quantities 1/1/1/1/4/1/1 tickets plus two distinct product lines 1 each. Base 126, Processing fee 21.45, Host fee 11, Service fees 10.72, QST 15.78, PST 0.88, displayed total 185.83 CAD. Base subtotal independently calculated; fees/taxes observed, not independently certified. Time and variant-label findings below remain failures/gaps, not hidden by the add pass.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/mixed-basket-review.jpg" width="600" alt="Refreshed mixed basket with two totes" />

4. Remove each run addition, checking the actual confirmation name before removal: Red 1, Natural 1, GA 1, Early Bird 1, First Look 1, Twilight 1, Group 4, Little Elves 1, Workshop 1. Refresh checkout. **Expected:** original empty basket restored. **Actual:** Oops! Your cart is empty! Workshop waitlist table then showed total 24/available 24/queue 0/hold 0. Product Inventory remained 50/40, both zero sold; Product Stats showed zero revenue/sold. Separate Product reservation counts were not exposed on inspected screens, so no independent reserved-count reconciliation is claimed. No unrelated items existed or were removed.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/basket-empty.jpg" width="600" alt="Original empty basket restored" />

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/workshop-stock-released.jpg" width="600" alt="Workshop available inventory back to 24" />

No Questions submission, legal acknowledgement, payment or order created. No discount usage, upgrade replacement, PDF issuance, scan, Refund, Exchange, report mutation or pickup executed.

### TC-07 — Vendor visibility

**What this tests:** setup access remains restricted to sellers. **Start here:** same Live Event → public BUY TICKETS; saved Vendor ticket is Sellers only.

1. Read the public picker. **Expected:** seven public types and no Vendor & Crew - Setup Access. **Actual:** passed. The Vendor type remained Sellers only with no scheduled visibility flip; actual seller basket/issuance not run.

## Findings

### BUG-01 — Custom ticket times wrong in Review

**Confirmed recurrence of the existing comedy finding; do not create a second Jira card for the same defect.** The copy-ready draft remains [[03 Test Cases/Events/comedy-event-hahaha-2-matching-configuration#BUG-01 — Checkout shows the wrong Workshop start|here]]. This market supplies additional cases showing earlier and later custom starts.

**Start here:** use TC-06 steps 1–3 with an empty owned beta basket. For minimum reproduction, select one of the three timed tickets, open Checkout and Continue past Add-ons; stop before Questions/payment, then remove that ticket.

1. **Expected:** Review First Look 4 PM, Twilight 8 PM, Workshop 6:30 PM, matching saved settings and public validity. **Actual:** all three show the parent Event's **5 PM** start, including after refresh. Main-show GA 5 PM remains the control. Full current evidence below.

<img src="../../99 Archive/QA Evidence/events/christmas-market-7-2026-11-12/timed-tickets-review-wrong-times.jpg" width="600" alt="Review shows 5 PM for all three differently timed tickets" />

**Classification:** confirmed display defect; confidence High; suggested severity Medium/P 2 because a Customer could arrive too early/late and miss an entry window or workshop. Affected proof TC-02 step 2/TC-06 step 3. Owned beta reservations only; cleanup completed in TC-06 step 4. No purchase/admission result or deployed revision proven. No-Go for the affected custom-time Review assertion; no overall release decision or financial certification. Local backend `Event.get_start_date(type=...)` prefers a ticket custom start; the previously traced shared frontend date display uses the Event start. No source edits or regression-cause claim.

### OBS-02 — Tote colours missing from Review

**Verified display omission; proposed improvement, pending Product expectation.** This is not evidence of wrong product fulfillment. Both actual variant names appeared in their removal confirmations and both correct prices/quantities persisted.

**What this tests / Start here:** TC-06 steps 1–3; the newly created tote has Festive Red and Natural Canvas variants. Add one of each from Add-ons and Continue to Review.

1. **Expected proof target:** Customer can identify each selected variant before purchase. **Actual:** both lines say only Christmas Market 7 - Reusable Tote; neither Festive Red nor Natural Canvas appears in the visible text or accessibility snapshot, before or after refresh. The$8/$10 prices differ, but colours are not shown. TC-06's mixed-basket screenshot shows this.
2. Remove each tote. **Expected:** confirmation identifies the selected colour. **Actual:**1x Festive Red and 1x Natural Canvas were shown and removed correctly. No purchase was completed.

**Draft only — no Jira issue created; proposed expectation needs Product confirmation.**

**Title:** fix (checkout) | Product Review lines omit the selected tote colours

**GIVEN** Christmas Market 7 - Reusable Tote has Festive Red and Natural Canvas variants available as add-ons for Christmas Market on beta under 1786-Anime.

**WHEN** I add one of each colour and Continue from Add-ons to Review, then refresh and return to Review.

**THEN** both lines show only the Product name, quantity and price, without their selected colours. Proposed: Review should also show Festive Red and Natural Canvas so the Customer can verify the chosen items before purchasing.

**Product question:** Is hiding the variant name on Review intended for ordinary Product add-ons? Local `ReviewItemGroup.web.tsx` passes `hideProductVariantName`; `ItemGroupProduct.web.tsx` conditionally omits the subtitle. This supports deliberate implementation but does not establish the intended product requirement or the deployed commit. ConfidenceHigh for the omission; product-defect classification remains Inconclusive until intent is confirmed. Suggested impact Medium for hard-to-distinguish variants. No financial/data-loss finding; reversible basket cleaned. No Jira duplicate search/write or source edits.

### Existing inherited content mismatch

The Organization refund policy and contact biography refer to FAN EXPO Cleveland. This was present before edits and remains inherited. Event override stayed blank; terms acceptance stayed OFF. It is a configuration mismatch in shared test data, not a reproduced product bug. No legal wording, contact information or shared Organization settings were invented/changed. Decide appropriate Event-specific policy separately if this data will be used for a realistic launch review.

## Copy-ready continuation handoff

> I created this setup; what do I do next? Existing beta **[Christmas Market](https://beta.showpass.com/christmas-market-7/)** ([editor](https://beta.showpass.com/manage/events/christmas-market-7/basic-info/)), **Event ID 650449**, Organization **1786-Anime**, parent **2218-chris-parent-org**; last verified November 12, 2026. One Event, no duplicates; already Live/Public, Dec 18, 2026,5–11 PM Toronto time. User confirmed readiness for this scope. No Admin, production, shared settings changes, legal acceptance, purchase, sends, Jira/Qase writes or source changes authorized/executed. Preserve images/branding and existing location.
>
> Eight tickets 1630075–1630082, three scoped questions, PDF/thermal/arrival wording, HOLIDAY 10/Discount 281276, one Standard→First Look offer, two Custom links, Workshop waitlist and Event-only **Product 2278** with Red/Natural tote variants are saved. Use the tables above; do not duplicate records. Final Workshop waitlist limit 2/CC verification OFF/additional cutoff blank retains the 6 PM custom sale end.
>
> **Actual basket proof passed:** all seven public types plus both tote variants, nine lines/12 items/CAD 126 base, survived refresh once with Will Call retained and$10 upgrade offer. All test additions removed, refreshed basket empty; Workshop available 24/24 and tote Inventory 50/40, zero sold. Public Vendor exclusion passed. Seller basket, code redemption, pressing upgrade, Question submission, purchase/fulfillment/printing/admission and full fee reconciliation remain unrun, not completed tests.
>
> First next action if investigating the flagged bug: follow BUG-01's linked draft/TC-06 with one timed ticket in an empty owned beta basket. Expected after a fix: its custom start in Review. Stop before Questions/payment; remove the ticket and verify empty. OBS-02 records missing tote-colour labels with a Product question; no wrong-variant purchase is proven. Shared refund/contact content still refers to FAN EXPO Cleveland and needs an explicit business decision if changing it. No further setup work is required for this scoped basket-ready scenario.

## Final results

| Result | Exact check / step | Limits |
| --- | --- | --- |
| Passed | [TC-01 steps 1–2](#tc-01--presentation) | Existing shared refund/contact mismatch retained |
| Passed — saved/public setup | [TC-02 steps 1–2](#tc-02--ticket-rules) | Actual scan/sale cutoff enforcement unrun; Review time fails BUG-01 |
| Passed — saved setup | [TC-03 step 1](#tc-03--questions) | Customer answers/receipt delivery unrun |
| Passed — saved/displayed setup | [TC-04 steps 1–3](#tc-04--selling-and-waitlist) | Code redemption, upgrade action, attribution and queue allocation unrun |
| Passed — setup/add/cleanup | [TC-05 steps 1–2](#tc-05--tote) | Product purchase/pickup unrun; labels need Product review |
| Passed — add/refresh/cleanup | [TC-06 steps 1–4](#tc-06--mixed-basket-and-cleanup) | CAD 126 base verified; fees observed only |
| Passed — public exclusion | [TC-07 step 1](#tc-07--vendor-visibility) | Seller basket/issuance Not run |
| Failed | [BUG-01 step 1](#bug-01--custom-ticket-times-wrong-in-review) | Three custom starts replaced by 5 PM in Review |
| Inconclusive product classification | [OBS-02 steps 1–2](#obs-02--tote-colours-missing-from-review) | Omission confirmed; proposed requirement awaits Product |

No selected setup or public-basket check remains blocked. Packages/extra Events, assigned seats, memberships, donation setup, shipping, processor/rate-card edits and full lifecycle/release testing were not added because this one-day market already supplies distinct supported journeys without those dependencies. Browser focus/input failures were tool/session issues; fresh same-browser tabs restored progress and old agent-created tabs were closed. No temporary scripts/dumps were created; screenshots remain local under the archive path above and are not for Git.
