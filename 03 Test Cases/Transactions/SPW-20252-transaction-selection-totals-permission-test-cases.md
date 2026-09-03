---
title: SPW-20252 Transaction Selection Totals Permission Test Cases
tags:
  - jira
  - test-cases
  - transactions
  - employee-permissions
status: qase-created
---

# SPW-20252 Transaction Selection Totals Permission Test Cases

Qase status: SPT-5095 through SPT-5103 were created in suites 144 and 472 and read-back verified on 2026-09-01. No manual case has been executed.

Qase test run: [Run 1342 - Transaction Selection Totals Permission](https://app.qase.io/run/SPT/dashboard/1342) contains all nine cases and 27 parameterized executions. No environment was assigned, and execution has not started.

## Jira Intake Summary

- Jira card: `https://showpass.atlassian.net/browse/SPW-20252`
- Jira API status: the configured account returned `404`, so the card could not be read through the API.
- Complete business context, requirements, acceptance criteria, manual testing notes, rollout order, automation expectations, and non-goals were provided in `assets/del.txt`.
- Requested behavior: add `View Transaction Totals` as an independent permission for the complete `Selection totals` bar without changing Transactions-page access or any transaction action.
- The rollout uses the venue-scoped `enable_transaction_totals_permission` flag, which is off by default and restores the previous `Manage Transactions` gate when disabled.
- Direct source review found unresolved differences in Current Transactions access and migration implementation; these are recorded as source/requirement conflicts rather than confirmed defects because the product was not executed.
- No Qase gap analysis, branch comparison, or source diff analysis was performed. The user-selected Qase suites were read and the approved cases were created and verified.

## Plain-language Glossary

| Term | Meaning |
| --- | --- |
| Selection totals | The complete bar above the transaction feed showing Net sales, Gross revenue, Organizer fees when applicable, Taxes, and Refunds. |
| Transaction Admin | An employee who can administer transactions but must not automatically see selection totals. |
| Box Office Seller | An employee who can use Box Office and open Transactions but must not automatically see selection totals. |
| Totals Manager | An employee who has both transaction administration and the independent totals permission. |
| Finance Manager | An employee with `Manage Transactions`; this parent access includes both transaction administration and selection totals. |
| All Access | An employee whose role has `No Restrictions`. |
| Current Transactions | The current page at `/manage/box-office/transactions/`. Use normal Box Office navigation when available. |
| Legacy Transactions | The older AngularJS page at `/dashboard/financials/invoices/`. Use this direct page only because Jira explicitly requires parity and the visible escape hatch has expired. |

## Testing Intent

We are testing whether Box Office employees can keep their existing Transactions-page access and actions while aggregate selection totals follow a separate permission; this matters because employees must be able to support customers without receiving unnecessary financial visibility, and we will prove it on both Transactions pages, under both rollout states, with migrated roles and clean desktop/mobile layouts.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Permission boundary and reporting/dashboard agreement. |
| Business invariant | Removing `View Transaction Totals` hides only the complete totals bar; it does not remove page access or any separately authorized transaction action. |
| User or business impact | Organizers could expose sensitive aggregate amounts or prevent employees from completing refunds and other transaction work. |
| Failure mode | Unauthorized totals exposure, lost transaction access/actions, failed role migration, stale frontend/backend gates, or broken layout after the bar is removed. |
| Observable proof | Each named employee profile has the expected page access and actions; the complete totals bar is present or absent; authorized filters still update totals; hidden totals leave no empty gap. |
| Source of truth | Pasted Jira requirements, backend permission and stats authorization, frontend route/role/totals behavior, legacy AngularJS behavior, and existing automation patterns. |
| Primary surfaces | Dashboard Team permissions, current Box Office Transactions, legacy Transactions, and the transaction stats API contract. |
| In scope | Flag off/on, all required employee profiles, parent/child permissions, migration compatibility, current/legacy parity, filter behavior, desktop/mobile layout, rollback, and unauthorized request suppression. |
| Out of scope | Changing page access, totals math/copy, transaction-level amounts, transaction actions, CSV export, Sold By, reporting permissions, Box Office Stats, role-editor redesign, or ClickHouse rollout behavior. |
| Confidence | Medium. The Jira acceptance criteria are complete, but the checked-out frontend access configuration and available migration source do not fully agree with them. |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| The permission is exposed only during rollout and keeps its parent relationship | Organizers need a safe, understandable role configuration | SPT-5095, SPT-5096 |
| Authorized profiles retain the complete totals bar and unchanged filtered values | Prevents finance visibility loss | SPT-5097 |
| Transaction Admin and Box Office Seller profiles keep page access without totals | Proves the new separation does not block work | SPT-5098, SPT-5099 |
| Totals permission alone grants neither page access nor transaction actions | Prevents privilege escalation | SPT-5100 |
| Existing roles receive only the intended migrated access | Prevents access loss and silent over-granting | SPT-5101 |
| Disabling the flag restores the previous Manage Transactions gate | Provides immediate rollback without code rollback | SPT-5102 |
| Hiding totals leaves no placeholder or layout gap | Prevents a broken Transactions experience | SPT-5103 |

## Declared Scope

### In Scope

- `enable_transaction_totals_permission` disabled and enabled.
- Current and legacy Transactions pages.
- Desktop and mobile-width layout checks.
- `Transaction Admin`, `Box Office Seller`, `Totals Manager`, `Finance Manager`, `All Access`, and `Totals Only` employee profiles.
- Parent/child permission behavior and existing-role migration compatibility.
- Complete Selection totals bar, applicable filters, route access, and transaction action visibility.
- Unauthorized frontend request suppression and direct stats API empty-`200` contract as automated/API-backed coverage.

### Out of Scope

- Changing or broadly retesting selection-total calculations, response fields, labels, or filters.
- Performing refunds, voids, resends, exchanges, printing, check-in, fulfillment, or other financial mutations merely to prove the totals permission.
- CSV export, Sold By, transaction-level financial breakdowns, reports, or `View Box Office Stats`.
- Rebuilding the permission matrix or changing route/navigation permissions.
- ClickHouse rollout or query implementation changes.

## Sources Reviewed

### Requirements and Vault Guidance

- `assets/del.txt` — pasted SPW-20252 business context, requirements, acceptance criteria, manual testing, rollout, and non-goals.
- [[00 Start Here/World-Class Software Quality Standard]]
- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]
- [[01 Repositories/QA Automation - showpass-playwright]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- [[05 Tooling/jiractl]]
- [[06 Prompts/Showpass QA Test Case Generator]]

### Backend

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/constants.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/staff_management/venue_employment.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/tests/test_models.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/migrations/0263_add_box_office_subtotal_override_permission.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/flags.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/serializers/transaction_stats.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/queries/clickhouse/transaction_page_queries.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_api_venue_based_invoices.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/test_transaction_page_queries.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/users/controllers/EmployeePermissionsController.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/InvoiceListAll.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/invoices/_invoices-all.html`

### Frontend

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/team/utils/team-permission-utils.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/team/ui/hooks/usePermissionsPageController.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/team/ui/pages/PermissionsPage.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/hooks/useTransactionTotalsPermission.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/hooks/useTransactionTotalsVisibility.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/constants/transactions-config.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/constants/transactions-config.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/components/navigation/DashboardNavBarUserMenu/hooks/route-sections/operations-routes.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/layouts/BoxOfficeBaseLayout/BoxOfficeBaseLayout.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionStats/TransactionStats.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/sidebar/TransactionsFilterSidebar.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/TransactionsPage/TransactionsPage.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/utils/transactions-cutover.ts`
- Associated frontend unit tests beside the files above.

### Automation Patterns

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/flows/box-office-journey.ts`

## Assumptions and Unknowns

- A release owner can prepare one test venue with the rollout enabled and another with it disabled, or safely switch one test venue between states.
- The legacy page remains reachable by its documented direct page during acceptance testing; if deployment redirects it, the release owner must provide the supported parity-test method.
- Each employee account has only the named role so an unrelated role does not broaden access.
- Transaction action names vary with transaction state. SPT-5098 uses one refundable completed transaction and records the action menu before comparing profiles.
- Forward migration behavior is suitable for manual verification. Reverse migration remains automation-only because reversing a shared environment migration is unsafe.
- Jira says `Use Box Office` alone grants Current Transactions access. The checked-out route config and navigation currently require transaction-administration access; SPT-5099 intentionally follows the Jira acceptance result and will expose that difference if executed.
- The checked-out migrations contain the permission choice but no clearly named reversible transaction-totals backfill. SPT-5101 requires a deployed environment where the release owner says that migration completed.

## Source-backed Behavior

- `View Transaction Totals` is a Finance & reporting permission with two-step verification required and no child permissions.
- `Manage Transactions` has two children: `Administer Transactions` and `View Transaction Totals`.
- Jira requires Current Transactions access to remain available through `Administer Transactions` or `Use Box Office`; the totals permission alone must not grant page access.
- With the rollout disabled, the independent option is hidden and totals continue to require `Manage Transactions`.
- With the rollout enabled, current and legacy totals require `View Transaction Totals`.
- The backend returns the existing empty HTTP `200` before Postgres or ClickHouse aggregation when the employee lacks the effective totals permission.
- The current page renders no totals component and disables its stats request when unauthorized.
- The legacy page skips its stats request and does not send totals-derived revenue to Pendo when unauthorized.
- Authorized totals keep the current response shape, filters, calculations, and labels.
- A no-restrictions employee retains totals access.
- Existing `Manage Transactions` roles and their assigned employee access must receive the new permission; `Administer Transactions`-only and `Use Box Office`-only roles must not.

### Source / Requirement Conflicts

- **Current Transactions access:** Jira requires `Administer Transactions` **or** `Use Box Office`. The checked-out `transactions-config.ts` requires `Administer Transactions`, while visible navigation checks `Manage Transactions` or `Administer Transactions`. This is a product-expectation conflict, not an executed defect.
- **Backfill migration:** Jira requires a reversible migration for existing roles and derived employee permissions. Direct source search found the permission choice in `0263_add_box_office_subtotal_override_permission.py`, but not a dedicated forward/reverse transaction-totals backfill in the checked-out migration files. This is implementation evidence to resolve before migration sign-off.

## Employee Profile and Page Mapping

### Employee Profiles

| Employee Profile | Role Setup | Expected Page Access With Flag On | Expected Totals With Flag On |
| --- | --- | --- | --- |
| TransactionAdmin | `Administer Transactions` only | Yes | No |
| BoxOfficeSeller | `Use Box Office` only | Yes per Jira; checked-out Current Transactions source conflicts | No |
| TotalsManager | `Administer Transactions` + `View Transaction Totals` | Yes | Yes |
| FinanceManager | `Manage Transactions` | Yes, through child access | Yes |
| AllAccess | `No Restrictions` | Yes | Yes |
| TotalsOnly | `View Transaction Totals` only | No | Not reachable |

### Transactions Pages

| TransactionPage | Starting Location | Use |
| --- | --- | --- |
| CurrentTransactions | Open Box Office and select `Transactions`. Current page: `/manage/box-office/transactions/`. | Primary user flow. |
| LegacyTransactions | Open the legacy Transactions page directly: `/dashboard/financials/invoices/`. | Jira-required parity only; the visible escape hatch has expired. |

## Product Surface and Control Inventory

| Surface or Control | Required State | Coverage |
| --- | --- | --- |
| Permission matrix row and tooltip | Hidden flag off; visible flag on | SPT-5095 |
| `Manage Transactions` parent | Includes both required children; removing a child clears the parent | SPT-5096 |
| Current Transactions access | Jira expects Administer Transactions or Use Box Office; current source conflict is explicit | SPT-5097, SPT-5098, SPT-5099, SPT-5100, SPT-5102 |
| Legacy Transactions access | Unchanged and equivalent totals visibility | SPT-5097, SPT-5098, SPT-5099, SPT-5100, SPT-5102 |
| Complete Selection totals bar | All-or-nothing visibility | SPT-5097, SPT-5098, SPT-5099, SPT-5102 |
| Filters and values | Authorized totals update for the selected event | SPT-5097 |
| Transaction action menu | Totals removal does not remove already-authorized actions | SPT-5098, SPT-5099 |
| Empty layout space | No placeholder, padding, or gap on desktop/mobile | SPT-5103 |
| Existing role assignments | Finance role granted; narrower roles unchanged | SPT-5101 |
| Unauthorized stats request | No frontend request; direct API remains empty `200`; no aggregation | API/backend verified and automated coverage |
| Reverse migration | Removes only the new permission | Automated only; unsafe for shared manual environments |

## Risk Areas

- Page access could accidentally remain tied to `Manage Transactions`, blocking Transaction Admin or Box Office Seller employees.
- The checked-out Current Transactions access configuration may already block the Jira-required Box Office Seller path.
- The totals UI could be hidden while the stats request still exposes or calculates sensitive values.
- Current and legacy pages could use different flag or permission rules.
- Migration could miss existing finance employees or over-grant narrower roles.
- The required reversible backfill is not clearly present in the checked-out migration source.
- Selecting or removing child permissions could leave an invalid parent role state.
- A hidden totals component could leave an empty bar, placeholder, or mobile spacing defect.
- Rollback could restore the frontend gate without restoring the backend gate, or vice versa.
- `View Box Office Stats` could be confused with the new permission even though it has a different purpose.

## State-space / Setup Matrix

| Flag | Employee Profile | Page Access | Selection Totals | Primary Coverage |
| --- | --- | --- | --- | --- |
| Enabled | TotalsManager | Yes | Visible | SPT-5097 |
| Enabled | FinanceManager | Yes | Visible | SPT-5097, SPT-5100 |
| Enabled | AllAccess | Yes | Visible | SPT-5097 |
| Enabled | TransactionAdmin | Yes | Hidden | SPT-5098, SPT-5103 |
| Enabled | BoxOfficeSeller | Yes | Hidden | SPT-5099 |
| Enabled | TotalsOnly | No | Not reachable | SPT-5100 |
| Disabled | FinanceManager | Yes | Visible through previous gate | SPT-5102 |
| Disabled | TransactionAdmin | Yes | Hidden | SPT-5102 |
| Disabled | BoxOfficeSeller | Yes | Hidden | SPT-5102 |
| Disabled | TotalsManager without parent `Manage Transactions` | Yes | Hidden because the new permission is inactive | SPT-5102 |

## Coverage Ledger

| Requirement | Coverage | Evidence / Decision |
| --- | --- | --- |
| New permission metadata, TOTP, group, and tooltip | SPT-5095 plus automated metadata test | Visible role-editor proof and backend constant |
| Parent includes both children | SPT-5096 plus automated hierarchy test | Role editor, backend permission cleanup behavior |
| Page access unchanged | SPT-5097, SPT-5098, SPT-5099, SPT-5100, SPT-5102 | SPT-5099 is a requirement/source conflict until execution or source alignment resolves it |
| Flag-on authorized totals | SPT-5097 | Three distinct authorized profiles |
| Flag-on Administer-only and Use Box Office-only denial | SPT-5098, SPT-5099 | Separate supported page-entry flows |
| Totals-only does not grant access/actions | SPT-5100 | Direct permission-boundary proof |
| No restrictions retains totals | SPT-5097 / AllAccess | Required acceptance profile |
| Existing role compatibility | SPT-5101 | Manual forward verification plus automated migration test |
| Flag-off behavior and rollback | SPT-5095, SPT-5102 | Role-editor and both-page fallback proof |
| No frontend stats request when unauthorized | Manual technical check plus Automated: request | Check current/legacy pages and retain stable automated evidence |
| Direct unauthorized API returns empty `200` | Manual technical check plus API/backend verified | Existing endpoint tests retain the contract |
| No aggregation query when unauthorized | API/backend verified | Backend mock/assertion; not observable through ordinary manual steps |
| Authorized response and filters unchanged | SPT-5097 plus API/backend verified | Controlled event and endpoint tests |
| No hidden-bar layout gap | SPT-5103 | Current/legacy, desktop/mobile |
| Reverse migration | Automated only | Reversing shared migration state is unsafe manually |

## Recommended Test Data

- **Enabled venue:** A test venue with `enable_transaction_totals_permission` enabled.
- **Rollback venue:** A test venue with the flag disabled.
- **Controlled events:** One `Controlled totals event` in the enabled venue and one `Controlled rollback event` in the rollback venue, each containing exactly one completed cash transaction for one `$20.00` General Admission ticket, with no taxes, customer fees, organizer fees, or refunds.
- **Action-check transaction:** one completed refundable test transaction. Record its transaction number and visible action menu before changing employee profiles. Do not perform the refund, void, resend, or another mutation in these cases.
- **Roles:** `Transaction Admin`, `Box Office Seller`, `Totals Manager`, `Finance Manager`, `All Access`, and `Totals Only`.
- **Employee accounts:** one employee assigned exclusively to each role. Record the employee email next to the role before execution.
- **Migration roles:** existing pre-migration roles representing Finance Manager, Transaction Admin, and Box Office Seller access, each with one assigned employee.
- Preserve the controlled financial transactions for later regression runs. Restore every edited role to its recorded starting state.

## Recommended Qase Suites

| Qase Suite | Cases | Reason |
| --- | --- | --- |
| [Transactions — suite 144](https://app.qase.io/project/SPT?suite=144) | SPT-5097, SPT-5098, SPT-5099, SPT-5100, SPT-5102, SPT-5103 | These cases prove access, totals visibility, transaction actions, rollback behavior, and page layout on Transactions. |
| [Employees - Permission Verification — suite 472](https://app.qase.io/project/SPT?suite=472) | SPT-5095, SPT-5096, SPT-5101 | These cases prove permission availability, parent-child permission behavior, and migrated employee access. |

## Qase-ready Manual Test Cases

### SPT-5095: Dashboard - Employee Permissions - Show View Transaction Totals only when enabled

**Title:** Dashboard - Employee Permissions - Show View Transaction Totals only when enabled

**Description:** Confirm that `View Transaction Totals` appears in Manage permissions only for venues where `enable_transaction_totals_permission` is enabled.

| Platform  | View    |
| --------- | ------- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer can manage employee roles for both test venues.
* `enable_transaction_totals_permission` is enabled for one venue and disabled for the other.

**Postconditions:** No role or employee data is changed.

**Data safety:** No data change.

**Tags:** dashboard, employee-permissions, transactions

**Steps:**

| Step Action                                                                                          | Data       | Expected Result                                                                                              |
| ---------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| Select the enabled test venue, then open Dashboard → Organization → Team.                            | Venue name | The Team page opens for the selected venue.                                                                  |
| Select `Manage permissions`.                                                                         | None       | The role permission matrix opens.                                                                            |
| Search the permission matrix for `View Transaction Totals`.                                          | None       | The permission appears in Finance & reporting with an explanation that it controls the Selection totals bar. |
| Switch to the disabled test venue, then open Dashboard → Organization → Team → `Manage permissions`. | Venue name | The role permission matrix opens for the selected venue.                                                     |
| Search the permission matrix for `View Transaction Totals`.                                          | None       | No matching permission appears.                                                                              |

### SPT-5096: Dashboard - Employee Permissions - Verify Manage Transactions keeps both child permissions

**Title:** Dashboard - Employee Permissions - Verify Manage Transactions keeps both child permissions

**Description:** Validates that `Manage Transactions` continues to include transaction administration and selection-total access, and that removing either required child clears the parent without removing the other explicitly selected child.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The test venue has the rollout enabled.
* The organizer can manage employee roles and complete any required two-step verification.
* The role `Parent Permission Check` exists with no employee assigned, and its starting permissions are recorded.

**Postconditions:** Restore `Parent Permission Check` to its recorded starting permissions.

**Data safety:** Changes test data; only the named unassigned role is changed and restored.

**Tags:** dashboard, employee-permissions, transactions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Team → `Manage permissions`. | Rollout-enabled test venue | The permission matrix opens. |
| Turn on `Manage Transactions` for `Parent Permission Check`. | None | `Administer Transactions` and `View Transaction Totals` are also selected. |
| Reload the permission page. | None | The parent and both child selections remain selected. |
| Turn off `View Transaction Totals`. | None | `Manage Transactions` clears while `Administer Transactions` remains selected. |
| Turn on `Manage Transactions` again. | None | Both child permissions are selected again. |
| Turn off `Administer Transactions`. | None | `Manage Transactions` clears while `View Transaction Totals` remains selected. |
| Restore the recorded starting permissions. | Recorded role state | The original selections remain after reload. |

### SPT-5097: Box Office - Transactions - Verify authorized employee profiles see selection totals

**Title:** Box Office - Transactions - Verify authorized employee profiles see selection totals

**Description:** Validates authorized totals access on both implementations. `CurrentTransactions` opens `/manage/box-office/transactions/`; `LegacyTransactions` opens `/dashboard/financials/invoices/`. `TotalsManager` has `Administer Transactions` plus `View Transaction Totals`; `FinanceManager` has `Manage Transactions`; `AllAccess` has `No Restrictions`.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The test venue has the rollout enabled.
* The selected employee profile has only its named role.
* `Controlled totals event` contains exactly one completed `$20.00` sale with no fees, taxes, or refunds.
* For `CurrentTransactions`, `Show selection totals` is selected for the employee before execution.

**Postconditions:** No data change.

**Data safety:** No data change.

**Tags:** box-office, transactions, employee-permissions

**Parameters:**

TransactionPage: CurrentTransactions, LegacyTransactions
EmployeeProfile: TotalsManager, FinanceManager, AllAccess

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the employee mapped to `EmployeeProfile`. | EmployeeProfile | The employee signs in to the rollout-enabled test venue. |
| Open the Transactions page mapped to `TransactionPage` in the Description. | TransactionPage | The selected Transactions page opens and the transaction feed is visible. |
| Review the complete bar above the transaction feed. | None | `Selection totals` shows Net sales, Gross revenue, Taxes, and Refunds; Organizer fees appears only when non-zero. |
| Filter Transactions by event. | `Controlled totals event` | The feed shows the event's one completed transaction. |
| Review the filtered Selection totals. | Net sales `$20.00`; Gross revenue `$20.00`; Taxes `$0.00`; Refunds `$0.00` | The displayed values match the controlled event and Organizer fees is absent because it is zero. |

### SPT-5098: Box Office - Transactions - Verify transaction administration remains available without selection totals

**Title:** Box Office - Transactions - Verify transaction administration remains available without selection totals

**Description:** Validates the main permission separation on both implementations. The Transaction Admin employee keeps the page and its already-authorized transaction actions while the complete Selection totals bar is hidden. `CurrentTransactions` opens `/manage/box-office/transactions/`; `LegacyTransactions` opens `/dashboard/financials/invoices/`.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The test venue has the rollout enabled.
* The employee is assigned only to the `Transaction Admin` role.
* The action-check transaction is a completed refundable test sale that normally shows `Refund` and `Resend confirmation email` to an employee with `Administer Transactions`.

**Postconditions:** No transaction action is completed and no transaction data changes.

**Data safety:** No data change; action menus are inspected but no refund, void, resend, or other mutation is confirmed.

**Tags:** box-office, transactions, employee-permissions

**Parameters:**

TransactionPage: CurrentTransactions, LegacyTransactions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the Transaction Admin employee. | Employee assigned only to the `Transaction Admin` role | The employee signs in to the rollout-enabled test venue. |
| Open the Transactions page mapped to `TransactionPage`. | TransactionPage | The page opens and the transaction feed is visible. |
| Review the area above the transaction feed. | None | No Selection totals bar, replacement message, or placeholder is shown. |
| Find the recorded action-check transaction. | Recorded transaction number | The matching transaction is visible. |
| Open its available-actions menu without confirming an action. | None | `Refund` and `Resend confirmation email` remain available; `Void` remains available when the selected transaction normally permits it. |
| Filter the feed by event. | `Controlled totals event` | The matching transaction appears and no Selection totals bar appears. |

### SPT-5099: Box Office - Transactions - Verify Box Office access remains available without selection totals

**Title:** Box Office - Transactions - Verify Box Office access remains available without selection totals

**Description:** Validates that a Box Office Seller can open both Transactions implementations without the complete Selection totals bar and without receiving transaction-administration actions. `CurrentTransactions` opens `/manage/box-office/transactions/`; `LegacyTransactions` opens `/dashboard/financials/invoices/`.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The test venue has the rollout enabled.
* The employee is assigned only to the `Box Office Seller` role.
* The action-check transaction number is recorded.

**Postconditions:** No data change.

**Data safety:** No data change.

**Tags:** box-office, transactions, employee-permissions

**Parameters:**

TransactionPage: CurrentTransactions, LegacyTransactions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the Box Office Seller employee. | Employee assigned only to the `Box Office Seller` role | The employee signs in to the rollout-enabled test venue. |
| Open the Transactions page mapped to `TransactionPage`. | TransactionPage | The page opens and the transaction feed is visible. |
| Review the area above the transaction feed. | None | No Selection totals bar, replacement message, or placeholder is shown. |
| Find the recorded action-check transaction. | Recorded transaction number | The matching transaction is visible. |
| Review its available actions. | None | `Refund`, `Void`, and `Resend confirmation email` are not added by Box Office access. |

### SPT-5100: Box Office - Transactions - Verify totals permission alone does not grant page access

**Title:** Box Office - Transactions - Verify totals permission alone does not grant page access

**Description:** Validates that `View Transaction Totals` by itself does not grant current or legacy Transactions access and does not grant refund, void, resend, check-in, printing, exchange, modification, fulfillment, or another transaction action. `CurrentTransactions` opens `/manage/box-office/transactions/`; `LegacyTransactions` opens `/dashboard/financials/invoices/`.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The test venue has the rollout enabled.
* The employee is assigned only to the `Totals Only` role.
* The employee has no `Use Box Office`, `Administer Transactions`, `Manage Transactions`, or unrestricted role.

**Postconditions:** No data change.

**Data safety:** No data change.

**Tags:** box-office, transactions, employee-permissions

**Parameters:**

TransactionPage: CurrentTransactions, LegacyTransactions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the Totals Only employee. | Employee assigned only to the `Totals Only` role | The employee signs in to the venue without Box Office or transaction-administration access. |
| Review the visible Dashboard and Box Office navigation. | None | No Transactions entry is shown because the totals permission does not grant page access. |
| Attempt to open the page mapped to `TransactionPage` using the path in the Description mapping. | TransactionPage | Access is denied or the employee is redirected to an allowed page. |
| Review the resulting page. | None | No transaction feed, Selection totals, or transaction action is available. |

### SPT-5101: Dashboard - Employee Permissions - Verify existing roles retain only intended access after migration

**Title:** Dashboard - Employee Permissions - Verify existing roles retain only intended access after migration

**Description:** Validates the forward migration for representative roles that existed before deployment. `ExistingFinanceManager` had `Manage Transactions`; `ExistingTransactionAdmin` had only `Administer Transactions`; `ExistingBoxOfficeSeller` had only `Use Box Office`.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The permission migration has completed in the test environment.
* The three named pre-migration roles and their assigned employees still exist.
* Their original role permissions were recorded before deployment.
* `Show selection totals` is selected for the Existing Finance Manager employee.

**Postconditions:** No role or employee data is changed.

**Data safety:** No data change.

**Tags:** dashboard, employee-permissions, transactions

**Parameters:**

ExistingRoleProfile: ExistingFinanceManager, ExistingTransactionAdmin, ExistingBoxOfficeSeller

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Team → `Manage permissions`. | Venue containing the pre-migration roles | The permission matrix opens. |
| Find the role mapped to `ExistingRoleProfile`. | ExistingRoleProfile | The pre-migration role is visible. |
| Review its saved permissions. | ExistingRoleProfile | `ExistingFinanceManager` includes `View Transaction Totals`; the two narrower roles do not. |
| Sign out of the organizer account. | None | The organizer's session ends. |
| Sign in as the employee assigned to the selected role. | ExistingRoleProfile | The employee signs in with the migrated effective access. |
| Open Box Office → Transactions. | None | The selected employee retains previous page access, and only `ExistingFinanceManager` sees Selection totals. |

### SPT-5102: Box Office - Transactions - Verify disabling rollout restores the previous totals gate

**Title:** Box Office - Transactions - Verify disabling rollout restores the previous totals gate

**Description:** Validates the flag-off and rollback state on current and legacy pages. `CurrentTransactions` opens `/manage/box-office/transactions/`; `LegacyTransactions` opens `/dashboard/financials/invoices/`. Only `FinanceManager` sees Selection totals; `TransactionAdmin`, `BoxOfficeSeller`, and `TotalsManager` without the parent permission do not.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* The rollback test venue has `enable_transaction_totals_permission` disabled.
* Each selected employee has only the role mapped to `EmployeeProfile`.
* The independent permission is hidden in the venue's role editor, as covered by SPT-5095.
* The `Totals Manager` role was configured before the flag was disabled so its saved independent permission remains available for rollback testing.
* `Show selection totals` is selected for the Finance Manager employee.

**Postconditions:** No data change.

**Data safety:** No data change.

**Tags:** box-office, transactions, employee-permissions

**Parameters:**

TransactionPage: CurrentTransactions, LegacyTransactions
EmployeeProfile: FinanceManager, TransactionAdmin, BoxOfficeSeller, TotalsManager

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the employee mapped to `EmployeeProfile`. | EmployeeProfile | The employee signs in to the rollout-disabled test venue. |
| Open the Transactions page mapped to `TransactionPage`. | TransactionPage | The employee retains the page access provided by the existing role permissions. |
| Review the complete area above the transaction feed. | EmployeeProfile | `FinanceManager` sees Selection totals; all other selected profiles see no totals bar or placeholder. |
| Filter the feed by event. | `Controlled rollback event` | The matching transaction appears without changing the profile's totals visibility. |

### SPT-5103: Box Office - Transactions - Verify hidden totals leave a clean desktop and mobile layout

**Title:** Box Office - Transactions - Verify hidden totals leave a clean desktop and mobile layout

**Description:** Validates that hiding the complete totals bar leaves no empty container, reserved padding, placeholder, or broken layout. `CurrentTransactions` opens `/manage/box-office/transactions/`; `LegacyTransactions` opens `/dashboard/financials/invoices/`.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| WebBoxOffice | Mobile |

**Preconditions:**

* The test venue has the rollout enabled.
* The employee is assigned only to the `Transaction Admin` role.
* The venue has enough transactions to show the normal feed layout.

**Postconditions:** No data change.

**Data safety:** No data change.

**Tags:** box-office, transactions, mobile-view

**Parameters:**

TransactionPage: CurrentTransactions, LegacyTransactions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the Transaction Admin employee. | Employee assigned to the `Transaction Admin` role | The employee signs in to the rollout-enabled test venue. |
| Open the Transactions page mapped to `TransactionPage`. | TransactionPage | The transaction feed loads without a Selection totals bar. |
| Review the page at desktop width. | Desktop browser width | The feed uses the space above it naturally with no empty bar, placeholder, or extra gap. |
| Change to a mobile-width browser view. | `390 × 844` | The page rearranges without an empty totals area, overlapping controls, or unusable transaction content. |
| Open the Transactions filters. | None | The filter panel opens without creating an empty totals area or covering required controls. |
| Close the Transactions filters. | None | The transaction feed returns to its usable mobile layout without an empty totals area. |

## Minimum Execution Set

Run these first:

1. **SPT-5095 / Enabled and Disabled** — rollout configuration.
2. **SPT-5097 / TotalsManager** on current and legacy pages — clean authorized success.
3. **SPT-5098** and **SPT-5099** on current and legacy pages — primary permission separation and unchanged page access.
4. **SPT-5100 / CurrentTransactions** — totals-only privilege boundary.
5. **SPT-5101 / ExistingFinanceManager and ExistingTransactionAdmin** — migration compatibility.
6. **SPT-5102 / FinanceManager and TotalsManager** on current and legacy pages — rollback.
7. **SPT-5103 / CurrentTransactions** at desktop and mobile widths — no-gap layout.

Run SPT-5096 during permission setup. Expand remaining parameter values for release sign-off or when a failure suggests profile- or page-specific divergence.

## Manual Technical Verification

These checks supplement the user-facing Qase cases because request suppression and an empty API response are not visible in the normal Transactions interface.

**Data safety:** No data change.

### Unauthorized Pages Make No Stats Request

1. Sign in as an employee assigned only to the `Transaction Admin` role while the rollout is enabled.
2. Open browser developer tools, select `Network`, and clear existing entries.
3. Open Current Transactions and wait for the transaction feed to finish loading.
4. Search the recorded requests for `financials/invoices/stats`.
5. Confirm there is no matching request.
6. Clear the Network list and repeat the check on Legacy Transactions.

### Direct Unauthorized API Request Keeps the Existing Contract

1. Use an approved API client authenticated as the same Transaction Admin employee.
2. Send `GET /api/venue/{venue_id}/financials/invoices/stats/` for the rollout-enabled test venue.
3. Confirm the response is HTTP `200` with no selection-total data.
4. Do not claim that aggregation was skipped from this response alone; use the backend automated assertion for that proof.

## Suggested Automated Coverage

- Verify permission metadata, Finance & reporting group, two-step verification, parent/child hierarchy, and child-removal cleanup.
- Verify forward and reverse migration behavior, duplicate avoidance, derived employee access, and no grants to Administer-only or Use Box Office-only roles.
- Run the backend stats matrix for flag off/on, every named profile, and no restrictions.
- Assert an unauthorized request returns empty HTTP `200` before Postgres or ClickHouse aggregation is invoked.
- Assert the authorized response shape, filters, and calculations remain unchanged.
- Extend current-page component tests to prove unauthorized users render no totals component and make no stats request.
- Cover legacy controller/template parity, including no stats request and no Pendo revenue update when unauthorized.
- Preserve route tests proving Current Transactions still requires `Administer Transactions` or `Use Box Office`, not the totals permission.
- Extend the Playwright `TransactionPage` model with user-facing Selection totals assertions and run one authorized and one unauthorized employee profile.
- Add current and legacy desktop/mobile visual assertions for the no-gap state where repository tooling supports them.

## Open Questions

- What supported method is available for opening Legacy Transactions if the deployed environment redirects its direct page after the cutover?
- Which report or migration verification output identifies the exact existing roles and derived employee assignments updated during rollout?
- Which test venue can safely support both rollout states and the six isolated employee profiles?
- Should the checked-out Current Transactions access configuration be updated to allow `Use Box Office`, or is the Jira acceptance criterion outdated?
- Which migration or deployed revision contains the required forward/reverse transaction-totals backfill?
