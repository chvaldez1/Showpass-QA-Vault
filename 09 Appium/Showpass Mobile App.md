---
title: Showpass Mobile App
tags:
  - automation/appium
  - platform/mobile
---

# Showpass Mobile App

Prerequisites: [[09 Appium/Test Project]] and the matching device setup in [[09 Appium/Native Safari]] or [[09 Appium/Android Setup]]. Run Safari first so you know the Appium connection works before introducing an app build.

The actual React Native app lives in `packages/mobile` within [[01 Repositories/Frontend - showpass-frontend]]. The beta website is already deployed; the mobile app must be obtained as a build or built from a specific frontend checkout. A local build tests that checkout, which may differ from the deployed beta website.

## iPhone ticket-purchase paths

The two iPhone purchase cases, shared test data, proof targets, and current blockers live in [[09 Appium/iPhone Ticket Purchases]]. That note covers public WebView checkout and native mobile Box Office separately. Complete the app build and launch check below before trying either case.

## Choose the correct build

| Destination | Build required | Beta app ID |
| --- | --- | --- |
| iOS simulator on this Apple Silicon Mac / macOS ARM CI | Simulator `.app` containing an ARM64 simulator executable | `com.showpass.swift.beta` |
| Android emulator on Windows x64 / Linux CI | `android-direct-universal` beta `.apk`, including x86_64 | `com.showpass.android.beta` |
| Android emulator on Apple Silicon | Same direct-universal APK, including arm64-v8a | `com.showpass.android.beta` |
| Physical iPhone later | Signed device `.ipa` and provisioning for the destination | `com.showpass.swift.beta` |

An App Store/TestFlight IPA does not become a simulator app by extracting it. An Android App Bundle (`.aab`) is not directly installable by this starter config.

The user reports **TestFlight 3.7.2 (180)** as the current iPhone build on October 4, 2026. Appium's expected iOS beta version and bundle ID live in `appium-pof/config/app-build.json`; `IOS_UDID=YOUR_DEVICE_UUID npm run app:check` verifies the installed app before a test starts. The local **3.7.2 (180)** simulator candidate passed a read-only Appium launch smoke on iOS 26.3 on October 4 (one test passed). Login, purchase, and scanning remain unproved by that smoke. Testing the actual TestFlight installation requires a connected physical iPhone; a locally built 3.7.2 (180) simulator app tests its source checkout, not the TestFlight binary.

The pulled `showpass-frontend` `develop` checkout at `c84fbb7ad2` contains the React Native app under `packages/mobile`, but its tracked `keys.beta.json` and `keys.production.json` still say 3.6.7 (135). For the current simulator candidate, use an isolated worktree and set the three local `keys.*.json` version/build values to 3.7.2/180 there before compiling. Do not infer the TestFlight source commit from these version fields. As of October 4, the physical `Chris Phone` appears as **unavailable** in `xcrun devicectl list devices`, and macOS does not list it on USB; the actual TestFlight run remains blocked until Xcode sees the phone as connected.

That isolated build succeeded and is the current ignored `appium-pof/apps/Showpass-Beta-Simulator.app`; the older 3.6.7 (135) bundle is preserved as `Showpass-Beta-3.6.7-135-Simulator.app`. The iOS 26.3 simulator's installed copy passed `npm run app:check`. It reached Account but exited after Login was tapped; see [[09 Appium/iPhone Ticket Purchases]] for the crash evidence. Install the `.app` explicitly with `xcrun simctl install` and confirm the installed version before using `REUSE_INSTALLED_APP=1`: supplying `APP_PATH` to one Appium run did not replace the stale installation in this environment.

> [!important] Select the Android profile carefully
> The current release set contains both `android-direct-universal` and `android-stripe-universal`. Use **direct-universal** for general Showpass app testing here. The Stripe profile has a different organizer-focused app composition and ARM-only architectures; it is not the x86_64 emulator build.

## iOS beta app

### Use the app already built on this Mac

The canonical build and run lines are in the Appium project's `apps/README.md`. Use its preflight, one-time install if needed, and Appium launch smoke on the chosen simulator. The read-only Appium Account → Login diagnostic is `npm run test:box-office:entry` with the same `IOS_UDID` and `REUSE_INSTALLED_APP=1`, but this local build currently exits after Login is tapped; see [[09 Appium/iPhone Ticket Purchases]] for that evidence.

### Build for debugging versus testing

Yes: building the React Native app on the Mac makes JS debugging, Xcode logs, and native crash diagnosis possible. For a fast development loop, follow the frontend's `packages/mobile/README.md`: install dependencies, start Metro, and launch a Debug app in an iPhone simulator. For behavior claims, install and verify a versioned **Beta** simulator `.app` as below; that self-contained build does not depend on Metro and can become the CI artifact. Keep the source commit and environment with each build, because a local build labeled 3.7.2 (180) is not automatically the same binary as TestFlight 3.7.2 (180).

