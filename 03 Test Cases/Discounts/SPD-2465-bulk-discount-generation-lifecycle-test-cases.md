---
title: SPD-2465 Bulk Discount Generation Lifecycle Test Cases
date: 2026-07-17
tags:
  - qa/test-cases
  - discounts
  - dashboard
  - api-testing
status: draft
---

# SPD-2465 Bulk Discount Generation Lifecycle Test Cases

## Testing Intent

We are testing whether an organizer can generate, download, edit, and redeem venue bulk discount codes while the code count, redemption permissions, publication state, and CSV availability remain consistent; this matters because a background-task failure could expose unusable codes, and we will prove the invariant through lifecycle responses, exact permission audits, CSV contents, and representative redemption.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Async final state with live sales and discount impact |
| Business invariant | A bulk discount order is ready only when the requested number of unique codes exists and every code has the exact configured redemption permissions. |
| User or business impact | Organizers can distribute unusable codes, and customers can be blocked from receiving an intended discount. |
| Failure mode | Generated-code count is treated as completion while one or more codes are private, missing permissions, duplicated, or downloadable before the order is ready. |
| Observable proof | Lifecycle fields reach `ready`; premature CSV requests return HTTP 409; the CSV count is exact; the permission audit has zero failures; sampled codes work only for configured items. |
| Source of truth | Backend commit `982d7e7`, backend tests, dashboard form behavior, and Jira intake supplied by the user. |
| Primary surfaces | Dashboard, venue bulk-discount API, CSV export, and public checkout. |
| In scope | New lifecycle-tracked orders, ticket/product/membership/venue permission modes, CSV gating, ready-order edits, representative redemption, legacy CSV compatibility, and an approved 100,000-code stress run. |
| Out of scope | Manually killing workers, injecting database errors, forcing task redelivery, and proving retry internals through ordinary UI actions. |
| Confidence | High for source-backed lifecycle and permission behavior; medium for the 100,000-code stress outcome because existing source tests explicitly cover 6,000 rather than 100,000. |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| A new order cannot expose a CSV before verified completion. | Prevents organizers from distributing incomplete codes. | TC-1, TC-2, TC-7 |
| `ready` means exact code count and exact configured redemption scope. | Prevents valid-looking codes from failing at checkout. | TC-1, TC-3, TC-5, permission audit |
| Editing a ready order rebuilds the intended scope for its existing codes. | Prevents stale or missing permissions after organizer changes. | TC-4 |
| Legacy completed orders retain CSV access. | Prevents the lifecycle migration from breaking existing organizers. | TC-6 |
| Failed or redelivered work remains private and resumes without duplicate codes. | Prevents partial publication and duplicate discount inventory. | Automated coverage only |

## Jira Intake Summary

- SPD-2465 reported a venue bulk order where one contiguous 100-code batch existed without redemption permissions.
- The affected batch had zero event permission rows and zero ticket-type permission rows.
- The reusable product risk is incomplete asynchronous bulk generation, not the incident-specific venue data.

## Summary of New Behavior

- Persists `pending`, `generating`, `ready`, and `failed` lifecycle states.
- Uses one late-acknowledged, bounded-retry generation task instead of recursive code generation plus independent permission-task fanout.
- Generates private chunks of 100 codes and writes each chunk's permissions in the same transaction.
- Validates exact permission topology in bounded groups of 1,000 code IDs before publishing all codes together.
- Keeps committed chunks private after a failure and resumes without duplicating codes.
- Returns HTTP 409 when a lifecycle-tracked order is not ready for CSV download.
- Retains count-based CSV eligibility for legacy rows where `generation_status` is `NULL`.
- Exposes lifecycle fields through the venue bulk-order API; commit `982d7e7` does not add frontend lifecycle presentation.

## Sources Reviewed

- Jira intake: SPD-2465 details pasted by the user.
- Backend commit: `982d7e71346629cb77fc005ba7cef81a430f1910`.
- Backend:
  - `apps/financials/api/venue_based/serializers/serializers.py`
  - `apps/financials/api/venue_based/viewsets/viewsets.py`
  - `apps/financials/constants/bulk_discounts.py`
  - `apps/financials/migrations/0220_discountbulkorder_generation_lifecycle.py`
  - `apps/financials/models/discount_management/bulk_orders.py`
  - `apps/financials/models/discount_management/discounts.py`
  - `apps/financials/services/bulk_discount.py`
  - `apps/financials/services/bulk_discount_generation.py`
  - `apps/financials/tasks.py`
  - `apps/financials/tests/test_api_bulk_discount_generation_lifecycle.py`
  - `apps/financials/tests/test_bulk_discount_generation_service.py`
