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

The folders below separate **Organizer and Venue**, **Customer**, and **Staff Refunds**. Each Jira card keeps one canonical detail note and its local `TC-*` labels. The published base set now contains 16 Qase cases; see the publication table below for exact IDs. Other local drafts remain unpublished.

**Current source note (2026-10-02):** the earlier “not merged” notices for SPW-19669 and SPW-19670 were based on the 2026-09-24 checkout. The current local backend/frontend now contain the amount controls and delayed-barcode field. That is source evidence, not proof of deployment or execution. The exact customer-policy rollout flag is `enable_venue_policy_customer_self_refunds`, targeted by organization. See each guide for the other settings and permissions. No Qase, live browser, or branch/diff work was done for this reorganization.

## Qase base-case organization — published

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
| Created [SPT-5312](https://app.qase.io/case/SPT-5312) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-5: My Orders - Refunds - Block an order when one ticket cannot be returned\|SPW-19668 TC-5]] | Customer | My Orders - Refunds - Block an order when one ticket cannot be returned | my-orders, refunds | None | 3 |
| Created [SPT-5313](https://app.qase.io/case/SPT-5313) | [[SPW-19668-customer-refund-eligibility-test-cases#TC-8: My Orders - Refunds - Keep another customer from opening or returning an order\|SPW-19668 TC-8]] | Customer | My Orders - Refunds - Keep another customer from opening or returning an order | my-orders, refunds, authenticated-user | None | 4 |
| Created [SPT-5314](https://app.qase.io/case/SPT-5314) | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-1: My Orders - Refunds - Return one eligible ticket and receive the previewed organizer credit\|SPW-19671 TC-1]] | Customer | My Orders - Refunds - Return one eligible ticket and receive the previewed organizer credit | my-orders, refunds, post-purchase | None | 10 |
| Created [SPT-5315](https://app.qase.io/case/SPT-5315) | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-2: My Orders - Refunds - Return one ticket while keeping the other ticket\|SPW-19671 TC-2]] | Customer | My Orders - Refunds - Return one ticket while keeping the other ticket | my-orders, refunds, post-purchase | None | 9 |
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

The user approved this exact scope with “push it” on 2026-10-05: **three child-suite creates, six existing-case updates/moves, and ten new cases**. Readback matched every title, Description, Preconditions, Postconditions, tag, parameter, step action/data/expected result, and destination suite. Existing metadata was preserved. The parent has zero direct cases; its children contain exactly 7, 8, and 1 cases. No other case was created, moved, repurposed, or deleted. Local IDs and publication notes are synchronized; publication does not mean execution or acceptance sign-off.
