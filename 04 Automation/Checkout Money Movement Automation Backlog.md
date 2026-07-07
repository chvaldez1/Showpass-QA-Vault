# Checkout Money Movement Automation Backlog

Automation backlog for checkout paths with high money movement, order integrity, or fixture leverage.

Related notes:
- [[06 Prompts/Checkout Money Movement Exploration Goal]]
- [[02 Feature QA/Checkout Critical Path Gap Analysis]]
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]

## Candidate Index

| Priority | Score | Candidate | Fixture Need | Status |
| --- | ---: | --- | --- | --- |
|  |  |  |  |  |

## Candidate Template

```markdown
### [P0/P1/P2/P3] Candidate Title

**Score:** 0/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#heading]]  
**Automation type:** API / E2E / integration / fixture-only  

## Why Automate

- 

## Source Behavior

- Backend:
- Frontend:
- Existing Playwright:
- Existing Qase/manual:

## Test Data

- 

## Fixtures Needed

- Existing:
- Missing:

## Flow

| Step | Data | Expected Result |
| --- | --- | --- |
|  |  |  |

## Assertions

- Payment state:
- Order state:
- Totals:
- Inventory / seats:
- Confirmation / receipt:
- Transaction / payout:

## Risks

- Flaky setup:
- External dependencies:
- Data cleanup:

## Qase Mapping

- Case ID:
- Suite:
- Tags:
```

## Seed Candidate Areas

- Card payment success creates one paid order with amount charged equal to checkout total.
- Card failure does not create a paid order and does not consume inventory or seats.
- Retry after failed payment creates one successful order and does not duplicate payment or ticket issuance.
- Refresh or double-submit during payment does not duplicate charge, order, ticket, or confirmation.
- Discounted checkout keeps subtotal, discount, fees, taxes, and final charge aligned.
- Credit or gift card checkout does not over-apply value and records the remaining payment correctly.
- Sold-out or capacity-change checkout blocks purchase before payment or recovers cleanly after payment failure.
- Confirmation, receipt, order detail, transaction detail, and payout show consistent payment and total values.
