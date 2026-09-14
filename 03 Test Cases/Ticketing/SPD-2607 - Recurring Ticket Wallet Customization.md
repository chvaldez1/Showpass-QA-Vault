---
title: SPD-2607 - Recurring Ticket Wallet Customization
tags:
  - qa/recurring-events
  - qa/digital-wallet
status: draft-awaiting-prepared-orders
---

# SPD-2607 - Recurring Ticket Wallet Customization

## What a client can test

**A client can check the design on their dated ticket in Apple Wallet. Showpass must first prepare the series design change.** No organizer-facing action for changing this exact ticket-option assignment was found in the inspected source. Do not give the client internal admin instructions or claim that the dashboard wallet editor directly reproduces this commit.

In plain language: if Showpass changes the ticket design for a repeating event, the tickets for its individual dates should use the new design. A date given its own design should keep it. Removing a ticket-option design should allow the event's normal design to appear again.

A **recurring event** repeats on several dates. A **ticket type** is an option such as General Admission. A **wallet pass** is the ticket saved in Apple Wallet or Google Wallet.

This note replaces the previous admin-oriented manual cases with one customer workflow and four clearly defined test-data versions. The assignment, preservation, removal, and forced-update proof targets remain accounted for below. No Qase reads or writes were performed.

## Testing Intent

We are testing whether a customer can save a ticket for the correct event date with the intended wallet design after Showpass changes the series ticket design; we will prove this with the actual saved pass and its event, date, and General Admission label.

| Field | Scope |
| --- | --- |
| Criticality bucket | Ticket presentation, with fulfillment/access regression checks. |
| Business invariant | Each dated ticket uses its intended design and retains its event/date identity. |
| User impact / failure | Customer receives an outdated design or loses a date-specific design. |
| Observable proof | Saved Apple Wallet pass matches the supplied reference image and order details. |
| Source of truth | Exact backend commit plus current client order/wallet components. |
| Primary surface | Customer My Orders in Safari on iPhone, then Apple Wallet. |
| In scope | First assignment, replacement, date-specific design preservation, removal/fallback. |
| Out of scope | Full checkout/payment regression; changing a logo inside an existing design; automatic updates to already-downloaded passes. |
| Confidence | High for backend assignment rules; client execution and prepared data are unverified. |

## Recommended Test Data — Showpass preparation

**Preparation owner: internal Showpass QA/developer. These are not client steps.** Data has not been created. The case remains blocked until the customer receives the order numbers, exact dates, and reference images below.

For each scenario, prepare a separate QA-only recurring series named **QA Wallet Series — [scenario name]**, with two future dates and General Admission tickets. Use standard barcode tickets, not NFC tickets, bundles, memberships, or a branded custom-wallet app. Use a QA-only organization with no real customer sales. Configure the dated events to have a clearly distinguishable grey default wallet design, with no strip/artwork image obscuring its background.

Prepare complete wallet designs with blue, green, and orange backgrounds and readable text. Supply an Apple Wallet reference image for each, including the grey fallback. Do not change the contents of an existing design during this regression: change which design is assigned.

| Scenario | Internal preparation before tickets are issued | Expected first date | Expected second date |
| --- | --- | --- | --- |
| FirstDesign | Both dated ticket options already exist with no assigned design. Assign the blue design to the series ticket option and save normally. | Blue | Blue |
| ReplaceDesign | Series and both dated options start with blue. Change the series assignment to green and save normally. | Green | Green |
| KeepDateDesign | Series and first date start with blue; second date has its own orange design. Change the series assignment to green and save normally. | Green | Orange |
| RemoveDesign | Series and first date start with green; second date has orange. Clear the series ticket-option assignment and save normally. | Grey event design | Orange |

After the series save, create two completed QA-only orders for the customer: one General Admission ticket for each date, **one ticket per order**, with digital ticket delivery available. Do not repair the dated ticket assignments manually after saving the series; that would bypass the behavior under test. Use fresh tickets that have never been downloaded to a wallet to avoid confusing assignment propagation with cached-pass updates.

Give the customer: test-site address, a customer account containing the orders, scenario name, both order numbers, both exact event dates/times, and the two expected reference images. Confirm that the environment contains commit 6658fa2 and can issue Apple Wallet passes. Preserve internal before/after assignment evidence separately from the customer screenshots.

## Qase-ready Manual Test Cases

### TC-1: My Orders - Recurring Events - Save dated tickets with the expected wallet design

**Description:** Verify that the customer can save both dated General Admission tickets to Apple Wallet and see the expected design after the series design has been assigned, replaced, or removed. The KeepDateDesign version also verifies that a date's own design remains visible. Showpass must prepare the selected scenario before the customer starts; the customer does not change event settings.

| Platform | View |
| --- | --- |
| WebPublic | Mobile |

