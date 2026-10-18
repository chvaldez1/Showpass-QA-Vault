---
title: Legacy Abandoned Carts — Qase Suite Review
feature: Abandoned Carts
qase_project: SPT
qase_suite: 102
status: published-definitions
updated: 2026-10-17
tags:
  - qa
  - abandoned-carts
---

# Legacy Abandoned Carts — Qase Suite Review

**Result:** published 17 new cases, **SPT-5703–5719**, and revised 17 existing cases in [Abandoned Carts suite 102](https://app.qase.io/project/SPT?suite=102). All 34 definitions passed full-field readback verification. The suite now has 35 cases, including unchanged SPT-5126 for the newer list/detail page. No product tests or product mutations were executed; the evidence limits after the cases remain open.

**Owning screen:** Dashboard → Manage → Abandoned Carts. Reference: the legacy page at `/dashboard/financials/checkouts/`. Keep suite 102 under its existing Dashboard parent 78; no suite move, rename or creation is proposed. Ignore the preview banner.

> [!note] Generated attachments removed
> Generated snapshots, JSON exports and frozen publication copies were deleted on 2026-10-17 at the user’s request. Published case IDs, recorded results and test definitions remain in this note. Read Qase again before preparing future changes.

## Dashboard → Manage → Abandoned Carts — List, cards and controls

### SPT-4838: Dashboard - Abandoned Carts - Read the legacy abandoned-cart table

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Read the legacy abandoned-cart table

**Description:** Check the saved recipient information in the legacy table. A recipient is one scheduled or previously attempted recovery email for an expired cart. RecoveryState NotRecovered uses a recoverable cart without a paid recovery; Recovered uses a cart with a paid recovery; Unrecoverable uses an unrecoverable cart without a paid recovery; RecoveredUnavailable uses an unrecoverable cart with a paid recovery. The last two recovery flags are independent, so a Recovered label alone does not prove that another recovery is allowed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* For RecoveryState, a setup owner identifies an existing recipient and records its customer email, email status, recoverability, paid recovery state, original cart total, recovered total, open count and click count from the saved records. Keep customer email addresses out of shared evidence.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** Medium

**Tags:** dashboard, abandoned-carts

**Parameters:**

RecoveryState: NotRecovered, Recovered, Unrecoverable, RecoveredUnavailable

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Locate the recorded recipient row. |  | Customer, Email Status, Recovery Status, Amount, Recovered Amount and Actions are present; the saved email and currency amounts match the record. |
| Compare Recovery Status with RecoveryState. |  | NotRecovered shows Not Recovered; Recovered and RecoveredUnavailable show Recovered; Unrecoverable shows Unrecoverable. |
| Inspect the email badge and Opens/Clicks values. |  | The badge reflects the recorded email state, with an overdue scheduled recipient displayed Pending. Positive Opens/Clicks counts are shown; zero counts are omitted. |

### SPT-5703: Dashboard - Abandoned Carts - Show the legacy disabled-email state

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Show the legacy disabled-email state

**Description:** Open the legacy page when abandoned-cart emails are disabled. The sidebar link is hidden in this state, so a copied page address is used specifically to verify the disabled page.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The ordinary allow_abandoned_cart_emails setting is off. A setup owner privately supplies the legacy page address before execution; do not change this setting during the case.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Inspect the Dashboard Manage menu. |  | Abandoned Carts is not offered. |
| Open the supplied legacy page address. |  | The page explains that abandoned cart emails are disabled and asks the employee to talk to an administrator. |
| Inspect the page content. |  | Recipient rows, filters, send actions and summary cards are hidden. |

### SPT-5704: Dashboard - Abandoned Carts - Show an empty legacy abandoned-cart list

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Show an empty legacy abandoned-cart list

**Description:** Open an enabled organization with no visible abandoned-cart recipients. Verify the completed empty state separately from loading or a permission failure.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* A setup owner confirms that the organization has no abandoned-cart recipients visible to employees; do not delete records to prepare this state.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Allow the initial load to finish. |  | No abandoned carts found appears; no stale recipient row or Send Email action is displayed. |
| Read all five summary cards. |  | Emails Sent, Emails Opened, Carts Recovered, Recovered Amount and Recovery Rate are zero, with no invalid number or divide-by-zero result. |

### SPT-5705: Dashboard - Abandoned Carts - Check legacy recovery summary calculations

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Check legacy recovery summary calculations

**Description:** Verify all five legacy cards for a known set selected by Event. StatsScenario ZeroSent uses one scheduled, unopened and unrecovered recipient. OneRecovery uses one sent/opened recipient with two recorded opens and one paid recovery. RepeatedRecovery uses one sent/opened recipient with two recorded opens and two paid recovery orders. All recoveries belong to the same organization. Expected cards are shown below; A and B are the independently recorded paid-order totals. Legacy Recovery Rate counts paid recovery orders, so RepeatedRecovery is 200%, not a count of distinct email recipients.

| StatsScenario | Emails Sent | Emails Opened | Carts Recovered | Recovered Amount | Recovery Rate |
| --- | --- | --- | --- | --- | --- |
| ZeroSent | 0 | 0 | 0 | 0 | 0% |
| OneRecovery | 1 | 2 | 1 | A | 100% |
| RepeatedRecovery | 1 | 2 | 2 | A + B | 200% |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* For StatsScenario, the setup owner identifies an event whose visible recipient set exactly matches the Description table, and provides its name, the source recipients, open counts and paid-order totals. No sending or purchasing is performed by this case.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

StatsScenario: ZeroSent, OneRecovery, RepeatedRecovery

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Select the prepared event in Event. |  | Only the recorded recipient set is included. |
| Compare all five cards with the StatsScenario row. | Use independently recorded paid-order totals A/B. | Every count, currency amount and percentage matches the selected scenario. |
| Check the recipient rows against the paid recovery records. |  | Each recipient appears once; multiple paid recoveries are summed into its Recovered Amount rather than duplicating its row. |

### SPT-5706: Dashboard - Abandoned Carts - Filter legacy carts by event

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Filter legacy carts by event

**Description:** Search for and select an event. EventSelection Single selects a single-day event, Recurring selects one dated occurrence, Attraction selects the relevant attraction event/slot, and NoRecipients selects an organization event without visible recipients. Use names and dates to distinguish similarly named occurrences.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* For EventSelection, a setup owner records the event name/date/timezone, expected recipient rows and all five expected card totals. Also record at least one row belonging only to a different event. Include enough matching events for Load More to appear in the Event picker; identify the intended event beyond the first result page.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

EventSelection: Single, Recurring, Attraction, NoRecipients

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Search Event using a name that matches none of the organization’s events. |  | After searching finishes, No events found appears; the current cart filters are unchanged. |
| Replace the search with the recorded matching name, select Load More, then select the matching dated event. |  | More results become available without selecting an event accidentally; the recorded event name/date/timezone is selected and Ticket Type becomes available. |
| Wait for the rows and cards to finish refreshing. |  | Only recipients whose abandoned cart contains that event appear once, and all cards match the same filtered scope. NoRecipients shows No abandoned carts found and zero cards. |
| Inspect the excluded other-event recipient. |  | A cart containing only the other event is absent. |

### SPT-5707: Dashboard - Abandoned Carts - Filter legacy carts by ticket type

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Filter legacy carts by ticket type

**Description:** Within a selected event, filter on Ticket Type. The list must contain each matching recipient once even when its abandoned cart has several matching item groups.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Choose an event with two ticket types and known recipients for each. Include a cart containing multiple matching ticket groups. Record the expected matching recipient list and card totals for one selected ticket type.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Select the prepared event, search its recorded type by name under Ticket Type, then select it. |  | The selected ticket type belongs to that event. |
| Compare the completed results and cards with the recorded ticket-type scope. |  | Only matching recipients appear once and the cards use the same selected type. |
| Clear the Ticket Type selection while leaving Event selected. |  | All recipients for that event return; recipients belonging only to other events remain absent. |

### SPT-5708: Dashboard - Abandoned Carts - Clear the old ticket filter when changing event

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Clear the old ticket filter when changing event

**Description:** Change Event after selecting a Ticket Type. The previous event’s ticket-type restriction must not silently hide the new event’s recipients.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Choose two events with different ticket types and visible recipients. Record each event’s expected recipient set and card totals.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Select the first event and one of its Ticket Types. |  | Only that event/type’s recipients are shown. |
| Replace Event with the prepared second event. |  | The old Ticket Type selection is cleared and the new event’s ticket choices are offered. |
| Compare the refreshed rows and cards. |  | They match the second event without applying the previous event’s ticket type. |

### SPT-5709: Dashboard - Abandoned Carts - Filter legacy carts by email status

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Filter legacy carts by email status

**Description:** Apply one EmailStatus choice at a time. EmailStatus NotSent maps to Not Sent; all other parameter values match their visible labels: Sent, Scheduled, Delayed, Pending, Delivered, Bounced, Opened and Rejected. Use recoverable Not Sent recipients because suppressed unrecoverable Not Sent records are excluded from this page. The selected filter matches the saved email status; an overdue scheduled record can be displayed as Pending by the legacy page.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* For EmailStatus, a setup owner records matching recipients, an excluded recipient with a different saved status and the expected five card totals. Scheduled examples have a future scheduled send time; do not send or alter emails to change state during this case.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

EmailStatus: NotSent, Sent, Scheduled, Delayed, Pending, Delivered, Bounced, Opened, Rejected

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Open Email Status, search for the mapped EmailStatus label and select it. |  | The selected status is shown. |
| Compare the refreshed rows and cards with the saved-status records. |  | Only the expected recipients appear once and all five cards match that filtered set. |
| Clear Email Status. |  | The unfiltered recipient set and card totals return. |

### SPT-5710: Dashboard - Abandoned Carts - Filter legacy carts by creation date

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Filter legacy carts by creation date

**Description:** Date Range Start and Date Range End filter when the recipient record was created, not when its email was sent or event starts. Dates are interpreted in the organization timezone. DateRange StartOnly fills only the recorded start; EndOnly fills only the end; Both fills both. End is not earlier than Start. Compare expected included/excluded recipients prepared from those creation times.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Record the organization timezone and computer timezone. A setup owner provides start/end calendar times with offsets, matching recipient records, an older/newer excluded record and the expected five card totals for DateRange. Select times away from an ambiguous daylight-saving transition for this base case. Include records exactly at each selected boundary and immediately outside it; record seconds/offsets so rounded display times do not become the expected result.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

DateRange: StartOnly, EndOnly, Both

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Set Date Range Start and Date Range End as mapped to DateRange. | Leave the unused bound blank for StartOnly or EndOnly. | The selected calendar times appear; no unsupported earlier End is selected. |
| Compare rows and cards after refresh. |  | Records exactly on a selected boundary are included; records outside it are excluded, and all five cards match the included records. |
| Compare a recorded recipient whose send date differs from its creation date. |  | It is included or excluded by its creation time, not the email send date. |

### SPT-5711: Dashboard - Abandoned Carts - Show only recovered legacy carts

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Show only recovered legacy carts

**Description:** Toggle Show Only Recovered Carts and verify distinct rows plus filtered cards. A recovered cart has a paid order reached from its recovery link in this organization; merely opening the link is insufficient.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Record an unrecovered recipient and a recovered recipient with two paid recovery orders in the same organization. Have the expected filtered card totals and both recorded order totals.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Turn on Show Only Recovered Carts. |  | Only recipients with paid recoveries in the selected organization remain; the recipient with two paid recoveries still has one row. |
| Compare Recovered Amount and all five cards with the prepared recovered-only totals. |  | The row sums its two paid orders; cards refresh for the recovered-only scope rather than retaining unfiltered totals. |
| Turn off Show Only Recovered Carts. |  | The original recovered and unrecovered rows and unfiltered card totals return. |

### SPT-5712: Dashboard - Abandoned Carts - Clear every legacy cart filter

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Clear every legacy cart filter

**Description:** Apply the event, dependent ticket type, email status, date bounds and recovered-only filters together, then clear them with Clear Filters. This verifies the complete reset rather than clearing only one dropdown.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Record the unfiltered recipient set, five cards and page count. Choose a known recipient that supports one event/type/status/date combination and has a paid recovery. Have an unfiltered second page available.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Apply Event, Ticket Type, Email Status, both date bounds and Show Only Recovered Carts for the prepared record. |  | The filter selections are visible and Clear Filters is available. |
| Select Clear Filters. |  | Event, Email Status and both dates clear; recovered-only is off; Ticket Type is hidden and Clear Filters disappears. |
| Compare the completed table, cards and page indicator with the baseline. |  | The full original scope returns on Page 1, with the original totals and page count. |

### SPT-5713: Dashboard - Abandoned Carts - Page through legacy abandoned carts

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Page through legacy abandoned carts

**Description:** Use the previous/next controls on a list containing more than twenty recipients. The legacy page uses ten rows per page, rather than infinite scrolling.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Use a known set of at least 21 visible recipients. The setup owner provides the expected pages with distinguishable customer/amount/status combinations; do not assume customer email alone is a unique recipient ID. No scheduled email or recovery state changes during this check. Identify an Event with fewer than ten matching rows for the final step.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Inspect the previous-page control on Page 1. |  | It cannot move to a page before Page 1. |
| Use » to reach the second and third pages. |  | The page indicator advances and each page contains its expected rows without omissions or repeats. |
| Continue to the last page and inspect the next-page control. |  | The final page contains only the remaining records and cannot advance beyond its displayed page count. |
| Use « to return to Page 1. |  | The initial page and its rows return; the five cards remain totals for the complete active filter scope. |
| From a later page, select a prepared Event with fewer than ten matching rows. |  | The results restart on Page 1 with only the matching recipients and matching card totals. |

### SPT-5714: Dashboard - Abandoned Carts - Offer legacy Send Email only for eligible rows

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Offer legacy Send Email only for eligible rows

**Description:** Inspect the action without sending. SendState FutureRecoverable uses a future Scheduled recipient that remains recoverable. RecoveredStillRecoverable uses the same send eligibility but already has a paid recovery; the action is still offered. FutureUnrecoverable has a future Scheduled time but is no longer recoverable. Overdue has a past scheduled time. Pending, Sent, Delivered and Opened use those saved email states. Only the first two runs offer Send Email.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* For SendState, the setup owner identifies a saved recipient with the stated email/recovery/schedule state. Do not click Send Email. FutureUnrecoverable requires a genuine saved matching record; if none exists, mark that run Blocked and do not fabricate it or change read-only fields.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

SendState: FutureRecoverable, RecoveredStillRecoverable, FutureUnrecoverable, Overdue, Pending, Sent, Delivered, Opened

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Locate the recorded SendState recipient. |  | The row matches its prepared email and recovery state; an overdue scheduled row may display Pending. |
| Inspect Actions without submitting. |  | Send Email is offered for FutureRecoverable and RecoveredStillRecoverable, and absent for the other mapped states. |

### SPT-5715: Dashboard - Abandoned Carts - Send one recovery email from the legacy page

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Send one recovery email from the legacy page

**Description:** Use the visible Send Email action for one eligible recipient. Check the temporary Pending state separately from the actual delivered recovery email; the success notice alone does not prove delivery.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Use an approved test customer mailbox and an existing recoverable Scheduled recipient with a future send time. Its single public paid event starts more than five hours after sending, has public available tickets, and sales remain open; the customer has not opted out.
* The setup owner approves one manual email to that controlled mailbox and provides its scheduled send time, original cart content, expected email and normal worker delivery window. Do not use a real customer recipient.

**Postconditions:**

* Retain the approved email/recipient reference for verification; do not attempt to unsend it. No purchase is performed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Find the prepared recipient and select Send Email once. |  | The notice says the email is currently being sent; the row moves to Pending and the action is no longer offered while pending. |
| Inspect the controlled mailbox within the prepared delivery window. |  | The customer receives the matching recovery email with the correct event/cart information and a Recover your cart link. |
| Reload the legacy page and locate that recipient. |  | Its eventual email status agrees with accepted delivery and no second manual send was needed. |

### SPT-5716: Dashboard - Abandoned Carts - Deny legacy cart access without Manage Transactions

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Deny legacy cart access without Manage Transactions

**Description:** Verify an employee without the required permission cannot view customer recovery-email data. The legacy page does not provide a recipient detail screen, so this case checks the actual list route and sidebar only.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* Use an employee who belongs to the selected organization but lacks Manage Transactions and has no unrestricted administrator override. The organization has abandoned-cart emails enabled and visible recipients.
* A permitted employee privately supplies the legacy page address; direct access is intentionally tested because the menu entry should be unavailable.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the restricted employee, inspect Dashboard → Manage. |  | Abandoned Carts is unavailable. |
| Open the supplied legacy page address. |  | Access is refused without revealing recipient emails, cards or send actions. |
| Return to Dashboard. |  | The employee can leave the denied page; no email is sent. |

### SPT-5717: Dashboard - Abandoned Carts - Keep legacy cart data separate between organizations

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Keep legacy cart data separate between organizations

**Description:** Switch between two organizations and reopen the legacy page. Each must show only its own recipient rows, currency amounts, cards and event choices.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Transactions**, with required authentication completed. Do not use an unrestricted administrator override for permission checks.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new Abandoned Carts preview. Keep the legacy page throughout execution.
* The organization’s ordinary allow_abandoned_cart_emails setting is on.
* Start in the CAD organization. The employee has Manage Transactions in two unrelated organizations, one CAD and one USD, both using legacy Abandoned Carts with emails enabled. Record each organization’s expected recipient set, event choices, five cards and currency; each paid recovery belongs to that same organization.

**Postconditions:**

* Clear any page filters and return to the starting organization. No cart, order or email is changed.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Manage → Abandoned Carts. |  | The legacy Abandoned Carts page opens for the selected organization. |
| Select the prepared USD organization in the organization menu and open Manage → Abandoned Carts. |  | Only its recipients and event choices appear; amounts use USD and cards match its baseline. |
| Apply an Event filter belonging to the USD organization. |  | Rows and cards stay within that organization; CAD recipient data is absent. |
| Select the original CAD organization and reopen Manage → Abandoned Carts. |  | Its unfiltered CAD baseline returns without the other organization’s rows or filter selection. |

## Dashboard → Manage → Abandoned Carts — Email and recovery outcomes

### SPT-924: Dashboard - Abandoned Carts - Send an eligible single-event recovery email

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Send an eligible single-event recovery email

**Description:** Abandon one positive-price general-admission event cart and verify its scheduled recipient, delivered recovery email and legacy email metrics. Run both CustomerState values. Receiving an email is separate from completing recovery purchase.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new preview. Organizer checks use Dashboard → Manage → Abandoned Carts.
* Organization abandoned-cart emails are enabled. Use a public paid event starting more than five hours after the planned send, with public available tickets and sales open; an authenticated customer has Email abandoned carts on.
* Use an approved test customer mailbox, owned event and sandbox payment where needed. Record the normal expiry/sending processing deadline, baseline recipients and five legacy cards. Keep customer/credential data out of shared evidence.
* CustomerState Guest starts signed out and supplies the approved name/email/phone using Continue as Guest; Authenticated signs in as the approved customer before adding tickets.
* Record the selected event/type/quantity, original cart total and approved mailbox. Use the customer’s normal expiry rather than editing basket status or launching a production task.

**Postconditions:**

* Retain the approved email/order references and release unpaid test inventory through its normal expiry. Restore setup-only settings; do not delete shared history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

CustomerState: Guest, Authenticated

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, add the selected event tickets and continue to checkout with contact details. |  | One event and positive-price ticket items are associated with the approved customer. |
| Leave checkout without paying; allow normal cart expiry and expiry processing. |  | The cart expires and one recoverable Scheduled recipient is created for it. |
| As the organizer, locate that recipient in the legacy list. |  | Customer email, cart amount and not-recovered state match the recorded cart. |
| Observe the controlled mailbox after its saved scheduled time and normal sending processing. |  | The matching event/cart recovery email arrives with a Recover your cart link. |
| Reload the legacy list and cards. |  | The recipient’s email status and Emails Sent metric reflect that send; no purchase recovery is claimed from email delivery alone. |

### SPT-925: Dashboard - Abandoned Carts - Record a completed single-event recovery purchase

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Record a completed single-event recovery purchase

**Description:** Open a general-admission recovery email and complete one approved purchase. Run both CustomerState values. Carts Recovered and Recovered Amount must follow the paid recovery order rather than merely opening the link.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new preview. Organizer checks use Dashboard → Manage → Abandoned Carts.
* Organization abandoned-cart emails are enabled. Use a public paid event starting more than five hours after the planned send, with public available tickets and sales open; an authenticated customer has Email abandoned carts on.
* Use an approved test customer mailbox, owned event and sandbox payment where needed. Record the normal expiry/sending processing deadline, baseline recipients and five legacy cards. Keep customer/credential data out of shared evidence.
* CustomerState Guest starts signed out and supplies the approved name/email/phone using Continue as Guest; Authenticated signs in as the approved customer before adding tickets.
* Have an existing approved single-event recovery email, its original recipient and currently available ticket types. Record the baseline five cards and the selected sandbox payment method; no other activity changes that scope during execution.

**Postconditions:**

* Retain the approved email/order references and release unpaid test inventory through its normal expiry. Restore setup-only settings; do not delete shared history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

CustomerState: Guest, Authenticated

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, open the approved email and select Recover your cart. |  | The correct eligible event items are restored for that customer. |
| Complete the selected sandbox purchase. |  | One successful payment, one paid order and its usable tickets are recorded for the recovered selection. |
| As the organizer, locate the original recipient in the legacy list. |  | It shows Recovered and the recorded paid order total in Recovered Amount. |
| Compare the five cards with the baseline and recorded order. |  | Carts Recovered increases by one, Recovered Amount increases by the actual paid total and legacy Recovery Rate follows paid recoveries divided by sent emails; unrelated purchases are excluded from the intended scope. |

### SPT-926: Dashboard - Abandoned Carts - Send a recovery email for one assigned-seating event

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Send a recovery email for one assigned-seating event

**Description:** Abandon tickets from one assigned-seating event, where customers choose seats. Verify its scheduled recipient, actual email and legacy analytics. Assigned seating does not by itself exclude a single-event cart. The event’s remaining available seats need not be the exact abandoned seats.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* The organization’s ordinary allow_abandoned_cart_emails setting is on. Use public paid tickets with sales open, availability remaining and event start more than five hours after the intended send; for authenticated customers, Email abandoned carts is on.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* Choose one assigned-seating event with public paid seats and more than five hours of eligibility after the planned send. Use an approved identified customer and record the seat/ticket selection and cart total.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** Medium

**Tags:** dashboard, abandoned-carts, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the customer, open the event, choose available seats and continue to checkout. |  | Only the selected event’s paid tickets appear in the cart. |
| Complete the customer contact details and record the cart. |  | The cart is associated with the approved customer mailbox. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| As the organizer, open Manage → Abandoned Carts and locate the recipient. |  | One recoverable recipient for the single seated event shows the original cart amount and not-recovered state. |
| After the recorded scheduled send and normal processing, inspect the mailbox and refresh the legacy page. |  | The matching recovery email arrives with a usable event recovery link; email status and sent metrics reflect that recipient. |

### SPT-927: Dashboard - Abandoned Carts - Complete an assigned-seating recovery purchase

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Complete an assigned-seating recovery purchase

**Description:** Follow an existing assigned-seating recovery email, choose currently available seats and complete one approved purchase. Verify seat ownership and the paid recovery in legacy analytics. Restoring access to seat selection does not guarantee that the original abandoned seat is still available.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* The organization’s ordinary allow_abandoned_cart_emails setting is on. Use public paid tickets with sales open, availability remaining and event start more than five hours after the intended send; for authenticated customers, Email abandoned carts is on.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* Have an existing approved single-event assigned-seating recovery email and its original cart/recipient. The selected event still has public paid seats. Record the chosen current seats and approved sandbox payment method before paying.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** Medium

**Tags:** dashboard, abandoned-carts, assigned-seating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the customer, open the approved email and select Recover your cart. |  | The correct assigned-seating event opens for recovery. |
| Choose the recorded currently available seats and complete the approved purchase. |  | One paid order contains those seats and usable tickets; unavailable seats are not assigned. |
| As the organizer, open Manage → Abandoned Carts and find the original recipient. |  | Its status is Recovered and Recovered Amount includes the recorded paid order in this organization. |
| Compare the five cards with the recorded before/after recovery values. |  | Carts Recovered, Recovered Amount and legacy Recovery Rate change by the corresponding paid recovery without counting an unrelated purchase. |

### SPT-929: Dashboard - Abandoned Carts - Apply the email rule for carts spanning multiple events

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Apply the email rule for carts spanning multiple events

**Description:** SingleOrRecurringEvent uses two different general-admission events/dated occurrences and can receive a recovery email when both remain eligible. AssignedSeating uses two different assigned-seating events; MixedSeating uses one assigned-seating event plus one general-admission event. Both seating scenarios must not receive one. A single event containing multiple ticket types is not a multi-event cart. Run each CustomerState with each EventType: six runs.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* The organization’s ordinary allow_abandoned_cart_emails setting is on. Use public paid tickets with sales open, availability remaining and event start more than five hours after the intended send; for authenticated customers, Email abandoned carts is on.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* CustomerState Guest starts signed out and uses Continue as Guest with the approved name/email/phone; Authenticated signs in as the approved customer before adding tickets. Do not use the organizer as the customer.
* Choose two distinct public paid events or dated occurrences, both still more than five hours away after scheduled sending. AssignedSeating has two seat maps; MixedSeating has exactly one; SingleOrRecurringEvent has none. A support employee records the two event IDs and the resulting basket membership privately.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts, assigned-seating

**Parameters:**

CustomerState: Guest, Authenticated
EventType: SingleOrRecurringEvent, AssignedSeating, MixedSeating

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, add tickets from both prepared events to the same cart. | Choose quantities/seats using each event’s normal purchase flow. | The cart contains two distinct events and the approved customer contact details. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| Compare the customer’s new recipient records and legacy list after normal processing. |  | SingleOrRecurringEvent has its eligible recipient; AssignedSeating and MixedSeating have no newly scheduled recipient for this cart. |
| Observe the controlled mailbox through the recorded sending deadline. |  | SingleOrRecurringEvent receives the matching recovery email; AssignedSeating and MixedSeating receive no email for this cart. |

### SPT-3885: Dashboard - Abandoned Carts - Restore the cart from a recovery email

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Restore the cart from a recovery email

**Description:** Use Recover your cart to restore the recorded abandoned selection. CustomerState Guest uses the controlled signed-out customer session; Authenticated uses the approved signed-in customer. CartContents OneTicketType restores one selected type; MultipleTicketTypes restores all recorded eligible types from one event. Start with a different, unpaid cart selection to prove recovery replaces rather than stacks that selection. Do not complete payment in this case.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The organization’s ordinary allow_abandoned_cart_emails setting is on. Use public paid tickets with sales open, availability remaining and event start more than five hours after the intended send; for authenticated customers, Email abandoned carts is on.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* CustomerState Guest starts signed out and uses Continue as Guest with the approved name/email/phone; Authenticated signs in as the approved customer before adding tickets. Do not use the organizer as the customer.
* Have an approved recovery email for the selected CartContents and record all original types/quantities. Keep these items publicly available for this successful restoration run. Prepare a different unpaid cart selection in the same customer session.

**Postconditions:**

* Tickets or events that become sold out, hidden or cancelled must not be restored as purchasable items; preserve this existing restriction when checking a changed selection.
* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

CustomerState: Guest, Authenticated
CartContents: OneTicketType, MultipleTicketTypes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, open the approved recovery email. |  | The email shows the recorded event tickets, quantities and original cart total, with a Recover your cart action. |
| Select Recover your cart. |  | Checkout opens with the recorded recoverable types and quantities for the correct event. |
| Compare the restored selection with both the abandoned cart and the previous unpaid selection. |  | The restored items are not duplicated or added on top of the previous unrelated selection. |
| Leave without paying. |  | No paid order or recovered-purchase amount is created merely by opening the link. |

### SPT-3891: Dashboard - Abandoned Carts - Use remaining attraction slots when scheduling recovery

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Use remaining attraction slots when scheduling recovery

**Description:** An attraction offers configured events or dated slots under one offering. Add tickets from a near-term slot, then evaluate another configured slot beyond the five-hour send buffer. AttractionInventoryScenario AllFutureSlotsPublicAvailable keeps a public available future slot; SecondarySlotSellerOnly makes the only future slot seller-only; SecondarySlotHiddenButInitiallyPublic hides that only future slot; SecondarySlotSoldOut sells out that only future slot; MixedActiveAndSoldOut has one public available future slot plus a sold-out slot. Only AllFutureSlotsPublicAvailable and MixedActiveAndSoldOut qualify. Run both CustomerState values for each scenario: ten runs.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* CustomerState Guest starts signed out and uses Continue as Guest with the approved name/email/phone; Authenticated signs in as the approved customer before adding tickets. Do not use the organizer as the customer.
* Abandoned-cart email preferences are enabled for the organization and authenticated customer. Prepare the attraction configuration with the mapped slots; the initially selected slot is less than five hours away, so only an eligible future configured slot can qualify it. Record all event times/timezones and initial visibility/inventory.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

CustomerState: Guest, Authenticated
AttractionInventoryScenario: AllFutureSlotsPublicAvailable, SecondarySlotSellerOnly, SecondarySlotHiddenButInitiallyPublic, SecondarySlotSoldOut, MixedActiveAndSoldOut

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, add the selected attraction slot’s paid tickets and supply customer contact details. |  | The attraction cart and approved mailbox are recorded. |
| Have the setup owner apply the mapped future-slot state before normal cart expiry. | Use the AttractionInventoryScenario mapping in Description. | The attraction’s configured slots match the selected state. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| Check recipient scheduling and the controlled mailbox through the recorded deadline. |  | The two qualifying scenarios create/send the recovery email with the matching attraction/cart information; the other scenarios create no eligible recovery send. |

### SPT-3892: Dashboard - Abandoned Carts - Check event and ticket eligibility before scheduling

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Check event and ticket eligibility before scheduling

**Description:** CustomerState is Guest/Authenticated. CartContents OneActiveTicketType adds one paid type; MultipleActiveTicketTypes adds two. EventDateState FutureAvailable keeps the event public/active and beyond the five-hour buffer; FutureSoldOut has no inventory left; WithinFiveHours starts inside that buffer; Past has ended; Cancelled is cancelled; Draft is unpublished. TicketTypeState PublicAvailable leaves the original types public; HiddenButInitiallyPublic hides the original cart types after adding them while retaining another public available type on the event. Only FutureAvailable qualifies under this setup, including its HiddenButInitiallyPublic run: current scheduling checks that the event has a public available type, not that every abandoned type remains public. This is scheduling proof, not permission to purchase a hidden item.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* CustomerState Guest starts signed out and uses Continue as Guest with the approved name/email/phone; Authenticated signs in as the approved customer before adding tickets. Do not use the organizer as the customer.
* Organization and authenticated customer abandoned-cart preferences are enabled. Start with an owned future public event and record ticket types, prices and inventory. The setup owner can apply and restore the EventDateState and TicketTypeState after the paid cart is created; no other customers use these records.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

CustomerState: Guest, Authenticated
CartContents: OneActiveTicketType, MultipleActiveTicketTypes
EventDateState: FutureAvailable, FutureSoldOut, WithinFiveHours, Past, Cancelled, Draft
TicketTypeState: PublicAvailable, HiddenButInitiallyPublic

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, add the CartContents selection and supply customer contact details. |  | The pending cart contains the prepared positive-price event items. |
| Have the setup owner apply EventDateState and TicketTypeState before cart expiry. | Use the independent mappings in Description. | The recorded event, inventory and visibility states match the selected run. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| Inspect the matching recipient and controlled mailbox after normal scheduling/sending processing. |  | FutureAvailable is scheduled and receives the matching email; the other EventDateState values do not produce an eligible send. |

### SPT-3893: Dashboard - Abandoned Carts - Keep customer identity when signing in during checkout

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Keep customer identity when signing in during checkout

**Description:** Run LoginStage BeforeItems, AfterItems and AtCheckout separately. They correspond to signing in before adding tickets, after adding tickets but before checkout, and at the checkout sign-in stage. The basket record must belong to the customer’s name/email; the legacy table itself displays Customer email and does not have a separate customer-profile link.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* The organization’s ordinary allow_abandoned_cart_emails setting is on. Use public paid tickets with sales open, availability remaining and event start more than five hours after the intended send; for authenticated customers, Email abandoned carts is on.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* Use a registered approved customer, initially signed out, and record their name/email privately. Have a support employee able to read that customer’s basket record under Admin → Tickets → Ticket baskets.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

LoginStage: BeforeItems, AfterItems, AtCheckout

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public event while signed out. |  | The event offers its normal ticket purchase flow. |
| Sign in and add one paid ticket using the LoginStage sequence. | BeforeItems: sign in first; AfterItems: sign in after adding; AtCheckout: sign in when checkout requests it. | The chosen sequence completes under the approved customer account without becoming the organizer’s cart. |
| Open checkout and have support locate the matching current basket record. |  | Its customer, name and email match the signed-in customer. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| As the organizer, locate the resulting recipient in legacy Abandoned Carts. |  | The recipient is associated with that basket/customer email rather than an unrelated profile. |

### SPT-3894: Dashboard - Abandoned Carts - Avoid another recovery email after a recovered cart expires

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Avoid another recovery email after a recovered cart expires

**Description:** Open a recovery email, modify the restored selection and let that new cart expire without paying. It remains a recovery-link cart and must not create another abandoned-cart email cycle.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* The organization’s ordinary allow_abandoned_cart_emails setting is on. Use public paid tickets with sales open, availability remaining and event start more than five hours after the intended send; for authenticated customers, Email abandoned carts is on.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* Have an existing approved recovery email and record its recipient/cart references and current counts. Original items remain available; use a customer session with permission to modify its selection. A support employee can compare the new basket’s recovery-link association and recipient records.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the email and select Recover your cart. |  | The original eligible selection is restored without stacking unrelated items. |
| Change one quantity while keeping a positive-price selection. |  | The new customer cart reflects the edit and retains its recovery-link association. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| Compare new recipient records and the legacy list with the recorded baseline. |  | No additional recipient or scheduled abandoned-cart email is created for the recovery-link cart. |
| Observe the controlled mailbox through the normal processing deadline. |  | No new abandoned-cart email cycle is delivered for that expired recovery cart. |

### SPT-3895: Dashboard - Abandoned Carts - Skip recovery emails when the cart contains a free item

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Skip recovery emails when the cart contains a free item

**Description:** CartValue FreeOnly contains one complimentary/free ticket and has a zero total. MixedPaidAndFree contains that free ticket plus one paid ticket in the same cart. Both contain a zero-price item group and must not schedule an abandoned-cart email. CustomerState Guest remains signed out and supplies approved contact details; Authenticated signs in as the approved customer. Run each CustomerState with each CartValue: four runs.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* CustomerState Guest starts signed out and uses Continue as Guest with the approved name/email/phone; Authenticated signs in as the approved customer before adding tickets. Do not use the organizer as the customer.
* Organization and authenticated customer preferences are enabled. Use an owned event with one complimentary type and one paid public type; record both prices and the original inventory.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

CustomerState: Guest, Authenticated
CartValue: FreeOnly, MixedPaidAndFree

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, add the CartValue selection and continue to checkout. | FreeOnly: one free ticket. MixedPaidAndFree: one free ticket plus one paid ticket. | Contact details identify the approved customer; the cart is zero total for FreeOnly and positive total for MixedPaidAndFree. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| Compare the matching recipient records and legacy page after normal expiry processing. |  | No abandoned-cart recipient is scheduled for the cart containing a free item, including MixedPaidAndFree with a positive total. |
| Observe the controlled mailbox through the recorded sending deadline. |  | No abandoned-cart email for that cart arrives. |

### SPT-3896: Dashboard - Abandoned Carts - Respect organization and customer recovery-email preferences

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Respect organization and customer recovery-email preferences

**Description:** Preference OrganizationOff disables the ordinary Allow abandoned cart emails setting for the organization; CustomerOptOut leaves that organization setting on but disables Email abandoned carts for the registered customer. In either run, a newly expired otherwise eligible cart must not schedule an email.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* Use an approved registered customer and an owned public paid event beyond the send buffer. The setup owner records original organization/customer preferences and applies Preference before the cart expires. A support employee can read the customer’s recipient records even when the page is disabled.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

Preference: OrganizationOff, CustomerOptOut

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the customer, add the paid event ticket and complete contact details without purchasing. |  | The otherwise eligible cart belongs to the approved customer. |
| Leave checkout without buying and wait for the cart’s displayed expiry and normal expiry processing. |  | The selected cart expires through its normal flow; no manual status edit substitutes for expiry processing. |
| Compare recipient records after the normal processing window. |  | No new eligible recovery send is scheduled. OrganizationOff also presents the legacy disabled-page message. |
| Inspect the controlled mailbox through the recorded deadline. |  | No abandoned-cart email for that cart is delivered. |

### SPT-3897: Dashboard - Abandoned Carts - Recheck eligibility when a scheduled email becomes due

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Recheck eligibility when a scheduled email becomes due

**Description:** Start with an eligible Scheduled recipient, then apply Change before its recorded send time. None leaves it eligible. OrganizationOff disables organization email; CustomerOptOut disables the registered customer preference; TooSoon moves event start within five hours; EventDraft/EventArchived make it non-public/inactive; TicketHidden/TicketSellerOnly change the only available public type; SoldOut removes available inventory; SalesEnded ends all ticket sales and requires normal recipient invalidation to finish before sending. Only None sends.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* Use a registered approved customer and a recoverable Scheduled recipient for one otherwise eligible event. Record its scheduled time and mailbox baseline. Apply Change well before the send time; for SalesEnded, the setup owner verifies the regular invalidation cycle completes before that deadline. The setup owner records and restores every edited value.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

Change: None, OrganizationOff, CustomerOptOut, TooSoon, EventDraft, EventArchived, TicketHidden, TicketSellerOnly, SoldOut, SalesEnded

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the legacy page and locate the Scheduled recipient. |  | The recorded customer, event/cart and future scheduled time match. |
| Have the setup owner apply Change without manually sending the email. | Use the Change mapping in Description. | The selected eligibility condition is changed before the normal due time. |
| Wait for the recorded due time and normal scheduled-send/invalidation processing. |  | None remains eligible for delivery; changed blocking scenarios are not sent as eligible recovery emails. |
| Inspect the controlled mailbox and independently recorded email/recipient outcome. |  | None receives the matching recovery email; the blocking scenarios do not. A Pending badge alone is not delivery proof. |

### SPT-3898: Dashboard - Abandoned Carts - Send an approved recovery email through the API

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Send an approved recovery email through the API

**Description:** An authorized support employee sends one approved recoverable recipient and verifies the accepted request separately from actual delivery. The send endpoint is POST /api/venue/{organizationId}/emails/commercial/abandoned-cart/{recipientId}/send/. Obtain both IDs from the same organization’s authorized recipient records; do not guess an expired basket ID or paste a SQL query into the manual flow.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* The organization’s ordinary allow_abandoned_cart_emails setting is on. Use public paid tickets with sales open, availability remaining and event start more than five hours after the intended send; for authenticated customers, Email abandoned carts is on.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* Have an approved authenticated API client and a single existing recoverable recipient with a future Scheduled time and controlled mailbox. Support provides its organization ID, recipient ID, cart details and expected delivery window privately. Keep credentials out of the case evidence.

**Postconditions:**

* Retain the approved request/email references. Do not repeat the request merely because delivery is delayed; determine its original outcome first.

**Priority:** High

**Tags:** dashboard, abandoned-carts, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the approved API client, select the prepared organization and recipient send endpoint. |  | The request targets the recorded recipient in the selected organization. |
| Submit its POST request once. | POST to the recipient send endpoint; no arbitrary customer fields. | The endpoint accepts the send request with HTTP200 and an empty JSON object. |
| Inspect the controlled mailbox within the approved delivery window. |  | The matching recovery email is delivered with the correct event/cart and recovery link. |
| Read the recorded recipient again through the authorized client or legacy page. |  | Its eventual send status agrees with the delivery result; request acceptance alone was not recorded as delivery. |

### SPT-4749: Dashboard - Abandoned Carts - Release a Box Office hold without a recovery email

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Release a Box Office hold without a recovery email

**Description:** A hold reserves tickets for a customer without completing a sale. Releasing that hold returns its inventory but must not schedule an abandoned-cart recovery email. Run both Platform values: WebBoxOffice and Electron (Showpass desktop app).

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* Organization-scoped enable_abandoned_carts_nextjs_embed is off and the employee has not selected the new preview. Use Dashboard → Manage → Abandoned Carts for organizer checks.
* Use owned events and approved customer mailboxes reserved for these checks; any email sends and sandbox payments must be approved for those recipients. Record starting inventory, original event/settings values and the normal expiry/sending processing deadline. Do not change shared customer events.
* The selling employee also has Use Box Office and permission to create/release the prepared hold. Organization abandoned-cart emails are enabled. Use an owned event with known available inventory, an approved controlled customer mailbox and no existing hold on that selection.

**Postconditions:**

* Restore setup-only event, visibility or preference changes and verify inventory is released or owned by the recorded paid order. Retain the approved email/order references; do not delete shared financial or email history.

**Priority:** Medium

**Tags:** dashboard, abandoned-carts, holds

**Parameters:**

Platform: WebBoxOffice, Electron

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Box Office on Platform, select the event and add the prepared tickets. |  | The basket shows the recorded customer selection and amount. |
| Choose Hold, select the approved customer and complete the hold. |  | The recorded tickets are reserved and the hold can be found in Box Office’s hold list. |
| Open that hold and select Release; complete its displayed confirmation. |  | The hold is released and the exact ticket inventory is available again. |
| Have support compare this hold basket’s recipient records and the controlled mailbox after normal expiry/email processing. |  | No abandoned-cart recipient or recovery email is created for the released hold. |

### SPT-4839: Dashboard - Abandoned Carts - Open the recovery link from the customer push notification

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Open the recovery link from the customer push notification

**Description:** After an eligible email is actually sent to a registered customer, verify its abandoned-cart push notification on that customer’s most recent push-capable device and open the recovery action. Verify receipt on the physical device rather than relying on a queued-notification record.

| Platform | View |
| --- | --- |
| React Native Public | Mobile |
| WebPublic | Mobile |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new preview. Organizer checks use Dashboard → Manage → Abandoned Carts.
* Organization abandoned-cart emails are enabled. Use a public paid event starting more than five hours after the planned send, with public available tickets and sales open; an authenticated customer has Email abandoned carts on.
* Use an approved test customer mailbox, owned event and sandbox payment where needed. Record the normal expiry/sending processing deadline, baseline recipients and five legacy cards. Keep customer/credential data out of shared evidence.
* Use an approved registered customer with a physical supported device registered for push and notification permission enabled. Its most recent push-capable device and app version are recorded. Have one recoverable Scheduled recipient and controlled mailbox; the send to this customer/device is approved.

**Postconditions:**

* Retain the approved email/order references and release unpaid test inventory through its normal expiry. Restore setup-only settings; do not delete shared history.

**Priority:** Medium

**Tags:** dashboard, abandoned-carts, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Locate the recorded recipient on the legacy page and select Send Email once. |  | The matching recovery email is accepted and eventually delivered to the controlled mailbox. |
| Observe the customer’s recorded device after the normal notification delivery window. |  | One matching abandoned-cart push appears with the event name on the intended device. |
| Open that notification’s recovery action. |  | The app/browser opens the matching abandoned-cart recovery destination for the correct event/customer. |
| Compare the opened selection with the original recipient/cart. |  | The recovery destination belongs to that cart; no unrelated customer or event is displayed. |

### SPT-5718: Dashboard - Abandoned Carts - Skip recovery emails when no customer email was provided

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Skip recovery emails when no customer email was provided

**Description:** Let an otherwise eligible guest cart expire before any customer email is supplied. The absence of an email must prevent recipient creation and sending; it must not use the organizer’s email as a fallback.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new preview. Organizer checks use Dashboard → Manage → Abandoned Carts.
* Organization abandoned-cart emails are enabled. Use a public paid event starting more than five hours after the planned send, with public available tickets and sales open; an authenticated customer has Email abandoned carts on.
* Use an approved test customer mailbox, owned event and sandbox payment where needed. Record the normal expiry/sending processing deadline, baseline recipients and five legacy cards. Keep customer/credential data out of shared evidence.
* Use a new signed-out customer session with no saved customer contact details. Record its cart reference before expiry; support can verify that no customer email is attached to that cart.

**Postconditions:**

* Retain the approved email/order references and release unpaid test inventory through its normal expiry. Restore setup-only settings; do not delete shared history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected event while signed out and add one paid ticket. |  | The cart has an eligible positive-price event item. |
| Leave before supplying customer contact details and allow normal expiry. |  | The cart expires without acquiring a customer email. |
| Have support compare this cart’s recipient records after normal processing, and inspect the organizer mailbox. |  | No abandoned-cart recipient or recovery email is created for this unidentified cart; the organizer receives no customer recovery email. |

### SPT-5719: Dashboard - Abandoned Carts - Use the newest expired cart for an overlapping event

**Publication status:** Published and full-field readback verified on 2026-10-17; not executed.

**Title:** Dashboard - Abandoned Carts - Use the newest expired cart for an overlapping event

**Description:** Create a later, separately expired ordinary cart for the same customer email and event while an older recovery email is still pending. Only the latest eligible cart should remain recoverable; its message must use the latest quantity. This is not a cart opened from a recovery link.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Organizer permission: **Manage Transactions**, with required authentication completed.
* The organization-scoped enable_abandoned_carts_nextjs_embed flag is off and the employee has not selected the new preview. Organizer checks use Dashboard → Manage → Abandoned Carts.
* Organization abandoned-cart emails are enabled. Use a public paid event starting more than five hours after the planned send, with public available tickets and sales open; an authenticated customer has Email abandoned carts on.
* Use an approved test customer mailbox, owned event and sandbox payment where needed. Record the normal expiry/sending processing deadline, baseline recipients and five legacy cards. Keep customer/credential data out of shared evidence.
* CustomerState Guest starts signed out and supplies the approved name/email/phone using Continue as Guest; Authenticated signs in as the approved customer before adding tickets.
* Have an older unsent Scheduled recipient for one ticket and record its send time. Start the new cart from the ordinary public event page with the same customer email and two tickets. Its normal expiry must finish before the older send time. Record both cart/recipient references; do not use a recovery link for the new cart.

**Postconditions:**

* Retain the approved email/order references and release unpaid test inventory through its normal expiry. Restore setup-only settings; do not delete shared history.

**Priority:** High

**Tags:** dashboard, abandoned-carts

**Parameters:**

CustomerState: Guest, Authenticated

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As CustomerState, create the ordinary two-ticket cart and leave it unpaid. |  | The new cart belongs to the same customer/event and differs from the one-ticket cart. |
| Allow its normal expiry and recipient processing before the older scheduled send. |  | The newer recipient is recoverable; the older pending recipient is retired and its unsent email is unscheduled. |
| Inspect the legacy list and the independent recipient records. |  | The active recovery target refers to the new two-ticket cart; a suppressed older row is not mistaken for a deleted customer record. |
| Observe the approved mailbox through the sending deadline and compare message content. |  | The current recovery email represents two tickets and the old one-ticket recovery email is not newly sent. |

## Gap summary and preservation review

All 18 original cases are accounted for below. The user approved publication of the reviewed batch. The applied scope includes splitting SPT-4838 and removing the obsolete guest-switch-off branch from SPT-3896 and SPT-3897; SPT-5126 was excluded and remains unchanged. The saved full-field Qase baseline retains original wording, parameters, links, image references and IDs. Old Coda references/screenshots are historical references, not current behavioral proof.

| Existing case | Preserved responsibility / published correction |
| --- | --- |
| SPT-924 / SPT-925 | Keep both Guest/Authenticated runs. Separate actual recovery-email delivery from a paid recovery order and its metrics. Replace cross-case prerequisites and fixed expiry waits. |
| SPT-926 / SPT-927 | Keep single-event assigned-seating email and paid recovery; align shifted/missing expected results. Record currently available seats, actual payment/order/tickets and recovery amounts. |
| SPT-929 | Keep original four CustomerState × EventType runs; add two MixedSeating runs. Correct nonseated multi-event expectation: eligible general-admission carts may send; multi-event carts containing assigned seating do not. |
| SPT-3885 | Keep Guest/Authenticated × one/multiple types, original email content/amount/link and replacement of the prior unpaid selection. Preserve the unavailable-item restriction in Postconditions; exact sold-out/hidden/cancelled recovery presentation still needs source confirmation before claiming those executions are ready. |
| SPT-3891 | Preserve all ten attraction/customer combinations; clarify that another eligible configured future slot can qualify an otherwise near-term attraction cart. |
| SPT-3892 | Preserve all 48 customer/cart/event/type combinations. Hidden original types do not prevent scheduling if another public available type qualifies the event; this does not authorize purchasing hidden tickets. |
| SPT-3893 | Rename the three login choices to BeforeItems/AfterItems/AtCheckout without changing their sequences; retain basket customer/name/email proof. The legacy table has no separate customer-profile link. |
| SPT-3894 | Preserve modified recovery-link cart expiry and no new recipient/email cycle; use actual expiry and processing, not an assumed 15 minutes. |
| SPT-3895 | Preserve both original customer types as CustomerState. Add MixedPaidAndFree alongside FreeOnly: any free item blocks the email, even with a positive cart total. |
| SPT-3896 / SPT-3897 | Preserve organization/customer preference failures, send-time revalidation and the clean successful send. Expand Draft/Archived and Hidden/SellerOnly choices explicitly. **Applied removal:** guest-switch-off branch in each case; no current source reference to abandoned_cart_email_guest_checkout was found. The removal was included in the reviewed publication scope and applied after the user requested publication. SalesEnded depends on the normal invalidation cycle, not an assumed final send check. |
| SPT-3898 | Preserve the original API POST entry, accepted HTTP 200 / empty-object response and scheduled recipient. Add actual mailbox delivery; SPT-5715 owns the distinct visible Send Email entry. Remove raw SQL/authentication examples. |
| SPT-4749 | Preserve WebBoxOffice/Electron, hold creation/release, exact inventory return, and no recipient/email. Keep the existing Platform parameter despite the default preference for Description-only platform tables. |
| SPT-4838 | Retain table/status/counter/amount checks. Split ModuleDisabled→SPT-5703, NoRecipients→SPT-5704, populated cards→SPT-5705, filters→SPT-5706–5712, NoFilterMatches→SPT-5706 NoRecipients, actions→SPT-5714–5715. Correct two stale claims: recovered-only also filters cards; recovery alone does not hide Send Email. |
| SPT-4839 | Preserve send-triggered push and recovery action on the latest registered device; require real notification receipt, not just a queued job. |
| SPT-5126 | **Held unchanged.** Its Description explicitly says migrated list/detail; legacy has no detail entry. Embedded role JSON is not a proper Qase parameter, and its last expected result is blank. Review against the owning newer page before rewriting or claiming its access coverage. SPT-5716 is limited to actual legacy list access. |

**New coverage:** SPT-5703–5717 isolate page states, five-card arithmetic, each filter, filter dependency/reset, pagination, send visibility/submission, permission denial and organization/currency separation. SPT-5718 isolates missing email; SPT-5719 isolates replacement of an older pending recipient by a newer ordinary cart. Search and dependent choices stay inside their owning filter tests. Parameter values reuse one step set; they are not additional Qase cases.

## Remaining evidence limits

| Control / state / risk | Coverage status and next proof |
| --- | --- |
| Visible page, filters, cards, rows, actions, permission gate | Source-backed draft coverage above; no case execution or save occurred. Manual Desktop/Mobile runs still required. |
| Loading indicator, status tooltip, keyboard/focus and narrow layout | **Manual-only, not passed.** Check loading completion without stale data, status timestamp wording, reachable filters/actions and readable rows at supported view sizes. Tooltip timestamps use browser-local time; filter date bounds use organization time. |
| FutureUnrecoverable in SPT-5714 | **Setup blocked unless a genuine saved matching record exists.** Normal invalidation unschedules email, so do not fabricate this state, edit read-only fields, or substitute Sent. Other SendState choices remain distinct. |
| SPT-3885 unavailable recovery items | **Source confirmation deferred.** Original sold-out/hidden/cancelled restriction is preserved; do not mark exact cart-removal/error presentation verified or silently drop it during publication. |
| Clearing Event while a Ticket Type is selected | **Source-backed risk, not reproduced.** Replacing Event clears the dependent type (SPT-5708); clearing only Event appears to leave the old hidden type filter. Need a controlled non-saving filter run and expected reset decision. Clear Filters is separately covered. |
| Failed/repeated Send Email request and delayed delivery | **Deferred controlled execution.** Legacy error handling may show optimistic success despite failure; define a reliable isolated failure response and inspect actual mailbox before creating an exact error expectation. Pending/success notice alone never proves delivery or exactly-once delivery. |
| Recipient updates while filters are active | **Deferred controlled execution.** Websocket row updates do not clearly refresh cards or reapply filter membership. Reload-based success cases do not prove live synchronization. |
| Mixed-organization recovery amounts | **Source-backed mismatch risk, not a live defect.** Row recovery totals filter paid orders by organization; the overall legacy stats aggregate is broader. SPT-5717 uses ordinary same-organization recoveries and does not prove the special cross-organization referral case. Add an isolated foreign-payment recovery proof after support can safely prepare it. |
| Five-hour cutoff, timezone transitions and sales-end/send races | **Boundary execution deferred.** Existing parameters cover inside/outside the buffer and organization-local inclusive creation-date limits. Exact moving-clock equality, ambiguous daylight-saving input and concurrent invalidation/send require controlled timing; current drafts do not claim these passed. |
| New-preview banner, native detail page, unrelated email customization/organizer settings | **Not applicable to this legacy-page review.** Do not click the preview banner or repurpose SPT-5126. Existing SPT-3620 and SPT-5430 own separate customization/settings behavior. |

## Duplicate check and publication boundary

Full-field local search used the complete Qase snapshot: **2,166 unique cases / 317 suites**, refreshed before publication at **2026-10-17 23:27:44 UTC**; all 18 suite-102 cases and four related matches were reviewed. Post-publication readback at **23:29:18 UTC** contained **2,183 unique cases / 317 suites**. SPT-1276 interrupted exchanges, SPT-3620 email customization, SPT-5283 tracking-link sellout and SPT-5430 organizer settings retain their separate responsibilities. No matching new title or duplicate full action/result flow was found; post-publication checks confirmed each new title occurs once. Intentional distinctions: scheduling vs delivery vs paid recovery; API send vs UI send; filter choice vs dependent reset vs clear-all; prior recovery-link cart expiry vs a newer ordinary cart.

Local parsing passed before the API batch dry run and approved application. Full-field publication verification confirms all 34 payloads, 138 step rows and parameter structures; 2,149 untouched cases (including SPT-5126), existing update metadata and all 317 suite definitions were preserved. No suite changes or deletions occurred. Definitions remain unexecuted. The approved preview, frozen publication source, apply receipt and stored case readback retain the exact write and local-label mapping.

## Setup and short source evidence

Recipient preparation uses approved customer carts and normal expiry/sending processes. A support employee may identify organization/recipient/cart references through authorized read access; the legacy list alone does not expose recipient or basket IDs. The recipient API is `/api/venue/{organizationId}/emails/commercial/abandoned-cart/`; do not guess IDs or prescribe a nonexistent generic recipient Admin editor. Private customer records are not copied into this note. Necessary sends, purchases, push receipt and configuration changes describe future controlled execution only. Restore setup-only values and retain paid orders/email history after execution.

**Source revisions:** backend `b5f397a0438910435e0d537f47e12d6064d7e019`; frontend `7e527b0285349e5d9537731f97f09b414001778c`. The legacy template/controller and authoritative API/lifecycle rules were read in the backend repository; frontend public recovery presentation is only partially traced. Local source is not proof of the deployed build.

| Source under /Users/christianvaldez/Documents/Showpass/repos/web-app | Evidence |
| --- | --- |
| apps/financials/dashboard/urls.py; views.py; apps/core/dashboard_preview.py; apps/main/templates/navigation/dashboard/side-menu.html | Legacy route, Manage → Abandoned Carts, Manage Transactions permission; ordinary email setting vs organization-scoped enable_abandoned_carts_nextjs_embed preview flag. |
| apps/main/templates/dashboard/abandoned-cart/abandoned-carts.html; apps/main/static/src/dashboard/venues/controllers/AbandonedCartController.js | Five cards, all filters/search/load-more/reset, row columns/status/counters/tooltip, pagination, send visibility and optimistic send state. |
| apps/main/static/src/core/generic/moment-picker-utils.js | Organization-timezone interpretation of creation-date bounds; separate from browser-local tooltip formatting. |
| apps/emails/api/venue_based/viewsets/abandoned_cart.py; filters.py; serializers/abandoned_cart.py | Permission on API actions, row visibility, distinct filtering, current-organization paid recovery annotations and accepted send response. |
| apps/emails/managers/abandoned_cart.py; apps/emails/tests/abandoned_cart/test_api.py | Legacy opened count and paid-order recovery arithmetic, 200% repeated recovery example, distinct rows and organization annotation checks. |
| apps/emails/models/abandoned_cart.py; apps/emails/tasks/abandoned_cart.py; apps/emails/services/abandoned_cart/; apps/tickets/services/holds/expire_eligible_ticket_baskets.py | Eligibility, free/missing-email/hold/referral exclusions, seating/attraction rules, revalidation, newest overlapping cart, customer push and actual scheduled processing. |
| apps/main/front/views.py; apps/analytics/models/tracking.py | Separate seated/nonseated recovery destinations; does not settle every unavailable-item presentation. |

**Read-only browser enrichment:** the already-open beta page showed legacy Abandoned Carts for the selected organization, with five cards, filters, a populated ten-row page and pagination; the preview banner was left untouched. Visible legacy Manage navigation was inspected. The exact employee grants and deployed commit were not audited; customer rows/screenshots were not retained. No filter was applied, email sent, setting saved, purchase made or job run.

Related guides: [[06 Prompts/Showpass Qase Gap Analysis]], [[05 Tooling/qasectl]], [[05 Tooling/Qase Test Case Writing Rules]], [[00 Start Here/World-Class Software Quality Standard]], [[03 Test Cases/Test Cases by Feature#Dashboard UI Organization]].

## Published ID mapping

Original local labels below are historical references only; case headings above use their assigned Qase IDs.

| Local draft | Published case |
| --- | --- |
| TC-1 | [SPT-5703](https://app.qase.io/case/SPT-5703) |
| TC-2 | [SPT-5704](https://app.qase.io/case/SPT-5704) |
| TC-3 | [SPT-5705](https://app.qase.io/case/SPT-5705) |
| TC-4 | [SPT-5706](https://app.qase.io/case/SPT-5706) |
| TC-5 | [SPT-5707](https://app.qase.io/case/SPT-5707) |
| TC-6 | [SPT-5708](https://app.qase.io/case/SPT-5708) |
| TC-7 | [SPT-5709](https://app.qase.io/case/SPT-5709) |
| TC-8 | [SPT-5710](https://app.qase.io/case/SPT-5710) |
| TC-9 | [SPT-5711](https://app.qase.io/case/SPT-5711) |
| TC-10 | [SPT-5712](https://app.qase.io/case/SPT-5712) |
| TC-11 | [SPT-5713](https://app.qase.io/case/SPT-5713) |
| TC-12 | [SPT-5714](https://app.qase.io/case/SPT-5714) |
| TC-13 | [SPT-5715](https://app.qase.io/case/SPT-5715) |
| TC-14 | [SPT-5716](https://app.qase.io/case/SPT-5716) |
| TC-15 | [SPT-5717](https://app.qase.io/case/SPT-5717) |
| TC-16 | [SPT-5718](https://app.qase.io/case/SPT-5718) |
| TC-17 | [SPT-5719](https://app.qase.io/case/SPT-5719) |
