---
title: Products beta smoke checks — 2026-10-16
date: 2026-10-16
status: Smoke conclusion corrected; sold-price lock eligibility unresolved
tags:
  - qa/execution
  - products
---

# Products beta smoke checks — 2026-10-16

> [!note] Generated attachments removed
> Generated snapshots, JSON exports and frozen publication copies were deleted on 2026-10-17 at the user’s request. Published case IDs, recorded results and test definitions remain in this note. Read Qase again before preparing future changes.

## Result

**Earlier smoke-pass conclusion withdrawn.** Initial run: **15:43–15:48 PDT, 2026-10-16**. The sold variant had an editable Price field during that run; I did not resolve its price-lock eligibility before reporting a pass. **Release recommendation: Decision blocked by unresolved sold-price lock eligibility, plus missing creation/edit/duplication persistence and purchase/stock proof.** Navigation and filter observations below remain valid; they do not establish that the price protection works.

**Context:** Existing Codex browser tab on `https://beta.showpass.com/manage/products/`, signed in as Christian Valdez, selected organization **MEGACON Orlando** confirmed in the organization drawer. Exact employee permissions/admin status, plan, feature-flag values and deployed revision were not independently verified. No organization switch. Existing records were treated as user-owned. No product creates, copies, saved edits, deletes, orders, jobs or Qase writes were performed. In the later price-lock follow-up, Price was changed locally from 5.00 to 5.01, then restored to 5.00 without selecting Save. Filters, viewport and the originally empty clipboard were restored; the initial run ended on Products; the price-lock follow-up leaves the browser on FAN EXPO LANYARD → Inventory. Screenshots are preserved for review.

**Intent:** Verify the organizer can find products and reach their management screens without wrong-record navigation, broken controls or unusable layout. Main risk: loss of organizer access and misleading stock information. Proof: filtered lists, correct product headings, displayed configuration, modal dismissal, matching sold counts and responsive layouts. Definition source: [[03 Test Cases/Products/inventory-qase-test-cases]], including PR #7559 and published duplication case [SPT-5535](https://app.qase.io/case/SPT-5535). This run does **not** pass SPT-5535: its creation and persistence steps were not executed.

## Confirmed bugs

No saved-price-change defect is confirmed. The editable sold-price control below is a confirmed UI observation, classified as a client-side risk not submitted while its organization setting remains unverified.

## Sold-price protection — corrected follow-up

**PL-01: Sold variant accepts an unsaved price edit.** Affected definition: [SPT-5389](https://app.qase.io/case/SPT-5389). Coverage: **Blocked** for the required lock proof. Confidence: **Client-side risk not submitted**; the control's editability is confirmed, but violation of this organization's rule and successful saved price changes are not confirmed. Potential impact: Major if prices that should be locked can change after sales. The user has not assigned release-blocker status. **Data safety: no saved data change.**

**Starting state:** beta → MEGACON Orlando → Build → Products → All products → FAN EXPO LANYARD → Inventory. Product 2171, One Size variant, Sold 2, Price USD 5.00. The authenticated account is Christian Valdez; exact admin/employee permissions were not verified. The organization's `price_tiers_enabled` value and the variant's stored `has_price_lock` value have not been independently verified.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open FAN EXPO LANYARD's Inventory. | One Size; Sold 2; Price USD 5.00 | Correct product and sold variant appear. |
| Inspect whether Price can receive edits. | A sold, price-locked variant in an organization with tiered pricing disabled must have a disabled Price control. | Lock behavior follows the source rule; enabling tiered pricing is an explicit exception. |
| Attempt an unsaved price edit. | 5.01; do not select Save | Under the required locked configuration, the control must not accept the edit. |
| Restore the original price without saving. | 5.00 | Original displayed price is restored; no saved change is submitted. |

**Actual result:** Price is enabled and accepts 5.01 even though Sold is 2. This editable state was already observed during the initial smoke, and the follow-up confirms it accepts input. No Save was selected. Its 5.00 value was restored. Because the tiered-pricing exception has not been checked, this is not yet a confirmed business-rule violation or backend bypass. SPT-5389 remains unexecuted against its required `price_tiers_enabled=false` setup; no new Qase case is needed.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/23-sold-price-editable-unsaved.png|400]]

