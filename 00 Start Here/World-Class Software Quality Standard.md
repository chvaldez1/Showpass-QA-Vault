---
title: World-Class Software Quality Standard
date: 2026-07-26
tags:
  - qa/standard
  - quality
  - coverage
aliases:
  - Manual QA Principles
  - QA Coverage Standard
---

# World-Class Software Quality Standard

> [!important] Canonical quality standard
> This is the single vault-owned, product-independent quality standard for requirements review, test design, browser and exploratory testing, test-management planning, automation planning, bug verification, regression selection, and release decisions.
>
> Local product workflows may add domain rules and tool instructions, but they must not redefine or weaken this standard.

## Goal: Account for the Declared Scope

The target is **100% accounted-for coverage** for the declared scope.

This does not mean testing or automating every permutation. It means every meaningful in-scope user impact, entry path, control, state, validation rule, mutation, side effect, failure mode, permission boundary, and cleanup path is classified as one of:

- Automated
- Manually executed
- Browser/exploratory verified
- API/backend verified
- Manual-only
- Deferred
- Not applicable
- Blocked

Nothing is implicitly covered because a route loaded, a component was visible, an API returned 200, a smoke test passed, or the happy path worked.

## Quality Doctrine

- **Evidence over confidence:** Every claim must be traceable to requirements, source, execution, persisted state, downstream proof, or an explicitly accepted risk.
- **User harm over test count:** Prioritize correctness, safety, money, access, ownership, privacy, fulfillment, recovery, and trust rather than maximizing case volume.
- **Complete accounting over implied coverage:** Unknown, deferred, manual-only, not-applicable, and blocked work remains visible.
- **Reproducibility over intuition:** Another capable person should be able to follow the artifact without guessing the author's intent.
- **Lifecycle proof over momentary UI state:** Mutations require acceptance, persistence, downstream evidence, and cleanup or isolation.
- **Safe testing over reckless completeness:** Never damage shared data merely to change a coverage status.
- **Independent challenge over confirmation bias:** Seek counterexamples, alternate entry paths, invalid states, races, and evidence that could disprove the current conclusion.
- **Learning over frozen doctrine:** Correct findings and improve the standard when stronger evidence appears.

## Source and Evidence Authority

Use sources in this order:

1. Authoritative business requirements, invariants, regulatory obligations, and system-of-record contracts.
2. Implementation source for schemas, APIs, permissions, validation, mutations, async behavior, and business rules.
3. Client source for entry paths, controls, state, validation presentation, and visible outcomes.
4. Live-system behavior for environment-specific execution evidence.
5. Existing automated tests for durable regression patterns and current execution evidence.
6. Test-management systems for existing manual coverage when the task requires a read or gap analysis.
7. Tickets, PR descriptions, designs, analytics, incidents, and user reports as intake evidence rather than the sole source of truth.

When sources disagree, record the conflict. Do not silently choose the source that produces the easiest test.

## Local Showpass Application Profile

Apply the universal authority model locally as follows:

1. Backend behavior is first source of truth for schemas, APIs, permissions, validation, mutations, async behavior, and business rules.
2. Frontend behavior defines routes, state-distinct entry paths, controls, validation presentation, and visible outcomes.
3. Live browser behavior supplies environment-specific execution evidence.
4. Playwright supplies durable automation patterns and current regression evidence.
5. Qase supplies existing manual coverage only when the request requires a read or gap analysis.
6. Jira, PR descriptions, designs, and user reports are intake evidence.

Local workflow bindings:

- Test design and Qase-ready case generation: [[06 Prompts/Showpass QA Test Case Generator]]
- Existing Qase coverage comparison with case-first output: [[06 Prompts/Showpass Qase Gap Analysis]]
- Interactive browser and release execution: [[06 Prompts/Interactive Browser Release Testing]]
- Qase writing format: [[05 Tooling/Qase Test Case Writing Rules]]
- Qase reads and writes: [[05 Tooling/qasectl]]
- Jira intake: Atlassian Rovo plugin, following the Jira Access rules in `AGENTS.md`.

