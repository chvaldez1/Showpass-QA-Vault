
# **SPW-18577 Qase Test Cases - Dashboard Transactions**

Suite: Showpass Platforms > Web > Dashboard > Transactions

Source reviewed:

- Jira SPW-18577: add invoice financial breakdown display to transactions detail panel
- showpass-frontend PRs: #6154, #6338, #6375, #6395, #6400, #6406, #6437, #6460
- Feature branch head inspected: `feature/spw-18577-closed-view-current-rebased` / `d44b88b52e1149f399bb2aabc3c0bcb3f5b0c075`

Common preconditions:

- Test on beta or the SPW-18577 Vercel preview against beta data.
- Use a venue with `enable_transaction_financial_breakdown` enabled unless the case explicitly says flag-off.
- Tester has `VP_ADMINISTER_TRANSACTIONS` for refund, void, purchase note, and RFID save cases.
- Tester has `VP_SCAN_TICKETS` for Breakdown check-in and undo check-in cases.
- Prepare representative invoices for: sale, refund, transfer, payout, payment received, payment due/service fee, credit memo, complimentary/free order, dispute/chargeback, void, venue credit/account credit refund, exchange, exchange adjustment, exchange refund correction, payment plan, donation payout, products, tickets, memberships, protected order, already-refunded order, cash order, card order, configured-fee venue, absorbed-fee venue, and multi-page invoice items.

## **TC-TXN-001 - Financial breakdown feature flag controls legacy versus migrated transaction detail**

Priority: Critical

Preconditions:

- One venue has `enable_transaction_financial_breakdown` disabled.
- One beta venue has `enable_transaction_financial_breakdown` enabled.

Steps:

1. Open `/manage/box-office/transactions` for the flag-off venue and expand a transaction.
2. Open the same page for the flag-on venue and expand a comparable transaction.

Expected result:

- Flag off: the closed transaction card uses the legacy layout and the expanded section does not show Financial breakdown or Purchase note panels.
- Flag on: the migrated closed card, Breakdown/RFID tabs, financial breakdown, and purchase note panel are shown.
- No transaction actions, copy controls, or item controls fail because of the flag branch.

## **TC-TXN-002 - Collapsed transaction card renders expected data for all invoice families**

Priority: Critical

Preconditions:

- Test data includes sales, refunds, transfers, payouts, payment received, payment due/service fee, credit memos, complimentary/free orders, disputes, voids, venue credit/account credit refunds, donation payout, exchange adjustment, and exchange refund correction.

Steps:

1. Open Transactions with the feature flag enabled.
2. Review each invoice family in collapsed state on desktop.
3. Repeat on a mobile viewport.

Expected result:

- Badge label and badge color match the invoice family.
- Header amount, fees, taxes, extra sublines, and signs match Angular/beta expectations for the invoice family.
- Buyer, organization, or transfer contact block is correct.
- Transaction ID, invoice ID, original invoice ID, charge ID, sold-by, purchase platform, payment type, refund type, and refunded-by fields appear only when applicable.
- Warning/context text appears for refunds, service-fee-only refunds, disputes, payment received, payouts, and venue credit where applicable.
- Long labels and IDs wrap cleanly without overlapping the action menu, copy buttons, or amount text.

## **TC-TXN-003 - Collapsed card identifier copy controls work**

Priority: High

Preconditions:

- Use transactions containing transaction ID, invoice ID, original invoice ID, and charge ID.

Steps:

1. Hover/focus the copy icon beside each copyable ID.
2. Click each copy icon.
3. Paste the copied value into a text field.

Expected result:

- Copy controls appear for transaction ID, invoice ID, original invoice ID, and charge ID.
- Tooltip/accessible label changes from copy state to copied state after clicking.
- Clipboard value exactly matches the visible ID.
- Non-copyable metadata such as sold-by, purchase platform, payment type, refund type, and refunded-by does not show a copy button.

## **TC-TXN-004 - Mobile collapsed card preserves payment metadata and card last4**

Priority: High

Preconditions:

- Use a sale with credit-card payment and card last4.
- Use a non-credit payment sale.

Steps:

1. Open the sale on a mobile viewport.
2. Compare mobile metadata row with desktop header.

Expected result:

- Sale payment type appears in the mobile identifier metadata.
- Credit-card mobile value includes masked last4.
- Desktop still shows payment metadata in the header.
- The invoice badge, date, amount, payment metadata, and ID rows wrap without truncation or overlap.

