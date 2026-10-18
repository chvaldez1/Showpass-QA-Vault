---
title: Showpass QA Test Case Generator
tags:
  - qa/prompt
  - test-design
  - qase
---

# Showpass QA Test Case Generator

Generate source-backed, Qase-ready manual cases. For comparison with existing Qase coverage, use [[06 Prompts/Showpass Qase Gap Analysis]]. Optimize for useful proof and repeatable execution; case count alone is not a coverage goal.

## Canonical Relationship

Read [[00 Start Here/World-Class Software Quality Standard]] first. It owns scope, testing intent, proof targets, coverage accounting, evidence, safety, findings, and readiness. This workflow owns the procedure; link to the rules instead of restating them in every output.

Apply [[05 Tooling/Qase Test Case Writing Rules]] to every Qase-ready draft. It owns case fields, titles, tags, parameters, prerequisites, readability, and the Copy-to-Qase Review Gate. Use [[05 Tooling/qasectl]] for Qase access and write approval.

Use [[00 Start Here/Showpass QA Handbook/00 Index|Showpass QA Master Handbook]] selectively for Showpass knowledge. Its recipes are investigation aids, not proof of current behavior or executed tests.

## Workflow Routing

| Request | Flow | Qase access |
| --- | --- | --- |
| New cases, feature/regression coverage, Jira-derived cases, PR QA plan | [[#Test Case Generator Flow]] | None |
| Gaps, duplicate analysis, whether existing coverage is enough | [[06 Prompts/Showpass Qase Gap Analysis]] | Read only |
| Review/enhance exact existing case IDs | Exact-ID Review in [[05 Tooling/qasectl]] | Read named cases; broader search only for requested gap/duplicate analysis or a proposed new case |

Neither flow authorizes Qase writes. Prepare a dry-run preview and obtain explicit confirmation of the exact write scope before apply, following the Qase guide. Multi-case writes use its batch-plan script and readback verification.

Examples: [[06 Prompts/Example - Generate Test Cases]] · [[06 Prompts/Example - Qase Gap Analysis]] · [[06 Prompts/Jira Card To Test Cases]].

## Efficient Investigation

1. Find and reuse the active note for the same request, feature, Jira ticket, or Qase work item. Read existing user edits and evidence before searching again.
2. Set breadth: **focused workflow** by default; **full page** when requested; **finite full matrix** only when explicitly requested. Full-page coverage inventories all relevant controls, child controls, states, validation, effects, and cleanup within that page/context. A focused request accounts for its own paths and dependencies; record unrelated observations separately.
3. Read the canonical standard and applicable writing rules once per task. From the handbook index, select only the relevant setup sections, product playbook, and integration passes below. Do not load the whole handbook or all repository guides.
4. Search the nearest backend implementation first, then frontend callers and relevant tests. Expand along actual dependencies and affected consumers. Batch independent reads; reuse reviewed paths, source revisions, and valid evidence. Re-read when source, build, state, or scope changes.
5. Gather current navigation, UI wording, conditional states, and useful screenshots during one authorized browser walkthrough. Do not replay mutations just to improve documentation. Keep source facts, browser observations, existing case definitions, and executed results distinct.
6. Stop expanding when every declared item has a proof target and coverage decision, expected results/setup are sourced or explicitly unresolved, and another case would repeat the same proof. Do not stop at an arbitrary number of cases or silently reduce requested combinations.

### Select Handbook Knowledge

| Need | Read only the applicable sections | Bring into this task |
| --- | --- | --- |
| Actors, Venue, client, configuration, permissions/flags | [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup]] | Correct actor versus recipient, exact gates, supported setup and original values; production-to-TEA comparison only when relevant and authorized |
| Feature behavior | Matching playbook from the [[00 Start Here/Showpass QA Handbook/00 Index\|index]] | Setup → action → final business result, bound to current source |
| Money, recipients, ownership, completion | [[00 Start Here/Showpass QA Handbook/03 Evidence and Expected Results]] | Independent amounts, exact expected items/people, fresh final reads |
| Shared behavior, existing records, failures, concurrency, migration | [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes]] | Only passes justified by the changed contract or requested workflow |
| Purchase or post-purchase effects | [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage]] | Applicable issuance, answers, delivery, admission, fulfillment, accounting, analytics and external consumers; disabled versus inaccessible outcomes |
| Automation candidates or physical devices | [[00 Start Here/Showpass QA Handbook/06 Automation Strategy]] | Existing assertions to extend, right testing layer, and named native/hardware checks |

