---
title: Membership Benefit Seating Permissions Beta Release Run - 2026-07-26
date: 2026-07-26
tags:
  - qa
  - beta
  - memberships
  - assigned-seating
  - release-readiness
status: in-progress-ui-edge-cases
---

# Membership Benefit Seating Permissions Beta Release Run

> [!info] Run scope
> Execute the complete release-readiness suite from [[membership-benefit-seating-permissions-test-cases]] against beta. Record failures and continue testing unless the target membership-benefits page is inaccessible or continued execution would risk unrecoverable test-data loss.
>
> Extended scope: audit every user-interactive input, button, modal state, validation boundary, keyboard action, and assigned-seating canvas item or selection transition.

## Run Details

- Started: 2026-07-26 16:32 MDT
- Environment: `https://beta.showpass.com`
- Membership group: `19683`
- Target: `/manage/memberships/19683/benefits/`
- Season: Season 1
- Browser: In-app Browser
- Tester: Codex using the user's existing authenticated beta session
- Source suite: [[membership-benefit-seating-permissions-test-cases]]
- Initial pass finished: 2026-07-26 17:00 MDT
- Overall status: Extended UI edge-case testing in progress
- Release recommendation: Pending selection-state investigation

## Test Case Status

| Case | Coverage | Status | Evidence / Finding |
| --- | --- | --- | --- |
| TC-1 | Existing permissions load unchanged | Partial | Standard three-level hydration and saved seat/GA permissions survived reopen. MoreThan200Levels data is unavailable. |
| TC-2 | Map navigation and level-list controls | Partial | Zoom, wheel zoom, pan, arrow-key drill-in, 10%-600% zoom boundaries, and 1024×768 reflow passed. Reset returns to 100% but also clears the active selection. The current UI has a persistent level panel rather than the case's show/hide control. |
| TC-3 | Seat and section selection states | Failed | Plain click replaces selection and Shift-click adds beyond two items as instructed. Regular seats, curved-row seats, straight-row seats, full-purchase tables, and GA areas cannot be individually toggled off. Reset and Escape also clear more context than their labels/instructions imply. |
| TC-4 | Assign and remove regular-seat permissions | Passed | Three table seats saved immediately, counts changed by three, persistence survived reopen, and all seat permissions were removed during cleanup. |
| TC-5 | Reassign a regular seat between levels | Passed | One seat moved from Level B to Level C, persisted after reopen, left the control seat on Level B, and was restored before cleanup. |
| TC-6 | Full-purchase table assignment rules | Partial | Section 4 contains regular table TBL1 and full-purchase tables including TBL14, TBL17, and TBL10. A full table selects atomically as four seats; Shift-click accumulated 4, 8, and 12 seats across three tables; and Levels A-C were disabled because their purchase limits cannot cover a four-seat table. Assignment persistence still needs a level with purchase limit 4 or greater. |
| TC-7 | General-admission assignment and capacity | Passed | Created, updated, reopened, and removed GA assignments with fixture-valid capacities; an unrelated Section 1 assignment remained unchanged. |
| TC-8 | Create a level from the seating map | Passed | Levels A-C were created from the open map, appeared without closing it, and were used successfully for seat and GA assignments. |
| TC-9 | Completion requires a saved permission | Failed | The forward gate passed, but after removing the final permission the Benefits row remained distribution-ready until a full reload restored the assignment blocker. |
| TC-10 | Sold permissions cannot be removed | Blocked | The membership group has no members, so no sold seat or GA permission exists. |
| TC-11 | Unauthorized employee access boundary | Blocked | No Employee B account without Manage Memberships was supplied. |
| TC-12 | All benefit-seating entry paths | Passed | Both Assign levels to seats and Edit membership benefit opened the form and complete Reserved seating benefit screen. |
| TC-13 | Builder-component compatibility | Partial | Straight rows, curved rows, table seats, rectangular GA, and circular GA rendered and selected correctly. Mirrored/transformed/flagged inventory is unavailable. |
| TC-14 | Full-purchase and mixed drag selection | Failed | Shift-drag selected exactly four enclosed regular seats. A mixed rectangle retained the regular seats and did not partially select an enclosed full-purchase table; a rectangle across two full tables selected both complete tables. Per-table deselection failed. The second-drag result needs a same-type fixture before it can be judged independently. |
| TC-15 | Independent multi-level seat and GA permissions | Passed | Two levels coexisted on regular seats; one was removed independently. GA1 saved A:3/B:4, reopened correctly, then updated to A:2 with B removed without changing Section 1. |
| TC-16 | Rejected changes and error recovery | Partial | GA capacity values 0, -1, 1.5, and 11 were rejected with specific inline validation and Save disabled; none persisted. Each invalid value also unchecked the staged level and hid its capacity input. Network-rejection variants remain. |
| TC-17 | Immediate seat saves versus staged GA edits | Passed | Immediate seat saves survived closing/reopening. Unsaved GA change from 5 to 4 triggered a discard warning and reopening restored 5. |
| TC-18 | Bulk assignment across mixed seat state | Passed | Mixed Level B state displayed indeterminate; applying B created only the missing permission, bulk removal affected only the selected pair, and the control seat stayed assigned. |
| TC-19 | Permission isolation between benefits | Blocked | Season 1 contains only one assigned-seating benefit; a second benefit sharing the map was not available. |

