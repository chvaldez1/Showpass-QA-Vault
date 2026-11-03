---
title: QA Operating Workflow
date: 2026-10-31
tags:
  - qa/workflow
status: Ready to use; adoption and release results not yet measured
---

# QA Operating Workflow

Help the team release with evidence, turn repeated checks into reliable automation, and change the process when a better approach works. [[00 Start Here/World-Class Software Quality Standard]] governs scope, safety, evidence and release decisions. This note puts it into daily use.

## Choose the work

| Request | Start with | Finish with |
| --- | --- | --- |
| Review a change before development | [[00 Start Here/Showpass QA Handbook/02 Early Risk Review and Test Design]] | Expected behavior, affected clients, largest risks and testability needs |
| Test a branch or PR | Exact diff, then backend rules and all affected clients | Focused execution, remaining risks and a recommendation in the existing feature/run note |
| Draft or compare manual cases | [[06 Prompts/Showpass QA Test Case Generator]] or [[06 Prompts/Showpass Qase Gap Analysis]] | Standalone cases; distinguish drafted, published and executed coverage |
| Run a browser check | [[06 Prompts/Interactive Browser Release Testing]] | Agreed checks, actual evidence, cleanup and honest results |
| Automate a repeated check | [[04 Automation/00 Index]] | Working assertions, focused run, cleanup, actual CI status and the remaining manual check |
| Decide whether to release | [[06 Prompts/Release Coverage Review]] and [[03 Test Cases/Release Decision Template]] | Qase, Playwright and browser coverage; Full/Partial/None/Unknown; actual results, gaps and recommendation |
| Improve the process after a problem | [[06 Prompts/Escaped Bug To Regression]] and [[00 Start Here/QA Improvement Log]] | Missing protection tied to the incident; implemented/executed status and a keep/change/stop decision |

Use one canonical note for each request or release. Add the release decision section to that note; do not create another summary that needs separate updates. Choose depth by business impact. A copy change needs less work than a payment or admission change.

## Before development: make the change testable

Identify the affected business outcomes and clients. Resolve policy questions with product/engineering before writing dependent expectations. Keep the release note focused on behavior and test coverage rather than ownership fields.

Ask for the smallest missing capability that makes the important outcome observable: isolated records, an approved final-state read, a controllable clock, a safe provider failure, or the affected device/build. Record the missing setup and next useful action. Do not wait until release day to discover it.

## During development: prove rules at the right layer

Use backend tests for calculation, permissions, repeated callbacks and competing requests. Use component tests for controls and error handling. Keep representative browser journeys for customer/employee access and connected saved outcomes. Use native/device checks for hardware and SDK behavior. See [[00 Start Here/Showpass QA Handbook/06 Automation Strategy]].

Manual exploration should challenge assumptions and unfamiliar combinations. Feed a stable, repeated check into automation; a manual-first pass is not required for every backend or component test.

## Before release: assemble evidence for this candidate

1. Record the exact deployed candidate, configuration and source revisions; source presence alone does not prove deployment.
2. Select clean success and the affected failure, recovery, access, money and inventory outcomes. Trace shared changes to unchanged clients too.
3. Map each behavior to saved Qase cases, exact Playwright assertions and planned/executed browser checks. State Full, Partial, None or Unknown separately from execution results. Reuse applicable automated results; check the actual build/setup, skipped tests, first-attempt failures and quarantined coverage.
4. Execute the remaining manual/device/exploratory checks. A previously green run is reusable only when the relevant code, build, dependencies and configuration are shown to be unchanged; record that reasoning.
5. Keep every unrun, failed, blocked or deferred outcome visible. Give each gap a concrete missing check or next action. An accepted risk never changes the test result to Passed.
6. Verify cleanup or safe isolation. Explain the recommendation using actual test results and remaining business risk. Owner/sign-off fields are not required in this template.

## After rollout: learn and follow through

Agree on an observation window, operational owner, expected business signals and recovery steps for the actual release. This document does not authorize production access or create monitoring.

At the next release review, use [[00 Start Here/QA Improvement Log]] to record the relevant results and choose one improvement. Check whether previous improvements reduced escaped harm, test effort or unreliable results. Remove a redundant step only after showing which protection remains. Keep physical-device and business-risk obligations visible when changing tools.