**Tags:** my-orders, tickets, appearance

**Parameters:**

DesignScenario: FirstDesign, ReplaceDesign, KeepDateDesign, RemoveDesign

**Preconditions:**

* The customer uses Safari on an iPhone with Apple Wallet available.
* The customer is signed into the supplied customer account on the supplied test site.
* Showpass has supplied the selected scenario's two completed order numbers, exact dates/times, and expected wallet images from the preparation table.
* Each order contains exactly one General Admission ticket for its specified date of QA Wallet Series — [scenario name].
* Neither ticket has previously been added to Apple Wallet.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open **My Orders** from the account menu. | Supplied customer account | The two supplied orders are listed. |
| Open the order for the first date using **View order**. | First supplied order number | The page shows General Admission for the supplied first date. |
| Select **Add to Apple Wallet** beneath the ticket. | First date's ticket | Apple Wallet opens a preview of that ticket. |
| Select **Add** in Apple Wallet. | Previewed ticket | The ticket is saved to Apple Wallet. |
| Open the saved ticket in Apple Wallet. | First date's saved ticket | Its background/design matches the supplied first-date reference image. |
| Open the saved ticket's details. | Supplied first date/time and General Admission | Its event, date/time, and ticket option match the first order. |
| Return to the test site in Safari and open **My Orders**. | Same customer account | The orders are available again. |
| Open the order for the second date using **View order**. | Second supplied order number | The page shows General Admission for the supplied second date. |
| Select **Add to Apple Wallet** beneath the ticket. | Second date's ticket | Apple Wallet opens a preview of that ticket. |
| Select **Add** in Apple Wallet. | Previewed ticket | The ticket is saved to Apple Wallet. |
| Open the saved ticket in Apple Wallet. | Second date's saved ticket | Its background/design matches the supplied second-date reference image. |
| Open the saved ticket's details. | Supplied second date/time and General Admission | Its event, date/time, and ticket option match the second order. |

**Postconditions:**

* Keep the two QA-only tickets saved until screenshots have been recorded and the result reviewed.
* Record the selected scenario, order numbers, phone/iOS version, expected designs, actual designs, and screenshots of both passes with their dates.
* After review, remove only these two QA-only passes from Apple Wallet; leave the Showpass orders intact for internal follow-up.
* No event configuration, purchase, cancellation, or refund is performed by the customer in this case.

**Data safety:** Adds test tickets to the customer's wallet; does not change event settings. Internal preparation changes test data.

## Minimum Execution Set and Proof Target Map

Run TC-1 once for each DesignScenario with separately prepared orders. The actions and result checks are identical, so separate copies of the case are unnecessary.

| Proof target | Coverage |
| --- | --- |
| Clean initial design assignment reaches both existing dates | TC-1 / FirstDesign |
| A replacement design reaches both matching dates | TC-1 / ReplaceDesign |
| A date's own design is retained | TC-1 / KeepDateDesign |
| Removal uses the event's default design and preserves a date's own design | TC-1 / RemoveDesign |
| Pass saves successfully and retains the ordered event/date | Every TC-1 version |

## Entry Points, Outcomes, and Coverage Ledger

| Item | Status | Evidence / limit |
| --- | --- | --- |
| Organizer directly changes ticket-option wallet assignment | Blocked | No client-facing writer found for this field; do not invent a dashboard dropdown. |
| Customer My Orders → individual Apple Wallet ticket → save/open | Manual-only; setup blocked | TC-1 defines clean success and final saved-pass proof; no execution. |
| Checkout confirmation → View order / Add to digital wallet | Deferred entry regression | Source leads to the same order page; current case starts with completed orders. |
| Google Wallet from customer order page | Deferred device/provider coverage | Client control exists. Needs separately prepared Google reference images and provider-state verification; an Apple result does not prove Google. |
| Widget, Web Box Office, Electron, Mobile Box Office sales | Deferred sale-origin regression | Issued tickets consume shared ticket-type state; no sale code changes in this commit. Current order-based case does not claim those sales were exercised. |
| React Native/webview wallet handoff | Deferred | Shared web component has native handoffs; no device execution. |
| Forced replacement of a date-specific design | Deferred to backend test | No normal client action found. Added forced-inheritance model test covers assignment contract when executed. |
| Child-owned event/inventory/parent relations stay unchanged | Deferred to backend test | Added structural-foreign-key test; customer pass identity is only partial evidence. |
| Patron option/type, pay-what-you-can, waitlist; scalar/list fields and price-lock guards | Deferred shared-loop regression | Same propagation loop; needs focused backend regression data/tests. |
| Template-only child selection; reserved-count background refresh | Deferred | Unchanged surrounding behavior, not proved by wallet appearance. |
| Permission/cross-organization boundaries | Deferred regression | Unchanged permission code; use one QA-only organization/account. |
| Cancel wallet preview; retry after provider error; existing downloaded passes update | Deferred | Distinct wallet/provider lifecycle evidence required. |
| Payment callbacks, refund flows, new field validation boundaries | Not applicable to exact diff | No payment/validation controls were added or changed. |

