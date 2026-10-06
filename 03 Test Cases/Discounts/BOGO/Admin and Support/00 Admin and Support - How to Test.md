---
title: "Admin and Support \u2014 How to Test"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# Admin and Support — How to Test

**Purpose:** prepare one supported ticket promotion, then let customers prove it through checkout. These are internal setup procedures, not Qase manual cases: Qase's approved Platform list has no Django Admin value.

## Access and safety

The operator needs Django staff access and view/add/change permissions for Discount, Buy get discount rule, Buy get qualifier permission, Event discount permission and Ticket type discount permission. Venue, Waffle Switch and Key value param changes require their own change permissions. A permitted superuser can perform these actions. Organizer Manage Events does not grant Django Admin access.

Select an organization and event approved for test sales. For changes, record original values and who owns each setting. Global switches affect other venues: a release owner must supply an isolated deployment or an approved configuration window. This handbook does not authorize changing live settings.

## Required settings: where they live

| Setting | Required state / scope | Authorized preparation |
| --- | --- | --- |
| enable_bogo_discounts | On, global Waffle Switch; default off in BOGO delivery plan | Admin → Waffle → Switches; search exact key, inspect Active, Save and reopen |
| enable_multi_auto_discount | On, global Waffle Switch | Same Switches procedure |
| multi_auto_discount_venue_ids | Selected venue ID included; KeyValueParam list | Admin → Key value params; search exact key, preserve the existing integer-list format and unrelated IDs, Save and reopen; do not replace the list |
| allow_auto_discount | True on selected Venue | Admin → Venues; search selected organization; open Venue, save Allow auto discount and reopen |
| allow_multi_discounts | True on selected Venue | Same Venue record; save Allow multi discounts and reopen |
| pricing_tier | Standard or Premium on selected Venue | Inspect Venue Pricing tier; choose an already eligible venue. Tier changes can affect rate cards and require billing ownership |
| enable_manual_and_auto_discount_stacking | On only for manual-code stacking scenarios; global Switch | Record original state; do not require it for a single BOGO |
| enable_itemized_partial_apply_to_each_split | Record actual global state; **not required to enable BOGO** | Baseline with off; splitter-on and overlapping itemized stacking are separate engineering checks |
| multi_discount_use_max_applicable_cap | Record existing state; not a BOGO activation gate | Source can cap per-group applications; keep it in the execution snapshot and test both states at backend layer |

No customer/user-specific BOGO flag was found. The venue allowlist and ordinary saved Venue settings are distinct from global Switches. Do not edit the derived buy_get_discount_cache by hand.

## Create and reopen the records

Use an unused promotion so history is not changed. Record the IDs displayed by Admin for selecting related records; no fixed IDs are required.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin → Discounts and select Add. | Selected Venue | Discount form includes Venue, Code, Description, Type, Amount, Percentage, Apply method, Permission type, Is public, usage limits and Allowed checkouts; Save is available |
| Enter the discount details. | Unique internal identifier; Description explaining Buy 2/Get 1; Type BOGO; Apply to each; ticket-type permissions; Percentage 100; Amount 0 | Chosen values are shown; Code is an internal identifier, not a customer activation code |
| Set the release and checkout choices. | Is public off while preparing; Online public checkout; also Box office only for in-person tests; unlimited limits as blank/null | Incomplete preparation does not advertise an offer |
| Select Save. | Same Discount | One saved Discount exists |
| Open Buy get discount rules and select Add. | Saved Discount; Buy quantity 2; Get quantity 1; Lowest eligible price | One rule is saved for this Discount |
| Open Buy get qualifier permissions and select Add. | Saved rule; eligible standalone Ticket type from the selected event | One Buy link is saved; repeat once for each intended Buy type |
| Open Event discount permissions and select Add. | Saved Discount; the same Event; no product or membership | One Get-side Event link is saved |
| Open Ticket type discount permissions and select Add. | Saved Discount; saved Event permission; reward Ticket type in that Event | One Get link is saved; repeat for every intended reward type |
| Reopen the rule and both permission lists. | Saved Discount/rule IDs | Quantities, strategy and exact Buy/Get selections match the plan; no duplicate qualifier exists |
| Reopen the Discount and enable Is public. | Only after all links are complete | Promotion is saved as available for automatic discovery |
| Open the selected event as a Customer and select three $20 eligible tickets. | Same-set Buy 2/Get 1, 100% | Discount is $20 and ticket amount after discount is $40; no ticket was inserted |

For separate types, use two $40 Buy tickets and one $20 Get ticket from the same event: ticket amount $100, discount $20, remainder $80. Current cache/evaluator allow this. The helper script's identical-list warning is stale; do not use it as the authority or run it unchanged.

Incomplete graphs can exist during multi-record Admin preparation and are excluded from discovery. Do not claim every incomplete graph is rejected by the Discount form itself. Cross-venue links, duplicate qualifiers and invalid rules have model validation; full graph eligibility is checked by the cache builder.

## Schedule and limits

Discount Admin makes Starts on and Ends on read-only for timezone safety. Do not invent editable Admin date controls. Unscheduled setup is supported. Date-bound cases need the timezone-aware Discount writer in the intended revision; BOGO organizer CRUD is missing locally, so schedule preparation is a named blocker until an authorized engineer supplies a supported writer and records local time, zone, fold and saved timestamps.

Limits count **rewarded ticket units**, not Buy units or promotion cycles. Buy 1/Get 3 with a basket limit of 2 allows two rewards only. Blank/null means unlimited; zero is a separate boundary and must retain the actual field semantics. Customer limits require known purchaser identity/email. Inspect usage before creating another basket; abandoned reservations may temporarily consume available capacity until their normal expiry/release.

## Restore and evidence

Record all created promotion links and original settings. Deactivate an owned promotion through Is public off after the run, reopen to prove it, and restore only approved changed settings. Preserve orders, invoices, refund/void/exchange records and usage evidence. Deletion is not routine cleanup. Historical purchase calculations must not be repriced using current promotion settings.

Minimum preparation: supported Venue gates → complete promotion → reopen → one qualifying customer basket. Engineering-only validation and date work are listed in [[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20174-data-models]] and [[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20743-organizer-api]].

Sources: [discounts.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/admin/discounts.py>); [discount_permissions.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/discount_management/discount_permissions.py>); [buy_get_discount_cache.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/pricing/buy_get_discount_cache.py>); [auto_discount.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/auto_discount.py>); [venue.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/venue.py>); [flags.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/flags.py>); [create_bogo_discount.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/misc/scripts/2026/create_bogo_discount.py>) (stale warning recorded).
