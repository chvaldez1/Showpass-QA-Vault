---
title: Events — Page-by-page test cases
date: 2026-10-17
tags:
  - qa/test-cases
  - events
  - qase
aliases:
  - Event Management Existing and New Qase Cases
  - Event Management Qase Mapping
  - Event Management Existing Qase Gap Analysis
  - Event Management New Qase Gap Analysis Cases
status: Published and verified 2026-10-17; manual definitions not executed
---

# Events — Page-by-page test cases

> [!note] Generated attachments removed
> Generated snapshots, JSON exports and frozen publication copies were deleted on 2026-10-17 at the user’s request. Published case IDs, recorded results and test definitions remain in this note. Read Qase again before preparing future changes.

## Current page parity review — 2026-10-17

**Result:** published **nine distinct gap cases (SPT-5720–5728)** and enhanced **SPT-5072 / SPT-5500** on October 17, 2026. The Events tree now contains **325 cases across 52 suites including the root**. Every destination page and the template-generation action is mapped; existing shared tests are linked rather than copied. These are published definitions, not executed product tests. Event seller commissions and Delete Event/archive remain unresolved migration-access risks.

**Scope:** base page workflows and notable migration edges. Fee cases are in Financial settings1134 and Custom fees1135; live-stream cases are in1145. Scheduled-publication cases are directly in top Events79, as requested. Existing enhancements remain in820 and184. No case or suite was moved, copied or deleted; no new suite was created.

**Publication proof:** both batch dry runs passed. Readback verified all written case fields, parameters, tags, suite placements and eight description-only link updates. The project has **2,192 cases /317 suites**; **2,181 unrelated cases** are unchanged. Existing case priority/type/behavior/layer and unrelated metadata were preserved. See case ID map, case receipt and final verification. The root suite description contains the complete page index and shared-test links.

## Reuse existing tests — do not copy them

