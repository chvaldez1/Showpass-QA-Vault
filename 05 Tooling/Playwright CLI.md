# Playwright CLI

Run commands from:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Use [[04 Automation/00 Index]] for automation delivery. Read the repository's `AGENTS.md`, current package scripts, test configuration and setup/cleanup before execution. A test command can create purchases or other records; choose an authorized environment and exact test selection. The vault review checked the scripts on 2026-10-31 but did not run Showpass tests.

## Start with a focused selection

The current package scripts set `APP_ENV` explicitly: `test`/`test:local` use local, `test:beta` uses beta, and `test:demo` uses demo. Do not infer the environment from an open browser or branch. Replace the example file/title with the actual selected test.

```bash
# List the selected beta cases without executing the tests
APP_ENV=beta npx playwright test path/to/test.test.ts --list

# Execute only the selected, authorized beta test
npm run test:beta -- path/to/test.test.ts --grep "exact selected title"
```

Inspect expanded cases, platform/project and prerequisites before execution. Record actual environment, source/test revisions, deployed build/configuration, first-attempt and retry results, skipped checks, final records and verified cleanup. Broad suites and production runs require their own requested scope. A local pass does not establish CI execution.

## Common Commands

```bash
# Run a whole suite only when that suite/environment is in the requested scope
npx playwright test

# Run a specific test file
npx playwright test path/to/test.spec.ts

# Filter by title
npx playwright test --grep "checkout"

# Run a project
npx playwright test --project=<project-name>

# Headed mode
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Open report
npx playwright show-report
```

## Notes

- Check repo scripts before using raw `npx` commands.
- Follow existing config, fixtures, and page object patterns.
