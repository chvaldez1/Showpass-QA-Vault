---
title: Showpass QA Master Handbook
date: 2026-10-03
tags:
  - qa/system-handbook
aliases:
  - Showpass 10x QA Playbook
  - Showpass QA Handbook
status: Source-informed system walkthroughs; not executed coverage
---

# Showpass QA Master Handbook

A hands-on handbook for **how to test Showpass as a connected system**. Start as the Organizer: choose the Venue, compare relevant production configuration with approved TEA equivalents, and save/reopen the offering. Study how Customers actually buy, then design realistic journeys with the right item combinations, people, delivery choices and launch phase. Follow every applicable outcome—not only payment—through information collection, delivery/fulfillment, admission, analytics, external consumers, separate Refund/Void/Exchange branches and financial reconciliation.

Do not stop because the screen your developer changed works. An Event that saves but cannot be purchased, a Package missing an internal fee, or a Membership missing its promised tickets is not a successful integrated result.

> [!important] Scope and safety
> [[00 Start Here/World-Class Software Quality Standard]] remains the authority for evidence, scope, coverage, data safety, classification, and release decisions. These are reusable source-informed walkthroughs, not executed results or ready-to-copy Qase cases. Bind each selected path to the actual build, supported clients, permissions, flags, and configuration. Use owned isolated records and approved test payments.

## Start with a real workflow

1. [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Choose the Venue and verify configuration]]. For an existing Organizer, compare Organization Info, hidden Admin settings and Event/catalog relationships; document safe sandbox substitutions instead of assuming a generic TEA Event is equivalent.
2. [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes#Discover how Customers actually buy|Study actual Customer behavior and design scenario charters]]. Use approved aggregate evidence and business-impact risks to choose realistic combinations. Mark unsupported choices explicitly.
3. Open the relevant walkthrough below. Establish a clean successful control, then follow the selected branches on independent orders. Preserve earlier orders when rehearsing VIP → general on-sale.
4. [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|Account for all applicable checkout and post-purchase outcomes]]. Declare what must happen after payment, who receives/uses it, how long it may take, and what evidence proves it. Analytics is one outcome, not a replacement for the others.
5. Add the relevant [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes|senior-QA integration passes]] for existing data, failures, concurrency and affected clients. Record exact expected versus actual results in the run's canonical note; use existing automation patterns and account for manual, backend, device, deferred, blocked and not-applicable scope.

The core actors are **Organizer, Customer, Attendee, Member, and Venue Employee**. Organizer is not a universal permission role; Customer is not necessarily the Attendee; a selling Employee must not accidentally become the order's Customer. Definitions and setup live in the linked setup chapter.

## I want to create and test an offering

| What you want to do | Walkthrough | Follow it through to |
| --- | --- | --- |
| Create an Event | [[00 Start Here/Showpass QA Handbook/Playbooks/11 Event Sales Calendars and Availability\|Create an Event and test its full lifecycle]] | Draft/Publish → Customer purchase → delivered ticket → Attendee admission → separate adjustments → reconciliation |
| Configure Assigned Seating | [[00 Start Here/Showpass QA Handbook/Playbooks/04 Assigned Seats and Inventory\|Configure seats and prove ownership]] | Exact seat purchase → one owner → admission → permitted release/Exchange → actual repurchase |
| Create a Product | [[00 Start Here/Showpass QA Handbook/Playbooks/10 Products Variants and Stock\|Create a Product and test stock/pickup]] | Variant selection → purchase → exact variant stock → pickup → adjustment |
| Create a Package | [[00 Start Here/Showpass QA Handbook/Playbooks/03 Packages and Parent-Child Items\|Create a Package and test every included item]] | Selection → price/fee allocation → parent and children → admission/pickup → descendant adjustment |
| Create a Membership | [[00 Start Here/Showpass QA Handbook/Playbooks/05 Memberships and Ticket Benefits\|Create a Membership and test Member benefits]] | Group/Level → purchase → Member → every promised benefit → renewal/exit |
| Configure a Discount or Ticket Credit | [[00 Start Here/Showpass QA Handbook/Playbooks/06 Discounts and Ticket Credits\|Configure and actually redeem]] | Save/reopen → Customer eligibility → redemption → usage/limits → adjustment |
| Offer a Gift Card or money credit | [[00 Start Here/Showpass QA Handbook/Playbooks/07 Money Credits and Gift Cards\|Issue, spend, and adjust Customer credit]] | Correct recipient → redemption → remaining balance → saved money → adjustment |
| Offer a Payment Plan | [[00 Start Here/Showpass QA Handbook/Playbooks/09 Payment Plans and Saved Methods\|Test plans and saved methods]] | Deposit/schedule → enrollment → installments → failure/cancellation → admission |

