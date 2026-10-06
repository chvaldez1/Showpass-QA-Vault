---
title: Test Project
tags:
  - automation/appium
---

# Test Project

The **runnable code** is in `/Users/christianvaldez/Documents/personal/appium-pof`. Open its `README.md` first. The project is separate from this vault so tests, dependencies, and reports do not get mixed into QA notes. This page is a map; keep code changes in that repository rather than copying snippets into the vault.

## Where the code is

| File | Purpose |
| --- | --- |
| `test/specs/safari.smoke.ts` | Opens Showpass beta and checks a recognizable page loaded in desktop or iPhone Safari. |
| `test/shared/helpers/beta-page.ts`, `test/shared/helpers/context-id.ts` | Shared page checks and Appium WebView context IDs. |
| `test/settings.ts` | Beta URL, selected target, app ID defaults, and named waits. |
| `wdio.conf.ts` | Selects the browser/device/app, starts Appium, and writes JUnit results. Credential/payment runs suppress detailed logs and automatic screenshots. |
| `test/specs/app.smoke.ts` | Checks that an identified mobile app build launches; passed with the local beta iPhone simulator app. |
| `test/specs/ios/explore.discovery.ts` | Opens Comic Con through native search, selects one Adult ticket, and checks the public checkout screen without paying. |
| `test/specs/ios/public.purchase.ts` | One public purchase test: unique guest, one submit, saved-order and ticket verification. `DRY_RUN=1` stops before submit. |
| `test/specs/ios/box-office.discovery.ts` | No-purchase Employee Login preflight for the native iPhone Box Office; it reproduced an app exit on simulator build 3.6.7 (135). |
| `test/specs/ios/organizer.navigation.ts` | Eight separately reported iPhone Organizer dashboard tile and landing-screen checks; see [[09 Appium/Organizer Dashboard Navigation]]. |
| `test/flows/ios/organizer/`, `test/screens/ios/organizer/` | Shared Organizer sign-in/Venue selection flow and iPhone dashboard controls for that spec. |
| `test/flows/ios/buyer/public-purchase.ts` | iPhone native card entry and handoff to shared WebView payment steps. |
| `test/screens/ios/buyer/` | iPhone page objects for Explore search, Event details, ticket picker, Account, navigation, and guest checkout. Discovery and purchase reuse their actions. |
| `test/specs/webview.smoke.ts` | Later-stage starter check for an embedded beta page in a sample app. |
| `test/shared/data/` | Fixed Comic Con Event/rate-card and approved card/address inputs, separate from each run's Customer. |
| `test/shared/purchase/` | Compose the purchase expectation, create a unique guest email, and check the saved order and issued ticket from any platform flow. |
| `test/shared/webview/buyer/` | Event and checkout DOM steps after switching into the embedded WebView; reusable by a future Android flow if its WebView exposes the same page. |
| `.github/workflows/appium.yml` | Push/PR quality check and manual Safari jobs in GitHub Actions. |
| `scripts/ci-ios-simulator.ts` | Creates a fresh iPhone simulator inside GitHub Actions only. |
| `scripts/run-ios-app-versions.ts` | Locally launches one beta app build on iOS 27, 26, and 18 simulators, reusing matching installs and recording separate results. |
| `config/app-build.json`, `scripts/ios-app-build.ts` | Expected iOS beta bundle/version/build and preflight check for `.app` bundles or installed iPhone apps. `npm run app:check` runs that check directly. |
| `scripts/run-with-playwright-fixtures.ts` | Bridge for existing Playwright account fixtures. Organizer navigation can also use protected environment credentials without a local Playwright clone. Its `preflight` mode makes a read-only beta invoice API check before a purchase run. |
| `scripts/account-source.ts` | Resolves protected environment account and guest values first, with lazy local Playwright fixture fallback; unit tests cover the hosted path without a Playwright clone. |
| `package.json`, `package-lock.json`, `tsconfig.json`, `.node-version` | Exact dependencies, run/check commands, TypeScript checks, and Node baseline. |
| `.oxlintrc.json`, `.prettierrc.json`, `.prettierignore` | TypeScript 7-aware lint rules and consistent formatting. |
| `AGENTS.md` | Folder boundaries and instructions to stop blocked work promptly, record the blocker, and continue the next independent queued task. |

