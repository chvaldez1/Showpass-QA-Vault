---
title: Event — Basic info
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Basic info

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Page coverage and source notes

The migrated page groups **Event details**, **Event Date & Time**, and **Discovery**. Some optional fields are inside each section's **Advanced** drawer. Purchase button text is now here, not under Order form. Accommodations and Custom display fields are under Advanced options.

Existing SPT-764 covers creation; SPT-775 covers public-link validation; SPT-745/SPT-749 cover category-specific artists, comedians, shows and teams; SPT-4877 covers online/streamed events. SPT-5077 is locally split into a Basic info case plus page-specific coverage. Its former scenarios are mapped in the Events index; no Qase case has been changed. New cases below isolate previously shallow checks.

Sources: [event model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py>), [event serializer](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [Basic info fields](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/basic-info/hooks/useEventBasicInfoFormFields.tsx>), [images and location](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/basic-info/hooks/event-basic-info-media-location-field-config.tsx>).

## New local cases

### TC-19: Dashboard - Basic Info - Save discovery choices independently

**Description:** Changing event visibility or calendar display preserves the other discovery settings and remains saved after reopening.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event created for testing with no real customers.
* Record its visibility, calendar-display choice, categories and tags.
* For GoogleThingsToDo, the organization has google_things_to_do_is_enabled enabled; record the current Google categories and Guided Tour choice.

**Postconditions:** Restore the recorded discovery values, save and reopen the event.

**Tags:** dashboard, edit-event, discovery

**Parameters:**

DiscoverySetting: Visibility, CalendarDisplay, GoogleThingsToDo

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Basic info → Discovery, including its Advanced drawer. | | The controls permitted by the event type and organization are available. |
| Change only the selected DiscoverySetting. | **Visibility:** select a listed non-archived visibility different from the recorded one and record its label; **CalendarDisplay:** reverse Display on calendar widget; **GoogleThingsToDo:** select one listed category, record its label, and reverse Guided Tour | The selected setting changes; existing event categories and tags are retained. |
| Select Save changes. | | Saving succeeds. |
| Leave and reopen Discovery. | | The selected visibility, calendar choice, or Google category and tour choice remain saved. |
| Inspect the other recorded discovery values. | | All discovery values not changed by the case remain unchanged. |

Calendar appearance remains linked to existing calendar coverage SPT-2428/2429/2687; saving a toggle alone does not prove widget or Kiosk filtering. Google feed eligibility remains in SPT-4900/4901.

### TC-16: Dashboard - Basic Info - Save date display choices without losing the schedule

**Description:** Date-display choices affect customer presentation without removing the event's real saved start and end times.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned, published future single event created for testing with no payment-plan ticket types.
* The event has an on-sale free public electronic ticket with available inventory and a customer inbox under your control.
* Record the event's timezone, start, end, doors-open and date-display settings.

**Postconditions:** Restore the date-display settings and verify the original schedule. Retain any free order created for the PDF check, identified for review.

**Tags:** dashboard, edit-event, tickets

**Parameters:**

DisplayChoice: DateToBeDetermined, HideTicketEndTime

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Basic info → Event Date & Time → Advanced. | | The applicable date-display choices are available. |
| Turn on the selected display choice without editing dates. | **DateToBeDetermined:** Display date and time as To Be Determined; **HideTicketEndTime:** Hide event end time on downloaded tickets | The selected choice is enabled. |
| Select Save changes. | | Saving succeeds. |
| Leave and reopen Basic info. | | The choice remains enabled and the original timezone, start, end and doors-open values remain saved. |
| Check the selected customer output. | **DateToBeDetermined:** open View Event; **HideTicketEndTime:** obtain one free electronic ticket and download its PDF from order confirmation | The event page says To Be Determined, or the PDF omits the end time, according to the selected choice. |
| Turn off the selected choice and save. | | Saving succeeds. |
| Reopen Basic info. | | The display choice remains off and the real schedule is unchanged. |

### TC-1: Dashboard - Basic Info - Replace an image and reject unsupported uploads

**Description:** An employee replaces an event image, checks its saved crop, and confirms rejected files do not replace the saved image.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for the event's owning organization.
* Use an event created for testing with no sales and an existing image in the selected field; record that image.
* Prepare JPG/PNG files at 1200 × 600 and 1080 × 1080 under 3 MB, a 99 × 99 PNG, a 2001 × 2001 PNG, a PNG over 3 MB, and a text file.

**Postconditions:** Restore the original image, save, and reopen to confirm restoration.

**Tags:** dashboard, edit-event, appearance

**Parameters:**

ImageField: BannerImage, SquareImage

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → the event → Basic info. | **Image field:** selected ImageField | The saved image is displayed. |
| Select a replacement for the selected image field. | **Banner:** 1200 × 600 JPG/PNG; **Square:** 1080 × 1080 JPG/PNG | The image opens for cropping with the matching banner or square shape. |
| Adjust and accept the crop. | **Crop:** keep an easily recognized part of the image visible | The preview shows the accepted crop. |
| Select Save changes. | | Saving completes successfully. |
| Leave and reopen Basic info. | | The replacement and its crop remain visible. |
| Try each unsupported file separately in the same field. | **Files:** 99 × 99 PNG; 2001 × 2001 PNG; PNG over 3 MB; text file | Each file is rejected with an explanation and does not replace the accepted image. |
| Reload Basic info. | | The last successfully saved image remains intact. |

### TC-2: Dashboard - Basic Info - Keep text within the supported field limits

**Description:** Text at the supported limit saves without losing characters; an extra character cannot be silently saved as different content.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event with no sales.
* Record the original name and subtitle.

**Postconditions:** Restore the original name and subtitle, save, and reopen them.

**Tags:** dashboard, edit-event, edge-case

**Parameters:**

TextField: EventName, Subtitle

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event's Basic info; open Event details → Advanced for Subtitle. | **Field:** Event Name or Subtitle | The selected field is editable. |
| Enter text exactly at the field limit. | **Event Name:** 84 characters; **Subtitle:** 255 characters; prepare and count the text before pasting | The complete value is accepted. |
| Select Save changes. | | Saving succeeds. |
| Leave and reopen the field. | | The exact saved text is shown without missing characters. |
| Try appending one more character. | **Extra character:** X | The field prevents the extra character or shows a length error; it does not silently save an over-limit value. |
| Return the field to its accepted value and save. | **Value:** the previously accepted text | The field can be saved after the correction. |

### TC-3: Dashboard - Basic Info - Change location without changing another event

**Description:** Selecting a different saved location and timezone changes only the chosen event and retains the intended local event times.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for two owned, published future single events with no sales or payment-plan tickets. They are used only for testing and not shared with real customers.
* Two saved physical locations are available. Record both names, their timezones, and both events' original location, timezone, start, end and doors-open values.

**Postconditions:** Restore the changed event's location, timezone and times; leave the comparison event unchanged.

**Tags:** dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Basic info for the first event. | **Event:** the event selected for changes | Its saved physical location and timezone are displayed. |
| Search for and select the other saved physical location. | **Search:** the second recorded location name | The selected location's details are displayed, not another search result. |
| Set the event timezone to the second location's timezone. | **Timezone:** the recorded timezone for that location | The selected timezone is shown. |
| Set the event times in that timezone. | **Date:** seven days ahead; **Doors:** 18:00; **Start:** 19:00; **End:** 21:00 | The form shows the intended local date and times. |
| Select Save changes. | | Saving succeeds. |
| Reopen Basic info from Events. | | The location, timezone, and all three times match the submitted values. |
| Open View Event. | | The public page identifies the selected location and the intended event date and time. |
| Open Basic info for the comparison event. | **Event:** the second recorded event | Its location, timezone and times are unchanged. |

### TC-4: Dashboard - Basic Info - Validate and clear the doors-open time

**Description:** A single event accepts an earlier doors-open time, rejects a doors-open time after the start, and allows the optional time to be cleared.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for a future single event with no sales or payment plans.
* The event starts at 19:00 and ends at 21:00 on the same day. Record its original doors-open time.

**Postconditions:** Restore the original doors-open time, save and reopen the event.

**Tags:** dashboard, edit-event, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Basic info → Event Date & Time, including Advanced if the doors field is collapsed. | | The event start, end and optional doors-open control are available. |
| Set Event Doors Open to an earlier time. | **Doors:** 18:30 on the event date | The selected time is displayed. |
| Select Save changes. | | Saving succeeds. |
| Reopen Basic info. | | Doors Open remains 18:30. |
| Change Doors Open to after the start. | **Doors:** 19:01 on the same day | The attempted time is rejected or identified as invalid. |
| Try Save changes if it is enabled. | | The invalid time is not saved and an explanation identifies the time conflict. |
| Reload Basic info. | | The saved doors-open time is still 18:30. |
| Clear Event Doors Open. | **Value:** empty | The optional doors-open time is removed from the form. |
| Save and reopen Basic info. | | Doors Open remains empty while start and end are unchanged. |

Source boundary: the backend rejects doors **after** start, not equality. Equality is not a known rejection requirement; do not report it as a defect solely because the old error text says “before.”

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-5152: Events - Keep date/time picker values correct for selected date and DST policy

**Description:**

Regression for SPW-20212: the picker shows time options for the selected event date and preserves policy-controlled DST times after save/reload.

**Parameters:**
```json
{
  "date": "pre-dst,dst,post-dst"
}
```

**Preconditions:**

Event editable in DST-observing timezone; dates around a DST transition; organizer access.

**Postconditions:**

Restore event date/time settings.

**Tags:** dashboard, events, timezones, date-picker

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open relevant event date/time setting |  | Frontend time options correspond to selected date rather than browser current date |
| Select dates before, during, and after DST change |  | Policy-controlled DST value persists after reload |
| Choose supported times and save |  | Invalid/nonexistent times are handled safely. |
| Reload |  |  |


## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-775](https://app.qase.io/case/SPT-775) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-5077](https://app.qase.io/case/SPT-5077) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-4877](https://app.qase.io/case/SPT-4877) | Create / Edit Events (84) | Existing case preserved; migration notes below apply |
| [SPT-745](https://app.qase.io/case/SPT-745) | Google Events - Event Categories (81) | Existing case preserved; migration notes below apply |
| [SPT-749](https://app.qase.io/case/SPT-749) | Google Events - Event Categories (81) | Existing case preserved; migration notes below apply |
| [SPT-3248](https://app.qase.io/case/SPT-3248) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |

### SPT-775: Dashboard - Events - Generate and validate an event's public link

**Description:**

Validates automatic and custom public-link generation for draft and published events. Each run uses one `PublicLinkScenario` from the table so the tester knows the exact event name, save action, and expected result. Current Angular link handling is referenced in `EventCreate.js`; visible Dashboard controls, not the legacy route shape, are the test contract.

| PublicLinkScenario | Event Name / Public Link Name | Save Action | Expected Result |
| --- | --- | --- | --- |
| AlphanumericNameDraft | `QA Summer Market <unique suffix>` / leave blank | Save Draft | A non-empty normalized link is generated and persists on reopen. |
| AlphanumericNamePublished | `QA Winter Concert <unique suffix>` / leave blank | Publish | A non-empty normalized link is generated and opens the published event. |
| NumericNamePublished | `<unique digits>` / leave blank | Publish | A unique usable link is generated; a collision suffix may be added. |
| SpecialCharactersPublished | `QA !@# <unique digits>` / leave blank | Publish | Unsupported characters are removed and the generated link remains non-empty and usable. |
| NormalizeCustomLink | Valid event name / `QA Custom Link <unique suffix>` | Publish | The saved link is lowercase and hyphenated. |
| RejectDuplicateCustomLink | Valid event name / link already used by another event | Publish | Save is blocked and the existing event keeps its link. |
| RejectReservedCustomLink | Valid event name / `site` | Publish | Save is blocked because the link name is reserved. |
| EditCustomLink | Existing published event / new unique custom link | Save | The new link persists and the Dashboard warns that the old link will break. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The organizer is signed in and can create and edit events.
* The venue has a saved location and does not require event approval.
* A reusable valid event setup and unique suffix are available.
* For `RejectDuplicateCustomLink`, a test event already owns the test link.
* For `EditCustomLink`, a test published event exists without sales.

**Postconditions:**

* Delete successful test events only after confirming that they have no sales.
* Leave the pre-existing duplicate-link test setup unchanged.

**Tags:** dashboard, events, create-event

**Parameters:**

PublicLinkScenario: AlphanumericNameDraft, AlphanumericNamePublished, NumericNamePublished, SpecialCharactersPublished, NormalizeCustomLink, RejectDuplicateCustomLink, RejectReservedCustomLink, EditCustomLink

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Use the row for the selected `PublicLinkScenario` to identify the required test setup, event name, public link name, and save action. | Selected scenario row | The required unique data or existing test event is available. |
| For `EditCustomLink`, open **Edit** for the existing event. For every other scenario, select **Create Event**. | Selected scenario | The correct event form opens. |
| Complete all required event fields and select **Free Event - Tickets Not Required**. | Saved location; one category; future start and end | The form has no unrelated blocking validation. |
| Enter the event name and public link name specified by the scenario. | Selected scenario row | The form displays the entered values or an automatically generated link preview. |
| Select the scenario's save action once. | Save Draft, Publish, or Save | Successful scenarios save once. Duplicate and reserved custom links show actionable validation and do not redirect as if saved. |
| For a rejected scenario, return to **Manage Events** and search for the attempted event name. | Rejected event name | No new event was published, and the pre-existing link owner remains unchanged. |
| For a successful scenario, return to **Manage Events**, find the event, and reopen **Edit**. | Saved event name | The event appears once and the saved public link value survives a fresh read. |
| For a published successful scenario, open **View Event**. | Saved event | The public page opens using the saved normalized link and shows the correct event. |
| For `EditCustomLink`, compare the new and previous links after saving. | Previous link; new unique link | The new link opens the event, and the previous link no longer resolves to that event. |

### SPT-5077: Dashboard - Basic Info - Save an existing event's details

**Description:** An employee updates an existing single-day event's name, description, images, categories and tags, then checks the saved details on the event page.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for the event's owning organization.
* Use a published single-day event created for testing with no orders or sales.
* Record its name, subtitle, description, images, categories, tags and visibility.
* Have a 1200 × 600 banner and a 1080 × 1080 square JPG/PNG, both under 3 MB.

**Postconditions:**

* Restore the recorded values, save and reopen Basic info.
* Remove only the tags added by this case from the event.

**Tags:** dashboard, events, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Events → the event → Basic info. | **Event:** the selected single-day event | Its existing details are shown. |
| Change Event Name. | **Name:** append Edited to the recorded name, keeping the total at 84 characters or fewer | The changed name is shown. |
| Open Event details → Advanced and change Subtitle. | **Subtitle:** Updated event information | The changed subtitle is shown in the form. |
| Replace Banner Image and Square Image. | **Banner:** prepared 1200 × 600 file; **Square:** prepared 1080 × 1080 file | Both accepted image previews are visible. |
| Edit Description using a heading, bold text, a list and a link. | **Text:** Doors open at 18:30; **link:** https://example.com | The editor displays the entered text and supported formatting. |
| In Discovery, select categories and add a tag. | **Categories:** select up to three listed categories and record their names; **Tag:** event-edit followed by the run date | The selected categories and tag are visible. |
| Select Save changes. | | Saving completes without changing the event's published status. |
| Return to Events and reopen Basic info for the same event. | | The edited name, subtitle, images, description, categories and tag are still shown. |
| Open View Event. | | The same event displays the saved name, images and formatted description, with no raw markup. |

### SPT-4877: Dashboard - Events - Configure one online event scenario

**Description:**

Validates one online-event behavior per run. Public and Private online events require a Session room; Livestream requires a Live Stream room; an active room's maximum participants cannot be edited.

| VirtualEventScenario | Setup / Attempt | Expected Result |
| --- | --- | --- |
| PrivateSession | Private online event; Session room; max attendees `10` | Saves as an online private session. |
| PublicSession | Public online event; Session room; max attendees `10` | Saves as an online public session. |
| Livestream | Livestream; Live Stream room; supported provider | Saves and displays as Online. |
| MissingRoomConfiguration | Select Public Session but omit room data | Save is blocked and requests virtual room fields. |
| ActiveRoomCapacityEdit | Existing in-progress room; change max attendees | Save is blocked because maximum participants cannot change while active. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue is enabled for virtual experiences; the organizer can edit events; the selected scenario's provider/active-room test setup is available.

**Postconditions:** Restore or remove no-sales virtual test setups; do not disrupt the in-progress room.

**Tags:** dashboard, events, edge-case

**Parameters:**

VirtualEventScenario: PrivateSession, PublicSession, Livestream, MissingRoomConfiguration, ActiveRoomCapacityEdit

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the virtual-event test setup or create a test event for `VirtualEventScenario`. | Selected table row | The intended event form and online controls are available. |
| Apply only the setup or edit shown for the scenario. | Scenario data | The form shows the intended virtual type and room state. |
| Save once. | None | Valid scenarios save; invalid or active-room scenarios show the exact actionable restriction and do not claim success. |
| Leave and reopen the event. | Same event | Valid virtual type/room values persist; rejected scenarios retain their original saved state. |
| For a valid scenario, open the public event page. | Same event | The event is identified as Online and exposes the correct session/livestream customer experience without a physical-location contradiction. |

### SPT-745: Dashboard - Events - Save category-specific Google metadata

**Description:**

Validates that one supported category exposes and saves only its matching metadata.

| GoogleEventCategory | Metadata |
| --- | --- |
| Music | Headliner and supporting artist |
| Sports | Home team and away team |
| Comedy | Headlining comedian and supporting comedian |
| ArtsAndTheatre | One event entity/show |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** The applicable tagging switch is enabled; the organizer can edit a test event; saved metadata entities exist.

**Postconditions:** Restore the event category and metadata.

**Tags:** dashboard, events, google

**Parameters:**

GoogleEventCategory: Music, Sports, Comedy, ArtsAndTheatre

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Basic Info** and select `GoogleEventCategory`. | Selected category | Only the matching metadata controls from the table appear. |
| Select distinct saved entities for each displayed role. | Named test artist/team/comedian/entity | The form accepts each entity once in its intended role. |
| Save once and reopen **Basic Info** through **Manage Events**. | Same event | Category and exact role assignments persist. |
| Change to a different general category and review the prior metadata controls. | Nonmatching category | Inapplicable category metadata is removed or no longer submitted as valid metadata. |

### SPT-749: Dashboard - Events - Create and select a category helper entity

**Description:** Validates creating a missing helper entity without losing the in-progress event form.

| CategoryHelperEntity | Required Category | New Entity |
| --- | --- | --- |
| SportsTeam | Sports | `QA Team <unique suffix>` |
| Comedian | Comedy | `QA Comedian <unique suffix>` |
| Show | ArtsAndTheatre | `QA Show <unique suffix>` |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:** The applicable tagging switch is enabled; the organizer can create/edit events and helper entities.

**Postconditions:** Remove the test event; retain or remove the helper according to shared-test-data policy.

**Tags:** dashboard, events, google

**Parameters:**

CategoryHelperEntity: SportsTeam, Comedian, Show

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Basic Info**, select the category mapped to `CategoryHelperEntity`. | Selected table row | The matching helper search and Add control appear. |
| Enter another unsaved event value before opening Add. | Subtitle `State retained <suffix>` | The unsaved value remains in the form. |
| Open Add, complete the new helper's required details, and save it. | Unique entity name | The helper is created once and the event form stays open with its prior state. |
| Search for and select the new helper in its intended role. | New helper name | It is immediately selectable without reloading the event form. |
| Save and reopen the event. | Same event | The helper assignment and previously entered subtitle persist. |

### SPT-3248: Dashboard - Order Form - Change Ticket Button Verbiage

**Description:** Validates one supported public purchase-button label per run.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future public event has a purchasable ticket and editable Order Form.

**Postconditions:** Restore **Buy Tickets**.

**Tags:** dashboard, events, public

**Parameters:**

ButtonLabel: Register, RSVP, GetTickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Order Form** and choose `ButtonLabel` under **Ticket Button Verbiage**. | Register, RSVP, or Get Tickets | The selected supported label is shown. |
| Save once and reopen **Order Form**. | Same event | The label persists after a fresh read. |
| Open the public event page. | Same event | The main purchase action uses the selected human-readable label. |
| Select the action. | None | Ticket selection opens for the same event. |
