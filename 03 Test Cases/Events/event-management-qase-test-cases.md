---
title: Events — Page-by-page test cases
date: 2026-10-04
tags:
  - qa/test-cases
  - events
  - qase
aliases:
  - Event Management Existing and New Qase Cases
  - Event Management Qase Mapping
  - Event Management Existing Qase Gap Analysis
  - Event Management New Qase Gap Analysis Cases
status: Source-reviewed local drafts; not executed or pushed
---

# Events — Page-by-page test cases

Read the folders in sidebar order. This index replaces the old CSV assignment, case-mapping and suite-move planning notes. **No Qase cases or suites were changed.** Existing IDs remain SPT-*; new cases use TC-*.

Existing cases are retained alongside focused local improvements. A preserved Qase case is **existing coverage**, not automatically a migration-ready test. Page notes identify legacy wording, overlapping cases and unresolved native destinations.

## Pages in the screenshot

| Sidebar group | Page and cases | Coverage / action |
| --- | --- | --- |
| Event | [[03 Test Cases/Events/01 Event/Overview|Overview]] | SPT-5071; totals, child rows and reports. Empty/readiness/error presentation needs the native overview pass. |
| Manage | [[03 Test Cases/Events/02 Manage/01 Basic info|Basic info]] | SPT-5077 locally focused; public links, categories, online events, images, location, doors, date-display and discovery checks. |
| Manage | [[03 Test Cases/Events/02 Manage/02 Tickets|Tickets]] | Ticket type pricing/inventory/sale windows/delivery plus event-wide capacity, PDF messages and save/discard cases. |
| Manage | [[03 Test Cases/Events/02 Manage/03 Legal and important info|Legal & important info]] | SPT-5111 enhanced locally; SPT-4878 terms validation and checkout acceptance. |
| Manage | [[03 Test Cases/Events/02 Manage/04 Seating|Seating]] | Presence only; detailed coverage remains in Map Editor (82). |
| Manage | [[03 Test Cases/Events/02 Manage/05 Order form|Order form]] | Existing collection/question cases plus conditional customer-profile sync. |
| Manage | [[03 Test Cases/Events/02 Manage/06 Donations|Donations]] | SPT-780/782/783/3300; native permission/gateway/currency gates called out. |
| Manage | [[03 Test Cases/Events/02 Manage/07 Financial settings|Financial settings]] | Presence only. |
| Manage | [[03 Test Cases/Events/02 Manage/08 Custom fees|Custom fees]] | Presence only; configured-fee support and financial permission required. |
| Manage | [[03 Test Cases/Events/02 Manage/09 Advanced options|Advanced options]] | SPT-5078, improved SPT-1784, passwords, transfer limits, custom fields and validation. |
| Promote | [[03 Test Cases/Events/03 Promote/01 Discounts|Discounts]] | Shared suites referenced; native event destination currently a placeholder. |
| Promote | [[03 Test Cases/Events/03 Promote/02 Tracking links|Tracking links]] | Event-owned cases and shared-suite references. |
| Promote | [[03 Test Cases/Events/03 Promote/03 Packages|Packages]] | Existing package cases; selected-event entry must retain the correct parent. |
| Promote | [[03 Test Cases/Events/03 Promote/04 Upgrades|Upgrades]] | Existing create/edit/delete/uniqueness and messaging cases. |
| Promote | [[03 Test Cases/Events/03 Promote/05 Sellers|Sellers]] | SPT-5079; separate from event editing. |
| Promote | [[03 Test Cases/Events/03 Promote/06 Facebook|Facebook]] | SPT-4902; external publishing requires an approved test destination. |
| Operations | [[03 Test Cases/Events/04 Operations/01 Email guests|Email guests]] | Detailed SPT-5012–5018 retained; acceptance is not inbox-delivery proof. |
| Operations | [[03 Test Cases/Events/04 Operations/02 Check in|Check in]] | Shared cases referenced; native event destination currently a placeholder. |
| Operations | [[03 Test Cases/Events/04 Operations/03 Transactions|Transactions]] | Shared event/seller-scope cases referenced; native destination currently a placeholder. |
| Operations | [[03 Test Cases/Events/04 Operations/04 Waitlists|Waitlists]] | Setup and shared list cases referenced; native destination currently a placeholder. |
| Operations | [[03 Test Cases/Events/04 Operations/05 Clone event|Clone event]] | SPT-786 and detailed SPT-5154 regression; source event must stay unchanged. |
| Operations | [[03 Test Cases/Events/04 Operations/06 Cancel event|Cancel event]] | SPT-5108/5109 retained with explicit safety and refund-completion gaps. |
| Settings | [[03 Test Cases/Events/05 Settings/01 Branding|Branding]] | Event cases retained; venue/shared suite 744 referenced; native placeholder. |
| Settings | [[03 Test Cases/Events/05 Settings/02 Email customization|Email customization]] | Event cases retained; shared suite 749 referenced; native placeholder. |
| Settings | [[03 Test Cases/Events/05 Settings/03 Edit attraction|Edit attraction]] | Existing suites 674/480 retained; native placeholder. |
| Stats | [[03 Test Cases/Events/06 Stats/Stats and Info|Stats & Info]] | SPT-5080/4288; child-event access differs from the old navigation case. |
| Admin | [[03 Test Cases/Events/07 Admin/Internal fees|Internal fees]] | Authorized internal-admin presence check only. |

