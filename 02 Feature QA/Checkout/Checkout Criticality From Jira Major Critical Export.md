# Checkout Criticality From Jira Major/Critical Export

Source: `assets/csv/major-critical.csv`  
Generated from exported SPD Major/Critical Jira cards.

## Export Snapshot

- Cards reviewed: 1,352
- Priorities: 413 Critical, 939 Major
- Types: mostly Bugs, with some Tasks
- Strong recurring terms: transaction, membership, assigned seating, box office, payment, refund, discount, invoice, fee, credit, hold, exchange, transfer, payout

## What Critical Actually Means

A card is business-logic critical when a Showpass invariant breaks:

| Critical Signal | Why It Matters | Example Cards |
| --- | --- | --- |
| Money moves but product state disagrees | Buyers can be charged without clean order/confirmation state, or payment can fail while fulfillment still happens. | `SPD-2385`, `SPD-2396`, `SPD-2411` |
| Refund, exchange, credit, or payout math is wrong | Revenue, organizer payouts, and customer balances can become incorrect. | `SPD-2381`, `SPD-2386`, `SPD-2406` |
| Inventory, holds, or seats do not match reality | Organizers cannot sell available inventory, or sold/voided seats can be wrong. | `SPD-2388`, `SPD-2427`, `SPD-2435` |
| Buyer cannot access valid tickets/orders | A successful purchase still fails as a customer outcome. | `SPD-2418`, `SPD-2426`, `SPD-2436` |
| Sales are blocked on a live or near-live path | Checkout, Box Office, transfer, or assigned seating cannot complete for real customers. | `SPD-2399`, `SPD-2404`, `SPD-2427` |
| Reporting/attribution/payout views disagree with orders | Organizers lose trust because Dashboard does not match sales or money. | `SPD-2420`, `SPD-2386`, `SPD-2381` |
| Async provider state creates stuck or duplicate outcomes | Stripe, Square, gateway-switch, scheduled jobs, or transfer tasks can finish in the wrong state. | `SPD-2404`, `SPD-2413`, `SPD-2433` |

## Not Automatically Critical

These can be urgent for support, but should not automatically promote a Playwright candidate unless they expose a reusable product invariant:

| Noise / Lower-Signal Pattern | How To Treat It |
| --- | --- |
| One-off script, import, data move, or bulk update | Use as incident context only. Promote only if the script corrected broken product behavior that can recur. |
| Configuration/content request | Do not treat as automation priority unless wrong config changes checkout, money, fulfillment, or reporting behavior. |
| Hardware/printer/device issue | Usually manual/provider strategy first. Promote only when product state or fulfillment is wrong, not just the device failed. |
| Demo/environment setup | Keep out of checkout critical path unless it exposes a production invariant. |
| Support workaround with no source-backed recurrence | Record as context, but do not create a broad test from it. |

## Criteria For P0 Automation

Promote a candidate toward P0 when it proves one of these with source-backed evidence:

- Charged amount, invoice/order total, Dashboard total, receipt, and provider state can diverge.
- Failed, canceled, pending, or retried payment can create paid fulfillment.
- Successful payment can leave no usable order, tickets, confirmation, or receipt.
- Inventory, hold, assigned seat, package, membership, waitlist, or transfer ownership can be wrong after payment, void, refund, exchange, or retry.
- Refund, exchange, credit, gift card, or payout logic can create incorrect organizer/customer balance.
- A common live sales path can block checkout or Box Office completion.
- Dashboard/reporting/attribution can show materially wrong sales, revenue, or payout data.
- Async provider or background job state can mutate payment/order/fulfillment incorrectly.

## Search Optimization

Do not force a multi-day loop when the ranking has stabilized.

Use this order:

1. Local CSV pass: filter `major-critical.csv` by money, checkout, payment, order, ticket, refund, fee, tax, discount, credit, inventory, seat, payout, invoice, transaction, exchange, transfer, hold, membership, package, resale, waitlist, Stripe, Square, Authorize, Box Office.
2. Bucket cards by business invariant, not by Jira priority label.
3. Compare buckets to current automation candidates and existing coverage.
4. Inspect source only for buckets that could change the top P0/P1 ranking.
5. Stop the calibration pass when two consecutive buckets produce no new P0/P1 ranking change, no new fixture need, and no new assertion contract.

## Current Implication

The current checkout automation priorities are directionally aligned: duplicate paid outcomes, failed-payment fulfillment, total reconciliation, mixed fulfillment lines, assigned-seat ownership, unavailable-item pruning, and package/reporting reconciliation all map to recurring Major/Critical patterns.

The main refinement is ranking discipline:

- Do not promote support-script cards unless they reveal recurring product logic.
- Do promote checkout candidates when they match real incident patterns around money, fulfillment, inventory, ownership, reporting, or async final state.
- Prefer focused representative tests over long-running broad exploration once the top risks are stable.
