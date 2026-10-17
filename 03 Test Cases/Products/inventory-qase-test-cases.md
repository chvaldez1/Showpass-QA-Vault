---
title: Marketplace Inventory — Qase-Ready Cases
date: 2026-10-15
status: Published cases and product duplication verified; execution pending
tags:
  - qa/test-cases
  - qase
  - products
---

# Marketplace Inventory — Qase-Ready Cases

**Current review:** the published cases did not yet cover every base workflow, and several combined independent goals. The approved source and Qase review now gives one purpose per case: add, edit, reorder, change status, delete, configure a page, or reject invalid input. Fields saved together on one form stay together.

**Published:** 13 existing-case updates and 27 new cases, fully verified 2026-10-15 15:34 PDT. New IDs are SPT-5391–5417. Updates preserve existing folders/metadata; new cases use the established folders. The original Products baseline had 24 cases, and these additions bring its scope to 51. No live product data was changed. Zero/blank Inventory behavior remains unresolved; publication is not execution or production sign-off.

**Scope:** product list and the category, product-edit and statistics screens it opens. This is base coverage plus selected edges, not a full checkout or every product-setting audit. Qase case definitions were published with user approval. No saved product changes were made; published definitions are not executed passes.

**Navigation:** legacy **Dashboard → Manage → Marketplace**; modern **Dashboard → Build → Products → All products**. In descriptions below, “product list” means that visible destination for the selected version. Qase home is [Products, suite 109](https://app.qase.io/project/SPT?suite=109); the 18 published cases are now organized in the child folders recorded below. The supplied link's `case=1660` belongs to Register suite 182 and is unrelated.

> [!summary] Current review index
> **Updated existing:** SPT-5376 (search), SPT-5378 (stock figures), SPT-5379 (copy link), SPT-5386 (filters), SPT-969 (category creation), SPT-970 (lifetime stats), SPT-4880 (creation title), SPT-5387 (Details), SPT-5388 (edit variant), SPT-5389 (price lock), SPT-4060 (Venue Page visibility), SPT-4881 (delivery), SPT-5155 (starter defaults).
>
> **Published split cases:** SPT-5391 add variant; SPT-5392 reorder variants; SPT-5393 customer message; SPT-5397 deletion guards; SPT-5400 recipients; SPT-5406 date filters; SPT-5407 public-name link; SPT-5408 unmatched search; SPT-5409/SPT-5410/SPT-5411 sales surfaces; SPT-5412 invalid shipping; SPT-5413/SPT-5414 transfers; SPT-5417 filter reset.
>
> **Published base gaps / selected edges:** SPT-5394/SPT-5395 product/variant status; SPT-5396 unsold removal; SPT-5398 category product order; SPT-5399 empty catalog; SPT-5401 PDF setting; SPT-5402/SPT-5403/SPT-5415 finance permission/configuration/sales lock; SPT-5404 invalid image; SPT-5405 unsaved Details; SPT-5416 Basic-plan gate.
>
> **27 new cases and 13 updates are now published and verified.** Many new cases retain responsibilities split from larger tests; they are not 27 newly discovered business behaviors. Each case has one purpose and 2–5 steps. Execution remains pending.

**Product duplication published — 2026-10-16:** TC-200 was created as [SPT-5535](https://app.qase.io/case/SPT-5535), covering PR #7559, in Products → List View (1153). All saved fields and 10 steps were read back and matched. This adds one case to the earlier 51-case scope; execution remains pending. See [[#Product duplication — focused review, 2026-10-16]] for scope and evidence.

## Dashboard → Manage → Marketplace / Build → Products → All products


### SPT-5376: Dashboard - Products - Search for a product

**Title:** Dashboard - Products - Search for a product

**Description:**

Start at Dashboard → Build → Products → All products. Search by product name, variant name or SKU and verify the matching products. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with a distinctive name, named variant and SKU. Record a value for the selected SearchBy run that does not occur on another product.

**Tags:** dashboard, products, search-filters

**Parameters:**

SearchBy: ProductName, VariantName, SKU

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the list with search empty. | Selected organization | Its product list appears. |
| Enter the recorded SearchBy value and wait for loading to finish. | Selected SearchBy value | The matching product appears and unrelated products do not. |
| Clear the search. | Empty search | The original list returns. |

**Postconditions:**

* Leave search empty. No product data changes.

### SPT-5377: Dashboard - Products - Load the remaining product list without duplicates

**Title:** Dashboard - Products - Load the remaining product list without duplicates

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js.

Given more than one page of products, verify that loading the next page adds distinct products and keeps earlier products visible. Run on legacy Marketplace and the Next.js product list. The organization-scoped `enable_products_nextjs_embed` flag selects the version at the legacy entry: off or absent = legacy; on = Next.js embed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has **Manage Marketplace** permission in an organization on the Standard or Premium plan.
* Use an organization with at least 13 active products. Record its active product names/count; both versions request 12 products at a time.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the product list with search empty. | No filters | The first page contains up to 12 products; more products remain to be loaded. |
| Record the displayed names, then load the next page. | Legacy: select Load More Products; Next.js: scroll to the bottom of the list | Additional products appear while the earlier products remain, with no duplicates. |
| Continue until the end. | Recorded active product list | All expected active products appear once and loading ends without another page; the legacy Load More Products control is no longer offered. |

**Postconditions:**

* No product data changes.


### SPT-5378: Dashboard - Products - Show product stock totals

**Title:** Dashboard - Products - Show product stock totals

**Description:**

Start at Dashboard → Build → Products → All products. Verify the product card’s displayed stock figures against saved variants. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. The Next.js grid shows Sold / total; it does not render remaining stock or variant count. Legacy shows those additional figures. Run Unlimited only with a known existing uncapped record on Next.js; clearing the Inventory input is not setup for unlimited stock.

| StockState | Next.js card | Legacy card |
| --- | --- | --- |
| Finite | Sold 5 / 15 | Sold 5 / 15; 10 in stock; 2 variants |
| SoldOut | Sold 5 / 5 | Sold 5 / 5; 0 in stock; 1 variant |
| Unlimited | Sold equals the recorded combined Sold quantity; total is Unlimited | Not applicable pending the legacy unlimited-display expectation |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* For Finite, select two saved variants with Inventory 5 and 10 and Sold 2 and 3. For SoldOut, select one variant with Inventory 5 and Sold 5. For Unlimited, use a known existing backend-null uncapped variant plus a variant with Inventory 5; record both Sold quantities.
* Use known existing quantities with no active carts changing them. No purchases, field clearing or stock edits are part of this test. If an uncapped record cannot be established, mark only the Unlimited run blocked.

**Tags:** dashboard, products

**Parameters:**

StockState: Finite, SoldOut, Unlimited

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected product’s Inventory and record its values. | Selected StockState | The saved values match the selected setup. |
| Return to All products and find that product. | Selected StockState and version | The card matches the version-specific figures in the Description table. |
| Refresh the product list. | Same product | The same figures remain; zero/unlimited totals do not create invalid text or a broken progress bar. |

**Postconditions:**

* No product, cart or sale changes are made.

### SPT-5379: Dashboard - Products - Copy a public product link

**Title:** Dashboard - Products - Copy a public product link

**Description:**

Start at Dashboard → Build → Products → All products. Verify Copy product link identifies the selected product. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with a category, an available variant and Venue Page visibility on. Record its name, organization and category. Preserve the current clipboard text if it must be restored.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select Copy product link on its card. | Legacy: Copy Link | A copied confirmation appears. |
| Paste into an unsent local text field. | Do not send a message | The copied address identifies the recorded organization, category and product. |
| Open the copied address. | Copied address | The correct product is identified in the correct public category; no purchase is made. |

**Postconditions:**

* Restore the clipboard if previously recorded. No cart or order is created.

### SPT-5384: Dashboard - Products - Deny Marketplace management without permission

**Title:** Dashboard - Products - Deny Marketplace management without permission

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js.

Verify the Marketplace management page rejects an employee without Manage Marketplace, including direct entry. Run on legacy Marketplace and the Next.js product list. The organization-scoped `enable_products_nextjs_embed` flag selects the version at the legacy entry: off or absent = legacy; on = Next.js embed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Use an existing employee account without Manage Marketplace permission, rather than an owner, administrator or unrestricted account. The selected organization is on the Standard or Premium plan.
* Have the product-list management address and an existing product-edit address for that organization, recorded by an authorized employee.

**Tags:** dashboard, products, employee-permissions

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the restricted employee and open Dashboard navigation. | Selected organization | Marketplace/product-management navigation is unavailable. |
| Open the recorded product-list management address directly. | Recorded product-list address | Access is denied; product-management controls do not open. |
| Open the recorded product-edit address directly. | Same organization | Access is denied; no editable product form opens. |

**Postconditions:**

* No permissions or product data change.


### SPT-5385: Dashboard - Products - Keep products and categories within the selected organization

**Title:** Dashboard - Products - Keep products and categories within the selected organization

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js.

Verify changing the selected organization replaces its catalog and rejects the other organization’s saved management links. Run on legacy Marketplace and the Next.js product list. The organization-scoped `enable_products_nextjs_embed` flag selects the version at the legacy entry: off or absent = legacy; on = Next.js embed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in two organizations on Standard or Premium plans.
* Select a product and category in each organization with distinct names. In the first organization record its product-edit, product-stats and category-edit management links.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the first organization’s product list. | First organization | Its selected product appears. |
| Use the organization selector to switch to the second organization and open the product list. | Second organization | Only the second organization’s products appear. |
| Search for the first organization’s distinctive product name and open category management. | Recorded first-organization names | Neither the first organization’s product nor its category appears. |
| While the second organization remains selected, open each recorded first-organization management link. | Product edit, product stats, category edit | Each request is rejected or unavailable; no first-organization details or editing controls appear. |

**Postconditions:**

* Return to the original organization and clear search. No product or category changes.


### SPT-5386: Dashboard - Products - Filter the product list

**Title:** Dashboard - Products - Filter the product list

**Description:**

Start at **Dashboard → Build → Products → All products**, or the legacy Marketplace entry with Next.js embedding enabled.

Given products with different categories, archive states and Box office visibility, verify Next.js filters restrict the list together. Run only on the Next.js product list, including its embedded version; the legacy list only has search.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has **Manage Marketplace** permission in an organization on the Standard or Premium plan.
* For the legacy entry, enable `enable_products_nextjs_embed` for the organization.
* Use two categories and record products in each: an active Box office-visible product, an active Box office-hidden product and an archived product. Record their names and settings without changing them.

**Tags:** dashboard, products, search-filters

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the product list’s filters. | Next.js product list | Search, Archived products, Category and Box office visibility are available. |
| Choose the category containing the recorded active products and Visible in box office. | Hide archived products | Only products matching both selections appear; the hidden and archived products do not. |
| Choose Hidden in box office. | Same category | The recorded hidden product appears and the visible product does not. |
| Choose All products for Box office visibility and Include archived products. | Same category | The recorded archived product appears with its Archived label. |

**Postconditions:**

* Leave filters cleared. No product data changes.


### SPT-5535: Dashboard - Products - Duplicate a product with independent inventory

**Title:** Dashboard - Products - Duplicate a product with independent inventory

**Description:**

Starting at Dashboard → Build → Products → All products, duplicate an existing product and verify the copy keeps its saved configuration while starting with its own inventory and no sales. Changing the copy's inventory must leave the original product unchanged. This case covers the current Products page at `/manage/products/`.

Run at mobile (390 px), compact desktop (861 px) and desktop (1280 px) widths. At each width, the sold count and Edit product, View product stats, Duplicate product and Copy product link controls must remain readable and usable without overlap.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Memberships are enabled for the organization, and its `show_membership_product_addons` flag is on so membership selections are visible under Availability.
* Select a nonarchived product approved for copying, with two Published variants and one Archived variant. A variant is a purchasable choice with its own SKU, price and inventory. At least one Published variant must have prior sales and a positive, limited Inventory value. The original must not receive purchases during this case so its recorded totals remain comparable.
* Select a source whose name is no longer than 30 characters, with no existing product named `<source name> (Copy)`. Copying retains the source's sales visibility; use selections that will not offer the copy to real customers.
* Record the original's name, category, image, description, variant order, Variant Name, SKU, Price, Purchase Limit, Inventory, Status and Sold values; which original Prices are locked; its Total Revenue and Products Sold; and its Availability switches and selected events, ticket types, membership groups and membership levels. Use a source restricted to at least one selected event and one selected membership group, with both enabled and disabled sales channels.

**Tags:** dashboard, products, duplication, inventory

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Products → All products and find the recorded original product. | Recorded product name | Its sold count and four action controls are readable and usable without overlap. |
| Select Duplicate product on the original's card. | Original product | A confirmation names the original, explains independent inventory and retained event/membership associations and sales settings, and offers Cancel and Create copy. |
| Select Create copy once. | No changes to the original | Product duplicated. appears and the new product's Details page opens. |
| Compare the copy's Details with the recorded original. | Expected name: original name followed by ` (Copy)` | The copy has the expected name and the same category, image and description. |
| Open Inventory and compare its variants with the recorded original. | Published variants only | Exactly the two Published variants appear in the same order, with matching names, SKUs, prices, purchase limits and configured Inventory; each has Sold of 0 and an editable Price, and the Archived variant is absent. |
| Open Availability and compare the sales channels and selections. | Recorded switches, events, ticket types, membership groups and membership levels | Enabled and disabled channels and all recorded event and membership selections match the original. |
| Open the copy's Stats & Info and clear any date filters. | All sales dates | Products Sold and Total Revenue are both 0. |
| Return to All products without refreshing the page and find both products. | Original and copied names | The original remains and exactly one new copy appears with zero sold stock. |
| Open the copy's Inventory, increase one Published variant's Inventory by 1, save, then leave and reopen Inventory. | Recorded configured Inventory + 1 | The changed quantity remains saved on the copy. |
| Open the original product and compare Details, Inventory, Availability and Stats & Info with the recorded values. | All sales dates | The original's settings, variants, quantities, sales totals and existing price lock are unchanged. |

**Postconditions:**

* Retain the created copy under its recorded name for review; do not create orders or change the original. Keep the copy unavailable to real customers using the approved setup.
* One independently saved copy exists; no original order or sale has been copied or changed.


## Marketplace / Products → Categories


### SPT-969: Dashboard - Products - Create a product category

**Title:** Dashboard - Products - Create a product category

**Description:**

Start at Dashboard → Build → Products → All products. Create one category with a long name and verify that it remains available. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Prepare a unique 200-character category name, within the backend 256-character limit.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open category creation from the product list. | Legacy: New Category; Next.js: Manage categories → Create category | The category-name field and save control appear. |
| Enter the prepared name and select the save control once. | Unique 200-character name | The category is created once; its name does not overlap or hide controls. |
| Close and reopen category management. | Same organization | The new category is still listed with its complete name available. |

**Postconditions:**

* Retain the clearly named category for review; no product assignment is changed by this case.

### SPT-5380: Dashboard - Products - Rename a category without losing its products

**Title:** Dashboard - Products - Rename a category without losing its products

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js.

Given a category containing products, verify its new name persists without changing the products assigned to it. Run on legacy Marketplace and the Next.js product list. The organization-scoped `enable_products_nextjs_embed` flag selects the version at the legacy entry: off or absent = legacy; on = Next.js embed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has **Manage Marketplace** permission in an organization on the Standard or Premium plan.
* Select a category whose name may be changed; record its original name and associated product names.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open category editing. | Legacy: Edit Categories → Edit; Next.js: Manage categories → Edit category | The current category name appears. |
| Replace its name and save. | Original name plus QA Rename, keeping the result within 256 characters | The updated name is saved. |
| Reopen category management and the same category’s products. | Same category | The renamed category contains the same products. |
| Reopen one associated product for editing. | Recorded product | Its category selection shows the renamed category. |

**Postconditions:**

* Restore the original category name and reopen it to verify restoration.


### SPT-5381: Dashboard - Products - Save category display order

**Title:** Dashboard - Products - Save category display order

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js.

Given two categories, verify changing their display order persists and appears on the public organization page. Run on legacy Marketplace and the Next.js product list. The organization-scoped `enable_products_nextjs_embed` flag selects the version at the legacy entry: off or absent = legacy; on = Next.js embed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has **Manage Marketplace** permission in an organization on the Standard or Premium plan.
* Select two categories with public, available products. Record the full original category order and confirm these categories may be reordered.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open category management. | Legacy: Edit Categories; Next.js: Manage categories | Categories appear in their saved order. |
| Drag the second selected category above the first and save. | Selected categories | The new order saves. |
| Close and reopen category management. | Same organization | The selected categories retain their new order. |
| Open the organization’s public product categories. | Public Profile / organization page | The two displayed categories follow the saved order. |

**Postconditions:**

* Restore the full original category order and reopen category management to verify it.


### SPT-5382: Dashboard - Products - Reject a blank category name when renaming

**Title:** Dashboard - Products - Reject a blank category name when renaming

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js.

Given an existing category, verify an empty name cannot replace its saved name. Run on legacy Marketplace and the Next.js product list. The organization-scoped `enable_products_nextjs_embed` flag selects the version at the legacy entry: off or absent = legacy; on = Next.js embed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has **Manage Marketplace** permission in an organization on the Standard or Premium plan.
* Select a category and record its current name and associated products.

**Tags:** dashboard, products, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the category’s name editor. | Legacy: Edit Categories → Edit; Next.js: Manage categories → Edit category | The current name appears. |
| Clear the name and attempt to save. | Empty Category Name | Required-field validation prevents saving the blank name. |
| Leave without saving and reopen the category. | Same category | The original name and associated products are unchanged. |

**Postconditions:**

* No category changes remain.


## Marketplace / Products → Product → Inventory


### SPT-5383: Dashboard - Products - Reject invalid product and variant values

**Title:** Dashboard - Products - Reject invalid product and variant values

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js.

Verify the product editor prevents an incomplete or invalid product from replacing saved information. Run on both legacy and Next.js editing. In Next.js, BlankProductName is checked on Details; variant checks are on Inventory. Creation is a separate starter-form scenario.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has **Manage Marketplace** permission in an organization on the Standard or Premium plan.
* At the legacy entry, the organization-scoped `enable_products_nextjs_embed` flag off/absent selects legacy; on selects Next.js.
* Select a private product with no sales or active carts and a variant saved at Inventory 5, Purchase Limit 2 and Price 10. Both product and variant names must be nonempty. Record the original values. Begin each Check run from the saved form; leave every field other than the selected invalid field unchanged.

**Tags:** dashboard, products, edge-case

**Parameters:**

Check: BlankProductName, BlankVariantName, NegativeInventory, ZeroPurchaseLimit, LimitAboveInventory

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the relevant editing page. | Next.js: Details for BlankProductName, Inventory for the variant checks; legacy: product edit form | The original saved values appear without validation errors. |
| Change only the selected Check field. | BlankProductName = empty product name; BlankVariantName = empty variant name; NegativeInventory = -1; ZeroPurchaseLimit = 0; LimitAboveInventory = 6 with inventory 5 | The selected invalid value is visible or rejected by the field. |
| Attempt to save the affected page. | Legacy: Save & Finish; Next.js: Save. Selected Check | Validation prevents saving; the invalid product does not replace the saved product. |
| Leave without saving and reopen the product. | Same product | Its original saved values remain. |

**Postconditions:**

* No product changes remain.


## Marketplace / Products → Product → Stats & Info


### SPT-970: Dashboard - Products - View product sales totals

**Title:** Dashboard - Products - View product sales totals

**Description:**

Start at Dashboard → Build → Products → All products. Compare lifetime quantity and organizer gross revenue with known completed sales. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with completed sales for at least two variants. Record each included quantity and organizer gross amount, and calculate expected lifetime totals. Do not substitute the customer’s fee-inclusive total.

**Tags:** dashboard, products, reports

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open View product stats for the selected product. | Legacy: Stats | The correct product’s Stats & Info page opens. |
| Inspect quantity, gross revenue and variant breakdown without date filters. | Recorded independent totals | Each variant and the combined totals match the recorded sales. |
| Inspect the sales timeline. | Recorded sale dates | The timeline represents the recorded sales; no date filter is active. |

**Postconditions:**

* No sales or product data changes.

## Marketplace / Products → Create and edit products

**Published refinement of SPT-4880:** the original case mixed creation, content editing, two variants, unsold editing and sold-price protection. Its Next.js form assumptions and legacy save destination were corrected. SPT-4880 now covers creation; SPT-5387–5389 retain content, variant-edit/order and sold-price assertions in focused cases. SPT-5390 adds starter validation. The complete split was approved and published together; no original responsibility was dropped.

### SPT-4880: Dashboard - Products - Create a product

**Title:** Dashboard - Products - Create a product

**Description:**

Start at **Dashboard → Manage → Marketplace** for legacy, or **Dashboard → Build → Products → All products** for Next.js. Verify one product and its first variant are created once, remain private until a sales surface is enabled, and retain their entered values. For the legacy entry, the organization-scoped `enable_products_nextjs_embed` flag off/absent selects legacy; on selects Next.js. Legacy offers the full form and Save & Finish; Next.js initially shows only Product Name, Category, Variant Name, Price and Create product. Additional content and variants are configured after creation.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Have an existing product category. Use a unique product name of no more than 50 characters, a variant named Small, and price 10.00 in the organization’s currency. Product creation is approved for the selected organization; keep every sales surface off.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open product creation. | Legacy: New Product; Next.js: Create product | The form for the selected version appears with the expected fields and save control. |
| Enter the product name, category and first variant. | Prepared unique name; recorded category; Small; price 10.00. Legacy: Inventory 5 and Purchase Limit 2. Next.js starter has no Inventory, Purchase Limit or SKU fields. | The entered values are shown and no required field is missing. |
| Select the creation save control once and wait. | Legacy: Save & Finish; Next.js: Create product | A success message appears. Legacy returns to Marketplace; Next.js opens the saved product’s Details page. |
| Return to the product list, find the unique name and reopen its Details and Inventory. | Same product | Exactly one product exists with one Small variant at 10.00 and the selected category; legacy also retains Inventory 5 and Purchase Limit 2. |
| Inspect its sales visibility controls without changing them. | Legacy: Visibility; Next.js: Availability | Venue Page, Staff Box Office, event add-ons and membership add-ons where enabled remain off. |

**Postconditions:**

* Retain the uniquely named private product for review. No purchase is made. Do not delete records as routine cleanup.

### SPT-5387: Dashboard - Products - Edit product details

**Title:** Dashboard - Products - Edit product details

**Description:**

Start at Dashboard → Build → Products → All products. Save the name, category, description and image on Details, then reopen them. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product with no sales or active carts. Record its name, category, description, image, variants and other settings. Have a second category and a 1080×1080 JPG/PNG no larger than 3MB.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the product’s Details. | Legacy: Product Info | The saved name, category, description and image appear. |
| Change the details and select Save. | A unique name within 50 characters; second category; description QA product description; prepared image | The changed details save successfully. |
| Leave the product and reopen Details. | Same product | All four edited values persist. |
| Compare Inventory, Communications, Availability, Fulfillment and Finance with their recorded values. | Original values | The Details save did not change other settings. |

**Postconditions:**

* Restore the original details, save and reopen them to verify restoration.

### SPT-5388: Dashboard - Products - Edit a product variant

**Title:** Dashboard - Products - Edit a product variant

**Description:**

Start at Dashboard → Build → Products → All products. Edit one existing unsold variant and verify its saved values. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product with two unsold variants and no active carts. Record the first variant’s name, SKU, Price, Inventory and Purchase Limit; record the other variant and product settings for comparison.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the product’s Inventory. | Selected unsold variant | Its saved values appear. |
| Edit the selected variant. | Name Small QA; SKU QA-SMALL; Price 12.00; Inventory 8; Purchase Limit 3 | The edited values appear without validation errors. |
| Select Save and reopen Inventory. | Same product | The selected variant retains every edited value. |
| Compare the other variant and product settings with the recorded values. | Original values | No other variant or product setting changed. |

**Postconditions:**

* Restore only the edited variant’s original values, save and reopen to verify restoration.

### SPT-5389: Dashboard - Products - Keep sold variant prices locked

**Title:** Dashboard - Products - Keep sold variant prices locked

**Description:**

Start at Dashboard → Build → Products → All products. Verify a sold variant’s Price is disabled when tiered pricing is disabled. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with a completed sale for one variant. The organization has tiered pricing disabled (price_tiers_enabled=false). Record its price and Sold quantity.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Inventory for the sold variant. | Selected sold variant | Its saved price and Sold quantity appear. |
| Inspect and attempt to focus Price for editing without changing its value. | Recorded price | Price is disabled; legacy explains that sales prevent pricing changes. |
| Leave and reopen Inventory. | Same product | Price and Sold quantity remain unchanged. |

**Postconditions:**

* No product or sale changes are made.

### SPT-5390: Dashboard - Products - Reject incomplete or invalid starter creation

**Title:** Dashboard - Products - Reject incomplete or invalid starter creation

**Description:**

Start at **Dashboard → Build → Products → Create product**, or the legacy New Product entry with Next.js embedding enabled. Verify the Next.js starter form rejects the selected invalid field without creating a product. Only one field is invalid in each Check run; legacy creation has a different form.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* For the legacy entry, enable `enable_products_nextjs_embed` for the organization. Have an existing category and a unique product name within 50 characters.
* Start each run from an unsaved starter form with Product Name set to the unique name, Category selected, Variant Name Small and Price 10.00. No product creation is authorized by this negative test; stop after validation.

**Tags:** dashboard, products

**Parameters:**

Check: BlankName, BlankCategory, BlankVariant, BlankPrice, NegativePrice, PriceTooLarge

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Create product and prepare the starting values. | Product Name, Category, Variant Name, Price | The four starter fields and Create product control are shown. |
| Change only the selected field and attempt Create product. | BlankName = empty Product Name; BlankCategory = no Category; BlankVariant = empty Variant Name; BlankPrice = empty Price; NegativePrice = -1; PriceTooLarge = 100000000 | Required, negative-price or eight-digit-limit validation prevents creation for the selected Check. |
| Leave without saving, return to All products and search the prepared unique name. | Prepared unique name | No product with that name exists. |

**Postconditions:**

* Clear the search. No product is created.

## Additional single-goal cases

These cases were published after the renewed review and explicit scope approval. The original local labels are retained in the latest publication record; every case heading uses its real Qase ID.

### SPT-4060: Dashboard - Products - Set Venue Page visibility

**Title:** Dashboard - Products - Set Venue Page visibility

**Description:**

Start at Dashboard → Build → Products → All products. Change Venue Page visibility for one product and verify its public listing. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with an available variant and a category. Record its current Venue Page visibility and its public category address. The visibility change is approved for this product.

**Tags:** dashboard, products

**Parameters:**

Visibility: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Availability and select Visible on Your Venue Page for the selected Visibility run. | On = enabled; Off = disabled | The selected value appears. |
| Select Save and reopen Availability. | Selected Visibility | The value persists. |
| Open the public category in a separate customer session. | Selected product | On shows the product; Off hides it from that public listing. |

**Postconditions:**

* Restore the original visibility and verify the saved value.

### SPT-4881: Dashboard - Products - Save product delivery settings

**Title:** Dashboard - Products - Save product delivery settings

**Description:**

Start at Dashboard → Build → Products → All products. Save a supported delivery setup and its shipping charges. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Product shipping is enabled for the organization (allow_shipping=true). Select a private product with no sales or active carts and record delivery, shipping cost and fee method.

**Tags:** dashboard, products

**Parameters:**

Delivery: Electronic, Shipping

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Fulfillment and review Product Delivery Method(s). | Selected product | Electronic Ticket, Standard Shipping and Will Call/Pick Up are available; shipping fields appear only for Standard Shipping. |
| Choose the selected Delivery setup. | Electronic = select Electronic Ticket, then clear other methods; Shipping = select Standard Shipping, then clear other methods and enter Shipping Cost 5.00 with Fee Method Flat rate | The selected delivery fields appear without validation errors. |
| Select Save, leave and reopen Fulfillment. | Selected Delivery | Delivery methods persist; Shipping also retains 5.00 and Flat rate. |

**Postconditions:**

* Restore the original delivery values, save and reopen to verify restoration.

### SPT-5391: Dashboard - Products - Add a product variant

**Title:** Dashboard - Products - Add a product variant

**Description:**

Start at Dashboard → Build → Products → All products. Add one variant to an existing product and verify it is saved once. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product with one unsold variant and no active carts. Record the existing variant and product settings; adding a second unsold variant is approved.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Inventory and select Add variant. | Legacy: Add New Product Type | One new row appears. |
| Enter its values and select Save. | Name Large QA; SKU QA-LARGE; Price 15.00; Inventory 5; Purchase Limit 2 | The new variant saves successfully. |
| Leave and reopen Inventory. | Same product | The new variant appears exactly once with the entered values; the original variant and other settings are unchanged. |

**Postconditions:**

* Retain the added variant on the private product for review; do not delete it as routine cleanup.

### SPT-5392: Dashboard - Products - Reorder product variants

**Title:** Dashboard - Products - Reorder product variants

**Description:**

Start at Dashboard → Build → Products → All products. Change the order of existing variants and verify their saved order. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product with two saved variants. Record their original order and all values; ordering changes are approved.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Inventory and move the second variant above the first with its reorder handle. | Two existing variants | The rows appear in the new order. |
| Select Save and reopen Inventory. | Same product | The new order persists and variant values are unchanged. |

**Postconditions:**

* Restore the original order, save and reopen to verify restoration.

### SPT-5393: Dashboard - Products - Save the customer message

**Title:** Dashboard - Products - Save the customer message

**Description:**

Start at Dashboard → Build → Products → All products. Save Display & Email Message in Communications and reopen it. This verifies configuration, not email delivery. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product; record its original message and other product values.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Communications. | Legacy: Product Info → Display & Email Message | The saved message appears. |
| Replace the message and select Save. | Keep this receipt for pickup. | The message saves successfully. |
| Leave and reopen Communications. | Same product | The message persists and other product values are unchanged. |

**Postconditions:**

* Restore the original message, save and reopen it.

### SPT-5394: Dashboard - Products - Change product status

**Title:** Dashboard - Products - Change product status

**Description:**

Start at Dashboard → Build → Products → All products. Save Product status on Availability and verify the selected status, its variants and list visibility. Run on Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Use a private product with no sales or active carts because restoring a product publishes all its variants. Record all original product/variant statuses and values. For Archived, begin with Published; for Published, begin with Archived.

**Tags:** dashboard, products

**Parameters:**

Status: Archived, Published

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Availability and choose the selected Status. | Product status: selected Status | The selected status appears before saving. |
| Select Save and reopen Availability and Inventory. | Same product | The saved status persists; archiving archives its variants, and restoring publishes its variants. |
| Return to All products and inspect the default list and Include archived products. | Same product | Archived appears only when archived products are included, with its Archived label; Published appears in the default list. |

**Postconditions:**

* Restore the product’s recorded status first, then restore each variant’s recorded status and verify all values. Keep all public sales switches off.

### SPT-5395: Dashboard - Products - Change variant status

**Title:** Dashboard - Products - Change variant status

**Description:**

Start at Dashboard → Build → Products → All products. Save one variant’s Published or Archived status without changing the other variant. Run on Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private published product with two unsold variants and no active carts. Record their statuses and values. Start the selected variant in the opposite state from Status.

**Tags:** dashboard, products

**Parameters:**

Status: Archived, Published

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Inventory and change the selected variant’s Status. | Selected Status | Only the selected row changes. |
| Select Save and reopen Inventory. | Same product | The selected status persists; the other variant and all prices/stock values remain unchanged. |

**Postconditions:**

* Restore the original variant status, save and reopen.

### SPT-5396: Dashboard - Products - Delete an unsold variant

**Title:** Dashboard - Products - Delete an unsold variant

**Description:**

Start at Dashboard → Build → Products → All products. Remove one unsold variant while keeping the other saved variant. Run on Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Use a private product with two variants. The variant approved for deletion has never been added to a cart or purchased and has no price lock, so historical cart/order references cannot prevent this removal. Record the surviving variant’s values.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Inventory and choose Variant actions for the approved variant. | Approved variant | Delete variant is available. |
| Select Delete variant, then Save. | Approved variant only | The variant is removed successfully. |
| Reopen Inventory. | Same product | The removed variant is absent; the surviving variant and its values remain. |

**Postconditions:**

* Verify the approved removal only. Do not recreate or delete other records.

### SPT-5397: Dashboard - Products - Prevent deletion of protected variants

**Title:** Dashboard - Products - Prevent deletion of protected variants

**Description:**

Start at Dashboard → Build → Products → All products. Verify Delete variant is disabled for the selected protected starting state. Run on Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* For LastRemaining, select a product with exactly one unsold variant. For Sold, select a product with at least two variants and a completed sale on the selected variant. No purchase is part of this test.

**Tags:** dashboard, products

**Parameters:**

Protection: LastRemaining, Sold

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Inventory and the selected variant’s Variant actions. | Selected Protection | Delete variant is disabled. |
| Close the menu and reopen Inventory. | Same product | The protected variant and its values remain unchanged. |

**Postconditions:**

* No variant or sale changes are made.

### SPT-5398: Dashboard - Products - Reorder products within a category

**Title:** Dashboard - Products - Reorder products within a category

**Description:**

Start at Dashboard → Build → Products → All products. Save the order of existing products within one category. Run on Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a category with two private products whose order may change. Record the original full order; do not change category order.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage categories and the selected category’s product-order section. | Manage associated products | Its products appear; load all products before ordering if Load more products is offered. |
| Move the second selected product above the first and select Save changes. | Two selected products | The product order saves. |
| Close and reopen the category’s product-order section. | Same category | The changed product order persists without changing product values or category order. |

**Postconditions:**

* Restore the original product order, save and reopen.

### SPT-5399: Dashboard - Products - Show an empty product catalog

**Title:** Dashboard - Products - Show an empty product catalog

**Description:**

Start at Dashboard → Build → Products → All products. Verify the initial empty organization catalog offers the base creation controls. Run on Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Use an organization with no products, including archived products. Do not delete products to prepare this state.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open All products with filters cleared. | Empty organization catalog | No products found appears with the explanation to create products and variants. |
| Inspect the page actions. | Empty catalog | Create product and Manage categories remain available. |

**Postconditions:**

* No product or category changes are made.

### SPT-5400: Dashboard - Products - Save product sale notification recipients

**Title:** Dashboard - Products - Save product sale notification recipients

**Description:**

Start at Dashboard → Build → Products → All products. Save the employees selected for Product Sale Notifications. This verifies the recipient configuration, not notification delivery. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product. Record its existing recipients and other settings; choose one active employee not currently selected.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Communications and Product Sale Notifications. | Legacy: Visibility → Product Sale Notifications | The current recipients appear. |
| Select the recorded additional employee and save. | Employee selected by name | The selection saves. |
| Leave and reopen Communications. | Same product | The original recipients and additional employee are selected; other product settings are unchanged. |

**Postconditions:**

* Restore the original recipients, save and reopen.

### SPT-5401: Dashboard - Products - Save the purchase confirmation PDF setting

**Title:** Dashboard - Products - Save the purchase confirmation PDF setting

**Description:**

Start at Dashboard → Build → Products → All products. Save Exclude PDF in Purchase Confirmation Email on Fulfillment. This verifies configuration; actual email attachments require the existing purchase-email case.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product and record its original PDF exclusion setting.

**Tags:** dashboard, products

**Parameters:**

Exclusion: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Fulfillment and change Exclude PDF in Purchase Confirmation Email to the selected Exclusion. | On = checked; Off = unchecked | The selected checkbox state appears. |
| Select Save and reopen Fulfillment. | Same product | The selected state persists. |

**Postconditions:**

* Restore the original checkbox state, save and reopen.

### SPT-5402: Dashboard - Products - Restrict product financial settings

**Title:** Dashboard - Products - Restrict product financial settings

**Description:**

Start at Dashboard → Build → Products → All products. Verify an employee without Manage Transactions cannot edit product financial settings.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Use an existing employee without Manage Transactions permission (manage_financials), not an administrator or unrestricted owner. Record an existing product’s Finance address.

**Tags:** dashboard, products, employee-permissions

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as that employee and open the product’s Finance page. | Recorded management address | A financial-access warning appears and financial edit controls are unavailable. |
| Inspect the page actions without saving. | Same employee | No usable financial save controls are offered. |

**Postconditions:**

* No permissions or financial data change.

### SPT-5403: Dashboard - Products - Save product financial settings

**Title:** Dashboard - Products - Save product financial settings

**Description:**

Start at Dashboard → Build → Products → All products. Save service-fee choices and seller commissions on Finance. This verifies configuration; fee calculations are proved by existing checkout cases.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* The employee also has Manage Transactions permission (manage_financials). Select a private product with no sales or active carts. Record both fee choices and cash/credit commission amounts.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Finance and review the fields. | Processing Fee Settings; Showpass Fee Settings; Seller Commission Cash Sales and Credit Sales | Saved values and organization-default hints appear. |
| Enter the selected financial settings and Save. | Absorb Processing Fee; Customer Pays Showpass Fee; Cash commission 1.00; Credit commission 2.00 | The settings save successfully. |
| Leave and reopen Finance. | Same product | Both fee choices and both commission amounts persist. |

**Postconditions:**

* Restore the original financial settings, save and reopen.

### SPT-5404: Dashboard - Products - Reject an invalid product image

**Title:** Dashboard - Products - Reject an invalid product image

**Description:**

Start at Dashboard → Build → Products → All products. Verify a new invalid image cannot replace the current product image.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with an image and record it. Prepare the selected Image check: TooLarge = JPG/PNG larger than 3MB; TooSmall = 50×50 PNG; TooWide = 2001×1000 PNG.

**Tags:** dashboard, products, edge-case

**Parameters:**

Image: TooLarge, TooSmall, TooWide

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Details and choose the prepared file in Product Image. | Selected Image | The corresponding size/dimension error appears and the invalid file is not accepted. |
| Leave without saving and reopen Details. | Same product | The original saved image remains. |

**Postconditions:**

* No image or product data changes remain.

### SPT-5405: Dashboard - Products - Leave product details without saving

**Title:** Dashboard - Products - Leave product details without saving

**Description:**

Start at Dashboard → Build → Products → All products. Verify leaving Details without saving does not change the saved product name.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product and record its current name.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Details and change Product Name without selecting Save. | Original name plus Unsaved, within 50 characters | The edited name appears only in the form. |
| Use Back to leave; choose to leave without saving if a prompt appears. | Do not select Save | All products opens. |
| Reopen the same product’s Details. | Same product | The original saved name appears. |

**Postconditions:**

* No saved product changes remain.

### SPT-5406: Dashboard - Products - Filter product sales by date

**Title:** Dashboard - Products - Filter product sales by date

**Description:**

Start at Dashboard → Build → Products → All products. Compare product statistics for the selected date range with independently recorded sales. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with completed sales on two different days. Record sale times, variants, quantities and organizer gross revenue. For SalesDay choose a range containing one day but not the other; for EmptyDay choose a day with no sales. Record expected totals. Avoid midnight-boundary records for this base case.

**Tags:** dashboard, products, reports

**Parameters:**

Range: SalesDay, EmptyDay

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the product’s Stats & Info and set both dates for the selected Range. | Recorded selected range | The dates are applied. |
| Compare quantity, gross revenue, timeline and variant breakdown. | Independent selected-range totals | SalesDay matches only its included sales; EmptyDay shows zero quantity/revenue and no stale sales points. |

**Postconditions:**

* No sales data changes. Record browser/organization timezones; repeat the range in a different browser timezone as a selected regression.

### SPT-5407: Dashboard - Products - Open a product from its public name link

**Title:** Dashboard - Products - Open a product from its public name link

**Description:**

Start at Dashboard → Build → Products → All products. Verify a product-name link opens the correct public organization category. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with Venue Page visibility on, a category and an available variant. Record the product, organization and category.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the product’s name on All products. | Selected card | Its public category opens for the recorded organization. |
| Inspect the public product shown. | Recorded product | Next.js identifies the selected product. Legacy may open the category without preselecting it; the recorded product is available in that category. |

**Postconditions:**

* No cart or order is created.

### SPT-5408: Dashboard - Products - Show no results for an unmatched product search

**Title:** Dashboard - Products - Show no results for an unmatched product search

**Description:**

Start at Dashboard → Build → Products → All products. Search for a value that matches no product, variant or SKU. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Use an organization containing products. Choose a search string verified not to occur in any product, variant or SKU.

**Tags:** dashboard, products, search-filters

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Enter the unmatched search and wait for loading to finish. | Recorded unmatched string | No products found appears and no previous cards remain. |
| Clear the search. | Empty search | The original product list returns. |

**Postconditions:**

* Leave search empty; no product data changes.

### SPT-5409: Dashboard - Products - Set event checkout product eligibility

**Title:** Dashboard - Products - Set event checkout product eligibility

**Description:**

Start at Dashboard → Build → Products → All products. Save an event add-on rule and verify it against eligible and ineligible event checkout entry points. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with available stock and two events that may use it. Record existing rules. For IncludeSpecific select one event/ticket scope and use the other as a negative control; for ExcludeSpecific select one excluded scope; for AllowAll use both. Record the selected event/ticket names.

**Tags:** dashboard, products

**Parameters:**

Rule: IncludeSpecific, ExcludeSpecific, AllowAll

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Availability, enable Add to event checkout process and choose Rule. | IncludeSpecific = Include for certain items; ExcludeSpecific = Exclude for certain items; AllowAll = Include for all items. Select the recorded scope where required. | The selected rule and any event/ticket choices appear. |
| Select Save and reopen Availability. | Recorded rule/scope | The rule and selections persist. |
| Open both recorded event checkout add-on selections without completing checkout. | Selected and control event/ticket scopes | The product appears only in scopes allowed by the selected rule. |

**Postconditions:**

* Restore the original rules, save and reopen. Release any carts created for inspection; do not purchase.

### SPT-5410: Dashboard - Products - Set membership checkout product eligibility

**Title:** Dashboard - Products - Set membership checkout product eligibility

**Description:**

Start at Dashboard → Build → Products → All products. Save a membership add-on rule and inspect the allowed membership checkout entry points. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* The organization has the Memberships module and show_membership_product_addons enabled. Select a product with stock and two membership groups/levels that may use it; record the original rules and both membership scopes. For IncludeSpecific select one allowed scope; for ExcludeSpecific select one excluded scope; AllowAll covers both.

**Tags:** dashboard, products

**Parameters:**

Rule: IncludeSpecific, ExcludeSpecific, AllowAll

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Availability, enable membership add-ons and choose Rule and any required group/level selections. | IncludeSpecific = Include for certain items; ExcludeSpecific = Exclude for certain items; AllowAll = Include for all items | The selected rule and scope appear. |
| Save and reopen Availability. | Recorded membership scope | The rule and choices persist. |
| Inspect add-on selection for the selected and control membership scopes without purchasing. | Two recorded groups/levels | The product appears only where the saved rule permits it. |

**Postconditions:**

* Restore the original membership rules and verify them. Release any inspection carts; do not purchase.

### SPT-5411: Dashboard - Products - Set Staff Box Office product visibility

**Title:** Dashboard - Products - Set Staff Box Office product visibility

**Description:**

Start at Dashboard → Build → Products → All products. Save Staff Box Office visibility and inspect the employee’s product list. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebBoxOffice | Desktop |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a product with stock and record its original Staff Box Office visibility. Have an employee who can access the Staff Box Office product list.

**Tags:** dashboard, products

**Parameters:**

Visibility: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Availability and set Visible on Staff Box Office to Visibility, then Save. | On = enabled; Off = disabled | The selected value saves. |
| Reopen Availability, then inspect Staff Box Office products. | Same organization/product | The setting persists; On includes the product and Off hides it. |

**Postconditions:**

* Restore the original visibility and verify it. Do not sell a product.

### SPT-5412: Dashboard - Products - Reject a negative shipping cost

**Title:** Dashboard - Products - Reject a negative shipping cost

**Description:**

Start at Dashboard → Build → Products → All products. Verify a negative Shipping Cost cannot replace saved fulfillment settings. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* The organization has product shipping enabled (allow_shipping=true). Select a private product with Standard Shipping selected and a non-negative saved shipping cost. Record all delivery values.

**Tags:** dashboard, products, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Fulfillment and enter Shipping Cost -1 without changing other fields. | -1 | The invalid amount is shown or rejected by the field. |
| Attempt Save. | Negative Shipping Cost | Validation prevents saving the negative amount. |
| Leave and reopen Fulfillment. | Same product | Original delivery values remain. |

**Postconditions:**

* No saved delivery changes remain.

### SPT-5413: Dashboard - Products - Save product transfer availability

**Title:** Dashboard - Products - Save product transfer availability

**Description:**

Start at Dashboard → Build → Products → All products. Save the selected Allow Product Transfers value with Electronic Ticket delivery. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js. Use Save & Finish on legacy product forms.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Select a private product with Electronic Ticket delivery and editable transfer controls. Record its original transfer state.

**Tags:** dashboard, products

**Parameters:**

Transfers: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Fulfillment and set Allow Product Transfers to Transfers, then Save. | On = enabled; Off = disabled | The selected state saves. |
| Leave and reopen Fulfillment. | Same product | The selected transfer state persists and delivery settings are unchanged. |

**Postconditions:**

* Restore the original transfer state, save and reopen.

### SPT-5414: Dashboard - Products - Disable transfers without Electronic Ticket delivery

**Title:** Dashboard - Products - Disable transfers without Electronic Ticket delivery

**Description:**

Start at Dashboard → Build → Products → All products. Verify shipping-only products cannot enable transfers when delivery-ticket transfers are disabled. Run on Next.js and legacy Marketplace. On legacy, start at Dashboard → Manage → Marketplace and use the equivalent product section. The organization-scoped enable_products_nextjs_embed flag off/absent selects legacy at that entry, and on selects Next.js.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* Product shipping is enabled and allow_delivery_ticket_transfers=false for the organization. Use a product saved with Standard Shipping only and its original transfer state recorded.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Fulfillment and inspect Allow Product Transfers. | Standard Shipping only | The transfer switch is disabled/off and the Electronic Ticket requirement is shown. |
| Leave and reopen Fulfillment. | Same product | The saved shipping-only setup and disabled transfer control remain. |

**Postconditions:**

* No delivery, transfer or sale changes are made.


### SPT-5415: Dashboard - Products - Lock product financial settings after sales

**Title:** Dashboard - Products - Lock product financial settings after sales

**Description:**

Start at Dashboard → Build → Products → All products. Verify financial choices and seller commissions are disabled for a product with sales.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in an organization on the Standard or Premium plan.
* The employee also has Manage Transactions permission (manage_financials), so the restriction is caused by sales rather than missing access. Select a product with a completed sale and record its financial choices and commission amounts.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the sold product’s Finance page. | Recorded product | The sales-related financial-settings warning appears. |
| Inspect service-fee choices and seller commission fields without changing them. | Processing Fee Settings, Showpass Fee Settings, cash and credit commissions | The controls are disabled and show the recorded values. |

**Postconditions:**

* No product, fee or sale changes are made.

### SPT-5416: Dashboard - Products - Restrict Products on the Basic plan

**Title:** Dashboard - Products - Restrict Products on the Basic plan

**Description:**

Start at Dashboard → Build → Products. Verify the Basic plan cannot open product management, including direct entry.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Use an existing Basic-plan organization and an employee with Manage Marketplace permission. Do not downgrade an organization to prepare this case.
* Record the All products, Create product and existing product-edit management addresses from an authorized Standard/Premium context. These addresses are intentionally under test; do not prepare a product by bypassing the plan gate.

**Tags:** dashboard, products, employee-permissions

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard navigation in the Basic-plan organization. | Build → Products | Product-management choices are unavailable or disabled. |
| Open the recorded All products and Create product management addresses directly. | Basic-plan organization stays selected | The unavailable page appears; product list and creation controls do not open. |
| Open the recorded product-edit management address directly. | Same Basic-plan organization | No editable product form opens. |

**Postconditions:**

* No plan, permission or product data changes.


### SPT-5155: Dashboard - Products - Check starter variant defaults

**Title:** Dashboard - Products - Check starter variant defaults

**Description:**

Start at Dashboard → Build → Products → All products. Inspect the first variant of a product just created with the four-field Next.js starter form, before any Inventory edits.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in a Standard/Premium organization.
* Have a newly created private product entered with only Product Name, Category, Variant Name Small and Price 10.00. No Inventory, Purchase Limit, SKU or status has been edited. Creation must have been separately approved; this inspection does not create another product.

**Tags:** dashboard, products

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the product’s Inventory. | Untouched first variant | Exactly one Small variant appears at Price 10.00, Sold 0, Inventory 0, Purchase Limit 20, blank SKU and Published variant status. |
| Inspect the available setup action without saving. | Add variant | The row and Add variant control are visible; zero stock is not presented as an organization with no products. |

**Postconditions:**

* No product changes are made. Source defaults are not a passed execution result.


### SPT-5417: Dashboard - Products - Clear product list filters

**Title:** Dashboard - Products - Clear product list filters

**Description:**

Start at Dashboard → Build → Products → All products. Verify Clear filters resets the search and dropdown filters to the default product list.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Marketplace permission in a Standard/Premium organization.
* Use an organization with active and archived products, two categories and different Box Office visibility choices. Record active product names.

**Tags:** dashboard, products, search-filters

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Apply a search and non-default Category, Archived products and Box office visibility selections. | Selections that narrow the list | The filters show the selected values. |
| Select Clear filters. | Filter-sidebar clear control | Search is empty; Category shows All categories; Box office visibility shows All products; Archived products shows Hide archived products. |
| Inspect the resulting list. | Recorded active products | The default active catalog returns without the previous restrictions. |

**Postconditions:**

* Leave filters cleared; no product data changes.

## Current base-case coverage and split decisions

**Working rule:** a case has one user goal. Saving the fields of one form is one goal; adding, editing, reordering, archiving and deleting records are separate goals. Retention of unrelated values is a regression assertion after that save, rather than a second workflow in the title. The initial review was read-only; the subsequent approved publication is recorded below.

| Owning screen | Base goals and definitions | Current state |
| --- | --- | --- |
| All products | Search SPT-5376; unmatched search SPT-5408; empty catalog SPT-5399; pagination SPT-5377; card figures SPT-5378; copy link SPT-5379; public name link SPT-5407; filters SPT-5386; reset SPT-5417 | Published retained definitions and completed splits/additions; saves not executed |
| Access | Manage Marketplace SPT-5384; organization separation SPT-5385; Basic plan SPT-5416 | Definitions available; no accounts/plans changed or tested |
| Categories | Create SPT-969; rename SPT-5380; category order SPT-5381; required name SPT-5382; product order SPT-5398; assignment in Details SPT-5387 | Distinct category-order and product-order goals now defined |
| Create product | Clean success SPT-4880; starter validation SPT-5390; untouched starter defaults SPT-5155 | Existing publication retained; defaults wording clarified locally |
| Details | Edit SPT-5387; invalid fields SPT-5383; invalid image SPT-5404; leave without Save SPT-5405 | Communications removed from Details test |
| Inventory | Add SPT-5391; edit SPT-5388; reorder SPT-5392; status SPT-5395; unsold deletion SPT-5396; deletion guards SPT-5397; invalid edits SPT-5383; sold-price lock SPT-5389 | Add/edit/reorder are separate; no row or stock values changed live |
| Availability | Venue Page SPT-4060; Box Office SPT-5411; event rules SPT-5409; membership rules SPT-5410; product status SPT-5394 | Original surfaces/rules retained in separate single-goal cases; conditional membership gate stated |
| Fulfillment | Delivery SPT-4881; negative shipping SPT-5412; transfer setting SPT-5413; shipping-only transfer restriction SPT-5414; PDF setting SPT-5401 | Different controls/outcomes separated |
| Communications | Customer message SPT-5393; sale recipients SPT-5400 | Separate goals; message/recipient configuration is not proof of email delivery |
| Finance | Configuration SPT-5403; missing permission SPT-5402; sold-product lock SPT-5415 | Form fields/permission names verified; calculations remain in existing fee cases |
| Custom fees / variant internal fees | SPT-968 and SPT-3197 retain fee setup and checkout applicability assertions | Existing full definitions reviewed; not run or rewritten here; exact control-level wording remains a readability follow-up |
| Stats & Info | Lifetime SPT-970; date range SPT-5406 (sales day / empty day) | One statistics query goal per case; independent quantity/revenue data required |
| Customer refunds | Existing SPT-5253 and SPT-5255 cover product-level setting retention/defaults, subject to rollout | Reuse existing definitions rather than duplicate; rollout controls absent in inspected organization |
| Conditional integrations | Workday product/variant settings when workday_integration_enabled | Not applicable to inspected organization; source gate exists; no configured organization was examined |
| Promote → Discounts / Packages | Both demo destinations say “This page is still under development.” | Not applicable for runnable configuration cases on these Next.js screens; do not invent discounts/packages controls |

**Preservation map — complete split published together:**

| Existing Qase case | Published single goal | Assertions transferred, not removed |
| --- | --- | --- |
| SPT-5388 | Edit a product variant | Add → SPT-5391; reorder → SPT-5392; unchanged other values remain regression assertions |
| SPT-5387 | Edit product details | Display & Email Message → SPT-5393; name/category/description/image and saved assignment retained |
| SPT-5389 | Keep sold variant prices locked | Next.js sold-variant delete guard → SPT-5397; price lock retained |
| SPT-5379 | Copy a public product link | Product-name navigation → SPT-5407; copied-link target proof retained |
| SPT-5376 | Search for a product | Unmatched search → SPT-5408; name/variant/SKU and clearing search retained |
| SPT-969 | Create a product category | Product assignment → SPT-5387; long-name/readability/creation persistence retained |
| SPT-970 | View product sales totals | Date filtering and empty-day outcome → SPT-5406; lifetime, timeline and variant figures retained |
| SPT-4060 | Set Venue Page visibility | Staff Box Office → SPT-5411; event rules → SPT-5409; membership rules → SPT-5410; recipients → SPT-5400; transfers → SPT-5413/SPT-5414. Every original visibility row has a matching run |
| SPT-4881 | Save product delivery settings | Negative shipping cost → SPT-5412; transfer restriction → SPT-5414; transfer state → SPT-5413. Electronic/shipping settings and persistence retained |
| SPT-5155 | Check starter variant defaults | Private-until-enabled intent remains in SPT-4880 and SPT-4060; zero starting inventory clarified as one variant, not no variants |
| SPT-5386 | Filter the product list | Clear/reset proof → SPT-5417; filter intersection checks retained |
| SPT-4880 | Create a product | Title-only clarification; all setup and assertions retained |
| SPT-5378 | Show product stock totals | Corrected version-specific proof: legacy remaining/count assertions retained; Next.js checks its rendered Sold / total, not the unrendered subtitle |

The user approved the exact 40-operation scope after the complete split and dry-run preview. Every revised case and transferred assertion was published together; earlier publication/folder approvals were not reused as authorization for this scope. SPT-5121 remains an undeleted duplicate candidate, with its useful validation represented by SPT-5382/5383/5390.

**The base audit still has named limits:**

* **Zero Inventory / Purchase Limit: unresolved expected behavior.** Inventory accepts a minimum of 0, while Purchase Limit requires at least 1 and cannot exceed Inventory. Clearing an existing Purchase Limit serializes null, while the model field is non-nullable. No source-supported ordinary edit combination for zero stock has been established. Do not claim zero-stock editing is covered by a card whose remaining stock is zero after sales.
* **Blank Inventory: unresolved product contract.** The current record adapter deletes Inventory from the request when the input is blank. For new variants the backend default is 0; for existing variants the saved value is preserved. This is different from an existing backend-null uncapped record, which the card displays as Unlimited. SPT-5378 tests that existing display state; it does not prove clearing a cap creates unlimited stock. No live save was submitted and no application defect is confirmed.
* **Native product deletion:** no Delete product control was established on the inspected Next.js pages. The backend protects deletion when sales exist; do not invent a manual step or delete via API for this page review.
* **Further edges, not base-case completion claims:** concurrent edits, network/save failure and retry, double submit, partial category-save failure, image removal/extra file types, maximum text lengths, advanced fee inheritance combinations, midnight/DST statistics, actual notifications/PDF attachments, checkout/fulfillment/refund lifecycle and tiered-price-enabled sold edits need their own execution or deeper review.

**Result:** this pass identifies the base definitions and their independent goals; it does not establish that every scenario is executable on the current organization or that production is ready. New and revised definitions are published and verified, but remain unexecuted. The two inventory-contract questions above remain unresolved.

> [!info]- Query completeness, source evidence and browser limits
> **Qase retrieval:** SPT, completed 2026-10-15 21:22:37 UTC (14:22 PDT). One complete project snapshot: **1,839 entities / 1,839 unique IDs**, 19 pages, unchanged API total throughout. Cache: `/private/tmp/qase-inventory-cases-all.json`; validated page records: `/private/tmp/qase-inventory-cases-pages.jsonl`. Suite 109 readback: **Products**, parent 78, **9 cases**. Full fields reviewed for 968, 969, 970, 3197, 4060, 4880, 4881, 5121, 5155; linked 1660 was also checked and excluded as registration.
>
> **Local filtering:** case title, description, prerequisites, postconditions, parameters, nested steps and tags searched for `products?`, `marketplace`, `/dashboard/inventory`, `/manage/products`, product category and product variant terms: **317 broad matches**. Narrowed by management workflow and owning surface; full nearby definitions compared for 1209, 2177, 3137, 3280, 3284 and 4697. Public/Box Office/mobile search is not proof of Dashboard SKU search; generic category filtering is not proof of archived/Box office filter intersection. Broad hits were triaged locally, not all treated as management coverage. Snapshot completeness establishes search completeness at that time, not execution or perfect test semantics.
>
> **Source identity:** backend `2dc5cd3d89c31596e248dafe41c44503ac97aeee`; frontend `bce2f9f2b8f5941f4bf80f8f9473fa0fb1361fb4`. No PR/branch supplied for this inventory scope; no diff-based change claim. The earlier Playwright PR was registration context, not inventory acceptance evidence. No automation was executed.
>
> **Backend reviewed:** `web-app/apps/inventory/dashboard/views.py` and `urls.py` (version selection, entry guards, organization-bound detail lookups); `apps/inventory/api/venue_based/viewsets/products.py` and serializers (name/variant/SKU search, archived retrieval, management writes, scoped category choices, sold price rules); `apps/inventory/models/products.py` and `attributes.py` (category max length 256, stock/ordering); `apps/inventory/queries/product_statistics.py` (issued-item quantities versus included invoice gross revenue); `apps/venues/constants/employment.py` (Manage Marketplace); `apps/main/templates/dashboard/inventory/landing.html`, category/edit.html, products/_create-edit-form.html and inventory dialogs; `apps/main/static/src/dashboard/inventory/landing.js` and ProductStatsController.js. Existing test source in `apps/inventory/tests/presentation/test_dashboard.py` confirms intended embed gate/scope contracts; tests were read, not run.
>
> **Frontend reviewed:** `showpass-frontend/packages/core/src/app-contexts/dashboard/features/products/` catalog page/cards/filter controls, `useProductsListData`, `product-catalog-utils`, category manager/name editor, `ProductStatsPage`, `product-stats-utils`, pricing gate and product route configuration. `DashboardPaginatedList` confirms Next.js uses infinite scroll, while legacy has Load More Products. `components/navigation/DashboardNavBarUserMenu/hooks/route-sections/build-routes.ts` confirms Build → Products → All products and permission/Basic-plan navigation gates.
>
> **Version setup:** `enable_products_nextjs_embed` is an organization-aware feature flag, not the Manage Marketplace employee permission or a product visibility setting. At `/dashboard/inventory/`, missing/off renders Angular; on embeds `/manage/products/` and preserves incoming query parameters while setting legacy/header/sidebar display options. The embed flag was not changed. The pasted beta URL does not establish beta’s enabled flag; observed demo page was legacy. Direct modern routes also exist; do not assume flag state from a route name alone.
>
> **Stock discrepancy — Inconclusive, source only:** blank variant inventory means unlimited in the model/domain. Next.js explicitly displays Unlimited when any variant is uncapped. Legacy sums finite inventory and subtracts counted quantities without an unlimited branch. Do not call its displayed zero a confirmed production bug: no unlimited product was inspected or changed. Legacy-unlimited expected wording is Blocked pending a suitable record and product expectation; SPT-5378’s Unlimited run is Next.js only. Card “Sold” uses included quantities, which can include active stock commitments, whereas Stats uses issued items and invoice revenue; do not require the two counters to match during carts/holds.
>
> **Timezones:** legacy date inputs create browser-local start/end-of-day bounds; Next.js does likewise through shared formatting. Charts use UTC date labels. Backend statistics apply their own date comparisons to item and invoice timestamps. Midnight/DST behavior needs an independent expected calculation and a separate boundary run; SPT-970’s base range avoids that unresolved boundary.
>
> **Handbook selection:** [[00 Start Here/Showpass QA Handbook/Playbooks/10 Products Variants and Stock]] supplied distinct-variant setup, finite versus unlimited stock, independent stock/money evidence and safe restoration. Its purchase, fulfillment and concurrency recipes were kept outside this page-focused execution scope. Applied the canonical standard and [[05 Tooling/Qase Test Case Writing Rules]]; no handbook assertion overrides current source.
>
> **Executed non-saving browser checks, demo only:** observed Manage → Marketplace, New Product / New Category / Edit Categories, seven product cards, stock/variant/sold figures, Edit / Stats / Copy Link. Searched “FAN EXPO Bag” and observed only its card after loading. Searched “InventoryNoMatch20261015” and observed No products found. Cleared search and observed all seven original cards again. Opened New Category, observed Category Name / Close / Save, then closed without saving. No form submission, clipboard action, purchase, category/product edit or organization/flag switch was executed. Product values were seen, not independently reconciled; no stock/statistics pass is claimed.
>
> **Final browser state after the initial pass:** original organization and inventory route retained, search empty, category form closed. Evidence below shows the list; the navigation drawer was used only to establish the visible hierarchy. Mobile layout and Next.js were not executed. No end-to-end defects were confirmed.
>
> ![[03 Test Cases/Products/evidence/inventory-list-2026-10-15.png]]

> [!info]- Create/edit follow-up — source comparison and non-saving inspection
> **Coverage correction:** the initial pass retained SPT-4880 as a broad definition; that was insufficient to call current create/edit coverage complete. Detailed comparison found two definition mismatches: Next.js creation is a four-field starter, and the legacy save redirects to Marketplace rather than the saved detail page. These are test-definition discrepancies, not confirmed application defects.
>
> **Additional source reviewed at the same revisions:** `ProductCreatePage`, `ProductBasicInfoPage`, `ProductInventoryPage`, `ProductEditFormPage`, `ProductForm`, `useProductFormFields`, `ProductInventorySection`, `ProductVariantRowActions`, `ProductCommunicationsSection`, `product-form-types`, `product-form-utils` and `product-record-utils` under the frontend products feature. Backend `ProductConfigurationService.update` is atomic, preserves unsubmitted sections, validates price locks and synchronizes the submitted variants. `EnablePriceChangesMixin` permits changes when a price is not locked or the organization enables tiered pricing. Read related form-test source for starter validation/private defaults; no repository tests were executed.
>
> **Controls accounted for:** first creation fields/save → updated SPT-4880 and SPT-5390; name/category/description/image and customer-message edit → SPT-5387; variant name/SKU/Inventory/Purchase Limit/Price/add/order and retention of other sections → SPT-5388; locked price and Next.js sold-variant delete guard → SPT-5389; invalid edits → SPT-5383. Visibility, notification recipients, delivery/transfers and fees retain SPT-4060/4881/968/3197 responsibilities. First-time private/default intent in SPT-5155 is preserved; do not create a second equivalent private-default case instead of using the same assertion during the starter run.
>
> **Still deferred:** save/reopen and section-preservation execution; image rejection boundaries/removal; variant removal/archive/unarchive (including the last-row restriction); product deletion and protected sales; unsaved-change discard; zero/blank/unlimited stock edit persistence; field-length boundaries; tiered-price-enabled sold edits; late category-data arrival during starter entry; controlled save failure/retry/double-submit. These are not all base-case prerequisites; record them as targeted follow-ups, rather than claiming that five form cases exhaust all controls. The published split has no claim that delete/archive flows passed.
>
> **Observed on the already-open demo session:** opened New Product, saw Product Info, description and Display & Email Message editors, image upload, category, Exclude PDF switch, Inventory row/add action, Visibility, Delivery Method, Financial Settings and Save & Finish. Left without entering data. Opened the existing FAN EXPO T-Shirt edit screen, observed saved name/category/image and seven variants with their prices, Inventory, Purchase Limit, SKU, Sold and ordering controls. No field was changed; Save, image upload, price changes, add/remove/reorder and validation submissions were not attempted. Returned through Back to marketplace; original organization unchanged. Next.js remains source-reviewed only.
>
> ![[03 Test Cases/Products/evidence/inventory-create-2026-10-15.png]]
>
> ![[03 Test Cases/Products/evidence/inventory-edit-2026-10-15.png]]

**Readiness:** published definitions verified, with named deferred checks above; execution remains pending. **Release decision: Decision blocked by named missing evidence** for saved setup, stock reconciliation, access boundaries and the required deployed versions. This analysis does not sign off production readiness.

**Local format check before publication:** all 18 drafts parsed successfully with the reusable Qase case parser without network access. Each has standalone descriptions, setup, outcomes and 3–5 steps; the four intended parameters were verified. Publication then used the approved reusable batch workflow and full readback verification.

## Publication record

**Published and fully verified:** 2026-10-15 14:45 PDT. The user approved the exact 18-case candidate list: 15 creates and updates to SPT-4880, SPT-969 and SPT-970 in suite 109.

| Original local label | Qase case | Steps |
| --- | --- | --- |
| TC-1 | [SPT-5376](https://app.qase.io/case/SPT-5376) | 4 |
| TC-2 | [SPT-5377](https://app.qase.io/case/SPT-5377) | 3 |
| TC-3 | [SPT-5378](https://app.qase.io/case/SPT-5378) | 3 |
| TC-4 | [SPT-5379](https://app.qase.io/case/SPT-5379) | 4 |
| TC-5 | [SPT-5380](https://app.qase.io/case/SPT-5380) | 4 |
| TC-6 | [SPT-5381](https://app.qase.io/case/SPT-5381) | 4 |
| TC-7 | [SPT-5382](https://app.qase.io/case/SPT-5382) | 3 |
| TC-8 | [SPT-5383](https://app.qase.io/case/SPT-5383) | 4 |
| TC-9 | [SPT-5384](https://app.qase.io/case/SPT-5384) | 3 |
| TC-10 | [SPT-5385](https://app.qase.io/case/SPT-5385) | 4 |
| TC-11 | [SPT-5386](https://app.qase.io/case/SPT-5386) | 5 |
| TC-12 | [SPT-5387](https://app.qase.io/case/SPT-5387) | 5 |
| TC-13 | [SPT-5388](https://app.qase.io/case/SPT-5388) | 5 |
| TC-14 | [SPT-5389](https://app.qase.io/case/SPT-5389) | 4 |
| TC-15 | [SPT-5390](https://app.qase.io/case/SPT-5390) | 3 |
| SPT-4880 | [SPT-4880](https://app.qase.io/case/SPT-4880) | 5 |
| SPT-969 | [SPT-969](https://app.qase.io/case/SPT-969) | 4 |
| SPT-970 | [SPT-970](https://app.qase.io/case/SPT-970) | 5 |

Updated fields: title, description, preconditions, postconditions, tags, parameters and steps. At initial publication, existing suite, priority, type, behavior and layer were preserved. New cases were created in Products suite 109; no cases were deleted or moved during that publication. The approved folder moves are recorded below. Full readback matched all published text, every step action/data/expected result, tags, parameters and suite; creation metadata and preserved update metadata were also checked.

Publication artifacts: `/private/tmp/qase-inventory-approved-batch.json`, `/private/tmp/qase-inventory-dry-run.json`, `/private/tmp/qase-inventory-apply.json`, `/private/tmp/qase-inventory-published-full.json` and `/private/tmp/qase-inventory-publication-verification.json`. The earlier 1,839-case bulk snapshot is historical and was invalidated for future gap analysis by these writes; retain it as the analysis baseline, not the current project population.

**Execution remains pending.** Qase publication does not prove product saves, stock calculations, permissions or production readiness. No live product records were created or edited by this publishing step.

## Qase folder organization — completed

**Created and verified 2026-10-15 15:03 PDT.** The user approved the exact four-folder hierarchy and all 18 case moves. All cases were moved from Products (109) using a dry-run followed by the reusable batch script with only `suite_id` selected.

| Folder under Products (109) | Suite ID | Moved cases | Count |
| --- | --- | --- | --- |
| [List View](https://app.qase.io/project/SPT?suite=1153) | 1153 | SPT-5376, SPT-5377, SPT-5378, SPT-5379, SPT-5384, SPT-5385, SPT-5386 | 7 |
| [List View → Categories](https://app.qase.io/project/SPT?suite=1155) | 1155 | SPT-969, SPT-5380, SPT-5381, SPT-5382 | 4 |
| [Add / Edit](https://app.qase.io/project/SPT?suite=1154) | 1154 | SPT-4880, SPT-5383, SPT-5387, SPT-5388, SPT-5389, SPT-5390 | 6 |
| [Add / Edit → Stats & Info](https://app.qase.io/project/SPT?suite=1156) | 1156 | SPT-970 | 1 |

Categories are opened from the list’s category actions; Stats & Info belongs to the selected product’s detail navigation. Their child folders keep each screen identifiable. The six earlier cases in Products were outside the approved move scope. No cases or suites were deleted.

**Verification:** read back all four suites and confirmed their exact names and parents. Read back all 18 cases and compared their full fields with the saved before-state: content, tags, parameters, steps, priority, type, behavior, layer and all other non-move fields match. Qase automatically changed destination row positions and modification timestamps; these metadata changes were recorded separately. No test was executed by this organization operation.

> [!info]- Folder-operation audit
> The pre-change read contained 287 unique suites, with no child suites under Products (109). A full before-state of the 18 affected cases was saved before mutation. Four child suites were created and verified, then the 18 case moves passed dry-run and apply-time verification. A final independent full-case comparison confirmed preserved content and the approved hierarchy.
>
> Artifacts: `/private/tmp/qase-inventory-folder-plan.json`, `/private/tmp/qase-inventory-organization-before.json`, `/private/tmp/qase-inventory-organization-folders.json`, `/private/tmp/qase-inventory-move-batch.json`, `/private/tmp/qase-inventory-move-dry-run.json`, `/private/tmp/qase-inventory-move-apply.json` and `/private/tmp/qase-inventory-organization-verification.json`. Earlier suite and case caches remain historical and must not be reused as the current folder layout.

## Renewed Next.js base review — 2026-10-15

> [!info]- Fresh Qase/source/browser evidence
> **Query completeness:** refreshed the complete SPT project at 2026-10-15 22:11:59 UTC (15:11 PDT): **1,854 cases, 1,854 unique IDs, 19 complete pages**, stable API total. Full-field filtering by suite IDs 109, 1153, 1154, 1155 and 1156 returned **24 Products cases**. Full existing setup, parameters, steps and results were read, including the six older parent-suite cases. Neighboring definitions were filtered across descriptions/preconditions/steps/tags for product/variant plus archive/delete/order/message/notification/confirmation/image terms; product-email SPT-552 and refund SPT-5253/5255 were also read. No individual title alone established coverage.
>
> Snapshot: `/private/tmp/qase-products-base-review-cases-all.json`; current Products subset: `/private/tmp/qase-products-base-review-current.json`; full before-state for the proposed refinements: `/private/tmp/qase-products-base-review-preservation.json`. This refreshed snapshot supersedes the historical 1,839-case analysis snapshot for current definitions. No Qase writes occurred during the review.
>
> **Source revisions unchanged:** backend `2dc5cd3d89c31596e248dafe41c44503ac97aeee`; frontend `bce2f9f2b8f5941f4bf80f8f9473fa0fb1361fb4`. Reused earlier product source tracing; additionally checked `core/models/abstract/visibility.py` for status cascades, product record normalization for blank/zero/default values, inventory row actions for deletion guards, finance fields and permission/sales locks, product/category ordering, route wrappers and pricing gates. Manage Transactions is the visible name of the backend manage_financials permission. Existing source tests were read as definitions, not run as executed proof.
>
> **Observed Next.js UI, no saved changes:** opened the existing product’s Details, Inventory, Availability, Fulfillment, Communications and Finance pages. Confirmed inventory row columns/status/actions, Add variant and Save; opened and dismissed Variant actions without selecting Delete. Observed the product status warning, delivery options, disabled shipping-only transfer switch, PDF exclusion checkbox, distinct customer-message and employee-recipient sections, fee choices/default hints and seller commissions. No field edits, uploads, submits, order creation, archive, deletion, reorder or permission/flag changes were performed.
>
> **Stock display correction:** the modern screenshot/DOM shows Sold / total but no remaining-stock or variant-count subtitle. `ItemListCardGrid.web.tsx` does not consume the subtitle passed by `ProductCatalogCard`; this agrees with demo. The local SPT-5378 revision preserves legacy assertions and removes unsupported modern UI expectations. This is a confirmed case-definition mismatch, not a confirmed application defect.
>
> **Deployed/source difference:** demo shows Discounts and Packages navigation while the local route config marks them hidden. Both demo destinations were opened and displayed “This page is still under development.” This is an observed deployment/source difference, not a confirmed business-flow defect; the deployed revision was not identified. Current source and a live session are distinct evidence.
>
> **Execution limits:** no pagination fixture, Basic-plan organization, alternate permission account, empty organization, membership add-on gate or Workday configuration was exercised. Mobile was not exercised. Returned to the original product list with no saved values changed; screenshots retain visible UI evidence. No end-to-end failure was confirmed.
>
> ![[03 Test Cases/Products/evidence/products-nextjs-finance-2026-10-15.png]]
>
> ![[03 Test Cases/Products/evidence/products-nextjs-list-2026-10-15.png]]

**Renewed review format check:** all 48 full definitions in this canonical note parsed successfully using the reusable Qase parser, with unique labels and complete standalone fields, tags, parameters and expected results. This includes 21 existing-ID definitions (13 proposed refinements, 8 retained) and 27 uncreated SPT-5391–5417 definitions. Each has 2–5 steps. Parser result: `/private/tmp/qase-products-base-review-validation.json`. That read-only review prepared no apply or live product submission; approved Qase publication followed as recorded below.

## Approved Qase update — dry-run record

The user requested a Qase update after the renewed review, then explicitly confirmed the exact scope. **All 40 operations are published and verified.** This section preserves the reviewed dry-run scope.

* **Update 13:** SPT-969, SPT-970, SPT-4060, SPT-4880, SPT-4881, SPT-5155, SPT-5376, SPT-5378, SPT-5379, SPT-5386, SPT-5387, SPT-5388, SPT-5389. SPT-4880 changes only its title. Other updates select title, description, preconditions, postconditions, tags, parameters and steps; preserve suite, priority, type, behavior and layer.
* **Create 27:** SPT-5391–5417. Add / Edit (1154): SPT-5391–5397, SPT-5400–5405, SPT-5409–5415. List View (1153): SPT-5399, SPT-5407–5408, SPT-5416–5417. Categories (1155): SPT-5398. Stats & Info (1156): SPT-5406.
* Apply every split together, preserving transferred assertions. Correct the unsupported Next.js stock-subtitle expectation while retaining legacy figures. No case/suite deletions or case moves are included. Inventory-contract questions stay outside supposedly passing test expectations.

> [!info]- Complete dry-run preview
> All titles below begin with **Dashboard - Products -**. Each new case receives a Qase ID on creation; local labels are not part of its Qase title.
>
> | Case | Title ending | Suite | Tags | Parameter | Steps |
> | --- | --- | --- | --- | --- | --- |
> | SPT-5391 | Add a product variant | 1154 | dashboard, products | None | 3 |
> | SPT-5392 | Reorder product variants | 1154 | dashboard, products | None | 2 |
> | SPT-5393 | Save the customer message | 1154 | dashboard, products | None | 3 |
> | SPT-5394 | Change product status | 1154 | dashboard, products | Status: Archived, Published | 3 |
> | SPT-5395 | Change variant status | 1154 | dashboard, products | Status: Archived, Published | 2 |
> | SPT-5396 | Delete an unsold variant | 1154 | dashboard, products | None | 3 |
> | SPT-5397 | Prevent deletion of protected variants | 1154 | dashboard, products | Protection: LastRemaining, Sold | 2 |
> | SPT-5398 | Reorder products within a category | 1155 | dashboard, products | None | 3 |
> | SPT-5399 | Show an empty product catalog | 1153 | dashboard, products | None | 2 |
> | SPT-5400 | Save product sale notification recipients | 1154 | dashboard, products | None | 3 |
> | SPT-5401 | Save the purchase confirmation PDF setting | 1154 | dashboard, products | Exclusion: On, Off | 2 |
> | SPT-5402 | Restrict product financial settings | 1154 | dashboard, products, employee-permissions | None | 2 |
> | SPT-5403 | Save product financial settings | 1154 | dashboard, products | None | 3 |
> | SPT-5404 | Reject an invalid product image | 1154 | dashboard, products, edge-case | Image: TooLarge, TooSmall, TooWide | 2 |
> | SPT-5405 | Leave product details without saving | 1154 | dashboard, products | None | 3 |
> | SPT-5406 | Filter product sales by date | 1156 | dashboard, products, reports | Range: SalesDay, EmptyDay | 2 |
> | SPT-5407 | Open a product from its public name link | 1153 | dashboard, products | None | 2 |
> | SPT-5408 | Show no results for an unmatched product search | 1153 | dashboard, products, search-filters | None | 2 |
> | SPT-5409 | Set event checkout product eligibility | 1154 | dashboard, products | Rule: IncludeSpecific, ExcludeSpecific, AllowAll | 3 |
> | SPT-5410 | Set membership checkout product eligibility | 1154 | dashboard, products | Rule: IncludeSpecific, ExcludeSpecific, AllowAll | 3 |
> | SPT-5411 | Set Staff Box Office product visibility | 1154 | dashboard, products | Visibility: On, Off | 2 |
> | SPT-5412 | Reject a negative shipping cost | 1154 | dashboard, products, edge-case | None | 3 |
> | SPT-5413 | Save product transfer availability | 1154 | dashboard, products | Transfers: On, Off | 2 |
> | SPT-5414 | Disable transfers without Electronic Ticket delivery | 1154 | dashboard, products | None | 2 |
> | SPT-5415 | Lock product financial settings after sales | 1154 | dashboard, products | None | 2 |
> | SPT-5416 | Restrict Products on the Basic plan | 1153 | dashboard, products, employee-permissions | None | 3 |
> | SPT-5417 | Clear product list filters | 1153 | dashboard, products, search-filters | None | 3 |
> | SPT-5388 | Edit a product variant | 1154 | dashboard, products | None | 4 |
> | SPT-5387 | Edit product details | 1154 | dashboard, products | None | 4 |
> | SPT-5389 | Keep sold variant prices locked | 1154 | dashboard, products | None | 3 |
> | SPT-5379 | Copy a public product link | 1153 | dashboard, products | None | 3 |
> | SPT-5376 | Search for a product | 1153 | dashboard, products, search-filters | SearchBy: ProductName, VariantName, SKU | 3 |
> | SPT-969 | Create a product category | 1155 | dashboard, products | None | 3 |
> | SPT-970 | View product sales totals | 1156 | dashboard, products, reports | None | 3 |
> | SPT-4060 | Set Venue Page visibility | 109 | dashboard, products | Visibility: On, Off | 3 |
> | SPT-4881 | Save product delivery settings | 109 | dashboard, products | Delivery: Electronic, Shipping | 3 |
> | SPT-5155 | Check starter variant defaults | 109 | dashboard, products | None | 2 |
> | SPT-5386 | Filter the product list | 1153 | dashboard, products, search-filters | None | 4 |
> | SPT-4880 | Create a product | 1154 | dashboard, products | None | 5 |
> | SPT-5378 | Show product stock totals | 1153 | dashboard, products | StockState: Finite, SoldOut, Unlimited | 3 |

Batch artifact: `/private/tmp/qase-products-single-goal-batch.json`; dry run: `/private/tmp/qase-products-single-goal-dry-run.json`; compact preview: `/private/tmp/qase-products-single-goal-preview.json`. The approved reusable batch workflow was used, and full saved-field/metadata verification completed. The recovery details and final ID mapping follow.

## Single-goal publication record

**Completed and fully verified:** 2026-10-15 15:34 PDT. Published the approved **27 creates and 13 updates**. No cases or suites were deleted or moved; all existing update metadata and locations were preserved.

| Original local label | Published case | Folder | Steps |
| --- | --- | --- | --- |
| TC-16 | [SPT-5391](https://app.qase.io/case/SPT-5391) | Add / Edit (1154) | 3 |
| TC-17 | [SPT-5392](https://app.qase.io/case/SPT-5392) | Add / Edit (1154) | 2 |
| TC-18 | [SPT-5393](https://app.qase.io/case/SPT-5393) | Add / Edit (1154) | 3 |
| TC-19 | [SPT-5394](https://app.qase.io/case/SPT-5394) | Add / Edit (1154) | 3 |
| TC-20 | [SPT-5395](https://app.qase.io/case/SPT-5395) | Add / Edit (1154) | 2 |
| TC-21 | [SPT-5396](https://app.qase.io/case/SPT-5396) | Add / Edit (1154) | 3 |
| TC-22 | [SPT-5397](https://app.qase.io/case/SPT-5397) | Add / Edit (1154) | 2 |
| TC-23 | [SPT-5398](https://app.qase.io/case/SPT-5398) | List View → Categories (1155) | 3 |
| TC-24 | [SPT-5399](https://app.qase.io/case/SPT-5399) | List View (1153) | 2 |
| TC-25 | [SPT-5400](https://app.qase.io/case/SPT-5400) | Add / Edit (1154) | 3 |
| TC-26 | [SPT-5401](https://app.qase.io/case/SPT-5401) | Add / Edit (1154) | 2 |
| TC-27 | [SPT-5402](https://app.qase.io/case/SPT-5402) | Add / Edit (1154) | 2 |
| TC-28 | [SPT-5403](https://app.qase.io/case/SPT-5403) | Add / Edit (1154) | 3 |
| TC-29 | [SPT-5404](https://app.qase.io/case/SPT-5404) | Add / Edit (1154) | 2 |
| TC-30 | [SPT-5405](https://app.qase.io/case/SPT-5405) | Add / Edit (1154) | 3 |
| TC-31 | [SPT-5406](https://app.qase.io/case/SPT-5406) | Add / Edit → Stats & Info (1156) | 2 |
| TC-32 | [SPT-5407](https://app.qase.io/case/SPT-5407) | List View (1153) | 2 |
| TC-33 | [SPT-5408](https://app.qase.io/case/SPT-5408) | List View (1153) | 2 |
| TC-34 | [SPT-5409](https://app.qase.io/case/SPT-5409) | Add / Edit (1154) | 3 |
| TC-35 | [SPT-5410](https://app.qase.io/case/SPT-5410) | Add / Edit (1154) | 3 |
| TC-36 | [SPT-5411](https://app.qase.io/case/SPT-5411) | Add / Edit (1154) | 2 |
| TC-37 | [SPT-5412](https://app.qase.io/case/SPT-5412) | Add / Edit (1154) | 3 |
| TC-38 | [SPT-5413](https://app.qase.io/case/SPT-5413) | Add / Edit (1154) | 2 |
| TC-39 | [SPT-5414](https://app.qase.io/case/SPT-5414) | Add / Edit (1154) | 2 |
| TC-40 | [SPT-5415](https://app.qase.io/case/SPT-5415) | Add / Edit (1154) | 2 |
| TC-41 | [SPT-5416](https://app.qase.io/case/SPT-5416) | List View (1153) | 3 |
| TC-42 | [SPT-5417](https://app.qase.io/case/SPT-5417) | List View (1153) | 3 |

**Updated:** SPT-5388, SPT-5387, SPT-5389, SPT-5379, SPT-5376, SPT-969, SPT-970, SPT-4060, SPT-4881, SPT-5155, SPT-5386, SPT-4880, SPT-5378. SPT-4880 changed title only. The other 12 updates changed only the approved title, description, preconditions, postconditions, tags, parameter definitions and steps. Priority, type, behavior, layer, suite and all unselected non-timestamp fields matched the saved baseline.

The canonical note’s 48 full definitions now use real Qase IDs. In particular, **SPT-5391 adds a variant, SPT-5388 edits a variant, and SPT-5392 reorders variants**; Details and customer-message cases are likewise separate.

> [!info]- Recovery and verification audit
> The initial batch created all 27 cases and updated seven existing cases before Qase returned HTTP 500 for SPT-4060. No create was retried. A complete 1,881-case snapshot identified 34 saved outcomes and the six untouched updates. The five unaffected updates were dry-run and applied separately. SPT-4060’s legacy grouped parameters were replaced using the supported explicit `parameters` representation, retaining the approved Visibility = On/Off single parameter. Its removed surface/rule responsibilities are present in the published split cases.
>
> Final independent readback verified **all 40 cases**, every approved text field, step action/data/expected result, tag, parameter and folder. It also checked SPT-4060 has exactly one native single parameter named Visibility with On and Off, and compared every unselected update field to the original baseline. All checks passed. The full final readback and update receipts are saved; the interrupted first command did not produce a completion JSON.
>
> Audit artifacts: `/private/tmp/qase-products-single-goal-batch.json`, `/private/tmp/qase-products-single-goal-dry-run.json`, `/private/tmp/qase-products-single-goal-recovery-state.json`, `/private/tmp/qase-products-single-goal-resume-other-apply.json`, `/private/tmp/qase-products-4060-repair-apply.json`, `/private/tmp/qase-products-single-goal-full-readback.json` and `/private/tmp/qase-products-single-goal-verification.json`. Explicit parameter handling follows the [Qase update-case API](https://developers.qase.io/reference/update-case). Earlier snapshots are historical; refresh before another gap analysis.

**Execution remains pending.** These writes changed Qase definitions only. Zero/blank Inventory contract questions remain unresolved, and no live product save or mutation was performed.


## Product duplication — focused review, 2026-10-16

**Intent:** We are testing whether an organizer employee can duplicate a product while the original's stock and sales stay unchanged; this prevents shared stock or inherited sales, proved by saved copy settings, zero copy sales and an unchanged original after editing the copy's inventory. Criticality: inventory/ownership. Actor impact: organizers and customers. Definition confidence: high for the inspected revisions; deployed creation and persistence are unexecuted.

**Placement:** Dashboard → Build → Products → All products → Duplicate product. Verified Qase home: Products (109) → List View (1153), because the list owns this action. The edit screens supply the copy checks; they do not make a second duplicate case necessary. Local draft TC-200 was published as SPT-5535 after the user confirmed this one-case scope with “push”.

**PR scope:** [Frontend PR #7559](https://github.com/showpass/showpass-frontend/pull/7559) adds a permission-gated confirmation and creation action, success/error messages, one in-flight submission guard, no automatic creation retries, catalog refresh and navigation to the new product. It also adjusts card/grid layout and English/French strings. No shared API behavior outside the product service was changed by this frontend PR. The backend duplication service creates the product, variants, fee configuration, discount permissions, notification recipients and associations as independent owned records; event/membership targets remain the same. It copies configured capacity rather than remaining stock, omits Archived variants, resets sales/price locks and recomputes sold-out state. Sales visibility is preserved: a copy is not automatically hidden.

| Proof target / outcome | Coverage decision |
| --- | --- |
| Clean creation, copied Details/variants/Availability, zero sales, automatic list refresh and independent saved inventory | SPT-5535; manual-only, not executed |
| Mobile/compact/wide card controls | SPT-5535 width repeats; not executed at these widths |
| Open confirmation and Cancel | Observed on beta without saving; separate cancellation case deferred to keep the requested case focused |
| Permission denied, administrator exception, Archived source hidden, repeated clicks, failure and recovery | Source/unit-test definitions reviewed; not run; distinct manual cases deferred |
| Unique numbered names, long names, copying a copy, sold-out/zero/unlimited stock | Backend naming/stock rules reviewed; distinct boundaries deferred; TC-200 uses a noncolliding short name and limited stock |
| Copied financial configuration, discounts, widgets, notifications, delivery, communications, wallet/integration settings and purchases/fulfillment | Backend copies identified; deeper configuration and downstream proof deferred beyond this focused case |
| Organization isolation, atomic rollback, concurrency and ambiguous network completion | Backend test definitions reviewed where present; not executed; deferred to API/integration coverage |
| Legacy entry or embedded caller | Not claimed by this direct migrated-page case; no duplication action found in the inspected legacy source |
| English/French translations and removed legacy Cancel keys | Diff reviewed; no translated or legacy rendering executed; deferred regression check |

### Sources and evidence for SPT-5535

* Frontend active checkout: `develop` at `f1acf48189e6f783b1e31e5cd218f679dab1d92e`. Read the exact PR #7559 diff from that base to head `87e68965982254aa116136ae7b50e101f298368d` (`SPD-2793/duplicate-products`), confirmed through GitHub PR metadata. No checkout changes or pull performed.
* PR files: `data/repositories/VenueBasedProductsRepository.ts`, `data/services/useVenueProductsService.ts`, `hooks/useProductDuplication.ts`, `ui/components/catalog/ProductDuplicateAction.web.tsx`, `ProductCatalogCard.web.tsx`, `ProductCatalogList.web.tsx`, their tests, and changed locale files. Paths are under `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/products/`, except locales under `packages/core/src/shared/assets/locales/`. French dashboard-events changes are escaped nonbreaking-space serialization; they do not add product behavior.
* Backend active checkout is `feature/nextjs-page-opt-in-banners`; duplication is absent there. Read saved `origin/develop` at `a0c8debd9d8366030c8a0e233e205e604b4805f5`, including companion PR #12108 merge `a7ff6013c5`: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/inventory/services/products/duplication.py`, `api/venue_based/viewsets/products.py`, `tests/api/venue_based/test_product_duplication.py`. Source definitions are evidence of intended implementation, not test passes.
* Frontend detail navigation, Inventory fields, membership visibility gate and statistics labels were also checked in the local Products feature. No duplication-specific rollout flag was found in the PR; `show_membership_product_addons` gates the membership controls used for comparison, not duplication itself.
* Selected handbook: [[00 Start Here/Showpass QA Handbook/Playbooks/10 Products Variants and Stock]]. Applied variant-specific quantities, saved-state checks and separation of stock from sales history. Applied [[00 Start Here/World-Class Software Quality Standard]] and [[05 Tooling/Qase Test Case Writing Rules]].
* Browser: existing `beta.showpass.com/manage/products/` tab, signed-in Christian Valdez; product links identify the `megacon-orlando-2` organization context. The selected organization name and employee role/permission record were not independently opened. Verified the Duplicate product button and confirmation wording, then selected Cancel. Did not select Create copy or save any product. Deployment SHA, copy fields, sales reset and persistence remain unverified live.
* Existing definitions: locally searched the previously complete SPT snapshot (1,998 unique cases / 20 pages, retrieved 2026-10-16 19:49:18 UTC). SPT-5377 concerns list pagination without repeated rows; SPT-5379 copies a public link. Neither duplicates a product. No product-duplication candidate was found in that saved snapshot. This is not a fresh Qase gap analysis or a claim about changes after that snapshot. No Qase write was performed during drafting. The later approved publication is recorded below.

### Product duplication publication

* Approved scope: create only local TC-200, title **Dashboard - Products - Duplicate a product with independent inventory**, in suite **1153 List View**, parent **109 Products**. No existing cases or suites were changed.
* Required helper dry-run passed: **10 steps**, tags **dashboard, products, duplication, inventory**, no native parameters; Desktop/Mobile and three width repeats remain in Description. The created title contains no local TC label.
* Created [SPT-5535](https://app.qase.io/case/SPT-5535). Full readback matched title, Description, Preconditions, Postconditions, suite, tags, type/behavior/layer, every step action/data/expected result and empty parameter collections. Verified using the required helper's Qase read and comparison functions.
* Case definitions are published; duplication creation, saved-copy checks and responsive executions remain unexecuted. The earlier browser observation only opened and cancelled the confirmation.


## Beta smoke execution — 2026-10-16

See [[03 Test Cases/Products/products-beta-smoke-2026-10-16]] for the completed read-only run and screenshots. Search/filters, category inspection, duplication cancellation, management-screen navigation, matching sold counts and 390/861/1280 px layouts were exercised. No persistent product changes or Qase run results were submitted. SPT-5535 creation/persistence remains unexecuted.


### Smoke correction — sold variant price lock

The initial beta smoke conclusion was withdrawn after the user called out sold-price protection. FAN EXPO LANYARD shows Sold 2 and permits an unsaved Price edit; 5.01 was entered and restored to 5.00 without Save. Whether this violates the lock depends on the actual `has_price_lock` and organization `price_tiers_enabled` values, which remain unverified. Existing SPT-5389 already covers the required lock when tiered pricing is off; do not create a duplicate. See the canonical [[03 Test Cases/Products/products-beta-smoke-2026-10-16#Sold-price protection — corrected follow-up|PL-01 follow-up and screenshots]]. No Qase result or case changed.
