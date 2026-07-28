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
