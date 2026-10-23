---
title: Seating — Next.js Migration Test Cases
date: 2026-10-17
tags:
  - qa/test-cases
  - events
  - assigned-seating
status: 109 published and verified; 1 held overlap; not executed; remaining coverage gaps explicit
---

# Seating — Next.js migration test cases

**Start here:** 109 published cases (36 updated, 73 created), plus one held overlap. Backend review added 20 focused cases and strengthened existing drafts; the previous 87-case dry run is superseded. The flip draft remains held because it overlaps SPT-3384. Equivalent variations use parameters; distinct actions/results stay separate. The first six are **Create a seating map**, **Open an existing seating map**, **Add a section**, **Add a seating row**, **Add a table** and **Add a standing area**. Cases prove exact geometry/labels/counts, saved values, denied changes and unaffected controls. The approved 109-case batch is published and its saved fields verified. No live Showpass mutation or product-test execution was performed.

**Scope:** event Seating → map editor and ticket-type assignment on Next.js, compared with the legacy event page. Backend b5f397a0438910435e0d537f47e12d6064d7e019 and frontend develop 7e527b0285349e5d9537731f97f09b414001778c; no branch/PR diff was supplied. Existing case IDs retain traceability; local TC labels are not Qase titles. The full pre-revision note is retained as evidence, and remaining legacy definitions below are references rather than proof that Next.js is covered.

**Intent:** prove organizers can carry existing map geometry, identity and sellability into Next.js and safely create/edit/assign without changing other events, assignments or protected admission. Definitions and source review are not execution results or release approval. Migration differences and unresolved execution fixtures are listed after the cases.

> [!note] Generated attachments removed
> Generated snapshots, JSON exports and frozen publication copies were deleted on 2026-10-17 at the user’s request. Published case IDs, recorded results and test definitions remain in this note. Read Qase again before preparing future changes.

## Published case index — choose by behavior

