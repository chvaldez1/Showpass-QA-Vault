---
title: QA Improvement Log
date: 2026-10-31
tags:
  - qa/improvement
status: Initial proposals; no team adoption or measured benefit claimed
---

# QA Improvement Log

Use evidence to improve how the team releases. [[00 Start Here/World-Class Software Quality Standard]] remains the authority; [[00 Start Here/Showpass QA Handbook/08 Escaped Bugs and Lessons]] explains incident prevention. This log records whether a process change actually helped.

## Review at the next release review

1. Look at escaped harm, uncovered release outcomes, unreliable tests and repeated manual effort. Link actual records; separate product defects from operational requests.
2. Choose one improvement that addresses a named problem and a useful review point. Focus on the missing coverage or repeated effort rather than ownership fields.
3. Run the smallest useful trial on one change or business outcome. State what success means and what would make the team stop or revise it.
4. At the agreed review point, record the result and Keep, Change or Stop. Update the affected workflow once, and link the evidence here. An untried proposal remains Proposed.

This is a working practice, not a scheduled automation or a newly imposed meeting. Use an existing release review where possible. Keep any original incident investigation as the canonical evidence; this log only links the prevention and process decision.

## Initial improvement queue

| ID | Problem and trial | State | Review point and success evidence |
| --- | --- | --- | --- |
| IMP-01 | Use [[06 Prompts/Release Coverage Review]] and the release template to compare actual Qase, Playwright and browser coverage | Workflow/collector implemented; complete read of 2,328 saved Qase cases and snapshot reuse exercised; product release trial unrun | The [[02 Feature QA/QA Process/Vault Review - 2026-10-31#Implementation follow-through|implementation record]] shows the source/case comparisons and evidence limits. Measure preparation effort on the next actual release. |
| IMP-02 | Deliver one already-planned automation outcome through scoped code and execution evidence | Shared saved-invoice amount check and result metadata implemented; lint/typecheck passed; live beta execution blocked and CI unrun | Recheck the actual application's build and run the focused purchase checks once the beta Access session is usable. No manual check is retired yet. |
| IMP-03 | Reuse safe test-data cleanup and final-state reads | Existing pending-basket helper strengthened and connected to failed-Affirm tests; static checks/discovery passed; live outcome unrun | Verify the captured basket has no invoice, expires and reads back EXPIRED. Provider-wide charging and another buyer's stock remain separate proof. New last-seat/member setup builders were not added. |
| IMP-04 | Local document health checker | Retired on user feedback, 2026-10-31 | Removed the checker, its tests and guide. It added maintenance without directly proving Showpass coverage; no release-template validation step is required. |
| IMP-05 | Turn confirmed escaped bugs into demonstrated regression protection | [[06 Prompts/Escaped Bug To Regression]] implemented and linked from agent instructions; no incident-specific regression executed in this process task | Apply it to the next scoped confirmed incident, then record which assertion catches the original failure and the actual result against the fix. |

## Release measures

Start a baseline with the next real release; historical reports are not a substitute for current measurements. The October 31 review did not collect CI or live release data. Each row below needs an actual release link, candidate/configuration and measurement date. Record Unknown when unavailable; do not invent a percentage or target.

| Measure | Definition and source | Baseline | Decision it informs |
| --- | --- | --- | --- |
| Coverage by test method | Full/Partial/None/Unknown for each behavior's saved Qase cases, exact Playwright assertions and browser walkthroughs/reports; record actual execution separately | Not collected | Which behavior needs a case, stronger assertions, automation or a browser check? |
| Important outcomes with applicable passing evidence | Relevant money, inventory, access and other high-impact behaviors with passing evidence compared with those still failed, blocked or unrun; keep excluded outcomes and reasons visible | Not collected | Which business outcomes still need proof before the release decision? Case existence is not a pass. |
| Reliable automation protection | Automated outcomes with applicable first-attempt passing runs; list skipped, quarantined and retry-only passes separately using CI results | Not collected | Where is a manual fallback or test repair needed? |
| Automation delivery | Selected outcomes reaching Verified locally and Running in CI, with test and run links; compare with Ready work | Not collected | Is planning producing running protection? |
| Repeated manual effort | Actual setup, execution and cleanup minutes for the same scoped outcome before/after automation; include maintenance effort | Not collected | Does the automation save useful time without losing proof? |
| Escaped harm and recurrence | Confirmed business impact by severity, client/configuration and repeated incident family; link incident/prevention evidence | Not collected for current releases | Which outcome or test layer should change next? Historical incident analyses remain separate. |
| Open evidence/setup blockers | Unresolved important outcomes with missing evidence/setup and exact next check, including device and test-data needs | Not collected | What needs engineering, access or equipment before the next candidate? |

## Record a trial result here

For the selected IMP ID, add a dated subsection with: problem/evidence link; hypothesis; current baseline; exact trial scope; safety/fallback; success and stop conditions; review date or release; actual result; Keep/Change/Stop decision; and the changed workflow/test link. Use Not run for an unexecuted trial. Do not turn every incident into a new ceremony or duplicate test.

## Revisit tools and rules

Challenge a rule when it adds repeated work without a distinct business protection, a new product/client changes the risk, or a better supported method becomes available. Keep the reason for adopting or retiring it. If an experiment changes a canonical requirement, revise the canonical standard explicitly with the evidence; do not weaken it silently in a prompt. Review burden matters alongside defect detection.
