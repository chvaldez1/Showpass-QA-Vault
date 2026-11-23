---
title: Partial ticket transfer pilot
date: 2026-11-23
status: Passed
tags:
  - browser-testing
  - qa/city
---

# Partial ticket transfer pilot

## Overview

The Organizer Builder saved and verified **QA Toronto Winter Market**, its General Admission ticket, and the required **Pickup note**. The Customer Tester bought four tickets in one Stripe test order, then sent three together. The sender's reopened order showed one pending transfer containing three tickets and one ticket still available.

- **Target** · Showpass beta, Organization **1859-qa-cad**, Venue ID `1859`, Codex in-app browser. Deployed revision unknown.
- **Readiness** · The user confirmed `enable_nextjs_order_form` and `enable_post_purchase_question_collection` are ON. The Dashboard showed Venue ID `1859`, Canadian Dollars, and **Ticket transfer limit** of `1` per ticket under **Enabled modules**.
- **Scope** · Purchase with realistic prices and verify the partial send in the sender's order. The pilot borrows the Order Form setup from [SPT-6025](https://app.qase.io/case/SPT-6025). The published case uses a one-ticket purchase and includes recipient acceptance.
- **Review** · QA Lead approved **Readiness Plan 1** for ordinary Dashboard reads, **Builder Plan 2** for the isolated Draft and its configuration, **Checkout Preparation Plan 3** for Hidden publication and reaching Payment, and **Plan 4** for the sandbox purchase and partial send. The Lead also approved Plan 4's billing-validation recovery.

## Test index

