---
title: Customer Refunds - Start Here
jira: SPW-19666
status: source-reviewed-not-executed
date: 2026-10-27
tags:
  - qa/runbook
  - refunds
---

# Customer refunds — start here

> [!warning] Open exchange issue — 2026-10-28
> [[02 Feature QA/Refunds and Exchanges/SPW-21227-customer-refunds-block-exchanges|SPW-21227]] now has an updated and readback-verified Jira description with exact Venue feature flags, saved settings, event cutoff and ticket requirements. The customer Exchange button is blocked by the Venue's **Customer Self Refund Settings** value. A Web Box Office exchange server error is also reported, but its response and cause remain unverified. The user approved the Jira update on 2026-10-28; no business data was changed.


## Current coverage review — 2026-10-27

**Qase and both Excel calculators are updated.** After approval, 21 existing cases were updated and 14 focused cases created as **SPT-5798–5811**. Readback verified the published text, setup, steps, parameters, tags, and suite placement. Existing metadata and supported language/item/view coverage were preserved. No case was moved or deleted. **These are saved test cases, not executed passes.** SPT-5323 remains unchanged and withheld because its old package expectation conflicts with current source; SPT-5317 stays a separate staff-permissions case.

The current form uses **Automated return medium**, **Automated return refund type**, and **Shipping refund rule**. It has no Customer outcome, configurable-amounts switch, or fee multiselect. Its three delivery/scan restrictions are on/off switches. All three money dropdowns remain editable with the organization policy off, provided the Admin gate is on.

### Published Qase update — readability review

**Approved, published, and verified:** 21 existing-case updates and 14 new cases. The batch dry run passed before applying the exact approved scope. The reviewed cases name the current controls, give their own setup, and keep local case labels out of Qase execution fields. Existing language, item, Desktop/Mobile, and cutoff coverage is preserved. Existing tags and unrelated metadata stay unchanged. No suite moves or deletions were made.

**Two source-backed replacements were explicitly approved:** SPT-5308 replaces the retired FeeSelection parameter with current refund method/type choices while retaining every shipping rule. SPT-5310 uses the policy-off setting because Customer outcome no longer exists. SPT-5323 remains withheld; SPT-5317 is unchanged.

**Not in this write:** 19669 TC-2/TC-3 remain local until separate original fee/shipping tax evidence and financial comparison can be supplied. Delayed-barcode and historical package negatives remain withheld. Other local drafts outside the table are not being published.

**Excel updated:** both existing calculators now compare Base refund, Full refund excluding Showpass fees, and Full refund (Showpass fees invoiced), with a Revert Funds/Organizer Credit selector and separate shipping/tax totals. Original input prices/rates and the two rounding approaches were preserved. Calculation checks passed for the original 41.76 example, partial returns, all three shipping charge methods with equal groups, destination changes, invalid quantity, and restored inputs. Both workbooks were rendered and inspected. This checks spreadsheet calculations, not live refund, gateway settlement, or native Excel behavior.