There is a current source configuration caveat: `packages/mobile/package.json` defines `ios:beta:dev` with `KEYSFILE=keys.beta.json` and `--mode Debug`, while the Xcode React Native bundle script maps the `Debug` configuration to `MOBILE_ENV=local` and the `Beta` configuration to `MOBILE_ENV=beta`. The `Beta` scheme's normal launch configuration is `Beta`. Use Debug for investigation, and verify the app's actual endpoint/environment before treating a debug run as beta evidence. For the observed Login exit, the versioned Beta build plus its macOS crash report is the stronger reproduction; use Xcode's debugger and logs to diagnose native code rather than inferring a product cause from Appium's timeout alone.

### 1. Obtain or build the simulator app

If you have an existing simulator build, put it under the test project's ignored `apps/` folder and proceed to step 2. Keep its source commit, version, build number, and environment with it.

To build from source on your Mac:

1. Open the existing frontend checkout and follow its [mobile prerequisites](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/README.md>). Use the pnpm version declared by that repository; do not replace its lockfile with npm.
2. Make sure the required mobile environment files are provisioned through the team's normal onboarding. The simulator lane reads version information from the tracked `keys.production.json` and synchronizes key files before preparing beta; having only `keys.beta.json` may not suffice. Check the version and build in all key files against `appium-pof/config/app-build.json`. Make version edits in an isolated worktree if the checkout is newer than its committed metadata.
3. Use Ruby 3.3 or newer for the mobile Gemfile. The repo's Fastlane guide names Ruby 3.3.9. If you do not have a suitable Ruby, install [Homebrew](https://brew.sh/) if needed, then run:

```bash
brew install rbenv ruby-build
eval "$(rbenv init - zsh)"
rbenv install -s 3.3.9
rbenv shell 3.3.9
gem install bundler
```

4. Build the beta simulator app:

```bash
cd "$HOME/Documents/Showpass/repos/showpass-frontend/packages/mobile"
ruby --version
bundle install
export SENTRY_DISABLE_AUTO_UPLOAD=true
export SENTRY_DISABLE_NATIVE_DEBUG_UPLOAD=true
pnpm fastlane:ios:sim:beta
```

This lane installs repository dependencies, prepares beta assets/pods, and builds the **Beta** scheme/configuration for the simulator. It writes generated files and synchronizes local version fields; review existing work before using that checkout. It does not use the store-upload lane.

Expected output directory:

```text
packages/mobile/fastlane/releases/ios/beta/Showpass-Beta-Simulator.app
```

Keep this `.app` directory intact. The Beta configuration bundles its JavaScript; it is the appropriate starting build for CI without a local Metro development server. If the build asks for unrelated store-upload credentials, check that you used `fastlane:ios:sim:beta`, not `fastlane:ios:build:beta` or an upload command.

> [!note] What passed locally with Xcode 27.0
> The tested beta simulator build was version **3.6.7 (135)** from frontend commit `2c809125f2`. The Fastlane simulator lane's generated Xcode build did not complete on this Mac: older Pods had simulator deployment targets below the installed SDK's minimum, its generated framework-copy script tried to overwrite a binary in place with `lipo`, and a Square framework script expected a signing identity. The following direct simulator build succeeded in the isolated worktree already at `/private/tmp/showpass-mobile-appium-build`. If it is absent, create it with `git -C "$HOME/Documents/Showpass/repos/showpass-frontend" worktree add /private/tmp/showpass-mobile-appium-build HEAD`, then provision the ignored mobile key files described in step 2 of the normal build. Keep those files local.

