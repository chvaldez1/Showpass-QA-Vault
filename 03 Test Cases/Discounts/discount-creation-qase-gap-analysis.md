---
title: Discount Creation — Qase Gap Analysis
date: 2026-10-04
tags:
  - qa/discounts
  - qase
status: Read-only analysis complete; proposed coverage unexecuted
---

# Discount Creation — Qase Gap Analysis

**Recommendation:** enhance the existing single, bulk, and automatic creation cases; add four focused drafts for event entry paths, bulk validation, employee permissions, and automatic-discount capacity. Basic creation is already represented in Qase. The gaps are specificity, persistence, recovery, and permission proof.

**V1 delivery:** treat the creation refactor and BOGO as phased work. This note protects current single/bulk/automatic creation. Wizard-only controls remain deferred until the candidate implementation is available; differences from the BOGO planning notes are phase/revision differences, not confirmed deployed defects. See [[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20664-wizard|Organizer V1 wizard]] and [[03 Test Cases/Discounts/BOGO/00 Start Here|BOGO handbook]].

No Qase writes, browser testing, discount creation, configuration changes, or purchases were performed. Source inspection and Qase reads establish coverage recommendations, not passing test results.

## Testing Intent

We are testing whether an organizer can create the intended discount while permissions, eligible items, and saved terms stay correct; an incorrect configuration can discount the wrong purchase or block a sale, so proof requires reopening the saved discount and redeeming that same configuration through existing checkout coverage.

| Field | Answer |
| --- | --- |
| Criticality / invariant | Financial math, permission boundary, async final state; only authorized employees create discounts, with exactly the selected terms and targets. |
| Actor impact / failure | Organizers, customers, and Box Office employees; unauthorized offers, incorrect savings, unusable codes, duplicate batches, or lost settings. |
| Observable proof | One saved record; fresh edit form matches inputs; bulk codes reach the requested count; eligible checkout uses those saved terms. |
| Source of truth / confidence | Backend contract first, frontend paths second, Qase steps and Playwright patterns compared; high confidence in current source, limited confidence in future wizard behavior. |
| Primary surfaces | Dashboard creation; public checkout, Widget, and Box Office as downstream consumers. |
| In scope | Single codes, bulk batches, automatic discounts; fresh/duplicate/event-specific entry; defaults, selectors, validation, permissions, dates, save/reopen, cancellation, rejected save, and generation handoff. |
| Out of scope | Membership benefit editor, ticket credits, tiered ticket-type pricing, BOGO creation, imports, and exhaustive payment/refund/exchange matrices. These have separate workflows; reuse existing checkout/lifecycle cases for the created discount. No branch or PR comparison was requested. |

## Proof Target Map

| Target | Coverage |
| --- | --- |
| P1 — Saved type, amount, item selection, limits, dates, and locations match the intended offer. | Enhance SPT-1718/1743/1745/1749/4391; TC-1. |
| P2 — Invalid, discarded, or rejected creation leaves no unintended discount and permits correction. | Enhance SPT-481/1718/4892; TC-2/TC-4; failure automation below. |
| P3 — The minimum allowed employee succeeds; a missing permission cannot create the protected discount. | TC-3; API permission/ownership checks. |
| P4 — Bulk generation produces exactly the requested usable codes and reports unfinished work accurately. | Enhance SPT-4891; existing bulk lifecycle note; TC-2. |
| P5 — The newly saved configuration produces the expected checkout savings. | Enhance SPT-3306, bind SPT-3308/3311 to the created record, and reuse existing create-and-use automation. |

## Qase Search and Existing Coverage

Read on 2026-10-04, project **SPT**. One paginated bulk case scan and suite read, followed by local filtering and selected full-case reads. All requests were GET requests.

* **1,781 cases scanned.** Title/tag filter: case-insensitive `discount|promo(tion)?|coupon|bogo`; **70 matches**.
* Dashboard discount suites: **194**, **469 Single Discounts**, **470 Auto Discounts**, **471 Bulk Discounts**, **948 Core - Discounts**; **28 cases** in these suites, all already among the 70 matches.
* Description/precondition/step filter for `discount|coupon|bogo` found **29 additional body-only matches**. These were screened for creation relevance. SPT-5132 concerns ticket-type tiered pricing, not this discount-code form.
* **22 full detail reads:** SPT-481, 1718, 1743, 1745, 1749, 1759, 1760, 1761, 3474, 3475, 3476, 3480, 3481, 3483, 3484, 3485, 4391, 4891, 4892, 3306, 3308, 3311. SPT-5132 was reviewed from the full bulk payload.
* Temporary responses: `/private/tmp/qase-discount-creation-{all,matches,details,suites}.json`. No run history was queried; case existence is not execution evidence.

