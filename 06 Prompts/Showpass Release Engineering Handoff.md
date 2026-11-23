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
| Routine live or guided testing and setup | **Short review.** Use this for bounded read-only checks and ordinary reversible beta setup with known behavior, such as checking an existing Preview or saving a standard test Event in Draft. The Release Engineer records the affected business case, smallest useful proof, and stop point. The independent QA Lead signs off on the exact plan before live work. |
| Draft-only work | **Stay at draft scope.** Examples include a local plan, draft cases, wording changes, and read-only planning notes. Deliver the requested draft with any missing facts identified. Apply the appropriate review if the draft becomes a live assignment or a release handoff. |

Saving an Event in Showpass with the status **Draft** is live setup. A routine Preview read can use short review. Verifying that timed-entry wording and scanner behavior agree at the cutoff needs full review. If a short review uncovers a high-risk action or an uncertain rule that could materially affect the outcome, use full review before proceeding.

### Full review sequence

**Release Engineer → Backend Master + Frontend Master → Release Engineer handoff → QA Lead sign-off.**

1. **Release Engineer scopes the revision.** Record the user's requested outcome, relevant candidate or test target, affected business cases and clients, and what proof matters. For a branch or PR review, identify the base and candidate revision in each affected repository. For a Tester or Builder, start from their proposed plan.
2. **Both Masters review the same scope in separate reviewer contexts.** Start with [[01 Repositories/Backend - web-app]] and [[01 Repositories/Frontend - showpass-frontend]]. The Backend Master traces rules and saved outcomes. The Frontend Master traces affected entry points, shared callers, and what people see. Use relevant backend findings for the frontend review. Record a reference for each source claim and identify missing evidence or a surface outside scope.
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
