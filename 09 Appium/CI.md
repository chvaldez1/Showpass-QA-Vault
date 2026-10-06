---
title: CI
tags:
  - automation/appium
  - ci/github-actions
---

# CI

Use **GitHub Actions** for the push/PR quality check. Start the manual Safari jobs after the two local Safari checks pass. The actual workflow is `/Users/christianvaldez/Documents/personal/appium-pof/.github/workflows/appium.yml`; the same tests run locally and in CI. Keep workflow edits there. This note covers how to use and interpret it, without maintaining another copy of the YAML.

## Safari workflow now

The workflow runs a **quality job on pushes and PRs**: locked install, TypeScript 7-aware lint, formatting check, typecheck, and purchase-helper unit tests (`npm run check`). A manual dispatch (`workflow_dispatch`) runs that quality job before two separate macOS 26 Safari jobs: `desktop-safari` and `ios-safari`. The desktop job enables Safari automation. The iPhone job creates a fresh simulator from an available iOS runtime on that runner; it does not use your local `IOS_UDID`. Each Safari job records its actual Node, macOS, Xcode, Safari, and iOS-runtime versions. It uploads whatever logs, screenshots, and reports exist even if a test fails.

1. Push the `appium-pof` code and workflow to its GitHub repository. The workflow is local only until pushed.
2. A push or PR should run **Actions → Appium QA → Code quality and unit tests**. Open its checks before requesting review.
3. Open **Actions → Appium QA → Run workflow** for the Safari learning run.
4. Open both Safari jobs. Expected: one browser-loading test passes in desktop Safari and one in iPhone Safari.
5. Download each job's `appium-…` artifact. Check the screenshot, JUnit result, Appium log, and recorded versions. A session-creation failure may produce logs without a screenshot.

These jobs have **not been executed in GitHub Actions** during this local code setup. A green Safari run would prove the starter page-load check in that environment; it would not prove login, checkout, payments, or that an unpublished pull request is deployed on beta.

GitHub-hosted macOS must be able to reach beta. If beta is behind a VPN or restricted network, use approved runner access before expecting a passing page-load result. A network/access failure is an environment blocker, not a product defect. Do not hide failures with unconditional retries.

## Add WebView and Showpass app jobs later

The current workflow intentionally exposes only the two Safari checks because the sample WebView app source and the needed Showpass mobile app artifacts are not yet present. After a target works locally, add a job using the **same** `wdio.conf.ts` and `npm test`; do not copy the test implementation into the workflow.

The first purchase extension is specified in [[09 Appium/iPhone Ticket Purchases]]. The public iPhone WebView purchase and API read-back passed locally, including a later no-submit run with the refactored steps. The existing workflow does not contain an app purchase job yet. Before adding one, make the known beta simulator `.app` available to GitHub Actions as a versioned artifact, prove beta network/test-mode access on the runner, and keep the unique-email, single-submit, read-back checks. No void is required. The native iPhone Box Office path still needs local UI proof before a CI job is written for it.

| Later target | CI prerequisite |
| --- | --- |
| iOS WebView | Commit and build the sample iOS app from [[09 Appium/WebView]]; use a simulator `.app`. |
| Android WebView | Commit and build the sample Android app; run an Android emulator. |
| Android Showpass app | Download a successful direct-universal beta APK from the frontend build workflow. |
| iOS Showpass app | Build and upload an iOS **simulator** `.app` archive from the frontend; a device IPA or TestFlight build will not install in the simulator. |

For a private frontend repository, cross-repository artifact download requires an approved token with Actions read access. Record the exact source run ID, artifact name, source commit, and build version. Package an iOS simulator `.app` as a tar archive before uploading so executable permissions and symlinks survive. See [[09 Appium/Showpass Mobile App]] for current app-source and build details. App targets are blocked until their compatible artifacts exist; this does not block the Safari workflow.

## CI troubleshooting

| Failure | First check |
| --- | --- |
| No workflow in Actions | Confirm `.github/workflows/appium.yml` was pushed to the repository's default branch. |
| Xcode or iOS runtime missing | Open the recorded version artifacts and the [macOS runner inventory](https://github.com/actions/runner-images). |
| Safari automation denied | Check the enable step and Safari driver log. |
| Simulator session fails | Check the simulator creation step and XCUITest/Appium logs. |
| Browser opens but beta is blocked | Check runner network access and the exact beta URL. |

Sources: [GitHub-hosted runners](https://docs.github.com/en/actions/reference/runners/github-hosted-runners), [runner image inventory](https://github.com/actions/runner-images), [artifact uploads](https://github.com/actions/upload-artifact).
