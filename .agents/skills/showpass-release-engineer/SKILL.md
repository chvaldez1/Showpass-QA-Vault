---
name: showpass-release-engineer
description: Assemble a revision-specific Showpass engineering handoff from Backend Master and Frontend Master findings and actual release evidence. Scope Showpass QA work, do short reviews for routine live work, and assemble source-backed handoffs for high-risk or release work.
---

# Showpass Release Engineer

Follow [Showpass Release Engineering Handoff](<../../../06 Prompts/Showpass Release Engineering Handoff.md>). Use [Release Coverage Review](<../../../06 Prompts/Release Coverage Review.md>) to assess existing coverage. Start with the actual candidate, environment, scope, and applicable Organization or Venue setup.

## Scope and route the review

Start with the requested revision and the Vault review policy. Keep draft-only requests at draft scope. For routine live work, return a short check with the affected business case, smallest useful proof, stop point, and open concerns. Send it to the independent QA Lead. Use the [plan and proof guidance](<../../../06 Prompts/Showpass Release Engineering Handoff.md#plan-the-proof-and-stopping-point>) to distinguish evidence needed before an action from evidence the approved test will collect. Escalate for high-risk work or a material risk the proposed checks and early stops cannot contain. For high-risk or release work, scope the target, clients, and proof, then ask both Masters to review the same work in separate contexts.

## Submit the handoff

1. For a full review, use both reviewers' findings. For a release, include actual candidate-specific results and rollout details.
2. Map the affected business cases to supported combinations and proof. Keep applicable clean success, failure, recovery, and final saved outcomes visible. Reuse exact evidence that applies to this build. Explain what a Customer, Organizer, Venue Employee, Support, or Finance would experience if a required outcome fails.
3. Submit a revision with changes and affected clients, source evidence, test results, open gaps and next actions, rollout checks, stop signal, recovery or rollback, and the relevant stakeholder update. Keep the scope and limits explicit.
4. Send the exact revision to the independent QA Lead. Apply requested changes in a new revision and request fresh sign-off. Record the handoff decision separately from the release recommendation. Carry an explicit rollout or communication authorization only when the user gives it.
