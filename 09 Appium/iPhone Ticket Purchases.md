---
title: iPhone Ticket Purchases
tags:
  - automation/appium
  - platform/mobile
  - qa/purchase
status: Public iPhone WebView purchase verified locally on older simulator build; mobile Box Office unverified on TestFlight 3.7.2 (180)
---

# iPhone Ticket Purchases

This is the first purchase test for the Showpass React Native **beta iPhone app**. Use the [Comic Con Event](https://beta.showpass.com/comic-con/) and one **Adult** ticket for each of two **separate orders**, with the Playwright account fixture `organizationForSystemGatewayPaymentIntent` for the employee side. A **Customer** buys from the public side inside the app's WebView; the saved purchase source is `psp_web`. A **Venue Employee** uses **Point of sale** in the same iPhone app; that native flow is expected to record `psp_mobile_box_office`. The iPad reader-oriented POS is a different client.

Start with [[09 Appium/Showpass Mobile App]] to build and launch the app. [[09 Appium/CI]] explains the simulator runner. This note owns the purchase scenario and proof targets so those setup pages do not repeat the cases.

**Build distinction (October 4, 2026):** The user reports **3.7.2 (180) on TestFlight**. The earlier purchase and Login-exit evidence below used a **3.6.7 (135) simulator build**. A new **locally built 3.7.2 (180) simulator candidate** from pulled frontend commit `c84fbb7ad2` also exits at Login on iOS 26.3; the current source checkout's older version fields were changed only in an isolated build worktree. That candidate is not proof of TestFlight binary parity. No Login, checkout, Box Office, or check-in result has been observed on the actual TestFlight installation because the physical iPhone is unavailable to Xcode. TestFlight's device build cannot be installed into a simulator.

## Shared scenario and safety

| Item | Required before either purchase |
| --- | --- |
| Build | Use a beta simulator `.app` whose bundle ID, version, and build match `appium-pof/config/app-build.json` (currently **3.7.2 (180)**). Run `npm run app:check` against the installed app first. The verified public purchase used an older **3.6.7 (135)** app; it has not been rerun on the new build. |
| Event | The user created Comic Con and confirmed it is available in beta. Select one **Adult** ticket and verify it appears in both app paths. |
| Payment | The user confirmed the Comic Con Venue's Stripe gateway is in **test mode** and selected Stripe's Visa test card ending **4242**. Use a future expiry and test CVC in the payment form; do not record card fields in logs or screenshots. |
| People | Use Playwright's `organizationForSystemGatewayPaymentIntent` account for the organization/employee side; the user confirmed it can access **Point of sale** with card payment. Use a distinct Customer account for the public order and an intended Customer recipient for the employee sale. Do not copy credentials into this note. |
| Expected values | User-provided rate cards show **$25.46 card total** for one $20.00 Adult ticket on both **Mobile** and **Mobile Box Office**. Confirm the current app checkout still matches before submitting either order. |
| Test data | Use a new guest email for each public run. Submit payment once, record the transaction reference, and verify the saved order and issued ticket. Leave the beta test ticket in place; no void is part of this case. |

The user-provided **Mobile** and **Mobile Box Office** rate cards each show the same card calculation: item $20.00 + host fee $1.00 + PST $1.00 + PST on host fee $0.05 + Showpass fee $2.24 + payment processing fee $1.01 + PST on service fees $0.16 = **$25.46**. The Box Office card also lists cash $20.00 and complimentary/free $0.00; these are separate payment methods outside this first card test.

**Mobile:** ![[09 Appium/attachments/comic-con-adult-mobile-rate.png|600]]

**Mobile Box Office:** ![[09 Appium/attachments/comic-con-adult-mobile-box-office-rate.png|600]]

These screenshots establish the supplied rate-card expectation, not a completed checkout or saved transaction. The user separately confirmed Event availability, test mode, and account access. The account fixture is defined in Playwright's `fixtures/staticData/venue-users.ts` and used by `STRIPE_SYSTEM_PAYMENT_INTENT`; the repository search did not establish a Comic Con fixture or organization mapping, so the installed-app run must assert the selected Venue and Event before paying. The older Playwright **TA event for system gateway (payment intent)** fixture is not the Event for this case. [Stripe's test-card guide](https://docs.stripe.com/testing) identifies the selected 4242 Visa as a test card and requires test API keys for test-card use.

## TC-iPhone-public-purchase — Customer buys one ticket

**Description:** In the beta iPhone app, a Customer opens the prepared Event from the public Explore screen and buys one ticket in the embedded checkout. The Event page and checkout are WebView content; the app owns the surrounding navigation.

**Preconditions:** The shared scenario is ready. Start with an empty basket. The observed checkout offers **Log in** and **Continue as guest**. For guest checkout, use a distinct approved email that can receive the ticket plus a full name and valid phone number; the form's source requires all three. Confirm the email in the next dialog before payment. A signed-in Customer route needs a working approved test account.

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Open the app's public Explore view and select the prepared Event. | The correct Event details open inside the app; its name and sale availability match the prepared Event. |
| 2 | Select one **Adult** ticket and continue to checkout. | The basket shows one ticket for Comic Con. Its card total and fee lines match the supplied **Mobile** rate card: **$25.46** for one ticket, subject to a current-rate check. |
| 3 | If using guest checkout, enter the Customer's full name, email, and phone, then select **Continue** and **Confirm** for the email shown. Complete any attendee fields, choose the approved test card, and complete the purchase once. | Checkout advances through the required steps and shows a completed order, not an unresolved or failed payment. Record any shown order reference; if none is shown, find the saved order by the unique Customer and purchase time. Keep payment details out of screenshots and logs. |
| 4 | Open the Customer's order or ticket view. | Exactly one saved order and one usable issued ticket belong to that Customer. The paid amount matches the expected public total; no duplicate order or charge appears. |

## TC-iPhone-mobile-box-office-purchase — Employee sells one ticket

**Description:** In the beta **iPhone** app, a Venue Employee selects **Point of sale** and sells one ticket to a distinct Customer. This is the native mobile Box Office flow, not the iPad POS or website Box Office.

**Preconditions:** The shared scenario is ready. The Employee has access to the correct Venue and the required payment methods. Use a new empty basket and a Customer recipient distinct from the public order. First verify that the build under test opens the Employee Login form; the tested 3.6.7 (135) simulator build did not do so on iOS 18 and 27.

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Sign in as the Venue Employee, select the intended Venue, and open **Point of sale**. | The iPhone Box Office shows the correct Venue and a ticket-selling view. If access is denied or card is absent, stop and record the actual permission/configuration state. |
| 2 | Find Comic Con, select one **Adult** ticket, and continue through cart review. | The cart contains one correct ticket. The total for the selected method matches the **Mobile Box Office** rate card below, subject to a current-rate check. |
| 3 | Enter or select the intended Customer, complete required delivery/details, and select the method for this run. Enter the approved test card for Card, enough cash received for Cash, or **Cheque** under Other; Complimentary needs no payment details. | The recipient is the Customer, not the Employee. The payment screen shows the expected total and a usable **Process order** action. If Card requires a reader on this build, record that configuration blocker for the simulator rather than changing methods mid-run. |
| 4 | Select **Process order** once. | The app shows **Purchase was successful**; do not tap again while the outcome is uncertain. The current confirmation component does not itself display a transaction ID. |
| 5 | Look up the saved transaction using the distinct Customer and purchase time, then open the Customer's ticket. | Record the verified transaction ID. Exactly one saved order and one usable ticket exist, with the selected payment type, amount, recipient, and source `psp_mobile_box_office` in trusted transaction data. Card additionally has one card payment ending 4242. |

### Four payment-method runs

Run the steps above separately with one **Adult** ticket and a fresh Customer reference for each method. On an iPhone, the app offers these four selectable methods for a priced basket when the Venue permits them; **Free** is an automatic zero-total basket state, not a fifth selection for this $20 ticket. The **Other** choice appears only when the Venue has an Other payment option, such as **Cheque**, configured. Confirm the live total before each one-time submission.

| Choice in app | Supplied rate-card total | Saved payment type | Additional proof |
| --- | ---: | ---: | --- |
| Card | $25.46 | 2 | Beta test card ends 4242; one saved card payment. The iPhone direct-card path requires an available gateway and may instead require a connected reader under Stripe Terminal distribution. |
| Cash | $20.00 | 1 | Cash received covers the total; one saved order and ticket. |
| Complimentary | $0.00 | 4 | One issued Adult ticket despite the $0 customer total. |
| Other → Cheque | $20.00 | 9 | Cheque is selected as the configured Other subtype; one saved order and ticket. |

For each run, verify the intended Customer, Venue, one Adult item, one issued ticket, exact customer total, payment type, and purchase source `psp_mobile_box_office` in the saved transaction. Do not submit again while the result is uncertain; search by the run's Customer and time first. The numeric payment types above come from the frontend's `PAYMENT_TYPE_OPTIONS_MAP`; the invoice serializer exposes `payment_type`. The live Venue's enabled methods and Cheque subtype are **not yet observed**.

## Automation contract

Fixed Comic Con and checkout inputs live in `/Users/christianvaldez/Documents/personal/appium-pof/test/shared/data/`; `test/shared/purchase/scenario.ts` composes them with Venue and source expectations. `test/shared/purchase/guest.ts` creates each run's unique Customer email. The read-only `test/shared/purchase/invoice-api.ts` receives that scenario and uses the backend's **exact-email filter** to identify one order, checks Venue, **customer total (`final_amount`)**, card ending and source, then checks the Adult item and issued ticket. The invoice's `amount_paid` was **$22.05** in the verified run; it is not the $25.46 customer total. `test/flows/ios/buyer/public-purchase.ts` prepares the iPhone UI and submits once; its native steps stay under `ios/`, while `test/shared/webview/buyer/payment.ts` owns the embedded checkout DOM. `test/specs/ios/public.purchase.ts` performs the read-back. The discovery spec shares native Explore and guest-checkout steps in `test/screens/ios/buyer/`, matching the app's Buyer screen grouping while leaving room for Android selectors. Add a separate native Employee dashboard → mobile Box Office adapter around the same scenario when its UI is observed. The local `scripts/run-with-playwright-fixtures.ts` reads the existing Customer and Organizer fixture credentials without copying them into this repository; CI must supply protected secrets. Use stable selectors observed from the installed app and WebView; source `testID` values found only in mocks are not evidence of a real accessibility ID. The folder refactor passed the October 3, 2026 guest dry run and live purchase.

Run locally first on a beta simulator build. In GitHub Actions, obtain that same build as a versioned simulator `.app` artifact, create a fresh iPhone simulator, inject credentials as protected secrets, and run each path as a separate job or separately reported test. Restrict purchase runs to manual dispatch until build identity, beta network access, test mode, order read-back, and device selectors are proved on CI. Do not upload card fields, authenticated screenshots, or session logs containing secrets.

## Code review — October 4, 2026

**Readiness:** the Appium project is a sound TypeScript starting point, but the iPhone mobile Box Office purchase suite is **not production-ready**. The latest `npm run check` passes (lint, formatting, TypeScript, fourteen unit tests). No purchase was made for this review; the earlier public guest purchase and both simulator Login exits are the execution evidence below. The actual TestFlight 3.7.2 (180) installation has not been evaluated here.

| Priority | Finding and source | Exit gate |
| --- | --- | --- |
| Blocker on tested simulator builds | `test/specs/ios/box-office.discovery.ts` only tries to open Employee Login. There is no Card, Cash, Complimentary, or Other purchase spec. Both 3.6.7 (135) and the local-source 3.7.2 (180) simulator candidate exited at Login before credentials could be entered; the actual TestFlight build is untested. | Verify Login on the build under test, then reach Point of sale; implement separate, one-submit runs with a fresh Customer reference for each method and saved invoice/ticket proof. |
| High | `test/shared/purchase/invoice-api.ts` asserts the card total and card ending for every scenario, while the backend invoice serializer exposes `payment_type`. It cannot verify Cash ($20.00), Complimentary ($0.00), or Other → Cheque ($20.00). | Parameterize expected total, payment type, card evidence, and Other subtype by method; unit-test all four outcomes. |
| High — code path fixed; hosted run pending | The runner formerly read the local Playwright fixture before choosing a command. It now uses Organizer credentials and guest details from environment variables when supplied, and reads Playwright fixtures lazily for local convenience. | Prove the environment-backed path in an isolated hosted simulator job; no app purchase CI run exists yet. |
| High | The frontend `packages/mobile/src/hooks/dashboard/box-office/useBoxOfficePurchase/index.tsx` sends payment tokens and raw purchase/basket JSON to `logAppInfo`; `packages/mobile/src/util/app-tracking/index.tsx` stores those as Sentry breadcrumbs. | Remove token logging and redact purchase data before treating the mobile payment path or its diagnostics as safe to share. |
| High, regression risk | The newly added iOS `SceneDelegate` in `packages/mobile/ios/mobile/AppDelegate.swift` builds the window but ignores scene URL/user-activity callbacks and launch connection options. Existing Facebook, Google, and React Native URL handling remains only in `AppDelegate`. This is a source-backed callback gap, **not** a proven explanation for the Login crash. | Forward cold- and warm-start callbacks, then verify SSO/deep links on a simulator before shipping the scene migration. |
| Medium — fixed in code | Purchase runs now keep `run.json`, `public-result.json`, JUnit, and Appium diagnostics under `artifacts/ios-app/purchase/runs/<run-tag>/`; the recovery command reads both new markers and the older single-file shape. Reusing a tag with an existing marker fails before checkout. | Prove the new recovery path against a completed beta order; the code change itself passed a marker-isolation unit test. |
| Medium — fixed in code | Recovery now refuses a missing run marker instead of searching from an inferred guest email. The discovery and checkout failure paths no longer save screens or page sources after guest details are entered. | Keep existing local discovery artifacts restricted; verify the revised path on a corrected build before sharing run artifacts. |
| Medium — selector fixed; version maintenance remains | The public iPhone flow now selects the Event banner and ticket quantity controls by scenario name instead of requiring Adult to be the first of exactly two ticket types. Its new ticket-control XPath matched one Adult increment control in the saved accessibility tree; a device rerun is still needed. `scripts/ios-simulator-matrix.ts` explicitly lists the three current iOS major families. | Prove the selector in a no-submit device run and review the iOS release list when Apple adds a major version. |
| Planned CI gate | `.github/workflows/appium.yml` runs quality checks and manually dispatched Safari smoke tests only. JUnit is now enabled for purchase and organizer runs, but no hosted app job builds/installs Showpass or publishes those reports. | Add a protected, versioned app artifact and simulator job after local proof; keep credential-bearing artifacts restricted and individually reported. |

## Coverage and current evidence

| Proof target | Coverage | Evidence / remaining gap |
| --- | --- | --- |
| Public app Event → embedded checkout | Appium verified locally | On iOS 18.6, native Explore found Comic Con, the embedded page loaded, one Adult opened checkout at **$25.46**, and guest details, card, and billing address were entered. On October 3, 2026, the first no-payment dry run stopped while advancing to payment; a second fresh guest dry run reached the filled payment form and passed. The first failure remains intermittent and is not a confirmed checkout defect. With one simulator booted and `additionalWebviewBundleIds: ['*']`, Appium found `NATIVE_APP` and `WEBVIEW_…` contexts. |
| iPhone Point of sale → native mobile Box Office | Blocked on both tested simulator builds; TestFlight 3.7.2 (180) unverified | `DashboardScreen.tsx` routes iPhone to `MobileBoxOfficeScreen`. The 3.6.7 (135) app exited at Login on iOS 18.6 and 27.0. The local-source 3.7.2 (180) candidate exited at the same step on iOS 26.3. No credentials, payment controls, or orders were reached. |
| Public saved order and ticket | Verified through beta invoice and ticket APIs | An earlier guest purchase created transaction `8d-7fd8-4a03-bc7f-36fa45dce8a4`; its app confirmation ID was not retained. The October 3, 2026 guest run created one new transaction `2b-0c81-49a3-bfc4-222e742869cc` in Venue **1547**: one Comic Con Adult item, `final_amount` **$25.46**, source `psp_web`, card ending 4242, and one issued ticket. The app confirmation ID matched the saved transaction. Payment was submitted once; no void was sent. |
| Public source | Verified | The saved WebView checkout source was `psp_web`; the Explore search API's `psp_mobile` value describes discovery, not this WebView payment. |
| `psp_mobile_box_office` source, method, and recipient | Source-backed intent; blocked end to end | The iPhone purchase hook sets the source for Card/Cash/Complimentary/Other unless a Stripe Terminal card path is active; no saved Box Office transaction has been inspected. |
| Customer delivery and admission | Deferred | The invoice matched the unique guest email and one ticket barcode was issued. Receipt-email delivery, the Customer's ticket screen, and barcode admission were not exercised. |
| Inventory and financial reconciliation | Deferred | One order and its customer total were checked. Inventory change, Organizer reports, settlement, and the payment provider's charge ledger were not independently checked. |
| Cancel, failure, retry, and delayed payment outcomes | Deferred | This first run proves the clean successful path only. Future cases must use separate orders and avoid retrying an uncertain payment click. |
| Test data retained | By design | The issued beta test ticket remains available for inspection. No void was sent. |
| Reader, printing, iPad POS, Android app | Manual-only / deferred | Separate platform and hardware coverage; these are not proved by an iPhone simulator. |

The shared-folder refactor passed `npm run check` (lint, formatting, TypeScript, and five unit tests), a no-submit guest dry run, and one live **guest** test-card purchase with `REUSE_INSTALLED_APP=1` on Node 24 and iOS 18.6. The paid run verified the app confirmation against the saved transaction and issued ticket. **Continue as guest** requires full name, email, and phone before step 2. The first dry run on October 3 failed at the add-ons-to-payment transition without submitting; a second dry run passed, so investigate only if this recurs. The first login-fixture attempt did not reach the next step and remains inconclusive; no signed-in Customer purchase was run in this verification. An iOS 26.3 attempt remained on **Loading event** for over a minute while both simulators were booted; repeat it with only one simulator before attributing the result to an iOS version. Next build and observe the native iPhone Box Office flow, then wire versioned app artifacts into CI.

The run selected **Continue as guest** and used a fresh email. Backend `TicketBasket.make_stripe_payment_data` adds a Stripe `customer` to the PaymentIntent payload only for a system Stripe basket with a linked user; this supports the guest-only choice. The Stripe Customer list was not queried, so zero new Stripe Customer records is not independently proved.

On October 4, 2026, an Appium employee-entry diagnostic reached the Account tab on the newly rebuilt 3.6.7 (135) simulator app. Tapping **Login** caused `com.showpass.swift.beta` to exit before the email form appeared on both iOS 18.6 and 27.0. The iOS 18 crash report shows `SIGABRT` in `swift_task_dealloc`; it does not identify a proven product-source cause. No login credentials were entered and **no mobile Box Office order or payment was created**. The diagnostic code is `test/specs/ios/box-office.discovery.ts`; its screenshots and accessibility trees are under `artifacts/ios-app/box-office/discovery/` and `artifacts/ios-app/screenshots/` in the Appium project. Do not retry this build's Login repeatedly. Resume the four purchases only after a beta simulator build reaches the Employee Login form, then observe actual POS selectors, run no-submit preparation first, and submit each method once with saved-order read-back.

The follow-up iOS 26.3 run used a separate simulator build labeled **3.7.2 (180)** from pulled source commit `c84fbb7ad2`. The build succeeded, `npm run app:check` verified the installed app, and the first-launch location prompt was dismissed. Appium reached **Account → Login**; tapping Login then exited the app before the email form. The macOS crash report `mobile-2026-10-04-142852.ips` identifies this bundle/version/build and records `SIGABRT` in `swift_task_dealloc`; the report does not prove the underlying cause. A prior attempt was blocked by the location prompt, and an app-path run left a stale 3.6.7 (135) installation; neither is counted as a 3.7.2 Login result. The runner now verifies the installed version again after its session starts. No credentials were entered and no order was created. The actual TestFlight build remains untested.

## Source anchors

- Frontend: `packages/mobile/src/screens/BuyerScreens/PurchaseScreen/PurchaseScreen.tsx`, `packages/mobile/src/screens/DashboardScreen/DashboardScreen.tsx`, `packages/mobile/src/screens/Dashboard/BoxOffice/MobileBoxOffice/MobileBoxOfficeScreen/MobileBoxOfficeScreen.tsx`, `packages/mobile/src/screens/Dashboard/BoxOffice/MobileBoxOffice/MobilePaymentInfo/MobilePaymentInfo.tsx`, `packages/mobile/src/components/BoxOffice/CartConfirmation/CartConfirmation.tsx`.
- Playwright: `fixtures/staticData/venue-users.ts` (`organizationForSystemGatewayPaymentIntent`), `shared/constants/payment-processors.ts`, `tests/shared/checkout/events/single-event-box-office.steps.ts` (web flow reference only).
- Backend: `apps/financials/constants/purchase_sources.py` in `web-app`.
- Backend: `apps/financials/api/venue_based/serializers/invoices.py` exposes the numeric `venue` and `venue_id`, customer `final_amount`, purchase source, and card ending; `apps/financials/api/venue_based/viewsets/invoices.py` exposes the saved invoice and issued tickets by transaction reference.
