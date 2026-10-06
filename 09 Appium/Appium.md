---
title: Appium
tags:
  - automation/appium
---

# Appium

Start here to test [Showpass beta](https://beta.showpass.com/) in **actual desktop Safari and iPhone Safari**, then test embedded web pages and the Showpass mobile app. Get each target working locally before adding it to GitHub Actions.

## Follow this order

1. [[09 Appium/Common Setup|Common Setup]] — install Appium in the existing `appium-pof` project.
2. [[09 Appium/Test Project|Test Project]] — find the runnable code and generated reports in `appium-pof`.
3. [[09 Appium/Native Safari|Native Safari]] — run desktop Safari first, then Safari in an iPhone simulator on your Mac.
4. [[09 Appium/CI|CI]] — run those same Safari tests from `appium-pof` in GitHub Actions.
5. [[09 Appium/Android Setup|Android Setup]] — prepare your Windows computer or Mac for Android.
6. [[09 Appium/WebView|WebView]] — switch between app controls and an embedded web page, using small iOS and Android sample apps.
7. [[09 Appium/Showpass Mobile App|Showpass Mobile App]] — install a beta build from the frontend repo, test app launch, and inspect its real WebViews.
8. [[09 Appium/iPhone Ticket Purchases|iPhone Ticket Purchases]] — follow the separate public and mobile Box Office purchase cases after the beta app launches.
9. [[09 Appium/Organizer Dashboard Navigation|Organizer Dashboard Navigation]] — check that each of the eight iPhone Organizer tiles opens its screen.
10. Return to [[09 Appium/CI#Add WebView and Showpass app jobs later|CI: add app jobs]] after each corresponding local test passes.

Each note owns a different part of setup. Node/Appium installation lives in Common Setup; the actual configuration and tests live in `/Users/christianvaldez/Documents/personal/appium-pof`; device setup lives in Native Safari or Android Setup.

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
- **WebdriverIO (WDIO):** the runner for this project's TypeScript tests.
- **Capabilities:** settings that tell Appium which browser, device, and app to open.
- **Context:** the part of a hybrid app you control. `NATIVE_APP` exposes app controls; `WEBVIEW_…` exposes the embedded page's HTML.

## What the first pass proves

The Safari starter tests check browser connectivity and beta-page loading. The iPhone app launch, native Explore → WebView checkout, and one public Comic Con purchase have now been exercised locally. Those results do not prove the native mobile Box Office, Android, Safari purchase, physical-device behavior, or release readiness. Keep separate proof targets under [[00 Start Here/World-Class Software Quality Standard]].

| Milestone | Evidence to keep | Execution status |
| --- | --- | --- |
| Desktop Safari and iPhone Safari | Passing test, screenshot, OS/browser/driver versions | Desktop Safari remote-automation permission blocked; iPhone Safari attempt inconclusive |
| Android and iOS sample WebViews | Passing test including return to native context | Sample apps not built; not run |
| Showpass beta app | Build identity, foreground app, visible usable screen | Beta 3.6.7 (135) launched on iOS 18.6 and 26.3 simulators |
| Showpass app WebView | Context list, expected beta URL, inspected native entry steps | Public Comic Con WebView and native checkout controls observed on iOS 18.6 |
| iPhone ticket purchases | Public and mobile Box Office orders, payment/ticket evidence | One $25.46 public WebView order and ticket verified; native mobile Box Office pending |
| GitHub Actions | Green jobs and downloadable logs/reports | Safari workflow file created locally; not pushed or run |
| Physical devices and product workflows | Device-specific cases and outcomes | Deferred until local and simulator CI pass |

The user reports TestFlight **3.7.2 (180)** as the current iPhone build. The local simulator results in this table are for **3.6.7 (135)** and do not verify the TestFlight build; see [[09 Appium/Showpass Mobile App]].

## Review baseline

Updated 2026-10-03. The Mac has Node 26.3.0 as its global version and Xcode 27.0. Use Node 24 LTS from `.node-version` in `appium-pof`; the public no-submit checkout passed under Node 24.21.0 on iOS 18.6 using the already-installed app. The project pins Appium and its drivers in `package-lock.json`. Desktop Safari permission, Windows execution, and GitHub Actions runs remain unverified. Continue with [[09 Appium/Native Safari]] for Safari setup and [[09 Appium/iPhone Ticket Purchases]] for the purchase evidence.

The tool versions for this project are recorded in `appium-pof/package.json` and `package-lock.json`. Follow [[09 Appium/Common Setup#Version policy|the shared version policy]] for why they are pinned. Product source remains in the backend/frontend repositories; the beta URL is the system under test, not a repository of test code.