## Extended Interaction Audit

| Interactive surface | Result |
| --- | --- |
| Regular table seats | Plain click selects or replaces; Shift-click accumulates beyond two; repeated click cannot toggle off. |
| Full-purchase tables | One click selects all four seats; multiple tables accumulate to 4, 8, and 12 with Shift; partial-table selection is prevented; individual table deselection fails. |
| Curved-row seats | First and last seats render and select; repeated click cannot toggle off. |
| Straight-row seats | First and last seats render and select; repeated and double-click leave the item selected. |
| Rectangular and circular GA | Both render and select; repeated click, Shift-click, Enter, and Space leave the selected area active. |
| Keyboard canvas navigation | Arrow keys move focus between items; Enter/Space select; keyboard selection preserves full-table atomicity; Shift+Enter accumulated two full tables as 4 then 8 seats. Repeating Shift+Enter on the selected table did not remove it. |
| Seat ↔ GA and segment transitions | Entering another segment clears the incompatible active selection before the new item is selected. |
| Clear selected seats/areas | Pass; clears the complete active selection without changing saved permissions. |
| Zoom in/out | Pass; selection survives zoom. Controls stop at 10% and 600%. |
| Reset map view | Fails selection preservation; returns to 100% and clears the active selection. |
| Shift-drag | First rectangle selects exactly the enclosed regular seats; mixed and full-table atomic rules pass. The observed second-drag replacement crossed regular and full-purchase types, so same-type additive behavior remains unconfirmed. |
| GA capacity | Blank reverts to the area default. Valid 1 and maximum values are accepted. Zero, negative, decimal, and over-capacity values are rejected, but also clear the staged checkbox. Arrow keys do not change the controlled number value. |
| Create Level required fields | Blank Name, Price, and Inventory show required validation. Whitespace Name and risky purchase-limit combinations remain submittable; no record was created. |
| Create Level description and visibility | Text entry, heading menu, and Public/Hidden/Sellers only/Public only choices work. Closing the unsaved form creates no level. |
| Edit Benefit tabs and map picker | General Admission and Assigned Seating tabs switch correctly; the single available map appears. Escape from the expanded picker closes the modal. Clearing the map leaves Next enabled; the change was discarded. |

## User Verification Requested

> [!todo] Check these four findings, in this order
> These checks do not change saved data. Report each result as `Confirmed` or `Not reproduced`, followed by the selection count or screen that you saw. Your answers will be used for the final release recommendation.

1. [x] **F-03 — Individual deselection**
   - Open **Reserved seating benefit → Section 4**.
   - Select one seat on TBL1; confirm **1 seats selected**.
   - Click that same seat again.
   - Report whether the count becomes **Nothing selected** or stays **1 seats selected**.
   - Then select TBL14; confirm **4 seats selected**. Click the same table again and report whether it stays at four.
   - User confirmation: The same regular seat remained selected when clicked again.
