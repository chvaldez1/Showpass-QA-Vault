# QA Automation - showpass-playwright

Repo path:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Use this repo for durable Playwright patterns before creating new automation.

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

- `docs/agent-workflows/standards/manual-qa-principles.md`
- `docs/agent-workflows/workflows/showpass-qa-test-case-generator.md`
- `docs/agent-workflows/standards/playwright-principles.md`
- `docs/agent-workflows/standards/test-architecture.md#ui-aligned-test-folders` — visible navigation and owning-screen placement

The generator's [[06 Prompts/Showpass QA Test Case Generator#Source Context|tuning reference]] records the PR #458 revision reviewed. Prefer its relevant efficiency and browser-evidence practices without importing browser-guide exceptions that conflict with the vault's canonical standard or standalone Qase fields.

Their applicable cross-cutting quality rules are consolidated in [[00 Start Here/World-Class Software Quality Standard]].