## **TC-TXN-005 - Collapsed card disclosure expands and collapses without interfering with nested controls**

Priority: High

Steps:

1. Open a transaction card.
2. Click the centered bottom caret band.
3. Click it again.
4. While collapsed and expanded, use the action menu and copy buttons.

Expected result:

- The disclosure visually shows only a centered caret, not "More detail" or "Less detail" text.
- The button updates `aria-expanded` and controls the expanded detail panel.
- Expanding/collapsing does not trigger when using copy buttons or the action menu.
- Action menu and copy controls continue to work independently.

## **TC-TXN-006 - Expanded transaction layout shows Breakdown by default with financial panels on the right**

Priority: Critical

Steps:

1. Expand a transaction with invoice items.
2. Observe the expanded layout.
3. Switch tabs and return to Breakdown.

Expected result:

- Breakdown tab is selected by default.
- Invoice item details render on the left.
- Financial breakdown and purchase note render in the right column on desktop and stack correctly on mobile.
- The layout remains readable with filters open or closed and does not squeeze or overlap content.

## **TC-TXN-007 - Sale-style financial breakdown rows are correct**

Priority: Critical

Preconditions:

- Use sale, payment plan, and exchange invoices with combinations of protection, service fees, payment plan fees, organizer/custom fees, seller commissions, configured taxes, tax, tip, donation, shipping, partial refund, and amount paid.

Steps:

1. Expand each sale-style invoice.
2. Review the financial breakdown row by row.
3. Compare amounts and signs against Angular `/dashboard/financials/invoices/` or backend report/export values.

Expected result:

- Protection Fees row appears for protected transactions with the shield/learn-more affordance.
- Net sales, service fees, payment plan fees, organizer/custom fees, seller commissions, taxes, tip, charity donation, net revenue, add-back rows, shipping, and settlement amount appear only when applicable.
- Deduction rows use negative signs and add-back rows use positive signs.
- Settlement amount uses `amount_paid` and can differ from gross revenue when partially refunded or paid in installments.

## **TC-TXN-008 - Refund and venue credit financial breakdown rows are correct**

Priority: Critical

Preconditions:

- Use refund and venue credit/account credit refund invoices with tax, fees, protection, refunded-by, and refund reason.

Steps:

1. Expand each refund-style transaction.
2. Review the financial breakdown.
3. Create or inspect a refund with a reason, close the modal, and reopen/refresh the transaction.

Expected result:

- Base refund, tax, fees, and total refund rows appear with correct amounts.
- Protection fees appear with the correct negative sign when applicable.
- Refunded by appears when available.
- Refund reason persists into the financial breakdown after the refund modal closes or the page refreshes.
- Venue credit/account credit refund uses the refund-style breakdown and shows its warning/context copy.

## **TC-TXN-009 - Payment due/service fee financial breakdown rows are correct**

Priority: High

Preconditions:

- Use payment due/service fee invoices with tax, fees, and optional protection.

Steps:

1. Expand the payment due/service fee invoice.
2. Review the financial breakdown.

Expected result:

- Base service fee appears when tax is non-zero.
- Tax, fees, protection, and total service fee rows appear only when applicable.
- Amount owing, taxes, refunds, and discounts in the collapsed summary match Angular/beta expectations.
- Payment due rows do not show sale-style or refund-style labels.

## **TC-TXN-010 - Exchange adjustment financial breakdown rows are correct**

Priority: High

Preconditions:

- Use exchange adjustment and exchange refund correction invoices.

Steps:

1. Expand each invoice type.
2. Review signs and row labels.

Expected result:

- Net sales, service fees, and settlement amount rows render.
- Service fees are negative when present.
- Exchange adjustment and exchange refund correction use the clearer Next.js sign format accepted during QA.
- No unrelated sale/refund/payment-due rows appear.

## **TC-TXN-011 - No-breakdown invoice families still show correct collapsed summary and copy**

Priority: High

Preconditions:

- Use transfer, complimentary/free, dispute/chargeback, void, credit memo, payout, payment received, advance, attributed advance, donation payout, and exchange-in-progress invoices.

Steps:

1. Expand each transaction.
2. Review the collapsed card, context messages, and expanded right column.

Expected result:

- Financial breakdown table is suppressed where the variant config requires no breakdown.
- Complimentary/free payments suppress the breakdown even when attached to a sale-like invoice.
- Transfer shows transfer contact layout and original invoice ID.
- Dispute/chargeback, payment received, payout, and service-fee-only refund messages appear with the correct copy and warning/default tone.
- Donation payout label/copy matches the new expected copy.

## **TC-TXN-012 - Breakdown table displays tickets, products, and memberships correctly (Chris)**

Priority: Critical

Preconditions:

- Use invoices containing tickets, products, and memberships.

Steps:

1. Expand a transaction and stay on Breakdown.
2. Expand each invoice item.
3. Review parent and child rows.

Expected result:

- Parent rows show event/date when available, item title, ticket type/subtitle, quantity, price, and total.
- Child rows show barcode or external code, name/member username, status badge, ticket credit usage when applicable, and seat details when applicable.
- Product rows show correct item status where supported.
- Membership rows show correct membership/member status.
- Loading skeletons appear only for rows being loaded and do not replace already-loaded invoice item information.

## **TC-TXN-013 - Breakdown pagination and show-more behavior preserves loaded content**

Priority: High

Preconditions:

- Use an invoice with more child items than the initial page size.

Steps:

1. Expand the invoice item.
2. Load additional child rows using show-more/infinite loading.
3. While loading another page, observe already-loaded rows.

Expected result:

- Existing child rows remain visible while additional rows load.
- New rows append under the correct invoice item.
- Loading state is scoped to the invoice item section and does not blank out unrelated invoice items or financial panels.

## **TC-TXN-014 - Breakdown select-all selects all invoice items, including unloaded items**

Priority: Critical

Preconditions:

- Use an invoice with multiple downloadable invoice items, including items not currently expanded or visible.

Steps:

1. In Breakdown, click the checkbox beside the Items header.
2. Click Download.
3. Click Check in.
4. Unselect the header checkbox.

Expected result:

- Header checkbox selects every eligible invoice item in the invoice, including unloaded and unexpanded items.
- Button label changes to Download all items and Check in all items when applicable.
- Download request targets the whole invoice or all selected item types, not only visible rows.
- Check-in request resolves eligible child tickets even when child rows were not manually expanded first.
- Header checkbox correctly returns to unchecked state after clearing.

## **TC-TXN-015 - Invoice item checkbox selects all child items and shows partial state**

Priority: Critical

Preconditions:

- Use an invoice item with multiple child tickets or members.

Steps:

1. Select the checkbox beside one invoice item.
2. Expand the invoice item.
3. Unselect one child row.
4. Re-select all child rows.

Expected result:

- Invoice item checkbox selects all eligible child items for that invoice item.
- Child rows reflect selected state after expansion.
- Parent checkbox becomes indeterminate when only some child rows are selected.
- Parent checkbox becomes checked when all child rows are selected and unchecked when none are selected.

## **TC-TXN-016 - Download selected and all items supports tickets, products, and memberships**

Priority: Critical

Preconditions:

- Use ticket-only, product-only, membership-only, and mixed invoices.

Steps:

1. Select individual child rows and click Download.
2. Select an invoice item and click Download.
3. Select all invoice items and click Download all items.
4. Repeat for mixed invoices.
5. If the browser blocks multiple downloads/popups, inspect network requests.

Expected result:

- Selected tickets, products, and memberships are included where downloadable.
- Memberships are downloadable where supported.
- Mixed invoices do not download only tickets when products or memberships are selected.
- Browser popup/download blocking does not prevent the expected backend requests from being made.
- Closing the print/download modal clears stale selection state.

## **TC-TXN-017 - Check in and undo check-in work from Breakdown selected state**

Priority: Critical

Preconditions:

- Use invoices with unchecked tickets/products, already checked-in tickets/products, and memberships.

Steps:

1. Select eligible unchecked tickets/products and click Check in.
2. Select already checked-in tickets/products and click Undo check-in.
3. Select all for an invoice where child rows are not expanded and click Check in.
4. Select memberships and observe available actions.
5. Try Check in when every selected item is already checked in.

Expected result:

- Eligible tickets/products check in successfully.
- Eligible checked-in tickets/products can be undone.
- Scoped all-item check-in works even before child rows are expanded.
- Memberships do not show check-in actions and are not sent in check-in payloads.
- If no selected item can be checked in, the user sees a no-op informational message instead of silent failure.