2. [x] **F-05 — Reset map view**
   - Select TBL14, then Shift-click TBL17; confirm **8 seats selected**.
   - Select **Reset map view**.
   - Report whether the result is **Nothing selected** or **8 seats selected**.
   - User confirmation: Reset changed the active selection to **Nothing selected**.
3. [x] **F-07 — GA validation recovery**
   - Select **Section 6 → GA1**.
   - Check a level that is not already assigned.
   - Replace capacity 10 with `0`.
   - Report whether the checkbox clears and the capacity field disappears.
   - Leave the level unchecked and do not save.
   - User confirmation: Level B became unchecked and the capacity field disappeared.
   - Related user observation: The control also prevented entry of the intended correct quantity; this is already expected to be fixed.
4. [x] **F-02 — Escape behavior**
   - Select a seat in **Section 4**.
   - Press Escape once.
   - Report whether only the selection clears or the entire modal closes.
   - User confirmation: Escape closed the entire modal.
   - Release classification: Confirmed by the user as non-blocking.

> [!info] You do not need to check these now
>
> - **F-01** and **F-04** change saved assignment data and were already confirmed.
> - **F-06** is inconclusive until a map has two separate regions of the same compatible item type.
> - **F-08** and **F-09** are confirmed client-side risks, but completing their final submit actions could create invalid data or remove the benefit's map. Do not select Save or Next for them.

## Findings

> [!tip] Safe reproduction rules
> Start from **Season 1** and open **Reserved seating benefit** through **Edit membership benefit → Next**. Unless a finding explicitly requires persistence, do not change a membership-level checkbox and do not select Save or Next. Selection, zoom, and navigation changes do not alter saved permissions.
>
> Useful map landmarks after **Reset map view**:
>
> - **Section 4**: TBL1 is the regular four-seat table. TBL14, TBL17, and TBL10 are four-seat full-purchase tables.
> - **Section 5**: curved rows.
> - **Sidestage**: straight rows.
> - **Section 2 / GA2**: rectangular general admission.
> - **Section 6 / GA1**: circular general admission.

### F-01: Saved GA selection remains active

- Severity: Low
- Case: TC-7
- Confidence: Confirmed once during the persistence run.
- Data safety: This changes beta data. Use only a disposable level and an area that does not already belong to that level.
- Starting state:
  - **Reserved seating benefit** is open.
  - **Nothing selected** is shown.
  - The chosen level has no existing assignment on the chosen GA area.
- Reproduction:
  1. Select a GA segment, then select its GA area.
  2. Check the disposable membership level.
  3. Enter a valid capacity within the area's displayed limit.
  4. Select **Save general admission assignments**.
  5. Wait for `General admission assignments saved.`
- Observe: The right panel still says **1 general admission areas selected**, the chosen area remains highlighted, and its assignment controls remain visible.
- Expected by the canonical case: The success message appears and the map selection clears.
- Actual: `General admission assignments saved.` appears, but the area remains selected and the assignment panel remains open.
- Impact: No persistence loss observed; this is a workflow/expectation mismatch that should be confirmed as intended or corrected in the test case.
- Cleanup: Remove only the disposable assignment created in this reproduction and save again. Do not remove any pre-existing assignment.

### F-02: Escape closes the permission modal instead of clearing map selection

- Severity: Medium
- Cases: TC-2, TC-3
- Confidence: Reproduced in both the seating map and the Edit Benefit map picker.
- User confirmation: Confirmed on 2026-07-26 that Escape closes the entire modal. The user classified this as non-blocking.
- Data safety: No saved data changes.
- Map reproduction:
  1. Open **Reserved seating benefit**.
  2. Select **Section 4**.
  3. Select Seat 1 on TBL1 and confirm **1 seats selected**.
  4. Press Escape once while focus remains on the map.
- Map result: The entire **Reserved seating benefit** modal closes and the Benefits page appears.
- Map-picker reproduction:
  1. Select **Edit membership benefit**.
  2. On **Assigned Seating**, open **Select space** so the list is expanded.
  3. Press Escape once.
