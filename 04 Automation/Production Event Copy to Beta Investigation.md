---
title: Production Event Copy to Beta Investigation
date: 2026-11-04
tags:
  - qa/automation
  - qa/test-data
status: Manual from-scratch Thursday trial passed; workflow corrected; package data pending
---

# Production Event Copy to Beta Investigation

## Current result and repeatable workflow

**Latest local result:** both source Venue rows are now supplied: parent **18044 — FAN EXPO HQ USA** and child **18350 — MEGACON Orlando**. The local helper is prepared to create the parent, then the child with a new local parent ID, in one transaction. Basic Venue setup no longer waits for separate fee/flag/module-price configuration. Offline previews and isolated control-flow checks passed; **actual Django/database apply is not run**. Event creation remains a separate helper taking the new local child Venue ID. No production access, beta mutation, environment repair or product-repository edit was performed.


**Latest result, 2026-11-04:** [MEGACON Orlando 2027 - Thursday manual trial](https://beta.showpass.com/manage/events/megacon-orlando-2027-thursday-manual-trial/basic-info/) was created manually **from the blank Create event form** in the user's existing signed-in beta sidebar. New TT **1628269**, Draft state. Entry/saving took **5 min 49 sec**, final verification **1 min 54 sec**, total **7 min 43 sec**. The prior run was untimed, so a percentage improvement cannot be established. See [the fresh manual trial](#manual-from-scratch-trial-2026-11-04).

**The current workflow is manual from scratch:** [[06 Prompts/Generate Showpass Test Events]]. Scripts, direct API requests, separate logins, Event cloning and generating from an existing Event/template are separate work and are not the default. The script and clone attempts described historically below were mistaken approaches to this request, not prerequisites for the corrected manual trial.

**Created and reopened on beta, 2026-11-04:** [MEGACON Orlando 2027 - QA template](https://beta.showpass.com/manage/events/megacon-orlando-2027-qa-template/basic-info/), in **Draft**, with TT **1628263 — THURSDAY ADULT - Single Day Pass** and Location **16106 — Orange County Convention Center**. The new TT has USD 23 price, 20,000 capacity, USD 15 flat-rate shipping, Will Call, a TT-level USD 3.70 Processing Fee and inherited 6.5% Sales Tax. Both required guest questions and an existing library image were also saved. No purchase was made.

**Standing environment rule:** always assume **beta or demo**. Never open production, sign in to it, query it, call its APIs, or change it without explicit user authorization for that action. User-provided production exports may supply template values. All agent browser work in this run was on beta; no direct production access occurred.

The [[outputs/refund-shipping-2026-10-13/megacon-beta-event-template.json|MEGACON settings reference]] supplies the known values for manual entry. The separately implemented API prototype is not part of the current workflow. The later package candidate is TT **4422570 — FRIDAY FAMILY PASS**, with package details still incomplete in the supplied data.

The user reported an empty result from the direct TT-fee query. Which of the two result sets was empty was not separately established. This does not mean the TT has no effective fees: fee snapshots were already supplied, and beta visibly inherited Sales Tax from the Organization. No repeat production query is required for the relaxed template scope.

See the [executed trial](#beta-generation-trial-2026-11-04) for saved checks and limits. Earlier investigation and local-helper notes below are historical; their old blocked/not-created statuses do not describe this beta run.

## Venue-first scripting feasibility — 2026-11-04

**Conclusion:** the web app provides enough supported operations to script a reusable test Venue configuration and then create Events/TTs. **An exact Venue replica is not established with the currently supplied data or ordinary Organizer API access.** The existing prototype creates Events under an existing Venue; it does not reproduce that Venue. A reliable script must establish and compare the Venue configuration before declaring an Event replica ready.

The implementation should have two stages: **prepare the beta/demo Venue once**, then **create new Draft Events/TTs repeatedly**. Do not recreate the Venue on every Event run. We already have the selected Event, Location, Thursday TT, shipping settings and organizer-fee amounts. The missing source input is the Venue's own configuration and relevant related records, not another Event export. The convention-center address supplied earlier is the Event Location; it does not establish the Venue's business address.

### Supported operations and limits

| Part | Verified local backend contract | What that means for the script |
| --- | --- | --- |
| Organization creation/update | `UserBasedVenueViewSet` uses `RegisterVenueService`; `/api/user/venues/` is registered in the user API. Updates require Manage Organization information. | Create a new owned beta/demo Organization through the supported path; do not insert only a bare Venue row. Creation establishes default roles and owner access. |
| Basic Venue configuration | `UserBasedVenueSerializer` exposes currency, timezone, `modules_enabled`, shipping options/restrictions, many policy/settings fields and parent references. | Use an explicit settings allowlist and new beta IDs. The supplied Venue lookup does not contain these saved values. |
| Fee structure and protected fields | `fee_structure`, custom company-fee amounts, Stripe-connect state and membership revenue-realization state are explicitly read-only in that serializer. | Posting a production Venue response back through the normal API cannot reproduce all fields. Report these as blocked until the supported Admin/backend write path is verified. |
| Organizer fees and tax | Existing custom-fee and fee-value APIs support scoped rules; effective values can be inherited. | Rebuild the applicable parent/override/tax relationships and calculation settings, rather than copying cached TT fee arrays. |
| Showpass internal rate cards | `AdminVenueInternalFeeViewSet` / `AdminVenueInternalFeeValueViewSet` own write APIs. | Requires appropriate beta Admin access. Ordinary Manage Events access does not establish it. |
| Modules | ModuleUsage APIs support enable/disable jobs and selected sub-options; prices are serialized read-only. | Enabling the same feature is not proof of matching module prices. Include required module configuration in the comparison. |
| Parent Organization | `RegisterChildVenueService` creates a disabled child, establishes access, and copies Stripe payment settings, internal fees and fee-calculation configuration from the parent. | A verified beta parent can reduce setup work. It does not copy an arbitrary production child or prove all of MEGACON's configuration matches. Parent hierarchy and overrides need their own source values. |
| Feature flags | `FeatureFlag` stores Venue arrays separately from the Venue row, plus global/user/percentage rules. Beta public flag/switch endpoints are read-only and registered only outside production. | A Venue-row copy misses flags. Remap only the chosen Venue's applicable rules through an authorized Admin/backend path; do not overwrite shared beta flags/switches. Global switch/build differences can still prevent identical behavior. |
| Default records and follow-up | Venue provisioning creates ticket-global settings, a refund policy and widget/default records. Registration completion adds owner roles and sends registration follow-up after commit. | Reconcile defaults with the source instead of duplicating them. Account for notifications/CRM and model-save integrations in the non-production seed setup. |
| Event/TT stage | Existing Event, TT, Location, package and custom-fee contracts already reviewed. | Reuse the saved Event/Thursday data after the Venue comparison passes. The Friday package still needs its actual included-ticket relationships/settings. |

### Recommended delivery path

1. **Capture a settings-only source bundle once.** For source Venue **18350**, include its selected Venue fields, parent settings that actually affect it, enabled modules/sub-options/prices, ticket-global settings, customer-refund policy, organizer/internal fee definitions and values, fee-calculation configuration, and relevant flag decisions. Use the supplied exports already available. Any additional production read must be separately authorized; no such access is implied here. Exclude Customer/order data and replace live credentials/provider identities/notification recipients with approved beta equivalents.
2. **Choose the destination transport.** A backend Django seed command is the most complete route when local/beta backend execution is available because it can use the owning services and Admin-only model configuration. With no beta shell, use the supported user/Venue APIs plus authorized Admin APIs/forms for the protected parts. If necessary Admin access or write paths are unavailable, report a partial configuration; do not call it an exact replica.
3. **Create or deliberately select the dedicated test Venue.** Use fresh IDs, resolve its intended parent, apply source settings and related records, and preserve existing unrelated beta Organizations. Reuse the verified Venue for later Event runs. A known existing beta Organization can be compared instead of creating another one, but its current name alone does not establish parity.
4. **Compare before generating Events.** Check every selected setting and relationship against the source bundle, including inherited values. Return Copied / Beta replacement / Different / Missing / Blocked. Required mismatches stop the Event stage. Match the saved configuration and effective flag decisions, not only a successful POST response.
5. **Generate and verify new Draft Events/TTs.** Feed the verified destination Venue and our existing Event input into the script; wait for jobs and compare fresh saved values. This stage is repeatable without rebuilding Venue configuration each time. Keep checkout/inventory/fulfillment proof separate from configuration creation.

### Existing commands are references, not the safe copier

`export_venue` exports whole Venue-related tables and recursively follows dependencies. It also creates a `TempFile` record, so running it is not a read-only production export. `import_venue --remap-id` changes the Venue ID, but related row identities are not comprehensively regenerated, conflicting inserts can be skipped with `ON CONFLICT DO NOTHING`, and wallet customization is not copied. These commands should not be run unchanged for this focused test-config replica. Their limitations were already established in the earlier investigation.

### Present access and evidence

- **Source-backed feasibility:** yes, for a settings-only test configuration with the supported write paths and sufficient access.
- **Literal exact production clone with current access/data:** unproven; ordinary Organizer APIs alone leave confirmed write gaps. No beta shell access is available, and necessary beta Admin permissions have not been verified.
- **Missing source data:** the detailed Venue/parent/flag/module/rate-card configuration. The Event export is already available and should not be requested again.
- **Standalone script authentication:** the earlier prototype's configured API login returned HTTP 400; that separate session issue remains unresolved. The working sidebar login proves manual access, not the standalone script's authentication.
- **Local seed execution:** not run. The previous local database was unavailable and environment repair was deferred; no services or Django management commands were started here.
- **New implementation / live comparison / timing / CI:** not run. This request was a source investigation; no backend repository was edited.

### Source references

Reviewed local backend HEAD: `3550179e4d`. No backend working-tree changes were reported by `git status --short` during this investigation. These contracts have not been verified against a deployed beta revision.

- [User Venue registration/update entry](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/viewsets.py:65>) and [route registration](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/users/api/routers.py:61>).
- [Protected/read-only Venue fields](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/serializers.py:43>) and [remaining exposed settings](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/serializers.py:301>).
- [Venue registration service](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/venue_registration/standard.py:9>), [default provisioning](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/venue_registration/provision_venue_defaults.py:4>), [owner/follow-up completion](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/venue_registration/completion.py:10>) and [child inheritance](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/venue_registration/child.py:18>).
- [Internal-fee Admin API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/admin/viewsets/fees.py:46>), [module operations](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/venue_based/viewsets/modules.py:25>) and [read-only module prices](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/venue_based/serializers/modules.py:43>).
- [Venue-scoped and global flag rules](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/models/feature_flags.py:8>), [read-only flag API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/public/viewsets/rollout_configuration.py:32>) and [non-production route restrictions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/api/routers.py:179>).
- [Whole-Venue export](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/export_venue.py:35>) and [import identity handling](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/import_venue.py:236>).

## Earlier investigation — historical conclusion

**Current scope, confirmed by the user:** the exports are from **production**. The goal is to generate a beta Event using the production names, prices, TT settings and ticket-level fees as a template; exact production equivalence is no longer required. Use Event **1533087** and TT **4422561**. New beta records need beta IDs. The earlier local helper is an unexecuted prototype, not the current creation path. No Event or TT has been created by the agent.

### Remaining source query: direct TT fees

The Event, Location and focused TT exports have already been supplied; do not request them again. The following read-only queries fetch fee values attached directly to the selected TT, with their fee names. They deliberately do not collect Organization-wide or Event-wide fee values. Query definitions were checked against local backend models; these queries have not been executed by the agent against production.

```sql
-- Organizer fees and taxes assigned directly to this TT.
SELECT fee.name AS fee_name, fee.type AS fee_type, fv.*
FROM financials_venuecustomfeevalue AS fv
JOIN financials_venuecustomfee AS fee ON fee.id = fv.venue_custom_fee_id
JOIN tickets_tickettype AS tt ON tt.id = fv.ticket_type_id
WHERE tt.event_id = 1533087
  AND tt.id = 4422561
  AND fee.is_active = TRUE
ORDER BY fv.id;

-- Showpass fees assigned directly to this TT.
SELECT fee.name AS fee_name, fee.fee_type, fv.*
FROM financials_venueinternalfeevalue AS fv
JOIN financials_venueinternalfee AS fee ON fee.id = fv.venue_internal_fee_id
JOIN tickets_tickettype AS tt ON tt.id = fv.ticket_type_id
WHERE tt.event_id = 1533087
  AND tt.id = 4422561
  AND fv.archived IS NOT TRUE
ORDER BY fv.id;
```

An empty result means no fee values are assigned directly to that TT in that table; it does not establish that checkout has no fees. Preserve the existing fee snapshots as reference. A matching checkout total has not been tested. Remaining sections record the earlier investigation and local prototype.

**A rich single-day Event can be recreated on beta without beta shell access, using authenticated APIs for the settings those APIs allow. An exact copy of any production Event cannot be promised with ordinary Manage Events access alone.** Some behavior belongs to the Organization, feature flags, internal rate cards, seating permissions, or external services rather than the Event itself.

If production shell access or an approved database query is available, it can supply a more complete export of the settings. Beta still needs permission to create the equivalent records. If a developer can also run a beta import, more settings become reachable, but safe copying still requires deliberate ID replacement, test payment configuration, and checks after creation.

The recommended design is **one selected production Event → settings-only export → preview of differences → new beta Event and related records → fresh comparison**. Playwright can run the beta API work and later use the same generator in tests.

This investigation used local backend, frontend, and Playwright source. The selected source is now Event **1533087**, **MEGACON Orlando 2027**, based on the user's lookup below. The database that produced that result has not yet been identified. The immediate trial is local; the eventual target remains beta. Production API/database access, beta account permissions, deployed versions, and an actual copy remain unverified. The agent has not performed remote reads, browser work, Showpass record changes, or product-repository edits.

## Reproducible local trial

Record the database environment beside each result. Use the same sequence for another Event, replacing the Event ID first and obtaining its actual Venue and Event Location IDs from Step 1. Do not assume equal IDs across environments refer to the same records.

**Current scope correction:** the user wants to **copy the Event first**, then add one TT and its shipping/fees. Stage 1 is Event **1533087 — MEGACON Orlando 2027**, plus only the local Organization and Location records needed to own it. Stage 2 is the proposed TT **4422561 — THURSDAY ADULT - Single Day Pass**. Its export lists price **23 USD**, capacity **20,000**, `is_bundle=False`, `is_custom_package=False`, and `has_payment_plans=False`. These are exported settings, not an executed checkout result. All-ticket transfer remains deferred.

**Shipping and fees remain in the first TT's scope.** Selecting one TT reduces the number of records to copy; its delivery options, charges, fee/tax rules, payer, calculation bases, and applicable payment/channel conditions still need to match. Use SQL aliases `e` for Event and **`tt` for Ticket Type**, as requested by the user.

### Step 1 Identify the source Event and owner

**No data change.** In the database containing the intended source Event, run:

```sql
SELECT
    e.id AS event_id,
    e.name AS event_name,
    e.venue_id,
    v.name AS organization_name,
    v.currency,
    e.location_id
FROM tickets_event AS e
JOIN venues_venue AS v ON v.id = e.venue_id
WHERE e.id = 1533087;
```

**User-reported result on 2026-11-04; environment not yet stated:**

| Event ID | Event name | Venue ID | Organization name | Currency | Event Location ID |
| --- | --- | --- | --- | --- | --- |
| 1533087 | MEGACON Orlando 2027 | 18350 | MEGACON Orlando | USD | 54229 |

This establishes the returned ownership relationship. It does not establish that the same records exist locally or on beta. Earlier example Event ID 1549726 is superseded by 1533087.

### Step 2 Export the source settings

The copy must work when the source Organization, Event Location, and Event do not exist locally. Searching local for production IDs is not a required step. The earlier proposed local lookup was withdrawn before any results were reported.

**Received on 2026-11-04:** the original Ticket Type attachment was an Excel workbook despite its `.csv` filename. Its preserved [[outputs/refund-shipping-2026-10-13/del-converted.csv|converted CSV]] contains **30 distinct Ticket Types and 159 columns**, all referencing Event **1533087** and Venue **18350**. Conversion preserved all 4,929 cells, including the header. Its timestamps are human-readable strings; conversion cannot recover precision absent from those strings.

The user subsequently replaced `del.csv` with a focused export. The new [[outputs/refund-shipping-2026-10-13/del.csv|source attachment]] has headers at `Sheet1!A3:AC3` and one result at `A4:AC4`. The [[outputs/refund-shipping-2026-10-13/event-1533087-tt-4422561-source.csv|normalized focused CSV]] preserves that result as **one data row and 29 columns**; the source attachment was left unchanged. Its label `Playground` does not establish whether the database is production or local.

| Confirmed field | Focused export value |
| --- | --- |
| Event | 1533087 — MEGACON Orlando 2027 |
| Venue / Location | 18350 / 54229 |
| Timezone | US/Eastern |
| Event dates | May 20, 2027 at 4:00 p.m. through May 23, 2027 at 5:00 p.m., Eastern daylight time |
| Proposed TT | 4422561 — THURSDAY ADULT - Single Day Pass |
| TT date override | Start override is null; end is May 20, 2027 at 9:00 p.m. Eastern daylight time |
| TT sale window | Oct. 8, 2026 at 10:45:53.399347 a.m. EDT through Jan. 14, 2027 at 11:59 p.m. EST |

The Event spans four calendar days; the chosen TT covers Thursday. Do not silently shorten the Event to the TT's end time. The focused export does not include the Event's description, images, questions, visibility, full limits, or other saved Event fields.

For TT **4422561**, that export already includes the shipping fields and fee snapshots:

| Setting | Exported value | Limit of this evidence |
| --- | --- | --- |
| Delivery options | `st_delivery`, `st_will_call` | Actual local choices have not been created or tested. |
| Delivery charge | 15 USD; `sp_flat_rate`; `combine_shipping=False`; `shipping_cost_overrides_basket=False` | Preserve the saved charge method and combination settings; do not infer multi-item totals from the amount alone. |
| Will Call handling charge | 0; `sp_per_ticket_item_group`; combination disabled | Source setting only. |
| Electronic-ticket handling charge | 0; `sp_per_ticket_item_group`; combination disabled | A configured charge field does not establish Electronic Ticket as an offered delivery choice. |
| Organizer fee snapshot | Processing Fee 3.70 USD; Sales Tax fraction 0.065 (6.5%); both `is_absorbed=False` | These are copied pricing snapshots. Verify/recreate their actual fee rules and inheritance before claiming matching local checkout. |
| Internal fee snapshot | 46 entries covering different conditions | Not 46 charges on one order. Determine applicable rules by payment method, channel, overrides, and price conditions. |

The shipping fields are already available in the attachment; they are included below to provide the complete focused query requested by the user. The remaining financial read must target the actual applicable Organization/Event/TT fee rules and tax relationships. Copying `venue_internal_fees`, `venue_custom_fees`, `fee_calculation_config`, or `configured_fees_pricing_info` snapshots alone does not establish those underlying rules or a matching purchase total.

**Completed focused source read — no data change.** The following query produced the received one-row export. Keep it for reproducibility; it does not need to be run again. The fee arrays are snapshots, not the authoritative fee records needed for creation.

```sql
SELECT
    e.id AS event_id,
    e.name AS event_name,
    e.venue_id,
    e.location_id,
    e.timezone,
    e.starts_on::text AS event_starts_on,
    e.ends_on::text AS event_ends_on,
    tt.id AS ticket_type_id,
    tt.name AS ticket_type_name,
    tt.price,
    tt.inventory,
    tt.custom_ticket_event_starts_on::text AS ticket_starts_on,
    tt.custom_ticket_event_ends_on::text AS ticket_ends_on,
    tt.sale_starts_on::text AS sale_starts_on,
    tt.sale_ends_on::text AS sale_ends_on,
    tt.shipping_type,
    tt.shipping_cost,
    tt.shipping_fee_method,
    tt.combine_shipping,
    tt.shipping_cost_overrides_basket,
    tt.will_call_handling_cost,
    tt.will_call_fee_method,
    tt.combine_will_call_cost,
    tt.e_ticket_handling_cost,
    tt.e_ticket_fee_method,
    tt.combine_e_ticket_cost,
    tt.fee_calculation_config,
    tt.venue_custom_fees,
    tt.venue_internal_fees
FROM tickets_event AS e
JOIN tickets_tickettype AS tt ON tt.event_id = e.id
WHERE e.id = 1533087
  AND tt.id = 4422561;
```

Expect one row matching the chosen Event and Ticket Type. The Thursday ticket has a custom event end time in the supplied export; retain the distinction between the Event's dates and that ticket's dates. This read does not yet supply every Event setting or the Location's address. Prepare those local prerequisites only as needed for this small trial. Shipping and applicable fees/taxes are included. Other TTs, package/seating dependencies, and full Event equivalence remain outside the first trial unless explicitly added.

**Status:** the focused source read is complete. The database environment remains unconfirmed. Local Organization/Location/Event creation and verification have not started. A read-only connection to the configured `127.0.0.1:5432/showpass` database initially hit the sandbox; the permitted retry reached localhost and returned **Connection refused**. No local database read or write succeeded. The backend virtualenv reports Python 3.12.10 and Django 5.2.15, while current repo guidance expects Django 5.2.18; no Django command was run after that mismatch was identified.

### Step 3 Read the Event record by itself

**Completed — no data change.** The user supplied the result of this Event-only query:

```sql
SELECT e.*
FROM tickets_event AS e
WHERE e.id = 1533087;
```

**Received:** [Event-only pasted export](</Users/christianvaldez/.codex/attachments/527e2ced-e8b0-476e-824f-907c036074f6/Pasted text.txt>) on 2026-11-04. Parsed and checked **one row with 161 fields**, matching Event **1533087**, Venue **18350**, and Event Location **54229**. Exact Event dates/timezone are already available from the earlier focused CSV, so no repeat date query is needed. Keep the raw export local and out of Git.

| Event setting | Confirmed source value | Local-copy treatment |
| --- | --- | --- |
| Name | MEGACON Orlando 2027 | Preserve the name or append a clear local-copy suffix when creating the new record. |
| Schedule | Non-recurring; no parent; May 20–23, 2027; US/Eastern | Preserve the Event's multi-day schedule. The Thursday TT's shorter validity belongs to the next stage. |
| Source lifecycle | Active; no scheduled activation | Create as a local Draft initially; publication is a separate step. |
| Description | Empty | Preserve the empty value rather than inventing content. |
| Event Inventory | No Event-wide limit | Do not substitute the selected TT's 20,000 capacity as the Event capacity. |
| Assigned Seating | No assigned space | No seating map is required to create this Event. |
| Guest details | First name, last name, email; per-ticket enhanced collection | Preserve the saved definitions; customer execution remains untested. |
| Custom questions | Required age selection and required interests checkboxes, both marked for collection after purchase | Both reference 30 production TT IDs and include TT 4422561. Preserve the definitions but remap selected TT bindings when its local TT exists; never retain those production TT IDs on the new Event. |
| Runtime relationship summaries | `has_products=True`, `is_waitlisted=True`, distributed Inventory enabled | These do not supply the linked records. Do not claim Products, Waitlists, or distributed Inventory are operational because a summary flag was copied. |
| Images and external references | Image paths, external website link, Google Wallet resource ID/payload | Handle assets separately. Clear provider-owned Wallet identity on creation; do not point the new local Event at the production Wallet resource. |
| Production account/activity data | Report email recipients and favorite-user IDs present | Exclude those recipients and user references from the local copy. |

This is a source export, not an insert payload. The local Draft still needs a new local Venue and Event Location. No new Event, TT, or fee export is requested at this stage.

### Step 4 Read the Event Location

**Completed — no data change.** The user supplied the result of this Location query:

```sql
SELECT l.*
FROM tickets_eventlocation AS l
WHERE l.id = 54229;
```

**Received:** one Location row, ID **54229**, owned by Venue **18350**:

| Field | Source value |
| --- | --- |
| Name | Orange County Convention Center |
| Street | 9800 International Dr |
| City / province / country | Orlando / Florida / US |
| Postal code | 32819 |
| Position | 28.424717,-81.46993839999999 |
| Unit | Empty |
| Default Venue location | False |

The new Location uses these address/position values and a fresh local Venue reference. Its geometry is derived by the model. Production `place_id` and `google_place_id` are not copied, so this fixture does not trigger an external Google Places lookup. No further source query is required for this Event-only stage. The source Organization's identity, USD currency, and Event timezone are already recorded.

### Step 5 Prepare and verify the local Venue first

**Updated 2026-11-04:** two source Venue rows are now available. The user supplied the full child row (264 fields) and then the focused parent row (26 fields). Only selected fields needed for the test setup are retained. No more full Venue/Event/TT export is requested for this basic setup.

| Creation order | Source | Local input | Saved relationship |
| --- | --- | --- | --- |
| 1 | 18044 — FAN EXPO HQ USA | `outputs/refund-shipping-2026-10-13/venue-18044-local-copy-input.json` | New root Venue with `is_parent=True` |
| 2 | 18350 — MEGACON Orlando | `outputs/refund-shipping-2026-10-13/venue-18350-local-copy-input.json` | New child linked to the newly created local root |

The [Venue helper](</Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/05 Tooling/scripts/copy-local-venue.py>) loads the parent's input through the child's `parent_input` reference. It creates both in one transaction, checks owner access, compares selected saved settings for both, and returns the source-to-local ID mapping. It creates no Events or TTs. Same-name destinations are refused before creation; they must be checked with `verify_local_venue` instead. It does not silently replace or edit an existing Organization. Failure of a supplied-field or relationship check raises inside the transaction. Actual database rollback is still untested.

**Retained configuration:** currency/timezone, business addresses, enabled modules, tier/fee structure, shipping countries/regions and quantity limits, transfers, barcode delivery, all-in pricing, recurring Events and package revenue mode. The parent enables module IDs **8, 7, 1** (Group Sales, Exchanges, Events); the child enables **1, 7**. MEGACON shipping has a **12-item limit**, unlike the parent. The child's exchange fee policy values `no_fees` for web and Box Office were recovered from its supplied full export, without another source query. Module/region list order does not change comparison; governed timezone aliases use the backend's canonicalization.

**Deliberate local values:** names gain a Local copy suffix. The parent is enabled/private with category 4 as local setup choices; its parent role follows the supplied relationship. Backend validation requires a parent registration recipient, so only the existing **local owner's email** is used. The parent's unexported exchange fee policy uses the backend's no-fee default. No source emails/accounts, payment gateways, credentials, integration identities, notification recipients, free-text contact/policy wording or artwork are copied. Normal local model defaults still apply; this is a selected-fields copy, not an exact whole-Organization clone. New-record feature defaults are followed by a normal second save of the selected fields, then a fresh comparison; default normalization or validation can still reject the apply and must be reported rather than bypassed.

**Issue to flag:** the supplied parent business address is **20 Eglinton Ave W, Toronto, New York, M4R 1K8, US**. Toronto/postal code disagree with state/country. It is retained exactly as supplied with a warning; no corrected location was invented. The child business address remains **301 N Cattlemen Rd, Sarasota, Florida 34232, US**. The Event's Orlando convention-center Location stays separate.

**Fees are separate:** related organizer fees/taxes, internal rate cards/calculation settings, module usages/prices, refund-policy records and flag decisions remain recorded under `deferred`. They do **not** block basic parent/child creation. The result explicitly reports `financial_configuration_verified: false`; creating these rows does not establish matching checkout totals or source-equivalent behavior. No global beta/local flags are changed.

**No data change — offline preview:**

```python
import runpy
from pathlib import Path
vault = Path("/Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault")
data = vault / "outputs/refund-shipping-2026-10-13"
venue_tools = runpy.run_path(str(vault / "05 Tooling/scripts/copy-local-venue.py"))
venue_input = data / "venue-18350-local-copy-input.json"
venue_tools["copy_local_venue"](venue_input)
```

Expected preview: `create_order` contains **18044 then 18350**, `status: requires_local_verification`, no missing basic data, address warning, deferred configuration, `creates_events: false` and financial verification false. Preview imports no Django and connects to no database.

**Changes test data — prepared, not executed:** in the normally configured local backend's Django shell, reuse the variables above and run:

```python
local_venues = venue_tools["copy_local_venue"](
    venue_input,
    owner_email=input("Existing local login email: ").strip(),
    apply=True,
)
venue_tools["verify_local_venue"](venue_input, local_venues["venue_id"])
```

The helpers only admit `IS_DEV=True` with a localhost database. Expected apply output contains the new child `venue_id`, new `parent_venue_id`, `source_to_local_venue_ids` for **18044 and 18350**, selected-fields/link verification scope, financial verification false and deferred items. Source IDs are metadata only and are never assigned as destination relationship IDs. Record actual returned IDs before proceeding.

**Progress and troubleshooting — added 2026-11-04:** the module/function docstrings now identify the public entry points, parameters, returned IDs and limits. Both helpers print immediate UTC timestamps, step names, provisional local IDs, owner-access/settings checks, suppressed-job count and elapsed duration. `COMPLETE` appears only after the function's work finishes; an exception prints `FAILED` with its type and is re-raised. Error messages do not claim a rollback before it has completed. Logs do not print the owner email or credentials. Output includes progress plus a JSON summary; the returned dictionary remains the input to the next stage. Full load/preview/apply examples and Python `True` syntax are in [[06 Prompts/Generate Showpass Test Events#Separate local scripting work|the local scripting instructions]]. A failed apply requires checking the error and actual records before retrying; IDs printed while the transaction is open do not establish saved data.

The [focused reusable query](</Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/outputs/refund-shipping-2026-10-13/venue-18350-settings-query.sql>) still documents the explicit non-secret source fields for future use; it was not executed by the agent. Its existing results need not be requested again.

### Step 6 Create the Event under that existing local Venue

[copy-local-event.py](</Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/05 Tooling/scripts/copy-local-event.py>) now requires an **existing local Venue ID** for apply. It cannot create a Venue. Its [Event input](</Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/outputs/refund-shipping-2026-10-13/event-1533087-local-copy-input.json>) references the separate Venue input, retaining the supplied Event/Location values and deferred questions.

```python
event_tools = runpy.run_path(str(vault / "05 Tooling/scripts/copy-local-event.py"))
event_input = data / "event-1533087-local-copy-input.json"
event_tools["copy_local_event"](event_input)  # Offline preview only.
```

**Changes test data — not executed:** after the Venue stage passes in the running local backend's Django shell, call `event_tools["copy_local_event"](event_input, venue_id=LOCAL_VENUE_ID, apply=True)`, replacing `LOCAL_VENUE_ID` with the actual returned local ID. Do not use source Venue ID 18350 as a destination ID. The helper refuses unresolved Venue input, checks that the two inputs refer to the same source Venue, restricts the database to DEV/localhost, locks and rechecks the existing Venue before writing, and refuses the existing Event slug. It creates only the supplied Location and a Draft Event, checks saved Event fields and zero TTs, and raises inside its transaction if those checks fail. The established Venue remains in place for later Events.

Both helpers suppress Celery dispatch, external Venue save synchronization where applicable, process-local email delivery and Slack delivery. This proves saved setup values only when actually run; it does not prove normal background jobs, checkout or customer-facing behavior. Images, products, waitlists, distributed Inventory, TTs and question bindings remain deferred. TT/shipping/fee setup follows as a separate stage.

**Verification:** syntax and both offline previews passed with the supplied parent/child inputs. Isolated checks with mocked models/transaction passed for non-DEV/non-localhost refusal, parent-first order, new local ID mapping, duplicate refusal before writes and verification failure leaving the transaction with an error. The input allowlist also rejected an unexpected source gateway reference. These checks do not establish actual Django save/default behavior or database rollback. End-to-end creation, saved owner access, normal background behavior and UI checks for the split helpers remain unrun.

**Logging checks passed:** both real offline previews emitted STARTED/COMPLETE and the no-database message. Missing-input errors emitted FAILED and were re-raised. An isolated mocked apply exercised parent-first creation, provisional ID/link messages, final transaction messages and elapsed completion without printing the owner email. A simulated saved-field failure preserved its exception and emitted no transaction-finished or COMPLETE message. This does not establish a real Django save or database rollback. No temporary files or records were created by these checks.

**Local environment still deferred:** the earlier read-only localhost database attempt returned `Connection refused`; the detected virtualenv had Django 5.2.15 while backend guidance required 5.2.18. This split does not repair or start that environment. No services, package installs or backend repository changes were made.

**Cleanup:** neither helper deletes existing data. No cleanup mutation was needed because neither apply has run. After a future successful run, record the exact new IDs; use supported Archive/Admin operations for those records and verify the result before removing their newly created Location/Venue defaults. Preserve a verified Venue when it is intended for reuse.

### Remaining steps

7. Run the prepared two-Venue stage in the normally configured local backend, record both local IDs and verify access/settings. Local services/environment repair remains deferred; it was not started here.
8. Run the separate Event stage against the returned **child** Venue ID and check the Draft in Admin/Dashboard. No further basic Venue or Event export is required.
9. Add the selected TT with shipping settings and applicable fees/taxes; resolve only the related configuration needed for that trial and remap custom questions to the new TT. Purchase, fulfillment, package and financial verification remain separate, unrun work.

## What shell access changes

| Available access | What can be done | Limit |
| --- | --- | --- |
| Production organizer API reads and beta organizer API writes | Read the Event and accessible related settings; recreate them through beta APIs. | Hidden/Admin settings and unavailable features can prevent an equivalent result. |
| Production read-only shell/query plus beta API writes | Export explicit settings and relationships that the Event API does not return; build the same beta records through APIs. | Exporting a setting does not grant permission to write it on beta. This route fits the current lack of beta shell access. |
| Production read-only export plus a developer-run beta importer | Reuse backend services and prepare approved Admin-only settings as well. | Requires a focused importer, environment checks, and isolation. Shell access does not make a raw database copy safe. |
| Production public Event page/API only | Recreate the customer-visible parts returned publicly. | Insufficient for the richest configuration: private tickets, actual rate-card rules, permissions, and hidden settings may be absent. |

Local terminal access to these repositories is different from shell/database access inside production or beta. No working remote shell connection was established here.

## Existing tools and their limits

### Normal Event cloning stays in one environment

The backend validates `original_id` against an Event in the active Venue. Every `clone_original_ticket_type` must belong to that source Event and Venue. Sending production IDs to beta could fail or refer to unrelated beta records; matching numeric IDs do not establish matching records.

The existing clone completion service copies rate cards and passwords from records in that same database. It is not a cross-environment transfer service. The current frontend also warns that seat-map ticket assignments, tiered discounts, fee financial-level overrides, and resale/Waitlist configuration are not copied. Backend clone handling clears public sold-out, Waitlist, and resale state.

Sources: [clone validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py:1224>), [clone completion](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/event_management/complete_event_clone.py:10>), [frontend omissions](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-clone/constants/event-clone-contract.ts:174>), and [clone warnings](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-clone/utils/event-clone-payload.ts:48>).

### Whole Organization export and import commands exist

`export_venue` discovers tables linked to a Venue, exports their full rows, follows dependencies up to a configurable depth, and stores a ZIP in a new `TempFile` record. It has no Event-selection or settings-only option. It therefore **writes to production if run there** and can include Customer, order, account, and other unrelated data. It is not the proposed read-only export.

`import_venue` restores that archive through SQL. Its options include assigning a new Venue ID, deleting an existing Venue, and skipping foreign-key validation. Assigning a new Venue ID does not assign fresh IDs to every Event, Ticket Type, or dependency. Related inserts use `ON CONFLICT DO NOTHING`, so existing beta records may be skipped rather than recreated. The command also deliberately omits a wallet-customization assignment when copying a Venue.

These commands are useful implementation references, but **do not run them unchanged as a one-Event copier into shared beta**. Their existence does not prove a complete or safe production-to-beta copy. No API wrapper for these commands was found in the relevant API source reviewed.

Sources: [export scope and arguments](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/export_venue.py:35>), [archive write](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/export_venue.py:203>), [full-row export](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/export_venue.py:248>), [import options](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/import_venue.py:44>), [Venue ID replacement](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/import_venue.py:237>), and [related-row inserts](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/management/commands/import_venue.py:327>).

## What the richest useful copy includes

The target should preserve the selected Event's actual combination of settings. Enabling every feature would produce a different Event and may combine unsupported options. A single-day Event can still depend on other Events, Products, or Memberships; those dependencies must be included or explicitly replaced.

| Settings | Source-backed route | Required treatment or limit |
| --- | --- | --- |
| Name, description, categories, terms, dates, doors time, timezone, visibility, ticket limits | Venue Event API | Create new identity; choose whether to preserve dates or move them together. Create as Draft initially. |
| Ticket names, prices, capacity, sales windows, purchase limits, delivery options, scan windows, transfer settings | Event's nested Ticket Types and Ticket Type API | Fresh beta IDs; explicit writable fields only. Do not submit computed counts, price locks, or derived fields as configuration. |
| Customer and Attendee information, custom questions, collection before/after purchase | Event and Ticket Type fields | Preserve definitions and collection rules, not real answers. Question validation and post-purchase collection depend on beta flags. |
| Event Location | Separate Event Location API | Match a verified beta Location or create a new owned Location. Do not reuse a production Location ID. |
| Images and banner | Supported image field/upload contract | Re-upload approved assets or use test replacements. A production URL is not proof that beta owns the file; arbitrary remote URLs are not generally accepted as image uploads. |
| Public sold-out appearance | Ticket Type `public_sold_out` | Requires `enable_force_public_sold_out`. It affects public sales; Box Office continues using real Inventory. |
| Genuine exhausted Inventory | Supported beta ticket issuance/order flow | Create a small known capacity and issue the tickets through a supported test flow. Production sold counters and orders are excluded. Payment, ticket, and cleanup proof are separate work. |
| Access passwords | Separate password API | Preserve the rules using new beta access codes; replace ticket/Event references. Do not export real production access secrets for reuse. |
| Packages and included tickets | Separate package APIs | Create all needed beta tickets/items first; rebuild inclusion quantities, guest-information rules, barcode mode, and revenue allocation. Cross-Event dependencies expand the copy scope. |
| Seat map and ticket assignments | Space/segment/location APIs and seat-permission actions | Match or rebuild geometry and seat identities, then assign new beta Ticket Types. An assigned map alone does not prove the same tickets can sell the same seats. Full recreation remains a separate unverified capability. |
| Organizer fees and taxes | Separate custom-fee and custom-fee-value APIs | Requires `VP_MANAGE_FINANCIALS`; rebuild parent/override relationships and tax-on-fee links. Compare inherited rules as well as Event overrides. |
| Showpass internal fees | Admin internal-fee APIs or approved beta shell work | Ordinary Manage Events permission is insufficient. Exact financial equivalence can be blocked here. |
| Waitlist | Ticket-specific enable/settings APIs | Recreate settings with new beta references. Do not copy subscribers, saved payment methods, or pending fulfillment. |
| Upgrade offers, automatic release rules, discounts, resale, Payment Plans | Additional resources and/or Ticket Type configuration | Not a complete part of the Event clone payload. Each selected feature needs its own exporter, creator, dependency mapping, and supported beta setup before it can be claimed copied. |
| Branding and Organization-owned selectors | Separate branding/configuration resources | Resolve beta equivalents; branding creation requires Organization-info permission. Payment/currency/module/flag differences may change behavior despite equal Event fields. |
| Gateways, provider credentials, notifications, integrations, webhooks, linked external accounts | Organization/Admin/external-service setup | Use approved beta test equivalents. Never carry production payment credentials, live destinations, or provider account IDs into the copy. Exact external-service behavior is not supplied by an Event import. |

API registrations: [Event and dependency routes](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/routers.py:242>). Field contracts: [Event fields](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py:1819>), [Ticket Type fields](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/ticket_types.py:434>), [package fields](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/packages.py:85>), [question validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py:737>), [media input](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/api/fields/media.py:86>), [public sold-out](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/public/serializers/ticket_types.py:55>), [custom-fee permissions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/fees.py:44>), [internal-fee Admin API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/admin/viewsets/fees.py:46>), [Waitlist actions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/waitlist_viewsets.py:167>), [seat assignments](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/seating.py:77>), and [branding permissions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/viewsets/branding.py:25>).

## Proposed operation

1. **Use the supplied settings template.** Default to the existing local exports and beta/demo records. Any production access, including authentication and read-only queries, requires explicit user authorization for that action. The earlier export design is not standing authorization to access production.
2. **Build a settings list before creating anything.** Classify every exported field and dependency as Copy, Replace with beta equivalent, Omit deliberately, or Blocked. Unknown settings stay visible. Required mismatches stop creation; optional differences must be clearly shown.
3. **Check beta access and setup.** Confirm the exact Organization, employee permissions, currency, timezone, modules, relevant flags, test gateway, and available API contracts. Manage Events is the baseline; financial, branding, seating, and Admin preparation can need additional permissions. A successful login does not prove these capabilities.
4. **Preview the copy.** Show the supplied template, destination Organization, chosen dates, new Event name, new records, replacements, and unsupported settings. Replace emails with controlled test destinations and remove production checkout/action links from copied content. Do not access or authenticate to production without explicit authorization.
5. **Create beta prerequisites and a Draft Event.** Use separate production and beta sessions with fixed host restrictions and explicit beta Venue IDs. Reject unexpected redirects. Build a production-to-beta ID map for every record type, including references inside JSON. Never submit production `original_id`, clone markers, nested `id`/`pk` values, or raw GET responses as a create payload.
6. **Add dependent configuration in order.** Create fees/taxes, package links, passwords, seating assignments, and other supported resources only after their required beta records exist. Use selected test equivalents for external integrations. A later failure leaves an accurately reported partial Draft rather than a claimed successful copy.
7. **Wait and read back.** Event creation may return a background-job ID. Check its final result and keep reading until the Event is no longer generating. Compare every selected saved setting and relationship using fresh reads. Return the Event ID, Ticket Type IDs, links, and the exact remaining differences. Do not blindly retry a create after a timeout; determine whether the first Event was created.
8. **Choose the finishing state.** Keep the verified Event for manual QA when requested. For temporary tests, archive only records created by the run through supported actions and verify the result. Purchased Events and linked Memberships can prevent archival; sold-out-through-sales setups need their own cleanup plan. Draft creation proves saved setup only; paid checkout, fee allocation, delivery, and admission need separately authorized tests before claiming equivalent behavior.

## Existing Playwright work to reuse

The repo now has more support than in the September discussion:

- [API login helper](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/utils/api-helpers.ts:351>) signs in to a separate API session and obtains the CSRF token needed for writes.
- [Cloudflare helper](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/helpers/cloudflare-access.ts>) supports host-scoped beta/demo access. Generic API contexts must explicitly use the applicable Access setup; it is not automatically inherited from the browser configuration.
- [Event-authoring setup](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/web/dashboard/build/events/event-authoring.fixture.ts:241>) reads employment, permissions, reference Event, and Locations before creating data.
- [Event-authoring persistence and cleanup](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/web/dashboard/build/events/event-authoring.persistence.ts>) tracks creation, background jobs, fresh reads, and exact owned Event archival.

These are reusable patterns, not an existing production-to-beta copier. Keep the exporter/settings format separate from the transport so a production shell export and API export can feed the same beta creator. A manual command should preserve its output; a test fixture can request cleanup.

## What is established and what remains

| Check | Result |
| --- | --- |
| Can Event creation happen without beta shell? | Confirmed in source: authenticated venue API supports it. Not executed on beta. |
| Can the normal clone copy across environments? | Confirmed in source: it requires local source records in the active Venue. |
| Do whole-Venue shell transfer commands exist? | Confirmed in source. They are broader than this request and not a safe settings-only replacement as written. |
| Is a settings-only production shell export plausible? | Yes by explicit database reads; no focused maintained Event exporter was found in the commands reviewed. A new exporter would be required. |
| Can this account read the selected production Event and create all required beta settings? | The user supplied Event 1533087's ownership lookup. Its database environment, live beta access, destination Organization, and write permissions remain unverified. |
| Has any Event been exported, imported, purchased, or archived? | The Event row, Location row, focused Event/TT/shipping/fee result, and 30 TT rows have been received. A local Event-only helper and input are prepared; syntax and preview passed. Apply, purchase, and cleanup remain unrun. |

**Recommended next implementation scope:** a settings-only exporter for one selected single-day Event and a beta API creator that lists all copied/replaced/blocked settings. Add a developer-run beta importer only for named settings that permitted APIs cannot reproduce. An exact-copy claim remains blocked until those settings and actual environment differences are resolved.

Related guidance: [[00 Start Here/World-Class Software Quality Standard]], [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup]], [[01 Repositories/Backend - web-app]], and [[01 Repositories/QA Automation - showpass-playwright]].

## Repeatable beta demo generation

Use [[06 Prompts/Generate Showpass Test Events]] as the canonical **manual from-scratch** workflow. It uses the existing signed-in beta/demo sidebar, complete local data, batched field entry and one final saved-settings review. Do not substitute an API script, another login, Clone event or an existing Event/template for this journey.

The original Event is multi-day; the selected Thursday TT is single-day. A public sold-out appearance and genuinely exhausted capacity are different outcomes and were not tested in this trial. The new workflow must preserve or explicitly change that intent.

## Beta generation trial 2026-11-04

**Environment:** beta.showpass.com, Codex in-app browser, signed-in employee Christian Valdez, selected Organization **MEGACON Orlando**, under **Fan Expo HQ USA**. Access was proven by successful creation and saves; exact employment permission identifiers were not fetched. The deployed commit was not established.

**Source:** user-provided production exports only. **New records retained:** Draft Event slug `megacon-orlando-2027-qa-template`, TT **1628263**, Location **16106**, and the new TT Processing Fee rate. Event numeric ID and custom-rate numeric ID were not read. Existing Events were not edited. No purchase, publication, refund, ticket issuance or production access was performed.

**Test index:** [TC-01 Environment](#tc-01-beta-setup) · [TC-02 Event](#tc-02-event-and-location) · [TC-03 TT](#tc-03-tt-settings-and-shipping) · [TC-04 Fees](#tc-04-tt-fees) · [TC-05 Order form](#tc-05-guest-information) · [TC-06 Image](#tc-06-image) · [TC-07 Limits](#tc-07-api-and-downstream-limits)

### TC-01 Beta setup

**What this tests:** creation uses the intended beta Organization. **Start here:** the user's existing Your events page.

1. Open the Organization avatar drawer and read the current selection. **Expected:** MEGACON Orlando under Fan Expo HQ USA on beta. **Actual:** matched. This was read from the sidebar drawer; no drawer screenshot was retained. The resulting new Draft is shown below.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/event-created.png" width="600" alt="New MEGACON QA Draft after beta creation" />

### TC-02 Event and Location

**What this tests:** the new Event has the intended name, dates, categories and Orlando address. **Start here:** Create event in the selected beta Organization.

1. Create **MEGACON Orlando 2027 - QA template**, One event, May 20 at 4 PM through May 23 at 5 PM Eastern, with the convention-center address and the three exported categories. Reopen Basic info. **Expected:** saved values and Draft state. **Actual:** matched after reopening; Location **16106** was selected, and the original Sarasota Location remained available. The timezone UI uses `America/New_York`, equivalent to the source's `US/Eastern` for these dates.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/event-final-reopened.png" width="600" alt="Reopened Event with its saved name, Orlando Location and timezone" />

### TC-03 TT settings and shipping

**What this tests:** the selected Thursday TT is saved with the template price, capacity, timing and delivery choices. **Start here:** new Event → Tickets.

1. Create one TT, save it, reload Tickets and reopen its Edit window. **Expected:** TT **THURSDAY ADULT - Single Day Pass**, price **23.00**, Inventory **20000**, zero sold; purchase limit **100**, regular price **34**, presale wording, sale end **Jan 14 at 11:59 PM EST**, Thursday custom end **May 20 at 9 PM EDT**, and customer-initiated refunds off. **Actual:** matched. New TT ID **1628263**. The source's computed sale-start timestamp was deliberately not copied; the destination default applies.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/tt-created.png" width="600" alt="Created Thursday TT with price 23 and capacity 20000" />

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/tt-basic-reopened.png" width="600" alt="Reopened TT basic settings after save and reload" />

2. Reopen Delivery & transfers after saving and reloading. **Expected:** Standard shipping **15 / Flat rate**, Will Call **0 / Per item group type**, standalone Electronic ticket off, basket override off, digital ticket with Will Call on, and transfers on. **Actual:** matched. The UI temporarily disabled transfers until digital tickets with Will Call was enabled; enabling transfers afterward preserved the source setting. Combination flags not exposed by these controls were not independently inspected through an API.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/tt-delivery-reopened.png" width="600" alt="Reopened TT showing saved shipping and Will Call settings" />

### TC-04 TT fees

**What this tests:** the new TT has the selected organizer fee and tax without altering shared rates. **Start here:** new TT Edit → Custom fees.

1. Inspect inherited fees, add the missing Processing Fee for this TT, then revisit after a fresh page load. **Expected:** Processing Fee **3.70**, source **Ticket type**, Online/In-Person, Cash/Card, paid by Customer; Sales Tax **6.5%** remains inherited. **Actual:** matched; the save reported **Custom rate saved.** The tax remains **Organization default**. Source query emptiness did not prevent using the earlier exported amounts as template values.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/tt-fees-reopened.png" width="600" alt="Saved TT-level Processing Fee and inherited Sales Tax after reopening" />

The Finance view showed event defaults **Absorb Processing Fee** and **Absorb Showpass Fee**, consistent with the source's false match settings. Production's 46 internal-fee snapshot entries, tax-on-fee relationships, detailed calculation bases and locked pricing were not recreated or verified. No matching checkout-total claim is made.

### TC-05 Guest information

**What this tests:** the selected information fields and questions are saved for the new TT. **Start here:** new Event → Order form.

1. Save Enhanced Info, First name/Last name/Email, per-ticket and after-payment collection, then reload. **Expected:** those fields selected; Phone and other optional fields off; two required questions. **Actual:** matched after reload.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/order-form-reopened.png" width="600" alt="Reopened order form with per-ticket information and both required questions" />

2. Open each saved question. **Expected:** required age dropdown with eight source options; required interests checkboxes with eight source options; only TT **1628263** selected; pre-payment acknowledgement off. **Actual:** matched after reload, including all option text and the single selected TT.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/interests-reopened.png" width="600" alt="Saved interests options and new TT applicability" />

### TC-06 Image

**What this tests:** an available image can be selected without matching production artwork exactly. **Start here:** new Event → Basic info → Square Image.

1. Choose library image **dcc1f0cf-d9f.png**, finish cropping, save, wait for **Event updated successfully**, and reload. **Expected:** saved image preview. **Actual:** matched after reload; both displayed image elements completed loading with nonzero natural widths (128 and 64 pixels). Earlier attempts left cropping unfinished and were not evidence of an image-saving bug; the accessibility view exposed **Finish Cropping** when the DOM snapshot omitted it.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-megacon/image-reopened.png" width="600" alt="Reopened Event showing its saved image preview controls" />

### TC-07 API and downstream limits

**What this tests:** distinguish working saved setup from unexecuted automation or checkout behavior. **Start here:** the retained beta Draft.

1. **Not run in this trial:** direct API generation and Playwright fixture integration. Only the Dashboard flow was exercised. A generator and existing-auth adapter were implemented afterward under [[06 Prompts/Generate Showpass Test Events]] and checked offline; their live execution remains unrun.
2. **Not run:** purchase totals, internal fee allocation, delivery, ticket scanning and sold-out behavior. No order or ticket was issued. The source's Public sold-out flag was false and was left false. Products, other TTs, Waitlists, Distributed Inventory, provider integrations and external notifications were not copied.

**Issues and recovery:** no product bug is confirmed. Manual address entry initially returned to the form without success; selecting the address suggestion allowed creation. The cause was not established. Automatic approval review rejected one pending TT Save because edited time/refund values had not yet been visibly checked. Reopening showed the correct **11:59 PM EST**, **9 PM EDT**, and refunds off; after that verification the save succeeded. No approval blocker remains.

**Data retention and cleanup:** the useful new beta Draft, TT, Location and TT fee remain for QA. The source and existing beta Events were preserved. The temporary verification tab was closed. Temporary downloaded image copies were removed after a library image was used; screenshots remain locally as evidence. No repository outside this vault was edited and nothing was committed or pushed.

## Manual from-scratch trial 2026-11-04

**Scope correction:** the user explicitly required repeating the same manual creation journey from scratch, faster. The API script and clone shortcut were rejected as different work. The corrected run began at the blank Create event form; all creation and saves used visible controls in the existing signed-in Codex beta sidebar. No direct API calls were made during this corrected run.

**Setup and retention:** employee Christian Valdez; selected MEGACON Orlando Organization in the same beta session as the earlier trial. Reused the matching saved Orange County Convention Center Location **16106** as a prerequisite. Created a new Draft Event and new TT **1628269**; retained both for QA. Existing Event **649648 — MEGACON Orlando 2027 - QA template** and its TT **1628263** were not edited. No purchase, publication, issuance or production access.

**New Event:** [MEGACON Orlando 2027 - Thursday manual trial](https://beta.showpass.com/manage/events/megacon-orlando-2027-thursday-manual-trial/basic-info/). Numeric Event ID was not read; the link and TT ID identify the retained setup.

**Test index:** [TC-08 Fresh Event](#tc-08-fresh-event) · [TC-09 TT](#tc-09-new-thursday-tt) · [TC-10 Delivery](#tc-10-delivery) · [TC-11 Fees](#tc-11-fees) · [TC-12 Questions](#tc-12-guest-information-and-questions) · [TC-13 Image and timing](#tc-13-image-and-efficiency)

### TC-08 Fresh Event

**What this tests:** Create event starts a new Event from a blank form with the supplied settings. **Start here:** Your events in the signed-in beta Organization; choose Create event.

1. Choose One event, enter the new name, saved Orlando Location, Eastern timezone, May 20 at 4 PM through May 23 at 5 PM, and Community & Culture / Film, Media & Entertainment / Hobbies & Special Interests. Select Create event, then reopen Basic info during the final review. **Expected:** a new Draft with those saved values. **Actual:** matched. Creation completed about **50.1 seconds** after the first field entry. No clone or template was used.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/fresh-event-created.png" width="600" alt="New Draft created through the blank Create event form" />

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/event-reopened.png" width="600" alt="Fresh manual Event reopened with saved basic details" />

### TC-09 New Thursday TT

**What this tests:** a new ordinary TT is created and its advanced values persist. **Start here:** the new Event → Tickets → Add ticket type.

1. Enter THURSDAY ADULT - Single Day Pass, Inventory 20000, Price 23.00 and Public visibility; save. Edit the TT's Basic info, setting maximum purchase limit 100, Box Office limit 100, regular price 34, Early Bird Pricing, sale end Jan 14 at 11:59 PM EST, custom end May 20 at 9 PM EDT, and customer-initiated refunds off. Continue, complete delivery, and save the Tickets page. Reopen it during the final review. **Expected:** the selected values persist on a new TT with zero sold. **Actual:** matched; new TT ID **1628269**. Custom start and sale start remained blank; the destination's default sale start applies. Public sold-out remained off.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/tt-reopened.png" width="600" alt="New Thursday TT reopened with price 23 and Inventory 20000" />

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/tt-dates-reopened.png" width="600" alt="Reopened TT basic settings after the combined save" />

### TC-10 Delivery

**What this tests:** the source delivery choices and charges persist. **Start here:** new TT Edit → Delivery & transfers.

1. Select Standard shipping and Will call/pick up, disable standalone Electronic ticket, enter shipping 15 / Flat rate and Will Call 0 / Per item group type, leave basket override off, and enable Send electronic ticket with will call and Allow Ticket Transfers. Continue and Save, then reopen during the final review. **Expected:** those settings remain saved. **Actual:** matched. No extra save/recovery was needed. Hidden combination flags were not independently read through an API.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/delivery-reopened.png" width="600" alt="Saved delivery and transfer settings on the new TT" />

### TC-11 Fees

**What this tests:** the new TT has its requested Processing Fee while reusing inherited Sales Tax. **Start here:** new TT Edit → Custom fees.

1. Inspect the existing 6.5% Sales Tax, add Processing Fee 3.70 / 0%, Online and In-Person, Cash and Card, Customer pays, then select Create. Reopen the fee view during the final review. **Expected:** Processing Fee source Ticket type, 3.70, with the chosen channels/payment methods; Sales Tax remains 6.5% from Organization default. **Actual:** matched. The Cash input initially did not select through the browser tool; clicking its visible label selected it before submission. This was not a failed save or a confirmed product bug. Shared rates were not edited.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/fees-reopened.png" width="600" alt="Reopened TT Processing Fee and inherited Sales Tax" />

### TC-12 Guest information and questions

**What this tests:** the new Event collects the intended information and binds both questions to the new TT. **Start here:** new Event → Order form.

1. Enter Enhanced Info, per-ticket collection after payment, First name/Last name/Email, Phone and other optional fields off, Box Office enforcement off; add the required age dropdown and interests checkboxes with all eight exported options each. Save once, reload, and open each question. **Expected:** complete source options, required state, and exactly the new Thursday TT selected; pre-payment acknowledgement off. **Actual:** matched after reload, including all eight options in each question and one selected TT. No earlier production TT IDs were reused.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/order-form-reopened.png" width="600" alt="Saved guest collection fields and required questions after reload" />

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/interests-reopened.png" width="600" alt="Reopened required interests options and new TT selection" />

### TC-13 Image and efficiency

**What this tests:** the same manual journey can use cached data, batched entry and one final review without changing the creation method. **Start here:** the fresh Event's Basic info and the saved local field checklist.

1. Choose one available library image, finish cropping, Save changes, and inspect it after reopening. **Expected:** a saved image that loads. **Actual:** matched; both image previews completed loading with nonzero natural widths (128 and 64). The accessibility control for Finish Cropping was used because the DOM snapshot omitted that control. No file download/upload or search for an exact production image was needed.

<img src="../99 Archive/QA Evidence/event-generation/2026-11-04-thursday-manual/image-reopened.png" width="600" alt="Saved library image controls in the reopened fresh Event" />

2. Measure from the first field entry through the final review. **Expected:** report entry/save and verification separately, with no invented comparison. **Actual:** Event creation **50.131 s**; all configuration saved at **349.195 s (5:49)**; final review **114.182 s (1:54)**; total **463.377 s (7:43)**. The final review included lazy image loading. Six successful UI submission actions: Event Create, image Save changes, initial TT Save, combined TT details/delivery Save, fee Create and Order form Save. No save failed in the corrected fresh run. The earlier comparable run was untimed, so percentage improvement is unknown.

**Limits:** this proves the selected saved configuration, not checkout totals, internal fee allocation, fulfillment, scanning, a package or actual sold-out inventory. No product bug is confirmed by this run.

**Out-of-scope detours, excluded from the manual timing:** the agent mistakenly tried a separate API login (HTTP 400; no Event creation reached) and the existing Draft's Clone control. The clone submission was rejected with “Child Events: Recurring events require at least 2 events to be created”; it remained on the clone form. These were withdrawn after the user's corrections and were not treated as product bugs or as the requested workflow. No further script/login/clone attempts should occur without a separate explicit request. The earlier API account question no longer blocks this manual task.

**Cleanup:** retained the useful new Draft/TT and supporting screenshots. No earlier Event or Location was changed. Temporary failed API journals were summarized and removed; no recovery depended on them because generation never started. No production access, product-repository edit, commit or push occurred.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Beta setup | Passed | Correct beta host and selected Organization observed in step 1. | [TC-01](#tc-01-beta-setup) |
| Event and Location | Passed | New Draft, dates, categories and Orlando address reopened correctly in step 1. | [TC-02](#tc-02-event-and-location) |
| TT settings and shipping | Passed | Name/price/capacity, selected dates and delivery settings reopened correctly in steps 1–2. | [TC-03](#tc-03-tt-settings-and-shipping) |
| Organizer fee and tax | Passed | TT Processing Fee 3.70 and inherited Sales Tax 6.5% visible after reopening in step 1. | [TC-04](#tc-04-tt-fees) |
| Guest information | Passed | Fields, questions, eight options each and new TT selection verified in steps 1–2. | [TC-05](#tc-05-guest-information) |
| Library image | Passed | Finished crop, success message and saved preview after reload in step 1. | [TC-06](#tc-06-image) |
| API generator / Playwright integration | Not run | Generator implemented afterward and checked offline; live execution and fixture integration remain unrun; step 1. | [TC-07](#tc-07-api-and-downstream-limits) |
| Checkout, internal rates and fulfillment | Not run | No purchase or downstream proof; step 2. | [TC-07](#tc-07-api-and-downstream-limits) |
| Fresh Event from blank form | Passed | New Draft with saved Event details; step 1. | [TC-08](#tc-08-fresh-event) |
| New Thursday TT | Passed | New TT 1628269; price/capacity, dates and limits persisted; step 1. | [TC-09](#tc-09-new-thursday-tt) |
| Delivery and transfers | Passed | Shipping, Will Call and transfers persisted; step 1. | [TC-10](#tc-10-delivery) |
| TT fee and inherited tax | Passed | 3.70 Processing Fee and 6.5% Sales Tax persisted; step 1. | [TC-11](#tc-11-fees) |
| Guest fields and both questions | Passed | Required settings, options and new TT selection reopened correctly; step 1. | [TC-12](#tc-12-guest-information-and-questions) |
| Image and timed manual workflow | Passed | Image loads; 7:43 total measured, earlier comparable baseline unavailable; steps 1–2. | [TC-13](#tc-13-image-and-efficiency) |
