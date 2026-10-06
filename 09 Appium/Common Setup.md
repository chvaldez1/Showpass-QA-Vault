---
title: Common Setup
tags:
  - automation/appium
---

# Common Setup

Start at [[09 Appium/Appium]]. The runnable project is **`/Users/christianvaldez/Documents/personal/appium-pof`**, separate from this QA vault and the Showpass product repositories. Open that project's `README.md` for the shortest first run. This note explains the tools and shared setup once.

## 1. Check Node and npm

On your Mac, open Terminal. On Windows, open PowerShell:

```sh
node --version
npm --version
```

Use **Node 24 LTS**. The project records the exact baseline in `.node-version` (`24.21.0` at this review). If you use `nvm`, run `nvm install` and `nvm use` from the project folder; otherwise install Node 24 LTS from [Node.js](https://nodejs.org/en/download). Reopen the terminal and confirm `node --version` begins with `v24.`. Appium requires npm 10 or newer. The Mac inspected on 2026-10-03 currently has Node 26.3.0; select Node 24 for this project without changing the frontend repository's Node version.

On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd` and `npx.cmd`.

### Version policy

| Tool | Choice | Where recorded |
| --- | --- | --- |
| Node | 24 LTS | `.node-version` and `package.json` |
| Appium, Safari/XCUITest/UiAutomator2 drivers, WebdriverIO | Exact compatible package versions | `package.json` and `package-lock.json` in `appium-pof` |
| Xcode and iOS runtime | Compatible installed pair | Check on the Mac; CI records its actual versions |
| Java and Android SDK | Follow [[09 Appium/Android Setup]] when you reach Android | Android setup note |

Appium and its drivers are npm packages, not tools with an LTS release line. The lockfile keeps local and CI installs on the same versions.

## 2. Install this project

Change to the existing project and install what its lockfile specifies:

**Mac:**

```sh
cd /Users/christianvaldez/Documents/personal/appium-pof
npm ci
```

**Windows PowerShell:** clone `https://github.com/chvaldez1/appium-pof` into a folder outside this vault, change into that folder, then run `npm ci`. The new starter files must be pushed to GitHub before another machine can clone them.

`npm ci` creates `node_modules/` locally. It does not install Xcode, Safari, an iOS runtime, Java, or Android Studio. Those platform tools are covered in their target notes. Keep app binaries in ignored `apps/`, not in Git.

## 3. Check Appium

If a previous tutorial set `APPIUM_HOME`, clear it in this terminal so project-local drivers are used. On Mac: `unset APPIUM_HOME`. On PowerShell: `Remove-Item Env:APPIUM_HOME -ErrorAction SilentlyContinue`.

From `appium-pof`:

```sh
npx appium --version
npm ls --depth=0
```

Expected: Appium and all locked packages appear without dependency errors. `npm test` starts and stops Appium automatically through WebdriverIO; there is no separate server to keep running. Continue with [[09 Appium/Test Project]] to see where the code lives, then [[09 Appium/Native Safari]] for the first run.

## 4. Use the project on another computer

Clone the same repository, select the Node version in `.node-version`, run `npm ci`, and follow the platform note for that computer. Device IDs and app build paths are local to each machine. Do not copy your Mac's simulator UUID into Windows or CI.

## Shared troubleshooting

| Symptom | What to check |
| --- | --- |
| `EBADENGINE` during installation | Confirm Node 24 and npm 10+ in this terminal. |
| Appium cannot find a driver | Run from `appium-pof`, clear `APPIUM_HOME`, and check `npm ls --depth=0`. |
| Port 4723 already in use | End your own Inspector or manually started Appium server before testing. |
| Connection refused / wrong endpoint | The starter uses `127.0.0.1:4723` with path `/`, not `/wd/hub`. |

Sources: [Appium requirements](https://appium.io/docs/en/latest/quickstart/requirements/), [project-local driver management](https://appium.io/docs/en/latest/guides/managing-exts/), [WDIO Appium service](https://webdriver.io/docs/appium-service/).