*Beta `/manage/products/2171/inventory/` · follow-up 2026-10-16 · Sold 2 and locally entered USD 5.01; not saved.*

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/24-sold-price-restored.png|400]]

*Same product · original USD 5.00 restored without saving. Control-state evidence: sold-price-control.*

**Source rule checked:** Backend `EnablePriceChangesMixin.get_enable_price_changes` returns `not item.has_price_lock or item.venue.price_tiers_enabled`. The nested product serializer exposes that result. The product configuration service rejects a changed price when `has_price_lock` is true and `price_tiers_enabled` is off. Frontend Inventory disables Price only when `enable_price_changes === false`. A Sold number alone does not establish those configuration values. Next evidence needed: establish both actual values for this organization/variant and compare the deployed response with the rendered control; test saving only on an approved product under the required configuration.

**Revisions checked for follow-up:** backend `b5f397a0438910435e0d537f47e12d6064d7e019`; frontend `7e527b0285349e5d9537731f97f09b414001778c`. Paths: backend `apps/core/serializers/mixins.py`, `apps/inventory/api/venue_based/serializers/products.py`, `apps/inventory/services/products/configuration.py`, `apps/venues/models/venue_management/venue.py`; frontend Products `utils/product-form-utils.ts` and `ui/components/form/ProductInventorySection.web.tsx`. No source or Qase changes made.

## Testing proof

All rows below are **Browser-verified only**, with the specific limit stated. Each screenshot caption identifies the actual route and observation. These are sampled smoke checks; visibility of an unexercised child control is not interaction coverage.

**Navigation, list and restoration — Browser-verified only.** Build → Products → All products reaches the current list. Four products remain visible after returning from Details; final search blank, Hide archived products, All categories and All products for Box office visibility.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/21-final-restored.png|400]]

*Beta `/manage/products/` · 15:48:03 PDT · observed result as described above.*

**Product-name search — Browser-verified only.** FAN EXPO LANYARD returns only that product, ID 2171, with 2 / 10000 sold.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/01-search-match.png|400]]

*Beta `/manage/products/` · 15:44:27 PDT · observed result as described above.*

**Unmatched search — Browser-verified only.** no-such-product-smoke-20261016 shows No products found and a Clear action. Clearing restores the list.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/02-search-empty.png|400]]

*Beta `/manage/products/` · 15:44:34 PDT · observed result as described above.*

**Category filter — Browser-verified only.** Products shows no matches; FAN EXPO Merch restores its four products. This verifies the observed category subsets, not every category association.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/03-category-empty.png|400]]

*Beta `/manage/products/` · 15:44:40 PDT · observed result as described above.*

**Hidden Box office filter — Browser-verified only.** With FAN EXPO Merch selected, Hidden in box office shows test and ULTIMATE FAN MERCHANDISE.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/04-hidden-box-office.png|400]]

*Beta `/manage/products/` · 15:45:03 PDT · observed result as described above.*

**Visible Box office filter — Browser-verified only.** With FAN EXPO Merch selected, Visible in box office shows EVENT POSTER and FAN EXPO LANYARD. The selected product’s checked Staff Box Office setting agrees with its inclusion.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/05-visible-box-office.png|400]]

*Beta `/manage/products/` · 15:45:08 PDT · observed result as described above.*

**Category management — Browser-verified only.** Manage categories opens; Manage associated products expands four reorder handles for FAN EXPO Merch; Close modal dismisses it. No name, ordering or Save changes action used.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/06-categories.png|400]]

*Beta `/manage/products/` · 15:45:22 PDT · observed result as described above.*

