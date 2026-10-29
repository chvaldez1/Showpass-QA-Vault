---
title: Ticket 1627711 missing waitlist badge — source investigation
date: 2026-10-28
status: Saved public sold-out override is off — user-provided query result; save cause unverified
tags:
  - qa/investigation
  - waitlist
  - tickets
---

# Ticket 1627711 missing waitlist badge

## Result

**The saved public sold-out override is off.** The user's query result for ticket type 1627711 shows `public_sold_out=false`, actual inventory sold out false, the rollout switch on, and waitlist 373 active. The calculated public ticket sold-out value is false. An active waitlist alone does not trigger the ticket's Waitlist badge, so this result does not establish a badge bug. Event-level availability and the actual public response remain unverified. Why the expected override is not saved is also unverified; the result does not establish that saving failed. **No confirmed bug or Jira draft yet.** The agent ran no live test and changed no Showpass data.

## User-provided database result — 2026-10-28

The user supplied this output from the diagnostic query; the agent did not execute it. Database environment and query time were not supplied.

**Venue:** MEGACON Orlando (2241). **Event:** MEGACON Orlando 2030 - SOLD OUT (648904), slug `megacon-orlando-2030-sold-out`. **Ticket:** Waitlist not working? (1627711), base inventory 1627921.

| Saved value | Query result |
| --- | --- |
| Public sold-out override | False |
| Actual inventory sold out | False |
| Force public sold-out rollout switch | True |
| Calculated public ticket sold out | False |
| Waitlist | 373, active |

### Saving the two settings works differently

Current dashboard source saves the Waitlist on/off action immediately. **Show as sold out publicly** is an ordinary ticket edit: **Apply changes** puts the edit onto the Tickets page, then the page's **Save** writes it. This is a possible explanation for an active waitlist beside an unchanged override, not proof of what the user did or of the deployed page version.

Source: `showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/waitlist/Section.web.tsx:102`; `editor-modal/useTicketTypeEditorSave.ts:295`; `list/EventTicketTypesPageSections.web.tsx:62-68`, under the same `events/ticket-types/` directory. Existing integration test `editor-modal/event-sections-save.integration.test.tsx:408-426` explicitly checks that Apply stages the override without an API update; the test was reviewed, not run.

## Intake evidence

- The user initially reported that ticket type **1627711** has Waitlist and forced public sold out enabled, but its Waitlist badge is absent; another Venue works. The later query identifies the affected Venue and Event above; the working comparison is still unknown.
- The first screenshot shows the ticket's Waitlist panel as **Enabled**, with card verification unchecked and purchase limit 8. It does not show the public ticket card or a refreshed saved record.

![Ticket type 1627711 Waitlist settings](<../../99 Archive/QA Evidence/Waitlist/2026-10-28-regression-investigation/ticket-1627711-waitlist-settings.png>)

- The second screenshot shows **Show as sold out publicly** with a grey, left-positioned switch that appears off at capture time. The later user-provided query also returns a false saved override. Neither establishes whether an earlier save was attempted or failed.

![Show as sold out publicly control](<../../99 Archive/QA Evidence/Waitlist/2026-10-28-regression-investigation/public-sold-out-control.png>)

## Source-backed behavior

| Layer | What the code does | Source |
| --- | --- | --- |
| Saved ticket setting | `public_sold_out` is the public-only override; the organizer form maps **Show as sold out publicly** to that field. | `web-app/apps/tickets/models/event_management/event_ticket_types.py:268`; `showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/basic-info/form-sections.ts:215` |
| Public response | Public `sold_out` is true when actual inventory is sold out, or when the global `enable_force_public_sold_out` switch and saved override are both true. The public waitlist object includes its status. | `web-app/apps/tickets/api/public/serializers/ticket_types.py:24,52-69,143-147` |
| Public ticket card | A ticket counts as waitlisted only when its waitlist status is `active`. The **Waitlist** badge requires both `soldOut` and an active waitlist. | `showpass-frontend/packages/core/src/shared/modules/ticket-types/utils/ticket-type-utils.ts:58-69`; `showpass-frontend/packages/core/src/shared/components/application/data-display/ItemStatusBadges/ItemStatusBadges.web.tsx:66-80` |
| Public event selection | The ticket card receives the public sold-out result and active-waitlist result. An already selected ticket can affect the broader event sold-out calculation, but a true ticket `sold_out` still makes the card sold out. | `showpass-frontend/packages/core/src/app-contexts/public/features/tickets/components/TicketTypesContainer/TicketTypesContainer.web.tsx:266-281,661-680` |

Existing backend tests assert that `public_sold_out=true` becomes public `sold_out=true` when the switch is on (`web-app/apps/tickets/tests/test_public_ticket_type_sold_out.py:25-31`). The Qase-ready case in [[03 Test Cases/Ticketing/enable-force-public-sold-out-test-cases#TC-25 — Existing waitlist entry|TC-25]] expects waitlist registration for this combination; that case was created but has **not** been manually run. These are source and test-definition evidence, not proof of this live ticket.

## Change check

- Backend public sold-out mapping entered `develop` on **2026-09-14** (`6cc497ff9bf`). Its current logic supports the reported combination; the local repository does not identify the affected deployed revision.
- Frontend commit `70b11f5ad5` on **2026-10-01** extracted availability badges into `ItemStatusBadges`. The old and new code both use `soldOut && isWaitlistTicket` for the ticket's Waitlist badge. The extraction alone does not explain a missing badge.
- A separate event-level unavailable message checks sold quantity against inventory instead of the public sold-out override (`showpass-frontend/packages/core/src/app-contexts/public/features/detail-pages/presets/shared/MainContent/MainContent.web.tsx:61-66`). With inventory remaining, it may show a sold-out message where a waitlist-specific message would be expected. This is **not** the ticket badge and has not been matched to the reported screen.

## What remains unverified

### Read-only saved-state query

Use [ticket-waitlist-diagnostic.sql](ticket-waitlist-diagnostic.sql) in the affected environment. It selects ticket type 1627711; add the working ticket-type ID to the `VALUES` list for a comparison. The user supplied its result above; the agent checked the query against source definitions but did not execute it.

`saved_public_sold_out=true`, `force_public_sold_out_enabled=true`, and `active_waitlist=true` establish the saved inputs for the reported forced-sold-out waitlist. `expected_public_ticket_sold_out` models the public serializer's result using the saved inventory flag and override. A null calculated result indicates a missing base-inventory row and needs investigation. No returned row means the ticket ID is absent from the queried database. This does not read the cached public response, establish the deployed version or prove a visible badge.

| Check | Status | Evidence needed |
| --- | --- | --- |
| Saved `public_sold_out` and active waitlist for ticket 1627711 | User-provided database evidence | Override False; inventory sold out False; switch True; waitlist active. Environment/time not supplied. |
| Public ticket response and visible badge | Not run | Same public event page and response, with its environment and capture time. |
| Working Venue comparison | Not run | One working ticket on the same client/environment, comparing only fields that feed the badge. |
| Candidate change in the affected build | Blocked | Build or deploy revision for the affected page. |

The shortest diagnostic comparison is the public ticket response for the affected and working tickets: `sold_out` and `waitlist.status`, followed by the visible ticket-card badge on the same page version. If both values are correct but the affected badge is absent, the frontend display path becomes the leading cause. If either value differs, trace the saved ticket state, global switch, response path and cache before calling it a code regression. This comparison is read-only; it has not been executed.