## I want to test a connected operation

| Operation | Walkthrough | Critical handoff to prove |
| --- | --- | --- |
| Complete payment or recover an uncertain sale | [[00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders\|Customer purchase and final order]] | Actual payment → one saved order → all usable items; determine original outcome before retry |
| Change fees or taxes | [[00 Start Here/Showpass QA Handbook/Playbooks/02 Fees Taxes and Absorbed Costs\|Financial configuration and complete financial path]] | Saved effective settings → Customer total AND internal/absorbed allocation → adjustments/earnings |
| Refund, Void, or Exchange | [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges\|Separate post-purchase workflows]] | Correct selected items → final money/credit → validity → Inventory → reporting |
| Sell on an Organizer's website | [[00 Start Here/Showpass QA Handbook/Playbooks/13 Widgets and Client Handoffs\|Embedded Widget through post-purchase]] | Host/calendar/login → retained selection → payment → usable order |
| Operate POS, Kiosk, or hardware | [[00 Start Here/Showpass QA Handbook/Playbooks/14 Mobile POS Kiosk and Hardware\|Employee sale and physical-device proof]] | Saved settings → payment → printing/delivery → Check In → safe recovery |
| Deliver, Check In, Transfer, or Resell | [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale\|Customer and Attendee lifecycle]] | Actual recipient → valid admission → correct ownership and old-ticket validity |
| Check Employee roles or account ownership | [[00 Start Here/Showpass QA Handbook/Playbooks/12 Permissions Ownership and Authentication\|Permissions and authentication]] | Minimum allowed role works; denied role/other Venue cannot mutate or access protected data |
| Explain sales and money | [[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts\|Transactions, files, earnings, and payouts]] | Exact known orders/adjustments → correct filters → actual file → reconciled accounting |
| Reserve demand or book guests | [[00 Start Here/Showpass QA Handbook/Playbooks/17 Holds Waitlists and Guestlists\|Holds, Waitlist fulfillment, and Guestlists]] | Actual supported reservation type → purchase/release or approval → final usable result |
| Import or generate in bulk | [[00 Start Here/Showpass QA Handbook/Playbooks/18 Bulk Work Jobs and Repairs\|Per-row bulk results and recovery]] | Preview → accepted job → every intended recipient/item → safe resume |
| Configure questions, emails, or integrations | [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations\|Forms, messages, and external handoffs]] | Saved configuration → Customer input/action → Employee use → actual delivered/processed result |

## What senior-QA depth means here

Not more clicks for their own sake. Establish a clean full-path control, compute expectations independently, and test the interactions most likely to lose money, admission, ownership, or Customer data. Follow unchanged consumers of shared backend behavior. Use focused backend tests for large rule matrices/concurrency, existing Playwright journeys for real browser handoffs, and physical proof for native hardware.

The [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes|integration passes]] provide concrete Showpass examples and expected results, including how to choose combinations without pretending a sample covers everything.

## Supporting references

Use these when designing or evaluating a run; they support the product walkthroughs rather than replacing them.

- [[00 Start Here/Showpass QA Handbook/01 Foundations and Business Risk|Showpass terms and separate Critical/Major/Medium impact]]
- [[00 Start Here/Showpass QA Handbook/02 Early Risk Review and Test Design|Trace the exact change and its consumers]]
- [[00 Start Here/Showpass QA Handbook/03 Evidence and Expected Results|Independent expected amounts, recipients, Inventory, and completion]]
- [[00 Start Here/Showpass QA Handbook/04 Manual and Exploratory Testing|Form coverage, exploration, accessibility, and execution rules]]
- [[00 Start Here/Showpass QA Handbook/05 Failure and Recovery|Controlled failures and safe reconciliation]]
- [[00 Start Here/Showpass QA Handbook/06 Automation Strategy|Existing Playwright patterns and right-layer coverage]]
- [[00 Start Here/Showpass QA Handbook/07 Release Confidence|Coverage ledger and release decision]]
- [[00 Start Here/Showpass QA Handbook/08 Escaped Bugs and Lessons|Dev-support lessons, including fees and hardware]]
- [[00 Start Here/Showpass QA Handbook/09 Critical Business E2E Integration|Use with the team's Critical Business E2E regression document]]
- [[00 Start Here/Showpass QA Handbook/10 Quality Measures|Measure prevention and evidence quality]]
- [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Repository anchors, incident evidence, and limits]]
- [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|The purchase completion checklist: overlooked outcomes and concrete proof]]

These files form one canonical handbook. Keep detailed cases and execution evidence in the existing feature/run note; do not create parallel handbook drafts for the same scope.
