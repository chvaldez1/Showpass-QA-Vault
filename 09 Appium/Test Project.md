---
title: Test Project
tags:
  - automation/appium
---

# Test Project

Prerequisite: [[09 Appium/Common Setup]]. Create these files **inside `showpass-appium`**, using a text editor such as VS Code. Copy code inside the fences, not the fences themselves. Filenames ending in `.mjs` contain JavaScript modules; no TypeScript compiler is needed.

This is the only shared configuration and test implementation. Target notes provide device preparation and run commands.

## 1. Create the folders

Run from the test project on either Mac or Windows:

```sh
node -e "for (const p of ['test/specs','test/helpers','scripts','apps']) require('node:fs').mkdirSync(p,{recursive:true})"
```

## 2. Create `test/settings.mjs`

```javascript
export const target = process.env.TARGET || 'desktop-safari';
export const baseURL = 'https://beta.showpass.com/';
export const appId = process.env.APP_ID || (
  target.endsWith('-webview') ? 'com.example.showpasswebview' :
  target === 'ios-app' ? 'com.showpass.swift.beta' :
  target === 'android-app' ? 'com.showpass.android.beta' : ''
);
```

The beta URL is deliberately fixed for this starter project. Changing it does not change a Showpass app's compiled environment; use a beta app build too.

## 3. Create `wdio.conf.mjs`

```javascript
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { target, baseURL, appId } from './test/settings.mjs';

const targets = [
  'desktop-safari', 'ios-safari', 'ios-app', 'android-app',
  'ios-webview', 'android-webview',
];
if (!targets.includes(target)) throw new Error(`Unknown TARGET: ${target}`);
const isIOS = target.startsWith('ios-');
const isAndroid = target.startsWith('android-');
const isWebView = target.endsWith('-webview');
const isApp = target.endsWith('-app') || isWebView;
if (!isAndroid && process.platform !== 'darwin') {
  throw new Error(`${target} requires macOS on the Appium host.`);
}
const required = (name) => {
  if (!process.env[name]) throw new Error(`Set ${name} before running ${target}.`);
  return process.env[name];
};
const output = resolve('artifacts', target);
for (const folder of ['appium', 'wdio', 'junit', 'screenshots']) {
  mkdirSync(resolve(output, folder), { recursive: true });
}

let capabilities;
if (target === 'desktop-safari') {
  capabilities = {
    platformName: 'mac', browserName: 'Safari',
    'appium:automationName': 'Safari',
  };
} else if (isIOS) {
  capabilities = {
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:udid': required('IOS_UDID'),
    'appium:newCommandTimeout': 180,
    'appium:wdaLaunchTimeout': 180000,
  };
  if (!isApp) capabilities.browserName = 'Safari';
} else {
  capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:udid': required('ANDROID_SERIAL'),
    'appium:newCommandTimeout': 180,
    'appium:adbExecTimeout': 60000,
  };
}
if (isApp) {
  const app = resolve(required('APP_PATH'));
  if (!existsSync(app)) throw new Error(`APP_PATH does not exist: ${app}`);
  const expectedExtension = isIOS ? '.app' : '.apk';
  if (extname(app) !== expectedExtension) {
    throw new Error(`Use a ${expectedExtension} build for this target.`);
  }
  Object.assign(capabilities, {
    'appium:app': app,
    'appium:noReset': true,
    'appium:fullReset': false,
    'appium:autoWebview': false,
    [isIOS ? 'appium:bundleId' : 'appium:appPackage']: appId,
  });
  if (isIOS) capabilities['appium:forceAppLaunch'] = true;
  if (isAndroid) capabilities['appium:appWaitActivity'] = '*';
}
if (isAndroid && isWebView) {
  capabilities['appium:ensureWebviewsHavePages'] = true;
  capabilities['appium:enableWebviewDetailsCollection'] = true;
}

const serverArgs = {
  address: '127.0.0.1',
  useDrivers: [isIOS ? 'xcuitest' : isAndroid ? 'uiautomator2' : 'safari'],
};
if (isAndroid && isWebView) {
  serverArgs.allowInsecure = ['uiautomator2:chromedriver_autodownload'];
}
export const config = {
  runner: 'local',
  hostname: '127.0.0.1', port: 4723, path: '/',
  maxInstances: 1,
  specs: [`./test/specs/${isWebView ? 'webview' : isApp ? 'app' : 'safari'}.smoke.mjs`],
  capabilities: [capabilities],
  baseUrl: baseURL,
  logLevel: 'info',
  outputDir: resolve(output, 'wdio'),
  waitforTimeout: 30000,
  connectionRetryTimeout: 240000,
  connectionRetryCount: 0,
  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 240000 },
  services: [['appium', {
    logPath: resolve(output, 'appium'),
    appiumStartTimeout: 120000,
    args: serverArgs,
  }]],
  reporters: ['spec', ['junit', {
    outputDir: resolve(output, 'junit'),
    outputFileFormat: ({ cid }) => `${target}-${cid}.xml`,
  }]],
  before: async function () {
    writeFileSync(resolve(output, 'session.json'), JSON.stringify({
      target, node: process.version, platform: process.platform,
      architecture: process.arch, capabilities: browser.capabilities,
    }, null, 2));
  },
  afterTest: async function (test, context, { passed }) {
    const name = test.title.replace(/[^a-z0-9-]/gi, '_').slice(0, 90);
    try {
      await browser.saveScreenshot(resolve(
        output, 'screenshots', `${Date.now()}-${passed ? 'pass' : 'fail'}-${name}.png`,
      ));
    } catch (error) {
      console.warn(`Screenshot unavailable: ${error.message}`);
    }
  },
};
```

