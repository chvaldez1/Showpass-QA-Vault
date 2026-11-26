---
title: Showpass Release Engineering Handoff
tags:
  - qa/workflow
  - qa/release
---

# Showpass Release Engineering Handoff

Choose the review depth for the requested Showpass work. The same rules apply to every workflow, Tester, and Builder. Keep any review and decision in the existing work note or run. Apply the evidence and release decisions in [[00 Start Here/World-Class Software Quality Standard]]. For release readiness, use [[03 Test Cases/Release Decision Template]] and [[06 Prompts/Release Coverage Review]].

## Apply the review layer

| Work | Review |
| --- | --- |
| Release readiness, an engineering release handoff, or high-risk live work | **Full review.** Use this for behavior changes with shared or uncertain impact and work that may affect payments, fees, payouts, protected access, inventory, or ticket admission and scan rules. |
| Routine live or guided testing and setup | **Short review.** Use this for bounded read-only checks and ordinary reversible beta setup with a clear safety boundary, such as checking an existing Preview or saving a new isolated Draft. The Release Engineer records the affected business case, smallest useful proof, and stop point. The independent QA Lead signs off on the exact plan before live work. |
| Generate or flesh out manual test cases | Use [[00 Start Here/Showpass QA City#Draft test cases with review\|QA City's draft review]]. After both Masters review, consolidate material risks, identify shared proof and carry unresolved findings forward. Qase Police reviews the submitted fields before the QA Lead decides on that revision. Execution stays **Not run**. |
| Other draft-only work | Deliver the requested plan, wording edit or read-only planning note with any missing facts identified. Apply the appropriate review if the draft becomes a live assignment or release handoff. |

Saving a Showpass offering as **Draft** is live setup. A routine Preview read can use short review. Verifying that timed-entry wording and scanner behavior agree at the cutoff needs full review. Escalate when an action could have a material effect on money, access, committed inventory, admission, or shared data and the proposed checks cannot contain that risk.

### Plan the proof and stopping point

For a test or setup assignment, the matching Tester or Builder takes intake and writes the plan before engineering review. Send the exact revision to the QA Lead with the applicable engineering review. Direct any requested revisions back to the owner. The same owner carries the approved plan through execution and evidence. Name the environment, role and starting record or screen. For each action, say what you expect to observe and what you will capture to prove it. For a save, identify the record and fields to verify after reopening. State the allowed changes, cleanup or retained data, finish condition, and early stops.

For exploratory assignments, the Release Engineer and QA Lead check that the expected results trace to the user's requested outcome and that the proposed examples can expose realistic failures within scope. Record plan approval, individual test results, and the release decision separately. Apply the [[00 Start Here/World-Class Software Quality Standard#11. Finding Classification|finding classification]] when the implementation explains a failed check or product intent needs a decision.

Review whether the proposed check can safely gather the evidence. A bounded beta read or isolated reversible Draft can get exact-plan approval with preflight checks inside the plan. Confirm the authorized environment, Organization, role, controls and applicable readiness before the dependent action. Stop when a preflight fails, a save cannot be reconciled, or continuing would require a new permission or unapproved effect. Carry unresolved behavior into the test as expected proof to collect. An unobserved result or unavailable beta revision alone does not require full review or block a bounded check. Tie evidence to the deployed candidate for release decisions and resolve any material risk the test cannot contain before approving the affected action.

For example, create one Monthly Draft Membership Group and one Level in the authorized beta Organization. Reopen both records to verify their IDs, the saved Monthly setting, and that the Group stayed Draft after the Level save. Stop if adding the Level requires **Publish**, the record belongs to a different Organization, or the first save cannot be reconciled. A disclosed, approved preflight and stop belong to the same revision. A change beyond that boundary requires fresh review and QA Lead sign-off.

### Full review sequence

**Release Engineer → Backend Master + Frontend Master → Release Engineer handoff → QA Lead sign-off.**

1. **Release Engineer scopes the revision.** Record the user's requested outcome, relevant candidate or test target, affected business cases and clients, and what proof matters. For a branch or PR review, identify the base and candidate revision in each affected repository. For a Tester or Builder, start from their proposed plan.
2. **Both Masters review the same scope in separate reviewer contexts.** Start with [[01 Repositories/Backend - web-app]] and [[01 Repositories/Frontend - showpass-frontend]]. The Backend Master traces rules and saved outcomes. The Frontend Master traces affected entry points, shared callers, and what people see. Independent Builder source passes can start together after scoping. Resolve any dependency between their findings in the handoff. Record a reference for each source claim and identify missing evidence or a surface outside scope.
3. **Release Engineer submits the handoff.** Combine both findings, the needed proof, known results and exact gaps, business impact, and a clear next action. Keep a focused plan or draft review brief. Add rollout checks, a stop signal, recovery or rollback, and stakeholder communication when the scope includes release readiness.
4. **QA Lead independently signs off on the exact revision.** Decide whether the scope can proceed and give concrete changes or blockers. Before live or guided testing and test-data setup, the decision applies to the plan. For release readiness, record **Ready for Engineering** or **Changes requested** separately from the release recommendation. A handoff can be ready for Engineering with a release blocker that Engineering needs to address.

Linked prompts and nested workflow steps reuse the same review record for the same revision. When called into the review, each role completes its assigned stage and returns its findings to the next role. If the candidate, plan, scope, or decision-relevant evidence changes, identify the change and obtain fresh QA Lead sign-off on the updated engineer handoff. Both Masters may cite findings that still apply and review only what changed. If a reviewer is unavailable, record the missing review and leave sign-off pending.

## Business cases to protect

| Area | What to establish when affected |
| --- | --- |
| Purchase and recovery | The supported combinations of item, sales channel, client or device, processor, payment method, and Organization setup. Include currency, region, account state, and permissions when they affect behavior. Prove clean success and the applicable decline, timeout, retry, delayed completion, and repeated-callback outcomes. Check the intended charge, saved order, issued items, and inventory. |
| Post-purchase and admission | The right Customer or Attendee can find, receive, download, print, or use the item. Verify ticket scan and admission behavior on the affected client. Trace applicable Refund, Void, Exchange, and transfer effects to access, money, and inventory. |
| Fees, taxes and credits | Independently reconcile prices, taxes, discounts, credits, rounding, and fee amounts. Verify who pays and receives each fee, including Showpass revenue and what is retained or returned during adjustments. |
| Reports, earnings and payouts | Reconcile known orders and adjustments to reports, exports, earnings, and expected payout amount, currency, timing, and status when affected. |
| Organizer and staff operations | Preserve the ability to configure and sell the offering, find the right order, and understand success or recovery. Include shared clients even when their files are unchanged. |

Account for supported combinations and explain exclusions from evidence. Run fresh checks for changed behavior and reuse evidence only when it applies to the candidate and configuration. Keep coverage completeness separate from current execution. A planned check stays **Not run**. A confirmed required-gate failure is **No-Go** for the affected scope. Missing required proof gives **Decision blocked by named missing evidence**. Use the four recommendations from the canonical standard.

## Scope boundaries

Source reviews are read-only. Keep source findings, verified live results, and proposed checks distinct. The handoff and QA Lead sign-off document a decision. Live testing, production access, publication, deployment, rollback, and stakeholder communications follow the Vault's separate authorization rules.
