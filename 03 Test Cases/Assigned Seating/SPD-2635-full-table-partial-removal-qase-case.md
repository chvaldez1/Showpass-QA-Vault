---
title: Full-Table Partial Removal Qase Case Update
tags:
  - qa/test-case
  - qase
  - assigned-seating
---

# Full-Table Partial Removal Qase Case Update

Use with [[05 Tooling/qasectl]] and [[05 Tooling/Qase Test Case Writing Rules]].

## Testing Intent

We are testing whether a customer or Box Office employee can bypass a full-table purchase requirement by removing fewer than all of the table's seats during a purchase. The proof is that every applicable removal control leaves either the complete table or no seats from that table in the basket, and a completed order contains every seat at the table.

## Existing Case Preservation Baseline

- Qase case: SPT-2860 in suite 596.
- Classification: Split enhancement; preserve the existing full-table selection and removal purpose while separating customer and employee purchase flows.
- SPT-2860 keeps `WebPublic/Desktop`, `WebPublic/Mobile`, `Widget/Desktop`, `Widget/Mobile`, and `ReactNativePublic/Mobile`.
- SPT-5094 adds `WebBoxOffice/Desktop` and `Electron/Desktop` as a separate employee case.
- Both cases keep `ItemType`: `Event`, `Membership`.
- Preserve the clean full-table selection and full-table removal checks.

## Sources Reviewed

