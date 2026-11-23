# Example: Qase Gap Analysis Prompt

Keep the gap analysis and case draft in planning scope. Use the [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|review policy]] if the assignment moves to live execution or a release handoff.

Use the dedicated [[06 Prompts/Showpass Qase Gap Analysis]] workflow. It reads existing coverage and delivers focused, standalone Qase-ready cases, with brief supporting analysis afterward.

```text
Keep the gap analysis and case draft in planning scope. Use the [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|review policy]] if the assignment moves to live execution or a release handoff.

Use [[06 Prompts/Showpass Qase Gap Analysis]] and [[05 Tooling/qasectl]].

Goal:
Compare existing Qase coverage for [feature, page, workflow, Jira key, or PR].

Known coverage:
[Case IDs, suite, keywords or aliases, if known.]

Scope:
[Required roles, clients, views, configuration or timezones, if relevant.]

Output:
Update the existing canonical note; otherwise use:
03 Test Cases/<feature>/<feature-or-scenario>-qase-test-cases.md

Deliver focused Qase-ready cases first. Split distinct behaviors into separate tests.
Prefer enhancing suitable existing cases and preserve useful coverage.
Keep the gap summary and source evidence short and after the cases.
Do not modify Qase or execute live mutations.
```

For new cases without reading Qase, use [[06 Prompts/Example - Generate Test Cases]].
