---
title: Event — Branding
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Branding

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Shared suite reference

Event-specific SPT-4126/4128 are below, in Branding (1050). Refer to [shared Branding — suite 744](https://app.qase.io/project/SPT?suite=744) for initial venue setup, fallback, fonts and wallet branding (SPT-4124/4125/4127/4335/4742). Do not move organization-level cases into Events.

**Blocked for native destination parity:** the current event page registration is RoutePlaceholderPage. Once connected, execute event override, recurring-child inheritance, clear-to-venue-fallback and preview checks; never treat a venue preview as proof of the event override.

Source: [page registration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/events-detail-config.ts>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-4126: Dashboard - Branding - Verify single event email branding overrides venue branding

**Description:**

Verifies that event-specific email branding overrides venue branding for configured fields while unset fields inherit safely.

**Preconditions:**

Organizer can manage venue and event branding. Venue branding is configured with distinctive values. A single event exists. A mailbox is available.

**Postconditions:**

Restore branding values after execution if needed.

**Tags:** branding, dashboard, email

**Parameters:**

BrandingAttribute: Logo, HeaderImage, PrimaryColor, ColorMode, LayoutPreset, HeadingFont, BodyFont, SecondaryColor

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Configure venue-level email branding with distinct default values. |  | Venue branding is saved and available as fallback. |
| Configure a single event with one or more event-specific branding overrides while leaving at least one branding field unset. |  | Event branding overrides are saved and unset fields remain inherited. |
| Send an email preview or complete a purchase for the event. |  | The email is sent successfully. |
| Inspect overridden and non-overridden branding fields in the rendered email. |  | Overridden fields use the event-specific branding; unset fields fall back to venue branding or system defaults without broken layout. |

### SPT-4128: Dashboard - Branding - Verify recurring child event branding inheritance

**Description:**

This test validates the hierarchical logic used to resolve branding assets (such as logos and header images) within emails sent for child events. It ensures that the system correctly prioritizes overrides at the child level, falls back to the parent event or venue when necessary, and ultimately uses system defaults if no overrides exist.

**Preconditions:**

* The user is logged in as an Organizer or Admin with permissions to manage events and venue settings.
* A Venue is created with optional branding configurations.
* A Parent Event is created.
* A Child Event is linked to the Parent Event.

**Postconditions:**

Any event-level or child-event branding overrides used during the test are removed or restored after validation.

**Tags:** branding, dashboard, events

**Parameters:**

InheritanceLevel: ChildOverride, ParentInheritance, VenueInheritance, SystemDefault

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Configure the branding assets for the Venue, Parent Event, and Child Event based on the \`InheritanceLevel\` parameter. | **ChildOverride**: Set Parent Logo to \`ParentLogo\` and Child Logo to \`ChildLogo\`.<br><br><br><br>**ParentInheritance**: Set Parent Header to \`ParentHeader\`; leave Child Header empty.<br><br>**VenueInheritance**: Set Venue Header to \`VenueHeader\`; leave Parent and Child Headers empty.<br><br>**SystemDefault**: Leave Venue, Parent, and Child branding configurations empty. | The configurations are saved successfully in the dashboard. |
| Trigger an email notification for the Child Event (e.g., by completing a registration or purchase). |  | The system processes the email request for the specific child event. |
| Open and inspect the rendered email. |  | The branding asset is resolved correctly based on the parameter:<br><br>- **ChildOverride**: Logo is \`ChildLogo\`.<br>- **ParentInheritance**: Header is \`ParentHeader\`.<br>- **VenueInheritance**: Header is \`VenueHeader\`.<br><br>* **SystemDefault**: Header is the standard Showpass system default. |

