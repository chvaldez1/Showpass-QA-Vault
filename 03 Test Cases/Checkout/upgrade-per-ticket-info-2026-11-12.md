---
title: Upgrading split guest-info tickets leaves an original ticket
run_date: 2026-11-12
tags: [qa/checkout, qa/upgrades]
---

# Checkout upgrade bug investigation

## Overview and bot handoff

**Confirmed bug. Owner: the frontend shared basket upgrade mutation in `showpass-frontend`.** On beta's Comedy Event (HAHAHA), upgrading a displayed selection of 2 General Admission tickets produced 2 VIP tickets plus 1 remaining GA ticket. It persisted after a full checkout refresh. The checkout total was $149.87 CAD; after removing the extra GA it was $110.82, a $39.05 difference. No payment was attempted.

The backend intentionally splits per-ticket-information selections into quantity-one saved rows. The frontend displays them as one selection but `useBasket.upgradeItemGroup` removes only `originalItemGroup.id` while adding the full displayed upgrade quantity. The sibling original row survives. The same filter is present in the deployed beta JavaScript bundle. Source analysis supports a frontend fix; the backend's splitting contract should remain intact.

**Fix boundary:** Resolve all saved source row IDs represented by the clicked selection, replace exactly that cohort, and calculate the upgraded quantity from it. Preserve unrelated items and existing per-ticket information, package and mutation-lifecycle contracts. Fix the shared mutation used by both Review and cart summary rather than hiding the leftover line in one UI.

**Regression targets:** two separate GA rows with quantity one each → exactly two VIP and zero original GA; an unsplit row with quantity two still works; unrelated rows remain; reload reflects the accepted server basket. Check guest and signed-in checkout, per-ticket collection on/off, and Review/cart-summary callers. Existing upgrade tests cover a single saved row with quantity two and do not cover the sibling-row case.

## Confirmed bugs

