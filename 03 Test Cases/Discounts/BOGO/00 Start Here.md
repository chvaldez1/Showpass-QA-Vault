---
title: "BOGO \u2014 Start Here"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# BOGO — Start Here

BOGO means **Buy X / Get Y**. The **Buy tickets** count toward the qualifying quantity. The **Get tickets** receive a percentage or fixed-dollar reduction. The customer must select every ticket, including the reward. Showpass does not insert tickets or increase quantities.

For Buy 2/Get 1 Free on $20 tickets, select three tickets: $60 before the promotion, $20 discount, $40 ticket amount afterward. Selecting only two tickets costs $40 with no BOGO discount. Buy 1/Get 1 requires two selected tickets. Fees and taxes are separate; “free” describes the ticket benefit and does not promise a fee-free order.

**This handbook is a local draft, not a test receipt or release approval. Every case is unexecuted.** It uses current local source, Jira reads, and the five supplied Product Planning documents. No Qase read/write, Jira change, browser test, payment, flag change, app-code change, branch comparison, or diff was performed.

## Source snapshot after the fresh pull

Backend HEAD: `96563466a9428cbe81e79ec886a73e230be24dcf`. Frontend HEAD: `c84fbb7ad2eda311be8dcf79fbf6d187444f33d4`. These identify the local checkouts inspected, not a frozen QA candidate or deployed build. Relevant files were re-read; no diff, branch comparison, changed-file discovery or application test was run.

## Delivery phases

The user clarified that BOGO is being delivered in smaller V1 phases. Backend V1 provides automatic ticket discounts and internal setup. Organizer V1 adds the Dashboard wizard and configuration API in separate cards. Buyer presentation is a separate frontend area. Broader planning requirements remain visible without treating every future capability as a blocker for Backend V1.

## Who does what

| Actor | Meaning | Start here |
| --- | --- | --- |
| Internal administrator | Authorized Showpass operator who prepares backend settings and promotion records | [[03 Test Cases/Discounts/BOGO/Admin and Support/00 Admin and Support - How to Test|Admin setup guide]] |
| Organizer / Venue employee | Organization employee with named permissions, not an unrestricted role | [[03 Test Cases/Discounts/BOGO/Organizer and Venue/00 Organizer and Venue - How to Test|Organizer guide]] |
| Customer | Person selecting and paying for tickets | [[03 Test Cases/Discounts/BOGO/Customer/00 Customer - How to Test|Customer guide]] |
| Box Office employee | Employee selling for the customer; employee must not become the purchaser accidentally | [[03 Test Cases/Discounts/BOGO/Box Office/00 Box Office - How to Test|Box Office guide]] |
| Attendee | Person who uses a purchased ticket; may differ from the customer | [[03 Test Cases/Discounts/BOGO/Operations and Post-Purchase/00 Operations and Post-Purchase - How to Test|Operations guide]] |

## Recommended order

1. Read [[03 Test Cases/Discounts/BOGO/01 Acceptance Criteria|Acceptance Criteria]] and [[03 Test Cases/Discounts/BOGO/02 Coverage and Readiness|coverage and readiness]]. The recorded requirements disagree in several places.
2. Have the authorized administrator prepare one owned event and an unused promotion using the Admin guide. Record currency, ticket names/prices, Buy/Get sets, quantity rule, benefit, allowed checkout locations, and usage limits. Do not modify a shared promotion to manufacture a test.
3. Run the customer quantity case and a clean successful purchase. Then check the saved transaction, delivered tickets, inventory, usage, and actual approved payment evidence.
4. Run basket edits, benefit values, limits and non-BOGO stacking on independent baskets. Use engineering-controlled tests for stale payment, concurrency and callbacks.
5. Run a separate Box Office cash sale if that checkout location is enabled. Other native/device clients need their own verified navigation and payment setup before execution.
6. Run independent Refund, Void, Exchange and Transfer orders; preserve the baseline sale. Reconcile reports and history.
7. Run Dashboard BOGO coverage only after the wizard and organizer API are present in the intended revision. Current local source lacks both contracts. Legacy discounts have a separate current-source regression case.