| Existing case(s) | What the steps already prove | Gap / local recommendation |
| --- | --- | --- |
| SPT-1718, 5 steps; suite 469 | Single form sections/defaults and leaving without saving. | Defaults are described as “valid/usable,” without exact values. Keep its no-save purpose; add filled-form discard. |
| SPT-1743, 6 steps; suite 469 | Single creation, percentage/fixed amount and once/each variants, list result. | Input values and item selection are vague; “open or inspect the row” does not require fresh edit hydration. Enhance, do not duplicate. |
| SPT-1745, 6 steps; suite 471 | Bulk creation with the same amount/application combinations. | No exact count, selected child items, fresh edit comparison, or usable generated-code proof. Enhance with SPT-4891. |
| SPT-1749, 7 steps; suite 470 | Automatic creation with three requirement types and event/product/membership/all-item selections. | Four coupled axes lack concrete setup; checkout is conditional on another case. Make created-record checkout proof mandatory in the selected execution set. |
| SPT-481, 6 steps; suite 469 | Required fields, duplicate code, amount/date/item errors. | Accepted-location rejection is in its description but absent from steps; case-insensitive duplicate recovery and unchanged inputs are unspecified. |
| SPT-4892, 6 steps; suite 470 | Missing tier fields, intermediate maximum, invalid/overlapping ranges, change of requirement type. | Add exact equality boundaries and a saved/reopened corrected rule; preserve all requirement/invalid-rule values. |
| SPT-4391, 6 steps; suite 948 | Currently active, scheduled, expired, no-end-date acceptance at checkout. | No timezone comparison, saved/reopened clock values, or clearing previously selected custom dates. |
| SPT-4891, 6 steps; suite 471 | Progress, edit lock, completion, CSV, immutable fields. | “If visible” can skip the unfinished state; failure/resume/duplicate delivery need controlled backend checks. CSV count alone does not prove redemption scope. |
| SPT-1759/1760/1761, 6 steps each | Editing and persistence; bulk locks after generation. | Useful regressions for shared form changes. Keep these edit cases separate from fresh creation. |
| SPT-3474/3475/3476, 6/6/5 steps | Duplicate form copies settings and creates an independent record. | Automatic-name uniqueness and bulk-prefix uniqueness are not established requirements. Replace ambiguous wording with observed copy behavior; check the source remains unchanged. |
| SPT-3480/3481, 6/5 steps | Event filtering on the organization-wide list. | Neither proves event-specific creation/preselection. SPT-3480 also has shifted/missing expected results; repair wording without repurposing it. |
| SPT-3483/3484/3485, 5 steps each | Activate/deactivate operations. | Reuse for cleanup/status regressions; fresh inactive creation is distinct. |
| SPT-3306/3308/3311, 5 steps each | SPT-3308 reaches automatic checkout completion; SPT-3311 rejects invalid codes. SPT-3306 has generic placeholder steps and stops at basket application. | Make SPT-3306 executable with concrete application and completed-order proof; bind all three to newly created records. Prepared codes alone do not prove the creation handoff. |

**Preservation baseline:** keep each existing title/purpose, suite, tags, supported surfaces, useful assertions, and meaningful parameter combinations. SPT-1743/1745 have four amount/application combinations; SPT-1749 additionally has three requirement types and four item-scope values; SPT-4391 has four date states; edit and validation cases retain their current field/error variants. Recommendations are additive. No replacement payload, parameter restructuring, or Qase update is included here.

## Source-backed Behavior and Entry Paths

Snapshot after the fresh pull: backend `96563466a9428cbe81e79ec886a73e230be24dcf`; frontend `c84fbb7ad2eda311be8dcf79fbf6d187444f33d4`; Playwright `8339dc4501b3f572dd7ba074b2a574989c56c5c9`.