- Frontend:
  - `packages/core/src/app-contexts/dashboard/features/discounts/ui/components/form/BulkDiscountForm.web.tsx`
  - `packages/core/src/app-contexts/dashboard/features/discounts/ui/components/form/Permissions.web.tsx`
  - `packages/core/src/app-contexts/dashboard/features/discounts/ui/components/lists/DiscountsBulkOrderList.web.tsx`
  - `packages/core/src/app-contexts/dashboard/features/discounts/constants/discount-shared-fields.ts`
  - `packages/core/src/app-contexts/dashboard/features/discounts/hooks/useDiscountSubmit.ts`
  - `packages/core/src/app-contexts/dashboard/features/discounts/data/services/useVenueBasedDiscountBulkOrderService.ts`
  - `packages/core/src/app-contexts/dashboard/features/discounts/data/repositories/VenueBasedDiscountBulkOrderRepository.ts`
- Playwright workflow: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`.
- Vault guidance: [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]], and [[02 Feature QA/Checkout Criticality From Jira Major Critical Export]].

## Assumptions and Unknowns

- The QA build contains commit `982d7e7`; local `master` was used only to understand the pre-fix behavior.
- The dashboard may not display lifecycle labels because no frontend files changed in this commit. Use the authenticated API response or browser network response as lifecycle evidence.
- Existing backend long-test evidence covers 6,000 generated codes. No bulk-discount upper limit was found in the dashboard form or model, but 100,000 is not an established supported boundary from the reviewed source.
- The 100,000-code run requires environment-owner approval, an agreed execution window, monitoring, and a cleanup procedure before execution.
- An existing pre-migration bulk order with `generation_status IS NULL` is required for TC-6.

## Source-Backed Behavior

- New orders start `pending` with empty error and timestamps.
- Downloading a non-ready lifecycle-tracked order returns HTTP 409 and does not dispatch the CSV task.
- Codes are initially private and are published according to the bulk order's final public status only after exact validation.
- A failed chunk rolls back; earlier committed chunks remain private.
- A retry reuses committed codes and does not duplicate them.
- Ticket types on one event share one event permission per discount while retaining one child permission per selected ticket type.
- Venue-wide permission mode requires no stored event or child permission rows.
- Product and membership targets receive the equivalent parent/child permission structure.
- An incomplete lifecycle-tracked order cannot be edited; a ready order can follow the existing edit workflow.

## Entry Paths

- Dashboard bulk discount creation and list.
- Authenticated venue bulk-order create, detail, generate, and CSV endpoints.
- Dashboard edit of a ready bulk order.
- Public checkout discount-code entry.

## Risk Areas

- CSV becomes available when count is complete but permission topology is incomplete.
- Codes become public before every chunk is verified.
- Retry creates duplicate codes or discards previously committed private codes.
- Selected items receive missing, extra, or incorrectly parented permissions.
- A ready-order edit leaves old permissions or removes required permissions.
- Legacy orders lose CSV access after migration.
- A very large order creates excessive database, queue, storage, CSV, or cleanup load.

## Coverage Decisions

- Normal generation, CSV gating, exact scope, checkout redemption, ready-order editing, and legacy download are included because they have distinct observable outcomes.
- Ticket scope is the minimum execution surface because it matches the incident and live checkout risk.
- Venue, product, and membership scope are grouped into one extended case because the same permission service was changed for all three.
- Worker loss, database errors, late acknowledgement, bounded retries, final-topology failure, and idempotent resume remain automated or engineering-assisted because they cannot be induced through normal organizer actions.
- The 100,000-code run is separated from functional regression so a capacity experiment does not replace the smaller deterministic cases.

## State-Space / Setup Matrix

| Axis | Minimum Value | Extended Value | Why It Matters |
| --- | --- | --- | --- |
| Quantity | 1,000 | 100,000 with approval | 1,000 exercises multiple 100-code chunks and one full 1,000-ID validation chunk; 100,000 is the requested stress condition. |
| Permission mode | Selected ticket types | All items, selected product, selected membership | Each mode builds or omits a different permission topology. |
| Ticket selection | Two eligible ticket types on one event plus one ineligible ticket type | Ticket types across multiple events | Proves shared parent permission and selected-child behavior. |
| Lifecycle | Pending, generating, ready | Failed and resumed | Pending/ready are manual; failed/resumed require automated or engineering-assisted execution. |
| Order age | New lifecycle-tracked order | Legacy order with null status | Proves new safety behavior without breaking existing CSV access. |
| Visibility | Public | Inactive/private | Publication must match the bulk order only after validation. |

## Recommended Test Data

- Organizer account with permission to manage discounts for a disposable QA venue.
- One public event containing:
  - `EligibleTicketA`
  - `EligibleTicketB`
  - `IneligibleTicketC`
- One public product with `EligibleProductOption` and `IneligibleProductOption`.
- One membership group with `EligibleMembershipLevel` and `IneligibleMembershipLevel`.
- Unique prefixes such as `SPD2465REG`, `SPD2465SCOPE`, and `SPD2465STRESS`.
- An existing completed legacy bulk order where `generation_status IS NULL`.
- Read-only database access or an engineering-provided permission-audit result for exact topology verification.
- Approved cleanup procedure keyed by bulk-order ID, especially before the 100,000-code run.

## Qase-Ready Manual Test Cases

TC-1: Dashboard - Bulk Discounts - Verify a large ticket-scoped order becomes ready with an exact CSV

**Priority:** High  
**Type:** Regression / Happy Path  
**Area:** Dashboard bulk discount generation

**Description:** Validates that an organizer can generate a 1,000-code ticket-scoped bulk order and receive a CSV only after the complete order is ready, protecting against missing codes and incomplete redemption scope.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:** The organizer can manage discounts for the QA venue. `EligibleTicketA` and `EligibleTicketB` belong to the same public event. The permission-audit query is available.

**Postconditions:** Record the bulk-order ID and retain it for TC-3 and TC-4. Remove the test data using the approved cleanup procedure after dependent cases finish.

**Tags:** dashboard, discounts, api-testing

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard Discounts and start a new bulk discount order. | Prefix `SPD2465REG`; quantity `1000`; public 10% discount | The bulk discount form accepts the required values. |
| Select **Certain items of this type**, choose Events, and select the two eligible ticket types. | `EligibleTicketA`, `EligibleTicketB` | The form shows only the selected ticket types in the discount scope. |
| Save the bulk discount order and capture its create response before the automatic generation request completes. | — | The create response starts `pending`, has no generation error, and has no start or completion timestamp; the dashboard automatically submits the generation request. |
| Monitor the order detail response until automatic generation finishes. | Bulk-order ID | The order reaches `ready`, both lifecycle timestamps are populated, the error is empty, and `total_generated` is 1,000. |
| Download and open the CSV. | — | The CSV contains exactly 1,000 non-empty, unique codes using the configured prefix. |
| Run the read-only permission audit for the bulk-order ID. | Expected per code: one event permission and two ticket-type permissions | Every code reports `OK`; no code has missing or extra permissions. |

TC-2: API - Bulk Discounts - Verify CSV download is rejected before generation is ready

**Priority:** High  
**Type:** Negative / Integration  
**Area:** Venue bulk-discount API

**Description:** Validates that an authenticated organizer cannot download a lifecycle-tracked bulk-order CSV before generation is ready, protecting against distribution of incomplete codes.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:** The organizer has an authenticated venue session and can create bulk discounts through the venue API. Do not call the generate endpoint until instructed.

**Postconditions:** Generate or remove the pending test order through the approved QA workflow.

**Tags:** api-testing, discounts, dashboard

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a new ticket-scoped bulk order through the venue API without starting generation. | Quantity `1`; one eligible ticket type | The response reports `generation_status` as `pending`. |
| Request the order's `download-csv` endpoint. | Pending bulk-order ID | The API returns HTTP 409 with `Discount codes are not ready for download.` |
| Review the response and job activity. | — | No CSV job ID is returned and no downloadable file is created. |
| Start generation and wait until the detail response reports `ready`. | Pending bulk-order ID | The order completes with the requested code count and no generation error. |
| Request the `download-csv` endpoint again. | Ready bulk-order ID | The request succeeds and returns a CSV job ID. |

TC-3: Public Checkout - Discounts - Verify generated codes follow the selected ticket scope

**Priority:** High  
**Type:** Regression / Permission  
**Area:** Public checkout discount redemption

**Description:** Validates that ready bulk codes apply to selected event tickets and do not apply to an unselected ticket type, protecting against missing or overly broad redemption permissions.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:** TC-1 completed successfully. The CSV contains unused codes. `EligibleTicketA`, `EligibleTicketB`, and `IneligibleTicketC` are on sale.

**Postconditions:** Do not complete purchases. Remove test baskets or allow them to expire according to the QA environment procedure.

**Tags:** public, discounts, checkout

**Parameters:**  
TicketSelection: EligibleTicketA, EligibleTicketB, IneligibleTicketC

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add the selected ticket type to a fresh public checkout basket. | TicketSelection | The basket contains the selected ticket at its regular price. |
| Apply a different unused code from the ready CSV. | Use codes from the beginning, middle, and end of the CSV across executions | The code is accepted for either eligible selection and rejected for `IneligibleTicketC`. |
| Review the basket after applying the code. | — | Eligible tickets show the configured discount and updated total; the ineligible ticket remains undiscounted. |

TC-4: Dashboard - Bulk Discounts - Verify editing a ready order replaces its ticket scope

**Priority:** High  
**Type:** Regression / Permission  
**Area:** Dashboard bulk discount editing

**Description:** Validates that an organizer can change the selected tickets on a ready bulk order and that its existing codes use the new scope without retaining removed permissions.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:** TC-1 completed successfully and its order is `ready`. All three ticket types are on sale.

**Postconditions:** Restore the original ticket selection or remove the bulk order using the approved cleanup procedure.

**Tags:** dashboard, discounts, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ready bulk order for editing. | TC-1 bulk-order ID | The order can be edited after generation is complete. |
| Remove `EligibleTicketB`, add `IneligibleTicketC`, and save. | Final scope: `EligibleTicketA`, `IneligibleTicketC` | The change is accepted and the edit task completes. |
| Run the permission audit for the bulk-order ID. | Expected per code: one event permission and two ticket-type permissions | Every code reports the new exact ticket scope with no missing or extra permissions. |
| Apply unused existing codes in fresh baskets for each ticket type. | `EligibleTicketA`, `EligibleTicketB`, `IneligibleTicketC` | Codes apply to A and C and no longer apply to B. |

TC-5: Dashboard - Bulk Discounts - Verify permission modes publish only their configured items

**Priority:** Medium  
**Type:** Regression / Permission  
**Area:** Dashboard bulk discount permission modes

**Description:** Validates that the rewritten generation workflow preserves venue-wide, product, and membership redemption behavior after the order is ready.

| Platform | View |
| --- | --- |
| Electron | Desktop |
| WebPublic | Desktop |

**Preconditions:** The QA venue has eligible and ineligible event tickets, product options, and membership levels that can be added through their normal purchase flows.

**Postconditions:** Record created order IDs and remove them using the approved cleanup procedure.

**Tags:** dashboard, discounts, products

**Parameters:**  
PermissionMode: AllItems, SelectedProduct, SelectedMembership

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a small public bulk order for the selected permission mode. | Quantity `2`; PermissionMode | The order accepts the selected item configuration. |
| Generate the order and wait for its detail response to report `ready`. | — | The order reaches `ready` with two unique codes and no generation error. |
| Run the permission audit appropriate to the selected mode. | PermissionMode | All-items codes require no stored item permissions; selected product and membership codes have their exact parent and child permissions. |
| Apply one code through the normal purchase flow for an eligible item. | PermissionMode | The configured discount applies to the eligible item. |
| Apply the other code to an unselected item when the mode is item-specific. | SelectedProduct or SelectedMembership | The unselected item does not receive the discount. |

TC-6: Dashboard - Bulk Discounts - Verify a completed legacy order can still download its CSV

**Priority:** Medium  
**Type:** Regression / Compatibility  
**Area:** Dashboard bulk discount CSV export

**Description:** Validates that an organizer can continue downloading a fully generated pre-lifecycle bulk order after the generation lifecycle migration.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:** A completed bulk order created before the lifecycle migration exists with `generation_status IS NULL` and `total_generated = quantity`.

**Postconditions:** Do not modify or remove the shared legacy order.

**Tags:** dashboard, discounts

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard bulk discount list containing the legacy order. | Legacy bulk-order ID | The completed legacy order remains available. |
| Request its CSV download. | — | The download request succeeds rather than returning HTTP 409. |
| Open the CSV and compare its row count with the order quantity. | — | The CSV contains the existing generated codes and its count matches the order quantity. |

TC-7: Dashboard - Bulk Discounts - Verify 100,000-code generation remains all-or-nothing

**Priority:** Medium  
**Type:** Stress / Regression  
**Area:** Dashboard bulk discount generation

**Description:** Exercises the director-requested 100,000-code workload and validates that a very large order is not published or downloadable in a partial state.

| Platform | View |
| --- | --- |
| Electron | Desktop |

**Preconditions:** The environment owner approves a 100,000-code run, defines the maximum execution window, confirms database and worker monitoring, and provides an approved cleanup procedure. No other performance experiment is using the venue or queue.

**Postconditions:** Capture duration, task attempts, final lifecycle state, generated count, permission-audit summary, CSV size, and cleanup evidence. Remove the bulk order and generated codes through the approved procedure.

**Tags:** dashboard, discounts, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a public ticket-scoped bulk order against one selected ticket type. | Prefix `SPD2465STRESS`; quantity `100000`; 10% discount | The order is accepted without publishing any generated code immediately. |
| Save the order and monitor the automatically started generation, lifecycle, worker health, and generated count within the approved window. | Bulk-order ID | The order does not report `ready` or permit CSV download while its count or permission validation is incomplete. |
| Attempt CSV download while the order is not ready. | — | The API returns HTTP 409 and no partial CSV is delivered. |
| Wait for the terminal lifecycle state. | — | The order reaches `ready` within the agreed window; otherwise record the run as failed or blocked rather than accepting partial publication. |
| Download and validate the final CSV. | — | The CSV contains exactly 100,000 non-empty, unique codes using the configured prefix. |
| Run the permission audit for the order. | Expected per code: one event permission and one ticket-type permission | All 100,000 codes report complete permissions and none were published with missing scope. |

## Minimum Execution Set

- TC-1: 1,000-code ticket-scoped generation, lifecycle, exact CSV, and permission audit.
- TC-2: deterministic HTTP 409 before `ready`.
- TC-3: eligible and ineligible public redemption.
- TC-4: ready-order permission edit and existing-code behavior.
- TC-6: legacy CSV compatibility when a suitable legacy row exists.

TC-5 is extended cross-surface regression. TC-7 is the director-requested stress run and requires explicit environment approval; it does not replace the minimum execution set.

## Coverage Ledger

| Item | Type | Risk | Coverage | Evidence | Notes |
| --- | --- | --- | --- | --- | --- |
| Pending-to-ready success path | Async lifecycle | High | Manual: TC-1 | API lifecycle fields plus CSV | Uses 1,000 codes across multiple chunks. |
| Premature CSV request | Export/error state | High | Manual/API: TC-2 | HTTP 409 and no job ID | Deterministic without worker failure. |
| Exact ticket permission topology | Permission boundary | High | Manual/backend: TC-1, TC-3 | Audit plus redemption | Both count and customer behavior are required. |
| Ready-order permission edit | Mutation/async task | High | Manual: TC-4 | Audit plus redemption | Proves removed and added targets. |
| Product/membership/venue modes | Permission boundary | Medium | Manual extended: TC-5 | Audit plus purchase flow | Grouped because the same service owns topology. |
| Legacy CSV | Compatibility | Medium | Manual: TC-6 or Blocked | Existing null-status order | Blocked if no legacy fixture exists. |
| Permission-write failure | Failure state | High | Automated | Commit service test | Manual fault injection is not appropriate. |
| Later-chunk retry and no duplicates | Recovery/idempotency | High | Automated | Commit service test | Requires controlled failure. |
| Worker loss and bounded retry | Infrastructure recovery | High | Automated/engineering-assisted | Task configuration and CI | Requires worker control and logs. |
| 100,000-code workload | Stress/capacity | High operational risk | Manual-only: TC-7 | Lifecycle, monitoring, CSV, audit | Source-backed long test covers 6,000, not 100,000. |
| Auto-discount and membership refresh hook bypass | Internal regression | Medium | Automated | Commit assertions and existing discount tests | No distinct organizer-observable manual action. |

## Suggested Automated Coverage

- Keep the commit tests that verify permission-write rollback, later-chunk failure, private committed chunks, retry without duplicate codes, legacy repair, and final-topology failure.
- Add or retain an API integration test proving `download-csv` returns HTTP 409 for `pending`, `generating`, and `failed`, and succeeds for `ready` plus eligible legacy rows.
- Add a bounded multi-chunk integration case using more than 100 codes that asserts exact ticket permission topology and publication only after final validation.
- Keep 100,000 codes out of routine Playwright UI coverage; use a scheduled backend performance test if the capacity boundary becomes supported and repeatable.

## Open Questions

- Is 100,000 an approved supported quantity, or a one-time stress experiment? Reviewed source explicitly tests 6,000 but does not define a bulk-discount maximum.
- What execution-time threshold and resource thresholds decide whether TC-7 passes?
- What is the approved cleanup procedure for 100,000 discounts and their permission rows?
- Is there a suitable legacy `generation_status IS NULL` order in QA for TC-6?
- Will a separate frontend change display lifecycle status and failure details, or should QA rely on API/network evidence for this release?