One session runs at a time. The Android WebView target alone enables automatic download of a matching Chromedriver; the server stays on the local computer's loopback address. `noReset` preserves existing app data, so use the dedicated simulator/emulator from the device notes. Installing `APP_PATH` can still replace that app's installed version.

## 4. Create `test/helpers/beta-page.mjs`

```javascript
import assert from 'node:assert/strict';
import { browser } from '@wdio/globals';
import { baseURL } from '../settings.mjs';

export async function assertBetaPage() {
  await browser.waitUntil(async () => {
    try {
      return new URL(await browser.getUrl()).origin === new URL(baseURL).origin;
    } catch { return false; }
  }, { timeout: 60000, timeoutMsg: 'Expected the Showpass beta origin.' });
  await browser.waitUntil(async () => {
    return browser.execute(() =>
      document.readyState === 'complete' &&
      Boolean(document.body?.innerText.trim()),
    );
  }, { timeout: 60000, timeoutMsg: 'The page did not finish loading visible text.' });
  assert.match(await browser.getTitle(), /showpass/i, 'Expected a Showpass page title.');
}
```

This deliberately small check proves a recognizable beta page loaded. An error page can also contain the site name, so this is not a checkout or homepage-feature test. Add specific user-visible assertions when expanding coverage.

## 5. Create `test/specs/safari.smoke.mjs`

```javascript
import { browser } from '@wdio/globals';
import { baseURL } from '../settings.mjs';
import { assertBetaPage } from '../helpers/beta-page.mjs';

describe('Safari setup', () => {
  it('loads Showpass beta', async () => {
    await browser.url(baseURL);
    await assertBetaPage();
  });
});
```

Desktop and mobile Safari use this exact test. Capabilities select the actual browser.

## 6. Create `test/specs/app.smoke.mjs`

```javascript
import assert from 'node:assert/strict';
import { browser } from '@wdio/globals';
import { appId } from '../settings.mjs';

describe('App setup', () => {
  it('puts the selected beta app in the foreground', async () => {
    await browser.activateApp(appId);
    await browser.waitUntil(async () => (await browser.queryAppState(appId)) === 4, {
      timeout: 30000, timeoutMsg: 'The app is not running in the foreground.',
    });
    assert.ok((await browser.getPageSource()).length > 0);
  });
});
```

