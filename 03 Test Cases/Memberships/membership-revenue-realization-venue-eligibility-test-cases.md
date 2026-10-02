---
title: Membership Revenue Realization Venue Eligibility Test Cases
date: 2026-08-28
tags:
  - qa/test-cases
  - memberships
  - financials
status: qase-created
---

# Membership Revenue Realization Venue Eligibility Test Cases

Qase status: SPT-5083 through SPT-5091 were created in suite 89 and read-back verified on 2026-08-28. No manual case has been executed.

## Testing Intent

We are testing whether organizers can use membership revenue realization independently of package revenue settings while membership purchases, issued event tickets, refunds, exchanges, reports, and payouts remain financially balanced; this matters because revenue could be missing, counted twice, or assigned to the wrong event, and we will prove it with saved membership settings, one customer charge and membership, issued benefit tickets, and matching transaction, report, and payout totals.

| Field | Answer |
| --- | --- |
| Criticality bucket | Financial math, reporting agreement, async final state, and fulfillment/access |
| Business invariant | One membership purchase is recognized once. When the membership is eligible, its value is distributed only to the intended benefit events without changing what the customer paid or duplicating organizer revenue. |
| User or business impact | Customers could be charged or refunded incorrectly; organizers and finance users could see missing or duplicate event revenue and payouts. |
| Failure mode | Package settings incorrectly block membership realization; ineligible memberships realize value; a later or unpaid batch realizes value again; refunds or exchanges leave incorrect financial state. |
| Observable proof | The membership setting persists, one purchase produces one membership, the first paid batch produces the expected event tickets, the receipt remains customer-readable, and event, membership, transaction, and payout totals reconcile. |
| Source of truth | Current backend membership and financial behavior, current frontend user paths, and existing Playwright membership patterns |
| Primary surfaces | Dashboard Memberships, Ticket Manager, WebPublic, Widget, WebBoxOffice, My Account Memberships, Transactions, Reports, and Payouts |
| In scope | Seasonal membership eligibility, venue capability, global rollout, package-mode independence, first and later ticket batches, paid and hold-link batches, purchase, refund, same-value exchange, reports, payouts, and inherited membership permissions |
| Out of scope | Qase comparison, PR intent, database-only migration execution, exhaustive fee/tax/currency combinations, payment-provider failures, renewal purchases, advances, disputes, and concurrent background-task races |
| Confidence | Medium: backend rules and downstream behavior are clear, but the reviewed frontend still uses package child mode instead of the new venue capability when showing the control. |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| Eligible seasonal memberships can opt in regardless of package parent/child mode | Package configuration must not block a valid membership setup | SPT-5083, SPT-5091 |
| Ineligible memberships cannot retain or use the opt-in | Prevents unintended financial allocation | SPT-5085, SPT-5086, SPT-5087 |
| The first paid ticket batch allocates one purchase once and still fulfills tickets | Protects customer fulfillment and organizer financial totals | SPT-5084 |
| Later paid batches and unpaid hold-link batches do not allocate the membership value again | Prevents duplicate revenue | SPT-5088 |
| Refunds and exchanges use the realized event value without duplicate money or ticket ownership | Protects customer balance, event revenue, and seat ownership | SPT-5089, SPT-5090 |

## Declared Scope

### In Scope

- Organizer create and edit paths under Dashboard → Memberships.
- The visible **Revenue realization** control and its saved state.
- Seasonal, non-seasonal, enabled, disabled, and active-member states.
- Parent package mode with multi-layer packages and child package mode as separate venue setups.
- Public, Widget, and Web Box Office membership purchases because they share the backend membership and financial behavior.
- Paid ticket batches, unpaid hold-link batches, customer event-ticket access, receipts, transactions, reports, payouts, refunds, and same-value membership-ticket exchanges.
- An unchanged package purchase as a control for package behavior.

### Out Of Scope Decisions

- The database backfill is deployment verification, not a normal organizer workflow. It remains visible in the Coverage Ledger instead of becoming a Qase manual case.
- Direct API attempts to submit hidden values are better suited to backend automation; manual steps use only visible product controls.
- One no-fee, no-tax CAD example is used for exact allocation math. Fee, tax, discount, currency, and rounding matrices are deferred to focused financial automation.
- Renewal purchases, advances, disputes, chargebacks, and provider failure or retry states are not changed entry paths and are not needed to prove venue eligibility decoupling.
- Mobile views are excluded because membership setup, Ticket Manager, Transactions, Reports, and Payouts are organizer desktop workflows.

## Plain-Language Glossary

- **Revenue realization:** Showpass moves the value of a membership purchase from the membership to the events delivered as membership benefits.
- **Ticket batch:** A set of event tickets that an organizer prepares and sends to members from a membership's **Ticket Manager**.
- **Paid ticket batch:** Tickets covered by the original membership price; the customer does not pay again.
- **Hold-link batch:** Additional tickets offered to members through a separate purchase link; these are not covered by the original membership price.
- **Package mode:** A separate venue setting that decides whether package revenue stays with the package or is distributed to package items. It must not decide membership eligibility.

## Backend Flag Reference

Use these exact backend names when preparing or changing the venue state for the cases below.

| Purpose | Backend Name | Enabled / Parent Value | Disabled / Child Value | Notes |
| --- | --- | --- | --- | --- |
| Global rollout | Waffle switch `enable_membership_revenue_realization` | `True` | `False` | Checked before the venue or membership-group values |
| Venue membership capability | `Venue.enable_membership_revenue_realization` | `True` | `False` | The venue-level gate introduced for membership revenue realization |
| Package revenue mode | `Venue.package_revenue_realization_type` | `'parent'` | `'child'` | Controls packages only; it must not gate memberships |
| Multi-layer packages | `Venue.enable_multi_layer_packages` | `True` | `False` | Child package mode cannot be combined with this value set to `True` |
| Saved membership choice | `MembershipGroup.realizes_revenue` | `True` | `False` | Saved by the visible **Revenue realization** control; this is not a venue flag |
| Effective membership result | `MembershipGroup.group_realizes_revenue` | `True` only when all eligibility gates pass | `False` when any gate fails | Read-only computed behavior; do not toggle directly |

## Sources Reviewed

### Vault Guidance

- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]
- [[01 Repositories/QA Automation - showpass-playwright]]
- [[00 Start Here/World-Class Software Quality Standard]]
- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- [[02 Feature QA/Checkout Criticality From Jira Major Critical Export]]

### Backend Source

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/membership_revenue_realization.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/models.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/venue_based/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/member_batch_generation/member_batch_generator.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/services/revenue_realization/`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/venue.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/migrations/0271_venue_enable_membership_revenue_realization.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/revenue_realization/`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/user_credits/exchanges/`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/service_tests/revenue_realization/test_membership_revenue_realization_service.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/tests/service_tests/user_credits/test_membership_seat_swap_integration.py`

### Frontend Source

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/membership-group-form/MembershipGroupFormFields.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/utils/membership-group-form-utils.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-batches-form/ItemsInTicketBatch.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/memberships/components/SeasonEventTimeTable/SeasonEventTimeTable.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/exchanges/`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/venues/data/types/user-venue.ts`

### Playwright Pattern References

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/memberships/checkout-memberships.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/dashboard/memberships/create-seasonal-benefit.test.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/memberships/`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/dashboard/box-office/TransactionPage.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/membership-detail/MembershipPage.ts`

## Assumptions And Unknowns

