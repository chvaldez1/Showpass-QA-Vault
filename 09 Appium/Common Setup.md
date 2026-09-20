---
title: Common Setup
tags:
  - automation/appium
---

# Common Setup

Start at [[09 Appium/Appium]]. Do this once on the first computer. On another computer, clone the completed test project and use step 4.

## 1. Check Node and npm

Open **Terminal** on macOS or **PowerShell** on Windows:

```sh
node --version
npm --version
```

Use **Node 24 LTS** for this Appium project, with the npm version bundled with it (Appium requires npm 10 or newer). As checked on **2026-09-19**, the current LTS download is **24.21.0**. Install that release, or a newer security/maintenance release within Node 24, from [Node.js](https://nodejs.org/en/download), then reopen the terminal and check again.

The reviewed Mac's Node 22.21.1 meets Appium's minimum requirements, but it is not this guide's new-project baseline. Node 22 is in Maintenance LTS; Node 24 is in Active LTS. Node 26 is still Current at this review date. See the [Node release schedule](https://nodejs.org/en/about/previous-releases).

If `showpass-frontend` requires Node 22, use a Node version manager to select that repository's version when building the app and Node 24 when running `showpass-appium`. On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd` and `npx.cmd` in these examples.

### Version policy

| Tool | Version choice | Reason |
| --- | --- | --- |
| Node | 24 LTS; record the exact installed patch in `.node-version` | One Active LTS baseline for the Appium project locally and in CI |
| Java | Latest Temurin 17 LTS maintenance release | Supported LTS line matching Showpass's Android build requirements |
| Appium, drivers, WDIO | Compatible stable releases pinned in npm's lockfile | Use the reviewed package versions below; LTS is not the version label used for these pins |
| Xcode, iOS, Android SDK, Gradle | Explicit compatible versions in the platform notes | Keep the native build tools aligned with the app and CI image |
| Ruby / Fastlane for app builds | Follow the frontend repository's build requirements | A separate app-build toolchain; do not describe it as Node-style LTS |

Java 17 remains a [supported Temurin LTS line](https://adoptium.net/support/), though newer Java LTS versions exist. Update maintenance patches within the chosen runtime lines; change major versions or native build tools deliberately and rerun the local and CI checks.

## 2. Create a separate test project

Keep automation outside this vault and outside `showpass-frontend`. The frontend continues to use its own pnpm setup; this project uses npm so Appium can discover drivers from its dependencies.

**Mac:**

```bash
mkdir -p "$HOME/Documents/Showpass/repos/showpass-appium"
cd "$HOME/Documents/Showpass/repos/showpass-appium"
```

**Windows PowerShell:**

```powershell
New-Item -ItemType Directory -Force "$HOME\Documents\Showpass\repos\showpass-appium"
Set-Location "$HOME\Documents\Showpass\repos\showpass-appium"
```

If this folder already contains a test project, use step 4 instead of initializing over it. Otherwise run the following on either computer:

```sh
npm init -y
npm pkg set type=module
npm pkg set private=true --json
npm pkg set "engines.node=24.x" "engines.npm=>=10"
npm pkg set "scripts.test=wdio run ./wdio.conf.mjs"
npm install --save-dev --save-exact appium@3.7.0 appium-safari-driver@5.0.9 appium-xcuitest-driver@12.12.6 appium-uiautomator2-driver@8.7.0
npm install --save-dev --save-exact @wdio/cli@9 @wdio/local-runner@9 @wdio/mocha-framework@9 @wdio/spec-reporter@9 @wdio/junit-reporter@9 @wdio/appium-service@9 @wdio/globals@9
node -e "require('node:fs').writeFileSync('.node-version', process.versions.node + '\n')"
```

The first install pins the reviewed Appium/driver versions. The second saves exact resolved WDIO versions. Check that `.node-version` contains the Node 24 patch selected in step 1. Keep `package.json`, `package-lock.json`, and `.node-version` together in Git. CI reads that exact Node version and installs the same dependency tree with `npm ci`.

A driver's package does not install Xcode, Java, or an Android SDK. Complete only the device setup needed for your next target.

## 3. Check Appium

This guide uses project-local Appium and drivers. If an old tutorial set `APPIUM_HOME`, clear it in this terminal so it does not override the project:

**Mac:**

```bash
unset APPIUM_HOME
```

**Windows PowerShell:**

```powershell
Remove-Item Env:APPIUM_HOME -ErrorAction SilentlyContinue
```

From the test project, run:

```sh
npx appium --version
npm ls --depth=0
```

Expected: Appium `3.7.0` and the driver/WDIO packages without dependency errors. Use `npx appium` from this project whenever a later step asks for Appium. Do not mix in global driver installs from another tutorial.

Continue with [[09 Appium/Test Project]] to create the test files. The WDIO Appium service starts and stops the server for every test run; you do not need to leave another Appium server running.

## 4. Use the project on another computer

After the first project is saved in your team's Git repository:

1. Clone it into a folder outside the vault.
2. Install the Node version recorded in `.node-version`.
3. Open a terminal in that folder, clear any `APPIUM_HOME` override as above, and run `npm ci`.
4. Follow [[09 Appium/Native Safari]] on a Mac or [[09 Appium/Android Setup]] on Windows/Mac.
5. Set that computer's device ID and app path using the relevant target note. These values are not shared between computers.

Create `.gitignore` in the project with:

```gitignore
node_modules/
artifacts/
apps/
.env
.env.*
!.env.example
.DS_Store
android-webview/local.properties
android-webview/.gradle/
android-webview/**/build/
ios-webview/build/
ios-webview/**/xcuserdata/
```

Commit the tests and buildable sample-app source. Keep downloaded binaries under ignored `apps/`; CI obtains them as build artifacts. Keep frontend secrets and signing credentials out of the vault and test project.

## Shared troubleshooting

| Symptom | What to check |
| --- | --- |
| `EBADENGINE` during installation | Check Node/npm against step 1; use the same Node version locally and in CI. |
| Appium cannot find a driver | Run from the test-project folder, clear `APPIUM_HOME`, then check `npm ls --depth=0`. |
| Port 4723 already in use | End your own Inspector session or manually started Appium server with Ctrl+C before testing. |
| Connection refused / wrong endpoint | Use `127.0.0.1:4723` and path `/`, as in Test Project. Old `/wd/hub` examples do not match this setup. |
| A command works on Mac but not Windows | Use the PowerShell block where provided; `export NAME=value` is Mac/Linux shell syntax. |

Sources: [Appium requirements](https://appium.io/docs/en/latest/quickstart/requirements/), [project-local driver management](https://appium.io/docs/en/latest/guides/managing-exts/), [WDIO Appium service](https://webdriver.io/docs/appium-service/).
