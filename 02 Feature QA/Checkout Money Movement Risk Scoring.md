# Checkout Money Movement Risk Scoring

Use this rubric to rank checkout findings during open-ended exploration.

Related prompt: [[06 Prompts/Checkout Money Movement Exploration Goal]]

Related incident calibration: [[02 Feature QA/Checkout Criticality From Jira Major Critical Export]]

## Criticality Definition

Critical means a business invariant can break, not just that a Jira card was labeled Critical.

A checkout automation candidate is critical when it can prove or prevent one of these recurring Major/Critical incident patterns:

- Money moves but order, invoice, confirmation, receipt, provider state, or Dashboard state disagrees.
- Failed, canceled, pending, or retried payment creates paid fulfillment.
- Successful payment leaves no usable order, ticket, confirmation, or receipt.
- Inventory, hold, assigned seat, membership, package, waitlist, transfer, or resale ownership becomes wrong.
- Refund, exchange, credit, gift card, fee, tax, discount, or payout math is wrong.
- A live or near-live sales path is blocked for checkout, Box Office, transfer, or assigned seating.
- Reporting, attribution, transaction detail, or payout views materially disagree with actual sales.
- Async provider, webhook, scheduled job, or background task mutates final state incorrectly.

Do not treat a card as automation-critical only because support needed a script, import, data move, config change, printer/device workaround, or demo setup. Promote those only when they expose recurring product behavior that can break money, fulfillment, inventory, ownership, reporting, or access.

## Score

Score each finding out of 100.

| Category | Points | Ask |
| --- | ---: | --- |
| Business impact | 25 | Could this block sales, revenue recognition, fulfillment, reporting, or organizer trust? |
| Money movement risk | 25 | Could this create wrong totals, duplicate charges, missed charges, incorrect payment state, or incorrect payout data? |
| Likelihood / regression risk | 15 | Is this path common, recently changed, complex, historically brittle, or dependent on async/payment-provider behavior? |
| Current coverage gap | 15 | Is there no clear Qase, Playwright, fixture, or manual coverage proving the behavior? |
| Fixture / test leverage | 10 | Would one fixture or test unlock broad critical-path coverage? |
| Customer / support impact | 10 | Would failure create buyer confusion, organizer support burden, refunds, chargebacks, or trust issues? |

## Production Usage Adjustment

The score is not complete until production usage is considered.

When two candidates have similar money-movement risk, prefer the path that moves more real checkout volume. Payment-provider share matters: Stripe-dominant paths should outrank lower-volume provider paths unless the lower-volume path has stronger incident evidence, a clearer uncovered P0 failure, or substantially better automation leverage.

Use this adjustment during re-ranking:

| Signal | Adjustment |
| --- | ---: |
| Dominant production payment path or checkout surface | +5 to +10 |
| Moderate production usage | +2 to +5 |
| Low or specialized production usage | 0 |
| Unknown production usage | mark `Needs volume confirmation` instead of treating the score as final |

If production volume is unknown, label the ranking as **automation-readiness ranking**, not final business-priority ranking.

## Incident Pattern Adjustment

Use exported Major/Critical Jira cards as calibration, but classify the business logic first.

| Signal | Adjustment |
| --- | ---: |
| Matches a recurring Major/Critical business invariant from [[02 Feature QA/Checkout Criticality From Jira Major Critical Export]] | +5 to +10 |
| Matches a real incident and has weak/no Playwright final-state proof | +5 |
| One-off support script or data correction that fixed recurring product logic | +2 to +5 |
| One-off support script, data move, import, config update, hardware/printer issue, or demo setup with no reusable product invariant | -5 to -15 |
| Existing backend, Playwright, Qase/manual, and Dashboard/API coverage already prove the invariant | -5 to -10 |

If the incident signal is only "this was marked Critical" and the business invariant is unclear, mark `Needs incident classification` instead of promoting the candidate.

## Priority Bands

| Priority | Score | Meaning |
| --- | ---: | --- |
| P0 | 80-100 | Critical business invariant gap around money, order, fulfillment, inventory, ownership, reporting, or async final state. |
| P1 | 60-79 | High-risk checkout path that should be covered soon. |
| P2 | 40-59 | Useful regression or edge coverage. |
| P3 | 0-39 | Low-risk, duplicate, or deferred coverage. |

## P0 Overrides

Treat the finding as P0 unless existing coverage clearly proves the behavior.

