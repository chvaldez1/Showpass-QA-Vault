---
title: Customer and Venue email language
tags:
  - qa/manual-cases
  - orders
status: draft
---
# Customer and Venue email language

**Owner:** Customer Tester, with Organizer and Box Office support. **Execution: Not run.** These are local case drafts. Use an isolated Showpass QA environment with working email delivery to tester-controlled inboxes.

**Start with these three runs.** TC-1 `CheckoutLanguage: French` checks the Customer’s purchase email. TC-4 `StaffResend: EmployeeChoice` checks the employee’s English resend on a French order. TC-6 `VenueLanguage: French` checks the French Venue’s inbox after a Customer writes in English. The remaining rows cover the reverse direction, defaults, recovery and scheduled delivery.

## Customer checkout and Account

### TC-1: Deliver the purchase confirmation in the final checkout language

**Title:** Public Checkout - Order emails - Use the Customer’s final website language

**Description:** Change the website language after adding a ticket. The confirmation should use the language selected at checkout.

| CheckoutLanguage | Venue language | When adding the ticket | At checkout and in the email |
| --- | --- | --- | --- |
| French | English | English | French |
| English | French | French | English |

| Email language | Subject | Summary heading | Order button |
| --- | --- | --- | --- |
| French | Confirmation de commande - [Venue] | Résumé de la commande | Voir votre commande |
| English | Order confirmation - [Venue] | Order Summary | View Your Order |

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* **Venue.** Get the Venue name for your row from the teammate preparing QA data. They confirm its **Language** in QA Showpass Admin, with **Confirmation email is enabled** on and **Alpha connect partner is enabled** off.
* **Standard confirmation.** An Organizer with **Manage Organization Info** checks Dashboard → Organization → Branding → Emails → **Customization** for this Venue and Event. Both must use the default purchase-confirmation subject and message.
* **Event.** Use a published, on-sale single Event at that Venue with a free general-admission ticket, a zero checkout total and immediate electronic delivery. Get its public Event page and ticket name from the Organizer.
* **Buyer.** Sign in on the QA public site with an empty cart and access to the buyer’s inbox. Note the current website language so you can restore it.

**Parameters:**
CheckoutLanguage: French, English

**Tags:** public, notifications, orders

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| On the public Event page, use the EN/FR menu to set the starting language. Add one ticket to the cart. | Language under “When adding the ticket” | The cart shows one ticket for this Event. |
| Switch to the checkout language using the same menu. Reopen the cart. | French or English, as shown in your row | The page is in that language and the same ticket is still in the cart. |
| Open Checkout. Check the buyer’s email and zero total. Note the time, then select **Complete transaction** once. | QA buyer’s address | Showpass confirms the order. Record its Order ID. |
| Open the buyer’s new confirmation for this order. Check the time, subject, summary heading, button and instructions. | The expected email language in this case’s table | The confirmation is addressed to the buyer and arrived after the action. Its labels match the table and the instructions use that language. The Venue, Event, ticket name and quantity match the order. |
| While signed in as the buyer, select the order button in the email. | Order ID from this run | The order opens with that ID. |

**Postconditions:**

* Keep the Order ID and delivery time. Restore the buyer’s original website language.

### TC-2: Resend from My Orders using the displayed language rule

**Title:** My Orders - Confirmation email - Honor the Customer’s resend language

**Description:** Resend a purchase confirmation from My Orders. The buyer can choose the language when the selector is on. With it off, a resend uses the saved order language or, for an older order with none, the Venue language.

| ResendRule | Venue language | Order language | Selector | Start My Orders in | Expected email |
| --- | --- | --- | --- | --- | --- |
| ChooseFrench | English | English | On | French | French |
| KeepOrderEnglish | French | English | Off | French | English |
| LegacyVenueFrench | French | Blank | Off | English | French |

| Email language | Subject | Summary heading | Order button |
| --- | --- | --- | --- |
| French | Confirmation de commande - [Venue] | Résumé de la commande | Voir votre commande |
| English | Order confirmation - [Venue] | Order Summary | View Your Order |

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* **Venue and order.** Get the Venue name and Order ID for your row from the teammate preparing QA data. In QA Showpass Admin they confirm the Venue’s **Language**, **Confirmation email is enabled** on, and **Language** on the order’s ticket basket. They confirm whether **Email Language** is on or off for this buyer in **My Orders**, as shown in your row. If no order has a blank language, mark only LegacyVenueFrench blocked.
* **Standard confirmation.** An Organizer with **Manage Organization Info** checks Dashboard → Organization → Branding → Emails → **Customization** for this Venue and Event. Both must use the default purchase-confirmation subject and message.
* **Buyer.** Sign in on the QA public site as the buyer of that order. You need access to the buyer’s inbox and an order with one electronic ticket. Use a completed public sale. Note the original website language and confirmation delivery time.
* **Delivery window.** Get the QA inbox’s usual delivery window in minutes from the teammate preparing email delivery. Use it to decide when to finish checking for a message.

**Parameters:**
ResendRule: ChooseFrench, KeepOrderEnglish, LegacyVenueFrench

**Tags:** my-orders, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Use the EN/FR menu to set the starting website language in your row. Open Account → **My Orders**, select the Order ID and expand **Have questions about your order?**. | Prepared Order ID | The order shows the prepared Event and one electronic ticket. Record the ticket name and buyer email. |
| Note the time and the newest email for this order in the buyer’s inbox. Select **Resend confirmation email** once. | Selector setting in your row | With the selector on, **Email Language** opens with French selected. With it off, Showpass confirms a send to the buyer’s address immediately. For an immediate send, go straight to the inbox check. |
| Select **Cancel**. Check the buyer’s inbox and Spam through the usual delivery window. Then switch the site to English and reopen **Resend confirmation email** on the same order. | ChooseFrench only | No new confirmation for this order arrived after Cancel. The reopened **Email Language** dialog now shows English. |
| Choose French. Note the time before selecting **Send** once. | ChooseFrench only | The dialog closes and Showpass confirms a send to the buyer’s address. |
| Check the buyer’s inbox and Spam through the usual delivery window after the resend. Count new confirmations for this order, then read the subject, summary heading, button and instructions. | Count from the first **Resend confirmation email** click, including time spent in the dialog. | Exactly one new confirmation is addressed to the buyer. The three labels match the table, and the instructions use the same language. The Venue, Event, ticket name and quantity match the order. |
| Select the order button in the email while signed in as the buyer. | Prepared Order ID | The order opens with that ID. |

**Postconditions:**

* Have the teammate who checked the order reopen the same ticket basket after the resend. **Language** still matches the original value in your row, including blank.
* Record the delivery time and restore the buyer’s original website language.

### TC-3: Deliver password reset instructions in the language of the request

**Title:** Public Account - Password reset email - Use the language selected at sign-in

**Description:** A signed-out Customer requests a password reset. Check the language of the email and open its reset link. Use a fresh signed-out session for each language.

| ResetLanguage | Subject contains | Body heading | Reset instruction contains |
| --- | --- | --- | --- |
| French | Réinitialiser le mot de passe | Réinitialisation du mot de passe | Pour réinitialiser votre mot de passe sur Showpass, veuillez cliquer sur ce lien |
| English | Password Reset | Password Reset | To reset your password on Showpass, please click this link |

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Preconditions:**

* **Account.** Use an active QA Customer with a verified email address and access to that inbox. The QA site must deliver account emails.

**Parameters:**
ResetLanguage: French, English

**Tags:** public, login, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| On the signed-out QA site, choose the row’s language in the EN/FR menu. Open **Log in → Forgot your password?**. | French or English | The reset form opens in that language. |
| Enter the account’s **Email address**. Note the time and select **Send reset link** once. | Verified QA address | The page says a link will be sent if the account exists. |
| Open the new reset email for this request. If it hasn’t arrived in 15 minutes, check Spam. | Subject, heading and reset instruction in your row | The email is addressed to the QA account. The three pieces of text match the row. The instructions for an unrequested reset use the same language. |
| Open the email’s reset link in the signed-out session. | Link from this request | Showpass opens the form to choose a new password. |

**Postconditions:**

* Close the form without changing the password. Record the delivery time and wording. Leave the reset link out of the evidence.

## Venue sales and Transactions

### TC-4: Resend a buyer’s order from Venue Transactions

**Title:** Dashboard - Transactions - Deliver the language selected for a confirmation resend

**Description:** Resend a buyer’s confirmation from Transactions. Check what staff see before sending and which language arrives in the buyer’s inbox.

| StaffResend | Venue language | Order language | Email selector | Employee action | Expected email |
| --- | --- | --- | --- | --- | --- |
| VenueDefault | French | English | On | Keep French | French |
| EmployeeChoice | French | French | On | Change French to English | English |
| StoredOrder | English | French | Off | Send with no selector | French |

