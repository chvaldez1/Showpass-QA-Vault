---
title: Membership Benefit Seating Permissions Test Cases
date: 2026-07-23
tags:
  - qa/test-cases
  - memberships
  - assigned-seating
aliases:
  - Membership Seat Map Regression Cases
---

# Membership Benefit Seating Permissions Test Cases

## Testing Intent

We are testing whether an organizer or venue employee can assign and reassign membership levels to seats and general-admission sections from the Membership Benefits page while seat ownership and capacity permissions remain accurate; this matters because an incorrect map can offer the wrong membership inventory or block ticket distribution, and we will prove it by reopening the map and confirming the saved level, seat, section, capacity, and assignment counts.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Inventory/ownership and permission boundary |
| Business invariant | Every seat or general-admission capacity belongs to the intended membership level for the selected issue-ticket benefit, and a saved or rejected change must not silently alter another level's assignment. |
| User or business impact | Organizers and venue employees may distribute the wrong seats, expose incorrect membership inventory, or be unable to distribute member tickets. |
| Failure mode | The refactored map loses existing assignments, saves the wrong level, removes sold inventory, omits levels, misstates capacity, or makes navigation and selection controls unusable. |
| Observable proof | The map shows the expected level color and assignment count, saved checkboxes and capacity values survive reopening, rejected changes remain unchanged, and the benefit no longer prompts for seat assignment after a valid assignment exists. |
| Source of truth | Frontend route, modal, seating-service, and UI components; backend seat/location permission endpoints, validation, services, and API tests. |
| Primary surfaces | Dashboard Membership Benefits on WebBoxOffice Desktop |
| In scope | Every UI entry point into benefit seating; initial loading and component rendering; develop-builder geometry compatibility; map navigation; resize behavior; level-list visibility; single-, additive-, and drag-selection; full-purchase tables; general-admission sections; assign, unassign, and reassign; capacity; inline level creation; immediate versus staged persistence; API failure recovery; sold-assignment protection; route authorization; completion gate. |
| Out of scope | Public membership checkout, Widget, Box Office sale completion, benefit creation fields unrelated to choosing an assigned-seating map, member renewal/transfer, generated ticket batches beyond the handoff, and seat-map layout editing. |
| Confidence | Medium-high — the current main consumer, develop producer, shared renderer, and backend rules were traced. Confidence is reduced only for source-undefined load failures, keyboard behavior, and the Manage Memberships versus Manage Events mismatch. |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| Existing seat and section assignments load without loss | A map refactor must preserve current inventory ownership. | TC-1 |
| Every entry point and screen component renders | A regression in the page, action prompt, modal shell, footer, or assigner can block the entire flow. | TC-12 |
| Develop-builder maps render correctly in the membership consumer | New geometry and display metadata must remain selectable after the builder migration. | TC-13 |
| All map navigation and selection controls remain usable | An organizer must be able to reach and select inventory on maps of different sizes. | TC-2, TC-3, TC-14 |
| Seat assignment, removal, and reassignment persist for the intended level | Wrong-level ownership can expose or withhold membership inventory. | TC-4, TC-5, TC-18 |
| Benefits sharing a map remain isolated | A mutation for one issue-ticket benefit must not leak into another benefit using the same seat IDs. | TC-19 |
| Table and general-admission rules remain enforced | Full-table rules, multi-level GA allocation, and capacity limits prevent invalid inventory allocation. | TC-6, TC-7, TC-14, TC-15 |
| Rejected writes do not leave false UI or persisted state | A failed request must not make an organizer believe inventory changed. | TC-16 |
| Immediate and staged changes have explicit close behavior | Closing the modal must not blur the difference between already-saved seats and unsaved GA edits. | TC-17 |
| Supporting workflows do not lose map state | Creating a level or completing the modal must not discard valid assignments. | TC-8, TC-9 |
| Protected assignments and route permissions cannot be bypassed | Sold inventory and unauthorized venue data must remain protected. | TC-10, TC-11 |

## Summary of Behavior Under Test

The route `/manage/memberships/{group id}/benefits/` lists benefits for one membership group. Editing an assigned-seating issue-ticket benefit, or selecting **Assign levels to seats**, opens a full-screen **Reserved seating benefit** step. The map loads every membership level in the group, current seat and general-admission permissions, and seat usage for the benefit.

Selecting seats or a general-admission section opens **Assign Levels**. Seat checkbox changes save immediately. General-admission checkbox and **Max capacity** changes are staged until **Save** is selected. The footer **Done** or **Next** control stays disabled until at least one seat or location permission exists.

## Branch Comparison and Changed Behavior

The frontend working tree is on `main` (`529192f24584c4df49b53e0e9750962bccf519ba`), while the remote-tracking/local `develop` ref reviewed for this analysis is `0151ff966ca8fe63a33701f16244541a676211a7`. The comparison was read-only; no branch was checked out and no files were changed in either application repository.

The develop migration commit `fcbef556cc` (`feat (dashboard) | migrate assigned seating builder - SPW-19360`) does not substantially rewrite the membership seating-assigner components. It changes the upstream map builder and shared seating model that feed them. The important compatibility boundary is therefore:

`develop assigned-seating builder → serialized venue space → shared seating renderer → existing membership benefit permission UI`

Source review identifies these newly migrated or newly explicit map states that must survive that boundary:

- Straight and curved rows, including inverted seat order.
- Round, semi-round, and square full-purchase tables, including mirrored seat layout.
- Standing rectangular and circular general-admission locations.
- Translated, rotated, and flipped segments and locations.
- Segment outlines, location names, hidden location names, and background imagery.
- Accessible, limited-visibility, and hidden-public seat flags.
- Configured seat size/spacing and always-display behavior.

This is broader than a changed-file smoke. TC-13 proves the migrated builder output renders and remains interactive in the unchanged membership consumer; the rest of the set proves that the consumer's existing permission behavior did not regress.

## Glossary

- **Membership level:** A purchasable option inside a membership group, such as Gold or Silver.
- **Issue-ticket benefit:** A membership benefit that can later distribute event tickets to members.
- **Seat permission:** A saved link that makes a specific seat available to a membership level through the selected benefit.
- **General-admission section:** A map area with capacity rather than individually numbered seats.
- **Full-purchase table:** A table whose seats must be selected and assigned together.

## Sources Reviewed

### Vault Guidance

- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]

### Frontend

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/manage/memberships/[id]/benefits.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/constants/memberships-group-detail-config.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/pages/detail/MembershipGroupBenefitsPage.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/benefits-table/MembershipBenefitsTable.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/benefits-table/Batches.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/benefits-table/AssignLevelsToSeats.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/benefit-modal/MembershipBenefitModal.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/benefit-modal/screens/MembershipBenefitReservedSeatingScreen.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/benefit-modal/screens/MembershipBenefitReservedSeatingScreen.test.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/hooks/useAllMembershipLevels.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/seating-assigner/ItemAssignerMap.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/seating-assigner/ItemAssignerButtons.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/seating-assigner/SeatPermissionAssigner.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/seating-assigner/LocationPermissionAssigner.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/seating-assigner/LocationCapacityInput.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/seating/services/SeatingService.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/seating/services/StageService.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/seating/factories/RowFactory.ts` on `main` and `develop`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/seating/contexts/useSeatingState.tsx` on `main` and `develop`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/seating/repositories/VenueBasedSpaceRepository.ts` on `main` and `develop`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/assigned-seating-builder/domain/model/entities.ts` on `develop`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/assigned-seating-builder/domain/model/location-family-definition.ts` on `develop`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/assigned-seating-builder/translation/backend/contracts/dto.ts` on `develop`

