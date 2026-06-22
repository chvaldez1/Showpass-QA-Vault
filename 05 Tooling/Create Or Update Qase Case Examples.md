# Create Or Update Qase Case Examples

Use this with [[05 Tooling/qasectl]] after a Qase-ready test case has been reviewed and approved.

The script reads a local `TC-*` or `### Test Case N:` case from a markdown file, builds a structured Qase payload, and uses the vault `.env` for credentials. It dry-runs by default and never prints token values.

Local labels such as `TC-1` are draft labels only. They are not Qase case IDs. For a new case, omit `--update`; Qase creates and returns the real case ID. Use `--update <case-id>` only for an existing Qase case.

## Create A New Case

Dry run first:

```bash
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --suite-id 144 \
  --case-file "03 Test Cases/invoice-breakdown-qase-test-cases.md" \
  --case-number 5 \
  --dry-run
```

Create after the dry run is reviewed. Do not pass `--update` for a new case:

```bash
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --suite-id 144 \
  --case-file "03 Test Cases/invoice-breakdown-qase-test-cases.md" \
  --case-number 5 \
  --apply
```

Verify the created case:

```bash
node "05 Tooling/scripts/create-or-update-qase-case.mjs" --verify 4817
```

## Update An Existing Case

Dry run the update first. This reads the current Qase case and prints a before/after summary.

```bash
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --suite-id 144 \
  --case-file "03 Test Cases/invoice-breakdown-qase-test-cases.md" \
  --case-number 5 \
  --update 4817 \
  --dry-run
```

Apply the update after the dry run is reviewed:

```bash
node "05 Tooling/scripts/create-or-update-qase-case.mjs" \
  --suite-id 144 \
  --case-file "03 Test Cases/invoice-breakdown-qase-test-cases.md" \
  --case-number 5 \
  --update 4817 \
  --apply
```

## Check A Suite

```bash
node "05 Tooling/scripts/create-or-update-qase-case.mjs" --suite-info 144
```

## Notes

- `--case-number` maps to a local heading like `TC-5:` or `### Test Case 5:` in the markdown file.
- Local `TC-*` labels are not Qase IDs; Qase assigns the ID when a new case is created.
- `--update` must only be used with an existing Qase case ID.
- `--suite-id` is required for both create and update; changing it moves the case to that suite.
- `--apply` is required for writes.
- The recommended approval prefix is `node "05 Tooling/scripts/create-or-update-qase-case.mjs"`, so future runs through this script can avoid repeated approval prompts.