Record selected sections in Sources Reviewed and apply useful facts directly. Do not copy handbook checklists or require every offering, payment method, adjustment, or integration in every case. Keep selected Refund, Void, and Exchange branches on independent orders; preserve an untouched control where it helps detect collateral change.

## Testing Intent Gate

Before cases, state:

`We are testing whether <actor/surface> can <workflow> while <business invariant> stays true; this matters because <bad outcome>, and we will prove it with <observable proof>.`

Record the canonical intent fields: criticality bucket, invariant, actor impact, failure mode, proof, surfaces, in/out scope, and confidence with evidence gaps. Combine with the scope summary rather than repeating them in several sections.

Build a Proof Target Map. Each case must protect a distinct outcome or materially different risk. Include clean success independently of failure/retry. Add negative, boundary, missing-input, permission, cancellation, persistence, downstream, and regression checks where applicable; explicitly account for exclusions and blockers.

Use [[02 Feature QA/Checkout Criticality From Jira Major Critical Export]] when incident calibration helps prioritize. Money, admission, ownership, customer data, final order state, and recovery deserve strong proof. A one-off script, content change, printer request, or support workaround warrants broad regression coverage only when source reveals reusable product risk. If intent is unresolved, record the exact question and continue independent known work without inventing cases.

Apply [[00 Start Here/World-Class Software Quality Standard#Financial and Core Transaction Gates]] to applicable scope. Include executable proof targets for price/fee protections, valid item and rate-card create/update/save, clean purchase, duplicate-charge prevention and stock limits. Record actual configuration exceptions and independent expected amounts. Separate case definitions from executed proof; missing required evidence must remain blocked in any readiness conclusion.

## Branch / PR Scope Gate

For a supplied PR/branch or requested diff-based coverage:

1. Record the active branch, intended base, and exact reviewed base/head revisions. Inspect that comparison before broad feature searches; do not switch or update repositories merely to read it.
2. Summarize changed user behavior, including relevant API/schema, permission, validation, job, callback, and shared-component changes.
3. Trace changed backend/shared behavior to all actual consumers, including unchanged clients. Separate directly changed and indirectly affected clients with source evidence.
4. Keep **entry points** (where/how the actor starts) separate from **outcomes** (success, cancel, failure, timeout, retry, supported recovery, delayed/duplicate final updates). Include provider callbacks, webhooks, polling, and background completion when they affect final business state.
5. Verify client-specific controls. Unsupported recovery choices are Not applicable with evidence; inaccessible supported behavior is Blocked. One successful retry does not prove clean success.

Jira-only intake keeps the no-diff rule unless the user explicitly requests branch/diff coverage. A PR supplied only as a reference informs the named task; it does not expand scope to testing that whole PR.

## Jira Card Intake

Follow `AGENTS.md` Jira Access rules: discover and use the connected Atlassian Rovo issue-details tool, requesting description, status, priority, and comments. Report the specific connector failure if reading fails; do not replace it with a local token reader or unauthorized browser access.

Summarize the problem, acceptance input, affected actors/surfaces, and unresolved comments briefly. Verify expected behavior in backend and frontend source. Choose generation or gap analysis from the user's goal, not merely from a Jira link. Do not run diffs or query Qase for ordinary Jira-to-case generation. Do not write to Jira unless requested.

## State-Distinct Entry Point Audit

Ask: **Can the actor reach this action another way that leaves different starting state?** Trace visible callers into the shared workflow; convergence on one modal/component does not establish equivalence.

Consider viewed versus attached customer, existing versus empty basket, uninterrupted versus reopened modal, direct versus redirected entry, client-only versus saved state, and permission/flag/Venue differences. For multi-path work, record:

| Entry Point | Visible Actor Path | Starting State | Supported Client / Evidence |
| --- | --- | --- | --- |

Parameterize equivalent actions/results with a short entry-point value and a complete mapping inside each case. Keep dependent setup together; avoid invalid independent combinations. Split materially different flows or an overloaded existing case. Track outcomes separately, in the same ledger if clear; add another matrix only when it resolves real client/outcome differences.

## Dashboard UI Organization

For Dashboard `/manage/` pages, apply [[03 Test Cases/Test Cases by Feature#Dashboard UI Organization]]. Group cases and gap rows by **visible navigation section → menu group, when present → destination page → actual tab/subpage**. The screen owning the behavior determines placement; a route string or setup screen does not.

Verify current navigation definitions and use an already-open relevant browser to enrich labels/state when available. Record the visible path, source/route evidence, owning feature folder, and existing or proposed Qase suite together. Use the same grouping for inventories, cases, gaps, and minimum execution sets. Keep cross-screen journeys in one owning group and reference other touchpoints. Navigation grouping is not a reason to duplicate equivalent cases or move existing Qase suites.

For replacement pages and legacy embeds, apply [[00 Start Here/World-Class Software Quality Standard#Preserve Access During Page Migrations]]. Inventory old business functions before reviewing the new controls, and prove their replacement paths from the user's actual landing page. Include a focused navigation proof target for important moved functions; a working direct URL or standalone new menu does not cover access from the retained Dashboard shell.

## Already-Open Codex Browser

The user's standing preference is to use an already-open, relevant Codex browser to improve generation and gap analysis. Follow the browser rules in `AGENTS.md` and the selected runtime's exposed APIs.

- Check available tabs once when relevant. Reuse the matching session; verify environment, role, Organization and page before relying on it. Do not inspect unrelated tabs or start a new browser/session solely because a URL was supplied.
- Use read-only navigation, opening menus/tabs/dialogs, and other non-saving interactions with known behavior to confirm visible labels, grouping, defaults, disabled/empty/error states, and supported paths. Derive permitted roles and flags from source; one session cannot establish every permission state.
- Combine observation and evidence capture in one pass. Preserve relevant screenshots with brief captions beside the claim they support; do not require a screenshot after every draft step. A requested executed browser guide can follow its own evidence requirements.
- A generation/gap request does not by itself authorize saving, creating, deleting, sending, purchasing, refunding, or triggering jobs. Execute those only within the user's authorized test-data/cleanup scope. Use [[06 Prompts/Interactive Browser Release Testing]] for requested execution and the canonical mutation proof rules.
- Browser observations enhance source investigation. Record deployed/local differences; do not replace an expected result with whatever the current page shows. Screenshots, successful clicks, and loaded routes do not prove persistence, one charge/order, delivery, or downstream completion.
- If no suitable session/access is available, continue source-backed drafting. Record the exact unverified UI fact when it matters. Separate Confirmed, Inconclusive, Client-side risk not submitted, and Product-expectation question; never call an unexecuted case passed.

Keep stable roles/labels/test IDs and their provenance in automation notes only when useful. Temporary browser element references are not reusable Playwright selectors and do not belong in manual steps.

## Settings And Amount Coverage Review

Apply [[05 Tooling/Qase Test Case Writing Rules#Readable Parameters And Combination Accounting]] and [[05 Tooling/Qase Test Case Writing Rules#Settings Coverage Versus Financial Proof]].

- Record exact source revisions; local checkout, remote ref, supplied branch, and deployment are different evidence.
- Map every parameter value to exact supported setup within its case. Separate independent controls; keep dependent combinations together. State selected combinations and run count separately from case count. A finite full settings matrix proves only its stated settings outcome.
- Account separately for available controls, save/reopen, customer preview, completed money movement, and financial records. Isolated fee/shipping checks do not prove combined refund calculations.
- Calculate financial expectations from independent original amounts. Name missing tax/fee breakdown or unsupported setup as Blocked instead of inventing an Admin field or a runnable recipe.
- After an approved Qase write, verify stored fields/parameters and update the canonical note and any relevant maintained handbook status. Publication is not execution.

## Test Case Voice And Grouping

Use the writing rules as the field-format authority. Each copied case must stand alone: exact required permissions, concise find-or-create setup, parameter mappings, named starting screen, visible actions/results, and restoration or intentionally retained data. Define unfamiliar Showpass terms when first needed.

Keep implementation, Jira traceability, coverage commentary, and selector hints outside execution fields. Prefer visible navigation to hard-coded routes, except when the route itself is tested or no visible navigation exists. Use local `TC-*` labels outside the Title; use `SPT-*` only for real existing Qase IDs.

Before adding cases, compare actions, expected results, starting state, and risk. Parameterize equivalent single/recurring Event, entry-point, role, or client variants when one short mapping and step set remain clear. Split when setup, outcome, permission boundary, or recovery changes materially. Use short PascalCase parameters, relevant Platform/View rows in Description, and 1–3 approved tags. Do not cap useful coverage at a fixed case count or inflate it with cosmetic variations.

## Test Case Generator Flow

1. Resolve the active output note, request breadth, intent, and proof targets. Fetch Jira intake or review the exact PR comparison only when applicable.
2. Inspect backend truth → frontend paths/consumers → relevant existing assertions. Use selected handbook sections and the already-open browser as described above. Inspect source-only behavior without presenting it as executed proof.
3. Build one scope inventory/coverage ledger including controls and child controls, states, validation, permissions, mutations, downstream effects and cleanup. Add state/combination and entry/outcome tables only where they clarify real differences.
4. Draft standalone cases in UI/workflow order. Cover distinct risks and preserve every declared item through a case, existing reference, or explicit Manual-only, Deferred, Not applicable, or Blocked decision with reason/evidence.
5. Apply the Copy-to-Qase Review Gate in isolation to every case. Check parameter/run accounting, source expectations, navigation grouping, and the minimum execution set. Save in the canonical note. Do not query Qase or label this a Qase gap analysis.

## Read / Gap Analysis Flow

Use [[06 Prompts/Showpass Qase Gap Analysis]] as the dedicated owner. It compares actual existing coverage and delivers focused Qase-ready cases first, with compact analysis/evidence afterward. This heading remains for existing links; do not use the generation report layout for gap-analysis output.

## Vault Output Target

Use [[03 Test Cases/Test Cases by Feature]] for filing. Reuse the active note for the same scope; consolidate later revisions there. Otherwise create `03 Test Cases/<feature>/<feature-or-scenario>-test-cases.md` or `*-qase-gap-analysis.md`. A bare filename is relative to the owning feature folder. Keep output there unless the user explicitly requires another location.

Never generate output into `*Template.md` unless the user explicitly asks to edit/overwrite that scaffold. Apply Dashboard UI grouping inside the note; add nested navigation folders only for new or explicitly reorganized work. Preserve existing notes, links, IDs and user edits.

### Compact Output Contract

Keep one canonical artifact with these contents; combine sections/tables when clear, omit empty sections, and avoid duplicating the same fact:

1. **Testing Intent and Scope:** canonical intent fields, breadth, roles/clients/configuration, boundaries and confidence; short changed-behavior/Jira summary when applicable.
2. **Sources Reviewed and Behavior:** actual revisions/files, selected handbook sections, verified behavior, independent expected values, and browser environment/observations or evidence conflicts.
3. **Proof Targets and Coverage Ledger:** every declared item, risk, case/reference or disposition with reason/evidence; selected combinations and required setup. In design work, label case mappings as planned/not executed. Execution requires evidence under canonical statuses.
4. **Existing Coverage and Gaps** for gap analysis: query summary and decision table; definitions versus execution kept separate.
5. **Manual Cases:** standalone Qase fields in owning UI/workflow order. Keep essential setup inside each case even if a note-level data overview is useful.
6. **Minimum Execution Set and Remaining Work:** exact case/parameter selections and why, excluded/deferred/device/backend proof, focused automation candidates when useful, and precise unresolved questions. A minimum set is a prioritized subset, not a claim that remaining scope passed.

This replaces the old requirement for many overlapping report sections; it does not remove canonical coverage obligations. For an actual browser run, retain required findings, execution evidence, cleanup proof and release recommendation. Drafting or publishing cases is not release sign-off.

## Source Context

- Backend truth: [[01 Repositories/Backend - web-app]] — `/Users/christianvaldez/Documents/Showpass/repos/web-app`.
- Frontend paths/presentation: [[01 Repositories/Frontend - showpass-frontend]] — `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`.
- Existing automation patterns: [[01 Repositories/QA Automation - showpass-playwright]] — `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`. Inspect assertions before suggesting a duplicate; choose backend/component/browser/device layers from the handbook.

Tuning reference: [Playwright PR #458](https://github.com/showpass/showpass-playwright/pull/458), reviewed at head `d321dfda77fb80021dd7543ccea5062dce983335` against base `74781e488ad122e023d8c79594cca09b5956a0f2` on 2026-10-15. Adopted focused versus full-page scope, outcome-driven QA judgment, one-pass evidence gathering, session reuse, and concise reporting. Its browser-guide exceptions to ledgers, shared setup, IDs, and readiness do not replace the vault's canonical accounting or standalone Qase rules. UI organization also follows local Playwright `docs/agent-workflows/standards/test-architecture.md#ui-aligned-test-folders`; verify current navigation before applying it.

## Agent Reminder

Route gap analysis to [[06 Prompts/Showpass Qase Gap Analysis]]. For generation, prove expectations from source, reuse relevant context, account for all declared scope, and write distinct, focused cases. Use the open relevant browser to improve accuracy without turning drafting into unrequested mutations. Keep one maintained note and make unknowns explicit.