**Duplicate confirmation and dismissal — Browser-verified only.** Duplicate product for FAN EXPO LANYARD names the correct source and explains independent inventory and retained settings. Cancel returns focus to its trigger; reopening and Escape also dismisses it. Create copy was never selected.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/07-duplicate-confirmation.png|400]]

*Beta `/manage/products/` · 15:45:26 PDT · observed result as described above.*

**Details entry — Browser-verified only.** Edit product opens FAN EXPO LANYARD with its name, FAN EXPO Merch category, description editor, image and Save. Back returns to Products. No input changed.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/22-details.png|400]]

*Beta `/manage/products/2171/basic-info/` · 15:48:16 PDT · observed result as described above.*

**Inventory display — Browser-verified only.** One Size is Published with Sold 2, Inventory 10000, Purchase Limit 20, blank SKU and Price USD 5.00. The 2 / 10000 count agrees with the list. No change made during the initial display check. Price-lock eligibility was not resolved; see PL-01 above for the later unsaved-edit check.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/08-inventory.png|400]]

*Beta `/manage/products/2171/inventory/` · 15:45:50 PDT · observed result as described above.*

**Availability display — Browser-verified only.** Venue Page, Staff Box Office and event checkout are enabled; event scope is Include for all items. Membership checkout is off, and product status is Published. No switch changed.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/09-availability.png|400]]

*Beta `/manage/products/2171/availability/` · 15:46:00 PDT · observed result as described above.*

**Fulfillment dependency — Browser-verified only.** Will Call/Pick Up is selected; Electronic Ticket and Standard Shipping are off. Transfers is disabled with its Electronic Ticket explanation. Exclude PDF is visible and unchecked. No delivery change made.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/10-fulfillment.png|400]]

*Beta `/manage/products/2171/fulfillment/` · 15:46:05 PDT · observed result as described above.*

**Communications entry — Browser-verified only.** Customer-message editor, its custom-confirmation explanation and internal notification recipients load for the selected product. No content or recipients changed.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/11-communications.png|400]]

*Beta `/manage/products/2171/communications/` · 15:46:15 PDT · observed result as described above.*

**Finance lock display — Browser-verified only.** An existing-sales warning appears; Processing Fee, Showpass Fee and seller commission inputs are disabled. Organization defaults say Absorb Processing Fee and Absorb Showpass Fee. This does not test server enforcement.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/12-finance.png|400]]

*Beta `/manage/products/2171/finance/` · 15:46:23 PDT · observed result as described above.*

**Custom fees access and lock display — Browser-verified only.** Custom fees opens from the visible product navigation. Sales Tax shows an organization-default 6.5% customer-paid rate for Ticket/Product, Online/In-Person, Cash/Card. Add is disabled with the locked-financial-settings explanation. Calculator was not used.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/13-custom-fees.png|400]]

*Beta `/manage/products/2171/custom-fees/` · 15:46:29 PDT · observed result as described above.*

**Statistics and chart mode — Browser-verified only.** Stats & Info shows Products Sold 2 and Total Revenue USD 7.02, with One Size 2 sold / USD 7.02. Quantity changes the chart heading to Variant Quantity; Revenue restores it. Sales count agrees with Inventory/list; revenue calculation is not independently reconciled.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/14-stats-quantity.png|400]]

*Beta `/manage/products/2171/stats-info/` · 15:46:40 PDT · observed result as described above.*

**Create entry and return — Browser-verified only.** Create product opens a blank starter form with Product Name, Category, Variant Name and Price. Back exits without submission. Required-field validation and successful saving were not executed.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/15-create-entry.png|400]]

*Beta `/manage/products/create/` · 15:47:02 PDT · observed result as described above.*

**Desktop layout: 1280 × 900 — Browser-verified only.** Four cards, stock summaries and all four per-card actions fit without overlap; the filter sidebar is readable.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/16-desktop-1280.png|400]]

*Beta `/manage/products/` · 15:47:10 PDT · observed result as described above.*

**Compact layout: 861 × 900 — Browser-verified only.** Cards form two columns; stock and four action icons fit. The responsive filter drawer opens and closes.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/17-compact-861.png|400]]

