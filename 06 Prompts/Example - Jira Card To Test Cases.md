# Example: Jira Card To Test Cases Prompt

Use this when you want an agent to read a Jira card and generate Qase-ready manual test cases from it.

Related workflow: [[06 Prompts/Jira Card To Test Cases]]

```text
Use 06 Prompts/Jira Card To Test Cases.md.

Jira card:
https://showpass.atlassian.net/browse/SPW-12345

Goal:
Generate Qase-ready manual test cases for the behavior described in this Jira card.

Scope:
- Treat the Jira card as intake context only.
- Read the card through [[05 Tooling/jiractl]].
- Verify the implementation behavior against backend source first.
- Use frontend source to confirm the user flow, routes, UI states, permissions, and visible outcomes.
- Use Playwright only for existing automation patterns.
- Do not run git diff, branch comparison, or changed-file discovery unless I explicitly ask for diff-based coverage.

Source code:
- Backend:
  /Users/christianvaldez/Documents/Showpass/repos/web-app
- Frontend:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend
- Playwright:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Output:
Write the generated cases to:
03 Test Cases/SPW-12345-<feature-name>-test-cases.md

Include:
- Jira Intake Summary
- Sources Reviewed
- Assumptions and Unknowns
- Source-backed Behavior
- Risk Areas
- State-space / setup matrix, if the behavior depends on setup choices
- Recommended Test Data
- Qase-ready Manual Test Cases
- Minimum Execution Set
- Suggested Automated Coverage
- Open Questions

Constraints:
- Do not query Qase unless I explicitly ask for a gap analysis.
- Do not update Qase.
- Do not run git diff or branch comparison unless I explicitly ask for diff-based coverage.
- Use [[05 Tooling/Qase Test Case Writing Rules]].
- Use `TC-*` labels for test cases.
- Keep steps executable by the relevant Showpass actor.
- Do not use `the tester` wording.
- Reference source paths instead of copying large code snippets.
```
