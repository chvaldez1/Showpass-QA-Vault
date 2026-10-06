---
title: Event — Advanced options
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Advanced options

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Page coverage and source notes

Current page: event passwords; password-page message; exchange cutoff; transfer limit; Campaign Monitor lists; third-party redirect; report recipients; post-event email; thermal title/message; reminder; Hotel booking partner; Custom display fields; conditional Workday configuration. Recurring children can still have reminder/accommodation controls when those capabilities are enabled: do not blanket-hide the entire page.

SPT-5078 supplies the broad save/reopen baseline. SPT-5110 is an overlapping, weak live Qase case (incorrectly paired step results); improve SPT-5078 plus the focused cases here instead of creating a second broad settings case. Workday remains presence-only in this migration pass. Password schedule boundaries and pattern matching need their own automation matrix.

Sources: [event serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [transfer-limit API regressions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/api/venue/events/test_api_venue_based_events.py>), [field definitions](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/advanced/hooks/useEventAdvancedFormFields.ts>), [availability and payload rules](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/advanced/utils/event-advanced-form.ts>), [custom field editor](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/advanced/ui/components/EventCustomDisplayFields/EventCustomDisplayFields.web.tsx>).

### TC-11: Dashboard - Advanced Options - Add edit and remove custom display fields

**Description:** An employee saves extra event information for an integrated website, edits it, and removes it without changing another custom field. These fields do not appear on the standard Showpass event page.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event created for testing.
* The organization has allow_related_events enabled, which exposes Custom display fields.
* The event is published for controlled testing, with no real customers. An integrated test website reads and displays its custom fields. Record its URL and the existing field values.
* No field named Performance language or Arrival instructions exists on the event.

**Postconditions:** Remove only the two fields added by this case, save and reopen; existing custom fields remain unchanged.

**Tags:** dashboard, edit-event, appearance

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Advanced options → Custom display fields. | | Existing fields and the warning about the standard Showpass page are visible. |
| Select Add custom display field. | **Field title:** Performance language; **Display value:** French with English subtitles; **Formatted text:** off | One new plain-text field appears. |
| Add another custom display field. | **Field title:** Arrival instructions; **Formatted text:** on; **Display value:** Enter through the east door, with east door bold | The second field shows formatted text. |
| Save the page. | | Saving succeeds. |
| Leave and reopen Advanced options. | | Both fields retain their titles, values and formatting choices. |
| Open the integrated test website for the event. | **URL:** the recorded integration URL | Both custom fields appear with the saved values. |
| Open View Event on the standard Showpass website. | | The two custom fields are not displayed there. |
| Return to Advanced options and change only Performance language. | **Value:** English | The selected field changes without altering Arrival instructions. |
| Save and reopen Advanced options. | | English is saved and Arrival instructions remains unchanged. |
| Remove Performance language, then save and reopen. | | Only that field is removed; Arrival instructions and pre-existing fields remain. |

### TC-12: Dashboard - Advanced Options - Override and restore the event transfer limit

**Description:** An employee overrides the organization's ticket-transfer limit for one event, rejects invalid limits, and returns to the organization setting.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event created for testing.
* The organization event transfer limit is 3. The event initially uses the organization setting; record that starting state.

**Postconditions:** Leave the event using the organization setting and verify it after reopening; the organization limit remains 3.

**Tags:** dashboard, transfers, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Advanced options → Transfer limit setting. | | Use organization setting is selected. |
| Select Set event limit and enter a limit. | **Event transfer limit:** 1 | The event override is shown as 1. |
| Save and reopen Advanced options. | | Set event limit and 1 remain selected. |
| Attempt each invalid value separately. | **Values:** empty, 0, -1, 1.5 | Each value is prevented or clearly rejected; no invalid limit can be saved. |
| Reload Advanced options without saving another value. | | The saved event limit remains 1. |
| Select Use organization setting and save. | | The event-specific override is cleared successfully. |
| Leave and reopen Advanced options. | | Use organization setting remains selected, using the organization's limit of 3. |

This is the transfer-settings portion split from SPT-5111, not a new claim that the public transfer lifecycle was executed. Existing transfer suites own completed transfers and recipient admission.

### TC-13: Dashboard - Advanced Options - Reject invalid settings without losing saved values

**Description:** Invalid advanced-setting input cannot replace a previously saved value, and correcting the input allows saving.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event with no sales.
* Record the original selected setting. Use an inbox under your control for report recipients.
* The event is not a template when testing EventReportRecipient.

**Postconditions:** Restore the original value and remove only the report recipient added by the case; save and reopen.

**Tags:** dashboard, edit-event, edge-case

**Parameters:**

Setting: ThirdPartyUrl, EventReportRecipient, ThermalTitle, ThermalMessage

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Advanced options and locate the selected Setting. | | The selected control and saved value are visible. |
| Enter the accepted value. | **ThirdPartyUrl:** https://example.com and When Buy Now is selected; **EventReportRecipient:** controlled inbox address; **ThermalTitle:** exactly 40 characters; **ThermalMessage:** exactly 20 characters | The accepted value is shown without an error. |
| Save and reopen Advanced options. | | The accepted value remains saved. |
| Try the invalid value for the same field. | **ThirdPartyUrl:** not-a-url; **EventReportRecipient:** invalid-address; **ThermalTitle:** 41 characters; **ThermalMessage:** 21 characters | The invalid value is prevented or clearly identified. |
| Try saving if Save is enabled. | | The invalid value cannot replace the accepted value. |
| Reload Advanced options. | | The last accepted saved value remains. |
| Correct the field and save again. | **Value:** the previously accepted value | Saving can complete after correction. |

### TC-14: Dashboard - Advanced Options - Add cancel and delete an event password

**Description:** An employee adds an exact-match event password, cancels a second password, and deletes the first through its own confirmation without changing other settings.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned future single event created for testing with no sales.
* Record existing passwords and the password-page message. No password named EntryCheck followed by the run date exists.

**Postconditions:** Remove only passwords created by this case; the original password list and message are unchanged.

**Tags:** dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Advanced options → Event access passwords → Add password. | | The password dialog opens. |
| Complete an exact-match password. | **Password type:** Exact match; **Password:** EntryCheck followed by the run date; **Active:** on; **Start:** yesterday; **No end time:** on; **Ticket types:** leave empty | The dialog shows the chosen password, active status and unrestricted ticket-type selection. |
| Select Add password once. | | One password is saved and appears in the list. |
| Reload Advanced options. | | The password remains present once with its saved active status and schedule. |
| Open Add password and enter a different password, then cancel the dialog. | **Password:** CancelledEntry followed by the run date | The second password is not added. |
| Reload Advanced options. | | Only the saved password exists; the cancelled entry is absent. |
| Select Delete for the password created by this case, then Cancel in the confirmation. | | The password remains listed. |
| Select Delete for that same password and confirm Delete. | | The selected password is removed. |
| Reload Advanced options. | | The removed password stays absent and all original passwords and the password-page message are unchanged. |

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-1784: Dashboard - Advanced Options - Show and hide the accommodation link

**Description:** An employee chooses a hotel booking partner for an event and then disables it, checking both the saved setting and the public accommodation section.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned future single event with a saved physical location.
* The organization's enable_accommodations setting is enabled.
* Record the event's original Hotel booking partner value.

**Postconditions:** Restore the original partner, save and reopen Advanced options.

**Tags:** dashboard, events, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Advanced options → Hotel booking partner. | | The partner selector is available. |
| Select HotelPlanner. | **Partner:** HotelPlanner | HotelPlanner is selected. |
| Save and reopen Advanced options. | | HotelPlanner remains selected. |
| Open View Event. | | The Accommodations section provides the event's hotel booking link. |
| Return to Advanced options and select No Partner. | **Partner:** No Partner | The selector shows No Partner. |
| Save and reopen Advanced options. | | No Partner remains selected. |
| Reopen View Event. | | The Accommodations section is no longer displayed. |

### SPT-777: Web Dashboard - Events - Configure Event for NFC Only Redemption

**Description:**

Verifies that an event organizer can configure an existing event to be 'NFC Only' for redemption, meaning standard barcodes/QR codes might be deprioritized or disabled for check-in in favor of NFC credentials (e.g., wristbands).

**Preconditions:**

An event has already been created in the Web Dashboard.
User is logged in with permissions to edit event settings, potentially requiring admin-level access for NFC-specific flags.
The system supports NFC-only redemption settings for events.

**Postconditions:**

The 'NFC Only' setting can be successfully applied to the event.
The event's configuration reflects that it is NFC Only.
(Downstream verification, if possible within this test's scope): Check-in applications or processes for this event prioritize or exclusively accept NFC for entry. Standard QR/barcode scanning might be disabled or show a warning for this event.

**Tags:** nfc, dashboard, events, check-in, organizer, event-settings

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Navigate to the Web Dashboard and find the existing event to be modified. Go to its edit/management page. |  | Event management page loads. |
| Locate the setting to designate the event as 'NFC Only'. This might be under advanced ticket settings, event settings, or an admin-level configuration page for the event (e.g., `admin/tickets/event/<event_id>/change`). |  | 'NFC Only' setting is found. |
| Enable the 'NFC Only' setting for the event. |  | Setting is enabled. |
| Save the event settings. |  | Changes are saved successfully. |
| Verify the setting has been saved (e.g., by re-opening event settings or checking an event properties display). |  | The event is confirmed to be configured as 'NFC Only'. |
| (Optional, if check-in app is testable) Attempt to scan a standard QR code ticket for this event in a check-in app; observe behavior. Attempt NFC check-in. |  | Standard QR scan might fail, be warned, or redirect to NFC instructions. NFC check-in should work as primary method. |


## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-5078](https://app.qase.io/case/SPT-5078) | Advanced Options (1049) | Existing case preserved; migration notes below apply |

### SPT-5078: Dashboard - Edit Event - Save Advanced Options

**Description:**

Checks that each available Advanced Options setting remains saved for the selected event. Run only the option enabled for the test venue.

| AdvancedOption | Required Setup | Test Value | What Should Remain Saved |
| --- | --- | --- | --- |
| EventPassword | Saved event that is not a recurring child | Unique password and QA access {unique-suffix} message | Password and message |
| ExchangeCutoff | Venue has Exchanges | 12 hours | Event cutoff and the organizer-override notice |
| CustomerList | Venue has a customer list | Named test list | Selected list |
| ThirdPartyRedirect | Standard published event | https://example.com/{unique-suffix} and one redirect choice | URL and redirect choice |
| EventReportRecipient | Published event that is not a template | Controlled QA mailbox | Added email address |
| PostEventEmailStatus | Post-event email setting is available | Do Not Send Post-Event Email | Selected option |
| ThermalTicketText | Standard published event | Unique title and message within the shown limits | Both text values |
| WorkdayIntegration | Venue has Workday enabled | Reversible test setup | Saved Workday setup |
| EventReminder | Venue can send event reminders | Turn reminder on | Reminder remains on |

Current Angular reference: /dashboard/events/{slug}/manage/#/edit. This is reference information only and is not required in the steps.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* An organizer can manage the event used for AdvancedOption.
* The required setup shown in the Description is available.
* The original setting is recorded before the test.

**Postconditions:**

* Restore the original setting.
* Reopen Advanced Options and confirm that the original setting is restored.

**Tags:** dashboard, events, edit-event

**Parameters:**

AdvancedOption: EventPassword, ExchangeCutoff, CustomerList, ThirdPartyRedirect, EventReportRecipient, PostEventEmailStatus, ThermalTicketText, WorkdayIntegration, EventReminder

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Manage Events, select Edit for the test event and open Advanced Options. | Event for AdvancedOption | The selected option is available. |
| Record the option's current value. | Selected option | The original value is available for cleanup. |
| Enter or select the test value shown in the Description. | Selected AdvancedOption | The value is accepted. |
| Save the setting using the button shown on the page. | Selected option | A success message appears. |
| Leave Edit, reopen it, and return to Advanced Options. | Same event | The selected value is still shown. |
| Restore the original value and reopen Advanced Options. | Original value | The original value is shown and the temporary value is gone. |
