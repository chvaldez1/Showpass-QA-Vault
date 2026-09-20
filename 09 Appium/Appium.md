---
title: Appium
tags:
  - automation/appium
---

# Appium

Start here to test [Showpass beta](https://beta.showpass.com/) in **actual desktop Safari and iPhone Safari**, then test embedded web pages and the Showpass mobile app. Get each target working locally before adding it to GitHub Actions.

## Follow this order

1. [[09 Appium/Common Setup|Common Setup]] — install Appium and create a separate automation project.
2. [[09 Appium/Test Project|Test Project]] — add the shared configuration, tests, and reports once.
3. [[09 Appium/Native Safari|Native Safari]] — run desktop Safari first, then Safari in an iPhone simulator on your Mac.
4. [[09 Appium/CI|CI]] — run those same Safari tests in GitHub Actions.
5. [[09 Appium/Android Setup|Android Setup]] — prepare your Windows computer or Mac for Android.
6. [[09 Appium/WebView|WebView]] — switch between app controls and an embedded web page, using small iOS and Android sample apps.
7. [[09 Appium/Showpass Mobile App|Showpass Mobile App]] — install a beta build from the frontend repo, test app launch, and inspect its real WebViews.
8. Return to [[09 Appium/CI#Add WebView and Showpass app jobs|CI: add app jobs]] after each corresponding local test passes.

Each note owns a different part of setup. Node/Appium installation lives only in Common Setup; configuration and reusable tests live only in Test Project; device setup lives in Native Safari or Android Setup.

## What runs where

| What you test | Appium driver | Local machine | GitHub Actions machine |
| --- | --- | --- | --- |
| Desktop Safari website | Safari | Mac | macOS |
| Safari on an iPhone/iPad simulator | XCUITest | Mac with Xcode | macOS with Xcode |
| iOS app or embedded WKWebView | XCUITest | Mac with Xcode | macOS; use a simulator `.app` |
| Android app or embedded WebView | UiAutomator2 | Windows or Mac | Linux with an Android emulator |
| Physical iPhone or Android device | XCUITest / UiAutomator2 | Connected device; iPhone requires a Mac for this guide | Device service or dedicated self-hosted runner; later stage |

Windows and Android do not run current native Safari. Android WebView coverage does not replace iPhone Safari. A simulator runs Apple's Safari/WebKit, but cannot prove every physical-device behavior.

## Five terms you need

- **Appium:** the service that receives test commands and passes them to a device or browser.
- **Driver:** the adapter for a platform, such as Safari or XCUITest.
- **WebdriverIO (WDIO):** the JavaScript test runner used throughout these notes.
- **Capabilities:** settings that tell Appium which browser, device, and app to open.
- **Context:** the part of a hybrid app you control. `NATIVE_APP` exposes app controls; `WEBVIEW_…` exposes the embedded page's HTML.

## What the first pass proves

The supplied tests establish browser connectivity, beta-page loading, app launch, and WebView switching. They do not prove login, checkout, payments, refunds, ticket delivery, permissions, or release readiness. Add those as separate proof targets under [[00 Start Here/World-Class Software Quality Standard]]. These first tests do not submit purchases or change Showpass records.

| Milestone | Evidence to keep | Execution status |
| --- | --- | --- |
| Desktop Safari and iPhone Safari | Passing test, screenshot, OS/browser/driver versions | Not run during this documentation review |
| Android and iOS sample WebViews | Passing test including return to native context | Not run |
| Showpass beta app | Build identity, foreground app, visible usable screen | Source setup reviewed; app not launched |
| Showpass app WebView | Context list, expected beta URL, inspected native entry steps | Debugging enabled in source; runtime proof still needed |
| GitHub Actions | Green jobs and downloadable logs/reports | Workflow examples supplied; not activated |
| Physical devices and product workflows | Device-specific cases and outcomes | Deferred until local and simulator CI pass |

## Review baseline

Reviewed on 2026-09-19 against the local frontend checkout and official tool documentation. The Mac has Apple Silicon, Node 22.21.1, npm 10.9.4, and Xcode 26.6. Appium was not found on the current shell's path. Installed simulator runtimes could not be verified from the restricted review session; use the inventory step in Native Safari.

Source references and platform-specific troubleshooting are kept in the relevant notes below this index.

For the recommended runtime versions, follow [[09 Appium/Common Setup#Version policy|the shared 2026 version policy]]. The installed versions recorded above describe the inspected machine; they are not all the recommended versions for a fresh setup.

Documentation checks: internal links and source paths resolve; JavaScript, shell, YAML, and XML examples pass syntax checks; all six target configurations and missing-input guards were evaluated without launching devices. The index and shared test instructions were also checked in Obsidian reading view. Browser sessions, native builds, Windows execution, and CI remain unexecuted.
