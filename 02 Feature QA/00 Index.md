---
title: Feature QA
tags:
  - qa/index
---

# Feature QA

Source reviews, coverage gaps, risk analysis, and automation planning. These notes describe what is known and what needs testing; a mapped workflow or proposed test is not an executed pass.

| Folder | What belongs here | Start here |
| --- | --- | --- |
| Checkout | Checkout risks, missing checks, and automation priorities | [[02 Feature QA/Checkout/Checkout Automation Mission Control\|Checkout Automation Mission Control]] |
| Purchase Coverage | The full purchase journey and its supporting data | [[02 Feature QA/Purchase Coverage/End-to-End Purchase Coverage Matrix\|End-to-End Purchase Coverage Matrix]] |
| Playwright Coverage | Existing automated coverage and gaps found from Major/Critical incidents | [[02 Feature QA/Playwright Coverage/Major Critical Playwright Gap Analysis\|Major Critical Playwright Gap Analysis]] |
| Support Incidents | Lessons and system gaps from customer and employee support issues | [[02 Feature QA/Support Incidents/SPD Dev Support System Gap Analysis - April to September 2026\|SPD Dev Support System Gap Analysis — April to September 2026]] |
| Refunds and Exchanges | Customer refund settings and exchange-access investigations | [[02 Feature QA/Refunds and Exchanges/SPW-21227-customer-refunds-block-exchanges\|SPW-21227 — customer refund setup hides exchanges]] |

## Checkout

- [[02 Feature QA/Checkout/Checkout Automation Mission Control|Current priorities and progress]]
- [[02 Feature QA/Checkout/Checkout Critical Path Gap Analysis|Checkout coverage gaps]]
- [[02 Feature QA/Checkout/Checkout Automation Decision Queue|Decisions that need review]]
- [[02 Feature QA/Checkout/Checkout Money Movement Risk Scoring|How checkout risks are ranked]]
- [[02 Feature QA/Checkout/Checkout Criticality From Jira Major Critical Export|Incident evidence used to judge risk]]
- [[02 Feature QA/Checkout/Checkout Automation Worker State.json|Supporting worker state]]

## Purchase Coverage

- [[02 Feature QA/Purchase Coverage/End-to-End Purchase Coverage Matrix|Purchase coverage matrix]]
- [[05 Tooling/Purchase Flow Explorer|Interactive Purchase Flow Explorer]]
- [[02 Feature QA/Purchase Coverage/End-to-End Purchase Coverage Matrix.json|Structured matrix data]]
- [[02 Feature QA/Purchase Coverage/End-to-End Purchase Coverage Matrix.browser-data.js|Browser-readable matrix data]]

## Playwright Coverage

- [[02 Feature QA/Playwright Coverage/Major Critical Playwright Gap Analysis|Major/Critical incident coverage gaps]]
- [[02 Feature QA/Playwright Coverage/Major Critical Playwright Gap Worker State.json|Supporting worker state]]

## Support Incidents

- [[02 Feature QA/Support Incidents/SPD Dev Support System Gap Analysis - April to September 2026|SPD support incident analysis — April to September 2026]]

## Refunds and Exchanges

- [[02 Feature QA/Refunds and Exchanges/SPW-20827-shipping-sale-and-refund-report-totals|Shipping sale and refund rows do not balance — October 29 CSV evidence and QA draft]]

## Adding a feature review

Use [[02 Feature QA/Feature Note Template]] for a new feature review. Save it in the matching topic folder, or create a clearly named topic folder when needed. Keep supporting data beside its report and update the existing note for the same scope.

Manual test cases belong in [[03 Test Cases/Test Cases by Feature|03 Test Cases]]. Sentry investigations belong in `08 Sentry Investigations/`.
