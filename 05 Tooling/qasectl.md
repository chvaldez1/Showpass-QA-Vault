# qasectl

`qasectl` is the bridge between local QA analysis and Qase. Use it to read existing Qase coverage before creating new cases, and later to push signed-off updates.

## Intended Uses

- Read existing Qase cases for a feature, route, ticket, API, or keyword.
- Compare Qase coverage with backend and frontend source behavior.
- Identify missing, stale, or weak test coverage.
- Push approved Qase case updates after human sign-off.

## Required Writing Rules

Before generating, reviewing, or updating Qase-ready test cases through this workflow, read and apply [[05 Tooling/Qase Test Case Writing Rules]].

These rules define the Showpass Qase standard for user perspective, observable behavior, Qase step structure, platform/view parameterization, approved tags, description content, duplicate-case handling, and complete-case refinement.

## Read-First Workflow

Use this with [[06 Prompts/Showpass QA Test Case Generator]]:

1. Query Qase for existing coverage.
2. Inspect backend source truth in `/Users/christianvaldez/Documents/Showpass/repos/web-app`.
3. Inspect frontend behavior in `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`.
4. Apply [[05 Tooling/Qase Test Case Writing Rules]] to any suggested new or updated cases.
5. Write the gap analysis to the requested output file, or create a suitably named note under `03 Test Cases/`.
6. Do not push to Qase until the output is reviewed and signed off.

## Qase Update Workflow

Use this when the user explicitly approves updating Qase cases.

1. Confirm scope before writing: suite ID, case IDs, and exact field types to update.
2. Read and apply [[05 Tooling/Qase Test Case Writing Rules]] for any test case content changes.
3. Load credentials from the existing vault `.env`; do not ask for or echo tokens when `.env` is present.
4. Read the current case payloads from Qase and save the important before-state in command output or a short note.
5. Build an idempotent updater script that supports dry-run mode first.
6. Dry run before any write:
   - print each case ID
   - print each field that would change
   - print before -> after for short fields like `title`
   - print a count or compact diff for long fields like `steps`
7. Review dry-run output against the request. If the change is broad or destructive, pause for confirmation.
8. Run the apply mode only after the dry run is clean.
9. Re-read Qase after applying and verify the requested text or field state is correct.
10. Delete temporary scripts unless they are intentionally useful for reuse.

Prefer a small local script over fragile inline shell JSON for Qase writes. The script should parse `.env`, construct JSON payloads with structured objects, and avoid shell interpolation for request bodies.

For wording updates, make replacements idempotent. Example: when changing `Guestlist` to `Guestlists`, use a boundary-aware replacement so existing `Guestlists` does not become `Guestlistss`, and verify both the old term and accidental double-plural forms are gone.

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

For agent runs, prefer this pattern so tokens stay in the process environment and are never printed:

```bash
set -a
source .env
set +a
TOKEN="${QASE_TESTOPS_API_TOKEN:-$QASE_API_TOKEN}"
```

## Command Examples

```bash
# Show help
qasectl --help

# Installed local CLI shape
qasectl testops --help

# Read one suite through Qase API
curl -sS -H "Token: $TOKEN" \
  "https://api.qase.io/v1/suite/${QASE_PROJECT_CODE}/<suite-id>" | jq

# List cases in a suite through Qase API
curl -sS -G -H "Token: $TOKEN" \
  --data-urlencode "suite_id=<suite-id>" \
  --data-urlencode "limit=100" \
  "https://api.qase.io/v1/case/${QASE_PROJECT_CODE}" | jq

# Read one case through Qase API
curl -sS -H "Token: $TOKEN" \
  "https://api.qase.io/v1/case/${QASE_PROJECT_CODE}/<case-id>" | jq
```

## API And Docs Guidance

- Prefer the local `qasectl --help` output and known Qase API patterns already captured here before searching the web.
- Do not browse Qase docs by default for routine reads or small updates if the local command/API pattern is already known.
- Browse official Qase docs only when the endpoint, payload shape, or behavior is unknown after checking local examples.
- If docs are needed, use official Qase documentation or API reference only.

## Notes

- Confirm commands before relying on them.
- Read commands are safe for gap analysis.
- Push/update commands require human sign-off first.
- Write commands should always have a dry-run preview before apply.
