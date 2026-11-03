# Prompt: Convert Test Cases to Playwright

Use this prompt for a requested Playwright implementation or update. Validated manual cases are useful input when available. Sufficient verified requirements, source and existing automation patterns can support direct implementation without a separate browser-spec or manual-case pass.

Use [[04 Automation/00 Index]] for delivery through actual execution and CI evidence. A planning-only request still ends with a bounded handoff; an implementation request continues through code and focused verification within the authorized scope.

## Workflow Selection Guide

Start with the vault repo note: [[01 Repositories/QA Automation - showpass-playwright]].

Use the specs README to choose the right automation workflow:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/specs/README.md`

That README explains when to use browser specs, browser verification, new Playwright generation, or updates to existing Playwright tests.

## Canonical Automation Workflows

- Create new automation from a validated spec:
  `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/workflows/write-playwright-test.md`
- Update existing automation:
  `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/workflows/update-playwright-test.md`
- Shared principles:
  `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/standards/playwright-principles.md`

Resolve prerequisites, inputs, intended outcomes, selector provenance and cleanup before dependent implementation. Do not require invented readiness labels or a completed browser run when verified facts support implementation. Unknown behavior remains a named gap. Source/POM evidence alone does not establish an executed browser pass. The current repository README makes a browser spec optional; the vault's canonical coverage and safety requirements still apply.

```text
You are implementing or updating the selected Showpass Playwright coverage, or preparing a plan only when that is the requested mode.

Start from the vault repo notes:
[[01 Repositories/QA Automation - showpass-playwright]], [[01 Repositories/Backend - web-app]], and [[01 Repositories/Frontend - showpass-frontend]]

Follow existing patterns in:
/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Before writing code, read:
/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/specs/README.md

Use backend behavior as the source of truth:
/Users/christianvaldez/Documents/Showpass/repos/web-app

Use frontend code to confirm how the UI follows backend behavior, including routes, workflows, selectors, and UI states:
/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend

Task:
1. Read the requested mode and exact selected outcomes. For implementation, choose an existing-test update or a focused new test; create a browser spec only when useful or requested. Read the target repository's AGENTS.md and applicable workflow before edits.
2. Review existing Playwright tests, page objects, fixtures, helpers, config, Qase metadata, and priority tags.
3. Map each validated test case to the closest existing automation pattern.
4. Propose the test file location, page objects, fixtures, test data, and assertions.
5. Prefer stable selectors, user-visible assertions, and existing page object conventions.
6. Note risks such as flaky setup, missing browser verification, external dependencies, and cleanup needs.
7. For an implementation request, make the scoped change, run the relevant baseline/focused checks and repository-required validation, inspect final-state and cleanup proof, and correct failures within scope. Do not stop after the proposal in step 4.
8. Report actual command, source/test revision, candidate/configuration, first-attempt and retry outcomes, evidence and remaining gaps. If execution is blocked, keep the useful implementation and state exactly what was not run; do not claim protection.
9. Record actual CI selection/job/trigger and run evidence when integration is requested and authorized. Otherwise state Not integrated or Not run. Do not launch unrelated jobs, broaden data mutations or write Qase as a side effect.
10. Update the selected candidate's existing canonical note. Preserve its ID, manual fallback and unresolved device/backend proof. For plan-only mode, finish once implementation facts are clear; do not repeat discovery without a named uncertainty.

Do not invent a new framework structure unless existing patterns cannot support the scenario.
Keep the result concise and distinguish planned, implemented, locally verified and running-in-CI work.
```
