---
title: Checkout P1 Lower Automation Continuation Worker
tags:
  - checkout
  - qa
  - automation
  - prompt
status: active
---

# Checkout P1 Lower Automation Continuation Worker

Use this prompt when the P0 checkout planning loop has preserved the current top risks and you want the worker to continue into P1/P2/lower candidates.

Related notes:
- [[02 Feature QA/Checkout Automation Mission Control]]
- [[02 Feature QA/Checkout Automation Worker State.json]]
- [[02 Feature QA/Checkout Critical Path Gap Analysis]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]
- [[04 Automation/Checkout Automation Phase 2 Planning]]
- [[02 Feature QA/Checkout Automation Decision Queue]]
- [[06 Prompts/Checkout Recursive Automation Prioritization Worker]]

```text
Run the checkout P1/lower automation continuation worker.

Primary question:
What should we automate next after the current P0 checkout money-movement candidates are preserved?

Goal:
Create a ranked, evidence-backed continuation plan for high-value P1/P2/lower Playwright candidates. Focus on risks that improve checkout confidence without bloating the suite.

Read first on every loop:
- /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/02 Feature QA/Checkout Automation Mission Control.md
- /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/02 Feature QA/Checkout Automation Worker State.json

Source repos:
- Backend: /Users/christianvaldez/Documents/Showpass/repos/web-app
- Frontend: /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend
- Playwright: /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright
- Vault: /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault

Operating mode:
- Planning-only.
- Do not write Playwright tests, app code, fixtures, source repo files, or Qase cases.
- Do not ask to implement tests from this worker.
- Source repos and Qase are read-only unless explicitly authorized.
- Vault writes are allowed for state, findings, backlog, planning packets, no-gap notes, and parked questions.

P0 handoff rule:
- Keep the current P0 answer intact.
- Do not demote, delete, or rewrite P0 candidates.
- P0 can change only when new source-backed evidence shows the risk ranking is wrong.
- If a P0 packet is already Planning Ready, treat it as preserved context and continue into P1/lower.

P1/lower selection heuristic:
- Prefer realistic checkout flows that combine money movement with identity, inventory, fees, discounts, credits, memberships, packages, resale, refunds, payment plans, upgrades, waitlists, or provider async behavior.
- Prefer candidates that could catch real production risk, not narrow UI-only behavior.
- Prefer one representative test that proves a distinct risk.
- Prefer fixture/helper work only when it unlocks multiple valuable tests.
- Mark no-gap when existing backend, frontend, Playwright, and Qase/manual evidence already cover the core risk.

Loop:
1. Read Mission Control and Worker State.
2. Preserve the current P0 best answer.
3. Pick the next highest-value P1/lower branch.
4. Inspect backend first, then frontend, then Playwright, then local Qase export if available.
5. Record one compact result:
   - automation candidate
   - planning-ready packet
   - fixture gap
   - no-gap confirmation
   - parked question
6. Re-rank P1/lower candidates against each other.
7. Update Worker State JSON first.
8. Update Mission Control last.

Avoid test bloat:
- Do not propose every permutation.
- Use one realistic scenario mix per risk unless another scenario proves a different money-movement failure.
- Keep manual/Qase-backed lower-priority paths below stronger automation gaps unless evidence or incidents justify promotion.

Planning Ready means:
- The future test has enough source evidence, fixture notes, assertion contract, and review criteria for a separate implementation task.
- Do not stop or ask for implementation authorization just because a packet is ready.
- Mark it Planning Ready and continue to the next planning target.

Park only when:
- More planning needs product/business confirmation.
- More planning needs provider, hardware, secret, destructive setup, or missing read-only access.
- The behavior is unsupported by source and cannot be verified locally.

Stop only when:
- all meaningful P1/lower branches are Planning Ready, no-gap, parked, unsupported, or low-risk duplicates
- no defensible read-only planning target remains
- I explicitly pause, stop, or redirect the goal

Each result must include:
- ID
- priority
- score
- current rank
- scenario mix
- evidence refs
- existing Playwright/Qase coverage or `No coverage found in inspected files`
- recommended representative Playwright test
- fixture/helper needs
- confidence
- verification needed

Return a concise checkpoint:
- current P0 best answer preserved
- best P1/lower candidate to automate next
- why it matters
- what changed in the ranking
- what is Planning Ready
- what is parked or needs confirmation
```

## Operator Notes

- This is the second-pass worker. Use it after the P0 worker has a stable top answer.
- The value is continued risk reduction: it turns the lower-priority backlog into a ranked list of practical Playwright candidates.
- Keep outputs short. The worker should spend time inspecting evidence and improving rankings, not writing broad documentation.
