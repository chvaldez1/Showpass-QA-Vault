---
title: Comedy Event (HAHAHA) — expanded single-day setup
date: 2026-11-09
tags:
  - qa/events
  - qa/browser-run
status: Configuration saved; purchase testing not run
---

# Comedy Event (HAHAHA) — expanded single-day setup

The requested beta Event now has seven ticket types, guest questions, a discount, two VIP upgrade offers, three tracking links and a VIP waitlist. The initial run below created six tiers. The [Event Builder skill test](#event-builder-skill-test--november-9-2026) added a separately timed workshop, VIP early doors and an Early Bird sale window. Saved settings were reopened, and the public Event and ticket picker were inspected. No purchase was made and no messages were sent. No product bug was confirmed.

## Setup and scope

- **Date/browser:** November 9, 2026, Codex in-app browser. Screenshots captured approximately 7:23–7:32 PM America/Edmonton. Deployed build and feature-flag values were not established.
- **Account:** Christian Valdez, signed in with working Event editing access. Exact employee permission assignments were not inspected.
- **Organization:** Organization For System Gateway Charge API, confirmed on the public Event page.
- **Event:** [Comedy Event (HAHAHA)](https://beta.showpass.com/manage/events/comedy-event-hahaha/basic-info/), already Live and Public. November 12, 2032, 7:00–8:30 PM America/Toronto, at 155 Wellington Street West, Toronto.
- **Authorization/retention:** User requested a richly configured single-day comedy Event. All added configuration is preserved for use and review. Original artwork, description, Event name, date, Location, inherited fees and refund policy were retained.
- **Finishing point:** Saved configuration and visible public presentation. Purchasing, payment/fee calculations, ticket delivery, discount redemption, upgrade purchases, waitlist fulfillment and actual printed tickets were not tested.

## Test index and plan

| Check | Starting screen | Action and expected proof |
| --- | --- | --- |
| [TC-01 — Event details](#tc-01-event-details) | Basic info | Add subtitle, doors time and tags; reopen and inspect public display. |
| [TC-02 — Tickets](#tc-02-tickets) | Tickets | Add five choices, descriptions and limits; save and inspect the public picker. |
| [TC-03 — Order form](#tc-03-order-form) | Order form | Save guest collection and three questions; reopen timing and ticket applicability. |
| [TC-04 — Advanced options](#tc-04-advanced-options) | Advanced options | Save customer limit, printed wording and metadata; reload. |
| [TC-05 — Discount](#tc-05-discount) | Discounts | Create a limited General Admission code; verify its saved listing. |
| [TC-06 — VIP upgrades](#tc-06-vip-upgrades) | Upgrades | Create two same-Event upgrade offers; verify a fresh listing. |
| [TC-07 — Tracking links](#tc-07-tracking-links) | Tracking links | Create three channel links; verify saved cards. |
| [TC-08 — VIP waitlist](#tc-08-vip-waitlist) | Tickets → Edit VIP → Waitlist | Enable and save limits; reopen and inspect the Waitlists screen. |
| [TC-09 — Important information](#tc-09-important-information) | Legal & important info | Save arrival notices; inspect the public Event. |
| [TC-10 — VIP timing](#tc-10-vip-timing) | Tickets → Edit VIP | Save early doors and a scan window; reopen exact values. |
| [TC-11 — Early Bird sale window](#tc-11-early-bird-sale-window) | Tickets → Edit Early Bird | Save explicit sale dates; reopen and inspect the public label. |
| [TC-12 — Workshop timing](#tc-12-workshop-timing) | Tickets → Add ticket type | Add one workshop with separate admission and timings; reopen and inspect public validity. |
| [TC-13 — Consistent customer wording](#tc-13-consistent-customer-wording) | Tickets / Order form / Legal & important info | Save consistent PDF, confirmation and public notices; reload and inspect public display. |

## TC-01 Event details

**What this tests:** The richer description of the show and its arrival time are saved and visible to Customers.

**Start here:** As an employee who can edit this Organization's Events, open Comedy Event (HAHAHA) and select **Basic info** from its section menu. Stop if the Event name or Organization differs.

1. Open **Advanced event details**, enter the subtitle below and select **Done**. Select **Add Open Time**, keeping November 12, 2032 and 6:00 PM. Add the three tags, select **Save changes**, then reopen Basic info and inspect **View event**.

   **Expected:** The subtitle and 6 PM doors time persist. Start/end remain on November 12 at 7–8:30 PM Toronto time.

   **Actual — Passed:** Saved and reopened. Public page shows the subtitle and correct start, end and doors times.

   - Subtitle: `One night. Big laughs. Your choice of comedy-night experience.`
   - Tags: `date-night`, `night-out`, `live-standup`.
   - The original Ryan Long description and both images remain.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/public-event.jpg" alt="Public Event showing saved subtitle, schedule and arrival notices" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:31 PM Edmonton; public display after saving.

## TC-02 Tickets

**What this tests:** Distinct admission choices save and appear correctly in the public ticket picker, while existing sold admission remains intact.

**Start here:** Open this Event's **Tickets** section. The original General Admission has seven sold, Inventory 100000 and base price CAD 34.95. Preserve those values.

1. Use **Add ticket type** for the five new rows below. Save, then use each new row's **Edit ticket type** to add its description and purchase limits. Select **Continue** and save the main Tickets page. Add PDF wording and set **Default End Sale Time** to **Start of the event**.

   **Expected:** Six saved ticket types with the listed prices, Inventory and visibility. Group admission requires at least four. Existing General Admission stays at CAD 34.95 with seven sold.

   **Actual — Passed:** Main list saved and reloaded. Group minimum 4 / maximum 12 / per-user 12 and VIP maximum 4 / per-user 4 were individually reopened. All five new descriptions are saved; four public descriptions were also read in the Customer picker.

   | Ticket type | Ticket type ID | Base price CAD | Inventory | Visibility | Configured limits per transaction / per customer |
   | --- | --- | --- | --- | --- | --- |
   | General Admission - Rush Seating — existing | 1629159 | 34.95 | 100000 | Public | Existing settings retained |
   | Early Bird - Rush Seating | 1629190 | 24.95 | 40 | Public | 6 / 6 |
   | VIP - Priority Entry | 1629191 | 49.95 | 30 | Public | 4 / 4 |
   | Group Night Out - 4+ Tickets | 1629192 | 29.95 | 80 | Public | Minimum 4, maximum 12 / 12 |
   | Accessible Admission | 1629193 | 34.95 | 12 | Public | 4 / 4 |
   | Staff & Industry - Complimentary | 1629194 | 0.00 | 16 | Sellers only | 2 / 2; Box Office limit 16 |

   Early Bird says **First 40 tickets**. VIP includes priority entry from 6 PM with rush seating; it does not promise assigned seats or a meet-and-greet. Group price is per person. Accessible admission asks guests to coordinate seating without supplying medical details. Comp admission is issued by authorized sellers. Icons: Ticket / Star / Users / Heart / User respectively.

   PDF message: `Doors 6 PM | Show 7 PM | Arrive together for rush seating.` PDF terms describe the one-day admission, complete-party arrival, no holding seats, one person/one scan and the VIP seating limitation. The no-ticket message directs Customers to check for released Inventory or contact the Organizer.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/tickets-final.jpg" alt="Saved ticket list with six choices and the original seven sold admissions" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:32 PM Edmonton; final saved list.

2. Open **View event → Buy Tickets**, without selecting a quantity or proceeding to checkout.

   **Expected:** Five public choices, with fees shown separately and the group minimum visible. Seller-only comps are absent.

   **Actual — Passed:** Five choices displayed. Customer totals shown: General Admission 39.05, Early Bird 28.13, VIP 55.41, Group 33.59 and Accessible 39.05 CAD. These are observed display amounts, not an independently verified fee calculation. No tickets were reserved or purchased.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/public-tickets.jpg" alt="Public ticket picker with admission descriptions, fees and minimum group quantity" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:31 PM Edmonton; no quantities selected.

## TC-03 Order form

**What this tests:** Guest collection, acknowledgements and ticket-specific questions retain their intended setup.

**Start here:** Open this Event's **Order form** section.

1. Turn on **Collect information after payment**, **Collect guest information per ticket**, and **Require box office information collection**. Keep **Standard Info**. Add the questions below, enter the post-purchase arrival message, save and reload. Open the saved acknowledgement and party-name questions to check timing and ticket selection.

   **Expected:** A required arrival acknowledgement remains before payment. Other information is collected after payment; the party-name question applies only to Group admission.

   **Actual — Passed:** All three switches and questions survived reload. The acknowledgement's **Require acknowledgement before payment** is checked and all six ticket types are selected. The required party-name question has only Group admission selected. This proves saved configuration, not execution of checkout or post-payment collection.

   | Question | Type | Requirement and scope |
   | --- | --- | --- |
   | Rush seating acknowledgement | One checkbox option | Required, before payment, all six ticket types. Option confirms complete-party arrival and no held seats. |
   | What brings you to the show? | Dropdown | Optional. Just here for the laughs / Date night / Birthday or celebration / Friends or team night out. |
   | Party name for group arrival | Short text | Required only for Group tickets; maximum 80 characters. Explains that naming the party does not reserve seats. |

   The post-purchase message repeats the date, 6 PM doors, 7 PM show, Toronto timezone, guest-information request and complete-party/VIP arrival directions.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/order-form.jpg" alt="Saved guest collection settings and three order-form questions" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/acknowledgement.jpg" alt="Reopened required acknowledgement with before-payment setting enabled" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:26 and 7:31 PM Edmonton; saved form and reopened timing.

## TC-04 Advanced options

**What this tests:** Event-wide limits and optional printed/integration wording save correctly.

**Start here:** Open **Advanced options** for this Event.

1. Set **Maximum tickets per customer** to 12, **Exchange cutoff override** to 24 hours, **Thermal ticket title** to `COMEDY EVENT (HAHAHA)` and **Thermal ticket message** to `Enjoy the laughs!`. Add the two custom display fields below. Select **Save changes** and reload.

   **Expected:** Those values remain saved.

   **Actual — Passed:** All values read back after reload. Exchange cutoff explicitly matches the previously inherited Organization value of 24 hours. Custom display fields are for integrations and do not appear automatically on the Showpass Event page. Actual thermal printing and external integration output were not run.

   - **Performance language:** `English`.
   - **Show format:** `Single-day stand-up comedy | 90 minutes | Rush seating | Doors 6:00 PM | Show 7:00 PM`.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/advanced.jpg" alt="Saved customer limit, thermal wording and event metadata" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:26 PM Edmonton; after reload.

## TC-05 Discount

**What this tests:** The new promotion saves with limited use and only the intended ticket selected.

**Start here:** Open **Discounts → Create Discount** for this Event.

1. Create `HAHA10`, 10% off, with General Admission as the only selected ticket. Set usage per customer 1, item limit per customer 4 and overall usage 50. Keep Box Office and Online public checkout enabled. Save and inspect the resulting list.

   **Expected:** Active code with 10%, usage 0/50, user limit 1 and item limit 4.

   **Actual — Passed:** Saved list shows those values. The five other ticket types were unchecked before saving. Starts Now; no separate expiry, with sales constrained by the Event's ticket availability. Code redemption, rounding and fee treatment were not tested.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/discount.jpg" alt="Saved HAHA10 discount with use limits" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:27 PM Edmonton; saved listing.

## TC-06 VIP upgrades

**What this tests:** Two same-show admission upgrade offers are saved with clear Customer wording.

**Start here:** Open this Event's **Upgrades → Create**.

1. Create General Admission → VIP and Early Bird → VIP paths, selecting **Comedy Event (HAHAHA), November 12, 2032** as both source and destination Event. Save each, leave the page and return to the Upgrades list.

   **Expected:** Both paths point to this Event's VIP ticket, with their custom offers.

   **Actual — Passed:** Fresh list shows both paths and the exact same Event/date. Titles are **Make it a VIP comedy night** and **Give your early-bird ticket a VIP boost**. The offers use `{{to_item_name}}` and `{{price_difference}}`, describe priority entry and retain the rush-seating limitation. General Admission button: **Upgrade to VIP**, solid style; Early Bird button: **Choose VIP**. Upgrade purchase and the actual computed difference were not tested.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/upgrades.jpg" alt="Fresh saved list showing General Admission and Early Bird upgrade paths to VIP" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:30 PM Edmonton; fresh listing.

## TC-07 Tracking links

**What this tests:** Separate promotion channels have saved Event-specific tracking links.

**Start here:** Open **Tracking links → Create tracking link**. Use **Custom** and leave seller-only ticket display empty.

1. Create the three descriptions below and inspect their resulting cards.

   **Expected:** Three saved links, with zero initial activity and no seller-only ticket exposed.

   **Actual — Passed:** Three saved cards and success messages. No links were distributed. Attribution after an actual purchase was not tested.

   | Description | Link |
   | --- | --- |
   | Comedy Night - Instagram | https://beta.show.ps/l/ca94ca52/ |
   | Comedy Night - Newsletter | https://beta.show.ps/l/42e3b7f7/ |
   | Comedy Night - Venue Posters | https://beta.show.ps/l/c71051b5/ |

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/tracking-links.jpg" alt="Three saved Event tracking links" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:29 PM Edmonton; saved cards.

## TC-08 VIP waitlist

**What this tests:** Only the new VIP ticket has the requested queue enabled, with a bounded claim quantity and cutoff.

**Start here:** Open **Tickets → Edit ticket type VIP - Priority Entry**, then use the modal section menu to select **Waitlist**.

1. Enable the waitlist. This switch saves immediately. Set **Ticket purchase limit** to 2 and **Cutoff time before event** to 4 hours. Leave **CC verification required** off. Select **Continue**, save the main Tickets page, inspect **Waitlists**, then reopen the VIP Waitlist settings.

   **Expected:** VIP appears on the Waitlists screen; enabled/2/4 values remain after reopening.

   **Actual — Passed:** Success message confirmed enabling. Waitlists shows VIP, Inventory 30, available 30, zero queued and zero on hold. Reopened settings show enabled, limit 2, cutoff 4 and credit-card verification off. With the show at 7 PM, the configured cutoff is 3 PM Toronto time. No Customer joined and no Inventory was allocated.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/waitlist-settings.jpg" alt="Reopened VIP waitlist showing limit two and four-hour cutoff" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:32 PM Edmonton; reopened settings. The final Tickets save succeeded.

## TC-09 Important information

**What this tests:** Saved arrival notices appear on the public Event without replacing the Organization's refund policy.

**Start here:** Open **Legal & important info** for this Event.

1. Add arrival notices under **Important info & restrictions**, save, reload and inspect **View event → Important Info**.

   **Expected:** Saved notices show publicly. The inherited refund policy remains unchanged.

   **Actual — Passed for the saved notices:** The two saved and public notices are **Arrive with your complete party** and **Doors 6:00 PM - Show 7:00 PM Toronto time**. Two additional attempted entries about rush seating and VIP were absent on readback; they are not counted as saved. The same information is already present in the retained Event description, new VIP description and PDF terms. Cause of the unsaved entries was not investigated; no product defect is claimed. Refund policy remains inherited: **Absolutely no refund.** No new terms-acceptance requirement was enabled.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-2026-11-09/important-info.jpg" alt="Saved arrival notices and inherited refund policy" width="600" style="max-width:100%;height:auto;">

   Beta, November 9, approximately 7:31 PM Edmonton; after reload. Public proof is also shown in TC-01.

## Initial run — original values and retained data

Before this work: one General Admission ticket; no subtitle, doors time, tags, custom questions, discount codes, upgrade paths, tracking links or waitlisted tickets. PDF terms/message and no-ticket message were blank. Guest collection was Standard Info with after-payment, per-ticket and required Box Office collection off. Post-purchase message was blank. Customer maximum, exchange override, thermal wording and metadata were blank. Default sale end was Event end. Important-info notices were empty.

Preserved: Event identity, single-day schedule, Location/timezone, Public/Live state, artwork, original description, existing seven General Admission sales and its price/Inventory. The original Inventory of 100000 remains intentionally; this was not a venue-capacity correction. Combined ticket Inventory is now 100178, with no Event-wide override. Existing fees/taxes, inherited no-refund policy, transfer inheritance and email settings were retained.

No test orders, payments, refunds, new recipients, allocated holds or messages were created. All new configuration is the requested deliverable and remains saved. Screenshots stay local and Git-ignored. No disposable exports or scratch scripts were created. No source repositories were edited. Final browser position: this Event's Tickets screen with Save disabled after success.

## Event Builder skill test — November 9, 2026

**New execution, not a rewrite of the initial results.** The user asked to test `showpass-beef-up-event` on this same Event after identifying ticket-specific times as a missing variation. This pass focused on that gap and reused the six existing tiers, questions, discount, upgrade paths, tracking links and waitlist. It did not duplicate those records or expand into shared Organization administration. Screenshots below were captured approximately 7:52–7:58 PM America/Edmonton.

The main Event remains November 12, 2032, 7:00–8:30 PM America/Toronto, with standard doors at 6:00 PM. The starting list again showed seven General Admission sales; all other tiers had zero sold. Only the unsold VIP/Early Bird settings and the new workshop received time changes.

| Ticket / experience | Doors | Start–end | Scan window | Custom sales | Price / Inventory |
| --- | --- | --- | --- | --- | --- |
| General Admission — unchanged | Inherits Event: 6 PM | Inherits Event: 7–8:30 PM | Unchanged | Unchanged | CAD 34.95 / 100000; seven sold |
| VIP - Priority Entry, 1629191 | **5:30 PM** | Inherits Event: 7–8:30 PM | **5:30–7:30 PM** | No new sale override; existing waitlist cutoff retained | CAD 49.95 / 30, unchanged |
| Early Bird - Rush Seating, 1629190 | Inherits Event: 6 PM | Inherits Event: 7–8:30 PM | Unchanged | **Opens Nov 9, 2026, 10 AM; closes Nov 5, 2032, 11:59 PM**, Toronto time | CAD 24.95 / 40, unchanged |
| Pre-show Comedy Workshop - Separate Admission, **1629195** | **5:45 PM** | **6–6:30 PM** | **5:45–6:15 PM** | Ends **Nov 12, 2032, 5:30 PM**; sale start inherits its creation/default | **CAD 14.95 / 20**, Public, max 4 per transaction and per customer |

Unless a different date is stated, times above are November 12, 2032 in Toronto. The Early Bird cutoff displays **EDT**, while the show/workshop display **EST**; these reflect the different dates. Workshop admission does **not** include the main show. Main-show admission does not promise workshop access.

### TC-10 VIP timing

**What this tests:** An unsold VIP tier can admit guests earlier while keeping the main performance time unchanged.

**Start here:** In this Event's **Tickets**, confirm VIP still has zero sold, then select **Edit ticket type VIP - Priority Entry → Basic info**. Stop rather than rewriting issued tickets if its sold state has changed.

1. Under **Ticket timing**, set **Custom door time** to November 12, 2032, 5:30 PM; **Custom scan start time** to 5:30 PM; and **Custom scan end time** to 7:30 PM. Leave custom performance start/end empty. Update the description to explain the 5:30 PM priority line and unchanged 7–8:30 PM show. Select **Continue**, save the main Tickets form and reload. Reopen VIP.

   **Expected:** All three custom times persist, while start/end remain inherited. The existing price, Inventory and limits stay intact.

   **Actual — Passed:** Reopened fields showed November 12 at 5:30 / 5:30 / 7:30 PM EST. Custom start/end remained empty. The public description also shows the earlier entry and unchanged show. No actual scan was attempted.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/vip-saved.jpg" alt="Reopened VIP custom door and scan times" width="600" style="max-width:100%;height:auto;">

### TC-11 Early Bird sale window

**What this tests:** The limited-price tier has explicit sale boundaries and clear public wording.

**Start here:** Open **Tickets → Edit ticket type Early Bird - Rush Seating → Basic info**. It has zero sold, CAD 24.95 and Inventory 40.

1. Set **Sale starts on** to November 9, 2026 at 10 AM and **Sale ends on** to November 5, 2032 at 11:59 PM Toronto time. Keep **Bypass sale starts on time in Box Office** off. Explain the first-40-or-cutoff rule in Description. Save through **Continue → Save**, reload and reopen.

   **Expected:** Both dates/times persist with the correct timezone labels. Early Bird price and Inventory are unchanged.

   **Actual — Passed:** Fresh fields show Nov 9, 2026, 10 AM EST and Nov 5, 2032, 11:59 PM EDT; bypass remains off. The public label was then shortened to **First 40 tickets** because Showpass automatically appends **ends on November 5**. Final public read confirmed the shortened label and the precise cutoff in Description. This proves setup/display, not enforcement at the future boundary.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/early-bird-saved.jpg" alt="Reopened Early Bird sale dates and times" width="600" style="max-width:100%;height:auto;">

   The saved-field capture precedes the final label shortening; the sale dates did not change. Final public label proof is in TC-12's second screenshot.

### TC-12 Workshop timing

**What this tests:** A separate same-day experience can retain its own advertised start/end, doors, scan window and earlier sales cutoff.

**Start here:** Open **Tickets** for Comedy Event (HAHAHA). Check whether **Pre-show Comedy Workshop - Separate Admission** already exists before adding a row; a rerun must reuse Ticket type ID 1629195.

1. Add that Public ticket at CAD 14.95 with Inventory 20. Save the new row, then select **Edit ticket type**. Set max transaction/customer quantities to 4. Describe the 30-minute workshop and explicitly exclude main-show admission. Set November 12, 2032 for custom start **6 PM**, end **6:30 PM**, doors **5:45 PM**, scan start **5:45 PM**, scan end **6:15 PM**, and sale end **5:30 PM**. Select **Continue → Save**, reload and reopen.

   **Expected:** All six date/time fields, description and limits persist; the main Event retains its 7–8:30 PM schedule.

   **Actual — Passed:** All selected dates/times read back exactly, along with both quantity limits of 4. New Ticket type ID: **1629195**. The main Event header remained 7 PM. Saved fee calculation was not independently tested.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/workshop-saved.jpg" alt="Reopened workshop start at 6 PM, end at 6:30 PM and doors at 5:45 PM" width="600" style="max-width:100%;height:auto;">

   The full reopened form was also read for the scan times and sale cutoff, which are outside this screenshot's visible portion.

2. Open **View event → Buy Tickets**. Inspect the workshop without selecting any quantities.

   **Expected:** A distinct public validity time of 6–6:30 PM, separate-admission wording, the workshop price and the usual other public tiers. Seller-only comps stay absent.

   **Actual — Passed:** Public picker shows **Valid only on Friday, November 12, 2032 6:00 – 6:30 PM EST**, CAD 14.95 + CAD 2.28 displayed fees, total CAD 17.23, and the workshop-only description. It shows six public choices; the comp remains absent. All six quantities remained zero and Checkout was disabled. No basket, payment, issued ticket or admission was created.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/public-tickets-final.jpg" alt="Final public ticket picker with the separately timed workshop and concise Early Bird cutoff label" width="600" style="max-width:100%;height:auto;">

### TC-13 Consistent customer wording

**What this tests:** Shared messages distinguish the workshop, VIP arrival and standard main show without changing the Event's main schedule.

**Start here:** Use this Event's **Tickets**, **Order form**, and **Legal & important info** sections. These are configuration edits; no emails are sent by this check.

1. In Tickets, save PDF message **Main show 7 PM | Workshop 6 PM | Check your ticket for your entry time.** Update PDF terms to explain workshop-only admission and ticket-specific entry times. In Order form, update the post-purchase message with the main show, standard/VIP doors, workshop schedule and separate admission. Save and reload.

   **Expected:** Saved PDF fields and confirmation text agree with the selected experiences.

   **Actual — Passed:** PDF message and terms read back on Tickets; confirmation text survived reload. Existing questions and collection switches remained. No actual receipt/PDF generation or delivery was executed. Workshop receives the Event's per-ticket guest collection; the existing main-show acknowledgement and Group-only question were not broadened to it.

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/confirmation-saved.jpg" alt="Reloaded confirmation message distinguishing all arrival and experience times" width="600" style="max-width:100%;height:auto;">

   PDF saved fields were also read in the final Tickets page; [full saved page](../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/tickets-final.jpg).

2. In Legal & important info, retain **Arrive with your complete party** and replace the general door notice with **Main show: standard doors 6:00 PM; show 7:00 PM Toronto time**. Add **VIP priority entry opens at 5:30 PM** and **Separate workshop: doors 5:45 PM; workshop 6:00-6:30 PM; main-show admission not included**. Save, reload and inspect the public **Important Info**.

   **Expected:** Four saved notices display publicly; inherited refund policy is unchanged.

   **Actual — Passed after correction:** All four notices were freshly read in the editor and public page. The first comma-containing attempt did not become a selected notice; subsequent Enter actions left the saved notices empty. The notices were restored and the revised entries successfully added using comma-free text and explicit selected-entry checks. Current ComboBox source only creates an Enter entry when input contains no comma. This run did not isolate whether the unintended saving was a product defect or an interaction consequence, so no bug is claimed. Final reload and public display prove the recovered state; no cleanup is left to the user. Refund policy remains **Absolutely no refund.**

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/notices-saved.jpg" alt="Four arrival notices read back after saving" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/events/comedy-event-hahaha-timing-2026-11-09/public-notices-final.jpg" alt="Public Event showing the four arrival notices and unchanged main schedule" width="600" style="max-width:100%;height:auto;">

### Follow-up retention and app reach

All requested changes remain saved. Seven tiers now exist, with combined Inventory **100198** and no Event override. Original General Admission still shows seven sold, CAD 34.95 and Inventory 100000. The main Event's date, standard doors and 7–8:30 PM time remain unchanged. Existing discount/upgrade/tracking records were retained rather than recreated; this pass did not retest their purchase behavior.

The selected additional reach is ticket scheduling, admission windows, sale periods, public selection, per-ticket guest collection inheritance, PDF configuration, confirmation wording and public information. Products, Packages, Membership benefits, automatic release, pay-what-you-can, new fees, additional clients, real scans and reports were deferred for this focused timing pass; no supporting shared records or transaction execution were requested. This is a successful skill run for configuration and public display, not a full-app test result.

Final browser position: Event Tickets, Save disabled. No extra tabs were created or unrelated tabs inspected. No transactions, sends, allocated holds, barcode captures, exports or scratch files were created. Evidence stays local and ignored by Git. Earlier execution and screenshots above are historical; the new sections describe the final state.

## Source notes and limits

Backend fields reviewed in [Event model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py>) and [Ticket Type model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py>); frontend Event page wrappers and the matching live controls supplied navigation and wording. Backend distinguishes custom scan limits from the default: entering 1 was rejected with **Minimum custom scan limit is 2, to set back to 1 clear field and save.** The field was cleared, preserving the default one scan. This was normal validation, not a bug.

Timing pass source: [display schedule](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/value_objects/display_schedule.py>), [ticket serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/ticket_types.py>), [frontend date rules](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/basic-info/datetime-validation-rules.ts>) and same-day clock-flexibility tests, plus [ComboBox Enter handling](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/components/ui-kit/form/ComboBox/ComboBox.web.tsx:518>). Backend resolves custom door/start/end separately and validates chronological order; scan end must be after scan start. The existing VIP waitlist cutoff takes precedence over custom/default sale end. This pass did not add a VIP sale-end override.

No claim of release readiness or end-to-end financial correctness: purchases, fee allocation/revenue, discount application, upgrades, form completion, waitlist processing, printing and notification delivery remain unrun. Assigned seating was not added because this is a rush-seating show. Packages involving other Events, Organization-wide changes, custom fees, donation recipients and external integrations were not added because they need additional business setup beyond this Event.

## Results

The requested saved setup is ready for review/use in beta. The checks below prove configuration and public presentation only. TC-01–09 retain the initial run's results; TC-10–13 record the later skill test and current timing setup.

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 — Event details, step 1](#tc-01-event-details) | Passed | — | Subtitle, tags and doors time saved; public schedule remains one day. |
| [TC-02 — Tickets, steps 1–2](#tc-02-tickets) | Passed | — | Six saved tiers, five public choices; group minimum shown; original seven sales retained. |
| [TC-03 — Order form, step 1](#tc-03-order-form) | Passed | — | Three questions and collection settings saved; acknowledgement timing and Group scope reopened. |
| [TC-04 — Advanced options, step 1](#tc-04-advanced-options) | Passed | — | Limit, 24-hour exchange override, thermal text and metadata persisted. |
| [TC-05 — Discount, step 1](#tc-05-discount) | Passed | — | Active HAHA10 listed with saved use limits; redemption unrun. |
| [TC-06 — VIP upgrades, step 1](#tc-06-vip-upgrades) | Passed | — | Both same-Event paths read from a fresh list. |
| [TC-07 — Tracking links, step 1](#tc-07-tracking-links) | Passed | — | Three links created; no distribution or purchase attribution test. |
| [TC-08 — VIP waitlist, step 1](#tc-08-vip-waitlist) | Passed | — | Enabled/2/4 settings reopened; VIP listed with zero queue. |
| [TC-09 — Important information, step 1](#tc-09-important-information) | Passed | — | Two notices saved and displayed. Two extra attempted entries did not persist and are excluded. |
| [TC-10 — VIP timing, step 1](#tc-10-vip-timing) | Passed | — | Custom doors and scan window reopened; main-show start/end still inherited. |
| [TC-11 — Early Bird sale window, step 1](#tc-11-early-bird-sale-window) | Passed | — | Sale dates/times reopened, bypass off and public cutoff label corrected. |
| [TC-12 — Workshop timing, steps 1–2](#tc-12-workshop-timing) | Passed | — | New tier and six custom dates/times persisted; public picker shows the 6–6:30 PM validity. |
| [TC-13 — Consistent customer wording, steps 1–2](#tc-13-consistent-customer-wording) | Passed | — | PDF/confirmation fields saved; four notices recovered, saved and visible publicly. |
| [TC-10–13 — Future timing enforcement and delivered artifacts](#event-builder-skill-test--november-9-2026) | Not run | — | No time-bound purchase/scan, issued PDF, receipt delivery or financial reconciliation. |
| [TC-02–08 — Purchases and downstream processing](#source-notes-and-limits) | Not run | — | No transactions, form submission, discount redemption, upgrade sale, fulfillment, attribution or printing requested/executed. |
