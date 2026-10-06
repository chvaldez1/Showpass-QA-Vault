---
title: Buyer Bottom Navigation
tags:
  - automation/appium
  - platform/mobile
  - qa/navigation
status: Implemented; simulator build 3.6.7 (135) exited before login; TestFlight 3.7.2 (180) unverified
---

# Buyer Bottom Navigation

> [!warning] TODO — DELETE PERSONAL-ACCOUNT TEST LATER
> This is a temporary read-only check using the user's personal beta account through local environment variables. Replace it with a disposable Buyer fixture, then delete `test/specs/ios/buyer.navigation.ts`, its npm command, and the personal-account README section. No credential belongs in this vault, source control, CI, or shared artifacts.

The code is in `/Users/christianvaldez/Documents/personal/appium-pof`. See its README for the one-line run command and [[09 Appium/Showpass Mobile App]] for the installed simulator app. `BUYER_NAVIGATION_RUN=1` suppresses Appium command logs and automatic screenshots. The test signs in once, checks that all five bottom buttons remain visible on each destination, and makes no purchase or account change.

| Entry | Required proof from current frontend source | October 4 device status |
| --- | --- | --- |
| Explore bottom tab | Event search control renders | Blocked before login |
| Saved bottom tab | **Saved events** native screen renders | Blocked before login |
| Upcoming bottom tab | **Upcoming** WebView loads, or **No upcoming events yet** native empty state if this account has none | Blocked before login |
| Orders bottom tab | **Universal QR Code** and order links render | Blocked before login |
| Account bottom tab | Signed-in **Personal info** menu renders | Blocked before login |
| Orders → My orders, Waitlists, Memberships, Products | Each linked beta WebView reaches its expected account path and renders content | Blocked before login |
| Orders → Credits | **Credits** native screen renders | Blocked before login |

**Execution:** One run on the iOS 18.6 Showpass QA iPhone simulator reused beta app version **3.6.7 (135)**. Tapping **Account → Login** caused `com.showpass.swift.beta` to exit before the email form. The supplied credentials were not entered. JUnit reported a failed setup hook; zero tabs or linked screens were tested. This reproduces the earlier Employee Login issue on that simulator build in [[09 Appium/iPhone Ticket Purchases]] without proving its source cause. TestFlight **3.7.2 (180)** is a newer physical-device build and has not been checked by this run. Use a newer compatible app build for the next navigation attempt, then inspect each separately reported check and any valid native empty state before marking it verified.

Source: `packages/mobile/src/navigation/Buyer/BuyerHomeBottomTabNavigator/BuyerHomeBottomTabNavigator.tsx` defines the five tabs; `packages/mobile/src/screens/BuyerScreens/Orders/OrdersHomeScreen/OrdersHomeScreen.tsx` defines the linked destinations. Appium's `test/screens/ios/buyer/bottom-navigation.ts` owns native selectors and actions; `test/shared/webview/buyer/account.ts` checks the rendered account page after `test/flows/ios/buyer/wait-for-account-webview.ts` switches contexts. Login is shared with Organizer navigation in `test/screens/ios/auth/login.ts`.
