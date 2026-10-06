---
title: Event — Legal & important info
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Legal & important info

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Migration coverage

SPT-5111 is enhanced locally for the legal form; its transfer-limit responsibility is split into TC-12 under Advanced options. Restricted access remains in SPT-5075 and the child-page checks in SPT-5072. SPT-4878 owns missing/invalid terms URL and checkout acceptance. Refund policy is capped at 512 characters in the event model. Clearing a policy requires checking the organization default, not assuming customers see no policy. Restrictions are trimmed and deduplicated without changing other settings.

Sources: [event policy fields and terms validation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py>), [legal form normalization](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/legal/utils/event-legal-form.ts>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-5111: Dashboard - Legal Info - Save event policies and restrictions

**Description:** An employee saves the event's refund policy, terms link and restrictions, then confirms the information remains available to customers.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* The employee has Manage Events permission for an owned published single event with an on-sale public ticket.
* Record its refund policy, terms requirement, terms URL and restrictions.
* Have a terms page under your organization's control and record its URL; use an event created for testing, not one selling to real customers.

**Postconditions:** Empty any customer basket, restore the original legal settings, save and reopen the page. Do not complete payment.

**Tags:** dashboard, events, edit-event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event → Legal & important info. | | Refund Policy, the terms-acceptance choice, terms URL and Important Info & Restrictions are available. |
| Enter an event refund policy. | **Refund Policy:** Refund requests must be sent to the organizer before the event starts. | The policy is shown in the field. |
| Enable the requirement to accept terms and enter the terms link. | **URL:** recorded organization's terms page | The requirement is enabled and the full URL is retained. |
| Add a restriction. | **Restriction:** Bring photo identification. | The restriction appears once in the list. |
| Save the page. | | Saving succeeds. |
| Leave and reopen Legal & important info. | | The exact policy, enabled requirement, URL and restriction remain saved. |
| Open View Event and its event information. | | The saved refund policy and restriction appear for this event. |
| Start checkout for the event and open the terms link. | **Quantity:** 1 | Checkout requires acceptance and the link opens the configured terms page. |
| Return to Legal & important info and remove the added restriction. | **Restriction:** Bring photo identification. | Only that restriction is removed from the form. |
| Save and reopen the page. | | The removed restriction stays absent; the policy and terms settings remain unchanged. |


## Existing Qase coverage

| Case | Current Qase suite | Local handling |
| --- | --- | --- |
| [SPT-4878](https://app.qase.io/case/SPT-4878) | Order Form & Custom Questions (446) | Existing case preserved; migration notes below apply |

### SPT-4878: Dashboard - Order Form - Enforce one event-terms scenario

**Description:**

Validates one terms behavior per run so missing-URL validation, event overrides, and venue inheritance are not repeated together regardless of parameter.

| TermsScenario | Setup | Expected Result |
| --- | --- | --- |
| MissingUrlValidation | Require terms on; URL empty | Save is blocked because the URL is required. |
| EventOverride | Venue default off; event requirement on with unique valid URL | Event values persist and checkout requires acceptance. |
| VenueDefaultInheritance | New event at venue with default requirement and valid default URL | New event inherits the venue values and checkout requires acceptance. |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:** The organizer can edit events; a future event has a purchasable ticket; venue defaults can be controlled for the selected scenario.

**Postconditions:** Restore event and venue terms settings; release the basket.

**Tags:** dashboard, events, checkout

**Parameters:**

TermsScenario: MissingUrlValidation, EventOverride, VenueDefaultInheritance

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Prepare or open the event described by `TermsScenario`. | Selected table row | The event uses the intended event/venue baseline. |
| Apply only the scenario's terms setup. | Unique URL `https://example.com/qa-terms-<suffix>` when required | The form shows the selected requirement and URL source. |
| Save once. | None | Missing URL is rejected; valid override or inherited values save. |
| Leave and reopen **Order Form**. | Same event | Successful scenario values persist and show the intended event or venue source; rejected values were not partially saved. |
| For a valid scenario, start checkout and try to continue without accepting terms. | One ticket | The terms link is available and checkout is blocked until acceptance. |
| Accept terms and continue. | Acceptance checked | Checkout can proceed past the terms requirement. |