- Map-picker result: The entire **Edit Benefit** modal closes instead of only dismissing the expanded list.
- Expected: The selected seat clears, matching the map's visible keyboard instruction.
- Actual: The entire Reserved seating benefit modal closes and returns to the Benefits page.
- Impact: Keyboard users lose their modal context and cannot use the documented clear-selection shortcut. Unsaved work can be discarded or require an additional discard decision.
- Reset: Reopen the modal. Nothing was saved by either reproduction.

### F-03: Selected canvas items cannot be individually toggled off

- Severity: Medium
- Cases: TC-3, TC-14
- Confidence: Reproduced across every selectable item family available in this map.
- User confirmation: Confirmed on 2026-07-26 that clicking the same regular seat again does not deselect it.
- Data safety: No saved data changes. Do not touch the membership-level checkboxes.
- Single-item reproduction:
  1. Select one item from any available family:
     - TBL1 regular seat in **Section 4**.
     - TBL14 full-purchase table in **Section 4**.
     - A curved-row seat in **Section 5**.
     - A straight-row seat in **Sidestage**.
     - GA2 in **Section 2**.
     - GA1 in **Section 6**.
  2. Confirm the right panel reports one selected seat/area, or four seats for a full-purchase table.
  3. Click the same item again.
  4. With the item still focused, repeat using Enter or Space.
- Single-item result: The selection count does not return to zero.
- Multi-table reproduction:
  1. Select TBL14; confirm **4 seats selected**.
  2. Hold Shift and select TBL17; confirm **8 seats selected**.
  3. Hold Shift and select TBL17 again.
- Multi-table result: The count remains eight; TBL17 cannot be removed while keeping TBL14.
- Expected by the canonical cases: The selected item toggles off without removing the rest of a multi-selection.
- Actual: The item remains selected. Plain click on another item replaces the selection; Shift-click adds items but does not remove them. The explicit **Clear selected seats/areas** control works, but clears the entire selection.
- Impact: An employee cannot remove one mistaken seat or table from a multi-selection. They must clear everything and rebuild the selection.
- Reset: Select **Clear selected seats** or **Clear selected areas**. Confirm **Nothing selected**.

### F-04: Removing the final permission leaves stale distribution-ready controls

- Severity: Medium
- Case: TC-9 extended release state transition
- Confidence: Confirmed during the initial end-to-end run.
- Data safety: Destructive to assignments. Reproduce only on a disposable benefit where every permission is known test data.
- Starting state:
  - The benefit has at least one saved seat or GA permission.
  - The Benefits row shows **Create a batch**.
- Reproduction:
  1. Open the seating map.
  2. Remove every permission belonging to the disposable benefit.
  3. For GA permissions, select **Save general admission assignments**.
  4. Close **Reserved seating benefit**.
  5. Read the action and message immediately under the benefit row without reloading.
- Observe: The row still shows **You have no batches created yet** and **Create a batch**.
  6. Reload the page.
- After reload: The row changes to **You must assign membership levels to the seating map before distributing tickets** and **Assign levels to seats**.
- Expected: The Benefits row immediately restores **You must assign membership levels to the seating map before distributing tickets** and **Assign levels to seats**.
- Actual: The row continues to show **You have no batches created yet** and **Create a batch**. A full page reload restores the correct assignment blocker.
- Impact: The page presents stale distribution-ready controls after the last permission is removed. An organizer could attempt ticket distribution against an empty permission map.

### F-05: Reset map view clears active inventory selection

- Severity: Medium
- Cases: TC-2, TC-3
- Confidence: Reproduced with one regular seat and with two full-purchase tables.
- User confirmation: Confirmed on 2026-07-26 that Reset changed a selected seat to **Nothing selected**.
- Data safety: No saved data changes.
- Reproduction:
  1. Open **Section 4**.
  2. Select TBL14; confirm **4 seats selected**.
  3. Hold Shift and select TBL17; confirm **8 seats selected**.
  4. Select **Zoom in**, then **Zoom out**. Confirm **8 seats selected** remains.
  5. Select **Reset map view**.