- The new venue-level membership revenue capability is stored as `Venue.enable_membership_revenue_realization` and is provisioned outside the organizer venue form. The user venue API exposes it as read-only, and no organizer-facing control to change it was found.
- The global membership revenue rollout, seasonal memberships, membership ticket-type synchronization, and paid ticket-batch generation are enabled in the QA environment unless a case explicitly uses the disabled state.
- Exact event and membership revenue can be inspected through an approved Dashboard report or financial export. The authoritative visible report and column names need confirmation before execution.
- The no-fee test membership is priced at CAD $120.00 and its first batch contains three events, so each event should receive CAD $40.00.
- The current frontend source conflicts with backend eligibility: it still shows **Revenue realization** only when package mode is child, and its user-venue TypeScript type does not include the new capability. SPT-5083 and SPT-5085 intentionally expose this integration risk; it is not called a confirmed defect because no browser execution occurred.
- Disabling the venue capability after opted-in memberships already have active members has no documented organizer workflow or focused lifecycle contract.
- Background processing time and the supported QA method for making a payout available are environment-specific.

## Source-Backed Behavior

- Effective membership revenue realization requires Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, a seasonal renewal frequency, and `MembershipGroup.realizes_revenue=True`.
- Package parent/child mode and multi-layer package configuration do not participate in backend membership eligibility.
- Saving an ineligible group clears the saved opt-in. A direct non-seasonal opt-in is rejected by backend validation.
- An opted-in membership with active members cannot be switched off through the membership API; the current form disables the toggle when active members exist.
- Enabling an eligible group synchronizes benefit allocations after the save commits.
- The first paid ticket batch with event allocations queues financial realization after ticket generation commits.
- Hold-link batches, non-realizing members, and batches without event allocations do not queue new membership realization.
- Realization creates balanced adjustment and negation rows rather than changing the original membership purchase row.
- Revenue realization rows are excluded from the customer receipt.
- The realized event value is linked to generated membership tickets and is used by the membership-ticket exchange flow.
- Allocation percentages lock after the first realization so later changes do not rewrite already-realized value.
- Existing child-mode venues are backfilled as enabled; parent-mode venues are not. New venues default to disabled until provisioned.

## Product Surface And Entry-Point Inventory

| Entry Point | Actor Flow | State Carried Into Shared Behavior | Required Outcome |
| --- | --- | --- | --- |
| Dashboard create membership | Organizer opens Memberships → Create membership | No saved group or members | Eligible seasonal option is visible, saved, and reopened correctly |
| Dashboard edit membership | Organizer opens a saved membership → Edit Membership | Saved opt-in and active-member count | Saved state persists; protected states cannot be disabled |
| Dashboard Ticket Manager | Organizer opens Membership Benefits → Issue Tickets benefit → Open ticket manager | Saved group, benefit, events, and existing batches | First paid batch realizes once; later and hold-link batches do not realize again |
| WebPublic membership page | Customer buys a published membership | Public membership and customer account | One payment, one order, one membership |
| Widget membership checkout | Customer buys through an embedded widget | Widget basket and shared membership API | Same membership and financial outcome as WebPublic |
| WebBoxOffice membership sale | Box Office employee sells a membership | Selected customer and seller context | Same membership and financial outcome as public checkout |
| My Account → Memberships | Customer opens the purchased membership | Member record and generated ticket batches | Issued event tickets appear; eligible tickets can be exchanged |
| Web Box Office → Transactions | Venue employee opens the purchase | Original sale plus financial adjustment chain | One customer sale; refund and exchange chain remain balanced |
| Dashboard Reports and Payouts | Organizer or finance user reviews totals | Completed background realization and payout state | Event and membership totals add to the original value once |
| Package purchase control | Customer buys a package at the same venue | Package parent/child configuration | Package behavior remains governed by package mode |

## Outcome Coverage

| Outcome | Applicability | Coverage |
| --- | --- | --- |
| Clean eligible save | Required | SPT-5083 |
| Clean purchase and first paid batch | Required | SPT-5084 |
| Venue capability disabled | Required negative | SPT-5085 |
| Global rollout disabled | Required rollback smoke | SPT-5085 |
| Non-seasonal membership | Outside the clarified seasonal-only scope | SPT-5086 remains separate and is not part of SPT-5085 |
| Active member prevents disabling | Required safety boundary | SPT-5087 |
| Additional paid batch | Required no-duplicate path | SPT-5088 |
| Unpaid hold-link batch | Required separate-payment path | SPT-5088 |
| Full refund after realization | Required financial recovery | SPT-5089 |
| Same-value event-ticket exchange | Required downstream value and ownership path | SPT-5090 |
| Package behavior remains independent | Required regression control | SPT-5091 |
| Payment cancellation, failure, timeout, and retry | Not applicable to the eligibility change; shared checkout coverage remains responsible | No new case |
| Duplicate or delayed background message | Not deterministic through normal manual controls | Suggested automated coverage |

## Risk Areas

- Parent-mode venues are eligible in the backend but cannot see the Dashboard option because the client still checks child package mode.
- A child-mode venue with the membership capability off sees an option the backend later clears, producing a misleading save.
- The saved opt-in and effective eligibility diverge after a rollout or venue-capability change.
- The original membership value is counted once at the membership and again at the events.
- The first ticket batch distributes value incorrectly across events or a later batch distributes it again.
- Hold-link ticket revenue is confused with value already included in the membership.
- Customer receipts expose internal adjustment or negation rows.
- Refunds reverse the membership but leave event revenue or payout value behind.
- An exchanged generated ticket uses the free generated-ticket price instead of the realized event value.
- Allocation changes after the first realization rewrite historical event value.
- Package revenue changes when the independent membership capability is enabled.
- Existing child venues lose eligibility during deployment, or new venues are unintentionally enabled.

## Coverage Decisions

- Parent multi-layer and child standard venue setups share SPT-5083 because the organizer actions and expected membership result are identical.
- Public, Widget, and Web Box Office purchase paths share SPT-5084 because they create the same membership and feed the same ticket-batch realization path. The Minimum Execution Set uses WebPublic as the representative baseline.
- The two Seasonal ineligible states share SPT-5085 because each should produce the same user-visible result: no revenue-realization control and no saved opt-in. Non-seasonal coverage is not part of SPT-5085.
- Additional paid and unpaid hold-link batches share SPT-5088 because both must leave the original membership allocation unchanged, while the Expected Results explain their different fulfillment.
- Refund and exchange remain separate because they change different customer balances, ticket states, and financial records.
- The package control remains separate because it proves a different invariant: membership enablement does not redefine package behavior.

## State-Space / Setup Matrix

| Axis | Minimum Values | Extended Values | Why It Matters |
| --- | --- | --- | --- |
| Venue membership capability | Enabled; disabled | Changed after groups exist | Primary venue gate |
| Global rollout | On; off | Changed after purchase | Effective runtime gate and rollback |
| Package setup | Parent + multi-layer; child standard | Parent without multi-layer | Must be independent from membership eligibility |
| Renewal frequency | Seasonal; yearly | Monthly; lifetime; one-time | Only seasonal groups are eligible |
| Group opt-in | On; off | Saved on while effective gate later turns off | Separates stored configuration from effective behavior |
| Member state | No members; one active member | Expired member | Active members protect disabling and frequency changes |
| Batch position | First paid batch; later paid batch | Replayed first batch | Only the first allocated paid batch should realize value |
| Batch payment method | Paid from membership; unpaid hold link | Scheduled send | Hold links are separate purchases |
| Event count | Three future events | Rounding case with CAD $100 across three events | Proves distribution and total reconciliation |
| Purchase entry point | WebPublic | Widget; WebBoxOffice | Shared backend with different customer/employee entry paths |
| Post-purchase action | None; full refund; same-value exchange | Partial refund; higher/lower-value exchange | Changes financial and ticket lifecycle |
| Financial timing | Before payout; payout available | Already advanced | Distinguishes transaction proof from settlement proof |

