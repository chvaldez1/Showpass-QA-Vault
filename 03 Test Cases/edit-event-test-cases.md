# Edit Event Test Cases

## Sources Reviewed

- User request for `/dashboard/events/{slug}/manage/#/edit`.
- `06 Prompts/Showpass QA Test Case Generator.md`
- `05 Tooling/Qase Test Case Writing Rules.md`
- `01 Repositories/Backend - web-app.md`
- `01 Repositories/Frontend - showpass-frontend.md`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/config/dynamic-routes.js:21`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/manage/edit.html:1`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html:1`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/EventManage.js:16`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/EventCreate.js:1080`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/viewsets.py:576`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/serializers.py:1474`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/event_management/event.py:704`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/constants/legacy-angular-routes.ts:14`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/ui/components/EventsCard.web.tsx:120`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/hooks/useEventCardPermissions.ts:21`
- `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/docs/plans/feature-specs/FEATURE_SPEC_events.md:249`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/domains/events_and_ticket_types.md`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/template_events_bulk_generation.md`

## Assumptions and Unknowns

- Qase was not queried because this is a generation task and the request explicitly says not to perform a Qase gap analysis.
- Dashboard is the product surface under test. The current Qase platform list does not include a dashboard-specific platform, so these drafts use `Web Dashboard` in the Platform / View table.
- These cases assume a dashboard user with organization access, event ownership where required, and the `VP_MANAGE_EVENTS` permission.
- Exact enum labels for visibility, ticket requirement, sale-end defaults, and event status should be selected from the test environment.
- Public event, checkout, ticket PDF, and Box Office verification should use test-safe events and test-safe payment setup.

## Source-backed Behavior

- The legacy Angular route registers an `edit` state at hash URL `/edit` under `/dashboard/events/{slug}/manage/`.
- The edit page loads `EditEventController`, displays `Edit Event`, includes the shared event create/edit form, and hides editing while `event.save_pending` is true.
- The React events list links to `/dashboard/events/{slug}/manage/#/edit` only when `eventAccess.event_owner` is true.
- Backend event writes require manage-events permissions, reject refunded events, reject events still being generated, and may return an async job id for ordinary event updates.
- Publishing from draft requires non-default event name, location, and slug; category and other required form fields are enforced before save.
- Recurring parents, recurring children, and template events have different ownership rules: parent edits can propagate eligible fields to children, child edits are restricted, and template status cannot be changed to or from template after creation.
- Recurring parent deletion is blocked when child events exist; sold events are protected from deletion.

## Risk Areas

- Event edits can change public event details, checkout behavior, ticket inventory, ticket visibility, customer information collection, legal terms, fees, and publishability.
- Single events, recurring parents, recurring children, and template events use overlapping UI but different backend rules.
- Timezone, start/end time, TBD display, and payment-plan restrictions can create date drift or invalid sellable states.
- Ticket type edits affect inventory, price, visibility, waitlists, passwords, and downstream checkout.
- Save-pending and async update states can hide editable controls or defer persistence.
- Slug changes can break existing links if the warning is missed.

## State-space / Setup Matrix

| Axis | Values | Why it matters |
| --- | --- | --- |
| EventType | SingleEvent, RecurringParent, RecurringChild, TemplateEvent | The edit page shows or restricts different fields based on parent, child, recurring, and template state. |
| EventStatus | Draft, Active, Cancelled, Refunded, Template | Save, publish, visibility, delete, and update behavior differs by status. |
| Permission | EventOwnerWithManageEvents, NonOwnerWithStatsOnly, EmployeeWithoutManageEvents | UI access and backend write access depend on ownership and permissions. |
| TicketSetup | OneTicketType, MultipleTicketTypes, NoTicketTypes, WaitlistTicket, SoldTicketType, PaymentPlanTicketType | Inventory, price, sale windows, low inventory, and payment-plan validations differ. |
| ScheduleSetup | SameDaySingleEvent, TBDDate, DoorsOpen, RecurringCustomSchedule, TemplateTimeslots | Date/time controls and backend validation differ. |
| OptionalModules | Financials, Accommodations, GoogleThingsToDo, ArtistGenreTagging, WaitlistUI | Some sections render only when venue permissions, modules, or flags are enabled. |

## Recommended Test Data

- One active single event owned by the test venue with at least two ticket types and no sales.
- One active single event with existing sales for inventory and price-change guardrails.
- One draft event with default draft name, default draft location, and draft slug.
- One recurring parent event with at least two child events and child ticket types.
- One recurring child event reached from its child event edit link.
- One template event and, if available, a generated event created from that template.
- One event with payment plan ticket types.
- One event with waitlist enabled on at least one ticket type.
- One dashboard employee with `VP_MANAGE_EVENTS` and event ownership, one employee with view/stat access only, and one employee without manage-events access.