`node_modules/` appears after `npm ci`; `artifacts/<target>/` appears after a test run. Both are generated and ignored by Git. Appium is the command service, its Safari/XCUITest/UiAutomator2 drivers talk to the platform, and WebdriverIO runs the TypeScript tests through `tsx`. Run `npm run check` before a device run or PR; it covers lint, formatting, TypeScript, and purchase-helper unit tests.

For repeated local app runs, the project README explains `REUSE_INSTALLED_APP=1`, which reuses the simulator's installed beta app. Appium starts and stops with each test run; each test ends its own session. A preinstalled-app public dry run and an external-server app-launch smoke passed locally.

Use TypeScript for fixed fixtures, the composed purchase scenario, and every platform test. Only run-specific data, such as the unique guest email, needs a small factory function. Native screens in `test/screens/ios/` and shared WebViews in `test/shared/webview/` use page objects with lazy selectors and screen actions. `test/flows/ios/` joins those actions and switches contexts; specs select data and verify outcomes. Android will get matching native page objects and flows when implemented. Both platform flows can pass their scenario into `test/shared/purchase/` for the same order proof. Safari is separate from the app's embedded WebView. The earlier JavaScript starter files have been replaced by `.ts` files; no compile output needs to be committed. On October 3, 2026, the shared-folder structure passed the local quality check, a no-submit guest dry run, and one guest purchase with saved-order and ticket verification on iOS 18.6.

The October 4 page-object refactor and version guard passed lint, formatting, TypeScript, and fourteen unit tests. The refactored purchase and dashboard journeys have not been rerun. The version guard rejected a stale 3.6.7 (135) simulator install against expected 3.7.2 (180); the runner now also verifies the installed version after Appium starts. A local-source 3.7.2 (180) simulator build from frontend commit `c84fbb7ad2` compiled and passed `app:check`, then exited after **Account → Login** on iOS 26.3. Its crash report records `SIGABRT` in `swift_task_dealloc`; see [[09 Appium/iPhone Ticket Purchases]] for execution evidence. The pulled source has tracked 3.6.7 (135) version fields that were adjusted only in the isolated build worktree. This simulator candidate does not establish the actual TestFlight binary's behavior; the physical iPhone remains unavailable to Xcode.

For the Showpass iPhone purchase, select `ios-app`: the test switches between `NATIVE_APP` and an embedded `WEBVIEW_…` context inside that one app session. The separate `ios-webview` and `android-webview` targets are sample-app setup checks, not required for the Showpass purchase.

## Develop a test without guessing

