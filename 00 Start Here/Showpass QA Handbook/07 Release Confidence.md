---
title: Release Confidence
date: 2026-10-03
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Release Confidence

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Release confidence and decision gates

### Work through the release lifecycle

| Stage | Team activity | Exit evidence |
| --- | --- | --- |
| Before development | QA/product/engineering identify impact, policy, consumers, testability, physical-device need | Risk list and source/expectation questions visible |
| During development | Developers prove rules/transitions; QA challenges boundaries and existing-data paths | Backend tests and inspectable state/fault setup; actionable issues early |
| Before merge | Trace exact diff and consumers; execute changed high-risk journeys | Source revisions, focused results, open risks, cleanup |
| Release candidate | Execute risk-weighted cross-client set against the candidate build/configuration | Latest relevant automation + manual/device evidence; final-state proof |
| Friday regression | Answer the Critical Business E2E page's automation/manual questions | What is protected by executed automation; what needs manual testing; owner/results |
| Rollout | Confirm applicable flags/configuration, observability, safe rollback/recovery, support readiness | Deployment-aware plan and named operational owner |
| After rollout | Authorized operational owner checks the expected business signals and investigates anomalies | Actual order/fulfillment/payment agreement, missing recipients, inventory/money exceptions—not only crash/job counts |

This handbook does not schedule monitoring or authorize production access. Agree on the observation window and owner for the actual release.

### The risk-weighted minimum release set

Start with clean successful sales for affected core entry points. Add the exact failure/recovery, financial, inventory, permission, and downstream paths implicated by the change. For a shared purchase/financial change, include an affected public entry and employee sales entry; add widget/mobile/Electron where the source shows shared behavior. Do not equate a small minimum set with complete coverage: the remaining scope stays in the ledger.

The manual Friday set is the relevant high-business-impact outcomes **not protected by applicable, recently executed automation**. It includes hardware/manual-only rows, quarantined tests, unsupported automation setup, and new incident combinations. Avoid repeating automated steps merely to increase run counts; independently challenge outcomes that automation does not prove.

### For an Organizer on-sale, require configuration and lifecycle evidence

- **Setup equivalence:** the [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|production-to-TEA comparison]] identifies visible and hidden settings, saved Event/catalog relationships, approved sandbox substitutions and remaining mismatches. Matching names or passing a different city's configuration is insufficient.
- **Representative Customer journeys:** record which actual/anonymized behavior informed combinations and which high-impact hypotheses were added. Clean success and risky combinations have distinct results.
- **Complete outcomes:** use [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the completion checklist]] for applicable questions, delivery, shipping/pickup, admission, benefits/credits, analytics, messages, integrations, adjustments and reporting. Failed or unverified downstream promises remain visible even when payment passes.
- **Phase transition:** VIP → general sale preserves earlier purchases and demonstrates actual new eligibility, old/open/new basket behavior, stock and reporting. Capacity evidence is a separate approved load result, not a Playwright concurrency claim.
- **Operational recovery:** an authorized Employee can find the original order, distinguish incomplete work and use supported recovery without asking the Customer to pay again. Name owners for blocked evidence and unresolved policy before sign-off.

These are proof targets for the affected launch, not automatically mandatory checks for an unrelated small change. A sandbox substitution cannot establish a production-only integration, native device or provider-settlement result; retain that scope and require appropriate evidence or explicit risk acceptance.

### Release decision packet

Keep this in the release/feature's one canonical run note, not separate competing summaries:

| Field | Required content |
| --- | --- |
| Change and candidate | Plain-language behavior; branch/diff/source revisions; deployed build/environment |
| Business impact | Actors and money/access/inventory/privacy/operations at risk |
| Scope | Entry points, outcomes, roles, existing records, flags, payment modes, hardware |
| Proof results | Each named outcome with Passed/Failed/Deferred/Manual-only/Not applicable/Blocked and evidence |
| Findings | Reported priority and assessed severity separately; confidence; release classification |
| Coverage gaps | Missing exact evidence/setup; why it matters; owner; next action/date or explicit risk acceptance |
| Safety | Changed records, preserved references, original values, verified cleanup/isolation |
| Rollout | Applicable configuration, observation and recovery owner; rollback limitations for irreversible payments |
| Recommendation | Go; Go with known non-blocking issues; No-Go; or Decision blocked by named missing evidence |
| Decision owner | Who accepts each residual business risk; not merely who executed tests |

Never average away a failed high-impact proof target using a high overall pass percentage. Confidence should be stated per business outcome, not only per release.

**Examples:**

- **No-Go recommendation:** repeatable candidate-build sale loses required fee allocation; consequence and scope evidenced. Record severity and decision separately.
- **Decision blocked:** mobile payment integration changed but the supported physical-device row has no evidence and no accepted mitigation. Name missing device/build/test owner.
- **Go with known non-blocking issues:** a narrow display defect is demonstrated not to affect saved amounts, payment, fulfillment, or admission; decision owner accepts it.

Rollback of code does not undo captured payments, issued tickets, credits, or customer communications. Recovery/reconciliation must be part of the plan.

### Example of an honest coverage ledger

This is an **illustrative planning ledger**, not an executed release result. Replace every row with the candidate's real setup, references, evidence, and named people. Coverage type and execution result are different: an Automated row can still be unexecuted, failed, or irrelevant to the current configuration.

| Proof target | Coverage / execution | Evidence required | Gap and owner |
| --- | --- | --- | --- |
| Package sale has correct customer total | Automated: interaction + persistence / not executed | Applicable existing test run, exact setup, independent amounts, saved order | Automation owner runs the relevant candidate configuration |
| Absorbed/internal fee is allocated correctly | Blocked | Approved saved financial allocation and independent earnings worksheet | Engineer provides authorized read; business-rule owner confirms expected allocation before sign-off |
| Every membership recipient has the promised tickets | Deferred: backend and manual run planned / not executed | Initial eligible identity list, per-member final items, failure/resume evidence | QA and engineer prepare recipient-accounted isolated run; no completion claim until executed |
| POS setting survives reopen with reader disconnected | Manual-only / not executed | Physical device/build/OS, saved toggle, stable reopen, resulting supported sale | Device owner obtains affected build/equipment; missing equipment becomes Blocked |
| Widget has a terminal-only cancel control | Not applicable, if caller/control tracing confirms absence | Current client/source support evidence | QA records the actual supported payment/recovery path instead |

None of these planning labels justifies Go until relevant evidence or explicit risk acceptance is recorded.
