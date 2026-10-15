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

## Find a case by the setting name

**Source checks:** on 2026-10-06 the local backend checkout lacked the new **Allow customer refunds for tickets/products** switches. The 2026-10-07 SPW-19669 review found both switches in the already-fetched backend `origin/develop` snapshot `85b3fc96f047cb7b3d6f71a26c0442574cc7f403`; the local checkout is still older. For that reviewed version, enable the policy and the ticket switch for positive amount cases; there is no Customer outcome dropdown in the current frontend. This does not prove the deployed build or update SPT-5310. See [[SPW-19669-customer-refund-amount-rules-test-cases|current amount setup]] for the exact revisions and [[SPW-19668-customer-refund-eligibility-test-cases|the earlier eligibility review]] for its historical mismatch.

| Setting or choice shown in Customer refunds | Case | Qase status |
| --- | --- | --- |
| After barcode delivery | [SPT-5325](https://app.qase.io/case/SPT-5325) | Published and verified 2026-10-06; exact delivered-barcode preparation included. |
| After fulfillment or shipping | [SPT-5326](https://app.qase.io/case/SPT-5326) | Published and verified 2026-10-06; exact Standard Shipping/Fulfilled preparation included. |
| After check-in or scan | [SPT-5327](https://app.qase.io/case/SPT-5327) | Published and verified 2026-10-06; active scan-window and admission preparation included. |
| Block when any remaining item is ineligible | [SPT-5312](https://app.qase.io/case/SPT-5312) | Exact option appears in the title; saved and verified 2026-10-06. |
| Refund eligible items independently | [SPT-5315](https://app.qase.io/case/SPT-5315) | Exact option appears in the title; saved and verified 2026-10-06. |
| Require the whole remaining order | [SPT-5321](https://app.qase.io/case/SPT-5321) preview; [SPT-5322](https://app.qase.io/case/SPT-5322) blocked-item recovery; [SPT-5323](https://app.qase.io/case/SPT-5323) package limitation; [SPT-5324](https://app.qase.io/case/SPT-5324) actual return | All four published and verified 2026-10-06; exact option appears in each title. |
| Refund amounts on the customer side | [[SPW-19669-customer-refund-amount-rules-test-cases|Amount rules]] TC-2 (four shipping rules), TC-3 (four fee selections), TC-4 (changed amount after preview) | Local, unexecuted drafts. SPT-5308's 16-combination settings enhancement is saved and verified 2026-10-07; the customer drafts remain unpublished. |

The three restriction cases each save **Block customer refunds → Allow customer refunds**, check the saved value, preview, and Cancel. They do not complete a refund. An electronic product cannot be substituted for the Standard Shipping purchase in the fulfillment case. All nine approved changes are saved and verified in Customer (1108); no manual case has been executed here.

## Purchase configurations and coverage boundaries

Run each configuration as its own purchase. The updated standalone cases specify exact flags, employee permissions, prices, inventory, barcode choices, refund switches, and what to select. **SPT-5309 and SPT-5314 were updated and verified 2026-10-06; no configuration below has been executed here.** “Ticket + product package” means the ticket includes a product through a package relationship. Buying a separate product in the same checkout is a different configuration.

| Purchase | Setup and expected proof | Local case / status |
| --- | --- | --- |
| General Admission ticket | One paid ticket with no package or assigned seat. Turning its switch on allows selection; completing the return marks it returned and adds the previewed Organizer Credit. | Eligibility TC-1 TicketType; completion TC-1 TicketType — manual-only. |
| Product checkout add-on | One paid admission with its switch off plus one separately priced product variant with its switch on. Return only the product; admission stays paid. | Eligibility TC-1 Product; completion TC-1 Product — manual-only. |
| Standalone product | Product visible on the organization's public page; buy one variant without admission. Return only that variant. | Both TC-1 StandaloneProduct — manual-only. |
| Ticket and separately priced product | Both switches on; buy one of each. Select both. Two credit records may be created; their combined amount must match the preview. | Completion TC-1 TicketAndProduct — manual-only; this is not a package. |
| Individual assigned seat | Existing public map, one individually sold seat, no shared hold, membership, full-table requirement, resale, or package. Cancel keeps ownership; completed return makes that seat available again. | Both TC-1 AssignedSeat — manual-only. |
| Preset ticket package, single barcode (independent-item policy) | 20.00 package listing includes one of each of two ticket types; Parent revenue, Send a single barcode on, Allow redemption on any included item off. Return the listing once; both included tickets must also be returned. | Both TC-1 TicketPackage — manual-only. |
| Ticket + product package | New ticket without sales, one product variant, Admin → Tickets → Sub-product relations → Add → Ticket type / Product / Quantity 1 / Use parent barcode off / Include in fees on. Both refund switches on, amount rules off. Source predicts no usable customer selection, with both items remaining paid. | Eligibility TC-9 — local only, current-behavior check. Successful package return is blocked pending the frontend selection issue and an agreed product expectation. |
| Ticket package with separate barcodes | Current customer page displays included tickets while the backend requires selection of the package listing. | Deferred separate negative/integration case; do not count the single-barcode run as coverage. |
| Package with a blocked included item | A blocked, scanned, fulfilled, transferred, or already returned included item can also block its package. | Deferred focused package-negative checks. |
| Product or ticket + product package with configurable amounts on | Amount-rule eligibility supports tickets only; a product is rejected, and an included blocked product blocks its package. | Separate negative scope under the amount-rules card; not a successful-return parameter. |
| Package using child revenue with configurable amounts on | Unsupported package revenue distribution is rejected before a return amount is quoted. | Separate negative amount-rules scope. |
| Custom/nested packages or packages with seating | Choice requirements, hierarchy, allocation, and seat dependencies change setup and proof. | Deferred until each exact configuration has an executable recipe; not covered by Preset. |
| Full tables, General Admission seating sections, shared maps, or membership seats | Release depends on the layout and other entitlements. | Deferred separate seating recipes; not covered by an individual seat. |
| Memberships and vouchers | No supported customer-refund owner/toggle was established for these item types; current eligibility accepts tickets and products. | Not applicable to these positive cases; product/engineering scope question. |
| Delayed barcodes, fulfilled products, checked-in tickets | Require their own prepared delivery/scan states and restriction choices. | Restriction cases TC-6, TC-12, TC-13 and separate delayed-barcode notes; unexecuted. |
| Discounts, gift cards, mixed credit/card payments, payment plans, protection, shipping | Change refundable components or funding; the clean case excludes them. | Separate financial cases or deferred setup, not covered by the clean baseline. |
| Return money to the original payment method | Requires Revert Funds and final provider/payment proof. | Separate proof still needed; Organizer Credit cases do not prove a cash refund. |
| Admission rejection and stock after return | Check a returned barcode and each item's configured stock behavior; physical product stock is not assumed to increase. | Deferred integration checks beyond visible returned status. |

Use the detailed [[SPW-19668-customer-refund-eligibility-test-cases|eligibility cases]] to prove selection without submitting, and [[SPW-19671-customer-self-refund-acceptance-test-cases|completion cases]] to prove the final return. Do not substitute a product add-on for the ticket + product package row.

## Whole-order configurations to run

**Require the whole remaining order** means every still-paid item must qualify and be included; the customer cannot return only one qualifying item while another remaining item is blocked. Set this under **Dashboard → Organization → Organization settings → Customer refunds → Orders with mixed eligibility**.

| Check | Exact purchase configurations | Case to follow |
| --- | --- | --- |
| Preview includes all purchases; cancel keeps them paid | Two different General Admission ticket types; one admission + separately priced product add-on; two individual assigned seats of one ticket type | [[SPW-19668-customer-refund-eligibility-test-cases#TC-4: My Orders - Refunds - Require the whole remaining order - Include every remaining purchase in the preview|Eligibility TC-4]]; three runs. |
| Complete the required return and reconcile credit | The same three configurations, each on a newly purchased order | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-5: My Orders - Refunds - Require the whole remaining order - Return every remaining purchase for organizer credit|Completion TC-5]]; three runs. |
| One item blocks the whole order, then enabling it restores selection | Two ticket types with one switch off; admission on + separate product off | [[SPW-19668-customer-refund-eligibility-test-cases#TC-10: My Orders - Refunds - Require the whole remaining order - Block the order until every remaining item allows refunds|Eligibility TC-10]]; two runs. |
| Current package selection limitation leaves everything paid | Single-barcode Preset ticket package; admission + included product using a Sub-product relation with separate barcodes; all switches on | [[SPW-19668-customer-refund-eligibility-test-cases#TC-11: My Orders - Refunds - Require the whole remaining order - Keep package purchases paid when selection is unavailable|Eligibility TC-11]]; two runs. This checks current source behavior, not successful package-return acceptance. |
| An item was already returned before whole-order mode was enabled | Requires a separately prepared partial-return order and fresh customer selection | Deferred dedicated case. Do not count the all-paid cases above as proof. |

Each linked case contains its own preparation table, exact item settings, required permissions, purchase quantities, and follow-up checks. **The four whole-order cases are published and verified as SPT-5321–5324; manual execution remains outstanding.** For Organizer Credit, preserve the completed return and credit history. For preview-only checks, Cancel leaves the purchase paid.

## Prepare independent paid orders

Use a customer account and inbox you control, an approved test payment method, and a published future event whose tickets are on sale. Buy from the event's public page as the **same customer** who will open My Orders. Record the receipt, order/transaction reference, each item's paid price, taxes, fees, shipping, and payment/credit used. Keep tickets unscanned and untransferred for the clean baseline.

| Order | What to buy | Purpose |
| --- | --- | --- |
| A | One paid ticket with its refund switch on | One clean completed return. |
| B | One on-switch ticket and one off-switch ticket in a single order | Mixed-order selection and one-item return. |
| C | A separate on-switch ticket | Cutoff/late-change/duplicate checks; do not reuse A after it is refunded. |
| D | A delayed-delivery ticket; get one unreleased and one released state using the supported release process | Barcode checks. Do not treat a generated backend string as proof the customer received a barcode. |
| E | Two 10.00 General Admission tickets with Standard Shipping, one 8.00 Flat rate charge; separate Electronic Ticket orders with both customer-paid fee classes. | Follow the complete shipping/fee setup in [[SPW-19669-customer-refund-amount-rules-test-cases|19669 TC-2/TC-3]]; TC-4 uses another fresh order. |

Do not create every order at once. Save the policy and item choices **before** each purchase, especially for configurable amount rules. If a particular delivery, fee, or barcode-release setup cannot be made with the current product, mark that row **Blocked** with the missing setup; do not invent a visible state.

## Run in this order

| Pass | Start and action | Expected proof | Detailed note |
| --- | --- | --- | --- |
| 1. See an allowed item | As the buyer, Account → My Orders → open Order A → **Return order**. Select the ticket but cancel before submitting. | Ticket selectable; a positive preview belongs to that ticket; no refund after Cancel. | [[SPW-19668-customer-refund-eligibility-test-cases|19668 eligibility]] TC-1. |
| 2. See blocked items | Turn an item's switch off, close the policy, cross a cutoff, or use a blocked barcode/shipping/scan state. Reload its order. | The item is not selectable or the action is unavailable; record the exact message; no money or ticket state changes. | 19668 TC-1–TC-3, TC-6, TC-12–TC-13. |
| 3. Check mixed-order choices | Prepare a separate order for each row in Whole-order configurations to run; use the exact switch settings in its linked case. | All required items remain selected; a blocked remaining item prevents the entire return; package boundaries are recorded separately. | 19668 TC-4, TC-10–TC-11; 19671 TC-5 for completion. Block-if-any remains 19668 TC-5. |
| 4. Complete clean success | Restore the automatic/no-cutoff/independent baseline. Open Order A, read the preview, confirm once, and reopen it. | One final refund/credit equal to preview; ticket no longer returnable; a matching transaction exists. | [[SPW-19671-customer-self-refund-acceptance-test-cases|19671 completion]] TC-1. |
| 5. Complete partial success | Return only the on-switch ticket from Order B. | The second ticket remains paid/usable; no money is returned for it. | 19671 TC-2. |
| 6. Check stale/repeat attempts | Change the rule after preview or reopen an already returned order. | The current rule wins; no second refund or credit. | 19671 TC-3–TC-4. |
| 7. Check money choices | Enable configurable amounts, buy Order E, preview and complete separate refunds under selected shipping/fee rules. | Preview matches Organizer Credit and combined Transactions adjustments; no double shipping. Separate financial-component proof is still blocked where the UI combines tax/fee values. | [[SPW-19669-customer-refund-amount-rules-test-cases|19669 amounts]]. |
| 8. Check delayed release | With Order D, compare before/after the customer can access its barcode while toggling the Venue opt-in. | Released delayed barcode is blocked with opt-in off and eligible with required settings on, unless another rule blocks it. | [[SPW-19670-delayed-barcode-self-refund-test-cases|19670 delayed barcode]]. |

The organization policy and item switch both matter. **Enable automated returns** in Admin → Venue is a separate legacy setting. The delayed-barcode slice requires it as well as **Allow delayed barcode automated returns**. The exact policy rollout flag is `enable_venue_policy_customer_self_refunds`. Keep its selected-organization targeting recorded; another organization is the control.

## What counts as a completed result

After submitting a return, compare four independent places:

1. **My Orders:** selected item shows returned/refunded; untouched item remains usable. Try the supported Return order action again to confirm the returned item cannot be selected.
2. **Customer money:** the customer's credit balance or original-payment refund history changes **once** by the previewed amount. A success message alone is insufficient. For payment refunds, wait for the provider's final state and record its reference.
3. **Organizer Transactions:** the original sale links to the expected refund/credit adjustments. A separately priced ticket and product returned together can produce two records; their sum must match the single preview total. For amount-rule checks, compare available totals to the original purchase. The reviewed Transactions refund panel combines some taxes and does not show every stored component; full component proof needs an approved finance/backend comparison.
4. **Ticket/admission and inventory:** the returned ticket/barcode cannot be used for admission; an untouched ticket still can. Check inventory only if that item and return action are configured to restock.

Keep the original and refund records. Restore configuration values after the run; never erase a paid/refunded order to make a test look clean. For provider failures, use an engineering-controlled test gateway and record whether any refund actually settled before retrying. Without that setup, mark the provider-failure criterion **Blocked**, not Passed.

## Coverage boundaries

Current local source contains the new amount controls and delayed-barcode field, but no browser run here proves the deployed build or saved Venue data. Configurable amount rules apply to compatible new purchases and currently support ticket returns, not products. Customer-facing blocked copy may be generic even when backend reason codes differ. Request-for-approval is not a current policy outcome. See [[SPW-19495-acceptance-criteria|all acceptance criteria]] for the exact pass/block matrix.

**Sources reviewed:** [SPW-19668](https://showpass.atlassian.net/browse/SPW-19668)–[SPW-19671](https://showpass.atlassian.net/browse/SPW-19671); backend `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/invoice/customer_return_eligibility.py`, `customer_return_amounts.py`, `user_invoice_return.py`; frontend `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/`. Source reviewed 2026-10-02; item-configuration review added 2026-10-06. Additional sources: backend `apps/tickets/admin/packages.py`, `models/packages_management/sub_ticket_option.py`, `services/fulfillment/ticket_generator_service.py`; frontend My Orders `utils/invoice-ticket-utils.ts`. Amount-rule setup refreshed 2026-10-07 against the saved backend origin/develop and supplied frontend branch. Cases are unexecuted.
