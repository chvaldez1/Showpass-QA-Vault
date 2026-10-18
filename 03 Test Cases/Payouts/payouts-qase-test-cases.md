---
title: Finance — Payouts — Qase-ready base cases
date: 2026-10-17
tags:
  - qa/test-cases
  - qase
  - payouts
status: Published and verified; eight cases added and three cases refined; execution pending
---

# Finance → Payouts — base cases

**Result:** published **eight new cases, SPT-5695–5702**, and refined **SPT-4396, SPT-4834 and SPT-4799** in existing **Finance → Payouts suite1011**. Full readback verified all fields and parameters. Shared banking cases remain unchanged in Organization → Payment Details and Authorization1182. No suite was moved, created, renamed or deleted. Product tests and financial actions were not executed.

**Scope:** the current Payouts list, existing payout details/summary, grouping Settings and their permission/organization boundaries. Base workflows plus notable negative/empty/access states; no payout generation, bank transfer or bank-account edit. Current route evidence: `/manage/finance/payouts/`; manual steps use visible navigation. Definitions are manual-only, not executed passes.

| Label | Focus | Decision | Parameters | Steps |
| --- | --- | --- | --- | --- |
| SPT-4396 | Show the correct payout list | Updated; verified | RowKind (3) | 4 |
| [SPT-5695](https://app.qase.io/case/SPT-5695) (TC-1) | Open an existing payout and return to the list | Created; verified | OpenMethod (2); PayoutState (2) | 4 |
| [SPT-5696](https://app.qase.io/case/SPT-5696) (TC-2) | Reconcile the selected payout summary | Created; verified | None | 4 |
| [SPT-5697](https://app.qase.io/case/SPT-5697) (TC-3) | Expand and collapse payout summary groups | Created; verified | SummaryGroup (5) | 4 |
| [SPT-5698](https://app.qase.io/case/SPT-5698) (TC-4) | Load more payouts without missing or repeating rows | Created; verified | None | 4 |
| SPT-4834 | Block payout pages when an employee lacks access | Updated; verified | MissingPermission (2); PayoutPage (3) | 3 |
| [SPT-5699](https://app.qase.io/case/SPT-5699) (TC-5) | Show the empty payout list | Created; verified | None | 3 |
| [SPT-5700](https://app.qase.io/case/SPT-5700) (TC-6) | Return safely from an unavailable payout link | Created; verified | PayoutLink (2) | 3 |
| [SPT-5701](https://app.qase.io/case/SPT-5701) (TC-7) | Keep payouts separate when switching organizations | Created; verified | None | 4 |
| SPT-4799 | Save payout report grouping | Updated; verified | PayoutGrouping (2) | 4 |
| [SPT-5702](https://app.qase.io/case/SPT-5702) (TC-8) | Refuse grouping changes without organization editing permission | Created; verified | None | 4 |

### SPT-4396: Dashboard - Finance - Payouts - Show the correct payout list

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Show the correct payout list

**Description:** Open Finance → Payouts and compare the list with independently recorded payout records for the selected organization. A payout is a generated record of money owed or received by the organization; viewing it does not initiate a bank transfer. Run RowKind separately: PaidPositive = positive total with a recorded Date Paid; UnpaidPositive = positive total with no Date Paid; UnpaidNegative = negative total with no Date Paid. Check Date against the creation timestamp converted to the browser’s timezone, not the payment date. Repeat in CAD and USD organizations where those existing records are available; currency is an execution context rather than another parameter.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* For RowKind, have the finance setup owner identify an existing generated payout and provide its full Payout ID, creation timestamp, paid date or unpaid state, signed total and organization currency independently of this page. Record the browser timezone. Use organizations already in the selected currency; do not change currency or settle a payout. Have the finance owner also provide the expected payout IDs and statuses for the other rows being compared; include an ordinary customer order as a record that must not appear.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts

**Parameters:**

RowKind: PaidPositive, UnpaidPositive, UnpaidNegative

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Finance → Payouts for the selected organization. |  | Payouts opens with Status, Date, Payout ID, Payout Total and View Detail controls. |
| Find the payout recorded for RowKind; scroll down if necessary. | The recorded full Payout ID identifies the record; the list displays a shortened ID. | Exactly one matching row shows the expected status, creation date and signed total in the organization currency. |
| Compare the other visible rows with the finance owner’s payout records. |  | Only payouts belonging to the selected organization appear; ordinary customer purchase orders do not appear as payout rows. |
| Inspect the notice above the populated list. |  | The notice explains that funds generally take 3–5 business days to reach the account; it does not mark an unpaid payout as paid. |

### SPT-5695: Dashboard - Finance - Payouts - Open an existing payout and return to the list

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Open an existing payout and return to the list

**Description:** Open one payout and check its overview, then return using Back. Run each OpenMethod with each PayoutState: Row selects a non-button area in the recorded payout row; ViewDetail selects that row’s View Detail. Paid uses a record with a paid date; Unpaid uses a record without one. These four runs prove both opening controls and the paid-date difference, not a bank deposit.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* For PayoutState, select an existing payout with independently recorded full ID, signed total, currency, creation timestamp and paid date or unpaid state. Record the browser timezone for date comparisons.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts

**Parameters:**

OpenMethod: Row, ViewDetail
PayoutState: Paid, Unpaid

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Finance → Payouts and locate the recorded payout. |  | The matching row shows the recorded amount and status. |
| Open the payout using OpenMethod. | Row or ViewDetail, as defined in Description. | Payout details opens for the same full Payout ID. |
| Compare the Payout Total, Status, Payout ID, Date Created and Date Paid with the recorded values. |  | The signed total and currency match; dates use the browser timezone. Paid shows the recorded Date Paid; Unpaid has no Date Paid row. |
| Select Back. |  | The Payouts list returns for the same organization and the recorded payout remains available. |

### SPT-5696: Dashboard - Finance - Payouts - Reconcile the selected payout summary

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Reconcile the selected payout summary

**Description:** Check Payout Summary against independently calculated figures for the sales and adjustments included in one existing payout. The summary includes Gross Sales, Net Sales, Gross Revenue, Net Revenue and Settlement Amount. Each heading has a different meaning; do not add all five together or assume Settlement Amount equals the overview total without reconciling the selected records.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* A finance setup owner identifies an existing payout containing sold tickets and at least one non-zero fee, refund or adjustment. They provide its full ID, the included transaction/item references, expected five summary totals and expected non-zero child counts/amounts from the saved accounting records—not copied from the current summary.
* Have one transaction belonging to a different payout in the same organization, with its reference and amount, as an exclusion check. Do not create or settle payouts to obtain data.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Finance → Payouts and select the recorded payout’s View Detail. |  | The full Payout ID matches the finance owner’s selected record. |
| Compare all five Payout Summary heading totals with the independently prepared figures. | Expected Gross Sales, Net Sales, Gross Revenue, Net Revenue and Settlement Amount. | Every signed total and currency matches its own expected figure. |
| Expand the summary groups containing the recorded sales, fees, refunds or adjustments. |  | The displayed non-zero child counts and amounts match the recorded included items, with deductions shown correctly. |
| Reconcile the displayed breakdown with the included and excluded transaction references. |  | Only the selected payout’s items contribute; the other payout’s transaction contributes nothing and no item is counted twice. |

### SPT-5697: Dashboard - Finance - Payouts - Expand and collapse payout summary groups

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Expand and collapse payout summary groups

**Description:** Expand and collapse one Payout Summary group without changing its totals or the other groups. Run SummaryGroup using the exact heading: GrossSales = Gross Sales; NetSales = Net Sales; GrossRevenue = Gross Revenue; NetRevenue = Net Revenue; SettlementAmount = Settlement Amount. The record selected for each run must have a non-zero child under that group; a zero-only group is not evidence that child rows can be opened.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* For SummaryGroup, the finance setup owner identifies an existing payout with at least one non-zero child row under that heading and records the expected child labels, counts and amounts.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts

**Parameters:**

SummaryGroup: GrossSales, NetSales, GrossRevenue, NetRevenue, SettlementAmount

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Finance → Payouts and open the recorded payout’s View Detail. |  | The selected payout’s Payout Summary appears. |
| Select SummaryGroup until its non-zero child rows are visible. | Heading mapping in Description. | The group expands and displays the expected child labels, Count and Totals. |
| Select the same group heading again. |  | Its child rows collapse; the heading total and the other groups’ displayed totals remain unchanged. |
| Select the group heading once more. |  | The same child rows reopen with unchanged labels, counts and amounts. |

### SPT-5698: Dashboard - Finance - Payouts - Load more payouts without missing or repeating rows

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Load more payouts without missing or repeating rows

**Description:** Scroll through a payout list that spans at least three batches. The list loads more rows while scrolling; it does not require a numbered page control. Verify the complete known set rather than assuming only the first visible rows exist.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* Use an organization with at least 15 existing payout records. The finance setup owner provides its complete expected payout list, with IDs, signed totals and statuses. No new payouts are generated during this case.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Finance → Payouts. |  | The initial payout rows load for the selected organization. |
| Scroll to the end of the loaded payout rows and continue scrolling as more rows load. |  | Additional payout rows append while earlier rows remain available; loading placeholders finish. |
| Continue until no more records load, then compare the full list with the prepared payout list. |  | Every expected payout is present once, with no missing or repeated record and no ordinary purchase-order row. |
| Open View Detail for one payout loaded after the first seven records. |  | Payout details shows that payout’s full ID and amount, not a row from the initial batch. |

### SPT-4834: Dashboard - Finance - Payouts - Block payout pages when an employee lacks access

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Block payout pages when an employee lacks access

**Description:** Verify both required page permissions independently. MissingPermission Reports means the employee retains Manage Transactions and Administer Transactions but lacks Manage Reports. Transactions means the employee retains Manage Reports and Administer Transactions but lacks Manage Transactions. Run each MissingPermission with each PayoutPage: List = Payouts; Details = an existing payout’s Payout details; Settings = Report Breakdown. Opening a copied page address is intentional here because direct-page access is the behavior under test.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Prepare an employee with the exact retained/missing permissions in Description, completed required authentication, and no unrestricted administrator override. Do not change their role during execution.
* A permitted employee copies the selected organization’s List, Details and Settings addresses and records one existing payout’s ID and total privately. The restricted employee belongs to that same organization.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts, employee-permissions

**Parameters:**

MissingPermission: Reports, Transactions
PayoutPage: List, Details, Settings

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the restricted employee, select the organization and inspect Finance navigation. |  | The Payouts and payout Settings entries are unavailable. |
| Open the privately supplied address for PayoutPage. | Use the address prepared by the permitted employee. | The page refuses access and does not display the payout list, payout overview/summary or grouping controls. |
| Return to Dashboard. |  | The employee can leave the restricted page without viewing payout values or changing a setting. |

### SPT-5699: Dashboard - Finance - Payouts - Show the empty payout list

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Show the empty payout list

**Description:** Open Payouts for an organization with no generated payout records and verify the completed empty state. A loading placeholder or a denied financial request does not count as an empty organization.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* Use an organization confirmed by the finance setup owner to have no generated payout records. Do not delete payouts or infer absence only from this page.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the prepared organization and open Dashboard → Finance → Payouts. |  | Payouts opens for the selected organization. |
| Allow the initial load to finish. |  | You have not received any payouts appears with no payout rows or View Detail buttons. |
| Reopen Payouts using Finance navigation. |  | The same empty state appears; no previous organization’s amounts or rows are shown. |

### SPT-5700: Dashboard - Finance - Payouts - Return safely from an unavailable payout link

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Return safely from an unavailable payout link

**Description:** Open an unavailable payout link and verify return to the current organization’s payout list. PayoutLink Missing uses an address whose full payout ID is confirmed not to exist; OtherOrganization uses an existing payout from an unrelated organization. The copied address is part of the access test. Neither run should display another payout’s financial information.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* Use an organization with at least one known accessible payout. A setup owner provides the selected PayoutLink privately and confirms the Missing ID does not exist, or the OtherOrganization payout is neither owned nor sold by the selected organization and has no shared access relationship.
* For OtherOrganization, use an employee without employment or broader authority over that other organization; avoid an unrestricted administrator account.

**Postconditions:**

* No payout, transaction, bank information or setting changes.

**Priority:** High

**Tags:** dashboard, payouts, edge-case

**Parameters:**

PayoutLink: Missing, OtherOrganization

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Finance → Payouts and confirm the selected organization’s known payout is available. |  | The expected payout list loads. |
| Open the supplied PayoutLink address. | Missing or OtherOrganization, as defined in Description. | The unavailable payout redirects to Payouts without displaying its overview or summary. |
| Open View Detail for the known accessible payout from the returned list. |  | The correct full Payout ID and recorded amount load; the unavailable link has not trapped the employee or exposed another organization’s record. |

### SPT-5701: Dashboard - Finance - Payouts - Keep payouts separate when switching organizations

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Keep payouts separate when switching organizations

**Description:** Switch between two organizations using the Organization selector while viewing Payouts. Each organization must show its own rows and currency without retaining the prior organization’s amounts.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* The employee belongs to two unrelated organizations with payout access in both. Choose one CAD and one USD organization with different existing payouts. Record their names, currencies and one full payout ID/signed total each. Do not change currency or any payout record.

**Postconditions:**

* No saved payout or organization configuration changes. Leave the originally selected organization active.

**Priority:** High

**Tags:** dashboard, payouts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the CAD organization and open Dashboard → Finance → Payouts. |  | The CAD list contains its recorded payout and CAD amount heading. |
| Use the Organization selector to select the prepared USD organization; reopen Finance → Payouts if navigation returns to Dashboard. |  | After loading, only the USD organization’s payouts appear and the amount heading uses USD. |
| Open View Detail for its recorded payout. |  | The full ID, signed amount and currency belong to the USD organization; no CAD payout values remain. |
| Select the original CAD organization and reopen Finance → Payouts. |  | Its recorded CAD payout returns with no USD organization rows. |

### SPT-4799: Dashboard - Finance - Payouts - Save payout report grouping

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Save payout report grouping

**Description:** Select Report Breakdown grouping and verify its automatic save. PayoutGrouping Combined selects Combined; Individual selects Individual. Combined groups eligible sales together; Individual generates a payout per eligible event. The explanation states that changes affect future payouts. This case verifies the saved preference and protection of existing records; it does not generate a new payout.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* The employee also has **Manage Organization Info** (VP_MANAGE_VENUE_INFO), required to save the organization’s grouping choice.
* Use an organization reserved for these checks with no scheduled payout generation or active financial processing while the setting is changed. Record its original grouping and the ID, signed total, status and paid date of one existing payout.
* Before the run, the setup owner has saved the opposite grouping to PayoutGrouping so selecting the target makes a real change. Record that starting value for restoration.

**Postconditions:**

* Restore the recorded original grouping through Settings and reopen to verify it. No payout is generated or settled.

**Priority:** High

**Tags:** dashboard, payouts

**Parameters:**

PayoutGrouping: Combined, Individual

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Finance → Payouts → Settings. |  | Report Breakdown shows Combined and Individual with their explanations and the recorded starting selection. |
| Select PayoutGrouping. | Combined or Individual. | The selected choice saves automatically; there is no separate Save button. |
| Leave and reopen payout Settings. |  | PayoutGrouping is still selected. |
| Open Payouts and View Detail for the recorded pre-existing payout. |  | Its ID, signed total, status and paid date remain unchanged; changing grouping has not rewritten the existing payout. |

### SPT-5702: Dashboard - Finance - Payouts - Refuse grouping changes without organization editing permission

**Publication status:** published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Finance - Payouts - Refuse grouping changes without organization editing permission

**Description:** An employee may open payout Settings with report/transaction permissions but cannot save the organization’s grouping without Manage Organization Info. Verify a selection attempt cannot change the stored preference; a radio appearing selected immediately is not proof of a saved change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Reports** (VP_MANAGE_REPORTS), **Manage Transactions** (VP_MANAGE_FINANCIALS), and **Administer Transactions** (VP_ADMINISTER_TRANSACTIONS). Complete their required authentication. Avoid an unrestricted administrator override.
* The employee lacks **Manage Organization Info** and has no unrestricted administrator override. A second organization editor with Manage Organization Info and the payout-view permissions is available in a separate signed-in session.
* Use an organization reserved for these checks with no scheduled payout generation or active financial processing. The editor records its saved grouping and existing payout ID/total before the attempt. Do not change either employee’s role during execution.

**Postconditions:**

* No saved setting or payout changes. If an unexpected save occurs, have the organization editor restore the original grouping and record the actual result.

**Priority:** High

**Tags:** dashboard, payouts, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the restricted employee, open Dashboard → Finance → Payouts → Settings. |  | The recorded saved grouping appears. |
| Attempt to select the opposite grouping. | Combined if Individual was saved; Individual if Combined was saved. | The change is not accepted as a saved organization setting. |
| Reload payout Settings. |  | The original saved grouping is shown. |
| As the organization editor in the separate session, reopen Settings and the recorded existing payout. |  | The saved grouping and payout ID/total are unchanged. |

> [!note] Generated attachments removed
> Generated snapshots, JSON exports and frozen publication copies were deleted on 2026-10-17 at the user’s request. Published case IDs, recorded results and test definitions remain in this note. Read Qase again before preparing future changes.

## Coverage, reuse and limits

| Proof target | Owner / status |
| --- | --- |
| Correct list, paid/unpaid status, browser-local dates, shortened ID, signed total/currency and timing notice | Refined4396; TC-1 verifies the full ID and paid-date display. Paid means the saved payout has a settled date, not independently verified bank arrival. |
| Both row and View Detail opening controls; Back | TC-1; four OpenMethod × PayoutState runs. |
| Summary figures, selected-payout item scope, fees/refunds/adjustments, counts and signed deductions | TC-2; independent saved-record figures required. No generic gross-minus-fees formula or forced equality with the overview total. |
| All five summary headings and child-row expand/collapse | TC-3; zero-only child rows are not promised visible. Tooltip wording is source-accounted; keyboard/mobile tooltip parity is deferred. |
| Incremental scrolling and later-row detail action | TC-4; at least 15 existing records crosses three seven-record requests. List order is backend -id, not a user-selectable date sort. |
| Missing Reports or Transactions permission; direct List/Details/Settings access | Refined4834; six MissingPermission × PayoutPage runs. Hidden navigation alone is not API authorization proof. |
| Empty state; missing/other-organization detail | TC-5/6; not inferred from a failed request. Other-organization setup excludes ownership/reseller access allowed by backend. |
| Organization and currency isolation | TC-7; shared switching path, not another copy of the row-value case. |
| Both grouping options, automatic save, reopen, historical record protection and cleanup | Enhanced4799; Combined and Individual retained. TC-8 owns the distinct denied-save role. Actual future grouping/generation stays deferred to financial backend/integration proof. |
| Payment info link, bank-field access, successful save, signer/authorization and notification | Reuse1653,1650,5530,1654 in1182;1650 already names Finance → Payouts → Payment info as a shared entry. No duplicated bank form case. Current bank permission and legacy wording should be source-checked when executing those older definitions. |
| Loading and error recovery | Normal loading completion is part of the base cases. Controlled list, detail and summary failures/retry, missing summary while overview loads, and grouping-save rejection/race recovery remain deferred. No response failure was injected. The source has an explicit non-404 overview alert; summary errors do not have the same explicit handling. |
| Amount zero, midnight boundaries, unusual currencies, stale roles and concurrent grouping edits | Deferred edge-depth beyond this baseline. Negative totals are explicit in4396. |
| Payout scheduling, generation, provider processing, exports and actual bank deposit | Not executed and outside this page baseline. Existing admin1769/1771 and Settlement Report881 have different actions/results; they do not prove this screen or vice versa. |

**Preservation / duplicate decision:**4396 keeps list verification; its original row/action opening, overview and Back assertions move toTC-1, and its financial breakdown assertion moves toTC-2.4834 keeps denied access; its empty-state assertion moves toTC-5 and unavailable-record/recovery assertions toTC-6. Its generic non-404 handling is retained as deferred controlled-error scope, not quietly called a pass.4799 keeps Combined/Individual, explanations, automatic persistence and restoration. The user approved these splits and the corresponding refinements/additions were published together in the reviewed batch. The original definitions remain preserved in the evidence baseline and frozen publication source. Distinct start state, action or principal result separates the eight new drafts; repeated opening steps alone are not a duplicate.

## Approved publication scope — published and verified

**Project SPT /existing suite1011:** create TC-1–8 and refine4396,4834,4799 together (11 definitions /41 step rows). The splits in the preservation map above apply atomically as this reviewed scope; controlled non-404 failures remain deferred and are not claimed covered by the base cases. No suite move, rename, creation or deletion; shared banking cases remain unchanged. Existing-case updates select Title, Description, Preconditions, Postconditions, tags, parameters, steps and suite only; unrelated priority/type/behavior/layer metadata remains unchanged.

| Label / ID | Action | Title | Suite | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| SPT-4396 | Update | Dashboard - Finance - Payouts - Show the correct payout list | 1011 | dashboard, payouts | RowKind: PaidPositive, UnpaidPositive, UnpaidNegative | 4 |
| [SPT-5695](https://app.qase.io/case/SPT-5695) (TC-1) | Create | Dashboard - Finance - Payouts - Open an existing payout and return to the list | 1011 | dashboard, payouts | OpenMethod: Row, ViewDetail; PayoutState: Paid, Unpaid | 4 |
| [SPT-5696](https://app.qase.io/case/SPT-5696) (TC-2) | Create | Dashboard - Finance - Payouts - Reconcile the selected payout summary | 1011 | dashboard, payouts | None | 4 |
| [SPT-5697](https://app.qase.io/case/SPT-5697) (TC-3) | Create | Dashboard - Finance - Payouts - Expand and collapse payout summary groups | 1011 | dashboard, payouts | SummaryGroup: GrossSales, NetSales, GrossRevenue, NetRevenue, SettlementAmount | 4 |
| [SPT-5698](https://app.qase.io/case/SPT-5698) (TC-4) | Create | Dashboard - Finance - Payouts - Load more payouts without missing or repeating rows | 1011 | dashboard, payouts | None | 4 |
| SPT-4834 | Update | Dashboard - Finance - Payouts - Block payout pages when an employee lacks access | 1011 | dashboard, payouts, employee-permissions | MissingPermission: Reports, Transactions; PayoutPage: List, Details, Settings | 3 |
| [SPT-5699](https://app.qase.io/case/SPT-5699) (TC-5) | Create | Dashboard - Finance - Payouts - Show the empty payout list | 1011 | dashboard, payouts | None | 3 |
| [SPT-5700](https://app.qase.io/case/SPT-5700) (TC-6) | Create | Dashboard - Finance - Payouts - Return safely from an unavailable payout link | 1011 | dashboard, payouts, edge-case | PayoutLink: Missing, OtherOrganization | 3 |
| [SPT-5701](https://app.qase.io/case/SPT-5701) (TC-7) | Create | Dashboard - Finance - Payouts - Keep payouts separate when switching organizations | 1011 | dashboard, payouts | None | 4 |
| SPT-4799 | Update | Dashboard - Finance - Payouts - Save payout report grouping | 1011 | dashboard, payouts | PayoutGrouping: Combined, Individual | 4 |
| [SPT-5702](https://app.qase.io/case/SPT-5702) (TC-8) | Create | Dashboard - Finance - Payouts - Refuse grouping changes without organization editing permission | 1011 | dashboard, payouts, employee-permissions | None | 4 |

**Approved and completed:** the user replied “Yes, publish this batch”. The reusable batch command completed all11 operations. A complete fresh readback verified41 step rows and six parameterized definitions, with each new title appearing once. The project grew from2,158 to2,166 cases; the other2,155 existing cases and all317 suites were preserved.

## Publication record

| Local draft | Published case |
| --- | --- |
| TC-1 | [SPT-5695](https://app.qase.io/case/SPT-5695) |
| TC-2 | [SPT-5696](https://app.qase.io/case/SPT-5696) |
| TC-3 | [SPT-5697](https://app.qase.io/case/SPT-5697) |
| TC-4 | [SPT-5698](https://app.qase.io/case/SPT-5698) |
| TC-5 | [SPT-5699](https://app.qase.io/case/SPT-5699) |
| TC-6 | [SPT-5700](https://app.qase.io/case/SPT-5700) |
| TC-7 | [SPT-5701](https://app.qase.io/case/SPT-5701) |
| TC-8 | [SPT-5702](https://app.qase.io/case/SPT-5702) |

**Verified:**8 creates,3 updates,41 step rows,6 parameterized definitions, all in suite1011. Full-field comparisons covered Title, Description, Preconditions, Postconditions, suite, tags, parameter values and every step; create metadata and retained update metadata also matched. No duplicate create, deletion or suite change.

**Not executed:** payout generation/settlement, actual bank delivery, grouping changes in the product, restricted-role flows and independent financial reconciliation. Controlled non-404 failure/recovery and the other deferred edge work above remain open; publication does not establish a product pass.

Publication verification · Apply receipt · Saved case fields · Frozen reviewed source.

## Short evidence

* Reused the complete SPT snapshot ending **2026-10-17T22:53:42.262Z**: **2158 unique cases /317 suites**, all reported pages read. Read full4396/4799/4834 plus shared banking cases; global full-field matching found102 related records, mostly report setup mentions and different resale/advance/refund workflows. Inspected the close suite, shared banking and admin/report matches;931 tests Transactions advance details,888/5515 produce PDFs, and5239 tests child-registration policy, so none duplicates these payout-page actions. Drafting reused that snapshot; publication subsequently used complete fresh before/after readbacks.
* Backend **b5f397a0438910435e0d537f47e12d6064d7e019**: financials/api/venue_based/viewsets/invoices.py (organization scope, invoice permissions, payout-stats); financials/queries/invoice/projections.py (only sales attached to selected payout items); reports/services/financial_reports/financial_report.py; venues/constants/employment.py (visible permission names); venues/api/user_based/{viewsets,serializers}.py and venue.py (grouping choices and Manage Organization Info update gate); financials/services/payout_service/base/base_grouped_payout_service.py (future grouping consumer). Manage Transactions includes child authority; Administer Transactions is spelled out because invoice detail/summary permissions use it.
* Frontend **7e527b0285349e5d9537731f97f09b414001778c**: next-app/pages/manage/finance/payouts/{index,[id],settings/index}.tsx; reports/payouts routes/config, useReportsPayoutsRoutes, PayoutsTable/usePayoutsTableColumns, payout-utils, PayoutOverview, PayoutBreakdown, BreakdownSettingForm; shared ReportAccordion, paginated-list/table hooks, useNotFoundRedirect, date formatting and invoice service. List: two payout invoice types, seven per request, -id ordering; status derives from settled_on; browser-timezone dates; Settings auto-save sends an organization update. Legacy Dashboard Reports → Payouts additionally uses next_payouts; that old-shell entry is a conditional manual-only migration pass, not substituted by a direct link.
* Non-saving browser enrichment: beta, Christian Valdez, selected organization1721 Chris Stripe OAuth confirmed in the selector; exact role grants were not audited. Read the populated list, one Unpaid negative-total detail, Gross Sales child rows and Settings (Combined selected), plus visible Finance/Payouts/Settings/Payment info links. Restored Payouts and closed menus; no organization switch, radio selection, bank input, Save, payout action or job. These observations establish wording/navigation only, not financial reconciliation or restricted-role execution. Paid/empty/other-organization/USD states remain source-backed and unexecuted.

[[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts|Reports/payout reconciliation handbook]] · Existing definitions · Pre-publication definition and duplicate review.
