# qasectl

`qasectl` is the bridge between local QA analysis and Qase. Use it to read existing Qase coverage before creating new cases, and later to push signed-off updates.

## Intended Uses

- Read existing Qase cases for a feature, route, ticket, API, or keyword.
- Compare Qase coverage with backend and frontend source behavior.
- Identify missing, stale, or weak test coverage.
- Push approved Qase case updates after human sign-off.

## Read-First Workflow

Use this with `06 Prompts/Showpass QA Test Case Generator.md`:

1. Query Qase for existing coverage.
2. Inspect backend source truth in `/Users/christianvaldez/Documents/Showpass/repos/web-app`.
3. Inspect frontend behavior in `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`.
4. Write the gap analysis to the requested output file, or create a suitably named note under `03 Test Cases/`.
5. Do not push to Qase until the output is reviewed and signed off.

## Local Environment

Store Qase credentials in a local `.env` file at the vault root. This file is ignored and must not be committed.

Required variables:

```bash
QASE_TESTOPS_API_TOKEN=
QASE_PROJECT_CODE=
```

Load the variables before running read-only Qase commands:

```bash
set -a
source .env
set +a
```

## Command Placeholders

```bash
# Show help
qasectl --help

# Placeholder: search existing Qase cases
qasectl qase search "<feature-or-keyword>"

# Placeholder: read one Qase case
qasectl qase get <case-id>

# Placeholder: export matching cases for gap analysis
qasectl qase export --query "<feature-or-keyword>"
```

## Notes

- Confirm commands before relying on them.
- Read commands are safe for gap analysis.
- Push/update commands require human sign-off first.