## Coverage Ledger

No manual case has been executed. `SPT-*` entries identify the created Qase cases.

| Item | Type | Risk | Coverage | Evidence | Gap / Decision |
| --- | --- | --- | --- | --- | --- |
| Parent and child package setups with venue capability enabled | Eligibility | Valid memberships blocked | Manual-only | SPT-5083 | Requires both configured venues |
| Venue capability, global rollout, seasonality, and opt-in gate | Eligibility | Ineligible financial allocation | Manual-only | SPT-5083, SPT-5085, SPT-5086 | Frontend/backend conflict must be resolved or accepted |
| Saved-state persistence after reopen | Mutation lifecycle | Silent loss of opt-in | Manual-only | SPT-5083, SPT-5086 | Requires safe draft membership data |
| Active-member disable protection | Safety boundary | Historical financial state changes | Manual-only | SPT-5087 | No data change during execution |
| First paid ticket-batch generation | Async fulfillment | Missing tickets or missing realization | Manual-only | SPT-5084 | Requires background processing and report access |
| Additional paid batch | Async financial state | Duplicate realization | Manual-only | SPT-5088 | Requires a second future event |
| Unpaid hold-link batch | Separate payment path | Membership value allocated twice | Manual-only | SPT-5088 | Hold purchase uses separate customer payment |
| Customer receipt | Customer-visible order | Internal rows confuse or inflate purchase | Manual-only | SPT-5084 | Download after realization completes |
| Event, membership, and payout agreement | Reporting | Missing or duplicate organizer revenue | Manual-only | SPT-5084, SPT-5089, SPT-5091 | Authoritative report and payout timing need confirmation |
| Refund after realization | Recovery | Event value remains after customer refund | Manual-only | SPT-5089 | Changes QA transaction data |
| Same-value membership-ticket exchange | Recovery and ownership | Wrong credit, charge, or seat state | Manual-only | SPT-5090 | Requires assigned seating and exchange rollout |
| Package behavior control | Regression | Membership setting changes package allocation | Manual-only | SPT-5091 | Requires a known parent-mode package |
| Membership management permission | Permission | Unauthorized financial configuration | Deferred | Dashboard route and backend permission source | Retain this inherited boundary in the existing membership-permission regression; no new focused case |
| Duplicate or delayed realization message | Async idempotency | Duplicate adjustment rows | Automated: validation/error | Existing backend service-test source; tests were not executed for this note | Manual timing cannot prove this reliably; add the suggested integration coverage |
| Existing child-venue deployment backfill | Migration | Existing venues lose eligibility | Manual-only | Deployment checklist | Not a regular user workflow |
| Venue capability provisioning | Administrative control | Wrong venue is enabled | Blocked | Read-only user API field; no organizer control found | Identify owner and approved provisioning workflow |
| Disabling venue capability with active realized groups | Lifecycle transition | Existing group state becomes ambiguous | Blocked | No visible workflow or source-backed product contract | Product and finance decision required |

## Recommended Test Data

- Parent Venue Name: `Parent Venue Name`
  - Memberships enabled.
  - Waffle switch `enable_membership_revenue_realization=True`.
  - `Venue.enable_membership_revenue_realization=True`.
  - `Venue.package_revenue_realization_type='parent'`.
  - `Venue.enable_multi_layer_packages=True`.
- Child Venue Name: `Child Venue Name`
  - Waffle switch `enable_membership_revenue_realization=True`.
  - `Venue.enable_membership_revenue_realization=True`.
  - `Venue.package_revenue_realization_type='child'`.
  - `Venue.enable_multi_layer_packages=False`.
- Capability-Off Venue Name: `Capability-Off Venue Name`
  - Waffle switch `enable_membership_revenue_realization=True`.
  - `Venue.enable_membership_revenue_realization=False`.
  - `Venue.package_revenue_realization_type='child'`.
  - `Venue.enable_multi_layer_packages=False`.
  - This combination detects a client that still uses package mode as the gate.
- Organizer Employee Name: `Organizer Employee Name`, with **Manage Memberships**, transaction access, report access, and payout access.
- Restricted Employee Name: `Restricted Employee Name`, without **Manage Memberships** for inherited permission smoke if needed.
- Customer Email: `Customer Email`
- Transaction ID: `Transaction ID`, recorded after the membership purchase.
- Package Transaction ID: `Package Transaction ID`, recorded after the package purchase.
- Payout ID: `Payout ID`, recorded when the related payout becomes available.
- Purchase Date Range: `Purchase Date Range`
- Membership Name: `Membership Name`
  - Membership Level Name: `Membership Level Name`, priced at CAD $120.00.
  - No discount, service fee, tax, shipping, credit, or payment plan.
  - One current season on sale.
  - **Revenue realization** selected.
  - One group-level **Issue Tickets** benefit.
- Batch Name: `Batch Name`
- Additional Batch Name: `Additional Batch Name`
- Hold Batch Name: `Hold Batch Name`
- Event Name A: `Event Name A`
- Event Name B: `Event Name B`
- Event Name C: `Event Name C`
- Additional Event Name: `Additional Event Name`
- Hold Event Name: `Hold Event Name`, with a CAD $25.00 public ticket.
- Unsold Membership Name: `Unsold Membership Name`, used for renewal-frequency editing.
- Active Membership Name: `Active Membership Name`, with at least one active member.
- Assigned-Seating Membership Name: `Assigned-Seating Membership Name`
- Section Name: `Section Name`
- Row Name: `Row Name`
- Original Seat Number: `Original Seat Number`
- Replacement Seat Number: `Replacement Seat Number`, available at the same price as the original seat.
- Package Name: `Package Name`, priced at CAD $90.00 with three known child event tickets and a recorded expected package-level report result.
- A saved Dashboard report or approved export that separately shows membership and event revenue for the named records.
- Use only QA-owned records. Preserve SPT-5084 data until SPT-5088, SPT-5089, and report review finish; then archive unsold memberships and retain completed financial records according to QA data policy.

## Qase-Ready Manual Test Cases

### SPT-5083: Dashboard - Memberships - Verify seasonal revenue realization across package configurations

**Priority:** High  
**Type:** Regression  
**Area:** Membership setup

