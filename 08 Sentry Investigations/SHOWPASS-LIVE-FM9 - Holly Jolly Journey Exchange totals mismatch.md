---
title: SHOWPASS-LIVE-FM9 - Holly Jolly Journey Exchange totals mismatch
date: 2026-10-29
tags:
  - qa/sentry
  - qa/exchanges
aliases:
  - Sentry 7817622355
status: Recorded failure and calculation cause confirmed; recent breaking commit unproven; manual reproduction blocked
---

# SHOWPASS-LIVE-FM9 — Holly Jolly Journey Exchange totals mismatch

## Overview

**An Exchange checkout fails because the adjustment for the original ticket does not balance.** Its earnings breakdown reverses **$79.44**, but its credit/total side reverses **$76.44**. Showpass stops the save because those amounts differ by **$3.00**. This is a financial calculation/assertion failure, not a recorded performance timeout.

The affected original item is **4-Pack Family Pass (2 adults + 2 children), Holly Jolly Journey 2026, December 18**. The latest replacement basket contains Child Ticket (ages 4–12), Adult Ticket (13 & older), and a 4-Pack Family Pass for **December 23**. These descriptions identify the affected offerings; Sentry does not establish the replacement quantities or current availability.

All **seven retained failures** involve **original invoice item 26523743**, across three checkout baskets and two Exchange Credit IDs. They are repeated attempts involving the same original item, not evidence of seven independent affected orders.

