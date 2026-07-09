---
title: SPW-19386 Hardcopy Ticket Order Page Test Cases
tags:
  - jira
  - test-cases
  - dashboard
  - tickets
---

# SPW-19386 Hardcopy Ticket Order Page Test Cases

## Jira Intake Summary

- Jira card: `https://showpass.atlassian.net/browse/SPW-19386`
- Jira read status: `05 Tooling/scripts/jira-read-issue.mjs` returned 404 with the configured token, so the card text was not available.
- Available task context: feature parity task for `SPW-19386`, identified as hardcopy ticket order page migration.
- Intake interpretation: validate the existing Web App hardcopy ticket order behavior so a migrated page can be tested for parity.

## Sources Reviewed

- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/thermal_ticket_orders.html`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/dashboard/tickets/controllers/ThermalTicketOrdersController.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/dashboard/urls.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/dashboard/views.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/api/routers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/static/src/core/tickets/models.js`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/serializers/serializers.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/viewsets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/ticket_lifecycle/thermal_tickets.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tasks.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_api_venue_based_ticket_item.py`
- `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/tests/test_models.py`

## Assumptions and Unknowns

- The Jira acceptance criteria could not be read because the API returned 404.
- These cases target parity with the existing Web App Angular page and backend behavior, not a diff between old and new implementations.
- The migrated page should keep the same route intent, required fields, preview behavior, submit behavior, and backend validation outcomes unless product changed the requirements outside the available source.
- Frontend-only visual parity, responsive layout, and copy-level checks may need a second pass against the migrated implementation.

## Source-backed Behavior

- The hardcopy ticket order page is available from the dashboard events area at `order-hardcopy-tickets`.
- The page lets a dashboard user select an upcoming event, select a non-bundle ticket type, customize printed ticket text, enter quantity and starting offset, choose pickup or shipping, preview a PDF, and submit the order.
- Event search loads future events for the active venue and supports loading more paginated results.
- Assigned seating events and ticket packages are visible but disabled with messaging to contact an account manager.
- Selecting an event defaults the first line text to the event name; selecting a ticket type defaults the second line text to the ticket type name and price text to the ticket price.
- Preview calls `GET /api/venue/tickets/thermal-ticket-orders/preview-thermal-ticket/`, validates the same serializer gates as submit, starts a PDF preview job, and opens the generated file.
- Submit creates a postal address first when pickup is not selected, then creates a thermal ticket order through `POST /api/venue/tickets/thermal-ticket-orders/`.
- Creating a thermal ticket order alerts support. Processing creates complimentary Web Box Office ticket baskets in batches, sends PDF ticket batches to support, and sends a failure email if processing fails.
- Backend validation rejects unsupported events or ticket types, including insufficient inventory, assigned seating, password-protected events, ticket type mismatch, sold-out ticket types, ticket packages, voucher-credit ticket types, closed sales windows, and enforced guest info/custom-question flows.

## Risk Areas

- Migrated page may miss a legacy field or default value, causing printed tickets to differ from existing orders.
- Preview and submit may diverge if the new page does not call the same venue-based API with the same payload shape.
- Pickup vs shipping behavior is easy to regress because shipping creates a postal address before order creation while pickup omits it.
- Unsupported event and ticket type states must remain blocked before support receives invalid hardcopy orders.
- Quantity and offset limits affect printed ticket numbering, support workload, and downstream complimentary ticket creation.
- Success feedback and form reset matter because support is alerted asynchronously after the order is created.

## State-space / Setup Matrix

| Axis | Values | Why It Matters |
| --- | --- | --- |
| Fulfillment | Shipping, Pickup | Shipping requires address fields and creates a shipping address; pickup should not require or send shipping details. |
| Order action | Preview, Submit | Preview must validate and generate a PDF without creating an order; submit creates the order and notifies support. |
| Event eligibility | Standard GA event, assigned seating event, password-protected event, event with custom questions | Backend accepts only events that can be fulfilled through generated complimentary box office tickets. |
| Ticket type eligibility | Standard ticket type, bundle/package, sold out, voucher credit, custom questions, closed sales window | Backend rejects ticket types that cannot be generated safely for hardcopy fulfillment. |
| Inventory | Enough inventory, event inventory too low, ticket type inventory too low | The requested quantity must not exceed event or ticket type inventory. |
| Text customization | Default text, edited title/event/type/message/price text, max length boundary | Printed ticket layout depends on these fields and character limits. |
| Quantity | Minimum quantity, bulk quantity near page limit, backend max boundary | Large requests create ticket baskets in batches and can stress processing. |
| Venue permission | Can manage events, cannot manage events | The venue-based API requires manage-events permission for hardcopy ticket orders. |

## Recommended Test Data

- Dashboard user with venue permission to manage events.
- Venue with current address data and at least one upcoming non-assigned event.
- Standard ticket type with available inventory and active sales window.
- Event and ticket type variants for assigned seating, package/bundle, sold out, password-protected, voucher-credit, custom-question, and limited inventory validation.
- Test address for shipped orders and a pickup scenario with no shipping address.
- Quantity values: `1`, a normal multi-ticket quantity such as `25`, and a high quantity near the page limit such as `1000`.

## Qase-ready Manual Test Cases

TC-1: Dashboard - Hardcopy Ticket Orders - Verify a shipped hardcopy ticket order can be submitted

**Title:** Dashboard - Hardcopy Ticket Orders - Verify a shipped hardcopy ticket order can be submitted

**Description:** Validates that a dashboard user can submit a hardcopy ticket order for a standard event and ticket type with shipping details, protecting against missing form fields, broken address creation, and failed order submission.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A dashboard user can manage events for the selected venue. The venue has an upcoming non-assigned event with a standard ticket type, active sales window, and enough inventory. Pickup is not selected.

**Postconditions:** A hardcopy ticket order exists for the selected event and ticket type, and support is alerted for processing.

**Tags:** dashboard, tickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the dashboard hardcopy ticket order page for the venue. | `/dashboard/events/order-hardcopy-tickets/` | The Hardcopy Ticket Order Form is visible with event, ticket type, ticket text, quantity, pickup, shipping, preview, and submit controls. |
| Search for and select an upcoming standard event. | Event with no assigned seating | The event is selected and the first line text is populated from the event name. |
| Select a standard ticket type for the event. | Ticket type with active sales and inventory | The ticket type is selected, the second line text is populated from the ticket type name, and the price text is populated from the ticket price. |
| Enter valid printed ticket text and quantity. | Quantity `25`, starting offset `1` | The entered values remain visible and no validation error is shown. |
| Fill the shipping fields. | Addressee, street address, city, province, country, postal code | All required shipping fields are accepted. |
| Submit the order. | None | A success message says the order was submitted and a Showpass representative will be in contact shortly. |
| Review the order record or support alert. | Submitted order | The order references the selected venue, event, ticket type, quantity, starting offset, printed text, user, and shipping address. |

TC-2: Dashboard - Hardcopy Ticket Orders - Verify pickup orders do not require shipping details

**Title:** Dashboard - Hardcopy Ticket Orders - Verify pickup orders do not require shipping details

**Description:** Validates that a dashboard user can submit a hardcopy ticket order for pickup without entering a shipping address, protecting against regressions where pickup orders are blocked by address validation.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A dashboard user can manage events for the selected venue. The venue has an upcoming standard event and ticket type that can be ordered as hardcopy tickets.

**Postconditions:** A hardcopy ticket order exists without a shipping address and is marked for pickup in support processing.

**Tags:** dashboard, tickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the hardcopy ticket order page. | Active venue | The order form is visible. |
| Select a valid event and ticket type. | Standard event and ticket type | The ticket text defaults are populated from the selected event and ticket type. |
| Select pickup from the Showpass Calgary office. | Pickup enabled | The shipping address section is hidden or no longer required. |
| Enter a valid quantity and starting offset. | Quantity `10`, starting offset `1` | The order details are accepted without shipping-field errors. |
| Submit the order. | None | The order submits successfully and shows the success message. |
| Review support processing details. | Submitted pickup order | The order is sent for processing with pickup instead of a shipping address. |

TC-3: Dashboard - Hardcopy Ticket Orders - Verify preview validates the order and opens a PDF without submitting

**Title:** Dashboard - Hardcopy Ticket Orders - Verify preview validates the order and opens a PDF without submitting

**Description:** Validates that the preview action uses the selected hardcopy ticket details to generate a PDF preview without creating a ticket order, protecting against preview-only actions creating real support work.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A dashboard user can manage events for the selected venue. A valid event and ticket type are available.

**Postconditions:** No hardcopy ticket order is created by the preview action.

**Tags:** dashboard, tickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the hardcopy ticket order page. | Active venue | The form is ready for input. |
| Select a valid event and ticket type. | Standard event and ticket type | Required event and ticket type fields are complete. |
| Customize the printed ticket text. | Title, first line, second line, third line, price text | Character counters show the entered values within allowed limits. |
| Click Get Preview. | None | The preview button shows a generating state while the preview job runs. |
| Wait for the preview to complete. | None | A thermal ticket PDF preview opens in a new window or tab. |
| Check order records or support alerts. | Previewed data | No new hardcopy ticket order or support processing alert is created from preview alone. |

TC-4: Dashboard - Hardcopy Ticket Orders - Verify required field and character limit validation

**Title:** Dashboard - Hardcopy Ticket Orders - Verify required field and character limit validation

**Description:** Validates required hardcopy order fields and printed ticket text limits, protecting against incomplete orders and ticket layout text that exceeds the supported print area.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A dashboard user can manage events for the selected venue.

**Postconditions:** No hardcopy ticket order is created from invalid form input.

**Tags:** dashboard, tickets

**Parameters:**
ValidationPath: MissingRequiredFields, PrintedTextLimit, QuantityLimit

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the hardcopy ticket order page. | Active venue | The form is visible. |
| Follow the selected validation path. | ValidationPath | The field under test is left invalid or filled beyond the allowed value. |
| Click Get Preview or Submit Order. | None | The form marks the invalid field and does not submit or generate a preview. |
| Correct the invalid field. | Valid value | The validation message clears and the form can continue. |

TC-5: Dashboard - Hardcopy Ticket Orders - Verify unsupported event types cannot be ordered

**Title:** Dashboard - Hardcopy Ticket Orders - Verify unsupported event types cannot be ordered

**Description:** Validates that hardcopy orders are blocked for event configurations the backend cannot safely fulfill, protecting against invalid support requests and generated complimentary tickets for unsupported events.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A dashboard user can manage events for the selected venue. Unsupported event variants exist for the selected venue.

**Postconditions:** No hardcopy ticket order is created for an unsupported event.

**Tags:** dashboard, tickets, edge-case

**Parameters:**
UnsupportedEvent: AssignedSeating, PasswordProtected, CustomQuestions, InsufficientEventInventory

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the hardcopy ticket order page. | Active venue | The form is visible. |
| Select or attempt to select the unsupported event variant. | UnsupportedEvent | Assigned seating events are shown as unavailable with account-manager guidance, or backend validation rejects the event on preview or submit. |
| Enter the remaining required order details if the form allows selection. | Valid ticket type, quantity, and fulfillment details | The form is ready to exercise backend validation. |
| Click Get Preview or Submit Order. | None | The order is rejected with an event-related validation message and no order is created. |

TC-6: Dashboard - Hardcopy Ticket Orders - Verify unsupported ticket types cannot be ordered

**Title:** Dashboard - Hardcopy Ticket Orders - Verify unsupported ticket types cannot be ordered

**Description:** Validates that hardcopy orders are blocked for ticket types the backend cannot safely fulfill, protecting against invalid printed tickets, package misuse, voucher credit creation, and unavailable inventory.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A dashboard user can manage events for the selected venue. A standard event has unsupported ticket type variants.

**Postconditions:** No hardcopy ticket order is created for an unsupported ticket type.

**Tags:** dashboard, tickets, edge-case

**Parameters:**
UnsupportedTicketType: Package, SoldOut, VoucherCredit, CustomQuestions, ClosedSalesWindow, InsufficientTicketTypeInventory

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the hardcopy ticket order page. | Active venue | The form is visible. |
| Select a standard event. | Event without assigned seating | The ticket type dropdown is enabled. |
| Select or attempt to select the unsupported ticket type variant. | UnsupportedTicketType | Ticket packages are shown as unavailable with account-manager guidance, or backend validation rejects the ticket type on preview or submit. |
| Enter any remaining required order details if the form allows selection. | Valid quantity and fulfillment details | The form is ready to exercise backend validation. |
| Click Get Preview or Submit Order. | None | The order is rejected with a ticket-type validation message and no order is created. |

TC-7: Dashboard - Hardcopy Ticket Orders - Verify successful processing creates complimentary Web Box Office tickets

**Title:** Dashboard - Hardcopy Ticket Orders - Verify successful processing creates complimentary Web Box Office tickets

**Description:** Validates backend fulfillment after a hardcopy order is created, protecting against orders that submit successfully but do not generate the expected complimentary ticket batches for printing.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A hardcopy ticket order has been submitted for a standard event and ticket type. Background processing can run for thermal ticket orders.

**Postconditions:** Printable thermal tickets are generated for the requested quantity.

**Tags:** dashboard, tickets, box-office

**Parameters:**
OrderQuantity: SmallBatch, MultipleBatch

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Submit a valid hardcopy ticket order. | OrderQuantity | The order is created and support receives the order alert. |
| Run or wait for thermal ticket order processing. | Submitted order | Complimentary Web Box Office basket purchases are created for the requested quantity. |
| Review the generated ticket items. | Submitted order | The generated tickets are redeemable and tied to the thermal ticket order. |
| Review the processing email or attached PDF batch. | Submitted order | Support receives the thermal ticket PDF batch for the order. |
| Verify the processed count. | Submitted order | The processed quantity matches the requested hardcopy ticket quantity. |

TC-8: Dashboard - Hardcopy Ticket Orders - Verify processing failure sends a support error without leaving a bad active basket

**Title:** Dashboard - Hardcopy Ticket Orders - Verify processing failure sends a support error without leaving a bad active basket

**Description:** Validates backend recovery when a created hardcopy order cannot be processed, protecting against silent support failures and lingering invalid baskets.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** A hardcopy ticket order exists and the selected ticket type becomes invalid before processing, such as inventory dropping below the requested quantity.

**Postconditions:** Support receives a failure notification and invalid basket work is cleaned up.

**Tags:** dashboard, tickets, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a hardcopy ticket order that passes initial validation. | Valid event and ticket type | The order is saved. |
| Change the setup so processing can no longer complete. | Ticket type inventory below requested quantity | The order is now invalid for purchase processing. |
| Run thermal ticket order processing. | Submitted order | Processing does not complete ticket generation. |
| Review support notifications. | Submitted order | Support receives a failure email that names the thermal ticket order and validation error. |
| Review any partially created basket. | Submitted order | A failed basket is expired or no active invalid basket remains for the order. |

TC-9: Dashboard - Hardcopy Ticket Orders - Verify venue permissions are enforced

**Title:** Dashboard - Hardcopy Ticket Orders - Verify venue permissions are enforced

**Description:** Validates that only venue employees with event management access can preview or submit hardcopy ticket orders, protecting against unauthorized venue users creating support work or complimentary tickets.

| Platform     | View    |
| ------------ | ------- |
| WebBoxOffice | Desktop |

**Preconditions:** Two venue employees exist for the same venue: one can manage events and one cannot manage events. A valid event and ticket type are available.

**Postconditions:** No hardcopy ticket order is created by the employee without event management access.

**Tags:** dashboard, tickets, employee-permissions

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in as a venue employee without event management access. | Restricted employee | The employee cannot successfully use the hardcopy ticket order API. |
| Attempt to open or use the hardcopy ticket order page. | Active venue | The page is blocked, hidden, or API calls are denied according to the dashboard permission pattern. |
| Attempt to preview or submit a hardcopy ticket order directly. | Valid event and ticket type payload | The request is rejected and no hardcopy ticket order is created. |
| Sign in as a venue employee with event management access. | Authorized employee | The same valid event and ticket type can be previewed or submitted. |

## Minimum Execution Set

- TC-1: shipped order submission.
- TC-2: pickup order submission.
- TC-3: preview without submit.
- TC-5 with `AssignedSeating` and `PasswordProtected`.
- TC-6 with `Package`, `SoldOut`, and `ClosedSalesWindow`.
- TC-7 with `SmallBatch`.
- TC-9: restricted employee cannot preview or submit an order.

## Suggested Automated Coverage

- Add an end-to-end parity test for the migrated hardcopy ticket order page that completes a shipped order with a standard event and ticket type, then verifies the order payload.
- Add a preview test that verifies the PDF preview endpoint is called and no order is created.
- Add validation tests for assigned seating events, packages, and sold-out ticket types.
- Add backend API coverage for pickup vs shipping payloads if not already covered in the migrated stack.
- Add a processing task test for successful complimentary ticket generation and failure email behavior if the migration changes any order payload fields.

## Open Questions

- Jira card content and acceptance criteria were not available because Jira returned 404 with the configured token.
- Confirm whether the migrated page is expected to keep the existing route exactly or expose a new React route.
- Confirm whether mobile view must be supported for this dashboard-only hardcopy ticket workflow.
- Confirm whether the displayed hardcopy price notice should remain `$0.25 per ticket, plus GST and shipping`.
