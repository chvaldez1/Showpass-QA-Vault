---
title: Organizer Profile guestlist modal on Beta
date: 2026-11-24
tags:
  - organizer-profile
  - guestlist
  - browser-testing
---

# Browser Test Report: Organizer Profile guestlist modal

## Overview

**Failed keyboard dismissal inside the form.** Escape left **Request guestlist** open in two attempts with **First name** focused. Opening the form, choosing **2** guests, resetting the count on reopen, and closing from the header passed. The failure means a keyboard user editing the form loses the usual Escape shortcut.

The **Customer Tester** owned the signed-in public check. The Release Engineer gave Plan 2 a short review, and the independent QA Lead approved the exact plan. The run covered the modal in the desktop Codex sidebar on Beta. The deployed revision was unverified. Form submission and reservation creation were outside the run.

## Confirmed bugs

| Bug | Observed behavior | Evidence |
| --- | --- | --- |
| [BUG-01](#bug-01-jira-draft) | Escape leaves the request open and focus in **First name**. | [TC-04, steps 2–3](#tc-04-escape-from-first-name) |

## Test index

- [TC-01 Open the request form](#tc-01-open-the-request-form)
- [TC-02 Change guest count and reopen](#tc-02-change-guest-count-and-reopen)
- [TC-03 Escape from the header](#tc-03-escape-from-the-header)
- [TC-04 Escape from First name](#tc-04-escape-from-first-name) · [BUG-01](#bug-01-jira-draft)

## Setup / Prerequisites

- **Environment and actor** · Beta, signed-in Customer, desktop Codex in-app browser, English. Use an authorized test account.
- **Starting point** · Open the public **Organization For System Gateway Payment Intent** profile on its **Gift Cards** tab. Confirm **Join guestlist** is visible and the modal is closed. [Beta Gift Cards](https://beta.showpass.com/o/organization-for-system-gateway-payment-intent/gift-cards/)
- **Data changes** · Change **How many guests?** in the open form only. Stop before **Submit request** and leave **Gift Cards** selected with the modal closed.

## TC-01 Open the request form

**What this tests** · A signed-in Customer can open the embedded request form from the Organization profile.

**Start here** · **Gift Cards** on the Beta profile in Setup.

1. Select **Join guestlist**.

   **Expected** · **Request guestlist** opens with the form fields and **Close modal** available.

   **Actual — Passed** · The modal loaded **First name**, **Last name**, **Email**, **Arrival date**, and **How many guests?**. **Close modal** received focus.

   <a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/01-form-open.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/01-form-open.jpg" alt="Request guestlist open with the form visible" width="540" style="max-width: 100%; height: auto;"></a>

   Beta Gift Cards, November 24, 2026. The form loaded in the open modal.

## TC-02 Change guest count and reopen

**What this tests** · The guest-count picker updates the unsent form, and reopening starts a clean request.

**Start here** · Open **Request guestlist** from **Join guestlist**.

1. In **How many guests?**, select **2**.

   **Expected** · The picker displays **2**.

   **Actual — Passed** · The picker displayed **2**.

   <a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/02-two-guests.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/02-two-guests.jpg" alt="The unsent guest count displays two" width="540" style="max-width: 100%; height: auto;"></a>

   Beta Gift Cards, November 24, 2026. The count changed before submission.

2. Select **Close modal** in the header.

   **Expected** · **Gift Cards** stays selected, the modal closes, and **Join guestlist** receives focus.

   **Actual — Passed** · The modal closed. The same tab stayed selected and focus returned to **Join guestlist**.

   <a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/03-close-restores-profile.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/03-close-restores-profile.jpg" alt="Gift Cards remains selected after the modal closes" width="600" style="max-width: 100%; height: auto;"></a>

   Beta Organization profile, November 24, 2026. Focus return was verified in the browser.

3. Open **Join guestlist** again.

   **Expected** · A fresh form shows **1** in **How many guests?**.

   **Actual — Passed** · The form reopened with **1** selected.

   <a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/04-reopened-one-guest.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/04-reopened-one-guest.jpg" alt="The reopened guestlist form shows one guest" width="540" style="max-width: 100%; height: auto;"></a>

   Beta Gift Cards, November 24, 2026. The unsent guest count was reset.

## TC-03 Escape from the header

**What this tests** · The modal responds to the keyboard shortcut when focus is on its header control.

**Start here** · Open **Request guestlist** and leave focus on **Close modal**.

1. Press **Escape**.

   **Expected** · The modal closes and focus returns to **Join guestlist**.

   **Actual — Passed** · The modal closed. **Join guestlist** received focus and **Gift Cards** stayed selected.

   <a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/05-header-escape-dismissed.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/05-header-escape-dismissed.jpg" alt="Gift Cards is visible after Escape closes the modal from its header" width="600" style="max-width: 100%; height: auto;"></a>

   Beta Organization profile, November 24, 2026.

## TC-04 Escape from First name

**What this tests** · A Customer can dismiss the modal using Escape while focus is inside the request form.

**Start here** · The same signed-in Beta Organization profile with **Gift Cards** selected.

1. Select **Join guestlist** and click **First name**.

   **Expected** · **Request guestlist** is visible and **First name** receives focus.

   **Actual — Passed** · The textbox was focused. Its caret and outline are visible in the screenshot below.

2. Press **Escape** while **First name** has focus.

   **Expected** · The modal closes and focus returns to **Join guestlist**. [W3C modal dialog keyboard guidance](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/#keyboard-interaction)

   **Actual — Failed** · The modal stayed open during the approximately two-second observation. Focus stayed in **First name**.

   <a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/06-escape-first-name-failure.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/06-escape-first-name-failure.jpg" alt="The request stays open with First name focused after Escape" width="540" style="max-width: 100%; height: auto;"></a>

   Beta Gift Cards, November 24, 2026. First attempt.

3. Use **Close modal**. Reopen **Join guestlist**, click **First name**, and press **Escape** again.

   **Expected** · The re-opened request closes and returns focus to **Join guestlist**.

   **Actual — Failed** · A fresh modal reproduced the same result. The first attempt to reopen immediately after closing timed out waiting for the form. A fresh page snapshot confirmed the modal was closed, then reopening worked and reproduced the Escape failure. The transient reopen attempt was excluded from the result.

   <a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/07-escape-repeat-failure.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/07-escape-repeat-failure.jpg" alt="The re-opened request still shows focus in First name after Escape" width="540" style="max-width: 100%; height: auto;"></a>

   Beta Gift Cards, November 24, 2026. Second observed Escape failure.

### BUG-01 Jira draft

**Draft only.**

**Title** · fix (public Organizer profile) | Escape leaves Request guestlist open when First name has focus

**GIVEN** I am signed in on Beta and viewing the **Gift Cards** tab for **Organization For System Gateway Payment Intent**.

**WHEN** I select **Join guestlist**, click **First name**, and press **Escape**.

**THEN** **Request guestlist** stays open and focus stays in **First name**. Escape should close the modal and return focus to **Join guestlist**.

Keyboard users lose the dismissal shortcut while filling in the form. I reproduced the result twice in the desktop browser sidebar. [Beta profile](https://beta.showpass.com/o/organization-for-system-gateway-payment-intent/gift-cards/)

## Postconditions and Cleanup

I selected **Close modal** and verified that **Gift Cards** was still selected and focus was on **Join guestlist**. No request was submitted.

<a href="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/08-final-page.jpg"><img src="../../99%20Archive/QA%20Evidence/Organizer%20Profile/2026-11-24-guestlist-rerun/08-final-page.jpg" alt="The Gift Cards page after the modal is closed" width="600" style="max-width: 100%; height: auto;"></a>

Beta Organization profile, November 24, 2026.

## References / Open Questions

- The local profile renders the request form as an embedded page inside the modal. The live check distinguishes focus in **Close modal** from focus in **First name**. The mechanism behind the failure was unverified. [Local component](../../../showpass-frontend/packages/core/src/app-contexts/public/features/org-profile/ui/components/OrganizerProfileGuestlist.web.tsx)
- The keyboard result applies to this Beta profile and browser session. Other entry points and devices were outside the run.

## Results

**Failed** for Escape dismissal inside the form. Three other scoped checks passed.

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [Open the request form, step 1](#tc-01-open-the-request-form) | Passed | — | Embedded form loaded. |
| [Change guest count and reopen, steps 1–3](#tc-02-change-guest-count-and-reopen) | Passed | — | Count changed to 2, then reset to 1 after reopening. |
| [Escape from the header, step 1](#tc-03-escape-from-the-header) | Passed | — | Modal closed and focus returned to Join guestlist. |
| [Escape from First name, steps 2–3](#tc-04-escape-from-first-name) | Failed | [BUG-01](#bug-01-jira-draft) | Modal stayed open twice with focus in First name. |

