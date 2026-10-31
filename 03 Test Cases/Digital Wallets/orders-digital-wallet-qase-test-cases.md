---
title: Orders digital wallet — Qase-ready cases
date: 2026-10-29
tags:
  - qa/test-cases
  - qase
  - my-orders
status: Published and full-field verified; product tests not executed
published: 2026-10-30
organized: 2026-10-30
titles_updated: 2026-10-30
---

# Orders digital wallet — Qase-ready cases

Read all **16 cases** in [Wallet, Barcodes & Receipts, suite 1015](https://app.qase.io/project/SPT?suite=1015), plus related coverage from a complete SPT snapshot. **SPT-3794 needs a split by action and item behavior, not just fewer steps.** On **2026-10-30**, the approved batch updated **SPT-3794 and SPT-4129** and created **SPT-5848–5861** in suite 1015. All 16 saved cases were read back and their written fields verified. The parent suite’s full set of 30 cases has since been organized into seven child folders, with unchanged case content verified. Ticket and product saving have separate cases for both selecting one item and adding an entire order. Membership saving stays in **one case**, with benefit setups as parameters. Only Qase test definitions changed; no purchases, wallet saves, admissions or other Showpass business-record changes were performed.

**Title cleanup completed:** [[#Consistent case titles — published, 2026-10-30|All 30 verified title changes]] use the requested Core - User - My Orders prefix. All other case content and folder assignments were verified unchanged.

The cases protect a customer's access to the correct purchased items: the saved pass must belong to the selected ticket, product, member or order. Native Wallet checks require physical devices. App bulk-saving differences and other unresolved checks remain explicit after the cases.

## My Orders → open an order → add items to a wallet

### SPT-3794: Core - User - My Orders - Add all tickets in an order to a wallet

Published split of [SPT-3794](https://app.qase.io/case/SPT-3794), retaining suite 1015; updated and full-field verified on 2026-10-30. Product whole-order saving is now SPT-5860 (TC-13). Selected-ticket, selected-product and membership coverage is SPT-5848 (TC-1), SPT-5861 (TC-14) and SPT-5849 (TC-2). Unrelated Qase fields were preserved.

**Current folder:** [Tickets](https://app.qase.io/project/SPT?suite=1233) (1233), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add all tickets in an order to a wallet

**Description:** Save all tickets from an order containing only ordinary event tickets. Check the final saved passes, rather than stopping at a download or provider preview. Run each OrderSize in iPhone Safari, Android Chrome and the Showpass customer app on iOS: six runs. Repeat Two in Mac Safari with an iPhone connected to the same Apple Account and iCloud configured for Safari: one further run. Open Apple Wallet on that iPhone for the saved-pass checks. These are seven planned runs, not executed results. The Android customer app bulk action is held separately below.

| OrderSize | Number of tickets with individual passes |
| --- | --- |
| Two | 2 |
| Ten | 10 |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| WebPublic | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed in and owns a completed order containing only the two or ten tickets selected by OrderSize; the order uses individual ticket barcodes, not an Order Barcode.
* All tickets are ordinary event tickets with electronic delivery and released barcodes. None grants livestream access.
* All tickets are activated and unused, required after-purchase questions are complete, and none is awaiting payment, transferred, listed for resale, hidden from the customer or already saved in the selected wallet.
* Record the ticket names, attendee details and quantity before saving. The selected device can complete the provider's Add flow.

**Parameters:**
OrderSize: Two, Ten

**Tags:** my-orders, tickets, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared ticket order. | Recorded order and ticket list | The expected two or ten tickets are available. |
| Select Add to Apple Wallet or Add to Google Wallet beneath a ticket. | Apple on Safari or the iOS app; Google on Android Chrome | The Add tickets to wallet dialog offers Add just this ticket and Add entire order. |
| Select Add entire order. | | The provider opens the complete prepared set of ticket passes. |
| Complete the provider's Add action for the presented passes. | | The prepared tickets are saved to the selected wallet. |
| Close and reopen the wallet, then inspect each saved ticket. | Recorded ticket list | Exactly two or ten distinct intended ticket passes are present, with no omitted ticket or another attendee's details. |
| Return to My Orders and reopen the same order. | | Its purchased tickets, quantity and order total remain unchanged. |

**Postconditions:**

* Remove only the ticket passes added for this run after recording the saved-pass result; retain the Showpass order.
* Record device, OS, browser, wallet and ticket count with the result. A Mac preview or downloaded bundle alone does not pass the iPhone saved-pass check.

### SPT-5848: Core - User - My Orders - Add only the selected ticket to a wallet

Published from local draft **TC-1** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Tickets](https://app.qase.io/project/SPT?suite=1233) (1233), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add only the selected ticket to a wallet

**Description:** Display the second ticket in an order and save only its pass. This checks that the wallet action follows the displayed ticket and does not save the first ticket or the whole order. Run every TicketSetup on iPhone Safari and Android Chrome. Repeat OrdinaryTicket in the Showpass customer app on both phones and in Mac Safari with a connected iPhone on the same Apple Account and iCloud configured for Safari. Inspect the Mac-started save in the iPhone's Apple Wallet.

| TicketSetup | Required two-ticket order |
| --- | --- |
| OrdinaryTicket | Two unused electronic tickets of the same ticket type with different recorded attendee names |
| WillCallDigital | Two unused tickets of the same ticket type with Will Call delivery and sending digital tickets with Will Call enabled |
| MultiScanRemaining | Two activated tickets of the same ticket type allowing repeated scans, each with at least one permitted scan remaining |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| WebPublic | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed in and owns the completed order matching TicketSetup. It contains exactly two visible tickets of the same ticket type with individual barcodes, not an Order Barcode.
* Both tickets are activated and available for use; required after-purchase questions and payment are complete, and neither ticket is being transferred or resold.
* Record both tickets' attendee names and distinguishing details. Neither pass is already in the selected wallet.
* The phone has Apple Wallet or Google Wallet ready to accept passes. The MultiScanRemaining run has a recorded remaining allowance and will not perform a scan.

**Parameters:**
TicketSetup: OrdinaryTicket, WillCallDigital, MultiScanRemaining

**Tags:** my-orders, tickets, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared ticket order. | | Both purchased tickets are available. |
| Select Next qrcode to display the second ticket. | Recorded second ticket | The displayed attendee and ticket details identify the second ticket. |
| Select the displayed ticket's Add to Apple Wallet or Add to Google Wallet action. | | The Add tickets to wallet dialog opens. |
| Select Add just this ticket. | | The provider opens only the displayed second ticket's pass. |
| Complete Add, then close and reopen the wallet. | | Only the second ticket's pass was added and its details match that ticket. |
| Return to the order and display the first ticket. | Recorded first ticket | The first ticket is unchanged and has not been substituted into the saved pass. |

**Postconditions:**

* Remove only the newly added ticket pass after recording the result; retain the order.
* The order quantity, total and any remaining scan allowance stay unchanged.

### SPT-5860: Core - User - My Orders - Add all products in an order to a wallet

Published from local draft **TC-13** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Products](https://app.qase.io/project/SPT?suite=1234) (1234), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add all products in an order to a wallet

**Description:** Save all product passes from an order containing only products. Check the final saved product and variant identities, rather than stopping at a download or provider preview. Run each OrderSize in iPhone Safari, Android Chrome and the Showpass customer app on iOS: six runs. Repeat Two in Mac Safari with an iPhone connected to the same Apple Account and iCloud configured for Safari: one further run. Inspect the final saved passes on that iPhone. These are seven planned runs, not executed results. The Android customer app bulk action is held separately below.

| OrderSize | Number of purchased product items with individual passes |
| --- | --- |
| Two | 2 |
| Ten | 10 |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| WebPublic | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed in and owns a completed order containing only the two or ten product items selected by OrderSize; the order uses individual product barcodes, not an Order Barcode.
* Every product item is activated, paid and unused, with a released digital barcode and pass. Required after-purchase questions are complete.
* No product is transferred, listed for resale, hidden from the customer or already saved in the selected wallet.
* Include at least two distinguishable product or variant names. Record each purchased product, variant, quantity and shipping or pickup status before saving.
* The selected device can complete the provider's Add flow.

**Parameters:**
OrderSize: Two, Ten

**Tags:** my-orders, products, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared product order. | Recorded order and product list | The expected two or ten purchased product items are available. |
| Select Add to Apple Wallet or Add to Google Wallet beneath a product. | Apple on Safari or the iOS app; Google on Android Chrome | The Add tickets to wallet dialog offers Add just this ticket and Add entire order. |
| Select Add entire order. | | The provider opens the complete prepared set of product passes. |
| Complete the provider's Add action for the presented passes. | | The prepared product items are saved to the selected wallet. |
| Close and reopen the wallet, then inspect every saved product pass. | Recorded product and variant list | Exactly two or ten intended product passes are present, with no omitted item or another product's variant details. |
| Return to My Orders and reopen the same order. | Recorded shipping or pickup status | Its purchased products, quantities, order total and shipping or pickup status remain unchanged. |

**Postconditions:**

* Remove only the product passes added for this run after recording the result; retain the Showpass order.
* Record device, OS, browser, wallet and product count with the result. Saving has not redeemed a product or fulfilled shipping.

### SPT-5861: Core - User - My Orders - Add only the selected product to a wallet

Published from local draft **TC-14** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Products](https://app.qase.io/project/SPT?suite=1234) (1234), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add only the selected product to a wallet

**Description:** Select a product in an order containing two distinguishable products or variants and save only its pass. Check that the saved pass belongs to the selected product and that the other product is not added. Run every ProductSetup on iPhone Safari and Android Chrome. Repeat ProductVariant in the Showpass customer app on both phones and in Mac Safari with a connected iPhone on the same Apple Account and iCloud configured for Safari. Inspect the Mac-started save in the iPhone's Apple Wallet.

| ProductSetup | Required two-product order |
| --- | --- |
| ProductVariant | Two unused product items with different variant names, such as two available sizes |
| ProductWillCall | Two distinguishable unused product items purchased with Will Call delivery and released digital barcodes |
| ProductShipping | Two distinguishable unused product items purchased with shipping delivery and released digital barcodes |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| WebPublic | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed in and owns the completed order matching ProductSetup. It contains exactly two visible product items with individual barcodes, not an Order Barcode.
* Both product items are activated, paid and unused, with digital passes available and required after-purchase questions complete. Neither is being transferred or resold.
* Choose two distinguishable product or variant names shown on separate order cards. Record which is the first product and which is the selected second product; neither pass is already in the selected wallet.
* Record each product's shipping or pickup status. The selected device can complete the provider's Add flow.

**Parameters:**
ProductSetup: ProductVariant, ProductWillCall, ProductShipping

**Tags:** my-orders, products, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared product order. | | Both recorded products or variants are available. |
| Locate the card for the recorded second product or variant. | Selected product and variant name | The displayed card identifies the intended second product. |
| Select Add to Apple Wallet or Add to Google Wallet beneath that product. | | The Add tickets to wallet dialog opens. |
| Select Add just this ticket. | | The provider opens only the selected product's pass despite the ticket wording on the control. |
| Complete Add, then close and reopen the wallet. | Recorded product and variant | Only the selected product's pass was added, with the correct product and variant details. |
| Return to the order and inspect the first product and both shipping or pickup statuses. | Recorded starting details | The first product is unchanged and neither item has been redeemed or fulfilled by saving a pass. |

**Postconditions:**

* Remove only the selected product's newly added pass after recording the result; retain the order.
* Purchased quantities, order total and shipping or pickup status stay unchanged.

### SPT-5849: Core - User - My Orders - Add memberships with different benefits to a wallet

Published from local draft **TC-2** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Memberships](https://app.qase.io/project/SPT?suite=1235) (1235), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add memberships with different benefits to a wallet

**Description:** Add a member's pass from their purchase order regardless of which benefits the membership provides. A benefit is an included right, such as admission, a discount or tickets issued to the member. The membership pass identifies the member; it is not a separate pass for every benefit or issued event ticket. Run every BenefitSetup on iPhone Safari and Android Chrome. For each setup, repeat the same steps for each of two members in the prepared order, checking that the action follows the member currently displayed. Repeat MixedBenefits in the Showpass customer app on iOS and Android, and in Mac Safari with a connected iPhone on the same Apple Account and iCloud configured for Safari. Inspect Mac-started saves in the iPhone's Apple Wallet.

| BenefitSetup | Membership configuration to find or prepare |
| --- | --- |
| EventScanAccess | Event Scan Access benefit granting entry to selected event ticket types |
| DailyScanAccess | Daily Scan Access benefit granting daily membership entry |
| Discount | Discount benefit applying to an eligible ticket or product |
| IssueTicketsGa | Issue Tickets benefit that supplies general-admission tickets without reserved seating |
| IssueTicketsSection | Issue Tickets benefit with an assigned reserved section or location |
| IssueTicketsSeat | Issue Tickets benefit with an assigned reserved seat |
| MultipleIssueTickets | Two Issue Tickets benefits for different events, with their issued items distinguishable |
| MixedBenefits | An Issue Tickets benefit plus a Discount benefit; both apply to the selected membership level |
| NoBenefits | No benefits on the membership group or selected level |

Use an active Seasonal membership for IssueTicketsSeat and an active Yearly membership for IssueTicketsGa. Use a lifetime member for NoBenefits so no expiry is expected. Record the actual expiry for other runs. The different renewal choices are selected examples, not every renewal/benefit pairing.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| WebPublic | Desktop |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed in and owns a completed order containing two active, unexpired memberships matching BenefitSetup, with different recorded member names or Member IDs.
* Each member has a released barcode, neither membership is being transferred, and the order uses individual member barcodes rather than an Order Barcode.
* Reuse existing memberships matching the table, or have an employee who can Manage Memberships prepare the group/level benefits and supported seat or section assignments before the purchases. Do not change benefits while executing the saving steps.
* Record each member's group, level, name, expiry and any existing issued-ticket and benefit-use information. Neither membership pass is already saved on the selected device.

**Parameters:**
BenefitSetup: EventScanAccess, DailyScanAccess, Discount, IssueTicketsGa, IssueTicketsSection, IssueTicketsSeat, MultipleIssueTickets, MixedBenefits, NoBenefits

**Tags:** my-orders, memberships, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the membership purchase order. | | The purchased memberships are available in the order. |
| Use the membership's arrows to display the member selected for this run. | Recorded member name or Member ID | The displayed member matches the intended membership. |
| Select Add to Apple Wallet or Add to Google Wallet beneath that membership. | | The provider opens that member's membership pass without requiring Add entire order. |
| Complete Add, then close and reopen the phone's wallet. | | One membership pass for the selected member is saved. |
| Inspect the saved pass and its details. | Recorded group, level, name and expiry | Group, level and member identity match; the expiry matches when one exists, and the lifetime member has no invented expiry. |
| Return to Showpass, open Memberships in the customer's account and select the recorded membership. | Recorded benefit-use and issued-ticket information | The member retains the same benefits and issued items; saving the pass has not used admission or issued another set of tickets. |

**Postconditions:**

* After both member runs, two distinct member passes are saved, with no member's details copied onto the other's pass. Remove only those passes after recording the result.
* Retain memberships, orders and assigned seats or sections. Do not redeem benefits or scan a member as part of this test.

### SPT-4129: Core - User - My Orders - Add two NFC tickets to a wallet one at a time

Published split of [SPT-4129](https://app.qase.io/case/SPT-4129), updated and full-field verified on 2026-10-30. Its whole-order option is now SPT-5850 (TC-3), with Android app bulk behavior explicitly unresolved below. Suite 1015 and unrelated Qase fields were preserved.

**Current folder:** [NFC Tickets](https://app.qase.io/project/SPT?suite=1236) (1236), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add two NFC tickets to a wallet one at a time

**Description:** Save each of two NFC-only tickets from the same order, using the selected-ticket action for each. NFC means phone tap admission. Run on iPhone Safari, Android Chrome, and the Showpass customer app on both operating systems. This case covers ordinary successful saving for a customer whose wallet account is already linked; first-time linking is separate setup and remains an identified gap.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed in and owns a completed order with exactly two activated, unused NFC-only tickets; neither is being transferred or resold.
* The Venue setting enable_use_nfc_ticket is on and enable_order_barcode is off. The event's is_nfc_pass_only setting was enabled before purchase.
* Required after-purchase questions and payments are complete. The customer has already completed the provider's required account-linking setup on the controlled phone.
* Record both tickets' attendee, event and seat or section details. Neither ticket is already installed in the selected wallet.

**Tags:** my-orders, tickets, nfc

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared NFC order. | | Both purchased tickets can be selected, and no static PDF ticket download is offered for them. |
| Display the first ticket and select its wallet action, then Add just this ticket. | | The provider opens the first ticket's NFC pass. |
| Complete Add and return to the order. | | The first ticket is saved and the order remains accessible. |
| Display the second ticket and select its wallet action, then Add just this ticket. | | The provider opens the second ticket's NFC pass rather than the first ticket again. |
| Complete Add, then close and reopen the wallet. | | Two distinct NFC passes are saved with the recorded ticket identities. |
| Inspect both saved passes. | Recorded ticket details | Each matches its event, attendee and assigned seat or section, without exposing a static admission barcode. |

**Postconditions:**

* Remove only these two saved passes after recording the result; retain the order and the customer's account-linking setup.
* No admission has been used. A saved NFC pass does not establish that a reader accepted a tap.

### SPT-5850: Core - User - My Orders - Add all NFC tickets in an order to a wallet

Published from local draft **TC-3** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [NFC Tickets](https://app.qase.io/project/SPT?suite=1236) (1236), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add all NFC tickets in an order to a wallet

**Description:** Save both NFC tickets together from an order instead of adding each ticket separately. Run in iPhone Safari, Android Chrome, and the Showpass customer app on iOS with a customer whose wallet account is already linked. NFC means phone tap admission. The Android customer app's bulk action needs separate verification before it is included in this executable device set.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:**

* The signed-in customer owns an order with exactly two activated, unused NFC-only tickets and has already completed required wallet account linking on the phone.
* The Venue setting enable_use_nfc_ticket is on, enable_order_barcode is off, and the event had is_nfc_pass_only enabled before purchase.
* Both items have completed payment and required after-purchase questions, are not being transferred or resold, and are not already saved in the wallet.
* Record both tickets' attendee, event and seat or section details.

**Tags:** my-orders, tickets, nfc

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the NFC order. | | Both tickets are available without a static PDF ticket download. |
| Select a ticket's wallet action. | | The Add tickets to wallet dialog includes Add entire order. |
| Select Add entire order. | | The provider presents the two intended NFC passes. |
| Complete the provider's Add action, then close and reopen the wallet. | | Both distinct tickets are saved once. |
| Inspect each saved pass and return to the order. | Recorded ticket details | Both identities are correct, no static admission barcode is exposed, and the original order remains accessible. |

**Postconditions:**

* Remove only these two passes after recording the result; retain the order and account linking.
* No NFC reader or admission action is included.

### SPT-5851: Core - User - My Orders - Add all item passes from a mixed order to a wallet

Published from local draft **TC-4** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Orders and Receipts](https://app.qase.io/project/SPT?suite=1237) (1237), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add all item passes from a mixed order to a wallet

**Description:** Save all eligible items in one order containing tickets, a product and a membership. Check that the member pass is included even though the dialog is opened beneath a ticket. Run in iPhone Safari and Android Chrome. Native-app bulk saving is excluded from this runnable device set until its separate item-selection difference has been verified.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Preconditions:**

* The signed-in customer owns a completed order containing two ordinary electronic tickets, one product with a digital barcode and one active, unexpired membership.
* The order uses individual barcodes, every item is activated and usable, and all payments and required after-purchase questions are complete.
* No item is being transferred or resold. All four items have passes available and none is already saved to the selected wallet.
* Record the four item identities and the membership's group, level and member name.

**Tags:** my-orders, orders, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared order. | | Its tickets, product and membership match the four recorded items. |
| Select a ticket's wallet action, then Add entire order. | | The provider presents all four intended passes, including the membership. |
| Complete the provider's Add action. | | The selected wallet saves the presented items. |
| Close and reopen the wallet and inspect all four passes. | Recorded item list | The two tickets, product and member are each represented once with their own details. |
| Return to the order. | | The four original items and order total remain unchanged. |

**Postconditions:**

* Remove only the four passes added by this run after recording the result; retain the order and membership.
* Saving has not fulfilled the product, used admission or used a membership benefit.

### SPT-5852: Core - User - My Orders - Save package passes for the selected barcode setting

Published from local draft **TC-5** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Tickets](https://app.qase.io/project/SPT?suite=1233) (1233), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Save package passes for the selected barcode setting

**Description:** A package sells several included items together. Verify that its wallet passes follow the purchased package's barcode setting. Run each PackageBarcode in iPhone Safari and Android Chrome. Repeat the same steps for every pass listed by the selected setup, saving one selected item at a time.

| PackageBarcode | Required package and intended passes |
| --- | --- |
| ParentOnly | One purchased package containing two included ordinary event tickets, with the package configured to use its parent barcode; save the one visible package pass |
| SeparateChildren | One purchased package containing two included ordinary event tickets, with separate child barcodes and a non-redeemable parent; save each of the two visible included-ticket passes |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Preconditions:**

* The customer is signed in and owns a completed package order matching PackageBarcode; the order does not use an Order Barcode.
* The intended redeemable items are activated, paid, unused and electronically delivered, with required after-purchase questions complete and no transfer or resale in progress.
* Record the purchased package name, both included event/ticket names and the expected visible pass list from the selected setup. None is already saved to the wallet.

**Parameters:**
PackageBarcode: ParentOnly, SeparateChildren

**Tags:** my-orders, packages, tickets

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the package order. | Selected setup's expected visible pass list | The one package pass or two separate included tickets are available as configured. |
| Display the intended pass and select its wallet action. | One listed package or included-ticket pass | The wallet action is associated with that visible item. |
| Select Add just this ticket if the selection dialog opens, then complete the provider's Add action. | | The intended pass is saved. |
| Close and reopen the wallet and inspect the saved pass. | Recorded package or included-ticket details | The pass belongs to the selected visible item and does not substitute a hidden package child or non-redeemable parent. |

**Postconditions:**

* After all listed passes have been saved, ParentOnly has one package pass and SeparateChildren has two distinct included-ticket passes.
* Remove only those passes after recording the result; retain the purchase and unused admission.

### SPT-5853: Core - User - My Orders - Save the Order Barcode as one wallet pass

Published from local draft **TC-6** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Orders and Receipts](https://app.qase.io/project/SPT?suite=1237) (1237), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Save the Order Barcode as one wallet pass

**Description:** Save the order's own barcode instead of assuming every wallet action produces an individual ticket. Run in iPhone Safari and Android Chrome. The saved pass represents the order and may direct the customer to Showpass for its full contents; it need not list every purchased item on its face.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Preconditions:**

* The signed-in customer owns a completed order made while the Venue setting enable_order_barcode was on; the order itself has use_order_barcode on and displays Order Barcode.
* The order has exactly one ordinary unused event ticket and one active membership, with payment and required after-purchase questions complete. Neither is in transfer or resale.
* Record the displayed order barcode privately and its event/organization. It is not already saved to the selected wallet. Do not place the barcode in shared evidence.

**Tags:** my-orders, orders, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared order. | | An Order Barcode and its purchased items appear. |
| Select Add to Apple Wallet or Add to Google Wallet beneath the Order Barcode. | | The provider opens the order's pass. |
| Complete Add, then close and reopen the wallet. | | One order pass is saved. |
| Inspect its barcode and details. | Privately recorded order identity | The pass uses the order barcode and correct organization/event, rather than the individual ticket or member barcode. |
| Return to the order. | | The same Order Barcode, ticket and membership remain available. |

**Postconditions:**

* Remove only this saved order pass after recording the result; retain the order and unused items.
* Saving does not establish which items a scanner would admit; order-barcode scanning is a separate check.

### SPT-5854: Core - User - My Orders - Add an Apple Wallet pass from an order of 11 tickets

Published from local draft **TC-7** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Tickets](https://app.qase.io/project/SPT?suite=1233) (1233), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add an Apple Wallet pass from an order of 11 tickets

**Description:** Verify that an iPhone customer can still save individual tickets when an order exceeds the ten-pass Apple bundle limit. Run in iPhone Safari and the Showpass customer app on iOS. Repeat the same steps for the first ticket and the eleventh ticket, recording the selected ticket before each run.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed in and owns an order with exactly eleven activated, paid, unused ordinary electronic tickets and individual barcodes.
* Payment and required after-purchase questions are complete; no ticket is being transferred or resold. All eleven have pass data.
* Record the first and eleventh tickets' distinguishing details. Neither is already in Apple Wallet on the controlled iPhone.

**Tags:** my-orders, tickets, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the eleven-ticket order. | | The order opens and its tickets can be selected. |
| Use the ticket arrows to display the selected first or eleventh ticket. | Recorded ticket | The displayed details match that ticket. |
| Select Add to Apple Wallet for the displayed ticket. | | The single-ticket Apple save flow opens without requiring an eleven-pass bundle. |
| Complete Add, then close and reopen Apple Wallet. | | The selected ticket is saved once with the correct identity. |
| Return to the order and select the other end of the ticket list. | | All eleven purchased tickets remain accessible. |

**Postconditions:**

* After the two runs, verify that the two saved passes belong to the first and eleventh tickets. Remove only those passes after recording the result.
* Retain the order; no admission has been used.

### SPT-5855: Core - User - My Orders - Cancel adding a pass without saving it

Published from local draft **TC-8** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Wallet Access and Recovery](https://app.qase.io/project/SPT?suite=1238) (1238), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Cancel adding a pass without saving it

**Description:** Leave the provider's save flow before confirming Add and verify that no pass was saved. Run on iPhone Safari and Android Chrome using the provider's visible Cancel or Back control. This case ends after cancellation; later successful saving is covered independently.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Preconditions:**

* The signed-in customer owns a completed order with one activated, paid, unused ordinary electronic ticket, no transfer or resale, and completed after-purchase questions.
* Apple Wallet or Google Wallet is available on the controlled phone, and the selected ticket has never been added there.
* Record the ticket identity and confirm that the wallet does not already contain its pass.

**Tags:** my-orders, post-purchase, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared order. | | The selected ticket and its wallet action are available. |
| Select the ticket's wallet action. | | The provider opens the intended ticket's save flow. |
| Select the provider's Cancel or Back control before confirming Add. | | The provider flow closes without a saved-pass confirmation. |
| Open the phone's wallet and look for the recorded ticket. | | No pass for that ticket has been added. |
| Return to Showpass and reopen the order. | | The ticket remains accessible with unchanged order details. |

**Postconditions:** No pass is added, and the Showpass order remains unchanged.

### SPT-5856: Core - User - My Orders - Add the same item again without a duplicate pass

Published from local draft **TC-9** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Wallet Access and Recovery](https://app.qase.io/project/SPT?suite=1238) (1238), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Add the same item again without a duplicate pass

**Description:** Repeat saving the same item from Orders and inspect the final wallet contents. Run every ItemType on iPhone Safari and Android Chrome. Provider wording may offer Add, Open or Update; the result must remain one pass for the same purchased item.

| ItemType | Required item |
| --- | --- |
| Ticket | One activated, paid, unused ordinary electronic ticket |
| Product | One activated, paid, unused product with a digital barcode |
| Membership | One active, unexpired membership with a released member barcode |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Preconditions:**

* The signed-in customer owns a completed one-item order matching ItemType, with payment and required after-purchase questions complete and no transfer or resale in progress.
* Exactly one pass for that item is already saved in the selected phone's wallet. Record its identity and current details.

**Parameters:**
ItemType: Ticket, Product, Membership

**Tags:** my-orders, post-purchase, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the order for the already saved item. | | Its wallet action remains available. |
| Select the wallet action and complete the provider's offered action for that item. | Add, Open or Update as presented | The provider handles the same purchased item without an error. |
| Close and reopen the phone's wallet and locate that item. | Recorded identity | Exactly one pass represents the item, with its correct details. |
| Reopen the Showpass order. | | The purchase, quantity and total remain unchanged. |

**Postconditions:** Remove the controlled item's pass after recording the result if it was prepared only for this run; retain the order.

### SPT-5857: Core - User - My Orders - Hide wallet actions for unavailable items

Published from local draft **TC-10** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Wallet Access and Recovery](https://app.qase.io/project/SPT?suite=1238) (1238), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Hide wallet actions for unavailable items

**Description:** Verify that an item whose present state prevents wallet access has no usable wallet-saving button. Run each UnavailableState in iPhone Safari and Android Chrome. This checks visible access on Orders; it does not prove that an old downloaded pass or a direct pass URL has been invalidated.

| UnavailableState | Record to select |
| --- | --- |
| WillCallWithoutDigital | Ordinary Will Call ticket with sending digital tickets with Will Call off |
| ShippedTicket | Ordinary event ticket purchased for shipping, rather than electronic or digital Will Call delivery |
| Livestream | Ticket that grants virtual stream access |
| NotActivated | Paid ticket whose delayed barcode release is still pending, with no released barcode |
| PaymentPending | Ticket whose payment plan is still pending and is not yet redeemable |
| QuestionsPending | Otherwise eligible ticket whose required after-purchase questions have not been completed |
| TransferPending | Ordinary ticket with a transfer still in progress |
| ResalePending | Ordinary ticket currently listed for resale |
| Refunded | Fully refunded ticket no longer included among usable purchased items |
| SingleUseSpent | Single-use ticket that has already been checked in |
| ScansExhausted | Repeated-scan ticket with no allowed scans remaining |
| ConfirmationExcluded | Ticket type excluded from confirmation delivery, with no wallet action permitted by that setting |
| ExpiredMember | Active membership whose expiry is in the past |
| InactiveMember | Membership whose status is not Active |
| MemberTransferPending | Active, unexpired member with a transfer in progress |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Preconditions:**

* The signed-in customer owns a prepared order containing the selected UnavailableState. Have its setup owner confirm that exact state before starting; do not create a refund, transfer, resale, admission or payment-plan change during this case.
* The order does not use an Order Barcode. All other conditions needed for ordinary wallet access are satisfied, so the selected state is the reason the item is unavailable.
* Record the selected item's name and its current status. Keep a separate eligible order available to confirm that wallet actions work for this customer and device.

**Parameters:**
UnavailableState: WillCallWithoutDigital, ShippedTicket, Livestream, NotActivated, PaymentPending, QuestionsPending, TransferPending, ResalePending, Refunded, SingleUseSpent, ScansExhausted, ConfirmationExcluded, ExpiredMember, InactiveMember, MemberTransferPending

**Tags:** my-orders, post-purchase, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared order. | Recorded item and status | The order opens in the expected state. |
| Locate the selected item among the order's current or unavailable items. | UnavailableState | The item is unavailable for wallet saving, including when it is omitted from the usable-item display. |
| Inspect its available actions without changing the order. | | No usable Add to Apple Wallet or Add to Google Wallet action is offered for that item. |
| Open the separate eligible order on the same device. | | Its wallet action is available, confirming that the selected unavailable item was not hidden by a general device or account problem. |

**Postconditions:** No order, payment, admission, transfer, resale or wallet state changes.

### SPT-5858: Core - User - My Orders - Show browser guidance for Apple and Google Wallet

Published from local draft **TC-11** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Wallet Access and Recovery](https://app.qase.io/project/SPT?suite=1238) (1238), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Show browser guidance for Apple and Google Wallet

**Description:** Verify the browser guidance shown when the order offers one wallet provider rather than the other. Run both BrowserContext values on real phones. This case verifies guidance only; it does not establish that every browser carrying a similar name or browser identifier can save a pass.

| BrowserContext | Available action | Guidance to expand | Expected instruction |
| --- | --- | --- | --- |
| IphoneSafari | Add to Apple Wallet | Looking for Google Wallet? | Open this page in Chrome to add to Google Wallet |
| AndroidChrome | Add to Google Wallet | Looking for Apple Wallet? | Open this page in Safari to add to Apple Wallet |

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Preconditions:**

* The signed-in customer owns a completed order with one activated, unused ordinary electronic ticket and completed payment and after-purchase questions.
* The ticket is not being transferred or resold and has digital pass links. Open the order in the browser specified by BrowserContext.

**Parameters:**
BrowserContext: IphoneSafari, AndroidChrome

**Tags:** my-orders, mobile-view, post-purchase

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open My Orders and select the prepared order. | BrowserContext | The mapped wallet action is available. |
| Expand the mapped Looking for wallet guidance. | Mapping in Description | The instruction names the mapped browser and wallet. |
| Collapse the guidance again. | | The instruction closes and the order remains accessible. |

**Postconditions:** No pass is added and the order is unchanged.

### SPT-5859: Core - User - My Orders - Block Apple Wallet saving while the iPhone app is offline

Published from local draft **TC-12** in suite 1015 on 2026-10-30; full-field readback verified. Product test not run.

**Current folder:** [Wallet Access and Recovery](https://app.qase.io/project/SPT?suite=1238) (1238), under Wallet, Barcodes & Receipts.

**Title:** Core - User - My Orders - Block Apple Wallet saving while the iPhone app is offline

**Description:** Attempt a single ordinary Apple Wallet pass save after the already-loaded Showpass customer app loses internet access. Verify the app's explicit offline message and that the pass was not saved. This case covers the iOS app's single-pass action; it does not claim the bulk action has the same offline handling.

| Platform | View |
| --- | --- |
| React Native Public | Mobile |

**Preconditions:**

* The customer is signed into the Showpass customer app on an iPhone with Apple Wallet available.
* A completed one-ticket order is already loaded, with an activated, paid, unused ordinary electronic ticket and no transfer, resale or outstanding after-purchase questions.
* The ticket is not already saved to Apple Wallet. Record its identity before temporarily disconnecting the controlled phone.

**Tags:** my-orders, mobile-view, edge-case

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Turn off the controlled iPhone's Wi-Fi and mobile data while leaving the order loaded. | | The phone has no internet connection. |
| Select the ticket's Add to Apple Wallet action. | | The app displays No internet connection and Please reconnect to add pass. |
| Dismiss the message and inspect Apple Wallet. | Recorded ticket | The attempted pass has not been added. |
| Restore the phone's original Wi-Fi and mobile-data settings and reopen the order. | | The same order and ticket remain accessible once the connection returns. |

**Postconditions:**

* Verify the phone's original connection settings are restored. Leave the order unchanged and do not delete it.
* A successful save after reconnecting is a separate recovery check, not a pass claimed by this case.

## Consistent case titles — published, 2026-10-30

**Requested naming:** every title starts with **Core - User - My Orders -**, followed by one short action that identifies the case's behavior. The folder supplies the grouping; do not add another long chain of User/Wallet/NFC/feature labels. Ticket, product, membership, NFC and shared checks remain distinguishable in the action wording.

**Title-only dry run passed for all 30 cases.** Each update payload contains only title. All existing IDs, folders, descriptions, prerequisites, steps, expected results, parameters, tags, priorities and automation settings stay outside the update payload. The approved batch has now been applied. Classification: wording refactor, with the existing scope and assertions preserved. The case headings and Title fields above now match the saved Qase titles.

| Case | Current folder | Previous title | Published title |
| --- | --- | --- | --- |
| [SPT-2924](https://app.qase.io/case/SPT-2924) | Tickets (1233) | Core - User - Wallet - Verify assigned seating details on Apple and Google Wallet passes | Core - User - My Orders - Show the correct seating details on a wallet pass |
| [SPT-3794](https://app.qase.io/case/SPT-3794) | Tickets (1233) | Core - My Orders - Add all tickets in an order to a wallet | Core - User - My Orders - Add all tickets in an order to a wallet |
| [SPT-4108](https://app.qase.io/case/SPT-4108) | Tickets (1233) | Core - User - My Orders - Verify delayed barcode visibility by configuration level | Core - User - My Orders - Show delayed barcodes at the configured release time |
| [SPT-4346](https://app.qase.io/case/SPT-4346) | Tickets (1233) | Core - Orders - Verify Date Accuracy on Ticket Custom Start Date | Core - User - My Orders - Show custom ticket dates on receipts and wallet passes |
| [SPT-4371](https://app.qase.io/case/SPT-4371) | Tickets (1233) | Core - MyOrders - Ticket Type Configuration Lifecycle and Persistence | Core - User - My Orders - Keep ticket dates correct after date settings change |
| [SPT-4372](https://app.qase.io/case/SPT-4372) | Tickets (1233) | Ticket Transfer Date Consistency | Core - User - My Orders - Keep custom ticket dates after a transfer |
| [SPT-5848](https://app.qase.io/case/SPT-5848) | Tickets (1233) | Core - My Orders - Add only the selected ticket from a multi-ticket order | Core - User - My Orders - Add only the selected ticket to a wallet |
| [SPT-5852](https://app.qase.io/case/SPT-5852) | Tickets (1233) | Core - My Orders - Save the correct package passes for its barcode setting | Core - User - My Orders - Save package passes for the selected barcode setting |
| [SPT-5854](https://app.qase.io/case/SPT-5854) | Tickets (1233) | Core - My Orders - Add an individual Apple Wallet pass from an order of eleven items | Core - User - My Orders - Add an Apple Wallet pass from an order of 11 tickets |
| [SPT-5860](https://app.qase.io/case/SPT-5860) | Products (1234) | Core - My Orders - Add all products in an order to a wallet | Core - User - My Orders - Add all products in an order to a wallet |
| [SPT-5861](https://app.qase.io/case/SPT-5861) | Products (1234) | Core - My Orders - Add only the selected product from a multi-product order | Core - User - My Orders - Add only the selected product to a wallet |
| [SPT-5849](https://app.qase.io/case/SPT-5849) | Memberships (1235) | Core - My Orders - Add memberships with different benefits to a wallet | Core - User - My Orders - Add memberships with different benefits to a wallet |
| [SPT-98](https://app.qase.io/case/SPT-98) | NFC Tickets (1236) | Core - User - Upcoming - NFC - Verify wallet button is absent from ticket list | Core - User - My Orders - Hide the Google Wallet action on Upcoming NFC tickets |
| [SPT-3368](https://app.qase.io/case/SPT-3368) | NFC Tickets (1236) | Core - User - My Orders - NFC - Verify Digital Wallet Pass Generation and Data Accuracy for NFC Ticket (Non-Resold) | Core - User - My Orders - Show correct details on an NFC wallet pass |
| [SPT-3369](https://app.qase.io/case/SPT-3369) | NFC Tickets (1236) | Core - User - My Orders - NFC - Verify Confirmation Communication Content for NFC Event Purchase | Core - User - My Orders - Include NFC wallet instructions in confirmation emails |
| [SPT-3370](https://app.qase.io/case/SPT-3370) | NFC Tickets (1236) | Core - User - My Orders - NFC - Prevent Static Barcode Display/Download for Non-Resold NFC Tickets | Core - User - My Orders - Prevent static barcode access for NFC tickets |
| [SPT-3371](https://app.qase.io/case/SPT-3371) | NFC Tickets (1236) | Core - User - My Orders - NFC - Verify Rotating Barcode Display Logic for NFC Ticket (Non-Resold) | Core - User - My Orders - Refresh rotating barcodes for NFC tickets |
| [SPT-4129](https://app.qase.io/case/SPT-4129) | NFC Tickets (1236) | Core - My Orders - Add two NFC tickets individually to a wallet | Core - User - My Orders - Add two NFC tickets to a wallet one at a time |
| [SPT-5850](https://app.qase.io/case/SPT-5850) | NFC Tickets (1236) | Core - My Orders - Add an entire NFC order to a wallet | Core - User - My Orders - Add all NFC tickets in an order to a wallet |
| [SPT-3365](https://app.qase.io/case/SPT-3365) | Orders and Receipts (1237) | Core - User - My Orders - Verify Order Receipt Content and Generation | Core - User - My Orders - Download a receipt with the correct order and payment details |
| [SPT-5851](https://app.qase.io/case/SPT-5851) | Orders and Receipts (1237) | Core - My Orders - Add all wallet items from a mixed order | Core - User - My Orders - Add all item passes from a mixed order to a wallet |
| [SPT-5853](https://app.qase.io/case/SPT-5853) | Orders and Receipts (1237) | Core - My Orders - Save the Order Barcode as one wallet pass | Core - User - My Orders - Save the Order Barcode as one wallet pass |
| [SPT-65](https://app.qase.io/case/SPT-65) | Wallet Access and Recovery (1238) | Core - User - My Orders - Add single item to digital wallet | Core - User - My Orders - Add one item to a wallet and check its branding |
| [SPT-5855](https://app.qase.io/case/SPT-5855) | Wallet Access and Recovery (1238) | Core - My Orders - Cancel adding a pass without saving it | Core - User - My Orders - Cancel adding a pass without saving it |
| [SPT-5856](https://app.qase.io/case/SPT-5856) | Wallet Access and Recovery (1238) | Core - My Orders - Add an already saved item without creating another pass | Core - User - My Orders - Add the same item again without a duplicate pass |
| [SPT-5857](https://app.qase.io/case/SPT-5857) | Wallet Access and Recovery (1238) | Core - My Orders - Hide wallet saving for an unavailable item | Core - User - My Orders - Hide wallet actions for unavailable items |
| [SPT-5858](https://app.qase.io/case/SPT-5858) | Wallet Access and Recovery (1238) | Core - My Orders - Show guidance for the other wallet provider | Core - User - My Orders - Show browser guidance for Apple and Google Wallet |
| [SPT-5859](https://app.qase.io/case/SPT-5859) | Wallet Access and Recovery (1238) | Core - My Orders - Explain an offline Apple Wallet attempt in the customer app | Core - User - My Orders - Block Apple Wallet saving while the iPhone app is offline |
| [SPT-94](https://app.qase.io/case/SPT-94) | Pass Updates and Validity (1239) | Core - User - My Orders - Exchanges - Verify Barcode Handling (Visibility and NFC Interaction) During Exchange Process | Core - User - My Orders - Protect ticket barcodes during and after an Exchange |
| [SPT-4899](https://app.qase.io/case/SPT-4899) | Pass Updates and Validity (1239) | Core - User - Wallet - Verify Apple and Google Wallet pass update lifecycle | Core - User - My Orders - Update saved passes after item, event or branding changes |

**Readability and scope checks:** SPT-98 still names Upcoming because that case starts in the Upcoming list, despite the requested common prefix. SPT-65 names branding because its current steps verify organization colors/images. SPT-5853 retains the visible Order Barcode term to distinguish one order pass from the individual item passes in a mixed order. SPT-5854 names the 11-ticket boundary; SPT-5859 identifies the iPhone-app offline state. These are naming clarifications, not added or removed assertions.

**Preview evidence:** current cases were read at 2026-10-30T19:09:20.851Z. The maintained batch script completed 30 title-only update previews in child suites **1233–1239**, with every current title checked against the read snapshot and every proposed title checked against this table. Tags, parameters and step counts remain the already stored values; no such fields are selected for update.

**Applied and verified:** the user explicitly approved all 30 title-only updates. The maintained batch script wrote only title and read back each saved title. A further read-only verification fetched all 30 cases and confirmed the approved titles, unchanged folder assignments and unchanged descriptions, preconditions, postconditions, step actions/data/expected results, tags, parameter values/structures, priorities, severity, automation/manual settings and other case fields. All seven folder names and their parent relationships were unchanged. Verified at 2026-10-30T19:13:27.281Z. No case creation, deletion, move or product test was performed by this title cleanup. Temporary read/verification helpers, snapshots, Markdown copy, plans, outputs and receipt were deleted after this record was saved.

## Suite folder organization — completed, 2026-10-30

**Approved organization applied and verified:** all **30 existing cases** are now assigned exactly once to seven child folders beneath [Wallet, Barcodes & Receipts (1015)](https://app.qase.io/project/SPT?suite=1015). The original parent name and its parent relationship remain unchanged. It is now the navigation container; it has no directly assigned cases outside these folders.

| Folder | Suite ID | Cases | Exact membership |
| --- | --- | --- | --- |
| [Tickets](https://app.qase.io/project/SPT?suite=1233) | 1233 | 9 | SPT-2924, SPT-3794, SPT-4108, SPT-4346, SPT-4371, SPT-4372, SPT-5848, SPT-5852, SPT-5854 |
| [Products](https://app.qase.io/project/SPT?suite=1234) | 1234 | 2 | SPT-5860, SPT-5861 |
| [Memberships](https://app.qase.io/project/SPT?suite=1235) | 1235 | 1 | SPT-5849 |
| [NFC Tickets](https://app.qase.io/project/SPT?suite=1236) | 1236 | 7 | SPT-98, SPT-3368, SPT-3369, SPT-3370, SPT-3371, SPT-4129, SPT-5850 |
| [Orders and Receipts](https://app.qase.io/project/SPT?suite=1237) | 1237 | 3 | SPT-3365, SPT-5851, SPT-5853 |
| [Wallet Access and Recovery](https://app.qase.io/project/SPT?suite=1238) | 1238 | 6 | SPT-65, SPT-5855, SPT-5856, SPT-5857, SPT-5858, SPT-5859 |
| [Pass Updates and Validity](https://app.qase.io/project/SPT?suite=1239) | 1239 | 2 | SPT-94, SPT-4899 |

**Changes made:** created only these seven child suites, then updated **suite_id only** on the 30 approved case IDs. The suite-create and case-move batches both passed their dry runs. Each folder name/parent and case destination was read back during apply.

**Content preservation verified:** a further read-only pass fetched all 30 cases and compared their original titles, complete descriptions, preconditions, postconditions, step actions/data/expected results, tags, parameter values/structures, severity, priority, type, behavior, layer, automation/manual settings, status, milestone, custom fields, attachments and links. All compared fields were unchanged. Case IDs were retained; no cases were copied or deleted. Folder memberships total exactly 30, and every folder remains beneath suite 1015.

**Verified at:** 2026-10-30T17:42:53.169Z. The 16 case definitions earlier in this note now show their current folder separately from their historical publication location. The other 14 existing suite cases were moved without changing their definitions. No product tests were executed by this organization.

**Grouping decisions:** ticket and product saving remain separate. SPT-65 stays in Wallet Access and Recovery because it covers tickets, products, memberships and NFC. SPT-94 covers both ordinary and rotating barcode validity during Exchange, so it sits with pass updates rather than only NFC. Mixed-item and Order Barcode passes sit beside receipts.

**Cleanup:** the temporary snapshot, Markdown inspection copy, read/verification helpers, plans, raw dry-run/apply outputs and receipts were removed after this verified mapping was recorded. Historical dry-run and publication records below describe the earlier 1015 placement; current destinations are the child suite IDs above.

## Qase publication — 2026-10-30

**Approved scope completed:** create TC-1–TC-14 and update SPT-3794/SPT-4129 in **Wallet, Barcodes & Receipts (1015)**. The approved note matched its dry-run checksum before apply, and a fresh dry run confirmed the two original titles, descriptions, parameters and five-step definitions still matched the reviewed baseline. The fourteen replacement cases were created before narrowing the two existing cases. No moves, deletions or test executions were performed.

| Original label | Qase case | Result | Steps |
| --- | --- | --- | --- |
| TC-1 | [SPT-5848](https://app.qase.io/case/SPT-5848) | Created | 6 |
| TC-2 | [SPT-5849](https://app.qase.io/case/SPT-5849) | Created | 6 |
| TC-3 | [SPT-5850](https://app.qase.io/case/SPT-5850) | Created | 5 |
| TC-4 | [SPT-5851](https://app.qase.io/case/SPT-5851) | Created | 5 |
| TC-5 | [SPT-5852](https://app.qase.io/case/SPT-5852) | Created | 4 |
| TC-6 | [SPT-5853](https://app.qase.io/case/SPT-5853) | Created | 5 |
| TC-7 | [SPT-5854](https://app.qase.io/case/SPT-5854) | Created | 5 |
| TC-8 | [SPT-5855](https://app.qase.io/case/SPT-5855) | Created | 5 |
| TC-9 | [SPT-5856](https://app.qase.io/case/SPT-5856) | Created | 4 |
| TC-10 | [SPT-5857](https://app.qase.io/case/SPT-5857) | Created | 4 |
| TC-11 | [SPT-5858](https://app.qase.io/case/SPT-5858) | Created | 3 |
| TC-12 | [SPT-5859](https://app.qase.io/case/SPT-5859) | Created | 4 |
| TC-13 | [SPT-5860](https://app.qase.io/case/SPT-5860) | Created | 6 |
| TC-14 | [SPT-5861](https://app.qase.io/case/SPT-5861) | Created | 6 |
| SPT-3794 | [SPT-3794](https://app.qase.io/case/SPT-3794) | Updated | 6 |
| SPT-4129 | [SPT-4129](https://app.qase.io/case/SPT-4129) | Updated | 6 |

**Verification:** all 16 cases were fetched again after the batch. Titles, complete descriptions, prerequisites, postconditions, tags, step actions/data/expected results, parameters and suite 1015 matched their approved payloads. New-case type/behavior/layer also matched. Both updates retained their original priority, type, behavior, layer and suite; all other unrelated fields were outside the update payload. SPT-4129's parameter collection was verified empty, with its device/client combinations retained in Description.

**Verified at:** 2026-10-30T17:25:34.980Z (11:25 MDT). The maintained batch script recorded each created ID in its receipt and verified parameters during apply; a separate read-only pass compared all written fields. The temporary plan, receipt, raw previews, apply output and verification helper/output were removed after this record was saved.

**Remaining limits:** the published definitions have not been executed. Android app bulk saving and first-time NFC linking remain explicitly unresolved below. The other cases in the screenshot—SPT-65, SPT-98, SPT-2924, SPT-3368 and SPT-4899—were not part of the write batch. Historical TC labels below identify the approved drafts; the case headings now use their assigned Qase IDs.

## Qase dry-run preview — 2026-10-29

**Result:** the maintained batch script completed a preview of **2 updates and 14 creates** for **Wallet, Barcodes & Receipts (1015)**. Only SPT-3794 and SPT-4129 were read from Qase during this dry run. No create, update, move, delete, test run or apply command was executed. New drafts have no Qase IDs yet. The temporary plan was marked dryRunOnly so it could not be applied accidentally.

Both updates change only **Title, Description, Preconditions, Postconditions, Tags, Parameters and Steps**. Priority, severity, type, behavior, layer, automation settings, suite placement and other unrelated fields are outside the update payload.

* **SPT-3794 title:** Core - User - My Orders - Add multiple items to digital wallet → Core - My Orders - Add all tickets in an order to a wallet. Its ItemType/OS parameters are replaced by OrderSize = Two, Ten; product/member responsibilities and all three OS contexts are retained across the linked replacement cases.
* **SPT-4129 title:** Core - User - My Orders - NFC - Add multiple NFC tickets to digital wallet → Core - My Orders - Add two NFC tickets individually to a wallet. Its OS/Platform parameters become the explicit four device/client contexts in Description; the parameter collection is cleared. Whole-order saving moves to TC-3, with Android app bulk still explicitly held.
* **Both updates' tags:** my-orders, wallet, barcodes → the approved tags shown below. Their five original steps become six focused steps each.

| Case | Operation | Exact proposed title | Suite | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| SPT-3794 | Update | Core - My Orders - Add all tickets in an order to a wallet | 1015 | my-orders, tickets, post-purchase | OrderSize: Two, Ten | 5 → 6 |
| SPT-4129 | Update | Core - My Orders - Add two NFC tickets individually to a wallet | 1015 | my-orders, tickets, nfc | None; device context remains in Description | 5 → 6 |
| TC-1 | New | Core - My Orders - Add only the selected ticket from a multi-ticket order | 1015 | my-orders, tickets, post-purchase | TicketSetup: OrdinaryTicket, WillCallDigital, MultiScanRemaining | 6 |
| TC-2 | New | Core - My Orders - Add memberships with different benefits to a wallet | 1015 | my-orders, memberships, post-purchase | BenefitSetup: EventScanAccess, DailyScanAccess, Discount, IssueTicketsGa, IssueTicketsSection, IssueTicketsSeat, MultipleIssueTickets, MixedBenefits, NoBenefits | 6 |
| TC-3 | New | Core - My Orders - Add an entire NFC order to a wallet | 1015 | my-orders, tickets, nfc | None; device context remains in Description | 5 |
| TC-4 | New | Core - My Orders - Add all wallet items from a mixed order | 1015 | my-orders, orders, post-purchase | None; device context remains in Description | 5 |
| TC-5 | New | Core - My Orders - Save the correct package passes for its barcode setting | 1015 | my-orders, packages, tickets | PackageBarcode: ParentOnly, SeparateChildren | 4 |
| TC-6 | New | Core - My Orders - Save the Order Barcode as one wallet pass | 1015 | my-orders, orders, post-purchase | None; device context remains in Description | 5 |
| TC-7 | New | Core - My Orders - Add an individual Apple Wallet pass from an order of eleven items | 1015 | my-orders, tickets, edge-case | None; device context remains in Description | 5 |
| TC-8 | New | Core - My Orders - Cancel adding a pass without saving it | 1015 | my-orders, post-purchase, edge-case | None; device context remains in Description | 5 |
| TC-9 | New | Core - My Orders - Add an already saved item without creating another pass | 1015 | my-orders, post-purchase, edge-case | ItemType: Ticket, Product, Membership | 4 |
| TC-10 | New | Core - My Orders - Hide wallet saving for an unavailable item | 1015 | my-orders, post-purchase, edge-case | UnavailableState: WillCallWithoutDigital, ShippedTicket, Livestream, NotActivated, PaymentPending, QuestionsPending, TransferPending, ResalePending, Refunded, SingleUseSpent, ScansExhausted, ConfirmationExcluded, ExpiredMember, InactiveMember, MemberTransferPending | 4 |
| TC-11 | New | Core - My Orders - Show guidance for the other wallet provider | 1015 | my-orders, mobile-view, post-purchase | BrowserContext: IphoneSafari, AndroidChrome | 3 |
| TC-12 | New | Core - My Orders - Explain an offline Apple Wallet attempt in the customer app | 1015 | my-orders, mobile-view, edge-case | None; device context remains in Description | 4 |
| TC-13 | New | Core - My Orders - Add all products in an order to a wallet | 1015 | my-orders, products, post-purchase | OrderSize: Two, Ten | 6 |
| TC-14 | New | Core - My Orders - Add only the selected product from a multi-product order | 1015 | my-orders, products, post-purchase | ProductSetup: ProductVariant, ProductWillCall, ProductShipping | 6 |

The successful dry run confirms the payloads could be assembled and compared with the two current case definitions. It does not validate device behavior or prove Qase would accept a future write. The Android app bulk and first-time NFC-linking gaps below remain unresolved. Publish the replacement coverage together with the narrower updates if a later write is authorized.

**Preview identity:** SHA-256 of the case note immediately before adding this preview: `79a36d8465f44566f2984157cf850131145aa6912ed93423609dd3e595737899`. Temporary plan and raw preview JSON were deleted after these details were recorded. This preview does not authorize applying the batch.

## Short coverage comparison

**Testing intent:** A customer can save the purchased item they selected without losing access, mixing another item's identity, using benefits or creating another purchase. Criticality: fulfillment/access and ownership. Proof: final installed-pass identity/count plus fresh order state. Confidence is high for the mapped local selection rules and lower for device/provider completion, which was not executed. Purchase/payment calculation, Inventory changes and employee configuration editing are outside this post-purchase saving scope; existing completed orders are prerequisites, and saving must not change their quantities or total.

### Existing coverage and preservation

| Existing cases / proof target | Decision and destination | Status / limitation |
| --- | --- | --- |
| SPT-3794: Tickets, Products, Memberships × iOS, Android, macOS; select one and then all; correct identities and no duplicates; five steps | Proposed split: SPT-3794 owns whole ticket orders; TC-13 owns whole product orders; TC-1 owns selecting one ticket; TC-14 owns selecting one product; TC-2 owns memberships and repeated member selection; TC-9 owns saving again | All three original item kinds and operating systems retained across the split. Generic OS values become concrete device/browser contexts. Never apply the narrower SPT-3794 alone without its replacement coverage. |
| SPT-4129: iOS/Android × web/customer app; selected NFC ticket and another/all; no static PDF; five steps | Proposed split: revised SPT-4129 owns both individual saves; TC-3 owns whole-order saving | Android app bulk and first-time account linking remain unresolved below; they were not removed as “unsupported.” Both Android/iOS app individual paths are retained. |
| SPT-65: single-ticket/product/member/NFC installation and organization branding, eight defined phone runs | Keep existing case, unchanged | This case already requires installed passes and branding inheritance; do not replace it with generic first-install duplicates. Current Qase places it in 1015, despite the older local publication note recording a move to 1179. Do not move it as part of this request. |
| SPT-2924: assigned event seat details | Keep; use for reserved-seat and general-admission section examples | Full case read. Saved-pass completion should be distinguished from merely opening generated data. No duplicate seating case added. |
| SPT-4346: single/recurring event and custom ticket dates; SPT-4371: changed date settings; SPT-4372: transferred ticket dates | Keep responsibilities; repair separately before claiming full coverage | SPT-4346 declares NoOverride but steps refer to OverrideType, with no executable InvalidConfig recipe. SPT-4371's “old data remains until manual regeneration” expectation needs rechecking against current automatic updates. Neither blocks drafting ordinary valid wallet-save cases. |
| SPT-94: Exchange barcode lifecycle; SPT-4899: already installed ticket/member updates | Keep lifecycle responsibilities | Neither is proof of initial selected-item or whole-order saving. Update completion window and inherited-design selection remain unresolved; see the existing organization note. |
| SPT-98: Upcoming list wallet visibility; SPT-3368: NFC pass content; SPT-3369: NFC communications; SPT-3370: no static NFC barcode; SPT-3371: rotating barcode | Keep separate from bulk saving | Full contents reviewed. Conditional wording and setup gaps mean definitions, not tested outcomes. No email, PDF, transfer or rotating-barcode execution here. |
| SPT-3365: order receipts | Keep; outside wallet-saving assertions | Receipt generation and financial details are different proof targets. |
| SPT-4108: delayed release at Venue/event/ticket type | Existing barcode visibility; wallet-specific absence covered before release by TC-10 | After-release wallet availability and successful saving need an explicit timed run; deferred until a release time and completion evidence are prepared. |
| Selected product/delivery options; membership benefits; packages; order pass; mixed orders; Apple 11-item boundary | New TC-1–7 and TC-13/14, using existing SPT-65/2924 for single-install branding/seating | Definitions only, manual device execution not run. |
| Cancel, repeat save, unavailable state, browser instruction, app offline | New TC-8–12 | No full standalone definition found for these wallet-saving targets in the completed search. This does not prove an unnamed case cannot exist. |
| SPT-4056 guest order link; SPT-4907 account ownership; SPT-548 thank-you wallet entry | Keep existing owners | Full contents read; guest NFC sign-in, invalid links and account access must not be duplicated inside bulk success. Direct public pass URLs use their own credentials; a signed-in ownership test alone does not prove their authorization rules. |
| SPT-162 membership benefit details; SPT-5040/5041/5044/5045 benefit purchase/fulfillment; SPT-429 package barcodes | Reuse as setup/adjacent coverage, not wallet-install proof | Full contents read. TC-2 supplies the missing benefits-to-membership-pass check; TC-5 supplies installed package-pass proof. |
| SPT-2049 wallet scanning; SPT-3789 order-barcode scanning | Reuse downstream cases | Full contents read. A saved pass does not prove admission or product redemption. Execution requires the matching scanner permissions, event/window and controlled items; deferred here. |
| Organization wallet design cases SPT-4742 and SPT-5502–5513 | Keep in their existing ownership | Existing canonical note owns design configuration; not a reason to make SPT-3794 a branding lifecycle case. |

### Item configurations that can affect Orders wallet saving

These are the meaningful source-backed families, rather than every possible pricing, payment or benefit combination.

| Configuration | Wallet behavior and coverage decision |
| --- | --- |
| Ordinary event ticket; electronic delivery | Individual ticket pass; SPT-65, TC-1 and proposed SPT-3794. Free/paid price, PWYC and a discount do not create different pass models after successful issuance. |
| Will Call ticket | Eligible when sending digital tickets with Will Call is enabled; TC-1. Off means no item wallet button; TC-10. |
| Shipped event ticket or virtual-stream access | No ordinary item wallet action under current display rules; TC-10. This differs from shipped products. |
| Reserved seat or general-admission section/location | Ticket pass contains its seat or section; existing SPT-2924. Do not equate a ticket type's display name with an assigned seat. |
| Recipient of an accepted ticket transfer | An eligible transfer invoice for the new owner can expose wallet actions. Reuse SPT-4372 for transferred-ticket date and identity checks; pending-transfer denial is TC-10. A previous owner’s downloaded pass requires separate validity evidence. |
| Single event, recurring occurrence, custom ticket dates, date/time pending | All remain ticket passes. SPT-4346 owns custom/single/recurring coverage but has the mapping defect above. Date/time-pending pass display needs a dedicated expectation check; deferred. |
| Package with parent barcode | One usable visible parent pass; TC-5. Hidden included items must not be installed as extra admission passes. |
| Package with separate included-item barcodes | Save each redeemable visible included item; TC-5. Mixed ticket/product and nested package configurations require separate prepared examples; deferred rather than assumed covered. |
| Ordinary ticket with repeated or unlimited scans | Individual action can remain available while scans remain; TC-1 and TC-10. The whole-order backend additionally filters to paid, unscanned eligible items, so a partly used multiscan item is not interchangeable with the unused bulk baseline. |
| Product, product variant, Will Call product, shipped product | Product uses a product pass. The individual UI's delivery rule exempts products; selected-product TC-14 and whole-product-order TC-13. Save is not proof of pickup or shipping fulfillment. |
| Membership: Event Scan Access, Daily Scan Access, Discount, Issue Tickets | Membership pass generation does not branch on benefit type. One TC-2 covers all four kinds, Issue Tickets GA/section/seat, multiple/mixed benefits and no benefits. |
| Membership: Seasonal, Yearly, lifetime; multiple members | Same member-pass family, with actual expiry or no expiry; TC-2 uses selected examples, not every renewal/benefit combination. Apple membership pass has seating fields; Google member payload reviewed here does not expose the same seat fields, so Google seating parity is unresolved rather than promised. |
| Tickets issued from a membership benefit or redeemed ticket credit | Once issued as an eligible TicketItem, they use the ordinary ticket pass path. Saving the membership or the unused credit is not saving those tickets. Add one benefit-issued and one credit-issued ticket example to the existing SPT-65 execution selection; acquisition/credit redemption itself is deferred. |
| NFC-only ticket | Separate tap pass, requires the event/Venue setup and signed-in access; SPT-3368, revised SPT-4129 and TC-3. First-time account linking is separate. |
| Order Barcode enabled | One invoice/order pass can be offered; TC-6. This is distinct from Add entire order, which gathers individual basket items. NFC-only events cannot be combined with the Venue's Order Barcode configuration. |
| Mixed ordinary tickets + product + membership | Backend bundle/token selection supports the valid issued items; TC-4 for mobile browsers. App selection differences remain held below. |
| Unactivated/delayed, pending payment/questions, hidden confirmation item, transfer/resale, refunded, spent, expired member | Availability checks differ by model and entry. TC-10 checks the individual Orders UI; whole-order filtering and direct endpoint authorization need their own boundary proof. |
| Donation, unredeemed ticket credit, receipt, payment card | No separate wallet-pass item family found in the reviewed factories. A donation-like sale that actually issues an ordinary eligible ticket follows the ticket path; do not promise wallet delivery for a standalone amount or credit balance. |

### Realistic device selection

| Device/context | Planned use | Status and limits |
| --- | --- | --- |
| iPhone → Safari → Apple Wallet | Core single/selected/bulk, memberships, cancellation, duplicate save, 10/11 boundary | Physical-device manual-only; not run. Record actual model, iOS, Safari and pass layout. |
| Android phone → Chrome → Google Wallet | Equivalent item/benefit coverage and provider handoff | Physical-device manual-only; not run. Use one available Pixel and one available Samsung for representative browser/app handoff checks without claiming all Android devices. |
| iPhone → Showpass customer app → Apple Wallet | Individual ordinary/member/NFC, ordinary and NFC bulk, and offline message | Uses native messages and an Apple pass module; browser success cannot substitute. Not run. |
| Android → Showpass customer app → Google Wallet | Individual ticket/product/member/NFC | Distinct external-app handoff; not run. Bulk has a source mismatch below. |
| Mac → Safari → linked iPhone Apple Wallet | Preserves SPT-3794's original macOS coverage through its ticket case, product cases TC-13/14 and membership case TC-2 | Requires iCloud for Safari and the controlled Apple Account/device; inspect the final pass on the phone. Apple's [Safari guide](https://support.apple.com/en-ca/guide/safari/sfri40785/mac) documents Mac pass adding. Download alone is insufficient. |
| iPhone Chrome, Google app, email/social in-app browsers; Android non-Chrome browsers | Browser-detection and open-in-browser recovery exploration | Deferred. The current component tests browser identifier strings rather than a capability API; iOS Chrome can match its WebKit branch. Do not assert all “Chrome” contexts select Google or all in-app browsers can save. |
| Desktop Chrome → Google account → Android wallet | Cross-device save opportunity | Deferred; the Google web issuance flow exists, but same-account final phone completion needs a prepared run. Not required to duplicate phone success for every item kind. |
| Android without Google Wallet installed or signed out of Google | Installation/sign-in return path | Deferred provider flow. Google [documents an installation prompt](https://support.google.com/wallet/answer/12059256?hl=en-ca); this does not prove that Showpass preserves the selected item afterward. |
| Apple Watch mirror, iPad/tablet layouts | Secondary device behavior | Deferred; not interchangeable with the phone and Mac examples in the original case. |

The Pixel/Samsung selection is a proposed representative sample, not a verified Showpass support list. Use the currently supported app/OS versions available to the team and record exact versions instead of inventing a minimum version. No full OS × browser × item × benefit product is claimed.

### Held checks and material source conflicts

| Check | Classification | Exact missing proof / next preparation |
| --- | --- | --- |
| Android customer app → Add entire order | Source-backed implementation mismatch; not a confirmed live bug | The shared dialog's bulk click can send OPEN_APPLE_WALLET_MULTI whenever its Apple-pass list is nonempty, even for the Google link. Native handling calls the Apple module. Verify a two-ticket Android app order against the deployed app/web build before calling this supported or failed. Keep its existing NFC scope visible. |
| iOS customer app → mixed order with membership → Add entire order | Source-backed item-selection mismatch; not a confirmed live bug | Web Apple bundle selection includes active members, but the app payload is built only from invoiceInfo.ticket_items. Use the four-item TC-4 preparation on a real iPhone app and count installed ticket/product/member passes. This is a separate app regression, not covered by the mobile-browser result. |
| First-time NFC Apple account linking; cancel/retry or changing Apple Account | Blocked setup / manual-only | Need a confirmed unlinked controlled customer, compatible Apple account/device and a supported way to restore/reuse that state. Single-ticket and basket linking choose related but different saved-binding checks. Do not erase account binding to fabricate a test. |
| Apple secure-session launch failure → Copy link / Try again | Source-supported controls; execution blocked | The iOS helper has these controls, but no safe reproducible launch-failure setup was established. Do not invent an Admin toggle or intentionally break a shared service. |
| Provider failure, slow download, partial app bulk save, reconnect then save | Deferred recovery | Need controlled failure preparation and exact completion observations; TC-12 proves only the available single-pass offline guard. No claim that bulk and single share error handling. |
| Mixed valid and invalid items in Add entire order | Deferred selection-boundary check | Backend ticket/product retrieval excludes inactive/non-redeemable/hidden/transferred/resold/scanned items. Member retrieval uses active status without the individual UI's expiry/transfer checks. Prepare exact distinct records and verify intended provider eligibility before drafting a universal exclusion expectation. |
| Order Barcode with more than one underlying ticket | Deferred control-meaning check | The order section can reuse the multi-item dialog; “Add just this ticket” can refer to the invoice pass while Add entire order uses individual basket items. TC-6 deliberately uses one ticket plus one membership to prove the simple order pass separately. |
| Native Apple member seating versus Google member seating | Source-backed display difference; requirement unresolved | Apple builds seat/location fields; the reviewed Google member payload has group/level/name/expiry without equivalent seat coordinates. Membership installation is runnable; identical seat layouts across providers are not an established contract. |
| Already installed pass update after refund/transfer/date/branding change | Deferred existing lifecycle | Reuse SPT-94/4371/4372/4899 and the organization branding note. Need exact change, supported completion window and actual device state; do not treat a freshly downloaded pass as an automatic-update pass. |
| Actual admission, benefit use, product redemption and offline venue entry | Manual-only downstream checks; not run | Reuse SPT-2049/3789 and NFC-reader coverage with controlled scan data, admission windows, employee permissions and safe retention. Installation alone cannot prove validity at the reader. |

### Sources and read completeness

* Qase project **SPT**, retrieved **2026-10-29 14:29 MDT** (`2026-10-29T20:29:15.653Z`): **2,287 cases and 2,287 unique IDs** across 23 pages, stable reported total; suite list fully paged. Suite 1015 reports **16**, all 16 retrieved and their full case content reviewed; no child suites. Fully reviewed IDs: **65, 94, 98, 2924, 3365, 3368, 3369, 3370, 3371, 3794, 4108, 4129, 4346, 4371, 4372, 4899**. No unread suite cases remain.
* The pasted `search=walle` filter was not used to hide other suite cases. Complete local snapshot filtering searched serialized case fields, including title, description, steps, tags, parameters and suite, for `wallet|pkpass|3794`: **61 candidates**. A narrower wallet/pkpass/passbook search and a second title search for membership benefits, package barcodes, Order Barcode and multi-item/delivery terms checked aliases. Unrelated payment-card/Apple Pay/Google Pay cases were excluded from wallet-pass conclusions. Additional full-content reads: **162, 429, 548, 2049, 3789, 4056, 4907, 5040, 5041, 5044, 5045**. Broad retrieval was a completeness check, not a claim that every project case was individually reviewed.
* Installed `qasectl --help` and `qasectl testops --help` expose no case/suite reader. The documented read-only API path was used only after the user explicitly approved it. No Qase write or test run occurred during the initial investigation. The separately approved 2026-10-30 publication used the maintained batch script; its write scope and verification are recorded above. Temporary reader and JSON files were removed after useful evidence was recorded.
* Backend: `/Users/christianvaldez/Documents/Showpass/repos/web-app`, **develop**, revision `2f7515c35e5e92375ecef0a0221a91c55b11f526`, clean at inspection. Frontend: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, **develop**, revision `a834f36e81ab01d531490ea38c794bd8cbc8b9c6`, clean at inspection. No branch or PR diff was requested; the current local source was reviewed without fetching or changing repositories.
* Backend paths: `apps/financials/api/public/{views.py,serializers/serializers.py}`; `apps/financials/services/basket_pkpass_bundle.py`; `apps/tickets/queries/fulfillment/items.py`; `apps/tickets/managers/ticket_lifecycle.py`; `apps/tickets/models/{ticket_lifecycle/ticket.py,event_management/event.py}`; `apps/tickets/services/fulfillment/ticket_generator_service.py`; `apps/memberships/{constants/benefits.py,models/members.py}`; `apps/financials/models/invoice_management/invoice.py`; `apps/core/pkpass/services/{bundle_builder.py,pass_information/,pass_creation/}`; `apps/core/google_wallet/{creator.py,object_tokenizers/,resource_managers/object_managers.py}`. These establish pass families, eligibility, counts, provider identity, NFC and member display fields.
* Frontend paths under `packages/core/src/app-contexts/user/features/account/features/`: `my-orders/ui/components/{MyOrdersInvoiceItems,InvoiceItemCard,InvoiceItemWalletActions,InvoiceSaveToWalletButtons,InvoiceSaveToWalletModal,OrderBarcodeSection,InvoiceItemMembershipSection}.web.tsx`; `my-orders/utils/order-detail/{order-detail-utils,invoice-item-display}.ts`; `my-orders/data/services/pkpass/useSaveAllToWallet.ts`; `memberships/utils/membership-item-availability.ts`. Also `packages/core/src/shared/contexts/MobileWebviewContext/MobileWebviewContext.tsx`, `packages/core/src/app-contexts/user/features/account/components/QRSlider/QRSlider.web.tsx`, `packages/mobile/src/{util/wallet/index.tsx,util/webview/helpers/index.tsx,screens/BuyerScreens/Orders/MyOrdersScreen/MyOrdersScreen.tsx}` and `packages/mobile/specs/NativeApplePass.ts`. These establish visible actions, selected member/item behavior, 1/10/11 boundaries, browser selection and native handoffs.
* Existing tests were read, not run: backend `apps/core/pkpass/services/tests/test_bundler_builder_service.py` checks a mixed three-item bundle and ten-item slices, and `apps/memberships/tests/exports/test_membership_wallet_seating.py` checks Apple membership seat/location fields. Frontend wallet-button/modal tests and mobile wallet-helper tests provide additional branch evidence. Source tests with fake provider responses do not establish native saving.
* Automation reference: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`, revision `daac16c5470d9c92033d932bb426c171897eadfc`, with pre-existing local changes left untouched. `pages/user/account/my-orders/MyOrdersPage.ts` and `pages/shared/components/OrderSummaryActions.ts` offer order-entry helpers. Browser automation can check selection, labels and payload identity; actual Wallet completion, Mac-to-phone delivery, NFC and offline-device behavior remain physical-device checks.
* Canonical references applied: [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]], [[05 Tooling/qasectl]], [[06 Prompts/Showpass Qase Gap Analysis]], [[06 Prompts/Showpass QA Test Case Generator]], and [[00 Start Here/Showpass QA Handbook/Playbooks/15 Delivery Check-In Transfers and Resale]]. Existing adjacent notes remain intact: [[03 Test Cases/Organizations/organization-settings-qase-test-cases#Branding → Deliverables → Digital Wallets]] and [[03 Test Cases/Ticketing/SPD-2607 - Recurring Ticket Wallet Customization]]. Neither is the canonical note for this Orders suite review.
* Codex browser inventory contained only `about:blank`; no relevant existing session was available. No new browser session, Showpass navigation, desktop-app access or screenshots were used. Source-backed navigation and wording remain unverified against a deployed build.

**Local verification:** the reusable Qase Markdown parser successfully read all 16 complete definitions with 3–6 steps each, valid approved tags, parameter mappings and Platform/View tables. It made no network requests and prepared no apply operation. `git diff --check` passed.

**Execution:** all published product tests are **Not run**. Qase publication and source tracing are not product passes or release approval. No Showpass business data or wallet cleanup was needed because no product mutations were executed.
