# Mobile testing proposal

## Framework decision

- **One suite · Appium + WebdriverIO.** Choose Appium to cover both public checkout and POS with one mobile stack. Use this if we want one framework for native screens, embedded checkout, and eventual physical-device coverage.
- **Two suites · Detox + Appium + WebdriverIO.** Use Detox if native React Native regression becomes the bulk of PR coverage. Use Appium for journeys Detox can’t complete reliably.
- **Two suites · Maestro + Appium + WebdriverIO.** Choose this if we want to build on the Maestro proof of concept Ger started. Use Maestro for flows it can cover reliably and Appium for the gaps. [SPM-1939](https://showpass.atlassian.net/browse/SPM-1939)

## Framework comparison

| What matters                              | Appium + WebdriverIO                                                                                                                     | Detox                                                                                                                                                                                                   | Maestro                                                                                                                                        |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Best fit**                              | One suite for public checkout and POS                                                                                                    | React Native regression in PRs, with Appium for gaps                                                                                                                                                    | Build on Ger’s smoke-test proof of concept, with Appium for gaps                                                                               |
| **React Native controls**                 | Uses platform accessibility IDs, labels, and Android resource IDs                                                                        | Matches React Native test IDs, labels, or text                                                                                                                                                          | Matches exposed accessibility IDs, labels, or text                                                                                             |
| **Public checkout WebView**               | Switches into an inspectable WebView and targets Stripe frames. Android needs a compatible ChromeDriver.                                 | Supports WebView actions. The experimental secured-field API is iOS-only. Verify Stripe entry on Android.                                                                                               | WebView controls depend on what the device exposes. Verify that the Stripe fields can be found and filled on both platforms.                   |
| **POS manual card entry**                 | Candidate for the full sale. Verify payment submission and the saved transaction on the target build.                                    | Use if the assigned build and payment controls work through the full sale.                                                                                                                              | Use if the payment controls are accessible through the full sale.                                                                              |
| **Physical devices for later POS checks** | Supports physical iOS and Android. iPad needs a signed WebDriverAgent.                                                                   | Local runner supports physical Android and iOS simulators.                                                                                                                                              | Local CLI supports physical Android and iOS simulators. Physical iOS needs a separate route to validate.                                       |
| **Seat-map pinch**                        | Documented on iOS and Android                                                                                                            | Documented on iOS                                                                                                                                                                                       | Open feature request                                                                                                                           |
| **Getting started**                       | JS or TS. Set up WebdriverIO, Appium, and an iOS and Android driver.                                                                     | JS or TS with Jest. Requires a dedicated test build and Android test APK.                                                                                                                               | YAML with optional JS. Run against an installed build. Ger’s proof of concept gives us a starting point.                                       |
| **Auto-wait**                             | WebdriverIO waits for elements to be visible and interactable before actions. Use assertions for later outcomes such as ticket issuance. | Waits for tracked app activity, including network requests and animations, to settle before proceeding. This can reduce timing-related flakes. Ongoing work that keeps the app busy can cause timeouts. | Retries visibility assertions while waiting for expected controls.                                                                             |
| **Writing and reviewing tests**           | A TypeScript suite can share helpers across platforms. Expect more driver and platform details in complex flows.                         | App-aware waits and React Native test IDs make native journeys straightforward to express in Jest.                                                                                                      | Short YAML flows are easy for QA and product teammates to review. Complex flows can need reusable subflows or scripts.                         |
| **What takes upkeep at scale**            | Driver and device setup, platform-specific selectors, and explicit checks when the app changes screens or enters a WebView.              | The dedicated build and synchronization exceptions when tracked activity keeps the app busy. Stable native test IDs still matter.                                                                       | Shared YAML flows and accessibility selectors as screens diverge across platforms. Appium has to own journeys that cannot complete in Maestro. |
| **Parallel runs**                         | Shard test files across GitHub Actions jobs with WebdriverIO. Each parallel mobile session needs a device.                               | Run multiple Jest workers with separate devices.                                                                                                                                                        | Split flows across multiple devices with Maestro CLI sharding.                                                                                 |
| **CI and Qase**                           | WebdriverIO reporter                                                                                                                     | Jest reporter                                                                                                                                                                                           | CLI in CI and Qase CLI upload. The official GitHub Action uses Maestro Cloud.                                                                  |

[Appium WebViews on iOS](https://appium.github.io/appium-xcuitest-driver/latest/guides/troubleshooting/) · [Appium WebViews on Android](https://appium.github.io/appium-uiautomator2-driver/latest/guides/hybrid/) · [Detox WebViews](https://wix.github.io/Detox/docs/api/webviews/) · [Detox build setup](https://wix.github.io/Detox/docs/introduction/project-setup/) · [Maestro WebView limits](https://docs.maestro.dev/extra-materials/troubleshooting/known-issues#webview-elements-cannot-be-seen-by-maestro) · [Maestro platforms](https://docs.maestro.dev/get-started/supported-platform) · [Maestro pinch request](https://github.com/mobile-dev-inc/Maestro/issues/2169)

[WebdriverIO auto-wait](https://webdriver.io/docs/autowait/) · [Detox synchronization](https://wix.github.io/Detox/docs/troubleshooting/synchronization/)

[WebdriverIO sharding](https://webdriver.io/docs/sharding/) · [Detox parallel execution](https://wix.github.io/Detox/docs/guide/parallel-test-execution/) · [Maestro CLI sharding](https://docs.maestro.dev/maestro-cli/maestro-cli-commands-and-options)

[WebdriverIO reporting](https://developers.qase.io/docs/webdriverio) · [Jest reporting](https://developers.qase.io/docs/jest) · [Maestro results upload](https://developers.qase.io/docs/qase-cli#upload-maestro-results) · [Maestro GitHub Action](https://docs.maestro.dev/maestro-cloud/ci-cd-integration/github-actions)

[Drizz framework comparison](https://www.drizz.dev/post/detox-vs-appium-vs-maestro-which-mobile-testing-framework-in-2026#s-4-the-comparison-table) informed the setup, authoring, and maintenance criteria.

## Initial pass

### Public checkout · iOS and Android

- Start in **Explore**, complete a purchase in the checkout WebView using a Stripe test card, and verify that the app issues the ticket.
- Cover guest checkout and confirm signed-in purchases appear in **My orders**. Include a declined test payment to check that the customer can recover.
- Verify that the framework assigned to checkout can find and fill the payment fields, including any hosted frames.

### POS sale · Manual card entry

- Start a sale in the venue employee app, select **manual card entry**, and have the test enter test card details and submit payment.
- Verify that the sale completes and the POS transaction is saved.

## CI and reporting

- Keep browser coverage in **Playwright**. Run the mobile tests in **GitHub Actions**, save logs and screenshots on failure, and publish results to **Qase**.
- **Measure as the suite grows.** Track first-attempt pass rate, time from the PR trigger to Qase results, and time spent fixing tests after app or build changes. When parallelizing, use separate test data so workers don’t compete for the same accounts, tickets, or inventory.
- **Revisit a second suite when there’s a clear payoff.** If native PR tests account for most new coverage and timing-related failures are taking time to fix, weigh Detox’s synchronization against maintaining a dedicated build and two test suites. [Detox build setup](https://wix.github.io/Detox/docs/introduction/project-setup/)

## Follow-up coverage

- **Seat maps** — Check pinch and pan on iOS and Android.

After the initial pass, assess hardware automation on the intended equipment.

- **Square POS on iPad** — Complete a payment, including any app handoff, and verify the saved POS transaction.
- **Stripe Terminal on Android** — Complete a reader payment and verify that the POS transaction is saved.
- **Camera Check In** — Verify the result of scanning a real barcode.
- **Receipt printing** — Trigger a print and verify the receipt.

## Costs at a glance

Appium, WebdriverIO, Detox, and the Maestro CLI have free licenses. All estimates are in USD as of November 26, 2026.

- **CI example** — 30 Android runs and 4 iOS runs per month at 20 billed minutes each. Estimated GitHub Actions cost is **$12.16** with a standard Mac runner or **$15.36** with a larger Mac runner. Include build minutes, retries, and included usage in the estimate for the initial pass. [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- **Qase reporting** — Qase adds **$0** if the current plan covers our results. Free allows 5,000 automated results a month.
- **Optional hosted devices** — BrowserStack starts at **$199/month** for one concurrent test, with Pro at **$249/month**, both billed annually. Budget separately for local POS hardware and maintenance. [BrowserStack pricing](https://www.browserstack.com/pricing)

## Conclusion

Choose **Appium + WebdriverIO** for the initial pass. It can target hosted Stripe fields in an inspectable WebView and gives us one suite for public checkout and POS manual card entry. Confirm both flows on the target builds as part of implementation.

If native React Native PR coverage becomes the main source of new tests, consider **Detox + Appium**. Detox’s app-aware waits can reduce timing work on native flows, while Appium owns the journeys Detox can’t complete. If we want to build on Ger’s work and prioritize readable smoke flows, choose **Maestro + Appium**. With either mix, give each end-to-end flow one framework owner per platform.
