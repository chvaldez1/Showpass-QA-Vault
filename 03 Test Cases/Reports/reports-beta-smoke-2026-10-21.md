---
title: Reports beta smoke — new Reports page
date: 2026-10-21
status: Controls and responsive UX audited; three Major gaps and three Minor UI defects; release not approved
---

# Reports beta smoke — new Reports page

**Start:** 2026-10-21T16:20:04.567075-06:00 · beta.showpass.com · existing Codex in-app browser, tab 1. Signed-in display Christian Valdez; selected organization **1859-QA-CAD**, verified in the navigation menu. Reports access is observed; exact employee permissions and backend role are not independently confirmed.

**Source:** [[03 Test Cases/Reports/reports-qase-test-cases]] (TC-100/101 and the safe page subset of SPT-4795), Reports handbook and canonical financial/evidence gates.

**Result:** The new page loads, searches and filters saved reports, rejects a missing required event, and saved/reopened two new definitions. **Event Summary CSV downloaded; Product Summary PDF opened in the browser. The subsequent unique-control audit inspected all 40 report types / 47 supported type-format combinations and confirmed three Major gaps:** Product Summary PDF lacks Product Attributes; Event Summary PDF lacks Ticket Types; Transactions lacks Select all invoices. No Critical defect was established. Financial correctness remains unverified against an independent sales/adjustment ledger; this is not a release pass.

**UX/UI extension result:** Desktop and mobile-sized layouts were exercised at five viewport sizes. Three additional **Minor UI/accessibility defects** are confirmed: calendar clipping at 320px, keyboard activation of the search-clear icon failing, and unnamed row-action buttons. Mobile horizontal table navigation plus an unnamed delete target is a separate usability improvement. Physical-phone/native date input, touch, software keyboard and screen-reader execution remain unverified. Details below under Desktop/mobile UX and UI extension.

**Intent:** Test the new Reports page through the active preview banner, retain saved definitions and usable filters, and exercise Event Summary CSV and Product Summary PDF. The user clarified that only the new page is in scope. Earlier legacy observations below are retained as the baseline for the missing control, not a separate legacy test campaign. No broad generation over all report types.

**Data boundary:** Existing report definitions, orders, products and sales were not changed. Two uniquely named new reports are **Preserve-for-review**. No existing report edit-save/delete, purchases, refunds, payouts, external recipients or recurring schedules. Preview was selected through the banner and left active, as requested. No Qase writes.

**Execution limits:** Existing Codex in-app browser, desktop viewport, one organization and signed-in actor. Organization timezone was not independently established; the list displays MT, the chosen event displays EDT, and the computer is America/Edmonton. Cross-timezone/date-boundary calculations were not executed. Effective report availability was observed; rollout flags and the employee's full permission set were not independently read. Local source is behavior evidence, not proof of the deployed revision.

**Scope extension — unique report controls:** The user requested checking the different report-specific fields on the new page. All 40 types and their 47 supported format combinations were inspected through visible form controls. Representative dependent choices were selected without saving. An unsaved Product Summary preview was already present in the original tab; it was preserved and a temporary working tab was used. No additional report was saved/generated, no email sent, and no legacy page opened in this extension. Broad financial reconciliation, every saved definition and every column's output remain outside this form-control audit.

## Coverage ledger

