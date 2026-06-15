# Playwright CLI

Run commands from:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

## Common Commands

```bash
# Run all tests
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
