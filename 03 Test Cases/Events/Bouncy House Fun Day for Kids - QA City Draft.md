---
title: Bouncy House Fun Day for Kids (QA) Draft
date: 2026-11-22
tags:
  - qa/events
  - browser-testing
---

# Bouncy House Fun Day for Kids (QA) Draft

## Overview

One Event Draft was saved and reopened in Showpass beta for `1859-qa-cad`. Event `650952` is scheduled for December 19, 2026, from 1:00 to 4:00 p.m. in `America/Toronto`, at the saved CN Tower location. The exact description and **Fairs & Festivals** category persisted. [Beta editor](https://beta.showpass.com/manage/events/bouncy-house-fun-day-for-kids-qa/basic-info/)

QA City sent the exact assignment from **Runs** to **Organizer builder**. Plan 1 returned an empty-browser blocker before any Showpass save. Plan 2 added the beta startup step, received fresh approval, and saved the Draft. City displayed the matching reply after one manual status refresh.

## Confirmed bugs

No confirmed bugs in the approved Basic info flow.

## Test index

- [TC-01 Organizer access and existing Draft check](#tc-01-organizer-access-and-existing-draft-check)
- [TC-02 Save and reopen one Event Draft](#tc-02-save-and-reopen-one-event-draft)
- [TC-03 Run the exact assignment in Codex and retrieve the reply](#tc-03-run-the-exact-assignment-in-codex-and-retrieve-the-reply)

## Setup and prerequisites

- QA City assignment `231074e9-e06f-4800-ab75-f45fe217cf84`, approved Plan 2. The user authorized one basic-details Draft and beta navigation in the paired Codex in-app browser.
- Tested November 22, 2026, on `beta.showpass.com`. The deployed build was unknown. The Organizer scope was verified through the active Organization, **Manage events**, and access to the Event creation form.
- The approved stop was the reopened Draft. Artwork is for the user. Preview, ticket setup, Order form, basket, sales, and publication were outside the run.

## TC-01 Organizer access and existing Draft check

**Start here.** Open the [beta Dashboard](https://beta.showpass.com/manage/) in the paired Codex in-app browser and use the Organization avatar to confirm `1859-qa-cad` is active.

1. **Open Manage events and filter by the full Event name.** In **Your events**, check **Draft** and **Upcoming** using **Toggle filters** and **Search** with `Bouncy House Fun Day for Kids (QA)`.

   **Expected.** The intended Organization can access **Create event**, and the list establishes the exact-name baseline.

   **Actual (Passed).** The signed-in beta Dashboard showed `1859-qa-cad` as active. **Create event** was available. Both filtered tabs showed “There are no events to show yet.”

## TC-02 Save and reopen one Event Draft

**Start here.** Continue in **Your events** for `1859-qa-cad` after the empty exact-title baseline in TC-01.

1. **Open Create event and select One event.** Set the name to `Bouncy House Fun Day for Kids (QA)`, select the saved **CN Tower** entry at 290 Bremner Blvd, and verify `America/Toronto`. Set both dates to December 19, 2026, with a 1:00 p.m. start and 4:00 p.m. end. Select **Fairs & Festivals** and enter `Kids can bounce and play at an afternoon of inflatable fun. This fictional event is for Showpass QA.`

   **Expected.** Every approved value is available and visible before submission.

   **Actual (Passed).** The form displayed all approved values. The title triggered a suggested **Family Friendly** category and **Family friendly** tag. Both were removed before saving. The initial end-date selection rolled to December 20 with the default overnight times, so both dates were explicitly checked after setting the approved times.

2. **Select Create event once.**

   **Expected.** The action saves one Draft with the approved Basic info and opens its editor.

   **Actual (Passed).** The button changed to **Creating event** and opened Basic info with the **Draft** badge and Event ID `650952`.

   **Usability observation.** An Organizer should be able to tell from the submit action which status it will save. The create form labels the action **Create event**. The **Draft** badge becomes visible in the editor after submission, so someone trying to save a Draft has to infer what the initial action will do. The corresponding frontend form submits with Draft status. [Create form](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-create/ui/pages/EventCreatePage.web.tsx:78)

3. **Reopen the exact match from Build → All events → Draft.** Use the full-title Search filter and select **Edit** on the matching row.

   **Expected.** Exactly one matching Draft appears and the reopened editor preserves the entire approved configuration.

   **Actual (Passed).** The filtered list showed exactly one matching Draft and listed 1:00–4:00 p.m. EST on December 19, 2026. The reopened editor showed Event `650952` in Draft with the exact name, saved CN Tower location, `America/Toronto`, both dates and times, full description, and **Fairs & Festivals**. The capture shows the header, Event ID, location, and timezone. The reopened editor's accessibility readback provided the dates, times, full description, and category. [Reopened Basic info](https://beta.showpass.com/manage/events/bouncy-house-fun-day-for-kids-qa/basic-info/)

   ![[99 Archive/QA Evidence/bouncy-house-fun-day-for-kids/2026-11-22-qa-city-plan-2/reopened-draft.jpg|600]]

## TC-03 Run the exact assignment in Codex and retrieve the reply

**What this tests.** QA City sends an approved Organizer revision to the paired Codex chat and displays the response for the matching assignment.

**Start here.** Open **Runs** in the Codex in-app browser with **Organizer builder** paired as the Organizer Tester. Use the user-approved beta target, `1859-qa-cad` and the existing CN Tower location. [Paired chat](thread://01a2066b-cd78-7bb1-a9ab-5d0a64d3d674?hostId=local)

1. **Select New assignment.** Choose **Organizer Tester**, **Short review**, and **Agent drives**. Enter `Create a single-day bouncy house event for kids` as the title. Set the target to `Showpass beta · 1859-qa-cad · CN Tower` and limit the instructions to one basic-details Draft and a fresh reopen check. Select **Save assignment** and open the new row.

   **Expected.** Runs preserves the exact title, Organizer role, and target.

   **Actual (Passed).** The assignment appeared in Runs with the exact title and scope. City prepared Plan 1 for assignment `231074e9-e06f-4800-ab75-f45fe217cf84`.

   ![[99 Archive/QA Evidence/QA City/bouncy-house-2026-11-22/assignment.jpg|600]]

   QA City, November 22, 2026. Saved Organizer assignment and Plan 1.

2. **Run the short review, send Plan 1 to the QA Lead, and select Run in Codex after approval.** Confirm the plan through the authorization checkbox before launching.

   **Expected.** The control enables after confirmation. Runs queues the approved revision to **Organizer builder** and shows its response.

   **Actual (Passed handoff, blocked beta start).** Runs showed **Queued in Codex**. The paired chat reported zero in-app browser tabs and stopped before checking Showpass or saving a Draft. Runs displayed that blocker under **Codex reply**.

   ![[99 Archive/QA Evidence/QA City/bouncy-house-2026-11-22/approved-handoff.jpg|600]]

   QA City, November 22, 2026. Plan 1 approved and its launch control enabled.

   ![[99 Archive/QA Evidence/QA City/bouncy-house-2026-11-22/queued-in-codex.jpg|600]]

   QA City, November 22, 2026. Queue acknowledgment for Plan 1.

   ![[99 Archive/QA Evidence/QA City/bouncy-house-2026-11-22/plan-1-returned-blocker.jpg|600]]

   QA City, November 22, 2026. The paired chat’s reply reports the missing beta tab and stops before save.

3. **Select Revise plan and approve Plan 2.** Add a startup step to reuse an open beta Dashboard tab or open `https://beta.showpass.com/manage/` in the same paired in-app browser. Keep the same Draft values and stop before save if sign-in or Organizer access is unavailable. Run the short review and obtain fresh QA Lead approval. Confirm the scope and select **Run in Codex** once.

   **Expected.** City dispatches Plan 2 after its own approval. The paired chat can reach the authorized beta Dashboard and execute TC-01 and TC-02.

   **Actual (Passed).** City showed **Running in Codex**. The Organizer reached the signed-in beta Dashboard, verified the target, then saved and reopened Event `650952`.

   ![[99 Archive/QA Evidence/QA City/bouncy-house-2026-11-22/plan-2-approved.jpg|600]]

   QA City, November 22, 2026. Fresh approval for Plan 2.

   ![[99 Archive/QA Evidence/QA City/bouncy-house-2026-11-22/plan-2-running.jpg|600]]

   QA City, November 22, 2026. The paired Organizer was executing Plan 2.

4. **Check the reply in Runs after the paired chat finishes.** If Runs still shows **Running in Codex**, select **Refresh Codex status** once.

   **Expected.** The same assignment shows **Codex turn completed** and returns Event `650952` with the Draft details and editor link.

   **Actual (Passed after manual refresh).** The paired turn took about 5 minutes 32 seconds. Runs still displayed **Running in Codex** after that turn finished. One refresh retrieved **Codex turn completed** and the exact Draft result. City polls a limited number of times while the assignment is open. The browser outcome was not separately recorded in City.

   ![[99 Archive/QA Evidence/QA City/bouncy-house-2026-11-22/plan-2-draft-result.jpg|600]]

   QA City, November 22, 2026. The matching response returned after the status refresh.

## Continuation handoff for the Public Tester

Showpass beta, Organization `1859-qa-cad`, Event `650952`. On November 22, 2026, the Organizer saved and reopened exactly one Basic info Draft with the name **Bouncy House Fun Day for Kids (QA)**, the saved **CN Tower** location, **Fairs & Festivals**, and December 19, 2026, 1:00–4:00 p.m. `America/Toronto`. The description is “Kids can bounce and play at an afternoon of inflatable fun. This fictional event is for Showpass QA.” The editor was left open for review. No incidental test data needed cleanup. [Draft editor](https://beta.showpass.com/manage/events/bouncy-house-fun-day-for-kids-qa/basic-info/)

After the independent Public Tester assignment has its own approval, use the authorized beta session to open the Preview URL and check that it displays the saved Event title, date, local time, location, and description. Stop after recording the read-only result or the exact access screen. This run observed the editor's **Preview** control and derived its URL from the route and verified slug. Preview access and rendering are untested. The user will add artwork. [Event Preview](https://beta.showpass.com/preview/bouncy-house-fun-day-for-kids-qa/)

## Results

| Check | Status | Bug | Evidence |
| --- | --- | --- | --- |
| [TC-01 Organizer access and existing Draft check](#tc-01-organizer-access-and-existing-draft-check) | Passed | — | Beta Dashboard, active `1859-qa-cad`, Create event access, zero matching Draft or Upcoming rows before save. |
| [TC-02 Save and reopen one Event Draft](#tc-02-save-and-reopen-one-event-draft) | Passed | — | One exact-title Draft after one save. Event `650952` and all approved values verified in reopened Basic info. |
| [TC-03 Runs dispatch and result, steps 1–4](#tc-03-run-the-exact-assignment-in-codex-and-retrieve-the-reply) | Passed after manual refresh | — | Exact Organizer assignment dispatched from Runs, executed in the paired Codex in-app browser, and returned matching Draft `650952`. |
| [TC-03 Plan 1 beta startup, step 2](#tc-03-run-the-exact-assignment-in-codex-and-retrieve-the-reply) | Blocked | — | The paired browser had zero tabs. Plan 2 covered startup in the same browser and recovered the run. |
| [Public Tester Preview](#continuation-handoff-for-the-public-tester) | Not run | — | Source-derived URL and the verified slug are available for the separately approved check. |
