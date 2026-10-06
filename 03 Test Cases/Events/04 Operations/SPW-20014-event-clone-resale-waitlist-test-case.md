---
title: SPW-20014 Event Clone Resale and Waitlist Qase Test Case
date: 2026-08-21
tags:
  - qa/test-cases
  - qa/qase
  - events
  - resale
  - waitlists
status: draft
---

# SPW-20014 Event Clone Resale and Waitlist Qase Test Case

Related Jira: [SPW-20014 - Event clones retain source-event resale and waitlist relationships](https://showpass.atlassian.net/browse/SPW-20014)

Vault guides: [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]], and [[05 Tooling/qasectl]].

## Testing Intent

We are testing whether an organizer can clone an event that uses resale and waitlists while every cloned ticket type starts without those source-event relationships; this matters because a cloned event could expose unauthorized resale or waitlist behavior, and we will prove it through the clone warning, the destination event's saved setup, and the unchanged source setup.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Inventory/ownership and fulfillment/access |
| Business invariant | A cloned ticket type must never point to resale or waitlist setup owned by the source event. |
| User or business impact | Organizers can unknowingly expose resale or waitlist behavior on a new event, and customers can act against the wrong event's ticket setup. |
| Failure mode | The destination original ticket remains resale-enabled, its resale relationship points to the source event, or a destination ticket retains the source waitlist. |
| Observable proof | The cloned event contains the expected ticket types, each destination resale and waitlist value is off or undefined after a fresh read, and the source event remains configured. |
| Source of truth | Backend serializer and regression test, frontend clone payload and review UI, and Jira intake pasted by the user. |
| Primary surfaces | Dashboard Events, event clone setup, destination event Tickets/Waitlists, and source event Tickets/Waitlists |
| In scope | One full event clone containing an original ticket type, its resale ticket type, and a separate waitlisted ticket type; destination values off or undefined; destination persistence; source preservation. |
| Out of scope | Copying and remapping an enabled setup because the current source leaves the destination values off or undefined; post-event waitlist processing from SPW-20013; customer resale cutoff rules; cleanup execution for existing production data. |
| Confidence | High for off-or-undefined clone behavior; the source includes frontend and backend regression coverage. Live Jira retrieval was unavailable because Jira credentials are not configured in the vault. |

## Proof Target Map

| Proof Target | Why It Matters | Covered By |
| --- | --- | --- |
| Every destination resale and waitlist value is off or undefined after a fresh read. | Prevents cross-event ownership and fulfillment errors. | SPT-5154; backend automated coverage |
| The source event remains configured after cloning. | Prevents the clone operation from mutating live source behavior. | SPT-5154; backend automated coverage |
| An invalid destination resale submission cannot be created. | Prevents customers from reselling against the wrong event. | Backend/API automated coverage; the off-or-undefined destination state removes the customer resale entry point. |

## Jira Intake Summary

SPW-20014 reports that Churchill's 2026 ticket types inherited active resale setup from a 2025 event. The destination original ticket type remained resale-enabled and pointed to a resale ticket type owned by the source event. The clarified destination outcome is that resale and waitlist values are off or undefined after a full event clone. The source event must remain unchanged.

## Sources Reviewed