The Playwright repository's `manual-qa-principles.md` and `showpass-qa-test-case-generator.md` informed this standard. They remain useful engineering references, but this vault note is the canonical quality policy.

### Consolidation Decisions

Where earlier guidance differed, the vault now resolves it as follows:

- **Product source order:** Backend first for business behavior; frontend for user paths and presentation.
- **QA artifact location:** Test plans, execution notes, and coverage ledgers live under `03 Test Cases/`, not a repository-local `qa-test-case-output/` folder.
- **Manual case format:** Qase-ready cases follow [[05 Tooling/Qase Test Case Writing Rules]], not a generic GIVEN / WHEN / THEN template.
- **Coverage target:** 100% accounted-for declared scope, not exhaustive permutation testing.
- **Workflow ownership:** Cross-cutting policy lives here; test design and browser execution remain separate prompts that inherit this standard.
- **Repository documents:** External workflow files are upstream references for implementation and history, not competing canonical local instructions.

## 1. Declare Scope Before Claiming Coverage

Every QA artifact or run must state:

- Product area, route, workflow, API, job, integration, or data flow.
- User roles, permissions, organizations, venues, ownership, feature flags, plans, and entitlements.
- Environments, clients, browsers, platforms, and viewports.
- Existing-data and lifecycle states that materially change behavior.
- Test-data ownership: shared, disposable, reversible, seeded, production-like, or manual-only.
- In-scope entry paths and outcomes.
- Out-of-scope areas with reasons.
- Known fixtures, missing fixtures, assumptions, and blockers.

If scope is unclear, the work can be Draft, but it cannot be called complete or release-ready.

## 2. State the Testing Intent

Before creating or executing coverage, answer:

`We are testing whether <actor and surface> can <workflow> while <business invariant> stays true; this matters because <bad outcome>, and we will prove it with <observable evidence>.`

Record:

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Money/order state, fulfillment/access, inventory/ownership, financial math, reporting agreement, permission boundary, async final state, live sales completion, or lower-risk product quality. |
| Business invariant | What must remain true? |
| Actor impact | Who is harmed if it fails? |
| Failure mode | What incorrect outcome is being prevented? |
| Observable proof | What visible or source-backed result proves correctness? |
| Primary surfaces | Which clients, routes, entry paths, or downstream systems matter? |
| In scope | Exact workflows, roles, data states, and outcomes. |
| Out of scope | Similar variants intentionally excluded and why. |
| Confidence | High, Medium, or Low with the evidence gap. |

## 3. Build a Proof Target Map

Every test or executed check must prove a named outcome.

| Proof Target | Why It Matters | Coverage |
| --- | --- | --- |
| Example: saved assignment survives reopening | Prevents silent inventory loss | TC-1; browser persistence check |

Keep the map focused. Remove or defer checks that do not protect a distinct invariant, actor impact, state transition, permission boundary, financial or fulfillment outcome, or realistic regression risk.

## 4. Create the Coverage Contract

Before calling coverage complete, inventory and classify the following.

### Product Surface Inventory

List applicable:

- Routes and entry actions
- Page regions and conditional panels
- Fields and validation messages
- Selectors, pickers, editors, uploads, and complex controls
- Buttons, links, menus, row actions, and modal footers
- Loading, empty, success, error, disabled, and stale states
- API calls, jobs, callbacks, webhooks, emails, notifications, exports, and reports
- Permissions, ownership gates, feature flags, plans, and client variants

### Preserve Access During Page Migrations

For a replacement page, embedded page, or navigation change, inventory the **business functions available before the change**, including functions moved outside the new page. Comparing only the new sidebar or form cannot establish completeness.

Use the existing coverage ledger, with one row per affected function:

| Business Function | Previous Visible Path | Actual Supported Starting Page | Replacement Visible Path | Role / Flag | Case / Evidence / Status |
| --- | --- | --- | --- | --- | --- |

- Start from where users actually arrive after sign-in or organization selection. If organizers still land in `/dashboard/`, prove the path from that shell; a standalone `/manage/` menu cannot substitute for it.
- Follow visible links to the owning screen for the same organization. Record navigation access separately from direct URL access and from the screen's save/behavior checks. A working deep link proves neither discoverability nor a navigation pass.
- Account for supported old/new rollout states and roles when they change available paths. Trace wrapper menus, embedded navigation, redirects and feature flags together; a route mapping in code is not evidence that users have a link to it.
- A moved business function is not out of scope merely because another screen owns it. Its replacement navigation remains in migration scope; deeper behavior may be deferred separately with a reason. Label missing links Failed when reproduced, or Blocked/Unverified when evidence is unavailable.
- Include a focused navigation regression for important moved functions, especially fees/taxes, payouts, refunds, permissions and customer communications. Run from the actual landing page before opening direct URLs for diagnosis.

### State-Space Model

Identify setup axes that materially change behavior:

- Role, permission, organization, venue, or ownership
- Feature flag, plan, or entitlement
- Entity lifecycle and existing-data state
- Entry path and client
- Item, event, payment, processor, currency, locale, or timezone
- Browser, viewport, or device
- Success, cancellation, failure, retry, timeout, and delayed final state

Use risk-weighted or pairwise combinations. Do not create a full Cartesian product.

### State-Distinct Entry Paths

Do not assume paths are equivalent because they converge on one component.

Treat a path as distinct when it changes starting state, including:

- Entity already selected or attached versus merely viewed
- Modal kept open versus closed and reopened
- Empty basket versus existing items
- Direct navigation versus redirect, deep link, or handoff
- Client-only state versus already-persisted state
- Role, permission, feature flag, venue, or customer context

Keep entry paths separate from outcomes:

- Entry path: how the actor arrives.
- Outcome: how the workflow succeeds, fails, cancels, retries, or recovers.

### Test Classes

Account separately for applicable:

- Clean success
- Negative and rejected actions
- Boundary values
- Missing or omitted input
- Permissions and ownership
- Unsupported or disabled states
- Cancellation and abandonment
- Error and recovery
- Persistence after reload, reopen, or switch-away
- Downstream and cross-route effects
- Regression and exploratory risk

A successful retry does not replace a clean baseline success case.

## 5. Maintain a Coverage Ledger

Use this shape in test plans, browser-run notes, automation reviews, and release checklists:

| Item | Type | Risk | Coverage | Evidence | Gap / Decision |
| --- | --- | --- | --- | --- | --- |
| Editable setting | Form field | Data loss | Manual: save and reopen | Browser + response | Cleanup proven |
| Permission gate | Access control | Data exposure | Blocked | No restricted account | Fixture required |

Allowed coverage labels:

- Visible only
- Automated: interaction
- Automated: save success
- Automated: persistence
- Automated: cleanup/restore
- Automated: validation/error
- Automated: request payload
- Automated: downstream effect
- Browser-verified only
- API/backend verified
- Manual: executed
- Manual-only
- Deferred
- Not applicable
- Blocked

Every Deferred, Manual-only, Not applicable, or Blocked item needs a reason and the evidence or fixture required to change its status.

## 6. Evidence Rules

### Visibility Is Not Behavior

Visible controls are not covered until their applicable interactions, state changes, validation, persistence, or side effects are exercised or explicitly deferred.

### Mutations Need Lifecycle Proof

For create, update, delete, upload, import, export, payment, refund, send, publish, schedule, permission, or state-transition behavior, account for:

1. Controlled starting data.
2. User action.
3. Concrete success signal.
4. Request or backend acceptance when relevant.
5. Persistence after reload, reopen, or fresh read.
6. Downstream effect.
7. Cleanup or safe isolation.