* **Permissions differ:** the Dashboard page and single/automatic write API require **Manage Events**. Bulk write API requires **Manage Transactions**; using the Dashboard bulk form therefore requires both. Seeing the creation menu does not prove permission to save a bulk batch.
* **Automatic availability:** current backend requires venue `allow_auto_discount=true` and Standard/Premium pricing. The frontend checks `allow_auto_discount` for menu/tab/form availability. Active automatic count must fit `active_auto_discount_limit`; plan/capacity rejection still belongs to the server. This ordinary automatic workflow does not require the BOGO flags.
* **Single codes:** stored uppercase; duplicates checked within the venue regardless of letter case. Percentage supports 0–100 in the model; do not claim that zero is always invalid. Code/description lengths are limited to 255 characters, bulk prefix to 16. The frontend requires a code or bulk prefix/quantity, description, amount, at least one accepted location, and a target when “All items” is not chosen.
* **Scopes:** all items, selected items, or everything except selected items. Event chooser supports single, recurring-parent, and template events; child switches select ticket types, product attributes, or membership levels. Bulk writes flatten those selections into separate lists, so the same-looking form has a different save contract.
* **Defaults:** blank identity/description/value/limits; percentage; entire order; all items; Starts **Now**, Ends **Never**; both checkout locations; active. Bulk has prefix/quantity instead of a code and no status selector in its current form. Automatic has a name and purchase rules instead of a customer-entered code.
* **Dates:** custom date/time is combined using the venue timezone and sent with `local_schedule`; Now/Never sends null. Backend rejects end before start. Reopening and changing non-date fields must not shift saved dates.
* **Save:** current source uses one form and **Save**, disables submission while pending, refreshes cached lists after success, and returns to the appropriate list. Do not invent Next, Review, or wizard-step behavior for this checkout.
* **Bulk:** generation is asynchronous; configured terms and selected items must survive through generated codes. Download is rejected until ready; incomplete generation/edit work restricts editing. See [[03 Test Cases/Discounts/SPD-2465-bulk-discount-generation-lifecycle-test-cases|Bulk generation lifecycle]] for detailed recovery coverage.

| Entry point | Starting state / supported creation | Accounting |
| --- | --- | --- |
| Dashboard → Discounts → Create discount | New single/bulk; automatic when enabled; no item preselection. | Existing creation cases, enhance. |
| Empty list → Create Discount | New form for the selected tab; may bypass the header menu. | Add to enhanced existing cases; TC-1 covers event empty list. |
| Manage Events → select event → Discounts | Single/automatic with that event and its ticket types preselected; event-specific return destination. Bulk absent. | TC-1; automatic equivalent deferred until extended execution. |
| Row actions → Duplicate | Existing settings loaded into a new form; single code cleared; nested permission IDs removed. | SPT-3474/3475/3476, enhance. |
| Saved link/direct creation navigation | Missing/invalid type, unavailable automatic, and invalid source ID require route guards; no visible navigation is needed for this route-specific check. | Component/API automation; not manual platform symmetry. |
| Public / Widget / Box Office | Consume the saved discount; do not create it through these checkout screens. | SPT-3306/3308/3311 and existing checkout automation. |

## Control Inventory and Coverage Ledger

**All proposed manual checks are unexecuted.** “Manual-only” below means proposed coverage, not a pass. Source-reviewed tests are also unrun.