```bash
cd /private/tmp/showpass-mobile-appium-build
nvm use  # frontend .nvmrc selects Node 22 LTS; Appium itself uses Node 24 LTS
pnpm install --frozen-lockfile
pnpm mobile:build:beta
cd /private/tmp/showpass-mobile-appium-build/packages/mobile
bundle install
pnpm ios:install
python3 - <<'PY'
from pathlib import Path
p = Path('ios/Pods/Target Support Files/Pods-mobile/Pods-mobile-frameworks.sh')
s = p.read_text()
old = 'lipo -remove "$arch" -output "$binary" "$binary"'
new = 'temp_binary="${binary}.lipo-temp"\n      lipo -remove "$arch" -output "$temp_binary" "$binary"\n      mv -f "$temp_binary" "$binary"'
if old in s:
    p.write_text(s.replace(old, new))
elif new not in s:
    raise SystemExit('Generated Pods script differs; inspect it before building.')
PY
xcodebuild -workspace ios/mobile.xcworkspace -scheme Beta -configuration Beta \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath fastlane/releases/ios/beta-build \
  ARCHS=arm64 ONLY_ACTIVE_ARCH=YES IPHONEOS_DEPLOYMENT_TARGET=16.0 \
  CODE_SIGNING_ALLOWED=NO CODE_SIGN_IDENTITY=- EXPANDED_CODE_SIGN_IDENTITY=- build
ditto fastlane/releases/ios/beta-build/Build/Products/Beta-iphonesimulator/mobile.app \
  /Users/christianvaldez/Documents/personal/appium-pof/apps/Showpass-Beta-Simulator.app
codesign --force --deep --sign - \
  /Users/christianvaldez/Documents/personal/appium-pof/apps/Showpass-Beta-Simulator.app
```

The Python edit touches only a generated Pods script in that disposable worktree. It should not be committed to the frontend repository. The app copy needs the final ad-hoc signature for `simctl install` to accept it. Use this fallback only when the normal lane hits those same Xcode 27 failures; update it against the frontend's current build if its generated script or SDK requirements change. The app's ignored local copy is the `APP_PATH` for the launch and discovery checks below.

An earlier 3.6.7 (135) build made with the iOS 27 SDK would install but exit on iOS 27 because it lacked a UIKit scene configuration. The frontend's `packages/mobile/ios/mobile/AppDelegate.swift` and `Info.plist` now create a scene window for React Native. Rebuild from that source before testing iOS 27; copying the older `.app` will not fix it. The rebuilt beta app passed the Appium launch smoke on iOS 27.0, 26.3.1, and 18.6 on October 4, 2026. This proves startup only, not purchase or employee login on each version.

### 2. Run the app launch check

Follow the Appium project's `apps/README.md` for the verified preflight and Appium launch command. Expected: the beta app comes to the foreground, the launch test passes, and `artifacts/ios-app/` contains its screenshot. Check that the screen is usable, not stuck at launch or showing a JavaScript error.

## Android beta app

### 1. Obtain a standalone APK — recommended on Windows and for CI