- Qase case SPT-2860: existing title, description, preconditions, postconditions, tags, parameters, and four steps.
- Jira issue [SPD-2635](https://showpass.atlassian.net/browse/SPD-2635): a customer reduced a required four-seat table by removing one seat during checkout. The QA comment records testing on web, Widget, and Box Office.
- Backend full-table validation: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/serializers/general.py`.
- Customer basket enforcement: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/user_based/serializers.py`.
- Employee basket behavior and tests: `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/testing/mixins.py`.
- Public ticket-selection basket: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/basket/components/EnhancedCartSummary/EnhancedCartSummaryContent.web.tsx`.
- Public checkout review controls: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/shared/checkout/components/steps/review/components/ReviewItemGroup/ReviewItemGroup.web.tsx`.
- Shared seating-map removal control: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/seating/components/SeatingCartItem/ItemHeader/ItemHeader.web.tsx`.
- React Native purchase WebView: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/screens/BuyerScreens/PurchaseScreen/PurchaseScreen.tsx`.
- Shared Box Office Sell and Checkout basket layout: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/layouts/BoxOfficeCartLayout/BoxOfficeCartLayout.web.tsx`.
- Box Office basket controls: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/basket/components/Basket.web.tsx`.

## Source-Backed Risk

The current backend source enables full-table validation for customer baskets but leaves it disabled by default for venue-based employee baskets. Separate customer and employee cases make that difference visible and avoid conditional steps that do not match the selected purchase flow.

## Qase-Ready Update

### SPT-2860: Public Purchase - Assigned Seating - Full Table Cannot Be Partially Removed

**Description:** Verifies that a customer cannot remove just one seat from a table that must be purchased as a whole. Run this test on the Showpass website, the ticket-buying Widget, and the Showpass mobile app. Check the cart on the event or membership page, the selected seats on the seating page, and the order summary at checkout. Removing the whole table is allowed.

Check removal separately on each page in the purchase flow:

| Page | Removal point |
| --- | --- |
| Event or membership page | Select Remove or the trash icon beside one of the table's ticket rows |
| Seating page | Select Remove or the trash icon beside one seat, then try to deselect one seat on the map |
| Checkout | Select Remove or the trash icon beside one seat or ticket row, then select Edit and try to deselect one seat |

At every point, trying to remove one seat must leave the full table in the cart. Removing the whole table must remove every seat together.

**Preconditions:** An Event or Membership has a table with at least two available seats. Full Table Purchase Required is turned on for that table, which means every available seat at the table must be bought together. The customer can open the Event or Membership using the selected purchase method and device. If different ticket options can be assigned to seats at the same table, make at least two options available, such as Adult and Child.

**Postconditions:** The completed order contains every seat at the table. If the purchase is not completed, remove the whole table from the cart or allow the cart to expire.

**Tags:** assigned-seating, checkout, rules

**Parameters:**
ItemType: Event, Membership

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the Event or Membership using the selected purchase method and device. Select Tickets, then open the seating page. | A table with Full Table Purchase Required turned on | The seating page shows the table and all of its available seats. |
| Select fewer than all available seats at the table and try to continue. | Leave at least one available seat unselected | The cart is not updated with only part of the table. Showpass keeps the customer on the seating page or selects the remaining seats needed for the full table. |
| Select every available seat at the table. If ticket options such as Adult and Child are offered, use a different option for at least one seat. Continue, then return to the Event or Membership page without clearing the cart. | Every available seat at the table | The cart on the Event or Membership page shows every seat at the table. |
| On the Event or Membership page, select Remove or the trash icon beside one of the table's seats or ticket rows. Confirm the removal if asked. | One seat or ticket row from the table | The selected seat or ticket row is not removed by itself. The cart still shows every seat at the table, and the total does not change to the price of a partial table. |
| Return to the seating page. In the list of selected seats, select Remove or the trash icon beside one seat. | One selected seat at the table | The seat is not removed by itself. Every seat at the table remains selected. |
| On the seating map, select one of the table's selected seats to try to deselect it. | One selected seat at the table | The seat is not deselected by itself. Every seat at the table remains selected. |
| Continue to checkout. Select Remove or the trash icon beside one of the table's seats or ticket rows. Confirm the removal if asked. | One seat or ticket row from the table | The selected seat or ticket row is not removed by itself. Checkout still shows every seat at the table and the full-table total. |
| At checkout, select Edit for the table. On the seating page, try to deselect one seat, then try to save or continue. | One selected seat at the table | The change cannot be saved with only part of the table. Every seat at the table remains in the cart. |
| Return to checkout and refresh the page. | The same cart | Checkout still shows every seat at the table. A partial table does not appear after the refresh. |
| Use Remove for the complete table and confirm the removal. | The complete table | Every seat at the table is removed from the cart together. |
| Add the complete table again and finish the purchase. | Valid customer and payment information when requested | The purchase completes with every seat at the table. A purchase containing only part of the table cannot be completed. |

### SPT-5094: Box Office - Assigned Seating - Full Table Cannot Be Partially Removed

**Description:** Verifies that an employee cannot remove just one seat from a table that must be purchased as a whole. Run this test in Web Box Office and Electron. Check the selected seats on the seating page and the cart on both the Sell and Checkout screens. Removing the whole table is allowed.

Check removal separately at each point in the employee purchase flow:

| Page | Removal point |
| --- | --- |
| Seating page | Select Remove or the trash icon beside one seat, then try to deselect one seat on the map |
| Sell | Select Remove beside one of the table's ticket rows, then select Edit and try to deselect one seat |
| Checkout | Select Remove beside one of the table's ticket rows, then select Edit and try to deselect one seat |

**Preconditions:** An Event or Membership has a table with at least two available seats. Full Table Purchase Required is turned on for that table, which means every available seat at the table must be bought together. The employee is signed in and can sell the Event or Membership in Web Box Office or Electron. If different ticket options can be assigned to seats at the same table, make at least two options available, such as Adult and Child.

**Postconditions:** The completed transaction contains every seat at the table. If the transaction is not completed, remove the whole table from the cart or clear the test cart.

**Priority:** High

**Tags:** assigned-seating, box-office, rules

**Parameters:**
ItemType: Event, Membership

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Box Office and select Sell. Choose the Event or Membership, then open the seating page. | A table with Full Table Purchase Required turned on | The seating page shows the table and all of its available seats. |
| Select fewer than all available seats at the table and try to add them. | Leave at least one available seat unselected | The cart is not updated with only part of the table. Showpass keeps the employee on the seating page or selects the remaining seats needed for the full table. |
| Select every available seat at the table. If ticket options such as Adult and Child are offered, use a different option for at least one seat. Add the seats to the cart. | Every available seat at the table | The cart on the Sell screen shows every seat at the table. |
| Select Edit to reopen the seating page. In the list of selected seats, select Remove or the trash icon beside one seat. | One selected seat at the table | The seat is not removed by itself. Every seat at the table remains selected. |
| On the seating map, select one of the table's selected seats to try to deselect it. | One selected seat at the table | The seat is not deselected by itself. Every seat at the table remains selected. |
| Return to Sell. Select Remove beside one of the table's ticket rows and confirm the removal if asked. | One ticket row from the table | The ticket row is not removed by itself. The cart still shows every seat at the table, and the total does not change to the price of a partial table. |
| On Sell, select Edit for the table. Try to deselect one seat, then try to save or continue. | One selected seat at the table | The change cannot be saved with only part of the table. Every seat at the table remains in the cart. |
| Continue to Checkout. Select Remove beside one of the table's ticket rows and confirm the removal if asked. | One ticket row from the table | The ticket row is not removed by itself. The cart still shows every seat at the table and the full-table total. |
| On Checkout, select Edit for the table. Try to deselect one seat, then try to save or continue. | One selected seat at the table | The change cannot be saved with only part of the table. Every seat at the table remains in the cart. |
| Return to Checkout and refresh the page. | The same cart | Checkout still shows every seat at the table. A partial table does not appear after the refresh. |
| Use Remove for the complete table and confirm the removal. | The complete table | Every seat at the table is removed from the cart together. |
| Add the complete table again and finish the transaction. | Valid customer and payment information when requested | The transaction completes with every seat at the table. A transaction containing only part of the table cannot be completed. |
