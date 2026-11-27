# Mobile testing proposal

## Framework decision

**Start with Appium + WebdriverIO.** Use one suite for native screens, public checkout in a WebView, and POS manual card entry. Appium also supports physical devices for later POS checks.

- **Detox + Appium** if React Native regression makes up most new PR coverage and timing failures are costly to fix. Weigh Detox’s app-aware waits against maintaining a dedicated build and a second suite. Use Appium for flows Detox can’t complete reliably.
- **Maestro + Appium** if readable smoke tests are the priority. Build on Ger’s proof of concept and use Appium for flows Maestro can’t complete reliably. [SPM-1939](https://showpass.atlassian.net/browse/SPM-1939)

## Framework comparison

| What matters | Appium + WebdriverIO | Detox | Maestro |
| --- | --- | --- | --- |
| **React Native selectors** | Accessibility IDs, labels, Android resource IDs | Test IDs, labels, text | Exposed accessibility IDs, labels, text |
| **Checkout WebView** | Targets Stripe frames in an inspectable WebView. Android needs a compatible ChromeDriver. | WebView actions with experimental secure-field support on iOS only. Verify Stripe entry on Android. | Depends on what the device exposes. Verify Stripe entry on both platforms. |
| **POS manual card entry** | Candidate for the full sale. Verify payment and the saved transaction. | Verify the payment controls support the full sale on the target build. | Verify the payment controls support the full sale on the target build. |
| **Physical devices** | iOS and Android. iPad needs a signed WebDriverAgent. | Local runs on physical Android and iOS simulators. | Local runs on physical Android and iOS simulators. Validate a separate route for physical iOS. |
| **Seat-map pinch** | Documented on iOS and Android | Documented on iOS | Open feature request |
| **Setup and authoring** | JS or TS, WebdriverIO, Appium and drivers. Share helpers across platforms. | JS or TS with Jest. Needs a dedicated test build and Android test APK. | Readable YAML with optional JS. Runs against an installed build. |
| **Waiting** | Waits for controls to be interactable. Assert later outcomes such as ticket issuance. | Waits for tracked app activity to settle. Persistent activity can cause timeouts. | Retries visibility assertions while controls load. |
| **Maintenance** | Drivers, device setup, platform selectors and WebView transitions | Test build, stable test IDs and synchronization exceptions | Shared flows, accessibility selectors and Appium coverage for gaps |
| **Parallel runs** | WebdriverIO shards across GitHub Actions jobs, with one device per session. | Jest workers with separate devices | Maestro CLI sharding across devices |
| **CI and Qase** | WebdriverIO reporter | Jest reporter | Qase CLI upload. The official GitHub Action uses Maestro Cloud. |

### Framework references

- [Appium WebViews on iOS](https://appium.github.io/appium-xcuitest-driver/latest/guides/troubleshooting/) · [Appium WebViews on Android](https://appium.github.io/appium-uiautomator2-driver/latest/guides/hybrid/)
- [Detox WebViews](https://wix.github.io/Detox/docs/api/webviews/) · [Detox build setup](https://wix.github.io/Detox/docs/introduction/project-setup/) · [Detox synchronization](https://wix.github.io/Detox/docs/troubleshooting/synchronization/)
- [Maestro WebView limits](https://docs.maestro.dev/extra-materials/troubleshooting/known-issues#webview-elements-cannot-be-seen-by-maestro) · [Maestro platforms](https://docs.maestro.dev/get-started/supported-platform) · [Maestro pinch request](https://github.com/mobile-dev-inc/Maestro/issues/2169)
- [WebdriverIO auto-wait](https://webdriver.io/docs/autowait/) · [WebdriverIO sharding](https://webdriver.io/docs/sharding/) · [Detox parallel execution](https://wix.github.io/Detox/docs/guide/parallel-test-execution/) · [Maestro CLI sharding](https://docs.maestro.dev/maestro-cli/maestro-cli-commands-and-options)
- [WebdriverIO reporting](https://developers.qase.io/docs/webdriverio) · [Jest reporting](https://developers.qase.io/docs/jest) · [Maestro results upload](https://developers.qase.io/docs/qase-cli#upload-maestro-results) · [Maestro GitHub Action](https://docs.maestro.dev/maestro-cloud/ci-cd-integration/github-actions)
- The [Drizz framework comparison](https://www.drizz.dev/post/detox-vs-appium-vs-maestro-which-mobile-testing-framework-in-2026#s-4-the-comparison-table) informed the setup, authoring and maintenance criteria.

## Initial pass

### Public checkout · iOS and Android

- **Guest purchase.** Start in **Explore**, pay with a Stripe test card in the checkout WebView, and verify ticket issuance.
- **Signed-in purchase.** Complete a purchase and verify it appears in **My orders**.
- **Declined payment.** Use a declined test card and verify that the customer can recover.
- Verify the test can find and fill the Stripe fields, including hosted frames.

### POS sale · Manual card entry

- Start a sale in the venue employee app, choose **manual card entry**, and submit a test card payment.
- Verify the sale completes and the POS transaction is saved.

## CI and reporting

- Keep browser tests in **Playwright**. Run mobile tests in **GitHub Actions**, save failure logs and screenshots, and publish results to **Qase**.
- Track first-attempt pass rate, time from PR trigger to Qase results, and time spent fixing tests after app or build changes.
- Give parallel workers separate accounts, tickets and inventory.

## Follow-up coverage

- **Seat maps.** Check pinch and pan on iOS and Android.

After the initial pass, assess automation on the intended hardware.

- **Square POS on iPad.** Complete a payment, including any app handoff, and verify the saved POS transaction.
- **Stripe Terminal on Android.** Complete a reader payment and verify the saved POS transaction.
- **Camera Check In.** Scan a real barcode and verify the result.
- **Receipt printing.** Trigger a print and verify the receipt.

## Costs at a glance

Appium, WebdriverIO, Detox and the Maestro CLI have free licenses. Estimates are in USD as of November 26, 2026.

- **GitHub Actions.** Estimate **$12.16/month** with a standard Mac runner or **$15.36/month** with a larger Mac runner. Assumes 30 Android and 4 iOS runs at 20 billed minutes each. Factor in build minutes, retries and included usage. [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- **Qase.** **$0 extra** if the current plan covers our results. Free includes 5,000 automated results per month.
- **Optional hosted devices.** BrowserStack starts at **$199/month** for one concurrent test. Pro starts at **$249/month**. Both are billed annually. Budget separately for local POS hardware and maintenance. [BrowserStack pricing](https://www.browserstack.com/pricing)
- **Additional hardware.** We already have hardware on hand. We’re still deciding whether we need dedicated test devices.
- **QA time.** Budget significant QA time to set up the mobile test framework and build the proof of concept. The mobile suite will also add ongoing maintenance as the apps, devices and test tools change.

## Conclusion

- Confirm public checkout and POS manual card entry with the chosen framework.
- If we add a second suite, assign each end-to-end flow to one framework per platform.
