---
title: Choose the Venue, Client, and Scenario
date: 2026-10-03
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Choose the Venue, Client, and Scenario

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]]

Start here before creating or buying an Event, Product, Package, or Membership. The Organizer's saved configuration is part of the test.

## Know whose workflow you are testing

| Showpass term | How to use it in this handbook |
| --- | --- |
| Organizer | The business operating a Showpass Venue/Organization, or its authorized representative configuring its offerings. This is not one universal permission role. |
| Venue / Organization | The business context that owns Events, sellable items, Customers, employment, payment settings, and payouts. The UI uses Organization; backend code uses Venue. |
| Venue Employee | A User employed by the selected Venue with specific effective permissions. An Employee can sell on behalf of a Customer without becoming the Customer. |
| Customer | The purchaser or recipient being served. Record whether the relationship is an account, the Venue's Customer record, or a group-sale account. |
| Attendee | The person using admission. The Attendee may be different from the Customer who purchased the ticket. |
| Member | The holder of a Membership, with its own status and benefits. Creating a Member does not prove its promised tickets were issued. |
| Event Location | Where an Event takes place. It is not automatically the owning Venue or the Assigned Seating geometry. |

## 1. Select the correct Venue

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in to Dashboard as the Organizer or assigned Venue Employee. | Actual account | Available Organizations reflect that account's employment. |
| Open the Organization selector and select the intended Organization. | Actual Organization name | The selected name is shown. If only one is available, record that displayed Organization. |
| Open Manage Events and inspect an authorized known Event. | Event owned by the intended Venue | Correct Event owner; an affiliate seller is not mistaken for the owner. |
| Record the Venue, role, and actions permitted for this run. | Run notes | Another tester can repeat the setup without guessing the business or authority. |

## 2. Check configuration before creating the item

Read first; change only owned test settings required by the scenario. For Admin-managed gateway/flag/rate-card values, obtain the saved value through the approved setup owner. Do not infer them from a visible checkbox or silently grant broader permissions.

| Configuration | What you need to know | Connected behavior to check |
| --- | --- | --- |
| Environment / build | Actual environment, deployed web build or mobile/Electron version; approved payment test mode | Local source is not proof of deployed behavior or safe payment setup. |
| Client | Organizer Dashboard for setup; Customer Public Web/Widget/mobile or Employee Web Box Office/Electron/POS/Kiosk for sale | Setup and sales clients can differ; supported payment and recovery controls differ. |
| Currency | Saved Venue currency and rounding rules | Prices, gateway support, fees, refund, and reporting use the correct currency. |
| Timezone | Venue timezone, Event Location/Event timezone where shown, Customer device timezone | Sale cutoff, recurring date, credit expiry, and report filters use the correct time context. |
| Gateway / account | Actual processor, System/Custom account, test account/mode; API mode when relevant | Card, wallet, 3DS, terminal, installment, and historical refund are distinct paths. |
| Payment method | A method actually supported by this client/setup | Free/Comp does not prove paid charging, card fees, or cash refund. |
| Fees / taxes / rate card | Effective Venue/Event/item rules; internal and Organizer fees; absorbed/Customer-paid; taxable bases | Correct Customer total AND saved Organizer/Showpass allocation. |
| Flags / modules | Exact relevant flag names, saved values, scope, and applicable item-level enablement | New pricing, waitlist, refunds, and fulfillment cannot be assumed enabled from branch name or page presence. |
| Identity / permissions | Organizer ownership; least permitted Employee; guest/signed-in Customer; recipient/Attendee | Correct access, owner, Customer data, and admission identity. |
| Delivery / Check In | Delivery choice, barcode delay, Check In preset, printer/scanner/native hardware | The purchased item is obtainable and usable for admission or pickup. |
| Adjustment policy | Refund types, fees retained/returned, cutoff, checked-in restrictions, Void and Exchange rules | Separate actions produce the intended money, validity, stock, and reporting result. |
| Integrations | Enabled services and approved test inbox/endpoint | Actual downstream receipt/processing, not only a request sent. |
| Existing data | Opening stock, prices, Customer balance, active ownership, original settings | Detect unintended change and safely restore only your changes. |

### For an existing Organizer: reproduce production behavior in TEA first

