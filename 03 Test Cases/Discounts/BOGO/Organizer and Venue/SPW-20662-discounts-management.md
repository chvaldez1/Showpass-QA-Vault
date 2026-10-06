---
title: "SPW-20662 \u2014 Organizer V1 Discounts management phase"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# SPW-20662 — Organizer V1 Discounts management phase

[[03 Test Cases/Discounts/BOGO/00 Start Here|Start Here]] · [[03 Test Cases/Discounts/BOGO/01 Acceptance Criteria|Acceptance map]]

## Sources Reviewed

- [Jira SPW-20662](https://showpass.atlassian.net/browse/SPW-20662) — Redesign Discounts management and add BOGO configuration; status Code Review; description, comments, parent, subtasks and links read. Priority: Medium.
- Product Planning: revised technical plan, Product Requirements, Solution Design, Discounts & BOGO and client handoff read through the Coda connector. Document conflicts/phases are retained in the acceptance map.
- [discounts.py](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/api/venue_based/viewsets/discounts.py>)
- [HeaderActions.web.tsx](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/discounts/ui/header/HeaderActions.web.tsx>); [AutoDiscountForm.web.tsx](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/discounts/ui/components/form/AutoDiscountForm.web.tsx>); [index.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/discounts/data/types/index.ts>) — re-read after fresh pull.

## Testing Intent

We are testing whether the relevant actor can complete this card’s V1 workflow while quantities, permissions and saved money remain correct; this matters because an incorrect offer can overcharge, over-discount or leave inconsistent tickets, and we will prove it through saved configuration, basket, order and lifecycle evidence appropriate to this slice.

| Field | Scope |
| --- | --- |
| Criticality / invariant | Money, inventory, financial math and permission safety; selected quantities and saved values stay correct |
| Actor impact / failure | Customers, Organizers and Operations; incorrect rewards, charges, ownership or access |
| Observable proof / surfaces | Named actor workflow and owning-layer checks below; fresh saved configuration/order/adjustment read |
| Source of truth / scope | Backend first; frontend for visible paths; exact card requirements mapped separately |
| Out of scope / confidence | No live execution, diffs or external writes; High source confidence, draft manual/revision confidence limited by named gaps |

## Source-backed Behavior

Jira requests redesigned Manage, guided setup, persistence and legacy protection. Comments say non-BOGO wizard work completed in another revision while BOGO remains a backend-dependent follow-up. Local HeaderActions/AutoDiscountForm still show legacy menu/long form. Public checkout changes are explicitly outside this card.

## Recommended Test Data and Setup

Use the actor guide’s preparation procedure, then repeat each selected case’s own Preconditions. Default calculator data: one published event, standalone $20 tickets, controlled customer, unused promotion and independent fee/tax settings. For permissions use a minimum allowed Employee and a denied Employee in the same selected Venue; foreign Venue data is an API-only scoped negative. Record original settings and preserve completed transactions.

## Cases and Verification

TC-L01 current legacy regression; BOGO wizard charter in Organizer guide; later architecture/lint/type/tests/build/React Doctor and visual/accessibility receipts required.

## Risk Areas

Source presence is not deployed proof. Partial saved graphs, stale baskets, per-discount rounding, financial representation, restricted access and overlapping promotions must be checked at their owning layer. A temporary reservation is not completed usage; a success toast is not payment/fulfillment evidence.

## Minimum Execution Set

Run the card’s focused owning-layer checks above, then the relevant clean purchase and saved-state smoke. Backend V1 smoke is TC-C01 → TC-C02 → TC-B01 → TC-O01; additional cases follow risk, not a full Cartesian product. For planning/UI-unavailable cards, the minimum is a concrete review/revision receipt, not invented clicks.

## Suggested Automated Coverage

Use the owning-layer checks in Cases and Verification above. Calculation/validation/cache/race/provider work belongs in backend tests; saved browser journeys belong in Playwright. Configuration, independent assertions and safe restoration are mandatory.

Existing patterns: [PublicCheckoutDiscounts.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/pages/public/checkout/PublicCheckoutDiscounts.ts>) (web/Widget summary and code handling), [dashboard-discounts.ts](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/fixtures/helpers/dashboard-discounts.ts>) and checkout-journey composition. Extend independent expected amounts, purchase references, saved allocation, ticket count, inventory and cleanup. The repository search found no named BOGO-specific automation; no absence claim is made about all generic coverage. Backend evaluator/oracle, model, cache, race, provider, financial and usage tests are references only, not passing execution evidence.

## Assumptions and Unknowns

A newer frontend and organizer API revision must be supplied before BOGO Dashboard manual cases can be Qase-ready. All cases and planned checks are unexecuted. User clarified V1 phased delivery; document differences are noted as phase/revision distinctions without claiming deployed defects.

## Open Questions

Which exact candidate revision/deployment is intended for this card’s execution? Which phase accepts any source/document difference relevant to this card? Record the answer with the execution receipt; no answer is required to finish these local drafts.