- [TC-01 Create and reopen the Event Draft](#tc-01-create-and-reopen-the-event-draft)
- [TC-02 Save and verify the General Admission ticket](#tc-02-save-and-verify-the-general-admission-ticket)
- [TC-03 Save and reopen the required question](#tc-03-save-and-reopen-the-required-question)
- [TC-04 Purchase four and transfer three](#tc-04-purchase-four-and-transfer-three)

## TC-01 Create and reopen the Event Draft

**Start here** · In the beta Dashboard for **1859-qa-cad**, open **Build → Create event**.

1. Choose **One event** and create **QA Toronto Winter Market** at the saved **CN Tower** location. Set December 19, 2026, 11 a.m. to 5 p.m. in **America/Toronto** and select **Fairs & Festivals**.

   **Expected:** The Draft opens in the Event editor under the selected Organization.

   **Actual — Passed:** **Basic info** opened with Event ID `650963` and **Draft** status. The Event header still showed **Draft** when **Tickets** was reopened. [Event editor](https://beta.showpass.com/manage/events/qa-toronto-winter-market/basic-info/)

## TC-02 Save and verify the General Admission ticket

**Start here** · Open **Tickets** on Event `650963`.

1. Use **Add ticket type** to add **General Admission** at CAD $15 with inventory of 20. Save, reopen **Tickets**, and open **Edit ticket type General Admission**.

   **Expected:** The row retains the price and inventory. The ticket permits a four-ticket order and electronic delivery with transfers enabled.

   **Actual — Passed:** The reopened row showed CAD $15.00 and inventory `20`. Ticket type `1631069` showed **Maximum purchase limit** `8`, **Electronic ticket** selected, and **Allow Ticket Transfers** on. The price is the ticket's face value. Checkout fees and taxes remain unverified.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-partial-transfer-pilot/saved-tickets.jpg" alt="Reopened Tickets page showing Draft status, CAD 15 General Admission and inventory 20" width="600" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-partial-transfer-pilot/saved-ticket-transfer-setting.jpg" alt="Delivery and transfers settings showing Allow Ticket Transfers on and Electronic ticket selected" width="600" style="max-width: 100%; height: auto;">

   Beta, November 23. Reopened ticket row and saved **Delivery & transfers** settings. [Tickets editor](https://beta.showpass.com/manage/events/qa-toronto-winter-market/ticket-types/)

## TC-03 Save and reopen the required question

**Start here** · Open **Order form** on Event `650963`.

1. With **Standard Info** selected, leave **Collect information after payment** and **Collect guest information per ticket** off. Use **Add field → Short text** to add required **Pickup note** for **General Admission**. Save and reload the page.

   **Expected:** The required order-level question is still present and collected before payment.

   **Actual — Passed:** The fresh Order form showed **Pickup note**, **Short text**, and **Required**. Both collection switches remained off.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-partial-transfer-pilot/saved-order-form.jpg" alt="Reopened Order form showing the required Pickup note and both collection switches off" width="600" style="max-width: 100%; height: auto;">

   Beta, November 23. Reloaded Order form for the Draft. [Order form](https://beta.showpass.com/manage/events/qa-toronto-winter-market/order-form/)

## TC-04 Purchase four and transfer three

**Start here** · As the Customer Tester, open the [Unlisted beta Event](https://beta.showpass.com/qa-toronto-winter-market/) from **View event** in the Organizer Dashboard.

1. In **Basic info → Discovery**, save **Visibility → Hidden** and reload. Use **Publish event → Publish now**, then verify the status and open **View event**.

   **Expected:** The Event is Unlisted and the direct link shows **Buy Tickets**.

   **Actual — Passed:** Hidden persisted after reload. Publishing opened **Overview** with **Unlisted** status and the direct page displayed **BUY TICKETS**.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-partial-transfer-pilot/unlisted-event.jpg" alt="Event 650963 shown as Unlisted and available from View event" width="600" style="max-width: 100%; height: auto;">

2. Select four General Admission tickets, answer **Pickup note**, and review the four-ticket subtotal of CAD $60 and displayed taxes and fees.

   **Expected:** Checkout shows the correct ticket quantity and final amount.

   **Actual — Passed:** Review showed four General Admission tickets at CAD $15 each. Ticket fee CAD $44.20, service fees CAD $24.56, GST CAD $4.04, HST CAD $7.64, and VAT CAD $7.36 totaled CAD $147.80 including the CAD $60 subtotal. **Pickup note** was required before Payment.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-partial-transfer-pilot/checkout-questions-and-total.jpg" alt="Checkout showing the Pickup note and CAD 147.80 total for four tickets" width="600" style="max-width: 100%; height: auto;">

3. Complete one authorized purchase. Reopen it in **My Orders** and verify four issued tickets.

   **Expected:** One order contains four General Admission tickets.

   **Actual — Passed:** The user approved the venue's test payment and the Refund Protection opt-out. The rendered card fields showed Stripe test mode. The first click stopped at missing billing address validation before payment. Using the approved Showpass test billing address cleared the error and retained the CAD $147.80 total. One sandbox payment completed at 11:44 a.m. MT. **My Orders** reopened order `0f-cabe-4b87-8f1f-5c2758a2f913` with four General Admission tickets.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-partial-transfer-pilot/sandbox-order-confirmed.jpg" alt="Confirmation for the sandbox order showing CAD 147.80" width="600" style="max-width: 100%; height: auto;">

   [Sender's order](https://beta.showpass.com/account/my-orders/0f-cabe-4b87-8f1f-5c2758a2f913/)

4. Open **Order Options → Transfer to a friend**. Select three of the four tickets and send them together to the authorized recipient. Reopen the sender's order.

   **Expected:** The three selected tickets are pending transfer and the fourth stays available to the sender.

   **Actual — Passed:** The confirmation screen showed **Confirm 3 items to transfer**. The send returned **Transfer In Progress**. After reload, **Ticket Transfers → View Details** showed **In Progress**, the designated recipient, and **View Items 3**, with a send time of 11:47 a.m. MT. Reopening **Transfer to a friend** showed one selectable General Admission ticket and three unavailable tickets awaiting transfer confirmation. The picker was closed without sending again.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-partial-transfer-pilot/saved-three-ticket-transfer.jpg" alt="Saved transfer marked In Progress and View Items 3 on the sender's order" width="600" style="max-width: 100%; height: auto;">

## Cleanup and handoff

The Unlisted Event, ticket type, sandbox order, and pending transfer are preserved for review. The browser is left on the sender's order. Recipient acceptance and inbox delivery are **Not run**.

## SPT-6025 parameter coverage

[SPT-6025](https://app.qase.io/case/SPT-6025) calls for two independent one-ticket orders, one for each `QuestionScope` value. Set **Collect guest information per ticket** before each purchase. In both runs, open the transfer as the recipient, click **Continue** with **Pickup note** blank to verify the required error, then enter a new answer, accept the transfer, and reopen the recipient's order to verify the answer.

| QuestionScope | Setting at purchase | What to verify | Case execution |
| --- | --- | --- | --- |
| PerOrder | **Off** | **Pickup note** appears under **Order questions** during acceptance and the recipient's answer appears in **Additional information** on their order. The four-ticket pilot used this setting and stopped with three tickets pending. | Not run |
| PerTicket | **On** | **Pickup note** appears under **Guest 1** during acceptance and the recipient's answer appears under **Guest 1** in **Additional information** on their order. | Not run |

## Results

| Check | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Event Draft | Passed | Saved one single-day Event under Venue `1859`. | [TC-01](#tc-01-create-and-reopen-the-event-draft) |
| General Admission ticket | Passed | CAD $15, inventory 20, maximum 8, electronic delivery, and transfers on. | [TC-02](#tc-02-save-and-verify-the-general-admission-ticket) |
| Required checkout question | Passed | Reopened required **Pickup note** for order-level collection before payment. | [TC-03](#tc-03-save-and-reopen-the-required-question) |
| Unlisted availability and checkout | Passed | Direct Event link opened checkout for four tickets at CAD $147.80. | [TC-04](#tc-04-purchase-four-and-transfer-three) |
| Purchase four tickets | Passed | One Stripe test order at CAD $147.80 issued four General Admission tickets. | [TC-04](#tc-04-purchase-four-and-transfer-three) |
| Send three and retain one | Passed | One saved pending transfer lists three tickets and the sender can still select the fourth. | [TC-04](#tc-04-purchase-four-and-transfer-three) |
