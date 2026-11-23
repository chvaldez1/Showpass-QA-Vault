---
title: SPT-6025 transfer acceptance browser run
date: 2026-11-23
tags:
  - browser-testing
  - transfers
---

# SPT-6025 transfer acceptance browser run

## Overview

Run one order-level transfer from public checkout and one per-ticket transfer from Web Box Office. The user revised the run to buy four tickets, transfer three, and retain one per order. The saved [SPT-6025](https://app.qase.io/case/SPT-6025) uses public checkout and one ticket for both parameter values. The larger quantities and Box Office purchase are variations requested for the browser run.

Both four-ticket sandbox purchases issued. The sender's orders show both three-ticket transfers complete and one ticket retained on each order. The original public order answer and the retained Box Office ticket's answer remained saved. The recipient's screenshots show three tickets on each received order, one saved public order note, and different notes on the first two Box Office guest records. The third Box Office answer and pre-acceptance validation remain unverified.

## Setup and review

- **Environment:** Beta in the Codex in-app browser. The deployed revision is unknown.
- **Records:** Organization `1859-qa-cad`, QA Toronto Winter Market Event `650963` and GA `1631069` for public checkout, QA Toronto Winter Market - Box Office Event `650965` and GA `1631072` for the staff retest. Both use CAD $15 face price. Recipient is `christian.valdez+89@showpass.com`.
- **Feature flags:** The user confirmed `enable_nextjs_order_form` and `enable_post_purchase_question_collection` are on for venue 1859. Dashboard readback showed the required **Pickup note** short-text question, with **Collect information after payment**, **Collect guest information per ticket**, and **Require box office information collection** off. The Event list showed **Hidden**.
- **Review:** The Release Engineer incorporated separate Backend Master and Frontend Master source reviews. The QA Lead approved Live Plan R2 for one-ticket purchases and Live Plan R3 for four-ticket purchases, three transferred and one retained on each order. R3 kept the original Event's save guard in place and approved a separate **Sellers only** Event for the Box Office purchase. The QA Lead approved Guided R4 for the recipient to perform the remaining checks in their own browser.

## Test index

- [TC-03 Four public tickets with an order question](#tc-03-four-public-tickets-with-an-order-question)
- [TC-04 Four Box Office tickets with per-ticket questions](#tc-04-four-box-office-tickets-with-per-ticket-questions)
- [TC-01 Earlier public one-ticket check](#tc-01-public-checkout-with-an-order-question)
- [TC-02 Earlier Box Office one-ticket check](#tc-02-web-box-office-checkout-with-a-per-ticket-question)

## TC-03 Four public tickets with an order question

1. From the [public QA Toronto Winter Market page](https://beta.showpass.com/qa-toronto-winter-market/), add four **General Admission** tickets. Continue to questions, enter `Sender pickup note`, and use the approved Stripe test card after verifying test mode.

   **Expected:** The four tickets share one **Pickup note** before payment. One completed sandbox sale issues four tickets.

   **Actual — Passed:** The order-level question appeared once. After user approval of the Refund Protection opt-out, the Calgary Showpass address suggestion populated the billing fields. The active Stripe form showed test mode. One CAD $147.80 submission completed and [the sender's order](https://beta.showpass.com/account/my-orders/c5-3c41-4ae2-925e-ba05e0feaee8/) offered four eligible GA tickets.

2. In that order, choose **Transfer to a friend**, select three tickets, and send to the designated recipient. Reopen **Ticket Transfers → View Details**, then reopen the transfer picker to check the remaining ticket and close without sending.

   **Expected:** **In Progress** shows three tickets. One of the four remains available to the sender.

   **Actual — Passed:** The order showed a three-ticket transfer at 12:37 p.m. MT. The transfer picker showed one eligible and three disabled GA tickets.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/four-ticket-public-send.jpg" alt="Three-ticket public transfer in progress" width="600" style="max-width: 100%; height: auto;">

3. Open the 12:37 p.m. MT transfer email as the designated recipient. Inspect **Order questions**, try **Continue** with the answer blank, enter `Recipient pickup note`, accept, and reopen **Additional information** from **View transfer**.

   **Expected:** One blank required field appears, **This field is required** blocks continuation, and the received order has three tickets and one saved answer. The fourth ticket stays with the sender.

   **Actual — Acceptance and saved answer verified:** The sender's order showed **Complete** and retained `Sender pickup note`. The user supplied the recipient receipt for order `5a-57b1-4211-802a-21aa5e5976ab`, created at 12:44 p.m. MT, with three General Admission tickets. The recipient's **Additional information → Event 1** showed one **Pickup note** with `hi hello welcome`. The pre-acceptance blank field and required error remain unverified.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/four-ticket-public-transfer-complete.jpg" alt="Sender order shows the three-ticket public transfer complete" width="480" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/public-recipient-receipt.png" alt="Recipient receipt with three public checkout tickets" width="600" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/public-recipient-pickup-note.png" alt="One saved pickup note in Event 1 on the received public order" width="600" style="max-width: 100%; height: auto;">

## TC-04 Four Box Office tickets with per-ticket questions

1. Clone the test Event in the same Organization. Verify the draft's independent ID, **Sellers only** visibility, CAD $15 digital GA with transfers enabled, and the copied required **Pickup note** assigned to that GA. In **Order form**, turn on **Collect guest information per ticket** and **Require box office information collection**, leaving **Collect information after payment** off. Save, reopen, then publish the isolated **Sellers only** Event for test sales.

   **Expected:** The new Event and cloned ticket are independently identifiable and staff can sell them with per-ticket collection on.

   **Actual — Passed:** [Event `650965`](https://beta.showpass.com/manage/events/qa-toronto-winter-market-box-office/overview/) and GA `1631072` were verified. The question applied to the copied GA, both collection switches were on after reopening, and the published Event displayed **Sellers only** and **Selling now**.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/four-ticket-box-office-form.jpg" alt="Saved per-ticket collection configuration on the separate Box Office Event" width="600" style="max-width: 100%; height: auto;">

2. Open **Operations → Box Office → Sell**, add four of the new Event's GA tickets, select the existing sender under **Search customer**, and open checkout. Under **Additional Info**, enter `Sender pickup note 1` through `Sender pickup note 4` in the four guest groups. Choose electronic ticket delivery, verify Stripe test mode, and submit once.

   **Expected:** Four separate guest questions appear before payment. The linked sender receives four tickets in one order.

   **Actual — Passed:** **Guest 1** through **Guest 4** each had a separate **Pickup note**. The approved Calgary suggestion worked and the staff card fields independently showed Stripe test mode. **Purchase completed** followed one CAD $147.80 submission. [The staff order](https://beta.showpass.com/account/my-orders/8e-4b5c-4952-ae2f-38dc1302a06c/) appeared in the sender's **My Orders** and offered four eligible GA tickets.

3. In that order select and send three tickets, verify **In Progress** in **Ticket Transfers → View Details**, and verify the fourth is available without sending it.

   **Expected:** Three transferred tickets appear in the pending transfer and just one remains eligible.

   **Actual — Passed:** The pending transfer at 12:39 p.m. MT contained three tickets. The transfer picker showed one eligible and three disabled GA tickets.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/four-ticket-box-office-send.jpg" alt="Three-ticket Box Office transfer in progress" width="600" style="max-width: 100%; height: auto;">

4. Open the 12:39 p.m. MT transfer email as the designated recipient. Inspect **Guest 1–3**, enter `Recipient pickup note 1` and `Recipient pickup note 2`, leave **Guest 3** blank, and click **Continue**. Complete the third distinct answer, accept, and reopen **Additional information** from **View transfer**.

   **Expected:** Three separate blank required questions and no **Guest 4**. The unfinished third question blocks continuation. The received order has three tickets with the correct separate answers. The sender's fourth ticket remains on the sender order.

   **Actual — Acceptance verified, saved answers partially verified:** The sender's order reopened with the exact three-ticket transfer **Complete**. The retained **Guest 4** still showed `Sender pickup note 4`. The user supplied the recipient receipt for order `62-2354-4bbf-bce8-cff1f7510407`, created at 12:42 p.m. MT, with three General Admission tickets. In the user's **Additional information** screenshot, **Guest 1** showed `hi`, **Guest 2** showed `hello`, and the **Guest 3** section was visible above the fold. Its **Pickup note** was below the visible portion. The pre-acceptance blank fields and required error remain unverified. The report records the visible answers without copying the attachment containing recipient contact fields.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/four-ticket-box-office-transfer-complete.jpg" alt="Sender order shows the three-ticket Box Office transfer complete" width="480" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/four-ticket-box-office-sender-retained-answer.jpg" alt="The sender's retained Guest 4 pickup note after transfer" width="600" style="max-width: 100%; height: auto;">

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/box-office-recipient-receipt.png" alt="Recipient receipt with three Box Office tickets" width="600" style="max-width: 100%; height: auto;">

## TC-01 Public checkout with an order question

1. On the unlisted public Event page, select **Buy Tickets**, add one **General Admission** ticket, and continue to the order questions.

   **Expected:** A required order-level **Pickup note** appears before payment.

   **Actual — Passed:** Checkout displayed one **General Admission** line and the order-level **Pickup note** field. Entered `Sender pickup note` and reached payment with a CAD $36.95 basket.

2. Complete the approved Stripe test checkout once and reopen the new order in **My Orders**.

   **Expected:** The sender's order contains one issued General Admission ticket.

   **Actual — Passed:** The user approved the Refund Protection opt-out. The active Stripe card fields reported test mode. One CAD $36.95 sandbox order completed and [the sender's public order](https://beta.showpass.com/account/my-orders/47-329a-4f96-90c4-ddc346cc8af9/) reopened with one issued electronic GA ticket.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/public-refund-choice.jpg" alt="Refund Protection choice on the public test checkout" width="600" style="max-width: 100%; height: auto;">

3. In **My Orders**, use **Transfer to a friend** to send the new ticket to the authorized recipient. As the recipient, open the transfer email and check **Order questions**. Try **Continue** with the field blank, then enter `Recipient pickup note`, accept, and reopen **View transfer → Additional information → Edit answers** or **View answers**.

   **Expected:** **Transfer In Progress**, followed by a blank **Pickup note**, **This field is required**, **Transfer complete**, and the recipient's saved answer under **Additional information**.

   **Actual — Sender passed, recipient not run:** The sender reopened **Ticket Transfers → View Details** and confirmed one ticket to the designated recipient, **In Progress**, at 12:23 p.m. MT. The recipient sign-in and link are needed before checking the question.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/public-transfer-in-progress.jpg" alt="Public purchase transfer in progress" width="600" style="max-width: 100%; height: auto;">

## TC-02 Web Box Office checkout with a per-ticket question

1. In **Order form**, enable **Collect guest information per ticket** and **Require box office information collection**, save, and reopen. Use temporary **Sellers only** Event visibility if needed for staff sale.

   **Expected:** Existing **Pickup note** remains required before payment. The Event and GA ticket are sellable in Web Box Office.

   **Actual — Passed:** Saved **Sellers only** and reopened the Order form with **Collect guest information per ticket** and **Require box office information collection** on, **Collect information after payment** off, and **Pickup note** required. **Operations → Box Office → Sell** offered the Event and General Admission.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/box-office-question-setup.jpg" alt="Required question settings saved for the Box Office purchase" width="600" style="max-width: 100%; height: auto;">

2. Add one GA ticket, use **Search customer** to select the exact existing sender, and continue to **Additional Info**. Enter `Sender pickup note` under **Guest 1**. Verify the staff card form is Stripe sandbox, submit once, and find the issued ticket in the sender's **My Orders**.

   **Expected:** The per-ticket question appears before payment and the sender owns one newly issued ticket.

   **Actual — Passed:** Selected the exact sender from the staff customer search. **Additional Info → Guest 1** showed **Pickup note** before payment. The Calgary Showpass address appeared in billing autocomplete after typing `showpass`. The active Box Office card fields independently reported Stripe test mode. **Purchase completed** followed one CAD $36.95 submission. [The sender's Box Office order](https://beta.showpass.com/account/my-orders/50-b8e4-42a3-b429-4ffd87cc60b5/) was found in **My Orders** with one ticket.

3. Transfer that ticket to the authorized recipient and perform the same blank-field, required validation, acceptance and readback steps as TC-01.

   **Expected:** The blank question and the saved recipient answer both appear under **Guest 1**.

   **Actual — Sender passed, recipient not run:** The sender reopened **Ticket Transfers → View Details** and confirmed one ticket to the designated recipient, **In Progress**, at 12:26 p.m. MT. The recipient sign-in and link are needed before checking **Guest 1**.

   <img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/box-office-transfer-in-progress.jpg" alt="Box Office purchase transfer in progress" width="600" style="max-width: 100%; height: auto;">

## Postconditions and cleanup

The four-ticket orders, transfers and isolated Box Office Event were kept for review. The earlier one-ticket orders and transfers were kept for reference. The original four-ticket pilot order and its transfer were untouched.

The Order form restore was submitted, but a reload occurred before confirmation. The reopened form showed both question settings back off. The Dashboard continued to report **The save outcome could not be confirmed** after **Check save status**, and disabled **Save changes**. Event visibility still displayed **Sellers only**. Resolve the Dashboard's save status before changing visibility back to **Hidden**.

<img src="../../99%20Archive/QA%20Evidence/Transfers/2026-11-23-spt-6025/event-restore-save-unconfirmed.jpg" alt="Dashboard warning that the Event restore save could not be confirmed" width="600" style="max-width: 100%; height: auto;">

## Results

| Check | Result | Evidence or remaining action |
| --- | --- | --- |
| [TC-03 Public checkout, four tickets, PerOrder](#tc-03-four-public-tickets-with-an-order-question) | Transfer and saved answer verified | Three tickets received and one order-level note saved. Pre-acceptance validation remains unverified. |
| [TC-04 Web Box Office, four tickets, PerTicket](#tc-04-four-box-office-tickets-with-per-ticket-questions) | Transfer verified, answer checks partial | Three tickets received. Guest 1 and Guest 2 show different notes. Guest 3's answer and pre-acceptance validation remain unverified. |
| [TC-01 Public checkout, one ticket, PerOrder](#tc-01-public-checkout-with-an-order-question) | Sender passed, recipient not run | Sent one at 12:23 p.m. MT. Superseded by the four-ticket run. |
| [TC-02 Web Box Office, one ticket, PerTicket](#tc-02-web-box-office-checkout-with-a-per-ticket-question) | Sender passed, recipient not run | Sent one at 12:26 p.m. MT. Superseded by the four-ticket run. |
| Event settings restoration | Partially verified, visibility blocked | Reopened Order form showed both question settings off. The Dashboard still blocked additional edits and the Event displayed **Sellers only**. |
