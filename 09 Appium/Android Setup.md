---
title: Android Setup
tags:
  - automation/appium
  - platform/android
---

# Android Setup

Prerequisites: [[09 Appium/Common Setup]] and [[09 Appium/Test Project]]. Use this note on your **Windows computer or Mac** before Android WebView or Showpass app testing. It is not needed for Safari.

## 1. Install Android Studio and Java

1. Install [Android Studio](https://developer.android.com/studio) and complete its setup wizard.
2. Open **More Actions → SDK Manager** from the welcome screen, or **Tools → SDK Manager** from a project.
3. Record the **Android SDK Location** shown there; use that actual path below.
4. Under SDK Platforms, install **Android 16 / API 36**. Under SDK Tools, install **Build-Tools 36.0.0**, Platform-Tools, Android Emulator, and Command-line Tools (latest). Enable Show Package Details to select a specific Build-Tools version.
5. Install the latest maintenance release of **Temurin JDK 17 LTS** from [Adoptium](https://adoptium.net/temurin/releases/?version=17). Configure Android Studio's Gradle JDK to use it for the sample project in WebView. See [[09 Appium/Common Setup#Version policy|the shared version policy]] for why this guide uses Java 17.

JDK 17, SDK 36, and Build-Tools 36.0.0 match the Showpass mobile repository's stated build prerequisites. Android Studio may bundle a different Java version, so check the terminal too.

## 2. Set paths on this computer

### Windows PowerShell

Open **Start → Edit environment variables for your account**. Add these user variables using your actual SDK/JDK locations:

| Variable | Example value |
| --- | --- |
| `ANDROID_HOME` | `C:\Users\yourname\AppData\Local\Android\Sdk` |
| `JAVA_HOME` | Your JDK 17 installation folder, without `\bin` |

Add these separate entries to your user **Path**:

```text
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\cmdline-tools\latest\bin
%JAVA_HOME%\bin
```

Reopen PowerShell and check:

```powershell
$env:ANDROID_HOME
$env:JAVA_HOME
java -version
adb --version
emulator -version
sdkmanager --licenses
```

Read and accept the SDK licenses if you agree. If Java reports a different version, use `Get-Command java` to find the earlier Path entry and correct its order.

### macOS Terminal

Add the following to `~/.zshrc`, using the actual SDK location if it differs:

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
```

Reload and check:

```bash
source ~/.zshrc
java -version
adb --version
emulator -version
sdkmanager --licenses
```

Read and accept the SDK licenses if you agree. Android testing on Mac does not require Xcode.

## 3. Create a dedicated Android emulator

1. In Android Studio, open **Device Manager → Create Virtual Device**.
2. Select a Pixel phone and an **API 36 Google APIs** system image.
3. Choose `arm64-v8a` on an Apple Silicon Mac, or `x86_64` on an Intel Mac/Windows x64 computer. This guide's Windows instructions assume x64.
4. Name the emulator **Showpass_QA_API_36** and finish creation.
5. Press its Play button. Wait until Android's home screen appears and unlock it.
6. In a terminal, run:

```sh
adb devices -l
```

Expected: the emulator is listed with status `device`. Copy its actual serial, for example `emulator-5554`.

**Mac:**

```bash
export ANDROID_SERIAL="emulator-5554"
adb -s "$ANDROID_SERIAL" shell getprop sys.boot_completed
```

**Windows PowerShell:**

```powershell
$env:ANDROID_SERIAL = "emulator-5554"
adb -s $env:ANDROID_SERIAL shell getprop sys.boot_completed
```

Replace the example serial if yours differs. Expected output is `1`. Every Android test uses this serial so another connected device is not selected accidentally.

## 4. Check the Appium driver

From `appium-pof`:

```sh
npx appium driver doctor uiautomator2
```

Fix required failures. Then continue with [[09 Appium/WebView#Android sample app|Android WebView]] or [[09 Appium/Showpass Mobile App#Android beta app|Showpass Android]]. Run the test project on Windows itself, where its emulator and SDK are installed; these instructions do not configure WSL access to a Windows emulator.

## Troubleshooting

| Symptom | Next check |
| --- | --- |
| `adb` is not found | SDK Platform-Tools must be installed and in Path; reopen the terminal. |
| Emulator missing or `offline` | Start/unlock the emulator and wait for its home screen; check `adb devices -l` again. |
| Multiple devices | Set `ANDROID_SERIAL` to the intended emulator. `deviceName` does not select an Android device. |
| Emulator will not start on Windows | Confirm virtualization is enabled and follow Android's [hardware acceleration setup](https://developer.android.com/studio/run/emulator-acceleration). |
| Gradle reports the wrong Java version | Check `java -version`, `JAVA_HOME`, and Android Studio's Gradle JDK. |
| App install reports incompatible ABI | Obtain an APK containing the emulator's CPU architecture; an ARM-only APK will not cover x86_64 CI. |
| Android WebView is missing or too old | Check `adb shell dumpsys webviewupdate`; use the WebView provider supplied with the chosen system image and follow WebView troubleshooting. |

For a physical Android phone later, enable Developer Options and USB debugging, approve the computer on the phone, and select its `adb` serial. App installation can replace an existing app version, so use an appropriate test device.

Sources: [UiAutomator2 requirements](https://github.com/appium/appium-uiautomator2-driver), [Android virtual devices](https://developer.android.com/studio/run/managing-avds), [Showpass mobile prerequisites](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/README.md>).
