---
title: SHOWPASS-LIVE-FM9 - Holly Jolly Journey Exchange totals mismatch
date: 2026-10-29
tags:
  - qa/sentry
  - qa/exchanges
aliases:
  - Sentry 7817622355
status: Recorded Exchange failure confirmed; origin of difference inconclusive; manual reproduction blocked
---

# SHOWPASS-LIVE-FM9 — Holly Jolly Journey Exchange totals mismatch

## Overview

**An Exchange checkout fails because the adjustment for the original ticket does not balance.** Its earnings breakdown reverses **$79.44**, but its credit/total side reverses **$76.44**. Showpass stops the save because those amounts differ by **$3.00**. This is a financial calculation/assertion failure, not a recorded performance timeout.

The affected original item is **4-Pack Family Pass (2 adults + 2 children), Holly Jolly Journey 2026, December 18**. The latest replacement basket contains Child Ticket (ages 4–12), Adult Ticket (13 & older), and a 4-Pack Family Pass for **December 23**. These descriptions identify the affected offerings; Sentry does not establish the replacement quantities or current availability.

All **seven retained failures** involve **original invoice item 26523743**, across three checkout baskets and two Exchange Credit IDs. They are repeated attempts involving the same original item, not evidence of seven independent affected orders.

**Cause confidence:** High for the failing adjustment and exact $3 difference. Inconclusive for the original reason those values disagree. The event does not include the original item's numeric fee, credit and prior-refund fields. Calling the difference an Exchange fee, a discount, rounding, or a particular commit's regression would go beyond the evidence.

**Impact:** These purchase attempts stop before the Exchange completes normally. The latest request is a $0 checkout using Exchange Credit. The source's normal card-charge branch is skipped for its payment type. The final saved order, ticket validity, credit balance and any earlier payments have not been independently inspected; this investigation does not establish a duplicate charge or damaged saved totals.

