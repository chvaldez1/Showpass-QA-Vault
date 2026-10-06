---
title: Event — Packages
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Packages

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Scope and shared coverage

Cases below are copied locally for reading, not moved in Qase; they remain in [Ticket Packages — suite 87](https://app.qase.io/project/SPT?suite=87). SPT-811/815/2944/4887/4889 retain seating, recurring and template variants there. The screenshot adds an event-scoped entry: verify that creating/editing a package retains the selected event, then use the existing cases. SPT-5132 mixes packages, sellers, tiered discounts and auto-release; treat it as a split candidate, not four completed proof targets.

Source: [event package page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/packages/ui/pages/EventTicketPackagesPage.web.tsx>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-812: Dashboard - Ticket Packages - Create custom package without assigned seating

**Description:**

Verify that an organizer can create a custom ticket package using non-assigned-seating child ticket type options and custom category rules.

**Preconditions:**

Organizer is logged into the Dashboard with permission to create packages. A non-assigned-seating parent/container event has an eligible one-time-charge parent ticket type. At least two child events have non-assigned-seating one-time-charge ticket types available for package options.

**Postconditions:**

The created custom package, categories, and child options are deleted or left as approved reusable test setups.

**Tags:** packages, dashboard, custom-package, organizer

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard > Ticket Packages and start creating a Custom Package. |  | The custom package wizard loads. |
| Enter the package name, select the parent event, and select the parent ticket type. |  | The parent event and parent ticket type are accepted. |
| Add a custom category and set the selection limit and quantity of tickets. |  | The category validates and can be saved after child ticket options are added. |
| Add non-assigned-seating child ticket options from eligible child events. |  | The child ticket options are accepted. Duplicate child ticket types are blocked or unavailable. |
| Save the category and finish saving the custom package. |  | The custom package saves successfully. |
| Return to the Ticket Packages list and expand the package details. |  | The package shows the expected category, selection limit, ticket quantity, and child ticket options. |

### SPT-4885: Dashboard - Ticket Packages - Manage package list, details, edit, and delete

**Description:**

Verify that an organizer can search ticket packages, inspect preset and custom package details, open edit mode, and safely delete a removable package after confirmation.

**Preconditions:**

Organizer is logged into the Dashboard with permission to manage packages. At least one preset package and one custom package exist. A separate removable test package exists with no sales or dependencies that would block deletion.

**Postconditions:**

Any edited package fields are restored. The removable test package is deleted or recreated as needed for reusable test setups.

**Tags:** packages, dashboard, organizer

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard > Ticket Packages. |  | The Ticket Packages list loads with search, package rows, detail expansion controls, Edit actions, and Delete actions when packages exist. |
| Search by part of a known package name, then clear the search. |  | The list filters to matching packages, shows an empty state for no matches if applicable, and returns to the full list when search is cleared. |
| Expand a preset package row. |  | Preset details show parent event/ticket, child events, child ticket types, child quantities, parent ratio when configured, and revenue distribution values when configured. |
| Expand a custom package row. |  | Custom package details show categories, required selections, tickets per selection, and child ticket options. |
| Open Edit for a package, make a safe change such as a temporary package name suffix, save, and return to the list. |  | The package update succeeds and the list reflects the saved change. |
| Start deleting the removable package, cancel the confirmation, then repeat and confirm deletion. |  | Cancel leaves the package in the list. Confirm delete removes the package and shows the expected success or refreshed list state. |

### SPT-4886: Dashboard - Ticket Packages - Validate invalid parent and child ticket selections

**Description:**

Verify that the package wizard prevents invalid parent or child ticket configurations and shows clear validation feedback without creating a broken package.

**Preconditions:**

Organizer is logged into the Dashboard with permission to create packages. Test events and ticket types exist for the InvalidPackageRule parameter, including duplicate child candidates, a child ticket with minimum purchase limit, a child ticket using payment plans, incompatible-fee events, a parent ticket already used by another package, and a parent ticket type with sales.

**Postconditions:**

Temporary invalid test setups and any partially created packages are removed. Existing ticket type limits, payment plans, fee structures, and sales test setups are restored if modified.

**Tags:** packages, dashboard, validation

**Parameters:**

InvalidPackageRule: DuplicateChildTicket, ChildIsParentTicket, MinimumPurchaseLimitChild, PaymentPlanChild, IncompatibleFeeStructure, MissingChildTicket, ParentAlreadyUsed, ParentHasSales

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard > Ticket Packages and start creating the package type required for the InvalidPackageRule parameter. |  | The package wizard loads. |
| Configure the parent event and parent ticket type required for the InvalidPackageRule under test. |  | Valid parent selections are accepted; invalid parent selections are blocked or produce a clear validation message. |
| Attempt the invalid child or package configuration for the parameter value under test. |  | The UI blocks the invalid selection, disables the option, or the save attempt returns a clear validation error. A package is not created with invalid child data. |
| Correct the invalid selection using an eligible parent/child ticket type and save the package if the rule allows recovery. |  | After correction, the package can be saved and the previous validation error no longer appears. |
| Return to the package list and search for the attempted invalid package name. |  | Only successfully saved valid packages appear; failed invalid attempts do not create duplicate or partial package records. |

### SPT-4888: Dashboard - Ticket Packages - Configure package barcode, redeem-all, revenue, and reverse-ratio settings

**Description:**

Verify that package-specific settings can be configured where supported and invalid setting combinations are rejected.

**Preconditions:**

Organizer is logged into the Dashboard with permission to manage packages. Preset package test setups exist for the PackageSettingScenario under test. Venue settings allow the relevant setting to be visible when applicable, including child revenue realization for child revenue distribution and reverse-ratio support for reverse-ratio scenarios.

**Postconditions:**

Package settings and any venue settings changed for the test are restored to their original values. Temporary packages are deleted or marked as reusable test setups.

**Tags:** packages, dashboard, validation

**Parameters:**

PackageSettingScenario: SendSingleBarcode, AllItemsRedeemable, ParentBarcodeRedeemAllConflict, ChildRevenueDistribution, ReverseParentRatio

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open or create the preset package needed for the PackageSettingScenario parameter. |  | The package wizard or edit page loads with the relevant package settings visible for the scenario. |
| Configure the selected setting scenario, such as Send Single Barcode, Allow redemption on all items, child revenue distribution method, or reverse parent ratio. |  | Supported settings accept valid values and show any explanatory tooltip, disabled state, or warning text that applies. |
| For ParentBarcodeRedeemAllConflict, enable both Send Single Barcode and Allow redemption on all items, then attempt to save. |  | The package is not saved with both settings enabled and a clear validation error is shown. |
| For ChildRevenueDistribution, save a package with a valid child distribution method when child revenue realization is enabled. |  | The package saves and the selected distribution method is displayed in package details. |
| For ReverseParentRatio, set a valid reverse ratio greater than 1 for an eligible child ticket and save. |  | The package saves and the package details show the parent ratio. Invalid reverse-ratio values remain covered by existing admin validation cases. |