**Cause confidence — updated October 30, 2026:** High for the calculation mechanism. The user returned financial rows for both the successful Vancouver Outdoor Pools Package and the failing Holly Jolly Journey Package. Holly Jolly Journey has **76.44 credit on the parent, 79.44 including its contents**, and **0.19 Showpass earnings on the parent, 3.19 including its contents**. The Exchange reverses the combined earnings but caps the credit reversal using the parent alone. Selected source branches evaluated with these returned values reproduce the exact Sentry result; the working Package balances. This is a specific Package funding/fee split, not proof that every consecutive Package Exchange fails. The old February 2025 change introduces this mismatch in the isolated calculation; **a recent commit that introduced the failing purchase's split or changed the user's earlier passing flow remains unproven**. See [[#Returned financial comparison — October 30, 2026]] and [[#Did a commit break it?]].

**Impact:** These purchase attempts stop before the Exchange completes normally. The latest request is a $0 checkout using Exchange Credit. The source's normal card-charge branch is skipped for its payment type. The final saved order, ticket validity, credit balance and any earlier payments have not been independently inspected; this investigation does not establish a duplicate charge or damaged saved totals.

**April success reported by the user:** The user states this flow worked in **April 2026**. This is evidence of their prior successful test, not a claim withdrawn because a later working record has a different fee split. The April record, environment and financial values are not yet linked to an Invoice ID. **The February 2025 commit is not an established answer to what broke that test.** Follow-up source review also found a separate October 29 branch containing a directly relevant child-credit fix; it is absent from the inspected local develop revision. See [[#April success and separate October 29 fix]].

[Sentry issue](https://showpass.sentry.io/issues/7817622355/) · [Latest recorded event](https://showpass.sentry.io/organizations/showpass/issues/7817622355/events/88773fd14f06422f95d79f958b2876a7/)

## Affected Venue, Customer and order

Sentry supplies the Customer and checkout details. The user's October 30 SQL results additionally establish the Venue, parent Invoice ID, order reference, quantity and Ticket Type ID. These returned rows were not independently queried by the agent; database environment and extraction time were not supplied.

| Detail | What we know |
| --- | --- |
| Venue ID | **14725**, returned by the user's financial comparison. |
| Venue / Organization name | **Holly Jolly Journey**, from the returned Venue row. The Event is separately named Holly Jolly Journey 2026. |
| Customer | **Meghan Gowan**, shown in the basket, resolved Customer and original/replacement invoice descriptions. |
| Customer email | **Unavailable in the redacted API output.** No email is supplied here. |
| Customer ID | **Not captured in the fields inspected.** |
| Source Invoice ID / order reference | **Invoice ID 18189103**; order reference `98-ea67-49af-a4e9-04ec8b6dee72`, returned through Invoice item 26523743's actual parent relationship. This is the order being exchanged in FM9; its own earlier source order, if any, has not been identified. |
| Original invoice description | `$0.00 Exchange Credit In Progress for Meghan Gowan`. This is the captured state/description during the Exchange; it does **not** establish that the original purchase was free. |
| Original order item | **Invoice item ID 26523743** — **4-Pack Family Pass (2 adults + 2 children)**, **Holly Jolly Journey 2026 — December 18**. Returned quantity **1**; **Ticket Type ID 4533628**. |
| What they are purchasing | Replacement items for **Holly Jolly Journey 2026 — December 23**: **Child Ticket (ages 4–12)**, **Adult Ticket (13 & older)**, and **4-Pack Family Pass (2 adults + 2 children)**. Quantities and Ticket Type IDs were not captured in the descriptions. |
| Event IDs | **Not captured in the fields inspected.** |
| Latest replacement checkout | Basket **37643688**; captured invoice description `$0.00 Sale for Meghan Gowan`; Exchange Credit **281683**. |
| Earlier affected checkouts | Baskets **37630712** and **37631164**, using Exchange Credit **281540**; same original item. |

**Lookup supported by the evidence:** Search **Invoice ID 18189103** under Admin → Financials → Invoices, or **Invoice item ID 26523743** under Financials → Invoice items. The SQL result now establishes their relationship. **Meghan Gowan** is an additional Customer-name search aid, not a unique Customer ID. TC-01 remains an unexecuted optional Admin check; repeating that lookup is not needed to establish the IDs.

**User-reported lookup result:** Admin displayed **“invoice with ID ‘26523743’ doesn’t exist. Perhaps it was deleted?”** This warning concerns an **Invoice** lookup. The Sentry ID identifies an **Invoice item**, which is a separate record. The warning does not establish that the original order or its item was deleted. The correct Invoice-item lookup remains unverified.

**Follow-up access limit:** Matching-log discovery was attempted through the connected Datadog plugin, but its `search_datadog_sdk` tool failed with **Unknown tool**. No Datadog logs were read. Venue and invoice identifiers above came from the user's matching SQL row, not another Sentry issue.

### Returned financial comparison — October 30, 2026

**Provenance:** Two database-result rows pasted by the user in response to the prepared comparison SQL. The agent did not connect to the database. Amounts are returned saved values; current settings do not establish historical settings. The working row explicitly confirms its parent matches reported Invoice ID 17789827. The failing row establishes previously unknown **Invoice ID 18189103**; its NULL `reported_invoice_id` means no parent had been supplied to compare, not that the actual parent is unknown.

| Saved value | Working — Vancouver Outdoor Pools | Failing — Holly Jolly Journey |
| --- | --- | --- |
| Venue ID | 10153 | 14725 |
| Invoice ID | 17789827 | 18189103 |
| Invoice item ID | 25786569 | 26523743 |
| Ticket Type ID | 4517393 | 4533628 |
| Quantity | 1 | 1 |
| Credit on parent | 9.34 | **76.44** |
| Credit including contents | 9.34 | **79.44** |
| Difference in credit | 0.00 | **3.00** |
| Organization earnings, parent / combined | 8.60 / 8.60 | 76.25 / 76.25 |
| Showpass earnings, parent / combined | 0.74 / 0.74 | **0.19 / 3.19** |
| Cash amount, parent / combined | 0.00 / 0.00 | 0.00 / 0.00 |
| Prior cash refunds, credit refunds and credit issued, parent / combined | All 0.00 | All 0.00 |
| Item created, as displayed | August 30, 2026, 11:52 p.m. | **September 30, 2026, 2:05 p.m.** |
| Item updated, as displayed | September 1, 2026, 10:24 p.m. | **September 30, 2026, 2:05 p.m.** |

Both rows are itemized Package parents, not sub-tickets, with no parent Invoice item, `uses_added_fee_calculation=False`, current revenue mode `parent`, current Web and Box Office Exchange fee policies `no_fees`, current `is_redeemable=False`, and current `internal_dollar_fees_parent_only=NULL`. Those selected settings do not distinguish these two records. They do not establish identical fee definitions or historical flag values.

**What differs:** In parent-based Package accounting, combined values add the included items' amounts to the parent. The returned differences therefore fit **3.00 of included-item credit and Showpass earnings**, with no included-item Organization earnings. Exact child rows, individual fee names and their purchase-time definitions have not been retrieved; no particular fee should be renamed or removed on this evidence alone.

**Exact calculation:** The failing Exchange returns Organization earnings **76.25** and Showpass earnings **3.19**, total **79.44**. Its credit calculation instead takes `min(79.44, 76.44)`, returning **76.44**. Cash and prior refunds are zero. Negating these values produces Sentry's **-79.44 versus -76.44**. The working Package returns **8.60 + 0.74 = 9.34** and **9.34 credit**, so it balances.

**Why the earlier success does not identify a recent regression:** The successful September Package has no credit/fee value outside its parent. It never exercises the missing included-item credit. The failing item's displayed creation/update date is September 30, before the October fee changes reviewed below. That is evidence about the returned saved row, not a historical audit or deployment record. It does not prove when the same configuration first became unable to Exchange.

## Test index

- [[#TC-01 — Locate the affected original order without changing it]] — Not run; precise read-only lookup.
- [[#TC-02 — Reproduce the failed Exchange]] — Blocked for browser execution; financial split known, exact test-order preparation missing.
- [[#TC-03 — User's Package attempt stops at zero credit]] — User screenshot confirms a disabled Start exchange button; a common cause with FM9 is unproven.
- [[#BUG-01 — Exchange checkout fails for the affected family pass]] — Copy-ready draft only.

## Setup and limits

The recorded environment is **production**, releases **36.36.11–36.36.12**. The latest browser is Safari 26.2 and the referring page is customer checkout. No browser or desktop app was opened by the agent for this investigation. No screenshot is available. The user-reported Invoice lookup warning is recorded above; the planned Invoice-item lookup and Exchange reproduction remain unverified.

The Customer is **Meghan Gowan**. The user's SQL now identifies **Holly Jolly Journey, Venue ID 14725**, source **Invoice ID 18189103** and its order reference above. The actor's access remains unknown. Employee impersonation is not needed to explain the calculation. An unrelated order in your own account does not reproduce the included-item credit/fee split.

## TC-01 — Locate the affected original order without changing it

**What this tests:** Whether an authorized support employee can identify the exact original order, rather than trying an unrelated family-pass purchase.

**Start here:** Showpass production **Admin**, using an account that already has permission to view invoice items. An invoice item is one line of an order. This check is **no data change**: search and read only. It is an optional record lookup, not a reproduction of the failure. Missing Admin access is a stopping condition; no permission or impersonation change is requested.

### Steps

1. **In Admin, return to the main index and open Financials → Invoice items. Choose Invoice items, not Invoices. Search for item 26523743.** If the search uses query syntax, enter `id = 26523743`; in ordinary text search, enter `26523743`. Submit the search once.

   **Expected:** One matching item with the family-pass description for Holly Jolly Journey 2026, December 18.

   **Actual — Not run:** Sentry identifies this item in every captured failed Exchange. Admin access and the live row have not been checked. If the item is absent, access is denied, or the description differs, stop and record that outcome.

2. **Open that matching item. Read the number in its Invoice field; that is the parent invoice ID.** Also record its Venue reference/name if shown. Leave without editing fields or selecting Save or an action from the list.

   **Expected:** The original order and owning business can be identified from the matching row. This gives support a precise order to inspect next.

   **Actual — Not run in Admin:** The user's later SQL result establishes **Invoice ID 18189103**, **Venue ID 14725 — Holly Jolly Journey**, and the order reference above. This does not count as an executed Admin check. The original item ID is not a customer-facing order number. No repeat lookup is needed for the investigation.

**Finishing point:** Stop after identifying the order, or the first access/missing-record outcome. No Refund, Void, Exchange, resend, or purchase is needed. A successful lookup does not prove the Exchange works. If this check is performed later, record the outcome and local time; include only the Customer lookup details needed for this investigation and omit ticket barcodes.

**Report back:** `Invoice item found; Invoice = __; Venue = __`, `Invoice item 26523743 not found`, or `Invoice items access denied`, with the local time. An Invoices-page warning is not the result of this Invoice-items check.

## TC-02 — Reproduce the failed Exchange

**What this tests:** Completing the affected Exchange should produce balanced accounting and exactly one replacement order, with the expected old/new ticket validity and credit balance.

**Start here:** **Blocked for browser execution.** The source financial split is now known: one itemized Package, parent-based accounting, no cash, **76.44 parent credit / 79.44 combined credit**, and **0.19 parent / 3.19 combined Showpass earnings**. No equivalent owned test order has been prepared. The exact included-item fee definitions and preceding Exchange links are not yet known, so there is no verified UI recipe for creating that split. Buying any family pass and exchanging it to another date is not a demonstrated reproduction.

### Steps

1. **Stop before starting another Exchange or submitting a checkout for the live affected order.** Engineering should use the returned financial comparison and the remaining history details in [[#Evidence needed to identify the underlying cause]] to prepare an equivalent owned test order, without editing the live Customer's credit or fees.

   **Expected:** The equivalent test order has the same relevant original fees, applied credit, prior adjustments and selected-ticket allocation. Its expected Exchange amount can be calculated before an execution is authorized.

   **Actual — Blocked for UI execution:** The user's SQL supplies the parent financial inputs and an isolated source calculation reproduces the failure. The exact included-item preparation and historical Exchange links remain unverified. No test order was created and no Exchange was submitted. Changes to test orders, temporary credits, stock and ticket validity would need an owned-data execution and cleanup plan; a $0 checkout can still change these records.

**Known failure point:** The recorded request was the final customer-checkout purchase after replacement items were selected. Source offers **Exchange items** or, under the returns rollout, **Return order** as possible entry points. Sentry cannot tell which earlier control was used. **Start exchange** can activate temporary credit before checkout; opening that flow is not a substitute for a read-only record lookup.

**Unverified visible result:** The customer's exact message or screen after the failed request is unknown. A generic checkout error would require matching server evidence to establish this same failure. Do not repeatedly submit the production basket to force it.

## TC-03 — User's Package attempt stops at zero credit

**What this tests:** Whether the user's selected Package can proceed from its credit summary to start an Exchange. This is an earlier step than the final-checkout failure in FM9.

**Start here:** User-supplied screenshot, received October 29, 2026. The Event title is truncated as **“How much wood would a woodchuck chuck if a wood...”**, dated **November 13, 2026, 1:00 PM EST**. The selected item is named **Package**, quantity **1**. Environment, Venue ID/name, Customer, Invoice ID and Invoice item ID are **unknown** for this attempt. Do not apply Meghan Gowan, item 26523743 or any other FM9 record identity to this Package without a verified relationship.

### Steps and supplied evidence

1. **Review the Package's Exchange summary.** The actions that opened the summary were not supplied; no browser action was executed by the agent.

   **Expected:** The summary shows the amount available from the selected Package under the applicable Exchange policy. Whether zero is correct depends on the original payment, credit and adjustment history; those values are not known for this test order.

   **Actual — User-observed:** Price, Subtotal, Service Fees, Taxes and **Total Exchange Credit** all display **$0.00**. **Start exchange** is disabled. The user cannot proceed from this summary.

   <img src="../99 Archive/QA Evidence/exchanges/showpass-live-fm9-package-preview-2026-10-29/user-package-zero-credit.png" alt="User-supplied Package Exchange summary showing zero credit and disabled Start exchange" width="600">

2. **Stop at this summary; establish the original payment before proposing another attempt.** The clarification requested is whether the Package was originally paid for, free/complimentary, or purchased with Exchange Credit, plus the **Invoice ID** if already available. Do not substitute an Invoice item ID.

   **Expected:** The original payment/credit history distinguishes a zero-value order from a paid Package whose calculated credit is unexpectedly zero. No record change is needed to supply an existing receipt or ID.

   **Actual — Blocked:** This information has not been supplied. A Package-wide Exchange defect and a shared cause with FM9 are **inconclusive**. No purchase, Refund, Void or credit activation was executed by the agent.

**Source-confirmed explanation of the disabled button:** [The shared web modal](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/exchanges/components/ExchangeTicketItemModal/ExchangeTicketItemModal.web.tsx:180>) explicitly disables its summary action when `credit_total` is zero. This is not a Package-type prohibition. [The summary](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/exchanges/components/ExchangeTicketItemModal/screens/ExchangeTicketItemSummary.web.tsx:121>) displays each item's returned credit amount, while [the backend credit generator](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/user_credits/exchanges/credit_generation.py:267>) calculates selected-ticket credit through the invoice's Exchange calculation. [Package accounting](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/invoice_management/invoice_items.py:947>) can aggregate included-item values into Package parent totals. The screenshot does not establish which original values or package accounting mode produced this zero.

**Evidence classification:** Confirmed inability to proceed in the supplied screenshot; cause of zero credit and intended zero-credit Exchange behavior unresolved. No confirmed-bug draft is added for this separate symptom yet. No tests were executed for this follow-up; it used the supplied image and source review at the revisions recorded below.

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

The refunder calculates earnings reversal, Showpass-fee reversal and credit reversal using separate formulas. For ordinary ticket rows, credit is capped and previously refunded credit is subtracted. The user-returned rows now identify the difference: combined Showpass earnings include an extra **3.00**, but the credit cap uses only the parent credit. Both returned records have zero prior refunds/credit issued. See [[#Returned financial comparison — October 30, 2026]].

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

**The old calculation change is now tied to the returned numbers; a recent end-to-end breaking commit remains unproven.** The user describes consecutive Exchanges of an itemized Package and recalls testing it successfully. The successful Vancouver Outdoor Pools record has all credit and fees on its parent; the failing Holly Jolly Journey record includes 3.00 on its contents. Therefore the successful September record does not demonstrate that the failing setup worked then. The source comparison below isolates the February 2025 change with both returned records. It does not establish a production last-working/first-failing release, nor link the separate zero-credit screenshot to this failure.

#### Recent changes reviewed after the user's timing correction

The first history pass focused too narrowly on the failing refunder formulas. The follow-up included the upstream basket, Package-fee and credit-allocation code that can change the saved inputs even when those formulas remain unchanged.

| Change | What changed and whether it fits |
| --- | --- |
| [`bd27cad265a3`](https://bitbucket.org/showpass/web-app/commits/bd27cad265a3d5e8f457623c069dda729e741fed), October 22, [SPW-21125](https://showpass.atlassian.net/browse/SPW-21125), PR #12192 | Introduced parent-Ticket-Type setting `internal_dollar_fees_parent_only`. When **True**, ordinary company and processing dollar fees move to the purchased Package parent and are suppressed on included children. **NULL/False preserves the previous fee policy.** It can change newly purchased Package amounts, but the affected Ticket Type's setting at purchase is unknown. Not a confirmed cause. The earlier October 21 PR #12185 was reverted before this replacement; do not treat it as the active implementation. |
| [`12b1e0e2131e`](https://bitbucket.org/showpass/web-app/commits/12b1e0e2131eeb8271d5e92a33b260c1fc15b0fe), October 23, [SPD-2818](https://showpass.atlassian.net/browse/SPD-2818), PR #12226 | Changed **standard** itemized credit allocation to round money amounts and cap per-item credits. However, the calculator returns through the separate `ExchangeCreditAllocator` when the itemized-Exchange switch, signed-in user, Exchange Credit type and matching itemized credit are present. This commit is not automatically on the reported itemized-Exchange path. Whether a prior purchase used the standard path is unknown. |
| [`f9aa7b96fae5`](https://bitbucket.org/showpass/web-app/commits/f9aa7b96fae505d3e7519397cced415d7a6edfe5), September 30, SPD-2761 | Changed parent dollar-fee eligibility to charge redeemable Package parents as well as their included children under the normal policy. This depends on Package redemption setup. The affected historical Ticket Type setup and a matched before/after order are unavailable. |

The October 22 and October 23 changes are included in local `v36.36.0` and the observed later release tags. Tag inclusion establishes code ancestry, not the incident's saved configuration or an exact deployment time. Connected Jira reads confirm SPW-21125's default-off requirement and SPD-2818's different reported refund problem; neither supplies a link to Meghan Gowan's order.

**Executed follow-up check:** The actual SPW-21125 policy method was evaluated without Django/database access for **NULL, False and True**, each with parent and child context. All six checks retained existing controls for NULL/False; True applied company/processing dollar fees to parents and suppressed them on children, leaving the module-fee example unchanged. This confirms the condition needed for that change to matter. It does not reproduce an Exchange failure.

**October 30 update:** The returned source item was created/last updated September 30 as displayed; its current parent-only fee setting is NULL and redemption is False. Both compared records currently share the selected Exchange policy and Package accounting settings. The October changes are not needed to reproduce the failing arithmetic from these saved values. Historical settings, the included-item fee definitions, preceding Exchange links and exact deployed revision at purchase remain unavailable.

The September 11 Package-stats change [`73d4e174da5d`](https://bitbucket.org/showpass/web-app/commits/73d4e174da5d6c407e94e3a0ed428055157b79da), SPD-2684 / PR #11444, was also inspected after receiving these dates. It defers parent-stat refresh until all child links are saved, then refreshes the parents inside the purchase transaction; it does not change the inspected parent aggregation formulas. The returned amounts produce the same refunder result immediately before and after that change. Purchase-time state construction was not executed, so this is not an end-to-end exoneration or attribution.

#### Older arithmetic weakness — not the identified recent breaking commit

**Historical change:** [`79887670d4f01790414dc3a5d134079e5fb8abfc`](https://bitbucket.org/showpass/web-app/commits/79887670d4f01790414dc3a5d134079e5fb8abfc), **February 3, 2025**, reapplying **SPW-14226 revenue-realization support** after a revert. Compared against its direct parent, `b62d0f6e95cc2d1252b333546c7a2bfc735aaeb2`. It should not be presented as the answer to which recent commit broke the user's test.

That change made Organization earnings and Showpass-fee reversal use the Package's combined financial totals (`amount_earned_stat`, `amount_company_earned_stat`). The ordinary-ticket credit lookup continued using only `credit_amount` / `credit_applied` on the parent row. In the actual returned failing row, Organization earnings are unchanged between parent and combined; the decisive change is **Showpass fees 0.19 → 3.19** while the credit cap stays **76.44**. This mixed calculation remains in the ordinary-ticket path; later Membership revenue-realization handling does not cover an ordinary Package parent.

#### Controlled calculation comparison — executed locally

This comparison ran **selected actual Python financial branches extracted from Git**, without importing Django, connecting to a database, creating records or running checkout. It exercised `create_invoice_item`'s earnings/credit/credit-adjustment branches and the actual `get_invoice_item_final_amount`, `_determine_ii_refund_amount` and `CreditRefunder.get_amount_earned` methods. Unrelated tax/fee-building, validation, database writes and payment operations were not executed. The Showpass earnings reversal was held at 3.19 to isolate the parent-versus-combined-value difference. Constants were represented by semantic refund-type names and an ordinary ticket type.

The sample Package parent had **76.44** of directly applied credit and **79.44** including its contents; earnings were **73.25** directly and **76.25** including its contents, plus **3.19** Showpass earnings. Cash and prior-refund amounts were zero. These are **constructed inputs**, not retrieved values for invoice item 26523743. They describe one plausible way to produce the recorded result; other original inputs may also do so.

| Same sample inputs | Before candidate commit | At candidate commit | Itemized V2, November 2025 | Before October 19 repeat-Exchange fix | Release 36.36.12 and current HEAD |
| --- | --- | --- | --- | --- | --- |
| Ordinary credit-funded ticket; direct and combined values agree | Balanced | Balanced | Balanced | Balanced | Balanced |
| Cash-funded Package; combined cash covers its contents | Balanced | Balanced | Balanced | Balanced | Balanced |
| Credit-funded Package; 3.00 of credit/value is on its contents | Balanced: -76.44 = -76.44 | **Unbalanced: -79.44 versus -76.44** | Same **3.00** mismatch | Same **3.00** mismatch | Same **3.00** mismatch |

Additional compared refs were `5f1b4d8e112` (itemized V2), `1b0da2151f^1` (before SPD-2820), `v36.36.12`, and local backend HEAD `2f7515c35e5e92375ecef0a0221a91c55b11f526`. All three sample scenarios were evaluated at all six refs, for **18 completed calculation comparisons**. The comparison included the older credit branches and both controls passed at every ref. No full Package Exchange integration test or actual historical order was executed.

**Meaning of the earlier probe:** This first established an old arithmetic weakness with constructed inputs. Its assumed direct earnings were not the actual row's direct earnings. The October 30 comparison below supersedes that input assumption and establishes a real difference between the working and failing Packages. Neither isolated comparison proves a complete historical checkout succeeded.

#### Comparison using the returned financial rows — executed October 30

The second probe used the **actual financial values returned by the user**, including both direct and combined Showpass earnings. It extracted selected financial statements and constructor field expressions from `BaseRefunder.create_invoice_item`, plus the actual `get_invoice_item_final_amount`, `_determine_ii_refund_amount`, `_get_company_refund_value`, and `CreditRefunder` earnings/company-fee methods from each Git revision. It used the captured full-company-fee refund type, embedded calculation (`uses_added_fee_calculation=False`), ordinary ticket type and Exchange Credit. Both `refund_to_credit=False` and `True` were checked; their selected values agree here because cash is zero.

| Returned record, same inputs at each ref | Before 79887670d4f | At 79887670d4f | Before / after September 11 Package-stats change | Release 36.36.12 / local HEAD |
| --- | --- | --- | --- | --- |
| Working Invoice item 25786569 | -9.34 = -9.34 | -9.34 = -9.34 | -9.34 = -9.34 at both | -9.34 = -9.34 at both |
| Failing Invoice item 26523743 | -76.44 = -76.44 | **-79.44 ≠ -76.44** | **Same 3.00 difference at both** | **Same 3.00 difference at both** |

**24 selected-branch comparisons passed their expected assertions:** two returned records × two refund-to-credit settings × six refs (`79887670d4f^1`, `79887670d4f`, `73d4e174da^1`, `73d4e174da`, `v36.36.12`, `2f7515c35e5e92375ecef0a0221a91c55b11f526`). The first extraction attempt omitted a historic standalone earnings assignment and stopped with `NameError`; it produced no completed result. The corrected extraction included that assignment and completed all 24 comparisons. There were no files or database changes.

**Scope of this proof:** This reproduces the exact recorded financial discrepancy with returned inputs and isolates an older source change that introduces it in those branches. No Django models, fee construction, validation, ticket selection/splitting, database persistence, gateway or browser checkout ran. Semantic refund constants and ordinary ticket/Exchange Credit stand-ins selected the relevant branches. Unselected assertion terms (commission, tips, donations, protection) are zero in Sentry; the SQL did not independently return those fields. A balanced parent-only result in the older version does not prove it correctly handled all Package contents. Reverting revenue-realization support is not a demonstrated fix.

#### April success and separate October 29 fix

**Timeline correction:** The user reports the same consecutive itemized Package Exchange scenario worked in **April 2026**. No April Invoice ID, exact day, environment or financial snapshot was supplied. Keep this as a reported successful test; do not assume it had zero included-item credit merely because the separate Vancouver control does. The old calculation probe cannot establish which later change caused this reported regression.

**Source review after that correction:** The inspected first-parent April 30 source revision is `dc5bbd49cf4c6f552604f8f6204fbc365d5b9ea1`. Its ordinary-ticket refundable-credit helper already reads parent-only credit, and its ordinary-ticket Exchange handler selects original Invoice items for the refunder. This is an available source baseline, **not a verified April deployment**. Later changes reviewed include May 11 SPW-18545 (adds combined-credit handling specifically for revenue-realization rows, leaving ordinary Package parents on the old path), June 17 SPW-19166 (replacement settlement/internal accounting context), July 31 SPW-19743 (selected-ticket credit validation), and September 11 Package-stat finalization. None of these inspected diffs establishes an end-to-end failing transition for the user's April setup. Historical fee creation, rollout and source-record selection remain separate questions from the arithmetic helper.

**Existing fix found on another branch:** [`472275ce019d2636724b27112712d365391a3c29`](https://bitbucket.org/showpass/web-app/commits/472275ce019d2636724b27112712d365391a3c29), committed **October 29, 2026, 01:51:12 UTC**, titled **“include package child credit in refund accounting”**, is reachable from local remote-tracking branch `origin/leonardo/package-exchange-credit-scope`. It is **not an ancestor of the inspected develop HEAD**. Local tracking refs are not live Bitbucket PR/merge status; no deployment has been verified.

The fix changes `BaseRefunder.get_invoice_item_final_amount` to use **`credit_applied_stat` for ordinary Package parents too**, matching the scope of combined cash and prior-refund fields. It adds helper tests and an integration test for a credit-funded Package with fees on four children. That integration test uses the legacy Exchange path (itemized-Exchange switch off), so its presence does not prove the exact FM9 itemized scenario passed. The added tests were inspected, **not run by this investigation**.

**Executed narrow check:** The actual helper extracted from the April 30 revision, inspected develop HEAD and this separate fix was evaluated with both returned records: **six evaluations passed**. April/develop return **76.44** for the failing record; the separate fix returns **79.44**. All three return **9.34** for the working record. This demonstrates that the branch fixes the identified helper omission while preserving the working example. It does not prove a complete Exchange, current deployment, or the commit that broke the April test.

**Current conclusion:** Exact $3 calculation cause confirmed; a relevant existing fix located; **April-to-failure regression attribution remains inconclusive**. A matched April order or a source-backed before/after purchase that changes the included-item split/routing is still needed to identify that transition. No production retry or fee change is needed to establish those facts.

Local tags `v36.36.10`, `v36.36.11` and `v36.36.12` have no intervening changes in the inspected refunder, itemized-refunder, Exchange-service and balance-formula paths. The five inspected core refunder methods also have identical normalized Python structure at `v36.36.0`, `v36.36.12` and the immediate pre-October-19-fix revision, after excluding documentation and annotations. First occurrence in 36.36.11 does not establish that release introduced the underlying problem.

Commit `1b0da2151f8c5435788d6bc9dc38f7af548fe5f4` (October 19, PR #12118) changed repeat-Exchange handling for [SPD-2820](https://showpass.atlassian.net/browse/SPD-2820). The connected Jira read shows a different known failure: a full-refund validation message on a previously exchanged Festival Place order. Its status is Complete. That is related history, not proof this Holly Jolly Journey balance assertion is the same bug or was caused by that change.

## Evidence needed to identify the underlying cause

**Already supplied:** The user returned the source parent relationship, Venue, quantity, Ticket Type, cash/credit/earnings/refund values and current selected settings for both records. The calculation cause is now supported without replaying checkout. The prepared [financial comparison SQL](</Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/08 Sentry Investigations/SHOWPASS-LIVE-FM9 - original invoice item financials.sql>) is the query that produced those user-returned rows; it was not executed by the agent.

**Remaining evidence for a recent causal commit or a repeatable UI setup:**

- Exact included-item rows beneath **Invoice item ID 26523743**, especially their applied credit, Showpass earnings and stored fee components. This would identify which saved child values make up the extra 3.00, rather than assuming a particular dollar fee.
- Linked earlier purchase/Exchange Credit deductions proving how **Invoice ID 18189103** was funded and whether it was itself a completed replacement. Exchange Credit funding alone does not prove that whole earlier sequence.
- Purchase-time fee definitions/settings and deployed code, or a successful record with the **same included-item credit/fee split**. The Vancouver record is a useful control but does not match that triggering split.
- Final state after the recorded failed attempts, if recovery or impact beyond the failed calculation is being assessed.

The next investigation should follow these saved relationships, not repeat the parent comparison or ask for another generic fee-setting check. No production repair, credit top-up or purchase replay is authorized.

### Find a completed January 2026 comparison

At the user's request, a [read-only January 2026 query](</Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/08 Sentry Investigations/SHOWPASS-LIVE-FM9 - January 2026 completed package exchange chains.sql>) searches **any Venue**, without requiring an incident record or Venue parameter. It returns the **10 newest matching saved Package A → Package B → Package C chains**, where the second Exchange's credit deduction was recorded from **January 1, 2026, 00:00 UTC**, inclusive, to **February 1, 2026, 00:00 UTC**, exclusive. The first Exchange can be older.

The query requires completed purchase flags, positive itemized Exchange Credit linked to its use, a settled negative credit deduction, a saved Exchange Adjustment linked to the source Package item, and exact continuity through the **same intermediate Invoice item ID**. The output separates all three **Invoice IDs** from their **Invoice item IDs**, and includes the Venue ID/name, Package descriptions, order reference, receipt email and credit-deduction IDs. This avoids treating a preview, unused credit or unrelated purchases by the same Customer as a successful sequence. Dates are deduction-record timestamps; completion flags are current saved state, not an exact historical completion timestamp or independent proof of provider settlement.

**Limits:** This is a conservative search for identifiable chains, not every historical Package Exchange. It can miss multi-item credits anchored to another primary source item, zero-value credits without negative spending, or records whose bundle/itemization flags changed later. Empty results do not prove the flow never worked. The first row is the latest **matching recorded chain within January**, not a proven last passing test on the same configuration as FM9. A returned chain gives concrete orders and a date to compare; it does not identify the deployed release by itself.

**Validation:** Field relationships were checked against current source and the January 30, 2026 revision `db35062dd3b`; the negative-credit source/replacement link semantics agree. **14 synthetic in-memory logic checks passed**, covering January boundaries, any-Venue scope, newest-first ordering, an older first Exchange, exact order-line continuity, pending purchases, unused credit, missing adjustments and ordinary/non-itemized items. These used SQLite compatibility substitutions for PostgreSQL date/JSON syntax. **The agent has not executed the PostgreSQL query against Showpass data.** The user's subsequent result is recorded below with its date-range limit.

### User-supplied successful comparison — Vancouver Outdoor Pools

**Provenance:** The user supplied one query-result row and described it as the last record returned. It shows **Venue ID 10153 — Vancouver Outdoor Pools** and the same **1 Adult & 1 Child/Youth Combo Package — 2026 Maple Grove Pool — Public Swim Session** across both Exchanges. This is user-returned database evidence, not an agent-executed browser test or independently repeated query.

| Stage | Invoice ID | Invoice item ID |
| --- | --- | --- |
| Original Package A | **17759467** | **25742992** |
| First replacement Package B | **17789827** | **25786569** |
| Second replacement Package C | **17805986** | **25821647** |

- **First Exchange displayed:** August 30, 2026, 11:52 p.m.; deduction credit **267732**.
- **Second Exchange displayed:** September 1, 2026, 10:24 p.m.; deduction credit **268417**.
- **Second replacement order reference:** `0c-ee2a-4e62-88d9-6769caad24ea`.
- **Timestamp limit:** The columns are labelled UTC in the supplied output, but its display timezone has not been confirmed. Preserve the displayed values; do not silently convert them.
- **Query-scope limit:** The maintained January-only query cannot return a September second-Exchange date. The executed query/range was not supplied, so this row is **not evidence that September 1 was the latest success across all data**. It is a concrete saved working comparison. The receipt email supplied with the row is not needed for this comparison and is not duplicated here.

**What this establishes:** A saved repeat-Package Exchange sequence exists in the returned data. If the execution used the documented completion/adjustment predicates, both transitions met those stored completion checks. This contradicts any blanket claim that the older 2025 arithmetic change made all consecutive itemized Package Exchanges impossible. It does not rule out a configuration-specific problem that existed earlier.

**Comparison completed from user-returned rows:** Package B's **Invoice item 25786569** belongs to **Invoice ID 17789827**, as reported, and has no difference between parent and combined credit/fees. Failing **Invoice item 26523743** belongs to **Invoice ID 18189103** and has the 3.00 split described in [[#Returned financial comparison — October 30, 2026]]. Different saved funding splits mean the September success cannot by itself establish a regression date for the failing setup.

## BUG-01 — Exchange checkout fails for the affected family pass

**Draft only — no Jira issue has been created.**

**Title:** fix (exchanges) | Holly Jolly Journey family-pass Exchange fails at checkout

**GIVEN** Meghan Gowan's December 18 Holly Jolly Journey 2026 family pass on Invoice 18189103 is being exchanged using Exchange Credit, and the Package includes fees on its included tickets.

**WHEN** the Customer submits the replacement checkout containing December 23 tickets.

**THEN** the purchase request fails because the adjustment for the original family pass has a $3 difference between its earnings breakdown and credit total. The Exchange should calculate matching totals and complete with the correct replacement tickets and credit balance.

**Evidence:** Production Sentry SHOWPASS-LIVE-FM9 records seven failed attempts on October 28–29 MDT involving Invoice item 26523743. The returned record identifies Holly Jolly Journey, Venue 14725, and confirms the 3.00 difference. Manual reproduction and the exact Customer-visible message remain unverified; the complete preceding Exchange and fee setup is needed for an equivalent test order. This draft is based on recorded server failures and supplied saved amounts, not an agent-executed checkout.

## Data safety, cleanup and remaining coverage

Only read-only Sentry/Jira API requests and local source/history reads were performed. No purchase request was replayed, no test records or temporary files were created, and no Showpass record, session, fee or credit was changed. The user's Package screenshot was preserved locally under `99 Archive/QA Evidence/exchanges/showpass-live-fm9-package-preview-2026-10-29/` and is excluded from Git. There is no test-data cleanup to perform. Unrelated vault edits were preserved.

One clean successful Exchange, a matched isolated failure, old/new ticket validity, inventory, final credit/earnings reconciliation and bounded recovery after failure remain **Not run / deferred until equivalent owned test data exists**. Provider state and actual saved financial results are unverified. Memberships, Box Office, other Organizations and unrelated original orders are outside the observed failure scope; they have not been shown to share it. This investigation is not release sign-off.

## Results

| Check | Result | Evidence / exact point |
| --- | --- | --- |
| Sentry failure and repeated original item | Passed — investigation evidence confirmed | [[#Recorded evidence]]; seven events and matching source item |
| Adjustment's $3 imbalance | Failed — recorded backend operation; [[#BUG-01 — Exchange checkout fails for the affected family pass\|BUG-01]] | [[#Source explanation]]; adjustment save raises AssertionError |
| TC-01 — Locate original order | Not run | [[#TC-01 — Locate the affected original order without changing it\|TC-01]], steps 1–2; live Admin record not inspected |
| TC-02 — Manual reproduction | Blocked | [[#TC-02 — Reproduce the failed Exchange\|TC-02]], step 1; numeric split known, exact owned test-order preparation missing |
| TC-03 — Package summary cannot proceed | User-observed; cause inconclusive | [[#TC-03 — User's Package attempt stops at zero credit\|TC-03]], step 1 screenshot confirms zero credit and disabled Start exchange; step 2 needs original payment details |
| Financial difference in successful / failing sources | User-returned evidence confirmed | [[#Returned financial comparison — October 30, 2026]]; actual parent relationship and 3.00 combined-credit/fee difference |
| Older commit's arithmetic effect with returned values | Confirmed in selected source branches; recent full-flow regression unproven | [[#Comparison using the returned financial rows — executed October 30]]; 24 completed comparisons, exact Sentry discrepancy, no full checkout |
| Saved successful repeat-Package comparison | User-returned evidence; not independently rerun | [[#User-supplied successful comparison — Vancouver Outdoor Pools]]; Invoice chain 17759467 → 17789827 → 17805986; actual query range/timezone unconfirmed |
| Clean success, recovery and final saved money/tickets/stock | Not run | [[#Data safety, cleanup and remaining coverage]] |