1. **Choose the behavior and build.** Read backend code for saved state and rules, then React Native code for the visible route and controls. Run the intended build manually on one simulator. Record its source commit, environment, bundle ID, version, and build; `npm run app:check` verifies the installed iPhone app. A debug app and a TestFlight app are separate evidence.
2. **Observe one screen at a time.** Use [[09 Appium/Showpass Mobile App#Inspect controls and WebViews|Appium Inspector]] to navigate the running app, capture its screenshot and accessibility tree, and test a candidate selector. In `NATIVE_APP`, prefer a verified `testID`/accessibility ID; if absent, use a visible label or an iOS predicate. Enter `WEBVIEW_…` only for embedded web content, then use DOM selectors. Do not assume a `testID` in a `*.test.tsx` mock exists in the installed app.
3. **Put each action in one place.** Add observed native controls and actions to `test/screens/ios/`; put shared WebView actions in `test/shared/webview/`. Compose those actions in `test/flows/ios/`, and let `test/specs/` state the scenario and assertions. Keep run-specific purchase data in `test/shared/purchase/`.
4. **Prove the result.** Run a small, no-submit check first. For a state change, assert the app response and the saved backend result. Keep screenshots, page source, and build identity with the run, excluding credentials and card fields. Promote a selector only after it works against the installed build; rerun on another relevant iOS version before claiming cross-version coverage.

Use a local React Native development build and Metro for quick JS/selector iteration; use a versioned beta simulator `.app` for the final Appium result and CI artifact. A JS edit can refresh through Metro in the development loop, while native changes need a rebuild. See [[09 Appium/Showpass Mobile App#Build for debugging versus testing|Showpass Mobile App]] for the current beta/debug configuration caveat.

## Run targets

Set `TARGET` in the terminal before `npm test`; if it is unset, desktop Safari is selected.

| Target | Ready now? | Needs |
| --- | --- | --- |
| `desktop-safari` | Starter code ready | Mac, Safari remote automation, Node dependencies |
| `ios-safari` | Starter code ready | Mac, Xcode, iOS simulator, `IOS_UDID` |
| `ios-webview`, `android-webview` | Configuration/test scaffold only | Buildable sample app source and `APP_PATH`; see [[09 Appium/WebView]] |
| `ios-app` | Launch, public purchase/read-back, and later no-submit dry run passed on iOS 18.6 | Beta simulator `.app`, `APP_PATH`, `IOS_UDID`; native mobile Box Office remains unproved. |
| `android-app` | Configuration/test scaffold only | Compatible beta APK, `APP_PATH`, `ANDROID_SERIAL`; see [[09 Appium/Showpass Mobile App]] |

The local beta iPhone simulator app is in the ignored `apps/` folder; no app binary is committed. The WebView sample app source is not present. With only one simulator booted and the iOS app capability `additionalWebviewBundleIds: ['*']`, Appium found the embedded page's `WEBVIEW_…` context and used its DOM to open the ticket picker. The public WebView purchase created one verified $25.46 Comic Con Adult order and one issued ticket. The later refactored no-submit run passed using the already-installed app. The Safari smoke test proves page loading only, not login or purchase behavior.

Continue with [[09 Appium/Native Safari]] for local Safari. [[09 Appium/CI]] explains the GitHub Actions workflow after local success. For Android, use [[09 Appium/Android Setup]].

The detailed public and iPhone mobile Box Office purchase cases and evidence are in [[09 Appium/iPhone Ticket Purchases]]. The iPhone offers Card, Cash, Complimentary, and configured Other for a priced basket; both tested simulator builds exited when Employee Login opened, so no native Box Office purchase has passed. Run `IOS_UDID=YOUR_SIMULATOR_UUID REUSE_INSTALLED_APP=1 npm run test:box-office:entry` in the Appium project to check a future build without placing an order. The actual TestFlight 3.7.2 (180) installation requires a connected physical iPhone.

For the admission automation attempt, see [[09 Appium/Ticket Scanning]]. The purchased Adult ticket is still unused; simulator build 3.6.7 (135) exited when Employee Login opened, so no check-in test is passing yet.

For the three-version iPhone **launch** check, run `npm run test:ios:versions` in the Appium project. Its README has the setup and result location. On October 4, 2026, the same beta simulator build passed app launch on iOS 27.0, 26.3.1, and 18.6. The current frontend source includes the scene lifecycle required for an iOS 27 SDK build; rebuild an older simulator bundle before repeating the iOS 27 check. This is an app-start check; it does not imply purchase or admission coverage on those versions.

Sources: [WDIO page objects](https://webdriver.io/docs/pageobjects/), [WDIO configuration](https://webdriver.io/docs/configuration/), [Appium service](https://webdriver.io/docs/appium-service/), [JUnit reporter](https://webdriver.io/docs/junit-reporter/), [Appium Inspector](https://appium.io/docs/en/latest/ecosystem/tools/), [XCUITest locator strategies](https://appium.github.io/appium-xcuitest-driver/12.12/reference/locator-strategies/), [React Native debugging](https://reactnative.dev/docs/debugging.html).
