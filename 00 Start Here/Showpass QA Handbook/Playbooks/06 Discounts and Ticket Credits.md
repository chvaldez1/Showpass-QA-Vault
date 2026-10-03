---
title: Configure a Discount or Ticket Credit and Redeem It as a Customer
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Configure a Discount or Ticket Credit and Redeem It as a Customer

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Roles:** Organizer configures; Customer redeems; Venue Employee may issue/sell on behalf of Customer. A Ticket Credit is an entitlement, not automatically a money credit or a normal price discount.

## Choose the workflow and data
| Workflow | Prepare | Expected result |
| --- | --- | --- |
| Discount | Owned paid item, one eligible and one excluded item; actual code/type/once-or-each/date/limit rule | Known reduction only on eligible items; saved use/limit after completed sale. |
| Ticket Credit | Named issuing Event/Ticket Type and a different redemption Event/Ticket Type; quantity and per-item/per-user limit | Actual issuing purchase grants expected credit; eligible redemption consumes it once. |
| Negative control | Ineligible Customer/item, expired/exhausted credit or code | Clear rejection; no payment/item/usage mutation. |

Record timezone, pricing mode, actual permissions and limits. Do not prepare every Ticket Credit by seeding a balance if the issuing path is part of the feature.

## Organizer configures Ticket Credit
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Ticket Credits and select Create ticket credit. | Selected Venue | Correct definition form. |
| Enter Ticket credit name. | Unique meaningful name | Intended Customer-facing name. |
| Set Limit per item, per user. | Known supported limit | Correct whole-number value; invalid input rejected. |
| Save the definition. | Same credit | One saved record. |
| Open its assignments and Add issuing event. | Named issuing Event/Ticket Type | Exact selected issuing scope and credit quantity. |
| Select Add redemption event. | Named eligible redemption Event/Ticket Type | Exact allowed redemption permissions. |
| Save assignments and reopen them. | Same credit | Issuing quantity AND redemption eligibility persist; no silent zero/reverted value. |

If this credit workflow uses another supported issuance method, record and test that method separately. Assignments are not a credit balance by themselves.

## Customer receives and uses Ticket Credit
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Buy the issuing item through the chosen sales client. | Controlled Customer, configured quantity | Correct paid order and expected issued credit at the supported deadline. |
| Open the Customer's Ticket Credits view. | Same Customer | Correct credit name, remaining rights, eligibility. |
| Open the eligible redemption Event. | Configured target | Correct eligible Ticket Type. |
| Select tickets and apply the credit. | Supported quantity | Correct entitlement use and any remaining fees/tax/payment. |
| Finish the redemption order. | Same Customer | Usable tickets and one completed redemption. |
| Reopen credit usage and order. | Same references | Quantity used once; remaining entitlement correct. |
| Attempt the excluded or exhausted use in a separate basket. | Negative control | Clear rejection; no unintended spend or issued item. |

## Organizer configures and Customer uses a discount
Save code/rule, eligible items, dates, quantity/usage and once/each settings. Reopen them. As Customer, apply the code to the eligible basket, compare independent discount/fee/tax math, complete sale, and inspect saved allocation/usage. Remove/reapply the code in a separate pre-purchase run; excluded/expired/exhausted use must not change price or consume usage.

## Post-purchase and senior-QA passes
- Separate Refund/Void/Exchange orders: test the actual entitlement-restoration and financial policy; do not assume code use/credit always comes back.
- Non-date edit around differing Venue/device timezone; eligibility dates must not shift unintentionally.
- Save with zero issuing quantities through its explicit confirmation; cancelled save must not alter permissions.
- Multiple assignments; remove one while keeping another; fresh read and real redemption detect partial save.
- Flat discount once versus each, quantity >1, supported Package/mixed-pricing behavior; independent allocation not only total.
- Minimum Employee permission versus denied Employee, Box Office/public redemption, second controlled Customer.
- Two concurrent uses at the last available limit require isolated supported setup; no overuse or duplicate consumption.

## Finish and sources
Preserve issuing and redemption order references, Customer usage, saved quantities/permissions, and adjustment results. Restore owned rules. [Definition form](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/ticket-credits/ui/components/TicketCreditDefinitionForm.web.tsx>) and [assignments editor](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/ticket-credits/ui/components/TicketCreditAssignmentsEditor.web.tsx>).

## Source-backed cautions and automation reference

**Business risk:** an organizer saves a setting but customers cannot redeem it, unintended customers can redeem it, or usage/quantity limits silently revert. Anchors: SPD-2465, SPD-2526, SPD-2558, SPD-2564.

**Automation:** stronger target is **configure → reopen → redeem → exhaust/reject**, not only redemption of preseeded codes. Compare current existing assertions before calling it a gap. Source route: B3, B7, F3, P3.
