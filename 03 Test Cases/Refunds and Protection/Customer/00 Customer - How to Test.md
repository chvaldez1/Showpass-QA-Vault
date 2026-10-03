---
title: Customer Self-Refunds - How to Test
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/runbook
  - refunds
  - my-orders
---

# Customer — buy, preview, and return an order

This path proves what a **customer** can do from **Account → My Orders**. A returnable item is one the customer can select in **Return order**. An item may appear there but be blocked. Read [[00 Organizer and Venue - How to Test|Organizer and Venue setup]] first to prepare the organization policy and the exact ticket/product switches.

## Prepare independent paid orders

Use a customer account and inbox you control, an approved test payment method, and a published future event whose tickets are on sale. Buy from the event's public page as the **same customer** who will open My Orders. Record the receipt, order/transaction reference, each item's paid price, taxes, fees, shipping, and payment/credit used. Keep tickets unscanned and untransferred for the clean baseline.

| Order | What to buy | Purpose |
| --- | --- | --- |
| A | One paid ticket with its refund switch on | One clean completed return. |
| B | One on-switch ticket and one off-switch ticket in a single order | Mixed-order selection and one-item return. |
| C | A separate on-switch ticket | Cutoff/late-change/duplicate checks; do not reuse A after it is refunded. |
| D | A delayed-delivery ticket; get one unreleased and one released state using the supported release process | Barcode checks. Do not treat a generated backend string as proof the customer received a barcode. |
| E | Two physical-delivery tickets sharing a recorded shipping charge, plus known customer-paid fees | Amount rules and sequential partial returns, if the checkout supports this configuration. |

Do not create every order at once. Save the policy and item choices **before** each purchase, especially for configurable amount rules. If a particular delivery, fee, or barcode-release setup cannot be made with the current product, mark that row **Blocked** with the missing setup; do not invent a visible state.

## Run in this order

| Pass | Start and action | Expected proof | Detailed note |
| --- | --- | --- | --- |
| 1. See an allowed item | As the buyer, Account → My Orders → open Order A → **Return order**. Select the ticket but cancel before submitting. | Ticket selectable; a positive preview belongs to that ticket; no refund after Cancel. | [[SPW-19668-customer-refund-eligibility-test-cases|19668 eligibility]] TC-1. |
| 2. See blocked items | Turn an item's switch off, close the policy, cross a cutoff, or use a blocked barcode/shipping/scan state. Reload its order. | The item is not selectable or the action is unavailable; record the exact message; no money or ticket state changes. | 19668 TC-1–TC-3, TC-6. |
| 3. Check mixed-order choices | With Order B, save each mixed-order rule and reopen Return order. | Selection changes exactly as the rule says; blocked item is never refunded. | 19668 TC-4–TC-5. |
| 4. Complete clean success | Restore the automatic/no-cutoff/independent baseline. Open Order A, read the preview, confirm once, and reopen it. | One final refund/credit equal to preview; ticket no longer returnable; a matching transaction exists. | [[SPW-19671-customer-self-refund-acceptance-test-cases|19671 completion]] TC-1. |
| 5. Complete partial success | Return only the on-switch ticket from Order B. | The second ticket remains paid/usable; no money is returned for it. | 19671 TC-2. |
| 6. Check stale/repeat attempts | Change the rule after preview or reopen an already returned order. | The current rule wins; no second refund or credit. | 19671 TC-3–TC-4. |
| 7. Check money choices | Enable configurable amounts, buy Order E, preview and complete separate refunds under selected shipping/fee rules. | Preview, final customer destination, and item/tax/shipping/fee records reconcile; no double shipping. | [[SPW-19669-customer-refund-amount-rules-test-cases|19669 amounts]]. |
| 8. Check delayed release | With Order D, compare before/after the customer can access its barcode while toggling the Venue opt-in. | Released delayed barcode is blocked with opt-in off and eligible with required settings on, unless another rule blocks it. | [[SPW-19670-delayed-barcode-self-refund-test-cases|19670 delayed barcode]]. |

The organization policy and item switch both matter. **Enable automated returns** in Admin → Venue is a separate legacy setting. The delayed-barcode slice requires it as well as **Allow delayed barcode automated returns**. The exact policy rollout flag is `enable_venue_policy_customer_self_refunds`. Keep its selected-organization targeting recorded; another organization is the control.

## What counts as a completed result

After submitting a return, compare four independent places:

1. **My Orders:** selected item shows returned/refunded; untouched item remains usable. Try the supported Return order action again to confirm the returned item cannot be selected.
2. **Customer money:** the customer's credit balance or original-payment refund history changes **once** by the previewed amount. A success message alone is insufficient. For payment refunds, wait for the provider's final state and record its reference.
3. **Organizer Transactions:** the original sale links to one matching refund/credit adjustment. For amount-rule checks, compare each available component (item, item tax, shipping, shipping tax, selected fee) to the original receipt and finance detail.
4. **Ticket/admission and inventory:** the returned ticket/barcode cannot be used for admission; an untouched ticket still can. Check inventory only if that item and return action are configured to restock.

Keep the original and refund records. Restore configuration values after the run; never erase a paid/refunded order to make a test look clean. For provider failures, use an engineering-controlled test gateway and record whether any refund actually settled before retrying. Without that setup, mark the provider-failure criterion **Blocked**, not Passed.

## Coverage boundaries

Current local source contains the new amount controls and delayed-barcode field, but no browser run here proves the deployed build or saved Venue data. Configurable amount rules apply to compatible new purchases and currently support ticket returns, not products. Customer-facing blocked copy may be generic even when backend reason codes differ. Request-for-approval is not a current policy outcome. See [[SPW-19495-acceptance-criteria|all acceptance criteria]] for the exact pass/block matrix.

**Sources reviewed:** [SPW-19668](https://showpass.atlassian.net/browse/SPW-19668)–[SPW-19671](https://showpass.atlassian.net/browse/SPW-19671); backend `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/invoice/customer_return_eligibility.py`, `customer_return_amounts.py`, `user_invoice_return.py`; frontend `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/`. Source reviewed 2026-10-02; cases are unexecuted.
