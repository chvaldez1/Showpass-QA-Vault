---
title: Event Dates & Times browser test on Beta
date: 2026-11-20
tags:
  - qa/browser-testing
  - qa/events
---

# Event Dates & Times browser test on Beta

## Overview

All ten checks passed on the new Dashboard. The generator blocked past days, produced overnight rows ending the next day, and skipped duplicate date and time pairs. Both desktop creation and the 390 px edit saved dates that were still present after a fresh reload.

**Past-date scope.** The browser pass covers **Dates to include**, **Repeat daily start**, and **Repeat daily end** inside **Generate dates**. The separate **Event Starts** calendar shown in **Basic info → Event Date & Time** with **Repeat Event** unchecked was outside the browser run. The user’s screenshot shows November 1–19 displayed in that calendar on November 20. The local frontend has no minimum date on that start picker, so it allows past days to be selected. Whether a past-date edit saves on Beta was untested.

The initial Create event click opened the old Dashboard. After the new Dashboard was opened, the same event-list action was retested and reached the new wizard. All results below are from the new Dashboard.

## Confirmed bugs

No bugs were confirmed in the requested checks.

## Test index

- [TC-01 New Create Event entry](#tc-01-new-create-event-entry)
- [TC-02 Past days in the three generator pickers](#tc-02-past-days-in-the-three-generator-pickers)
- [TC-03 Generator defaults and overnight row](#tc-03-generator-defaults-and-overnight-row)
- [TC-04 Earliest allowed end date](#tc-04-earliest-allowed-end-date)
- [TC-05 Date controls above the table](#tc-05-date-controls-above-the-table)
- [TC-06 Clear dates confirmation](#tc-06-clear-dates-confirmation)
- [TC-07 Dates and times on an existing event](#tc-07-dates-and-times-on-an-existing-event)
- [TC-08 Duplicate dates](#tc-08-duplicate-dates)
- [TC-09 Usability at 390 px](#tc-09-usability-at-390-px)
- [TC-10 Overnight dates after save and reload](#tc-10-overnight-dates-after-save-and-reload)

## Setup

- **Environment** Showpass Beta, November 20, 2026. The deployed build was unknown. Evidence captions use Calgary time. The event dates and times use Toronto time (EST).
- **Account** Signed in with Dashboard access to **1859-qa-cad**. The user confirmed the Organization, Events access, Manage Events permission, and readiness for the new Dashboard flag `enable_nextjs_manage_events` before the draft was saved. The new pages and save were verified through the Dashboard.
- **Existing event** **Fight Night (Nov 20 - Nov 23, 2026)**, with four saved dates. Its form was exercised without saving.
- **Saved draft** **QA - Dates and Times Overnight - 2026-11-20**, Event ID **650890**. The draft used the saved **SPW-21444 Renamed QA location** in Toronto and category **Other**. [Open the draft in Basic info](https://beta.showpass.com/manage/events/qa-dates-and-times-overnight-2026-11-20/basic-info/).
- **Browser** Codex in-app browser at the normal width and at a measured 390 × 844 px. The narrow view was a browser viewport check.

## TC-01 New Create Event entry

**What this tests** An employee can reach the new multi-date creation form from the event list.

**Start here** Sign in to the Beta Dashboard with Manage Events access to **1859-qa-cad**. Select **Build → All events**.

### Steps

1. Select **Create event** on **Your events**, then choose **Several dates or showtimes** under **When can people attend?** Scroll to **Date and time**.

   **Expected** The new wizard opens and the form shows **Add a date** and **Generate dates** controls.

   **Actual — Passed** The new wizard opened from the event-list button on the retest. The multi-date form showed its date controls.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/24-list-create-route.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/24-list-create-route.jpg" alt="Beta · New wizard reached from Your events · 11:01 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · New wizard reached from Your events · 11:01 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/00-new-create-entry.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/00-new-create-entry.jpg" alt="Beta · Multi-date Create Event form · 11:00 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Multi-date Create Event form · 11:00 MST

## TC-02 Past days in the three generator pickers

**What this tests** The generator accepts today or a future date and blocks yesterday and earlier.

**Start here** Use the unsaved multi-date event form from TC-01 on Beta in **1859-qa-cad**.

### Steps

1. Under **Date and time**, open **Generate dates**. Choose **Selected dates** and open **Dates to include**.

   **Expected** November 19 and earlier are disabled. November 20 is selectable.

   **Actual — Passed** The selected-date calendar showed November 1–19 disabled and November 20 enabled.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/01-selected-picker.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/01-selected-picker.jpg" alt="Beta · Create Event selected-date calendar · 10:56 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Create Event selected-date calendar · 10:56 MST

2. Switch **Generate dates from** to **Repeat daily**. Open the first calendar, close it, then open the second calendar.

   **Expected** Both repeat calendars block November 19 and earlier while November 20 is available.

   **Actual — Passed** Both calendars showed the same boundary. November 1, 18 and 19 were disabled and November 20 was enabled.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/07-repeat-start.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/07-repeat-start.jpg" alt="Beta · Create Event repeat-start calendar · 10:57 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Create Event repeat-start calendar · 10:57 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/08-repeat-end.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/08-repeat-end.jpg" alt="Beta · Create Event repeat-end calendar · 10:57 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Create Event repeat-end calendar · 10:57 MST

## TC-03 Generator defaults and overnight row

**What this tests** The default start and end times generate a row that crosses midnight.

**Start here** On the same Beta multi-date Create Event form, open **Generate dates** with an empty schedule.

### Steps

1. In **Selected dates**, choose **November 25, 2026**. Keep **Start time** and **End time** at their defaults, then select **Add dates**.

   **Expected** The generator starts at **9:00 PM** and ends at **2:00 AM**. One row starts November 25 and ends November 26.

   **Actual — Passed** The preview showed November 26 at 02:00. The added row showed November 25 at 9:00 PM and November 26 at 2:00 AM.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/02-overnight-row.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/02-overnight-row.jpg" alt="Beta · Generated overnight row and schedule controls · 10:56 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Generated overnight row and schedule controls · 10:56 MST

## TC-04 Earliest allowed end date

**What this tests** A row’s end date cannot be chosen before its start date.

**Start here** On the Beta Create Event form in **1859-qa-cad**, use the overnight row from TC-03.

### Steps

1. Open **End date** for the November 25 row. Inspect November 24, 25 and 26.

   **Expected** November 24 is unavailable. November 25 is allowed as a date, and November 26 remains selected.

   **Actual — Passed** November 24 was disabled, November 25 was enabled, and November 26 was selected.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/03-row-end-minimum.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/03-row-end-minimum.jpg" alt="Beta · End-date picker for the November 25 row · 10:56 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · End-date picker for the November 25 row · 10:56 MST

## TC-05 Date controls above the table

**What this tests** Both schedule actions are positioned before the first row.

**Start here** On the Beta multi-date Create Event form in **1859-qa-cad**, keep at least one generated row in the schedule.

### Steps

1. Look immediately above the schedule’s **Start date**, **Start time**, **End date**, and **End time** headers.

   **Expected** **Add another date** and **Clear dates** are both visible above the table.

   **Actual — Passed** Both buttons were visible above the header. See the [overnight row screenshot](#tc-03-generator-defaults-and-overnight-row).

## TC-06 Clear dates confirmation

**What this tests** Cancel preserves the pending schedule and Confirm empties it.

**Start here** On Beta in **1859-qa-cad**, stay on the Create Event form with the November 25 overnight row still pending.

### Steps

1. Select **Clear dates**, then **Cancel**.

   **Expected** A confirmation gives **Cancel** and **Confirm**. After **Cancel**, the November 25–26 overnight row is still there.

   **Actual — Passed** Both actions appeared in the confirmation and the row count stayed at one after **Cancel**.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/04-clear-dialog.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/04-clear-dialog.jpg" alt="Beta · Clear dates confirmation · 10:57 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Clear dates confirmation · 10:57 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/05-clear-cancel.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/05-clear-cancel.jpg" alt="Beta · One row remains after Cancel · 10:57 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · One row remains after Cancel · 10:57 MST

2. Select **Clear dates** again and choose **Confirm**.

   **Expected** The schedule is empty and the date-entry controls return.

   **Actual — Passed** The row count dropped to zero and the date-entry controls returned.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/06-clear-confirm.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/06-clear-confirm.jpg" alt="Beta · Empty schedule after Confirm · 10:57 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Empty schedule after Confirm · 10:57 MST

## TC-07 Dates and times on an existing event

**What this tests** The Basic info editor applies the same generator defaults, past-date limits, and overnight end-date rule.

**Start here** On Beta in **1859-qa-cad**, open **Build → All events**. On **Fight Night (Nov 20 - Nov 23, 2026)** select **Edit** to open **Basic info**, then scroll to **Event Date & Time**. The saved schedule has four rows for November 20–23.

### Steps

1. Select **Generate more dates**. Check the displayed times and open **Dates to include** in **Selected dates**, then check both date pickers in **Repeat daily**.

   **Expected** Start and end default to 9:00 PM and 2:00 AM. Yesterday and earlier are disabled in all three pickers and today is available.

   **Actual — Passed** The displayed defaults were 9:00 PM and 2:00 AM. November 18 and 19 were disabled and November 20 was enabled in all three pickers.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/12-existing-generator.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/12-existing-generator.jpg" alt="Beta · Fight Night generator defaults · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night generator defaults · 10:59 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/13-existing-selected.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/13-existing-selected.jpg" alt="Beta · Fight Night selected-date calendar · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night selected-date calendar · 10:59 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/14-existing-repeat-0.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/14-existing-repeat-0.jpg" alt="Beta · Fight Night repeat-start calendar · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night repeat-start calendar · 10:59 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/14-existing-repeat-1.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/14-existing-repeat-1.jpg" alt="Beta · Fight Night repeat-end calendar · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night repeat-end calendar · 10:59 MST

2. Switch back to **Selected dates**, choose **November 25**, and select **Add dates**. On the new row, open **End date**.

   **Expected** Five dates are displayed. The new row ends November 26 at 2:00 AM and November 24 is unavailable as an end date.

   **Actual — Passed** The unsaved fifth row showed November 25 at 9:00 PM through November 26 at 2:00 AM. November 24 was disabled and November 25 was enabled in its end-date calendar.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/15-existing-overnight.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/15-existing-overnight.jpg" alt="Beta · Fight Night with an unsaved fifth row · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night with an unsaved fifth row · 10:59 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/16-existing-end-limit.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/16-existing-end-limit.jpg" alt="Beta · End-date picker for the unsaved Fight Night row · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · End-date picker for the unsaved Fight Night row · 10:59 MST

## TC-08 Duplicate dates

**What this tests** The generator warns about an existing date and time pair and only adds new rows.

**Start here** In **Fight Night → Basic info → Event Date & Time**, keep the unsaved November 25–26 overnight row from TC-07. Use the saved QA draft from TC-10 for the later saved-date variation.

### Steps

1. Select **Generate more dates**. Leave **November 25** selected with the same 9:00 PM to 2:00 AM times.

   **Expected** The preview warns that the existing row will be skipped and disables **Add dates**.

   **Actual — Passed** The preview showed “1 dates are already in the schedule and will be skipped.” **Add dates** was disabled.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/17-existing-duplicate.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/17-existing-duplicate.jpg" alt="Beta · Fight Night duplicate-only preview · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night duplicate-only preview · 10:59 MST

2. In the same picker, also select **November 27**, then select **Add dates**.

   **Expected** The warning remains in the preview. Adding the batch inserts November 27 once and keeps only the original November 25 row.

   **Actual — Passed** The schedule went from five rows to six. November 25 and November 27 appeared as start dates once each.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/18-existing-mixed-preview.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/18-existing-mixed-preview.jpg" alt="Beta · Fight Night mixed preview · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night mixed preview · 10:59 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/19-existing-mixed-result.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/19-existing-mixed-result.jpg" alt="Beta · One new row added to Fight Night · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · One new row added to Fight Night · 10:59 MST

3. On the saved QA draft at 390 px, select **Generate more dates** and choose the saved **November 25** overnight date again.

   **Expected** The generator warns about the saved occurrence and disables **Add dates**.

   **Actual — Passed** The warning appeared and **Add dates** was disabled. The draft still had two saved rows at this stage.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/28-mobile-saved-duplicate.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/28-mobile-saved-duplicate.jpg" alt="Beta · Saved date rejected as a duplicate at 390 px · 11:02 MST" width="390" style="max-width: 100%; height: auto;"></a>

   Beta · Saved date rejected as a duplicate at 390 px · 11:02 MST

## TC-09 Usability at 390 px

**What this tests** The date generator, row date pickers, and schedule actions can be reached and used at a narrow browser width.

**Start here** On Beta in **1859-qa-cad**, use the multi-date Create Event form with an empty schedule. Set the browser viewport to **390 × 844 px**. For the edit check, use **Fight Night → Basic info → Event Date & Time**.

### Steps

1. In Create Event, select the **Generate dates** tab and the **Generate dates** button. Open the **Selected dates** calendar and both **Repeat daily** calendars. Add November 25 at the default times and open the new row’s **End date** picker.

   **Expected** The controls remain reachable. All three generator calendars block November 19 and earlier. The row shows November 25 at 9:00 PM to November 26 at 2:00 AM and blocks November 24 as an end date.

   **Actual — Passed** The page fit the 390 px viewport. All three calendars and the end-date picker opened, the date limits held, and the row showed the expected overnight values.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/09-mobile-calendar.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/09-mobile-calendar.jpg" alt="Beta · Selected-date calendar at 390 px · 10:58 MST" width="390" style="max-width: 100%; height: auto;"></a>

   Beta · Selected-date calendar at 390 px · 10:58 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/10-mobile-row.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/10-mobile-row.jpg" alt="Beta · Generated row at 390 px · 10:58 MST" width="390" style="max-width: 100%; height: auto;"></a>

   Beta · Generated row at 390 px · 10:58 MST

2. Select **Clear dates → Cancel**, then **Add another date**, then **Clear dates → Confirm**.

   **Expected** Cancel leaves the row in place, Add another date adds a second row, and Confirm clears both.

   **Actual — Passed** The counts were one after Cancel, two after Add another date, and zero after Confirm.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/11-mobile-cleared.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/11-mobile-cleared.jpg" alt="Beta · Empty schedule after mobile Clear dates · 10:58 MST" width="390" style="max-width: 100%; height: auto;"></a>

   Beta · Empty schedule after mobile Clear dates · 10:58 MST

3. On the Fight Night edit page, select **Generate more dates** with the two unsaved overnight dates from TC-08 still selected.

   **Expected** The drawer displays the duplicate warning and the disabled **Add dates** button at 390 px.

   **Actual — Passed** The drawer opened, warned that both dates would be skipped, and kept **Add dates** disabled. **Cancel** closed it. The saved draft was also updated and reloaded at this width in [TC-10](#tc-10-overnight-dates-after-save-and-reload).

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/20-mobile-existing-duplicate.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/20-mobile-existing-duplicate.jpg" alt="Beta · Fight Night duplicate warning at 390 px · 10:59 MST" width="390" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night duplicate warning at 390 px · 10:59 MST

## TC-10 Overnight dates after save and reload

**What this tests** Creation and editing both preserve the calendar days and overnight times on a fresh page load.

**Start here** On Beta in **1859-qa-cad**, open **Create event**, choose **Several dates or showtimes**, and use the name **QA - Dates and Times Overnight - 2026-11-20**, the saved **SPW-21444 Renamed QA location**, **America/Toronto**, and category **Other**.

### Steps

1. Generate November 25 and November 27 using 9:00 PM to 2:00 AM. Select **Create event**, wait for the draft’s **Basic info** page, and reload the page. Scroll to **Event Date & Time**.

   **Expected** A draft opens and a fresh load shows two rows. November 25 at 9:00 PM ends November 26 at 2:00 AM. November 27 at 9:00 PM ends November 28 at 2:00 AM.

   **Actual — Passed** Event ID **650890** opened with **Draft** status. After reload, both rows and all four times were read back from the visible schedule controls.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/25-before-save.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/25-before-save.jpg" alt="Beta · Create Event with both generated overnight rows · 11:01 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Create Event with both generated overnight rows · 11:01 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/27-draft-reloaded.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/27-draft-reloaded.jpg" alt="Beta · Basic info header after the first reload · 11:02 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Basic info header after the first reload · 11:02 MST

2. With the draft open at 390 px, select **Generate more dates**. Select the saved November 25 and the new November 29 at the same times. Choose **Add dates**, select **Save changes**, wait for saving to finish, and reload.

   **Expected** Only the new November 29 row is added. The fresh page shows three rows, with November 29 at 9:00 PM ending November 30 at 2:00 AM. The event remains a draft.

   **Actual — Passed** The editor reported that the duplicate was skipped. The fresh schedule showed November 25–26, November 27–28, and November 29–30, each at 9:00 PM to 2:00 AM. The event still showed **Draft**.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/29-mobile-edit-before-save.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/29-mobile-edit-before-save.jpg" alt="Beta · New date added and duplicate skipped on the draft · 11:02 MST" width="390" style="max-width: 100%; height: auto;"></a>

   Beta · New date added and duplicate skipped on the draft · 11:02 MST

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/31-final-draft.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/31-final-draft.jpg" alt="Beta · Draft header after the mobile save and reload · 11:02 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Draft header after the mobile save and reload · 11:02 MST

## Postconditions and cleanup

- **Fight Night** was reloaded without selecting **Save changes**. It returned to four rows and the unsaved November 25 test date was gone.
- **Event ID 650890** remains available for review as an unpublished draft with three overnight dates. The browser was returned to its normal viewport.

   <a href="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/21-existing-original-restored.jpg"><img src="../../../99%20Archive/QA%20Evidence/events/2026-11-20-dates-and-times/21-existing-original-restored.jpg" alt="Beta · Fight Night after discarding the unsaved schedule edits · 10:59 MST" width="600" style="max-width: 100%; height: auto;"></a>

   Beta · Fight Night after discarding the unsaved schedule edits · 10:59 MST

## Results

The requested new-dashboard checks passed on Beta for the tested Organization and browser widths.

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 step 1](#tc-01-new-create-event-entry) | Passed | — | Create event reached the new wizard on the retest. |
| [TC-02 steps 1–2](#tc-02-past-days-in-the-three-generator-pickers) | Passed | — | Selected, repeat-start and repeat-end calendars blocked past dates. |
| [TC-03 step 1](#tc-03-generator-defaults-and-overnight-row) | Passed | — | 9:00 PM to 2:00 AM generated the following-day end. |
| [TC-04 step 1](#tc-04-earliest-allowed-end-date) | Passed | — | The day before the start was disabled in the end calendar. |
| [TC-05 step 1](#tc-05-date-controls-above-the-table) | Passed | — | Both requested actions appeared above the table. |
| [TC-06 steps 1–2](#tc-06-clear-dates-confirmation) | Passed | — | Cancel kept the row and Confirm cleared it. |
| [TC-07 steps 1–2](#tc-07-dates-and-times-on-an-existing-event) | Passed | — | The multi-date Basic info generator and its generated row matched the Create Event checks. |
| [TC-08 steps 1–3](#tc-08-duplicate-dates) | Passed | — | Duplicate-only batches were blocked. Mixed batches added only new dates. |
| [TC-09 steps 1–3](#tc-09-usability-at-390-px) | Passed | — | Date and schedule controls worked at 390 px. |
| [TC-10 steps 1–2](#tc-10-overnight-dates-after-save-and-reload) | Passed | — | Create and Edit preserved both dates and times after fresh reloads. |

