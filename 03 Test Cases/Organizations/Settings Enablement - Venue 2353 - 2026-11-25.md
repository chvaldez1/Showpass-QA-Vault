---
title: Organization Settings Enablement for Venue 2353
date: 2026-11-25
tags:
  - qa/organizations
  - browser-testing
---

# Organization Settings Enablement for Venue 2353

## Overview

Saved and reopened three settings in Showpass beta for **Organization With Refund Protection Disabled**, Venue `2353`. **Fulfillment features enabled**, **Allow delivery ticket transfers**, and **Include assigned seating events** all persisted as on. The Organizer can now configure fulfillment, and otherwise eligible, previously issued unfulfilled delivery tickets can become transferable. Buyer delivery, transfer, and upsell behavior were not run. [Shipping & fulfillment](https://beta.showpass.com/manage/organization/settings/shipping-fulfillment/) · [Enabled modules](https://beta.showpass.com/manage/organization/settings/modules/)

In the follow-up, the Organizer Builder visited all 16 visible pages from **General** through **Ticket settings** and saved changes on 11 pages, including seven email templates. The follow-up fields and limits are recorded in [TC-04 through TC-06](#tc-04-fill-general-through-legal).

## Confirmed bugs

No product bug was confirmed in the settings saves. The checkout client difference under TC-03 is a source finding awaiting live verification. The follow-up also identified two save actions with additional effects under [TC-06](#tc-06-fill-email-and-ticket-copy).

## Test index

- [TC-01 Review Organization Settings](#tc-01-review-organization-settings)
- [TC-02 Enable fulfillment and delivery ticket transfers](#tc-02-enable-fulfillment-and-delivery-ticket-transfers)
- [TC-03 Include assigned seating events in upselling](#tc-03-include-assigned-seating-events-in-upselling)
- [TC-04 Fill General through Legal](#tc-04-fill-general-through-legal)
- [TC-05 Fill Branding and Messaging](#tc-05-fill-branding-and-messaging)
- [TC-06 Fill email and ticket copy](#tc-06-fill-email-and-ticket-copy)

## Setup and prerequisites

- November 25, 2026, signed-in Organizer in the existing Codex in-app browser. **General** confirmed `beta.showpass.com`, Organization **Organization With Refund Protection Disabled**, Venue ID `2353`. The deployed beta revision was unknown.
- Independent QA Lead approved the read-only baseline, then Plan 3 for fulfillment, Plan 4 for delivery transfers, and Plan 5 for assigned seating. Plans 1 and 2 led to narrower revisions before any save. The user authorized the transfer eligibility effect and proceeding despite the disclosed Enabled modules form behavior.
- The saved configuration was retained. Each approved save was followed by its own fresh page load. No transaction was part of the run.
- For the follow-up, the user specified every tab and field from **General** through **Ticket settings** and excluded images. An independent QA Lead approved the read-only baseline and **Organization Settings Fill / Plan 4** after full source review. Every save was made on the same beta Venue.

## TC-01 Review Organization Settings

1. **Open Organization → Organization settings → General** and confirm Venue `2353`. Read the available settings using their navigation links.

   **Expected:** The signed-in Organizer can identify the active Organization, settings already on, and options that require additional values or access.

   **Actual (Passed):** General confirmed the target. The observed settings are below.

   | Page | Observed baseline and decision |
   | --- | --- |
   | General | Private organizer was off. The current public profile visibility choice was retained. |
   | Contact | Showpass notifications and customer email were already on. |
   | Business schedule | Show business hours was already on. All seven days were marked Closed. Opening hours require the intended schedule. |
   | Enabled modules | Events, Guestlists, Capacity Counters, Incidents, Memberships, Exchanges, and Group Sales were on. Guestlist joins, discounts, abandoned-cart emails, reminder emails, event upselling and inventory threshold display were on. Include assigned seating events was off. |
   | Shipping & fulfillment | Fulfillment, delivery ticket transfers and the quantity threshold were off. Destination lists were blank. A quantity threshold needs the intended order limit. |
   | Checkout consent | The list was empty. Creating an item requires the intended consent wording and scope. |
   | Legal | Require customers to accept terms was off. Enabling it requires a terms URL. |
   | Customer refunds | The link was absent from this session. |
   | Suborganizations | The page said Suborganizations are not enabled for this Organization. |
   | Payment details and authorization | Link present. Payment changes require separate account and payment authorization. |

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/shipping-baseline.jpg" alt="Shipping and fulfillment before changes, with both switches off" width="600" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/modules-baseline.jpg" alt="Enabled modules before changes, with assigned-seating upsells off" width="600" style="max-width: 100%; height: auto;">

## TC-02 Enable fulfillment and delivery ticket transfers

**Start here.** In Showpass beta for Venue `2353`, open **Organization → Organization settings → Shipping & fulfillment**.

1. **Switch Fulfillment features enabled on and select Save.** After **Shipping and fulfillment settings saved**, reload the page.

   **Expected:** Fulfillment is on, delivery ticket transfers are off, and the messages, quantity threshold and destination restrictions match their baseline.

   **Actual (Passed):** All expected values matched. The checkout message and both destination lists were blank. The threshold was off and retained its existing message.

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/shipping-reopened.jpg" alt="Beta Venue 2353 with fulfillment on and delivery ticket transfers off after the first save" width="600" style="max-width: 100%; height: auto;">

2. **Switch Allow delivery ticket transfers on and select Save** after the user authorizes the effect on eligible previously issued delivery tickets. Wait for the same confirmation and reload.

   **Expected:** Both switches are on and all other visible Shipping & fulfillment values match step 1.

   **Actual (Passed):** Both switches persisted and the entire visible shipping form matched the expected state. No buyer transfer or claim was attempted. Blank destination lists add no venue-level restrictions. Rates and item rules still determine actual delivery options.

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/shipping-and-transfers-reopened.jpg" alt="Reopened Shipping and fulfillment page showing both fulfillment and delivery ticket transfers on" width="600" style="max-width: 100%; height: auto;">

## TC-03 Include assigned seating events in upselling

**Start here.** In Showpass beta for Venue `2353`, open **Organization → Organization settings → Enabled modules**.

1. **Under Event upselling, verify Enable event upselling is on and Show specific events is empty.** After verifying the form has loaded, check **Include assigned seating events**, select **Save**, and reload after **Modules and features saved**.

   **Expected:** Include assigned seating events stays on and every other visible control matches the opening values.

   **Actual (Passed):** The save confirmed. After reload, the assigned-seating checkbox was the only difference across 25 visible controls and selected options. **Exchange visibility** displayed **Box Office + Public** and its cutoff was 24 hours. **Show specific events** still appeared empty. The editor was left open.

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/modules-reopened.jpg" alt="Enabled modules after reload with Include assigned seating events checked for Venue 2353" width="600" style="max-width: 100%; height: auto;">

### Findings

- **Suspected bug · Next checkout may ignore the assigned-seating preference.** An Organizer expects Include assigned seating events to control whether those events are offered. The source shows the legacy checkout applying the switch, while the Next checkout add-ons and cart recommendation path do not pass or apply that filter. Buyers could see different recommendations in those clients. No customer checkout was run. A separate controlled check needs an otherwise eligible assigned-seat Event and the setting tested in both states. [Legacy filter](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/tickets/checkout.js:1403) · [Next checkout add-ons](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/hooks/useCheckoutAddons.tsx:83)
- **Save caveat · The Modules form resubmits other settings.** The expected result of a single switch edit is that other values are preserved. The source shows that a hidden unset Exchange visibility can be saved as **Box Office + Public**, and prior upsell Event IDs omitted by the picker may be dropped. This can affect which Events are explicitly recommended. The user authorized proceeding after this risk was disclosed. All visible fields matched, and the Dashboard could not establish whether either hidden value changed. [Modules save](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/utils/organization-modules-utils.ts:80) · [Selected event loading](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/modules/ui/pages/ModulesOverviewPage.web.tsx:37)

## TC-04 Fill General through Legal

**Start here.** In the existing signed-in Showpass beta Organizer tab, open **Organization → Organization settings → General**. Check that the name is **Organization With Refund Protection Disabled** and the Venue ID is `2353`.

1. **Open General, Business schedule, and Enabled modules in order.** On each page, enter the exact test values below, select **Save** once, and reload after confirmation.

   **Expected:** The changed values are present after reload. Other visible fields match the opening values.

   **Actual (Passed):** **Internal info** saved as `QA fixture 2353 | Organization settings`. Weekdays reopened at **9:00 a.m.–5:00 p.m. America/Vancouver**, both weekend days were closed, and staff and web booking limits remained at zero. **Show remaining inventory** reopened as **10** with the other visible controls matching the baseline. The earlier Enabled modules caveat still applies to the hidden values. [General proof](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-general.jpg) · [Modules proof](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-modules.jpg)

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-business-schedule.jpg" alt="Reopened beta schedule with weekday hours and zero booking capacity" width="600" style="max-width: 100%; height: auto;">

2. **Open Shipping & fulfillment, fill the delivery test settings, then save and reload.** Keep both fulfillment switches on. Set **Checkout shipping message** to `Beta QA only. Delivery is limited to eligible items and supported Canadian addresses.` Enable the quantity threshold and enter `5`. Set **Shipping quantity threshold message** to `Beta QA: Shipping is limited to five delivery items per order. Choose another delivery method to continue.` Select **Canada** in Allowed shipping countries and **Nunavut, Canada** in Blocked shipping regions.

   **Expected:** Both messages, the threshold and the two exact destinations persist. Both existing fulfillment switches stay on.

   **Actual (Passed):** Every planned value matched after reload. During entry, Australia appeared as an extra unsaved choice and was removed before submission. The saved list contained exactly Canada and the specified Nunavut exclusion. The cause of the extra draft selection was inconclusive. Buyer delivery was not run.

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-shipping.jpg" alt="Reopened shipping form with both messages, threshold 5, Canada and blocked Nunavut" width="600" style="max-width: 100%; height: auto;">

3. **Open Checkout consent and create one inactive optional Checkbox.** In **Add consent item**, use consent text `I understand this checkout is part of a Showpass beta test.` and reporting label `Beta QA checkout acknowledgement`. Set **Active**, **Required**, and **Selected by default** off and **Maps to** to **None**. Save once. Reopen through **More actions → Edit**.

   **Expected:** The one new row is Inactive, and the reopened form shows the exact text, type, label, and toggles.

   **Actual (Passed):** One row showed Inactive. The reopened item matched the exact settings above. [Inactive row proof](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-consent-inactive.jpg)

4. **Open Legal and fill Default refund policy.** Use `Beta QA only. Refund requests for test orders follow the assigned QA scenario. For live events, refer to the organizer's published refund policy.` Keep **Require customers to accept terms** off. Save and reload.

   **Expected:** The new policy copy persists and the terms requirement stays off.

   **Actual (Passed):** The text and the off state both persisted. The self-serve refund page was absent, and refund eligibility was not tested. [Legal proof](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-legal.jpg)

**Pages that needed other inputs.** Contact had a primary email, customer support email, and phone. Blank accounting/AR/AP and physical-address fields need the Organization's actual approved recipients and address. Payment details and authorization was read only for its setup categories. Bank setup requires the authorized account owner and real account details. Suborganizations was unavailable for Venue `2353`. Terms acceptance requires an Organization-owned terms URL, and Customer refunds was absent from the sidebar.

## TC-05 Fill Branding and Messaging

**Start here.** In the same beta Organization, open **Branding → Identity**.

1. **Set Identity colors, theme, fonts, and email branding link.** Use Primary `#155E75`, Secondary `#0F766E`, Email background `#F1F7F7`, **Light** mode, **Classic** layout, and **Inter** for both fonts. Set Brand website URL to `https://beta.showpass.com/o/organization-with-refund-protection-disabled/` and display text to `Showpass Beta QA organizer profile`. Save and reload.

   **Expected:** All nine values persist. Mail sender fields and image fields keep their baseline state.

   **Actual (Passed):** The exact colors, mode, layout, both fonts, and branding link reopened. From name and Reply-to remained blank. The independent Profile tab already held the prior SEO description and About. Its Website field also allowlists the domain for API integrations, and social destinations require verified accounts. Those fields remain empty. [Identity proof](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-identity.jpg)

2. **Open Messaging and fill all four empty fields.** Save and reload.

   **Expected:** Each exact QA string appears in its owning field after reload.

   **Actual (Passed):** The four fields reopened with the following saved text. [Messaging proof](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-messaging.jpg)

   | Field | Saved text |
   | --- | --- |
   | Date and time TBD message | Beta QA: Date and time will be announced. |
   | Time TBD message | Beta QA: Start time will be announced. |
   | Subscription message | Get updates about future beta test events. Subscribing is optional. |
   | Checkout message | This was a Showpass beta test. Keep your confirmation for the assigned QA check. |

## TC-06 Fill email and ticket copy

**Start here.** In the same beta Organization, open **Emails → Customization**.

1. **Select each of the seven email types below and fill its subject and message.** Select **Save** once for each, reload, and reselect the saved type to compare both fields. Use the normal save action in the form.

   **Expected:** The exact text is saved for its own email type. The image fields keep their baseline values.

   **Actual (Passed):** Each body was verified in the reopened form. Each subject and its type were also visually verified in the reopened screenshot. Email delivery was not run.

   | Type | Saved subject | Saved message | Evidence |
   | --- | --- | --- | --- |
   | Purchase confirmation email | [Beta QA] Your order confirmation | Your Showpass beta test order is recorded. Keep this confirmation with your QA notes. | [Reopened](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-email-purchase-confirmation-email.jpg) |
   | Event reminder email | [Beta QA] Event reminder | This is a reminder for your Showpass beta test event. Check your order for event details. | [Reopened](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-email-event-reminder-email.jpg) |
   | Abandoned cart email | [Beta QA] Items in your test cart | Your beta test cart may still contain items. Return to it only if your QA scenario calls for checkout. | [Reopened](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-email-abandoned-cart-email.jpg) |
   | Membership renewal email | [Beta QA] Membership renewal reminder | Review your beta test membership details in your Showpass account. | [Reopened](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-email-membership-renewal-email.jpg) |
   | Regular hold email | [Beta QA] Your ticket hold | Review the items and expiry shown for this beta test hold. | [Reopened](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-email-regular-hold-email.jpg) |
   | Branded sponsor hold email | [Beta QA] Sponsor ticket hold | This is a beta sponsor-hold fixture. Check the hold details for the ticket and expiry. | [Reopened](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-email-branded-sponsor-hold-email.jpg) |
   | Waitlist cancellation confirmation email | [Beta QA] Waitlist cancellation | Your waitlist entry for this Showpass beta test has been cancelled. | [Reopened](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-email-waitlist-cancellation-confirmation-email.jpg) |

2. **Open the separate Post-event page, enter the three messages below, and save.** Keep **Enable organization-wide post-event email**, **Include upcoming events**, and **Include rating and review request** off. Reload and compare both wording and toggles.

   **Expected:** All three text fields persist while all three switches stay off.

   **Actual (Passed):** All three planned values and the off states were verified. [Post-event proof](../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-post-event.jpg)

   | Field | Saved text |
   | --- | --- |
   | Message | Thanks for taking part in this Showpass beta event. Record your results in the assigned QA run. |
   | Upcoming event message | Browse the organizer profile for upcoming beta test events. |
   | Review request message | Share feedback only if your QA scenario includes a review. |

3. **Open Deliverables → Ticket settings and fill Custom ticket message.** Use `Showpass beta QA ticket. For test use only.` Save and reload.

   **Expected:** The exact copy persists with the existing logo and ad fields intact.

   **Actual (Passed):** The exact message reopened and all three image fields matched the baseline. Ticket settings was left open.

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-settings-enablement/fill-ticket-settings.jpg" alt="Reopened Ticket settings showing the saved QA ticket message" width="600" style="max-width: 100%; height: auto;">

### Additional save behavior

- **Post event email template starts organization-wide automation.** Source shows that saving this separate Customization template enables organization-wide thank-you emails and queues notification setup. The dedicated Post-event copy was saved with its switches off. [Template save behavior](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/emails/models/configuration.py:119)
- **Digital wallets color save queues existing pass regeneration.** The page showed its existing colors. The color save was held because source shows it queues pass regeneration even for a colors-only change. [Wallet save behavior](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/branding/save_digital_wallet_customization.py:25)
- **Identity sender name can also set a sender address.** Source shows that entering only a From name can persist an inherited or default email along with the name. The sender fields were preserved pending an approved sender. [Sender field handling](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/utils/email-sender-utils.ts:88)

## Continuation handoff

The Organizer Builder verified on November 25, 2026, that beta Venue `2353` has **Fulfillment features enabled**, **Allow delivery ticket transfers**, and **Include assigned seating events** all on. The follow-up added the five-item shipping threshold, Canada with Nunavut blocked, and the other fixtures in TC-04 through TC-06. The settings were left in place. Shopper behavior and hidden Modules values were unverified. [Shipping & fulfillment](https://beta.showpass.com/manage/organization/settings/shipping-fulfillment/) · [Enabled modules](https://beta.showpass.com/manage/organization/settings/modules/) · [Ticket settings](https://beta.showpass.com/manage/organization/branding/ticket-settings/)

For a separately approved Customer Tester check, start with a controlled beta basket whose payment Venue is `2353`, and an eligible assigned-seating Event for its add-ons list. Reach **Add-ons** in the assigned checkout client and record whether the Event is offered. A comparable basket with the setting off is needed to isolate the filter behavior. Stop before payment. No new buyer action or setting change is authorized by this handoff.

## Results

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 step 1, Organization and Settings baseline](#tc-01-review-organization-settings) | Passed | — | Verified Venue `2353`, visible saved settings, and missing prerequisites. |
| [TC-02 step 1, fulfillment](#tc-02-enable-fulfillment-and-delivery-ticket-transfers) | Passed | — | Fulfillment persisted as on after reload. |
| [TC-02 step 2, delivery ticket transfers](#tc-02-enable-fulfillment-and-delivery-ticket-transfers) | Passed | — | Delivery ticket transfers persisted as on, and the other shipping fields matched the baseline. |
| [TC-03 step 1, assigned-seating upsells](#tc-03-include-assigned-seating-events-in-upselling) | Passed | — | The checkbox persisted as on and all other visible controls matched. |
| [TC-04 steps 1–4, General through Legal](#tc-04-fill-general-through-legal) | Passed | — | Saved General, weekday hours, inventory display, shipping, one inactive consent item, and refund wording. Required external inputs remain pending. |
| [TC-05 steps 1–2, Branding and Messaging](#tc-05-fill-branding-and-messaging) | Passed | — | Saved and verified the theme and branding link, plus all four Messaging fields. |
| [TC-06 steps 1–3, email and ticket copy](#tc-06-fill-email-and-ticket-copy) | Passed | — | Seven templates, three post-event messages with automation off, and one ticket PDF message persisted. |
| [Buyer behavior](#continuation-handoff) | Not run | — | Checkout recommendations, buyer shipping, and transfer or claim behavior were outside saved-state verification. |