| Proof target | Status | Evidence / limit |
| --- | --- | --- |
| Actor, organization and preview entry | Executed — pass | Christian Valdez / 1859-QA-CAD; Try the new experience opens the new Reports table inside the existing Dashboard shell. Banner remains visible. |
| Preview switch-back control | Executed — pass | Earlier baseline check used Switch back; final state is the new page. No rollout flag was changed. |
| Saved list, exact search, report-type filter, no-results and reset | Executed — pass for sampled records | Exact Event-Summary-21-10-26T3729 search returns its row; Event Summary filter excludes other types; unmatched name shows No saved reports match your filters. Clearing restores results. Not an exhaustive check of all saved pages. |
| Saved row action access | Executed — menu only | Download, Edit, Clone, Delete reachable on direct-download reports. Existing reports were not saved, cloned, deleted or regenerated. |
| Existing saved Event Summary opens | Executed — pass for sampled definition | Report 3793 retains HING HING, CSV, One Time, empty recipients and selected columns; final list still shows its original 2:37 PM MT update. This is not a bulk readback of every report. |
| Report choices and conditional builder controls | Audit executed; three Major gaps | All 40 types / 47 supported format combinations inspected. RPT-01–03 below. This proves control availability only, with sampled dependent selection, not all report executions. |
| Event Summary CSV save, reopen and actual file | Executed — pass for smoke | New report 3800, HING HING. CSV has 51 headers and exactly one data row, with the selected event. See export-checks.json and event-summary-new.csv. |
| Product Summary PDF save, reopen and actual rendering | Executed — pass for smoke, scope control failed | New report 3801 reopens as Product Summary / PDF / Anime Shirt / One Time / no recipients. Its three-page PDF opens, identifies Anime Shirt and the unique report name, and shows financial and inventory sections. RPT-01 prevents attribute selection. Full PDF pagination/financial verification deferred. |
| Required-scope validation | Executed — pass | Save on a new Event Summary with no event gives Error! Select at least one event. No third saved report was created. |
| Date and column controls | Executed — access only | Today preset selects successfully; Customize columns expands the financial/inventory choices. Unsaved form abandoned. Date calculations and customized export contents not proved. |
| Financial/source-record reconciliation | Blocked — no independent ledger prepared | No independently recorded source orders, refunds, exchanges, service-fee amounts or earnings oracle. File completion and arithmetic appearance do not establish correct money. |
| Mobile/responsive and physical device | Deferred | Desktop smoke only; no viewport override or physical device test. |
| Permissions, cross-organization isolation, delayed failure/retry | Deferred | One actor/organization; no failure injection or cross-organization retrieval. |
| Clone/delete, email, schedules, limits and volume | Deferred | Outside the two-export smoke and existing-record safety boundary. |
| Dependent ticket types, membership levels, gift-card amounts | Executed — sampled selection passes | HING HING → GA; Fight Night Scan Access → Fight Pass / Next Level; GIFT CARD 1 → 50.00. Labels could be selected; no save. Membership levels remain selectable on Member Report, History and Benefit Usage; Member Seating correctly has no level selector. |
| Status, invoice, employee and grouping controls | Executed — access / sampled selection | Will Call Issued selected; payout/advance/employee choices loaded; one payout invoice and Main Events grouping selected; Select all invoices checked on Settlement and its individual picker hid. These do not prove financial output. |
| Campaign child selection | Blocked — no selectable campaign found | Marketing Campaign Summary's campaign picker opened and returned No results found. Campaign selection and scope-dependent contents were not executed. |
| Parent-organization inclusion | Blocked — eligibility not established | Parent status not independently verified. Source also excludes Transactions from the new sub-organization helper; treat as related source risk under RPT-03, not a live parent-organization reproduction. |

## Reports → Create report — unique control inventory

This is an availability audit, **not 40 passed report-generation tests**. All registered report types were present in the picker. Formats matched the backend catalog; common name/date/delivery controls are omitted from the table to keep the differences visible. No mismatch outside the three stated findings was observed in the inspected control states.

