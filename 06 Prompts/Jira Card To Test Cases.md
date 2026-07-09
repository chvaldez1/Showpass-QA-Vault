# Jira Card To Test Cases

Use this prompt when a user pastes a Jira card link or issue key and wants Qase-ready QA coverage generated from it.

```text
Use 06 Prompts/Showpass QA Test Case Generator.md.

<paste Jira link or issue key>

Goal:
Generate Qase-ready manual test cases from this Jira card.

Jira:
- Use [[05 Tooling/jiractl]] to read the card.
- Include a short Jira Intake Summary with title, status, requested behavior, acceptance criteria or implied expected behavior, relevant comments or decisions, and open questions.
- Treat Jira as intake context only.

Source code:
- Verify backend behavior first:
  /Users/christianvaldez/Documents/Showpass/repos/web-app
- Verify the frontend user flow:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend
- Use Playwright only for existing automation patterns:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright
- Do not run git diff, branch comparison, or changed-file discovery unless explicitly asked for diff-based coverage. Inspect relevant source files directly from the Jira context, branch name, route, API, or feature terms.

Output:
- Write Qase-ready cases under `03 Test Cases/`.
- Use a filename based on the Jira key and feature, such as `03 Test Cases/SPW-12345-feature-name-test-cases.md`.
- Include Jira Intake Summary, Sources Reviewed, Assumptions and Unknowns, Source-backed Behavior, Risk Areas, State-space / setup matrix when useful, Recommended Test Data, Qase-ready Manual Test Cases, Minimum Execution Set, Suggested Automated Coverage, and Open Questions.

Constraints:
- Do not query or update Qase unless explicitly asked for a Qase gap analysis.
- Do not run git diff or branch comparison unless explicitly asked for diff-based coverage.
- Use [[05 Tooling/Qase Test Case Writing Rules]].
- Keep cases executable by a Showpass customer, organizer, venue employee, Box Office employee, dashboard user, attendee, or authenticated user.
- Do not write `the tester`.

Do not treat Jira as source of truth for implementation behavior. After reading Jira, verify behavior against backend source first, then frontend and Playwright patterns as needed.
```
