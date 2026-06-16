# Showpass QA Test Case Generator

This note points to the canonical agent workflow file. The full workflow is not stored in this vault.

## Canonical QA Workflow

Repo:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Workflow file inside repo:
`docs/agent-workflows/showpass-qa-test-case-generator.md`

Full path:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`

Use this workflow when the goal is Qase-ready manual QA coverage, regression coverage, or Playwright-friendly scenarios for a PR or frontend change.

Do not duplicate the workflow content here. Read the canonical QA workflow before generating test cases.

## Vault Output Target

If the user specifies an output file, write generated test cases there.

If the user does not specify an output file, create a new note under:
`03 Test Cases/`

Use the best suitable filename for the feature or scenario, such as:
`03 Test Cases/<feature-or-scenario>-test-cases.md`

Use the canonical workflow's preferred style: concise, grouped, Qase-ready cases with clear sources, assumptions, risk areas, test data, and GIVEN / WHEN / THEN steps.

## Read / Gap Analysis Flow

Use this flow when the goal is to compare existing Qase knowledge against the codebase before creating or updating cases.

1. Read existing Qase cases for the feature, route, ticket, API, or keyword using `qasectl` when available.
2. Inspect backend behavior as the source of truth.
3. Inspect frontend code to see how users follow that backend behavior.
4. Compare Qase coverage against source behavior.
5. Write the output into the user-specified file, or create a new suitably named note under `03 Test Cases/` when no output file is specified.

The output should separate:

- Existing Qase coverage
- Source-backed behavior found in code
- Coverage gaps
- Risk areas
- Suggested new or updated Qase-ready cases
- Open questions that block confident coverage

Do not push changes to Qase during read/gap analysis. Treat Qase updates as a separate sign-off step.

When a user does approve Qase updates, follow [[05 Tooling/qasectl#Qase Update Workflow]] before writing: use the existing `.env`, dry run the exact changes, apply only after the preview is clean, then re-read Qase to verify.

## When To Use

- Generate QA test cases from backend and frontend code.
- Turn source behavior into structured QA coverage.
- Prepare test cases that may later become Playwright automation.
- Create broader manual QA coverage separate from `SPEC_*.md` browser plans.
- Compare existing Qase coverage against backend/frontend source behavior.

## Source Context

- Backend first source of truth: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend follows backend behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright automation patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

## Agent Reminder

Read the canonical workflow first. For gap analysis, read Qase first, inspect source code second, then write findings into the user-specified output file or a new suitably named note under `03 Test Cases/`. Keep vault notes short and reference source paths instead of copying workflow content.
