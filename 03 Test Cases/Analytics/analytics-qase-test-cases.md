---
title: Analytics — Qase-ready cases and coverage review
date: 2026-11-11
tags:
  - qa/analytics
  - qa/qase
status: Approved batch published and verified; six revisions remain pending; tests not executed
---

# Analytics — Qase-ready cases and coverage review

Reviewed the live definitions and saved parameters of all **24 cases** in the Internal, Google and Facebook analytics suites, plus eight related cases. The approved batch is now published: **five existing cases updated and four new cases created**, with saved content and Single parameters verified. The other four existing-case revisions and two new Organization-provider drafts remain pending. **No browser tests, purchases, voids or automation mapping changes occurred.**

Showpass providers now have separate cases: **[GA4 SPT-5960](https://app.qase.io/case/SPT-5960), [Ads SPT-5964](https://app.qase.io/case/SPT-5964), [Meta SPT-5965](https://app.qase.io/case/SPT-5965), [GTM SPT-5966](https://app.qase.io/case/SPT-5966)**. The calendar check is **[SPT-5967](https://app.qase.io/case/SPT-5967)**. SPT-3324 still combines Organization GA4, Ads and GTM because its zero-total coverage must be preserved before that split. Existing unsupported or unresolved coverage remains visible below.

We are testing whether Customers' discovery and checkout actions are recorded against the right destination, item and completed order. Missing, premature or duplicate events can misstate browsing, sales and advertising results. Proof comes from independently known catalog/order data, action-timed browser requests and, where required, the matching Google queue. Provider processing and internal warehouse storage require separate proof.

## Cases — published and pending

Each case states whether its fields have been published or remain a local draft. The coverage table identifies retained checks that still block replacing a broader live case. Configuration and test-payment prerequisites must be confirmed before a later execution. The review did not inspect Admin or establish any Organization's live saved settings. Destination values below are beta references; a different environment needs its approved destination IDs.

### SPT-3316: Homepage internal interactions

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** WebPublic - Analytics - Record homepage search and Top Events interactions

**Description:**

Given a signed-out Customer on the Showpass homepage, verify that the selected search, city or card produces the correct internal Showpass request. Run each Scenario independently from a fresh homepage visit.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

SearchIcon is Desktop only. All other values apply to both views. For every request below, use Network → All, Preserve log and the filter `analytics/internal/add`. Check a POST to the current Showpass origin, HTTP 200, `app_source: NextJS`, the actual `requested_url` and a string `referrer`; an empty referrer is valid. Compare identities with the selected result in the `public/discovery` response, rather than another analytics request.

| Scenario | Customer action | Analytics to inspect immediately afterward |
| --- | --- | --- |
| SearchTyping | Enter the complete prepared Event name; open search first on Mobile. | Type 7, label `home_page`, `custom_params.search_string` equals the entered name after suggestions update. |
| SearchResult | Enter the Event name, then choose its search suggestion. | Type 5, `search-result-item`, selected Event/Venue IDs and `item_id`, `item_type: event`, `is_sponsored`, `button_text`; separate `EVENT` type 1 and type 6 requests identify the opened Event. |
| SearchIcon | On Desktop enter the name, close suggestions and select Search. | Type 5, `search-button-homepage`, homepage requested URL. |
| CityPills | Select every displayed city pill under Top Events, one at a time. | Type 5, label `city-pill-button-<normalized city>`, `button_text` equals that pill; normalize by lowercasing and replacing each whitespace character with a hyphen. |
| EventCard | Under Top Events select a city and open a displayed card. | Type 5, `discovery-event-card`, selected identity, Venue ID and item/text/sponsored fields; the destination has its own type 1 and type 6 requests for the same Event or Membership. |
| CardImpression | Under Top Events select a city and scroll a card's details into view. | Type 6, item identity and sponsored fields; Venue ID comes from the discovery item's nested `venue.id`. A label is not required. |

For an Event card, `event_id` equals `item_id` and `membership_id` is null. For a Membership card, `membership_id` equals `item_id` and `event_id` is null. Card clicks use the item's top-level `venue_id`. SearchResult page views include the prepared Event's branding values (`has_branding`, `branding_color_mode`, `branding_layout_preset`). Opening a discovery card preserves its `source_channel=discovery` link. A card impression is recorded once per mount; start a fresh visit to repeat that card. Do not require retired homepage/type 1 tracking or assume every keystroke has an independent search event.

**Preconditions:**

* The Customer is signed out and has an empty basket.
* Select a published Event returned by homepage search; record its full name, Event ID, Venue ID and branding values from its public response.
* Top Events has city pills and a card for the chosen city; record that card's discovery response before using it.
* The customer-scoped `track_button_click` feature flag is ON; the `internal_analytics` backend switch is ON. Have the setup owner confirm these values without changing them during the case.
* DevTools is recording Network → All before opening the homepage. Record the browser, environment and chosen Scenario.

**Postconditions:**

* Retain the selected request fields and HTTP results without contact details, cookies, signatures or private receipt links.
* No business records change; only browsing and analytics requests occur.

**Tags:** analytics, public, home-page

**Parameters:**
Scenario: SearchTyping, SearchResult, SearchIcon, CityPills, EventCard, CardImpression

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Showpass homepage while signed out. | Selected Desktop or Mobile view. | Homepage navigation, search and Top Events are available. |
| Perform the selected Scenario's customer action and inspect its new requests before another action. | The action and exact expected fields in this case's Scenario table. | The visible result matches the chosen item and every declared request returns HTTP 200 with its matching identity, source and page context. |

### SPT-3319: City and category internal interactions

Publication: **Pending local revision; not applied to Qase and not executed.**

**Title:** WebPublic - Analytics - Record city and category card impressions and clicks

**Description:**

Given a city with published Events, verify that viewing cards and opening an Event records the city or category the Customer actually used.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| Scenario | Starting list after the city check | Required page context |
| --- | --- | --- |
| CityEvent | Stay on the chosen city's Event list. | `<city name> City Landing Page`. |
| CategoryEvent | Select the prepared category pill, then use its Event list. | City impressions use `<city name> City Landing Page`; category impressions use `<city name> \| <category_id>`. Obtain category_id from the category response. |

Use DevTools Network → All, Preserve log, filter `analytics/internal/add`. Each declared call is a distinct same-origin POST with HTTP 200, `app_source: NextJS`, its current `requested_url` and string `referrer`. A card impression is type 6 with Event/Venue IDs, null membership ID and `item_id`, `item_type: event`, `is_sponsored`, `page_name`. A click is type 5, label `discovery-event-card`, with the clicked card's identity, sponsored state and displayed `button_text`. The opened Event separately sends `EVENT` type 1 and type 6, with the same independently known Event ID, Venue ID and `purchase_source_platform: psp_web`.

**Preconditions:**

* The Customer is signed out and can open the homepage's city choices.
* Choose a city and category with published Event cards. Record their names, category ID and one card's Event/Venue IDs from the discovery response.
* The customer-scoped `track_button_click` flag and backend `internal_analytics` switch are ON, confirmed by the setup owner.
* Open DevTools and preserve Network requests before navigation.

**Postconditions:**

* The card, click and loaded Event are correlated using the independent discovery response.
* No purchase or configuration change occurs; preserve sanitized request evidence.

**Tags:** analytics, public, discovery

**Parameters:**
Scenario: CityEvent, CategoryEvent

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| On the Showpass homepage, open the prepared city using its city link. | Recorded city name. | The matching city heading and Event cards appear. |
| Scroll the prepared city card into view and inspect its impression. | The city impression contract in Description. | A type 6 request identifies that card and the correct city page context, with HTTP 200. |
| Open the selected Scenario's list and bring its prepared card into view. | CityEvent stays on the city list; CategoryEvent selects the recorded category pill. | The intended list appears; CategoryEvent also sends its own type 6 impression with the category context and HTTP 200. |
| Select the prepared Event card and inspect the new requests. | Recorded card identity and displayed text. | The click plus distinct Event page-view and view-content requests return HTTP 200 for the correct Event; the destination retains discovery attribution. |

### SPT-3321: Public internal checkout

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Public Checkout - Analytics - Record a ticket purchase for guest and signed-in Customers

**Description:**

Given one published single-day Event, verify the Customer's homepage search, selected tickets, checkout screens and successful purchase are recorded internally against the same basket and confirmed order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |

| CustomerState | Preparation and identity action | Required checkout identity result |
| --- | --- | --- |
| Guest | Start signed out; choose Continue as guest, enter name/email/phone and confirm the email. | Initial basket request, `step: login`, guest authentication-method impression, `step: login_completed` with `type: guest`, then `step: addons`. |
| Authenticated | Sign into the prepared Customer account before homepage search; continue with that account. | Initial basket request, `step: login_bypassed`, `type: account`, `method: validated_session`, then `step: addons`; login and guest-entry controls are hidden. |

Use Network → All, Preserve log and `analytics/internal/add`. All calls below are same-origin POSTs with HTTP 200, `app_source: NextJS`, actual document `requested_url` and string `referrer`. Checkout/purchase calls have the saved Basket ID, selling Venue ID, the selected Event in `event_ids_for_conversions`, empty product/membership arrays and `purchase_source_platform: psp_web`. Checkout screens use **label `initiate_checkout`, type 3, with `custom_params.step`**; do not expect invented `checkout_step_view_*` labels.

The initial checkout request has `datum: basket_size`, `type: initial`, `basket_size: 2`, `collect_info_post_purchase: false` and order-form complexity matching the prepared Event. Purchase is label `purchase`, type 4, amount equal to the paid basket/confirmed invoice; `item_quantity: 2`, `invoice_id`, `showpass_fees`, `cc_fees`, `express_checkout_used` and `refund_protection_purchased` match independent order responses. A successful ingress response proves acceptance, not ClickHouse storage.

**Preconditions:**

**Event and Customer**

* One published single-day Event has a public fixed-price ticket with Inventory for two tickets; no assigned seats, packages or required custom questions.
* Record the Event/Venue/ticket-type IDs, ticket name, unit price, exact fee/tax breakdown and total from the prepared catalog and pricing rules. The same Event collects Customer details before purchase.
* The CustomerState account can buy two tickets without exceeding its Customer ticket limit, including earlier retained orders.
* The setup owner confirms `internal_analytics = ON` and customer-scoped `track_button_click = ON`.

**Payment and evidence**

* Use an approved sandbox payment gateway, its accepted test card and billing address; record the expected fees and total before starting so no real card is charged.
* Keep refund protection unselected and use ordinary card entry rather than an express wallet. Record any required Terms and Conditions text.
* Have controlled Customer contact details. Open DevTools before homepage search; record the independent basket and invoice responses, without recording payment/contact secrets.

**Postconditions:**

* Retain the one completed sandbox order without voiding it. Record its Invoice ID separately from the Basket ID and order number.
* Preserve each step's expected/actual analytics and response status; record the confirmed Invoice ID as soon as the invoice response arrives, even if later confirmation checks fail.
* Confirmation advertising is assessed separately; reaching the receipt alone does not prove Rokt or ad impressions.

**Tags:** analytics, public, checkout

**Parameters:**
CustomerState: Guest, Authenticated

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Showpass homepage in the prepared CustomerState and search the full Event name. | Prepared Event name; use the mobile search control on Mobile. | Suggestions include the Event; `home_page` type 7 records the exact search string with HTTP 200. |
| Choose the prepared Event from the suggestions. | Recorded Event and Venue IDs. | The Event opens; `search-result-item` type 5 and separate `EVENT` type 1/type 6 calls identify it and return HTTP 200. |
| Select Buy Tickets. | Prepared Event. | Ticket selection opens; `detail-page-buy-button` type 5 and `view_items` type 6 identify the Event; view_items has `capi_should_trigger: false`. |
| Choose two of the prepared ticket type. | Quantity 2. | The saved basket has those two tickets; `add_to_cart` type 2 has that Basket ID, ticket-type ID and `item_variant_id`, `item_type: ticket`, count 2 and web source. |
| Select Checkout and inspect the initial and identity requests. | CustomerState mapping in Description. | Initial basket and selected identity-path calls return HTTP 200 with matching basket and Event identities. |
| Complete the selected CustomerState's contact action. | Guest enters and confirms controlled contact details; Authenticated continues with the displayed account. | Checkout reaches Add-ons with the mapped identity completion and addons requests; no purchase is sent. |
| Continue without optional add-ons. | Leave additional items unselected. | Review contains the two tickets and expected amounts; `initiate_checkout`, type 3, `step: review` returns HTTP 200. |
| Continue from review to payment and complete the card form. | Prepared sandbox card, billing address and required Terms and Conditions. | `step: payment` returns HTTP 200 with refund-protection eligibility/enabled/not-shown fields consistent with the offer; no purchase has fired. |
| Select Complete transaction once. | One submission. | The button click is type 5 with label `complete-transaction-button` and zero prior payment failures; one confirmed order appears and its purchase fields match the independent paid basket and invoice. |

### SPT-3322: Single-day Widget internal checkout

Publication: **Pending local revision; not applied to Qase and not executed.**

**Title:** Widget - Analytics - Record a single-day guest ticket purchase

**Description:**

Given a single-day Event displayed inside a Showpass Widget, verify guest selection and checkout requests belong to the Widget frame and the same completed order. A Widget is Showpass checkout displayed inside another website.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

| WidgetMode | Required entry |
| --- | --- |
| Modal | Use the host's ticket button to open checkout over the host page. |
| Embedded | Use checkout already displayed inside the host page. |

Use DevTools Network → All, Preserve log and `analytics/internal/add`. Inspect the initiating document/frame; parent-page traffic cannot satisfy a Widget check. In Console choose the Widget frame before inspecting its URL or queues. Every declared request is a Showpass-origin POST, HTTP 200, `app_source: NextJS`, string `referrer` and the actual Widget document `requested_url`; checkout/purchase data uses `purchase_source_platform: psp_widget`.

Entry has separate `EVENT` types 1 and 6 and `view_items` type 6; view_items has `capi_should_trigger: false`. Add-to-cart is type 2 with selected Event/Venue/ticket-type IDs, the saved Basket ID and count 2. All subsequent `initiate_checkout` type 3 requests retain the same Basket ID, Event conversion array and empty product/membership arrays. Their steps are login, login_completed (`type: guest`), addons, review and payment; the initial request has `datum: basket_size`, `type: initial`, `basket_size: 2`. Payment records refund-protection eligibility, enabled state and not-shown reason. Purchase is type 4, `purchase`, and matches the invoice/paid basket's full amount, fees, quantity, Invoice ID and payment/protection flags. This single-day path does not open a calendar or ticket-type-first attraction screen.

**Preconditions:**

* One published single-day Event has two available fixed-price tickets of one type, no assigned seats/packages/custom questions, and collects Customer details before purchase.
* Record its name, Event/Venue/ticket-type IDs, quantity 2, price, fees, taxes and full total from the prepared catalog and pricing rules.
* Have a host page for each WidgetMode, or the Organization slug and Event slug for the [Widget tool](https://spwidgettool.netlify.app/). Confirm the intended environment and Organization before loading it.
* Customer is signed out. Have controlled contact details, accepted sandbox card/billing details and any required Terms and Conditions; keep optional refund protection unselected.
* Setup owner confirms `internal_analytics = ON` and customer-scoped `track_button_click = ON`.
* DevTools records before opening the Widget. The sandbox gateway prevents a real card charge; the order is to be retained.

**Postconditions:**

* Retain one completed sandbox order without voiding it; record Invoice ID, Basket ID and WidgetMode.
* Keep per-action request/status evidence and the confirmed Invoice ID even if a later receipt or advertising check fails.
* Do not treat this as authenticated Widget, calendar or attraction coverage.

**Tags:** analytics, widget, checkout

**Parameters:**
WidgetMode: Modal, Embedded

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared host page and its Event in the selected WidgetMode. | In the Widget tool enter the prepared Organization slug, choose Modal or Embedded, then load the prepared Event. | The intended ticket selector appears; separate EVENT page/view-content and view_items requests come from its frame with the correct Event, Venue and Widget source. |
| Choose two tickets of the prepared type in the Widget. | Quantity 2. | Basket response and add_to_cart agree on basket, Event, ticket type, quantity and Widget source. |
| Select Continue in the Widget. | Keep the two-ticket basket. | The initial-basket and login-step requests return HTTP 200 for that basket; guest contact entry opens. |
| Enter guest contact details and confirm the email. | Controlled name, email and phone. | login_completed with type guest and a separate addons request return HTTP 200 from the Widget. |
| Continue without add-ons. | Leave extra items unselected. | The review step records HTTP 200 and displays the selected tickets and prepared total. |
| Continue to payment and complete card, billing and required terms. | Prepared sandbox payment details. | The payment-step request matches the basket and protection state; no purchase has fired. |
| Select Complete transaction once. | One submission. | The complete-transaction-button click is recorded; one confirmed order appears and purchase matches its independent basket, invoice, fees, quantity and amount. |

### SPT-5967: Widget calendar internal view

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Widget - Analytics - Record the calendar view with its Organization and Widget mode

**Description:**

Given an Organization's legacy-compatible calendar Widget, opening its Event Calendar records the actual calendar context without claiming a purchase occurred.

| Platform | View |
| --- | --- |
| Widget | Desktop |
| Widget | Mobile |

| WidgetMode | Entry and expected context |
| --- | --- |
| Modal | Open the host's calendar button; `custom_params.is_embedded: false`. |
| Embedded | Open the host page containing the calendar; `custom_params.is_embedded: true`. |

Use Network → All, Preserve log and `analytics/internal/add`. The current calendar adapter calls the view-content path: expect **type 6, label `calendar`**, rather than the old case's type 1. Check the configured Venue ID, `sdk_widget: true`, `widget_venue_id`, `is_attraction` for the supplied calendar, Widget source and the actual frame URL. For an Event-bound calendar also check the supplied numeric Event ID and `widget_event_id`. A venue-only calendar has no invented Event ID. The response is HTTP 200 with `app_source: NextJS` and string referrer. One mounted calendar context must not record repeated calendar views just because unrelated content updates.

**Preconditions:**

* Have the prepared Organization's host calendar page for each WidgetMode, with available dates and the legacy-compatible calendar selected by its supported rollout configuration.
* Record the Organization slug/Venue ID, whether the calendar is Event-bound, its supplied Event ID when present and whether it is an attraction calendar. Obtain these from the host setup and public calendar/Venue responses.
* Setup owner confirms `internal_analytics = ON`; no Admin access or rollout changes are part of this case.
* Start signed out with DevTools open before the host loads; identify the calendar frame.

**Postconditions:**

* No tickets are added and no order is created. Close the Modal after capture or leave the Embedded host.
* Preserve sanitized calendar context and HTTP evidence; this does not prove timeslot selection or checkout.

**Tags:** analytics, widget, discovery

**Parameters:**
WidgetMode: Modal, Embedded

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared calendar host and display Event Calendar in the selected WidgetMode. | Prepared Organization/calendar setup. | The calendar is visible and one new calendar type 6 POST identifies the actual frame, Organization and selected mode, with HTTP 200. |
| Inspect the new request while leaving date and ticket choices unchanged. | The context mapping in Description. | Event-bound and attraction fields match the supplied calendar; no add_to_cart or purchase is attributed to merely viewing it. |

### SPT-5960: Showpass GA4 checkout

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Core - Analytics - Record Showpass GA4 ticket checkout events

**Description:**

Verify that a Customer's selected tickets and completed order reach Showpass's GA4 destination. Inspect only that owner/provider; another destination cannot satisfy a check. Run each PurchaseScenario separately with a new basket and one retained sandbox order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

Use only the listed dependent scenarios; do not create an authenticated Widget pairing. Single-day and recurring ticket checkout share these steps once the performance is chosen. Seat selection, package selection, Product variants and Membership enrollment have different preparation/journeys and are outside this ticket case.

| PurchaseScenario | Complete setup and entry |
| --- | --- |
| SingleDayGuest | One published single-day Event; signed-out Customer on its public page. Select Buy Tickets, then one fixed-price ticket. |
| SingleDayAccount | The same single-day setup on the public site; sign in before opening the Event. Select Buy Tickets, then one ticket; checkout bypasses guest/login entry. |
| SingleDayModal | One single-day Event; signed-out Customer opens the host ticket button in Modal Widget mode and selects one ticket. |
| SingleDayEmbedded | One single-day Event; signed-out Customer uses its Embedded Widget and selects one ticket. |
| RecurringGuest | One published recurring listing with at least two purchasable performances; signed-out public Customer selects Buy Tickets, then the recorded date/time and one ticket from that performance. |

Use DevTools **Network → All → Preserve log**, filter `g/collect`, and check query parameters plus POST bodies. Destination is `tid=G-VC5L0K1EMG`; event is `en`; document is `dl`. Require **HTTP 204**. Inspect `cu` for currency, `epn.value` or `ep.value`, `pr1`, `pr2`, … for item ID/name/variant/category/price/quantity, and purchase `ep.transaction_id` or `epn.transaction_id`. A request may batch events. Also expand the Widget frame's or public page's `window.dataLayer` in Console: each ecommerce `gtag('event', …)` has `send_to=G-VC5L0K1EMG` and matching items/value. Read the existing queue; do not push synthetic events.

`view_item` describes **all ticket types supplied to the selected performance's selector**, quantity one each; value is their summed unit prices. `add_to_cart` describes only the selected ticket and its pre-fee subtotal. `begin_checkout` and `purchase` describe only the ordered ticket, full basket value, currency and the applicable item fields. Purchase tax, shipping and coupon fields match the independent order when present. Purchase transaction ID equals the confirmed invoice response's **transaction_id**, which is the order reference, rather than assuming it is the numeric Invoice ID.

For Google, the measured ecommerce sequence is `view_item → add_to_cart → begin_checkout → purchase`; for Meta it is `ViewContent → AddToCart → InitiateCheckout → Purchase`. Inspect the complete prefix after every action. Earlier milestones must not repeat and future milestones must not fire early. Inspect through completion of confirmation and any required post-purchase answers. This observation ends there; it does not prove absence of arbitrarily late sends. Automatic page_view/engagement events are outside the four-event sequence. A Google queue entry and its delivery request are different observations of one event, not duplicate emissions.

**Preconditions:**

**Destination and browser**

* A setup owner confirms Showpass's environment destination **G-VC5L0K1EMG** is active and the Organization's corresponding custom GA4 destination is blank. Check the existing setup without editing it during this case.
* Measurement is permitted in the selected browser session and no blocker prevents the intended tag from loading. Record browser/version, privacy mode, destination and, for Widgets, host and frame URL. A blocked loader is a named execution blocker, not downstream provider failure.
* Open DevTools before navigation; use Network → All and Preserve log. For Widget scenarios select its frame in Console before reading its queue.

**Event, Customer and payment**

* Prepare exactly one Event listing for the selected PurchaseScenario. A recurring listing has at least two dated performances; record the chosen date/time, listing ID and selected performance ID separately.
* Record the selector's catalog ticket IDs, names, variants and unit prices from its public Event response, independently of analytics. Buy **one** fixed-price ticket; no assigned seats, packages, shipping, discounts or optional protection.
* Record the expected selected ticket price, fees, taxes, currency and full total from the saved pricing rules before checkout. Do not calculate expectations from the analytics being tested.
* Use a sandbox gateway and its accepted card/billing details so the purchase charges no real card. Have controlled Customer and Attendee details plus every required answer/acknowledgement for this Event.
* For SingleDayAccount, sign in before opening the Event and confirm the account can buy one more ticket under its cumulative Customer ticket limit. Other scenarios start signed out.
* For Widget scenarios have the prepared host page, or the Organization slug and Event for the [Widget tool](https://spwidgettool.netlify.app/); confirm environment/Organization and choose the scenario's mode before loading the Event.

**Postconditions:**

* Retain one completed sandbox order without voiding it. Record Invoice ID, Basket ID and confirmed transaction_id/order reference separately; they are execution evidence rather than scenario parameters.
* Record the confirmed Invoice ID immediately when it is returned, before later attendee, receipt or analytics checks can fail. Keep the per-action Actual Result evidence on its corresponding step.
* Preserve only required analytics/order fields and HTTP results; exclude contact/payment data, cookies, credentials, signed headers and receipt access links.
* Browser delivery and queued events do not prove processed provider reports, internal warehouse storage or server-side CAPI delivery.

**Tags:** analytics, google, checkout

**Parameters:**
PurchaseScenario: SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public Event page or Widget for PurchaseScenario. | The exact entry and Customer state in Description; a Widget opens directly in selection. | The intended Event/frame is displayed; for public entry, one path-scoped page_view reaches the selected GA4 destination with HTTP 204; no cart, checkout or purchase event has fired. |
| Open the intended performance's ticket selection and inspect its entry events before changing quantity. | Public: Buy Tickets; recurring: choose the recorded date/time; Widget: use the displayed selector or its prepared date choice. | One view_item reaches that destination with HTTP 204 and matches the recorded performance catalog, quantity one per listed type, currency and summed unit prices in both collection and queue. |
| Choose one of the prepared ticket type. | Quantity 1; recorded ticket identity, price and charges. | The saved basket identifies the selected performance and ticket; one add_to_cart reaches that destination with HTTP 204; collection and queue match the selected ticket ID/name/variant, quantity 1, unit price, currency and pre-fee value. |
| Select Checkout on the public site or Continue in the Widget. | Keep the selected basket. | Checkout opens; one begin_checkout reaches that destination with HTTP 204 and matches the selected ticket, quantity, currency and full basket total in collection and queue. |
| Complete Customer details for the selected scenario. | Signed-out scenarios use Continue as guest or the Widget's guest form and confirm controlled contact details; SingleDayAccount continues with its signed-in account. | Checkout accepts the Customer; the four-event prefix has not repeated and purchase is absent. |
| Continue without optional add-ons and review the order. | Recorded performance, ticket, quantity, fees, taxes, currency and total. | The summary matches the independently prepared amounts; no extra funnel event or premature purchase is sent. |
| Complete the displayed required ticket answers or acknowledgements and advance to payment. | The Event's prepared required answers; keep optional protection unselected. | The required answers are accepted without another cart/checkout/purchase milestone. |
| Enter the accepted test card and billing details. | Prepared sandbox payment details. | The payment form is ready; no purchase or repeated earlier milestone has fired. |
| Select Complete transaction once. | One submission; record the independent invoice and paid-basket responses immediately. | One order confirms; one purchase returns HTTP 204 with the confirmed transaction_id, selected ticket, quantity, currency and order value in collection and queue; independently confirmed invoice and paid basket identify the same order. |
| Complete any required post-purchase Attendee questions and inspect the final recorded sequence. | Enter the prepared details for the person using the ticket; keep the same order. | Confirmation shows the correct ticket and order; the selected destination has exactly the intended four-event sequence with no second purchase from saving answers. |

### SPT-5964: Showpass Google Ads checkout

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Core - Analytics - Record Showpass Google Ads ticket checkout events

**Description:**

Verify that a Customer's selected tickets and completed order reach Showpass's Google Ads destination. Inspect only that owner/provider; another destination cannot satisfy a check. Run each PurchaseScenario separately with a new basket and one retained sandbox order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

Use only the listed dependent scenarios; do not create an authenticated Widget pairing. Single-day and recurring ticket checkout share these steps once the performance is chosen. Seat selection, package selection, Product variants and Membership enrollment have different preparation/journeys and are outside this ticket case.

| PurchaseScenario | Complete setup and entry |
| --- | --- |
| SingleDayGuest | One published single-day Event; signed-out Customer on its public page. Select Buy Tickets, then one fixed-price ticket. |
| SingleDayAccount | The same single-day setup on the public site; sign in before opening the Event. Select Buy Tickets, then one ticket; checkout bypasses guest/login entry. |
| SingleDayModal | One single-day Event; signed-out Customer opens the host ticket button in Modal Widget mode and selects one ticket. |
| SingleDayEmbedded | One single-day Event; signed-out Customer uses its Embedded Widget and selects one ticket. |
| RecurringGuest | One published recurring listing with at least two purchasable performances; signed-out public Customer selects Buy Tickets, then the recorded date/time and one ticket from that performance. |

Use DevTools **Network → All → Preserve log**, filter `ccm/collect`, destination `tid=AW-780079083`, event `en`, document `dl`; inspect query and POST fields. The reviewed beta contract requires **HTTP 200**, currency `ep.currency`, value `epn.value`, and purchase `ep.transaction_id`. The Ads collector does **not** expose this journey's full item array. Inspect the public page's or Widget frame's `window.dataLayer` in Console for `gtag('event', …)` entries with **send_to=AW-780079083**; compare their item IDs/names/variants/categories, quantities, unit prices, currency and values with the independent catalog/basket. Read queued entries without adding events.

`view_item` includes all ticket types supplied to the selected performance's selector, quantity one each, with summed unit prices. `add_to_cart` has only the selected ticket and pre-fee value. `begin_checkout` and `purchase` use the ordered ticket and full basket value; queued purchase tax/shipping/coupon fields match the independent order when present. Purchase transaction ID matches the invoice response's **transaction_id in both wire and queue**. Keep numeric Invoice ID separately. Additional Google remarketing/view-through requests may coexist; record them separately. A bare AW ID does not establish a conversion-action label or require an extra `conversion` event.

For Google, the measured ecommerce sequence is `view_item → add_to_cart → begin_checkout → purchase`; for Meta it is `ViewContent → AddToCart → InitiateCheckout → Purchase`. Inspect the complete prefix after every action. Earlier milestones must not repeat and future milestones must not fire early. Inspect through completion of confirmation and any required post-purchase answers. This observation ends there; it does not prove absence of arbitrarily late sends. Automatic page_view/engagement events are outside the four-event sequence. A Google queue entry and its delivery request are different observations of one event, not duplicate emissions.

**Preconditions:**

**Destination and browser**

* A setup owner confirms Showpass's environment destination **AW-780079083** is active and the Organization's corresponding custom Google Ads destination is blank. Check the existing setup without editing it during this case.
* Measurement is permitted in the selected browser session and no blocker prevents the intended tag from loading. Record browser/version, privacy mode, destination and, for Widgets, host and frame URL. A blocked loader is a named execution blocker, not downstream provider failure.
* Open DevTools before navigation; use Network → All and Preserve log. For Widget scenarios select its frame in Console before reading its queue.

**Event, Customer and payment**

* Prepare exactly one Event listing for the selected PurchaseScenario. A recurring listing has at least two dated performances; record the chosen date/time, listing ID and selected performance ID separately.
* Record the selector's catalog ticket IDs, names, variants and unit prices from its public Event response, independently of analytics. Buy **one** fixed-price ticket; no assigned seats, packages, shipping, discounts or optional protection.
* Record the expected selected ticket price, fees, taxes, currency and full total from the saved pricing rules before checkout. Do not calculate expectations from the analytics being tested.
* Use a sandbox gateway and its accepted card/billing details so the purchase charges no real card. Have controlled Customer and Attendee details plus every required answer/acknowledgement for this Event.
* For SingleDayAccount, sign in before opening the Event and confirm the account can buy one more ticket under its cumulative Customer ticket limit. Other scenarios start signed out.
* For Widget scenarios have the prepared host page, or the Organization slug and Event for the [Widget tool](https://spwidgettool.netlify.app/); confirm environment/Organization and choose the scenario's mode before loading the Event.

**Postconditions:**

* Retain one completed sandbox order without voiding it. Record Invoice ID, Basket ID and confirmed transaction_id/order reference separately; they are execution evidence rather than scenario parameters.
* Record the confirmed Invoice ID immediately when it is returned, before later attendee, receipt or analytics checks can fail. Keep the per-action Actual Result evidence on its corresponding step.
* Preserve only required analytics/order fields and HTTP results; exclude contact/payment data, cookies, credentials, signed headers and receipt access links.
* Browser delivery and queued events do not prove processed provider reports, internal warehouse storage or server-side CAPI delivery.

**Tags:** analytics, google, checkout

**Parameters:**
PurchaseScenario: SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public Event page or Widget for PurchaseScenario. | The exact entry and Customer state in Description; a Widget opens directly in selection. | The intended Event/frame is displayed; for public entry, one path-scoped page_view reaches the selected Ads destination with HTTP 200; no cart, checkout or purchase event has fired. |
| Open the intended performance's ticket selection and inspect its entry events before changing quantity. | Public: Buy Tickets; recurring: choose the recorded date/time; Widget: use the displayed selector or its prepared date choice. | One view_item is delivered with HTTP 200; the Ads-destination queue matches every recorded catalog ticket, quantity one each, currency and summed unit value. |
| Choose one of the prepared ticket type. | Quantity 1; recorded ticket identity, price and charges. | The saved basket identifies the selected performance and ticket; one add_to_cart is delivered with HTTP 200 and correct wire currency/value; its Ads-destination queue matches the selected ticket ID/name/variant, quantity 1 and unit price. |
| Select Checkout on the public site or Continue in the Widget. | Keep the selected basket. | Checkout opens; one begin_checkout is delivered with HTTP 200, correct currency/full value and matching ticket details in its Ads-destination queue. |
| Complete Customer details for the selected scenario. | Signed-out scenarios use Continue as guest or the Widget's guest form and confirm controlled contact details; SingleDayAccount continues with its signed-in account. | Checkout accepts the Customer; the four-event prefix has not repeated and purchase is absent. |
| Continue without optional add-ons and review the order. | Recorded performance, ticket, quantity, fees, taxes, currency and total. | The summary matches the independently prepared amounts; no extra funnel event or premature purchase is sent. |
| Complete the displayed required ticket answers or acknowledgements and advance to payment. | The Event's prepared required answers; keep optional protection unselected. | The required answers are accepted without another cart/checkout/purchase milestone. |
| Enter the accepted test card and billing details. | Prepared sandbox payment details. | The payment form is ready; no purchase or repeated earlier milestone has fired. |
| Select Complete transaction once. | One submission; record the independent invoice and paid-basket responses immediately. | One order confirms; one purchase returns HTTP 200 with transaction_id equal to the confirmed invoice transaction_id in wire and queue; its queued item data and wire currency/value match that order. |
| Complete any required post-purchase Attendee questions and inspect the final recorded sequence. | Enter the prepared details for the person using the ticket; keep the same order. | Confirmation shows the correct ticket and order; the selected destination has exactly the intended four-event sequence with no second purchase from saving answers. |

### SPT-5965: Showpass Meta Pixel checkout

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Core - Analytics - Record Showpass Meta Pixel ticket checkout events

**Description:**

Verify that a Customer's selected tickets and completed order reach Showpass's Meta Pixel destination. Inspect only that owner/provider; another destination cannot satisfy a check. Run each PurchaseScenario separately with a new basket and one retained sandbox order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

Use only the listed dependent scenarios; do not create an authenticated Widget pairing. Single-day and recurring ticket checkout share these steps once the performance is chosen. Seat selection, package selection, Product variants and Membership enrollment have different preparation/journeys and are outside this ticket case.

| PurchaseScenario | Complete setup and entry |
| --- | --- |
| SingleDayGuest | One published single-day Event; signed-out Customer on its public page. Select Buy Tickets, then one fixed-price ticket. |
| SingleDayAccount | The same single-day setup on the public site; sign in before opening the Event. Select Buy Tickets, then one ticket; checkout bypasses guest/login entry. |
| SingleDayModal | One single-day Event; signed-out Customer opens the host ticket button in Modal Widget mode and selects one ticket. |
| SingleDayEmbedded | One single-day Event; signed-out Customer uses its Embedded Widget and selects one ticket. |
| RecurringGuest | One published recurring listing with at least two purchasable performances; signed-out public Customer selects Buy Tickets, then the recorded date/time and one ticket from that performance. |

Use DevTools **Network → All → Preserve log**, filter `facebook.com/tr`, and check **id=725029452601399**, `ev`, document `dl`, query and POST/multipart data. Require **HTTP 200 after redirects**. One request plus its redirects is one logical event. Inspect `cd[content_ids]`, `cd[content_name]`, `cd[content_type]`, `cd[contents]`, `cd[currency]`, `cd[value]`, and checkout/purchase `cd[num_items]`.

Public landing sends PageView and ViewContent for the displayed listing, content_type `product_group`; opening its classic ticket selector does not send a second ViewContent. Widget starts at selection and sends PageView plus ViewContent with content_type `ticket`. Record the displayed listing ID separately from a selected recurring performance's Event ID. Cart/checkout/purchase content_ids identify the selected Event; contents entries identify its ticket type, quantity and item_price. AddToCart value includes this ticket line's applicable service fees/taxes, while item_price remains its unit ticket price. InitiateCheckout/Purchase use the order total (excluding protection through the shared formatter), currency and item count.

This browser Purchase payload does **not send a purchase transaction_id**. Record Invoice ID and order reference independently; do not demand a fabricated Meta transaction field. A queued callback, pixel loader or internal CAPI flag is not proof of browser delivery or server-side deduplication.

For Google, the measured ecommerce sequence is `view_item → add_to_cart → begin_checkout → purchase`; for Meta it is `ViewContent → AddToCart → InitiateCheckout → Purchase`. Inspect the complete prefix after every action. Earlier milestones must not repeat and future milestones must not fire early. Inspect through completion of confirmation and any required post-purchase answers. This observation ends there; it does not prove absence of arbitrarily late sends. Automatic page_view/engagement events are outside the four-event sequence. A Google queue entry and its delivery request are different observations of one event, not duplicate emissions.

**Preconditions:**

**Destination and browser**

* A setup owner confirms Showpass's environment destination **725029452601399** is active and the Organization's corresponding custom Meta Pixel destination is blank. Check the existing setup without editing it during this case.
* Measurement is permitted in the selected browser session and no blocker prevents the intended tag from loading. Record browser/version, privacy mode, destination and, for Widgets, host and frame URL. A blocked loader is a named execution blocker, not downstream provider failure.
* Open DevTools before navigation; use Network → All and Preserve log. For Widget scenarios select its frame in Console before reading its queue.

**Event, Customer and payment**

* Prepare exactly one Event listing for the selected PurchaseScenario. A recurring listing has at least two dated performances; record the chosen date/time, listing ID and selected performance ID separately.
* Record the selector's catalog ticket IDs, names, variants and unit prices from its public Event response, independently of analytics. Buy **one** fixed-price ticket; no assigned seats, packages, shipping, discounts or optional protection.
* Record the expected selected ticket price, fees, taxes, currency and full total from the saved pricing rules before checkout. Do not calculate expectations from the analytics being tested.
* Use a sandbox gateway and its accepted card/billing details so the purchase charges no real card. Have controlled Customer and Attendee details plus every required answer/acknowledgement for this Event.
* For SingleDayAccount, sign in before opening the Event and confirm the account can buy one more ticket under its cumulative Customer ticket limit. Other scenarios start signed out.
* For Widget scenarios have the prepared host page, or the Organization slug and Event for the [Widget tool](https://spwidgettool.netlify.app/); confirm environment/Organization and choose the scenario's mode before loading the Event.

**Postconditions:**

* Retain one completed sandbox order without voiding it. Record Invoice ID, Basket ID and confirmed transaction_id/order reference separately; they are execution evidence rather than scenario parameters.
* Record the confirmed Invoice ID immediately when it is returned, before later attendee, receipt or analytics checks can fail. Keep the per-action Actual Result evidence on its corresponding step.
* Preserve only required analytics/order fields and HTTP results; exclude contact/payment data, cookies, credentials, signed headers and receipt access links.
* Browser delivery and queued events do not prove processed provider reports, internal warehouse storage or server-side CAPI delivery.

**Tags:** analytics, facebook, checkout

**Parameters:**
PurchaseScenario: SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public Event page or Widget for PurchaseScenario. | The exact entry and Customer state in Description; a Widget opens directly in selection. | The intended Event/frame is displayed; for public entry, pageView and one ViewContent reach the intended pixel with HTTP 200, the displayed listing ID/name and product_group content type; no cart, checkout or purchase has fired. |
| Open the intended performance's ticket selection and inspect its entry events before changing quantity. | Public: Buy Tickets; recurring: choose the recorded date/time; Widget: use the displayed selector or its prepared date choice. | Public selection retains its existing ViewContent without another emission; Widget entry has one PageView and one ticket ViewContent for its frame and Event. |
| Choose one of the prepared ticket type. | Quantity 1; recorded ticket identity, price and charges. | The saved basket identifies the selected performance and ticket; one AddToCart returns HTTP 200 with the selected Event content ID, ticket contents ID, quantity 1, unit item_price, currency and the fee/tax-inclusive line value. |
| Select Checkout on the public site or Continue in the Widget. | Keep the selected basket. | Checkout opens; one InitiateCheckout returns HTTP 200 with selected Event and ticket contents, num_items 1, currency and the full basket value. |
| Complete Customer details for the selected scenario. | Signed-out scenarios use Continue as guest or the Widget's guest form and confirm controlled contact details; SingleDayAccount continues with its signed-in account. | Checkout accepts the Customer; the four-event prefix has not repeated and purchase is absent. |
| Continue without optional add-ons and review the order. | Recorded performance, ticket, quantity, fees, taxes, currency and total. | The summary matches the independently prepared amounts; no extra funnel event or premature purchase is sent. |
| Complete the displayed required ticket answers or acknowledgements and advance to payment. | The Event's prepared required answers; keep optional protection unselected. | The required answers are accepted without another cart/checkout/purchase milestone. |
| Enter the accepted test card and billing details. | Prepared sandbox payment details. | The payment form is ready; no purchase or repeated earlier milestone has fired. |
| Select Complete transaction once. | One submission; record the independent invoice and paid-basket responses immediately. | One order confirms; one Purchase returns HTTP 200 with selected Event/ticket contents, num_items 1, currency and the confirmed order value; Invoice ID and order reference are retained as independent evidence. |
| Complete any required post-purchase Attendee questions and inspect the final recorded sequence. | Enter the prepared details for the person using the ticket; keep the same order. | Confirmation shows the correct ticket and order; the selected destination has exactly the intended four-event sequence with no second purchase from saving answers. |

### SPT-5966: Showpass GTM checkout

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Public Checkout - Analytics - Record Showpass GTM ticket checkout events

**Description:**

Verify that a Customer's selected tickets and completed order reach Showpass's GTM destination. Inspect only that owner/provider; another destination cannot satisfy a check. Run each PurchaseScenario separately with a new basket and one retained sandbox order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

Use only the listed dependent scenarios; do not create an authenticated Widget pairing. Single-day and recurring ticket checkout share these steps once the performance is chosen. Seat selection, package selection, Product variants and Membership enrollment have different preparation/journeys and are outside this ticket case.

| PurchaseScenario | Complete setup and entry |
| --- | --- |
| SingleDayGuest | One published single-day Event; signed-out Customer on its public page. Select Buy Tickets, then one fixed-price ticket. |
| RecurringGuest | One published recurring listing with at least two purchasable performances; signed-out public Customer selects Buy Tickets, then the recorded date/time and one ticket from that performance. |

Use DevTools **Network → All → Preserve log**, filter `gtm.js`, and require a successful container response, normally **HTTP 200**, with `id=GTM-M754HLGP` and `l=dataLayer_GTM_M754HLGP`. In Console select the actual public or Widget frame, then expand **window.dataLayer_GTM_M754HLGP**. Use that named array rather than another owner's generic dataLayer. Before each ecommerce event, inspect `event: ecommerce_clear`, `ecommerce: null`, followed by the actual event after its clearing callback. A queued clear without its following event fails that action.

Check `ecommerce.items` IDs/names/variants/categories, quantities and unit prices. view_item contains all selector ticket types at quantity one and summed unit prices; add_to_cart contains the selected ticket and pre-fee value; begin_checkout and purchase contain the actual order and its full currency/value. Purchase `transaction_id` matches the confirmed invoice response's transaction_id; tax/shipping/coupon match the order when present. Container initialization and its named queue are the proof target. There is **no universal GTM collection endpoint or HTTP response per queued event**. Tags inside the container need separate destination-specific delivery checks; their processing is not established here.

For Google, the measured ecommerce sequence is `view_item → add_to_cart → begin_checkout → purchase`; for Meta it is `ViewContent → AddToCart → InitiateCheckout → Purchase`. Inspect the complete prefix after every action. Earlier milestones must not repeat and future milestones must not fire early. Inspect through completion of confirmation and any required post-purchase answers. This observation ends there; it does not prove absence of arbitrarily late sends. Automatic page_view/engagement events are outside the four-event sequence. A Google queue entry and its delivery request are different observations of one event, not duplicate emissions.

**Preconditions:**

**Destination and browser**

* A setup owner confirms Showpass's environment destination **GTM-M754HLGP** is active and the Organization's corresponding custom GTM destination is blank. Check the existing setup without editing it during this case.
* Measurement is permitted in the selected browser session and no blocker prevents the intended tag from loading. Record browser/version, privacy mode, destination and, for Widgets, host and frame URL. A blocked loader is a named execution blocker, not downstream provider failure.
* Open DevTools before navigation; use Network → All and Preserve log. For Widget scenarios select its frame in Console before reading its queue.

**Event, Customer and payment**

* Prepare exactly one Event listing for the selected PurchaseScenario. A recurring listing has at least two dated performances; record the chosen date/time, listing ID and selected performance ID separately.
* Record the selector's catalog ticket IDs, names, variants and unit prices from its public Event response, independently of analytics. Buy **one** fixed-price ticket; no assigned seats, packages, shipping, discounts or optional protection.
* Record the expected selected ticket price, fees, taxes, currency and full total from the saved pricing rules before checkout. Do not calculate expectations from the analytics being tested.
* Use a sandbox gateway and its accepted card/billing details so the purchase charges no real card. Have controlled Customer and Attendee details plus every required answer/acknowledgement for this Event.
* For SingleDayAccount, sign in before opening the Event and confirm the account can buy one more ticket under its cumulative Customer ticket limit. Other scenarios start signed out.
* For Widget scenarios have the prepared host page, or the Organization slug and Event for the [Widget tool](https://spwidgettool.netlify.app/); confirm environment/Organization and choose the scenario's mode before loading the Event.

**Postconditions:**

* Retain one completed sandbox order without voiding it. Record Invoice ID, Basket ID and confirmed transaction_id/order reference separately; they are execution evidence rather than scenario parameters.
* Record the confirmed Invoice ID immediately when it is returned, before later attendee, receipt or analytics checks can fail. Keep the per-action Actual Result evidence on its corresponding step.
* Preserve only required analytics/order fields and HTTP results; exclude contact/payment data, cookies, credentials, signed headers and receipt access links.
* Browser delivery and queued events do not prove processed provider reports, internal warehouse storage or server-side CAPI delivery.

**Tags:** analytics, google, checkout

**Parameters:**
PurchaseScenario: SingleDayGuest, RecurringGuest

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public Event page or Widget for PurchaseScenario. | The exact entry and Customer state in Description; a Widget opens directly in selection. | The intended Event/frame is displayed; for public entry, the intended GTM container initializes successfully with its correct named data layer; no cart, checkout or purchase has been recorded in that layer. |
| Open the intended performance's ticket selection and inspect its entry events before changing quantity. | Public: Buy Tickets; recurring: choose the recorded date/time; Widget: use the displayed selector or its prepared date choice. | After ecommerce_clear, one view_item appears in the intended named layer with all recorded selector ticket types, quantity one each, currency and summed unit prices. |
| Choose one of the prepared ticket type. | Quantity 1; recorded ticket identity, price and charges. | The saved basket identifies the selected performance and ticket; after ecommerce_clear, one add_to_cart in that layer matches the selected ticket ID/name/variant, quantity 1, unit price, currency and pre-fee value. |
| Select Checkout on the public site or Continue in the Widget. | Keep the selected basket. | Checkout opens; after ecommerce_clear, one begin_checkout in that layer matches the selected ticket, quantity, currency and full basket value. |
| Complete Customer details for the selected scenario. | Signed-out scenarios use Continue as guest or the Widget's guest form and confirm controlled contact details; SingleDayAccount continues with its signed-in account. | Checkout accepts the Customer; the four-event prefix has not repeated and purchase is absent. |
| Continue without optional add-ons and review the order. | Recorded performance, ticket, quantity, fees, taxes, currency and total. | The summary matches the independently prepared amounts; no extra funnel event or premature purchase is sent. |
| Complete the displayed required ticket answers or acknowledgements and advance to payment. | The Event's prepared required answers; keep optional protection unselected. | The required answers are accepted without another cart/checkout/purchase milestone. |
| Enter the accepted test card and billing details. | Prepared sandbox payment details. | The payment form is ready; no purchase or repeated earlier milestone has fired. |
| Select Complete transaction once. | One submission; record the independent invoice and paid-basket responses immediately. | One order confirms; after ecommerce_clear, one purchase in that layer matches the confirmed invoice transaction_id, ticket data, currency and order value; container loading alone does not satisfy this result. |
| Complete any required post-purchase Attendee questions and inspect the final recorded sequence. | Enter the prepared details for the person using the ticket; keep the same order. | Confirmation shows the correct ticket and order; the selected destination has exactly the intended four-event sequence with no second purchase from saving answers. |

### SPT-3324: the selling Organization GA4 checkout

Publication: **Pending local revision; not applied to Qase and not executed.**

**Title:** Core - Analytics - Record the selling Organization GA4 ticket checkout events

**Description:**

Verify that a Customer's selected tickets and completed order reach the selling Organization's GA4 destination. Inspect only that owner/provider; another destination cannot satisfy a check. Run each PurchaseScenario separately with a new basket and one retained sandbox order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

Use only the listed dependent scenarios; do not create an authenticated Widget pairing. Single-day and recurring ticket checkout share these steps once the performance is chosen. Seat selection, package selection, Product variants and Membership enrollment have different preparation/journeys and are outside this ticket case.

| PurchaseScenario | Complete setup and entry |
| --- | --- |
| SingleDayGuest | One published single-day Event; signed-out Customer on its public page. Select Buy Tickets, then one fixed-price ticket. |
| SingleDayAccount | The same single-day setup on the public site; sign in before opening the Event. Select Buy Tickets, then one ticket; checkout bypasses guest/login entry. |
| SingleDayModal | One single-day Event; signed-out Customer opens the host ticket button in Modal Widget mode and selects one ticket. |
| SingleDayEmbedded | One single-day Event; signed-out Customer uses its Embedded Widget and selects one ticket. |
| RecurringGuest | One published recurring listing with at least two purchasable performances; signed-out public Customer selects Buy Tickets, then the recorded date/time and one ticket from that performance. |
| RecurringModal | One recurring listing with at least two performances; signed-out Customer opens its Modal Widget, selects the recorded date/time and one ticket. |
| RecurringEmbedded | One recurring listing with at least two performances; signed-out Customer uses its Embedded Widget, selects the recorded date/time and one ticket. |

Use DevTools **Network → All → Preserve log**, filter `g/collect`, and check query parameters plus POST bodies. Destination is `tid=G-8PPYCKJRG5`; event is `en`; document is `dl`. Require **HTTP 204**. Inspect `cu` for currency, `epn.value` or `ep.value`, `pr1`, `pr2`, … for item ID/name/variant/category/price/quantity, and purchase `ep.transaction_id` or `epn.transaction_id`. A request may batch events. Also expand the Widget frame's or public page's `window.dataLayer` in Console: each ecommerce `gtag('event', …)` has `send_to=G-8PPYCKJRG5` and matching items/value. Read the existing queue; do not push synthetic events.

`view_item` describes **all ticket types supplied to the selected performance's selector**, quantity one each; value is their summed unit prices. `add_to_cart` describes only the selected ticket and its pre-fee subtotal. `begin_checkout` and `purchase` describe only the ordered ticket, full basket value, currency and the applicable item fields. Purchase tax, shipping and coupon fields match the independent order when present. Purchase transaction ID equals the confirmed invoice response's **transaction_id**, which is the order reference, rather than assuming it is the numeric Invoice ID.

For Google, the measured ecommerce sequence is `view_item → add_to_cart → begin_checkout → purchase`; for Meta it is `ViewContent → AddToCart → InitiateCheckout → Purchase`. Inspect the complete prefix after every action. Earlier milestones must not repeat and future milestones must not fire early. Inspect through completion of confirmation and any required post-purchase answers. This observation ends there; it does not prove absence of arbitrarily late sends. Automatic page_view/engagement events are outside the four-event sequence. A Google queue entry and its delivery request are different observations of one event, not duplicate emissions.

**Preconditions:**

**Destination and browser**

* A setup owner with **Manage Organization Info** has prepared Dashboard → Organization → Integrations → Analytics → **Google Analytics 4 = G-8PPYCKJRG5** for the selling Organization. On the new Organization navigation, **Manage Integrations** is also needed to reach the page. Reuse the saved value; do not change settings during the purchase.
* Measurement is permitted in the selected browser session and no blocker prevents the intended tag from loading. Record browser/version, privacy mode, destination and, for Widgets, host and frame URL. A blocked loader is a named execution blocker, not downstream provider failure.
* Open DevTools before navigation; use Network → All and Preserve log. For Widget scenarios select its frame in Console before reading its queue.

**Event, Customer and payment**

* Prepare exactly one Event listing for the selected PurchaseScenario. A recurring listing has at least two dated performances; record the chosen date/time, listing ID and selected performance ID separately.
* Record the selector's catalog ticket IDs, names, variants and unit prices from its public Event response, independently of analytics. Buy **one** fixed-price ticket; no assigned seats, packages, shipping, discounts or optional protection.
* Record the expected selected ticket price, fees, taxes, currency and full total from the saved pricing rules before checkout. Do not calculate expectations from the analytics being tested.
* Use a sandbox gateway and its accepted card/billing details so the purchase charges no real card. Have controlled Customer and Attendee details plus every required answer/acknowledgement for this Event.
* For SingleDayAccount, sign in before opening the Event and confirm the account can buy one more ticket under its cumulative Customer ticket limit. Other scenarios start signed out.
* For Widget scenarios have the prepared host page, or the Organization slug and Event for the [Widget tool](https://spwidgettool.netlify.app/); confirm environment/Organization and choose the scenario's mode before loading the Event.

**Postconditions:**

* Retain one completed sandbox order without voiding it. Record Invoice ID, Basket ID and confirmed transaction_id/order reference separately; they are execution evidence rather than scenario parameters.
* Record the confirmed Invoice ID immediately when it is returned, before later attendee, receipt or analytics checks can fail. Keep the per-action Actual Result evidence on its corresponding step.
* Preserve only required analytics/order fields and HTTP results; exclude contact/payment data, cookies, credentials, signed headers and receipt access links.
* Browser delivery and queued events do not prove processed provider reports, internal warehouse storage or server-side CAPI delivery.

**Tags:** analytics, google, checkout

**Parameters:**
PurchaseScenario: SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest, RecurringModal, RecurringEmbedded

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public Event page or Widget for PurchaseScenario. | The exact entry and Customer state in Description; a Widget opens directly in selection. | The intended Event/frame is displayed; for public entry, one path-scoped page_view reaches the selected GA4 destination with HTTP 204; no cart, checkout or purchase event has fired. |
| Open the intended performance's ticket selection and inspect its entry events before changing quantity. | Public: Buy Tickets; recurring: choose the recorded date/time; Widget: use the displayed selector or its prepared date choice. | One view_item reaches that destination with HTTP 204 and matches the recorded performance catalog, quantity one per listed type, currency and summed unit prices in both collection and queue. |
| Choose one of the prepared ticket type. | Quantity 1; recorded ticket identity, price and charges. | The saved basket identifies the selected performance and ticket; one add_to_cart reaches that destination with HTTP 204; collection and queue match the selected ticket ID/name/variant, quantity 1, unit price, currency and pre-fee value. |
| Select Checkout on the public site or Continue in the Widget. | Keep the selected basket. | Checkout opens; one begin_checkout reaches that destination with HTTP 204 and matches the selected ticket, quantity, currency and full basket total in collection and queue. |
| Complete Customer details for the selected scenario. | Signed-out scenarios use Continue as guest or the Widget's guest form and confirm controlled contact details; SingleDayAccount continues with its signed-in account. | Checkout accepts the Customer; the four-event prefix has not repeated and purchase is absent. |
| Continue without optional add-ons and review the order. | Recorded performance, ticket, quantity, fees, taxes, currency and total. | The summary matches the independently prepared amounts; no extra funnel event or premature purchase is sent. |
| Complete the displayed required ticket answers or acknowledgements and advance to payment. | The Event's prepared required answers; keep optional protection unselected. | The required answers are accepted without another cart/checkout/purchase milestone. |
| Enter the accepted test card and billing details. | Prepared sandbox payment details. | The payment form is ready; no purchase or repeated earlier milestone has fired. |
| Select Complete transaction once. | One submission; record the independent invoice and paid-basket responses immediately. | One order confirms; one purchase returns HTTP 204 with the confirmed transaction_id, selected ticket, quantity, currency and order value in collection and queue; independently confirmed invoice and paid basket identify the same order. |
| Complete any required post-purchase Attendee questions and inspect the final recorded sequence. | Enter the prepared details for the person using the ticket; keep the same order. | Confirmation shows the correct ticket and order; the selected destination has exactly the intended four-event sequence with no second purchase from saving answers. |

### TC-04: the selling Organization Google Ads checkout

Publication: **Pending local revision; not applied to Qase and not executed.**

**Title:** Core - Analytics - Record the selling Organization Google Ads ticket checkout events

**Description:**

Verify that a Customer's selected tickets and completed order reach the selling Organization's Google Ads destination. Inspect only that owner/provider; another destination cannot satisfy a check. Run each PurchaseScenario separately with a new basket and one retained sandbox order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

Use only the listed dependent scenarios; do not create an authenticated Widget pairing. Single-day and recurring ticket checkout share these steps once the performance is chosen. Seat selection, package selection, Product variants and Membership enrollment have different preparation/journeys and are outside this ticket case.

| PurchaseScenario | Complete setup and entry |
| --- | --- |
| SingleDayGuest | One published single-day Event; signed-out Customer on its public page. Select Buy Tickets, then one fixed-price ticket. |
| SingleDayAccount | The same single-day setup on the public site; sign in before opening the Event. Select Buy Tickets, then one ticket; checkout bypasses guest/login entry. |
| SingleDayModal | One single-day Event; signed-out Customer opens the host ticket button in Modal Widget mode and selects one ticket. |
| SingleDayEmbedded | One single-day Event; signed-out Customer uses its Embedded Widget and selects one ticket. |
| RecurringGuest | One published recurring listing with at least two purchasable performances; signed-out public Customer selects Buy Tickets, then the recorded date/time and one ticket from that performance. |
| RecurringModal | One recurring listing with at least two performances; signed-out Customer opens its Modal Widget, selects the recorded date/time and one ticket. |
| RecurringEmbedded | One recurring listing with at least two performances; signed-out Customer uses its Embedded Widget, selects the recorded date/time and one ticket. |

Use DevTools **Network → All → Preserve log**, filter `ccm/collect`, destination `tid=AW-793802692`, event `en`, document `dl`; inspect query and POST fields. The reviewed beta contract requires **HTTP 200**, currency `ep.currency`, value `epn.value`, and purchase `ep.transaction_id`. The Ads collector does **not** expose this journey's full item array. Inspect the public page's or Widget frame's `window.dataLayer` in Console for `gtag('event', …)` entries with **send_to=AW-793802692**; compare their item IDs/names/variants/categories, quantities, unit prices, currency and values with the independent catalog/basket. Read queued entries without adding events.

`view_item` includes all ticket types supplied to the selected performance's selector, quantity one each, with summed unit prices. `add_to_cart` has only the selected ticket and pre-fee value. `begin_checkout` and `purchase` use the ordered ticket and full basket value; queued purchase tax/shipping/coupon fields match the independent order when present. Purchase transaction ID matches the invoice response's **transaction_id in both wire and queue**. Keep numeric Invoice ID separately. Additional Google remarketing/view-through requests may coexist; record them separately. A bare AW ID does not establish a conversion-action label or require an extra `conversion` event.

For Google, the measured ecommerce sequence is `view_item → add_to_cart → begin_checkout → purchase`; for Meta it is `ViewContent → AddToCart → InitiateCheckout → Purchase`. Inspect the complete prefix after every action. Earlier milestones must not repeat and future milestones must not fire early. Inspect through completion of confirmation and any required post-purchase answers. This observation ends there; it does not prove absence of arbitrarily late sends. Automatic page_view/engagement events are outside the four-event sequence. A Google queue entry and its delivery request are different observations of one event, not duplicate emissions.

**Preconditions:**

**Destination and browser**

* A setup owner with **Manage Organization Info** has prepared Dashboard → Organization → Integrations → Analytics → **Google Ads = AW-793802692** for the selling Organization. On the new Organization navigation, **Manage Integrations** is also needed to reach the page. Reuse the saved value; do not change settings during the purchase.
* Measurement is permitted in the selected browser session and no blocker prevents the intended tag from loading. Record browser/version, privacy mode, destination and, for Widgets, host and frame URL. A blocked loader is a named execution blocker, not downstream provider failure.
* Open DevTools before navigation; use Network → All and Preserve log. For Widget scenarios select its frame in Console before reading its queue.

**Event, Customer and payment**

* Prepare exactly one Event listing for the selected PurchaseScenario. A recurring listing has at least two dated performances; record the chosen date/time, listing ID and selected performance ID separately.
* Record the selector's catalog ticket IDs, names, variants and unit prices from its public Event response, independently of analytics. Buy **one** fixed-price ticket; no assigned seats, packages, shipping, discounts or optional protection.
* Record the expected selected ticket price, fees, taxes, currency and full total from the saved pricing rules before checkout. Do not calculate expectations from the analytics being tested.
* Use a sandbox gateway and its accepted card/billing details so the purchase charges no real card. Have controlled Customer and Attendee details plus every required answer/acknowledgement for this Event.
* For SingleDayAccount, sign in before opening the Event and confirm the account can buy one more ticket under its cumulative Customer ticket limit. Other scenarios start signed out.
* For Widget scenarios have the prepared host page, or the Organization slug and Event for the [Widget tool](https://spwidgettool.netlify.app/); confirm environment/Organization and choose the scenario's mode before loading the Event.

**Postconditions:**

* Retain one completed sandbox order without voiding it. Record Invoice ID, Basket ID and confirmed transaction_id/order reference separately; they are execution evidence rather than scenario parameters.
* Record the confirmed Invoice ID immediately when it is returned, before later attendee, receipt or analytics checks can fail. Keep the per-action Actual Result evidence on its corresponding step.
* Preserve only required analytics/order fields and HTTP results; exclude contact/payment data, cookies, credentials, signed headers and receipt access links.
* Browser delivery and queued events do not prove processed provider reports, internal warehouse storage or server-side CAPI delivery.

**Tags:** analytics, google, checkout

**Parameters:**
PurchaseScenario: SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest, RecurringModal, RecurringEmbedded

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public Event page or Widget for PurchaseScenario. | The exact entry and Customer state in Description; a Widget opens directly in selection. | The intended Event/frame is displayed; for public entry, one path-scoped page_view reaches the selected Ads destination with HTTP 200; no cart, checkout or purchase event has fired. |
| Open the intended performance's ticket selection and inspect its entry events before changing quantity. | Public: Buy Tickets; recurring: choose the recorded date/time; Widget: use the displayed selector or its prepared date choice. | One view_item is delivered with HTTP 200; the Ads-destination queue matches every recorded catalog ticket, quantity one each, currency and summed unit value. |
| Choose one of the prepared ticket type. | Quantity 1; recorded ticket identity, price and charges. | The saved basket identifies the selected performance and ticket; one add_to_cart is delivered with HTTP 200 and correct wire currency/value; its Ads-destination queue matches the selected ticket ID/name/variant, quantity 1 and unit price. |
| Select Checkout on the public site or Continue in the Widget. | Keep the selected basket. | Checkout opens; one begin_checkout is delivered with HTTP 200, correct currency/full value and matching ticket details in its Ads-destination queue. |
| Complete Customer details for the selected scenario. | Signed-out scenarios use Continue as guest or the Widget's guest form and confirm controlled contact details; SingleDayAccount continues with its signed-in account. | Checkout accepts the Customer; the four-event prefix has not repeated and purchase is absent. |
| Continue without optional add-ons and review the order. | Recorded performance, ticket, quantity, fees, taxes, currency and total. | The summary matches the independently prepared amounts; no extra funnel event or premature purchase is sent. |
| Complete the displayed required ticket answers or acknowledgements and advance to payment. | The Event's prepared required answers; keep optional protection unselected. | The required answers are accepted without another cart/checkout/purchase milestone. |
| Enter the accepted test card and billing details. | Prepared sandbox payment details. | The payment form is ready; no purchase or repeated earlier milestone has fired. |
| Select Complete transaction once. | One submission; record the independent invoice and paid-basket responses immediately. | One order confirms; one purchase returns HTTP 200 with transaction_id equal to the confirmed invoice transaction_id in wire and queue; its queued item data and wire currency/value match that order. |
| Complete any required post-purchase Attendee questions and inspect the final recorded sequence. | Enter the prepared details for the person using the ticket; keep the same order. | Confirmation shows the correct ticket and order; the selected destination has exactly the intended four-event sequence with no second purchase from saving answers. |

### TC-05: the selling Organization GTM checkout

Publication: **Pending local revision; not applied to Qase and not executed.**

**Title:** Core - Analytics - Record the selling Organization GTM ticket checkout events

**Description:**

Verify that a Customer's selected tickets and completed order reach the selling Organization's GTM destination. Inspect only that owner/provider; another destination cannot satisfy a check. Run each PurchaseScenario separately with a new basket and one retained sandbox order.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

Use only the listed dependent scenarios; do not create an authenticated Widget pairing. Single-day and recurring ticket checkout share these steps once the performance is chosen. Seat selection, package selection, Product variants and Membership enrollment have different preparation/journeys and are outside this ticket case.

| PurchaseScenario | Complete setup and entry |
| --- | --- |
| SingleDayGuest | One published single-day Event; signed-out Customer on its public page. Select Buy Tickets, then one fixed-price ticket. |
| SingleDayAccount | The same single-day setup on the public site; sign in before opening the Event. Select Buy Tickets, then one ticket; checkout bypasses guest/login entry. |
| SingleDayModal | One single-day Event; signed-out Customer opens the host ticket button in Modal Widget mode and selects one ticket. |
| SingleDayEmbedded | One single-day Event; signed-out Customer uses its Embedded Widget and selects one ticket. |
| RecurringGuest | One published recurring listing with at least two purchasable performances; signed-out public Customer selects Buy Tickets, then the recorded date/time and one ticket from that performance. |
| RecurringModal | One recurring listing with at least two performances; signed-out Customer opens its Modal Widget, selects the recorded date/time and one ticket. |
| RecurringEmbedded | One recurring listing with at least two performances; signed-out Customer uses its Embedded Widget, selects the recorded date/time and one ticket. |

Use DevTools **Network → All → Preserve log**, filter `gtm.js`, and require a successful container response, normally **HTTP 200**, with `id=GTM-TR5HFMD9` and `l=dataLayer_GTM_TR5HFMD9`. In Console select the actual public or Widget frame, then expand **window.dataLayer_GTM_TR5HFMD9**. Use that named array rather than another owner's generic dataLayer. Before each ecommerce event, inspect `event: ecommerce_clear`, `ecommerce: null`, followed by the actual event after its clearing callback. A queued clear without its following event fails that action.

Check `ecommerce.items` IDs/names/variants/categories, quantities and unit prices. view_item contains all selector ticket types at quantity one and summed unit prices; add_to_cart contains the selected ticket and pre-fee value; begin_checkout and purchase contain the actual order and its full currency/value. Purchase `transaction_id` matches the confirmed invoice response's transaction_id; tax/shipping/coupon match the order when present. Container initialization and its named queue are the proof target. There is **no universal GTM collection endpoint or HTTP response per queued event**. Tags inside the container need separate destination-specific delivery checks; their processing is not established here.

For Google, the measured ecommerce sequence is `view_item → add_to_cart → begin_checkout → purchase`; for Meta it is `ViewContent → AddToCart → InitiateCheckout → Purchase`. Inspect the complete prefix after every action. Earlier milestones must not repeat and future milestones must not fire early. Inspect through completion of confirmation and any required post-purchase answers. This observation ends there; it does not prove absence of arbitrarily late sends. Automatic page_view/engagement events are outside the four-event sequence. A Google queue entry and its delivery request are different observations of one event, not duplicate emissions.

**Preconditions:**

**Destination and browser**

* A setup owner with **Manage Organization Info** has prepared Dashboard → Organization → Integrations → Analytics → **Google Tag Manager = GTM-TR5HFMD9** for the selling Organization. On the new Organization navigation, **Manage Integrations** is also needed to reach the page. Reuse the saved value; do not change settings during the purchase. Organization-scoped `google_tag_manager_flag = ON` is needed to expose the GTM field during setup; the saved ID and functioning container are separate requirements.
* Measurement is permitted in the selected browser session and no blocker prevents the intended tag from loading. Record browser/version, privacy mode, destination and, for Widgets, host and frame URL. A blocked loader is a named execution blocker, not downstream provider failure.
* Open DevTools before navigation; use Network → All and Preserve log. For Widget scenarios select its frame in Console before reading its queue.

**Event, Customer and payment**

* Prepare exactly one Event listing for the selected PurchaseScenario. A recurring listing has at least two dated performances; record the chosen date/time, listing ID and selected performance ID separately.
* Record the selector's catalog ticket IDs, names, variants and unit prices from its public Event response, independently of analytics. Buy **one** fixed-price ticket; no assigned seats, packages, shipping, discounts or optional protection.
* Record the expected selected ticket price, fees, taxes, currency and full total from the saved pricing rules before checkout. Do not calculate expectations from the analytics being tested.
* Use a sandbox gateway and its accepted card/billing details so the purchase charges no real card. Have controlled Customer and Attendee details plus every required answer/acknowledgement for this Event.
* For SingleDayAccount, sign in before opening the Event and confirm the account can buy one more ticket under its cumulative Customer ticket limit. Other scenarios start signed out.
* For Widget scenarios have the prepared host page, or the Organization slug and Event for the [Widget tool](https://spwidgettool.netlify.app/); confirm environment/Organization and choose the scenario's mode before loading the Event.

**Postconditions:**

* Retain one completed sandbox order without voiding it. Record Invoice ID, Basket ID and confirmed transaction_id/order reference separately; they are execution evidence rather than scenario parameters.
* Record the confirmed Invoice ID immediately when it is returned, before later attendee, receipt or analytics checks can fail. Keep the per-action Actual Result evidence on its corresponding step.
* Preserve only required analytics/order fields and HTTP results; exclude contact/payment data, cookies, credentials, signed headers and receipt access links.
* Browser delivery and queued events do not prove processed provider reports, internal warehouse storage or server-side CAPI delivery.

**Tags:** analytics, google, checkout

**Parameters:**
PurchaseScenario: SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest, RecurringModal, RecurringEmbedded

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public Event page or Widget for PurchaseScenario. | The exact entry and Customer state in Description; a Widget opens directly in selection. | The intended Event/frame is displayed; for public entry, the intended GTM container initializes successfully with its correct named data layer; no cart, checkout or purchase has been recorded in that layer. |
| Open the intended performance's ticket selection and inspect its entry events before changing quantity. | Public: Buy Tickets; recurring: choose the recorded date/time; Widget: use the displayed selector or its prepared date choice. | After ecommerce_clear, one view_item appears in the intended named layer with all recorded selector ticket types, quantity one each, currency and summed unit prices. |
| Choose one of the prepared ticket type. | Quantity 1; recorded ticket identity, price and charges. | The saved basket identifies the selected performance and ticket; after ecommerce_clear, one add_to_cart in that layer matches the selected ticket ID/name/variant, quantity 1, unit price, currency and pre-fee value. |
| Select Checkout on the public site or Continue in the Widget. | Keep the selected basket. | Checkout opens; after ecommerce_clear, one begin_checkout in that layer matches the selected ticket, quantity, currency and full basket value. |
| Complete Customer details for the selected scenario. | Signed-out scenarios use Continue as guest or the Widget's guest form and confirm controlled contact details; SingleDayAccount continues with its signed-in account. | Checkout accepts the Customer; the four-event prefix has not repeated and purchase is absent. |
| Continue without optional add-ons and review the order. | Recorded performance, ticket, quantity, fees, taxes, currency and total. | The summary matches the independently prepared amounts; no extra funnel event or premature purchase is sent. |
| Complete the displayed required ticket answers or acknowledgements and advance to payment. | The Event's prepared required answers; keep optional protection unselected. | The required answers are accepted without another cart/checkout/purchase milestone. |
| Enter the accepted test card and billing details. | Prepared sandbox payment details. | The payment form is ready; no purchase or repeated earlier milestone has fired. |
| Select Complete transaction once. | One submission; record the independent invoice and paid-basket responses immediately. | One order confirms; after ecommerce_clear, one purchase in that layer matches the confirmed invoice transaction_id, ticket data, currency and order value; container loading alone does not satisfy this result. |
| Complete any required post-purchase Attendee questions and inspect the final recorded sequence. | Enter the prepared details for the person using the ticket; keep the same order. | Confirmation shows the correct ticket and order; the selected destination has exactly the intended four-event sequence with no second purchase from saving answers. |

### SPT-3331: Organization Meta checkout

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Core - Analytics - Record the Organization's Meta checkout and purchase events

**Description:**

Given a prepared basket containing the selected kind of item, verify the selling Organization's Meta pixel records checkout initiation and a completed order with the correct item identities and value. This case starts after item selection; it does not replace detail-page or AddToCart checks.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| PurchaseScenario | Basket preparation and expected identities |
| --- | --- |
| SingleDayEvent | One ticket for one published single-day Event; record Event and ticket-type IDs. content_ids uses the Event ID; contents.id uses the ticket-type ID. |
| AssignedSeating | One ticket for a specific available seat at one Event; record Event, ticket-type and seat from the basket. content_ids uses the Event ID and contents.id the ticket-type ID; a seat identifier is not promised in the Pixel payload. The confirmed order must retain the chosen seat. |
| AttractionEvent | One ticket for one recorded date/time from an attraction calendar; record the chosen performance's Event and ticket-type IDs. Pixel cart/order data identifies the selected performance rather than another timeslot. |
| Product | One Product variant, such as a selected size/colour, for pickup with no shipping. Record Product and variant IDs. Checkout/purchase content_ids uses Product ID; contents.id uses the Product variant ID. |
| Membership | One new Membership at one available level, with no assigned seat or renewal. A Membership is the purchased membership offering; its level is the selected option. Record Membership group and level IDs. content_ids uses the group ID; contents.id uses the level ID. |

Choose WebPublic or a prepared guest Widget entry (Modal or Embedded) as execution context; do not combine separate modes or Customers in one result. Use the same selected basket throughout.

Use DevTools Network → All, Preserve log, filter `facebook.com/tr`. Inspect query and POST/multipart data: **id=216134437634636** (the beta Organization pixel), `ev`, `dl`, `cd[content_ids]`, `cd[contents]`, `cd[currency]`, `cd[value]`, `cd[num_items]` and `content_type: product_group`. Require HTTP 200 after redirects. contents includes the actual variant/ticket/level ID, quantity and unit item_price; num_items equals the ordered line quantities. InitiateCheckout and Purchase use the full basket/order value after exclusion of protection. Compare with independent item/basket/invoice responses, not another Pixel request. The actual browser payload does not send transaction_id; record Invoice ID and order reference separately.

After entering checkout, neither review, required answers nor payment entry repeats InitiateCheckout or sends Purchase. One successful completion sends one Purchase during the observation through confirmation. This case does not claim browser/server deduplication or provider processing.

**Preconditions:**

**Organization and item**

* A setup owner with Manage Organization Info has prepared Dashboard → Organization → Integrations → Analytics → Facebook Pixel with the approved sandbox pixel (beta reference 216134437634636). Manage Integrations is also needed to reach the new Organization navigation. No token is needed to inspect browser Pixel requests.
* Prepare one basket with exactly one item of the selected PurchaseScenario for this Organization. Its public sellable response and basket provide the item/variant identities in Description.
* Have the source-listed item available for public purchase. AssignedSeating requires the exact seat still reserved in this basket; AttractionEvent requires the recorded date/time.
* Record unit price, quantity 1, fees, taxes, currency and total before checkout. No discounts, shipping, optional protection, Membership renewal or package children are part of this case.

**Customer and payment**

* Use a signed-out Customer with controlled contact details and a sandbox gateway's accepted card/billing details; the purchase must not charge a real card.
* Have every required Customer/Attendee/Member answer for the selected offering. Widget mode, host, frame and view are recorded as context.
* DevTools records from before item selection; pixel loading/measurement is permitted. Inspect the actual Widget frame's traffic for a Widget run.

**Postconditions:**

* Retain the completed sandbox order without voiding it; record Basket ID, Invoice ID and order reference as evidence.
* The order contains the selected item/variant/seat or Membership level; keep sanitized per-step Pixel and order evidence.
* Ads conversion labels, Product removal and browser/server CAPI processing require their own checks.

**Tags:** analytics, facebook, checkout

**Parameters:**
PurchaseScenario: SingleDayEvent, AssignedSeating, AttractionEvent, Product, Membership

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the public basket or the prepared Widget containing the selected item. | PurchaseScenario's prepared one-item basket. | The item, variant/seat or date/time and amounts match the independently recorded selection; no Purchase has fired. |
| Select Checkout on the public site or Continue in the Widget. | Keep that basket. | One InitiateCheckout reaches the Organization's pixel with HTTP 200, correct content/variant identities, quantity, currency and total. |
| Complete guest contact details and required item answers, then review the order. | Controlled details for the actual Customer and recipient of the selected item. | The same item and amounts appear; InitiateCheckout is not repeated and Purchase remains absent. |
| Enter the sandbox card and billing details. | Approved gateway test card; protection unselected. | Payment is ready without a Purchase event or repeated checkout event. |
| Select Complete transaction once and complete any required post-purchase answers. | Record the independent invoice response before later checks. | One order confirms and one Purchase reaches the Organization's pixel with HTTP 200 and matching identities, quantity, currency and order value. |

### SPT-4958: Confirmation ad placement and internal analytics

Publication: **Published and saved fields verified in Qase; not executed.**

**Title:** Core - Post Purchase - Show eligible partner offers and record their interactions

**Description:**

Given a completed order eligible for partner offers, verify the actual offers appear and internal analytics identifies the visible offer, selected link and dismissal. An ad placement is a configured sponsored offer; its variant supplies the displayed creative and links.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| Theme | Required display setting |
| --- | --- |
| Dark | Prepare the Customer's existing dark colour mode before checkout. |
| Light | Prepare the Customer's existing light colour mode before checkout. |

| Layout | Required Organization setup and visible offer behavior |
| --- | --- |
| Grid | `ad_placement_grid_layout = ON` and at least two eligible offers; the dialog heading is Offers from our partners. Offers have their own Offer details controls; No thanks closes the grid. |
| Slide | `ad_placement_grid_layout = OFF`; one offer is displayed at a time. Its configured secondary CTA dismisses that offer and advances until the last offer closes. Record the exact secondary text before starting. |

Run all four Theme/Layout pairs for each selected Platform/View context. Use Network → All, Preserve log, filter `analytics/internal/add`; watch the correct public/Widget document. Impressions are type 6 with `ad_placement_impression_<placement ID>`; primary clicks are type 5, `ad_placement_click_<placement ID>`; dismissals are type 5, `ad_placement_dismiss_<placement ID>`. All return HTTP 200 and have `app_source: NextJS` and confirmation requested_url with private receipt query parameters removed. Required custom fields match the placement response: placement_id, variant_id, sponsor_name, ad_placement_layout and rokt_display_mode. When the invoice exposes card_type, that value is retained; do not invent an order amount or Invoice ID field in this ad payload. Click also contains the configured primary CTA URL.

Compare offer visibility before accepting an impression. Bring each grid card or slide into view and check its first impression; a card must not record repeated impressions merely from remaining visible. The offers' configured name/logo, headline, optional subheadline, image, CTA text, exclusivity label and terms match the returned variant; omitted optional content leaves no broken gap. A primary CTA opens its configured safe destination through the Showpass tracking short link. This case does not send Email me this offer.

**Preconditions:**

* The setup owner has prepared one purchasable Event and safe sandbox payment details; the completed order will be retained.
* Organization-scoped `enable_ad_placements = ON`; the selected Layout flag is prepared before execution. `enable_rokt_embedded_ad_placement_grid = OFF` keeps this offer check separate from embedded Rokt.
* At least two active post_purchase placements with active variants match the Customer's billing location. Each has approved creative, a safe primary CTA destination, recorded secondary text and terms URL. Record placement/variant IDs and creative from the public placement response.
* Setup owner confirms `internal_analytics = ON` and customer-scoped `track_button_click = ON`. No flags or ad records are changed during checkout.
* Start in the selected Theme, Platform/View and one recorded guest Widget mode where applicable. Have controlled Customer/Attendee details and all required Event answers.
* DevTools records before purchase, including the ad-placement lookup and any early impressions. No Admin inspection is required by this case.

**Postconditions:**

* The order remains completed and accessible; retain it without voiding it.
* Record the Invoice ID and Basket ID separately from placement and variant IDs. Keep offer evidence beside each action's Actual Result.
* Restore only a display preference changed for this case. Setup owners restore any separately prepared ad configuration under their approved scope; do not remove pre-existing placements.

**Tags:** analytics, post-purchase, checkout

**Parameters:**
Theme: Dark, Light
Layout: Grid, Slide

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete the prepared Event checkout once using its sandbox payment. | Selected Platform/View, Theme and Layout. | One order confirms; the placement lookup completes for its basket and the eligible offers appear after the modal delay. |
| Bring the first offer into view and inspect its creative and impression. | Recorded placement/variant and expected fields in Description. | The actual creative matches and one impression returns HTTP 200 for that offer, current layout and sanitized confirmation URL. |
| Open the offer's Terms and Conditions and return to the offer. | Recorded safe terms destination. | The configured terms are reachable and the same offer/order remains available without a second impression from a still-mounted card. |
| Select the first offer's primary CTA. | Recorded CTA text and approved safe destination. | One click request identifies that offer/variant and CTA URL, returns HTTP 200, and opens its destination through a Showpass tracking short link. |
| Return to the order and bring the remaining offers into view. | Grid: scroll remaining cards; Slide: use each currently displayed secondary CTA to advance. | Each newly visible offer matches its variant and records its own impression; Slide secondary actions record the dismissed placement without changing the completed order. |
| Dismiss the remaining offer display. | Grid: No thanks; Slide: the last displayed offer's recorded secondary CTA. | The dialog closes and its dismissal analytics identifies the relevant placement with HTTP 200; order confirmation stays usable. |

### SPT-4962: Rokt suppression, sequencing and internal exposure

Publication: **Pending local revision; not applied to Qase and not executed.**

**Title:** Core - Post Purchase - Record Rokt exposure after the offer decision

**Description:**

Given an order eligible for Rokt, verify confirmation waits for the Showpass offer lookup and records one final Rokt exposure outcome for the applicable decision. Rokt is the third-party post-purchase offer service; requesting its SDK does not mean an offer was displayed.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| OfferFlow | Required prepared state | Expected exposure |
| --- | --- | --- |
| PermanentSuppression | Eligible Showpass partner offers; `enable_rokt_after_ad_placement = OFF`. | After lookup resolves, Rokt is hidden; one exposure has rokt_evaluated true, rokt_request_started false, rokt_eligible false, rokt_shown false, not_shown_reason ad_placement_shown. |
| AfterDismissal | Eligible Showpass partner offers; `enable_rokt_after_ad_placement = ON`. | While those offers are displayed there is no temporary not-shown exposure; after dismissal, the SDK's final outcome supplies the single exposure. |
| NoPlacement | Placement lookup completes successfully with no eligible Showpass offers. | Rokt follows the selected platform's enabled setting, and its SDK's final outcome supplies the single exposure. |

Use Network → All, Preserve log, filter `analytics/internal/add`. The internal event is **label rokt_exposure, type 3**, HTTP 200, `app_source: NextJS`, the sanitized confirmation URL, correct Venue/Basket IDs and `custom_params.invoice_id` matching the confirmed invoice. source_step is confirmation. Check rokt_evaluated, rokt_request_started, rokt_eligible, rokt_shown and not_shown_reason against the actual SDK outcome. A shown offer has true/true/true/true and null reason. No delivered offer has evaluated/request_started/eligible true, shown false and reason no_placement_delivered. Blocked/error outcomes must not claim shown; preserve the exact sdk_blocked/error reason and actual request-started state. Only a real visible offer satisfies rokt_shown true. A completed SDK request alone does not.

Do not create an exposure while order/Venue inputs or placement availability remain unresolved. Observe from confirmation entry until the actual terminal SDK outcome and the displayed offer is dismissed; if the provider never returns an outcome, record the named blocker and observed duration rather than claiming a universal timeout. No synthetic slow response or injected SDK failure is part of this manual case.

**Preconditions:**

* Setup owner confirms customer-session `rokt_confirmation_advertisements = ON` and `internal_analytics = ON`.
* Venue saved settings: `enable_rokt_confirmation_advertisements = true` for WebPublic; `enable_rokt_confirmation_advertisements_widget = true` for Widget. These are separate saved Venue values, not the global/session Rokt flag. The owner supplies these values; no Admin access is authorized by the case text.
* Organization-scoped `enable_ad_placements = ON`; `enable_rokt_embedded_ad_placement_grid = OFF`. OfferFlow's sequencing flag and actual eligible/no-placement setup are prepared before checkout.
* Use one published Event, controlled Customer details and an approved sandbox payment. Retain the one resulting order without voiding it.
* For AfterDismissal and NoPlacement, the approved provider setup must supply an observable terminal SDK outcome. Record Widget mode/host or public entry and browser/view.
* Start Network recording before purchase; retain the placement lookup result, safe SDK lifecycle evidence and independent basket/invoice responses without contact or payment details.

**Postconditions:**

* The same completed order remains accessible. Keep Invoice ID, Basket ID and per-step sanitized evidence.
* No provider offer is accepted or emailed. No shared flag, Venue setting or placement is changed during the case.
* Loading-only and controlled SDK error/blocked/no-fill tests remain separate setup-dependent checks.

**Tags:** analytics, post-purchase, checkout

**Parameters:**
OfferFlow: PermanentSuppression, AfterDismissal, NoPlacement

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete the prepared Event's sandbox checkout once and stay on confirmation. | Selected OfferFlow and recorded Platform/View/Widget mode. | One order confirms; while the placement lookup is unresolved, Rokt has neither appeared nor recorded a premature exposure. |
| Inspect the completed placement lookup and displayed offers. | OfferFlow table. | PermanentSuppression has one accurate not-shown exposure; AfterDismissal has partner offers and no temporary not-shown exposure; NoPlacement proceeds to the eligible Rokt evaluation. |
| Finish the selected offer decision and observe its actual outcome. | AfterDismissal: dismiss Showpass offers using No thanks in Grid or their secondary controls in Slide; the other flows stay on confirmation. | The final exposure matches the actual visibility/SDK outcome and recorded order; PermanentSuppression stays hidden without requesting a visible placement. |
| Dismiss any delivered Rokt offer without accepting it and inspect the recorded exposure requests. | Existing offer close control. | There is one final exposure for this confirmation evaluation; it is not counted as both permanently suppressed and shown, and the order stays accessible. |

## Coverage decisions and preservation

The table tracks definitions and publication, not execution. “Automated” means assertions exist in the reviewed source; every case remains **Not run**. SPT-5964–5967 are now assigned Qase IDs; TC-04/TC-05 remain uncreated. Only the approved Showpass provider split was published; the Organization split remains held.

| Existing ID / local label | Decision | Owner / provider | Parameters and supported combinations | Automation mapping and remaining gaps |
| --- | --- | --- | --- | --- |
| SPT-3316 | Updated and verified | Showpass internal | Scenario: six mapped values; WebPublic Desktop/Mobile except desktop-only SearchIcon. | Existing six homepage tests → 3316. Preserve search, every city pill, card click/impression, discovery links and independent IDs; add landing/branding assertions already automated but absent from saved fields. Internal helper does not enforce global duplicate counts. |
| SPT-3319 | Enhance; scope correction pending | Showpass internal | Scenario CityEvent/CategoryEvent; WebPublic Desktop/Mobile. | Existing CategoryEvent/CityEvent tests → 3319, runtime Scenario remains verify-category-event/verify-city-event. Draft values are PascalCase. Saved Platform includes Widget, but no city-discovery Widget entry is established: retain that discrepancy as Unknown, not passing coverage. Add independent clicked-card ID, since current code checks types and cross-request agreement without an independent ID equality. |
| SPT-3321 | Updated and verified | Showpass internal | CustomerState Guest/Authenticated; WebPublic Desktop/Mobile. | Current public single-day journey → 3321. Preserve initial/step/purchase checks; add exact labels, source, fees, invoice and authenticated bypass. Complete-transaction click and duplicate/premature-event checks are manual/proposed, not current assertions. Saved Widget parameter is a scope mismatch with this Public case; Widget responsibility is explicitly retained in 3322. |
| SPT-3322 | Enhance with explicit split | Showpass internal | WidgetMode Modal/Embedded; guest single-day, Widget Desktop/Mobile. | Current single-day Widget journey → 3322. Old saved ticket-type-first/calendar/timeslot path is not replaced implicitly: calendar view moves to TC-06; ticket-type-first and full attraction timeslot purchase remain retained, Blocked pending exact current flow/label binding. Saved WebPublic parameter is a scope mismatch; public responsibility stays in 3321. |
| SPT-5967 (formerly TC-06) | Created and verified; preserves calendar view only | Showpass internal | WidgetMode Modal/Embedded; legacy-compatible calendar; Desktop/Mobile. | Source calendar adapter verified; no dedicated calendar analytics registration. Current calendar is type 6, not saved type 1. Ticket-type-selection label/type and V2 calendar parity remain Unknown. |
| SPT-5960 | Updated and verified; split published | Showpass / GA4 | PurchaseScenario: four single-day entry/account values plus RecurringGuest; WebPublic/Widget Desktop/Mobile as mapped. | Current GA4 SingleDayEvent + WebPublicGuest/WebPublicAuthenticated/WidgetModalGuest/WidgetEmbeddedGuest → 5960. Recurring is manual-only; Safari/WebKit Widget is temporarily ignored/skipped. Ads and GTM responsibilities were moved to SPT-5964/SPT-5966 before 5960 was narrowed; recurring is preserved for each. |
| SPT-5964 (formerly TC-01) | Created and verified | Showpass / Google Ads | Same five dependent PurchaseScenario values as the GA4 draft. | Existing Ads four single-day scenarios have no case ID. SPT-5964 is the intended future automation mapping; no automation mapping changed. Recurring, full current strict wire-transaction check and all-provider browser verification remain gaps. |
| SPT-5965 (formerly TC-02) | Created and verified | Showpass / Meta Pixel | Same five dependent PurchaseScenario values; public vs Widget ViewContent differences retained. | Existing Meta four single-day automated scenarios remain unmapped; SPT-5965 now exists. Existing 3331 is Organization-owned and cannot satisfy this owner. Current corrected public-selector expectation awaits browser verification; Meta full purchase behavior is not a current demonstrated pass. |
| SPT-5966 (formerly TC-03) | Created and verified; manual-only | Showpass / GTM | PurchaseScenario SingleDayGuest/RecurringGuest; WebPublic Desktop. | Preserves the two former GTM responsibilities from 5960, even though Showpass GTM is outside the requested three-provider core. No Showpass GTM test registers; reference ID alone is not coverage. Container/tag configuration remains an execution prerequisite. |
| SPT-3324 | Enhance through proposed split | Organization / GA4 | Seven dependent PurchaseScenario values: single-day public guest/account/Modal/Embedded plus recurring guest/Modal/Embedded; Desktop/Mobile. | Actual saved baseline: PurchaseScenario SingleDayEvent/RecurringEvent × Provider GA4/GoogleAds/GTM × four grouped Platform/View rows = 24 combinations. Muted GA4 scaffold has no ID and weaker assertions; proposed 3324 mapping is not applied. Move Ads/GTM responsibility to TC-04/TC-05; retain both Event kinds and four context rows. |
| TC-04 | New, split from 3324 | Organization / Google Ads | Same seven mapped scenario values as the Organization GA4 draft. | Muted Ads public guest scaffold has no ID. Existing 3327 is conversion-label behavior, not a duplicate of ecommerce delivery. Widget/account/recurring payload assertions remain manual-only. |
| TC-05 | New, split from 3324 | Organization / GTM | Same seven mapped scenario values; actual named Organization data layer. | Muted GTM scaffold has no ID; container initialization and queue callbacks need repair/verification before automated credit. Downstream tags remain separate. |
| SPT-3331 | Enhance; preserve other-item checkout | Organization / Meta Pixel | PurchaseScenario SingleDayEvent/AssignedSeating/AttractionEvent/Product/Membership; WebPublic/Widget Desktop/Mobile, one prepared guest mode per result. | Existing scope includes seating/attraction plus Products and Memberships in steps. Muted Meta scaffold is only WebPublic guest and has no ID. Preserve those item kinds; draft begins with a prepared basket so checkout steps remain one readable flow. Remove the unrelated Ads assertion only after retaining it in 3327. Browser/server CAPI remains separate. |
| SPT-4958 | Updated and verified | Showpass internal / ad placements | Theme Dark/Light × Layout Grid/Slide = four settings pairs; four Platform/View contexts. | Current internal checkout ends with named offers dialog + at least one successful impression only. Draft retains creative, CTA, terms, dismissal and theme scope while adding placement/variant/layout/HTTP proof. Per-offer checks, Slide and mobile/Widget checks are manual/proposed. Email-offer sending is Deferred. |
| SPT-4962 | Enhance; loading scenario retained separately | Showpass internal / Rokt | OfferFlow PermanentSuppression/AfterDismissal/NoPlacement; four Platform/View contexts. | Existing RoktAdPlacementMode also has LookupLoading. Draft preserves slow-lookup expectation but does not invent a controllable manual delay: deterministic loading proof remains Blocked until a supported prepared response-delay setup exists. rokt_exposure is absent from Playwright assertions; frontend component tests are implementation evidence, not live results. Embedded-grid Rokt is Deferred with separate flag/flow. |
| SPT-3312, 3313 | Keep; later focused enhancement | Showpass internal / Product click and add-to-cart | Saved platform axes and item actions retained. | 3313 includes ordinary/assigned/attraction tickets, Product variants and Membership levels. Dedicated analytics folders for those journeys are placeholders, not implemented analytics tests. Exact item-specific setup/assertion enhancement remains needed; no deletion or silent contraction to tickets. |
| SPT-3314, 3317, 3318, 3320 | Keep; partial duplicate candidates only | Showpass internal / detail, login, warehouse, search | Existing detail suggestions, standard/Google login, warehouse storage and search-result page coverage retained. | 3316 overlaps only the homepage part of 3320; 3320's dedicated search-results card and 3314's suggested Events remain distinct. 3318 requires separately approved warehouse access and a propagation deadline; HTTP 200 cannot replace it. No case deletion is proposed. |
| SPT-3315 | Duplicate candidate for baseline; retain gateway variation | Showpass internal / checkout | Existing WebPublic/Widget and Charge API/Payment Intent intent retained. | Overlaps 3321/3322 initiation/purchase, but those currently run Payment Intent only. Do not retire 3315 until Charge API analytics and other-item scope have a verified home. |
| SPT-3323, 3325, 3326, 3328 | Keep pending provider-focused refinement | Organization / mixed legacy Google and Meta | Product removal/re-add, Widget Event/Membership/Calendar/Product/Checkout entries, legacy checkout, two-item cart and missing-tag checks retained. | Partial overlap with event drafts is not full duplication. Product remove_from_cart sends only generic event_category, not a promised item payload. These mixed-provider cases still need separate reporting responsibilities; do not claim this draft has converted all historical cases. Legacy/mobile applicability and full item-specific entry expectations remain Unknown where not bound. |
| SPT-3327 | Keep; expectation review blocked | Organization / Google Ads conversion action | Existing configured conversion ID/label behavior retained, separate from AW ecommerce events. | Requires a configured conversion tracking token/label. Current direct gtag loader overwrites explicit send_to with active tag IDs; source concern is not an executed end-to-end defect. No label is invented from AW-793802692. |
| SPT-3329 | Blocked for its asserted list events | External discovery / Google | Saved city/category/search discovery remains retained. | Source search found no view_item_list/select_item emitter in reviewed discovery/analytics code. Page views, internal impressions and card clicks do not establish these external list events. Ownership and intended contract need resolution; do not create fabricated assertions or claim absence across unreviewed clients. |
| SPT-3330, 3332 | Keep; partial overlap only | Organization / Meta AddToCart and detail | Product/Membership/ticket identities and missing-pixel checks retained. | 3331 starts at a prepared basket and does not replace detail ViewContent or AddToCart. Product AddToCart content_ids uses variant, whereas checkout/purchase uses Product ID; no false universal ID rule. Removing an Organization pixel must not be interpreted as removing Showpass's pixel. |
| SPT-4010, 2373, 2374, 4803 | Keep; separate reconciliation scope | Internal protection / UTM / discovery fees | Protection opt-in/out, campaign states, assigned-seat attribution and discovery/non-discovery fees retained. | Current single-day baseline only checks protection metadata. Discount, tax, shipping and protection revenue variants need independent provider expectations; do not imply 39.05 baseline proves them. Existing attribution case definitions are not executed proof. |
| SPT-4022 | Keep; configuration expectation conflict | Rokt visibility | Four web/widget saved-setting pairs and saved platform/view rows retained. | Source selects the Widget saved setting independently, but also requires rokt_confirmation_advertisements; the old case's expected matrix is inconsistent with its own preconditions. React Native Public applicability is Unknown in this review. No shared setting was inspected or toggled. |
| SPT-5449, 5450, 5694 | Keep | Organization analytics configuration | Saved editor/legacy/embedded access, malformed ID, restricted employee. | Preparation coverage exists; saving an ID does not prove any destination receives events. Reuse these cases rather than duplicate them in purchase cases. |
| No proposed package case | Blocked; setup/representation unresolved | Internal and external / Packages | Parent Event sells the package; different child Events supply included tickets. | Ticket formatter support is not proof of a package analytics contract. Need an exact parent/child basket and invoice, included quantities and fee/discount allocation, then determine parent/child item arrays, quantities and values for each provider. No unsupported PackageEvent parameter added. |
| No combined failure case | Deferred | Each internal/external destination | Abandoned, rejected, retry, receipt reload and delayed finalization are separate journeys. | Success drafts check no early/duplicate purchase within their observation; they do not prove failed attempts, reload deduplication, provider ingestion, warehouse storage or late callbacks. Native apps, Electron, employee sales and real devices are not established by browser projects. |

## Published scope changes and remaining holds

The approved batch made the following explicit responsibility changes. Held changes remain proposals:

* **Published: 5960 → GA4 only.** Ads and its recurring Event now belong to SPT-5964 (TC-01); GTM and its recurring Event now belong to SPT-5966 (TC-03). Both were created before narrowing 5960. Meta was added separately as SPT-5965 (TC-02).
* **3324 → Organization GA4 only:** Ads moves to TC-04 and GTM to TC-05, preserving both Event kinds and Desktop/Mobile public/Widget contexts. The old grouped ItemType=Event carries no additional variation and becomes Description context. The old case also permits zero-total orders; these paid-card drafts do not preserve that completion branch. Keep that branch pending a source-bound free-order case; do not describe the provider split as fully preserving 3324 until it has a home.
* **3319/3321/3322 platform fields:** move supported context into Description; do not mistake the saved single Platform values for independently verified paths. 3319's Widget city path remains Unknown. Public checkout stays in 3321, Widget checkout in 3322. The proposed 3322 single-day responsibility is narrower than its old attraction/calendar narrative: TC-06 preserves only calendar viewing, so the full ticket-type-first/timeslot purchase is still Blocked and prevents a wholesale replacement.
* **3331 → Meta only:** the incidental Ads conversion assertion belongs to 3327, whose label behavior needs resolution. Seating, attraction, Product and Membership checkout remain in 3331's mapped basket setups. AddToCart/detail checks stay in 3330/3332. Do not silently remove the unresolved Ads assertion without retaining its separate responsibility.
* **4962:** the three reproducible decision setups are drafted; the fourth saved LookupLoading setup remains a required blocked check. A normal fast response does not execute that check. The new embedded-grid Rokt path and controlled SDK outcomes also need separate setup-bound coverage.

The held Widget city, full attraction journey, zero-total Organization checkout and controlled lookup-loading checks still block replacing those four broader saved cases. The other scope changes were explicitly approved and published; publishing did not execute the tests.

## Reporting review and counts

**No result collision was established in the current mappings.** Ads/Meta missing from Qase is explained by their absent case IDs, not by another provider overwriting them. Local reporting and test outcomes remain available.

* Installed `playwright-qase-reporter` is **2.8.1**. `dist/result-builder.js` calls `generateSignature(idsForSignature, suites, metadata.parameters)` and emits `group_params` separately. The installed commons `dist/utils/signature.js` concatenates case IDs, normalized suite/title path and ordinary parameter entries; it does not include grouped fields. Suites are lowercased and whitespace-normalized, and parameter names/values are lowercased. Parameter entry order is not sorted; preserve its stable construction.
* Showpass explicitly supplies the project name, historical suite-file label `core/analytics/external/showpass/showpass-analytics.test.ts`, describe/provider and scenario title path. Ordinary parameters are PurchaseScenario=SingleDayEvent, Provider=GA4/GoogleAds/Meta and Scenario=WebPublicGuest/WebPublicAuthenticated/WidgetModalGuest/WidgetEmbeddedGuest. These distinguish the four supported scenarios. Grouped Platform/View/Browser/CustomerState/WidgetMode remain useful display context but alone would not make signatures unique.
* Homepage and city use distinct test titles and the default `test.titlePath()` suite path, which includes project/file/describes/test. City also has ordinary Scenario. Internal checkout's Guest/Logged in/Modal/Embedded suffixes and project paths keep its grouped-only CustomerState/WidgetMode variants distinct. Do not remove those title/path distinctions on the assumption that grouped parameters protect identity.
* SPT-5960 remains the only external provider mapped in the reviewed automation; creating 5964/5965/5966 did not change code mappings. Ads and Meta intentionally lack qaseId; the custom reporter marks results without a valid positive numeric case ID as `qase-unmapped-<outcome>`, omits upload and preserves the unlinked-result summary. Venue tests have no IDs either. Assigning a functional checkout case ID or reusing 5960 for another provider would misattribute results; it is not a remedy.
* Preserve `reporters/qase/reporter.ts`, `result-summary.ts`, Slack's unlinked section and the valid-ID filter. Keep `qase.ignore()` on off-beta cases, unsupported homepage SearchIcon views and GA4 WebKit Widgets. Ignored results are different from unmapped results. Statically muted venue cases are another distinct state.
* Keep `internal-analytics-actual-results.json` and `external-analytics-actual-results.json` **inside the action's Qase step**, including failure/correlation errors. Record `qase.comment('Invoice ID: …')` immediately after the independent confirmed invoice, before Attendee/receipt/final analytics checks. Invoice IDs and Basket IDs never become identity parameters. Local Actual Result evidence does not prove remote Qase rendering, which remains unverified here.
* Proposed PurchaseScenario labels combine dependent Event type, Customer state and Widget mode into readable saved Single values. The approved values are now saved on the nine published cases; values on the six held drafts remain local. Neither publication nor drafts change runtime metadata. A later approved implementation must explicitly map existing runtime `(PurchaseScenario, Scenario)` values to the intended case/scenario without renaming stable signature inputs casually.

**Counts are different units:**

* **Live definitions:** 24 direct suite cases reviewed in full (606: 13/13; 607: 8/8; 609: 3/3), plus eight related cases. The six supplied starting IDs are part of those 24, not six additional cases. No cases were created or changed during the initial review; the later approved publication is recorded below.
* **Case content:** 15 complete cases: nine published definitions (five updates plus four creates) and six pending drafts (3319, 3322, 3324, 4962, TC-04 and TC-05). Former TC-01/02/03/06 are SPT-5964/5965/5966/5967. SPT-5966 preserves the former Showpass GTM responsibility.
* **Draft parameter selections:** 64 across the 15 cases before Platform/View/browser contexts. This sums each case's mapped choices, including the four Theme/Layout pairs; it is not a full Cartesian matrix across the product. Context choices remain in each Description. No one-value Provider/ItemType/Platform parameter is added.
* **Current automation registration:** 140 entries, **five browser projects**: DesktopChrome, DesktopFirefox, DesktopSafari, MobileChrome, MobileSafari. Each project lists 28 entries: 6 homepage + 2 city + 4 internal checkout + 12 Showpass external + 4 venue external.
* **Those 140 entries:** 60 internal (3316: 30; 3319: 10; 3321: 10; 3322: 10), 60 Showpass external (20 per provider), 20 muted venue entries (five per provider). Static discovery shows 120 expected passed / 20 expected skipped; “expected passed” is registration metadata, **not an observed pass**.
* **Runtime exclusions on beta:** two mobile homepage SearchIcon entries call ignore/skip; four GA4 Widget/WebKit entries call ignore/skip. The 20 venue entries are statically muted. Therefore 114 entries are potentially runnable, 20 muted and six dynamically ignored, assuming prerequisites hold. Of the potentially runnable entries, 74 have mapped IDs (58 internal + 16 GA4); 40 Ads/Meta entries have no ID and are excluded from upload. These are source-derived eligibility counts, not uploaded or executed totals.
* **Initial review phase:** registration-only discovery succeeded with zero discovery errors; **0 browser executions, 0 purchases, 0 voids, 0 Qase writes, 0 result uploads**. No CI result was newly established. Historical runs below do not turn current registrations or drafts into passes.

## Item and execution limits

Single-day ticket selection is the only complete currently registered dedicated analytics purchase journey. Recurring ticket selection can reuse the Event-provider steps with an explicit chosen performance and independent IDs; it is manual/proposed. Assigned seats require seat selection; Products require a variant; Memberships require the correct level and enrollment; Packages require parent/child representation. These are not six interchangeable values in an allegedly automated purchase test.

The Organization Meta checkout draft preserves the existing other-item cases by starting with a known basket. It does not prove their pre-checkout ViewContent/AddToCart. Google Product removal/re-add remains in 3323/3325, and Product/Membership/detail-page/tag-absence behavior remains in 3328/3332 pending provider-focused refinement. Those retained cases must not be called fully provider-separated or fully source-validated simply because the new Event cases are ready.

**Financial boundary:** fee/tax/discount rules supply independent expected analytics values; order totals and transaction identity must reconcile. The baseline fixed-price ticket has no discount, shipping or protection. Shared external formatting removes protection items and subtracts protection fees; internal purchase keeps the full order amount. Google add-to-cart uses discounted display subtotal minus shipping, divided by line quantity and multiplied by the newly added count; Meta uses its line subtotal/service-fee/tax calculation. These differences need dedicated discounted/shipping/protected runs before those combinations can be claimed. Package allocation, Inventory/Capacity, charged/absorbed fee revenue, fulfillment and settlement are not established by analytics emission. This review is not a financial or release sign-off.

**Minimum later execution:** prioritize the four single-day entry/account scenarios for each Showpass provider with a ready Customer ticket limit, then recurring public guest for each. Run Organization providers separately after their muted automation is repaired or perform the standalone manual drafts against prepared destinations. Run internal guest/account and both Widget modes, then ad and Rokt scenarios with confirmed saved prerequisites. Retain the unmapped marker until the relevant case is actually created/mapped under separate approval. A blocked setup is not a pass or a reason to silently shrink the matrix.

## Sources and evidence

Reviewed **November 11, 2026**. Local source facts do not establish the deployed build or saved live flags.

**Qase read:** `qasectl --help` and `qasectl testops --help` expose no case/suite read. Used the maintained `05 Tooling/scripts/collect-release-coverage.mjs` read-only paginated API path, with vault credentials kept out of output. Project SPT: **2,419/2,419 unique cases**, stable reported total, complete snapshot retrieved **2026-11-11 18:11:05 UTC** (11:11 AM MST). Local case filters: analytics, google ads, ga4, meta pixel, tag manager, rokt across the complete serialized definitions; 67 candidate records. All 24 direct cases in suites 606/607/609 were fully reviewed, including descriptions, prerequisites, postconditions, tags, saved `parameters` types/values and all steps; no unread direct IDs. Suite metadata read found 382 suites, the three suites' counts 13/8/3 and no children beneath them; all three are children of suite 603. Of 43 candidates outside those suites, only the eight relevant records listed below were fully reviewed; the other candidates are not claimed as reviewed. Additional absence claims outside this scope remain Unknown.

Related fully reviewed outside-suite IDs: **2373, 2374, 4022, 4958, 4962, 5449, 5450, 5694**. Together with the 24 direct-suite cases, this is **32 unique full case reviews**. The 35 other outside-suite candidate records were not fully reviewed; no absence or duplicate conclusion is claimed from their titles alone.

> [!info]- Saved Qase baseline before these local drafts
> * **3316:** two steps; Single Scenario = SearchTyping, SearchResult, SearchIcon, CityPills, EventCard, CardImpression. Tags analytics/public/home-page. Existing scope is guest homepage Desktop/Mobile with SearchIcon Desktop only.
> * **3319:** eight steps; separate Singles Platform = WebPublic, Widget and Scenario = verify-category-event, verify-city-event. Tags analytics/public/discovery/events/tracking-links. Saved fields have no Platform/View Description table; the Widget city path is not established by the current source review.
> * **3321:** nine steps; Single Platform = WebPublic, Widget. Tags checkout/analytics/public/purchases/tracking-links. Saved purpose is public checkout initiation, intermediate screens, submit click and purchase, with no saved CustomerState field.
> * **3322:** 12 steps; Single Platform = WebPublic, Widget. Tags checkout/analytics/widget/public/tracking-links. Saved purpose includes ticket-type-first/calendar/timeslot selection and Widget checkout; neither WidgetMode nor PurchaseScenario is currently saved.
> * **5960:** 11 steps; Single PurchaseScenario = SingleDayEvent, RecurringEvent; Single Provider = GA4, GoogleAds, GTM. Tags public/analytics/checkout. Saved context is guest WebPublic Desktop and one paid CAD ticket, no seat/package/questions/extra terms. Provider splitting changes responsibility and cannot be treated as a wording-only enhancement.
> * **3324:** seven steps; one Group has Platform = Web Public, Web Public, Widget, Widget; View = Desktop, Mobile, Desktop, Mobile; ItemType = Event in all four rows. Singles PurchaseScenario = SingleDayEvent, RecurringEvent and Provider = GA4, GoogleAds, GTM. Tag analytics. Saved steps allow both paid and zero-total orders. The group is four linked context rows, not independent Cartesian Platform/View/ItemType values.
> * **3331:** six steps; Singles Platform = WebPublic, Widget and EventConfig = SingleDayEvent, SeatingEvent, AttractionEvent; steps also name Product/Membership checkout and an incidental Ads conversion assertion. Tag analytics. The draft's explicit five basket setups preserve that item breadth while separating the Ads responsibility.
> * **4958:** five steps; grouped WebPublic/Widget × Desktop/Mobile as four rows, Single Theme = Dark, Light. Tags post-purchase/checkout. Creative, primary CTA, terms and dismissal remain in the draft; Layout is an added meaningful setup variation.
> * **4962:** six steps; Single RoktAdPlacementMode = PermanentSuppression, TemporarySequenceAfterDismissal, NoAdPlacement, LookupLoading. Tags post-purchase/checkout. Three proposed OfferFlow values clarify the first three; controlled LookupLoading remains a retained blocked check.

> [!info]- Exact source revisions and reviewed paths
> **Playwright:** branch `add-check-for-internal-showpass-AW`, HEAD `4d74930f9553b01ae6d0a1f3ca5c62793573771b`; local `origin/master` `b0d18efe90e5f625a36a343a7c30fc6a03dbb64a`, merge base `cf3857cb9948d5a662cef1fd7b142335345683ff`. The branch comparison changes 13 files (+1148/-573), adding independent Ads/Meta contracts and shared payment/invoice capture. No fetch or branch switch occurred; origin/master is the existing local remote-tracking reference. Six pending files were reviewed: external guide, shared purchase steps, Ads plan, Showpass expectations/public/Widget steps. They derive catalog value and displayed step wording from configured data and preserve metadata/attachment/invoice placement. Working-tree scope is distinct from committed HEAD.
>
> Relevant Playwright paths: `docs/internal-analytics.md`, `docs/external-analytics.md`; internal homepage and city configs/runners/steps/guides; `tests/core/analytics/internal/checkout/` single-day config/runner/expectations and public/Widget/shared/purchase/confirmation steps; `tests/core/analytics/external/showpass/checkout/single-day/` config/runner/expectations/public/Widget steps; `external/shared/checkout/` runner/purchase steps; venue config; `utils/analytics/internal-analytics.ts`, internal expectations, checkout contracts and results writer; `fixtures/configs/playwright-projects.ts`; `reporters/qase/reporter.ts`, `result-summary.ts`; installed reporter `dist/result-builder.js` and nested commons `dist/utils/signature.js`.
>
> **Backend:** branch `develop`, HEAD `7349f8f596328e6f050b9e48df87fa12cb184ab5`, clean on inspection. First authority for ingress/settings: `apps/analytics/api/public/viewsets.py`, serializers, `services/interactions/internal_analytics_submission.py`, `apps/core/flags.py`, Venue model analytics/Rokt fields and public serializer, `docs/systems/analytics_taxonomy_and_pipeline.md`, `marketing_analytics_tags_pixels_and_capi.md`; legacy Google helper emission references. internal_analytics OFF returns HTTP 200 without normal ingestion, so 200 alone cannot establish storage or a ready switch.
>
> **Frontend:** branch `develop`, HEAD `2821f0cd79425d13395861874ae8776862fe82da`; two pending Jumbotron files clear the selected location/search item, not the provider checkout contracts. Reviewed `shared/services/analytics/AnalyticsService.ts`, InternalAnalytics/ExternalAnalytics, external formatter, `shared/lib/analytics/gtag.ts`, loader/gtag, gtm, facebookpixel, Google payload builders; internal AddToCart/InitiateCheckout/Purchase/Rokt builders; Widget LegacyCalendarWidgetAdapter; organization AnalyticsPage field labels; confirmation host/PostPurchaseMarketing/useRoktAnalytics and eligibility; ad-placement modal/slide/context/analytics builders. Do not equate tests' older source links with this inspected revision.
>
> Backend first, frontend reachability second, automation assertions third. Selected handbook: Checkout and Post-Purchase Coverage, especially its analytics outcome and distinction between payment/order/consumer completion. Applied [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass Qase Gap Analysis]], [[05 Tooling/Qase Test Case Writing Rules]] and [[05 Tooling/qasectl]].

**Read-only browser availability:** the Codex browser inventory contained only about:blank. No suitable existing Showpass session was available; no new session or desktop app was opened. Case UI wording/setup is source-verified, not newly live-verified.

**Historical evidence kept separate:** Playwright documentation records prior internal public successes and Widget Cloudflare setup failures; its latest external notes record GA4/Ads public guest successes, authenticated cumulative Customer ticket-limit failures, earlier Meta expectation failures, then a source correction awaiting execution. Existing [[03 Test Cases/Analytics/safari-ga4-widget-2026-11-10]] records a real Safari privacy configuration blocking the loader, whereas the separate CI/WebKit investigation reports a loaded script with no collect request. These have different observed layers and must not be merged into a confirmed common cause. [[03 Test Cases/Analytics/google-ads-beta-events-2026-11-10]] proves a sampled Ads view_item request was observed; it did not prove its HTTP status or full purchase/Ads reporting.

**Initial review verification and cleanup:** registration-only `--list --reporter=json` ran with Qase and Slack disabled and found 140 registrations/zero errors. The maintained Markdown parser was used locally to check complete fields, steps and parameters without contacting Qase or preparing apply operations. Temporary complete Qase/suite exports and registration output were kept under `/private/tmp` for this review and deleted after the final note captured necessary counts, saved baselines and source findings. No raw contact/credential data or generated binaries were added to the vault. No new screenshots were produced.

## Verified Qase publication — November 11, 2026

User explicitly approved the displayed batch with **“Approve this batch.”** All **nine operations succeeded**: five existing cases updated and four cases created. The maintained batch writer read back the five updates and verified every selected field. An additional read-only complete-field comparison verified Title, Description, Preconditions, Postconditions, Tags, exact Single parameter names/values/types and Steps on all four new cases; every comparison matched.

Only the approved seven content fields changed on existing cases. Suite, priority, type, behavior and layer matched before/after; the payload did not write automation status or other unrelated metadata. No deletions, moves, held-case writes, code mapping changes, test executions, purchases, voids or result uploads occurred.

| Operation | Qase case | Original local label | Verified Title | Suite | Tags | Saved Single parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Created | [SPT-5964](https://app.qase.io/case/SPT-5964) | TC-01 | Core - Analytics - Record Showpass Google Ads ticket checkout events | 607 | analytics, google, checkout | PurchaseScenario = SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest | 10 |
| Created | [SPT-5965](https://app.qase.io/case/SPT-5965) | TC-02 | Core - Analytics - Record Showpass Meta Pixel ticket checkout events | 609 | analytics, facebook, checkout | PurchaseScenario = SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest | 10 |
| Created | [SPT-5966](https://app.qase.io/case/SPT-5966) | TC-03 | Public Checkout - Analytics - Record Showpass GTM ticket checkout events | 607 | analytics, google, checkout | PurchaseScenario = SingleDayGuest, RecurringGuest | 10 |
| Created | [SPT-5967](https://app.qase.io/case/SPT-5967) | TC-06 | Widget - Analytics - Record the calendar view with its Organization and Widget mode | 606 | analytics, widget, discovery | WidgetMode = Modal, Embedded | 2 |
| Updated | [SPT-3316](https://app.qase.io/case/SPT-3316) | — | WebPublic - Analytics - Record homepage search and Top Events interactions | 606 | analytics, public, home-page | Scenario = SearchTyping, SearchResult, SearchIcon, CityPills, EventCard, CardImpression | 2 |
| Updated | [SPT-3321](https://app.qase.io/case/SPT-3321) | — | Public Checkout - Analytics - Record a ticket purchase for guest and signed-in Customers | 606 | checkout, analytics, public | CustomerState = Guest, Authenticated | 9 |
| Updated | [SPT-5960](https://app.qase.io/case/SPT-5960) | — | Core - Analytics - Record Showpass GA4 ticket checkout events | 607 | analytics, checkout, google | PurchaseScenario = SingleDayGuest, SingleDayAccount, SingleDayModal, SingleDayEmbedded, RecurringGuest | 10 |
| Updated | [SPT-3331](https://app.qase.io/case/SPT-3331) | — | Core - Analytics - Record the Organization's Meta checkout and purchase events | 609 | analytics, facebook, checkout | PurchaseScenario = SingleDayEvent, AssignedSeating, AttractionEvent, Product, Membership | 5 |
| Updated | [SPT-4958](https://app.qase.io/case/SPT-4958) | — | Core - Post Purchase - Show eligible partner offers and record their interactions | 1032 | post-purchase, checkout, analytics | Theme = Dark, Light; Layout = Grid, Slide | 6 |

**Published responsibility changes:** 5960 is now GA4-only; its original Ads/GTM and recurring responsibilities are saved in 5964/5966, created first. 5965 adds Showpass Meta. 3321 is explicitly the single-day public guest/account journey; its saved Widget parameter was removed, with Widget coverage retained in unchanged 3322. Its formerly generic item setup was narrowed to this documented ticket journey as disclosed in the approved preview; broader item/gateway checks remain in 3313/3315. 3331 is Meta-only; Ads conversion remains in unchanged 3327 with the previously recorded expectation uncertainty. 4958 retains four public/Widget Desktop/Mobile contexts in Description, keeps Dark/Light and adds Grid/Slide. Those context rows are no longer grouped identity parameters.

**Held unchanged:** SPT-3319, 3322, 3324 and 4962, plus uncreated TC-04/TC-05. Their reasons remain in the coverage table. SPT-5967 proves the calendar-view definition only; it does not replace the unresolved full attraction journey in 3322.

**Importer correction:** the local Qase helper now preserves blank lines inside multi-section Preconditions instead of truncating at the first blank line. All 15 cases' full Preconditions/Postconditions were compared with Markdown; JavaScript syntax checks passed. The live readback above also verifies that complete multi-section setup was saved. Product source repositories were not edited.

**Cleanup:** the fifteen exact working files in `/private/tmp/analytics-qase-publication-20261111/` were removed after recording this verified result, and the empty directory was removed. No pending apply receipt or input remains. The final definitions, new IDs, approved scope changes and held work are preserved in this canonical note. Publication is not a passing regression result.
