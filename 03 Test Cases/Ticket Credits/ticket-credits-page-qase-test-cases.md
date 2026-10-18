---
title: Ticket Credits — page baseline and important edge cases
date: 2026-10-17
tags:
  - qa/test-cases
  - credits
  - dashboard
status: 33 published and verified; 32 created and 1 updated; not executed
---

# Ticket Credits — page baseline and important edge cases

**Result:** 33 focused definitions published and verified: 32 created cases and the approved refinement/split of SPT-5117. The previously incomplete one-case suite now contains all 33 definitions. Equivalent data and save-mode variations use parameters; creation, editing, assignment, removal, cancellation and access checks stay separate. All approved Qase case fields were read back and verified. No live Showpass data or customer order was changed.

**Source boundary:** product behavior comes solely from [[01 Repositories/Backend - web-app|web-app]]. Its Django models/APIs define the contract; templates and controllers inside that same repository supply the legacy product labels used below. The separate frontend repository and browser were not inspected. The current beta layout, exact replacement labels, focus behavior and messages remain unverified; these are backend-backed manual case definitions, not proof of complete Next.js component coverage. The banner and preview opt-in/out are excluded as requested.

**Intent and scope:** an employee can save the right credit definition, issuing quantities and redemption permissions without altering another credit, event, ticket or organization. This protects entitlement ownership and purchase eligibility. Desktop Dashboard page workflows are in scope; existing checkout/reporting cases are reused below. Downstream cases check how edited positive and zero limits affect already-issued credits without completing a new purchase. No branch or PR was supplied.

> [!note] Generated attachments removed
> Generated snapshots, JSON exports and frozen publication copies were deleted on 2026-10-17 at the user’s request. Published case IDs, recorded results and test definitions remain in this note. Read Qase again before preparing future changes.

## Published case index