| Report | Supported formats inspected | Distinct scope / control result |
| --- | --- | --- |
| Transactions | CSV | Events / Products; **Select all invoices missing — RPT-03** |
| Customers and Employees | CSV | Events → Ticket types; GA selectable |
| Will Call | CSV | Events / Ticket types / Products / Ticket statuses; Issued selectable |
| Itemized Sales Report | CSV, PDF | All invoices / Events / Products / Membership groups and levels; CSV also Ticket types / Employees / Purchase source platforms |
| Settlement Report | CSV, PDF | Payout invoices / All invoices; PDF grouping |
| Advance Report | CSV, PDF | Advance invoices / All invoices; PDF grouping |
| Ticket Sales History | PDF | Events / Ticket types / Purchase source platforms |
| Employee Sales History | PDF | Events / Ticket types / Employees / Purchase source platforms |
| Event Summary | CSV, PDF | Events; PDF **Ticket Types missing — RPT-02** |
| Event Audit | XLSX | Events; no date panel, matching catalog |
| Base Ticket Revenue Report | PDF | Events / dates |
| Event Settlement Report | PDF | Events; no date panel, matching catalog |
| Payment Type Breakdown | PDF | Events / Products / Membership groups and levels / PDF grouping |
| Financial Scan Summary | PDF | Events / dates |
| Event Financial Summary | PDF | Events / All events / PDF grouping |
| Ticket Type Financial Summary | PDF | Events / All events / PDF grouping |
| Ticket Type Summary | CSV | Events → Ticket types; no date panel |
| Product Summary | CSV, PDF | Products; PDF **Product Attributes missing — RPT-01** |
| Password Used Summary | CSV | Events; no date panel |
| Seller Stats | CSV | Events / Products / Membership groups and levels |
| Shipping Fulfillment Stats | CSV | Events / Products / Membership groups; no level selector required by catalog |
| Ticket Scan History Report | CSV, PDF | Events / Ticket types; Products available for CSV, unsupported for PDF selection |
| Employee Scan History Report | PDF | Events / Ticket types / Employees |
| Seller Cash Out Report | PDF | Employees / dates |
| Discount Creation Report | CSV | Dates, no item selector required |
| Discount Usage Stats | CSV | Dates, no item selector required |
| Holds Stats | CSV | Events / Ticket types / Products / Membership groups and levels |
| Event/Product Inventory Report | CSV | Events / Products; no date panel |
| Member Report | CSV | Membership groups → levels; Fight Pass selected |
| Member History Report | CSV | Membership groups → levels; selected Fight Pass retained |
| Member Benefit Usage Report | CSV | Membership groups → levels; selected Fight Pass retained |
| Member Seating Report | CSV | Membership groups; no level selector required by catalog |
| Waitlist Subscribers Report | CSV | Events → Ticket types; no date panel |
| Reselling Submissions Report | CSV | Events; no date panel |
| Donations History | CSV | Dates; no event/product selector required |
| Gift Card Recipient Report | CSV | Gift cards → denominations; 50.00 selected |
| Marketing Campaign Summary | CSV | Events / UTM campaigns; picker available, no result to select |
| Marketing Campaign Detail | CSV, PDF | Events / Products / Membership groups / UTM campaigns; child selection blocked by available data |
| Ticket Credit Usage Report | CSV | Events / dates |
| Custom Consent Items | CSV | Events / dates |

**Format checks:** Itemized PDF correctly hides Ticket types, Employees and Purchase source platforms. Settlement/Advance PDF expose Individual Occurrences and Main Events grouping. The grouping control also appears for Payment Type Breakdown, Event Financial Summary and Ticket Type Financial Summary. CSV column panels open on the seven dual-format types; Event/Product Summary PDF expose inventory/financial checkboxes, while the other sampled PDFs have fixed layouts without that panel. No file was generated to validate customized columns in this extension.

**Special-case source review:** The generic catalog alone is insufficient: it lists Events for Event Summary and Products for Product Summary, but their PDF generators and the earlier template additionally support Ticket Types and Product Attributes. This is why those two PDF controls were separately challenged after the catalog comparison.

Audit evidence: [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/report-field-source-contract.json|Backend field contract]], [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/unique-report-ui-checks.json|40 builder observations]], [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/unique-report-format-checks.json|14 CSV/PDF observations]], [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/unique-dependent-control-checks.json|Dependent selector checks]], [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/unique-report-field-comparison.json|Coverage comparison — 47 combinations]].

## Findings

### RPT-01 — Product Summary PDF cannot select product attributes

**Severity:** Major · **Confidence:** Confirmed UI parity gap · **Safety:** no data change to reproduce · **Proof target:** report scope remains selectable on the new builder.

**Preconditions:** On beta, use an employee able to open Reports for organization 1859-QA-CAD, with Product Summary available. Use Anime Shirt, which has the attributes Unisex - Male and Unisex - Female. The new Reports preview banner is active. The run-created report 3801 is preserved as an alternative starting point; do not save changes to it.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| 1. Open Reports and choose Create report. | Same organization and employee | New report builder opens with the preview banner still active. |
| 2. Choose Product Summary and PDF. | Supported Product Summary PDF | Product report controls appear. |
| 3. Select Anime Shirt and inspect Report scope. | Anime Shirt; Unisex - Male / Unisex - Female | The employee can choose the product's attributes, preserving the previous report-scoping function. |