## Qase-ready Manual Test Cases

### TC-1: Dashboard - Edit Event - Verify an event owner can open the legacy edit page

Description:
Validates that an event owner can reach the legacy Edit Event page from the dashboard events list and that the page loads the editable event form.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is owned by the active venue and has a valid slug.

Postconditions:
- None.

Tags: dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the dashboard events list. | `/dashboard/events/` | The events list displays the owned event. |
| Select the edit action for the event. | Event slug | The browser navigates to `/dashboard/events/{slug}/manage/#/edit`. |
| Wait for the page to finish loading. | None | The page displays `Edit Event`, the event status control, and editable form sections. |
| Confirm core sections are available. | Basic Info, Location & Info, Event Date & Time, Ticket Types | The dashboard user can review and edit the page as a whole. |

### TC-2: Dashboard - Edit Event - Verify basic information saves for a single event

Description:
Validates that a dashboard user can update public-facing event metadata for a single event without affecting unrelated ticket setup.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a non-recurring single event owned by the active venue.
- Event has at least one ticket type.

Postconditions:
- Restore the original name, subtitle, slug, category, visibility, and images if the event is shared.

Tags: dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event edit page. | `/dashboard/events/{slug}/manage/#/edit` | The existing event name, subtitle, slug, description, categories, visibility, and images are loaded. |
| Update basic details. | Name, subtitle, description, up to three categories, tags | The changed values remain visible in the form. |
| Upload or replace supported event images. | Banner image under 3 MB and square image under 3 MB | Image crop or preview controls complete without a size error. |
| Change the event slug. | New unique slug | The page shows the existing-link warning for the changed URL. |
| Save the event. | None | A success message appears and the event remains editable or redirects according to save behavior. |
| Reopen the edit page using the current slug. | Updated slug | Saved basic information is displayed. |
| Open the public event preview or public event page. | Updated slug | Public-facing title, description, images, category-driven display, and visibility match the saved event setup. |

### TC-3: Dashboard - Edit Event - Verify required field validation blocks invalid publish or save

Description:
Validates that required event fields and publish guardrails prevent an incomplete event from becoming active.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a draft event that still has one or more default draft values.

Postconditions:
- Leave the event in draft unless it is intentionally published during a test run.

Tags: dashboard, edit-event, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the draft event edit page. | Draft event slug | The edit form loads with draft event values. |
| Clear or leave required publish fields incomplete. | Missing event name, category, location, slug, or ticket name | The form marks invalid fields when publish is attempted. |
| Attempt to publish the event. | Publish action | The page blocks publishing and shows validation or publish errors. |
| Fix the required fields. | Non-default name, valid location, valid slug, category, required ticket fields | The invalid-field messaging clears after valid values are entered. |
| Save or publish again. | Publish action, if intended | The event is saved only when required fields are valid. |

### TC-4: Dashboard - Edit Event - Verify visibility and calendar display persist

Description:
Validates event visibility and calendar display controls that affect public discovery and calendar widgets.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a single event or recurring parent event owned by the active venue.
- Event is not a recurring child event.

Postconditions:
- Restore original visibility and calendar display settings if needed.

Tags: dashboard, edit-event, event

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the edit page. | Event slug | The Visibility selector and Display on Calendar Widget control are available. |
| Change the event visibility. | A different supported visibility value | The selected visibility remains in the field before save. |
| Toggle Display on Calendar Widget. | On or Off | The selected calendar display state remains in the form before save. |
| Save the event. | None | The save completes without validation errors. |
| Reopen the edit page. | Event slug | The visibility and calendar display values match the saved choices. |
| Check the public surface appropriate to the selected visibility. | Public event page or calendar widget | Event discoverability matches the selected visibility and calendar setting. |

### TC-5: Dashboard - Edit Event - Verify date, time, timezone, and TBD behavior

Description:
Validates date and time edits for a single event, including timezone-sensitive display and date-to-be-determined behavior.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a single event without recurring children.
- Use a separate payment-plan event for the payment-plan warning check.

Postconditions:
- Restore original date, time, timezone, doors-open, and TBD settings if needed.

Tags: dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event edit page. | Single event slug | Timezone, Event Starts, Event Ends, and optional Doors Open controls are displayed. |
| Change the timezone and start/end time. | Different valid timezone and future same-day times | The displayed dates and times update using the selected timezone. |
| Add or clear a doors-open time. | Doors open before event start | The doors-open value is accepted only when it is valid for the event schedule. |
| Enable display date and time as To Be Determined. | Toggle on | The form shows TBD enabled for the event. |
| Save and reopen the event. | None | The date, time, timezone, doors-open, and TBD settings persist. |
| Repeat the TBD check on an event with payment plans. | Payment-plan event | The page warns that TBD date changes are constrained by payment plan timing. |

