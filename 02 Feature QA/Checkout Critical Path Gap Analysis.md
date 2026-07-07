# Checkout Critical Path Gap Analysis

Living workspace for checkout money-movement exploration.

Related notes:
- [[06 Prompts/Checkout Money Movement Exploration Goal]]
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]
- [[03 Test Cases/Checkout Money Movement Test Drafts]]

## Scope

Focus on the highest-risk checkout paths where money, order state, inventory, confirmation, or reporting can diverge.

Primary source paths:
- Backend: [[01 Repositories/Backend - web-app]] - `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend: [[01 Repositories/Frontend - showpass-frontend]] - `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright: [[01 Repositories/QA Automation - showpass-playwright]] - `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`
- Vault: `/Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault`

## Exploration Passes

| Pass | Lens | Status | Notes |
| --- | --- | --- | --- |
| 1 | Checkout entry paths and platforms that can reach money movement | Not started |  |
| 2 | Realistic scenario mixes: ticket type, fees, discounts, payment type, extra items, identity, and inventory state | Not started |  |
| 3 | Payment success, failure, retry, and duplicate submission | Not started |  |
| 4 | Order creation, payment status, and async provider callbacks | Not started |  |
| 5 | Totals: fees, taxes, discounts, promo codes, credits, and gift cards | Not started |  |
| 6 | Inventory, holds, capacity, and seat ownership tied to payment | Not started |  |
| 7 | Buyer identity: guest, logged-in, claim/connect, and account ownership | Not started |  |
| 8 | Confirmation, receipt, transaction detail, payout, and reporting consistency | Not started |  |
| 9 | Existing Playwright fixtures, factories, and missing reusable setup | Not started |  |

## Entry Path Inventory

Fill this after read-only inspection of backend routes, frontend routes, and existing Playwright coverage.

| Entry Path | Platform / Surface | How Buyer Reaches Checkout | Payment Types | Basket Types Supported | Source Reference | Existing Playwright Coverage | Risk Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public event checkout | Web public |  |  |  |  |  |  |
| Direct checkout URL / checkout link | Web public |  |  |  |  |  |  |
| Hold link checkout | Web public |  |  |  |  |  |  |
| Widget checkout | Widget |  |  |  |  |  |  |
| Assigned seating checkout | Web public / Widget / other |  |  |  |  |  |  |
| Package / membership / extra-item checkout | Web public / Widget / other |  |  |  |  |  |  |
| Mobile/responsive checkout | Web public / Widget |  |  |  |  |  |  |
| Guest checkout | Web public / Widget / other |  |  |  |  |  |  |
| Logged-in checkout | Web public / Widget / other |  |  |  |  |  |  |
| Account claim/connect checkout | Web public / Widget / other |  |  |  |  |  |  |
| Other discovered path |  |  |  |  |  |  |  |

## Realistic Scenario Mixes

Use this to avoid bloated permutation testing. Each scenario should combine real customer risk factors that are likely to expose money-movement bugs.

| Scenario Mix | Entry Path | Basket Composition | Pricing Complexity | Payment / Identity Path | Why It Matters | Priority |
| --- | --- | --- | --- | --- | --- | --- |
|  |  | Ticket with unusual fee setup plus discount | Fees, taxes, discount | Card payment / guest or logged-in |  |  |
|  |  | Ticket plus extra item or add-on | Extra item, fees, taxes | Card payment |  |  |
|  |  | Mixed ticket quantities or ticket types | Partial discount or promo | Card retry or failed payment then retry |  |  |
|  |  | Assigned seat or limited inventory ticket | Seat/inventory ownership | Payment failure or retry |  |  |
|  |  | Held item or direct checkout link | Hold pricing and inventory | Guest or logged-in checkout |  |  |

## Findings

Use the template from [[02 Feature QA/Checkout Money Movement Risk Scoring#Finding Template]].

### Findings Index

| Priority | Score | Finding | Status | Next Action |
| --- | ---: | --- | --- | --- |
|  |  |  |  |  |

## Existing Playwright Cases

Fill this during exploration after a read-only inspection of [[01 Repositories/QA Automation - showpass-playwright]].

| Spec File | Test / Scenario | Coverage Area | Money Movement Assertion | Fixture / Factory Used | Gap or Follow-up |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Secondary Manual / Qase Context

Fill this only when it helps avoid duplicate work after the read-only Playwright inventory and source behavior mapping are underway. Automation coverage is the primary focus.

| Case / Note | Coverage Area | Money Movement Assertion | Gap or Follow-up |
| --- | --- | --- | --- |
|  |  |  |  |

## Fixture Gaps To Automate Checkout

Fill this during exploration when existing Playwright fixtures or factories do not support a high-priority checkout money-movement test.

| Fixture Need | Unlocks | Priority | Notes |
| --- | --- | --- | --- |
| Paid public checkout order | Confirmation, receipt, order detail, transaction detail assertions |  |  |
| Failed card/payment attempt | Failed payment state, retry, no paid order, no inventory loss |  |  |
| Checkout with fees and taxes | Total calculation, receipt, payout, reporting assertions |  |  |
| Checkout with partial discount | Discount allocation, itemized totals, final payment amount |  |  |
| Checkout with credit or gift card | Split payment, remaining balance, over-apply prevention |  |  |
| Limited inventory or sold-out event | Capacity, hold release, retry behavior |  |  |
| Assigned seating event | Seat ownership after payment success, failure, retry, or abandonment |  |  |
| Guest buyer and logged-in buyer | Ownership, claim/connect, account mismatch prevention |  |  |

## Open Questions

- 

## Next Recommendations

- Start with P0 override paths from [[02 Feature QA/Checkout Money Movement Risk Scoring#P0 Overrides]].
- Prefer extending existing checkout/payment fixtures when they already cover setup reliably.
- Convert only source-backed findings into [[04 Automation/Checkout Money Movement Automation Backlog]] or [[03 Test Cases/Checkout Money Movement Test Drafts]].