| Risk | How To Prove It | Dashboard / UI Check | API / Backend Check |
| --- | --- | --- | --- |
| Duplicate charge, order, or ticket issue after double-submit, refresh, retry, or redirect | Complete one checkout attempt using a risky action, then confirm only one successful paid result exists. | Dashboard transaction list shows one transaction for the buyer/order; order detail shows one payment; customer only has one order; issued ticket count matches purchased quantity. | Payment/order records have one successful payment for the checkout/order ID; idempotency or duplicate-submit handling prevents a second paid transaction. |
| Successful payment does not create a valid order | Complete payment and confirm the paid order exists everywhere buyers, organizers, and support expect it. | Dashboard order/transaction appears; order detail is paid; buyer confirmation page and receipt show the same order. | Payment status is successful and linked to a valid order, transaction, and issued tickets. |
| Failed or unpaid payment creates a paid order | Force or simulate payment failure, then confirm no paid order or issued tickets exist. | Dashboard should not show a paid transaction/order; if a failed attempt appears, it must be clearly failed or unpaid; tickets are not usable. | Order/payment state remains failed, pending, abandoned, or unpaid; no valid paid tickets are issued. |
| Order total differs from amount charged | Compare checkout total before payment with dashboard transaction/order detail after payment. | Transaction detail amount, fees, taxes, discounts, credits, and total match checkout and receipt. | Order, payment, line item, fee, tax, and discount records reconcile to the charged amount. |
| Discount, fee, tax, credit, gift card, or promo value applies incorrectly | Use a basket with known pricing inputs and verify final payment math. | Dashboard order/transaction detail shows the expected subtotal, discount, credit/gift card, fees, taxes, and final paid amount. | Backend calculation records match expected totals and no value is over-applied. |
| Inventory, hold, or seat ownership changes incorrectly after payment failure or retry | Attempt failed payment or retry flow, then inspect availability and ownership. | Dashboard event inventory or seat map reflects only successful purchases; failed attempts do not permanently consume inventory or seats. | Ticket, seat, inventory, and hold records are released or assigned according to payment state. |
| Confirmation, receipt, order detail, transaction detail, or payout values disagree | Complete checkout and compare all buyer/admin views. | Confirmation page, email/receipt, order detail, transaction detail, and payout/payment breakdown show consistent totals and status. | Reporting and payment breakdown records reconcile to order and payment records. |
| Async payment callback or webhook changes payment status incorrectly | Exercise redirect, webhook, or pending-payment path and inspect final state. | Dashboard eventually shows one final correct status, not duplicate, stuck, or reversed state. | Payment callback/webhook processing is idempotent and updates only the intended order/payment. |
| Buyer identity mismatch attaches paid order to wrong account | Checkout as guest, logged-in buyer, or claim/connect buyer, then verify ownership. | Dashboard customer profile and order detail show the correct buyer; wrong account cannot see or claim the order. | Order customer/user fields match the buyer identity used for checkout. |

## Dashboard-First Evidence

When possible, prove money-movement outcomes through Dashboard because that is how QA and support usually verify real incidents.

For duplicate-charge style risks, check:

- Transactions list: only one successful transaction for the checkout attempt.
- Transaction detail: amount matches checkout total.
- Order detail: one paid order, correct buyer, correct tickets.
- Customer profile: one order attached to the expected customer.
- Event inventory or seat map: quantity or seats consumed once.
- Receipt/confirmation: one confirmation with matching total.
- Payout/payment breakdown: no duplicate or mismatched payment rows.

## Automation Evidence

Dashboard checks are preferred for human verification, but automation may need API or database assertions for duplicate-charge coverage because UI screens may collapse or hide lower-level payment attempts.

## Finding Template

```markdown
### [P0/P1/P2/P3] Short Finding Title

**Score:** 0/100  
**Surface:** Public Checkout / Widget / Box Office / Hold Link / Transfer / Other  
**Money movement area:** Payment / Totals / Discounts / Credits / Inventory / Confirmation / Reporting  
**Confidence:** High / Medium / Low  

**Risk:**  
- 

**Evidence:**  
- 

**Inspected files:**  
- 

**Source behavior:**  
- Backend:
- Frontend:
- Playwright:
- Qase/manual:

**Coverage gap:**  
- 

**Missing fixture or setup:**  
- 

**Recommended next test:**  
- 

**Open question:**  
- 

**Verification needed:**  
- 
```