A green launch check can still show a loading screen or JavaScript error. Inspect the screenshot and app once, then add a real landing-screen assertion using [[09 Appium/Showpass Mobile App#Inspect controls and WebViews|Inspector]]. Do not label this starter test a functional app pass.

## 7. Create `test/specs/webview.smoke.mjs`

This test is for the sample apps in [[09 Appium/WebView]], which open beta immediately. The Showpass app needs an additional native navigation flow before this can become its automated WebView test.

```javascript
import assert from 'node:assert/strict';
import { browser } from '@wdio/globals';
import { baseURL } from '../settings.mjs';
import { assertBetaPage } from '../helpers/beta-page.mjs';

describe('Embedded WebView setup', () => {
  it('finds beta in a WebView and returns to native controls', async () => {
    assert.equal(await browser.getContext(), 'NATIVE_APP');
    let lastContexts = [];
    let lastError = '';
    try {
      await browser.waitUntil(async () => {
        await browser.switchContext('NATIVE_APP');
        lastContexts = await browser.getContexts();
        const ids = lastContexts.map((c) => typeof c === 'string' ? c : c.id);
        for (const id of ids.filter((id) => id?.startsWith('WEBVIEW'))) {
          try {
            await browser.switchContext(id);
            for (const handle of await browser.getWindowHandles()) {
              await browser.switchToWindow(handle);
              if (new URL(await browser.getUrl()).origin === new URL(baseURL).origin) {
                return true;
              }
            }
          } catch (error) { lastError = error.message; }
          await browser.switchContext('NATIVE_APP');
        }
        return false;
      }, { timeout: 90000, interval: 1500, timeoutMsg: 'No inspectable beta WebView found.' });
      await assertBetaPage();
    } catch (error) {
      console.error({ lastContexts, lastError });
      throw error;
    } finally {
      await browser.switchContext('NATIVE_APP');
    }
    assert.equal(await browser.getContext(), 'NATIVE_APP');
  });
});
```

The test checks each available page's origin instead of blindly choosing the first WebView. It does not type into or submit the page.

## 8. Run a target and read results

Continue with [[09 Appium/Native Safari]] for the first run. Other targets are documented in [[09 Appium/WebView]] and [[09 Appium/Showpass Mobile App]]. Environment variables set in a terminal apply to later commands in that terminal; `.env` is not automatically loaded.

| Variable | Used by | Value |
| --- | --- | --- |
| `TARGET` | All | One of the six target names in the config; default `desktop-safari` |
| `IOS_UDID` | iOS | ID copied from `xcrun simctl list devices available` |
| `ANDROID_SERIAL` | Android | ID from `adb devices -l` |
| `APP_PATH` | App and WebView | Absolute `.app` directory or `.apk` file path |
| `APP_ID` | App and WebView | Usually omit: defaults are in settings; set only for another app |

Expected: a passing test in the terminal and output under `artifacts/<target>/`: Appium logs, WDIO logs, JUnit XML, a screenshot, and session details. Session-creation failures may have logs but no screenshot or JUnit file.

Keep results for the relevant run before running it again; this starter reuses report filenames. Treat logs/screenshots from future authenticated tests as private artifacts.

Sources: [WDIO configuration](https://webdriver.io/docs/configuration/), [Appium service](https://webdriver.io/docs/appium-service/), [JUnit reporter](https://webdriver.io/docs/junit-reporter/), [context commands](https://webdriver.io/docs/api/mobile/getContexts/), [UiAutomator2 capabilities](https://github.com/appium/appium-uiautomator2-driver), [XCUITest capabilities](https://appium.github.io/appium-xcuitest-driver/latest/reference/capabilities/).