| Draft / existing ID | Test title | Parameters |
| --- | --- | --- |
| [SPT-5631](https://app.qase.io/case/SPT-5631) (TC-1) | Create a ticket credit | NameInput: Ordinary, MaximumLength |
| [SPT-5632](https://app.qase.io/case/SPT-5632) (TC-2) | Cancel creating a ticket credit | CloseMethod: Cancel, CloseButton |
| [SPT-5633](https://app.qase.io/case/SPT-5633) (TC-3) | Open an existing ticket credit | None |
| [SPT-5634](https://app.qase.io/case/SPT-5634) (TC-4) | Search ticket credits by name | SearchInput: PartialName, MixedCase, NoMatch |
| [SPT-5635](https://app.qase.io/case/SPT-5635) (TC-5) | Filter ticket credits by redemption event | EventSelection: OneEvent, TwoEvents |
| [SPT-5117](https://app.qase.io/case/SPT-5117) | Edit a ticket-credit name and redemption limit | LimitValue: NoLimit, Zero, One, Five |
| [SPT-5636](https://app.qase.io/case/SPT-5636) (TC-6) | Reject a ticket-credit name longer than 255 characters | None |
| [SPT-5637](https://app.qase.io/case/SPT-5637) (TC-7) | Reject an invalid redemption limit | InvalidLimit: Negative, Fraction |
| [SPT-5638](https://app.qase.io/case/SPT-5638) (TC-8) | Add an issuing ticket type | CreditsPerTicket: One, Three |
| [SPT-5639](https://app.qase.io/case/SPT-5639) (TC-9) | Change a saved issuing quantity | SaveMode: Synchronous, BackgroundJob |
| [SPT-5640](https://app.qase.io/case/SPT-5640) (TC-10) | Remove one issuing ticket type | None |
| [SPT-5641](https://app.qase.io/case/SPT-5641) (TC-11) | Remove an issuing event | None |
| [SPT-5642](https://app.qase.io/case/SPT-5642) (TC-12) | Cancel saving with no issuing quantity | None |
| [SPT-5643](https://app.qase.io/case/SPT-5643) (TC-13) | Confirm saving without issuing tickets | None |
| [SPT-5644](https://app.qase.io/case/SPT-5644) (TC-14) | Enable one ticket type for redemption | None |
| [SPT-5645](https://app.qase.io/case/SPT-5645) (TC-15) | Enable an event’s ticket types for redemption | None |
| [SPT-5646](https://app.qase.io/case/SPT-5646) (TC-16) | Disable one redemption ticket type | RemainingTypes: One, None |
| [SPT-5647](https://app.qase.io/case/SPT-5647) (TC-17) | Disable a redemption event | None |
| [SPT-5648](https://app.qase.io/case/SPT-5648) (TC-18) | Find a redemption ticket type by event and ticket name | None |
| [SPT-5649](https://app.qase.io/case/SPT-5649) (TC-19) | Protect a ticket type that issues another credit | None |
| [SPT-5650](https://app.qase.io/case/SPT-5650) (TC-20) | Prevent payment-plan tickets from issuing credits | TicketKind: TicketWithPlan, PlanTicket |
| [SPT-5651](https://app.qase.io/case/SPT-5651) (TC-21) | Prevent payment-plan tickets from accepting credits | TicketKind: TicketWithPlan, PlanTicket |
| [SPT-5652](https://app.qase.io/case/SPT-5652) (TC-22) | Show the guest-information warning for limited credits | GuestCollection: PerTicket, PerOrder |
| [SPT-5653](https://app.qase.io/case/SPT-5653) (TC-23) | Show an organization with no ticket-credit definitions | None |
| [SPT-5654](https://app.qase.io/case/SPT-5654) (TC-24) | Show ticket credits as disabled for the organization | None |
| [SPT-5655](https://app.qase.io/case/SPT-5655) (TC-25) | Deny Ticket Credits management without Manage Events | None |
| [SPT-5656](https://app.qase.io/case/SPT-5656) (TC-26) | Deny Ticket Credits management on Basic pricing | None |
| [SPT-5657](https://app.qase.io/case/SPT-5657) (TC-27) | Keep ticket credits separate when switching organizations | None |
| [SPT-5658](https://app.qase.io/case/SPT-5658) (TC-28) | Reject a fractional issuing quantity | None |
| [SPT-5659](https://app.qase.io/case/SPT-5659) (TC-29) | Apply an edited event limit to credits already issued | Scaling: Enabled, Disabled |
| [SPT-5660](https://app.qase.io/case/SPT-5660) (TC-30) | Preserve event edits made before saving an issuing quantity | None |
| [SPT-5661](https://app.qase.io/case/SPT-5661) (TC-31) | Keep a zero redemption limit from acting as unlimited | None |
| [SPT-5662](https://app.qase.io/case/SPT-5662) (TC-32) | Keep separate issuing and redemption tickets in the same event | None |

## Definitions and finding credits

### SPT-5631: Dashboard - Ticket Credits - Create a ticket credit

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5631 (formerly TC-1); not executed.

**Title:** Dashboard - Ticket Credits - Create a ticket credit

**Description:** Create one Ticket Credit definition and reopen it. A definition describes which purchased tickets issue credits and which tickets accept them; creating the definition alone does not give a customer credits. Run NameInput separately: Ordinary = a new recognizable name; MaximumLength = exactly 255 letters, recorded before entry.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Record the number of existing credits matching the chosen name; use a name that currently has no match.

**Postconditions:**

* Retain the newly created unused definition under its recorded name; creating it has issued no customer credits.

**Priority:** Medium

**Tags:** dashboard, credits

**Parameters:**

NameInput: Ordinary, MaximumLength

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select New Ticket Credit. |  | Ticket Credit Name, Limit Per Item, Per User, Save and Cancel are available. |
| Enter the chosen name and leave the limit empty. | NameInput; empty limit means no event limit. | The name is retained and the limit remains empty. |
| Select Save, then search for and open the new credit. |  | Exactly one matching definition exists with the entered name, an empty limit and no issuing or redemption assignments. |
| Reload the page and reopen the same credit. |  | The name and empty limit remain saved. |

### SPT-5632: Dashboard - Ticket Credits - Cancel creating a ticket credit

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5632 (formerly TC-2); not executed.

**Title:** Dashboard - Ticket Credits - Cancel creating a ticket credit

**Description:** Enter a new credit name and limit, then close the creation form without saving. Run CloseMethod separately: Cancel = select Cancel; CloseButton = select the close button in the form header.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Choose a recognizable name that has no existing search match.

**Postconditions:**

* Existing definitions and their assignments are unchanged.

**Priority:** Medium

**Tags:** dashboard, credits

**Parameters:**

CloseMethod: Cancel, CloseButton

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select New Ticket Credit. |  | The new-credit form opens. |
| Enter the chosen name and set the limit to 2. |  | The values appear in the form. |
| Close the form using CloseMethod. |  | The form closes without creating a credit. |
| Reload Ticket Credits and search for the entered name. |  | No matching credit has been saved. |

### SPT-5633: Dashboard - Ticket Credits - Open an existing ticket credit

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5633 (formerly TC-3); not executed.

**Title:** Dashboard - Ticket Credits - Open an existing ticket credit

**Description:** Open two saved definitions in turn and verify their own names, limits, issuing quantities and redemption selections. An issuing ticket grants credits when purchased; a redemption ticket accepts those credits.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Select two differently named definitions. The first has limit 2, an issuing ticket with quantity 3 and one enabled redemption ticket. The second has limit 5 and different issuing and redemption tickets. Record the exact events and ticket names.

**Postconditions:**

* Neither definition nor its assignments were changed.

**Priority:** Medium

**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the first credit. |  | Its saved name, limit 2, issuing quantity 3 and recorded redemption ticket appear. |
| Select the second credit. |  | The second credit’s own name, limit 5 and assignments appear without selections from the first. |
| Select the first credit again and reload the page before reopening it. |  | The original first-credit values remain unchanged. |

### SPT-5634: Dashboard - Ticket Credits - Search ticket credits by name

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5634 (formerly TC-4); not executed.

**Title:** Dashboard - Ticket Credits - Search ticket credits by name

**Description:** Filter the list by a saved credit name, then clear the search. Run SearchInput separately: PartialName = a unique middle portion of a recorded name; MixedCase = the same portion with letter case changed; NoMatch = a phrase absent from every definition. The first two runs return the matching credit; NoMatch returns an empty result.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Select two differently named active definitions and record their names; choose a search portion present in only the first.

**Postconditions:**

* Search and clearing have changed no saved credit values.

**Priority:** Medium

**Tags:** dashboard, credits, search-filters

**Parameters:**

SearchInput: PartialName, MixedCase, NoMatch

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and enter SearchInput in the credit-name search. |  | Only matching definitions appear, or the no-results state appears for NoMatch. |
| Clear the credit-name search. |  | Both recorded definitions are available again. |
| Open the second definition. |  | Its own saved name and assignments load correctly. |

### SPT-5635: Dashboard - Ticket Credits - Filter ticket credits by redemption event

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5635 (formerly TC-5); not executed.

**Title:** Dashboard - Ticket Credits - Filter ticket credits by redemption event

**Description:** Use Search enabled events to find credits with redemption permissions for the chosen events. Run EventSelection separately: OneEvent = choose the first event; TwoEvents = choose both events. For TwoEvents the list includes credits enabled for either event, showing a credit enabled for both only once.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Prepare three active definitions: A is redeemable at event One only, B at event Two only, and C at both. A fourth active definition is enabled at neither event. Record all names.

**Postconditions:**

* Filtering has not added or removed redemption permissions.

**Priority:** Medium

**Tags:** dashboard, credits, search-filters

**Parameters:**

EventSelection: OneEvent, TwoEvents

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and choose EventSelection in Search enabled events. |  | OneEvent shows A and C; TwoEvents shows A, B and C once each; the fourth credit is absent. |
| Add a credit-name search that matches C. |  | Only C remains under the combined filters. |
| Clear both the name and enabled-event filters. |  | All four recorded credits are available again. |

### SPT-5117: Dashboard - Ticket Credits - Edit a ticket-credit name and redemption limit

**Publication status:** Published and verified in Qase on 2026-10-17; updated SPT-5117; not executed.

**Title:** Dashboard - Ticket Credits - Edit a ticket-credit name and redemption limit

**Description:** Edit a saved definition’s name and per-event limit without changing its issuing or redemption assignments. The creation form calls the same limit Limit Per Item, Per User; the existing-credit editor calls it Limit Per Event, Per User. Run LimitValue separately: NoLimit = clear the field; Zero = 0; One = 1; Five = 5. Empty is no event cap; zero is a saved cap of zero, not an empty value.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a definition with one issuing ticket set to 3, one enabled redemption ticket and limit 2; record its current name.

**Postconditions:**

* Restore the original name and limit and reopen to verify the restoration; keep the existing assignments.

**Priority:** High

**Tags:** dashboard, ticket-credits, credits

**Parameters:**

LimitValue: NoLimit, Zero, One, Five

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the recorded credit. |  | Credit Name, the limit, Events Added, Events Enabled and Save show the recorded saved values. |
| Change Credit Name to a recognizable different name and enter LimitValue. |  | The edited name and selected limit appear without changing assignment selections. |
| Select Save, then reload and reopen the credit using its new name. |  | The new name and selected limit are saved; both recorded assignments and issuing quantity 3 are unchanged. |

### SPT-5636: Dashboard - Ticket Credits - Reject a ticket-credit name longer than 255 characters

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5636 (formerly TC-6); not executed.

**Title:** Dashboard - Ticket Credits - Reject a ticket-credit name longer than 255 characters

**Description:** Attempt to save a 256-character credit name on an existing definition and verify the rejected save preserves the saved definition and assignments.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select an existing credit and record its name, limit and assignments. Prepare exactly 256 letters as the replacement name.

**Postconditions:**

* No second credit was created and the original definition needs no restoration.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the recorded credit. |  | Its recorded saved values are displayed. |
| Replace Credit Name with the 256-character name and select Save. |  | The overlong value cannot be saved. |
| Reload and reopen the recorded credit. |  | Its previously saved name, limit and assignments remain unchanged. |

### SPT-5637: Dashboard - Ticket Credits - Reject an invalid redemption limit

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5637 (formerly TC-7); not executed.

**Title:** Dashboard - Ticket Credits - Reject an invalid redemption limit

**Description:** Attempt to replace a saved per-event limit with a negative or fractional number. Run InvalidLimit separately: Negative = -1; Fraction = 1.5. These are invalid values; an empty field and zero are separate supported values.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a definition with saved limit 2 and at least one issuing ticket with quantity 3. Record its name and assignments.

**Postconditions:**

* No issued customer balance or existing definition was changed.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Parameters:**

InvalidLimit: Negative, Fraction

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the recorded credit. |  | The saved limit is 2. |
| Enter InvalidLimit and select Save. |  | The invalid limit is prevented or rejected; it is not reported as a saved limit. |
| Reload and reopen the credit. |  | Limit 2 and the original assignments remain saved. |

## Issuing tickets

### SPT-5638: Dashboard - Ticket Credits - Add an issuing ticket type

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5638 (formerly TC-8); not executed.

**Title:** Dashboard - Ticket Credits - Add an issuing ticket type

**Description:** Choose a ticket type that gives customers credits when purchased and save its quantity. Run CreditsPerTicket separately: One = 1; Three = 3. This case checks the saved issuing rule; customer issuance is a separate checkout proof.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with an existing issuing event to keep, and a different future single-day event containing two ordinary ticket types. The new types use no payment plan, do not send a credit code as their ticket barcode, and neither issue nor accept this credit. Record their names, prices and inventory.

**Postconditions:**

* Restore the changed issuing selection and quantity; leave all existing event and ticket settings intact.

**Priority:** High

**Tags:** dashboard, credits

**Parameters:**

CreditsPerTicket: One, Three

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; add the new event under Events Added. |  | The event’s two recorded ticket types are displayed. |
| Enter CreditsPerTicket for the first type; leave the second without a credit. |  | Only the first type is selected to issue the chosen quantity. |
| Select Save, then reload and reopen the credit. |  | The first type issues the chosen quantity; the second remains unassigned and the original issuing event remains. |
| Open the new event in Manage Events → Edit and review its ticket types. |  | Both types still exist with their recorded names, prices and inventory. |

### SPT-5639: Dashboard - Ticket Credits - Change a saved issuing quantity

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5639 (formerly TC-9); not executed.

**Title:** Dashboard - Ticket Credits - Change a saved issuing quantity

**Description:** Change an existing issuing rule from 10 credits per purchased ticket to 9 and verify its final saved value. Run SaveMode separately with global switch enable_async_create_update_event off for Synchronous or on for BackgroundJob. A queued background save alone is not the final saved result.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* An administrator has confirmed the global enable_async_create_update_event switch matches SaveMode; background workers can finish event saves for BackgroundJob.
* Select a credit whose ordinary issuing ticket is set to 10 and does not use ticket-credit barcodes or payment plans. Record a second ticket type’s name, price, inventory and issuing quantity.

**Postconditions:**

* Restore the original issuing quantity and verify it after saving finishes; keep the recorded switch setting unchanged.

**Priority:** High

**Tags:** dashboard, credits

**Parameters:**

SaveMode: Synchronous, BackgroundJob

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit. |  | The chosen issuing ticket shows quantity 10. |
| Change only its issuing quantity to 9 and select Save. |  | The save starts without claiming a different quantity was entered. |
| After saving finishes, reload Ticket Credits and reopen the credit. |  | The chosen ticket’s saved issuing quantity is 9. |
| Open the event in Manage Events → Edit and review both ticket types. |  | The second type and the recorded names, prices and inventory remain unchanged. |

### SPT-5640: Dashboard - Ticket Credits - Remove one issuing ticket type

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5640 (formerly TC-10); not executed.

**Title:** Dashboard - Ticket Credits - Remove one issuing ticket type

**Description:** Set one saved issuing quantity to zero and save. Remove only that ticket’s credit-issuing rule while keeping another issuer and every ticket type itself.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with two ordinary issuing ticket types in one event, quantities 3 and 5. Neither uses ticket-credit barcodes. Record the event’s complete ticket-type names.

**Postconditions:**

* Restore the first type’s issuing quantity to 3 and verify both saved rules.

**Priority:** High

**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit. |  | Both issuing quantities 3 and 5 appear. |
| Change the first quantity from 3 to 0 and select Save. |  | The save completes while the second type still issues 5. |
| Reload and reopen the credit, then open the event in Manage Events → Edit. |  | The first type no longer issues this credit, the second still issues 5, and all recorded ticket types still exist. |

### SPT-5641: Dashboard - Ticket Credits - Remove an issuing event

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5641 (formerly TC-11); not executed.

**Title:** Dashboard - Ticket Credits - Remove an issuing event

**Description:** Remove an event from Events Added and save without deleting the event or its ticket types. Other issuing events and ticket types linked to another credit remain unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit issued by two separate single-day events. In the event to remove, two ticket types issue this credit and a third issues a different credit; record every quantity.

**Postconditions:**

* Restore only the removed issuing rules to their original quantities and verify them.

**Priority:** High

**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit. |  | Both issuing events and their saved quantities appear. |
| Remove the first event from Events Added and select Save. |  | The selected event is removed from this credit’s saved issuing list. |
| Reload the credit and inspect the removed event in Manage Events → Edit. |  | Only this credit’s two issuing rules are cleared; its other issuing event, the third type’s different credit and all ticket types remain intact. |

### SPT-5642: Dashboard - Ticket Credits - Cancel saving with no issuing quantity

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5642 (formerly TC-12); not executed.

**Title:** Dashboard - Ticket Credits - Cancel saving with no issuing quantity

**Description:** Cancel the confirmation shown when all issuing quantities are zero. Include an unsaved name change to prove that cancelling stops the definition save as well as the issuing changes.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with exactly one ordinary issuing ticket set to 3; record its saved name and limit.

**Postconditions:**

* Neither the definition nor its issuing rule has changed.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit. |  | The recorded name, limit and issuing quantity 3 appear. |
| Enter a different name, set the only issuing quantity to 0 and select Save. |  | A confirmation explains that all issuing quantities are zero. |
| Cancel that confirmation, then reload and reopen the original credit. |  | The original name, limit and issuing quantity 3 remain saved. |

### SPT-5643: Dashboard - Ticket Credits - Confirm saving without issuing tickets

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5643 (formerly TC-13); not executed.

**Title:** Dashboard - Ticket Credits - Confirm saving without issuing tickets

**Description:** Confirm that a credit may be saved after its last issuing rule is removed. Retain its redemption selections; no issuing tickets is different from no redemption tickets.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with exactly one ordinary issuing ticket set to 3 and one separately enabled redemption ticket; record both.

**Postconditions:**

* Restore issuing quantity 3 and verify the saved rule.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit. |  | The issuing rule and redemption selection appear. |
| Set the only issuing quantity to 0 and select Save. |  | A confirmation explains that all issuing quantities are zero. |
| Confirm the save, then reload and reopen the credit. |  | The definition still exists with no issuing ticket; the recorded redemption ticket remains enabled. |

## Redemption tickets

### SPT-5644: Dashboard - Ticket Credits - Enable one ticket type for redemption

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5644 (formerly TC-14); not executed.

**Title:** Dashboard - Ticket Credits - Enable one ticket type for redemption

**Description:** Allow a single ticket type to accept a credit, without enabling its sibling ticket or changing the credit’s issuers.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with an issuing ticket in a different event. Select a future single-day redemption event with two ordinary ticket types that do not issue this credit; neither currently accepts it.

**Postconditions:**

* Restore the original redemption selection and verify the saved assignments.

**Priority:** High

**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; find the redemption event under Events Enabled. |  | Both target ticket types are available to select. |
| Enable only the first ticket type and select Save. |  | The selected ticket type is enabled without enabling its sibling. |
| Reload and reopen the credit. |  | Only the first ticket type accepts this credit; the issuing event and quantity remain unchanged. |

### SPT-5645: Dashboard - Ticket Credits - Enable an event’s ticket types for redemption

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5645 (formerly TC-15); not executed.

**Title:** Dashboard - Ticket Credits - Enable an event’s ticket types for redemption

**Description:** Use the event-level control to enable all ordinary ticket types in one event. This exercises the bulk event control separately from selecting an individual ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with an issuer in a different event and a future single-day event with two ordinary ticket types. Neither target type uses a payment plan or issues this credit, and neither currently accepts it.

**Postconditions:**

* Restore the original event and ticket-type redemption selections.

**Priority:** High

**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; find the target event under Events Enabled. |  | Both target ticket types are currently disabled for this credit. |
| Enable the event using its event-level control and select Save. |  | Both ordinary ticket types are selected for redemption. |
| Reload and reopen the credit. |  | Both target types remain enabled and the original issuing rule is unchanged. |

### SPT-5646: Dashboard - Ticket Credits - Disable one redemption ticket type

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5646 (formerly TC-16); not executed.

**Title:** Dashboard - Ticket Credits - Disable one redemption ticket type

**Description:** Remove one ticket type’s redemption permission. Run RemainingTypes separately: One = start with two enabled ticket types in the target event; None = start with only the target type enabled. Other enabled events remain unchanged in both runs.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with another enabled redemption event to keep. Prepare the target single-day event according to RemainingTypes and record its selected ticket types. Keep at least one positive issuing quantity.

**Postconditions:**

* Restore the original redemption selections and verify them.

**Priority:** High

**Tags:** dashboard, credits

**Parameters:**

RemainingTypes: One, None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; find the target event under Events Enabled. |  | The recorded redemption selections appear. |
| Disable the target ticket type and select Save. |  | The target type is no longer selected. |
| Reload and reopen the credit. |  | The target is disabled; One retains the sibling selection, None leaves no enabled type in that event, and the other enabled event remains unchanged. |

### SPT-5647: Dashboard - Ticket Credits - Disable a redemption event

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5647 (formerly TC-17); not executed.

**Title:** Dashboard - Ticket Credits - Disable a redemption event

**Description:** Use the event-level control to remove all redemption permissions from one event while retaining a second enabled event and all issuing rules.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with two enabled redemption events. The first has two ordinary enabled ticket types; record the second event’s selections and a positive issuing quantity.

**Postconditions:**

* Restore the first event’s original redemption selections and verify them.

**Priority:** High

**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; find the first event under Events Enabled. |  | Its two ticket types are enabled. |
| Disable the event using its event-level control and select Save. |  | The event and both of its ticket types are disabled for redemption. |
| Reload and reopen the credit. |  | The first event remains disabled, while the second event and all issuing quantities retain their saved values. |

### SPT-5648: Dashboard - Ticket Credits - Find a redemption ticket type by event and ticket name

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5648 (formerly TC-18); not executed.

**Title:** Dashboard - Ticket Credits - Find a redemption ticket type by event and ticket name

**Description:** Search the redemption event list and then its ticket names without changing the saved permissions. A no-match search must not remove a permission that was already saved.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Select a credit with one enabled ticket type in each of two differently named future events; record their event and ticket names.

**Postconditions:**

* Search has changed neither the credit nor its issuing or redemption assignments.

**Priority:** Medium

**Tags:** dashboard, credits, search-filters

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; enter part of the first event name in Search Events under Events Enabled. |  | The matching event appears with its saved selection. |
| Enter part of the enabled ticket name in that event’s ticket-type search. |  | The matching ticket appears with its enabled state. |
| Replace the searches with phrases matching no event or ticket, then clear both searches. |  | The no-match results clear correctly and both original saved selections are visible again. |
| Reload and reopen the credit. |  | Both redemption permissions remain saved. |

## Assignment restrictions

### SPT-5649: Dashboard - Ticket Credits - Protect a ticket type that issues another credit

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5649 (formerly TC-19); not executed.

**Title:** Dashboard - Ticket Credits - Protect a ticket type that issues another credit

**Description:** Inspect an issuing ticket already linked to a different credit. The Ticket Credits editor must not let an employee overwrite that issuing link through the selected credit’s quantity control.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Select two distinct credit definitions A and B. A has a positive issuing quantity in one event. A different event has a ticket type issuing B with quantity 4; record its name.

**Postconditions:**

* No issuing link has changed; do not save the inspection-only event selection on A.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select A; add the other event to Events Added. |  | The ticket linked to B is identified as belonging to a different credit and its issuing quantity is unavailable for editing. |
| Review the same event under B after reloading the page. |  | The recorded ticket still issues B with quantity 4; A has not replaced it. |

### SPT-5650: Dashboard - Ticket Credits - Prevent payment-plan tickets from issuing credits

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5650 (formerly TC-20); not executed.

**Title:** Dashboard - Ticket Credits - Prevent payment-plan tickets from issuing credits

**Description:** Inspect the issuing controls for ticket types involved in payment plans. Run TicketKind separately: TicketWithPlan = the original ticket offered through a payment plan; PlanTicket = the payment-plan ticket type that issues the original ticket. An ordinary sibling ticket remains editable.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use an existing event with a configured payment plan, its original ticket and payment-plan ticket type, plus an ordinary ticket with no plan. Record those names.
* Select a credit with no issuing link on those types.

**Postconditions:**

* The original event, payment plan and ticket types remain unchanged.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Parameters:**

TicketKind: TicketWithPlan, PlanTicket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; add the prepared event to Events Added. |  | The selected TicketKind is identified as incompatible with issuing ticket credits. |
| Inspect its issuing quantity and the ordinary sibling’s quantity control. |  | The payment-plan-related quantity is disabled while the ordinary ticket’s quantity can be edited. |
| Reload the page without saving. |  | No payment-plan ticket has gained an issuing rule. |

### SPT-5651: Dashboard - Ticket Credits - Prevent payment-plan tickets from accepting credits

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5651 (formerly TC-21); not executed.

**Title:** Dashboard - Ticket Credits - Prevent payment-plan tickets from accepting credits

**Description:** Inspect individual redemption controls for ticket types involved in payment plans. Run TicketKind separately: TicketWithPlan = the original ticket offered through a payment plan; PlanTicket = the payment-plan ticket type that issues the original ticket. This case does not claim that the event-level bulk control or a direct request enforces the same rule.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use an existing event with a configured payment plan, its original ticket and payment-plan ticket type, plus an ordinary ticket with no plan. Record those names.
* Select a credit that is not currently enabled on those ticket types.

**Postconditions:**

* The original event, payment plan and ticket types remain unchanged.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Parameters:**

TicketKind: TicketWithPlan, PlanTicket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit; find the event under Events Enabled. |  | The payment-plan-related ticket and ordinary sibling are listed. |
| Inspect the selected TicketKind’s individual redemption control and the ordinary sibling’s control. |  | The payment-plan-related control is disabled while the ordinary ticket’s control remains available. |
| Reload the page without saving. |  | No payment-plan ticket has gained a redemption permission. |

### SPT-5652: Dashboard - Ticket Credits - Show the guest-information warning for limited credits

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5652 (formerly TC-22); not executed.

**Title:** Dashboard - Ticket Credits - Show the guest-information warning for limited credits

**Description:** Check the warning associated with a positive per-event limit when an issuing event does not collect information for each ticket. Run GuestCollection separately: PerTicket = the issuing event collects information for each ticket, so no warning; PerOrder = it does not, so the warning asks for per-ticket information collection.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Select a credit with limit 2 and one ordinary issuing ticket set to 3. The issuing event’s guest-information collection matches GuestCollection.
* Record the event’s current collection setting; changing a production event is not part of this case.

**Postconditions:**

* No collection setting, credit definition or issued balance was changed.

**Priority:** Medium

**Tags:** dashboard, credits

**Parameters:**

GuestCollection: PerTicket, PerOrder

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit. |  | The saved positive limit 2 and issuing event appear. |
| Review the message beside the limit. |  | PerOrder shows the request to enable guest information collection for each ticket; PerTicket has no such warning. |
| Reload and reopen the credit. |  | The warning still matches the event’s saved collection setting and no credit values have changed. |

## Empty, disabled and restricted access

### SPT-5653: Dashboard - Ticket Credits - Show an organization with no ticket-credit definitions

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5653 (formerly TC-23); not executed.

**Title:** Dashboard - Ticket Credits - Show an organization with no ticket-credit definitions

**Description:** Open Ticket Credits for an organization with no active definitions. Distinguish the empty list from a failed load, and keep the new-credit action available.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Select an organization with no active Ticket Credit definitions; do not delete existing credits to prepare this state.

**Postconditions:**

* The organization still has no newly created definition.

**Priority:** Medium

**Tags:** dashboard, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits with no search or event filter applied. |  | The list reports that no ticket credits were found and no definition is selected. |
| Select New Ticket Credit, then Cancel. |  | The creation form can be opened and cancelled without adding a definition. |
| Reload Ticket Credits. |  | The list remains empty. |

### SPT-5654: Dashboard - Ticket Credits - Show ticket credits as disabled for the organization

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5654 (formerly TC-24); not executed.

**Title:** Dashboard - Ticket Credits - Show ticket credits as disabled for the organization

**Description:** Check the Ticket Credits page when the organization’s Discounts setting is off. The disabled message explains that Discounts must be enabled in Organization Info; credit-management forms are not available.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS).
* The organization uses Standard or Premium pricing and its saved Discounts setting is off; an authorized administrator has confirmed it.

**Postconditions:**

* Leave the recorded Discounts setting unchanged.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits. |  | A message says ticket credits are disabled and directs the employee to enable Discounts in Organization Info. |
| Review the page’s creation and assignment areas. |  | No new-credit or editable assignment form is available. |
| Reload the page. |  | The disabled state remains and no definition or assignment has changed. |

### SPT-5655: Dashboard - Ticket Credits - Deny Ticket Credits management without Manage Events

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5655 (formerly TC-25); not executed.

**Title:** Dashboard - Ticket Credits - Deny Ticket Credits management without Manage Events

**Description:** Open the protected Ticket Credits page as an employee without Manage Events. This checks page access, not blanket denial of the credit-list API that Box Office employees may legitimately use.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Use a non-administrator employee with active employment but without **Manage Events** (VP_MANAGE_EVENTS).
* The organization has Discounts on and Standard or Premium pricing; have a previously saved Ticket Credits page link for it.

**Postconditions:**

* The organization’s definitions and assignments remain unchanged.

**Priority:** High

**Tags:** dashboard, credits, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the restricted employee and select the organization. |  | The employee is signed into the intended organization. |
| Open the saved Ticket Credits page link. |  | Access to the management page is denied; no editable definition or assignment form appears. |
| Reload the protected page. |  | Management access remains denied. |

### SPT-5656: Dashboard - Ticket Credits - Deny Ticket Credits management on Basic pricing

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5656 (formerly TC-26); not executed.

**Title:** Dashboard - Ticket Credits - Deny Ticket Credits management on Basic pricing

**Description:** Open the Ticket Credits management page for a Basic-pricing organization. Backend page access requires Standard or Premium even when the employee has Manage Events.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* Select an organization already on Basic pricing with Discounts on; have its previously saved Ticket Credits page link. Do not downgrade an organization to prepare this case.

**Postconditions:**

* Leave the organization’s pricing tier unchanged.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in to Dashboard and select the Basic-pricing organization. |  | The intended organization is selected. |
| Open its previously saved Ticket Credits page link. |  | The management page denies access and does not expose an editable credit form. |
| Reload the protected page. |  | Access remains denied and no credit configuration changes. |

### SPT-5657: Dashboard - Ticket Credits - Keep ticket credits separate when switching organizations

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5657 (formerly TC-27); not executed.

**Title:** Dashboard - Ticket Credits - Keep ticket credits separate when switching organizations

**Description:** Switch between two organizations and verify each organization’s own definitions, issuers and redemption permissions. Reuse similar names so a stale selection cannot be mistaken for correct data.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has **Manage Events** (VP_MANAGE_EVENTS) in two Standard- or Premium-pricing organizations with Discounts on.
* Each organization has a similarly named credit with different saved limits and assignments; record both complete sets.

**Postconditions:**

* Neither organization’s definitions, events or customer credits were changed.

**Priority:** High

**Tags:** dashboard, credits, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits in the first organization and select its recorded credit. |  | Only its own saved limit and assignments are displayed. |
| Use the Dashboard organization selector to switch to the second organization and open Ticket Credits. |  | The second organization’s own list appears without the first organization’s selected definition. |
| Open the second organization’s recorded credit, then return to the first organization and reopen its credit. |  | Each organization retains its own recorded limit and event/ticket assignments. |

## Saved-state and entitlement regressions

### SPT-5658: Dashboard - Ticket Credits - Reject a fractional issuing quantity

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5658 (formerly TC-28); not executed.

**Title:** Dashboard - Ticket Credits - Reject a fractional issuing quantity

**Description:** Try to replace an ordinary ticket’s saved issuing quantity with 1.5. Credit quantities must save as whole numbers; an unsuccessful event save must not be mistaken for a completed assignment change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Select a credit with an ordinary issuing ticket set to 3, another issuer to retain, and unchanged definition name, limit and redemption selections. The selected ticket does not use credit barcodes.
* Global enable_async_create_update_event is off for this rejection check, so the rejected event response is immediate.

**Postconditions:**

* No retry is needed; the definition’s name, limit and redemption selections remain as recorded.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the credit. |  | The selected issuing ticket shows quantity 3. |
| Enter 1.5 for that ticket and select Save. |  | The fractional quantity is prevented or the save reports an error; 1.5 is not reported as saved. |
| Reload and reopen the credit. |  | The original whole-number quantity 3 and the other issuing rule remain saved. |

### SPT-5659: Dashboard - Ticket Credits - Apply an edited event limit to credits already issued

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5659 (formerly TC-29); not executed.

**Title:** Dashboard - Ticket Credits - Apply an edited event limit to credits already issued

**Description:** Change a definition’s event limit and prove that an already-issued customer credit uses the new allowance. Run Scaling separately: Enabled = global scale_aggregated_ticket_credit_per_event_limit on, allowing four tickets after the edit; Disabled = the same switch off, allowing two. A completed purchase of two ordinary issuing tickets has issued six uses in one combined credit. Change the definition’s limit from 1 to 2; no customer purchase is completed during this check.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* An administrator has confirmed global scale_aggregated_ticket_credit_per_event_limit matches Scaling; do not change a shared rollout switch during execution.
* Use a controlled customer’s existing completed order for two ordinary issuing tickets, three credits each: one combined, non-barcode Ticket Credit has six unused uses. The issuing definition currently has event limit 1 and a positive issuing quantity.
* The definition permits an ordinary public ticket priced at 10 in the organization’s currency on a future published event with sufficient inventory. The customer can sign in and apply their own credit.
* Record the original issuing order, customer credit code and balance, and definition values; use no real customer’s credits.

**Postconditions:**

* Restore the original definition limit 1 and verify it after reload.
* Retain the original issuing order and credit; do not delete purchase or financial history.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Parameters:**

Scaling: Enabled, Disabled

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits as the employee and select the issuing definition. |  | The saved event limit is 1. |
| Change only the event limit to 2 and select Save, then reload and reopen. |  | The definition’s saved event limit is 2. |
| As the controlled customer, open the enabled redemption event and add the allowed ticket quantity. | Scaling: Enabled = 4 tickets; Disabled = 2 tickets. | The basket contains exactly the selected number of tickets priced at 10 each. |
| Apply the existing six-use Ticket Credit. |  | Every selected ticket receives its full base-price credit: 40 for Enabled or 20 for Disabled; any separately payable fees remain separately identified. |
| Remove the credit and leave checkout without completing an order. |  | No new redemption order is created and the credit’s available balance returns to six. |

### SPT-5660: Dashboard - Ticket Credits - Preserve event edits made before saving an issuing quantity

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5660 (formerly TC-30); not executed.

**Title:** Dashboard - Ticket Credits - Preserve event edits made before saving an issuing quantity

**Description:** Keep a Ticket Credits form open while another authorized employee edits the issuing event. Saving the issuing quantity must retain the newer event and ticket details rather than replacing them with the values loaded earlier.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in the selected organization.
* The organization uses Standard or Premium pricing and has Discounts enabled.
* Use credit definitions and events reserved for these checks, with no real customer purchases or active sales; record their original names, limits, issuing quantities and redemption selections before changing them.
* Two signed-in sessions have Manage Events for the same organization. The credit has an ordinary single-day issuing ticket set to 10 with no orders or active sales and no credit-barcode behavior.
* Record the event name, start time and both ticket types’ names, prices and inventory; record a recognizable alternative event name.

**Postconditions:**

* Restore the original event name and issuing quantity and verify both after reopening.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits in the first session and select the credit; leave the form open. |  | The issuing quantity shows 10. |
| In the second session, open Manage Events → Edit for the issuing event, change its name to the recorded alternative name and save. |  | The new event name is saved. |
| In the first session, change only the issuing quantity from 10 to 9 and select Save. |  | The credit-assignment save finishes. |
| Reload Ticket Credits and reopen the credit, then reopen the event in Manage Events → Edit. |  | Quantity 9 and the newer event name are both saved; the start time and both ticket types’ names, prices and inventory remain as recorded. |

### SPT-5661: Dashboard - Ticket Credits - Keep a zero redemption limit from acting as unlimited

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5661 (formerly TC-31); not executed.

**Title:** Dashboard - Ticket Credits - Keep a zero redemption limit from acting as unlimited

**Description:** Save a definition’s event limit as 0 and try to apply an existing customer credit. Zero allows no uses at the event; it must not behave like an empty, unlimited field. This checks the saved rule and a rejected credit application without completing a purchase.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in a Standard- or Premium-pricing organization with Discounts on.
* Use a controlled customer’s existing unused Ticket Credit with three available uses, issued by a definition whose current event limit is 2 and whose issuing quantity is positive. Record the definition, original issuing order, credit code and balance; use no real customer’s credits.
* The definition permits an ordinary public ticket priced at 10 in the organization’s currency on a future published event with available inventory. The controlled customer can sign in and apply their own credit.

**Postconditions:**

* Leave the checkout without purchasing; verify that the customer still has three available uses and no new redemption order.
* Restore the original definition limit 2 and verify it after reload; retain the original issuing order and credit.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits as the employee and select the recorded definition. |  | The saved limit is 2. |
| Set its event limit to 0 and select Save, then reload and reopen it. | Enter the number 0; do not clear the field. | The saved field shows 0. |
| As the controlled customer, open the enabled redemption event and add one ticket to checkout. | One ticket with base price 10. | The basket contains one ticket; record its complete pre-credit total. |
| Apply the recorded three-use Ticket Credit. |  | No ticket-credit discount is applied, the pre-credit total remains unchanged, and the credit is unavailable under its event limit. |
| Leave checkout without purchasing and reopen the customer’s Ticket Credits. |  | All three uses remain available and no redemption order has been created. |

### SPT-5662: Dashboard - Ticket Credits - Keep separate issuing and redemption tickets in the same event

**Publication status:** Published and verified in Qase on 2026-10-17; created as SPT-5662 (formerly TC-32); not executed.

**Title:** Dashboard - Ticket Credits - Keep separate issuing and redemption tickets in the same event

**Description:** Enable redemption on one ordinary ticket type while a different ticket type in the same event issues that credit. The backend prevents one ticket type from both issuing and accepting the same credit; it does not prohibit two different ticket types in one event from having those separate roles.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Employee permission: **Manage Events** (VP_MANAGE_EVENTS) in a Standard- or Premium-pricing organization with Discounts on.
* Use a future single-day event reserved for these checks with two ordinary ticket types and no orders or active sales. Neither uses a payment plan or sends credit codes as ticket barcodes.
* The first ticket type issues the chosen credit with quantity 3; the second neither issues nor accepts it. The first does not accept it. Record the names and original assignments.

**Postconditions:**

* Restore only the second type’s original disabled redemption selection and verify it after reload; the first must still issue quantity 3.
* Neither event nor ticket type is deleted or otherwise changed.

**Priority:** High

**Tags:** dashboard, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Ticket Credits and select the recorded credit. |  | The first ticket type shows issuing quantity 3. |
| Find the same event under Events Enabled and enable only the second ticket type. |  | The second type is selected for redemption while the first still issues quantity 3. |
| Select Save, then reload and reopen the credit. |  | The first type still issues 3, the second accepts the credit, and neither type both issues and accepts it. |

## Publication — approved 33-case batch

The user confirmed **yes** to the exact preview. Created **32 cases** and refined **SPT-5117** in **Ticket credits (1149)**: **33 saved definitions**, including **13 parameterized cases**. The new IDs are **SPT-5631–SPT-5662**; the index maps each previous TC label to its assigned ID.

All approved titles, descriptions, prerequisites, cleanup, steps/results, tags, parameters and priorities match the saved cases. Existing SPT-5117 metadata and original tags were preserved. No case was deleted or moved, and all original project case IDs remain present. Complete post-publication read: **2,126 unique cases / 22 pages**, **317 suites / 4 pages**, completed **2026-10-17T16:16:13.176Z**. These are published definitions, **not executed tests or financial/release approval**.

Exact-scope approval · Apply receipt and ID mapping · Full-field verification · Saved definitions · Frozen approved source.

TC labels in the following coverage ledger and original preview are pre-publication traceability; all 32 now have the SPT IDs listed in the index. Blocked/deferred rows remain gaps and were not turned into extra cases.

## Coverage and remaining gaps

Every authored case above is **Manual-only / not executed**. Backend source supports its saved-data rule; the legacy templates/controllers in web-app support the named controls. Beta/Next.js control bindings are **unverified** under the requested backend-only boundary. Do not count a draft, a queued save or an existing Qase definition as an executed pass.

| Behavior / risk | Ownership and disposition |
| --- | --- |
| Create, reopen, cancel, valid name length and edit/save | TC-1–3, TC-6 and SPT-5117; Manual-only. SPT-5117’s former create coverage moves to TC-1; event-scoped availability moves to TC-5/14–17; denied direct access moves to TC-25/26. No useful existing assertion is intentionally dropped. |
| Name and enabled-event filters, combined filters and stale selected details | TC-3–5 and TC-18; Manual-only. Event filtering means redemption events, not issuing events; multiple event matches must not duplicate a definition. |
| Empty list versus Discounts off versus no permission versus Basic pricing | TC-23–26; Manual-only, separate starting states. Discounts off is a template/UI restriction; it is not proof that every API write is denied. |
| Blank, zero, positive, invalid and already-issued event limits | SPT-5117; TC-7/22/29/31; Manual-only. Empty is null/no cap; zero is a real cap of zero. TC-29 tests the update of existing customer credits; SPT-4978 tests scaling on a new purchase instead. |
| Add/change issuing quantity, remove one type or whole event, preserve unrelated types | TC-8–11/28/30; Manual-only. TC-9 includes synchronous and background saves; TC-30 retains a newer event name from another session. |
| No issuing quantities: cancel versus confirm | TC-12/13; Manual-only. The confirmation is client behavior in the backend repository; the API itself has no “at least one issuer” rule. |
| Individual versus whole-event redemption; remove one/last type or whole event | TC-14–17; Manual-only. Event-level and individual controls are distinct. Permission serializers reuse rows and models enforce unique event/type relationships. |
| Another credit owns the issuer; payment-plan controls and guest-information warning | TC-19–22; Manual-only legacy-control contracts. These UI checks do not prove direct-request enforcement. |
| Different issuing and redemption types within one event | TC-32; Manual-only; regression target with a source conflict. Backend checks reject the same ticket type, not the whole event. Legacy add-redemption helpers clear **every issuer in the same event**, so this case is not assumed to pass there. This is an unexecuted implementation concern, not a confirmed beta defect. |
| Organization switching and ownership | TC-27; Manual-only. Direct cross-organization/nested event/type ID tampering remains **Blocked** on scoped API cases: the outer queryset is organization-scoped, but reviewed non-BOGO nested permission models do not establish all event/type ownership checks. Do not substitute organization switching for API security proof. |
| One ticket type issuing and accepting the same credit | Backend rejects both assignment directions on existing records. **Blocked** on current-client transition/rejection cases: legacy UI clears staged issuers, while its save writes the definition before the issuing events, which can still hit the backend guard. Do not prescribe an invented seamless conversion or claim all staged changes are atomic. |
| Save failure, retry, timeout, worker failure, lost response, double submit and concurrent definition edits | **Blocked** on controlled API/job failures and replacement-client handling. Individual definition create/update requests are atomic; a definition save followed by multiple event saves is not one cross-request transaction. The synchronous fractional-quantity case does not close partial-save recovery or duplicate-creation risk. |
| Credit-list pagination, event-picker pagination/load more, no-ticket-type event and already-selected event exclusion | **Blocked for beta UI binding**, not silently covered by search. Legacy source uses paged credits, event load more, no-ticket-type messages and duplicate exclusion. Backend API defaults differ from legacy requested page sizes; no beta page size or replacement pagination control is guessed. |
| Recurring parents/occurrences, historical events, archived records and reseller events | **Deferred** from this single-day page baseline until exact supported selection/inheritance paths are bound. Source hides children for issuer picking, allows other filters for redemption and restricts child edits; do not parameterize these as equivalent single-event setups. |
| Blank/whitespace names, duplicate names, negative/zero/missing/very large issuing quantities and barcode issuers | **Blocked expectation refinement.** Name is blankable in the model and can fall back to an automatically generated code; duplicate descriptions are allowed. Issuing quantity is an integer with a conditional requirement, not a demonstrated positive-only rule. Barcode issuers normalize quantity to 1, with a serializer guard dependent on supplied fields. No fabricated blank-name, unique-name or negative-quantity rejection case is included. |
| Customer earn/spend, balance/eligibility, usage reporting | **Reuse definitions:** [SPT-3338](https://app.qase.io/case/SPT-3338), [SPT-3340](https://app.qase.io/case/SPT-3340), [SPT-4978](https://app.qase.io/case/SPT-4978), [SPT-25](https://app.qase.io/case/SPT-25), [SPT-31](https://app.qase.io/case/SPT-31), [SPT-4393](https://app.qase.io/case/SPT-4393). These are definition coverage, not verified current passes. TC-29/31 add the distinct saved-definition → existing-credit effect without a new paid order. |
| Purchase success, exact fees/Showpass revenue, duplicate charging, last-credit contention, oversell/release and Refund/Void/Exchange | **Deferred downstream execution/enhancement** with controlled orders, independently calculated fees and payment/usage evidence. Existing broad cases do not establish these gates. The Ticket Credits page does not edit ticket prices/rate cards; their historical protection is checked only for unintended overwrite in TC-8/9/30. No release or financial-pass claim is made. |
| Keyboard/focus, mobile layout, locale, loading/read-error retry and unsaved-navigation recovery | **Deferred replacement-client coverage:** backend-only evidence cannot establish the new components, current labels or transitions. Exact supported clients and controlled states must be supplied before executable cases are added. |
| Banner/preview selection and deletion/export/printing on this page | Banner and preview actions are **out of scope by request**. No delete/export/print control is established for this page by the reviewed templates; API soft-delete capability alone does not justify inventing a page action or deleting credits for cleanup. |

## Short source and Qase evidence

**Source:** [[01 Repositories/Backend - web-app]] at `b5f397a0438910435e0d537f47e12d6064d7e019`, clean checkout when reviewed. No frontend-repository read, browser inspection, build, live mutation or automated product test was performed. The supplied route `/dashboard/events/ticket-credits/` can render legacy content or a `/manage/ticket-credits/` embed; the URL alone does not establish which beta implementation is deployed. Common navigation used in cases is the Ticket Credits link in the backend-owned Dashboard menu; the replacement shell’s navigation remains unverified.

| Source in web-app | Contract used |
| --- | --- |
| [ticket_credits view](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/dashboard/views.py:183), [pricing guard](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/permissions/decorators.py:94), [Dashboard link](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/navigation/dashboard/side-menu.html:210) | Manage Events; Standard/Premium page access; existing Dashboard entry and embed wrapper. Preview/banner behavior is excluded. |
| [VenueBasedDiscountViewSet](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/discounts.py:56), [organization-bound viewsets](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/api/viewsets/audiences.py:101), [discount filters](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/filters/filters.py:16) | Scoped records; atomic definition create/update; search/filter/pagination; deleted records excluded. List access intentionally has no Manage Events requirement; management writes do. |
| [Discount fields](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/discount_management/discounts.py:55), [serializer](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/discounts.py:40), [_validate_event_discount_permissions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/discounts.py:365) | Name maximum 255, nullable nonnegative event limit, retained discount type; existing self-generation/payment-plan rejection and nested permission reuse. |
| [generate_credits](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/discount_management/discounts.py:470), [_voucher_sync_with_children](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/discount_management/discounts.py:694), [issuance](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:731), [limit availability](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/financials/discount_usage_limit_validation.py:346) | Quantity-based issuance, existing-credit limit updates, global scaling switch, zero versus no event cap. |
| [ticket-type validation](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/ticket_types.py:247), [ticket-type model](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event_ticket_types.py:409), [event update](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py:245) | Self-redemption guard, quantity/barcode rules, partial event writes and asynchronous job response. |
| [page template](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/credits/_credits.html:1), [definition form](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/dialogs/_create-edit-discount.html:73), [controller](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/Discounts.js:165), [assignment helpers](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/Discounts.js:556) | Backend-owned legacy labels, Discounts gate, confirmation, sequential definition/event saves, disabled controls, warning and same-event clearing concern. These do not prove beta component behavior. |
| [partial-update regression definitions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/api/venue/events/test_api_venue_based_events.py:6305) | Existing tests document quantity-only update, issuing removal and background-job saved state; consulted, not run. |

**Qase baseline:** reused the complete SPT snapshot retrieved **2026-10-17 15:45:38–15:45:48 UTC**, after the earlier seating publication: **2,094 unique cases / 21 pages; 317 suites / 4 pages**, stable totals and unique IDs verified. Suite **1149 Ticket credits**, under suite **83**, contains **SPT-5117** only. Its steps have mismatched results and one missing expected result; its `scope=venue,event` text is embedded description JSON, not a native case parameter or evidence of separate definition ownership. Definitions are organization-owned, with event/ticket redemption permissions.

Full-field local filtering over titles, descriptions, prerequisites, steps/results, tags and parameters for ticket credits, Flex Passes, vouchers, credit codes and redemption produced **22 candidates**. Read SPT-5117 and the directly relevant neighboring cases listed above; remaining matches concern other credits, reporting or other owning pages. No equivalent focused organizer-assignment definition was found in that snapshot. The separate [[03 Test Cases/Ticket Credits/SPD-2383-ticket-credit-flex-pass-per-event-limit|Flex Pass purchase regression note]] remains the canonical checkout note; this page note does not replace or duplicate it.

**Preservation:** SPT-5117 retains its existing `dashboard` and `ticket-credits` tags; `ticket-credits` is an existing tag being preserved, not a new tag proposal. New cases use approved `dashboard`, `credits`, `edge-case`, `search-filters` and `employee-permissions` tags. Existing creation, edit, event-availability and access intentions are mapped to the focused cases above. The exact batch was subsequently approved, published and verified above; no unrelated Qase cases or live Showpass data were changed.

**Local review:** all **33** case sections passed the reusable Markdown-to-Qase parser with standalone fields and step/result pairs; **13** cases retain native parameters and their mappings. Local titles, labels and full step/result sequences are unique; no new exact title duplicates the complete Qase snapshot. Semantic comparison keeps the existing checkout/reporting cases at their owning workflows. This earlier local parsing/duplicate review was followed by the approved Qase dry run, publication and full-field verification recorded above; no product test was executed. Parser review and exact case index · Saved Qase baseline and neighboring definitions.

## Approved Qase preview — retained for traceability

**Read-only dry run passed:** create **TC-1–TC-32** and update **SPT-5117**, all in existing **Ticket credits (1149)**. Total **33 operations**, **13 parameterized cases**, no deletes or moves. No blocked/deferred coverage-ledger row is being created as a case. The banner remains excluded.

SPT-5117 is a proposed **refactor/split**: retain edit/save as its main case; creation moves to TC-1, event availability to TC-5/14–17, and denied access to TC-25/26. Replace only Title, Description, Preconditions, Postconditions, Steps, Tags, Parameters and Priority. Existing type, behavior, layer, suite, status, automation and other unrelated metadata remain outside the update. Existing tags are retained. TC labels do not enter Qase titles or execution fields.

**Fresh duplicate check:** complete SPT read **2026-10-17 16:10:39–16:10:49 UTC**, **2,094 unique cases/21 pages, 317 suites/4 pages**; suite 1149 still contains SPT-5117 only. Local labels, normalized titles, update targets and complete step/result sequences are unique; no new exact title matches the project snapshot. Previously reviewed neighboring checkout/reporting cases retain their own distinct responsibilities.

**Approval completed:** after this exact preview, the user replied **yes**, confirming all 33 operations and the SPT-5117 split under the vault’s [[05 Tooling/qasectl#Ambiguous Or Bulk Request Guard|bulk-write guard]]. Publication and full-field readback verification are complete above. The table below retains the original local labels; it is not a second pending batch.

Exact scope and parser-verified parameters · Full dry-run preview · SPT-5117 preservation baseline · Dry-run-only batch plan.

| Local label / existing ID | Action | Qase title | Suite | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| TC-1 | create | Dashboard - Ticket Credits - Create a ticket credit | 1149 | dashboard, credits | NameInput: Ordinary, MaximumLength | 4 |
| TC-2 | create | Dashboard - Ticket Credits - Cancel creating a ticket credit | 1149 | dashboard, credits | CloseMethod: Cancel, CloseButton | 4 |
| TC-3 | create | Dashboard - Ticket Credits - Open an existing ticket credit | 1149 | dashboard, credits | None | 3 |
| TC-4 | create | Dashboard - Ticket Credits - Search ticket credits by name | 1149 | dashboard, credits, search-filters | SearchInput: PartialName, MixedCase, NoMatch | 3 |
| TC-5 | create | Dashboard - Ticket Credits - Filter ticket credits by redemption event | 1149 | dashboard, credits, search-filters | EventSelection: OneEvent, TwoEvents | 3 |
| SPT-5117 | update | Dashboard - Ticket Credits - Edit a ticket-credit name and redemption limit | 1149 | dashboard, ticket-credits, credits | LimitValue: NoLimit, Zero, One, Five | 3 |
| TC-6 | create | Dashboard - Ticket Credits - Reject a ticket-credit name longer than 255 characters | 1149 | dashboard, credits, edge-case | None | 3 |
| TC-7 | create | Dashboard - Ticket Credits - Reject an invalid redemption limit | 1149 | dashboard, credits, edge-case | InvalidLimit: Negative, Fraction | 3 |
| TC-8 | create | Dashboard - Ticket Credits - Add an issuing ticket type | 1149 | dashboard, credits | CreditsPerTicket: One, Three | 4 |
| TC-9 | create | Dashboard - Ticket Credits - Change a saved issuing quantity | 1149 | dashboard, credits | SaveMode: Synchronous, BackgroundJob | 4 |
| TC-10 | create | Dashboard - Ticket Credits - Remove one issuing ticket type | 1149 | dashboard, credits | None | 3 |
| TC-11 | create | Dashboard - Ticket Credits - Remove an issuing event | 1149 | dashboard, credits | None | 3 |
| TC-12 | create | Dashboard - Ticket Credits - Cancel saving with no issuing quantity | 1149 | dashboard, credits, edge-case | None | 3 |
| TC-13 | create | Dashboard - Ticket Credits - Confirm saving without issuing tickets | 1149 | dashboard, credits, edge-case | None | 3 |
| TC-14 | create | Dashboard - Ticket Credits - Enable one ticket type for redemption | 1149 | dashboard, credits | None | 3 |
| TC-15 | create | Dashboard - Ticket Credits - Enable an event’s ticket types for redemption | 1149 | dashboard, credits | None | 3 |
| TC-16 | create | Dashboard - Ticket Credits - Disable one redemption ticket type | 1149 | dashboard, credits | RemainingTypes: One, None | 3 |
| TC-17 | create | Dashboard - Ticket Credits - Disable a redemption event | 1149 | dashboard, credits | None | 3 |
| TC-18 | create | Dashboard - Ticket Credits - Find a redemption ticket type by event and ticket name | 1149 | dashboard, credits, search-filters | None | 4 |
| TC-19 | create | Dashboard - Ticket Credits - Protect a ticket type that issues another credit | 1149 | dashboard, credits, edge-case | None | 2 |
| TC-20 | create | Dashboard - Ticket Credits - Prevent payment-plan tickets from issuing credits | 1149 | dashboard, credits, edge-case | TicketKind: TicketWithPlan, PlanTicket | 3 |
| TC-21 | create | Dashboard - Ticket Credits - Prevent payment-plan tickets from accepting credits | 1149 | dashboard, credits, edge-case | TicketKind: TicketWithPlan, PlanTicket | 3 |
| TC-22 | create | Dashboard - Ticket Credits - Show the guest-information warning for limited credits | 1149 | dashboard, credits | GuestCollection: PerTicket, PerOrder | 3 |
| TC-23 | create | Dashboard - Ticket Credits - Show an organization with no ticket-credit definitions | 1149 | dashboard, credits | None | 3 |
| TC-24 | create | Dashboard - Ticket Credits - Show ticket credits as disabled for the organization | 1149 | dashboard, credits, edge-case | None | 3 |
| TC-25 | create | Dashboard - Ticket Credits - Deny Ticket Credits management without Manage Events | 1149 | dashboard, credits, employee-permissions | None | 3 |
| TC-26 | create | Dashboard - Ticket Credits - Deny Ticket Credits management on Basic pricing | 1149 | dashboard, credits, edge-case | None | 3 |
| TC-27 | create | Dashboard - Ticket Credits - Keep ticket credits separate when switching organizations | 1149 | dashboard, credits, employee-permissions | None | 3 |
| TC-28 | create | Dashboard - Ticket Credits - Reject a fractional issuing quantity | 1149 | dashboard, credits, edge-case | None | 3 |
| TC-29 | create | Dashboard - Ticket Credits - Apply an edited event limit to credits already issued | 1149 | dashboard, credits, edge-case | Scaling: Enabled, Disabled | 5 |
| TC-30 | create | Dashboard - Ticket Credits - Preserve event edits made before saving an issuing quantity | 1149 | dashboard, credits, edge-case | None | 4 |
| TC-31 | create | Dashboard - Ticket Credits - Keep a zero redemption limit from acting as unlimited | 1149 | dashboard, credits, edge-case | None | 5 |
| TC-32 | create | Dashboard - Ticket Credits - Keep separate issuing and redemption tickets in the same event | 1149 | dashboard, credits, edge-case | None | 3 |