> [!info]- Exact published scope
> Current case fields are in the linked Jira notes. Tags marked Preserved are not sent in existing-case updates. New Qase IDs are included below.
>
> | Action | Local draft | Suite | Title | Tags | Parameters | Steps |
> | --- | --- | --- | --- | --- | --- | --- |
> | Update SPT-5250 | SPW-19667 TC-1 | 1107 | Dashboard - Refunds - Review and save the organization's customer refund settings | Preserved | Language: English, French | 11 |
> | Update SPT-5251 | SPW-19667 TC-2 | 1107 | Dashboard - Refunds - Change when customer refunds close | Preserved | Language: English, French; CutoffScenario: AbsoluteDateTime, EventHours, EventDays, ItemHours, ItemDays, NoCutoff, ManuallyClosed | 7 |
> | Update SPT-5252 | SPW-19667 TC-3 | 1107 | Dashboard - Refunds - Reject a refund cutoff with missing or invalid details | Preserved | Language: English, French; InvalidCutoff: MissingDateTime, MissingValue, MissingUnit, ZeroValue, NegativeValue | 9 |
> | Update SPT-5253 | SPW-19667 TC-5 | 1107 | Dashboard - Refunds - Keep a ticket or product refund choice when the organization policy changes | Preserved | Language: English, French; ItemType: TicketType, Product | 20 |
> | Update SPT-5254 | SPW-19667 TC-7 | 1107 | Dashboard - Refunds - Let an employee edit tickets without access to organization refund settings | Preserved | None | 10 |
> | Update SPT-5255 | SPW-19667 TC-10 | 1107 | Dashboard - Refunds - Check the starting refund settings for a new organization, ticket, and product | Preserved | Language: English, French | 6 |
> | Update SPT-5308 | SPW-19669 TC-1 | 1107 | Dashboard - Refunds - Save shipping and fee choices | Preserved | ReturnMedium: OriginalPayment, OrganizerCredit; RefundType: Base, ExcludeShowpass, Full; ShippingRule: Never, AfterAll, Proportional, UnshippedOnly | 7 |
> | Update SPT-5309 | SPW-19668 TC-1 | 1108 | My Orders - Refunds - Let a customer select a purchased ticket or product after refunds are enabled for it | Preserved | ItemType: TicketType, Product, StandaloneProduct, AssignedSeat, TicketPackage | 13 |
> | Update SPT-5310 | SPW-19668 TC-2 | 1108 | My Orders - Refunds - Block a customer return when the organization policy is off | Preserved | None | 4 |
> | Update SPT-5311 | SPW-19668 TC-3 | 1108 | My Orders - Refunds - Stop a return after the saved deadline | Preserved | CutoffScenario: Absolute, EventStart, ItemStart, ManuallyClosed | 6 |
> | Update SPT-5312 | SPW-19668 TC-5 | 1108 | My Orders - Refunds - Block when any remaining item is ineligible - Block the entire order | Preserved | None | 3 |
> | Update SPT-5313 | SPW-19668 TC-8 | 1108 | My Orders - Refunds - Keep another customer from opening or returning an order | Preserved | None | 4 |
> | Update SPT-5314 | SPW-19671 TC-1 | 1108 | My Orders - Refunds - Return purchased items and receive the previewed organizer credit | Preserved | PurchaseConfiguration: TicketType, Product, StandaloneProduct, TicketAndProduct, AssignedSeat, TicketPackage | 13 |
> | Update SPT-5315 | SPW-19671 TC-2 | 1108 | My Orders - Refunds - Refund eligible items independently - Return one ticket and keep the blocked ticket | Preserved | None | 9 |
> | Update SPT-5316 | SPW-19671 TC-3 | 1108 | My Orders - Refunds - Stop a return if the refund deadline changes before confirmation | Preserved | None | 10 |
> | Update SPT-5321 | SPW-19668 TC-4 | 1108 | My Orders - Refunds - Require the whole remaining order - Include every remaining purchase in the preview | Preserved | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 7 |
> | Update SPT-5322 | SPW-19668 TC-10 | 1108 | My Orders - Refunds - Require the whole remaining order - Block the order until every remaining item allows refunds | Preserved | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct | 12 |
> | Update SPT-5324 | SPW-19671 TC-5 | 1108 | My Orders - Refunds - Require the whole remaining order - Return every remaining purchase for organizer credit | Preserved | PurchaseConfiguration: TwoTicketTypes, TicketAndProduct, TwoAssignedSeats | 13 |
> | Update SPT-5325 | SPW-19668 TC-6 | 1108 | My Orders - Refunds - Allow customer refunds after barcode delivery - Block or allow customer refunds | Preserved | None | 12 |
> | Update SPT-5326 | SPW-19668 TC-12 | 1108 | My Orders - Refunds - Allow customer refunds after fulfillment or shipping - Block or allow customer refunds for a fulfilled product | Preserved | None | 12 |
> | Update SPT-5327 | SPW-19668 TC-13 | 1108 | My Orders - Refunds - Allow customer refunds after check-in or scan - Block or allow customer refunds for a checked-in ticket | Preserved | None | 12 |
> | Created [SPT-5798](https://app.qase.io/case/SPT-5798) | SPW-19667 TC-4 | 1107 | Dashboard - Refunds - Save one customer refund rule without changing the others | dashboard, refunds | Language: English, French; PolicyChoice: TicketsAllowed, ProductsAllowed, BarcodeAllow, ShippingAllow, ScanAllow, EligibleItemsOnly, WholeRemainingOrder | 8 |
> | Created [SPT-5799](https://app.qase.io/case/SPT-5799) | SPW-19667 TC-6 | 1107 | Dashboard - Refunds - Discard an unsaved refund setting | dashboard, refunds | None | 4 |
> | Created [SPT-5800](https://app.qase.io/case/SPT-5800) | SPW-19667 TC-8 | 1107 | Dashboard - Refunds - Keep customer refund settings separate for two organizations | dashboard, refunds, employee-permissions | None | 10 |
> | Created [SPT-5801](https://app.qase.io/case/SPT-5801) | SPW-19667 TC-13 | 1107 | Dashboard - Refunds - Showpass has disabled customer self-refunds | dashboard, refunds | None | 3 |
> | Created [SPT-5802](https://app.qase.io/case/SPT-5802) | SPW-19667 TC-14 | 1107 | Dashboard - Refunds - Reject saving if Showpass disables self-refunds while the form is open | dashboard, refunds | None | 8 |
> | Created [SPT-5803](https://app.qase.io/case/SPT-5803) | SPW-19667 TC-15 | 1107 | Dashboard - Refunds - New ticket and product defaults follow the organization policy | dashboard, refunds | PolicyState: Enabled, Disabled; ItemType: TicketType, Product | 5 |
> | Created [SPT-5804](https://app.qase.io/case/SPT-5804) | SPW-19668 TC-14 | 1108 | My Orders - Refunds - Apply the organization ticket and product switches | my-orders, refunds | AllowedItems: Both, TicketsOnly, ProductsOnly | 6 |
> | Created [SPT-5805](https://app.qase.io/case/SPT-5805) | SPW-19668 TC-15 | 1108 | My Orders - Refunds - Block returns when both organization item-type switches are off | my-orders, refunds | None | 4 |
> | Created [SPT-5806](https://app.qase.io/case/SPT-5806) | SPW-19669 TC-4 | 1108 | My Orders - Refunds - Review a new amount or refund method before confirming | my-orders, refunds, edge-case | Change: ReturnMedium, RefundType | 9 |
> | Created [SPT-5807](https://app.qase.io/case/SPT-5807) | SPW-19669 TC-5 | 1108 | My Orders - Refunds - Reject an old preview after Shipping refund rule changes | my-orders, refunds, edge-case | None | 7 |
> | Created [SPT-5808](https://app.qase.io/case/SPT-5808) | SPW-19671 TC-4 | 1108 | My Orders - Refunds - Prevent a second return of an already refunded ticket | my-orders, refunds, post-purchase | None | 9 |
> | Created [SPT-5809](https://app.qase.io/case/SPT-5809) | SPW-19671 TC-6 | 1108 | My Orders - Refunds - Revert Funds returns only the selected ticket or product to the original card | my-orders, refunds, payment | ItemType: Ticket, Product | 9 |
> | Created [SPT-5810](https://app.qase.io/case/SPT-5810) | SPW-19671 TC-7 | 1108 | My Orders - Refunds - Require the whole remaining order after one ticket was already returned | my-orders, refunds, edge-case | None | 7 |
> | Created [SPT-5811](https://app.qase.io/case/SPT-5811) | SPW-19671 TC-8 | 1108 | Dashboard - Refunds - Reject a returned ticket at check-in and admit an untouched ticket | dashboard, refunds, check-in | None | 4 |

Evidence retained for the completed publication under `/private/tmp/refund-refresh-20261027/`: `qase-refresh-plan.json`, `qase-refresh-dry-run.json`, `qase-readable-review.json`, `qase-refresh-applied.json`, `qase-refresh-verification.json`, and `workbook-validation.json`. Temporary builders and preview images were removed after verification.

### Start with these current cases

Each linked Jira note contains the full standalone cases and setup. Labels below are local drafts, not newly assigned Qase IDs. The Organizer and Customer folders are preserved.

| Visible page / purpose | Existing Qase coverage | Current local cases and decision |
| --- | --- | --- |
| Organization → Organization settings → Customer refunds: base form, save/reload, policy on/off | SPT-5250 | [[SPW-19667-customer-refund-policy-test-cases|19667]] TC-1 — Enhance for actual fields; preserve English/French. |
| Cutoff: every shape, timezone, validation and recovery | SPT-5251 / 5252 | 19667 TC-2 / TC-3 — retain parameters; add required Admin gate. |
| Automated return medium, refund type, shipping | SPT-5308 | [[SPW-19669-customer-refund-amount-rules-test-cases|19669]] TC-1 — two methods × three types × four shipping rules, 24 settings runs. Retire obsolete fee-selection and hidden-amount-control assertions with this source-backed replacement. |
| Organization switches save independently | SPT-5798 | 19667 TC-4 — includes ticket/product switches, three restriction switches and mixed eligibility. |
| Individual ticket/product switch survives policy changes | SPT-5253 | 19667 TC-5 — Enhance for current policy/type gates; retain both items and languages. |
| Unsaved money choices | SPT-5799 | 19667 TC-6 — no saved change after reload. |
| Employee lacks Manage Organization Info | SPT-5254 | 19667 TC-7 — preserve item editing and denied policy access; Admin gate on prevents a false permission pass. |
| Two organizations keep separate values | SPT-5800 | 19667 TC-8 — deadlines, refund methods, refund types, and shipping choices stay with the correct organization. Backend request ownership is a separate API check. |
| Initial policy and item defaults | SPT-5255 | 19667 TC-10 — policy off, organization ticket/product switches on, new individual items off; current money defaults visible. |
| Showpass has not enabled self-refunds | SPT-5801 | 19667 TC-13 — disabled notice, no editable form or Save. |
| Showpass disables permission while the form is open | SPT-5802 | 19667 TC-14 — rejected save leaves policy and refund method unchanged. |
| New ticket/product defaults with policy on/off | SPT-5803 | 19667 TC-15 — four creation runs; existing item settings unchanged. |
| Customer item selection, paid orders, variants, seats, packages | SPT-5309 | [[SPW-19668-customer-refund-eligibility-test-cases|19668]] TC-1 — preserve all five item configurations; use current gates and hidden blocked-order action. |
| Customer returns blocked by policy off | SPT-5310 | 19668 TC-2 — replace the removed Outcome instruction with policy off; verify no Return order action or money change. |
| Customer cutoff, mixed-order blocking and ownership | SPT-5311 / 5312 / 5313 | 19668 TC-3 / TC-5 / TC-8 — preserve their business checks; update obsolete setup and unavailable-action steps. |
| Organization allows only tickets, only products, both, or neither | SPT-5804 / 5805 | 19668 TC-14 (three selectable combinations) / TC-15 (neither) — individual switches stay on; no conditional attempt to open an absent action. |
| Whole remaining order preview / blocked-item recovery | SPT-5321 / 5322 | 19668 TC-4 / TC-10 — preserve item configurations; correct current controls and blocked-action behavior. |
| Whole-order packages expected to be unselectable | SPT-5323 | **Withheld.** The old blanket negative expectation conflicts with the purchased-parent fix. Do not silently repurpose or delete it; replace with agreed supported-parent and unsupported-child-revenue checks. Local old TC-9 / TC-11 are labelled historical. |
| Barcode, fulfillment/shipping, check-in restrictions | SPT-5325 / 5326 / 5327 | 19668 TC-6 / TC-12 / TC-13 — preserve delivered/fulfilled/checked-in preparation; use off/on switches and hidden blocked-order action. |
| Completed Organizer Credit returns | SPT-5314 / 5315 / 5324 | [[SPW-19671-customer-self-refund-acceptance-test-cases|19671]] TC-1 / TC-2 / TC-5 — preserve item matrices and untouched purchases; current combined-return accounting replaces obsolete two-credit-record assumptions. |
| Deadline changes during confirmation | SPT-5316 | 19671 TC-3 — preserve rejected return and unchanged credit/order proof. |
| Already returned item cannot return again | SPT-5808 | 19671 TC-4 — published, not run; separate from staff duplicate-refund cases. Two simultaneous confirmations remain backend/integration coverage. |
| Revert Funds returns the selected ticket or product to the original card | SPT-5809 | 19671 TC-6 — two purchase selections; original-card refund, no new Organizer Credit, companion remains paid. |
| Whole remaining order after a prior partial return | SPT-5810 | 19671 TC-7 — already-returned ticket/value excluded; only remaining ticket is newly credited. |
| Shipping across two successive returns | Local only | 19669 TC-2 — all four shipping rules on new two-ticket orders; no duplicate shipping. |
| Refund type determines actual returned fees | Missing | 19669 TC-3 — six method/type combinations; original customer-paid organizer/Showpass/processing fees distinguish the choices. Financial setup/evidence must be available before execution. |
| Refund method/type changes after preview | SPT-5806 | 19669 TC-4 — includes equal-total destination change, rejected old confirmation, refreshed preview, Cancel and no money movement. |
| Shipping changes after preview | SPT-5807 | 19669 TC-5 — separate from destination/type change; preserves the earlier shipping-change scenario. |
| Refunded ticket cannot admit; untouched ticket still works | SPT-5811 | 19671 TC-8 — current scan window, exact refunded barcode and a paid control; no generic rejection counted as success. |
| Staff refund permission choices | SPT-5317 | Keep the separate Staff Refunds case; not proof of customer self-refunds. |

### Minimum execution order

1. Run the Organizer base form, Admin-off gate, required employee permission, initial/default choices, cutoff save/validation, settings save and unsaved reload. Run English and French where declared.
2. Run organization ticket/product combinations and customer restriction checks using the exact paid/delivered/fulfilled/scanned records in each case; do not accept a block caused by a different disabled gate.
3. Complete a clean Organizer Credit return and a clean original-card return. Run the six fee-bearing method/type choices and all four shared-shipping rules on independent orders with original amounts recorded first.
4. Challenge confirmation after destination/type/shipping/deadline changes, already-returned items, prior partial return followed by whole-order mode, and another customer's/organization's access.
5. Preserve completed financial records and restore only authorized configuration. Check returned and untouched ticket validity and the configured inventory behavior using the linked handbook; a success message or saved case is not proof of final money, admission or stock.

### Remaining critical work and limits

| Check | Status / exact evidence still needed |
| --- | --- |
| Mixed card plus credit; fully credit-funded purchase | Backend tests reviewed, not run. Add a standalone manual recipe once original credit issuance, application, and permitted balance/payment inspection are bound to the actual organization. Revert Funds can split between the original card and restored credit; it is not always a card-only refund. |
| Absorbed fees, discounts, fractional rounding, organizer/Showpass earnings | Backend tests and handbook gates identified, not executed. The clean customer-paid-fee cases do not prove absorbed/internal allocation or settlement. A customer receiving the right total does not establish correct Showpass earnings. |
| Older/incomplete shipping purchase data | Backend refuses an unsafe amount and asks for organizer help. Need a known untouched historical order and read-only purchase evidence; do not edit financial records to manufacture it. This is Blocked manual setup, not silent legacy fallback. |
| Duplicate or concurrent requests; provider failure after an earlier completed refund | Backend/integration proof required. Existing UI repeated-return case is not two-request race coverage. Controlled provider failure setup is not available in this review. |
| Square Terminal original-payment return | Current backend blocks a positive asynchronous payment refund through this customer path; Organizer Credit is a different flow. Need a legitimate supported original purchase before a manual negative can be called runnable. |
| Delayed barcode release | [[SPW-19670-delayed-barcode-self-refund-test-cases|19670]] TC-1/TC-2 remain local; exact supported release setup is still a publication blocker. General barcode permission does not replace Admin opt-in or the saved automated-return window. |
| Missing policy, loading error/Try again, Save/network failure | UI/source branches reviewed. Missing policy returns an empty list, which must not be confused with a genuine disabled Admin setting. A controlled failure/missing-record setup is needed; do not delete a shared policy or invent an exact error response. |
| Free tickets, staff refunds, legacy/non-rollout venues | Separate regression controls, not covered by a paid-policy pass. Adjacent free-return SPT-3374, staff duplicate-refund SPT-4842, and gift-card staff refund SPT-3845 were read; do not duplicate their flows or assume the current policy changes those separate refund contracts. |
| Full Admin Refund, Universal Credit, retired amount/fee fields | Not offered by this form. Backend-only authorization/read-only-field checks remain relevant; do not add them as selectable manual parameters. |
| Legacy Organization Info embed/navigation | SPT-5531 checks the existing legacy tab entry. Local 19667 TC-11 checks saved-form equivalence; no live old-shell navigation/save was executed. Keep access proof distinct from typing a direct URL. |
| Gift-card-funded order | Current customer amount service rejects gift-card funding; staff gift-card refund case SPT-3845 is a different workflow. A known eligible purchase and its funding proof are still needed for a standalone manual negative. |
| Seat/inventory release and actual repurchase | Existing paid-seat variants check the return and credit but do not prove the configured restock/seat-release and a second valid purchase. Keep this as a separate manual integration proof with an owned public seat/map and the actual release policy; do not infer it from Refunded status. |
| Invoiced Showpass fees / complete financial components | Independent expected fee allocation plus actual organizer/Showpass finance evidence required. Transactions aggregate totals alone cannot clear every accounting gate. |

### Supporting source and coverage evidence

> [!info]- Source revisions, scan evidence, and verification limits
> **Testing intent:** the permitted employee can configure customer refunds without enabling unintended items, refunding the wrong amount, choosing the wrong money destination, or changing another organization. These are financial-math, money/order-state, ownership and permission risks. Confidence is high for the listed source contracts and visible English controls; execution confidence is not established.
>
> **Repositories actually read:** backend `/Users/christianvaldez/Documents/Showpass/repos/web-app`, develop `ac8a60123129fca71316321eb6a75345fcca51c3`; frontend `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, develop `763a98690efcf6f6f252263ce0841e618cbd124e`. Both matched their saved origin/develop refs when inspected. No fetch, checkout, diff, branch comparison, or source edits were performed.
>
> * Backend: `apps/venues/api/venue_based/serializers/refunds.py`, `viewsets/refunds.py`; `apps/venues/services/customer_refunds/save_customer_refund_policy.py`; `apps/venues/models/venue_management/{venue,customer_refund_policy}.py`; `apps/venues/admin/{venue_admin,forms}.py`; `apps/financials/constants/refunds.py`; `apps/financials/services/invoice/{customer_return_eligibility,customer_return_amounts,user_invoice_return}.py`; `apps/financials/payments/refunders/base.py`; `apps/financials/models/invoice_management/invoice.py` (`can_automatically_refund`); `apps/tickets/constants/lifecycle.py` (refunded scan feedback).
> * Source tests read, not executed: `apps/venues/api/venue_based/viewsets/tests/refunds/{test_customer_refund_policy_api,test_customer_refund_policy_gates}.py`; `apps/venues/tests/test_customer_refund_item_defaults.py`; `apps/financials/tests/{test_customer_return_eligibility,test_customer_return_amounts,test_customer_return_organizer_fees}.py`; `apps/financials/tests/services/invoice/test_customer_refund_policy_funding.py`; absorbed-fee API tests.
> * Frontend: Customer refunds `constants/customer-refund-policy-form-fields.ts`, `utils/customer-refund-policy-utils.ts`, `ui/pages/CustomerRefundPolicyPage.web.tsx`, query service and corresponding tests; organization config and Next page permissions; My Orders `utils/order-actions/{return-order,order-action-availability}.ts`, `ui/components/OrderOptionsList.web.tsx`, return dialog and submission hook. Paths are under the documented frontend repository.
> * Handbook actually used: index, Refunds/Voids/Exchanges, Money Credits/Gift Cards, Fees/Taxes/Absorbed Costs, Permissions/Ownership, Evidence/Expected Results and Senior QA Integration Passes; canonical Financial and Core Transaction Gates and Service-Fee Revenue Through the Transaction Lifecycle. Qase drafting follows the current writing rules and gap-analysis workflow.
>
> **Read-only browser enrichment:** the already-open beta Customer refunds page displayed the same current fields. The selected organization was FAN EXPO Cleveland under Fan Expo HQ USA; the displayed employee was Christian Valdez. Only menu/field inspection was performed; settings were not edited or saved. This proves visible controls, not saved values after a mutation, permission-denied roles, deployed backend revision, customer eligibility, or refund execution. Desktop apps were not accessed.
>
> **Qase query:** complete SPT scan on 2026-10-27 (retrieved 19:25:38 UTC), 2,254 unique cases and 360 suites. Scope includes suite 1091 and its children 1107/1108/1109, with 7/15/1 cases respectively. Candidate filtering also inspected titles, descriptions, prerequisites and step assertions for customer/self-refund, automated-return and destination/type terms. Adjacent SPT-5443 is refund-policy display text, not eligibility settings; SPT-5531 covers legacy navigation; SPT-5282 is unrelated ticket voiding. Other staff/gift-card/protection cases do not substitute for the new customer amount/destination contract. A title match alone is not counted as coverage.
>
> **Preservation and proposed replacements:** keep existing IDs, suite locations, language and item parameters, useful save/reload and no-money-change assertions. SPT-5308’s obsolete fee-selection parameter is replaced by the current refund type and method, preserving all four shipping rules; its Qase note requesting customer coverage is addressed by separate customer cases, not copied into execution prose. SPT-5310 needs the current policy-off title/condition. SPT-5323 remains withheld rather than silently converted from a negative to a positive package case. Earlier worksheets, user examples and publication history in the linked notes are retained as dated evidence.
>
> **Evidence retained while review/approval is pending:** `/private/tmp/refunds-qase-candidates-2026-10-27.json` holds the full relevant Qase baseline; `/private/tmp/refunds-local-case-review-2026-10-27.json` holds local parser verification; `/private/tmp/refunds-qase-scan-summary-2026-10-27.json` retains scan completeness and suite counts. Bulk scratch data and temporary scripts have been removed after retaining these necessary results. No Qase apply operation was prepared or run.


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