### Side Effects Need Named Evidence

State exactly what was proven:

- Request accepted
- Payload correct
- Job enqueued
- Job completed
- Notification delivered
- File contents correct
- Inventory changed
- Report or payout updated
- Downstream record persisted

Do not claim delivery or completion when only the initiating request was observed.

### Expected and Unexpected Errors Must Be Separated

A planned validation error must not hide a second unexpected toast, console error, network failure, or stale state. Record them separately.

### Persistence Must Be Fresh

In-memory UI state is not persistence proof. Reopen, reload, switch away and back, poll, or re-read through another supported surface.

### Financial and Core Transaction Gates

Treat prices, fees, taxes, discounts, commissions, credits, refunds, payments and sellable inventory as high-risk behavior. Include the item and rate-card create/update/save workflows needed to configure and sell them. A broken setup or Save action can prevent sales or leave the wrong financial rules in effect.

For each applicable gate below, define the expected result from source and the actual organization, item, role and configuration before execution. Track clean success separately from invalid input, cancellation, failure and recovery. Do not require unrelated financial scenarios for a purely visual scope; record why a gate is not applicable.

| Required gate | Minimum proof |
| --- | --- |
| Sold-item price and fee protection | Establish the actual sale/lock state and configuration governing edits; verify the required disabled controls and saved protection. Preserve existing purchases and their historical amounts. A possible tiered-pricing or flag exception remains a hypothesis until its actual value and supported behavior are verified. |
| Create/update an item | With supported permissions and valid data, create or update the intended item, reopen it and verify the exact saved fields and variants; related items remain unchanged. Opening the form does not prove this workflow. |
| Create/update rate cards | Save and reopen the rate card, verifying its amount, payer, item/payment/channel scope, conditions and precedence. Separately prove that the applicable purchase uses the expected rule; a saved card alone does not prove fee calculation. |
| Purchase successfully | Complete a clean purchase through each affected supported entry point; prove the intended order, usable items and independently calculated amount, with the expected payment records. A payment-method rejection expected by the scenario is not a successful-purchase failure. |
| Prevent duplicate charging | Repeated submission, refresh, retry, delayed completion and repeated callbacks must not collect more than the intended amount or create duplicate orders/items. Compare unique payment references and final states; account explicitly for legitimate split payments or installments. A timeout is not evidence that charging failed. |
| Prevent overselling | Prove finite capacity, exact variant/seat ownership and reservation/release rules, including controlled last-unit contention when affected. Accepted purchases must not exceed sellable stock or consume it twice. A displayed sold counter alone is insufficient. |
| Save correctly | Verify valid changes persist after a fresh read. Rejected/failed saves must not show false success, leave unintended partial changes, lose protected existing values or cause duplicate records on recovery. |
| Preserve financial outcomes | When affected, independently reconcile fees, taxes, discounts, commissions, credits, refunds, earnings and inventory through supported post-purchase changes and final reporting. Verify who pays and receives each amount, with actual currency and rounding rules. |
| Protect service-fee revenue | Apply [[#Service-Fee Revenue Through the Transaction Lifecycle]] to prove the correct fee is collected, allocated, retained or returned at every affected stage. A successful purchase or correct customer total cannot clear this gate without the expected Showpass fee/earnings evidence. |

**Decision rule:** A confirmed failure of an applicable required gate is **No-Go** for that financial/core transaction scope. Missing setup, unverified exceptions, unsubmitted risky actions or absent persistence/payment/stock evidence make the decision **Decision blocked by named missing evidence**. Do not turn either result into an overall smoke pass because navigation, layout or other checks passed. Report individual successful assertions without weakening the unresolved gate. Do not silently downgrade or accept a financial risk; record any explicit user-directed release override while retaining the failed or unresolved QA result.

Follow suspicious money-related observations through: establish the actual rule and configuration, exercise the permitted behavior safely, check fresh saved/downstream state, and record the result. If evidence or safe data is unavailable, name that exact gap promptly. This gate does not expand mutation authorization; reuse the authorized test-data scope and preserve existing customer orders and financial history.

### Service-Fee Revenue Through the Transaction Lifecycle

Missing, reduced, misallocated or unintentionally refunded service fees are financial failures even when checkout succeeds and the customer total looks correct. Derive each fee's expected amount, payer, recipient and retention/refund treatment from the applicable saved rules and original transaction. Separate Showpass service fees, payment-processing fees/costs, organizer/custom fees and fee taxes; one class's correct total does not prove another class's revenue.

| Stage | Required fee proof |
| --- | --- |
| Purchase | Calculate the applicable service fee independently, including rate-card inheritance/overrides, eligibility, quantity, fee base, currency and rounding. Compare the collected amount with saved fee allocation and Showpass earnings. Customer-paid and organizer-absorbed variants must charge the correct party; absorption must not silently remove an owed fee. |
| Exchange | Follow the original sale, exchange adjustment and replacement together. Establish which original fees remain, which may return, and which replacement/additional fees are due under the actual policy. Prove correct additional payment or credit and final fee allocation, without missing earned fees or charging the same fee twice. Check supported equal-, higher- and lower-value replacements when their treatment differs. |
| Refund | Cover supported full, partial and repeated partial refunds. Independently establish returned versus retained service fees, fee taxes and who bears any refunded fee or retained processing cost. Reconcile actual payment return/credit with original and adjustment records and final earnings; do not return a protected fee, withhold it twice or take it from the wrong party. |
| Void or cancellation | Verify the action's actual payment and fee policy separately from item invalidation. Prove expected retention/reversal and final allocation; neither zero fees nor automatic full retention is assumed from the action name. |
| Discounts, packages, credits and installments | Check affected fee bases, selected parent/child items, funding methods and collection timing. A zero-price child, discounted item, credit-funded order or later installment must not silently omit a fee that is due or collect it again contrary to the rule. |
| Failure, recovery and final reporting | Decline, timeout, retry, repeated callback and adjustment recovery must leave exactly the intended fee outcome. Verify final saved fees, earnings and applicable report/settlement records at the supported completion deadline; separate legitimate pending/deferred recognition from lost revenue. No repeated fee charge, duplicate recognition or disappearing allocation. |

Record original fees, additional fees, retained fees, returned fees, explicit waivers/credits and pending/deferred amounts per fee class and responsible party, with linked transaction references. Reconcile them using the actual accounting contract; do not invent one universal gross-payment equation. Preserve an untouched order for comparison where useful. An observed zero or missing fee requires verified policy/configuration/timing evidence explaining it.

Apply the [[#Financial and Core Transaction Gates]] decision rule: a confirmed unintended fee loss, excess fee charge, wrong-party allocation or forbidden reversal is No-Go for the affected scope. Missing fee breakdown, inaccessible earnings or unverified treatment blocks the decision. Saving a rate card, observing a receipt or publishing a Qase case is not proof of fee revenue protection.

### Manual Steps Must Be Executable

- Write from the real actor's perspective: customer, organizer, venue employee, Box Office employee, dashboard user, attendee, or authenticated user.
- State where the actor starts, the required data or role, the exact action, and the visible result.
- Define product-specific terms when a new employee could not infer them.
- Prefer customer- and employee-visible proof over internal implementation fields.
- Keep source and implementation details in behavior, risk, or evidence sections rather than manual steps.
- Do not use vague instructions such as “verify it works,” “test the field,” or “confirm behavior.”
- Assume the QA employee has access to the documented fixture but no prior knowledge of the feature.
- Start with an exact product location: a route, dashboard area, public page, or named screen.
- Name every visible control exactly as it appears and explain where test values come from.
- Use a `Step Action | Data | Expected Result` table for test cases and defect reproductions that contain more than one action.
- Keep one observable action and one observable result per row. Split a row when the person must make two decisions.
- Do not use browser-automation language such as locator, DOM, hidden checkbox, isolated clipboard, sentinel, request interception, or programmatic click in manual instructions.
- End with any cleanup, reset, or preserved-fixture instruction so the next QA employee does not have to infer the required final state.
- Before calling an artifact review-ready, read every manual flow from top to bottom and confirm a QA employee can execute it without opening source code or a separate narrative note.

## 7. Complex Controls Must Be Decomposed

Do not represent a rich-text editor, date picker, combobox, uploader, table, map, canvas, chart, drawer, modal, or virtualized list as one covered row when it exposes meaningful subcontrols.

Inventory its child controls and states. Each child must be covered, deferred, manual-only, not applicable, or blocked.

Examples:

- Rich text: content entry, formatting controls, links, lists, validation, serialization, reopen.
- Combobox: open, search, keyboard movement, selection, clear, Escape, empty/loading/error.
- Modal: open, close, nested modal, dirty state, discard, submit, Escape, state preservation.
- Table: sorting, filtering, pagination, row actions, selection, empty/loading/error.
- Map/canvas: every item family, selection method, keyboard behavior, zoom, pan, reset, transitions, status, and side panel.

Use production-like semantic data instead of toy strings when safe.

## 8. Input and Boundary Standard

For each applicable input, account for:

- Blank
- Whitespace-only
- Valid minimum
- Representative valid value
- Valid maximum
- Just below and just above boundaries
- Zero and negative
- Decimal in whole-number fields
- Text in numeric fields
- Duplicate value
- Dependent-field conflict
- Pasted value
- Keyboard increment/decrement
- Silent sanitization or transformation
- Save, validation recovery, persistence, and reopen

If a dangerous combination is not submitted, label the result **Client-side risk not submitted**, not an end-to-end defect.

## 9. Browser and Exploratory Execution

Execute in this order:

1. Prove the clean high-risk success path.
2. Execute Critical and Major coverage.
3. Continue through remaining applicable declared scope.
4. Perform a product-surface inventory pass.
5. Exercise each complex control's child matrix.
6. Perform boundary, error, keyboard, responsive, persistence, and cleanup passes.
7. Update the coverage ledger.
8. Record findings and continue unless access, authentication, or data safety genuinely blocks the run.

Do not stop testing merely because a defect is found.

## 10. Data Safety and Cleanup

- Treat pre-existing data as user-owned.
- Record original values before mutation.
- Prefer reversible, isolated, or unsaved checks.
- Create clearly named disposable data when persistence is required.
- Remove or restore only data created or changed by the run.
- Never claim cleanup without verifying the final state.
- If cleanup is unsafe or cannot be proven, mark the mutation Manual-only, Deferred, or Blocked.

## 11. Finding Classification

Every finding must include:

- ID and title
- Severity
- Affected proof target or case
- Confidence
- Data-safety classification
- Starting state
- Exact steps
- Expected result
- Actual result
- User or business impact
- Evidence
- Cleanup/reset
- Release classification

Write the reproduction as an independently executable QA procedure:

- Preconditions state the role, environment, exact starting page, and named fixture.
- Numbered actions are represented in a `Step Action | Data | Expected Result` table.
- The Actual Result is separate from the expected-results column and identifies the first step where behavior diverges.
- Evidence is placed immediately beside the claim it proves. Embed visible screenshots in the canonical review note; link non-visual evidence such as CSVs or console output.
- If the result depends on browser permissions, operating-system state, timing, or an automation-only interface, label it Inconclusive until a normal user interaction independently reproduces it.
- If the original fixture was deleted or changed, provide a current preserved fixture or state exactly what a QA employee must create before attempting the reproduction.

Use these confidence labels:

- **Confirmed**: reproducible through the relevant layer.
- **Inconclusive**: fixture or evidence cannot distinguish expected behavior from a defect.
- **Client-side risk not submitted**: the UI permits a risky action, but submission was intentionally not attempted.
- **Product-expectation question**: implementation and test expectation disagree without an authoritative decision.

Do not:

- Treat severity as automatic blocker status. Apply the explicit [[#Financial and Core Transaction Gates]] decision rule to failures of those required business outcomes.
- Claim a cross-type result proves same-type behavior.
- Claim backend failure from a client-side enabled button.
- Preserve a finding after later evidence disproves it.

## 12. Human Verification Without Guessing

Ask the user only when their judgment or independent reproduction materially changes the decision.

- Present one check at a time.
- Label it `Check N of M`.
- State whether it changes saved data.
- Give the exact starting location and actions.
- Provide the exact outcomes to choose between.
- State exactly what the user should report.
- Wait for the answer before giving the next check.
- Record the result in the canonical run note.
- Explicitly list checks the user must not perform because they are destructive, already confirmed, inconclusive, or require another fixture.

## 13. Readiness Gates

### Draft

Scope, testing intent, initial inventory, assumptions, risks, and blockers are visible.

### Review-ready

Proof targets, state-space, high-risk paths, fixtures, cleanup, coverage decisions, and open questions are explicit.

### Execution complete

Every planned and discovered in-scope row is Passed, Failed, Deferred, Manual-only, Not applicable, or Blocked with evidence. Mutations have persistence and cleanup proof.

### Automation-ready

Each automated target maps to a proof target and coverage-ledger row. Selectors, fixtures, assertions, downstream evidence, and cleanup are defined. Manual and blocked coverage remains visible.

### Release-ready

Blocking gaps are resolved or explicitly accepted. High-risk user and data paths are covered or intentionally deferred. Known failures have severity and release classification. The team can explain what is covered, what is not, and why.

Apply [[#Financial and Core Transaction Gates]] before a financial/core transaction readiness or smoke conclusion. Deferred or unverified required gates do not qualify for an overall pass; an explicit release override does not change the underlying QA result.

For page/navigation migrations, every previously supported in-scope business function has a reachable replacement from the supported user starting page, or an explicit approved removal. Missing access to a critical function blocks a readiness claim even if its destination loads directly. Source-only navigation coverage remains unexecuted.

Release recommendations must be one of:

- Go
- Go with known non-blocking issues
- No-Go
- Decision blocked by named missing evidence

## 14. Required Output by QA Activity

| Activity | Required Output |
| --- | --- |
| Requirements or spec review | Scope, testing intent, state-space, risks, assumptions, and blockers |
| Test-case generation | Proof targets, positive/negative/boundary/missing/permission/regression coverage, fixtures, and minimum execution set |
| Browser or exploratory run | Coverage ledger, pass/fail evidence, findings, cleanup proof, blocked coverage, and release recommendation |
| Browser-automation planning | Automation mapping, selector evidence, fixtures, assertions, cleanup, and manual/deferred coverage |
| Regression planning | Risk-based minimum set plus intentionally excluded coverage |
| Bug triage or retest | Reproduction scope, affected state-space, fix verification, negative checks, and regression risk |
| Release sign-off | Coverage summary, open risks, accepted deferrals, blocker decisions, and one release recommendation |

## Final QA Review

Before calling the work complete, answer:

- What can the user or system create, edit, submit, delete, upload, import, export, preview, send, schedule, publish, refund, or trigger?
- Which controls were actually exercised instead of merely seen?
- Which positive, negative, boundary, missing, permission, unsupported, cancellation, and regression classes apply?
- Which entry paths and initial states materially change behavior?
- What proves success, persistence, downstream completion, and cleanup?
- Which validation and expected-error states were triggered?
- Could an expected error hide an unexpected error?
- What changed outside the current page?
- What remains Manual-only, Deferred, Not applicable, or Blocked, and why?
- Who accepted each release risk?
- Can the team explain the release recommendation from the coverage ledger?
