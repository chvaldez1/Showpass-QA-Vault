---
title: Toronto Christmas Market City Draft
date: 2026-11-22
status: Passed
tags:
  - browser-testing
  - qa/city
---

# Toronto Christmas Market City Draft

City created Event **650951** in the **1859-qa-cad** Organization, then reopened the migrated Order form and verified both optional questions. The Event remains in Draft. [Showpass beta Draft](https://beta.showpass.com/manage/events/toronto-christmas-market/basic-info/)

## Confirmed bugs

No Showpass bug was confirmed. The City runner needed adjustments to recognize the migrated editor, match saved location labels, and validate the Order form update. Checkout display and Preview were untested.

## Test index

- [TC-01 Create and reopen the Event Draft](#tc-01-create-and-reopen-the-event-draft)
- [TC-02 Save and reopen the two Order form questions](#tc-02-save-and-reopen-the-two-order-form-questions)

## Setup

- Showpass beta, migrated Dashboard, dedicated local Playwright Chromium session. The user signed in and confirmed **1859-qa-cad** and **CN Tower**. The runner verified Organization, location, and both migrated pages.
- The Release Engineer completed a short review. The independent QA Lead approved Plan 1 before the run.
- The approved changes were one Event Draft and its two optional questions. Public Preview, tickets, images, and test orders were outside the run.

## TC-01 Create and reopen the Event Draft

**Start here** Sign in to Showpass beta as an Organizer with access to **1859-qa-cad**. Use the saved **CN Tower** Event location.

1. Open **Create event**, select **One event**, and enter **Toronto Christmas Market**, **Fairs & Festivals**, and **CN Tower**. Set December 12, 2026 from 11 a.m. to 5 p.m. in **America/Toronto**. Select **Create event**.

   **Expected** The migrated **Basic info** editor opens for a saved Draft.

   **Actual — Passed** The editor opened and the fresh Dashboard response showed Event `650951` with `status: sp_event_draft`, `venue: 1859`, `starts_on: 2026-12-12T16:00:00Z`, and `ends_on: 2026-12-12T22:00:00Z`. City saved the Event on the first successful submission and resumed the same record for later checks. The browser run recorded the editor URL and saved response fields as evidence.

## TC-02 Save and reopen the two Order form questions

**Start here** Open **Toronto Christmas Market** in the migrated beta Event editor.

1. Open **Order form** and add two optional **Short text** questions during checkout. Select **Save**, then reopen **Order form**.

   **Expected** The reopened form retains the questions below in the same order.

   **Actual — Passed** The fresh Dashboard response contained exactly these two `collect_info_custom_questions` entries. Both saved with `type: text`, `required: false`, `collect_after_checkout: false`, and no restriction to a ticket type.

   1. What kinds of market stalls are you most interested in visiting?
   2. How did you hear about the market?

   [Saved Order form](https://beta.showpass.com/manage/events/toronto-christmas-market/order-form/)

## Postconditions

Event **650951** and its two questions are preserved in Draft. The run recorded browser navigation and saved response fields. Screenshots were not captured by the City runner.

[[01 Repositories/Backend - web-app|Backend reference]] · [[01 Repositories/Frontend - showpass-frontend|Frontend reference]]

## Results

| Check | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 — Create and reopen the Event Draft](#tc-01-create-and-reopen-the-event-draft) | Passed | — | Verified Event 650951, Draft status, and one-day Toronto schedule. |
| [TC-02 — Save and reopen the two Order form questions](#tc-02-save-and-reopen-the-two-order-form-questions) | Passed | — | Verified both optional questions after reopening the migrated Order form. |