- Observe: Zoom returns to 100% and the right panel changes to **Nothing selected**.
- Expected: The viewport returns to 100% without changing the active inventory selection; clearing has a separate dedicated control.
- Actual: The viewport returns to 100% and the selection changes to **Nothing selected**. This reproduced with a regular seat and with eight selected full-table seats.
- Impact: Recovering the viewport discards a carefully assembled selection before the employee can assign a membership level.
- Reset: None required; Reset already cleared the selection.

### F-06: Second Shift-drag replacement needs a same-type fixture

- Severity: Observation — do not file as a standalone defect yet
- Cases: TC-3, TC-14
- Confidence: Inconclusive on this fixture.
- Data safety: No saved data changes.
- What was observed:
  1. Shift-dragging around the four regular seats in TBL1 selected four.
  2. A later Shift-drag around a full-purchase table replaced that regular selection with four full-table seats.
  3. One rectangle spanning TBL14 and TBL17 selected both complete tables as eight seats.
- Why this is not yet a confirmed bug: TBL1 is regular inventory while TBL14 and TBL17 require full purchase. The product already clears incompatible regular-seat and full-table selections, so replacement can be correct.
- Required confirmation setup: A map with two separate regular-seat regions, or two separate full-purchase-table regions that can be selected using two non-overlapping Shift-drags.
- Confirmed-defect threshold: If the second Shift-drag across the same compatible item type replaces the first despite Shift being held, promote this observation to a finding.

### F-07: Invalid GA capacity hides the field that must be corrected

- Severity: Medium
- Case: TC-16
- Confidence: Reproduced with every listed boundary.
- User confirmation: Confirmed on 2026-07-26 that Level B became unchecked and the capacity field disappeared. The user also reported being unable to enter the intended correct quantity and noted that this is expected to be fixed.
- Data safety: No saved data changes if Save is not selected.
- Starting state: Select GA1 in **Section 6** and use a level that is not already assigned to GA1.
- Reproduction:
  1. Check the unassigned level. Confirm **Capacity for GA1** appears with the default value 10.
  2. Replace 10 with `0`.
  3. Observe `Capacity must be at least 1.`, disabled Save, an unchecked level, and a hidden capacity field.
  4. Recheck the level and repeat with `-1`.
  5. Recheck the level and repeat with `1.5`.
  6. Recheck the level and repeat with `11`.
- Expected messages:
  - `0` and `-1`: `Capacity must be at least 1.`
  - `1.5`: `Capacity must be a whole number.`
  - `11`: `Capacity cannot exceed the area's capacity.`
- Expected: The field stays visible with an inline error so the employee can correct it.
- Actual: A precise inline error appears and Save is disabled, but the membership-level checkbox is also cleared and the capacity field disappears. The employee must reselect the level before entering a correction.
- Impact: Validation prevents bad data, but unexpectedly discards the staged choice and interrupts correction.
- Reset: Leave the level unchecked and do not select Save. Closing the modal does not persist the attempted values.

### F-08: Create Level client validation permits risky values

- Severity: Medium
- Case: Extended input audit
- Confidence: Confirmed client-side only. The form was not submitted.
- Data safety: Do not select Save with a fully populated risky combination.
- Required-field control:
  1. From **Reserved seating benefit**, select **Create level**.
  2. Select **Save** without entering anything.
  3. Confirm **Name is required**, **Price is required**, and **Inventory is required**.
- Whitespace-name reproduction:
  1. Enter three spaces in Name.
  2. Enter Price `10`, Inventory `2`, and Purchase Limit `1`.
  3. Observe that Save is enabled and Name has no validation message.
- Purchase-limit reproduction:
  1. Keep Name as three spaces, Price `10`, and Inventory `2`.
  2. Try Purchase Limit blank, `0`, and `3`.
  3. Observe that Save remains enabled for each value, including 3 greater than Inventory 2.
- Numeric-transformation reproduction:
  1. Enter `-1` in Inventory or Purchase Limit; observe the displayed value becomes `1`.
  2. Enter `1.5` in Inventory or Purchase Limit; observe the displayed value becomes `1`.
  3. Enter `1.005` in Price; observe the displayed value becomes `1`.
