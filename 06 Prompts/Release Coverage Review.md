---
title: Release Coverage Review
date: 2026-10-31
tags:
  - qa/workflow
  - qa/release
---

# Release Coverage Review

Use this when asked what coverage a change has, what needs testing before release, or whether existing tests are enough. Produce the coverage table from [[03 Test Cases/Release Decision Template]] in the request's existing canonical note. Owner/sign-off fields and a document checker are not required.

## Run the review

1. **Establish the actual scope.** For a Jira ticket, read description, status, priority and comments through Rovo. For a branch/PR, confirm branch/base and inspect the exact diff first. Describe changed user behavior, affected clients and final outcomes. Do not inspect an unrelated current branch as a substitute for a missing target.
2. **Trace backend rules and frontend callers.** Identify clean success, affected rejection/recovery, permissions, saved values and downstream money/ticket/inventory results. Include unchanged clients using a changed shared rule. Keep entry points separate from outcomes.
3. **Collect candidate evidence.** Use the command below to find relevant source/test files, existing browser notes, optional Qase cases and existing Playwright execution results. Use more than one relevant term when needed. A search match is a lead, not a reviewed case or full coverage.
4. **Read the actual checks.** Follow tests into shared functions/page objects. Read full Qase setup, parameters, actions and expected results. Read exact browser steps and their real evidence. Follow [[05 Tooling/qasectl]] for scope completeness; exact-ID reviews do not require a project bulk read. For gap analysis, use one complete project read and reuse it locally.
5. **Classify each behavior.** Record Full/Partial/None/Unknown for overall coverage and each method, with actual IDs/links and an exact gap. Full means suitable checks cover the declared outcome, not that every tool has a separate case. Unknown means unread/inaccessible evidence; None requires a sufficient search and review. Record current execution separately as Passed/Failed/Blocked/Not run/Not applicable.
6. **Choose the remaining release checks.** Reuse results only when build/configuration and exact assertions apply. Treat retry-only passes, skipped/quarantined tests, missing native/device checks and incomplete downstream proof explicitly. Name the smallest additional manual/automated/browser check that closes each important gap.
7. **Follow the requested mode through.** A review ends with the coverage table, focused missing checks and a supported recommendation. An implementation request follows [[06 Prompts/Convert Test Cases to Playwright]] through scoped code and verification; do not end with another ranking pass. Qase writes still require their exact preview/confirmation workflow.

## Collect evidence with one command

Run from the vault. The collector searches neighboring source repositories and active browser/test notes. It does not execute tests, write Qase, inspect browser sessions or assign coverage verdicts.

```bash
node "05 Tooling/scripts/collect-release-coverage.mjs" --query "settlement" --query "transaction" > /private/tmp/showpass-release-coverage.json
```

To include a complete read-only Qase case snapshot, first check the installed CLI as required by [[05 Tooling/qasectl#CLI And API Read Path]]. If case reads are unavailable, the collector implements the documented API pagination. It loads only Qase token/project settings from the existing local environment or vault `.env` and never prints credentials. A failed/inconsistent read does not produce a complete snapshot.

```bash
node "05 Tooling/scripts/collect-release-coverage.mjs" --query "settlement" --query "transaction" --read-qase > /private/tmp/showpass-release-coverage.json
```

Reuse that complete snapshot for another local comparison, without another API read:

```bash
node "05 Tooling/scripts/collect-release-coverage.mjs" --query "Affirm" --qase-snapshot /private/tmp/showpass-release-coverage.json > /private/tmp/showpass-affirm-coverage.json
```

Include actual Playwright JSON execution reports with repeated `--results /absolute/path/to/release-evidence.json` arguments. Standard browser runs now write `test-results/release-evidence.json`; Electron runs write `test-results/desktop/release-evidence.json`. Existing CI suite uploads retain `test-results`. No CI job was launched by adding this workflow.

The result input must contain recorded attempts; a discovery-only list cannot prove execution. The collector retains each attempt, project, expected status, result metadata and whether the first attempt passed. A pass after retry remains distinguishable. Application build metadata is separately supplied through `APPLICATION_BUILD_REVISION`; absent build identity stays unknown and cannot be inferred from the test repository commit.

Search terms are literal, case-insensitive alternatives. Each source search lists at most 100 candidate files and explicitly reports truncation. Full case records remain available in `qaseSnapshot` for a live read; `qase.matchingCases` are candidates for full review. An imported plain array can supply candidates but cannot prove snapshot date/completeness. The collector does not automatically map a text match to the right client, Qase case or assertion; the reviewing agent does that in step 4.

Save only the useful coverage/result references in the canonical note. Delete exact temporary outputs with `rm` when they are no longer needed. Do not retain credentials, ticket barcodes or bulky raw exports in Git.

## Finish with a concrete missing-check statement

For example: “The saved Qase case checks the displayed price. The existing Playwright journey completes checkout, but the reviewed transaction helper does not compare the saved amount. That behavior is partially covered; add the saved-amount assertion and execute it against the intended build.” This is an illustrative statement; verify the current code and case before using it as a finding.
