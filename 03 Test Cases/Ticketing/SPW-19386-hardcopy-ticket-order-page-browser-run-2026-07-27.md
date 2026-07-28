---
title: SPW-19386 Hardcopy Ticket Order Page Browser Run 2026-07-27
date: 2026-07-27
tags:
  - jira
  - browser-testing
  - release-readiness
  - dashboard
  - tickets
status: complete
---

# SPW-19386 Hardcopy Ticket Order Page Browser Run — 2026-07-27

> [!warning] Run complete — Decision blocked by missing submission evidence
> Browser execution is complete for the safely testable beta form scope. The user classified the keyboard-clear finding as non-blocking. Real order creation and downstream processing were not executed without disposable fixtures, so the full release decision remains blocked by that named evidence gap.

## Run Context

| Field | Value |
| --- | --- |
| Environment | Showpass beta |
| Target | `https://beta.showpass.com/manage/events/order-hardcopy/` |
| Browser | Codex in-app browser, desktop viewport |
| Authenticated role | Dashboard user with access to the Order Hardcopy Tickets page; exact permission set not independently inspected |
| Test source | [[SPW-19386-hardcopy-ticket-order-page-test-cases]] |
| Governing workflow | [[06 Prompts/Interactive Browser Release Testing]] |
| Started | 2026-07-27 14:52 MDT |
| Ended | 2026-07-27 15:03 MDT |
| Test-data boundary | Navigation, selection, reversible/unsaved field input, validation, preview, and responsive inspection are allowed. A real order submission, permission change, inventory change, support notification, or downstream ticket processing is not allowed without disposable fixtures and lifecycle proof. |
| Initial state | Form loaded directly on the migrated route. No event or ticket type was selected. Shipping was selected by default and the venue/user-derived shipping fields were prefilled. |

## Testing Intent

We are testing whether an authorized dashboard user can configure and preview a hardcopy ticket order on the migrated beta page while event eligibility, ticket eligibility, printed-ticket limits, fulfillment rules, and the no-order side effect of preview stay true; this matters because an invalid or accidental order can create charges, support work, incorrect printed tickets, or downstream complimentary ticket fulfillment.

| Field | Answer |
| --- | --- |
| Criticality bucket | Money/order state, fulfillment, inventory, permission boundary, async final state |
| Business invariant | Only eligible event/ticket combinations and valid quantities can reach preview or order creation; preview must not create an order; shipping and pickup must send the correct fulfillment state. |
| Actor impact | Dashboard organizers can incur reprint charges or receive unusable tickets; support can receive invalid work; attendees can receive incorrect inventory or tickets. |
| Failure mode | Invalid data accepted, dependent defaults lost, pickup/shipping branch divergence, accidental order creation, unreadable errors, or missing async outcome. |
| Observable proof | Visible field state, validation messages, dependent defaults, disabled options, preview PDF/new tab, clean browser errors, and downstream/order evidence where a safe fixture exists. |
| Primary surfaces | `/manage/events/order-hardcopy/`, preview API/task/PDF, order and address APIs, support/processing side effects |
| In scope | Authorized desktop route; form controls; event and ticket selection; field limits; pickup/shipping UI; safe validation; preview; keyboard and smaller viewport checks; fixture-backed unsupported states if available |
| Out of scope | Destructive permission/inventory setup; real order submission without disposable data; support email, basket creation, PDF batch fulfillment, and failure-task cleanup without backend fixtures |
| Confidence | High for browser-visible form behavior and preview output; low for real order persistence, permissions, and downstream processing because those fixtures were intentionally unavailable. |

## Proof Target Map