## Source-backed Behavior and Risk Areas

The exact commit changes `TicketType._propagate_to_children`, not a dashboard wallet form. It converts approved foreign-key changes to their stored-ID attributes and skips child-owned structural relations. Normal propagation compares each child's old assignment with the parent's old assignment. The force flag permits replacement when that parent field changes. Five tests were added for initial assignment, preserved overrides, forced overrides, clearing, and structural ownership.

The ticket serializer has `propagate_to_children` but does not expose `digital_wallet_customization`. The dashboard design-assignment registry has event/organization and other targets but no ticket-type target. Editing a design's colours is a separate save flow and could give a false pass for this commit.

Wallet customization resolves from the dated ticket option, then its event, then its organization. A missing ticket-option assignment therefore requires a known event fallback for a meaningful visible expectation. A correct-looking pass alone cannot prove the change was propagated: internal preparation must preserve evidence that only the series assignment was changed.

## Suggested Automated Coverage

* Run the commit's five added `TicketTypeTestCase` tests and focused shared recurring-propagation regressions; none were run here.
* Reuse Playwright `pages/user/account/my-orders/MyOrdersPage.ts` and `pages/shared/components/OrderSummaryActions.ts` for order identity and order-page entry. Existing helpers opening the wallet page do not prove saved-pass appearance.
* Keep native Apple/Google wallet save and visual checks manual unless device automation provides equivalent evidence. Include final saved-state proof and cleanup.

## Assumptions and Unknowns / Open Questions

* No current test-site version, prepared orders, customer account, reference images, or provider-enabled device were supplied or verified. TC-1 is a draft until that preparation is complete.
* Is there another deployed organizer control, absent from the inspected source, that assigns designs specifically to ticket options? Until shown, do not claim a client can trigger this exact fix.
* Internal forced-update and structural-ownership results are still needed for commit-level coverage.
* No live defects are confirmed, no cases have been executed, and no release-ready claim is made. A client can follow the customer steps after preparation; a fully self-service organizer reproduction remains unsupported by the inspected evidence.

## Sources Reviewed

- [[01 Repositories/Backend - web-app]]; [[00 Start Here/World-Class Software Quality Standard]].
- Backend checkout was clean on `develop`; commit is an ancestor of checked-out HEAD. Exact scope compared `59923e8249db90e3f31b1aad352b6d2ac926e225` → `6658fa2ff00fa95af0a060ca1b5c84104a701455` (one-parent commit despite the merge wording). Two files changed. PR identity comes from the local commit message; remote PR discussion was not read.
- `web-app/apps/tickets/models/event_management/event_ticket_types.py`: `save`, `_propagate_to_children`; exact commit inspected.
- `web-app/apps/tickets/tests/test_models.py`: five new recurring-wallet/structural-relation tests; read, not run.
- `web-app/apps/tickets/admin/admin.py`: `TicketTypeAdmin`, `TicketTypeAdminForm`; exact commit and current checkout inspected.
- `web-app/apps/tickets/api/venue_based/serializers/serializers.py`: ticket serializer field list and `propagate_to_children`; exact commit/current checkout inspected.
- Current `web-app/apps/venues/services/config_assignment/base.py`, `digital_wallet_customization.py`, and `save_digital_wallet_customization.py`: dashboard target mapping and separate design-edit save flow.
- Current `web-app/apps/core/digital_wallet_customization/hierarchy_loader.py`: ticket type → event → venue fallback.
- Current `showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/branding/digital-wallets/` and public checkout `AddToDigitalWalletButton`: client entry evidence. Frontend checkout was clean on `develop`; live deployment may differ.

Repository paths: `/Users/christianvaldez/Documents/Showpass/repos/web-app` and `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`.

Additional client/automation sources reviewed for this revision:

- `showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/MyOrdersInvoiceItems.web.tsx`: individual ticket wallet links; one-ticket orders avoid the multi-ticket selection modal.
- Same feature: `InvoiceSaveToWalletButtons.web.tsx`, `InvoiceSaveToWalletModal.web.tsx`, `AccountPurchaseItemActions.web.tsx`: Safari/Apple support, wallet actions, and View order.
- `showpass-playwright/pages/user/account/my-orders/MyOrdersPage.ts`; `pages/shared/components/OrderSummaryActions.ts`: existing order-page automation patterns, not wallet-device proof.
- [[06 Prompts/Example - Generate Test Cases]], [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]].
