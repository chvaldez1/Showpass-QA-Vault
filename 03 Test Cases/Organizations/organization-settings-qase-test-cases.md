---
title: Organization Settings — Qase-ready cases
date: 2026-10-15
tags:
  - qa/test-cases
  - qase
  - organizer
status: Finance cases and migrated-page folders published and verified; prior coverage retained; product execution pending
---

# Organization Settings — Qase-ready cases

Reviewed the full Qase project and both organization-settings entry points. **Suite181 is now Organization, with three direct cases; the reviewed forms are organized beneath their migrated page folders.** Most base settings forms need explicit save/reopen coverage. Existing payouts, branding, upsell and refund cases are reused below instead of recreated.

Cases follow **Organization → Settings, Branding and Integrations**, with the same page labels and order as the new UI. Each case has one purpose. Desktop and narrow mobile Dashboard views apply unless a case says otherwise; execute selected runs in English and French. Time-sensitive runs record both the organization and computer timezone. These are execution selections, not a large parameter matrix.

**Digital Wallets publication (2026-10-16):** [[#Branding → Deliverables → Digital Wallets|SPT-5502–5513, enhanced SPT-65 and preserved SPT-4742]] are verified in **Digital wallets (1179)**: 14 direct cases. Save-retry setup and organization-inherited pass refresh remain held; product execution is pending.

**Initial Organization Settings publication:** 45 new cases, **SPT-5418–SPT-5462**, in 20 folders matching the UI under [Organizer Info (181)](https://app.qase.io/project/SPT?suite=181). Full saved fields, parameters and destinations were verified. No existing cases were updated, moved or deleted in that initial publication. Tests have not been executed.

**Identity refresh:** [suite744](https://app.qase.io/project/SPT?suite=744) had **13 cases at that publication** (now12 after SPT-4742 moved to Digital wallets1179): five existing cases updated and eight created as **SPT-5463–5470**. All requested stored fields and suite placement were read back and verified. No cases were moved or deleted. Definitions are published; product execution remains pending.

**Emails organization:** Existing [Emails (523)](https://app.qase.io/project/SPT?suite=523) now lives under **Organizer Info → Branding**, with Email Customization, Sender, Membership Batch Email and Post-Event beneath it. All **12 cases** were preserved and their full fields verified unchanged. The empty duplicate Emails folder **1168** was removed after its child was moved. No case was copied, edited or deleted.

**Still held:** TC-15/16/17/19–23/50/51 and proposed changes to SPT-4826/4884. They duplicate or split existing coverage that must be preserved first. SPT-5139 is also unchanged. The original TC labels in analysis tables are retained as traceability labels; the publication table maps them to real IDs. SPT-5388 in the supplied URL is a Products case in suite 1154, outside this scope.

> [!important] Follow-up: every section checked
> The earlier audit mapped **21 new-navigation destinations** (20 observed sidebar destinations plus conditional Customer refunds) to related or base Qase definitions. That did **not** establish complete legacy-tab coverage; use the finance/tab audit below. The follow-up published **SPT-5459/5460 for Suborganizations** and **SPT-5461/5462 for Domains**, closing the two missing-page gaps identified in the audit. Existing Email Customization cases are reused. Related or base definitions still do not prove every field/state, DNS/SSL lifecycle or an executed pass.

> [!failure] Custom Fees: missing access from the retained Dashboard
> **Confirmed in the inspected beta session:** organizers continue to start in `/dashboard/`. Neither its landing-page menu nor Organization Info's embedded new settings provides a visible Custom Fees entry. The same account and organization can load Custom Fees directly, so that direct-access check does **not** resolve the missing Dashboard path. The previous Financial Settings tab exposed this business function. This audit missed it by counting only new-sidebar destinations and deferring the Finance screen review. The 21-destination count above is not a complete migration inventory.
>
> Required regression: start from the ordinary Dashboard landing page, select the organization, and reach Custom Fees through visible menus without typing a destination URL or changing navigation shells manually. Verify the correct organization's fee list opens. Account separately for supported legacy/new embed states and authorized employee roles. The inspected beta navigation failed this proof target; current deployment was not retested. Regression definition **SPT-5533** is now published; that does not resolve the observed access finding. No settings or fee data were changed.
>
> Source: [previous Financial Settings tab](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/venues/settings/edit-organization.html:62), [legacy-to-new tab mapping](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/dashboard/views.py:36), [wrapper rollout and permissions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/dashboard/views.py:111), and [standalone Finance menu](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/components/navigation/DashboardNavBarUserMenu/hooks/route-sections/finance-routes.tsx:18). The organization-scoped `enable_organization_settings_nextjs_embed` flag selects the replacement wrapper. The old tab and new Custom Fees route require `VP_MANAGE_FINANCIALS`; wrapper access also requires Manage Organization Info or bank-account permission. Local source does not establish the deployed build revision or every role's live behavior.
>
> Screenshots: [embedded settings without Custom Fees](evidence/beta-organization-settings-no-custom-fees.png); [direct destination and standalone Finance menu](evidence/beta-custom-fees-direct-access.png). The second image proves direct access only, not a valid workaround for the retained Dashboard journey.

## Legacy-tab audit — 2026-10-16; finance cases published

**Intent:** verify that organizers can reach each supported legacy tab and save finance settings without losing the selected organization, existing rate cards, authorization or useful prior coverage. Main risks are incorrect charges, blocked financial access and changed payout instructions. Proof targets are focused saved definitions plus fresh reopen checks; actual charges, payouts, delivery and release readiness are separate.

**Result:** inspected all **15 currently visible demo tabs** without saving. Source adds conditional Customer refunds and the parent-only Add Suborganization link. **Five existing-case enhancements +18 new cases** are published and verified below; SPT-5531 provides one reusable navigation case with a single Tab selection rather than 16 duplicated open-page tests. All tab-specific existing IDs are mapped here; this does not call every field or downstream result covered.

The final suite hierarchy follows `/manage/`: **Finance → Custom Fees (1180)** and **Fee Settings (1181)**, plus **Organization → Settings → Payment Details and Authorization (1182)** and **Shipping & Fulfillment (1183)**. Low inventory is part of **Enabled modules (1161)** rather than a recreated legacy tab folder. The earlier legacy-folder proposal is superseded by the user’s `/manage/` organization rule: **Finance → Custom Fees**, **Finance → Fee Settings**, and **Organization → Settings → Payment Details and Authorization**. Low-inventory coverage belongs to **Enabled modules**; shipping gets its own **Shipping & Fulfillment** folder. Legacy behavior remains the parity baseline. The approved publication changed only the listed Qase definitions and hierarchy; no product settings were saved.

| Legacy tab / entry | Current Qase location | Existing / local coverage | Decision and limits |
| --- | --- | --- | --- |
| Basic Info | General 1158 + Contact 1159 | 5418–5423,5458 | Modern saved-form cases exist; legacy address/contact labels and combined form are not identical. SPT-5531 adds explicit legacy navigation. |
| Branding | Branding 1165 → Identity/Profile/Messaging | 4124/4125/4127/4335,5463–5470,5444–5446 | Reuse the saved profile/image/message definitions; do not copy the newer Identity editor into the legacy form. SPT-5531 names the legacy content. |
| Business Schedule | Settings → Business Schedule 1160 | 5424–5429 | Weekly/exception definitions retained; show-schedule rendering and remaining boundaries are deferred. |
| Enabled Modules | Settings → Enabled modules 1161; root/shared module cases | 4009,5430/5431 | Reuse modules/options/exchanges. Legacy and new labels differ; actual module downstream effects remain separate. |
| Ticketing | Settings → Ticketing 1162; current mixed case at root181 | 5139,5432 | Base transfer behavior exists but 5139 still needs its unrelated Intellitix operation split safely. No duplicate transfer create. |
| Shipping & Fulfillment | Settings → Shipping & Fulfillment1183 | 4884 | Same embedded form is used; preserve broad existing assertions. The already-held local split stays held. |
| Low Inventory Display | Settings → Enabled modules1161 | 4826; customer394/398/2885/3871 | Moved unchanged into the migrated Enabled modules page; its existing saved/display coverage is retained; its prior held split is not duplicated. |
| Financial Settings | Finance → Custom Fees1180 / Fee Settings1181 | 5118 → creation; SPT-5517–5529,115,117;5443 refund text | Legacy controls are grouped by their migrated owners; the published cases retain parity gaps and unexecuted proof explicitly. |
| Post-Event Emails | Emails523 → Post-Event1169 | 5447,3619; delivered554 | Legacy Unique Email Message is deprecated/read-only; 5447’s modern three-message edit cannot stand in for legacy editing. SPT-5531 checks correct current controls; delivery is separate. |
| Email Customizations | Emails523 → Email Customization749 | 3617–3621,3626,4087,4148,4836,4837 | Reuse the eight existing types and preview/deletion cases; current legacy tab embeds the same new customization form. |
| Integrations | Integrations1172 → API allowlist1174 | 5451–5453; conditional Workday remains deferred | Legacy Whitelist Domains corresponds to API allowlist, not Analytics. Workday fields are conditional; no credentials were read or copied. |
| Payment Details and Authorization | Settings → Payment Details and Authorization1182 | 1650/1653/1654,SPT-5530 | Three banking cases enhanced and moved here; incomplete authorization5530 added. Other Payouts cases and both banking entry paths were retained. |
| Terms & Conditions | Settings → Legal1164 | 5440–5443 | Reuse terms/payment-plan/refund text. Refund text is on Financial Settings in legacy; enhance5443 instead of duplicating it. |
| Event Upselling | Settings → Enabled modules1161 → Event Upselling440 | 3172–3177,3179/3180/3182 | Existing suite moved without changing its cases; reuse enable/disable/default/specific/assigned-seating cases. |
| Analytics | Integrations → Analytics1173 | 5449/5450; tracking3323–3332 | Saved pixel settings and actual tracking remain distinct. Conditional GTM/CAPI need selected configuration; tokens were not retained. |
| Customer refunds (conditional) | Settings → Customer Refunds1091 → Organizer and Venue1107 | 5250–5255,5308 | Source-gated tab was absent in this demo organization. SPT-5531 includes a separately configured enabled run; no flag was changed live. |
| Add Suborganization (conditional navigation link) | Settings → Suborganizations1175; Register182 | 5459/5460 + existing child registration definitions | This is a parent-only link, not one of the 15 visible tabs. Existing new-list cases do not alone prove its legacy registration entry; that navigation/lifecycle stays deferred outside this finance focus. |

Published finance cases: [[#Legacy Organizer Info — finance parity cases (published)|SPT-5118, SPT-1650/1653/1654 and SPT-5517–5534]]. Refund text remains [[#SPT-5443: Save the default refund-policy text|SPT-5443]]; there is no second refund-policy test. [[#Finance duplicate and preservation review|Duplicate/preservation decisions and evidence]] follow the cases.

## Case index

Start with each page’s saved-form case, then select the relevant edge checks. Existing coverage stays linked to its current Qase ID.

| UI section | Base coverage | Edge checks / existing coverage |
| --- | --- | --- |
| General | Save details, Private organizer, clean timezone change | Missing name/timezone; currency read-only |
| Contact | Contact information and address | Missing support email; invalid accounting recipient |
| Business Schedule | Weekly hours; add/edit/delete one exception | Cancel deletion; past/duplicate exception date |
| Enabled modules | Organizer options, exchanges, inventory settings | Invalid percentages; disable display; existing module and upsell cases |
| Ticketing | Default transfer limit | Missing/zero limit; repair SPT-5139 before creating a duplicate |
| Customer refunds | Existing policy cases | Reuse suite 1107; conditional page |
| Shipping & Fulfillment | Controls, messages, quantity threshold, destinations | Disable/clear quantity; invalid number; unsupported HTML |
| Checkout Consent | Add, edit, status, reorder, preview | Incompatible choices; missing copy/duplicate label |
| Payment Details and Authorization | Existing banking/authorization cases | Reuse SPT-1650/1653/1654 |
| Legal | Checkout terms, payment-plan terms, refund copy | Missing terms URL; text-limit source mismatch |
| Suborganizations | SPT-5459/5460 | Base page cases published; registration lifecycle remains separate |
| Branding → Identity | Existing branding cases | Partial field/reset/upload and permission gaps |
| Branding → Profile / Messaging | Saved profile and messages | Subscription line breaks |
| Branding → Emails | Post-Event switches/messages; existing Customization cases | Scheduled delivery still requires execution |
| Branding → Deliverables | Ticket PDF settings; existing Digital Wallets case | Generated PDF and physical-device proof pending |
| Integrations → Analytics | Saved IDs and conditional GTM | Invalid ID; token/permission checks pending |
| Integrations → API allowlist | Add/remove one extra URL | Invalid URL |
| Integrations → Domains | SPT-5461/5462 | Base page cases published; DNS/SSL/connection still require distinct coverage |
| Access and navigation | Organization isolation, legacy entry | Restricted role; unsaved edit |

## Published cases and held drafts

## Settings → General

### SPT-5418: Save general details

**Title:** Dashboard - Organization - Save general details

**Description:**

Change the organization name and internal information. Verify all General controls and the saved edit. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → General. |  | Organization name, Organization profile link, Timezone, read-only Currency, Internal info, Private organizer, and Save appear. |
| Edit Organization name and Internal info. | Append QA to the recorded name; Internal info = Settings save test | Both edits appear; the saved timezone and currency remain unchanged. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen General. |  | The name and internal information retain the edits; timezone, currency and Private organizer retain their original values. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5419: Require a name and timezone

**Title:** Dashboard - Organization - Require a name and timezone

**Description:**

Try saving General with one required field empty. Each run checks one field. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record the current organization name and timezone.

**Tags:** dashboard, organizer, edge-case

**Parameters:**

RequiredField: Organization name, Timezone

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → General. |  | The current name and timezone appear. |
| Clear the selected required field. | RequiredField | The selected field is empty. |
| Attempt to select Save. |  | A required-field error prevents saving the incomplete form. |
| Reload General without saving. |  | The recorded name and timezone remain saved. |

**Postconditions:**

* No organization setting changes.

### SPT-5420: Save the private-organizer setting

**Title:** Dashboard - Organization - Save the private-organizer setting

**Description:**

Save the selected Private organizer choice and verify that it remains selected. This case proves the saved setting; public-profile privacy needs separate customer-side proof. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.

**Tags:** dashboard, organizer

**Parameters:**

PrivateChoice: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → General. |  | Private organizer and its explanation are visible. |
| Set Private organizer. | PrivateChoice | The switch shows the selected choice. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen General. |  | Private organizer retains the selected choice; the other General values remain unchanged. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5458: Save a timezone for a new organization

**Title:** Dashboard - Organization - Save a timezone for a new organization

**Description:**

Change the timezone before the organization has dated configuration. This checks a clean save; organizations with existing scheduled records may be blocked by the backend timezone guard. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use a newly registered organization before adding events, discounts, memberships, scheduled messages, reports or other dated configuration. Record its current timezone.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → General. |  | The current timezone appears. |
| Select a different timezone. | America/Vancouver; if already selected use America/Toronto | The selected timezone appears. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen General. |  | The selected timezone remains saved and no unrelated General values change. |

**Postconditions:**

* Restore the original timezone before adding dated configuration; save and reopen.

## Settings → Contact

### SPT-5421: Save contact details

**Title:** Dashboard - Organization - Save contact details

**Description:**

Verify the Contact form and save contact information using inboxes and a phone number controlled by the organization. This checks saved preferences, not delivery of messages. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Have two controlled inbox addresses and a controlled phone number. Record which address is used for each email field.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Contact. |  | Phone number, Primary email, Showpass updates checkbox, Allow customers to email you, Customer support email, Accounting email, AR/AP emails, Address and Save appear. |
| Edit the contact fields. | Primary email and Customer support email = first controlled inbox; Accounting email and AR/AP emails = second controlled inbox; Phone number = controlled number | The form accepts the contact information. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Contact. |  | Each edited contact value is retained and the saved communication switches are unchanged. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5422: Save the organization address

**Title:** Dashboard - Organization - Save the organization address

**Description:**

Change the organization address and verify the country-specific address controls and saved address. Use a known organization-controlled address, not a real customer address. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Record the current address. Have a different complete organization-controlled postal address, including its country and province/state.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Contact. |  | Search address, Address line 1, Address line 2, City, Country, Province / State and Postal / ZIP code appear. |
| Choose the prepared address using Search address. | Prepared complete address | The populated street, city, country, province/state and postal code match the selected address. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Contact. |  | The complete selected address remains saved and the country and province/state agree. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5423: Reject incomplete customer contact details

**Title:** Dashboard - Organization - Reject incomplete customer contact details

**Description:**

Attempt to save customer email contact without a support email, or an invalid accounting recipient list. Each run starts from the recorded saved values. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record the saved contact details. Choose one InvalidContact row.

**Tags:** dashboard, organizer, edge-case

**Parameters:**

InvalidContact: Missing support email, Invalid accounting recipient

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Contact. |  | The current contact values appear. |
| Enter the selected invalid contact details. | Missing support email: turn Allow customers to email you on and clear Customer support email. Invalid accounting recipient: AR/AP emails = not-an-email. | The selected invalid combination is entered. |
| Attempt to select Save. |  | Validation explains the missing support email or invalid email address; the invalid form is not saved. |
| Reload Contact without saving. |  | The recorded contact values remain saved. |

**Postconditions:**

* No contact details change.

## Settings → Business Schedule

### SPT-5424: Save weekly business hours

**Title:** Dashboard - Organization - Save weekly business hours

**Description:**

Save weekly opening hours, a closed day and booking limits. Check all seven days and the public-hours switch. Hours are organization-local; record the organization timezone and run with a different computer timezone for one selected run. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Record all weekly hours, booking limits and Show business hours on organizer profile.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Business Schedule. |  | Monday through Sunday, Closed, opening/closing times for open days, Staff bookings, Web bookings, the visibility switch and Save appear. |
| Edit the weekly schedule. | Monday: Closed off, Opens 09:00, Closes 17:00, Staff bookings 4, Web bookings 2; Sunday: Closed on; leave other days unchanged | Monday shows the entered hours and limits; Sunday hides its opening and closing fields. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Business Schedule. |  | Monday and Sunday retain the chosen values; the other days and the visibility switch remain unchanged. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5425: Add a schedule exception

**Title:** Dashboard - Organization - Add a schedule exception

**Description:**

Add one dated exception, meaning business hours that replace the weekly schedule for that date. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Choose a date at least seven days in the future with no existing exception. Record the chosen date in the organization timezone.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Business Schedule. |  | Schedule exceptions and Add exception appear. |
| Select Add exception. |  | Exception date, Closed, Staff bookings, Web bookings and Cancel are available. |
| Enter the new exception. | Chosen date; Closed off; Opens 10:00; Closes 14:00; Staff bookings 3; Web bookings 1 | The exception shows complete hours and limits. |
| Select Add exception, then reopen Business Schedule. |  | Exactly one row for the chosen date shows 10:00–14:00 and the selected booking limits. |

**Postconditions:**

* Remove only the exception created by this case after recording the result.

### SPT-5426: Edit a schedule exception

**Title:** Dashboard - Organization - Edit a schedule exception

**Description:**

Change one existing future exception to a closed day. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Choose a future schedule exception created for testing with no bookings depending on it. Record its original hours and limits.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Business Schedule. |  | The selected future exception appears. |
| Select Edit for the chosen exception. |  | Its saved date, hours and booking limits appear. |
| Turn Closed on and select Save changes. |  | The exception is saved as closed. |
| Leave the page and reopen Business Schedule. |  | The selected date is still closed and other exceptions retain their original values. |

**Postconditions:**

* Restore the selected exception’s recorded hours and limits; reopen to confirm.

### SPT-5427: Delete a schedule exception

**Title:** Dashboard - Organization - Delete a schedule exception

**Description:**

Remove one future exception after confirming the date in the deletion dialog. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Have one future exception created only for this deletion test, with no bookings relying on it. Record the date and another existing row for comparison.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Business Schedule. |  | The prepared exception appears. |
| Select Delete for the prepared exception. |  | Delete schedule exception identifies the chosen date and offers Cancel and Delete. |
| Select Delete in the confirmation. |  | The chosen exception is removed. |
| Leave the page and reopen Business Schedule. |  | The deleted date remains absent and the comparison row is unchanged. |

**Postconditions:**

* Keep the deletion result; do not delete other exceptions.

### SPT-5428: Cancel an exception deletion

**Title:** Dashboard - Organization - Cancel an exception deletion

**Description:**

Cancel deleting a future schedule exception. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Choose a future exception and record its date, hours and booking limits.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Business Schedule. |  | The selected exception appears. |
| Select Delete for that exception. |  | The confirmation identifies the chosen date. |
| Select Cancel. |  | The confirmation closes and the exception remains. |
| Leave the page and reopen Business Schedule. |  | The same exception and values remain saved. |

**Postconditions:**

* No schedule data changes.

### SPT-5429: Reject an invalid exception date

**Title:** Dashboard - Organization - Reject an invalid exception date

**Description:**

Try adding an exception with a past date or an already-used future date. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record existing exception dates. For Duplicate date, select an existing future exception date. For Past date, use yesterday.

**Tags:** dashboard, organizer, edge-case

**Parameters:**

InvalidDate: Past date, Duplicate date

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Business Schedule. |  | The saved exception rows appear. |
| Select Add exception and enter the selected date. | InvalidDate; Closed on; Staff bookings 0; Web bookings 0 | The selected date is entered or prevented by the date control. |
| Attempt to select Add exception. |  | The invalid or duplicate date is rejected; no extra exception is saved. |
| Leave the page and reopen Business Schedule. |  | The existing exception rows remain unchanged. |

**Postconditions:**

* No exception is created.

## Settings → Enabled modules

### SPT-5430: Save organizer options

**Title:** Dashboard - Organization - Save organizer options

**Description:**

Save the organizer-option switches on Enabled modules. This proves saved choices, not email delivery or checkout behavior. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Use a Professional or Premium organization. Record Allow guestlist joins, Enable discounts, Enable abandoned cart emails and Enable reminder emails.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Enabled modules. |  | Organizer options contains the four recorded switches. |
| Change each organizer-option switch to the opposite of its recorded choice. |  | Each switch shows the chosen state. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Enabled modules. |  | All four switches retain the selected states; unrelated module selections remain unchanged. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5431: Save exchange settings

**Title:** Dashboard - Organization - Save exchange settings

**Description:**

Save the exchange audience and time restriction. This verifies configuration; a completed exchange is separate proof. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* The Exchanges module is enabled. Record Exchange visibility and Exchange time restriction.

**Tags:** dashboard, organizer

**Parameters:**

Audience: Box Office + Public, Box Office Only, Public Only

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Enabled modules. |  | Exchange visibility offers Box Office + Public, Box Office Only and Public Only; Exchange time restriction uses hours before the event. |
| Choose Exchange visibility and enter Exchange time restriction. | Audience; 12 hours | The selected audience and 12-hour restriction appear. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Enabled modules. |  | The selected audience and 12-hour restriction remain saved. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-4826: Save inventory percentage thresholds

Proposed existing-case split — held; the saved Qase case is unchanged.

**Title:** Dashboard - Organization - Save inventory percentage thresholds

**Description:**

Save percentage thresholds on Enabled modules and verify values remain percentages after reopening. Customer badges are checked separately by the retained inventory display cases. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Record Enable inventory threshold display, Threshold one, Threshold two and Threshold three.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Enabled modules. |  | The threshold switch and three percentage controls appear. |
| Enable inventory threshold display and enter the thresholds. | Threshold one 50; Threshold two 60; Threshold three 75 | The form accepts the ascending values. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Enabled modules. |  | Threshold display is on and values are exactly 50%, 60% and 75%, without a second percentage conversion. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### TC-15: Reject invalid inventory percentages

**Title:** Dashboard - Organization - Reject invalid inventory percentages

**Description:**

Reject thresholds that are out of order or outside the supported range. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record saved threshold values. Enable inventory threshold display for the attempted edit.

**Tags:** dashboard, organizer, edge-case

**Parameters:**

ThresholdSet: Wrong order, Zero, Upper boundary

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Enabled modules. |  | The threshold controls appear. |
| Enter the selected threshold set. | ThresholdSet: Wrong order = 70,60,75; Zero = 0,60,75; Upper boundary = 50,60,99 | The values are entered or restricted by the controls. |
| Attempt to select Save. |  | Validation prevents saving the invalid thresholds. |
| Reload Enabled modules without saving. |  | The previously saved threshold settings remain. |

**Postconditions:**

* No threshold settings change.

### TC-16: Save the remaining-inventory display limit

**Title:** Dashboard - Organization - Save the remaining-inventory display limit

**Description:**

Save the number at which customers may see remaining inventory. Clearing the field disables this display setting. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Record Show remaining inventory.

**Tags:** dashboard, organizer

**Parameters:**

RemainingChoice: Enabled, Disabled

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Enabled modules. |  | Show remaining inventory and its blank-to-disable explanation appear. |
| Set Show remaining inventory. | RemainingChoice: Enabled = 5; Disabled = leave empty | The field shows 5 or is blank for the selected run. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Enabled modules. |  | The field retains 5 for Enabled and is blank for Disabled. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### TC-50: Disable inventory percentage display

**Title:** Dashboard - Organization - Disable inventory percentage display

**Description:**

Save the inventory-percentage switch off without losing its saved thresholds. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Begin with inventory threshold display on and thresholds 50,60,75. Record the original values before preparing this state.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Enabled modules. |  | The enabled switch and thresholds appear. |
| Turn Enable inventory threshold display off. |  | The switch is off. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Enabled modules. |  | The switch remains off; turning it on without saving shows the retained 50,60,75 thresholds. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

## Settings → Ticketing

### TC-17: Save the default ticket-transfer limit

**Title:** Dashboard - Organization - Save the default ticket-transfer limit

**Description:**

Set the organization’s default number of permitted ticket transfers. This case verifies the default setting; event overrides and actual customer transfers are separate cases. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Record the current Ticket transfer limit.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Ticketing. |  | Ticket transfers contains Ticket transfer limit, its event-inheritance explanation and Save. |
| Enter Ticket transfer limit. | 3 | The control accepts 3. |
| Select Save. |  | Ticket transfer settings saved appears. |
| Leave the page and reopen Ticketing. |  | Ticket transfer limit is still 3. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5432: Reject an invalid ticket-transfer limit

**Title:** Dashboard - Organization - Reject an invalid ticket-transfer limit

**Description:**

Attempt to save a missing or zero ticket-transfer limit. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record the saved Ticket transfer limit.

**Tags:** dashboard, organizer, edge-case

**Parameters:**

InvalidLimit: Empty, Zero

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Ticketing. |  | The saved limit appears. |
| Enter the selected invalid limit. | InvalidLimit: Empty = clear field; Zero = 0 | The selected value is entered or prevented. |
| Attempt to select Save. |  | The form requires a whole number of at least 1; the invalid limit is not saved. |
| Reload Ticketing without saving. |  | The recorded valid limit remains saved. |

**Postconditions:**

* No transfer setting changes.

## Settings → Customer refunds

Conditional page. **Reuse SPT-5250–5255 and SPT-5308 in suite 1107**; see Existing coverage to reuse below. No duplicate policy cases are drafted.

## Settings → Shipping & Fulfillment

### SPT-4884: Save fulfillment controls

Proposed existing-case split — held; the saved Qase case is unchanged.

**Title:** Dashboard - Organization - Save fulfillment controls

**Description:**

Save Fulfillment features enabled and Allow delivery ticket transfers on Shipping & Fulfillment. This checks configuration, not a completed shipping purchase or transfer. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_shipping_fulfillment_settings` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.

**Tags:** dashboard, organizer

**Parameters:**

ControlChoice: On, Off

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Shipping & Fulfillment. |  | Fulfillment controls, Shipping messaging, Shipping quantity threshold, Destination restrictions and Save appear. |
| Set both fulfillment controls. | ControlChoice: On = both on; Off = both off | Both switches show the selected state. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Shipping & Fulfillment. |  | Both controls retain the selected state; other shipping settings are unchanged. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### TC-19: Save shipping messages

**Title:** Dashboard - Organization - Save shipping messages

**Description:**

Save checkout and quantity-threshold copy. Leading and trailing spaces should be removed. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_shipping_fulfillment_settings` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Shipping & Fulfillment. |  | Both message fields and their character counters appear. |
| Edit both messages. | Checkout shipping message = "  Shipping test message  "; Shipping quantity threshold message = "  Choose another delivery method  " | The fields accept the text. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Shipping & Fulfillment. |  | Messages are Shipping test message and Choose another delivery method, without surrounding spaces. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### TC-20: Enable a shipping quantity threshold

**Title:** Dashboard - Organization - Enable a shipping quantity threshold

**Description:**

Save a positive maximum number of delivery-capable items per order. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_shipping_fulfillment_settings` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Multi-layer packages are disabled for this organization. Record the quantity-threshold switch, value and message.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Shipping & Fulfillment. |  | Enable shipping quantity threshold is visible. |
| Turn on Enable shipping quantity threshold and enter Shipping quantity threshold. | 5 | The threshold control is visible and accepts 5. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Shipping & Fulfillment. |  | The threshold is on and remains 5; the existing threshold message is retained. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### TC-21: Disable a shipping quantity threshold

**Title:** Dashboard - Organization - Disable a shipping quantity threshold

**Description:**

Turn the threshold off and verify its number is cleared while its message is kept for reuse. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_shipping_fulfillment_settings` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Start with threshold enabled at 5 and a saved threshold message. Record the original settings before preparing this state.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Shipping & Fulfillment. |  | The enabled threshold is 5. |
| Turn off Enable shipping quantity threshold. |  | The threshold is disabled. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Shipping & Fulfillment. |  | The threshold remains off; its message is unchanged. |
| Turn the threshold on without saving. |  | The numeric threshold is blank, requiring a new positive value. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### TC-22: Save destination restrictions

**Title:** Dashboard - Organization - Save destination restrictions

**Description:**

Choose allowed countries and blocked regions, then verify the selected labels and absence of duplicate selections. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_shipping_fulfillment_settings` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Shipping & Fulfillment. |  | Allowed shipping countries and Blocked shipping regions have search controls. |
| Replace the destination selections. | Allowed shipping countries = Canada; Blocked shipping regions = Alberta, Canada | Canada and Alberta, Canada appear once each. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Shipping & Fulfillment. |  | Canada and Alberta, Canada remain selected. |
| Search for the same selected destinations. |  | The selected destinations are not offered as duplicate choices. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### TC-23: Reject an invalid shipping threshold

**Title:** Dashboard - Organization - Reject an invalid shipping threshold

**Description:**

Attempt to save an enabled shipping threshold without a positive number. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_shipping_fulfillment_settings` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Multi-layer packages are disabled. Record the saved threshold choices.

**Tags:** dashboard, organizer, edge-case

**Parameters:**

InvalidThreshold: Missing, Zero

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Shipping & Fulfillment. |  | The threshold controls appear. |
| Turn the threshold on and enter the selected invalid value. | InvalidThreshold: Missing = clear the number; Zero = 0 | The invalid entry is shown or prevented. |
| Attempt to select Save. |  | The form requires a positive whole number and does not save the invalid threshold. |
| Reload without saving. |  | The original shipping settings remain saved. |

**Postconditions:**

* No shipping settings change.

### TC-51: Reject an unsupported shipping message

**Title:** Dashboard - Organization - Reject an unsupported shipping message

**Description:**

Attempt to save HTML in the plain-text checkout shipping message. Existing shipping configuration must remain saved. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_shipping_fulfillment_settings` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.

**Tags:** dashboard, organizer, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Shipping & Fulfillment. |  | Checkout shipping message is visible. |
| Enter HTML in Checkout shipping message. | <b>Shipping message</b> | The HTML text appears in the field. |
| Attempt to select Save. |  | The unsupported HTML is rejected with an error; it is not saved. |
| Reload without saving. |  | The recorded shipping message and other settings remain saved. |

**Postconditions:**

* No shipping settings change.

## Settings → Checkout Consent

### SPT-5433: Add a checkout consent item

**Title:** Dashboard - Organization - Add a checkout consent item

**Description:**

Create one optional checkbox consent. A consent item is text displayed to customers at checkout, with an optional agreement checkbox. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_consent_configuration` is on.
* Use an organization without customer checkout activity during this test. Record the existing consent items and order.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Checkout Consent. |  | The list shows Consent copy, Type, Required, Maps to and Status. Add consent item is available after all rows finish loading. |
| Select Add consent item. |  | Consent text, Type, Reporting label, Active, Required, Selected by default and Maps to appear. |
| Complete the form. | Consent text = Send me updates; Type = Checkbox; Reporting label = Settings consent plus today’s date (unused label); Active on; Required off; Selected by default off; Maps to None | The completed form has an optional unchecked consent. |
| Select Add consent item, then reopen Checkout Consent. |  | Exactly one new Active row appears; Edit shows the saved text, label and choices. |

**Postconditions:**

* Deactivate the consent created by this case. Keep other consent items unchanged.

### SPT-5434: Edit a checkout consent item

**Title:** Dashboard - Organization - Edit a checkout consent item

**Description:**

Edit an existing consent’s copy and reporting label without creating a second item. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_consent_configuration` is on.
* Use an organization without customer checkout activity during this test. Record the existing consent items and order.
* Select an inactive consent prepared for testing. Record all its fields.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Checkout Consent. |  | The selected inactive item appears. |
| Open its More actions → Edit. |  | Its saved values appear. |
| Change Consent text and Reporting label, then select Save changes. | Consent text = Updated consent copy; Reporting label = Updated settings consent plus today’s date (unused label) | The edit succeeds. |
| Leave the page and reopen Checkout Consent. |  | Only the selected item is changed; Edit retains the new copy and label, with the original type, required choice and inactive status. |

**Postconditions:**

* Restore the selected consent’s original fields and reopen it.

### SPT-5435: Change a consent item status

**Title:** Dashboard - Organization - Change a consent item status

**Description:**

Deactivate or reactivate one prepared consent through its confirmation dialog. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_consent_configuration` is on.
* Use an organization without customer checkout activity during this test. Record the existing consent items and order.
* Use one consent prepared for testing. For Deactivate start Active; for Reactivate start Inactive. If it maps to Venue email or Venue SMS, no other active item may use that same mapping. Record its original status.

**Tags:** dashboard, organizer

**Parameters:**

StatusAction: Deactivate, Reactivate

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Checkout Consent. |  | The selected item shows its starting status. |
| Open More actions and select the chosen status action. | StatusAction | A confirmation identifies Deactivate or Reactivate and offers Cancel. |
| Confirm the selected action. |  | A success message appears and the row shows the new status. |
| Leave the page and reopen Checkout Consent. |  | The selected status remains saved; the consent copy and other items are unchanged. |

**Postconditions:**

* Restore the consent’s original status.

### SPT-5436: Reorder checkout consent items

**Title:** Dashboard - Organization - Reorder checkout consent items

**Description:**

Change the order of two existing items and verify the order remains saved. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_consent_configuration` is on.
* Use an organization without customer checkout activity during this test. Record the existing consent items and order.
* Have at least two consent items prepared for testing. Record their labels and full original order.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Checkout Consent. |  | All rows have finished loading and reorder controls are available. |
| Move the second selected item before the first using the reorder control. |  | The list shows the new order and confirms it was updated. |
| Leave the page and reopen Checkout Consent. |  | The new order remains saved; all item copy, mappings and statuses are unchanged. |

**Postconditions:**

* Restore the original order and reopen to confirm.

### SPT-5437: Prevent conflicting consent choices

**Title:** Dashboard - Organization - Prevent conflicting consent choices

**Description:**

Changing a consent to a required checkbox or an agreement by continuing should clear incompatible choices before saving. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_consent_configuration` is on.
* Use an organization without customer checkout activity during this test. Record the existing consent items and order.
* Select an inactive optional Checkbox consent prepared for testing, with Selected by default on and Maps to Venue email. Record its fields.

**Tags:** dashboard, organizer

**Parameters:**

ConsentChoice: Required checkbox, Agreement by continuing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Checkout Consent. |  | The selected item appears. |
| Open More actions → Edit. |  | The prepared default selection and mapping appear. |
| Apply the selected change. | ConsentChoice: Required checkbox = turn Required on; Agreement by continuing = change Type to Agreement by continuing | Required checkbox clears Selected by default and Maps to None; Agreement by continuing clears and disables Required and Selected by default. |
| Select Save changes and reopen the item’s Edit form. |  | The selected type and compatible choices remain saved. |

**Postconditions:**

* Restore the recorded consent fields.

### SPT-5438: Require consent copy and a unique reporting label

**Title:** Dashboard - Organization - Require consent copy and a unique reporting label

**Description:**

Attempt to submit a new consent with missing copy or a reporting label already used by this organization. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_consent_configuration` is on.
* Use an organization without customer checkout activity during this test. Record the existing consent items and order.
* Have at least one existing consent. Record its Reporting label for the duplicate-label run.

**Tags:** dashboard, organizer, edge-case

**Parameters:**

InvalidConsent: Empty copy, Duplicate label

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Checkout Consent. |  | Existing items and Add consent item appear. |
| Select Add consent item and prepare the invalid entry. | InvalidConsent: Empty copy = no Consent text, unused Reporting label; Duplicate label = Consent text Test copy, Reporting label copied from an existing item | The invalid entry is prepared. |
| Attempt to select Add consent item. |  | Validation identifies the missing text or duplicate label; no consent is created. |
| Cancel and reopen Checkout Consent. |  | The original items and order are unchanged. |

**Postconditions:**

* No consent item is created.

### SPT-5439: Preview a saved consent item

**Title:** Dashboard - Organization - Preview a saved consent item

**Description:**

Open a saved consent preview without editing it. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_consent_configuration` is on.
* Use an organization without customer checkout activity during this test. Record the existing consent items and order.
* Select a saved consent containing readable copy and an HTTPS link controlled by the organization. Record its text and type.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Checkout Consent. |  | The selected consent appears. |
| Open More actions → Preview. |  | The preview shows the selected copy and type, with the configured checkbox or agreement presentation. |
| Close the preview. |  | The list remains unchanged. |

**Postconditions:**

* No consent data changes.

## Settings → Payment Details and Authorization

**Existing coverage: SPT-1650, SPT-1653 and SPT-1654 in suite 1011.** The published enhancements and migrated-page folder are recorded in [[#Legacy Organizer Info — finance parity cases (published)|the finance follow-up]]. Preserve both Finance and Organization Info entry paths. No banking changes were made.

## Settings → Legal

### SPT-5440: Save checkout terms

**Title:** Dashboard - Organization - Save checkout terms

**Description:**

Save the customer-terms requirement and linked terms page. This sets defaults for newly created events, not every existing event. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Have an HTTPS terms-page URL controlled by the organization. Record the current terms switch and URL.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Legal. |  | Require customers to accept terms, Terms URL, Default refund policy and Save appear. |
| Turn on Require customers to accept terms and enter Terms URL. | Controlled HTTPS terms URL | Terms URL is editable and contains the selected address. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Legal. |  | The terms requirement stays on and its URL is retained; the refund-policy text is unchanged. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5441: Reject missing checkout terms

**Title:** Dashboard - Organization - Reject missing checkout terms

**Description:**

Attempt to require customer acceptance without a terms URL. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record the current Legal settings.

**Tags:** dashboard, organizer, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Legal. |  | The current terms choices appear. |
| Turn on Require customers to accept terms and clear Terms URL. |  | The required URL is empty. |
| Attempt to select Save. |  | Terms URL is required; the incomplete settings are not saved. |
| Reload Legal without saving. |  | The original Legal settings remain saved. |

**Postconditions:**

* No Legal settings change.

### SPT-5442: Save payment-plan terms

**Title:** Dashboard - Organization - Save payment-plan terms

**Description:**

Save the terms that customers must accept when buying with a payment plan. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Payment plans are enabled for the selected organization by its existing supported setup. Record Require payment plan terms and Payment plan terms content.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Legal. |  | Payment plan terms appears with Require payment plan terms. |
| Turn on Require payment plan terms and edit the content. | Payment plan terms content = Payment plan terms for this test. | The content editor appears and contains the new text. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Legal. |  | The requirement remains on and the content remains saved. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5443: Save the default refund-policy text

**Title:** Dashboard - Organization - Save the default refund-policy text

**Description:**

Save the same organization refund-policy text through either supported presentation. This is display text, separate from the Customer refunds settings that decide whether customers can initiate a return. Do not create a second refund-text case for the legacy tab.

| Entry | Visible navigation | Field / save action |
| --- | --- | --- |
| Legacy | Dashboard → Organization Info → Financial Settings | Refund Policy / Save Changes |
| New | Dashboard → Organization settings → Legal | Default refund policy / Save |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run both entries in desktop and narrow mobile views. Use short text within the backend's 512-character limit. This case proves saved text, not public event rendering or a completed refund.

**Preconditions:**

* Employee permission: **Manage Organization Info**. The Legacy entry additionally needs **Manage Transactions**.
* The setup owner prepares the selected Entry for this organization: Legacy uses the legacy tabs with no new-preview choice; New uses the supported new settings presentation. Record the original rollout/preview state. No flag is changed during the case.
* Record the current refund-policy text and other financial settings. Use an organization whose public customer messages are approved for this reversible change.

**Tags:** dashboard, organizer

**Parameters:**

Entry: Legacy, New

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected Entry using its visible navigation from Description. | Keep the same organization selected. | The refund-policy field displays the recorded text. |
| Replace the refund-policy text. | Refunds follow the conditions shown for each event. | The exact text appears in the field. |
| Select the Entry's save action. | Use the Description mapping. | A success message appears. |
| Leave and reopen the same Entry. |  | The exact new text remains saved; other recorded financial settings are unchanged. |

**Postconditions:**

* Restore the recorded refund-policy text, save and reopen to verify. Restore only rollout/preview setup changed specifically for this run through the setup owner.

## Settings → Suborganizations

SPT-5459/5460 below were published from TC-52/53 after the audit found no direct page cases. Submitting, approving and linking a new child organization remains a separate lifecycle.

### SPT-5459: Review connected suborganizations

**Title:** Dashboard - Organization - Review connected suborganizations

**Description:**

A parent organization is an organization that oversees child organizations. Verify the employee sees its application link and the child organizations they can access. This is a read-only review, not registration approval.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info** in the selected parent organization.
* Select an enabled parent organization with two enabled child organizations the employee can also access. Record all three names. The employee also has access to an unrelated organization for comparison.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Suborganizations. |  | Registration link, Copy link, Open and Connected suborganizations appear. |
| Inspect Connected suborganizations. | The two recorded child names | Both accessible children show Connected; the unrelated organization is absent. |
| Select Open for Registration link. |  | The application page identifies the selected parent organization; no application is submitted. |

**Postconditions:**

* No organization or registration data changes.


### SPT-5460: Show when suborganizations are unavailable

**Title:** Dashboard - Organization - Show when suborganizations are unavailable

**Description:**

Open Suborganizations for an organization that is not enabled as a parent organization.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Select an enabled organization whose Is parent setting is off. Do not change its parent relationships for this test.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Suborganizations. |  | Suborganizations are not enabled for this organization appears. |
| Inspect the page controls. |  | Registration link, Copy link and Connected suborganizations are absent. |

**Postconditions:**

* No organization data changes.



## Branding → Identity

> [!success] Suite 744 refresh — published and verified
> Suite **744 is Identity**, under Branding (1165), and now contains **13 cases**. Updated SPT-4124/4125/4127/4335 and corrected only SPT-4742’s first navigation action. Created **SPT-5463–5470** from SPT-5517–63. The user approved this exact preview with “push”; all saved fields and destination were verified. SPT-5444 remains the separate Profile case, unchanged. Existing 45-case publication receipts elsewhere in this note remain unchanged.
>
> Beta was inspected through Dashboard → Settings → Organization Info → Branding → Identity, retaining the `/dashboard/` shell. Sections, font-provider tabs/library and both preview controls were checked without saving or sending. Save/reopen, uploads, deletions, delivered emails, mobile and other roles remain unexecuted. The wallet case stays in suite 744; only its obsolete entry action was corrected, preserving its lifecycle and suite placement.

### SPT-4124: Create initial branding configuration for an organization

**Title:** Dashboard - Branding - Create initial branding configuration for an organization

**Description:**

Save one branding choice for an organization with no saved Identity branding. Verify the choice survives reopening and other fields retain their defaults.
Run each BrandingAttribute separately, starting with no saved organization branding for that run.

| BrandingAttribute | Control and input | Visible check after reopening |
| --- | --- | --- |
| Logo | Logo: choose a recognizable 600×200 PNG under 3 MB and select Finish Cropping | The selected logo remains shown. |
| HeaderImage | Header image: choose a recognizable 1200×600 PNG under 5 MB and select Finish Cropping | The selected header image remains shown. |
| PrimaryColor | Primary color: #14595F | The hex value and color swatch match. |
| SecondaryColor | Secondary color: #DD3333 | The hex value and color swatch match. |
| ColorMode | Color mode: Dark | Dark remains selected. |
| LayoutPreset | Layout preset: Hero | Hero remains selected. |
| HeadingFont | Heading font → Google Fonts → Serif → Merriweather | Merriweather remains selected for headings. |
| BodyFont | Body font → Google Fonts → Sans-serif → Inter | Inter remains selected for body text. |
| EmailBackgroundColor | Email background color: #E9E9E9 | The hex value and color swatch match. |
| WillCallDisplayLabel | Display label: Pick up | Pick up remains selected. |


| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Before each run, select an organization with no saved Identity branding. Do not clear an active organization’s branding to prepare it.
* For WillCallDisplayLabel, the organization flag `branding_hub_will_call_display_label` is on.
* Prepare the image specified by the selected BrandingAttribute when testing an image.

**Tags:** dashboard, appearance

**Parameters:**

BrandingAttribute: Logo, HeaderImage, PrimaryColor, SecondaryColor, ColorMode, LayoutPreset, HeadingFont, BodyFont, EmailBackgroundColor, WillCallDisplayLabel

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. |  | Identity opens inside the Dashboard, with Brand assets, Colors & Theme, Typography, Email identity, the enabled delivery-label section, Detail page and Email previews, and one Save button. |
| Set the control listed for the selected BrandingAttribute. | Use the input in the Description table. | The selected value appears in its control; applicable preview content reflects the change. |
| Select Save. |  | Branding configuration saved appears. |
| Open General, then return to Identity and reload the page. |  | The selected value remains shown and unchanged fields retain their default values. |

**Postconditions:**

* Clear only the branding values added for this run, save, and confirm the default appearance. Retain the resulting empty configuration; use a different unconfigured organization for the next initial-creation run.

### SPT-4125: Apply organization branding to event emails

**Title:** Dashboard - Branding - Apply organization branding to event emails

**Description:**

Verify that a received event email uses organization branding when the event and email template do not override it. The Identity preview alone does not prove delivery.
Run each BrandingAttribute once. Record the chosen values before sending the email.

| BrandingAttribute | Organization Identity setup | Check in the received email |
| --- | --- | --- |
| Logo | Save a recognizable 600×200 PNG under 3 MB. | The header logo matches, without distortion. |
| HeaderImage | Save a recognizable 1200×600 PNG under 5 MB. | The email header uses this image when no email-template banner overrides it. |
| BackgroundColor | Set Email background color to #E9E9E9. | The outer email background matches. |
| PrimaryAndSecondaryColor | Set Primary color to #14595F and Secondary color to #DD3333. | The View Your Order button uses #14595F; template links using the secondary color use #DD3333. |
| HeadingFont | Heading font → Google Fonts → Serif → Merriweather. | Main H1/H2 headings use Merriweather where the email client supports external fonts. |
| BodyFont | Body font → Google Fonts → Sans-serif → Inter. | Body text, small text and button labels use Inter where the email client supports external fonts. |
| None | Retain a saved Identity configuration but clear its custom values. | Showpass’s fallback logo, header and readable styles appear; no custom website link appears when Brand website URL is empty. |

Keep at least one other branding field blank for each run and check that it uses the Showpass fallback rather than a broken image or unreadable text.


| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Select a non-template event in this organization with no event or parent-event branding overrides.
* In Dashboard → Manage Events → select the event → Manage → Email Customization, select Purchase Confirmation Email. Reuse its saved customization, or save one with an identifiable subject and message. Its branding overrides and banner image must be empty. Record any template values changed for setup.
* Have a mailbox you control for the preview recipient. For font checks, also have an email client that blocks external fonts; it must still display readable text.

**Tags:** dashboard, appearance, notifications

**Parameters:**

BrandingAttribute: Logo, HeaderImage, BackgroundColor, PrimaryAndSecondaryColor, HeadingFont, BodyFont, None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. |  | Identity opens for the selected organization. |
| Set the organization branding for the selected BrandingAttribute, select Save, and reopen Identity. | Use the Description table. | The selected branding is retained. |
| Open Dashboard → Manage Events → select the prepared event → Manage → Email Customization. Select Purchase Confirmation Email, then Send preview email. Enter the controlled mailbox and confirm sending. | The prepared mailbox. | The preview request completes and the matching email arrives in the mailbox. |
| Open the received email and check the selected attribute and an unset branding field. |  | Both match the expectations in the Description table. |
| For HeadingFont and BodyFont, open the same email in the client that blocks external fonts. |  | Text remains readable using a fallback font, without missing content or a broken layout. |

**Postconditions:**

* Restore the recorded branding, select Save, and reopen Identity to confirm restoration.
* Restore any email-template changes made for setup. Keep the received email as execution evidence.

### SPT-4127: Show email defaults without branding

**Title:** Dashboard - Branding - Show email defaults without branding

**Description:**

Send an event email where the organization, event, parent event and email customization have no branding configuration. Verify the received email uses the Showpass fallback appearance.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Select a non-template event in this organization with no event or parent-event branding overrides.
* In Dashboard → Manage Events → select the event → Manage → Email Customization, select Purchase Confirmation Email. Reuse its saved customization, or save one with an identifiable subject and message. Its branding overrides and banner image must be empty. Record any template values changed for setup.
* Have a mailbox you control for the preview recipient. For font checks, also have an email client that blocks external fonts; it must still display readable text.
* Use an organization, event and email customization with no assigned branding configuration. Do not select Save on Identity during this case.

**Tags:** dashboard, appearance, notifications

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. |  | Default Identity controls and an approximate preview appear without saving new branding. |
| Open Dashboard → Manage Events → select the prepared event → Manage → Email Customization. Select Purchase Confirmation Email, then Send preview email. Enter the controlled mailbox and confirm sending. | The prepared mailbox. | The preview request completes and the matching email arrives in the mailbox. |
| Open the received email. |  | The Showpass logo, default header background and readable fallback fonts appear without broken images; the default Showpass website link is shown. |

**Postconditions:**

* Keep the received email as execution evidence. Restore any email-template changes made for setup; leave all branding unconfigured.

### SPT-4335: Save and use an Adobe font

**Title:** Dashboard - Branding - Save and use an Adobe font

**Description:**

Select an Adobe font for organization email headings or body text, save it, and verify its use in a received email. Repeat for Heading and Body; use a client that supports Adobe web fonts for the custom-font check. Other clients should display readable fallback text.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

| FontUse | Typography field |
| --- | --- |
| Heading | Heading font |
| Body | Body font |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Select a non-template event in this organization with no event or parent-event branding overrides.
* In Dashboard → Manage Events → select the event → Manage → Email Customization, select Purchase Confirmation Email. Reuse its saved customization, or save one with an identifiable subject and message. Its branding overrides and banner image must be empty. Record any template values changed for setup.
* Have a mailbox you control for the preview recipient. For font checks, also have an email client that blocks external fonts; it must still display readable text.
* Have a licensed Adobe Fonts web project enabled for the test domain. Record its Project ID and a Font ID included in that project.

**Tags:** dashboard, appearance, notifications

**Parameters:**

FontUse: Heading, Body

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. In Typography, select Adobe Fonts for the selected FontUse. |  | Project ID and Font ID inputs appear for that font field. |
| Enter both Adobe identifiers and select Save. | The prepared Project ID and Font ID. | Branding configuration saved appears. |
| Leave Identity, return, and reopen the selected font field. |  | Adobe Fonts, the same Project ID, and the same Font ID remain shown. |
| Open Dashboard → Manage Events → select the prepared event → Manage → Email Customization. Select Purchase Confirmation Email, then Send preview email. Enter the controlled mailbox and confirm sending. | The prepared mailbox. | The preview request completes and the matching email arrives in the mailbox. |
| Open the received email in a client that supports Adobe fonts, then in one that blocks external fonts. |  | The selected heading or body text uses the Adobe font in the supporting client; it remains readable with a fallback font in the other client. |

**Postconditions:**

* Restore the recorded branding, select Save, and reopen Identity to confirm restoration.
* Restore any email-template changes made for setup. Keep the received email as execution evidence.

### SPT-5463: Save changes to existing Identity branding

**Title:** Dashboard - Branding - Save changes to existing Identity branding

**Description:**

Edit an organization’s existing Identity settings and verify all edited values survive reopening. For each image, choose the file and select Finish Cropping before saving. Check both preview views; they are approximate and do not send an email.
Verify these controls before editing: Logo; Header image; Primary color; Secondary color; Email background color; Color mode (Light, Dark); Layout preset (Classic, Hero); Heading font and Body font (Google Fonts, Adobe Fonts, Upload fonts); From name; Reply-to email; Brand website URL; Brand website display text; Detail page and Email previews; Save. The delivery Display label (Will Call, Pick up) is present when enabled for the organization.

| Control | Input |
| --- | --- |
| Logo | Recognizable 600×200 PNG under 3 MB |
| Header image | Recognizable 1200×600 PNG under 5 MB |
| Primary color / Secondary color / Email background color | #14595F / #DD3333 / #E9E9E9 |
| Color mode / Layout preset | Dark / Hero |
| Heading font / Body font | Google Fonts: Merriweather from Serif / Inter from Sans-serif |
| From name | Organizer Updates |
| Reply-to email | A mailbox controlled by the organization; record the address |
| Brand website URL / Brand website display text | https://example.com / Visit our website |
| Display label | Pick up |


| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Use an organization with saved Identity branding.
* Organization flag `branding_hub_will_call_display_label` is on.
* Prepare the two images and the controlled Reply-to mailbox listed in the Description.

**Tags:** dashboard, appearance

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. |  | Every control listed in the Description is available with its saved value. |
| Enter the listed values and switch between Detail page and Email previews. | Use the Description table. | The controls show the edits and applicable preview content updates; both previews remain readable. |
| Select Save. |  | Branding configuration saved appears. |
| Open General, return to Identity and reload. |  | Every edited field, both selected fonts, both assets and the delivery label retain the saved values. |

**Postconditions:**

* Restore the recorded branding, select Save, and reopen Identity to confirm restoration.

### SPT-5464: Reject invalid email identity details

**Title:** Dashboard - Branding - Reject invalid email identity details

**Description:**

Attempt to save an invalid Identity value and verify the saved branding is preserved. Run each InvalidField separately.

| InvalidField | Control | Input |
| --- | --- | --- |
| FromName | From name | Organizer <Updates> |
| ReplyTo | Reply-to email | invalid-address |
| Website | Brand website URL | example.com |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Use an organization with saved Identity branding; record the current value of the selected field.

**Tags:** dashboard, appearance, edge-case

**Parameters:**

InvalidField: FromName, ReplyTo, Website

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. |  | The saved Identity values appear. |
| Replace the selected field with its invalid input and select Save. | Use the Description table. | A validation message identifies the invalid value and no save-success message appears. |
| Reload Identity. |  | The selected field still contains its previously saved value. |

**Postconditions:**

* Restore the recorded branding, select Save, and reopen Identity to confirm restoration.

### SPT-5465: Clear a saved Identity value

**Title:** Dashboard - Branding - Clear a saved Identity value

**Description:**

Clear one saved organization branding value and verify it stays cleared while other branding remains unchanged. Run each BrandingField separately.

| BrandingField | Control and clearing action | Expected fallback |
| --- | --- | --- |
| Logo | Remove the selected Logo image | The approximate preview uses the Showpass logo |
| PrimaryColor | Use Reset for Primary color | No custom primary hex value remains; the preview uses its default accent |
| HeadingFont | Select Clear in Heading font | No custom heading font remains; the preview uses a readable fallback |
| ReplyTo | Empty Reply-to email | The custom reply address is blank; the preview uses its default reply address |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Use saved branding with a nonempty value for the selected BrandingField and at least one other nonempty branding field. Record both values.

**Tags:** dashboard, appearance

**Parameters:**

BrandingField: Logo, PrimaryColor, HeadingFont, ReplyTo

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. |  | The selected field and the other recorded branding field show their saved values. |
| Clear the selected BrandingField as described and select Save. | Use the Description table. | Branding configuration saved appears and the applicable preview uses the listed fallback. |
| Open General, return to Identity and reload. |  | The selected value stays cleared and the other recorded field is unchanged. |

**Postconditions:**

* Restore the recorded branding, select Save, and reopen Identity to confirm restoration.

### SPT-5466: Save a Google font from a link or family name

**Title:** Dashboard - Branding - Save a Google font from a link or family name

**Description:**

Choose a Google heading font using its family name or specimen link. Run each FontInput once.

| FontInput | Google Fonts link or family name |
| --- | --- |
| FamilyName | Merriweather |
| SpecimenLink | https://fonts.google.com/specimen/Merriweather |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Use an organization with saved Identity branding.

**Tags:** dashboard, appearance

**Parameters:**

FontInput: FamilyName, SpecimenLink

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. In Heading font, select Google Fonts. |  | Google Fonts link or family name and Use font appear. |
| Enter the selected input, select Use font, then select Save. | Use the Description table. | Merriweather becomes the heading selection and Branding configuration saved appears. |
| Leave Identity, return, and select Email preview. |  | Merriweather remains selected and the preview heading uses it when the font loads. |

**Postconditions:**

* Restore the recorded branding, select Save, and reopen Identity to confirm restoration.

### SPT-5467: Upload and select a licensed font

**Title:** Dashboard - Branding - Upload and select a licensed font

**Description:**

Add a licensed WOFF2 font to the organization’s Media Library, then save it as a heading or body font. Run each FontUse once.

| FontUse | Typography field |
| --- | --- |
| Heading | Heading font |
| Body | Body font |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Use saved Identity branding and a licensed WOFF2 file no larger than 5 MB. Its family, weight and style must not already be in this organization’s font library. Record the file’s family name.

**Tags:** dashboard, appearance

**Parameters:**

FontUse: Heading, Body

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. For the selected FontUse, select Upload fonts → Add or manage fonts in Media Library. |  | Media Library · Fonts opens with its upload control, license checkbox, Add to Media Library and available-font list. |
| Choose the prepared WOFF2 file and leave the license checkbox unchecked. |  | Add to Media Library remains disabled. |
| Confirm that you are licensed to use the font on the web, then select Add to Media Library. |  | One font entry appears with the detected family, weight and style. |
| Close the library, select the uploaded family in the chosen Typography field, and select Save. |  | Branding configuration saved appears. |
| Leave Identity, return, and open Upload fonts for the selected field. |  | The uploaded family remains selected and available. |

**Postconditions:**

* Restore the recorded branding, select Save, and reopen Identity to confirm restoration.
* After restoring the original fonts, delete only the font face uploaded for this run if no other branding or website uses it.

### SPT-5468: Prevent deletion of the last font face in use

**Title:** Dashboard - Branding - Prevent deletion of the last font face in use

**Description:**

Try to delete the only uploaded font face in a family currently saved in the organization’s Identity branding. Verify the font remains available.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Use a licensed font family with exactly one uploaded face. Save that family as Heading font or Body font in Identity; record which field uses it.

**Tags:** dashboard, appearance, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. Select Upload fonts → Add or manage fonts in Media Library for the recorded font field. |  | The referenced font face appears in Available fonts. |
| Select Delete for that face. |  | An error explains that the font is in use and deletion does not succeed. |
| Close and reopen the library, then reopen Identity. |  | The font face remains listed and the recorded Typography field still selects its family. |

**Postconditions:**

* Leave the font and branding unchanged. Restore any branding changed only to prepare this case.

### SPT-5469: Delete an unused uploaded font face

**Title:** Dashboard - Branding - Delete an unused uploaded font face

**Description:**

Delete one uploaded font face that is not used by any branding or website, and verify it stays absent after reopening.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Upload a licensed WOFF2 face solely for this run. Its family must not be selected in organization, event, membership, email or website branding. Record its family, weight and style.

**Tags:** dashboard, appearance

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. Select Upload fonts → Add or manage fonts in Media Library. |  | The prepared unused face is listed. |
| Select Delete for that face. |  | Font face deleted appears and that face disappears. |
| Close and reopen the library. |  | The deleted face remains absent; other previously listed faces remain available. |

**Postconditions:**

* The unused face created for this run remains deleted. No other font or branding is changed.

### SPT-5470: Reject an oversized brand image

**Title:** Dashboard - Branding - Reject an oversized brand image

**Description:**

Select an image exceeding the selected Identity field’s size limit and verify the saved image is preserved. Run each ImageField separately.

| ImageField | Field | File preparation |
| --- | --- | --- |
| Logo | Logo | PNG larger than 3 MB, dimensions 600×200 |
| Header | Header image | PNG larger than 5 MB, dimensions 1200×600 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Events**.
* Organization flags: `branding_hub` on and `enable_organization_settings_nextjs_embed` on.
* Use an organization whose branding may be changed without affecting active sales or customer messages. Record the original branding before changing it.
* Use saved Identity branding with an existing image in the selected field. Prepare the oversized PNG listed in the Description and record the saved image.

**Tags:** dashboard, appearance, edge-case

**Parameters:**

ImageField: Logo, Header

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Identity. |  | The previously saved image appears. |
| Select the oversized file for the selected field. | Use the Description table. | A size-limit error appears and the oversized file is not accepted. |
| Close the image selector if open and reload Identity without saving. |  | The previously saved image remains unchanged. |

**Postconditions:**

* No saved branding should change. Restore the recorded image only if an unexpected change occurred.

## Branding → Profile

### SPT-5444: Save public-profile details

**Title:** Dashboard - Organization - Save public-profile details

**Description:**

Save the public website, descriptions and social links on Profile. This case checks the saved form; customer rendering is separate proof. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Have the organization’s controlled HTTPS website and Facebook, X/Twitter and Instagram profile links. Record the existing Profile fields.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Branding → Profile. |  | Website, Short SEO description, About, Facebook, X / Twitter, Instagram and Save appear. |
| Edit the profile details. | Controlled website and social links; Short SEO description = Profile settings test; About = About this organization. | The fields accept the entries. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Profile. |  | Every edited field retains its value; the About text remains readable. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

## Branding → Messaging

### SPT-5445: Save checkout messaging

**Title:** Dashboard - Organization - Save checkout messaging

**Description:**

Save subscription and checkout-confirmation messages. This proves configuration; it does not prove email delivery. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Record Subscription message and Checkout message.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Branding → Messaging. |  | Subscription message, Checkout message and Save appear. |
| Edit both messages. | Subscription message = Receive organization updates.; Checkout message = Thank you for your purchase. | The single-line subscription copy and checkout content appear. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Messaging. |  | Both messages retain the entered text. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5446: Reject line breaks in subscription messaging

**Title:** Dashboard - Organization - Reject line breaks in subscription messaging

**Description:**

Attempt to save a subscription message containing a line break. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record the saved Subscription message.

**Tags:** dashboard, organizer, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Branding → Messaging. |  | Subscription message appears. |
| Enter a message on two lines. | First line, then a line break, then Second line | The two-line entry appears or the control prevents it. |
| Attempt to select Save. |  | Line-break validation prevents saving the unsupported message. |
| Reload without saving. |  | The original subscription message remains saved. |

**Postconditions:**

* No messaging values change.

## Branding → Emails → Customization

**Reuse SPT-3617–3621, SPT-3626, SPT-4087, SPT-4148, SPT-4836 and SPT-4837.** These cover the eight template choices, preview, validation, deletion and fallback across their supported scopes. Current Next.js field/entry corrections are detailed in the audit below; keep legacy and backend Reply-To coverage. The organization-wide Post-Event switches and messages below are a separate form, not duplicate email-template tests.

## Branding → Emails → Post-Event

### SPT-5447: Save post-event email options

**Title:** Dashboard - Organization - Save post-event email options

**Description:**

Save the organization-wide post-event switch and the message, promotion and review options. Actual scheduled sending and delivered content need the retained email delivery cases. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `thank_you_emails_flag` is on.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Use an organization with no event ending during this test. Record all Post-Event settings.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Branding → Emails → Post-Event. |  | Enable organization-wide post-event email, Message, Include upcoming events, Upcoming event message, Include rating and review request, Review request message and Save appear. |
| Edit the post-event options. | Enable organization-wide post-event email on; Message = Thanks for attending.; Include upcoming events on; Upcoming event message = More events to explore.; Include rating and review request on; Review request message = Share your experience. | The form shows each selected switch and message. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Post-Event. |  | All three switches and all three messages retain the selected values. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

## Branding → Deliverables → Digital Wallets

**2026-10-16 publication verified:** **12 new cases SPT-5502–5513** were created in [Digital wallets (1179)](https://app.qase.io/project/SPT?suite=1179). **SPT-65** was enhanced and moved from 1015; **SPT-4742** was moved from 744 with all content and parameters unchanged. The suite now has **14 direct cases**. Full stored fields, native parameters and destinations were read back and compared with the approved payloads; SPT-4899 was independently verified unchanged. These are published definitions, not executed product tests.

Organization → Branding → Deliverables → Digital Wallets owns this section. The supplied beta route is `/manage/organization/branding/digital-wallets/`. Suite 1179 is under Deliverables (1170). SPT-65 is now in the same suite at the user’s request. The narrower four-step revision of SPT-4742 remains held until its recovery coverage has an executable replacement and the split is explicitly approved. The published eight-step original is retained below alongside that held proposal.

| Responsibility | Published case / held revision |
| --- | --- |
| Edit saved colors and preview | SPT-4742 — replacement held |
| Create a first design | SPT-5502 |
| Save or replace each of the 10 images | SPT-5503 |
| Reject invalid image files | SPT-5504 |
| Restart cropping | SPT-5505 |
| Clear an individual image | SPT-5506 |
| Leave without saving | SPT-5507 |
| Cancel whole-design removal | SPT-5508 |
| Confirm whole-design removal | SPT-5509 |
| Create again after removal, without leaving | SPT-5510 |
| Save only the chosen section | SPT-5511 |
| Switch organizations without showing another design | SPT-5512 |
| Deny saving without Manage Organization Info | SPT-5513 |
| Check configured branding in an actual saved wallet pass | SPT-65 — additive enhancement |
| Update an already installed pass | Reuse SPT-4899; organization-inheritance gap held below |

Form cases select desktop and narrow mobile Dashboard runs through the Description, except the restricted-role case which explicitly selects desktop. These views are not Qase parameters. These are definitions, **not executed passes**. Current browser evidence covers the saved-design screen, opening/cancelling Remove, and the top of the narrow layout; it does not prove save, deletion, permissions, generated assets or native wallets.

### SPT-4742: Digital Wallet Branding Management Flow

**Published content preserved; suite moved to 1179.** Its setup, recovery recipe and postcondition issues remain documented in the gap ledger; this publication did not rewrite them.

**Title:** Dashboard - Branding - Digital Wallet Branding Management Flow

**Description:**

Validates the complete lifecycle of digital wallet branding for a venue. This includes initial form loading, customization of colors and primary images, validation of asset constraints, persistence of advanced branding assets, recovery from save failures, and the removal of existing customizations. This test ensures the branding interface remains functional and accurately reflects the organizer's configuration in the digital pass preview.

**Preconditions:**

* User is logged in as an employee with manage event permissions.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:**

NFCEvent: True, False
OS: iOS, Android

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | Skeletons appear during load. Once loaded, Colors, Images, and Advanced Images sections render. Live preview shows fallback colors and "Your Brand". No "Remove" action is visible. |
| Modify Background, Foreground, and Label colors in the Colors section and click Save |  | A success notification appears and the live preview updates to reflect the new colors. |
| Upload a Logo, Icon, and Strip image in the Images section and click Save | Valid JPG/PNG files | Upload previews appear. The pass preview reflects the new assets. A success notification appears and assets persist after a page reload. |
| Upload unsupported file types or files exceeding size/dimension limits to any image field | Invalid image files | The field displays the specific validation error (e.g., "File too large") and the invalid asset is not saved. |
| Expand the Advanced Images section, upload all available assets, and click Save | Google Wallet Logo, Artwork, Venue Map, Stacked View Logo, Secondary Logo | A success notification appears and all advanced assets persist after a page reload. |
| Simulate a network or server failure and attempt to Save a section |  | An error notification appears; the form is not locked and remains interactive. |
| Resolve the failure and click Save again |  | The save operation succeeds and a success notification is displayed. |
| Click the Remove action and confirm the removal in the modal |  | A confirmation modal titled "Remove digital wallet customization" appears. After confirming, a success notification appears and the page reverts to default preview values. |

**Postconditions:**

* Customization is saved and applied to digital wallet.

> [!todo]- Held focused revision for SPT-4742 — not published
> Keep the published lifecycle intact until its failure/retry replacement and split scope are approved.
>
> ### SPT-4742: Save existing pass colors
>
> **Title:** Dashboard - Digital Wallets - Save existing pass colors
>
> **Description:**
>
> For an organization with a saved design, change its three pass colors and verify both the approximate page preview and the saved values. This checks an existing design; the preview is a sample, not a generated ticket. Run on desktop and narrow mobile Dashboard views.
>
> | Platform | View |
> | --- | --- |
> | Dashboard | Desktop |
> | Dashboard | Mobile |
>
> **Preconditions:**
>
> * Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
> * Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
> * Use a saved digital wallet design; record its three colors and image previews.
>
> **Priority:** Medium
>
> **Tags:** dashboard, branding, wallet
>
> **Parameters:** None
>
> **Steps:**
>
> | Step Action | Data | Expected Result |
> | --- | --- | --- |
> | Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | Colors shows Background color, Foreground color, Label color and Save; Images and Advanced images are available, and Remove is visible. |
> | Choose different colors using the color controls. | Background color #123456; Foreground color #FFFFFF; Label color #FFD700. If any equals its original value, choose #654321 for that field. | The controls retain the selections and the sample pass reflects the background, text and label colors. |
> | Select Save in Colors. |  | A saved confirmation appears. |
> | Leave Digital Wallets and reopen it through the same menu. |  | All three selected colors remain saved; the existing images are unchanged. |
>
> **Postconditions:**
>
> * Restore the recorded values, save the affected section, and reopen it to confirm restoration.

### SPT-5502: Create the first pass design

**Title:** Dashboard - Digital Wallets - Create the first pass design

**Description:**

Start without a saved digital wallet design and save one section. Run each FirstSection value from a fresh no-design starting state; do not use an existing customer organization to obtain that state. The other sections receive their saved defaults, which need not equal the unsaved preview defaults.

| FirstSection | Enter before saving |
| --- | --- |
| Colors | Background color #123456, Foreground color #FFFFFF, Label color #FFD700 |
| Images | Logo: a recognizable 600×140 PNG below 3,000,000 bytes; finish cropping |
| AdvancedImages | Open Advanced images; Google Wallet logo: a recognizable 600×140 PNG below 3,000,000 bytes; finish cropping |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
* An administrator confirms the selected organization has no default digital wallet design; no deletion of a shared design is needed to prepare this case.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:**

FirstSection: Colors, Images, AdvancedImages

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | Colors and Images are editable, Advanced images can be opened, the sample pass appears, and Remove is absent. |
| Enter the values for the selected FirstSection. | Use the mapping in Description. | The chosen values or completed image crop are shown. |
| Select Save in that section. |  | A saved confirmation appears and Remove becomes available. |
| Leave Digital Wallets and reopen it. |  | The new design and the values entered in the selected section are retained. |

**Postconditions:**

* Retain and identify the design created for this run; do not remove a design that has since been used by another workflow.

### SPT-5503: Save one pass image

**Title:** Dashboard - Digital Wallets - Save one pass image

**Description:**

Replace one image and verify that it survives reopening without changing the other images or colors. Run each ImageSlot separately. Use recognizable JPG or PNG files; include both file formats across the selected runs. Every file is below 3,000,000 bytes, except Artwork which may be below 5,000,000 bytes. The table gives the starting image dimensions in pixels. This proves all ten saved form fields; advanced images are not all displayed in the sample pass.

| ImageSlot | Section and field | Prepared image size |
| --- | --- | --- |
| Logo | Images → Logo | 600×140 |
| Icon | Images → Icon | 100×100 |
| Strip | Images → Strip image | 650×200 |
| LogoOneX | Advanced images → Logo (1x) | 300×70 |
| IconOneX | Advanced images → Icon (1x) | 60×60 |
| GoogleLogo | Advanced images → Google Wallet logo | 600×140 |
| Artwork | Advanced images → Artwork image | 716×896 |
| VenueMap | Advanced images → Venue map | 800×450 |
| StackedLogo | Advanced images → Stacked view logo | 252×60 |
| SecondaryLogo | Advanced images → Secondary logo | 270×24 |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
* Use an existing saved design. Record its colors and images, and retain the original file for the selected field so it can be restored.
* Prepare an image visibly different from the original, using the selected row in Description.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:**

ImageSlot: Logo, Icon, Strip, LogoOneX, IconOneX, GoogleLogo, Artwork, VenueMap, StackedLogo, SecondaryLogo

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The existing design opens. |
| Open the selected section and choose the replacement image in the selected field. | Use the ImageSlot mapping. | The image cropping controls appear. |
| Position the crop and select Finish Cropping. |  | The selected image appears in the field preview. |
| Select Save in the selected section. |  | A saved confirmation appears. |
| Leave Digital Wallets and reopen that section. |  | The replacement image remains in its field; the other images and colors match the recorded design. |

**Postconditions:**

* Restore the recorded values, save the affected section, and reopen it to confirm restoration.

### SPT-5504: Reject an invalid image file

**Title:** Dashboard - Digital Wallets - Reject an invalid image file

**Description:**

Keep the saved Logo when an invalid replacement is supplied. Run each InvalidFile value. Large pixel dimensions that can be cropped are not inherently invalid; this case uses a file below the minimum dimensions for its dimension check.

| InvalidFile | File to choose | Expected feedback |
| --- | --- | --- |
| UnsupportedType | PDF below 1,000,000 bytes | File type is not accepted; JPG/PNG guidance is shown |
| TooLarge | A valid 4000×4000 PNG larger than 4,000,000 bytes | File exceeds the allowed size |
| TooSmall | A valid 59×60 PNG below 3,000,000 bytes | Image does not meet the minimum dimensions |
| Unreadable | A file named broken.png below 1,000,000 bytes whose contents are plain text | Image cannot be loaded or processed |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
* Use a saved design with a visible Logo. Record that Logo; prepare the selected invalid file exactly as described.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:**

InvalidFile: UnsupportedType, TooLarge, TooSmall, Unreadable

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The saved Logo is visible in Images. |
| Drop the selected invalid file onto the Logo upload control. | Use the InvalidFile mapping. | The relevant rejection feedback appears and the file is not accepted as a completed crop. |
| Leave Digital Wallets without saving and reopen it. |  | The original saved Logo remains; the rejected file has not replaced it. |

**Postconditions:**

* No saved design was changed.

### SPT-5505: Restart a pending image crop

**Title:** Dashboard - Digital Wallets - Restart a pending image crop

**Description:**

Start replacing the Logo, then use Restart before finishing the crop. Verify that the pending replacement does not remove the saved image.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
* Use a saved design with a Logo. Record that image and prepare a visibly different 600×140 PNG below 3,000,000 bytes.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The saved Logo is shown in Images. |
| Choose the replacement file for Logo. | Prepared PNG. | The cropper shows the new image. |
| Select Restart. |  | The unfinished replacement is cleared and the original saved image is available again. |
| Leave Digital Wallets without saving and reopen it. |  | The original Logo is still saved. |

**Postconditions:**

* No saved design was changed.

### SPT-5506: Clear one saved image

**Title:** Dashboard - Digital Wallets - Clear one saved image

**Description:**

Remove an individual image using its own close control, then save the section. Run both ImageField values: MainLogo means Images → Logo; GoogleLogo means Advanced images → Google Wallet logo. This covers the main and advanced sections without deleting the whole design.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
* Use a saved design with both Logo and Google Wallet logo present. Record all colors and images; retain the original files for restoration.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:**

ImageField: MainLogo, GoogleLogo

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The saved design opens. |
| Open the selected section and select the close control on its saved image. | ImageField MainLogo = Images → Logo; GoogleLogo = Advanced images → Google Wallet logo. | Only the selected field becomes empty. |
| Select Save in that section. |  | A saved confirmation appears. |
| Leave Digital Wallets and reopen it. |  | The selected image field is empty, Remove is still visible, and the other saved values are unchanged. |

**Postconditions:**

* Restore the recorded values, save the affected section, and reopen it to confirm restoration.

### SPT-5507: Leave without saving a color change

**Title:** Dashboard - Digital Wallets - Leave without saving a color change

**Description:**

Change a color and leave without selecting Save. Reopening the page must show the previously saved color.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
* Use a saved design and record its Background color.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The saved Background color is shown. |
| Choose a different Background color. | #123456; use #654321 if #123456 is the saved value. | The control retains the new color. |
| Open another Organization page without selecting Save. |  | The employee leaves Digital Wallets without a saved confirmation. |
| Reopen Digital Wallets through Branding → Deliverables. |  | Background color matches the original saved value. |

**Postconditions:**

* No saved design was changed.

### SPT-5508: Dismiss removal without changing the design

**Title:** Dashboard - Digital Wallets - Dismiss removal without changing the design

**Description:**

Open the whole-design Remove confirmation and dismiss it. Run each DismissAction separately: Cancel selects the Cancel button; Close selects the dialog’s close control.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Use an organization with an existing digital wallet design. Record its colors and image previews.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:**

DismissAction: Cancel, Close

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The saved design and Remove are visible. |
| Select Remove. |  | The “Remove digital wallet customization” dialog explains that passes will use default branding and offers Cancel and Remove. |
| Dismiss the dialog using the selected DismissAction. | Cancel or Close. | The dialog closes and the existing design remains visible. |
| Leave Digital Wallets and reopen it. |  | The saved colors and image previews are unchanged and Remove is still available. |

**Postconditions:**

* No saved design was changed.

### SPT-5509: Remove the saved pass design

**Title:** Dashboard - Digital Wallets - Remove the saved pass design

**Description:**

Confirm removal of an organization’s whole digital wallet design. Verify the no-design page after reopening. This checks removal of the saved configuration; updates to passes already installed on phones require separate proof.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Use an organization reserved for removal testing, with no active sales or issued customer passes.
* An administrator confirms this design is not assigned separately to an event, ticket type, product, variant, membership group or level; deletion can also clear those assignments.
* Record the existing design and retain its image files if it must be restored.

**Priority:** High

**Tags:** dashboard, branding, wallet

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The saved design and Remove are visible. |
| Select Remove. |  | The removal confirmation dialog appears. |
| Select Remove in the confirmation dialog. |  | A removed confirmation appears, the form returns to its no-design appearance, and Remove is absent. |
| Leave Digital Wallets and reopen it. |  | The removed design does not return and Remove remains absent. |

**Postconditions:**

* Retain the no-design state for this reserved organization, or restore the recorded design through the form if restoration was agreed before this run.

### SPT-5510: Create a design again after removing it

**Title:** Dashboard - Digital Wallets - Create a design again after removing it

**Description:**

Create the first design, remove it, and save a new design during the same visit. Do not reload or leave between creation, removal and the second save. This checks whether the page can recover from removing a design it just created.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Use an organization reserved for this run, with no active sales, issued passes or saved digital wallet design.
* No other employee changes this organization’s digital wallet design during the run.

**Priority:** High

**Tags:** dashboard, branding, wallet

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | Remove is absent. |
| Set Background color and select Save in Colors. | #123456. | A saved confirmation appears and Remove becomes available. |
| Select Remove and confirm Remove in the dialog. |  | A removed confirmation appears and Remove becomes unavailable. |
| Without leaving or reloading, set a new Background color and select Save in Colors. | #654321. | A saved confirmation appears and Remove becomes available again without a missing-design error. |
| Leave Digital Wallets and reopen it. |  | Background color is #654321 and the newly saved design is retained. |

**Postconditions:**

* Retain and identify the final design created for this run.

### SPT-5511: Save only the chosen section

**Title:** Dashboard - Digital Wallets - Save only the chosen section

**Description:**

Change Colors without saving, then save a Logo replacement in Images. Reopening must retain the image change while keeping the original saved color.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permissions: **Manage Events** to open this page and **Manage Organization Info** to save or remove a design; complete additional account verification if requested.
* Select an organization reserved for these changes, with no active sales or customer passes that would be affected by branding edits.
* Use an existing design. Record Background color and Logo; retain the original Logo file.
* Prepare a visibly different 600×140 PNG below 3,000,000 bytes.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The recorded saved values appear. |
| Choose a different Background color without selecting Save in Colors. | #123456; use #654321 if already saved as #123456. | The unsaved color is shown. |
| Replace Logo, finish cropping, and select Save in Images. | Prepared PNG. | The image is accepted and a saved confirmation appears. |
| Leave Digital Wallets and reopen it. |  | The replacement Logo is saved and Background color still has its original saved value. |

**Postconditions:**

* Restore the recorded values, save the affected section, and reopen it to confirm restoration.

### SPT-5512: Show the selected organization’s design

**Title:** Dashboard - Digital Wallets - Show the selected organization’s design

**Description:**

Switch between two organizations with different saved designs. Each visit must show only the selected organization’s colors and images, including after returning to the first organization.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* The employee belongs to two organizations and has Manage Events and Manage Organization Info in each.
* Select two existing organizations with visibly different saved wallet designs. Record each organization’s name, colors and image previews.

**Priority:** Medium

**Tags:** dashboard, branding, wallet

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Choose the first organization in the Organization selector and open Dashboard menu → Settings → Organization Info → Branding → Deliverables → Digital Wallets. |  | The first organization’s recorded design is shown. |
| Choose the second organization and open its Digital Wallets page through the same menus. |  | The second organization’s recorded design is shown; the first design is not left in the form. |
| Choose the first organization again and reopen its Digital Wallets page. |  | Its original design is shown again without values from the second organization. |

**Postconditions:**

* No settings were saved in either organization.

### SPT-5513: Refuse saving without Manage Organization Info

**Title:** Dashboard - Digital Wallets - Refuse saving without Manage Organization Info

**Description:**

An employee with Manage Events but without Manage Organization Info must not save wallet changes. The current page and save service require different permissions, so this case checks the actual refusal and the saved values. Direct access is intentional here because permission enforcement is the behavior under test. Run in a desktop Dashboard browser.
**Preconditions:**

* The employee has Manage Events but no Manage Organization Info, unrestricted role, or other role granting organization edits in the selected organization.
* Use an organization reserved for this permission check, with no active sales or customer passes. Record its saved Background color.
* An authorized employee with both permissions can independently read the saved design and restore it if the permission check unexpectedly changes it.

**Priority:** High

**Tags:** dashboard, branding, wallet

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the restricted employee, choose the organization and open its Digital Wallets page. | Use the visible Organization settings menus; if unavailable, open /manage/organization/branding/digital-wallets/ to check direct access. | The employee is either denied the page or can view it; viewing alone does not grant permission to save. |
| If the form is available, choose a different Background color and select Save in Colors. | #123456; use #654321 if already saved as #123456. | Saving is unavailable or refused; no saved confirmation is shown. |
| As the authorized employee, reopen Digital Wallets for the same organization. |  | The recorded original Background color remains saved. |

**Postconditions:**

* If saving unexpectedly succeeded, record the permission failure and have the authorized employee restore the original color.

### SPT-65: Add single item to digital wallet

**Title:** Core - User - My Orders - Add single item to digital wallet

**Description:**

Add one eligible item to the phone’s actual wallet and verify its saved branding and identity. Run every ItemType with each OS: eight runs. Ticket with both OS values and NFCTicket with both OS values preserve the ordinary/NFC and iOS/Android selections from the existing branding lifecycle case. A provider confirmation or sample page preview is not an installed-pass result.

| ItemType | Item required |
| --- | --- |
| Ticket | One paid, unused ticket for a future event with ordinary barcode delivery |
| Product | One paid, unused product item eligible for digital wallet delivery |
| Memberships | One active membership eligible for digital wallet delivery |
| NFCTicket | One paid, unused NFC-only event ticket; NFC means phone tap admission rather than a static barcode |

| OS | Device and expected organization branding |
| --- | --- |
| iOS | A supported iPhone with Apple Wallet; background, foreground and label colors plus the configured Apple logo and strip in the supported pass layout |
| Android | A supported Android phone with Google Wallet; configured background color and Google Wallet logo, with the configured strip where the pass layout displays it |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

Use at least one event run with different phone and event timezones. Record both zones and the expected event-local date/time before adding the pass. Record OS version and Apple layout switch state; advanced iOS 18 image placement is a separate physical-device check.
**Preconditions:**

* The customer owns an order containing exactly one selected eligible item. It is usable, has pass data available, and has not been transferred or listed for resale.
* The customer is signed into My Orders on the selected phone and can complete the real provider Add flow.
* An employee with Manage Events and Manage Organization Info has saved an organization design containing recognizable Apple and Google logos, a strip and distinct recorded colors. Use an organization reserved for these branding checks, without affected real customer passes.
* An administrator confirms the selected item inherits the organization’s design: no separate design is assigned to its event/ticket type, product/variant, or membership group/level.
* For NFCTicket, the organization setting enable_use_nfc_ticket is on, enable_order_barcode is off, and the event was set to is_nfc_pass_only before its tickets were sold. These are saved settings, not a page visibility flag.
* The selected item is not already installed in the phone’s wallet. Record its identity, displayed date/time and seat where relevant, plus the saved branding expected for the chosen OS.

**Tags:** my-orders, wallet, barcodes

**Parameters:**

ItemType: Ticket, Product, Memberships, NFCTicket
OS: iOS, Android

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the customer, open My Orders and choose the order containing the selected item. |  | The correct order and its one eligible item appear. |
| Select Add to Apple Wallet or Add to Google Wallet for that item. | Use the provider for the selected OS. | The correct provider’s save flow opens with that item’s details; NFC Google Wallet access uses the signed-in customer’s flow. |
| Complete the provider’s Add action. |  | The item is saved in the phone’s actual wallet. |
| Open the saved item in Apple Wallet or Google Wallet. |  | The item shows the recorded organization colors and provider-specific branding for the selected OS, rather than another organization’s or an older design. |
| Compare the pass details with the purchased item. | Recorded item, date/time and seat where relevant. | Identity and date/time match the item; a selected NFC-only ticket does not expose a static entry barcode. |
| Return to My Orders and reopen the order. |  | The original item remains accessible; one intended pass has been saved for it. |

**Postconditions:**

* Retain the order and evidence; remove only this run’s installed pass from the controlled phone after recording the result.
* Restore any organization branding changed solely for this run and reopen the form to confirm restoration.

## Digital Wallets — coverage and evidence (2026-10-16)

### Qase publication — verified

The approved destination is **Digital wallets (1179)** under **Deliverables (1170)**. The suite had zero direct cases before publication and now has **14**. All approved writes completed: **SPT-5527–77 → SPT-5502–5513**, SPT-65 enhanced and moved, and SPT-4742 moved without changing its content. [Full-content verification and preserved-field evidence](evidence/digital-wallets-2026-10-16/qase-publication-verified.json) records the readback. Do not rerun the create plan.

All rows below target 1179. Tags **D** = dashboard, branding, wallet; **C** = my-orders, wallet, barcodes. Existing native parameters, priority and unrelated metadata were preserved. The table retains approved local labels and maps them to the assigned IDs.

| Approved label / saved ID | Action | Exact title | Suite | Parameters | Steps | Tags |
| --- | --- | --- | --- | --- | --- | --- |
| SPT-5527 → SPT-5502 | Created | Dashboard - Digital Wallets - Create the first pass design | 1179 | FirstSection: Colors, Images, AdvancedImages | 4 | D |
| SPT-5528 → SPT-5503 | Created | Dashboard - Digital Wallets - Save one pass image | 1179 | ImageSlot: Logo, Icon, Strip, LogoOneX, IconOneX, GoogleLogo, Artwork, VenueMap, StackedLogo, SecondaryLogo | 5 | D |
| SPT-5529 → SPT-5504 | Created | Dashboard - Digital Wallets - Reject an invalid image file | 1179 | InvalidFile: UnsupportedType, TooLarge, TooSmall, Unreadable | 3 | D |
| SPT-5530 → SPT-5505 | Created | Dashboard - Digital Wallets - Restart a pending image crop | 1179 | None | 4 | D |
| SPT-5531 → SPT-5506 | Created | Dashboard - Digital Wallets - Clear one saved image | 1179 | ImageField: MainLogo, GoogleLogo | 4 | D |
| SPT-5532 → SPT-5507 | Created | Dashboard - Digital Wallets - Leave without saving a color change | 1179 | None | 4 | D |
| SPT-5533 → SPT-5508 | Created | Dashboard - Digital Wallets - Dismiss removal without changing the design | 1179 | DismissAction: Cancel, Close | 4 | D |
| SPT-5534 → SPT-5509 | Created | Dashboard - Digital Wallets - Remove the saved pass design | 1179 | None | 4 | D |
| TC-74 → SPT-5510 | Created | Dashboard - Digital Wallets - Create a design again after removing it | 1179 | None | 5 | D |
| TC-75 → SPT-5511 | Created | Dashboard - Digital Wallets - Save only the chosen section | 1179 | None | 4 | D |
| TC-76 → SPT-5512 | Created | Dashboard - Digital Wallets - Show the selected organization’s design | 1179 | None | 3 | D |
| TC-77 → SPT-5513 | Created | Dashboard - Digital Wallets - Refuse saving without Manage Organization Info | 1179 | None | 3 | D |
| SPT-65 | Enhanced + moved | Core - User - My Orders - Add single item to digital wallet | 1015 → 1179 | ItemType: Ticket, Product, Memberships, NFCTicket; OS: iOS, Android | 6 | C |
| SPT-4742 | Moved only | Dashboard - Branding - Digital Wallet Branding Management Flow | 744 → 1179 | NFCEvent: True, False; OS: iOS, Android | 8 | D |

SPT-65 changed only Description, Preconditions, Postconditions, Steps and suite_id. SPT-4742 changed only suite_id, preserving all eight existing steps and its original parameters; the narrower local replacement was **not** part of this batch. SPT-4899 and all other neighboring cases remain unchanged in their current suites. No case or suite was deleted. The user-approved move supersedes the earlier owning-suite recommendation for SPT-65. Test execution and actual installed-pass updates remain unperformed.

**Intent:** an authorized employee can create, edit and remove the selected organization’s wallet design without changing unrelated sections or organizations; customers receive the correct saved branding without losing the item’s identity or admission information. The important downstream boundary is a real saved pass, followed separately by later pass updates. Form success alone is insufficient.

### Preserve existing coverage when splitting SPT-4742

The full fetched definitions, parameters, tags, metadata and assertions for all 13 related cases are preserved in [the read-only Qase baseline](evidence/digital-wallets-2026-10-16/qase-coverage-baseline.json). SPT-4742 content remains unchanged after its suite move. Proposed SPT-4742 title, description, setup, steps and postconditions would narrow its responsibility; the old NFCEvent × OS parameters would move to the existing SPT-65 Ticket/NFCTicket × OS runs. **Do not apply that narrowing until its full scope is explicitly approved and the blocked recovery replacement is ready.** Preserve existing priority/type/behavior/layer and unrelated metadata when preparing any eventual update. SPT-65 has priority 4 in Qase; its applied update changed only description, preconditions, postconditions, steps and suite_id, retaining its title, priority, tags and native parameters exactly.

| Original SPT-4742 assertion | Proposed home / status |
| --- | --- |
| Initial page, loading, no Remove | SPT-5502 published; execution pending; no Remove applies only with no saved design. Loading skeletons are source-defined, not a reliable mandatory observation on a fast request. |
| Colors, live preview, save | Proposed SPT-4742; persistence added. Live color-control attempt was inconclusive; no confirmed preview defect. |
| Three primary image uploads | SPT-5503 Logo/Icon/Strip; page preview only represents supported main images. |
| Invalid type, size, dimensions | SPT-5504; a crop-capable large image must not automatically be expected to fail. Exact boundary matrix deferred to component/backend checks. |
| Advanced images persist | SPT-5503 includes all seven advanced fields, adding Logo (1x) and Icon (1x) missing from the old step’s data. |
| Failed Save then retry | **Blocked replacement:** agree and verify a safe failure setup that fails the save before completion, plus how to independently establish the saved result before retry. No invented server fault or live disruption. Original steps remain in Qase. |
| Whole-design Remove | SPT-5509; cancellation SPT-5508 and same-visit recreation SPT-5510 added. Postcondition is no saved design, not “customization saved.” |
| iOS/Android × ordinary/NFC behavior | Published additive SPT-65 enhancement keeps all original SPT-65 item and OS selections; four ticket runs carry this selection without adding Dashboard parameters. |
| “Applied to digital wallet” | Actual native-pass assertions in published SPT-65; page preview alone cannot prove this. |

### Related-case comparison and remaining accounting

| Proof target | Full-field comparison / disposition | Evidence status |
| --- | --- | --- |
| Customer Add to Wallet and identity | SPT-65 enhanced rather than duplicating installation. The published fields now require a real installed pass and explicit branding; existing item/OS coverage is retained. | Published definition; actual devices not executed. |
| Thank-you entry | Keep SPT-548; provider/install and identity assertions exist, but no configured-brand assertion. Do not duplicate that entry in this page review. | Not executed here. |
| Seat and date accuracy | Keep SPT-2924 and SPT-4346; the latter has inconsistent OverrideType/NoOverride naming and still needs its own readability repair. SPT-4372 owns transferred custom dates. | Related definitions, not full branding coverage. |
| NFC pass properties and communications | Keep SPT-3368/3369; neither explicitly compares organization branding. SPT-98 owns no wallet action on Upcoming; SPT-4129 owns multiple NFC passes. | Not executed here; no NFC reader proof. |
| Multiple items and order independence | Keep SPT-3794/4129; correct per-item generation is covered by definition, without explicit branding inheritance assertions. | Deferred branding variation; no new duplicate. |
| Exchanges and old pass validity | SPT-94 covers exchange barcode/NFC state, outside a form edit. | Retained; not executed. |
| Already installed pass refresh | Reuse SPT-4899 (AppleWallet/GoogleWallet × EventTicket/Membership). Existing steps update ticket/event/venue data then wait/refresh, but do not explicitly require **organization-only inheritance**. | **Enhancement held:** name the supported completion window/evidence and choose inherited versus explicitly assigned designs. Preserve all four existing combinations and other supported update types; do not replace this lifecycle with first installation. |
| Refresh when organization default changes | Backend regeneration enumerates child objects with an explicit customization assignment; no organization-inheriting population is enumerated in the reviewed fan-out. | Source-backed selection gap, **not live-confirmed**. Dedicated inherited-item run of SPT-4899 needed; an explicit child-assignment run is not a substitute. |
| Remove and existing pass refresh | API deletion has no matching regeneration hook in the reviewed viewset. Deletion clears references through SET_NULL, potentially beyond the organization default. | Source-backed risk; removal’s promised effect and existing-pass timing require confirmation before a new end-to-end expectation. SPT-5509 proves configuration removal only. |
| First save from each section; all 13 inputs | SPT-5502 + held SPT-4742 revision + SPT-5503 cover three colors and ten image fields. | Published creation/image definitions; focused color revision held; execution pending. |
| Pending crop, individual clear, unsaved values | SPT-5505/5506/5507; SPT-5511 proves only the selected section saves. | Published definitions; execution pending. |
| Cross-organization display and restricted writes | SPT-5512/75. Page permission uses Manage Events; create/update/delete API uses Manage Organization Info. | Source-confirmed permission mismatch, actual role behavior unexecuted. Record a UX defect separately if an employee is offered an unusable Save. |
| Concurrent section saves / first-save duplicate creation | Hook serializes saves and retains the new ID. Existing hook assertions reviewed, not run. | Deferred focused hook/backend execution; manual rapid-click timing is insufficient proof of one record. |
| Failed save/delete, list failure, delayed load | Original SPT-4742 carries generic save failure/retry. Actual list failure must not be confused with no design. Failed Delete must preserve the old design. | Blocked controlled failure setup; no runnable fault recipe invented. |
| Field validation boundaries | UI uses 3,000,000/5,000,000 bytes; backend uses MiB. Venue map UI caps 4000×4000; backend has no explicit maximum. Backend shared image field also permits SVG while this page selects JPG/PNG. | Deferred API/component boundary execution. SPT-5504 is representative coverage, not every field/limit pair. |
| Malformed or empty colors | The color picker supplies color values; direct malformed/empty input needs a verified editable control or API recipe. | Deferred component/API validation; not represented as a runnable manual case. |
| No design defaults and image fallback | Frontend unsaved color defaults differ from model defaults. Effective pass images can fall back through item, organization, branding and bundled assets. Default lookup selects is_default, not the first record. | Deferred exact default/fallback matrix and multiple-design selection. Do not infer generated fallback from the sample preview. |
| iOS 18 advanced assets | Global Waffle switch **enable_apple_new_event_ticket** enables extra Apple assets in generation; this is separate from NFC settings. Current backend includes Stacked view logo, Secondary logo, Artwork and Venue map, with fallbacks. | Manual-only physical-device proof on a supported Apple layout; not established by saved upload previews. Missing exact device/layout selection blocks treating all advanced placements as passed. |
| Image icon/notification, cropping output and privacy | Saved form is SPT-5503; sample preview is approximate. Actual notification icon and generated file contents require platform/file evidence. | Deferred device/provider-specific asset proof; no notification/job triggered. |
| Responsive, keyboard and color control behavior | Desktop and narrow view selections in cases. Screenshot proves only top-of-page narrow layout, not all fields or saving. | Full narrow execution, keyboard/focus and color-picker accessibility deferred; control fill/revert observation inconclusive. |
| Retained Dashboard access | Existing SPT-4742 now uses Settings → Organization Info → Branding → Deliverables. Standing navigation review still starts from the ordinary Dashboard landing page. | Current wallet screenshot proves direct route only; full retained-dashboard menu journey not re-executed here. No claim that all migration access is preserved. |
| Save cleanup and safety | Restoration is included per case; destructive design removal requires no affected customers or separately assigned objects. | Execution and restoration not performed; the inspected shared beta design was left unchanged. |
| Financial transactions and admission | No price/charge/refund changes are introduced by this form; installation does not prove entry. | Financial execution not applicable to this form scope; physical NFC/scan admission stays in its owning suite. |

### Source and query evidence

* The reusable Qase Markdown parser was checked locally: **14 definitions, 57 step rows**, complete descriptions/setup/results/cleanup and expected parameter mappings; no Qase requests or write plan were used by this parser check. Local draft labels skip numeric suffix 65 to avoid ambiguous selection with SPT-65. This is format validation, not an API dry-run or product execution.

* Qase project **SPT**, retrieved **2026-10-16T17:45:28.578068+00:00**: **1965 records, 1965 unique IDs, 20 pages**, stable reported total and successful responses. Complete across the snapshot, not a claim about later Qase changes. Filter all stored fields with `digital.wallet|wallet.brand|wallet.custom|pkpass|apple.wallet|google.wallet` (case-insensitive); **13 matches**, all full case fields/assertions reviewed: **65, 94, 98, 548, 2924, 3368, 3369, 3794, 4129, 4346, 4372, 4742, 4899**. Keyword coverage cannot prove the absence of a differently named, unrelated-field case. This was the pre-publication baseline; the later approved writes and exact-case readback are recorded above.
* Backend revision **b5f397a0438910435e0d537f47e12d6064d7e019**; frontend revision **f1acf48189e6f783b1e31e5cd218f679dab1d92e**. No PR/branch was supplied for this wallet review; this is current-source scope, not an exact diff review. These revisions do not establish beta’s deployed build.
* Backend: `web-app/apps/venues/models/venue_management/digital_wallet_customization.py`; `apps/venues/api/venue_based/{serializers,viewsets}/wallet.py`; `apps/venues/services/branding/save_digital_wallet_customization.py`; `apps/core/digital_wallet_customization/{hierarchy_loader,resource_loaders}.py`; `apps/integrations/services/digital_wallet/{digital_wallet_customization_pass_regeneration,digital_wallet_pass_regeneration_scheduling,issued_digital_wallet_pass_synchronization}.py`; `apps/core/pkpass/services/pass_creation/builder.py`; `apps/core/api/fields/media.py`; `apps/core/models/fields.py`; `apps/venues/constants/employment.py`; `apps/tickets/models/event_management/event.py`. Paths are relative to the backend repository documented in [[01 Repositories/Backend - web-app]].
* Frontend: under `showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/`, reviewed Digital Wallets page, `digital-wallets/hooks/useDigitalWalletCustomization.ts`, form, preview, and `constants/branding-config.ts`; also reviewed the Next page permission binding and shared image/crop/FormSection controls. `createdIdRef` is retained across deletion in the current hook, so SPT-5510 targets a specific source risk rather than a demonstrated beta defect.
* Existing backend wallet API/save-service/regeneration tests and frontend hook assertions were reviewed as definitions. No test suite, build, local server, benchmark or live mutation was run for this review. Playwright filename inspection found no focused wallet file; that does not establish absence of wallet assertions elsewhere.
* Handbook sections applied: [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale|delivery and native-wallet proof]], [[00 Start Here/Showpass QA Handbook/Playbooks/12 Permissions Ownership and Authentication|employee authority and organization isolation]], and [[00 Start Here/Showpass QA Handbook/05 Failure and Recovery|safe failure and recovery]].

### Retained browser smoke evidence

Already-open Codex beta session; signed-in display name Christian Valdez, selected organization **FAN EXPO Cleveland**. This identifies the inspected session, not a required reusable test record. Observed an existing design, three color fields, all ten image fields, per-section Save, Remove and the approximate preview. The recorded design had Background #f96c24, Foreground #ffffff and Label #000000; these are observations, not expected defaults.

* [Saved-design desktop](evidence/digital-wallets-2026-10-16/existing-design-desktop.png): primary Logo empty, saved Icon/Strip present. No image was uploaded or cleared.
* [Remove confirmation](evidence/digital-wallets-2026-10-16/remove-confirmation.png): title and default-branding warning visible. Cancel closed the dialog; removal was never confirmed.
* [Narrow layout](evidence/digital-wallets-2026-10-16/mobile-layout.png): 390×844 viewport; top controls visible. Viewport override was reset; whole-page narrow usability remains unexecuted.
* An attempted color-control fill reverted on blur; it did not establish a normal-user preview defect. No Save was selected. No organization switch, role change, purchase, deletion, generated-pass download, provider action or physical-device check was performed. The shared saved design remained unchanged.

**Readiness:** case design and duplicate review completed for the page; configuration persistence, permission execution, native pass appearance and the two blocked lifecycle/failure areas remain unproven. This review does not establish production readiness. All 12 new definitions and the approved existing-case changes are published and verified; held lifecycle/recovery work remains unchanged.

## Branding → Deliverables → Ticket settings

### SPT-5448: Save ticket PDF branding

**Title:** Dashboard - Organization - Save ticket PDF branding

**Description:**

Save the organization’s ticket-PDF message and image fields. This proves the saved form, not a generated PDF. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Events**.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Record the ticket settings. Prepare a 500×500 PNG ticket logo and two different 520×500 PNG ad images, each containing a recognizable test label.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Branding → Deliverables → Ticket settings. |  | Custom ticket message, Ticket logo, Ad image, Ad image 2 and Save appear. |
| Edit the message and select the prepared images. | Custom ticket message = Ticket PDF settings test; prepared PNG images | The message and all three image previews appear. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Ticket settings. |  | The message and all three image previews retain the saved content. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

## Integrations → Analytics

### SPT-5449: Save organization analytics settings

**Title:** Dashboard - Organization - Save organization analytics settings

**Description:**

Save organizer analytics using approved sandbox destinations. Google Tag Manager is conditional. Saving tracking IDs does not prove delivery of analytics events. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Employee also has **Manage Integrations** so Analytics is visible.
* Use an organization whose settings may be changed without affecting active sales or customer messages. Record the fields being changed.
* Have approved sandbox Facebook Pixel and matching Conversions API token, Google Analytics 4 Measurement ID and Google Ads ID. If `google_tag_manager_flag` is on for the organization, have its sandbox GTM ID. Keep credentials out of screenshots and run comments.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Integrations → Analytics. |  | Facebook Pixel, Facebook Conversions API access token, Google Analytics 4 and Google Ads appear; Google Tag Manager appears only with its flag on. |
| Enter the approved sandbox analytics values. | Prepared sandbox values | Values match their required formats and the matching Pixel/token pair is used. |
| Select Save. |  | A success message appears. |
| Leave the page and reopen Analytics. |  | The saved editable fields retain the approved values. If GTM is hidden, its saved configuration has not been cleared. |

**Postconditions:**

* Restore the recorded settings, save, and reopen to confirm restoration.

### SPT-5450: Reject an invalid analytics ID

**Title:** Dashboard - Organization - Reject an invalid analytics ID

**Description:**

Attempt to save one malformed analytics ID while keeping all other values unchanged. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Employee also has **Manage Integrations**. Record the current analytics values without copying secrets into evidence.

**Tags:** dashboard, organizer, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Integrations → Analytics. |  | Google Analytics 4 is visible. |
| Edit Google Analytics 4. | bad-id | The malformed ID appears. |
| Attempt to select Save. |  | The required G- format is explained and the invalid ID is not saved. |
| Reload without saving. |  | The saved analytics configuration remains unchanged. |

**Postconditions:**

* No analytics values change.

## Integrations → API allowlist

### SPT-5451: Add an API allowlist domain

**Title:** Dashboard - Organization - Add an API allowlist domain

**Description:**

Add one extra domain permitted to use the Showpass API. This is an API allowlist entry, separate from a branded custom domain. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Employee also has **Manage Integrations** so API allowlist is visible.
* Have a controlled HTTPS test domain that is not already listed and is not used by a live integration. Record its URL.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Integrations → API allowlist. |  | API allowlist domains, a URL field, Add and the existing domain list appear. |
| Enter the controlled test URL and select Add. | Prepared HTTPS URL | Domain added appears and one row contains the URL. |
| Leave the page and reopen API allowlist. |  | The added URL remains listed once; existing entries remain. |

**Postconditions:**

* Remove only the extra allowlist entry created for this case after recording its result.

### SPT-5452: Remove an API allowlist domain

**Title:** Dashboard - Organization - Remove an API allowlist domain

**Description:**

Remove one extra domain that was created solely for this test. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Employee also has **Manage Integrations**.
* Prepare an extra HTTPS allowlist entry owned by this test and not used by a live integration. Record its URL and a comparison entry.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Integrations → API allowlist. |  | The prepared and comparison entries appear. |
| Select Remove for the prepared URL. | Prepared URL | Domain removed appears and the chosen row disappears. |
| Leave the page and reopen API allowlist. |  | The chosen URL stays absent; the comparison entry remains unchanged. |

**Postconditions:**

* Keep the prepared URL removed; do not remove other domains.

### SPT-5453: Reject an invalid allowlist URL

**Title:** Dashboard - Organization - Reject an invalid allowlist URL

**Description:**

Try adding a value without a supported HTTP or HTTPS URL. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Employee also has **Manage Integrations**. Record the existing allowlist entries.

**Tags:** dashboard, organizer, edge-case

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Integrations → API allowlist. |  | The URL field and Add appear. |
| Enter the invalid URL and select Add. | not-a-url | Enter a valid http or https URL appears; no row is added. |
| Leave the page and reopen API allowlist. |  | The original entries remain unchanged. |

**Postconditions:**

* No allowlist entry is created.

## Integrations → Domains

SPT-5461/5462 below were published from TC-54/55 after the audit found no direct custom-domain cases. Ownership verification, DNS routing, SSL, website connection/disconnection and deletion still need distinct proof; API allowlist cases do not cover them.

### SPT-5461: Show an empty custom-domain list

**Title:** Dashboard - Organization - Show an empty custom-domain list

**Description:**

Open Domains for an organization with no custom domains, then inspect and cancel the Add domain form. API allowlist entries are separate and must not populate this list.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_domains` is on.
* Select an organization with no custom domains. It has an existing extra API allowlist entry; record that URL.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Integrations → Domains. |  | No domains found, Add your first custom domain and Add domain appear; the API allowlist entry is not listed. |
| Select Add domain. |  | The form contains Domain, Add domain and Cancel. |
| Select Cancel. |  | The form closes and the empty custom-domain list remains. |

**Postconditions:**

* No domain or allowlist entry is created or changed.


### SPT-5462: Add a custom domain

**Title:** Dashboard - Organization - Add a custom domain

**Description:**

Add one organization-controlled test subdomain and verify it is saved separately from API allowlist entries. This proves registration of the hostname only; DNS ownership, website connection and HTTPS readiness need separate tests.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The organization-scoped flag `enable_custom_domains` is on.
* Have an unused test subdomain owned by the organization, with no live website or existing Showpass custom-domain registration. Record the exact hostname. No Showpass ownership-verification TXT record is published for it. Creating this entry starts an automatic DNS check.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Integrations → Domains and select Add domain. |  | The Domain form appears. |
| Enter the owned subdomain and select Add domain. | Prepared hostname, for example an unused test subdomain under the organization’s own domain | The saved domain’s detail page opens and shows the same hostname with How to verify your domain instructions. |
| Return to Domains and reload. |  | Exactly one custom-domain entry exists for the hostname and shows Not connected. |
| Open Integrations → API allowlist. |  | The custom hostname has not been added as an extra API allowlist entry. |

**Postconditions:**

* Keep this test domain unconnected and record its hostname for cleanup by the organization’s domain owner. Do not publish DNS records or connect it to a live website.



## Settings → Access and navigation

### SPT-5454: Restrict settings to the permitted employee

**Title:** Dashboard - Organization - Restrict settings to the permitted employee

**Description:**

An employee without Manage Organization Info must not edit organization settings. The permitted employee prepares the comparison and checks the saved values afterward. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Use an employee who can sign in to this organization but lacks **Manage Organization Info**, **Manage Financials** and full administrator access. A separate permitted employee records General and Contact settings and copies their page links.

**Tags:** dashboard, organizer, employee-permissions

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in to Dashboard as the restricted employee and inspect Organization navigation. |  | General and Contact settings are not offered for editing. |
| Open the General and Contact page links copied during setup. |  | The employee cannot access editable settings or save organization changes. |
| As the permitted employee, reopen General and Contact. |  | The recorded saved values remain unchanged. |

**Postconditions:**

* No organization settings change.

### SPT-5455: Discard an unsaved General edit

**Title:** Dashboard - Organization - Discard an unsaved General edit

**Description:**

Leave an edited form without saving and verify that the saved values remain. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Record Organization name and Internal info.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → General. |  | The recorded saved values appear. |
| Edit Internal info without selecting Save. | Unsaved settings text | The unsaved text is displayed. |
| Reload the page; choose to leave without saving if the browser asks. |  | The recorded saved Internal info appears again; the unsaved text is absent. |

**Postconditions:**

* No saved organization settings change.

### SPT-5456: Keep settings within the selected organization

**Title:** Dashboard - Organization - Keep settings within the selected organization

**Description:**

Save an edit in one organization, switch organizations and verify the second organization’s settings are untouched. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* The employee has Manage Organization Info in two organizations, A and B, whose Internal info values are different. Both may be used for this test without affecting sales. Record both organization names and Internal info values.

**Tags:** dashboard, organizer

**Parameters:** None

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select organization A and open Dashboard → Organization → Organization settings → General. |  | Organization A’s recorded settings appear. |
| Change Internal info and select Save. | Organization A settings test | The save succeeds for organization A. |
| Use the organization selector to choose organization B and reopen General. |  | Organization B retains its recorded name and Internal info. |
| Select organization A and reopen General. |  | Only organization A contains the saved edit. |

**Postconditions:**

* Restore organization A’s Internal info and reopen to verify. Leave organization B unchanged.

### SPT-5457: Open settings through the legacy entry

**Title:** Dashboard - Organization - Open settings through the legacy entry

**Description:**

Verify which settings page opens at /dashboard/venues/edit/. The organization-scoped enable_organization_settings_nextjs_embed flag off selects Angular; on selects the new settings embed. This case checks entry behavior only. Run on the new Organization page in desktop and narrow mobile Dashboard views.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* A setup owner prepares `enable_organization_settings_nextjs_embed` for the selected organization: Legacy = off; New embed = on. Record its original state. The employee does not change the flag during the case.

**Tags:** dashboard, organizer

**Parameters:**

EntryVersion: Legacy, New embed

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the organization’s legacy settings entry. | /dashboard/venues/edit/ | EntryVersion Legacy shows Organization Info with Basic Info and legacy tabs; New embed shows the modern General settings form. |
| Inspect the organization name, timezone and navigation. |  | The selected organization’s saved values appear; the available sections match the selected presentation, without an access error. |

**Postconditions:**

* No settings change. Restore the original flag through the setup owner if it was changed for execution.

## Legacy Organizer Info — finance parity cases (published)

The following **five existing-case updates and18 new cases** define focused legacy finance/navigation proof targets. The exact scope was approved, published to migrated-page folders and verified by full readback; execution remains pending. SPT-5118 was split across its focused companions **in the same approved publication**. Its old overlapping responsibilities were assigned to those companions; no duplicate old case was created. SPT-1650 retains CAD/USD and both entry points. SPT-1653 corrects its environment-dependent administrator expectation. SPT-1654 keeps actual delivery, recipients and masking, with its source-supported CAD scope explicit. SPT-5443 is enhanced in place for the legacy Financial Settings entry as well as new Legal.

### Published finance case index

| Qase case | Purpose |
| --- | --- |
| [[#SPT-5118: Create a custom fee or tax\|SPT-5118]] | Create a custom fee or tax |
| [[#SPT-1650: Save payment details and authorization\|SPT-1650]] | Save payment details and authorization |
| [[#SPT-1653: Show payment-information controls for the right account\|SPT-1653]] | Show payment-information controls for the right account |
| [[#SPT-1654: Deliver the payment-information update notification\|SPT-1654]] | Deliver the payment-information update notification |
| [[#SPT-5443: Save the default refund-policy text\|SPT-5443]] | Save the default refund-policy text |
| [[#SPT-5517: Edit an existing rate card\|SPT-5517]] | Edit an existing rate card |
| [[#SPT-5518: Add a second rate card\|SPT-5518]] | Add a second rate card |
| [[#SPT-5519: Cancel a rate-card edit\|SPT-5519]] | Cancel a rate-card edit |
| [[#SPT-5520: Save a fee’s enabled state\|SPT-5520]] | Save a fee’s enabled state |
| [[#SPT-5521: Require a specific Other payment method\|SPT-5521]] | Require a specific Other payment method |
| [[#SPT-5522: Delete one rate card\|SPT-5522]] | Delete one rate card |
| [[#SPT-5523: Cancel a fee deletion\|SPT-5523]] | Cancel a fee deletion |
| [[#SPT-5524: Delete a custom fee or tax\|SPT-5524]] | Delete a custom fee or tax |
| [[#SPT-5525: Restrict financial access without Manage Transactions\|SPT-5525]] | Restrict financial access without Manage Transactions |
| [[#SPT-5526: Save who pays Showpass or processing fees\|SPT-5526]] | Save who pays Showpass or processing fees |
| [[#SPT-5527: Save sales-tax details\|SPT-5527]] | Save sales-tax details |
| [[#SPT-5528: Save a statement descriptor\|SPT-5528]] | Save a statement descriptor |
| [[#SPT-5529: Reject an invalid statement descriptor\|SPT-5529]] | Reject an invalid statement descriptor |
| [[#SPT-5530: Require complete banking authorization\|SPT-5530]] | Require complete banking authorization |
| [[#SPT-5531: Open every supported legacy tab\|SPT-5531]] | Open every supported legacy tab |
| [[#SPT-5532: Save a tax applied to a custom fee\|SPT-5532]] | Save a tax applied to a custom fee |
| [[#SPT-5533: Preserve access to financial settings after migration\|SPT-5533]] | Preserve access to financial settings after migration |
| [[#SPT-5534: Save a seller commission default\|SPT-5534]] | Save a seller commission default |

### SPT-5118: Create a custom fee or tax

**Title:** Dashboard - Finance - Custom Fees - Create a custom fee or tax

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Create one organization-wide fee or tax with its first rate card. A rate card specifies which item, purchase platform and payment method use a charge. Run both Type values; do not create a second case for the same flow.

| Type | Name | First rate card |
| --- | --- | --- |
| Fee | Select Host Fee | Item Type = Ticket; Purchase Platform = Online; Payment Type = Card; Fee Amount = 2.00; Fee Percentage = 5; Customer Pays on; Tax Percentage = 0 when shown |
| Tax | Select GST | Item Type = Ticket; Purchase Platform = Online; Payment Type = Card; Tax Rate = 5; Customer Pays on |

Keep Enabled on. The fee's own Save stores its definition and rate card; the page's Save Changes is a separate organization-settings action. Do not use Processing as a third Type; it is not offered by this form.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* A setup owner confirms the global `hide_disabled_fees` switch is off so the new definition remains available after disabling it for cleanup.
* For the selected Type, the organization has no existing Host Fee or GST definition. Record the initial definition list. Use only the selected organization.

**Tags:** dashboard, fees-taxes

**Parameters:**

Type: Fee, Tax

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings. |  | Custom Fees & Taxes and Add new custom fee or tax appear. |
| Select Add new custom fee or tax, then choose the selected Type and Name. | Use the Description mapping; record the first rate card description. | The correct fee or tax fields appear in one unsaved definition. |
| Set the first rate card fields listed in Description. | Keep only Ticket, Online and Card selected; enter the percentage as 5, not 0.05. | The selections and amounts match the chosen Type. |
| Select Save inside this definition. | Do not select the page-level Save Changes. | A success message appears and the definition leaves editing mode. |
| Reload Organizer Info and reopen Financial Settings. |  | Exactly one new definition and one rate card remain with the recorded name, selections, charge and Customer Pays setting; a tax has no fixed fee amount. |

**Postconditions:**

* Record the new definition and card descriptions. Leave the new definition disabled after verifying creation so it cannot charge later sales; confirm the disabled state through the supported view. Delete it only if separate cleanup authorization explicitly allows it.

### SPT-5517: Edit an existing rate card

**Title:** Dashboard - Finance - Custom Fees - Edit an existing rate card

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Change one saved rate card without creating another definition or card.

| Type | Saved starting charge | New charge |
| --- | --- | --- |
| Fee | Fee Amount 2.00 and Fee Percentage 5 | Fee Amount 3.00 and Fee Percentage 7 |
| Tax | Tax Rate 5 | Tax Rate 6.125 |

Keep its recorded name, Enabled, Item Type, Purchase Platform, Payment Type and Customer Pays unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Prepare one saved organization-level definition of the selected Type, with one card using the starting charge in Description. It must have no event, ticket or product overrides. Record the entire card.

**Tags:** dashboard, fees-taxes

**Parameters:**

Type: Fee, Tax

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings. |  | The recorded definition and one card appear. |
| Select the edit icon on the definition and expand the recorded rate card. |  | The saved values appear in editable fields. |
| Enter the new charge for the selected Type and select the definition’s Save. | Use the Description mapping. | A success message appears without adding a second definition or card. |
| Reload the page and reopen the same card. |  | The new charge is retained; the recorded name, choices and other card settings remain unchanged. |

**Postconditions:**

* Restore only the values changed in this run, reload Organization Info and verify the originals. Retain the recorded before/after evidence without customer or banking secrets.

### SPT-5518: Add a second rate card

**Title:** Dashboard - Finance - Custom Fees - Add a second rate card

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Add a second card to an existing Fee definition so different item selections can retain different charges. The first card is Ticket, Online, Card, 2.00 + 0%; the second is Product, Online, Card, 3.00 + 0%. Customer Pays is on for both.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Prepare a saved Host Fee with exactly the first card described above, no overrides and no current sales. Record its card description and all values.

**Tags:** dashboard, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings and edit Host Fee. |  | The original Ticket card is present. |
| Select Add Rate Card. |  | A second editable card appears under the same definition. |
| Set the new card to Product, Online, Card, Fee Amount 3.00, Fee Percentage 0 and Customer Pays on. | Record its generated description; leave Tax Percentage 0 when shown. | Only the new card contains the Product selection and 3.00 charge. |
| Select the definition’s Save, reload and reopen Host Fee. |  | Exactly two cards remain under one definition; the original Ticket card is unchanged and the Product card retains 3.00 + 0%. |

**Postconditions:**

* Remove only the new Product card using the supported card deletion and save, then reload and verify the original Ticket card remains unchanged. This card removal must be approved for the selected setup before execution.

### SPT-5519: Cancel a rate-card edit

**Title:** Dashboard - Finance - Custom Fees - Cancel a rate-card edit

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Cancel an unsaved change to an existing card. No saved fee settings should change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Use an existing Host Fee with a saved Fee Amount different from 9.00 and no current sales. Record its full saved card.

**Tags:** dashboard, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings and edit Host Fee. |  | The recorded saved card is shown. |
| Expand the card and change Fee Amount to 9.00. | Do not select Save. | The unsaved value is shown. |
| Select Cancel Editing on the definition. |  | The card returns to its recorded saved value. |
| Reload and reopen the same definition. |  | The original card remains unchanged and no new card appears. |

**Postconditions:**

* No saved data change is expected.

### SPT-5520: Save a fee’s enabled state

**Title:** Dashboard - Finance - Custom Fees - Save a fee’s enabled state

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Use the definition's Enabled switch, which saves immediately. Run once starting enabled and once starting disabled. This proves saved activation, not a checkout amount. The global `hide_disabled_fees` switch must be off for this run so a disabled definition remains available after reload.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* A setup owner confirms the global `hide_disabled_fees` switch is off. Do not change it during execution.
* Prepare one organization-only Host Fee with no overrides. Record its starting Enabled state and all rate card values.

**Tags:** dashboard, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings. |  | The saved Host Fee and its Enabled switch appear. |
| Change the definition’s Enabled switch to the opposite state. | Do not use the page-level Save Changes. | A fee-updated success message appears. |
| Reload and reopen Financial Settings. |  | Enabled retains the selected state and every rate card value is unchanged. |

**Postconditions:**

* Restore only the values changed in this run, reload Organization Info and verify the originals. Retain the recorded before/after evidence without customer or banking secrets.

### SPT-5521: Require a specific Other payment method

**Title:** Dashboard - Finance - Custom Fees - Require a specific Other payment method

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Reject an existing card change that selects Payment Type = Other without selecting one of the organization’s named Other Payment Types. The rejection must leave that card’s saved selections unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Prepare a Fee card with Purchase Platform = In-Person, Payment Type = Card and no Other selections. Record all values.
* The organization has at least one named Other payment option prepared through its supported configuration; record its visible name.

**Tags:** dashboard, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings and edit the prepared card. |  | The recorded In-Person and Card selections appear. |
| Select Payment Type = Other and leave every named Other Payment Type unselected. | Keep the original Card selection and other fields unchanged. | The named Other payment choices are shown without a selection. |
| Select the definition’s Save. |  | A validation error is shown for the missing Other selection; no success is reported for that card. |
| Reload and reopen the same card. |  | The original Card-only payment selection remains saved; Other was not added. |

**Postconditions:**

* No saved card change is expected. Record any partial definition change separately; a failed card update does not establish that a multi-card save was atomic.

### SPT-5522: Delete one rate card

**Title:** Dashboard - Finance - Custom Fees - Delete one rate card

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Remove one of two organization-level cards while retaining its definition and other card. The per-card confirmation marks the card for removal; saving the definition completes the change.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Prepare a Fee definition with exactly two cards: Ticket/Online/Card/2.00 + 0% and Product/Online/Card/3.00 + 0%, no overrides and no current sales. Both cards are approved for removal; record their descriptions.

**Tags:** dashboard, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings, edit the definition and expand the Product card. |  | Delete Rate Card is available because another card exists. |
| Select Delete Rate Card, then Yes, delete for the Product card. |  | The Product card is removed from the editing view; the Ticket card remains. |
| Select the definition’s Save, then reload and reopen it. |  | Only the unchanged Ticket card remains; the definition still exists. |

**Postconditions:**

* Record the removed card. Recreate only that Product card from the recorded values if setup restoration requires it, save and reload to verify. Do not delete the remaining card as routine cleanup.

### SPT-5523: Cancel a fee deletion

**Title:** Dashboard - Finance - Custom Fees - Cancel a fee deletion

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Cancel the confirmation without deleting saved data. Run each Target with the same confirmation-and-reload steps.

| Target | Starting selection | Delete action |
| --- | --- | --- |
| Definition | Edit one organization-only Fee definition | Delete Custom Fee |
| RateCard | Expand one of its two cards | Delete Rate Card |

Select Cancel on the deletion confirmation, not Cancel Editing on the whole definition.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Prepare one saved Fee definition with two organization-level cards and no overrides; record its name, card descriptions and values.

**Tags:** dashboard, fees-taxes

**Parameters:**

Target: Definition, RateCard

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings and edit the prepared definition. | Choose Target from Description. | The recorded definition and two cards appear. |
| Select the Target’s delete action. |  | The confirmation identifies the intended definition or card. |
| Select Cancel in the confirmation, then Cancel Editing. |  | The deletion is dismissed without removing the definition or either card. |
| Reload and reopen Financial Settings. |  | The definition and both saved cards remain unchanged. |

**Postconditions:**

* No saved data change is expected.

### SPT-5524: Delete a custom fee or tax

**Title:** Dashboard - Finance - Custom Fees - Delete a custom fee or tax

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Remove a definition and its organization-level cards. Run Type = Fee and Tax with the same flow. Deletion is permanent; only the specifically prepared, unused definition may be removed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Prepare an unused, disabled definition of the selected Type with one card and no event/ticket/product overrides, clones or Taxes on Fees references. Record the Type, name, card description and full list.
* The setup owner explicitly approves permanent removal of this definition and confirms that it has no sales or downstream references.

**Tags:** dashboard, fees-taxes

**Parameters:**

Type: Fee, Tax

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings and edit the recorded definition. |  | The correct Type, name and card identify the approved definition. |
| Select Delete Custom Fee. |  | The confirmation names the intended definition and warns that deletion cannot be undone. |
| Select Yes, delete. |  | The definition is removed and a deletion success message appears. |
| Reload Financial Settings. |  | The deleted definition and its card are absent; every other definition remains unchanged. |

**Postconditions:**

* Retain the deletion evidence. Do not recreate or remove unrelated fees as cleanup.

### SPT-5525: Restrict financial access without Manage Transactions

**Title:** Dashboard - Finance - Custom Fees - Restrict financial access without Manage Transactions

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

An employee who may edit ordinary organization information but lacks Manage Transactions must not see the legacy Financial Settings tab. Check the hidden tab and a copied Custom Fees page link. This proves page access; mutating API enforcement is separately accounted for and must not be inferred from visibility.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Use a non-administrator employee with **Manage Organization Info**, without **Manage Transactions** or broader inherited access.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* A permitted setup owner records the saved fee, tax and statement settings and privately copies the same organization’s Custom Fees page link. The restricted employee has not signed in with an administrator account.

**Tags:** dashboard, fees-taxes, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the restricted employee and open Dashboard → Organization Info. |  | Ordinary Basic Info is available for the selected organization. |
| Inspect the tab list. |  | Financial Settings is absent; ordinary tabs remain available. |
| Open the setup owner’s copied Custom Fees page link. |  | Access is rejected; the employee cannot open fee editing or saving controls. |
| Leave Organization Info without changing any setting. |  | The recorded financial settings remain unchanged. |

**Postconditions:**

* No data change.

### SPT-5526: Save who pays Showpass or processing fees

**Title:** Dashboard - Finance - Fee Settings - Save who pays Showpass or processing fees

**Description:**

Migrated owning page: Dashboard → Finance → Fee Settings (`/manage/finance/settings/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Save one Customer Pays switch without changing the other.

| FeeControl | Switch to use |
| --- | --- |
| Processing | Customer Pays beneath Processing Fees |
| Showpass | Customer Pays beneath Showpass Fees |

Run each FeeControl from an on starting state and an off starting state; select the opposite value. On means the customer pays this fee, off means the organization absorbs it. Saved switches do not prove actual purchase calculations. Current local source does not expose these two organization Customer Pays switches on the migrated Fee Settings form; record that as an unresolved parity gap, not as a passed replacement control. This case preserves the legacy requirement.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Record both Customer Pays switches and the organization’s tax, refund-policy and statement fields.

**Tags:** dashboard, fees-taxes

**Parameters:**

FeeControl: Processing, Showpass

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings. |  | Both Processing Fees and Showpass Fees have separate Customer Pays switches. |
| Change only the selected FeeControl’s Customer Pays switch to its opposite value. |  | The selected switch changes and the other switch retains its recorded value. |
| Select the page’s Save Changes. |  | The organization update succeeds. |
| Reload and reopen Financial Settings. |  | The selected value persists; the other switch and recorded tax, refund-policy and statement fields are unchanged. |

**Postconditions:**

* Restore only the values changed in this run, reload Organization Info and verify the originals. Retain the recorded before/after evidence without customer or banking secrets.

### SPT-5527: Save sales-tax details

**Title:** Dashboard - Finance - Fee Settings - Save sales-tax details

**Description:**

Migrated owning page: Dashboard → Finance → Fee Settings (`/manage/finance/settings/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Save the organization’s Sales Tax Number and Sales Tax Exempt choice. Use the approved test tax number supplied for this organization; record the exact value. Run once saving Exempt on and once saving it off. This is record persistence, not proof that all sale taxes disappear.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* The setup owner provides a non-live tax registration value of at most 32 characters for the organization. Record the original tax number and exemption state.

**Tags:** dashboard, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings. |  | Sales Tax Number and Sales Tax Exempt appear. |
| Enter the approved tax number and selected exemption value. |  | The form shows the recorded test number and selected choice. |
| Select Save Changes, then reload and reopen Financial Settings. |  | The exact tax number and exemption state remain saved; fee definitions remain unchanged. |

**Postconditions:**

* Restore only the values changed in this run, reload Organization Info and verify the originals. Retain the recorded before/after evidence without customer or banking secrets.

### SPT-5528: Save a statement descriptor

**Title:** Dashboard - Finance - Fee Settings - Save a statement descriptor

**Description:**

Migrated owning page: Dashboard → Finance → Fee Settings (`/manage/finance/settings/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Save the text configured for supported card statement descriptors, or clear it to use the default. This case checks the saved setting only; no card charge is made.

| Descriptor | Input |
| --- | --- |
| Minimum | ABCDE (5 characters) |
| Maximum | SHOWPASS QA123 (14 characters) |
| Default | Clear the field |

For Default, the field stays blank after reload and the displayed help identifies Showpass Tickets as the fallback.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Record the original Custom Statement Descriptor. Use only an organization with no live card sales during the run.

**Tags:** dashboard, fees-taxes

**Parameters:**

Descriptor: Minimum, Maximum, Default

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings. |  | Custom Statement Descriptor and its 5–14 character help appear. |
| Replace the field with the selected input. | Use the Description mapping. | The field contains the exact selected text or is empty for Default. |
| Select Save Changes, then reload and reopen Financial Settings. |  | The selected descriptor remains exact, or the field remains blank for Default; unrelated financial settings are unchanged. |

**Postconditions:**

* Restore only the values changed in this run, reload Organization Info and verify the originals. Retain the recorded before/after evidence without customer or banking secrets.

### SPT-5529: Reject an invalid statement descriptor

**Title:** Dashboard - Finance - Fee Settings - Reject an invalid statement descriptor

**Description:**

Migrated owning page: Dashboard → Finance → Fee Settings (`/manage/finance/settings/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Reject one unsupported descriptor while preserving the last saved value.

| InvalidDescriptor | Input | Reason |
| --- | --- | --- |
| TooShort | ABCD | Nonempty descriptor shorter than 5 characters |
| ForbiddenCharacter | ABC<DEF | The less-than character is unsupported |

A 15-character paste is separately accounted for as an input-limit check; do not claim the UI submitted it if the control truncates it.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* Record a saved supported descriptor and the other financial settings.

**Tags:** dashboard, fees-taxes

**Parameters:**

InvalidDescriptor: TooShort, ForbiddenCharacter

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings and replace Custom Statement Descriptor. | Use the selected InvalidDescriptor input. | The invalid text or its visible validation is shown. |
| Attempt Save Changes if the form permits submission. |  | The form or server rejects the invalid descriptor without reporting a successful save. |
| Reload and reopen Financial Settings. |  | The recorded supported descriptor and unrelated settings remain unchanged. |

**Postconditions:**

* No saved change is expected. Record unexpected errors separately from the intended validation.

### SPT-5530: Require complete banking authorization

**Title:** Dashboard - Organization - Require complete banking authorization

**Description:**

Migrated owning page: Dashboard → Organization → Settings → Payment Details and Authorization (`/manage/organization/settings/payment-authorization/`). The shared Finance → Payouts → Payment info entry remains in scope. The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Keep payment details unsaved when the organization’s banking authorization is incomplete. This case uses no final Agree and Save submission.

| MissingItem | Leave incomplete |
| --- | --- |
| Authority | I certify that I have authority to bind the organization stays unchecked |
| Authorization | Authority checked; I authorize Showpass to credit and debit my bank account stays unchecked |
| Signature | Both checkboxes checked; Signature blank |

Keep all other required values complete for the selected run.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Financials**; use a non-administrator account.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* Use a non-production CAD organization whose banking form may be inspected with approved non-live bank details. Record the saved preference without copying bank numbers to Qase or screenshots.
* The approved non-live bank field set differs from the saved preference so that editing requires fresh authorization.
* Obtain the complete approved bank field set from the payments setup owner: Institution Number (3 digits), Transit Number (5 digits), Account Number (at least 7 digits), and an authorized test signer name. Do not invent or use a real payout account.

**Tags:** dashboard, payouts

**Parameters:**

MissingItem: Authority, Authorization, Signature

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Payment Details and Authorization. |  | The CAD bank fields, authority/authorization checkboxes, Signature and Agree and Save appear. |
| Enter the approved non-live banking field set and complete every requirement except the selected MissingItem. |  | The selected requirement remains incomplete. |
| Inspect Agree and Save without submitting. |  | Agree and Save remains unavailable; no payment-information-updated success appears. |
| Leave and reopen the tab without saving. |  | The saved bank details remain unchanged; the unsaved authorization was not applied. |

**Postconditions:**

* Leave without saving or signing an agreement. Do not trigger payment-detail notifications.

### SPT-5531: Open every supported legacy tab

**Title:** Dashboard - Organization - Open every supported legacy tab

**Description:**

Run one Tab value at a time from the ordinary Dashboard landing page. Check the selected organization before opening Organization Info. Each run proves visible navigation and matching content only; use the separate saved-form cases for behavior. Never type a replacement route to turn a missing link into a pass.

| Tab | Expected content |
| --- | --- |
| Basic Info | Organization Name, organization profile link, address/contact, Timezone and Currency |
| Branding | Profile Images, Website/social links, Description, Long Description and checkout/subscription messaging |
| Business Schedule | Weekly schedule, Show time schedule on the frontpage, Exceptions and Add Exception |
| Enabled Modules | Modules and exchange visibility/time settings |
| Ticketing | Ticket-transfer limits in the embedded Ticketing form |
| Shipping & Fulfillment | Fulfillment controls, shipping messages, threshold and destination restrictions |
| Low Inventory Display | Enable Inventory Threshold Display; dependent threshold/remaining-count controls when enabled |
| Financial Settings | Showpass/processing Customer Pays, tax fields, Custom Fees & Taxes, Refund Policy and Custom Statement Descriptor |
| Post-Event Emails | Organization-wide switch, promotions/reviews and their messages; deprecated Unique Email Message is read-only |
| Email Customizations | Email type, subject, banner, message and preview in the embedded organization-level form |
| Integrations | Whitelist Domains and Save Changes; conditional Workday fields only for enabled organizations |
| Payment Details and Authorization | Currency-specific bank fields and authority, authorization, signature/date controls |
| Terms & Conditions | New-event terms requirement and Terms URL; payment-plan terms only when enabled |
| Event Upselling | Enable Event Upselling, Assigned Seating option and Specific Events selection |
| Analytics | Supported tracking IDs and conditional fields; do not copy token values |
| Customer refunds | Organization customer-refund policy form when its flag is enabled |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Use an employee with **Manage Organization Info**, **Manage Transactions** and **Manage Financials**, with their required authentication setup complete.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* For Shipping & Fulfillment, the organization flag `enable_shipping_fulfillment_settings` is on. For Customer refunds, `enable_venue_policy_customer_self_refunds` is on. For Post-Event Emails, the effective request flag `thank_you_emails_flag` is on.
* For Payment Details, use a CAD or USD organization without a parent, or a child whose parent allows child payouts. Run other tab choices in the same organization where supported. Record the organization name and timezone.

**Tags:** dashboard, organizer

**Parameters:**

Tab: Basic Info, Branding, Business Schedule, Enabled Modules, Ticketing, Shipping & Fulfillment, Low Inventory Display, Financial Settings, Post-Event Emails, Email Customizations, Integrations, Payment Details and Authorization, Terms & Conditions, Event Upselling, Analytics, Customer refunds

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start on Dashboard, select the recorded organization and open Organization Info through its menu. |  | The same organization opens with its legacy tab list. |
| Select the Tab value being run. | Use the Description table. | The expected content opens for the same organization without a blank panel or access error. |
| Inspect the selected tab’s main controls without editing them. |  | The listed content is present with saved values; secrets remain unrecorded and no unrelated organization is shown. |

**Postconditions:**

* No saved data change. Leave on the tab from which execution started.

### SPT-5532: Save a tax applied to a custom fee

**Title:** Dashboard - Finance - Custom Fees - Save a tax applied to a custom fee

**Description:**

Migrated owning page: Dashboard → Finance → Custom Fees (`/manage/finance/custom-fees/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Save the selected Taxes on Fees relationship and confirm that reopening the fee retains the chosen tax card. This is distinct from a completed checkout’s tax calculation.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info** and **Manage Transactions**.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* The organization uses configured fees. Use an organization with no active selling events or items, because organization fees can affect all its sales. Record original values before changing them.
* The organization’s ordinary `tax_on_fees` setting is on.
* Prepare a saved Fee card and an active Tax card under the same organization. The Tax card includes Item Type = Fee, has Tax Rate 5%, no own Taxes on Fees, and uses compatible Online/Card choices. Record its visible name and description and the Fee card’s original tax selection.

**Tags:** dashboard, fees-taxes

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings and edit the Fee card. |  | Taxes on Fees lists the recorded active Tax card; legacy reporting-only Tax Percentage is absent. |
| Select the recorded Tax card under Taxes on Fees. |  | Only the intended tax selection is checked. |
| Select the definition’s Save, reload and reopen the Fee card. |  | The same Tax card remains selected; its rate and the Fee card’s own charge are unchanged. |

**Postconditions:**

* Restore only the values changed in this run, reload Organization Info and verify the originals. Retain the recorded before/after evidence without customer or banking secrets.

### SPT-5533: Preserve access to financial settings after migration

**Title:** Dashboard - Organization - Preserve access to financial settings after migration

**Description:**

Start where organizers actually land after signing in, on Dashboard. For each Function, reach its replacement through visible links for the same organization. A direct URL or a manually opened different navigation shell does not pass this case.

| Function | Previous location | Source-defined replacement to find through visible navigation |
| --- | --- | --- |
| CustomFees | Financial Settings → Custom Fees & Taxes | Finance → Custom Fees |
| FeePayers | Financial Settings → Processing Fees / Showpass Fees → Customer Pays | Find the same organizer-accessible controls through visible replacement navigation; local source has no mapped replacement control |
| TaxAndStatement | Financial Settings → Sales Tax Number, Sales Tax Exempt, Custom Statement Descriptor | Finance → Fee Settings |
| RefundPolicy | Financial Settings → Refund Policy | Organization settings → Legal |
| PaymentDetails | Payment Details and Authorization | Organization settings → Payment Details and Authorization or Finance → Payouts → Payment info |

Replacement route definitions establish an expected destination, not proof that its link is present in the deployed Dashboard wrapper.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permissions: **Manage Organization Info**, **Manage Transactions** and **Manage Financials**; required authentication is complete.
* A setup owner enables the organization flag `enable_organization_settings_nextjs_embed` for this run. Record the original rollout/preview choice; do not change it during the case.
* Use a supported CAD or USD organization without a parent, or a child allowed to edit its payout information. Record its name and the prior settings values.

**Tags:** dashboard, organizer, fees-taxes

**Parameters:**

Function: CustomFees, FeePayers, TaxAndStatement, RefundPolicy, PaymentDetails

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start at the ordinary Dashboard landing page and select the recorded organization. |  | The expected organization remains selected in the Dashboard shell. |
| Use visible menus to open the replacement for the selected Function. | Use the Description mapping; do not type a destination URL or open a standalone Manage page as a workaround. | A visible path reaches the owning screen in the same organization. |
| Inspect the saved values for that Function without changing them. |  | The previous business function and its recorded saved values are available; a missing link is a failed navigation result. |

**Postconditions:**

* No saved settings change. The setup owner restores any rollout/preview change made solely for the run.

### SPT-5534: Save a seller commission default

**Title:** Dashboard - Finance - Fee Settings - Save a seller commission default

**Description:**

Migrated owning page: Dashboard → Finance → Fee Settings (`/manage/finance/settings/`). The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

As a Showpass administrator, save one organization-level commission default. Run SaleType = Credit or Cash. This is an administrator-only control, not an ordinary organizer permission. Existing item-level commission overrides must retain their own values; actual Box Office earnings remain separate proof.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* A Showpass administrator with organization editing access prepares an organization with no active sales.
* The selected organization shows the legacy Organizer Info tabs. The organization flag `enable_organization_settings_nextjs_embed` is off, and this employee has not selected the new preview.
* Record Seller Commission: Credit Sales and Seller Commission: Cash Sales. Prepare one unsold event ticket type with an explicit commission override different from 1.00 and record it; no purchase is needed.

**Tags:** dashboard, fees-taxes, admin-actions

**Parameters:**

SaleType: Credit, Cash

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization Info → Financial Settings. |  | The administrator-only Seller Commission: Credit Sales and Seller Commission: Cash Sales fields appear. |
| Set only the selected SaleType commission to 1.00. | Credit selects Credit Sales; Cash selects Cash Sales. | The selected amount changes and the other commission remains unchanged. |
| Select Save Changes, then reload and reopen Financial Settings. |  | The selected 1.00 default persists and the other default is unchanged. |
| Open the prepared ticket type’s financial settings without saving. |  | Its explicitly configured commission override retains the recorded value. |

**Postconditions:**

* Restore only the values changed in this run, reload Organization Info and verify the originals. Retain the recorded before/after evidence without customer or banking secrets.

### SPT-1650: Save payment details and authorization

**Title:** Dashboard - Organization - Save payment details and authorization

**Description:**

Migrated owning page: Dashboard → Organization → Settings → Payment Details and Authorization (`/manage/organization/settings/payment-authorization/`). The shared Finance → Payouts → Payment info entry remains in scope. The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Save supported banking details with complete authorization, then reopen the saved record. Run both Currency values using organizations already configured in that currency; do not change their currency. Run each supported entry: Dashboard → Organization Info → Payment Details and Authorization and Dashboard → Finance → Payouts → Payment info. Both reach the same banking form; keep one case.

| Currency | Banking fields |
| --- | --- |
| CAD | Institution Number, Transit Number, Account Number |
| USD | ACH Routing Number, Account Number, Account Type |

The authority checkbox enables the debit/credit authorization checkbox. Complete the signer name and date shown by the form. If a verification prompt appears, the signer completes the requested verification; record the challenge result without recording its code. The switches `enable_venue_payment_otp` and shared `enable_otp` govern that extra challenge for eligible accounts; this case does not claim all authentication outcomes.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permission: **Manage Financials**. Also require **Manage Organization Info** for the Organization Info entry. Use a non-administrator authorized signer.
* Use a non-production organization without a parent, with the selected Currency and approved non-live bank details. Payout-detail saves and billing notifications must be approved and routed to controlled test recipients. Do not use a live payout account.
* Obtain and record the complete non-live bank field set and test signer from the payments setup owner before starting. CAD requires Institution Number (3 digits), Transit Number (5 digits), and Account Number (at least 7 digits). USD requires ACH Routing Number (9 digits), Account Number and a supported Account Type.
* Use an existing saved non-live payout preference; obtain a different approved non-live bank field set for this update. First-time setup and its missing-bank banner are outside this case.
* Record the current saved preference and approved notification destinations privately. Do not paste bank values, signatures, authentication codes or inbox addresses into Qase evidence.

**Tags:** dashboard, payouts

**Parameters:**

Currency: CAD, USD

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected organization through one of the entry paths listed in Description. | Use the organization matching Currency; record the entry path. | The correct organization’s currency-specific bank fields and authorization form appear. |
| Enter the approved non-live banking values. | Use the complete recorded field set for Currency. | The supplied bank values are retained in the form. |
| Complete the authority and debit/credit authorization checkboxes and enter the authorized test signer’s name. |  | The form shows the signer/date and enables Agree and Save when all required fields are complete. |
| As the authorized signer, select Agree and Save and complete any requested verification. |  | Payment information updated appears after the save is accepted. |
| Leave and reopen the same organization’s payment form. |  | The bank details, authorization and signer/date match the recorded submission; a success message alone is insufficient. |

**Postconditions:**

* The authorized setup owner restores the original non-live preference through the supported form if the run changed it; complete required authorization and verify the restored saved record. Account for restoration notifications. Do not delete payout history.

### SPT-1653: Show payment-information controls for the right account

**Title:** Dashboard - Organization - Show payment-information controls for the right account

**Description:**

Migrated owning page: Dashboard → Organization → Settings → Payment Details and Authorization (`/manage/organization/settings/payment-authorization/`). The shared Finance → Payouts → Payment info entry remains in scope. The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Check visible access and production administrator restrictions without submitting a bank change. Select one Account run; do not switch actors halfway through a run.

| Account | Required starting access | Expected form |
| --- | --- | --- |
| PermittedEmployee | Non-admin with Manage Financials | Currency-specific fields and Agree and Save; it may stay disabled while pristine/incomplete |
| RestrictedEmployee | Manage Organization Info, no Manage Financials and no broader inherited access | Payment Details and Authorization absent from Organizer Info; copied payment-form link rejects access |
| ProductionAdministrator | Administrator on the production build | Restriction message and no Agree and Save action |
| NonProductionAdministrator | Administrator on a non-production build | No production-only administrator restriction; Agree and Save may appear but is not submitted |

Current frontend code applies the administrator submission restriction only in production. Do not use demo/beta administrator visibility as proof that production allows bank edits. This is page/control access proof, not a direct API mutation rejection test.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Use the selected Account and its exact permissions from Description. The organization uses CAD or USD and has no parent.
* A permitted setup owner records the organization’s current payment information and copies its supported payment-form link privately for the restricted-access run. No account changes banking details in this case.

**Tags:** dashboard, payouts, employee-permissions

**Parameters:**

Account: PermittedEmployee, RestrictedEmployee, ProductionAdministrator, NonProductionAdministrator

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as the selected Account and open the organization’s payment page through visible navigation. | For RestrictedEmployee, first inspect Organization Info, then open the setup owner’s copied page link. | The form or access restriction matches the selected Account row. |
| Inspect banking fields, the authorization section and the save area. |  | Only the controls listed for the selected Account are offered; production administrators see the restriction message. |
| Leave without entering bank data, authorizing or submitting. |  | The saved payment information remains unchanged. |

**Postconditions:**

* No saved data change. Do not attempt an unauthorized bank save to prove a missing button.

### SPT-1654: Deliver the payment-information update notification

**Title:** Dashboard - Organization - Deliver the payment-information update notification

**Description:**

Migrated owning page: Dashboard → Organization → Settings → Payment Details and Authorization (`/manage/organization/settings/payment-authorization/`). The shared Finance → Payouts → Payment info entry remains in scope. The legacy workflow below supplies the feature-parity baseline; its old tab name does not determine the Qase folder.

Verify the actual confirmation for an approved CAD banking update, including recipient deduplication and masked account/transit numbers. Current backend enables this email for CAD updates; a USD email is not promised. Both Organizer Info → Payment Details and Authorization and Finance → Payouts → Payment info use the same save and delivery path, so keep one case. Queue acceptance is not delivery.

Expected recipients: the signing contact is the main recipient. BCC includes distinct organization-owner emails and the accounting email when they differ from the contact. Production additionally includes the configured finance email when different; this non-production test must not send there. Configure an owner/accounting overlap in the controlled setup to test deduplication. Institution number may appear; transit/account values expose only their last three digits. The signer, local signed date/time and selected organization must match the approved update.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| Dashboard | Mobile |

Run each selected scenario in desktop and narrow mobile views. Record the organization and computer timezones for dated evidence. This case verifies settings or navigation, not a completed charge or payout.

**Preconditions:**

* Employee permission: **Manage Financials**. Also require **Manage Organization Info** for the Organization Info entry. Use a non-administrator authorized signer.
* Use a non-production organization without a parent, with the selected Currency and approved non-live bank details. Payout-detail saves and billing notifications must be approved and routed to controlled test recipients. Do not use a live payout account.
* Obtain and record the complete non-live bank field set and test signer from the payments setup owner before starting. CAD requires Institution Number (3 digits), Transit Number (5 digits), and Account Number (at least 7 digits). USD requires ACH Routing Number (9 digits), Account Number and a supported Account Type.
* Use an existing saved non-live payout preference; obtain a different approved non-live bank field set for this update. First-time setup and its missing-bank banner are outside this case.
* Record the current saved preference and approved notification destinations privately. Do not paste bank values, signatures, authentication codes or inbox addresses into Qase evidence.
* Use a CAD organization and a controlled test mail viewer that exposes delivered message headers and content. All owner/accounting/contact recipients are approved test recipients. Record their expected distinct set privately and the organization timezone.

**Tags:** dashboard, payouts, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the CAD organization’s payment form from either visible entry described above. |  | The expected CAD organization and current saved details appear. |
| Enter the approved changed non-live bank values and complete the signer’s authorization. |  | The complete approved update is ready to submit. |
| As the authorized signer, select Agree and Save and complete requested verification. |  | The payment update succeeds and the saved preference matches the submitted values after reopening. |
| Open the actual received payment-preference confirmation in the controlled mail viewer. | Find it by the organization, signer and recorded save time. | The confirmation was delivered for this update; a queued task does not satisfy this step. |
| Compare the delivered recipients and message contents with the recorded setup. |  | The contact/BCC recipient set has no duplicates; organization, signer and local signed time match, and transit/account values are masked except their last three digits. |

**Postconditions:**

* Keep masked delivery evidence. The authorized setup owner restores the original approved non-live preference and verifies it; distinguish restoration notifications from the tested update. Do not publish message headers or banking values outside the controlled evidence location.


## Existing coverage to reuse

These are **saved definitions, not executed passes**. Keep their current IDs, fields and suites until a separately approved change is prepared. Refer to the existing case rather than importing a duplicate.

| Visible navigation | Existing coverage | Decision and remaining gap |
| --- | --- | --- |
| Settings → General → Organization profile | [SPT-355](https://app.qase.io/case/SPT-355) opens the public organizer profile from an event; [SPT-354](https://app.qase.io/case/SPT-354) submits a message and checks the recipient inbox | Keep both. They do not prove saving General or Contact, or privacy for Private organizer. |
| Settings → Enabled modules → Modules | [SPT-4009](https://app.qase.io/case/SPT-4009), suite 78 | Enhance its navigation and concrete menu expectations later; preserve all seven module selections and both on/off states. Next.js hides Memberships unless membership access exists; Essential disables module changes. Gift Cards and Donations are not module choices here. No new duplicate module-toggle case. |
| Settings → Enabled modules → Event upselling | SPT-3172, 3173, 3174, 3175, 3176, 3177, 3179, 3180, 3182, suite 440; customer filtering SPT-3097 | Reuse but enhance terminology: these are saved settings, not a rollout flag. Next.js has an empty Show specific events list for automatic suggestions, not separate default/specific radio buttons. SPT-3182’s suggested “no upsells” conflicts with source and current helper text. Preserve add/remove, master on/off, assigned-seating on/off/dependency and saved selections; replace ambiguous outcomes only after exact-scope approval. |
| Settings → Customer refunds, conditional | SPT-5250–5255 and SPT-5308, suite 1107 | Keep; full settings, cutoff, invalid input, permission, initial state and amount-choice coverage already exist. See [[03 Test Cases/Refunds and Protection/Organizer and Venue/SPW-19667-customer-refund-policy-test-cases]]. Hidden in this demo navigation; `enable_venue_policy_customer_self_refunds` gates the route. Saving Legal refund-policy text does not enable customer refunds. |
| Settings → Payment Details and Authorization | [SPT-1650](https://app.qase.io/case/SPT-1650), [SPT-1653](https://app.qase.io/case/SPT-1653), [SPT-1654](https://app.qase.io/case/SPT-1654), suite 1011 | Keep banking fields/authorization, CAD/USD, restricted admin behavior, saved values, notification recipients and masked details. Enhance entry wording for the shared Organization page later; preserve Finance entry. No bank update or agreement was attempted. |
| Branding → Identity | SPT-4124, 4125, 4127, 4335, suite 744; SPT-4132 sender settings | Keep initial creation/defaults, assets/colors/fonts, fallback, email rendering and sender proof. Enhance Identity’s current field map: Logo, Header image, Primary/Secondary/Email background colors, Color mode, Layout preset, Heading/Body font, From name, Reply-to email, Brand website URL/display text, Will Call/Pick up and previews. Existing-record edits, asset removal/reset and uploaded fonts are only partial/unknown coverage. SPT-4132 refers to an old sender page and a From Email field; do not assume the current Identity form has that field. |
| Branding → Emails → Customization | SPT-3617–3621,3626,4087,4148,4836,4837; SPT-4126/4128 inheritance | Reuse existing types, save/reopen, preview, validation, deletion, fallback and delivery. See the exact template/field audit below. SPT-5447 is the separate organization-wide Post-Event form. Preserve supported legacy/API Reply-To assertions; Next.js lacks that template field. |
| Branding → Deliverables → Digital Wallets | [SPT-4742](https://app.qase.io/case/SPT-4742), suite 744 | Keep fields, images, validation, saved state, failure/retry and removal. Update the old entry route later without narrowing iOS/Android or NFC/non-NFC selections. It bundles several goals and should be split in a dedicated revision; actual wallet refresh on a physical device remains separate proof. |
| Settings → Enabled modules → Buyer inventory displays | SPT-394, SPT-398, SPT-2885, SPT-3871 | Retain percentage on/off, remaining count, assigned seating and calendar assertions, including all saved platform/view mappings. These are downstream selections for SPT-4826, TC-15/16/50; no customer display was executed. |
| Settings → Shipping & Fulfillment → Buyer delivery | SPT-3745, SPT-4933, SPT-5133 | Retain destination and quantity checks. Validate exact full assertions before relying on these as replacements for SPT-4884’s checkout-message assertion; they are related coverage, not automatic equivalence. |
| Settings → Checkout Consent → Customer responses | SPT-4968–4977, suite 1033; SPT-4798 report | Reuse customer/guest/authenticated/Widget/Box Office behavior, required/optional/continuing consent, supported copy, email/SMS mapping and reporting. None substitutes for the seven organizer-management cases above. |
| Settings → Ticketing | [SPT-5139](https://app.qase.io/case/SPT-5139), suite 181 | Existing case combines transfer limits with Intellitix invoice resync, has mismatched step/results and an empty final expected result. **TC-17 is a repair alternative, not an automatic new create.** Prefer enhancing SPT-5139’s transfer responsibility only after the distinct invoice-resync assertions have a verified standalone home. Keep the original unchanged meanwhile. |

## Coverage accounting and proposed folder layout

Published Qase root: **Organizer Info (181)**, under Dashboard (78). The 20 new folders and 45 created cases are listed in the publication records below. Existing cases retain their suites; no empty folder was created solely for a reused or deferred workflow. The coverage table continues to account for every visible section, including those without new cases.

| Visible navigation / route evidence | Definition coverage and status | Remaining proof or explicit limitation |
| --- | --- | --- |
| Settings → General; `settings/basic-info/` and settings root | TC-1–3, TC-49; planned/manual-only | Name/internal info edit, required fields, currency read-only, private switch, clean timezone save. New-organization defaults remain registration coverage; arbitrary populated-organization timezone edits are not assumed successful. |
| Settings → Contact; `settings/contact/` | TC-4–6; planned/manual-only | Contact/address save, missing support email, invalid recipient. Communication opt-in switches are visible but toggling them is deferred pending approved test subscription/integration destinations. Primary email/phone errors, AR/AP 100-character boundary, manual-address edits/geocoding failure, country/state changes and blank optional fields need additional negative runs. |
| Settings → Business Schedule; `settings/schedule/` | TC-7–12; planned/manual-only | Weekly open/closed hours, limits, add/edit/delete/cancel exceptions, past/duplicate dates. Visibility-switch save/public rendering, missing opening/closing time, limits outside range, exception pagination and date-boundary behavior remain deferred. No unsupported “closing must be later” rule was invented. |
| Settings → Enabled modules; `settings/modules/` | SPT-4009; TC-13–16/50; proposed SPT-4826; planned/manual-only | All modules, organizer options, exchange audience/time, percent conversion/validation/disable, remaining number/blank, upsell cases retained. Essential and no-membership-access are source-backed gated states requiring selected runs, not assumed passes. Actual discount, guestlist, exchange, reminder and abandoned-cart outcomes remain downstream proof. |
| Settings → Ticketing; `settings/ticketing/` | TC-17/18; planned/manual-only; SPT-5139 repair held | Limit minimum, blank, save/reopen. Fractional/negative input normalization and API rejection need layer-specific follow-up. Event overrides remain SPT-5353, unchanged. Actual customer transfer limits require separate order setup. |
| Settings → Customer refunds; `settings/customer-refunds/` | Existing SPT-5250–5255,5308; definition retained | Conditional rollout and separate policy record. No duplicate drafts. Live demo page not entered; outcomes not executed. |
| Settings → Shipping & Fulfillment; `settings/shipping-fulfillment/` | Proposed SPT-4884; TC-19–23/51; planned/manual-only | Two fulfillment controls, trim messages, quantity on/off and clearing, saved destinations/no duplicates, missing/zero and HTML rejection. Message length 500/255, blank-message fallback, clearing restrictions, invalid destinations via API and multi-layer-package conflict are manual/API follow-up; not claimed covered by the positive case. |
| Settings → Checkout Consent; `settings/custom-consent/` | TC-24–30; planned/manual-only | List/form/default choices, add/edit/status/order, type dependencies, missing text/duplicate label, preview. Both maps-to choices are defined; actual email/SMS side effects retained downstream. Duplicate active mappings, cancelled status/form, pagination >20, partial reorder failure/rollback and link sanitization are deferred negative checks. There is no supported delete operation. |
| Settings → Payment Details and Authorization; `settings/payment-authorization/` | SPT-1650/1653/1654 retained | Manage Financials (`manage_bank_account`) is separate from Manage Organization Info. Parent/child payout lock inherited rules require selected setup. Payment page not entered; no agreement or financial data submitted. |
| Settings → Legal; `settings/terms/` | TC-31–34; planned/manual-only | Terms on/URL, missing URL, payment-plan terms, default refund text. Terms-off retention, malformed URL, blank rich text, new-event inheritance and actual customer acceptance need follow-up. Backend refund-text length conflicts with frontend; see findings. |
| Settings → Suborganizations; `organization/suborganizations/` | SPT-5459/5460 published (original TC-52/53) | Parent link/access-filtered children and nonparent state have local base candidates. Child application/approval/ownership lifecycle remains deferred. |
| Branding → Identity; `branding/identity/` | Suite 744: SPT-4124/4125/4127/4335 updated; SPT-5463–5470 published and verified | Current base edit/create, clear, Google/Adobe/uploaded fonts and selected validation are defined. Wrong-role/flag-off states, remaining boundaries, delivered purchase emails and public rendering remain separate unexecuted proof. |
| Branding → Profile; `branding/profile/` | TC-35; planned/manual-only | Website/social/short description/About save. Bad URL, text boundaries, clearing and published profile appearance are deferred. |
| Branding → Messaging; `branding/messaging/` | TC-36/37; planned/manual-only | Saved copy and subscription newline rejection. Backend limits 256/4096, clearing and customer confirmation/email delivery remain follow-up. |
| Branding → Emails → Customization; `branding/emails/customization/` | SPT-3617–3621,3626,4087,4148,4836,4837; all eight types represented | Existing definitions include save, all-type preview, invalid inputs and deletion/fallback. Current Next.js field/entry corrections remain; see detailed audit. Not browsed or executed this follow-up. |
| Branding → Emails → Post-Event; `branding/emails/post-event/` | TC-38; planned/manual-only | All three switches and messages. Scheduled send window, delivered recipients/content and disabled behavior need separate executed proof. |
| Branding → Deliverables → Digital Wallets; `branding/digital-wallets/` | Existing SPT-4742 retained/partial | Save/validation/removal and iOS/Android definitions. Physical device and issued-pass update proof not executed. |
| Branding → Deliverables → Ticket settings; `branding/ticket-settings/` | TC-39; planned/manual-only | Message and exact image dimensions save. Invalid assets, clearing, missing settings record and generated PDF appearance require follow-up; backend list returns one object and does not support create/delete. |
| Integrations → Analytics; `settings/analytics/` | TC-40/41; planned/manual-only | All editable IDs, conditional GTM, format rejection. Sandbox CAPI validation depends on `venue_facebook_pixel_test`; real tracking events and limited-permission visibility/token omission need follow-up. Never put tokens in Qase data or screenshots. |
| Integrations → API allowlist; `integrations/api-allowlist/` | TC-42–44; planned/manual-only | Add/remove, invalid URL and saved entries; permission checks source-backed. Existing SPT-3416 only verifies WordPress setup dependence. Empty state, duplicate URL, >100 rows and real allowed/denied API calls remain follow-up. |
| Integrations → Domains; `integrations/domains/` | SPT-5461/5462 published (original TC-54/55) | Empty list/cancel and saved unconnected hostname have local base candidates. Ownership/DNS/routing/SSL/linking/deletion remain deferred; API allowlist cases do not substitute. |
| Cross-page access, unsaved edits, isolation, legacy entry | TC-45–48; planned/manual-only | Restricted employee, discard, two organizations, flag-selected legacy wrapper. Save failure/retry, stale concurrent edit and session change during a pending save remain deferred; no invented manual failure injection. |
| Dashboard → Organization Info → previous Financial Settings / Custom Fees | **Failed: replacement navigation missing in inspected beta session** | Landing-page menu and embedded Organization settings have no Custom Fees entry. Direct access succeeds for the same account/organization but is diagnostic only; organizers still start in `/dashboard/`. Required navigation regression remains distinct from deferred fee/tax calculation and save tests. Backend `financialsTab` mapping alone does not supply a visible link. |

**Suggested first base pass:** TC-1,4,5,7,8,13,14,17,19,20,22,24,25,31,34,35,36,38–40,42,45–49, plus the two proposed existing-case drafts and retained module/payout/branding cases. Select additional toggle states and edge runs by the changed behavior. This is a selection plan, not an executed run or an exhaustive release gate. TC-17 needs the SPT-5139 duplication decision before any create.

## Preserve existing assertions before a split is published

| Existing case | Assertions retained or assigned | Publication constraint |
| --- | --- | --- |
| SPT-4826 | Settings fields and valid ascending thresholds → proposed SPT-4826; invalid order → TC-15; remaining-count setting → TC-16; disabled state → TC-50; percentage/disabled customer display → retained SPT-394/3871; assigned-seat remaining count → SPT-2885 | The follow-up audit verified SPT-398 already covers general remaining-count display across public regular/recurring events, Widget, Web Box Office and Electron, with desktop/mobile mappings. Retain SPT-398 alongside SPT-394/2885/3871 when preparing a complete split. **The update remains unpublished**; do not create duplicate companions while SPT-4826 remains unchanged. Original grouped mappings need an explicit preservation check in the split batch. |
| SPT-4884 | Fulfillment switches → proposed SPT-4884; trimmed messages → TC-19; quantity on → TC-20, off clears number but retains message → TC-21; normalized destinations/no duplicates → TC-22; missing/zero → TC-23; HTML → TC-51 | **Hold this existing-case update** until message length and API-invalid destination checks and the original checkout shipping-copy assertion are retained in runnable companions. Related checkout tests are insufficient without an exact assertion comparison. Preserve all original cleanup and applicable views. |
| SPT-5139 | Transfer save/reopen → TC-17 as repair alternative; invalid limit → TC-18. Intellitix permission, accepted/completed/failed results and safe invoice resync remain in the saved original case | Do not create a duplicate transfer happy path or narrow SPT-5139. A standalone invoice-resync case needs the exact eligible invoice, supported action, permissions and final-state evidence first. No resync was attempted. |

## Confirmed source findings and unresolved readiness work

1. **Refund-policy length mismatch:** the new Legal textarea allows 1,000 characters, while backend `VENUE_DESCRIPTION_LIMIT_MAP.REFUND_POLICY` limits it to 512. TC-34 uses short supported text. A 513-character save is a specific negative follow-up. This is a confirmed source mismatch, **not a live reproduced defect**.
2. **Timezone guard:** backend `ensure_venue_timezone_change_is_safe` blocks changes when dependent canonical local schedules exist. Its validation message says affected local schedules must be updated together. TC-49 deliberately uses a newly registered organization before dated configuration. A populated-organization rejection test is **blocked on a verified prepared dependent record and deployed-version match**; do not assume any ordinary existing event necessarily triggers the guard.
3. **Permission boundaries differ:** ordinary settings saves require Manage Organization Info; payment authorization requires Manage Financials; Analytics navigation uses Manage Integrations while editing also needs Manage Organization Info. API allowlist and Domains navigation/editing require Manage Organization Info, without an additional Manage Integrations requirement. Identity navigation uses Manage Events but branding-config writes require Manage Organization Info. Do not replace these with a generic “organizer/admin” role. Lower-permission analytics token visibility and Identity editing need targeted runs.
4. **Legacy presentation flag:** `enable_organization_settings_nextjs_embed`, scoped to the organization, selects Angular when off and a Next.js iframe when on at `/dashboard/venues/edit/`. It is not required to visit the standalone `/manage/organization/settings/` page. The observed demo legacy entry showed Angular; no flag value was read or changed. Bank-only employees default to the payout tab in the flagged wrapper. Old tab mappings include branding, schedule, modules, ticketing, payouts, analytics, Legal and emails; unknown tab values fall back to General. Do not infer every newly added tab has an explicit legacy mapping.
5. **Source versus deployment:** the modern UI displayed subscription switches and post-event switches differently from some local form code. Only labels and visible state were observed; no save or restricted-role test was attempted. An initially disabled Add consent item button was seen during loading, so it is **inconclusive**, not a confirmed permission defect.
6. **Release status:** definitions remain incomplete for the deferred/blocked rows above. No save/reopen, customer-side setting effect, financial change, email/analytics delivery, API rejection, physical-device run, concurrency or failure recovery was executed. This analysis **does not certify production readiness**.

## Section-by-section follow-up audit

**Audit result before the four-case push:** every destination was accounted for, with two direct-page gaps. The later approved publication of SPT-5459–5462 closes those base-page gaps. No existing cases were changed. This does not mean every field, negative state or downstream effect is covered.

| Destination | Existing or published case IDs | Coverage decision |
| --- | --- | --- |
| Settings → General | 5418–5420,5458; 5454–5457 cross-page | Base settings and selected edges defined; public privacy and populated-timezone rejection remain incomplete. |
| Settings → Contact | 5421–5423 | Base contact/address save and selected errors defined; communication opt-in and address/error boundaries still partial. |
| Settings → Business Schedule | 5424–5429 | Weekly hours and dated exception lifecycle defined; visibility switch and additional time/limit boundaries need enhancement. |
| Settings → Enabled modules | 4009,3172–3177,3179,3180,3182,4826,5430,5431; downstream394,398,2885,3871 | Reuse existing module, upsell and display cases; modern control names/default behavior and plan/membership restrictions need updates. |
| Settings → Ticketing | 5139,5432; event override5353 | Case exists, but 5139 mixes two goals and has bad step/result alignment. Repair existing coverage, not a duplicate happy-path create. |
| Settings → Customer refunds, conditional | 5250–5255,5308 | Existing configuration, cutoff, invalid, permission and amount definitions retained. |
| Settings → Shipping & Fulfillment | 4884 | Broad existing base/edge case retained. Local split is held to avoid duplicate coverage; full old assertions remain in Qase. |
| Settings → Checkout Consent | 5433–5439; customer4968–4977; report4798 | Organizer lifecycle now defined separately from customer acceptance/reporting. Extra mapping conflict, cancel and failure checks remain partial. |
| Settings → Payment Details and Authorization | 1650,1653,1654 | Reuse banking/authorization/access/notification cases; refresh entry wording without losing Finance access or currency coverage. |
| Settings → Legal | 5440–5443 | Base terms/payment-plan/refund copy and missing URL defined; text limit and extra validation/inheritance gaps remain. |
| Settings → Suborganizations | SPT-5459/5460 (formerly missing) | Base page coverage added after this audit. Related event approvals and CSV venue import still do not substitute for the parent’s link, filtered child list or nonparent state. |
| Branding → Identity | 4124,4125,4127,4132,4335 | Reuse initial/default/brand/font/sender cases; current email identity fields, edit/reset/upload variants and permission mismatch require enhancement. |
| Branding → Profile | 5444; public355 | Saved form and public entry are different cases; public rendering and URL/boundary errors remain partial. |
| Branding → Messaging | 5445,5446 | Saved message fields/newline error defined; actual checkout/email output remains separate. |
| Branding → Emails → Customization | **3617–3621,3626,4087,4148,4836,4837** | All eight types are represented; improve current field/scope instructions, not new duplicate template cases. Details below. |
| Branding → Emails → Post-Event | 5447; delivered554 | Organization-wide switches and three messages differ from 3619’s subject/banner/template message. Keep both. |
| Branding → Deliverables → Digital Wallets | 4742 | Base configuration, invalid assets, retry and removal already defined. Old entry route and multi-goal structure need updating; actual issued pass/device proof is separate. |
| Branding → Deliverables → Ticket settings | 5448; event-specific5346 | Global settings and event overrides have different owners; keep both. Generated global PDF and invalid/removal checks remain partial. |
| Integrations → Analytics | 5449,5450; tracking3323–3332 | Saved settings differ from tracking-event proof. Permission/secret visibility and provider-delivery checks remain. |
| Integrations → API allowlist | 5451–5453; WordPress3416 | Direct add/remove/error cases now exist; actual CORS integration and pagination/duplicate boundaries remain. |
| Integrations → Domains | SPT-5461/5462 (formerly missing) | Base custom-domain coverage added after this audit. Allowlists, SSO domains and generic website/calendar cases do not cover DNS ownership, routing, SSL or connection. |

### Existing Email Customization coverage: reuse by type

| Email type / operation | Existing case | Exact scope and remaining correction |
| --- | --- | --- |
| Purchase confirmation | [SPT-3617](https://app.qase.io/case/SPT-3617) | Venue, single event, parent, child and membership group; save/persistence and received content. Current Next.js has no template Reply-To field. |
| Event reminder | [SPT-3618](https://app.qase.io/case/SPT-3618) | Parameters include Venue, but description/steps start at a specific event. Enhance the Venue entry and persistence explicitly; retain real scheduled reminder proof separately from preview. |
| Post event | [SPT-3619](https://app.qase.io/case/SPT-3619) | Venue/event scopes, template content and enabling organization-wide post-event sending. SPT-5447 tests the separate settings form, so it is not a duplicate. |
| Abandoned cart | [SPT-3620](https://app.qase.io/case/SPT-3620) | Venue/event/membership scopes, save/type-switch persistence and received content. Preserve both settings and triggered-email responsibilities when revising. |
| Membership renewal | [SPT-3621](https://app.qase.io/case/SPT-3621) | Membership-group edit and group-over-Venue fallback. Direct Venue full-field save is only partial via 4148’s minimal customization; enhance existing coverage for that entry. |
| Regular hold / Branded sponsor hold | [SPT-4837](https://app.qase.io/case/SPT-4837) | Both Venue-only types, persisted fields, received mail and actual hold-link destination. |
| Waitlist cancellation confirmation | [SPT-4087](https://app.qase.io/case/SPT-4087) | Venue/single/parent/child, save and matching received template. |
| Preview for all eight types | [SPT-4148](https://app.qase.io/case/SPT-4148) | Minimal saved customization, disabled-before-save, invalid recipient, queued/sent action and received preview. Preview does not prove the real scheduled trigger. |
| Invalid input / optional defaults | [SPT-3626](https://app.qase.io/case/SPT-3626) | Invalid Reply-To, invalid banner, oversized message and optional-field fallback. Keep legacy/API Reply-To checks; add modern subject boundary and actual modern error instructions in an enhancement. |
| Delete / fallback | [SPT-4836](https://app.qase.io/case/SPT-4836) | Delete, cleared fields, disabled preview and rendered fallback. Step 5 must use the normal matching email trigger after deletion; the deleted customization’s disabled preview cannot perform this proof. |
| Brand inheritance / email sender | SPT-4125–4128,4132 | Separate brand style, fonts, defaults, sender and inheritance from customization type fields. Preserve their existing contexts. |

**Current source-backed Email Customization controls:** Email type (all eight options), Email subject line, Upload banner image, Custom email message, Save, Send preview email, and Delete only for an existing record. Preview requires a saved record. Banner limits are JPG/PNG, at most 1200×600 and 3 MB; message limit is 14,000. The backend also supports template `reply_to_email`, but the current Next.js form neither renders nor submits it. Branding → Identity has its own Reply-to email field; it is a different scope.

**Additional confirmed source mismatch:** the Next.js subject constant allows **998** characters while `EmailCustomization.email_subject` has a backend maximum of **988**. Add a 988/989 boundary to an enhancement of SPT-3626; no live save was attempted. Do not claim the old cases are ready unchanged for every current client.

**Prerequisite correction from the follow-up:** API allowlist and Domains navigation use **Manage Organization Info**, as does their backend write permission. The published SPT-5451–5453 unnecessarily require Manage Integrations as well. Record removing that extra prerequisite in their next enhancement; their Qase content was not silently changed in this read-only follow-up. The new Domains drafts use the verified permission alone. Analytics still has its separate navigation/edit distinction.

**Duplicate check of the 41 published cases:** no newly published email-template, Identity, Digital Wallet, shipping split, inventory split or transfer-limit happy-path case was created. SPT-5447 (Post-Event switches/messages), SPT-5445 (checkout messaging), SPT-5448 (global ticket PDF settings) and SPT-5449 (saved tracking IDs) prove different controls from the existing template, brand-inheritance, event ticket or tracking-event cases. Those have related setup, not identical actions/results. No duplicate is confirmed among these pairs; broad legacy cases still need the specific enhancements listed above.

**Evidence completeness:** reused the verified post-publication SPT snapshot from **2026-10-15 23:06:29 UTC / 16:06:29 PDT**, 1,922 unique full case definitions over 20 pages, stable total. No intervening Qase writes in this follow-up. The all-field brand/email/settings filter matched 482 references (many incidental); exact title/suite triage was followed by full fields for 3617,3618,3619,3620,3621,3626,4087,4148,4836,4837 and398, plus the earlier reviewed 41 published cases and retained settings/branding cases. Specific all-field custom-domain/DNS/SSL search returned 10 related cases and child/suborganization search 9; none has the missing page’s direct actions/results. Absence is based on that complete saved snapshot, not a title-only query or current run proof.

> [!info]- Additional source evidence for this follow-up
> Same backend/frontend revisions as the main review. [Email types and preview builders](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/emails/constants/configuration.py:44), [EmailCustomization field limits and post-event side effect](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/emails/models/configuration.py:86), [email API fields and ownership](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/emails/api/venue_based/serializers/customization.py:13), [Manage Events and queued preview action](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/emails/api/venue_based/viewsets/customization.py:24), [Venue email type selection](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/emails/customization/ui/components/EmailCustomizationForm/VenueEmailCustomizationForm.tsx:15), [modern form fields/payload](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/emails/customization/ui/components/EmailCustomizationForm/EmailCustomizationForm.web.tsx:108), [frontend subject/message constants](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/emails/customization/constants/email-customization-constants.ts:60), [parent/access-filtered child list](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/suborganizations/ui/pages/SuborganizationsPage.web.tsx:16), [Suborganizations controls](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/suborganizations/ui/components/SuborganizationsContent.web.tsx:20), [Domains list filter/flag](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/domains/ui/pages/DomainsOverviewPage/DomainsOverviewPage.web.tsx:24), [Add domain form](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/domains/ui/components/modals/AddDomainModal/AddDomainModal.web.tsx:31), [custom domain creation and verification API](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/viewsets/domains.py:26). No browser interaction, settings save, DNS change or new Qase write during this follow-up.

## Suborganizations and Domains publication — verified

Verified **2026-10-15 21:14:16 PDT** after the user explicitly requested publishing the four identified candidates. Scope: **create TC-52–55 only**, create/reuse their two matching UI folders, and leave all existing case content and placement unchanged. Both the folder plan and case batch were dry-run before applying.

| Local draft | Published case | Destination | Steps | Tags | Parameters |
| --- | --- | --- | --- | --- | --- |
| TC-52 | [SPT-5459 — Review connected suborganizations](https://app.qase.io/case/SPT-5459) | Settings → Suborganizations (1175) | 3 | dashboard, organizer | None |
| TC-53 | [SPT-5460 — Show when suborganizations are unavailable](https://app.qase.io/case/SPT-5460) | Settings → Suborganizations (1175) | 2 | dashboard, organizer | None |
| TC-54 | [SPT-5461 — Show an empty custom-domain list](https://app.qase.io/case/SPT-5461) | Integrations → Domains (1176) | 3 | dashboard, organizer | None |
| TC-55 | [SPT-5462 — Add a custom domain](https://app.qase.io/case/SPT-5462) | Integrations → Domains (1176) | 4 | dashboard, organizer | None |

Full ID readback matches each intended Title, Description, Preconditions, Postconditions, tags, steps and destination; native parameters are empty. Suite 1175 is Suborganizations under Settings (1157); suite 1176 is Domains under Integrations (1172). Both parents are under Organizer Info (181). No case update, move or deletion occurred.

**Current publication total: 45 new cases across 20 UI folders.** All 21 declared destinations now have at least a base or related Qase definition; partial behavior and full lifecycle gaps remain listed in the audit. No product test was executed, no suborganization registered and no domain/DNS/website data changed as part of this Qase publication.

Audit files: `/private/tmp/qase-organization-settings-four-{before,dry-run,apply,verification}.json` and `four-full-readback.json`. The prior 1,922-case bulk snapshot predates these four creates: retain it as historical evidence and refresh before another broad absence/duplicate analysis. These latest four cases were verified by exact-ID full-field reads.

## Initial 41-case publication — verified

Verified at **2026-10-15T23:06:40.295Z**. User requested the candidate push and reiterated “just push it.” Scope: **create TC-1–14, TC-18 and TC-24–49 only**; create/reuse their UI folders; no existing-case edits, moves or deletions. Both the folder preview and the final case batch were dry-run before their writes.

All **41 cases** match the intended Title, Description, Preconditions, Postconditions, tags, steps, suite and native single-parameter structure. Every created title is unique in the refreshed project snapshot. Full-record comparison confirms **SPT-4826, SPT-4884 and SPT-5139 are unchanged**. Qase case IDs and local draft labels never entered the published Title or execution fields.

| Original local label | Published Qase case | Destination suite | Tags | Parameter | Steps |
| --- | --- | --- | --- | --- | --- |
| TC-1 | [SPT-5418 — Save general details](https://app.qase.io/case/SPT-5418) | 1158 | dashboard, organizer | None | 4 |
| TC-2 | [SPT-5419 — Require a name and timezone](https://app.qase.io/case/SPT-5419) | 1158 | dashboard, organizer, edge-case | RequiredField: Organization name, Timezone | 4 |
| TC-3 | [SPT-5420 — Save the private-organizer setting](https://app.qase.io/case/SPT-5420) | 1158 | dashboard, organizer | PrivateChoice: On, Off | 4 |
| TC-4 | [SPT-5421 — Save contact details](https://app.qase.io/case/SPT-5421) | 1159 | dashboard, organizer | None | 4 |
| TC-5 | [SPT-5422 — Save the organization address](https://app.qase.io/case/SPT-5422) | 1159 | dashboard, organizer | None | 4 |
| TC-6 | [SPT-5423 — Reject incomplete customer contact details](https://app.qase.io/case/SPT-5423) | 1159 | dashboard, organizer, edge-case | InvalidContact: Missing support email, Invalid accounting recipient | 4 |
| TC-7 | [SPT-5424 — Save weekly business hours](https://app.qase.io/case/SPT-5424) | 1160 | dashboard, organizer | None | 4 |
| TC-8 | [SPT-5425 — Add a schedule exception](https://app.qase.io/case/SPT-5425) | 1160 | dashboard, organizer | None | 4 |
| TC-9 | [SPT-5426 — Edit a schedule exception](https://app.qase.io/case/SPT-5426) | 1160 | dashboard, organizer | None | 4 |
| TC-10 | [SPT-5427 — Delete a schedule exception](https://app.qase.io/case/SPT-5427) | 1160 | dashboard, organizer | None | 4 |
| TC-11 | [SPT-5428 — Cancel an exception deletion](https://app.qase.io/case/SPT-5428) | 1160 | dashboard, organizer | None | 4 |
| TC-12 | [SPT-5429 — Reject an invalid exception date](https://app.qase.io/case/SPT-5429) | 1160 | dashboard, organizer, edge-case | InvalidDate: Past date, Duplicate date | 4 |
| TC-13 | [SPT-5430 — Save organizer options](https://app.qase.io/case/SPT-5430) | 1161 | dashboard, organizer | None | 4 |
| TC-14 | [SPT-5431 — Save exchange settings](https://app.qase.io/case/SPT-5431) | 1161 | dashboard, organizer | Audience: Box Office + Public, Box Office Only, Public Only | 4 |
| TC-18 | [SPT-5432 — Reject an invalid ticket-transfer limit](https://app.qase.io/case/SPT-5432) | 1162 | dashboard, organizer, edge-case | InvalidLimit: Empty, Zero | 4 |
| TC-24 | [SPT-5433 — Add a checkout consent item](https://app.qase.io/case/SPT-5433) | 1163 | dashboard, organizer | None | 4 |
| TC-25 | [SPT-5434 — Edit a checkout consent item](https://app.qase.io/case/SPT-5434) | 1163 | dashboard, organizer | None | 4 |
| TC-26 | [SPT-5435 — Change a consent item status](https://app.qase.io/case/SPT-5435) | 1163 | dashboard, organizer | StatusAction: Deactivate, Reactivate | 4 |
| TC-27 | [SPT-5436 — Reorder checkout consent items](https://app.qase.io/case/SPT-5436) | 1163 | dashboard, organizer | None | 3 |
| TC-28 | [SPT-5437 — Prevent conflicting consent choices](https://app.qase.io/case/SPT-5437) | 1163 | dashboard, organizer | ConsentChoice: Required checkbox, Agreement by continuing | 4 |
| TC-29 | [SPT-5438 — Require consent copy and a unique reporting label](https://app.qase.io/case/SPT-5438) | 1163 | dashboard, organizer, edge-case | InvalidConsent: Empty copy, Duplicate label | 4 |
| TC-30 | [SPT-5439 — Preview a saved consent item](https://app.qase.io/case/SPT-5439) | 1163 | dashboard, organizer | None | 3 |
| TC-31 | [SPT-5440 — Save checkout terms](https://app.qase.io/case/SPT-5440) | 1164 | dashboard, organizer | None | 4 |
| TC-32 | [SPT-5441 — Reject missing checkout terms](https://app.qase.io/case/SPT-5441) | 1164 | dashboard, organizer, edge-case | None | 4 |
| TC-33 | [SPT-5442 — Save payment-plan terms](https://app.qase.io/case/SPT-5442) | 1164 | dashboard, organizer | None | 4 |
| TC-34 | [SPT-5443 — Save the default refund-policy text](https://app.qase.io/case/SPT-5443) | 1164 | dashboard, organizer | None | 4 |
| TC-35 | [SPT-5444 — Save public-profile details](https://app.qase.io/case/SPT-5444) | 1166 | dashboard, organizer | None | 4 |
| TC-36 | [SPT-5445 — Save checkout messaging](https://app.qase.io/case/SPT-5445) | 1167 | dashboard, organizer | None | 4 |
| TC-37 | [SPT-5446 — Reject line breaks in subscription messaging](https://app.qase.io/case/SPT-5446) | 1167 | dashboard, organizer, edge-case | None | 4 |
| TC-38 | [SPT-5447 — Save post-event email options](https://app.qase.io/case/SPT-5447) | 1169 | dashboard, organizer | None | 4 |
| TC-39 | [SPT-5448 — Save ticket PDF branding](https://app.qase.io/case/SPT-5448) | 1171 | dashboard, organizer | None | 4 |
| TC-40 | [SPT-5449 — Save organization analytics settings](https://app.qase.io/case/SPT-5449) | 1173 | dashboard, organizer | None | 4 |
| TC-41 | [SPT-5450 — Reject an invalid analytics ID](https://app.qase.io/case/SPT-5450) | 1173 | dashboard, organizer, edge-case | None | 4 |
| TC-42 | [SPT-5451 — Add an API allowlist domain](https://app.qase.io/case/SPT-5451) | 1174 | dashboard, organizer | None | 3 |
| TC-43 | [SPT-5452 — Remove an API allowlist domain](https://app.qase.io/case/SPT-5452) | 1174 | dashboard, organizer | None | 3 |
| TC-44 | [SPT-5453 — Reject an invalid allowlist URL](https://app.qase.io/case/SPT-5453) | 1174 | dashboard, organizer, edge-case | None | 3 |
| TC-45 | [SPT-5454 — Restrict settings to the permitted employee](https://app.qase.io/case/SPT-5454) | 1158 | dashboard, organizer, employee-permissions | None | 3 |
| TC-46 | [SPT-5455 — Discard an unsaved General edit](https://app.qase.io/case/SPT-5455) | 1158 | dashboard, organizer | None | 3 |
| TC-47 | [SPT-5456 — Keep settings within the selected organization](https://app.qase.io/case/SPT-5456) | 1158 | dashboard, organizer | None | 4 |
| TC-48 | [SPT-5457 — Open settings through the legacy entry](https://app.qase.io/case/SPT-5457) | 1158 | dashboard, organizer | EntryVersion: Legacy, New embed | 2 |
| TC-49 | [SPT-5458 — Save a timezone for a new organization](https://app.qase.io/case/SPT-5458) | 1158 | dashboard, organizer | None | 4 |

**Verified folders at the initial publication:** Emails (1168) was subsequently replaced by the preserved existing Emails (523); Post-Event (1169) now belongs to 523. See the completed consolidation receipt below.

| Folder | Suite ID | Parent suite |
| --- | --- | --- |
| Organizer Info → Settings | 1157 | 181 |
| Organizer Info → Settings → General | 1158 | 1157 |
| Organizer Info → Settings → Contact | 1159 | 1157 |
| Organizer Info → Settings → Business Schedule | 1160 | 1157 |
| Organizer Info → Settings → Enabled modules | 1161 | 1157 |
| Organizer Info → Settings → Ticketing | 1162 | 1157 |
| Organizer Info → Settings → Checkout Consent | 1163 | 1157 |
| Organizer Info → Settings → Legal | 1164 | 1157 |
| Organizer Info → Branding | 1165 | 181 |
| Organizer Info → Branding → Profile | 1166 | 1165 |
| Organizer Info → Branding → Messaging | 1167 | 1165 |
| Organizer Info → Branding → Emails | 1168 | 1165 |
| Organizer Info → Branding → Emails → Post-Event | 1169 | 1168 |
| Organizer Info → Branding → Deliverables | 1170 | 1165 |
| Organizer Info → Branding → Deliverables → Ticket settings | 1171 | 1170 |
| Organizer Info → Integrations | 1172 | 181 |
| Organizer Info → Integrations → Analytics | 1173 | 1172 |
| Organizer Info → Integrations → API allowlist | 1174 | 1172 |

**Unpublished:** TC-15/16/50 overlap inventory coverage; TC-19–23/51 overlap shipping coverage; TC-17 is the SPT-5139 repair alternative. Publishing these alongside unchanged originals would create duplicates. The two existing-case split drafts remain held until every original assertion has a verified home.

Fresh post-write project snapshot: **1,922 cases / 1,922 unique IDs, 20 pages**, stable API total, retrieved **2026-10-15 23:06:29 UTC / 16:06:29 PDT**. Pre-write total was 1,881; the increase is exactly 41. This snapshot belongs to the initial 41-case publication; it predates the four additional cases above. Refresh before future broad gap work. Temporary audit files: `/private/tmp/qase-organization-settings-publish-{before,dry-run,apply,verification}.json`; full readback `/private/tmp/qase-organization-settings-publish-after-cases-all.json`. Sanitized mapping and results are retained here. No browser form or Showpass organization data was changed during publication.

## Query completeness and sources reviewed

- Qase project **SPT**, retrieved **2026-10-15 22:41:22 UTC / 15:41:22 PDT**: **19 pages, 1,881 records, 1,881 unique IDs**, matching a stable API total. Full Title, Description, Preconditions, Postconditions, steps, native parameters, tags and suite IDs were available. No execution results or run history were queried.
- Main local full-field filter: `organization.settings|organizer.info|business.schedule|AR/AP|low.inventory|accounting_emails|event_transfer_limit|shipping_quantity_limit|checkout.consent|branding|post.event.email|payment.information|event.upsell|whitelist|allowlist|custom.domain|default.refund.policy|terms.URL`, plus suite 181. **162 matches**; many are downstream checkout/WordPress references rather than settings-form coverage. Additional field aliases (`ticket_logo`, Custom ticket message, schedule exception, shipping message, consent edit/reorder/deactivate/create) were searched locally. Search matches were triaged; only the focused comparison set below is treated as reviewed coverage.
- Exact full-field comparison set: **354,355,394,1346,1650,1653,1654,2885,3097,3172–3177,3179,3180,3182,3619,3871,4009,4124–4128,4132,4335,4742,4798,4826,4837,4884,4968,4970,5139,5250–5252,5254,5308**, plus SPT-5388 solely to resolve the mismatched supplied case link. Other related IDs in the coverage table are discovery references requiring an exact review before reuse narrows another case. Absence claims concern matching settings definitions, not every downstream assertion across the entire product.
- Suite 181 readback: **Organizer Info**, parent **78**, **5 direct cases**: 354,355,4826,4884,5139. No suite mutation. Query files are temporary under `/private/tmp/qase-organization-settings-*`; sanitized conclusions are retained here rather than copying the API project into the vault.
- Local case parser before publication: **53 complete definitions**, **205 steps**, **2–5 steps per case**, **0 or 1 parameter per case**. Required fields, parsed step counts and label exclusion checked. Publication created only the 41 distinct new candidates; see the verified record below. Format and Qase readback checks are not product execution.

> [!info]- Source anchors, handbook selections and observed UI
> **Backend revision:** `2dc5cd3d89c31596e248dafe41c44503ac97aeee`; **frontend revision:** `bce2f9f2b8f5941f4bf80f8f9473fa0fb1361fb4`. Local checkout source, no supplied settings PR/branch diff and no source-repository changes. The older Playwright coverage PR from a different scope was not treated as evidence for these settings.
>
> Backend: [legacy view, permissions and tab mappings](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/dashboard/views.py:36), [settings serializer](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/serializers.py:42), [venue update permissions/currency lock](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/user_based/viewsets.py:51), [Venue fields/normalization and save effects](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/venue.py:270), [text limits](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/venue_settings.py:319), [timezone guard](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/timezones/context_transition.py:1005), [schedule exceptions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/schedule_exceptions.py:8), [exception permissions/date filtering](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/viewsets/employment.py:201), [consent invariants](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/customers_management/consent.py:88), [consent API](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/viewsets/consents.py:8), [allowlist/custom domain validation](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/serializers/domains.py:13), [ticket PDF settings](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/ticket_lifecycle/ticket.py:1256), [ticket-settings permissions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/ticket_types.py:168), [branding permissions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/viewsets/branding.py:25).
>
> Frontend: [Organization sidebar and permissions](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/constants/organization-config.ts:62), [settings save hook](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/hooks/useOrganizationVenueSettingsMutation.ts:14), [General form](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/ui/pages/GeneralPage.web.tsx:25), [Contact form](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/ui/pages/ContactPage.web.tsx:56), [weekly schedule](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/ui/pages/SchedulePage.web.tsx:49), [modules fields/validation](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/modules/ui/pages/ModulesOverviewPage.web.tsx:94), [module visibility/dependencies](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/modules/ui/components/ModulesSettingsContent.web.tsx:36), [shipping fields](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/ui/pages/ShippingFulfillmentPage.web.tsx:57), [shipping normalization](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/utils/organization-shipping-utils.ts:40), [consent list/loading/reorder recovery](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/custom-consent/ui/pages/CustomConsentPage.web.tsx:31), [consent form rules](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/custom-consent/ui/components/ConsentItemFormContent.web.tsx:27), [Legal fields](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/settings/ui/pages/LegalPage.web.tsx:64), [branding route permissions](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/constants/branding-config.ts:61), [Analytics validation](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/integrations/analytics/ui/pages/AnalyticsPage.web.tsx:30), [allowlist controls](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/integrations/api-allowlist/ui/components/WhitelistDomainsCard.web.tsx:30).
>
> Applied [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]], [[05 Tooling/qasectl]], [[06 Prompts/Showpass Qase Gap Analysis]]. Handbook selections: [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup]] for exact organization/currency/timezone, controlled destinations and restoration; [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations]] for configuration versus preview versus actual delivery. Backend/API invariants should be automated below the browser; selected form save/reopen, wrong-role and organization-switch checks suit Playwright. Actual wallet/device and provider-delivery evidence remain separate.
>
> Browser: read-only desktop inspection on `demo.showpass.com`, authorized matching open tab. Visited General, Contact, Business Schedule, Enabled modules, Ticketing, Shipping & Fulfillment, Checkout Consent, Legal, Identity, Profile, Messaging, Post-Event and the legacy entry. Restored the original modern settings root. No form fields changed, Save selected, upload, message sent, flag changed or record mutation. Mobile, French, bank authorization, Customer refunds, custom domains and physical devices were not executed. Screenshot confirms navigation and visible General controls only.
>
> ![[03 Test Cases/Organizations/evidence/organization-settings-navigation-2026-10-15.png]]


## Suite 744 beta refresh — verified publication

**Read completeness:** fresh SPT snapshot retrieved **2026-10-15 21:32:35 PDT / 2026-10-16 04:32:35 UTC**: **1,926 records / 1,926 unique IDs, 20 pages**, matching a stable API total. Suite 744 readback: **Identity**, parent **1165**, five direct cases. Filtered full title, description, setup, cleanup, parameters, tags and steps with `branding|adobe|woff2|font.*(upload|library)|identity|will.call.*label`: **43 matches**, triaged locally. Full-field comparison: **4124,4125,4126,4127,4128,4132,4335,4742**. SPT-5444 is Profile in suite 1166 and is excluded. Run history was not queried. This snapshot supersedes earlier snapshots for this refresh only; prior publication receipts remain historical records.

**Approved and applied scope:** 13 operations, **52 step rows**, all in existing suite **744**. Four Identity updates select only title, description, preconditions, postconditions, tags, params and steps, preserving unrelated metadata. SPT-4742 selects **steps only**; a field-by-field comparison confirmed that only its first action changes. Eight creates received SPT-5463–5470. No suite changes, moves or deletions. Dry-run, apply and full-field readback completed; **all 13 operations verified**. Full saved case fields are in Branding → Identity and Deliverables → Digital Wallets above.

| Case / draft | Operation | Exact title | Suite | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| SPT-4124 | Enhance | Dashboard - Branding - Create initial branding configuration for an organization | 744 | dashboard, appearance | BrandingAttribute: Logo, HeaderImage, PrimaryColor, SecondaryColor, ColorMode, LayoutPreset, HeadingFont, BodyFont, EmailBackgroundColor, WillCallDisplayLabel | 4 |
| SPT-4125 | Enhance | Dashboard - Branding - Apply organization branding to event emails | 744 | dashboard, appearance, notifications | BrandingAttribute: Logo, HeaderImage, BackgroundColor, PrimaryAndSecondaryColor, HeadingFont, BodyFont, None | 5 |
| SPT-4127 | Enhance | Dashboard - Branding - Show email defaults without branding | 744 | dashboard, appearance, notifications | None | 3 |
| SPT-4335 | Enhance | Dashboard - Branding - Save and use an Adobe font | 744 | dashboard, appearance, notifications | FontUse: Heading, Body | 5 |
| SPT-4742 | Update entry action only | Dashboard - Branding - Digital Wallet Branding Management Flow | 744 | dashboard, branding, wallet | NFCEvent: True, False; OS: iOS, Android | 8 |
| SPT-5517 | Create | Dashboard - Branding - Save changes to existing Identity branding | 744 | dashboard, appearance | None | 4 |
| SPT-5518 | Create | Dashboard - Branding - Reject invalid email identity details | 744 | dashboard, appearance, edge-case | InvalidField: FromName, ReplyTo, Website | 3 |
| SPT-5519 | Create | Dashboard - Branding - Clear a saved Identity value | 744 | dashboard, appearance | BrandingField: Logo, PrimaryColor, HeadingFont, ReplyTo | 3 |
| SPT-5520 | Create | Dashboard - Branding - Save a Google font from a link or family name | 744 | dashboard, appearance | FontInput: FamilyName, SpecimenLink | 3 |
| SPT-5521 | Create | Dashboard - Branding - Upload and select a licensed font | 744 | dashboard, appearance | FontUse: Heading, Body | 5 |
| SPT-5522 | Create | Dashboard - Branding - Prevent deletion of the last font face in use | 744 | dashboard, appearance, edge-case | None | 3 |
| SPT-5523 | Create | Dashboard - Branding - Delete an unused uploaded font face | 744 | dashboard, appearance | None | 3 |
| SPT-5524 | Create | Dashboard - Branding - Reject an oversized brand image | 744 | dashboard, appearance, edge-case | ImageField: Logo, Header | 3 |

### Approved preservation decisions

| Existing case | Kept | Proposed correction |
| --- | --- | --- |
| SPT-4124 | Initial creation, all ten BrandingAttribute values, saved values/defaults after reopening | Current Dashboard entry, one page-wide Save and exact data mapping. Remove the assertion that unchanged Save cannot create a record: the current frontend calls create when no configuration exists and the backend creates/assigns it. The refreshed case changes the chosen value before first Save; untouched-Save behavior remains a separate API/UI follow-up. |
| SPT-4125 | All seven parameter values, logo/header/background/fonts, unset-field fallback, received-email proof; add explicit font-blocking client check | Replace the obsolete “primary/secondary colors are ignored” assertion with the current template colors. Distinguish a saved-but-blank configuration (`None`) from no configuration (SPT-4127). |
| SPT-4127 | No organization/event branding and readable fallback email | Use the supported saved-template Send preview email flow instead of assuming Identity’s Email preview sends anything. |
| SPT-4335 | Adobe configuration, persistence and received-email font check | Require both Project ID and Font ID; cover Heading and Body using one small parameter. Replace the unverified list of fonts guaranteed to work in Gmail with a readable fallback expectation; no claim that every email client renders custom fonts. |
| SPT-4742 | All eight lifecycle steps/results/data, OS and NFCEvent parameters, metadata and suite placement | Replace only its obsolete hard-coded entry action with Dashboard → Settings → Organization Info → Branding → Deliverables → Digital Wallets. Its broad mixed lifecycle, generic failure simulation and device setup remain unrefined; navigation correction does not resolve those gaps. |

### Current Identity coverage accounting

| Function / state | Definition coverage | Evidence / remaining scope |
| --- | --- | --- |
| Reach Identity from retained Dashboard; first save | SPT-4124 proposed enhancement | Beta visible-link entry confirmed inside `/dashboard/venues/edit/`; first-save persistence not executed. No standalone `/manage/` shell used for the navigation proof. |
| Existing organization: all base fields, Light/Dark and Classic/Hero choices, previews | SPT-5517 | Controls and choices observed. Proposed save/reopen uses Dark/Hero; Light/Classic save combinations remain selected follow-up, not exhaustive theme coverage. Previews are approximate. |
| Email identity and website link fields | SPT-5517/57/58; reuse SPT-4132’s delivered sender responsibilities | From name, Reply-to email, website URL/display text are present. **From email is intentionally hidden** in BrandingFormSection pending sender authentication; it is not a missing beta control. SPT-4132 remains unchanged outside this suite and needs a separate exact-case update before reuse as current UI coverage. |
| Google / Adobe / uploaded fonts | SPT-4124/4335, SPT-5520/60 | Provider tabs and library controls observed. Google category selection and link input, both Adobe identifiers, licensed upload/selection are defined; font persistence and delivery unexecuted. |
| Clear saved values / fallbacks | SPT-5519; SPT-4125/4127 | Four representative control types covered by drafts; remaining individual field clearing and empty sender/website nuances remain follow-up. No config and a saved empty config are distinct. |
| Image selection, cropping and limits | SPT-4124, SPT-5517/58/63 | Supported PNG data, Finish Cropping and oversized files defined. Existing library selection, crop restart/cancel, unsupported types, exact size/dimension boundaries and smaller-than-backend-minimum assets remain follow-up. Logo help advertises SVG but the image input accepts JPG/PNG; frontend minimum dimensions differ from backend. These are source mismatches, not live upload failures. |
| Font-library deletion and license gate | SPT-5521/61/62 | Library/license controls observed. Saving an uploaded family and deleting a referenced/unused face are source-backed drafts. Unsupported/oversized/corrupt font files, duplicate face upload, multiple weights/styles, another face remaining, website references and cross-organization isolation remain deferred API/manual checks. |
| Delivery label | SPT-4124 and SPT-5517 retain Pick up save/reopen | Beta shows Will Call/Pick up. `branding_hub_will_call_display_label` off, Will Call save, checkout/order-details/Box Office labels remain distinct unexecuted checks. |
| Delivered email inheritance / defaults | SPT-4125/4127/4335 enhanced; SPT-4126/4128 retained in suite 1050 | Preview email delivery must be executed separately from the approximate Identity preview. A delivered preview is not a normal purchase-triggered send; production purchase/reminder/member paths remain downstream proof. No email was sent in this audit. |
| Role, organization and rollout boundaries | Explicit unexecuted scope | Identity navigation requires Manage Events; branding/media writes require Manage Organization Info. Draft positive setup includes both. Single-permission roles, wrong organization and `branding_hub`/embed off remain unexecuted; no blanket authorization pass. |
| Migration of old branding data and other public consumers | Unresolved compatibility proof | Compare existing legacy logo/background and organization branding configuration on prepared data before claiming migration continuity. Saved form/previews do not establish actual public event/membership, checkout, website or email appearance. Existing event/child cases retain separate responsibilities. |
| Digital Wallets | SPT-4742 entry-only enhancement | Current beta destination observed through visible Dashboard navigation. No upload, deletion, NFC/iOS/Android pass update, failure recovery or physical-device result executed. |

> [!info]- Source and browser evidence for this refresh
> Backend `2dc5cd3d89c31596e248dafe41c44503ac97aeee`; frontend `bce2f9f2b8f5941f4bf80f8f9473fa0fb1361fb4`. Same local revisions as the earlier audit; no supplied PR/diff, no repository updates. The deployed build revision is unknown. No deployed/source difference is inferred solely from a field-builder function: rendering also intentionally hides From email.
>
> Backend: [branding validation and image limits](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/branding_config.py:35), [API write permissions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/viewsets/branding.py:25), [create/assign service](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/branding/save_branding_config.py:20), [inheritance hierarchy](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/branding_customization/hierarchy_loader.py:1), [email logo/header/fonts/fallback](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/emails/__base2020.html:17), [email primary/secondary button colors](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/emails/__style_emails_2018.html:407), [font validation](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/venue_based/serializers/media.py:44), [font deletion guard](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/branding/font_asset_operations.py:46), [preview dispatch permissions](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/emails/api/venue_based/viewsets/customization.py:24).
>
> Frontend: [Identity flags and sections](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/ui/pages/IdentityPage.web.tsx:34), [current single Save/create/update behavior](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/ui/components/BrandingConfigForm/BrandingConfigForm.web.tsx:89), [intentional From email hiding](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/ui/components/BrandingConfigForm/components/BrandingFormSection.web.tsx:77), [font provider inputs](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/components/application/form/FontFamilyField/FontFamilyField.web.tsx:382), [licensed font library](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/media-library/ui/components/FontMediaLibrary/FontMediaLibraryModal.web.tsx:83), [field reset](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/ui/components/BrandingConfigForm/components/BrandingFieldResetButton.web.tsx:23).
>
> Handbook: [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations#Email configuration → actual Customer delivery]] and its senior-QA variations. Use save/reopen at the browser layer, API validation/ownership checks below it, and controlled inbox/physical-device checks for delivery. Preview-only evidence is labeled separately.
>
> Beta browser: same signed-in account/organization retained. Inspected Identity, Adobe/Upload font tabs, empty font library/license control, approximate Email preview, and Digital Wallets, returning to Identity. No field values entered, file uploaded, Save/Delete selected, flag changed, email sent or Qase write applied. Narrow viewport, French, other roles/configurations and live saving were not executed.
>
> ![[03 Test Cases/Organizations/evidence/beta-identity-email-preview.png|700]]

Local dry-run receipt: `/private/tmp/qase-branding-beta-dry-run.json`; batch plan: `/private/tmp/qase-branding-beta-batch.json`; complete snapshot: `/private/tmp/qase-branding-beta-cases-all.json`. The user approved and the plan was applied successfully; **do not rerun its create operations**. New cases have at most one native parameter; preserved SPT-4742 retains its two existing parameters. No local TC label occurs in a Qase Title. Full readback: `/private/tmp/qase-branding-beta-full-readback.json`; verification receipt: `/private/tmp/qase-branding-beta-verification.json`.


### Suite 744 publication receipt

Verified **2026-10-15 21:43:24 PDT** (2026-10-16T04:43:24.347Z). Updated **SPT-4124/4125/4127/4335/4742** and created **SPT-5463–5470**, all in **Identity (744)** under Branding (1165). The suite contains **13 cases**. Every sent text field, step action/data/result, tag and parameter matched readback; unrelated priority/type/behavior/layer/suite metadata was preserved for updates. SPT-4742 retained its original assertions, OS/NFC parameters and other fields; only its first navigation action changed.

| Preview label | Qase ID | Saved title | Steps | Readback |
| --- | --- | --- | --- | --- |
| SPT-4124 | [SPT-4124](https://app.qase.io/case/SPT-4124) | Dashboard - Branding - Create initial branding configuration for an organization | 4 | Verified |
| SPT-4125 | [SPT-4125](https://app.qase.io/case/SPT-4125) | Dashboard - Branding - Apply organization branding to event emails | 5 | Verified |
| SPT-4127 | [SPT-4127](https://app.qase.io/case/SPT-4127) | Dashboard - Branding - Show email defaults without branding | 3 | Verified |
| SPT-4335 | [SPT-4335](https://app.qase.io/case/SPT-4335) | Dashboard - Branding - Save and use an Adobe font | 5 | Verified |
| SPT-4742 | [SPT-4742](https://app.qase.io/case/SPT-4742) | Dashboard - Branding - Digital Wallet Branding Management Flow | 8 | Verified |
| SPT-5517 | [SPT-5463](https://app.qase.io/case/SPT-5463) | Dashboard - Branding - Save changes to existing Identity branding | 4 | Verified |
| SPT-5518 | [SPT-5464](https://app.qase.io/case/SPT-5464) | Dashboard - Branding - Reject invalid email identity details | 3 | Verified |
| SPT-5519 | [SPT-5465](https://app.qase.io/case/SPT-5465) | Dashboard - Branding - Clear a saved Identity value | 3 | Verified |
| SPT-5520 | [SPT-5466](https://app.qase.io/case/SPT-5466) | Dashboard - Branding - Save a Google font from a link or family name | 3 | Verified |
| SPT-5521 | [SPT-5467](https://app.qase.io/case/SPT-5467) | Dashboard - Branding - Upload and select a licensed font | 5 | Verified |
| SPT-5522 | [SPT-5468](https://app.qase.io/case/SPT-5468) | Dashboard - Branding - Prevent deletion of the last font face in use | 3 | Verified |
| SPT-5523 | [SPT-5469](https://app.qase.io/case/SPT-5469) | Dashboard - Branding - Delete an unused uploaded font face | 3 | Verified |
| SPT-5524 | [SPT-5470](https://app.qase.io/case/SPT-5470) | Dashboard - Branding - Reject an oversized brand image | 3 | Verified |

No suite creation, case movement or deletion occurred. No beta organization data was changed. Qase publication does **not** establish a product test pass: save/reopen, uploads/deletions, received-email and device outcomes remain unexecuted. The 1,926-case project snapshot above is the pre-write baseline and now predates eight creates; refresh it before another broad absence analysis.


## Emails suite consolidation — completed and verified

The user clarified that existing **Organization Settings - Emails (523)** must replace the bare **Emails (1168)** in the current **Organizer Info (181) → Branding (1165)** hierarchy. This supersedes the earlier broad suite-1090 move proposal. **Do not move 1090 or the Customer Refunds tree as part of this correction.**

Read-only dry-run: rename/reparent **523 → Emails, parent 1165**; reparent **Post-Event (1169) → parent 523**; remove duplicate folder **1168** only after confirming zero direct cases and zero child suites. Preserve children **749 Email Customization, 750 Sender, 1017 Membership Batch Email** and their case membership. No case creation, content changes, individual case moves or deletion.

Fresh SPT bulk snapshot: **1,934 unique cases, 20 pages**, stable API total. Full-field duplicate review compared **863,3617,3619,3620,3621,3626,4087,4132,4148,4836,4837,5447**. No exact definition matches against the project snapshot and no redundant pair requiring removal was found among these 12 responsibilities. SPT-3619 covers post-event template customization/delivery; SPT-5447 covers organization post-event options/save. SPT-4148’s all-type preview and recipient validation remain distinct from scope-specific content and delivery checks. Partial overlap elsewhere in the project is not ruled out.

Preview: `/private/tmp/qase-emails-merge-preview.json`; full before-state: `/private/tmp/qase-emails-merge-before.json`; duplicate review: `/private/tmp/qase-emails-merge-duplicate-review.json`. The user explicitly identified 1168 → 523 and requested placement in the correct current suite; this hierarchy correction is authorized. The [Qase suite API](https://developers.qase.io/reference/update-suite) supports parent/title updates. [Suite deletion](https://developers.qase.io/reference/delete-suite) is guarded because it can delete contained cases; the script must stop unless 1168 is completely empty.


### Emails consolidation receipt

Verified **2026-10-15 21:54:47 PDT** (2026-10-16T04:54:47.504Z). Final location: **Dashboard (78) → Organizer Info (181) → Branding (1165) → Emails (523)**. The existing Emails suite was renamed to the visible UI label **Emails**, preserving suite ID 523.

| Suite | ID | Parent | Direct cases |
| --- | --- | --- | --- |
| Emails | 523 | 1165 | 0 |
| Email Customization | 749 | 523 | 9 |
| Sender | 750 | 523 | 1 |
| Membership Batch Email | 1017 | 523 | 1 |
| Post-Event | 1169 | 523 | 1 |

Preserved and read back all full case fields for **SPT-863, SPT-3617, SPT-3619, SPT-3620, SPT-3621, SPT-3626, SPT-4087, SPT-4132, SPT-4148, SPT-4836, SPT-4837, SPT-5447**. Compared title, description, setup/cleanup, parameters, tags, suite membership, priority/type/behavior/layer and every step action/data/result. **All unchanged.** Existing child relationships were preserved; only Post-Event (1169) was reparented from 1168 to 523. Duplicate Emails (1168) was deleted only after the fresh suite read confirmed zero direct cases and zero children. No Qase case creates, content edits, individual case moves or deletes occurred.

The 12 reviewed cases retain distinct responsibilities; no new duplicate case was introduced. Existing partial overlaps remain useful coverage, including post-event template delivery versus post-event settings persistence. This folder operation does not fix previously recorded stale email-case instructions or establish an executed product pass. Suite 1090 and its Customer Refunds branch were not moved; the clarified request concerned Emails.

Receipts: `/private/tmp/qase-emails-merge-{before,preview,journal,duplicate-review,verification}.json`; unchanged full case readback: `/private/tmp/qase-emails-merge-full-readback.json`.

## Finance duplicate and preservation review

**No duplicate candidate was identified after comparing the full matching existing cases and the new cases' actions/results.** This is bounded by the complete snapshot and the alias searches below. Existing multi-purpose cases must be replaced by their approved focused update **in the same publication** as their companions; do not publish companion creates alone. No case or suite was deleted during this publication.

| Existing case / proof | Decision | Preservation / reason not to duplicate |
| --- | --- | --- |
| SPT-5118 create/edit/invalid/access/CRUD | Enhance creation in place; companions SPT-5517–5525 | Type Fee/Tax remains in one creation and one editing case, with clear setup. Initial card →5118; edit→100; additional card→101; cancel→102; activation→103; missing Other selection→104; card removal→105; cancel deletion→106; definition deletion→107; tab/direct-page access→108. Its five original actions and generic expected assertions are mapped, not silently discarded. Native Type parameters replace the old descriptive JSON with the same two meanings. |
| SPT-1650 valid banking + incomplete authorization | Enhance successful save in place; SPT-5530 incomplete authorization | Keep CAD/USD, both entry paths, complete authorization, requested verification and saved record. SPT-5530 keeps incomplete input unavailable as its own flow. Setup must use approved non-live bank details and an authorized signer; no bank action was executed. |
| SPT-1653 access restrictions | Enhance with explicit Account/environment mapping | Preserve allowed employee and restricted production administrator. Add no-bank-permission and non-production administrator distinctions. Correct the old unconditional admin denial using `APP_ENV !== production`; do not claim server rejection from a hidden button. Direct mutating API denial remains a separate backend proof target. |
| SPT-4095 missing-bank banner | Keep unchanged; do not add a second banner/initial-save case | It already owns the missing-bank banner, Organization Settings link and banner removal after first setup. Updated1650/1654 explicitly start with an existing non-live preference. Its old arbitrary-bank-input and admin-deletion setup instructions need a safe rewrite before execution; no data was deleted here. |
| SPT-1654 notifications | Enhance in place, not a second notification case | Retain saved update, actual received content, recipient deduplication and masking. Bind email proof to CAD; USD does not enable this notification in the reviewed serializer. Production finance recipient is conditional; non-production must not send to it. Transit/account expose only their final three digits. |
| SPT-5443 refund-policy text | Enhance entry mapping in place | One case owns the same saved text via legacy Financial Settings and new Legal. Current short text stays within512 characters. It does not prove automated refunds or public event rendering. |
| SPT-968,5403 product settings | Keep unchanged | Product/variant overrides have a different owner from organization defaults. SPT-5526/5534 do not repeat a product-specific save. |
| SPT-3168,3169;3142/3156/3492;3876 | Keep checkout assertions unchanged | Purchases and post-purchase amounts are different proof from definition/card persistence and tax-card selection. Do not create copies of their completed-checkout tests. Calculator/setting success does not count as charge reconciliation. |
| SPT-3586,3587 internal fee calculator/configuration | Reuse and plan source-bound entry enhancement; no duplicate calculator create | The existing3586 owns calculated components/totals, but its Internal Fees entry is not an executed legacy Calculate Fees check. Add the organization entry only for Ticket/Product; keep its existing Donation/GiftCard/Membership scope on supported entries. A deterministic whole-breakdown oracle and supported combinations are required before publishing that enhancement. |
| SPT-4826 low inventory,4884 shipping,5139 ticketing | Preserve held splits | Already overlap the held local companions in the earlier note. The new finance batch does not create those held companions or remove their original assertions. |
| SPT-5531 all legacy tabs / SPT-5457 default rollout entry / SPT-5533 moved finance functions | Separate named navigation outcomes | Default presentation, a selected legacy tab, and business access after replacement are different starting states/proof targets. One Tab/Function parameter avoids cloning the same steps for each choice. Neither navigation case substitutes for save behavior. |

### Finance control/state accounting

| Control or outcome | Definition / status | Remaining proof or setup |
| --- | --- | --- |
| Type/Name/Enabled, initial rate card, item/platform/payment selectors, fee amount/percentage/tax rate/Customer Pays | SPT-5118,SPT-5517/5518/5520; definition published; execution pending | Fee and Tax use one compact mapping per shared flow. Membership item requires the module; ordinary initial runs use Ticket and added-card run uses Product. Broader selector combinations are deferred to changed-risk selections, not a Cartesian matrix. |
| Existing card edits, add, cancel, permanent deletion and cancellation | SPT-5517–5524; definition published; execution pending | Standalone prepared unused definitions; card deletion retains its definition/sibling. No live deletes were attempted. Partial multi-card-save failure is deferred until a reproducible controlled failure setup exists. |
| Other payment choice missing | SPT-5521; definition published; execution pending | Backend requires a named same-organization Other subtype. Cross-organization/missing IDs are backend regression targets in fee-configuration tests; UI lists alone do not prove isolation. |
| Processing/Showpass Customer Pays | SPT-5526; definition published; execution pending | Settings persist independently; actual card/Cash/Other charges and absorbed refunds remain in the existing financial cases and were not executed. |
| Sales Tax Number / Sales Tax Exempt | SPT-5527; definition published; execution pending | Exact approved non-live tax number and both states. Blank/32/33-character, whitespace and actual tax application are deferred;32 is the current new-form input limit, not a blanket proven legacy limit. |
| Refund Policy | Enhanced SPT-5443; definition published; execution pending | Short text, both owners, save/reopen. Public inheritance/customer display and512/513 boundary are deferred; previously noted new-form1000/backend512 mismatch remains source-only. |
| Statement descriptor | SPT-5528/5529; definition published; execution pending | 5/14/blank and4/unsupported-character rejection.15-character paste is an input-limit check; gateway statement text, existing Stripe product synchronization and actual charge proof are deferred and must not be claimed from a saved field. |
| Seller Commission Credit/Cash (Showpass admin only) | SPT-5534; definition published; execution pending | Save one default and preserve an explicit ticket-type override. Non-admin field visibility and real Box Office commission totals need separate selected-role/order proof; product override reuse stays in its own cases. |
| Tax Percentage vs Taxes on Fees | SPT-5532 for configured tax-on-fee relationship; legacy reporting-only Tax Percentage deferred | `tax_on_fees` is an ordinary organization setting. When off, Tax Percentage is internal reporting, not a charged extra tax. Full fee/tax-on-fee totals remain3169; self/wrong-type/cross-organization tax references are backend rejection targets, not selectable normal UI data. |
| Calculate Fees | Existing3586 enhancement deferred; frontend/source inspected | Controlled whole-breakdown expectation and legacy Ticket/Product selection required. No calculator request was executed; missing/error/zero/rounding/price-change cases remain deferred. |
| Numeric/description boundaries and duplicate cards | Deferred source/expectation review | Angular amount/percentage controls have minima; the card Save link does not itself run form validation, and explicit serializer decimal fields do not inherit every model validator. Do not promise every negative/empty selector is rejected. Card description UI84/model128 limit differs. Exact duplicate-card enforcement and atomicity need isolated API/service checks before runnable negative assertions are drafted. |
| Payment fields/signature/authorization/saved record | Enhanced1650 +SPT-5530; definition published; execution pending | CAD/USD approved test sets; one clean success vs incomplete non-submitting flows. Production legal/financial actions were not run. |
| Banking roles/production administrator behavior | Enhanced1653; definition published; execution pending | Admin restriction is frontend production-specific. No direct API mutation was attempted. |
| Payout email completion/recipient privacy | Enhanced1654; definition published; execution pending | Actual CAD message in a controlled inbox; final3 digits masked elsewhere. USD email is not expected from this serializer. Billing alerts and restoration emails require approved test destinations. |
| Child payout inheritance/locking, unsupported currency, OTP missing/invalid/retry | Deferred existing-source follow-up | Parent `children_can_edit_payout` and displayed `child_payouts_enabled` differ in layer; source tests exist but no prepared child/identity run. Exact switches `enable_venue_payment_otp` and `enable_otp`, confirmed enrolled account and controlled verification input are needed. Existing CAD/USD is not every-currency support. |
| Retained Dashboard replacement access | SPT-5533; definition published; execution pending; previous beta failure retained as historical evidence | Source now defines Finance → Fee Settings as another owner of tax/descriptor/commission fields. It does not prove the deployed retained Dashboard exposes that entry. Do not clear the earlier Custom Fees navigation finding from source alone. |

### Query completeness, source and browser evidence

- Reused complete SPT case snapshot: **1980 cases /1980 unique IDs /20 pages**, retrieved **2026-10-16T19:10:40.301677+00:00**. No relevant Qase write occurred after it during this audit. Broad full-JSON candidate filter found114 cases; the compact baseline retains exact reviewed IDs, not a claim that every one of114 was reviewed. Alias searches over titles, descriptions, parameters and steps found0 statement-descriptor matches,0 sales-tax-number/exemption matches,8 custom-fee/organizer-rate-card/custom-tax matches,57 banking matches and28 fee-payer/absorption matches. Broad banking matches include other ownership/payment scopes; the three existing payout cases were reviewed in full.
- Complete current suite hierarchy: **312 suites /4 pages**, retrieved **2026-10-16T19:19:42.500Z**. Before publication, links placed5118 in Finance1010 and1650/1653/1654 in Payouts1011. Three other Payouts cases4396/4799/4834 must stay there; moving the entire Payouts suite would be incorrect. Suite API `cases_count` is not used as a full case-content proof. The pre-publication hierarchy placed Emails523 under Organizer Info181; the earlier note's Branding path is publication history, not proof of the current tree.
- Backend revision **b5f397a0438910435e0d537f47e12d6064d7e019**; frontend **f1acf48189e6f783b1e31e5cd218f679dab1d92e**. No PR/branch supplied for this follow-up; no broad historical PR was substituted. Source revisions do not establish deployed demo/beta revisions.
- Backend source: `apps/main/templates/venues/settings/edit-organization.html` (all tabs and Financial Settings form), `_payment-details.html`, `_ticketing.html`, `_shipping-fulfillment.html`, `_customer-refunds.html`; `apps/main/static/src/dashboard/venues/controllers/EditOrganizationController.js`; financials `CustomFeesSettings.js`, `CustomFee.js`, `RateCard.js`, `CustomFeeCalculatorController.js` and their templates; `apps/financials/api/venue_based/{serializers,viewsets}/fees.py`; `models/fee_management/{venue_fees,venue_fee_values,base}.py`; `services/fees/{fee_value_configuration_policy,custom_fee_value_creation}.py`; existing API/configuration and tax-on-fee assertions were inspected, not executed.
- Settings/payout source: `apps/venues/api/user_based/{serializers,viewsets}.py` and `core.models.CustomVenueFeesMixin` appended fields; `apps/venues/models/venue_management/venue.py`; `apps/venues/api/venue_based/{serializers,viewsets}/payment_preferences.py`; `apps/venues/models/venue_management/payout.py`; `apps/venues/services/accounting/payout_preference_confirmation_delivery.py`; `apps/venues/tasks/accounting.py`; `apps/core/ext/strings/utils.py:mask_numbers`.
- Frontend source: dashboard financials `FeeSettingsPage.web.tsx`, `financials-config.ts`, finance menu routes, `VenuePaymentInfoForm.web.tsx`, `VenuePaymentInfoFormContent.web.tsx`, `useVenuePaymentInfoForm.ts`, `VenuePaymentInfoFormAuthorization.web.tsx`, shared `BankingFormFields.web.tsx` and both payment-page entry components. `core/dashboard_preview.py` shows that a banner opt-in can also select the embed while the direct flag is off; flag-off alone is not sufficient legacy setup. The frontend/source tracing did not open a standalone Next.js page as a substitute for the requested legacy UI.
- Already-open demo Organizer Info: account display **Christian Valdez**, selected organization **Calgary Outlaws**, organization ID recorded only in private local evidence. Inspected all15 visible tabs by selecting them. Opened one unsaved Add new custom fee or tax form, inspected its Fee fields, then **Cancel Editing** removed it; no fee was saved. The attempted native Type selection did not change Fee, so the Tax form is source-backed rather than live verified. Restored **Payment Details and Authorization**, the starting selected tab. No values were saved, no live deletion/calculation/job/email/agreement/payment/payout was submitted. Sensitive integration/bank values were not retained.
- Handbook applied: [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations|saved settings versus actual communication]], [[00 Start Here/Showpass QA Handbook/Playbooks/12 Permissions Ownership and Authentication|permission and organization isolation]], and [[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts|independent financial records]]. Canonical page-migration access rules remain binding.

**Publication completed and verified:** enhanced SPT-5118 in Custom Fees1180; created SPT-5517–5525/5532 there. Fee Settings1181 owns SPT-5526–5529/5534. Enhanced/moved SPT-1650/1653/1654 and created SPT-5530 in Payment Details1182. Enhanced SPT-5443 in Legal1164; created SPT-5531/5533 in General1158. Moved SPT-4826 unchanged to Enabled modules1161 and SPT-4884 unchanged to Shipping & Fulfillment1183. The six approved suite updates aligned Organization, Branding/Emails/Deliverables, Customization, Event Upselling and Customer Refunds without copying or deleting cases. Applied plans and frozen payloads are historical evidence; do not rerun them.

**Readiness:** source/full-case comparison and published finance definitions are complete for this declared follow-up. All scope rows above are accounted for; deferred API, charge, delivery, integration and navigation evidence remains explicit. The approved Qase publication is complete; no saved-form or financial flow was executed. This is not a release sign-off.

Local validation: **23 complete definitions (5 existing enhancements +18 new candidates),86 step rows**, standalone fields and unique titles checked with the reusable Qase parser. This was a **local parser check**, not a Qase dry run or product execution. [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/local-format-review.json|Final parsed case fields]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-baseline.json|Full reviewed baselines]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/duplicate-review.json|Duplicate-search evidence]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-suite-hierarchy.json|Suite hierarchy]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/browser-smoke.json|Non-saving browser record]].


## Correct /manage/ folders — approved publication

**Dry runs passed; user confirmed yes; all approved changes were applied and verified.** This preview replaces the earlier legacy-folder proposal. Legacy behavior supplies the feature-parity requirements; suite placement follows the migrated owning pages.

**Case operations: 25 total — five content enhancements,18 creates and two moves with all contents unchanged.** Update content on SPT-5118/1650/1653/1654/5443; create only TC-100–117; move only SPT-4826 and4884 without content/parameter changes. Retain the existing IDs. Update only selected content/suite fields; preserve tags, priority, type, behavior, layer and unrelated native parameter structures. New case metadata uses the standard helper defaults (type1, behavior1, layer0; priority omitted) and the listed tags.

**Suite operations: four creates and six updates.** Qase assigned Custom Fees1180, Fee Settings1181, Payment Details and Authorization1182 and Shipping & Fulfillment1183. Case dry runs use negative suite IDs solely as non-existent preview aliases; those preview plans must never be applied. After approved folder creation, the verified real IDs were resolved and the final case plan passed a second dry run before apply. That semantic scope remained unchanged.

| Suite operation | Existing suite / parent | Exact result |
| --- | --- | --- |
| Create | Finance1010 | Custom Fees |
| Create | Finance1010 | Fee Settings |
| Create | Organization → Settings1157 | Payment Details and Authorization |
| Create | Organization → Settings1157 | Shipping & Fulfillment |
| Rename | Organizer Info181 | Organization (same parent78) |
| Move | Emails523 | Branding1165, with all its current descendants/cases retained |
| Move | Deliverables1170 | Branding1165, with Digital Wallets/Ticket settings and all cases retained |
| Move + rename | Event Upsell Settings440 | Enabled modules1161 → Event Upselling |
| Move | Customer Refunds1091 | Settings1157, retaining its current children/cases |
| Rename | Email Customization749 | Customization (same parent523) |

| Existing ID / draft | Action | Title | Verified destination | Tags | Parameters after | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| SPT-5118 | Split with preserved companions | Dashboard - Finance - Custom Fees - Create a custom fee or tax | Dashboard → Finance → Custom Fees (suite1180) | dashboard, financials, custom-fees | Type: Fee, Tax | 5 |
| SPT-1650 | Enhance | Dashboard - Organization - Save payment details and authorization | Dashboard → Organization → Settings → Payment Details and Authorization (1182) | payment, dashboard, financials, payouts | Currency: CAD, USD | 5 |
| SPT-1653 | Enhance | Dashboard - Organization - Show payment-information controls for the right account | Dashboard → Organization → Settings → Payment Details and Authorization (1182) | dashboard, financials, payment, payouts | Account: PermittedEmployee, RestrictedEmployee, ProductionAdministrator, NonProductionAdministrator | 3 |
| SPT-1654 | Enhance | Dashboard - Organization - Deliver the payment-information update notification | Dashboard → Organization → Settings → Payment Details and Authorization (1182) | dashboard, financials, payment, payouts | None | 5 |
| SPT-5443 | Enhance | Dashboard - Organization - Save the default refund-policy text | Dashboard → Organization → Settings → Legal (1164) | dashboard, organizer | Entry: Legacy, New | 4 |
| TC-100 → [SPT-5517](https://app.qase.io/case/SPT-5517) | New | Dashboard - Finance - Custom Fees - Edit an existing rate card | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | Type: Fee, Tax | 4 |
| TC-101 → [SPT-5518](https://app.qase.io/case/SPT-5518) | New | Dashboard - Finance - Custom Fees - Add a second rate card | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | None | 4 |
| TC-102 → [SPT-5519](https://app.qase.io/case/SPT-5519) | New | Dashboard - Finance - Custom Fees - Cancel a rate-card edit | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | None | 4 |
| TC-103 → [SPT-5520](https://app.qase.io/case/SPT-5520) | New | Dashboard - Finance - Custom Fees - Save a fee’s enabled state | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | None | 3 |
| TC-104 → [SPT-5521](https://app.qase.io/case/SPT-5521) | New | Dashboard - Finance - Custom Fees - Require a specific Other payment method | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | None | 4 |
| TC-105 → [SPT-5522](https://app.qase.io/case/SPT-5522) | New | Dashboard - Finance - Custom Fees - Delete one rate card | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | None | 3 |
| TC-106 → [SPT-5523](https://app.qase.io/case/SPT-5523) | New | Dashboard - Finance - Custom Fees - Cancel a fee deletion | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | Target: Definition, RateCard | 4 |
| TC-107 → [SPT-5524](https://app.qase.io/case/SPT-5524) | New | Dashboard - Finance - Custom Fees - Delete a custom fee or tax | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | Type: Fee, Tax | 4 |
| TC-108 → [SPT-5525](https://app.qase.io/case/SPT-5525) | New | Dashboard - Finance - Custom Fees - Restrict financial access without Manage Transactions | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes, employee-permissions | None | 4 |
| TC-109 → [SPT-5526](https://app.qase.io/case/SPT-5526) | New | Dashboard - Finance - Fee Settings - Save who pays Showpass or processing fees | Dashboard → Finance → Fee Settings (1181) | dashboard, fees-taxes | FeeControl: Processing, Showpass | 4 |
| TC-110 → [SPT-5527](https://app.qase.io/case/SPT-5527) | New | Dashboard - Finance - Fee Settings - Save sales-tax details | Dashboard → Finance → Fee Settings (1181) | dashboard, fees-taxes | None | 3 |
| TC-111 → [SPT-5528](https://app.qase.io/case/SPT-5528) | New | Dashboard - Finance - Fee Settings - Save a statement descriptor | Dashboard → Finance → Fee Settings (1181) | dashboard, fees-taxes | Descriptor: Minimum, Maximum, Default | 3 |
| TC-112 → [SPT-5529](https://app.qase.io/case/SPT-5529) | New | Dashboard - Finance - Fee Settings - Reject an invalid statement descriptor | Dashboard → Finance → Fee Settings (1181) | dashboard, fees-taxes | InvalidDescriptor: TooShort, ForbiddenCharacter | 3 |
| TC-113 → [SPT-5530](https://app.qase.io/case/SPT-5530) | New | Dashboard - Organization - Require complete banking authorization | Dashboard → Organization → Settings → Payment Details and Authorization (1182) | dashboard, payouts | MissingItem: Authority, Authorization, Signature | 4 |
| TC-114 → [SPT-5531](https://app.qase.io/case/SPT-5531) | New | Dashboard - Organization - Open every supported legacy tab | Dashboard → Organization → Settings → General (1158) | dashboard, organizer | Tab: Basic Info, Branding, Business Schedule, Enabled Modules, Ticketing, Shipping & Fulfillment, Low Inventory Display, Financial Settings, Post-Event Emails, Email Customizations, Integrations, Payment Details and Authorization, Terms & Conditions, Event Upselling, Analytics, Customer refunds | 3 |
| TC-115 → [SPT-5532](https://app.qase.io/case/SPT-5532) | New | Dashboard - Finance - Custom Fees - Save a tax applied to a custom fee | Dashboard → Finance → Custom Fees (1180) | dashboard, fees-taxes | None | 3 |
| TC-116 → [SPT-5533](https://app.qase.io/case/SPT-5533) | New | Dashboard - Organization - Preserve access to financial settings after migration | Dashboard → Organization → Settings → General (1158) | dashboard, organizer, fees-taxes | Function: CustomFees, FeePayers, TaxAndStatement, RefundPolicy, PaymentDetails | 3 |
| TC-117 → [SPT-5534](https://app.qase.io/case/SPT-5534) | New | Dashboard - Finance - Fee Settings - Save a seller commission default | Dashboard → Finance → Fee Settings (1181) | dashboard, fees-taxes, admin-actions | SaleType: Credit, Cash | 4 |
| SPT-4826 | Move only | Dashboard - Organization Settings - Configure low inventory display settings | Dashboard → Organization → Settings → Enabled modules (1161) | dashboard, organizer, inventory | SettingMode: ThresholdDisplayEnabled, ThresholdDisplayDisabled, ShowRemainingInventoryEnabled, InvalidThresholdOrder; ExpectedBuyerDisplay: OverPercentSold, NoThresholdBadge, RemainingCount, ValidationError | 6 |
| SPT-4884 | Move only | Web Dashboard - Organization Settings - Configure shipping fulfillment controls | Dashboard → Organization → Settings → Shipping & Fulfillment (1183) | dashboard, organizer, settings, shipping | None | 6 |

**Explicit preservation/correction decisions:**

- SPT-5118’s original create/edit/invalid/access/CRUD responsibilities are retained by its focused update plus TC-100–108. Publish that split together. Fee and Tax use shared cases/parameters rather than copies.
- SPT-1650 keeps CAD/USD, both banking entry paths and saved authorization; TC-113 retains incomplete authorization. SPT-1653 applies the administrator restriction only to the production frontend and keeps ordinary restricted/permitted access. SPT-1654 checks actual CAD confirmation delivery, unique recipients and masking; the source does not promise a USD email. SPT-5443 retains the refund-text test and adds legacy entry coverage without making a duplicate.
- TC-109 is a retained legacy Customer Pays requirement under the migrated Fee Settings owner. Current local replacement source lacks those two controls. TC-116 explicitly includes FeePayers so neither folder reorganization nor direct URL access can hide that parity gap. No migrated control is claimed to be live-verified.
- SPT-4826 and4884 move only; their held local splits stay held. SPT-5139 stays unchanged pending a safe split of ticket transfers and Intellitix resync. Payouts4396/4799/4834 remain in Payouts1011. SPT-4095’s banking banner, product-specific fees and checkout calculation cases remain unchanged.
- No existing case or suite is deleted or copied. No product setting, bank detail, agreement, email, fee calculation, charge or payout is submitted by this publication.

Evidence: [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-publication-preview.json|frozen exact scope]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-case-dry-run.json|case dry run]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-suite-dry-run.json|suite dry run]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-publication-baseline.json|current full before-state]].

The user explicitly confirmed this exact preview under [[05 Tooling/qasectl#Ambiguous Or Bulk Request Guard|the bulk-write rule]]. It is applied; **do not rerun any create batch**.

## Finance publication verification — completed

Published **five case enhancements,18 new cases (SPT-5517–5534) and two moves with content unchanged**. Four suites were created and six existing suites moved/renamed. All **138 original cases** in the preserved Organization/Finance scope still exist; the131 cases outside the five content updates and two moves retained their execution fields, native parameters, metadata and direct suite memberships. Moved SPT-4826/4884 retained all fields except suite_id, including SPT-4826’s original grouped parameter structure.

| Migrated owning page | Verified Qase suite | Direct cases |
| --- | --- | --- |
| Finance → Custom Fees | [Custom Fees1180](https://app.qase.io/project/SPT?suite=1180) | 11 |
| Finance → Fee Settings | [Fee Settings1181](https://app.qase.io/project/SPT?suite=1181) | 5 |
| Organization → Settings → Payment Details and Authorization | [Payment Details and Authorization1182](https://app.qase.io/project/SPT?suite=1182) | 4 |
| Organization → Settings → Shipping & Fulfillment | [Shipping & Fulfillment1183](https://app.qase.io/project/SPT?suite=1183) | 1 |
| Organization → Settings → Enabled modules | [Enabled modules1161](https://app.qase.io/project/SPT?suite=1161) | 3, plus existing Event Upselling440 |
| Organization → Settings → General | [General1158](https://app.qase.io/project/SPT?suite=1158) | 10 |
| Organization → Settings → Legal | [Legal1164](https://app.qase.io/project/SPT?suite=1164) | 4 |

- Updated existing IDs **5118,1650,1653,1654,5443**; moved **4826** to1161 and **4884** to1183 without changing their content. Payouts1011 retains4396/4799/4834. Existing suite IDs and child cases were preserved during the parent/title changes.
- Full post-publication snapshots: **1998 unique cases /20 pages** and **316 suites /4 pages**. Text, complete steps, native parameters, tags, selected metadata and requested suite/parent IDs matched. Each new case ID/title appears once. No case or suite was deleted or copied.
- [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-publication-verified.json|Full verification results]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-post-publication-cases.json|Retained full case fields]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-post-publication-suites.json|Final suite hierarchy]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-case-apply.json|Case apply receipt]] · [[03 Test Cases/Organizations/evidence/legacy-tabs-finance-2026-10-16/qase-suite-apply.json|Suite apply receipt]].
- **Execution pending:** these are saved Qase definitions and structure checks, not passed financial or UI tests. SPT-5526/5533 retain the unresolved migrated Customer Pays controls/access requirement. No product setting, agreement, fee, banking record, charge, email or payout was submitted.
