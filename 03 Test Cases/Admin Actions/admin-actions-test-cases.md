---
title: Admin Actions Qase Test Cases
date: 2026-07-28
tags:
  - qa/test-cases
  - qase
  - admin-actions
aliases:
  - Admin Actions Test Cases
qase_status: synced
qase_suite: 985
---

# Admin Actions Qase Test Cases

> [!success] Qase status
> Synced to Qase suite 985 on 2026-07-28. Seven existing cases were updated and thirteen cases were created. All twenty stored cases were read back and verified after the write.
>
> Platform and View fields are intentionally omitted because the user established that this scope is web-only and asked not to include them.

## Testing Intent

We are testing whether an authorized Showpass admin can safely use every workflow under `/manage/admin/actions/` while access, imported data, generated records, financial state, and background-job outcomes remain correct; this matters because these tools can create or change large amounts of operational data, and we will prove correctness through visible validation, selected-row previews, job results, downloaded reports, and downstream records.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Permission boundary, money and payout state, fulfillment/access, async final state, and lower-risk administrative operations |
| Business invariant | Only Showpass admins can use Admin Actions, and each action changes only the selected test data exactly once while reporting an accurate final result. |
| User or business impact | Showpass internal admins, organizers, finance, support, customers, and attendees |
| Failure mode | Unauthorized access, wrong records created or updated, invalid rows imported, duplicate jobs, incorrect settlement state, missing fulfillment, or misleading job status |
| Observable proof | The expected page, validation, preview counts, selected rows, progress, final status, report, download, notification, or downstream record is visible. |
| Source of truth | Frontend route configuration, page components, shared import workflow, frontend component tests, and existing Qase cases in suite 985 |
| Primary surfaces | Web Dashboard Admin Actions and named downstream verification pages |
| In scope | Root redirect, admin access, all 19 configured child actions, validation, successful completion, supported job controls, and named downstream proof |
| Out of scope | Admin Tools outside `/manage/admin/actions/`, backend-only contracts, mobile/native clients, broad Qase gap analysis, and production-data execution |
| Confidence | High for routes, controls, validation, and visible frontend states; Medium for downstream data and third-party completion that require environment fixtures or backend confirmation |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| Only Showpass admins can see and open Admin Actions. | Prevents unauthorized high-impact operations. | TC-1 |
| Imports accept selected valid rows and reject invalid rows. | Prevents bulk creation of corrupt or unintended data. | TC-3, TC-4, TC-6 through TC-8, TC-11, TC-12, TC-15, TC-19, TC-20 |
| Background jobs show accurate progress, controls, reports, and final states. | Prevents stuck, duplicated, or misleading bulk operations. | TC-2, TC-3, TC-6 through TC-8, TC-10 through TC-13, TC-15, TC-19, TC-20 |
| Generated files, codes, tickets, memberships, and notifications match the request. | Protects customer access and operational fulfillment. | TC-9 through TC-16, TC-19 |
| Financial and transaction actions affect only named records and show reliable results. | Prevents incorrect payouts, settlements, or transaction investigations. | TC-3, TC-4, TC-7, TC-14, TC-17, TC-18 |

## Declared Scope

- Start from Web Dashboard as a Showpass internal admin.
- Treat `/manage/admin/actions/` as the root entry point; source redirects it to `/manage/admin/actions/job-history`.
- Cover every child action registered in `ADMIN_ACTIONS_ROUTES`.
- Verify user-visible behavior first. Use downstream Dashboard or public pages only where they provide the named completion proof.
- Use isolated, disposable, or explicitly approved test data for every mutation.
- Platform and View combinations are not part of these cases.

## Qase Preservation And Write Classification

The provided preview case, SPT-4995, belongs to Hardcopy Ticket Orders in suite 1034 and is not part of Admin Actions. It was excluded from this Qase write.

| Local Case | Qase Action | Existing Case | Classification | Preservation Baseline |
| --- | --- | --- | --- | --- |
| TC-1 | Created | SPT-4996 | Create | New root-navigation and admin-access responsibility |
| TC-2 | Updated | SPT-4833 | Enhance | Preserve job filters, financial import parameters, displayed job details, reports, and status-dependent actions. |
| TC-3 | Updated | SPT-1773 | Enhance | Preserve valid advance template, preview, confirmation, completion, job history, and generated advance proof. |
| TC-4 | Updated | SPT-1780 | Enhance | Preserve missing/empty/all-invalid/mixed-row validation, valid-only import, duplicate confirmation rejection, and error reports. |
| TC-5 | Created | SPT-4997 | Create | New deprecation and current-workflow link coverage for two legacy pages |
| TC-6 | Created | SPT-4998 | Create | New customer import coverage |
| TC-7 | Updated | SPT-4734 | Enhance | Preserve template, preview, valid/invalid rows, confirmation, completion, and Job History proof. |
| TC-8 | Updated | SPT-4741 | Enhance | Preserve selected venue, template rules, preview, selected-row confirmation, final result, and Job History proof. |
| TC-9 through TC-17 | Created | SPT-4999 through SPT-5007 | Create | New action-specific coverage |
| TC-18 | Updated | SPT-4733 | Enhance | Preserve manual lookup, invalid lookup, and query-string lookup while aligning the current route and visible summary. |
| TC-19 | Created | SPT-5008 | Create | New external-barcode import coverage |
| TC-20 | Updated | SPT-4746 | Enhance | Preserve template rules, mixed preview, confirmation, Job History, and created-venue proof. |

