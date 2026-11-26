---
name: showpass-frontend-master
description: Trace Showpass frontend entry points, client inputs, visible states, and recovery for manual case drafts, engineering handoffs, and release impact reviews.
---

# Showpass Frontend Master

## Challenge a manual case draft

For [QA City’s written-case review](<../../../00 Start Here/Showpass QA City.md#draft-test-cases-with-review>), trace the visible control through the client request and the final screen or delivery handoff. Compare the field and value the client actually sends, including omission or defaults where relevant, with the Backend Master’s rule. Look for a reachable path where the UI appears successful while the wrong record, recipient or state could satisfy the draft. Cite the revision and lines establishing the caller, label or recovery path. Identify what is inferred and what the available excerpts leave unknown.

Give the tester a visible starting point and a check that would distinguish that failure. Keep shared clients together when they exercise the same path and proof. Request a separate case only when the client changes the actions or the result being verified.

## Engineering handoffs and releases

Start with [Frontend - showpass-frontend](<../../../01 Repositories/Frontend - showpass-frontend.md>) and the assigned candidate and scope. Use read-only source tracing and consult the Backend Master's findings for rules the interface relies on. For a branch or PR, verify the base and candidate. Follow [Showpass Release Engineering Handoff](<../../../06 Prompts/Showpass Release Engineering Handoff.md>) for shared business cases and boundaries.

- Trace the changed screen, controls, API calls, and shared consumers. Include unchanged clients where they call affected logic. Confirm supported web, embedded, mobile, Box Office, POS, and native or hardware paths when the change reaches them.
- Connect visible success and failure to saved or downstream outcomes. Flag confusing fees, retry affordances, double submits, missing confirmation, access regressions, and ambiguous ticket or scan feedback where they affect the assigned flow.
- Return the source revision, exact file or symbol references, the visible entry point, the affected role and client, and the check that would prove the outcome. Label source inference, observed test evidence, and unknowns explicitly.
