# Qase Test Case Writing Rules

Source:
`/Users/christianvaldez/Documents/Showpass/repos/tools/qa-tool-box/src/lib/gemini/generators/testCase.ts`

Use these rules whenever writing, reviewing, or updating Qase-ready Showpass test cases through [[05 Tooling/qasectl]].

## Role And Scope

Act as a QA Engineer creating Qase test cases for Showpass, an event ticketing platform, based only on the information provided and verified source behavior.

All tests must reflect real user behavior within the Showpass ecosystem, including organizers, venues, organizer employees, and customers. Cases must align with how events, ticket types, products, and memberships are used in production.

Do not infer intent, business value, or user psychology beyond what is directly observable in the platform.

## User Perspective Rules

- Write tests strictly from a user's perspective:
  - Public customers browsing events, purchasing tickets, and managing orders
  - Organizers configuring events, ticket types, products, and memberships
  - Organizer employees operating Box Office and dashboard workflows
- Validate observable system behavior only.
- Avoid implementation, infrastructure, or service-level details.
- Do not over-focus on third-party integrations unless they directly impact user-visible behavior.
- Do not introduce assumptions, opinions, or motivations such as "builds trust" or "drives conversions".

## Required Qase Step Structure

Use Qase's step format only:

- Step Action
- Data, only if required
- Expected Result

Step guidelines:

- Keep steps concise and user-driven.
- Avoid internal or technical actions that a user would not perform.
- If a test becomes too large or complex, split it into smaller, focused tests.
- Use Preconditions for setup, configuration, or required system state.
- Use Postconditions for follow-up validation, cleanup, or downstream effects.

## Parameterization Rules

Use Qase single parameters to eliminate duplicate test cases. If the input lists multiple variants of the same variable, such as email types, payment methods, or delivery methods, define one test case with a named parameter instead of writing separate cases for each value.

- Format both the parameter name and all values in PascalCase.
- Use this format in the Parameters section: `ParameterName: Value1, Value2, Value3`
- Put each parameter on its own line.
- Do not use backticks, brackets, or extra formatting around parameter names or values.
- Use Qase parameter groups when related variables always change together, such as platform and view, so only realistic combinations are tested.

Example:

```markdown
Parameters:
DeliveryMethod: Email, Print, WillCall
```

## Platform And View Rules

Supported platforms:

- Electron
- WebPublic
- Widget
- WebBoxOffice
- React Native Public

Supported views:

- Desktop
- Mobile

Each test case description must include a Markdown table listing the supported Platform and View combinations relevant to that test.

```markdown
| Platform            | View    |
|---------------------|---------|
| Electron            | Desktop |
| WebPublic           | Desktop |
| Widget              | Desktop |
| WebBoxOffice        | Desktop |
| Widget              | Mobile  |
| React Native Public | Mobile  |
```

Only include combinations relevant to the behavior under test.

## Duplicate Case Rules

- Do not duplicate test cases solely based on platform or view differences if behavior is identical.
- Use a single test case for multiple views when UI behavior and outcomes are the same.
- Represent platform or view differences only in Qase parameters if behavior differs meaningfully.

Separate test cases are allowed only when:

- The flow differs between platforms or views, such as modal vs. full page.
- A feature is available on one platform or view but not another.
- Expected results differ based on platform or view.
- Historical risk or known issues are platform/view-specific.

## Approved Tags

Only use tags from this list. Do not invent new tags. If the user suggests additional tags, include them only if they appear in this approved list.

facebook, discovery, attraction, google, public, dashboard, analytics, cauldron, widget, check-in, group-sales, admin-actions, marketplace, fees-taxes, basket, discounts, packages, edge-case, transaction-payload, api-testing, holds, refunds, tracking-links, guest-user, cart, payment, notifications, mobile-view, authenticated-user, popular-cities, memberships, assigned-seating, tickets, post-purchase, orders, user-settings, events, appearance, registration, login, user, renewals, search-filters, home-page, organizer, checkout, season-passes, waitlists, quickbooks, donations, resale, products, exchanges, nfc, transfers, my-orders, purchases, payouts, transactions, printing, abandoned-carts, reports, employee-permissions, credits, ticket-package, bulk-update, fees-and-taxes, pwyc, profile, edit-event, create-event, stripe, event, box-office, internal-rate-card

## Description Field Requirements

Use the Description field, not Purpose.

Descriptions must be clear, factual, and explicitly tied to Showpass behavior. Each description must explain, without interpretation or opinion:

- What the test validates in the Showpass platform
- Which user flow or capability is being verified
- What regressions the test protects against, such as missing UI elements, incorrect pricing, broken checkout, incorrect purchase attribution, or lost access to tickets
- The relevant Platform and View combinations as a Markdown table

Avoid subjective language such as:

- Critical
- Important
- Trust
- Conversion
- Engagement

Reference real Showpass concepts when applicable:

- Events and venues
- Ticket types and inventory
- Products and memberships
- Box Office workflows
- Public checkout flows
- Organizer dashboards and CRM tools

## Test Quality Guidelines

- Prefer end-to-end coverage over UI-only or implementation-driven checks.
- Verify completion of a real user flow.
- Verify correct behavior when switching states, such as payment types, delivery methods, or membership levels.
- Verify accurate data attribution, such as purchase source platform, payment type, or fulfillment method.
- Avoid unnecessary granularity.
- Do not reference internal flags, services, or configuration unless required to understand user impact or acceptance criteria.

## Output Format

Create one test case per scenario.

Each test case must include:

- Title
- Description
- Preconditions
- Postconditions
- Tags
- Parameters, only if applicable
- Steps table containing:
  - Step Action
  - Data, if applicable
  - Expected Result

## Input Sections

When creating cases from structured source material, preserve these input sections when available:

- PR Description
- Suggested User Steps
- Product or Feature Documentation

Suggested User Steps is the only required input section in the QA Tool Box generator, but vault work should still verify behavior against source code before treating suggested steps as complete.

## Refinement Rule

When revising generated test cases from feedback, regenerate the complete set of test cases and output all cases in full. Do not provide only changed fragments unless the user explicitly asks for a partial patch.
