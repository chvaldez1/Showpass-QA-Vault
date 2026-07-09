# Example: Qase Gap Analysis Prompt

Use this when you want an agent to read existing Qase coverage, compare it with the codebase, and write a gap analysis into the vault.

Related workflow: [[06 Prompts/Showpass QA Test Case Generator]]

For new test cases without a Qase coverage comparison, use [[06 Prompts/Example - Generate Test Cases]].

```text
Use 06 Prompts/Showpass QA Test Case Generator.md.

Goal:
Perform a read-only QA gap analysis for [feature, route, ticket, PR, API, or workflow].

Qase:
- Search existing Qase cases for: [keywords, case IDs, suite, feature area, or ticket].
- Summarize what is already covered.
- Do not create, update, or push Qase cases.

Source code:
- Start from the vault repo notes:
  [[01 Repositories/Backend - web-app]], [[01 Repositories/Frontend - showpass-frontend]], and [[01 Repositories/QA Automation - showpass-playwright]]
- Treat backend as the first source of truth:
  /Users/christianvaldez/Documents/Showpass/repos/web-app
- Use frontend to confirm how users follow backend behavior:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend
- Use Playwright only for existing automation patterns:
  /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Output:
- Write the gap analysis to:
  03 Test Cases/<feature-or-scenario>-qase-gap-analysis.md
- Include existing Qase coverage, source-backed behavior, coverage gaps, risk areas, suggested Qase-ready cases, automation candidates, and open questions.

Constraints:
- Keep the output concise and Qase-ready.
- Use [[05 Tooling/Qase Test Case Writing Rules]] for suggested cases, including Qase step tables with Step Action, Data, and Expected Result.
- Reference source paths instead of copying code.
- Ask one targeted question only if the missing context materially changes the gap analysis.
```
