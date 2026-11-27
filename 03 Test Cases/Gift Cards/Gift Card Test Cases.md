---
title: Gift Card Test Cases
tags:
  - qa/test-cases
---

# Gift Card Test Cases

Keep the configured Gift Card type, purchase order, issued credit and redemption order distinct. A card bought for another person can have a different purchaser and recipient. Use the same issued card when the scenario needs delivery, redemption or a later adjustment. [[00 Start Here/Showpass QA Handbook/Playbooks/07 Money Credits and Gift Cards|Gift Card testing guide]] · [[03 Test Cases/Test Cases by Feature|Feature index]]

| Start | Proof to select | Saved definition |
| --- | --- | --- |
| Dashboard → Build → Gift Cards | Save the card type, open it fresh and verify denominations, price, value and inventory. | [SPT-4064](https://app.qase.io/case/SPT-4064) |
| Public Organizer profile | Buy for a controlled recipient. Verify the saved future delivery date and that the redemption email remains unsent immediately after purchase. | [SPT-562](https://app.qase.io/case/SPT-562) |
| Web Box Office → Sell | Select the intended Customer and a future-dated Gift Card recipient. Follow the case’s delivery expectations using the Venue’s local time. | [SPT-5028](https://app.qase.io/case/SPT-5028) |
| Checkout with an issued Gift Card | Verify the amount applied, the payment difference if any, the completed redemption order and the remaining value. | [SPT-3339](https://app.qase.io/case/SPT-3339) |
| Transactions or Reports with existing records | For a supported refund, verify restored value and ticket status. In Reports, match the card, purchaser/recipient and used and remaining amounts. | [SPT-3845](https://app.qase.io/case/SPT-3845) · [[03 Test Cases/Reports/reports-qase-test-cases#SPT-3832: Gift Card Recipient Report|SPT-3832]] |

These links point to saved case definitions. Compare actual received email and redemption with the intended card if the assignment covers delivery through use.
