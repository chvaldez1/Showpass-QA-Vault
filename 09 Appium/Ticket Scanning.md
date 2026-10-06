---
title: Ticket Scanning Proof of Concept
tags:
  - automation/appium
  - qa/check-in
---

# Ticket Scanning Proof of Concept

**Status (October 4, 2026, Edmonton): no Appium scanning test file exists yet, and no ticket was checked in.** The proof of concept completed a read-only backend ticket lookup, then stopped when both tested simulator builds exited before employee login. The earlier 3.6.7 (135) build and a local-source 3.7.2 (180) candidate exited after Login was tapped; see [[09 Appium/iPhone Ticket Purchases]] for the latter's evidence. The actual TestFlight 3.7.2 (180) build has not been tested for Login or scanning because the physical iPhone is unavailable to Xcode. This note records the attempted proof of concept, not a passing test.

## What we are trying to prove

An employee of **Organization For System Gateway Payment Intent** selects Comic Con in the beta Showpass iPhone app, presents one paid Adult ticket for admission, and sees one successful check-in. A later read of the ticket and its history must show one saved `pickup` and a used ticket. A second presentation must not admit the same single-use ticket again. This is an admission-state test, separate from purchasing the ticket.

The local Appium project is `/Users/christianvaldez/Documents/personal/appium-pof`. It already reads the named `organizationForSystemGatewayPaymentIntent` account from the local Playwright fixture at runtime. Do not copy its password into this note, the Appium repository, commands, or artifacts.

## Source-backed paths

| Path | What it exercises | Current classification |
| --- | --- | --- |
| Camera barcode on a physical iPhone | Native Vision Camera decoding, the app's `performScan` and `performTicketScan` path, and the saved check-in | **Blocked**: no connected physical test iPhone or camera-capable hosted runner was used. |
| Exact barcode in **Search customer** on the iPhone simulator | Staff UI selection and `performBulkScan` → `completeTicketScan` → the same saved `pickup` endpoint | **Blocked on both tested simulator builds**: they exited when Login was opened. This is a useful simulator admission test after login works, but it does not prove optical decoding. |
| Backend scan lookup | Resolves the ticket without checking it in | **API/backend verified, read only** for the purchased ticket below. This is not admission proof. |

The app's camera implementation is `packages/mobile/src/components/Scanner/CameraScanner/CameraScanner.tsx`; it waits for repeated `qr`, `code-39`, or `code-128` detections before calling `performScan`. The alternate search path is `TicketSearchInputScreen.tsx` → `TicketSearchCheckInScreen.tsx` → `SearchCheckInButton.tsx`; the employee can enable **Search for barcode only** and enter an exact code. Both paths ultimately call `pickupTicketScan` in `packages/mobile/src/util/scan/api.ts`. Backend `VenueBasedTicketHistoryViewSet` creates the history, and `TicketHistory` validates the transition and updates ticket status. A camera scan also exercises barcode parsing and scanner-device checks that search-based check-in does not.

Apple's [AVCam documentation](https://developer.apple.com/documentation/avfoundation/avcam-building-a-camera-app) says Simulator lacks device cameras. The installed Xcode `simctl io` offers screenshot/video output but no camera-feed injection. A simulator can therefore cover the **manual barcode entry → saved admission** path; a real iPhone is needed for a true camera-decode run. A test-only barcode injection hook could exercise `performScan` in CI, but would still not prove the camera; none has been added to the app.

## Evidence from this attempt

- The prior public guest purchase created transaction `2b-0c81-49a3-bfc4-222e742869cc` in beta Venue **1547**. On this attempt, the Organizer fixture could read its issued Comic Con ticket; the backend's nonmutating scan lookup returned HTTP **200**, ticket ID **1605567**, status **2** (paid), and `is_redeemable: true`. The barcode was neither printed nor saved in this note.
- On the booted iOS 18.6 **Showpass QA iPhone iOS 18** simulator (`F6CAAF63-B96C-4DFB-9735-C893A083C090`), Appium opened the installed beta app and the Account tab. Tapping **Login** then exited `com.showpass.swift.beta` before a login form could be inspected. WebDriverAgent reported the app was no longer running; simulator RunningBoard recorded `SIGABRT(6)`. The same failure occurred with both retained and fresh app state. No credentials were entered.
- The exact cause of `SIGABRT` is **inconclusive** from the available log. This is an observed app exit on this local build, not a confirmed defect in the current frontend source or a deployed release.
- On October 4, the rebuilt 3.6.7 (135) simulator app again exited immediately after **Account → Login** on both iOS 18.6 and 27.0. That build's pre-login issue also prevented the native Box Office payment matrix; see [[09 Appium/iPhone Ticket Purchases]]. No check-in or payment was attempted during these repeat diagnostics. These observations do not establish the behavior of TestFlight 3.7.2 (180).
- No check-in or duplicate-scan attempt was executed. The paid ticket remains available for a later admission run; do not make another purchase just to retry login.

## Resume after a working beta build

1. Install or use a beta simulator build that reaches the employee Login form, then run an Appium discovery pass through **Account → Login → select Venue 1547 → Check in → Comic Con → Start scanning → Search customer**. Observe and save stable accessibility labels before adding selectors under `test/screens/ios/check-in/` and the journey under `test/flows/ios/check-in/`.
2. Add one simulator test that reads the existing ticket barcode at runtime from the verified invoice, searches with **Search for barcode only**, selects that ticket, and taps **Check in** once. Read the venue-scoped ticket and history after submission to prove paid → used and exactly one `pickup`. Keep the barcode and account secret out of logs/screenshots. If the result is ambiguous, read saved state before any retry.
3. Run a separate physical-iPhone camera test with a QR displayed on another screen. Verify the same saved-state proof and a rejected duplicate. In CI, keep the simulator manual-entry path for repeatable downstream admission coverage; add a device farm or attached iPhone for camera coverage. Do not label a simulator pass as camera coverage.

The next admission attempt can use either a newer simulator build that opens employee Login or the reported TestFlight 3.7.2 (180) build on a connected physical beta iPhone. Continue from the already issued ticket and use the named Organizer fixture; no new payment is needed. TestFlight Login and camera scanning remain unverified.
