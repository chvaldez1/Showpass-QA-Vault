# Checkout Money Movement Exploration Goal

Use this prompt when launching an open-ended checkout QA exploration goal focused on the highest-risk money movement paths.

Related notes:
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]
- [[02 Feature QA/Checkout Critical Path Gap Analysis]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]
- [[03 Test Cases/Checkout Money Movement Test Drafts]]

```text
Explore checkout money-movement coverage as an open-ended QA goal.

Goal contract:
- Outcome: produce an evidence-backed checkout money-movement coverage report that identifies the highest-risk Playwright automation gaps, missing fixture/factory needs, realistic entry-path scenario mixes, and any unclear behavior requiring confirmation.
- Verification surface: verify each finding with source references, inspected files, existing Playwright coverage or `No coverage found in inspected files`, Dashboard/API evidence expectations, risk score, confidence, and verification-needed notes.
- Constraints: do not make code, Qase, or vault changes unless explicitly asked; do not invent unsupported behavior; avoid test bloat by proposing representative P0/P1 automation coverage instead of every permutation.
- Boundaries: use only the linked backend, frontend, Playwright, and vault references below; treat source repos and Qase as read-only unless explicitly told otherwise.
- Iteration policy: after each pass, use the evidence gathered to choose the next highest-risk entry path, realistic scenario mix, fixture gap, or P0/P1 money-movement risk to inspect.
- Blocked stop condition: stop and report when the next useful planning step requires product confirmation, secrets, payment-provider access, destructive data setup, Qase writes, or when no defensible source-backed path remains. If code writes would be next, convert that into a planning handoff note and continue with another read-only planning target.

Backend is the source of truth. Start from [[01 Repositories/Backend - web-app]]:
- /Users/christianvaldez/Documents/Showpass/repos/web-app

Use frontend behavior as the user-path reference. Start from [[01 Repositories/Frontend - showpass-frontend]]:
- /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend

Use Playwright as the automation reference. Start from [[01 Repositories/QA Automation - showpass-playwright]]:
- /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Use this vault for findings only:
- /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault

Primary focus:
- all checkout entry paths and platforms that can reach money movement
- realistic buyer scenarios that combine ticket type, fees, discounts, platform, payment type, add-ons, identity, and inventory state
- payment success and failure
- order creation and payment status
- totals, fees, taxes, discounts, promo codes, credits, and gift cards
- complex baskets: extra items, add-ons, packages, memberships, assigned seats, held items, and mixed ticket quantities where applicable
- duplicate submission, retry, refresh, and back-button behavior
- inventory, capacity, holds, and seat ownership changes tied to payment
- guest checkout, logged-in checkout, and account claim/connect flows
- confirmation, receipt, order detail, transaction detail, and payout consistency
- payment provider redirects, callbacks, webhooks, and asynchronous settlement states where applicable

Entry-path examples to discover and verify against source:
- public event checkout
- direct checkout URL or checkout link
- hold link checkout
- widget checkout
- assigned seating checkout
- package, membership, or extra-item checkout
- mobile/responsive public checkout
- logged-in buyer, guest buyer, and account claim/connect flows
- any other checkout entry paths found in backend routes, frontend routes, or Playwright coverage

Run repeated exploration passes. For each pass:
1. Map backend behavior and business rules.
2. Inventory checkout entry paths and platforms that can exercise the behavior.
3. Identify realistic scenario mixes that combine entry path, ticket type, fees, discounts, payment type, extra items, identity, and inventory state.
4. Compare against existing Playwright coverage, fixtures, factories, and Qase/manual coverage.
5. Record gaps, unclear behavior, missing fixtures, and automation candidates.
6. Score each finding out of 100 using [[02 Feature QA/Checkout Money Movement Risk Scoring]].
7. Prioritize P0 and P1 items first.

Avoid test bloat:
- Do not create every permutation.
- Prefer a small set of representative scenarios that combine multiple real customer risk factors.
- Add a new test only when it proves a different money-movement risk, entry path, payment behavior, or fixture gap.
- Use backend behavior and incident-like user paths to justify why each scenario matters.

Hallucination and exit rules:
- Do not claim a checkout path, test gap, fixture, API behavior, Dashboard behavior, or payment behavior exists unless it is backed by a source reference.
- Mark unsupported assumptions as `Unverified`, not as findings.
- If source behavior is unclear, stop that thread and add it to `Open Questions`.
- If Playwright coverage cannot be found, say `No coverage found in inspected files` and list the inspected paths.
- If a finding depends on Qase/manual coverage, do not infer it; mark it as `Needs read-only Qase check`.
- If the same type of gap repeats across many permutations, summarize the pattern once and propose representative automation coverage.
- Exit the current exploration branch when the next planning step would require product confirmation, secrets, payment-provider access, destructive data setup, or Qase writes.
- If code implementation would be next, do not exit or block. Mark the item `Planning Ready`, record the future file/assertion/fixture/review criteria, and continue read-only planning.
- Exit the goal when remaining work is low-risk duplication, unsupported by source, or blocked by missing access/context.

Every finding must include:
- source references
- inspected files
- evidence
- confidence: High / Medium / Low
- verification needed

Do not make code, Qase, or vault changes unless explicitly asked.

Stop only when one of these is true:
- remaining findings are low-risk duplicates
- the next useful step requires product or engineering clarification
- the highest-value P0/P1 checkout paths have been mapped into test or fixture candidates
- I explicitly pause, redirect, or close the goal

Return a concise report with:
- highest-risk gaps
- risk score and priority for each gap
- entry path and realistic scenario mix for each gap
- backend, frontend, Playwright, and Qase/source references
- missing fixtures or factory improvements
- recommended Playwright tests
- recommended Qase/manual cases
- unclear behavior needing confirmation
```

## Operator Notes

- Treat checkout as a money movement system first and a UI flow second.
- Use backend behavior to decide what must be true; use frontend and Playwright to decide how users and automation reach it.
- Avoid creating duplicate manual cases when an existing Qase case can be updated later.
- Do not run Qase writes without explicit confirmation of exact scope.
