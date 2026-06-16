# Employees Page QA Test Cases

## Summary

Create UI-focused Qase coverage for the current Angular employee manager at `/dashboard/venues/employees/`.

Existing Qase suite `472` (`Employees - Permission Verification`) has 9 cases focused on whether employee permissions unlock other dashboard areas. It does not meaningfully verify the employee manager UI, employee invite flow, list controls, edit panel, delete confirmation, or the linked permissions manager UI.

## Sources Reviewed

- Qase suite `472`: cases `871-879`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/dashboard/urls.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/dashboard/views.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/dashboard/venues/employees/list-employees.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/dashboard/venues/employees/manage-permissions.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/users/controllers/EmployeeListController.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/users/controllers/EmployeePermissionsController.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/venues/models.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/tests/test_api.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/tests/test_dashboard.py`

## Assumptions and Unknowns

- The tester has an organizer or employee login with `VP_MANAGE_EMPLOYEES`.
- The venue has at least three roles and more than 10 employees for pagination coverage.
- Toast/error styling is handled globally; expected messages are based on controller and API behavior.
- These cases target the legacy Angular page, not a Next.js replacement.

## Risk Areas

- Employee invite creates real users/employments and sends invite side effects.
- Role changes derive employee permissions and may affect access to sensitive dashboard areas.
- `No Restrictions` grants all organization access for a role.
- Delete is irreversible from the UI.
- Mobile/tablet layouts intentionally block management with a larger-screen message.

## Recommended Test Data

- Venue A with `VP_MANAGE_EMPLOYEES` enabled for the tester.
- Roles: `Box Office`, `Event Manager`, `Reporting`, plus one temporary QA role.
- Existing employees:
  - one with profile image
  - one without profile image
  - one assigned to multiple roles
  - one employee safe to delete
- CSV files:
  - valid CSV with first name, last name, email, phone number
  - blank/invalid CSV
  - CSV containing duplicate emails

## Qase-Ready Manual Test Cases

### Test Case 1: Verify Employees page access and initial UI

**Priority:** High  
**Type:** Permission / UI Smoke  
**Area:** Employee Manager

#### Step 1: Open the employee manager

**GIVEN** the tester is logged in for a venue with `VP_MANAGE_EMPLOYEES`.  
**WHEN** the tester opens `/dashboard/venues/employees/`.  
**THEN** the page loads with the `Employee Manager` title, `Employees & Permissions` subtitle, `Manage Permissions` button, `Add Employees` button, search input, role filter, employee table, and pagination controls when enough employees exist.

#### Step 2: Verify access is blocked without permission

**GIVEN** the tester is logged in for the same venue without `VP_MANAGE_EMPLOYEES`.  
**WHEN** the tester opens `/dashboard/venues/employees/`.  
**THEN** access is denied and the employee manager UI is not displayed.

#### Step 3: Verify small-screen guard

**GIVEN** the tester is logged in with `VP_MANAGE_EMPLOYEES` on a mobile or small tablet viewport.  
**WHEN** the tester opens `/dashboard/venues/employees/`.  
**THEN** the page shows `Please manage your permissions with a larger screen.` and hides the employee management table/forms.

### Test Case 2: Verify employee list search, role filter, sort, and empty state

**Priority:** Medium  
**Type:** Regression  
**Area:** Employee Manager

#### Step 1: Search employees

**GIVEN** the employee table contains employees with distinct names and emails.  
**WHEN** the tester searches by an employee name or email.  
**THEN** the list refreshes and only matching employees are shown.

#### Step 2: Clear search

**GIVEN** a search filter is active.  
**WHEN** the tester clears the search input.  
**THEN** the full employee list returns.

#### Step 3: Filter by role

**GIVEN** employees exist across multiple roles.  
**WHEN** the tester selects a role from `-- All Roles --`.  
**THEN** only employees assigned to that role are shown.

#### Step 4: Sort by name

**GIVEN** the employee list is visible.  
**WHEN** the tester clicks the `Name` column header.  
**THEN** the ordering changes and the sort indicator updates.

#### Step 5: Verify empty state

**GIVEN** a search or role filter has no matching employees.  
**WHEN** the filtered list loads.  
**THEN** the table body is replaced with `No results found`.

### Test Case 3: Add one employee manually

**Priority:** High  
**Type:** Happy Path  
**Area:** Employee Invite

#### Step 1: Open Add Employees

**GIVEN** the tester is on `/dashboard/venues/employees/` with at least one role available.  
**WHEN** the tester clicks `Add Employees`.  
**THEN** the add employee panel opens with role selection and first name, last name, email, and phone number fields.

#### Step 2: Submit a valid employee

**GIVEN** a role is selected and a new employee has valid first name, last name, and email.  
**WHEN** the tester submits `Add Employee`.  
**THEN** the request succeeds, `Employees successfully imported!` is shown, the add panel closes, and the employee appears in the list with the selected role.

#### Step 3: Verify persistence

**GIVEN** the new employee is visible in the table.  
**WHEN** the tester refreshes the page and searches for the employee email.  
**THEN** the employee still appears with the assigned role.

### Test Case 4: Add multiple employees manually

**Priority:** Medium  
**Type:** Happy Path  
**Area:** Employee Invite

#### Step 1: Add multiple rows

**GIVEN** the Add Employees panel is open.  
**WHEN** the tester clicks `Add More Employees` twice.  
**THEN** additional employee rows are added and removable trash icons appear when more than one row exists.

#### Step 2: Remove one row

**GIVEN** three employee rows are visible.  
**WHEN** the tester removes one row.  
**THEN** only the remaining rows are submitted.

#### Step 3: Submit multiple valid employees

**GIVEN** two valid employees remain and a role is selected.  
**WHEN** the tester submits the form.  
**THEN** both employees are created for the venue, both inherit the selected role, and the list refreshes.

### Test Case 5: Validate employee invite errors

**Priority:** High  
**Type:** Negative  
**Area:** Employee Invite

#### Step 1: Required fields

**GIVEN** the Add Employees panel is open.  
**WHEN** the tester attempts to submit an employee without first name, last name, or email.  
**THEN** the form blocks submission or the API error identifies the missing required field, and no employee is created.

#### Step 2: Invalid email

**GIVEN** the Add Employees panel is open.  
**WHEN** the tester enters an invalid email format and submits.  
**THEN** the invite is rejected and the employee is not added.

#### Step 3: Existing employee

**GIVEN** an employee already exists for the venue.  
**WHEN** the tester attempts to invite the same email again.  
**THEN** the API rejects the invite with `User with email '<email>' is already an employee`.

#### Step 4: Duplicate emails in one invite

**GIVEN** two invite rows contain the same email.  
**WHEN** the tester submits the invite.  
**THEN** the API rejects the invite with `Duplicate email given: <email>` and neither duplicate row is created.

### Test Case 6: Upload employees by CSV

**Priority:** Medium  
**Type:** Integration  
**Area:** CSV Import

#### Step 1: Open CSV help

**GIVEN** the Add Employees panel is open.  
**WHEN** the tester clicks the CSV info icon.  
**THEN** the CSV upload specifications are shown: one employee per line, first name, last name, email, and only one role per upload.

#### Step 2: Upload valid CSV

**GIVEN** a role is selected and a valid CSV contains first name, last name, email, and phone number columns.  
**WHEN** the tester uploads the CSV.  
**THEN** the rows populate into the employee form.

#### Step 3: Submit valid CSV rows

**GIVEN** valid CSV rows are populated.  
**WHEN** the tester submits the invite.  
**THEN** all valid rows are created as employees with the selected role.

#### Step 4: Upload blank or invalid CSV

**GIVEN** the Add Employees panel is open.  
**WHEN** the tester uploads a blank or unrecognized CSV.  
**THEN** the page shows `The CSV is not recognized. Please adhere to the CSV upload specifications` and resets to a blank employee row.

### Test Case 7: Edit employee roles and alert preferences

**Priority:** High  
**Type:** Regression  
**Area:** Employee Detail

#### Step 1: Open employee detail

**GIVEN** the employee table contains an editable employee.  
**WHEN** the tester clicks the employee row or edit action.  
**THEN** the detail panel opens with profile image fallback, username, email, optional phone number, assigned roles, alert checkboxes, `Close`, `Save`, and `Delete`.

#### Step 2: Update roles

**GIVEN** the detail panel is open.  
**WHEN** the tester changes the assigned role checkboxes and clicks `Save`.  
**THEN** the panel closes, the list refreshes, and the employee row shows the updated role labels.

#### Step 3: Verify derived permissions

**GIVEN** the employee role assignment has changed.  
**WHEN** the tester reopens the employee or verifies through the API.  
**THEN** the employee permissions reflect the selected roles, with duplicate roles prevented by backend validation.

#### Step 4: Update alert preferences

**GIVEN** the detail panel is open.  
**WHEN** the tester toggles daily reservation reports, daily sales reports, ticket sale emails, product sale emails, SMS alerts, new booking email, cancelled order notifications, will call email, and negative rating emails, then saves.  
**THEN** the selected alert preferences persist after reload.

### Test Case 8: Delete an employee

**Priority:** High  
**Type:** Destructive / Regression  
**Area:** Employee Detail

#### Step 1: Open delete confirmation

**GIVEN** a QA-safe employee is selected in the detail panel.  
**WHEN** the tester clicks `Delete`.  
**THEN** a confirmation overlay appears with the employee name and warns that the action cannot be undone.

#### Step 2: Cancel delete

**GIVEN** the confirmation overlay is visible.  
**WHEN** the tester clicks `Cancel`.  
**THEN** the overlay closes and the employee remains in the list.

#### Step 3: Confirm delete

**GIVEN** the confirmation overlay is visible.  
**WHEN** the tester clicks the destructive `Delete` action.  
**THEN** `Employee deleted successfully!` is shown, the detail panel closes, the list refreshes, and the employee no longer appears.

### Test Case 9: Manage roles and permissions from Employees page

**Priority:** High  
**Type:** Permission / Regression  
**Area:** Permissions Manager

#### Step 1: Navigate to permissions manager

**GIVEN** the tester is on `/dashboard/venues/employees/`.  
**WHEN** the tester clicks `Manage Permissions`.  
**THEN** `/dashboard/venues/employees/permissions/` loads with `Permissions`, `Manage Roles & Permissions`, `Manage Employees`, `Manage Roles`, search, column selector, and the permissions matrix.

#### Step 2: Create a role

**GIVEN** the permissions manager is open.  
**WHEN** the tester clicks `Manage Roles`, enters a unique role name, and clicks `Add`.  
**THEN** `Role successfully saved!` is shown and the new role appears as a matrix column and in the roles manager.

#### Step 3: Rename a role

**GIVEN** the roles manager is open with the QA role.  
**WHEN** the tester edits the role name and saves.  
**THEN** the updated name appears in the roles list, column selector, and permissions matrix.

#### Step 4: Toggle permissions

**GIVEN** the QA role exists and `No Restrictions` is off.  
**WHEN** the tester toggles an individual permission such as `Manage Events`.  
**THEN** the permission icon changes state and persists after refreshing the permissions page.

#### Step 5: Toggle No Restrictions

**GIVEN** the QA role exists.  
**WHEN** the tester toggles `No Restrictions` on.  
**THEN** the role shows all permissions as allowed/faded and individual permission toggles are disabled for that role.

#### Step 6: Delete the role

**GIVEN** the QA role is no longer assigned to employees.  
**WHEN** the tester clicks delete, confirms the prompt, and waits for save.  
**THEN** `Role deleted successfully!` is shown and the role is removed from the roles list and permissions matrix.

### Test Case 10: Verify permissions manager filtering and hidden permission rules

**Priority:** Medium  
**Type:** Edge Case  
**Area:** Permissions Manager

#### Step 1: Search permission rows

**GIVEN** the permissions manager contains multiple permission rows.  
**WHEN** the tester searches for a permission name.  
**THEN** only matching permission rows remain visible, including `No Restrictions` when the search matches it.

#### Step 2: Hide and show role columns

**GIVEN** multiple roles are displayed as permission matrix columns.  
**WHEN** the tester opens the column selector and unchecks a role.  
**THEN** that role column is hidden without changing its permissions.

#### Step 3: Show one role from roles manager

**GIVEN** the roles manager is open.  
**WHEN** the tester clicks the key action for one role.  
**THEN** all other role columns are hidden and only the selected role remains visible.

#### Step 4: Verify optional permission visibility

**GIVEN** the venue has optional settings disabled, such as `allow_other_payment_type`, `allow_cash_refund`, or access pin feature flag disabled.  
**WHEN** the tester opens the permissions manager.  
**THEN** related optional permissions are not shown in the matrix.

## Regression Coverage

- Existing suite `472` permission-access cases should still pass after UI updates.
- Smoke the side menu `Employees` link visibility for users with and without `VP_MANAGE_EMPLOYEES`.
- Smoke `/api/venue/venues/employments/` list, invite, update, and delete permissions.
- Smoke `/api/venue/venues/employments/roles/` list, create, update, delete, and permissions filtering.

## Suggested Automated Coverage

- **GIVEN** a manager with `VP_MANAGE_EMPLOYEES`, **WHEN** they open `/dashboard/venues/employees/`, **THEN** the employee table, filters, Add Employees panel, and detail panel workflows render and persist through API-backed changes.
- **GIVEN** a venue with test roles and employees, **WHEN** the user searches, filters by role, sorts by name, and paginates, **THEN** the table results update without losing filter state.
- **GIVEN** a QA role, **WHEN** the user toggles permissions and `No Restrictions` in `/dashboard/venues/employees/permissions/`, **THEN** the matrix state persists after reload.
- **GIVEN** a small viewport, **WHEN** either employee management page loads, **THEN** only the larger-screen message is visible.

## Questions for Developer or Product

- None blocking. The main open decision is whether these should be added to suite `472` as UI coverage or split into a new `Employees - UI Verification` suite.