**Description:** Validates that an organizer can create and reopen a seasonal membership with **Revenue realization** selected when the venue is provisioned for membership revenue realization, whether package revenue uses parent or child mode. This protects against package settings incorrectly hiding or clearing membership configuration.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* `Organizer Employee Name` is signed in to the venue selected by PackageSetup and can manage memberships.
* Waffle switch `enable_membership_revenue_realization=True`.
* ParentMultiLayer has `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* ChildStandard has `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='child'`, and `Venue.enable_multi_layer_packages=False`.
* Memberships and seasonal memberships are enabled for both venues.

**Postconditions:**

* Archive the created membership only after confirming it has no members or financial records.
* Do not change either venue's package configuration.

**Tags:** dashboard, memberships

**Parameters:**
PackageSetup: ParentMultiLayer, ChildStandard

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Memberships and select **Create membership**. | Package Setup: PackageSetup | The **Create membership** page opens for the selected venue. |
| Enter a unique membership name. | Membership Name: Membership Name | The name is accepted. |
| Open **Renewal Frequency** and select **Seasonal**. | Renewal Frequency: Seasonal | Seasonal guidance appears and **Revenue realization** is visible and selected. |
| Review the text under **Revenue realization**. | — | The page explains that revenue can be allocated across benefits as they are delivered or recognized upfront. |
| Select **Create membership**. | — | **Membership created successfully** appears and the new membership opens. |
| Open **Edit Membership** for the new membership. | Membership Name: Membership Name | **Renewal Frequency** remains Seasonal and **Revenue realization** remains selected. |
| Reload the page. | — | The saved Seasonal frequency and selected **Revenue realization** value remain unchanged. |

### SPT-5084: Core - Memberships - Verify the first paid ticket batch realizes one membership purchase across events

**Priority:** High  
**Type:** End-to-end  
**Area:** Membership purchase and ticket fulfillment

**Description:** Validates that one CAD $120.00 seasonal membership purchase at a parent-mode, multi-layer venue produces one membership and three paid benefit tickets, allocates CAD $40.00 to each first-batch event, does not charge the customer again, and keeps reports and payouts balanced.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |
| Widget | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:**

* `Parent Venue Name` and `Organizer Employee Name` meet the Recommended Test Data setup.
* Backend state is Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* `Membership Name` is published, Seasonal, on sale, and has **Revenue realization** selected.
* The membership has one `Membership Level Name` level priced at CAD $120.00 with no fees, tax, discounts, credits, or payment plan.
* Its **Issue Tickets** benefit has no generated ticket batch yet.
* `Event Name A`, `Event Name B`, and `Event Name C` are future events and belong to the same venue.
* `Customer Email` has no existing `Membership Name` membership.
* Record the membership, event, and payout report values before purchase.

**Postconditions:**

* Preserve the membership, customer, transaction, first batch, and issued tickets for SPT-5088 and SPT-5089.
* Record the transaction ID and the three event report values.

**Tags:** memberships, transactions, reports

**Parameters:**
PurchaseEntryPoint: WebPublic, Widget, WebBoxOffice

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Buy one `Membership Level Name` membership through the selected entry point. | Purchase Entry Point: PurchaseEntryPoint; Membership Level Name: Membership Level Name; Price: CAD $120.00 | Checkout completes with one CAD $120.00 charge, one order, and one membership for the selected customer. |
| Open the customer's order receipt. | Transaction ID: Transaction ID | The receipt shows the membership purchase and does not show Revenue Realization Adjustment or Revenue Realization Negation as customer items. |
| In Dashboard, open Memberships → `Membership Name` → **Membership Benefits**. | Membership Name: Membership Name | The **Issue Tickets** benefit is shown. |
| Select **Open ticket manager**, then select **Create ticket batch**. | Benefit Name: Issue Tickets | The **New ticket batch** form opens. |
| Enter the batch name and add the three events under **Items in ticket batch**. | Batch Name: Batch Name; Events: Event Name A, Event Name B, Event Name C | All three events appear once and the page warns that the first batch allocates membership revenue equally across its events. |
| Under **Ticket payment method**, select **Send tickets that are paid for**, then select **Save**. | — | **Batch created** appears and the batch is listed under **Drafts**. |
| Select **Send now** for the draft and confirm **Send now**. | Batch Name: Batch Name | **Batch sent** appears and the batch moves to **Sent**. |
| Sign in as the customer and open My Account → Memberships → `Membership Name` → **Upcoming**. | Customer Email: Customer Email; Membership Name: Membership Name | Event Name A, Event Name B, and Event Name C each show one usable ticket and no additional customer payment is requested. |
| Open Web Box Office → Transactions and search for the recorded transaction ID. | Transaction ID: Transaction ID | The original transaction still represents one customer charge and one membership order. |
| Run the approved event revenue report for the three events. | Events: Event Name A, Event Name B, Event Name C; Purchase Date Range: Purchase Date Range | Each event shows CAD $40.00 of realized membership value and the three events total CAD $120.00. |
| Run the matching membership and event reconciliation. | Membership Name: Membership Name; Events: Event Name A, Event Name B, Event Name C | Membership and event rows together recognize CAD $120.00 once, not CAD $240.00. |
| After the QA payout is available, open Dashboard → Financials → Payouts and review the same records. | Payout ID: Payout ID | The event payout values total CAD $120.00 and the balancing membership rows add CAD $0.00 of extra payout. |

### SPT-5085: Dashboard - Memberships - Verify ineligible memberships do not show revenue realization

**Priority:** High  
**Type:** Negative  
**Area:** Membership eligibility

**Description:** Validates that an organizer cannot select membership revenue realization for a Seasonal membership when the venue capability is off or the global rollout is off. Keeping the renewal frequency Seasonal isolates the two backend eligibility gates and protects against saving a financial option that the backend will ignore or clear.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* `Organizer Employee Name` can manage memberships in each venue used by EligibilityState.
* VenueCapabilityOff uses Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=False`, `Venue.package_revenue_realization_type='child'`, and `Venue.enable_multi_layer_packages=False`.
* GlobalRolloutOff uses Waffle switch `enable_membership_revenue_realization=False`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.

**Postconditions:** Archive the created membership after confirming it has no members or financial records.

**Tags:** dashboard, memberships, edge-case

**Parameters:**
EligibilityState: VenueCapabilityOff, GlobalRolloutOff

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Memberships and select **Create membership** in the venue for EligibilityState. | Eligibility State: EligibilityState | The **Create membership** page opens. |
| Enter a unique membership name. | Membership Name: Membership Name | The name is accepted. |
| Open **Renewal Frequency** and select **Seasonal**. | Renewal Frequency: Seasonal | Seasonal is shown as the selected renewal frequency. |
| Review the form below **Renewal Frequency**. | — | **Revenue realization** is not shown. |
| Select **Create membership**. | — | The membership is created without a revenue-realization selection. |
| Open **Edit Membership** for the created membership. | Membership Name: Membership Name | **Revenue realization** remains unavailable for the selected ineligible state. |

### SPT-5086: Dashboard - Memberships - Verify changing away from Seasonal clears revenue realization

**Priority:** High  
**Type:** Regression  
**Area:** Membership editing

**Description:** Validates that an organizer can change an unsold revenue-realizing membership from Seasonal to Yearly and that the revenue option is removed after save and reopen. This protects against a non-seasonal group retaining an ineligible financial setting.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* `Organizer Employee Name` is signed in to `Parent Venue Name` and can manage memberships.
* Backend state is Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* `Unsold Membership Name` is a draft Seasonal membership with **Revenue realization** selected.
* The membership has no active members, orders, or generated ticket batches.

**Postconditions:** Restore the membership to Seasonal with **Revenue realization** selected, or archive it if no later case uses it.

**Tags:** dashboard, memberships

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Memberships → `Unsold Membership Name` → **Edit Membership**. | Membership Name: Unsold Membership Name | Seasonal and **Revenue realization** are shown as selected. |
| Change **Renewal Frequency** to **Yearly**. | Renewal Frequency: Yearly | **Revenue realization** disappears from the form. |
| Select **Save**. | — | **Membership updated successfully** appears. |
| Reload **Edit Membership**. | — | Yearly remains selected and **Revenue realization** is not shown. |
| Change **Renewal Frequency** back to **Seasonal**. | Renewal Frequency: Seasonal | **Revenue realization** becomes available and selected for the eligible venue. |
| Select **Save**, then reload the page. | — | Seasonal and the selected revenue option persist. |

