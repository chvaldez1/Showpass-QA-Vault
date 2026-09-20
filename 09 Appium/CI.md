---
title: CI
tags:
  - automation/appium
  - ci/github-actions
---

# CI

Use **GitHub Actions**, with the same `showpass-appium` project and tests from [[09 Appium/Test Project]]. Start after both local Safari targets pass. The workflow below runs Safari first and also supports the later sample-app and Showpass-app targets without another copy of the test configuration.

Safari and iOS jobs run on macOS. Android jobs run on Linux with an emulator. Linux/Windows browser emulation does not supply native Safari.

## 1. Put the working test project in GitHub

Create or use a team-owned repository for `showpass-appium`, outside this vault. Commit:

- `package.json`, `package-lock.json`, `.node-version`, and `.gitignore` from [[09 Appium/Common Setup]].
- The shared configuration and `test/` files from [[09 Appium/Test Project]].
- The script and workflow below.
- Sample app source only when you have completed [[09 Appium/WebView]]. Include the Android Gradle wrapper and the iOS shared scheme.

In the repository's **Settings → Actions → General**, ensure GitHub-hosted runners and the actions used below are allowed. The runner must be able to reach beta; if beta requires a company VPN or restricted network, configure that access or use a suitable self-hosted runner before expecting a page-load pass.

The baseline below explicitly selects **macOS 26, Xcode 26.6, iOS 26.5**, and **Android API 36**. These were present in the reviewed runner documentation. macOS images and Safari patch versions still change over time; record the actual versions in every run. If GitHub removes the selected Xcode/runtime, update the baseline deliberately rather than silently testing a different iOS version.

