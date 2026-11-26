---
title: Organizer Profile Polish for Venue 2353
date: 2026-11-25
tags:
  - qa/organizations
  - browser-testing
---

# Organizer Profile Polish for Venue 2353

## Overview

Saved a **Short SEO description** and **About** copy for **Organization With Refund Protection Disabled** in Showpass beta. Both fields were blank before the edit and held the exact new copy after reload. Website and all three social-link fields were blank before and after the save. The copy identifies the Organizer profile as a beta test fixture so visitors can tell what the listings are for. [Profile editor](https://beta.showpass.com/manage/organization/branding/profile/)

## Confirmed bugs

No product bug was confirmed in the Profile navigation, save, or reload. Visitor-facing rendering was not run.

## Test index

- [TC-01 Verify the Organizer and save its Profile copy](#tc-01-verify-the-organizer-and-save-its-profile-copy)

## Setup and prerequisites

- The user authorized profile polish for the Organization already open in the Codex in-app browser. **Organization Settings → General** showed **Organization With Refund Protection Disabled**, Venue `2353`, on `beta.showpass.com` in the signed-in Organizer session.
- Plan 1 had carried forward Venue `1859` from older work. Live preflight caught the mismatch before Profile was opened or edited. The Release Engineer completed short review and the independent QA Lead approved **Organizer Profile Polish / Plan 2** for the observed Venue `2353`. The Organization was never switched.
- Plan 2 covered one save of the two public copy fields and a fresh Dashboard readback. The four optional destination fields were included in the before-and-after comparison because the form submits them with the descriptions. [Profile save source](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/utils/organization-branding-utils.ts:23)

## TC-01 Verify the Organizer and save its Profile copy

**Start here.** In the Codex in-app browser, open the signed-in Showpass beta Organizer Dashboard. In **Organization → Organization settings → General**, confirm **Organization With Refund Protection Disabled** and Venue ID `2353`.

1. **Open Profile under Branding.** Read **Website**, **Short SEO description**, **About**, **Facebook**, **X / Twitter**, and **Instagram** before editing.

   **Expected:** The Profile form opens for the active Organization with editable fields and **Save**. The original values can be recorded.

   **Actual (Passed):** All six fields were empty. Website and the three social fields displayed example placeholders. **Save** was available, and the two copy fields accepted edits.

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-profile-polish/profile-before.jpg" alt="Beta Profile before the edit with all six fields empty" width="600" style="max-width: 100%; height: auto;">

2. **Enter the new copy and select Save once.** Use the following exact text.

   **Short SEO description**

   > This Showpass beta organizer profile is used to test how sample event information appears before release.

   **About**

   > Welcome to this Showpass beta organizer profile. Our team uses it to check how event listings and organizer details appear to visitors.
   >
   > Listings here are created for testing. For a real event, use the link shared by its organizer.

   **Expected:** The editor shows the SEO description and two About paragraphs in order. Saving displays **Public profile saved**.

   **Actual (Passed):** After checking the entered text and paragraph order, the Builder clicked **Save** once. Showpass showed **Public profile saved**.

3. **Reload the Profile editor after the confirmation.** Compare both description fields and the four optional destination fields with the values recorded in steps 1 and 2.

   **Expected:** Both descriptions match the saved text, the two About paragraphs remain in order, and all four destinations match the baseline.

   **Actual (Passed):** Both descriptions persisted, including the About paragraph break. Website, Facebook, X / Twitter, and Instagram were still empty. The Profile editor was left open for review. [Reopened Profile](https://beta.showpass.com/manage/organization/branding/profile/)

   <img src="../../99%20Archive/QA%20Evidence/organizations/2026-11-25-venue-2353-profile-polish/profile-reopened.jpg" alt="Reopened Profile showing the new SEO description, two About paragraphs, and empty destination fields" width="600" style="max-width: 100%; height: auto;">

## Continuation handoff

On November 25, 2026, the Organizer Builder saved and reopened two new Profile descriptions for **Organization With Refund Protection Disabled**, Venue `2353`, in Showpass beta. The descriptions identify the profile as a test fixture. The four optional destination fields match their blank baseline, and the editor remains open. The saved copy was retained for review and there was no incidental data to restore. No bug was confirmed. [Dashboard Profile](https://beta.showpass.com/manage/organization/branding/profile/)

For a separately approved Guest Tester check, open the beta public Organizer profile in the assigned signed-out session. Verify that the About text appears in the expected order and describes the fixture. Record the visible result or access blocker and stop after the read-only check. [Public Organizer profile](https://beta.showpass.com/o/organization-with-refund-protection-disabled/)

## Results

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 step 1, target and baseline](#tc-01-verify-the-organizer-and-save-its-profile-copy) | Passed | — | Venue `2353` had an editable Profile and six empty fields. |
| [TC-01 steps 2–3, save and reload](#tc-01-verify-the-organizer-and-save-its-profile-copy) | Passed | — | Both descriptions persisted after one save. All four destination fields matched the baseline. |
| [Guest rendering](#continuation-handoff) | Not run | — | Dashboard persistence was the approved stop. |