| Controls / states / side effects | Decision and evidence |
| --- | --- |
| Identity, description, type, percent/currency, entire-order/individual-item application, fresh defaults | Manual-only: enhance SPT-1718/1743/1745/1749; exact values plus saved edit comparison. Required bulk identity: TC-2; remaining maximum-length/percentage boundary matrices are deferred to backend/component checks. |
| All/selected/excluded scope; Events/Products/Memberships; event type selector; search, duplicate avoidance, child switches, remove parent, counters | Manual-only: enhance creation cases and TC-1. Add one two-child record per selected scope; verify one child excluded and removed parent absent after reopening. Type-switch hidden selections remain a risk below. |
| Per-customer, per-item, overall limits; blank/unlimited and finite values | Manual-only: enhance creation cases; downstream SPT-4776/4777/4778 and SPT-4698 exist in scan. Detailed limit concurrency/recovery is deferred from this creation review. |
| Starts/Ends, custom pickers, Now/Never, timezone, invalid window, null clearing | Manual-only: enhance SPT-4391/481; timezone/DST interpretation also needs backend/component checks. |
| Both/single/no accepted locations; active/inactive; bulk has no form status selector | Manual-only: enhance SPT-481/1743/1749; TC-2 for no locations. Bulk status selector is not applicable in current form. Checkout location enforcement uses existing consumer cases. |
| Automatic requirement choice; min/max; percent/currency; Add tier, remove tier, all-rule type change | Manual-only: enhance SPT-1749/4892; TC-4 capacity. Disabled venue/unsupported pricing and used-rule locks: backend/component candidates, unrun. |
| Save success, fresh read, correct list/tab; pending disabled Save; rejected save and correction | Manual-only: enhanced positives, TC-2/3/4. Transport failure, timeout, repeated clicks: automation candidates, unrun; do not promise server idempotency. |
| Back/discard, loading source data, failed source lookup, malformed type/id, venue isolation | Manual-only: enhance SPT-1718 with filled discard. Component/API candidates for other states, unrun. Missing timezone/session has no source-established recovery screen: blocked expectation. |
| Bulk count, prefix, pending/generating/ready, exact CSV and selected-item redemption | Manual-only: SPT-1745/4891 plus existing lifecycle note. Failed/retried/redelivered generation is deferred to controlled backend execution, not silently skipped. |
| Fresh, copied, previously used data; unchanged source after duplicate; edit locks | Manual-only: SPT-3474/3475/3476 and 1759/1760/1761. Creation must not be substituted with an edit test. |
| Downstream savings, charge/order/tickets, usage, refunds/voids/exchanges/report agreement | Existing Qase coverage identified; bind a representative created discount to checkout proof. Full post-purchase execution is deferred because no concrete backend/payment change was supplied. |
| Mobile form layout, keyboard/focus/errors, translations | Manual-only candidate pass after the refactor is bound to a build; no responsive/accessibility execution claimed. Native discount creation is not established by this source review. |
| Wizard stepper/cards, Next validation, Back retention, review summary, rollout fallback, BOGO selectors | Deferred for the V1/refactor candidate; blocked for precise copy-ready UI expectations in this checkout. BOGO has separate handbook coverage. |
| Cleanup | Each draft restores or deactivates only its created records. Do not delete or change existing customer-used offers to produce an error state. |

## Prioritized Enhancements and Risks

1. **P1 — Make saved configuration explicit.** Enhance SPT-1743/1745/1749 with exact amount, eligible/excluded child, finite limits, date window and checkout location; reopen Edit after a list refresh. Keep the current amount/application variants and scope coverage. Keep SPT-1718's independent no-save/defaults purpose.
2. **P1 — Bind creation to redemption.** Replace SPT-3306's generic action placeholders with concrete code entry, savings, completed purchase, and saved-order checks while preserving its existing supported surfaces and amount variants. Run enhanced SPT-3306 and SPT-3308/3311 with the actual newly created code/rule, including one eligible and one excluded item. Compare savings independently, then require one order, the expected tickets, and saved discount/usage. The automatic creation case's conditional checkout step is insufficient as a release gate.
3. **P1 — Enforce real permissions and recoverable rejection.** Add TC-2/3/4; enhance SPT-481 with no-location selection and uppercase/lowercase duplicate attempts, followed by correction and exactly one new record. Preserve the original code and unrelated inputs after rejection.
4. **P2 — Dates and tiers.** Enhance SPT-4391 with venue/device timezone difference and custom → Now/Never → save/reopen; retain its four eligibility states. Enhance SPT-4892 with maximum equal to minimum and adjacent minimum equal to previous maximum: backend rejects equality even though frontend comparison is weaker. Reopen the corrected saved tiers.
5. **P2 — Copies and unfinished work.** Enhance duplicate cases with independent selected-item changes and unchanged original; enhance SPT-4891 with reload during generation, exact unique CSV count, and a generated code used on selected/excluded items. Use controlled backend tests for failure/resume.

Source concerns to carry into refactor review, **not live reproduced defects**:

* Automatic capacity reads `is_pubic` rather than `is_public` in the serializer. Its default true can make inactive creation consume capacity too. Inactive-at-capacity product intent remains unresolved; TC-4 asserts only active rejection.
* Switching Item Type changes the visible picker without clearing the shared selection array; saving transmits retained selections, and reopening derives the displayed type from the first selected group. Do not assume switching types removes old targets. Mixed-type intent and visibility need an explicit design decision before a rejection/clearing expectation is drafted.
* Generic form validation accepts a non-empty parent selection even if every child switch is off; bulk backend additionally requires a concrete child selection. Add an API/component check for zero selected children and ensure rejected input is recoverable.
* Full permission/ownership and uncertain network outcomes need API/backend evidence. A disabled button or a success toast cannot prove no unintended write or exactly-once creation.

## Suggested New Qase-ready Drafts

These four **local** drafts fill distinct gaps. They do not replace existing cases or authorize Qase writes. A ticket type is a named ticket choice under an event; a bulk batch creates several separate customer-entered codes; an automatic discount applies when the basket meets its purchase requirement.

### TC-1: Create from the event's Discounts page

**Title:** Dashboard - Discounts - Create an event discount with the selected ticket types

**Description:** Verify that creation from an event's Discounts page starts with that event selected, saves only the chosen ticket types, and returns to the same event.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| EventCreateEntry | Starting state and action |
| --- | --- |
| HeaderMenu | Select an event with an existing single code; use Create discount → Discount Code. |
| EmptyList | Select an event with no single codes; use Create Discount in the empty Discount Codes list. |

**Tags:** dashboard, discounts, events

**Parameters:**
EventCreateEntry: HeaderMenu, EmptyList

**Preconditions:**

* The employee has **Manage Events** for the organization.
* Select an event matching the parameter row with at least two ticket types; record the event and two ticket-type names.
* Choose a code absent from the organization's Discount Codes list and record it.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage Events, select the recorded event, and open Discounts. | Recorded event | The event's Discount Codes list appears. |
| Start creating the code using the selected entry. | EventCreateEntry mapping | The new form has this event and its ticket types selected; bulk creation is absent from the event menu. |
| Enter the code, description, and discount amount. | Recorded code; description “Selected ticket offer”; 10% | The entered values appear. |
| Choose Amount off individual items and Certain items of this type; keep one recorded ticket type selected and switch the other off. | Events; recorded ticket types | Only the intended ticket type remains selected under this event. |
| Enter the limits and choose the accepted location. | Usage limit per customer 2; Item limit per customer 1; Overall usage limit 5; Starts Now; Ends Never; Online public checkout only | The form displays the selected limits, dates, and location. |
| Select Save. | — | One code is created and the same event's Discount Codes list opens. |
| Refresh the list and open Edit for the recorded code. | Recorded code | Code, description, 10%, individual-item application, event, ticket switches, limits, dates, and location match the saved choices. |

**Postconditions:** Deactivate only the code created by this case using its row actions; retain its recorded code for execution evidence.

### TC-2: Reject an incomplete bulk batch and recover

**Title:** Dashboard - Discounts - Correct invalid bulk creation without creating an extra batch

**Description:** Verify that an incomplete bulk form stays unsaved, identifies the selected invalid setting, and creates one batch after that setting is corrected.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| InvalidBulkSetting | Invalid input | Correction |
| --- | --- | --- |
| MissingPrefix | Discount Prefix blank | Enter the recorded prefix. |
| MissingDescription | Discount Description blank | Enter “Bulk validation offer”. |
| MissingQuantity | Total Amount of Codes blank | Enter 5. |
| ZeroQuantity | Total Amount of Codes 0 | Enter 5. |
| MissingAmount | Discount value blank | Enter 10%. |
| MissingSelectedItem | Certain items of this type, Events, no event selected | Search for and select the prepared event and its ticket type. |
| NoAcceptedLocations | Both accepted locations unchecked | Check Online public checkout. |

**Tags:** dashboard, discounts

**Parameters:**
InvalidBulkSetting: MissingPrefix, MissingDescription, MissingQuantity, ZeroQuantity, MissingAmount, MissingSelectedItem, NoAcceptedLocations

**Preconditions:**

