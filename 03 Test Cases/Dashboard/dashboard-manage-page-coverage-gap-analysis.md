---
title: Dashboard manage pages — Qase coverage gaps
date: 2026-10-22
tags:
  - qa/gap-analysis
  - qase
  - dashboard
---

# Dashboard manage pages — Qase coverage gaps

Compared the local frontend's `/manage/` routes and owning screens with one complete SPT Qase snapshot. **Websites, Talent and Workday integrations are excluded** because they are outside this team’s scope. The later approved publication below turns the identified table gaps into focused cases and organizes their Qase folders.

The strongest additions are **variant Finance**, **web My stats**, and **customer Credits/Holds**. Organizer Comp upload remains flag-gated; its menu entry was subsequently observed in the current beta venue during read-only enrichment. Membership internal fees need stronger screen-specific assertions. Spaces needs **list coverage only**: the user confirmed that suite **82 — Create Map** owns creation, and those existing editor cases must be reused.

Initial audit: no Qase cases or suites were changed. Publication status is recorded separately below. No live application flows were executed. These are gaps in case definitions, not confirmed product bugs or failed executions.

## Published and verified — 2026-10-22

**Done:** 34 new cases, four case enhancements, 66 placement-only case moves, 52 existing-folder updates and 46 new folders. The folders follow the `/manage/` sidebar. **No Qase cases or suites were deleted.** All 2,224 original cases and 317 original suites remain; final project totals are 2,258 cases and 363 suites.

