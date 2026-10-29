---
title: Fan Expo Customer Refund Cases
date: 2026-10-29
tags:
  - qa/test-cases
  - qa/refunds
  - fan-expo
status: Customer refund checklist; not executed
---

# Fan Expo customer refund cases

**Customer refunds are the scope.** The [MEGACON Orlando Buy Tickets page](https://megaconorlando.fanexpohq.com/buy-tickets/?eventSlug=buy-tickets) was inspected only to identify the tickets, Packages, Products and delivery configurations that can supply refund orders. Browsing categories, checkout navigation, payment controls and waitlist signup are **not refund test cases**.

This checklist contains **11 refund checks**, with the exact purchased items, expected return behavior and corresponding Qase references. **No customer refund case has been run.** No purchase, waitlist signup or return was completed, and no extra ticket or Product was added during the setup inspection.

## How to use this checklist

* Use the purchasing Customer's existing paid orders for this client and Organization. Record each order reference and its exact ticket, Package, Product variant and delivery method. If no matching order is available, leave that case Not run; do not create another purchase just to fill the table.
* Open **Showpass → Account → My Orders → the matching order → Return order**. For a permitted preview, select only the purchase named in the case, read the preview, then **Cancel**. The account path is confirmed by source and the existing cases; a My Orders link from the client's inspected menu was not established.
* Keep the supplied Organization policy unchanged: **Tickets on, Products off, Refund eligible items independently**. Read the required gates and item switches in the preparation notes; do not change shared settings to fit a generic Qase case.
* Qase IDs identify existing definitions, not completed runs. **Related** means the saved case does not cover this exact setup. Do not perform its purchase, configuration changes or final refund as part of a preview-only run.
* Date/cutoff boundary tests are excluded. There is no need to wait for the event. A positive preview still needs an order that is currently before its saved refund deadline.

## Customer refund cases and Qase IDs

**Every row below is Not run.** No paid order was opened or returned in this inspection. Use the Customer who owns the order. All positive rows require the individual **Allow customer-initiated refunds** switch on and no additional blocker; see the preparation notes below. Cancel every permitted preview.

| Local case | Exact existing order to use | What to do | Expected result under the supplied policy | Qase reference / gap |
| --- | --- | --- | --- | --- |
| TC-01 — Preview an eligible ordinary ticket | One paid **4-DAY PASS** or Single Day ticket; not fulfilled, checked in, transferred or refunded; no Package or Product. | Open its order options → Return order → select quantity 1 → read the preview → Cancel. | The ticket is selectable and the preview refers only to that purchase. Reopen the order: it remains paid. | [SPT-5309](https://app.qase.io/case/SPT-5309), **ItemType = TicketType** — preview portion; its switch-changing setup is not part of this run. |
| TC-02 — An individual ticket switch can still block refunds | One otherwise eligible paid ticket whose own **Allow customer-initiated refunds** is off, with no eligible companion purchase. | Inspect that order's options. Do not turn the item switch on during this pass. | **Return order is hidden**, despite Organization ticket refunds being on. | [SPT-5309](https://app.qase.io/case/SPT-5309) — initial blocked portion. |
| TC-03 — Returnable ticket plus a separate blocked Product | One paid admission and one separately added **FAN EXPO BAG**, T-shirt or merchandise bundle. Both individual switches are on; the Organization's Product switch is off. This is not a Package relationship. | Open Return order, inspect both purchases, select the ticket only, read the preview and Cancel. | The ticket is selectable; the Product is blocked and contributes nothing to the preview. **Refund eligible items independently** allows the ticket to be selected. | [SPT-5804](https://app.qase.io/case/SPT-5804), **AllowedItems = TicketsOnly**. The saved case's broader initial settings/medium do not authorize changing this client. |
| TC-04 — A blocked included Product blocks its ticket Package | A paid ticket + Product Package, with an actual included Product relationship and all individual switches on. Use Ultimate only after confirming that relationship. No unrelated eligible item in the order. | Inspect the Package's order options. Do not attempt to return the included ticket or Product separately. | The included Product is blocked by **Allow customer refunds for products = off**. The Package cannot be selected; **Return order is hidden** if nothing else is eligible. Independent refunds do not split a Package. | **No matching published case identified.** [SPT-3760](https://app.qase.io/case/SPT-3760) covers purchase setup only. Do not use historical SPT-5323's blanket Package failure as proof. |
| TC-05 — A ticket-only Package is selected through its listing | One paid **Family Pass** confirmed to contain admission tickets only, with **Package revenue realization type = Parent**. Listing and every included ticket switch are on; all remain unfulfilled/unscanned. | Open Return order and select the purchased Package listing; inspect the included tickets and preview, then Cancel. | The purchased Package is selected once. Included tickets cannot be returned separately, and their face prices are not charged/refunded again on top of the Package price. | [SPT-5309](https://app.qase.io/case/SPT-5309), **ItemType = TicketPackage** — related recipe; adapt the included types/counts to the saved Family Pass. |
| TC-06 — A Product-only order cannot be returned | A Customer-owned paid Product-only order for this Organization, with no admission ticket; individual Product switch on. The inspected client did not establish a standalone Product purchase path. | If such an existing order is available, inspect its options. Do not invent a Product-only URL or create another purchase. | **Return order is hidden** while Organization Product refunds are off. The Product's own enabled switch cannot override that setting. | **No direct published case identified.** SPT-5804 proves mixed-order choices, not this all-Product order. Leave Not run if the matching client/order is unavailable. |
| TC-07 — A delivered standard barcode does not by itself block the ticket | One otherwise eligible ordinary ticket whose **Default** barcode is visible to the Customer. It is not delayed delivery, customer activation, fulfilled or checked in. | Open Return order, select the ticket, read the preview and Cancel. | The ticket remains selectable because **Allow customer refunds after barcode delivery = on**. | [SPT-5325](https://app.qase.io/case/SPT-5325) — Allow portion only; no policy change. |
| TC-08 — A shipped or collected ticket cannot be returned | One admission ticket already saved as **Fulfilled**: use separate data runs for a shipped badge and a collected Pick up ticket. It must otherwise qualify and remain unscanned. Use existing operational records; do not mark a real order fulfilled for this inspection. | Inspect the order options. | That fulfilled ticket cannot be selected because **Allow customer refunds after fulfillment or shipping = off**. If it is the only purchase, Return order is hidden. Merely choosing Standard shipping before fulfillment is not enough to block it. | [SPT-5326](https://app.qase.io/case/SPT-5326) is **related but uses a Product**. A ticket version is needed; Products off would mask the intended fulfillment check in its saved setup. |
| TC-09 — A checked-in ticket cannot be returned | One Customer-owned ticket already used for admission, otherwise within its current refund rules and not fulfilled. Do not perform a new scan or change event dates in this pass. | Inspect the order options. | The used ticket cannot be selected because **Allow customer refunds after check-in or scan = off**. If nothing else qualifies, Return order is hidden. | [SPT-5327](https://app.qase.io/case/SPT-5327) — blocked portion only; no switch change or new admission. |
| TC-10 — Refund preview uses the original amounts and correct destination | One eligible ordinary ticket with **Pick up**, then a separate eligible **unshipped Standard Shipping** order. Use the original receipts and saved refund medium/type; identify each order's original shipping charge and taxes. | Record the current **Automated return medium** and **Automated return refund type** without saving. Independently calculate the selected ticket's refund, compare the preview including shipping, then Cancel. | Destination matches the saved medium. Product amounts are excluded. Pick up adds no invented shipping refund; an unshipped one-ticket shipping charge is included once under **Refund shipping for unshipped items only**. Fee treatment follows the saved refund type and original paid breakdown. Do not invent a numeric total from the policy row alone. | [SPT-5314](https://app.qase.io/case/SPT-5314) is the Organizer Credit completion case; [SPT-5809](https://app.qase.io/case/SPT-5809) is the Revert Funds completion case. **Neither is a complete independent shipping-amount test for this setup.** Amount check is Blocked until medium/type and original components are known. |
| TC-11 — A returned item cannot be selected again | An existing partially returned order with one already returned ticket and one untouched, otherwise eligible ticket. Reuse a completed return; do not create one for this pass. | Reopen its return choices and inspect both purchases, then Cancel. | The returned purchase is not selectable; the eligible untouched ticket is not accidentally included in the earlier return or blocked just because its companion was returned. | [SPT-5808](https://app.qase.io/case/SPT-5808) — retry portion. Creating/submitting the original return is excluded here. |

## Supplied policy, translated into Showpass terms

These values come from the row supplied in chat, **not an independent read of the live client backend**. Source mapping: `apps/venues/constants/customer_refunds.py`.

| Setting | Supplied value | What it means for this pass |
| --- | --- | --- |
| Enable customer refund policy | On | The policy is enabled; other Venue gates and item settings still apply. |
| Allow customer refunds for tickets | On | Tickets may qualify; the individual ticket switch still matters. |
| Allow customer refunds for products | Off | Products are blocked, including an otherwise enabled included Product that can block its Package. |
| Orders with mixed eligibility | Refund eligible items independently | Separate eligible purchases can be selected without a blocked companion. This does not split included Package items. |
| Allow customer refunds after barcode delivery | On | A visible Default barcode alone does not block a return. Delayed and customer-activated barcodes have separate rules. |
| Allow customer refunds after fulfillment or shipping | Off | A ticket already saved as Fulfilled is blocked. Selecting a delivery method is not fulfillment. |
| Allow customer refunds after check-in or scan | Off | A used admission ticket is blocked. |
| Shipping refund rule | Refund shipping for unshipped items only | Refund only the unreturned shipping share associated with selected unshipped items. Do not refund the same charge twice. |
| Cutoff | 24 hours before event start | Baseline only. No deadline-boundary case or waiting for 2027 in this pass. |
| Automated return medium | **Not supplied** | Read the actual saved value before expecting Organizer Credit or money back to the original payment method. |
| Automated return refund type | **Not supplied** | Read the actual saved value before calculating which fees return. |

**Do not infer “no amount rules” from `amount_rules_enabled = False`, or “no fees refunded” from `refundable_fee_classes = []`.** Current backend treats those as old read-only fields. The active calculation uses the enabled policy, Shipping refund rule, and the Venue's saved refund medium/type.

### Preparation without buying more tickets

1. **Find the same Organization first.** Match the existing order's Organization, event and item names. The supplied record is policy **1136**, Venue **2241**; the public client-to-record relationship was not independently established. These IDs identify the supplied setup, not reusable prerequisites.
2. **Read the actual gates; do not change them.** Venue-level feature flag `enable_venue_policy_customer_self_refunds` must include this Venue. In **Admin → Venues → Venues → the Organization**, **Customer Self Refund Settings** (`enable_automated_returns`) must be on. The supplied separate policy record does not establish either of these gates.
3. **Check the specific item switch.** With the appropriate employee access, locate the purchased ticket in **Build → Events → All events → Edit → Tickets → Basic info → Allow customer-initiated refunds**. For a Product, use **Build → Products → All products → the Product → Fulfillment → Allow customer-initiated refunds**. Do not turn the Organization Product switch on to make a negative case pass.
4. **Confirm what a Package really includes.** For included tickets, inspect the saved Package and existing order. For the positive ticket-Package preview, read **Admin → Venues → Venues → the Organization → Package revenue realization type** and use the existing **Parent** setting; do not change it. Current customer eligibility rejects a Package using Child revenue. For a ticket + Product relationship, an authorized Admin can search **Tickets → Sub product infos** by the parent ticket type and read the linked Product and quantity. Do not add or change a relationship on a ticket with sales. The Ultimate description does not independently prove its saved Product links.
5. **Record amount settings before the amount check.** An employee with **Manage Organization Info** can read **Organization → Organization settings → Customer refunds → Automated return medium / Automated return refund type / Shipping refund rule**. Ticket inspection requires **Manage Events**; Product inspection requires **Manage Marketplace**. Admin record access is separate; do not grant additional access for this pass.
6. **Use the Customer's existing order and receipt.** A usable positive record is paid, owned by that Customer, not refunded/voided/transferred, not pending a payment/transfer/resale, and in the operational condition named in its row. If all purchases are blocked, current source hides Return order. A missing button alone does not identify which rule blocked the order.

For a delayed-release barcode, **Allow customer refunds after barcode delivery** is not the only control: **Admin → Venues → Venues → Allow delayed barcode automated returns** and the existing return window also matter. Neither was provided here. Reuse an already released record if this setup is later selected; do not wait for release or schedule one in this pass. See [[SPW-19670-delayed-barcode-self-refund-test-cases]]; those detailed cases are still local, not published Qase IDs.

For TC-09, a checked-in ticket must still be before the current policy's refund deadline to isolate the check-in restriction. If there is no such existing record, that setup is unavailable for this pass. Do not wait for the event or change MEGACON's dates or policy to manufacture it.

## Purchase configurations — setup only

These are choices to look for in **existing paid orders**, not additional cases for the sales page. Names, size choices and advertised fulfillment were observed on October 29, 2026; saved contents and order state still need to be matched.

| Configuration to identify | Concrete client example | Which refund check uses it |
| --- | --- | --- |
| Ordinary ticket | **4-DAY PASS**; Single Day Adult, Youth or Child; **4-DAY CHILD PASS**. Use quantity 1 of the recorded Ticket Type. | TC-01 for the positive preview; TC-02 if its individual refund switch is off. Different category names do not require separate page tests. |
| Ticket-only Package | **THURSDAY FAMILY PASS**, advertised for 2 adults and up to 4 children. Read the actual saved included ticket types/counts; do not assume what was issued from the marketing wording. | TC-05, with all included ticket switches on and Parent revenue. |
| Ticket + Product Package | **ULTIMATE FAN PACKAGE**, only after confirming the saved included Product relationship. The same final Package may have been chosen directly or through the cart's $40 upgrade offer. | TC-04: the blocked included Product prevents returning the Package. The purchase/upgrade action itself is outside this checklist. |
| Ticket and a separately added Product | An admission ticket plus **FAN EXPO BAG $6**, **FAN EXPO T-SHIRT — MEDIUM $25**, or **I WANT IT ALL - FAN EXPO 2027 BUNDLE — MEDIUM $40**. No included-Product relationship. | TC-03: only the ticket is returnable. Use the correct recorded Product variant; these are data runs of one refund behavior. |
| Merchandise bundle sold as a Product | **I WANT IT ALL - FAN EXPO 2027 BUNDLE** offers size choices and advertises a pin, lanyard, bag, poster and T-shirt. It is shown in Product add-ons. Do not assume that its name creates a ticket Package. | TC-03 when bought beside admission; TC-06 for an existing Product-only order. Products off applies to this purchased Product. |
| Pick up / Will Call, not collected | Existing admission order with **Pick up** and no saved fulfillment. Pick up is the client wording for Will Call. | TC-01/TC-10: ordinary eligibility and amount; no shipping charge is invented. |
| Standard shipping, not shipped | Existing admission order with **Standard shipping**, recorded shipping charge and no saved fulfillment. The inspected one-ticket cart quoted $15 shipping; use the actual paid order's charge. | TC-10: the selected unshipped ticket's shipping share is included once. A shipping choice alone is not fulfillment. |
| Admission already shipped or collected | Existing ticket recorded as **Fulfilled**, using separate data runs for shipped admission and collected Pick up admission. Merchandise pickup is not admission check-in. | TC-08: fulfillment blocks the ticket. Do not fulfill a real order just to prepare the test. |
| Paid purchase originating from a waitlist | **VIP PACKAGE** currently offers a waitlist. A pending request is not a paid ticket purchase; use an already completed purchase from a fulfilled offer. Inspect its actual Package contents. | Apply TC-04 for included Products, or TC-05 for a ticket-only Package. Waitlist display, signup and allocation are not refund tests here. |
| Special experience | **Universal after-hours experience**, advertised at $115 with separate MEGACON admission required and sales-final copy. | Read its saved item switch before assigning an expectation: TC-02 is the blocked-ticket pattern if that switch is off. Copy alone does not prove the effective refund rule. |
| Product-only order | An existing paid Product-only order for the same Organization and Customer. No standalone Product purchase path was established on the inspected client. | TC-06; leave Not run if there is no matching client/order. Do not invent another purchase route. |

T-shirt and merchandise-bundle sizes shown were SMALL, MEDIUM, LARGE, X-LARGE, XX-LARGE, 3X-LARGE and 4X-LARGE. Choosing or refunding the wrong size is not the intended Product check. The site's merchandise copy says pickup only; when admission was shipped, keep its shipping charge separate from pickup-only merchandise in the refund calculation.

No additional ticket is needed to repeat an eligibility/amount preview: Cancel keeps the existing order paid. Do not treat a single Package as independently refundable included tickets or Products.

## Qase coverage notes — refunds only

The October 29 read-only **SPT** scan completed across **2,276 cases** at **11:33:44 AM MDT**. Full fields were locally filtered and relevant setup, parameters and assertions were reviewed. No Qase writes or execution results were submitted. The earlier purchase/website references are background only and have been removed from the refund case table.

* **Current usable references:** SPT-5309 for individual ticket eligibility and supported ticket-Package selection; SPT-5804 for TicketsOnly in a separate ticket/Product order; SPT-5325/5327 for the relevant barcode/check-in portions; SPT-5808 for retrying an already returned item. Their original broader setup does not authorize changing this client's policy.
* **Needs focused refund coverage:** a ticket + Product Package blocked by Products off; an all-Product order while Products are off; and a fulfilled admission ticket rather than a Product that is already blocked by the Product switch.
* **SPT-5326 needs a ticket version for this policy.** Its Product setup cannot isolate fulfillment while Organization Product refunds are off.
* **SPT-5323 remains a historical, withheld Package expectation.** Do not use it to claim that all Packages are unsupported.
* **Exact money checks still need the saved medium/type and original paid breakdown.** SPT-5314 covers completed Organizer Credit returns; SPT-5809 covers completed original-payment returns. These are refund-completion references, not evidence of a completed refund here.

## Sources reviewed and verification limits

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app`, local `develop` at `2f7515c35e5e92375ecef0a0221a91c55b11f526`.

* `apps/venues/constants/customer_refunds.py` — supplied numeric values and visible choices.
* `apps/venues/models/venue_management/customer_refund_policy.py`, `apps/venues/api/venue_based/serializers/refunds.py`, `apps/venues/utils.py` — policy fields, read-only legacy fields and Venue rollout gates.
* `apps/financials/services/invoice/customer_return_eligibility.py` — item-type and individual switches, ownership/status blockers, fulfilled/scanned/barcode rules, Package descendants and selection through the purchased parent.
* `apps/financials/services/invoice/customer_return_amounts.py`, `apps/financials/api/user_based/viewsets/invoices.py` — actual medium/type, original paid amounts, shipping allocation, unsupported historic amount data and preview behavior.
* `apps/tickets/models/packages_management/sub_ticket_option.py`, `apps/tickets/admin/admin.py`, `apps/tickets/admin/packages.py` — included Product relationships and supported Admin record registration. Existing sale relationships must not be changed to manufacture coverage.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, local `develop` at `a834f36e81ab01d531490ea38c794bd8cbc8b9c6`.

* `packages/core/src/shared/modules/websites/puck-editor/showpass/public/useWebsiteCheckoutPage.ts`, `showpass/PuckCheckout/public/CheckoutRenderer.web.tsx` and the Puck purchase-flow public adapters — website checkout ownership and the shared checkout handoff. The live site's authored mappings and deployed revision were not independently retrieved.
* `packages/core/src/shared/modules/checkout/hooks/useCheckoutDeliveryMethods.tsx` — delivery groups and the distinct Pick up/Standard shipping choices.
* `packages/core/src/app-contexts/public/shared/checkout/components/steps/add-ons/product-add-ons/ProductAddonsModal.tsx` — Product details/selection modal.
* `packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/OrderOptionsList.web.tsx` and `utils/order-actions/order-action-availability.ts`, `return-order.ts` — customer return visibility, eligibility loading and Package parent selection.

**Existing guidance:** [[00 Start Here/World-Class Software Quality Standard]], [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup]], [[00 Start Here/Showpass QA Handbook/Playbooks/03 Packages and Parent-Child Items]], [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges]], [[00 Start Here/Showpass QA Handbook/Playbooks/16 Reports Exports Earnings and Payouts]], [[05 Tooling/Qase Test Case Writing Rules]], [[05 Tooling/qasectl]], [[00 Customer - How to Test]], and the existing customer eligibility/completion notes.

**Material limits:** The public domain and signed-in Customer were inspected. The payment iframe declared live mode; no payment was attempted. Neither the served backend environment/Venue mapping nor the supplied policy's live application was established. Do not assume the public domain is Beta because earlier evidence used Beta. No database, Admin or Customer order record was opened during this pass.

The page's REFUND POLICY text also names a fixed May 6 deadline, original-payment refunds and merchandise add-ons; checkout describes shipping restrictions and a separate shipping-refund deadline. Those statements were read, but are not proof of the saved self-refund settings or of a bug. As requested, date-boundary testing is excluded. Confirm the intended relationship between that client copy and the supplied policy before treating a difference as a defect.

<img src="../../../99 Archive/QA Evidence/Refunds and Protection/megacon-first-pass-2026-10-29/08-refund-policy.png" width="600" alt="Customer-facing refund-policy copy read during the inspection; no deadline behavior tested">

Qase evidence retained under `/private/tmp/megacon-first-pass-20261029/`: `metadata.json` and the relevant case records in `reviewed-candidates.json`, so the saved prerequisites/parameters behind each mapping can be checked. Bulk page dumps and disposable scan scripts are not deliverables. The local, Git-ignored screenshots retain the item/setup inspection evidence; they are not refund results. No credentials are stored in the note.

## Minimum refund execution set

Start with **TC-01, TC-03, TC-04, TC-05 and TC-10**: ordinary ticket, separate blocked Product, included blocked Product, ticket-only Package, and refund amount/destination. Then use existing operational records for **TC-08 and TC-09**: fulfilled and checked-in admission. None requires retesting Buy Tickets or creating a waitlist entry.

After previews, actual refund completion is a separate, unexecuted check: follow **SPT-5314** for the saved Organizer Credit method or **SPT-5809** for the saved Revert Funds method. Do not switch MEGACON's method to run both. Completion must prove the selected item is returned once, the untouched purchase remains paid, the actual money/credit matches the preview, and the selected ticket can no longer be used. Original payment/gateway and inventory/report effects need their own evidence.

**Suggested automated coverage:** backend checks for a separate blocked Product versus an included blocked Product, ticket fulfillment/check-in restrictions, unshipped shipping allocation and unsupported old amount data; browser checks for My Orders selection, preview/Cancel and returned-item retry. Catalog, checkout layout and waitlist signup automation are outside this refund checklist.

**Open facts:** client-to-policy Organization/environment match; current saved return medium/type and required Venue gates; individual item switches; actual Family/Ultimate contents; Customer-owned paid order references; and the applicable barcode-delivery mode. No date-boundary test or wait until 2027 is required.

## Background inspection record — not refund results

The public client was inspected on October 29 to identify the configurations above. The existing cart held one **4-DAY PASS**. Standard shipping was inspected and restored to **Pick up**; the last observed quantity was **1**, with **$149.39** total. No Product, discount, gift card or credit was applied; no signup, purchase, refund, provider flow, policy, event date or account setting was submitted. The sales-page and checkout observations are preparation evidence only and are not counted as refund passes.

The original screenshots remain local under `99 Archive/QA Evidence/Refunds and Protection/megacon-first-pass-2026-10-29/` to support the item names, offered variants, copy and restored cart state. They are ignored by Git. The reusable setup facts are kept above rather than preserving sales-page checks in the active case list.

## Refund results

| Refund case | Status | What is still needed |
| --- | --- | --- |
| TC-01 — ordinary ticket preview | Not run | Matching Customer-owned paid ticket and current gates verified. |
| TC-02 — individual ticket switch off | Not run | Otherwise eligible paid ticket with the individual switch off. |
| TC-03 — ticket plus separate blocked Product | Not run | Existing order with separate admission and Product, both individual switches on. |
| TC-04 — blocked Product inside a ticket Package | Not run | Existing Package order and confirmed included Product relationship. |
| TC-05 — ticket-only Package | Not run | Existing Family/ticket Package, actual included tickets, Parent revenue and switches verified. |
| TC-06 — all-Product order blocked | Not run | Existing Product-only client order identified. |
| TC-07 — delivered Default barcode | Not run | Otherwise eligible unfulfilled/unscanned ticket with Customer-visible Default barcode. |
| TC-08 — shipped or collected admission blocked | Not run | Existing Fulfilled admission record without another blocker masking fulfillment. |
| TC-09 — checked-in admission blocked | Not run | Existing used admission record without another blocker masking check-in. |
| TC-10 — original amount, shipping and destination | Blocked | Selected order's original paid components and saved return medium/type are missing. |
| TC-11 — already returned item not selectable | Not run | Existing partially returned order with an untouched eligible ticket. |