### SPT-5087: Dashboard - Memberships - Verify active members protect revenue realization from being disabled

**Priority:** High  
**Type:** Permission and state  
**Area:** Membership editing

**Description:** Validates that an organizer cannot turn off revenue realization after the membership has an active member. This protects the financial setup already used by a membership purchase and generated benefits.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* `Organizer Employee Name` is signed in to `Parent Venue Name` and can manage memberships.
* Backend state is Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* `Active Membership Name` is Seasonal with **Revenue realization** selected.
* The membership has at least one active member.

**Postconditions:** No membership setting or member record is changed.

**Tags:** dashboard, memberships, employee-permissions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Memberships → `Active Membership Name` → **Edit Membership**. | Membership Name: Active Membership Name | **Revenue realization** is visible and selected. |
| Try to change **Revenue realization**. | — | The control is disabled and its selected value cannot be changed. |
| Reload the page. | — | **Revenue realization** remains selected and the active member remains unchanged. |

### SPT-5088: Dashboard - Memberships - Verify later and unpaid ticket batches do not reallocate membership revenue

**Priority:** High  
**Type:** Regression  
**Area:** Membership ticket batches

**Description:** Validates that an organizer can send a later paid ticket batch or a separate unpaid hold-link batch without redistributing the CAD $120.00 membership value already assigned to Event Name A, Event Name B, and Event Name C. This protects against duplicate event revenue.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* SPT-5084 is complete for `Membership Name`, and Event Name A, Event Name B, and Event Name C each show CAD $40.00.
* Keep the SPT-5084 backend state unchanged: Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* `Additional Event Name` is available for AdditionalPaidBatch.
* `Hold Event Name` and its CAD $25.00 ticket are available for UnpaidHoldLinkBatch.
* The same customer remains an active member.

**Postconditions:**

* Preserve both batches and report results until financial review is complete.
* Allow the hold link to expire or complete its separate purchase according to the selected execution data.

**Tags:** dashboard, memberships, transactions

**Parameters:**
LaterBatchType: AdditionalPaidBatch, UnpaidHoldLinkBatch

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Memberships → `Membership Name` → **Membership Benefits** → **Open ticket manager**. | Membership Name: Membership Name | Ticket Manager shows the sent first batch. |
| Create a new batch and add the event for LaterBatchType. | Batch Name: Additional Batch Name or Hold Batch Name; Event Name: Additional Event Name or Hold Event Name | The new event appears once in the batch. |
| Select the payment method for LaterBatchType. | Payment Method: **Send tickets that are paid for** for AdditionalPaidBatch; **Send hold link for unpaid tickets** for UnpaidHoldLinkBatch | The chosen delivery method is shown; the hold-link setup requests its expiry and price. |
| Save the batch, select **Send now**, and confirm **Send now**. | Later Batch Type: LaterBatchType | The new batch is sent once. |
| Open the customer's My Account membership. | Customer Email: Customer Email; Membership Name: Membership Name | AdditionalPaidBatch shows one Additional Event Name ticket without payment; UnpaidHoldLinkBatch provides a separate purchase link for Hold Event Name. |
| For UnpaidHoldLinkBatch, complete the CAD $25.00 hold-link purchase. | Event Name: Hold Event Name; Price: CAD $25.00 | One separate CAD $25.00 ticket transaction is created and the original membership transaction is unchanged. |
| Run the event and membership reconciliation report. | Events: Event Name A, Event Name B, Event Name C, Additional Event Name, Hold Event Name; Transaction ID: Transaction ID | Event Name A, Event Name B, and Event Name C remain CAD $40.00 each; Additional Event Name receives no additional membership allocation; Hold Event Name shows only its separate ticket-sale value when purchased. |
| Review the original membership transaction. | Transaction ID: Transaction ID | No duplicate customer charge or second allocation of the CAD $120.00 membership appears. |

### SPT-5089: Web Box Office - Memberships - Verify a full refund reverses realized event revenue

**Priority:** High  
**Type:** Regression  
**Area:** Membership refunds

**Description:** Validates that a Box Office employee can fully refund a membership after its paid benefit tickets were generated and that the customer, event reports, membership totals, and payout state reflect one refund without leaving realized event value behind.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Dashboard | Desktop |

**Preconditions:**

* SPT-5084 is complete and the original purchase, first batch, customer membership, and three event tickets are recorded.
* Keep the SPT-5084 backend state unchanged: Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* The transaction is eligible for a full refund in the QA environment.
* `Organizer Employee Name` can administer transactions and view reports and payouts.
* Record the refund preview, including any intentionally non-refundable fee.

**Postconditions:**

* Preserve the refunded transaction and report results for review.
* Do not reuse the refunded membership or its event tickets.

**Tags:** memberships, refunds, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Box Office → Transactions and search for the SPT-5084 transaction ID. | Transaction ID: Transaction ID | The CAD $120.00 membership transaction opens with its refundable items. |
| Start a full refund for the membership and review the preview. | Refund Items: All refundable membership items | The preview shows one refund amount and identifies any fee that will intentionally remain. |
| Confirm the refund. | — | One refund completes for the previewed amount. |
| Open the customer's membership and event tickets. | Customer Email: Customer Email; Membership Name: Membership Name | The refunded membership is no longer active, the three issued tickets cannot be used, and no second usable copy of any ticket appears. |
| Run the membership and event reconciliation report. | Membership Name: Membership Name; Events: Event Name A, Event Name B, Event Name C | The membership refund reverses the realized event value, and combined customer and organizer totals match the completed refund. |
| Review the related payout when available. | Payout ID: Payout ID | No organizer payout remains for the refunded membership value; only a fee explicitly excluded from the refund may remain. |

### SPT-5090: WebPublic - Memberships - Verify a same-value generated ticket exchange uses realized event value

**Priority:** High  
**Type:** Regression  
**Area:** Membership ticket exchange

**Description:** Validates that a customer can exchange an eligible assigned-seat ticket issued from a revenue-realizing membership for a same-value replacement. This protects against using a zero generated-ticket price, charging the customer again, or leaving both seats owned.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* The assigned-seating test membership uses the parent-mode, multi-layer venue and has membership revenue realization enabled.
* Backend state is Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* `Customer Email` owns the generated paid ticket for `Event Name A` at `Section Name`, `Row Name`, `Original Seat Number`.
* `Replacement Seat Number` in the same section and row is available at the same realized event value.
* Itemized ticket exchanges are enabled and `Event Name A` is inside the allowed exchange window.
* Record the original ticket, seat, transaction, and Event Name A revenue.

**Postconditions:**

* Preserve the exchange transaction and final seat ownership for review, or exchange back only through the supported customer flow.
* Confirm `Original Seat Number` is available before another case uses it.

