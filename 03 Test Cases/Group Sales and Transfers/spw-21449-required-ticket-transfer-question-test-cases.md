---
title: Required questions when accepting a ticket transfer
date: 2026-11-23
tags:
  - qa/test-cases
  - transfers
status: TC-1 published to Qase. TC-2 local draft, not run.
---

# Required questions when accepting a ticket transfer

## Qase publication

TC-1 was published as [SPT-6025](https://app.qase.io/case/SPT-6025) in [Transfers (suite 1162)](https://app.qase.io/project/SPT?suite=1162) on 2026-11-23. Readback matched the approved case, including all nine steps and the Single parameter **QuestionScope** with **PerOrder** and **PerTicket**. The [[03 Test Cases/Group Sales and Transfers/SPT-6025 Transfer Acceptance Browser Run - 2026-11-23|browser run]] records the public PerOrder purchase and the requested Web Box Office PerTicket variation, including the expanded four-ticket partial-transfer checks.

TC-2 is a local draft for a question renamed after purchase. Its execution is **Not run**. [[03 Test Cases/Events/02 Manage/05 Order form|Event Order form cases]] · [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale#Transfer to a different Customer|Transfer testing guide]]

## Testing intent and scope

When a customer accepts a ticket transfer, a required question from the original checkout must appear blank. The recipient has to answer it, and Showpass must save the answer on the recipient’s order or ticket.

- **Risk** · Customer data and order completion.
- **Scope** · Desktop web, one ticket per run. One run collects the answer for the order and one collects it for the ticket.
- **Confidence** · High for the reviewed source. The deployed build, venue flags, and browser result are unverified.

## Manual case

### TC-1: Required question on ticket transfer acceptance

**Title:** Web Public - Transfers - Require a new answer to a checkout question

**Description:** The recipient sees a blank **Pickup note**, must fill it in to continue, and can read their answer on the transferred order. Run once for each setting with a new purchase and transfer.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| QuestionScope | Collect guest information per ticket | Where Pickup note appears |
| --- | --- | --- |
| PerOrder | Off | **Order questions** during acceptance and **Additional information** on the received order. |
| PerTicket | On | **Guest 1** during acceptance and under **Guest 1** within **Additional information** on the received order. |

**Parameters:**
QuestionScope: PerOrder, PerTicket

**Preconditions:**

**Environment and accounts**

* Use an Event reserved for these test orders and the Organization’s approved test payment method.
* Confirm both feature flags are **ON** for the transfer venue and recipient request: `enable_nextjs_order_form` and `enable_post_purchase_question_collection`.
* The Organizer preparing the Event has **Manage Events** permission.
* The sender is a signed-in customer with a verified phone number.
* The recipient has a separate customer account and can open the inbox for that account’s email address.

**Event and Order Form**

* In **Build → All events**, open a published Event with a digital ticket type on sale and available for immediate delivery.
* In the ticket type’s **Delivery** tab, confirm **Allow Ticket Transfers** is on.
* In **Organization Info → Ticketing → Ticket transfers**, confirm **Ticket transfer limit** is at least `1`.
* In the Event’s **Order Form**, select **Standard info** and use the settings below. Save before placing the order.

| Setting | Value |
| --- | --- |
| Collect guest information per ticket | Use the value for the selected **QuestionScope**. |
| Collect information after payment | Off |
| Add field | **Short text** |
| Title | `Pickup note` |
| Required | On |
| Ticket type applicability | Select the digital ticket type for this check. |

**Starting order**

* As the sender, buy one ticket from the public Event page. Enter `Sender pickup note` at checkout.
* Record the order reference. Use the new ticket from **My Orders** before it is scanned or transferred.

**Tags:** public, transfers, custom-questions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the sender, open **Orders → My Orders**. On the recorded order, choose **Order Options → Transfer to a friend**. | Sender’s order reference | The dialog lists the Event ticket. |
| Select the ticket and click **Continue**. |  | **Recipient Email** appears. |
| Enter the recipient’s email and click **Send Transfer**. | Email of the second customer account | **Transfer In Progress** appears. |
| Sign in as the recipient and open the link in the transfer email. |  | **A few details are needed** shows a blank **Pickup note** in the section for the selected **QuestionScope**. |
| Click **Continue** with **Pickup note** blank. |  | **This field is required** appears on the same screen. |
| Fill in **Pickup note** and click **Continue**. | `Recipient pickup note` | **Accept transfer** opens. |
| Select any required consent shown and click **Accept transfer**. |  | **Transfer complete** appears. |
| Click **View transfer**. |  | The recipient’s order shows one ticket for the Event and an **Additional information** section. |
| Under **Additional information**, click **Edit answers** or **View answers**. |  | **Pickup note** shows `Recipient pickup note` in the section for the selected **QuestionScope**. |

**Postconditions:**

* Close **Additional information** without saving changes.
* Record the sender’s and recipient’s order references. Keep the completed transfer and both orders for review.

### TC-2: Keep the purchase-time question after an Organizer renames it

**Title:** Web Public - Transfers - Keep the question shown at purchase after an edit

**Description:** An Organizer renames a required checkout question after a ticket is purchased. The recipient must answer the question from the original purchase and can read their own saved answer on the new received order.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

**Environment and accounts**

* Use an isolated test Event and the Organization’s approved test payment method. Obtain confirmation from the setup owner that `enable_nextjs_order_form` and `enable_post_purchase_question_collection` are **ON** for the transfer Venue and recipient request.
* Use an Organizer with **Manage Events**, a signed-in sender with a verified phone number, and a separate signed-in recipient with access to the inbox for their account email.

**Event and Order form**

* In Dashboard, go to **Build → Events → All events**, open the test Event and confirm it is published with one regular digital ticket type on sale for immediate delivery. In that ticket type’s **Delivery** tab, confirm **Allow Ticket Transfers** is on.
* On the same Event, open **Manage → Advanced options**. Under **Ticket transfers**, confirm **Transfer limit setting** is **Use organization setting** and the displayed Organization transfer limit is at least `1`.
* Open the Event’s **Manage → Order form**. Under **Information collection**, select **Add field → Short text**, set the values below, then use the page’s **Save** and reopen **Order form** before the purchase.

| Setting | Value |
| --- | --- |
| Collection type | **Standard info** |
| Collect guest information per ticket | Off |
| Collect information after payment | Off |
| Short text | Create one field. Enter `Pickup note at purchase` in **Title** and turn **Required** on. Under **Ticket type applicability**, select the test digital ticket type. |

**Starting order**

* As the sender, buy one ticket on the public Event page. Confirm checkout shows **Pickup note at purchase** and enter `Sender pickup note` before completing the order.
* Record the original order reference. Use its unscanned ticket. Keep the transfer unsent until the rename has been saved and verified.

**Tags:** public, transfers, custom-questions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the Organizer, open the same Event’s **Manage → Order form**. In **Information collection**, select the pencil icon (**Edit field**) on **Pickup note at purchase**. | Same Event as the original order | The question editor shows `Pickup note at purchase` in **Title**. |
| Change only **Title** and click the page’s **Save**. | `Pickup note for new sales` | The Order form saves. |
| Leave and reopen **Order form**. Select **Edit field** on the renamed question. | Same Event | The form shows one custom question titled **Pickup note for new sales**. In its editor, **Required** remains on and **Ticket type applicability** still has the test ticket type selected. |
| As the sender, open **Orders → My Orders**. On the original order, choose **Order Options → Transfer to a friend**. | Original order reference | The dialog lists the one original ticket. |
| Select that ticket and click **Continue**. | | **Recipient Email** appears. |
| Enter the recipient account’s email and click **Send Transfer**. | Recipient’s test email | **Transfer In Progress** appears for the original ticket. |
| In the separate recipient account, open the transfer link from that account’s inbox. | Invitation for this Event and ticket | **A few details are needed → Order questions** shows **Pickup note at purchase** with an empty field. **Pickup note for new sales** is absent. |
| Click **Continue** with the field blank. | | **This field is required** appears and the details screen stays open. |
| Enter the recipient’s answer and click **Continue**. | `Recipient pickup note` | **Accept transfer** opens. |
| Select any required consent shown and click **Accept transfer**. | | **Transfer complete** appears. |
| Click **View transfer** on **Transfer complete**. Record the received order reference. | Original order reference for comparison | The received order has a different reference, contains one ticket for the Event and shows **Additional information**. |
| Under **Additional information**, click **Edit answers** or **View answers**. | | **Pickup note at purchase** shows `Recipient pickup note`. **Pickup note for new sales** is absent. |

**Postconditions:**

* Close **Additional information** without saving. Record both order references and keep the test orders for review.
* In the Organizer session, restore the field title to `Pickup note at purchase`, select **Save**, then leave and reopen **Order form** to verify the restored title.

## Proof and remaining work

| Proof target | Case proof | Execution |
| --- | --- | --- |
| Blank required question appears on the recipient’s form. | TC-1 steps 4–5 | PerOrder and PerTicket · Not run |
| The recipient can accept and see their own saved answer. | TC-1 steps 6–9 | PerOrder and PerTicket · Not run |
| A saved Organizer edit leaves the prior question in force for transfers of tickets already purchased. | TC-2 verifies the edit before sending and checks the old prompt, required validation and recipient readback. | Local draft · Not run |

**Minimum execution set** · Run TC-1 twice on desktop web with a fresh one-ticket order each time. Set **Collect guest information per ticket** off for **PerOrder** and on for **PerTicket**. Save and reopen the Order Form to verify the setting before each purchase. Hand off the pending transfer to the recipient assignment. In both runs, verify the blank **Pickup note**, the required error on **Continue**, successful acceptance and the recipient’s own answer in the section specified for that parameter. Run TC-2 once with a separate one-ticket order purchased before the Organizer rename.

Confirm the deployed builds include the change before running. If an expected screen is missing, record the last screen and any error.

[SPT-5134](https://app.qase.io/case/SPT-5134) covers venue consent and [SPT-3367](https://app.qase.io/case/SPT-3367) checks whether the recipient is asked for a shipping address. TC-2 covers a renamed required question on one prior order. The backend test checks sender answer preservation.

| Additional transfer proof | Existing source checks | What a manual case needs |
| --- | --- | --- |
| One transfer includes tickets from two purchases with different conditional forms. | Backend `test_claim_response_requirements__shared_conditional_question__uses_each_purchased_controller` verifies that the follow-up answer reaches only the ticket whose purchased form required it. The frontend test `submits separate answers for two valid purchased versions of an order question` verifies independent submission. | A supported sender path that selects tickets from two prior orders in one transfer. The reviewed My Orders workflow starts in one order. |
| A historical **Other** checkbox reveals and requires **Please specify**. | Backend `test_claim_response_requirements__legacy_checkbox_condition__persists_required_follow_up` seeds a historical form and verifies validation and recipient persistence. The frontend acceptance test at `CheckoutAcceptTransfer.test.tsx:1756` checks the recipient form with that saved condition. | An approved transferable paid order with the historical condition already saved. A new question entered with current controls does not establish that fixture. |

The [[05 Tooling/qasectl#Read-Only Bulk Search Workflow|read-only Qase scan]] retrieved all 2,492 reported SPT case definitions across 25 pages by 00:36 UTC on 2026-11-27. Searching titles, descriptions, tags, prerequisites, parameters and steps for transfer or claim terms paired with question, form, guest detail or snapshot terms returned 18 candidates. Fifteen were Wallet cases. SPT-3947 checks Refund Protection, SPT-5291 checks editing after a ticket is inactive, and SPT-6025 checks acceptance with an unchanged question. The comparison also reviewed SPT-3261 for the question edit and new checkout, SPT-3366 for the standard transfer, SPT-3367 for shipping and SPT-5134 for consent. It found no saved case that renames the question after purchase and verifies that the recipient still sees the original question. [SPT-3261](https://app.qase.io/case/SPT-3261) · [SPT-6025](https://app.qase.io/case/SPT-6025)

**Draft review, 2026-11-26.** Customer Tester owned TC-2 with Organizer Tester support. The Backend Master and Frontend Master verified the expected behavior and controls from source. The Release Engineer reconciled the reviews, Qase Police approved the standalone fields, and the QA Lead marked the written case **Ready to use**. The local Qase parser accepted all 12 steps. Execution is **Not run**.

## Sources reviewed

- [SPW-21449](https://showpass.atlassian.net/browse/SPW-21449) defines the purchased-question and recipient-answer requirements. [Frontend PR #8024](https://github.com/showpass/showpass-frontend/pull/8024) lists the proposed browser checks.
- Backend companion [PR #12542](https://bitbucket.org/showpass/web-app/pull-requests/12542), landed `42c035874a69f7ff65f3ba22b8dd1dfe034cc5e5` over `ef5a35b7d70e88b85a7ad37cc3a41dca355f917d`. The [transfer test](https://bitbucket.org/showpass/web-app/src/42c035874a69f7ff65f3ba22b8dd1dfe034cc5e5/apps/tickets/tests/api/venue/transfers/test_api_venue_based_ticket_transfer.py#lines-382) covers order and ticket answers, required validation, recipient readback, and preservation of the sender’s answer.
- Frontend PR comparison `e3be7d04ba1d90161f75f67543ae071fdc37762d` → `52f00849d8147862c4dcd1584fee10d0b39db8a0`. Local UI evidence was reviewed at squash commit `d54411c294c9896504cd11f5cec5ec3c96df5842` over `b4de0109da1068b5eed944e2101874a8494d2696`. The [recipient component test](https://github.com/showpass/showpass-frontend/blob/d54411c294c9896504cd11f5cec5ec3c96df5842/packages/core/src/app-contexts/public/features/checkout/components/checkout-accept-transfer/CheckoutAcceptTransfer.test.tsx#L1004-L1052) checks the blank input, required error, and separate acceptance action. [My Orders answer actions](https://github.com/showpass/showpass-frontend/blob/d54411c294c9896504cd11f5cec5ec3c96df5842/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/PostPurchaseQuestionActions/PostPurchaseQuestionActions.web.tsx#L65-L78) define the saved-answer controls.
- Setup and customer navigation were cross-checked against the [Showpass Order Form guide](https://help.showpass.com/hc/en-us/articles/4408550127255-Organizer-guide-Collecting-ticket-buyer-information-using-custom-questions), [transfer limit guide](https://help.showpass.com/hc/en-us/articles/44076428706711-Organizer-guide-Setting-ticket-transfer-limits), [sender guide](https://help.showpass.com/hc/en-us/articles/360023831873-Ticket-buyer-guide-How-to-transfer-tickets-or-products), and [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale#Transfer to a different Customer|Transfer to a different Customer]].
- The [[03 Test Cases/Group Sales and Transfers/SPT-6025 Transfer Acceptance Browser Run - 2026-11-23#Results|browser run]] recorded three tickets received in each four-ticket variation. The public order-level answer and the first two Box Office guest answers were verified. Pre-acceptance required validation and the third Box Office guest answer remain unverified. TC-1’s saved one-ticket parameter runs remain incomplete.
- TC-2 uses the paid ticket group’s saved form and the recipient order’s answer copy. Backend `b8dcfa8726db` in `apps/tickets/services/transfers/transfer_response_requirements.py:413`, `apps/tickets/services/transfers/recipient_questions.py:41` and `apps/tickets/services/transfers/transfer_service.py:890`. Frontend `5867dd39dcde` in `EventOrderFormPage.web.tsx:380`, `CheckoutAcceptTransferRequirements.web.tsx:56`, `CheckoutAcceptTransfer.web.tsx:582` and `PostPurchaseQuestionActions.web.tsx:65`.