New cases are **SPT-5762 through SPT-5795**; each draft below links to its saved case. Enhanced cases: [SPT-4064](https://app.qase.io/case/SPT-4064), [SPT-4065](https://app.qase.io/case/SPT-4065), [SPT-4116](https://app.qase.io/case/SPT-4116) and [SPT-5159](https://app.qase.io/case/SPT-5159). Their unrelated metadata, tags and existing supported platforms were preserved. The 66 placement-only updates preserved every execution field.

**Organization:** Build, Promote, Operations, Customers, Finance, Insights, Organization, Account and Admin own their relevant screens. Existing top-level feature folders were reused and moved where appropriate. Spaces list cases sit beside existing **suite 82 — Create Map** under Organization → Settings → Spaces; seating-assignment permissions remain with the event. Shared Core coverage stays shared, apart from five explicitly Dashboard guestlist cases moved to that screen. Websites, Talent and Workday were excluded.

**Verification:** Full project read-back completed **22:47:20–22:47:34 UTC (16:47 MDT)**: 2,258 unique cases over 23 pages and 363 unique suites over four pages, stable totals and no truncation. Full written fields matched the drafts; existing content outside the approved fields was unchanged; all folder parents were valid and no hierarchy loops were found. This proves the Qase publication, **not that the application passed these tests**. Only the sidebar received non-saving browser inspection; no application records, flags, payments or imports were changed.

> [!info]- Publication receipts and exact scope
> [Case IDs, full-field verification and preservation checks](evidence/sidebar-publication-2026-10-22/final-verification.json) · [Folder update receipt](evidence/sidebar-publication-2026-10-22/suite-updates.json).
> One Ratings update was rejected for unequal grouped-parameter rows. It was corrected to WebBoxOffice/Desktop and Dashboard/Desktop, then verified. Already-created cases were not retried. The original public-review response assertion was retained.

## Approved publication and folder scope

The user explicitly approved generating and publishing the table’s cases and organizing relevant Dashboard cases/suites to match the `/manage/` sidebar, **with no Qase deletions**. This advance approval also covers the final push after generation; do not ask for the same approval again. Websites, Talent and Workday stay excluded. Existing shared-platform coverage and useful assertions must be preserved. No application test-data mutations are authorized by this Qase publication request.

**Published scope:** 34 new cases and four existing-case enhancements (SPT-4116, SPT-5159, SPT-4064 and SPT-4065), plus selected-field case/suite moves. All are definitions, not executed passes. The original segment AND and malformed-tag checks are retained as TC-33 and TC-34 while SPT-5159 is corrected to the supported single/comma-separated behavior.

**Read-only browser enrichment:** In the existing beta session, Christian Valdez’s selected venue was Organization for system gateway charge api. The `/manage/` sidebar showed Dashboard, Build, Promote, Operations, Customers, Finance, Insights, Websites, Organization, Account and Admin. Operations displayed Box Office, Entry and Bulk actions → Comp upload. No upload or save was performed; the browser was returned to Abandoned Carts. Deployed build identity remains unknown. This supersedes the earlier “Comp upload availability unverified” observation below.

## Qase-ready cases

| Draft / existing ID | Title | Destination | Steps |
| --- | --- | --- | --- |
| [SPT-5773](https://app.qase.io/case/SPT-5773) (TC-6) | Dashboard - Memberships - Save an internal fee amount | Dashboard → Build → Memberships → Manage membership → Internal fees | 4 |
| [SPT-5774](https://app.qase.io/case/SPT-5774) (TC-7) | Dashboard - Memberships - Protect sold membership internal fees | Dashboard → Build → Memberships → Manage membership → Internal fees | 4 |
| [SPT-5772](https://app.qase.io/case/SPT-5772) (TC-26) | Dashboard - Memberships - Save group-specific branding | Dashboard → Build → Memberships → Manage membership → Branding | 4 |
| [SPT-5791](https://app.qase.io/case/SPT-5791) (TC-1) | Dashboard - Products - Save variant financial settings | Dashboard → Build → Products → Manage product → Inventory → Finance | 4 |
| [SPT-5792](https://app.qase.io/case/SPT-5792) (TC-2) | Dashboard - Products - Restore inherited variant fee choices | Dashboard → Build → Products → Manage product → Inventory → Finance | 3 |
| [SPT-5793](https://app.qase.io/case/SPT-5793) (TC-3) | Dashboard - Products - Keep sold variant financial settings locked | Dashboard → Build → Products → Manage product → Inventory → Finance | 4 |
| [SPT-5794](https://app.qase.io/case/SPT-5794) (TC-4) | Dashboard - Products - Deny variant Finance editing without financial permission | Dashboard → Build → Products → Manage product → Inventory → Finance | 3 |
| [SPT-5795](https://app.qase.io/case/SPT-5795) (TC-5) | Dashboard - Products - Reject a negative variant seller commission | Dashboard → Build → Products → Manage product → Inventory → Finance | 3 |
| SPT-4065 | Dashboard - Gift Cards - Search active or inactive gift cards | Dashboard → Build → Gift Cards → All gift cards | 4 |
| [SPT-5769](https://app.qase.io/case/SPT-5769) (TC-27) | Dashboard - Gift Cards - Reject creation without a name | Dashboard → Build → Gift Cards → Create / Edit | 3 |
| [SPT-5770](https://app.qase.io/case/SPT-5770) (TC-28) | Dashboard - Gift Cards - Reject an invalid denomination | Dashboard → Build → Gift Cards → Create / Edit | 3 |
| [SPT-5771](https://app.qase.io/case/SPT-5771) (TC-29) | Dashboard - Gift Cards - Save an existing gift card’s settings | Dashboard → Build → Gift Cards → Create / Edit | 4 |
| SPT-4064 | Dashboard - Gift Cards - Create a gift card type with denominations | Dashboard → Build → Gift Cards → Create / Edit | 4 |
| [SPT-5762](https://app.qase.io/case/SPT-5762) (TC-30) | Dashboard - Comp upload - Issue selected complimentary tickets | Dashboard → Operations → Bulk actions → Comp upload | 4 |
| [SPT-5763](https://app.qase.io/case/SPT-5763) (TC-31) | Dashboard - Comp upload - Deny access when its gate is missing | Dashboard → Operations → Bulk actions → Comp upload | 2 |
| [SPT-5764](https://app.qase.io/case/SPT-5764) (TC-32) | Dashboard - Comp upload - Reject another venue’s inventory | Dashboard → Operations → Bulk actions → Comp upload | 3 |
| [SPT-5765](https://app.qase.io/case/SPT-5765) (TC-12) | Dashboard - Customers - Show only the selected customer’s credits | Dashboard → Customers → Customers → Manage customers → Credits | 3 |
| [SPT-5766](https://app.qase.io/case/SPT-5766) (TC-13) | Dashboard - Customers - Show an empty credit state without stale balances | Dashboard → Customers → Customers → Manage customers → Credits | 3 |
| [SPT-5767](https://app.qase.io/case/SPT-5767) (TC-14) | Dashboard - Customers - Limit Holds to the selected customer | Dashboard → Customers → Customers → Manage customers → Holds | 3 |
| [SPT-5768](https://app.qase.io/case/SPT-5768) (TC-15) | Dashboard - Customers - Open a customer hold in Box Office | Dashboard → Customers → Customers → Manage customers → Holds | 3 |
| [SPT-5782](https://app.qase.io/case/SPT-5782) (TC-33) | Dashboard - Segments - Match customers who have both tags | Dashboard → Customers → Customers → Segments | 3 |
| [SPT-5783](https://app.qase.io/case/SPT-5783) (TC-34) | Dashboard - Segments - Reject a missing tag name in a tag list | Dashboard → Customers → Customers → Segments | 3 |
| SPT-5159 | Dashboard - Segments - Save a segment using tag names | Dashboard → Customers → Customers → Segments | 4 |
| [SPT-5779](https://app.qase.io/case/SPT-5779) (TC-23) | Dashboard - Ratings - Edit an organizer response | Dashboard → Customers → Feedback → Ratings | 3 |
| [SPT-5780](https://app.qase.io/case/SPT-5780) (TC-24) | Dashboard - Ratings - Delete an organizer response | Dashboard → Customers → Feedback → Ratings | 3 |
| [SPT-5781](https://app.qase.io/case/SPT-5781) (TC-25) | Dashboard - Ratings - Cancel an unsaved response edit | Dashboard → Customers → Feedback → Ratings | 3 |
| SPT-4116 | Ratings - Save an organizer review response | Dashboard → Customers → Feedback → Ratings | 4 |
| [SPT-5784](https://app.qase.io/case/SPT-5784) (TC-16) | Dashboard - Spaces - Find and open the selected map | Dashboard → Organization → Settings → Spaces → List | 3 |
| [SPT-5785](https://app.qase.io/case/SPT-5785) (TC-17) | Dashboard - Spaces - Page through the venue’s space list | Dashboard → Organization → Settings → Spaces → List | 3 |
| [SPT-5786](https://app.qase.io/case/SPT-5786) (TC-18) | Dashboard - Spaces - Duplicate a complete space independently | Dashboard → Organization → Settings → Spaces → List | 4 |
| [SPT-5787](https://app.qase.io/case/SPT-5787) (TC-19) | Dashboard - Spaces - Reject an invalid duplicate-space name | Dashboard → Organization → Settings → Spaces → List | 3 |
| [SPT-5788](https://app.qase.io/case/SPT-5788) (TC-20) | Dashboard - Spaces - Cancel duplicating a space | Dashboard → Organization → Settings → Spaces → List | 3 |
| [SPT-5789](https://app.qase.io/case/SPT-5789) (TC-21) | Dashboard - Spaces - Save a space’s capacity-counter setting | Dashboard → Organization → Settings → Spaces → List | 4 |
| [SPT-5790](https://app.qase.io/case/SPT-5790) (TC-22) | Dashboard - Spaces - Keep space lists separate when switching venues | Dashboard → Organization → Settings → Spaces → List | 4 |
| [SPT-5775](https://app.qase.io/case/SPT-5775) (TC-8) | Dashboard - My stats - Show the signed-in employee’s totals | Dashboard → Account → My stats | 3 |
| [SPT-5776](https://app.qase.io/case/SPT-5776) (TC-9) | Dashboard - My stats - Filter event and tracking-link results | Dashboard → Account → My stats | 3 |
| [SPT-5777](https://app.qase.io/case/SPT-5777) (TC-10) | Dashboard - My stats - Page through personal results | Dashboard → Account → My stats | 3 |
| [SPT-5778](https://app.qase.io/case/SPT-5778) (TC-11) | Dashboard - My stats - Change venue without retaining another venue’s figures | Dashboard → Account → My stats | 3 |

## Dashboard → Build → Memberships → Manage membership → Internal fees

### TC-6: Dashboard - Memberships - Save an internal fee amount

**Title:** Dashboard - Memberships - Save an internal fee amount
**Description:** Save an internal Showpass Fee amount for the selected RecordScope and reopen the same rate card. This verifies saved configuration; purchase calculation remains separately covered.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Use a Showpass administrator and a venue with Memberships enabled.
* Feature flags show_membership_internal_fees and show_internal_fees_page are enabled for this venue; its saved uses_default_internal_fee_values setting is on so the current rate-card editor is used.
* RecordScope Group means the selected membership group’s Internal fees; Level means its selected level’s Internal fees. Open both from Build → Memberships → All memberships.
* Use a membership group with no sold levels or active carts and an existing editable standard Showpass Fee override belonging to the selected group or level. Have an unrelated control group/level. Record their original rate-card settings. If the selected card is inherited, the setup owner first uses its supported Override action to prepare an editable card for this scope; do not edit the parent venue’s card.

**Postconditions:** Restore the original rate-card settings and reopen to verify restoration.
**Priority:** high
**Tags:** dashboard, memberships, internal-rate-card

**Parameters:**
RecordScope: Group, Level

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Internal fees for the selected RecordScope and select Showpass Fee. |  | The selected group or level is shown and its existing standard rate card is available. |
| Edit that standard card, turn off Use Default Rate Card Amount, set the fixed amount to 1.25 and Fee Percentage to 0; select Save. | Keep its recorded payer, payment, purchase-source and item scope unchanged. | The rate-card change saves. |
| Leave, reopen the same membership scope and edit the same card. |  | The fixed amount is 1.25, Fee Percentage is 0 and default-amount inheritance remains off. |
| Inspect the recorded control group/level without editing. |  | Its saved rate-card values remain unchanged. |

### TC-7: Dashboard - Memberships - Protect sold membership internal fees

**Title:** Dashboard - Memberships - Protect sold membership internal fees
**Description:** Protect a sold membership scope from internal-fee edits. For Group, a sold nested level must protect group defaults; for Level, the selected sold level is protected.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Use a Showpass administrator and a venue with Memberships enabled.
* Feature flags show_membership_internal_fees and show_internal_fees_page are enabled for this venue; its saved uses_default_internal_fee_values setting is on so the current rate-card editor is used.
* RecordScope Group means the selected membership group’s Internal fees; Level means its selected level’s Internal fees. Open both from Build → Memberships → All memberships.
* Use a group with a purchased, price-locked membership level. Record the selected scope’s saved fees and a completed purchase. Have an unsold control group/level.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, memberships, internal-rate-card

**Parameters:**
RecordScope: Group, Level

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the sold RecordScope’s Internal fees. |  | The saved fees appear and the sales-related restriction is shown. |
| Inspect actions that would add, override, edit or remove a rate card without making a change. |  | Protected actions are unavailable; the sold scope cannot be repriced through this screen. |
| Leave and reopen the sold scope and its recorded purchase. |  | The saved fees and existing purchase amounts are unchanged. |
| Open the unsold control scope’s Internal fees without editing. |  | The administrator can access the supported editing controls there. |

## Dashboard → Build → Memberships → Manage membership → Branding

### TC-26: Dashboard - Memberships - Save group-specific branding

**Title:** Dashboard - Memberships - Save group-specific branding
**Description:** Save a membership group’s own branding, reopen it and verify the venue and another group retain their branding.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Memberships; Memberships is enabled for the venue.
* Use a private membership group approved for branding changes and a second control group. Record the venue and both groups’ Primary color values and whether the first group inherits it.

**Postconditions:** Restore the first group’s original color or inheritance state and reopen to verify restoration.
**Priority:** medium
**Tags:** dashboard, memberships

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Build → Memberships → All memberships, choose the prepared group and open Branding. | The group’s Images, Colors & Theme, Typography and Email controls and preview are available. | The group’s Images, theme/colors, Typography and Email controls and preview are available. |
| Set Primary color to #2457A6, different from its recorded original, and select Save. |  | The group-specific color saves and its preview uses the selected color. |
| Leave and reopen the group’s Branding. |  | The exact selected color and its group-specific override remain saved. |
| Inspect the second group and venue Identity without editing. |  | Their original branding remains unchanged. |

## Dashboard → Build → Products → Manage product → Inventory → Finance

### TC-1: Dashboard - Products - Save variant financial settings

**Title:** Dashboard - Products - Save variant financial settings
**Description:** Save one variant’s Processing Fee Settings, Showpass Fee Settings and seller commissions. These are variant overrides; product defaults and the other variant must stay unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permissions: Manage Marketplace and Manage Transactions. Use a Standard or Premium venue and a private product with two unsold variants, no orders or active carts. Record the product and both variants’ fee choices and commissions.

**Postconditions:** Restore the selected variant’s four original settings and reopen to verify restoration.
**Priority:** high
**Tags:** dashboard, products, fees-and-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Products → All products, open the prepared product, then Inventory and the selected variant’s Finance. |  | Service Fee Settings and Seller Commissions show the saved values and Product Default hints. |
| Select Absorb Processing Fee, Customer Pays Showpass Fee, Cash Sales commission 1.25 and Credit Sales commission 2.50, then Save. | Use values different from the recorded originals; amounts are in the venue currency. | The save succeeds. |
| Leave the product, reopen the same variant’s Finance and compare all four fields. |  | The two fee selections and commissions 1.25 and 2.50 are retained. |
| Reopen the parent product’s Finance and the other variant’s Finance. |  | Their recorded settings are unchanged. |

### TC-2: Dashboard - Products - Restore inherited variant fee choices

**Title:** Dashboard - Products - Restore inherited variant fee choices
**Description:** Return an unsold variant’s two service-fee choices to Use Product Settings. Reopening must retain inheritance rather than replace it with a fixed choice.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permissions: Manage Marketplace and Manage Transactions. Use a Standard or Premium venue and a private product with two unsold variants, no orders or active carts. Record the product and both variants’ fee choices and commissions.
* The selected variant has explicit fee choices different from its product’s defaults.

**Postconditions:** Restore the variant’s original fee choices.
**Priority:** high
**Tags:** dashboard, products, fees-and-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Products → All products, open the prepared product, then Inventory and the selected variant’s Finance. |  | The variant’s explicit choices and Product Default hints appear. |
| Set both Processing Fee Settings and Showpass Fee Settings to Use Product Settings; select Save. |  | The inherited choices save. |
| Leave and reopen the variant’s Finance. |  | Both choices remain Use Product Settings and their hints match the recorded parent-product defaults; commissions are unchanged. |

### TC-3: Dashboard - Products - Keep sold variant financial settings locked

**Title:** Dashboard - Products - Keep sold variant financial settings locked
**Description:** A completed sale protects the selected variant’s fee choices and commissions on Finance, including when price-tier settings would otherwise allow price changes.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permissions: Manage Marketplace and Manage Transactions in a Standard or Premium venue.
* Use a variant with a completed sale and a price lock. Record the original fee choices, both commissions and the sale. Record an unsold control variant in the same venue.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, products, fees-and-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Products → All products, open the prepared product, then Inventory and the selected variant’s Finance. |  | The sold variant is identified and a message explains financial settings are disabled after sales. |
| Inspect Processing Fee Settings, Showpass Fee Settings, both commissions and Save without submitting a change. |  | All protected fields and Save are disabled. |
| Leave and reopen the sold variant’s Finance. |  | All recorded values and the existing sale remain unchanged. |
| Open Finance for the unsold control variant without editing. |  | Its financial controls are available to this authorized employee. |

### TC-4: Dashboard - Products - Deny variant Finance editing without financial permission

**Title:** Dashboard - Products - Deny variant Finance editing without financial permission
**Description:** Marketplace access alone must not grant access to variant financial editing.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Use an employee with Manage Marketplace but without Manage Transactions or an administrator override.
* Use a Standard or Premium venue and an unsold variant whose Finance address and saved values were recorded by an authorized setup owner.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, products, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared product through Build → Products → All products and its Inventory. |  | The employee can view the product and variant. |
| Open the recorded variant Finance address. |  | Financial settings require financial management access appears; no usable financial editing or Save controls are offered. |
| Have the authorized setup owner reopen the variant’s Finance. |  | Its saved values are unchanged. |

### TC-5: Dashboard - Products - Reject a negative variant seller commission

**Title:** Dashboard - Products - Reject a negative variant seller commission
**Description:** Reject a negative seller commission without changing the saved fee choices or commissions. CommissionField selects Cash Sales or Credit Sales; test one field per run.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permissions: Manage Marketplace and Manage Transactions. Use a Standard or Premium venue and a private product with two unsold variants, no orders or active carts. Record the product and both variants’ fee choices and commissions.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, products, fees-and-taxes

**Parameters:**
CommissionField: CashSales, CreditSales

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Products → All products, open the prepared product, then Inventory and the selected variant’s Finance. |  | The original financial settings appear. |
| Enter -1 in the selected CommissionField and select Save. | CashSales = Seller Commission: Cash Sales; CreditSales = Seller Commission: Credit Sales. Leave every other field unchanged. | The negative commission is rejected and no successful save is reported. |
| Reload without saving and reopen the variant’s Finance. |  | All four original financial settings remain saved. |

## Dashboard → Build → Gift Cards → All gift cards

### SPT-4065: Dashboard - Gift Cards - Search active or inactive gift cards

**Title:** Dashboard - Gift Cards - Search active or inactive gift cards
**Description:** Search gift-card types in the selected Gift card status tab. Active and Inactive are separate lists; a type in the other tab must not appear in the selected tab’s results.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* A signed-in venue employee can access Build → Gift Cards; the venue’s Gift Cards module is enabled.
* Prepare active and inactive gift-card types with distinguishable names, plus a name absent from both lists. Record which name belongs to each state.

**Postconditions:** Clear search and return to the starting status tab. No gift card is changed.
**Priority:** medium
**Tags:** dashboard, products

**Parameters:**
Gift card status: Active, Inactive

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Build → Gift Cards → All gift cards and select Gift card status. |  | The selected Active or Inactive list appears. |
| Search for a recorded name belonging to the selected tab. |  | Only matching types from the selected state are listed. |
| Search for the name belonging only to the other tab. |  | No gift cards found is shown; the other state is not mixed into these results. |
| Search for the absent name, then clear search. |  | The absent name has no result; clearing search restores the selected tab’s list. |

## Dashboard → Build → Gift Cards → Create / Edit

### TC-27: Dashboard - Gift Cards - Reject creation without a name

**Title:** Dashboard - Gift Cards - Reject creation without a name
**Description:** A blank Name must prevent creating a gift-card type even when a denomination is valid.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* A signed-in venue employee can access Build → Gift Cards; the venue’s Gift Cards module is enabled.
* Use the Build → Gift Cards manager and approved private test data; record the existing gift-card list.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, products

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Build → Gift Cards → Create gift card. |  | Name, gift-card settings, Price options and Create gift card are available. |
| Leave Name empty, add Price 10.00, Value 10.00 and Inventory 5, and select Create gift card. |  | Name validation is shown and no gift-card type is created. |
| Leave without saving, reload the gift-card list and compare it with the baseline. |  | The list is unchanged and no unnamed type exists. |

### TC-28: Dashboard - Gift Cards - Reject an invalid denomination

**Title:** Dashboard - Gift Cards - Reject an invalid denomination
**Description:** Reject one invalid denomination while keeping the other creation fields valid. InvalidValue chooses the one field to change; values are in the venue currency.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* A signed-in venue employee can access Build → Gift Cards; the venue’s Gift Cards module is enabled.
* Use the Build → Gift Cards manager and approved private test data; record the existing gift-card list.
* Use a unique Name. Valid starting denomination: Price 10.00, Value 10.00 and Inventory 5.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, products

**Parameters:**
InvalidValue: PriceTooLow, ValueBelowPrice, ZeroInventory

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Create gift card and enter the valid Name and denomination. |  | The valid starting fields are present. |
| Change only the field selected by InvalidValue, then select Create gift card. | PriceTooLow: Price 0.10. ValueBelowPrice: Value 9.00. ZeroInventory: Inventory 0. | The invalid denomination is rejected and the gift card is not created. |
| Leave without saving, reload the list and search for the unique Name. |  | No gift card was created; existing gift cards are unchanged. |

### TC-29: Dashboard - Gift Cards - Save an existing gift card’s settings

**Title:** Dashboard - Gift Cards - Save an existing gift card’s settings
**Description:** Save an existing type’s name and inactive state without changing denomination balances or protected sold values.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* A signed-in venue employee can access Build → Gift Cards; the venue’s Gift Cards module is enabled.
* Use the Build → Gift Cards manager and approved private test data; record the existing gift-card list.
* Use an active gift-card type with recorded settings and denominations, including a sold denomination. Record its exact Price and Value and choose an unused replacement Name.

**Postconditions:** Restore the original Name and active state, then reopen to verify restoration.
**Priority:** high
**Tags:** dashboard, products

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared gift-card type from Active. |  | Its saved settings and Price options appear. |
| Change Name, turn Active off and save the settings section. |  | The settings save successfully. |
| Reload the manager, open Inactive and reopen the renamed type. |  | The replacement Name and inactive state are retained. |
| Inspect its denominations and an existing purchase without editing. |  | Recorded denomination Price/Value and the purchased gift-card value are unchanged. |

### SPT-4064: Dashboard - Gift Cards - Create a gift card type with denominations

**Title:** Dashboard - Gift Cards - Create a gift card type with denominations
**Description:** Create a gift-card type from Build → Gift Cards. Retain its name, logo, background color, active state and all entered price options. Each option defines the price paid, value loaded and available inventory.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* A signed-in venue employee can access Build → Gift Cards; the venue’s Gift Cards module is enabled.
* Use a unique Name, a supported logo image, a chosen background color, and an approved active-state choice. Prepare at least two price options: Price 10.00 / Value 10.00 / Inventory 5 and Price 20.00 / Value 25.00 / Inventory 5, in the venue currency.

**Postconditions:** Record the created type and keep it unpublished/inactive if it was not approved for sale. Preserve any purchases; the setup owner handles cleanup.
**Priority:** high
**Tags:** dashboard, products

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Build → Gift Cards → Create gift card. |  | Name, logo, background color, active state, Price options and Create gift card are available. |
| Enter the prepared settings, then use Add option for each prepared denomination. |  | Every option shows its intended price, loaded value and inventory; no invalid field is present. |
| Select Create gift card once and wait for saving. |  | One gift-card type is created and its edit page opens. |
| Return to the corresponding Active or Inactive list and reopen the new type. |  | Exactly one type has the prepared Name. Logo, background color, active state and both price/value/inventory options are retained. |

## Dashboard → Operations → Bulk actions → Comp upload

### TC-30: Dashboard - Comp upload - Issue selected complimentary tickets

**Title:** Dashboard - Comp upload - Issue selected complimentary tickets
**Description:** An authorized venue employee can import complimentary tickets through Operations. This is the venue-scoped entry, separate from internal Admin Actions.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* The venue’s Events module is enabled and venue-scoped feature flag enable_venue_comp_tickets_import is on.
* Use an employee with Bulk Import Complimentary Tickets and no internal-administrator access.
* Use an event/ticket type approved for complimentary issuance, with available general-admission inventory and no payment plan. Use a controlled recipient mailbox; record starting issued-ticket count and available inventory.
* The import worker is available so the confirmed upload can finish and its final result can be checked.

**Postconditions:** Record the job, order and ticket for the setup owner. Preserve the issued order for audit; do not remove financial history.
**Priority:** high
**Tags:** dashboard, tickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Operations → Bulk actions → Comp upload and download the CSV template. |  | Bulk complimentary tickets loads and the template includes First Name, Last Name, Email, Event ID, Ticket Type ID and Quantity. |
| Prepare one valid row for the selected event/type, controlled recipient and Quantity 1; upload it. |  | Preview identifies exactly the intended valid row and no tickets have been issued yet. |
| Select that row and confirm once; wait for the import to finish. |  | The job completes and the final issued count/report contains one successful ticket. |
| Open the recipient’s resulting order and the selected ticket type’s inventory. |  | Exactly one complimentary ticket belongs to that recipient and event/type; inventory changes by one, with no paid charge or duplicate ticket. |

### TC-31: Dashboard - Comp upload - Deny access when its gate is missing

**Title:** Dashboard - Comp upload - Deny access when its gate is missing
**Description:** The organizer import must be unavailable when either its venue flag or employee permission is missing. MissingGate defines one absent gate; all other prerequisites stay valid.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Events is enabled. A setup owner records the organizer Comp upload address while an authorized employee can open it.
* MissingGate FlagOff: enable_venue_comp_tickets_import is off for this venue; the employee retains Bulk Import Complimentary Tickets. MissingGate PermissionAbsent: the flag is on, but the employee lacks that permission and has no administrator override. Configure the selected state before execution.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, tickets, employee-permissions

**Parameters:**
MissingGate: FlagOff, PermissionAbsent

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the prepared employee and inspect Operations. |  | No usable organizer Comp upload menu entry is offered. |
| Open the recorded organizer Comp upload address. |  | The employee cannot access a usable upload/preview/confirm workflow; no import is started. |

### TC-32: Dashboard - Comp upload - Reject another venue’s inventory

**Title:** Dashboard - Comp upload - Reject another venue’s inventory
**Description:** An organizer import must not issue tickets for another venue, even when its CSV names a real event and ticket type.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* The venue’s Events module is enabled and venue-scoped feature flag enable_venue_comp_tickets_import is on.
* Use an employee with Bulk Import Complimentary Tickets and no internal-administrator access.
* Use an event/ticket type approved for complimentary issuance, with available general-admission inventory and no payment plan. Use a controlled recipient mailbox; record starting issued-ticket count and available inventory.
* The setup owner provides an event ID and ticket-type ID from a different venue. Record both venues’ issued counts; keep the controlled recipient unchanged.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, tickets, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open organizer Comp upload and upload a template row naming the other venue’s event and ticket type. |  | The row is rejected or marked invalid for this venue; it cannot be confirmed for issuance. |
| Inspect the preview and available confirmation actions without submitting another file. |  | There is no selectable valid foreign-inventory row. |
| Have the setup owner recheck both ticket types’ issued counts. |  | Neither venue issued a ticket from this rejected row. |

## Dashboard → Customers → Customers → Manage customers → Credits

### TC-12: Dashboard - Customers - Show only the selected customer’s credits

**Title:** Dashboard - Customers - Show only the selected customer’s credits
**Description:** From the customer network, display the selected customer’s account and ticket credits in the correct venue. This entry is read-only for account-credit purchase actions.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Network. Use a venue on the Showpass system payment gateway and two registered customers with different recorded universal, organizer, gift-card and ticket-credit balances. Also record a venue-restricted credit belonging to another venue.
* Ticket credits are credits redeemable for eligible tickets. Record each credit’s displayed name and available balance or remaining uses from the customer’s existing credit records, independently of the page under test.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Customers → Manage customers, search for the first prepared customer and open Credits. |  | Universal credits available, Organizer credits available and Gift card credits available match the selected customer’s recorded balances. Ticket credits match that customer and this venue. Another customer’s balances and another venue’s restricted credits are absent; universal credits remain available. |
| Return to Manage customers, open the second customer and select Credits. |  | Only the second customer’s recorded credits are displayed; the first customer’s balances do not remain. |
| Reload the second customer’s Credits page and inspect account-credit actions. |  | The second customer’s correct credits return, and no account-credit purchase action is offered on this screen. |

### TC-13: Dashboard - Customers - Show an empty credit state without stale balances

**Title:** Dashboard - Customers - Show an empty credit state without stale balances
**Description:** A customer with no credits must not inherit another customer’s previously displayed balances.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Network. One customer has recorded credits; a second customer has no account or ticket credits in this venue.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage customers, view the credited customer’s Credits, then return to the customer list. |  | The known credits are visible before leaving. |
| Open the customer with no credits and select Credits. |  | The account-credit and ticket-credit sections show their supported empty states; no earlier balances or redeemable items remain. |
| Reload the empty customer’s Credits. |  | The page remains empty for that customer. |

## Dashboard → Customers → Customers → Manage customers → Holds

### TC-14: Dashboard - Customers - Limit Holds to the selected customer

**Title:** Dashboard - Customers - Limit Holds to the selected customer
**Description:** The customer-network Holds list must show the selected customer’s holds, not every hold in the venue.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permissions: Manage Network, Manage Holds and Box Office Sales.
* Two customers have distinct active holds in this venue, with different item names and quantities. Record each hold’s customer, reserved items, quantity and expiry. A hold reserves items for later purchase.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, holds

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Customers → Manage customers, open the first prepared customer and select Holds. |  | Only that customer’s recorded holds are listed with the correct reserved items and expiry. |
| Return to the customer list, open the second customer and select Holds. |  | Only the second customer’s holds appear; no first-customer hold remains. |
| Reload the second customer’s Holds. |  | The list remains scoped to the second customer. |

### TC-15: Dashboard - Customers - Open a customer hold in Box Office

**Title:** Dashboard - Customers - Open a customer hold in Box Office
**Description:** Opening the held sale from customer details must carry the intended hold, customer and reserved items into Box Office without creating a purchase.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permissions: Manage Network, Manage Holds and Box Office Sales.
* Two customers have distinct active holds in this venue, with different item names and quantities. Record each hold’s customer, reserved items, quantity and expiry. A hold reserves items for later purchase.
* Start Box Office with an empty cart and record the selected hold’s exact items and quantities.

**Postconditions:** Leave the held sale without purchasing or releasing it; retain the original active hold.
**Priority:** high
**Tags:** dashboard, holds

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared customer’s Holds from Customers → Manage customers. |  | The intended active hold is listed. |
| Select Checkout on the intended hold. |  | Box Office opens the intended hold for the recorded customer; reserved items and quantities appear exactly once. |
| Inspect the customer and cart without completing payment. |  | The selected hold and customer remain correct; there is no completed purchase or unrelated customer’s cart item. |

## Dashboard → Customers → Customers → Segments

### TC-33: Dashboard - Segments - Match customers who have both tags

**Title:** Dashboard - Segments - Match customers who have both tags
**Description:** Refresh a saved segment requiring both VIP and Donor. Customers with only one tag must be excluded. A setup administrator prepares the nested filter in Django Admin → Venues → User segments on an existing segment created for this venue. In Filters, use: {"type": "QUERY", "filters": {"type": "AND", "operands": [{"type": "BASIC", "filters": {"is_customer": true, "tags": "VIP"}}, {"type": "BASIC", "filters": {"is_customer": true, "tags": "Donor"}}]}}. This technical configuration is preparation by the setup owner; the employee executes the visible page steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Network; venue-scoped feature flag enable_customer_segments is enabled.
* Prepare four customers: one tagged VIP only, one Donor only, one with both VIP and Donor, and one with neither. Record their identities. Choose a unique segment name.
* A setup administrator has saved the exact Filters configuration in the Description on the prepared venue-owned segment. Keep its original saved configuration for restoration. The segment-refresh worker is available.

**Postconditions:** The setup owner restores the segment’s original configuration if it was reused; otherwise retain the named segment for cleanup. Customer tags remain unchanged.
**Priority:** medium
**Tags:** dashboard, search-filters

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Customers → Segments and open the prepared segment. |  | The intended venue-owned segment opens. |
| Select Refresh and wait for completion. |  | Segment refreshed appears and only the recorded customer with both tags is in the audience. VIP-only, Donor-only and neither-tag customers are absent. |
| Reload and reopen the segment. |  | The saved segment still has exactly the both-tag customer, without duplicate entries. |

### TC-34: Dashboard - Segments - Reject a missing tag name in a tag list

**Title:** Dashboard - Segments - Reject a missing tag name in a tag list
**Description:** A malformed comma-separated tag list must not silently create a segment matching unrelated customers.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Network; venue-scoped feature flag enable_customer_segments is enabled.
* Prepare four customers: one tagged VIP only, one Donor only, one with both VIP and Donor, and one with neither. Record their identities. Choose a unique segment name.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, search-filters

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage customers → Filters → Tags. |  | The Tags field is available. |
| Enter VIP,,Donor and attempt to create/save the segment. |  | The malformed filter is rejected with an error; no successful segment save is reported. |
| Reload Segments and search for the proposed unique name. |  | No malformed segment exists; existing segments and customer tags are unchanged. |

### SPT-5159: Dashboard - Segments - Save a segment using tag names

**Title:** Dashboard - Segments - Save a segment using tag names
**Description:** Create and reopen a segment using the Tags filter. TagSelection SingleMixedCase uses vIp and must include VIP-only and both-tag customers; CommaSeparated uses VIP,Donor and must include VIP-only, Donor-only and both-tag customers. The neither-tag customer is always excluded.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Network; venue-scoped feature flag enable_customer_segments is enabled.
* Prepare four customers: one tagged VIP only, one Donor only, one with both VIP and Donor, and one with neither. Record their identities. Choose a unique segment name.

**Postconditions:** Leave the segment named for the setup owner’s cleanup; do not alter customer tags.
**Priority:** medium
**Tags:** dashboard, search-filters

**Parameters:**
TagSelection: SingleMixedCase, CommaSeparated

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Customers → Manage customers, open Filters and find Tags. |  | A text field accepts comma-separated tag names. |
| Enter the Tags value for TagSelection and wait for results. | SingleMixedCase: vIp. CommaSeparated: VIP,Donor. | The exact customer set matches the Description mapping; unrelated customers are absent. |
| Create a segment from these filters, enter the unique name and save. |  | One named segment is created with the expected audience. |
| Open Segments, reopen the saved segment and inspect its filters and audience. |  | The Tags value is retained and the exact expected customers appear once, with the correct audience count. |

## Dashboard → Customers → Feedback → Ratings

### TC-23: Dashboard - Ratings - Edit an organizer response

**Title:** Dashboard - Ratings - Edit an organizer response
**Description:** Update one review’s saved organizer response without changing another review.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Events. Feature flag enable_organizer_response is enabled for the selected venue.
* Use two approved customer reviews for events at this venue. The first has a saved organizer response; record both reviews, their responses and the first response’s author.

**Postconditions:** Restore the original response on the selected review.
**Priority:** medium
**Tags:** dashboard, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Customers → Feedback → Ratings and find the first prepared review. |  | Its recorded response appears under the correct event and review. |
| Select Edit, replace the response with a distinct approved test message and select Update. |  | The replacement response is displayed for that review. |
| Reload and find both prepared reviews. |  | The exact replacement is saved on the intended review; the other review and its response are unchanged. |

### TC-24: Dashboard - Ratings - Delete an organizer response

**Title:** Dashboard - Ratings - Delete an organizer response
**Description:** Remove the organizer’s response while retaining the customer’s review and other responses.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Events. Feature flag enable_organizer_response is enabled for the selected venue.
* Use two approved customer reviews for events at this venue. The first has a saved organizer response; record both reviews, their responses and the first response’s author.

**Postconditions:** Restore the original response using Respond, recording that the restoration has a new response timestamp.
**Priority:** medium
**Tags:** dashboard, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Ratings and locate the first prepared review and its response. |  | The recorded review and response appear together. |
| Select Delete on that organizer response. |  | The organizer response is removed; the customer’s review remains. |
| Reload and inspect both prepared reviews. |  | The selected response remains absent and Respond is available; the customer review and the other response are unchanged. |

### TC-25: Dashboard - Ratings - Cancel an unsaved response edit

**Title:** Dashboard - Ratings - Cancel an unsaved response edit
**Description:** Cancel an edited response without replacing the saved text.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Events. Feature flag enable_organizer_response is enabled for the selected venue.
* Use two approved customer reviews for events at this venue. The first has a saved organizer response; record both reviews, their responses and the first response’s author.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared response and select Edit. |  | Its saved text appears in the editor. |
| Replace the text and select Cancel. |  | The editor closes and the original response is shown. |
| Reload the review. |  | The original response remains saved; the discarded text is absent. |

### SPT-4116: Ratings - Save an organizer review response

**Title:** Ratings - Save an organizer review response
**Description:** Save an organizer response on the intended approved review and verify it after reload. Preserve the existing WebBoxOffice origin: open its Dashboard CRM → Ratings entry. Dashboard uses Customers → Feedback → Ratings; both reach the owning Ratings screen.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:**
* Employee permission: Manage Events; feature flag enable_organizer_response is enabled for the selected venue.
* Use an approved review for this venue with no organizer response and an unrelated control review. Use an approved test message and record both reviews. Record the event’s public page where the prepared approved review is visible.

**Postconditions:** Leave the approved test response for the setup owner or remove it using Delete after its saved result is recorded.
**Priority:** medium
**Tags:** dashboard, notifications

**Parameters:**
Platform: WebBoxOffice, Dashboard
View: Desktop, Desktop

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Ratings using the navigation mapped for Platform and locate the prepared review. |  | The selected venue’s approved review is shown with Respond available. |
| Select Respond, enter the approved message and select Submit. |  | The response appears under the intended customer review, with its author and response date. |
| Reload Ratings and find the same review and the control. |  | The exact response text remains saved on the intended review; the control is unchanged. |
| Open that event’s public page and find the prepared review. |  | The same saved organizer response appears below that customer review; unrelated reviews are unchanged. |

## Dashboard → Organization → Settings → Spaces → List

### TC-16: Dashboard - Spaces - Find and open the selected map

**Title:** Dashboard - Spaces - Find and open the selected map
**Description:** Search the Spaces list and open the intended existing map. This does not repeat map-creation tests.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Venue Layouts in a venue on a plan other than Basic.
* Use existing maps approved for inspection. Record their names, section/row/seat counts and one identifiable row. Map creation and editor behavior are already covered separately.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Settings → Spaces. |  | The selected venue’s spaces appear with Edit, Duplicate and Use Capacity Counters controls. |
| Search for the recorded map name. |  | Only matching spaces appear; the intended map is identifiable. |
| Select Edit on that map. |  | The editor opens the recorded map with its expected name, counts and identifiable row; no new map is created. |

### TC-17: Dashboard - Spaces - Page through the venue’s space list

**Title:** Dashboard - Spaces - Page through the venue’s space list
**Description:** List paging must not omit or repeat a space.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Venue Layouts in a venue on a plan other than Basic.
* Use existing maps approved for inspection. Record their names, section/row/seat counts and one identifiable row. Map creation and editor behavior are already covered separately.
* The venue has at least six spaces with distinct recorded names.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Organization → Settings → Spaces with search cleared. |  | The first page contains five expected spaces. |
| Use the next-page control. |  | The remaining expected spaces appear without repeating the first page. |
| Return to the first page. |  | The original first five spaces return with unchanged names and controls. |

### TC-18: Dashboard - Spaces - Duplicate a complete space independently

**Title:** Dashboard - Spaces - Duplicate a complete space independently
**Description:** Duplicate a space from its list, retaining its layout while creating an independent map. Copying one editor element is a separate operation.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Venue Layouts in a venue on a plan other than Basic.
* Use existing maps approved for inspection. Record their names, section/row/seat counts and one identifiable row. Map creation and editor behavior are already covered separately.
* Use a map with an identifiable section, row and seats, not attached to any selling event and with no orders, holds or active carts. Choose an unused copy name of no more than 32 characters.

**Postconditions:** Record the copied map name and leave it unattached to selling events for the setup owner’s cleanup.
**Priority:** high
**Tags:** dashboard, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Spaces and select Duplicate on the prepared map. |  | Duplicate Space identifies the source and the selected destination venue. |
| Enter the unused name and select Duplicate Space once. |  | Exactly one copy appears in this venue. |
| Open the copy with Edit and compare its layout to the recorded source. |  | The sections, rows, seats and labels match the original layout. |
| Rename one row in the copy and save, then reopen the original map. |  | The copy retains its row change, while the source row, layout and counts are unchanged. |

### TC-19: Dashboard - Spaces - Reject an invalid duplicate-space name

**Title:** Dashboard - Spaces - Reject an invalid duplicate-space name
**Description:** Prevent creating a space with a missing or already-used name. InvalidName selects Empty or Existing; every other condition remains valid.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Venue Layouts in a venue on a plan other than Basic.
* Use existing maps approved for inspection. Record their names, section/row/seat counts and one identifiable row. Map creation and editor behavior are already covered separately.
* Record the full space-name list and an existing target name in the same venue.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, assigned-seating

**Parameters:**
InvalidName: Empty, Existing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Duplicate for a recorded space. |  | The source and destination venue are shown. |
| Replace New Space Name with the selected InvalidName and select Duplicate Space. | Empty: clear the input. Existing: use another saved space’s exact name. | The missing-name or duplicate-name error is shown and the copy is not created. |
| Cancel, reload Spaces and compare the list. |  | No additional space exists and all original names remain unchanged. |

### TC-20: Dashboard - Spaces - Cancel duplicating a space

**Title:** Dashboard - Spaces - Cancel duplicating a space
**Description:** Cancel a duplicate-space draft without creating or changing a map.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Venue Layouts in a venue on a plan other than Basic.
* Use existing maps approved for inspection. Record their names, section/row/seat counts and one identifiable row. Map creation and editor behavior are already covered separately.
* Record the complete current space-name list and choose an unused copy name.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Duplicate for an existing space and enter the unused name. |  | The proposed copy name appears in the dialog. |
| Select Cancel. |  | The dialog closes without a duplication-success message. |
| Reload the list and search for the proposed name. |  | No copy exists and the original map remains unchanged. |

### TC-21: Dashboard - Spaces - Save a space’s capacity-counter setting

**Title:** Dashboard - Spaces - Save a space’s capacity-counter setting
**Description:** The list’s Use Capacity Counters switch must save only the chosen space’s setting without altering its seating layout.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Venue Layouts in a venue on a plan other than Basic.
* Use existing maps approved for inspection. Record their names, section/row/seat counts and one identifiable row. Map creation and editor behavior are already covered separately.
* Record Use Capacity Counters for the selected space and a control space.

**Postconditions:** Restore the selected space’s original switch state and reload to verify it.
**Priority:** high
**Tags:** dashboard, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Spaces and locate the selected space. |  | The saved Use Capacity Counters state is shown. |
| Change the selected switch to the opposite state and wait for saving to finish. |  | The change succeeds and the switch displays the chosen state. |
| Reload Spaces and reopen the selected map with Edit. |  | The switch retains the chosen state; the map’s recorded layout, labels and counts are unchanged. |
| Return to Spaces and inspect the control space. |  | Its recorded setting is unchanged. |

### TC-22: Dashboard - Spaces - Keep space lists separate when switching venues

**Title:** Dashboard - Spaces - Keep space lists separate when switching venues
**Description:** Switching venues must replace the space list and duplication destination with those belonging to the selected venue.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* Employee permission: Manage Venue Layouts in a venue on a plan other than Basic.
* Use existing maps approved for inspection. Record their names, section/row/seat counts and one identifiable row. Map creation and editor behavior are already covered separately.
* The employee can manage layouts in two venues with distinguishable maps. Record each venue’s map names.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Spaces in the first venue. |  | Its recorded map names appear. |
| Switch to the second venue and open Spaces. |  | Only the second venue’s spaces appear; first-venue maps are absent. |
| Open Duplicate for a second-venue map without submitting it. |  | Duplicating to identifies the second venue. |
| Cancel and reload the list. |  | Only the second venue’s maps remain; no copy was created. |

## Dashboard → Account → My stats

### TC-8: Dashboard - My stats - Show the signed-in employee’s totals

**Title:** Dashboard - My stats - Show the signed-in employee’s totals
**Description:** The web My stats page must show the signed-in employee’s all-time totals for the selected venue, rather than another employee’s or the entire venue’s totals.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* An employee can sign in to the selected venue; Events is enabled and venue-scoped feature flag enable_nextjs_manage_my_stats is on.
* Use known completed ticket sales attributed to this employee and separate sales attributed to another employee. The setup owner records this employee’s ticket quantity and earned ticket revenue from the underlying completed-sale records after the venue-user statistics refresh has completed; do not take expected totals from My stats itself.

**Postconditions:** No saved data is changed.
**Priority:** high
**Tags:** dashboard, analytics

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Account → My stats. |  | All time gross revenue and All time tickets sold appear in the venue’s currency. |
| Compare both figures with the independently recorded employee totals. |  | Both figures match that employee’s expected totals and exclude the other employee’s sales. |
| Reload My stats. |  | The same correct employee totals return without duplicate or stale results. |

### TC-9: Dashboard - My stats - Filter event and tracking-link results

**Title:** Dashboard - My stats - Filter event and tracking-link results
**Description:** Selecting events filters the web event-sales and tracking-link sections. The All time summary remains an all-time employee total.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* An employee can sign in to the selected venue; Events is enabled and venue-scoped feature flag enable_nextjs_manage_my_stats is on.
* Use known completed ticket sales attributed to this employee and separate sales attributed to another employee. The setup owner records this employee’s ticket quantity and earned ticket revenue from the underlying completed-sale records after the venue-user statistics refresh has completed; do not take expected totals from My stats itself.
* Prepare two distinguishable events accessible to this employee, with recorded personal sales and tracking-link figures for each. Include an event outside the default upcoming range for explicit selection.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, analytics, search-filters

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Account → My stats and expand Filters. |  | The Event selector is available. |
| Search for and select only the prepared event, including the past event for that run. |  | Event and tracking-link results are limited to that event and match its recorded personal figures; the unrelated event is absent. |
| Use Clear filters. |  | The default upcoming-event results return; the All time summary still matches the recorded all-time totals. |

### TC-10: Dashboard - My stats - Page through personal results

**Title:** Dashboard - My stats - Page through personal results
**Description:** Navigate the selected ResultSection without losing or repeating results. EventSales means the event-sales list; TrackingLinks means the tracking-link list.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* An employee can sign in to the selected venue; Events is enabled and venue-scoped feature flag enable_nextjs_manage_my_stats is on.
* Use known completed ticket sales attributed to this employee and separate sales attributed to another employee. The setup owner records this employee’s ticket quantity and earned ticket revenue from the underlying completed-sale records after the venue-user statistics refresh has completed; do not take expected totals from My stats itself.
* Prepare more than four eligible results in each selected ResultSection and record their expected identities and personal figures.

**Postconditions:** No saved data is changed.
**Priority:** medium
**Tags:** dashboard, analytics

**Parameters:**
ResultSection: EventSales, TrackingLinks

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Account → My stats and locate ResultSection. |  | Its first page displays up to four expected results and a next-page control. |
| Go to the next page in that section. |  | The remaining expected results appear without repeating the first page or mixing another employee’s figures. |
| Return to the previous page. |  | The original first-page identities and figures return. |

### TC-11: Dashboard - My stats - Change venue without retaining another venue’s figures

**Title:** Dashboard - My stats - Change venue without retaining another venue’s figures
**Description:** Switching venues must replace personal statistics, results and filters with those for the newly selected venue.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**
* An employee can sign in to the selected venue; Events is enabled and venue-scoped feature flag enable_nextjs_manage_my_stats is on.
* Use known completed ticket sales attributed to this employee and separate sales attributed to another employee. The setup owner records this employee’s ticket quantity and earned ticket revenue from the underlying completed-sale records after the venue-user statistics refresh has completed; do not take expected totals from My stats itself.
* The employee belongs to two venues with distinct currencies or clearly different recorded personal totals and event names. My stats is enabled in both.

**Postconditions:** Return to the starting venue and clear page filters.
**Priority:** high
**Tags:** dashboard, analytics

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My stats in the first venue and select one of its events. |  | The first venue’s recorded personal totals and filtered results appear. |
| Use the venue selector to switch to the second venue and reopen My stats. |  | The second venue’s currency, employee totals and results appear; the first venue’s event selection and figures are absent. |
| Reload the page. |  | Only the second venue’s recorded data is shown. |

## Pages needing cases or stronger coverage

Original gap table, retained for traceability. The published cases above address the additions and enhancements selected from this table; this is not an execution result.

Order reflects business impact and how clearly the missing assertions were established. It is not defect severity or a requested case count. Prefer strengthening reusable cases before creating new ones.

| Order | Visible navigation / owning screen | Coverage already present | What is missing or needs strengthening |
| --- | --- | --- | --- |
| 1 | Build → Products → Inventory → variant → **Finance** | SPT-5388 edits basic variant fields. SPT-5402/5403 restrict and save **product-level** Finance. SPT-3197 concerns variant internal rate cards. | No case found that saves the variant's service-fee choices and Cash/Card commissions, reopens them, and preserves the parent product and another variant. Include the actual sold-item protection and permission rules. Product defaults are not proof of variant overrides. |
| 2 | Build → Memberships → group / level → **Internal fees** | SPT-4767 checks the level sidebar's Admin/NonAdmin visibility. Suite 110 has general internal-rate-card coverage. SPT-4787 protects sold level prices. | The reviewed definitions do not establish successful editing on these particular group/level screens or their sold-record protections. Reuse general rate-card cases with clear owning-screen setup where equivalent; add only distinct group/level behavior. A price-lock case is not proof of fee protection. |
| 3 | Account → **My stats** | SPT-2170–2175 explicitly target React Native. SPT-5240 checks a Dashboard shortcut opens Profile & Stats. | No focused **web** My stats case found. Cover the current employee's known revenue and ticket totals, selected-event filters, event/tracking-link results and paging, and organization switching without stale data. Navigation alone does not prove the figures. |
| 4 | Customers → Manage customers → customer → **Credits** | SPT-1093 verifies account-credit display inside Box Office; SPT-3875 covers Box Office gift-card credit scope. | No focused customer-network Credits entry found. Establish the selected customer's account and ticket credits and correct organization scope. This screen deliberately hides the account-credit purchase action, so do not copy Box Office actions into it. Extend equivalent display assertions with this entry point rather than duplicate credit-calculation tests. |
| 5 | Customers → Manage customers → customer → **Holds** | Holds cases exist under Dashboard/Box Office and Core. | No focused customer-network Holds entry found. Cover showing only that customer's holds and opening the intended hold in Box Office for supported checkout/release actions. Shared HoldsList behavior can be reused; customer filtering and the correct customer/hold at the destination still need explicit proof. |
| 6 | Organization → Settings → **Spaces list** | **Suite 82 owns map creation/editing (71 definitions); suite 1184 owns assigning permissions (49).** The user confirmed creation is the same workflow. | List coverage only: the selected organization's spaces, opening the selected map, whole-space duplication with independent identity, duplicate-name rejection, paging/empty results, and saving the list's capacity-counter setting while preserving the map. Do not create another editor/create-map suite. Duplication of a map element inside the editor does not cover duplicating an entire space from its list. |
| 7 | Customers → Feedback → **Ratings** | SPT-2963 checks appearance. SPT-4116 adds an organizer review response, but its Platform is WebBoxOffice despite Dashboard navigation. SPT-4131 covers the separate negative-review alert. | Enhance the existing response coverage for the migrated Dashboard entry and exact permission/setup. It lacks explicit edit, delete, cancel and fresh-reload assertions. Do not describe organizer responses as wholly missing. Verify the response remains attached to the intended review and other reviews stay unchanged. |
| 8 | Build → Memberships → group → **Branding** | SPT-4766 opens sidebar pages; SPT-3621 tests membership renewal email customization. Organization branding is covered elsewhere. | No focused membership-group branding save/reopen definition found. The screen owns a membership-specific branding configuration; organization branding and renewal-email content do not establish this save path or isolation from another group. |
| 9 | Build → Gift Cards → **Create / Edit** | SPT-4064 creates types/denominations, SPT-4065 searches Active/Inactive lists, and SPT-4882 edits denominations and checks sold price/value locks. | Base create, search and denomination edits exist. Strengthen invalid-save coverage for required Name and denomination values, and editing an existing type's active state/settings with a fresh reopen. Update the obsolete Box Office manager navigation. Preserve SPT-4882's financial protections. **Purchases is unfinished, not a missing implemented page.** |
| 10 | Customers → **Segments** | SPT-3155 creates a segment; SPT-3167 checks list/paging; SPT-5159 attempts tag combinations. | Strengthen SPT-5159: its actions and expected results are shifted, and its final save/count step has no expected result. Define exact matching and excluded customers for the selected tag combination, then verify saved filters and the resulting audience. Preserve useful existing creation coverage. |

These are confirmed definition gaps or weaknesses within the reviewed candidates. The rest of the repository was screened by routes and related coverage; this note does not certify that every field, state or business rule on every other screen is fully covered.

## Conditional rollout: organizer Comp upload

The user's link, `/manage/admin/actions/generate-comps/`, is **Admin Actions → Generate comp tickets**. SPT-5002 already covers that internal-admin workflow.

The repository also defines a separate organizer page at `/manage/operations/bulk-actions/comp-upload/`, reached through **Operations → Bulk actions → Comp upload**. Its navigation and page require:

* The organization’s Events module.
* Employee permission **Bulk Import Complimentary Tickets** (`bulk_import_complimentary_tickets`).
* Venue-scoped feature flag `enable_venue_comp_tickets_import` enabled in Main → Feature Flags, with this venue included; it is not a field on venues_venue. The source describes this rollout as off by default; the backend also checks the flag and permission.

Both pages use shared import machinery, but the organizer page calls organization-scoped APIs and does not require the internal-admin role. Reuse shared CSV/issuance assertions; internal-admin access does not cover organizer authorization or organization isolation.

**Initial audit status (superseded by the later sidebar check above):** the user reported no Operations entry. No browser inspection or live flag/permission read was performed, and the beta build is not identified. A disabled flag, missing permission/module or a different deployed build could explain the absence. Keep this as **conditional, availability unverified**, rather than a confirmed active beta-page gap or navigation bug. Do not enable the flag or change employee permissions as part of this read-only audit.

## Coverage to reuse rather than recreate

| Owning area | Existing coverage / location | Decision |
| --- | --- | --- |
| Spaces map editor and creation | Suite 82, including SPT-752 and SPT-5567; permission assignment in suite 1184 | Creation/editor coverage belongs to the existing map suite. Only the Spaces list is a new page gap. SPT-752 currently enters through an event, so a future relocation should preserve that event workflow rather than silently replace it. Suite placement can be reviewed separately; this audit makes no moves. |
| Guestlists: create, upload, approve and check in | Suite 618, **Core - Guestlists**, has 17 cases outside Dashboard; examples SPT-3764/3765, 3772, 3774–3776, 4418/4419, 4794, 4805/4806, 4925/4926 | Not an absent feature. Suite 571's SPT-5122 is weak and has mismatched/missing expected results, but should not trigger duplicate cases for flows already covered in suite 618. Review placement and enhance the actual owners. |
| Workflows | Suite 949, **Workflow Approval - V1**, has 26 cases outside Dashboard | Not missing: definitions cover configuration, request submission, approval/denial, roles, queues, snapshots and lifecycle notifications. Link or organize the existing suite when separately authorized. |
| Plan & pricing / add-ons | Suites 189, 190 and 191 outside Dashboard; SPT-1683–1704 | Not missing purely because it is outside suite 78. Reuse these cases; review exact migrated navigation during a focused update. |
| Dashboard home | SPT-5240, suite 1079 **Manage (Daily Dash)**, outside Dashboard; root Dashboard cases also exist | Page-level definition exists. It does not establish the separate My stats page's totals or all current navigation variants. |
| Customer Info / Transactions / Notes | SPT-1681, 1676 and 1678 in Core explicitly include WebDashboard | Preserve and enhance these rather than claim all customer details are missing. Their setup/navigation can be updated without dropping Box Office coverage. |
| Customer Memberships and renewal | SPT-1194 includes Dashboard; SPT-4986 has CustomerNetworkHandoff with a completed renewal and assigned-seat checks | Existing relevant coverage. Customer Credits/Holds remain separate entry-point gaps. |
| Box Office settings | SPT-1230 Square; SPT-1319 auto check-in; SPT-3406/1313 Access PIN; SPT-4398 print language and Electron printer cases elsewhere | Existing related definitions. Check each actual platform before reuse; native/Electron-only output is not web proof. Cashout Reports is under construction in this checkout. |
| Finance → Custom fees / Fee settings / Payouts / Internal fees / Showire | Suites 1180, 1181, 1011, 110 and 195; includes scoped persistence/permissions and payout reconciliation cases | Substantial definitions exist. Not the first empty-page gaps identified here; this is not a full financial lifecycle sign-off. |
| Events, Tickets, Check-in, Reports, Products, Organization settings, Team and Branding | Existing Dashboard suites and their children | Coverage present. Target the specific gaps above; do not infer completeness from the suite counts. |

## Internal-admin pages — separate follow-up

These routes are implemented in the local frontend but have no focused named coverage found in the complete snapshot: **Abandoned-cart stats**, **Admin Analytics**, **Product feedback**, and **Showsense prediction**. Review these separately if internal tools are within the team's intended release scope. Their backend contracts were not deeply audited here, so this is a follow-up shortlist rather than ready-to-push cases.

Admin Actions already has 21 Dashboard definitions, Onsales has cases in suite 988 outside Dashboard, and post-purchase ad-placement cases exist in Core. Do not mark those entire features absent. Organizer Showire request cases do not by themselves prove the internal Showire request-management screen; that screen also needs a focused review.

## Unfinished pages and route duplicates

A route file is not necessarily an implemented screen. Do not fill Qase with fictional save/purchase tests for placeholders.

| Source state | Examples | Coverage decision |
| --- | --- | --- |
| Direct RoutePlaceholderPage | Account root; Customer creation; global Transactions and Orders; marketing campaigns/socials; global sellers/upgrades; widgets; capacity counters; standalone check-in preset routes | Track implementation/navigation readiness separately. Existing behavior reachable through another supported screen still needs preservation during a migration. |
| Named component but unfinished content | Account Profile and Notifications contain informational cards only; Gift Card Purchases says Coming soon; Box Office Cashout Reports says Under construction | Not currently executable management flows. Do not count public-account notification cases as proof that these employee settings are implemented. |
| Product route adapters selecting placeholder components | Product Discounts/Packages and some standalone variant create/basic-info routes | Existing Inventory inline create/edit remains a real flow with cases. The additional route's existence does not justify another case for a nonexistent form. |
| Hidden unfinished navigation | Capacity counters and Widgets are deliberately hidden in the navigation builders; global Sellers/Upgrades and Marketing have similar unfinished treatment | Keep separate from active page-case gaps. A previously supported critical function still requires a reachable replacement; a placeholder is not migration completion. |
| Aliases / redirects / shared owner | Event Check-in, event ticket credits, legacy organization custom-fee addresses, list/default detail redirects | Count the owning behavior once. Add entry-point coverage only where the starting state or access path differs. |
| Developer/demo and technical pages | Example Dashboard, Chakra test, form playground, 404/500 | Separate from organizer business-page coverage; do not inflate the feature gap list. |

The currently open legacy `/dashboard/financials/checkouts/` page is not itself a `/manage/` route in this checkout. This audit did not test it or classify its absence as missing coverage for an implemented new page.

## Evidence and completeness

The audit evidence below records the initial read-only stage. Publication, the later browser check and final read-back verification supersede its earlier status statements; see the publication result near the top.

> [!info]- Sources, query completeness and review limits
> **Qase:** SPT snapshot retrieved 2026-10-22 **21:50:18–21:50:37 UTC** (15:50 MDT). All **2,224 unique cases over 23 pages** and **317 unique suites over 4 pages** were retrieved. API totals stayed stable; duplicate/unique counts were checked. **1,076 cases** are descendants of Dashboard suite **78** before exclusions; this raw count includes two Websites cases and is not an adequacy score.
>
> Full project data was filtered locally, including titles, suite ancestry, tags, descriptions, Preconditions, parameters, Steps and Expected Results. Candidate definitions were compared with their actual screen and source behavior. Cases outside suite 78 were retained as related coverage, not discarded. At this initial audit stage, no Qase case writes or live executions occurred. Later authorized Qase publication is recorded separately; no application flows were executed.
>
> Snapshot files: `/private/tmp/qase-dashboard-cases-all.json`, `/private/tmp/qase-dashboard-suites-all.json`, `/private/tmp/qase-dashboard-snapshot-meta.json`. These are temporary working evidence, not permanent vault dependencies.
>
> **Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, develop at `bda3539bbab30d0215a2156d2153b4ed8b041ba6`. Local tracking showed 24 commits behind origin/develop. No fetch or branch change was performed. The route inventory contains **342 adapter files after excluding Websites and Talent, before the later Workday scope exclusion**, including **60 direct placeholder adapters**, plus redirects, shared screens, developer pages and indirect unfinished components. This is not 342 distinct implemented business pages. The running beta build identity was not identified. The later read-only sidebar inspection is recorded above.
>
> **Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app`, develop at `bda0dd85f003b598c587c806f0df93a9e2eb86d6`. Local tracking showed 69 commits behind origin/develop. No repository changes or service commands were made.
>
> Frontend screen/navigation sources: `packages/next-app/pages/manage/`; `packages/core/src/app-contexts/dashboard/components/navigation/DashboardNavBarUserMenu/hooks/route-sections/`; the owning feature files listed below. Source is local revision evidence, not proof of current beta behavior.
>
> Backend spot-checks for the highest-confidence gaps: `apps/tickets/api/venue_based/viewsets/comp_tickets_import_viewsets.py` establishes the organizer-specific flag/permission and preview/confirm/job endpoints; `apps/venues/api/venue_based/viewsets/spaces.py` and `serializers/spaces.py` establish organization-scoped listing/copy and name validation; `apps/tickets/api/venue_based/viewsets/event_rating_viewset.py` establishes approved-review scoping, Manage Events, response add/update/delete and blank rejection. Product/variant accounting-reference review was performed before the user excluded Workday; it is not active follow-up scope. These checks do not constitute a complete backend review of all Dashboard features.
>
> Handbook selections: [[00 Start Here/Showpass QA Handbook/00 Index]] and [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes]] — reuse known unaffected records, distinguish setup states, and preserve connected money/access behavior. [[00 Start Here/World-Class Software Quality Standard]] remains the authority.

### Owning frontend files for confirmed gaps

All paths below are relative to the frontend repository recorded above.

| Page | Source reviewed |
| --- | --- |
| Organizer Comp upload | `features/operations/bulk-actions/constants/bulk-actions-config.ts`; `data/repositories/VenueBasedCompTicketsImportRepository.ts`; `data/services/useVenueCompTicketsImportService.ts` |
| Variant Finance | `features/products/ui/pages/ProductVariantFinancePage.web.tsx`; `features/products/utils/product-variant-finance-utils.ts` |
| Membership internal fees / Branding | `features/memberships/ui/pages/detail/MembershipGroupInternalFeesPage.web.tsx`; `MembershipLevelInternalFeesPage.web.tsx`; `MembershipGroupBrandingPage.web.tsx` |
| My stats | `features/venue-user-stats/ui/pages/MyStatsPage.web.tsx`; `ui/components/MyStatsPageContent.web.tsx`; `constants/venue-user-stats-config.ts` |
| Customer detail tabs | `features/customer-network/hooks/useCustomerDetailRouteConfigs.ts`; `ui/pages/CustomerCreditsPage.web.tsx`; `CustomerHoldsPage.web.tsx`; `CustomerMembershipsPage.web.tsx`; `CustomerInfoPage.web.tsx` |
| Spaces list | `features/venue-spaces/ui/pages/VenueSpacesPage.web.tsx`; `hooks/useVenueSpacesPageData.ts`; `data/services/useVenueSpacesService.ts`; `ui/components/VenueSpaceCard.web.tsx` |
| Ratings | `features/customer-network/ui/pages/RatingsPage.web.tsx`; `ui/components/ratings/CustomerRatings/OrganizerResponse.web.tsx` |
| Gift-card management | `features/gift-cards/constants/gift-cards-config.ts`; `ui/hooks/useGiftCardFormConfig.ts`; `ui/pages/GiftCardPurchases.web.tsx` |

The feature paths in this table start under `packages/core/src/app-contexts/dashboard/`. No routes belong in manual steps unless the route itself is being tested or no visible navigation exists.

## Next work

Execute the published cases using their stated permissions, flags and records. Their definitions do not establish that beta passes them. Websites, Talent, Workday and unfinished placeholder flows remain outside this publication. Keep shared Core cases with their supported clients; use the new Dashboard folders for page-specific coverage. Future writes follow [[05 Tooling/qasectl]] within the user’s authorized scope.
