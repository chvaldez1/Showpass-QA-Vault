---
title: Customer Refunds - Start Here
jira: SPW-19666
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/runbook
  - refunds
---

# Customer refunds — start here

This is the working order for [SPW-19495](https://showpass.atlassian.net/browse/SPW-19495) and its [SPW-19666](https://showpass.atlassian.net/browse/SPW-19666) customer-refund subtasks. Start with [[SPW-19495-acceptance-criteria|all acceptance criteria]] to see what must pass, what needs a special setup, and what remains a source or execution question. **Organization** in Dashboard and **venue** in Admin mean the same business here.

| Order | Who does it | Guide | Jira card and detailed cases |
| --- | --- | --- | --- |
| 1. Prepare the organization | Organizer/Venue Employee plus an Admin for rollout and missing policy record | [[00 Organizer and Venue - How to Test]] | [[SPW-19667-customer-refund-policy-test-cases|SPW-19667]]: form, cutoffs, ticket/product switches, employee access, French and older settings page. |
| 2. Buy orders and inspect return choices | Customer | [[00 Customer - How to Test]] | [[SPW-19668-customer-refund-eligibility-test-cases|SPW-19668]]: allowed, blocked, mixed-order, cutoff and ownership behavior. |
| 3. Check amounts on new compatible orders | Organizer configures; Customer returns; permitted Employee checks Transactions | Same Organizer and Customer guides | [[SPW-19669-customer-refund-amount-rules-test-cases|SPW-19669]]: shipping, fees, preview/final amount. |
| 4. Check delayed barcode delivery | Admin configures Venue; Customer checks My Orders | Customer guide | [[SPW-19670-delayed-barcode-self-refund-test-cases|SPW-19670]]: before/after release, opt-in and blockers. |
| 5. Complete customer acceptance | Customer plus permitted Employee for financial/admission evidence | Customer guide | [[SPW-19671-customer-self-refund-acceptance-test-cases|SPW-19671]]: successful and failed returns, final state and no duplicate. |
| Separate employee path | Venue Employee and role administrator | [[00 Staff Refund Permissions - How to Test]] | [SPW-19326](https://showpass.atlassian.net/browse/SPW-19326): five employee refund-type permissions; separate from customer self-returns. |

The folders below separate **Organizer and Venue**, **Customer**, and **Staff Refunds**. Each Jira card keeps one canonical detail note and its local `TC-*` labels. The original 16-case publication has seven additional Customer cases, with two existing cases enhanced. See the current publication status below for exact IDs. Other local drafts remain unpublished.

**Current source note (2026-10-02):** the earlier “not merged” notices for SPW-19669 and SPW-19670 were based on the 2026-09-24 checkout. The current local backend/frontend now contain the amount controls and delayed-barcode field. That is source evidence, not proof of deployment or execution. The exact customer-policy rollout flag is `enable_venue_policy_customer_self_refunds`, targeted by organization. See each guide for the other settings and permissions. No Qase, live browser, or branch/diff work was done for this reorganization.

## Current Qase publication status — 2026-10-06

The user explicitly approved **“approve those nine changes”**. Exactly **two updates and seven creates** were applied in **[Customer (1108)](https://app.qase.io/project/SPT?suite=1108)**. Readback verified titles, descriptions, prerequisites, cleanup, parameters, tags, steps, suite, and case classifications against the approved drafts. Existing case IDs and supported views were preserved. No cases were deleted or moved.

| Action / Qase case | Local draft | Saved title | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- |
| Updated [SPT-5309](https://app.qase.io/case/SPT-5309) | 19668 TC-1 | My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it | my-orders, refunds | ItemType: TicketType, Product, StandaloneProduct, AssignedSeat, TicketPackage | 13 |
| Updated [SPT-5314](https://app.qase.io/case/SPT-5314) | 19671 TC-1 | My Orders - Refunds - Return purchased items and receive the previewed organizer credit | my-orders, refunds, post-purchase | PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage | 13 |
| Created [SPT-5321](https://app.qase.io/case/SPT-5321) | 19668 TC-4 | My Orders - Refunds - Require the whole remaining order - Include every remaining purchase in the preview | my-orders, refunds | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 7 |
| Created [SPT-5322](https://app.qase.io/case/SPT-5322) | 19668 TC-10 | My Orders - Refunds - Require the whole remaining order - Block the order until every remaining item allows refunds | my-orders, refunds, edge-case | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct | 12 |
| Created [SPT-5323](https://app.qase.io/case/SPT-5323) | 19668 TC-11 | My Orders - Refunds - Require the whole remaining order - Keep package purchases paid when selection is unavailable | my-orders, refunds, edge-case | PackageConfiguration: TicketPackage, TicketProductPackage | 6 |
| Created [SPT-5324](https://app.qase.io/case/SPT-5324) | 19671 TC-5 | My Orders - Refunds - Require the whole remaining order - Return every remaining purchase for organizer credit | my-orders, refunds, post-purchase | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 13 |
| Created [SPT-5325](https://app.qase.io/case/SPT-5325) | 19668 TC-6 | My Orders - Refunds - After barcode delivery - Block or allow customer refunds | my-orders, refunds, edge-case | None | 12 |
| Created [SPT-5326](https://app.qase.io/case/SPT-5326) | 19668 TC-12 | My Orders - Refunds - After fulfillment or shipping - Block or allow customer refunds for a fulfilled product | my-orders, refunds, edge-case | None | 12 |
| Created [SPT-5327](https://app.qase.io/case/SPT-5327) | 19668 TC-13 | My Orders - Refunds - After check-in or scan - Block or allow customer refunds for a checked-in ticket | my-orders, refunds, edge-case | None | 12 |

SPT-5312 and SPT-5315 already have the exact **Block when any remaining item is ineligible** and **Refund eligible items independently** choices in their verified titles. The [[00 Customer - How to Test#Find a case by the setting name|Customer guide]] links each policy choice to its saved cases.

**Execution and remaining scope:** these are verified Qase definitions, not executed tests. No customer orders, payments, credits, inventory, fulfillment, or scans were changed. SPT-5323 checks the current package-selection limitation; it does not prove successful package returns or a live defect. Customer-side refund-amount drafts remain unpublished; SPT-5308 covers saving amount settings only. Already-returned-item whole-order coverage and the other documented deferred checks remain outstanding.

**Evidence:** approved plan `/private/tmp/qase-refund-restriction-remaining-batch.json`; dry run `/private/tmp/qase-refund-restriction-remaining-dry-run.json`; successful apply and update verification `/private/tmp/qase-refund-restriction-remaining-applied.json`; full create readback `/private/tmp/qase-refund-restriction-created-full-verification.json`. The required [[05 Tooling/qasectl]] batch writer was used. The older proposal and publication sections below are history; their pending labels describe the state before this approval and are superseded by this current status.

## Amount-rule review — 2026-10-07

[[SPW-19669-customer-refund-amount-rules-test-cases|SPW-19669]] now contains a 16-combination enhancement for existing **SPT-5308**, four-rule shipping checks, four fee-selection checks, and a changed-amount recovery case. The user approved the revised SPT-5308 update; it was saved and verified 2026-10-07 with two separate four-value parameters and 13 steps. No other case changed. Customer TC-2–TC-4 remain local and unexecuted. Exact ticket shipping setup is now documented; separate original tax/fee values and full stored-component evidence still need an approved finance/backend comparison. The reviewed saved backend origin/develop now supports the ticket/product switches; this supersedes the older checkout mismatch only for the revisions listed in that note.

## Qase base-case organization — publication history, 2026-10-05

**Published and verified 2026-10-05 after user approval.** The base set contains **6 updated existing cases + 10 new cases**. No manual cases have been executed. Each selected case has its own permissions, preparation, steps, expected results, and cleanup. Other cases remain in their Jira notes; this is not complete release coverage.

Three child suites are saved under [Customer Refunds (1091)](https://app.qase.io/project/SPT?suite=1091):

* **[Organizer and Venue (1107)](https://app.qase.io/project/SPT?suite=1107):** seven cases for policy and item settings, cutoffs, validation, employee access, defaults, and the amount-settings form.
* **[Customer (1108)](https://app.qase.io/project/SPT?suite=1108):** eight cases for item on/off, blocked outcome, deadlines, mixed-order blocking, ownership, full/partial returns, and a rule changed before confirmation.
* **[Staff Refunds (1109)](https://app.qase.io/project/SPT?suite=1109):** one case with no refund-type permissions and only Partial Refund permission as its two parameter values.

The parent suite and existing SPT IDs are preserved. SPT-5250–5255 are now in Organizer and Venue. New IDs are SPT-5308–5317. Jira traceability and local TC labels stay in this map, outside Qase case fields.

### Published case list

| Write | Local case | Destination | Qase title | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| Updated [SPT-5250](https://app.qase.io/case/SPT-5250) | [[SPW-19667-customer-refund-policy-test-cases#TC-1: Dashboard - Refunds - Review and save the organization's customer refund settings\|SPW-19667 TC-1]] | Organizer and Venue | Dashboard - Refunds - Review and save the organization's customer refund settings | dashboard, refunds | Language: English, French | 21 |
| Updated [SPT-5251](https://app.qase.io/case/SPT-5251) | [[SPW-19667-customer-refund-policy-test-cases#TC-2: Dashboard - Refunds - Change when customer refunds close\|SPW-19667 TC-2]] | Organizer and Venue | Dashboard - Refunds - Change when customer refunds close | dashboard, refunds | Language: English, French; CutoffScenario: AbsoluteDateTime, EventHours, EventDays, ItemHours, ItemDays, NoCutoff, ManuallyClosed | 7 |
| Updated [SPT-5252](https://app.qase.io/case/SPT-5252) | [[SPW-19667-customer-refund-policy-test-cases#TC-3: Dashboard - Refunds - Reject a refund cutoff with missing or invalid details\|SPW-19667 TC-3]] | Organizer and Venue | Dashboard - Refunds - Reject a refund cutoff with missing or invalid details | dashboard, refunds, edge-case | Language: English, French; InvalidCutoff: MissingDateTime, MissingValue, MissingUnit, ZeroValue, NegativeValue | 9 |
| Updated [SPT-5253](https://app.qase.io/case/SPT-5253) | [[SPW-19667-customer-refund-policy-test-cases#TC-5: Dashboard - Refunds - Keep a ticket or product refund choice when the organization policy changes\|SPW-19667 TC-5]] | Organizer and Venue | Dashboard - Refunds - Keep a ticket or product refund choice when the organization policy changes | dashboard, refunds | Language: English, French; ItemType: TicketType, Product | 20 |
| Updated [SPT-5254](https://app.qase.io/case/SPT-5254) | [[SPW-19667-customer-refund-policy-test-cases#TC-7: Dashboard - Refunds - Let an employee edit tickets without access to organization refund settings\|SPW-19667 TC-7]] | Organizer and Venue | Dashboard - Refunds - Let an employee edit tickets without access to organization refund settings | dashboard, refunds, employee-permissions | None | 10 |
| Updated [SPT-5255](https://app.qase.io/case/SPT-5255) | [[SPW-19667-customer-refund-policy-test-cases#TC-10: Dashboard - Refunds - Check the starting refund settings for a new organization, ticket, and product\|SPW-19667 TC-10]] | Organizer and Venue | Dashboard - Refunds - Check the starting refund settings for a new organization, ticket, and product | dashboard, refunds | Language: English, French | 11 |
| Created [SPT-5308](https://app.qase.io/case/SPT-5308) | [[SPW-19669-customer-refund-amount-rules-test-cases#TC-1: Dashboard - Refunds - Save shipping and fee choices\|SPW-19669 TC-1]] | Organizer and Venue | Dashboard - Refunds - Save shipping and fee choices | dashboard, refunds | None | 12 |
| Created [SPT-5309](https://app.qase.io/case/SPT-5309) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-1: My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it\|SPW-19668 TC-1]] | Customer | My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it | my-orders, refunds | ItemType: TicketType, Product | 7 |
| Created [SPT-5310](https://app.qase.io/case/SPT-5310) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-2: My Orders - Refunds - Block a customer return when the organization outcome is blocked\|SPW-19668 TC-2]] | Customer | My Orders - Refunds - Block a customer return when the organization outcome is blocked | my-orders, refunds | None | 4 |
| Created [SPT-5311](https://app.qase.io/case/SPT-5311) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-3: My Orders - Refunds - Stop a return after the saved deadline\|SPW-19668 TC-3]] | Customer | My Orders - Refunds - Stop a return after the saved deadline | my-orders, refunds, edge-case | CutoffScenario: Absolute, EventStart, ItemStart, ManuallyClosed | 6 |
| Created [SPT-5312](https://app.qase.io/case/SPT-5312) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-5: My Orders - Refunds - Block when any remaining item is ineligible - Block the entire order\|SPW-19668 TC-5]] | Customer | My Orders - Refunds - Block an order when one ticket cannot be returned | my-orders, refunds | None | 3 |
| Created [SPT-5313](https://app.qase.io/case/SPT-5313) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-8: My Orders - Refunds - Keep another customer from opening or returning an order\|SPW-19668 TC-8]] | Customer | My Orders - Refunds - Keep another customer from opening or returning an order | my-orders, refunds, authenticated-user | None | 4 |
| Created [SPT-5314](https://app.qase.io/case/SPT-5314) | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-1: My Orders - Refunds - Return purchased items and receive the previewed organizer credit\|SPW-19671 TC-1]] | Customer | My Orders - Refunds - Return one eligible ticket and receive the previewed organizer credit | my-orders, refunds, post-purchase | None | 10 |
| Created [SPT-5315](https://app.qase.io/case/SPT-5315) | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-2: My Orders - Refunds - Refund eligible items independently - Return one ticket and keep the blocked ticket\|SPW-19671 TC-2]] | Customer | My Orders - Refunds - Return one ticket while keeping the other ticket | my-orders, refunds, post-purchase | None | 9 |
| Created [SPT-5316](https://app.qase.io/case/SPT-5316) | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-3: My Orders - Refunds - Stop a return if the refund deadline changes before confirmation\|SPW-19671 TC-3]] | Customer | My Orders - Refunds - Stop a return if the refund deadline changes before confirmation | my-orders, refunds, edge-case | None | 10 |
| Created [SPT-5317](https://app.qase.io/case/SPT-5317) | [[00 Staff Refund Permissions - How to Test#TC-1: Dashboard - Refunds - Limit refund choices to the employee's permissions\|SPW-19326 TC-1]] | Staff Refunds | Dashboard - Refunds - Limit refund choices to the employee's permissions | dashboard, refunds, employee-permissions | PermissionScenario: NoRefundTypes, OnlyPartialRefund | 9 |

### Existing-case preservation

**Enhanced SPT-5250–5255.** Titles, purposes, Dashboard/Desktop coverage, English/French and cutoff/item parameters, tags, priorities, and unrelated Qase metadata were preserved. Prerequisites now include the exact organization rollout flag. SPT-5250 includes Refund amounts controls; SPT-5255 includes untouched amount defaults. No assertion or parameter was removed. All six cases are saved in Organizer and Venue (1107).

### Read and dry-run evidence

* One complete read scanned **1,781 SPT cases** and **255 suites**, then filtered locally for refund/return titles, refund tags, ownership, and refund-type permissions. Before publication, suite 1091 contained SPT-5250–5255 and had no child suites.
* No existing equivalent was found for the ten proposed cases. **SPT-4757** already covers the base Manage Transactions permission; retain it in its current suite and reference it for the additional Staff check. Refund-protection claims are separate from these customer self-returns.
* The required script completed a **16-operation content dry run**. Existing cases use selected-field updates for Description, Preconditions, Postconditions, and Steps. New-case tags and parameters parse correctly; supported views and existing parameters are preserved.
* The staging plan was not applied. The final batch resolved destination IDs 1107, 1108, and 1109, included `suite_id` in existing-case updates, passed the final dry run, and applied all 16 operations through the required batch script.
* Final evidence: `/private/tmp/qase-refunds-final-dry-run.json`, `/private/tmp/qase-refunds-published-batch.json`, and `/private/tmp/qase-refunds-publication-verification.json`. Full stored case details are in `/private/tmp/qase-refunds-published-case-details.json`. The write followed [[05 Tooling/qasectl]] using `05 Tooling/scripts/create-or-update-qase-case.mjs`.
* The three proposed suite titles use parent 1091, as supported by [Qase's official suite API](https://developers.qase.io/reference/create-suite). The three suite titles and parent 1091 were verified after creation.

### Checks outside this first publication

| Local checks | Classification for this batch | Reason / remaining proof |
| --- | --- | --- |
| 19667 TC-4, TC-6, TC-8, TC-9, TC-11, TC-12 | Deferred; remain local | Independent restriction saves, discarded changes, organization isolation, copied ticket type, older settings entry, unchanged staff controls. |
| 19668 TC-4, TC-6 | Deferred; remain local | Whole-order selection and barcode/fulfillment/check-in matrix. Required before full acceptance sign-off. |
| 19668 TC-7 | Blocked for publication setup | Legacy control needs documented preparation for an unreleased delayed-delivery ticket outside rollout. |
| 19669 TC-2 | Blocked for publication setup | Need supported ticket checkout with nonzero shared shipping and visible per-ticket shipping state. Products cannot substitute under ticket-only amount rules. |
| 19669 TC-3 | Blocked for publication evidence setup | Need a new order with an independently recorded customer-paid Showpass fee and an accessible view for comparing fee components. Current policy determines fee selection at preview/submit; purchase time does not freeze that choice. |
| 19670 TC-1–TC-2 | Blocked for publication setup | Venue opt-in is known; exact delayed-delivery and scheduled-release preparation is incomplete. “Schedule release” is not an executable prerequisite by itself. |
| 19671 TC-4 | Deferred; remain local | Separate duplicate-return regression extends the base successful-return check, which already checks one credit and an unselectable returned ticket. |
| Staff full type matrix, completed employee refund, switch off, older dialog | Deferred / qualification in Staff guide | Base covers denial and Partial Refund. Full admin refund visibility differs from Jira; current source removed old-page navigation. Direct-request enforcement remains API/backend coverage. |

### Publication verification

The user approved this exact scope with “push it” on 2026-10-05: **three child-suite creates, six existing-case updates/moves, and ten new cases**. Readback matched every title, Description, Preconditions, Postconditions, tag, parameter, step action/data/expected result, and destination suite. Existing metadata was preserved. The parent has zero direct cases; its children contain exactly 7, 8, and 1 cases. No other case was created, moved, repurposed, or deleted. This readback describes the 2026-10-05 publication; the 2026-10-06 item-configuration enhancements below are local drafts until approved and applied. Publication does not mean execution or acceptance sign-off.


## Historical item-configuration proposal — 2026-10-06

**Working scope: SPT-5309 and SPT-5314 only.** Both were read by exact ID; no search, gap analysis, Jira write, live checkout, or Qase update was performed. Their current suite is Customer (1108). The enhanced standalone case fields are in the existing Customer notes. This is an **Enhance** change: keep the original ticket and product runs, original user flows, tags, suite, and supported views; add concrete purchase configurations and more specific result checks.

| Existing Qase case | Local case | Proposed configuration coverage | Preserved scope | Proposed field changes |
| --- | --- | --- | --- | --- |
| [SPT-5309](https://app.qase.io/case/SPT-5309) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-1: My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it\|19668 TC-1]] | ItemType: TicketType, Product (checkout add-on), StandaloneProduct, AssignedSeat, TicketPackage (Preset, single barcode). | WebPublic/Desktop; item off → on; fresh preview; Cancel leaves purchase paid. | Description, Preconditions, Postconditions, Steps, params. Title unchanged. |
| [SPT-5314](https://app.qase.io/case/SPT-5314) | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-1: My Orders - Refunds - Return purchased items and receive the previewed organizer credit\|19671 TC-1]] | PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage (Preset, single barcode). | WebPublic/Desktop and Mobile; preview → confirmation → success; returned state; no second return; matching Organizer Credit and Transactions. | Title broadened to purchased items; Description, Preconditions, Postconditions, Steps, params. |

**Corrected expectations:** when every purchase is blocked, the return modal uses its blocked-message screen; do not require a disabled list that the current frontend does not show. In the basic amount path, returning one ticket plus one product creates one credit record for each selected purchase row; compare their sum to the single displayed preview total. Neither correction removes the original blocking, credit, or no-duplicate proof. No completed-return case here proves a refund to the customer's card.

The complete item/configuration coverage and remaining boundaries are in [[00 Customer - How to Test#Purchase configurations and coverage boundaries|the Customer guide]]. The user confirmed “ticket products” means a ticket + product package. TicketAndProduct is a different configuration: admission plus a separately priced add-on. Eligibility TC-9 documents the actual ticket + product package setup and the current-source blocked selection. TC-9 remains local and is not part of the two existing-case updates.

**Readback baseline:** `/private/tmp/qase-refund-item-scope-before.json`. **Proposed update batch:** `/private/tmp/qase-refund-item-scope-batch.json`; apply is not authorized yet. The saved 2026-10-05 publication table above remains historical and does not describe these pending fields.

### Two-case dry run

The required batch writer completed a read-only preview on **2026-10-06**: exactly two updates, no creates or moves. Both remain in **Customer (1108)**. Evidence: `/private/tmp/qase-refund-item-scope-dry-run.json`.

| Qase case / local label | Title | Tags retained | Parameters after update | Steps |
| --- | --- | --- | --- | --- |
| SPT-5309 / 19668 TC-1 | My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it | my-orders, refunds | ItemType: TicketType, Product, StandaloneProduct, AssignedSeat, TicketPackage | 13 |
| SPT-5314 / 19671 TC-1 | My Orders - Refunds - Return purchased items and receive the previewed organizer credit | my-orders, refunds, post-purchase | PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage | 13 |

Copy-to-Qase review confirmed the original scenarios and views are retained, each setup table stays in the Description, and no local labels, Jira commentary, generic QA-environment requirement, or cross-case setup dependency appears in execution fields. Tags, suite, priorities, and unrelated metadata are excluded from the update payload. **Apply remains pending explicit user approval.** Eligibility TC-9 is a separate local ticket + product package check and is excluded from this update batch. No manual checkout, return, barcode scan, credit change, or seating release was executed.

## Whole-order item-configuration update — 2026-10-06

The whole-order drafts now identify each purchased item and the exact configuration inside standalone case fields. The original two-ticket preview/Cancel flow is retained and expanded; no published case or pending Qase batch was applied or replaced.

| Local case | Purchase configuration | Proof | Publication / execution |
| --- | --- | --- | --- |
| 19668 TC-4 | TwoTicketTypes, TicketAndProduct (separate add-on), TwoAssignedSeats | Both purchases required in the preview; individual deselection unavailable; Cancel leaves both paid. | Local, unexecuted. |
| 19671 TC-5 | TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | Completed whole-order return; both returned; correct previewed credit total, original-purchase credit record count, no repeated return; both individual seats released. | New local draft, unexecuted. |
| 19668 TC-10 | TwoTicketTypes; TicketAndProduct; one switch off | Whole order blocked, then the same order becomes selectable after the blocked item's switch is enabled; Cancel preserves both. | New local draft, unexecuted. |
| 19668 TC-11 | Single-barcode Preset TicketPackage; separate-barcode TicketProductPackage | Current frontend filters prevent usable whole-order selection; package and included items remain paid. | New local draft; source-based integration concern, not live reproduced or successful-return acceptance. |

Backend `customer_return_eligibility.py` checks every remaining item; frontend My Orders `ReturnOrderItemSelection.web.tsx` disables individual selection and `utils/order-actions/return-order.ts` rejects whole-order selections omitting hidden package entries. The source therefore does not justify using these packages as positive whole-order parameters. An order containing an already-returned item still needs a dedicated case and preparation recipe; that gap remains explicit in the Customer guide. The existing two-case Qase update plan still contains only SPT-5309 and SPT-5314 and remains pending approval.

**Copy-to-Qase check:** the required writer parsed all four standalone whole-order drafts locally: eligibility TC-4 (7 steps), TC-10 (12), TC-11 (6), completion TC-5 (13). Parameter counts are 3, 2, 2, and 3. No local labels, Jira commentary, generic QA-environment wording, or shared-setup references appear in their execution fields. This was local parsing only, not a Qase API preview, publication, or execution.

## Historical six-operation proposal — item setup and whole-order cases, 2026-10-06

Following the user's request to update Qase, the concrete proposal is **two existing-case enhancements plus four new whole-order cases**, all in **Customer (1108)**. No writes have been applied. The required dry run passed with six operations; the previous two-case proposal is superseded for this proposed publication. Exact-scope confirmation is required under [[05 Tooling/qasectl]].

| Action | Local case | Title | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- |
| Update SPT-5309 | SPT-5309 / local TC-1 | My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it | my-orders, refunds | ItemType: TicketType, Product, StandaloneProduct, AssignedSeat, TicketPackage | 13 |
| Update SPT-5314 | SPT-5314 / local TC-1 | My Orders - Refunds - Return purchased items and receive the previewed organizer credit | my-orders, refunds, post-purchase | PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage | 13 |
| Create | 19668 TC-4 / whole-order preview | My Orders - Refunds - Require every remaining purchase in a whole-order return | my-orders, refunds | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 7 |
| Create | 19668 TC-10 / blocked remaining item | My Orders - Refunds - Block a whole-order return until every remaining item allows refunds | my-orders, refunds, edge-case | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct | 12 |
| Create | 19668 TC-11 / whole-order package selection | My Orders - Refunds - Keep package purchases paid when whole-order selection is unavailable | my-orders, refunds, edge-case | PackageConfiguration: TicketPackage, TicketProductPackage | 6 |
| Create | 19671 TC-5 / completed whole-order return | My Orders - Refunds - Return every remaining purchase and receive the whole-order credit | my-orders, refunds, post-purchase | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 13 |

**Duplicate check:** one read-only project snapshot scanned **1,794 SPT cases**, then filtered locally for Customer suite 1108, refund/return titles, whole-order/remaining-item wording, and package returns. Existing package refund cases SPT-2873, SPT-2876, and SPT-3761 concern employee/seat adjustment workflows; protection cases concern claims. Existing SPT-5312 uses Block when any remaining item is ineligible, while SPT-5315 proves independent partial return. None duplicates the proposed whole-order customer scenarios.

**Preservation:** SPT-5309 retains its original TicketType/Product off → on and Cancel flow, title, tags, suite, and Desktop view. SPT-5314 retains the original completed-ticket return, credit/transaction checks, tags, suite, and Desktop/Mobile views; its title is broadened for the additional items. Selected-field updates preserve unrelated Qase metadata. The four creates have different proof targets (selection/Cancel, completed return, blocked-item recovery, package-selection protection), so they remain separate; equivalent purchases are parameters within each case.

**Important qualification:** package TC-11 records current-source blocked selection. It is not successful package-return acceptance or a live reproduced defect. Already-returned-item whole-order coverage remains deferred. Eligibility TC-9, restriction TC-6, and other deferred drafts are excluded. No cases or suites will be moved or deleted.

**Evidence:** `/private/tmp/qase-refund-config-publication-all-cases.json`, `qase-refund-config-publication-candidates.json`, `qase-refund-config-publication-batch.json`, `qase-refund-config-publication-dry-run.json`, and `qase-refund-config-publication-review.json`. Apply is pending explicit approval of this six-operation scope. No customer orders, payments, credits, inventory, or scans were executed.

## Restriction-title proposal and approval history — 2026-10-06

**Requested authorization:** the user asked that every restriction be findable from its test title and explicitly wrote **“fix please (early approval)”**. Automatic approval review rejected the proposed eleven-operation apply because it interpreted that approval as title fixes only, not seven creations plus four updates. The eleven-operation batch did not execute. The safer title-only scope below was subsequently applied; the other nine operations require explicit approval.

The required dry run passed: **four existing-case updates and seven creates**, all in **Customer (1108)**. Existing tags, suites, supported views, priorities, and unrelated metadata are preserved; SPT-5312 and SPT-5315 receive title-only updates. Each of the three former TC-6 restriction rows becomes its own case because delivery, shipping fulfillment, and admission require different setup. No original restriction is removed.

| Action | Local label | Title | Parameters | Steps |
| --- | --- | --- | --- | --- |
| Update SPT-5309 | SPT-5309 / local TC-1 | My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it | ItemType: TicketType, Product, StandaloneProduct, AssignedSeat, TicketPackage | 13 |
| Update SPT-5314 | SPT-5314 / local TC-1 | My Orders - Refunds - Return purchased items and receive the previewed organizer credit | PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage | 13 |
| Create | 19668 TC-4 / whole-order preview | My Orders - Refunds - Require the whole remaining order - Include every remaining purchase in the preview | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 7 |
| Create | 19668 TC-10 / blocked remaining item | My Orders - Refunds - Require the whole remaining order - Block the order until every remaining item allows refunds | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct | 12 |
| Create | 19668 TC-11 / whole-order package selection | My Orders - Refunds - Require the whole remaining order - Keep package purchases paid when selection is unavailable | PackageConfiguration: TicketPackage, TicketProductPackage | 6 |
| Create | 19671 TC-5 / completed whole-order return | My Orders - Refunds - Require the whole remaining order - Return every remaining purchase for organizer credit | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 13 |
| Create | 19668 TC-6 / After barcode delivery | My Orders - Refunds - After barcode delivery - Block or allow customer refunds | None | 12 |
| Create | 19668 TC-12 / After fulfillment or shipping | My Orders - Refunds - After fulfillment or shipping - Block or allow customer refunds for a fulfilled product | None | 12 |
| Create | 19668 TC-13 / After check-in or scan | My Orders - Refunds - After check-in or scan - Block or allow customer refunds for a checked-in ticket | None | 12 |
| Update SPT-5312 | SPT-5312 / 19668 TC-5 / Block when any remaining item is ineligible | My Orders - Refunds - Block when any remaining item is ineligible - Block the entire order | preserved | preserved |
| Update SPT-5315 | SPT-5315 / 19671 TC-2 / Refund eligible items independently | My Orders - Refunds - Refund eligible items independently - Return one ticket and keep the blocked ticket | preserved | preserved |

**Tags:** my-orders, refunds for eligibility/whole-order preview and SPT-5312; add edge-case for restriction, blocked-recovery, and package cases; add post-purchase for completed-return cases and SPT-5315. Existing tags are retained rather than rewritten.

**Sources and qualification:** source review verified Standard Shipping is needed before a product can be marked Fulfilled, Scan Tickets permission is needed for that update, and the visible controls are Update → Confirm. The check-in case has a recorded active scan window and successful admission. Every new restriction case changes Block → Allow, verifies saved values, previews, and cancels. No live state is inferred from the supplied screenshot. Package whole-order success remains an implementation concern, and already-returned-item whole-order coverage remains deferred.

**Duplicate review:** reuse the fresh 1,794-case snapshot and filter locally for refund/return plus barcode/fulfillment/shipping/check-in/scan and mixed-order terms. Related staff refund warnings, refund-protection coverage, and saved amount controls do not duplicate customer restriction selection. No equivalent new customer restriction or whole-order case was identified.

**Plan and preview:** `/private/tmp/qase-refund-restriction-titles-batch.json`, `/private/tmp/qase-refund-restriction-titles-dry-run.json`. Apply/readback will be recorded below; no customer data was executed.

### Title fixes and initial approval-review result

**Applied and verified 2026-10-06:** SPT-5312 → **My Orders - Refunds - Block when any remaining item is ineligible - Block the entire order**; SPT-5315 → **My Orders - Refunds - Refund eligible items independently - Return one ticket and keep the blocked ticket**. Only Title changed. Readback preserved suite 1108, tags, parameters, priority/type/behavior/layer, and step counts 3 and 9. Evidence: `/private/tmp/qase-refund-restriction-title-only-batch.json`, `qase-refund-restriction-title-only-dry-run.json`, `qase-refund-restriction-title-only-applied.json`.

**Initially withheld, now resolved:** SPT-5309/SPT-5314 content enhancements and seven new cases (19668 TC-4, TC-6, TC-10, TC-11, TC-12, TC-13; 19671 TC-5) were withheld after the initial automatic review rejection. The remaining nine-operation plan `/private/tmp/qase-refund-restriction-remaining-batch.json` passed a separate dry run at `qase-refund-restriction-remaining-dry-run.json`. The user's later explicit approval authorized all nine changes; they were applied and verified as recorded in Current Qase publication status above. No customer data was executed.
