---
title: Widget QA Library
tags:
  - qa/test-cases
---

# Widget QA Library

Embedded and modal Widget entry points hand selected items to checkout. A Widget guestlist or calendar path may hand off to a different application page. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Use a controlled host page, the intended launch mode and known Event. Record configuration, selected item, checkout outcome and the actual return URL or resulting reservation as applicable.

## Connected features

- [[03 Test Cases/Widgets/sdk-cloudflare-access-2026-11-15]]
- [[03 Test Cases/Websites/Websites QA Library]]
- [[03 Test Cases/Reservations/Reservations QA Library]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-2439](https://app.qase.io/case/SPT-2439) · Widget - Checkout - Verify SDK cart count and checkout widget handoff
- [SPT-5021](https://app.qase.io/case/SPT-5021) · Widget - Checkout - Verify redirect-url and parent-page UTM preservation
- [SPT-5841](https://app.qase.io/case/SPT-5841) · Widget - SDK - Start Modal and Embedded widgets with the configured SDK
- [SPT-3769](https://app.qase.io/case/SPT-3769) · Widget - Guest List - Submission - Submit a guestlist request via public widget

### TC-1: Keep the loaded Event list and basket when returning from checkout

**Title:** Widget - Event List - Keep the loaded Events and basket on Back to events

**Description:** A visitor starts checkout for an Event loaded on the second page of an embedded Event List. Returning to the list preserves the loaded cards and the quantity already in the basket.

| Platform | View |
| --- | --- |
| Widget | Desktop |

**Preconditions:**

* Use an approved test host page on desktop with an embedded **Event List** Widget at least 800 px wide, **Buy tickets** buttons visible, and the `sdk_use_v2_event_list_widget` flag confirmed on for the owning Organization. Use the host page’s normal embed entry and start signed out with an empty basket.
* The embed loads six Events initially and includes at least one more. The setup owner designates an on-sale second-page Event with one digital General Admission ticket type that supports guest checkout. At least two tickets are available when the run starts, and the per-order limit is at least two. Record the Event and ticket type names. Use an Event without required checkout questions or add-ons.
* Have an approved test guest name, a controlled email address and an approved test phone number available.

**Postconditions:** On **Review**, use **Remove** beside the test ticket and select **Remove** again in **Remove items from cart?**. Verify the test ticket disappears and close the test browser context. Stop before payment.

**Tags:** widget, checkout, basket

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the host page and inspect the embedded Event List. | Recorded second-page Event | Six Events are visible. The recorded Event is absent. **Load more events** is available. |
| Select **Load more events**. | | The earlier cards stay visible and the recorded Event is added to the list. |
| Select **Buy tickets** on the recorded Event. Set the ticket quantity to `2` in **Select options** and select **Continue**. If prompted, choose **Continue as guest**, fill in **Full name**, **Email address** and **Phone number**, then select **Continue**. Stop at **Review**. | Recorded ticket type, quantity `2`, approved guest details | The purchase flow stays in the Event List Widget. **Review** lists the recorded Event and two of the selected ticket type. |
| Select **Back to events**. | | The purchase dialog closes in the same widget. Both the original cards and the newly loaded Event are still available without clicking **Load more events** again. Keyboard focus returns to the **Buy tickets** button that opened the dialog. |
| Select **Buy tickets** for the same Event. Read the selected quantity in **Select options** before changing anything. | Same Event and ticket type | The selected quantity is already `2`. |
| Select **Continue** without changing the quantity. If the guest form reopens, use the same guest details. | Same guest details | **Review** still lists only the same Event and ticket type at quantity `2`. |

## Proof and sources

**Execution:** Not run. The SPT project snapshot contained 2,492 definitions. [SPT-2439](https://app.qase.io/case/SPT-2439) and [SPT-2435](https://app.qase.io/case/SPT-2435) check the current basket when the host checkout control or a separate Checkout Widget opens. [SPT-2437](https://app.qase.io/case/SPT-2437) checks guest sessions and refresh or reopen. [SPT-5021](https://app.qase.io/case/SPT-5021) checks the payment redirect and host attribution. [SPT-5841](https://app.qase.io/case/SPT-5841) checks supported SDK launches. The reviewed definitions leave the Event List’s **Back to events** control, loaded cards and focus unverified together.

Backend `b8dcfa8726db12b759e7960f07455c2e7b8fa8b7` selects the current Event List for the enabled Organization. Frontend `5867dd39dcde15e7424625faee03d583860ab437` retains the mounted list when the purchase dialog closes and gives its previous trigger focus. The checkout contract keeps the basket in the same session. [Embedded Event List rollout](<../../../web-app/apps/tickets/embedded/views.py#L43>) · [Event List checkout behavior](<../../../showpass-frontend/packages/core/src/app-contexts/public/features/widget/README.md#checkout-lifecycle>) · [Purchase dialog](<../../../showpass-frontend/packages/core/src/app-contexts/public/features/widget/ui/pages/EventListWidgetPage.web.tsx#L99>) · [List and focus regression](<../../../showpass-frontend/packages/core/src/app-contexts/public/features/widget/hooks/useEventListWidget.test.ts#L122>)
