---
title: Box Office Test Cases
tags:
  - qa/test-cases
  - box-office
---

# Box Office Test Cases

Start on the authorized Venue and name the client. In Dashboard, open **Operations → Box Office** and choose **Sell**, **Transactions**, **Holds**, or **Settings** for the assigned job. Admission starts under **Operations → Entry → Check-in**. Use the matching Electron or POS controls for device-specific work. [[03 Test Cases/Test Cases by Feature|Feature index]] · [[00 Start Here/Showpass QA Handbook/Playbooks/14 Mobile POS Kiosk and Hardware|Staff sale and hardware guide]]

| Staff job | Existing record and proof | Case references |
| --- | --- | --- |
| Sell from an attraction calendar | The configured calendar and available child Event must already exist. Select the intended occurrence and verify that its inventory enters the Venue basket. | [SPT-1077](https://app.qase.io/case/SPT-1077) |
| Sell to the right Customer | Use a controlled customer, or start with the specified phone-only details. Check whose Customer record the sale creates or reuses and who owns the saved invoice. | [SPT-5755](https://app.qase.io/case/SPT-5755) |
| Take payment and issue a ticket | The basket must belong to the intended Venue and Customer. Compare the saved transaction, amount and issued items. If the outcome is uncertain, reconcile that attempt before repeating a charge. | [SPT-1115](https://app.qase.io/case/SPT-1115) · [SPT-1321](https://app.qase.io/case/SPT-1321) · [[03 Test Cases/Payments/square-test-cases|Square Terminal coverage]] |
| Convert or release a hold | Match the existing hold before checkout. For conversion, verify one new order and the allocated ticket. For expiry or release, verify the link stops working and stock is available again. | [SPT-5284](https://app.qase.io/case/SPT-5284) · [SPT-4824](https://app.qase.io/case/SPT-4824) · [SPT-1320](https://app.qase.io/case/SPT-1320) |
| Find an existing order | Filter Transactions by the assigned user or email. Open the matching transaction and compare its details with the order reference. Stop at lookup. | [SPT-1260](https://app.qase.io/case/SPT-1260) · [SPT-1259](https://app.qase.io/case/SPT-1259) |
| Resend or reprint | Start from the exact existing transaction. Verify the received email or selected print output against the original order. Use the case for the actual client and printer path. | [SPT-1267](https://app.qase.io/case/SPT-1267) · [SPT-4402](https://app.qase.io/case/SPT-4402) · [[03 Test Cases/Printing/desktop-app-thermal-receipt-blocking-test-cases|Desktop thermal receipt coverage]] |
| Adjust a sale or admit a guest | Use the original invoice for an Exchange and the issued ticket for Check In. Pass both original and replacement item references when admission depends on the adjustment. | [[03 Test Cases/Exchanges/cash-other-exchanges|Exchange cases]] · [[03 Test Cases/Check In/check-in-qase-test-cases|Check In cases]] |
| Access PIN | Use the employee’s base permissions and the assigned PIN owner’s permissions. Verify the temporary access and that it ends with the PIN session. | [SPT-1313](https://app.qase.io/case/SPT-1313) |

For a staff sale, hand off the Venue, Event/occurrence, purchase client, invoice reference, intended Customer and issued items. If a guest, recipient, or attendee differs from the purchaser, record that relationship before assigning the next check. [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario|Example with a Package, Discount and Customer handoff]]

These are saved definitions and existing vault cases. Check the linked run note for any execution evidence. The source paths for navigation and permission review are `operations-routes.ts:98` in `showpass-frontend` and `apps/tickets/dashboard/box_office/views.py:36` in `web-app` for the legacy Sell entry.

## Draft cases

### TC-1: Require an account before offering individual ticket exchange in Box Office

**Title:** Web Box Office - Exchanges - Keep a phone-only order out of itemized exchange

**Description:** A Venue Customer may have a valid paid order without an attached Showpass account. Compare that order with an account-backed order to verify who can use the individual-ticket exchange flow.

| Platform | View |
| --- | --- |
| WebBoxOffice | Desktop |

**Preconditions:**

* Use the same controlled Venue and employee with **Administer Transactions** for both invoices. Confirm the Exchanges module and staff visibility (**Box Office** or **Both**) are enabled. Ask the setup owner to confirm **Enable itemized exchanges**, `enable_itemized_calculations`, `enable_itemized_exchange_credit` and `enable_itemized_exchanges_on_all_item_types` are on for the fixture. Both orders must be within the applicable exchange window.
* Use one test Event with one regular digital Ticket Type. In Web Box Office, buy two tickets per order using the same approved test card method and prices. Keep both orders unscanned, untransferred, and paid with no adjustment in progress. The account-backed Customer has no unsettled exchange credit.
* For **account-backed order**, select an existing controlled Customer linked to a Showpass account. For **phone-only order**, use a verified Venue Customer with a name and phone, blank email and no linked Showpass account. Record both invoice references and verify the planned Customer on each transaction. Have the setup owner confirm the two account states before opening the exchange flow.

**Tags:** box-office, exchanges, employee-permissions

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Under **Operations → Box Office → Transactions**, open the account-backed order and choose **Begin exchange** from its actions. | Account-backed invoice reference | **Exchange items** opens for the selected invoice. |
| Select **Continue** in **Exchange items**. | Same account-backed order | Both tickets are listed with individual selection controls and **Select all**. |
| Select **Close**, open the phone-only order, then choose **Begin exchange** from its actions. | Phone-only invoice reference | The standard dialog offers **Start Exchange** on this screen. It has no **Continue** to individual selection and no **Select all**. |
| Close the dialog before choosing **Start Exchange**. Open both transaction details again. | Both invoice references | Both original transactions remain paid and their ticket quantities remain two. |

**Postconditions:** Keep both orders for review and stop before starting an exchange or changing either order. Record which exchange flow opened against each invoice reference.

## Proof and sources

**Status:** Local Box Office Tester draft. **Not run.** [SPT-5755](https://app.qase.io/case/SPT-5755) verifies phone-only Customer creation and matching. [SPT-4043](https://app.qase.io/case/SPT-4043) covers item selection on eligible items. This draft checks which exchange flow the same employee receives for each ownership state. The whole-invoice flow has separate rules.

Backend `apps/financials/api/venue_based/serializers/invoices.py:169` requires a linked account before exposing the invoice as itemized for exchange. Frontend `VenueInvoiceExchangeFlow.web.tsx:125` selects between standard and itemized modals. `ExchangeTicketItemSelect.web.tsx:130` labels the individual selector. [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario|Complex Package exchange planning]]
