---
title: Event page save and recovery
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local draft; not executed or pushed
---

# Page save and recovery

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

These checks protect the split-page migration: an event save may include fields edited on other pages. A submitted background job is not proof that changes finished saving.

Sources: [event update and pending-state guards](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>), [event save and recurring follow-up work](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [cross-section save integration tests](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/editor-modal/event-sections-save.integration.test.tsx>). Source tests were inspected, not executed.

### TC-9: Dashboard - Events - Preserve another page's saved changes

**Description:** An employee saves two different event pages from two open tabs and confirms the later save does not undo the earlier change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned future single event with no sales.
* Record its subtitle, refund policy and ticket-type prices.
* Select a ticket type with no sales, price tiers or waitlist and record its name.

**Postconditions:** Restore the subtitle, refund policy and price, saving and reopening each affected page.

**Tags:** dashboard, edit-event, edge-case

**Parameters:**

SecondPage: LegalInfo, Tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Basic info for the event in one tab. | | The current subtitle is loaded. |
| Open the same event's selected SecondPage in another tab before saving anything. | **LegalInfo:** Legal & important info; **Tickets:** Tickets | The second page shows the same event's current values. |
| In the first tab, change Subtitle and save. | **Subtitle:** First page saved | Saving completes successfully. |
| In the already-open second tab, change only its selected value. | **LegalInfo:** Refund Policy = Contact the organizer for refund requests.<br>**Tickets:** selected ticket price = 21.00 | The chosen field shows the new value. |
| Save the second page. | | Saving completes without replacing the subtitle with its earlier value. |
| Reopen Basic info from Events. | | Subtitle is still First page saved. |
| Reopen the second page from Events. | | Its saved refund policy or ticket price is also retained. |

### TC-10: Dashboard - Events - Recover from a save attempted without a connection

**Description:** An unsuccessful save is not reported as completed, and the employee can recover without losing unrelated saved event information.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned future single event with no sales.
* Record its name and subtitle. Use a device on which disconnecting the network will not interrupt another person's work.

**Postconditions:** Reconnect the device, restore the original subtitle, save and reopen it.

**Tags:** dashboard, edit-event, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event's Basic info and change Subtitle. | **Subtitle:** Connection recovery check | The unsaved value is visible. |
| Disconnect the device from the network using its network settings. | | The device is offline. |
| Select Save changes once. | | No successful-completion message is shown; the employee receives a failure or incomplete-saving indication rather than an endless successful state. |
| Reconnect the device. | | The network connection is restored. |
| Open the same event in a new tab. | | The last saved state can be read independently of the unsaved form. |
| If the subtitle is unchanged, enter Connection recovery check in the fresh tab and save once. | **Skip this save:** if that exact subtitle is already saved | One completed save is sufficient; no duplicate event is created. |
| Reopen the event from Events. | | The subtitle is Connection recovery check and the original event name is unchanged. |

This covers a disconnected browser, not a database rollback or worker crash. Delayed-job failure and server-commit recovery remain backend fault-test candidates, not claimed manual coverage.

### TC-15: Dashboard - Events - Use page controls with the keyboard and on a narrow screen

**Description:** The employee can reach, edit, save and reopen one event setting using the keyboard, including controls inside drawers or dialogs.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for an owned single event with no sales.
* Record the original value of the field selected below.
* For the keyboard run, use a desktop keyboard. For the mobile run, use a supported phone browser and record its OS/browser version.

**Postconditions:** Restore the selected field, save and reopen it.

**Tags:** dashboard, edit-event, mobile-view

**Parameters:**

Page: BasicInfo, Tickets, LegalInfo, AdvancedOptions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event and the selected Page using its sidebar item. | **Page:** selected parameter | The page and event name are identifiable and the selected sidebar item is indicated. |
| Move through its controls using Tab and Shift+Tab on desktop, or normal touch controls on the phone. | | Labels, visible focus and controls remain usable without clipped actions or horizontal scrolling that hides required fields. |
| Open the selected field's drawer or dialog if required. | **BasicInfo:** Subtitle; **Tickets:** Ticket PDF Custom Message in event settings; **LegalInfo:** Refund Policy; **AdvancedOptions:** Thermal ticket message | The control can be reached and its label is readable. |
| Enter the replacement value. | **Value:** Access check | The field accepts the text without losing focus unexpectedly. |
| Apply the dialog changes with Done or its displayed confirmation action; close a drawer only after retaining the entered value. | | The value is retained for saving, focus returns to a usable control, and the page is not trapped behind an overlay. |
| Save using the page's save action. | | The save action is reachable and saving succeeds. |
| Reopen the page and field. | | Access check remains saved. |