## **TC-TXN-018 - RFID tab visibility and external-code layout**

Priority: High

Preconditions:

- Use one venue/item set that supports RFID/external codes and one that does not.
- Tester has `VP_ADMINISTER_TRANSACTIONS`.

Steps:

1. Expand a transaction for the supported venue/item.
2. Confirm the RFID tab appears and open it.
3. Expand/review ticket, product, and membership rows where supported.
4. Repeat with a venue/item that does not support RFID/external codes or as a read-only user.

Expected result:

- RFID tab appears only when venue permissions and invoice items support RFID/external-code management.
- RFID panel title is "RFID & external codes".
- Rows show barcode/external code, attendee/member name, seat details, delivery method, and fulfillment status where available.
- RFID tab is hidden for unsupported or read-only contexts.

## **TC-TXN-019 - RFID scan, remove, cancel, and save behavior**

Priority: High

Preconditions:

- RFID tab is visible.
- Use rows with and without existing external codes.

Steps:

1. Click Scan on a row without an external code and scan/type a code.
2. Remove a newly staged code before saving.
3. Remove an existing persisted code.
4. Add or remove one or more codes and click Save.
5. Switch back to Breakdown with unsaved changes.

Expected result:

- Row-level Scan opens the scan input/panel for the selected row only.
- Newly staged codes can be cancelled without persisting.
- Existing codes can be staged for unlink/removal.
- Save is disabled until there are pending changes, shows loading while saving, and persists changes after success.
- Returning to Breakdown cancels scan mode/pending scan UI as designed.

## **TC-TXN-020 - Purchase note add, edit, cancel, save, and permission behavior**

Priority: High

Preconditions:

- Use one transaction with an existing purchase note and one without.
- Test with and without `VP_ADMINISTER_TRANSACTIONS`.

Steps:

1. Expand a transaction with an existing note.
2. Click Edit, change the note, click Cancel.
3. Click Edit again, change the note, click Save, and refresh.
4. Expand a transaction without a note and click Add.
5. Save a new note, then clear it and save.
6. Repeat as a user without edit permission.

Expected result:

- Purchase note appears in the right column of the expanded Breakdown layout.
- Add/Edit opens inline editing with textarea, Cancel, and Save.
- Cancel restores the committed note.
- Save persists after refresh.
- Clearing a note removes the read-only body for users without edit permission.
- Users without permission can view existing notes but cannot see Add/Edit controls.
- Add/Edit uses the expected underlined/ghost button style from the wireframe.

## **TC-TXN-021 - Refund modal layout, initial state, and eligibility loading**

Priority: Critical

Preconditions:

- Use refundable and non-refundable transactions.

Steps:

1. Open Refund transaction.
2. Observe loading state while refund options/items load.
3. Observe the refundable layout.
4. Open a non-refundable transaction.

Expected result:

- Loading skeleton displays while authoritative refund options and items load.
- Refundable modal uses two columns on desktop: item selection on the left, refund option/reason/destination/totals on the right.
- On mobile, sections stack and remain usable.
- Non-refundable state displays backend reason and any applicable item list for review.
- Submit button is disabled until a valid refund type and valid selection/amount exist.

## **TC-TXN-022 - Refund option labels, tooltips, disabled states, and selection preservation**

Priority: Critical

Steps:

1. Open Refund transaction with multiple refundable items.
2. Review refund option labels and info tooltips.
3. Switch between Base refund, Full refund excluding Showpass fees, Full refund (fees invoiced), and Full admin refund.
4. Select Custom amount.
5. Test an invoice with credit refund restriction.

Expected result:

- New labels are shown while tooltips include the previously named labels.
- Non-custom refund type changes preserve selected invoice items.
- Switching to Custom amount clears bulk selection and requires explicit item/ticket/member scope.
- Switching away from Custom amount clears child selections that no longer apply.
- Credit-restricted invoices disable refund types that are not allowed.

## **TC-TXN-023 - Refund destination behavior is mutually exclusive**

Priority: Critical

Preconditions:

- Test as admin and non-admin.
- Use invoices with and without a customer/venue user account.
- Include refund types that require original payment source.

Steps:

1. Open Refund transaction.
2. Select Original payment source.
3. Select Organizer credit when visible.
4. As admin, select Do not return funds.
5. Select a refund type that requires original payment source.