TEA is the team's test environment. A newly created generic Event is a control, not proof that the Organizer's real on-sale configuration works. Begin with an approved read-only production comparison; perform preparation only in the authorized TEA Organization. This handbook does not grant production access or permission to copy records.

1. Select the production Organization and start at **Organization Info**. Record the business details that affect this run, currency, timezone, and visible configuration. Compare the same pages in TEA; do not rely on matching names.
2. Have an authorized Admin/setup owner compare the owning **Venue** and linked configuration in Django Admin. Review saved gateway type/account ownership, payment mode, fees/rate card, flags, shipping, and enabled integrations. Some values are not shown in Organization Info. Do not save a production record to inspect it.
3. Reproduce the supported behavior in TEA with approved sandbox gateways, controlled inboxes, and test integration/analytics destinations. Copy relevant settings and relationships—not live credentials, payment tokens, real Customer information, or production transaction history.
4. Save and reopen each TEA page/record. Check effective values after defaults, inheritance, and normalization. A successful save is not proof that the desired value took effect.
5. Complete one small clean paid test purchase. Establish that TEA can charge the approved test account, issue the expected items, and reach its enabled downstream destinations before starting the launch matrix.

Keep this comparison in the run's existing note. For each row, record **production value/source and read date; saved TEA value; difference and business effect; approved substitution; owner; verification evidence**. Use Matched, Approved substitution, Mismatch, or Unknown for setup comparison; these are not test-pass statuses. An unknown gateway or fee rule must not be silently marked equivalent.

| Setting family | Exact comparison to make | What a missed difference could change |
| --- | --- | --- |
| Organization identity | Owner versus seller Organization, business/contact information needed for receipts, currency, timezone, branding | Wrong seller/recipient, receipt identity, money or sale boundary |
| Payment | Linked gateway type; System/Custom account; `use_stripe_payment_intents` where applicable; supported methods and capture behavior | Different charging, redirects, refunds or provider ownership; a SetupIntent only saves a method |
| Financial configuration | Effective calculation mode, rate card, internal/Organizer fees, absorbed versus Customer-paid, tax bases, rounding | Correct-looking Customer total but missing internal revenue or wrong adjustment |
| Shipping and fulfillment | `allow_shipping` (Admin label: Fulfillment features enabled), allowed countries, blocked regions, quantity limit, messages, rates and item overrides | Address accepted incorrectly, wrong shipping charge, or no operational fulfillment path |
| Checkout and questions | Current client rollout; `enable_nextjs_order_form` and `enable_post_purchase_question_collection` where applicable; purchaser/per-Attendee scope | Questions move after payment, disappear for Package children, or cannot be completed |
| Notifications and recovery | Purchase email/SMS switches and recipient rules; abandoned-cart settings; delayed barcode and delivery rules | Paid Customer cannot retrieve order, receives premature barcode, or gets an incorrect abandoned-cart message |
| External consumers | Approved test endpoints/accounts for enabled admission systems, supplier bookings, CRM, webhooks, browser/server analytics | Local sale works while real fulfillment/reporting contract remains untested |

Some settings are inherited or changed during save. Venue gateway changes can also affect other enabled modules; prepare them through the supported setup owner. Never change a production gateway, weaken shipping restrictions, or disable an integration just to obtain a green result.

### Reproduce the Event and catalog relationships, not only the Event name

Start at **Manage Events → Edit** for the reference Event. Compare its saved settings with the TEA Event and the related Package, Product, Membership, or credit configuration. Record the production-to-TEA relationship mapping; identifiers will differ.

- Event owner, Event Location, dates/timezones, recurring children if used, status and sale windows.
- Every in-scope Ticket Type: price, Inventory, purchase limits, access/password rules, fee/tax overrides, release triggers and enabled seller/client restrictions.
- Package parent and included children: Event dates, quantities, Product variants/SKUs, variant stock, single/separate barcode mode, redemption rules and attendee-information collection.
- Delivery options: Electronic Ticket, Standard Shipping or Will Call/Pick Up as actually offered; shipping charge method, billing-versus-shipping addresses, countries/regions, quantity limits and barcode timing.
- Required/optional custom questions: exact scope, collection stage, conditional visibility, choices and applicable Package children. Include messaging, receipt and ticket overrides.
- Applicable discount/credit/referral rules, protection offer, Membership benefits, Payment Plan and external admission/booking dependencies.