| Bug | Where | Observed result |
| --- | --- | --- |
| [BUG-01](#bug-01-jira-draft) | Checkout Review → Upgrade to VIP | Two-ticket selection becomes three tickets and includes an extra $39.05 GA ticket |

## Test index

- [TC-01 Original selection and questions](#tc-01-original-selection-and-questions)
- [TC-02 Upgrade](#tc-02-upgrade)
- [TC-03 Persistence and cleanup](#tc-03-persistence-and-cleanup)

## Setup

- Beta: https://beta.showpass.com/comedy-event-hahaha/; Organization For System Gateway Charge API; event date November 12, 2032.
- User requested a refresh first; the event was refreshed before selecting tickets.
- In-app browser was signed in as Christian. The login session was preserved. The user reported guest checkout; this run independently reproduced the same defect signed in, establishing that guest checkout is not required. An exact guest rerun was not performed.
- Two separate Guest 1/Guest 2 question sections were observed. Exact saved event/ticket configuration was not inspected through Admin. Source identifies ticket-type `info_collect_per_ticket` as a splitting trigger.
- Starting Review contained only the two test GA tickets. Cleanup used each line's Remove control and a final refresh. No consent, guest responses or payment information submitted.
- Beta build `SN9uCwEiXQRSeaaYk75eD`; local frontend/backend revisions and deployed bundle verification are in [source evidence](evidence/upgrade-per-ticket-info-2026-11-12/source-evidence.json). Deployed backend revision was not established.

## TC-01 Original selection and questions

**What this tests:** The two-ticket setup and per-ticket question state.

**Start here:** The linked beta Comedy Event (HAHAHA) public page in a signed-in browser. No Organizer permission or Admin access is needed. Stop if the named ticket type or upgrade is unavailable; do not alter event configuration.

### Steps

1. Refresh the event page, select **BUY TICKETS**, set **General Admission - Rush Seating** to **2**, select **Checkout**, then **Continue** past optional Add-ons.

   **Expected:** Review shows exactly 2 GA tickets.

   **Actual — Passed:** Review showed quantity 2, base subtotal $69.90 and checkout total $78.10 CAD.

   <img src="../../99%20Archive/QA%20Evidence/checkout/upgrade-per-ticket-info-2026-11-12/02-review-two-ga.png" alt="Review initially showing two GA tickets" width="600">

2. Select **Continue** to reach **Just a few questions**. Leave answers unchanged.

   **Expected:** Information is collected for each selected guest.

   **Actual — Passed:** Separate Guest 1 and Guest 2 sections appeared, each with Rush seating acknowledgement. Answers were not submitted.

   <img src="../../99%20Archive/QA%20Evidence/checkout/upgrade-per-ticket-info-2026-11-12/03-per-ticket-questions.png" alt="Separate questions for Guest 1 and Guest 2" width="600">

## TC-02 Upgrade

**What this tests:** Whether the upgrade replaces both original tickets.

**Start here:** The questions step reached in TC-01, with both GA tickets still in the basket.

### Steps

1. Select **Back** to Review, then **Upgrade to VIP** once. Observe the completed basket update before selecting another action.

   **Expected:** Exactly 2 VIP - Priority Entry tickets and no General Admission tickets.

   **Actual — Failed:** Review showed 1 General Admission - Rush Seating and 2 VIP - Priority Entry. Base subtotal was $134.85; total was $149.87 CAD. The Cart's “2 items” label describes its two displayed lines; the ticket quantities add up to three.

   <img src="../../99%20Archive/QA%20Evidence/checkout/upgrade-per-ticket-info-2026-11-12/05-bug-two-vip-one-ga.png" alt="Upgrade leaves one GA ticket alongside two VIP tickets" width="600">

### BUG-01 Jira draft

**Draft only — no Jira issue created.**

**Title:** fix (checkout upgrades) | Upgrading two tickets leaves an extra original ticket

**GIVEN** I have two General Admission - Rush Seating tickets for Comedy Event (HAHAHA) on beta, and checkout displays guest information separately for each ticket.

**WHEN** I reach the questions step, return to Review and select Upgrade to VIP.

**THEN** I see two VIP tickets and one remaining General Admission ticket, and the extra GA ticket remains after refreshing checkout. The upgrade should replace both original tickets, leaving exactly two VIP tickets and no GA tickets.

The extra GA added $39.05 CAD to the observed checkout total. No purchase was completed. The same result was reproduced signed in; the original report used guest checkout.

## TC-03 Persistence and cleanup

**What this tests:** Whether the incorrect basket survives reload, then whether the test selection can be removed safely.

**Start here:** The incorrect basket from TC-02.

### Steps

1. Refresh checkout, then select **Continue** past Add-ons to return to Review.

   **Expected:** The saved basket should contain only the intended two VIP tickets.

   **Actual — Failed:** The same 1 GA + 2 VIP and $149.87 CAD total remained. This confirms persistence, not merely a transient display error.

   <img src="../../99%20Archive/QA%20Evidence/checkout/upgrade-per-ticket-info-2026-11-12/06-persists-after-refresh.png" alt="The incorrect three-ticket basket remains after refresh" width="600">

2. Select **Remove** on the GA line and confirm **1x General Admission - Rush Seating**.

   **Expected:** Only the 2 VIP test tickets remain.

   **Actual — Passed:** Review showed 2 VIP tickets only, total $110.82 CAD. This measured the extra GA's $39.05 contribution; no payment occurred.

   <img src="../../99%20Archive/QA%20Evidence/checkout/upgrade-per-ticket-info-2026-11-12/07-two-vip-after-removing-extra-ga.png" alt="Two VIP tickets only after removal of the extra GA" width="600">

3. Select **Remove** on the VIP line, confirm **2x VIP - Priority Entry**, then refresh checkout.

   **Expected:** Cart returns to empty.

   **Actual — Passed:** The refreshed page displayed **Oops! Your cart is empty!**

   <img src="../../99%20Archive/QA%20Evidence/checkout/upgrade-per-ticket-info-2026-11-12/08-cleanup-empty-after-refresh.png" alt="Refreshed checkout confirms empty cart after cleanup" width="600">

## Supporting source evidence

- Frontend mutation: [useBasket.ts:1642](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/services/useBasket.ts:1642). It creates the full upgraded quantity, filters only `group.id !== originalItemGroup.id` at line 1675, then persists the remaining original rows plus upgrades.
- Caller: [useItemGroupUpgrade.ts:29](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/basket/hooks/useItemGroupUpgrade.ts:29). It forwards the clicked selection's quantity and uses persisted mutation.
- Review projection: [review-item-group-extras.ts:270](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/utils/review-item-group-extras.ts:270). Review can consolidate multiple raw rows into one displayed selection. Existing represented-row/split-display helpers should be evaluated before creating new grouping logic.
- Backend representation: [order_items.py:1650](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_items.py:1650). `build_group` intentionally creates quantity-one rows and sets the first row's display_quantity to the original total. `_should_split_group` checks ticket-type info_collect_per_ticket at line 1748. Do not remove this behavior to hide the frontend defect.
- Full-array save: [helpers.ts:343](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/utils/helpers.ts:343) persists the constructed item_groups payload. Public and signed-in baskets use the user basket repository at `api/user/tickets/baskets/`. Raw request bodies were not captured in this run; deployed-code verification and refreshed server basket are the supporting evidence.
- Tests: [useBasket.test.tsx:2203](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/services/useBasket.test.tsx:2203) models quantity two as one source row; it lacks the two saved quantity-one source rows that reveal this bug. Tests were inspected, not executed or changed.

## Postconditions and limitations

All test tickets removed; refreshed cart empty. No payment, order, new account, guest-answer submission, event/flag changes or code changes. Exact guest rerun, collection-off control, cart-summary path and post-fix checks remain Not run. The signed-in result is sufficient to confirm the underlying bug but does not stand in for those separate regression checks. No automated tests ran because this was investigation only.

## Results

**Confirmed bug — No-Go for the affected split-row upgrade flow until corrected.** This is scoped to the reproduced checkout behavior, not a release-wide review.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Original selection | Passed | Two GA tickets, $78.10 total | [TC-01 step 1](#tc-01-original-selection-and-questions) |
| Per-ticket questions | Passed | Separate Guest 1 and Guest 2 sections | [TC-01 step 2](#tc-01-original-selection-and-questions) |
| Upgrade | Failed | 2 VIP + 1 GA, $149.87 total | [TC-02](#tc-02-upgrade) |
| Persistence | Failed | Same extra ticket after refresh | [TC-03 step 1](#tc-03-persistence-and-cleanup) |
| Cleanup | Passed | Removed test tickets; refresh confirms empty | [TC-03 steps 2–3](#tc-03-persistence-and-cleanup) |
| Exact guest rerun | Not run | Existing signed-in session preserved; same bug reproduced signed in | [Setup](#setup) |
