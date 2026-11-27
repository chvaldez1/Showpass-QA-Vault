---
title: SPW-21105 Custom fees - Beta QA
date: 2026-11-26
tags:
  - qa/browser-testing
  - custom-fees
---

# Custom fees on a narrow Dashboard viewport

The populated table scrolled to its row action at 390 px. The **Name** choices followed **Type** in **Add** and **Edit custom fee**. Both test cards persisted on the Bouncy House Draft, and all 60 focused component tests passed. The live Beta empty state was blocked by populated fixtures. The component suite verified the empty state. Native WebView and any payment-plan refresh effects were not observed. [Jira SPW-21105](https://showpass.atlassian.net/browse/SPW-21105) · [PR #8035](https://github.com/showpass/showpass-frontend/pull/8035)

## Test index

- [TC-01 Populated table at phone width](#tc-01-populated-table-at-phone-width)
- [TC-02 Empty Custom fees state](#tc-02-empty-custom-fees-state)
- [TC-03 Add switches Name with Type](#tc-03-add-switches-name-with-type)
- [TC-04 Edit switches Name with Type](#tc-04-edit-switches-name-with-type)
- [TC-05 Save and reopen Fee and Tax](#tc-05-save-and-reopen-fee-and-tax)
- [TC-06 Run focused component suites](#tc-06-run-focused-component-suites)

## Setup

- **Environment.** Showpass Beta Organizer Dashboard on November 26, 2026. The Codex in-app browser was set to 390 × 844 CSS px for responsive and modal checks. The save and readback used the normal sidebar viewport. The Beta deployed revision was unverified.
- **Organization and role.** **1859-qa-cad**, signed-in Organizer with working **Manage Transactions** access to Custom fees. Both Neon Encore events were already **Live**. The save fixture was **Bouncy House Fun Day for Kids (QA)**, Event `650952`.
- **Reviews.** The Release Engineer and independent QA Lead approved the no-save plan. The two Masters reviewed the save plan. After the backend review found the automatic Organization-wide payment-plan refresh, the user approved the two saves and that refresh. The Release Engineer and independent QA Lead reviewed the revised plan before either write.

## TC-01 Populated table at phone width

**What this tests.** An Organizer can read the columns and reach an action on an existing rate card at phone width.

**Start here.** In the Beta Dashboard, open **Build → Events → All events → Neon Encore Music Festival (QA)**, Event `651094`. Open **Custom fees** from the Event navigation menu.

1. At **390 × 844**, locate **Rate Card 3703** under **Ticket Fee**. Scroll inside the table to the right, open that row’s **Override** action and select **Cancel**.

   **Expected.** The table preserves readable columns, scrolls inside the page, and exposes the rightmost action. **Override** opens the selected row’s form.

   **Actual — Passed.** The table was 768 px wide inside a 300 px scroll area. Horizontal scroll moved from `0` to `468 px` while the page stayed 390 px wide. The starting row showed **Organization default**, **$10.00 + 7%**, and its applicability. The right side showed **Paid by** and **Actions**. **Override Ticket Fee rate card** opened with **Rate Card 3703** in its description. The dialog was cancelled. The row-action screenshot appeared in the browser run. [Festival Custom fees](https://beta.showpass.com/manage/events/neon-encore-music-festival-qa/custom-fees/)

## TC-02 Empty Custom fees state

**What this tests.** An eligible context with no visible rate definitions displays its empty message at phone width.

**Start here.** Use **Custom fees** on an eligible QA Event or Organization with zero visible definitions, including inherited definitions.

1. Open the eligible context at **390 × 844** and let it finish loading.

   **Expected.** **No custom fees match this context.** appears in place of the table and the rest of the page remains usable.

   **Actual — Blocked in Beta.** The Festival, Club Night, and Bouncy House Event pages all showed inherited Organization rate cards. **Finance → Custom Fees** also showed rows. The shared table has no filter to produce this state. The component test independently passed for the empty message and absence of the table. It did not measure the live mobile layout.

## TC-03 Add switches Name with Type

**What this tests.** The Add form offers names for the currently selected Type as soon as it opens and after a change.

**Start here.** Open the Festival’s **Custom fees** surface at phone width.

1. Select **Add**. Inspect **Type** and **Name**. Switch **Type** to **Tax**, inspect **Name**, switch back to **Fee**, and select **Cancel**.

   **Expected.** Fee selects **Host Fee** and excludes **GST**. Tax selects **GST** and excludes **Host Fee**. Switching back restores the Fee choices.

   **Actual — Passed.** Direct inspection of the rendered selections and options showed **Fee → Host Fee**, **Tax → GST**, and **Fee → Host Fee**. Each list excluded the other type’s example. The Add dialog was cancelled.

## TC-04 Edit switches Name with Type

**What this tests.** Switching Type on an editable definition also updates Name choices.

**Start here.** In **1859-qa-cad**, open **Finance → Custom Fees** and locate the **Ticket Fee** definition. Use its **Edit custom fee** action, which is separate from the rate-card row menu.

1. With the definition open, verify **Fee** and the saved **Ticket Fee** name. Switch to **Tax**, then back to **Fee**. Inspect the selected name and options after each change and select **Cancel**.

   **Expected.** Fee choices include **Host Fee**. Tax selects **GST** and removes Host Fee. Returning to Fee restores Fee choices.

   **Actual — Passed.** At 390 px, the dialog started at **Fee / Ticket Fee**. Tax immediately selected **GST**, with Host Fee absent. Returning to Fee selected **Host Fee**, with GST absent. After cancel, the original **Ticket Fee** still showed in the Finance list. On the Event view, the inherited GST definition’s Type and Name were disabled, so the editable Finance definition supplied this check. [Finance Custom Fees](https://beta.showpass.com/manage/finance/custom-fees/)

   <img src="../../../99%20Archive/QA%20Evidence/custom-fees/2026-11-26-spw-21105/edit-tax-name.jpg" alt="GST selected in Name after switching the editable fee to Tax" width="170">

   Beta Finance, November 26, 2026. **Name** selected **GST** on switching **Type** to **Tax**.

## TC-05 Save and reopen Fee and Tax

**What this tests.** A Fee and a Tax saved from Event Custom fees preserve their definitions, Event scope and rate values after reload.

**Start here.** In Beta **1859-qa-cad**, open **Bouncy House Fun Day for Kids (QA)**, Event `650952`. Confirm **Draft**, **Tickets → Create first ticket type**, and **Transactions → No results found**. Then open its **Custom fees** page and confirm **Add** is available.

1. Select **Add**. Create an active **Fee** named **Host Fee**, description `SPW-21105 QA Host Fee`, fixed amount `0`, and percent `1.25`. Use **Ticket**, **Online**, **Card**, and **Customer**, with no tax on fee selected. Select **Create** once and verify its Event row before proceeding.

   **Expected.** **Custom rate saved.** appears and the new rate card shows **Event** as its source and **1.25%** as its amount.

   **Actual — Passed.** The success message appeared and the row matched before the Tax was attempted. The saved definition was `2181` and the rate card was `4543`. The browser run captured an image crop of the reopened event-scoped fee row.

2. Select **Add**, switch **Type** to **Tax** with **GST** selected, and enter description `SPW-21105 QA GST` and percent `2.50`. Leave **Active**, **Ticket**, **Online**, **Card**, and **Customer** selected. Select **Create** once, reload the Event page, and reopen the exact definitions and cards.

   **Expected.** Both records still show the approved names, types, Event scope, rates and applicability. The Event remains in **Draft**.

   **Actual — Passed.** The success message appeared. After reload, both rows showed **Event**, **Ticket**, **Online**, **Card**, and **Customer**. **Edit custom fee** and **Rate card actions → Edit rate card** confirmed **Fee / Host Fee**, Active, $0 fixed and 1.25%, and **Tax / GST**, Active and 2.5%. GST definition `2182` and rate card `4544` were distinct from the existing Organization-default GST. Event `650952` remained Draft. All verification dialogs were cancelled. The browser run captured an image of the Event-scoped GST row showing **2.5%**. [Verified Draft Custom fees](https://beta.showpass.com/manage/events/bouncy-house-fun-day-for-kids-qa/custom-fees/)

   The session changed Organizations during the preflight, before any save. The approved QA Organization was reselected, and the exact Draft and its Transactions result were confirmed before creating the cards.

## TC-06 Run focused component suites

**What this tests.** The local target covers the two components named in the checklist.

1. From the frontend `packages/core` directory at `develop` revision `5867dd39dc`, run Jest for `CustomFeesWorkbenchSection.web.test.tsx` and `CustomFeesSurface.web.test.tsx` using the existing workspace dependencies, `APP_ENV=preview` and `PLATFORM=WEB`.

   **Expected.** Both suites complete successfully.

   **Actual — Passed.** Both suites passed, 60 tests total. PR merge `81b8869394` is an ancestor of this checkout. The test **shows the context empty state until a definition is confirmed to have no cards anywhere** passed within the suite. The installed workspace Jest binary was used after the package manager wrapper hit the sibling checkout’s filesystem write restriction. Coverage output was disabled and the test cache used a temporary path.

## End state

Both marked Event-scoped cards and their Organization-owned definitions were retained on Draft `650952` for verification. The sidebar viewport override was cleared. The user authorized the save-triggered payment-plan refresh for **1859-qa-cad**. Source shows eligible plans can be recalculated across the Organization. The job and its effects were not observed. No checkout or native WebView check was run.

## Results

| Check | Status | Observed result |
| --- | --- | --- |
| [TC-01 Populated table at phone width](#tc-01-populated-table-at-phone-width) | Passed | Scrolled the 390 px layout to the Actions column and opened Override. |
| [TC-02 Empty Custom fees state](#tc-02-empty-custom-fees-state) | Blocked in Beta | Available contexts had inherited rows. The component assertion passed. |
| [TC-03 Add switches Name with Type](#tc-03-add-switches-name-with-type) | Passed | Fee showed Host Fee, Tax selected GST, and Fee choices returned. |
| [TC-04 Edit switches Name with Type](#tc-04-edit-switches-name-with-type) | Passed | The editable Ticket Fee definition refreshed choices in both directions. |
| [TC-05 Save and reopen Fee and Tax](#tc-05-save-and-reopen-fee-and-tax) | Passed | Cards `4543` and `4544` and definitions `2181` and `2182` persisted on reload. |
| [TC-06 Run focused component suites](#tc-06-run-focused-component-suites) | Passed | 2 suites, 60 tests. |
