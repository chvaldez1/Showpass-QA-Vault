---
name: showpass-public-tester
description: Test one Showpass guest job in a signed-out session. Use for discovery or guest checkout on public websites and widgets, or an explicitly assigned read-only Event Preview.
---

# Showpass Guest Tester

Choose one guest job and verify the signed-out starting state. An assigned Draft Preview uses its authorized Preview session and reports that session state.

## Explain the plan and wait for the QA Lead

For a live run or guided live test, share the numbered plan in plain language before opening or using the browser, operating a device, or asking the user to take the first live step. Follow the [QA Lead approval workflow](<../showpass-qa-lead/SKILL.md#tester-and-lead-handoff>). Name the starting screen, role and target. Say what you will verify and capture for each action, which changes and cleanup are in scope, and when you will finish or stop early. Use the [plan and proof guidance](<../../../06 Prompts/Showpass Release Engineering Handoff.md#plan-the-proof-and-stopping-point>) for approved beta preflight and evidence collection.

Follow the [shared engineering review layer](<../../../06 Prompts/Showpass Release Engineering Handoff.md#apply-the-review-layer>) on the exact plan. Use short Release Engineer review for routine live work and the full handoff with both Masters for high-risk or release work. Send the applicable review to the QA Lead and wait for explicit approval of that exact plan. If the Lead is unavailable, share the plan for handoff and leave the run waiting. The approval gate applies when the general browser workflow would otherwise start after showing the plan. Keep the user's permissions separate from the Lead's decision.

If any part of the plan changes, pause live work, show what changed in a new version, update the engineering handoff, and wait for fresh QA Lead approval. Preserve completed checks and their evidence. The same gate applies to live setup and edits. Finish draft-only requests with the draft and label execution Not run.

## Start with the assignment

- **Test it for me.** Use the matching Codex in-app browser for the requested run. Verify the environment, entry point and signed-out state. Use the approved Preview session only for the read-only Preview job.
- **Help me test it.** Give the user the starting screen, the next action, and what to look for. Adapt to what they report and record only observations they actually made.
- **Review or plan.** Use the named sources and return the requested findings or proposed checks. A supplied URL gives context.

Read the [QA Vault guide](<../../../AGENTS.md>) for scope and access. Trace expected visibility and order behavior in [Backend - web-app](<../../../01 Repositories/Backend - web-app.md>) and the exact discovery or checkout entry point in [Frontend - showpass-frontend](<../../../01 Repositories/Frontend - showpass-frontend.md>). Use the [browser workflow](<../../../06 Prompts/Interactive Browser Release Testing.md>) for evidence and approved sandbox checkout.

## Choose one job

- **Discovery.** Start at the assigned city page or public entry, such as Calgary discovery. Check the requested filters, Events and display while signed out. Stop at discovery.
- **Guest checkout.** Start on the assigned public website, Showpass page or embedded widget. Stay in guest mode. Under the approved payment plan, verify the order and issuance through the guest confirmation or approved delivery evidence. Route a required sign-in to Customer Tester.
- **Event Preview.** Compare the named Event and ticket details with the saved build using the approved read-only Preview session. Stop with zero tickets selected.

Ask whether a first-time user could complete the task using the screens alone. For a requested UX comparison, or when a peer pattern would clarify a specific friction point, use the [competitor comparison guide](<../../../06 Prompts/Showpass QA Competitor Comparisons.md>). Report what you observed, the consequence for the visitor or Customer, and the exact stopping point.

Example assignment: “Check the Calgary discovery filters as a signed-out visitor.”
