---
title: Jazz Club Monthly Membership in QA City
date: 2026-11-23
tags:
  - qa/city
  - memberships
  - browser-testing
---

# Jazz Club Monthly Membership in QA City

## Overview

The City map saved the assignment **Create a monthly membership for a jazz club** under Organizer Builder. The plan covers one Draft Membership Group and one Level in the migrated Showpass beta Dashboard. The City review and revision workflow worked. QA Lead disapproved the latest plan because the Level save’s effect on the Group’s Draft status and inventory sync could not be established for beta.

## Test index

- [TC-01 Save and review the City assignment](#tc-01-save-and-review-the-city-assignment)
- [TC-02 Save and reopen a Monthly Membership Draft](#tc-02-save-and-reopen-a-monthly-membership-draft)

## Setup

- **Surface and date** · The Codex in-app browser at [QA City](http://127.0.0.1:3000/) on November 23, 2026.
- **Role and test data** · Organizer Builder. Proposed Group **Velvet Reed Jazz Club Monthly (QA)** with **Renewal Frequency → Monthly** and one **Jazz Club Member** Level priced at 25.00 in the verified venue currency, inventory 20, and purchase limit 1.
- **Beta readiness** · The user confirmed **1859-qa-cad**, Memberships, and **Manage Memberships**. The active Dashboard session and current controls still need a fresh check.
- **Finishing point** · Reopen both records and verify the Group is still Draft after the Level save. Keep the Draft for review and leave artwork for the user.

## TC-01 Save and review the City assignment

**Start here:** In the City map, select **Organizer Workshop → New assignment**.

1. Enter **Create a monthly membership for a jazz club**, keep **Choose from the assignment title**, and enter the Showpass beta target and Draft instructions. Select **Save assignment** and open the new row in the Organizer Builder queue.

   **Expected:** The run appears under Organizer Builder with the **Configure test setup** job and the requested target.

   **Actual — Passed:** The Organizer Builder queue showed the assignment and Run Details showed the job and beta Memberships target.

2. In **Current work**, choose **Prepare plan**, then open **Plan**.

   **Expected:** Plan 1 covers the Membership Group, the Monthly field, one Level, and fresh proof of the saved Draft settings.

   **Actual — Passed:** Plan 1 covered all four, kept publication out of scope, and stopped before a dependent save if readiness was uncertain.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-jazz-club-city/city-plan-1.jpg" alt="Organizer Builder assignment and Plan 1 in QA City" width="600" style="max-width: 100%; height: auto;">

3. In **Current work**, choose **Run short review**.

   **Expected:** City stores the Release Engineer’s review and shows the appropriate next action before QA Lead sign-off.

   **Actual — Passed:** City displayed **Full review** and **Scope with Release Engineer** after the short review flagged material uncertainty.

4. Complete **Scope with Release Engineer → Run Backend Master review → Run Frontend Master review → Prepare engineering handoff → Send to QA Lead**.

   **Expected:** Each completed review opens the next stage. A disapproval leaves the plan waiting for revision.

   **Actual — Passed:** City saved both source reviews, the engineering handoff, and **Plan 1 · QA Lead disapproved**. The Lead required source evidence that the Level save preserves Draft and scoped side effects. Plan 1 had file pointers without the relevant source facts. The beta Organization and access also remained unconfirmed.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-jazz-club-city/city-lead-decision.jpg" alt="QA City shows that QA Lead disapproved Plan 1" width="600" style="max-width: 100%; height: auto;">

5. Choose **Revise plan** and include the source findings for Monthly and Draft persistence and the Level save. Record the user-confirmed Organization **1859-qa-cad** and access. Submit the revision and repeat the full review.

   **Expected:** City retains earlier decisions under **History** and requests review on the revised plan. An unapproved plan offers no execution action.

   **Actual — Passed:** City saved Plan 2 with local source findings and Plan 3 with those findings and the user's readiness answers. The full review ran on Plan 3. The Lead disapproved it because local traces did not establish beta Draft preservation or what the Level inventory job could change on beta. **Current work** showed **Revise plan**.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-jazz-club-city/city-plan-3-decision.jpg" alt="QA City shows Plan 3 disapproved for the monthly jazz club Membership" width="600" style="max-width: 100%; height: auto;">

6. Add the backend inventory job trace to the same assignment and run the full review for Plan 4.

   **Expected:** The new review considers whether a Draft with no Issue Tickets benefits gives the sync job any inventory to update.

   **Actual — Passed:** City saved Plan 4 and its full review. QA Lead accepted the scope and stopping point and disapproved execution. The Lead required evidence that the deployed beta Group and Level save paths match the reviewed source, plus proof of what the Organizer sees before a save and when a save outcome is unclear.

   <img src="../../99%20Archive/QA%20Evidence/memberships/2026-11-23-jazz-club-city/city-plan-4-decision.jpg" alt="QA City shows Plan 4 disapproved after the inventory trace" width="600" style="max-width: 100%; height: auto;">

## TC-02 Save and reopen a Monthly Membership Draft

**Start here:** The City assignment needs QA Lead sign-off on its current revision. Use **1859-qa-cad** on Showpass beta and verify the signed-in Organizer, **Memberships** access, **Manage Memberships**, and venue currency before saving.

**Expected:** The Organizer Builder can create the Draft Group via **Memberships → Create membership**, add the Level while the Group stays Draft, and reopen both records to verify their IDs and settings.

**Actual — Blocked:** QA Lead disapproved Plan 4. City never handed off a live execution. The local revisions reviewed were `web-app@62067009a8` and `showpass-frontend@12a457dd28`. Their applicability to the beta save and inventory paths remains unverified. The review called for a separately approved read-only inspection to establish Dashboard access, currency, and save controls. That check would leave beta backend behavior unverified.

## Source finding

City routes the assignment title to the Product or Membership workflow. An isolated check confirmed the builder result schema accepts a Membership Group and Level but rejects the backend field `renewal_frequency`. The Monthly choice can be written in the result summary. The structured record has no field for it. Compare the [City record schema](../../showpass-qa-city/src/lib/workspace/builder-result.ts) and the [Membership Group model](../../../web-app/apps/memberships/models/groups.py).

After Plan 3, the backend trace established the condition for the inventory job. Level creation saves the Level against a same-Venue Group. A Level inventory change can queue a sync on commit. The sync dispatches only for unseated Issue Tickets benefits attached to the Level or Group. An isolated Draft with zero benefits has no dispatch targets, including if the job runs again. Plan 4 uses this source evidence, verifies that the beta Dashboard offers the expected Draft controls, and stops if the Level needs publication. [Level creation](../../../web-app/apps/memberships/services/levels/membership_level_configuration.py), [Level save](../../../web-app/apps/memberships/models/levels.py), [inventory sync](../../../web-app/apps/memberships/services/inventory/membership_level_ga_inventory_sync.py)

## Postconditions

The assignment and all four plan revisions stay in City for continuation. There are no Showpass records to clean up.

## Results

| Check | Status | Evidence |
| --- | --- | --- |
| [TC-01 — City assignment, review, and revision](#tc-01-save-and-review-the-city-assignment) | Passed | City routed the job, stored three Lead decisions, and kept execution gated. |
| [TC-02 — Showpass beta Draft and Level](#tc-02-save-and-reopen-a-monthly-membership-draft) | Blocked | Plan 4 disapproved. Beta Draft preservation and inventory effects still need evidence. |
