---
name: deslop-jira-pr
description: Explain or rewrite Jira issue and GitHub PR descriptions in plain language, and turn their manual QA checklists into runnable walkthroughs. Use when asked to de-slop a ticket or PR, explain what a checklist means, or show what to set up, click, and expect. For a link alone, use the surrounding request.
---

# De-slop Jira and PR descriptions

Use the pasted text or read the linked item with the available connector when context is needed. Match the requested scope. For “what does this mean?”, explain the change and its practical effect first. For a rewrite, return copy-ready text for the requested section or description. Keep existing template headings when they matter. Publish changes only when the user explicitly requests a live edit.

## Showpass review

Consult the [Showpass Release Engineering Handoff](<../../../06 Prompts/Showpass Release Engineering Handoff.md>) for Showpass Jira and PR work. Follow **Release Engineer → Backend Master + Frontend Master → Release Engineer handoff → QA Lead sign-off**.

1. Have [Release Engineer](../showpass-release-engineer/SKILL.md) scope the question or draft to the exact candidate, affected workflow, and evidence needed.
2. Consult [Backend Master](../showpass-backend-master/SKILL.md) for business rules and saved outcomes, and [Frontend Master](../showpass-frontend-master/SKILL.md) for entry points, controls, and visible behavior. Use the same scope in separate reviewer contexts and share the backend findings with Frontend Master where relevant.
3. Have Release Engineer combine the findings, evidence, and open questions in the handoff. Have [QA Lead](../showpass-qa-lead/SKILL.md) independently review that exact revision. Sign-off for a draft applies to the draft or handoff.

Reuse findings and sign-off that already cover the same revision, scope, and evidence. If a review is unavailable, name what is missing and mark sign-off pending. You can still explain what the source text says or provide a provisional draft. Keep this review scoped to the writing request and distinguish its decision from release approval, permission to run tests, or permission to publish.

## Editing

- Lead with who is affected, what they do, and what goes wrong or changes. Say “While accepting a ticket transfer, the recipient can see a required follow-up from the wrong form” before discussing condition evaluation.
- Replace vague labels with the action or setting they represent. For example, “answer the attendance question” is clearer than “select the controller.” Keep exact button and option labels, flag names, issue links, and API values when readers need them. Put implementation detail where reviewers or testers can use it.
- Preserve the facts, including conditions, exceptions, affected records, and verification status. Keep reported behavior, intended behavior, completed checks, and proposed checks distinct. A merged PR does not establish that manual QA ran. If a detail is missing, identify the gap instead of making up a label, path, or result.
- In Jira, lead with the reported behavior, who it affects, and what should happen. For a bug, preserve the setup and expected and actual results. In a PR, lead with what the change does and why, then keep the implementation detail and verification the reviewer needs.

## Manual QA walkthroughs

When someone shares a manual QA checklist and asks what it means or how to test it, give them one complete first check they can follow. Start with the smallest setup that proves a stated behavior. State which part of the checklist that check covers. Account for the rest of the requested checks, and give full steps for each when the user asks for a full runbook.

- **What to set up.** Name the environment, prerequisites to confirm, accounts and their roles, and the exact records to use or create. Give the verified menu path, field types, setting names and values, and the order of setup actions. Say which values are examples. Call out settings that must be saved before a purchase or other action captures them. Distinguish release flags that must already be enabled from settings the tester changes on their test record.
- **What to do and see.** Start from the screen the person can actually open. Specify the account when the role changes. Pair each action with its visible expected result, using verified headings, field labels, button text, and validation messages. Give concrete input values that distinguish the records or actors. Label the data effect, explain how to verify the saved outcome by reopening the relevant record, and state where to stop or what to record if the expected screen is missing.
- **What needs a separate fixture.** Put shared setup once. Name the exact missing record, historical state, permissions, or deployed version needed for each blocked check. Verify that the UI can create or select the required records together before recommending that path. Mark which cases can wait and keep unverified settings and unrun checks explicit.

Use candidate source and existing evidence to verify navigation and expectations. Label them as source-based when the deployed behavior has yet to be observed. If a single action has UI, request payload, and saved-record results, identify where each can be checked. Preserve distinctions such as a submitted `null`, an omitted field, an empty input, and a cleared saved answer. Give a text preview of the expected screen when that makes the next action clearer.

For a ticket transfer, a runnable first check can use one test ticket and a required **Pickup note** question created using **Order Form → Add field → Short text** and saved before purchase. The sender enters `Sender pickup note` at checkout and transfers the ticket. The recipient opens the emailed link and sees **A few details are needed** with a blank **Pickup note**. **Continue** shows **This field is required**. Enter `Recipient pickup note`, continue to **Accept transfer**, and verify the recipient's answer on the transferred order. A separate check that needs two purchase versions may require a prepared transfer if the applicable order picker only shows one order. Use the applicable source to confirm the actual controls, prerequisites, and records before giving steps.
