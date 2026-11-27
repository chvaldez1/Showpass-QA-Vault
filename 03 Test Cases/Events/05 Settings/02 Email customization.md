---
title: Event — Email customization
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Email customization

**Qase location:** [Events > Settings > Email customization](https://app.qase.io/project/SPT?suite=1051)

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Draft case for a saved email preview

### TC-1: Preview uses the saved Event subject until the Organizer saves a new one

**Title:** Dashboard - Email customization - Preview the saved purchase confirmation subject

**Description:** An edited subject in the form is still a draft until the Organizer saves it. The preview reaches the controlled inbox with the subject stored on the Event's saved purchase confirmation template.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Use an isolated single Event, an employee allowed to manage that Event's email customization, and a controlled mailbox. Confirm test email delivery works. Use an Event reserved for the change so a customer cannot receive the test subject.
* In **Build → Events → All events**, open the Event and choose **Settings → Email customization**. Under **Email type**, select **Purchase confirmation email**. Use an existing Event-specific template and record its original **Email subject line**. Save an **Email subject line** containing `QA saved preview A` followed by a unique suffix. Leave and reopen the same template to verify the subject.

**Tags:** dashboard, notifications, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Replace the visible **Email subject line** and leave the form unsaved. | `QA unsaved preview B` with the same suffix | The form shows the changed subject. |
| Choose **Send preview email**, enter the controlled **Email address**, and choose **Confirm**. | Controlled inbox address | **Preview email is being sent!** appears. |
| Open the newly received preview in the controlled mailbox. Check for up to five minutes. | Match the send time and unique suffix | Its subject contains `QA saved preview A`. The unsaved B marker is absent. If no matching preview arrives by the deadline, record delivery as inconclusive and continue with restoration. |
| Leave the editor without saving the changed subject and reopen the same email type. | Same Event | **Email subject line** still contains the saved A marker and suffix. |

**Postconditions:** Restore the recorded original subject in the existing template, select **Save**, and verify the restored subject after reopening. Record the test preview's safe subject and send time.

## Proof and sources

**Status:** Local Organizer Tester draft. **Not run.** SPT-4150 verifies a preview after the single Event customization is saved. This draft compares a saved Event subject with a conflicting unsaved edit. The actual delivered subject is the proof.

Backend `apps/emails/api/venue_based/viewsets/customization.py:50` queues the saved customization ID. `apps/emails/tasks/configuration.py:9` reloads it before sending. The frontend template form sends the recipient address against the saved customization in `EmailCustomizationForm.web.tsx:259`. The Next route `packages/next-app/pages/manage/events/[slug]/email-customization.tsx` exports the actual page.

## Shared suite reference

Event-specific cases below remain in Email Customization (1051). Refer to [shared Email Customization — suite 749](https://app.qase.io/project/SPT?suite=749) for venue-level choices, fallback, deletion and shared email variants (SPT-3617/3619–3621/3626/4087/4148/4836/4837).

**Route evidence:** The navigation metadata still lists a placeholder, while the Next route exports the actual Email customization page. Preserve event-versus-venue inheritance, single-versus-child preview, clear override and actual delivered-email proof as separate assertions. Customer email delivery follows its own case.

Source: [page registration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-3618: Web Dashboard - Email Customization - Configure and Verify Event Reminder Email

**Description:**

This test verifies that the 'Event Reminder Email' can be fully customized at the Event level and that the triggered email correctly reflects these customizations.

**Preconditions:**

The `enable_custom_email` switch is ENABLED.
An event exists with the Event Reminder email enabled and scheduled to be sent.
User has permissions to edit the event's email customizations.

**Postconditions:**

All custom fields (Subject, Reply-To, Banner, Message) for the Event Reminder email can be configured and saved at the event level.
The scheduled Event Reminder email that is sent to attendees uses the specific customizations applied, not the system defaults.

**Tags:** dashboard, admin-actions, events, email

**Parameters:**

CustomizationScope: Venue, SingleEvent, ParentEvent, ChildEvent, NoCustomization

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Navigate to the Email Customization UI for a specific event. |  | Email Customization UI is accessible. |
| Select the 'Event Reminder Email' type. |  | 'Event Reminder' customization form is displayed. |
| Configure a unique Subject, Reply-To address, Banner Image URL, and Custom Message. |  | All fields are configured and saved successfully. |
| Save the customizations. |  | Settings are confirmed saved. |
| Ensure the Event Reminder trigger conditions are met (e.g., by adjusting the event date or the reminder schedule for testing purposes). |  | Trigger conditions are met. |
| Once the reminder email is sent, receive and inspect it. |  | The received Event Reminder email contains the exact custom subject, reply-to address, banner, and message that were configured for it. |

### SPT-4150: Web Dashboard - Email Customization - Preview customized emails for a single event

**Description:**

Verifies that a saved single-event email customization can be previewed for event-supported email types.

**Preconditions:**

Organizer can manage the test event. A mailbox is available for preview email delivery.

**Postconditions:**

Remove event-level test customizations after execution.

**Tags:** dashboard, events, email

**Parameters:**

EmailType: PurchaseConfirmationEmail, EventReminderEmail, PostEventEmail, AbandonedCartEmail, WaitlistCancellationConfirmationEmail

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a single event email customization page. |  | The single event email customization page loads. |
| Select the EmailType parameter value. |  | Only event-supported email types are available. |
| Save a minimal event-level customization. |  | The customization saves for the single event. |
| Send a preview email to a valid recipient. |  | The preview request is accepted and sent. |
| Open the received preview email. |  | The preview email reflects the event-level customization instead of unrelated venue or membership-group content. |

### SPT-4151: Web Dashboard - Email Customization - Preview customized emails for recurring events

**Description:**

Verifies that parent and child recurring event email customizations can be previewed and follow recurring-event fallback rules.

**Preconditions:**

Organizer can manage a recurring event with parent and child event records. A mailbox is available for preview email delivery.

**Postconditions:**

Remove recurring event test customizations after execution.

**Tags:** dashboard, events, email

**Parameters:**

EmailType: PurchaseConfirmationEmail, EventReminderEmail, PostEventEmail, AbandonedCartEmail, WaitlistCancellationConfirmationEmail
EventLevel: Parent, Child

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the parent or child event email customization page according to the EventLevel parameter. |  | The recurring event email customization page loads for the selected level. |
| Select the EmailType parameter value. |  | Only event-supported email types are available. |
| Save a customization at the selected recurring event level. |  | The customization saves at the selected recurring event level. |
| Send a preview email to a valid recipient. |  | The preview request is accepted and sent. |
| Open the received preview email and compare it to the selected parent/child customization setup. |  | The preview reflects child override when configured, otherwise parent/venue fallback according to the selected setup. |