| Email language | Subject | Summary heading | Order button |
| --- | --- | --- | --- |
| French | Confirmation de commande - [Venue] | Résumé de la commande | Voir votre commande |
| English | Order confirmation - [Venue] | Order Summary | View Your Order |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* **Employee.** Sign in to the QA Dashboard in English with **Manage Transactions** and **Administer Transactions**.
* **Venue and order.** Get the Venue name and Order ID for your row from the teammate preparing QA data. In QA Showpass Admin they confirm the Venue’s **Language**, **Confirmation email is enabled** on and **Language** on the order’s ticket basket. They confirm whether **Email language** is on or off for the employee in **Transactions**, as shown in your row.
* **Standard confirmation.** An Organizer with **Manage Organization Info** checks Dashboard → Organization → Branding → Emails → **Customization** for this Venue and Event. Both must use the default purchase-confirmation subject and message.
* **Buyer.** Use a completed public order for one electronic ticket. Have access to the buyer’s account and inbox, and get the buyer email, Event name, ticket name and quantity from **My Orders**.

**Parameters:**
StaffResend: VenueDefault, EmployeeChoice, StoredOrder

**Tags:** dashboard, transactions, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the named Venue in the Dashboard Organization picker. Open **Transactions** and search for the Order ID. | Prepared sale | The buyer, Event and ticket quantity match the order. |
| Open the sale’s three-dot **Transaction actions menu → Resend confirmation email**. | Buyer email and selector setting in your row | **Email address** shows the buyer. With the selector on, **Email language** opens in French. With it off, the field is absent. |
| Keep the buyer’s address and apply the language choice in your row. Note the time, then select **Send** once. | Keep French, choose English, or send with no selector | The Dashboard reports **Email sent**. |
| Open the buyer’s new confirmation for this order. Check the time, subject, summary heading, button and instructions. | The expected email language in this case’s table | The confirmation is addressed to the buyer and arrived after the action. Its labels match the table and the instructions use that language. The Venue, Event, ticket name and quantity match the order. |
| Select the order button in the email while signed in as the buyer. | Prepared Order ID | The order opens with that ID. |

**Postconditions:**

* Have the teammate who checked the order reopen its ticket basket. **Language** still matches the original order value in your row. Record the new email’s delivery time.

### TC-5: Email the buyer after a Web Box Office sale

**Title:** Box Office - Order emails - Use the employee’s language setting for the sale

**Description:** Sell one ticket to a named Customer from Web Box Office. Check the fixed receipt language on one sale and change it at checkout on another.

| SaleLanguage | Venue language | Device setting | At checkout | Expected email |
| --- | --- | --- | --- | --- |
| FixedFrench | English | Fixed French | Read the receipt language | French |
| ChooseEnglish | French | Ask at checkout, with French as the default | Choose English | English |

| Email language | Subject | Summary heading | Order button |
| --- | --- | --- | --- |
| French | Confirmation de commande - [Venue] | Résumé de la commande | Voir votre commande |
| English | Order confirmation - [Venue] | Order Summary | View Your Order |

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* **Employee.** Use the same QA device throughout the sale. You need **Use Box Office** and permission to sell the ticket. Note the current language mode, default language, and ticket and receipt delivery choices.
* **Venue.** Get the Venue name for your row from the teammate preparing QA data. In QA Showpass Admin they confirm its **Language**, **Confirmation email is enabled** on and **Alpha connect partner is enabled** off. They confirm this employee has **Settings → Language** in Web Box Office for that Venue.
* **Standard confirmation.** An Organizer with **Manage Organization Info** checks Dashboard → Organization → Branding → Emails → **Customization** for this Venue and Event. Both must use the default purchase-confirmation subject and message.
* **Sale.** Get the Event and ticket names for an available general-admission ticket with a zero final total and immediate electronic delivery. Use a named QA Customer whose account and inbox you can open.

**Parameters:**
SaleLanguage: FixedFrench, ChooseEnglish

**Tags:** box-office, notifications, orders

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Web Box Office for the prepared Venue, open **Settings → Language**. Select **Use the same language for all transactions** and French. For ChooseEnglish, then select **Ask at checkout**. Reopen **Language**. | Device setting in your row | FixedFrench shows the fixed French setting. ChooseEnglish shows **Ask at checkout**. |
| Open **Sell**, add one ticket and continue to **Checkout**. Select the named Customer by email. | QA ticket and buyer email | Checkout shows the buyer, their email, one ticket for the Event and a zero total. |
| Set ticket and receipt delivery to **Email**. Read the displayed language and make the choice in your row. | FixedFrench or ChooseEnglish | FixedFrench shows French under **Receipt Delivery → Language**, with no editable **Language Preference**. For ChooseEnglish, **Language Preference** opens in French and lets you select English. |
| Note the time. Complete the transaction once and record its Order ID. | Free sale | Web Box Office confirms the sale for that Customer. |
| Open the buyer’s new confirmation for this order. Check the time, subject, summary heading, button and instructions. | The expected email language in this case’s table | The confirmation is addressed to the buyer and arrived after the action. Its labels match the table and the instructions use that language. The Venue, Event, ticket name and quantity match the order. |
| While signed in as the buyer, select the order button in the email. | Order ID from this run | The order opens with that ID. |

**Postconditions:**

* Restore the device’s original language mode, default language and both delivery choices. Keep the QA sale.

## Venue support inbox

### TC-6: Send a Customer’s inquiry to the Venue in its saved language

**Title:** My Orders - Contact the organizer - Deliver inquiries in the Venue’s language

**Description:** A buyer contacts the organizer from My Orders. Showpass writes the email to the Venue in its saved language and carries the buyer’s own words through unchanged.

| VenueLanguage | Venue language | Buyer’s website | Subject begins with | Labels in the email |
| --- | --- | --- | --- | --- |
| French | French | English | Demande d’un client de | Courriel du client, Motif du contact |
| English | English | French | Customer inquiry from | Customer email, Reason for contact |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* **Venue.** Get the Venue name from the teammate who verified **Language** on its QA Showpass Admin record. Use the saved language in your row.
* **Venue inbox.** An Organizer with **Manage Organization Info** selects that Venue in the Dashboard Organization picker and opens Organization → Organization settings → **Contact**. **Allow customers to email you** must be on and **Customer support email** must be an inbox you can read.
* **Buyer.** Sign in on the QA public site with a separate Customer account. Have its name, email address and a completed ticket order at this Venue. Note the Order ID, Event name and current website language.
* **Delivery.** Use a QA environment approved for support inquiries. The send also notifies the support team.

**Parameters:**
VenueLanguage: French, English

**Tags:** my-orders, organizer, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the buyer’s website language in the EN/FR menu. Open Account → **My Orders**, select the order, then **Have questions about your order? → Contact the organizer**. | Website language and Order ID | The Contact Details dialog identifies the correct Venue. |
| Select **Message Us**. Check **Name** and **Email**, enter **Event Name**, select the reason for a question about your ticket, and enter a message. Copy the displayed reason and your message. | Under **Reason for Contact**, use **Question about my ticket** or **Question sur mon billet**. Enter “Porte nord — QA 1438” with a fresh run number. | The form shows the buyer, Event, selected reason and full message. |
| Note the time and select **Send** once. | Completed form | The page confirms the message was sent. |
| In the Venue inbox, open the new inquiry and check the email addresses and the Showpass wording. | Customer support email, buyer’s email and the wording in your row | To is the Venue support address. Reply-To is the buyer. The subject names the buyer. The subject, labels and unverified-sender notice are in the Venue language. |
| Compare the reason, Event name and message in the email with what you submitted. | Copied reason, Event name and message | All three match, including the accents and run number. |

**Postconditions:**

* Keep the run number and delivery time. Restore the buyer’s original website language.

## Venue post-event emails

### TC-7: Send one thank-you to each recipient in the language of their latest purchase

**Title:** Dashboard - Post-event emails - Use each recipient’s latest purchase for the Event

**Description:** Check one scheduled thank-you for one Event. A bought twice using different languages. B bought once. Each should receive one email in the language of their latest purchase.

| Recipient | Purchases in time order | Expected subject | Expected greeting |
| --- | --- | --- | --- |
| A | English, then French | Merci d’avoir assisté à [Event] | Bonjour [first name], |
| B | English only | Thank You for Attending [Event] | Hi [first name], |

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Preconditions:**