| ID    | Proof Target                                                                                             | Why It Matters                                                       | Result                                                                                |
| ----- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| PT-1  | Authorized user can open the migrated route and see the complete form                                    | Prevents migration/permission routing failure                        | Passed on beta; Back returned to `/manage/events/`                                    |
| PT-2  | Event selection enables ticket selection and applies event-derived defaults                              | Prevents wrong printed event text and stale dependent state          | Main selection, change, and explicit-clear paths passed; keyboard-clear behavior is a known non-blocking issue |
| PT-3  | Ticket selection applies ticket name and price defaults; bundles remain blocked                          | Prevents wrong printed ticket details and package misuse             | Standard ticket defaults passed; bundle fixture blocked                               |
| PT-4  | Required, integer, min/max, text-length, and conditional shipping rules reject invalid input and recover | Prevents invalid support work and unsafe downstream orders           | Partially passed; numeric coercion and shipping-label issues recorded                 |
| PT-5  | Pickup hides shipping fields without mutating saved data                                                 | Prevents pickup orders being blocked or shipped accidentally         | Passed for UI state; submit branch not executed                                       |
| PT-6  | Preview validates, completes async generation, opens a PDF, and creates no order                         | Prevents preview from creating support work                          | PDF generation passed; no-order persistence proof blocked; stale-event preview failed |
| PT-7  | Shipping submit creates an address then one correct order; pickup skips the address                      | Protects fulfillment correctness and duplicate creation              | Blocked pending disposable fixture and downstream read                                |
| PT-8  | Backend rejects unsupported events/ticket types and errors remain readable                               | Prevents invalid complimentary ticket fulfillment                    | Assigned-seating disable passed; remaining backend variants blocked                   |
| PT-9  | Permission gate blocks unauthorized users                                                                | Prevents unauthorized support work and complimentary ticket creation | Blocked pending restricted account                                                    |
| PT-10 | Layout and primary actions remain usable at a smaller supported viewport                                 | Prevents migrated dashboard usability regressions                    | Blocked: requested viewport override retained an effective 832 px client width        |

## Declared Entry Paths and Outcomes

| Category | Values |
| --- | --- |
| Entry paths | Direct migrated route; legacy handoff is separate companion work and not available in this run |
| Initial conditions | No event selected; shipping selected; venue/user defaults prefilled |
| Outcomes | Clean preview success; client validation rejection and recovery; unsupported-fixture rejection; real submit success; processing success/failure |
| Viewports | Current desktop viewport; one smaller responsive viewport |

## Product-Surface Inventory

- Back navigation and migrated page route.
- Search-event combobox: open, search, results, disabled assigned seating item, selection, clear/change, keyboard behavior, pagination if exposed.
- Ticket-type selector: disabled before event, enabled after event, bundle-disabled option, selection, change.
- Printed text inputs and counters: title 40, first line 65, second line 95, third line 20, price 10.
- Numeric fields: quantity required/integer/min 1/max 1000; starting offset optional/integer/min 1.
- Pickup checkbox and conditional shipping panel.
- Shipping fields: addressee, street, city, province, country, postal; postal max 10 and character format.
- Get Preview and Submit Order footer actions, loading/disabled/error/success states.
- Preview task and PDF new tab.
- Address creation, order creation, support alert, background purchase/PDF/failure paths.

## Executed Case Summary

| Case | Status | Browser Evidence |
| --- | --- | --- |
| TC-1 Shipped order | Blocked | Shipping UI and validation exercised; real submission would create an address, order, support work, and downstream fulfillment without cleanup proof. |
| TC-2 Pickup order | Partially passed | Pickup hid the complete shipping panel and restoring shipping returned it; real submission was not executed. |
| TC-3 Preview | Partially passed | Clean preview generated a readable one-page thermal PDF with the selected event, ticket type, price, venue, numbering, and QR code. Keyboard-clearing Event then generated another PDF for the stale previous event while Event appeared blank; the user classified this as non-blocking. No-order persistence evidence was unavailable. |
| TC-4 Validation | Partially passed | Missing selections, quantity `0`, quantity `1001`, blank shipping addressee, invalid postal format, and starting offset `0` were blocked. All printed-text and postal maximums truncated at their documented limits. Decimal and negative numeric values were silently coerced; see FIND-2. |
| TC-5 Unsupported events | Partially passed | Assigned-seating results were disabled with account-manager guidance. Searches for a password-protected fixture returned no results; other backend-only variants were not safely represented. |
| TC-6 Unsupported ticket types | Blocked | No bundle-disabled ticket type was exposed by the inspected `1859`, package-named, or Flex Pack fixtures. Searches for named sold-out and closed fixtures returned no results. |
| TC-7 Processing success | Blocked | Requires order creation, task execution, complimentary basket/ticket evidence, and support PDF/email evidence. |
| TC-8 Processing failure | Blocked | Requires a disposable order and controlled inventory/state mutation. |
| TC-9 Permissions | Blocked | Only the authorized browser session was available. |

## Coverage Ledger

