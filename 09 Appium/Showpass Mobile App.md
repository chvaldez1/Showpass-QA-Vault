---
title: Showpass Mobile App
tags:
  - automation/appium
  - platform/mobile
---

# Showpass Mobile App

Prerequisites: [[09 Appium/Test Project]] and the matching device setup in [[09 Appium/Native Safari]] or [[09 Appium/Android Setup]]. Run Safari first so you know the Appium connection works before introducing an app build.

The actual React Native app lives in `packages/mobile` within [[01 Repositories/Frontend - showpass-frontend]]. The beta website is already deployed; the mobile app must be obtained as a build or built from a specific frontend checkout. A local build tests that checkout, which may differ from the deployed beta website.

## Choose the correct build

| Destination | Build required | Beta app ID |
| --- | --- | --- |
| iOS simulator on this Apple Silicon Mac / macOS ARM CI | Simulator `.app` containing an ARM64 simulator executable | `com.showpass.swift.beta` |
| Android emulator on Windows x64 / Linux CI | `android-direct-universal` beta `.apk`, including x86_64 | `com.showpass.android.beta` |
| Android emulator on Apple Silicon | Same direct-universal APK, including arm64-v8a | `com.showpass.android.beta` |
| Physical iPhone later | Signed device `.ipa` and provisioning for the destination | `com.showpass.swift.beta` |

An App Store/TestFlight IPA does not become a simulator app by extracting it. An Android App Bundle (`.aab`) is not directly installable by this starter config.

> [!important] Select the Android profile carefully
> The current release set contains both `android-direct-universal` and `android-stripe-universal`. Use **direct-universal** for general Showpass app testing here. The Stripe profile has a different organizer-focused app composition and ARM-only architectures; it is not the x86_64 emulator build.

## iOS beta app

### 1. Obtain or build the simulator app

If you have an existing simulator build, put it under the test project's ignored `apps/` folder and proceed to step 2. Keep its source commit, version, build number, and environment with it.

To build from source on your Mac:

1. Open the existing frontend checkout and follow its [mobile prerequisites](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/README.md>). Use the pnpm version declared by that repository; do not replace its lockfile with npm.
2. Make sure the required mobile environment files are provisioned through the team's normal onboarding. The simulator lane reads version information from `keys.production.json` and synchronizes local key files before preparing beta; having only `keys.beta.json` may not suffice.
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

### 2. Run the app launch check

With the dedicated iPhone simulator started and `IOS_UDID` set, return to `showpass-appium`:

```bash
cd "$HOME/Documents/Showpass/repos/showpass-appium"
export TARGET=ios-app
unset APP_ID
export APP_PATH="$HOME/Documents/Showpass/repos/showpass-frontend/packages/mobile/fastlane/releases/ios/beta/Showpass-Beta-Simulator.app"
npm test
```

If using a supplied build under `apps/`, set `APP_PATH` to that absolute path instead. Expected: the beta app comes to the foreground, the launch test passes, and `artifacts/ios-app/` contains its screenshot. Check that the screen is usable, not stuck at launch or showing a JavaScript error.

## Android beta app

### 1. Obtain a standalone APK — recommended on Windows and for CI

1. Open [showpass-frontend Actions](https://github.com/showpass/showpass-frontend/actions) and select a completed **Mobile Android Beta Release Set** run for the revision you intend to test. Use an existing successful run; starting this release workflow allocates release state and is not required just to learn Appium.
2. In the run's Artifacts section, download `mobile-android-beta-release-set-<build number>` and unzip it.
3. Choose `Showpass-android-direct-universal-<version>-<build number>.apk`, along with its manifest/checksum evidence. Do not pick the similarly named Stripe APK.
4. Copy the selected APK into `showpass-appium/apps/Showpass-Beta.apk`. Record the original filename, source commit, and build number before renaming.

If the artifact has expired or you do not have access, obtain that exact beta direct-universal build from the mobile team. Appium cannot create a missing binary or supply private build configuration.

The source still exposes `pnpm fastlane:android:beta:apk` in package scripts, but its Fastlane lane now deliberately errors: standalone beta allocation is disabled. The older README listing is stale; do not use it as this setup's build command.

### 2. Run on the prepared emulator

With `ANDROID_SERIAL` set, run from `showpass-appium`.

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
3. From `showpass-appium`, print the already-defined capabilities:

```sh
node --input-type=module -e "import('./wdio.conf.mjs').then(m => console.log(JSON.stringify(m.config.capabilities[0], null, 2)))"
```

4. Start a manual Appium server for Inspector:

```sh
npx appium --address 127.0.0.1 --port 4723 --allow-insecure uiautomator2:chromedriver_autodownload
```

5. In Inspector, set host **127.0.0.1**, port **4723**, remote path **/**, and paste the printed JSON into the capability editor. Start Session. The scoped Chromedriver option supports Android inspection; iOS uses WebKit instead.
6. Inspect a visible native control. Prefer a stable accessibility ID; record its actual value and the visible action it performs. IDs that exist only in `*.test.tsx` mocks are not live-app selectors.
7. In the app, use the customer-facing event browsing flow to open an event's details/purchase screen. Dismiss or handle onboarding prompts as needed. Stop before choosing quantities, reserving inventory, or paying. Record the actual visible navigation and event used; labels depend on the build, language, and available test data.
8. Refresh Inspector and inspect the context list. A debuggable embedded page should expose a `WEBVIEW_…` context. Switch to it and verify its page URL is on `beta.showpass.com`; switch back to `NATIVE_APP` for native headers and navigation.
9. End the Inspector session and stop its server with Ctrl+C before using `npm test` again.

The source-backed path is `PurchaseScreen → BaseWebView`. `BaseWebView` already sets `webviewDebuggingEnabled`, and `useWebviewUrls` creates event, checkout, and account page URLs. Actual context discovery and installed-build environment remain runtime checks.

To automate this real-app flow, add a **separate Showpass WebView spec** with the inspected native navigation, then reuse the context/URL checks from [[09 Appium/Test Project|the shared WebView example]]. Give it a corresponding explicit target in the shared config. Until those steps and expected screen are verified, the sample's passing WebView test does not cover the Showpass app.

## CI handoff

Use [[09 Appium/CI#Add WebView and Showpass app jobs|CI's app artifact instructions]]. Supply a simulator `.app` for iOS and the direct-universal beta APK for Android, together with build identity. Appium itself does not compile React Native or change the build's backend environment.

## Source reviewed

These are references into the existing checkout, not copies of repository code:

- [Mobile scripts](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/package.json>) and [mobile README](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/README.md>).
- [Fastlane implementation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/fastlane/Fastfile>) — simulator lane and disabled standalone Android beta lane.
- [Android build prerequisites](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/android/build.gradle>) and [distribution profiles](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/release/distribution-profiles.json>).
- [Android beta release workflow](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/.github/workflows/mobile-android-beta.yml>).
- [BaseWebView](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/components/WebView/BaseWebView/BaseWebView.tsx:365>), [PurchaseScreen](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/BuyerScreens/PurchaseScreen/PurchaseScreen.tsx>), and [WebView URL construction](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/hooks/useWebviewUrls/index.ts>).