Node uses the exact **Node 24 LTS** patch recorded by Common Setup in `.node-version`; Android jobs select **Temurin 17 LTS**. The reasons for these choices live in [[09 Appium/Common Setup#Version policy|the shared version policy]].

## 2. Create `scripts/ci-ios-simulator.mjs`

This script creates a fresh simulator in the CI job. It refuses to erase/delete a local developer's simulator.

```javascript
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';

if (process.env.GITHUB_ACTIONS !== 'true' || !process.env.GITHUB_ENV) {
  throw new Error('This simulator creation script is for GitHub Actions only.');
}
const simctl = (...args) => execFileSync('xcrun', ['simctl', ...args], {
  encoding: 'utf8', timeout: 300000,
});
const runtimes = JSON.parse(simctl('list', 'runtimes', '--json')).runtimes;
const runtime = runtimes.find((r) =>
  r.isAvailable && r.identifier.includes('.iOS-') &&
  r.version === process.env.IOS_VERSION,
);
if (!runtime) {
  throw new Error(`Required iOS ${process.env.IOS_VERSION} is unavailable. Available: ${
    runtimes.filter((r) => r.isAvailable).map((r) => `${r.name} (${r.version})`).join(', ')
  }`);
}
const types = JSON.parse(simctl('list', 'devicetypes', '--json')).devicetypes;
const device = types.find((d) => d.name === 'iPhone 17');
if (!device) throw new Error('The selected Xcode does not contain iPhone 17.');
const udid = simctl('create', 'Showpass QA CI', device.identifier, runtime.identifier).trim();
appendFileSync(process.env.GITHUB_ENV, `IOS_UDID=${udid}\n`);
console.log(`Created ${device.name}, ${runtime.name}, ${udid}`);
execFileSync('open', ['-a', 'Simulator']);
simctl('boot', udid);
simctl('bootstatus', udid, '-b');
```

`GITHUB_ENV` passes the newly created UDID to subsequent steps. Your Mac's simulator UUID is never hard-coded in CI.

## 3. Create `.github/workflows/appium.yml`

The initial **safari** choice runs desktop and mobile Safari as separate jobs. Other choices run one selected target. `workflow_dispatch` means a person starts the run from GitHub's Actions page; this keeps setup runs separate from release gates while you establish a baseline.

```yaml
name: Appium beta checks

on:
  workflow_dispatch:
    inputs:
      target:
        description: Target that already passed locally
        type: choice
        default: safari
        options:
          - safari
          - desktop-safari
          - ios-safari
          - ios-webview
          - android-webview
          - ios-app
          - android-app
      artifact_run_id:
        description: For Showpass app targets only - frontend build workflow run ID
        type: string
        required: false
      artifact_name:
        description: For Showpass app targets only - exact frontend artifact name
        type: string
        required: false

permissions:
  contents: read

concurrency:
  group: appium-${{ github.ref }}-${{ inputs.target }}
  cancel-in-progress: true

jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        target: ${{ fromJSON(inputs.target == 'safari' && '["desktop-safari","ios-safari"]' || format('["{0}"]', inputs.target)) }}
    runs-on: ${{ startsWith(matrix.target, 'android-') && 'ubuntu-24.04' || 'macos-26' }}
    timeout-minutes: 45
    env:
      TARGET: ${{ matrix.target }}
      IOS_VERSION: '26.5'
    steps:
      - uses: actions/checkout@v7
        with:
          persist-credentials: false
      - uses: actions/setup-node@v6
        with:
          node-version-file: .node-version
          cache: npm
      - name: Install the locked test dependencies
        run: npm ci
      - name: Record dependency versions
        run: |
          mkdir -p artifacts
          npm ls --depth=0 > artifacts/dependencies.txt
          node --version > artifacts/node.txt
      - name: Select and record Apple tools
        if: runner.os == 'macOS'
        run: |
          sudo xcode-select --switch /Applications/Xcode_26.6.app/Contents/Developer
          xcodebuild -version > artifacts/xcode.txt
          sw_vers > artifacts/macos.txt
          /usr/bin/safaridriver --version > artifacts/safari.txt
          xcrun simctl list runtimes > artifacts/ios-runtimes.txt
      - name: Enable desktop Safari
        if: matrix.target == 'desktop-safari'
        run: sudo /usr/bin/safaridriver --enable
      - name: Start the iPhone simulator
        if: startsWith(matrix.target, 'ios-')
        run: node scripts/ci-ios-simulator.mjs
      - uses: actions/setup-java@v4
        if: startsWith(matrix.target, 'android-')
        with:
          distribution: temurin
          java-version: '17'
      - uses: android-actions/setup-android@v3
        if: startsWith(matrix.target, 'android-')
      - name: Install Android build SDK
        if: startsWith(matrix.target, 'android-')
        run: sdkmanager 'platforms;android-36' 'build-tools;36.0.0' 'platform-tools'
      - name: Enable Android hardware acceleration
        if: startsWith(matrix.target, 'android-')
        run: |
          echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules
          sudo udevadm control --reload-rules
          sudo udevadm trigger --name-match=kvm
      - name: Build the Android WebView sample
        if: matrix.target == 'android-webview'
        working-directory: android-webview
        run: |
          chmod +x gradlew
          ./gradlew assembleDebug --no-daemon
          echo "APP_PATH=$GITHUB_WORKSPACE/android-webview/app/build/outputs/apk/debug/app-debug.apk" >> "$GITHUB_ENV"
      - name: Build the iOS WebView sample
        if: matrix.target == 'ios-webview'
        run: |
          xcodebuild -project ios-webview/ShowpassWebView.xcodeproj -scheme ShowpassWebView -configuration Debug -sdk iphonesimulator -destination "id=$IOS_UDID" -derivedDataPath ios-webview/build CODE_SIGNING_ALLOWED=NO build
          echo "APP_PATH=$GITHUB_WORKSPACE/ios-webview/build/Build/Products/Debug-iphonesimulator/ShowpassWebView.app" >> "$GITHUB_ENV"
      - name: Require an identified Showpass build
        if: endsWith(matrix.target, '-app')
        env:
          BUILD_RUN_ID: ${{ inputs.artifact_run_id }}
          BUILD_ARTIFACT: ${{ inputs.artifact_name }}
          READ_TOKEN: ${{ secrets.MOBILE_ARTIFACT_READ_TOKEN }}
        run: |
          test -n "$BUILD_RUN_ID"
          test -n "$BUILD_ARTIFACT"
          test -n "$READ_TOKEN"
          printf 'Source run: %s\nArtifact: %s\n' "$BUILD_RUN_ID" "$BUILD_ARTIFACT" > artifacts/build-input.txt
      - uses: actions/download-artifact@v8
        if: endsWith(matrix.target, '-app')
        with:
          repository: showpass/showpass-frontend
          run-id: ${{ inputs.artifact_run_id }}
          name: ${{ inputs.artifact_name }}
          github-token: ${{ secrets.MOBILE_ARTIFACT_READ_TOKEN }}
          path: apps
      - name: Select the direct-universal Android beta APK
        if: matrix.target == 'android-app'
        run: |
          python3 - <<'PY'
          import os
          from pathlib import Path
          candidates = list(Path('apps').rglob('Showpass-android-direct-universal-*.apk'))
          if len(candidates) != 1:
              raise SystemExit(f'Expected one direct-universal beta APK, found {len(candidates)}')
          with open(os.environ['GITHUB_ENV'], 'a') as output:
              output.write(f'APP_PATH={candidates[0].resolve()}\n')
          PY
      - name: Unpack and check the iOS simulator build
        if: matrix.target == 'ios-app'
        run: |
          tar -xzf apps/Showpass-Beta-Simulator.tar.gz -C apps
          python3 - <<'PY'
          import os, plistlib
          from pathlib import Path
          app = Path('apps/Showpass-Beta-Simulator.app').resolve()
          with open(app / 'Info.plist', 'rb') as source:
              info = plistlib.load(source)
          assert info['CFBundleIdentifier'] == 'com.showpass.swift.beta', 'Wrong app ID'
          assert 'iPhoneSimulator' in info['CFBundleSupportedPlatforms'], 'Not a simulator build'
          with open(os.environ['GITHUB_ENV'], 'a') as output:
              output.write(f'APP_PATH={app}\n')
          PY
      - name: Run the macOS or iOS test
        if: runner.os == 'macOS'
        run: npm test
      - name: Run the Android test
        if: startsWith(matrix.target, 'android-')
        uses: reactivecircus/android-emulator-runner@v2
        with:
          api-level: 36
          target: google_apis
          arch: x86_64
          profile: pixel_7
          disable-animations: true
          emulator-options: -no-window -gpu swiftshader_indirect -noaudio -no-boot-anim -no-snapshot
          script: |
            adb -s emulator-5554 shell dumpsys webviewupdate > artifacts/android-webview-version.txt
            ANDROID_SERIAL=emulator-5554 npm test
      - name: Save results even when a test fails
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: appium-${{ matrix.target }}-${{ github.run_id }}-${{ github.run_attempt }}
          path: artifacts/
          if-no-files-found: warn
          retention-days: 7
```

The Android emulator action uses port 5554 by default on a fresh runner, so the serial in that CI-only step is intentional. Local device IDs still come from the device inventory. The Appium service owns server startup in both environments; no background server shell command is needed here.

## 4. Run Safari first

1. Push the completed project and workflow to its GitHub repository's default branch so the manual workflow appears.
2. Open **Actions → Appium beta checks → Run workflow**.
3. Select **safari**. Leave artifact fields empty; Safari does not need an app build or an artifact-access token.
4. Open both jobs. Expected: desktop Safari and iPhone Safari pass independently.
5. Open the run's **Artifacts** section and download the two `appium-…` results. Check the screenshot, JUnit result, and recorded versions for each target.

A green job proves only the corresponding starter test passed. A failed session can have logs without a screenshot. Fix the first setup/test error shown in the job; do not hide failures with unconditional retries or `continue-on-error`.

Once repeatable, add a trusted beta-deployment trigger or a scheduled run if useful. Tests pointed at deployed beta do not automatically test a PR's unpublished code. Add per-PR environments before treating these results as proof of a specific PR.

## Add WebView and Showpass app jobs

The target picker already supports these stages; no second test implementation is needed.

| Target | What must already exist | Artifact fields |
| --- | --- | --- |
| `ios-webview` | Committed, locally working iOS sample project and shared scheme | Empty |
| `android-webview` | Committed, locally working Android sample and Gradle wrapper | Empty |
| `android-app` | Successful frontend beta release-set artifact containing direct-universal APK | Exact frontend run ID and artifact name from that run |
| `ios-app` | Frontend build artifact containing `Showpass-Beta-Simulator.tar.gz` | Exact simulator-build run ID and artifact name |

### Access to existing frontend builds

For Showpass app targets, create a repository Actions secret called **MOBILE_ARTIFACT_READ_TOKEN** using a team-approved token with **Actions: read** access to `showpass/showpass-frontend`. A test repository's default `GITHUB_TOKEN` does not automatically grant access to artifacts in another private repository. Keep this secret out of files and do not expose it to untrusted fork workflows.

Copy the numeric run ID from the frontend run's URL (`…/actions/runs/<run ID>`) and copy the artifact name from that run's Artifacts section. For Android, [[09 Appium/Showpass Mobile App#Android beta app|the mobile app note]] identifies the current release-set artifact. Use a completed successful beta run and retain its source/version/checksum evidence. Expired artifacts must be rebuilt or recovered through the mobile build process.

### Supply an iOS simulator artifact

The reviewed frontend iOS release workflow supplies device releases; do not assume it already publishes the simulator artifact this job needs. A mobile build job must first run the simulator build documented in [[09 Appium/Showpass Mobile App#iOS beta app|Showpass Mobile App]] on a compatible ARM Mac, then package it while preserving executable permissions and symlinks:

```bash
tar -czf Showpass-Beta-Simulator.tar.gz -C packages/mobile/fastlane/releases/ios/beta Showpass-Beta-Simulator.app
```

At the end of **that successful simulator build job**, upload the archive:

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: showpass-beta-ios-simulator
    path: Showpass-Beta-Simulator.tar.gz
    if-no-files-found: error
    retention-days: 7
```

Upload the archive file, not a bare `.app` directory; generic artifact upload/download does not preserve executable permissions. Keep the simulator build's source commit and version with its run. The testing workflow downloads this named archive and validates its simulator platform and beta bundle ID before launching it.

Until that build job and its private build inputs exist, **`ios-app` CI is blocked on the simulator artifact**. Desktop Safari, iPhone Safari, and the two sample WebView targets do not depend on it. Do not substitute a TestFlight IPA or a developer's local absolute path.

## CI troubleshooting

| Failure | What to inspect |
| --- | --- |
| Selected Xcode/runtime is absent | Runner image inventory and the Apple-tool log; update the pinned baseline deliberately. |
| Safari automation denied | Confirm the enable step ran on the macOS job and inspect Appium's Safari-driver log. |
| Android emulator will not boot | Hardware acceleration step, emulator action log, and runner type; use the full Linux VM shown above. |
| WebView driver download fails | WebView version artifact and Appium log; follow [[09 Appium/WebView#Troubleshooting|WebView troubleshooting]]. |
| App binary not found / access denied | Exact source run/artifact name, retention, token access, and successful source build. |
| Android install incompatible with CPU | Ensure the direct-universal x86_64-capable APK was selected. |
| iOS install rejects the app | Simulator platform, ARM64 simulator architecture, minimum iOS version, and preserved executable permissions. |
| App opens a Metro error screen | Use a self-contained beta build; your laptop's Metro server is not part of CI. |
| Browser opens but beta is blocked | Runner network access, redirects, and any access gate; preserve this as an environment failure. |

These are workflow examples reviewed for structure, not evidence of a successful CI run. See [[09 Appium/Appium#What the first pass proves|execution status]] for the remaining proof targets.

Sources: [GitHub runner platforms](https://docs.github.com/en/actions/reference/runners/github-hosted-runners), [macOS 26 image inventory](https://github.com/actions/runner-images/blob/main/images/macos/macos-26-arm64-Readme.md), [Android Emulator Runner](https://github.com/ReactiveCircus/android-emulator-runner), [cross-repository artifact downloads](https://github.com/actions/download-artifact), [artifact permission preservation](https://github.com/actions/upload-artifact#permission-loss).
