# Example: Qase Gap Analysis Prompt

Use to compare actual Qase case definitions with current source behavior. The linked workflow supplies repository paths, handbook selection, Qase access, browser boundaries, and case formatting.

Related: [[06 Prompts/Showpass QA Test Case Generator]] · [[06 Prompts/Example - Generate Test Cases]].

```text
Use [[06 Prompts/Showpass QA Test Case Generator]] and [[05 Tooling/qasectl]].

Goal:
Perform read-only Qase gap analysis for [feature, workflow, page, Jira key, or PR].

Qase scope:
[Keywords/aliases, suites, tags, or exact case IDs; note if this is an exact-ID review only.]

Coverage scope:
[Focused workflow by default; say “full page” for all relevant page controls/states.]
[Required clients/combinations, risks or exclusions, if known.]

Output:
Update the existing canonical note for this scope; otherwise use:
03 Test Cases/<feature>/<feature-or-scenario>-qase-gap-analysis.md

Use one complete bulk Qase snapshot and local filtering for broad gaps; read only named cases for an exact-ID review.
Compare full case fields/assertions with source, not titles alone. Report query completeness and separate definitions from executed proof.
Prefer enhancing suitable existing cases; draft distinct missing cases in the same note. Preserve existing useful coverage.
Use selected handbook sections and an already-open matching Codex browser for non-saving UI checks.
Group Dashboard cases and gaps by visible navigation and the screen owning the behavior.
Review the exact diff for a supplied coverage PR/branch; keep Jira-only intake source-based without a diff.
Do not create, update, move, or delete Qase cases/suites, or execute live mutations.
```

Fill in the goal and Qase scope; omit optional lines. An incomplete Qase read means coverage is unknown, not missing. A minimum execution set prioritizes the resulting drafts; it does not establish an executed pass.
