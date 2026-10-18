---
title: Event — Tickets
date: 2026-10-17
tags:
  - qa/test-cases
  - events
status: Ticket-modal cases published and verified 2026-10-17; manual definitions not executed
---

# Tickets

**Qase location:** [Events > Manage > Tickets](https://app.qase.io/project/SPT?suite=83)

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

> [!note] Generated attachments removed
> Generated snapshots, JSON exports and frozen publication copies were deleted on 2026-10-17 at the user’s request. Published case IDs, recorded results and test definitions remain in this note. Read Qase again before preparing future changes.

## Ticket modal parity review — 2026-10-17

**Result:** published **SPT-5729–5752** (24 ticket-modal cases) in Tickets83 and enhanced **SPT-5722/5723** in their existing Custom fees1135 suite on October 17, 2026. Their FeeScope parameter now covers Event and Ticket without duplicate cases. Existing pricing, inventory, availability, PWYC, delivery, refunds and admission tests remain linked. The review accounted for 13 legacy tabs, 12 new sections and 53 legacy type bindings; it does not establish full migration parity or an executed pass.

**Parity target:** the same employee can reach, change and reopen each supported ticket setting; moved fields are acceptable and unrelated settings, prices, orders, inventory and access remain intact. Layout matching is not required. **Five legacy functions have no established replacement:** Payment Plans, ticket integrations/Workday, Resale configuration, Show Ticket Prices, and ticket-level seller commissions. These are source-backed access risks, not reproduced defects. Cases cannot establish full parity until those owners are resolved.

**Publication proof:** dry-ran all26 definitions, then verified every written field, parameter, tag and suite placement after applying. Tickets83 now has **39 direct cases**. The project contains **2,216 cases /317 suites**, with **2,190 unrelated cases unchanged**. Suite83 received a description-only index linking shared tests. No suite was created, no case moved/copied/deleted and no product test was executed. See ID map, case receipt, suite receipt and verification.

### SPT-5729: Dashboard - Tickets - Open the ticket sections allowed for the employee

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Open the ticket sections allowed for the employee

**Description:** Use Build → Events → edit the event → Tickets → edit the ticket. Save changes saves the ticket modal; close and reopen it after a successful save.

Select Profile before opening the new ticket editor. Basic info, Appearance, Notifications, Tiered discounts, Passwords, Pay what you can, Auto-release, Waitlist and Delivery & transfers are available in this prepared configuration. Finance and Custom fees require Manage Transactions; Internal fees requires an internal administrator.

| Profile | Employee setup | Additional sections |
| --- | --- | --- |
| EventEditor | Manage Events; no Manage Transactions; not an internal administrator | No Finance, Custom fees or Internal fees |
| FinanceEditor | Manage Events and Manage Transactions; not an internal administrator | Finance and Custom fees; no Internal fees |
| InternalAdmin | Authorized internal administrator with Manage Events and Manage Transactions | Finance, Custom fees and Internal fees |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The organization uses configured fees; allow_shipping and allow_tiered_discounts are on. Organization flag enable_waitlist_configuration_ui is on. The event has two saved ordinary ticket types. A setup owner supplies the selected Profile account.

**Postconditions:**

* No ticket, organization, fee, rule or employee setting is changed.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

Profile: EventEditor, FinanceEditor, InternalAdmin

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared event and edit the recorded ticket type. |  | The correct event and ticket name are shown. |
| Inspect the section menu for Profile. |  | The expected shared and additional sections are offered; restricted financial sections are absent. |
| Open each offered section without changing a field, then close the modal. |  | Each section shows its actual controls for this ticket, and the event list remains unchanged. |

### SPT-5730: Dashboard - Tickets - Save one ticket detail without changing another ticket

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save one ticket detail without changing another ticket

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Legacy uses General; the new editor uses Basic info.

| Detail | Change |
| --- | --- |
| Name | Append Review to the recorded name |
| Description | Enter Admission details and make Admission bold |
| Icon | Choose Star; start with no icon |
| TicketColor | Enter #336699 in Ticket color; new editor only |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* For Icon, start with no icon. For TicketColor, run only in the new editor because no equivalent legacy color control was found in this modal.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

Detail: Name, Description, Icon, TicketColor

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket’s detail fields and make only the selected Detail change. |  | The edited value is shown for this ticket. |
| Save using the selected editor’s save controls, then reopen the ticket. |  | The exact text, formatting, icon or color is retained. |
| Compare the other recorded ticket and the edited ticket’s price and inventory. |  | Only the intended detail changed; the other ticket, price and inventory are unchanged. |

### SPT-5731: Dashboard - Tickets - Save a ticket purchase limit

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save a ticket purchase limit

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Legacy uses General; the new editor uses Basic info → Purchase limits.

| Limit | Saved setup and change |
| --- | --- |
| Minimum | Start maximum 8; set minimum 2 |
| Maximum | Start minimum blank and per-user limit blank; set maximum 4 |
| PerUser | Start maximum 4; set per-user limit 6 |
| BoxOffice | Set Box Office purchase limit 5 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

Limit: Minimum, Maximum, PerUser, BoxOffice

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket’s purchase limits and apply the selected Limit. |  | The intended limit is displayed. |
| Save and reopen the ticket. |  | The selected limit retains its exact value. |
| Inspect the other limits, ticket price, inventory and comparison ticket. |  | Unedited values are unchanged. |

### SPT-5732: Dashboard - Tickets - Reject an invalid ticket setting

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Reject an invalid ticket setting

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Make only one invalid change per run. Do not change a second field to make the first value valid.

| InvalidInput | Setup and invalid change |
| --- | --- |
| MissingName | Clear the existing Name |
| MinimumOne | Set Minimum purchase limit to 1; leave maximum 8 |
| MinimumAboveMaximum | Set minimum 5 while maximum is 4 |
| MaximumTooHigh | Set maximum 301; minimum and per-user limit blank |
| PerUserBelowMaximum | Set per-user limit 3 while maximum is 4 |
| BoxOfficeTooHigh | Set Box Office purchase limit 501 |
| InvalidScanWindow | Set Custom scan start at event start and Custom scan end one hour before it |
| ScanLimitOne | Turn unlimited scanning off and enter custom Scan limit 1 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.

**Postconditions:**

* Discard all rejected edits; no saved setting is changed.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

InvalidInput: MissingName, MinimumOne, MinimumAboveMaximum, MaximumTooHigh, PerUserBelowMaximum, ScanLimitOne, BoxOfficeTooHigh, InvalidScanWindow

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket and apply InvalidInput. |  | Only the selected field or relationship is invalid. |
| Attempt to save the ticket. |  | The affected field shows its required or limit error and no successful save is reported. |
| Discard the edit and reopen the ticket from the event list. |  | The last saved values and the comparison ticket remain unchanged. |

### SPT-5733: Dashboard - Tickets - Save a custom ticket or scanning time

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save a custom ticket or scanning time

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

General in the legacy modal maps to Basic info → Ticket timing in the new modal. Record exact dates, times and event timezone. Choose an event lasting at least two hours; leave other custom times blank so the chosen value remains valid.

| TimeField | New-editor field | Value |
| --- | --- | --- |
| TicketStart | Custom ticket event start time | Event start + 30 minutes |
| TicketEnd | Custom ticket event end time | Event end + 30 minutes |
| Doors | Custom door time | Event start − 30 minutes |
| ScanStart | Custom scan start time | Event start − 15 minutes |
| ScanEnd | Custom scan end time | Event end + 15 minutes |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The event’s start/end dates and doors time are known; all custom ticket/scanning times start blank.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

TimeField: TicketStart, TicketEnd, Doors, ScanStart, ScanEnd

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket timing fields and enter the recorded TimeField value in the event timezone. |  | The entered date, time and timezone match the intended event-relative value. |
| Save and reopen the ticket from the event list. |  | The custom value represents the same recorded instant; no browser-timezone shift occurred. |
| Compare the event schedule and untouched ticket type. |  | Event dates and the other ticket’s times remain unchanged. |

### SPT-5734: Dashboard - Tickets - Clear a ticket time override and restore the default

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Clear a ticket time override and restore the default

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Run with the selected saved override already present. For SalesStart, also start with the Box Office sale-start bypass on. Clearing SalesStart must clear that bypass. Clearing SalesEnd restores the event’s default sale end; clearing ticket display times restores the corresponding event time; clearing ScanStart/ScanEnd removes that custom scanning boundary.

| TimeField | Field to clear |
| --- | --- |
| TicketStart | Custom ticket event start time |
| TicketEnd | Custom ticket event end time |
| Doors | Custom door time |
| ScanStart | Custom scan start time |
| ScanEnd | Custom scan end time |
| SalesStart | Sale starts on |
| SalesEnd | Sale ends on |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Record the selected saved override and its corresponding event default. For SalesStart, have an existing future sale start with Box Office bypass on.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

TimeField: TicketStart, TicketEnd, Doors, ScanStart, ScanEnd, SalesStart, SalesEnd

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the recorded ticket and clear only TimeField using its clear/remove control. |  | The selected custom value is empty; unrelated date values remain. |
| Save, close and reopen the ticket. |  | The cleared override stays empty; SalesStart also has Box Office bypass off. |
| Check the default information shown for the cleared field and compare the other ticket. |  | The applicable event default is used, or the selected custom scan boundary is absent; no other ticket time changed. |

### SPT-5735: Dashboard - Tickets - Save a finite or unlimited ticket scan limit

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save a finite or unlimited ticket scan limit

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

General in legacy maps to Basic info → Scanning. Clearing a custom limit returns to the default one scan.

| ScanSetting | Change | Saved result |
| --- | --- | --- |
| Two | Unlimited off; Scan limit 2 | Two scans allowed |
| Unlimited | Unlimited scanning capability on | Unlimited on; numeric field disabled |
| Default | Unlimited off; clear Scan limit | No custom limit; default one scan |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

ScanSetting: Two, Unlimited, Default

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Scanning and apply ScanSetting. |  | The selected finite, unlimited or default state is shown. |
| Save and reopen the ticket. |  | The selected scan-limit state remains saved. |
| Compare the ticket inventory and the comparison ticket’s scan settings. |  | Only the selected ticket’s scan setting changed. |

### SPT-5736: Dashboard - Tickets - Replace one ticket image and keep the other images

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Replace one ticket image and keep the other images

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

| ImageField | Legacy General / new Appearance field | Prepared PNG |
| --- | --- | --- |
| FirstAd | First advertisement / Ad image | 600×600, less than 1MB |
| SecondAd | Second advertisement / Ad image 2 | 600×600, less than 1MB |
| Attraction | Attraction image / Attraction page ticket type image | 1000×500, less than 1MB |

Use a clearly distinguishable image; complete the crop when offered.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The ticket has three recorded saved images. Have permission to select a prepared image from the organization media library; Attraction uses an attraction event.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

ImageField: FirstAd, SecondAd, Attraction

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected ImageField, choose the prepared image and complete the crop. |  | The selected field previews the new image without replacing another image. |
| Save and reopen the ticket. |  | The new image is retained in the selected field. |
| Compare the other image fields and the other ticket. |  | All unedited images remain unchanged. |

### SPT-5737: Dashboard - Tickets - Remove one ticket image

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Remove one ticket image

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

| ImageField | Legacy General / new Appearance field | Prepared PNG |
| --- | --- | --- |
| FirstAd | First advertisement / Ad image | 600×600, less than 1MB |
| SecondAd | Second advertisement / Ad image 2 | 600×600, less than 1MB |
| Attraction | Attraction image / Attraction page ticket type image | 1000×500, less than 1MB |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The selected image and the other two images are saved and identifiable. Attraction uses an attraction event.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

ImageField: FirstAd, SecondAd, Attraction

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Remove only the selected ImageField image. |  | That field has no image; the other image previews remain. |
| Save and reopen the ticket. |  | The selected image remains cleared instead of returning after refresh. |
| Compare the other two images and the comparison ticket. |  | No other saved image changed. |

### SPT-5738: Dashboard - Tickets - Save ticket notification recipients

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save ticket notification recipients

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Legacy uses Notifications. The new Notifications section calls sale recipients Ticket sale notifications → Employees to notify, and threshold recipients Low inventory notification → Employees to notify. Choose two existing employees in this organization whose names can be distinguished.

| Notification | Change |
| --- | --- |
| OnSale | Select the two employees for ticket sale notifications |
| LowInventory | Select the two employees for low inventory; set Notification limit 3 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Two active organization employees are available for notification selection. Record the existing recipients and threshold. No purchase or email is triggered during this configuration case.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

Notification: OnSale, LowInventory

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Notifications and apply Notification. |  | Each employee is selected once; LowInventory also shows limit 3. |
| Save and reopen Notifications. |  | The two selected recipients and applicable threshold are retained once each. |
| Compare the other notification group, confirmation-email option and comparison ticket. |  | Only the selected notification group changed. |

### SPT-5739: Dashboard - Tickets - Remove ticket notification recipients

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Remove ticket notification recipients

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Remove all recipients only from the selected group. Clearing LowInventory recipients must also clear its saved notification limit; sale recipients remain independent.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The selected notification group has two saved employees; LowInventory also has a saved limit 3. Record both groups before changing either.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

Notification: OnSale, LowInventory

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Notifications and remove all employees from the selected Notification group. |  | That group is empty; the other group remains selected as before. |
| Save and reopen Notifications. |  | The selected group stays empty; clearing LowInventory also leaves no saved notification limit. |
| Compare the other group and the comparison ticket. |  | Their recipients, limits and settings are unchanged. |

### SPT-5740: Dashboard - Tickets - Reject an incomplete low-inventory notification

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Reject an incomplete low-inventory notification

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Keep at least one employee selected under Low inventory notification.

| InvalidLimit | Change |
| --- | --- |
| Missing | Clear Notification limit |
| Negative | Enter −1 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* At least one low-inventory recipient and valid limit 3 are already saved.

**Postconditions:**

* Discard rejected changes; leave the previous valid notification configuration intact.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

InvalidLimit: Missing, Negative

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Notifications and make the selected InvalidLimit change. |  | The prepared recipients remain selected. |
| Attempt to save. |  | The notification limit shows the missing-value or non-negative validation error; no success is reported. |
| Discard and reopen Notifications. |  | The prior recipient list and limit 3 remain saved. |

### SPT-5741: Dashboard - Tickets - Include or exclude the ticket PDF from the confirmation email

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Include or exclude the ticket PDF from the confirmation email

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Notifications → Exclude from purchase confirmation email controls the ticket PDF in the customer’s purchase email; it does not remove the purchased ticket from the order.

| EmailChoice | Saved switch | Expected confirmation |
| --- | --- | --- |
| Include | Off | Ticket PDF included |
| Exclude | On | This ticket PDF omitted |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Use a future published ticket priced 0.00 for a controlled purchase; no real customer order is used. The employee has Manage Events; the customer session and email inbox are controlled by the person running this test. Record normal email delivery timing and the ticket’s original switch.

**Postconditions:**

* Restore the email switch. Retain the identified controlled order; do not resend or remove an unrelated customer’s email/order.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

EmailChoice: Include, Exclude

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Notifications, apply EmailChoice, save and reopen. |  | The selected exclusion switch is retained. |
| Complete one free purchase of the prepared ticket using the controlled customer session. |  | One order and one usable ticket are created. |
| Open the delivered purchase confirmation within normal delivery timing and compare it with the order. |  | The ticket PDF follows EmailChoice, while the saved order still contains the usable ticket. |

### SPT-5742: Dashboard - Tickets - Save ticket service-fee choices and keep event defaults

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save ticket service-fee choices and keep event defaults

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Finance uses Processing Fee Settings and Showpass Fee Settings. Select one FeeChoice; record the other selector and event defaults before the change.

| FeeChoice | Selector | Choice |
| --- | --- | --- |
| ProcessingCustomer | Processing Fee Settings | Customer pays processing fees |
| ProcessingAbsorb | Processing Fee Settings | Absorb processing fees |
| ProcessingInherit | Processing Fee Settings | Use Event Settings |
| ShowpassCustomer | Showpass Fee Settings | Customer pays Showpass fees |
| ShowpassAbsorb | Showpass Fee Settings | Absorb Showpass fees |
| ShowpassInherit | Showpass Fee Settings | Use Event Settings |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Employee also has Manage Transactions. The event uses configured fees; the ticket has no sales, price lock or waitlist subscribers. Record event defaults and the sibling ticket’s fee choices.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

FeeChoice: ProcessingCustomer, ProcessingAbsorb, ProcessingInherit, ShowpassCustomer, ShowpassAbsorb, ShowpassInherit

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Finance and apply FeeChoice only. |  | The selected ticket setting and its inherited event default are displayed. |
| Save and reopen Finance. |  | The chosen explicit value or Use Event Settings is retained. |
| Reopen the event’s Financial settings and the sibling ticket’s Finance. |  | Event defaults and the sibling ticket remain unchanged. |

### SPT-5743: Dashboard - Tickets - Protect locked ticket fees from editing

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Protect locked ticket fees from editing

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

A saved paid order alone does not prove the current ticket is locked. Use a ticket for which Price is visibly disabled because price changes are not allowed, or which the setup owner confirms has a price lock. This case checks Finance and Custom fees for that same ticket; it does not change prices or refunds.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Employee also has Manage Transactions. Use configured fees and a known controlled paid order on the selected ticket. Record its fee rules and original order amounts. Establish the ticket’s actual price-lock state before starting.

**Postconditions:**

* No fee, order, inventory or payment state is changed.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the locked ticket’s Finance and Custom fees sections. |  | The lock warning is visible; service-fee selectors and rate-card editing actions cannot be used. |
| Inspect the available controls without submitting a forced request. |  | No fee change can be submitted from these sections. |
| Reopen the original order and compare the ticket/event fee settings. |  | The original order amounts and saved fee rules remain unchanged. |

### SPT-5744: Dashboard - Tickets - Add an auto-release rule without saving other ticket edits

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Add an auto-release rule without saving other ticket edits

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

An auto-release rule makes another ticket public after the selected ticket’s remaining inventory reaches its limit. The Add rule action is saved immediately, separately from ordinary ticket edits. New modal: Auto-release → Add auto-release rule → Add rule. Legacy: Auto Release → add the corresponding rule.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Have three saved ticket types in one event: source inventory 10, two distinct hidden targets with no sales, no current rules and no reverse links. Record all names.

**Postconditions:**

* Remove only the newly created rule after verifying the source/target names. Restore any ordinary unsaved edit; do not release hidden stock.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the source ticket and change its Description without saving. |  | Description is an unsaved ordinary change. |
| Open Auto-release and add a rule releasing the first hidden target at 0 tickets remaining. |  | Exactly one rule is shown for the intended source and target. |
| Close the editor and discard the Description change, then reopen the source ticket. |  | The rule remains saved once; Description retains its original saved value. |
| Inspect the other hidden target and event. |  | No rule was added for another event or target. |

### SPT-5745: Dashboard - Tickets - Remove only the selected auto-release rule

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Remove only the selected auto-release rule

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Auto-release rule removal is saved separately from ordinary ticket fields. Use the removal control beside the recorded rule.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Have two existing controlled rules on the source ticket, pointing at different hidden targets. Both are untriggered; no source ticket is sold or held while checking removal.

**Postconditions:**

* Restore only the removed controlled rule if required by the shared setup; do not create duplicate links.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the source ticket’s Auto-release section and remove the first recorded rule. |  | The selected rule is removed; the second rule remains. |
| Close and reopen the modal without saving unrelated fields. |  | Only the second rule remains after the fresh read. |
| Inspect the targets’ visibility and the source inventory. |  | Both targets and inventory retain their recorded values. |

### SPT-5746: Dashboard - Tickets - Save a ticket quantity discount

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save a ticket quantity discount

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Tiered discounts changes the price per ticket when the selected quantity range is reached. New editor labels: Add tiered discount, Discount description, Minimum quantity, Maximum quantity, Discount unit and Discount availability. Legacy uses Tiered Discounts.

| DiscountUnit | Value | At quantity 2, before fees/taxes |
| --- | --- | --- |
| Amount | 2.00 off each ticket | 36.00 total |
| Percent | 10% off each ticket | 36.00 total |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Organization allow_tiered_discounts is on. Use an unsold published non-recurring ticket priced 20.00 with inventory at least 10; no other discount, membership price, credit or package changes its price.

**Postconditions:**

* Remove only Pair discount created here and save; release the temporary basket. Other saved rules remain unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

DiscountUnit: Amount, Percent

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add one tiered discount: description Pair discount, minimum 2, maximum 4, DiscountUnit value, available in Online public checkout and Box office. |  | The selected quantity range, unit, value and both checkout choices are shown. |
| Save the ticket modal and reopen Tiered discounts. |  | Exactly one matching discount is saved for this ticket. |
| In public ticket selection add quantity 2, inspect its price, then remove the basket items. |  | Ticket subtotal is 36.00 before fees and taxes; no order is placed. |

### SPT-5747: Dashboard - Tickets - Add a password that unlocks only one ticket type

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Add a password that unlocks only one ticket type

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

A ticket password unlocks one ticket type rather than the whole event. Legacy Password maps to new Passwords. Use exact password EntryReview731; in the new modal select Exact match. Choose Active, start one hour in the past and end one day in the future in the event timezone.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The target and comparison tickets are hidden, on sale, unsold and each has its own known access setup. EntryReview731 is not already in use. Have the event’s public link and a separate signed-out customer session.

**Postconditions:**

* Remove only EntryReview731 after confirming no order used it. Release any temporary selection; retain other access rules.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the target ticket’s Passwords and add the exact password with the recorded active sales window. |  | The new row belongs to this ticket and shows the intended password and times. |
| Save and reopen Passwords. |  | The row appears once with the same active state and window. |
| Open the public event in the signed-out session and enter EntryReview731. |  | Only the target ticket unlocks through this password; the comparison hidden ticket is not unlocked. |

### SPT-5748: Dashboard - Tickets - Cancel or confirm deletion of a ticket password

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Cancel or confirm deletion of a ticket password

**Description:** Use Build → Events → edit the event → Tickets → edit the ticket. Save changes saves the ticket modal; close and reopen it after a successful save.

This case uses the new modal’s saved-password deletion confirmation. Cancel keeps the row. Confirm removes only the selected saved password; ordinary unsaved fields must not be saved as a side effect.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The selected ticket has two controlled saved exact-match passwords with no use or orders. Record their text and dates.

**Postconditions:**

* For Confirm, restore only the removed controlled password if needed; do not duplicate the remaining password.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

Decision: Cancel, Confirm

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Passwords, choose Delete beside the first recorded password. |  | Delete password confirmation identifies the selected password; the parent ticket editor remains open. |
| Choose Decision: Cancel, or confirm Delete. |  | Cancel retains the selected row; Confirm removes that row and keeps the other password. |
| Close and reopen the ticket without saving unrelated fields. |  | The selected deletion decision persists; no other password or ticket is affected. |

### SPT-5749: Dashboard - Tickets - Keep or discard unsaved ticket modal changes

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Keep or discard unsaved ticket modal changes

**Description:** Use Build → Events → edit the event → Tickets → edit the ticket. Save changes saves the ticket modal; close and reopen it after a successful save.

Use the new modal. Ordinary field changes are saved only through Save changes. Closing asks Discard your unsaved ticket type changes? KeepEditing declines that confirmation; Discard accepts it.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.

**Postconditions:**

* Leave the ticket with its recorded original Description and no unsaved edit.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

CloseDecision: KeepEditing, Discard

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Change Description to Unsaved modal detail, then open Appearance and return to Basic info without saving. |  | The unsaved Description remains available across sections. |
| Use the modal close control and choose CloseDecision. |  | KeepEditing leaves the editor open with its draft; Discard closes the editor. |
| For KeepEditing, close again and discard; reopen the same ticket from the event list. |  | The original saved Description is retained; no ordinary field edit was silently saved. |

### SPT-5750: Dashboard - Tickets - Save changes from more than one ticket section together

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save changes from more than one ticket section together

**Description:** Use Build → Events → edit the event → Tickets → edit the ticket. Save changes saves the ticket modal; close and reopen it after a successful save.

Use the new modal. This case proves one clean successful Save changes spanning independent sections rather than saving one field and assuming the rest followed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* The ticket’s Description and confirmation-email exclusion switch are recorded; no image upload or immediate rule action is pending.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Change Description to Combined ticket update in Basic info. |  | Description is changed but not yet saved. |
| Open Notifications and reverse Exclude from purchase confirmation email; return to Basic info. |  | Both section drafts remain visible before saving. |
| Select Save changes once; after it completes, reopen the same ticket from the event list. |  | Both Description and the exclusion switch are saved with their intended values. |
| Compare price, inventory, dates and the other ticket. |  | No unrelated field or ticket changed. |

### SPT-5751: Dashboard - Tickets - Save one ticket option without changing other settings

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Save one ticket option without changing other settings

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Only run each Option when its stated organization capability is enabled. This is saved-configuration proof; actual credit purchase, check-in and return behavior has separate downstream coverage.

| Option | Change | Required capability |
| --- | --- | --- |
| AutoCheckinOn | Force auto check-in on purchase on | Organization allow_auto_checkin; ticket Visible to Sellers |
| AutoCheckinOff | Force auto check-in on purchase off | Organization allow_auto_checkin |
| CreditOnlyOn | Only allow purchases via Ticket Credits on | Organization ticket credits enabled; ticket is redeemable, not an issuing or payment-plan ticket |
| CreditOnlyOff | Only allow purchases via Ticket Credits off | Same ticket-credit setup |
| ReturnsAllow | Allow free ticket returns → Allow Free Returns | Organization allow_free_return |
| ReturnsDisallow | Allow free ticket returns → Disallow Free Returns | Organization allow_free_return |
| ReturnsInherit | Allow free ticket returns → Use Event Settings | Organization allow_free_return |
| ThresholdInherit | Ticket type inventory threshold displays → Use Event Settings | Organization low_inventory_warning_enabled; event threshold choice inherits; no recurring/child event |
| RemainingCount | Set Show remaining tickets to 3 | Same threshold setup; event-wide total inventory override is empty; type threshold choice inherits |
| ClearRemainingCount | Clear an existing saved Show remaining tickets value 3 | Same remaining-count setup |
| ThresholdDisable | Ticket type inventory threshold displays → Disable Threshold Displays | Same inventory-threshold setup |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* A setup owner prepares the capability and record state listed for Option. Record the original option and matching event default; do not enable organization capabilities during this case.

**Postconditions:**

* Restore only the changed ticket settings to their recorded values, save and reopen. Keep the comparison ticket unchanged.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Parameters:**

Option: AutoCheckinOn, AutoCheckinOff, CreditOnlyOn, CreditOnlyOff, ReturnsAllow, ReturnsDisallow, ReturnsInherit, ThresholdInherit, ThresholdDisable, RemainingCount, ClearRemainingCount

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open General in legacy or Basic info in the new editor and apply only Option. |  | The selected control shows the intended value. |
| Save and reopen the ticket. |  | The exact explicit or inherited choice remains saved. |
| Compare the matching event default, other ticket options, price and inventory. |  | No event default, unrelated option or comparison ticket changed. |

### SPT-5752: Dashboard - Tickets - Release the next ticket type when the inventory limit is reached

**Publication status:** Created in Qase and verified October 17, 2026; manual test not executed. Placement: suite 83.

**Title:** Dashboard - Tickets - Release the next ticket type when the inventory limit is reached

**Description:** Run once from each editor using the same saved ticket type, restoring the baseline between runs. Legacy: Dashboard → Manage Events → Edit → Ticket Types → edit the ticket; ordinary field changes use Next, then Save Event. New editor: Build → Events → edit the event → Tickets → edit the ticket; ordinary field changes use Save changes. Reopen from the event list after saving. Independently saved actions are named in the steps.

Auto-release must change customer availability, not only save a rule. Start with source inventory 2 and a saved rule that releases one hidden target when the source has 1 ticket remaining. Record the normal release-processing deadline.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: Manage Events.
* Use an owned event with a saved timezone and a second ticket type as an untouched comparison. Record both tickets’ settings. Unless this case specifies a different state, use a future single event and an unsold standard ticket priced 20.00 with inventory 10.
* Use a controlled Hidden published single event with a free source ticket inventory 2 and a hidden target inventory 5; both are on sale with no customers, existing orders or holds. One untriggered source→target rule at remaining inventory 1 is already saved. No Facebook connection or other release rule is involved. A controlled customer session may complete one free purchase.

**Postconditions:**

* Retain the identified controlled order and triggered-rule history. Keep the event Hidden; do not reset shared stock or delete another order.

**Priority:** High

**Tags:** dashboard, tickets, edit-event

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Before purchasing, open the public event link in a signed-out session. |  | The source can be selected; the target is hidden. |
| Complete exactly one free source-ticket purchase. |  | One order and one source ticket are created; source remaining inventory becomes 1. |
| After normal release processing, reopen ticket selection and the target’s editor. |  | The same target becomes Public and selectable without manually editing its visibility. |
| Compare source/target inventory and order history. |  | Source remains at 1 available, target remains at 5 available and no duplicate ticket/order was created. |

## Published shared fee-case enhancements — avoid copies

### SPT-5722: Dashboard - Events - Override an inherited custom fee for one event or ticket type

**Publication status:** Enhanced in Qase and verified October 17, 2026; manual test not executed. Placement: existing suite 1135.

**Title:** Dashboard - Events - Override an inherited custom fee for one event or ticket type

**Description:** Run FeeScope Event from the event → Manage → Custom fees. Run FeeScope Ticket from that event → Tickets → edit the selected ticket → Custom fees. An override changes one inherited fee for the selected event or ticket only. Both paths use the same rate-card controls.

| FeeScope | Selected owner | Untouched comparisons |
| --- | --- | --- |
| Event | One owned unsold event | Organization fee definition and another event |
| Ticket | One unsold ticket type in the event | Parent event fee and sibling ticket type |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: Manage Events and Manage Transactions.
* The organization uses configured fees. Use an owned future single event with no sales; for Ticket, select an unsold unlocked standard ticket with no waitlist subscribers. Record the inherited fee amount, payer and conditions, the selected owner and untouched comparisons.
* Have an inherited fee that can be overridden. The selected owner has no existing override for that fee.

**Postconditions:**

* Remove only the override created for the selected owner; verify its inherited fee returns and parent/comparison fee definitions remain intact.

**Priority:** High

**Tags:** dashboard, events, fees-taxes

**Parameters:**

FeeScope: Event, Ticket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Custom fees using FeeScope’s visible entry. |  | The inherited fee belongs to the selected owner and its parent value is shown. |
| Choose Override for that fee; set fixed amount 2.00 and percentage 0 without changing its payer or conditions. |  | The override form shows the intended fee and owner. |
| Select Save override and reopen the same owner’s Custom fees. |  | Exactly one override retains fixed amount 2.00, percentage 0 and the original payer/conditions. |
| Open the parent and comparison records from the Description table. |  | Their fee amounts and conditions are unchanged. |

### SPT-5723: Dashboard - Events - Restore an inherited fee by removing an event or ticket override

**Publication status:** Enhanced in Qase and verified October 17, 2026; manual test not executed. Placement: existing suite 1135.

**Title:** Dashboard - Events - Restore an inherited fee by removing an event or ticket override

**Description:** Run FeeScope Event from the event → Manage → Custom fees. Run FeeScope Ticket from that event → Tickets → edit the selected ticket → Custom fees. An override changes one inherited fee for the selected event or ticket only. Both paths use the same rate-card controls.

| FeeScope | Selected owner | Untouched comparisons |
| --- | --- | --- |
| Event | One owned unsold event | Organization fee definition and another event |
| Ticket | One unsold ticket type in the event | Parent event fee and sibling ticket type |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: Manage Events and Manage Transactions.
* The organization uses configured fees. Use an owned future single event with no sales; for Ticket, select an unsold unlocked standard ticket with no waitlist subscribers. Record the inherited fee amount, payer and conditions, the selected owner and untouched comparisons.
* Have a known controlled override of one inherited fee for the selected owner. The parent fee still exists; no sale or pending subscriber uses the override.

**Postconditions:**

* Leave the selected owner inheriting the parent fee, or restore only its recorded controlled override if required. Do not remove the parent definition.

**Priority:** High

**Tags:** dashboard, events, fees-taxes

**Parameters:**

FeeScope: Event, Ticket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Custom fees using FeeScope’s entry and locate the recorded override. |  | The owner-specific override and its inherited parent are identifiable. |
| Open the override’s action menu → Delete rate card and confirm the named override. |  | Only the selected owner’s override is removed. |
| Reopen the same owner’s Custom fees. |  | The inherited fee is visible again with the recorded parent amount, payer and conditions. |
| Compare the parent definition and untouched comparison. |  | Both remain intact and no other rate card was removed. |

## Modal coverage and reuse decisions



| Function / controls | Existing or draft coverage | Status / limit |
| --- | --- | --- |
| Price, inventory and sale history | SPT-758,766,768,770; SPT-5349/5350 | Kept. Price/inventory moved from legacy General/Finance to the ticket list; list save versus modal save stay separate. Price lock and historical order amounts remain mandatory. |
| Name, rich description, icon, ticket color | [SPT-5730](https://app.qase.io/case/SPT-5730); [SPT-5732](https://app.qase.io/case/SPT-5732) | Published definition. New-only color is labelled; bold content is saved and reread. Additional rich-text link/list tools remain manual-only control checks. |
| Minimum/maximum, per-user and Box Office limits | [SPT-5731](https://app.qase.io/case/SPT-5731), [SPT-5732](https://app.qase.io/case/SPT-5732); [SPT-1070](https://app.qase.io/case/SPT-1070) | Published definition: configuration and invalid relationships; reuse Box Office quantity enforcement. Public lifetime-limit and concurrent buyer proof remains manual-only until dedicated existing cases/setup are verified. |
| Sales windows, visibility and scheduled flip | [SPT-4063](https://app.qase.io/case/SPT-4063), [SPT-4875](https://app.qase.io/case/SPT-4875), [SPT-4389](https://app.qase.io/case/SPT-4389); [SPT-5734](https://app.qase.io/case/SPT-5734) | Keep and link. [SPT-5734](https://app.qase.io/case/SPT-5734) adds clear/reset, including clearing Box Office start bypass. Invalid/past flip and DST gap/fold boundaries require targeted execution. |
| Ticket start/end/doors and scan start/end overrides | [SPT-5733](https://app.qase.io/case/SPT-5733), [SPT-5734](https://app.qase.io/case/SPT-5734); [SPT-5476](https://app.qase.io/case/SPT-5476) | Published definition: save/clear; reuse admission outside saved scan window. [SPT-5732](https://app.qase.io/case/SPT-5732) rejects reversed scan times. Other invalid ticket timing relationships and exact start/end boundaries are manual-only, not passed by roundtrip. |
| Scan limit and unlimited scan | [SPT-5732](https://app.qase.io/case/SPT-5732), [SPT-5735](https://app.qase.io/case/SPT-5735); [SPT-5478](https://app.qase.io/case/SPT-5478), [SPT-5479](https://app.qase.io/case/SPT-5479) | Published definition: configuration; keep existing successful scan counts and limit rejection. |
| First/second PDF advertisements and attraction image | [SPT-5736](https://app.qase.io/case/SPT-5736), [SPT-5737](https://app.qase.io/case/SPT-5737) | Published definition: replace/remove with slot isolation; image picker, media library, cropping cancellation and invalid type/size/dimensions remain manual-only. New source: PDF ad100–2000px, attraction minimum500px/max4000×2000, both max1MB. |
| Purchase and inventory notification employee pickers; threshold; remove selections | [SPT-5738](https://app.qase.io/case/SPT-5738), [SPT-5739](https://app.qase.io/case/SPT-5739), [SPT-5740](https://app.qase.io/case/SPT-5740) | Published definition: recipient save/clear and missing/negative threshold. Actual delivered sale/threshold alerts, employee pagination and inactive/missing recipients remain manual-only; no email was sent. |
| Exclude ticket PDF from purchase confirmation | [SPT-5741](https://app.qase.io/case/SPT-5741) | Published definition: controlled free-order and delivered-email proof; separate from saving recipients. No purchase was executed here. |
| Per-ticket fee inheritance and locked values | [SPT-5742](https://app.qase.io/case/SPT-5742), [SPT-5743](https://app.qase.io/case/SPT-5743); SPT-5722/5723 enhancements | Distinct ticket payer state; share custom-fee owner workflow using FeeScope instead of copying. Waitlist-pending server rejection and independent charged fee/earnings calculation remain manual-only required financial gates. |
| PWYC configurations, presets and assignment | [SPT-759](https://app.qase.io/case/SPT-759), [SPT-760](https://app.qase.io/case/SPT-760) | Link existing cases; verify their save controls against unified Save changes and usage-confirmation modal. Do not copy. Cancellation/failed assignment, free/minimum bounds and used-configuration confirmation require original-case enhancement. |
| Auto-release source/target and thresholds | [SPT-5744](https://app.qase.io/case/SPT-5744), [SPT-5745](https://app.qase.io/case/SPT-5745), [SPT-5752](https://app.qase.io/case/SPT-5752); [SPT-5132](https://app.qase.io/case/SPT-5132) | Published clean save, delete and actual inventory-driven release. Existing5132 weakly mentions invalid rules; self/cyclic links, third-rule limit and invalid threshold need strengthening there, not another copy of its stated invalid target. |
| Tiered discounts: range, amount/percent and checkout scope | [SPT-5746](https://app.qase.io/case/SPT-5746); [SPT-5132](https://app.qase.io/case/SPT-5132) | Published clean configuration and public subtotal proof. Edit/delete confirmation, amount/percent boundaries, overlapping ranges and checkout-specific exclusion remain manual-only; existing5132 currently mixes packages/sellers and has a blank final result. |
| Ticket password add, exact match, active window, delete and confirmation | [SPT-5747](https://app.qase.io/case/SPT-5747), [SPT-5748](https://app.qase.io/case/SPT-5748); [SPT-3565](https://app.qase.io/case/SPT-3565), [SPT-363](https://app.qase.io/case/SPT-363) | Do not substitute event-password5355: that owns whole-event access. New ticket-only creation/delete; reuse customer refusal/access. Pattern match, duplicate password, invalid window, Active off and no-end-date branches remain manual-only. |
| Transfers and E-ticket/Delivery/Will Call fees | [SPT-3275](https://app.qase.io/case/SPT-3275)–[SPT-3278](https://app.qase.io/case/SPT-3278), [SPT-5133](https://app.qase.io/case/SPT-5133) | Keep and link child448. Shipping fee method, override basket shipping, will-call digital-ticket switch, voucher transfer prohibition and transfer disable/clear loops need original-case enhancements/manual execution; current four happy-path cases do not establish them. |
| Waitlist enable/disable and independently saved settings | [SPT-4384](https://app.qase.io/case/SPT-4384) | Reuse; original case needs accurate enable_waitlist_configuration_ui gate, Save Settings versus Save changes and numeric cutoff units. Cancellation of enable/disable and pending subscriber lock remain manual-only. |
| Customer-initiated refund option | [SPT-5253](https://app.qase.io/case/SPT-5253), [SPT-5254](https://app.qase.io/case/SPT-5254), [SPT-5255](https://app.qase.io/case/SPT-5255) | Reuse originals. Evidence conflict: current modal disables the switch unless organization policy is enabled for tickets, while5253/5254 prescribe editing under disabled policy. Backend editability gate and exact deployed state need reconciliation before sign-off; do not clone those tests. |
| Public sold-out flag; inventory threshold inheritance and remaining number | [SPT-5282](https://app.qase.io/case/SPT-5282), [SPT-5286](https://app.qase.io/case/SPT-5286); [SPT-5751](https://app.qase.io/case/SPT-5751) | Keep public-stock protection. [SPT-5751](https://app.qase.io/case/SPT-5751) covers inherited/disabled type choice and type remaining-count save/clear; exact bounds and public counter transitions require manual execution and are not proven by event-wide5347. |
| Credit-only purchase, auto check-in, free return inheritance | [SPT-5751](https://app.qase.io/case/SPT-5751); ticket-credit suite1149 and admission184 | Published definition: option configuration only; existing credit issuance/redemption is linked rather than copied. Actual ordinary-payment refusal, automatic purchase admission and ticket-specific return eligibility remain manual-only downstream proof. |
| Section visibility, modal close and multi-section save | [SPT-5729](https://app.qase.io/case/SPT-5729), [SPT-5749](https://app.qase.io/case/SPT-5749), [SPT-5750](https://app.qase.io/case/SPT-5750); [SPT-5350](https://app.qase.io/case/SPT-5350) | Published modal responsibilities differ from list→editor dirty changes in5350. Retry refresh, partial write recovery, pending-action guards and rapid repeated submission are manual-only with explicit fault setup missing; no invented runnable failure case. |
| Internal Fees and authorized staff ID copy | Internal fee cases3810/3811; [SPT-5729](https://app.qase.io/case/SPT-5729) | Link specialist cases; modal ticket context and default-internal-fee flag redirect still require staff-only execution. Copy ticket ID is new-only/manual-only; ordinary staff must not see internal controls. |
| Legacy Payment Plans tab | No replacement established | Blocked access target: organization allow_payment_plans, saved non-template event; legacy edits the ticket plan, not merely event stats. Existing5650/5651 exclusions do not provide plan setup. |
| Legacy Integrations provider/action/parameter and Workday data | No replacement established | Blocked access target: configured integration_info/workday_integration_enabled. Event Advanced Workday edits the event; it does not substitute ticket-level values. |
| Legacy Resale target set/remove | No replacement established | Blocked access target under enable_resale_configuration_ui. Customer resale and Waitlists tests do not prove organizer configuration access. |
| Legacy Show Ticket Prices | No replacement established | Blocked field: legacy General switch writes show_ticket_prices. Native ticket editor/list has no matching field; the API still exposes it. Preserving a hidden value on save is not editing parity. |
| Legacy ticket Seller Commission: Cash / Credit Sales | No replacement established | Blocked field group under configured fees + Manage Transactions + non-Basic pricing. New ticket Finance has payer selectors, not commission inputs; organization/event defaults are not a per-ticket replacement. |
| New-only talent experience, regular-price/presale wording, ticket time TBD | Native Basic info; no matching legacy modal control established | Not a lost legacy function. Current-new-feature baseline/validation remains manual-only: enable_ticket_presale_display gate; regular price must exceed sale price. Do not silently use these fields to claim legacy coverage. |
| Commented Collect Info tab | Not applicable | Entire legacy tab is commented out. Order-form/profile questions remain in their owning suite; not a lost visible modal tab. |

## Evidence and execution limits

- Qase projectSPT: the review reused the earlier complete snapshot **2,192 cases /317 suites**, completed **2026-10-18 00:56:32 UTC (October17 locally)**. Before this batch, suite83 had **15 direct cases**, plus Delivery448 (5), Display999 (1), Hard Copy1034 (8) and organization-wide credits1149 (33). Credit redirects/hard-copy ordering are preserved but are not evidence of ticket-modal coverage. Full-field aliases were searched across titles, descriptions, prerequisites, parameters and steps, not only suite titles. Saved selected baseline and duplicate decisions in review evidence.
- Control accounting: **13 active legacy tabs, 12 new sections and 53 distinct legacy type bindings** are mapped in the evidence. These include local date/time wrappers; shared passwords, fees, PWYC, discounts and waitlist settings are accounted separately. Ticket ID visibility changes from ordinary legacy editors to internal-admin-only in the new header; this requires acceptance/verification. External Barcodes Left moved to the new ticket list and is not a lost display.
- Backend first: ticket_types.py serializer validates regular price, local schedules, scan end ordering, external-barcode inventory, recurring-child restrictions, voucher/payment-plan conflicts and pending-waitlist fee changes. TicketType model defines inventory/limits and related state. Legacy `_edit-ticket-type.html` has13 active tab definitions; General splits into Basic info/Appearance, Finance splits into Finance/Custom fees, while Payment Plans/Integrations/Resale lack established new controls.
- Source roots: `/Users/christianvaldez/Documents/Showpass/repos/web-app`; `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`. Exact revisions and control accounting are in linked evidence. Main backend paths: `apps/tickets/api/venue_based/serializers/ticket_types.py`; `models/event_management/event_ticket_types.py`; `models/event_management/automatic_release.py`; `apps/main/templates/tickets/dialogs/_edit-ticket-type.html`; shared item-fee/password/delivery/PWYC templates. Native: events/ticket-types `editor-modal`, `basic-info`, `appearance`, `notifications`, `finance`, `delivery`, `passwords`, `pwyc`, `auto-release`, `tiered-discounts`, `waitlist`, `custom-fees` and `internal-fees`.
- This is a source/Qase definition review. Neither modal was saved and no order or notification was created. The approved Qase definition publication is verified above. Exact deployed role/flags/UI labels and the five replacement paths remain unverified live. Existing shared cases with legacy navigation need their original instructions adapted before a native run.
- Financial/customer gates are not cleared by this note: controlled paid purchase, fee collection/allocation/earnings, no duplicate charging, finite-stock contention and refund/void/exchange lifecycle still require their linked domain tests and independent reconciliation. No financial or migration-ready pass is claimed.

## Earlier published cases and page notes

The following material is preserved as the October4/14 baseline. Current modal findings and proposed definitions above supersede any implication that the whole ticket modal was already covered.

## Qase publication — 2026-10-14

All cases below were created and read back, including every field and step. Test execution is still pending.

| Former local draft | Qase case | Folder | Steps |
| --- | --- | --- | --- |
| TC-5 | [SPT-5345](https://app.qase.io/case/SPT-5345) | Tickets (83) | 7 |
| TC-6 | [SPT-5346](https://app.qase.io/case/SPT-5346) | Tickets (83) | 6 |
| TC-7 | [SPT-5347](https://app.qase.io/case/SPT-5347) | Tickets (83) | 7 |
| TC-8 | [SPT-5348](https://app.qase.io/case/SPT-5348) | Tickets (83) | 5 |
| TC-17 | [SPT-5349](https://app.qase.io/case/SPT-5349) | Tickets (83) | 7 |
| TC-18 | [SPT-5350](https://app.qase.io/case/SPT-5350) | Tickets (83) | 5 |

## Page coverage and source notes

Separate the ticket table/editor from event-wide settings. SPT-758–760 cover pricing/PWYC; SPT-766/768/770 cover inventory and historical pricing; SPT-4063/4875 cover sale windows and visibility; SPT-4384 covers waitlist setup; SPT-3275–3278 cover delivery. The event-wide cap and PDF settings below are not ticket-type fields.

Sources: [event validation and nested saves](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/events.py>), [ticket validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/ticket_types.py>), [event-wide settings](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/event-settings/event-ticket-settings-fields.ts>), [ticket requirement control](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ticket-types/list/EventTicketTypesPageSections.web.tsx>).

## Published Qase cases

### SPT-5349: Dashboard - Tickets - Add and remove an unsold ticket type

**Description:** An employee adds a ticket type, saves it, removes it, and confirms other ticket types are unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee has Manage Events permission for an owned single event created for testing with no sales.
* The event has an existing General Admission ticket; record its name, inventory and price.
* No ticket named Added Admission exists, and no package or seating configuration will reference the new ticket.

**Postconditions:** Only Added Admission is removed; the original General Admission ticket remains unchanged.

**Tags:** dashboard, tickets, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → Add ticket type. | | One new ticket row is available. |
| Fill in the new row. | **Name:** Added Admission; **Inventory:** 30; **Price:** 20.00; **Visibility:** Public | The row displays the entered values. |
| Select Save. | | Saving succeeds. |
| Leave and reopen Tickets. | | Added Admission appears once with inventory 30, price 20.00 and Public visibility. |
| Use the remove action on Added Admission. | **Target:** only Added Admission | That ticket is marked for removal or removed from the unsaved list. |
| Save and confirm removal if prompted. | | Removal succeeds for the unsold ticket. |
| Leave and reopen Tickets. | | Added Admission is absent and General Admission retains its recorded values. |

### SPT-5350: Dashboard - Tickets - Handle unsaved list changes before opening a ticket editor

**Description:** Opening a ticket's detailed editor does not silently save or discard changes made in the ticket list.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event with an unsold standard ticket type.
* Record that ticket's original name and inventory.

**Postconditions:** Restore the ticket's original name, save and reopen Tickets; inventory remains unchanged.

**Tags:** dashboard, tickets, edge-case

**Parameters:**

DialogChoice: Cancel, DiscardChanges, SaveAndContinue

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets and edit the ticket's name in the list without saving. | **Name:** append Updated | The list displays an unsaved change. |
| Open that ticket's detailed edit action. | | A dialog asks about saving list changes before editing the ticket. |
| Select the chosen DialogChoice. | **Cancel:** Cancel; **DiscardChanges:** Discard changes; **SaveAndContinue:** the save-and-continue action | Cancel keeps the unsaved list open; Discard changes opens the editor with the original name; saving first opens it with the updated name. |
| Return to Tickets and reload the page, discarding any remaining unsaved change. | | Only SaveAndContinue retains Updated; Cancel and DiscardChanges leave the original saved name. |
| Inspect the ticket inventory. | **Inventory:** recorded original value | The inventory is unchanged in every scenario. |

### SPT-5345: Dashboard - Tickets - Enforce the total event inventory across ticket types

**Description:** Two individually available ticket types share one event-wide limit; a customer cannot reserve more than that combined limit.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned, published future single event created for testing, with no orders or reservations.
* The event has two public standard ticket types, each with inventory 10, sales open now, and purchase limits permitting three tickets.
* The event is not available to real customers during this test; use a customer session under your control.
* Record the original Total Event Inventory value.

**Postconditions:** Empty the customer's basket; restore the original event inventory, save and reopen Tickets. Do not complete a purchase.

**Tags:** dashboard, tickets, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → event settings. | | Both ticket types and Total Event Inventory are available. |
| Set Total Event Inventory. | **Limit:** 2 | The event-wide limit is 2; both ticket-type inventories remain 10. |
| Save the event settings. | | Saving succeeds. |
| Leave and reopen Tickets. | | The event-wide limit remains 2 and both individual inventories remain 10. |
| Open View Event in the customer session and add one of each ticket type. | **Ticket A:** 1; **Ticket B:** 1 | The basket accepts two tickets in total. |
| Try adding one more of either ticket type. | **Requested total:** 3 | The event capacity prevents the additional ticket, even though the individual type has stock. |
| Remove all tickets from the basket. | | The basket is empty; no order or payment was created. |

### SPT-5346: Dashboard - Tickets - Save event-wide ticket messages and check the downloaded ticket

**Description:** Event-wide PDF terms and the custom message survive saving and appear on a newly issued electronic ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for a published future single event created for testing.
* It has one public free ticket type with inventory 5, electronic delivery, sales open, and no ticket-specific message or terms override.
* Use an email address under your control and record the original event PDF terms and message.

**Postconditions:** Restore the original PDF text and save. Keep the free order identified for review; do not delete the event or order to hide the issued ticket.

**Tags:** dashboard, tickets, post-purchase

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → event settings. | | Ticket PDF Terms & Conditions and Ticket PDF Custom Message are available. |
| Enter both messages. | **Terms:** Bring this ticket to the entrance.<br>**Custom message:** Entrance opens at 18:30. | Both fields show the entered text. |
| Save the event settings. | | Saving succeeds. |
| Reopen event settings. | | Both exact messages remain saved. |
| Open View Event in the customer session and obtain one free ticket. | **Quantity:** 1; **Email:** controlled inbox | One order containing the intended event ticket is completed without a payment charge. |
| Download the ticket PDF from the order confirmation. | | The PDF identifies the correct event and displays both saved messages. |

### SPT-5347: Dashboard - Tickets - Save and clear the event inventory display settings

**Description:** Inventory display choices and default sale timing remain saved independently of individual ticket settings.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned single event with no sales, two ticket types of inventory 10 each, and no total-event override.
* The organization has low_inventory_warning_enabled enabled; record the current event settings.
* One ticket type uses the event's default sale end and the other has a custom sale end; record both.

**Postconditions:** Restore the recorded event settings and verify that the ticket type's custom sale end was not changed.

**Tags:** dashboard, tickets, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → event settings. | | Inventory display and default sale-end controls are available. |
| Select Enable Threshold Displays and set Show Remaining Tickets. | **Amount:** 5 | Both selected values are shown. |
| Choose a different Default End Sale Time. | **Choice:** select a listed choice different from the recorded one and record its label | The new default is shown. |
| Save, leave and reopen event settings. | | All three selected settings are retained. |
| Open the ticket type with a custom sale end. | **Ticket:** the type identified in Preconditions | Its custom sale-end value is unchanged. |
| Clear Show Remaining Tickets and select Disable Threshold Displays. | **Amount:** empty | The amount is blank and threshold displays are disabled. |
| Save, leave and reopen event settings. | | The amount remains blank and threshold displays remain disabled. |

### SPT-5348: Dashboard - Tickets - Change an unsold event to admission without tickets

**Description:** Turning on Tickets not required changes the event to admission without ticket purchasing; it does not create an order or an admission ticket.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for a published single event created solely for this test, with one public free ticket type and no orders or sales.
* No real customer uses the event; record its original ticket setup.

**Postconditions:** Keep the event identified for review; do not apply this transition to an event with customers. Restore ticket-required admission and its recorded ticket setup only if the event will be reused.

**Tags:** dashboard, events, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Tickets → Ticket requirement settings. | | Tickets not required is off and the explanation describes the ticketing features that would no longer be used. |
| Turn on Tickets not required and select Done. | | The page switches to its no-ticket state. |
| Select Save. | | Saving succeeds. |
| Leave and reopen Tickets. | | Tickets not required remains on. |
| Open View Event in the customer session. | | The event explains that admission is free without tickets and does not offer a ticket-purchase flow. |

## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-758](https://app.qase.io/case/SPT-758) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-759](https://app.qase.io/case/SPT-759) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-760](https://app.qase.io/case/SPT-760) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-766](https://app.qase.io/case/SPT-766) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-768](https://app.qase.io/case/SPT-768) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-770](https://app.qase.io/case/SPT-770) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-4063](https://app.qase.io/case/SPT-4063) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-4384](https://app.qase.io/case/SPT-4384) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-4875](https://app.qase.io/case/SPT-4875) | Tickets (83) | Existing case preserved; migration notes below apply |
| [SPT-3275](https://app.qase.io/case/SPT-3275) | Delivery Settings (448) | Existing case preserved; migration notes below apply |
| [SPT-3276](https://app.qase.io/case/SPT-3276) | Delivery Settings (448) | Existing case preserved; migration notes below apply |
| [SPT-3277](https://app.qase.io/case/SPT-3277) | Delivery Settings (448) | Existing case preserved; migration notes below apply |
| [SPT-3278](https://app.qase.io/case/SPT-3278) | Delivery Settings (448) | Existing case preserved; migration notes below apply |

### SPT-758: Dashboard - Ticket Types - Create and update an active price tier

**Description:**

Validates that a venue using price tiers creates an active tier for a new ticket type and uses a new current tier after its price changes.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** An organizer can edit a future published event at a venue with price tiers enabled. The test ticket type has no sales.

**Postconditions:** Remove the test no-sales ticket type or restore the test setup.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Ticket Types** for the future event and add a ticket type. | `QA Tier <unique suffix>`; price `20.00`; inventory `30`; Public | The new ticket row accepts all values. |
| Save the event once. | None | The ticket type is created with a current active price of `20.00`. |
| Return through **Manage Events** and reopen the ticket type. | Test ticket type | Name, inventory, visibility, and current price persist after a fresh read. |
| Open the public ticket selection. | Same event | The ticket type is available at `20.00` before fees and taxes. |
| Change the price to `25.00` and save once. | New price `25.00` | The edit succeeds and `25.00` becomes the current active price. |
| Reopen Dashboard and public ticket selection. | Same ticket type | Both surfaces show `25.00`; the prior tier is not presented as the current buyer price. |

### SPT-759: Dashboard - Ticket Types - Assign a Pay What You Can configuration

**Description:**

Validates the actual PWYC workflow: a ticket type selects an existing named configuration or creates a new one. A simple enable toggle is not the current product contract.

| ConfigurationSource | Setup |
| --- | --- |
| ExistingConfiguration | Select an existing venue-owned configuration. |
| NewConfiguration | Create `QA PWYC <unique suffix>` with preset amounts `10.00`, `20.00`, `30.00`, Allow free tickets off, and a short description. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The `use_pwyc_configuration` switch is enabled; the organizer can edit a future public ticket type; the venue has an existing configuration for the first parameter.

**Postconditions:** Unassign the test configuration; remove a newly created configuration only when no other ticket type uses it.

**Tags:** dashboard, tickets, pwyc

**Parameters:**

ConfigurationSource: ExistingConfiguration, NewConfiguration

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket type's advanced editor and select **Pay What You Can**. | Public ticket type | **Select Configuration** and configuration details are shown. |
| Complete the setup for `ConfigurationSource`. | Selected row | A venue-owned configuration is selected or the new configuration is created successfully. |
| Save the ticket type once. | None | The selected configuration is assigned to the ticket type. |
| Return through **Manage Events** and reopen the same PWYC tab. | Same ticket type | The assigned configuration and its preset amounts persist. |
| Open buyer ticket selection and choose the PWYC ticket. | Same event | The configured amounts and description are available; a free amount is unavailable because Allow free tickets is off. |

### SPT-760: Dashboard - Ticket Types - Add, edit, and remove PWYC preset amounts

**Description:**

Validates the complete preset-amount lifecycle on one test PWYC configuration and proves that the assigned ticket type reflects the final saved choices.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A test PWYC ticket type uses a configuration containing `10.00`, `20.00`, and `30.00`; no other ticket type uses this configuration.

**Postconditions:** Restore the original three amounts or remove the test configuration.

**Tags:** dashboard, tickets, pwyc

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Pay What You Can** for the test ticket type. | Assigned configuration | The three recorded preset amounts are shown. |
| Add one preset amount. | `40.00` | The fourth amount appears and no more than five options are allowed. |
| Change one existing amount. | `20.00` to `25.00` | The edited amount is accepted without changing the other options. |
| Remove one existing amount. | Remove `10.00` | Only the selected amount is removed. |
| Save or update the configuration and confirm the shared-configuration warning if shown. | Final amounts `25.00`, `30.00`, `40.00` | The final configuration saves once. |
| Reopen the ticket type and buyer ticket selection. | Same event | Both surfaces show the final three amounts and no removed `10.00` option. |

### SPT-766: Dashboard - Ticket Types - Increase inventory and restore buyer availability

**Description:**

Validates that increasing a sold-out ticket type's inventory persists and makes the newly available quantity selectable on the chosen sales surface.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebBoxOffice | Desktop |

**Preconditions:** The selected future ticket type has inventory `10`, ten completed sales, and shows Sold Out on the parameterized platform. The organizer can edit inventory.

**Postconditions:** Release any unpurchased basket hold. Retain the increased inventory or restore it only when doing so cannot reduce inventory below tickets sold.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Confirm the ticket type is sold out on Web Public and Web Box Office. | Inventory `10`; sold `10` | Neither sales surface allows another ticket to be selected. |
| Open the ticket type in Dashboard and increase inventory. | `10` to `15` | The new inventory is accepted and remains greater than tickets sold. |
| Save once and reopen the ticket type through **Manage Events**. | Same ticket type | Inventory `15` persists; sold count remains `10`; five are available. |
| Refresh Web Public and Web Box Office. | Same event | The ticket type is no longer Sold Out on either surface and exposes up to five available tickets. |
| Add one ticket to a basket on each surface without completing purchase. | Quantity `1` per basket, one surface at a time | Each surface can hold one newly available ticket and reports availability consistently. |
| Remove each held ticket before moving to the next surface. | Same baskets | Every temporary hold is released and availability returns. |

### SPT-768: Dashboard - Ticket Types - Preserve prior order pricing after a price change

**Description:**

Validates both sides of one price change: a completed order keeps the amount paid, while a later buyer receives the new current price. The previous `TicketTypeSaleState` parameter is removed because both observations are required in the same run.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future public ticket type costs `20.00`; one completed order for one ticket exists at `20.00`; a second purchase can be completed after the edit.

**Postconditions:** Retain both test orders for financial audit or void/refund them according to the environment's approved cleanup process.

**Tags:** dashboard, tickets, transactions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record the first completed order and its ticket price. | Order A; one ticket at `20.00` before fees/taxes | Order A shows the original paid price and total. |
| Change the ticket type price in Dashboard. | `20.00` to `25.00` | The new price is accepted. |
| Save once and reopen the ticket type. | Same ticket type | Current price `25.00` persists. |
| Reopen Order A in Transactions. | Recorded order | Its ticket line and financial total still use `20.00`; no historical amount was rewritten. |
| Complete a second one-ticket purchase. | Order B | Order B charges the current `25.00` price before fees/taxes. |
| Compare both orders and the current ticket type. | Orders A and B | Historical and current prices remain independently correct. |

### SPT-770: Dashboard - Recurring Ticket Types - Protect sold-child pricing

**Description:**

Validates sold and unsold children together because the regression is the contrast between them. The previous parameter is removed: one child has a sale, a sibling has none, and a parent price update must not corrupt the sold child's historical price.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A recurring parent has two future children and a propagated ticket type at `20.00`; Child A has one completed sale; Child B has no sales.

**Postconditions:** Retain the order for audit. Restore allowed no-sales pricing when needed.

**Tags:** dashboard, tickets, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record Child A's completed order and both child ticket prices. | Child A sold; Child B unsold; `20.00` | The baseline distinguishes the sold and unsold child. |
| Open the parent ticket type and change its price. | `20.00` to `25.00`; use the visible propagation control when required | The parent update is accepted without claiming that historical purchases changed. |
| Reopen the parent and both child ticket types. | Same series | Parent and allowed unsold-child current pricing reflect `25.00`; sold-child behavior follows its price-lock rules. |
| Reopen Child A's completed order. | Recorded order | The purchased ticket remains `20.00` with its original financial totals. |
| Open buyer selection for Child A and Child B. | Both child dates | Current selectable prices match the saved price-lock/propagation state; no child has an invalid or missing price. |

### SPT-4063: Dashboard - Ticket Types - Flip visibility to Public at the scheduled time

**Description:**

Validates the timezone-sensitive transition from Hidden or Visible to Sellers into Public visibility. Assertions are required immediately before and after the scheduled instant.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future published single or recurring event has a public ticket type; the tester can observe time in the chosen timezone and wait through a short scheduled transition.

**Postconditions:** Restore Public visibility and remove any test schedule.

**Tags:** dashboard, tickets, events

**Parameters:**

EventShape: SingleEvent, RecurringEvent
TimezoneContext: VenueTimezone, AlternateTimezone
StartingVisibility: Hidden, SellersOnly

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open advanced settings for the target ticket type. | `EventShape`; `TimezoneContext` | Visibility controls use the event's displayed timezone. |
| Select `StartingVisibility`. | Hidden or Visible to Sellers | **Schedule Visibility Flip to Public** becomes available. |
| Schedule the flip shortly in the future and record the exact displayed time and timezone. | At least two minutes ahead | The future timestamp is accepted unambiguously. |
| Save once and reopen the ticket type. | Same event | Starting visibility and scheduled timestamp persist. |
| Before the scheduled instant, refresh normal public ticket selection. | No seller link | The ticket is not publicly selectable. |
| After the scheduled instant, refresh again. | Recorded time reached | The ticket is Public and selectable without a manual Dashboard save. |
| For `RecurringEvent`, inspect one affected child. | Child occurrence | The child visibility is consistent with the recurring ticket propagation rule. |

### SPT-4384: Dashboard - Ticket Types - Save one waitlist setting

**Description:**

Validates one waitlist setting per run. This corrects the current mismatch between the Qase parameter `Configure` and the undefined step reference `@WaitlistConfiguration`.

| WaitlistSetting | Test Value |
| --- | --- |
| CardVerificationRequired | Require credit-card verification on. |
| CardVerificationNotRequired | Require credit-card verification off. |
| PurchaseLimit | Limit `2`. |
| CutoffTime | Future cutoff before the event starts. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue has waitlist/resale enabled; a future event has a sold-out or waitlist-eligible ticket type; the organizer can edit it.

**Postconditions:** Restore the recorded waitlist configuration.

**Tags:** dashboard, tickets, waitlists

**Parameters:**

WaitlistSetting: CardVerificationRequired, CardVerificationNotRequired, PurchaseLimit, CutoffTime

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the target ticket type and enable Waitlist. | Waitlist-eligible ticket | Waitlist settings become editable. |
| Apply only the value for `WaitlistSetting`. | Selected table row | The selected control displays the exact test value. |
| Save once. | None | The ticket type saves successfully. |
| Return through **Manage Events** and reopen the same ticket type. | Same event and ticket | Waitlist remains enabled and the selected value persists. |
| Reopen the waitlist customer entry surface when available. | Same ticket type | The saved requirement or limit is reflected without exposing a contradictory value. |

### SPT-4875: Dashboard - Ticket Types - Enforce one sales-window or visibility state

**Description:**

Validates one buyer-availability state per run instead of reconfiguring the same ticket through every state regardless of the selected parameter.

| TicketAvailabilityState | Setup | Expected Normal Public Access |
| --- | --- | --- |
| SalesNotStarted | Sale starts two hours in the future; Public | Not purchasable before start. |
| OnSalePublic | Current time inside sale window; Public | Visible and purchasable. |
| SalesEnded | Sale ended one hour ago; Public | Not purchasable after end. |
| Hidden | Current sale window; Hidden | Not visible. |
| SellersOnly | Current sale window; Visible to Sellers | Hidden normally; available through an authorized seller link. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** A future published event has a no-sales test ticket type; seller access exists for `SellersOnly`.

**Postconditions:** Restore the ticket type to a safe Public/current-sale state or remove it if it has no sales.

**Tags:** dashboard, tickets, events

**Parameters:**

TicketAvailabilityState: SalesNotStarted, OnSalePublic, SalesEnded, Hidden, SellersOnly

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open advanced settings for the test ticket type. | Selected event | Sale-window and visibility controls are available. |
| Apply the exact setup for `TicketAvailabilityState`. | Selected table row; event timezone | The form shows the intended dates and visibility. |
| Save once and reopen the ticket type through **Manage Events**. | Same ticket type | The selected state persists after a fresh read. |
| Open normal public ticket selection. | Same event | Availability matches the table's normal-public expectation. |
| For `SellersOnly`, open the authorized seller link. | Approved seller link | The ticket is available through seller access while remaining unavailable normally. |
| Attempt only an allowed ticket selection. | Quantity `1` when available | Available states allow selection; unavailable states expose no active purchase action. |

### SPT-3275: Dashboard - Ticket Types - Configure E-ticket delivery

**Description:** Validates E-ticket as the only delivery method, including its source-backed configurable Handling Fee. The previous claim that E-ticket cannot have a handling fee is removed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the ticket type's **Delivery & Transfers** tab. | No-sales ticket type | E-ticket, Delivery, and Will Call methods are available. |
| Select E-ticket only and set its Handling Fee. | E-ticket on; Delivery off; Will Call off; fee `1.00` | The E-ticket fee and fee method are editable. |
| Save once and reopen the tab through **Manage Events**. | Same ticket | E-ticket-only and `1.00` persist after a fresh read. |
| Add the ticket in buyer checkout. | Quantity `1` | E-ticket is the only delivery choice and its handling fee is included once as configured. |

### SPT-3276: Dashboard - Ticket Types - Configure Delivery with a shipping fee

**Description:** Validates Delivery as the only method with its Shipping & Handling Fee.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration and release the test basket.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | Delivery options are editable. |
| Select Delivery only and configure its fee. | E-ticket off; Delivery on; Will Call off; Shipping & Handling Fee `5.00` | Delivery and `5.00` are accepted. |
| Save once and reopen the same tab. | Same ticket | Delivery-only and `5.00` persist. |
| Add the ticket in buyer checkout. | Quantity `1` | Delivery is the only method, a shipping address is requested, and `5.00` is applied according to the saved fee method. |

### SPT-3277: Dashboard - Ticket Types - Configure Will Call with a handling fee

**Description:** Validates Will Call as the only delivery method with its Handling Fee.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping/delivery controls; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery configuration and release the basket.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | Delivery methods are editable. |
| Select Will Call only and configure its fee. | E-ticket off; Delivery off; Will Call on; Handling Fee `2.00` | Will Call and `2.00` are accepted. |
| Save once and reopen the tab. | Same ticket | Will Call-only and `2.00` persist. |
| Add the ticket in buyer checkout. | Quantity `1` | Will Call is the only method and `2.00` is included according to the saved fee method. |

### SPT-3278: Dashboard - Ticket Types - Offer multiple delivery methods

**Description:** Validates that E-ticket, Delivery, and Will Call can coexist and retain independent fees.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The venue allows shipping; a future no-sales ticket type is editable.

**Postconditions:** Restore the original delivery settings and release all baskets.

**Tags:** dashboard, tickets, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Delivery & Transfers** for the ticket type. | No-sales ticket | All three methods are available. |
| Enable all delivery methods and enter distinct fees. | E-ticket `1.00`; Delivery `5.00`; Will Call `2.00` | Each fee remains associated with its own method. |
| Save once and reopen the tab. | Same ticket | All methods and fees persist after a fresh read. |
| Add the ticket in buyer checkout and inspect the method selector. | Quantity `1` | All three named methods are available. |
| Select each method one at a time. | E-ticket, Delivery, Will Call | The order total uses `1.00`, `5.00`, or `2.00` for the selected method without combining unrelated fees. |