### Backend

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/seating_management/seating_permissions.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/seating_management/location_permission_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/seating_management/seat_permission_assignment_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/seating_management/seat_permission_unassigner.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_assigned_seating.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_location_permissions.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_tt_seat_permission_assignment.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_seat_permission_venue_ownership.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/assigned_seating_and_permissions.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/membership_issue_ticket_benefits_and_batches.md`

### Automation Patterns

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/memberships/components/MembershipBenefitModal.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/membership/`

No Qase data was queried or changed. A read-only `main...develop` comparison and targeted commit inspection were used after the develop migration was explicitly raised; no branch checkout or application-repository write was performed.

## Assumptions and Unknowns

- The executable baseline employee has both **Manage Memberships** and **Manage Events** so both seat and general-admission changes are authorized.
- **Edit** is available from the benefit action menu for the assigned-seating issue-ticket benefit.
- A map color represents a membership level consistently; exact colors are data-driven and should not be asserted by name.
- A develop-built test map can be saved in an environment where the membership benefit permission flow can consume it.
- Hidden-public seats are expected to remain visible to an authorized Dashboard employee because the organizer permission read uses `allPermissions`; public-customer visibility is outside this case set.
- The visible assignment count is interpreted as assigned inventory over the level's configured inventory.
- The source does not define a user-visible error state when the space, permission, usage, or membership-level reads fail during initial map loading.
- Keyboard selection and screen-reader behavior for seats and general-admission sections are not established in the reviewed map code.
- The location UI allows a numeric value from 1 through the section's capacity, but the reviewed backend validation explicitly rejects only values above capacity; confirm whether zero or a negative value must also be rejected server-side.

## Source-Backed Behavior

- The Benefits route requires the Memberships module and the employee permission **Manage Memberships**.
- Only a group-level issue-ticket benefit can use assigned seating; a level-specific issue-ticket benefit shows general admission only.
- The assigned-seating map is selected before the permission screen opens.
- The develop builder models rows, round tables, semi-round tables, square tables, standing GA, and circle GA as distinct location families. Tables require full purchase.
- The shared renderer consumes location transforms and display state, including curved/inverted rows and mirrored table seat positions.
- The shared stage can render segment geometry, location names, seat flags, background images, and configured seat-display behavior.
- The map reads the complete membership-level list in pages of 200 and waits for every page before rendering levels.
- Existing seat and location permissions are loaded with the membership benefit ID and `allPermissions`, including unavailable assignments needed for organizer editing.
- Seat and location mutation payloads carry the selected membership benefit ID; backend lookup, duplicate validation, deletion, and location replacement are scoped to that benefit.
- Selecting a seat clears any general-admission selection; selecting a general-admission section clears selected seats and any prior section selection.
- Holding Shift while dragging creates a multi-seat selection rectangle. Full-purchase table seats are automatically selected as a complete table.
- Seat assignments are created or removed immediately when a level checkbox changes. On a failed seat request, the frontend restores its prior in-memory permission map and displays an error.
- General-admission changes are staged and submitted together with **Save**. The save response refreshes permission IDs and the section display.
- General-admission **Max capacity** defaults to the section capacity and is limited in the UI from 1 to that capacity.
- The backend requires each seat assignment request to target one membership level and one benefit from the same membership group and one seating space.
- The backend rejects removing a seat or general-admission assignment after a membership has been sold against it.
- The level list can be shown without selecting inventory; checkboxes are hidden until a seat or section is selected.
- **Create Level** opens an inline membership-level modal; after a successful create, all levels are refetched and existing assignment state is retained.
- The map provides show/hide seats when the map is below the display threshold, show/hide level list, pan in four directions, zoom in, zoom out, center, and clear-selection controls. The stage also supports pointer drag-pan and mouse-wheel zoom.
- **Done** or **Next** is disabled until at least one seat or location permission exists.

## Risk Areas

- Existing permissions may render with missing or incorrect level colors after the map refactor.
- A valid develop-built map may save successfully but render with missing, duplicated, displaced, reversed, or unselectable components in the legacy membership consumer.
- Mirrored tables and inverted/curved rows are especially vulnerable because seat order and displayed position can diverge from backend seat identity.
- A transformed or flipped GA location may render but have a stale or offset click target.
- Hidden-public seats may be incorrectly omitted from the authorized organizer view, preventing existing permissions from being managed.
- A multi-seat selection may include a seat that was not visibly selected or omit a selected seat.
- Switching between numbered seats, full-purchase tables, and general-admission sections may leave stale selections.
- Reassigning a seat may leave both levels assigned or remove the wrong level.
- General-admission save replaces the benefit's complete location-permission set; stale client state could remove an unrelated section assignment.
- Two benefits can reference the same venue map, so a missing benefit filter could display or mutate another benefit's permission for the same seat or section.
- Concurrent GA editors can submit different full replacement maps; no source-backed conflict or stale-write warning was found.
- A failed general-admission save does not visibly restore the prior in-memory map in the reviewed component, unlike seat assignment failure.
- Large groups may show an incomplete level list if later pagination requests fail.
- Sold membership inventory must not become reassignable.
- Page-level and API-level employee permissions are inconsistent for general-admission changes.
- Closing the full-screen modal before completing the flow may leave immediately saved seat changes in place; no discard confirmation is source-backed.

## Coverage Decisions

- Separate seat, full-purchase table, and general-admission cases are included because their selection and save behavior differ.
- Sold seat and sold general-admission removal are combined through a parameter because they prove the same ownership invariant, while the steps preserve each control's save behavior.
- Map navigation is one focused regression case because those controls change only the viewport and must not change assignments.
- Public checkout and ticket generation are excluded from the minimum set because this request targets permission editing; one downstream automated smoke is recommended to prove that saved permissions remain consumable.
- Pairwise geometry plus interaction coverage is used instead of multiplying every level by every map shape. Every supported location family is still required in TC-13.
- Visual render coverage and permission-mutation coverage remain separate proof targets: a component is not considered covered merely because it is visible, and a successful API call does not prove the correct seat was clicked.
- Source-undefined interactions are not silently omitted; they are listed in the Interaction Accountability Matrix and Open Questions.

## Interaction Accountability Matrix

