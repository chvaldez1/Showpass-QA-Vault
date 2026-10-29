---
title: Customer Self-Refunds - How to Test
status: source-reviewed-not-executed
date: 2026-10-27
tags:
  - qa/runbook
  - refunds
  - my-orders
---

# Customer — buy, preview, and return an order

Client-specific checklist: [[fan-expo-customer-refund-cases|Fan Expo customer refund cases — MEGACON Orlando first pass, exact item configurations and Qase references]].

> [!important] Current page review — 2026-10-27
> [[SPW-19666-customer-self-refunds-test-cases#Current coverage review — 2026-10-27|Start with the current coverage review]]. The repos now use the Admin gate, organization ticket/product switches, refund method/type and shipping rule. Fully blocked orders hide Return order. The approved 35 Qase writes are saved and verified, including new cases SPT-5798–5811. No customer returns were executed. Older dated findings below remain history.


This path proves what a **customer** can do from **Account → My Orders**. A returnable item is one the customer can select in **Return order**. An item may appear there but be blocked. Read [[00 Organizer and Venue - How to Test|Organizer and Venue setup]] first to prepare the organization policy and the exact ticket/product switches.

## Find a case by the setting name

**Current source:** both local develop checkouts were reviewed on 2026-10-27. Use the organization ticket/product switches, the individual item switch, and current refund method/type choices. There is no Customer outcome dropdown. Saved Qase definitions now match those controls; this does not establish the deployed build or an executed result.

| Setting or choice shown in Customer refunds | Case | Qase status |
| --- | --- | --- |
| Allow customer refunds after barcode delivery | [SPT-5325](https://app.qase.io/case/SPT-5325) | Published and verified 2026-10-06; exact delivered-barcode preparation included. |
| Allow customer refunds after fulfillment or shipping | [SPT-5326](https://app.qase.io/case/SPT-5326) | Published and verified 2026-10-06; exact Standard Shipping/Fulfilled preparation included. |
| Allow customer refunds after check-in or scan | [SPT-5327](https://app.qase.io/case/SPT-5327) | Published and verified 2026-10-06; active scan-window and admission preparation included. |
| Block when any remaining item is ineligible | [SPT-5312](https://app.qase.io/case/SPT-5312) | Exact option appears in the title; saved and verified 2026-10-06. |
| Refund eligible items independently | [SPT-5315](https://app.qase.io/case/SPT-5315) | Exact option appears in the title; saved and verified 2026-10-06. |
| Require the whole remaining order | [SPT-5321](https://app.qase.io/case/SPT-5321) preview; [SPT-5322](https://app.qase.io/case/SPT-5322) blocked-item recovery; [SPT-5324](https://app.qase.io/case/SPT-5324) actual return | Current supported preview, recovery, and completion cases were updated and verified 2026-10-27. SPT-5323 remains withheld because its package expectation is obsolete. |
| Refund amounts on the customer side | [[SPW-19669-customer-refund-amount-rules-test-cases|Amount rules]] TC-2 (four shipping rules), TC-3 (refund type × refund method), TC-4 (changed method/type), TC-5 (changed shipping preview) | SPT-5308 now saves 24 current method/type/shipping combinations. Changed-method/type and changed-shipping checks are SPT-5806/5807. Detailed shipping/fee calculation TC-2/TC-3 remain local pending original financial evidence. |

The revised three restriction cases each save the corresponding **Allow customer refunds after…** switch **off → on**, check the saved value, preview, and Cancel. They do not complete a refund. An electronic product cannot be substituted for the Standard Shipping purchase in the fulfillment case. The restriction cases are saved and verified in Customer (1108); no manual case has been executed here.

## Purchase configurations and coverage boundaries

Run each configuration as its own purchase. The updated standalone cases specify exact flags, employee permissions, prices, inventory, barcode choices, refund switches, and what to select. **SPT-5309 and SPT-5314 were updated and verified 2026-10-27; no configuration below has been executed here.** “Ticket + product package” means the ticket includes a product through a package relationship. Buying a separate product in the same checkout is a different configuration.

| Purchase | Setup and expected proof | Local case / status |
| --- | --- | --- |
| General Admission ticket | One paid ticket with no package or assigned seat. Turning its switch on allows selection; completing the return marks it returned and adds the previewed Organizer Credit. | Eligibility TC-1 TicketType; completion TC-1 TicketType — manual-only. |
| Product checkout add-on | One paid admission with its switch off plus one separately priced product variant with its switch on. Return only the product; admission stays paid. | Eligibility TC-1 Product; completion TC-1 Product — manual-only. |
| Standalone product | Product visible on the organization's public page; buy one variant without admission. Return only that variant. | Both TC-1 StandaloneProduct — manual-only. |
| Ticket and separately priced product | Both switches on; buy one of each. Select both. One customer return may contain multiple item adjustments; their combined amount and the customer credit increase must match the preview. | Completion TC-1 TicketAndProduct — manual-only; this is not a package. |
| Individual assigned seat | Existing public map, one individually sold seat, no shared hold, membership, full-table requirement, resale, or package. Cancel keeps ownership; completed return makes that seat available again. | Both TC-1 AssignedSeat — manual-only. |
| Preset ticket package, single barcode (independent-item policy) | 20.00 package listing includes one of each of two ticket types; Parent revenue, Send a single barcode on, Allow redemption on any included item off. Return the listing once; both included tickets must also be returned. | Both TC-1 TicketPackage — manual-only. |
| Ticket + product package | The ticket includes a product through a saved package relationship. The old blanket selection-failure expectation conflicts with the current purchased-parent handling. | Historical eligibility TC-9 is withheld. A supported positive recipe plus blocked included-item cases still need agreement; do not execute it as a current negative. |
| Ticket package with separate barcodes | Select the purchased listing while preserving the included ticket relationships. | Exact separate-barcode setup and result need their own current-source recipe; the single-barcode case is not proof. |
| Package with a blocked included item | A blocked, scanned, fulfilled, transferred, or already returned included item can also block its package. | Deferred focused package-negative checks. |
| Products and ticket + product packages under the current policy | Eligible products now share the paid policy calculation. Ordinary product cases are retained; package parent/child behavior needs the current-source check rather than the old blanket block expectation. | Ordinary product cases are published; additional package configurations remain deferred. |
| Package using Child revenue under the current policy | Unsupported package revenue distribution is rejected before a return amount is quoted. | Separate negative amount-rules scope. |
| Custom/nested packages or packages with seating | Choice requirements, hierarchy, allocation, and seat dependencies change setup and proof. | Deferred until each exact configuration has an executable recipe; not covered by Preset. |
| Full tables, General Admission seating sections, shared maps, or membership seats | Release depends on the layout and other entitlements. | Deferred separate seating recipes; not covered by an individual seat. |
| Memberships and vouchers | No supported customer-refund owner/toggle was established for these item types; current eligibility accepts tickets and products. | Not applicable to these positive cases; product/engineering scope question. |
| Delayed barcodes, fulfilled products, checked-in tickets | Require their own prepared delivery/scan states and restriction choices. | Restriction cases TC-6, TC-12, TC-13 and separate delayed-barcode notes; unexecuted. |
| Discounts, gift cards, mixed credit/card payments, payment plans, protection, shipping | Change refundable components or funding; the clean case excludes them. | Separate financial cases or deferred setup, not covered by the clean baseline. |
| Return money to the original payment method | Requires Revert Funds and final provider/payment proof. | SPT-5809 is the clean original-card return case for a selected ticket or product; not run. |
| Admission rejection and stock after return | Check a returned barcode and each item's configured stock behavior; physical product stock is not assumed to increase. | SPT-5811 checks returned-barcode refusal and a paid control; stock/restock still needs separate configured checks. |

Use the detailed [[SPW-19668-customer-refund-eligibility-test-cases|eligibility cases]] to prove selection without submitting, and [[SPW-19671-customer-self-refund-acceptance-test-cases|completion cases]] to prove the final return. Do not substitute a product add-on for the ticket + product package row.

## Whole-order configurations to run

**Require the whole remaining order** means every still-paid item must qualify and be included; the customer cannot return only one qualifying item while another remaining item is blocked. Set this under **Dashboard → Organization → Organization settings → Customer refunds → Orders with mixed eligibility**.

| Check | Exact purchase configurations | Case to follow |
| --- | --- | --- |
| Preview includes all purchases; cancel keeps them paid | Two different General Admission ticket types; one admission + separately priced product add-on; two individual assigned seats of one ticket type | [[SPW-19668-customer-refund-eligibility-test-cases#TC-4: My Orders - Refunds - Require the whole remaining order - Include every remaining purchase in the preview|Eligibility TC-4]]; three runs. |
| Complete the required return and reconcile credit | The same three configurations, each on a newly purchased order | [[SPW-19671-customer-self-refund-acceptance-test-cases#TC-5: My Orders - Refunds - Require the whole remaining order - Return every remaining purchase for organizer credit|Completion TC-5]]; three runs. |
| One item blocks the whole order, then enabling it restores selection | Two ticket types with one switch off; admission on + separate product off | [[SPW-19668-customer-refund-eligibility-test-cases#TC-10: My Orders - Refunds - Require the whole remaining order - Block the order until every remaining item allows refunds|Eligibility TC-10]]; two runs. |
| Additional whole-order package configurations | Single-barcode Preset ticket package; ticket + included product using a Sub-product relation | Historical eligibility TC-11 and SPT-5323 are withheld. The current purchased-parent behavior invalidates the old blanket selection failure; agree on supported positive and blocked-child recipes before execution. |
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
| 3. Check mixed-order choices | Prepare a separate order for each row in Whole-order configurations to run; use the exact switch settings in its linked case. | All required items remain selected; a blocked remaining item prevents the entire return; package boundaries are recorded separately. | 19668 TC-4 and TC-10 (TC-11 is historical and withheld); 19671 TC-5 for completion. Block-if-any remains 19668 TC-5. |
| 4. Complete clean success | Restore the automatic/no-cutoff/independent baseline. Open Order A, read the preview, confirm once, and reopen it. | One final refund/credit equal to preview; ticket no longer returnable; a matching transaction exists. | [[SPW-19671-customer-self-refund-acceptance-test-cases|19671 completion]] TC-1. |
| 5. Complete partial success | Return only the on-switch ticket from Order B. | The second ticket remains paid/usable; no money is returned for it. | 19671 TC-2. |
| 6. Check stale/repeat attempts | Change the rule after preview or reopen an already returned order. | The current rule wins; no second refund or credit. | 19671 TC-3–TC-4. |
| 7. Check money choices | Save the selected refund method, refund type and shipping rule, buy the prepared new order, then preview and complete the planned return. | Preview matches Organizer Credit and combined Transactions adjustments; no double shipping. Separate financial-component proof is still blocked where the UI combines tax/fee values. | [[SPW-19669-customer-refund-amount-rules-test-cases|19669 amounts]]. |
| 8. Check delayed release | With Order D, compare before/after the customer can access its barcode while toggling the Venue opt-in. | Released delayed barcode is blocked with opt-in off and eligible with required settings on, unless another rule blocks it. | [[SPW-19670-delayed-barcode-self-refund-test-cases|19670 delayed barcode]]. |

The organization policy and item switch both matter. **Enable automated returns** in Admin → Venue is a separate legacy setting. The delayed-barcode slice requires it as well as **Allow delayed barcode automated returns**. The exact policy rollout flag is `enable_venue_policy_customer_self_refunds`. Keep its selected-organization targeting recorded; another organization is the control.

## What counts as a completed result

After submitting a return, compare four independent places:

1. **My Orders:** selected item shows returned/refunded; untouched item remains usable. Try the supported Return order action again to confirm the returned item cannot be selected.
2. **Customer money:** the customer's credit balance or original-payment refund history changes **once** by the previewed amount. A success message alone is insufficient. For payment refunds, wait for the provider's final state and record its reference.
3. **Organizer Transactions:** the original sale links to the expected refund/credit adjustments. One customer return can contain several item adjustments; their combined sum must match the single preview total without extra credit. For amount-rule checks, compare available totals to the original purchase. The reviewed Transactions refund panel combines some taxes and does not show every stored component; full component proof needs an approved finance/backend comparison.
4. **Ticket/admission and inventory:** the returned ticket/barcode cannot be used for admission; an untouched ticket still can. Check inventory only if that item and return action are configured to restock.

Keep the original and refund records. Restore configuration values after the run; never erase a paid/refunded order to make a test look clean. For provider failures, use an engineering-controlled test gateway and record whether any refund actually settled before retrying. Without that setup, mark the provider-failure criterion **Blocked**, not Passed.

## Coverage boundaries

Current local source contains the new amount controls and delayed-barcode field, but no browser run here proves the deployed build or saved Venue data. The current policy calculation supports eligible tickets and products. Missing purchase components can require organizer assistance. Customer-facing blocked copy may be generic even when backend reason codes differ. Request-for-approval is not a current policy outcome. See [[SPW-19495-acceptance-criteria|all acceptance criteria]] for the exact pass/block matrix.

**Sources reviewed:** [SPW-19668](https://showpass.atlassian.net/browse/SPW-19668)–[SPW-19671](https://showpass.atlassian.net/browse/SPW-19671); backend `/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/invoice/customer_return_eligibility.py`, `customer_return_amounts.py`, `user_invoice_return.py`; frontend `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/`. Current behavior rechecked against both local develop sources 2026-10-27; exact revisions are in Start Here. Earlier October reviews are history. Additional sources: backend `apps/tickets/admin/packages.py`, `models/packages_management/sub_ticket_option.py`, `services/fulfillment/ticket_generator_service.py`; frontend My Orders `utils/invoice-ticket-utils.ts`. Amount-rule setup refreshed 2026-10-07 against the saved backend origin/develop and supplied frontend branch. Cases are unexecuted.