1. Open [showpass-frontend Actions](https://github.com/showpass/showpass-frontend/actions) and select a completed **Mobile Android Beta Release Set** run for the revision you intend to test. Use an existing successful run; starting this release workflow allocates release state and is not required just to learn Appium.
2. In the run's Artifacts section, download `mobile-android-beta-release-set-<build number>` and unzip it.
3. Choose `Showpass-android-direct-universal-<version>-<build number>.apk`, along with its manifest/checksum evidence. Do not pick the similarly named Stripe APK.
4. Copy the selected APK into `appium-pof/apps/Showpass-Beta.apk`. Record the original filename, source commit, and build number before renaming.

If the artifact has expired or you do not have access, obtain that exact beta direct-universal build from the mobile team. Appium cannot create a missing binary or supply private build configuration.

The source still exposes `pnpm fastlane:android:beta:apk` in package scripts, but its Fastlane lane now deliberately errors: standalone beta allocation is disabled. The older README listing is stale; do not use it as this setup's build command.

### 2. Run on the prepared emulator

With `ANDROID_SERIAL` set, run from `appium-pof`.

**Windows PowerShell:**

```powershell
$env:TARGET = "android-app"
Remove-Item Env:APP_ID -ErrorAction SilentlyContinue
$env:APP_PATH = (Resolve-Path "apps\Showpass-Beta.apk").Path
npm test
```

**Mac:**

```bash
export TARGET=android-app
unset APP_ID
export APP_PATH="$PWD/apps/Showpass-Beta.apk"
npm test
```

Expected: the beta app comes to the foreground and evidence appears under `artifacts/android-app/`. The standalone release APK should open without Metro. Check the visible screen as well as the launch-test result.

### Optional local development build on Mac

For source changes, the repository also has a debug path. This is separate from the release-set workflow and can depend on **Metro**, the development server that supplies the app's JavaScript.

In terminal 1, with the frontend's normal mobile environment files/dependencies available:

```bash
cd "$HOME/Documents/Showpass/repos/showpass-frontend"
pnpm install --frozen-lockfile
export SKIP_POD_INSTALL=1
export SENTRY_DISABLE_AUTO_UPLOAD=true
export SENTRY_DISABLE_NATIVE_DEBUG_UPLOAD=true
pnpm mobile:build:beta
cd packages/mobile
pnpm start:beta
```

Leave Metro running. In terminal 2, build without installing to an unspecified device:

```bash
cd "$HOME/Documents/Showpass/repos/showpass-frontend/packages/mobile/android"
PLATFORM=MOBILE MOBILE_ENV=beta SENTRY_DISABLE_AUTO_UPLOAD=true SENTRY_DISABLE_NATIVE_DEBUG_UPLOAD=true ./gradlew :app:assembleBetaDebug
```

The APK is normally `packages/mobile/android/app/build/outputs/apk/beta/debug/app-beta-debug.apk`. Set `APP_PATH` to its actual absolute path, set `ANDROID_SERIAL` to the dedicated emulator, then forward Metro and run the existing `android-app` target:

```bash
adb -s "$ANDROID_SERIAL" reverse tcp:8081 tcp:8081
npm test
```

Run those last commands from the test project, with `TARGET=android-app`. The repo's shell-based build scripts are not directly portable to PowerShell; the prebuilt APK route above is the documented Windows route. CI uses a self-contained build so it does not depend on Metro on your laptop.

## Inspect controls and WebViews

1. Install the desktop [Appium Inspector](https://github.com/appium/appium-inspector/releases) for your OS.
2. Set the same target, device ID, and `APP_PATH` that passed the app launch check. End the test run before opening another session.
3. From `appium-pof`, print the already-defined capabilities:

```sh
node --import tsx -e "import('./wdio.conf.ts').then(m => console.log(JSON.stringify(m.config.capabilities[0], null, 2)))"
```

4. Start a manual Appium server for Inspector:

```sh
npx appium --address 127.0.0.1 --port 4723
```

5. In Inspector, set host **127.0.0.1**, port **4723**, remote path **/**, and paste the printed JSON into the capability editor. Start Session. For Android WebView inspection that needs automatic Chromedriver download, restart Appium with the scoped `--allow-insecure uiautomator2:chromedriver_autodownload` option; iOS does not need it.
6. Inspect a visible native control. Prefer a stable accessibility ID; record its actual value and the visible action it performs. For example, the local 3.7.2 (180) Account accessibility tree exposed `name="Login"`, and `test/screens/ios/buyer/account.ts` locates it with `~Login`. That selector is observed for this build and language, not a promise about every build. IDs that exist only in `*.test.tsx` mocks are not live-app selectors. If a critical control has no stable ID, add a React Native `testID` and verify it in a rebuilt app rather than relying on screen coordinates or a positional XPath.
7. In the app, use the customer-facing event browsing flow to open an event's details/purchase screen. Dismiss or handle onboarding prompts as needed. Stop before choosing quantities, reserving inventory, or paying. Record the actual visible navigation and event used; labels depend on the build, language, and available test data.
8. Refresh Inspector and inspect the context list. The tested iOS 18.6 beta build exposed `WEBVIEW_…` after the Appium config added `additionalWebviewBundleIds: ['*']` and all other iPhone simulators were shut down. Switch to it and verify its page URL is on `beta.showpass.com`; switch back to `NATIVE_APP` for native headers and navigation. If only `NATIVE_APP` appears, first shut down other booted simulators and retry the context check.
9. End the Inspector session and stop its server with Ctrl+C before using `npm test` again.

The source-backed path is `PurchaseScreen → BaseWebView`. `BaseWebView` already sets `webviewDebuggingEnabled`, and `useWebviewUrls` creates event, checkout, and account page URLs. Actual context discovery and installed-build environment remain runtime checks.

To automate this real-app flow, add a **separate Showpass WebView spec** with the inspected native navigation, then reuse the context/URL checks from [[09 Appium/Test Project|the shared WebView example]]. Give it a corresponding explicit target in the shared config. Until those steps and expected screen are verified, the sample's passing WebView test does not cover the Showpass app.

## CI handoff

Use [[09 Appium/CI#Add WebView and Showpass app jobs later|CI's app artifact instructions]]. Supply a simulator `.app` for iOS and the direct-universal beta APK for Android, together with build identity. Appium itself does not compile React Native or change the build's backend environment.

## Source reviewed

These are references into the existing checkout, not copies of repository code:

- [Mobile scripts](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/package.json>) and [mobile README](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/README.md>).
- [Fastlane implementation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/fastlane/Fastfile>) — simulator lane and disabled standalone Android beta lane.
- [Android build prerequisites](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/android/build.gradle>) and [distribution profiles](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/release/distribution-profiles.json>).
- [Android beta release workflow](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/.github/workflows/mobile-android-beta.yml>).
- [BaseWebView](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/components/WebView/BaseWebView/BaseWebView.tsx:365>), [PurchaseScreen](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/BuyerScreens/PurchaseScreen/PurchaseScreen.tsx>), and [WebView URL construction](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/hooks/useWebviewUrls/index.ts>).
