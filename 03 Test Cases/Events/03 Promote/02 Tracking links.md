---
title: Event — Tracking links
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Tracking links

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Scope and shared coverage

Event-owned cases below stay in Tracking Links (1052). Refer to [shared Tracking Links — suite 183](https://app.qase.io/project/SPT?suite=183) for global search/export, affiliate/checkout links and attribution (SPT-4236–4238/4240/4241/4800/4801). SPT-5157 overlaps the stronger event cases. SPT-5256–5262/5270 are generated route/run variants: do not count them as independent behavioral gaps without comparing their steps.

Check create/cancel, applicable link types, selected event, copy/open destination, filter clear and access denial. Attribution still requires a controlled customer journey; a copied URL is not proof of a tracked sale.

Source: [event Tracking links page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ui/pages/EventTrackingLinksPage.web.tsx>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-4239: Dashboard - Tracking Links - Create custom event tracking link

**Description:**

Verify a Custom tracking link can be created for an event and can expose selected seller-only ticket types when opened.

**Preconditions:**

Organizer is logged into the dashboard. A public event exists with at least one public ticket type and, for seller-only coverage, at least one ticket type set to Visible to Sellers Only.

**Postconditions:**

Custom link is created and listed on the dashboard; seller-only ticket types selected for the link are visible when using the link; when Hide public ticket types is enabled, only selected seller-only ticket types are visible during the tracking-link session window.

**Tags:** tracking-links, dashboard

**Parameters:**

TicketVisibility: PublicOnly, SellersVisible, HidePublicTicketTypes

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Tracking Links and click Create tracking link |  |  |
| Select Custom |  |  |
| Enter a description and select the related event |  |  |
| If the event has seller-only ticket types, select one under Ticket type display |  |  |
| Optionally enable Hide public ticket types |  |  |
| Create the link |  |  |
| Copy and open the link in a fresh browser session. |  | Custom link is created and listed on the dashboard; seller-only ticket types selected for the link are visible when using the link; when Hide public ticket types is enabled, only selected seller-only ticket types are visible during the tracking-link session window. |

### SPT-4242: Dashboard - Tracking Links - Create quick purchase event link

**Description:**

Verify a Quick Purchase tracking link can be created for an event and used to complete a purchase with the expected confirmation experience.

**Preconditions:**

Organizer is logged into the dashboard. A public event exists with public tickets and, for seller-only coverage, at least one ticket type set to Visible to Sellers Only.

**Postconditions:**

Quick Purchase link is created and listed on the dashboard; selected seller-only ticket visibility is applied when the link is opened; purchase can complete; confirmation screen is shown with the expected ticket/QR confirmation behavior.

**Tags:** tracking-links, dashboard, checkout

**Parameters:**

TicketVisibility: PublicOnly, SellerOnlyVisible, HidePublicTicketTypes

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Tracking Links and click Create tracking link |  |  |
| Select Quick Purchase |  |  |
| Enter a description and select the related event |  |  |
| Configure Ticket type display as needed |  |  |
| Optionally enable Hide public ticket types |  |  |
| Create the link |  |  |
| Open the link in a fresh browser session and complete a test purchase. |  | Quick Purchase link is created and listed on the dashboard; selected seller-only ticket visibility is applied when the link is opened; purchase can complete; confirmation screen is shown with the expected ticket/QR confirmation behavior. |

### SPT-5010: Dashboard - Tracking Links - Create a fixed Custom link from the event route

**Description:**

Verify the event-route create intent opens once, fixes the selected event and Custom type, and saves the new link into the same event list.

**Preconditions:**

- A venue employee is signed in to a Standard or Premium venue with event-management permission.
- Event A has at least one public ticket type.
- Record Event A's slug and exact public event name.
- Use a unique description containing the current date and QA employee initials.

**Postconditions:**

- Classify the link as Cleanup-required or Preserve-for-review before execution.
- If Cleanup-required, delete only the created link after verifying it has no completed purchases, then reload and verify it is gone.
- If Preserve-for-review, record its description and short URL and do not delete it until cleanup is explicitly approved.

**Tags:** tracking-links, dashboard, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open `/manage/events/{event-a-slug}/tracking-links/?create=true`. | Event A slug | Create Tracking Link opens once and `create=true` disappears from the URL. |
| Read the Event field and creation controls. | Event A name | Event A is read-only and no Link Type selector is available. |
| Select **Cancel** and wait five seconds. | None | The modal stays closed. |
| Select **Create tracking link** on the page. | None | A new modal opens with Event A still fixed and no Link Type selector. |
| Enter the unique description. | Unique description | The description is accepted. |
| Select **Create tracking link** in the modal. | None | A success message appears and one card with the unique description appears. |
| Reload the browser. | None | The same card remains and no duplicate appears. |
| Open **Link Type** and select **Custom**. | None | The new card remains visible. |
| Record the short URL displayed on the new card. | Unique description | One short URL is visible. |
| Open a private browser window and enter the recorded short URL. | Recorded short URL | The public page opens. |
| Read the public event name. | Event A public name | The page shows Event A. |

### SPT-5011: Dashboard - Tracking Links - Enforce event page access boundaries

**Description:**

Verify the event Tracking Links route exposes neither list data nor creation controls when event access, venue plan, Events module, or employee permission does not allow access.

**Preconditions:**

- The test setup owner supplies the exact account, venue, and slug for each AccessState. Do not change plans, modules, permissions, or event ownership.
- InvalidSlug uses the current authorized venue and a documented nonexistent slug.
- InaccessibleSlug uses an event the active venue does not own and cannot resell.
- BasicTier uses an existing Basic venue with an otherwise authorized employee.
- MissingManageEvents uses an existing Standard/Premium employee without event-management permission.
- MissingEventsModule uses an existing Standard/Premium venue without the Events module.

**Postconditions:**

No data is changed.

**Tags:** tracking-links, dashboard, employee-permissions

**Parameters:**

AccessState: InvalidSlug, InaccessibleSlug, BasicTier, MissingManageEvents, MissingEventsModule

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in with the supplied account and select its supplied venue. | AccessState account and venue | The intended existing test setup is active. |
| Open `/manage/events/{slug}/tracking-links/` using the supplied slug. | AccessState slug | Invalid/inaccessible events show a safe load error; Basic shows unavailable; missing permission/module prevents access. |
| Look for tracking-link cards. | None | No tracking-link card or performance data is visible. |
| Look for **Export CSV** and **Create tracking link**. | None | Neither action is available. |