* The employee has **Manage Events** and **Manage Transactions** for the organization.
* Select an event with at least one ticket type; record both names.
* Choose a prefix of 1–16 letters/digits absent from Bulk Discounts and record it; codes from this batch will not be distributed.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Discounts → Create discount → Bulk Discount Code. | — | A new bulk form appears with Discount Description, Discount Prefix, and Total Amount of Codes. |
| Complete the form. | Recorded prefix; description “Bulk validation offer”; quantity 5; 10%; entire order; All items; blank limits; Starts Now; Ends Never; Online public checkout only | All entered values appear. |
| Make the selected invalid change. | InvalidBulkSetting mapping | The selected setting is incomplete or invalid. |
| Select Save. | — | An error identifies the invalid setting; the form remains open and no batch is created. |
| Correct the invalid setting. | Correction in the mapping | The corrected value is shown and the other entered values remain intact. |
| Select Save. | — | One batch is created and Bulk Discounts opens. |
| Search by the recorded prefix and wait for generation to finish, refreshing the list. | Recorded prefix | Exactly one batch reaches 5 generated codes out of 5. |
| Open Edit for the batch. | Recorded prefix | The saved amount, application, scope, limits, dates, and accepted location match the corrected form. |

**Postconditions:** Deactivate only the batch created by this case; do not distribute its codes.

### TC-3: Different creation permissions

**Title:** Dashboard - Discounts - Enforce the permission needed to create a bulk batch

**Description:** Verify that an employee who can create a single code also needs Manage Transactions to save a bulk batch; missing permission must leave no batch behind.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| EmployeePermissionSet | Required effective permissions | Single-code result | Bulk result |
| --- | --- | --- | --- |
| ManageEventsOnly | Manage Events; no Manage Transactions or permission that grants it | Saved | Rejected; no batch |
| ManageEventsAndTransactions | Manage Events and Manage Transactions | Saved | Saved |

**Tags:** dashboard, discounts, employee-permissions

**Parameters:**
EmployeePermissionSet: ManageEventsOnly, ManageEventsAndTransactions

**Preconditions:**

* A prepared employee account has exactly the effective permission set in the selected row; an administrator confirms inherited permissions before execution.
* Choose a single code of 1–32 letters/digits and a bulk prefix of 1–16 letters/digits absent from the organization's lists; record both. Neither will be distributed.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the prepared employee and open Dashboard → Discounts → Create discount → Discount Code. | Selected employee account | The single-code form opens. |
| Complete the form. | Recorded code; description “Permission check”; 10%; entire order; All items; blank limits; Starts Now; Ends Never; both accepted locations | The entered values appear. |
| Select Save. | — | One single code is saved. |
| Open Create discount → Bulk Discount Code. | — | The bulk form opens. |
| Complete the bulk form. | Recorded prefix; description “Bulk permission check”; quantity 2; 10%; entire order; All items; blank limits; Starts Now; Ends Never; both accepted locations | The entered values appear. |
| Select Save. | — | The bulk result matches the selected permission row: a permission error with no batch, or one saved batch. |
| Open Discounts → Bulk Discounts and search for the recorded prefix. | Recorded prefix | The denied account has created no batch; the allowed account has exactly one batch that reaches 2 generated codes. |

**Postconditions:**

* Deactivate the single code created by this case.
* An employee with both permissions deactivates the bulk batch only if this case created it; do not grant new permissions to the denied employee for cleanup.

### TC-4: Active automatic-discount capacity

**Title:** Dashboard - Discounts - Reject an active automatic discount when capacity is full

**Description:** Verify that a complete active automatic-discount form reports the organization's capacity limit and leaves no new automatic discount behind.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, discounts

**Preconditions:**

* The employee has **Manage Events** for the organization.
* The organization's saved settings have `allow_auto_discount=true` and Standard or Premium pricing; an administrator confirms that its active automatic-discount count equals `active_auto_discount_limit`.
* Choose a name absent from Auto Discounts and record it. Do not activate, deactivate, or alter an existing offer to manufacture the full-capacity state.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Discounts → Create discount → Auto Discount. | — | The automatic-discount form opens. |
| Complete the name and purchase requirement. | Recorded name; Minimum basket quantity; minimum 2; maximum blank; 10% discount | One complete purchase tier is shown. |
| Complete the remaining settings and keep the status Active. | Entire order; All items; blank limits; Starts Now; Ends Never; both accepted locations | The entered settings are displayed. |
| Select Save. | — | A capacity error is shown; no success is reported and the entered settings remain available. |
| Use Back to return to Auto Discounts and search for the recorded name. | Recorded name | No new automatic discount appears. |