## What is implemented and what needs a decision

| Area | Current local checkout | Requested / recorded distinction |
| --- | --- | --- |
| Activation | Automatic only; manual BOGO identifiers are rejected | Older solution design includes customer codes; superseded for backend MVP |
| Ticket selection | Customer chooses all tickets | Automatic insertion is excluded throughout current delivery |
| Eligible inventory | Standalone, non-recurring root tickets, one event per promotion | Revised plan overview and PRD mention products/memberships; source excludes them |
| Buy/Get sets | Separate, identical, or overlapping sets; qualifiers pooled across configured types | PRD describes a narrower same-set/no-pooling scope; recorded as a V1 phase distinction |
| Reward selection | Lowest eligible unit price, stable ties, sufficient Buy capacity preserved | No organizer priority field; competing BOGOs ordered by effective discount cost, then Discount ID |
| Financial ownership | Existing automatic discount representation; exact unit pairing not introduced | A selected seat or ticket must not be called “the free ticket” without saved financial proof |
| Dashboard wizard / CRUD | Missing BOGO nested serializer and wizard in local source | Separate delivery: SPW-20662–20666 and SPW-20743; Jira comments refer to another revision |
| Public presentation | Generic discount totals exist; no bogo_discounts field found in inspected basket serializers | SPW-19932 requests richer read-only presentation; no invented badges or reward rows in these cases |

Source-backed expectations are not proof of deployment. A Jira status of BETA QA, Complete, or Code Review does not identify the running build.

## Small arithmetic reference

All rows use $20 tickets, no other discount, unlimited usage, and show **ticket amounts only**.

| Rule | Selected quantity | Rewarded tickets | Discount at 100% | Ticket amount afterward |
| --- | --- | --- | --- | --- |
| Buy 1/Get 1 | 1 / 2 / 3 / 4 | 0 / 1 / 1 / 2 | $0 / $20 / $20 / $40 | $20 / $20 / $40 / $40 |
| Buy 2/Get 1 | 2 / 3 / 4 / 5 / 6 | 0 / 1 / 1 / 1 / 2 | $0 / $20 / $20 / $20 / $40 | $40 / $40 / $60 / $80 / $80 |
| Buy 1/Get 3 | 1 / 2 / 3 / 4 / 5 | 0 / 1 / 2 / 3 / 3 | $0 / $20 / $40 / $60 / $60 | $20 / $20 / $20 / $20 / $40 |
| Buy 3/Get 2 | 3 / 4 / 5 / 10 | 0 / 1 / 2 / 4 | $0 / $20 / $40 / $80 | $60 / $60 / $60 / $120 |
| Buy 2/Get 1, 25% | 3 | 1 | $5 | $55 |
| Buy 2/Get 1, $7 reward | 3 | 1 | $7 | $53 |
| Buy 2/Get 1, $25 reward | 3 | 1 | $20 cap | $40 |

Incomplete Get blocks are allowed: Buy 1/Get 3 with two selected tickets grants one reward, not zero. Each started reward block still needs the full Buy quantity.

## Ready to prepare versus blocked

The ticket quantity, benefit, ordinary checkout, Box Office and saved-history drafts can be prepared once the intended build and owned data are available. Separate/overlapping ticket-set checks are source-supported supplementary V1 checks; the different PRD scope is noted in the acceptance map. Dashboard BOGO form cases cannot be honestly marked Qase-ready against this checkout; their field labels/defaults/save behavior are unavailable. Exact financial/device/fault cases have named setup gates in their actor guides.

Strongest Qase publication candidates once their explicit preparation is supplied: TC-C01, TC-C02, TC-C03, TC-C06, TC-C07, TC-B01, TC-O01 and TC-O02. Supplementary candidates: TC-C04, TC-C05, TC-C08, TC-C09, TC-C10, TC-C11, TC-O03, TC-O04 and TC-L01. These are local labels only; no Qase IDs or publication are implied.