“Placeholder” is a finding in the checked-out source, not a claim about the deployed screenshot. Do not count a placeholder rendering as feature parity. Shared organization suites remain where they are in Qase.

## Outside the sidebar, still covered

| Workflow | Canonical file |
| --- | --- |
| Create single/recurring events, drafts and required inputs | [[03 Test Cases/Events/00 Create and shared checks/Create event]] |
| Page availability, event ownership, entry points and protected states | [[03 Test Cases/Events/00 Create and shared checks/Navigation and permissions]] |
| Recurring-child edits, conversions and templates | [[03 Test Cases/Events/00 Create and shared checks/Recurring events and templates]] |
| Independent page saves, connection recovery and keyboard/mobile use | [[03 Test Cases/Events/00 Create and shared checks/Page save and recovery]] |
| Manage Events list/card actions | [[03 Test Cases/Events/00 Event list/SPW-20370 - Manage Events Card Actions]] — keep separate from event details, like suite 85 |
| Conditional Live stream page | [[03 Test Cases/Events/05 Settings/04 Live stream]] |

## Testing intent and proof targets

| Field | Scope |
| --- | --- |
| Invariant | Splitting the event editor into pages must preserve the selected event, saved settings, sellable inventory, valid dates, customer information and ownership boundaries. |
| Highest-risk harm | An event publishes incorrectly, valid sales stop, a child edits another occurrence, one page erases another page's settings, or customers receive incorrect tickets/questions. |
| Proof | Fresh page reads, unchanged comparison event/child, matching public details, an intended order/ticket where required, and explicit recovery/cleanup. |
| Actors and surfaces | Owning organization employee with the named permissions; restricted employee; customer public page/checkout/PDF. Shared Box Office/check-in/report cases retained where already applicable. |
| Scope | Current local backend behavior, native sidebar/page mapping, creation/draft/active/child/template states, focused parity gaps. Not a branch-diff review. |
| Exclusions | Deep seating/fees, Workflow Approval suite 949, live external publication/sends/refunds, production data changes and load certification. |
| Confidence | High for folder/ID preservation; medium for migration readiness. No browser, API mutation, test execution, provider delivery or deployed-flag inspection was performed. |

| Proof target | Existing / new cases | Remaining evidence |
| --- | --- | --- |
| Correct create/draft/publish lifecycle | SPT-764/4874/4876/5073 | Native staged creation differs from legacy flow; run native creation and publication before sign-off. |
| Correct event and authorized access | SPT-5072/5074/5075/5076 | Run permitted and denied roles; UI hiding is not backend write authorization. |
| Field edits survive and do not overwrite another page | SPT-5077; TC-1–4/9/10/15/16/19 | Fresh read on supported desktop and phone browser. |
| Ticket capacity and fulfillment follow settings | Existing Ticket cases; TC-5–8/17/18 | Controlled basket and free-ticket PDF proof; preserve financial records. |
| Checkout questions and policies remain correct | SPT-3247/3249/3251–3253/3261–3264/3268–3270/4878/5111; TC-20 | Field answers, required rules and customer-profile effects need the matching downstream suite. |
| Advanced configuration is saved or cleared correctly | SPT-5078/1784; TC-11–14 | Custom website, external mail/Workday and printed output are separate integration proof. |
| Recurring changes stay correctly scoped | SPT-5082/770/4879/4299 | Parent-derived date range may change when an edge child date changes; sibling values must not. |

## Highest-priority gaps