**Actual:** At step 3, Report scope contains the product picker and Selection limit reached, then proceeds to Columns and Delivery. **No Product Attributes control appears.** Reopening saved report 3801 gives the same result after Anime Shirt's name finishes loading. The earlier legacy PDF baseline shows both attribute choices for this same product. CSV behavior is not claimed by this finding.

**Impact:** An employee cannot choose the same variant-specific scope from the new Product Summary PDF builder. Incorrect exported totals, lost saved attribute filters and financial loss were **not** demonstrated. Do not classify those as confirmed defects.

New-page evidence, with the settled product name and banner:

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/16-product-pdf-missing-attributes.png]]

Earlier same-product PDF baseline:

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/12-legacy-product-attributes.png]]

**Source support:** Backend Report.product_attributes is a persisted field exposed by the report serializer; the previous template renders Product Attributes for Product Summary. The new ReportProductScopeFields component renders its checklist only when helpers.hasField(PRODUCT_ATTRIBUTES) permits it. These support the missing-control investigation; the exact deployed metadata/root cause was not established. Source references below.

**Reset:** Leave without saving. Existing product and reports remain unchanged. **Release classification:** open Major migration scope gap; do not count Product Summary PDF scope parity as passed. This finding alone does not prove a Critical financial invariant failure.

### RPT-02 — Event Summary PDF cannot select ticket types

**Severity:** Major · **Confidence:** Confirmed UI gap against source-defined behavior · **Safety:** no data change · **Proof target:** choose the intended ticket-type scope for an event PDF.

**Preconditions:** Beta, same employee / organization with Reports access, new preview active. HING HING is selectable and has the GA ticket type. The same event's GA checkbox was loaded and selected successfully in Customers and Employees as an availability control; that does not count as an Event Summary pass.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| 1. Open Reports → Create report and choose Event Summary / PDF. | Same organization and employee | Event Summary PDF builder appears. |
| 2. Search for and select HING HING. | Event with GA ticket type | Ticket Types checklist becomes available for this event, in addition to PDF inventory and financial choices. |
| 3. Inspect Report scope and the available PDF controls without saving. | GA | GA can be selected as the report's ticket-type scope. |

**Actual:** At step 2, HING HING is selected and the one-event limit message appears, but there is no Ticket Types checklist. The form proceeds to Columns and Delivery. The local backend EventSummaryPDF explicitly filters and produces per-type sections from report.ticket_types; the earlier template renders the PDF checklist. Source: apps/tickets/pdfs/reports/event_summary.py:37 and :77; apps/main/templates/dashboard/reports/index.html:706; frontend ReportEventScopeFields gates the checklist on hasField(TICKET_TYPES), absent from Event Summary's generic catalog fields.

**Impact:** Cannot request the supported ticket-type-specific PDF from the new builder. Actual erroneous financial amounts or an existing saved filter being erased were not executed. Saving a previously filtered definition is therefore an unsubmitted risk, not a confirmed destructive outcome.

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/17-event-pdf-missing-ticket-types.png]]

**Reset:** Abandon the unsaved form. **Release classification:** Major migration scope gap remains open; no Critical financial failure proved.

### RPT-03 — Transactions cannot select all invoices

**Severity:** Major · **Confidence:** Confirmed UI gap against source-defined behavior · **Safety:** no data change · **Proof target:** generate a date-scoped Transactions report across all invoices.

**Preconditions:** Beta, same employee / organization with Reports access, new Reports preview active. This base option does not require a parent organization. Parent-only Include Sub-organizations is a related conditional path, not a prerequisite for this reproduction.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| 1. Open Reports → Create report. | New preview active | Report builder appears. |
| 2. Choose Transactions and CSV. | Transactions | Select all invoices is available alongside the supported date controls. |
| 3. Inspect Report scope without saving or generating. | Any allowed date range | The employee can choose all invoices rather than being limited to one Event or Product. |

