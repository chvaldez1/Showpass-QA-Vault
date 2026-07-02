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

## Read-Only Bulk Search Workflow

Use this before gap analysis when searching by feature, keyword, route, tag, or broad area. Prefer one bulk read plus local filtering instead of many small Qase requests. This reduces repeated permission prompts and makes the search reproducible.

1. Load credentials from the vault `.env`; do not echo tokens.
2. Try a targeted Qase search first when the keyword is narrow.
3. If the result may miss tag-only matches, false negatives, or related titles, page through all cases once and save the response under `/private/tmp`.
4. Filter the saved JSON locally with `jq` for titles, tags, suite IDs, params, and step counts.
5. Batch-read full case details only for the final matching case IDs.
6. Save the important query summary in the gap-analysis note: keyword, total cases scanned, match count, filter rule, and case IDs reviewed.

Targeted keyword search:

```bash
set -a
source .env
set +a
TOKEN="${QASE_TESTOPS_API_TOKEN:-$QASE_API_TOKEN}"

curl -sS -G -H "Token: $TOKEN" \
  --data-urlencode "search=<keyword>" \
  --data-urlencode "limit=100" \
  "https://api.qase.io/v1/case/${QASE_PROJECT_CODE}" \
  > /private/tmp/qase-search.json

jq '{status, total: .result.total, filtered: .result.filtered, count: (.result.entities // [] | length), cases: [.result.entities[]? | {id, title, suite_id, tags: [(.tags // [])[]?.title], params, step_count: ((.steps // []) | length)}]}' \
  /private/tmp/qase-search.json
```

Bulk scan all cases once, then filter locally:

```bash
set -a
source .env
set +a
TOKEN="${QASE_TESTOPS_API_TOKEN:-$QASE_API_TOKEN}"

for offset in 0 100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500; do
  curl -sS -G -H "Token: $TOKEN" \
    --data-urlencode "limit=100" \
    --data-urlencode "offset=$offset" \
    "https://api.qase.io/v1/case/${QASE_PROJECT_CODE}"
done > /private/tmp/qase-cases-pages.jsonl

jq -s '[.[].result.entities[]?]' \
  /private/tmp/qase-cases-pages.jsonl \
  > /private/tmp/qase-cases-all.json

jq '[.[] | select(((.title // "") | test("<keyword>"; "i")) or ((.tags // []) | any((.title // "") == "<tag>"))) | {id, title, suite_id, tags: [(.tags // [])[]?.title], params, step_count: ((.steps // []) | length)}] | sort_by(.id)' \
  /private/tmp/qase-cases-all.json
```

Batch-read details for selected case IDs:

```bash
set -a
source .env
set +a
TOKEN="${QASE_TESTOPS_API_TOKEN:-$QASE_API_TOKEN}"

for id in <case-id-1> <case-id-2> <case-id-3>; do
  curl -sS -H "Token: $TOKEN" \
    "https://api.qase.io/v1/case/${QASE_PROJECT_CODE}/$id"
done > /private/tmp/qase-case-details.jsonl

jq -s '[.[].result | {id, title, suite_id, tags: [(.tags // [])[]?.title], params, step_count: ((.steps // []) | length), steps: [(.steps // [])[] | {action, expected_result}]}]' \
  /private/tmp/qase-case-details.jsonl
```

When a future agent needs approval for network access, ask for the bulk scan or targeted search once, then work from `/private/tmp` for local comparison.

## Qase Update Workflow

Use this when the user explicitly approves updating Qase cases.

## Ambiguous Or Bulk Request Guard

Before running any Qase write command, stop and ask one targeted confirmation question when the request is ambiguous or broader than one clearly named case.

Ask for confirmation when any of these are true:

- The user says `push it`, `push this`, `send it`, `apply it`, `update Qase`, or similar wording while the current note contains multiple cases.
- The user names a suite but does not name the exact local draft labels, such as `TC-1`, or exact existing Qase case IDs.
- The user references a file, section, or feature but not the specific cases to create or update.
- The requested change would create, update, move, or delete more than one Qase case.
- The request sounds like a bulk operation, such as `all`, `bulk`, `everything`, `the file`, `these cases`, or `the suite`.

