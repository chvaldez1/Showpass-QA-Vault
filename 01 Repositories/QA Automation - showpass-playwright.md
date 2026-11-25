# QA Automation - showpass-playwright

Start in the sibling `showpass-playwright` checkout. Read [AGENTS.md](../../showpass-playwright/AGENTS.md) and the [Playwright agent team workflow](../../showpass-playwright/docs/agent-workflows/playwright-team.md). They own automation routing, implementation, exact-patch review, and focused verification. From City, use [[00 Start Here/Showpass QA City#Playwright handoffs|Playwright handoffs]] to open that checkout with the same work item.

Use [[00 Start Here/World-Class Software Quality Standard]] as the canonical quality policy. Repository workflow documents are implementation references and upstream evidence; they are not separate local standards.

## What QA Should Inspect

- Existing tests for similar workflows
- Page objects and locator conventions
- Fixtures, setup, and teardown patterns
- Playwright config files and projects
- Helpers, utilities, and test data builders
- Assertions and retry patterns

## QA Notes

- Follow existing structure before adding new patterns.
- Prefer stable selectors and user-facing assertions.
- Keep automated scenarios focused on high-value behavior.
- Preserve coverage-ledger visibility for behavior that remains browser-verified, manual-only, deferred, or blocked after automation.

## Upstream Workflow References

- [Agent workflow index](../../showpass-playwright/docs/agent-workflows/README.md#choose-the-procedure) for the current test writing, update, and review procedures.
- [Manual QA principles](../../showpass-playwright/docs/playwright-handbook/planning/manual-qa.md) and the [QA test case generator](../../showpass-playwright/docs/agent-workflows/workflows/showpass-qa-test-case-generator.md) for manual case guidance.
- [Dashboard tests follow the menu](../../showpass-playwright/docs/playwright-handbook/foundations/project-structure.md#dashboard-tests-follow-the-menu) for visible navigation and owning-screen placement.

The generator's [[06 Prompts/Showpass QA Test Case Generator#Source Context|tuning reference]] records the PR #458 revision reviewed. Prefer its relevant efficiency and browser-evidence practices without importing browser-guide exceptions that conflict with the vault's canonical standard or standalone Qase fields.

Their applicable cross-cutting quality rules are consolidated in [[00 Start Here/World-Class Software Quality Standard]].
