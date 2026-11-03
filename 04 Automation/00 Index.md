---
title: Automation
date: 2026-10-31
tags:
  - qa/automation
  - qa/index
status: Working guide; current CI protection must be verified per outcome
---

# Automation

Automate repeated work where it gives reliable proof or saves recurring effort. The aim includes product tests, safe test setup, result collection and coverage checks. Test counts and planning-ready packets do not measure protection.

## Existing work to use

| Need | Canonical starting point | Evidence boundary |
| --- | --- | --- |
| Checkout implementation candidates | [[04 Automation/Checkout Playwright Automation Review Checkpoint]] | Existing top-six recommendation is planning-only; recheck current source/assertions before implementation |
| Broader incident-driven candidates | [[04 Automation/Major Critical Playwright Automation Candidates]] | Historical/source review; compare with checkout candidates before starting overlapping work |
| Checkout risk context and existing IDs | [[02 Feature QA/Checkout/Checkout Automation Mission Control]] | Preserve IDs, ranking caveats and the planning worker's original scope |
| Native mobile/device work | [[09 Appium/Test Project]] and [[09 Appium/CI]] | Local, simulator, physical-device and CI results are different evidence; some targets remain blocked/unrun |
| Choose backend/component/browser/device layer | [[00 Start Here/Showpass QA Handbook/06 Automation Strategy]] | Browser coverage cannot replace all lower-layer or physical-device proof |
| Prepare a candidate | [[04 Automation/Automation Candidate Template]] | Add sections to the candidate's existing canonical note; avoid a duplicate queue |
| Implement/update Playwright coverage | [[06 Prompts/Convert Test Cases to Playwright]] | Follow the requested mode through implementation and focused verification when authorized |
| Repeat Qase preparation safely | [[05 Tooling/qasectl]] and [[05 Tooling/Qase Test Run Workflow]] | Existing dry-run/apply verification and exact write approval remain required |
| Collect change coverage and actual run evidence | [[06 Prompts/Release Coverage Review]] | Maintained collector reads candidate source/cases/results; agents review the exact assertions before classifying coverage |
| Prevent a confirmed escaped bug from recurring | [[06 Prompts/Escaped Bug To Regression]] | Link the original failure, missing check, implemented protection and actual execution; no automatic completion from ticket closure |

## Work in small completed pieces

1. **Select:** Name one harmful outcome or repeated manual task. Check existing assertions and overlapping candidates before starting. Rank by harm, realistic usage, repetition and effort; unknown usage remains unknown.
2. **Prepare:** Define expected results independently, supported setup, approved final reads, fault/time control, cleanup and the layer that owns the rule. Give a missing test-data or observation capability its own owner/action.
3. **Implement:** Extend existing tests/helpers first. Put broad rule combinations in backend/component tests and retain representative user journeys. Do not wait for a manual case or browser spec when the selected layer already has enough verified facts.
4. **Verify:** Run the focused checks, inspect assertions and final records, record first-attempt/retry results, and verify cleanup. If execution is blocked, say implemented but unrun; retain the manual check.
5. **Integrate:** Record actual CI job, trigger, run link, source/deployed candidate and configuration. A local pass is not CI protection. A merged test not selected by a job is not running protection.
6. **Maintain:** Assign an owner. Record flaky/quarantined/skipped outcomes, replacement checks and restoration conditions. Retire a manual repetition only when equivalent applicable automated proof is dependable; keep exploration and uncovered device work.

For planned work, use Proposed → Ready → Implementing → Verified locally → Running in CI as delivery states, with Blocked or Quarantined when needed. These describe automation delivery, not a release result. Use the canonical coverage ledger and candidate-specific execution result separately. Existing historical status labels do not need bulk renaming.

## Stop planning when the next useful action is implementation

Planning-only requests retain their boundary. Once the expected result, current gap, setup, implementation location, assertions and cleanup are clear, finish the handoff. Continue research only for a named uncertainty that could change the decision. Do not create repeated ranking/synchronization passes to keep a worker busy.

An implementation request should carry the selected work through code and focused verification within its authorized scope. It should not end with another plan merely because an older planning prompt was used. This vault review does not itself launch application-repository test implementation or CI jobs.

## Keep the approach open to change

Choose the simplest supported tool/layer for the business proof. Playwright, Appium, Qase and today's folder layouts are current choices, not permanent requirements. Use [[00 Start Here/QA Improvement Log]] to compare a proposed change on one representative outcome before widening it. Consider setup time, reliable failure detection, maintenance and manual effort saved. Keep a fallback and preserve distinct safety/device/access protection.