| Interaction or State                                                            | Expected Coverage                                                                           | Case or Disposition        |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------- |
| Benefits page route, group heading, benefit table, existing-benefit action menu | Each entry component renders and leads to the correct benefit.                              | TC-12                      |
| **Assign levels to seats** prompt                                               | Opens the same reserved-seating screen when a benefit lacks permissions.                    | TC-12                      |
| Create/edit benefit map-selection step                                          | Selected venue map opens in the permission screen.                                          | TC-12                      |
| Loading overlay and completed map shell                                         | Loading resolves into title, map, controls, footer, and close control.                      | TC-1, TC-12                |
| Existing seat/GA hydration, colors, counts, capacity                            | Persisted ownership is unchanged on first load and reopen.                                  | TC-1                       |
| More than 200 membership levels                                                 | Final page is present before the assigner is usable.                                        | TC-1                       |
| Straight/curved/inverted rows                                                   | Geometry, label order, click target, and selected seat identity agree.                      | TC-13                      |
| Round/semi-round/square tables, normal and mirrored                             | Shape and seat position render; a clicked seat selects its whole correct table.             | TC-13, TC-14               |
| Standing and circle GA                                                          | Shape, name, click target, and selected section identity agree.                             | TC-13                      |
| Segment outline/name, hidden location names, transforms, background             | Configured visual state renders without covering or displacing interactive inventory.       | TC-13                      |
| Accessible, limited-visibility, hidden-public seats                             | Organizer markers/visibility and selection remain correct.                                  | TC-13                      |
| Zoom in/out, four-direction pan, center                                         | View changes without changing selection or saved permissions.                               | TC-2                       |
| Mouse-wheel zoom, pointer drag-pan, segment hover                               | Direct canvas interactions change only the view/highlight and remain aligned.               | TC-2                       |
| Show/hide seats below threshold; absent above threshold                         | Conditional control and visibility are correct.                                             | TC-2                       |
| Show/hide level list                                                            | Read-only counts without selection; checkboxes only with selection.                         | TC-2, TC-8                 |
| Browser/container resize                                                        | Map recenters and remains interactive without duplicate/missing components.                 | TC-2                       |
| Single-seat select/toggle, additive click, clear                                | Selection accurately follows each control.                                                  | TC-3                       |
| Shift-drag regular seats                                                        | Exactly enclosed regular seats are selected.                                                | TC-3                       |
| Seat ↔ GA switching and GA ↔ GA switching                                       | Previous incompatible selection clears.                                                     | TC-3, TC-15                |
| Mixed Shift-drag across regular seats and full-purchase tables                  | Full-purchase rules are preserved; no partial table is retained.                            | TC-14                      |
| Multiple full-purchase table selection and per-table deselection                | Complete tables remain independently selectable.                                            | TC-14                      |
| Regular-seat immediate create/delete                                            | Overlay, feedback, color, count, and persistence agree.                                     | TC-4                       |
| Bulk selection with mixed existing seat permission state                        | Only missing permissions are created; a later removal applies to the complete selected set. | TC-18                      |
| Two benefits sharing the same map                                               | Reads and writes remain scoped to the selected membership benefit.                          | TC-19                      |
| Regular seat assigned to multiple levels                                        | Both supported assignments persist; removal of one preserves the other.                     | TC-15                      |
| Reassign Level A to Level B                                                     | Target changes and unrelated control inventory does not.                                    | TC-5                       |
| Full-purchase purchase-limit and single-level restrictions                      | Incompatible levels are disabled and one level owns the whole table.                        | TC-6                       |
| GA staged add/update/remove and multi-level capacities                          | Full replacement save preserves all intended sections and capacities.                       | TC-7, TC-15                |
| Seat request rejection, GA capacity rejection, GA save rejection                | UI and persisted state return to the last successful state.                                 | TC-16                      |
| Inline **Create Level**                                                         | New level appears without map/permission loss and can be assigned.                          | TC-8                       |
| Empty-permission completion gate and Done/Next outcomes                         | Cannot continue empty; correct close or batch-manager outcome occurs after save.            | TC-9                       |
| Close with saved seat versus unsaved GA edit                                    | Immediate seat persists; staged GA edit does not.                                           | TC-17                      |
| Sold seat/GA removal                                                            | Rejected without changing ownership.                                                        | TC-10                      |
| Missing **Manage Memberships**                                                  | Route and actions remain unavailable.                                                       | TC-11                      |
| Manage Memberships without Manage Events on GA save                             | Product expectation is inconsistent in source.                                              | Blocked by Open Question 1 |
| Initial read failure and retry                                                  | No source-backed user-visible contract was found.                                           | Blocked by Open Question 2 |
| Keyboard and screen-reader canvas operation                                     | No source-backed interaction contract was found.                                            | Blocked by Open Question 5 |
| Zero/negative GA capacity                                                       | Server/UI contract is unclear.                                                              | Blocked by Open Question 4 |
| Concurrent GA edits in two sessions                                             | No source-backed conflict-resolution contract was found.                                    | Blocked by Open Question 9 |

## State-Space / Setup Matrix

| Axis | Minimum Values | Extended Values | Why It Matters |
| --- | --- | --- | --- |
| Map producer | Existing pre-migration map | Map saved by the develop builder/V3 path | Separates general regression from the actual producer-consumer migration boundary. |
| Inventory shape | Numbered seats; one general-admission section | Full-purchase table; multiple segments | Exercises distinct selection and persistence paths. |
| Builder location family | Straight row; standing GA | Curved/inverted row; round/semi-round/square table; circle GA | Proves every migrated family is consumable by membership assignment. |
| Display transform | Default position | Rotated, translated, flipped, mirrored | Detects visible-shape versus click-target drift. |
| Seat display state | Standard seat | Accessible; limited visibility; hidden public | Detects filtered or incorrectly marked organizer inventory. |
| Initial permission state | Unassigned; assigned to Level A | Assigned to Level B; mixed assignments | Proves create, remove, reassign, and initial load. |
| Membership sale state | Unsold | Sold against seat; sold against section | Sold assignments are protected by backend rules. |
| Level data | Two levels | More than 200 levels; newly created level | Detects pagination and refresh regressions. |
| Level purchase limit | Supports table size | Lower than table size | Full-purchase tables disable incompatible levels. |
| Section capacity | Full capacity; custom valid capacity | Above capacity; zero/negative pending clarification | Validates inventory limits and error handling. |
| Employee permission | Manage Memberships + Manage Events | Manage Memberships only; no Manage Memberships | Captures current page/API permission boundaries. |
| Map size | Below seat-display threshold | At or above threshold | The show/hide-all-seats control is conditionally available. |
| Season-batch flag | Off | On | Footer advances to close or ticket manager, respectively. |

## Recommended Test Data

- One venue with the Memberships module enabled.
- Employee A with **Manage Memberships** and **Manage Events**.
- Employee B without **Manage Memberships**.
- Optional Employee C with **Manage Memberships** but not **Manage Events** for the open permission question.
- One membership group with:
  - Level A with inventory at least 20 and purchase limit at least the full table size.
  - Level B with inventory at least 20.
  - Level C with a purchase limit lower than the full table size.
  - An assigned-seating issue-ticket benefit tied to the test map.