**Tags:** memberships, exchanges, assigned-seating

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the customer and open My Account → Memberships → the assigned-seating membership. | Customer Email: Customer Email; Membership Name: Assigned-Seating Membership Name | The **Event Timetable** shows the upcoming Event Name A ticket. |
| Select **Exchange tickets**. | Event Name: Event Name A; Original Seat Number: Original Seat Number | The exchange flow opens and offers eligible replacement tickets for Event Name A. |
| Select the same membership level and replacement seat. | Section Name: Section Name; Row Name: Row Name; Replacement Seat Number: Replacement Seat Number | The replacement uses the realized value of Original Seat Number and the remaining amount is CAD $0.00. |
| Complete the exchange. | — | One ticket for Replacement Seat Number is issued without a new customer charge. |
| Reopen the Event Name A ticket details. | Customer Email: Customer Email | Original Seat Number is no longer usable, Replacement Seat Number is usable, and the customer owns only one Event Name A seat. |
| Review the exchange transaction and Event Name A report. | Transaction ID: Transaction ID; Event Name: Event Name A | The replacement and exchange adjustment balance to CAD $0.00, and Event Name A's recognized value does not increase or disappear. |

### SPT-5091: Core - Packages - Verify package revenue behavior remains independent from membership realization

**Priority:** High  
**Type:** Regression  
**Area:** Package and membership financial reporting

**Description:** Validates that enabling membership revenue realization at a parent-mode, multi-layer venue does not change how an unchanged ticket package is reported, while an eligible membership at the same venue still allocates value to its benefit events.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Dashboard | Desktop |

**Preconditions:**

* `Parent Venue Name` uses Waffle switch `enable_membership_revenue_realization=True`, `Venue.enable_membership_revenue_realization=True`, `Venue.package_revenue_realization_type='parent'`, and `Venue.enable_multi_layer_packages=True`.
* `Package Name` is a published CAD $90.00 package with three known child event tickets and no fees, tax, discounts, or credits.
* SPT-5084 report results for `Membership Name`, Event Name A, Event Name B, and Event Name C are available.
* A second customer account has not purchased the control package.

**Postconditions:** Preserve the package transaction and reconciliation report for review.

**Tags:** packages, memberships, reports

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Buy one `Package Name` through WebPublic checkout. | Package Name: Package Name; Price: CAD $90.00 | One CAD $90.00 charge, one order, and the expected package tickets are created. |
| Open the package receipt. | Transaction ID: Package Transaction ID | The receipt shows the package purchase and its customer-facing items without membership realization rows. |
| Run the approved package report for the control transaction. | Package Name: Package Name | Revenue follows the recorded parent-mode package expectation. |
| Run the membership event report for the SPT-5084 records. | Membership Name: Membership Name; Events: Event Name A, Event Name B, Event Name C | The membership still allocates CAD $40.00 to each event. |
| Compare the package and membership report results. | Transaction IDs: Membership Transaction ID, Package Transaction ID | Each transaction totals its own purchase once, and the membership capability does not change the package allocation method. |

## Minimum Execution Set

Execute in this order:

1. **SPT-5083 / ParentMultiLayer** — proves the new client eligibility contract and persistence.
2. **SPT-5084 / WebPublic** — proves clean purchase, first paid batch, fulfillment, receipt, reports, and payout agreement.
3. **SPT-5085 / VenueCapabilityOff** — detects the highest-risk frontend/backend gating mismatch.
4. **SPT-5087** — protects existing active membership financial state.
5. **SPT-5088 / AdditionalPaidBatch** — proves no duplicate realization.
6. **SPT-5089** — proves refund reversal across the realized financial chain.
7. **SPT-5090** — proves generated ticket value and seat ownership during exchange.
8. **SPT-5091** — proves package behavior remains independent.

Run SPT-5083 / ChildStandard and SPT-5085 / GlobalRolloutOff as the rollback and compatibility extension. Run Widget and WebBoxOffice values for SPT-5084 after the WebPublic baseline passes because source shows the purchase entry points share the same backend realization path.

## Suggested Automated Coverage

### P0

- Update the frontend venue-session type and membership eligibility helper to use the venue membership capability, then cover ParentMultiLayer enabled, ChildStandard enabled, child capability off, global rollout off, and non-seasonal states.
- Extend `pages/dashboard/memberships/components/MembershipGroupForm.ts` with **Revenue realization** assertions and add a Dashboard create/reopen scenario for the parent-mode venue.
- Add an integration test that purchases one parent-mode membership, generates the first three-event paid batch, runs the realization worker, and proves one original value, three event allocations, balanced negations, linked tickets, and no duplicate rows.
- Add idempotency coverage for repeated or delayed member-ticket-batch messages.

### P1

- Reuse `tests/core/checkout/memberships/checkout-memberships.test.ts` to cover WebPublic, Widget, and WebBoxOffice purchase entry points with one shared revenue-realizing membership fixture.
- Add later-paid-batch and hold-link tests proving no second membership allocation.
- Add full-refund integration assertions across event allocations, membership totals, and payout selectors.
- Extend the customer membership Event Timetable exchange coverage to prove a same-value replacement uses the linked realized value and leaves one usable seat.
- Add a package control at the same venue to prove package allocation is unchanged.

### Keep Manual

- Deployment backfill verification on real pre-existing child venues.
- Final report and payout reconciliation until the authoritative visible report, payout timing, and stable QA financial data are confirmed.

## Open Questions

1. Should the Dashboard show **Revenue realization** from the new venue membership capability? The current backend and frontend disagree, and SPT-5083 cannot pass for ParentMultiLayer until the client contract is resolved.
2. Which team and approved tool provision or remove the venue membership revenue capability in QA and production?
3. Which Dashboard report or export is the authoritative visible proof for event-level realized membership value, membership-level negation, and payout reconciliation?
4. What is the supported QA procedure for waiting for or generating the payout used in SPT-5084 and SPT-5089?
5. What should happen to saved opted-in groups and active members if the venue capability is turned off after purchases exist?
6. Should the organizer see a warning or explicit result when a saved opt-in is cleared because the venue is ineligible, instead of receiving a successful save with a changed value?
7. Is the first-batch-only rule an intentional permanent product contract for all paid ticket batches, and how should organizers correct an event omitted from the first batch after allocations lock?


## 2026-09-30 — Suite 1054 membership advance coverage review

**Intent:** Determine whether the existing revenue-realization cases prove that membership advances pay the organizer once, regardless of whether realization occurs before or after the advance. This review is distinct from the earlier venue-eligibility scope and SPT-940's advanced-sale void scenario.

**Verdict:** Useful basic realization coverage, but insufficient for membership advances. No case in suite 1054 creates a membership advance and reconciles it with later settlement. This is a confirmed case-content gap within this suite, not a reproduced financial defect or a claim that no other Qase suite has advance coverage.

### Qase evidence

Read-only Qase review on 2026-09-30: suite 1054, **Revenue Realization**, under suite 89; no child suites; nine cases, SPT-5083 through SPT-5091. Reviewed full descriptions, prerequisites, parameters, steps, expected results, and cleanup from one suite-scoped paginated read. Raw response: `/private/tmp/qase-membership-advance-suite1054.json`. No browser inspection, financial mutations, test execution, or Qase writes occurred.

| Cases | Existing proof | Advance assessment |
| --- | --- | --- |
| SPT-5083, SPT-5085, SPT-5086, SPT-5087 | Setup eligibility, saved setting, changing renewal frequency, active-member protection | Configuration coverage; not advance creation |
| SPT-5084 | First paid batch, three tickets, event allocation, one customer charge, eventual payout | Closest base case, but no advance creation or prior-advance deduction |
| SPT-5088 | Later paid and separately purchased hold-link batches do not reallocate original revenue | Protects allocation duplication, not repeated payout |
| SPT-5089 | Full refund and realized revenue/payout effects | No already-advanced setup; cannot prove post-advance refund accounting |
| SPT-5090 | Same-value generated-ticket exchange | Different workflow; no advance proof |
| SPT-5091 | Package behavior remains separate from membership realization | Control case; no advance proof |