**Postconditions:** No saved data changes; retain the rejected form/name and capacity error as execution evidence.

## Minimum Execution Set and Automation

**Before the creation refactor can be called ready:** run enhanced SPT-1718/1743/1745/1749, SPT-481/4892, TC-1 through TC-4, SPT-4391, and SPT-4891. Use one percentage/individual-item single code, one fixed/entire-order bulk batch, and one basket-quantity automatic rule first; add remaining amount, scope, event-type and date variants when that phase changes them. Include one duplicate and one saved pre-refactor edit. Run successful and excluded-item checkout with those same records using enhanced SPT-3306 and SPT-3308/3311 on the actual affected clients. This is a proposed minimum, not a completed run.

* **Existing Playwright:** [create-event-discount.test.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/dashboard/discounts/create-event-discount.test.ts>) maps to SPT-1743, currently one desktop percentage/entire-order/selected-event setup. It checks creation/list/validation/cleanup, but does not reopen Edit. [create-and-use-overall-limit.test.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/discounts/discount-usage-limit/create-and-use-overall-limit.test.ts>) is an existing creation-to-redemption pattern for Public/Widget/Web Box Office. Neither was run.
* **Playwright candidates:** fresh saved Edit comparison, event header/empty-list creation, denied bulk save, duplicate followed by independent edit, pending Save/repeated clicks, and newly created bulk/automatic checkout. Extend [DashboardDiscountsPage.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/discounts/DashboardDiscountsPage.ts>) and existing safe cleanup.
* **Backend/component candidates:** create permissions/foreign targets, atomic nested validation, invalid/generated type, case-insensitive code collisions, auto gate/capacity, tier equality, zero-child selection, timezone null/DST/stale intent, transport rejection with retained input, and controlled bulk retry/redelivery/private-to-ready publication. Inspect existing tests before adding duplicates; these are unrun candidates, not proven absence of automation.
* **Manual candidate pass:** responsive form, keyboard-only selector/tier/date flow, readable errors, and physical/native checkout smoke only where the delivered phase affects those clients. No native creation workflow was established here.

## Sources Reviewed and Remaining Execution Gates

Applied [[06 Prompts/Showpass QA Test Case Generator]], [[00 Start Here/World-Class Software Quality Standard]], [[00 Start Here/Showpass QA Handbook/00 Index]], [[00 Start Here/Showpass QA Handbook/Playbooks/06 Discounts and Ticket Credits]], [[05 Tooling/Qase Test Case Writing Rules]], [[05 Tooling/qasectl]], and the three [[01 Repositories/Backend - web-app|backend]], [[01 Repositories/Frontend - showpass-frontend|frontend]], [[01 Repositories/QA Automation - showpass-playwright|automation]] notes.

| Source | Relevant contract |
| --- | --- |
| [Backend viewsets](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/discounts.py>) | Permissions, atomic single writes, bulk task handoff, ready-only download. |
| [Backend serializers](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/discounts.py>) | Code/type/rule validation, local schedules, capacity, used-rule locks, bulk fields. |
| [Discount model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/discount_management/discounts.py>), [Venue model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/venue.py>), [employment permissions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py>) | Normalization, percentage/date boundaries, auto enablement/capacity, visible permission names. |
| [Bulk configuration policy](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/discounts/bulk_discount_configuration_policy.py>) | Concrete/venue-owned targets, immutable fields, incomplete-generation locks. |
| [Frontend discount feature](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/discounts>) | Read header/empty/duplicate callers; create page and event scope; Single/Bulk/Auto forms; defaults, shared fields, submission, selectors, manual validators, payload/hydration, dates, status, locations. |
| [Creation page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/manage/discounts/create/index.tsx>), [discount config](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/discounts/constants/discounts-config.ts>), [event scope](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/discounts/utils/discount-scope.ts>) | Current organization route `/manage/discounts/create`; Manage Events page gate; event-specific preselection and destination. Routes are evidence, not manual navigation instructions. |

**Open execution gates:** identify the exact V1 candidate and its rollout/fallback behavior before adding wizard-specific steps; settle mixed-item visibility and inactive-at-capacity intent; establish supported recovery when venue/timezone data is missing. These do not block this current-source gap analysis. No user verification or approval is needed to retain this local note; any future Qase write requires separately confirmed scope.