### TC-6: Dashboard - Edit Event - Verify recurring parent event edits and propagation expectations

Description:
Validates that recurring parent edits expose recurring controls, warn about repeated settings, and preserve child-event behavior.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a recurring parent with at least two child events.
- Venue has recurring events enabled.

Postconditions:
- Restore any changed recurring parent and child event values.

Tags: dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the recurring parent edit page. | Parent event slug | The page displays recurring-event messaging and child event controls. |
| Review the Event Date & Time section. | None | The page labels the parent start as an occurrence start date and warns that changing the first occurrence shifts other occurrences. |
| Update a shared parent value. | Description, category, visibility, or order form setting | The shared value is accepted on the parent. |
| Save the recurring parent. | None | The save completes and the parent remains a recurring parent. |
| Review child events after save. | Child event list or child edit pages | Eligible child values update only when they are expected to inherit from the parent; child-specific dates remain child-owned. |
| Attempt to disable recurring while child events still exist, if the UI allows the action. | Repeat Event set to None | The backend prevents converting back to a normal event until child events are deleted. |

### TC-7: Dashboard - Edit Event - Verify recurring child event edit restrictions

Description:
Validates that a recurring child event can be edited only through child-owned fields and does not expose parent-owned controls.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a recurring child under an existing recurring parent.

Postconditions:
- Restore any changed child event date, time, visibility, or ticket values.

Tags: dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open a recurring child event edit page. | Child event slug | The edit page loads for the child occurrence. |
| Review Basic Info. | None | Parent-owned fields such as slug and description are hidden or unavailable where the child does not own them. |
| Update child-owned schedule values. | Child start/end date or time | The child occurrence accepts valid date/time updates. |
| Save the child event. | None | The child save completes and parent event details remain intact. |
| Reopen the parent event. | Parent slug | Parent-level metadata and sibling child occurrences are not unintentionally overwritten by the child edit. |

### TC-8: Dashboard - Edit Event - Verify template event editing stays template-specific

Description:
Validates that template events remain templates, show template-specific page text, and preserve template setup for later generation.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a template event.
- If available, template has child-template or ticket setup used for bulk generation.

Postconditions:
- Restore original template values if needed.

Tags: dashboard, edit-event, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the template edit page. | Template event slug | Header displays `Edit Event Template`; Event Date & Time section is shown as Event Time where applicable. |
| Update template-safe fields. | Name, description, ticket type, order form, or legal settings | The edited values remain visible before save. |
| Save the template. | None | The save completes and the event remains in Template status. |
| Attempt to change the template into a non-template event, if any control or API path exposes that action. | Active or Draft status | The change is rejected because template status cannot be changed to or from template on an existing event. |
| Generate or inspect a generated event from the template, if generation is in scope for the environment. | Generated event date | Generated event setup reflects template values without modifying the source template unexpectedly. |

### TC-9: Dashboard - Edit Event - Verify ticket type settings save and protect sold inventory

Description:
Validates ticket type edits on the event page, including inventory, price, visibility, no-ticket-type behavior, sale start time, and waitlist guardrails.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event has at least two ticket types.
- Include one event with no sales and one event with existing ticket sales or waitlist-enabled tickets.

Postconditions:
- Restore ticket type inventory, price, visibility, sale starts on, waitlist, and ticket requirement settings.

Tags: dashboard, edit-event, tickets

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the edit page for an event without ticket sales. | Event slug | Ticket Types section displays ticket name, inventory, price, visibility, and advanced controls. |
| Update a ticket type. | Name, inventory, price, visibility | The changed values are accepted before save. |
| Apply a shared Sale Starts On time. | Future sale start date/time | The page confirms that the sale start time is staged and requires saving the event. |
| Toggle Ticket Requirements to no ticket types, then restore ticket types. | Ticket requirement selector | No-ticket-type fields and ticket rows show or hide according to the selected requirement. |
| Save and reopen the event. | None | Ticket type changes persist. |
| Open an event with sold tickets or waitlist-enabled tickets. | Sold or waitlist event | Inventory or price controls show the expected disabled state or minimum limits, and save does not allow invalid reductions below existing sales or waitlist constraints. |

### TC-10: Dashboard - Edit Event - Verify order form, legal, and checkout-facing settings persist