- Expected: Name must contain visible characters, purchase limit must respect an explicit positive inventory boundary, and transformed numeric input should be made clear to the user.
- Actual: The client presents these combinations as submittable. Submission was deliberately not attempted to avoid creating invalid or duplicate beta data.
- Impact: The backend may reject the request late, or an organizer may create a blank-looking level or unintended limits and prices.
- Reset: Close **Add new Membership Level** with the X. Confirm no additional level appears in the membership-level list.

### F-09: Assigned Seating can advance after its map is cleared

- Severity: Medium
- Case: Extended input audit
- Confidence: Confirmed client-side only. Next was not selected.
- Data safety: Do not select Next after clearing the map.
- Reproduction:
  1. Close **Reserved seating benefit**.
  2. Select **Edit membership benefit** for the Issue Tickets benefit.
  3. Confirm **Assigned Seating** is selected and **Select space** shows **Waterbomb Music Series 2**.
  4. Use the **clear selection** control inside the map field.
  5. Confirm **Select space** is empty.
  6. Observe the **Next** button.
- Observe: Next remains enabled.
- Expected: **Next** is disabled until an assigned-seating map is selected.
- Actual: **Next** remains enabled with an empty **Select space** combobox.
- Impact: The client appears willing to advance an assigned-seating benefit without its required map. Submission was not attempted because it could alter or remove the live test benefit.
- Reset: Close **Edit Benefit** with the X. Reopen it and confirm **Waterbomb Music Series 2** is still selected.

## Data Changes and Cleanup

- Beta data changes are listed below and will be preserved or cleaned up deliberately.
- Membership group `19671` was briefly inspected after an incorrect target correction. No assignment checkbox or capacity was changed, and its observations are excluded from this run.
- Created membership level `Codex Map Regression Level A` in group `19683` from the open seating-map flow with price CAD 10.00, inventory 20, purchase limit 2, and Public visibility. Retain until assignment and persistence coverage is complete.
- Created `Codex Map Regression Level B` with price CAD 10.00, inventory 20, purchase limit 2, and Public visibility for multi-level isolation coverage.
- Created `Codex Map Regression Level C` with price CAD 10.00, inventory 20, purchase limit 1, and Public visibility for purchase-limit and control coverage.
- The initial pass removed every seat and GA assignment created by Codex and reached `0 / 20` for Levels A-C.
- When the extended audit resumed, Level A showed `10 / 20 assigned`; Levels B and C remained `0 / 20`. This was treated as user-owned state and left unchanged.
- The extended audit changed selection state and unsaved form values only. It did not save an assignment, capacity, membership level, or benefit-form change.
- Retained Levels A-C because the user requested that test data not be deleted.
- Reset the temporary 1024×768 viewport override to the browser default.

## Blocked or Not Applicable Coverage

- The browser-connection pause was resolved after the user opened the beta page in the desktop app.
- Login and OTP entry were not exercised because the supplied browser session was already authenticated.
- TC-1 MoreThan200Levels requires a group with at least 201 levels.
- TC-6 assignment persistence requires a membership level whose purchase limit can cover a four-seat full-purchase table. The fixture's three levels have limits 2, 2, and 1, so their disabled states were verified without changing the level data.
- TC-10 requires dedicated sold seat and GA permissions.
- TC-11 requires a restricted employee account.
- TC-13 still requires mirrored/transformed inventory and accessible, limited-visibility, and hidden-public seat fixtures.
- TC-16 still requires controllable rejected seat-create, seat-delete, and GA API requests.
- TC-19 requires two benefits using the same map.
- Browser console review found no errors tied to the tested flows; only unrelated dashboard iframe and deprecated-state-library warnings were present.

## Release Assessment

> [!warning] Release assessment reopened
> F-02 and F-04 remain non-blocking workflow findings. The extended audit confirms that Shift-click can select more than two items, but it also exposes repeatable selection-editing and input-validation risks that need product triage before a final release recommendation.

The core create, assign, update, reassign, bulk, persistence, completion, and cleanup workflows passed in the initial run.