* **Venue.** Get the name of an English Venue from the teammate who confirmed its **Language** and verified the post-event email feature is on in QA Showpass Admin.
* **Organizer.** With **Manage Organization Info** and **Manage Events**, select that Venue in the Dashboard. In Organization → Branding → Emails → **Post-event**, confirm **Enable organization-wide post-event email** is on and copy its distinctive saved **Message**. Under Emails → **Customization**, check that neither the Venue nor the Event overrides the post-event subject or message.
* **Event.** Use an active, published, single Event that has yet to end. In Dashboard → Events → Manage Events, open it and confirm **Advanced options → Post-event email → Use organization setting**. Note its name, date and local end time.
* **Orders and inboxes.** A and B are the only ticket holders, each with a separate QA inbox. Each buys for themself. A uses the same name and email twice. The teammate preparing the orders supplies all three Order IDs, purchase times and the **Language** they verified on each ticket basket in QA Showpass Admin. Each order has one valid electronic ticket for this Event.
* **Delivery deadline.** Get a local date, time and timezone from the teammate preparing scheduled email delivery. They confirm the QA scheduler and delivery to both inboxes and allow for the mail queue. If they cannot verify delivery is available, mark this case blocked.

**Tags:** dashboard, notifications, events

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Before the Event ends, sign in as each buyer and find the three Order IDs in Account → **My Orders**. For the purchase languages, match each ID to your teammate’s record. | A’s two Order IDs and B’s one Order ID | **My Orders** shows one valid ticket for this Event on each order. The prepared order record shows English then French for A, and English for B. |
| After the Event ends, check both inboxes and Spam through the supplied local deadline. Count thank-yous for this Event. | A and B’s inboxes and the local deadline | Exactly one new thank-you is addressed to A and one to B. Record both delivery times and any missing or extra email. |
| Open each email and compare it with that person’s row. Read the greeting, subject, instructions and Event date. | First names, Event name and date, saved Venue message | A receives French and B receives English, including the long-form Event date. Each greeting names the right person. Both copies show the Event name and Venue message exactly as saved. |

**Postconditions:**

* Keep the three Order IDs, purchase languages, local deadline and delivery times together.

## Preparing the QA Venue and orders

The teammate preparing test data gives the tester the QA environment, Venue name and saved language, plus the Event or Order IDs needed for the selected row. Reuse verified setup for the same Venue. An existing Venue with the required settings is enough. The following are read-only checks for a teammate with approved access.

| What the setup owner checks | Where to read it and what to hand over |
| --- | --- |
| Venue language and purchase confirmations | In QA Showpass Admin → **Venues → Venues**, search by Organization name or Venue ID and open the matching record. Read **Language** as English or French. For purchase and resend cases, also read **Confirmation email is enabled**. For original sales only, check **Alpha connect partner is enabled** is off. Record the Venue name and these saved values. |
| Availability of the language selector or post-event email | In Showpass Admin → **Feature flags**, look up `enable_language_selector_for_pdfs` for buyer or staff resends and Web Box Office, or `thank_you_emails_flag` for post-event emails. Verify the effective setting for the selected QA Venue and account, including any Venue-specific exclusions. Give the tester the feature name and ON or OFF for their Venue. |
| Language saved with a purchase | In QA Showpass Admin → **Tickets → Ticket baskets**, use the DjangoQL search `invoice.transaction_id = "<Order ID>"`, replacing the placeholder with the Order ID from My Orders. Open the matching basket by its numeric ID and check the buyer and payment Venue. Record that basket ID, the Order ID, purchase time and **Language** (English, French or blank). After a resend, reopen the same basket and provide its current value. The Order ID and basket ID identify different records. |
| Time to allow after Cancel or Send in My Orders | Give the tester the usual QA mail delivery window in minutes. Allow that long for a confirmation to arrive before judging a cancellation or resend. |
| Local deadline for the scheduled thank-you | Confirm the QA scheduler is running and how long to allow for local mail delivery. Convert the Event end time to UTC and add two hours. Take the first run at minute 25 of a UTC hour at or after that time, then add the mail allowance. Give the tester the resulting date, time and timezone in their local time. For example, a winter Event ending at 18:10 in Newfoundland becomes eligible at 23:40 UTC. With the next run at 00:25 UTC and a 15-minute delivery allowance, check through 21:10 Newfoundland time on the Event date. |

## Proposed Qase organization

