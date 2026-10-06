---
title: Event — Upgrades
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Upgrades

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Scope and shared coverage

These existing cases remain in [Upgrade Paths — suite 818](https://app.qase.io/project/SPT?suite=818). The event page must retain the selected event and show only supported origins/destinations; a successful list load does not prove a completed customer upgrade. Use the existing create/edit/delete, origin uniqueness and customer messaging cases below. No shared suite is relocated.

Source: [event upgrades page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ui/pages/EventUpgradePathsPage.web.tsx>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-4290: Dashboard - Upgrade Paths - Access to Upgrades

**Description:**

Verify that the system correctly manages visibility and access to the Upgrades section based on the user's `VP MANAGE EVENTS` permission.

**Preconditions:**

* **Test Environment:** Staging or production-like with Item Upgrades deployed.
<br>
* **Known URL:** The direct link to the Upgrades section (/manage/events/upgrade-paths/).
<br>
* **Venue Context:** The venue must be valid and associated with the user.

**Postconditions:**

Not supplied in Qase.

**Tags:** 

**Parameters:**

Permission: HasVpManageEvents, NoVpManageEvents

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Log in as **user with** `VP MANAGE EVENTS `permission |  | Dashboard home loads for the authorized user. |
| Locate the main navigation. |  | A menu item labeled "Upgrade Paths" is visible. |
| Click "Upgrade Paths" and wait for the page to load. |  | The Upgrade Paths list page loads (table or empty state). |
| Log out and log in as **user without** `VP MANAGE EVENTS `permission |  | Dashboard home loads for the restricted user. |
| Locate the main navigation. |  | "Upgrade Paths" is not visible. |
| Manually enter the known Upgrades URL in the browser. |  | Access is denied (403 error) or user is redirected to a safe page. |

### SPT-4291: Dashboard - Upgrade Paths - Create Upgrade Path

**Description:**

Validate that an organizer can successfully create various types of upgrade paths within the same venue.

**Preconditions:**

* Test user has **VP MANAGE EVENTS** permission.
<br>
* Venue has at least two ticket types (e.g., "GA", "VIP") and two membership levels (e.g., "Silver", "Gold").

**Postconditions:**

Not supplied in Qase.

**Tags:** 

**Parameters:**

UpgradePathType: TicketToTicket, TicketToMembership

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Log in to the Dashboard and click the **"Upgrade Paths"** menu item |  | The **Upgrade Paths** list page loads successfully |
| Click the **"Create upgrade path"** button |  | The creation modal appears |
| Under **"Upgrade from"**, select the Item Type (**Events** or **Memberships**). |  | The selection is highlighted; the search field below updates to "Search events" or "Search memberships". |
| Use the search field to find and select the specific **Origin** item. |  | The selected item is populated in the origin section. |
| Under **"Upgrade to"**, select the destination Item Type (**Events** or **Memberships**). |  | The selection is highlighted; the destination search field updates accordingly. |
| Use the search field to find and select the specific **Destination** item. |  | The selected item is populated in the destination section. |
| (Optional) Enter a value in the **"Description"** text area. |  | The field accepts custom internal notes or descriptions. |
| (Optional) Enter a value in the **"Description"** text area. |  | The field accepts custom internal notes or descriptions. |
| (Optional) Modify the **"Upgrade message template"** (e.g., using `{{to_item_name}}` and `{{price_difference}}`). |  | The template field accepts text and variables for customer-facing messaging. |
| Click **"Create"**. |  | The modal closes, a success feedback message appears, and the new path is listed in the table. |

### SPT-4294: Dashboard - Upgrade Paths - Origin Uniqueness Constraint

**Description:**

Verify that the system enforces a "one upgrade path per origin" rule, preventing a single ticket type or membership level from being the origin for multiple paths

**Preconditions:**

* An existing upgrade path already exists (e.g., **Origin: GA Ticket** ➔ **Destination: VIP Ticket**).
<br>
* A second destination exists (e.g., **Membership Level: Gold**).

**Postconditions:**

Not supplied in Qase.

**Tags:** 

**Parameters:**

OriginItemType: Event, Membership

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Navigate to the **"Upgrade Paths"** section and click the **"Create upgrade path"** button |  | The "Create upgrade path" modal opens |
| Under **"Upgrade from"**, select the **Item Type** corresponding to your existing path (Event or Membership). |  | The selection is highlighted and the search field updates. |
| Use the search field to select the **same Origin item** used in the pre-existing path |  | The origin item is populated in the form |
| Under **"Upgrade to"**, select same or different **Item Type** and **Destination** than the existing path |  | The destination item is populated in the form |
| Attempt to click the **"Create"** button. |  | The system blocks the creation and displays a validation error |
| Close the modal and verify the **"Upgrade Paths"** list table. |  | No new path has been added; only the original upgrade path remains for that origin item. |

### SPT-4295: Dashboard - Upgrade Paths - Edit Existing Upgrade Path

**Description:**

Verify that an organizer can modify all fields of an existing upgrade path, including the origin and destination items.

**Preconditions:**

* User has **VP MANAGE EVENTS** permission.
<br>
* At least one upgrade path already exists in the **Upgrade Paths** list.

**Postconditions:**

Not supplied in Qase.

**Tags:** 

**Parameters:**

Field: UpgradeFrom, UpgradeTo, Description, UpgradeMessageTemplate

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Navigate to **Upgrade Paths** and click the **Edit** action for an existing path. |  | The "Edit upgrade path" modal opens with all current data pre-populated. |
| Change the **Upgrade from** or **Upgrade to** Item Type. |  | The corresponding search field updates to "Search events" or "Search memberships" |
| Search for and select a new **Origin** or **Destination** item. |  | The new item is selected; the system prepares to update the path mapping |
| Update the **Description** field with new internal notes. |  | The text area accepts and retains the new input. |
| Modify the **Upgrade message template** (e.g., using `{{to_item_name}}`) . |  | The field accepts the text; clearing it will cause the system to use default copy |

### SPT-4296: Dashboard - Upgrade Paths - Delete Upgrade Path

**Description:**

Ensure that deleting an upgrade path removes it from the Dashboard and prevents it from appearing to customers .

**Preconditions:**

* User has **VP MANAGE EVENTS** permission.
<br>
* A known upgrade path exists (e.g., GA Ticket ➔ VIP Ticket).

**Postconditions:**

Not supplied in Qase.

**Tags:** 

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the **Upgrade Paths** list, click the **Delete** button in the actions column for the target path |  | The **Delete upgrade path** confirmation modal appears. |
| Verify the modal text: "Are you sure you want to delete this upgrade path? This action cannot be undone." |  | The messaging matches the provided design and explicitly warns the user. |
| Click the red **Delete** button in the modal. |  | The modal closes, and the path is immediately removed from the Dashboard list. |
| Attempt to find the deleted path in the list using search or filters. |  | No results are returned for the deleted path. |
| As a customer, add the original item to the basket and and verify that the upgrade offer no longer appears for the customer on classic attraction event page layout, cart summary, checkout Review page. |  | The upgrade offer no longer appears for the customer. |

### SPT-4297: Dashboard - Upgrade Paths - List Management (Filters and Search)

**Description:**

Verify that organizers can efficiently locate paths using server-side filters and search functionality.

**Preconditions:**

* User has **VP MANAGE EVENTS** permission.
<br>
* Multiple upgrade paths exist: at least one **Events ➔ Events**, one **Events ➔ Memberships**, and one **Memberships ➔ Memberships**.

**Postconditions:**

Not supplied in Qase.

**Tags:** 

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Navigate to the **Upgrade Paths** list page |  | The full list of upgrade paths loads successfully |
| Select "Events" from the **Item Type** filter |  | The list updates to show only paths where the origin is a ticket/event. |
| Use the **Search** field to type the name of a specific ticket or membership level. |  | The list narrows in real-time to display only paths containing that specific name. |
| Clear all filters and search terms. |  | The full, original list of upgrade paths returns |
| Observe the bottom of the list if the total count exceeds 20 paths. |  | The list of upgrade paths loads infinitely |

### SPT-4298: Dashboard - Upgrade Paths - Upgrade Messaging Visibility (Customer Flow)

**Description:**

Validate that custom messaging appears when set, and system default copy appears when the field is empty, across all relevant checkout surfaces.

**Preconditions:**

* **Path A**: Configured with a custom template: `"Upgrade to {{to_item_name}} for only {{price_difference}}!"`.
<br>
* **Path B**: Configured with an empty message template (default).

**Postconditions:**

Not supplied in Qase.

**Tags:** 

**Parameters:**

MessageTemplate: Default, Customized
Page: ClassicAttractionEventPage, CartSummary, CheckoutReviewPage

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As a customer, add the origin item for **Path A** to the basket and view the Event Page |  | The upgrade offer displays the **Customized** message with variables correctly populated |
| Open the **Cart Summary**. |  | The same customized message is visible next to the eligible item. |
| Proceed to the **Checkout Review Page** |  | The custom message persists clearly in the upgrade offer section. |
| Remove the item and add the origin item for **Path B** (Default). |  | The system displays **Default** generic wording (e.g., "Upgrade to [Item Name]") instead of a blank space. |
| Complete the upgrade by clicking the action button. |  | The message disappears, and the basket reflects the upgraded item with updated pricing. |

