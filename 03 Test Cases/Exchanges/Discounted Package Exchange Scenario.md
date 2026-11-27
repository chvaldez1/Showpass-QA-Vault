---
title: Discounted Package Exchange Scenario
tags:
  - qa/scenario
  - exchanges
status: Scenario design. Not run.
---

# Discounted Package Exchange Scenario

Use this scenario to answer two questions. Can the Organizer build a festival that sells a discounted Package with different guest details for each Event? Can the intended Customer exchange that Package and still have the correct tickets, money and access? Pick the Venue and supported paths before assigning a live build. [[03 Test Cases/Test Cases by Feature|Feature index]] · [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes#Start with the setup and follow the records|Connected scenario design]]

## Start with the Organizer build

Use an isolated test Venue and future Events. The names and quantities below are reusable example data. The Organizer Builder owns the saved configuration and stops after verifying it.

| Existing dependency | Build or verify | What this lets the next tester distinguish |
| --- | --- | --- |
| Venue and employee permissions | Confirm the intended purchase and exchange clients, test payment, allowed exchange path, effective exchange deadline for each Event, and any feature or configuration gates. | A missing action caused by setup versus an order that the rule actually excludes. |
| Child Events and ticket types | Create two separate Events, **Friday Night Show** and **Saturday Workshop**. Give each a ticket type for the Package. Add a separate regular admission type on Friday with its own inventory. | A missing Saturday ticket, a child on the wrong occurrence, or an unrelated regular ticket changed by the exchange. |
| Package parent and schedule | Create **Festival Weekend Pass** on its parent Event. Set up one Friday child and two Saturday children per pass. Record the parent price, applicable allocation, inventory, availability and barcode mode. Keep eligible replacement stock on a supported occurrence. | The original order must contain the promised children and no unintended extras. Inventory and admission can be checked by Event after exchange. |
| Discount and attendee details | Use a percentage discount only if its saved scope applies to this Package. Keep the regular ticket outside that scope for the control. Set substantially different test guest answers per Event where the Order form and Package support it. | A discount leaking to the regular ticket, incorrect allocation to a child, or one guest’s answer copied onto another child. |
| People and ownership | Prepare a controlled signed-in buyer with an unrelated order and two distinct attendees. For staff checkout, choose a Customer explicitly and record whose account can use the intended Exchange action. | The correct Customer owns the original order, credit and replacement. Attendee names, employee login and order ownership are distinct. |

Open each edited record fresh. Hand off the Venue, Event and ticket references, Package composition, saved discount scope, effective exchange cutoff, available inventory, pricing inputs, guest collection mode and Customer choice. If a combination does not save or cannot be reached in the selected client, record where it stops before scheduling a purchase. [[03 Test Cases/Events/event-management-qase-test-cases|Event setup cases]] · [[03 Test Cases/Events/03 Promote/03 Packages|Package cases]] · [[03 Test Cases/Discounts/itemized-partial-apply-to-each-split-test-cases|Discount allocation cases]] · [[03 Test Cases/Events/02 Manage/05 Order form|Order form cases]]

## Follow one order through each decision

| Path | Actor and record | Proof that would catch a failure |
| --- | --- | --- |
| Purchase the prepared setup | Customer Tester using the prepared signed-in buyer on Public Web, or Box Office Tester if the sale is explicitly for a selected Customer and the staff flow supports the Package. The purchase creates the original order. | Match the Package and every issued child to its Event, ticket type and guest answer. Match the original paid total, discount and regular ticket line. Reopen the order and confirm the Customer. |
| Check Exchange eligibility | Start from that original order, with the assigned Customer in **My Orders** or an eligible employee in **Transactions**. Use the applicable exchange implementation for that client. | Confirm the whole Package selection and test an attempt to select only a child when the applicable itemized path supports the control. Check effective cutoff, status and eligibility for the exact items. If the chosen path is blocked, verify that the paid order and inventory remain intact and that there is no unintended temporary credit or replacement order. |
| Change who owns the order | In Web Box Office, confirm that an otherwise equivalent account-backed invoice opens the itemized Exchange quote for the same Venue and employee. Use a separate invoice for a controlled phone-only Customer with no linked Showpass account, invoice user or email that resolves to an account. | Verify an ownership-specific rejection and confirm that the original order and its ticket rights remain intact. Neither the Customer nor the employee receives exchange credit or a replacement order. If the action is missing and the reason cannot be verified, record the result as inconclusive. |
| Finish a supported Exchange | Use the original invoice and its authorized exchange credit to complete the replacement purchase. | Reconcile the credit against the saved discounted lines, eligible taxes or fees and any payment difference. Reopen both orders. Check the right Customer, exact new child tickets, original affected tickets, the untouched regular ticket and unrelated order, and inventory for every affected Event. Check admission on a timed test fixture and compare reporting when in scope. |
| Cancel or hit an eligibility limit | Use an independent order for a cancellation, expired window, or a change in original-ticket state. | Record the expected eligibility outcome from source. Verify the status of the original rights and any temporary credit or held stock after the supported cancellation or expiry. |

## What the available cases prove

[SPT-1287](https://app.qase.io/case/SPT-1287) follows a Package exchange through replacement and seat state. [SPT-4043](https://app.qase.io/case/SPT-4043) covers whole-package selection and the individual-child restriction for its itemized setup. [SPT-4059](https://app.qase.io/case/SPT-4059) covers credit and untouched tickets for a percentage discount on ordinary tickets. [SPT-5755](https://app.qase.io/case/SPT-5755) exercises phone-only staff Customer matching, including profiles without an attached Showpass account. The exact Package, discount, and unusual Customer combination needs its own paired proof on the selected Venue and client. **Not run.**

Backend `base_exchange_validation.py:120` checks ticket status, Venue, deadline and payment. `credit_generation.py:267` calculates credit from the original invoice for the selected tickets. `resolve_user_for_exchange` in `utils.py:196` checks the order’s owner before the Web Box Office itemized path can create credit. Frontend `ExchangeTicketItemSelect.web.tsx` and `useExchangeTicketItemModal.ts` use the purchased items in the order to determine what appears in the itemized flow. These are source findings. [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges#3. Exchange another order|Exchange testing guide]] · [[03 Test Cases/Box Office/Box Office Test Cases|Box Office cases]]

## Draft cases

### TC-1: Quote only the paid value of a discounted Package in a mixed order

**Title:** Web Public - Exchanges - Quote only the discounted Package from a mixed order

**Description:** A Customer owns one discounted multi-Event Package and a separate full-price ticket on the same order. The itemized exchange quote uses the Package’s paid value and includes only the selected ticket group.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* In an isolated Venue, have the setup owner confirm public itemized Exchanges, the itemized invoice path for all purchased items, and that both original Events are within the applicable Exchange window. Use a controlled signed-in Customer with no existing exchange credit and an approved test card.
* Use the setup owner's prepared sellable records below and record their public purchase pages. Confirm the Package and control ticket can be added to one Public Web basket. Use digital, unscanned tickets, no fees, taxes, protection or other credits on these items and no single-barcode redemption. Confirm the saved Package composition and discount scope before purchasing.

| Prepared record | Required value |
| --- | --- |
| Original Package | A preset parent **Weekend Pass**, $40.00. It includes one digital ticket from **Friday Show** and one from **Saturday Show**, two distinct child Events. |
| Control ticket | A separate regular **Friday Extra** ticket, $15.00. It is not an included child and is outside the discount's scope. |
| Discount | A $10.00 fixed **Apply to each** discount scoped only to the original parent Ticket Type. Verify it applies once. |

* From Public Web, complete one purchase of the original Package and control ticket in one basket. Confirm the order shows a $10.00 discount on the Package, $15.00 for the regular ticket, and $45.00 total paid. Record the order reference, the two original included tickets, and the separate regular ticket. Keep all three unscanned and active.

**Tags:** public, packages, exchanges

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the same Customer, open **Orders → My Orders**, open the recorded order and select **Order Options → Exchange items**. | Original order | The exchange opens for this order. |
| Select **Continue** and inspect the selection. | Original Package and Friday Extra | The Package is selectable as a group. Its two children cannot be selected separately. Friday Extra is listed separately. |
| Select only the Package and select **Continue** with the selection count. | Leave Friday Extra unselected | The summary shows **Exchange credit** of $30.00 for the selected Package. Friday Extra is absent from the selection. |
| Select **Close** before **Start exchange**, then reopen the original order. | Original order reference | The original two Package tickets and Friday Extra remain active. No exchange is in progress. |

**Postconditions:** Keep the original order and record the exact included and untouched ticket identities without saving their barcodes. Stop at the quote. If a standard whole-order dialog opens, record that the required itemized fixture was unavailable and do not start an exchange.

## Proof and sources

**Status:** Local Customer Tester draft with Organizer Tester support. **Not run.** SPT-1287 covers configured Package exchanges, SPT-4043 verifies itemized Package selection, and SPT-4059/4868 cover selected discounted regular ticket values. This case checks the quote for the discounted Package group and an original regular ticket on one invoice. To extend to completed replacement, first confirm that the itemized flow offers the prepared same-Venue replacement Package and that its eligible $30.00 payable amount can be paid by the selected order’s exchange credit. See [[03 Test Cases/Packages/Packages QA Library|Package setup and controls]] and [[03 Test Cases/Financials/Financials QA Library|Package refund and reporting coverage]].

Backend `apps/financials/tests/services/revenue_realization/test_revenue_realization_cross_adds.py:348` demonstrates the parent-scoped flat discount and separate Package child lines. The itemized path validates invoice eligibility in `base_exchange_validation.py:249`, builds credit from selected ticket rows in `credit_generation.py:267`, and validates credit usage against the replacement in `credit_usage_validation.py`. Frontend `OrderOptionsList.web.tsx:377` exposes **Exchange items**. `ExchangeTicketItemSelect.web.tsx:50`, `ExchangeTicketItemSummary.web.tsx:268`, and `useExchangeTicketItemModal.ts:1329` show Package grouping, credit and **Start exchange**. Validate the stated fixture before using the combined flow.
