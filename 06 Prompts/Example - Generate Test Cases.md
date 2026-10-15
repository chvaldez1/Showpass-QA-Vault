# Example: Generate Test Cases Prompt

Use for new source-backed manual cases. The linked workflow supplies repository paths, handbook selection, source order, browser boundaries, and Qase format; do not paste those rules into every request.

Related: [[06 Prompts/Showpass QA Test Case Generator]] · [[06 Prompts/Jira Card To Test Cases]] · [[06 Prompts/Example - Qase Gap Analysis]].

```text
Use [[06 Prompts/Showpass QA Test Case Generator]].

Goal:
Generate Qase-ready manual cases for [feature, workflow, Jira key, route, or PR].

Context:
[Short behavior/request summary and any known roles, clients, flags or risks.]

Scope:
- [Focused workflow by default; say “full page” to account for all relevant page controls/states.]
- [Required combinations or non-goals, if any; do not impose an arbitrary case limit.]

Output:
Update the existing canonical note for this scope; otherwise use:
03 Test Cases/<feature>/<feature-or-scenario>-test-cases.md

Use relevant handbook sections and an already-open matching Codex browser to enrich the cases.
For Dashboard pages, group cases by visible navigation and the screen owning the behavior.
Review the exact diff when I supply a PR/branch for coverage; Jira-only intake stays source-based without a diff.
Do not query or update Qase. Browser enrichment uses non-saving interactions; live mutations need authorized execution scope.
```

Fill in the goal and context; omit optional lines that do not apply. A route/link alone does not request a new browser session. To execute cases, invoke [[06 Prompts/Interactive Browser Release Testing]] with the case note and any needed data boundaries.
