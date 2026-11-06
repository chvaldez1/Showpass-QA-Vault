---
title: Generate Showpass Test Events
date: 2026-11-04
tags:
  - qa/prompt
  - qa/test-data
  - browser-testing
aliases:
  - Manual Event Generation Workflow
  - Event Generation Workflow
status: Manual creation from scratch tested and passed; 7 min 43 sec including final verification
---

# Generate Showpass Test Events

**Manually create a new Event from scratch in the user's already-signed-in Codex browser sidebar.** Use Create event and a blank form. The purpose is to reduce repeated work while exercising the same Event/TT creation flow, then flag any problems found along the way.

**Do not run a script, make direct API requests, start another login/session, clone an Event, or generate from a saved Event template unless the user explicitly requests that separate approach.** Saved local data is a reference for entering fields; it does not change the requested creation method. In this workflow, “repeat the test faster” means repeat the same manual journey with less repeated investigation and more efficient form entry.

Default to **beta**, or demo when requested. **Never access production without explicit authorization for the specific action**, including opening pages, authentication, API reads or database queries. Use the production exports already supplied locally; they do not authorize new production access.

Apply [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Interactive Browser Release Testing]] and [[06 Prompts/Example - Browser Testing]]. Use [[01 Repositories/Backend - web-app]] for missing behavior facts and [[01 Repositories/QA Automation - showpass-playwright]] only when relevant. Reuse source facts already established; do not repeat a broad source review for every Event.

## Separate local scripting work

