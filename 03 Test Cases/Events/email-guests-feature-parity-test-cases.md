---
title: Event Email Guests UI Test Cases
date: 2026-07-29
tags:
  - qa/test-cases
  - qa/events
  - qase
aliases:
  - Email Guests Qase Test Cases
  - Event Email Guests UI Coverage
status: review-ready
related:
  - "[[00 Start Here/World-Class Software Quality Standard]]"
  - "[[06 Prompts/Showpass QA Test Case Generator]]"
  - "[[05 Tooling/Qase Test Case Writing Rules]]"
---

# Event Email Guests UI Test Cases

## Testing Intent

We are testing whether an organizer can use `/manage/events/{slug}/email-guests/` with the same visible controls and outcomes as the legacy `/dashboard/events/{slug}/manage/#/notify-guests` page.

| Field | Answer |
| --- | --- |
| Criticality bucket | Permission boundary and organizer dashboard workflow |
| Business invariant | An eligible organizer can configure and submit an event email, while unavailable actions, required fields, and pending-review outcomes are represented accurately in the UI. |
| User impact | An organizer may be unable to contact guests, may submit the wrong configuration, or may believe a pending email was sent. |
| Observable proof | Page controls, defaults, validation, conditional sections, sending state, success redirect, and pending-review message. |
| Primary surface | Authenticated Web Dashboard |
| Confidence | High for source-backed UI behavior; live execution has not been performed. |

## Proof Target Map

| Proof Target | Covered By |
| --- | --- |
| Eligible organizers can open and use the Email guests form | TC-1 |
| Ineligible organizer or event states do not expose a usable form | TC-2 |
| Required recipient and message input is enforced | TC-3 |
| A valid submission shows one sending and success flow | TC-4 |
| Event status controls match the event lifecycle | TC-5 |
| Refund controls match organizer permission and venue setup | TC-6 |
| Approval-required content is shown as pending, not sent | TC-7 |

## Declared Scope

### In Scope

- Canonical route and event-navigation entry.
- Visible feature parity with the legacy page.
- Ticket type selection, optional Subject, Message editor, Bold, Italic, ticket PDF checkbox, event status, refund controls, warnings, and Send email.
- Draft, missing-permission, and no-ticket-type unavailable states.
- Required-field validation.
- Sending, success, redirect, and pending-review UI outcomes.

### Out of Scope

- Email inbox delivery and final message rendering.
- Recipient-generation rules, duplicate addresses, transfers, package ownership, and recurring-event fan-out.
- PDF content, messaging charges, invoices, refund completion, and exchange completion.
- API ownership/security checks, task queues, Slack approval processing, and other backend-only behavior.
- Mobile layout and broad accessibility testing.

## Summary of Behavior

The canonical page replaces the Angular page without changing the organizer workflow. An organizer selects ticket types, optionally enters a subject, writes a message, optionally attaches ticket PDFs, and submits. Upcoming events can expose an event-status selector. Organizers with financial permission can expose refund-request fields. The page must clearly distinguish validation, sending, success, unavailable, and pending-review states.

## Qase Cases