Use a written expected basket for each selected Customer journey: what they buy, what it costs, which people receive which items, what remains to fulfill, and what the Organizer should see afterward. Unknown Calgary configuration is not established by a working Cleveland Event or its automation data.

## 3. Pick the setup that matches the scenario

| Scenario | Prepare | Follow the path through |
| --- | --- | --- |
| Ordinary paid Event | Future single Event; paid Ticket Type; open sale window; known fees and Inventory | Purchase → transaction → issued/delivered ticket → admission → separate refund/Void/Exchange orders |
| Assigned Seating | Assigned Seating Map, eligible seats, linked Event/Ticket Type | Seat selection → one owner → correct ticket → admission → permitted release/reassignment |
| Recurring Event | Parent plus two generated dated children | Calendar/date selection → child-specific price/time → dated ticket → child adjustment and parent reporting |
| Ticket + Product Package | Included tickets/variants, quantities, fee rules, barcode/delivery mode | Package selection → allocation → all items → admission/pickup → descendant adjustment |
| Membership | Group, Level, season, explicit benefit type and eligible Events | Purchase → Member → generated tickets or other promised benefits → redemption → renewal/exit |
| Ticket Credit | Issuing item, eligible redemption item, quantity and per-item/per-user limit | Purchase/issue → Customer credit → eligible redemption → limit/usage → adjustment |
| Employee sale | Chosen Customer, Venue, client, and payment permissions | Box Office/POS sale → Customer ownership → payment → printing/delivery → safe recovery |
| Rejected path | One exact denied role, closed sale, exhausted balance, or invalid selection | Clear rejection → no unwanted charge, issued item, Inventory change, or partial save |

## 4. Prepare Customers and independent orders

Use a Customer email/inbox you control. Use a second controlled Customer for ownership, transfer, and concurrent-purchase checks. Use different Customer and Attendee details when testing attendee information.

Create independent orders for clean success/admission, Refund, Void, Exchange, and failure/recovery. Do not refund an order and then call it a clean Void or Exchange test. Do not reuse a checked-in ticket as an ordinary refundable ticket.

Calculate the expected price, fee/tax allocation, credit spend, payment, promised items, Inventory, and adjustment result before submission. [[00 Start Here/Showpass QA Handbook/03 Evidence and Expected Results|Expected-results worksheets]] explain how to keep these expectations independent from the system under test.

Use [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes#Discover how Customers actually buy|Customer-behavior discovery]] to choose realistic combinations, then declare applicable outcomes from [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|checkout and post-purchase coverage]]. The visible receipt is not the end of the setup's promise.

## 5. Senior-QA preflight

- Is the Organizer configuring the owner Venue or only a seller Venue?
- Is the item visible but not currently sellable because of status, sale window, permissions, or Inventory?
- Is a newly saved configuration actually inherited by this item and this existing basket?
- Is the Customer's money/payment method owned by the expected account? Existing gateway-owned payments may not follow a later Venue gateway change.
- Have you prepared a normal allowed Employee AND a denied Employee for affected permission boundaries?
- Have you named physical equipment/builds when the path involves a native SDK, reader, printer, or scanner?
- Do you know what finishes synchronously and what may finish later? Record the actual deadline, then inspect the promised result.

## Data safety and finish

Creating, buying, checking in, refunding, voiding, exchanging, and saving settings changes data. Use approved isolated records and test-mode payment, not live public sales. Preserve original settings and financial references. Stop further test sales using the supported safe action; sold Events may be protected from deletion. Never hide an unresolved payment by deleting its records.

## Source anchors

[Showpass terminology](</Users/christianvaldez/Documents/Showpass/repos/web-app/UBIQUITOUS_LANGUAGE.md>), [Venue configuration](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/venue.py>), [employee permissions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py>), and [Organization selector](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/components/navigation/DashboardOrganizationSelectButton.web.tsx>).

Examples, not a universal permission bundle: Manage Events (`VP_MANAGE_EVENTS`), Manage Memberships (`VP_MANAGE_MEMBERSHIPS`), Use Box Office (`VP_USE_BOX_OFFICE`) plus its payment capability, Manage Transactions (`VP_MANAGE_FINANCIALS`), Scan Tickets (`VP_SCAN_TICKETS`). Paid Void and refund-type permissions are separate; extra authorization may apply. Bind exact permissions and flags when making a standalone case.
