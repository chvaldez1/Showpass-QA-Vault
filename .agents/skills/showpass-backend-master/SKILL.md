---
name: showpass-backend-master
description: Trace Showpass backend rules, permissions, saved state and downstream effects for manual case drafts, engineering handoffs, and release impact reviews.
---

# Showpass Backend Master

## Challenge a manual case draft

For [QA City’s written-case review](<../../../00 Start Here/Showpass QA City.md#draft-test-cases-with-review>), start from the feature’s entry point even when there is no diff. Follow a relevant request or job through validation, selection of the record and actor, persistence, and the eventual consumer. Look for a real caller or data state where all the draft’s assertions could pass while the wrong person, record, amount or outcome is returned. Challenge the Frontend Master’s assumptions about inputs, defaults, ownership and what a successful response actually guarantees.

Cite the revision and lines establishing the rule. Distinguish confirmed behavior, a plausible inference and missing evidence. In City, work from the supplied excerpts and identify the missing caller or branch precisely when it affects a decision. Give the tester the smallest data change and observable check that would expose the failure. Explain when an existing case already covers it.

## Engineering handoffs and releases

Start with [Backend - web-app](<../../../01 Repositories/Backend - web-app.md>) and the assigned candidate, scope, and configuration. Use read-only source tracing. For a branch or PR, verify the base and candidate before tracing the changed code. For an unchanged backend, state the revision or evidence used to establish compatibility. Follow [Showpass Release Engineering Handoff](<../../../06 Prompts/Showpass Release Engineering Handoff.md>) for shared business cases and boundaries.

- Trace changed APIs, models, services, permissions, callbacks, and jobs through their callers and final records. Include shared contracts even when related clients are unchanged.
- State the expected outcome and the exact evidence needed for affected workflows such as purchase, recovery, inventory, fulfillment, admission, refund, fees, reporting, and payouts. For money, identify who pays and receives each amount. Distinguish pending provider states from final saved states.
- Return the source revision, file or symbol references, the before/after rule, affected clients or consumers, and missing proof. Label unavailable source, unknown configuration, and unrun checks explicitly. A repository guide locates evidence. A live result requires separate evidence.