| Item | Type | Risk | Coverage | Evidence | Gap / Decision |
| --- | --- | --- | --- | --- | --- |
| Migrated direct route | Route/permission | Access failure | Browser-verified only | Page loaded while authenticated; Back navigated to `/manage/events/` | Exact permission set not inspected |
| Complete form regions and actions | Surface inventory | Missing parity control | Browser-verified only | Header, copy, 15 form controls, two actions, counters, conditional card, and footer inventoried | Loading/success state after real submit remains blocked |
| Event search open/search | Combobox | Wrong event | Browser-verified only | Search opened, filtered, displayed loading/empty states, and preserved selection on Escape | None for exercised states |
| Event search keyboard select | Combobox | Accessibility | Browser-verified only | Enter selected the active `1859 - Landing` option | Native ticket-select keyboard behavior not proven by this browser surface |
| Event pagination | Combobox | Missing future event | Browser-verified only | Load More increased the combined option count by 10 | Request parameters not inspected live |
| Event clear button | Combobox | Stale event | Browser-verified only | Explicit clear disabled ticket type and cleared dependent text | None |
| Event text keyboard clear | Combobox | Wrong order | Browser-verified only | Visible Event became blank while ticket type and dependent values remained; preview generated the old event PDF | Known non-blocking issue; FIND-1 |
| Assigned-seating event disable | Eligibility | Invalid event | Browser-verified only | Multiple `1859 (Seats)` results were disabled with account-manager guidance | Backend submit rejection not executed |
| Password-protected/custom-question/inventory event variants | Eligibility | Invalid event | Blocked | Password search returned no fixture | Needs controlled named fixtures |
| Ticket type dependency and selection | Select | Wrong/stale ticket | Browser-verified only | Disabled before event; General Admission populated second line and `$10.00`; event change cleared stale ticket state | Native select keyboard popup not supported by this browser control |
| Bundle disable | Eligibility | Package misuse | Blocked | Inspected standard, package-named, and Flex Pack events but found no disabled bundle option or package guidance | Needs event with `is_bundle=true` ticket type |
| Sold-out/voucher/custom-question/closed/inventory ticket variants | Eligibility | Invalid ticket | Blocked | Named sold-out and closed fixture searches returned no event result | Needs controlled ticket-type fixtures |
| Printed text limits and counters | Inputs | Incorrect ticket layout | Browser-verified only | 41/66/96/21/11 characters truncated to 40/65/95/20/10 and counters showed exact maximums | Persistence only exists in generated preview for representative defaults |
| Quantity required/min/max | Numeric validation | Bad order count | Browser-verified only | Blank/text showed required; `0` showed minimum; `1001` showed max | Real order boundary not submitted |
| Quantity integer/negative handling | Numeric validation | Unintended order count | Browser-verified only | `1.5` and `-1` became `1`; text became blank | FIND-2 |
| Starting offset min/integer handling | Numeric validation | Bad numbering | Browser-verified only | `0` showed minimum; `1.5` and `-1` became `1`; text became blank | FIND-2; no documented maximum |
| Pickup/shipping toggle | Conditional state | Wrong fulfillment | Browser-verified only | Pickup hid the shipping card; restoring shipping returned it | Address/order payload blocked |
| Shipping required validation | Conditional validation | Invalid address/order | Browser-verified only | Blank addressee blocked preview and recovered on the next valid validation pass | Labels incorrectly say Optional; FIND-3 |
| Postal validation | Conditional validation | Invalid address | Browser-verified only | 11 characters truncated to 10; `@` produced the documented format error | Address persistence blocked |
| Clean preview and PDF | Async action | Bad printed ticket | Browser-verified only | One-page `thermal_preview.pdf` opened and visibly contained selected event, ticket type, price, venue, numbering, and QR code | No-order record/support proof unavailable |
| Preview stale-event state | Async action | Wrong printed ticket/order | Browser-verified only | Blank visible Event still generated old `1859 - Landing` PDF | Known non-blocking issue; FIND-1 |
| Shipping submit and persistence | Mutation | Wrong address/order | Blocked | No disposable order fixture or cleanup proof | Do not submit shared/pre-existing data |
| Pickup submit and persistence | Mutation | Wrong fulfillment | Blocked | No disposable order fixture or cleanup proof | Do not submit shared/pre-existing data |
| Support alert and processing success/failure | Downstream async | Silent/partial fulfillment | Blocked | Browser cannot safely create/manipulate processing fixture | Needs backend/task/email evidence |
| Restricted permission | Permission | Unauthorized order | Blocked | Only authorized session available | Needs restricted employee fixture |
| Responsive layout | Viewport | Unusable migrated form | Blocked | Viewport override requested 390×844, but page client width remained 832 px | Needs a browser/device that applies the smaller CSS viewport |
| Browser console errors | Reliability | Hidden page failure | Browser-verified only | No warning or error logs before or after interactions | Network request errors were not separately observable |

## Findings

### FIND-1 — Keyboard-clearing Event leaves stale event and ticket state