[Sentry issue](https://showpass.sentry.io/issues/7817622355/) · [Latest recorded event](https://showpass.sentry.io/organizations/showpass/issues/7817622355/events/88773fd14f06422f95d79f958b2876a7/)

## Affected Venue, Customer and order

These are lookup details from the captured checkout, not a fresh read of the current Customer or order records. The Customer name and ticket descriptions agree in the earliest and latest event inspected for this follow-up.

| Detail | What we know |
| --- | --- |
| Venue ID | **Not captured in the Sentry fields inspected.** |
| Venue / Organization name | **Not captured.** Holly Jolly Journey 2026 is the Event name; it is not a verified Venue name. |
| Customer | **Meghan Gowan**, shown in the basket, resolved Customer and original/replacement invoice descriptions. |
| Customer email | **Unavailable in the redacted API output.** No email is supplied here. |
| Customer ID | **Not captured in the fields inspected.** |
| Original invoice ID / order reference | **Not captured.** The known item ID below is a line of the order, not its invoice ID or customer-facing order reference. |
| Original invoice description | `$0.00 Exchange Credit In Progress for Meghan Gowan`. This is the captured state/description during the Exchange; it does **not** establish that the original purchase was free. |
| Original order item | **26523743** — **4-Pack Family Pass (2 adults + 2 children)**, **Holly Jolly Journey 2026 — December 18**. |
| What they are purchasing | Replacement items for **Holly Jolly Journey 2026 — December 23**: **Child Ticket (ages 4–12)**, **Adult Ticket (13 & older)**, and **4-Pack Family Pass (2 adults + 2 children)**. Quantities and Ticket Type IDs were not captured in the descriptions. |
| Event IDs | **Not captured in the fields inspected.** |
| Latest replacement checkout | Basket **37643688**; captured invoice description `$0.00 Sale for Meghan Gowan`; Exchange Credit **281683**. |
| Earlier affected checkouts | Baskets **37630712** and **37631164**, using Exchange Credit **281540**; same original item. |

**Lookup supported by the evidence:** Search original invoice item **26523743** in Admin to identify its parent invoice and Venue. **Meghan Gowan** is an additional Customer-name search aid, not a unique Customer ID. See [[#TC-01 — Locate the affected original order without changing it]] for the read-only steps.

**User-reported lookup result:** Admin displayed **“invoice with ID ‘26523743’ doesn’t exist. Perhaps it was deleted?”** This warning concerns an **Invoice** lookup. The Sentry ID identifies an **Invoice item**, which is a separate record. The warning does not establish that the original order or its item was deleted. The correct Invoice-item lookup remains unverified.

**Follow-up access limit:** Matching-log discovery was attempted through the connected Datadog plugin, but its `search_datadog_sdk` tool failed with **Unknown tool**. No Datadog logs were read. Venue and invoice identifiers have not been inferred from unrelated records or another Sentry issue.

## Test index

- [[#TC-01 — Locate the affected original order without changing it]] — Not run; precise read-only lookup.
- [[#TC-02 — Reproduce the failed Exchange]] — Blocked; original financial setup is missing.
- [[#BUG-01 — Exchange checkout fails for the affected family pass]] — Copy-ready draft only.

## Setup and limits

The recorded environment is **production**, releases **36.36.11–36.36.12**. The latest browser is Safari 26.2 and the referring page is customer checkout. No browser or desktop app was opened by the agent for this investigation. No screenshot is available. The user-reported Invoice lookup warning is recorded above; the planned Invoice-item lookup and Exchange reproduction remain unverified.

The Customer is **Meghan Gowan**. The Organization name, original order reference and original actor's access are not available in the captured fields inspected. An employee impersonation is not needed to explain this failure. An unrelated order in your own account does not reproduce the original item's financial history. A confirmed Organization name is still needed before giving Organization-specific Dashboard steps.

## TC-01 — Locate the affected original order without changing it

**What this tests:** Whether an authorized support employee can identify the exact original order, rather than trying an unrelated family-pass purchase.

**Start here:** Showpass production **Admin**, using an account that already has permission to view invoice items. An invoice item is one line of an order. This check is **no data change**: search and read only. It is an optional record lookup, not a reproduction of the failure. Missing Admin access is a stopping condition; no permission or impersonation change is requested.

### Steps

1. **In Admin, return to the main index and open Financials → Invoice items. Choose Invoice items, not Invoices. Search for item 26523743.** If the search uses query syntax, enter `id = 26523743`; in ordinary text search, enter `26523743`. Submit the search once.

   **Expected:** One matching item with the family-pass description for Holly Jolly Journey 2026, December 18.

   **Actual — Not run:** Sentry identifies this item in every captured failed Exchange. Admin access and the live row have not been checked. If the item is absent, access is denied, or the description differs, stop and record that outcome.

2. **Open that matching item. Read the number in its Invoice field; that is the parent invoice ID.** Also record its Venue reference/name if shown. Leave without editing fields or selecting Save or an action from the list.

   **Expected:** The original order and owning business can be identified from the matching row. This gives support a precise order to inspect next.

   **Actual — Not run:** The parent order reference and Organization remain unknown. The original item ID is not a customer-facing order number. If the references are unavailable, stop rather than choosing another order.

**Finishing point:** Stop after identifying the order, or the first access/missing-record outcome. No Refund, Void, Exchange, resend, or purchase is needed. A successful lookup does not prove the Exchange works. If this check is performed later, record the outcome and local time; include only the Customer lookup details needed for this investigation and omit ticket barcodes.

**Report back:** `Invoice item found; Invoice = __; Venue = __`, `Invoice item 26523743 not found`, or `Invoice items access denied`, with the local time. An Invoices-page warning is not the result of this Invoice-items check.

## TC-02 — Reproduce the failed Exchange

**What this tests:** Completing the affected Exchange should produce balanced accounting and exactly one replacement order, with the expected old/new ticket validity and credit balance.

**Start here:** **Blocked.** No equivalent owned test order has been prepared, and the original item's financial history is missing. We do not yet have a reliable recipe for creating the required starting state. Buying any family pass and exchanging it to another date is not a demonstrated reproduction.

### Steps

1. **Stop before starting another Exchange or submitting a checkout for the live affected order.** First obtain the original financial values listed in [[#Evidence needed to identify the underlying cause]], through an authorized read-only record inspection. Engineering can then prepare an equivalent order in an approved test environment.

   **Expected:** The equivalent test order has the same relevant original fees, applied credit, prior adjustments and selected-ticket allocation. Its expected Exchange amount can be calculated before an execution is authorized.

   **Actual — Blocked:** Sentry supplies the failed output values but not these original inputs. No test order was created and no Exchange was submitted. Changes to test orders, temporary credits, stock and ticket validity would need an owned-data execution and cleanup plan; a $0 checkout can still change these records.

**Known failure point:** The recorded request was the final customer-checkout purchase after replacement items were selected. Source offers **Exchange items** or, under the returns rollout, **Return order** as possible entry points. Sentry cannot tell which earlier control was used. **Start exchange** can activate temporary credit before checkout; opening that flow is not a substitute for a read-only record lookup.

**Unverified visible result:** The customer's exact message or screen after the failed request is unknown. A generic checkout error would require matching server evidence to establish this same failure. Do not repeatedly submit the production basket to force it.

## Recorded evidence

API snapshot read on October 29, 2026. Issue remains unresolved, priority High, count 7. Its user count is 0; that reflects missing Sentry user attribution, not zero affected people.

| Evidence | Value |
| --- | --- |
| Issue | 7817622355 / SHOWPASS-LIVE-FM9 |
| First occurrence | 2026-10-29 01:18:30.259779 UTC / October 28, 19:18:30 MDT |
| Last occurrence | 2026-10-29 16:23:30 UTC / October 29, 10:23:30 MDT |
| Latest request | POST `/api/user/tickets/baskets/37643688/purchase/` |
| Latest request context | `payment_type=5` (`PAYMENT_TYPE_FREE`), `purchase_source_platform=psp_web`, `source_channel=non_discovery`; checkout referrer |
| Latest invoice description | `$0.00 Sale` |
| Original invoice state in captured description | `$0.00 Exchange Credit In Progress` |
| Original item | 26523743; family pass, December 18 |
| Adjustment | Ticket Exchange Adjustment for that original family pass |
| Calculation path | `ExchangeCreditsRefunder`, `refund_full_company_charges`; ordinary ticket handler, not a Membership seat swap |

All seven event details were compared for the original item, basket, applied Exchange Credit and release:

| Event ID | UTC, October 29 | Basket | Exchange Credit | Release |
| --- | --- | --- | --- | --- |
| `3d1fd29d35024b8c86232f7d55fcac4e` | 01:18:30 | 37630712 | 281540 | 36.36.11 |
| `6c266273a4274262b78a706494502e52` | 01:18:42 | 37630712 | 281540 | 36.36.11 |
| `8293b4c090ee4b89be4ab45a304cc97f` | 01:19:48 | 37630712 | 281540 | 36.36.11 |
| `cc94f4f038aa4861af160eb3ef47ac6e` | 01:33:38 | 37631164 | 281540 | 36.36.11 |
| `46b72eae51c34a78bdbfc20118ebfece` | 01:33:55 | 37631164 | 281540 | 36.36.11 |
| `192e9f3d08a3438fb766eaa0e1a5bd00` | 01:34:21 | 37631164 | 281540 | 36.36.11 |
| `88773fd14f06422f95d79f958b2876a7` | 16:23:30 | 37643688 | 281683 | 36.36.12 |

## Source explanation

The original ticket's adjustment is built during replacement checkout:

`TicketBasketPurchaseService._process_exchange_credits` → `InvoiceItemExchangeService.exchange` → `TicketExchangeHandler.run_exchange` → itemized refund manager → `BaseItemizedRefundExecutor.execute` → `refund_invoice.save()` → `Invoice.ensure_totals_makes_sense`.

The word “refund” in these internal classes does not mean this request issued a payment Refund. The executor explicitly uses `revert_payment=False`, `refund_to_credit=True` and internal Exchange accounting.

| Part of the adjustment | Captured amount |
| --- | ---: |
| Organization earnings reversal | -76.25 |
| Showpass earnings reversal | -3.19 |
| Commission, tips, donations, protection | 0.00 |
| Breakdown total | **-79.44** |
| Cash final amount | 0.00 |
| Credit amount | -76.44 |
| Additional credit adjustment | 0.00 |
| Total side | **-76.44** |
| Difference | **3.00** |

The refunder calculates earnings reversal, Showpass-fee reversal and credit reversal using separate formulas. For ordinary ticket rows, credit is capped and previously refunded credit is subtracted. The Organization earnings formula also subtracts prior refunds/credit refunds, while Showpass fees use the selected refund type. These are the inputs to reconcile; the event alone does not show which original input or formula created the $3 shortfall.

The assertion is a protective balance check. Removing it would allow an unbalanced adjustment and is not a supported fix. Changing fees or adding $3 of credit to the live Customer is not justified by this evidence.

The failure occurs before this executor saves its adjustment items or voids the selected tickets. The purchase service also wraps the operation in a database transaction. That source ordering does not independently establish the current state after all attempts or earlier actions. For the latest free payment type, the normal card-charge branch does not run.

### Source anchors and revisions

Backend: clean `develop` at `2f7515c35e5e92375ecef0a0221a91c55b11f526`. Frontend: clean `develop` at `a834f36e81ab01d531490ea38c794bd8cbc8b9c6`. These are local revisions, not a claim that the frontend revision was deployed for this event.

- [Adjustment builder and failing save](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/payments/itemized_refunders/executors.py:34>)
- [Credit reversal calculation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/payments/refunders/base.py:1341>)
- [Organization earnings reversal](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/payments/refunders/credits.py:296>)
- [Totals compared by the assertion](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_cost_breakdown.py:379>) and [failing check](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice.py:1134>)
- [Purchase transaction and payment ordering](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:170>) and [normal card-charge condition](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py:547>)
- [Admin item search supports the original item ID](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/admin/invoices.py:61>)
- [Customer Exchange and Return controls](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/OrderOptionsList.web.tsx:353>) and [temporary-credit activation](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/exchanges/hooks/useExchangeTicketItemModal.ts:806>)

### Did a commit break it?

**Not established.** Local tags `v36.36.10`, `v36.36.11` and `v36.36.12` have no intervening changes in the inspected refunder, itemized-refunder, Exchange-service and balance-formula paths. The captured frames match the relevant source path. First occurrence in 36.36.11 does not establish that release introduced the underlying problem; older saved data or an older calculation can become visible only when this order is exchanged.

Commit `1b0da2151f8c5435788d6bc9dc38f7af548fe5f4` (October 19, PR #12118) changed repeat-Exchange handling for [SPD-2820](https://showpass.atlassian.net/browse/SPD-2820). The connected Jira read shows a different known failure: a full-refund validation message on a previously exchanged Festival Place order. Its status is Complete. That is related history, not proof this Holly Jolly Journey balance assertion is the same bug or was caused by that change.

## Evidence needed to identify the underlying cause

Engineering's next useful step is an authorized **read-only snapshot of original invoice item 26523743 and its related history**, before attempting a repair or replay:

- Parent invoice/order and Venue IDs, original payment/credit type and Exchange refund-fee setting.
- Original and selected quantities; bundle parent/child links and the exact ticket selected by the handler.
- `final_amount_stat`, `credit_applied`, `credit_applied_stat`, `credit_amount_refunded_stat`, `amount_refunded_stat`, `amount_credit_issued_stat`, `amount_earned_stat`, `amount_company_earned_stat` and relevant fee/tax breakdowns.
- Linked sale, Exchange Adjustment, Refund/correction and UserCredit records, including credits 281540 and 281683, and whether any attempt later completed.

Use these values to calculate the adjustment without executing a purchase. Determine whether the saved source values already disagree, the ticket selection/splitting changes the allocation, or the adjustment formulas omit a retained/reversed amount. Sentry's captured model descriptions and parameterized SQL do not supply these numeric inputs. No application/database reader was used here to retrieve them.

## BUG-01 — Exchange checkout fails for the affected family pass

**Draft only — no Jira issue has been created.**

**Title:** fix (exchanges) | Holly Jolly Journey family-pass Exchange fails at checkout

**GIVEN** the affected December 18 Holly Jolly Journey 2026 family pass is being exchanged using Exchange Credit.

**WHEN** the Customer submits the replacement checkout containing December 23 tickets.

**THEN** the purchase request fails because the adjustment for the original family pass has a $3 difference between its earnings breakdown and credit total. The Exchange should calculate matching totals and complete with the correct replacement tickets and credit balance.

**Evidence:** Production Sentry SHOWPASS-LIVE-FM9 records seven failed attempts on October 28–29 MDT, all involving original order item 26523743. Manual reproduction and the exact Customer-visible message have not been verified. The original financial history is needed to prepare an equivalent test order. This draft is based on recorded server failures, not an agent-executed checkout.

## Data safety, cleanup and remaining coverage

Only read-only Sentry/Jira API requests and local source/history reads were performed. No purchase request was replayed, no test records or temporary files were created, and no Showpass record, session, fee or credit was changed. There is no test-data cleanup to perform. Unrelated vault edits were preserved.

One clean successful Exchange, a matched isolated failure, old/new ticket validity, inventory, final credit/earnings reconciliation and bounded recovery after failure remain **Not run / deferred until equivalent owned test data exists**. Provider state and actual saved financial results are unverified. Memberships, Box Office, other Organizations and unrelated original orders are outside the observed failure scope; they have not been shown to share it. This investigation is not release sign-off.

## Results

| Check | Result | Evidence / exact point |
| --- | --- | --- |
| Sentry failure and repeated original item | Passed — investigation evidence confirmed | [[#Recorded evidence]]; seven events and matching source item |
| Adjustment's $3 imbalance | Failed — recorded backend operation; [[#BUG-01 — Exchange checkout fails for the affected family pass\|BUG-01]] | [[#Source explanation]]; adjustment save raises AssertionError |
| TC-01 — Locate original order | Not run | [[#TC-01 — Locate the affected original order without changing it\|TC-01]], steps 1–2; live Admin record not inspected |
| TC-02 — Manual reproduction | Blocked | [[#TC-02 — Reproduce the failed Exchange\|TC-02]], step 1; original numeric setup missing |
| Specific fee or commit caused the difference | Inconclusive | [[#Evidence needed to identify the underlying cause]] |
| Clean success, recovery and final saved money/tickets/stock | Not run | [[#Data safety, cleanup and remaining coverage]] |
