---
title: Create a Membership and Test Member Benefits End to End
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Create a Membership and Test Member Benefits End to End

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Roles:** Organizer creates Group/Levels/benefits; Customer purchases; Member holds the Membership; Venue Employee issues/checks benefits and handles lifecycle changes.

A Membership Group defines the offering. Levels are purchasable options. Benefits differ: issue-ticket benefits generate tickets; discount and access benefits must be tested as their own behaviors.

## Prepare an interpretable Membership
| Setting | Suggested owned setup | Expected result to write down |
| --- | --- | --- |
| Group and Level | Unique Group; one paid Level with available Inventory/quantity | Known price, dates/season, eligible Customer and one resulting Member. |
| Issue-ticket benefit | Two future owned Events, one ticket per eligible Member per Event | Exact Member/Event identities and two usable tickets, when this benefit is supported. |
| Access or discount benefit | Separate supported benefit, with eligibility and use limits | Admission counters or discount behavior; not assumed ticket generation. |
| Season / renewal | Actual season and immediate/deferred rollover rule | Old/new rights and charges at the intended time. |
| Assigned Seating | Only for the selected scenario; known Map and seat permission | Membership seat and generated Event tickets agree. |
| Money / delivery | Actual fee rules, test gateway/method, Customer inbox | Paid Membership and promised results beyond the receipt. |

Membership module and Manage Memberships must be available. Bind the actual benefit/renewal/realization flags and item setup through the approved owner; a stored opt-in does not alone prove runtime enablement.

## Organizer configures the offering
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Memberships in the selected Organizer's Dashboard. | Intended Venue | Correct Group list. |
| Select the supported create action. | Unique Group | Create membership form opens. |
| Enter Group details and applicable dates/season. | Recorded values | Required valid information accepted. |
| Save and reopen the Group. | Same Group | Details, season and ownership persist. |
| Open Levels and select Add Level. | Paid Level setup | Correct Level linked to this Group. |
| Save price, quantity/limits and applicable settings. | Known values | Purchasable Level persists after reopening. |
| Open Group or Level Benefits and select Add Benefit. | Correct intended scope | Benefit editor applies to correct Group/Level. |
| Configure the supported issue-ticket/access/discount benefit. | Named eligible Events and quantities/limits | Exact promised entitlement, no unintended extra Events. |
| Save and reopen the benefit. | Same record | Benefit type, eligibility and quantities persist. |

## Customer purchase → Member → promised benefit
| Step Action | Data | Expected Result |
| --- | --- | --- |
| As Customer, open the Membership offering on the chosen client. | Group/Level | Correct price, dates/season and eligibility. |
| Complete the paid purchase. | Controlled Customer and approved payment | One matching payment/order and Member owned by intended Customer. |
| Reopen the Customer's Membership. | Same Member | Correct Level, dates/status and available promised benefits. |
| For an issue-ticket benefit, open the Customer's tickets for each named Event after the supported deadline. | Expected two Event tickets | Correct quantities, owner, Event dates and seats; no missing ticket. |
| Use the supported Member benefit or admission path when its eligibility window is open. | Correct benefit; appropriately timed test Event for admission | Discount, access counter, or ticket admission follows its specific rule; do not bypass a future Event's admission window. |
| Open Organizer Transactions, Membership and Event reporting. | Same Member/order | Money and issued results agree; original Membership sale not confused with benefit invoices. |

If generation is a separate supported issue/batch action, perform that action as the allowed Employee and then inspect each Member's result. Purchase receipt alone cannot prove later issuance.

## Renewal, transfer, expiry, and adjustments
Use independent Members/orders for immediate versus deferred renewal, supported transfer, expiry/exit, and Refund/Void. Inspect old/new Member status, promised Event tickets, seats/permissions, Customer ownership, credit/money and revenue allocation. Do not try every destructive lifecycle action on one Member.

For batch work, use [[00 Start Here/Showpass QA Handbook/Playbooks/18 Bulk Work Jobs and Repairs|recipient accounting and resume]]. Preserve the eligible list before starting; compare Member identities and each promised Event ticket, not only task totals.

## Senior-QA combinations
- Paid and Comp issuance; new Customer and existing/renewing Member.
- Group versus Level benefit inheritance; existing versus future Members after an allowed benefit edit.
- Missing/ineligible Event or exhausted Event capacity; correct rejection/pending state and no partial unexplained promise.
- Seat already owned, renewed seat, Member exit and causal release; unrelated Member must remain unchanged.
- Controlled partial batch failure/resume; no duplicated Membership/ticket on retry.
- Minimum permitted Employee; public versus affected Box Office/mobile paths; actual season/timezone boundary.

## Finish and sources
Record Group/Level/benefit setup, Member identities, per-Event tickets, money, seats and lifecycle results. Preserve original sale and adjustments. [Add Level](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/pages/detail/MembershipLevelsPage.web.tsx>) and [issue-ticket benefit form](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/benefit-modal/forms/MembershipBenefitIssueTicketsForm.web.tsx>).

## Source-backed cautions and automation reference

**Business risk:** a paid/complimentary membership exists but promised game tickets are missing, duplicated, owned by the wrong customer, or block seats after expiry. Anchors: SPD-2521, SPD-2625, SPD-2665.

**Automation:** browser purchase/benefit-save/recipient evidence using existing membership patterns; backend for batch failure/resume and renewal/seat/revenue transitions. Revenue realization requires actual runtime eligibility, not a stored opt-in alone. Source route: B6, B12, P2.
