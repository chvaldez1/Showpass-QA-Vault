---
title: Configure Fees and Test the Complete Financial Path
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Configure Fees and Test the Complete Financial Path

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Roles:** Organizer configures allowed fees/taxes; Admin-managed internal fees/rate cards use the approved setup owner; Customer purchases; permitted Venue Employee performs adjustment.

## Prepare the settings and independent calculation
Choose currency, gateway/method, pricing mode, actual Venue/Event/item inheritance, and one isolated Event or Ticket + Product Package. Do not change a shared Venue rate card just to get a variation.

| Setup choice | Example to prepare | What to calculate before purchase |
| --- | --- | --- |
| Ordinary control | Paid Ticket Type, quantity 1 and 2 | Base price, each applicable fee, taxable component, rounding. |
| Internal/absorbed fee | One approved saved rule and its bearer | Customer charge versus Organizer cost and Showpass allocation separately. |
| Mixed inclusion | Included Product variant and an excluded Product variant | Which units incur each fee; do not charge every child merely because it exists. |
| Discount | Actual flat/percentage and once/each rule | Eligible bases, order of calculation, fee/tax effects. |
| Package | Known parent/child quantities and price allocation | No double-counted parent + allocated children; zero-price child does not imply no configured fee. |
| Pricing mode | Actual Venue AND sellable-item enablement | General/itemized/mixed rules; supported rejection rather than guessed equivalence. |

Use [[00 Start Here/Showpass QA Handbook/03 Evidence and Expected Results|money worksheet]]. Expected values must come from known configuration/business rules, not the calculator under test.

## Organizer saves; Customer purchases
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the applicable fee/tax settings for the owned test item/Event. | Actual saved rules | Correct inheritance and authority; no other Venue selected. |
| Save the intended allowed change. | One deliberate rule | Correct accepted configuration. |
| Leave and reopen those settings. | Same record | Values, exclusions, scope and absorbed choice persist. |
| Open Customer purchase on the selected client. | Ordinary control | Correct item/currency. |
| Select quantity 1 and review checkout. | Independent calculation | Correct visible subtotal, fees, tax, total. |
| Complete the purchase and reopen its transaction. | Approved test payment | Actual collected amount and saved allocations agree. |
| Open financial details/report for this sale. | Organizer/Showpass expected allocations | Absorbed/internal fee not silently missing just because Customer total looks correct. |
| Repeat with quantity 2 on a fresh order. | Same rules | Correct per-unit/per-order behavior and rounding. |
| Purchase the selected Package/discount combination. | Known children/options | Correct eligible fees, tax, all issued items, and final allocation. |

## Existing baskets and post-purchase
Create a Customer basket before the allowed configuration change. Record its shown amount. Reopen it after the change, then complete a separate purchase only under the supported price-lock/repricing policy. Compare saved charge and allocation; an old checkout total cannot silently contradict the final charged amount.

Create separate refundable/exchangeable orders. Review each permitted adjustment before submitting; then inspect actual return/credit, retained fees/tax, old/new item validity and earnings. Do not assume fee treatment from the action's name.

## Senior-QA integration passes
- Quantity greater than one; apply-once discount; fractional rounding; multiple eligible/ineligible children.
- Redeemable parent versus container, supported barcode mode, zero-price included children.
- Absorbed fees plus processing fees on the actual configured bases; taxes on internal/custom fee components.
- Public versus employee sale; System/Custom provider; actual pricing flag/item setting; current and existing orders.
- Independent oracle comparison across checkout, saved invoice allocation, adjustment, report/export and approved settlement calculation.

Unsupported mixed combinations must reject cleanly without unintended charge or item issuance. If a financial allocation cannot be inspected through approved access, name that missing proof; do not mark the fee tested from Customer total alone.

## Finish
Keep configuration snapshot, independent arithmetic, payment/order references, and Organizer/Showpass allocation evidence. Restore the owned setting; preserve financial records.

## Source-backed cautions and automation reference

**Business risk:** a sale looks correct to the customer but silently misses Showpass/organizer fees, taxes, or earnings. SPD-2761 reported missing fees on ticket-plus-product packages; SPD-2595 reported fees not honored. Internal/absorbed fees are prevention priorities, not a confirmed root cause for every incident.

**Automation:** extend existing package purchase patterns with fixed independent expected numbers and saved allocation assertions; backend tables cover the larger math matrix. Do not derive expected values by calling the same calculator under test. Existing SPT-3760 is a starting reference, not proof of complete fee protection. Source route: B3, B4, F2, P1.