### Missing proof targets

| Target | Required result | Coverage status |
| --- | --- | --- |
| Realize → advance → settle | Create a membership-only advance after ticket realization; carry every allocation/offset pair onto that advance; later settlement does not pay the same eligible value again | Deferred: absent from nine reviewed manual cases; backend integration test exists, execution unverified |
| Advance → realize → settle | Advance the original membership first; generate/realize benefit tickets later; event allocation does not create another organizer payout | Deferred: absent from reviewed manual cases; backend integration test exists, execution unverified |
| Repeat processing / new eligible revenue | Existing pairs keep their links and are not paid twice; only new complete pairs receive new balanced offsets | Deferred backend verification; source tests exist |
| Unsafe mixed or corrupt records | Membership plus its event realization selected together, one-sided advance links, already-settled pending rows, or incomplete/unbalanced pairs fail without partial changes | Deferred backend verification; do not manufacture corrupt live financial data for manual QA |
| Renewal source | A membership renewal carries its related realization pairs correctly | Deferred backend verification; source test exists |

Use one controlled membership with an Issue tickets benefit and multiple events. For the clean example, an eligible organizer payout value of $120 advanced at 100% means $120 paid early and $0 additional settlement for that same value. This is eligible organizer money, not automatically the customer's charge; fees, taxes, other revenue, cutoff date, and thresholds must be accounted for. Keep membership and event advances separate for the primary success run.

### Source-backed findings

Current backend checkout reviewed at `a2ca49759da75d63492095f5ff8f52e73e480adb`; this general advance review is not restricted to the earlier void commit and involves no diff or branch comparison.

Backend root: `/Users/christianvaldez/Documents/Showpass/repos/web-app`.

- `apps/financials/services/payout_service/advance/advance_payout_service.py`: AdvanceService selects original membership/renewal sources and calls MembershipRealizationAdvanceService after source linkage.
- `apps/financials/services/payout_service/advance/advance_selector.py`: membership selection excludes realization descendants; targets subtract attributed prior advances and obey percentage, cutoff, include/exclude scope, and thresholds.
- `apps/financials/services/payout_service/advance/membership_realization_advance_service.py`: source and descendant locks; one balanced negation per adjustment; balanced offsets linked to the original advance invoice; existing links preserved; same-run source/event overlap and unsafe partial/settled pairs rejected.
- `apps/financials/tests/services/revenue_realization/test_membership_revenue_realization_service.py`: `test_advance_member_then_realize_revenue_and_settle__3_events`, `test_realize_revenue_then_advance_member_and_settle__3_events`, and `test_realize_revenue_then_advance_member__negation_filter_disabled` explicitly reconcile subsequent settlement without double payment.
- `apps/financials/tests/services/payout_service/advance/test_membership_realization_advance_service.py`: repeat/idempotency, new pair only, partial/settled rejection, overlapping selection, pair-level balance, missing negation, and renewal source tests. These tests were read, not run.

Frontend root: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`.

- `packages/core/src/app-contexts/dashboard/features/admins/admin-actions/ui/pages/AdvanceImports.web.tsx`: admin advance-import workflow has upload, validated preview/selection, processing, and completion states; CSV supports Advance Memberships and membership-group include/exclude lists. An organizer viewing Payouts is not the actor creating the advance.
- The advance import is financial mutation; a future manual draft needs an authorized admin/finance actor, an isolated controlled sale, exact CSV values/cutoff/thresholds, and saved advance plus settlement evidence. No real payout should be generated as part of a read-only review.

### Case quality limitations

- SPT-5084's payout step waits for a payout to become available; it neither initiates an advance nor identifies advance-versus-settlement amounts.
- SPT-5084 refers to Recommended Test Data and preserves records for local TC labels. SPT-5088, SPT-5089, and SPT-5091 require TC-2 or its results. These dependencies make the live cases incomplete when executed on their own.
- “Approved event revenue report” and “matching reconciliation” do not name the report, filters, or columns to compare. Those checks need concrete instructions.
- Several cases require package mode/multi-layer setup even though effective membership realization eligibility is independent of package mode; keep that setup for deliberate package-configuration coverage rather than general advance prerequisites.

### Recommendation

Keep SPT-5084 focused on first-batch realization and strengthen its standalone data/report instructions. Add focused advance lifecycle coverage to suite 1054 for both orders, using a single AdvanceOrder parameter only if the two preparation sequences remain easy to follow; otherwise use two short cases. Do not expand SPT-940's void case into advance creation. Keep corruption, locks, replay, and renewal linkage in backend regressions with attached execution evidence.

No new cases have been drafted or created by this review. Exact advance-import permission/CSV preparation and concrete payout-report proof still need tracing before calling a future manual advance case Qase-ready. No release-readiness claim follows from the presence of source tests.


## 2026-09-30 — New membership advance lifecycle case

Testing intent: prove Finance can advance seasonal membership revenue before or after its allocation to benefit events while the customer is charged once and the organizer receives the eligible revenue once. This is money/payout and reporting coverage, not live execution evidence.

### Sources reviewed for the new case

Backend root: `/Users/christianvaldez/Documents/Showpass/repos/web-app`.

* `apps/financials/services/advance_import/fields.py`, `importer.py`, `persister.py`: exact CSV schema, fraction-based advance percentage, organization/group selection, preview validation and persistence.
* `apps/financials/api/admin/viewsets/import_jobs.py`, `apps/main/api/import_job_workflow.py`, `apps/core/api/viewsets/audiences.py`, `apps/core/api/permissions.py`: advance imports require Showpass admin access (`IsAdminUser`, staff account); ordinary membership management permission does not grant this access.
* `apps/financials/services/payout_service/advance/advance_payout_service.py`, `advance_selector.py`, `membership_realization_advance_service.py`: membership-only selection and balanced realization/negation advance offsets.
* `apps/financials/services/payout_service/settlement/settlement_selector.py`, `apps/financials/services/settlements/venue_settlement_generation.py`, `apps/financials/tasks/settlements.py`: subsequent payout generation is scheduled; **Mark Invoices Paid** and **Custom settlements** are not controls for running ordinary settlement.
* `apps/financials/api/venue_based/viewsets/invoices.py`, `apps/financials/queries/invoice/projections.py`: payout details and the financial summary of the linked source items.
* `apps/financials/tests/services/revenue_realization/test_membership_revenue_realization_service.py`: integration examples for both sequence orders followed by settlement. Reviewed, not run.

Frontend root: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`.

* `packages/core/src/app-contexts/dashboard/features/admins/admin-actions/constants/admin-actions-config.ts`, `ui/pages/AdvanceImports.web.tsx`: **Create advances**, **Download Template**, **Upload CSV file**, preview and asynchronous completion.
* `packages/core/src/app-contexts/dashboard/shared/import-workflow/ui/components/ImportUploadForm.web.tsx`, `ImportPreviewStep.web.tsx`: **Preview**, row selection and **Confirm Import**.
* `packages/core/src/app-contexts/dashboard/features/memberships/ui/components/ticket-manager/`: paid batch creation and sending.
* `packages/core/src/app-contexts/dashboard/features/financials/constants/financials-config.ts`, `packages/core/src/app-contexts/dashboard/features/reports/payouts/ui/pages/ReportsPayoutsDetailView.web.tsx`, `ui/components/PayoutOverview/PayoutOverview.web.tsx`, `PayoutBreakdown/PayoutBreakdown.web.tsx`: Finance permissions, **Payout Total**, **Payout ID**, **Payout Summary**.

