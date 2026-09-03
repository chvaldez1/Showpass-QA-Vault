---
title: Qase Test Run Workflow
tags:
  - tooling
  - qase
  - test-runs
status: active
---

# Qase Test Run Workflow

Use this workflow to create one Qase manual test run from an exact list of existing Qase case IDs.

Use [[05 Tooling/qasectl]] for the general Qase operating rules. Use [[05 Tooling/Qase Test Case Writing Rules]] only when case content is also being created or changed.

## Why This Workflow Exists

The installed `qasectl testops run create` command can create a run but cannot select exact case IDs. Do not use it for a scoped manual run because it can include the wrong cases.

Use `05 Tooling/scripts/create-qase-test-run.mjs`. It always sends `include_all_cases: false`, defaults to a local dry-run, and reads the created run back before reporting success.

## Required Confirmation

Before any apply command, obtain explicit approval for:

1. The run title.
2. The exact Qase case IDs.
3. The number of runs to create.
4. The environment, milestone, test plan, and tags, or an explicit decision to leave each unset.

State that creating a run changes Qase data but does not change the selected test cases.

> [!warning]
> A broad request such as “create a run from these tests” is not enough when the active note contains extra cases or the target case IDs are unclear. Resolve the exact IDs before preparing the apply command.

## Plan File

Create a temporary JSON plan under `/private/tmp`:

```json
{
  "title": "Transaction Selection Totals Permission",
  "description": "Manual validation of transaction totals permissions.",
  "caseIds": [5095, 5096, 5097],
  "environmentSlug": "optional-environment-slug",
  "milestoneId": 123,
  "planId": 456,
  "tags": ["transactions"]
}
```

Only `title` and `caseIds` are required.

- Use real Qase IDs without the `SPT-` prefix.
- List each case once. The script rejects duplicate IDs.
- Omit `environmentSlug`, `environmentId`, `milestoneId`, `planId`, or `tags` unless the requested value is known.
- Do not guess an environment from the local workspace, Jira card, branch, or case suite.

## Dry Run

```bash
node "05 Tooling/scripts/create-qase-test-run.mjs" \
  --plan "/private/tmp/qase-test-run-plan.json" \
  --dry-run
```

The dry-run does not call Qase. Review and report:

- run title and description
- `include_all_cases: false`
- exact case IDs and unique case count
- environment, milestone, plan, and tags
- confirmation that Qase will assign the run ID

If anything differs from the approved scope, update the plan and repeat the dry-run.

## Apply And Automatic Verification

Run only after the exact dry-run scope is approved:

```bash
node "05 Tooling/scripts/create-qase-test-run.mjs" \
  --plan "/private/tmp/qase-test-run-plan.json" \
  --apply
```

Apply mode performs one create request, reads the new run back with its cases, and fails verification unless the unique Qase case IDs exactly match the plan.

Report:

- run ID, title, and Qase URL
- unique case count and IDs
- expanded execution count
- execution count per case
- environment assignment
- whether execution has started

## Parameterized Cases

Qase expands a parameterized case into multiple run executions. This is expected.

For example, a case with two page values and three employee-profile values produces six executions. Always distinguish:

- **Unique cases:** the Qase case IDs selected in the plan.
- **Expanded executions:** the parameter combinations shown in the run.

An execution count larger than the unique case count is not evidence that unrelated cases were added.

## Verify An Existing Run

Read a run without changing Qase:

```bash
node "05 Tooling/scripts/create-qase-test-run.mjs" --verify 1342
```

Verify it against the original plan:

```bash
node "05 Tooling/scripts/create-qase-test-run.mjs" \
  --verify 1342 \
  --plan "/private/tmp/qase-test-run-plan.json"
```

## Failure And Retry Safety

- If dry-run fails, correct the plan. No Qase data changed.
- If apply returns a run ID but verification fails, do not create another run. Read that run by ID and resolve the mismatch.
- If the network fails after apply starts and no run ID is returned, check Qase for a run with the exact title before retrying. A blind retry can create a duplicate run.
- Do not delete or complete a run unless the user explicitly requests that separate action and confirms the run ID.

## Local Record

After successful verification:

1. Add the run ID and Qase URL to the active test-case note.
2. Record the unique case count and expanded execution count.
3. State whether an environment was assigned.
4. State that no case has been executed unless results were actually submitted.
5. Remove the temporary plan when it is no longer needed.

