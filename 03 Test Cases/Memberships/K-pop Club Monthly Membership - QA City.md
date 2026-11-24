---
title: K-pop Club Monthly Membership in QA City
date: 2026-11-23
tags:
  - qa/city
  - memberships
  - browser-testing
---

# K-pop Club Monthly Membership in QA City

## Overview

City saved **Create a monthly recurring membership for a K-pop club** under Organizer Builder. Plan 1 passed short review and received independent QA Lead approval. The paired chat saved and reopened **Neon Encore K-pop Club (QA)** and its single **Encore Member** Level in Showpass beta on November 23, 2026. The Group remained **Draft** with **Monthly** renewal and **Renewals Enabled**. The Level saved at **CAD 19.00**, with inventory **20** and a purchase limit of **1**. City shows **Completed** with a **Passed** browser result and both verified record IDs. [Group 20439](https://beta.showpass.com/manage/memberships/20439/) · [Level 9829](https://beta.showpass.com/manage/memberships/20439/levels/9829/)

## Test index

- [TC-01 Save, approve, and dispatch the City run](#tc-01-save-approve-and-dispatch-the-city-run)
- [TC-02 Save and reopen the Monthly Membership and Level](#tc-02-save-and-reopen-the-monthly-membership-and-level)
- [TC-03 Retest the Organizer Builder skill on the saved Draft](#tc-03-retest-the-organizer-builder-skill-on-the-saved-draft)
- [TC-04 Enrich the saved K-pop Draft](#tc-04-enrich-the-saved-k-pop-draft)
- [TC-05 Publish the supporting Event and attach the Level benefit](#tc-05-publish-the-supporting-event-and-attach-the-level-benefit)
- [BUG-01 Draft Financials shows Organization totals](#bug-01--draft-financials-shows-organization-totals)

## Setup

- **Surface and date** · [QA City Runs](http://127.0.0.1:3000/runs) in the Codex in-app browser on November 23, 2026.
- **Role and venue** · Organizer Builder. The user confirmed Showpass beta Organization **1859-qa-cad**, Memberships, and **Manage Memberships**.
- **Planned data** · **Neon Encore K-pop Club (QA)**, **Monthly** renewal, **Renewals Enabled**, and one **Encore Member** Level at 19.00 in the verified venue currency, inventory 20, and purchase limit 1.
- **Finishing point** · Reopen both records and verify that the Group stayed Draft. Retain the Draft for the user and leave artwork for them.

## TC-01 Save, approve, and dispatch the City run

1. In **Runs**, select **New assignment**, choose **Organizer Builder**, and save the K-pop assignment with the beta target and Draft scope. Open its row and select **Prepare plan**.

   **Expected:** The plan states what to verify, what evidence to capture, and when to stop.

   **Actual — Passed:** City saved Plan 1 under Organizer Builder. **Checks and expected proof** covered preflight and field readback. **When to stop** covered a Publish requirement, access mismatch, and unresolved save outcomes.

2. In **Current work**, select **Run short review**, then **Send to QA Lead**.

   **Expected:** City lets the short review proceed and stores the independent decision on the exact plan before launch.

   **Actual — Passed after recovery:** The short review kept the run routine. Earlier Lead responses failed validation and one request timed out. I updated the City prompt to request a concise rationale and list the required review fields. A subsequent response saved **Plan 1 · QA Lead approved**.

3. Confirm the authorized Plan 1 actions, then select **Run in Codex** once.

   **Expected:** City queues the approved plan for the paired Organizer Builder.

   **Actual — Passed:** City displayed **Queued in Codex** and the paired chat link. The browser connector blocked opening the native chat link. The user reported that the paired chat had started. I verified the matching turn and its completed reply.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/city-approved-queued.jpg" alt="City shows Plan 1 approved and queued in the paired Codex chat" width="600" style="max-width: 100%; height: auto;">

4. After **Codex replied**, open **Record browser result**, select **Passed**, and enter the verified readback, structured record, and findings. Save the result and reopen the saved sections.

   **Expected:** City shows **Completed** and retains the verified Group and Level IDs and both findings.

   **Actual — Passed:** The saved result showed **Passed** and **Completed**. The reopened structured record contained Group `20439` and Level `9829`. The **2 findings** section retained the Draft-label usability issue and the duplicate-check observation. Monthly renewal is recorded in the result summary because the structured Group schema lacks the renewal frequency field.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/city-result-completed.jpg" alt="City shows the completed K-pop Membership run with its passed beta result and two findings" width="600" style="max-width: 100%; height: auto;">

## TC-02 Save and reopen the Monthly Membership and Level

**Start here:** Continue the approved Plan 1 in the paired Organizer Builder chat. Check the active beta Organization, Organizer access, currency, and exact-name absence before saving.

**Expected:** Reopen **Neon Encore K-pop Club (QA)** and its **Encore Member** Level. Capture both IDs, the Level settings, and the Group still in **Draft** with **Monthly** and **Renewals Enabled**.

1. **Verify the Organization and Memberships access.** In beta, open the Organization picker and confirm `1859-qa-cad` is active. Open **Organization → Organization settings → General** to read **Venue ID** and **Currency**. Then open **Build → All memberships** and check the **Published** and **Draft** lists for the exact Group name.

   **Expected:** Venue `1859` shows the applicable currency, the signed-in Organizer can open **Create membership**, and neither list contains the exact Group name.

   **Actual — Passed:** The active Organization was `1859-qa-cad`. **General** showed Venue ID `1859` and **Canadian Dollars**. The exact name was absent in both lists before creation. **Create membership** opened successfully, verifying effective Organizer access for this action.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-venue-currency.jpg" alt="Showpass beta Organization General shows Venue 1859, 1859-qa-cad, and Canadian Dollars" width="600" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-draft-baseline.jpg" alt="Memberships Draft tab before creation shows no matching Neon Encore K-pop Club Group" width="600" style="max-width: 100%; height: auto;">

2. **Save the Group once and reopen it.** Enter `Neon Encore K-pop Club (QA)` and `Join fellow K-pop fans for comeback listening sessions, choreography practice and fan discussions.` Select **Monthly**, confirm **Renewals Enabled** is on, and select **Create membership**. From **Membership Levels**, open **Edit Membership**.

   **Expected:** The create action saves one Draft and the editor reopens with the exact name, description, Monthly frequency, and enabled renewals.

   **Actual — Passed:** Showpass displayed **Membership created successfully** and opened **Membership Levels** for Group `20439`. The reopened editor displayed the exact details and the **Save Draft** and **Publish** actions. **Membership Levels** showed **No levels yet** before the Level save.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-group-reopened-before-level.jpg" alt="Reopened Group before adding the Level shows Monthly, Renewals Enabled, and the saved description" width="600" style="max-width: 100%; height: auto;">

3. **Save the Level once and reopen it.** In Group `20439`, open **Membership Levels → Add Level**. Set **Name** to `Encore Member`, **Price (CAD)** to `19.00`, and **Inventory** to `20`. Verify **Purchase Limit** is `1` and select **Create Level**. Open **Edit membership level** on the new row.

   **Expected:** Exactly one Level appears under Group `20439`, and its reopened editor shows the requested settings.

   **Actual — Passed:** Showpass displayed **Membership level created successfully**. The parent Levels list showed one row with **Encore Member**, **$19.00** under **Price (CAD)**, inventory **20**, and zero Level benefits. The reopened editor at `/manage/memberships/20439/levels/9829/` confirmed the exact name, **CAD 19.00**, inventory **20**, and purchase limit **1**. [Level 9829](https://beta.showpass.com/manage/memberships/20439/levels/9829/)

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-level-reopened.jpg" alt="Reopened Encore Member Level shows CAD 19.00, inventory 20, and purchase limit 1" width="600" style="max-width: 100%; height: auto;">

4. **Reopen the Group after the Level save.** Return through **Build → All memberships → Draft** and select **Edit membership group** on the exact match.

   **Expected:** The Draft list shows one exact match with one Level. The reopened Group still has the same Monthly renewal settings and description.

   **Actual — Passed:** The **Draft** list showed one exact match with **1** Level and **0** Members. The reopened editor for Group `20439` still showed **Monthly**, **Renewals Enabled** on, and the exact description. It displayed `/m/neon-encore-k-pop-club-qa/` as the Group path. The Group editor was left open. [Group 20439](https://beta.showpass.com/manage/memberships/20439/)

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-group-draft-after-level.jpg" alt="Memberships Draft tab shows Neon Encore K-pop Club with one Level and zero Members" width="600" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-group-reopened-after-level.jpg" alt="Group reopened after the Level save with Monthly and Renewals Enabled intact" width="600" style="max-width: 100%; height: auto;">

### Findings

- **Usability · The create action does not say it saves a Draft.** On the new Group form, the submit label was **Create membership**. An Organizer creating a Draft should be able to tell the save status before submitting. The generic label leaves that status implicit until the Group is saved. The corresponding source sets Draft on this action, and TC-02 steps 2 and 4 proved the saved outcome. [Create form action](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/membership-group-form/FormFooterActions.web.tsx:72)
- **Observation · Exact-name checking required reading the lists.** On **Build → All memberships**, I expected a record-level search for the duplicate check. The two tab lists had no visible name filter. **Search dashboard** opened **Find a page**. I compared the names in both loaded lists and confirmed the before and after counts. A longer list would make the same check slower. The Draft list screenshots show the observed page. This run did not assess other list sizes.

No product bug was confirmed in the beta setup.

## Initial City run handoff

Verified November 23, 2026, in Showpass beta, Organization `1859-qa-cad` (Venue `1859`, CAD). **Neon Encore K-pop Club (QA)** remains **Draft** with **Monthly** and **Renewals Enabled**. Its single **Encore Member** Level is **CAD 19.00**, inventory **20**, purchase limit **1**. The Draft and Level were retained for review, with artwork pending and no incidental data to restore. No buyer, checkout, or renewal charge checks were run. [Group 20439](https://beta.showpass.com/manage/memberships/20439/) · [Level 9829](https://beta.showpass.com/manage/memberships/20439/levels/9829/)

For a separately approved Customer Tester assignment, first confirm an authorized, purchasable beta fixture and test payment readiness. This Group is Draft. Stop before checkout if no approved published fixture is available. Publication and buyer checks require their own approval.

## TC-03 Retest the Organizer Builder skill on the saved Draft

On November 23, 2026, the Release Engineer completed short review and the independent QA Lead approved the Builder's read-only Plan 1 for Group `20439`. Start in the matching Codex in-app tab. Stop after inspecting the saved configuration and proposing specific additions and proof.

1. Open the Organization selector and read **Edit Membership**. **Expected:** the signed-in Dashboard is on `1859-qa-cad` and Group `20439` is the intended Monthly Draft. **Actual:** the selected Organization was `1859-qa-cad`. **Neon Encore K-pop Club (QA)** showed **Monthly**, **Renewals Enabled**, and **Save Draft** and **Publish**.
2. Read **Membership Levels**, **Membership Benefits**, **Level Benefits**, and **Order Form**. **Expected:** identify the existing Level and any benefit or Member question to preserve. **Actual:** **Encore Member** `9829` showed **CAD 19.00**, Inventory **20**, Purchase Limit **1**, and Public visibility. Both benefit views said **No benefits yet**. **Order Form** had no fields. **Level Benefits → Add Benefit** offered **Discount**. The check ended back on **Edit Membership** with zero Showpass data changes.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-builder-level-benefit-options.jpg" alt="Authorized read-only inspection of the Encore Member benefit type options" width="600" style="max-width: 100%; height: auto;">

**Proposed enrichment.** Keep **Encore Member** as the standard Level. Add **Backstage Encore** at **CAD 29.00**, Inventory **10**, Purchase Limit **1**. Give the new Level a **10%** discount with a **Per Member Limit** of **2** and one eligible Ticket Type on a compatible authorized QA Event. Identify that exact Event and Ticket Type before any benefit save. Add the optional Member question **“Which club activity are you most interested in?”** for both Levels and verify that per-Member collection is enabled.

For a live save, confirm that the Draft is still isolated from existing Members. After saving, reopen the Group to verify Draft and Monthly, both Levels to verify price, stock, and purchase limits, and **Level Benefits** to verify the new discount's owner, eligible item, and limit. Reopen **Order Form** to verify the question and Level scope. The receiving Customer Tester can compare the two Levels' discount eligibility once an authorized purchasable fixture exists.

## TC-04 Enrich the saved K-pop Draft

On November 23, 2026, the user approved the proposed additions. QA Lead approved Plan 2 with a Member-history preflight. The all-Level Members view only covered active Members. After tracing the conflicting Financials totals, the QA Lead approved Plan 3 for the same additive changes on the zero-active-Member Draft. Prior inactive issuance was unverified. The approved finish point was the saved Draft, two verified Levels, and the optional question. The discount depended on a verified, compatible QA Ticket Type under `1859-qa-cad`.

1. Open **Members** and **Financials** for Group `20439`. **Expected:** the Group's current member counts agree. **Actual:** **Members** showed **No members found** with **All Levels** selected. **Financials** showed **1,445 Active Members** under the same Group heading. The save paused for review. See [BUG-01](#bug-01--draft-financials-shows-organization-totals).

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-builder-enrichment-financials-baseline.jpg" alt="Draft K-pop Group Financials displays 1,445 active Members" width="600" style="max-width: 100%; height: auto;">

2. In **Membership Levels → Add Level**, enter **Backstage Encore**, **CAD 29.00**, and Inventory **10**. Keep **Public** and Purchase Limit **1**. Select **Create Level**, then reopen its editor. **Expected:** one new Level with the exact settings and the standard Level preserved. **Actual:** the list showed both Levels. The reopened [Backstage Encore editor](https://beta.showpass.com/manage/memberships/20439/levels/9830/) confirmed ID `9830`, price **CAD 29.00**, Inventory **10**, and Purchase Limit **1**.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-builder-enrichment-level-reopened.jpg" alt="Reopened Backstage Encore Level showing its saved configuration" width="600" style="max-width: 100%; height: auto;">

3. Open **Order Form → Add field → Short text**. Enter **Which club activity are you most interested in?** with **Required** off and both Levels selected. Save, reload the page, and reopen the field. **Expected:** one optional question assigned to both Levels with per-Member collection available. **Actual:** the reopened [Order Form](https://beta.showpass.com/manage/memberships/20439/order-form/) showed the exact question, Required off, both Levels checked, and the per-Member collection description without the disabled-collection status. Buyer display was untested.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-builder-enrichment-order-form-reopened.jpg" alt="Reopened optional Member question with Encore Member and Backstage Encore checked" width="600" style="max-width: 100%; height: auto;">

4. In **Backstage Encore → Level Benefits → Add Benefit**, choose **Discount** and search **Single Event**. **Expected:** one exact qualifying QA Ticket Type can be selected for the **10%** discount and **Per Member Limit** of **2**. **Actual:** **K-pop**, **kpop**, and **rave** returned no matches. **Concert** and **music** returned events whose QA fixture identity was unverified. The discount was left unsaved. Back on **Edit Membership**, the Group still showed **Save Draft**, **Publish**, **Monthly**, and **Renewals Enabled**.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-builder-enrichment-draft-reopened.jpg" alt="Reopened Group editor confirms the Monthly Draft after enrichment" width="600" style="max-width: 100%; height: auto;">

### BUG-01 — Draft Financials shows Organization totals

**Title** · Draft Membership Financials shows 1,445 active Members when the Group has zero

**GIVEN** I am an Organizer in beta `1859-qa-cad` with the **Neon Encore K-pop Club (QA)** Draft open.

**WHEN** I open **Members** with **All Levels** selected, then open **Financials** for the same Membership.

**THEN** **Members** shows **No members found** and **Financials** reports **1,445 Active Members** under the same Membership name. The Membership Financials page should show a count for this Draft. The mismatch can make an Organizer think a newly created Draft already has Members and revenue.

The current frontend requests stats using the Group ID without a status filter. The backend defaults the selection to Published and drops the Group restriction when the selection is empty. That explains the Organization totals under a Draft heading. [Frontend request](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/pages/detail/GroupStatsPage.web.tsx:49) · [Backend default](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/filters.py:17) · [Stats fallback](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/groups/membership_stats.py:33)

## TC-05 Publish the supporting Event and attach the Level benefit

The user authorized one supporting Event, one Ticket Type, and publication of that Event in beta `1859-qa-cad`. Plan 4 received the Backend Master and Frontend Master source reviews, the Release Engineer handoff, and QA Lead sign-off. Group `20439` stayed Draft. Keep the three new records as test data.

1. In **Build → All events → Create event → One event**, create **Neon Encore K-pop Club Night (QA)** at the saved **CN Tower** location, December 12, 2026, 7–10 p.m. EST. Set **Music**, **Hidden**, and turn off **Display on calendar widget**. **Expected:** one Event in the correct Organization with the agreed schedule and discovery settings. **Actual:** the Event reopened as Draft `650970` with the exact schedule and discovery settings.
2. In **Tickets**, save **Club Night General Admission**, CAD **25.00**, inventory **30**. Edit it, set sales from December 5 at 10 a.m. EST to December 12 at 7 p.m. EST, leave **Bypass sale starts on time in Box Office** unchecked, then select **Continue** and **Save**. Reopen the ticket. **Expected:** ticket and future sales window persist. **Actual:** Ticket Type `1631088` retained all agreed values, including after publication.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-kpop-support-ticket-sale-window.jpg" alt="Saved Ticket Type 1631088 showing the future sale window and Box Office bypass off" width="600" style="max-width: 100%; height: auto;">

3. Open **Publish event → Publish now** and confirm. Reopen **Basic info**. **Expected:** the Event is published with Hidden visibility. **Actual:** the editor showed **Unlisted** and offered **View event**. **Hidden** remained selected, and **Hidden from calendar widget** remained visible. The Dashboard showed the direct Event URL and retained the saved sale window. The buyer page was untested.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-kpop-support-event-published.jpg" alt="Published supporting Event 650970 with the Unlisted badge" width="600" style="max-width: 100%; height: auto;">

4. Confirm **Members** is empty with **All Levels** selected, then open **Backstage Encore → Level Benefits → Add Benefit**. Select **Discount**, **10%**, and **Per Member Limit** of **2**. Select exactly the new Event and its one Ticket Type. Save, reload, and open **Edit membership benefit**. **Expected:** the exact Level-only discount persists, and **Edit Membership** still shows Draft and Monthly. **Actual:** the saved discount showed **10%**, **2**, **1 Event selected**, and **1 Ticket type selected**, with **Club Night General Admission** checked. The Group still showed **Save Draft**, **Publish**, **Monthly**, and **Renewals Enabled**. The benefit list labels the one linked Event **Multiple Events 1**, which makes the saved scope harder to read until the Organizer opens the row.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-kpop-city/beta-kpop-backstage-benefit-reopened.jpg" alt="Reopened Backstage Encore discount showing ten percent, per-Member limit of two, and one checked ticket type" width="600" style="max-width: 100%; height: auto;">

### Enriched Draft handoff

Verified on November 23, 2026, in Showpass beta `1859-qa-cad`. Group `20439` is a Monthly Draft with renewals enabled, and the optional Member question applies to both Levels. Backstage Encore `9830` offers 10% off only **Club Night General Admission** `1631088` on the published Unlisted Event `650970`, with two uses per Member. First verify the sale window and availability of an authorized purchasable Membership fixture in a separate Customer Tester plan. [Group 20439](https://beta.showpass.com/manage/memberships/20439/) · [Level Benefits](https://beta.showpass.com/manage/memberships/20439/levels/9830/benefits/) · [Event 650970](https://beta.showpass.com/manage/events/neon-encore-k-pop-club-night-qa/basic-info/)

```json
[
  {
    "kind": "event",
    "record": {
      "id": 650970,
      "name": "Neon Encore K-pop Club Night (QA)",
      "slug": "neon-encore-k-pop-club-night-qa",
      "status": "sp_event_active",
      "venue": 1859,
      "location_name": "CN Tower",
      "starts_on": "2026-12-12T19:00:00-05:00",
      "ends_on": "2026-12-12T22:00:00-05:00",
      "timezone": "America/Toronto",
      "tickettype_set": [
        {
          "id": 1631088,
          "name": "Club Night General Admission",
          "price": "25.00",
          "inventory": 30,
          "sale_starts_on": "2026-12-05T10:00:00-05:00",
          "sale_ends_on": "2026-12-12T19:00:00-05:00"
        }
      ]
    }
  },
  {
    "kind": "membership_group",
    "record": {
      "id": 20439,
      "name": "Neon Encore K-pop Club (QA)",
      "venue": 1859,
      "status": "sp_membership_group_draft",
      "renewal_frequency": "monthly",
      "renewals_enabled": true,
      "membership_levels": [
        { "id": 9829, "name": "Encore Member", "price": "19.00", "inventory": 20, "purchase_limit": 1 },
        { "id": 9830, "name": "Backstage Encore", "price": "29.00", "inventory": 10, "purchase_limit": 1 }
      ]
    }
  }
]
```

## Results

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01 — City plan, approval, and dispatch](#tc-01-save-approve-and-dispatch-the-city-run) | Passed after recovery | — | Plan 1 approved and queued exactly once. |
| [TC-01 — City result, step 4](#tc-01-save-approve-and-dispatch-the-city-run) | Passed | — | City completed the run and retained the Group and Level IDs with two findings. |
| [TC-02 — Beta preflight, step 1](#tc-02-save-and-reopen-the-monthly-membership-and-level) | Passed | — | Verified Organization, CAD currency, effective Organizer access, and exact-name absence. |
| [TC-02 — Saved beta Group and Level, steps 2–4](#tc-02-save-and-reopen-the-monthly-membership-and-level) | Passed | — | Group `20439` stayed Draft with Monthly renewal enabled after Level `9829` was saved and reopened. |
| [TC-03 — Builder skill retest](#tc-03-retest-the-organizer-builder-skill-on-the-saved-draft) | Passed for read-only check | — | Verified the current setup and tailored a second Level, scoped benefit, and question to the available controls. |
| [TC-04 — Group Financials, step 1](#tc-04-enrich-the-saved-k-pop-draft) | Failed | [BUG-01](#bug-01--draft-financials-shows-organization-totals) | The Draft's Members view was empty while its Financials showed 1,445 active Members. |
| [TC-04 — Level and question, steps 2–3](#tc-04-enrich-the-saved-k-pop-draft) | Passed | — | Reopened Level `9830` and the optional question checked for both Levels. |
| [TC-04 — Level discount, step 4](#tc-04-enrich-the-saved-k-pop-draft) | Blocked | — | No compatible QA Ticket Type was verified for the discount. |
| [TC-05 — Supporting Event, Ticket Type and discount](#tc-05-publish-the-supporting-event-and-attach-the-level-benefit) | Passed | — | Reopened the Unlisted Event, ticket sale window and exact Level-only benefit. The Membership remained Draft. |
| [Customer Tester handoff](#enriched-draft-handoff) | Not run | — | Buyer and renewal behavior require a separate assignment. |
