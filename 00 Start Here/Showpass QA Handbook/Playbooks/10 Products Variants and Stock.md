---
title: Create a Product and Test Purchase, Pickup, and Stock
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Create a Product and Test Purchase, Pickup, and Stock

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Roles:** Organizer creates Product; Customer chooses a variant; Venue Employee performs supported fulfillment/pickup and adjustments.

A Product Attribute is the purchasable variant/SKU. It is not ticket capacity; each finite-stock variant has its own Inventory.

## Set up a useful Product
| Setting | Example owned setup | Why |
| --- | --- | --- |
| Product | Unique name and realistic description/image | Correct Organizer offering and public display. |
| Variant 1 | Named variant, distinct SKU, Inventory 5, Price 10 | Identify exact purchased stock and money. |
| Variant 2 | Different name/SKU, Inventory 5, Price 15 | Detect wrong-variant stock mutation and selection loss. |
| Purchase Limit | 2 where supported | Valid two-item purchase and over-limit rejection. |
| Eligibility | Actual standalone/Event/Membership availability | Test where Product is allowed, not only a catalog save. |
| Delivery / pickup | Supported option and any costs/message | Paid Product must be obtainable and fulfilled, not just issued. |
| Fees / taxes | Recorded inherited or owned rules | Correct Customer total and saved earnings. |

Unlimited Inventory is a separate configuration; do not interpret blank as zero stock.

## Organizer creates; Customer buys
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Products in the selected Venue and choose Create Product. | Intended Organizer | Product Info form opens. |
| Enter Product Name and optional content. | Unique name, description/image | Valid fields accepted; required/invalid content handled. |
| Add the first Inventory variant. | Variant Name, Inventory, Purchase Limit, SKU, Price | Correct purchasable option. |
| Add the second variant. | Distinct values | Two separate options. |
| Set supported eligibility, fees and delivery choices. | Actual scenario | Only intended sales/fulfillment scope. |
| Save and reopen Product/variant details. | Same Product | All variant values and settings persist. |
| As Customer, open its purchase entry point. | Standalone or attached Event/Membership | Correct eligible Product and options. |
| Select variant 1 and quantity 2. | Known variant | Correct option, limits and independent total. |
| Complete checkout. | Approved payment and Customer | One order with correct variants, quantities, delivery and charge. |
| Reopen Customer order and Organizer Product Inventory. | Same order | Exact purchased variant; stock effect belongs to variant 1; variant 2 unchanged. |

## Venue Employee fulfills and adjusts
Perform the supported pickup/shipping/delivery step and inspect saved fulfillment history/status. Repeat an attempted duplicate pickup under the actual redemption rule. Product pickup is not Event ticket Check In.

Create separate Product orders for allowed Refund/Void/Exchange; follow the adjustment guide. Inspect monetary return, item validity/fulfillment, returned-to-stock policy and reporting. Do not assume returned money automatically means restocked physical Product.

## Senior-QA integrations
- Attach Product to an Event/Membership or Package; purchase the containing item and prove correct Product issuance and fees.
- Purchase a different variant after switching selection; SKU/price/stock must follow the final choice.
- Reserve the isolated last unit, abandon/expire under actual rules, then prove another Customer can buy it.
- Two controlled Customers contend for last stock; stock lock/concurrency needs backend complement.
- Zero stock, unlimited stock, negative/decimal/over-limit quantity, variant changes with existing sales, and low-privilege Employee.
- Customer delivery content versus Product Display & Email Message and custom confirmation override.
- Financial/stat refresh after sale/adjustment; caches are not final Inventory authority.

## Finish and source
Record Product/variant/SKU, opening/closing stock, Customer/order, fulfilled quantities, fees and adjustments. Restore owned setup; preserve sale/history evidence. [Current Product form](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/dashboard/inventory/products/_create-edit-form.html>) supplies Product Info and variant labels; B14 supplies authoritative stock behavior.

## Source-backed cautions and automation reference

**Business risk:** wrong product variant issued, stock oversold/stranded, or a paid product lacks promised fulfillment.

**Automation:** extend product and package journeys; backend aggregate stock contention and expiry tests. Stock statistics and earnings use different record sources and deserve agreement checks. Source route: B14, B2, P1.
