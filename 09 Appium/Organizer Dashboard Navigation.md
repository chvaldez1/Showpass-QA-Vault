---
title: Organizer Dashboard Navigation
tags:
  - automation/appium
  - platform/mobile
  - qa/navigation
status: Implemented; tested simulator builds exited at Login; TestFlight 3.7.2 (180) unverified
---

# Organizer Dashboard Navigation

The iPhone Appium spec `test/specs/ios/organizer.navigation.ts` in `/Users/christianvaldez/Documents/personal/appium-pof` checks the Organizer dashboard for **Organization For System Gateway Payment Intent**. It uses the existing Playwright Organizer account fixture or protected environment credentials. Start with [[09 Appium/Showpass Mobile App]] for simulator setup; the Appium README has the one-line command.

| Dashboard tile | Landing-screen proof |
| --- | --- |
| Check in | **Select items** and **Events** |
| Point of sale | **Point of sale** and **Tickets** |
| Manage events | **Manage events** and **Upcoming events** |
| Event stats | **Event stats** and **Upcoming events** |
| Employees | **Manage employees** and **All Roles** |
| My stats | **My stats** and **Total revenue** |
| Guestlist | **Stats** and **Guestlist** tab |
| Product stats | **Product stats** header after the dashboard row disappears |

The test signs in once, selects the organization, then opens each tile as a separately reported check. It restarts the app between tiles to return to the dashboard or organization selection without deleting the installed app or session. It checks navigation and visible screen content; it does not create an order, scan a ticket, or change a Venue setting. If a tile opens **No permissions**, the corresponding check fails rather than counting a click as success. The selected account must have the relevant permissions and at least one permitted Point of sale payment method.

**Current evidence:** Code checks passed on October 4, 2026 (lint, formatting, TypeScript, and fourteen unit tests). The dashboard navigation run has **not** passed. Simulator build 3.6.7 (135) exited after **Account → Login** on iOS 18.6 and 27.0; a local-source simulator candidate labeled 3.7.2 (180) exited at the same step on iOS 26.3. The actual TestFlight 3.7.2 (180) build has not been checked; do not infer its behavior from the local candidate. See [[09 Appium/iPhone Ticket Purchases]] for execution evidence. Run this spec after Login works, inspect the per-tile result and JUnit report, and only then mark the eight paths as device-verified. The runner suppresses automatic screenshots and command-level logs for this credential-bearing run.

Frontend source: `packages/mobile/src/screens/DashboardScreen/DashboardScreen.tsx` defines the eight tile labels, permission gates, and routes. The destination screens and their visible labels live under `packages/mobile/src/screens/` and `packages/mobile/src/navigation/GuestlistTabNavigator/`. Appium dashboard, Login, and organization-selection selectors live in their respective `test/screens/ios/` page objects; `test/flows/ios/organizer/open-dashboard.ts` coordinates them. No backend mutation is required for this navigation check.