**Actual:** At step 2, dates and Event/Product pickers appear, but Select all invoices is absent. This is a missing control, not a failed export job. It was reproduced in a fresh builder and again after changing from another type.

**Impact:** The supported date-scoped all-invoice Transactions workflow cannot be configured from the new page. Completeness of an existing export and saved-report behavior were not executed. For a parent organization, inclusion of sub-organizations is an additional source-backed risk: the new helper restricts that option to Itemized Sales; a qualifying parent organization's live branch was not verified.

Backend source: catalog.py:167 lists is_select_all_invoices / is_select_from_sub_orgs for Transactions; Report.validate_transaction_selection at saved_reports.py:175 validates CSV, dates of at most one year and parent-only inclusion. The earlier template explicitly offers Select All Invoices for Transactions. Frontend report-constants-utils.ts:147 omits Transactions from supportsSelectAllInvoices and :155 limits supportsSelectFromSubOrgs to Itemized Sales. The new ReportScopeSection uses those helpers to render the controls.

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/18-transactions-missing-all-invoices.png]]

**Reset:** Abandon the unsaved form. **Release classification:** Major migration access/scope gap remains open. No missing money or Critical financial-output failure was established.

## Evidence and actions

Initial page: `/dashboard/reports/` displayed the legacy builder and saved cards. The displayed preview control opened `/manage/reports/` inside that shell. Final page remains that new Reports table with **You’re trying the new version of this page** visible.

| Preserved new definition | Configuration / observed result |
| --- | --- |
| [Event report 3800](https://beta.showpass.com/manage/reports/3800/edit/) | QA Reports Smoke Event CSV 2026-10-21 22:22:56; HING HING; Event Summary CSV; One Time; empty recipients and custom date endpoints. Saved, reopened, generated. |
| [Product report 3801](https://beta.showpass.com/manage/reports/3801/edit/) | QA Reports Smoke Product PDF 2026-10-21 22:25:24; Anime Shirt; Product Summary PDF; One Time; empty recipients and custom date endpoints. Saved, reopened, generated. |

CSV was parsed from the actual browser download, not from UI status: 1,151 bytes, 51 columns, one data row, Event HING HING. Header/data widths agree. SHA-256: a38cf775382bfe22aa7fd37aebe678024aab52c50f97008b20dba54e7f268c85. Financial values in that row are observations, not independent expected amounts.

- [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/event-summary-new.csv|Actual migrated CSV]]
- [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/export-checks.json|CSV parse checks]]

Both download listeners initially timed out. That was **not** an application failure: the CSV existed in Downloads, and the PDF opened in a second browser tab. Both completion results are now resolved. Earlier baseline checking also downloaded the run-created Event report once from the legacy view; no additional definition was created and that repeat is not counted as new-page proof. No further legacy checks followed the user's scope clarification.

Generated Product Summary PDF visibly opened:

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/13-product-pdf-opened.png]]

Final new-page list showing the two preserved reports:

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/14-new-reports-final-list.png]]

Required event validation:

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/15-required-event-validation.png]]

### Sources reviewed

- [[00 Start Here/World-Class Software Quality Standard]]; [[06 Prompts/Interactive Browser Release Testing]]; [[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts]]; [[00 Start Here/Showpass QA Handbook/03 Evidence and Expected Results]].
- Backend checkout /Users/christianvaldez/Documents/Showpass/repos/web-app at bda0dd85f003b598c587c806f0df93a9e2eb86d6: apps/reports/models/saved_reports.py:106; apps/reports/api/venue_based/serializers.py:37; apps/main/templates/dashboard/reports/index.html:737; Reports viewsets and Dashboard preview selection.
- Frontend checkout /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend at bda3539bbab30d0215a2156d2153b4ed8b041ba6: packages/core/src/app-contexts/dashboard/features/reports/ui/components/report-scope/ReportProductScopeFields.web.tsx:65; ReportScopeSection.web.tsx:102; utils/report-payload-utils.ts:171; report service export and browser download helper.
- Existing case definitions are planning evidence only. This execution did not read or update Qase and does not mark SPT-4795, a full report-specific case, or either local multi-view smoke case completely passed.

