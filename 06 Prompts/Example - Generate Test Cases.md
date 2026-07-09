# Example: Generate Test Cases Prompt

Use this when you want an agent to create new source-backed manual test cases without doing a Qase gap analysis.

Related workflow: [[06 Prompts/Showpass QA Test Case Generator]]

For Jira-card intake, use [[06 Prompts/Example - Jira Card To Test Cases]].
For existing Qase coverage comparison, use [[06 Prompts/Example - Qase Gap Analysis]].

```text
Use 06 Prompts/Showpass QA Test Case Generator.md.

Goal:
Generate Qase-ready manual test cases for [feature, route, PR, API, workflow, regression, or behavior].

Context:
- [Paste short product/request context, PR summary, feature notes, route, API, or behavior here.]
- [Add any known roles, surfaces, setup requirements, feature flags, or edge cases.]

Source code:
- Start from the vault repo notes:
  [[01 Repositories/Backend - web-app]], [[01 Repositories/Frontend - showpass-frontend]], and [[01 Repositories/QA Automation - showpass-playwright]]
- Treat backend as the first source of truth when the behavior touches APIs, validation, permissions, checkout, payments, credits, refunds, settlement, reports, or other business rules:
  /Users/christianvaldez/Documents/Showpass/repos/web-app
- Use frontend source to confirm the user flow, routes, UI states, permissions, and visible outcomes:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend
- Use Playwright only for existing automation patterns and suggested automation candidates:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Output:
- Write the generated cases to:
  03 Test Cases/<feature-or-scenario>-test-cases.md
- Include Sources Reviewed, Assumptions and Unknowns, Source-backed Behavior, Risk Areas, State-space / setup matrix if useful, Recommended Test Data, Qase-ready Manual Test Cases, Minimum Execution Set, Suggested Automated Coverage, and Open Questions.

Constraints:
- Do not query Qase.
- Do not perform a Qase gap analysis.
- Do not update Qase.
- Do not run git diff, branch comparison, or changed-file discovery unless I explicitly ask for diff-based coverage.
- Use [[05 Tooling/Qase Test Case Writing Rules]].
- Use `TC-*` labels for test cases.
- Keep steps executable by the relevant Showpass actor.
- Do not use `the tester` wording.
- Reference source paths instead of copying large code snippets.
```
