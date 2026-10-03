---
title: Create a Package and Test Every Included Item
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Create a Package and Test Every Included Item

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Roles:** Organizer configures the Package; Customer selects/purchases; Attendee uses included admission; Venue Employee handles product pickup, printing, and adjustments.

A Package parent is the bundle; children are the included Ticket Types/Products. Price, delivery, barcode and redemption rules depend on the Package configuration.

## Prepare the Package's component items
Use owned future Events with known Ticket Types and a Product with a known variant. Record Inventory and prices before building the Package. Use [[00 Start Here/Showpass QA Handbook/Playbooks/11 Event Sales Calendars and Availability|the Event walkthrough]] and [[00 Start Here/Showpass QA Handbook/Playbooks/10 Products Variants and Stock|Product walkthrough]].

| Package choice | Baseline / variation | Expected composition |
| --- | --- | --- |
| Preset | One admission ticket plus one named Product variant | Exact configured children automatically included. |
| Custom | Required option with a documented minimum/maximum and at least two choices | Only Customer-selected valid options; missing/too many choices rejected. |
| Quantity | One Package, then separate order with two | Child quantities multiply correctly; allocations reconcile with the two Package sales without charging both parent and children as extra purchases. |
| Price allocation | Actual parent price and saved child allocation | Independent saved earnings; child allocation is not extra money collected. |
| Delivery options | Saved Send a single barcode; permitted Allow redemption on any included item; attendee-info choice | Actual configured barcode and attendee collection behavior, not assumed combinations. |

## Organizer creates and Customer completes the Package
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Organizer's Packages screen and its create action. | Selected Venue | Package form belongs to intended Organizer. |
| Set parent Event/Ticket Type and Package kind. | Preset or Custom | Correct supported configuration. |
| Add the included tickets/Products and quantities. | Exact names/variants | Intended relationships, not similarly named items from another Event/Venue. |
| Set price/allocation and delivery options. | Recorded rules | Valid supported combination; correct attendee-info choice. |
| Save and reopen the Package. | Same Package | Composition, quantities, price, and barcode options persist. |
| As Customer, open the Package on the sales client. | Same Package | Correct parent and selection requirements. |
| Select required Custom options if applicable. | Valid selection | Exact choices remain; incomplete/over-limit choices cannot proceed. |
| Complete checkout and one approved test payment. | Independent total | Correct charge and one saved Package order. |
| Reopen Customer order and all included items. | Parent/child references | Complete correct children, quantities, owners, dates, variants; no missing or extra item. |
| Obtain tickets/printouts and Product delivery. | Saved delivery mode | Only intended barcode set; each promised item obtainable. |

## Attendee admission and Product pickup
Check in the configured admission items on an admission-enabled test Event and perform Product pickup separately. If the prepared Event is future-dated, use a separate appropriately timed scenario rather than bypassing its admission window. Record actual scan/history counts. A Package lookup is not necessarily a successful redemption, and Product pickup is not ticket admission.

For single barcode or any-included-item redemption, follow the configured mode and inspect its consumption limits. Repeat scan only on an independent scenario or at the intended boundary; do not invent universal scan counts.

## Adjust an independent Package order
Create unscanned separate orders for Refund, Void, and supported Exchange. Follow [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges|post-purchase steps]]. Inspect the intended parent AND descendants, actual return/credit, validity/pickup state, each child's Inventory, and saved earnings. A refunded parent with active unintended children is a failed integration.

## Senior-QA combinations
- Add parent and a separate child together, then in the opposite order, including an existing basket.
- Quantity >1, nested Package where supported, mixed Product/ticket children, zero-price included items.
- Internal/absorbed fees, discount once/each, actual pricing mode, supported mixed-item rejection.
- Customer versus Attendee details on parent/individual tickets; printing and scan counts.
- Partial generation/resume with engineering support; id-based child comparison catches duplicate + missing child even when count matches.
- Select invalid Custom option count and correct it: no lost prior selection or partial paid order.

## Finish and sources
Preserve composition and all related references. Restore owned configuration; preserve financial/scan records. [Delivery-option controls](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/packages/ui/components/form/TicketPackageDeliveryOptionsSection.web.tsx>) distinguish actual user-facing options.

## Source-backed cautions and automation reference

**Business risk:** buying one bundle produces the wrong children, charges children incorrectly, prints extra barcodes, leaves refunded children valid, or miscounts redemption. Anchors: SPD-2280, SPD-2512, SPD-2525, SPD-2597, SPD-2661.

**Automation:** use existing preset/custom/multi-layer/product package helpers; assert final composition and validity, not only checkout totals. Physical barcode/printing behavior remains manual where it needs equipment. Source route: B4, B12, P1.