Before the November 25, 2026 cleanup, Qase showed 24 direct cases under **Core → Core - Post Purchase** (624) and six in **Ad Placements** (1032). All 30 definitions were read. The comparison also searched the SPT inventory of 2,492 cases in 389 suites for matching triggers, recipients, language choices and delivery checks. [Current Post Purchase suite](https://app.qase.io/project/SPT?suite=624)

### Organize the existing suite first

The four new folders and all 23 moves were applied and read back in Qase on November 25, 2026. At that point SPT-4392 was the only direct case in suite 624. Its later move is recorded under the Transactions-only revision.

| Destination under Core - Post Purchase | Existing SPT case IDs | Count |
| --- | --- | ---: |
| [Confirmation emails and resends (1263)](https://app.qase.io/project/SPT?suite=1263) | 546, 549, 550, 551, 555, 4006, 4157, 4387 | 8 |
| [Tickets, receipts and order details (1264)](https://app.qase.io/project/SPT?suite=1264) | 543, 544, 547, 548, 2303, 4057, 5140, 5156, 5280 | 9 |
| [Event reminders, thank-yous and ratings (1265)](https://app.qase.io/project/SPT?suite=1265) | 554, 4025, 4835 | 3 |
| [Refunds and disputes (1266)](https://app.qase.io/project/SPT?suite=1266) | 542, 5128 | 2 |
| [Ad Placements (1032)](https://app.qase.io/project/SPT?suite=1032) | 4022 joined the six cases already there | 1 |
| [Core - Post Purchase (624)](https://app.qase.io/project/SPT?suite=624) | 4392 | 1 |

### Place the seven email-language drafts

| Draft | Recommendation | What the tester should gain or keep |
| --- | --- | --- |
| TC-1 · Public checkout | Update [SPT-4157](https://app.qase.io/case/SPT-4157) in **Confirmation emails and resends**. | On the Event ticket purchase, switch the website language after adding the ticket. Match the new email to the order. Keep the existing product, membership, localized PDF content and filenames, and delayed-barcode activation checks. [SPT-549](https://app.qase.io/case/SPT-549) owns receipt and ticket attachment delivery. |
| TC-2 · Buyer resends from My Orders | Update [SPT-4871](https://app.qase.io/case/SPT-4871) in **Account Purchase Lists** (1013). | It already sends the buyer’s chosen-language copy. Add the Cancel check, selector-off behavior and blank-order fallback. Keep the existing English and French choices and the receipt or ticket links. [SPT-4387](https://app.qase.io/case/SPT-4387) exercises the separate public Event form. |
| TC-3 · Password reset | Create one case in **Core - Authentication** (605). | A signed-out Customer receives the French or English message and opens its reset link. [SPT-3206](https://app.qase.io/case/SPT-3206) covers request validation across seven platform/view rows. [SPT-4908](https://app.qase.io/case/SPT-4908) covers changing the password and rejecting invalid links. |
| TC-4 · Venue employee resends from Transactions | Retain [SPT-4392](https://app.qase.io/case/SPT-4392) for this case and move it to **Transactions** (103) after its other coverage is secured. | The Dashboard employee sees the Venue default, can choose a one-time language, and the buyer receives the right order. [SPT-1267](https://app.qase.io/case/SPT-1267) covers the Box Office and Electron entry points. |
| TC-5 · Web Box Office sale | Update the Web Box Office **Email** runs of [SPT-4398](https://app.qase.io/case/SPT-4398) in **Core - Box Office - Print** (711). | This case already covers email and print. Add the fixed French receipt and the English choice at checkout. Keep Electron, printed output, reprints and selector-off coverage. |
| TC-6 · Buyer contacts the Venue from My Orders | Create one case in **Account Purchase Lists** (1013). | Start at the buyer’s order and open the Venue’s support inbox. Check the Venue language, Reply-To and the buyer’s exact words. [SPT-354](https://app.qase.io/case/SPT-354) starts at the Organizer Profile. [SPT-3305](https://app.qase.io/case/SPT-3305) starts at a public Event. |
| TC-7 · Scheduled thank-you | Update [SPT-554](https://app.qase.io/case/SPT-554) in **Event reminders, thank-yous and ratings**. | Give two recipients different latest purchase languages and check one email per recipient. Retain the configured message and links, and SPT-554’s check that an ineligible control inbox receives nothing. Use the scheduler deadline in TC-7. |

### Preserve SPT-4392 before narrowing it

SPT-4392 pairs **27 item and delivery rows** with two language relationships. Its five general steps cover up to 54 combinations. The seven local email drafts use Event tickets for the order flows. They cannot by themselves replace the product, membership, gift-card, print or hold-link checks.

| Existing SPT-4392 rows | Where to verify the checks before changing SPT-4392 |
| --- | --- |
| Public checkout (4) | SPT-4157 for the purchase email, ticket and receipt PDFs. Carry over the gift-card-compatible receipt or email explicitly. |
| Box Office email (4), print receipt (4), print ticket or pass (2) | SPT-4398 for the buyer’s emailed or printed output. Verify item-specific receipts for Event tickets, products, memberships and gift cards, plus both printed ticket/pass rows. |
| Individual hold link (3), bulk hold links (3) | [SPT-4070](https://app.qase.io/case/SPT-4070) and [SPT-4149](https://app.qase.io/case/SPT-4149) already exercise the sends. Add delivered-language checks for the existing Event ticket, product and membership rows before removing them from 4392. |
| Dashboard Transactions resend (4) | Keep on SPT-4392. Preserve the supported Event ticket, product, membership and gift-card outcomes alongside TC-4’s language choice. |
| My Orders resend (3) | SPT-4871. Retain Event ticket, product and membership resends and their correct links or order details. |

For every moved check, retain the applicable order and item identifiers, prices, Customer and Venue details, and localized wording or dates. Verify the receiving Qase definitions by ID before shortening 4392. The table identifies candidate owners for the old checks. Publication and execution are pending.

## Receiving case updates for SPT-4392

**Qase updates verified. Execution: Not run.** The Customer Tester owns TC-8 and TC-9. The Box Office Tester owns TC-10 through TC-12 with Organizer support for saved settings. All five updates were published to their existing Qase cases. SPT-4392 is still in **Core - Post Purchase (624)**.

| Draft | Existing case and suite | What to verify |
| --- | --- | --- |
| TC-8 | [SPT-4157](https://app.qase.io/case/SPT-4157) · Confirmation emails and resends (1263) | Checkout email and localized PDFs. Includes the gift-card receipt and separate redemption email, and the delayed barcode email. |
| TC-9 | [SPT-4871](https://app.qase.io/case/SPT-4871) · Account Purchase Lists (1013) | Buyer resend in the selected, saved order or Venue language. Includes Event ticket, Product and Membership orders. |
| TC-10 | [SPT-4398](https://app.qase.io/case/SPT-4398) · Core - Box Office - Print (711) | Buyer email, paper receipts, tickets and Membership passes, and reprints. Gift cards get receipts. |
| TC-11 | [SPT-4070](https://app.qase.io/case/SPT-4070) · Core - Holds (630) | One held Event ticket, Product or Membership. Includes both the regular and branded templates. |
| TC-12 | [SPT-4149](https://app.qase.io/case/SPT-4149) · Box Office Holds (143) | One bulk send to three distinct recipients. Check each delivered link and the unselected inbox. |

### TC-8: Match the checkout language in purchase emails and PDFs

**Title:** Core - Post Purchase - Verify confirmation email and PDF localization

**Description:** Buy one item from the public site. Change the language after adding it to the cart, and check the order email and the files that belong to that purchase. Run both CheckoutLanguage values for each ItemType (10 runs). Use an English Venue for French checkout and a French Venue for English checkout. Start the site in the Venue language.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| ItemType | What to buy | Files and follow-up to check |
| --- | --- | --- |
| EventTicket | One ticket with immediate electronic delivery | Receipt and ticket PDF. The ticket filename contains the saved ticket type, Event and holder names. In the PDF check **Ticket Type / Type de billet**. |
| Product | One in-stock Product with a confirmation PDF enabled | Receipt and Product PDF. The filename starts with **Products / Produits**. In the PDF check **Product / Produit**. |
| Membership | One active Membership that issues a pass PDF by email | Receipt and Membership PDF. The filename starts with **Memberships / Adhésions**. In the PDF check **Membership Level / Niveau d’adhésion**. |
| GiftCard | One Venue gift card for a separate QA recipient. Use immediate email delivery. | The buyer receives a receipt and sees the gift card, amount and recipient address. The recipient separately receives the gift-card email. |
| EventTicketDelayedBarcode | One ticket with a scheduled barcode release and an activation email | Initial receipt. Record the barcode release time. After release, check the new confirmation email and open its ticket PDF. The barcode is now visible for the same ticket. Use the same ticket filename and PDF checks as EventTicket. |

| CheckoutLanguage | Email subject | Email summary and button | Receipt PDF |
| --- | --- | --- | --- |
| English | Order confirmation - [Venue] | Order Summary, View Your Order | Receipt - [buyer].pdf, Payment Method |
| French | Confirmation de commande - [Venue] | Résumé de la commande, Voir votre commande | Reçu - [buyer].pdf, Paiement |

**Preconditions:**

- Get the public item page, item name, price and Venue name from the teammate preparing QA data. They confirm the Venue’s saved language, enabled purchase confirmations and emailed receipts, and that the Venue is not using Alpha Connect. The Organizer confirms the default subject and message under **Organization → Branding → Emails → Customization** for the applicable Venue, Event or Membership Group.
- Use a signed-in QA buyer with access to the buyer inbox and approved QA payment details. Start with an empty cart and note the current website language. For GiftCard, get a separate controlled recipient name and address and record the denomination. Get the QA delivery deadline for gifts sent without a delivery date. For delayed delivery, get a near-term release time and the QA mail deadline from the teammate who prepared the Event.

**Parameters:**
ItemType: EventTicket, Product, Membership, GiftCard, EventTicketDelayedBarcode
CheckoutLanguage: English, French

**Tags:** localization, post-purchase, email

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the prepared public item page. Set the EN/FR menu to the Venue language and add one item to the cart. For GiftCard, enter the prepared recipient and leave the delivery date unset. | ItemType and recipient details if applicable | The cart contains the intended item, quantity and price. A gift card shows the intended recipient and amount. |
| Switch the site to CheckoutLanguage using the EN/FR menu. Reopen the cart, proceed to Checkout and submit once. | Approved QA buyer and payment method | The same item is purchased in the selected language. Record the Order ID, total and purchase time. |
| In the buyer inbox, open the confirmation for the new order. Read the subject, summary heading and instructions. Open its order button. | CheckoutLanguage row and recorded Order ID | Showpass wording matches the language row. The order button opens the recorded order. The buyer, Venue, item, quantity and amount match checkout. |
| Read the attached receipt filename, then open the PDF. Open the item PDF from the attachment or ticket download link when the ItemType row supplies one. | Receipt and item file checks above | The receipt name and wording match the language row. Its amount and invoice details agree with the order. Any item PDF has the expected filename wording and identifies the right item and holder. A gift card has no admission ticket PDF. |
| For GiftCard, open the separate gift-card email in the recipient inbox by the QA delivery deadline. Read the subject and instructions. | Recipient and denomination recorded before purchase | For English checkout, the subject contains **Received a Showpass Gift Card** and the email shows **Redemption Code**. For French checkout, it shows **Vous avez reçu une carte-cadeau Showpass pour [Venue]!** and **Code d’utilisation**. The recipient and amount match this purchase, and a code is present. |
| For EventTicketDelayedBarcode, check the delivery notice in the initial email and confirm the barcode for that ticket is missing or marked unavailable before release. After the recorded release time, open the new confirmation from the buyer inbox by the QA deadline and open its ticket PDF. | Recorded release time and original Order ID | The follow-up names the same order and uses the same subject language and ticket labels. The barcode is now visible, and the file belongs to the original ticket and holder. |

**Postconditions:**

- Keep the QA Order ID and evidence of the received wording. Omit gift-card codes and ticket barcodes from shared evidence. Restore the buyer’s original website language.

### TC-9: Resend in the selected, saved order, or Venue language

**Title:** Core - User - My Orders - Resend confirmation email from order details

**Description:** Resend a completed order from My Orders. Check the buyer’s email, the information it contains and the order its link opens. Run each ResendScenario.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

| ResendScenario | Order | Venue language | Saved order language | Site language at first open | Email Language | Expected email |
| --- | --- | --- | --- | --- | --- | --- |
| TicketChooseFrench | Event ticket | English | English | French | On. After Cancel and switching the site to English, choose French. | French |
| ProductChooseEnglish | Product | French | French | French | On. Choose English. | English |
| MembershipChooseFrench | Membership | English | English | English | On. Choose French. | French |
| KeepOrderEnglish | Event ticket | French | English | French | Off. The first click sends. | English |
| LegacyVenueFrench | Older Event ticket | French | Blank | English | Off. The first click sends. | French |

| Email language | Subject | Summary and order button |
| --- | --- | --- |
| English | Order confirmation - [Venue] | Order Summary, View Your Order |
| French | Confirmation de commande - [Venue] | Résumé de la commande, Voir votre commande |

**Preconditions:**

- Use a signed-in buyer and controlled inbox. Get the Venue, Order ID, item name, quantity and total for your row from the teammate preparing QA data. They confirm saved Venue and order languages, that the Venue delivers confirmations, and whether **Email Language** is on or off for that buyer. The Organizer confirms the default confirmation template under **Organization → Branding → Emails → Customization**, including any Event or Membership Group override. If a real blank-language order is unavailable, mark only LegacyVenueFrench blocked.
- Use an order with its expected receipt and purchased item accessible. Record the original confirmation’s timestamp and the buyer’s current website language. For TicketChooseFrench, get the usual QA inbox delivery window in minutes.

**Parameters:**
ResendScenario: TicketChooseFrench, ProductChooseEnglish, MembershipChooseFrench, KeepOrderEnglish, LegacyVenueFrench

**Tags:** my-orders, post-purchase, email

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Use the EN/FR menu to set the site language. Open Account → **My Orders**, select the recorded order and expand **Have questions about your order?**. | Site language, Order ID and buyer | The order shows the recorded item, quantity and total. |
| Record the time. Select **Resend confirmation email** once. | Email Language setting in your row | With the selector on, **Email Language** defaults to the current website language. With it off, Showpass reports a send to the buyer. Go to the inbox check for those rows. |
| For TicketChooseFrench, select **Cancel** and check Inbox and Spam through the QA delivery window. Switch the site to English and reopen the resend action on the same order. | TicketChooseFrench only | Cancel sent no email for this order. The reopened **Email Language** dialog starts in English. |
| For rows with the selector on, choose the row’s language. Select **Send** once. | English or French as specified | Showpass confirms the send to the buyer’s address. |
| Open the new confirmation in the buyer inbox. Check its subject, summary and instructions. For TicketChooseFrench, count from the first resend click through a full delivery window after Send. | Expected email language and Order ID | Showpass’s subject, heading, button and instructions match the expected language. For TicketChooseFrench, exactly one new confirmation arrived for this order across both attempts. |
| Open the order button and the receipt and purchased item links or files supplied with the message. | Recorded Order ID and item | The button opens the same order. The new message is addressed to this buyer. Its receipt and ticket, package contents when present, Product or Membership details match the purchase. Receipt wording uses the chosen or saved language for this send. |

**Postconditions:**

- Ask the teammate who verified the order to confirm the same saved order language is still present, including blank for LegacyVenueFrench. The completed order, item quantities and entitlements remain the same. Keep the delivery time and restore the buyer’s original website language.

### TC-10: Box Office email, print and reprint language

**Title:** Core - Box Office - Printing - Configure language for tickets and receipts

**Description:** Sell one item in Box Office. Check the buyer's email or the printed output requested at checkout. Run the selected Qase row with a new cart. The 28 rows include 20 Web Box Office sales with the selector on (both languages for every delivery row), plus the eight desktop runs below.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

| Additional desktop run | Delivery | OutputLanguage and selector |
| --- | --- | --- |
| Electron email | EmailTicket | English with selector on |
| Electron ticket | PrintAdmissionTicket | English with selector on |
| Electron receipt | PrintTicketReceipt | French with selector on |
| Electron pass | PrintMembershipPass | French with selector on |
| Web and Electron email without a selector (one sale per client) | EmailTicket | French Venue, selector off |
| Web and Electron receipt without a selector (one sale per client) | PrintTicketReceipt | English Venue, selector off |

| Delivery | Sell one | Delivery choices | Verify |
| --- | --- | --- | --- |
| EmailTicket | Event ticket | Delivery method: Email. Receipt Delivery: Email. | Buyer email, receipt PDF and admission ticket PDF or link |
| EmailProduct | Product | Delivery method: Email. Receipt Delivery: Email. | Buyer email, receipt PDF and product PDF or link |
| EmailMembership | Membership | Delivery method: Email. Receipt Delivery: Email. | Buyer email, receipt PDF and Membership pass PDF or link |
| EmailGiftCard | Gift Card | Receipt Delivery: Email | Buyer email and receipt PDF for the Gift Card, with the correct denomination and gift recipient. No admission ticket or pass. |
| PrintTicketReceipt | Event ticket | Receipt Delivery: Print | Paper receipt with Event and ticket name. Reprint the same receipt from Transactions. |
| PrintProductReceipt | Product | Receipt Delivery: Print | Paper receipt with product and variant |
| PrintMembershipReceipt | Membership | Receipt Delivery: Print | Paper receipt with Membership and level |
| PrintGiftCardReceipt | Gift Card | Receipt Delivery: Print | Paper receipt with Gift Card and denomination |
| PrintAdmissionTicket | Event ticket | Delivery method: Print | Full-page paper ticket with Event, ticket type and admission barcode. Reprint the same ticket from Transactions. |
| PrintMembershipPass | Membership | Delivery method: Print | Full-page paper pass with Membership, level and expiry. Reprint the same pass from Transactions. |

| Language setup | Venue and device | Expected output |
| --- | --- | --- |
| English | Use a French Venue. In Settings → Language, select **Use the same language for all transactions** and French. Switch to **Ask at checkout**. Change checkout's **Language Preference** from French to English. | English |
| French | Use an English Venue. In Settings → Language, select **Use the same language for all transactions** and French. | French |
| Selector off | Use a prepared English or French Venue with no language controls and a fresh cart. | Saved Venue language |

| Output | English markers | French markers |
| --- | --- | --- |
| Confirmation email | Order confirmation - [Venue], Order Summary, View Your Order | Confirmation de commande - [Venue], Résumé de la commande, Voir votre commande |
| Receipt PDF | Receipt, Amount Paid | Reçu, Montant payé |
| Thermal receipt | Transaction ID, Sale, Subtotal | Numéro de transaction, Vente, Sous-total |
| Admission ticket | Ticket Type | Type de billet |
| Product document | Product, Price | Produit, Prix |
| Membership pass | Membership Level, Expires | Niveau d'adhésion, Expire |

**Preconditions:**

* **Venue and Customer.** Get the QA Venue names and saved languages from the setup owner. Have them confirm that confirmation emails are enabled, partner ticket delivery is off, the standard purchase email applies and the Box Office language selector is available for the first two language setups. For the selector-off repeat, use the Venue they confirmed has it off. Use a named QA buyer with access to their inbox and a separate controlled gift recipient for Gift Card runs.
* **Employee and inventory.** Sign into Box Office for the prepared Venue with **Use Box Office** and access to its sales inventory and Transactions. Use **Scan Tickets** permission for ticket/pass reprints and **Manage Transactions** and **Administer Transactions** for receipt reprints. For the Web PDF receipt check, use a Venue where **Download receipt** opens the language choice. Get a prepared on-sale item from the selected row with a recorded name, options and price. Use one Product variant, a Membership level with a known expiry, or a valid Gift Card denomination as applicable. Use the approved QA payment method and confirm the total before buying.
* **Printers.** Use the QA thermal receipt printer on Electron and a Venue with browser thermal receipt printing on Web. For ticket/pass rows, use the printer settings by **Delivery method → Print**. Select **Save as PDF** where shown and choose the **Full page** layout. Have a QA paper printer ready in the PDF viewer. Save the device's original language, delivery and printer choices so they can be restored.

**Tags:** printing, box-office

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the prepared Venue in Box Office and apply the language setup from the table. Open **Sell**, select the named Customer and add the row's item. For a Gift Card, use **Configure Gift Card** and enter the prepared recipient name and email. | Delivery row, output language, buyer and item | The cart has the intended Customer and one correct item, option or denomination. The Gift Card is assigned to the prepared recipient. |
| Open **Checkout** and set the row's **Delivery method** or **Receipt Delivery**. With the selector on, choose English from the French default in **Language Preference** for English runs. For French runs, check **Language: French** by the delivery options. | Use the chosen delivery row. Select **None** for a receipt you do not need, if offered. | The requested Email or Print options are selected. Fixed French shows no editable **Language Preference**. On selector-off repeats, neither language control appears. Gift Card checkout has a receipt choice. |
| Note the time and complete the sale once. Record the order reference and the final total. | Approved QA payment method | One completed order shows the expected buyer, item, price and total. |
| For an email row, open the buyer's new message for this purchase. Read the subject, summary and button, then open its receipt and the row's item PDF or link. Open the order link signed in as that buyer. | Order reference, buyer inbox and expected output language | The message and documents match the language markers and the same order. The receipt shows the correct Venue, item, quantity, amount and buyer details. Gift Card mail shows the intended recipient and denomination. A matching new order opens from the link. |
| For a print row, collect the new receipt or print the full-page ticket/pass from the PDF viewer. Read it from paper. | Order reference, receipt or prepared admission item | The paper has the expected language markers and matching sale details. Receipt shows the transaction, item, quantity and amount. Ticket/pass shows the right Event or Membership and holder. The ticket has an admission barcode. |
| For PrintTicketReceipt, open **Transactions**, locate the same order and select **Print thermal receipt** on Web or **Print receipt** on Electron. Collect the new copy. | Order reference and original printed receipt | The second receipt keeps the purchase language and sale details. There is no second charge. A thermal reprint uses the text saved at purchase. |
| For PrintAdmissionTicket or PrintMembershipPass, open the same order in **Transactions**. Open the item breakdown for that one-item order and check **Select all**. Select **Reprint all items**. Keep the sale language if asked for **Ticket language**. Use **Download** on Web or **Print** to the prepared PDF destination on Electron. Open the file and print it to paper. | Original ticket/pass and order reference | The same admission ticket or pass prints with the purchase language and the same item and holder. No new order or admission item is created. |
| For Web PrintTicketReceipt with the selector on, open the same order’s **Download receipt** action. Choose the opposite language and select **Download**. Open the PDF and print it to paper. | Recorded Order ID and opposite language | The new paper copy uses the opposite receipt wording for the same order and total. The original thermal receipt used the sale language. |

**Postconditions:**

* Restore the Box Office language, delivery and printer choices you recorded. Keep the QA order references and the results per client. Store paper or screenshots without sharing barcodes or Gift Card codes.

### TC-11: Send one saved hold in the intended language

**Title:** Core - Holds - Verify the "Email hold link" functionality

**Description:** Send a saved hold from **Box Office → Holds**. Check the email template, language and link in the recipient’s inbox. Run each HoldScenario with a fresh hold so earlier sends cannot supply its language. Use one saved item per hold.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

| HoldScenario | Saved hold and template | Venue / saved hold language | Email Language when sending | Expected email |
| --- | --- | --- | --- | --- |
| RegularTicketDefault | Event ticket, regular hold, standard template | English / English | Opens in English. Select French. | French |
| RegularProductCustom | Product, regular hold, customized subject and message | French / French | Opens in French. Select English. | English Showpass labels and the saved custom text |
| BrandedTicketDefault | Event ticket, branded sponsor hold, standard template | French / French | Opens in French. Select English. | English |
| BrandedTicketCustom | Event ticket, branded sponsor hold, customized subject and message | English / English | Opens in English. Select French. | French Showpass labels and the saved custom text |
| RegularMembershipSaved | Membership, regular hold, standard template | English / French | Off. Use Send without a language choice. | French |

| Language | Default subject | Item heading | Link text or instructions |
| --- | --- | --- | --- |
| English | Complete your purchase from [Venue] | Items in your order: | Regular: Complete Purchase. Branded: Copy this link and share it with your network: |
| French | Complétez votre achat de [Venue] | Articles dans votre commande : | Regular: Finaliser l’achat. Branded: Copiez ce lien et partagez-le avec votre réseau : |

**Preconditions:**

- Sign in to QA Web Box Office as a Venue Employee with **Manage Holds** and **Manage Organization Info**. Get the Venue and an active, unpaid hold for one priced item. The teammate preparing it confirms the Venue and hold languages, whether **Email Language** is available, and supplies the hold name, item, quantity, price, link and controlled recipient address. The hold must stay active long enough to open the delivered link.
- An Organizer with **Manage Organization Info** confirms the selected template in **Organization → Branding → Emails → Customization**. For a custom row, get the exact saved subject and message. Use a saved customer message on RegularProductCustom and BrandedTicketCustom. Have the teammate give you the exact text before opening the hold. Use no previous customer message in the other rows.

**Parameters:**
HoldScenario: RegularTicketDefault, RegularProductCustom, BrandedTicketDefault, BrandedTicketCustom, RegularMembershipSaved

**Tags:** box-office, holds, email

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Box Office → Holds** for the prepared Venue. Open the named hold and select **Email hold link**. | Held item and recipient from preparation | The dialog is for the right hold and recipient. **Custom message for this customer** shows the saved message if there is one and is blank if there is none. **Email Language** opens in the Venue language when available. |
| On custom rows, expand **Email preview** and select **Email Customization** there. On standard rows, select **Email Customization** beside **No customization found**. Read **Email type** in the new tab, then return to the Holds tab. | Regular hold link or Branded sponsor hold link | The matching template opens. A custom row shows the saved preview. A standard row shows **No customization found** before you open the template link. |
| Enter a short identifying message. Select the language in the row if offered. Note the time and select **Send** once. | A message unique to this hold and run | The send is accepted for the selected hold. |
| In the recipient’s inbox, open the new invitation and check subject, heading and link wording. | Expected language and any saved custom text | The recipient is correct. The standard subject or saved custom subject matches. Showpass’s heading and the regular button or branded share instructions use the expected language. Both the new message and any saved template message appear as entered. Item name, quantity and price match the hold. |
| Open the regular button or paste the branded share link into the QA browser. Stop before checkout. | Recorded link and held item | The regular link opens the correct held order. The branded link opens the correct sponsor page and offers the intended item at the recorded hold price. |

**Postconditions:**

- Keep the hold and recipient reference and the delivery time. Leave checkout unsubmitted.

### TC-12: Bulk-send selected holds and match each recipient’s language and link

**Title:** Box Office - Holds - Bulk send hold-link emails

**Description:** Send Event ticket, Product and Membership hold links in one batch. Use fresh holds for each Qase row. Run both BulkLanguage values on Web Box Office and on Electron (four runs). A fourth eligible hold stays unselected.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |
| Electron | Desktop |

| BulkLanguage | Venue and saved hold languages | Employee action | Expected language |
| --- | --- | --- | --- |
| ChooseFrench | English Venue. All three selected holds are saved in English. | With **Email Language** on, change English to French and send. | All three French |
| UseSavedLanguages | French Venue. Event ticket and Membership holds saved in English. Product hold saved in French. | With **Email Language** off, send without a selection. | Event ticket and Membership English. Product French. |

| Language | Subject | Heading and link |
| --- | --- | --- |
| English | Complete your purchase from [Venue] | Items in your order:, Complete Purchase |
| French | Complétez votre achat de [Venue] | Articles dans votre commande :, Finaliser l’achat |

**Preconditions:**

- In QA Web Box Office or Electron Box Office, sign in as a Venue Employee with **Manage Holds**. Get the Venue and four active regular holds with stable links and distinct controlled recipient inboxes. One is for an Event ticket, one a Product, one a Membership and one is the unselected control. Record each hold’s name, item, quantity, price and address.
- The teammate preparing QA data confirms the saved Venue and hold languages, that bulk sending and the **Email Language** setting match your row, and supplies the normal QA delivery window in minutes. The Organizer confirms the standard regular-hold template in **Organization → Branding → Emails → Customization**.

**Parameters:**
BulkLanguage: ChooseFrench, UseSavedLanguages

**Tags:** holds, box-office, email

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **Box Office → Holds** for the prepared Venue. Check the boxes for the three recorded holds. Leave the control unchecked. | Event ticket, Product and Membership holds | Three selected rows match the run list. |
| Select **Send hold link**. Enter a short message with a fresh run identifier. Choose French if available for the selected row. | BulkLanguage and the same message for all three holds | The dialog says **Send hold link to 3 customers**. The language field opens in English for ChooseFrench. For UseSavedLanguages it is absent. |
| Note the time and select **Send** once. | Three selected recipients | The dialog closes, Showpass confirms submission and the selections clear. |
| Check the four inboxes and Spam through the normal QA delivery window. In each selected inbox, open the new message and check its recipient, wording and held items. | Recorded recipients, expectations for this row and run identifier | Each selected recipient receives one matching message. Its subject, heading and button match that hold’s expected language. Its message, item, quantity and amount are correct. The control receives no message for the run. |
| Open each invitation’s **Complete Purchase** or **Finaliser l’achat** button. Stop at the held order. | Three received hold links | Each link opens its own recorded hold with the correct item, quantity and price. |

**Postconditions:**

- Keep the hold references and delivery times. Leave all four checkouts unsubmitted.

## Receiving case review and verification

**QA Lead decision:** Ready for user review as drafts. The Masters traced the relevant paths, the Release Engineer checked the transfer of coverage, and Qase Police and the QA Lead returned wording and setup issues on the working cases. The owner made the two customization paths explicit, added the actual paper checks, and named the **Select all** step in the reprint flow. The QA Lead approved the exact revised fields. Draft fields SHA-256: `7d6c80d6d7a8728e188fa114110d5cef1bdaaa55216491b401fc061da173608b`.

### Qase publication and readback

On November 25, 2026, the approved batch updated Description, Preconditions, Postconditions, Steps and parameters on all five cases. A fresh Qase read matched the approved text, every action, data and expected result, and every parameter name, type and value. It also matched all 28 grouped rows on SPT-4398 and both platform rows on SPT-4149. Titles, tags and suite IDs match the original cases. SPT-4392 matches its original record in suite 624.

| Qase case | Verified saved parameters | Planned runs | Steps before → after |
| --- | --- | ---: | ---: |
| SPT-4157 | Single ItemType and Single CheckoutLanguage | 10 | 4 → 6 |
| SPT-4871 | Single ResendScenario | 5 | 7 → 6 |
| SPT-4398 | 28 paired rows for Platform, View, Delivery, OutputLanguage and LanguageSelector | 28 | 6 → 8 |
| SPT-4070 | Single HoldScenario | 5 | 5 → 5 |
| SPT-4149 | Keep paired WebBoxOffice/Desktop and Electron/Desktop. Add Single BulkLanguage | 4 | 6 → 5 |

For the TC-10 paired rows, use the 10 delivery values in the case table. Pair each with English and French under WebBoxOffice/Desktop and LanguageSelector=On. Add the first four additional rows with Electron/Desktop and LanguageSelector=On. For each client add EmailTicket/French and PrintTicketReceipt/English with LanguageSelector=Off. Use the maintained batch writer’s explicit parameters file for this group and for TC-12’s existing Platform/View pair plus BulkLanguage.

### Coverage retained from SPT-4392

| Legacy item and delivery rows | Draft proof |
| --- | --- |
| Public checkout, 4 rows | TC-8 checks each purchased item and keeps the receiving case’s separate delayed barcode run. |
| Box Office email, 4 rows | TC-10 checks the buyer’s receipt and each eligible item document. The gift-card row checks the recipient shown in the buyer’s confirmation. |
| Box Office paper receipt, 4 rows | TC-10 checks the printed receipt for each item. It also compares a thermal reprint with a full-page receipt printed from an opposite-language PDF. |
| Box Office paper ticket or pass, 2 rows | TC-10 checks the Event admission ticket and Membership pass on paper and from the same transaction’s reprint. |
| Individual hold-link email, 3 rows | TC-11 matches delivered language, recipient and link for Event ticket, Product and Membership holds. |
| Bulk hold-link email, 3 rows | TC-12 includes one hold for each item and checks an eligible unselected inbox. |
| My Orders resend, 3 rows | TC-9 verifies an existing order and its receipt, item or package details after the resend. |
| Dashboard Transactions resend, 4 rows | Remain on SPT-4392. |

The receiving drafts assign all 23 item/delivery rows. The selected scenarios use conflicting language settings to show which one controls the result. The proposed run list uses representative Electron and selector-off scenarios. It does not recreate the legacy same-language and different-language permutations for every item. TC-10 checks full-page ticket and pass output, including a Membership pass reprint in the saved purchase language. Thermal admission ticket layouts and one-time language overrides on Membership passes still need separate verification if required.

### Evidence and remaining verification

- Gift-card locale and delivery: backend `apps/financials/services/gift_card/gift_card_redemption_email_delivery.py`, `apps/financials/tests/services/gift_card/test_gift_card_recipient_email_translation.py` and `apps/notifications/services/confirmation_email/email_content/builder.py`.
- Attachments and delayed barcodes: backend `apps/notifications/services/confirmation_email/attachments/`, `apps/tickets/services/fulfillment/activate_delayed_ticket_barcodes.py` and `apps/main/templates/tickets/emails/ticket_confirmation.html`. Emailed receipt filenames use the translated label. Standard Event ticket filenames use the saved ticket, Event and holder names.
- Printing: frontend `PrintOrchestrator.ts`, `TransactionActions.web.tsx` and `BreakdownPanel.web.tsx`. Backend `apps/financials/models/invoice_management/invoice.py`, `apps/financials/receipts/square.py` and the standard ticket and Membership PDF templates.
- Hold links: frontend `Hold.web.tsx`, `SendHoldLinkModal.web.tsx` and `BulkSendHoldLinkModal.web.tsx`. Backend `apps/tickets/services/holds/hold_link_email_request_preparation.py`, `hold_link_notification_delivery.py` in the same folder and `apps/main/templates/tickets/emails/hold_link_notification.html`. Selecting a send language saves it on the hold. With no selector, the saved hold language takes precedence over the Venue.
- The saved receiving definitions and parameters have been verified in Qase. The gift-card delivery, print and reprint, and both hold-email product checks remain **Not run**.

## Transactions-only revision for SPT-4392

**QA Lead decision:** Ready as a written replacement. **Qase:** Published and verified on November 25, 2026. **Product execution:** Not run. The Organizer Tester owns the case. The Masters verified the same resend path for the four item types. The Release Engineer asked for the gift-card recipient and amount in the email check. Qase Police reviewed the case from the employee’s starting point, and the QA Lead approved the corrected fields.

The approved update replaced the title, description, preconditions, postconditions, steps and parameters. A fresh Qase read matched all six steps and the saved Single `ResendScenario` parameter, including all four values. The case kept its tags `core`, `localization`, `email`, and `post-purchase`. [SPT-4392](https://app.qase.io/case/SPT-4392)

The approved suite-only move from **Core - Post Purchase (624)** to **Transactions (103)** was applied on November 25, 2026. Readback verified the new suite and matched the existing case fields. [Transactions suite](https://app.qase.io/project/SPT?suite=103)

Draft fields SHA-256: `4746ab788315047f05c220ccf19a3a532872903feaaa6cf7484b3ff826398978`.

### TC-13: Resend the buyer’s confirmation from Dashboard Transactions

**Title:** Dashboard - Transactions - Resend the order confirmation in the correct language

**Description:** A Venue Employee resends a buyer’s confirmation from Transactions. Check the language offered to staff, the new email and the order it opens. Run each ResendScenario once (four runs).

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| ResendScenario | Item in the order | Venue / order language | Email language field | What to do | Expected email |
| --- | --- | --- | --- | --- | --- |
| TicketVenueDefault | Event ticket | French / English | On, starts in French | Keep French | French |
| ProductChooseEnglish | Product | French / French | On, starts in French | Choose English | English |
| MembershipSavedOrder | Membership | English / French | Off, field absent | Send without a choice | French |
| GiftCardChooseFrench | Venue gift card | English / English | On, starts in English | Choose French | French |

| Item in the order | Additional check |
| --- | --- |
| Event ticket with electronic delivery | The ticket PDF or download link opens for the same Event, ticket type and holder. Check **Ticket Type / Type de billet**. |
| Product with a confirmation PDF | The Product PDF or download link opens for the same Product and variant. Check **Product / Produit**. |
| Membership that issues an emailed pass | The Membership pass opens for the same holder and level. Check **Membership Level / Niveau d’adhésion**. |
| Venue gift card for a separate recipient | The buyer’s email shows the gift card, amount and recipient address. The buyer’s receipt identifies the card and amount. |

| Email language | Subject | Summary and order button | Attached receipt |
| --- | --- | --- | --- |
| English | Order confirmation - [Venue] | Order Summary, View Your Order | Receipt - [buyer].pdf, Amount Paid |
| French | Confirmation de commande - [Venue] | Résumé de la commande, Voir votre commande | Reçu - [buyer].pdf, Montant payé |

**Preconditions:**

- **Employee.** Sign in to the QA Dashboard in English with **Manage Transactions** and **Administer Transactions**.
- **Venue and order.** Get the Venue and Order ID for your row from the teammate preparing QA data. They verify the saved Venue and order languages, that the Venue delivers confirmations, and whether **Email language** is available for this employee in **Transactions**. Use one completed checkout with one item, a controlled buyer inbox, and access to that buyer’s account. Record the item, quantity and total. For a gift card, also record the original recipient and denomination.
- **Standard email.** The Organizer confirms the default purchase confirmation under **Organization → Branding → Emails → Customization** for the Venue and any applicable Event or Membership Group.

**Parameters:**
ResendScenario: TicketVenueDefault, ProductChooseEnglish, MembershipSavedOrder, GiftCardChooseFrench

**Tags:** core, localization, email, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Select the prepared Venue in the Dashboard. Open **Operations → Box Office → Transactions** and search by **Transaction ID**. Enter the prepared Order ID. | Prepared buyer order | The buyer, item, quantity and total match the order. |
| Open the sale’s three-dot **Transaction actions menu → Resend confirmation email**. | Buyer email and ResendScenario row | The **Resend email** dialog shows the buyer in **Email address**. With the selector on, **Email language** starts in the Venue language shown in the row. With the selector off, the field is absent. |
| Keep the buyer’s address. Apply the language choice in your row. Record the time, then select **Send** once. | ResendScenario row | The Dashboard shows **Email sent**. |
| Open the confirmation delivered to the buyer after the recorded time. Read the subject, summary heading, button and instructions. | Expected language and recorded order | The new confirmation is addressed to the buyer. The wording matches the language row and the buyer, Venue and item match the order. For a gift card, the email shows the recorded recipient address and amount. |
| Open the attached receipt and any expected item file or link. | Expected item and attached receipt label | The receipt filename and amount label match the language row. The receipt, purchased item and total agree with the recorded order. The item PDF uses the expected label from the table when one applies. |
| Select the order button in the email while signed in as the buyer. | Order ID recorded before sending | The button opens that same Order ID. |

**Postconditions:**

- Keep the Order ID and delivery time. Have the teammate who prepared the order confirm its saved language still matches the original value. Keep ticket barcodes and gift-card codes out of shared evidence.

## Coverage and evidence

| Outcome | Planned proof or boundary |
| --- | --- |
| Original order and usable link | TC-1 contrasts the final website language with both the initial cart and the Venue. |
| Buyer recovery, stored default, legacy fallback | TC-2 checks the buyer’s one-off choice, an order-level language without a selector, and a verified language-less older order at a French Venue. The last row requires a suitable fixture. With no supported language saved on the order or Venue, the server falls back to English. Both missing is a source-level boundary without an ordinary UI setup. |
| Email independent of any purchase | TC-3 checks a signed-out password reset to an active Customer’s actual inbox. |
| Staff-triggered email to a Customer | TC-4 checks a per-send choice and Venue default against the original stored purchase. TC-5 checks fixed and per-sale language on the initial sale. |
| Email received by the Venue | TC-6 separates Showpass’s translated fields from the Customer’s unaltered words and reply address. |
| Later mail to two recipients | TC-7 checks a single scheduled Event send, latest purchase for the same address, personal greeting, and duplicate suppression. Queue availability and older-order fixtures are unverified. |
| Other notification families | The public Event resend has no per-send language selector and requires an allowlisted Venue. It uses the stored-order chain. Ordinary refund mail to the buyer and scheduled Event reminders use the Venue language. Separate gift-card, transfer, waitlist, and marketing templates have different setup or recipients. These flows have no delivered-mail check in this draft. |

**Evidence basis.** The email expectations come from local source at `web-app@5184fb7ed70ed5ccab2e0467345ea9127c331eb5` and `showpass-frontend@97f404b2d2bf7c0084436358152a2dbd0a9c77e9`. The Qase placement recommendations come from the November 25 inventory above. Live fixtures, email delivery and deployment remain unverified.

| Source | What it establishes |
| --- | --- |
| Backend `apps/core/translation.py` (`get_effective_language`), `apps/tickets/api/user_based/serializers/basket_checkout.py` (`website_language`), `apps/tickets/models/order_management/order_basket.py` (`handle_post_purchase_task_links`), `apps/tickets/services/fulfillment/purchase_confirmation_email_delivery.py`, `apps/financials/api/invoice_notifications.py`, `apps/notifications/services/confirmation_email/email_content/builder.py`, `apps/main/templates/tickets/emails/ticket_confirmation.html`, French `django.po` | Saved order → payment Venue → English, one-off override, enabled delivery gate, translated subject and summary, order button. |
| Frontend `NavBarLocaleMenu.web.tsx`, `PublicBasketLanguageObserver.tsx`, `public-basket-language-sync.ts`, `OrderOptionsList.web.tsx`, `MyOrdersResendEmailModal.web.tsx`, `useResendEmailModal.ts`, `LanguageSettings.web.tsx`, Box Office `Checkout.web.tsx` | Public language switch, existing basket save, buyer/staff resend controls and defaults, Box Office modes. |
| Backend `apps/main/api/auth/forms.py`, `apps/main/templates/account/email/password_reset_key_{subject.txt,message.html}`, `apps/users/tests/models/test_account_access_email_translation.py`. Frontend `PasswordReset.web.tsx`, `PasswordResetForm.web.tsx` | Active account, sent message text, retry window and reset entry. |
| Backend `apps/venues/admin/venue_admin.py`, `apps/tickets/admin/baskets.py`, `apps/main/admin/rollout_configuration.py`, `apps/venues/services/support/support_inquiry_submission.py`, `apps/notifications/email_composition/organizer_notifications.py`, `apps/notifications/tests/email_composition/test_operator_email_translation.py`. Frontend `ContactPage.web.tsx`, `ContactDetails.tsx` | Selected Venue language, support contact controls, destination, reply address, localized labels and literal submitted values. |
| Backend `apps/emails/models/attendee_notifications.py`, `apps/emails/tests/attendee_notifications/test_post_event_recipient_language.py`, `apps/tickets/services/event_management/post_event_notification_scheduling.py`, `settings.py` (`CELERY_TIMEZONE`, hourly at minute 25 UTC). Frontend `PostEventEmailsPage.web.tsx`, `EventAdvancedFields.web.tsx` | Latest qualifying purchase for each recipient in the same Event and Venue, deduplication, saved settings and delivery eligibility. The page’s “within an hour” help text differs from the scheduler. |
| Backend `apps/tickets/services/fulfillment/purchase_confirmation_resend.py`, `apps/tickets/services/fulfillment/refund_email_delivery.py`, `apps/tickets/services/event_management/event_reminder_email_fanout.py` | Separate public resend, refund and reminder language behavior. |

Vault references: [[00 Start Here/Showpass QA Handbook/Playbooks/01 Payments and Orders]], [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]].

## QA City draft review

**QA Lead decision for revision 7 — Ready to use with the specified test data.** Qase Police read all seven cases individually. The Release Engineer checked the email and timing expectations. The independent QA Lead approved the same seven cases. Execution remains **Not run**.

| Revision | Decision | What the reviewers found |
| --- | --- | --- |
| 1 | Changes requested | Every staff resend expected French. A system that always sent French could pass. The buyer’s resend also opened with the website, Venue and order all in English, so the test could accept the wrong default. |
| 2 | Changes requested | The resend cases now distinguished those inputs. The Box Office case still needed to check the displayed fixed language. The post-event case needed exactly two intended recipients and a deadline calculated in the scheduler’s UTC timezone. |
| 3 | Ready to use | Both Masters and Qase Police rechecked the corrections. The Release Engineer recommended approval. The independent Lead confirmed the fixes against the submitted cases. The local Qase parser read seven cases, their steps and all six sets of parameter values. |
| 4 | Ready to use | The earlier review accepted a developer lookup as a manual prerequisite. Each affected case now names the required Venue language, who confirms it and how the tester uses the prepared Venue or order. All seven cases still parse with the same 34 steps and parameter choices. |
| 5 | Changes requested | Qase Police and the Release Engineer found that counting from the final Send could miss an earlier email sent by Cancel. The owner moved the inbox check before the first resend click. |
| 6 | Revised before sign-off | The new timing checks made every purchase test count duplicates. The owner kept those checks in the resend and scheduled thank-you cases. The other receipt cases identify the new message and open its order. |
| 7 | Ready to use | Qase Police, the Release Engineer and the independent QA Lead accepted the revised fields. TC-2 checks the inbox after Cancel, then expects one new confirmation across the whole attempt. TC-7 checks each recipient through the supplied local deadline. |

Revision 7 case fields have SHA-256 `1f3d14d601182f45e23554215d024057a1cd9e0a78d42d1f6ff2b0a139f7bb34`. The legacy-order row needs an older order with an empty saved language. The post-event case needs verified scheduled delivery to two controlled QA inboxes.

## Coverage map regression in QA City

The isolated City run used the original short Customer and Venue email-language prompt with committed checkout and hold-link excerpts. A separate replay used the same prompt with a seeded first revision containing valid checkout and hold checks. The replay’s submitted second revision omitted the hold check, allowed either Venue language, and told the Customer to read browser Network traffic.

| Injected problem | Saved City result |
| --- | --- |
| The checkout case accepted either Venue language | Coverage row 1 changed from **Covered** to **Missing**. The engineer showed how a French payment Venue could mask an ignored checkout change. |
| The split dropped the hold invitation | Coverage row 2 changed from **Covered** to **Missing**. The diff retained the earlier hold step so the tester could restore the recipient, language and destination checks. |
| The Customer was told to open Network and read an HTTP response | Qase Police quoted the prerequisite as a required change during its standalone read. |

The QA Lead returned replay revision 2 with **Changes requested** and an empty request for user input. City saved revision 3 on the same assignment without another start. The new coverage map marked the restored individual hold check and the English Venue/French checkout as **Covered**. The first rewrite still put a Network lookup in a setup bullet. The author and engineering instructions now send that diagnostic to review notes and give the tester the prepared record and confirmed value.

The fresh run began with opposing checkout and Venue languages. The QA Lead returned revision 1 over remaining hold and evidence gaps, and City saved revision 2 automatically. During the run I fixed validation failures in the technical citations and engineering handoff, then resumed the saved stages. The regression check ended after City demonstrated the automatic handoff in both runs. Final draft sign-off and product execution remain pending.