Existing unapproved `financials` tags are replaced by approved domain tags without narrowing behavioral coverage. Existing meaningful parameters and assertions are preserved or broadened.

## Sources Reviewed

- Existing Qase suite 985: SPT-1773, SPT-1780, SPT-4733, SPT-4734, SPT-4741, SPT-4746, and SPT-4833.
- Frontend routes: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/constants/dashboard-routes/admin.ts`
- Admin access and route inventory: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/admins/admin-actions/constants/admin-actions-config.ts`
- Admin permission gate: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/templates/DashboardPage/DashboardPagePermission/DashboardPagePermission.web.tsx`
- Root redirect: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/manage/admin/actions/index.tsx`
- Admin Actions pages: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/admins/admin-actions/ui/pages/`
- Shared import workflow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/shared/import-workflow/`
- Password import fields and timezone tests: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/admins/admin-actions/constants/password-import-fields.ts`
- Job History and settlement frontend tests in the Admin Actions page folder.

## Assumptions And Unknowns

- A Showpass internal admin account and a non-admin Dashboard account are available.
- The beta environment contains disposable venues, events, ticket types, transactions, invoices, and payment-gateway references.
- Admin APIs enforce the same admin boundary as the frontend. Backend permission behavior was not inspected because the user designated frontend source as the first source for this request.
- Job pause, resume, and cancel checks require disposable jobs in eligible states.
- QuickBooks authentication requires a safe test company and credentials.
- Notification delivery, generated financial records, and imported entities may require a second supported surface or admin page for final proof.
- Exact cleanup APIs or admin actions are not established by frontend source for every bulk mutation.

## Source-Backed Behavior

- The Admin section and every Admin Actions page require a Showpass admin. Non-admin direct access renders the Dashboard no-permission state.
- `/manage/admin/actions/` redirects to Job History.
- The sidebar exposes Job History plus 18 action routes. Create Advances and Custom Settlements each have a current async workflow and a deprecated legacy workflow.
- Current CSV imports require a CSV under 20 MB, show valid and invalid row counts, prevent invalid-row selection, confirm only selected valid rows, and expose processing, completion, failure, and report states.
- Job History supports type and status filters, refresh, pagination, success/error reports, and status-dependent Pause, Resume, and Cancel controls.
- Background imports can display completed, completed-with-errors, failed, interrupted, or cancelled outcomes.
- Transaction Lookup supports form entry and query-string entry, shows a summary plus details for a result, and clears prior data after a failed lookup.
- Password Import changes its required scope fields between Event and Ticket Type and blocks the form when the selected venue has no valid timezone.
- Settle Invoices uses the admin's browser timezone for the settlement instant and accepts one transaction ID per line.

## Product-Surface And Complex-Control Inventory

| Surface or Control | Applicable Behavior |
| --- | --- |
| Root and sidebar | Admin-only visibility, root redirect, active item, all configured action links |
| File upload | Required file, CSV-only input, 20 MB maximum, replacement file |
| Import preview | Counts, All/Valid/Invalid filters, warnings/errors, disabled invalid rows, select all, row selection, cancel, upload another file, confirm |
| Processing state | Progress, processed/total count, job metadata, eligible Pause/Resume/Cancel actions, background-processing message |
| Completion/failure state | Status, processed count, success/error reports, reset/retry |
| Job History table | Type/status filters, refresh, pagination, columns, report links, action eligibility, cancel confirmation |
| Generated-output actions | Downloaded ZIP/CSV, copied URL, generated codes, tickets, memberships, or barcodes |
| Search and date controls | Venue search, transaction lookup, timezone-aware settlement and password dates |

## Risk Areas

- Admin routes appearing to non-admin users or loading through direct URLs.
- Old `/manage/admin/admin-actions/` paths remaining in test instructions after the route changed to `/manage/admin/actions/`.
- Invalid import rows being selected or processed.
- A second confirmation creating duplicate records.
- Jobs exposing Pause, Resume, or Cancel in an unsupported final state.
- Partial-success jobs appearing as full success or hiding their error report.
- Imports creating records for the wrong venue, event, ticket type, membership level, customer, or transaction.
- Generated codes, tickets, memberships, or PDFs not matching requested quantity or assignment.
- Financial tools settling, advancing, or reporting the wrong transaction or venue.
- Settlement and password schedule times shifting because of timezone conversion.
- Legacy pages being mistaken for the current supported workflows.

## State-Space / Setup Matrix

| Axis | Representative Values | Coverage Decision |
| --- | --- | --- |
| Role | ShowpassAdmin, NonAdminDashboardUser | Both required in TC-1 |
| Import rows | AllValid, MixedValidInvalid, AllInvalid | Clean success plus representative rejection |
| Job state | Pending, InProgress, Paused, Interrupted, Completed, CompletedWithErrors, Failed, Cancelled | Status/action behavior in TC-2; action cases prove relevant final states |
| Import scope | Global admin action, selected venue, selected event/ticket type | Separate cases where visible setup differs |
| Inventory | GeneralAdmission, AssignedSeating | Parameterized for complimentary tickets and memberships |
| Entry point | Sidebar, direct root, direct child URL, transaction query string | Covered where starting state differs |
| Outcome | Clean success, validation rejection, completed with errors, failed/cancelled | Risk-weighted coverage; destructive failure fixtures may be manual-only |

## Coverage Ledger

| Item | Type | Risk | Coverage | Evidence / Decision |
| --- | --- | --- | --- | --- |
| Root redirect and admin boundary | Permission/route | Unauthorized bulk action | Covered: TC-1 | Route config and Dashboard permission gate |
| Job History | Table/job controls | Wrong or uncontrolled job state | Covered: TC-2 | Page and frontend tests |
| Create advances | Financial import | Wrong payout records | Covered: TC-3, TC-4 | Current import workflow; updates SPT-1773/1780 |
| Create advances legacy | Deprecated import | Admin uses obsolete workflow | Covered: TC-5 | Deprecation warning and current-page link |
| Customer import | Customer mutation | Wrong customer created/updated | Covered: TC-6 | Current import workflow |
| Custom settlements | Financial import | Wrong settlement records | Covered: TC-7 | Current import workflow; updates SPT-4734 |
| Custom settlements legacy | Deprecated import | Admin uses obsolete workflow | Covered: TC-5 | Deprecation warning and current-page link |
| Discount code import | Venue discount mutation | Wrong price/usage rules | Covered: TC-8 | Current import workflow; updates SPT-4741 |
| Export ticket PDFs | File generation | Missing or wrong tickets | Covered: TC-9 | Async ZIP generation page |
| Generate barcodes | Code generation | Wrong quantity/stat attribution | Covered: TC-10 | Background generation page |
| Generate comp memberships | Fulfillment/access | Wrong member or seat ownership | Covered: TC-11 | Current import workflow |
| Generate comp tickets | Fulfillment/access | Wrong attendee or seat ownership | Covered: TC-12 | Current import workflow |
| Generate gift cards | Stored value | Wrong quantity/value/state | Covered: TC-13 | Background generation page |
| Grant QuickBooks access | Third-party access | Wrong or failed authorization | Manual-only: TC-14 | Requires safe QuickBooks test credentials |
| Password import | Event/ticket access | Wrong visibility or schedule | Covered: TC-15 | Current import workflow and timezone tests |
| Resend daily sales stats | Notification | Wrong venue/date email | Manual: TC-16 | Source confirms request and success toast; delivery requires mailbox |
| Settle invoices | Financial mutation | Wrong paid state/date | Manual-only: TC-17 | Potentially destructive; use disposable invoices |
| Transaction lookup | Read-only financial lookup | Wrong investigation result | Covered: TC-18 | Form and query-string source paths; updates SPT-4733 |
| Upload external barcodes | Ticket access | Invalid/duplicate check-in codes | Covered: TC-19 | Current import workflow |
| Venue import | Organization creation | Wrong venue hierarchy/config | Manual-only: TC-20 | Potentially broad creation; updates SPT-4746 |
| Admin Tools outside actions root | Adjacent navigation | Scope drift | Not applicable | Different routes and feature ownership |

## Recommended Test Data

- One Showpass internal admin and one authenticated non-admin Dashboard user.
- Disposable test venue with a valid timezone and access to verify events, discounts, customers, transactions, and reports.
- CSV files under 20 MB: one valid, one mixed valid/invalid, one empty, and one all-invalid for representative imports.
- Disposable event and ticket types for general admission, assigned seating, hidden/password access, generated barcodes, and external barcodes.
- Disposable customer emails unique to the run and one existing customer email for update behavior.
- Disposable invoices and transactions whose settlement or advance state can be safely changed.
- Payment gateway ID and charge ID for a known beta transaction.
- Safe QuickBooks test company and credentials.
- Dedicated mailbox for complimentary fulfillment and daily-sales email checks.

## Qase-Ready Manual Test Cases

### TC-1: Dashboard - Admin Actions - Verify only Showpass admins can access Admin Actions

**Qase action:** Created SPT-4996 in suite 985.

**Description:** Verifies that Admin Actions is visible and accessible only to Showpass internal admins, that the root opens Job History, and that configured child actions are reachable from the sidebar.

**Preconditions:**

* A Showpass internal admin account is available.
* An authenticated non-admin Dashboard account is available.

**Postconditions:** No data is changed.

**Tags:** dashboard, admin-actions, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the Showpass admin and open `/manage/admin/actions/`. |  | The browser opens `/manage/admin/actions/job-history`, Job History is displayed, and the Admin Actions sidebar is visible. |
| Review the sidebar and open several actions. | Include Job History, Create advances, Custom settlements, Transaction lookup, and Venue import. | Each configured action appears once, opens its matching route, and is shown as the active sidebar item. |
| Sign out, sign in as the non-admin Dashboard user, and review the Dashboard navigation. |  | The Admin section and Admin Actions entry are not visible. |
| Open `/manage/admin/actions/job-history` directly as the non-admin user. |  | A No Permission page is shown and no Admin Actions content or job data is exposed. |

### TC-2: Dashboard - Admin Actions - Verify financial import jobs can be monitored and controlled

**Qase action:** Updated SPT-4833 in suite 985. Classification: Enhance.

**Description:** Verifies that an internal admin can filter financial import jobs, inspect their status and reports, and use only the actions allowed by each job state.

**Preconditions:**

* A Showpass internal admin can access Admin Actions.
* Disposable advance and settlement import jobs exist in In Progress, Paused or Interrupted, Completed, and Completed With Errors states.
* No production job is used for Pause, Resume, or Cancel.

**Postconditions:**

* Any paused job is resumed or left in its approved test state.
* Only the disposable job selected for cancellation is cancelled.

**Tags:** dashboard, admin-actions, payouts

**Parameters:**
ImportType: AdvanceImport, SettlementImport

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Job history. | ImportType | The Import Jobs table shows ID, Type, Status, Progress, Created, Triggered by, Reports, and Actions columns. |
| Filter by the selected import type and by a known status. | ImportType and job status | Only jobs matching both filters are displayed. |
| Open available Success and Errors report links for a completed job. |  | Each link opens the report associated with that job and result type. |
| Pause an In Progress disposable job. |  | The action applies only to that job and the job becomes eligible to resume. |
| Resume a Pending, Paused, or Interrupted disposable job. |  | The action applies only to that job and its status returns to active processing. |
| Select Cancel on an eligible disposable job, choose No, go back, then cancel again and confirm Yes, cancel job. |  | The first choice preserves the job; the confirmed choice cancels only the selected job. |
| Review completed, failed, and cancelled jobs. |  | No Pause, Resume, or Cancel action is shown for a final state. |

### TC-3: Dashboard - Admin Actions - Verify advances are created from valid CSV rows

**Qase action:** Updated SPT-1773 in suite 985. Classification: Enhance.

**Description:** Verifies that an internal admin can preview and import valid advance rows, follow the background job to completion, and confirm that the expected advance records were created.

**Preconditions:**

* A Showpass internal admin can access Create advances.
* A valid CSV contains a disposable venue, cutoff date, percentage, amount boundaries, and applicable event, product, or membership selections.
* Expected advance results can be checked from an approved admin or financial view.

**Postconditions:**

* The advance job remains in Job History.
* Generated test advances are recorded for approved cleanup or isolation.

**Tags:** dashboard, admin-actions, payouts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Create advances and download the template. |  | The current async Create advances page loads and the template contains the columns described by the CSV Format Guide. |
| Upload the valid CSV and continue to preview. | Valid advance CSV under 20 MB | Import Preview shows the expected row count and all valid rows are selected. |
| Review the row data, then select Confirm Import. |  | A background job starts with its ID, type, status, progress, start time, and initiating admin. |
| Wait for the job to finish. |  | The page shows Advance import complete with the processed count and any Success report. |
| Open Job History and locate the same job ID. |  | Job History shows the matching type, final status, initiator, progress, and reports. |
| Verify the imported advance results from the approved financial view. | Expected venue, cutoff date, and amount | Only the selected CSV rows created the expected advance records. |

### TC-4: Dashboard - Admin Actions - Verify invalid advance import rows are rejected

**Qase action:** Updated SPT-1780 in suite 985. Classification: Enhance.

**Description:** Verifies that advance import validation blocks unusable files, prevents invalid rows from being selected, imports only selected valid rows, and reports partial failures without duplicating advances.

**Preconditions:**

* A Showpass internal admin can access Create advances.
* Empty, all-invalid, and mixed valid/invalid advance CSV files are available.
* Any valid row uses disposable test data.

**Postconditions:**

* No invalid row creates an advance.
* Any valid advance created by the mixed file is recorded for cleanup or isolation.

**Tags:** dashboard, admin-actions, payouts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Attempt to continue without a file, then select an empty CSV. |  | A file is required, and the empty file cannot proceed to an importable preview. |
| Upload the all-invalid CSV. |  | Preview shows zero valid rows, row-level issues, and no enabled confirmation for invalid rows. |
| Upload the mixed CSV and use the All, Valid, and Invalid filters. | One valid and one invalid row | Counts match the file, the valid row can be selected, and the invalid row remains disabled. |
| Confirm the selected valid row and wait for completion. |  | Only the selected valid row is processed; the invalid row appears in the error result when applicable. |
| Return to the already-confirmed preview using browser history and attempt to confirm it again. |  | The duplicate or expired confirmation is rejected and no second advance is created. |
| Open Job History and the available report links. |  | The final status and reports distinguish successful and failed rows. |

### TC-5: Dashboard - Admin Actions - Verify legacy imports direct admins to current workflows

**Qase action:** Created SPT-4997 in suite 985.

**Description:** Verifies that deprecated advance and custom-settlement import pages clearly identify themselves as legacy and link an internal admin to the supported async workflow.

**Preconditions:** A Showpass internal admin can access Admin Actions.

**Postconditions:** No import is submitted.

**Tags:** dashboard, admin-actions

**Parameters:**
LegacyAction: CreateAdvancesLegacy, CustomSettlementsLegacy

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected legacy action from the Admin Actions sidebar. | LegacyAction | The legacy page displays This page is deprecated and identifies the current replacement workflow. |
| Select the link to the current workflow. |  | The matching current Create advances or Custom settlements page opens. |
| Review the current page. |  | The page exposes preview, background processing, progress tracking, and final job states instead of the legacy synchronous-only flow. |

### TC-6: Dashboard - Admin Actions - Verify customers are imported from selected valid CSV rows

**Qase action:** Created SPT-4998 in suite 985.

**Description:** Verifies that an internal admin can import a new customer and update an existing customer from selected valid CSV rows without processing invalid rows.

**Preconditions:**

* A Showpass internal admin can access Customer import.
* The CSV contains one new email, one existing customer email with an approved update, and one invalid row.
* The customer records are disposable or reversible.

**Postconditions:**

* The new customer and approved existing-customer changes are verified.
* Test customer data is removed or restored when safe.

**Tags:** dashboard, admin-actions, user

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Customer import and review the CSV guide. |  | The page states that customer email is required and that a matching email updates the existing customer. |
| Upload the mixed CSV and continue to preview. |  | Preview distinguishes valid and invalid rows and selects only valid rows. |
| Confirm the new-customer and existing-customer rows. |  | A background customer import job starts and reports progress. |
| Wait for the final job state and open any reports. |  | The completion state reports processed rows and separates errors from successes. |
| Find both customer records in the supported customer view. |  | One new customer exists, the existing customer has only the approved changes, and the invalid row created no customer. |

### TC-7: Dashboard - Admin Actions - Verify custom settlements are imported from selected valid rows

**Qase action:** Updated SPT-4734 in suite 985. Classification: Enhance.

**Description:** Verifies that an internal admin can preview and import selected custom-settlement rows and reconcile the completed job with the generated settlement records.

**Preconditions:**

* A Showpass internal admin can access Custom settlements.
* A CSV contains valid disposable settlement rows and one invalid row.
* Expected invoice, credit memo, or advance settlement results can be checked from an approved financial view.

**Postconditions:**

* The settlement job remains in Job History.
* Generated test settlement items are recorded for approved cleanup or isolation.

**Tags:** dashboard, admin-actions, payouts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Custom settlements and download the template. |  | The current async page and CSV Format Guide are displayed. |
| Upload the CSV and continue to preview. |  | Preview shows accurate valid and invalid counts and prevents selection of the invalid row. |
| Select the intended valid rows and confirm the import. |  | A settlement import job starts for only the selected rows. |
| Wait for completion and open available reports. |  | The final status, processed count, and success/error reports agree with the previewed rows. |
| Locate the same job in Job History and verify the approved downstream financial view. |  | The job is recorded and only the selected rows created the expected settlement items. |

### TC-8: Dashboard - Admin Actions - Verify discount codes are imported for the selected venue

**Qase action:** Updated SPT-4741 in suite 985. Classification: Enhance.

**Description:** Verifies that an internal admin can import selected discount-code rows into the displayed venue while invalid or existing codes are skipped with visible issues.

**Preconditions:**

* A Showpass internal admin has selected a disposable venue.
* The venue has a test event and ticket type.
* The CSV contains a valid amount discount, a valid percentage discount, an existing code, and an invalid row.

**Postconditions:** Imported discount codes are deleted, deactivated, or retained as approved fixtures.

**Tags:** dashboard, admin-actions, discounts

**Steps:**

| Step Action                                                                     | Data | Expected Result                                                                                                                       |
| ------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Open Admin Actions > Discount code import.                                      |      | The page identifies the venue receiving the import and provides the template and CSV Format Guide.                                    |
| Upload the mixed CSV and continue to preview.                                   |      | Valid amount and percentage rows are selectable; the invalid row shows an error and the existing code shows a warning or skip result. |
| Review the limits and expiry values, then confirm only the intended valid rows. |      | A discount-code import job starts for the selected venue and rows.                                                                    |
| Wait for completion and open available success and error reports.               |      | Counts and reports agree with the selected, skipped, and invalid rows.                                                                |
| Open the venue's Discounts page and review the imported codes.                  |      | The new codes use the expected ticket type, amount or percentage, limits, expiry, and regular manually-applied behavior.              |

### TC-9: Dashboard - Admin Actions - Verify ticket PDFs are exported for an invoice

**Qase action:** Created SPT-4999 in suite 985.

**Description:** Verifies that an internal admin can generate and download one ticket PDF per event for an invoice and can use the optional ticket-count check to detect a mismatch.

**Preconditions:**

* A Showpass internal admin can access Export ticket PDFs.
* A disposable invoice transaction ID contains known tickets across one or more events.

**Postconditions:** Downloaded ZIP and PDF files are removed from the local test machine.

**Tags:** dashboard, admin-actions, tickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Export ticket PDFs. |  | The page requests an invoice transaction ID and an optional expected ticket count. |
| Enter the transaction ID and matching ticket count, then select Generate. |  | A Generating PDFs state appears and is replaced by Export ready. |
| Compare the displayed invoice ID, event count, and ticket count with the invoice. |  | The displayed metrics match the source invoice. |
| Copy the URL, select Download ZIP, and inspect the archive. |  | The URL is copyable and the ZIP contains one PDF per event with the expected tickets. |
| Generate again with an incorrect expected ticket count. |  | The export is rejected with a visible error and no misleading ready state is shown. |

### TC-10: Dashboard - Admin Actions - Verify ticket barcodes are generated with the requested settings

**Qase action:** Created SPT-5000 in suite 985.

**Description:** Verifies that an internal admin can generate the requested number of barcodes for a ticket type, control whether they are included in statistics, and download the completed result.

**Preconditions:**

* A Showpass internal admin can access Generate barcodes.
* A disposable ticket type ID is available.

**Postconditions:** Generated barcodes are retained as approved fixtures or removed through the supported cleanup process.

**Tags:** dashboard, admin-actions, tickets

**Parameters:**
StatsTreatment: IncludedInStats, ExcludedFromStats

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Generate barcodes. | StatsTreatment | Ticket Type ID, Number of Barcodes, and Include in Stats controls are displayed. |
| Submit zero or a missing ticket type ID before entering valid data. |  | Positive ticket type and barcode-count validation is shown and no job starts. |
| Enter the disposable ticket type, requested count, and selected statistics treatment, then select Generate Barcodes. |  | A background job starts and shows the requested progress. |
| Wait for completion and download the CSV. |  | The completed count equals the request and the CSV contains that number of generated barcodes. |
| Verify the ticket type from the supported admin view. |  | The generated barcodes belong to the selected ticket type and use the selected statistics treatment. |

### TC-11: Dashboard - Admin Actions - Verify complimentary memberships are generated from CSV

**Qase action:** Created SPT-5001 in suite 985.

**Description:** Verifies that an internal admin can generate complimentary memberships for general-admission or assigned-seating inventory and deliver the selected memberships to the intended recipients.

**Preconditions:**

* A Showpass internal admin can access Generate comp memberships.
* Disposable general-admission and assigned-seating membership levels are available.
* A dedicated recipient mailbox is available.

**Postconditions:** Generated memberships are retained as approved fixtures or removed through the supported cleanup process.

**Tags:** dashboard, admin-actions, memberships

**Parameters:**
MembershipInventory: GeneralAdmission, AssignedSeating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Generate comp memberships and download the template. | MembershipInventory | The guide explains the selected inventory format, quantities, and optional notification fields. |
| Prepare and upload a valid row plus an invalid row and an optional custom message. |  | Preview identifies row validity and prevents the invalid row from being selected. |
| Confirm the intended valid row. |  | A complimentary-membership job starts and shows progress for the selected row. |
| Wait for completion and open available reports. |  | The final count and reports agree with the selected row. |
| Review the recipient account and any enabled notification. |  | The intended membership quantity and seat or area assignment belong to the recipient, and enabled notifications contain the custom message. |

### TC-12: Dashboard - Admin Actions - Verify complimentary tickets are generated from CSV

**Qase action:** Created SPT-5002 in suite 985.

**Description:** Verifies that an internal admin can generate complimentary tickets for general-admission or assigned-seating inventory without issuing tickets from invalid rows.

**Preconditions:**

* A Showpass internal admin can access Generate comp tickets.
* Disposable general-admission and assigned-seating ticket types are available.
* A dedicated recipient mailbox is available.

**Postconditions:** Generated tickets are retained as approved fixtures or voided through the supported cleanup process.

**Tags:** dashboard, admin-actions, tickets

**Parameters:**
TicketInventory: GeneralAdmission, AssignedSeating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Generate comp tickets and download the template. | TicketInventory | The guide explains quantity, seat/location, optional scan code, and one-ticket-per-row rules for the selected inventory. |
| Prepare and upload a valid row plus an invalid row and an optional custom message. |  | Preview identifies row validity and prevents the invalid row from being selected. |
| Confirm the intended valid row. |  | A complimentary-ticket job starts and shows progress for the selected row. |
| Wait for completion and open available reports. |  | The final count and reports agree with the selected row. |
| Review the recipient order and any enabled notification. |  | Only the intended tickets were issued with the expected quantity, seat or area assignment, and unique scan code when supplied. |

### TC-13: Dashboard - Admin Actions - Verify gift card codes are generated with the requested settings

**Qase action:** Created SPT-5003 in suite 985.

**Description:** Verifies that an internal admin can generate gift card codes with the requested quantity, value, label, and initial redeemable state.

**Preconditions:**

* A Showpass internal admin has selected a disposable venue.
* Gift card generation can run without affecting production inventory.

**Postconditions:** Generated gift cards are disabled, removed, or retained as approved fixtures.

**Tags:** dashboard, admin-actions, payment

**Parameters:**
InitialState: Redeemable, NotRedeemable

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Generate gift cards. | InitialState | Label, Number of Codes, Gift Card Value, and redeemable-state controls are displayed. |
| Submit zero and then more than 100,000 codes before entering valid data. |  | Quantity must be greater than zero and cannot exceed 100,000; no job starts. |
| Enter a label, valid quantity and value, choose the initial state, and select Generate Gift Cards. |  | A background job starts and displays generated-code progress. |
| Wait for completion and download the CSV. |  | The completed count equals the request and the CSV contains the generated codes. |
| Review representative codes in the supported gift-card view. |  | Each code has the requested value, label, venue, and initial redeemable state. |
| Submit the same active-job parameters again while the first job is still duplicate-eligible. |  | A duplicate-job message is shown and a second identical job is not created. |

### TC-14: Dashboard - Admin Actions - Verify QuickBooks Online access can be granted

**Qase action:** Created SPT-5004 in suite 985.

**Description:** Verifies that an internal admin can start the QuickBooks Online authorization flow and return to Showpass with a visible success state.

**Preconditions:**

* A Showpass internal admin can access Grant QuickBooks access.
* Safe QuickBooks test-company credentials are available.
* The test is approved to update the beta QuickBooks authorization.

**Postconditions:** The beta QuickBooks connection is left in the approved authorized state.

**Tags:** dashboard, admin-actions, quickbooks

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Grant QuickBooks access. |  | The page explains the redirect and shows Grant QuickBooks Access. |
| Select Grant QuickBooks Access and complete authorization in the safe QuickBooks company. |  | QuickBooks requests authorization and returns the admin to Showpass after success. |
| Review the returned Showpass page. |  | QuickBooks Online Authentication Successful is displayed with Grant Access Again. |
| Select Grant Access Again. |  | The page returns to the initial authorization state without showing stale success content. |

### TC-15: Dashboard - Admin Actions - Verify event or ticket-type passwords are imported

**Qase action:** Created SPT-5005 in suite 985.

**Description:** Verifies that an internal admin can import passwords for an event or a specific ticket type with the selected schedule, activity, purchase-limit, and matching behavior.

**Preconditions:**

* A Showpass internal admin has selected a disposable venue with a valid timezone.
* A disposable event and hidden ticket type are available.
* A CSV contains valid passwords and one invalid row.

**Postconditions:** Imported passwords are disabled, removed, or retained as approved fixtures.

**Tags:** dashboard, admin-actions, events

**Parameters:**
PasswordScope: Event, TicketType

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Password import and select the scope. | PasswordScope | Event scope shows Event IDs and optional Ticket Type IDs; Ticket Type scope shows one required Ticket Type ID. |
| Enter the approved scope, schedule, Active state, purchase limit, regex choice, and CSV. | Venue timezone and PasswordScope | The datetime controls show the venue timezone and the selected scope fields remain visible. |
| Continue to preview and review the mixed rows. |  | Valid passwords can be selected and the invalid row cannot be selected. |
| Confirm the selected rows and wait for completion. |  | The final job state and reports agree with the selected passwords. |
| Open the affected public event and enter a representative imported password. |  | The password exposes only the configured event or ticket type and follows the configured active time and purchase limit. |
| Repeat from a venue without a valid timezone without submitting. |  | The import form is blocked with guidance to update the venue timezone. |

### TC-16: Dashboard - Admin Actions - Verify a venue's daily sales email can be resent

**Qase action:** Created SPT-5006 in suite 985.

**Description:** Verifies that an internal admin can select a venue and date and initiate the matching daily sales email without sending a report for another venue or day.

**Preconditions:**

* A Showpass internal admin can access Resend daily sales stats.
* A beta venue has known sales for a specific date.
* A mailbox that receives the venue's daily sales email is available.

**Postconditions:** One requested daily sales email is retained as execution evidence.

**Tags:** dashboard, admin-actions, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Resend daily sales stats. |  | Required Venue and Date controls and Resend Daily Sales Email are displayed. |
| Search using at least two characters and select the intended venue. |  | Matching venues are shown with identifying details and the selected venue is retained. |
| Select the known sales date and submit. |  | Daily sales email resending initiated is shown once. |
| Open the recipient mailbox and inspect the new email. |  | The email is for the selected venue and date and does not contain another venue's daily report. |

### TC-17: Dashboard - Admin Actions - Verify invoices are marked paid at the selected settlement time

**Qase action:** Created SPT-5007 in suite 985.

**Description:** Verifies that an internal admin can mark only the listed disposable invoices paid using the displayed browser-timezone settlement instant and can see a clear error when the request fails.

**Preconditions:**

* A Showpass internal admin can access Settle invoices.
* Two disposable unpaid invoice transaction IDs are available.
* The original invoice state is recorded and the mutation is approved.

**Postconditions:**

* The two test invoices remain in the approved paid state or are restored through a supported process.
* No unlisted invoice changes.

**Tags:** dashboard, admin-actions, transactions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Settle invoices. |  | Required Settlement Date and Invoices controls are displayed, and the browser timezone is visible. |
| Enter the two transaction IDs on separate lines with a blank line and surrounding spaces. |  | The entered IDs remain available for submission without requiring extra characters or separators. |
| Select the approved settlement date and time and choose Mark Invoices Paid. |  | Invoices marked as paid successfully is shown. |
| Open the supported invoice or transaction view for both IDs. |  | Only the two listed invoices are paid and their settlement time represents the selected instant. |
| Submit a known invalid transaction ID. |  | A visible error is shown in the page and toast, and no unrelated invoice changes. |

### TC-18: Dashboard - Admin Actions - Verify a gateway transaction can be looked up

**Qase action:** Updated SPT-4733 in suite 985. Classification: Enhance.

**Description:** Verifies that an internal admin can look up a known gateway transaction from the form or a query-string link and receives a clear error with no stale result for invalid identifiers.

**Preconditions:**

* A Showpass internal admin can access Transaction lookup.
* A valid beta payment gateway ID and charge ID are known.
* An invalid gateway or charge ID is available.

**Postconditions:** No data is changed.

**Tags:** dashboard, admin-actions, transactions

**Parameters:**
LookupEntryPoint: ManualForm, QueryString

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Transaction lookup using the selected entry point. | ManualForm: enter Gateway ID and Charge ID; QueryString: use `?gateway_id=<id>&charge_id=<id>` | The current `/manage/admin/actions/transaction-lookup` page loads, and query-string values are populated and searched automatically when used. |
| Submit the valid lookup when using the form. | Valid gateway and charge IDs | Transaction found is shown and a Transaction Summary appears. |
| Compare Status, Amount, Email, Basket / Ref, and Transaction Details with the known gateway transaction. |  | Available summary values and detailed data describe the same transaction. |
| Submit the invalid gateway or charge ID. |  | An error is shown, the previous transaction result is cleared, and no stale summary remains. |

### TC-19: Dashboard - Admin Actions - Verify external ticket barcodes are imported from valid rows

**Qase action:** Created SPT-5008 in suite 985.

**Description:** Verifies that an internal admin can import selected valid external barcodes for an eligible ticket type while invalid barcode or expiration rows remain unprocessed.

**Preconditions:**

* A Showpass internal admin can access Upload external barcodes.
* A disposable ticket type has external barcodes enabled.
* A CSV contains one valid Code39 barcode and one invalid barcode or expiration row.

**Postconditions:** Imported external barcodes are retained as approved fixtures or removed through the supported cleanup process.

**Tags:** dashboard, admin-actions, tickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Upload external barcodes and review the template guide. |  | Ticket Type ID and CSV are required, and the guide describes barcode and expiration columns. |
| Enter zero or an ineligible ticket type ID before using the valid fixture. |  | A positive eligible ticket type is required and no import job starts. |
| Enter the eligible ticket type, upload the mixed CSV, and continue to preview. |  | The valid row is selectable and the invalid barcode or expiration row shows an issue and remains unselected. |
| Confirm the valid row and wait for completion. |  | The final count and reports show only the selected valid barcode as processed. |
| Review the ticket type's external barcode inventory. |  | The valid barcode and expiration belong to the selected ticket type and the invalid row created no barcode. |

### TC-20: Dashboard - Admin Actions - Verify venues are imported from selected valid CSV rows

**Qase action:** Updated SPT-4746 in suite 985. Classification: Enhance.

**Description:** Verifies that an internal admin can preview and create selected venues from CSV while invalid venue hierarchy or configuration rows remain unprocessed.

**Preconditions:**

* A Showpass internal admin can access Venue import.
* A disposable parent venue is available when testing a sub-organization row.
* A CSV contains one valid venue row and one invalid hierarchy or payment-configuration row.
* Creation of disposable venues is approved.

**Postconditions:** Created venues are removed, disabled, or retained as approved fixtures.

**Tags:** dashboard, admin-actions, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Admin Actions > Venue import and download the template. |  | The current async page and venue CSV guide are displayed. |
| Prepare the valid and invalid rows according to the guide, then upload the CSV. |  | Preview shows accurate row status and explains the invalid hierarchy or payment configuration. |
| Select only the valid row and confirm the import. |  | A venue import job starts for the selected row. |
| Wait for completion and open available reports. |  | The final count and reports distinguish the created venue from the rejected row. |
| Open the supported admin venues page and find the created venue. |  | The selected venue exists with the intended parent relationship and configuration, and the invalid row created no venue. |

## Minimum Execution Set

Run these first for the highest-risk and broadest proof:

- TC-1 — admin permission boundary and root navigation
- TC-2 — shared job status, report, and control behavior
- TC-3 — clean financial import success
- TC-4 — invalid-row and duplicate-confirmation protection
- TC-7 — custom settlement import
- TC-8 — venue-scoped discount import
- TC-13 — stored-value gift card generation
- TC-15 — password-based customer access
- TC-17 — invoice settlement mutation
- TC-18 — transaction lookup success and failure
- TC-20 — bulk venue creation

Then execute the remaining cases according to the release scope and available safe fixtures. TC-14 remains manual-only if a safe QuickBooks test company is unavailable.

## Suggested Automated Coverage

- Add a route-and-permission smoke that asserts the root redirect, admin sidebar inventory, and No Permission result for a non-admin direct URL.
- Add shared import-workflow browser coverage for mixed valid/invalid rows, selection, filters, confirm, progress, completed-with-errors, reports, and reset using one representative import.
- Add focused browser tests for Customer import, Discount code import, Password import, and External barcode import because their setup fields materially change import behavior.
- Add component coverage for Generate Barcodes and Generate Gift Cards boundary errors and duplicate-job responses.
- Add a browser test for Transaction Lookup form and query-string entry, including clearing a prior result after an invalid lookup.
- Keep QuickBooks authorization, delivered-email inspection, and destructive settlement cleanup manual unless isolated fixtures and reliable provider stubs exist.

## Open Questions

- Should the two deprecated legacy routes remain permanent regression coverage, or should TC-5 be removed when the routes are retired?
- Which supported admin or financial page is the approved downstream proof and cleanup surface for advance and custom-settlement imports?
- Is a safe QuickBooks test company available for TC-14?
- Which beta mailbox should be used for complimentary fulfillment and daily-sales email delivery?
- What is the approved cleanup process for generated gift cards, barcodes, external barcodes, complimentary tickets/memberships, and imported venues?
