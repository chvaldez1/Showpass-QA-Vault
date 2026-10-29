---
title: Example - Browser Testing
tags:
  - qa/prompt
  - browser-testing
---

# Example: Browser Testing Prompt

Use `$showpass-qa-tester` to have the agent act as your QA tester in the browser sidebar, guided by the repos and vault. Focused smoke checks help identify what matters most; deep reviews work through the full agreed scope. [[06 Prompts/Interactive Browser Release Testing]] maintains the detailed execution and evidence rules used by the skill.

Every run follows **Plan → Test → Evidence**. The agent shows its checks and expected results, executes within the allowed scope, and returns results with proof. Add `Plan only — wait for my approval` when you want a review before execution.

Reports follow [[03 Test Cases/Browser Test Report Template]]: a short overview, one summary row per distinct confirmed bug, a clickable test index, numbered steps with Expected and Actual results, and screenshots beneath the steps. The final table uses **Check and step / Status / Bug / What happened**, with check names linked directly to their evidence and Passed / Failed / Blocked / Not run kept clear. Images remain local and ignored by Git.

Each test explains **What this tests**, **Start here** and the exact **Steps**. The report names the controls and values to inspect, so you can repeat a check without the chat history. Screenshots display at up to 600px wide with full-size originals available. An edit to an older report does not count as a new test run.

Reproductions follow [[00 Start Here/World-Class Software Quality Standard#Executable Reproduction Handoff]]: explain how to select the right Organizer, prepare filters or show a required panel, state whether your account is suitable, and give a clear result and stopping point. If your involvement is needed, the agent gives one complete check in chat with exact outcome choices and what to report, rather than only linking the report.

For a confirmed bug, `$showpass-qa-tester` uses `$showpass-bug-drafter` to add a copy-ready Jira draft to the same report. This prepares the wording; it does not create a Jira issue.

## On-the-Fly Quest

A short request is enough; you do not need a prepared test-case note:

```text
Use $showpass-qa-tester.
Mode: Focused smoke.

Context: Next.js version bump on beta.
Quest: Open protected dashboard pages directly while signed out.
Confirm no protected data appears.

Show the exact pages, checks and expected results first, then test.
Preserve my current signed-in session. Use an available authorized signed-out
test session; tell me if the required session is unavailable.
Do not change saved records or Qase.

Return a result and supporting evidence for each check.
State which pages, loading behavior or API checks you could not verify.
For confirmed bugs, use $showpass-bug-drafter in the report.
Do not create Jira issues.
```

If you have the version-bump PR, add it so the agent can inspect the exact changes. The context above is an example, not a claim that beta's deployed version has been verified.

## Focused Smoke

```text
Use $showpass-qa-tester.
Mode: Focused smoke.

Goal:
Test [page or workflow] in the already-open browser.
Prioritize business-critical behavior and realistic existing records.

Scope:
[New or legacy page; specific features, records or desktop/mobile checks, if relevant.]

Finishing point:
[The visible outcome that completes this check, plus cleanup.]
Use the supplied records and ready controls first. Choose meaningful variations
without repeating equivalent combinations. Keep known issues and deprecated
controls separate from new bugs, and stop when the selected checks are accounted for.

Allowed data changes:
[Exact records and actions allowed for this run, plus what to restore or preserve.]
Reuse permission already given in this conversation. If no data changes are authorized,
continue with non-saving checks and name the save/purchase checks not run.

Output:
Update the existing browser-testing note for this scope; otherwise use:
03 Test Cases/<feature>/<feature-or-scenario>-browser-testing.md

Show the important checks first and why they matter.
Report what was tested and passed, confirmed bugs, uncertain results,
and the most important checks not run, with the reason for each.
Name the exact item, report type or field when relevant. Link supporting evidence.
Keep the results easy to read. Do not modify Qase.
For each test, state what it proves and where to start. Give exact numbered
actions and name what I should see after each one. Keep Actual results and
screenshots beside those steps, with clickable test IDs in the final table.
Include one copy-ready Jira draft per distinct confirmed bug in the same note.
Keep uncertain findings labelled and do not create Jira issues.
```

Fill in the page and any necessary data boundaries. Omit optional scope details when they are already clear from the conversation. For example, name the sold and unsold products to inspect, or the event and tickets approved for check-in. Permission to inspect a page does not grant permission to save changes or complete transactions.

## Deep Review

Use this when you want the full agreed coverage executed:

```text
Use $showpass-qa-tester.
Mode: Deep review.
Execute [[03 Test Cases/<feature>/<test-case-note>]].

Allowed data changes:
[Exact records and actions allowed, plus what to restore or preserve.]

Update the existing browser-testing note for this scope.
Report bugs, evidence, checks not run and the release recommendation.
Do not modify Qase.
```

For drafting cases, use [[06 Prompts/Example - Generate Test Cases]]. To compare existing Qase coverage, use [[06 Prompts/Example - Qase Gap Analysis]].
