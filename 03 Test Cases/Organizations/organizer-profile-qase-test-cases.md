---
title: Organizer Profile — Qase cases and coverage gaps
date: 2026-11-12
updated: 2026-11-18
tags:
  - qa/test-cases
  - qase
  - organizer
status: Next.js Qase batch published and read-back verified
---

# Organizer Profile — Qase cases and coverage gaps

This is the cutover revision of the **35 published Organizer Profile cases**. The Next.js storefront takes over the existing **/o/{slug}/** links. Jira specifies that the temporary **/org/new/** URLs return 404. Keep one case per behavior on the supported profile and keep link compatibility checks in the relevant cases. The production handoff is tracked separately in SPW-20053.

The November 18 publication updated **21 storefront cases in place**, updated the starting URL in **one Queue-it case**, and created **five cases** for separate behaviors. Qase readback verified all 27 writes. The earlier Angular review and November 12 publication are retained at the end. This publication did not execute the tests.

## Qase-ready cases

Run these against a cutover build serving the Next.js Organizer Profile. Four sections are marked as held local rewrites. Their saved Qase versions still preserve the November 12 coverage. SPT-5980 and the new route and narrow-screen Support cases retain expected behavior for discrepancies found in source.

## Profile and navigation

### SPT-355: Web Public - Organizer Profile - Open the correct organizer from an event

**Title:** Web Public - Organizer Profile - Open the correct organizer from an event

**Description:** From a public Event, follow the organizer link to the matching Next.js profile at /o/{slug}/. Start on the Event so this also checks the published link.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have a public Event belonging to that Organization, with its customer-facing Event link.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public Event page. | Recorded Event link | The expected Event and organizer name appear. |
| Select the organizer name in the Event’s organizer section. |  | The matching organizer profile opens with its name, profile image, location and available offerings. |
| Compare the profile with the recorded Organization details and open Support. |  | The profile and Contact Details belong to the Event’s owner. |
| Reload the profile. |  | The same Organization and its offerings remain visible. |

### SPT-5968: Web Public - Organizer Profile - Display identity and image fallbacks

> **Held local rewrite.** Qase still has the previous case. See the held edits in the publication record.

**Title:** Web Public - Organizer Profile - Display identity and image fallbacks

**Description:** Compare the public name, location and profile image with the saved Organization. For the profile image, check a branding header override, the saved banner without an override, and the default image.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| ImageState | Prepared state |
| --- | --- |
| BrandingHeader | A branding header and a different saved profile banner. |
| WithImages | A saved profile banner with no branding header override. |
| WithoutImages | No branding header or saved profile banner. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have prepared Organizations matching ImageState. Record names, city, province and supplied images. Include one with an empty city or province. Ask the setup owner for the saved branding header, banner and logo where applicable.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Parameters:**

ImageState: BrandingHeader, WithImages, WithoutImages

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected Organization’s public profile. | ImageState | The recorded name, city and province appear without a stray comma. |
| Inspect the profile image. |  | The branding header, saved banner or default image appears as specified. The image is readable and has no broken-image icon. |
| Check the header and scroll down on the selected device. |  | The name, Support and tabs remain readable and usable without overlapping. |

### SPT-5969: Web Public - Organizer Profile - Expand and collapse the About text

**Title:** Web Public - Organizer Profile - Expand and collapse the About text

**Description:** Read the saved description under About. The new page shows Read More when the description exceeds eight rendered lines at the current width and uses the short description if no long description is saved.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| TextLength | Prepared description |
| --- | --- |
| AtLimit | A saved description that fits within eight lines at the chosen width. |
| OverLimit | A saved description that exceeds eight lines at that width. |
| ShortFallback | Short description saved and no long description. |
| Blank | Neither description is saved. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Use prepared descriptions from Dashboard → Organization → Settings → Organization settings → Branding → Profile. Record the saved text and viewport. For OverLimit, include a paragraph break and a safe formatted link and identify a sentence beyond the eighth line.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Parameters:**

TextLength: AtLimit, OverLimit, ShortFallback, Blank

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile and inspect its tabs. | TextLength | About appears when one of the descriptions is set. With Blank, About is absent. |
| For a profile with a description, select About. |  | AtLimit shows the full text without Read More. ShortFallback shows the saved short text. OverLimit shows a preview and Read More. |
| For OverLimit, select Read More, then Read Less. |  | The sentence beyond the preview appears and is hidden again when the description collapses. |

### SPT-5970: Web Public - Organizer Profile - Open saved website and social links

**Title:** Web Public - Organizer Profile - Open saved website and social links

**Description:** Check that populated website/social fields lead to the recorded destination and blank fields do not produce empty links.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Record Website, Facebook, X / Twitter and Instagram from Dashboard → Organization → Settings → Organization settings → Branding → Profile. Use controlled destinations and include at least one blank field across the prepared Organizations.

* Include a profile with no website and at least one saved social link. Use a prepared Organization that allows customer messages for the narrow-layout run so Refund Policy is available.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the profile and inspect the link beside the Organization name. |  | The website is shown when saved. Without one, the first saved Facebook, Instagram or X / Twitter link is shown, in that order. With all four blank no link is shown. |
| Open Support. In a narrow layout, select Refund Policy when the tabs are available. |  | Each saved website or social destination is offered in Contact Details. Blank values have no button. |
| Open each saved destination and return to the profile. |  | Each link opens the address recorded for this Organization. |

### SPT-5971: Web Public - Organizer Profile - Show or hide saved business hours

**Title:** Web Public - Organizer Profile - Show or hide saved business hours

**Description:** Check the weekly schedule shown to customers against the saved business hours.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| HoursVisibility | Saved Schedule setting |
| --- | --- |
| Shown | Show business hours on public profile ON. |
| Hidden | Show business hours on public profile OFF. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Use Dashboard → Organization → Settings → Organization settings → Business schedule as the baseline. Record the Organization timezone, all seven days, and Show business hours on public profile. For Shown, include one open day and one Closed day.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Parameters:**

HoursVisibility: Shown, Hidden

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile and inspect the area beside the Organization name. | HoursVisibility | Shown offers an hours status. Hidden shows no hours status or control. |
| For Shown, select the displayed opening-hours status. |  | Business hours opens and lists the correct opening and closing times or Closed for all seven days. |
| Compare the status with the Organization’s local time and close Business hours. |  | The status matches the saved schedule in the Organization’s timezone and the profile remains usable. |

### SPT-5972: Web Public - Organizer Profile - Open existing profile links

**Title:** Web Public - Organizer Profile - Open existing profile links

**Description:** Open supported organizer root URLs and verify that each finds the same Next.js profile. Compare the profile with the enabled Organization recorded before starting.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| LinkFormat | Link to open using the recorded slug |
| --- | --- |
| Current | /o/{slug}/ |
| UppercaseSlug | /o/{SLUG}/ with slug letters uppercase. |
| OlderVenues | /venues/{slug}/; redirects to the current profile. |
| OlderOrganizations | /organizations/{slug}/; redirects to the current profile. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Record the site hostname and the Organization slug from its supplied public profile link.

* Use the cutover build on its primary host and an approved short domain, with and without the final slash on the current link. Confirm the page shows the Next.js Support control during each run.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Parameters:**

LinkFormat: Current, UppercaseSlug, OlderVenues, OlderOrganizations

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the recorded Organizer link in a fresh tab. | LinkFormat | The link opens the expected profile at /o/{slug}/ and retains the intended host and language according to its supported link contract. |
| Compare the name, location and Support control with the recorded Organization. |  | The correct Next.js profile appears. The page does not display another Organization or return to the Angular page. |
| Reload the page. |  | The same Organization and its visible offerings remain available. |

### SPT-5973: Web Public - Organizer Profile - Reject unavailable organizer links

**Title:** Web Public - Organizer Profile - Reject unavailable organizer links

**Description:** Verify that an unknown or disabled Organization does not expose a profile.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| Availability | Link setup |
| --- | --- |
| Unknown | /o/{slug}/ using a slug confirmed absent. |
| Disabled | /o/{slug}/ for a Venue already saved with Is disabled ON by an authorized setup owner. |

**Preconditions:**

* Have the hostname and one known enabled Organization link as a control.
* Have a prepared disabled Venue’s slug from the authorized setup owner, or a slug confirmed not to exist, for the selected run. Do not disable an Organization for this check.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Parameters:**

Availability: Unknown, Disabled

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the enabled Organization’s public profile. |  | The known profile loads, confirming the site is available. |
| Open the unavailable Organization link. | Availability | A not-found page appears; no organizer catalog or purchase controls are exposed. |

### SPT-5974: Web Public - Organizer Profile - Show the correct empty state

**Title:** Web Public - Organizer Profile - Show the correct empty state

**Description:** Distinguish an empty Organization from an Organization that has other offerings but no Events.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| CatalogState | Prepared state | Expected result |
| --- | --- | --- |
| NothingAvailable | No offerings, About text or Calendar. | Sorry, we cannot find anything for this organization. |
| GiftCardsOnly | Gift Cards enabled with a public card, no About text or Calendar. | Gift Cards opens by default, without an Events tab. |
| AboutOnly | A description, no public offerings or Calendar. | About opens by default, without an Events tab. |
| CalendarOnly | Calendar is enabled and there are no upcoming Events or other visible tabs. | Events remains reachable with Calendar and its empty List view. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Use a prepared Organization with no publicly listed Events or membership groups and no public products. Ask the setup owner to confirm org_detail_page_calendar_is_enabled and match the description and Gift Cards setup in the table.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Parameters:**

CatalogState: NothingAvailable, GiftCardsOnly, AboutOnly, CalendarOnly

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected public profile and allow it to finish loading. | CatalogState | The expected tab or empty message appears for the selected setup. |
| Inspect the Organization’s name and select Support. |  | Contact Details opens for this Organization even if it has an empty catalog. |

### SPT-5975: Web Public - Organizer Profile - Reload the selected catalog tab

**Title:** Web Public - Organizer Profile - Reload the selected catalog tab

**Description:** Open, switch and reload the organizer’s available tabs on desktop and mobile. Use a verified English and French profile link. Check that navigation stays on the same Organization and in the selected language.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| TabSetup | Tabs to select and reload |
| --- | --- |
| AllTabs | Events, Memberships, Products, Gift Cards and About. |
| ProductsOnly | Products, with two categories and no other visible tabs. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* For AllTabs use a profile with a public Event, public membership group, active gift card, About text and two public product categories. For ProductsOnly use a profile with two public product categories and no Events, Calendar, memberships, gift cards or About text.
* Record the public profile and category names. These are existing setups; no module or catalog changes are performed.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Parameters:**

TabSetup: AllTabs, ProductsOnly

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the profile in the selected language and select the available tabs. | TabSetup | Each selected tab displays its own content and the link keeps the selected language and Organization. |
| Copy an active tab’s link, open it in a fresh customer tab, and reload. |  | The same tab and Organization return in the chosen language. |
| Switch tabs while the tab row is in view, using the keyboard on desktop. |  | Focus stays usable and the view does not jump unexpectedly away from the selected tab. |
| Open an Event or membership from its tab, then use browser Back and Forward. For ProductsOnly, use the public page you arrived from. |  | Back restores the prior page and selected tab where applicable. Forward opens the same destination. The locale and Organization are preserved. |

## Help and contact

### SPT-354: Web Public - Organizer Profile - Send a message to the organizer

**Title:** Web Public - Organizer Profile - Send a message to the organizer

**Description:** Send one valid inquiry through Support on the public profile and verify delivery to the configured support inbox. Run with customer messaging enabled.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* The Organization has Dashboard → Organization → Settings → Organization settings → Contact → Allow customers to email you ON and Customer support email set to a controlled inbox. Have the public profile link and a known Event name. These are saved settings, not customer permissions.
* Have a controlled sender email and access to the recipient support inbox. The setup owner must confirm the global enable_captcha switch state and working CAPTCHA configuration. Record enabled and disabled runs separately when both prepared configurations are available. Sending is allowed only in an environment where organizer emails and support alerts are approved.

**Postconditions:**

* Retain the message reference as evidence; no customer order is changed. A success toast without the delivered email is only submission proof. Do not resend while delivery is unresolved.

**Tags:** public, organizer, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile and select Support. |  | Contact Details opens for the correct Organization. |
| Open Message Us if the form is shown in tabs. |  | Name, Email, Event Name, Reason for Contact, Message and Send are available. |
| Fill the form. | Profile Check, controlled sender email, recorded Event name, Question about the organizer, Please confirm the entry time for this event. | The form retains the supplied values. |
| Select Send once. |  | Your message has been sent! appears and Contact Details closes. |
| Check the controlled support inbox. |  | The inquiry contains the expected sender or reply-to, Event, reason and message for this Organization. |

### SPT-5976: Web Public - Organizer Profile - Reject incomplete contact details

**Title:** Web Public - Organizer Profile - Reject incomplete contact details

**Description:** Check one invalid contact field at a time without sending an inquiry.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| InvalidField | Invalid value | Correction |
| --- | --- | --- |
| BlankName | Empty Name. | Profile Check. |
| ShortName | Name is A. | Profile Check. |
| BlankEmail | Empty Email. | Controlled valid email. |
| InvalidEmail | Email is invalid-email. | Controlled valid email. |
| MissingReason | No Reason for Contact selected. | Question about the organizer. |
| BlankEvent | Empty Event Name. | Recorded Event name. |
| ShortEvent | Event Name is A. | Recorded Event name. |
| BlankMessage | Empty Message. | Please confirm the entry time. |

**Preconditions:**

* The Organization has Dashboard → Organization → Settings → Organization settings → Contact → Allow customers to email you ON and Customer support email set to a controlled inbox. Have the public profile link and a known Event name. These are saved settings, not customer permissions.
* Prepare valid values for every field except the selected InvalidField. Use a controlled sender email and a known Event name.

**Postconditions:**

* Close the dialog without sending. No inquiry or order is created by this case.

**Tags:** public, organizer, edge-case

**Parameters:**

InvalidField: BlankName, ShortName, BlankEmail, InvalidEmail, MissingReason, BlankEvent, ShortEvent, BlankMessage

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Support. Select Message Us if the dialog has tabs. |  | The contact form appears. |
| Fill the other fields and enter the selected invalid value. | InvalidField | The other fields retain the supplied values. |
| Select Send. |  | The affected field is marked invalid, the dialog remains open and no sent confirmation appears. |
| Correct the field without selecting Send again. |  | The field error clears and the other entered details remain. |

### SPT-5977: Web Public - Organizer Profile - Read the refund policy and close Support without sending

> **Held local rewrite.** Qase still has the previous case. See the held edits in the publication record.

**Title:** Web Public - Organizer Profile - Read the refund policy and close Support without sending

**Description:** Read the organizer’s refund policy and close Contact Details with an unsent message. On a narrow screen, Message Us and Refund Policy are separate tabs when messages are enabled.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Use an Organization with Allow customers to email you ON. Record its saved refund policy through the setup owner. No message submission is permitted for this check.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Support on the public organizer profile. |  | Contact Details opens for this Organization. |
| Open Refund Policy if the dialog uses tabs. Compare the displayed policy with the recorded policy. |  | The policy belongs to the selected Organization and matches the saved text. |
| Open Message Us if shown in tabs and type a draft message. | Please confirm entry time. | The draft appears without any sent confirmation. |
| Close Contact Details without selecting Send. |  | The profile is usable again and no sent confirmation appears. |

## Events and memberships

### SPT-3496: Web Public - Organizer Profile - Browse public events and open the selected event

**Title:** Web Public - Organizer Profile - Browse public events and open the selected event

**Description:** Browse the complete Events list and open the correct Event. Ongoing Events remain eligible until their end time; hidden, unpublished and ended Events are comparison records.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* In Dashboard → Events → Manage Events, identify at least eleven public, published, non-recurring Events for this Organization whose end times have not passed. Include one already started but not ended. Record names, dates, timezones and expected order by start time.
* Also record one unpublished, one hidden and one ended Event from that Organization. Use an unrelated Organization’s public Event as an exclusion control.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile and select Events. |  | The Organization’s public Events appear with readable names, dates, locations and images or fallbacks. |
| Select Load more until all recorded eligible Events have loaded. |  | At least eleven appear exactly once in start-time order. Load more disappears after the last page. |
| Compare the complete list with the prepared records. |  | The ongoing Event remains listed; unpublished, hidden, ended and unrelated Organization Events are absent. |
| Select one recorded Event card. |  | Its public Event detail opens with the matching name, date, timezone and organizer. |

### SPT-3497: Web Public - Organizer Profile - Browse the organization event calendar

**Title:** Web Public - Organizer Profile - Browse the organization event calendar

**Description:** Open the organization calendar and use its date navigation to find eligible Events. An Event hidden from calendar surfaces must remain absent.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* The setup owner has confirmed the Venue saved setting org_detail_page_calendar_is_enabled = ON. This is a Venue setting, not a Waffle flag.
* Have two public upcoming Events on different calendar months with calendar display enabled, and one comparable Event with calendar display disabled. Record names, dates and timezone from their saved Event settings.

**Postconditions:**

* Return to List after closing any Event selection or purchase view without adding tickets. Leave all saved calendar settings unchanged.

**Tags:** public, organizer, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile and select Events → Calendar. |  | The Organization’s calendar opens within the Events tab. |
| Use Next Month or Previous Month to reach the first recorded Event date, then select that day. |  | The date is available and the matching Event appears; the calendar-hidden comparison Event is absent. |
| Use Next Month or Previous Month to reach the second Event’s month, then select its day. |  | The calendar updates to that month and displays the correct Event on its date. |
| Select the second Event. |  | The matching Event detail or calendar purchase view opens with the recorded name and date; no ticket has been added merely by opening it. |

### SPT-5978: Web Public - Organizer Profile - Include sub-organization events only when enabled

**Title:** Web Public - Organizer Profile - Include sub-organization events only when enabled

**Description:** Check the parent Organization’s Events list against its saved choice to include sub-organization Events. A sub-organization is a separate Organization linked beneath a parent.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| ChildEvents | Parent Venue setting | Expected child Event |
| --- | --- | --- |
| Included | Show sub org events ON. | Listed. |
| Excluded | Show sub org events OFF. | Absent. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have a parent Organization, one linked child Organization and one unrelated Organization, each with a public upcoming Event. Record their names and ownership.
* An authorized setup owner must confirm the parent Venue’s Show sub org events saved setting for the selected run. Use existing ON/OFF setups; do not change shared configuration during execution.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer, events

**Parameters:**

ChildEvents: Included, Excluded

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the parent Organization’s public profile → Events. | ChildEvents | The parent Event appears and the child Event follows the selected setting. |
| Scroll through the complete Events list. |  | The unrelated Organization’s Event never appears; no parent/child Event is duplicated. |
| Open an Event that is listed. |  | The selected Event opens with its actual owning Organization, even when listed on the parent’s profile. |

### SPT-5979: Web Public - Organizer Profile - Browse memberships and open the correct group

**Title:** Web Public - Organizer Profile - Browse memberships and open the correct group

**Description:** Browse public membership groups from the Organization profile. A membership group is the named offering that contains the purchasable membership levels.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Record at least six published membership groups owned by the Organization in Dashboard → Build → Memberships → All memberships, each with a public level. Include names and images or missing-image states.
* Have one draft group and one group belonging to another Organization as exclusion controls.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer, memberships

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile and select Memberships. |  | The Organization’s public membership groups appear with correct names and images or fallbacks. |
| Select Load more to reach all six recorded groups. |  | Each public group appears once; the draft and other Organization’s groups are absent. |
| Find View membership on a recorded card. Activate the card by keyboard on desktop and by touch on mobile. |  | The card has visible focus on desktop and opens the matching group and Organization. |

### SPT-5980: Web Public - Organizer Profile - Display event and membership price ranges

**Title:** Web Public - Organizer Profile - Display event and membership price ranges

**Description:** Compare public card prices with independently recorded ticket and membership-level prices. Hiding a price range must not hide the offering itself.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| PricingDisplay | Required settings | Expected card price |
| --- | --- | --- |
| BasePrices | disable_price_range_display OFF; All-in pricing OFF. | Lowest to highest base price; a single amount if equal; FREE if every price is zero. |
| FeesIncluded | disable_price_range_display OFF; All-in pricing ON. | Lowest to highest applicable price including fees but excluding tax. |
| Hidden | disable_price_range_display ON. | No event or membership price range. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have a public Event and membership group, each with at least two different public prices, plus one zero-price offering and one offering whose public prices are all equal. Record the eligible prices and currency from the owning Dashboard ticket or membership-level settings.
* The setup owner must confirm the Venue-scoped disable_price_range_display flag and All-in pricing saved setting (all_in_pricing_is_enabled on the Venue record) for the selected PricingDisplay. For FeesIncluded, record the applicable web card fees separately and calculate the expected price excluding tax; do not copy the result from the public card.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer, fees-and-taxes

**Parameters:**

PricingDisplay: BasePrices, FeesIncluded, Hidden

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Events and compare the prepared cards. | PricingDisplay | Each card follows the selected price-display rule while its name and link remain visible. |
| Select Memberships and compare the prepared groups. |  | The same price-display rule applies to membership-level prices in the Organization’s currency. |
| Open one card from each list. |  | The intended Event or membership opens; hiding a list price has not removed the purchase entry point. |

### SPT-5981: Web Public - Organizer Profile - Show multi-day and recurring event dates

> **Held local rewrite.** Qase still has the previous case. See the held edits in the publication record.

**Title:** Web Public - Organizer Profile - Show multi-day and recurring event dates

**Description:** Check the Event’s timezone and the distinction between a multi-day Event and multiple occurrences of a recurring Event.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* In Dashboard → Events → Manage Events, record one published multi-day Event and one recurring parent with at least two public upcoming occurrences on different days. Record start/end values, timezone and occurrence names.
* Use a customer device timezone different from the Event timezone. Record and restore the browser/device timezone setting if changed.

**Postconditions:**

* Do not add tickets. Restore any changed device timezone and leave Event settings unchanged.

**Tags:** public, organizer, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Events and find the multi-day Event. |  | The date range and displayed start time and timezone match the Event’s local schedule. |
| Find the recurring Event in the complete list. |  | One parent card represents it with the recurring label. Individual occurrences do not appear as separate cards in the unfiltered list. |
| Select the recurring Event card. |  | The correct recurring Event opens and offers its recorded occurrences for selection. |

### SPT-5982: Web Public - Organizer Profile - Hide the disabled calendar entry

**Title:** Web Public - Organizer Profile - Hide the disabled calendar entry

**Description:** Check that disabling the Organization’s public calendar removes its entry button without removing the Events list.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* The setup owner has confirmed the Venue saved setting org_detail_page_calendar_is_enabled = OFF. Have one public upcoming Event in the Organization. No Admin access or configuration changes are needed to execute this case.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Events. |  | The Calendar option is absent and the Upcoming Events list remains available. |
| Select Events and open the known Event card. |  | The Event remains listed and opens correctly without the Calendar option. |

## Products

### SPT-470: Web Public - Products - Read the complete formatted description

**Title:** Web Public - Products - Read the complete formatted description

**Description:** Open a product’s Description tab and compare its saved text, formatting and links.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* In Dashboard → Build → Products → All products, select a public product in a named category with a saved long description containing paragraphs, bold, italic, a list and a controlled hyperlink. Record the full description and link.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, products, appearance

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Products and select the recorded category and product. |  | The correct product details open. |
| Select Description. |  | The complete description appears without missing text or clipped paragraphs. |
| Compare its formatting with the saved description. |  | Paragraphs, bold, italic and list items render correctly. |
| Open the description link, then return to the product. |  | The link opens the recorded destination. |
| Close the product details. |  | The Products list is usable again and the basket is unchanged. |

### SPT-474: Web Public - Products - Use product controls with keyboard and screen reader

**Title:** Web Public - Products - Use product controls with keyboard and screen reader

**Description:** Check the product card’s keyboard navigation, spoken labels and readable contrast. The screen-reader checks require a human using an available supported screen reader.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have a public product with an image, description, two named options with different prices and quantity controls. Use a standalone product that does not require a ticket. Record its category and expected values; one unit must be available to add to a test basket.
* Start with an empty customer basket. Use a keyboard, a supported screen reader and a contrast checker; record the browser and assistive tool.

**Postconditions:**

* Remove the test product through the supported basket control and reload to confirm the basket is empty. Restore the initial option and any assistive-tool or display preference changed for the check. Do not pay.

**Tags:** public, products, appearance

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Use the keyboard to open Products, select the category and activate the product card. |  | Focus is visible and the selected product opens with its name, price information and controls. |
| Use the keyboard to open Description, then return to Buy product. |  | The description is readable and focus reaches both named options and their quantity controls. |
| Increase the second option to one, then reach Checkout using the keyboard. |  | Only the chosen option is added, and Checkout is keyboard accessible. |
| Use a screen reader on the card, image, Description and purchase controls. |  | The name, price, description, option names and quantity actions are announced meaningfully. The image has meaningful alternative text or is decorative. |
| Check the contrast of price, description and button text. |  | Normal text meets 4.5:1 and large text meets 3:1. |

### SPT-5983: Web Public - Products - Recover from an empty search and switch categories

**Title:** Web Public - Products - Recover from an empty search and switch categories

**Description:** Check that an unmatched search does not hide a category permanently or carry its filter into another category.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have two categories with at least one public product each. Record their names, a product name unique to the first category, and a search term absent from both categories. Basic matching-search behavior is checked here only as setup for reset.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, products, search-filters

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Products, select the first category and enter its recorded product name in Search Products. |  | Only matching products from that category appear. |
| Replace the search with the recorded unmatched term. |  | No Products Found appears and the category remains selectable. |
| Clear Search Products. |  | The first category’s complete public product list returns. |
| Enter the unique first-category product name again, then select the second category. |  | The search field clears and the second category’s products appear without the first category’s filter. |

### SPT-5984: Web Public - Products - Load all matching products without mixing categories

**Title:** Web Public - Products - Load all matching products without mixing categories

**Description:** Use Load more to reach results beyond the first ten products in a category and in a matching search.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| ProductList | Search Products value |
| --- | --- |
| AllProducts | Empty. |
| MatchingSearch | Recorded word shared by at least eleven product names in this category. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have a category containing at least eleven public products whose names share one recorded word, plus a nonmatching public product. Have another category with a product sharing that word. Record expected product names for each run.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, products, search-filters

**Parameters:**

ProductList: AllProducts, MatchingSearch

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Products and select the prepared category. | ProductList | The category’s products load; for MatchingSearch enter the recorded shared word in Search Products. |
| Select Load more until all expected products have loaded. |  | Every expected product appears exactly once and no product from another category appears. |
| Compare the final list with the recorded names. |  | All matches are present; MatchingSearch excludes the nonmatching product. |

### SPT-5985: Web Public - Products - Keep option quantities separate after reload

**Title:** Web Public - Products - Keep option quantities separate after reload

**Description:** Add two different product options, change one quantity, and remove only that option while preserving the other.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have a public product that does not require a ticket, with two named options. Each option needs available Inventory of at least 3 and a purchase limit of at least 3. Record names, unit prices, fees and category from Dashboard → Build → Products → All products.
* Use an empty customer basket that contains no real purchase in progress. Basket changes are permitted only for the prepared test products.

**Postconditions:**

* Remove the remaining test product from the basket. Reload and confirm the basket is empty and no order was placed. Do not pay.

**Tags:** public, products, basket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Products, select the category and product, then increase the first option to one. |  | The first named option has one unit in the basket. |
| Increase the second option to two. |  | The second option has two units and the first still has one. |
| Reload and reopen the same product. |  | The first option shows one and the second shows two. |
| Decrease the second option to zero. |  | The second option is removed and the first retains one unit. |
| Select Checkout and inspect the basket. |  | One unit of the first option remains with its recorded price, fees and total. The second option is absent. |

### SPT-5986: Web Public - Products - Reject a quantity above available inventory

> **Held local rewrite.** Qase still has the previous case. See the held edits in the publication record.

**Title:** Web Public - Products - Reject a quantity above available inventory

**Description:** Add the only available unit of a product option. Check that the customer cannot add a second unit and that the basket retains one after reload.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have a public product option with available Inventory exactly 1 and purchase limit at least 2. Use an option that does not need a ticket. The product details must allow one unit to be added. Record the category and option name from Dashboard → Build → Products → All products.
* Use an empty test basket and isolated Inventory for the prepared option. Nobody else may buy or reserve it during the check.

**Postconditions:**

* Remove the reserved test unit and any additional test units through the basket. Reload and confirm it is empty. Record any availability message and the quantity that stayed in the basket.

**Tags:** public, products, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Products, select the category and product, then increase the recorded option to one. |  | The basket holds one unit of the expected option. |
| Check the control for adding a second unit. If enabled, activate it once. |  | The second unit is prevented by the control, or an availability error rejects the request. The first unit stays in the basket. |
| Reload and reopen the product, then inspect the basket. |  | Exactly one unit of that option remains. |

### SPT-5987: Web Public - Products - Open a shared product link in its category

**Title:** Web Public - Products - Open a shared product link in its category

**Description:** Open the product link copied from Dashboard and verify it selects the correct category and filters to the intended public product.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| SharedLink | Link | Expected result |
| --- | --- | --- |
| MatchingProduct | Dashboard-copied public product link. | Its category is selected and the intended product appears. |
| NoMatchingProduct | Same category link with a confirmed nonmatching product ID. | Category remains selected and No Products Found appears. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have two public products in different categories of the Organization. In Dashboard → Build → Products → All products, copy the first product’s public link and record its product and category names. Its link includes a category and product ID.
* Have a second link using the same category but an ID confirmed to have no matching public product in that category. This is a link-only variation; no product is changed.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, products, search-filters

**Parameters:**

SharedLink: MatchingProduct, NoMatchingProduct

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the supplied product link in a fresh customer tab on the cutover host. | SharedLink | The selected category and result match the table. |
| Reload the page. |  | The same category and matching result or no-results state return. |
| Clear Search Products. |  | The category’s public products return; no product from the other category appears. |

## Gift cards

### SPT-557: Web Public - Gift Cards - Open gift cards from the organizer profile

**Title:** Web Public - Gift Cards - Open gift cards from the organizer profile

**Description:** Verify the Gift Cards tab leads to the same Organization’s gift-card form, including after reload.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer, credits

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public organizer profile. |  | Gift Cards is available after the page finishes loading. |
| Select Gift Cards. |  | The gift-card form shows the correct Organization’s gift-card name and image. |
| Reload the page. |  | Gift Cards remains selected and the same form loads without switching to Events or a product category. |

### SPT-558: Web Public - Gift Cards - Display saved denomination choices

**Title:** Web Public - Gift Cards - Display saved denomination choices

**Description:** Verify the form on the Gift Cards tab and fixed denomination choices against the selected gift card. Compare purchase price separately from the value the recipient receives.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, credits, appearance

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Gift Cards. |  | The gift-card image, A Friend, For Me, Sender’s Name, Who’s it for?, Email, Options, Quantity, Custom Message and Delivery Date appear. |
| Open Options. |  | The saved denominations appear in value order, displaying their recorded purchase prices and currency. |
| Select each offered denomination in turn. |  | The selected choice remains visible and matches the recorded denomination. |
| Open Quantity without changing it. |  | The menu offers whole quantities 1 through 20; quantity starts at 1. |

### SPT-559: Web Public - Gift Cards - Reject missing or invalid recipient details

**Title:** Web Public - Gift Cards - Reject missing or invalid recipient details

**Description:** Check one invalid gift-card identity field per run, then correct it and reach Review without adding a card to the basket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| InvalidField | Input | Expected error |
| --- | --- | --- |
| SenderName | Empty Sender’s Name. | Sender name is required. |
| RecipientName | Empty Who’s it for? | Recipient name is required. |
| RecipientEmail | Empty Email. | Recipient email is required. |
| EmailFormat | Email = invalid-email. | Invalid email. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.
* Select A Friend. Use controlled sender and recipient details and leave exactly the selected field invalid. The recipient Email is the address that will receive the gift card, not necessarily the purchaser’s email.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, credits, edge-case

**Parameters:**

InvalidField: SenderName, RecipientName, RecipientEmail, EmailFormat

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Gift Cards and fill the form with the selected invalid value. | InvalidField | All other required fields contain valid details. |
| Select Continue. |  | The affected field shows the matching error and the form does not reach a usable Review submission. |
| Correct that field and select Continue. |  | Review shows the correct sender, recipient, denomination and quantity without an error. |
| Select Cancel. |  | The form returns with the corrected values; no card was added to the basket. |

### SPT-562: Web Public - Gift Cards - Purchase a card for future delivery

**Title:** Web Public - Gift Cards - Purchase a card for future delivery

**Description:** Choose a future delivery date for one recipient, complete a test purchase and verify the saved schedule. Actual delivery at that later date remains a separate timed check.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.
* Have approved test payment details and controlled purchaser and recipient inboxes. Use one gift card, quantity 1, and an empty basket.
* Record the gift card’s delivery timezone, today’s date in that timezone and the date three days later. A setup owner must provide a permitted read of the saved gift-card delivery date after purchase; do not assume the confirmation page exposes it.
* Before execution, authorize the purchase and agree how its completed test order will be retained or refunded.

**Postconditions:**

* Record the order reference, payment reference and saved delivery date. Retain or refund only this test order using the pre-agreed procedure; never trigger a scheduled job to force delivery. Missing saved-schedule access blocks the schedule assertion.

**Tags:** public, credits, purchases

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Gift Cards and select A Friend. |  | The sender and recipient form appears. |
| Enter controlled sender/recipient details and select one denomination. |  | The selected name, email and denomination are retained. |
| Select Delivery Date three days after today in the gift card’s timezone. | Recorded future date | The selected date is shown; past dates cannot be chosen. |
| Select Continue and review the recipient and date. |  | Review retains the chosen recipient, quantity 1 and future delivery date. |
| Select Add to Cart, then Checkout, and complete one approved test payment. |  | One successful order is created for the selected card and recipient. |
| Compare the saved schedule and controlled recipient inbox. |  | The card has the recorded future delivery date; the redemption email has not been sent immediately. |

### SPT-563: Web Public - Gift Cards - Remove one recipient without changing another

**Title:** Web Public - Gift Cards - Remove one recipient without changing another

**Description:** Remove the first of two recipients and add only the remaining recipient’s selected card to the basket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.
* Start with an empty test basket. Have two controlled recipient names/emails. Record a different denomination and Custom Message for each so a mix-up is visible.

**Postconditions:**

* Remove the test gift card from the basket and reload to confirm it is empty. Do not pay or send a gift card.

**Tags:** public, credits, basket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Gift Cards → A Friend and fill Sender’s Name plus the first recipient. |  | The first recipient’s details are visible. |
| Select Add New Recipient and fill the second recipient. | Different recorded denomination and message | Both recipients show their own details. |
| Select Remove Recipient beside the first recipient. |  | Only the second recipient remains with their original name, email, denomination, quantity, message and date. |
| Select Continue. |  | Review lists only the second recipient and the correct total. |
| Select Add to Cart, then Checkout. |  | The basket contains only the second recipient’s selected gift card; the first recipient is absent. |

### SPT-5988: Web Public - Gift Cards - Return from Review without losing details

**Title:** Web Public - Gift Cards - Return from Review without losing details

**Description:** Use Back or Cancel from Review and verify that entered gift-card details are retained without adding anything to the basket.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| ReturnControl | Action on Review |
| --- | --- |
| Back | Use the back-arrow button above Review. |
| Cancel | Select Cancel in the form footer. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.
* Start with an empty basket. Enter controlled sender/recipient details, quantity 2, a non-default denomination, a short Custom Message and a future Delivery Date.

**Postconditions:**

* Leave without selecting Add to Cart. The basket remains empty.

**Tags:** public, credits, basket

**Parameters:**

ReturnControl: Back, Cancel

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Gift Cards, fill the prepared A Friend details and select Continue. |  | Review shows the recorded details and total. |
| Select the chosen return control. | ReturnControl | The form returns with all entered values preserved. |
| Select Continue again. |  | Review shows the same recipient, quantity, denomination, message, date and total; no gift card has been added. |

### SPT-5989: Web Public - Gift Cards - Limit the custom message to 150 characters

**Title:** Web Public - Gift Cards - Limit the custom message to 150 characters

**Description:** Verify the optional gift-card message accepts 150 characters but does not retain a 151st character.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.
* Use A Friend with valid controlled sender/recipient details. Prepare exactly 150 plain-text characters and a separate 151-character version.

**Postconditions:**

* Leave without selecting Add to Cart. No order or message is sent.

**Tags:** public, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Gift Cards and enter the valid details. |  | The A Friend form is ready. |
| Paste 150 characters in Custom Message and leave the field. |  | All 150 characters are retained. |
| Replace the message with the 151-character text and leave the field. |  | No more than 150 characters are retained. |
| Select Continue. |  | Review shows only the accepted message text with the correct recipient. |

### SPT-5990: Web Public - Gift Cards - Reset friend details when choosing For Me

**Title:** Web Public - Gift Cards - Reset friend details when choosing For Me

**Description:** Switch recipient modes without carrying a friend’s details into a self purchase. Switching mode starts a new form in the current implementation.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Have an Organization with Gift Cards enabled and an active gift card with at least two saved denominations. A denomination is one offered gift-card value and its purchase price; record both from Dashboard → Build → Gift Cards → All gift cards. Use only prepared records whose values are known.
* Start with an empty basket. Have different controlled details for the friend and purchaser.

**Postconditions:**

* Leave without selecting Add to Cart. The basket remains empty.

**Tags:** public, credits, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public profile → Gift Cards → A Friend and enter the friend’s details, message and future date. |  | The entered friend details appear. |
| Select For Me. |  | Your name and Email are shown; the friend’s data is cleared, and Sender’s Name, Custom Message and Delivery Date are hidden. |
| Enter the purchaser’s name/email, choose a denomination and select Continue. |  | Review identifies the purchaser as recipient with no friend message or future date. |
| Select Cancel, then A Friend. |  | A fresh friend form appears without the purchaser’s previous details. |

### SPT-5991: Web Public - Gift Cards - Show no gift-card form when none are offered

**Title:** Web Public - Gift Cards - Show no gift-card form when none are offered

**Description:** Distinguish the module being disabled from the module being enabled without an active gift card.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| GiftCardAvailability | Saved module/catalog state |
| --- | --- |
| Disabled | Gift Cards module OFF. |
| EnabledWithoutCards | Gift Cards module ON; no active publicly available gift cards. |

**Preconditions:**

* Have the public profile link for an enabled Organization. Have its name and expected details supplied by an employee with Manage Organization Info from Dashboard → Organization → Settings → Organization settings. Customers need no employee permission to browse the profile.
* Use a prepared Organization matching GiftCardAvailability. For EnabledWithoutCards, the setup owner confirms there are no active gift cards available publicly. Do not deactivate an existing card during this check.

**Postconditions:**

* No saved data changes. Leave the selected Organization and its catalog unchanged.

**Tags:** public, organizer, credits

**Parameters:**

GiftCardAvailability: Disabled, EnabledWithoutCards

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the organizer profile and inspect the full tab row after the page loads. | GiftCardAvailability | Gift Cards is absent when the module is off or there are no public gift cards. |
| Open the saved Gift Cards tab link for the same Organization. |  | The correct Organization opens with an available tab or its general empty state. No gift-card form can be used. |

## Additional cutover checks saved in Qase

### SPT-6018: Web Public - Organizer Profile - Return not found for retired and unsupported profile links

**Title:** Web Public - Organizer Profile - Return not found for retired and unsupported profile links

**Description:** Check the Next.js cutover’s not-found behavior for a retired preview URL and an unsupported tab on the canonical profile.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| UnsupportedLink | Run |
| --- | --- |
| RetiredPreview | Use the former /org/new/{slug}/ URL for the known Organization. |
| UnknownTab | Use /o/{slug}/ with an unsupported tab segment after the slug. |

**Preconditions:**

* Use a release candidate that routes /o/ to Next.js. Have a known public Organization and its working /o/{slug}/ link. Use an unsupported tab name that is not a valid offering.

**Postconditions:**

* Leave all Organization settings as found.

**Tags:** public, organizer, edge-case

**Parameters:**

UnsupportedLink: RetiredPreview, UnknownTab

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the canonical link. |  | The profile loads for the expected Organization and shows Support. |
| Open the link for the chosen run in a fresh tab. | UnsupportedLink | The normal not-found page appears. No organizer profile or redirected catalog tab is shown. |

### SPT-6019: Web Public - Organizer Profile - Find the right event with Search Events

**Title:** Web Public - Organizer Profile - Find the right event with Search Events

**Description:** Search for public Events from this Organization without mixing in other offerings. Check clearing the search and recovering from no matches.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Use a working Next.js public profile. Record a public upcoming Event with a distinct name, a second public Event from this Organization, and an unrelated Organization’s Event with the same search word. Include a public membership or product sharing the word if available.
* Record a word that matches the desired Event and a term absent from all prepared Event names. Use at least one unrelated Event sharing that search word even if no matching membership or product is available.

**Postconditions:**

* No basket or saved data changes are needed.

**Tags:** public, events, search-filters

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Events and enter the matching word in Search Events. |  | The matching Event appears. Results exclude the other Organization and non-Event offerings. |
| Replace the word with the unmatched term. |  | No events match your search. appears, and Search Events remains usable. |
| Clear Search Events. |  | The unfiltered upcoming Events list returns, including the second Event. |
| Search for the matching Event again and select it. |  | The correct public Event opens with the expected Organization and date. |

### SPT-6020: Web Public - Organizer Profile - Open the correct public guestlist request

**Title:** Web Public - Organizer Profile - Open the correct public guestlist request

**Description:** Verify the public guestlist entry point and the Organization that owns the request form. A guestlist request asks an Organizer to accept the Customer’s party for a selected date.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Use an enabled Organization with Allow guestlist joins on in Dashboard → Organization → Settings → Organization settings → Enabled modules and a public Guestlist widget configured under Dashboard → Promote → Widgets. Ask the setup owner to confirm which guestlist embed is assigned and give you a distinctive date or reason shown in its form.
* Use prepared comparison profiles for both cases: Allow guestlist joins off with a configured widget, and Allow guestlist joins on without a public widget.

**Postconditions:**

* Close the request form without submitting. No reservation is created.

**Tags:** public, organizer

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the profile with guestlist joining and the widget configured. |  | Join guestlist is visible. |
| Select Join guestlist. |  | Request guestlist opens and shows the recorded date or reason for that Organization. |
| Close the request and open each comparison profile. |  | The first profile remains usable after closing. Neither comparison profile has a Join guestlist control. |

### SPT-6017: Web Public - Organizer Profile - Limit the Support message to 500 characters

**Title:** Web Public - Organizer Profile - Limit the Support message to 500 characters

**Description:** Check the message limit in Contact Details without sending an inquiry.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Use a Next.js public profile with Allow customers to email you on under Dashboard → Organization → Settings → Organization settings → Contact. Prepare 500 plain-text characters with a known ending and a different 501st character.

**Postconditions:**

* Close Contact Details without selecting Send.

**Tags:** public, organizer, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Support and select Message Us if shown as a tab. |  | The Message field is available. |
| Paste the 500 characters in Message. |  | All 500 characters are retained, including the known ending. |
| Append the extra character. |  | The field still contains exactly 500 characters and the extra character is absent. |

### SPT-6021: Web Public - Organizer Profile - Respect the organizer’s contact setting on narrow and wide screens

**Title:** Web Public - Organizer Profile - Respect the organizer’s contact setting on narrow and wide screens

**Description:** Keep Contact Details available when organizer messages are turned off, while respecting the Organizer’s choice about accepting messages. Run once above and once at or below 920 pixels.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

**Preconditions:**

* Use a Next.js public profile with Allow customers to email you off under Dashboard → Organization → Settings → Organization settings → Contact. Record that Organization’s saved refund policy and a saved website or social address. Use a comparable enabled profile to confirm the contact form works for the enabled setup.

**Postconditions:**

* Close both dialogs without entering or sending an inquiry.

**Tags:** public, organizer, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Support on the profile with customer messages off. |  | Contact Details shows the Organizer’s refund policy and saved link. No Message Us form or Send control is available. |
| Open Support on the enabled comparison profile. |  | Message Us is available and the displayed Organizer is the one expected. |

## Queue-it case update

Qase verified the change to Preconditions. The title, description, tags and steps below provide context.

### SPT-5900: Queue-it - Subsequent protected event navigation and valid admission regression

**Title:** Queue-it - Subsequent protected event navigation and valid admission regression

**Description:** Coverage for SPW-20126: Subsequent protected event navigation and valid admission regression.

Requirement: https://showpass.atlassian.net/browse/SPW-20126
Shared-navigation test setup: https://github.com/showpass/showpass-frontend/pull/7852

**Preconditions:**

Nonproduction unprotected organizer at the canonical Next.js /o/<venueSlug>/ profile with two upcoming published non-recurring events A/B. Both event protection flags enabled. Same hostname as SITE_URL. Queue-it rule A loads integration without waiting; rule B enters an active controlled waiting room. Record and restore original settings. Use only controlled nonproduction hosts and matching published Queue-it rules. Do not alter production rules.

**Postconditions:**

Record actual results and evidence. Restore any fixture settings or network overrides changed during execution.

**Tags:** queue-it, organizer-profile, SPW-20126

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In a fresh context, open the organizer and select A by its card title. |  | A opens client-side and Queue-it scripts/configuration load. |
| Use browser Back, then select B's card without reloading. |  | the already-loaded integration evaluates B and redirects to B's waiting room. |
| Complete admission. |  | successful return to B. |
| Use Back/Forward and return through B's card with valid admission. |  | no unnecessary repeat waiting and the correct destination remains usable. |
| Return to the unprotected organizer. |  | no inherited protection or stale B redirect. |

## Case decisions and migration gaps

### One case per behavior

| Published cases | Next.js decision |
| --- | --- |
| SPT-355, 5968–5972, 5974–5975 | Update in place. Start from the public Event link, check branding and image fallback, move description to About, follow social links under Support, open Business hours from its status, and check canonical tabs, browser navigation and English/French. |
| SPT-354, 5976–5977 | Update the Support path, field labels and successful inbox proof. Move the 500-character check to SPT-6017. Hold SPT-5977’s change from FAQ/cancel to Refund Policy/cancel until the FAQ disposition is agreed. |
| SPT-3496, 3497, 5979, 5981, 5982 | Update the list, date display and in-page Calendar controls. Require at least 11 Events for paging and keep six memberships for their five-per-page list. Preserve the SPT-3496 Desktop/Mobile group. |
| SPT-470, 474, 5983–5987 | Use Products → category → product, Description and Buy product. Use the named option’s increase/decrease controls and verify quantities in checkout. Require 11 matching products for paging. Keep Dashboard-copied product links as the direct category/product proof. |
| SPT-558, 5991 | Check the same purchase form inline. Gift Cards is hidden both with the module off and with no public cards. The old tab-with-empty-message expectation changes. |
| SPT-5973, 5978, 557, 559, 562, 563, 5988–5990 | Keep the existing proof and cases. Re-run on Next.js. Gift-card validation, scheduling, return, recipient isolation and message limits use the shared form. |
| SPT-5980 | Retain base, all-in and hidden pricing expectations. The Hidden run exposes a product difference; hold any rewrite that would remove it. |
| SPT-5900 | Update only Preconditions in the existing Queue-it case in suite 1256. Replace the preview URL with the canonical Next.js /o/{venueSlug}/ profile on the controlled host. Keep the two protected Events, admission, Back/Forward and no inherited protection checks. Re-run SPT-5897–5899 and SPT-5901–5905 without creating another Queue-it suite. |

| New cases | Saved suite | What each adds |
| --- | --- | --- |
| SPT-6018 | Organizer Profile (465) | Retired preview and unknown tab not-found responses. |
| SPT-6019 | Events (474) | Organizer event search, no matches and clearing search. |
| SPT-6020 | Organizer Profile (465) | Join guestlist action, correct form and visibility rules. |
| SPT-6017 | Organizer Profile (465) | The 500-character control limit moved from SPT-5976. |
| SPT-6021 | Organizer Profile (465) | Support with messages off on narrow and wide screens. |

### Behavior at risk in the cutover

| Priority and behavior | Previous visible path | Next.js path and evidence | Disposition |
| --- | --- | --- | --- |
| High · Unknown tab returns 404 | Angular's broad organizer route accepted extra segments. | SPW-16411 requires an unsupported path to return 404. The dynamic tab handler still passes unknown names through and the page falls back to its first visible tab. | Source and requirement disagree. SPT-6018 checks this separately from unknown/disabled Organizations in SPT-5973. /org/new/ retirement is intentional. |
| High · Hide prices when configured | The public Events and Memberships cards read disable_price_range_display for the owning Venue. | Both new cards compute and display prices without checking that flag. | Source difference. Preserve Hidden in SPT-5980, including a child Organization Event if the parent shows it. Verify approved cutover behavior before removing the assertion. |
| High · Contact opt-out on small screens | Angular Help & Info conditioned the shortcut to message the Organizer. Its form/server enforcement was unresolved in the original review. | The new Support component checks the saved Allow customers to email you setting. The wide layout hides the form when off. At 920px or less it hides the tabs but still renders Message Us by default. | SPT-6021 targets the likely visible mismatch. Fix/confirm wide and narrow behavior before cutover. UI inspection alone cannot prove server enforcement or email delivery. |
| High · Calendar booking and eligible inventory | Profile → View Event Calendar opened a separate purchase surface. | Events → Calendar uses the shared calendar, selects tickets and sends the customer to public Checkout. On the open Next.js Beta profile, Events showed List selected and Calendar available. The initial Next.js build showed Calendar first when enabled. | [BUG-01](#bug-01--calendar-enabled-organizer-opens-in-list-view) records the default-view regression against SPW-18973. SPT-3497 covers browsing. SPT-4979 covers calendar host scope. The timeslot-to-checkout flow remains a separate SPT-3513 follow-up. |
| Medium · Saved links, tabs, language and history | Existing Event links, bookmarks and Dashboard’s Copy product link. | Next.js accepts named tabs, category paths and the product ID query. Switching main tabs replaces browser history and constructs a new path without the current query or explicit locale. Product category buttons change selection without updating the address. | Update SPT-355, 5972, 5975 and 5987. Verify both host types, English/French, slash variants, Back/Forward and refresh. A Dashboard-copied category/product link is supported evidence; copying the address after a category click is not equivalent. Resolve whether clicked categories must remain shareable or survive reload. |
| Medium · Self-service help | Help & Info → FAQ linked directly to ticket lookup, printing, ticket-name and refund help. | Support → Contact Details shows the refund policy and saved website/social links. It does not mount the existing FAQ component used on other surfaces. | FAQ links appear unported from this entry. Hold SPT-5977’s scope change until a replacement path from the profile is shown or removal is accepted. SPT-3304 remains separate Event detail coverage. |
| Medium · Organizer image and header | The profile included the saved logo/avatar and banner. | Mounted Next.js profile hero uses the branding header, then saved banner, then default banner. It has no separate avatar in this hero or identity band. Social links still have a route through Support. | Update SPT-5968 for hero precedence after the loss of the separate logo is accepted or a visible replacement is shown. Check name and Support while scrolling on desktop and mobile. |
| Medium · Multi-day dates and custom TBD | Event cards displayed Starts and Ends, including the end time. The Angular TBD label was generic. | The new list shows a date range and one start time. Custom date/time TBD uses shared formatting. Search may return recurring occurrences while the plain list shows parents. | SPT-5981 covers the new visible range and handoff. Confirm the end-time replacement on Event detail before retiring that assertion. Reuse SPT-5959 on the canonical profile for custom TBD and SPT-6019 for Search Events. |
| Medium · Guestlist access | Cutover plan says the old controller recognized /widget/, but the legacy profile did not expose a guestlist tab. | Join guestlist appears when Organization joins are allowed and a widget URL is present. It opens the public request form. | SPT-6020 covers selecting the correct Organization’s form and gated access. Use SPT-3769 for actual submission and Pending reservation proof. Confirm the configured embed and its rollout before running. Keep old /widget/ compatibility as a traffic/consumer question. |
| Medium · ResDiary booking handoff | Booking link → organizer product category → cart for the existing booking. | Organizer code stores the link’s booking reference for 10 minutes and the basket reads it for checkout. Tab changes replace the URL, so a lost query or a cleared reference can affect reload or a fresh visit. | Enhance SPT-2319 with the real canonical link from a prepared booking, then verify the eligible product and matching reference on the paid test order. Include a clean-customer comparison to catch a stale reference. Requires controlled ResDiary and payment setup. |
| Medium · Product inventory rejection | Angular exposed a quantity menu, including some requests that the backend would reject. | Product details use per-option quantity controls and may prevent an increase before a request is sent. | SPT-5986 preserves the customer outcome, including the retained first unit after reload. A disabled increase proves UI prevention only. Preserve backend oversell/rejection proof in the inventory suite with an isolated stock-change or server test. |
| Medium · SEO, localized data and blank/error states | Direct organizer page carried metadata and rendered its profile even with an empty catalog. | Next.js emits title, description, image and LocalBusiness structured data. Test venues opt out of SEO. A failed catalog sub-request is converted into an empty list. A controlled test confirmed that a full Products failure hides the tab and a partial failure hides the affected category. | [BUG-02](#bug-02--products-disappear-during-a-catalog-outage) records the isolated reproduction. The deployed outage check and normal/test Venue metadata checks remain unrun. The earlier French smoke used the retired preview path, so it cannot establish canonical-route locale behavior. |
| Cutover dependency · Registration, promoter links and direct gift-card route | Existing external registration link, emailed verification link and gift-card iframe route. | Dedicated Next.js routes exist. The checked registration aliases both still exist, and Jira’s intended temporary /register/ disposition is pending. The retained direct gift-card page is separate from the inline form. | Verify static routes win on the cutover host and preserve login return to the exact link, existing invite outcomes and compatibility decisions. Keep the owning registration/promoter tests separate from buyer storefront cases. No authenticated mutations are part of this review. |

A published case definition is coverage of an expected behavior. The checkout, contact delivery, guestlist submission, Queue-it, French routing and production ownership checks above remain unexecuted in this review. The source discrepancies are candidates to verify on the release build.

## Review evidence

* **Qase, 2026-11-18 09:12 MST:** one complete SPT snapshot of 2,472 definitions. Compared all 35 saved cases against the November 12 note, including 123 steps, full text, tags, Single parameters and the stored Desktop/Mobile group on SPT-3496. Counts by suite: 465 fourteen, Events 474 five, Products 47 seven and Gift Cards 55 nine. The nine Queue-it cases now appear under suite 1256. Filtered the full snapshot for organizer/route terms, Search Events, Contact Details, FAQ, guestlist, calendar, ResDiary, registration, promoter and queue references. Checked related candidates including SPT-465, 2319, 3304, 3305, 3513, 3769, 4979, 5421, 5423, 5897–5905 and 5959. Calendar host-to-purchase coverage belongs in SPT-3513, which was outside the publication batch.
* **Source compared:** backend master `d296b83278c7` and frontend develop `4f6155544e62`. This checkout contains both Django’s fallback renderer and the new Next.js files. [Django public routes](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/front/urls.py>) · [Angular organizer template](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/front/venues/venues/detail.html>) · [Next.js profile source](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/org-profile>) · [Next.js organizer route files](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/pages/o/[venueSlug]>).
* **Support, routing and purchase evidence:** [Contact Details layouts and settings](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/seating/components/contactDetailsModal/ContactDetails.tsx>) · [Tab navigation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/org-profile/ui/components/OrganizerProfileTabs.web.tsx>) · [Profile request and 404 handling](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/page-components/org-profile/OrganizerProfileRoute.tsx>) · [Embedded Calendar checkout test](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/org-profile/ui/components/OrganizerProfileEvents.web.test.tsx>).
* **Requirements and rollout:** storefront scope [SPW-18973](https://showpass.atlassian.net/browse/SPW-18973), canonical links [SPW-16411](https://showpass.atlassian.net/browse/SPW-16411), ingress [SPW-20053](https://showpass.atlassian.net/browse/SPW-20053) (Code Review at read time), suborganization registration [SPW-20124](https://showpass.atlassian.net/browse/SPW-20124) (On Deck), promoter verification [SPW-20125](https://showpass.atlassian.net/browse/SPW-20125) (Beta QA), Queue-it [SPW-20126](https://showpass.atlassian.net/browse/SPW-20126) (Complete), cleanup [SPW-20054](https://showpass.atlassian.net/browse/SPW-20054) (On Deck). Existing release checks [SPW-19345](https://showpass.atlassian.net/browse/SPW-19345), [SPW-19349](https://showpass.atlassian.net/browse/SPW-19349), [SPW-19352](https://showpass.atlassian.net/browse/SPW-19352). Ticket statuses and local source do not establish deployed ownership.
* **Previous browser evidence:** October 25 Beta smoke checked the temporary page and separately followed the Event organizer link to Angular. It remains historical and supplies no canonical Next.js pass. [[03 Test Cases/Authentication/public-and-protected-pages-beta-smoke-2026-10-25]].

* **Local check:** the maintained Qase parser validated 40 draft or retained cases and 139 step rows. The live snapshot comparison found exactly 25 edited storefront cases and ten retained definitions. The temporary Qase snapshot and four working files were removed and their absence verified.

## Beta browser check — Organizer calendar starting view

**November 18, 2026 · Beta · [1859-qa-cad](https://beta.showpass.com/o/1859-qa-cad/) · signed-in public web view.** The sidebar already held the Next.js version at the canonical path. The user warned that reloading would restore the legacy page, so this check observed the already-open document.

[TC-01 — Calendar-enabled Organizer starting view](#tc-01--calendar-enabled-organizer-starting-view) · [BUG-01 — Calendar-enabled Organizer opens in List view](#bug-01--calendar-enabled-organizer-opens-in-list-view)

### TC-01 — Calendar-enabled Organizer starting view

**What this tests:** Which view is selected under Events when Calendar is available on the Organizer profile.

**Start here:** The previously opened Next.js Beta page for 1859-qa-cad. It lists [1859 - Landing](https://beta.showpass.com/anime-con-landing/) under **Events**.

1. Inspect **Events** and the **List** and **Calendar** controls on the open page.
   - **Expected:** Calendar is the starting view for the calendar-enabled attraction setup described in [SPW-18973](https://showpass.atlassian.net/browse/SPW-18973).
   - **Actual:** **Events** was selected, **List** was selected, **Calendar** was available but unselected, and the attraction appeared as an Event card.
   - **Evidence:** The sidebar screenshot and accessibility state both show the selected control. The capture is in the browser tool output. No standalone screenshot file was retained.

### BUG-01 — Calendar-enabled Organizer opens in List view

**Draft only.**

**Title:** fix (organizer profile) | show Calendar first for a calendar-enabled attraction organizer

**GIVEN** The Next.js Beta Organizer profile for 1859-qa-cad lists **1859 - Landing** and offers **Calendar** under **Events**.

**WHEN** I view **Events** on the Organizer profile.

**THEN** **List** is selected, and I have to choose **Calendar** to reach date selection. Calendar should be selected first for this setup.

**Supporting evidence:** [The initial Next.js implementation](https://github.com/showpass/showpass-frontend/pull/6117) used the calendar as the visible Events view when the Organizer calendar was enabled. [The July storefront refactor](https://github.com/showpass/showpass-frontend/pull/6136) put List and Calendar in the same tab and set List as the initial view. The legacy Angular page instead showed its Events list and a separately clicked **View Event Calendar** button.

**Limits and cleanup:** This was a read-only observation of the existing tab. There was no refresh, tab switch or booking attempt. The starting view on a fresh visit is supported by the source and was not independently reloaded on Beta. The selected browser view, settings and sales records were left unchanged.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Calendar-enabled Organizer starting view | Failed against the original Next.js behavior | List is selected and Calendar is available. The current code defaults to List. | [TC-01](#tc-01--calendar-enabled-organizer-starting-view) · [BUG-01](#bug-01--calendar-enabled-organizer-opens-in-list-view) |
| Fresh public visit to this Next.js build | Not run | Reloading the open Beta URL would leave the new page, per the user's session constraint. | [TC-01](#tc-01--calendar-enabled-organizer-starting-view) |

## Catalog loading failure check — November 19, 2026

[TC-02 — Failed catalog requests look empty](#tc-02--failed-catalog-requests-look-empty) · [BUG-02 — Products disappear during a catalog outage](#bug-02--products-disappear-during-a-catalog-outage)

### TC-02 — Failed catalog requests look empty

**What this tests:** Whether customers can tell a temporary Products failure apart from an Organizer that has no products, and whether the catalog returns once the service responds again.

**Start here:** The open [1859-qa-cad Beta profile](https://beta.showpass.com/o/1859-qa-cad/) provides the visible healthy-state baseline. The controlled test uses frontend develop `5d1b98ac09` with a synthetic public profile, one upcoming Event, a **Merch** category with **Tour shirt**, and a **Prints** category with **Event poster**. The local check runs the real profile data loader, visibility rules, and profile/tab components. Repository responses, logging and unrelated UI providers and product cards are replaced with test doubles. No request can reach Beta from this test.

1. Inspect the existing Beta page without clicking any controls or refreshing.
   - **Expected:** The Next.js Organizer page shows **Products** when the catalog is available.
   - **Actual — Passed for tab visibility:** **Products** is available in the tab row, and **Events** is selected. The Products contents were not opened. The sidebar accessibility capture shows the control. This was a read-only observation.
2. Open the Products route for the synthetic profile with healthy responses. Repeat with a successful response that contains zero products.
   - **Expected:** Two categories are available in the first run, and **Products** is hidden only in the empty comparison run.
   - **Actual — Passed:** Both products were supplied to the Products panel on the healthy load. The genuinely empty route showed **Events** only.
3. Leave the synthetic catalog unchanged. Return a controlled HTTP 503 for each category's product list, then separately for the category-list request itself.
   - **Expected:** The page distinguishes a failed service from a genuinely empty catalog and gives a way to try again.
   - **Actual — Failed:** Both failure runs produced exactly the same rendered tab markup as the genuinely empty run. **Products** disappeared, a direct Products route fell back to **Events**, and the profile displayed no error or retry action. The loader logged the failures internally.
4. Fail only the Merch product request, leaving Prints healthy.
   - **Expected:** Prints remains available, and the customer can tell another category failed to load.
   - **Actual — Failed:** **Products** stayed available with **Event poster**, but **Merch** and **Tour shirt** disappeared without a message.
5. Restore the healthy responses and open a fresh synthetic Products route.
   - **Expected:** Both categories are available again.
   - **Actual — Passed on a fresh load:** Both products returned and **Products** was selected. Automatic recovery on the already open page was not exercised.

### BUG-02 — Products disappear during a catalog outage

**Draft only. Reproduced in a controlled test of the Next.js frontend.**

**Title:** fix (organizer profile) | show an error when Products cannot load

**GIVEN** A public Organizer profile has products on sale and the product service temporarily fails while the profile loads.

**WHEN** I open the Organizer's Next.js Products page.

**THEN** The **Products** tab disappears and I land on **Events** with no explanation. When only one category fails, its products silently disappear while the others remain visible. The profile should show which products could not be loaded and give me a way to retry when the service recovers.

**Supporting evidence:** The [route data loader](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/org-profile/data/services/getOrganizerProfileRouteData.ts:60>) turns a failed request into an empty page and [drops empty product categories](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/org-profile/data/services/getOrganizerProfileRouteData.ts:149>). The [profile page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/org-profile/ui/pages/OrganizerProfilePage.web.tsx:93>) displays Products only when products remain in the returned categories. [SPW-18973](https://showpass.atlassian.net/browse/SPW-18973) calls for usable loading, empty and unavailable states. The Jira search did not find this storefront outage in the returned results. SPW-7233 is a separate Dashboard save error.

**Limits and cleanup:** Failure injection ran only against local test doubles. The initial catalog fetch runs on the server, so blocking requests in the open Beta tab would not test this path. No Beta failure was induced and its tab was left untouched. The fixture was in memory and the temporary script was removed. No product or Qase data changed.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Beta tab visible | Passed | Products was available on the existing Next.js page. | [TC-02, step 1](#tc-02--failed-catalog-requests-look-empty) |
| Healthy and empty controls | Passed | Two products loaded on success. An empty catalog hid Products. | [TC-02, step 2](#tc-02--failed-catalog-requests-look-empty) |
| Whole catalog failure | Failed | Same output as an empty catalog. Products was missing with no explanation. | [TC-02, step 3](#tc-02--failed-catalog-requests-look-empty) · [BUG-02](#bug-02--products-disappear-during-a-catalog-outage) |
| One category fails | Failed | Merch disappeared while Prints remained visible. | [TC-02, step 4](#tc-02--failed-catalog-requests-look-empty) · [BUG-02](#bug-02--products-disappear-during-a-catalog-outage) |
| Fresh load after recovery | Passed | Products and both categories returned. | [TC-02, step 5](#tc-02--failed-catalog-requests-look-empty) |
| Deployed Beta outage | Not run | Requires an isolated server-side failure on a Next.js test deployment. | [TC-02](#tc-02--failed-catalog-requests-look-empty) |

## Next.js Qase publication verified

**Published all 27 approved changes on November 18, 2026.** The maintained batch applied 21 storefront updates, one Queue-it preconditions update, and five creates. The existing titles and suite assignments were preserved.

**Retirement review:** no organizer case in the reviewed scope tests only a retired workflow. The batch applied no `[depreciated]` prefixes. SPT-5900 still proves Queue-it admission and navigation and only needs the new starting URL. SPT-5980 still proves the price visibility requirement, including the Venue-scoped Waffle flag, and is excluded from writes.

**Held edits:** SPT-5968 (separate Organizer logo), SPT-5977 (FAQ access), SPT-5981 (multi-day end time), and SPT-5986 (backend rejection proof). These four retain their saved coverage while the migration differences are resolved. Shared cases SPT-2319, SPT-3513 and SPT-3769 are also outside this publication batch. The 500-character case was saved first, preserving that check before SPT-5976’s old LongMessage parameter was removed.

| Saved Qase case | Suite | Title | Fields written | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| [SPT-6017](https://app.qase.io/case/SPT-6017) (created from TC-28) | 465 | Web Public - Organizer Profile - Limit the Support message to 500 characters | All case fields | public, organizer, edge-case | None | 3 |
| [SPT-354](https://app.qase.io/case/SPT-354) (updated) | 465 | Web Public - Organizer Profile - Send a message to the organizer | description, steps | organizer, public, notifications | None | 5 |
| [SPT-355](https://app.qase.io/case/SPT-355) (updated) | 465 | Web Public - Organizer Profile - Open the correct organizer from an event | description, steps | organizer, public | None | 4 |
| [SPT-470](https://app.qase.io/case/SPT-470) (updated) | 47 | Web Public - Products - Read the complete formatted description | description, steps | products, appearance, public | None | 5 |
| [SPT-474](https://app.qase.io/case/SPT-474) (updated) | 47 | Web Public - Products - Use product controls with keyboard and screen reader | preconditions, steps | products, public, appearance | None | 6 → 5 |
| [SPT-558](https://app.qase.io/case/SPT-558) (updated) | 55 | Web Public - Gift Cards - Display saved denomination choices | description | appearance, public, credits | None | 4 |
| [SPT-3496](https://app.qase.io/case/SPT-3496) (updated) | 474 | Web Public - Organizer Profile - Browse public events and open the selected event | preconditions, steps | public, organizer, events | Existing grouped Platform/View (Desktop, Mobile) | 4 |
| [SPT-3497](https://app.qase.io/case/SPT-3497) (updated) | 474 | Web Public - Organizer Profile - Browse the organization event calendar | postconditions, steps | public, organizer, events | None | 4 |
| [SPT-5969](https://app.qase.io/case/SPT-5969) (updated) | 465 | Web Public - Organizer Profile - Expand and collapse the About text | description, preconditions, steps, params | public, organizer | TextLength = AtLimit, OverLimit → TextLength = AtLimit, OverLimit, ShortFallback, Blank | 3 |
| [SPT-5970](https://app.qase.io/case/SPT-5970) (updated) | 465 | Web Public - Organizer Profile - Open saved website and social links | preconditions, steps | public, organizer | None | 2 → 3 |
| [SPT-5971](https://app.qase.io/case/SPT-5971) (updated) | 465 | Web Public - Organizer Profile - Show or hide saved business hours | steps | public, organizer | HoursVisibility = Shown, Hidden | 2 → 3 |
| [SPT-5972](https://app.qase.io/case/SPT-5972) (updated) | 465 | Web Public - Organizer Profile - Open existing profile links | description, preconditions, steps | public, organizer | LinkFormat = Current, UppercaseSlug, OlderVenues, OlderOrganizations | 2 → 3 |
| [SPT-5974](https://app.qase.io/case/SPT-5974) (updated) | 465 | Web Public - Organizer Profile - Show the correct empty state | description, preconditions, steps, params | public, organizer | CatalogState = NothingAvailable, GiftCardsOnly → CatalogState = NothingAvailable, GiftCardsOnly, AboutOnly, CalendarOnly | 2 |
| [SPT-5975](https://app.qase.io/case/SPT-5975) (updated) | 465 | Web Public - Organizer Profile - Reload the selected catalog tab | description, preconditions, steps | public, organizer | TabSetup = AllTabs, ProductsOnly | 3 → 4 |
| [SPT-5976](https://app.qase.io/case/SPT-5976) (updated) | 465 | Web Public - Organizer Profile - Reject incomplete contact details | description, steps, params | public, organizer, edge-case | InvalidField = BlankName, ShortName, BlankEmail, InvalidEmail, MissingReason, BlankEvent, ShortEvent, BlankMessage, LongMessage → InvalidField = BlankName, ShortName, BlankEmail, InvalidEmail, MissingReason, BlankEvent, ShortEvent, BlankMessage | 4 |
| [SPT-5979](https://app.qase.io/case/SPT-5979) (updated) | 465 | Web Public - Organizer Profile - Browse memberships and open the correct group | steps | public, organizer, memberships | None | 3 |
| [SPT-5982](https://app.qase.io/case/SPT-5982) (updated) | 474 | Web Public - Organizer Profile - Hide the disabled calendar entry | steps | public, organizer, events | None | 2 |
| [SPT-5983](https://app.qase.io/case/SPT-5983) (updated) | 47 | Web Public - Products - Recover from an empty search and switch categories | steps | public, products, search-filters | None | 4 |
| [SPT-5984](https://app.qase.io/case/SPT-5984) (updated) | 47 | Web Public - Products - Load all matching products without mixing categories | description, preconditions, steps | public, products, search-filters | ProductList = AllProducts, MatchingSearch | 3 |
| [SPT-5985](https://app.qase.io/case/SPT-5985) (updated) | 47 | Web Public - Products - Keep option quantities separate after reload | preconditions, steps | public, products, basket | None | 5 |
| [SPT-5987](https://app.qase.io/case/SPT-5987) (updated) | 47 | Web Public - Products - Open a shared product link in its category | steps | public, products, search-filters | SharedLink = MatchingProduct, NoMatchingProduct | 3 |
| [SPT-5991](https://app.qase.io/case/SPT-5991) (updated) | 55 | Web Public - Gift Cards - Show no gift-card form when none are offered | steps | public, organizer, credits | GiftCardAvailability = Disabled, EnabledWithoutCards | 2 |
| [SPT-5900](https://app.qase.io/case/SPT-5900) (updated) | 1256 | Queue-it - Subsequent protected event navigation and valid admission regression | preconditions | queue-it, organizer-profile, SPW-20126 | None | 5 |
| [SPT-6018](https://app.qase.io/case/SPT-6018) (created from TC-25) | 465 | Web Public - Organizer Profile - Return not found for retired and unsupported profile links | All case fields | public, organizer, edge-case | UnsupportedLink = RetiredPreview, UnknownTab | 2 |
| [SPT-6019](https://app.qase.io/case/SPT-6019) (created from TC-26) | 474 | Web Public - Organizer Profile - Find the right event with Search Events | All case fields | public, events, search-filters | None | 4 |
| [SPT-6020](https://app.qase.io/case/SPT-6020) (created from TC-27) | 465 | Web Public - Organizer Profile - Open the correct public guestlist request | All case fields | public, organizer | None | 3 |
| [SPT-6021](https://app.qase.io/case/SPT-6021) (created from TC-29) | 465 | Web Public - Organizer Profile - Respect the organizer’s contact setting on narrow and wide screens | All case fields | public, organizer, edge-case | None | 2 |

Read-only Qase baseline: SPT, 2,472 cases at 15:38 MST. Reviewed the relevant 35 storefront and nine Queue-it definitions. The batch verified all 22 updates against the approved fields. A separate read compared all five new cases against their complete drafts and found no differences in title, description, prerequisites, cleanup, tags, steps, parameters or suite. The updated Single parameters retained their intended values and SPT-3496 retained its grouped Platform/View parameter. Temporary publication files were removed after verification.

## November 12 publication and Angular baseline

> [!note]- Historical record of the 35 saved definitions and the original Angular review
> The case content above is the November 18 Next.js draft. The counts, decisions and statuses inside this record describe the earlier review and publication.
> ## Qase publication — verified on November 12
>
>
> Published on 2026-11-12 after the user approved “apply all 35 papa.” The maintained batch command completed its **35-operation dry run**, applied **11 updates and 24 creates**, and read back the saved cases successfully.
>
> **Applied write scope:** updated SPT-354, SPT-355, SPT-470, SPT-474, SPT-557, SPT-558, SPT-559, SPT-562, SPT-563, SPT-3496 and SPT-3497; created TC-1 through TC-24 as SPT-5968–5991 (exact mapping below). Updates changed only Title, Description, Preconditions, Postconditions, Tags and Steps; SPT-559 also received the stated Single parameter. Existing suite placement, priority, type, automation metadata, attachments and unrelated fields remain unchanged. **SPT-3496’s saved grouped WebPublic Desktop/Mobile parameter is preserved**, while both views remain explained in its Description. New cases received the maintained tool’s manual-case defaults.
>
> **Approved scope corrections:** replaced the unsupported conditional Custom Amount instructions in SPT-558/559 with the current fixed Options behavior; preserved SPT-559’s message-length check in new SPT-5989 (TC-18). All 11 updated cases received the draft’s approved tags. No cases or suites were deleted or moved; SPT-5897–5905 were excluded.
>
> | Saved case / former draft | Qase title | Suite | Tags | Verified saved parameters | Steps |
> | --- | --- | --- | --- | --- | --- |
> | Updated [SPT-355](https://app.qase.io/case/SPT-355) | Web Public - Organizer Profile - Open the correct organizer from an event | 465 | public, organizer | None | 4 |
> | Created [SPT-5968](https://app.qase.io/case/SPT-5968) (TC-1) | Web Public - Organizer Profile - Display identity and image fallbacks | 465 | public, organizer | ImageState: WithImages, WithoutImages | 3 |
> | Created [SPT-5969](https://app.qase.io/case/SPT-5969) (TC-2) | Web Public - Organizer Profile - Expand and collapse the About text | 465 | public, organizer | TextLength: AtLimit, OverLimit | 3 |
> | Created [SPT-5970](https://app.qase.io/case/SPT-5970) (TC-3) | Web Public - Organizer Profile - Open saved website and social links | 465 | public, organizer | None | 2 |
> | Created [SPT-5971](https://app.qase.io/case/SPT-5971) (TC-4) | Web Public - Organizer Profile - Show or hide saved business hours | 465 | public, organizer | HoursVisibility: Shown, Hidden | 2 |
> | Created [SPT-5972](https://app.qase.io/case/SPT-5972) (TC-5) | Web Public - Organizer Profile - Open existing profile links | 465 | public, organizer | LinkFormat: Current, UppercaseSlug, OlderVenues, OlderOrganizations | 2 |
> | Created [SPT-5973](https://app.qase.io/case/SPT-5973) (TC-6) | Web Public - Organizer Profile - Reject unavailable organizer links | 465 | public, organizer | Availability: Unknown, Disabled | 2 |
> | Created [SPT-5974](https://app.qase.io/case/SPT-5974) (TC-7) | Web Public - Organizer Profile - Show the correct empty state | 465 | public, organizer | CatalogState: NothingAvailable, GiftCardsOnly | 2 |
> | Created [SPT-5975](https://app.qase.io/case/SPT-5975) (TC-12) | Web Public - Organizer Profile - Reload the selected catalog tab | 465 | public, organizer | TabSetup: AllTabs, ProductsOnly | 3 |
> | Updated [SPT-354](https://app.qase.io/case/SPT-354) | Web Public - Organizer Profile - Send a message to the organizer | 465 | public, organizer, notifications | None | 5 |
> | Created [SPT-5976](https://app.qase.io/case/SPT-5976) (TC-8) | Web Public - Organizer Profile - Reject incomplete contact details | 465 | public, organizer, edge-case | InvalidField: BlankName, ShortName, BlankEmail, InvalidEmail, MissingReason, BlankEvent, ShortEvent, BlankMessage, LongMessage | 4 |
> | Created [SPT-5977](https://app.qase.io/case/SPT-5977) (TC-9) | Web Public - Organizer Profile - Browse help and close without sending | 465 | public, organizer | None | 5 |
> | Updated [SPT-3496](https://app.qase.io/case/SPT-3496) | Web Public - Organizer Profile - Browse public events and open the selected event | 474 | public, organizer, events | Preserve existing Platform/View group: WebPublic Desktop and Mobile | 4 |
> | Updated [SPT-3497](https://app.qase.io/case/SPT-3497) | Web Public - Organizer Profile - Browse the organization event calendar | 474 | public, organizer, events | None | 4 |
> | Created [SPT-5978](https://app.qase.io/case/SPT-5978) (TC-10) | Web Public - Organizer Profile - Include sub-organization events only when enabled | 474 | public, organizer, events | ChildEvents: Included, Excluded | 3 |
> | Created [SPT-5979](https://app.qase.io/case/SPT-5979) (TC-11) | Web Public - Organizer Profile - Browse memberships and open the correct group | 465 | public, organizer, memberships | None | 3 |
> | Created [SPT-5980](https://app.qase.io/case/SPT-5980) (TC-21) | Web Public - Organizer Profile - Display event and membership price ranges | 465 | public, organizer, fees-and-taxes | PricingDisplay: BasePrices, FeesIncluded, Hidden | 3 |
> | Created [SPT-5981](https://app.qase.io/case/SPT-5981) (TC-22) | Web Public - Organizer Profile - Show multi-day and recurring event dates | 474 | public, organizer, events | None | 3 |
> | Created [SPT-5982](https://app.qase.io/case/SPT-5982) (TC-24) | Web Public - Organizer Profile - Hide the disabled calendar entry | 474 | public, organizer, events | None | 2 |
> | Updated [SPT-470](https://app.qase.io/case/SPT-470) | Web Public - Products - Read the complete formatted description | 47 | public, products, appearance | None | 5 |
> | Updated [SPT-474](https://app.qase.io/case/SPT-474) | Web Public - Products - Use product controls with keyboard and screen reader | 47 | public, products, appearance | None | 6 |
> | Created [SPT-5983](https://app.qase.io/case/SPT-5983) (TC-13) | Web Public - Products - Recover from an empty search and switch categories | 47 | public, products, search-filters | None | 4 |
> | Created [SPT-5984](https://app.qase.io/case/SPT-5984) (TC-14) | Web Public - Products - Load all matching products without mixing categories | 47 | public, products, search-filters | ProductList: AllProducts, MatchingSearch | 3 |
> | Created [SPT-5985](https://app.qase.io/case/SPT-5985) (TC-15) | Web Public - Products - Keep option quantities separate after reload | 47 | public, products, basket | None | 5 |
> | Created [SPT-5986](https://app.qase.io/case/SPT-5986) (TC-16) | Web Public - Products - Reject a quantity above available inventory | 47 | public, products, edge-case | None | 3 |
> | Created [SPT-5987](https://app.qase.io/case/SPT-5987) (TC-23) | Web Public - Products - Open a shared product link in its category | 47 | public, products, search-filters | SharedLink: MatchingProduct, NoMatchingProduct | 3 |
> | Updated [SPT-557](https://app.qase.io/case/SPT-557) | Web Public - Gift Cards - Open gift cards from the organizer profile | 55 | public, organizer, credits | None | 3 |
> | Updated [SPT-558](https://app.qase.io/case/SPT-558) | Web Public - Gift Cards - Display saved denomination choices | 55 | public, credits, appearance | None | 4 |
> | Updated [SPT-559](https://app.qase.io/case/SPT-559) | Web Public - Gift Cards - Reject missing or invalid recipient details | 55 | public, credits, edge-case | InvalidField: SenderName, RecipientName, RecipientEmail, EmailFormat | 4 |
> | Updated [SPT-562](https://app.qase.io/case/SPT-562) | Web Public - Gift Cards - Purchase a card for future delivery | 55 | public, credits, purchases | None | 6 |
> | Updated [SPT-563](https://app.qase.io/case/SPT-563) | Web Public - Gift Cards - Remove one recipient without changing another | 55 | public, credits, basket | None | 5 |
> | Created [SPT-5988](https://app.qase.io/case/SPT-5988) (TC-17) | Web Public - Gift Cards - Return from Review without losing details | 55 | public, credits, basket | ReturnControl: Back, Cancel | 3 |
> | Created [SPT-5989](https://app.qase.io/case/SPT-5989) (TC-18) | Web Public - Gift Cards - Limit the custom message to 150 characters | 55 | public, credits, edge-case | None | 4 |
> | Created [SPT-5990](https://app.qase.io/case/SPT-5990) (TC-19) | Web Public - Gift Cards - Reset friend details when choosing For Me | 55 | public, credits, edge-case | None | 4 |
> | Created [SPT-5991](https://app.qase.io/case/SPT-5991) (TC-20) | Web Public - Gift Cards - Show no gift-card form when none are offered | 55 | public, organizer, credits | GiftCardAvailability: Disabled, EnabledWithoutCards | 2 |
>
> **Verification:** all 35 operations succeeded. The maintained apply path verified the 11 updated cases’ selected fields. A separate read-only dry run compared all 24 new cases with their approved payloads: Title, Description, Preconditions, Postconditions, Tags, Steps, parameters and suite matched with no changes needed. All 15 intended Single parameters retained their exact names and values; SPT-3496’s existing grouped Platform/View parameter was preserved. Suite membership and step counts matched all 35 cases (123 steps). Existing priority, type, behavior and layer values were unchanged. Publication is not test execution.
>
> **Publication cleanup:** the six temporary plan, preview, result, receipt and read-back files were removed after successful reconciliation. The complete saved case content, ID mapping and verification outcome remain here.
>
> ## Coverage decisions and preservation
>
> **The coverage column below records the pre-publication baseline, not current test results.** The decisions were implemented by the 35-case publication above; former TC labels refer to that table’s assigned SPT IDs. Remaining checks and deferred scope still apply. Full means the reviewed definition states the named proof; Partial means some setup or assertions are missing; None means no focused definition was found in the reviewed suite and related-content search; Unknown means a conflicting or inaccessible fact prevents a conclusion. Every published case remains **Not run / Manual-only** in this request. No claim is made that 35 saved cases prove every combination.
>
> | Proof target | Coverage before publication | Applied decision and remaining work |
> | --- | --- | --- |
> | Event → correct organizer; public identity | Partial — SPT-355 | Enhance SPT-355; add TC-1 for image fallbacks. Verify both desktop/mobile in the intended deployed build. |
> | About, social links, weekly hours | None focused on public rendering; SPT-5444 checks saved Profile fields only | New TC-2–4. Blank About needs no toggle; schedule exceptions are not asserted as weekly-hours output. |
> | Direct/old links, unknown/disabled Organization | None focused | New TC-5–6. Private/test Organization is not the same as disabled: direct known links are supported for private/test Venues. |
> | Empty catalog and conditional tabs | Partial — SPT-557 only covers enabled gift cards | New TC-7, TC-20; SPT-557 enhancement. Membership tab is absent with no returned groups; empty categories are removed after their products load. |
> | Help, successful contact and receipt | Partial — SPT-354; SPT-3305 explicitly excludes organizer profiles | Enhance SPT-354; TC-8–9 separate invalid input and cancellation. Actual email delivery remains blocked until a controlled inbox and permitted alert destination are available. |
> | Event list, loading more, ongoing/ended/hidden records and card handoff | Partial — SPT-3496 | Enhance with mandatory six-item setup and known exclusion controls; TC-10 adds parent/child Organization separation; TC-22 adds timezone, multi-day and recurring-parent display. |
> | Calendar access, hidden calendar Events, date navigation | Partial — SPT-3497 | Enhance SPT-3497; new TC-24 covers disabled entry. Detailed ticket/calendar filters and reservation flows stay with calendar cases; opening a calendar is not purchase proof. |
> | Membership list and paging | Partial — SPT-437 begins at membership detail; SPT-5036 checks public/seller visibility | New TC-11 proves organizer-list browsing and handoff. Keep SPT-437/5036; do not duplicate their detail, level eligibility or seller checks. |
> | Event/membership price display | None focused on this list | TC-21 adds base/all-in/hidden price checks. Zero, equal-price and range samples are explicit; purchase and saved fee allocation remain separate. |
> | Product description and accessibility | Partial — SPT-470/474 | Enhance both; correct shifted screen-reader/image/contrast expectations. Keyboard, screen-reader and contrast checks require manual execution. |
> | Product matching search | Partial — SPT-3280 is cross-platform but lacks an exact organizer entry; Playwright has a matching-name assertion | Keep SPT-3280's other platforms. New TC-13 tests empty-result recovery/category switching, TC-14 tests paging, TC-23 tests copied product links. These have different outcomes from basic name matching. |
> | Product quantity, option isolation, reload and rejection | Partial — SPT-465 and Playwright cover add/purchase, not every local transition | New TC-15–16. Empty categories, hidden/non-public products and ended-sale products require the backend visibility cases plus an organizer run; sale cutoff depends on global enable_product_sales_end_time. |
> | Catalog tab reload/deep links | None focused | TC-12 and TC-23. Test all listed optional-tab setups; do not count clicking a tab as proof of a direct link. |
> | Gift-card form, options, required fields | Partial — SPT-558/559 | Enhance with exact labels and errors; split message limit to TC-18. No custom-amount control exists in the inspected form. |
> | Gift-card Review return, mode switch and recipient removal | Partial — SPT-563 only covers removal | Enhance SPT-563; TC-17/19 cover return/reset separately. Last-recipient removal and empty submission need an agreed expected outcome; see limits below. |
> | Future gift-card schedule | Partial — SPT-562 has shifted/missing expectations; SPT-3344 covers delivery timing | Enhance SPT-562 while preserving successful purchase and saved schedule. Actual future delivery remains with SPT-3344 and a controlled clock/worker/inbox check; no job was triggered. |
> | Clean paid purchases from this page | Partial — reviewed SPT-3287/3288 (single/recurring tickets), SPT-1170 (memberships), SPT-465 (products), SPT-3344/3345 (friend/self gift cards) | Reuse existing WebPublic rows, starting from this profile’s actual card/tab. Keep every existing processor, customer, device and fulfillment variation in its original case. Record one charge, order, intended items, stock change, usable fulfillment and independently calculated total. None executed. |
> | Duplicate payment, overselling, failure/recovery, fee earnings | Partial — SPT-4935 covers gift-card reservation/release; SPT-5038 covers membership cancellation/decline and retry | Keep those cases; their assertions do not prove every item type or provider callback. End-to-end product last-unit contention, lost payment response, repeated submission/callback, saved service-fee allocation and final reporting remain Deferred pending scoped backend/provider proof. TC-16 is single-session quantity rejection, not a race test. |
> | Queue-it direct/return/history/failure/cleanup | Partial for `/o/`; nine existing definitions concern newer/shared consumers | Preserve SPT-5897–5905 below. Legacy template flag inclusion is source-tested; real waiting-room behavior on the target host is unexecuted and requires published nonproduction rules. |
> | Failure/loading, slow responses, security and accessibility beyond product cards | Unknown/Partial | Deferred: interrupted catalog requests, CAPTCHA rejection/throttling, foreign-link/HTML contact rejection, narrow-screen dialog focus, page-wide keyboard/screen-reader pass, French wording, privacy/cache behavior and >100 product categories. These need controlled faults, exact expected responses or manual/device evidence. |
>
> ### Existing cases — what stays and what changes
>
> Before publication, all 20 suite/descendant definitions were fully read, including Description, Preconditions, Postconditions, tags, steps, suite and both parameter representations. **SPT-3496** had a grouped WebPublic Desktop/Mobile parameter; it and both views in the Description were preserved. The other 19 initially had no stored parameters. The table below retains the original step counts as the review baseline; the publication table gives verified saved counts and parameters. Only the approved fields were submitted for updates; existing IDs, suites and unrelated metadata were preserved.
>
> | Existing cases | Original suite / steps | Applied change or preserved purpose |
> | --- | --- | --- |
> | [SPT-355](https://app.qase.io/case/SPT-355) | 465 / 5 | Enhance event-to-organizer navigation, identity and reload; remove empty “click registered” assertions. |
> | [SPT-354](https://app.qase.io/case/SPT-354) | 465 / 5 | Preserve valid send, CAPTCHA-enabled/disabled context and received-message proof; supply exact fields, Event Name, reason and success text. Network CAPTCHA observation remains an optional engineering check, not the manual success criterion. |
> | [SPT-3496](https://app.qase.io/case/SPT-3496) | 474 / 7 | Preserve both views, cards, paging, exclusions and detail handoff; require enough records to exercise paging. |
> | [SPT-3497](https://app.qase.io/case/SPT-3497) | 474 / 7 | Preserve calendar opening, visible/hidden Event comparison, date navigation and destination identity. |
> | [SPT-470](https://app.qase.io/case/SPT-470) | 47 / 7 | Preserve full description, paragraphs, bold/italic, lists and hyperlinks; use the actual More Info control. |
> | [SPT-474](https://app.qase.io/case/SPT-474) | 47 / 7 | Preserve keyboard/focus, screen-reader labels, alt text and contrast; align each expected result with its action and include reachable Checkout. |
> | [SPT-557](https://app.qase.io/case/SPT-557) | 55 / 3 | Preserve enabled tab/form access; add organizer identity and reload. |
> | [SPT-558](https://app.qase.io/case/SPT-558) | 55 / 5 | Preserve form and all configured denominations; distinguish value from purchase price. Its conditional Custom Amount assertion conflicts with current source and is retained as an unresolved scope correction below. |
> | [SPT-559](https://app.qase.io/case/SPT-559) | 55 / 5 | Separate invalid identity fields from clean purchase. Preserve correction/recovery; message-length proof moves to TC-18. Custom-amount bounds are unresolved; client validation is not server-validation proof. |
> | [SPT-562](https://app.qase.io/case/SPT-562) | 55 / 5 | Preserve future date, completed purchase, saved schedule and no immediate email. Fix mismatched Expected cells; actual later delivery was already excluded by this case. |
> | [SPT-563](https://app.qase.io/case/SPT-563) | 55 / 6 | Preserve removing recipient 1, retaining recipient 2, and adding only recipient 2; strengthen differing details and basket cleanup. |
> | [SPT-5897](https://app.qase.io/case/SPT-5897) | 465 / 1 Gherkin block | Keep API Boolean true/false, omitted-field compatibility and deployed consumer checks. Technical contract case; not a regular customer walkthrough. |
> | [SPT-5898](https://app.qase.io/case/SPT-5898) | 465 / 4 | Keep protected direct entry, queue admission/return and valid-admission reuse. Requires actual matching test-host rules. |
> | [SPT-5899](https://app.qase.io/case/SPT-5899) | 465 / 4 | Keep unprotected → first protected client navigation and return without inherited protection. Harness needed if no real link supplies the transition. |
> | [SPT-5900](https://app.qase.io/case/SPT-5900) | 465 / 5 | Keep organizer → protected Event A → Event B, history and admission reuse. Explicitly starts at `/org/new/`, not the legacy `/o/` page. |
> | [SPT-5901](https://app.qase.io/case/SPT-5901) | 465 / 5 | Keep history, route replacement and hash changes with fresh/admitted sessions; requires the navigation harness. |
> | [SPT-5902](https://app.qase.io/case/SPT-5902) | 465 / 5 | Keep delayed client/config readiness, latest protected destination and leaving to an unprotected page. Requires controlled response delays. |
> | [SPT-5903](https://app.qase.io/case/SPT-5903) | 465 / 5 | Keep separate script/config failure, 15-second readiness timeout, exception and later navigation recovery. No claim of server enforcement or fail-closed protection. |
> | [SPT-5904](https://app.qase.io/case/SPT-5904) | 465 / 5 | Keep multiple consumers, retained mounts, unmount/remount, listener cleanup and no duplicate application checks. Requires instrumentation; vendor automatic checks are distinct. |
> | [SPT-5905](https://app.qase.io/case/SPT-5905) | 465 / 5 | Keep existing Event and website consumer regressions, eligibility, admission and config-request behavior; these shared consumers are outside the base organizer walkthrough. |
>
> No existing cases were deleted. Tags in the 35 published cases follow the vault’s approved list. The nine Queue-it cases and their metadata were unchanged. The user approved the exact batch, including the tag/parameter changes and the unsupported Custom Amount correction described above.
>
> ### Source conflicts and execution limits
>
> * **Page version:** local backend routes `/o/{slug}/` to the Angular template; Next.js defines `/org/new/{venueSlug}/`. No deployment redirect was verified. The gift-card tab in the legacy page embeds the Next.js purchase form. Queue-it tests on the new route do not establish complete legacy-page coverage. A future migration must preserve every business function above through visible links, not only direct URLs.
> * **Unsupported gift-card instructions:** The original SPT-558/559 mentioned Custom Amount, but the inspected embedded form offers saved Options only. The approved replacements removed those unsupported conditional instructions. Custom-amount support on another page/version remains unresolved. SPT-559’s message-limit check was preserved separately as SPT-5989 (formerly TC-18).
> * **Contact OFF is not established protection:** the FAQ’s Send Message To Organizer button is conditional, but the Contact Organizer tab is rendered unconditionally and the inspected submission service does not itself test `allow_messages_from_customers`. This is a **Product-expectation question**, not a confirmed bug. Do not claim the OFF state prevents all messages; verify the intended rule and full server path before writing a denied-send expectation. Rejected server submissions may also emit support alerts.
> * **TBD wording:** [SPT-5959](https://app.qase.io/case/SPT-5959) expects current custom date/time wording across organizer/discovery listings. The inspected legacy organizer template still prints literal TBD and normal start/end formatting. Preserve that existing regression expectation; deployment behavior and the intended legacy migration scope need checking. No live defect is claimed.
> * **Tab indexing:** the legacy controller computes the Gift Cards direct-link index using the optional-tab offset. TC-12/SPT-557 deliberately check reload with/without memberships; this is an unexecuted source risk, not a reproduced bug.
> * **Readiness:** no environment, Organization, flags, payment account, delivery schedule access or inbox was confirmed by the user or inspected live. Before any later scenario mutation, confirm exact required settings with the user, then verify the environment/Organization through the authorized Dashboard. Admin reads and changes need separate permission. Source field locations are preparation guidance only.
> * **Execution boundaries:** no browser or desktop app was opened; no relevant in-app session was verified. UI labels are source-backed, not observed on a deployed build. No messages, orders, reservations, refunds, queue rules or scheduled jobs were changed. All manual cases and cited automated assertions are unrun in this request. Native apps, terminals and physical scanning/printing are not applicable to this page-only review; mobile web must still be checked on a real supported device before device confidence is claimed.
>
> ## Evidence and local verification
>
> **Qase completeness:** the installed `qasectl --help` / `qasectl testops --help` exposed no case/suite reads. Used the maintained `collect-release-coverage.mjs` read-only paginated API path. Snapshot: **SPT, 2026-11-12 11:01:44 MST (18:01:44 UTC), 2,423 unique cases, complete**. Suite listing: **382 unique suites, complete**; the API ignored `parent_id`, so all pages were read and descendants filtered locally. Counts reported/retrieved/fully reviewed: **465: 11/11/11; 47: 2/2/2; 55: 5/5/5; 474: 2/2/2**. No unread in-scope IDs or fields. The pasted `orga` search filter was not used to exclude cases.
>
> Related-content searches covered titles, descriptions, prerequisites, steps, tags and parameters for organizer/organization profile/page, `/o/`, gift cards, product search/cart/purchase, contact/help, Read More, hours and sub-organization events. Full relevant definitions reviewed outside the suite: **SPT-437, 465, 3280, 3305, 3344, 3345, 4935, 5036, 5038, 5444, 5959**; purchase-case content and supported rows were also inspected for **SPT-1170, 3287, 3288**. A title match alone was not counted as Full. Run results were not fetched; current execution is **Unknown**, and execution during this request is **Not run**.
>
> **Source revisions:** backend `develop` at `d5db66b224258bfff78d32898fff55c377ba9688`; frontend `develop` at `2821f0cd79425d13395861874ae8776862fe82da`; Playwright `add-check-for-internal-showpass-AW` at `6a1deef3d898dd9a605f76633035c66f99af3612`. This was a page review, not a branch-diff review. No checkout, pull or source edits occurred. Two pre-existing frontend Jumbotron edits were unrelated and left untouched; pre-existing vault changes were also preserved.
>
> | Evidence | Behavior established by source inspection |
> | --- | --- |
> | [Backend routes](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/front/urls.py>) and [view](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/front/views.py>) | Legacy aliases, lowercase slug lookup, disabled Venue rejection and template owner. |
> | [Profile shell](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/front/venues/venues/__base.html>) and [page template](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/front/venues/venues/detail.html>) | Identity, image fallbacks, About, calendar, links/hours, empty states, Events/Memberships/Gift Cards/categories and responsive presentation. |
> | [Profile controller](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/front/venues/detail.js>) and [price formatting](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/tickets/utils.js>) | Five-item loading, 100-word About threshold, tab/deep-link selection, child Events, search/reset, cart refresh, 100-category fetch limit, price flag/all-in treatment. |
> | [Public Events](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/public/viewsets/events.py>), [Event filtering](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/public/filters/events.py>), [Products](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/inventory/api/public/viewsets.py>), [product selection](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/inventory/managers/products.py>), [Memberships](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/memberships/api/public/viewsets.py>) | Public-list eligibility, ongoing-until-end semantics, parent-only Event listing, product discovery scope/sale flag and published membership groups/levels. These APIs also serve other clients; public-page proof does not certify all consumers. |
> | [Contact fields](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/front/tickets/events/_contact-tab.html>), [FAQ](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/front/tickets/events/_faq-tab.html>), [public Venue API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/public/viewsets.py>), [validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/public/serializers.py>), [submission](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/services/support/support_inquiry_submission.py>) | Contact fields/limits, CAPTCHA invocation, support email task, URL/HTML restrictions, throttling and alert side effects. |
> | [Embedded gift-card form](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/organisms/gift-cards/GiftCardPurchaseForm.tsx>) and [recipient fields](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/components/molecules/gift-cards/GiftCardRecipientField.tsx>) | Fixed Options, 1–20 quantities, A Friend/For Me reset, Review/Cancel/Back, exact required errors, 150-character message, date picker and removal. Add to Cart is not purchase completion. |
> | [New organizer route](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/next-app/page-components/org-profile/OrganizerProfileRoute.tsx>), [Queue-it consumer](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/org-profile/ui/pages/OrganizerProfileRouteContent.web.tsx>), [shared queue navigation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/queue-it/utils/queue-it-navigation.ts>) | Separate new route, strict true protection check and 15-second shared readiness bound; preserve existing specialized tests. |
>
> **Existing automated assertions, not executed:** [OrganizerDetailsPage](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/organizer-detail/OrganizerDetailsPage.ts>) asserts one matching product/name result, a visible quantity menu, the add success toast and checkout navigation. Its [product purchase caller before the suite refactor](https://github.com/showpass/showpass-playwright/blob/12b00b17dbfcb67171fbeb95fba1882608763275/tests/core/checkout/products/checkout-products.test.ts) chooses the organizer entry, adds quantity 5 and delegates payment/total/item checks to the shared checkout flow. This is useful existing interaction/purchase coverage; it does not prove all search/reset, tab, inventory-race or fee-earnings outcomes. Extend those existing patterns rather than creating a competing framework. [Angular unit tests](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/tests/front/venues/public-venue-detail-specs.js>) check search state/reset/query-ID setup; [Django tests](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/tests/test_views.py>) check canonical language links and Queue-it script inclusion. None proves live queue admission or delivered orders by itself.
>
> Applied [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]], [[06 Prompts/Showpass Qase Gap Analysis]], [[05 Tooling/qasectl]], and the handbook’s Venue/client setup, senior integration passes and automation strategy. Related saved-configuration coverage remains in [[03 Test Cases/Organizations/organization-settings-qase-test-cases]].
>
> **Local verification:** the maintained Qase Markdown parser read all **35 cases / 123 step rows**, with required fields, nonempty expected results, 1–3 approved tags, Platform/View tables and mappings for every value in all **15 parameterized cases**. This initial check was offline; the subsequent Qase dry run, publication and read-back verification are recorded above. No product test was run. Local source links were checked for existing targets.
>
> **Cleanup:** removed and verified all eight task-created temporary Qase downloads/build scripts under `/private/tmp`. The durable findings, reviewed counts, preservation decisions and source references remain in this note. No temporary exports or generated binaries were added to the vault.
