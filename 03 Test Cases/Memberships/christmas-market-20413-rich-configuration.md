---
title: Christmas Market Membership 20413 — rich configuration and basket checks
date: 2026-11-13
status: Configuration and basket checks finished with one confirmed season-assignment bug; purchases not run
---

# Christmas Market Membership 20413 — configuration and basket checks

**Saved:** Four public Levels, holiday season, shared and Level benefits, two Member questions and one upgrade path. **Basket tested:** One of each Level survived refresh; all four test additions were removed and the empty basket was verified. **Failed:** A Level Issue Tickets benefit created from the Holiday season tab saved under Always available. No Admin, payment, order, Member issuance, benefit use, ticket-generation batch, send or Jira write was performed.

## Confirmed bug

| Bug | Where | Observed failure |
| --- | --- | --- |
| [BUG-01 — Season assignment](#bug-01-jira-draft) | Workshop Plus → Level Benefits | Issue Tickets created from the Holiday tab appeared under Always available after refresh; Holiday remained empty. |

## Test index

These are report-local IDs, not Qase IDs.

- [TC-01 — Group, season and Levels](#tc-01-group-season-and-levels)
- [TC-02 — Benefits and related items](#tc-02-benefits-and-related-items)
- [TC-03 — Member form](#tc-03-member-form)
- [TC-04 — Public Levels reach the basket and cleanup](#tc-04-public-levels-reach-the-basket-and-cleanup)
- [TC-05 — Season-specific Level ticket benefit](#tc-05-season-specific-level-ticket-benefit)
- [TC-06 — Upgrade path](#tc-06-upgrade-path)

## Setup and record map

November 13, 2026; **beta.showpass.com**, deployed revision unknown. Employee **Christian Valdez**, Codex in-app browser. The resumed browser used a 1280 × 720 viewport; earlier evidence has a larger viewport. No responsive/device coverage is claimed.

Organization drawer showed **1786-Anime** under **2218-chris-parent-org**. Venue 1786 is the user-confirmed destination; no Admin record was read. The public page also named 1786-Anime.

**User-confirmed readiness:** correct Organization; Memberships, Manage Memberships permission, Discounts/Manage Events access and existing test payment/fee setup ready; global switch `enable_seasonal_issue_ticket_benefits = ON`. **Agent-verified:** authorized Dashboard controls and the saved values below. No Admin settings or shared gateway/fees were inspected or changed.

Original state: Group **Christmas Market**, Seasonal, Public, Memberships label, Renewals Enabled, banner present, empty description. One public Level, **General Admission - Evening Market**, CAD 36, Inventory 1000, Purchase Limit 36, empty description. No seasons, Group benefits or Members were found. The original price, Inventory, name and existing image were retained; its Purchase Limit is now 6.

| Record | Current setup |
| --- | --- |
| [Membership Group 20413](https://beta.showpass.com/manage/memberships/20413/) | Christmas Market; published through Publish; Public; Seasonal; label Passes; Renewals Enabled retained; final copy distinguishes Membership scan access from issued Event tickets |
| [Customer page](https://beta.showpass.com/m/christmas-market/) | Christmas Market — 1786-Anime; four public Levels and final descriptions visible |
| [Early Bird Level 9767](https://beta.showpass.com/manage/memberships/20413/levels/9767/) | CAD 28; Inventory 40; Purchase Limit 2; Public |
| [Evening Market Level 9766](https://beta.showpass.com/manage/memberships/20413/levels/9766/) | CAD 36; Inventory 1000; Purchase Limit 6; Public |
| [Premium Level 9768](https://beta.showpass.com/manage/memberships/20413/levels/9768/) | CAD 60; Inventory 30; Purchase Limit 2; Public |
| [Workshop Plus Level 9769](https://beta.showpass.com/manage/memberships/20413/levels/9769/) | CAD 78; Inventory 24; Purchase Limit 2; Public |
| [Holiday 2026 - Christmas Market season](https://beta.showpass.com/manage/memberships/20413/seasons/) | Display Nov 13–Dec 31, 2026; sales Nov 13–Dec 17, 2026; renewal deadline Jan 7, 2027; reminder Don't send |
| Referenced [Christmas Market Event 650449](https://beta.showpass.com/manage/events/christmas-market-7/basic-info/) | Existing Event, Dec 18, 2026, 5–11 PM America/Toronto; no new Event created |

Season ID and benefit IDs were not displayed/captured. Season controls showed dates only; underlying boundary timestamps/timezone were not independently captured. The backend distinguishes the display end from the Member expiry/renewal deadline; actual issued-Member expiry remains untested.

**Minimum records:** One existing Group, three new Levels, one season, eight benefit definitions, two custom questions and one upgrade path. Zero new Events, Products or Groups. Eight includes the failed season-assignment definition retained as evidence; seven other benefit definitions have verified saved configuration. No Customer or order was created.

## TC-01 Group, season and Levels

**What this tests:** Selected Group, season and Level values save and remain after reopening.

**Start here:** In beta Dashboard select Organization 1786-Anime. Open Build → Memberships and edit Christmas Market. Manage Memberships permission is required. The run started with no Members or seasons.

1. **Edit the Group description and Membership Label, then Publish.** Reopen Edit Membership after the save. The final copy was later corrected to describe direct Workshop scan access rather than promised issued tickets, saved and reopened again.

   **Expected:** Seasonal/Public and the existing artwork remain; label becomes Passes; the final saved description matches the configured benefits.

   **Actual — Passed:** Final copy was reread after reload and on the public page. Renewals Enabled remained checked. The initial Publish action completed; later changes used Save.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/group-saved.png" width="600" alt="Final saved Group description and Passes label" />

2. **Open Manage Seasons → Add season.** Create Holiday 2026 - Christmas Market with the dates in the record map, keep Don't send reminder, save and reload Manage Seasons.

   **Expected:** One active season with those display, sales and renewal dates; no scheduled reminder.

   **Actual — Passed:** The saved season showed all five dates and Send preference Don't send. No second season or reminder was created.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/season-saved.png" width="600" alt="Saved Holiday season dates and no reminder" />

3. **Open Membership Levels.** Enrich the existing Evening Market Level and create the three Levels in the record map. Save and reopen the relevant editors, then reload the Level list. Inspect the descriptions and quantity options again on the public picker/basket.

   **Expected:** Four distinct public Levels with the listed prices, Inventory, limits and accurate descriptions.

   **Actual — Passed:** Final list matched the table. Public picker showed all four final descriptions. Basket quantity options reflected maximum 6 for Evening Market and 2 for each other Level. Over-limit submission was not tested.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/levels-final.png" width="600" alt="Four saved public Levels with prices, Inventory and benefit counts" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/workshop-description-reopened.png" width="600" alt="Reopened Workshop description correctly describes scan access" />

## TC-02 Benefits and related items

**What this tests:** The intended shared and Level benefits save with correct item relationships and limits. This does not test an issued Member's rights.

**Start here:** In the same Organization, edit Christmas Market. Use Membership Benefits for Group-wide setup. For a Level, open Membership Levels → its pencil → Level Benefits. The listed Event and ticket types already exist in this Organization.

| Scope | Saved benefit | Eligible item / limit |
| --- | --- | --- |
| Group | Daily Scan Access | 1 scan per day; shared Group definition, not a promise of daily market operation |
| Early Bird 9767 | Event Scan Access | General Admission - Evening Market, Ticket Type ID 1630075; Scan Limit 1 |
| Evening Market 9766 | Event Scan Access | Same General Admission ticket type; Scan Limit 1 |
| Premium 9768 | Event Scan Access | First Look - Early Shopping Pass, Ticket Type ID 1630077; Scan Limit 1 |
| Premium 9768 | Discount | MERRY20413; 15%; Per Member Limit 1; Total Limit 30; Event Limit Per Member 1; only Ornament Workshop - 6:30 PM Session, Ticket Type ID 1630081 |
| Workshop Plus 9769 | Event Scan Access | General Admission 1630075; Scan Limit 1 |
| Workshop Plus 9769 | Event Scan Access | Ornament Workshop 1630081; Scan Limit 1 |

1. **Create the shared daily benefit and the five Event Scan Access definitions.** Select Christmas Market dated Dec 18, 2026, then the exact ticket type and Scan Limit 1. Save and reload each owning benefits screen.

   **Expected:** Saved Group/Level scope, exact Event/ticket identities and one-scan limits.

   **Actual — Passed:** All seven functional definitions in this table were saved and reopened across this and the next step. Event access rows displayed Christmas Market, Dec 18, 2026, 5 PM EST, with the intended ticket types. Actual scanning, inheritance into a purchased Member and linked ticket Inventory consumption were not executed.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/group-benefit-saved.png" width="600" alt="Shared Group daily scan benefit saved with limit one" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/early-bird-benefit.png" width="600" alt="Early Bird saved General Admission benefit" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/evening-benefit-saved.png" width="600" alt="Evening Market saved General Admission benefit" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/premium-benefit-saved.png" width="600" alt="Premium saved First Look admission benefit" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/workshop-benefits-saved.png" width="600" alt="Workshop admission benefits and retained unassigned Issue Tickets definition" />

2. **Add the Premium Discount benefit.** Enter the values above, select Event 650449 and leave only the Workshop ticket checked. Save, reload and reopen the Discount benefit.

   **Expected:** One eligible Event and one ticket type; all other seven Event ticket types excluded; exact amount and usage limits retained.

   **Actual — Passed:** Reopened values were 15%, 1/30/1. Workshop 1630081 was checked; ticket types 1630075–1630080 and 1630082 were unchecked. No Customer code was applied or discount use consumed.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/premium-discount-reopened.png" width="600" alt="Reopened Premium discount with exact limits and Workshop-only eligibility" />

## TC-03 Member form

**What this tests:** Custom questions save with their required status and intended Level assignments.

**Start here:** Christmas Market → Order Form. These questions are collected for each Member at checkout; they do not replace the built-in Member identity fields.

1. **Add an optional Dropdown:** What are you most looking forward to? Options Local gifts and crafts / Seasonal treats / Hands-on activities. Leave all four Levels selected. **Add a required Short text:** Workshop arrival group. Assign only Workshop Plus; help text asks for a group nickname or Solo and no contact details. Save Order Form.

   **Expected:** Two fields, with exactly those options, required states and Level assignments.

   **Actual — Passed:** Order form saved successfully. Reloading and selecting each field showed the same values. The Dropdown was optional and assigned to four Levels; the Short text was required and assigned only to Workshop Plus. No Customer answers were submitted; checkout question rendering and saved Member answers remain Not run.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/shopping-question-reopened.png" width="600" alt="Optional shopping-interest options assigned to all four Levels" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/member-form-saved.png" width="600" alt="Required Workshop arrival question assigned only to Workshop Plus" />

## TC-04 Public Levels reach the basket and cleanup

**What this tests:** Each public Level reaches the actual basket, remains after refresh and can be removed without issuing a Member.

**Start here:** Signed-in Christian Valdez session in the beta Customer site. Open the Membership's public page. Inspect the existing basket before adding anything; the source-defined Checkout destination was used read-only because the empty picker had no View Cart button.

1. **Open Checkout before adding passes.**

   **Expected:** Establish original basket contents and preserve any existing lines.

   **Actual — Passed:** Oops! Your cart is empty! was shown. No original lines needed preservation. Cleanup used each line's Remove action and named confirmation.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/basket-initial-empty.png" width="600" alt="Original basket verified empty before adding passes" />

2. **Return to Christmas Market → BUY PASSES.** Select one Early Bird, Evening Market, Premium and Workshop Plus. Read the selected quantities after updates; the first Early Bird click had not changed its value, so it was selected after fresh inspection. Open View Cart, then Checkout 4.

   **Expected:** Four actual basket lines, each quantity 1, with base prices 28 / 36 / 60 / 78; independently calculated subtotal CAD 202.

   **Actual — Passed:** All four named Levels were present once in Cart and Checkout Review. Briefly stale Checkout counts settled to 4; no missing/duplicate basket line remained. No product failure is claimed from intermediate counts.

3. **Refresh Checkout and wait for the Level lines to finish loading.** Inspect every line and quantity. Stop at Review without Continue, Questions or Payment.

   **Expected:** The same four Levels and subtotal remain. The Evening Market upgrade offer points to Premium for CAD 24 more.

   **Actual — Passed:** Exact refreshed lines below; the offer displayed Premium and $24 more per pass. Processing fee 8, Host fee 8, Service fees 28.17, QST 26.16, PST 3.38; total **CAD 275.71**. Base subtotal independently calculated; inherited fee/tax rules were observed, not independently certified.

   | Level ID | Refreshed basket line | Quantity | Base CAD |
   | --- | --- | --- | --- |
   | 9766 | General Admission - Evening Market | 1 | 36 |
   | 9768 | First Look - Premium Holiday Pass | 1 | 60 |
   | 9769 | Workshop Plus - Ornament Maker Pass | 1 | 78 |
   | 9767 | Early Bird - Holiday Market Pass | 1 | 28 |

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/four-levels-checkout-refreshed.png" width="600" alt="Refreshed Review showing four-item subtotal, total and the correct Premium offer" />

   The screenshot shows the top of Review; lower lines continued below the viewport. The table records all four actual lines read from the live page, not four items inferred from the badge alone.

4. **Remove Evening Market, Premium, Workshop Plus and Early Bird.** Before each confirmation, read its exact 1x Level name and Christmas Market. Confirm only this run's named line. Refresh Checkout afterward.

   **Expected:** Original empty basket restored, with no purchase or Member issuance.

   **Actual — Passed:** Each named line was removed; intermediate counts fell to 3, 2 and 1. After the last removal and refresh, Oops! Your cart is empty! was shown. Dashboard Members then showed No members found with All Levels selected. Configured Inventory remained 1000 / 40 / 30 / 24. An independent reserved-Inventory counter was not exposed on the inspected screens; no separate zero-reservation count is claimed.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/basket-restored-empty.png" width="600" alt="Basket empty again after all four test additions were removed" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/post-check-no-members.png" width="600" alt="No Members issued after the basket test" />

## TC-05 Season-specific Level ticket benefit

**What this tests:** A Level Issue Tickets benefit created from a named season remains assigned to that season after saving.

**Start here:** Christmas Market → Membership Levels → Workshop Plus → Level Benefits. Group is Seasonal and Holiday 2026 exists. The global switch `enable_seasonal_issue_ticket_benefits = ON` was user-confirmed. No existing Members were present. To inspect this retained failure now, compare Always available with the Holiday tab; do not create another definition merely to view the bug.

1. **Select Holiday 2026 - Christmas Market → Add Benefit.** The form offered Issue Tickets and General Admission. Select Next.

   **Expected:** The new definition belongs to the selected season and Level.

   **Actual — Failed:** After refresh, an Issue Tickets / General Admission definition appeared under Always available. The Holiday tab had no benefit. The selected season context was lost. The original creation's selected tab and offered type were captured in tool text; screenshots below show the saved failure.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/bug-01-issue-benefit-always-available.png" width="600" alt="Issue Tickets unexpectedly saved under Always available" />

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/bug-01-season-empty.png" width="600" alt="Selected Holiday season remains empty after creation" />

2. **Inspect Create a batch → Create ticket batch without sending anything.**

   **Expected:** Determine whether the exact Workshop ticket can be configured safely without generation.

   **Actual — Not applicable to exact Workshop assignment:** The editor selected Events rather than an existing Workshop ticket type. An unsaved draft form was closed; no batch was saved, scheduled or sent. Workshop access was instead configured through its exact Event Scan Access ticket type in TC-02. The unassigned Issue Tickets definition is retained as bug evidence and is not advertised as an included issued ticket.

### BUG-01 Jira draft

**Draft only — no Jira issue has been created.**

**Title:** fix (memberships) | Level ticket benefit saves outside the selected season

**GIVEN** I am editing a Level in a seasonal Membership with a saved Holiday season. The global switch `enable_seasonal_issue_ticket_benefits` is ON, as confirmed for this beta setup, and I have Manage Memberships access.

**WHEN** I open Level Benefits, select the Holiday season, choose Add Benefit → Issue Tickets → General Admission and select Next, then refresh and compare the season tabs.

**THEN** The new benefit appears under Always available, while the selected Holiday season has no benefit. It should remain assigned to the season selected when I created it.

Observed November 13, 2026 in beta, Organization 1786-Anime, Group 20413, Workshop Plus Level 9769. This makes the saved entitlement scope different from the Organizer's selected season. No Member purchase or cross-season benefit use was executed, so actual over-granting is not claimed.

**Local classification:** Confirmed configuration failure; Major proposed severity because the Organizer cannot rely on the selected season. Failed scope: season-specific Level benefit setup. Owned beta definition retained, no generation/financial action. This does not establish a regression or the deployed code version.

**Supporting source, not Jira prose:** Backend `apps/memberships/models/benefits.py` permits seasonal Issue Tickets benefits with the switch enabled; the API includes renewal_season. Current frontend `useMembershipBenefitSubmitter.ts` assigns membership_level in one branch but adds renewal_season only in the membership_group branch. This supports the observed result; no source was changed. Existing local Membership notes were searched during intake; no matching draft was identified. Jira duplicate search was not performed.

## TC-06 Upgrade path

**What this tests:** One saved upgrade points from Evening Market to Premium and displays the correct price difference in the actual basket.

**Start here:** Christmas Market → Upgrades. All four Levels already exist; no upgrade paths initially existed.

1. **Choose Create.** Select Evening Market as Upgrade from and Premium in the same Group as Upgrade to. Use title Start your shopping with First Look and message Upgrade to `{{to_item_name}}` for `{{price_difference}}` more per pass. Save and reload Upgrades.

   **Expected:** Correct direction and saved message; no unrelated Group or Event selected.

   **Actual — Passed:** Reopened list showed Evening Market → Premium in Christmas Market / Seasonal, with the saved variables and message. Standard/premium base prices differ by CAD 24. TC-04 step 3 showed that exact destination and difference in the real basket. The Upgrade button itself was not applied.

   <img src="../../99%20Archive/QA%20Evidence/memberships/christmas-market-20413-2026-11-13/upgrade-path-saved.png" width="600" alt="Saved Evening Market to Premium upgrade direction and message" />

## Postconditions, limits and cleanup

- All requested configuration is retained for review; the failed season-specific definition is explicitly identified rather than counted as correctly configured.
- Original basket was empty and is empty after supported removals and refresh. No Customer answers, legal agreement, payment or order were submitted. No Members were issued. Independent reservation counters were unavailable; basket restoration is verified.
- Existing banner, Event/ticket identities, Organization fees/payment setup and inherited contact/refund wording remain. The public inherited text refers to FAN EXPO Cleveland; it was not rewritten as a Membership policy or reported as a new product bug.
- No new Events or Products; no Admin, production testing, source edits, messages, scheduled sends, Jira or Qase writes. Temporary Customer tab was closed; the Membership Levels editor was left open.
- Browser control was interrupted and later restored. Reused the same saved records and readiness answers. Date-picker transitions, rich-text input problems and stale intermediate basket counts were resolved through supported UI interactions and fresh saved reads; they were not labelled confirmed product defects. Final descriptions were verified after save and on the Customer picker.
- Not run: completed purchase, actual Member information/benefit inheritance, discount redemption, scans/admission, generated tickets, renewal, transfer, Refund/Void/Exchange, upgrade application, limit rejection, concurrency and financial/report reconciliation. Assigned seating, additional Groups/Events/Products and communications were outside the selected setup.
- Evidence stays local in the ignored QA Evidence directory. No routine browser text dumps or disposable scripts were created.

## Copy-ready continuation handoff

> Beta configuration prepared on November 13, 2026 for Organization 1786-Anime under 2218-chris-parent-org. Reuse Membership Group 20413, Christmas Market, and Levels 9766 Evening Market (36/1000/max6), 9767 Early Bird (28/40/max2), 9768 Premium (60/30/max2), 9769 Workshop Plus (78/24/max2), all CAD/Public. Record map and exact links are above. One Holiday 2026 season: display Nov 13–Dec 31, sales Nov 13–Dec 17, renewal deadline Jan 7, reminders Don't send. Seven functional benefits saved: shared daily1; GA1 on Evening/Early; FirstLook1 plus 15% Workshop-only discount on Premium; GA1 and Workshop1 on Workshop Plus. Event 650449 is reused, not newly created. Two Member questions and Evening→Premium upgrade saved. All four Levels reached refreshed Checkout Review once, subtotal CAD202; observed total275.71. The correct $24 Premium offer appeared. All test additions were removed and empty basket/No members found were verified. Configuration plus basket smoke is complete, not a purchase or benefit-use test. BUG-01: the attempted season-specific Issue Tickets definition saved under Always available; retain it unassigned as evidence, with zero batches. No promised Workshop ticket issuance depends on that definition.
>
> Next if testing actual Member benefits: start with this note's record map and the selected case. First establish an authorized controlled Customer and purchase/payment scope; then buy exactly the Level the case requires, inspect the resulting Member and execute that specific benefit. Current authorization covers configuration and unpaid basket checks only, not payment, issuance, scans, sends, Refunds or Admin. Reuse the user-confirmed Memberships/permissions/payment readiness and seasonal-benefit switch ON for Venue1786; do not create replacement Events or ask the same readiness questions merely to resume. Do not claim seasonal Level issuance ready while BUG-01 remains.

Reusable prompt: **Continue from the handoff in `03 Test Cases/Memberships/christmas-market-20413-rich-configuration.md`; explain the next step for the selected Membership test before performing any new transaction.**

## Results

The selected preparation and basket work is accounted for. The seasonal Level ticket-benefit configuration failed; actual purchase/entitlement correctness remains untested. This is not a release-readiness or full financial pass.

| Check and step | Status | Bug | Result / exact limit |
| --- | --- | --- | --- |
| [TC-01 — Group, season, Levels; steps 1–3](#tc-01-group-season-and-levels) | Passed | — | Selected saved values, final descriptions, Inventory and limits verified |
| [TC-02 — Seven functional benefit definitions; steps 1–2](#tc-02-benefits-and-related-items) | Passed | — | Correct saved scope, items and limits; actual Member use Not run |
| [TC-03 — Custom Member questions; step 1](#tc-03-member-form) | Passed | — | Optional all-Level Dropdown and required Workshop-only field saved |
| [TC-04 — Four-Level basket; steps 1–3](#tc-04-public-levels-reach-the-basket-and-cleanup) | Passed | — | Four exact lines survived refresh; CAD202 base; payment Not run |
| [TC-04 — Basket restoration; step 4](#tc-04-public-levels-reach-the-basket-and-cleanup) | Passed | — | Empty basket after removal/refresh; no Members issued; separate reserved counters unavailable |
| [TC-05 — Season assignment; step 1](#tc-05-season-specific-level-ticket-benefit) | Failed | [BUG-01](#bug-01-jira-draft) | Created from Holiday tab, saved under Always available |
| [TC-05 — Exact Workshop batch mapping; step 2](#tc-05-season-specific-level-ticket-benefit) | Not applicable | — | Event-level batch UI did not select an existing Workshop ticket; used direct scan benefit |
| [TC-06 — Upgrade setup and display; step 1](#tc-06-upgrade-path) | Passed | — | Evening→Premium saved; correct CAD24 offer seen in TC-04; application Not run |
| [TC-04 — Purchase, Member issuance and downstream benefits](#tc-04-public-levels-reach-the-basket-and-cleanup) | Not run | — | Outside unpaid basket authorization; not blocked by a missing payment attempt |