When the user explicitly requests scripting, use the two local helpers below. This does not change the manual workflow later in this note. See [[04 Automation/Production Event Copy to Beta Investigation#Step 5 Prepare and verify the local Venue first|the source data, checks and limits]].

| Call | What it does |
| --- | --- |
| `copy_local_venue(input_path)` | Offline preview. Creates nothing. |
| `copy_local_venue(input_path, owner_email, apply=True)` | Creates FAN EXPO HQ USA, then MEGACON with a new local parent link. |
| `verify_local_venue(input_path, local_child_id)` | Reads and checks the existing local child and parent; creates nothing. |
| `copy_local_event(event_input, venue_id=local_child_id, apply=True)` | Creates a Location and Draft Event under the checked child Venue; no TTs. |

**Start in the normally configured local backend:** open a terminal in `/Users/christianvaldez/Documents/Showpass/repos/web-app`, activate its usual virtualenv and run `python manage.py shell`. Apply needs that Django shell, a running local database and an existing active local account. These instructions do not start services or repair the environment.

**Load the helper and preview — no data change:** paste this into the Django shell. The preview can also run in ordinary Python because it reads files only.

```python
import runpy
from pathlib import Path

vault = Path("/Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault")
data = vault / "outputs/refund-shipping-2026-10-13"
venue_input = data / "venue-18350-local-copy-input.json"
venue_tools = runpy.run_path(str(vault / "05 Tooling/scripts/copy-local-venue.py"))
copy_local_venue = venue_tools["copy_local_venue"]
verify_local_venue = venue_tools["verify_local_venue"]

copy_local_venue(venue_input)
```

If you already pasted the entire Venue helper into the Django shell, its functions are already defined; you can call `copy_local_venue` directly. **Do not call `_create_venue` directly.** It creates one row inside the public helper's transaction and skips the public environment/duplicate checks when called on its own.

**Create the two Venues — changes test data:**

```python
local_venues = copy_local_venue(
    venue_input,
    owner_email=input("Existing local login email: ").strip(),
    apply=True,
)
verify_local_venue(venue_input, local_venues["venue_id"])
```

Use Python **`True`**, not `true`. Pass the child input above; its `parent_input` file supplies FAN EXPO automatically. The email must match an existing active **local** account. The helper uses it for owner access and the parent's required registration recipient; it does not print the email. It refuses non-DEV/non-localhost databases and existing destination names.

**Create the Event separately — changes test data:** after Venue creation/verification succeeds, use the returned **local child** ID:

```python
event_tools = runpy.run_path(str(vault / "05 Tooling/scripts/copy-local-event.py"))
event_input = data / "event-1533087-local-copy-input.json"
event_tools["copy_local_event"](event_input, venue_id=local_venues["venue_id"])
local_event = event_tools["copy_local_event"](
    event_input,
    venue_id=local_venues["venue_id"],
    apply=True,
)
```

**Track the run:** both helpers print UTC timestamps, `STARTED`, the current action, new local IDs, saved-field checks, suppressed-job count and `COMPLETE` with elapsed seconds. Errors print `FAILED` with elapsed seconds and exception type, then preserve the exception/traceback. IDs marked `transaction open` are provisional. Read the final result and recheck existing records before retrying a failed create; never assume a row was saved or removed from an intermediate ID line. Output mixes progress messages and a final JSON summary; keep the returned dictionary for later calls.

The parent address mismatch is printed as a warning. Fees, flag rules and other related settings remain explicitly deferred and financially unverified; they do not block creating the basic Venue rows. Normal Django/database execution is **not yet tested**; previews and isolated checks do not establish a successful local copy.

## Copyable request

```text
Use [[06 Prompts/Generate Showpass Test Events]].

Manually create a NEW Event FROM SCRATCH in my signed-in beta/demo sidebar.
Use [saved data / selected TT]. Do the same creation journey as before,
but use the known data and batch field entry so it is faster.

Do not use a script, direct API requests, another login, Clone event,
or an existing Event/template to generate the new Event.

Check all required data first. If a required detail is missing, stop the
related work and ask for that exact detail. Otherwise create the new Event
and TT, include the requested fees/shipping/package settings, choose an
available image, save, and verify the result once after reopening.

Keep the new Event in Draft. Return its link and TT ID, timing, verified
settings, issues and anything not completed. Preserve earlier Events.
```

## 1. Read once and prepare the data

Read the request, this workflow, the relevant existing workflow files and the supplied data before interacting. Identify the selected Event/TT in local exports before asking the user to repeat it. Separate required unknowns from known data and deliberate omissions. Do not infer a package's included tickets or quantities from its name.

Have one compact field checklist ready:

| Part | Required input |
| --- | --- |
| Destination | beta/demo, signed-in employee, selected Organization and currency. Use the current sidebar session. |
| Event | New name, single listing versus recurring, dates, timezone, description, categories, visibility and requested limits. Preserve multi-day dates unless asked to change them. |
| Location | Full intended address. Reuse a matching saved Location as a prerequisite; this still creates the Event from a blank form. Add a Location only when no matching one exists. |
| TT | Name, price, capacity, limits, regular price/presale wording, sale window, ticket-specific dates, refund and transfer settings. |
| Delivery | Offered methods, shipping/handling amounts, charge methods, combinations, basket override and digital ticket with Will Call. |
| Fees | Requested effective fee/tax names, amounts/fractions, payer, payment methods and sale channels. Check inherited rules before adding a TT-only fee; do not change shared rates. |
| Guest information | Fields, per-ticket collection, before/after-payment setting, complete required questions/options and TT applicability. |
| Package, when selected | Parent TT; actual included TTs and their Events; quantities/ratios; barcode, child-transfer, guest-information, redemption and revenue settings. Gather required child TT data before package creation. |
| Image | Choose an available image without trying to match production perfectly. |

If required data is missing, ask once for the exact grouped missing details. State what is already known, what action is blocked and what will happen next. Do not invent defaults to make a package look complete or request another production read without authorization.

Show a short check table before live test actions, with the requested finishing point and retained-data plan. No extra approval round is needed for creation already authorized by the user.

## 2. Create a fresh Event manually

1. Open **Create event** from Your events. Start with the blank form; do not select Clone, a saved Event or Templates.
2. Choose **One event** for a single listing, including one spanning several days. Use recurring/showtime setup only when the data calls for it.
3. Enter the new name, matching Location, timezone, dates/times, description and categories together. Inspect the filled values once, then select **Create event**. Wait for the saved Draft before proceeding.
4. If adding a Location, use address search and select the correct suggestion, then verify the structured address. The inline **Add location** control opens/resets address entry; it does not separately save the Location. Submit the Event form to save the new setup.
5. Record the new Event identity/link and keep Draft status. Preserve earlier records. If the save fails or times out, check whether the new Event exists before retrying; do not create duplicates blindly.

## 3. Enter TT and dependent settings in batches

1. In **Tickets → Add ticket type**, enter the name, price, capacity and visibility together, then save.
2. Open the new TT once. Complete its **Basic info** settings together, including limits, display price/wording, sales window and custom ticket dates. Complete **Delivery & transfers** in the same editing pass where supported. Verify the visible values, select **Continue**, then save the Tickets page. Continue only applies the modal changes locally; the page Save persists them.
3. In the TT's **Custom fees**, inspect inherited rules first. Add only the missing requested TT fee with its amount, payer, channels and payment methods. Fee changes in this section save immediately. Closing the TT modal does not undo them; do not edit shared Organization rates to configure one TT.
4. In **Order form**, enter the known guest fields, collection settings and questions/options together. Bind questions to the new TT, not production IDs. Save once after the complete batch.
5. For a requested package, create the required new child Events/TTs from scratch, then use **Packages** to add the actual included tickets and settings. If a required relationship is missing, stop and ask; do not create a guessed package.
6. Choose one available media-library image in Basic info, select **Finish Cropping**, then **Save changes**. Do this once; use another available image if the exact source image is unavailable.

Use supported browser interactions. Batch independent field edits on the same stable form. After a page, modal or tab transition, collect only the state needed for the next action. If a control has no effect, inspect the current screen and use its visible control; do not repeat the same ineffective action or bypass the UI through an API/script.

## 4. Verify once and measure the same journey

After all saves settle, reopen the new Event and check the selected fields in one review pass:

- Event name, Draft state, dates/timezone, Location, categories and saved image.
- Exact TT name, price, capacity, limits, ticket/sale dates and requested delivery/transfer/refund settings.
- Effective fee/tax amount, payer, source and applicable channels/payment methods.
- Guest fields, required questions, complete options and applicability to the new TT.
- Package parent/children, quantities, barcode and revenue/guest settings when applicable.

Record actual mismatches and incomplete proof. A displayed value before saving is not a pass. Do not claim a matching checkout total, ticket delivery, scanning or exhausted inventory without separately authorized execution.

Time **fresh-form start → saved Event/TT/settings**, and record **final verification time** separately. Report total manual-flow time, any save failures/retries and workarounds. Keep out-of-scope detours separate. Only report a numerical speed improvement when the earlier comparable run was actually timed; otherwise report the new measured duration and the steps avoided.

The optimizations are: use the existing login, read the supplied data once, reuse known routes/controls and valid Location prerequisites, batch field entry/saves, choose one image, and do one final review. They are **not** a change of creation method or a reduction in requested configuration/verification.

## 5. Evidence and finishing point

Keep the new Draft as useful QA data unless cleanup was requested. Report its exact link and TT/package IDs. Do not publish, purchase, refund, issue tickets, delete or modify earlier records as a side effect.

Update the existing [[04 Automation/Production Event Copy to Beta Investigation|trial note]] with the new run, preserving earlier results and run dates. Follow the browser report template's numbered Expected/Actual steps, stable check IDs, real screenshots and final status table. Capture one useful screenshot per selected proof group rather than replaying mutations for evidence. Keep images local under the QA Evidence archive. A confirmed bug gets a local copy-ready draft; uncertain findings remain labelled.

The separately implemented API prototype under `05 Tooling/scripts/event-generator-*.mjs` is **not part of this manual workflow**. Do not run or extend it unless the user explicitly requests that separate work. Its failed login attempt does not block the signed-in manual workflow.

## Known data for the current trials

**Thursday trial:** [[outputs/refund-shipping-2026-10-13/megacon-beta-event-template.json|saved settings]] and the focused TT export already contain Event **1533087** and source TT **4422561 — THURSDAY ADULT - Single Day Pass**: USD **23**, capacity **20,000**, purchase/Box Office limit **100**, display regular price **34**, **Early Bird Pricing**, sale end **Jan 14, 2027 at 11:59 PM EST**, custom ticket end **May 20, 2027 at 9 PM EDT**, Standard shipping **15 / Flat rate**, Will Call **0 / Per item group type**, Processing Fee **3.70**, Sales Tax **6.5%**, and two required questions with eight options each. The Event itself spans **May 20 at 4 PM → May 23 at 5 PM, Eastern**. Use a new clearly named Draft; never retain production IDs as new record references.

**Later package trial:** source TT **4422570 — FRIDAY FAMILY PASS**, USD **85**, capacity **20,000**, regular price **117**, bundle true and custom package false. Its included-ticket relationships and package settings are still missing from the supplied data. Do not test this package until those details are available.

## Latest manual efficiency trial

On **2026-11-04**, created [MEGACON Orlando 2027 - Thursday manual trial](https://beta.showpass.com/manage/events/megacon-orlando-2027-thursday-manual-trial/basic-info/) from the blank Create event form in the existing signed-in beta sidebar. New TT **1628269**. The selected Event, TT, delivery, fee, question and image settings were checked after reopening and passed.

Measured from the first field entry: **50.1 seconds** to the saved Event; **5 min 49 sec** through all configuration saves; **1 min 54 sec** for the final review; **7 min 43 sec total**. The earlier run was not timed, so no percentage speed improvement is claimed. Workflow editing, discussion and the abandoned script/clone detours are excluded from this manual execution measurement and recorded separately in the trial note.

Six UI submission actions completed without a save failure: Create event, image Save changes, initial TT Save, TT details/delivery Save, fee Create and Order form Save. A Cash checkbox interaction needed its visible label before it selected; that was an input recovery, not a failed fee save. Category choices were entered as one batch, with the dropdown opened only when closed. No new login, production query or broad source investigation was needed for the corrected fresh run.