| Field | Value |
| --- | --- |
| Severity | Major |
| Affected case / proof target | TC-3; PT-2 and PT-6 |
| Confidence | Confirmed for preview; Client-side risk not submitted for real order creation |
| Data safety | No saved order data change; generated one temporary preview PDF |
| State space | Shipping; standard GA event; General Admission; direct migrated route; keyboard clear; preview outcome |
| Release classification | User-classified non-blocking |

Starting state: `1859 - Landing` and `General Admission` selected with quantity `1`.

1. Open the Event combobox.
2. Select all visible Event text and press Backspace.
3. Let the result list load, then press Escape.
4. Observe that Event appears blank.
5. Click Get Preview.

Expected: Clearing Event clears the selected event, disables Ticket Type, clears event/ticket-derived text, and blocks preview with required-field validation.

Actual: Event appeared blank, but Ticket Type stayed enabled with General Admission selected; First Line, Second Line, and Price stayed populated. No required error appeared. Preview completed and the PDF printed `1859 - Landing`, General Admission, and `$10.00`.

Impact: The visible form can disagree with the order payload. Preview no longer protects the organizer from ordering or printing the previous event, and a real submit could create support work, charges, and tickets for the wrong event.

Cleanup/reset: Reloaded the page and confirmed the neutral form returned. Submit Order was not clicked.

### FIND-2 — Invalid decimal and negative numeric input is silently changed to a positive integer

| Field | Value |
| --- | --- |
| Severity | Major |
| Affected case / proof target | TC-4; PT-4 |
| Confidence | Confirmed |
| Data safety | No data change |
| State space | Quantity and starting offset; unsaved client validation |
| Release classification | Non-blocking by itself; product/UX triage recommended |

Expected: Decimal and negative values trigger the configured whole-number or minimum validation messages.

Actual:

- Ticket Quantity `1.5` became `1`; `-1` became `1`.
- Starting Offset `1.5` became `1`; `-1` became `1`.
- The configured whole-number/minimum messages did not appear because the input was already transformed.

Impact: A user can unknowingly preview or submit a different ticket quantity or numbering offset than typed.

Cleanup/reset: Fields were restored without submission and the page was reloaded.

### FIND-3 — Shipping fields are marked Optional while shipping validation requires them

| Field | Value |
| --- | --- |
| Severity | Minor |
| Affected case / proof target | TC-1 and TC-4; PT-4 |
| Confidence | Confirmed |
| Data safety | No data change |
| State space | Shipping; initial form and required validation |
| Release classification | Non-blocking usability issue |

Expected: Required shipping fields are visibly identified as required while pickup is not selected.

Actual: Send To, Street Address, City, Province, Country, and Postal Code all display `(Optional)`, but clearing Send To blocks preview with `This field is required`.

Impact: Organizers can reasonably omit fields the UI calls optional and only discover the requirement after attempting an action.

Cleanup/reset: The original addressee was restored; no submission occurred.

## Data Safety and Cleanup

- Four preview requests created four temporary `thermal_preview.pdf` outputs while testing clean preview and numeric/stale-state paths.
- No Submit Order action was performed.
- No address, hardcopy order, support alert, ticket basket, printed-ticket batch, permission, inventory, or user/venue record was created or changed.
- All input changes were unsaved. The main page was reloaded and returned to its neutral state with no selected event or ticket type.
- Two older unclaimed preview tabs and two inspected preview tabs were closed during browser cleanup; the hardcopy form was retained for handoff.

## Release Recommendation

**Decision blocked by named missing evidence.**

The user classified FIND-1 as non-blocking and defined release-blocking form failures as unusable footer actions or incorrect event/ticket options. The exercised form paths did not show either blocker: Get Preview worked, event search returned the expected venue events, assigned-seating events were disabled, and standard ticket types and defaults were correct.

The remaining release-decision blocker is evidence, not a confirmed defect: Submit Order was intentionally not clicked, so shipped and pickup order creation, address branching, success reset, support alerting, downstream ticket processing, and cleanup were not proven. TC-6 through TC-9 and the true smaller viewport also remain fixture-blocked.

Accounted-for scope:

- Browser-verified: route/back navigation; full form inventory; event open/search/select/change/explicit clear/Escape/Load More; assigned-seating disable; standard ticket selection/defaults; printed-text limits; primary numeric and shipping validation; pickup UI; clean and stale-event preview PDFs; console-error pass.
- Blocked: real shipping/pickup submissions and lifecycle; bundle/sold-out/closed/voucher/custom-question/inventory fixtures; restricted permission; downstream success/failure; no-order persistence read; effective smaller viewport.
- Not applicable: legacy iframe handoff in this frontend-only route run.