Description:
Validates page-wide event settings that affect checkout, ticket PDFs, guest information collection, and post-purchase messaging.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Dashboard user is signed in with `VP_MANAGE_EVENTS`.
- Event is a single event or recurring parent with ticket types.
- Event has no active resale or waitlist setup for the multi-guest information check, unless testing the conflict.

Postconditions:
- Restore legal, order form, custom question, ticket PDF, and checkout messaging settings.

Tags: dashboard, edit-event, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the edit page and navigate to Legal Policies & Important Info. | Event slug | Refund policy, terms acceptance URL, restrictions, ticket PDF terms, and ticket PDF message fields are available where applicable. |
| Update legal and ticket PDF fields. | Refund policy, terms URL, restrictions, ticket PDF message | The field values remain visible and character-limit indicators update where shown. |
| Navigate to Order Form & Messaging. | None | Collection Method, Ticket Button Verbiage, post-purchase message, and guest information controls are available. |
| Update checkout-facing settings. | Collection method, per-ticket info toggle, box office info collection, post-purchase message | The selected values remain visible before save. |
| Add or edit a custom question. | Question title and selected ticket type permissions | The custom question appears in the order form builder. |
| Save and reopen the event. | None | Legal, PDF, order form, and custom question values persist. |
| Open checkout or Box Office for the event. | Public checkout or staff Box Office path | Guest information, terms acceptance, post-purchase copy, and ticket PDF messaging match the saved event setup. |

### TC-11: Dashboard - Edit Event - Verify permissions, save-pending, refunded, and delete guardrails

Description:
Validates guardrails that prevent unauthorized or unsafe event edits and deletions.

| Platform | View |
| --- | --- |
| Web Dashboard | Desktop |

Preconditions:
- Have one event owner with `VP_MANAGE_EVENTS`.
- Have one dashboard employee without event ownership or manage-events permission.
- Have one event in save-pending or async-save state if the environment can create it.
- Have one refunded event and one sold event if available.
- Have one recurring parent with child events.

Postconditions:
- Do not delete shared production-like test events.

Tags: dashboard, edit-event, employee-permissions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as an event owner and open the events list. | Owned event | The edit action is visible for the owned event. |
| Sign in as a non-owner or employee without manage-events permission. | Same event or accessible event list | The edit action is hidden or write access is denied. |
| Open an event while save is pending, if available. | Save-pending event | The page displays that previous changes are still being saved and editing is unavailable. |
| Attempt to update a refunded event, if available. | Refunded event | The update is rejected with a message that refunded events cannot be updated. |
| Attempt to delete a recurring parent with child events. | Recurring parent | Deletion is blocked because child events exist. |
| Attempt to delete an event with sales. | Sold event | Deletion is blocked because sales have already been made. |

## Minimum Execution Set

- TC-1: Dashboard - Edit Event - Verify an event owner can open the legacy edit page
- TC-2: Dashboard - Edit Event - Verify basic information saves for a single event
- TC-3: Dashboard - Edit Event - Verify required field validation blocks invalid publish or save
- TC-5: Dashboard - Edit Event - Verify date, time, timezone, and TBD behavior
- TC-6: Dashboard - Edit Event - Verify recurring parent event edits and propagation expectations
- TC-8: Dashboard - Edit Event - Verify template event editing stays template-specific
- TC-9: Dashboard - Edit Event - Verify ticket type settings save and protect sold inventory
- TC-11: Dashboard - Edit Event - Verify permissions, save-pending, refunded, and delete guardrails

## Suggested Automated Coverage

- Add a dashboard Playwright smoke that signs in as an event owner, opens `/dashboard/events/`, clicks `data-testid="edit-event-link"`, and verifies `/dashboard/events/{slug}/manage/#/edit` loads with `Edit Event` and key sections.
- Add an edit-save test for a disposable single event that updates name, visibility, timezone, and one ticket type, then reloads the edit page and asserts persistence.
- Add a validation test for a draft event that attempts publish with missing required fields and asserts invalid-field messaging.
- Add recurring-specific coverage for a parent event with two children to verify parent save does not overwrite child-specific dates unexpectedly.
- Add template-specific coverage that opens a template event edit page and asserts it remains Template after save.
- Keep deletion, payment-plan, sold-ticket inventory, and refunded-event guardrails as manual or API-assisted tests unless stable seeded fixtures exist.

## Open Questions

- Which exact Qase suite should these cases live under once they are reviewed?
- Should `Web Dashboard` be added to the Qase platform taxonomy, or should dashboard cases omit the platform field in Qase?
- Which optional venue modules should be mandatory for this standardized edit-event suite: financial settings, accommodations, Google Things to Do, waitlists, artist/genre tagging, and payment plans?
- Should template-event bulk generation be included in this page suite, or kept in a separate template generation suite?