Expected result:

- Original payment source, Organizer credit, and Do not return funds behave as mutually exclusive choices.
- Organizer credit appears only when the customer has a Showpass/venue user account and submits `refund_to_credit=true`.
- Do not return funds appears only for admins where record-only refunds are allowed.
- Refund types requiring original source force original-source behavior and disable incompatible destination choices.

## **TC-TXN-024 - Refund item, child quantity, and custom amount behavior**

Priority: Critical

Preconditions:

- Use invoices with multiple invoice items, tickets, memberships, already-refunded rows, customer-refunded rows, protection, donation, and user credit rows.

Steps:

1. Use Select all on a multi-item invoice.
2. Select and unselect individual invoice items.
3. Choose Custom amount and expand an invoice item.
4. Select child tickets/members and enter custom amount.
5. Try selecting non-refundable or already-refunded rows.

Expected result:

- Select all appears only when more than one selectable non-custom target exists.
- Protection rows are filtered from refund item selection.
- Donations, protection, and user credit are not refundable.
- Full admin refund can target customer-refunded rows only when still eligible for admin fee refund.
- Custom amount requires selected child scope and a positive amount.
- Totals update for selected scope, invoice total, previously refunded, and refunding now.

## **TC-TXN-025 - Refund warnings, special payment scenarios, and submission flow**

Priority: Critical

Preconditions:

- Use cash, card, Square/card-present, configured-fee, absorbed-fee, exchange/credit, protected, shipped, payment-plan, and already-refunded invoices.

Steps:

1. Open Refund transaction for each scenario.
2. Review warnings/banners.
3. Submit a valid refund.
4. Confirm the confirmation step.
5. Test backend validation failure and task-loader failure where possible.

Expected result:

- Shipping, payment plan, voucher/credit, protection, service-fee, Square terminal, and already-refunded states show appropriate warnings or disabled states.
- Payment plan refund warns that payments are refunded and the plan is cancelled.
- Square/card-present refunds show terminal pairing state; submit is blocked when a paired terminal is required but missing.
- Standard refunds show processing, complete successfully, invalidate transaction data, and close.
- Square terminal refunds hand off to polling and show completed/failed/canceled/rejected/timeout feedback.
- Backend validation errors remain visible through toast/message and keep the dialog open.

## **TC-TXN-026 - Void dialog uses item-first selection model**

Priority: High

Preconditions:

- Use a voidable transaction with multiple invoice items, child tickets/members, shipped items, voucher credits, and already-voided items.

Steps:

1. Open Void transaction.
2. Review the controls.
3. Use Select all.
4. Select individual parent invoice items.
5. Expand one invoice item and select child tickets/members.
6. Submit parent-only and child-only selections separately.

Expected result:

- Legacy Void type and Void all controls are not shown as separate radio/checkbox concepts.
- Select all selects all eligible parent invoice items.
- Already-voided items are disabled and visually marked.
- Parent-only payload sends invoice items.
- Child-only payload sends tickets/members under selected mode.
- Parent and child payload modes remain exclusive.
- Confirmation step appears before submission.

## **TC-TXN-027 - Transactions filter sidebar and feed layout regressions**

Priority: Medium

Steps:

1. Open Transactions with filters closed and open.
2. Apply filters that return results and no results.
3. Select transactions across different dates/invoice types.
4. Review the filter sidebar.

Expected result:

- Transactions feed and detail cards keep stable readable spacing.
- Filter sidebar does not show "Showing x results", "Loading results...", or "No results" status copy.
- Page-level empty state shows "No results found" when applicable.
- Selecting and expanding transactions does not cause unexpected width jumps or horizontal overflow.

## **TC-TXN-028 - Action and permission visibility across migrated detail**

Priority: High

Preconditions:

- Test full-permission, scan-only, admin-only, and read-only/item-read-only contexts.

Steps:

1. Open a sale-style transaction in each permission context.
2. Review action menu, Breakdown controls, RFID tab, purchase note actions, refund/void actions, and row checkboxes.

Expected result:

- Transaction action menu appears only for variants/policies where enabled.
- Breakdown checkboxes and check-in actions require scan permission and eligible invoice type.
- RFID tab/save requires administer transaction permission and supported items.
- Purchase note Add/Edit requires administer transaction permission.
- Read-only mode hides item action controls while still allowing read-only details to render.

  
