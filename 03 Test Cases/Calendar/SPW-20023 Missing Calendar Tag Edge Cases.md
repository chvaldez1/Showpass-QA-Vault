---
title: SPW-20023 V2 SDK and WordPress Calendar Launch Coverage
status: review-ready
date: 2026-07-29
tags:
  - qa/test-cases
  - calendar
  - widget
  - spw-20023
  - spd-2515
---

# SPW-20023 V2 SDK and WordPress Calendar Launch Coverage

Related:

- [SPW-20023](https://showpass.atlassian.net/browse/SPW-20023)
- [SPD-2515](https://showpass.atlassian.net/browse/SPD-2515)
- [[00 Start Here/World-Class Software Quality Standard]]
- [[06 Prompts/Showpass QA Test Case Generator]]
- [[05 Tooling/Qase Test Case Writing Rules]]

> [!important] New calendar only
> Every manual case in this note runs with `sunset_legacy_calendar_sdk_and_components` enabled. Do not test the flag-off calendar, cached v1 SDK, deprecated calendar routes, or the legacy `[showpass_calendar]` WordPress shortcode here.

## Testing Intent

We are testing whether every currently documented JavaScript SDK and WordPress calendar launch opens the intended new calendar, carries its documented configuration, and keeps an exact event-tag or attraction scope; this matters because a partner website can otherwise show no calendar, the wrong venue or mode, duplicate events, or an event outside the requested scope.

| Field | Required Answer |
| --- | --- |
| Criticality bucket | Live sales completion |
| Business invariant | Every documented current launch creates exactly one calendar in the intended modal or container, for the intended venue and mode; Standard tag launches show the OR-union exactly once and Attraction launches stay on the requested parent. |
| User or business impact | Customers can see no calendar, the wrong venue, the wrong mode, duplicate events, or continue to tickets outside the intended scope. |
| Failure mode | SDK timing or container setup prevents launch, a WordPress shortcode drops a documented parameter, tags are omitted or duplicated, attraction routing uses the wrong identifier, or cached selection survives a scope change. |
| Observable proof | One intended modal/embed, exact environment/venue/container/mode, exact event names and IDs, correct language/theme when supplied, correct attraction parent, and matching ticket-selection handoff. |
| Source of truth | Current SDK and WordPress public guides, current SDK/WordPress source, V2 backend/frontend behavior, and the two supplied fix commits. |
| Primary surfaces | Partner websites using the current JavaScript SDK, WordPress pages using the current calendar shortcodes, V2 Widget calendar, public V2 calendar API, and Dashboard event editing. |
| Confidence | High for the SDK launch inventory and V2 Standard behavior; medium where the WordPress guide conflicts with checked-in shortcode implementation. |

## Scope

### In Scope

- Backend fix commit `2d038f9965df2f73cb12f8b6606604a2e229ee20`.
- Frontend fix commit `98e82bfd9dceb4f8aa9de4fbb445ce619308a66a`.
- Clean QA-owned Beta venues and events.
- `sunset_legacy_calendar_sdk_and_components` enabled for every tested venue.
- Direct V2 venue route: `/widget/calendar/venue/{VenueSlug}/`.
- Public V2 venue-calendar endpoint: `/api/public/venues/{VenueId}/calendar/?version=2`.
- Current SDK modal and current container-based embed:
  - `showpass.tickets.calendarWidget(venueId, params)`
  - `showpass.tickets.calendarWidget(venueId, params, containerId)`
- Current WordPress V2 shortcodes:
  - `[showpass_calendar_widget]`
  - `[showpass_embed_calendar]`
- SDK Standard modal and embedded launch.
- SDK Attraction modal and embedded launch.
- SDK already-ready, DOM-loading, DOM-ready, delayed-SDK retry, multiple-button, missing-venue, and missing-container launch states.
- SDK common parameters `theme-primary` and `lang`.
- SDK Attraction parameters `is_attraction`, event slug, `ticket-type-selection-required`, and `prompt-for-quantity`.
- Every current WordPress button/embed example documented for default launch, tags, label, class, French, attraction mode, and attraction event ID.
- One tag, two tags, one event matching both tags, duplicate tag tokens, tag order, multiword tags, filters, recurrence, tag changes, no-match state, simultaneous launches, cache isolation, and API input boundaries.

### Out of Scope

- Flag-off behavior.
- Cached v1 SDK behavior.
- Deprecated calendar redirect routes.
- Legacy WordPress `[showpass_calendar]`.
- Generic ticket-type, package, assigned-seating, checkout, analytics, responsive, and accessibility coverage already required by SPW-20023 when it does not change tag scope.
- Qase reads or writes.

## Jira Coverage Exclusion

SPW-20023 broadly exercises the new calendar, SDK, WordPress, filters, tickets, checkout, responsive behavior, accessibility, and cache behavior. It does not require tagged event data, a `tags` query, a two-tag union, an event matching both requested tags, or a tag change while V2 selection is already initialized.

The cases below therefore prove only tag-specific states that can pass every generic SPW-20023 instruction while the regression still exists.

## Sources Reviewed

| Source | V2 Evidence Used |
| --- | --- |
| SPW-20023 and SPD-2515 Jira intake | Existing generic calendar coverage and reported tagged-calendar failure |
| Backend commit `2d038f9965df2f73cb12f8b6606604a2e229ee20` | V2 duplicate event-ID removal |
| `web-app/apps/venues/services/public_venue_calendar.py` | Tag splitting, case normalization, price enrichment, sorting, and final deduplication |
| `web-app/apps/venues/queries/calendar_events_query.py` | V2 tag join, OR matching, and row amplification when an event matches both tags |
| `web-app/apps/tickets/api/venue_based/serializers/serializers.py` | Optional blank tag input and 1024-character limit |
| `web-app/apps/tickets/models/event_management/event.py` | Recurring parent tags copied to child events |
| Frontend commit `98e82bfd9dceb4f8aa9de4fbb445ce619308a66a` | Tags added to V2 first-event/month requests and cache identity |
| `showpass-frontend/packages/next-app/pages/widget/calendar/venue/[venueSlug]/index.tsx` | Current direct V2 route query handling |
| `showpass-frontend/packages/core/src/shared/modules/events/calendar/hooks/useCalendarEventsByDay.ts` | First matching event and visible-month calls |
| `showpass-frontend/packages/core/src/shared/modules/events/calendar/hooks/useCalendarFlowController.ts` | Initialized date/event/package/filter state |
| `showpass-frontend/packages/core/src/shared/modules/events/calendar/utils/calendar-cache-utils.ts` | Raw tag string included in the V2 cache key |
| `showpass-frontend/packages/core/src/app-contexts/sdk/features/calendar.ts` | Current modal and third-argument container signatures |
| `showpass-frontend/packages/core/src/app-contexts/sdk/services/Widget/Widget.ts` | Current container lookup and iframe mounting |
| `showpass-frontend/packages/core/src/app-contexts/sdk/services/config/ConfigService.ts` | Standard versus Attraction route selection and attraction slug handling |
| `showpass-wordpress-plugin/plugin/showpass-wordpress-plugin-shortcode.php` | Current V2 button and embedded shortcode tag attributes |
| `showpass-wordpress-plugin/plugin/js/showpass-custom.js` | Current WordPress shortcode launch into the SDK calendar |
| [JavaScript SDK calendar guide](https://dev.showpass.com/sdk/05-event-calendar-widget/) | Current SDK signatures and Standard Calendar tag contract |
| [WordPress calendar guide](https://dev.showpass.com/wordpress/05-adding-calendar-widget/) | Current V2 button/embed shortcode contract |
| `showpass-playwright` search | No durable exact two-tag V2 end-to-end oracle found |

## Source-Backed V2 Behavior

- The backend splits the `tags` query on commas and matches any requested tag.
- One event matching two requested tags can produce two database rows.
- The backend fix deduplicates the final V2 result by event ID.
- The frontend fix sends `tags` in both the first-event request and the visible-month request.
- The V2 frontend calendar cache key includes the raw tag value.
- The direct V2 route joins repeated route query values with commas.
- Recurring parent tag changes propagate to child events.
- The current SDK supports a modal without `containerId` and an embedded calendar with a unique `containerId`.
- The current WordPress V2 shortcodes expose a `tags` attribute and launch the modern calendar while the venue's sunset flag is enabled.
- The V2 selection controller does not visibly guarantee that date, event, package, or quantity state resets when only the tag scope changes; manual regression proof is required.
- The SDK guide defines both Standard and Attraction calendars as modal- or embed-capable through the same `calendarWidget` signature.
- Standard SDK tags are optional and comma-separated; Attraction requires `is_attraction: true` and an event slug.
- The SDK guide requires callers to initialize after DOM readiness and SDK availability, and its robust embed pattern retries after 500 ms.
- The current WordPress guide documents `label`, `tags`, `is_attraction`, `event_id`, `class`, and `lang` for the button, and `tags`, `is_attraction`, `event_id`, and `lang` for the embed.
- Checked-in current WordPress shortcode source consumes button `label`, `class`, and `tags`, and embed `tags`, but does not consume the documented `is_attraction`, `event_id`, or `lang`.
- The WordPress guide uses a numeric attraction event ID, while the SDK guide requires an event slug.

## State-Space and Outcome Accounting

| Axis | V2 States Accounted For | Coverage |
| --- | --- | --- |
| Entry point | Direct route, public V2 API, current SDK modal, current SDK embed, current WordPress button, current WordPress embed | TC-1 through TC-7 |
| Calendar mode | Standard and Attraction, each modal and embedded where the current signature supports it | TC-4, TC-5, TC-17, TC-18 |
| SDK initialization | SDK ready, DOM loading, DOM already ready, SDK delayed, SDK unavailable, missing Venue ID, missing container | TC-15, TC-16, TC-18 |
| WordPress documented parameters | Default, label, class, single/multiple tags, French, attraction tag, attraction event ID | TC-19, TC-20 |
| Requested tag count | One, two, duplicate token | TC-1, TC-2, TC-12 |
| Event/tag relationship | Tag A only, Tag B only, both tags, neither tag | TC-2, TC-3 |
| Match outcome | Exact match set, no match, unfiltered result, validation error | TC-1, TC-2, TC-9, TC-14 |
| First-event state | Earlier untagged event and first matching tagged month | TC-1 |
| Mounted client state | Date selected, event selected, package selected, quantity selected | TC-8, TC-9 |
| Concurrent state | Two unique SDK containers with different tags | TC-6 |
| Filter composition | Quantity, price, quantity plus price, special-event value | TC-10 |
| Event lifecycle | Normal event and recurring parent with existing children | TC-2, TC-11 |
| Input form | Mixed case, encoded space, plus space, reversed order, duplicate token, empty tokens, 1024/1025 length | TC-12, TC-14 |
| Cache scope | One tag/two tags, Dino/Family, Venue A/Venue B | TC-13 |
| View | Desktop and mobile where the customer flow is visible | Manual case Platform/View tables |

## Current Launch Coverage Contract

This table is the completeness gate for the clarified goal. A documented current launch cannot be implied by another row.

| Launch ID | Public Launch | Required Distinct State | Coverage |
| --- | --- | --- | --- |
| SDK-S01 | Standard modal through `calendarWidget(venueId, params)` | SDK ready; tagged modal | TC-4 |
| SDK-S02 | Standard embed through `calendarWidget(venueId, params, containerId)` | SDK ready; unique container | TC-5 |
| SDK-S03 | Robust Standard modal initialized while DOM is loading | Listener runs once at `DOMContentLoaded` | TC-15 |
| SDK-S04 | Robust Standard modal initialized after DOM is already ready | Buttons bind immediately and once | TC-15 |
| SDK-S05 | Robust Standard modal with multiple buttons | Each button retains its own venue and optional tags | TC-15 |
| SDK-S06 | Robust Standard modal rejected launch | Missing Venue ID or unavailable SDK creates no calendar and shows the documented fixture message | TC-15 |
| SDK-S07 | Robust Standard embed initialized while DOM is loading | Embed mounts once after `DOMContentLoaded` | TC-16 |
| SDK-S08 | Robust Standard embed initialized after DOM is ready | Embed mounts immediately and once | TC-16 |
| SDK-S09 | Robust Standard embed with delayed SDK | 500 ms retry eventually creates exactly one calendar | TC-16 |
| SDK-S10 | Standard embed with missing container | No iframe mounts elsewhere; named container error is visible | TC-16 |
| SDK-A01 | Attraction modal through the shared modal signature | Correct parent slug and Attraction date/quantity/time flow | TC-17 |
| SDK-A02 | Basic Attraction embed | Required attraction parameters and unique container | TC-18 |
| SDK-A03 | Robust Attraction embed while DOM is loading | One attraction after `DOMContentLoaded` | TC-18 |
| SDK-A04 | Robust Attraction embed after DOM is ready | One attraction mounts immediately | TC-18 |
| SDK-A05 | Robust Attraction embed with delayed SDK | Retry ends with one attraction iframe | TC-18 |
| WP-B01 | Basic current calendar button | Default **Get Tickets** button and unfiltered Standard calendar | TC-19 |
| WP-B02 | Current button parameter examples | Label, single/multiple tags, class, French | TC-19 |
| WP-B03 | Current Attraction button examples | Attraction with Daily tag and attraction with event ID | TC-19 |
| WP-E01 | Basic current embedded calendar | Unfiltered Standard calendar in the page | TC-20 |
| WP-E02 | Current embed parameter examples | Single/multiple tags and French | TC-20 |
| WP-E03 | Current Attraction embed examples | Attraction with Daily tag and attraction with event ID | TC-20 |
| WP-C01 | Missing WordPress Organizer ID | Exact documented message for button and embed; no launch | TC-21 |
| WP-X01 | Multiple current WordPress calendars on one page | Two buttons, two embeds, and mixed button/embed remain independent | TC-22 |
| WP-X02 | Current shortcode added to a page or post | Basic button and basic embed launch from a post; parameter examples launch from pages | TC-19, TC-20 |

## Risk Areas Missing From SPW-20023

| Priority | V2 Risk | Why the Original Instructions Can Miss It |
| --- | --- | --- |
| P0 | An event matching both requested tags renders twice | Generic calendar data does not create one event with both requested tags |
| P0 | Two-tag behavior is incorrectly implemented as AND | Generic filter checks never require a Tag A-only and Tag B-only event in the same result |
| P0 | The first-event request ignores tags | A generic calendar can open the correct month even when no earlier untagged control exists |
| P0 | A tag change retains an old selected event or package | Original navigation does not replace the tag query while selection is initialized |
| P1 | SDK or WordPress drops one side of a two-tag string | Generic integration smoke does not assert an exact three-event tag union |
| P1 | Two current SDK embeds share selection or replace a container | One-calendar SDK coverage cannot expose cross-instance state |
| P0 | A documented SDK launch creates no calendar because initialization runs before DOM or SDK readiness | A normally loaded QA page does not exercise the robust launch timing branches |
| P0 | A WordPress Attraction shortcode opens a Standard calendar | Checked-in shortcode source drops documented attraction parameters |
| P1 | WordPress French or event-specific Attraction examples silently ignore their parameters | Generic WordPress launch confirms only that some calendar opened |
| P1 | Missing SDK venue/container values mount an unscoped calendar or duplicate iframe | Happy-path partner pages always supply valid configuration |
| P1 | Quantity, price, or special-event filters replace tag scope | Generic filter checks do not include an untagged event satisfying the same filter |
| P1 | Recurring child occurrences retain an old parent tag | Generic recurrence coverage does not mutate the parent's tag |
| P1 | Warm cache leaks another tag or venue result | Generic cache checks do not alternate exact tag strings and venue IDs |
| P2 | Empty tokens or request boundaries widen results | Ordinary customer input does not reach the API boundary states |

## Coverage Decisions

- The exact two-tag user oracle is a dedicated case, not a parameter hidden inside a broad route test.
- Current SDK modal, current SDK embed, simultaneous current embeds, and current WordPress V2 shortcodes are separate because their starting state and container behavior differ.
- Generic purchase is not repeated. Cases continue only far enough to prove that ticket selection belongs to an event inside the current tag scope.
- Flag-off, cached v1, deprecated-route, and legacy WordPress behavior are explicitly excluded rather than mixed into V2 regression coverage.
- Undefined input contracts remain Blocked; the note does not invent expected results to increase case count.

## Proof Target Map

| Proof Target | Exact Proof | Covered By |
| --- | --- | --- |
| PT-0: Every current launch is accounted for | Each documented SDK/WordPress launch creates one intended modal/embed or produces its explicit rejected-launch result | TC-4 through TC-7, TC-15 through TC-22 |
| PT-1: Exact single-tag result | Only events carrying the requested tag appear, and the first selected date belongs to a matching event | TC-1 |
| PT-2: Correct two-tag OR-union | Tag A-only, Tag B-only, and Tag A+B events appear; the Tag A+B event appears once; untagged events do not appear | TC-2, TC-3, TC-4, TC-7, TC-16 |
| PT-3: Current scope owns all purchase state | Changing tags clears prior date, event, package, quantity, and continue actions | TC-8, TC-9 |
| PT-4: Tags remain an intersection | Quantity, price, special-event, recurrence, and venue scope never replace the tag restriction | TC-10, TC-11, TC-13 |
| PT-5: Supported input is stable and safe | Equivalent tag forms return the same exact set; no-match and validation states never widen scope | TC-12, TC-14 |

## Clean-State Test Data

Create the data under a new Beta venue named **SPW20023 V2 Tag Lab**. No other event in either QA venue may use the exact tags `dino`, `family`, `night tour`, `state-dino`, or `recurring-tag`.

### Setup Steps

| Setup Step | Action | Expected Result and Evidence to Record |
| --- | --- | --- |
| Create Venue A | Create or select the QA-owned Beta venue **SPW20023 V2 Tag Lab** and enable `sunset_legacy_calendar_sdk_and_components`. | Record Venue A's Organization ID, slug, timezone, and flag state. |
| Create each event | Go to **Dashboard → Events → Create Event**. Complete **Basic Info**, **Location & Info**, **Event Date & Time**, and **Ticket Types**. Set **Visibility** to **Public**, enable **Display on Calendar Widget**, keep sales open, and select **Save Event**. | The event opens publicly and appears in Venue A's unfiltered V2 calendar. Record its ID, slug, date, start time, and lowest price. |
| Add one tag | In the event's **Basic Info → Tags** field, type the exact tag, press Enter/Return so it becomes a tag chip, and select **Save Event**. Reopen **Basic Info**. | The exact tag chip remains visible after reopening. |
| Add both tags | On **SPW20023 Dino + Family**, add Dino, press Enter/Return, add Family, press Enter/Return, and save. | Two separate tag chips—Dino and Family—remain after reopening. |
| Create the Attraction parent | Create **SPW20023 Attraction Parent** as a recurring time-slot attraction with two available ticket types. Add Daily as an event tag and save. | Record the numeric parent ID, event slug, ticket-type names, dates, time slots, and available quantities. |
| Create Venue B control | Create a second QA-owned Beta venue with one public event named **SPW20023 Venue B Dino Only** and tag it Dino. Enable the V2 flag. | Record Venue B's Organization ID, slug, and event ID. |
| Prove readiness | Open each fixture publicly and in the unfiltered V2 calendar before running any case. | Every fixture has the recorded name, date, price, sales availability, and ticket-selection action. |

### Exact Fixture Manifest

| Fixture | Tags | Calendar Placement | Distinct Purpose |
| --- | --- | --- | --- |
| SPW20023 Untagged Earlier | none | At least one month before the first tagged event | Proves the V2 first-event request does not choose an earlier untagged event |
| SPW20023 Dino Only | `dino` | Fixture month, first tagged date | Tag A-only result |
| SPW20023 Family Only | `family` | Fixture month, second tagged date | Tag B-only result |
| SPW20023 Dino + Family | `dino`, `family` | Fixture month, third tagged date | Matches both requested tags and must appear once |
| SPW20023 Untagged Filter Control | none | Fixture month | Satisfies the quantity/price/special-event test setup but must stay hidden |
| SPW20023 Night Tour | `night tour` | Fixture month | Multiword tag encoding |
| SPW20023 State Dino Event | `state-dino` | A month before State Family Event | Selected-event reset control |
| SPW20023 State Dino Package | `state-dino` | Same state-dino month | Selected custom-package and quantity reset control |
| SPW20023 State Family Event | `state-family` | A later month | Replacement state after a tag change |
| SPW20023 Recurring Parent | initially none | Three future child occurrences on recorded dates | Tag add, replace, and remove propagation |
| SPW20023 Attraction Parent | `Daily` | Three future dates, two time slots per date, two available ticket types | Current SDK and WordPress Attraction launch |
| SPW20023 Venue B Dino Only | `dino` | Same fixture month, Venue B | Venue/cache isolation |

For the exact two-tag oracle:

| Query | Must Appear | Must Not Appear |
| --- | --- | --- |
| `tags=dino` | SPW20023 Dino Only; SPW20023 Dino + Family | SPW20023 Family Only; every untagged event |
| `tags=family` | SPW20023 Family Only; SPW20023 Dino + Family | SPW20023 Dino Only; every untagged event |
| `tags=dino,family` | SPW20023 Dino Only; SPW20023 Family Only; SPW20023 Dino + Family exactly once | Every untagged event |

> [!warning] Fixture gate
> Do not begin execution if another event shares Dino or Family, if the V2 flag is off, or if any recorded event is unpublished, off sale, or hidden from the calendar. Fix the clean fixture first; otherwise an event-count assertion is not trustworthy.

## Current SDK Fixture

Prepare one QA page on an allowlisted Beta domain. A QA employee should use labelled buttons and must not edit JavaScript during execution.

| Visible Control | Exact SDK Call |
| --- | --- |
| **Open V2 Modal — Dino + Family** | `showpass.tickets.calendarWidget(VENUE_A_ID, { "theme-primary": "#FF7F00", lang: "fr", tags: "dino,family" })` |
| **Mount Standard Embed — Basic Unfiltered** | `showpass.tickets.calendarWidget(VENUE_A_ID, { "theme-primary": "#416b24" }, "showpass-embedded-calendar-container")` |
| **Mount V2 Embed — Dino + Family** | `showpass.tickets.calendarWidget(VENUE_A_ID, { tags: "dino,family" }, "calendar-two-tags")` |
| **Mount V2 Embed A — Dino** | `showpass.tickets.calendarWidget(VENUE_A_ID, { tags: "dino" }, "calendar-dino")` |
| **Mount V2 Embed B — Family** | `showpass.tickets.calendarWidget(VENUE_A_ID, { tags: "family" }, "calendar-family")` |
| **Switch Mounted V2 — State Dino to State Family** | Replace the calendar in one fixed container from `{ tags: "state-dino" }` to `{ tags: "state-family" }` |
| **Switch Mounted V2 — State Dino to No Match** | Replace the calendar in one fixed container from `{ tags: "state-dino" }` to `{ tags: "spw20023-no-match" }` |
| **Open V2 Modal — Venue B Dino** | `showpass.tickets.calendarWidget(VENUE_B_ID, { tags: "dino" })` |
| **Initialize Standard Buttons at DOMContentLoaded** | Register the guide's robust Standard modal buttons while `document.readyState` is `loading`; one unfiltered Venue A button and one Venue B Dino button |
| **Initialize Standard Buttons after DOM Ready** | Run the same robust Standard button initializer when `document.readyState` is already interactive/complete |
| **Try Standard Modal — Missing Venue ID** | Run the robust modal guard with an empty Venue ID |
| **Try Standard Modal — SDK Unavailable** | Run the robust modal guard while `window.showpass.tickets` is unavailable |
| **Mount Standard Embed at DOMContentLoaded** | Run the guide's robust Standard embed initialization after the DOM-ready event |
| **Mount Standard Embed after DOM Ready** | Run the robust Standard embed initializer immediately after DOM readiness |
| **Mount Standard Embed after Delayed SDK** | Hold `window.showpass.tickets` unavailable for at least 1,200 ms, retry every 500 ms, then mount `tags=dino,family` |
| **Try Standard Embed — Missing Container** | Call the current SDK with a container ID that does not exist |
| **Open Attraction Modal — Required + Quantity Prompt** | `calendarWidget(VENUE_A_ID, { "theme-primary": "#dc3545", lang: "fr", is_attraction: true, event_id: ATTRACTION_SLUG, "ticket-type-selection-required": true, "prompt-for-quantity": true })` |
| **Open Attraction Modal — Required + No Quantity Prompt** | Same call with `"prompt-for-quantity": false` |
| **Mount Attraction Embed — Basic** | Mount the guide's basic Attraction configuration into `attraction-basic` |
| **Mount Attraction Embed at DOMContentLoaded** | Run the robust Attraction initializer after the DOM-ready event |
| **Mount Attraction Embed after DOM Ready** | Run the robust Attraction initializer immediately |
| **Mount Attraction Embed after Delayed SDK** | Hold SDK unavailable for at least 1,200 ms, retry every 500 ms, then mount the robust Attraction configuration |
| **Reset Fixture** | Close all modals, remove all calendar iframes, empty the basket, and reset the iframe counter to zero |

The fixture must display the target environment, DOM-ready state, SDK-ready state, Venue ID, active tag string, active Attraction slug, initialization-attempt count, modal count, iframe count, and the most recent launch/error message.

## Glossary

- **Event tag:** A label saved in an event's **Basic Info → Tags** field.
- **Two-tag OR-union:** An event may match the first tag, the second tag, or both; it does not need both.
- **V2 calendar:** The new calendar selected when `sunset_legacy_calendar_sdk_and_components` is enabled.
- **Fixture month:** The one recorded future month containing the clean Dino, Family, and control events.
- **Fixture manifest:** The recorded event names, IDs, tags, dates, prices, and expected results above.
- **Hard refresh:** `Cmd+Shift+R` on macOS or `Ctrl+Shift+R` on Windows.
- **Current SDK fixture:** The prepared QA page containing the labelled controls and exact SDK calls above.
- **Read-only API client:** An approved browser, Postman, or Insomnia setup used only for `GET` requests against Beta.

## Coverage Ledger

`Covered` means a complete draft case accounts for the item. It does not mean the case has been executed.

| ID | V2 Tag State | Status | Evidence |
| --- | --- | --- | --- |
| V2-TAG-01 | One-tag exact result | Covered | TC-1 |
| V2-TAG-02 | Earlier untagged event cannot initialize the tagged calendar | Covered | TC-1 |
| V2-TAG-03 | Two-tag OR-union includes each single-tag side | Covered | TC-2 |
| V2-TAG-04 | Event matching both requested tags appears once | Covered | TC-2, TC-3 |
| V2-TAG-05 | Untagged event excluded from two-tag result | Covered | TC-2, TC-3 |
| V2-TAG-06 | Nested name/date/price/special-event data survives deduplication | Covered | TC-3 |
| V2-TAG-07 | Current SDK modal preserves two tags | Covered | TC-4 |
| V2-TAG-08 | Current SDK container embed preserves two tags through ticket selection | Covered | TC-16 |
| V2-TAG-09 | Two current SDK embeds retain independent tags and containers | Covered | TC-6 |
| V2-TAG-10 | Current WordPress button and embed preserve two tags | Covered | TC-7 |
| V2-TAG-11 | Tag change resets first month, selected date, and event | Covered | TC-8 |
| V2-TAG-12 | No-match tag clears event/package/quantity/continue state | Covered | TC-9 |
| V2-TAG-13 | Tag plus quantity/price/special-event filters is an intersection | Covered | TC-10 |
| V2-TAG-14 | Recurring parent tag add/replace/remove reaches all children | Covered | TC-11 |
| V2-TAG-15 | Mixed case and encoded multiword tags return the canonical set | Covered | TC-12 |
| V2-TAG-16 | Reversed two-tag order and duplicate token stay unique | Covered | TC-12 |
| V2-TAG-17 | Warm V2 cache remains isolated by tag string and venue | Covered | TC-13 |
| V2-TAG-18 | Missing/blank tags return the unfiltered calendar | Covered | TC-14 |
| V2-TAG-19 | Unknown tag returns a clean empty calendar | Covered | TC-14 |
| V2-TAG-20 | Empty comma tokens do not widen the result | Covered | TC-14 |
| V2-TAG-21 | 1024/1025 request boundary has an explicit response | Covered | TC-14 |
| V2-TAG-22 | Tag relation is restricted to Event content type | Deferred | Add a backend integration test with a non-Event tagged object sharing the Event's numeric ID |
| V2-TAG-23 | Whitespace after a comma | Blocked | Product contract is undefined; backend does not trim each token |
| V2-TAG-24 | Literal comma inside one tag | Blocked | Comma is the public list delimiter and no escape contract is defined |
| V2-TAG-25 | Repeated `tags` keys sent directly to the API | Blocked | Direct route and API normalize repeated keys differently |
| V2-TAG-26 | Maximum saved event-tag length | Blocked | Dashboard/API saved-tag limit needs confirmation |
| V2-TAG-27 | High-cardinality response time | Deferred | No response-time acceptance threshold is defined |
| V2-TAG-28 | Robust Standard modal initializes while DOM is loading | Covered | TC-15 |
| V2-TAG-29 | Robust Standard modal initializes after DOM is ready | Covered | TC-15 |
| V2-TAG-30 | Multiple robust modal buttons retain venue and tags | Covered | TC-15 |
| V2-TAG-31 | Missing Venue ID and unavailable SDK create no modal | Covered | TC-15 |
| V2-TAG-32 | Robust Standard embed initializes before/after DOM readiness | Covered | TC-16 |
| V2-TAG-33 | Delayed SDK retry creates exactly one Standard embed | Covered | TC-16 |
| V2-TAG-34 | Missing Standard embed container fails without mounting elsewhere | Covered | TC-16 |
| V2-TAG-35 | Current SDK Attraction modal launches the requested parent | Covered | TC-17 |
| V2-TAG-36 | Basic current SDK Attraction embed launches the requested parent | Covered | TC-18 |
| V2-TAG-37 | Robust Attraction embed covers DOM loading, DOM ready, and delayed SDK | Covered | TC-18 |
| V2-TAG-38 | Attraction ticket-type and quantity prompt parameters control launch flow | Covered | TC-17, TC-18 |
| V2-TAG-39 | Current WordPress basic button and default label | Covered | TC-19 |
| V2-TAG-40 | Current WordPress button label, tags, class, and French examples | Covered | TC-19 |
| V2-TAG-41 | Current WordPress Attraction button examples | Covered | TC-19; source predicts documented parameters are dropped |
| V2-TAG-42 | Current WordPress basic embedded calendar | Covered | TC-20 |
| V2-TAG-43 | Current WordPress embed tags and French examples | Covered | TC-20 |
| V2-TAG-44 | Current WordPress Attraction embed examples | Covered | TC-20; source predicts documented parameters are dropped |
| V2-TAG-45 | Missing Organizer ID blocks current button and embed with exact message | Covered | TC-21 |
| V2-TAG-46 | Multiple current WordPress calendars retain independent launch targets | Covered | TC-22 |
| V2-TAG-47 | SDK `theme-primary` and `lang` across Standard and Attraction launches | Covered | TC-4, TC-5, TC-17, TC-18 |
| V2-TAG-48 | WordPress embedded launch in the documented 1200 px desktop container | Covered | TC-20 |
| V2-TAG-49 | Basic current SDK Standard embed with omitted tags | Covered | TC-5 |
| V2-TAG-50 | Current WordPress shortcode launch from both a page and a post | Covered | TC-19, TC-20 |

## Qase-Ready Manual Test Cases

> [!tip] Execution rule
> Run one case from top to bottom without substituting event names. When a case has a parameter, choose one value, use its exact mapping row, complete every step, perform cleanup, and then repeat with the next value.

> [!warning] WordPress documentation contract
> TC-19 and TC-20 use the expected results published in the current WordPress guide. Checked-in shortcode source appears to drop `lang`, `is_attraction`, and `event_id`. If those documented variants open the wrong mode or language, record a documentation/implementation contract finding; do not rewrite the shortcode or accept a generic Standard calendar as a pass.

### TC-1: Widget - Calendar - Verify one tag controls the first selected month and event list

**Priority:** High  
**Type:** Regression  
**Area:** V2 single-tag calendar

**Proof Target:** PT-1

**Description:** Validates that the new calendar uses the tag in both its first-event lookup and fixture-month lookup, so an earlier untagged event cannot choose the starting month or appear in the result.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Venue A uses the exact clean-state manifest.
* The V2 flag is enabled.
* The browser starts with an empty basket and no open Showpass calendar.

**Postconditions:** No ticket remains in the basket.

**Tags:** widget, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In a new private browser session, open Venue A's direct V2 calendar with the Dino tag. | `https://beta.showpass.com/widget/calendar/venue/{VenueASlug}/?tags=dino` | The V2 calendar loads without an error. |
| Record the month and date selected immediately after loading finishes. | SPW20023 Dino Only date | The selected month and date belong to SPW20023 Dino Only, not SPW20023 Untagged Earlier. |
| Browse every date that displays an event in the fixture month. | Exact single-tag oracle | Only SPW20023 Dino Only and SPW20023 Dino + Family appear. |
| Count the visible occurrence of each event name. | Two expected names | Each expected event appears once. |
| Search the month for SPW20023 Family Only, SPW20023 Untagged Earlier, and SPW20023 Untagged Filter Control. | Three excluded controls | None of the excluded controls appears. |
| Select SPW20023 Dino Only and use its visible ticket-selection action. | One available ticket type | Ticket selection belongs to SPW20023 Dino Only. |
| Return to the calendar without adding a ticket. | Browser Back or visible calendar control | The Dino-only event set remains unchanged. |

### TC-2: Widget - Calendar - Verify two tags return an OR-union without duplicates

**Priority:** High  
**Type:** Regression  
**Area:** V2 two-tag calendar

**Proof Target:** PT-2

**Description:** Validates the exact two-tag behavior fixed by the backend: events matching either Dino or Family appear, while the event matching both tags appears only once.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Dino Only has only Dino.
* Family Only has only Family.
* Dino + Family has both tags.
* No other Venue A event has Dino or Family.

**Postconditions:** No ticket remains in the basket.

**Tags:** widget, events, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Dino-only V2 URL in the first tab. | `?tags=dino` | Only SPW20023 Dino Only and SPW20023 Dino + Family appear. |
| Open the Family-only V2 URL in the second tab. | `?tags=family` | Only SPW20023 Family Only and SPW20023 Dino + Family appear. |
| Open the combined V2 URL in a third tab. | `?tags=dino,family` | The combined calendar loads normally. |
| Browse every event date in the fixture month and write down each displayed event name. | Combined tab | The list is exactly SPW20023 Dino Only, SPW20023 Family Only, and SPW20023 Dino + Family. |
| Count SPW20023 Dino + Family across the entire fixture month. | Event matching both requested tags | SPW20023 Dino + Family appears exactly once. |
| Search for SPW20023 Untagged Earlier and SPW20023 Untagged Filter Control. | Untagged controls | Neither untagged event appears. |
| Compare the combined result with the two single-tag tabs. | Union of tab 1 and tab 2 | The combined result equals the union of the two single-tag results, with no missing or additional event. |
| Select SPW20023 Dino + Family and continue to ticket selection. | Recorded event date and ticket type | Ticket selection opens for SPW20023 Dino + Family and shows its recorded date and price. |

### TC-3: WebPublic - Calendar - Verify the V2 API returns one complete row per two-tag event

**Priority:** High  
**Type:** Regression  
**Area:** V2 calendar API deduplication

**Proof Target:** PT-2

**Description:** Validates that the real V2 API deduplicates the event matching both requested tags without losing its name, date, price, or special-event details.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* The exact Dino/Family manifest IDs and values are recorded.
* SPW20023 Dino + Family has recorded price data and a supported special-event value.
* A read-only Beta API request can be sent.

**Postconditions:** No Showpass data is changed.

**Tags:** api-testing, events, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the read-only API client, create a GET request to Venue A's V2 calendar endpoint. | `https://beta.showpass.com/api/public/venues/{VenueAId}/calendar/` | The request is ready without being sent to production. |
| Add the V2 version, fixture date range, and combined tags, then send the request. | `version=2`; `ends_on__gte={RangeStart}`; `starts_on__lt={RangeEnd}`; `tags=dino,family` | The response is HTTP 200 and contains a results list. |
| Write down every returned event ID and name. | Fixture date range | The response contains only the IDs for Dino Only, Family Only, and Dino + Family. |
| Count the Dino + Family event ID. | Recorded Dino + Family ID | The ID occurs exactly once. |
| Compare each returned ID with the clean manifest. | Three expected IDs | No untagged or unrelated ID is present. |
| Inspect Dino + Family's name, start date/time, lowest price, price ranges, and special-event value. | Recorded manifest values | Every recorded value is present once and agrees with the saved event. |
| Send the identical request two more times. | Same URL and query | All three requests return the same three IDs in the same order. |
| Open the direct V2 combined-tag calendar in a browser. | `?tags=dino,family` | The visible three-event set agrees with the API response. |

### TC-4: Widget - Calendar - Verify the current SDK modal preserves two tags

**Priority:** High  
**Type:** Integration  
**Area:** Current SDK modal calendar

**Proof Target:** PT-2

**Description:** Validates the current SDK modal signature with a concrete two-tag value, the documented primary-theme parameter, French language, and the exact three-event union.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* The current SDK fixture is loaded from an allowlisted Beta domain.
* The fixture status shows Venue A, `dino,family`, French, `#FF7F00`, and zero calendar iframes after reset.

**Postconditions:**

* Close the modal.
* Leave the basket empty.

**Tags:** widget, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the current SDK fixture and select **Reset Fixture**. | Venue A | The fixture reports Beta, zero iframes, and an empty basket. |
| Select **Open V2 Modal — Dino + Family** once. | `calendarWidget(VenueAId, { "theme-primary": "#FF7F00", lang: "fr", tags: "dino,family" })` | One V2 calendar modal and one iframe open. |
| Confirm the fixture's active tag display. | `dino,family` | The displayed active tag string exactly matches the SDK call. |
| Review calendar headings, month labels, and primary controls. | `lang=fr`; `theme-primary=#FF7F00` | The interface is French and its primary controls use the configured orange color. |
| Browse every event date in the fixture month. | Exact two-tag oracle | Only Dino Only, Family Only, and Dino + Family appear. |
| Count Dino + Family. | Event matching both tags | Dino + Family appears once. |
| Confirm Untagged Filter Control is absent. | Untagged control | The event is not visible on any date. |
| Select Family Only and continue to ticket selection. | Family Only ticket type | Ticket selection opens for Family Only in the same modal. |
| Return to the calendar. | Visible Back control | The exact three-event two-tag result returns. |

### TC-5: Widget - Calendar - Verify the basic current SDK embed launches unfiltered

**Priority:** High  
**Type:** Integration  
**Area:** Basic current SDK embed

**Proof Target:** PT-0

**Description:** Validates the SDK guide's basic Standard embedded example with omitted tags, its documented green primary color, and calendar-to-ticket transitions inside the named container.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* The current SDK fixture contains the unique container `showpass-embedded-calendar-container`.
* Venue A's unfiltered V2 event set is recorded.
* The fixture is reset and the basket is empty.

**Postconditions:**

* Dispose the embedded calendar.
* Leave the basket empty.

**Tags:** widget, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the current SDK fixture and select **Reset Fixture**. | — | No calendar iframe remains. |
| Select **Mount Standard Embed — Basic Unfiltered**. | `calendarWidget(VenueAId, { "theme-primary": "#416b24" }, "showpass-embedded-calendar-container")` | One V2 Standard calendar appears inside the named container; no modal opens. |
| Compare the primary buttons/selected controls with the documented green `#416b24`. | Theme control | The embedded calendar uses the configured green primary color and defaults to English. |
| Browse all recorded Venue A event dates. | Unfiltered manifest | Every public calendar-visible Venue A fixture appears once, including tagged and untagged controls. |
| Select Dino Only and open ticket selection. | Dino Only | The embedded area changes to Dino Only's ticket-selection flow. |
| Inspect the page outside `showpass-embedded-calendar-container`. | Surrounding fixture labels and other containers | The ticket flow remains inside the named container and no second iframe or modal appears. |
| Use the embedded Back control. | — | The same embedded area returns to the unfiltered Venue A calendar. |
| Confirm the returned event set. | Unfiltered manifest | The same unfiltered Venue A calendar returns without losing an event or becoming tag-filtered. |

### TC-6: Widget - Calendar - Verify two current SDK embeds retain independent tag scopes

**Priority:** High  
**Type:** Edge Case  
**Area:** Multiple current SDK calendars

**Proof Target:** PT-2, PT-3

**Description:** Validates two current container-based SDK calendars on one page, one filtered by Dino and the other by Family, without shared selection or container replacement.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* The current SDK fixture contains unique containers `calendar-dino` and `calendar-family`.
* The fixture is reset.

**Postconditions:** Dispose both embedded calendars.

**Tags:** widget, events, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select **Mount V2 Embed A — Dino**. | `calendar-dino` | One calendar appears in the Dino container and shows only Dino Only and Dino + Family. |
| Select **Mount V2 Embed B — Family**. | `calendar-family` | A second calendar appears in the Family container and shows only Family Only and Dino + Family. |
| Check the fixture iframe counter and both container labels. | Two unique containers | Exactly two iframes exist, one under each intended label. |
| In the Dino embed, select Dino Only. | Dino Only | Dino Only's event summary appears only in `calendar-dino`. |
| Without closing the Dino selection, select Family Only in the Family embed. | Family Only | Family Only's event summary appears only in `calendar-family`; the Dino embed remains on Dino Only. |
| Return the Family embed to its calendar and browse its dates. | Family scope | Family Only and Dino + Family remain visible; Dino Only is absent. |
| Return the Dino embed to its calendar and browse its dates. | Dino scope | Dino Only and Dino + Family remain visible; Family Only is absent. |
| Reload the fixture, mount Family first and Dino second, and repeat the two selections. | Reverse initialization order | Both calendars retain the same independent scope regardless of mount order. |

### TC-7: Widget - Calendar - Verify current WordPress V2 button and embed preserve two tags

**Priority:** High  
**Type:** Integration  
**Area:** Current WordPress V2 calendar

**Proof Target:** PT-2

**Description:** Validates the two current WordPress calendar shortcodes with the same concrete two-tag oracle used by the direct V2 route and current SDK.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* The Showpass WordPress Extension is active on an allowlisted Beta domain.
* **WordPress Admin → Showpass API** contains Venue A's Organization ID.
* Venue A's V2 flag is enabled.

**Postconditions:**

* Remove the temporary WordPress page.
* Leave the basket empty.

**Tags:** widget, events

**Parameters:**

WordPressEntry: CurrentButton, CurrentEmbed

**WordPress-entry mapping:**

| WordPressEntry | Exact Shortcode | Published Control |
| --- | --- | --- |
| CurrentButton | `[showpass_calendar_widget label="Open Dino and Family" tags="dino,family"]` | Button labelled **Open Dino and Family** |
| CurrentEmbed | `[showpass_embed_calendar tags="dino,family"]` | Calendar embedded directly in the page |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **WordPress Admin → Pages → Add New**, add one Shortcode block containing Exact Shortcode and publish the page. | Selected WordPressEntry | WordPress saves the shortcode and displays Published Control instead of shortcode text. |
| Open the published page in a new private browser session. | Beta QA page | Exactly one mapped button or embedded calendar appears. |
| For CurrentButton, select **Open Dino and Family**; for CurrentEmbed, wait until the embedded calendar finishes loading. | Selected WordPressEntry | One V2 calendar opens in the expected modal or page location. |
| Browse every fixture-month date and write down the displayed event names. | Exact two-tag oracle | The list is exactly Dino Only, Family Only, and Dino + Family. |
| Count Dino + Family. | Event matching both tags | Dino + Family appears exactly once. |
| Search for Untagged Filter Control. | Untagged event | Untagged Filter Control is absent. |
| Select Dino + Family and continue to ticket selection. | Recorded event date and price | Ticket selection belongs to Dino + Family. |
| Reload the published WordPress page and open the calendar again. | Same shortcode | The exact three-event result returns without an unfiltered event flashing. |

### TC-8: Widget - Calendar - Verify changing tags resets initialized V2 calendar state

**Priority:** High  
**Type:** Regression  
**Area:** V2 tag-state transition

**Proof Target:** PT-3

**Description:** Validates that replacing the tag in one mounted V2 calendar resets the selected month, date, and event instead of retaining purchase state from the prior scope.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* State Dino Event is in an earlier month than State Family Event.
* The fixture's switch control replaces the calendar in one fixed container.

**Postconditions:**

* Reset the SDK fixture.
* Leave the basket empty.

**Tags:** widget, events, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Mount the fixture's state-dino V2 calendar in the fixed container. | `tags=state-dino` | The calendar starts on State Dino Event's month and shows State Dino Event and State Dino Package. |
| Select State Dino Event. | Recorded State Dino date | State Dino Event's summary is visible. |
| Select **Switch Mounted V2 — State Dino to State Family**. | Same container; new `tags=state-family` | Loading finishes in the same container with the new scope. |
| Record the selected month and date after loading. | State Family Event date | The calendar selects State Family Event's later month/date, not the old State Dino month/date. |
| Inspect the event summary and purchase controls. | Prior Dino selection | State Dino Event is not selected, and no action can continue with it. |
| Browse every event date in the state-family month. | `state-family` | State Family Event appears; State Dino Event and State Dino Package are absent. |
| Select State Family Event and continue to ticket selection. | State Family Event | Ticket selection belongs to State Family Event. |

### TC-9: Widget - Calendar - Verify a no-match tag clears selected event and package state

**Priority:** High  
**Type:** Negative  
**Area:** V2 no-match state transition

**Proof Target:** PT-3

**Description:** Validates that changing a mounted V2 calendar to a tag with no matching events clears an existing event or custom-package choice and prevents continuation.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* `spw20023-no-match` matches no Venue A event.
* State Dino Event and State Dino Package are available.
* The basket is empty.

**Postconditions:** No ticket or package remains in the basket.

**Tags:** widget, events, edge-case

**Parameters:**

SelectedState: EventSelected, PackageAndQuantitySelected

**Selected-state mapping:**

| SelectedState | Exact Preparation |
| --- | --- |
| EventSelected | Select State Dino Event and stop on its event/time summary |
| PackageAndQuantitySelected | Select State Dino Package, select its custom package, choose quantity 2, and stop before adding |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Mount the state-dino V2 calendar in the current SDK fixture. | `tags=state-dino` | State Dino Event and State Dino Package are available. |
| Perform Exact Preparation for SelectedState. | Selected-state mapping | The selected event or package and quantity are visibly active, but the basket remains empty. |
| Select **Switch Mounted V2 — State Dino to No Match**. | `tags=spw20023-no-match` | Loading ends in a clean no-events state. |
| Inspect the selected date, event, package, quantity, and footer areas. | Previous selected state | No State Dino date, event, package, quantity, or continue action remains. |
| Press Enter/Return and select any visible primary action. | Keyboard and visible controls | The customer cannot continue to the prior event or package. |
| Check the basket. | — | The basket remains empty. |
| Switch the mounted calendar back to `state-dino`. | Same container | The date-selection flow returns and requires a fresh event/package selection. |

### TC-10: Widget - Calendar - Verify V2 filters narrow rather than replace a tag

**Priority:** High  
**Type:** Regression  
**Area:** V2 filter intersection

**Proof Target:** PT-4

**Description:** Validates that quantity, price, and special-event controls narrow an already Dino-filtered V2 calendar and never reveal an untagged event satisfying the same visible filter.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Dino Only and Dino + Family have recorded values for the tested filter.
* Untagged Filter Control is configured to satisfy the same tested filter.
* The expected remaining Dino events for each filter value are recorded before execution.

**Postconditions:**

* Clear every calendar filter.
* Leave the basket empty.

**Tags:** widget, search-filters, events

**Parameters:**

FilterCheck: Quantity, Price, QuantityAndPrice, SpecialEvent

**Filter-check mapping:**

| FilterCheck | Exact Action | Expected Tagged Result |
| --- | --- | --- |
| Quantity | Set quantity to the recorded value | Recorded Dino events supporting that quantity |
| Price | Select the recorded price range | Recorded Dino events inside that price range |
| QuantityAndPrice | Set the recorded quantity, then select the recorded price range | Recorded Dino events satisfying both |
| SpecialEvent | Select the recorded special-event value used by Dino + Family and Untagged Filter Control | Dino + Family only |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Venue A's direct V2 calendar with `tags=dino`. | Direct V2 URL | Dino Only and Dino + Family appear before another filter is selected. |
| Open the visible filter controls and perform Exact Action for FilterCheck. | Filter-check mapping | The selected quantity, price, or special-event value remains visibly active after loading. |
| Browse every remaining event date. | Expected Tagged Result | Only the recorded Dino events satisfying every active filter appear. |
| Search for Untagged Filter Control. | Control satisfies the non-tag filter | Untagged Filter Control remains hidden because it does not have Dino. |
| For QuantityAndPrice, clear only quantity and browse again. | Price remains active | Results widen only to Dino events satisfying price; no untagged event appears. |
| Clear every visible non-tag filter. | URL still has `tags=dino` | Dino Only and Dino + Family return. |
| Hard-refresh the page. | Same Dino URL | The calendar remains Dino-only after refresh. |

### TC-11: Core - Calendar - Verify recurring tag changes reach every V2 occurrence

**Priority:** High  
**Type:** Regression  
**Area:** Recurring event tags

**Proof Target:** PT-4

**Description:** Validates that adding, replacing, and removing a tag on a recurring parent changes every recorded child occurrence in the V2 filtered calendar.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Recurring Parent has three recorded future child occurrences.
* The parent initially has neither `recurring-tag` nor `family`.
* No other fixture uses `recurring-tag`.

**Postconditions:** Remove all test tags from Recurring Parent.

**Tags:** edit-event, widget, events

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **Dashboard → Events**, open SPW20023 Recurring Parent and go to **Basic Info**. | Recorded parent ID | The parent shows no Recurring Tag or Family tag chip. |
| In a second tab, open Venue A's V2 calendar with `tags=recurring-tag` and browse all three recorded child dates. | Three child dates | No Recurring Parent occurrence appears. |
| Return to **Basic Info**, enter Recurring Tag in **Tags**, press Enter/Return, and select **Save Event**. | `recurring-tag` | The parent saves and the tag chip remains after reopening. |
| Hard-refresh the recurring-tag calendar and browse the three child dates. | Recorded occurrences | All three occurrences appear once on their saved dates. |
| Replace Recurring Tag with Family on the recurring parent and save. | Remove `recurring-tag`; add `family` | The parent reopens with Family and no Recurring Tag chip. |
| Hard-refresh the recurring-tag and Family V2 calendars. | Two tagged URLs | All three occurrences leave recurring-tag and appear once under Family. |
| Remove Family from the parent and save. | Empty test-tag state | The parent reopens without either test tag. |
| Hard-refresh both tagged calendars and browse all three dates. | Recorded occurrences | The recurring occurrences are absent from both tag scopes. |

### TC-12: Widget - Calendar - Verify supported tag forms return one canonical V2 event set

**Priority:** Medium  
**Type:** Edge Case  
**Area:** V2 tag input normalization

**Proof Target:** PT-5

**Description:** Validates supported case, encoding, order, and duplicate-token forms against an explicit canonical event set on the new direct V2 route.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Venue A has the exact Dino, Family, and Night Tour fixtures.
* No other event uses those tags.

**Postconditions:** No ticket remains in the basket.

**Tags:** widget, events, edge-case

**Parameters:**

TagForm: MixedCaseDino, PercentEncodedNightTour, PlusEncodedNightTour, ReversedTwoTags, DuplicateDinoToken

**Tag-form mapping:**

| TagForm | Test URL Query | Canonical Query | Exact Expected Names |
| --- | --- | --- | --- |
| MixedCaseDino | `tags=DiNo` | `tags=dino` | Dino Only; Dino + Family |
| PercentEncodedNightTour | `tags=night%20tour` | `tags=night%20tour` | Night Tour |
| PlusEncodedNightTour | `tags=night+tour` | `tags=night%20tour` | Night Tour |
| ReversedTwoTags | `tags=family,dino` | `tags=dino,family` | Dino Only; Family Only; Dino + Family |
| DuplicateDinoToken | `tags=dino,dino` | `tags=dino` | Dino Only; Dino + Family |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Venue A's direct V2 route with Test URL Query. | Selected TagForm | The V2 calendar loads without a processing error. |
| Browse every fixture-month date and write down each event name. | Exact Expected Names | The displayed names exactly match the mapping, and each name appears once. |
| Open a second tab with Canonical Query. | Same Venue A slug | The canonical calendar loads. |
| Compare the two tabs date by date. | Test form versus canonical form | Both tabs show the same names on the same dates. |
| Search both tabs for Untagged Filter Control. | Untagged event | Untagged Filter Control is absent from both tabs. |
| Select one expected event from the Test URL Query tab. | First mapped event | Ticket selection belongs to the selected expected event. |

### TC-13: Widget - Calendar - Verify warm V2 caches stay isolated by tag and venue

**Priority:** High  
**Type:** Edge Case  
**Area:** V2 cache isolation

**Proof Target:** PT-4

**Description:** Validates that the new calendar cannot reuse a cached event list or selected event from another tag string or venue.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Venue A and Venue B have distinct Dino event names.
* The browser cache and storage remain intact during each sequence.
* Both venues have the V2 flag enabled.

**Postconditions:**

* Close every calendar.
* Leave both baskets empty.

**Tags:** widget, events, edge-case

**Parameters:**

CacheSequence: SingleTwoSingle, DinoFamilyDino, VenueAVenueBVenueA

**Cache-sequence mapping:**

| CacheSequence | First Calendar | Second Calendar | Return Calendar |
| --- | --- | --- | --- |
| SingleTwoSingle | Venue A `tags=dino` | Venue A `tags=dino,family` | Venue A `tags=dino` |
| DinoFamilyDino | Venue A `tags=dino` | Venue A `tags=family` | Venue A `tags=dino` |
| VenueAVenueBVenueA | Venue A `tags=dino` | Current SDK **Open V2 Modal — Venue B Dino** | Venue A `tags=dino` |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open First Calendar and browse all matching dates. | Cache-sequence mapping | Its exact expected event set appears. |
| Select an event unique to First Calendar and stop on its event summary. | Dino Only or Venue A Dino event | The selected event belongs to First Calendar. |
| Without clearing browser data, open Second Calendar. | Same browser session | Second Calendar shows only its own exact tag-and-venue event set. |
| Watch the calendar while Second Calendar loads. | Prior selected event | No event unique to First Calendar flashes or remains selected. |
| Open Return Calendar without clearing browser data. | Same browser session | Return Calendar restores its exact expected event set. |
| Check the selected event summary. | Prior First Calendar selection | No event from Second Calendar remains selected. |
| Repeat the sequence once with the browser cache warm. | Same CacheSequence | Both runs produce the same isolated results. |

### TC-14: Core - Calendar - Verify V2 empty, no-match, token, and length outcomes

**Priority:** Medium  
**Type:** Negative  
**Area:** V2 tag validation

**Proof Target:** PT-5

**Description:** Validates that missing, blank, unknown, empty-token, and documented request-length boundaries produce explicit V2 outcomes without exposing an unrelated event.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |

**Preconditions:**

* A saved Beta API collection contains each exact request below.
* The collection supplies prepared 1024-character and 1025-character tag values so the employee does not count characters manually.
* Venue A's unfiltered event IDs are recorded.

**Postconditions:** No Showpass data is changed.

**Tags:** api-testing, events, edge-case

**Parameters:**

InputOutcome: MissingTagKey, BlankTagValue, UnknownTag, LeadingEmptyToken, TrailingEmptyToken, MiddleEmptyToken, At1024Characters, At1025Characters

**Input-outcome mapping:**

| InputOutcome | Exact `tags` Input | Expected API Result |
| --- | --- | --- |
| MissingTagKey | Omit `tags` | HTTP 200; normal unfiltered Venue A result |
| BlankTagValue | `tags=` | HTTP 200; normal unfiltered Venue A result |
| UnknownTag | `tags=spw20023-no-match` | HTTP 200; empty results |
| LeadingEmptyToken | `tags=,dino` | HTTP 200; exact Dino result |
| TrailingEmptyToken | `tags=dino,` | HTTP 200; exact Dino result |
| MiddleEmptyToken | `tags=dino,,family` | HTTP 200; exact three-event Dino-or-Family result |
| At1024Characters | Prepared 1024-character nonmatching value | HTTP 200; empty results |
| At1025Characters | Prepared 1025-character value | HTTP 400; tag-field validation response and no events |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In the saved Beta API collection, open the request named InputOutcome. | Selected parameter | The request targets Venue A's V2 endpoint on beta.showpass.com. |
| Confirm the request contains the fixture date range, `version=2`, and Exact `tags` Input. | Input-outcome mapping | The saved request exactly matches the selected mapping row. |
| Send the GET request. | — | The HTTP status matches Expected API Result and no generic server error occurs. |
| Compare returned event IDs with the fixture manifest. | Expected API Result | The result is exactly unfiltered, empty, Dino-only, or Dino-or-Family as mapped; no event is duplicated. |
| For At1025Characters, inspect the response body. | Validation response | The response identifies the invalid tag field and contains no calendar events. |
| For every HTTP 200 value, open the direct V2 route with the same tag input. | Same input | The visible calendar shows the corresponding normal, empty, Dino-only, or Dino-or-Family state. |
| Remove the tag query from the direct route and reload. | Unfiltered Venue A URL | The normal unfiltered calendar returns without retaining the prior empty or tagged result. |

### TC-15: Widget - Calendar - Verify every robust Standard SDK modal launch

**Priority:** High  
**Type:** Integration  
**Area:** Robust Standard SDK modal

**Proof Target:** PT-0

**Description:** Validates the current SDK guide's robust Standard modal initialization before and after DOM readiness, multiple-button venue/tag isolation, and rejected launches when the SDK or Venue ID is missing.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* The current SDK fixture implements the guide's robust Standard modal pattern.
* It exposes Venue A unfiltered and Venue B Dino buttons after successful initialization.
* The fixture displays DOM state, SDK state, handler count, modal count, iframe count, Venue ID, tags, and the latest message.

**Postconditions:**

* Reset the SDK fixture.
* Leave both venue baskets empty.

**Tags:** widget, events, edge-case

**Parameters:**

ModalLaunch: DomLoading, DomAlreadyReady, MultipleButtons, MissingVenueId, SdkUnavailable

**Modal-launch mapping:**

| ModalLaunch | Exact Fixture Action | Expected Initialization |
| --- | --- | --- |
| DomLoading | Reload with **Initialize Standard Buttons at DOMContentLoaded** enabled | Zero handlers before `DOMContentLoaded`; one handler per button afterward |
| DomAlreadyReady | Select **Initialize Standard Buttons after DOM Ready** | One handler per button is added immediately |
| MultipleButtons | Initialize after DOM ready, then use both venue buttons | Each button uses its own Venue ID and optional tag |
| MissingVenueId | Select **Try Standard Modal — Missing Venue ID** | No modal; message `Showpass SDK not available or venue ID is missing.` |
| SdkUnavailable | Select **Try Standard Modal — SDK Unavailable** | No modal; message `Showpass SDK not available or venue ID is missing.` |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the current SDK fixture, select **Reset Fixture**, and record its initial counters. | Selected ModalLaunch | Modal and iframe counts are zero, and no earlier handler or message remains. |
| Perform Exact Fixture Action from the mapping. | Selected ModalLaunch | The status panel matches Expected Initialization exactly. |
| For DomLoading, DomAlreadyReady, or MultipleButtons, select the Venue A unfiltered button. | Venue A; no tags | Exactly one Standard calendar modal opens for Venue A and shows the recorded unfiltered Venue A event set. |
| Close Venue A's modal, then select the Venue B Dino button. | Venue B; `tags=dino` | Exactly one modal opens for Venue B and shows only SPW20023 Venue B Dino Only. |
| For MultipleButtons, reopen Venue A and then Venue B once more. | Alternate buttons | Each launch continues using the button's own venue/tag values; handler, modal, and iframe counts do not multiply. |
| For MissingVenueId or SdkUnavailable, inspect the page and counters after the message. | Rejected launch | No modal or iframe exists, and no Venue A or Venue B calendar appears elsewhere. |
| After a rejected launch, restore the valid SDK/Venue ID and select the Venue B Dino button. | Recovery | One Venue B Dino calendar opens, proving the rejected launch did not leave initialization blocked. |

### TC-16: Widget - Calendar - Verify every robust Standard SDK embedded launch

**Priority:** High  
**Type:** Integration  
**Area:** Robust Standard SDK embed

**Proof Target:** PT-0, PT-2

**Description:** Validates the current SDK guide's Standard embedded initialization before and after DOM readiness, delayed-SDK retry, and missing-container failure using one exact two-tag result.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* The current SDK fixture implements a 500 ms retry and delays the SDK for at least 1,200 ms in DelayedSdk.
* The valid container is named `calendar-two-tags`.
* The fixture reports initialization attempts and iframe count.

**Postconditions:**

* Dispose the embedded calendar.
* Restore normal SDK loading.

**Tags:** widget, events, edge-case

**Parameters:**

EmbedLaunch: DomLoading, DomAlreadyReady, DelayedSdk, MissingContainer

**Embed-launch mapping:**

| EmbedLaunch | Exact Fixture Action | Expected Launch |
| --- | --- | --- |
| DomLoading | Reload with **Mount Standard Embed at DOMContentLoaded** enabled | One embed after `DOMContentLoaded` |
| DomAlreadyReady | Select **Mount Standard Embed after DOM Ready** | One embed mounts immediately |
| DelayedSdk | Select **Mount Standard Embed after Delayed SDK** | At least three attempts, then one embed |
| MissingContainer | Select **Try Standard Embed — Missing Container** | No iframe; named missing-element error |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select **Reset Fixture** and confirm `calendar-two-tags` is empty. | Selected EmbedLaunch | Zero calendar iframes are present. |
| Perform Exact Fixture Action from the mapping. | Selected EmbedLaunch | The status panel matches Expected Launch. |
| For DomLoading, DomAlreadyReady, or DelayedSdk, inspect the mounted location and counters. | `calendar-two-tags` | Exactly one V2 Standard calendar iframe exists inside the named container and no modal opens. |
| Browse every fixture-month date. | `tags=dino,family` | Only Dino Only, Family Only, and Dino + Family appear, with Dino + Family once. |
| Select Dino + Family and continue to ticket selection. | Recorded event | The ticket flow remains inside `calendar-two-tags` and belongs to Dino + Family. |
| For DelayedSdk, review the attempt counter before and after SDK readiness. | 500 ms retry | Attempts increase while unavailable, stop after readiness, and still produce only one iframe. |
| For MissingContainer, verify the missing-element message includes the requested container ID. | Invalid ID | No calendar mounts in another container. |
| After MissingContainer, select **Mount V2 Embed — Dino + Family**. | Valid container | The valid recovery creates one exact two-tag embed. |

### TC-17: Widget - Calendar - Verify the current SDK Attraction modal launch

**Priority:** High  
**Type:** Integration  
**Area:** SDK Attraction modal

**Proof Target:** PT-0

**Description:** Validates the shared current SDK modal signature in Attraction mode and proves that the requested parent slug, required ticket-type selection, and quantity-prompt setting control the visible flow.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* SPW20023 Attraction Parent has two ticket types, three dates, and two time slots per date.
* The current SDK fixture uses the recorded attraction slug, not the numeric parent ID.
* The basket is empty.

**Postconditions:** No Attraction ticket remains in the basket.

**Tags:** widget, attraction, tickets

**Parameters:**

AttractionModal: RequiredWithQuantityPrompt, RequiredWithoutQuantityPrompt

**Attraction-modal mapping:**

| AttractionModal | Fixture Control | Expected Quantity Step |
| --- | --- | --- |
| RequiredWithQuantityPrompt | **Open Attraction Modal — Required + Quantity Prompt** | Quantity is requested before the add-to-cart action |
| RequiredWithoutQuantityPrompt | **Open Attraction Modal — Required + No Quantity Prompt** | No separate quantity prompt is inserted by that option |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Reset the SDK fixture and select Fixture Control. | Selected AttractionModal | Exactly one modal opens in Attraction mode. |
| Confirm the fixture's active Venue ID and attraction slug. | Venue A; recorded parent slug | Both values match SPW20023 Attraction Parent. |
| Review the Attraction headings and primary controls. | `lang=fr`; `theme-primary=#dc3545` | The Attraction interface is French and its primary controls use the configured red color. |
| Review the first visible choice. | `ticket-type-selection-required=true` | The customer must select one of the two recorded ticket types before choosing a date. |
| Select the first ticket type. | Recorded Ticket Type A | The recorded attraction dates become available. |
| Select the first recorded date and first time slot. | Fixture manifest | The selected date/time belongs to SPW20023 Attraction Parent. |
| Continue toward adding tickets. | Expected Quantity Step | The quantity flow matches the mapping and does not show a Standard venue event calendar. |
| Use the visible Back control. | — | The modal returns through the Attraction flow and retains the same parent slug. |

### TC-18: Widget - Calendar - Verify every current SDK Attraction embedded launch

**Priority:** High  
**Type:** Integration  
**Area:** SDK Attraction embed

**Proof Target:** PT-0

**Description:** Validates the current SDK guide's basic and robust Attraction embeds across DOM-loading, DOM-ready, and delayed-SDK launch states.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* The valid Attraction containers are present and uniquely named.
* Every launch uses Venue A and the recorded SPW20023 Attraction Parent slug.
* The robust configuration sets `ticket-type-selection-required=true` and `prompt-for-quantity=false`.

**Postconditions:**

* Dispose every Attraction iframe.
* Restore normal SDK loading.

**Tags:** widget, attraction, tickets

**Parameters:**

AttractionEmbed: Basic, DomLoading, DomAlreadyReady, DelayedSdk

**Attraction-embed mapping:**

| AttractionEmbed | Exact Fixture Action | Expected Timing | Expected Theme |
| --- | --- | --- | --- |
| Basic | Select **Mount Attraction Embed — Basic** after SDK Ready | Immediate single embed | Red `#dc3545` |
| DomLoading | Reload with **Mount Attraction Embed at DOMContentLoaded** enabled | One embed after DOM readiness | Grey `#6c757d` |
| DomAlreadyReady | Select **Mount Attraction Embed after DOM Ready** | Immediate single embed | Grey `#6c757d` |
| DelayedSdk | Select **Mount Attraction Embed after Delayed SDK** | 500 ms retries, then one embed | Grey `#6c757d` |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select **Reset Fixture** and confirm no Attraction iframe exists. | Selected AttractionEmbed | The fixture is ready for one isolated launch. |
| Perform Exact Fixture Action. | Attraction-embed mapping | Exactly one Attraction iframe appears in the intended container at Expected Timing. |
| Confirm the fixture's Venue ID, attraction slug, attempt count, and iframe count. | Recorded values | Venue and slug match the parent, and only one iframe exists. |
| Review the embedded primary controls. | Expected Theme | The Attraction embed uses the mapped primary color and defaults to English. |
| Select Ticket Type A. | `ticket-type-selection-required=true` | The date choices become available only after the ticket type is selected. |
| Select the first recorded date and second time slot. | Fixture manifest | The embedded flow displays the selected parent date/time. |
| Continue toward adding tickets. | `prompt-for-quantity=false` | The flow follows the no-extra-quantity-prompt configuration. |
| For DelayedSdk, review the attempt count after the iframe appears. | 500 ms retry | Multiple attempts occurred, then retries stopped without creating duplicate iframes. |
| Use Back and repeat with Ticket Type B. | Second ticket type | The same embedded parent remains active and Ticket Type B can follow the documented flow. |

### TC-19: Widget - Calendar - Verify every documented current WordPress button launch

**Priority:** High  
**Type:** Integration  
**Area:** Current WordPress calendar button

**Proof Target:** PT-0, PT-2

**Description:** Validates every current `[showpass_calendar_widget]` example documented for the modern WordPress calendar: default, label, single/multiple tags, custom class, French, and both Attraction examples.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Venue A's Organization ID is saved under **WordPress Admin → Showpass API**.
* The WordPress domain is allowlisted on Beta and the V2 flag is enabled.
* `.qa-calendar-button` has a visible green outline on the QA page.
* Attraction Parent's numeric ID and Daily tag are recorded.

**Postconditions:**

* Remove every temporary WordPress page or post.
* Remove the temporary button CSS.
* Leave the basket empty.

**Tags:** widget, events, attraction

**Parameters:**

ButtonExample: Basic, CustomLabel, SingleTag, MultipleTags, CustomClass, French, AttractionTag, AttractionEventId

**Button-example mapping:**

| ButtonExample | Editor Location | Exact Shortcode | Expected Button | Expected Calendar |
| --- | --- | --- | --- | --- |
| Basic | **Posts → Add New** | `[showpass_calendar_widget]` | **Get Tickets** with default class | English unfiltered Standard Venue A calendar |
| CustomLabel | **Pages → Add New** | `[showpass_calendar_widget label="View Event Calendar"]` | **View Event Calendar** | English unfiltered Standard Venue A calendar |
| SingleTag | **Pages → Add New** | `[showpass_calendar_widget label="Dino Calendar" tags="dino"]` | **Dino Calendar** | Dino Only and Dino + Family |
| MultipleTags | **Pages → Add New** | `[showpass_calendar_widget label="Dino and Family" tags="dino,family"]` | **Dino and Family** | Exact three-event Dino-or-Family union |
| CustomClass | **Pages → Add New** | `[showpass_calendar_widget label="Styled Calendar" class="qa-calendar-button"]` | **Styled Calendar** with green outline | English unfiltered Standard Venue A calendar |
| French | **Pages → Add New** | `[showpass_calendar_widget label="Voir le calendrier" lang="fr"]` | **Voir le calendrier** | French unfiltered Standard Venue A calendar |
| AttractionTag | **Pages → Add New** | `[showpass_calendar_widget label="Buy Single Day Tickets" tags="Daily" is_attraction="true"]` | **Buy Single Day Tickets** | Attraction mode limited to the Daily attraction scope |
| AttractionEventId | **Pages → Add New** | `[showpass_calendar_widget label="Buy Tickets" is_attraction="true" event_id="{AttractionNumericId}"]` | **Buy Tickets** | SPW20023 Attraction Parent |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **WordPress Admin**, open Editor Location, add one Shortcode block containing Exact Shortcode, and publish it. | Selected ButtonExample | WordPress saves the shortcode in the mapped page/post and renders one button instead of shortcode text. |
| Open the page in a new private browser session. | Expected Button | The exact mapped label and default/custom visual class appear once. |
| Select the button. | — | Exactly one modern calendar modal opens. |
| Compare the modal with Expected Calendar. | Button-example mapping | The language, Standard/Attraction mode, venue/parent, and tag scope exactly match the mapping. |
| For Standard values, browse every applicable fixture date. | Unfiltered, Dino, or Dino-or-Family oracle | The exact mapped event set appears and no event is duplicated. |
| For Attraction values, select a ticket type, recorded date, and time slot. | Attraction Parent | The flow belongs to SPW20023 Attraction Parent and does not show the Standard venue calendar. |
| Continue to the first ticket/quantity action, then go Back. | Mapped event or attraction | The purchase flow belongs to the launched scope and returns to the same calendar mode. |
| Reload the WordPress page and launch the button again. | Same shortcode | The same mapped launch occurs once without an unfiltered or wrong-mode flash. |

### TC-20: Widget - Calendar - Verify every documented current WordPress embedded launch

**Priority:** High  
**Type:** Integration  
**Area:** Current WordPress embedded calendar

**Proof Target:** PT-0, PT-2

**Description:** Validates every current `[showpass_embed_calendar]` example documented for the modern WordPress calendar: default, single/multiple tags, French, and both Attraction examples.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Venue A's Organization ID is saved in WordPress.
* The Desktop run uses a content section at least 1200 px wide; the Mobile run uses the site's normal responsive content width.
* The WordPress domain is allowlisted on Beta and Venue A uses V2.

**Postconditions:**

* Remove every temporary WordPress page or post.
* Leave the basket empty.

**Tags:** widget, events, attraction

**Parameters:**

EmbedExample: Basic, SingleTag, MultipleTags, French, AttractionTag, AttractionEventId

**Embed-example mapping:**

| EmbedExample | Editor Location | Exact Shortcode | Expected Calendar |
| --- | --- | --- | --- |
| Basic | **Posts → Add New** | `[showpass_embed_calendar]` | English unfiltered Standard Venue A calendar |
| SingleTag | **Pages → Add New** | `[showpass_embed_calendar tags="dino"]` | Dino Only and Dino + Family |
| MultipleTags | **Pages → Add New** | `[showpass_embed_calendar tags="dino,family"]` | Exact three-event Dino-or-Family union |
| French | **Pages → Add New** | `[showpass_embed_calendar tags="dino" lang="fr"]` | French Dino-only Standard calendar |
| AttractionTag | **Pages → Add New** | `[showpass_embed_calendar tags="Daily" is_attraction="true"]` | Embedded Attraction mode limited to Daily scope |
| AttractionEventId | **Pages → Add New** | `[showpass_embed_calendar is_attraction="true" event_id="{AttractionNumericId}"]` | Embedded SPW20023 Attraction Parent |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **WordPress Admin**, open Editor Location, add one Shortcode block containing Exact Shortcode, and publish it. | Selected EmbedExample | WordPress saves the shortcode in the mapped page/post and reserves one embedded calendar location. |
| Open the page in a new private browser session and wait for loading. | Desktop: at least 1200 px content section; Mobile: normal responsive viewport | Exactly one modern calendar appears inside the page, no modal opens, and the calendar is not cut off by its content section. |
| Compare the embedded calendar with Expected Calendar. | Embed-example mapping | The language, Standard/Attraction mode, venue/parent, and tag scope exactly match the mapping. |
| For Standard values, browse every applicable fixture date. | Unfiltered, Dino, or Dino-or-Family oracle | The exact mapped event set appears with no duplicate or untagged leak. |
| For Attraction values, select a ticket type, recorded date, and time slot. | Attraction Parent | The embedded flow belongs to SPW20023 Attraction Parent. |
| Continue to the first ticket/quantity action. | Mapped scope | The purchase flow stays inside the WordPress embedded location. |
| Use Back, then reload the WordPress page. | Same shortcode | The same mode and scope mount once again without a wrong-mode or unfiltered flash. |

### TC-21: Widget - Calendar - Verify missing WordPress Organizer ID blocks every current shortcode

**Priority:** High  
**Type:** Negative  
**Area:** WordPress calendar prerequisite

**Proof Target:** PT-0

**Description:** Validates the exact documented missing-Organizer-ID outcome for both current WordPress calendar shortcodes and proves that restoring the ID recovers launch.

| Platform | View |
| --- | --- |
| Widget | Desktop |

**Preconditions:**

* Record Venue A's current WordPress Organization ID before changing it.
* The QA site has no page cache for the temporary test page.

**Postconditions:**

* Restore Venue A's Organization ID.
* Remove the temporary WordPress page.

**Tags:** widget, events, edge-case

**Parameters:**

MissingIdShortcode: CurrentButton, CurrentEmbed

**Missing-ID mapping:**

| MissingIdShortcode | Exact Shortcode |
| --- | --- |
| CurrentButton | `[showpass_calendar_widget tags="dino"]` |
| CurrentEmbed | `[showpass_embed_calendar tags="dino"]` |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In **WordPress Admin → Showpass API**, clear **Organization ID (required)** and select **Save Changes**. | Blank value | The settings page saves with the ID blank. |
| Create and publish a page containing Exact Shortcode. | Selected MissingIdShortcode | The page publishes. |
| Open the page in a new private browser session. | — | The page shows exactly `Please add your Showpass Organizer ID to your Wordpress Dashboard.` |
| Inspect the expected button/embed location. | — | No calendar button, embedded iframe, modal, or unfiltered Venue A event appears. |
| Restore Venue A's Organization ID and save. | Recorded ID | The settings page shows the restored ID. |
| Purge the page cache and reopen the same page in a new private session. | — | The mapped Dino button or embed now appears. |
| Open or browse the recovered calendar. | `tags=dino` | Only Dino Only and Dino + Family appear. |

### TC-22: Widget - Calendar - Verify multiple current WordPress calendars launch independently

**Priority:** High  
**Type:** Edge Case  
**Area:** Multiple current WordPress calendars

**Proof Target:** PT-0, PT-2

**Description:** Validates two modern WordPress calendar shortcodes on one page as two buttons, two embeds, or a mixed button/embed layout, with independent Dino and Family scopes.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

**Preconditions:**

* Venue A's Organization ID is configured.
* Venue A uses V2.
* The temporary page contains only the two mapped Showpass shortcodes.

**Postconditions:**

* Remove the temporary WordPress page.
* Leave the basket empty.

**Tags:** widget, events, edge-case

**Parameters:**

WordPressLayout: TwoButtons, TwoEmbeds, ButtonAndEmbed

**WordPress-layout mapping:**

| WordPressLayout | First Shortcode | Second Shortcode | Expected Page |
| --- | --- | --- | --- |
| TwoButtons | `[showpass_calendar_widget label="Open Dino" tags="dino"]` | `[showpass_calendar_widget label="Open Family" tags="family"]` | Two labelled buttons |
| TwoEmbeds | `[showpass_embed_calendar tags="dino"]` | `[showpass_embed_calendar tags="family"]` | Two independent embedded locations |
| ButtonAndEmbed | `[showpass_embed_calendar tags="dino"]` | `[showpass_calendar_widget label="Open Family" tags="family"]` | Dino embed plus Family button |

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a WordPress page with First Shortcode above Second Shortcode and publish it. | Selected WordPressLayout | WordPress saves both shortcodes in the mapped order. |
| Open the page in a new private browser session and wait for embedded calendars. | Expected Page | Exactly the mapped controls/locations appear; none is blank, duplicated, or replaced. |
| Open or browse the first Dino calendar. | First Shortcode | Only Dino Only and Dino + Family appear. |
| Close the first modal when applicable, then open or browse the second Family calendar. | Second Shortcode | Only Family Only and Dino + Family appear. |
| Select Dino Only in the Dino calendar, then Family Only in the Family calendar. | Two distinct events | Each selection remains associated with its own modal or embedded location. |
| Reload the page and initialize the Family calendar before the Dino calendar. | Reverse order | Both launch targets and tag scopes remain independent. |
| Check the number and placement of visible calendars after the reverse run. | Selected layout | The page still contains exactly the mapped button/embed count with no takeover or duplicate iframe. |

## Minimum Execution Set

Because the clarified goal is every current partner-site and WordPress launch, the launch gate is:

- TC-4 and TC-5 in full for the basic Standard modal/embed signatures.
- TC-15 for every ModalLaunch value.
- TC-16 for every EmbedLaunch value.
- TC-17 for both AttractionModal values.
- TC-18 for every AttractionEmbed value.
- TC-19 for every ButtonExample value.
- TC-20 for every EmbedExample value.
- TC-21 for both MissingIdShortcode values.
- TC-22 for every WordPressLayout value.

The tag-fix gate also requires TC-2 and TC-3 in full. Run TC-6 before approving multiple SDK embeds; run TC-8, TC-9, TC-10, and TC-13 before declaring V2 state/cache coverage complete. TC-1, TC-11, TC-12, and TC-14 remain required for the full tag regression.

## Suggested Automated Coverage

| Priority | Layer | Automated Proof |
| --- | --- | --- |
| P0 | Backend integration | Create Dino-only, Family-only, Dino+Family, and untagged events; execute the real V2 query and assert the exact three-ID union with Dino+Family once. |
| P0 | Backend integration | Assert the deduplicated Dino+Family response retains price ranges, lowest price, date, and special-event fields. |
| P0 | Frontend route/component | Change one mounted V2 calendar from `state-dino` to `state-family` and no-match; assert date, event, package, quantity, and continue state reset. |
| P1 | SDK integration | Exercise current modal and third-argument container signatures with `tags=dino,family`; assert exact iframe count and event IDs. |
| P1 | SDK integration | Mount Dino and Family calendars in unique containers and assert independent selection and ticket transitions. |
| P1 | SDK initialization | Run Standard and Attraction launch harnesses while DOM is loading, after DOM readiness, and after delayed SDK availability; assert one terminal iframe. |
| P1 | SDK contract | Cover Standard and Attraction modal/embed calls with theme, language, required ticket type, quantity prompt, missing Venue ID, and missing container assertions. |
| P1 | WordPress integration | Render every documented current button/embed shortcode example and assert label, class, language, scope, mode, parent, and launch location. |
| P1 | WordPress integration | Render two current buttons, two current embeds, and mixed button/embed pages; assert independent targets and event scopes. |
| P1 | Backend model | Add, replace, and remove a recurring parent's tag; assert every child tag set and V2 result changes together. |
| P1 | Frontend cache | Run single→two→single, Dino→Family→Dino, and Venue A→Venue B→Venue A sequences with no stale event render. |
| P1 | Backend integration | Create a non-Event tagged object with the same numeric ID as an untagged Event and prove the Event does not match through the generic tag relation. |
| P2 | Contract test | Assert missing, blank, unknown, empty-token, 1024-character, and 1025-character response status and IDs. |
| P2 | Performance | Measure high-cardinality matching before and after deduplication once an acceptance threshold is approved. |

## Open Questions

These are deliberately not manual cases because the expected result is not source-authoritative:

1. Must `tags=dino, family` equal `tags=dino,family`, or are integrations required to omit whitespace after the comma?
2. Can a literal comma be saved inside one event tag, and if so, how is it represented without becoming two requested tags?
3. Are repeated API keys such as `tags=dino&tags=family` supported, or is comma-separated input the only API contract?
4. Does any current customer-facing contract intend `tags=Family Friendly` to match an event category, or only the event's Tags field?
5. What is the maximum event-tag length that can actually be saved through the current Dashboard and API?
6. What response-time threshold should the high-cardinality V2 fixture enforce?
7. After an organizer edits a tag, is hard refresh the supported visibility boundary, or must every already-open V2 calendar invalidate immediately?
8. Must the current WordPress Attraction `event_id` be the numeric parent ID shown in the WordPress guide or the event slug required by the SDK guide?
9. Is WordPress intentionally allowed to combine `tags` with Attraction mode even though the SDK guide defines tag filtering for Standard Calendar?
10. Which released WordPress plugin version implements the current guide's `lang`, `is_attraction`, and `event_id` examples? Checked-in shortcode source does not consume those values.
11. If the SDK never becomes available, what terminal user-visible state and retry limit should a production partner page provide?
12. Are multiple current WordPress embeds on one page supported? The guide does not limit shortcode count, but checked-in source reuses one embedded container ID.

## Readiness Statement

This revision accounts only for the new flag-on calendar and maps every current SDK/WordPress launch found in the two supplied public guides to an executable case. It removes old calendar, cached SDK, deprecated-route, and legacy WordPress execution. The primary two-tag case has an exact clean-state oracle.

Design status is **Review-ready**, not execution-complete. No case has been executed. `Covered` means the launch or edge is represented by a complete draft case; execution evidence is still required before release sign-off.