| New event page / entry | Link to existing coverage | How to reuse it |
| --- | --- | --- |
| Promote → Discounts | [SPT-1743 create](https://app.qase.io/case/SPT-1743), [SPT-1759 edit](https://app.qase.io/case/SPT-1759), [SPT-3480 filter](https://app.qase.io/case/SPT-3480); [SPT-1749 auto create](https://app.qase.io/case/SPT-1749), [SPT-1761 auto edit](https://app.qase.io/case/SPT-1761), [SPT-3481 auto filter](https://app.qase.io/case/SPT-3481) | Start at the selected event’s Discounts page. Keep its fixed event context when clearing visible filters; do not invent a hidden Event selector. Preserve the original global-entry run. Repair3480’s shifted/blank results in that original case; no duplicate is needed. |
| Operations → Waitlists → type row | [SPT-4224 list/cards](https://app.qase.io/case/SPT-4224), [SPT-4225 filters](https://app.qase.io/case/SPT-4225), [SPT-4226 Subscribers](https://app.qase.io/case/SPT-4226), [SPT-4374 Stats](https://app.qase.io/case/SPT-4374) | Open this event’s waitlisted type, then its Subscribers/Stats tab. Record this event/type’s expected rows/totals; use only filters actually offered. Existing organization-wide entry remains part of the original tests. |
| Operations → Check in | [SPT-5500 event handoff](https://app.qase.io/case/SPT-5500) | Enhance this existing case for the new editor/native destination; link it from event suite1140 without copying or moving it. |
| Promote → Upgrades | [SPT-4291 create](https://app.qase.io/case/SPT-4291), [SPT-4297 list/filter](https://app.qase.io/case/SPT-4297), [SPT-4296 delete](https://app.qase.io/case/SPT-4296) | Use the event’s Upgrades entry and verify the selected source event remains correct. Add an entry-point variation to the original case if needed; do not recreate the same create/edit steps under Events. |
| Operations → Publish event | [SPT-5073 draft/reopen/publish](https://app.qase.io/case/SPT-5073), [SPT-764 create/publish](https://app.qase.io/case/SPT-764), [SPT-4874 validation](https://app.qase.io/case/SPT-4874) | Update legacy navigation/creation assumptions in the original cases while retaining their workflows. Immediate publication gets no new duplicate; only previously uncovered scheduled publication/cancellation received new cases. |
| Operations → Request publish | [SPT-4704 form/autosave](https://app.qase.io/case/SPT-4704), [SPT-4705 submit](https://app.qase.io/case/SPT-4705), [SPT-4712 approval block](https://app.qase.io/case/SPT-4712), [SPT-4716 shell actions](https://app.qase.io/case/SPT-4716) | Link these shared Workflow Approval cases from the conditional event-page folder; keep949 as their home. |
| Settings → Live stream | [SPT-4877 online/room setup](https://app.qase.io/case/SPT-4877), [SPT-3291 purchased-ticket access](https://app.qase.io/case/SPT-3291) | Reuse positive setup/access. Only the additional required-input, clear-provider and organization/recurrence guard gaps receive [SPT-5724](https://app.qase.io/case/SPT-5724), [SPT-5725](https://app.qase.io/case/SPT-5725), [SPT-5726](https://app.qase.io/case/SPT-5726). |
| Financial settings / Custom fees | [SPT-5526 organization fee payer](https://app.qase.io/case/SPT-5526), [SPT-5517 rate edit](https://app.qase.io/case/SPT-5517), [SPT-5522 card removal](https://app.qase.io/case/SPT-5522), [SPT-5525 restricted access](https://app.qase.io/case/SPT-5525) | These are shared controls/legacy organization baselines, **not proof of event inheritance or after-sales locks**. [SPT-5720](https://app.qase.io/case/SPT-5720), [SPT-5721](https://app.qase.io/case/SPT-5721), [SPT-5722](https://app.qase.io/case/SPT-5722), [SPT-5723](https://app.qase.io/case/SPT-5723) address only those distinct event behaviors. Link5525 for the permission baseline; extending its original entry-point coverage is preferable to another permission-test copy. |

The nine new published cases protect distinct event-specific inheritance, locking, clearing/validation or scheduling outcomes. They were not created merely to fill an empty folder. Shared links mean reusable coverage; a legacy-only instruction still needs its original case adapted before a native execution can be claimed.

## Shared navigation and Operations → Check in — published enhancements

### SPT-5072: Dashboard - Events - Open every applicable page for the selected event type

**Publication status:** Enhanced in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 820.

**Title:** Dashboard - Events - Open every applicable page for the selected event type

**Description:** Verify navigation separately from editing. Editor Legacy uses the existing Edit Event page and its section links; Nextjs uses the event page menu grouped as Event, Manage, Promote, Operations, Settings, Stats and Admin. PublishedEvent is a single active event. RecurringParent is an active series with at least two dates. DraftEvent is an unpublished single event; RecurringChild is one dated occurrence; EventTemplate is a template. Run every EventType with both Editor values.

| EventType | Legacy navigation | Nextjs navigation |
| --- | --- | --- |
| PublishedEvent | Overview; Edit sections; Manage; Promote; Reports; View Event | All applicable non-template page groups; Live stream is conditional; no publish/request action for an already active event |
| RecurringParent | Published-event groups; recurring date controls; no Live Stream | Published-event groups except Upgrades and Live stream |
| DraftEvent | Overview/Edit/Manage/Promote/Reports; no Email Guests, Check In, Waitlist or Attraction configuration | Email guests hidden; other non-template pages remain listed subject to role/module; Request publish or Publish event follows approval state |
| RecurringChild | Edit and applicable Manage actions; no Overview/Promote/Reports/View Event; no parent-only financial/seller/attraction/live controls | Basic info, Tickets, Order form, Advanced options; Operations except Clone/Cancel/Publish; Branding, Email customization, Stats & Info; Seating only with an existing map; no Legal/Donations/Financial settings/Custom fees/Promote/Edit attraction/Overview/Internal fees |
| EventTemplate | Edit and Generate Events only | Manage contains Basic info, Tickets, Legal, permitted Order form/Donations/Financial settings/Custom fees, Advanced options, Generate Events and Clone template; no Event/Promote/Operations/Settings/Stats/Admin pages |

Nextjs page checklist: Overview; Basic info; Tickets; Legal & important info; Seating; Order form; Donations; Financial settings; Custom fees; Advanced options; Discounts; Tracking links; Packages; Upgrades; Sellers; Facebook; Email guests; Check in; Transactions; Waitlists; Clone event; Cancel event; Live stream; Branding; Email customization; Edit attraction; Stats & Info; Internal fees. Include visible Request publish, Publish event, Generate Events and Clone template for their eligible states. Open every applicable checklist entry once; a title or placeholder alone is insufficient. Do not submit any action or save a form.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Conditional entries: Order form requires enable_nextjs_order_form active for this employee/organization; Donations needs Manage Transactions plus a supported CAD/USD system gateway; Custom fees needs configured fee structure and Manage Transactions; Live stream needs is_virtual_experience_organizer and a non-recurring event; Internal fees needs authorized internal-admin access. Request publish/Publish event follow the recorded draft approval state.

**Preconditions:**

* Employee permissions: Manage Events, Manage Transactions, Scan Tickets and Select Items to Scan. Use the correct organization and record its name. Internal fees is checked separately with an authorized internal administrator; ordinary employee runs must not expose it.
* Have owned records for EventType and a known comparison event. For RecurringChild, record whether it already has a seating map. Prepare both editors through supported visible entry links; record their saved addresses privately.
* Record the applicable gates before running: enable_nextjs_order_form flag, configured fee structure, donation eligibility, is_virtual_experience_organizer, allow_auto_discount and event-approval policy. Enable the required feature only through approved setup; do not change gates while navigating.
* For a legacy configured page requiring an additional gate, record branding_hub, enable_waitlist_configuration_ui, attraction_event_config and attraction eligibility. Record which legacy functions are intentionally unavailable for this record.
* A setup owner records the expected event name/occurrence and permitted destination for each visible checklist entry. Draft states must not be published, generated, cloned or cancelled by this case.

**Postconditions:**

* Return to the initial event/editor with all drawers closed. No record, email, publication, scan, refund or setting is changed.

**Priority:** High

**Tags:** dashboard, events, edit-event

**Parameters:**

EventType: PublishedEvent, DraftEvent, RecurringChild, EventTemplate, RecurringParent
Editor: Legacy, Nextjs

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Build → Events for Nextjs or Dashboard → Manage Events for Legacy, then open the prepared EventType. |  | The recorded event or occurrence is selected in the correct organization. |
| Compare visible groups and actions with the EventType table and recorded gates. |  | Each expected applicable entry is reachable; unsupported entries follow the table. Any new/legacy difference is recorded explicitly rather than treated as proof of equivalent behavior. |
| Open every applicable checklist entry from its visible menu, returning to this event between entries. |  | Each destination retains the event/occurrence and offers its actual controls or a specific supported restriction; a placeholder, broken link or unrelated organization-wide screen is recorded as missing functional access. |
| For EventTemplate, open Generate Events and close it; in Nextjs only, also open Clone template without submitting. | For other EventType values, this template-only step does not apply. | The intended template is retained and no event is generated or cloned. |
| Open View Event when offered, then return using Back or Manage All Events. |  | The public page or allowed preview belongs to this event, and the event list returns without changing it. |

### SPT-5500: Dashboard - Events - Open Check In from the selected event in either editor

**Publication status:** Enhanced in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 184.

**Title:** Dashboard - Events - Open Check In from the selected event in either editor

**Description:** Preserve event selection while opening Check In. EntryPath LegacyToLegacy starts in legacy Edit Event with the organization-scoped enable_check_in_nextjs_embed flag off and no employee preview opt-in. LegacyToNextjs starts there with that embed enabled. NextjsToNextjs starts in the new event editor and uses Operations → Check in. EventKind Single uses one event; Recurring uses a parent with at least two occurrences. Run all six combinations without scanning or saving presets.

Legacy Check In opens its filter dialog; Nextjs opens Scan setup. Both must preselect the event’s redeemable ticket types, or the recurring parent’s eligible occurrences and types. These are different starting pages leading to the same selected ticket scope.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: Manage Events, Scan Tickets and Select Items to Scan.
* Have a known controlled purchase and redeemable ticket type in the selected event; for Recurring, have purchases/types in at least two occurrences. Record their event/type names and an unrelated event as an excluded control.
* The setup owner prepares EntryPath’s flag/preview state and supplies supported editor access. No flag, item or preset is changed during execution.

**Postconditions:**

* No event, purchased item, preset or admission data is changed.

**Priority:** High

**Tags:** dashboard, events, check-in

**Parameters:**

EventKind: Single, Recurring
EntryPath: LegacyToLegacy, LegacyToNextjs, NextjsToNextjs

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared event using EntryPath’s event editor. |  | The correct event and its Check In entry are shown. |
| Select Check In in the legacy editor, or Operations → Check in in the new editor. |  | The mapped filter dialog opens with the selected event or the recurring parent’s occurrences and ticket types already selected. |
| Inspect the selections, then select Continue and open Tickets. |  | The prepared purchases are available; the unrelated event is excluded and no admission is created. |

## Manage → Financial settings — current candidates

### SPT-5720: Dashboard - Events - Save event service-fee choices without changing ticket overrides

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 1134.

**Title:** Dashboard - Events - Save event service-fee choices without changing ticket overrides

**Description:** Open Manage → Financial settings and save the two service-fee choices for one event. ProcessingFee maps CustomerPays to Customer Pays Processing Fee, Absorb to Absorb Processing Fee, and Inherit to Use Organization Settings. ShowpassFee uses the equivalent Customer Pays Showpass Fee, Absorb Showpass Fee and Use Organization Settings labels. Run all nine pairings; this proves saved configuration, not collected fees or earnings.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: Manage Events and Manage Transactions for the selected organization. Complete required authentication.
* Use an owned single event with no orders, sales or active customer carts, in an organization using configured fee structure. Record its original settings and those of a second unchanged event.
* Record the organization’s Processing/Showpass defaults. Prepare two paid ticket types: one inherits both event fee choices, and one has explicit ticket-level choices. Record both types’ prices, inventory, fee choices and the event’s name and dates.

**Postconditions:**

* Restore only the changed event values and reopen them to verify restoration. Do not change organization defaults or erase orders/history.

**Priority:** High

**Tags:** dashboard, events, fees-taxes

**Parameters:**

ProcessingFee: CustomerPays, Absorb, Inherit
ShowpassFee: CustomerPays, Absorb, Inherit

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Build → Events, select Edit for the prepared event, then Manage → Financial settings. |  | The event’s Service Fee Settings show both selectors, all three choices and their Organization Default labels. |
| Choose ProcessingFee and ShowpassFee, then select Save. | Use the Description mapping. | Saving finishes for the same event without a second submission. |
| Leave the page and reopen Financial settings. |  | Both saved choices remain selected; Inherit remains Use Organization Settings rather than becoming a copied fixed value. |
| Open Tickets and inspect each prepared ticket type’s financial choices. |  | The explicit ticket-level choices, prices and inventory remain unchanged; the inheriting type still inherits its event choices. |
| Open Basic info for this event and then the comparison event’s Financial settings. |  | The first event’s name/dates and the comparison event’s original fee choices remain unchanged. |

### SPT-5721: Dashboard - Events - Lock event financial changes after sales

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 1134.

**Title:** Dashboard - Events - Lock event financial changes after sales

**Description:** After a ticket sale, verify the event’s fee controls remain locked. FeePage FinancialSettings opens Manage → Financial settings; CustomFees opens Manage → Custom fees. This checks the new pages’ editing lock and preservation of a known order, without attempting another sale or refund.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: Manage Events and Manage Transactions for the selected organization. Complete required authentication.
* Use an owned event with one existing controlled paid order whose ticket contributes to the sold-ticket count, in configured fee structure. Record its order total, fee breakdown and original event fee settings.

**Postconditions:**

* No event, fee, order or ticket is changed.

**Priority:** High

**Tags:** dashboard, events, fees-taxes

**Parameters:**

FeePage: FinancialSettings, CustomFees

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared event and select FeePage from Manage. |  | The page identifies the correct event and displays its saved fee values. |
| Inspect available editing controls. | FinancialSettings: both fee selectors and Save. CustomFees: fee/rate-card editing actions. | Financial settings shows its after-sales warning and disabled selectors/Save; Custom fees does not allow changing or adding event fee values. |
| Leave and reopen the page, then reopen the recorded order. |  | The saved configuration and order’s recorded amounts are unchanged. |

## Manage → Custom fees — current candidates

### SPT-5722: Dashboard - Events - Override an inherited custom fee for one event


Latest published enhancement: FeeScope Event/Ticket; see [the current Tickets definition](02%20Manage/02%20Tickets.md). The earlier event-only wording below is retained as publication history.
**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 1135.

**Title:** Dashboard - Events - Override an inherited custom fee for one event

**Description:** From Manage → Custom fees, create an event override of an inherited organizer fee. A rate card is the saved amount, percentage and application rules for that fee. Verify that the override belongs to this event while the organization and a second event retain their original rates.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: Manage Events and Manage Transactions for the selected organization. Complete required authentication.
* Use an owned single event with no orders, sales or active customer carts, in an organization using configured fee structure. Record its original settings and those of a second unchanged event.
* Choose one inherited organizer fee with Fixed amount and Percent controls, applying to tickets. Record its original amounts, application rules and payer. Use a fee reserved for these checks; no customer can buy either event while it is changed.

**Postconditions:**

* Remove only the override created for this event with its Delete rate card action and confirmation; verify the original inherited fee returns. Keep the parent fee and comparison event unchanged.

**Priority:** High

**Tags:** dashboard, events, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Manage → Custom fees and locate the recorded inherited rate card. |  | Its source, amount/percent, item/sale/payment rules and payer match the recorded parent rule. |
| Select Override on that rate card. |  | Override rate card opens for the selected fee and event. |
| Set Fixed amount to 2.00 and Percent to 0, leaving the recorded application rules and payer unchanged; select Save override. |  | One override is saved for this event. |
| Leave and reopen Custom fees, then open this event’s Financial settings. |  | The event override remains 2.00 plus 0%; the financial summary agrees with the same event’s fee rule. |
| Inspect the organization’s fee and the comparison event’s inherited rate. |  | Their original amount, percentage and rules remain unchanged. |

### SPT-5723: Dashboard - Events - Restore the inherited event fee by removing its override


Latest published enhancement: FeeScope Event/Ticket; see [the current Tickets definition](02%20Manage/02%20Tickets.md). The earlier event-only wording below is retained as publication history.
**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 1135.

**Title:** Dashboard - Events - Restore the inherited event fee by removing its override

**Description:** Remove an event-only rate-card override, then verify the inherited parent rate becomes effective again. The parent fee definition must survive. This is a distinct inheritance result from creating an override.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: Manage Events and Manage Transactions for the selected organization. Complete required authentication.
* Use an owned single event with no orders, sales or active customer carts, in an organization using configured fee structure. Record its original settings and those of a second unchanged event.
* Have an event-only override created and approved for removal, with no orders or carts using it. Record its values and the parent rate, which must differ. The parent definition and rate are not approved for deletion.

**Postconditions:**

* Retain the inherited event configuration after the approved override removal. Verify the parent definition and comparison event are unchanged.

**Priority:** High

**Tags:** dashboard, events, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Manage → Custom fees and locate the recorded event override. |  | The selected rate belongs to this event, not the parent organization. |
| Open that rate’s menu and select Delete rate card. |  | The confirmation explains that the inherited rate will become visible again. |
| Confirm Delete rate card for this event override only. |  | The event-only override is removed and the inherited rate is shown. |
| Leave and reopen Custom fees and Financial settings for the same event. |  | Both show the recorded inherited amount/rules; the parent definition and second event retain their original values. |

## Settings → Live stream — current candidates

### SPT-5724: Dashboard - Events - Require connection details before saving a live stream

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 1145.

**Title:** Dashboard - Events - Require connection details before saving a live stream

**Description:** With a provider selected, reject one MissingField per run. VideoId leaves Video ID blank while selecting a ticket type. AllowedTypes supplies the approved video ID but leaves Allowed ticket types empty. A rejected save must preserve the earlier saved connection.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned non-recurring event in an organization with is_virtual_experience_organizer on, no active broadcast and no save in progress. Record an existing valid provider/video/allowed-type configuration and an approved video ID for correction.

**Postconditions:**

* Restore any successfully corrected configuration to the recorded baseline, save and reopen; no broadcast is started.

**Priority:** High

**Tags:** dashboard, events

**Parameters:**

MissingField: VideoId, AllowedTypes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Settings → Live stream and apply MissingField. |  | Exactly the selected required input is empty while a supported provider remains selected. |
| Select Save. |  | VideoId shows Video ID is required when a provider is selected; AllowedTypes asks for at least one allowed ticket type. No successful save is reported. |
| Leave without saving and reopen Live stream. |  | The earlier valid saved connection and allowed types remain unchanged. |
| Supply all required values and save once, then reopen. |  | The corrected connection is accepted and retained, without another event or duplicate connection. |

### SPT-5725: Dashboard - Events - Remove a live-stream connection by selecting None

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 1145.

**Title:** Dashboard - Events - Remove a live-stream connection by selecting None

**Description:** Choose None for Provider on an event with a saved stream, then reopen the page. The saved video connection and all ticket stream-access selections must be cleared rather than retained invisibly.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned non-recurring event with is_virtual_experience_organizer on, a saved supported provider/video and at least one allowed ticket type. It has no active broadcast, purchases or save in progress. Record the original connection for restoration.

**Postconditions:**

* Restore the recorded provider, video ID and exact allowed types, save and reopen; do not start a broadcast.

**Priority:** High

**Tags:** dashboard, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Settings → Live stream and choose None for Provider. |  | The form shows no provider; Video ID and Allowed ticket types are no longer required. |
| Select Save once, then leave and reopen Live stream. |  | Provider remains None, Video ID is blank and no ticket type remains allowed for stream access. |
| Reopen Tickets to compare prices/inventory, then return to Live stream. |  | Ticket prices and inventory remain unchanged; Allowed ticket types remains empty after reopening. |

### SPT-5726: Dashboard - Events - Block live-stream settings for unsupported organization or event

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: existing suite 1145.

**Title:** Dashboard - Events - Block live-stream settings for unsupported organization or event

**Description:** Open the supplied Live stream page link when Gate OrganizationOff disables the organization’s is_virtual_experience_organizer setting, or Gate RecurringEvent uses a recurring event in an otherwise enabled organization. Each run checks the corresponding warning and absence of a saveable form.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* For OrganizationOff, use an owned single event in an organization with is_virtual_experience_organizer off. For RecurringEvent, use an owned recurring event with that setting on. A permitted setup owner supplies the page address because the sidebar entry is intentionally absent.

**Postconditions:**

* No organization, event or room setting is changed.

**Priority:** High

**Tags:** dashboard, events

**Parameters:**

Gate: OrganizationOff, RecurringEvent

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared event’s Settings menu. |  | Live stream is not offered for the selected Gate. |
| Open the supplied Live stream address for this event. |  | OrganizationOff says live stream settings are not enabled for this organization; RecurringEvent says they are not available for recurring events. |
| Inspect the page and return to Basic info. |  | No editable live-stream connection or Save action is exposed, and permitted event navigation still works. |

## Operations → Publish event — current candidates

### SPT-5727: Dashboard - Events - Schedule publication and verify the event becomes available

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: top Events suite 79, as approved; no dedicated publication suite created.

**Title:** Dashboard - Events - Schedule publication and verify the event becomes available

**Description:** Save a future publication time for a complete approved draft and verify the same event activates after that time through normal processing. Record the event timezone and an exact five-minute boundary to avoid rounding ambiguity. A saved schedule alone is not the final publication proof.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use a complete owned single-event draft with valid name, category, location, future dates and a free public ticket with available inventory. Visibility is Hidden so it is not advertised. The event is approved to be published for these checks and has no real customers or orders.
* The organization has no active event-approval workflow, or this event has completed its required approval. Record the event ID/name, public link and saved settings privately; no save is already in progress.
* Choose and record a publication time at least 20 minutes in the future, on a five-minute boundary in the displayed event timezone, before the event starts. Record the normal scheduled-publication processing deadline. No one changes event or approval state during the wait.
* Use a separate signed-out customer session for the public-page check; an organizer preview is not proof that customers can access the event.

**Postconditions:**

* Keep the identified test event Hidden and retain its history. Record the resulting status and schedule; do not delete or cancel an unrelated event or order.

**Priority:** High

**Tags:** dashboard, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared event → Operations → Publish event and select Schedule publishing. |  | Publishing date and time appears with the event timezone. |
| Enter the recorded future time and select Schedule publishing. |  | The schedule is saved and the event remains a draft before its due time. |
| Leave and reopen Publish event before the due time. |  | The saved time/timezone remains correct and Change schedule and Cancel scheduled publishing are offered. |
| After the due time and normal processing deadline, reopen the event from Events and open its recorded public link in the signed-out customer session. |  | That same event is published with the recorded details; its customer page is available without another manual publish request. |

### SPT-5728: Dashboard - Events - Cancel scheduled publication and keep the event a draft

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed.

Placement: top Events suite 79, as approved; no dedicated publication suite created.

**Title:** Dashboard - Events - Cancel scheduled publication and keep the event a draft

**Description:** Cancel a saved future publication schedule, then wait past the former deadline to prove that the event remains a draft. Cancelling this schedule must not cancel the event, refund anything or erase its saved settings.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use a complete owned single-event draft with valid name, category, location, future dates and a free public ticket with available inventory. Visibility is Hidden so it is not advertised. The event is approved to be published for these checks and has no real customers or orders.
* The organization has no active event-approval workflow, or this event has completed its required approval. Record the event ID/name, public link and saved settings privately; no save is already in progress.
* Have a saved future publication time on this approved test draft with enough time to cancel before it becomes due. Record the scheduled instant/timezone and normal processing deadline.
* Use a separate signed-out customer session for the public-page check; an organizer preview is not proof that customers can access the event.

**Postconditions:**

* Retain the identified Hidden draft with no publication schedule; its saved event and ticket settings remain unchanged.

**Priority:** High

**Tags:** dashboard, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared event → Operations → Publish event. |  | The saved scheduled publication time is shown for this draft. |
| Select Cancel scheduled publishing, then leave and reopen Publish event. |  | The scheduled time is cleared and the event remains a draft; there is no event-cancellation or refund result. |
| Wait past the old scheduled time and normal processing deadline, then reopen the event from Events. |  | The same event remains a draft with no schedule and all its recorded name, dates, location and ticket settings intact. |

## Current page-to-suite coverage

Counts below include child folders and indicate stored definitions, not execution or complete native readiness. A shared feature test is reused rather than copied merely to populate a folder.

| New navigation | Existing page suite / count | Existing or newly published cases | Current coverage decision |
| --- | --- | --- | --- |
| Event → Overview | [1053](https://app.qase.io/project/SPT?suite=1053) / 1 | [SPT-5071](https://app.qase.io/case/SPT-5071) | Existing; its Recurrence values SingleDay/Recurring disagree with the Description labels; adapt before claiming native execution. |
| Manage → Basic info | [1122](https://app.qase.io/project/SPT?suite=1122) / 12 | [SPT-5339](https://app.qase.io/case/SPT-5339)–5344; [SPT-745](https://app.qase.io/case/SPT-745), [SPT-749](https://app.qase.io/case/SPT-749), [SPT-775](https://app.qase.io/case/SPT-775); [SPT-5077](https://app.qase.io/case/SPT-5077) | Existing focused edits plus broad legacy coverage. Category helpers, images, rich text, location/timezone, recurrence, discovery and their Advanced drawers remain required. |
| Manage → Tickets | [83](https://app.qase.io/project/SPT?suite=83) / 62 | [SPT-758](https://app.qase.io/case/SPT-758), [SPT-766](https://app.qase.io/case/SPT-766); [SPT-5345](https://app.qase.io/case/SPT-5345)–5350; child suites | Existing; ticket editor tabs, delivery, hard copy, cap, PDF and sellability proof remain separate from opening this page. |
| Manage → Legal & important info | [1131](https://app.qase.io/project/SPT?suite=1131) / 1 | [SPT-4878](https://app.qase.io/case/SPT-4878); [SPT-5111](https://app.qase.io/case/SPT-5111) | Existing legal/checkout acceptance. [SPT-5111](https://app.qase.io/case/SPT-5111) still bundles transfer limits from Advanced options and has an empty expected result; revise separately without losing either behavior. |
| Manage → Seating | [1132](https://app.qase.io/project/SPT?suite=1132) / 120 | Create Map 82; Assign Permissions 1184 | 120 existing definitions in child suites. Keep both groups and map-editor access; do not add a duplicate page-load case. |
| Manage → Order form | [446](https://app.qase.io/project/SPT?suite=446) / 14 | Suite 446; [SPT-5351](https://app.qase.io/case/SPT-5351); [SPT-5129](https://app.qase.io/case/SPT-5129) | Existing questions/profile/message checks; independent builder Save matters. [SPT-5129](https://app.qase.io/case/SPT-5129) needs native flag/publish wording cleanup. |
| Manage → Donations | [1133](https://app.qase.io/project/SPT?suite=1133) / 6 | [SPT-780](https://app.qase.io/case/SPT-780), [SPT-782](https://app.qase.io/case/SPT-782), [SPT-783](https://app.qase.io/case/SPT-783), [SPT-3300](https://app.qase.io/case/SPT-3300), [SPT-5112](https://app.qase.io/case/SPT-5112), [SPT-5113](https://app.qase.io/case/SPT-5113) | Existing configuration/eligibility coverage; [SPT-5112](https://app.qase.io/case/SPT-5112), [SPT-5113](https://app.qase.io/case/SPT-5113) have misplaced or incomplete results. Actual donation payment remains unexecuted. |
| Manage → Financial settings | [1134](https://app.qase.io/project/SPT?suite=1134) / 2 | [SPT-5720](https://app.qase.io/case/SPT-5720), [SPT-5721](https://app.qase.io/case/SPT-5721); existing [SPT-5525](https://app.qase.io/case/SPT-5525) permission baseline | New event save/inheritance and after-sales lock; link the existing permission baseline rather than cloning it. Internal fee cases 3810/3811 do not substitute for these organizer controls. |
| Manage → Custom fees | [1135](https://app.qase.io/project/SPT?suite=1135) / 2 | [SPT-5722](https://app.qase.io/case/SPT-5722), [SPT-5723](https://app.qase.io/case/SPT-5723); [SPT-5721](https://app.qase.io/case/SPT-5721) lock; shared fee tests | New event override and inheritance restoration; reuse shared fee calculation suites for actual charges/earnings. |
| Manage → Advanced options | [1049](https://app.qase.io/project/SPT?suite=1049) / 8 | [SPT-5078](https://app.qase.io/case/SPT-5078), [SPT-1784](https://app.qase.io/case/SPT-1784); [SPT-5352](https://app.qase.io/case/SPT-5352)–5355 | Existing; accommodations, custom display fields, transfer limits and password/report/integration options must stay mapped here. |
| Promote → Discounts | [1136](https://app.qase.io/project/SPT?suite=1136) / 0 | [SPT-1743](https://app.qase.io/case/SPT-1743), [SPT-1759](https://app.qase.io/case/SPT-1759), [SPT-3480](https://app.qase.io/case/SPT-3480); [SPT-1749](https://app.qase.io/case/SPT-1749), [SPT-1761](https://app.qase.io/case/SPT-1761), [SPT-3481](https://app.qase.io/case/SPT-3481) | Reuse existing create/edit/filter tests from the selected event’s Discounts entry; record fixed event context as a migration execution variation. Event tabs are Discount Codes and gated Auto Discounts, not Bulk Discounts. |
| Promote → Tracking links | [1052](https://app.qase.io/project/SPT?suite=1052) / 12 | Suite 1052 / Migration regressions 1150 | 12 existing event definitions; retain existing regression IDs and event link-type restrictions. |
| Promote → Packages | [87](https://app.qase.io/project/SPT?suite=87) / 10 | Suite 87 | 10 existing package definitions; event entry/defaults and mixed-cart fulfillment remain relevant. |
| Promote → Upgrades | [1137](https://app.qase.io/project/SPT?suite=1137) / 1 | [SPT-4291](https://app.qase.io/case/SPT-4291), [SPT-4297](https://app.qase.io/case/SPT-4297), [SPT-4296](https://app.qase.io/case/SPT-4296) | Reuse existing create/list/delete tests from the selected event’s Upgrades entry, recording its preselected origin. Shared ticket-to-membership scenarios remain; parent series cannot manage upgrades. |
| Promote → Sellers | [1138](https://app.qase.io/project/SPT?suite=1138) / 1 | [SPT-5079](https://app.qase.io/case/SPT-5079) | Existing event seller-access save. It does not prove the missing event commission controls. |
| Promote → Facebook | [1139](https://app.qase.io/project/SPT?suite=1139) / 2 | [SPT-4902](https://app.qase.io/case/SPT-4902), [SPT-5142](https://app.qase.io/case/SPT-5142) | Existing integration/publication flow. External writes need an approved destination; [SPT-5142](https://app.qase.io/case/SPT-5142)’s shifted results need correction. |
| Operations → Email guests | [1035](https://app.qase.io/project/SPT?suite=1035) / 9 | [SPT-5012](https://app.qase.io/case/SPT-5012)–5018; [SPT-5115](https://app.qase.io/case/SPT-5115), [SPT-5116](https://app.qase.io/case/SPT-5116) | Existing detailed composition/send guards; actual mailbox delivery is separate. Keep any send disabled during read-only comparison. |
| Operations → Check in | [1140](https://app.qase.io/project/SPT?suite=1140) / 0 | Enhance [SPT-5500](https://app.qase.io/case/SPT-5500); shared Check In 184 | Reuse the existing event handoff case; add new editor/native destination while preserving legacy and recurring selection. Link it from suite1140; leave the original case in shared suite184. |
| Operations → Transactions | [1141](https://app.qase.io/project/SPT?suite=1141) / 1 | [SPT-5153](https://app.qase.io/case/SPT-5153); Transactions 103 | Existing event/seller context and seat/export assertions. Correct malformed role parameter and final no-op expectation before execution; no refund/void here. |
| Operations → Waitlists | [1142](https://app.qase.io/project/SPT?suite=1142) / 0 | [SPT-4224](https://app.qase.io/case/SPT-4224), [SPT-4225](https://app.qase.io/case/SPT-4225), [SPT-4226](https://app.qase.io/case/SPT-4226), [SPT-4374](https://app.qase.io/case/SPT-4374) | Link existing list/cards/filters, Subscribers and Stats cases; enter them from this event’s list and recorded ticket type. Allocation/fulfillment cases stay in their owning suites. |
| Operations → Clone event | [1143](https://app.qase.io/project/SPT?suite=1143) / 3 | [SPT-786](https://app.qase.io/case/SPT-786), [SPT-5154](https://app.qase.io/case/SPT-5154); [SPT-5131](https://app.qase.io/case/SPT-5131) | Existing clone/resale/waitlist exclusion proof; [SPT-5131](https://app.qase.io/case/SPT-5131) still mixes templates with clone and has a blank final result. |
| Operations → Cancel event | [1144](https://app.qase.io/project/SPT?suite=1144) / 2 | [SPT-5108](https://app.qase.io/case/SPT-5108), [SPT-5109](https://app.qase.io/case/SPT-5109) | Existing definitions require exact approved order/refund setup and final-state proof; blocked for generic financial execution. Cancellation is not a replacement for Delete Event. |
| Settings → Branding | [1050](https://app.qase.io/project/SPT?suite=1050) / 2 | [SPT-4126](https://app.qase.io/case/SPT-4126), [SPT-4128](https://app.qase.io/case/SPT-4128); shared Branding 744 | Existing event/child inheritance checks. Current route overrides the placeholder registration with EventBrandingPage. |
| Settings → Email customization | [1051](https://app.qase.io/project/SPT?suite=1051) / 3 | [SPT-3618](https://app.qase.io/case/SPT-3618), [SPT-4150](https://app.qase.io/case/SPT-4150), [SPT-4151](https://app.qase.io/case/SPT-4151); shared 749 | Existing event/child preview/reminder coverage; current route has a real event component. |
| Settings → Edit attraction | [674](https://app.qase.io/project/SPT?suite=674) / 9 | [SPT-4090](https://app.qase.io/case/SPT-4090), [SPT-4829](https://app.qase.io/case/SPT-4829); child suite 480 | Existing attraction configuration with selected-event context; current route is implemented. |
| Settings → Live stream | [1145](https://app.qase.io/project/SPT?suite=1145) / 3 | [SPT-4877](https://app.qase.io/case/SPT-4877), [SPT-3291](https://app.qase.io/case/SPT-3291); [SPT-5724](https://app.qase.io/case/SPT-5724), [SPT-5725](https://app.qase.io/case/SPT-5725), [SPT-5726](https://app.qase.io/case/SPT-5726) | Reuse existing virtual-event setup/access; new published cases isolate missing required-input, clear-provider and eligibility branches; do not treat online-event setup as complete page configuration coverage. |
| Stats → Stats & Info | [1146](https://app.qase.io/project/SPT?suite=1146) / 3 | [SPT-5080](https://app.qase.io/case/SPT-5080), [SPT-5114](https://app.qase.io/case/SPT-5114), [SPT-4288](https://app.qase.io/case/SPT-4288) | Existing reporting/revenue proof; [SPT-5080](https://app.qase.io/case/SPT-5080) still says Reports navigation and [SPT-5114](https://app.qase.io/case/SPT-5114) is a shallow page check. Do not merge these into one generic totals test. |
| Admin → Internal fees | [1147](https://app.qase.io/project/SPT?suite=1147) / 4 | [SPT-772](https://app.qase.io/case/SPT-772), [SPT-3501](https://app.qase.io/case/SPT-3501), [SPT-3810](https://app.qase.io/case/SPT-3810), [SPT-3811](https://app.qase.io/case/SPT-3811) | Existing internal-admin rate-card tests; keep ordinary organizers out. This is a different page from Financial settings. |
| Operations → Request publish | [Top Events79](https://app.qase.io/project/SPT?suite=79); shared 949/84 | Reuse [SPT-4704](https://app.qase.io/case/SPT-4704), [SPT-4712](https://app.qase.io/case/SPT-4712), [SPT-4716](https://app.qase.io/case/SPT-4716) in Workflow Approval 949 | Conditional draft/approval page. Propose its own event suite and link existing event-form case4704; keep all shared workflow cases in949. |
| Operations → Publish event | [Top Events79](https://app.qase.io/project/SPT?suite=79); shared 949/84 | [SPT-764](https://app.qase.io/case/SPT-764), [SPT-4874](https://app.qase.io/case/SPT-4874), [SPT-4876](https://app.qase.io/case/SPT-4876), [SPT-5073](https://app.qase.io/case/SPT-5073); [SPT-5727](https://app.qase.io/case/SPT-5727), [SPT-5728](https://app.qase.io/case/SPT-5728) | Conditional draft page with immediate/scheduled/cancel-schedule controls. Scheduled cases are stored in top Events79, as requested; shared immediate-publication cases remain linked. Legacy create/publish definitions need native adaptation. |
| Manage → Clone template | [Top Events79](https://app.qase.io/project/SPT?suite=79); shared 949/84 | [SPT-5131](https://app.qase.io/case/SPT-5131); Recurring events/templates 1148 | Conditional template page; existing mixed case needs a focused clone-template pass. Keep its current coverage and mark detailed native copy rules not yet revalidated. |
| Manage → Generate Events | [Top Events79](https://app.qase.io/project/SPT?suite=79); shared 949/84 | [SPT-769](https://app.qase.io/case/SPT-769); suite 1148 | Conditional template action opening a modal, not a separate route; count generation completion separately from opening/closing it. |

## Legacy function → reachable replacement

Starting points are the actual legacy Dashboard → Manage Events and the new Build → Events list, not a pasted deep link alone. SPT-5072 checks every applicable menu entry from both editors; page cases then prove the owning behavior. Read-only inspection confirmed both user-opened editors show the same recurring series in **1859-qa-cad**, signed in as Christian Valdez; exact employee grants/deployed commit were not audited. No form values were changed.

| Legacy business function / visible path | New visible path / coverage | Status and limit |
| --- | --- | --- |
| Edit → Basic Info, Location & Info, Event Date & Time, categories/artists/comedians/shows/teams | Manage → Basic info, its Advanced drawers and date rows; 1122/81 | Existing field and date cases retained; SPT-5077 still has 18 broad legacy EditScenario branches. Its prior split map remains below; do not retire any branch without its owner. |
| Edit → Accommodations; Custom Display Fields; exchange/transfer limits | Manage → Advanced options; SPT-1784/5352/5353 | Moved functions remain in Advanced. The post-purchase accommodation selector is commented out in the legacy template, so it is not a lost visible control. |
| Edit → Ticket Types, sale starts/default sale end, cap/low inventory, ticket PDF messages | Manage → Tickets and its editor/settings; suites 83/448/999/1034 | Existing configuration/fulfillment cases retained. Parent/occurrence inventory, original prices, paid tickets and availability need independent downstream proof. |
| Edit → Legal Policies & Important Info | Manage → Legal & important info; SPT-4878 | Transfer limits belong to Advanced; do not let mixed SPT-5111 hide either behavior. |
| Edit → Order Form & Messaging | Manage → Order form (own Save); purchase-button text → Basic info | Legacy live page already says its main Save Event does not save the order form. Retain question/message/profile checks and page-save isolation 5356/5357. |
| Edit → Charitable Donations | Manage → Donations; six existing definitions | Role, CAD/USD and gateway eligibility retained; actual charity charge/receipt proof is separate. |
| Edit → Financial Settings → Processing/Showpass choices | Manage → Financial settings; [SPT-5720](https://app.qase.io/case/SPT-5720), [SPT-5721](https://app.qase.io/case/SPT-5721); existing SPT-5525 permission baseline | New event save/inheritance and guards. Both legacy and new editors restrict these editable controls to configured fee structures. Non-configured records have no legacy fee editor to replace; the new informational message is not an established parity gap. |
| Edit → Financial Settings → Custom Fees & Taxes / Calculate Fees | Manage → Custom fees; [SPT-5722](https://app.qase.io/case/SPT-5722), [SPT-5723](https://app.qase.io/case/SPT-5723) plus shared fee suites | Event context must survive inherited overrides/reset/calculation. New cases prove configuration only; fee calculation, collected service fees, adjustments and earnings remain specialist execution work. |
| Edit → Financial Settings → Seller Commission: Cash Sales / Credit Sales | No equivalent event-level editor found in Financial settings, Custom fees or Sellers | **Blocked parity target / source-backed risk.** Legacy controls require Manage Transactions, a configured fee structure and a non-Basic organization pricing tier; edits lock after sales. This event section is not restricted to internal administrators. Backend still supports event commission fields. Finance → Fee settings edits organization defaults, not this event override. Do not mark SPT-5534 as equivalent event coverage. No save/reproduction was performed. |
| Edit → Delete Event | No matching delete/archive action found in new event header, Advanced options, card menus or bulk-update controls | **Blocked parity target / source-backed risk.** Backend still exposes lifecycle-validated archive; cancellation/refunds are different behavior. The inspected legacy recurring parent displays Delete Event, although backend rejects deleting a parent with child events. No deletion attempted. |
| Manage → Assigned Seating / Map Editor | Manage → Seating → map editor and permission assignment | Preserve all 120 existing definitions; source children explicitly expose an existing map even where the legacy child menu did not. |
| Manage → Email Customization / Branding / Attraction configuration / Edit Sellers | Settings → Email customization / Branding / Edit attraction; Promote → Sellers | Owning event/child cases remain; none of these implemented route overrides should be labelled a current placeholder. |
| Manage → Email Guests | Operations → Email guests; 1035 | Draft hides send entry; composed content, selected inventory and actual delivered email remain separate proof. |
| Manage → Transactions / Check In / Waitlist | Operations → Transactions / Check in / Waitlists | Preserve event selection, seller-only access and recurring occurrence. Enhance existing5500; link4224/4225/4226/4374 rather than cloning shared waitlist cases. |
| Promote → Facebook / Tracking Links; shared discounts/packages/upgrades | Promote → corresponding event page | Existing integrations retained. Run the linked discount and upgrade cases from this event’s entry; record event context and keep their original global entry covered. |
| Reports → Stats & Info; Overview | Stats → Stats & Info; Event → Overview | Existing metrics/export/realization cases retained. A navigation or page-title check does not reconcile sales and earnings. |
| Template → Generate Events; clone/template flows | Manage → Generate Events modal / Clone template; Operations → Clone event | Existing769/786/5131/5154/1148 retained; template generation and source isolation need their own completed-output proof. |
| Publish Approval / status publication and scheduled activation | Operations → Request publish / Publish event | Reuse Workflow Approval949; reuse5073/764 for immediate publication and add only [SPT-5727](https://app.qase.io/case/SPT-5727), [SPT-5728](https://app.qase.io/case/SPT-5728) for scheduled publication and its cancellation. Preserve approval refusal and background activation; do not infer publication from accepted save. |
| Manage → Live Stream | Settings → Live stream | Reuse4877 for connection setup; [SPT-5724](https://app.qase.io/case/SPT-5724), [SPT-5725](https://app.qase.io/case/SPT-5725), [SPT-5726](https://app.qase.io/case/SPT-5726) cover additional required-input, clear-provider and eligibility branches; broader4877 still owns session/active-room scenarios and3291 actual customer access. |
| Internal rate-card actions | Admin → Internal fees | Existing772/3501/3810/3811 retained with internal-admin access. |

## Published suite organization

1. **Kept** Events79 and the existing page folders in their current Next.js navigation groups. Existing specialist suites and all earlier cases remain in place.
2. **Added description links** to Events79, Financial settings1134, Custom fees1135, Discounts1136, Upgrades1137, Check in1140, Waitlists1142 and Live stream1145. Original description text is retained. Empty event folders reference shared coverage; no link-only test cases were created.
3. **Used top Events79** for scheduled-publication cases SPT-5727/5728 because no dedicated publication suite exists. The root description links Request publish, Publish event, Clone template and Generate Events to their existing owners. Shared approval949 and Check In184 keep their cases.
4. **Kept Ticket credits1149 intact.** Its event-scoped URLs redirect to organization-wide Promote → Ticket credits; this batch did not move its33 cases or invent another event sidebar tab.

Suite writes were description-only. Root receipt records Qase trimming one final newline, verified against the full text without repeating the write. Remaining seven descriptions were verified exactly. Titles, parents and total suite count are unchanged.

## What remains unverified or blocked

Ticket modal follow-up: [the Tickets note](02%20Manage/02%20Tickets.md#ticket-modal-parity-review--2026-10-17) contains the separate legacy/new modal comparison. **SPT-5729–5752 are published and verified in Tickets83**; shared fee cases **SPT-5722/5723** were enhanced with FeeScope Event/Ticket in1135. The Events tree now contains349 cases across52 suites; this later batch preserved2,190 unrelated project cases. Five unresolved legacy ticket functions and manual-only gaps still prevent a complete parity claim. The current full fee-case definitions are in that note and supersede the earlier versions below.

| Surface / state | Accounting |
| --- | --- |
| All31 destination pages, template generation action and 47 route files | Source inventory complete; page bindings and Qase owners recorded. Live inspection confirmed26 links for this recurring parent (Upgrades and Live stream are inapplicable). Navigation alone is not page behavior proof. |
| Legacy form controls | 69 distinct event bindings were inventoried: date/time wrapper fields map to actual schedule inputs; the commented post-purchase accommodation selector is not applicable. Rich text, uploads, selectors and schedule rows require their existing child-control checks, not a single load pass. Seller commission controls from the shared financial section are separately blocked above. |
| Package/seller/discount/upgrade create and detail routes; map editor; branding checkout; waitlist Subscribers/Stats | Each is mapped to its owning page in the 47-route evidence. Existing specialist definitions provide business coverage; event entry/context is exercised through enhanced SPT-5072 and the linked existing page cases. Nested cross-event record-ID substitution, stale/detail errors and exact defaults on every scoped create/edit form are **deferred source/API and manual checks**, not automatically passed by the parent test. |
| Draft/child/template navigation differences | Source confirms native Draft exposes some links legacy hides; children have Stats & Info, Advanced and existing-map Seating; native templates expose a Manage group. SPT-5072 records the distinct expectations and preserves the original four states plus explicit RecurringParent. Product acceptance of changed capability must not be inferred from matching sidebar titles. |
| Qase publication | **Published and verified.** Nine creates, two enhancements and eight description-only link updates; no new suite, move, copy or deletion. SPT-5500 and4704 remain in their existing suites. Definitions are not execution results. |
| Field validation, request errors, dirty-state discard, stale competing saves, async completion | Reuse Page save/recovery1123 and applicable existing field cases. Focused failure/retry, mobile keyboard/rich-text/upload behavior and every unseen form/dialog remain **manual-only/deferred**, not covered by SPT-5072. |
| Publish approval denial; invalid/past schedule; confirmation cancellation; save-pending state; timezones/DST | Shared4712/4716 preserve approval proof. Native confirmation-cancel, empty/past schedule UI, conflicting pending saves and exact-clock/DST boundaries are **deferred**, with no fabricated failure or timing setup. Scheduled activation and cancelled-schedule final state are explicit in [SPT-5727](https://app.qase.io/case/SPT-5727), [SPT-5728](https://app.qase.io/case/SPT-5728). |
| Fees / payments / capacity / service-fee revenue / admission / external delivery | These definitions do not replace independent paid-order, fee allocation, earnings, refund/void/exchange, overselling, real push/email/provider or physical hardware execution. Required financial gates remain unexecuted. The missing event commission editor and delete/archive action also prevent a complete migration-access claim. |
| Broad/shallow existing definitions | SPT-5071/5077/5110/5111/5112/5113/5114/5115/5116/5129/5131/5132/5142/5153/5157 and legacy create/publish764/4874/4876/5073 require targeted readability/expectation review before native sign-off. Preserve useful scenarios and meaningful parameters; titles or empty expected results do not count as executable coverage. |

## Evidence and duplicate review

- Pre-publication review snapshot: **2,183 unique cases /317 suites**, completed **2026-10-18 00:31:32 UTC (October17 locally)**. Events79 descendants: **316 cases /52 suites including79**. Before this batch, six page folders had no direct cases:1134,1135,1136,1140,1142,1145. Discounts1136, Check in1140 and Waitlists1142 now reference their existing shared tests; the other three received distinct new coverage. Saved full baseline and suite tree.
- Full-field comparison included Events79 and shared page/domain coverage; selected reuse checks:3810/3811 are internal fees, not organizer choices;5534 is an organization commission default;4224/4225 are the global waitlist list;5500 is the existing legacy event handoff;4291/4297 are general upgrade paths;4877/3291 are virtual-event setup/access;4704/4712/4716 are event approval. The full-field scheduling, provider-clear/required-input and event-fee-inheritance alias searches found no existing equivalent definitions; compared related general cases are linked above. No exact new-title or identical complete action/result duplicate is proposed; parameters reuse repeated choices. Two existing enhancements retain original state/entry coverage.
- Frontend **7e527b0285349e5d9537731f97f09b414001778c**, backend **b5f397a0438910435e0d537f47e12d6064d7e019**. No repository was pulled or changed. Legacy template/sidebar and backend event serializer/viewset, fee API, archive and scheduled-publication services establish supported behavior. Current Next.js page files override several misleading placeholder entries in events-detail-config.ts; the wrapper’s actual component wins.
- Frontend paths: `packages/next-app/pages/manage/events/[slug]/`; `packages/next-app/helpers/createEventDetailPage.tsx`; event `constants/events-detail-routes.ts`, `hooks/useEventDetailRouteConfigs.ts`, Financial/CustomFees page components, service-fee settings utilities, live-stream fields/payload/submit, publication page/hooks, event-scoped Discounts/Waitlists/Transactions/Upgrades components and Check In bootstrap. All47 route bindings and page coverage map avoid treating registry placeholders as actual route implementations.
- Legacy fee gates were checked in `apps/main/templates/tickets/events/partials/__create-form.html:1419` and `apps/main/templates/dashboard/financials/financial-settings-directive/main-fee-structure.html:38`: non-configured records lack these editors in both versions; event commissions are available for configured, non-Basic organizations and lock after sales.
- Backend paths: `apps/main/templates/tickets/events/partials/__create-form.html` and `manage/partials/_event-manage-sidebar.html`; `apps/tickets/api/venue_based/serializers/events.py` (room/virtual type validation), `viewsets/events.py` (ownership/manage/archive); `apps/financials/api/venue_based/viewsets/fees.py`; `apps/tickets/models/event_management/event.py` and `services/event_management/scheduled_event_publication.py`; `services/event_management/event_archival.py`. Source risks are not reproduced end-to-end defects.
- Browser: existing beta tabs only. Same recurring event and saved date rows seen in both; new menu has the expected26 eligible links. Organization selector was opened/closed without switching. No tabs were created, forms saved, emails sent, checks scanned, jobs triggered, or purchases/refunds/deletions executed. Both original editor tabs remain at their starting URLs.
- Local case parsing, parameter/step comparison and known-ID checks: validation. Those initial checks validated the draft; final publication is separately verified above. No product test was executed. Current source-backed gaps prevent a complete parity claim.

## Earlier page notes and publication history

The material below is retained as the October4/14 baseline and existing page-note index. Its historical placeholder/readiness statements are superseded by the current review above; published IDs and links are preserved.

Read the folders in sidebar order. This index replaces the old CSV assignment, case-mapping and suite-move planning notes. The 2026-10-04 refactor was local. On 2026-10-14, the 25 approved candidates were published as SPT-5339–5363; their verified folder and draft mappings are below.

Existing cases are retained alongside focused local improvements. A preserved Qase case is **existing coverage**, not automatically a migration-ready test. Page notes identify legacy wording, overlapping cases and unresolved native destinations.

## Pages in the screenshot

| Sidebar group | Page and cases | Qase folder | Coverage / action |
| --- | --- | --- | --- |
| Event | [[03 Test Cases/Events/01 Event/Overview\|Overview]] | [Overview (1053)](https://app.qase.io/project/SPT?suite=1053) | SPT-5071; totals, child rows and reports. Empty/readiness/error presentation needs the native overview pass. |
| Manage | [[03 Test Cases/Events/02 Manage/01 Basic info\|Basic info]] | [Basic info (1122)](https://app.qase.io/project/SPT?suite=1122) | SPT-5077 locally focused; public links, categories, online events, images, location, doors, date-display and discovery checks. |
| Manage | [[03 Test Cases/Events/02 Manage/02 Tickets\|Tickets]] | [Tickets (83)](https://app.qase.io/project/SPT?suite=83) | Ticket type pricing/inventory/sale windows/delivery plus event-wide capacity, PDF messages and save/discard cases. |
| Manage | [[03 Test Cases/Events/02 Manage/03 Legal and important info\|Legal & important info]] | [Legal & important info (1131)](https://app.qase.io/project/SPT?suite=1131) | SPT-5111 enhanced locally; SPT-4878 terms validation and checkout acceptance. |
| Manage | [[03 Test Cases/Events/02 Manage/04 Seating\|Seating]] | [Seating (1132)](https://app.qase.io/project/SPT?suite=1132) | Presence only; detailed coverage remains in Map Editor (82). |
| Manage | [[03 Test Cases/Events/02 Manage/05 Order form\|Order form]] | [Order form (446)](https://app.qase.io/project/SPT?suite=446) | Existing collection/question cases plus conditional customer-profile sync. |
| Manage | [[03 Test Cases/Events/02 Manage/06 Donations\|Donations]] | [Donations (1133)](https://app.qase.io/project/SPT?suite=1133) | SPT-780/782/783/3300; native permission/gateway/currency gates called out. |
| Manage | [[03 Test Cases/Events/02 Manage/07 Financial settings\|Financial settings]] | [Financial settings (1134)](https://app.qase.io/project/SPT?suite=1134) | Presence only. |
| Manage | [[03 Test Cases/Events/02 Manage/08 Custom fees\|Custom fees]] | [Custom fees (1135)](https://app.qase.io/project/SPT?suite=1135) | Presence only; configured-fee support and financial permission required. |
| Manage | [[03 Test Cases/Events/02 Manage/09 Advanced options\|Advanced options]] | [Advanced options (1049)](https://app.qase.io/project/SPT?suite=1049) | SPT-5078, improved SPT-1784, passwords, transfer limits, custom fields and validation. |
| Promote | [[03 Test Cases/Events/03 Promote/01 Discounts\|Discounts]] | [Discounts (1136)](https://app.qase.io/project/SPT?suite=1136) | Shared suites referenced; native event destination currently a placeholder. |
| Promote | [[03 Test Cases/Events/03 Promote/02 Tracking links\|Tracking links]] | [Tracking links (1052)](https://app.qase.io/project/SPT?suite=1052) | Event-owned cases and shared-suite references. |
| Promote | [[03 Test Cases/Events/03 Promote/03 Packages\|Packages]] | [Packages (87)](https://app.qase.io/project/SPT?suite=87) | Existing package cases; selected-event entry must retain the correct parent. |
| Promote | [[03 Test Cases/Events/03 Promote/04 Upgrades\|Upgrades]] | [Upgrades (1137)](https://app.qase.io/project/SPT?suite=1137) | Existing create/edit/delete/uniqueness and messaging cases. |
| Promote | [[03 Test Cases/Events/03 Promote/05 Sellers\|Sellers]] | [Sellers (1138)](https://app.qase.io/project/SPT?suite=1138) | SPT-5079; separate from event editing. |
| Promote | [[03 Test Cases/Events/03 Promote/06 Facebook\|Facebook]] | [Facebook (1139)](https://app.qase.io/project/SPT?suite=1139) | SPT-4902; external publishing requires an approved test destination. |
| Operations | [[03 Test Cases/Events/04 Operations/01 Email guests\|Email guests]] | [Email guests (1035)](https://app.qase.io/project/SPT?suite=1035) | Detailed SPT-5012–5018 retained; acceptance is not inbox-delivery proof. |
| Operations | [[03 Test Cases/Events/04 Operations/02 Check in\|Check in]] | [Check in (1140)](https://app.qase.io/project/SPT?suite=1140) | Shared cases referenced; native event destination currently a placeholder. |
| Operations | [[03 Test Cases/Events/04 Operations/03 Transactions\|Transactions]] | [Transactions (1141)](https://app.qase.io/project/SPT?suite=1141) | Shared event/seller-scope cases referenced; native destination currently a placeholder. |
| Operations | [[03 Test Cases/Events/04 Operations/04 Waitlists\|Waitlists]] | [Waitlists (1142)](https://app.qase.io/project/SPT?suite=1142) | Setup and shared list cases referenced; native destination currently a placeholder. |
| Operations | [[03 Test Cases/Events/04 Operations/05 Clone event\|Clone event]] | [Clone event (1143)](https://app.qase.io/project/SPT?suite=1143) | SPT-786 and detailed SPT-5154 regression; source event must stay unchanged. |
| Operations | [[03 Test Cases/Events/04 Operations/06 Cancel event\|Cancel event]] | [Cancel event (1144)](https://app.qase.io/project/SPT?suite=1144) | SPT-5108/5109 retained with explicit safety and refund-completion gaps. |
| Settings | [[03 Test Cases/Events/05 Settings/01 Branding\|Branding]] | [Branding (1050)](https://app.qase.io/project/SPT?suite=1050) | Event cases retained; venue/shared suite 744 referenced; native placeholder. |
| Settings | [[03 Test Cases/Events/05 Settings/02 Email customization\|Email customization]] | [Email customization (1051)](https://app.qase.io/project/SPT?suite=1051) | Event cases retained; shared suite 749 referenced; native placeholder. |
| Settings | [[03 Test Cases/Events/05 Settings/03 Edit attraction\|Edit attraction]] | [Edit attraction (674)](https://app.qase.io/project/SPT?suite=674) | Existing suites 674/480 retained; native placeholder. |
| Stats | [[03 Test Cases/Events/06 Stats/Stats and Info\|Stats & Info]] | [Stats & Info (1146)](https://app.qase.io/project/SPT?suite=1146) | SPT-5080/4288; child-event access differs from the old navigation case. |
| Admin | [[03 Test Cases/Events/07 Admin/Internal fees\|Internal fees]] | [Internal fees (1147)](https://app.qase.io/project/SPT?suite=1147) | Authorized internal-admin presence check only. |

“Placeholder” records the 2026-10-04 source review, not the deployed screenshot. Those destination implementations were not all re-audited during the 2026-10-14 publication. Do not count a placeholder rendering as feature parity. Shared organization suites remain where they are in Qase.

## Outside the sidebar, still covered

| Workflow | Canonical file |
| --- | --- |
| Create single/recurring events, drafts and required inputs | [[03 Test Cases/Events/00 Create and shared checks/Create event]] |
| Page availability, event ownership, entry points and protected states | [[03 Test Cases/Events/00 Create and shared checks/Navigation and permissions]] |
| Recurring-child edits, conversions and templates | [[03 Test Cases/Events/00 Create and shared checks/Recurring events and templates]] |
| Independent page saves, connection recovery and keyboard/mobile use | [[03 Test Cases/Events/00 Create and shared checks/Page save and recovery]] |
| Manage Events list/card actions | [[03 Test Cases/Events/00 Event list/SPW-20370 - Manage Events Card Actions]] — keep separate from event details, like suite 85 |
| Conditional Live stream page | [[03 Test Cases/Events/05 Settings/04 Live stream]] |

## Testing intent and proof targets

| Field | Scope |
| --- | --- |
| Invariant | Splitting the event editor into pages must preserve the selected event, saved settings, sellable inventory, valid dates, customer information and ownership boundaries. |
| Highest-risk harm | An event publishes incorrectly, valid sales stop, a child edits another occurrence, one page erases another page's settings, or customers receive incorrect tickets/questions. |
| Proof | Fresh page reads, unchanged comparison event/child, matching public details, an intended order/ticket where required, and explicit recovery/cleanup. |
| Actors and surfaces | Owning organization employee with the named permissions; restricted employee; customer public page/checkout/PDF. Shared Box Office/check-in/report cases retained where already applicable. |
| Scope | Current local backend behavior, native sidebar/page mapping, creation/draft/active/child/template states, focused parity gaps. Not a branch-diff review. |
| Exclusions | Deep seating/fees, Workflow Approval suite 949, live external publication/sends/refunds, production data changes and load certification. |
| Confidence | High for folder/ID preservation and verified Qase publication; medium for migration readiness. No product data mutation, browser testing, provider delivery or deployed-flag inspection was performed. |

| Proof target | Existing / new cases | Remaining evidence |
| --- | --- | --- |
| Correct create/draft/publish lifecycle | SPT-764/4874/4876/5073 | Native staged creation differs from legacy flow; run native creation and publication before sign-off. |
| Correct event and authorized access | SPT-5072/5074/5075/5076 | Run permitted and denied roles; UI hiding is not backend write authorization. |
| Field edits survive and do not overwrite another page | SPT-5077; SPT-5339–5344/5356–5358 | Fresh read on supported desktop and phone browser. |
| Ticket capacity and fulfillment follow settings | Existing Ticket cases; SPT-5345–5350 | Controlled basket and free-ticket PDF proof; preserve financial records. |
| Checkout questions and policies remain correct | SPT-3247/3249/3251–3253/3261–3264/3268–3270/4878/5111; SPT-5351 | Field answers, required rules and customer-profile effects need the matching downstream suite. |
| Advanced configuration is saved or cleared correctly | SPT-5078/1784; SPT-5352–5355 | Custom website, external mail/Workday and printed output are separate integration proof. |
| Recurring changes stay correctly scoped | SPT-5082/770/4879/4299 | Parent-derived date range may change when an edge child date changes; sibling values must not. |

## Highest-priority gaps

| Risk | Finding | Disposition |
| --- | --- | --- |
| High — publishing / live sales | Native Create event makes a draft and opens Basic info; the old Show Advanced Settings → Publish cases cannot be executed unchanged. | SPT-764 locally updated for native staged creation; SPT-4874/5073/4876 still require native adaptation. |
| High — lost settings | Separate pages and ticket dialogs can save stale event data or hide unsaved edits. | SPT-5356/5357/5350; extend existing cross-section integration tests. |
| High — wrong date / occurrence | Doors-open omission, selected-date timezone policy and parent date rollup are not adequately described by a generic “dates persist” assertion. | SPT-5341–5343; SPT-5152 requires a concrete timezone-policy matrix, not duplicate DST cases. |
| High — wrong capacity / admission | Ticket inventory alone does not prove an event-wide cap or downloaded-ticket content. | SPT-5345/5346/5348/5349 plus existing inventory/delivery cases. |
| High — irreversible cancellation | SPT-5108/5109 lack exact safe financial setup and final refund proof. | Block execution of their generic submit steps until the page's named prerequisites/expected amounts are prepared. |
| High — migration incomplete | Seven destinations are registered to placeholders: Discounts, Check in, Transactions, Waitlists, Branding, Email customization, Edit attraction. | Block native parity claims; retain existing destination suites and event-context requirements. |
| Medium — hidden/conditional controls | Hotel booking partner, custom display fields, profile sync, transfer overrides and child Advanced controls moved or have specific gates. | SPT-1784/5352/5353/5351, locally updated SPT-5072. |
| Medium — poor test instructions | Newer SPT-5110/5112–5116/5129/5131/5132/5142/5157 contain broad steps, misplaced results or fake JSON “parameters” in descriptions. | Link stronger existing coverage; do not count titles as complete tests or create equivalent duplicate cases. |

## SPT-5077 split: no scenario silently dropped

| Previous scenario | Current home / replacement |
| --- | --- |
| BasicInfoGeneral | Basic info: focused SPT-5077; SPT-775 link validation; SPT-5339/5340/5344 |
| BasicInfoGoogleThings; Music; Comedy; Arts; Sports | Basic info: SPT-5344 and SPT-745/749 |
| LocationPhysical; LocationOnline | Basic info: SPT-5341 and SPT-4877 |
| EventDateAndTime | Basic info: SPT-5342/5343 and existing SPT-5152 |
| Accommodations | Advanced options: SPT-1784 enhanced. The legacy post-purchase partner selector is commented out; do not invent a second current UI control. |
| TicketTypes | Tickets: existing ticket-type cases and SPT-5349 |
| EventTicketSettings | Tickets: SPT-5345–5348; No Ticket Types Message remains a separate field to check against the native public no-ticket display. |
| LegalPoliciesAndImportantInfo | Legal & important info: SPT-5111 and SPT-4878 |
| OrderFormAndMessaging | Order form: existing field/question cases and SPT-5351; purchase button text under Basic info / SPT-3248 |
| CustomDisplayFields | Advanced options: SPT-5352 |
| CharitableDonations | Donations: SPT-780/782/783/3300 |
| FinancialSettingsPresence | Financial settings: SPT-5072 presence-only |
| AdvancedOptions | Advanced options: SPT-5078 and SPT-5353–5355; Workday presence-only |

Existing-case refactors remain local: SPT-764 uses native staged creation; SPT-5072 uses current navigation gates; SPT-5074 removes the incorrect Edit Sellers click path; SPT-5082 allows the parent date range to follow child dates. SPT-5111's proposed transfer split is now the published SPT-5353, while the original SPT-5111 was not changed. All 51 original SPT IDs remain in the reorganized files.

## Coverage accounting and execution order

All manual cases here are **Manual-only / not executed** unless their own preserved note explicitly cites earlier evidence. Qase publication is not a Passed result. The original 11-case edit draft is superseded: entry/access → SPT-5074/5075; basic/validation → SPT-5077/4874; visibility/dates → SPT-5341–5344 and SPT-5152; recurrence/template → SPT-4876/5082/769/4879; tickets → Tickets page; legal/order form → their pages; protected states → SPT-5076.

1. Create and reopen one single event and one recurring series; complete native publication with no workflow approval configured.
2. Run SPT-5074/5075 and SPT-5356; confirm no wrong-event or stale-page update.
3. Run SPT-5342/5345/5346/5350, then focused order-form/legal tests and one controlled purchase-to-ticket journey.
4. Run the remaining page cases, selected mobile/keyboard paths, negative/boundary scenarios and cleanup.
5. Inspect every sidebar destination. Record missing implementation, unavailable setup and intentionally excluded fees/seating separately.

Complex controls accounted for: image selection/crop/rejection → SPT-5339; rich description → SPT-5077 plus public SPT-361/374; category/tag lookup/helper creation → SPT-745/749/5344; date pickers/doors/clear → SPT-5341–5343/5152; ticket list/editor dirty state → SPT-5349/5350; question builder CRUD/types → SPT-3253/3261/3262; password dialog CRUD/cancel → SPT-5355; custom-field formatter/remove → SPT-5352. Exhaustive rich-text toolbar permutations, every timezone fold/gap, injected worker/provider failures and every ticket-editor subfeature are not represented as completed manual proof.

## Automation candidates

| Priority / layer | Target | Evidence and limits |
| --- | --- | --- |
| P0 backend/API | Publish validation; event ownership; child constants/rollup; pending-save guard; atomic nested failures | Event serializer/viewset are first truth; add boundary and failure tests, not browser-only assertions. |
| P0 existing Playwright journeys | Save event → purchase correct ticket → reopen order/PDF; capacity; recurring selected child | Extend existing single/recurring event journeys; do not create a second purchase framework. |
| P1 component/integration | Page-owned saves, cancelled dialog, rejected image, required legal field, hidden-profile-sync normalization | Existing cross-section save tests and form utilities offer deterministic control; not proof of deployed integration. |
| P1 browser | SPT-5339/5342/5356/5349/5350, representative order form, allowed/denied navigation | Assert fresh reads and unchanged comparison records. |
| Manual/device | Cropping appearance, narrow-screen keyboard/focus, PDF readability, real email and thermal print | Real inbox/printer/provider output must be observed separately; no synthetic “delivered” pass. |

Automation sources: [single-event journeys](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events.test.ts>), [recurring-event journeys](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/recurring-events.test.ts>), [cross-section save tests](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/editor-modal/event-sections-save.integration.test.tsx>). Located/inspected only; nothing was run.

## Sources and read record

- Authority: [[01 Repositories/Backend - web-app]], [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]].
- Local source snapshot: backend HEAD 96563466a9; frontend HEAD c84fbb7ad2, read 2026-10-04. Working-tree content was read; these are not deployment/build claims.
- Backend: [event API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>), [event serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [event model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py>), [ticket serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/ticket_types.py>), [legacy form](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html>).
- UI organization: supplied screenshot plus [native page registrations](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>) and [navigation gates](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>). Each page note has focused sources.
- Qase, 2026-10-04: one paginated read of **1,781 cases and 255 suites**. Candidate filter: Events (79) descendants plus Core Events (613), Branding (744), Email Customization (749), Tracking Links (183) descendants — **210 matches**; additionally filtered titles for packages/upgrades/discounts and inspected migration IDs 5108–5157. That analysis performed no writes.
- Existing local case bodies were preserved before refactoring. Additional event-level Qase cases were brought into the matching pages; shared suites remain linked, not relocated.

## Open readiness questions

These do not block reading or reviewing the reorganized drafts, but prevent a full migration sign-off:

- Which native destinations are actually deployed and which legacy redirects remain supported? Local placeholders and a screenshot are not deployment evidence.
- What exact timezone policy/cohort and ambiguous-time choice should SPT-5152 execute? Record the backend policy, event timezone and expected saved instant before asserting a DST result.
- Which controlled integration website, Campaign Monitor list, Facebook destination, inbox and printer are available for downstream proof?
- What approved refund type, sandbox organizer-payment setup and expected amounts make cancellation safe to execute?
- Which ticket-editor specialist areas are included in this release beyond the inherited pricing/delivery/waitlist cases: scan windows, auto-release, tiered discounts, credits, notifications, resale and payment plans? Their existence is not proof that this page-level pass covers their entire business logic.

## Cleanup and history

Removed superseded local planning: assignment matrix Markdown/CSV, CSV-to-Qase mapping, suite-reorganization ledger and the older overlapping edit-event draft. Their active page mappings, shared-suite references, unique coverage intents and unresolved risks are now above or in the page files. The CSV contained only Unassigned rows, so no QA ownership assignments were lost.

Historical Qase moves from 2026-08-24 are history only: event suites 1050/1051/1052 were created, 22 cases moved, and the user created Overview (1053). The 2026-10-04 refactor performed no Qase writes. The earlier 2026-10-14 publication created the approved cases and two folders. The later UI-based organization is recorded separately below; it changed folder names/parents and case locations only.

Recovery: tracked originals remain in Git. The temporary pre-refactor copy from the 2026-10-04 session is not a durable backup. The three focused card-action, email-guest and clone-regression notes were moved, not deleted.

## Qase publication — 2026-10-14

Published **25 new cases**, SPT-5339–5363, after the user's approval. Created and read back **Basic Info (1122)** and **Page Saves & Recovery (1123)** under Create / Edit Events (84). Reused Ticket Types (83), Order Form & Custom Questions (446), Advanced Options (1049), and Manage Events List (85). All six folders are descendants of Events (79).

Pre-write check: read 1,802 existing cases and 256 suites; compared exact titles and related coverage including SPT-5077/5078/5110/5111/784/786/806. Broad existing cases overlap some happy paths, but these focused cases add validation, isolation, recovery or card-specific proof. No exact-title duplicate was found. Dry-run: 25 create operations, 176 step rows; no existing-case updates.

Readback: verified every title, Description, Preconditions, Postconditions, suite, tag set, parameter and Step Action/Data/Expected Result. Cases are **published definitions, Manual-only / not executed**. User data and deployed flags were not inspected or changed. Existing local enhancements to SPT-764/5072/5074/5077/5082/1784/5111 remain unpublished.

Source refresh before publication: backend HEAD 039444e79d; frontend HEAD d606f20bbd. Rechecked field limits, image bounds, event inventory, guest-profile-sync gates, advanced fields and card permissions. Card cases now include Tracking links and exact Manage Events/Administer Transactions/Box Office Sales requirements; their prerequisites no longer depend on another case. The original full migration audit remains dated 2026-10-04.

| Former draft | Published case | Folder | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- |
| Basic info TC-1 | [SPT-5339 — Dashboard - Basic Info - Replace an image and reject unsupported uploads](https://app.qase.io/case/SPT-5339) | Basic info (1122) | dashboard, edit-event, appearance | ImageField: BannerImage, SquareImage | 7 |
| Basic info TC-2 | [SPT-5340 — Dashboard - Basic Info - Keep text within the supported field limits](https://app.qase.io/case/SPT-5340) | Basic info (1122) | dashboard, edit-event, edge-case | TextField: EventName, Subtitle | 6 |
| Basic info TC-3 | [SPT-5341 — Dashboard - Basic Info - Change location without changing another event](https://app.qase.io/case/SPT-5341) | Basic info (1122) | dashboard, edit-event, events | None | 8 |
| Basic info TC-4 | [SPT-5342 — Dashboard - Basic Info - Validate and clear the doors-open time](https://app.qase.io/case/SPT-5342) | Basic info (1122) | dashboard, edit-event, edge-case | None | 9 |
| Basic info TC-16 | [SPT-5343 — Dashboard - Basic Info - Save date display choices without losing the schedule](https://app.qase.io/case/SPT-5343) | Basic info (1122) | dashboard, edit-event, tickets | DisplayChoice: DateToBeDetermined, HideTicketEndTime | 7 |
| Basic info TC-19 | [SPT-5344 — Dashboard - Basic Info - Save discovery choices independently](https://app.qase.io/case/SPT-5344) | Basic info (1122) | dashboard, edit-event, discovery | DiscoverySetting: Visibility, CalendarDisplay, GoogleThingsToDo | 5 |
| Tickets TC-5 | [SPT-5345 — Dashboard - Tickets - Enforce the total event inventory across ticket types](https://app.qase.io/case/SPT-5345) | Tickets (83) | dashboard, tickets, edge-case | None | 7 |
| Tickets TC-6 | [SPT-5346 — Dashboard - Tickets - Save event-wide ticket messages and check the downloaded ticket](https://app.qase.io/case/SPT-5346) | Tickets (83) | dashboard, tickets, post-purchase | None | 6 |
| Tickets TC-7 | [SPT-5347 — Dashboard - Tickets - Save and clear the event inventory display settings](https://app.qase.io/case/SPT-5347) | Tickets (83) | dashboard, tickets, edit-event | None | 7 |
| Tickets TC-8 | [SPT-5348 — Dashboard - Tickets - Change an unsold event to admission without tickets](https://app.qase.io/case/SPT-5348) | Tickets (83) | dashboard, events, tickets | None | 5 |
| Tickets TC-17 | [SPT-5349 — Dashboard - Tickets - Add and remove an unsold ticket type](https://app.qase.io/case/SPT-5349) | Tickets (83) | dashboard, tickets, edit-event | None | 7 |
| Tickets TC-18 | [SPT-5350 — Dashboard - Tickets - Handle unsaved list changes before opening a ticket editor](https://app.qase.io/case/SPT-5350) | Tickets (83) | dashboard, tickets, edge-case | DialogChoice: Cancel, DiscardChanges, SaveAndContinue | 5 |
| Order form TC-20 | [SPT-5351 — Dashboard - Order Form - Show profile sync only for supported collection settings](https://app.qase.io/case/SPT-5351) | Order form (446) | dashboard, custom-questions, edit-event | None | 9 |
| Advanced options TC-11 | [SPT-5352 — Dashboard - Advanced Options - Add edit and remove custom display fields](https://app.qase.io/case/SPT-5352) | Advanced options (1049) | dashboard, edit-event, appearance | None | 10 |
| Advanced options TC-12 | [SPT-5353 — Dashboard - Advanced Options - Override and restore the event transfer limit](https://app.qase.io/case/SPT-5353) | Advanced options (1049) | dashboard, transfers, edit-event | None | 7 |
| Advanced options TC-13 | [SPT-5354 — Dashboard - Advanced Options - Reject invalid settings without losing saved values](https://app.qase.io/case/SPT-5354) | Advanced options (1049) | dashboard, edit-event, edge-case | Setting: ThirdPartyUrl, EventReportRecipient, ThermalTitle, ThermalMessage | 7 |
| Advanced options TC-14 | [SPT-5355 — Dashboard - Advanced Options - Add cancel and delete an event password](https://app.qase.io/case/SPT-5355) | Advanced options (1049) | dashboard, edit-event, events | None | 9 |
| Shared checks TC-9 | [SPT-5356 — Dashboard - Events - Preserve another page's saved changes](https://app.qase.io/case/SPT-5356) | Page save and recovery (1123) | dashboard, edit-event, edge-case | SecondPage: LegalInfo, Tickets | 7 |
| Shared checks TC-10 | [SPT-5357 — Dashboard - Events - Recover from a save attempted without a connection](https://app.qase.io/case/SPT-5357) | Page save and recovery (1123) | dashboard, edit-event, edge-case | None | 7 |
| Shared checks TC-15 | [SPT-5358 — Dashboard - Events - Use page controls with the keyboard and on a narrow screen](https://app.qase.io/case/SPT-5358) | Page save and recovery (1123) | dashboard, edit-event, mobile-view | Page: BasicInfo, Tickets, LegalInfo, AdvancedOptions | 7 |
| Event list TC-1 | [SPT-5359 — Dashboard - Events - Open the correct event from desktop shortcuts](https://app.qase.io/case/SPT-5359) | Manage Events List (85) | dashboard, events | Action: ManageEvent, Edit, StatsAndInfo, CheckIn, Transactions, TrackingLinks | 5 |
| Event list TC-2 | [SPT-5360 — Dashboard - Events - Use event options on desktop and mobile](https://app.qase.io/case/SPT-5360) | Manage Events List (85) | dashboard, events | None | 9 |
| Event list TC-3 | [SPT-5361 — Dashboard - Events - Open Bulk update and Clone from event options](https://app.qase.io/case/SPT-5361) | Manage Events List (85) | dashboard, events, bulk-update | None | 9 |
| Event list TC-4 | [SPT-5362 — Dashboard - Events - Show only eligible card actions](https://app.qase.io/case/SPT-5362) | Manage Events List (85) | dashboard, events, employee-permissions | AccessScenario: OwnerPublished, OwnerNoTransactions, OwnerDraft, ResellerNoManageEvents, ResellerManageEvents, ResellerTransactions, OwnerChild, OwnerSeriesNoPriceTiers, OwnerStandalone | 5 |
| Event list TC-5 | [SPT-5363 — Dashboard - Events - Use card actions with the keyboard](https://app.qase.io/case/SPT-5363) | Manage Events List (85) | dashboard, events | None | 6 |

Each page file records its former local label and the assigned Qase ID. Publication evidence for this session: /private/tmp/events-qase-push-plan-20261014.json, events-qase-push-dry-run-20261014.json, events-qase-push-applied-20261014.json, and events-qase-push-readbacks-20261014.json. Temporary files are session evidence; the durable ID/folder record is this note.

## Qase organization — UI layout, 2026-10-14

Reorganized Events (79) to match the supplied event sidebar. Created 27 group/page folders, renamed or reparented 19 existing suites, and moved 48 individual cases. No new cases or index entries were created. All 1,827 project case IDs and all 258 original suite IDs remain present; the 189 event-related case bodies checked before/after are unchanged. Final suite count: 285. Sidebar groups and page order were verified.

| UI group | Qase pages in display order |
| --- | --- |
| Event | [Overview (1053)](https://app.qase.io/project/SPT?suite=1053) |
| Manage | [Basic info (1122)](https://app.qase.io/project/SPT?suite=1122)<br>[Tickets (83)](https://app.qase.io/project/SPT?suite=83)<br>[Legal & important info (1131)](https://app.qase.io/project/SPT?suite=1131)<br>[Seating (1132)](https://app.qase.io/project/SPT?suite=1132)<br>[Order form (446)](https://app.qase.io/project/SPT?suite=446)<br>[Donations (1133)](https://app.qase.io/project/SPT?suite=1133)<br>[Financial settings (1134)](https://app.qase.io/project/SPT?suite=1134)<br>[Custom fees (1135)](https://app.qase.io/project/SPT?suite=1135)<br>[Advanced options (1049)](https://app.qase.io/project/SPT?suite=1049) |
| Promote | [Discounts (1136)](https://app.qase.io/project/SPT?suite=1136)<br>[Tracking links (1052)](https://app.qase.io/project/SPT?suite=1052)<br>[Packages (87)](https://app.qase.io/project/SPT?suite=87)<br>[Upgrades (1137)](https://app.qase.io/project/SPT?suite=1137)<br>[Sellers (1138)](https://app.qase.io/project/SPT?suite=1138)<br>[Facebook (1139)](https://app.qase.io/project/SPT?suite=1139) |
| Operations | [Email guests (1035)](https://app.qase.io/project/SPT?suite=1035)<br>[Check in (1140)](https://app.qase.io/project/SPT?suite=1140)<br>[Transactions (1141)](https://app.qase.io/project/SPT?suite=1141)<br>[Waitlists (1142)](https://app.qase.io/project/SPT?suite=1142)<br>[Clone event (1143)](https://app.qase.io/project/SPT?suite=1143)<br>[Cancel event (1144)](https://app.qase.io/project/SPT?suite=1144) |
| Settings | [Branding (1050)](https://app.qase.io/project/SPT?suite=1050)<br>[Email customization (1051)](https://app.qase.io/project/SPT?suite=1051)<br>[Edit attraction (674)](https://app.qase.io/project/SPT?suite=674)<br>[Live stream (1145)](https://app.qase.io/project/SPT?suite=1145) |
| Stats | [Stats & Info (1146)](https://app.qase.io/project/SPT?suite=1146) |
| Admin | [Internal fees (1147)](https://app.qase.io/project/SPT?suite=1147) |

Create event (84), Navigation and permissions (820), Recurring events and templates (1148), and Page save and recovery (1123) live under Create and shared checks (80). Manage Events List (85) and its Bulk Update (86) remain separate at their original level. Map Editor (82), Delivery Settings (448), Hard Copy (1034), and attraction Special Events (480) remain intact inside their matching page folders.

Broad SPT-5077 and SPT-5111 remain directly under Manage because their live contents cover multiple Manage pages. Mixed commerce case SPT-5132 is under Page save and recovery. Event-only tracking snapshots SPT-5328/5329/5331/5333/5334/5336/5338 now sit under Tracking links > Migration regressions (1150); duplicate-looking cases were preserved. Packages (87) moved as a complete event-ticket suite. Event-specific SPT-4296 moved into Upgrades (1137), and SPT-5153 into Transactions (1141). Shared membership upgrades, venue branding/email customization, financials, discounts, scanning and Workflow Approval retain their suites and remaining cases.

Pages with shared-only coverage have a folder description pointing to the specialist suite, without adding placeholder test cases. Donations and Live stream are retained as conditional pages. Existing case enhancements and execution gaps are unchanged by this organization work.

Verification evidence for this session: /private/tmp/events-qase-organization-verification-20261014.json, full before/after case and suite snapshots, folder results and the suite-only case batch plan. These support the move; the durable folder links are recorded above and on each page note.

## Fresh read after organization — 2026-10-14

Read Qase again at 14:21 MDT using one paginated read of **1,827 cases and 285 suites**, then filtered by Events (79) and every descendant. Confirmed **189 unique cases across 50 descendant folders**. Events itself is a container with no directly assigned cases. All 25 published cases, **SPT-5339–5363**, are present under Events; this read made no Qase changes.

**22 of the 28 page folders contain cases when their child folders are included.** The six empty page folders have descriptions pointing to shared coverage; an empty folder is not proof that the feature has no tests anywhere.

| Empty page folder | Current coverage location / limit |
| --- | --- |
| [Financial settings (1134)](https://app.qase.io/project/SPT?suite=1134) | Shared financial/fee suites are referenced. SPT-5077 includes a presence-only scenario; event internal-rate-card cases live under Internal fees (1147). No dedicated case is assigned here. |
| [Custom fees (1135)](https://app.qase.io/project/SPT?suite=1135) | Folder description refers to shared fee calculations. No dedicated case is assigned here. |
| [Discounts (1136)](https://app.qase.io/project/SPT?suite=1136) | Description links to shared Discounts (194), including its specialist child suites. |
| [Check in (1140)](https://app.qase.io/project/SPT?suite=1140) | Description links to shared Check In (184); Order form retains SPT-3270 for answer display. |
| [Waitlists (1142)](https://app.qase.io/project/SPT?suite=1142) | Ticket configuration remains in Tickets / SPT-4384; shared customer flows remain in Core Waitlist (621), and SPT-4224/4225 remain in Waitlist / Resale (796). |
| [Live stream (1145)](https://app.qase.io/project/SPT?suite=1145) | Description references Basic info / SPT-4877. Purchase/access remains in Core Events / SPT-3291. No dedicated provider/Video ID/allowed-ticket configuration case is assigned here. |

Corrections to the earlier local-file-only audit: **Seating contains 25 Map Editor cases in its child folder**, Transactions contains SPT-5153, and Internal fees contains SPT-772/3501/3810/3811. Upgrades contains SPT-4296; its other six locally documented cases remain in the shared Upgrade paths suite (818), as intended by the reorganization. All **121 distinct SPT IDs used as local case headings** exist in the fresh project read; 115 are under Events and those six upgrade cases are outside it.

Case presence does not establish complete field coverage, current native-page parity, or a Passed execution result. In particular, the live SPT-5072 still describes Angular navigation and opens one page per main group; the broader local navigation enhancement remains unpublished. Folder reorganization did not update those steps or prove the direct legacy/new-route handoffs required by SPW-19517.

Read-only evidence: `/private/tmp/qase-events-suite-79-fresh-20261014/suite-79-with-cases.json`, `page-coverage-counts.json`, and the saved complete project snapshots. The evidence is temporary; the verified counts, IDs and folder limits above are the durable record.