- A seating map containing:
  - A straight row and a curved row with inverted seat order.
  - At least four individually selectable seats across two segments.
  - Round, semi-round, and square full-purchase tables; at least one table uses mirrored seat layout.
  - A standing rectangular general-admission section and a circular general-admission section, each with capacity 20.
  - At least one rotated or flipped segment and one transformed location.
  - A background image, one hidden location name, and one visible location name.
  - One accessible seat, one limited-visibility seat, and one hidden-public seat with recorded backend labels/IDs.
- One unsold seat and one unsold general-admission section assignment.
- One membership sold using a dedicated seat permission and one membership sold using a dedicated general-admission permission; keep these separate from reusable unsold data.
- Optional large group with at least 201 levels.

## Qase-Ready Manual Test Cases

### TC-1: Dashboard - Memberships - Verify existing seating permissions load unchanged

**Priority:** High  
**Type:** Regression  
**Area:** Membership benefit assigned seating

**Description:** Validates that an organizer can open an existing assigned-seating issue-ticket benefit and see every saved seat and general-admission assignment for its membership levels without the refactored map losing or changing ownership.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is signed in to the correct venue.
- The benefit has one seat assigned to Level A and one general-admission section assigned to Level B with a custom capacity of 10.
- For MoreThan200Levels, the group has at least 201 levels and the expected final level name is recorded.
- Record the expected assigned counts for Level A and Level B.

**Postconditions:** No permissions are changed.

**Tags:** dashboard, memberships, assigned-seating

**Parameters:**  
LevelListSize: StandardTwoLevels, MoreThan200Levels

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard Memberships, open the test membership group, and select **Membership Benefits**. | Test membership group | The Benefits page shows the group name and its benefit list. |
| Open the assigned-seating issue-ticket benefit through **Edit**, or select **Assign levels to seats** when that prompt is present. | Assigned-seating issue-ticket benefit | The **Reserved seating benefit** screen opens and shows **Loading Seating Map** while data loads. |
| Wait for the map to finish loading. | — | The seating map appears without a partial level list or indefinite loading state. |
| Open the membership-level list and review its final expected level. | Selected LevelListSize | Every configured level is available, including the recorded final level for MoreThan200Levels. |
| Select the preassigned seat. | Seat assigned to Level A | **Assign Levels** shows Level A selected and displays its expected assigned count. |
| Clear the selection, then select the preassigned general-admission section. | Section assigned to Level B | Level B is selected and **Max capacity** shows 10. |
| Close and reopen the benefit without changing any checkbox or capacity. | — | The same seat, section, levels, capacity, and assigned counts remain visible. |

### TC-2: Dashboard - Memberships - Verify seating map navigation and level-list controls

**Priority:** Medium  
**Type:** Regression  
**Area:** Membership benefit seating map

**Description:** Validates that the organizer can navigate the refactored map, center it, control seat visibility where supported, and show or hide the membership-level list without changing saved permissions.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- The selected map profile has at least one existing permission.
- SmallBelowThreshold is below the seat-display threshold.
- For LargeMultiSegmentMap, record one seat or section inside each segment.
- For AlwaysDisplayMap, the map is configured to display seats and locations without drilling into a segment.

**Postconditions:** Existing permissions remain unchanged.

**Tags:** dashboard, memberships, assigned-seating

**Parameters:**  
MapProfile: SmallBelowThreshold, LargeMultiSegmentMap, AlwaysDisplayMap

| Step Action                                                                                                   | Data                                                                                                                                                     | Expected Result                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Select zoom in, then zoom out.                                                                                | —                                                                                                                                                        | The map scale changes in each direction and its assignments remain unchanged.                                                                                                                                                                              |
| Place the pointer over visible inventory and use the mouse wheel in both directions.                          | —                                                                                                                                                        | The map zooms toward and away from the pointer without selecting inventory or changing permissions.                                                                                                                                                        |
| Select each move control: up, right, down, and left.                                                          | —                                                                                                                                                        | The map moves in the selected direction each time.                                                                                                                                                                                                         |
| Drag an empty part of the canvas to pan the map.                                                              | —                                                                                                                                                        | The map follows the pointer and no inventory becomes selected.                                                                                                                                                                                             |
| Select the center-map control.                                                                                | —                                                                                                                                                        | The map returns to a centered view.                                                                                                                                                                                                                        |
| Review seat/location visibility and the show/hide-seats control.                                              | SmallBelowThreshold: control present; LargeMultiSegmentMap: control absent; AlwaysDisplayMap: inventory visible according to saved display configuration | The conditional control and initial inventory visibility match the selected map profile.                                                                                                                                                                   |
| For SmallBelowThreshold, select the show/hide-seats control twice.                                            | —                                                                                                                                                        | Seats hide and then return without changing permissions.                                                                                                                                                                                                   |
| For LargeMultiSegmentMap, hover a segment, move away, select it, use center, then select a different segment. | Recorded segments                                                                                                                                        | The hovered segment highlights and clears on pointer exit; the selected segment's inventory becomes reachable; center restores the overall view; the second segment can then be opened without stale inventory from the first segment intercepting clicks. |
| For AlwaysDisplayMap, select recorded inventory in two different segments and clear each selection.           | Recorded targets                                                                                                                                         | Both targets are directly visible and selectable without first drilling into a segment.                                                                                                                                                                    |
| Select the show/hide-level-list control with no seat or section selected.                                     | —                                                                                                                                                        | The **Assign Levels** list opens with level names and assignment counts, but no assignment checkboxes are available.                                                                                                                                       |
| Select the show/hide-level-list control again.                                                                | —                                                                                                                                                        | The level list closes and the map remains usable.                                                                                                                                                                                                          |
| Resize the browser to a narrower supported desktop width, then restore its original width.                    | Supported desktop widths                                                                                                                                 | The map recenters after each resize; controls, segments, seats, and sections render once and remain aligned with their click targets.                                                                                                                      |

### TC-3: Dashboard - Memberships - Verify seat and section selection states

**Priority:** High  
**Type:** Regression  
**Area:** Membership benefit seating selection

**Description:** Validates single-seat, multi-seat, clear-selection, and section-selection interactions so assignments apply only to the inventory visibly selected by the organizer.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- At least four unsold, unassigned regular seats and two unassigned general-admission sections are visible.

**Postconditions:** No level checkbox is changed.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select one regular seat. | Seat 1 | The seat is visibly selected and **Assign Levels** displays checkboxes. |
| Select Seat 1 again. | Seat 1 | Seat 1 deselects and assignment checkboxes are hidden. |
| Select Seat 1 again, then select a second regular seat without clearing Seat 1. | Seats 1 and 2 | Both seats remain selected. |
| Select **Clear Selection**. | — | All selected seats are cleared and assignment checkboxes are hidden. |
| Hold Shift and drag a selection rectangle around three regular seats. | Seats 1-3 | A selection rectangle appears while dragging; exactly the three enclosed seats are selected on release and the assignment panel remains available. |
| Select GA Section 1. | GA Section 1 | The selected seats clear and only GA Section 1 remains selected. |
| Select GA Section 1 again. | GA Section 1 | The section deselects and assignment checkboxes are hidden. |
| Select GA Section 1, then GA Section 2. | Two GA sections | GA Section 1 clears and only GA Section 2 remains selected. |
| Select a regular seat. | Seat 4 | The section clears and only Seat 4 remains selected. |

