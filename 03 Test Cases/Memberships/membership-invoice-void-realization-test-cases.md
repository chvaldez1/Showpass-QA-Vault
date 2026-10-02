---
title: Membership invoice void — SPT-940 enhancement
date: 2026-09-29
status: draft
tags:
  - qa/test-cases
  - memberships
  - transactions
---

# Membership Invoice Void — SPT-940 Enhancement

## Scope and status

- Backend reference: `6058c371c24188db28765d5d20944008dea2e369`; SPW-20529.
- Current scope: strengthen existing SPT-940, preserving its original three MembershipVoidScenario values and adding AdvancedRealizedMembershipWithGeneratedTickets and full/selected-member workflows; no new case.
- Backend validation was reported by the requester; no run evidence supplied here. Browser QA remains pending. No cases executed in this task.
- Qase SPT-940 was enhanced on 2026-09-29; its four approved fields were saved and verified by readback. No diff, branch comparison, or changed-file discovery performed.
- Standards: [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]], [[05 Tooling/qasectl]].

## Qase Check

**The base case already exists:** [SPT-940 — Web Dashboard - Transactions - Void memberships and release related inventory](https://app.qase.io/case/SPT-940).

| Preserved baseline field | Qase value before enhancement |
| --- | --- |
| Suite ID | 105 |
| Tags | memberships, post-purchase, transactions |
| Parameter | MembershipVoidScenario: StandardMembership, RealizedMembershipWithGeneratedTickets, RenewedSeasonalAssignedSeating, AdvancedRealizedMembershipWithGeneratedTickets |
| Steps | 5: locate transaction, open Void, choose full/selected mode, confirm, verify membership side effects |
| Main expectation | Member is voided, generated tickets/assigned seats are released where applicable, and transaction records the void |

The realized-membership parameter covers the base topic. Its pre-update fields did not explicitly require a scanned ticket, closure of every adjustment/negation row, unchanged financial values and payout links, or zero-money-only void entries. Prefer using SPT-940 and clarifying those assertions over creating a duplicate base case.

**Search evidence:** one complete bulk read of project SPT, 1,771 cases scanned. Local filtering matched titles containing “void”, or title/description/preconditions/steps/tags containing both “void” and “member”/“season”; 30 candidates. Full returned fields were reviewed for SPT-940, SPT-938 (event-ticket void), and SPT-436 (membership issue-ticket inventory lifecycle). The latter two are related coverage, not replacements for the membership invoice case. Raw output is temporary: `/private/tmp/qase-membership-void-all.json`; candidate summary: `/private/tmp/qase-membership-void-matches.json`.

**Update classification: Enhance.** Preserve the live title, suite 105, tags, Dashboard surface, all three parameter values, and full/selected-member coverage. Add concrete preparation, scanned-ticket and unchanged-amount checks, zero-money void proof, fresh final-state reads, explicit unselected-member protection, and named seat/inventory checks. Proposed writes are limited to Description, Preconditions, Postconditions, and Steps; all other live Qase fields remain untouched. No coverage removal is intended. The user approved the preview with “push”; the four-field update was applied and verified.

## Testing Intent

We are testing whether an organizer can void a realized membership sale and remove generated event access, including an already scanned ticket, while original money remains unchanged; this matters because cancelled memberships could retain access or acquire incorrect financial reversals.

| Field | Answer |
| --- | --- |
| Criticality bucket | Fulfillment/access, financial math, money/order state |
| Business invariant | Membership closure also closes its related realization rows and generated tickets; ordinary void records contain zero money and do not rewrite original financial history. |
| Actor impact | Organizer, customer, attendee, finance employee, and check-in employee |
| Observable proof | Fresh member/ticket statuses, zero-money void transaction, original purchase amounts; backend before/after evidence for all rows and links |
| Source of truth | Target backend code and tests; current frontend controls; live Qase case fields |
| Primary surfaces | Dashboard → Transactions and Dashboard → Check-in |
| In scope | Existing standard, realized-generated-ticket, and renewed-seasonal-seat scenarios; full and selected-member void; scanned generated ticket and preserved money |
| Out of scope | New transfer/shared-source permutations, cancellation/retry, refund/realization races, other status transitions, and checkout permutations |
| Confidence | High for backend intent; UI mapping needs the frontend paired with the target backend; execution pending |

## Proof Target Map

| Proof target | Coverage |
| --- | --- |
| Member and both generated tickets become voided, including the scanned ticket | SPT-940 strengthened steps |
| Original amounts remain intact and ordinary void has zero-money entries | SPT-940 visible checks; backend snapshot required for complete field proof |
| Every related adjustment/negation closes without another reversal wave | Target backend regression evidence; not established by a browser toast |

## Sources Reviewed


Backend root: `/Users/christianvaldez/Documents/Showpass/repos/web-app`. All backend implementation/test files below were read **at `6058c371c24188db28765d5d20944008dea2e369`**, rather than relying on the later working checkout (`a2ca49759da75d63492095f5ff8f52e73e480adb`). Paths identify files at that revision; current line numbers may differ.

| Source path relative to backend root | Relevant evidence |
| --- | --- |
| `apps/financials/payments/voiders.py` | `BaseVoider.void`, `_lock_and_expand_membership_realization_graph`, `_drop_voided_locked_selections`, `create_void_invoice_items`, `record_void`, `mark_members_as_voided`, `lock_invoice_for_void` |
| `apps/financials/models/invoice_management/invoice_items.py` | `get_all_adjustment_invoice_items(include_advanced=True)` traverses all reachable descendants |
| `apps/financials/api/venue_based/serializers/refunds.py` | `VenueBasedInvoiceVoidSerializer`: full/selected selection, venue and item ownership, already-voided validation |
| `apps/financials/api/venue_based/viewsets/invoices.py` | `void` returns a job ID; basic permission is Administer Transactions OR Use Box Office |
| `apps/memberships/models/members.py` | `_update_batch_ticket_status`: void visits every non-voided generated ticket; other transitions retain the paid/refund-in-progress filter |
| `apps/core/models/mixins.py` | `update_item_status` follows successive `transferred_to` records |
| `apps/memberships/models/groups.py`, `apps/core/flags.py` | Effective seasonal realization gates and exact rollout switch |
| `apps/memberships/admin/admin.py` | Registered Membership Group and Member admin; no verified safe shared-source creation recipe |
| `apps/venues/constants/employment.py` | Target permission names |
| `apps/financials/services/revenue_realization/invoice_item_propagation/invoice_item_propagation_managers.py` | `MembershipRevenueRealizationService`: refresh, source lock, post-lock lifecycle/overlap rechecks, newest renewal source |
| `apps/main/services/message_processing/outbox_messages/processors/member_ticket_batch_generation.py` | Outbox realization caller; batch-readiness checks and failure alert handling |
| `apps/financials/tests/services/revenue_realization/test_membership_revenue_realization_service.py` | Full invoice, advanced selected void, shared source, stale retries, void/refund skips, lifecycle guard, duplicate and lock-race tests |
| `apps/memberships/tests/members/test_member_model.py` | Generated ticket void/history test and existing status-side-effect contracts |

Frontend root: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, current revision `2d335a93641c75322d66d63f2b92df067074f071`; not verified as the frontend deployed with the target backend.

| Source path relative to frontend root | Relevant evidence |
| --- | --- |
| `packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionActions/TransactionActions.web.tsx` | Actions → Void; current client page and void permission checks |
| `packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/VoidDialog/` | `VoidDialog.web.tsx`, `VoidConfirmation.web.tsx`, `VoidInvoiceItemList.web.tsx`, `VoidMemberItemList.web.tsx`: Select all, Show tickets/members, member barcode/status, Void, Yes, No, go back, Close |
| `packages/core/src/app-contexts/dashboard/features/transactions/ui/hooks/useVoidDialogState.ts`, `useVoidSubmit.ts` | Full/selected payloads; empty selection blocks submission; job polling, completion/error notifications |
| `packages/core/src/app-contexts/dashboard/features/transactions/domain/invoice-rules.ts` | Sale/transfer and invoice-owner restrictions |
| `packages/core/src/app-contexts/dashboard/features/transactions/ui/components/transaction-items-detail/invoice-item/InvoiceItem.web.tsx` | Expanded member/ticket statuses and barcodes |
| `packages/core/src/app-contexts/dashboard/features/memberships/hooks/useMembersColumns.tsx` | Member Code and Status proof |
| `packages/core/src/app-contexts/dashboard/features/check-in/ui/components/CheckInScannerToolbar.web.tsx`, `CheckInTicketItemGroupRow.web.tsx` | Scan setup, Tickets mode, barcode search, Scan, voided/scanned states |
| `packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/InvoiceTransfersDetail.web.tsx` | Transfer history supporting proof; not a void entry point |

Automation references: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/transactions/LegacyTransactionPage.ts` (legacy full void flow), `utils/api-helpers.ts` (`voidTransactionUsingAPI`), and `flows/membership-checkout-journey.ts` (membership purchase and organizer void patterns). These patterns are not evidence that this change has passed.

## Assumptions and Unknowns

- The frontend paired with the target backend was not supplied. The draft uses reviewed modern **Select all → Void → Yes** controls; the legacy reference uses **Void All Invoice Items / Void All**.
- Current frontend checks Void Items and Void Paid Items permissions, which were absent from the target backend permission map reviewed. Use an organization owner for the base run; employee setup depends on the paired version. No live authorization defect is claimed.
- No actual sale, customer, generated-ticket barcodes, or backend before/after evidence was supplied. Public sold-out/quantity controls were additionally checked in `packages/core/src/shared/modules/memberships/components/MembershipTypesContainer/MembershipTypesContainer.tsx`; renewal seat-release expectations were verified in target `apps/memberships/tests/members/test_membership_refunds.py`, `test_void__seasonal_renewal_membership_with_assigned_seating__seats_released`.
- Browser-visible amounts and statuses cannot prove every financial field, adjustment/negation, or payout link. Keep that acceptance evidence separate from the manual result.

## Source-backed Behavior

- The void endpoint schedules a job; wait for job completion before reading final state.
- When the membership source closes, BaseVoider includes its complete reachable adjustment/negation graph, including advanced descendants, under locks shared with realization.
- Member void visits all non-voided generated tickets, including Used tickets, through normal ticket status hooks.
- Ordinary void records contain zero base money and point to original rows; original financial amounts and advance/payout links remain intact rather than creating financial reversal entries.
- Original source/invoice state closes according to remaining member/item state; the full run contains one member, while the selected run also contains another member on a separate purchase row.

## Risk Areas

- A scanned generated ticket stays Used while the member appears Voided.
- A related financial row stays active or a reversal changes the original money.
- The UI reports processing, but the job has not completed or final state has not persisted.

## State-space / coverage accounting

| Item | Status | Evidence / decision |
| --- | --- | --- |
| Full and selected-member invoice void | Manual-only, execution pending | SPT-940 draft; unselected member retained |
| Scanned and unscanned generated tickets | Manual-only, execution pending | RealizedMembershipWithGeneratedTickets uses one of each |
| Confirmation and fresh persisted state | Manual-only, execution pending | SPT-940 draft |
| Complete adjustment/negation status and original amounts/links | Deferred backend verification | Existing full-invoice source regression and before/after snapshot required |
| Standard membership and renewed-seasonal seating | Manual-only, execution pending | Existing scenarios preserved with inventory/seat checks |
| Advanced realized membership sale | Manual-only, execution pending | Added fourth parameter; financial row/link comparison remains backend evidence |
| Transfers, shared sources, retries and races | Deferred outside this narrowed request | Broader source behavior is not implied covered by the base case |
| Data cleanup | Preserve records | Void cannot be undone; no deletion of financial history |

## Recommended Test Data

Select a membership purchase created for this run using a controlled customer account, with no real attendance or payout consequences. It must contain one seasonal member with an **Issue tickets** benefit, a completed batch issuing one single-use ticket for each of two events, and completed revenue realization. Revenue realization means allocating the membership price to events included in its benefits; the member does not pay again for these generated tickets.

Effective setup: Waffle switch `enable_membership_revenue_realization = True`; `Venue.enable_membership_revenue_realization = True`; seasonal group renewal and `MembershipGroup.realizes_revenue = True`. Package mode is not a prerequisite. Use existing enabled configuration; do not change a shared rollout switch for this case.

Record the sale transaction number, member barcode, event names, both generated-ticket barcodes, and original displayed purchase amounts. Backend support should capture the original source and every related adjustment/negation, all base/stat money values and fees, and existing advance/payout links before voiding. Preserve the comparison afterward.

## Qase-ready Manual Test Case

### SPT-940: Web Dashboard - Transactions - Void memberships and release related inventory

**Title:** Web Dashboard - Transactions - Void memberships and release related inventory

**Description:** Verify an organizer can void a full membership invoice or one selected member from Dashboard Transactions, see the correct membership and related access close, and retain the original purchase amounts without issuing a money refund. For either realized membership scenario, verify generated tickets become Voided even when one has already been scanned. For the advanced scenario, void the original membership sale invoice, not the advance/payout invoice; an advance is revenue paid ahead of the usual payout. Revenue realization allocates membership revenue to its included events; an Issue tickets benefit automatically supplies those event tickets.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| MembershipVoidScenario | Required purchase | Expected access and inventory result |
| --- | --- | --- |
| StandardMembership | Paid active membership without generated event tickets or assigned seating; a finite-inventory membership level is sold out after the prepared purchases, with sales dates still open | Selected member is Voided and the sold-out membership level becomes available to purchase again |
| RealizedMembershipWithGeneratedTickets | Paid active seasonal member; Revenue realization has completed; one single-use generated ticket for each of two events, with the first ticket Used and the second unscanned | Both generated tickets become Voided and cannot be scanned |
| AdvancedRealizedMembershipWithGeneratedTickets | Same two-ticket realized membership setup; finance confirms related revenue rows already have advance/payout links and captures their original amounts and links before voiding | Member and generated tickets become Voided; original amounts and advance/payout links remain unchanged; the new void contains zero money |
| RenewedSeasonalAssignedSeating | Active member renewed into the current or next season; renewal invoice recorded; assigned membership seat and generated event tickets for that season; membership and event seat maps remain on sale, with no other orders or holds on those seats | Selected member and generated tickets become Voided; its membership and event seats become available again |

Run the steps with a fresh purchase for each void mode: **full invoice** uses one member and no unrelated items; **selected member** uses at least two active members on separate purchase rows in the same invoice and selects only one. For the renewal scenario, use the matching renewal invoice. Record the chosen mode before execution; do not reuse an invoice already voided in the other mode. For either realized scenario, prepare the Used ticket in Dashboard → Check-in: choose its event in Tickets mode, search its barcode, and select Scan; leave the second ticket and any unselected member's tickets unscanned.

**Preconditions:**

* Organization owner, or employee with Administer Transactions, Void Items, and Void Paid Items permissions.
* A completed membership purchase matching MembershipVoidScenario, created for this run because voiding cannot be undone.
* Scan Tickets permission for the employee checking generated event tickets.

**Tags:** memberships, post-purchase, transactions

**Parameters:**

MembershipVoidScenario: StandardMembership, RealizedMembershipWithGeneratedTickets, RenewedSeasonalAssignedSeating, AdvancedRealizedMembershipWithGeneratedTickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions and find the purchase or renewal invoice for the chosen scenario. | Customer and membership for the prepared purchase | The intended membership purchase and original amounts are shown. |
| Record the starting state before voiding. | Invoice number, member barcodes/statuses and purchase amounts; generated-ticket scenarios: event names and ticket barcodes; seating scenario: membership and event seat labels | The original values and any unselected member's access are recorded for comparison. |
| Open the invoice's Actions menu and select Void. | — | The Void transaction dialog lists the membership purchase. |
| Select the items for the recorded mode. | Full invoice: check Select all; selected member: open Show tickets/members on the chosen row and check only the recorded member barcode | Only the intended invoice or member is selected. |
| Select Void. | — | Confirmation explains that voiding cannot be undone and does not refund money. |
| Select Yes. | — | The void operation finishes successfully. |
| Refresh Transactions and reopen the invoice's member rows. | Recorded member barcodes | The selected member is Voided; any unselected member remains in its recorded status. |
| Inspect the original invoice and its purchase amounts. | Recorded before-values | Original amounts are unchanged, and the invoice is fully voided only for the full-invoice run. |
| Open the related void transaction in Transactions. | Same customer and original invoice reference | The void transaction and its item money amounts are zero. |
| For either generated-ticket scenario, open Dashboard → Check-in and select the recorded events in Tickets mode. | Either realized scenario or renewed-seasonal scenario; skip for StandardMembership | Tickets for the chosen member's events can be found. |
| Find each generated-ticket barcode for the voided member. | Recorded barcodes, including the Used ticket in the realized scenario; skip for StandardMembership | Every generated ticket is Voided and has no Scan action. |
| Refresh Check-in and repeat the ticket lookups. | Same barcodes; skip for StandardMembership | All of the voided member's generated tickets remain Voided. |
| For a selected-member run with generated tickets, find the unselected member's tickets in Check-in. | Recorded unselected barcodes | The unselected member's tickets retain their recorded active status. |
| For StandardMembership, reopen the membership’s public sales page and inspect the recorded level. | Previously sold-out membership level; do not add memberships to a basket | The level is no longer sold out and offers quantity selection again. |
| For RenewedSeasonalAssignedSeating, open the membership's public sales page, select Buy, and view its seat map. | Recorded membership seat labels; do not add seats to a basket | The voided member's seat is selectable and any unselected member's seat remains unavailable. |
| For RenewedSeasonalAssignedSeating, open each recorded event's public sales page, select Buy, and view its seat map. | Recorded event seat labels; do not add seats to a basket | The voided member's event seats are selectable and any unselected member's event seats remain unavailable. |

**Postconditions:**

* Retain invoices, void records, scan history, and before/after evidence; do not reactivate members or delete financial history as cleanup.
* Leave unselected members, tickets, and seats unchanged.
* Viewing public availability must not create a basket, order, or seat hold.

## Minimum Execution Set

For the reported regression, execute RealizedMembershipWithGeneratedTickets with full-invoice void first, then selected-member void on a fresh multi-member invoice. Keep StandardMembership and RenewedSeasonalAssignedSeating as existing SPT-940 regression coverage; do not claim those values passed from a realized-membership run. Also execute AdvancedRealizedMembershipWithGeneratedTickets in both void modes. Complete parameter coverage requires both void modes for all four values; the advanced run requires finance’s before/after comparison to prove every related row and payout link.

Complete financial acceptance additionally needs the backend comparison below; browser execution alone does not prove every realization row and payout link.

## Applied Advanced Scenario

Add AdvancedRealizedMembershipWithGeneratedTickets to SPT-940’s existing MembershipVoidScenario parameter, preserving the original three values, title, suite, and tags. Update Description and Parameters only; the existing 16 Steps already handle both realized ticket variants. Finance must verify that all related adjustment/negation rows close, all original money fields and advance/payout links remain unchanged, and no new reversal rows are created. The organizer acts on the original sale invoice. Applied on 2026-09-29 after the user approved “push”. Readback verified Description and all four parameter values; the original three values, title, suite, tags, and 16 steps were preserved. Evidence: `/private/tmp/spt940-advanced-applied.json`.

## Applied Update

Restored on 2026-09-29 at the user’s request after the saved case returned to five steps. The read-only comparison found all four approved fields differed; reapplication and readback verified all 16 steps and the saved field content. Retry evidence: `/private/tmp/spt940-retry-dry-run.json`, `/private/tmp/spt940-retry-applied.json`.

Dry-run scope: update only SPT-940 in suite 105; Description, Preconditions, Postconditions, and Steps; 5 → 16 steps. Preserve title, tags (memberships, post-purchase, transactions), MembershipVoidScenario and all three values, and other Qase metadata. No new case. Applied on 2026-09-29 after approval. Readback verified Description, Preconditions, Postconditions, and all 16 Steps. Title, suite 105, three tags, and all three MembershipVoidScenario values were preserved. Prerequisites contain three short bullets; scenario setup stays in Description, and before-values are captured in Steps. Verification summary: `/private/tmp/spt940-strengthen-applied.json`.

## Suggested Automated Coverage

Use target test `test_void_sale_invoice__realization_and_generated_tickets_voided_without_reversals` in `apps/financials/tests/services/revenue_realization/test_membership_revenue_realization_service.py` as the base backend regression. Verify the member and both tickets close, all related rows are voided, original base/stat amounts and fees are unchanged, no extra adjustment/negation reversal rows appear, and new VOID entries contain zero money. For the advanced scenario, use `test_selected_membership_void__advanced_realization_graph_voided_without_reversals` and attach before/after advance/payout-link assertions; this proves row closure and link preservation beyond the organizer-visible checks.

Reuse membership purchase and transaction navigation patterns for a browser flow that scans one generated ticket, voids the full invoice, waits for completion, and rereads member/ticket state. No automated or browser tests were executed here. Broad race and legacy cases are outside this narrowed manual request.

## Open Questions

- Which frontend version is paired with this backend commit, and does it use modern or legacy Transactions controls?
- Where will backend financial comparisons and the browser result be recorded? The reported backend sign-off remains unverified without run evidence.

## Copy-to-Qase review

Enhance only SPT-940 in suite 105. Preserve its live title, three tags, three existing MembershipVoidScenario values, Dashboard surface, full/selected-member flows, and inventory/seat assertions. Update only description, preconditions, postconditions, and steps (5 → 16). No creation, deletion, suite move, parameter removal, or unrelated field changes. Applied after dry run and user approval; saved fields and preserved metadata were verified. Browser QA remains pending.

Applied-extension review: dry run and saved-field verification passed for Description and params only (three → four values). All original values are retained; title, suite 105, tags, prerequisites, postconditions, and 16 steps were not written by this extension. Preview: `/private/tmp/spt940-advanced-dry-run.json`.
