---
title: Event — Packages
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Published 2026-10-30 — 10 cases created and 2 updated; product tests not executed
---

# Packages

**Qase locations:** [Core - Packages (601)](https://app.qase.io/project/SPT?suite=601) · [Events > Promote > Packages (87)](https://app.qase.io/project/SPT?suite=87)

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## PR 7738 — Package quantity changes: Qase gaps, 2026-10-30

**Published and verified:** created [SPT-5862–SPT-5871](https://app.qase.io/project/SPT?suite=1243), refactored/moved [SPT-3294](https://app.qase.io/case/SPT-3294) to Inventory → Stock Counts and Overselling (1240), and separately enhanced [SPT-3879](https://app.qase.io/case/SPT-3879) in Financials (676). All written fields were read back and matched the approved drafts. Existing metadata and SPT-3879’s three package parameters are preserved. The six earlier cases in Inventory → Packages and Bundles are unchanged; that folder now contains 16 cases.

**These are saved case definitions, not executed passes.** No Showpass purchase, payment, inventory mutation or product test was run. The source/routed-API, queue and concurrency evidence gaps below remain separate from publication.

**Published updates:** [[#Published update to SPT-3294|SPT-3294 — regular ticket quantities, with package checks split out]] · [[#SPT-3879 improvement — separately requested after the Inventory batch|SPT-3879 — package prices, fees and the final charge]]. Earlier published previews are retained as history. The 2026-11-02 readability revision below is the only pending preview.

**Intent:** verify that customers can change package quantities without losing another attendee's answers, receiving incomplete packages, being charged for the wrong quantity or taking unavailable inventory. Source review covers the merged PR and the refreshed checkout, including the later safeguards in PR 7766. A single Venue's configuration is not used as the coverage boundary.

## PR checks and regression — Qase IDs

All rows below are **not run in this review**. “Definition verified” means saved case content was checked, not that Showpass passed. Existing regression rows are selected from the earlier full-case review and were not rewritten in this batch.

| Group | Qase case IDs | Coverage to run | Case status |
| --- | --- | --- | --- |
| PR 7738 — direct | [SPT-5862](https://app.qase.io/case/SPT-5862) | Increase a preset package and keep each guest’s information | Created; definition verified |
| PR 7738 — direct | [SPT-5863](https://app.qase.io/case/SPT-5863) | Keep the requested quantity after two quick package increases | Created; definition verified |
| PR 7738 — direct | [SPT-5864](https://app.qase.io/case/SPT-5864) | Increase regular tickets without changing the package’s guest information | Created; definition verified |
| PR 7738 — direct | [SPT-5865](https://app.qase.io/case/SPT-5865) | Keep the original package cart when an increase exceeds inventory | Created; definition verified |
| PR 7738 — direct | [SPT-5866](https://app.qase.io/case/SPT-5866) | Reject a package increase beyond the customer’s limit | Created; definition verified |
| PR 7738 — direct | [SPT-5867](https://app.qase.io/case/SPT-5867) | Let only one buyer reserve the last available package | Created; definition verified |
| Regression — added | [SPT-5868](https://app.qase.io/case/SPT-5868) | Increase a preset package with per-ticket guest collection off | Created; definition verified |
| Regression — added | [SPT-5869](https://app.qase.io/case/SPT-5869) | Decrease a preset package and release the removed tickets | Created; definition verified |
| Regression — added | [SPT-5870](https://app.qase.io/case/SPT-5870) | Remove a package and keep the regular ticket in the cart | Created; definition verified |
| Regression — added | [SPT-5871](https://app.qase.io/case/SPT-5871) | Buy one regular ticket and one preset package with separate guest information | Created; definition verified |
| Regression — updated | [SPT-3294](https://app.qase.io/case/SPT-3294) | Change regular ticket quantities in the cart | Updated and moved to 1240; definition verified |
| Regression — updated | [SPT-3879](https://app.qase.io/case/SPT-3879) | Keep package prices and fees correct after quantity changes | Updated in 676; three package setups preserved with readable labels |
| Regression — existing | [SPT-429](https://app.qase.io/case/SPT-429) | Ordinary preset purchase, guest/account and barcode modes | Existing baseline |
| Regression — existing | [SPT-3334](https://app.qase.io/case/SPT-3334), [SPT-3335](https://app.qase.io/case/SPT-3335) | Custom-package purchase and selected included tickets | Existing baseline; repeat with a cart quantity edit |
| Regression — existing | [SPT-1152](https://app.qase.io/case/SPT-1152), [SPT-2870](https://app.qase.io/case/SPT-2870) | Preset/custom package seat and location selection | Existing baseline; 2870 still needs clearer expected results |
| Regression — existing | [SPT-3558](https://app.qase.io/case/SPT-3558) | Reverse-ratio quantities, including 2 → 3 → 4 boundaries | Existing baseline; add existing-cart edit evidence |
| Regression — existing | [SPT-3762](https://app.qase.io/case/SPT-3762) | Nested package hierarchy and separately selected related tickets | Existing baseline |
| Regression — existing | [SPT-3760](https://app.qase.io/case/SPT-3760), [SPT-5266](https://app.qase.io/case/SPT-5266) | Ticket/product bundle, variant quantities and insufficient product stock | Existing baseline; 5266 includes quantity increase |
| Regression — existing | [SPT-4073](https://app.qase.io/case/SPT-4073), [SPT-4076](https://app.qase.io/case/SPT-4076), [SPT-5269](https://app.qase.io/case/SPT-5269) | Web Box Office / desktop preset, custom and public-sellout package sales | Existing baseline; public optimization must not change venue writes |
| Regression — existing | [SPT-2972](https://app.qase.io/case/SPT-2972), [SPT-2973](https://app.qase.io/case/SPT-2973), [SPT-4832](https://app.qase.io/case/SPT-4832) | Parent/child event and ticket inventory constraints | Existing baseline; use with SPT-5865 for answered-cart rejection |
| Regression — existing | [SPT-5299](https://app.qase.io/case/SPT-5299), [SPT-3244](https://app.qase.io/case/SPT-3244), [SPT-5145](https://app.qase.io/case/SPT-5145) | Package and included-ticket guest-question visibility | Existing baseline; visibility does not prove answer preservation after an edit |
| Regression — existing | [SPT-4865](https://app.qase.io/case/SPT-4865) | Discounted package/guest details stay attached | Existing baseline; add quantity-edit financial/answer evidence |
| Regression — existing | [SPT-4229](https://app.qase.io/case/SPT-4229), [SPT-3159](https://app.qase.io/case/SPT-3159) | Parent/child calculation settings and applicable internal fees | Existing baseline; use independent financial calculations |
| Regression — existing | [SPT-3860](https://app.qase.io/case/SPT-3860), [SPT-2437](https://app.qase.io/case/SPT-2437), [SPT-4928](https://app.qase.io/case/SPT-4928) | Calendar entry, Widget session continuity and expired-cart recovery | Existing baseline; include the package selection where supported |
| Regression — existing | [SPT-4933](https://app.qase.io/case/SPT-4933) | Shipping quantity limits for direct and package items | Existing baseline |
| Regression — existing | [SPT-3198](https://app.qase.io/case/SPT-3198), [SPT-3743](https://app.qase.io/case/SPT-3743) | Pay-what-you-can pricing and upgrades | Existing baseline; 3743 needs stronger runnable steps |
| Regression — existing | [SPT-544](https://app.qase.io/case/SPT-544) | Purchased package contents, dates and barcodes in order details | Existing baseline |

**Published Single parameters — 2026-10-30:** reviewed all twelve created/updated cases and applied the four approved updates below. The other eight keep their fixed setup. No Platform or View parameters were added. Every parameter value is explained in its case Description. This index includes the later approved parent/child event-capacity labels. The original publication record below preserves earlier labels for history.

| Local label / Qase case | Existing title (unchanged) | Suite | Tags (unchanged) | Saved Single parameter | Steps (unchanged) |
| --- | --- | --- | --- | --- | --- |
| TC-1 / SPT-5862 | Core - Inventory - Increase a preset package and keep each guest’s information | 1243 | packages, checkout, purchases | GuestInfo: PackageAndIncluded, IncludedOnly, PackageOnly | 6 |
| TC-4 / SPT-5865 | Core - Inventory - Keep the original package cart when an increase exceeds inventory | 1243 | packages, cart, edge-case | InventoryLimit: PackageTicketInventory, IncludedTicketInventory, ParentEventCapacity, ChildEventCapacity | 5 |
| SPT-3294 | Core - Inventory - Change regular ticket quantities in the cart | 1240 | recurringeventticket | EventType: SingleEvent, RecurringEvent | 7 |
| SPT-3879 | Core - Financials - Keep package prices and fees correct after quantity changes | 676 | internal-rate-card | PackageSetup: Preset, ProductBundle, Custom | 7 |

**Classification and preservation:** Enhance SPT-5862 by retaining the original both-level guest collection and adding included-only and package-only variations. Refactor parameter labels in the other three cases; preserve all four inventory limits, both event types, and all three package/revenue setups. Preserve all supported clients/views, titles, suites, tags and unrelated metadata. Only Description, Preconditions, Steps and params change; SPT-5862 also records GuestInfo in Postconditions.

**Apply and verification:** the user approved this exact four-case batch with “push” after the Inventory terminology correction. All four updates were dry-run first and then applied through the maintained batch script. Readback verified every written field, including Description mappings, and confirmed Qase stores each parameter as `type: single`. All values match the table, no Platform/View parameters are present, and titles, suites, tags, step counts, priority, type, behavior and layer match their before-state. Verification recorded at **2026-10-30 15:18:44 MDT**. No product test was run. Temporary batch plan and apply receipt were deleted after this record was saved.

**Setup evidence:** current backend `apps/tickets/services/packages/package_child_guest_info_collection.py` and `apps/tickets/models/order_management/order_items.py` preserve a redeemable Preset package ticket’s own per-ticket collection while included tickets follow their events’ settings. The current package editor’s `TicketPackageDeliveryOptionsSection.web.tsx` exposes the three Delivery options used in the Description. This is source-verified preparation, not executed coverage.

**Required data choices:** run each GuestInfo value for SPT-5862, each InventoryLimit value for SPT-5865, both EventType values for SPT-3294 and all three PackageSetup values for SPT-3879. Prepare independent amounts for the selected financial setup and client before running SPT-3879. These are saved definitions, not executed results. Native app/device rows and controlled database concurrency checks remain unexecuted.

**How to read the setups:** the **parent event** sells the package ticket. **Child events** are different events supplying included tickets. SPT-5862–SPT-5871 each use one parent event and one different child event in the same Organization; SPT-5867 includes one child-event ticket per package, and the other nine include two. In SPT-5864, SPT-5870 and SPT-5871, a different regular ticket type is sold separately by that same child event. SPT-3294 uses no package. SPT-3879 preserves its three financial setups and explicitly records whether each included ticket is on the parent event or a different child event. Purchaser details are separate from per-ticket attendee information.

**Published event-setup clarification — 2026-10-30:** reviewed, dry-run, applied and read back all twelve cases: **SPT-3294, SPT-3879 and SPT-5862–SPT-5871**. Classification: Refactor; make the intended event relationships and language explicit without adding test cases. Each focused package case now requires one parent event and one different child event; mixed-cart cases explicitly buy a different regular ticket type separately from that child event. SPT-3294 has no package; SPT-3879 retains its existing three financial setups, including supported included tickets from the parent event. Only Description, Preconditions, Postconditions and Steps are selected where applicable; SPT-5865 additionally renames PackageEventCapacity → ParentEventCapacity and IncludedEventCapacity → ChildEventCapacity. Its ticket-inventory values and every other parameter value are unchanged. IDs, titles, folders, tags, supported clients/views and step counts are preserved. No cases were created, moved, copied or deleted in this clarification.

| Local label / Qase ID | Title (unchanged) | Suite | Tags (unchanged) | Parameters | Steps |
| --- | --- | --- | --- | --- | --- |
| TC-1 / SPT-5862 | Core - Inventory - Increase a preset package and keep each guest’s information | 1243 | packages, checkout, purchases | GuestInfo unchanged: PackageAndIncluded, IncludedOnly, PackageOnly | 6 |
| TC-2 / SPT-5863 | Core - Inventory - Keep the requested quantity after two quick package increases | 1243 | packages, cart, edge-case | None | 5 |
| TC-3 / SPT-5864 | Core - Inventory - Increase regular tickets without changing the package’s guest information | 1243 | packages, basket, checkout | None | 4 |
| TC-4 / SPT-5865 | Core - Inventory - Keep the original package cart when an increase exceeds inventory | 1243 | packages, cart, edge-case | InventoryLimit: PackageTicketInventory, IncludedTicketInventory, ParentEventCapacity, ChildEventCapacity | 5 |
| TC-5 / SPT-5866 | Core - Inventory - Reject a package increase beyond the customer’s limit | 1243 | packages, cart, edge-case | None | 4 |
| TC-6 / SPT-5867 | Core - Inventory - Let only one buyer reserve the last available package | 1243 | packages, cart, edge-case | None | 5 |
| TC-7 / SPT-5868 | Core - Inventory - Increase a preset package with per-ticket guest collection off | 1243 | packages, basket, checkout | None | 4 |
| TC-8 / SPT-5869 | Core - Inventory - Decrease a preset package and release the removed tickets | 1243 | packages, basket, checkout | None | 4 |
| TC-9 / SPT-5870 | Core - Inventory - Remove a package and keep the regular ticket in the cart | 1243 | packages, basket, checkout | None | 4 |
| TC-10 / SPT-5871 | Core - Inventory - Buy one regular ticket and one preset package with separate guest information | 1243 | packages, checkout, purchases | None | 6 |
| SPT-3294 | Core - Inventory - Change regular ticket quantities in the cart | 1240 | recurringeventticket | EventType unchanged: SingleEvent, RecurringEvent | 7 |
| SPT-3879 | Core - Financials - Keep package prices and fees correct after quantity changes | 676 | internal-rate-card | PackageSetup unchanged: Preset, ProductBundle, Custom | 7 |

**Terminology apply and verification — 2026-10-30 15:40:28 MDT:** the user explicitly approved the twelve-case preview. The maintained batch script applied all twelve selected-field updates and verified every written field from Qase readback, including the standalone event setup and Description mappings. Checked that titles, suites, tags, step counts, priority, type, behavior and layer match their before-state. All parameters are unchanged except SPT-5865’s two approved event-capacity labels; Qase stores InventoryLimit as a Single parameter with PackageTicketInventory, IncludedTicketInventory, ParentEventCapacity and ChildEventCapacity. GuestInfo, EventType and PackageSetup retain their saved Single structure and values. SPT-3294 changed only Description; SPT-3879 changed only Description and Preconditions. Temporary plan and receipt were deleted after recording this result. These are verified saved definitions, not executed product tests.

**Workflow lessons saved:** [[05 Tooling/Qase Test Case Writing Rules#Package Events And Guest Information|event terminology and setup]], [[05 Tooling/Qase Test Case Writing Rules#Readable Parameters And Combination Accounting|readable Single parameters]], [[05 Tooling/qasectl|complete readback and existing approval scope]], [[06 Prompts/Showpass Qase Gap Analysis|focused cases and PR/regression ID tracking]], [[06 Prompts/Showpass QA Test Case Generator|standalone setup review]], the Package handbook and AGENTS.md.

These focused cases use ordinary Preset packages. SPT-5862 explicitly includes package-only and included-ticket-only guest collection alongside the original both-level setup. Single-barcode behavior, custom/seated/product/nested packages and the other excluded shapes remain in the separate regression rows and coverage decisions.

**Readability revision — 2026-11-02; not yet pushed to Qase:** this is the current preview for **SPT-3294, SPT-3879 and SPT-5862–SPT-5871**, replacing the unpushed ten-case wording preview from 2026-11-01. Say whose details are entered, remove unexplained form counts, identify the parent/child events, and give source-verified Dashboard/Admin locations for necessary Showpass controls. Identify saved event/package/ticket settings, custom questions, employee permissions and external calculation/payment evidence separately. SPT-5866 now names supported Admin preparation for its existing Per user 2 / Purchase limit 3 setup, which the Dashboard editor cannot save. SPT-5862 explains how to reveal/save the child hide toggle before changing the child event’s collection setting. Pre-payment collection is identified by its actual saved control. SPT-3879 explains its financial terms, where to read the configured and purchased values, and how to find the correct Invoice before opening its Invoice items.

**Readability dry run:** all twelve operations passed through the maintained script. The live selected fields matched the reviewed before-state throughout the check. Each case parses with its own Description, Preconditions, Steps and Postconditions; setup-location/parameter mappings survive parsing. IDs, titles, folders, tags, parameters, selected Platform/View rows, quantities, financial assertions and step counts remain unchanged. The plan selects only the text fields that changed: Description and Preconditions for SPT-3294; Description/Preconditions/Steps for the ten new cases, plus Postconditions for SPT-5862, SPT-5866 and SPT-5871; Description/Preconditions/Postconditions/Steps for SPT-3879. No cases are created, moved, copied or deleted. Use the published case index above for the unchanged titles, suites, tags, parameter values and step counts. Product tests have not been run. Qase apply still needs confirmation of this exact twelve-case preview. Only the active plan is retained at `/private/tmp/package-readable-cases-plan-20261102.json` pending approval; remove after apply or cancellation.

**Source check for setup locations — 2026-11-02:** backend checkout `03544e62cd3a93e92112e5759b9918e7bf1cdf07`; frontend checkout `cc59dd9de4ab94d28aaff199d288d615ca39f115`. Reviewed Event and TicketType models/Admin forms, Invoice/Invoice item Admin, Venue/internal-fee models, the Dashboard event navigation, Order form fields/custom-question/after-payment controls, ticket Inventory/event-wide settings, ticket purchase-limit validation and package Delivery options. These are source-verified locations and supported preparation, not a live UI inspection. The last successful Qase publication remains recorded above.

**Shared workflow update — 2026-11-02:** [[05 Tooling/Qase Test Case Writing Rules#Explain Showpass Terms And Where To Find Them|the common readability rule]] now requires ordinary explanations, exact Dashboard/UI or Admin locations, control type, required value, hidden-control preparation and clear proof locations. Gap analysis, case generation, qasectl’s pre-dry-run checklist, AGENTS.md and the Package handbook reference or apply it. Readability corrections must update each affected case’s full fields without dropping useful checks. These workflow changes are saved locally; they do not apply the pending Qase batch.

### TC-1: Increase a preset package and keep each guest’s information

**Qase case:** [SPT-5862](https://app.qase.io/case/SPT-5862) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

Keeps the answered-package regression separate from ordinary quantity controls and from mixed-cart checkout.

**Title:** Core - Inventory - Increase a preset package and keep each guest’s information

**Description:** Start with two packages in the cart, with guest details already saved for the tickets that require them. Add one more package. The original tickets must keep the same names, email addresses and Guest notes. Only the new tickets should need their guest details entered. Then complete one purchase. GuestInfo selects which tickets need these details; it does not change the number of tickets in the package.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

Guest details means **First name, Last name, Email and the answer to Guest notes** for the person using a ticket. Use different details for every ticket that requires them in this check. The customer paying for the order also enters their purchaser details; those are not the ticket details checked below.

| GuestInfo | Enter guest details for |
| --- | --- |
| PackageAndIncluded | The package ticket and both included tickets in each package. |
| IncludedOnly | Both included tickets in each package. Do not ask for guest details for the package ticket. |
| PackageOnly | The package ticket only. Do not ask for guest details for either included ticket. |

| GuestInfo: Collect guest information per ticket | Parent event | Child event |
| --- | --- | --- |
| PackageAndIncluded | ON | ON |
| IncludedOnly | OFF | ON |
| PackageOnly | ON | OFF |

For every GuestInfo value, use these saved Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item ON; Only collect attendee info for individual tickets ON.** On the child event’s Order form, first turn Collect guest information per ticket ON so the Hide guest information when purchased as part of a package toggle is visible. Set that hide toggle OFF, then set per-ticket collection to the ON/OFF value in the selected GuestInfo row. If it is turned OFF, the hide toggle disappears but keeps its saved value. Require First name, Last name, Email and a text question called Guest notes before payment only on events whose per-ticket collection is ON. On events where it is OFF, disable attendee custom questions; ordinary purchaser details remain separate.

Run each GuestInfo value separately. Enter the required guest details for the two packages before increasing the quantity. After adding one package, those original details must stay saved; only its added tickets should ask for new guest details. The cart contents and payment checks stay the same.

Customer starting point: open the parent event’s public page and select Buy, or use its existing Widget (the Showpass purchase window on the Organization’s website), according to the Platform/View row. For the Showpass app row, open Explore → the parent event → Buy.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Parameters:**
GuestInfo: PackageAndIncluded, IncludedOnly, PackageOnly

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* Prepare the selected GuestInfo setup from the Description. Use different names and Guest notes for every ticket that needs guest details, with email addresses controlled for this case. Disable attendee custom questions on events whose per-ticket collection is OFF.
* From the parent event’s Buy flow, add two packages to a cart that has not timed out. Before opening the cart controls, save and record the name, email and Guest notes attached to each ticket listed in the selected GuestInfo row. Inventory and all purchase/customer limits allow at least three packages. Use one fixed package price, without multiple price tiers.
* The package price is 10.00. Included tickets have no extra price; all fees, taxes and shipping are 0.00.
* Use an approved test card with the payment provider in test mode because this case completes a paid purchase. Record available package-ticket and included-ticket counts before the cart is created. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.

**Tags:** packages, checkout, purchases

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the cart and increase the package quantity from two to three. | Quantity 3 | Three package tickets and six included tickets are selected; the total is 30.00. |
| In checkout, check the guest details on the original tickets and the newly added tickets. | Tickets listed in the selected GuestInfo row | Every original ticket keeps its saved name, email and Guest notes. The new tickets that require guest details start blank; the other tickets do not ask for them. |
| Enter the new guests’ names, email addresses and Guest notes for the added tickets. | New tickets listed in the selected GuestInfo row | Each new ticket has the details entered for it. No original guest’s answers have been copied to a new ticket. |
| Continue to the order review. | Three packages | The review shows three packages, six included tickets and a total of 30.00. |
| Complete the test-card payment once. | 30.00 | One payment and one successful order are created for 30.00. |
| Open the completed order and its tickets. | New confirmation reference | The order contains three package tickets and six included tickets. Every ticket that required guest details keeps its recorded name, email and Guest notes. The other tickets still do not ask for guest details. |

**Postconditions:**

* Keep the selected GuestInfo value, order, payment reference and record of which guest details belong to each ticket; do not delete financial records.
* Compare final available counts with those recorded before selection: exactly three package-ticket and six included-ticket units were consumed.

### TC-2: Keep the requested quantity after two quick package increases

**Qase case:** [SPT-5863](https://app.qase.io/case/SPT-5863) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Execution limit:** record whether requests overlap. If the controls wait for the first update, the controlled queue test in the coverage notes is still required.

**Title:** Core - Inventory - Keep the requested quantity after two quick package increases

**Description:** Request three packages, then four as soon as the cart accepts another edit. After the updates finish, the saved cart must have four packages, with no duplicated contents or lost original guest information.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | ON | ON |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item ON; Only collect attendee info for individual tickets ON.** For each package, the customer enters First name, Last name, Email and Guest notes for the person using the package ticket, then for the person using each of the two included tickets.

Customer starting point: open the parent event’s public page and select Buy, or use its existing Widget (the Showpass purchase window on the Organization’s website), according to the Platform/View row. For the Showpass app row, open Explore → the parent event → Buy.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* From the parent event’s Buy flow, add two packages to a cart that has not timed out. Save and record different information for its six attendees. Inventory and purchase/customer limits allow at least four packages.
* The package price is 10.00. Included tickets have no extra price; all fees, taxes and shipping are 0.00.

**Tags:** packages, cart, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the cart and request three packages. | Quantity 3 | The cart accepts the request and begins updating or shows three. |
| As soon as the quantity controls accept another edit, request four packages. | Final requested quantity 4 | The next accepted request is for four packages. |
| Wait for the cart update to finish, then reopen checkout. | Quantity 4 | Four package tickets and eight included tickets are selected; the total is 40.00. |
| In checkout, compare the names, email addresses and Guest notes on the original tickets with the recorded values. | Original 2 package tickets and 4 included tickets | All six original tickets keep their guest details. The 2 added package tickets and 4 added included tickets have blank guest details, with no original guest’s answers copied to them. |
| Reload checkout and check the cart again. | Same cart, before it times out | The saved cart still contains four packages and the same guest information. |

**Postconditions:**

* Remove only this case’s unpurchased cart items. Check in Box Office that their reserved quantities return to availability; leave other customers’ carts and orders unchanged.

### TC-3: Increase regular tickets without changing the package’s guest information

**Qase case:** [SPT-5864](https://app.qase.io/case/SPT-5864) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

Refines the earlier TC-3 into the requested regular-ticket + package scenario. Product, membership and second-package edits remain separate contract/automation follow-ups, not implied coverage in this case.

**Title:** Core - Inventory - Increase regular tickets without changing the package’s guest information

**Description:** Start with one regular ticket and one package. Increase only the regular-ticket quantity to two. The package must still contain its two included tickets with their original guest information.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.  The child event also sells a separate regular General Admission ticket of a different ticket type. That regular ticket type is not included in the package; it is bought separately.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | OFF | ON, for both the included tickets and the separate regular ticket |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF; this setting concerns included tickets, not the separate regular ticket |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item OFF; Only collect attendee info for individual tickets ON.** The customer enters First name, Last name, Email and Guest notes for the regular ticket and for each of the two included tickets. Checkout must not ask for another person’s details for the package ticket.

Customer starting point: use the child event’s Buy flow for the separate regular ticket and the parent event’s Buy flow for the package. Widget means the Showpass purchase window on the Organization’s website. Use the Platform/View row selected for this check.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* On the child event, select a separate regular General Admission ticket type priced 5.00. It is different from the included ticket type and is not part of the package. The package price is 10.00; all fees, taxes and shipping are 0.00. Both selections can be purchased in one cart.
* The child event’s Capacity permits at least 4 tickets in this cart, counting its included tickets and separate regular tickets together. Each ticket type’s Inventory permits the quantities used below.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* From the child event’s Buy flow, add one regular ticket; then add one package from the parent event’s Buy flow to the same cart, before it times out. Save and record the three attendees and their answers. The starting total is 15.00.
* Regular-ticket inventory and limits allow at least two. Record regular-ticket and included-ticket availability before selecting the items. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.

**Tags:** packages, basket, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the cart and increase only the regular-ticket quantity from one to two. | Regular tickets 2; package 1 | The total becomes 20.00; the package quantity stays at one. |
| In checkout, check the names, email addresses and Guest notes on the tickets. | Two regular tickets and two included tickets | Both included tickets and the original regular ticket keep their guest details. Only the added regular ticket asks for a new guest’s details. |
| Compare the cart contents with the original selection. | Package 1; included tickets 2 | No extra package or included ticket has been added. |
| Reload checkout and inspect the guest information again. | Same cart | The saved quantities and original guest information remain unchanged. |

**Postconditions:**

* Remove only this case’s unpurchased cart items. Check in Box Office that their reserved quantities return to availability; leave other customers’ carts and orders unchanged.
* Only one extra regular-ticket reservation was taken. Package and included-ticket reservations did not increase.

### TC-4: Keep the original package cart when an increase exceeds inventory

**Qase case:** [SPT-5865](https://app.qase.io/case/SPT-5865) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Title:** Core - Inventory - Keep the original package cart when an increase exceeds inventory

**Description:** Two packages are already reserved with saved guest information. Attempt to add a third when the selected inventory or event capacity cannot supply it. The rejected increase must leave the original cart intact.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | ON | ON |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item ON; Only collect attendee info for individual tickets ON.** For each package, the customer enters First name, Last name, Email and Guest notes for the person using the package ticket, then for the person using each of the two included tickets.
| InventoryLimit | Exact setting before the two packages are selected | Where to set it |
| --- | --- | --- |
| PackageTicketInventory | The package ticket’s Inventory is 2. | Parent event → Manage → Tickets → package ticket’s Inventory. |
| IncludedTicketInventory | The included ticket type’s Inventory is 4; each package needs 2. | Child event → Manage → Tickets → included ticket type’s Inventory. |
| ParentEventCapacity | The parent event’s Total Event Inventory is 2, with no other sales or reservations. | Parent event → Manage → Tickets → Event ticket settings → Total Event Inventory. |
| ChildEventCapacity | The child event’s Total Event Inventory is 4, with no other sales or reservations. | Child event → Manage → Tickets → Event ticket settings → Total Event Inventory. |

Run one InventoryLimit value at a time. Capacity here means the event-wide Total Event Inventory setting. Other inventory and capacity limits must permit three packages. Keep the limiting value positive; zero can mean unlimited.

Customer starting point: open the parent event’s public page and select Buy, or use its existing Widget (the Showpass purchase window on the Organization’s website), according to the Platform/View row. For the Showpass app row, open Explore → the parent event → Buy.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Parameters:**
InventoryLimit: PackageTicketInventory, IncludedTicketInventory, ParentEventCapacity, ChildEventCapacity

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* Record the original limits and prepare the selected InventoryLimit. Purchase and customer limits allow three; dates and public availability permit sale. Record available counts before selection.
* The package price is 10.00. Included tickets have no extra price; all fees, taxes and shipping are 0.00.
* From the parent event’s Buy flow, add two packages to a cart that has not timed out and save different information for all six attendees. Record the names and answers. No other customer changes this inventory during the attempt. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.

**Tags:** packages, cart, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the cart and attempt to increase the package quantity from two to three. | Selected InventoryLimit | The increase is rejected with inventory or capacity feedback. |
| Inspect the cart after the error. | Original quantity 2 | Two package tickets and four included tickets remain, with a total of 20.00. |
| In checkout, compare each ticket’s name, email and Guest notes with the recorded values. | Original 2 package tickets and 4 included tickets | All six tickets keep the same guest details; the rejected increase has not cleared, copied or moved them to another ticket. |
| Reload checkout while the cart remains unexpired. | Same cart | Quantity two, the total and the saved guest information are unchanged. |
| As the employee, compare the limiting availability in Box Office with the recorded counts. | Original two-package reservation | The failed increase has not taken extra inventory or released the original reservation. |

**Postconditions:**

* Remove only this case’s unpurchased cart items. Check in Box Office that their reserved quantities return to availability; leave other customers’ carts and orders unchanged.
* Restore any inventory/capacity limits changed during preparation. Keep the error message and before/after comparison.

### TC-5: Reject a package increase beyond the customer’s limit

**Qase case:** [SPT-5866](https://app.qase.io/case/SPT-5866) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Title:** Core - Inventory - Reject a package increase beyond the customer’s limit

**Description:** A customer already bought one package and has one more in the cart. Their limit is two packages across orders. Increasing the cart to two would make three, so the increase must be rejected without changing the earlier order or current reservation.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | ON | ON |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item ON; Only collect attendee info for individual tickets ON.** For each package, the customer enters First name, Last name, Email and Guest notes for the person using the package ticket, then for the person using each of the two included tickets.

Customer starting point: open the parent event’s public page and select Buy, or use its existing Widget (the Showpass purchase window on the Organization’s website), according to the Platform/View row.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

For this case, **Per user** in Admin is the ticket’s customer limit across orders; the Dashboard label is **Per-user limit** under Tickets → edit the package ticket → Basic info → Purchase limits. **Purchase limit** in Admin is **Maximum purchase limit** there and applies to one purchase. Prepare the exact 2-versus-3 values in Admin: the Dashboard editor requires the Per-user limit to be at least the Maximum purchase limit and will not save this combination. These are saved ticket settings, not flags.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* An administrator with permission to change Ticket types opens Admin → Ticket types, searches for the package ticket by name, and confirms its Event is the parent event. Record Per user and Purchase limit. Set Per user to 2 and Purchase limit to 3, Save, and reopen to verify. All Inventory and event-wide limits permit at least three packages.
* Use a signed-in customer with exactly one earlier paid order for this package. Record its order reference and tickets.
* In the same customer account, reserve one additional package in a cart that has not timed out. Save and record its three attendees and answers. Record the current cart total.

**Tags:** packages, cart, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the current cart and increase its package quantity from one to two. | Earlier paid order 1 + requested cart 2 = 3; limit 2 | The increase is rejected with customer-limit feedback. |
| Reopen checkout and check the names, email addresses and Guest notes on the tickets. | Original cart quantity 1 | One package ticket and two included tickets remain at the original total, each keeping its original guest details. |
| Reload checkout. | Same account and cart | The rejected quantity has not been saved; the original reservation remains. |
| Open My Orders and the earlier paid order. | Recorded confirmation reference | The earlier order and tickets are unchanged, and the rejected edit has created no new order. |

**Postconditions:**

* Remove only this case’s unpurchased cart items. Check in Box Office that their reserved quantities return to availability; leave other customers’ carts and orders unchanged.
* Keep the earlier paid order and restore both recorded Admin values, Per user and Purchase limit, after clearing the new cart.

### TC-6: Let only one buyer reserve the last available package

**Qase case:** [SPT-5867](https://app.qase.io/case/SPT-5867) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Execution limit:** record whether requests overlap. A sequential inventory rejection does not prove the database race behavior.

**Title:** Core - Inventory - Let only one buyer reserve the last available package

**Description:** Two customers each have one package reserved. Only one additional package remains. Both attempt to increase to two; only one increase may succeed, and both customers must keep their original guest information.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the one included General Admission ticket in each package.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| Widget | Desktop |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | ON | ON |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item ON; Only collect attendee info for individual tickets ON.** For each package, the customer enters First name, Last name, Email and Guest notes for the package ticket and for its one included ticket.

Customer starting point: open the parent event’s public page and select Buy, or use its existing Widget (the Showpass purchase window on the Organization’s website), according to the Platform/View row.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

If one increase finishes before the other starts, record that the customers tried in sequence. That result does not prove the simultaneous-reservation check; proving that timing needs a controlled developer test.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes one General Admission ticket (a ticket without an assigned seat) from this child event.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* Use two different customer accounts, each signed in through its own browser profile so their carts are not shared. Package-ticket and included-ticket inventory are both 3, with no prior sales or other reservations. All event capacities and purchase/customer limits allow at least four.
* Each customer reserves one package in a cart that has not timed out and saves different information for its two attendees. Record both guest mappings, totals and available counts. One additional package remains. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.

**Tags:** packages, cart, edge-case

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Have both customers request an increase from one package to two at the agreed start signal. | Two independent sessions | One cart accepts two packages; the other shows inventory feedback and stays at one. |
| Reopen checkout in each session. | Successful cart 2; other cart 1 | The two carts together contain three packages and three included tickets, never four. |
| In each cart, compare the original tickets’ names, email addresses and Guest notes with the recorded values. | One original package ticket and one original included ticket per customer | Each original ticket keeps its saved guest details. Neither customer sees the other customer’s details. |
| In the cart whose increase succeeded, inspect the guest details requested for the added tickets. | One new package ticket and one new included ticket | Both new tickets ask for guest details with blank values. The original tickets still have their saved details. |
| As the employee, compare package-ticket and included-ticket availability in Box Office. | Total inventory 3 of each | Three units of each ticket type are reserved; neither is oversold. |

**Postconditions:**

* Remove the unpurchased items from both carts and verify all three units of each ticket type return to availability.

### TC-7: Increase a preset package with per-ticket guest collection off

**Qase case:** [SPT-5868](https://app.qase.io/case/SPT-5868) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Title:** Core - Inventory - Increase a preset package with per-ticket guest collection off

**Description:** Increase a preset package from two to three when neither event collects information for each ticket. Included quantities and the total must increase. Checkout must not start asking for the name, email or guest-question answers of the person using each ticket.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | OFF | OFF |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item OFF; Only collect attendee info for individual tickets ON.** Neither event has custom guest questions. Checkout still asks for the details of the customer paying for the order. It must not ask for a guest’s details for each package ticket or included ticket.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| No ticket-by-ticket guest questions | Parent and child events → Manage → Order form | Set Collect guest information per ticket OFF on both events and use events without custom guest questions. This does not remove the purchaser details needed to place the order. Save and reopen each Order form. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* The package price is 10.00. Included tickets have no extra price; all fees, taxes and shipping are 0.00.
* Use an empty cart. Inventory and purchase/customer limits permit three packages. Record package-ticket and included-ticket available counts before selection. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.

**Tags:** packages, basket, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the parent event’s Buy flow or its Widget and select two packages. | Quantity 2 | Two package tickets and four included tickets are selected; the total is 20.00. |
| Increase the package quantity to three in the cart. | Quantity 3 | Three package tickets and six included tickets are selected; the total is 30.00. |
| Open checkout. | Per-ticket collection OFF on the parent and child events | The customer can enter their purchaser details. Checkout does not ask for a guest’s name, email or guest-question answers for any package ticket or included ticket. |
| Reload checkout and inspect the cart. | Same cart, before it times out | Three packages, six included tickets and the total of 30.00 remain saved. |

**Postconditions:**

* Remove only this case’s unpurchased cart items. Check in Box Office that their reserved quantities return to availability; leave other customers’ carts and orders unchanged.
* Before clearing, confirm only three package-ticket and six included-ticket units are reserved; after clearing, verify their release.

### TC-8: Decrease a preset package and release the removed tickets

**Qase case:** [SPT-5869](https://app.qase.io/case/SPT-5869) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Title:** Core - Inventory - Decrease a preset package and release the removed tickets

**Description:** Start with two packages whose guest details have already been entered, then reduce the quantity to one. One complete package must remain with its own guest information, and only the removed package’s reservation must be released.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| React Native Public | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | ON | ON |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item ON; Only collect attendee info for individual tickets ON.** For each package, the customer enters First name, Last name, Email and Guest notes for the person using the package ticket, then for the person using each of the two included tickets.

Customer starting point: open the parent event’s public page and select Buy, or use its existing Widget (the Showpass purchase window on the Organization’s website), according to the Platform/View row. For the Showpass app row, open Explore → the parent event → Buy.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* The package price is 10.00. Included tickets have no extra price; all fees, taxes and shipping are 0.00.
* From the parent event’s Buy flow, add two packages to a cart that has not timed out. Save distinct information for all six attendees and record which three guests belong to each package. Record available inventory before selection. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.

**Tags:** packages, basket, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the cart and reduce the package quantity from two to one. | Quantity 1 | One package ticket and two included tickets remain; the total becomes 10.00. |
| In checkout, check the name, email and Guest notes on each remaining ticket. | One package ticket and two included tickets | All three tickets keep the guest details belonging to the remaining package. Details from different packages have not been combined. |
| Reload checkout. | Same cart | One package ticket and two included tickets remain, each with its saved guest details; the total is 10.00. |
| As the employee, compare available counts in Box Office with the recorded values. | Removed quantity: one package | One package-ticket and two included-ticket units have been released; the remaining package is still reserved. |

**Postconditions:**

* Remove only this case’s unpurchased cart items. Check in Box Office that their reserved quantities return to availability; leave other customers’ carts and orders unchanged.

### TC-9: Remove a package and keep the regular ticket in the cart

**Qase case:** [SPT-5870](https://app.qase.io/case/SPT-5870) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Title:** Core - Inventory - Remove a package and keep the regular ticket in the cart

**Description:** A cart contains one regular ticket and one package with two included tickets. Remove only the package. Its tickets must disappear, and checkout must stop asking for their guest details. The regular ticket must remain with its saved name, email and Guest notes.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.  The child event also sells a separate regular General Admission ticket of a different ticket type. That regular ticket type is not included in the package; it is bought separately.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | OFF | ON, for both the included tickets and the separate regular ticket |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF; this setting concerns included tickets, not the separate regular ticket |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item OFF; Only collect attendee info for individual tickets ON.** The customer enters First name, Last name, Email and Guest notes for the regular ticket and for each of the two included tickets. Checkout must not ask for another person’s details for the package ticket.

Customer starting point: use the child event’s Buy flow for the separate regular ticket and the parent event’s Buy flow for the package. Widget means the Showpass purchase window on the Organization’s website. Use the Platform/View row selected for this check.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* On the child event, select a separate regular General Admission ticket type priced 5.00. It is different from the included ticket type and is not part of the package. The package price is 10.00; all fees, taxes and shipping are 0.00. Both selections can be purchased in one cart.
* The child event’s Capacity permits at least 3 tickets in this cart, counting its included tickets and separate regular tickets together. Each ticket type’s Inventory permits the quantities used below.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* Add one regular ticket from the child event’s Buy flow, then one package from the parent event’s Buy flow to the same cart before it times out. The total is 15.00. Save and record their three attendees. Record each ticket type’s available inventory before selection. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.

**Tags:** packages, basket, checkout

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the cart and select Remove on the package. | Leave the regular ticket selected | The package and its two included tickets disappear; the regular ticket remains at 5.00. |
| In checkout, check which tickets still ask for guest details. | One remaining regular ticket | Only the regular ticket remains, with its original name, email and Guest notes. The removed package’s tickets no longer ask for details. |
| Reload checkout and inspect the cart. | Same cart | The package has not returned; the one regular ticket and its information remain saved. |
| As the employee, compare available inventory in Box Office. | One regular ticket still reserved | One package-ticket unit and two included-ticket units have been released; the regular-ticket reservation is unchanged. |

**Postconditions:**

* Remove only this case’s unpurchased cart items. Check in Box Office that their reserved quantities return to availability; leave other customers’ carts and orders unchanged.
* No order or payment is needed; retain the before/after cart and availability comparison.

### TC-10: Buy one regular ticket and one preset package with separate guest information

**Qase case:** [SPT-5871](https://app.qase.io/case/SPT-5871) — Inventory → Packages and Bundles (1243). Created and full-field readback verified on 2026-10-30; not executed.

**Title:** Core - Inventory - Buy one regular ticket and one preset package with separate guest information

**Description:** Buy one regular ticket and one preset package in the same order. The package includes two tickets. Checkout must collect a name, email and Guest notes for the regular ticket and for each of the two included tickets, then issue exactly the selected items without lost or duplicate tickets.

Event setup: use **two different events in the same Organization**. The **parent event** sells the package ticket. One **child event**, different from the parent, supplies the two included General Admission tickets in each package.  The child event also sells a separate regular General Admission ticket of a different ticket type. That regular ticket type is not included in the package; it is bought separately.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |

| Required setting | Parent event | Child event |
| --- | --- | --- |
| Collect guest information per ticket | OFF | ON, for both the included tickets and the separate regular ticket |
| Hide guest information when purchased as part of a package | Not applicable to the package ticket | OFF; this setting concerns included tickets, not the separate regular ticket |

Package Delivery options: **Send a single barcode OFF; Allow redemption on any included item OFF; Only collect attendee info for individual tickets ON.** The customer enters First name, Last name, Email and Guest notes for the regular ticket and for each of the two included tickets. Checkout must not ask for another person’s details for the package ticket.

Customer starting point: use the child event’s Buy flow for the separate regular ticket and the parent event’s Buy flow for the package. Widget means the Showpass purchase window on the Organization’s website. Use the Platform/View row selected for this check.

**Where to prepare this setup**

| Item | Where to find it | What it means |
| --- | --- | --- |
| Preset package and its Delivery options | Dashboard → Events → open the parent event → Promote → Packages → Edit | Preset means each package includes the same fixed tickets. The Delivery options section contains the three saved package switches listed above. Save with Save package. |
| Event guest-information settings | Dashboard → Events → open the parent or child event → Manage → Order form | Collect guest information per ticket is a saved event toggle, not a feature flag. It controls whether checkout asks for details for each ticket. |
| Hide guest information when purchased as part of a package | The child event’s Order form, beside Collect guest information per ticket | This is another saved event toggle, not a custom question. Leave it OFF so the child tickets can ask for their own guest details. It is visible only while Collect guest information per ticket is ON. |
| Names, email and Guest notes | On each event collecting guest details: Order form → Collection type → Enhanced Info; enable First name, Last name and Email. In Custom questions, add a required text question named Guest notes for the tested ticket types, collected during checkout. | Guest notes is a question created for this check, not a built-in Showpass setting or flag. Keep collection before payment: Collect information after payment on Order form must be OFF. If that control is hidden, an authorized administrator checks the event in Admin → Events and confirms Collect info post purchase is OFF. Save and reopen the page to check the values. |
| Ticket Inventory and event Capacity | Each event → Manage → Tickets: the Inventory column sets each ticket type’s quantity; Event ticket settings → Total Event Inventory sets the event-wide limit. | Capacity in this case means the event’s Total Event Inventory setting. It is not another ticket type’s Inventory. |

To compare remaining and reserved quantities, an employee opens Dashboard → Box Office → Sell, selects the recorded event and ticket type, and checks its Inventory information. Use Box Office and View Box Office Stats are employee permissions, not event settings. The employee preparing Dashboard settings also needs Manage Events. Record the original values before changing them; restore only the settings changed for this case.

**Preconditions:**

* The employee preparing the Dashboard settings has Manage Events permission.
* Parent event: select a published, on-sale future event that sells the Preset package ticket.
* Child event: select a different published, on-sale future event in the same Organization. Each package includes two General Admission tickets (tickets without assigned seats) from this child event.
* On the child event, select a separate regular General Admission ticket type priced 5.00. It is different from the included ticket type and is not part of the package. The package price is 10.00; all fees, taxes and shipping are 0.00. Both selections can be purchased in one cart.
* The child event’s Capacity permits at least 3 tickets in this cart, counting its included tickets and separate regular tickets together. Each ticket type’s Inventory permits the quantities used below.
* No seats, nested packages, bundled products, discount, hold, waitlist, group sale, payment plan, upgrade or pay-what-you-can pricing applies.
* On each event with per-ticket collection ON, require First name, Last name, Email and a text answer called Guest notes before payment. Use different details for each attendee and email addresses controlled for this case.
* Use an empty cart and published, on-sale future events. Inventory and purchase/customer limits allow the selected items. Record regular-ticket, package-ticket and included-ticket inventory before selection. An employee with Use Box Office and View Box Office Stats can compare the recorded available counts. No employee permission is needed for the customer’s cart actions.
* Prepare different names and Guest notes for the regular-ticket guest and the two included-ticket guests. Use an approved test card with the payment provider in test mode because this case completes a paid purchase.

**Tags:** packages, checkout, purchases

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the child event’s Buy flow and add one regular ticket. | Regular ticket quantity 1 | One regular ticket is in the cart at 5.00. |
| Open the parent event’s Buy flow and add one package to the same cart. | Package quantity 1; two included tickets | The cart contains both selections at a total of 15.00. |
| Open checkout and enter a different name, email and Guest notes for the regular ticket and for each included ticket. | One regular ticket and two included tickets | Each of these three tickets accepts its own guest details. Checkout does not ask for another guest’s details for the package ticket. |
| Continue to the order review. | Recorded guests and selections | The review retains one regular ticket and one package containing two included tickets; the total is 15.00. |
| Complete the approved test-card payment once. | 15.00 | One payment and one successful order are created for 15.00. |
| Open the completed order and its tickets. | New confirmation reference | The order contains the regular ticket and the complete package; each of the three attendee tickets has its intended guest information. |

**Postconditions:**

* Keep the completed order, payment reference and record of which guest details belong to each ticket; do not delete financial records.
* Compare final availability with the recorded counts: one regular-ticket unit, one package-ticket unit and two included-ticket units were consumed.

## Published updates to existing cases — 2026-10-30

SPT-3294’s requested split and Inventory move are saved. SPT-3879 was separately improved at the user’s request. Both passed selected-field and metadata readback checks. The finance case explicitly requires a completed independent expected-amount worksheet and authorized financial evidence before execution.

## Published update to SPT-3294

**Existing case:** [SPT-3294 — Core - Checkout - Edit Item Quantity in Basket](https://app.qase.io/case/SPT-3294).

**Saved title:** Core - Inventory - Change regular ticket quantities in the cart.

**Saved destination:** Inventory → Stock Counts and Overselling (1240), moved from suite 597.

Keep the single-event and recurring-ticket quantity checks. Explain the real cart controls and the selected date. Move the Package parameter’s checks into focused cases with explicit guest-collection settings, rather than making this one test cover every package configuration.

| Part | Saved content |
| --- | --- |
| Start | Two regular General Admission tickets in an unexpired cart; inventory and purchase/customer limits allow three. Record the event/date, initial availability and expected totals. |
| Data variations | EventType: SingleEvent or RecurringEvent. Select one specific occurrence for the recurring row and keep it throughout. State Collect guest information per ticket OFF for this base quantity-control case; the information-preservation cases remain separate. |
| Actions | Open the cart and use its visible controls: 2 → 3 → 1, then Remove. Use Remove when the quantity control stops at the minimum. |
| Expected | Accepted quantities and totals remain after reopening. The recurring date does not change. Reductions/removal release only the affected tickets; no purchase is required. |
| Keep | Existing ID, useful assertions and unrelated metadata. Both regular-ticket EventType values remain. |
| Move out, without losing coverage | Package increase without guest collection → TC-7. Package increase with saved guest information → TC-1. Package reduction → TC-8. Package removal and unaffected regular ticket → TC-9. TC-3 and TC-10 add mixed-cart edit and successful-purchase proof. |

**Published split:** created and verified all ten new cases before updating SPT-3294. Its Package value is now covered by SPT-5862 (saved guest information), SPT-5868 (collection off), SPT-5869 (decrease) and SPT-5870 (removal). SPT-5864 and SPT-5871 add mixed-cart edit and clean-purchase proof. SPT-3294 now has only SingleEvent and RecurringEvent. No original case was deleted.

### SPT-3294: Change regular ticket quantities in the cart

**Published change:** user-requested Refactor. Changed only title, Description, Preconditions, Postconditions, Steps, EventType parameters and suite assignment (597 → 1240), after the ten creates were verified. All other live metadata and the existing recurringeventticket tag were preserved.

**Title:** Core - Inventory - Change regular ticket quantities in the cart

**Description:** Change a regular ticket quantity from two to three, then one, and remove it from the cart. Accepted quantities and totals must stay saved, the selected event date must remain the same, and removed quantities must return to availability. No purchase is required.

This case uses regular tickets only. There is no package, so parent event and child events do not apply; for a recurring event, keep the selected occurrence’s date and time unchanged.

| Platform | View | Start here |
| --- | --- | --- |
| WebPublic | Desktop | Open the event and select Buy. |
| WebPublic | Mobile | Open the event and select Buy. |
| Widget | Desktop | Open the event in its existing Widget purchase flow. |
| Widget | Mobile | Open the event in its existing Widget purchase flow. |
| WebBoxOffice | Desktop | Open Box Office → Sell and select the event/date. |
| Electron | Desktop | Open the Showpass desktop app → Box Office → Sell and select the event/date. |
| React Native Public | Mobile | Open Showpass → Explore → the event → Buy. |

| EventType | Ticket to select |
| --- | --- |
| SingleEvent | A regular General Admission ticket for a future single-day event. |
| RecurringEvent | A regular General Admission ticket for one selected future occurrence of a recurring event. Record the occurrence's date and time before selection. |

Run one EventType and supported client/view row per execution.

**Where to prepare this setup**

| Term or setting | Where to find it | Meaning |
| --- | --- | --- |
| General Admission | Dashboard → Events → open the event → Manage → Tickets | A ticket without an assigned seat. Select the ticket type used for this check. |
| Collect guest information per ticket | That event → Manage → Order form | A saved event toggle, not a feature flag or custom question. Leave it OFF for this quantity-control case. Save and reopen the page. |
| Inventory and Capacity | That event → Manage → Tickets: Inventory for the ticket type; Event ticket settings → Total Event Inventory for the event-wide limit | Both must allow at least three tickets. Capacity means Total Event Inventory here. |
| Purchase limits | Tickets → edit the selected ticket type → Basic info → Purchase limits | Leave Minimum purchase limit blank for the default of 1. Maximum purchase limit and Per-user limit must allow at least three. Box Office purchase limit must also allow three for the employee-sale rows. |

The setup employee needs Manage Events. The employee checking reservations opens Dashboard → Box Office → Sell, selects the same event/date and ticket type, and checks Inventory. Use Box Office and View Box Office Stats are employee permissions. For RecurringEvent, use the same occurrence every time; it is one date/time offered by the recurring event.

**Parameters:**
EventType: SingleEvent, RecurringEvent

**Preconditions:**

* Use an empty cart that has not timed out and published, on-sale tickets matching EventType. No package, assigned seating, discount, hold, waitlist or payment plan applies.
* Collect guest information per ticket is OFF for the selected event. This case checks quantity controls; checkout should not ask for a different guest’s details for each ticket.
* Each ticket costs 10.00, with all fees, taxes and shipping at 0.00. Expected totals are 20.00 for two tickets, 30.00 for three, and 10.00 for one.
* Inventory and event capacity permit at least three tickets. The minimum purchase quantity is 1 and the per-purchase and customer limits permit at least three.
* Record the ticket type, selected date/time and available inventory before selection. No other customer changes that inventory during this check.
* An employee with Use Box Office and View Box Office Stats checks availability after each accepted quantity and after removal. Those permissions are also needed for an employee executing the Box Office rows; public customers need no employee permission.

**Tags:** recurringeventticket

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected purchase entry and add two tickets for the recorded event/date. | EventType; quantity 2 | The cart contains two tickets for the intended date at 20.00; exactly two tickets are reserved. |
| Increase the ticket quantity to three using the cart controls. | Quantity 3 | The cart shows three tickets for the same date at 30.00; its reservation increases by one ticket. |
| Reload the purchase page and inspect its cart. | Same unexpired cart | Quantity three and the total of 30.00 remain saved. |
| Decrease the ticket quantity to one using the cart controls. | Quantity 1 | One ticket remains for the same date at 10.00; the two removed tickets return to availability. |
| Reload the purchase page and inspect its cart again. | Same cart | Quantity one and the total of 10.00 remain saved. |
| Select Remove for the remaining ticket. | Remove the one ticket | The item disappears and the cart is empty, with no remaining amount due. |
| As the employee, compare available ticket inventory in Box Office with the recorded starting count. | Recorded event/date and ticket type | Availability matches the starting count; no tickets remain reserved by this cart. |

**Postconditions:**

* Leave this case's cart empty. No order, payment or financial record is created.
* Keep the before/after quantities and availability comparison as evidence.

## SPT-3879 improvement — separately requested after the Inventory batch

**Initial improvement, before the later parameter-label update above:** published separately at the user’s request. Classification: Enhance. Updated only title, Description, Preconditions, Postconditions and Steps; suite **676**, all three PackageType values, tags, priority, severity, automation settings and other metadata were verified unchanged. Steps increased from four to seven. No fee rule was changed or financial test executed.

### SPT-3879: Keep package prices and fees correct after quantity changes

**Title:** Core - Financials - Keep package prices and fees correct after quantity changes

**Description:** Buy a package alongside a separately priced regular ticket. Change the package quantity in the same cart from three to four, then two. Compare prices, each applicable fee, taxes and the final payment with an independent calculation prepared from the saved settings. The regular-ticket quantity must stay at one.

Event setup: the **parent event** sells the package ticket. **Child events**, when used, are events other than the parent that supply included tickets. Included tickets may instead come from the parent event where supported; record that explicitly rather than calling it a child event. Products and variants are included items, not child events.

| Event or item to record | Required relationship |
| --- | --- |
| Parent event and package ticket | Record the event and ticket type that sell the selected package. |
| Included ticket types | Record each ticket type, quantity and event. Say whether its event is the parent event or a different child event. For Custom, also record the selected options. |
| Product, for ProductBundle | Record the product/variant separately from the event list; it has no child-event relationship. |
| Separate regular ticket | Record its event and ticket type. Its type must not be included in the package. Sharing an event with a package item does not make this separate ticket part of the package. |

| Platform | View |
| --- | --- |
| WebPublic | Desktop |
| WebPublic | Mobile |
| Widget | Desktop |
| Widget | Mobile |
| WebBoxOffice | Desktop |
| Electron | Desktop |
| React Native Public | Mobile |

Use one PackageSetup and supported client/view row per execution. Open the package's Buy flow on public web or Widget, Explore → event → Buy in the Showpass app, or Box Office → Sell in the web/desktop employee apps. Expected fees must match the selected sales channel; public and employee fees are not assumed equal.

| PackageSetup | Package to select and record |
| --- | --- |
| Preset | A paid Preset ticket package with fixed included tickets and revenue realization off. Record the included ticket types, quantities and event dates. |
| ProductBundle | A paid ticket-and-product package with its supported revenue-realization setup enabled. Record the product, selected variant, units per package, which items incur each fee and how the selling price is allocated. |
| Custom | A paid Custom package. Record its required categories, selected ticket choices and quantities per package before adding it. Use the same choices throughout the quantity edits. |

Prepare the following expected amounts independently for package quantities **3, 4 and 2**, each alongside **one regular ticket**:

| Amount to prepare | Required calculation input |
| --- | --- |
| Item subtotal | Saved selling prices and purchased quantities. Included-item allocations are not an extra customer charge. |
| Each customer-paid fee | Its amount/rate, eligible items and whether it applies per unit, per order or on another configured basis. |
| Taxes | The taxable item/fee amounts, applicable rates and the configured currency rounding. |
| Shipping, when configured | The selected delivery method and applicable shipping/tax rule. |
| Final amount to pay | The item subtotal and customer-paid charges/taxes under those rules. |
| Internal/absorbed fees and allocations | The fee owner, eligible items and saved parent/included-item allocation. These are checked separately from the customer's total. |

**Where to find the settings and financial records**

| Term | Plain meaning | Location |
| --- | --- | --- |
| Preset or Custom package | Preset has fixed included tickets; Custom lets the customer choose the included tickets from configured groups. | Dashboard → Events → parent event → Promote → Packages → Edit. Record the saved selections; do not change the package during the check. |
| Revenue realization / allocation | How money from the package sale is assigned to the package ticket and included items for reporting. It is not another amount charged to the customer. | Admin → Venues → the Organization’s Venue → Package revenue realization type. Package-specific settings are on Admin → Ticket packages; included-ticket allocation records are under Sub ticket type infos. Reuse an already configured package rather than changing an Organization’s mode for this check. |
| Internal fees | Charges that reduce the Organization’s earnings and may not appear as extra charges on the customer’s receipt. | An authorized financial reviewer reads Admin → Venue internal fees and Venue internal fee values for this Venue to prepare the calculation. |
| Expected-amount worksheet | A calculation prepared from the saved prices, fee rules and taxes before checkout. | A calculation sheet kept with the run evidence; it is not a Showpass screen. Do not copy checkout’s total into it as the expected result. |
| Invoice and invoice item | An Invoice is the financial record for the order; an Invoice item is one line of that Invoice. | Dashboard → Transactions for the customer-facing order review. For the detailed saved financial check, Admin → Invoices → find the new paid Invoice using its transaction reference or the customer email in text search; confirm its date, amount and items, then open its Invoice items using their change links. |
| Saved internal fees and allocations | The amounts and package-revenue shares actually saved on those order lines. | On each Admin Invoice item, read Venue internal fees and Percent allocation applied from package where applicable. Compare with the prepared calculation; do not edit or save financial records. |
| Payment-provider transaction | The corresponding test payment recorded by the Organization’s configured payment provider. | That provider’s authorized test dashboard, using the payment reference from the order. This is outside Showpass. |

The person preparing the worksheet must be allowed to read these Admin records. If the required financial values or provider transaction cannot be accessed, mark the run Blocked and state what is missing; the receipt total alone does not prove the internal-fee check. Use already prepared configurations and keep their values unchanged.

**Parameters:**
PackageSetup: Preset, ProductBundle, Custom

**Preconditions:**

* Select published, on-sale items matching PackageSetup from the same Organization, with inventory and purchase/customer limits allowing at least four packages and one regular General Admission ticket. The regular ticket has a different price and no package relationship.
* Before adding items, record the event/item relationships listed in Description. Preserve the selected package configuration, event dates and Custom choices throughout the quantity changes.
* Have a completed expected-amount worksheet for quantities 3, 4 and 2, prepared from the actual saved prices, fees, taxes, currency, delivery and allocation rules for this PackageSetup and sales channel. Keep the settings and calculations with the run evidence; do not use checkout's calculated total as its own expected result.
* Include at least one applicable customer-paid fee. Record every applicable internal/absorbed fee and whether an included product participates in each fee. Keep these settings unchanged during the test.
* Start with an empty cart. Use customer details controlled for this check and an approved test card with the provider in test mode because this case completes a paid purchase.
* An employee with Administer Transactions can open the saved order. Arrange authorized read-only access to the corresponding payment-provider transaction and the saved financial evidence needed to compare applicable internal fees and revenue allocations.
* For Web Box Office or the desktop employee app, the selling employee also needs Use Box Office and the permission for the selected card-payment method.

**Tags:** internal-rate-card

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected purchase entry and add three packages with their required choices, plus one regular ticket. | PackageSetup; package quantity 3; regular ticket quantity 1 | The cart has the recorded package contents and regular ticket; its breakdown matches the independent quantity-three calculation. |
| Increase only the package quantity to four. | Same package choices; regular ticket remains 1 | Package contents and each displayed charge update to the quantity-four calculation; the regular ticket is unchanged. |
| Decrease only the package quantity to two. | Same choices; regular ticket remains 1 | Contents and charges match the quantity-two calculation, with no stale quantity-four fee or duplicate included-item charge. |
| Complete the required customer details and open the final order review. | Prepared final expected amounts | The named prices, fees, taxes, delivery charges and final amount match the independent quantity-two calculation. |
| Complete the approved test-card payment once. | Final expected amount | One payment and one successful order are created for that exact amount. |
| As the permitted employee, open the new order in Transactions and compare its receipt/invoice and corresponding provider transaction with the worksheet. | New confirmation and payment references | Both saved order and provider amount match the final expectation, and the order contains the two complete packages plus one regular ticket. |
| As the authorized financial reviewer, open the new Invoice’s Invoice items in Admin and compare their saved internal fees and package-revenue shares with the worksheet. | Authorized saved financial evidence; recorded product fee policy where relevant | The expected internal fees and allocations are present once on the intended items, even when they do not change the customer-facing total. |

**Postconditions:**

* Keep the order, payment reference, a record of the saved settings and the independent calculation as evidence. Do not delete financial records.
* Restore only settings changed for preparation; keep the completed order's historical prices and financial records intact.

**Execution prerequisite, not an invented result:** this improved case can be saved without assigning arbitrary Venue-specific fee amounts. Before running it, the independent calculation and authorized financial evidence must be available. If either is missing, mark that execution Blocked; matching the customer total alone does not prove internal fee correctness. Separate full pricing-mode, refund and financial-failure matrices remain outside this case.

## Approved write and verification record — 2026-10-30

**Initial approved batch completed: 10 creates + SPT-3294 update/move.** A later exact-case request separately authorized SPT-3879’s improvement, which also completed. Both paths were dry-run before apply. No suites were created and no cases copied or deleted.

Created and read back all ten replacement/added cases first, then refactored and moved SPT-3294. Packages and Bundles (1243) contains exactly its original six plus the ten new IDs: **6 → 16**. Both Inventory destinations retain parent 625. The six original package cases were compared with their before-state and are unchanged.

| Action | Local label / existing ID | Saved title | Suite | Tags | Parameters | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| Create | TC-1 | Core - Inventory - Increase a preset package and keep each guest’s information | 1243 | packages, checkout, purchases | None | 6 |
| Create | TC-2 | Core - Inventory - Keep the requested quantity after two quick package increases | 1243 | packages, cart, edge-case | None | 5 |
| Create | TC-3 | Core - Inventory - Increase regular tickets without changing the package’s guest information | 1243 | packages, basket, checkout | None | 4 |
| Create | TC-4 | Core - Inventory - Keep the original package cart when an increase exceeds inventory | 1243 | packages, cart, edge-case | InventoryBoundary: SellingTicket, IncludedTicket, SellingEvent, IncludedEvent | 5 |
| Create | TC-5 | Core - Inventory - Reject a package increase beyond the customer’s limit | 1243 | packages, cart, edge-case | None | 4 |
| Create | TC-6 | Core - Inventory - Let only one buyer reserve the last available package | 1243 | packages, cart, edge-case | None | 5 |
| Create | TC-7 | Core - Inventory - Increase a preset package with per-ticket guest collection off | 1243 | packages, basket, checkout | None | 4 |
| Create | TC-8 | Core - Inventory - Decrease a preset package and release the removed tickets | 1243 | packages, basket, checkout | None | 4 |
| Create | TC-9 | Core - Inventory - Remove a package and keep the regular ticket in the cart | 1243 | packages, basket, checkout | None | 4 |
| Create | TC-10 | Core - Inventory - Buy one regular ticket and one preset package with separate guest information | 1243 | packages, checkout, purchases | None | 6 |
| Update | SPT-3294 | Core - Inventory - Change regular ticket quantities in the cart | 1240 | recurringeventticket (existing; unchanged) | ItemType: SingleEventTicket, RecurringEventTicket | 7 |

**SPT-3294 exact changes:** title from Core - Checkout - Edit Item Quantity in Basket to Core - Inventory - Change regular ticket quantities in the cart; suite 597 → 1240; replace Description, Preconditions, Postconditions and six vague Steps with the seven visible-control Steps above; ItemType retains SingleEventTicket and RecurringEventTicket, with Package covered by the new focused cases. Keep existing tags, priority, severity, automation settings, status, attachments, links and all unrelated metadata.

**Approval and verification:** the user explicitly approved the ten creates and SPT-3294 update/move, then separately requested improvements to SPT-3879. The maintained batch script saved receipts and read back each result. Final independent GET verification completed at **2026-10-30 14:52:39 America/Edmonton (20:52:39 UTC)**: all twelve cases match every written field. SPT-3294’s unrelated metadata is unchanged; SPT-3879 additionally retains suite 676 and both stored parameter representations with all three PackageType values. No product tests were run.

**SPT-3879 separate dry run/apply:** title changed to Core - Financials - Keep package prices and fees correct after quantity changes; Description, Preconditions, Postconditions and Steps improved; steps 4 → 7. Its internal-rate-card tag, priority/severity, automation settings, status and other metadata are unchanged. No parameter or folder update was sent.

**Cleanup:** temporary before-state snapshots, plans, dry-run results, apply receipts and verification helpers were removed after recording the useful results and case IDs here. No credentials or live Showpass business records were changed.

## Earlier dry-run preview — superseded by the Inventory split

> [!info]- Historical six-create dry run — not the current scope
> **Historical result — 2026-10-30:** maintained case script, one six-operation batch, `--dry-run` only. **Do not use this as the current apply scope:** titles, case responsibilities and destination changed after the user requested the Inventory split. **6 creates, 0 existing-case updates, 0 moves, 0 deletions.** All destination suites are **Core - Packages → Preset (602)**. Qase assigns IDs only after a separately approved apply. This constructs and checks local payloads; it does not prove Qase server acceptance or execute any product test. No Qase write was made.
>
> | Local draft | Exact proposed Qase title | Suite | Tags | Parameters | Steps |
> | --- | --- | --- | --- | --- | --- |
> | TC-1 | Core - Packages - Keep attendee answers when increasing a preset package | 602 | packages, checkout, purchases | None | 7 |
> | TC-2 | Core - Packages - Keep the final quantity after consecutive cart increases | 602 | packages, cart, edge-case | None | 5 |
> | TC-3 | Core - Packages - Keep attendee answers when another cart item changes | 602 | packages, basket, checkout | EditedItem: Ticket, Product, Membership, OtherPackage | 4 |
> | TC-4 | Core - Packages - Keep the original cart when an increase exceeds inventory | 602 | packages, basket, edge-case | InventoryBoundary: SellingTicket, IncludedTicket, SellingEvent, IncludedEvent | 5 |
> | TC-5 | Core - Packages - Enforce the customer limit across saved package rows | 602 | packages, checkout, edge-case | None | 4 |
> | TC-6 | Core - Packages - Reserve the final package for only one buyer | 602 | packages, checkout, edge-case | None | 5 |
>
> **Not in this batch:** SPT-3294 and SPT-3879 have enhancement recommendations, but no complete replacement drafts yet; no partial update payload was invented. Existing package cases are preserved. Total: 30 step rows, six unique titles, and the eight parameter values shown above. Temporary preview plan and result files were removed after recording this scope. Any later apply needs a new dry run of the current 2-update/10-create proposal and explicit approval of its exact fields and destinations.

## Coverage decisions and code gaps — PR 7738

The coverage review below is retained from the source assessment. **Keep** means retain useful existing coverage. Local TC-1–TC-10 are now published as SPT-5862–SPT-5871 in order; “New” below records the original create decision. Every execution remains not run in this review.

| Proof target / affected feature | Decision and existing evidence | Remaining work |
| --- | --- | --- |
| Clean quantity increase preserves existing parent/child answers and adds blank attendees | **New TC-1.** SPT-3294 changes quantities; SPT-429 purchases packages; SPT-5299/3244/5145 check question visibility. None specifies this saved-answer → increase → paid-order flow. | Add a browser regression asserting ticket identities as well as the final forms, issued items and payment. The pure helper and hook already check retained rows; hook persistence is mocked. |
| Unchanged quantity preserves the same families | **Automated definition exists** in helper/hook tests; manual-Qase coverage is not explicit. | Add a routed API round-trip using the actual unchanged frontend payload; verify unchanged IDs, answers, totals and stock associations. Do not invent a UI action that guarantees an unchanged PUT. |
| Queue uses the latest response, including intervening saved answers | **New TC-2**, plus the existing latest-basket hook test. | Extend controlled integration coverage to two unresolved writes: the second must use the first response's full families. A browser reload or two sequential clicks cannot prove this alone. |
| Editing another item leaves an unedited package intact | **New TC-3** explicitly edits the regular ticket in a one-ticket/one-package cart. Helper tests preserve unrelated rows; hook tests cover another package and a membership. | TC-3 covers a regular-ticket increase. Product, membership and second-package edits remain **deferred manual/contract follow-ups**; they are no longer implied by the local TC-3 draft. Include reducing/removing other edited items in those follow-ups. The current code deliberately retains unchanged families without needing their catalog metadata. |
| Failed increase preserves the existing basket and reservations | **New TC-4.** SPT-4832/2972/2973 cover exhaustion/capacity, but not this saved answered cart. Hook test only rejects a mocked persist call. | Real PUT rollback: original IDs/answers, totals, reserved counts and distributed stock row/group/shared-ID associations must survive. Run the four limiting boundaries with the other limits nonbinding. |
| Customer limit is not bypassed by quantity-one rows | **New TC-5.** Generic inventory case SPT-3295 does not specify this package/customer setup. | Routed cap tests for authenticated and anonymous customers, earlier paid orders plus active carts, and aggregate quantity across split parents. Anonymous counting differs; the manual draft intentionally starts with an established signed-in identity. |
| Final available package, two buyers | **New TC-6.** No selected package case establishes competing existing carts plus retained answers. | Backend test with two independent transactions for both legacy and distributed inventory. Assert one successful increase, one rejection and retained original allocations in both carts. No capacity or production-load claim. |
| Actual cart passes the data required by the current helper | **Current-code gap after PR 7766.** CartItem forwards catalog ticket data in all three quantity handlers. Its reviewed test explicitly checks an empty metadata array for a product; it does not positively exercise an eligible package's catalog data through the real hook. | Add component-to-hook coverage for package Add, Remove and quantity-selection handlers, metadata absent/false/duplicate, and a still-loading catalog. Helper-only catalog fixtures cannot prove this wiring. |
| Saved tier / pricing / fees / internal allocations | **Keep SPT-3879,3159,4229. Enhance before relying on them for this PR.** 3879 has generic “correct” amounts and adds three initially; it does not edit an existing answered basket. | Specify independent before/after base price, fees, tax, absorbed/internal allocation and final invoice/payment amounts for its existing three PackageType values. PR 7766 retains the saved tier for eligible growth and falls back for mixed tiers; helper tests exist, but the reviewed tests do not establish routed financial parity. Do not narrow the case's existing product/custom/revenue coverage. |
| Quantity reduction / zero / deletion | **Refactored SPT-3294:** keep both regular-ticket ItemType values; split package checks into TC-1/7 (increase), TC-8 (decrease) and TC-9 (removal). The published split retains the two regular-ticket values and maps Package coverage to the new cases. Helper falls back on decreases; CartItem tests package-family removal. | TC-8/9 specify package contents, guest forms, unaffected items and released reservations. No “stable IDs on decrease” promise. Add TC-10 for a clean one-ticket/one-package purchase. Preserve the two regular-ticket variations when replacing vague logical-action steps. |
| Custom package choices and edits | **Keep SPT-3334/3335/4076/5264/4229.** Not eligible for the new preservation path. | Guard test exists. Reuse the package-choice flow with a quantity edit and verify only the required saved choices/children and correct totals survive. Directly changed behavior is not claimed for custom packages. |
| Nested / multi-event / reverse-ratio packages | **Keep SPT-3762/3558/5263/4832.** Nested groups and non-unit child groups fall back. | Exercise quantity edits around reverse-ratio boundaries 2→3→4: expected included quantities 1→2→2 under a ratio of 2. Generic initial purchases do not prove a changed cart. Never generalize ordinary multiplication or retained-family eligibility to every package. |
| Assigned seats and standing locations | **Keep SPT-1152/2870–2876/5265** as separate fallback regressions. | Unit guard tests cover permission/selection fields. Several 2870–2876 steps lack Expected Results; 2873/2876 mix Void, Refund and hold release without independent starting orders. Refine before treating them as executable regression proof. Preserve seat ownership and capacity checks. |
| Ticket/product links and variants | **Keep SPT-3760/5266** and existing product-link/backend guest-info tests. These families fall back. | Existing 5266 already increases quantity and checks product stock/partial-order prevention. Select it as a fallback regression; do not copy it into a new ordinary-package case or require stable family IDs. |
| Discounts and credits | **Keep SPT-4865/3338**; helper tests cover real versus empty discount metadata and explicit allocation changes. | Add a package quantity edit to the discounted-flow regression and prove discount use, child answers and money afterward. Empty/zero discount metadata must not falsely disable eligible ordinary growth. Credit payment has no newly changed algorithm; retained-credit final totals remain regression scope. |
| Holds, waitlists, group sales and payment plans | **Automated guard definitions exist** for each basket flag and both non-pending status transitions. They remain on consolidation. SPT-4860 is generic held-discount coverage, not proof of all package combinations. | Backend/contract parity for supported package setups; those configurations need their own setup and expected final states. Unsupported combinations are **not applicable**, not forced into a universal browser scenario. Do not imply a guard test proves fulfillment or installments. |
| PWYC and upgrades | **Keep SPT-3198/3743**; family guards exclude these rows. | Quantity-edited package regressions must retain the chosen price/upgrade contents and validation. Existing 3743 has only two broad steps and setup/expected-result weaknesses; it is not a complete quantitative proof. |
| Delivery, terms and check-in defaults | Helper tests check converted shipping/terms/check-in choices apply only to additions; explicit shipping edits fall back. **Keep SPT-4933** for shipping limits. | Routed evidence for retained versus added choices, shipping threshold behavior and correct customer delivery. No new scanning implementation; physical scanner/printer matrices are deferred beyond this basket-payload change. |
| Venue / Web Box Office / Electron / mobile employee baskets | **Keep SPT-4073/4076/5269** and the populated venue-hook guard test. | Representative quantity-edit parity through the venue API; public preservation must never be enabled for a venue provider. Do not apply public-only identity expectations to these clients. |
| Public web / Widget / calendar / app purchase webview | Shared public wrapper and cart are affected; **keep SPT-3860/725/2437/4928** for entry, session and expiry behavior. | Run TC-1 on desktop public web, mobile web, modal and embedded Widgets, then iOS and Android purchase webviews. Native device execution is **manual-only/not run**. Mobile viewport emulation is not a native-app pass. |
| Other public callers: tracking links, custom selector, seats, product/member/gift-card/donation additions and upsells | Source callers share modifyItems; unchanged eligible packages may be retained when another item changes, even though that caller cannot allocate new package units without catalog data. **Keep SPT-4802/717/5037** for related existing paths. | Contract tests for representative existing-basket callers and unchanged customer attribution, mutation scope, expiry and refund-protection invalidation. Do not count a catalog addition through addItems as an exercise of this changed method. |
| Invalid or ambiguous family shapes; missing/duplicate IDs; child edits | **Automated helper definitions exist.** Explicit non-custom shape, complete children, scalar/expanded parent references, identity uniqueness and unchanged child data are checked. | Retain these utility tests. API security must independently reject cross-basket/foreign saved IDs; client fallback is not authorization. No new schema or permission rule was added by this PR. |
| Final order, fulfillment and post-purchase | **Keep SPT-544**, package purchase/barcode tests and existing package Refund/Void/Exchange coverage outside this change. | TC-1 supplies a changed-cart purchase control. The serializer still owns expansion/pricing/limits and the normal purchase pipeline owns final issuance. Payment webhooks, delivery retries and adjustment algorithms were not edited; broad provider/refund matrices are deferred regression scope, not silently certified by this analysis. |

**Priority:** first add the real payload → backend integration for retained answers/IDs/stock and money; then the positive cart metadata test and controlled queue/rejection/race checks. For the first manual pass, use desktop public web for all ten drafts, run the one-ticket/one-package TC-3 scenario, all four TC-4 boundaries and the focused TC-7–TC-10 cases, then repeat the clean TC-1 flow on mobile web, modal and embedded Widgets, and iOS/Android purchase webviews. Use separate prepared legacy/distributed inventory for the controlled rejection/race checks. This selection does not certify the remaining pricing and excluded-shape combinations. Refine SPT-3294 with the approved split-and-replacement map, and preserve SPT-3879’s three PackageType values. No new Qase case is needed for each internal eligibility guard.

### Readability review record — 2026-10-30

Reviewed all 12 candidate titles. The ten create drafts now use Inventory titles and destination 1243. Each has one purpose, explicit guest-collection settings and form counts, short action/expected-result rows and its own cleanup. TC-3/9/10 start with one regular ticket and one package, with separate edit, removal and successful-purchase outcomes. SPT-3294’s package coverage has an explicit replacement map. SPT-3879 was subsequently enhanced and verified; its expected-amount worksheet is an explicit execution prerequisite. The fresh dry runs and writes are recorded above.

**Local readability checks passed:** all ten create drafts parse with the maintained Qase parser, contain required setup/cleanup and nonempty action/expected-result rows, and have unique Inventory titles. Each has 4–6 steps (47 total). Only TC-4 is parameterized, with four inventory boundaries: 13 selected parameter runs before client choices, none executed. Existing organizer case content below remains unchanged.

### Source evidence and limits

* **Exact merged change:** [frontend PR 7738](https://github.com/showpass/showpass-frontend/pull/7738), merged 2026-10-28 21:21:44 UTC. Local squash commit `02f21eeff03b1b655ff0227d23048e42ba031644`, immediate pre-merge parent `825693d851e157a8aa2ddc07098378ea832f0263`; PR head `21c7d61beac2d9e9b2d1cd9b3be314293b1294c3`, PR base and verified merge-base `427c676c53be0b584ded080e7fa56627397d8b99`. Cross-checked the GitHub patch and the exact base-to-head diff: five files, 923 insertions and 8 deletions; all five reviewed file contents at the PR head match the squash commit. Reviewed all five changed files: useBasket, the new preservation utility, their two test files and the basket README. No backend, schema or inventory-policy file was changed by this PR.
* **Refreshed source:** frontend develop `826e8cea3e5db2d890d0aee20132b0f0dd5b8d8d`; backend develop `2d5555158dda93bc0d52cbc4d2485a3023b3aa78`; Playwright `daac16c5470d9c92033d932bb426c171897eadfc`. Verified after the user's pull. The frontend files have additional changes in `53f920ccbb` / PR 7766; catalog splitting requirements, matching price tiers and retaining the saved tier belong to that later change, not PR 7738's original diff. These local checkouts are not proof of a deployed build.
* **Qase read:** documented read-only API; complete SPT snapshot, 2318 unique cases and 374 suites, 2026-10-30 19:49:51–19:50:05 UTC. No fixed page ceiling; total and unique-ID counts checked. Reviewed **23/23** full cases under 601: direct 4, Preset 602 has 12, Custom 604 has 7. Also reviewed **10/10** in 87, **6/6** in 1243, and 21 selected related definitions: **60 full case definitions total**, with no unread fields in those selected cases. Compared descriptions, prerequisites, parameters and grouped mappings, actions/data/expected results, postconditions and tags. Project filtering searched all those text fields for package/bundle/parent-child, then quantities, attendee answers, preservation, reservations, limits and related callers; 181 broad package matches. Candidate matches are not claimed as 181 completed content reviews.
* **Earlier local draft check (superseded):** the original six cases parsed through the maintained Qase parser without network access. Step counts are 7, 5, 4, 5, 4 and 5; all actions have expected results, every case has standalone Description/Preconditions/Postconditions, and each has three approved tags. TC-3 has four EditedItem values and TC-4 four InventoryBoundary values; the others have no parameters. That is 12 selected parameter runs before choosing client/configuration rows, not 12 executed tests. Markdown whitespace checks passed. No apply plan was prepared.
* **Execution boundary:** pure source and saved-case review at the user's direction. No new automated, API, browser, payment, device or load test was executed. PR-reported 320 passing frontend tests, mutation scores and local database/competition receipts are author-reported evidence; their referenced SRE-vault runners were not supplied or independently reproduced here. The existence of test code is distinct from a current pass. One earlier read-only browser context check preceded the user's code-only instruction; no organization was switched and no business record was changed; no browser observation is used to establish package coverage.
* **Cleanup:** temporary Qase snapshots, candidate exports and the read helper were removed after recording the useful evidence and reviewed IDs. No credentials, customer data, barcodes or basket tokens are included in this note. The ten local cases require separately authorized test data and execution; drafting does not grant permission to run them.

> [!info]- Code anchors and preservation notes
> **Frontend:** `packages/core/src/shared/modules/basket/services/useBasket.ts` reconstructs from the latest store snapshot inside the request queue, applies canPreservePackageItemGroups and delegates to persistWithCustomerAttribution. `utils/package-item-groups.ts` retains saved ordinary direct ticket families and appends only the additional blank parent quantity; current growth requires unambiguous per-ticket catalog metadata and matching saved price tiers. `services/useBasket.package-identity.test.tsx` mocks persist, including its rejected-write test. `utils/package-item-groups.test.ts` checks the eligibility/family/metadata/tier boundaries. `app-contexts/public/features/basket/components/cart-summary/cart-summary-items/cart-item/CartItem/CartItem.web.tsx` forwards catalog data in quantity select/add/remove; its reviewed test explicitly checks empty metadata for a product, without a positive eligible-package wiring scenario. Paths are relative to frontend `packages/core/src/` where applicable.
>
> **Consumers:** usePublicBasket uses DataProvider.Public; the public-page, widget purchase modal and client-site providers inject it. CartItem, checkout tracking-link review, custom package state/step, useBasketItemGroup, seating state, calendar EventWizard, TicketTypesContainer, product/member/gift-card/donation additions and ticket upsells call modifyItems. Public app purchases use the purchase webview; a native-only employee basket is not assumed to use the public provider. Guards preserve the existing venue branch and mutation/customer attribution ownership.
>
> **Backend:** `apps/tickets/api/serializers/general.py`: build_groups retains basket-scoped saved groups; clean_sub_groups and _add_normal_package_child_item_groups match children by parent ID and child type, recreate only where required, and calculate normal quantities or ceiling-based reverse ratios. Save and purchase-limit checks run within transaction.atomic; perform_purchase_limit_check covers legacy/distributed reservations, ticket/event/customer/product/member limits. An original client test with mocked persistence cannot establish any of those database outcomes. `apps/tickets/tests/packages/test_package_guest_info.py` does contain real routed answer/quantity tests, but its setup includes a product-linked hybrid package and edits a submitted parent's quantity. It does not establish the actual optimized ordinary-package frontend payload, unchanged stock associations or its paid fee parity. `apps/tickets/tests/api/user/baskets/test_api_user_based_basket_response.py` checks saved response consistency after replacing package selections.
>
> **Browser automation source:** `tests/core/packages/package-composable-helpers.ts`, `package-purchase-flows.ts`, `preset-package-custom-questions-config.ts` and `flows/package-checkout-engine.ts` supply useful preset/custom/multi-layer/product/seating purchases and final content/price checks. The inspected custom-question configuration uses answerLocation ORDER_CONFIRMATION, so it cannot serve as pre-payment saved answers → cart increase proof. Extend these existing journeys rather than copying the whole package suite. Shared checkout supports quantity-update options elsewhere; that capability alone is not a package regression assertion.
>
> **Preservation:** no existing case is replaced, narrowed, moved or deleted. Keep SPT-429's guest/authenticated and barcode/payment combinations; SPT-3294's two regular-ticket ItemType values and the original Package coverage mapped to TC-1/7/8/9 after the requested split; SPT-3879's three PackageType values; custom/seated/product/nested and organizer configuration coverage. SPT-5268's retained shortage definition is not the regression for this new identity path. See [[03 Test Cases/Ticketing/enable-force-public-sold-out-test-cases#TC-35 — Package contents actually unavailable — no overselling|the separate SPT-5268 duplication review]].
>
> **Reviewed case IDs:** suite 601 tree: 429,1152,2870,2871,2872,2873,2874,2875,2876,2972,2973,3334,3335,3558,3559,3560,3760,3762,4073,4076,4229,4832,5299. Suite 87: 811,812,815,2944,3859,4885,4886,4887,4888,4889. Inventory 1243: 5263,5264,5265,5266,5267,5269. Outside those groups: 544,717,725,2437,3159,3198,3244,3294,3295,3333,3338,3743,3860,3879,4802,4860,4865,4928,4933,5037,5145.
>
> **Guest-collection review:** rechecked backend `apps/tickets/services/packages/package_child_guest_info_collection.py` and frontend `packages/core/src/shared/modules/checkout/utils/checkout-custom-form-questions.ts`, `features/events/hooks/useEventOrderFormFields.ts` and `features/packages/ui/components/form/TicketPackageDeliveryOptionsSection.web.tsx` against the recorded revisions. A redeemable preset parent can collect its own per-ticket information; the included event's hide setting suppresses its forms only when the purchased parent collects information. For TC-1, the original PackageAndIncluded value has three forms per package; IncludedOnly has two and PackageOnly has one. TC-3/9/10 expect two included-ticket forms plus the separate regular-ticket form. The event-setup clarification explicitly uses one parent event and one different child event; that child event also supplies the different regular ticket type in TC-3/9/10. Normal purchaser details still apply when per-ticket collection is off. The independent regular-ticket type is intentionally different from the included type; buying that same included type separately has additional legacy filtering/venue-gate behavior and remains a separate contract follow-up.
>
> **Workflow sources:** [[06 Prompts/Showpass Qase Gap Analysis]], [[05 Tooling/qasectl]], [[05 Tooling/Qase Test Case Writing Rules]], [[00 Start Here/World-Class Software Quality Standard]], [[00 Start Here/Showpass QA Handbook/Playbooks/03 Packages and Parent-Child Items]], and [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes]] (exact configuration, existing baskets, competing actions and independent outcomes). Browser work is not required by this review.

## Earlier organizer setup coverage — 2026-10-04

## Scope and shared coverage

The complete event-ticket package suite was moved to [Events → Promote → Packages (87)](https://app.qase.io/project/SPT?suite=87), preserving all ten cases and their content. SPT-811/815/2944/4887/4889 retain seating, recurring and template variants there. Verify that the event-scoped entry retains the selected event, then use the existing cases. Mixed SPT-5132 now lives under Create and shared checks → Page save and recovery; it remains a split candidate rather than four completed proof targets.

Source: [event package page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/packages/ui/pages/EventTicketPackagesPage.web.tsx>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-812: Dashboard - Ticket Packages - Create custom package without assigned seating

**Description:**

Verify that an organizer can create a custom ticket package using non-assigned-seating child ticket type options and custom category rules.

**Preconditions:**

Organizer is logged into the Dashboard with permission to create packages. A non-assigned-seating parent/container event has an eligible one-time-charge parent ticket type. At least two child events have non-assigned-seating one-time-charge ticket types available for package options.

**Postconditions:**

The created custom package, categories, and child options are deleted or left as approved reusable test setups.

**Tags:** packages, dashboard, custom-package, organizer

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard > Ticket Packages and start creating a Custom Package. |  | The custom package wizard loads. |
| Enter the package name, select the parent event, and select the parent ticket type. |  | The parent event and parent ticket type are accepted. |
| Add a custom category and set the selection limit and quantity of tickets. |  | The category validates and can be saved after child ticket options are added. |
| Add non-assigned-seating child ticket options from eligible child events. |  | The child ticket options are accepted. Duplicate child ticket types are blocked or unavailable. |
| Save the category and finish saving the custom package. |  | The custom package saves successfully. |
| Return to the Ticket Packages list and expand the package details. |  | The package shows the expected category, selection limit, ticket quantity, and child ticket options. |

### SPT-4885: Dashboard - Ticket Packages - Manage package list, details, edit, and delete

**Description:**

Verify that an organizer can search ticket packages, inspect preset and custom package details, open edit mode, and safely delete a removable package after confirmation.

**Preconditions:**

Organizer is logged into the Dashboard with permission to manage packages. At least one preset package and one custom package exist. A separate removable test package exists with no sales or dependencies that would block deletion.

**Postconditions:**

Any edited package fields are restored. The removable test package is deleted or recreated as needed for reusable test setups.

**Tags:** packages, dashboard, organizer

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard > Ticket Packages. |  | The Ticket Packages list loads with search, package rows, detail expansion controls, Edit actions, and Delete actions when packages exist. |
| Search by part of a known package name, then clear the search. |  | The list filters to matching packages, shows an empty state for no matches if applicable, and returns to the full list when search is cleared. |
| Expand a preset package row. |  | Preset details show parent event/ticket, child events, child ticket types, child quantities, parent ratio when configured, and revenue distribution values when configured. |
| Expand a custom package row. |  | Custom package details show categories, required selections, tickets per selection, and child ticket options. |
| Open Edit for a package, make a safe change such as a temporary package name suffix, save, and return to the list. |  | The package update succeeds and the list reflects the saved change. |
| Start deleting the removable package, cancel the confirmation, then repeat and confirm deletion. |  | Cancel leaves the package in the list. Confirm delete removes the package and shows the expected success or refreshed list state. |

### SPT-4886: Dashboard - Ticket Packages - Validate invalid parent and child ticket selections

**Description:**

Verify that the package wizard prevents invalid parent or child ticket configurations and shows clear validation feedback without creating a broken package.

**Preconditions:**

Organizer is logged into the Dashboard with permission to create packages. Test events and ticket types exist for the InvalidPackageRule parameter, including duplicate child candidates, a child ticket with minimum purchase limit, a child ticket using payment plans, incompatible-fee events, a parent ticket already used by another package, and a parent ticket type with sales.

**Postconditions:**

Temporary invalid test setups and any partially created packages are removed. Existing ticket type limits, payment plans, fee structures, and sales test setups are restored if modified.

**Tags:** packages, dashboard, validation

**Parameters:**

InvalidPackageRule: DuplicateChildTicket, ChildIsParentTicket, MinimumPurchaseLimitChild, PaymentPlanChild, IncompatibleFeeStructure, MissingChildTicket, ParentAlreadyUsed, ParentHasSales

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard > Ticket Packages and start creating the package type required for the InvalidPackageRule parameter. |  | The package wizard loads. |
| Configure the parent event and parent ticket type required for the InvalidPackageRule under test. |  | Valid parent selections are accepted; invalid parent selections are blocked or produce a clear validation message. |
| Attempt the invalid child or package configuration for the parameter value under test. |  | The UI blocks the invalid selection, disables the option, or the save attempt returns a clear validation error. A package is not created with invalid child data. |
| Correct the invalid selection using an eligible parent/child ticket type and save the package if the rule allows recovery. |  | After correction, the package can be saved and the previous validation error no longer appears. |
| Return to the package list and search for the attempted invalid package name. |  | Only successfully saved valid packages appear; failed invalid attempts do not create duplicate or partial package records. |

### SPT-4888: Dashboard - Ticket Packages - Configure package barcode, redeem-all, revenue, and reverse-ratio settings

**Description:**

Verify that package-specific settings can be configured where supported and invalid setting combinations are rejected.

**Preconditions:**

Organizer is logged into the Dashboard with permission to manage packages. Preset package test setups exist for the PackageSettingScenario under test. Venue settings allow the relevant setting to be visible when applicable, including child revenue realization for child revenue distribution and reverse-ratio support for reverse-ratio scenarios.

**Postconditions:**

Package settings and any venue settings changed for the test are restored to their original values. Temporary packages are deleted or marked as reusable test setups.

**Tags:** packages, dashboard, validation

**Parameters:**

PackageSettingScenario: SendSingleBarcode, AllItemsRedeemable, ParentBarcodeRedeemAllConflict, ChildRevenueDistribution, ReverseParentRatio

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open or create the preset package needed for the PackageSettingScenario parameter. |  | The package wizard or edit page loads with the relevant package settings visible for the scenario. |
| Configure the selected setting scenario, such as Send Single Barcode, Allow redemption on all items, child revenue distribution method, or reverse parent ratio. |  | Supported settings accept valid values and show any explanatory tooltip, disabled state, or warning text that applies. |
| For ParentBarcodeRedeemAllConflict, enable both Send Single Barcode and Allow redemption on all items, then attempt to save. |  | The package is not saved with both settings enabled and a clear validation error is shown. |
| For ChildRevenueDistribution, save a package with a valid child distribution method when child revenue realization is enabled. |  | The package saves and the selected distribution method is displayed in package details. |
| For ReverseParentRatio, set a valid reverse ratio greater than 1 for an eligible child ticket and save. |  | The package saves and the package details show the parent ratio. Invalid reverse-ratio values remain covered by existing admin validation cases. |