### TC-4: Dashboard - Memberships - Verify assigning and removing regular-seat permissions

**Priority:** High  
**Type:** Happy Path  
**Area:** Membership level seat permissions

**Description:** Validates that an organizer can assign one or multiple regular seats to a membership level and remove that assignment, with each change saved immediately and preserved after reopening.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- Three unsold regular seats are not assigned to Level A.
- Record Level A's current assigned count.

**Postconditions:** Restore the three seats to their original unassigned state.

**Tags:** dashboard, memberships, assigned-seating

| Step Action                                                     | Data               | Expected Result                                                                                                                         |
| --------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Hold Shift and drag-select the three regular seats.             | Seats 1-3          | Exactly three seats are selected and Level A is not selected.                                                                           |
| Select the checkbox for Level A.                                | Level A            | A loading overlay prevents further map interaction, then a success message appears and all three seats show Level A's assignment color. |
| Review Level A's assignment count.                              | Original count + 3 | The count increases by three.                                                                                                           |
| Close and reopen the benefit, then select the same three seats. | —                  | Level A is selected for all three seats and the increased count persists.                                                               |
| Clear the Level A checkbox.                                     | Level A            | A loading overlay appears, then a removal success message appears and Level A is no longer assigned to the seats.                       |
| Close and reopen the benefit, then select the same seats.       | —                  | Level A remains unselected and its assignment count returns to the original value.                                                      |

### TC-5: Dashboard - Memberships - Verify reassigning a regular seat between levels

**Priority:** High  
**Type:** Regression  
**Area:** Membership level seat ownership

**Description:** Validates that a regular seat can move from one membership level to another without retaining the old level or changing an unrelated seat.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- Seat 1 is assigned to Level A and is unsold.
- Seat 2 is assigned to Level A and will be used as the unchanged control.

**Postconditions:** Reassign Seat 1 to Level A.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select Seat 1. | — | Level A is selected and Level B is not selected. |
| Clear the Level A checkbox and wait for the removal to finish. | Level A | Level A is removed from Seat 1 and its count decreases by one. |
| Select the Level B checkbox. | Level B | Level B is assigned to Seat 1 and its count increases by one. |
| Close and reopen the benefit, then select Seat 1. | — | Only Level B is selected for Seat 1. |
| Select Seat 2. | Control seat | Seat 2 is still assigned to Level A. |

### TC-6: Dashboard - Memberships - Verify full-purchase table assignment rules

**Priority:** High  
**Type:** Edge Case  
**Area:** Membership level table permissions

**Description:** Validates that selecting any seat at a full-purchase table selects the complete table and prevents incompatible or multiple membership-level assignments.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- The full-purchase table is unsold and unassigned.
- Level A's purchase limit supports the table size.
- Level C's purchase limit is lower than the table size.

**Postconditions:** Remove Level A from the table if the case assigned it.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select one seat at the full-purchase table. | Full-purchase table | Every seat at that table becomes selected. |
| Review the Level C row. | Level C | Its checkbox is disabled and a message explains that its purchase limit cannot support all seats at the table. |
| Select Level A. | Level A | The full table is assigned to Level A and the count increases by the number of seats at the table. |
| Review Level B. | Level B | Its checkbox is disabled and the map explains that only one item type is allowed for a full-purchase table. |
| Select the same table seat again. | — | The complete table selection clears together. |
| Close and reopen the benefit, then select one table seat. | — | The complete table is selected and only Level A is assigned. |

### TC-7: Dashboard - Memberships - Verify general-admission assignment and capacity changes

**Priority:** High  
**Type:** Happy Path  
**Area:** Membership level general-admission permissions

**Description:** Validates that an organizer can assign a membership level to a general-admission section, save a valid capacity, update it, and remove it without affecting other section permissions.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- GA Section 1 has capacity 20 and is unassigned.
- GA Section 2 has an existing Level B assignment and is the unchanged control.

**Postconditions:** Restore GA Section 1 to its original unassigned state.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select GA Section 1. | Capacity 20 | **Assign Levels** opens for the section and Level A is not selected. |
| Select Level A. | — | **Max capacity** appears with the section capacity of 20. |
| Change **Max capacity** and select **Save**. | 12 | A loading overlay appears, then **Location Saved Successfully** appears and the selection clears. |
| Reopen GA Section 1. | — | Level A is selected and **Max capacity** shows 12. |
| Change **Max capacity** and select **Save**. | 8 | The success message appears and the saved capacity becomes 8 after reopening. |
| Reopen GA Section 1, clear Level A, and select **Save**. | — | The assignment is removed and Level A's count decreases by the section's assigned capacity. |
| Select GA Section 2. | Control section | Its Level B assignment and capacity remain unchanged. |

### TC-8: Dashboard - Memberships - Verify creating a level from the seating map

**Priority:** Medium  
**Type:** Integration  
**Area:** Membership level creation

**Description:** Validates that an organizer can create a membership level while assigning seats and then use the new level without losing existing map assignments.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- Seat 1 is assigned to Level A.
- Seat 2 is unsold and unassigned.
- A unique level name is available.

**Postconditions:** Remove the new level's seat permission; archive or retain the created level according to venue cleanup practice.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select Seat 2 and select **Create Level**. | — | **Add new Membership Level** opens over the map. |
| Complete the level form and select **Save**. | Name: Map Regression Level; inventory: 10; purchase limit: 2; valid price and visibility | The level is created, the form closes, and the seating map remains open. |
| Review the **Assign Levels** list. | — | The new level appears and Level A's existing assignment count is unchanged. |
| Select the new level's checkbox for Seat 2. | — | The new level is assigned successfully. |
| Close and reopen the benefit, then select Seat 1 and Seat 2 separately. | — | Seat 1 remains assigned to Level A and Seat 2 is assigned to the new level. |

### TC-9: Dashboard - Memberships - Verify completion requires a saved permission

**Priority:** High  
**Type:** Regression  
**Area:** Membership benefit completion

**Description:** Validates that the assigned-seating flow cannot complete with an empty permission map and that a valid saved assignment removes the distribution-blocking prompt.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A opens an assigned-seating issue-ticket benefit with no seat or section permissions.
- Note whether the environment shows **Done** or **Next** based on season-batch configuration.

**Postconditions:** Retain one Level A seat assignment or remove it after verifying the benefit state.

**Tags:** dashboard, memberships, assigned-seating