*Beta `/manage/products/` · 15:47:17 PDT · observed result as described above.*

**Mobile layout: 390 × 844 — Browser-verified only.** Cards use one column and the header/action icons fit. This is a resized browser viewport, not a physical-device execution.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/18-mobile-390.png|400]]

*Beta `/manage/products/` · 15:47:20 PDT · observed result as described above.*

**Mobile duplicate confirmation — Browser-verified only.** The EVENT POSTER confirmation fits the mobile viewport, with readable wording, Close, Create copy and Cancel. Cancel dismisses it; no copy created.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/19-mobile-duplicate.png|400]]

*Beta `/manage/products/` · 15:47:25 PDT · observed result as described above.*

**Mobile search and Clear — Browser-verified only.** Toggle filters opens a drawer. Searching FAN EXPO LANYARD and closing it shows only the matching card with an active-filter indicator. Reopen → Clear restores all four products.

![[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/20-mobile-search.png|400]]

*Beta `/manage/products/` · 15:47:39 PDT · observed result as described above.*

**Copy product link — Browser-verified only.** FAN EXPO LANYARD showed “Product link copied.” and returned `https://beta.showpass.com/o/megacon-orlando-2/categories/2575/?id=2171`, matching its visible name link. Original clipboard restored to empty text. No public purchase page was opened. Evidence: [[03 Test Cases/Products/evidence/products-beta-smoke-2026-10-16/copy-link-proof.txt]].

**Runtime error signal — Browser-verified only.** The bounded captured console error list returned `[]` near the end of the run. This is not a network audit or proof of zero backend errors. Evidence: console-errors.

## Not executed

| Remaining scope | Coverage | Reason / evidence needed |
| --- | --- | --- |
| Archived-item exclusion and Duplicate visibility | Blocked | Include archived products was selected and reset; the same four nonarchived products appeared. A known archived source is needed to prove the item-level behavior. |
| Product creation/edit/duplication, new identities, copied configuration, zero copy sales, price-lock reset and independent inventory | Deferred | No records approved for persistent mutation were supplied. Requires an approved source with suitable variants/sales and retained copied-product evidence after reopening. |
| Category/variant create, reorder, archive, delete and saved validation | Deferred | These change shared records; requires owned records and a cleanup/retention plan. |
| Detailed form validation, unsaved edits, rich-text toolbar, uploads, variant actions and nested selectors | Deferred | This smoke checked entry and displayed state; dedicated controlled form cases are required. |
| Calculator, Admin Internal fees and hidden/conditional integrations | Deferred | Separate owning workflows; visibility/navigation alone would not establish their correctness. |
| Purchase, discount, shipping, membership/event eligibility, issued products, pickup, refund and financial reconciliation | Deferred | Requires approved connected orders and independent expected values; no money or fulfillment actions performed. |
| Permission denial/admin bypass, plan/flag gates, organization isolation, legacy/embedded pages | Deferred | Current authenticated session only; requires explicit alternate-role/configuration preparation. |
| Pagination / large catalogs | Blocked | Only four records were returned in this organization; a catalog over the page limit is needed. |
| Server failure/retry, rapid submission, ambiguous completion and concurrency | Deferred | Controlled API/integration conditions and safe mutation scope required. |
| Stats date filtering, exact revenue and historical adjustments | Deferred | Charts and sold-count agreement checked; independently known orders, date boundaries and expected net amounts required. |
| Other browsers, physical mobile devices, full keyboard/screen-reader behavior, French | Deferred | Three CSS widths exercised in this browser only; dedicated client/accessibility/language execution required. |

The list’s EVENT POSTER count was initially 0 and later 2; this run made no purchase or product write. Its history was not investigated, and no cause or defect is inferred from that change. FAN EXPO LANYARD stayed at 2 throughout the observed list/Inventory/stats checks. The editable sold-price control should have triggered the price-lock follow-up during the initial smoke. Its required configuration and save enforcement remain unresolved; see PL-01.