| Case title | Traceability | Parameters |
| --- | --- | --- |
| Create a seating map | [SPT-752](https://app.qase.io/case/SPT-752) | LayoutPermission: ManageVenueLayouts, ManageVenueInfo |
| Open an existing seating map | [SPT-5558](https://app.qase.io/case/SPT-5558) (TC-352) | None |
| Add a section | [SPT-5559](https://app.qase.io/case/SPT-5559) (TC-353) | None |
| Add a seating row | [SPT-5560](https://app.qase.io/case/SPT-5560) (TC-354) | SeatCount: One, Three, Ten |
| Add a table with Full purchase required on or off | [SPT-5536](https://app.qase.io/case/SPT-5536) | TableShape: RoundTable, SemiRoundTable, SquareTable; FullPurchaseRequired: On, Off |
| Add a standing area | [SPT-755](https://app.qase.io/case/SPT-755) | AreaShape: StandingGA, CircleGA |
| Save a curved row | [SPT-3178](https://app.qase.io/case/SPT-3178) | None |
| Keep seat numbering correct after row changes | [SPT-3386](https://app.qase.io/case/SPT-3386) | Change: Capacity, Offset, Step; Order: Normal, Reversed |
| Reverse one row seat order | [SPT-3385](https://app.qase.io/case/SPT-3385) | SavedState: On, Off |
| Rename an existing seating map | [SPT-5561](https://app.qase.io/case/SPT-5561) (TC-323) | None |
| Save a map-wide seat display setting | [SPT-5562](https://app.qase.io/case/SPT-5562) (TC-324) | SettingRun: SizeMinimum, SizeOrdinary, SizeMaximum, SpacingZero, SpacingOrdinary, SpacingMaximum |
| Save and clear a row-specific seat spacing | [SPT-5563](https://app.qase.io/case/SPT-5563) (TC-334) | None |
| Save a map element rotation | [SPT-5564](https://app.qase.io/case/SPT-5564) (TC-331) | Element: Section, Row, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA |
| Change Full purchase required on an existing table | [SPT-5565](https://app.qase.io/case/SPT-5565) (TC-333) | TableShape: RoundTable, SemiRoundTable, SquareTable; SavedState: On, Off; ExistingAssignment: None, OneTicketType |
| Save a seat option | [SPT-5537](https://app.qase.io/case/SPT-5537) | SeatOption: AccessibleSeating, LimitedVisibility, HiddenFromPublic; SavedState: On, Off; Selection: OneSeat, ClickAdd, Lasso |
| Save manually entered seat scores | [SPT-2937](https://app.qase.io/case/SPT-2937) | Selection: OneSeat, SeveralSeats; ScoreValue: Minimum, Decimal, Ordinary, Maximum |
| Save a standing-area score | [SPT-5566](https://app.qase.io/case/SPT-5566) (TC-326) | ScoreValue: Minimum, Decimal, Maximum |
| Reject a blank layout name | [SPT-5567](https://app.qase.io/case/SPT-5567) (TC-339) | EmptyName: Blank, Spaces |
| Protect an assigned seat when reducing row capacity | [SPT-5568](https://app.qase.io/case/SPT-5568) (TC-341) | None |
| Protect table assignments when enabling full-table purchase | [SPT-5569](https://app.qase.io/case/SPT-5569) (TC-342) | ConflictEvent: CurrentEvent, AnotherEvent |
| Duplicate a map element without linking its geometry | [SPT-5538](https://app.qase.io/case/SPT-5538) | Element: Row, Section, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA; DuplicationOffset: Zero, Five |
| Remove unassigned map geometry | [SPT-5540](https://app.qase.io/case/SPT-5540) | Element: Row, Section, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA |
| Reject deletion of assigned map geometry | [SPT-5539](https://app.qase.io/case/SPT-5539) | Element: Row, Section, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA; AssignmentEvent: CurrentEvent, AnotherEvent |
| Reject an invalid numeric map edit | [SPT-5570](https://app.qase.io/case/SPT-5570) (TC-355) | InvalidEdit: CapacityBlank, CapacityZero, CapacityNegative, CapacityDecimal, OffsetNegative, StepZero, StepDecimal, SpacingNegative, CurveNegative, RadiusZero, ScoreBelow, ScoreAbove |
| Resize a general admission area | [SPT-5571](https://app.qase.io/case/SPT-5571) (TC-356) | AreaShape: StandingGA, CircleGA |
| Align selected map elements | [SPT-5572](https://app.qase.io/case/SPT-5572) (TC-357) | AlignCommand: AlignLeftEdges, AlignToVerticalCenterLine, AlignRightEdges, AlignTopEdges, AlignToHorizontalCenterLine, AlignBottomEdges |
| Distribute selected map elements evenly | [SPT-5573](https://app.qase.io/case/SPT-5573) (TC-358) | Direction: Horizontal, Vertical |
| Restrict which map elements can be moved | [SPT-5574](https://app.qase.io/case/SPT-5574) (TC-359) | EditScope: Sections, SeatingAreas |
| Undo and redo a map edit | [SPT-5575](https://app.qase.io/case/SPT-5575) (TC-360) | ActionMethod: Buttons, Shortcuts |
| Keep keyboard shortcuts from changing a map while typing | [SPT-5576](https://app.qase.io/case/SPT-5576) (TC-361) | None |
| Navigate the canvas without changing the map | [SPT-5577](https://app.qase.io/case/SPT-5577) (TC-362) | None |
| Cancel a pending background image upload | [SPT-5578](https://app.qase.io/case/SPT-5578) (TC-363) | CloseMethod: Cancel, CloseButton |
| Reject AI ranking generation without context | [SPT-5579](https://app.qase.io/case/SPT-5579) (TC-364) | ContextValue: Blank, Spaces |
| Reject a stale map save after another editor saves | [SPT-5580](https://app.qase.io/case/SPT-5580) (TC-365) | None |
| Save a pending edit before leaving the editor | [SPT-5581](https://app.qase.io/case/SPT-5581) (TC-366) | ExitAction: EditorBack, BrowserBack |
| Save map appearance defaults | [SPT-5582](https://app.qase.io/case/SPT-5582) (TC-367) | AppearanceKind: SectionDefaults, GADefaults |
| Reset an appearance override to its map default | [SPT-5583](https://app.qase.io/case/SPT-5583) (TC-368) | None |
| Cancel appearance edits | [SPT-5584](https://app.qase.io/case/SPT-5584) (TC-369) | None |
| Reject an invalid appearance value | [SPT-5585](https://app.qase.io/case/SPT-5585) (TC-370) | InvalidAppearance: OpacityBelow, OpacityAbove, BorderAbove, RequiredBlank |
| Add a background image | [SPT-3499](https://app.qase.io/case/SPT-3499) | ImageType: JPG, PNG, SVG; InputMethod: FilePicker, DragAndDrop |
| Remove a background image | [SPT-5542](https://app.qase.io/case/SPT-5542) | None |
| Reject an invalid background upload | [SPT-5543](https://app.qase.io/case/SPT-5543) | InvalidUpload: Oversized, Unsupported, Multiple |
| Rename a map element | [SPT-5586](https://app.qase.io/case/SPT-5586) (TC-336) | Element: Section, Row, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA; NameInput: Ordinary, MixedCaseSpaces, MaximumLength |
| Save the setting to hide location names | [SPT-5587](https://app.qase.io/case/SPT-5587) (TC-332) | SavedState: On, Off |
| Display seat scores without changing the map | [SPT-3392](https://app.qase.io/case/SPT-3392) | None |
| Reject an invalid section name | [SPT-5541](https://app.qase.io/case/SPT-5541) | InvalidName: Blank, Duplicate, Punctuation |
| Reject an invalid row name | [SPT-5588](https://app.qase.io/case/SPT-5588) (TC-340) | InvalidName: Blank, Duplicate, Punctuation |
| Flip a section — held; overlaps SPT-3384 | TC-381 | Direction: Horizontal, Vertical |
| Respect the always-show-seats size boundary | [SPT-5589](https://app.qase.io/case/SPT-5589) (TC-382) | MapSize: BelowLimit, AtLimit |
| Move selected sections | [SPT-3393](https://app.qase.io/case/SPT-3393) | SelectionGroup: OuterTwo, Three |
| Change an existing table’s seat numbering | [SPT-5590](https://app.qase.io/case/SPT-5590) (TC-387) | TableShape: RoundTable, SemiRoundTable, SquareTable; NumberingChange: Capacity, Offset, Step |
| Clear saved seat scores | [SPT-5591](https://app.qase.io/case/SPT-5591) (TC-388) | Selection: OneSeat, SeveralSeats |
| Clear a standing-area score | [SPT-5592](https://app.qase.io/case/SPT-5592) (TC-389) | AreaShape: StandingArea, CircleGA |
| Keep assignments attached when renumbering a row | [SPT-5593](https://app.qase.io/case/SPT-5593) (TC-390) | None |
| Reject a group deletion when one row has assignments | [SPT-5594](https://app.qase.io/case/SPT-5594) (TC-391) | None |
| Update a shared standing area’s physical capacity | [SPT-5595](https://app.qase.io/case/SPT-5595) (TC-401) | None |
| Change area appearance without altering sold admission | [SPT-5596](https://app.qase.io/case/SPT-5596) (TC-402) | None |
| Reject map edits after layout permission is removed | [SPT-5597](https://app.qase.io/case/SPT-5597) (TC-403) | None |
| Preserve occupied places when reducing area capacity | [SPT-5598](https://app.qase.io/case/SPT-5598) (TC-404) | ClaimState: ActiveHold, IssuedTickets |
| Generate seat scores from sales counts | [SPT-3408](https://app.qase.io/case/SPT-3408) | None |
| Generate seat scores from sales order | [SPT-3409](https://app.qase.io/case/SPT-3409) | None |
| Reject historical score generation without sales history | [SPT-5599](https://app.qase.io/case/SPT-5599) (TC-399) | Method: SalesOrder, SalesCount |
| Keep existing scores when sales history has no ranking difference | [SPT-5600](https://app.qase.io/case/SPT-5600) (TC-400) | Method: SalesCount, SalesOrder |
| Attach an existing seating map to an event | [SPT-5554](https://app.qase.io/case/SPT-5554) | None |
| Assign seats when Memberships is disabled | [SPT-757](https://app.qase.io/case/SPT-757) | None |
| Assign a ticket type to curved-row seats | [SPT-3184](https://app.qase.io/case/SPT-3184) | None |
| Assign a second ticket type to ordinary seats | [SPT-5601](https://app.qase.io/case/SPT-5601) (TC-343) | InputMethod: Pointer, Keyboard |
| Complete a partly assigned seat selection | [SPT-5602](https://app.qase.io/case/SPT-5602) (TC-344) | None |
| Remove an available seat assignment | [SPT-5544](https://app.qase.io/case/SPT-5544) | RemainingAssignment: None, AnotherTicketType |
| Assign a ticket type to a standing area | [SPT-5545](https://app.qase.io/case/SPT-5545) | ExistingAssignment: None, AnotherTicketType |
| Update a standing-area permission limit | [SPT-5546](https://app.qase.io/case/SPT-5546) | Limit: One, Five, Ten |
| Reject a standing-area limit above its capacity | [SPT-5547](https://app.qase.io/case/SPT-5547) | InvalidCapacity: AboveCapacity, Zero, Negative, Decimal, Blank, Text |
| Leave a standing-area edit without saving it | [SPT-5603](https://app.qase.io/case/SPT-5603) (TC-350) | None |
| Keep seat assignments separate for events sharing a map | [SPT-5604](https://app.qase.io/case/SPT-5604) (TC-345) | None |
| Save a shared map display setting | [SPT-5552](https://app.qase.io/case/SPT-5552) | Setting: AdvancedColors, AlwaysShow |
| Save the event-specific no-isolated-seats setting | [SPT-5553](https://app.qase.io/case/SPT-5553) | None |
| Prevent detaching a map with assignments | [SPT-5555](https://app.qase.io/case/SPT-5555) | AssignmentKind: Seat, GeneralAdmission |
| Detach a map that has no assignments | [SPT-5605](https://app.qase.io/case/SPT-5605) (TC-349) | None |
| Remove an unused standing-area assignment | [SPT-5556](https://app.qase.io/case/SPT-5556) | RemainingAssignment: None, AnotherTicketType |
| Save a ticket-type assignment color | [SPT-5606](https://app.qase.io/case/SPT-5606) (TC-371) | ColorEntry: SeatPreset, SeatHex, AreaHex, ListPreset, ListHex |
| Reject an invalid ticket-type color | [SPT-5607](https://app.qase.io/case/SPT-5607) (TC-372) | None |
| Cancel a ticket-type color change | [SPT-5608](https://app.qase.io/case/SPT-5608) (TC-373) | CloseMethod: Cancel, OutsideClick |
| Save different limits for selected general admission areas | [SPT-5609](https://app.qase.io/case/SPT-5609) (TC-374) | None |
| Keep a general admission draft when cancelling navigation | [SPT-5610](https://app.qase.io/case/SPT-5610) (TC-375) | None |
| Keep map-view controls separate from saved purchase settings | [SPT-5611](https://app.qase.io/case/SPT-5611) (TC-376) | ViewControl: ShowAllSeats, ShowSoldSeats, ShowTicketTypeList |
| Cancel removal of a seating map | [SPT-5612](https://app.qase.io/case/SPT-5612) (TC-377) | None |
| Restrict map editing while allowing event assignments | [SPT-5613](https://app.qase.io/case/SPT-5613) (TC-378) | None |
| Block seating configuration on the Basic pricing tier | [SPT-5614](https://app.qase.io/case/SPT-5614) (TC-379) | None |
| Protect a seat with an active resale listing | [SPT-2988](https://app.qase.io/case/SPT-2988) | SelectionScope: Single, Mixed |
| Protect an occupied standing-area assignment | [SPT-5548](https://app.qase.io/case/SPT-5548) | BlockingState: Held, Sold |
| Protect an occupied seat assignment | [SPT-5549](https://app.qase.io/case/SPT-5549) | BlockingState: PendingBasket, ActiveHold, IssuedTicket |
| Assign a ticket type to a full-purchase table | [SPT-5550](https://app.qase.io/case/SPT-5550) | None |
| Propagate a parent ticket-type seat assignment | [SPT-5551](https://app.qase.io/case/SPT-5551) | None |
| Keep mixed full-table and ordinary-seat selection safe | [SPT-5557](https://app.qase.io/case/SPT-5557) | None |
| Remove an unused recurring-parent seat assignment | [SPT-5615](https://app.qase.io/case/SPT-5615) (TC-347) | None |
| Protect a recurring-parent assignment used by an occurrence | [SPT-5616](https://app.qase.io/case/SPT-5616) (TC-348) | ChildState: ActiveHold, IssuedTicket |
| Reach seating through the supported Dashboard navigation | [SPT-5617](https://app.qase.io/case/SPT-5617) (TC-380) | None |
| Clear selected seats before assigning another seat | [SPT-5618](https://app.qase.io/case/SPT-5618) (TC-383) | None |
| Clear selected areas before assigning another area | [SPT-5619](https://app.qase.io/case/SPT-5619) (TC-384) | None |
| Show the correct combined assignment count | [SPT-5620](https://app.qase.io/case/SPT-5620) (TC-385) | None |
| Open a map with no ticket types | [SPT-5621](https://app.qase.io/case/SPT-5621) (TC-386) | None |
| Roll back all area changes when one removal is protected | [SPT-5622](https://app.qase.io/case/SPT-5622) (TC-392) | None |
| Propagate a parent standing-area assignment | [SPT-5623](https://app.qase.io/case/SPT-5623) (TC-393) | None |
| Propagate a parent standing-area limit change | [SPT-5624](https://app.qase.io/case/SPT-5624) (TC-394) | None |
| Remove an unused recurring-parent area assignment | [SPT-5625](https://app.qase.io/case/SPT-5625) (TC-395) | None |
| Protect a parent area assignment used by an occurrence | [SPT-5626](https://app.qase.io/case/SPT-5626) (TC-396) | ChildState: ActiveHold, IssuedTicket |
| Hide shared map editing on a recurring occurrence | [SPT-5627](https://app.qase.io/case/SPT-5627) (TC-397) | None |
| Prevent removing a map used by a membership event batch | [SPT-5628](https://app.qase.io/case/SPT-5628) (TC-398) | None |
| Reject a ticket type below the full-table purchase limit | [SPT-5629](https://app.qase.io/case/SPT-5629) (TC-405) | None |
| Prevent a second ticket type on a full-purchase table | [SPT-5630](https://app.qase.io/case/SPT-5630) (TC-406) | None |

## Next.js — Create Map — published cases

### SPT-752: Dashboard - Seating - Create a seating map

**Publication status:** Published to Qase on 2026-10-17; updated SPT-752; Next.js; not executed.

**Title:** Dashboard - Seating - Create a seating map

**Description:**

Create and attach one new map from the Next.js event Seating page. This case proves map creation and its saved name. Run each LayoutPermission separately, granting only that one map-management permission.

| LayoutPermission | Required employee permission |
| --- | --- |
| ManageVenueLayouts | Manage Venue Layouts |
| ManageVenueInfo | Manage Venue Info |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events plus only the map-management permission selected by LayoutPermission in an organization on a pricing tier other than Basic. They do not have the other map-management permission or an unrestricted employee override.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use an event with no attached map. Choose a map name not already used in the organization, no more than 32 characters.

**Tags:** assigned-seating, edit-event, dashboard, curved-rows, layout-editor, ui-interaction

**Priority:** High

**Parameters:**
LayoutPermission: ManageVenueLayouts, ManageVenueInfo

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. |  | Choose a seating map and Create map are shown. |
| Select Create map; with nothing selected, enter the chosen name in the Space inspector’s Name field and press Enter. |  | The map shows the chosen name. |
| Select Save and wait for saving to finish. |  | One map is created and attached to this event. |
| Leave and reopen Seating → Edit map. |  | The same named map reopens; no duplicate map or unintended section, row or ticket assignment was created. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5558: Dashboard - Seating - Open an existing seating map

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5558 (formerly TC-352); Next.js; not executed.

**Title:** Dashboard - Seating - Open an existing seating map

**Description:**

Open a map last saved through the legacy editor in Next.js and compare its actual saved contents. Verify existing geometry and seat identity survive loading without re-saving the map.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use a saved map containing a straight row, curved row, Round table, Semi-round table, Square table, Standing / GA and Circle GA across two sections. Record names, exact counts, labels, curve shape, full-table settings, seat flags/scores and background placement from the saved legacy map.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. |  | The event shows the expected saved map and its existing assignments. |
| Select Edit map and inspect the Space summary. |  | The name, sections, rows, tables, GA areas and total seats match the recorded map. |
| Select each recorded section, row, table and area; inspect its visible fields and geometry. |  | Names, capacities, numbering, curve, positions, table shapes and full-table settings match the saved values. |
| Choose Seats and inspect the recorded seat flags/scores, then Background and its saved image. |  | The same labels, flags, scores and background placement are loaded; nothing was reset to defaults. |
| Leave and reopen without editing. |  | The same saved map is displayed; loading did not create or remove geometry or permissions. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5559: Dashboard - Seating - Add a section

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5559 (formerly TC-353); Next.js; not executed.

**Title:** Dashboard - Seating - Add a section

**Description:**

Add one section to an existing Next.js map and verify its saved name, count and empty contents without changing another section.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use a saved map with one recorded section containing seats. Choose an unused section name of no more than 14 letters/numbers. Record all existing counts and labels.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Build → Section. |  | One new section is selected. |
| Enter the chosen Name, press Enter and position the new section away from the existing section. |  | The intended name appears on one new section. |
| Select Save, wait for Saved, leave and reopen. |  | The new section persists with no rows/tables/GA yet; section count increased by one and existing contents/counts are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5560: Dashboard - Seating - Add a seating row

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5560 (formerly TC-354); Next.js; not executed.

**Title:** Dashboard - Seating - Add a seating row

**Description:**

Add one numbered row to an existing section. Run SeatCount separately: 1 checks a single-seat row, 3 the ordinary case, and 10 a longer row. Offset 0 and Step 1 must produce consecutive labels.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| SeatCount | One | 1 |
| SeatCount | Three | 3 |
| SeatCount | Ten | 10 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use a saved map with a section containing an untouched control row. Record section name, control labels and total seat/row counts. Choose an unused row name of no more than 6 letters/numbers.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
SeatCount: One, Three, Ten

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the intended section and choose Build → Row. |  | One new row is selected in that section. |
| Set Name to the chosen name, Capacity to SeatCount, Offset 0 and Step 1; press Enter after each edit. |  | Exactly SeatCount seats appear, numbered consecutively from 1 to SeatCount. |
| Select Save, wait for Saved, leave and reopen Edit map. |  | One row with the saved values persists; row count increased by one, total seats by SeatCount and the control row is unchanged. |
| Return to Seating and select the new row’s seats. |  | The same numbered seats can be identified for assignment; row creation itself did not assign a ticket type. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5536: Dashboard - Seating - Add a table with Full purchase required on or off

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5536; Next.js; not executed.

**Title:** Dashboard - Seating - Add a table with Full purchase required on or off

**Description:**

Create a table, choose its Full purchase required setting and prove its exact seats, geometry and setting survive reopening. Full purchase required means the table’s seats must be bought together. Run every TableShape/FullPurchaseRequired combination: six runs. Changes can save automatically during setup; this case does not claim the first request contains every later edit.

| TableShape | Build choice |
| --- | --- |
| RoundTable | Round table |
| SemiRoundTable | Semi-round table |
| SquareTable | Square table |

| FullPurchaseRequired | Checkbox after setup and reopening |
| --- | --- |
| On | Checked |
| Off | Unchecked |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no other selling event sharing the map. Changes can save automatically.
* Use a saved map with an empty section A and an untouched control table in another section. Record total seats/tables, the control’s setting and geometry. Use a fresh table with unused name T1 for each run.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
TableShape: RoundTable, SemiRoundTable, SquareTable
FullPurchaseRequired: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select section A and choose the mapped TableShape. |  | One new table appears in section A; its Full purchase required switch starts off. |
| Set Name T1, Capacity 4, Offset 0 and Step 1. Position the table in an empty part of section A and record its position. |  | T1 has exactly seats 1, 2, 3 and 4; total seats increases by four and tables by one. |
| Set Full purchase required to FullPurchaseRequired, select Save and wait for Saved. | On: checked; Off: unchecked | The intended setting is shown for T1. |
| Leave and reopen Edit map; select T1 and then the control table. |  | T1 retains the chosen setting, shape, section, name, capacity, recorded position and all four labels; the control is unchanged and no assignments or sales were created. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-755: Dashboard - Seating - Add a standing area

**Publication status:** Published to Qase on 2026-10-17; updated SPT-755; Next.js; not executed.

**Title:** Dashboard - Seating - Add a standing area

**Description:**

On the Next.js editor, create the selected GA shape and save its capacity, shape and position. A GA area admits a number of people without individual seat numbers. Run each AreaShape separately.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| AreaShape | StandingGA | Standing / GA |
| AreaShape | CircleGA | Circle GA |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use a saved map with an empty recorded section and a second section whose contents and totals are recorded.
* For the customer display check, use an approved published event with an existing public ticket type on sale and a seating map customers can open. No purchase is needed.

**Tags:** edit-event, dashboard, assigned-seating, ga-location, layout-editor, ui-interaction

**Priority:** High

**Parameters:**
AreaShape: StandingGA, CircleGA

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the empty section and choose Build → the selected AreaShape. |  | The intended GA shape is added to that section. |
| Set Name GA1 and Capacity 10; resize and move that area while leaving the control section untouched. |  | The shape moves/resizes and retains capacity 10 without creating ten numbered seats. |
| Select Save, wait for Saved, then leave and reopen the editor. |  | GA1 retains its name, capacity, shape, size and position; the control section is unchanged. |
| Return to Seating and inspect the area in the assignment map. |  | The same GA1 shape and capacity are available for assignment. |
| Open the event’s public listing, choose Tickets and open its seating map without selecting any seat or area. |  | The saved GA1 shape is displayed in the correct position; no basket item, order or charge is created. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-3178: Dashboard - Seating - Save a curved row

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3178; Next.js; not executed.

**Title:** Dashboard - Seating - Save a curved row

**Description:**

Use the Next.js row inspector and curve controls to save a curved row, restore its straight form, then save the intended curve. Prove curvature does not replace seat labels or permissions.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use a three-seat straight row A with recorded labels and endpoint positions. Record a second straight row as a control.

**Tags:** assigned-seating, dashboard, layout-editor, curved-rows, edit-event, ui-interaction

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select row A and turn on Enable curved row. |  | Curve width and Curve depth appear for the selected row. |
| Set Curve width 60 and Curve depth 20, then adjust the curve handle and both endpoints. |  | The three seats follow the changed curve and each original label appears once. |
| Turn Enable curved row off. |  | The selected row becomes straight; its original seat labels remain. |
| Turn Enable curved row on, set Curve width 60 and Curve depth 20, then select Save. |  | The intended curve saves without changing another row. |
| Leave and reopen Edit map, then return to Seating. |  | The saved width 60, depth 20, curve and labels agree in both views; the control row and assignments are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-3386: Dashboard - Seating - Keep seat numbering correct after row changes

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3386; Next.js; not executed.

**Title:** Dashboard - Seating - Keep seat numbering correct after row changes

**Description:**

In the Next.js editor, change one numbering field on a three-seat row and compare the exact labels after reopening. Run every Change/Order pair separately. Set Reverse seat order to the selected Order before making the single field change.

| Change | Start / edit | Expected labels: Normal | Expected labels: Reversed |
| --- | --- | --- | --- |
| Capacity | Capacity 3 → 5; Offset 0; Step 1 | 1, 2, 3, 4, 5 | 5, 4, 3, 2, 1 |
| Offset | Capacity 3; Offset 0 → 5; Step 1 | 6, 7, 8 | 8, 7, 6 |
| Step | Capacity 3; Offset 0; Step 1 → 2 | 1, 3, 5 | 5, 3, 1 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use an unassigned straight row with the selected starting values and another untouched row. Record both rows and the map’s initial seat total.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor

**Priority:** High

**Parameters:**
Change: Capacity, Offset, Step
Order: Normal, Reversed

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the recorded row and set Reverse seat order for the selected Order. |  | The starting labels follow the selected direction. |
| Change only the selected Change field, press Enter and select Save. | Values from the Description table | The row displays the exact expected sequence, without duplicate or missing labels. |
| Leave and reopen Edit map; inspect the row and control row. |  | The edited value, direction and exact sequence persist; the control row is unchanged. |
| Return to Seating and select the edited row’s seats. |  | The same labels appear in the assignment map; total seats increased by exactly two for Capacity and did not change for Offset or Step. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-3385: Dashboard - Seating - Reverse one row seat order

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3385; Next.js; not executed.

**Title:** Dashboard - Seating - Reverse one row seat order

**Description:**

On Next.js, set one row’s Reverse seat order switch without changing its capacity, geometry or another row’s numbering. Run each SavedState separately.

| SavedState | Start with Reverse seat order | Expected target labels after saving |
| --- | --- | --- |
| On | Off: 1, 2, 3 | 3, 2, 1 |
| Off | On: 3, 2, 1 | 1, 2, 3 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use two unassigned three-seat rows with Offset 0 and Step 1. Prepare the target’s starting reversal state from Description; leave the control row’s reversal off. Record both rows’ geometry.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor

**Priority:** High

**Parameters:**
SavedState: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the target row and set Reverse seat order to SavedState. | On = checked; Off = unchecked | The target displays the exact expected labels from Description; the control row remains 1, 2, 3. |
| Select Save, wait for Saved, leave and reopen the map. |  | The target retains the selected switch state and exact expected labels with its original geometry and capacity; the control row is unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5561: Dashboard - Seating - Rename an existing seating map

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5561 (formerly TC-323); Next.js; not executed.

**Title:** Dashboard - Seating - Rename an existing seating map

**Description:**

Rename a legacy-created map through the Next.js Space inspector and verify the same event/map retains its existing contents.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use a saved map with recorded name, section/seat/area counts and labels. Choose a different name no more than 32 characters.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Click empty canvas space to show the Space inspector. |  | Name and the saved map summary appear. |
| Change Name to the recorded new name, press Enter and select Save. |  | Saving completes for the existing map. |
| Leave and reopen Seating and Edit map. |  | The new name persists on the same map; sections, seat/area counts and labels are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5562: Dashboard - Seating - Save a map-wide seat display setting

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5562 (formerly TC-324); Next.js; not executed.

**Title:** Dashboard - Seating - Save a map-wide seat display setting

**Description:**

Save one Next.js Grid settings value and verify its effect and persistence without changing identity or capacity. Run SettingRun separately.

| SettingRun | Field | Initial | Save |
| --- | --- | --- | --- |
| SizeMinimum | Seat size | 6 | 3 |
| SizeOrdinary | Seat size | 6 | 8 |
| SizeMaximum | Seat size | 6 | 12 |
| SpacingZero | Seat spacing | 4 | 0 |
| SpacingOrdinary | Seat spacing | 4 | 8 |
| SpacingMaximum | Seat spacing | 4 | 40 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use two recorded rows: one following map spacing and one with a saved spacing override of 8. Record labels, capacities and the other map setting.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** Medium

**Parameters:**
SettingRun: SizeMinimum, SizeOrdinary, SizeMaximum, SpacingZero, SpacingOrdinary, SpacingMaximum

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Settings → Grid settings. |  | Seat size, Seat spacing, Duplicate offset, Show grid, Snap to grid and Always show seats are available. |
| Enter the mapped saved value in the mapped field and select Save. | Field/value from SettingRun. | The number is accepted and the map reflects that setting. |
| Leave and reopen Grid settings and both rows. |  | The saved value persists; capacities and labels are unchanged, and a map-spacing change leaves the overridden row at 8. |

**Postconditions:**

* Restore the original map settings and reopen them to verify restoration.

### SPT-5563: Dashboard - Seating - Save and clear a row-specific seat spacing

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5563 (formerly TC-334); Next.js; not executed.

**Title:** Dashboard - Seating - Save and clear a row-specific seat spacing

**Description:**

Set a row spacing override in the Next.js inspector, then clear it to restore the map default. Verify an override on another row is unaffected.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Map Seat spacing is 4. Use two rows with recorded labels/capacity; the first has no override and the second has override 6.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the first row; enter Seat spacing 8, press Enter and Save. |  | Only the first row uses spacing 8. |
| Leave and reopen the editor; inspect both rows and Settings. |  | The first row retains 8, the second retains 6 and map spacing remains 4. |
| Clear the first row’s Seat spacing field, press Enter and Save. |  | The first row follows map spacing again. |
| Reopen the editor and both rows. |  | The cleared override remains cleared, the first row uses 4, the control row stays at 6 and all seat labels/counts remain. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5564: Dashboard - Seating - Save a map element rotation

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5564 (formerly TC-331); Next.js; not executed.

**Title:** Dashboard - Seating - Save a map element rotation

**Description:**

Rotate the selected Next.js map element, save, and reopen it. The chosen section’s children rotate together; other elements keep their geometry.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| Element | RoundTable | Round table |
| Element | SemiRoundTable | Semi-round table |
| Element | SquareTable | Square table |
| Element | StandingGA | Standing / GA |
| Element | CircleGA | Circle GA |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Prepare the selected Element at Rotation 0 with recorded labels, capacity and a nearby untouched control.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** Medium

**Parameters:**
Element: Section, Row, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Build and select the recorded Element. |  | Its Name, applicable Capacity and Rotation identify the intended element. |
| Set Rotation 45, press Enter and select Save. |  | Only the selected element rotates; its contents remain together. |
| Leave and reopen the editor and assignment map. |  | Rotation 45, geometry, labels and capacities agree; the control element is unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5565: Dashboard - Seating - Change Full purchase required on an existing table

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5565 (formerly TC-333); Next.js; not executed.

**Title:** Dashboard - Seating - Change Full purchase required on an existing table

**Description:**

Change Full purchase required on a previously saved table. Run every TableShape/SavedState/ExistingAssignment combination; start from the opposite saved state and prove the same seats and assignments survive the change.

| TableShape | Saved table shape |
| --- | --- |
| RoundTable | Round table |
| SemiRoundTable | Semi-round table |
| SquareTable | Square table |

| ExistingAssignment | Starting assignments |
| --- | --- |
| None | No table seat is assigned. |
| OneTicketType | A, with maximum purchase limit 4, is assigned to all four seats. Record A’s count. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use a saved four-seat table of the mapped shape and an untouched control table. Prepare ExistingAssignment as mapped. Start the target’s switch opposite to SavedState; record both tables’ settings and labels.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
TableShape: RoundTable, SemiRoundTable, SquareTable
SavedState: On, Off
ExistingAssignment: None, OneTicketType

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Build and select the intended table. |  | Full purchase required is available for that table; row/GA selection does not offer it. |
| Set Full purchase required to SavedState and select Save. | On = checked; Off = unchecked | Only the selected table changes. |
| Leave and reopen Edit map and Seating. |  | The selected state persists for all four seats; the mapped assignments and A’s recorded count when present, labels, seat totals and control table are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5537: Dashboard - Seating - Save a seat option

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5537; Next.js; not executed.

**Title:** Dashboard - Seating - Save a seat option

**Description:**

On Next.js, save the selected option for the selected seats and prove their other options, labels, scores and an unselected control remain unchanged. Run every SeatOption/SavedState/Selection combination.

| Selection | Starting values | Select the target seats |
| --- | --- | --- |
| One seat | One target with the selected option opposite to SavedState; one untouched control. | Click only the target. |
| ClickAdd | Two targets, one with the selected option on and the other off; one untouched control. | Click the first target, then Shift-click the second. |
| Lasso | Two targets, one with the selected option on and the other off; one untouched control outside their selection box. | Drag a selection box intersecting only the two targets. |

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| SeatOption | AccessibleSeating | Accessible Seating |
| SeatOption | LimitedVisibility | Limited Visibility |
| SeatOption | HiddenFromPublic | Hidden from public |
| Selection | OneSeat | One seat |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Prepare unassigned target seats and a control for the selected Selection as shown in Description. Record all options, scores and labels.
* Hidden from public requires organization flag use_id_based_seat_comparison on.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
SeatOption: AccessibleSeating, LimitedVisibility, HiddenFromPublic
SavedState: On, Off
Selection: OneSeat, ClickAdd, Lasso

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats and select the target seats using the selected Selection. | Selection steps from Description | The Inspector identifies only the intended target seats and the selected option can be edited. |
| Set the selected SeatOption to SavedState and select Save. | On = checked; Off = unchecked | Every selected seat receives the requested value for that option. |
| Leave and reopen the editor; inspect each target and the unselected control separately. |  | The requested option state persists on each target; their other options, scores and labels and every control-seat value remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-2937: Dashboard - Seating - Save manually entered seat scores

**Publication status:** Published to Qase on 2026-10-17; updated SPT-2937; Next.js; not executed.

**Title:** Dashboard - Seating - Save manually entered seat scores

**Description:**

Save an exact score for the selected seats in the Next.js seat inspector, preserving all labels, seat options and unselected scores. Run every Selection/ScoreValue combination separately.

| Selection | Starting scores and selection | Unselected control |
| --- | --- | --- |
| OneSeat | Click one seat scored 3. | One seat scored 6. |
| SeveralSeats | Shift-select two seats scored 3 and 6. | A third seat scored 5. |

| ScoreValue | Enter and expect after reopening |
| --- | --- |
| Minimum | 1 |
| Decimal | 5.5 |
| Ordinary | 7 |
| Maximum | 10 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Prepare the seats and starting scores for the selected Selection as shown in Description. Record each seat’s label and options.

**Tags:** assigned-seating, best-available, dashboard, seat-editor, layout-editor, ui-interaction, curved-rows

**Priority:** High

**Parameters:**
Selection: OneSeat, SeveralSeats
ScoreValue: Minimum, Decimal, Ordinary, Maximum

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats and select the seats for the selected Selection. |  | Only the intended seats are selected; a single seat shows its starting score, while mixed scores do not appear as one shared score. |
| Enter the mapped Seat score, press Enter and select Save. | Mapped ScoreValue: 1, 5.5, 7 or 10 | Every selected seat receives the intended score. |
| Leave and reopen the map; inspect each target seat and the unselected control separately. |  | Every target retains the mapped score; the unselected control retains its mapped original score, and all labels and seat options are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5566: Dashboard - Seating - Save a standing-area score

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5566 (formerly TC-326); Next.js; not executed.

**Title:** Dashboard - Seating - Save a standing-area score

**Description:**

Set Best available score for one GA area in the Next.js inspector and preserve capacities and other areas. Run each ScoreValue separately: Minimum enters 1; Decimal enters 5.5; Maximum enters 10.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use a standing area scored 2 and a control area scored 5, with recorded capacities and names.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
ScoreValue: Minimum, Decimal, Maximum

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Build and select the first GA area. |  | Best available score shows 2. |
| Set Best available score to the mapped ScoreValue, press Enter and select Save. |  | The selected area receives the mapped score. |
| Leave and reopen both areas. |  | The target retains the mapped score and the control retains 5; capacities and names are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5567: Dashboard - Seating - Reject a blank layout name

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5567 (formerly TC-339); Next.js; not executed.

**Title:** Dashboard - Seating - Reject a blank layout name

**Description:**

Commit an empty or spaces-only Name in the Next.js Space inspector and prove the saved map name and geometry remain unchanged. Run each EmptyName separately.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use a saved map and record its name, all counts and one row’s labels.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:**
EmptyName: Blank, Spaces

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Click empty space to show the Space inspector. |  | The original Name and summary are shown. |
| Replace Name with the selected EmptyName value and press Enter. | Blank = empty; Spaces = three spaces | A name validation message appears and the invalid name is not accepted. |
| Reload and reopen the map. |  | The original saved name, counts and row labels remain. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5568: Dashboard - Seating - Protect an assigned seat when reducing row capacity

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5568 (formerly TC-341); Next.js; not executed.

**Title:** Dashboard - Seating - Protect an assigned seat when reducing row capacity

**Description:**

Attempt to remove an assigned last seat by reducing a row’s capacity in Next.js. Verify the rejected edit cannot remove the saved seat or its assignment.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use row A with Capacity 3, Offset 0, Step 1. Seat 3 is assigned to one recorded event ticket type; seats 1 and 2 are unassigned.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select row A. |  | All three labels and capacity 3 appear. |
| Set Capacity 2, press Enter and select Save if it is enabled. |  | The change is rejected with an assigned-seat explanation. |
| Reload and reopen Edit map, then inspect seat 3 in Seating. |  | Capacity remains 3, all original seat labels remain and seat 3 retains its original assignment. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5569: Dashboard - Seating - Protect table assignments when enabling full-table purchase

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5569 (formerly TC-342); Next.js; not executed.

**Title:** Dashboard - Seating - Protect table assignments when enabling full-table purchase

**Description:**

In Next.js, attempt Full purchase required on a table whose seats have two ticket types. Verify the rejected change preserves both assignments. Run ConflictEvent CurrentEvent with the two types on the event used to open the editor, or AnotherEvent with the types only on a second event sharing this map.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Use two approved events sharing the map and a four-seat table with Full purchase required off. On the event selected by ConflictEvent, assign its ticket types A and B to all four seats. On the other event, leave the table unassigned. Record both events, types, table name and seat labels.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:**
ConflictEvent: CurrentEvent, AnotherEvent

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the recorded table. |  | Its four seats and Full purchase required off are shown. |
| Turn Full purchase required on and save. |  | The conflicting setting is rejected; the map is not reported as successfully changed to the conflicting state. |
| Reload and reopen the table, then inspect all four seats on both events’ Seating pages. |  | Full purchase required remains off; A/B remain on the same four labels on the mapped event, and the other event stays unassigned. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5538: Dashboard - Seating - Duplicate a map element without linking its geometry

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5538; Next.js; not executed.

**Title:** Dashboard - Seating - Duplicate a map element without linking its geometry

**Description:**

Duplicate the selected Next.js element and prove the copy is independent. Run each Element with DuplicationOffset 0 and 5 separately; zero allows initial overlap, so use the Inspector to identify the selected copy before moving it.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| Element | RoundTable | Round table |
| Element | SemiRoundTable | Semi-round table |
| Element | SquareTable | Square table |
| Element | StandingGA | Standing / GA |
| Element | CircleGA | Circle GA |
| DuplicationOffset | Zero | 0 |
| DuplicationOffset | Five | 5 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use the selected Element with recorded name, geometry, capacities and seat labels. It has no ticket-type assignments. For each table shape, start with Full purchase required on; for Section, include a four-seat table with that setting on. Record all scores, seat options, appearance, spacing and numbering settings, plus an untouched control and all counts.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
Element: Row, Section, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA
DuplicationOffset: Zero, Five

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Settings and set Duplicate offset to DuplicationOffset. Then select the intended element. |  | Only the intended original is selected. |
| Choose Duplicate in the Inspector and record the selected copy’s name. |  | Exactly one independent copy appears; the original is retained. |
| Move the selected copy to a clearly separate position; for a section, move its contained rows/areas together. Select Save. |  | Only the copy changes position; the original and control element remain in place. |
| Leave and reopen; select the original and copy separately. |  | Both retain their own geometry and seat labels; the copy also retains all recorded scores, seat options, appearance, spacing, numbering and Full purchase required settings. Totals include exactly one copy, with no copied sale permissions. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5540: Dashboard - Seating - Remove unassigned map geometry

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5540; Next.js; not executed.

**Title:** Dashboard - Seating - Remove unassigned map geometry

**Description:**

Delete one unused Next.js element and prove its own geometry is removed while unrelated geometry and assignments remain.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| Element | RoundTable | Round table |
| Element | SemiRoundTable | Semi-round table |
| Element | SquareTable | Square table |
| Element | StandingGA | Standing / GA |
| Element | CircleGA | Circle GA |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use the selected Element with no seat/GA permissions or membership claims on any event using the map. Record its seats/contents and an untouched control.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
Element: Row, Section, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select only the intended Element. |  | The Inspector identifies the intended object. |
| Select Delete and save the map. |  | Only the selected geometry is removed; deleting a section removes its own contents. |
| Leave and reopen the map and event Seating. |  | The selected geometry remains absent, totals changed by its exact recorded contents and the control is unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5539: Dashboard - Seating - Reject deletion of assigned map geometry

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5539; Next.js; not executed.

**Title:** Dashboard - Seating - Reject deletion of assigned map geometry

**Description:**

Attempt to delete a Next.js row, table, area or section that is still assigned to an event and prove saved geometry and permissions are preserved. Run every Element/AssignmentEvent combination. CurrentEvent means assignments exist only on the event used to open the editor; AnotherEvent means the current event has none on this element and a second event sharing the map has the protected assignment.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| Element | RoundTable | Round table |
| Element | SemiRoundTable | Semi-round table |
| Element | SquareTable | Square table |
| Element | StandingGA | Standing / GA |
| Element | CircleGA | Circle GA |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use two approved events sharing the map, with no orders, holds, carts or active buyers. Prepare a ticket-type seat assignment, or a GA assignment for an area, on the event selected by AssignmentEvent. Record geometry, labels, capacities, each event’s assignments and an untouched control.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
Element: Row, Section, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA
AssignmentEvent: CurrentEvent, AnotherEvent

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select only the protected Element. |  | The intended protected object is identified. |
| Select Delete and save if Save is enabled. |  | The deletion is rejected with an assignment explanation. |
| Reload and reopen Edit map and both events’ Seating pages. |  | The object, exact labels/capacities, assignments on each event and control element remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5570: Dashboard - Seating - Reject an invalid numeric map edit

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5570 (formerly TC-355); Next.js; not executed.

**Title:** Dashboard - Seating - Reject an invalid numeric map edit

**Description:**

Commit one invalid Next.js Inspector value and prove it does not replace the saved value or change another object. Run each InvalidEdit separately.

| InvalidEdit | Object / field / attempted value |
| --- | --- |
| CapacityBlank | Row; Capacity; empty |
| CapacityZero | Row; Capacity; 0 |
| CapacityNegative | Row; Capacity; -1 |
| CapacityDecimal | Row; Capacity; 1.5 |
| OffsetNegative | Row; Offset; -1 |
| StepZero | Row; Step; 0 |
| StepDecimal | Row; Step; 1.5 |
| SpacingNegative | Row; Seat spacing; -1 |
| CurveNegative | Curved row; Curve depth; -1 |
| RadiusZero | Circle GA; Radius; 0 |
| ScoreBelow | Seat; Seat score; 0 |
| ScoreAbove | Seat; Seat score; 11 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use an unassigned saved object matching the selected row in the Description. Record its current field, labels/capacity and a control object.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:**
InvalidEdit: CapacityBlank, CapacityZero, CapacityNegative, CapacityDecimal, OffsetNegative, StepZero, StepDecimal, SpacingNegative, CurveNegative, RadiusZero, ScoreBelow, ScoreAbove

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the mapped object and field. |  | The saved starting value is shown. |
| Enter the mapped invalid value and press Enter. |  | A validation message identifies the invalid value; it is not accepted as a map edit. |
| Reload and reopen the object and control. |  | The original field, labels/capacity and control are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5571: Dashboard - Seating - Resize a general admission area

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5571 (formerly TC-356); Next.js; not executed.

**Title:** Dashboard - Seating - Resize a general admission area

**Description:**

Resize a Next.js GA area while preserving its admission capacity and neighboring geometry. Run AreaShape separately; Circle GA also checks its Radius input.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| AreaShape | StandingGA | Standing / GA |
| AreaShape | CircleGA | Circle GA |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use an unassigned GA area of capacity 10, record its size/position and a neighboring control.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
AreaShape: StandingGA, CircleGA

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Build and select the intended area. |  | The correct GA shape and capacity 10 appear. |
| Resize the selected area with its canvas handles; for Circle GA, also set Radius 40 and press Enter. |  | The intended shape changes size and retains capacity 10. |
| Select Save, leave and reopen. |  | The new size persists, Circle GA has diameter 80 for Radius 40, and the control’s geometry/capacity are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5572: Dashboard - Seating - Align selected map elements

> [!note] Feasibility review — 2026-10-21
> Read only the full live SPT-5572 case; no other Qase cases or suites were queried. The six commands are implemented in the current Next.js builder (frontend bda3539bba; backend bda0dd85f0), but the published instructions need clarification. The menu requires at least two selected layout objects of the same target family (rows/tables/GA, or sections); it does not align individual seats. Right-click an already-selected object to preserve the group, then open the **Align** submenu. Right-clicking empty canvas does not open this menu; right-clicking an unselected object replaces the selection and can hide alignment commands.
>
> A concrete supported run is **Build → Select → Rows, tables, and GA**, with two differently sized, staggered Standing / GA areas in one section. Hold Shift and drag a box from empty canvas around those two areas, leaving the control outside; right-click one selected area → **Align** → the chosen command. Use a single event or recurring parent, since the current host blocks recurring-child map editing. The existing six parameter values, edge/center assertions, size/label preservation, Save/reopen and unselected control remain relevant; this clarification does not remove them.
>
> Source chain: assigned-seating-builder/ui/canvas/commands/canvas-command-registry.ts (location/section families, minimum count 2, mutation lock); CanvasContextMenu.web.tsx (Align submenu); canvas-context-menu-target.ts (right-click preserves only an already-selected target); interaction/use-assigned-seating-canvas-events.ts (Shift selection); constants/assigned-seating-builder-canvas-edit-scope.ts (Rows, tables, and GA); ui/workbench/commands/execute-canvas-command.ts (alignment deltas become multi-object moves); translation/backend/serializers/document-diff-to-v3-payload.ts and web-app/apps/venues/api/venue_based/serializers/space_builder_v3.py (saved transforms). These are local source findings, not proof of deployed behavior. Existing implementation tests were read, not run. No browser, alignment, save or live map mutation was executed in this review. Qase remains unchanged; classify this as **source-supported, instructions need clarification, live execution pending**.

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5572 (formerly TC-357); Next.js; not executed.

**Title:** Dashboard - Seating - Align selected map elements

**Description:**

Use one Next.js alignment command on two differently sized elements and verify the specified visible edges or center line agree after saving. Run AlignCommand separately.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| AlignCommand | AlignLeftEdges | Align left edges |
| AlignCommand | AlignToVerticalCenterLine | Align to vertical center line |
| AlignCommand | AlignRightEdges | Align right edges |
| AlignCommand | AlignTopEdges | Align top edges |
| AlignCommand | AlignToHorizontalCenterLine | Align to horizontal center line |
| AlignCommand | AlignBottomEdges | Align bottom edges |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use two unassigned, separated elements in one section, with different visible sizes and staggered positions. Record their labels/capacities and a third unselected control.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
AlignCommand: AlignLeftEdges, AlignToVerticalCenterLine, AlignRightEdges, AlignTopEdges, AlignToHorizontalCenterLine, AlignBottomEdges

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the two intended elements and right-click the selection. |  | Alignment commands are available for two selected elements. |
| Choose the selected AlignCommand and Save. |  | Both selected elements share the named visible edge or center line; sizes and labels do not change. |
| Leave and reopen. |  | The alignment persists and the third element remains in its recorded position. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5573: Dashboard - Seating - Distribute selected map elements evenly

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5573 (formerly TC-358); Next.js; not executed.

**Title:** Dashboard - Seating - Distribute selected map elements evenly

**Description:**

Distribute three Next.js elements with equal visible gaps while keeping the two outer elements fixed. Run Direction separately.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use three unassigned elements of different sizes with unequal gaps along the chosen direction; record the outer elements’ positions and a fourth control.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
Direction: Horizontal, Vertical

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select all three intended elements and open the right-click menu. |  | The distribution command is available for three selected elements. |
| Choose the matching distribution command and Save. | Horizontal: Distribute with equal horizontal gaps; Vertical: Distribute with equal vertical gaps | The two visible gaps are equal and the outer elements remain fixed. |
| Leave and reopen. |  | The equal gaps and outer positions persist; sizes, capacities, labels and the fourth element are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5574: Dashboard - Seating - Restrict which map elements can be moved

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5574 (formerly TC-359); Next.js; not executed.

**Title:** Dashboard - Seating - Restrict which map elements can be moved

**Description:**

Use Editable elements to move the allowed family while protecting the other family from an accidental drag. Run EditScope separately. SeatingAreas means the visible Rows, tables, and GA choice.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use one section containing a row, table and GA area. Record all geometry, labels and capacities plus another section as a control.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:**
EditScope: Sections, SeatingAreas

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Set Editable elements to EditScope. |  | The selected scope is shown. |
| Attempt to drag a locked family, then move an allowed element to a distinct grid position. | Sections: move the section; rows/tables/GA are locked. SeatingAreas: choose Rows, tables, and GA and move a row; the section is locked. | Only the allowed element moves; moving a section carries its contents together. |
| Save, leave and reopen. |  | The allowed move persists; locked objects, labels, capacities and control section are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5575: Dashboard - Seating - Undo and redo a map edit

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5575 (formerly TC-360); Next.js; not executed.

**Title:** Dashboard - Seating - Undo and redo a map edit

**Description:**

Duplicate an existing row, Undo and Redo it, then save. Prove the final map contains exactly one independent copy. Run ActionMethod separately.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use an existing unassigned map with one recorded row and an untouched control; record counts. This is an existing-map edit, not the initial create operation that establishes a new history baseline.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
ActionMethod: Buttons, Shortcuts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the row and duplicate it using ActionMethod. | Buttons: Inspector Duplicate. Shortcuts: Ctrl/Cmd+D. | Exactly one copy appears. |
| Undo the duplicate using ActionMethod. | Buttons: Undo. Shortcuts: Ctrl/Cmd+Z. | The copy is removed and original counts return. |
| Redo using ActionMethod, then Save. | Buttons: Redo. Shortcuts: Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z, each in a separate shortcut run. | Exactly one copy returns. |
| Leave and reopen. |  | One original and one copy persist; the control and other geometry are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5576: Dashboard - Seating - Keep keyboard shortcuts from changing a map while typing

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5576 (formerly TC-361); Next.js; not executed.

**Title:** Dashboard - Seating - Keep keyboard shortcuts from changing a map while typing

**Description:**

Verify map shortcuts are suspended while a field or dialog owns focus. Backspace must edit the name rather than delete the selected row; a dialog must not receive hidden canvas commands.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use an unassigned row named ROW1 and record its seats, counts and another control row.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select ROW1 and focus its Name field; delete the final 1 with Backspace, then restore ROW1 before committing. |  | Only the text changes; no row or seat is deleted. |
| Open Help and visit Overview, Canvas, Seats and Shortcuts; while the dialog is open press Ctrl/Cmd+D and Delete. |  | The dialog stays usable and no canvas object is duplicated or deleted. |
| Close Help and reopen the saved map. |  | The original names, geometry, labels and counts remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5577: Dashboard - Seating - Navigate the canvas without changing the map

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5577 (formerly TC-362); Next.js; not executed.

**Title:** Dashboard - Seating - Navigate the canvas without changing the map

**Description:**

Pan, zoom and reset the Next.js editor view while preserving selection identity and saved geometry.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use a map larger than the visible canvas; record a row’s labels, its location relative to a section and map totals.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Pan across empty canvas space, then zoom in and out around the recorded row. |  | The view changes while the row’s label and section remain identifiable. |
| Select the row and use Zoom to selection, then Reset view; repeat with F and Home. |  | The correct row is framed, then the full map is shown; neither operation changes geometry. |
| Leave and reopen the editor. |  | Recorded positions, labels, capacities and counts are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5578: Dashboard - Seating - Cancel a pending background image upload

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5578 (formerly TC-363); Next.js; not executed.

**Title:** Dashboard - Seating - Cancel a pending background image upload

**Description:**

Preview a Next.js background upload and cancel before Upload. Prove closing the dialog clears only the pending file and does not add an image.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| CloseMethod | CloseButton | Close button |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for editing with no orders, holds, active carts or selling event sharing the map. Changes can save automatically.
* Use a saved map with no background and recorded geometry/counts. Prepare a JPG, PNG or SVG file under 5MB.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:**
CloseMethod: Cancel, CloseButton

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Background → Background image and select the prepared file. |  | The pending file is previewed and Upload is available. |
| Close using CloseMethod without selecting Upload. | Cancel or dialog close button | The pending upload is discarded. |
| Reopen the dialog, then reopen the map. |  | No background is present; all recorded geometry/counts remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5579: Dashboard - Seating - Reject AI ranking generation without context

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5579 (formerly TC-364); Next.js; not executed.

**Title:** Dashboard - Seating - Reject AI ranking generation without context

**Description:**

Verify Next.js AI ranking requires meaningful context before a generation job can start. Run ContextValue separately; no generation job is submitted.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for editing with no orders, holds, active carts or selling event sharing the map. Changes can save automatically.
* Use a fully saved map with recorded seat scores.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:**
ContextValue: Blank, Spaces

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats and select Generate beside Seat rankings. |  | Generate Seat Scores offers AI generated, Sales order and Sales count. |
| Select AI generated and enter ContextValue. | Blank: leave empty; Spaces: three spaces | AI scoring requires context is shown and generation cannot be submitted. |
| Cancel and reopen the recorded seats. |  | All scores remain unchanged and no job was started. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5580: Dashboard - Seating - Reject a stale map save after another editor saves

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5580 (formerly TC-365); Next.js; not executed.

**Title:** Dashboard - Seating - Reject a stale map save after another editor saves

**Description:**

Open the same Next.js map in two independent sessions, save in the first, then attempt an edit from the stale second session. Prove the later stale save cannot overwrite the first saved result.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Two controlled employees can edit the same saved map in separate browser sessions. Both load the same original map before any change; record name and one unassigned row’s capacity.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In session one, open the event’s Seating → Edit map; in session two open the same map before making changes. |  | Both show the original values. |
| In session one change the map Name to a different recorded name, Save and wait for Saved. |  | The first change is saved. |
| In session two change the recorded row’s Capacity, press Enter and attempt Save. |  | A changed-by-someone-else/reload message appears; the stale change is not reported as saved. |
| Reload session two and reopen the map in both sessions. |  | Both show session one’s name and the original row capacity; no stale overwrite or duplicate geometry occurred. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5581: Dashboard - Seating - Save a pending edit before leaving the editor

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5581 (formerly TC-366); Next.js; not executed.

**Title:** Dashboard - Seating - Save a pending edit before leaving the editor

**Description:**

Make a valid Next.js edit and immediately leave through a supported navigation action. Verify departure finishes only after the pending edit saves. Run ExitAction separately.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| ExitAction | EditorBack | Editor back |
| ExitAction | BrowserBack | Browser back |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use an unassigned saved row; record its name and an untouched control. Choose a different row name of at most 6 letters/numbers.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
ExitAction: EditorBack, BrowserBack

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Change the row’s Name and commit with Enter. |  | The new name is pending or saving. |
| Immediately use ExitAction. | Editor back control or browser Back | Navigation waits for the valid pending edit to finish and reaches the requested previous page. |
| Reopen Seating → Edit map. |  | The new row name persists once; the control row and all labels/counts remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5582: Dashboard - Seating - Save map appearance defaults

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5582 (formerly TC-367); Next.js; not executed.

**Title:** Dashboard - Seating - Save map appearance defaults

**Description:**

Save Next.js map appearance defaults and prove every visible state retains its own values without changing geometry or capacity. Run AppearanceKind separately.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| AppearanceKind | SectionDefaults | Section defaults |
| AppearanceKind | GADefaults | GA defaults |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use at least two sections and two GA areas without local appearance overrides; record their geometry/capacity and existing defaults.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:**
AppearanceKind: SectionDefaults, GADefaults

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Settings → Appearance and Edit the selected defaults. | Section defaults or GA defaults | Section has Normal/Hover/Unavailable; GA also has Selected. |
| In each available state enable Fill colour, Fill opacity, Border colour, Border width and Border opacity; enter distinct recorded values. | Normal: #336699/80%/#112233/2/60%; Hover: #663399/70%/#223344/3/50%; Unavailable: #999999/40%/#334455/1/30%; GA Selected: #CC6600/90%/#445566/4/100%. | Each state retains its own draft values when changing tabs. |
| For GA defaults set Available GA animation to Breathing. Select Apply appearance and Save. |  | The Normal style is previewed; the map saves. |
| Leave and reopen every appearance state. |  | All exact values, and GA Breathing when selected, persist; geometry and capacity are unchanged. |

**Postconditions:**

* Restore the original map appearance defaults and reopen to verify restoration.

### SPT-5583: Dashboard - Seating - Reset an appearance override to its map default

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5583 (formerly TC-368); Next.js; not executed.

**Title:** Dashboard - Seating - Reset an appearance override to its map default

**Description:**

Set a local Next.js appearance override, reset that state, and prove inheritance returns without clearing another state or shape.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use two GA areas following map defaults, with recorded Normal fill and Hover style. Record all geometry and capacities.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the first area and Edit GA appearance. In Normal enable Fill colour #CC6600; Apply appearance and Save. |  | Only the first area uses the override. |
| Reopen its appearance; choose Normal → Reset state, then Apply appearance and Save. |  | The Normal local values are cleared and the area follows map defaults again. |
| Leave and reopen both shapes and their appearance states. |  | The first area inherits the original Normal default; Hover, the other shape, geometry and capacity are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5584: Dashboard - Seating - Cancel appearance edits

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5584 (formerly TC-369); Next.js; not executed.

**Title:** Dashboard - Seating - Cancel appearance edits

**Description:**

Change several Next.js appearance states and cancel before Apply appearance. Prove changing tabs has not saved a partial appearance.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use a GA area with recorded Normal, Hover, Selected and Unavailable appearance values.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the area and Edit GA appearance. Change Normal fill colour and Hover border width. |  | Both drafts remain visible when switching states. |
| Select Cancel and reopen the appearance dialog. |  | Every state retains its original saved values. |
| Leave and reopen the map. |  | No appearance, geometry or capacity change was saved. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5585: Dashboard - Seating - Reject an invalid appearance value

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5585 (formerly TC-370); Next.js; not executed.

**Title:** Dashboard - Seating - Reject an invalid appearance value

**Description:**

Enter an invalid Next.js opacity or border width and prove Apply appearance cannot save it. Run InvalidAppearance separately.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no selling event sharing the map. Changes can save automatically.
* Use a shape with recorded saved appearance and an untouched control.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** Medium

**Parameters:**
InvalidAppearance: OpacityBelow, OpacityAbove, BorderAbove, RequiredBlank

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Open the shape’s appearance dialog and enable the mapped custom property in Normal. |  | The property’s input is available. |
| Enter InvalidAppearance and attempt Apply appearance. | OpacityBelow: Fill opacity -1; OpacityAbove: Fill opacity 101; BorderAbove: Border width 21; RequiredBlank: enable Fill opacity and clear it. | Field validation prevents applying the invalid appearance. |
| Cancel and reopen the saved map and appearance. |  | Original valid values, control appearance and geometry/capacity remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-3499: Dashboard - Seating - Add a background image

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3499; Next.js; not executed.

**Title:** Dashboard - Seating - Add a background image

**Description:**

Upload a background image through Next.js and save its position and size without moving map geometry. Run each ImageType/InputMethod pair separately.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| InputMethod | FilePicker | File picker |
| InputMethod | DragAndDrop | Drag and drop |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for editing with no orders, holds, active carts or selling event sharing the map. Changes can save automatically.
* Use a saved map with no background. Prepare a valid image of the selected ImageType under 5MB. Record section/row positions and labels.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, upload-image

**Priority:** Medium

**Parameters:**
ImageType: JPG, PNG, SVG
InputMethod: FilePicker, DragAndDrop

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Background → Background image. |  | Manage Background Image opens and explains supported files. |
| Choose the prepared image using InputMethod, then select Upload. | File picker or Drag and drop | The image uploads and appears on the map. |
| Move and resize only the background using its canvas handles; record its position/size against the grid and section boundaries. Select Save. |  | The reference image changes while sections/rows stay in place. |
| Leave and reopen the map. |  | The same image and recorded transform persist; seat labels, capacities and section geometry are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments; do not delete customer, order or financial records.

### SPT-5542: Dashboard - Seating - Remove a background image

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5542; Next.js; not executed.

**Title:** Dashboard - Seating - Remove a background image

**Description:**

Remove the saved Next.js background image while retaining all map geometry and assignments.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for editing with no orders, holds, active carts or selling event sharing the map. Changes can save automatically.
* Use a saved map with a recorded background image, row/section positions, seat labels and capacities.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Background → Background image. |  | The original image is shown. |
| Use the image’s remove button, close the dialog, and save the map. |  | Only the background is removed; closing the dialog is not assumed to undo the removal. |
| Leave and reopen the map and image dialog. |  | No background remains; original geometry, labels, capacities and permissions are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments; do not delete customer, order or financial records.

### SPT-5543: Dashboard - Seating - Reject an invalid background upload

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5543; Next.js; not executed.

**Title:** Dashboard - Seating - Reject an invalid background upload

**Description:**

Reject an oversized, unsupported or multiple-file selection in the Next.js background uploader. Keep the map unchanged. Oversized preserves the existing 5MB-limit regression.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for editing with no orders, holds, active carts or selling event sharing the map. Changes can save automatically.
* Use a saved map without a background; record counts and geometry. Prepare a valid PNG larger than 5MB, one PDF, and two valid images each under 5MB.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** Medium

**Parameters:**
InvalidUpload: Oversized, Unsupported, Multiple

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Background → Background image. |  | The empty uploader is shown. |
| Drop the selected InvalidUpload into the uploader. | Oversized: the >5MB PNG. Unsupported: PDF. Multiple: both valid images together. | The relevant size/type/one-image error appears; no invalid upload is accepted. |
| Cancel and reopen the map. |  | No background was added and geometry, counts and labels are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments; do not delete customer, order or financial records.

### SPT-5586: Dashboard - Seating - Rename a map element

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5586 (formerly TC-336); Next.js; not executed.

**Title:** Dashboard - Seating - Rename a map element

**Description:**

Rename one existing Next.js map element and verify its geometry, contents and ticket-type assignments stay attached to it. Run each Element/NameInput combination separately. Names are saved in uppercase without surrounding spaces.

| Element | Required setup | New name |
| --- | --- | --- |
| Section | Two sections; the target contains a row, table and GA area. Record their labels, capacities and assignments. | Choose a different unused section name of up to 14 letters/numbers. |
| Row, each table shape, each GA shape | A target and untouched control in the same section. Record capacity, seat labels or GA limits and assignments. | Choose a different unused name of up to 6 letters/numbers. |

| NameInput | Value to enter | Saved result |
| --- | --- | --- |
| Ordinary | MAP2 for a section; LOC2 for another element. | The entered name. |
| MixedCaseSpaces | Paste two spaces, ab12, then two spaces. | AB12, without surrounding spaces. |
| MaximumLength | SECT1234567890 for a section; LOC123 for another element. | All 14 section characters or all 6 location characters. |

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| Element | RoundTable | Round table |
| Element | SemiRoundTable | Semi-round table |
| Element | SquareTable | Square table |
| Element | StandingGA | Standing / GA |
| Element | CircleGA | Circle GA |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, active holds or carts and no selling event sharing the map. Changes can save automatically.
* Prepare the selected Element and control as shown in Description. Ensure the mapped final name is unused in the map for a section or in the same section for another element. Record current names, geometry, contents and assignments.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
Element: Section, Row, RoundTable, SemiRoundTable, SquareTable, StandingGA, CircleGA
NameInput: Ordinary, MixedCaseSpaces, MaximumLength

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the intended Element. |  | Its current name identifies the intended element. |
| Enter the mapped NameInput in Name, press Enter and select Save. |  | Only the intended element is renamed. |
| Leave and reopen Edit map and Seating. |  | The exact mapped saved name persists on the same geometry; all contained rows, tables, areas, seat labels, capacities and assignments are unchanged, as is the recorded control. |

**Postconditions:**

* Retain the recorded map and assignments; do not delete customer, order or financial records.

### SPT-5587: Dashboard - Seating - Save the setting to hide location names

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5587 (formerly TC-332); Next.js; not executed.

**Title:** Dashboard - Seating - Save the setting to hide location names

**Description:**

Save Hide location names for one Next.js section without renaming it or changing its contents. Run SavedState separately. Customer-map hover behavior is a separate runtime proof.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for editing with no orders, holds, active carts or selling event sharing the map. Changes can save automatically.
* Use two sections with recorded names, child labels and Hide location names values. Prepare the first section opposite to SavedState.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
SavedState: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the first section and set Hide location names to SavedState. | On = checked; Off = unchecked | Only the chosen section’s setting changes. |
| Select Save, leave and reopen both sections. |  | The first retains SavedState; the other setting, all names, labels and capacities remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments; do not delete customer, order or financial records.

### SPT-3392: Dashboard - Seating - Display seat scores without changing the map

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3392; Next.js; not executed.

**Title:** Dashboard - Seating - Display seat scores without changing the map

**Description:**

Review Next.js Ranking colors on a map with 500 or more seats without changing scores, geometry or assignments. Compare known differing scores, and repeat the toggle to catch stale coloring.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for editing with no orders, holds, active carts or selling event sharing the map. Changes can save automatically.
* Use an existing 500+ seat map approved for read-only inspection, with two recorded seats of different scores and known geometry/assignments. Do not create or stress-generate a large map for this case.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor, performance

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats and turn Ranking colors on. |  | The score overlay appears; the two recorded differing scores are distinguishable using the ranking display. |
| Turn Ranking colors off and on five times, then pan and zoom to both seats. |  | The overlay and ordinary view agree with the selected state; no seats disappear or change identity. |
| Turn the overlay off, leave and reopen the map; inspect the two scores and assignments. |  | Scores, geometry, labels and assignments remain unchanged; no save was needed to protect configuration. |

**Postconditions:**

* Retain the recorded map and assignments; do not delete customer, order or financial records.

### SPT-5541: Dashboard - Seating - Reject an invalid section name

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5541; Next.js; not executed.

**Title:** Dashboard - Seating - Reject an invalid section name

**Description:**

Commit one invalid section name through Next.js and prove both existing sections remain unchanged. Run InvalidName separately.

| InvalidName | Attempted Name for section A |
| --- | --- |
| Blank | Empty |
| Duplicate | B |
| Punctuation | A! |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for changes with no orders, holds, active carts or selling event sharing the map; changes can save automatically.
* Use sections A and B with recorded geometry, child names, seat labels and assignments.

**Tags:** assigned-seating, dashboard, map-editor

**Priority:** High

**Parameters:**
InvalidName: Blank, Duplicate, Punctuation

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select section A. |  | The original section is identified. |
| Enter the mapped InvalidName, press Enter and attempt Save if enabled. |  | Validation or saving rejects the name; it is not accepted as a saved section name. |
| Reload and reopen both sections and event Seating. |  | Sections A/B, their geometry, child labels and assignments remain unchanged. |

**Postconditions:**

* Retain the original map and assignments; do not delete customer, order or financial records.

### SPT-5588: Dashboard - Seating - Reject an invalid row name

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5588 (formerly TC-340); Next.js; not executed.

**Title:** Dashboard - Seating - Reject an invalid row name

**Description:**

Commit one invalid row name through Next.js and prove both saved rows retain their identities. Run InvalidName separately. Duplicate uses rows with the same seat numbers, rather than assuming every repeated row name is forbidden.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for changes with no orders, holds, active carts or selling event sharing the map; changes can save automatically.
* Use rows A and B in the same section, both with seats 1, 2 and 3. Record geometry and any assignments. InvalidName Blank clears Name; Duplicate enters B on A; Punctuation enters A!.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:**
InvalidName: Blank, Duplicate, Punctuation

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select row A. |  | Name A and its three labels identify the intended row. |
| Enter the selected InvalidName, press Enter and attempt Save if enabled. |  | The invalid/conflicting name is rejected. |
| Reload and reopen both rows and Seating. |  | Both original names, labels, geometry and assignments remain unchanged. |

**Postconditions:**

* Retain the original map and assignments; do not delete customer, order or financial records.

### TC-381: Dashboard - Seating - Flip a section

**Draft status:** Blocked duplicate candidate for SPT-3384; retained for migration review and excluded from the dry-run batch. Resolve the missing legacy numbering option before deciding an existing-case enhancement; do not create a second flip case.

**Title:** Dashboard - Seating - Flip a section

**Description:**

Mirror one section in Next.js, preserving its seat identities, assignments and another section. Run Direction separately. The legacy optional reverse-numbering checkbox and Clear seat order reversal are tracked as unresolved migration decisions outside this case.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for changes with no orders, holds, active carts or selling event sharing the map; changes can save automatically.
* Use two sections with asymmetric row/table placement. Record all labels, seat counts, capacities, assignments and each row’s Reverse seat order setting.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
Direction: Horizontal, Vertical

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the first section. |  | The correct section and its contained geometry are identified. |
| Choose the matching flip action and Save. | Horizontal: Flip horizontal. Vertical: Flip vertical. | The selected section’s contents mirror on that axis. Horizontal flips also toggle each contained row’s Reverse seat order; Vertical preserves its recorded value. |
| Leave and reopen Edit map and Seating. |  | The mirrored arrangement and corresponding reversal states persist; seat labels/assignments/counts and the second section remain unchanged. |

**Postconditions:**

* Retain the original map and assignments; do not delete customer, order or financial records.

### SPT-5589: Dashboard - Seating - Respect the always-show-seats size boundary

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5589 (formerly TC-382); Next.js; not executed.

**Title:** Dashboard - Seating - Respect the always-show-seats size boundary

**Description:**

Check the Next.js size boundary on saved maps without generating a load or stress scenario. Run MapSize separately.

| MapSize | Exact numbered-seat count | Expected availability |
| --- | --- | --- |
| BelowLimit | 4499 | The off setting can be enabled |
| AtLimit | 4500 | The off setting is disabled with the under-4500 explanation |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for changes with no orders, holds, active carts or selling event sharing the map; changes can save automatically.
* Use a prepared map with the selected exact count and Always show seats off. Record geometry/counts and the event’s purchase settings. Do not generate thousands of seats during execution.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:**
MapSize: BelowLimit, AtLimit

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event’s Manage → Seating and inspect Always show seats and areas to customers. |  | Availability matches the selected MapSize table. |
| Open Edit map → Settings and inspect Always show seats. |  | The same off-state size boundary is enforced in the editor. |
| Leave without changing the setting, then reopen the event/map. |  | The off setting, exact seat count, geometry and assignments are unchanged. |

**Postconditions:**

* Retain the original map and assignments; do not delete customer, order or financial records.

### SPT-3393: Dashboard - Seating - Move selected sections

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3393; Next.js; not executed.

**Title:** Dashboard - Seating - Move selected sections

**Description:**

Move a selected group in the Next.js editor and prove unselected sections stay in place. Shift selection must not automatically include intermediate sections.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions on a non-Basic organization.
* Use an approved map with unassigned sections A/B/C/D in order. Record geometry, children, labels and capacities. No orders/holds/carts or selling event share the map.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction

**Priority:** High

**Parameters:**
SelectionGroup: OuterTwo, Three

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event’s Manage → Seating → Edit map and show the grid. Choose Editable elements → Sections. |  | All four recorded sections are identifiable. |
| Select only the sections mapped by SelectionGroup using Shift-click. | OuterTwo = A and D; Three = A, C and D | Only the named sections are selected; B is never implicitly selected. |
| Shift-click already selected section D twice. |  | Each intended section remains selected exactly once: two for OuterTwo or three for Three; B remains unselected. |
| Drag the group two grid squares right and one down, then Save. |  | Every selected section moves by the same amount with its contents, and the selection outline encloses the complete selected group. |
| Leave and reopen. |  | Selected sections retain the common move; B and any unselected C retain their original positions, labels and capacities. |

**Postconditions:**

* Retain the resulting assignments for review; do not delete customer, order or financial records.

### SPT-5590: Dashboard - Seating - Change an existing table’s seat numbering

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5590 (formerly TC-387); Next.js; not executed.

**Title:** Dashboard - Seating - Change an existing table’s seat numbering

**Description:**

Change one numbering field on a saved table, preserving its full-purchase setting and the other table. Run every TableShape/NumberingChange combination.

| TableShape | Saved table shape |
| --- | --- |
| RoundTable | Round table |
| SemiRoundTable | Semi-round table |
| SquareTable | Square table |

| NumberingChange | Starting values and edit | Expected labels |
| --- | --- | --- |
| Capacity | Capacity 4 → 6; Offset 0; Step 1 | 1, 2, 3, 4, 5, 6 |
| Offset | Capacity 4; Offset 0 → 5; Step 1 | 6, 7, 8, 9 |
| Step | Capacity 4; Offset 0; Step 1 → 2 | 1, 3, 5, 7 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no other selling event sharing the map. Changes can save automatically.
* Use a saved, unassigned table of the selected shape with the mapped starting values and Full purchase required on. Record its position, the map seat total and an untouched control table.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
TableShape: RoundTable, SemiRoundTable, SquareTable
NumberingChange: Capacity, Offset, Step

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the saved target table. |  | Its shape, four labels and full-purchase setting match the selected setup. |
| Change only the mapped NumberingChange field and select Save. | Values from Description | The target displays exactly the mapped labels; its full-purchase setting stays on. |
| Leave and reopen the table and Seating. |  | The exact new labels persist. Capacity increases total seats by two; Offset and Step do not change the total. The target position, full-purchase setting and control table are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5591: Dashboard - Seating - Clear saved seat scores

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5591 (formerly TC-388); Next.js; not executed.

**Title:** Dashboard - Seating - Clear saved seat scores

**Description:**

Clear the score from selected seats and prove it stays blank after reopening. Run Selection OneSeat by clicking one target scored 7, or SeveralSeats by Shift-selecting two targets scored 3 and 7. Leave one control seat scored 6 unselected.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no other selling event sharing the map. Changes can save automatically.
* Prepare the target seats and control for the selected Selection. Record labels and seat options.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
Selection: OneSeat, SeveralSeats

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats and select the target seats. |  | Only the intended seats are selected. |
| Delete the complete Seat score value, press Enter and select Save. | Empty value | The selected seats have no entered score; the blank is accepted. |
| Leave and reopen; inspect each target and the control separately. |  | Each target’s score is blank, the control still has 6, and all labels and seat options are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5592: Dashboard - Seating - Clear a standing-area score

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5592 (formerly TC-389); Next.js; not executed.

**Title:** Dashboard - Seating - Clear a standing-area score

**Description:**

Clear a saved Best available score from a GA area and prove blank is retained without changing its admission capacity. Run AreaShape StandingArea for Standing / GA and CircleGA for Circle GA.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no other selling event sharing the map. Changes can save automatically.
* Use a GA area of the selected shape with capacity 10 and score 7, plus an untouched control area scored 6. Record labels, geometry and assignments.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
AreaShape: StandingArea, CircleGA

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Build and select the target area. |  | Best available score shows 7 and Capacity shows 10. |
| Clear Best available score completely, press Enter and select Save. |  | The empty score is accepted. |
| Leave and reopen both areas. |  | The target’s score stays blank and capacity remains 10; the control remains scored 6, with all geometry and assignments unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5593: Dashboard - Seating - Keep assignments attached when renumbering a row

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5593 (formerly TC-390); Next.js; not executed.

**Title:** Dashboard - Seating - Keep assignments attached when renumbering a row

**Description:**

Renumber a saved row that already has a ticket-type assignment and prove the assignment remains on the same seat after its label changes.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no other selling event sharing the map. Changes can save automatically.
* Use a straight three-seat row A numbered 1, 2, 3, with Reverse seat order off. Only seat 2 is assigned to ticket type T; give it Accessible Seating on and score 7. Record an untouched control row and T’s assigned count.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select row A and change Offset from 0 to 5, then select Save. |  | The row is numbered 6, 7, 8 without adding or deleting seats. |
| Leave and reopen Edit map; choose Seats and inspect A7. |  | The same middle seat retains Accessible Seating on and score 7. |
| Return to Seating and inspect A6, A7 and A8 separately. |  | Only A7 retains T. A6 and A8 remain unassigned, T’s count is unchanged and the control row is unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5594: Dashboard - Seating - Reject a group deletion when one row has assignments

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5594 (formerly TC-391); Next.js; not executed.

**Title:** Dashboard - Seating - Reject a group deletion when one row has assignments

**Description:**

Delete an unassigned row and an assigned row together. Prove rejection preserves both saved rows, including the freely removable row.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no other selling event sharing the map. Changes can save automatically.
* Use two recorded three-seat rows A and B in one section. A has no assignments; one seat in B is assigned to ticket type T. Record a third control row, total seats and all labels.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Shift-select only rows A and B. |  | Exactly the two intended rows are selected. |
| Choose Delete and select Save if the editor offers it. |  | The deletion is refused with an assignment explanation; the rejected deletion is not reported as saved. |
| Reload and reopen Edit map and Seating. |  | Both A and B remain with all six original seats; B’s assignment, total seats and the control row are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5595: Dashboard - Seating - Update a shared standing area’s physical capacity

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5595 (formerly TC-401); Next.js; not executed.

**Title:** Dashboard - Seating - Update a shared standing area’s physical capacity

**Description:**

Increase a map area’s physical capacity and verify both events sharing the map see it, while their separate ticket-type permission limits stay unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use two events approved for editing that share the same map, with no orders, holds, carts or other selling event using it. Changes can save automatically.
* Use GA1 with physical capacity 10. Event A assigns ticket type A to GA1 with limit 3; event B assigns ticket type B with limit 7. Record a control area’s capacity and assignments.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select GA1, change Capacity from 10 to 12 and Save. |  | GA1’s map capacity becomes 12. |
| Leave and reopen each event’s Seating page and inspect GA1. |  | Both use physical capacity 12; event A retains limit 3 and event B retains limit 7. |
| Reopen the control area and map. |  | Only GA1’s physical capacity changed; controls, geometry, labels and assignments are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5596: Dashboard - Seating - Change area appearance without altering sold admission

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5596 (formerly TC-402); Next.js; not executed.

**Title:** Dashboard - Seating - Change area appearance without altering sold admission

**Description:**

Change only a GA area’s Normal fill color and prove its sold tickets, assignment limit and remaining admission are preserved.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an approved event with a saved GA area of capacity 10, ticket type A assigned with limit 7, and exactly two issued GA tickets. No active buyers, holds, carts or other selling event may use this map.
* Record the two ticket/order references, sold count 2, assignment limit 7, original Normal fill and an untouched control area. The global switch enable_distributed_inventory is on and this event has_distributed_inventory is true; an administrator can verify this in Admin → Events.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the GA area, open Appearance and change only its Normal Fill color, then Apply and Save. | Choose a different fill color and record its exact value. | The chosen fill is shown without changing Capacity. |
| Leave and reopen Appearance and Seating. |  | The saved fill is retained; physical capacity stays 10, A’s limit stays 7, sold count stays 2 and the control is unchanged. |
| Open the recorded orders and tickets without changing them. |  | The same two issued tickets remain on the same event and area, with unchanged order totals and admission status. |

**Postconditions:**

* Restore the original Normal fill color after recording the result. Preserve the two orders and all ticket and financial history.

### SPT-5597: Dashboard - Seating - Reject map edits after layout permission is removed

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5597 (formerly TC-403); Next.js; not executed.

**Title:** Dashboard - Seating - Reject map edits after layout permission is removed

**Description:**

Keep the editor open while the employee’s layout permission is removed, then prove a later edit cannot change the saved map.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an approved map with no orders, holds, carts or selling event sharing it. Record its name and geometry.
* The employee has Manage Venue Layouts but does not have Manage Venue Info or an unrestricted employee override. An authorized administrator can change the employee’s role in Roles Manager and Employee management.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map as the employee and record the map name. |  | The employee initially has access to the editor. |
| As the administrator in another session, remove Manage Venue Layouts from this employee’s role and save the role assignment. |  | The employee retains Manage Events but has neither permission that allows map editing. |
| In the employee’s open editor, try to change the map name and save. |  | Editing is unavailable or refused; the map change is not accepted as saved. |
| As the administrator, reopen the map. |  | The original map name and geometry remain unchanged. |

**Postconditions:**

* Restore the employee’s original role permissions and verify the restored assignment. Preserve the unchanged map.

### SPT-5598: Dashboard - Seating - Preserve occupied places when reducing area capacity

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5598 (formerly TC-404); Next.js; not executed.

**Title:** Dashboard - Seating - Preserve occupied places when reducing area capacity

**Description:**

Reduce a GA area’s physical capacity below its occupied places while distributed inventory is active. Distributed inventory tracks individual available places. Prove occupied admission survives and the stored capacity stops at four rather than the requested two. Run ClaimState ActiveHold with four places in an active Box Office hold, or IssuedTickets with four issued GA tickets.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use a controlled event approved for this edit with global switch enable_distributed_inventory on and event has_distributed_inventory true. An administrator can verify the event setting in Admin → Events. Do not enable the inventory mode merely to run this case.
* Use one GA area with physical capacity 10 and a ticket-type limit of 10. Prepare exactly four places in the selected ClaimState through the supported Box Office hold or purchase flow; no other reservations or buyers may exist. No other event sharing the map has reservations.
* Record all four admission references, original capacity and a control area.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
ClaimState: ActiveHold, IssuedTickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Select the occupied GA area and request Capacity 2, then Save. |  | The edit cannot remove any of the four occupied places. |
| Reload and reopen the area and Seating. |  | Stored physical capacity is 4 and the same four places remain occupied. |
| Open the recorded hold or orders without changing them. |  | All four places retain their original ownership and status; the control area and financial totals are unchanged. |

**Postconditions:**

* Restore the physical capacity to 10 after recording the saved result. Preserve all existing holds, orders and admission records.

### SPT-3408: Dashboard - Seating - Generate seat scores from sales counts

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3408; Next.js; not executed.

**Title:** Dashboard - Seating - Generate seat scores from sales counts

**Description:**

Generate ranks using Sales count and compare every seat with exact results from the prepared history. This checks saved scoring configuration; actual Best Available purchase choice remains a separate test.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use a map approved for score changes with one four-seat row and recorded geometry, labels, options and assignments. Have no active buyers, carts or holds on any event sharing it.
* Prepare exactly three controlled events using the same four-seat map. Through approved Box Office purchases, sell seats 1, 2, 3 on event A; seats 1, 2 on event B; and seat 1 on event C. Seat 4 is never sold. No other event using this map has seat sales. Keep these paid tickets included in sales totals, with no refunds, voids, exchanges or resale.
* Start all four seats at score 5 and wait for Saved before opening the generation dialog. A separate employee who can use Box Office prepares the required purchases.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor, sales-data, reporting, best-available

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats, then Generate beside Seat rankings. Select Sales count. |  | The selected scoring method is shown and Generate is available. |
| Select Generate and wait for completion. |  | Generation succeeds and Ranking colors is enabled. |
| Inspect each seat’s Seat score. | Expected: Seat 1 = 10; seat 2 = 7; seat 3 = 4; seat 4 = 1. | Every seat has its exact expected score; labels, geometry and assignments are unchanged. |
| Select Save, leave and reopen the map; inspect all four seats. |  | All four exact scores persist, with the original orders and tickets unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-3409: Dashboard - Seating - Generate seat scores from sales order

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3409; Next.js; not executed.

**Title:** Dashboard - Seating - Generate seat scores from sales order

**Description:**

Generate ranks using Sales order and compare every seat with exact results from the prepared history. This checks saved scoring configuration; actual Best Available purchase choice remains a separate test.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use a map approved for score changes with one four-seat row and recorded geometry, labels, options and assignments. Have no active buyers, carts or holds on any event sharing it.
* Prepare exactly three controlled events using the same four-seat map. Through approved Box Office purchases at least two minutes apart within each event, sell seats in order A: 1, 2, 3; B: 1, 3, 2; C: 2, 1, 3. Seat 4 is never sold. No other event using this map has seat sales. Keep all nine paid tickets included in sales totals, with no refunds, voids, exchanges or resale. Record each order and purchase time.
* Start all four seats at score 5 and wait for Saved before opening the generation dialog. A separate employee who can use Box Office prepares the required purchases.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor, sales-data, reporting, best-available

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats, then Generate beside Seat rankings. Select Sales order. |  | The selected scoring method is shown and Generate is available. |
| Select Generate and wait for completion. |  | Generation succeeds and Ranking colors is enabled. |
| Inspect each seat’s Seat score. | Expected: Seat 1 = 10; seat 2 = 8; seat 3 = 6; seat 4 = 1. | Every seat has its exact expected score; labels, geometry and assignments are unchanged. |
| Select Save, leave and reopen the map; inspect all four seats. |  | All four exact scores persist, with the original orders and tickets unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5599: Dashboard - Seating - Reject historical score generation without sales history

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5599 (formerly TC-399); Next.js; not executed.

**Title:** Dashboard - Seating - Reject historical score generation without sales history

**Description:**

Run a historical ranking method on a saved map that has never had a seat sold. Run Method SalesOrder for Sales order or SalesCount for Sales count.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event and map approved for editing, with no orders, holds or active carts and no other selling event sharing the map. Changes can save automatically.
* Use a saved three-seat map with recorded scores 3, 6 and 9. No event using this map has any historical or current issued seat ticket.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
Method: SalesOrder, SalesCount

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats and Generate beside Seat rankings; select the mapped Method. |  | The chosen historical method is selected. |
| Select Generate. |  | An explanation states there is no sale history; no generated-score success is reported. |
| Close the dialog, leave and reopen the seats. |  | Scores remain 3, 6 and 9; geometry, labels and assignments are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5600: Dashboard - Seating - Keep existing scores when sales history has no ranking difference

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5600 (formerly TC-400); Next.js; not executed.

**Title:** Dashboard - Seating - Keep existing scores when sales history has no ranking difference

**Description:**

Generate scores when every seat has the same sales rank. Run Method SalesCount for Sales count or SalesOrder for Sales order; the prepared history makes both unable to distinguish the seats.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use a saved three-seat map approved for score changes. Exactly one controlled event using it has sold all three seats in one order in the same recorded minute; no other event using it has any seat sales. No active buyers, holds or carts exist.
* After preparing that purchase, save scores 3, 6 and 9 on the three seats. Record order/ticket references, labels, options and geometry.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
Method: SalesCount, SalesOrder

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating → Edit map. Choose Seats and Generate beside Seat rankings; select the mapped Method. |  | The chosen historical method is selected. |
| Select Generate and inspect the result. |  | No new ranking is applied; the dialog reports that generated scores did not change any seats. |
| Close the dialog, leave and reopen the map. |  | Scores remain exactly 3, 6 and 9. Existing tickets, labels, geometry and assignments are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

## Next.js — Assign Permissions — published cases

### SPT-5554: Dashboard - Seating - Attach an existing seating map to an event

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5554; Next.js; not executed.

**Title:** Dashboard - Seating - Attach an existing seating map to an event

**Description:**

Use the Next.js search and explicit Use this map action to attach an existing organization map. Prove searching and choosing a result alone do not attach it.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* The event has no attached map. Record one existing organization map’s name, geometry and counts.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Enter a search string that matches no organization map. |  | No matching map is offered and Use this map stays disabled. |
| Search for the recorded name and select the exact result. |  | The result is selected; the event still has no attached map. |
| Change the search text so it no longer matches the selected map, then select the recorded result again. |  | Use this map is disabled while the old selection no longer matches; only the newly selected result can be used. |
| Select Use this map and wait for completion. |  | The intended map appears on this event. |
| Leave and reopen Seating and inspect the map. |  | The selected map remains attached with its original geometry/counts; no duplicate map or ticket-type assignment was created. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-757: Dashboard - Seating - Assign seats when Memberships is disabled

**Publication status:** Published to Qase on 2026-10-17; updated SPT-757; Next.js; not executed.

**Title:** Dashboard - Seating - Assign seats when Memberships is disabled

**Description:**

Assign ordinary event seats through Next.js while the organization’s Memberships module is disabled; the event workflow must work independently.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* Memberships is disabled for the organization. Record two unassigned ordinary seats, an intended event ticket type and a third unselected seat.

**Tags:** assigned-seating, edit-event, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select only the two recorded seats. |  | The event’s Ticket types appear without requiring a membership level or benefit. |
| Check the intended type and wait for saving to finish. |  | Its assigned count increases by exactly two. |
| Leave and reopen, selecting each recorded seat. |  | The type remains checked on both intended seats and the third seat is unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-3184: Dashboard - Seating - Assign a ticket type to curved-row seats

**Publication status:** Published to Qase on 2026-10-17; updated SPT-3184; Next.js; not executed.

**Title:** Dashboard - Seating - Assign a ticket type to curved-row seats

**Description:**

Assign two specifically labelled curved-row seats in Next.js and verify geometry and selection identity after reopening.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* Use a recorded curved row with two unassigned seats and one unselected control seat; record labels, shape and intended ticket type.

**Tags:** assigned-seating, dashboard, ticket-types, curved-rows, edit-event, ui-interaction

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the two intended curved-row seats. |  | The selected labels identify only those seats. |
| Check the intended type and wait for completion. |  | Assigned count increases by two. |
| Leave and reopen Seating and inspect the row. |  | The same two labels retain their assignments, the control seat is unchanged and the curve has not moved or straightened. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5601: Dashboard - Seating - Assign a second ticket type to ordinary seats

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5601 (formerly TC-343); Next.js; not executed.

**Title:** Dashboard - Seating - Assign a second ticket type to ordinary seats

**Description:**

Assign a second type to the same ordinary seats in Next.js. Run InputMethod separately so keyboard selection proves the same saved configuration as pointer selection.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* Two ordinary seats have only type A; another seat is an unselected control. Full purchase required is off. Type B belongs to the same event. Record counts and all three seats’ assignments.
* Use an event type B with a minimum purchase limit of 2; its warning must remain visible without preventing valid assignment.

**Tags:** assigned-seating, dashboard, tickets

**Priority:** High

**Parameters:**
InputMethod: Pointer, Keyboard

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the two seats using the selected InputMethod. | Pointer: click the first seat, then Shift-click the second. Keyboard: focus the map, use arrows to reach the first seat, Enter, then Shift-select the second with Enter. | Only the intended two seats are selected; A is checked and B is unchecked. Minimum purchase: 2 is shown for B. |
| Check B and wait for completion. |  | B’s assigned count increases by two and A’s count stays unchanged. |
| Leave and reopen, inspecting all three seats. |  | The intended seats retain A and B; the control seat and all labels are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5602: Dashboard - Seating - Complete a partly assigned seat selection

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5602 (formerly TC-344); Next.js; not executed.

**Title:** Dashboard - Seating - Complete a partly assigned seat selection

**Description:**

Apply a type to a mixed Next.js selection and prove only its missing seat assignment is created.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* Three ordinary seats exist; the first and third are assigned to A, the second is unassigned. Record A’s assigned count. Full purchase required is off.

**Tags:** assigned-seating, dashboard, tickets

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select only the first and second seats. |  | A shows a mixed selection state rather than all seats assigned. |
| Check A and wait for saving to finish. |  | A’s assigned count increases by one. |
| Leave and reopen, selecting all three seats separately. |  | A is assigned once to each; the third seat and geometry are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5544: Dashboard - Seating - Remove an available seat assignment

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5544; Next.js; not executed.

**Title:** Dashboard - Seating - Remove an available seat assignment

**Description:**

Remove one type from two unused Next.js seats and preserve another type and an untouched seat. Run RemainingAssignment separately.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* Two seats and a third control seat are assigned to A, with no pending, held, sold or resale claims. RemainingAssignment None uses only A; AnotherTicketType also assigns B to the first two seats. Record all counts.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
RemainingAssignment: None, AnotherTicketType

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select only the first two seats. |  | A is checked for the selection. |
| Uncheck A and wait for completion. |  | A’s assigned count decreases by two. |
| Leave and reopen all three seats. |  | A is absent from the first two and remains on the control; B and its count, when prepared, remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5545: Dashboard - Seating - Assign a ticket type to a standing area

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5545; Next.js; not executed.

**Title:** Dashboard - Seating - Assign a ticket type to a standing area

**Description:**

Add a ticket type to a GA area through the Next.js capacity input and Save general admission assignments action. A GA area admits a number of people without individual seat numbers. Run each ExistingAssignment separately.

| ExistingAssignment | Starting assignment on the target area | Assign B with Capacity | Expected after reopening |
| --- | --- | --- | --- |
| None | Neither A nor B is assigned. | 3 | B has limit 3; A remains unassigned. |
| Another ticket type | A is assigned with limit 3; B is unassigned. | 4 | A retains limit 3; B has limit 4. |

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| ExistingAssignment | AnotherTicketType | Another ticket type |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts.
* Use a standing area of map capacity 10, ticket types A and B, and another untouched area. B starts unassigned. Prepare the selected ExistingAssignment as shown in Description and record the control area’s assignments.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
ExistingAssignment: None, AnotherTicketType

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select only the intended area. |  | B is unchecked; A matches the selected starting assignment. |
| Check B and enter the mapped Capacity. | None: 3; Another ticket type: 4 | B has the intended draft limit; no successful-save status is reported yet. |
| Select Save general admission assignments. |  | General admission assignments saved appears. |
| Leave and reopen both areas. |  | The exact assignments and independent limits from Description persist; map capacity stays 10 and the control area is unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5546: Dashboard - Seating - Update a standing-area permission limit

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5546; Next.js; not executed.

**Title:** Dashboard - Seating - Update a standing-area permission limit

**Description:**

Save minimum, ordinary and exact-area-capacity limits in Next.js without changing another type or event. Run Limit separately.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| Limit | One | 1 |
| Limit | Five | 5 |
| Limit | Ten | 10 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* One GA area has physical capacity 10 and type A limit 3. A second independent event uses this map with its own recorded type/limit. There are no claims on either event.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
Limit: One, Five, Ten

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the area. |  | A’s saved capacity is 3. |
| Set Capacity for the area to Limit and select Save general admission assignments. |  | The successful-save status appears. |
| Leave and reopen the area and the second event. |  | The first event retains Limit; physical capacity stays 10 and the second event’s assignment/limit is unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5547: Dashboard - Seating - Reject a standing-area limit above its capacity

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5547; Next.js; not executed.

**Title:** Dashboard - Seating - Reject a standing-area limit above its capacity

**Description:**

Enter an invalid Next.js GA capacity and leave the field. Verify invalid input cannot replace the saved limit or make the area oversellable. AboveCapacity retains the original above-capacity regression; other runs cover this input’s missing and numeric boundaries.

| InvalidCapacity | Attempted input |
| --- | --- |
| AboveCapacity | 11 |
| Zero | 0 |
| Negative | -1 |
| Decimal | 1.5 |
| Blank | Clear the field |
| Text | Paste abc |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* A standing area of capacity 10 is assigned to A at saved limit 3, with no claims. Record another area’s assignment.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
InvalidCapacity: AboveCapacity, Zero, Negative, Decimal, Blank, Text

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the area. |  | A shows capacity limit 3. |
| Attempt the selected InvalidCapacity and move focus away. |  | The invalid input is prevented or returns to the last valid value 3; no draft limit above 10 or below 1 is accepted. |
| Leave and reopen both areas without saving another valid edit. |  | The saved limit remains 3; physical capacity and the control area are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5603: Dashboard - Seating - Leave a standing-area edit without saving it

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5603 (formerly TC-350); Next.js; not executed.

**Title:** Dashboard - Seating - Leave a standing-area edit without saving it

**Description:**

Accept the Next.js unsaved-GA warning when leaving a capacity edit and prove the saved value is retained.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* A GA area of capacity 10 has A at saved limit 3. Record an untouched area’s assignment.

**Tags:** assigned-seating, dashboard, tickets

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the area and change its capacity limit to 5 without saving. |  | The edit is pending. |
| Choose Overview and accept Leave without saving in the confirmation. |  | Navigation completes after the warning. |
| Return through Manage → Seating and inspect both areas. |  | The original limit 3 and control assignment remain; no draft 5 was saved. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5604: Dashboard - Seating - Keep seat assignments separate for events sharing a map

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5604 (formerly TC-345); Next.js; not executed.

**Title:** Dashboard - Seating - Keep seat assignments separate for events sharing a map

**Description:**

Assign seats on one event through Next.js and prove an independent event using the same layout retains its own permissions.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* Two independent, unlinked events share a map. Two ordinary seat labels are unassigned on the first and assigned to a recorded type on the second. Record both events and assignments.

**Tags:** assigned-seating, dashboard, tickets

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the two seats on the first event and check its intended type. |  | The first event saves two new assignments. |
| Leave and reopen the first event. |  | The same labels retain those assignments. |
| Open the second event’s Manage → Seating and inspect the same labels. |  | Its recorded assignments remain unchanged; sharing geometry has not shared sale permissions. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5552: Dashboard - Seating - Save a shared map display setting

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5552; Next.js; not executed.

**Title:** Dashboard - Seating - Save a shared map display setting

**Description:**

Save a map-owned Next.js purchase setting and verify its scope across two events. Settings under Map display are separate temporary view controls.

| Setting | Purchase settings control |
| --- | --- |
| AdvancedColors | Advanced seat colors |
| AlwaysShow | Always show seats and areas to customers |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* The employee also has Manage Venue Layouts or Manage Organization Info. Use two independent events on the same map with fewer than 4,500 seats. Record both events’ purchase settings and assignment counts.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
Setting: AdvancedColors, AlwaysShow

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Under Purchase settings, change the selected Setting to the opposite value. |  | Its save completes. |
| Leave and reopen both events. |  | The map setting has the changed value on both; event-specific Prevent isolated seats and assignments are unchanged. |
| Restore the original setting and reopen both events. |  | Both retain the original setting again. |

**Postconditions:**

* Retain the verified original settings and assignments.

### SPT-5553: Dashboard - Seating - Save the event-specific no-isolated-seats setting

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5553; Next.js; not executed.

**Title:** Dashboard - Seating - Save the event-specific no-isolated-seats setting

**Description:**

Save Prevent isolated seats in Next.js Purchase settings for one event without altering another event on the same map.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* Two independent events share one map. Record both Prevent isolated seats values and assignment counts.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Toggle Prevent isolated seats under Purchase settings. |  | The event update completes. |
| Leave and reopen both events. |  | Only the first event retains the changed setting; map-owned settings and assignments are unchanged. |
| Restore the first event’s original value and reopen. |  | Its original value is saved again. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5555: Dashboard - Seating - Prevent detaching a map with assignments

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5555; Next.js; not executed.

**Title:** Dashboard - Seating - Prevent detaching a map with assignments

**Description:**

On Next.js, inspect Map actions when the event still has seat or GA assignments. Run AssignmentKind separately.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* The event has at least one recorded assignment of the selected AssignmentKind. Record the map name and assigned counts.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
AssignmentKind: Seat, GeneralAdmission

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Open Map actions. |  | Remove map from event is disabled and its explanation requires removal of seat and GA assignments first. |
| Leave and reopen the page. |  | The original map and assignments remain attached. |

**Postconditions:**

* Do not remove assignments to enable the detach action.

### SPT-5605: Dashboard - Seating - Detach a map that has no assignments

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5605 (formerly TC-349); Next.js; not executed.

**Title:** Dashboard - Seating - Detach a map that has no assignments

**Description:**

Confirm removal of a map from one Next.js event and prove the reusable map and another event’s connection remain intact.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* The employee also has Manage Venue Layouts. Two independent events share one map, both with no assignments and neither in a membership ticket batch. Record the map name and counts.

**Tags:** assigned-seating, dashboard, tickets

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Open Map actions → Remove map from event. |  | Remove seating map? explains that the map itself will not be deleted. |
| Select Remove map and wait for completion. |  | Choose a seating map and Create map replace the assignment view. |
| Leave and reopen the first event. |  | No map is attached. |
| Open the second event’s Seating → Edit map. |  | The shared map remains attached with the original name, geometry and counts. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5556: Dashboard - Seating - Remove an unused standing-area assignment

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5556; Next.js; not executed.

**Title:** Dashboard - Seating - Remove an unused standing-area assignment

**Description:**

Remove A from a Next.js GA area while preserving another type, control area and physical capacity.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map, no active buyers and no orders, holds or carts except the controlled records explicitly required below.
* A GA area has A with no pending, held, sold or resale claims. RemainingAssignment None uses A only; AnotherTicketType also uses B at a recorded limit. Record physical capacity and a second assigned area.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
RemainingAssignment: None, AnotherTicketType

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the area and uncheck A. |  | A is removed from the draft for that area. |
| Select Save general admission assignments. |  | The successful-save status appears. |
| Leave and reopen both areas. |  | A is absent only from the intended area; B and its limit when prepared, physical capacity and the control area are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5606: Dashboard - Seating - Save a ticket-type assignment color

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5606 (formerly TC-371); Next.js; not executed.

**Title:** Dashboard - Seating - Save a ticket-type assignment color

**Description:**

Save a type’s color through each Next.js color-control entry while preserving assignment counts and other types. Run ColorEntry separately.

| ColorEntry | Entry / input |
| --- | --- |
| SeatPreset | Select an assigned seat; choose a different recorded preset |
| SeatHex | Select an assigned seat; Custom color #123456 |
| AreaHex | Select an assigned area; Custom color #123456 |
| ListPreset | Clear selection, turn Show ticket type list on; choose a different recorded preset |
| ListHex | Clear selection, turn Show ticket type list on; Custom color #123456 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* One event type is assigned to seats and a GA area; another type is an unchanged color/count control. Record colors, all assignment counts and purchase settings.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:**
ColorEntry: SeatPreset, SeatHex, AreaHex, ListPreset, ListHex

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Follow ColorEntry and open Change color for the intended type. |  | The original color is shown. |
| Choose the mapped color and select Apply. |  | The type’s map/legend preview updates and saving completes. |
| Leave and reopen the page and color control. |  | The exact color persists for the intended type; control color, counts, capacities and purchase settings remain unchanged. |

**Postconditions:**

* Restore the original ticket-type color and reopen to verify it.

### SPT-5607: Dashboard - Seating - Reject an invalid ticket-type color

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5607 (formerly TC-372); Next.js; not executed.

**Title:** Dashboard - Seating - Reject an invalid ticket-type color

**Description:**

Attempt an invalid Next.js Custom color and prove it cannot replace the saved color or assignment configuration.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* Record one assigned type’s original color and assignment counts.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select a seat assigned to that type and open its color control. |  | The saved color is shown. |
| Enter Custom color #12GG34 and select Apply. |  | Enter a valid six-digit hex color appears; no invalid color is saved. |
| Cancel, leave and reopen the color control. |  | The original color, seat/GA assignments and counts remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5608: Dashboard - Seating - Cancel a ticket-type color change

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5608 (formerly TC-373); Next.js; not executed.

**Title:** Dashboard - Seating - Cancel a ticket-type color change

**Description:**

Preview a Next.js ticket-type color and cancel or dismiss the control before Apply. Prove the preview is removed and no save occurred.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| CloseMethod | OutsideClick | Outside click |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* Record an assigned type’s saved color and counts; choose a different valid color.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:**
CloseMethod: Cancel, OutsideClick

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Open the type’s color control and select the different color. |  | The map can preview the draft without replacing the saved value. |
| Close using CloseMethod without Apply. | Cancel or click outside the popover | The original color is restored. |
| Leave and reopen. |  | The original color and all assignment counts persist. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5609: Dashboard - Seating - Save different limits for selected general admission areas

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5609 (formerly TC-374); Next.js; not executed.

**Title:** Dashboard - Seating - Save different limits for selected general admission areas

**Description:**

Edit two selected Next.js areas together and prove each keeps its own limit while the complete save preserves unselected areas.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* One type A is assigned to three GA areas: G1 capacity 10/limit 2, G2 capacity 20/limit 3, G3 capacity 10/limit 5. Record another type’s assignments.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select G1 and Shift-select G2. |  | Only those two areas are selected and each has its own Capacity for name input. |
| Set G1’s A limit to 4 and G2’s to 7; select Save general admission assignments. |  | The save completes. |
| Leave and reopen all three areas. |  | G1 retains 4, G2 retains 7 and G3 retains 5; physical capacities and the other type’s permissions are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5610: Dashboard - Seating - Keep a general admission draft when cancelling navigation

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5610 (formerly TC-375); Next.js; not executed.

**Title:** Dashboard - Seating - Keep a general admission draft when cancelling navigation

**Description:**

Cancel the Next.js unsaved-GA warning and prove the draft stays editable on the same event, then save it successfully.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* A GA area of capacity 10 has A at saved limit 3; record a second area as a control.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the area, set A’s capacity to 5 without saving, then choose Overview. |  | The unsaved-GA warning appears. |
| Cancel leaving. |  | The same event and draft capacity 5 remain. |
| Select Save general admission assignments; leave and reopen. |  | Capacity 5 now persists; the control area and physical capacity are unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5611: Dashboard - Seating - Keep map-view controls separate from saved purchase settings

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5611 (formerly TC-376); Next.js; not executed.

**Title:** Dashboard - Seating - Keep map-view controls separate from saved purchase settings

**Description:**

Use Next.js Map display controls and prove reviewing the map does not change customer settings, assignments or sold admission.

Use these choices for the selected run:

| Parameter | Run value | Visible choice or input |
| --- | --- | --- |
| ViewControl | ShowAllSeats | Show all seats |
| ViewControl | ShowSoldSeats | Show sold seats |
| ViewControl | ShowTicketTypeList | Show ticket type list |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* Use a map with fewer than 4,500 seats, one controlled issued seat ticket and another available assigned seat. Record ownership, assignment counts and all Purchase settings.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:**
ViewControl: ShowAllSeats, ShowSoldSeats, ShowTicketTypeList

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Change the selected ViewControl to the opposite value. | Show all seats; Show sold seats; or Show ticket type list | The view changes in the way described by the control’s help text. |
| Inspect the issued seat and ticket-type assignments, then leave and reopen. |  | The sold ticket still belongs to its original customer; counts and all Purchase settings remain recorded values. |

**Postconditions:**

* Retain the original paid order and assignments; do not release the sold seat as cleanup.

### SPT-5612: Dashboard - Seating - Cancel removal of a seating map

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5612 (formerly TC-377); Next.js; not executed.

**Title:** Dashboard - Seating - Cancel removal of a seating map

**Description:**

Open Next.js removal confirmation and cancel, proving the map stays attached.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* Use an attached map with no assignments and no membership ticket batch. Record its name and counts.

**Tags:** assigned-seating, dashboard

**Priority:** Medium

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Open Map actions → Remove map from event. |  | Remove seating map? explains the map itself will not be deleted. |
| Select Cancel. |  | The map remains attached. |
| Leave and reopen Seating. |  | The same map and saved contents remain. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5613: Dashboard - Seating - Restrict map editing while allowing event assignments

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5613 (formerly TC-378); Next.js; not executed.

**Title:** Dashboard - Seating - Restrict map editing while allowing event assignments

**Description:**

Verify a Next.js employee with Manage Events but no layout-management capability can assign an existing seat without editing map geometry or map-owned purchase settings.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers, orders, holds or carts except the controlled records named below.
* An administrator has prepared a restricted employee with Manage Events and without Manage Venue Layouts or Manage Organization Info. The account does not have all-permissions access.
* Use an independent event with an attached map, one unassigned ordinary seat and a recorded type. Record original map settings.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. |  | Edit map is absent; map-owned Advanced seat colors/Always show seats controls are disabled. Event-specific Prevent isolated seats follows event permission. |
| Select the unassigned seat and check its type. |  | The event assignment saves. |
| Leave and reopen. |  | The seat assignment persists while geometry and map-owned settings remain unchanged. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-5614: Dashboard - Seating - Block seating configuration on the Basic pricing tier

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5614 (formerly TC-379); Next.js; not executed.

**Title:** Dashboard - Seating - Block seating configuration on the Basic pricing tier

**Description:**

Verify the Next.js Seating gate prevents editing or assignment on Basic without changing saved maps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* Use a controlled organization already on Basic and an employee with Manage Events; do not change a live organization’s pricing tier for this case. Record an existing event’s seating configuration with an authorized administrator.

**Tags:** assigned-seating, dashboard, edge-case

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. |  | An unavailable-feature screen replaces the seating editor/assigner. |
| Reload the page, then have the authorized administrator inspect the event’s saved configuration. |  | No map, assignment, capacity or purchase setting changed. |

**Postconditions:**

* Retain the recorded map and assignments for review; do not delete customer, order or financial records.

### SPT-2988: Dashboard - Seating - Protect a seat with an active resale listing

**Publication status:** Published to Qase on 2026-10-17; updated SPT-2988; Next.js; not executed.

**Title:** Dashboard - Seating - Protect a seat with an active resale listing

**Description:**

Use the Next.js event Seating page. Prevent removing the original ticket-type assignment from a seat whose ticket is listed for resale.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* SelectionScope Single selects only the protected seat; Mixed selects it together with one available seat assigned to the same ticket type. Prepare that extra available seat and record the ticket type’s initial assigned count.

* Use the Next.js Seating page in an organization on a pricing tier other than Basic.
* The employee has Manage Events permission.
* Use an event approved for changing assignments, with an attached map and no orders, holds or active carts except the specific protected records required by this case. Do not change a shared selling event.
* Use an approved event with a controlled paid ticket on one recorded seat and an active resale listing for that ticket. Record the ticket type, seat label, listing and order. Do not use an unrelated customer’s ticket.

**Tags:** web, dashboard, map-editor, seat-editor, assigned-seating, resale, validation, events

**Priority:** High

**Parameters:**
SelectionScope: Single, Mixed

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the seat or seats for SelectionScope. |  | The original ticket type is shown as assigned. |
| Attempt to uncheck that ticket type. |  | Removal is rejected with Cannot remove tickets from seats with resale submissions. |
| Leave and reopen the assignment and its transaction/listing records. |  | The assignment, active resale listing and original ticket remain unchanged; no payment or refund was triggered. |

**Postconditions:**

* The ticket type’s assigned count is unchanged; in Mixed, the available seat remains assigned too.
* Keep the controlled order and listing intact for review; do not cancel resale as cleanup.

### SPT-5548: Dashboard - Seating - Protect an occupied standing-area assignment

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5548; Next.js; not executed.

**Title:** Dashboard - Seating - Protect an occupied standing-area assignment

**Description:**

Use the Next.js event Seating page. Prevent removing a standing-area permission while it backs a hold or issued ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* Use the Next.js Seating page in an organization on a pricing tier other than Basic.
* The employee has Manage Events permission.
* Use an event approved for changing assignments, with an attached map and no orders, holds or active carts except the specific protected records required by this case. Do not change a shared selling event.
* Use an approved GA area assigned to one ticket type. For BlockingState Held, create a controlled active hold containing that area; for Sold, use a controlled issued ticket for it. Record the quantity, order/hold and assignment.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
BlockingState: Held, Sold

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Then select the recorded area. |  | The original ticket type is assigned. |
| Uncheck that ticket type and select Save general admission assignments. |  | Removal is rejected because the permission backs held or issued admission. |
| Reopen the assignment and original order or hold. |  | The permission, held/sold quantity and original admission remain unchanged. |

**Postconditions:**

* Retain the controlled order/hold and assignment. Do not release real inventory or delete financial history as cleanup.

### SPT-5549: Dashboard - Seating - Protect an occupied seat assignment

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5549; Next.js; not executed.

**Title:** Dashboard - Seating - Protect an occupied seat assignment

**Description:**

Use the Next.js event Seating page. Reject unassigning a seat that belongs to a pending basket, an active hold or an issued ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* SelectionScope Single selects only the protected seat; Mixed selects it together with one available seat assigned to the same ticket type. Prepare that extra available seat and record the ticket type’s initial assigned count.

* Use the Next.js Seating page in an organization on a pricing tier other than Basic.
* The employee has Manage Events permission.
* Use an event approved for changing assignments, with an attached map and no orders, holds or active carts except the specific protected records required by this case. Do not change a shared selling event.
* Use a recorded seat assigned to one ticket type on an approved event. Prepare the selected BlockingState with a controlled customer. Record its basket/hold/order and seat label.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:**
BlockingState: PendingBasket, ActiveHold, IssuedTicket

SelectionScope: Single, Mixed

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the seat or seats for SelectionScope. |  | The original ticket type is checked. |
| Attempt to uncheck it. |  | Removal is rejected and an explanation is displayed; no success toast confirms the rejected removal. |
| Leave and reopen the assignment and its basket, hold or order. |  | The permission and original seat ownership remain intact; no charge, refund or extra ticket is created. |

**Postconditions:**

* The ticket type’s assigned count is unchanged; in Mixed, the available seat remains assigned too.
* Preserve the protected basket/hold/order for review; no customer money is moved.

### SPT-5550: Dashboard - Seating - Assign a ticket type to a full-purchase table

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5550; Next.js; not executed.

**Title:** Dashboard - Seating - Assign a ticket type to a full-purchase table

**Description:**

Assign one ticket type to a saved table with Full purchase required on. Prove all four seats are assigned together and the assignment remains after reopening.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use an unassigned four-seat table with Full purchase required on. Ticket type A has maximum purchase limit 4. Record its assigned count, the four seat labels and an untouched ordinary control seat.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Click one seat at the table. |  | All four table seats are selected together; the control seat is not selected. |
| Check ticket type A and wait for saving to finish. |  | A is assigned to the complete table and its assigned count increases by exactly four. |
| Leave and reopen Seating; inspect each of the four seats and the control. |  | All four retain A, the full-purchase setting is unchanged, and the control seat remains unassigned. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5551: Dashboard - Seating - Propagate a parent ticket-type seat assignment

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5551; Next.js; not executed.

**Title:** Dashboard - Seating - Propagate a parent ticket-type seat assignment

**Description:**

Use the Next.js event Seating page. Assign seats to a recurring parent ticket type and verify the same assignment reaches its existing child ticket types.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* Use the Next.js Seating page in an organization on a pricing tier other than Basic.
* The employee has Manage Events permission.
* Use an event approved for changing assignments, with an attached map and no orders, holds or active carts except the specific protected records required by this case. Do not change a shared selling event.
* Use an approved recurring parent event with two existing occurrences whose ticket types are direct children of the selected parent ticket type, all on the same map. Record one unassigned seat and another untouched seat. No occurrence has orders or active reservations.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the parent event from Dashboard → Build → Events → All events → Manage → Seating and select the recorded unassigned seat. |  | The parent ticket type is available. |
| Check the parent ticket type and wait for successful saving. |  | The parent assignment is saved. |
| Reopen the parent and each recorded occurrence’s Seating. |  | The corresponding parent/child ticket type is assigned to the same seat on all three screens; the untouched seat remains unchanged. |

**Postconditions:**

* Retain the map and recorded values on the approved event for review. No customer order or financial history is deleted.

### SPT-5557: Dashboard - Seating - Keep mixed full-table and ordinary-seat selection safe

**Publication status:** Published to Qase on 2026-10-17; updated SPT-5557; Next.js; not executed.

**Title:** Dashboard - Seating - Keep mixed full-table and ordinary-seat selection safe

**Description:**

Use the Next.js event Seating page. Verify that a selection containing both ordinary and full-purchase table seats keeps only the ordinary seats before an assignment is applied.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* Use the Next.js Seating page in an organization on a pricing tier other than Basic.
* The employee has Manage Events permission.
* Use an event approved for changing assignments, with an attached map and no orders, holds or active carts except the specific protected records required by this case. Do not change a shared selling event.
* Use one unassigned four-seat table requiring full purchase and an unassigned ordinary row in the same approved map. Record both sets of labels.

**Tags:** assigned-seating, dashboard, permissions

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Then use Shift-drag to include a table seat and an ordinary row seat. |  | The full-purchase table seats are removed from the mixed selection; only ordinary seats remain selected. |
| Check the intended ticket type and reopen the assignments. |  | Only the remaining selected ordinary seats receive the permission; no partial or unintended table assignment is saved. |

**Postconditions:**

* Retain the map and recorded values on the approved event for review. No customer order or financial history is deleted.

### SPT-5615: Dashboard - Seating - Remove an unused recurring-parent seat assignment

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5615 (formerly TC-347); Next.js; not executed.

**Title:** Dashboard - Seating - Remove an unused recurring-parent seat assignment

**Description:**

Remove a parent ticket-type seat assignment and verify its corresponding assignments disappear from existing occurrences. An occurrence is one scheduled event date belonging to the recurring parent.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* Use the Next.js Seating page in an organization on a pricing tier other than Basic.
* The employee has Manage Events permission.
* Use events approved for changing assignments, with no orders, holds or active carts except the controlled records named in this case. Do not change a selling event.
* Use a recurring parent and two existing occurrences on the same map. The selected parent ticket type has a corresponding child ticket type on each occurrence.
* Record one seat assigned to these parent and child types and a second control seat with the same assignments. Neither seat has a basket, hold, issued ticket, membership claim or resale listing on any of these events.

**Tags:** assigned-seating, dashboard, tickets

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the recurring parent, then Manage → Seating and select only the first recorded seat. |  | The parent ticket type is checked. |
| Uncheck that ticket type and wait for saving to finish. |  | The selected parent assignment is removed. |
| Reopen Seating for the parent and each recorded occurrence. |  | The selected assignment is absent on all three events; the control seat’s corresponding assignments remain. |

**Postconditions:**

* Retain the resulting parent and occurrence assignments for review; no geometry or financial history is deleted.

### SPT-5616: Dashboard - Seating - Protect a recurring-parent assignment used by an occurrence

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5616 (formerly TC-348); Next.js; not executed.

**Title:** Dashboard - Seating - Protect a recurring-parent assignment used by an occurrence

**Description:**

Attempt to remove an unused parent assignment when a corresponding seat on one occurrence is held or sold. Verify the rejection preserves the parent, every occurrence and the controlled hold or ticket. Run each ChildState separately.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* Use the Next.js Seating page in an organization on a pricing tier other than Basic.
* The employee has Manage Events permission.
* Use events approved for changing assignments, with no orders, holds or active carts except the controlled records named in this case. Do not change a selling event.
* Use a recurring parent and two existing occurrences on one map, with corresponding parent and child ticket types assigned to the same recorded seat. The parent itself has no seat sale or hold.
* For ChildState ActiveHold, use a controlled active Box Office hold for that seat on the first occurrence. For IssuedTicket, use a controlled issued ticket on that occurrence. Record its hold or order, customer and seat label; keep the second occurrence unused.

**Tags:** assigned-seating, dashboard, tickets

**Priority:** High

**Parameters:**
ChildState: ActiveHold, IssuedTicket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the recurring parent, then Manage → Seating and select the recorded seat. |  | The parent ticket type is checked. |
| Attempt to uncheck the parent ticket type. |  | An error explains that the assignment cannot be removed while the related seat is held or sold. |
| Leave and reopen Seating for the parent and both occurrences. |  | All original parent and child assignments remain. |
| Open the first occurrence’s recorded hold or transaction. |  | The original customer, seat and held or issued admission remain unchanged. |

**Postconditions:**

* Preserve the controlled hold or order and all assignments for review. Do not release the hold, refund the ticket or remove child assignments to bypass the guard.

### SPT-5617: Dashboard - Seating - Reach seating through the supported Dashboard navigation

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5617 (formerly TC-380); Next.js; not executed.

**Title:** Dashboard - Seating - Reach seating through the supported Dashboard navigation

**Description:**

Start where the organizer actually lands after sign-in and reach the migrated Seating workflow through visible navigation. Prove both assignment and map editing remain discoverable on the same organization/event.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions in an organization on a pricing tier other than Basic.
* Use an event/map approved for changes with no orders, holds, active carts or selling event sharing the map; changes can save automatically.
* Use an existing event with an attached map. Record organization, event and map names. Use the migration’s actual landing page; do not start from a copied Seating URL.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in, choose the recorded organization, and use its visible Events or Manage Events navigation. |  | The organization’s events are reachable from the actual landing page. |
| Choose the recorded event and follow Manage → Seating. |  | The Next.js Seating page shows the intended event/map and its saved assignments. |
| Choose Edit map, then use the editor’s back control. |  | The intended editor opens and returns to the same event’s assignment page; no direct URL was needed. |

**Postconditions:**

* Retain the original map and assignments; do not delete customer, order or financial records.

### SPT-5618: Dashboard - Seating - Clear selected seats before assigning another seat

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5618 (formerly TC-383); Next.js; not executed.

**Title:** Dashboard - Seating - Clear selected seats before assigning another seat

**Description:**

Clear a Next.js seat selection, then assign one different seat. Prove the old selection cannot receive an unintended assignment.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an approved event with an attached map, no orders/holds/active carts and no active buyers.
* Use three unassigned ordinary seats on one row and a type A. Record their labels and A’s assigned count.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select the first two seats. |  | Exactly the first two seats are selected. |
| Select Clear selected seats, then select only the third seat. |  | The selection was cleared; only the third label is now selected. |
| Check A and wait for saving to finish. |  | A’s assigned count increases by one. |
| Leave and reopen all three seats. |  | Only the third seat has A; both formerly selected seats remain unassigned. |

**Postconditions:**

* Retain the resulting assignments for review; do not delete customer, order or financial records.

### SPT-5619: Dashboard - Seating - Clear selected areas before assigning another area

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5619 (formerly TC-384); Next.js; not executed.

**Title:** Dashboard - Seating - Clear selected areas before assigning another area

**Description:**

Clear a Next.js GA selection and assign a different area. Prove the first area is not changed by a stale selection.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an approved event with an attached map, no orders/holds/active carts and no active buyers.
* Use two unassigned GA areas G1 and G2, capacity 10 each, and an event type A.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select G1 and choose Clear selected areas. |  | No area remains selected. |
| Select G2, check A, set Capacity for G2 to 3 and select Save general admission assignments. |  | The save completes for G2. |
| Leave and reopen both areas. |  | Only G2 has A at limit 3; G1 stays unassigned and both physical capacities remain 10. |

**Postconditions:**

* Retain the resulting assignments for review; do not delete customer, order or financial records.

### SPT-5620: Dashboard - Seating - Show the correct combined assignment count

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5620 (formerly TC-385); Next.js; not executed.

**Title:** Dashboard - Seating - Show the correct combined assignment count

**Description:**

Compare independent counts for numbered seats and GA limits across the Next.js ticket-type list and selection panels. A GA limit contributes capacity; it is not counted as one numbered seat.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an approved event with an attached map, no orders/holds/active carts and no active buyers.
* Type A has inventory 20, exactly two assigned numbered seats and one GA permission with limit 3. Type B has inventory 10, one assigned numbered seat and a GA permission with limit 2. No other assignments exist for these types.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Clear any selection and turn Show ticket type list on. |  | A shows 5 assigned out of 20; B shows 3 out of 10. |
| Select an A seat, then clear it and select the GA area. |  | Both selection panels retain the same correct type totals; they do not show only the selected item’s count. |
| Leave and reopen. |  | The combined totals and all original seat/GA assignments remain unchanged. |

**Postconditions:**

* Retain the resulting assignments for review; do not delete customer, order or financial records.

### SPT-5621: Dashboard - Seating - Open a map with no ticket types

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5621 (formerly TC-386); Next.js; not executed.

**Title:** Dashboard - Seating - Open a map with no ticket types

**Description:**

Select a seat and an area on a Next.js event that has no ticket types. Prove the empty state cannot create phantom assignments or hide the existing geometry.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an approved event with an attached map, no orders/holds/active carts and no active buyers.
* Use an event with no ticket types and an attached saved map containing one row and one GA area. Record map names/counts.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select a numbered seat, then select the GA area. |  | The no-ticket-types message is shown and no assignment checkbox or capacity for an invented type appears. |
| Clear the selection and reopen the page. |  | The saved geometry/counts remain; no permission or ticket type was created. |

**Postconditions:**

* Retain the resulting assignments for review; do not delete customer, order or financial records.

### SPT-5622: Dashboard - Seating - Roll back all area changes when one removal is protected

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5622 (formerly TC-392); Next.js; not executed.

**Title:** Dashboard - Seating - Roll back all area changes when one removal is protected

**Description:**

Combine a valid GA limit edit with removal of another GA assignment that backs an active hold. Prove the refused save commits neither change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use GA1 and GA2, each with physical capacity 10. Ticket type A has saved limits 3 on GA1 and 4 on GA2; GA2 backs exactly one controlled active Box Office hold. Record that hold, assigned counts and an untouched GA3 assignment.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Select GA1 and change A’s draft Capacity from 3 to 5 without saving. |  | GA1 has a pending limit of 5. |
| Select GA2 and uncheck A, then select Save general admission assignments. |  | The save is refused because GA2 backs held admission; no successful-save status confirms these changes. |
| Reload and reopen GA1, GA2 and GA3. |  | GA1 still has saved limit 3; GA2 still has A at limit 4; the hold, assigned count and GA3 remain unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5623: Dashboard - Seating - Propagate a parent standing-area assignment

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5623 (formerly TC-393); Next.js; not executed.

**Title:** Dashboard - Seating - Propagate a parent standing-area assignment

**Description:**

Assign a GA area on a recurring parent and prove both existing occurrences receive their corresponding ticket type and the same limit. A recurring parent controls a set of dated event occurrences.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use a recurring parent event with two existing occurrences, the same attached map and corresponding parent/child ticket type A. Use GA1 of physical capacity 10 and an untouched GA2 control. Record names and current assignments on all three events.
* A is initially unassigned to GA1 on the parent and both occurrences. No orders, holds or carts exist on these events.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating on the parent. Select GA1, check A and set Capacity 3. |  | The parent has a draft assignment at limit 3. |
| Select Save general admission assignments. |  | The parent assignment saves. |
| Reopen Seating on the parent and each recorded occurrence; select GA1 and GA2. |  | A and the corresponding child types each have GA1 limit 3. Physical capacity remains 10 and GA2 is unchanged everywhere. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5624: Dashboard - Seating - Propagate a parent standing-area limit change

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5624 (formerly TC-394); Next.js; not executed.

**Title:** Dashboard - Seating - Propagate a parent standing-area limit change

**Description:**

Change a recurring parent’s existing GA assignment limit and prove both existing occurrences receive the changed limit without new assignments.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use a recurring parent event with two existing occurrences, the same attached map and corresponding parent/child ticket type A. Use GA1 of physical capacity 10 and an untouched GA2 control. Record names and current assignments on all three events.
* A is assigned to GA1 at limit 3 on the parent and both occurrences. Have no orders, holds or carts. Record each assigned count.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating on the parent. Select GA1 and change A’s Capacity from 3 to 5. |  | The existing assignment has a draft limit of 5. |
| Select Save general admission assignments. |  | The parent limit saves. |
| Reopen all three Seating pages and inspect GA1 and GA2. |  | Each corresponding A assignment retains limit 5; each assigned count increases by exactly two, physical capacity stays 10 and GA2 is unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5625: Dashboard - Seating - Remove an unused recurring-parent area assignment

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5625 (formerly TC-395); Next.js; not executed.

**Title:** Dashboard - Seating - Remove an unused recurring-parent area assignment

**Description:**

Remove an unused GA assignment from a recurring parent and prove corresponding existing occurrence assignments are removed together.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use a recurring parent event with two existing occurrences, the same attached map and corresponding parent/child ticket type A. Use GA1 of physical capacity 10 and an untouched GA2 control. Record names and current assignments on all three events.
* A has GA1 limit 3 on all three events, with no issued tickets, holds, carts, waitlist requests, resale or membership claims against those assignments. Record assigned counts.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating on the parent. Select GA1 and uncheck A. |  | The intended parent assignment is removed from the draft. |
| Select Save general admission assignments. |  | The removal saves. |
| Reopen all three Seating pages. |  | A is absent from GA1 everywhere and each count decreases by three; GA1 geometry/capacity and GA2 assignments are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5626: Dashboard - Seating - Protect a parent area assignment used by an occurrence

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5626 (formerly TC-396); Next.js; not executed.

**Title:** Dashboard - Seating - Protect a parent area assignment used by an occurrence

**Description:**

Attempt to remove a parent GA assignment whose corresponding occurrence assignment backs occupied admission. Run ChildState ActiveHold with one active Box Office hold place, or IssuedTicket with one issued GA ticket, on the first occurrence.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use a recurring parent event with two existing occurrences, the same attached map and corresponding parent/child ticket type A. Use GA1 of physical capacity 10 and an untouched GA2 control. Record names and current assignments on all three events.
* A has GA1 limit 3 on the parent and both occurrences. Prepare one occupied GA1 admission on the first occurrence for the selected ChildState, record its reference, and leave the other occurrence unused.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:**
ChildState: ActiveHold, IssuedTicket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating on the parent. Select GA1, uncheck A and select Save general admission assignments. |  | Removal is refused because an occurrence uses the assignment. |
| Reload and reopen the parent and both occurrences. |  | All three corresponding GA1 assignments remain at limit 3; GA2 and all assigned counts are unchanged. |
| Open the recorded hold or ticket without changing it. |  | Its event, area, quantity, ownership and status are unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5627: Dashboard - Seating - Hide shared map editing on a recurring occurrence

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5627 (formerly TC-397); Next.js; not executed.

**Title:** Dashboard - Seating - Hide shared map editing on a recurring occurrence

**Description:**

Open an occurrence with full employee layout permission and prove it does not offer actions that would edit or detach its parent’s shared map.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* The employee also has Manage Venue Layouts. Use a recurring parent with one existing occurrence and an attached map; record the parent and occurrence map names.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating on the occurrence. |  | The correct occurrence and inherited map are shown. |
| Inspect the Seating map actions and shared map Purchase settings. |  | Edit map and Map actions are absent; shared Advanced seat colors and Always show seats and locations controls cannot be changed from the occurrence. |
| Open the parent’s Seating page without changing anything. |  | The original map is still attached to both and the recorded settings are unchanged. |

**Postconditions:**

* No event, map, assignment or purchase setting was changed.

### SPT-5628: Dashboard - Seating - Prevent removing a map used by a membership event batch

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5628 (formerly TC-398); Next.js; not executed.

**Title:** Dashboard - Seating - Prevent removing a map used by a membership event batch

**Description:**

Attempt to detach a map from an event included in a membership event batch—a group of events connected to a membership benefit. Prove the backend restriction preserves the map even when ordinary seat and GA assignments are empty.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an approved event with an attached map and no seat or GA ticket-type assignments, buyers, orders, holds or carts.
* An administrator uses Admin → Membership event batches, searches by organization/membership group and identifies an existing batch whose Events include this event. Record the batch, map and another event as a control; do not change the batch.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Open Map actions and choose Remove map from event. |  | The confirmation identifies removal from the event, rather than deletion of the map itself. |
| Confirm Remove map. |  | Removal is refused with the membership-event-batch explanation. |
| Reload and reopen Seating. |  | The same map remains attached, the batch still contains the event and the control event is unchanged. |

**Postconditions:**

* Retain the map and recorded assignments for review. Preserve all existing customer, hold, order and financial records.

### SPT-5629: Dashboard - Seating - Reject a ticket type below the full-table purchase limit

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5629 (formerly TC-405); Next.js; not executed.

**Title:** Dashboard - Seating - Reject a ticket type below the full-table purchase limit

**Description:**

Inspect a ticket type whose maximum purchase limit is smaller than the required table and prove it cannot receive that table’s assignments.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use an unassigned four-seat table with Full purchase required on. Ticket type B has maximum purchase limit 3. Record its assigned count and an untouched seat.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Click one seat at the table. |  | All four table seats are selected. |
| Inspect B and try to check it. |  | B is disabled with the explanation that its purchase limit is lower than the selected table capacity. |
| Leave and reopen Seating; inspect the four seats and count. |  | No B assignment was added; its count and the control seat are unchanged. |

**Postconditions:**

* No assignment or purchase setting was changed.

### SPT-5630: Dashboard - Seating - Prevent a second ticket type on a full-purchase table

**Publication status:** Published to Qase on 2026-10-17; created as SPT-5630 (formerly TC-406); Next.js; not executed.

**Title:** Dashboard - Seating - Prevent a second ticket type on a full-purchase table

**Description:**

Attempt to add another eligible ticket type to a table that already requires full purchase under one type.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Run on the Next.js event Seating page.

**Preconditions:**

* The employee has Manage Events permission in an organization on a pricing tier other than Basic.
* Use an event approved for assignment changes with an attached map and no active buyers. Have no orders, holds or carts except the controlled records explicitly required for the selected case.
* Use a four-seat table with Full purchase required on and A already assigned to every seat. Both A and B have maximum purchase limit 4. B is unassigned to the table. Record both counts and a control seat.

**Tags:** assigned-seating, dashboard

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events, choose the event, then Manage → Seating. Click one seat at the table. |  | All four table seats are selected and A is checked. |
| Inspect B and try to check it. |  | B is disabled with the explanation that a full-purchase table can only be assigned to one item. |
| Leave and reopen; inspect all four seats. |  | Only A remains assigned across the table; both counts, the full-purchase setting and control seat are unchanged. |

**Postconditions:**

* No assignment or purchase setting was changed.

## Publication — approved 109-case batch

The user approved **Publish 109**. Published and read back **109 cases: 36 updates and 73 creates**, including **58 parameterized cases**. Create Map (82): 19 updates + 43 creates; Assign Permissions (1184): 17 updates + 30 creates. TC-381 remains held; no case was deleted or moved.

All approved titles, descriptions, prerequisites, cleanup, steps/results, tags, parameters and priorities match the saved cases. Existing type, behavior, layer, suites and tags were preserved; all 11 untouched legacy Seating cases remain unchanged. The complete post-write snapshot contains **2,094 unique cases (21 pages)** and **317 suites (4 pages)**; Seating now has **71 Create Map + 49 Assign Permissions = 120 definitions**. New titles and target IDs are unique. These are published definitions, **not executed passes or migration release approval**.

The index maps every former TC label to its new SPT ID. TC labels retained in the review and coverage ledger below are historical traceability to that index; only TC-381 is still an uncreated active draft.

Approval · Exact approved scope: titles, suites, tags, parameters and step counts · Apply receipt and IDs · Full-field verification · Saved case definitions · Frozen approved source.

## Backend review — additional coverage and remaining gaps

**Judgment:** the earlier 87-case batch was incomplete for testing the editor and assigner in their entirety. This pass adds **20 focused cases, TC-387–TC-406**, strengthens the existing drafts and brings SPT-3408/3409 into the current Next.js set. Source review and draft preparation performed no live mutation. The subsequent approved Qase publication is recorded above. Counts below describe case definitions, not executed passes.

| Missed behavior | Current case ownership |
| --- | --- |
| Full purchase required during table creation, later changes and copies | SPT-5536 (three shapes × On/Off); TC-333 (saved table, no/one type); SPT-5538 (nondefault copied setting). |
| Full-table assignment versus two separate rejection reasons | SPT-5550 is the clean success; its former insufficient-limit and second-type guards move to TC-405 and TC-406. No useful guard is removed. |
| Existing table numbering and assigned-seat identity after renumbering | TC-387 and TC-390; labels alone no longer stand in for retained assignments/options. |
| Score minimum, maximum, fractional value and clearing | SPT-2937; TC-326; TC-388/389. Backend accepts 1–10 including fractions and null for cleared scores. |
| Partly valid bulk changes must not partly commit | TC-391 (mixed row deletion); TC-392 (GA update + held-assignment removal); SPT-5549/2988 add Single/Mixed selection. |
| Existing recurring GA children: create/update/delete/protected child | TC-393–396; separate from recurring seat permissions. |
| Shared physical capacity, occupied capacity floor and cosmetic edits preserving admission | TC-401/404/402. The occupied-floor case explicitly requires distributed inventory; it does not generalize that policy to legacy inventory. |
| Permission alternatives/revocation, child controls and membership-batch detach guard | SPT-752; TC-403/397/398. |
| Name normalization and maximum identifier lengths | TC-336: trim/uppercase, 14-character sections and 6-character locations. |
| Deterministic ranking values, no history and indistinguishable history | SPT-3408/3409; TC-399/400. Sales order uses three different orderings so a last-event-only implementation would fail. |

**Still prevents an entirety claim:** UI cases cannot establish API ownership/enforcement, controlled network/job recovery, omitted legacy functions, all supported device/locale behavior or downstream money/ownership. These remain explicit in the ledger below. Specifically:

* **Source concern, not an executed defect:** the reviewed seat assignment admission/service checks venue ownership and one selected map but does not explicitly match that map to the ticket type’s event. GA admission likewise checks venue and event/type consistency without explicitly comparing the location’s map to the event’s attached map. Direct same-organization/wrong-map request tests are still required.
* **Source concern, not an executed defect:** full-table expansion, one-type eligibility and maximum-purchase warnings are explicit client rules. Equivalent checks were not found in the reviewed seat bulk-assignment path. GA raw-input admission checks above-capacity values but does not establish the UI’s complete positive-integer contract. UI cases must not be credited as API bypass protection.
* **Blocked preparation/proof:** waitlisted GA requests and resale-derived/membership-generated permissions, inventory-mode differences when reducing permission limits below usage, late callbacks and unknown save outcomes still require exact controlled data and API/component assertions. No invented rejection rule is used to close these gaps.

**Source evidence:** followed [[01 Repositories/Backend - web-app]] through `SpaceBuilderBatchService`, v3 serializers/layout editor, `SeatPermissionTargetAdmission`/selection admission/assignment/unassignment, `LocationPermissionConfigurationAdmission`/service, seat/GA permission models/managers, `Location.save` and distributed-inventory synchronization, event map-change validation and historical score generation. Backend and frontend revisions at the top remain unchanged and both checkouts were clean. Relevant frontend inspectors, duplication, shared assignment eligibility/drafts and ranking callbacks supplied the visible steps. Existing backend tests informed preparation and expected results; none were run or credited as execution.

**Replacement dry run:** passed for **109 cases — 36 updates and 73 creates**, with **58 parameterized cases**. Create Map (82): 19 updates + 43 creates; Assign Permissions (1184): 17 updates + 30 creates. TC-381 remains excluded as an overlap with SPT-3384. The old 87-case plan is superseded and locked against apply. Qase was unchanged at this preview; the approved batch has since been published and verified above.

**Duplicate/preservation check:** no duplicate labels, update targets, normalized titles or complete step/result sequences in this preview; no new title exactly matches the refreshed 2,021-case snapshot. Closest full-field candidates were reviewed by starting state, action and result. TC-405/406 intentionally take the former SPT-5550 guards as part of its split; existing ranking IDs are enhanced instead of duplicated. Clearing versus numeric scoring, occupied versus unassigned edits and creation versus editing an existing table retain different proof targets. Existing tags remain preserved; type, behavior, layer and suites remain outside update fields. Parameter labels were normalized without changing the represented product choices, with mappings inside each affected case.

Approved exact scope: IDs, titles, suites, tags, parameters and step counts · Full before/after preview · Dry-run-only plan. The user subsequently approved Publish 109; see the publication receipt above.

## Migration component coverage — after the cases

**Status:** every row below is a source-backed definition or an explicit unresolved item. **No row is an executed pass.** Qase suite 1132 retains the legacy baseline and the 109 published definitions above. Publication establishes saved definitions, not execution coverage. New scopes/removed controls need the dispositions below before migration readiness.

| Component / child controls | Executable case responsibility | Accounting / material limit |
| --- | --- | --- |
| Actual landing page → Events → event → Seating → Edit map → return | TC-380 | Manual-only; must be executed from the deployed landing page, not a deep link. |
| Map chooser, search/no matches, selection, Use this map, Create map | SPT-5554; SPT-752 | Independent attach/create proofs; selection alone must not assign. |
| Existing legacy map: every geometry family, names, flags, scores, background, counts | TC-352 | Read old saved values; Next.js load must not reset them. |
| Map Name and empty/spaces-only input | TC-323; TC-339 | Existing name edit and rejection separated. Maximum-name paste/normalization remains backend/component follow-up. |
| Section add/name/rename/duplicate/delete/protected delete | TC-353; TC-336; SPT-5538/5540/5539 | Original section, children and control objects checked after fresh reopen. |
| Row add and counts | TC-354, capacity 1/3/10 | Each row is its own proof; no prerequisite to create another map. |
| Round/Semi-round/Square table add and Full purchase required | SPT-5536; TC-333/342; SPT-5538 | Three shapes × On/Off on creation; changing a saved table with no/one type; multi-type rejection on the current/another event; copied nondefault setting. |
| Standing/Circle GA add | SPT-755, two shapes | Capacity-based admission, no phantom numbered seats. |
| Location Name/rename/invalid/conflicting names | TC-336/340; SPT-5541 | Section/location fields and conflict setup are separate. |
| Row/table Capacity, Offset, Step and row Reverse seat order | SPT-3386/3385; TC-355/387/390 | Exact normal/reversed sequences; invalid blank/zero/negative/fractional edits. TC-387 adds all three saved table shapes; TC-390 separately proves an existing seat assignment and flags survive renumbering. |
| Protected row capacity reduction | TC-341 | Assigned final seat cannot be removed; admission/assignment intact. |
| Rotation on section and every location family | TC-331 | All seven element runs; control positions/capacities preserved. |
| Row spacing override/reset, map default vs another override | TC-334 | Next.js blank reset differs from legacy Cancel; valid override 8, inherited 4 and control 6. |
| Curved-row enable/disable, width, depth, curve and endpoint handles | SPT-3178; TC-355 | Saved width/depth and both directions; no legacy Edit Curve button assumed. |
| Physical GA capacity and sold-admission preservation | TC-401/402/404 | Shared map capacity versus event limits; cosmetic edits preserve two issued tickets; distributed inventory reduction below four occupied places stores four. Permission-limit reduction under occupancy remains a mode-specific follow-up. |
| GA resize handles and Circle GA Radius | TC-356; TC-355 | Saved shape/size without changing admission capacity. |
| Section flip axes | TC-381 (held; duplicate candidate for SPT-3384) | Legacy Reverse seat order when flipping and Clear seat order reversal are **Blocked migration decisions**: no equivalent controls in the inspected Next.js inspector. Retain SPT-3384/3387 baseline; no approved removal inferred. |
| Duplicate offset 0/5 and duplicate every geometry family | SPT-5538 | Independent copy and exact count/identity checks, including initial overlap. |
| Inspector Delete plus protected section/row/table/GA rejection | SPT-5540/5539; TC-391 | Unrelated objects survive; current/another-event assignment protection and mixed-row deletion rollback now have definitions. Protected keyboard/context-menu variants still need focused component assertions. |
| Editable elements All/Sections/Rows tables and GA; cross-family locking | TC-359; SPT-3393; ordinary editing cases | Restricted-family moves tested; irregular section-vertex editing parity remains **Blocked** pending exact legacy-to-Next replacement behavior. |
| Context menu six alignment commands | TC-357 | Two selected shapes; shared visible edge/center, not equal origins. |
| Context menu horizontal/vertical distribution | TC-358 | Three shapes, exact equal visible gaps; outer objects fixed. |
| Context menu Duplicate/Zoom/Delete and keyboard equivalents | SPT-5538/5540; TC-360/362 | Shared operations; no phantom copy/delete during text/dialog focus. Disabled action thresholds with 0/1/2 targets need focused component assertions; no full menu coverage claimed from opening it. |
| Undo/Redo and Ctrl/Cmd+D/Z/Y/Shift+Z/S; typing/overlay shortcut suppression | TC-360/361; normal save cases | Existing-map history; initial create resets its baseline. Shortcut Save, new edit after Undo and already-saved history need targeted unit/integration follow-up. |
| Pan, zoom, Zoom to selection/F, Reset/Home | TC-362 | Navigation must preserve identities and geometry. Trackpad/touch gestures need named physical-device runs. |
| Show grid/Snap to grid, snapping on/off at endpoint/curve/area/section vertices | SPT-3183 retained legacy baseline; Next.js transform-snapping source | **Blocked current draft refinement:** legacy grid-layer move up/down is absent; exact new snap-handle matrix not claimed covered by view changes. Grid display is exercised as placement context, not a save-proof substitute. |
| Settings Seat size 3/8/12 and Seat spacing 0/8/40 | TC-324 | Six mapped parameter runs; new number inputs replace sliders. Legacy spacing values 41–100 and below-3 seat sizes need compatibility checks; not silently treated invalid. |
| Always show seats boundary (4499/4500), builder vs assignment purchase switch | TC-382; SPT-5552 | Off-state boundary only. Existing true values on oversized maps differ across consumers; **Product-expectation question**, not a reproduced defect. |
| Seat selection single/group, Shift-add/lasso, mixed flags | SPT-5537 (Selection) | Three seat options × On/Off; group has ClickAdd/Lasso. No legacy disabled-group expectation applied to Next.js. |
| Individual/group seat scores; GA Best available score | SPT-2937 (Selection); TC-326; TC-355 | Exact target/control scores; numeric endpoints and fractional scores; TC-388/389 clear seat/GA scores to blank. Invalid out-of-range values remain separate. |
| Ranking colors on/off, repeated toggles and 500+ map view | SPT-3392 | Does not prove Best Available purchase choice. |
| Generate rankings dialog and methods | SPT-3408/3409; TC-364/399/400 | Exact historical counts and cross-event order averages, no-history failure and equal-rank preservation now have definitions with explicit history preparation. AI completion/error/timeout/stale callbacks and pending-save gates remain blocked on controlled jobs/failures. SPT-3407/3410 remain legacy references. |
| Score/public-hide feature gates | Public hide flag in SPT-5537 | Legacy scoring modal/display flags are not consulted by the inspected new controls. **Product-expectation decision required** before retiring legacy flag-off protections. |
| Background JPG/PNG/SVG, file picker/drop, Upload, move/resize, reopen | SPT-3499 | Six shape/input combinations. Upload is separate from geometry save. |
| Background remove vs cancel a pending upload | SPT-5542; TC-363 | Removal changes map state; Cancel only discards a pending file. No promise that Cancel restores an already removed image. |
| Background oversized/unsupported/multiple selection errors | SPT-5543 | Exact size/type/count rules; MIME spoofing, interrupted upload and late completion after closing need API/component fault tests. |
| Appearance map defaults; section/GA shapes; five properties; Normal/Hover/Selected/Unavailable | TC-367/368 | Each available state saved independently; section has no Selected tab. Builder previews Normal, not booking states. |
| Appearance inherited/custom values, Reset state, Apply, Cancel, invalid ranges | TC-368/369/370 | Sparse overrides, unchanged states/controls and fresh reopen checked. Booking/public rendering stays downstream. |
| GA available animation Off/Breathing | TC-367 | Saved Breathing configuration; toggling back Off and actual booking animation need separate downstream proof. |
| Save/Autosave/Saving/Unsaved/Saved, save before editor exit | SPT-752 and all edit cases; TC-366 | Valid edit persistence. Header Save and shortcut Save share the save service; controlled pending/rejected/ambiguous responses below remain unexecuted. |
| Stale two-editor version rejection/reload | TC-365 | Deterministic source version conflict; no blind retry or last-writer overwrite assumed. |
| Atomic saves, lock retry, missing response IDs and unknown commit state | TC-391/392; backend batch and location services | A rejected group deletion and a GA update+protected deletion prove natural rollback paths. Lock/transport/projection faults, malformed acknowledgements and unknown commit state still require controlled API/component tests. |
| Newly created map saved but event attachment fails; Retry assignment/Choose a seating map | EventSeatingLayoutSetup/Page source | **Blocked** on an exact controlled attachment-failure fixture. Required invariant: reuse the created map, do not create another map or misreport attachment. |
| Assignment ordinary/curved seats; Memberships off | SPT-757/3184 | Separate supported setup and curved-geometry regression retained. |
| Shared seat with multiple types; all/none/mixed indicator; count changes | TC-343/344; SPT-5544 | Pointer/keyboard selection and exact +1/+2/-2 changes. |
| Full-table auto-selection, max purchase warning and second-type restriction | SPT-5550/5557; TC-405/406 | Clean full-table assignment, insufficient maximum and second-type rejection have separate cases. Mixed lasso preserves ordinary seats. These are UI definitions, not proof of direct API enforcement. |
| Minimum purchase warning/full type name/type order | TC-343 minimum 2; shared assignment component source | Hidden/sellers-only/password-type and very long names/order remain in SPT-753/754 legacy baseline; **Next.js follow-up**, not a purchase eligibility pass. |
| Single GA checkbox/limit/Save; first assignment/update/remove | SPT-5545/5546/5556 | Both last-type and remaining-type removal; limit 1/5/10; untouched snapshot rows preserved. |
| GA invalid input, paste and blur recovery | SPT-5547 | Invalid input is prevented/reset; no invented backend error toast required. |
| Multiple GA selection with independent limits and unselected snapshot rows | TC-374 | G1=4, G2=7, untouched G3=5 after reload. |
| Unsaved GA leave vs cancel leaving vs save | TC-350/375 | Separate outcomes; seat checkboxes save immediately and must not be treated as GA drafts. |
| Clear selected seats/areas before a new assignment | TC-383/384 | After clearing, exactly one new target changes and old targets remain unassigned. Seat immediate save and GA explicit save remain separate cases. |
| Assigned count / inventory denominator / list with no selection / no types | TC-343/344/371/376/385/386 | Independent seat+GA totals and no-ticket-type empty state covered by definitions; inventory-omitted count-only label still needs a component fixture. |
| Color entry from seat/area/list; preset/custom/Apply | TC-371 | Five mapped entries; map/legend and persisted type color agree. |
| Color invalid hex / Cancel / outside dismissal / error rollback | TC-372/373 | Immediate preview separated from Apply persistence; injected save failure still blocked. |
| Map display Show all seats/Show sold seats/Show ticket type list | TC-376 | View-only changes preserve actual ownership and Purchase settings. |
| Purchase Advanced seat colors/Prevent isolated seats/Always show across events | SPT-5552/5553 | Map-owned versus event-owned persistence and restoration. Runtime purchase semantics remain Core. |
| Recurring parent assignment/unassignment/occupied child guards | SPT-5551; TC-347/348 and TC-393–396 | Existing seat and GA child assignments, GA limit updates, removal and occupied-child guards. Future child creation remains follow-up. |
| Waitlisted / resale-derived / membership-generated GA permissions | Backend TTLocationPermission guards and snapshot exclusion flag | **Blocked controlled-data/API proof:** a waitlisted request can protect a permission without an issued ticket; partial snapshots must preserve hidden generated permissions. Held/sold coverage alone does not prove these states. |
| Existing pending/held/sold/resale seat or GA deletion guards | SPT-2988/5548/5549; SPT-5539 | Preserve controlled admission and financial records; GA resale relationship needs prepared proof. |
| Layout detach disabled / confirm success / cancel | SPT-5555; TC-349/377 | Both assignment kinds; shared map and second event preserved. TC-398 adds membership-event-batch rejection using an existing admin-visible batch; failed removal retry still needs a controlled failure. |
| Restricted role, map-management capabilities, Basic tier, recurring-child edit/remove gates | TC-378/379; shared SPT-5072/5075 references | UI role restriction plus allowed assignment, either layout management permission (SPT-752), revoked permission (TC-403), and recurring-child action visibility (TC-397) have definitions. Direct endpoint/cross-organization enforcement remains blocked on scoped API proof. |
| Loading, detail-loading, empty map/empty ticket types, read failure/retry | Clean cases + load/error branches in EventSeatingMapEditorPage/Workbench | TC-386 covers no ticket types. **Fault gaps:** failed reads/retry and stale organization switch need controlled current-client cases. A spinner or loaded route is not complete coverage. |
| Help tabs and focus return; responsive layout, keyboard, touch, locale | TC-361; TC-343 keyboard | Desktop English is the authored execution scope. Narrow viewport full workflow, French labels, touch/trackpad and physical-device runs are **Deferred** with named browser/device/locale and recorded client build required. |
| Customer/Box Office/Widget seat identity, hidden/accessibility/table rules, Best Available, purchase/fees/charge/oversell/release | Existing Core SPT-217/4074/2856/2864/3188/4401 references | **Blocked downstream execution/enhancement** as recorded in prior review. Map saves/colors cannot prove money, ownership or fulfillment. |
| Hidden X/Y/Width/Height numeric fields and section Selected appearance tab | Inspector definitions visibleWhen false; section appearance has three states | **Not applicable as visible controls**; equivalent transforms use canvas handles. Hidden code fields are not invented manual inputs. |

**What the cases establish:** separated, parameterized definitions for the supported source-backed actions. **What they do not establish:** completed execution or that unresolved migration functions/fixtures are covered. The legacy optional flip reversal/clear controls, grid stacking and compatibility values, score flag changes, recoveries, remaining read-failure, count-only-label and fault scenarios and downstream money/ownership remain visible gaps. No release-ready or “everything tested” claim is made.

**Preservation and split:** SPT-752’s previous map + section + row journey is split into Create map (SPT-752), Add a section (TC-353), and Add a seating row (TC-354). Open existing map is independent TC-352. Table shapes and GA shapes stay parameter values because their principal steps/results match. Existing IDs and tags are retained; useful source assertions move to their owning current case or are explicitly listed above as unresolved, rather than silently deleted. The former unpublished TC-328 legacy disabled-group expectation is replaced by the supported bulk-edit runs in SPT-5537; legacy SPT-3384/3387/3410 expectations remain available below pending migration disposition.

**Pre-publication sources and Qase evidence:** refreshed the complete SPT read on 2026-10-17 15:33:43–15:33:53 UTC: 2,021 unique cases/21 pages and 317 suites/4 pages, stable totals. Seating 1132 contains Create Map 82 (28 published definitions) and Assign Permissions 1184 (19). Full-field comparison used seat/layout/map plus the component/action terms in the ledger; a focused map/editor/permission/GA filter found 64 additional cross-suite candidates. Closest matches were compared by setup, parameters, actions and results, rather than title alone. The dry run read existing records only; the later approved publication is verified above. No live Showpass mutation occurred.

Backend source rechecked: venues/services/space_builder_v3/batch_service.py and layout_editor.py; api/venue_based/serializers/space_builder_v3.py and spaces.py; venue_management/seating_appearance.py; tickets seat assignment/unassignment/location services, seating models and event attachment guard. Client source rechecked: assigned-seating-builder tool registry; inspector field/action registries; canvas command/mode/edit-scope/shortcut handlers; Appearance forms and inheritance; background and ranking modals; save/checkpoint/version and navigation recovery; event assigned-seating-assigner setup/actions/settings/assignment components; shared selection-policy, coverage, eligibility, capacity and color controls. Current source revisions are at the top. No build, automated suite, generator or stateful test was run. The already-open demo tab is legacy and provided labels only; Next.js deployment/UI and organization/role identity were not verified live.

**Local validation:** all 110 current sections parse with complete fields, including one explicitly held flip refinement; the replacement dry run previews 109 operations (36 updates, 73 creates), with 58 parameterized cases. Existing case tags and meaningful parameter behavior remain preserved. Native parameter labels use PascalCase with standalone mappings to actual product choices. This validated definitions and payloads; the subsequent Qase apply and full-field readback are recorded above. No product test was executed.

**Baseline retained:** Full pre-revision note. Source/backend, Next.js behavior and legacy behavior are separate evidence. Existing unit tests were consulted as implementation references where relevant, not credited as executed protection.

## Retained legacy evidence and cases — not the current Next.js execution set

> [!info]- Superseded 87-case preview — retained for traceability
> ## Earlier 87-case dry run — superseded by backend review
>
> **Historical preview only:** this scope was superseded by the later backend review and must not be applied. The reusable Qase batch dry run had passed for **87 cases: 34 updates and 53 creates**, including **47 parameterized cases**. Create Map (82): 17 updates + 32 creates; Assign Permissions (1184): 17 updates + 21 creates. No Qase change or live product mutation was executed. The plan is locked to dry run and cannot be applied.
>
> | Redundant local draft | Coverage retained in | Parameter and preserved proof |
> | --- | --- | --- |
> | TC-325 — one-seat score | SPT-2937 | Selection: One seat / Several seats; exact scores, mixed starting values and unaffected control. |
> | TC-328 — group seat options | SPT-5537 | Selection: One seat / ClickAdd / Lasso × SeatOption × SavedState; both mixed-value targets and untouched control. |
> | TC-337 — section rename | TC-336 | Element includes Section; child geometry, labels, capacities and assignments remain attached. |
> | TC-346 — second GA ticket type | SPT-5545 | ExistingAssignment: None / Another ticket type; independent limits 3 and 4, physical capacity 10. |
>
> **Held from the batch:** TC-381 overlaps existing SPT-3384. Keep its Next.js flip assertions as a migration refinement candidate; do not create a parallel flip case. The old optional reverse-numbering setting is absent from the inspected Next.js controls, so replacing SPT-3384 would otherwise lose coverage without resolving the migration difference. SPT-3384 is unchanged.
>
> **Duplicate check:** compared normalized titles, labels, update targets, parameter values and complete step/result sequences; searched all 2,021 Qase definitions across their fields and reviewed the 47 owning-suite cases plus the relevant cross-suite matches. Four equivalent drafts were consolidated above; no further duplicate case was identified in the 87-case preview. Reversal alone versus changing another numbering field, adding versus updating a GA assignment, leaving versus cancelling navigation, and reading a saved map versus reaching it from Dashboard prove different outcomes and remain separate. The already-published broad large-map definitions SPT-753/754/2358 still overlap; no deletion or consolidation of those Qase records is included.
>
> **Preservation check:** kept existing tags and supported Dashboard/Desktop context. Restored table positioning, row-total accounting, reversal Off, repeated section-selection checks and the standing-area customer-display assertion where the earlier Next.js draft had dropped them. Parameter label changes follow the new visible control wording; the three table shapes and public-hide behavior remain represented. SPT-752’s authorized section/row split remains mapped below. Unrelated live Qase type, behavior, layer and suite metadata are excluded from updates; no case moves are planned.
>
> **Review files:** [87-case dry-run summary](/private/tmp/seating-nextjs-dry-run-summary.json) lists every exact ID/local label, title, suite, tag, parameter and step count. [Full preview](/private/tmp/seating-nextjs-dry-run-preview.json) includes before/after fields; [dry-run-only plan](/private/tmp/seating-nextjs-dry-run-plan.json) identifies every operation. These temporary files are previews, not approval to publish. The cases and consolidation ownership in this note are the durable record.
>
> > [!example]- Exact dry-run scope — IDs, titles, suites, tags, parameters and steps
> >
> > Existing SPT IDs are updates; TC labels are creates and have no Qase ID. No delete/move operation is present. Titles below omit the shared `Dashboard - Seating - ` prefix for readability.
> >
> > | Draft / action | Title | Suite | Tags | Parameters | Steps |
> > | --- | --- | --- | --- | --- | --- |
> > | SPT-752 / update | Create a seating map | 82 | assigned-seating, edit-event, dashboard, curved-rows, layout-editor, ui-interaction | None | 4 |
> > | TC-352 / create | Open an existing seating map | 82 | assigned-seating, dashboard | None | 5 |
> > | TC-353 / create | Add a section | 82 | assigned-seating, dashboard | None | 3 |
> > | TC-354 / create | Add a seating row | 82 | assigned-seating, dashboard | SeatCount: 1, 3, 10 | 4 |
> > | SPT-5536 / update | Add a table | 82 | assigned-seating, dashboard, map-editor | TableShape: Round table, Semi-round table, Square table | 3 |
> > | SPT-755 / update | Add a standing area | 82 | edit-event, dashboard, assigned-seating, ga-location, layout-editor, ui-interaction | AreaShape: Standing / GA, Circle GA | 5 |
> > | SPT-3178 / update | Save a curved row | 82 | assigned-seating, dashboard, layout-editor, curved-rows, edit-event, ui-interaction | None | 5 |
> > | SPT-3386 / update | Keep seat numbering correct after row changes | 82 | assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor | Change: Capacity, Offset, Step; Order: Normal, Reversed | 4 |
> > | SPT-3385 / update | Reverse one row seat order | 82 | assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor | SavedState: On, Off | 2 |
> > | TC-323 / create | Rename an existing seating map | 82 | assigned-seating, dashboard, map-editor | None | 3 |
> > | TC-324 / create | Save a map-wide seat display setting | 82 | assigned-seating, dashboard, map-editor | SettingRun: SizeMinimum, SizeOrdinary, SizeMaximum, SpacingZero, SpacingOrdinary, SpacingMaximum | 3 |
> > | TC-334 / create | Save and clear a row-specific seat spacing | 82 | assigned-seating, dashboard, map-editor | None | 4 |
> > | TC-331 / create | Save a map element rotation | 82 | assigned-seating, dashboard, map-editor | Element: Section, Row, Round table, Semi-round table, Square table, Standing / GA, Circle GA | 3 |
> > | TC-333 / create | Save the full-table purchase setting | 82 | assigned-seating, dashboard, map-editor | TableShape: Round table, Semi-round table, Square table; SavedState: On, Off | 3 |
> > | SPT-5537 / update | Save a seat option | 82 | assigned-seating, dashboard, map-editor | SeatOption: Accessible Seating, Limited Visibility, Hidden from public; SavedState: On, Off; Selection: One seat, ClickAdd, Lasso | 3 |
> > | SPT-2937 / update | Save manually entered seat scores | 82 | assigned-seating, best-available, dashboard, seat-editor, layout-editor, ui-interaction, curved-rows | Selection: One seat, Several seats | 3 |
> > | TC-326 / create | Save a standing-area score | 82 | assigned-seating, dashboard, map-editor | None | 3 |
> > | TC-339 / create | Reject a blank layout name | 82 | assigned-seating, dashboard, edge-case | EmptyName: Blank, Spaces | 3 |
> > | TC-341 / create | Protect an assigned seat when reducing row capacity | 82 | assigned-seating, dashboard, edge-case | None | 3 |
> > | TC-342 / create | Protect table assignments when enabling full-table purchase | 82 | assigned-seating, dashboard, edge-case | None | 3 |
> > | SPT-5538 / update | Duplicate a map element without linking its geometry | 82 | assigned-seating, dashboard, map-editor | Element: Row, Section, Round table, Semi-round table, Square table, Standing / GA, Circle GA; DuplicationOffset: 0, 5 | 4 |
> > | SPT-5540 / update | Remove unassigned map geometry | 82 | assigned-seating, dashboard, map-editor | Element: Row, Section, Round table, Semi-round table, Square table, Standing / GA, Circle GA | 3 |
> > | SPT-5539 / update | Reject deletion of assigned map geometry | 82 | assigned-seating, dashboard, map-editor | Element: Row, Section, Round table, Semi-round table, Square table, Standing / GA, Circle GA | 3 |
> > | TC-355 / create | Reject an invalid numeric map edit | 82 | assigned-seating, dashboard, edge-case | InvalidEdit: CapacityBlank, CapacityZero, CapacityNegative, CapacityDecimal, OffsetNegative, StepZero, StepDecimal, SpacingNegative, CurveNegative, RadiusZero, ScoreBelow, ScoreAbove | 3 |
> > | TC-356 / create | Resize a general admission area | 82 | assigned-seating, dashboard | AreaShape: Standing / GA, Circle GA | 3 |
> > | TC-357 / create | Align selected map elements | 82 | assigned-seating, dashboard | AlignCommand: Align left edges, Align to vertical center line, Align right edges, Align top edges, Align to horizontal center line, Align bottom edges | 3 |
> > | TC-358 / create | Distribute selected map elements evenly | 82 | assigned-seating, dashboard | Direction: Horizontal, Vertical | 3 |
> > | TC-359 / create | Restrict which map elements can be moved | 82 | assigned-seating, dashboard, edge-case | EditScope: Sections, SeatingAreas | 3 |
> > | TC-360 / create | Undo and redo a map edit | 82 | assigned-seating, dashboard | ActionMethod: Buttons, Shortcuts | 4 |
> > | TC-361 / create | Keep keyboard shortcuts from changing a map while typing | 82 | assigned-seating, dashboard | None | 3 |
> > | TC-362 / create | Navigate the canvas without changing the map | 82 | assigned-seating, dashboard | None | 3 |
> > | TC-363 / create | Cancel a pending background image upload | 82 | assigned-seating, dashboard | CloseMethod: Cancel, Close button | 3 |
> > | TC-364 / create | Reject AI ranking generation without context | 82 | assigned-seating, dashboard, edge-case | ContextValue: Blank, Spaces | 3 |
> > | TC-365 / create | Reject a stale map save after another editor saves | 82 | assigned-seating, dashboard, edge-case | None | 4 |
> > | TC-366 / create | Save a pending edit before leaving the editor | 82 | assigned-seating, dashboard | ExitAction: Editor back, Browser back | 3 |
> > | TC-367 / create | Save map appearance defaults | 82 | assigned-seating, dashboard | AppearanceKind: Section defaults, GA defaults | 4 |
> > | TC-368 / create | Reset an appearance override to its map default | 82 | assigned-seating, dashboard | None | 3 |
> > | TC-369 / create | Cancel appearance edits | 82 | assigned-seating, dashboard | None | 3 |
> > | TC-370 / create | Reject an invalid appearance value | 82 | assigned-seating, dashboard, edge-case | InvalidAppearance: OpacityBelow, OpacityAbove, BorderAbove, RequiredBlank | 3 |
> > | SPT-3499 / update | Add a background image | 82 | assigned-seating, dashboard, layout-editor, ui-interaction, upload-image | ImageType: JPG, PNG, SVG; InputMethod: File picker, Drag and drop | 4 |
> > | SPT-5542 / update | Remove a background image | 82 | assigned-seating, dashboard, map-editor | None | 3 |
> > | SPT-5543 / update | Reject an invalid background upload | 82 | assigned-seating, dashboard, map-editor | InvalidUpload: Oversized, Unsupported, Multiple | 3 |
> > | TC-336 / create | Rename a map element | 82 | assigned-seating, dashboard, map-editor | Element: Section, Row, Round table, Semi-round table, Square table, Standing / GA, Circle GA | 3 |
> > | TC-332 / create | Save the setting to hide location names | 82 | assigned-seating, dashboard, map-editor | SavedState: On, Off | 2 |
> > | SPT-3392 / update | Display seat scores without changing the map | 82 | assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor, performance | None | 3 |
> > | SPT-5541 / update | Reject an invalid section name | 82 | assigned-seating, dashboard, map-editor | InvalidName: Blank, Duplicate, Punctuation | 3 |
> > | TC-340 / create | Reject an invalid row name | 82 | assigned-seating, dashboard, edge-case | InvalidName: Blank, Duplicate, Punctuation | 3 |
> > | TC-382 / create | Respect the always-show-seats size boundary | 82 | assigned-seating, dashboard | MapSize: BelowLimit, AtLimit | 3 |
> > | SPT-3393 / update | Move selected sections | 82 | assigned-seating, dashboard, layout-editor, ui-interaction | SelectionGroup: OuterTwo, Three | 5 |
> > | SPT-5554 / update | Attach an existing seating map to an event | 1184 | assigned-seating, dashboard, permissions | None | 5 |
> > | SPT-757 / update | Assign seats when Memberships is disabled | 1184 | assigned-seating, edit-event, dashboard | None | 3 |
> > | SPT-3184 / update | Assign a ticket type to curved-row seats | 1184 | assigned-seating, dashboard, ticket-types, curved-rows, edit-event, ui-interaction | None | 3 |
> > | TC-343 / create | Assign a second ticket type to ordinary seats | 1184 | assigned-seating, dashboard, tickets | InputMethod: Pointer, Keyboard | 3 |
> > | TC-344 / create | Complete a partly assigned seat selection | 1184 | assigned-seating, dashboard, tickets | None | 3 |
> > | SPT-5544 / update | Remove an available seat assignment | 1184 | assigned-seating, dashboard, permissions | RemainingAssignment: None, AnotherTicketType | 3 |
> > | SPT-5545 / update | Assign a ticket type to a standing area | 1184 | assigned-seating, dashboard, permissions | ExistingAssignment: None, Another ticket type | 4 |
> > | SPT-5546 / update | Update a standing-area permission limit | 1184 | assigned-seating, dashboard, permissions | Limit: 1, 5, 10 | 3 |
> > | SPT-5547 / update | Reject a standing-area limit above its capacity | 1184 | assigned-seating, dashboard, permissions | InvalidCapacity: AboveCapacity, Zero, Negative, Decimal, Blank, Text | 3 |
> > | TC-350 / create | Leave a standing-area edit without saving it | 1184 | assigned-seating, dashboard, tickets | None | 3 |
> > | TC-345 / create | Keep seat assignments separate for events sharing a map | 1184 | assigned-seating, dashboard, tickets | None | 3 |
> > | SPT-5552 / update | Save a shared map display setting | 1184 | assigned-seating, dashboard, permissions | Setting: AdvancedColors, AlwaysShow | 3 |
> > | SPT-5553 / update | Save the event-specific no-isolated-seats setting | 1184 | assigned-seating, dashboard, permissions | None | 3 |
> > | SPT-5555 / update | Prevent detaching a map with assignments | 1184 | assigned-seating, dashboard, permissions | AssignmentKind: Seat, GeneralAdmission | 2 |
> > | TC-349 / create | Detach a map that has no assignments | 1184 | assigned-seating, dashboard, tickets | None | 4 |
> > | SPT-5556 / update | Remove an unused standing-area assignment | 1184 | assigned-seating, dashboard, permissions | RemainingAssignment: None, AnotherTicketType | 3 |
> > | TC-371 / create | Save a ticket-type assignment color | 1184 | assigned-seating, dashboard | ColorEntry: SeatPreset, SeatHex, AreaHex, ListPreset, ListHex | 3 |
> > | TC-372 / create | Reject an invalid ticket-type color | 1184 | assigned-seating, dashboard, edge-case | None | 3 |
> > | TC-373 / create | Cancel a ticket-type color change | 1184 | assigned-seating, dashboard | CloseMethod: Cancel, Outside click | 3 |
> > | TC-374 / create | Save different limits for selected general admission areas | 1184 | assigned-seating, dashboard | None | 3 |
> > | TC-375 / create | Keep a general admission draft when cancelling navigation | 1184 | assigned-seating, dashboard | None | 3 |
> > | TC-376 / create | Keep map-view controls separate from saved purchase settings | 1184 | assigned-seating, dashboard | ViewControl: Show all seats, Show sold seats, Show ticket type list | 2 |
> > | TC-377 / create | Cancel removal of a seating map | 1184 | assigned-seating, dashboard | None | 3 |
> > | TC-378 / create | Restrict map editing while allowing event assignments | 1184 | assigned-seating, dashboard, edge-case | None | 3 |
> > | TC-379 / create | Block seating configuration on the Basic pricing tier | 1184 | assigned-seating, dashboard, edge-case | None | 2 |
> > | SPT-2988 / update | Protect a seat with an active resale listing | 1184 | web, dashboard, map-editor, seat-editor, assigned-seating, resale, validation, events | None | 3 |
> > | SPT-5548 / update | Protect an occupied standing-area assignment | 1184 | assigned-seating, dashboard, permissions | BlockingState: Held, Sold | 3 |
> > | SPT-5549 / update | Protect an occupied seat assignment | 1184 | assigned-seating, dashboard, permissions | BlockingState: PendingBasket, ActiveHold, IssuedTicket | 3 |
> > | SPT-5550 / update | Restrict ticket types on a full-purchase table | 1184 | assigned-seating, dashboard, permissions | None | 4 |
> > | SPT-5551 / update | Propagate a parent ticket-type seat assignment | 1184 | assigned-seating, dashboard, permissions | None | 3 |
> > | SPT-5557 / update | Keep mixed full-table and ordinary-seat selection safe | 1184 | assigned-seating, dashboard, permissions | None | 2 |
> > | TC-347 / create | Remove an unused recurring-parent seat assignment | 1184 | assigned-seating, dashboard, tickets | None | 3 |
> > | TC-348 / create | Protect a recurring-parent assignment used by an occurrence | 1184 | assigned-seating, dashboard, tickets | ChildState: ActiveHold, IssuedTicket | 4 |
> > | TC-380 / create | Reach seating through the supported Dashboard navigation | 1184 | assigned-seating, dashboard | None | 3 |
> > | TC-383 / create | Clear selected seats before assigning another seat | 1184 | assigned-seating, dashboard | None | 4 |
> > | TC-384 / create | Clear selected areas before assigning another area | 1184 | assigned-seating, dashboard | None | 3 |
> > | TC-385 / create | Show the correct combined assignment count | 1184 | assigned-seating, dashboard | None | 3 |
> > | TC-386 / create | Open a map with no ticket types | 1184 | assigned-seating, dashboard | None | 2 |


The material below records the earlier review/publication and controls that still need explicit migration disposition. Current drafts for reused IDs have moved above. Historic statements about counts, publication or review scope apply to those earlier operations.


# Seating

**Current read-only review — October 16, 2026:** The refreshed suite still contains **47 published definitions** (28 Create Map; 19 Assign Permissions). Added **13 focused drafts, TC-339–TC-351**, and enhanced **SPT-5541, SPT-5544, SPT-5546, SPT-5552, SPT-5554 and SPT-5556** locally. Retained the earlier 15 drafts and SPT-5537 enhancement: **28 uncreated cases and 7 proposed updates total**. No Qase write or live mutation was performed in this request. Base success definitions exist, but access/tenant enforcement, save failure/concurrency, disputed numeric limits and downstream ownership/financial gates still prevent a complete-coverage claim. See the compact current ledger after the cases.

**Qase location:** [Events → Manage → Seating (1132)](https://app.qase.io/project/SPT?suite=1132) → [Create Map (82)](https://app.qase.io/project/SPT?suite=82) and [Assign Permissions (1184)](https://app.qase.io/project/SPT?suite=1184). Published and full-field readback verified on 2026-10-16 at 21:59 PDT.

**Earlier follow-up base review:** Opened the actual Seat Editor mode after the first publish. Found **15 distinct new editor cases** and made **SPT-5537** explicitly require both On and Off runs. These local changes are **not pushed**. Row-spacing reset and zero-override behavior remain source concerns; see the follow-up ledger below.

**Earlier publication review:** Reviewed all **25** full cases in Seating (1132) → Map Editor (82), including SPT-3392, against backend behavior and the current legacy workflow. Published **17 existing-case enhancements and 22 new focused cases**. The other **8 existing cases are preserved** with explicit follow-up limits below. This is coverage design, not a completed seating execution or release approval. **Financial/ownership proof remains blocked in linked Core cases; the legacy size/stress overlaps and generator criteria are explicitly unresolved below.**

**Earlier suite organization (historical):** kept Seating (1132) as the parent; renamed existing Map Editor (82) to **Create Map** and created **Assign Permissions (1184)** under 1132. Preserved existing IDs and moved 753, 754, 757, 2988 and 3184 into Assign Permissions. No cases or suites were deleted. Verified final inventory: **47 cases**, 28 Create Map and 19 Assign Permissions. The permission cases cover seat/area sellability, not employee-account permission administration.

**Owning navigation:** Dashboard → Build → Events → All events → Manage → Seating. The current legacy wording is Manage Events → event → Manage → Assigned Seating; Edit Space opens the map editor. Migrated route evidence: /manage/events/[slug]/seating and /seating/map-editor. Cases below use current visible legacy controls to prove feature parity and are filed by those two owning workflows. Do not assume matching labels or saved behavior have already been verified on the migrated implementation.

**Intent:** Prove an organizer can create a durable, correctly labelled map and assign only the intended ticket types/capacity while preserving existing sales, holds, seat identity and financial history. Criticality: inventory/ownership and ability to sell. Clean map/permission saves require fresh reopening; purchase/fee/charge/overselling proof remains a separate required gate. Confidence: source-backed definitions with limited non-saving UI observation; live mutations and financial outcomes are unexecuted.

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]] · [[03 Test Cases/Events/00 Create and shared checks/Navigation and permissions|Shared navigation case SPT-5072]]

## Case index

**Base seat creation:** Published [SPT-752](https://app.qase.io/case/SPT-752), step 3, creates a row with Capacity 3, Offset 0 and Step 1, checks seats 1–3, then saves and reopens them in steps 4–5. Seats are generated from row or table capacity in Layout Editor. Published [SPT-5536](https://app.qase.io/case/SPT-5536) covers the corresponding table-seat creation. These are saved case definitions, not executed results; their map/table titles make seat creation less obvious in the list.

| Case | Purpose | Suite |
| --- | --- | --- |
| SPT-752 | Create and reopen a seating map | Create Map |
| SPT-755 | Save a standing area | Create Map |
| SPT-3178 | Save a curved row | Create Map |
| SPT-2937 | Save manually entered seat scores | Create Map |
| SPT-3181 | Show handles for the current section or area | Create Map |
| SPT-3183 | Save positions snapped to the grid | Create Map |
| SPT-3384 | Mirror a section with the selected numbering option | Create Map |
| SPT-3385 | Reverse one row seat order | Create Map |
| SPT-3386 | Keep seat numbering correct after row changes | Create Map |
| SPT-3387 | Clear reversed seat order for one section | Create Map |
| SPT-3392 | Display seat scores without changing the map | Create Map |
| SPT-3393 | Select and move multiple sections | Create Map |
| SPT-3394 | Select map objects touched by a selection box | Create Map |
| SPT-3499 | Save and position a background image | Create Map |
| SPT-757 | Assign seats when Memberships is disabled | Assign Permissions |
| SPT-3184 | Assign a ticket type to curved-row seats | Assign Permissions |
| SPT-2988 | Protect a seat with an active resale listing | Assign Permissions |
| SPT-5536 | Add a table | Create Map |
| SPT-5537 | Save an individual seat option | Create Map |
| SPT-5538 | Duplicate a map element without linking its geometry | Create Map |
| SPT-5539 | Reject deletion of assigned map geometry | Create Map |
| SPT-5540 | Remove unassigned map geometry | Create Map |
| SPT-5541 | Reject an invalid section name | Create Map |
| SPT-5542 | Remove a background image | Create Map |
| SPT-5543 | Reject an oversized background image | Create Map |
| SPT-5544 | Remove an available seat assignment | Assign Permissions |
| SPT-5545 | Assign a ticket type to a standing area | Assign Permissions |
| SPT-5546 | Update a standing-area permission limit | Assign Permissions |
| SPT-5547 | Reject a standing-area limit above its capacity | Assign Permissions |
| SPT-5548 | Protect an occupied standing-area assignment | Assign Permissions |
| SPT-5549 | Protect an occupied seat assignment | Assign Permissions |
| SPT-5550 | Restrict ticket types on a full-purchase table | Assign Permissions |
| SPT-5551 | Propagate a parent ticket-type seat assignment | Assign Permissions |
| SPT-5552 | Save a shared map display setting | Assign Permissions |
| SPT-5553 | Save the event-specific no-isolated-seats setting | Assign Permissions |
| SPT-5554 | Attach an existing seating map to an event | Assign Permissions |
| SPT-5555 | Prevent detaching a map with assignments | Assign Permissions |
| SPT-5556 | Remove an unused standing-area assignment | Assign Permissions |
| SPT-5557 | Keep mixed full-table and ordinary-seat selection safe | Assign Permissions |

**Unpublished follow-up candidates:**

| Case | Purpose | Target suite |
| --- | --- | --- |
| TC-323 | Rename an existing seating map | Create Map — not pushed |
| TC-324 | Save a map-wide seat display setting | Create Map — not pushed |
| TC-325 | Save one seat score | Create Map — not pushed |
| TC-326 | Save a standing-area score | Create Map — not pushed |
| TC-327 | Clear the seat editor selection | Create Map — not pushed |
| TC-328 | Keep individual seat options disabled for a group | Create Map — not pushed |
| TC-329 | Show all seats without changing the saved map | Create Map — not pushed |
| TC-330 | Switch between layout and seat editing | Create Map — not pushed |
| TC-331 | Save a map element rotation | Create Map — not pushed |
| TC-332 | Save the setting to hide location names | Create Map — not pushed |
| TC-333 | Save the full-table purchase setting | Create Map — not pushed |
| TC-334 | Save a row-specific seat spacing | Create Map — not pushed |
| TC-336 | Rename an existing row or area | Create Map — not pushed |
| TC-337 | Rename an existing section | Create Map — not pushed |
| TC-338 | Show only the enabled seat editor controls | Create Map — not pushed |
| TC-339–TC-342 | Blank/invalid names and protected row/table changes | Create Map — not pushed |
| TC-343–TC-350 | Multiple types, partial selection, event/recurrence isolation, detach and unsaved GA edits | Assign Permissions — not pushed |
| TC-351 | Deny layout save without layout permission | Create Map — not pushed |

## Create Map

### SPT-3181: Dashboard - Seating - Show handles for the current section or area

**Title:** Dashboard - Seating - Show handles for the current section or area

**Description:**

Start from the event’s Manage → Assigned Seating page. Verify that selecting a standing area replaces the section handles, and that clearing selection removes the handles. Use Edit Space to open the current map editor.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use an event and layout approved for editing, with no orders, holds or active carts and no other selling event sharing the layout. Map edits can save automatically before Save is selected.
* Use one section containing two distinct GA areas. Do not move any handle or area.

**Tags:** assigned-seating, dashboard, layout-editor, ga-location, ui-interaction, edit-event

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit Space and select the section. |  | Section handles appear. |
| Select the first area, then the second area. |  | Only the current area is highlighted with its edit handles; section handles stay hidden. |
| Select the parent section outside either area. |  | Area highlights clear and section handles return. |
| Click empty map space. |  | Selection and its handles clear; the map geometry remains unchanged. |

**Postconditions:**

* No map values are changed.

### SPT-3183: Dashboard - Seating - Save positions snapped to the grid

**Title:** Dashboard - Seating - Save positions snapped to the grid

**Description:**

Start from the event’s Manage → Assigned Seating page. Verify snapping for supported map elements at more than one zoom level, then reopen the saved positions. Run each SnapTarget separately. Use Edit Space to open the current map editor.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use an event and layout approved for editing, with no orders, holds or active carts and no other selling event sharing the layout. Map edits can save automatically before Save is selected.
* Prepare the selected target: a row, a curved row, a GA area inside a moved section, or a section edge. Record a separate untouched object.
* Use Manage Grid to enable the visible grid and Snap to Grid. For SectionPoint, add a point by double-clicking a section edge.

**Tags:** assigned-seating, dashboard, layout-editor, ga-location, ui-interaction, edit-event, curved-rows

**Priority:** High

**Parameters:**
SnapTarget: RowEndpoint, CurveControl, Area, SectionPoint

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit Space and select the prepared SnapTarget. |  | The intended object or handle is selected. |
| Drag the target between grid intersections, then release it. |  | It settles on a visible grid intersection, including inside a moved section. |
| Change zoom and repeat the drag. |  | Snapping still follows the displayed grid. |
| Select Save, leave and reopen the map. |  | The recorded snapped position persists and the untouched object is unchanged. |
| Turn Snap to Grid off and move the target between intersections. |  | It can be positioned without snapping. |

**Postconditions:**

* Retain the map and recorded values on the approved event for review. No customer order or financial history is deleted.

### SPT-3384: Dashboard - Seating - Mirror a section with the selected numbering option

**Title:** Dashboard - Seating - Mirror a section with the selected numbering option

**Description:**

Start from the event’s Manage → Assigned Seating page. Verify both flip directions and the option controlling visual seat-number reversal. Mirroring does not create new seats or change the set of seat labels. Use Edit Space to open the current map editor.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use an event and layout approved for editing, with no orders, holds or active carts and no other selling event sharing the layout. Map edits can save automatically before Save is selected.
* Use a section with an asymmetric outline and a numbered row. Record the outline, first/last seat positions and all labels.
* Start each run from the recorded unflipped section. ReverseOrder On means enable Reverse seat order when flipping; Off means leave it disabled.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor

**Priority:** High

**Parameters:**
Direction: Horizontal, Vertical
ReverseOrder: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit Space, select the section and set Reverse seat order when flipping for the chosen ReverseOrder. |  | The option matches the selected run. |
| Choose Flip Horizontal for Horizontal or Flip Vertical for Vertical. |  | The section mirrors left/right or top/bottom on the selected axis. |
| Compare the row and outline with the original. |  | The outline is mirrored, seat numbering follows the selected reversal option, and every original label remains exactly once. |
| Select Save, leave and reopen the map. |  | The mirrored geometry and numbering persist; total seat count is unchanged. |

**Postconditions:**

* Retain the map and recorded values on the approved event for review. No customer order or financial history is deleted.

### SPT-3387: Dashboard - Seating - Clear reversed seat order for one section

**Title:** Dashboard - Seating - Clear reversed seat order for one section

**Description:**

Start from the event’s Manage → Assigned Seating page. Clear reversed numbering for the selected section while keeping another section unchanged. Use Edit Space to open the current map editor.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use an event and layout approved for editing, with no orders, holds or active carts and no other selling event sharing the layout. Map edits can save automatically before Save is selected.
* Use section A with two reversed rows numbered 3,2,1, plus an untouched reversed row in section B.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, seat-editor

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit Space and select section A. |  | Section A is selected. |
| Select Clear seat order reversal. |  | Both rows in A read 1,2,3 and their Reverse seat order controls are off. |
| Select Save, leave and reopen the map. |  | Both A rows retain normal order; the row in section B stays reversed. |

**Postconditions:**

* Retain the map and recorded values on the approved event for review. No customer order or financial history is deleted.

### SPT-3394: Dashboard - Seating - Select map objects touched by a selection box

**Title:** Dashboard - Seating - Select map objects touched by a selection box

**Description:**

Start from the event’s Manage → Assigned Seating page. Verify the source selection rule: intersecting or edge-touching object bounds are included, and fully separated objects are excluded. The selected parent and editor mode determine the eligible object family. Use Edit Space to open the current map editor.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use an event and layout approved for editing, with no orders, holds or active carts and no other selling event sharing the layout. Map edits can save automatically before Save is selected.
* Use a map with at least 1000 selectable elements and record three targets: inside, touching the planned selection edge, and fully outside.
* Run SelectionScope Sections with no section selected; RowsAndAreas with one section selected; or Seats with Seat Score View ON and enable_best_assigned_seating active. Use only that compatible object family.

**Tags:** assigned-seating, dashboard, layout-editor, ui-interaction, performance

**Priority:** High

**Parameters:**
SelectionScope: Sections, RowsAndAreas, Seats

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit Space and set the selected SelectionScope. |  | The prepared eligible object family is shown. |
| Hold Shift and drag a box across the inside and edge-touching targets. |  | The inside and touching targets are selected; the separated target and ineligible object families are excluded. |
| Repeat with a smaller and then a larger box. |  | The selection follows the box and the interface remains usable; record any stall separately from selection correctness. |
| Clear selection. |  | Highlights clear and saved map geometry is unchanged. |

**Postconditions:**

* Do not drag selected objects or save geometry changes.

## Create Map — additional base cases (not pushed)

The following **15 new cases** and the explicit On/Off enhancement to **SPT-5537** are local proposals. The 47 published cases remain unchanged in Qase. All candidates belong in Create Map (82); they concern editor configuration and viewing, not assignment permissions.

### TC-327: Dashboard - Seating - Clear the seat editor selection

**Title:** Dashboard - Seating - Clear the seat editor selection

**Description:**

Start from Manage → Assigned Seating → Edit Space and choose Seat Editor. Clear a selection without deleting seats or changing their options or scores. Run Selection separately.

| Selection | What to select |
| --- | --- |
| One seat | Click one recorded seat. |
| Multiple seats | Hold Shift and drag a selection box around two recorded seats only. |
| Standing area | Click one recorded Standing / GA area. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use a saved map approved for inspection. Record its name, totals and the settings mentioned below; do not edit fields, move map objects or select Save.
* Record the selected seats’ or area’s options, scores and labels, plus Total Seats and Total Areas.

**Tags:** assigned-seating, dashboard, map-editor

**Parameters:**
Selection: One seat, Multiple seats, Standing area

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Choose Seat Editor and make the selected Selection using the table. |  | Only the intended seats or area are selected; Seating Options is displayed. |
| Select Clear Selected Seats. |  | The selection is cleared and the selected-object options panel closes; no seat or area disappears. |
| Select the same seats or area again, then leave and reopen the map without saving. |  | Recorded options, scores, labels and totals are unchanged. |

**Postconditions:**

* Leave the map without saving; its recorded name, geometry, options and scores remain unchanged.

### TC-329: Dashboard - Seating - Show all seats without changing the saved map

**Title:** Dashboard - Seating - Show all seats without changing the saved map

**Description:**

Start from Manage → Assigned Seating → Edit Space. On a large map, use the eye control labelled by the tooltip Toggle displaying all seats in map. This is a temporary viewing control, separate from the saved Always Show setting on Assigned Seating.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use a saved map approved for inspection. Record its name, totals and the settings mentioned below; do not edit fields, move map objects or select Save.
* Use a saved map containing more than 1,000 seats. Record its Total Seats, Total Areas and the Always Show setting on Assigned Seating before opening Edit Space.

**Tags:** assigned-seating, dashboard, map-editor

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Use Toggle displaying all seats in map to show the seats, then inspect more than one section. |  | Seat markers are visible across sections without adding seats or altering the totals. |
| Use the same control to return to the section-level view. |  | The overview returns without changing map geometry or seat options. |
| Leave without saving and reopen Assigned Seating and Edit Space. |  | The recorded totals and saved Always Show setting are unchanged. |

**Postconditions:**

* Leave the map without saving; its recorded name, geometry, options and scores remain unchanged.

### TC-330: Dashboard - Seating - Switch between layout and seat editing

**Title:** Dashboard - Seating - Switch between layout and seat editing

**Description:**

Start from Manage → Assigned Seating → Edit Space. Change Edit Mode explicitly, without using Seat Score View, to check that the controls match the selected work and existing layout data is preserved.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use a saved map approved for inspection. Record its name, totals and the settings mentioned below; do not edit fields, move map objects or select Save.
* Use a saved map with a section, a numbered row and recorded seat options. Leave Seat Score View OFF throughout this case.

**Tags:** assigned-seating, dashboard, map-editor

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Choose Layout Editor and select the recorded section and row. |  | Section or row layout controls appear; individual Seating Options are not shown. |
| Choose Seat Editor and select a recorded seat. |  | Seating Options is available for the seat; section and row geometry controls are hidden. |
| Return to Layout Editor, then leave and reopen without saving. |  | Layout controls return and the map retains its recorded geometry, labels and seat options. |

**Postconditions:**

* Leave the map without saving; its recorded name, geometry, options and scores remain unchanged.

### TC-338: Dashboard - Seating - Show only the enabled seat editor controls

**Title:** Dashboard - Seating - Show only the enabled seat editor controls

**Description:**

Start from Manage → Assigned Seating → Edit Space and choose Seat Editor. Check the controls allowed by the organization’s current settings. Run GateState separately; no flag is changed during this case.

| GateState | Organization setup | Expected controls |
| --- | --- | --- |
| Scores enabled | enable_best_assigned_seating on | Seat Score View and the selected seat’s Seat Score are visible. |
| Scores disabled | enable_best_assigned_seating off | Seat Score View and Seat Score are absent. |
| Public hide enabled | use_id_based_seat_comparison on | Hide seat from purchase map is visible for one selected seat. |
| Public hide disabled | use_id_based_seat_comparison off | Hide seat from purchase map is absent. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Manage Venue Layouts permissions.
* Use a saved map approved for inspection. Record its name, totals and the settings mentioned below; do not edit fields, move map objects or select Save.
* Use an organization already prepared with the selected GateState. Record one selectable seat and its Accessible Seating and Limited Visibility values.

**Tags:** assigned-seating, dashboard, map-editor

**Parameters:**
GateState: Scores enabled, Scores disabled, Public hide enabled, Public hide disabled

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Edit Space and inspect the top controls, then choose Seat Editor and select the recorded seat. |  | The controls match the selected GateState table; Accessible Seating and Limited Visibility remain available for the single seat. |
| Leave without changing any option or score, then reopen the map. |  | The seat retains its recorded settings; the hidden controls were not needed to open the editor. |

**Postconditions:**

* Leave the map without saving; its recorded name, geometry, options and scores remain unchanged.

## Create Map — validation and protection gaps (not pushed)

### TC-351: Dashboard - Seating - Reject a map edit without layout permission

**Title:** Dashboard - Seating - Reject a map edit without layout permission

**Description:**

On the current Assigned Seating page, an employee who can manage events but cannot edit layouts attempts to rename an existing map. Verify that the save is denied and the saved map remains unchanged. This case checks the current editor’s save boundary; migrated pages may hide the editor earlier.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organization administrator has prepared an employee with Manage Events enabled and both Manage Venue Layouts and Manage Organization Info disabled. The employee uses a restricted permission list rather than all-permissions access.
* Use an event and map approved for this permission check, with no orders, holds, active carts or selling event sharing the map. Record the original map name and seat count; its name differs from Map permission check.
* Use the current legacy Assigned Seating page, where Edit Space is visible to the employee. Do not run this procedure on a different page version.

**Tags:** assigned-seating, dashboard, employee-permissions

**Priority:** High

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the restricted employee, open Manage Events, choose the recorded event, then Manage → Assigned Seating → Edit Space. | | The existing map opens without changing its saved values. |
| Change Layout name to Map permission check and select Save. | | Saving is denied; the employee cannot save a layout change with these permissions. |
| Reload the page and reopen Edit Space. | | The original map name and seat count are still saved. |

**Postconditions:**

* Retain the original map and employee permissions. Do not grant layout permission to make the rejected save succeed.

## Assign Permissions

## Assign Permissions — base and critical gaps (not pushed)

## Current review — gaps and source evidence

**Definition coverage, not executed results.** All 47 current Seating case bodies, parameters and assertions were compared with the canonical note and the focused source paths below. All new or enhanced definitions below are **Manual-only / not executed** until approved execution data is prepared. Clean map creation is SPT-752; tables SPT-5536; standing areas SPT-755; clean seat/area assignment SPT-757, SPT-3184 and SPT-5545. Earlier editor drafts remain useful and unpublished. Employee-account permissions and ticket-type sale permissions are different boundaries.

| Proof target / gap | Decision and local definition | Remaining limit |
| --- | --- | --- |
| Empty map name; invalid section/row names | New TC-339/340; enhance SPT-5541 by adding Punctuation to Blank/Duplicate | Spaces-only, case sensitivity, maximum/overlength paste and same-name nonoverlapping row rules deferred; not assumed invalid. |
| Assigned seat removed by shrinking a row | New TC-341 | Covers assigned but unsold seat; existing SPT-5539 retains row/section delete guards. Sold/held identity changes need controlled ownership proof. |
| Enable full-table purchase after multiple ticket types were assigned | New TC-342 | Complements SPT-5550’s assignment-time guard; neither proves a completed full-table purchase. |
| Ordinary seats accept two types; partly assigned selection adds only missing seats | New TC-343/344 | Keep SPT-757’s Memberships-disabled flow and SPT-3184’s curved-row flow. No size-only duplicate added. |
| Removing one type preserves a second type | Enhance SPT-5544 and SPT-5556 with None/AnotherTicketType | Both original single-type removal paths remain; separate seat and standing-area saves are preserved. |
| Event assignment versus shared map scope | New TC-345; enhance SPT-5546 with a second independent event and Limit 1/5/10 | Existing value 5 retained; 1 and exact capacity 10 added. Zero, blank, negative, fractional and nonnumeric GA limits remain blocked for a validation-contract decision: UI min=1 is not server rejection evidence. |
| Multiple types on a standing area | New TC-346 | Capacity 10, limits 3 and 4; independent limits do not prove combined sales cannot exceed physical capacity. |
| Parent removal reaches children; occupied child blocks parent removal | New TC-347/348 | Keep SPT-5551’s clean assignment propagation. New occurrences created later, parent GA propagation and child resale need separate setup/source checks. |
| Empty-map detach; assignment-protected detach | New TC-349; keep SPT-5555 | TC-349 excludes membership ticket batches because the event serializer rejects detachment for those events. Batch rejection remains deferred pending a prepared event with a supported visible detach path. |
| Leave GA edits without Save | New TC-350 | Applies only to the GA Save action. Seat checkboxes and map fields can persist immediately; Cancel is not rollback proof. |
| Employee access and minimum required permissions | New TC-351 for layout-save denial; correct SPT-5552’s map-setting prerequisite | Reuse shared SPT-5075 for restricted event access; target-specific seat/GA endpoint denials and cross-organization payloads remain blocked pending controlled identities and a scoped API procedure. Do not infer those from visible buttons. |
| Existing-map attachment setup | Correct SPT-5554’s contradictory attached/no-map prerequisites | Same attach/reopen/geometry assertions and suite retained. |
| GA resale, selection toolbar, ticket colors, numeric map boundaries, save error/retry and concurrent editors | Existing cases retained; remaining variants deferred/blocked as detailed in the earlier ledgers | Need exact controlled resale relationship, measurable timing/size limits, supported fault setup and expected conflict behavior. No invented rejection or all-or-nothing v2 rollback. Also review misleading success feedback: MapSaveCommander catches command errors while Spaces.js reports success after its promise resolves; that source concern has not been reproduced live. |
| Modern editor, Basic tier, mobile/touch, physical devices and navigation from the actual landing page | Deferred parity/access review | Current React route uses a separate builder/assigner and rejects Basic tier. Legacy observations do not execute modern controls. Shared navigation definitions do not prove a live migration path. No replacement navigation is called Passed. |
| Purchase, one charge, fee earnings, last-seat/GA contention, callbacks and release | Blocked downstream proof; keep owning Core references below | Map/permission saves do not clear these gates. No purchase, hold, generator, background job, payment or cleanup mutation executed. |

**Minimum execution order:** clean SPT-752/5536/755 and SPT-757/5545; then TC-343/344/346 and SPT-5544/5546/5556; then TC-341/342/345/347/348/351 and existing protected seat/area/resale cases; then detach/abandonment/name validation and the retained editor controls. Run both values of each removal parameter and all three limits separately. This is a future execution selection, not a pass report.

**Fresh Qase read:** SPT; 2026-10-17 05:19:56–05:20:07 UTC (October 16, 22:19–22:20 PDT). **2,021 unique cases / 21 pages**, **317 unique suites / 4 pages**, stable API totals and unique IDs checked. 47 scoped cases: suites 82 and 1184 under 1132; none directly in 1132. Local full-field filter over titles, descriptions, preconditions, postconditions, steps, parameters and tags: seat/seating/venue layout/map editor/layout editor/GA location; **281 candidates**. Candidate matches are not adequate coverage by themselves. Compared all scoped definitions and relevant neighboring purchase, membership, access and lifecycle definitions; no equivalent focused definition was found for TC-339–TC-351. Temporary snapshot and retrieval metadata remain under /private/tmp; no new publication receipt is implied.

**Source revisions rechecked:** backend b5f397a0438910435e0d537f47e12d6064d7e019 (feature/nextjs-page-opt-in-banners); frontend 7e527b0285349e5d9537731f97f09b414001778c (develop); Playwright 26a96f07848eadf7852d3a706fabd66b4800bcde. Local working-tree source was read; no branch diff, fetch, pull or checkout mutation. The neighboring full-field refresh included SPT-5075, SPT-2888, SPT-4401, SPT-3186 and SPT-4074: the latter still has an empty final expected result and no independent service-fee earnings proof. Main anchors: backend location_seat_persistence.py:55–96, serializers/spaces.py:25–45, seating_permissions.py:199–242 and 425–460, managers/seating_management.py:34–60, seat_permission_assignment_service.py:94–129, location_permission_configuration_admission.py:111–129, and serializers/events.py:1192–1207. Legacy controls/save rules: core/tickets/seating.js:1316–1416 and 1549–1606; ticket-assigner-map.controller.js:650–738, 759–871 and 952–986; _editor.html and __ticket-assigner-map.html. Modern route and EventSeatingPricingTierGate were rechecked separately. These are source references, not execution evidence. Playwright’s assigned-seating event flow exercises purchase and Void, not these editor mutations; no automation was run or credited for them.

**Non-saving browser enrichment in this request:** existing demo.showpass.com tab, signed-in Christian Valdez, Berry Bonanza Hockey recurring parent. Assigned Seating showed map Strawberry Rink; Edit Space opened Edit Seat Map with Layout name, Layout Editor/Seat Editor, Seat Score View, Seat Settings, Manage Grid, Section, background control, Save and Cancel, and totals **4,205 seats / 378 areas**. Returned with Cancel without changing fields or clicking Save. Organization identity, granted permissions and deployed revision were not independently verified, so the session supplies labels and navigation only; it does not establish authorized-role behavior, persistence or a product defect. Earlier screenshots/history below are retained separately.

**Local verification:** the reusable Markdown-to-Qase parser accepted all 67 case sections with nonempty steps/results and standalone fields; all 13 new drafts have approved tags. Compared with the saved pre-edit note, exactly six existing case blocks changed and all 48 other case blocks were retained verbatim. Whitespace checks passed. This was local parsing only, without a Qase write preview or apply operation.

**Preservation:** current SPT-5537’s proposed On/Off enhancement is retained. Six further local enhancements preserve all current step purposes, supported Desktop Dashboard context and existing parameter values; SPT-5544/5556 add a second-type run, SPT-5546 retains 5 and adds 1/10 plus event isolation, and SPT-5541 retains Blank/Duplicate. SPT-5552 corrects required map-write access; SPT-5554 removes only the impossible attached-map setup. Existing tags, IDs, historical publication evidence and unrelated notes are retained. All 13 additions have approved tags, complete standalone fields and visible navigation steps. No Qase write plan or apply command was executed.

## Presence only

Keep SPT-5072 in [[03 Test Cases/Events/00 Create and shared checks/Navigation and permissions]] as the shared navigation check. An eligible event must expose Seating; a recurring child requires an assigned map. Opening the destination does not execute the map/permission cases above. This replaces the earlier note’s presence-only scope with detailed, separately accounted coverage.

Navigation source: [seating navigation gates](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>).

## Coverage, preservation and remaining decisions

| Existing case or proof target | Decision and evidence |
| --- | --- |
| SPT-752/755 broad map, assignment, grid and anchor flows | Enhance into focused map/area cases. Preserve curve checks in 3178, snapping in 3183, handles in 3181, assignment in 757/3184, and saved display settings in SPT-5552/319. No assertion is silently discarded merely because a folder changes. |
| SPT-753 and SPT-754 medium/large mixed cases | Preserve full definitions and move to Assign Permissions, their principal existing stated workflow. They overlap each other and the map-scale checks: consolidation candidates, not safe deletion targets. Reuse their medium 300–4500 and large >4500, complex ticket-type and bulk-assignment dimensions in a later reviewed consolidation; no new size-only case added. |
| SPT-2358 large-map creation | Preserve in Create Map. Still needs a named test machine/browser and agreed action/save timing budget before any measured performance pass. No large-map stress run executed on the laptop. |
| SPT-2937/3392 manual scores and score display | Enhance exact flags, selected/control seats, reopen proof and the original 500+ seat/repeated-toggle smoke. A responsive display is not proof that Best Available chooses the correct seat. |
| SPT-3183 seat dragging | The original wording implies independently moving a seat. Seat geometry is generated by row layout in the inspected model; do not pretend a seat-specific transform was verified. Keep endpoint/curve/area/section-point coverage; standalone seat-drag support remains a source/requirements question before adding it as a runnable step. |
| SPT-3386 offset calculation | Correct Offset 5 to labels starting at 6, backed by createSeats identifiers. Preserve Capacity, Offset and Step in normal/reversed runs with exact expected sequences. |
| SPT-3393 contiguous Shift-click assumption | Source adds explicitly clicked sections. Proposed enhancement corrects the expectation to A+D without implicitly selecting B/C, and retains reposition/persistence proof. If a product requirement promises range selection, treat that conflict as a separate defect decision rather than assuming current behavior is correct. |
| SPT-3394 selection boundaries | Enhance using the inspected inclusive bounding-box collision rule and state-specific eligible families. Keep the 1000+ element responsiveness context; no numeric latency claim without an agreed budget. |
| SPT-3395 malformed data, interrupted saves and memory stress | Preserve existing case, but execution is Blocked until engineering supplies controlled malformed input/failure preparation, an agreed supported size and measurable criteria. Its “either error or partial load” and “ideally” results are not pass criteria. Legacy v2 command batches can partly succeed; never promise all-or-nothing rollback for the entire batch. Track which command actually persisted before recovery. V3 atomic batches require separate API coverage. |
| SPT-3407 AI scoring | Preserve in Create Map; Blocked for execution until the actual AI configuration, approved prompt/data, completion deadline and scoring acceptance criteria are prepared. The existing “plausibly reflects intent” assertion cannot prove ranking correctness. Generate Scores starts work and was not clicked. |
| SPT-3408/3409 historical scoring | Preserve separately: Sales Count and Sales Order are distinct algorithms. Require known event histories, independently calculated expected ranks/ties and saved-result proof. Source includes no-history error and no-signal behavior that preserves current scores; missing-history, tied/no-signal and generator failure need backend regression targets rather than an invented manual setup. |
| SPT-3410 scoring access | Preserve flag-on/off purpose in Create Map. Both scoring modal access (enable_seat_score_generation_modal) and score-display access (enable_best_assigned_seating for the organization) need prepared states. No flags were changed in the observed session. |
| SPT-3499 combined upload, transform, delete, invalid type and fault injection | Retain upload/transform/reopen in enhanced 3499, move background removal to SPT-5542 and oversized rejection to SPT-5543. The source confirms a 5 MB client limit and accepted image chooser; independent server MIME enforcement and a supported network-failure setup were not established. Those two old conceptual branches remain Blocked, not silently called passed or made into fake runnable cases. |
| SPT-757/3184 assignment | Enhance Memberships-disabled regular ticket assignment and curved-row persistence, respectively. Their starting states and geometry regression intent remain distinct. |
| SPT-2988 resale guard | Move to Assign Permissions and enhance exact source error, reopen and preserved listing/order assertions. |
| Core create/save/assign/unassign/table/GA guards | New focused cases above. No new case duplicates scoring, mirroring, grid, anchors or unrelated membership administration. |
| Public hidden seats / accessible / limited visibility | SPT-5537 covers saved options. Actual customer/Box Office visibility differences, accessibility purchase rules and feature-off behavior remain separate runtime proof; do not equate saved flags with sales eligibility. |
| Map settings scope | SPT-5552 checks map-owned settings shared across events. SPT-5553 checks the event-owned no-isolated-seats choice. Runtime no-isolated-seat selection/release interactions stay in existing Core cases. |
| Employee permissions, plan gates and organization isolation | Backend writes require Manage Venue Layouts or Manage Organization Info for map changes; event permissions use Manage Events (seat service also supports membership management in its owning flow). Proposed manual prerequisites use the relevant employee permission. Restricted-role mutation attempts, cross-organization payload rejection and migrated pricing gates require separate approved account/API preparation; not executed or claimed as covered by visible buttons. |
| Map attachment/detachment | SPT-5554 attaches an existing map; 752 creates/attaches a new map; SPT-5555 checks the desktop remove guard. Mobile removal can remain visible and rely on server rejection, so its supported rejection path is Deferred separately. |
| Copy-to-another-organization, standalone organization map list and advanced v3 appearance/concurrency | Outside this event-page review. The underlying backend has those contracts; source-only references do not establish coverage or permit editing another organization's map. |
| Remaining canvas child controls | Zoom/pan are in 3392; section/group movement in 3393; compatible selection boundaries in 3394; handles in 3181; curves/grid in 3178/3183; full-table mixed selection in SPT-5557. Keyboard-only navigation, repeated same-seat selection, touch/pinch, undo/recovery, every rotated/mirrored boundary and unsupported mixed-family combinations remain Deferred to a controlled interactive matrix. No parent control is marked fully covered by one sample. |

### Financial and ownership release gates

Apply [[00 Start Here/World-Class Software Quality Standard#Financial and Core Transaction Gates]] and [[00 Start Here/World-Class Software Quality Standard#Service-Fee Revenue Through the Transaction Lifecycle]]. A saved map or green assignment cannot prove a seat can be sold safely or that Showpass receives the service fee.

| Required proof | Existing definition / remaining gap |
| --- | --- |
| Clean purchase after setup, exact seat/area, charge, fees and saved earnings | Reuse SPT-217 (Public) and SPT-4074 (Box Office), keeping them in their owning Core suite. Full fields of 217 were reviewed: its final Expected Result is empty and its generic payment wording does not independently prove service-fee earnings or one final charge. Enhancement is required before financial readiness; 4074 is a related reference only, not a full-field review in this request. Do not create a duplicate purchase case inside either dashboard suite. |
| Last-seat/GA contention, no duplicate ownership or charge | Reuse SPT-2856. Full fields reviewed: it covers occupied inventory, attempted over-allocation and release, but does not prove both payment outcomes under controlled contention. That financial/ownership proof remains Blocked until the existing Core case is enhanced and executed with two controlled customers. |
| Refund/Void/Exchange and expiry release | Reuse SPT-2864; full fields reviewed. State/reselect/history checks alone do not reconcile actual returned/retained fees and Showpass earnings. Actual policy-specific adjustment and payment proof remains required. |
| Packages and membership seats | Full fields of SPT-1152, SPT-2888 and SPT-4401 reviewed. Keep their distinct package/membership workflows in place; do not duplicate or move them into event-map setup suites. Package financial lines and fee allocation still require independent proof. |
| Best Available uses saved scores | Related SPT-3188 and suite 612 are references; no full-field review or execution claimed here. Score generation/display definitions cannot stand in for selection-algorithm proof. |

**Current decision: Decision blocked by named missing evidence.** No map or permission mutation, charge, purchase, refund, exchange, failure injection or contention was executed. None of the Qase cases is reported Passed by this analysis.

### Qase completeness and duplicate review

Project SPT snapshot: **1999 unique cases / 20 pages**, **316 unique suites / 4 pages**, completed **2026-10-17T04:42:50.419Z** (21:42 PDT, October 16). Stable API-reported totals and unique counts verified. Full scoped fields reviewed: all 25 cases under 1132/82; additionally 217, 2856, 2864, 2888, 4401 and 1152. Local full-field pattern filter found **199** broad seating/layout matches; that count is a candidate index, not a claim that every related workflow was fully reviewed. Filter: assigned seating, seat permissions, map/layout editor, venue layout, seat scores/maps and GA locations. Do not infer project-wide absence beyond the compared scope.

The existing small/medium/large rows and large-map performance cases overlap; preserve them until a consolidation decision explicitly accounts for each size, complex ticket type and performance assertion. No delete, repurpose or silent parameter removal is included. No multi-step purchase or membership case is moved merely because it mentions seats.

> [!info]- Sources reviewed
> * Backend active checkout: feature/nextjs-page-opt-in-banners at b5f397a0438910435e0d537f47e12d6064d7e019. Primary behavior: /Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/assigned_seating_and_permissions.md.
> * Map geometry and save guards: web-app/apps/venues/models/venue_management/seating_configuration.py; api/venue_based/serializers/spaces.py; api/venue_based/viewsets/spaces.py; services/venue_space/location_seat_persistence.py. Assigned/sold geometry cannot be treated as safe deletion input; legacy v2 command results and v3 batch semantics differ.
> * Permission assignment/removal: web-app/apps/tickets/api/venue_based/viewsets/seating.py; api/venue_based/serializers/seating.py; services/seating_management/seat_permission_assignment_service.py, seat_permission_unassigner.py, location_permission_service.py and location_permission_configuration_admission.py; models/seating_management/seating_permissions.py. These establish target/organization ownership, duplicate protection, child propagation and occupied/resale guards.
> * Legacy browser-facing source in web-app: apps/main/templates/tickets/events/manage/assigned-seating.html and seating-map-editor.html; apps/main/templates/venues/spaces/_editor.html, _background-image-modal.html and _ai-score-generation-modal.html; apps/main/static/src/core/generic/canvas-map.js; core/tickets/seating.js; generic/seating/Commands/MapSaveCommander.js; generic/seating/Components/ticket-assigner-map.controller.js; dashboard/tickets/controllers/Tickets.js. These establish exact controls, labels, score-view and public-hidden gates, offset arithmetic, selection semantics, automatic/immediate saves and separate GA Save.
> * Historical scoring: web-app/apps/venues/services/venue_space/historical_seat_score_generation.py and SeatAutoScoring/Deterministic.py. Those definitions were read, not executed; no-history/no-signal behavior and timing must be bound before scoring tests.
> * Frontend active checkout: develop at 7e527b0285349e5d9537731f97f09b414001778c. Read only migrated owning-route/navigation and permission gate references: features/events/constants/events-detail-routes.ts, event-seating-pages.ts, constants/dashboard-routes/events.ts and ui/pages/EventSeatingMapEditorRoutePage.web.tsx under /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/. This does not substitute Next.js behavior for the supplied legacy page. No branch/PR was supplied for this request, and no diff or checkout mutation was performed.
> * Selected handbook: [[00 Start Here/Showpass QA Handbook/Playbooks/04 Assigned Seats and Inventory]], [[00 Start Here/Showpass QA Handbook/03 Evidence and Expected Results]], plus the financial gates added to the canonical standard. Applied map versus sellability versus usage separation, independent capacity/ownership proof and linked financial outcomes.

### Browser observations — definitions are not executed proof

Existing demo tab, authenticated Christian Valdez, Berry Bonanza Hockey recurring parent, Strawberry Rink. The editor displayed **4205 seats and 378 areas**. Exact organization identity, employee permissions and feature-flag values were not independently verified. Opened Edit Space and returned with Cancel; did not edit geometry, click permission/settings toggles, run generators or select Save. No stress loop, new session, purchase or live mutation occurred. Displaying the map is not a save, ownership or financial pass.

![[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/map-editor-visible.png|500]]

*Demo event → Edit Space: visible map name, totals, Layout Editor/Seat Editor, Seat Score View, Manage Grid, Section and background controls; no edited record.*

![[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/permission-map-visible.png|500]]

*Demo event → Assigned Seating after returning: map and existing display-setting states. Permission writes remain unexecuted.*

### Write scope and preservation baseline

Original full case fields, suite/tags/priority/parameters and assertions are preserved in [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-before-25-cases.json]]. Snapshot completeness is in [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-snapshot-meta.json]]. The 17 applied updates preserve primary purposes; extracted assertions and source conflicts are accounted for above. The user explicitly approved this scope before apply. Existing IDs and all non-selected content and metadata were retained; SPT-753 and SPT-754 changed only suite_id.

| Qase ID | Applied action | Child suite | Steps | Parameters |
| --- | --- | --- | --- | --- |
| SPT-752 | Enhanced | Create Map | 5 | None |
| SPT-755 | Enhanced | Create Map | 4 | AreaShape = Standing / GA/Circle GA |
| SPT-3178 | Enhanced | Create Map | 6 | None |
| SPT-2937 | Enhanced | Create Map | 4 | None |
| SPT-3181 | Enhanced | Create Map | 4 | None |
| SPT-3183 | Enhanced | Create Map | 5 | SnapTarget = RowEndpoint/CurveControl/Area/SectionPoint |
| SPT-3384 | Enhanced | Create Map | 4 | Direction = Horizontal/Vertical; ReverseOrder = On/Off |
| SPT-3385 | Enhanced | Create Map | 4 | None |
| SPT-3386 | Enhanced | Create Map | 4 | Change = Capacity/Offset/Step; Order = Normal/Reversed |
| SPT-3387 | Enhanced | Create Map | 3 | None |
| SPT-3392 | Enhanced | Create Map | 4 | None |
| SPT-3393 | Enhanced | Create Map | 5 | None |
| SPT-3394 | Enhanced | Create Map | 4 | SelectionScope = Sections/RowsAndAreas/Seats |
| SPT-3499 | Enhanced | Create Map | 4 | ImageType = JPG/PNG/SVG |
| SPT-757 | Enhanced | Assign Permissions | 3 | None |
| SPT-3184 | Enhanced | Assign Permissions | 4 | None |
| SPT-2988 | Enhanced | Assign Permissions | 3 | None |
| SPT-5536 | Created | Create Map | 3 | TableShape = Round Table/Semi-Round Table/Square Table |
| SPT-5537 | Created | Create Map | 3 | SeatOption = Accessible Seating/Limited Visibility/Hide seat from purchase map |
| SPT-5538 | Created | Create Map | 3 | Element = Row/Section |
| SPT-5539 | Created | Create Map | 3 | Element = Row/Section |
| SPT-5540 | Created | Create Map | 3 | Element = Row/Section |
| SPT-5541 | Created | Create Map | 3 | InvalidName = Blank/Duplicate |
| SPT-5542 | Created | Create Map | 3 | None |
| SPT-5543 | Created | Create Map | 3 | None |
| SPT-5544 | Created | Assign Permissions | 3 | None |
| SPT-5545 | Created | Assign Permissions | 3 | None |
| SPT-5546 | Created | Assign Permissions | 3 | None |
| SPT-5547 | Created | Assign Permissions | 3 | None |
| SPT-5548 | Created | Assign Permissions | 3 | BlockingState = Held/Sold |
| SPT-5549 | Created | Assign Permissions | 3 | BlockingState = PendingBasket/ActiveHold/IssuedTicket |
| SPT-5550 | Created | Assign Permissions | 4 | None |
| SPT-5551 | Created | Assign Permissions | 3 | None |
| SPT-5552 | Created | Assign Permissions | 3 | Setting = AdvancedColors/AlwaysShow |
| SPT-5553 | Created | Assign Permissions | 3 | None |
| SPT-5554 | Created | Assign Permissions | 3 | None |
| SPT-5555 | Created | Assign Permissions | 2 | None |
| SPT-5556 | Created | Assign Permissions | 3 | None |
| SPT-5557 | Created | Assign Permissions | 2 | None |

**Retain without rewriting:** SPT-753, SPT-754, SPT-2358, SPT-3395, SPT-3407, SPT-3408, SPT-3409, SPT-3410. Their review limits and placement are recorded above. Native parameters are small behavior-changing sets; Platform/View stays in Description. Exact Qase writes require the approved scope, dry-run, stable helper and readback. No approval or fixture data is inferred from a successful page load.

**Publication and verification:** The user approved the exact scope. Suite and case dry-runs passed before apply. Renamed suite 82, created suite 1184, enhanced 17 cases, created 22 cases (SPT-5536–SPT-5557) and moved 5 existing cases; 753 and 754 were suite-only operations. All 41 case operations were read back, including full text, step actions/data/assertions, native parameters and destinations. Existing tags and unrelated case fields were preserved. The complete post-write snapshot contained **2,021 unique cases across 21 pages and 317 suites across 4 pages**, with stable totals; all 1,999 original project case IDs remain. Seating contains exactly two child suites with **28 + 19 = 47 cases**, and none directly in 1132.

**Evidence:** [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-approval.json|Approval record]] · [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-case-preview.json|Frozen approved preview and draft labels]] · [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-suite-apply.json|Suite receipt]] · [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-case-dry-run.json|Case dry-run]] · [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-case-apply.json|Case apply receipt and new ID mapping]] · [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-publish-verification.json|Full-field verification]] · [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/qase-after-47-cases.json|Saved full cases]]. The frozen approved source is retained as qase-approved-note.txt in the same evidence folder; the apply plan refers to this note's pre-publication labels.

**Execution status:** Publishing definitions does not prove the implementation passes. No map, permission, transaction or financial state was changed during this review. The financial/ownership gates and explicit legacy stress, scoring and overlap follow-ups above remain unresolved; no release approval is claimed.

## Seat Editor follow-up — coverage and evidence

**Qase completeness:** Reused the complete post-publication SPT snapshot retrieved 2026-10-17 04:59:15–04:59:26 UTC: 2,021 unique cases (21 pages), 317 suites (4 pages), stable totals. Searched full descriptions, preconditions, postconditions and step action/data/expected results locally across the project, then compared all 47 Seating cases. No additional network read or Qase write was needed. Existing package purchase cases mentioning seating options (2870, 3334, 4076) do not assert these editor behaviors; no purchase case is being moved or duplicated. This establishes definition gaps at that retrieval time, not current execution results.

| Control or proof | Definition decision | Execution / limit |
| --- | --- | --- |
| Rename existing layout / section / row or area | New TC-323, TC-337, TC-336 | Source-backed; not executed. Creation alone did not cover rename. |
| Map Seat size / Seat spacing, slider-number agreement and reopen | New TC-324 | Both controls observed at 6 and 4; saving unexecuted. |
| One-seat score / several-seat score / standing-area score | New TC-325 / keep SPT-2937 / new TC-326 | Distinct selection paths; no score changed. |
| Individual Accessible / Limited Visibility / public-hide options | Enhance SPT-5537 with explicit SavedState On/Off | All three existing options and the control-seat assertions preserved; 6 selected combinations. |
| Clear one seat, several seats or an area | New TC-327 | Source-backed; not executed. Clear is not delete or reset saved values. |
| Disable individual options during multiple-seat selection | New TC-328 | All three option controls disabled; bulk score still available. Not executed. |
| Eye control: temporary all-seat view | New TC-329 | Toggled on and restored; distinct from saved Always Show in SPT-5552. |
| Explicit Layout Editor / Seat Editor transition | New TC-330 | Seat Editor mode opened. Selected-seat panel verification remained inconclusive. |
| Section / row / table / area rotation | New TC-331 | Source-backed; four selected runs, not executed. |
| Hide location names saved state | New TC-332 | Configuration proof only; public map display and hover remain deferred until the exact deployed public consumer is traced. |
| Full purchase required saved state | New TC-333 | 3 table shapes × 2 states = 6 runs. SPT-5550 still owns assignment restrictions; purchase proof stays in Core. |
| Row spacing override | New TC-334 | Positive override 8 vs map default 4; no saved value changed. |
| Score and public-hide controls with gates on/off | New TC-338 | Exact organization gates traced; no live gate changed or independently confirmed. Generation-modal gate remains SPT-3410. |
| Spacing override Cancel / restore map default | Blocked expected-result and persistence review | Spaces.js toggleShowLocationSeatSpacing changes local spacing/show state but does not itself queue UpdateLocationCommand; Save flushes queued commands. Confirm intended Cancel behavior and persisted outcome before a runnable reset case. This is a source concern, not a confirmed live bug. |
| Row override 0 | Blocked boundary investigation | UI accepts 0, but canvas geometry uses location.spacing or map default through a truthiness fallback. With a nonzero map default, zero may render as default. No zero was entered; establish intended meaning and saved/rendered outcome. |
| Other blank/invalid/boundary inputs | Existing section invalid-name case SPT-5541 retained; remaining validation deferred | Layout name 32, section name 14, Location Name 6; seat size slider 3–12 (legacy lower values possible), quarter steps; spacing slider 0–100 while number field has no upper limit. Do not invent uniform backend limits or acceptance messages. Blank/whitespace/duplicate location rules, capacity below 1, offset/step invalid values, and numeric paste require a dedicated validation pass. |
| Manage Grid / pan / zoom | Existing SPT-3183 and SPT-3392 retained; grid layer order manual-only, unexecuted | Zoom in/out observed and restored. Grid above/below controls change drawing order only; no claim that they persist. Normal view pan/zoom remains a manual-only smoke follow-up. |
| Row endpoints / curves / duplication / background / deletion | Existing definitions retained | SPT-3178, 3181, 3183, 3384–3387, 3393–3394, 3499, 5536, 5538–5543. Area/table delete and duplicate variants require preservation review before broadening existing Row/Section parameters; not silently counted as covered. |
| Saving, Auto-saving, retry, cancel and stale concurrent editors | Existing success cases retained; failure/concurrency proof blocked | Field changes may save automatically. Cancel is not assumed to roll back prior writes. Bind exact failure setup, recovery result and concurrency behavior before adding executable cases. |
| Employee access, cross-organization isolation, mobile/touch and migrated UI | Deferred from this editor follow-up | Shared navigation case SPT-5072 is referenced, but it is not proof of backend mutation denial or every editor control on those clients. No Next.js page substituted for this legacy review. |
| Purchase, fee earnings, one charge, ownership and overselling | Previous Core gates remain open | Editor settings and visible seat colors do not establish these results. |

**Source review:** Same backend/frontend revisions as the first review. Additional exact paths: web-app/apps/main/templates/venues/spaces/_editor.html; apps/main/static/src/dashboard/venues/controllers/Spaces.js (mode, score view, row-spacing Cancel); core/tickets/seating.js (score, space, rotation, rename and spacing command creation); core/generic/canvas-map.js (mode, selection, all-seat viewing, geometry spacing and grid); core/generic/seating/Commands/Space/UpdateSpaceCommand.js, Locations/UpdateLocationCommand.js and Sections/UpdateSectionCommand.js. Backend Space/Location/Seat fields and score bounds: apps/venues/models/venue_management/seating_configuration.py; full/v2 serializers in apps/venues/api/venue_based/serializers/spaces.py and mutation permission map in viewsets/spaces.py. Selected handbook: Assigned Seats and Inventory, including hidden versus blocked seats and configuration versus ownership proof.

**Browser facts:** Existing demo tab, authenticated Christian Valdez, Berry Bonanza Hockey recurring parent, Strawberry Rink. Explicitly selected Seat Editor, expanded Seat Settings (Seat size 6, Seat spacing 4), toggled the temporary all-seat view, turned Seat Score View on and off, and zoomed in/out. Restored score view off and the original zoom; left Seat Editor selected with Seat Settings expanded. Attempts to select individual canvas seats did not expose a selected-seat panel, so single/group/area controls are source-backed and not claimed as observed. This is inconclusive selection inspection, not a confirmed selection defect. Organization identity, role permissions and flag values remain unverified. No field value, score, geometry, assignment, flag or transaction was changed; Save, generators and purchase were not used.

![[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/seat-editor-followup.png|500]]

**Write boundary:** The previous approval was completed with the 47-case publish. These 15 creates and the SPT-5537 parameter enhancement require their own exact-scope dry-run and user confirmation before any Qase apply. Local labels are not Qase IDs.

**Local follow-up review:** All 15 new drafts passed the reusable Qase parser with complete standalone fields, the intended parameters and step counts. SPT-5537 retains all three options, its existing tags, step count and control-seat assertions, with explicit On/Off runs added. All other published draft fields were compared against the saved 47-case snapshot and remain unchanged. [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/seat-editor-followup-parser-review.json|Parser and preservation review]].

**Follow-up push status:** Exact 16-operation batch dry-run passed: create TC-323–TC-334 and TC-336–TC-338 in Create Map (82), enhance only Preconditions, Steps and Parameters of SPT-5537. The apply command was rejected by automatic approval review before execution because exact-batch confirmation is required after the preview. No follow-up Qase changes were made; all 15 candidates remain local drafts and SPT-5537 remains unchanged in Qase. [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/seat-editor-followup-dry-run.json|Exact dry-run]] · [[03 Test Cases/Events/02 Manage/evidence/seating-review-2026-10-16/seat-editor-followup-approval.json|Approval state]].