**Parameters:**  
SeasonBatchMode: Disabled, Enabled

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Review the footer before assigning inventory. | Disabled: **Done**; Enabled: **Next** | The expected footer control is present and disabled. |
| Select an unsold seat and assign Level A. | — | The seat assignment succeeds and the footer control becomes enabled. |
| Select the enabled footer control. | Selected SeasonBatchMode | With Disabled, **Done** closes the modal; with Enabled, **Next** opens the ticket manager with its batch/distribution content rendered. |
| Return to the Benefits page and review the benefit row. | — | The **You must assign membership levels...** prompt is no longer shown and ticket distribution controls can proceed. |
| Reopen the benefit and select the assigned seat. | — | Level A remains assigned. |

### TC-10: Dashboard - Memberships - Verify sold seating permissions cannot be removed

**Priority:** High  
**Type:** Negative  
**Area:** Membership seat ownership protection

**Description:** Validates that an organizer cannot remove a seat or general-admission permission already used by a sold membership and that the original assignment remains intact.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- A sold membership uses the target Level A seat or general-admission permission.
- Use dedicated sold data that does not need cleanup.

**Postconditions:** The sold permission remains assigned.

**Tags:** dashboard, memberships, assigned-seating

**Parameters:**  
PermissionType: NumberedSeat, GeneralAdmissionSection

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the sold seat or sold general-admission section for the chosen PermissionType. | — | Level A is shown as assigned. |
| Clear Level A; for GeneralAdmissionSection also select **Save**. | — | An error explains that the seat or location cannot be altered because a membership has already been sold for it. |
| Close and reopen the benefit, then select the same inventory. | — | Level A remains assigned with its original capacity and count. |
| Select an unrelated unsold seat or section. | — | Its assignment remains unchanged and can still be edited normally. |

### TC-11: Dashboard - Memberships - Verify unauthorized employees cannot manage benefit seating

**Priority:** High  
**Type:** Permission  
**Area:** Membership management authorization

**Description:** Validates that a venue employee without Manage Memberships cannot use the Dashboard route to view or change a membership group's benefit seating.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee B is signed in to the venue and does not have **Manage Memberships**.
- The membership group and assigned-seating benefit belong to that venue.
- Record one existing seat assignment.

**Postconditions:** No permissions are changed.

**Tags:** dashboard, memberships, employee-permissions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Attempt to navigate directly to `/manage/memberships/{group id}/benefits/`. | Test group ID | The employee cannot access the Membership Benefits management page. |
| Navigate through the Dashboard menus. | — | Membership benefit management is not offered as an available action. |
| Sign in as Employee A and reopen the recorded seat. | — | The existing seat assignment is unchanged. |

### TC-12: Dashboard - Memberships - Verify every benefit-seating entry point renders the complete permission screen

**Priority:** High  
**Type:** Regression  
**Area:** Membership benefit seating entry

**Description:** Validates that each supported entry into membership benefit seating opens the same usable permission screen with its page, modal, map, assigner, navigation, and footer components present.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is signed in to the correct venue.
- For ExistingBenefitEdit, an assigned-seating issue-ticket benefit exists.
- For AssignLevelsPrompt, an assigned-seating issue-ticket benefit exists with no seat or location permissions and its benefit row shows the assignment prompt.

**Postconditions:** No permissions are changed.

**Tags:** dashboard, memberships, assigned-seating

**Parameters:**  
EntryPath: ExistingBenefitEdit, AssignLevelsPrompt

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard Memberships, select the test membership group, and open **Membership Benefits**. | Test group | The group heading, benefits table, benefit row, and benefit actions render without overlapping, empty, or duplicated content. |
| Enter seating assignment using the selected EntryPath. | ExistingBenefitEdit: open the benefit action menu and select **Edit**; AssignLevelsPrompt: select **Assign levels to seats** | The selected action opens the assigned-seating flow for the correct benefit. |
| If the benefit form appears, continue from its assigned-seating map selection without changing the chosen map. | Recorded test map | The **Reserved seating benefit** permission screen opens for the recorded map. |
| Wait for loading to complete and inspect the full screen. | — | The close control, **Reserved seating benefit** heading, map canvas, level-list control, viewport controls, selection area, and **Done** or **Next** footer control are present once and are not clipped or covered. |
| Open the level list, select one unassigned seat, and then clear the selection without changing a checkbox. | Recorded seat | The same assigner region changes from read-only level counts to assignment checkboxes and back without a blank screen or component remount error. |
| Close the screen and return through the same EntryPath. | — | The Benefits page remains usable and the complete permission screen renders again for the same benefit. |

### TC-13: Dashboard - Memberships - Verify develop-builder map components render and remain selectable

**Priority:** High  
**Type:** Regression  
**Area:** Assigned-seating builder compatibility

**Description:** Validates that every migrated assigned-seating location family and display state produced on develop is rendered at the expected position and remains tied to the correct backend inventory in membership benefit assignment.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen for the recorded develop-built compatibility map.
- Record the visible label and backend seat or location identity for each target in the test-data manifest.
- The map contains the geometry, transforms, seat flags, labels, and background listed in Recommended Test Data.
- The target inventory is unsold.

**Postconditions:** Remove any temporary permission assigned during identity checks.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Compare the loaded map with the approved builder preview or test-data manifest. | Segment outlines, background image, visible and hidden location names | The background, segment boundaries, and configured names render once in their recorded positions; the hidden location name is not shown and no visual layer blocks map controls. |
| Inspect and select one seat in the straight row. | Recorded straight-row seat | The row is straight, the expected label is visible, and only the recorded seat becomes selected. |
| Clear selection, then inspect and select the first and last seats in the curved inverted row one at a time. | Recorded endpoint labels/IDs | The row follows its curve, the displayed label order matches the inverted builder preview, and each click selects the matching recorded seat rather than its visual neighbor. |
| Clear selection, then select one seat at each normal round, semi-round, and square table. | Three recorded table seats | Each table has the expected shape and each click selects every seat belonging to that table, with no seat from another table selected. |
| Clear selection, then select one seat at each mirrored round, semi-round, and square table. | Three recorded mirrored-table seats | Seat positions match the mirrored builder preview and the complete correct table is selected for each click. |
| Clear selection, then select the standing rectangular GA and circular GA one at a time. | Recorded GA names | Each section has the expected shape and click target; **Assign Levels** identifies the selected section and the previous section clears. |
| Inspect and select inventory inside each rotated, translated, or flipped segment/location. | Recorded transformed targets | The visual component and click target remain aligned and the recorded inventory is selected. |
| Inspect and select the accessible and limited-visibility seats. | Recorded flagged seats | Each seat remains visible to the organizer, retains its configured visual marker, and selects the correct seat. |
| Inspect and select the hidden-public seat. | Recorded hidden-public seat | The authorized organizer can see and select the seat in the management map, and any existing permission for it is available for management. |
| Assign Level A to one regular identity-check seat, reopen the benefit, and select that recorded seat again. | Level A | The permission reappears on the same label/ID and not on an adjacent or mirrored position, proving display coordinates did not change seat identity. |

### TC-14: Dashboard - Memberships - Verify advanced full-purchase and mixed drag-selection behavior

**Priority:** High  
**Type:** Edge Case  
**Area:** Membership benefit seating selection

