---
title: SPW-20370 - Manage Events Card Actions
tags:
  - qa/events
status: source-reviewed-not-executed
---

# SPW-20370 - Manage Events Card Actions

## What you are testing

[SPW-20370](https://showpass.atlassian.net/browse/SPW-20370) restores shortcuts on **Dashboard → Events → Manage Events** cards and adds missing choices to the mobile **Event options** panel. Prove that each action opens the correct place for the selected event and that actions are hidden when the event or account is ineligible.

“Desktop action rail” means the row of shortcut icons. “Mobile action parity” means the phone menu offers the applicable actions too. The ticket's component names, import rules, and lint commands are developer checks.

## Testing Intent and Scope

| Field | Answer |
| --- | --- |
| Criticality / invariant | Navigation and permission boundaries: right destination, right event, permitted actions only. |
| Actor / surface | Organizer employee on Dashboard, desktop and mobile browser. |
| Proof | Page heading and selected event/date; visible menu choices; working keyboard focus; correct copied URL. |
| In scope | Card shortcuts, options menu/panel, published/draft preview, copy, bulk-update opening, clone-form opening, permissions, recurring date cards. |
| Out of scope | Saving edits, creating clones, changing prices/inventory, ticket scanning, purchases, report calculations. Those workflows are destinations, not this ticket's change. |
| Confidence | Source-backed plan; no browser execution or Beta deployment verification. |

## Recommended Test Data

Use existing QA-only records. Record their actual names and dates before starting:

* A published event belonging to your selected organization.
* A draft event belonging to the same organization.
* A recurring series with at least two existing dates. A recurring series is an event that repeats on multiple dates. Price tiers must already be enabled for the organization to expose Bulk update.
* An employee with event-management and financial access in that organization.
* For permission checks, prepared accounts with the access described in TC-4. A reseller organization sells tickets for another organization's event; it does not own that event.

No setup was created or verified. Missing records/accounts block only their corresponding scenarios. Start at desktop width around 1280 pixels; use a phone-sized browser around 390 pixels for mobile. At 577–767 pixels the current implementation mixes the mobile Edit layout with a dropdown, so include one check around 650 pixels for missing/overlapping actions without assuming it must be a drawer.

## Manual Test Cases

### TC-1: Dashboard - Events - Open the correct event from desktop shortcuts

**Description:** Check the five direct shortcuts on a published event belonging to the current organization. Repeat on one individual date expanded from the recurring series; that date must remain selected at the destination.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** Use the prepared employee with financial access and the published event/recurring date recorded above.

**Tags:** dashboard, events

**Parameters:**
Action: ManageEvent, Edit, StatsAndInfo, CheckIn, Transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → Manage Events. | Recorded organization and event | The event card is visible. |
| Hover over the selected shortcut icon. | Manage event; Edit; Stats and info; Check in; Transactions | A readable tooltip names that action. |
| Select the shortcut. | Selected Action | Manage event opens Overview; Edit opens Basic info; the remaining actions open their named pages. |
| Read the destination's event name and date. | Recorded event/date | The page belongs to the selected event/date, not another event or the whole series. |
| Return to Manage Events. | Browser Back or original tab | The event list is available for the next action. |

**Postconditions:** Leave all destination forms unchanged; do not scan tickets or save edits.

### TC-2: Dashboard - Events - Use event options on desktop and mobile

**Description:** Check the options for published, draft, series, and individual-date cards. Apply eligibility from TC-4 rather than expecting every action on every record. On a phone, the card has a direct Edit icon when permitted, with the other choices in the three-dot Event options panel; the five-icon desktop row is absent.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:** Use the prepared owning-organization account and recorded events. Execute each row from Manage Events, reopening the same event's three-dot options each time.

**Tags:** dashboard, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event card's three-dot button. | Recorded event | Desktop shows a menu; phone shows a panel titled Event options. |
| Read Event ID. | Record this number for comparison between views | Both views show the same ID for the same event. |
| Select View event. | Published event | Its public event page opens in a new tab, as required by Jira. |
| Select View event. | Draft event | Its preview opens in a new tab, as required by Jira. |
| Select Copy event link. | Published event | A copied-link confirmation appears. |
| Paste into the browser address bar without pressing Enter. | Copied text | The URL identifies the selected event; discard the pasted text afterward. |
| Select Stats and info, Check in, or Transactions, one at a time. | Phone; account permitted for the selected action | The matching page opens for the selected event and the options panel closes. |
| Select the direct Edit icon. | Phone; owning organization | Basic info opens for that event. |
| Reopen Event options and use its close button. | Phone | The panel closes and the event card can be used again. |

**Postconditions:** Close extra public/preview tabs. No saved event data changes; copying replaces the clipboard contents. Do not paste the URL into a message or send it anywhere.

### TC-3: Dashboard - Events - Open Bulk update and Clone from event options

**Description:** Check the previously missing mobile actions and the existing desktop entry points. Opening their forms is sufficient for this ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:** Use the owning organization, its recorded recurring series with existing dates, and an organization where price tiers are already enabled.

**Tags:** dashboard, events, bulk-update

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the series card's three-dot options from Manage Events. | Recorded series | Bulk update and Clone are available. |
| Select Bulk update. | Series | The Bulk update window opens with Event inventory and Ticket type price; the mobile options panel closes. |
| Select Event inventory. | No values entered | The inventory form opens for the selected series. |
| Select Back. | — | The Bulk update choices return. |
| Select Ticket type price. | No values entered | The price form opens for the selected series. |
| Select Back. | — | The Bulk update choices return. |
| Close Bulk update. | Close button | Manage Events is usable again. |
| Reopen the series options and select Clone. | Recorded series | The Clone event form opens for the selected source event. |
| Return to Manage Events without submitting the form. | Browser Back | No cloned event has been created. |

**Postconditions:** Do not submit price/inventory changes or the clone form. No cleanup of event data is needed.

### TC-4: Dashboard - Events - Show only eligible card actions

**Description:** Check both the card and its options using the following prepared account/event combinations. “Owner” below means the selected organization owns the event; it does not mean the individual employee who originally created it.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:** Use prepared accounts with the stated access; do not change real employee permissions to make these scenarios.

**Tags:** dashboard, events, employee-permissions

| Scenario | Expected action visibility |
| --- | --- |
| Owner, published event, financial permission | Edit, Stats and info, Check in, Transactions available. |
| Owner, published event, no financial permission | Transactions hidden; other owner actions retain their normal eligibility. |
| Owner, draft event | Stats and info, Check in, Transactions hidden; Edit remains. |
| Reseller, published event, no full stats or financial permission | Edit, Stats and info, Check in, Transactions, Bulk update, Clone hidden. |
| Reseller, published event, full stats access only | Stats and info available; Edit, Check in, Transactions, Bulk update, Clone hidden. |
| Reseller, published event, financial permission only | Transactions available; Stats and info hidden unless full stats access is separately granted. |
| Owner, individual date under a series | Clone hidden; Bulk update absent unless that record itself has children. |
| Owner, series with children, price tiers disabled | Bulk update hidden. |
| Owner, standalone event with no parent | Clone available; it is not limited to recurring series. Bulk update hidden when there are no child dates. |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign into the prepared account and open Manage Events for its organization. | Selected scenario | The intended accessible event card is shown. |
| Inspect the card's direct icons. | Visibility table | Only eligible direct actions appear. |
| Open the card's three-dot options. | Same event | Options follow the same visibility table. |
| Select an available Stats and info or Transactions action in its allowed scenario. | Prepared reseller stats-only or financial-only account | The permitted destination opens for that event. |
| Return to Manage Events. | — | No data has been changed. |

**Postconditions:** Leave accounts and permissions unchanged. Hidden buttons alone do not prove API-level authorization; direct URL/API rejection is deferred security regression.

### TC-5: Dashboard - Events - Use card actions with the keyboard

**Description:** Verify the desktop shortcuts and three-dot button can be identified and activated without a mouse.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** Use the prepared owner account and published event.

**Tags:** dashboard, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Manage Events and press Tab until an event action is focused. | Published event | A visible focus indicator identifies the action. |
| Continue tabbing through the card actions. | Five permitted shortcuts and three-dot button | Every action is reachable in a sensible order and is identified by its label/tooltip. |
| Press Enter on a shortcut. | Manage event | The correct event overview opens. |
| Return and focus the three-dot button, then press Enter. | Event options | The menu opens. |
| Press Escape. | Open menu | The menu closes and focus remains usable. |

**Postconditions:** No saved data changes. Screen-reader names and a second supported UI language still require separate execution if included in sign-off.

## Minimum Execution Set

TC-1 on a published event and an expanded recurring date; TC-2 on desktop/phone with published and draft events; TC-3 for a qualifying series; TC-4 with the available prepared role combinations; TC-5 once. Include one medium-width layout check. Record missing role/price-tier setup as blocked rather than passed.

## Source Findings After the User's Fresh Pull

These are confirmed source differences, not confirmed Beta defects:

* Mobile View event uses `redirect(url(href))` without `asNewTab`; the shared redirect uses current-tab navigation by default. Jira requires a new tab on both views.
* Desktop dropdown still contains Stats and info, Check in, and Transactions, duplicating the new shortcuts. Jira asks to avoid those duplicates unless product/design explicitly accepts them; no such decision appears in the ticket's comments.
* Desktop ellipsis uses IconButton with an accessible label but no Tooltip wrapper. Jira asks for a tooltip on every desktop icon-only control.
* Manage event is rendered without an owner-specific guard. Do not assume its presence on a reseller card is a defect: overview may legitimately be available. Authorization of the overview destination needs separate evidence.

## Coverage, Risks, and Unknowns

| Proof target / item | Status |
| --- | --- |
| Correct shortcuts, event identity, menu/panel actions, bulk/clone opening, keyboard focus | Manual-only: TC-1–TC-5; not executed. |
| Published/draft, owner/reseller, financial/stats access, parent/date, price-tier states | Manual-only: setup tables; unprovided accounts/configuration blocked for execution. |
| Drawer closure, reopen, cancellation, copied link | Manual-only: TC-2/TC-3/TC-5. |
| Translation and screen-reader announcement | Deferred to language/assistive-technology run; source uses translated labels. |
| Network failures, denied direct URLs/APIs, permission revocation while open | Deferred regression; current scope is card navigation/visibility. |
| Saved edits, cloning completion, inventory/price mutation, actual check-in, transaction calculations | Not applicable to card-action acceptance; existing destination workflows need their own cases. |
| POS, Electron, native customer apps, payment/provider callbacks | Not applicable to this Dashboard card-only ticket unless separate client usage is demonstrated. |

No live testing, Qase reads/writes, branch comparison, or changed-file discovery was performed. Current local source does not prove the Beta deployment matches. Release decision requires manual evidence and resolution of the Jira/source differences above.

## Sources Reviewed and Automation Candidates

* Jira SPW-20370 read via Atlassian connector: BETA QA, no comments or issue links returned. Parent/epic references in description: SPW-20361 / SPW-19466.
* Backend: `web-app/apps/tickets/models/inventory_management/inventory_permissions.py` (`VenueEventAccess` owner/full-stats fields); event owner-access creation; venue-based event-access serializer/viewset. Backend access facts feed the frontend visibility rules; destination API authorization was not exhaustively audited.
* Frontend, reread after the user's fresh pull: `features/events/hooks/useEventCardPermissions.ts`; `ui/components/EventsCard.web.tsx`, `EventsCardActionButton.web.tsx`, `EventsCardMenu.web.tsx`, `EventsCardMenuDropdown.web.tsx`, `EventsCardMenuDrawer.web.tsx`; bulk-update modal and nested forms; clone page; dashboard event routes; shared redirect hook and breakpoint definitions. Paths are under `showpass-frontend/packages/core/src/app-contexts/dashboard/` except shared modules under `packages/core/src/shared/`.
* Playwright: focused search in `showpass-playwright/pages` and `tests` found no matching new card-action identifiers. Suggested coverage: permission-hook/component tests plus browser assertions for actual destination/event identity, new tabs, clipboard result, responsive menu, modal closure and keyboard behavior. No tests were run.
* [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]], [[00 Start Here/World-Class Software Quality Standard]].

Repository roots: `/Users/christianvaldez/Documents/Showpass/repos/web-app`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`.
