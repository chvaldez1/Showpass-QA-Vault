---
title: Neon Encore Music Festival - Beta Attraction Draft
date: 2026-11-26
tags:
  - qa/browser-testing
  - events
  - attraction
---

# Neon Encore Music Festival (QA)

The Organizer Builder created and reopened one **Draft** Attraction, Event **651094**, in Showpass Beta Organization **1859-qa-cad**. Its **Late-night set** section links to the existing **Neon Encore K-pop Club Night (QA)**, Event **650970**. The new record is a fictional music festival setup. [Basic info](https://beta.showpass.com/manage/events/neon-encore-music-festival-qa/basic-info/) · [Attraction configuration](https://beta.showpass.com/manage/events/neon-encore-music-festival-qa/edit-attraction/)

## Test index

- [TC-01 Create and reopen the festival Draft](#tc-01-create-and-reopen-the-festival-draft)
- [TC-02 Save and reopen the Attraction section](#tc-02-save-and-reopen-the-attraction-section)

## Setup

- **Session.** Signed-in Organizer Dashboard in the Codex sidebar on Beta. The Organization selector showed **1859-qa-cad**, and **Create event** opened the new Dashboard form. Prior readiness confirmation for this Organization covered **Manage Events** and the new Dashboard. The current session verified access through those controls.
- **Review.** The Release Engineer reviewed Plan 1, then the independent QA Lead approved that revision before browser work.
- **Scope.** One new Event and one Attraction section on it. The linked Club Night and saved CN Tower location already existed. The run stopped at the verified Draft configuration.

## TC-01 Create and reopen the festival Draft

**What this tests.** The Organizer can save and reopen a one-day festival Draft at the intended location and time.

**Start here.** Open the Beta Dashboard **Build → Events → All events** and confirm **1859-qa-cad** in the Organization selector.

1. Open **Toggle filters**, search for `Neon Encore Music Festival (QA)`, and check **Upcoming** and **Draft**. Select **Create event → One event**. Enter the exact title, choose saved **CN Tower – 290 Bremner Blvd – Toronto, Ontario**, and choose **Music**. Set both dates to **December 12, 2026**, with **Start time** at **2:00 p.m.** and **End time** at **10:30 p.m.** in `America/Toronto`. Enter `A one-day QA music festival with daytime DJ sets and a late-night K-pop club set. This fictional festival brings the lineup together on one Showpass page.` Select **Create event** once and reload **Basic info** after it opens.

   **Expected.** Both searches are empty before creation. The reopened editor shows one new Draft with an Event ID, the exact name, saved location, times, timezone, category and description.

   **Actual — Passed.** Both filtered views showed **There are no events to show yet**. After the create and reload, **Basic info** showed **Draft**, Event `651094`, and all the planned values. Evidence for this step is the browser accessibility and form readback. [Reopened Basic info](https://beta.showpass.com/manage/events/neon-encore-music-festival-qa/basic-info/)

## TC-02 Save and reopen the Attraction section

**What this tests.** The Festival Draft can save a section that points to the existing Club Night.

**Start here.** In the saved Festival Draft, open the **Basic info** navigation menu and select **Edit attraction**.

1. Select **Add section**. Set **Section type** to **Single event**, **Section title** to `Late-night set`, and the description to `Close the festival with Neon Encore K-pop Club Night, 7–10 p.m. Toronto time.` Search **Events** for `Neon Encore K-pop Club Night`. Select the exact **Neon Encore K-pop Club Night (QA)** match with December 12, 2026, **7:00–10:00 p.m. EST**. Select **Save**, wait for **Sections updated successfully**, reload the editor and expand **Late-night set**.

   **Expected.** The reopened section retains the type, title, description and selected Showpass Event. The new festival stays in Draft.

   **Actual — Passed.** The Dashboard displayed **Sections updated successfully**. After reload, the editor still showed Event `651094` in **Draft**. The expanded section showed **Single event**, **Late-night set**, the saved description, and **Neon Encore K-pop Club Night (QA)**. The picker matched the exact name and schedule of the existing Event `650970` documented in the QA Vault. [Reopened Attraction configuration](https://beta.showpass.com/manage/events/neon-encore-music-festival-qa/edit-attraction/) · [[03 Test Cases/Memberships/K-pop Club Monthly Membership - QA City#TC-05 Publish the supporting Event and attach the Level benefit|Existing Event setup]]

   <img src="../../99%20Archive/QA%20Evidence/neon-encore-music-festival/2026-11-26-attraction/linked-event.jpg" alt="Neon Encore K-pop Club Night shown in the reopened saved Attraction section" width="252">

   Beta, November 26, 2026, approximately 2:55 p.m. MST. The image shows the linked Event after the saved Attraction section was reopened.

## Continuation handoff

> In Showpass Beta Organization **1859-qa-cad**, **Neon Encore Music Festival (QA)**, Event **651094**, is a verified Draft for **December 12, 2026, 2:00–10:30 p.m. Toronto time** at **CN Tower**, category **Music**. Under **Edit attraction**, the saved **Late-night set** section is a **Single event** linked to existing Club Night Event **650970**. Reopened **Basic info** and **Attraction configuration** on November 26, 2026. The section editor is open. There were no confirmed bugs or incidental data to restore. Artwork and buyer Preview are pending. To check the visitor view in a separately approved read-only run, open the Draft's **Basic info**, select **Preview**, and verify that the **Late-night set** section displays the linked Club Night. Stop before selecting tickets. [Basic info](https://beta.showpass.com/manage/events/neon-encore-music-festival-qa/basic-info/) · [Attraction configuration](https://beta.showpass.com/manage/events/neon-encore-music-festival-qa/edit-attraction/)

## Results

| Check | Status | Observed result |
| --- | --- | --- |
| [TC-01 Create and reopen the festival Draft](#tc-01-create-and-reopen-the-festival-draft) | Passed | One Draft, ID 651094, reopened with the expected details. |
| [TC-02 Save and reopen the Attraction section](#tc-02-save-and-reopen-the-attraction-section) | Passed | The Single event section and club-night link persisted. |
| Buyer Preview | Not run | The assignment ended at saved Dashboard configuration. |