The confirmation must state the exact scope that will be written and wait for an explicit yes before any apply command. Example:

`Confirm scope: create only TC-1 from 03 Test Cases/itemized-partial-apply-to-each-split-test-cases.md in suite 998. Do not create TC-2 through TC-14. Proceed?`

If the user confirms a bulk operation, dry-run every affected case and summarize the local draft label, real Qase case ID if updating, title, suite, tags, parameters, and step count before applying.

1. Confirm scope before writing: suite ID, whether cases are creates or updates, existing Qase case IDs only for updates, and exact field types to update.
2. Read and apply [[05 Tooling/Qase Test Case Writing Rules]] for any test case content changes.
3. Before creating more than one case, explicitly check whether the cases are duplicates that should be one parameterized case. If the behavior and expected result are the same across account, dashboard, Box Office, checkout entry points, platform, view, provider, or permission variants, prefer one case with a clear parameter.
4. Load credentials from the existing vault `.env`; do not ask for or echo tokens when `.env` is present.
5. Read the current case payloads from Qase and save the important before-state in command output or a short note.
6. Prefer the reusable script at `05 Tooling/scripts/create-or-update-qase-case.mjs` for case creation, updates, and verification.
   - For one case, use the single-case command.
   - For more than one approved write, use `--batch-plan` so dry-run, apply, and apply-time verification happen through one script process.
7. Dry run before any write:
   - print each local draft label, such as `TC-1`
   - for creates, confirm no Qase case ID is supplied and Qase will assign the new ID
   - for updates, print the existing Qase case ID
   - print each field that would change
   - print before -> after for short fields like `title`
   - print a count or compact diff for long fields like `steps`
8. Review dry-run output against the confirmed request. If the change is broad, ambiguous, or destructive, pause for confirmation again.
9. Run the apply mode only after the dry run is clean and the confirmed scope still matches the request exactly.
10. Re-read Qase after applying and verify the requested text or field state is correct. When using `--batch-plan --apply`, use the returned `verified` payloads as the apply-time verification unless deeper field inspection is needed.
11. Delete temporary scripts unless they are intentionally useful for reuse.

Prefer `05 Tooling/scripts/create-or-update-qase-case.mjs` over fragile inline shell JSON for Qase writes. The script parses `.env`, constructs JSON payloads with structured objects, avoids shell interpolation for request bodies, dry-runs by default, and verifies cases by ID.

Local draft labels such as `TC-1` are not Qase case IDs. For new cases, do not pass `--update`; Qase assigns the new case ID during apply. Use `--update <case-id>` only when modifying an existing Qase case that already has a real Qase ID.

For copyable examples, see [[05 Tooling/Create Or Update Qase Case Examples]].

Reusable command pattern:

```bash
# Dry run a local TC-labeled case from a vault markdown file
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --suite-id 144 \
  --case-file "03 Test Cases/invoice-breakdown-qase-test-cases.md" \
  --case-number 5 \
  --dry-run

# Create the case after the dry run is reviewed. Do not pass --update for new cases.
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --suite-id 144 \
  --case-file "03 Test Cases/invoice-breakdown-qase-test-cases.md" \
  --case-number 5 \
  --apply

# Verify a created case
node "05 Tooling/scripts/create-or-update-qase-case.mjs" --verify 4817

# Dry run an update to an existing Qase case
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --suite-id 144 \
  --case-file "03 Test Cases/invoice-breakdown-qase-test-cases.md" \
  --case-number 5 \
  --update 4817 \
  --dry-run

# Dry run multiple approved writes from one plan file
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --batch-plan "/private/tmp/qase-batch-plan.json" \
  --dry-run

# Apply and verify multiple approved writes from one plan file
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --batch-plan "/private/tmp/qase-batch-plan.json" \
  --apply
```

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
