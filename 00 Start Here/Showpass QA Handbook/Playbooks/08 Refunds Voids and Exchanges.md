---
title: Refund, Void, and Exchange a Customer Order
date: 2026-10-03
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Refund, Void, and Exchange a Customer Order

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Role:** permitted Venue Employee. **Start:** selected Venue → Transactions → a known Customer order. Refund, Void, and Exchange are distinct actions, not interchangeable cleanup.

## Prepare independent orders
| Order | Starting state | Purpose |
| --- | --- | --- |
| Refund | Two unscanned eligible paid tickets | Refund one; prove the other remains usable. Another order for full refund. |
| Void | One eligible unscanned paid ticket | Prove validity and stock effect without assuming money return. |
| Exchange | One eligible ticket and available replacement | Prove old/new ownership and actual price difference. |
| Control | Untouched paid order | Detect unintended effect on another item/Customer. |

Record original Customer, amounts, fees/taxes, provider, item validity, seat/Inventory, and credit balance. Bind refund policy and exact refund-type/paid-Void/Exchange permissions. Manage Events alone does not grant these. Extra authorization may apply.

## 1. Refund
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Refund order in Transactions. | Actual order reference | Correct Customer, original payment, and items. |
| Select Refund. | Eligible unscanned items | Only actions available to this Employee are offered. |
| Select the intended item and permitted refund type. | One ticket for partial | Correct selected scope; untouched ticket excluded. |
| Compare the preview to the expected return. | Cash/credit destination; fee/tax return rules | Correct independent amount and destination. |
| Confirm once. | Reviewed scope | Final or explicitly pending saved refund. |
| Reopen the transaction at the supported completion deadline. | Original/adjustment references | One correct final adjustment; no duplicate return. |
| Inspect approved payment or Customer credit evidence. | Matching result | Actual cash return or credit issuance exactly once. |
| Open Customer tickets and admission view. | Selected and untouched tickets | Correct validity; unaffected ticket remains valid. |
| Open Inventory and financial records/report. | Affected items | Supported restock policy and retained/returned money reconcile. |

Preview is not authorization forever: test stale preview after an allowed state change separately. Use independent orders for checked-in, cutoff, shipping, delayed barcode, or provider-pending states.

## 2. Void another order
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Void order in Transactions. | Independent reference | Correct Customer/item; no prior Refund. |
| Select Void and review the supported paid-item action. | One intended item | Explicit scope and permission. |
| Confirm once. | Same scope | Saved Void for that item only. |
| Reopen Customer items and Check In validity. | Voided and control items | Intended admission removed; control unchanged. |
| Open Inventory and financial details. | Original sale/void record | Expected capacity/ownership and financial result. |
| Inspect payment evidence if money return is promised by this action. | Original reference | Return proven independently; validity change alone is not cash Refund. |

## 3. Exchange another order
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supported Exchange action. | Exchange Customer/order | Correct original eligible item. |
| Choose the eligible replacement. | Event/Ticket Type/seat/variant | Exact available replacement and owner. |
| Review the money difference and payment/refund/credit choice. | Independent calculation | Correct fees, tax, and difference—not only displayed balance. |
| Complete the supported Exchange once. | Approved test money method | Final Exchange or visible pending state. |
| Reopen original and replacement items. | Both references | Correct old validity; one usable replacement owned by intended Customer. |
| Inspect both availability views. | Original and replacement | Correct stock/seat release and allocation. |
| Inspect linked financial records/report. | Original, adjustment, replacement | Correct net money/credit/earnings; no duplicate Cash/Other payout. |
| Inspect the control order. | Untouched order | No unrelated Customer balance, validity, stock, or owner change. |

## Senior-QA integrations
Repeat the appropriate independent action with Package descendants, credit/gift-card funding, Membership benefits, Assigned Seating, Cash/Other, and historical gateway-owned payments. For delayed/replayed results, use isolated engineering-controlled setup and prove one return/credit/replacement.

Test minimum permitted and denied Employees: refund types, paid Void, and additional authorization are separate capabilities. Use actual supported policies; do not assume every refund restocks or every Void returns cash.

## Recheck the purchase's enabled downstream effects

For each independent action, revisit the applicable rows in [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the purchase completion checklist]]. Compare selected and untouched items before/after: deferred questions and edit rights; shipping/pickup already performed; receipt/wallet/old barcode validity; Member benefits; credit/referral usage; protection; enabled external admission or supplier booking; Customer notifications; reports and promised adjustment tracking.

The adjustment's actual policy determines whether each effect reverses, remains, or needs a separate operational action. Do not invent universal refund events, reward restoration, parcel recall or external cancellation. Name the consumer and supported cancellation/update path; inspect the approved received result. A Customer cash return does not prove an external wristband was deactivated or a shipped Product was recovered. If no source-backed policy or test destination is available, retain the named gap for the decision owner.

## Finish
Record money, validity, owner, Inventory, reports and control-order results for each action. Preserve adjustment records. A toast or pending terminal refund is not the complete outcome.

[Employee permission definitions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py>) and [transaction actions](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionActions/TransactionActions.web.tsx>).

## Source-backed cautions and automation reference

**Business risk:** customer refund differs from saved money records, old tickets remain valid, inventory is released incorrectly, or exchanges duplicate payout. Anchors: SPD-2228, SPD-2280, SPD-2153.

**Automation:** existing exchange tests are useful anchors; assert old/new item validity and net money, not only displayed exchange balance. Backend tests cover asynchronous provider result/local rollback and duplicate refund recovery. Source route: B10, B11, P4.