**Description:** Validates selection transitions involving regular seats and multiple full-purchase tables so a refactored click or drag target cannot leave a partial table or stale incompatible selection.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- Two unsold, unassigned full-purchase tables and at least three nearby regular seats are visible.
- The drag regions and expected included seats are recorded.

**Postconditions:** No level checkbox is changed.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select one seat at Full-Purchase Table A, then one seat at Full-Purchase Table B. | Tables A and B | Every seat at both tables is selected; neither table is partial. |
| Select one already-selected seat at Table A. | Table A | Every seat at Table A clears while every seat at Table B remains selected. |
| Select one regular seat. | Regular Seat 1 | Table B clears and only Regular Seat 1 is selected. |
| Clear selection, then hold Shift and drag a region containing regular seats and part of Table A. | Recorded mixed region | The selection rectangle appears; the enclosed regular seats are selected and no partial or complete full-purchase table remains selected. |
| Clear selection, then hold Shift and drag a region containing only some seats from Tables A and B and no regular seats. | Recorded tables-only region | Every seat at both intersected tables is selected as two complete tables. |
| Select **Clear Selection**. | — | All seats at both tables clear together and no stale selection remains in **Assign Levels**. |

### TC-15: Dashboard - Memberships - Verify multiple-level seat and general-admission permissions remain independent

**Priority:** High  
**Type:** Regression  
**Area:** Membership permission ownership

**Description:** Validates that supported multi-level permissions retain independent level ownership and capacity while a full general-admission save preserves unrelated section assignments.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- Regular Seat 1 is unsold and unassigned.
- GA Section 1 is unsold and unassigned with capacity 20.
- GA Section 2 has a saved Level C permission with recorded capacity and is the unchanged control.

**Postconditions:** Restore Seat 1 and GA Section 1 to their original unassigned state.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select Regular Seat 1 and assign Level A, then Level B. | Level A; Level B | Both immediate saves succeed, both levels are selected for the same seat, and each level count increases by one. |
| Remove Level A from Regular Seat 1. | Level A | Level A clears and its count decreases; Level B remains selected and its count is unchanged. |
| Reopen the benefit and select Regular Seat 1. | — | Only Level B remains assigned. |
| Select GA Section 1, add Level A with capacity 8 and Level B with capacity 5, then select **Save**. | A: 8; B: 5 | One successful save persists both levels with their independent capacities. |
| Reopen GA Section 1. | — | Level A shows 8 and Level B shows 5. |
| Change Level A to 6, remove Level B, and select **Save**. | A: 6 | The update succeeds; reopening shows Level A at 6 and no Level B assignment. |
| Select GA Section 2. | Control section | Level C and its recorded capacity remain unchanged through both full location-permission saves. |

### TC-16: Dashboard - Memberships - Verify rejected permission changes do not persist false state

**Priority:** High  
**Type:** Negative  
**Area:** Membership permission error recovery

**Description:** Validates that failed seat and general-admission writes show an error and leave persisted permission ownership at the last successful state.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- SeatCreateRequestRejected uses an unassigned seat.
- SeatDeleteRequestRejected uses an unsold seat assigned to Level A.
- GeneralAdmissionCapacityRejected uses an unassigned section with capacity 20.
- GeneralAdmissionRequestRejected uses an unassigned section and a valid capacity.
- Browser network controls can be used for request-rejection parameters; reconnect before reopening the benefit.
- Record the original level counts and section permissions.

**Postconditions:** Restore network access and original permissions.

**Tags:** dashboard, memberships, assigned-seating

**Parameters:**  
FailureMode: SeatCreateRequestRejected, SeatDeleteRequestRejected, GeneralAdmissionCapacityRejected, GeneralAdmissionRequestRejected

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the target seat or section for the chosen FailureMode. | Recorded target | The last successfully saved checkbox and capacity state is shown. |
| Prepare the rejected change. | SeatCreateRequestRejected: take the browser offline before selecting Level A; SeatDeleteRequestRejected: take the browser offline before clearing Level A; GeneralAdmissionCapacityRejected: select Level A and enter 21; GeneralAdmissionRequestRejected: select Level A, enter 10, then take the browser offline | The intended unsaved change is visible and unrelated inventory remains unchanged. |
| Submit the change. | Seat modes: change the checkbox; GA modes: select **Save** | A loading state ends with error feedback and no success feedback. Further interaction becomes available again after the request ends. |
| Restore network access when applicable, close the permission screen, and reopen the benefit. | — | The target shows its last successful persisted state: rejected seat create remains unassigned, rejected seat delete remains Level A, and rejected GA create/capacity is absent. |
| Review the recorded counts and unrelated section permissions. | Original values | Counts and unrelated permissions remain unchanged by the rejected request. |
| Perform one valid change on separate unsold control inventory. | Valid seat or section | The valid save succeeds, proving the failed request did not leave the screen permanently blocked. |

### TC-17: Dashboard - Memberships - Verify closing preserves immediate seat saves and discards unsaved GA edits

**Priority:** High  
**Type:** Regression  
**Area:** Membership permission persistence

**Description:** Validates the source-defined persistence boundary when an employee closes the permission screen after an immediately saved seat change and a staged general-admission change that was not saved.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- Regular Seat 1 and GA Section 1 are unsold and unassigned.

**Postconditions:** Remove Level A from Regular Seat 1.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select Regular Seat 1 and assign Level A. | Level A | The immediate seat request succeeds and the permission color/count update. |
| Select GA Section 1, select Level A, and set **Max capacity** without selecting **Save**. | Capacity 10 | The staged GA values are visible only in the open assigner. |
| Close the permission screen using its close control. | — | The screen closes without reporting that the unsaved GA edit succeeded. |
| Reopen the same benefit and select Regular Seat 1. | — | Level A remains assigned because the seat change saved immediately. |
| Select GA Section 1. | — | Level A is not assigned and capacity 10 is not persisted because **Save** was not selected. |
| Save Level A with capacity 10, close, reopen, and select GA Section 1 again. | — | The saved GA permission now persists, proving close distinguishes staged from successfully saved location state. |

### TC-18: Dashboard - Memberships - Verify bulk assignment across mixed existing seat permissions

**Priority:** High  
**Type:** Edge Case  
**Area:** Membership level seat permissions

**Description:** Validates that assigning a level across a mixed-state seat selection creates only the missing permission, then removing the level applies to every selected seat without corrupting counts or control inventory.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is on the **Reserved seating benefit** screen.
- Adjacent Seats 1 and 2 are unsold; Seat 1 is assigned to Level A and Seat 2 is not.
- Control Seat 3 is assigned to Level A and is outside the selection region.
- Record Level A's assigned count.

**Postconditions:** Restore Seat 1 to Level A; leave Seat 2 unassigned.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Hold Shift and drag-select only Seats 1 and 2. | Mixed-state seats | Exactly Seats 1 and 2 are selected; Level A is not checked because it is not assigned to every selected seat. |
| Select Level A. | — | The save succeeds without a duplicate-permission error; only Seat 2 receives a new permission and Level A's count increases by one. |
| Close and reopen the benefit, select Seats 1 and 2 again, and review Level A. | — | Level A is checked because both selected seats now have the permission. |
| Clear Level A. | — | The removal succeeds for both seats and Level A's count decreases by two. |
| Close and reopen the benefit, then select Seats 1 and 2 separately. | — | Neither seat is assigned to Level A. |
| Select Control Seat 3. | — | Its Level A permission remains assigned and the final count reflects only the intended changes. |

