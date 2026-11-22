---
title: Northern Cage MMA Draft and Preview
date: 2026-11-22
tags:
  - qa/browser
  - events
---

# Northern Cage MMA Draft and Preview

The Builder filled out [Northern Cage MMA Fight Night - QA](https://beta.showpass.com/manage/events/northern-cage-mma-fight-night-qa/basic-info/), Event ID **650950**, in beta Organization **1859-qa-cad**. The event stayed in Draft. The Public Tester then checked the saved event in [Preview](https://beta.showpass.com/preview/northern-cage-mma-fight-night-qa/).

The QA Lead approved the two General Admission tiers and single fight card after considering separately ticketed sessions, sequential tiers, reserved seating, and VIP access. The Lead approved a revised plan after the user took ownership of the images, then separately approved the view-only Preview check.

## Test index

- [TC-01 Saved ticket types](#tc-01-saved-ticket-types)
- [TC-02 Saved description and doors](#tc-02-saved-description-and-doors)
- [TC-03 Buyer preview details](#tc-03-buyer-preview-details)
- [TC-04 Buyer preview ticket choices](#tc-04-buyer-preview-ticket-choices)

## TC-01 Saved ticket types

**What this tests:** Both General Admission types save on the same draft with their own CAD price and inventory.

**Start here:** In the beta Dashboard, use a Venue Employee account with access to **1859-qa-cad**. Open the existing **Northern Cage MMA Fight Night - QA** Draft, Event ID **650950**, and select **Tickets**. At the start of this run the ticket list was empty.

1. Add **Early Bird General Admission** with **40** inventory and a **$30 CAD** price. Add **General Admission** with **120** inventory and a **$45 CAD** price. Leave both at **Public** ticket visibility. Select **Save**, then reload **Tickets**.

   **Expected:** Both rows retain their names, prices, inventory, and visibility. The event header shows **Draft**.

   **Actual — Passed:** Showpass reported that ticket types were updated. Both rows reopened with the expected values, and the Event remained in Draft.

   <a href="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/ticket-types.jpg"><img src="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/ticket-types.jpg" alt="The two saved ticket types in the beta Draft editor" width="600" style="max-width:100%;height:auto"></a>

## TC-02 Saved description and doors

**What this tests:** The Event keeps the formatted description and the 6 p.m. doors time when reopened.

**Start here:** In the same beta Organization and Event, open **Basic info** after the ticket types are saved.

1. Set the description to include **One night. One fight card.**, **Fight-night schedule**, and **Choose your ticket**, with a three-item schedule and the two General Admission choices. Select **Add Open Time** and set December 5 to **6 p.m. Mountain Time**. Select **Save changes** and reopen **Basic info**.

   **Expected:** The headings and schedule list persist. Doors open at **6 p.m.** on December 5. The Event runs from **7 to 10 p.m.** that day and remains a Draft at the selected Calgary location.

   **Actual — Passed:** Showpass reported that the Event was updated. The headings, doors, same-day event hours, Calgary location, and Draft status all appeared after reload.

   <a href="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/enriched-event.jpg"><img src="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/enriched-event.jpg" alt="Saved MMA Draft Basic info with the event details" width="600" style="max-width:100%;height:auto"></a>

## TC-03 Buyer preview details

**What this tests:** Preview presents the saved Draft to the Organizer in the buyer-facing layout.

**Start here:** In **Basic info** for Draft **650950**, use the signed-in beta Venue Employee who can open Preview.

1. Select **Preview** beside **Draft**. Read the event name, **Additional info**, and the description.

   **Expected:** The Preview banner is visible. The listing shows the event name, Calgary location, December 5 date, **6 p.m.** doors, **7 to 10 p.m.** schedule, and the saved formatted description.

   **Actual — Passed:** The Preview banner and all requested details appeared. The contact section also displayed the Organization's description for **Churchill Park Music Festival**, which is unrelated to the MMA event. The Organization copy comes from the Organization record. It was observed as a content issue and kept outside this Event edit.

   <a href="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/buyer-preview.jpg"><img src="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/buyer-preview.jpg" alt="Buyer-facing page with the Draft Preview banner" width="600" style="max-width:100%;height:auto"></a>

## TC-04 Buyer preview ticket choices

**What this tests:** A buyer looking at the draft preview can see both ticket names and the configured base prices.

**Start here:** Stay in the buyer-facing Preview for **Northern Cage MMA Fight Night - QA** with no tickets selected.

1. Select **Buy Tickets** and read the two ticket rows. Stop at the open ticket selector with both quantities at zero.

   **Expected:** **Early Bird General Admission** lists **$30 CAD** before fees and **General Admission** lists **$45 CAD** before fees.

   **Actual — Passed:** Both ticket names and base prices matched. Preview showed **$20.79** in fees for Early Bird and **$24.39** for General Admission, plus applicable taxes at checkout. Both quantities were zero.

   <a href="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/buyer-preview-tickets.jpg"><img src="../../99%20Archive/QA%20Evidence/Events/2026-11-22-mma-draft/buyer-preview-tickets.jpg" alt="Preview ticket choices showing both CAD base prices and fees" width="600" style="max-width:100%;height:auto"></a>

## Postconditions

The two ticket types and Event changes are retained in Draft for the user's review and image selection. Preview verification stopped at the ticket selector with zero items. Checkout, tax calculation, issuance, and signed-out discovery are outside this run.

## Results

| Check and step | Status | Bug | What happened |
| --- | --- | --- | --- |
| [TC-01, step 1](#tc-01-saved-ticket-types) | Passed | — | Both ticket types survived reload. |
| [TC-02, step 1](#tc-02-saved-description-and-doors) | Passed | — | Saved formatting, doors time, and same-day hours verified. |
| [TC-03, step 1](#tc-03-buyer-preview-details) | Passed | — | Event details matched. The unrelated Organization copy was recorded separately as a content observation. |
| [TC-04, step 1](#tc-04-buyer-preview-ticket-choices) | Passed | — | Both ticket labels and base prices matched, with fees displayed separately. |
