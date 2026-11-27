# Backend - web-app

Repo path:
`/Users/christianvaldez/Documents/Showpass/repos/web-app`

Backend code is the first source of truth for expected system behavior.

## What QA Should Inspect

- Models and database relationships
- API endpoints, request payloads, and responses
- Permissions and role checks
- Validation rules and required fields
- Business rules and edge cases
- State changes, side effects, and background jobs
- Error handling and failure responses

## QA Notes

- Start here before writing test cases.
- Reference exact files or symbols when useful.
- Capture behavior in plain language, not copied code.

## Source to test library

Start at the backend rule and trace the record that the next Showpass role or service will consume. Use the [[01 Repositories/Frontend - showpass-frontend#Product feature coverage inventory|frontend feature inventory]] for the user entry point and [[03 Test Cases/Test Cases by Feature#New case drafts|new case drafts]] for composed outcomes. The source checkout used for the new cases is `b8dcfa8726db`.

| Backend areas | What to trace | Vault examples |
| --- | --- | --- |
| `apps/tickets`, `apps/inventory`, `apps/widgets`, `apps/queues` | Event and Ticket Type relationships, basket contents, independent issuance, holds, availability, waitlist allocation and handoffs from widgets or queues. | [[03 Test Cases/Packages/Packages QA Library\|Packages]] · [[03 Test Cases/Basket/Basket QA Library\|Basket]] · [[03 Test Cases/Waitlists/Waitlists QA Library\|Waitlists]] · [[03 Test Cases/Widget/Widget QA Library\|Widget]] |
| `apps/financials`, `apps/reports`, `apps/integrations` | Which original invoice and selected items drive the debit, credit, refund or report, how prices are allocated, and what the approved external consumer actually received. | [[03 Test Cases/Fees/Fees QA Library\|Fees]] · [[03 Test Cases/Financials/Financials QA Library\|Financials]] · [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario\|Exchanges]] |
| `apps/venues`, `apps/users`, `apps/memberships` | Venue scope, authorized role, employee PIN lifecycle, account and recipient ownership, granted benefits and rewards. | [[03 Test Cases/Venues/Venues QA Library\|Venues]] · [[03 Test Cases/Access PIN/Access PIN QA Library\|Access PIN]] · [[03 Test Cases/Customer Accounts/Customer Accounts QA Library\|Customer Accounts]] · [[03 Test Cases/Rewards/Rewards QA Library\|Rewards]] |
| `apps/reservations`, `apps/clickers`, `apps/streaming` | Booking and approval records, actual admission state and capacity counters, and ticket-scoped stream access. | [[03 Test Cases/Reservations/Reservations QA Library\|Reservations]] · [[03 Test Cases/Check-In/Check-In QA Library\|Check-in]] · [[03 Test Cases/Streaming/Streaming QA Library\|Streaming]] |
| `apps/websites`, `apps/ai` | Website, appearance and offering relationships, selected media from the Venue, and settings saved through the approved editor path. | [[03 Test Cases/Websites/Websites QA Library\|Websites]] · [[03 Test Cases/AI Chat/AI Chat QA Library\|AI Chat]] · [[03 Test Cases/Media Library/Media Library QA Library\|Media Library]] · [[03 Test Cases/Talent/Talent QA Library\|Talent]] |
| `apps/emails`, `apps/notifications`, `apps/campaigns`, `apps/campaignmonitor`, `apps/phones`, `apps/devices`, `apps/translations` | Message trigger, locale, recipient, template, delivery channel and exact order or Event. Cross-check approved delivery separately from job acceptance. | [[03 Test Cases/Events/05 Settings/02 Email customization\|Email customization]] · [[03 Test Cases/Orders/customer-email-language-test-cases\|Order email language]] |
| `apps/analytics`, `apps/activities`, `apps/data_harvest` | The event or saved record consumed by tracking and reporting. Look for a stable order, Event or customer reference and distinguish a missing consumer from a UI-only observation. | [[03 Test Cases/Analytics/analytics-qase-test-cases\|Analytics]] · [[03 Test Cases/Advertising/Advertising QA Library\|Advertising]] |
| `apps/fraud`, `apps/incidents`, `apps/showsense`, `apps/surveys` | Risk assessment, incident statements, predictions and survey export are separate surfaces from checkout. Check exact role, entry and scope before adopting or creating cases. | Risk settings are represented by [SPT-1830](https://app.qase.io/case/SPT-1830). Exact incident, prediction and survey case coverage needs further review. |
| `apps/api`, `apps/core`, `apps/main` | Shared contracts and legacy entry points. Find the actual caller and affected product path before assigning a case. | [[03 Test Cases/Test Cases by Feature#Dashboard UI Organization\|Dashboard paths]] · [[01 Repositories/Frontend - showpass-frontend#Product feature coverage inventory\|Frontend inventory]] |