| Local Label | Qase Case |
| --- | --- |
| TC-1 | [SPT-5012](https://app.qase.io/project/SPT?case=5012&suite=1035) |
| TC-2 | [SPT-5013](https://app.qase.io/project/SPT?case=5013&suite=1035) |
| TC-3 | [SPT-5014](https://app.qase.io/project/SPT?case=5014&suite=1035) |
| TC-4 | [SPT-5015](https://app.qase.io/project/SPT?case=5015&suite=1035) |
| TC-5 | [SPT-5016](https://app.qase.io/project/SPT?case=5016&suite=1035) |
| TC-6 | [SPT-5017](https://app.qase.io/project/SPT?case=5017&suite=1035) |
| TC-7 | [SPT-5018](https://app.qase.io/project/SPT?case=5018&suite=1035) |

## Sources Reviewed

### Vault

- [[00 Start Here/World-Class Software Quality Standard]]
- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]
- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]

### Backend UI and Contract References

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/manage/notify-guests.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/dashboard/emails/partials/__create-email-notification-form.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/emails/verify.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/emails/api/venue_based/serializers.py`

### Frontend

- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/manage/events/[slug]/email-guests.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/email-guests/hooks/useEmailGuestsPage.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/email-guests/utils/email-guests-form-fields.ts`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/email-guests/ui/components/EmailGuestsFormContent.web.tsx`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/email-guests/ui/pages/EventEmailGuestsPage.web.tsx`

Qase was searched for existing Email Guests cases before creation. No title matches were found. TC-1 through TC-7 were created in suite `1035` as SPT-5012 through SPT-5018 and verified by readback.

## Assumptions and Unknowns

- `Dashboard` is used as the Qase Platform value for this authenticated organizer page.
- The test environment has an organizer account with Manage Events permission and another with Manage Financials permission.
- The environment has disposable event-email fixtures so valid and pending submissions are safe.
- TC-1 can compare with the legacy page only where the legacy route still renders instead of redirecting.

## Source-Backed Behavior

- Manage Events permission and the Events module are required.
- Draft events hide Email guests navigation and direct access shows an unavailable state.
- Events without ticket types show an unavailable state.
- Every event ticket type starts selected.
- Subject is optional.
- Message is required and the editor exposes Bold and Italic only.
- At least one ticket type must remain selected.
- Ticket PDF is off by default.
- Upcoming events show an event-status selector; past events do not.
- Cancelled, Refunded, and Template cannot be newly selected. A terminal original status locks the selector.
- Refund controls require Manage Financials permission.
- Enabling a refund request reveals expiry and refund type, plus exchange and package guidance when applicable.
- Send email is disabled and labelled Sending while submission is active.
- Normal success shows a recipient-count message and redirects to Event Overview.
- Approval-required content remains on the page and states that the email is pending review and has not been sent.

## Risk Areas

- The migrated page could omit a legacy control or change its default.
- Ticket type selection could be difficult to understand or clear accidentally.
- Empty rich text can appear non-empty because of formatting.
- Conditional event-status or refund controls could appear for the wrong organizer or event.
- The Send email action could remain active during submission.
- Pending-review copy could incorrectly imply that an email was sent.

## State-Space / Setup Matrix

| Axis | Representative Setup | Covered By |
| --- | --- | --- |
| Organizer access | Manage Events; missing Manage Events | TC-1, TC-2 |
| Event state | Upcoming; past; draft; no ticket types; terminal status | TC-2, TC-5 |
| Required input | Ticket types selected/empty; message filled/empty | TC-1, TC-3 |
| Submission result | Success; pending review | TC-4, TC-7 |
| Financial permission | Manage Events only; Manage Events plus Manage Financials | TC-6 |
| Refund setup | Exchange eligible/ineligible; package-origin warning present/absent | TC-6 |

## Coverage Ledger

| UI Item | Coverage |
| --- | --- |
| Route, navigation, fields, defaults, warnings | TC-1 |
| Permission, draft, and no-ticket-type unavailable states | TC-2 |
| Ticket type and message validation | TC-3 |
| Sending, disabled action, success, redirect | TC-4 |
| Upcoming, past, and terminal status presentation | TC-5 |
| Refund permission and conditional fields | TC-6 |
| Pending-review presentation | TC-7 |
| Load failure and refund-inventory failure | Automated/deferred because they require controlled request failures |
| Email delivery, billing, ownership, recurrence, and background processing | Out of scope for this UI-only suite |

## Recommended Test Data

- An upcoming, non-draft event with two ticket types and at least one reachable guest.
- A past event that has ended.
- A draft event with at least one ticket type.
- A non-draft event without ticket types.
- An upcoming event already in Cancelled status.
- Organizer with Manage Events only.
- Organizer with Manage Events and Manage Financials.
- Employee without Manage Events.
- Venue with customer-visible Exchanges enabled.
- Event with package-origin tickets for the refund warning.

## Qase-Ready Manual Test Cases

### TC-1: Dashboard - Email Guests - Verify an organizer can use the message form

**Description:**

Validates the visible Email guests controls, defaults, and basic field interactions on the canonical page. This protects the organizer workflow from feature-parity regressions during migration.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with Manage Events permission.
* An upcoming, non-draft event belongs to the active venue and has two ticket types.

**Postconditions:**

* No email is submitted.
* The event remains unchanged.

**Tags:** dashboard, notifications, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open an upcoming, non-draft event with two ticket types in Web Dashboard and select **Email guests**. | Event slug | `/manage/events/{slug}/email-guests/` opens and Email guests is the active event-navigation item. |
| Review the initial form. | None | Both ticket types are selected, Subject is blank, the ticket PDF checkbox is off, and the transactional-only warning is visible. |
| Open **Ticket types**. | None | Both event ticket types are available. |
| Remove one ticket type. | One ticket type | The removed type is no longer selected and the remaining type stays selected. |
| Search for and select the removed ticket type. | Ticket type name | The ticket type returns to the selection. |
| Enter a subject. | `Important event update` | The subject remains visible. |
| Enter a message. | `The event entrance opens at 6:30 PM.` | The message remains visible in the editor. |
| Apply **Bold** to `event entrance`. | Selected phrase | The selected phrase displays in bold. |
| Apply **Italic** to `6:30 PM`. | Selected time | The selected time displays in italic. |
| Review the editor toolbar. | None | Bold and Italic are available; link, image, heading, list, underline, and blockquote controls are absent. |
| Toggle **Attach each guest's tickets as a PDF** on and off. | On, then Off | The checkbox follows the organizer's selection. |
| Leave the page without selecting **Send email**. | None | No success or pending message appears. |

### TC-2: Dashboard - Email Guests - Verify unavailable organizer and event states

**Description:**

Validates that the page does not expose a usable email form when the organizer lacks access or the event cannot use Email guests.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An account and event fixture exist for every `UnavailableState`.

**Postconditions:**

* No email or event data is changed.

**Tags:** dashboard, employee-permissions, events

**Parameters:**

UnavailableState: MissingManageEventsPermission, DraftEvent, EventWithoutTicketTypes

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Web Dashboard with the parameterized account and event. | `UnavailableState` | Only content available to that employee and event state is shown. |
| Inspect event navigation for **Email guests**. | Parameterized event | The entry is absent when access or event state makes Email guests unavailable. |
| Open `/manage/events/{slug}/email-guests/` directly. | Parameterized slug | Access is denied, a draft-event warning appears, or the page states that the event has no ticket types. |
| Inspect the page. | None | A usable Ticket types, Subject, Message, and Send email form is not displayed. |

### TC-3: Dashboard - Email Guests - Verify required fields block sending

**Description:**

Validates organizer-facing validation for the two required inputs: at least one ticket type and a visible message.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with Manage Events permission.
* An upcoming, non-draft event has two ticket types.

**Postconditions:**

* No email is submitted.

**Tags:** dashboard, notifications, edge-case

**Parameters:**

MissingInput: NoTicketTypesSelected, EmptyMessage

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open `/manage/events/{slug}/email-guests/` for the upcoming, non-draft event. | Event slug | The Email guests form loads. |
| Prepare the parameterized missing input while keeping the other required input valid. | `MissingInput` | The form contains only the intended missing value. |
| Select **Send email**. | None | The page stays on Email guests and does not show success. |
| Review the invalid field. | None | The page asks the organizer to select at least one ticket type or enter a message. |
| Enter a valid value in the invalid field without submitting. | One ticket type or `Valid event message` | The field now contains valid input. |
| Leave the page. | None | No email is submitted. |

### TC-4: Dashboard - Email Guests - Verify a valid email submission shows success

**Description:**

Validates the organizer-visible sending and success flow for a valid event email. This protects against duplicate submission and a broken return to Event Overview.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with Manage Events permission.
* An upcoming, non-draft event has at least one ticket type with a reachable guest.
* The event and email are disposable test data.

**Postconditions:**

* Preserve the submitted test email as execution evidence.

**Tags:** dashboard, notifications, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open `/manage/events/{slug}/email-guests/` for the upcoming, non-draft event. | Event slug | The Email guests form loads. |
| Select one ticket type. | Disposable guest ticket type | Only that ticket type remains selected. |
| Enter a subject. | `EG UI success {timestamp}` | The subject remains visible. |
| Enter a message without cancellation, refund, or postpone wording. | `Please review the updated event entrance details.` | The message remains visible. |
| Select **Send email** once. | None | The action changes to **Sending...** and cannot be selected again while submission is active. |
| Wait for the result. | None | One success message shows the number of guests and the browser returns to Event Overview. |

### TC-5: Dashboard - Email Guests - Verify event-status controls follow event state

**Description:**

Validates the organizer-visible status selector for upcoming, past, and terminal events.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer is signed in with Manage Events permission.
* One Active event ends in the future.
* One event has ended.
* One Cancelled event ends in the future.

**Postconditions:**

* No event status is changed.
* No email is submitted.

**Tags:** dashboard, events, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Email guests for the upcoming Active event. | Event slug | **Update event status before sending** is visible and enabled. |
| Open the status options. | None | Active and Postponed can be selected; Cancelled, Refunded, and Template are disabled; Draft, Rescheduled, and Refund In Progress are absent. |
| Open Email guests for the event that has ended. | Event slug | **Update event status before sending** is absent. |
| Open Email guests for the upcoming Cancelled event. | Event slug | The status selector is disabled and states that the event status cannot be changed from this page. |

### TC-6: Dashboard - Email Guests - Verify refund controls follow organizer permission and setup

**Description:**

Validates the organizer-visible refund section, conditional fields, and guidance without submitting a refund request.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* One organizer has Manage Events only.
* One organizer has Manage Events and Manage Financials.
* The event is upcoming, non-draft, and has ticket types.
* The venue has customer-visible Exchanges enabled.
* The event has at least one package-origin ticket.

**Postconditions:**

* No email or refund request is submitted.

**Tags:** dashboard, refunds, employee-permissions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the organizer with Manage Events only and open Email guests. | Event slug | The standard message form is available and the Refund request section is absent. |
| Sign in as the organizer with Manage Financials and open Email guests for the same event. | Event slug | The Refund request section is visible. |
| Enable **Include a refund request**. | On | Refund request expiry and Refund type appear. |
| Review the default expiry. | Event start and timezone | The expiry defaults to the event start and displays the event timezone. |
| Review **Refund type**. | None | Full Refund is selected by default and unsupported partial/admin refund choices are absent. |
| Review the service-fee guidance. | None | The page explains when refunded service fees are charged to the organizer. |
| Review the exchange control. | None | **Show Exchange Tickets button in email** is visible for the exchange-eligible venue. |
| Review the package warning. | None | The page explains that package-origin customers are not refunded from this event and identifies the issuing-event path. |
| Turn **Include a refund request** off. | Off | Refund-only fields and guidance are hidden and the ordinary per-email price notice returns. |
| Leave the page without selecting **Send email**. | None | No email or refund request is submitted. |

### TC-7: Dashboard - Email Guests - Verify approval-required content shows pending review

**Description:**

Validates the organizer-visible outcome when email content requires approval. This protects against presenting a pending email as sent.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* A non-superuser organizer is signed in with Manage Events permission.
* The event has one selected ticket type with at least one reachable guest.
* The event and pending email are disposable test data.

**Postconditions:**

* Preserve the pending email for review.
* Do not approve, reject, resend, or delete it during this case.

**Tags:** dashboard, notifications, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open `/manage/events/{slug}/email-guests/` for the approval fixture. | Event slug | The Email guests form loads. |
| Select one ticket type. | Disposable guest ticket type | One ticket type remains selected. |
| Enter a subject. | `EG UI pending {timestamp}` | The subject remains visible. |
| Enter a message containing cancellation wording. | `This cancellation update requires review.` | The message remains visible. |
| Select **Send email** once. | None | The action changes to **Sending...** and cannot be selected again while submission is active. |
| Wait for the result. | None | The page remains on Email guests and states that the email is pending review and has not been sent. |
| Inspect the page after the result. | None | The compose form is replaced by the pending-review message and no sent-success redirect occurs. |

## Minimum Execution Set

- TC-1: Message form and field interactions.
- TC-2: `MissingManageEventsPermission` and `DraftEvent`.
- TC-3: Both missing-input values.
- TC-4: Valid submission success.
- TC-6: Refund section for both organizer permissions.
- TC-7: Pending-review outcome.

## Suggested Automated Coverage

- Route and navigation visibility for eligible, draft, and unauthorized states.
- Default field values and ticket type selection.
- Empty ticket selection and visually empty Message validation.
- Sending-disabled state, one submission, success copy, and Overview redirect.
- Upcoming/past/terminal status-control rendering.
- Financial permission and refund-field conditional rendering.
- Pending-review copy and lack of redirect.
- Controlled load-error and refund-inventory-error states.

## Open Questions

- Which environment should be used for a live legacy-page comparison?
