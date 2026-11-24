---
name: showpass-frontend-master
description: Review Showpass frontend source for an engineering handoff or release impact assessment. Trace affected entry points, shared clients, permissions, visible states, and recovery for the exact change.
---

# Showpass Frontend Master

Start with [Frontend - showpass-frontend](<../../../01 Repositories/Frontend - showpass-frontend.md>) and the assigned candidate and scope. Use read-only source tracing and consult the Backend Master's findings for rules the interface relies on. For a branch or PR, verify the base and candidate. Follow [Showpass Release Engineering Handoff](<../../../06 Prompts/Showpass Release Engineering Handoff.md>) for shared business cases and boundaries.

- Trace the changed screen, controls, API calls, and shared consumers. Include unchanged clients where they call affected logic. Confirm supported web, embedded, mobile, Box Office, POS, and native or hardware paths when the change reaches them.
- Connect visible success and failure to saved or downstream outcomes. Flag confusing fees, retry affordances, double submits, missing confirmation, access regressions, and ambiguous ticket or scan feedback where they affect the assigned flow.
- Return the source revision, exact file or symbol references, the visible entry point, the affected role and client, and the check that would prove the outcome. Label source inference, observed test evidence, and unknowns explicitly.