| Risk | Finding | Disposition |
| --- | --- | --- |
| High — publishing / live sales | Native Create event makes a draft and opens Basic info; the old Show Advanced Settings → Publish cases cannot be executed unchanged. | SPT-764 locally updated for native staged creation; SPT-4874/5073/4876 still require native adaptation. |
| High — lost settings | Separate pages and ticket dialogs can save stale event data or hide unsaved edits. | TC-9/10/18; extend existing cross-section integration tests. |
| High — wrong date / occurrence | Doors-open omission, selected-date timezone policy and parent date rollup are not adequately described by a generic “dates persist” assertion. | TC-3/4/16; SPT-5152 requires a concrete timezone-policy matrix, not duplicate DST cases. |
| High — wrong capacity / admission | Ticket inventory alone does not prove an event-wide cap or downloaded-ticket content. | TC-5/6/8/17 plus existing inventory/delivery cases. |
| High — irreversible cancellation | SPT-5108/5109 lack exact safe financial setup and final refund proof. | Block execution of their generic submit steps until the page's named prerequisites/expected amounts are prepared. |
| High — migration incomplete | Seven destinations are registered to placeholders: Discounts, Check in, Transactions, Waitlists, Branding, Email customization, Edit attraction. | Block native parity claims; retain existing destination suites and event-context requirements. |
| Medium — hidden/conditional controls | Hotel booking partner, custom display fields, profile sync, transfer overrides and child Advanced controls moved or have specific gates. | SPT-1784, TC-11/12/20, updated SPT-5072. |
| Medium — poor test instructions | Newer SPT-5110/5112–5116/5129/5131/5132/5142/5157 contain broad steps, misplaced results or fake JSON “parameters” in descriptions. | Link stronger existing coverage; do not count titles as complete tests or create equivalent duplicate cases. |

## SPT-5077 split: no scenario silently dropped

| Previous scenario | Current home / replacement |
| --- | --- |
| BasicInfoGeneral | Basic info: focused SPT-5077; SPT-775 link validation; TC-1/2/19 |
| BasicInfoGoogleThings; Music; Comedy; Arts; Sports | Basic info: TC-19 and SPT-745/749 |
| LocationPhysical; LocationOnline | Basic info: TC-3 and SPT-4877 |
| EventDateAndTime | Basic info: TC-4/16 and existing SPT-5152 |
| Accommodations | Advanced options: SPT-1784 enhanced. The legacy post-purchase partner selector is commented out; do not invent a second current UI control. |
| TicketTypes | Tickets: existing ticket-type cases and TC-17 |
| EventTicketSettings | Tickets: TC-5–8; No Ticket Types Message remains a separate field to check against the native public no-ticket display. |
| LegalPoliciesAndImportantInfo | Legal & important info: SPT-5111 and SPT-4878 |
| OrderFormAndMessaging | Order form: existing field/question cases and TC-20; purchase button text under Basic info / SPT-3248 |
| CustomDisplayFields | Advanced options: TC-11 |
| CharitableDonations | Donations: SPT-780/782/783/3300 |
| FinancialSettingsPresence | Financial settings: SPT-5072 presence-only |
| AdvancedOptions | Advanced options: SPT-5078 and TC-12–14; Workday presence-only |

Other refactors: SPT-764 uses native staged creation; SPT-5072 uses current navigation gates; SPT-5074 removes the incorrect Edit Sellers click path; SPT-5082 allows the parent date range to follow child dates; SPT-5111's transfer portion moves into TC-12. These are local proposals only. All 51 original SPT IDs remain in the reorganized files.

## Coverage accounting and execution order

All manual cases here are **Manual-only / not executed** unless their own preserved note explicitly cites earlier evidence. That is a test-design status, not Passed. The original 11-case edit draft is superseded: entry/access → SPT-5074/5075; basic/validation → SPT-5077/4874; visibility/dates → TC-3/4/16/19 and SPT-5152; recurrence/template → SPT-4876/5082/769/4879; tickets → Tickets page; legal/order form → their pages; protected states → SPT-5076.

1. Create and reopen one single event and one recurring series; complete native publication with no workflow approval configured.
2. Run SPT-5074/5075 and TC-9; confirm no wrong-event or stale-page update.
3. Run TC-4/5/6/18, then focused order-form/legal tests and one controlled purchase-to-ticket journey.
4. Run the remaining page cases, selected mobile/keyboard paths, negative/boundary scenarios and cleanup.
5. Inspect every sidebar destination. Record missing implementation, unavailable setup and intentionally excluded fees/seating separately.

