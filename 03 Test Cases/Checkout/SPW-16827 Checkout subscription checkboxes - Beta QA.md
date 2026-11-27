---
title: SPW-16827 Checkout subscription checkboxes - Beta QA
date: 2026-11-26
tags:
  - qa/browser-testing
  - checkout
  - accessibility
---

# Checkout subscription checkboxes in Beta

Both promotional email checkboxes in **Payment → Your information** had the visible names in the accessibility tree. Tab reached both inputs, Space checked each one, and clicking each visible label unchecked it. The user replied “lgtm” after taking over for the VoiceOver speech check. The exact spoken wording was not captured. [SPW-16827](https://showpass.atlassian.net/browse/SPW-16827) · [PR #8058](https://github.com/showpass/showpass-frontend/pull/8058)

## Test index

- [TC-01 Open checkout and verify the checkbox relationships](#tc-01-open-checkout-and-verify-the-checkbox-relationships)
- [TC-02 Toggle each checkbox with Space and the visible label](#tc-02-toggle-each-checkbox-with-space-and-the-visible-label)
- [TC-03 Check VoiceOver speech and clear the cart](#tc-03-check-voiceover-speech-and-clear-the-cart)

## Setup

- **Environment and role.** Showpass Beta in the Codex sidebar, signed-in Customer, November 26, 2026. Beta deployment revision was unverified. Local frontend contains merge `97f404b2d2`.
- **Fixture.** Organization **1859-qa-cad**, **QA Toronto Winter Market** Event `650963`, **General Admission** ticket type `1631069`. The existing event and ticket were already available. [Beta Event](https://beta.showpass.com/qa-toronto-winter-market/)
- **Reviewed scope.** Release Engineer short review and independent QA Lead approval for one temporary ticket at a time. Stop at purchaser information and empty the cart. No order, payment, or legal acceptance was submitted.

## TC-01 Open checkout and verify the checkbox relationships

**Start here.** Open the Beta Event link above with an empty cart.

1. Select **BUY TICKETS**. Verify **General Admission** shows quantity zero and **Checkout** is disabled. Select quantity one and open **Checkout**. Continue through optional **Add-ons** and **Review**. Enter `Accessibility QA` in the required **Pickup note** and continue to **Payment → Your information**.

   **Expected.** The test cart contains one General Admission ticket. Two unchecked checkboxes appear below purchaser information.

   **Actual — Passed.** The picker started at zero and the Review step showed one ticket. **Your information** exposed two unchecked checkboxes named **Subscribe to promotional emails from Showpass** and **Subscribe to promotional emails from 1859-qa-cad**. Each native checkbox was inside its corresponding HTML label and its `aria-labelledby` resolved to that same visible text. The browser accessibility tree showed both names, the checkbox role and the unchecked state. Evidence was recorded in the browser accessibility and DOM readbacks.

## TC-02 Toggle each checkbox with Space and the visible label

**Start here.** On **Payment → Your information**, start with both checkboxes unchecked.

1. From **Edit** in **Your information**, press Tab to focus the Showpass checkbox and press Space. Tab to the Organization checkbox and press Space again. Click the text of each visible checkbox label in the same order.

   **Expected.** Tab reaches each checkbox. Each Space press changes only its focused checkbox. Each label click changes only its corresponding checkbox.

   **Actual — Passed.** Accessibility focus moved to Showpass and then to **1859-qa-cad**. Space changed the pair from unchecked/unchecked to checked/unchecked to checked/checked. Clicking the Showpass and Organization label text changed it to unchecked/checked and then unchecked/unchecked. The browser accessibility tree and native input states confirmed both keyboard transitions. A checked-state crop was captured during the run, with the interactive evidence recorded in the browser activity.

## TC-03 Check VoiceOver speech and clear the cart

**Start here.** Leave VoiceOver off until **Your information** shows both checkboxes and focus is on the Showpass checkbox.

1. Turn on VoiceOver at the ready screen. Listen for each checkbox’s visible label, checkbox role and state on focus, then for the state change after Space. Turn off VoiceOver after the check.

   **Expected.** Both controls announce their labels and checked or unchecked state.

   **Actual — User-confirmed.** The browser could inspect the accessibility tree. Spoken output required the user’s check. After the ready checkout was handed over, the user replied “lgtm”. No announcement transcript or per-control wording was captured. VoiceOver was accessed too early on the first pass, and the user asked for activation only after the checkboxes were ready.

2. Return to the Event. Open **Cart**. For the single **QA Toronto Winter Market → General Admission** line, set its quantity to **0**. Reopen **BUY TICKETS** to verify the final state.

   **Expected.** The cart no longer shows a reserved item, the General Admission quantity is zero, and **Checkout** is disabled.

   **Actual — Passed.** The cart contained one matching test ticket. Selecting zero removed the cart indicator and countdown. The reopened picker showed **General Admission** quantity `0` and disabled **Checkout**. The picker was closed, leaving the Event page open.

## Results

| Check | Status | Observed result |
| --- | --- | --- |
| [TC-01 Checkout and label relationships](#tc-01-open-checkout-and-verify-the-checkbox-relationships) | Passed | Both named checkboxes reached on the live Beta checkout. |
| [TC-02 Keyboard and label clicks](#tc-02-toggle-each-checkbox-with-space-and-the-visible-label) | Passed | Each Space press and label click toggled the matching checkbox. |
| [TC-03 VoiceOver speech and cleanup](#tc-03-check-voiceover-speech-and-clear-the-cart) | User-confirmed speech, cleanup passed | User replied “lgtm”. The temporary cart then returned to zero. |