## Final state and recommendation

### Desktop/mobile UX and UI extension — completed with limits

**Intent:** An organizer can find a saved report and operate the new report builder at desktop and narrow widths without clipped controls, overlapping content, lost focus or unclear feedback. New Reports preview only; preserve the original tabs and existing report definitions. No exports, emails, schedules or successful saves in this extension.

**Executed views:** desktop 1440 × 900 and 1024 × 768; mobile-sized 390 × 844 and 320 × 740; landscape-sized list 844 × 390. These are desktop-browser viewport checks, not a physical phone or mobile-browser certification. The temporary viewport override was reset. Source InputDatePicker uses device detection: single-date inputs on a recognized phone use a native date input, so the clipped desktop popover must not be presented as a confirmed iOS/Android defect.

**Result:** The large desktop view and mobile builder generally fit. The saved table remains a horizontally scrolling desktop table at narrow widths: metadata/actions can be reached, but the report name is no longer visible when acting. Three Minor defects and the usability improvement below remain open; no Critical issue was established. The three earlier Major missing-control findings remain separate.

| UX proof target | Status | Executed evidence / limit |
| --- | --- | --- |
| Desktop 1440 list/header/filter layout | Passed | Readable table and filter sidebar; no page-wide horizontal overflow. ux-01. |
| Compact desktop 1024 | Passed with usability friction | Open filter sidebar clips Delivery/actions into horizontal table scroll; closing Filters restores table space. ux-02/03. |
| Mobile-sized 390/320 list and header | Usable with improvement | Reports/Create report/Filters fit; table must be horizontally scrolled for metadata and actions. Name is then off-screen. ux-04/05/10. |
| Row action keyboard and menu fit | Passed for sampled row | Enter opens; ArrowDown navigates; Escape closes and returns focus. Menu fits at 390. Accessible name fails separately: UX-03. |
| Delete confirmation and Cancel | Passed safety; usability improvement | Confirmation and Cancel/Delete fit at 390; Cancel leaves the report present. The confirmation does not identify the report: UX-04. No deletion. |
| Mobile Filters / type / Clear / no-results | Passed after settled input | Drawer opens/closes; Product Summary filter shows its matching row; Clear restores rows; settled unmatched query produces readable no-results. Fast close has conflicting evidence below. |
| Keyboard search clearing | Failed — UX-02 | Enter and Space leave query unchanged; normal pointer activation clears it. Header Clear provides a recovery path. |
| Builder 320/390 stacking and long selection | Passed for sampled controls | Fields and submit buttons stack; 390px long membership name truncates inside its selected chip, with remove action available; no document overflow before calendar opens. ux-11/16. Full-name disclosure on real touch was not tested. |
| Calendar | Failed at 320 — UX-01; passed fit at 390 | 332px popover clips at 320; 390 popup fits and date selection succeeds. Real-phone native date input is unexecuted. ux-12/13. |
| Columns and submit actions | Passed for sampled form | Expanded 51 Event Summary CSV column choices without document overflow at 390; Hide collapses them; Save/Save and generate remain reachable. ux-14/15. Customized export contents not retested. |
| Invalid form feedback | Passed | Owned unsaved Event Summary without an event shows Select at least one event. No definition created. Error visible near the top; no inline error/focus move to the missing selector was observed. ux-14. |
| Report-type keyboard | Passed for sampled control | ArrowDown opens choices; Escape dismisses. Enter alone on the closed control did not open it; not required for this pass. Search-selector keyboard selection was not fully proved. |
| Unsaved Back | Observed usability risk | Owned name/date/membership selection discarded by Back without a discard prompt. No supported autosave contract was established; a prompt is an improvement proposal, not a confirmed persistence defect. |
| Landscape 844 × 390 | Passed list/header fit only | Header and list/no-results remain visible. Builder/popover landscape interactions deferred. ux-22. |
| Phone, accessibility and visual conformance | Deferred | Physical touch, mobile Safari/Chrome, native date input, software-keyboard occlusion, screen-reader execution, browser zoom and full contrast conformance require dedicated client/assistive-device execution. No blanket accessibility or mobile pass. |