- Jira description and acceptance criteria pasted by the user; live Jira fetch was not executed because the vault `.env` lacks Jira credentials.
- Backend:
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py` — `VenueBasedEventSerializer._disable_clone_resale_and_waitlist`
  - `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_event_clone.py` — `test_create_clone__disables_resale_and_waitlist_configuration`
- Frontend:
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-clone/constants/event-clone-contract.ts`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-clone/utils/event-clone-payload.ts`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/event-clone/ui/components/EventCloneReview.web.tsx`
  - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ui/components/EventsCardMenuDropdown.web.tsx`
- Playwright: no event-clone resale/waitlist regression was found in the current automation repository.

## Source-Backed Behavior

- An organizer starts from Dashboard Events and selects **Clone** from the event card menu.
- The frontend removes waitlist, resale relationship, resale-enabled, and resale-ticket markers from every cloned ticket type.
- The backend independently removes the same fields from both validated clone data and the nested input used during save.
- The cloned event is created as a draft and opens on its Basic Info page.
- Backend regression coverage verifies that the destination resale and waitlist values resolve to false or empty, the destination event reports neither feature as active, and the source relationships remain unchanged.

## Coverage Decisions

- One manual case is sufficient because the original, resale, and waitlisted ticket types travel through the same full-event clone entry point and share one expected off-or-undefined outcome.
- Explicit setup copying and relationship remapping are not applicable to the reviewed implementation because no such organizer choice is offered.
- The bounded audit or cleanup of existing cross-event relationships is an operational/data-maintenance deliverable, not a repeatable Dashboard clone test. Identifying those rows remains API/backend verification outside this Qase case.
- Direct invalid-resale submission rejection remains backend/API automated coverage. The manual case proves the customer-facing prerequisite is absent by confirming the destination resale value is off or undefined.

## State-Space / Setup Matrix

| Axis | Selected Value | Reason |
| --- | --- | --- |
| Actor | Organizer with event-management access | Owns the Dashboard clone workflow. |
| Entry point | Dashboard Events card menu → **Clone** | Source-confirmed full-event clone path. |
| Source ticket state | Original resale ticket pair plus a separate waitlisted ticket type | Covers the complete acceptance-criteria test setup in one clone. |
| Destination state | New draft event | Source-confirmed clone result. |
| Outcome | Clean successful clone | Proves the off-or-undefined destination state independently of error or recovery behavior. |

## Coverage Ledger

| Item | Type | Risk | Coverage | Evidence | Gap / Decision |
| --- | --- | --- | --- | --- | --- |
| Destination resale off or undefined | Persisted ticket setup | Cross-event resale | Manual: SPT-5154; automated persistence | Backend serializer and regression test | None |
| Destination waitlist off or undefined | Persisted ticket setup | Cross-event waitlist | Manual: SPT-5154; automated persistence | Backend serializer and regression test | None |
| Source setup unchanged | Mutation isolation | Live source regression | Manual: SPT-5154; automated persistence | Backend regression test | None |
| Invalid resale submission rejected | API validation/downstream effect | Wrong-event resale | Automated: validation/downstream effect | Off-or-undefined destination relationship and backend regression | No safe manual submission path should exist. |
| Explicit copy and remap | Alternate clone mode | Unsafe mapping | Not applicable | No reviewed UI or source implementation offers this choice. | Add focused coverage if Product introduces it. |
| Existing-data audit/cleanup | Operational maintenance | Stale production relationships | Deferred | Jira acceptance criterion only | Requires the approved audit artifact or cleanup procedure. |

## Recommended Test Data

- A future event that can be safely cloned.
- One standard ticket type with resale enabled through a paired resale ticket type on the same source event.
- The paired resale ticket type used by the standard ticket type.
- One separate ticket type with waitlist enabled.
- A unique destination event name and future schedule.
- Record the source event name, ticket type names, and visible resale/waitlist state before execution.

## Qase-Ready Manual Test Case

### SPT-5154: Dashboard - Event Cloning - Verify resale and waitlist settings are not copied

**Description:** Verify that an organizer can clone an event containing a resale ticket pair and a waitlisted ticket type. On the destination event, each resale and waitlist value must be off or undefined, while the source event remains unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The organizer can view, clone, and edit events for the venue.
* A future source event that can be safely cloned contains a standard ticket type, its paired resale ticket type, and a separate waitlisted ticket type.
* The standard ticket type has resale enabled through the paired resale ticket type on the same source event.
* The separate waitlisted ticket type has waitlist enabled.
* The venue displays resale and waitlist setup in Dashboard.
* The source event name, ticket type names, and visible resale/waitlist state have been recorded.

**Postconditions:**

* Preserve the uniquely named destination draft for review and record its Dashboard link.
* Do not change or remove the source event's resale or waitlist setup.
* Delete or archive the destination only through the venue's approved test-data cleanup process after review.

**Priority:** High

**Tags:** dashboard, resale, waitlists

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard **Events**. |  | The organizer's events are displayed. |
| Locate the future source event that matches the Preconditions and open its event-card menu. | Recorded source event name | The event menu includes **Clone**. |
| Select **Clone**. |  | The clone page opens for the source event and shows editable clone details. |
| Expand **Tickets being copied**. | Recorded ticket type names | The standard, paired resale, and waitlisted source ticket types are listed for the clone. |
| Enter a unique destination event name. | Unique event name | The clone form accepts the destination name. |
| Enter a future schedule for the destination event. | Future start and end date/time | The clone form accepts the destination schedule. |
| Select **Clone event** once. |  | One destination event is created as a draft and its Basic Info page opens. |
| Open **Tickets** for the destination event. | Recorded ticket type names | The standard, paired resale, and formerly waitlisted ticket types are present. |
| Review the waitlist value for each destination ticket type. |  | Each waitlist value is off or undefined. |
| Review the resale value for each destination ticket type. |  | Each resale value is off or undefined. |
| Reload the destination event. |  | The destination draft reloads successfully. |
| Reopen **Tickets** and review the destination resale and waitlist state. |  | Each resale and waitlist value remains off or undefined. |
| Return to the recorded source event and open **Tickets**. | Recorded source event name | The source event still contains its standard, paired resale, and waitlisted ticket types. |
| Review the source event's resale and waitlist state. | Recorded source setup | The standard ticket type still uses its paired resale ticket type, and the separate waitlisted ticket type remains waitlisted. |
| Record the destination event link. |  | The link is recorded, and the destination remains an unpublished draft for review. |

## Minimum Execution Set

- SPT-5154 on Dashboard Desktop using the complete three-ticket source test setup.

## Suggested Automated Coverage

- Keep the backend full-event clone regression that submits stale resale and waitlist relationships and asserts all destination relationships are empty while the source remains unchanged.
- Add an API regression that attempts to create a resale submission from a deliberately invalid cross-event relationship and expects rejection if this boundary is not already covered separately.
- Add a Dashboard Playwright regression for one clone submission, redirect to the destination draft, and fresh-read confirmation that each destination resale and waitlist value is off or undefined.

## Open Questions

- Which approved operational artifact will identify and clean up existing cross-event resale relationships? This does not block SPT-5154 or the one-case Qase draft, but it remains an unverified acceptance criterion outside this manual case.

## Qase Target

- Action: Existing case; local reference only. No Qase write in this refactor
- Project: SPT
- Suite: 84
- Existing case: [SPT-5154](https://app.qase.io/case/SPT-5154)
- Tags: dashboard, resale, waitlists
- Step count: 15
