---
title: Native Safari
tags:
  - automation/appium
  - browser/safari
---

# Native Safari

Prerequisites: [[09 Appium/Common Setup]] and [[09 Appium/Test Project]]. Use your **Mac** for both sections. Start with desktop Safari; add iPhone Safari after the desktop test passes.

These tests use Apple's installed Safari. The desktop target uses Appium's Safari driver and Apple's `safaridriver`; the iPhone target uses XCUITest. Choosing XCUITest for iOS also prepares the same machine for iOS apps and WKWebViews.

## 1. Enable desktop Safari automation

Quit any existing automated Safari session. In Terminal:

```bash
/usr/bin/safaridriver --enable
```

Enter your Mac administrator password if requested. If permission is denied, repeat this one setup command with `sudo`. Safari's **Develop → Allow Remote Automation** setting should then be enabled. If Develop is hidden, enable web developer features under Safari's Advanced settings.

This is a one-time setting on your Mac. Do not start `safaridriver` manually; the Appium Safari driver starts it when the test runs.

## 2. Run the desktop test

From `showpass-appium`:

```bash
export TARGET=desktop-safari
npm test
```

Expected: Safari opens an automation window, loads Showpass beta, and the terminal reports one passing test. Find its screenshot and logs under `artifacts/desktop-safari/`.

This proves desktop Safari automation works. Safari has no Chrome-style headless mode; keep your local Mac awake and allow the automation window to run without interacting with it.

## 3. Prepare Xcode for iPhone Safari

1. Install **Xcode** from the Mac App Store if missing. Command Line Tools alone are insufficient.
2. Open Xcode once, accept its license, and let first-launch components finish installing.
3. In **Xcode → Settings → Components**, install an iOS simulator runtime if none is available. Some Xcode versions call this tab Platforms.
4. Select the full Xcode installation and check it:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
xcodebuild -version
xcrun simctl list runtimes
xcrun simctl list devices available
```

If your Xcode app has a different name, use its actual path. The selected Xcode must support the installed iOS runtime. The reviewed Mac already has Xcode 26.6; the steps above identify its available simulators without assuming an iPhone name.

From the test project, check XCUITest prerequisites:

```bash
npx appium driver doctor xcuitest
```

Resolve **required** failures before continuing. Optional utilities for video or image comparison are not needed for these starter tests. The pinned XCUITest version supports the newer iOS 26.4+ WebDriverAgent requirements.

## 4. Create and start a dedicated simulator

1. In Xcode, open **Window → Devices and Simulators → Simulators**.
2. Add an iPhone simulator using an installed iOS version. Name it **Showpass QA iPhone** so you can distinguish its test data from other simulators.
3. Run the device-list command again and copy the UUID beside that exact simulator.
4. Replace the example value below with the UUID you copied:

```bash
export IOS_UDID="PASTE-YOUR-SIMULATOR-UUID-HERE"
open -a Simulator
xcrun simctl boot "$IOS_UDID"
xcrun simctl bootstatus "$IOS_UDID" -b
```

If `boot` says the simulator is already booted, continue with `bootstatus`. It should finish with the simulator ready. Leave it running.

A **UDID** uniquely identifies the device. Use the ID instead of a guessed device name or `booted`, which can select the wrong device when several are open. iOS simulators do not require an Apple Developer subscription or real-device provisioning for this Safari test.

## 5. Run the iPhone Safari test

From the same terminal in `showpass-appium`:

```bash
export TARGET=ios-safari
npm test
```

The first XCUITest run builds and starts **WebDriverAgent**, Apple's test runner used by Appium. It can take several minutes. Let the test finish before starting another session.

Expected: Safari opens inside **Showpass QA iPhone**, beta loads, and the same test used for desktop passes. Its evidence is under `artifacts/ios-safari/`.

For iPad coverage, create an iPad simulator, set its UDID, and rerun the same target. Record the device and iOS version with the result; an iPhone pass does not imply an iPad pass.

## 6. Repeat the run in GitHub Actions

Continue with [[09 Appium/CI]]. CI installs the same npm dependencies, enables Safari automation, and creates its own simulator. Do not copy your local simulator UDID into the workflow.

For embedded pages or the installed Showpass app, continue with [[09 Appium/WebView]] or [[09 Appium/Showpass Mobile App]]. Those sessions use an app capability instead of `browserName: Safari`.

## Physical iPhone later

The initial route above uses a simulator. For a physical iPhone, connect and trust it, enable Developer Mode, and configure Safari Web Inspector/Remote Automation and XCUITest device settings. WebDriverAgent also needs signing with your Apple development team; an installed app needs a compatible signed device build. A simulator `.app` cannot be installed on a physical iPhone.

Follow the driver's [real-device preparation guide](https://appium.github.io/appium-xcuitest-driver/latest/preparation/real-device-config/) before adding a dedicated real-device configuration. Physical-device CI needs a device provider or a Mac runner connected to that device. Do not assume a GitHub-hosted macOS runner includes an iPhone.

## Troubleshooting

| Symptom | Next check |
| --- | --- |
| Desktop session says remote automation is disabled | Repeat step 1 and verify Safari's Allow Remote Automation setting. |
| Desktop Safari says another session is active | End your previous test/Inspector session; run only one session on this Mac. |
| `xcrun` cannot find `simctl` | Check `xcode-select -p`; it must point inside full Xcode. |
| No available iPhone or runtime | Install an iOS runtime in Xcode and create a simulator for it. |
| WebDriverAgent fails to build | Read `artifacts/ios-safari/appium/`; check selected Xcode, completed license setup, and driver/runtime compatibility before retrying. |
| Beta fails to load on both targets | Check the exact URL and network from the test machine; a blocked site is different from a failed Appium session. |
| Desktop passes, iPhone fails | Keep both results. Check mobile logs and the simulator screen; the desktop pass does not clear mobile behavior. |

Sources: [Safari driver setup](https://appium.github.io/appium-safari-driver/v5/getting-started/), [Safari capabilities](https://appium.github.io/appium-safari-driver/v5/reference/capabilities/), [XCUITest requirements](https://appium.github.io/appium-xcuitest-driver/latest/installation/requirements/), [iOS capability examples](https://appium.github.io/appium-xcuitest-driver/latest/guides/capability-sets/).