#### UX-01 — Calendar clips on the 320px browser layout

**Severity:** Minor · **Confidence:** Confirmed at the narrow desktop-browser viewport · **Safety:** no saved data change · **Proof:** required date-selection controls fit the viewport.

**Starting state:** New Reports preview, browser viewport 320 × 740, desktop browser identity, Create report with Event Summary and Custom date range.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| 1. Open Reports → Create report. | 320px-wide browser | Fields remain within the available width. |
| 2. Open the Start date calendar. | Custom date range | Whole calendar and month navigation fit without horizontal page scrolling. |

**Actual:** At step 2 the popup is 332px wide at x=8, while the frame's usable width is 305px. Content width grows to 340px. The Saturday column and next-month control extend beyond the right edge. A 390px view fits and allowed selecting October 21. **Impact:** narrow-window date selection requires horizontal panning; this is not proof that a phone's native picker fails.

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/ux-12-mobile-date-picker-320.png]]

**Source:** shared/components/ui-kit/form/InputDatePicker/InputDatePicker.web.tsx, desktop Popover.Content and the separate device-detected native/mobile paths. **Reset:** calendar closed/selection kept only in the owned unsaved form, subsequently abandoned. **Release:** responsive polish defect, no financial failure demonstrated.

#### UX-02 — Search-clear icon does not respond to Enter or Space

**Severity:** Minor · **Confidence:** Confirmed keyboard failure with pointer control · **Safety:** no saved data change · **Proof:** keyboard users can clear a search.

**Starting state:** Reports list, 1440 × 900, Filters visible, search field empty.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| 1. Enter an unmatched report name in Search. | QA-UX-keyboard-clear-20261021 | Query is shown and matching results update. |
| 2. Move keyboard focus to the × beside Search and press Enter. | Search clear icon | Query clears and reports return. |
| 3. Repeat with Space, then compare with clicking ×. | Same query | Both keyboard and pointer activation clear the query. |

**Actual:** At steps 2/3 both Enter and Space leave the query unchanged. Normal pointer activation clears it (also confirmed in the mobile drawer). The search × itself also has no accessible name. **Impact:** a keyboard user cannot use this clear control. Header Clear or selecting/deleting the text provides a workaround.

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/ux-18-keyboard-clear-no-effect.png]]

**Source:** shared/components/application/form/SearchBar/SearchBar.web.tsx attaches clearing to onMouseDown, with no matching onClick; no accessible label on the icon button. **Reset:** header Clear used; query verified empty. **Release:** keyboard/usability defect, no saved data affected.

#### UX-03 — Row-action buttons have no accessible name

**Severity:** Minor · **Confidence:** Confirmed accessibility-tree / markup defect; actual screen-reader run deferred · **Safety:** no data change · **Proof:** a row's actions are identified for assistive technology.

**Starting state:** Reports list at desktop or mobile-sized width, with at least one saved report.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| 1. Locate a report's three-dot action button and inspect its accessibility label. | Any saved row | Button is identified as More actions for that report. |
| 2. Focus and open it using the keyboard, then dismiss with Escape. | Same row | The labeled menu opens and focus returns to its button. |

**Actual:** At step 1 the button has no text or accessible label. More actions is attached only to its SVG icon, which is aria-hidden. The browser accessibility tree exposes an unnamed popup button. Step 2 works; this is not a keyboard-opening failure. **Impact:** the action's purpose is not conveyed by its accessible name.

Evidence: ux-verification-summary.json records label/text null or empty, 40 × 40 button size, hidden SVG and successful keyboard focus return. Source: Reports useSavedReportsColumns.tsx, Menu.Button and the hidden icon's label. **Reset:** menu dismissed; no row action executed. **Release:** accessibility defect; no screen-reader certification claimed.

#### UX-04 — Mobile action flow loses the report's visible identity

**Classification:** Minor usability improvement; observed behavior confirmed, not a functional deletion failure · **Safety:** confirmation opened then Cancel; no deletion · **Proof:** the organizer can identify the report before a destructive action.

