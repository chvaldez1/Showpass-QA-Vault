---
title: Required questions when accepting a ticket transfer
date: 2026-11-23
tags:
  - qa/test-cases
  - transfers
status: Published to Qase
---

# Required questions when accepting a ticket transfer

## Qase publication

TC-1 was published as [SPT-6025](https://app.qase.io/case/SPT-6025) in [Transfers (suite 1162)](https://app.qase.io/project/SPT?suite=1162) on 2026-11-23. Readback matched the approved case, including all nine steps and the Single parameter **QuestionScope** with **PerOrder** and **PerTicket**. The [[03 Test Cases/Group Sales and Transfers/SPT-6025 Transfer Acceptance Browser Run - 2026-11-23|browser run]] records the public PerOrder purchase and the requested Web Box Office PerTicket variation, including the expanded four-ticket partial-transfer checks.

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

## Proof and remaining work

| Proof target | Case proof | Execution |
| --- | --- | --- |
| Blank required question appears on the recipient’s form. | TC-1 steps 4–5 | PerOrder and PerTicket · Not run |
| The recipient can accept and see their own saved answer. | TC-1 steps 6–9 | PerOrder and PerTicket · Not run |

**Minimum execution set** · Two desktop-web runs, one per **QuestionScope**. Confirm the deployed builds include the change before running. If an expected screen is missing, record the last screen and any error.

Separate checks are needed for two-purchase conditional questions, edited question versions, historical **Other**, consent, and shipping. The backend test checks sender answer preservation. TC-1 checks the recipient’s answer.

## Sources reviewed

- [SPW-21449](https://showpass.atlassian.net/browse/SPW-21449) defines the purchased-question and recipient-answer requirements. [Frontend PR #8024](https://github.com/showpass/showpass-frontend/pull/8024) lists the proposed browser checks.
- Backend companion [PR #12542](https://bitbucket.org/showpass/web-app/pull-requests/12542), landed `42c035874a69f7ff65f3ba22b8dd1dfe034cc5e5` over `ef5a35b7d70e88b85a7ad37cc3a41dca355f917d`. The [transfer test](https://bitbucket.org/showpass/web-app/src/42c035874a69f7ff65f3ba22b8dd1dfe034cc5e5/apps/tickets/tests/api/venue/transfers/test_api_venue_based_ticket_transfer.py#lines-382) covers order and ticket answers, required validation, recipient readback, and preservation of the sender’s answer.
- Frontend PR comparison `e3be7d04ba1d90161f75f67543ae071fdc37762d` → `52f00849d8147862c4dcd1584fee10d0b39db8a0`. Local UI evidence was reviewed at squash commit `d54411c294c9896504cd11f5cec5ec3c96df5842` over `b4de0109da1068b5eed944e2101874a8494d2696`. The [recipient component test](https://github.com/showpass/showpass-frontend/blob/d54411c294c9896504cd11f5cec5ec3c96df5842/packages/core/src/app-contexts/public/features/checkout/components/checkout-accept-transfer/CheckoutAcceptTransfer.test.tsx#L1004-L1052) checks the blank input, required error, and separate acceptance action. [My Orders answer actions](https://github.com/showpass/showpass-frontend/blob/d54411c294c9896504cd11f5cec5ec3c96df5842/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/PostPurchaseQuestionActions/PostPurchaseQuestionActions.web.tsx#L65-L78) define the saved-answer controls.
- Setup and customer navigation were cross-checked against the [Showpass Order Form guide](https://help.showpass.com/hc/en-us/articles/4408550127255-Organizer-guide-Collecting-ticket-buyer-information-using-custom-questions), [transfer limit guide](https://help.showpass.com/hc/en-us/articles/44076428706711-Organizer-guide-Setting-ticket-transfer-limits), [sender guide](https://help.showpass.com/hc/en-us/articles/360023831873-Ticket-buyer-guide-How-to-transfer-tickets-or-products), and [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale#Transfer to a different Customer|Transfer to a different Customer]].
- Purchases and sender steps were verified in the [[03 Test Cases/Group Sales and Transfers/SPT-6025 Transfer Acceptance Browser Run - 2026-11-23|browser run]]. The recipient proof targets above are still **Not run**.
