# Prompt: Convert Test Cases to Playwright

Use this prompt after manual test cases are validated.

## Workflow Selection Guide

Use the specs README to choose the right automation workflow:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/specs/README.md`

That README explains when to use browser specs, browser verification, new Playwright generation, or updates to existing Playwright tests.

## Canonical Automation Workflows

- Create new automation from a validated spec:
  `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/write-playwright-test.md`
- Update existing automation:
  `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/update-playwright-test.md`
- Shared principles:
  `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/playwright-principles.md`

Do not create CI automation from a draft or blocked spec. Prefer `Browser-Verified` or `Playwright-Ready` specs when converting coverage into Playwright.

```text
You are helping convert validated Showpass QA test cases into Playwright automation.

Follow existing patterns in:
/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Before writing code, read:
/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/specs/README.md

Use backend behavior as the source of truth:
/Users/christianvaldez/Documents/Showpass/repos/web-app

Use frontend code to confirm how the UI follows backend behavior, including routes, workflows, selectors, and UI states:
/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend

Task:
1. Confirm whether this needs a browser spec first, new Playwright automation, or an update to existing automation.
2. Review existing Playwright tests, page objects, fixtures, helpers, config, Qase metadata, and priority tags.
3. Map each validated test case to the closest existing automation pattern.
4. Propose the test file location, page objects, fixtures, test data, and assertions.
5. Prefer stable selectors, user-visible assertions, and existing page object conventions.
6. Note risks such as flaky setup, missing browser verification, external dependencies, and cleanup needs.

Do not invent a new framework structure unless existing patterns cannot support the scenario.
Keep the plan concise and implementation-ready.
```