**Starting state:** Reports list at 390 × 844, saved QA Reports Smoke Product PDF 2026-10-21 22:25:24 present.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| 1. Scroll the table horizontally to the saved report's three-dot action button. | Preserved run-created Product Summary report | Report identity remains available alongside its actions, or the confirmation clearly identifies it. |
| 2. Choose Delete, read the confirmation, then choose Cancel. | Do not confirm Delete | Confirmation identifies the chosen report; Cancel preserves it. |

**Actual:** The report name scrolls off-screen when actions become visible. The confirmation says only Are you sure you want to delete this saved report? It does not show the name. Cancel works. **Impact:** users must remember which row they were on; long lists increase the chance of targeting the wrong report. No wrong-report deletion was attempted or established.

![[99 Archive/QA Evidence/Reports/reports-beta-smoke-2026-10-21/ux-07-mobile-delete-confirmation.png]]

**Suggested improvement:** show the report name in the confirmation; consider keeping name/actions together through responsive cards or sticky columns. Source: DeleteReportModal.web.tsx renders a generic message despite having the report object. **Reset:** Cancel selected and report retained. **Release:** usability improvement; not a Critical finding.

#### Inconclusive observations and remaining UX improvements

- **Quick close after search:** an immediate semantic-action Close discarded the entered query; keeping the drawer open past its 500ms debounce applied it. A normal pointer Close after 197ms retained the query. These conflict, so no confirmed quick-close defect is counted. The debounce cancellation on unmount is a source-backed timing risk, not end-to-end proof. The separate clear-then-close path also remained timing-sensitive. The final verification summary records the timing discrepancy; screenshots ux-20/21 show the observed query states.
- **Duplicate navigation shell:** a mixed resize/navigation sequence displayed both navigation shells. A fresh reload → Create report → Back check did not reproduce it. Retained as inconclusive, not a confirmed report bug. Local LegacyDashboardProvider explicitly preserves embed state across query-less links; deployed equivalence is not established. The final verification summary records the clean rerun; screenshot ux-19 shows the earlier observation.
- **Preview banner:** hidden at narrow/mobile-sized widths; the new Reports page remains active. No visible mobile Switch back was established. Product expectation needs confirmation before calling deliberate responsive hiding a defect; no legacy page was opened for this audit.
- **320px event selectors:** event/recurring-event placeholder text truncates to near-identical short text beside Past events. Visible labels would improve discoverability; source provides accessible labels but hides visible ones. No failed event search is claimed from the clipped placeholder alone.
- **Unsaved navigation:** Back discarded the owned unsaved name/date/selection without a warning. Consider a discard prompt; autosave was not expected or tested.

**Evidence / final safety:** [[03 Test Cases/Reports/evidence/reports-beta-smoke-2026-10-21/ux-verification-summary.json|UX verification summary]]. No successful save, export, email, schedule or deletion was submitted in this extension. One invalid Save was rejected for missing event. No additional report definition was created. Temporary filters were cleared and their empty value verified; viewport override reset. Original tabs and the original unsaved form remain untouched. The temporary audit tab is closed after capture. No Qase changes.

Smoke execution complete for the declared desktop/two-export subset. New Reports list and preview banner are left active; filters are clear. The generated PDF tab remains open for review. Two new report definitions remain intentionally preserved; no cleanup deletion was attempted. The failed no-event Save created no extra report. Existing report definitions and their sampled timestamps remain unchanged.

**Unique-control extension final state:** No new definition, export, email or schedule was submitted. The original tab's unsaved Product Summary preview was left intact. The temporary audit tab was closed after evidence capture; the two original tabs remain. The original preview preference was not changed. All 40 types / 47 supported format combinations are accounted for at the control-inspection layer; three gaps remain open and unavailable campaign/parent-organization branches remain explicitly unverified.

**Recommendation:** Fix RPT-01–03, then rerun Product Summary PDF attribute scope, Event Summary PDF ticket-type scope and Transactions all-invoice scope. Complete financial reconciliation with a known source ledger before signing off service fees, refunds/exchanges, earnings or report financial correctness. No Critical issue confirmed; no overall parity/release pass. No user action is required to complete this audit record.
