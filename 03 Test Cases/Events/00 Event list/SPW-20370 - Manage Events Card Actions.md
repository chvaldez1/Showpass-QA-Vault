---
title: SPW-20370 - Manage Events Card Actions
tags:
  - qa/events
status: Published to Qase; not executed
---

# SPW-20370 - Manage Events Card Actions

**Qase location:** [Events > Manage Events List](https://app.qase.io/project/SPT?suite=85)

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Qase publication — 2026-10-14

All cases below were created and read back, including every field and step. Test execution is still pending.

| Former local draft | Qase case | Folder | Steps |
| --- | --- | --- | --- |
| TC-1 | [SPT-5359](https://app.qase.io/case/SPT-5359) | Manage Events List (85) | 5 |
| TC-2 | [SPT-5360](https://app.qase.io/case/SPT-5360) | Manage Events List (85) | 9 |
| TC-3 | [SPT-5361](https://app.qase.io/case/SPT-5361) | Manage Events List (85) | 9 |
| TC-4 | [SPT-5362](https://app.qase.io/case/SPT-5362) | Manage Events List (85) | 5 |
| TC-5 | [SPT-5363](https://app.qase.io/case/SPT-5363) | Manage Events List (85) | 6 |

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
* For permission checks, prepared accounts with the access described in SPT-5362. A reseller organization sells tickets for another organization's event; it does not own that event.

No setup was created or verified. Missing records/accounts block only their corresponding scenarios. Start at desktop width around 1280 pixels; use a phone-sized browser around 390 pixels for mobile. At 577–767 pixels the current implementation mixes the mobile Edit layout with a dropdown, so include one check around 650 pixels for missing/overlapping actions without assuming it must be a drawer.

## Manual Test Cases

### SPT-5359: Dashboard - Events - Open the correct event from desktop shortcuts

**Description:** An employee opens an event from each desktop shortcut and confirms the selected event or recurring date remains selected.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Administer Transactions or Box Office Sales permission for the organization that owns the event.
* Have a published single event and a published recurring series with at least two dates. Record their names and the selected recurring date.
* Use a desktop browser. Run each Action on the single event and on one date expanded from the series.

**Postconditions:** Leave all destination forms unchanged; do not scan tickets or save edits.

**Tags:** dashboard, events

**Parameters:**

Action: ManageEvent, Edit, StatsAndInfo, CheckIn, Transactions, TrackingLinks

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → Manage Events. | **Organization:** event owner; **Event:** recorded single event or recurring date | The correct event card is visible. |
| Hover over the selected shortcut icon. | **ManageEvent:** Manage event; **Edit:** Edit; **StatsAndInfo:** Stats and info; **CheckIn:** Check in; **Transactions:** Transactions; **TrackingLinks:** Tracking links | A readable tooltip names the selected action. |
| Select that shortcut. | **Action:** selected parameter | The named page opens; Manage event opens Overview and Edit opens Basic info. |
| Read the destination's event name and date. | **Expected event:** recorded name and date | The destination identifies the selected event or occurrence. |
| Return to Manage Events. | **Navigation:** browser Back or original tab | The event list is available without a saved data change. |

### SPT-5360: Dashboard - Events - Use event options on desktop and mobile

**Description:** An employee opens an owned event's options, views its public page or draft preview, copies its link and uses available phone actions. The event ID and selected event stay correct across desktop and phone views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events and Administer Transactions or Box Office Sales permission for the organization that owns the events.
* Have one published event, one draft and a published recurring series with an individual date. Record their names and dates.
* Run on desktop and a phone browser; reopen the same card's three-dot options before each menu action.
* Use the published event for Stats and info, Check in, Transactions and Tracking links. Drafts do not offer those actions.

**Postconditions:** Close extra public/preview tabs and leave event data unchanged. Copying replaces clipboard contents; discard the pasted address without sending it.

**Tags:** dashboard, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → Manage Events and open the selected card's three-dot options. | **Cards:** published event, draft, recurring series and one expanded date, one at a time | Desktop shows a menu; phone shows the Event options panel. |
| Read Event ID for the same card in both views. | **Expected ID:** record the desktop value before checking the phone | Both views identify the same event ID. |
| Select View event for the published event. | **Event:** recorded published event | Its public event page opens in a new tab for that event. |
| Select View event for the draft. | **Event:** recorded draft | Its draft preview opens in a new tab for that draft. |
| Select Copy event link for the published event. | **Event:** recorded published event | A copied-link confirmation appears. |
| Paste into the browser address bar without opening the address. | **Copied text:** clipboard link | The address belongs to the selected event; discard it afterward. |
| On the phone, select each available destination from the published event's options. | **Actions:** Stats and info, Check in, Transactions and Tracking links, one at a time | Each matching page opens for that event and the options panel closes. |
| On the phone, select the direct Edit icon. | **Event:** recorded owned event | Basic info opens for the same event. |
| On the phone, reopen Event options and select its close button. | | The panel closes and the event card remains usable. |

### SPT-5361: Dashboard - Events - Open Bulk update and Clone from event options

**Description:** An employee opens bulk inventory, bulk price and cloning forms from an owned recurring series on desktop and phone without submitting a change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for the organization that owns the recurring series.
* The series has at least two existing dates, and price_tiers_enabled is on for the organization. Record the series name.
* Use desktop and phone views. No inventory, price or clone submission is needed.

**Postconditions:** Close the opened forms without submitting them; no event or ticket data changes.

**Tags:** dashboard, events, bulk-update

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → Manage Events and the series card's three-dot options. | **Series:** recorded name | Bulk update and Clone are available. |
| Select Bulk update. | | The window offers Event inventory and Ticket type price; the phone options panel closes. |
| Select Event inventory. | **Input:** leave values unchanged | The inventory form opens for the selected series. |
| Select Back. | | The Bulk update choices return. |
| Select Ticket type price. | **Input:** leave values unchanged | The price form opens for the selected series. |
| Select Back. | | The Bulk update choices return. |
| Close Bulk update. | | Manage Events is usable again. |
| Reopen the series options and select Clone. | **Series:** same recorded source | The Clone event form identifies the selected source event. |
| Return to Manage Events without submitting. | **Navigation:** browser Back | No clone or bulk update is created. |

### SPT-5362: Dashboard - Events - Show only eligible card actions

**Description:** An employee sees card actions allowed by event ownership, event status, employee permissions and the organization's price-tier setting. A reseller organization sells another organization's tickets and does not own that event.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| AccessScenario | Required account and event | Expected actions |
| --- | --- | --- |
| OwnerPublished | Owning organization; Manage Events plus Administer Transactions or Box Office Sales; published event | Manage event, Edit, Stats and info, Tracking links, Check in and Transactions available |
| OwnerNoTransactions | Owning organization; Manage Events; neither Administer Transactions nor Box Office Sales; published event | Transactions hidden; other owner shortcuts remain available |
| OwnerDraft | Owning organization; Manage Events plus Administer Transactions; draft | Edit available; Stats and info, Tracking links, Check in and Transactions hidden |
| ResellerNoManageEvents | Reseller with existing access to the published event; no Manage Events, Administer Transactions or Box Office Sales | Owner actions, Stats and info, Tracking links and Transactions hidden |
| ResellerManageEvents | Reseller with existing event access and Manage Events; no transaction permission | Stats and info and Tracking links available; Transactions and owner-only Edit, Check in, Bulk update and Clone hidden |
| ResellerTransactions | Reseller with existing event access and Administer Transactions; no Manage Events | Transactions available; Stats and info, Tracking links and owner-only actions hidden |
| OwnerChild | Owning organization; Manage Events; individual date with no children | Clone and Bulk update hidden |
| OwnerSeriesNoPriceTiers | Owning organization; Manage Events; series with children; price_tiers_enabled off | Bulk update hidden; Clone available |
| OwnerStandalone | Owning organization; Manage Events; standalone event with no children | Clone available; Bulk update hidden |

**Preconditions:**

* Have the account and event described by the selected AccessScenario; record the organization and event name/date.
* Reseller scenarios require an existing organization-to-event access record. Full stats access affects the sales summary and is not a substitute for the employee's Manage Events permission.
* Use employee accounts configured as the selected scenario; do not change shared employee permissions for execution.
* Run each scenario on desktop and a phone browser.

**Postconditions:** Leave accounts, permissions, events and price-tier configuration unchanged.

**Tags:** dashboard, events, employee-permissions

**Parameters:**

AccessScenario: OwnerPublished, OwnerNoTransactions, OwnerDraft, ResellerNoManageEvents, ResellerManageEvents, ResellerTransactions, OwnerChild, OwnerSeriesNoPriceTiers, OwnerStandalone

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in to the selected account and open Dashboard → Events → Manage Events. | **Account/event:** selected AccessScenario | The intended accessible event card is shown. |
| Inspect the card's direct icons. | **Expected actions:** selected scenario row | Only the listed eligible shortcuts appear; phone shows its applicable direct Edit control. |
| Open the card's three-dot options. | **Event:** same recorded card | Menu actions follow the same ownership, status and permission rules. |
| Select an available Stats and info or Transactions action for a reseller scenario that permits it. | **Skip:** scenarios without an eligible reseller destination | The permitted destination opens for the selected event. |
| Return to Manage Events. | | No saved data changes. |

### SPT-5363: Dashboard - Events - Use card actions with the keyboard

**Description:** An employee identifies and activates desktop shortcuts and the three-dot menu using the keyboard, then closes the menu without changing event data.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events and Administer Transactions or Box Office Sales permission for the organization that owns a published event.
* Record the event's name and date. Use a desktop browser and keyboard.

**Postconditions:** Leave all destination forms unchanged; no saved data changes.

**Tags:** dashboard, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → Manage Events and press Tab until the recorded event's action is focused. | **Event:** recorded published event | A visible focus indicator identifies the action. |
| Continue tabbing through its actions. | **Actions:** Manage event, Edit, Stats and info, Check in, Transactions, Tracking links and three-dot options | Every action is reachable and has a readable label or tooltip. |
| Press Enter on Manage event. | | The selected event's Overview opens. |
| Return to Manage Events and focus the three-dot button. | | The correct event's options button is focused. |
| Press Enter. | | The menu opens. |
| Press Escape. | | The menu closes and focus remains usable. |

## Minimum Execution Set

SPT-5359 on a published event and an expanded recurring date; SPT-5360 on desktop/phone with published and draft events; SPT-5361 for a qualifying series; SPT-5362 with the available prepared role combinations; SPT-5363 once. Include one medium-width layout check. Record missing role/price-tier setup as blocked rather than passed.

## Source Findings — refreshed 2026-10-14

These are confirmed source differences, not confirmed Beta defects:

* Mobile View event uses `redirect(url(href))` without `asNewTab`; the shared redirect uses current-tab navigation by default. Jira requires a new tab on both views.
* Desktop dropdown still contains Stats and info, Check in, and Transactions, duplicating the new shortcuts. Jira asks to avoid those duplicates unless product/design explicitly accepts them; no such decision appears in the ticket's comments.
* Desktop ellipsis uses IconButton with an accessible label but no Tooltip wrapper. Jira asks for a tooltip on every desktop icon-only control.
* Manage event and Edit now use the same owner guard. Stats and info and Tracking links require existing event access plus Manage Events permission and a non-draft event; full stats access separately controls the card's sales summary.
* Transactions requires Administer Transactions or Box Office Sales and a non-draft event. The case prerequisites use these exact permission names rather than the former generic financial-access wording.

## Coverage, Risks, and Unknowns

| Proof target / item | Status |
| --- | --- |
| Correct shortcuts, event identity, menu/panel actions, bulk/clone opening, keyboard focus | Manual-only: SPT-5359–SPT-5363; not executed. |
| Published/draft, owner/reseller, financial/stats access, parent/date, price-tier states | Manual-only: setup tables; unprovided accounts/configuration blocked for execution. |
| Drawer closure, reopen, cancellation, copied link | Manual-only: SPT-5360/SPT-5361/SPT-5363. |
| Translation and screen-reader announcement | Deferred to language/assistive-technology run; source uses translated labels. |
| Network failures, denied direct URLs/APIs, permission revocation while open | Deferred regression; current scope is card navigation/visibility. |
| Saved edits, cloning completion, inventory/price mutation, actual check-in, transaction calculations | Not applicable to card-action acceptance; existing destination workflows need their own cases. |
| POS, Electron, native customer apps, payment/provider callbacks | Not applicable to this Dashboard card-only ticket unless separate client usage is demonstrated. |

No live testing, branch comparison, or changed-file discovery was performed. Qase publication status is recorded in the Events index. Current local source does not prove the Beta deployment matches. Release decision requires manual evidence and resolution of the Jira/source differences above.

## Sources Reviewed and Automation Candidates

* Jira SPW-20370 read via Atlassian connector: BETA QA, no comments or issue links returned. Parent/epic references in description: SPW-20361 / SPW-19466.
* Backend: `web-app/apps/tickets/models/inventory_management/inventory_permissions.py` (`VenueEventAccess` owner/full-stats fields); event owner-access creation; venue-based event-access serializer/viewset. Backend access facts feed the frontend visibility rules; destination API authorization was not exhaustively audited.
* Frontend, reread 2026-10-14: `features/events/hooks/useEventCardPermissions.ts`; `ui/components/EventsCard.web.tsx`, `EventsCardActionButton.web.tsx`, `EventsCardMenu.web.tsx`, `EventsCardMenuDropdown.web.tsx`, `EventsCardMenuDrawer.web.tsx`; bulk-update modal and nested forms; clone page; dashboard event routes; shared redirect hook and breakpoint definitions. Paths are under `showpass-frontend/packages/core/src/app-contexts/dashboard/` except shared modules under `packages/core/src/shared/`. Backend HEAD: `039444e79d`; frontend HEAD: `d606f20bbd`. These identify checked-out source, not the deployed build.
* Playwright: focused search in `showpass-playwright/pages` and `tests` found no matching new card-action identifiers. Suggested coverage: permission-hook/component tests plus browser assertions for actual destination/event identity, new tabs, clipboard result, responsive menu, modal closure and keyboard behavior. No tests were run.
* [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]], [[00 Start Here/World-Class Software Quality Standard]].

Repository roots: `/Users/christianvaldez/Documents/Showpass/repos/web-app`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`.