### Source-backed behavior, risks, and execution boundaries

* Both sequence orders retain the original sale value and balance event allocations against membership negations. Advance creation must not treat the allocations as additional eligible sales.
* A 100% advance is entered as `1.00`. For CAD $120.00 of fee-free eligible proceeds, the advance magnitude is CAD $120.00 and later settlement adds CAD $0.00. Payout invoices may display outgoing money using a negative sign.
* The highest risks are missing allocation links, selecting membership and event revenue together, and paying the same proceeds again after event payout eligibility.
* This case uses one isolated membership group because advance selection is group-based, not customer-based. Each parameter run requires a separate group and purchase so an earlier advance cannot change the next run.
* Minimum execution set: both `AdvanceOrder` values. Manual execution is pending; no financial operations or browser checks were performed during case creation.
* Suggested automation: retain both source integration sequences and add durable assertions for original financial values, all paired advance links, total advance, and zero additional settlement. Corrupt-pair rejection, duplicate overlaps, refunds, partial advances, fees, taxes and renewal sources remain deferred from this focused manual case.
* Assumptions and unknowns: the deployed environment provides the reviewed admin import and payout pages. Finance must supply the next scheduled settlement run after all three events become payout eligible; until that run completes, the final payout assertion remains pending. An absent payout alone does not prove successful settlement.
* Detailed per-event CAD $40.00 allocation and internal paired links are source-backed setup expectations, with automated verification recommended; the advance detail summary queries settlement links and is not a reliable manual view of advance links. The manual case proves ticket delivery, unchanged advance/original amounts, and no duplicate proceeds after settlement.
* Open question for execution planning: what calendar time will the selected organization's eligible settlement run finish? This does not block creating the case.

### TC-1: Dashboard - Memberships - Advance revenue before or after event allocation without paying it twice

**Title:** Dashboard - Memberships - Advance revenue before or after event allocation without paying it twice

**Description:** Verify Finance can create a full advance, meaning an organizer payout before the normal payout date, for a seasonal membership before or after its revenue is allocated to generated event tickets. The original purchase amount must stay correct, and sending the event tickets must not cause the later payout to pay the same revenue again.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

Prepare one new seasonal membership group for each parameter run. Enable **Revenue realization** and add an **Issue Tickets** benefit. Sell one CAD $120.00 membership with CAD $120.00 eligible organizer proceeds: no fees, tax, discount, credits or payment plan. The group must contain only this sale and have no previous advance, payout, refund or generated ticket batch. Prepare three future events in the same organization, with one available ticket per event for that member; their first paid batch allocates CAD $40.00 to each event. Record the organization and membership group IDs from their admin records for the advance file.

| AdvanceOrder | Order of actions |
| --- | --- |
| BeforeRealization | Create the advance first, then create and send the first paid ticket batch. |
| AfterRealization | Create and send the first paid ticket batch first, then create the advance. |

In **Download Template**, keep every header unchanged and add exactly one data row:

| CSV field | Value |
| --- | --- |
| Cutoff Date | The day after the membership purchase, in MM/DD/YYYY, earlier than all three event end dates |
| Venue ID | The recorded organization ID |
| Advance Percentage | 1.00 |
| Minimum Amount | 0.00 |
| Maximum Amount | 120.00 |
| Advance Events | False |
| Event IDs to Include | Empty |
| Event IDs to Exclude | Empty |
| Advance Products | False |
| Product IDs to Include | Empty |
| Product IDs to Exclude | Empty |
| Advance Memberships | True |
| Membership Group IDs to Include | The recorded membership group ID |
| Membership Group IDs to Exclude | Empty |

**Preconditions:**

* A Showpass finance administrator has admin access; the organization employee has **Manage Memberships**, **Manage Reports** and **Manage Financials** permissions.
* Prepare the membership purchase and three events described in this case in an organization where no real bank transfer will be triggered by the test advance.
* Finance has recorded a scheduled payout run after all three events become payout eligible; retain the records until that run finishes.

**Postconditions:**

* Retain the sale, advance, ticket batch and later payout records with their transaction IDs as execution evidence.
* Do not refund or void the purchase until Finance has reviewed the completed payout check.

**Tags:** memberships, payouts, admin-actions

**Parameters:**
AdvanceOrder: BeforeRealization, AfterRealization

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Financials → Transactions and find the customer's membership purchase. Record its transaction ID and amount. | The prepared CAD $120.00 purchase | One completed membership sale shows CAD $120.00. |
| Open Dashboard → Memberships, select the membership, then open Membership Benefits → Issue Tickets → Open ticket manager. | The prepared membership | No ticket batch has been sent for this membership. |
| For AfterRealization, select Create ticket batch, add the three events under Items in ticket batch, select Send tickets that are paid for, save, then select Send now and confirm. For BeforeRealization, leave the ticket manager unchanged. | AdvanceOrder; one ticket per event | AfterRealization has one sent paid batch; BeforeRealization has no sent batch. |
| As the finance administrator, open Dashboard → Admin → Admin actions → Create advances, then select Download Template. | — | The advance CSV template downloads. |
| Fill one row using the CSV values in this case, select Upload CSV file, and select Preview. | The completed membership-only advance CSV | One valid row identifies the selected organization and membership group without validation errors. |
| Select only that row and select Confirm Import. Wait for processing to finish. | One selected row | Advance import complete appears with one advance processed and no failed row. |
| As the organization employee, open Dashboard → Financials → Payouts and open the new advance. Record its Payout ID and Payout Total. | Advance created by the import | The advance represents CAD $120.00 of outgoing organizer proceeds, with no additional advance for the same sale. |
| For BeforeRealization, return to the membership ticket manager, create the first batch with the three events, select Send tickets that are paid for, save, then select Send now and confirm. For AfterRealization, open the existing batch under Sent. | AdvanceOrder; one ticket per event | Exactly one paid batch is sent and the member receives one ticket for each event. |
| Reopen the advance under Financials → Payouts and review Payout Total. | Recorded Payout ID; the membership and three events | The advance remains CAD $120.00 after the tickets are sent. |
| Reopen the original purchase under Financials → Transactions. | Recorded sale transaction ID | The purchase remains CAD $120.00 with no extra customer charge, refund or void. |
| After Finance confirms the recorded scheduled payout run completed successfully for all three eligible events, reopen Financials → Payouts and review the membership and event payouts from that run. | The recorded scheduled payout run and the three events | Additional organizer proceeds for this purchase total CAD $0.00; the advance and later payouts together total CAD $120.00. |

### Qase creation and saved-field verification

Created [SPT-5298](https://app.qase.io/case/SPT-5298) in suite **1054 — Revenue Realization** on 2026-09-30 at the user's explicit request. Local draft: **TC-1** in the new advance lifecycle section. Dry-run reviewed before apply; a fresh Qase read matched the title, full standalone Description, three Preconditions, Postconditions, tags, both `AdvanceOrder` values and all 11 steps. Existing cases were unchanged. Manual execution and scheduled payout verification remain pending.
