---
title: Foundations and Business Risk
date: 2026-10-02
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Foundations and Business Risk

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## What Showpass terms mean

| Term | Plain-language meaning for testing |
| --- | --- |
| Organizer | The business operating the Venue/Organization or its authorized representative. Identify the actual owner Venue and Employee authority; this is not a universal all-access role. |
| Customer | The purchaser or recipient served by Showpass. An account, Venue Customer record, and group-sale account are distinct contexts; name the one used in the test. |
| Attendee | The person using admission, who may differ from the Customer who paid. Check the identity on attendee information, delivery, and Check In. |
| Venue Employee | A signed-in User employed by the selected Venue with specific effective permissions. Selling to a Customer must not make the Employee the Customer. |
| Member | The holder of a Membership with its own status and benefits. A Member record does not prove every promised ticket or benefit exists. |
| Venue / organization | The business whose events, customers, settings, and money you are working with. Records must stay inside the authorized business. |
| Event Location / Assigned Seating Map | Where the Event takes place versus the layout used to allocate seats. Neither is automatically the owning Venue. |
| Event / ticket type | An event is the occurrence being sold; a ticket type is a particular admission option with its own price and rules. |
| Basket | The customer's selected items before the sale finishes. Items can reserve capacity before money is collected. |
| Invoice / transaction | The saved financial record of a sale or adjustment. A payment-provider record alone is not a complete Showpass order. |
| Ticket item | An issued ticket or other purchased item. A basket selection is not yet an issued ticket. |
| General admission / assigned seat | Admission without an individual seat versus ownership of a specific seat. Both have inventory rules. |
| Hold | Inventory reserved under a supported hold workflow. Do not assume it follows the same expiry rules as an ordinary shopping basket. |
| Package parent / child | The bundle and the items included in it. The bundle's price, barcode, and included-item rules vary by configuration. |
| Membership / benefit | A customer's membership and the tickets, products, or privileges that membership promises. A paid membership is not proof that its benefits were issued. |
| Ticket Credit | A configured entitlement used to obtain eligible tickets. It is not automatically the same as a money balance or a discount. |
| User / exchange credit | A money credit ledger, sometimes restricted to particular uses. A refund to credit is not a cash refund. |
| Absorbed fee | A fee borne according to the configured business rules rather than added to the customer charge. It still needs correct accounting. |
| Itemized pricing | Per-item financial calculation and allocation. Enablement depends on actual venue and item settings; do not infer it from a screen label. |
| Settlement / payout | Accounting for money due to a business and the payment of that money. A paid customer order does not prove a correct organizer payout. |
| Revenue realization | Allocating earnings to the appropriate items or events. It can differ from the original sale's allocation. |
| Widget / POS / kiosk / Electron | Embedded purchasing on another website; employee point-of-sale mode; self-service sales device; desktop client. They are distinct entry points, not synonyms for web checkout. |

Use these terms consistently in manual procedures, preserving the actual visible labels on the selected client. The backend [ubiquitous language](</Users/christianvaldez/Documents/Showpass/repos/web-app/UBIQUITOUS_LANGUAGE.md>) identifies overloaded terms and record boundaries. [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue/client setup]] applies them to a real run.

## Protect the business, not just the interface

### The outcome chain

| Milestone | Evidence to collect | Failure we are preventing |
| --- | --- | --- |
| Correct selection and price | Exact items, quantities, eligibility, fee/tax calculation, currency | Wrong or unauthorized sale |
| Payment result known | Provider/payment-method reference and final status, where accessible | Duplicate charge, unpaid fulfillment, retry after an unknown charge |
| One saved order | Unique order/transaction reference associated with the payment | Charged customer with no usable order |
| Complete fulfillment | Expected tickets, products, membership, and benefits for the correct owner | Partial order, missing game tickets, wrong recipient |
| Correct inventory and ownership | Capacity/seat/product stock before and after; admission behavior | Overselling, stranded inventory, duplicate seat ownership |
| Correct handoff | Customer can obtain items; employee can print/check in where supported | Sale succeeds but customer cannot enter |
| Correct money and reports | Original sale plus adjustments agree with earnings, credits, exports, and settlement rules | Silent fee loss, incorrect payout, money counted twice |

These are separate proof targets. A confirmation screen, invoice, or “post-purchase complete” marker proves only its own milestone unless the test checks the remaining outcomes.

### Keep Critical, Major, and Medium distinct

| Severity | Business-impact question | Examples, subject to confirmed scope |
| --- | --- | --- |
| Critical | Can this lose or misallocate money, give unauthorized access, invalidate paid admission, expose protected data, oversell ownership, or stop a materially important sales operation? | Successful charge without order; lost internal fee; duplicate active seat; payment setting makes an operating POS unusable |
| Major | Is a substantial workflow broken, but the Critical business consequence is not established or is meaningfully contained? | Staff cannot complete a supported workflow; a usable workaround exists but requires substantial effort |
| Medium | Is the impact narrower, recoverable, or primarily presentation/efficiency without established material business harm? | Misleading display while saved financial records and admission remain correct |

Urgency is a separate field. An approaching deadline does not by itself make a defect Critical. Conversely, a quiet earnings leak can be Critical without a deadline. Severity and release-blocking status are separate decisions under the canonical standard.

For any Major or Medium touching money, access, inventory, or privacy, ask: **what evidence would promote this to Critical?** Record affected sales/venues/devices, amount lost, invalid tickets, incorrect owners, recurrence, and whether the workaround really prevents harm. “Could be Critical” is an impact investigation, not a confirmed diagnosis. Preserve the reported priority alongside the proposed severity.

### Evidence confidence

Separate requirements, source-backed behavior, historical incident reports, and executed results. Record disagreements rather than choosing the easiest expectation. A completed Jira card is not proof of production deployment, enabled configuration, current reproduction, or regression protection.