Complex controls accounted for: image selection/crop/rejection → TC-1; rich description → SPT-5077 plus public SPT-361/374; category/tag lookup/helper creation → SPT-745/749 and TC-19; date pickers/doors/clear → TC-3/4/16 and SPT-5152; ticket list/editor dirty state → TC-17/18; question builder CRUD/types → SPT-3253/3261/3262; password dialog CRUD/cancel → TC-14; custom-field formatter/remove → TC-11. Exhaustive rich-text toolbar permutations, every timezone fold/gap, injected worker/provider failures and every ticket-editor subfeature are not represented as completed manual proof.

## Automation candidates

| Priority / layer | Target | Evidence and limits |
| --- | --- | --- |
| P0 backend/API | Publish validation; event ownership; child constants/rollup; pending-save guard; atomic nested failures | Event serializer/viewset are first truth; add boundary and failure tests, not browser-only assertions. |
| P0 existing Playwright journeys | Save event → purchase correct ticket → reopen order/PDF; capacity; recurring selected child | Extend existing single/recurring event journeys; do not create a second purchase framework. |
| P1 component/integration | Page-owned saves, cancelled dialog, rejected image, required legal field, hidden-profile-sync normalization | Existing cross-section save tests and form utilities offer deterministic control; not proof of deployed integration. |
| P1 browser | TC-1/4/9/17/18, representative order form, allowed/denied navigation | Assert fresh reads and unchanged comparison records. |
| Manual/device | Cropping appearance, narrow-screen keyboard/focus, PDF readability, real email and thermal print | Real inbox/printer/provider output must be observed separately; no synthetic “delivered” pass. |

Automation sources: [single-event journeys](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/single-events.test.ts>), [recurring-event journeys](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/events/recurring-events.test.ts>), [cross-section save tests](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/editor-modal/event-sections-save.integration.test.tsx>). Located/inspected only; nothing was run.

## Sources and read record

- Authority: [[01 Repositories/Backend - web-app]], [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]].
- Local source snapshot: backend HEAD 96563466a9; frontend HEAD c84fbb7ad2, read 2026-10-04. Working-tree content was read; these are not deployment/build claims.
- Backend: [event API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>), [event serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [event model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py>), [ticket serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/ticket_types.py>), [legacy form](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html>).
- UI organization: supplied screenshot plus [native page registrations](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>) and [navigation gates](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-routes.ts>). Each page note has focused sources.
- Qase: one paginated read of **1,781 cases and 255 suites**. Candidate filter: Events (79) descendants plus Core Events (613), Branding (744), Email Customization (749), Tracking Links (183) descendants — **210 matches**; additionally filtered titles for packages/upgrades/discounts and inspected migration IDs 5108–5157. Full payloads were retained under /private/tmp for local comparison; no writes.
- Existing local case bodies were preserved before refactoring. Additional event-level Qase cases were brought into the matching pages; shared suites remain linked, not relocated.

## Open readiness questions

These do not block reading or reviewing the reorganized drafts, but prevent a full migration sign-off:

- Which native destinations are actually deployed and which legacy redirects remain supported? Local placeholders and a screenshot are not deployment evidence.
- What exact timezone policy/cohort and ambiguous-time choice should SPT-5152 execute? Record the backend policy, event timezone and expected saved instant before asserting a DST result.
- Which controlled integration website, Campaign Monitor list, Facebook destination, inbox and printer are available for downstream proof?
- What approved refund type, sandbox organizer-payment setup and expected amounts make cancellation safe to execute?
- Which ticket-editor specialist areas are included in this release beyond the inherited pricing/delivery/waitlist cases: scan windows, auto-release, tiered discounts, credits, notifications, resale and payment plans? Their existence is not proof that this page-level pass covers their entire business logic.

## Cleanup and history

Removed superseded local planning: assignment matrix Markdown/CSV, CSV-to-Qase mapping, suite-reorganization ledger and the older overlapping edit-event draft. Their active page mappings, shared-suite references, unique coverage intents and unresolved risks are now above or in the page files. The CSV contained only Unassigned rows, so no QA ownership assignments were lost.

Historical Qase moves from 2026-08-24 are history only: event suites 1050/1051/1052 were created, 22 cases moved, and the user created Overview (1053). This refactor performs **no further suite creation, case movement or case deletion**. Manage Events List (85), shared venue suites and Workflow Approval (949) stay untouched.

Recovery: tracked originals remain in Git; a full pre-refactor copy is also at /private/tmp/events-notes-before-refactor-20261004.json for this session. The three focused card-action, email-guest and clone-regression notes were moved, not deleted.
