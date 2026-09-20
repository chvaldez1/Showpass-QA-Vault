---
title: WebView
tags:
  - automation/appium
  - mobile/webview
---

# WebView

Prerequisites: [[09 Appium/Common Setup]] and [[09 Appium/Test Project]], plus [[09 Appium/Native Safari#3. Prepare Xcode for iPhone Safari|iOS device setup]] or [[09 Appium/Android Setup]]. Do the sample for the platform you want first.

A WebView is a web page embedded **inside an app**. Safari tests and WebView tests exercise different containers. These small sample apps open beta immediately, so you can prove context switching without first automating the Showpass app's navigation. They are learning tools, not substitutes for testing the real app.

Both samples use app ID `com.example.showpasswebview`, matching the shared config. They use the same `webview.smoke.mjs` test from Test Project.

## Android sample app

### 1. Create the project shell

In Android Studio, choose **New Project → No Activity**. Name it `ShowpassWebView`, package `com.example.showpasswebview`, minimum SDK **26**, and Kotlin DSL for build files. Save directly as `showpass-appium/android-webview`.

The IDE creates Gradle's wrapper (`gradlew`, `gradlew.bat`, and `gradle/wrapper/`). Keep these files. Replace the following build files to use one known Java 17/API 36 toolchain, regardless of the current IDE template.

`android-webview/settings.gradle.kts`:

```kotlin
pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories { google(); mavenCentral() }
}
rootProject.name = "ShowpassWebView"
include(":app")
```

`android-webview/build.gradle.kts`:

```kotlin
plugins {
    id("com.android.application") version "8.11.0" apply false
}
```

`android-webview/app/build.gradle.kts`:

```kotlin
plugins { id("com.android.application") }
android {
    namespace = "com.example.showpasswebview"
    compileSdk = 36
    buildToolsVersion = "36.0.0"
    defaultConfig {
        applicationId = "com.example.showpasswebview"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
    // This sample builds its view in Java and needs no generated theme resources.
    sourceSets.getByName("main").res.setSrcDirs(emptyList<String>())
}
```

In `android-webview/gradle/wrapper/gradle-wrapper.properties`, set the existing distribution line to:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip
```

If the template supplied `distributionSha256Sum`, replace it with the checksum published for this exact distribution on [Gradle's release checksums page](https://gradle.org/release-checksums/). A checksum for the old distribution will reject the new download. Keep the wrapper itself in Git; do not substitute a globally installed Gradle in CI.

### 2. Add the WebView

Replace `android-webview/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application android:label="Showpass WebView QA"
        android:theme="@android:style/Theme.Material.Light.NoActionBar">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

Create `android-webview/app/src/main/java/com/example/showpasswebview/MainActivity.java` (create missing folders):

```java
package com.example.showpasswebview;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        boolean debug = (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        WebView.setWebContentsDebuggingEnabled(debug);
        WebView view = new WebView(this);
        view.setWebViewClient(new WebViewClient());
        view.getSettings().setJavaScriptEnabled(true);
        view.getSettings().setDomStorageEnabled(true);
        setContentView(view);
        view.loadUrl("https://beta.showpass.com/");
    }
}
```

Sync the project in Android Studio. Build the debug variant, where WebView debugging is enabled. No frontend checkout or Showpass app credentials are needed for this sample.

### 3. Build and test

Start the emulator and set its serial using [[09 Appium/Android Setup#3. Create a dedicated Android emulator|Android Setup]]. Run from the root of `showpass-appium`.

**Mac:**

```bash
cd android-webview
chmod +x gradlew
./gradlew assembleDebug
cd ..
export TARGET=android-webview
unset APP_ID
export APP_PATH="$PWD/android-webview/app/build/outputs/apk/debug/app-debug.apk"
npm test
```

**Windows PowerShell:**

```powershell
Set-Location android-webview
.\gradlew.bat assembleDebug
Set-Location ..
$env:TARGET = "android-webview"
Remove-Item Env:APP_ID -ErrorAction SilentlyContinue
$env:APP_PATH = (Resolve-Path "android-webview\app\build\outputs\apk\debug\app-debug.apk").Path
npm test
```

Expected: the sample app displays beta, the test enters its WebView, checks the page, returns to `NATIVE_APP`, and passes. Evidence goes to `artifacts/android-webview/`.

## iOS sample app

### 1. Create a simulator app

1. In Xcode, choose **File → New → Project → iOS → App**.
2. Product Name: `ShowpassWebView`; Organization Identifier: `com.example`; Interface: SwiftUI; Language: Swift; no storage or test targets needed.
3. Save under `showpass-appium/ios-webview`. Ensure the project file is exactly `ios-webview/ShowpassWebView.xcodeproj`; move the generated project folder there if Xcode nested it one level deeper.
4. Select the app target. Set **Bundle Identifier** to `com.example.showpasswebview` and the iOS deployment target to **16.4** or newer, no higher than your chosen simulator runtime.
5. Choose your dedicated iPhone simulator as the run destination. This guide builds for the simulator with code signing disabled.

Replace the generated `ContentView.swift` with:

```swift
import SwiftUI
import WebKit

struct BetaWebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let view = WKWebView()
        view.isInspectable = true
        view.load(URLRequest(url: URL(string: "https://beta.showpass.com/")!))
        return view
    }
    func updateUIView(_ view: WKWebView, context: Context) {}
}

struct ContentView: View {
    var body: some View { BetaWebView() }
}
```

Keep the generated `ShowpassWebViewApp.swift`, which opens `ContentView`. `isInspectable` exposes this QA sample's page to WebKit inspection; it is necessary for modern WKWebView automation.

In **Product → Scheme → Manage Schemes**, mark `ShowpassWebView` as **Shared**. Commit the `.xcodeproj`, shared scheme, and Swift files so CI can build them.

### 2. Build and test

Start the simulator and set `IOS_UDID` using [[09 Appium/Native Safari#4. Create and start a dedicated simulator|Native Safari]]. From `showpass-appium`:

```bash
xcodebuild -project ios-webview/ShowpassWebView.xcodeproj -scheme ShowpassWebView -configuration Debug -sdk iphonesimulator -destination "id=$IOS_UDID" -derivedDataPath ios-webview/build CODE_SIGNING_ALLOWED=NO build
export TARGET=ios-webview
unset APP_ID
export APP_PATH="$PWD/ios-webview/build/Build/Products/Debug-iphonesimulator/ShowpassWebView.app"
npm test
```

Expected: the same WebView smoke test passes with an iOS `WEBVIEW_…` context and returns to native context. Evidence goes to `artifacts/ios-webview/`.

## Use this with the real Showpass app

Continue with [[09 Appium/Showpass Mobile App#Inspect controls and WebViews|Showpass Mobile App: inspect controls and WebViews]]. The reviewed `BaseWebView` already sets `webviewDebuggingEnabled` for React Native WebView. That supports inspection on both Android and current iOS; no speculative product-code change is needed just to enable it.

The actual app does not open the beta homepage immediately like these samples. First identify and automate its native entry steps, then reuse the context-switching portion of the shared test. Changing only `APP_PATH` does not create those missing steps.

## Troubleshooting

| Symptom | Next check |
| --- | --- |
| Only `NATIVE_APP` is listed | Open a screen containing a WebView; confirm the installed build enables debugging/inspection. A native-only screen should have no web context. |
| Android cannot find a matching Chromedriver | Check `artifacts/android-webview/appium/` and `adb shell dumpsys webviewupdate`. The shared config allows scoped auto-download for this target; the host needs network access to the driver download service. |
| Driver download is blocked in CI | Supply an approved matching Chromedriver binary using `appium:chromedriverExecutable`, then remove the auto-download flag. Keep its version paired with the emulator's WebView version. |
| iOS WebView is visible but not inspectable | Check `isInspectable` in a native sample or `webviewDebuggingEnabled` in React Native, and confirm you installed that build. Safari's settings alone do not make an arbitrary app inspectable. |
| Several web contexts/pages exist | Identify the intended app/page by URL and context information. Do not hard-code a runtime-generated context number. |
| Web selectors fail on native controls | Switch back to `NATIVE_APP` before operating native headers, tabs, and dialogs. |
| Sample passes, Showpass fails | Keep the results separate; investigate app navigation, cookies, injected scripts, and native-to-web messages in the real app. |

Next: [[09 Appium/CI#Add WebView and Showpass app jobs|add the passing target to CI]].

Sources: [Android WebView debugging](https://developer.android.com/develop/ui/views/layout/webapps/debugging), [AGP 8.11 compatibility](https://developer.android.com/build/releases/agp-8-11-0-release-notes), [WKWebView inspection](https://developer.apple.com/documentation/webkit/wkwebview/isinspectable), [React Native WebView debugging prop](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#webviewDebuggingEnabled).
