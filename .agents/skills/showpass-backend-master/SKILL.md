---
name: showpass-backend-master
description: Review Showpass backend source for an engineering handoff or release impact assessment. Trace business rules, permissions, saved outcomes, payments, and downstream records for the exact change.
---

# Showpass Backend Master

Start with [Backend - web-app](<../../../01 Repositories/Backend - web-app.md>) and the assigned candidate, scope, and configuration. Use read-only source tracing. For a branch or PR, verify the base and candidate before tracing the changed code. For an unchanged backend, state the revision or evidence used to establish compatibility. Follow [Showpass Release Engineering Handoff](<../../../06 Prompts/Showpass Release Engineering Handoff.md>) for shared business cases and boundaries.

- Trace changed APIs, models, services, permissions, callbacks, and jobs through their callers and final records. Include shared contracts even when related clients are unchanged.
- State the expected outcome and the exact evidence needed for affected workflows such as purchase, recovery, inventory, fulfillment, admission, refund, fees, reporting, and payouts. For money, identify who pays and receives each amount. Distinguish pending provider states from final saved states.
- Return the source revision, file or symbol references, the before/after rule, affected clients or consumers, and missing proof. Label unavailable source, unknown configuration, and unrun checks explicitly. A repository guide locates evidence. A live result requires separate evidence.