### TC-19: Dashboard - Memberships - Verify permission isolation between benefits sharing one map

**Priority:** High  
**Type:** Integration  
**Area:** Membership benefit permission isolation

**Description:** Validates that reads and mutations are scoped to the selected membership benefit when two issue-ticket benefits use the same venue map and therefore share seat and location IDs.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

- Employee A is signed in to the correct venue.
- Benefits A and B are assigned-seating issue-ticket benefits in the same membership group and use the same test map.
- In Benefit A, Seat 1 is assigned to Level A; Seat 2 and GA Section 1 are unassigned.
- In Benefit B, Seat 2 and GA Section 1 are assigned to Level B with recorded GA capacity; Seat 1 is unassigned.

**Postconditions:** Remove any temporary Benefit A permissions from Seat 2 and GA Section 1.

**Tags:** dashboard, memberships, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Benefit A's **Reserved seating benefit** screen and select Seat 1, Seat 2, and GA Section 1 one at a time. | Benefit A | Seat 1 shows Level A; Seat 2 and GA Section 1 do not show Benefit B's Level B permission as if it belonged to Benefit A. |
| In Benefit A, assign Seat 2 to Level A and save GA Section 1 for Level A with capacity 7. | Benefit A | Both Benefit A mutations succeed and persist after reopening Benefit A. |
| Close Benefit A, open Benefit B, and select Seat 1, Seat 2, and GA Section 1 one at a time. | Benefit B | Seat 1 remains unassigned; Seat 2 remains Level B; GA Section 1 remains Level B with its original recorded capacity. Benefit A's Level A permissions do not appear as Benefit B permissions. |
| In Benefit B, remove and restore Level B on Seat 2. | Benefit B | Both changes affect only Benefit B and do not produce a duplicate or ownership error from Benefit A's permission on the same seat. |
| Reopen Benefit A and review Seat 1, Seat 2, and GA Section 1. | Benefit A | Seat 1 and Seat 2 remain Level A and GA Section 1 remains Level A at capacity 7; Benefit B's temporary remove/restore did not change Benefit A. |

## Minimum Execution Set

Because this flow controls membership inventory and the develop change is an upstream map migration, a render-only smoke is not sufficient for release sign-off.

Run this refactor gate:

- TC-12 for both EntryPath values — page, modal, and assigner component rendering.
- TC-13 in full — every develop-builder location family, transform, and seat flag.
- TC-1 for StandardTwoLevels and MoreThan200Levels — permission hydration and complete level loading.
- TC-2, TC-3, and TC-14 — every viewport and selection interaction.
- TC-4, TC-5, TC-6, TC-7, and TC-15 — regular, reassigned, multi-level, table, and GA persistence.
- TC-18 — mixed-state bulk seat assignment and removal.
- TC-19 — benefit scoping when two benefits share the same map.
- TC-16 for all FailureMode values — rejected-create, rejected-delete, invalid-capacity, and failed-GA recovery.
- TC-17 — immediate versus staged close behavior.
- TC-8 and TC-9 — inline supporting component and completion handoff.
- TC-10 for both PermissionType values — sold inventory.
- TC-11 — route permission boundary.

If execution time must be split, TC-12 through TC-19 plus TC-1, TC-4, TC-6, TC-7, TC-9, and TC-10 form the first pass. The remaining cases are still required before the refactor is considered fully regressed.

## Suggested Automated Coverage

- Add a Dashboard Playwright flow that opens an assigned-seating issue-ticket benefit, assigns an unsold seat to Level A, reopens the map, and verifies the same level remains selected.
- Add a multi-seat canvas scenario using a stable test map and assert the permission request contains exactly the selected seat IDs.
- Add a general-admission scenario that assigns Level A with a custom capacity, saves, reopens, updates the capacity, and confirms an unrelated section remains unchanged.
- Add a full-purchase table scenario proving one click selects the entire table and an incompatible purchase-limit level is disabled.
- Add a fixture serialized by the develop builder that contains every location family, a curved/inverted row, mirrored tables, transforms, both GA shapes, background imagery, and seat flags; use it in a visual-plus-click-target membership consumer test.
- Add identity assertions that select the first and last seats of inverted/curved rows and mirrored tables, then verify the permission request carries the recorded backend seat IDs.
- Add selection-state coverage for multiple full-purchase tables, per-table deselection, regular/table mixed drag, and tables-only drag.
- Add a resize test that verifies the stage recenters and that every previously visible target remains clickable after changing the viewport.
- Add a multi-level regular-seat and multi-level GA case with independent capacities and an unrelated GA control permission.
- Add a mixed-state bulk-seat case that proves the create request contains only missing seat IDs and the delete request contains every selected seat that owns the level.
- Add a two-benefit shared-map scenario that verifies permission reads and seat/GA writes remain filtered by membership benefit ID.
- Add an API-failure scenario for seat assignment to prove the checkbox, map color, and count return to their prior state.
- Add an API-failure scenario for general-admission save; the current component does not explicitly restore its prior in-memory location map.
- Retain backend coverage for same-group validation, venue ownership, duplicate permissions, capacity limits, and sold seat/location removal.
- Add a large-group component test with more than 200 levels to the existing `MembershipBenefitReservedSeatingScreen.test.tsx` pattern and an end-to-end smoke if production groups can realistically exceed that size.
- Use existing public membership assigned-seating purchase flows under `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/assigned-seating/membership/` for one downstream smoke proving a newly assigned seat is offered to the correct level.

## Open Questions

1. Should an employee with **Manage Memberships** but not **Manage Events** be able to save general-admission membership permissions? The frontend route requires Manage Memberships, the seat mutation endpoint accepts Manage Events or Manage Memberships, but the location mutation endpoint requires Manage Events.
2. What should the organizer see when membership levels, the space, seat usages, or existing permissions fail to load? The reviewed code can keep the map or level list hidden without a source-backed retry or error state.
3. Should closing the modal warn that immediately saved seat changes remain applied even if **Done** or **Next** was not selected?
4. Is zero or a negative general-admission capacity rejected by the backend, or is the browser's minimum-value constraint the intended protection?
5. What keyboard and screen-reader interactions are required for selecting canvas seats and general-admission sections after the refactor?
6. When a general-admission save fails, should the frontend restore the last saved checkbox and capacity state as the seat path does?
7. Is there an approved canonical develop-built compatibility map, or should QA create and retain the Recommended Test Data map as a release fixture?
8. Should hidden-public seats always remain visible and assignable to an authorized membership manager, including when they have no existing permission?
9. If two employees edit general-admission permissions for the same benefit at the same time, should the second save be rejected as stale, merged, or allowed to replace the first editor's location map?
