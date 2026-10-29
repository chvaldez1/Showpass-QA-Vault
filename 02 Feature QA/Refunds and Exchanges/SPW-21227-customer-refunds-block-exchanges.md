---
title: SPW-21227 - Customer refunds hide exchanges
date: 2026-10-28
reported: 2026-10-27
status: source-confirmed-condition-browser-not-reproduced
jira: SPW-21227
tags:
  - qa/investigation
  - exchanges
  - refunds
---

# Customer refunds hide exchanges

The revised description was published to existing [SPW-21227](https://showpass.atlassian.net/browse/SPW-21227) on **2026-10-28** after the user requested the update. Full description readback matched the intended text. Summary, status (**On Deck**), priority (**Major**), assignee, labels, and components were preserved. No new issue was created and no browser actions or exchanges were executed. The details below retain the supporting local investigation.

The customer-side blocking condition is confirmed in current frontend source and the supplied order response. Web Box Office also reportedly gives a server error during an exchange, but its error response and cause have not been verified. Keep that report separate from the confirmed frontend condition until evidence connects them.

## Published QA description

**GIVEN**

* Venue-level feature flag `enable_venue_policy_customer_self_refunds` is enabled for the organization.
* In **Admin → Venues → Venues → the organization**, **Customer Self Refund Settings** is checked (`enable_automated_returns = true`).
* The Venue has **Exchanges** enabled and **Exchange tickets visibility type = Box Office + Public**.
* The customer owns a paid, unrefunded ticket order with no payment plan.

**WHEN**

The customer opens **Account → My Orders → the order’s options**.

**THEN — observed**

**Exchange items** is not displayed.

**Expected**

Enabling customer refunds should not remove **Exchange items** from an otherwise exchange-eligible order. Product confirmation of whether both options should be available is still needed.

**Web Box Office**

I also saw a server error when I tried to exchange through **Web Box Office**. I haven't confirmed whether it is related to the missing **Exchange items** option.

**Environment**

* **Beta**. Customer issue reported October 27; Web Box Office error reported October 28, 2026.
* Supplied order response: Venue **2241 — MEGACON Orlando**, order **837081**.

## Internal investigation retained from the earlier expanded draft

The source checks and detailed configuration below are internal investigation notes, not the current Jira description. The shorter QA description above was saved and readback verified on 2026-10-28. No new browser tests were run.

### BUG-01 — Customer self-refund setup removes customer exchange access

**Earlier expanded wording — superseded in Jira; supporting evidence retained locally.**

**Title:** fix (customer exchanges) | Enabling customer self-refunds hides Exchange items

**GIVEN**

* The customer is signed into the account that bought the order.
* The organization has Exchanges enabled and allows public exchanges.
* The order contains paid, unscanned tickets, has no payment plan or previous refund, and has positive value available for exchange.
* The event is still outside its exchange deadline. The supplied example starts more than 24 hours in the future and inherits the organization's 24-hour cutoff.
* The following configuration applies to the same organization and event:

| Scope | Kind | Exact flag or setting | Required or recorded state | Where to find it |
| --- | --- | --- | --- | --- |
| Venue / organization | Feature flag | `enable_venue_policy_customer_self_refunds` | **Active for the selected Venue** for the new customer-refund setup. Target the Venue, not a customer or employee. This provides rollout context; it is not the direct Exchange-button check. | Admin → Feature Flags → find the flag → selected Venue included and not excluded. |
| Venue / organization | Module | **Exchanges** (`modules_enabled` includes `7`) | **On**. Confirmed in the supplied order response. | Admin → Venues → Venues → selected organization → Modules enabled. |
| Venue / organization | Saved setting | **Exchange tickets visibility type** (`exchange_tickets_visibility_type`) | **Box Office + Public** (`box_office_and_public`). Confirmed in the supplied response. | Same Venue Admin record. |
| Venue / organization | Saved setting — direct trigger | **Customer Self Refund Settings** (`enable_automated_returns`; older label: **Enable automated returns**) | **On**. Confirmed in the supplied response. The current customer UI requires this to be off to show Exchange items. | Admin → Venues → Venues → selected organization. |
| Venue / organization | Saved setting | **Exchange tickets purchase date limit** (`exchange_tickets_purchase_date_limit`) | **Blank** in the supplied response, so purchase date does not block this order. | Same Venue Admin record. |
| Venue / organization | Saved setting | **Exchange tickets event start limit** (`exchange_tickets_event_start_limit`) | **24 hours** in the supplied response; use an event starting later than that cutoff. | Same Venue Admin record. |
| Event | Saved override, not a feature flag | **Exchange cutoff override** (`exchange_tickets_event_start_limit`) | **Blank** in the supplied event data; inherits the Venue's 24-hour cutoff. | Dashboard → Build → Events → All events → Edit the event → Advanced. |
| Ticket type / product | Customer-refund setting, not an exchange flag | **Allow customer-initiated refunds** (`customer_refund_enabled`) | **No required value for this visibility failure. Leave unchanged.** The Exchange-button checks do not read these switches. | Ticket type → Basic info → Customer refunds; product → Fulfillment. |
| Venue policy record | Saved policy switch, not the Admin trigger | **Enable customer refund policy** (`is_enabled`) | **No required value for this visibility failure. Leave unchanged.** Turning this policy switch off does not clear the Venue's `enable_automated_returns` value. The policy record is not included in the supplied JSON. | Organization → Organization settings → Customer refunds, or Admin → Venues → Venue customer refund policies. |

No additional event-scoped, ticket-scoped, product-scoped, or customer-scoped feature flag was identified in the customer Exchange-button condition. **Allow free return** is a separate Venue setting and does not control this button.

**WHEN**

1. With **Customer Self Refund Settings = on** saved on the Venue, the customer opens **Account → My Orders**.
2. The customer opens the paid order's options.

**THEN — observed:**

**Exchange items** is missing. The frontend hides the action because the Venue's Customer Self Refund Settings is on. That condition does not check whether this particular order can actually be returned by the customer.

The missing action was reported by the customer-side QA session. The supplied order response and frontend condition explain the missing button; the agent has not independently reproduced it in a browser.

**Expected:**

An order that satisfies the exchange rules should retain **Exchange items** when customer self-refunds are enabled. Refund and exchange eligibility should be checked separately. This is the expected result already recorded in SPW-21227; Product approval of allowing both workflows together has not been independently established. The code confirms the restriction, not whether that restriction is approved.

**Additional reported symptom — Web Box Office:**

The employee also reports a **server error when attempting an exchange in Web Box Office**. The client is confirmed by the employee as Web. The exact message, HTTP status, failed action, original order used, replacement selection, and request/response are not yet supplied. Do not describe this as a confirmed HTTP 500 or assume the customer-side visibility check caused it. No successful exchange or unchanged financial state has been independently verified after that failure.

**Impact:**

Customers lose self-service exchange access when the organization enables customer self-refunds. The reported Web Box Office failure may also prevent an employee from completing the exchange; that additional impact still needs the failed response and final order state checked.

**Page:**

* Customer: beta Showpass → Account → My Orders → affected order options. No exact tested order-page URL was supplied.
* Configuration context: [Customer refunds](https://beta.showpass.com/manage/organization/settings/customer-refunds/).
* Web Box Office: reported by the employee; exact page URL not supplied.

**Tested on:**

* Customer missing-action report and supplied response: **beta**, discussed **2026-10-27**, America/Edmonton. Exact browser observation time and deployed build are unknown.
* Web Box Office server-error report: **2026-10-28**, America/Edmonton. Exact time and deployed build are unknown.
* Source and draft rechecked **2026-10-28**. No new browser test was run.

**Evidence:**

* User-supplied response: [del.json](/Users/christianvaldez/Downloads/tmp/del.json). It contains Venue `2241` (**MEGACON Orlando**), order `837081`, and event `649249` (**MEGACON Orlando 2027**). It contains two 40.00 **FRIDAY ADULT - Single Day Pass** tickets, a 94.60 paid order, no prior refund or credit issued, and no payment plan. No customer identity, address, or barcode is copied into this note.
* `venue.enable_automated_returns = true`; Exchanges module `7` is enabled; exchange visibility is `box_office_and_public`; purchase-date limit is unset. The venue cutoff is 24 hours, and the event override is unset. These are saved-response values, not a new live read.
* [Customer order action](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/user/features/account/features/my-orders/ui/components/OrderOptionsList.web.tsx:382): Exchange items requires `!returnsEnabled`.
* [Shared exchange eligibility](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/financials/domain/invoice/exchange/specifications.ts:45) and [Venue check](/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/financials/domain/invoice/core/queries.ts:36): exchange eligibility separately requires automated returns to be disabled.
* [Admin label](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/admin/venue_admin.py:115): under the Venue rollout, `enable_automated_returns` is displayed as Customer Self Refund Settings.
* Backend Venue settings: `apps/venues/models/venue_management/venue.py`; exchange choices: `apps/venues/constants/venue_settings.py`; rollout targeting: `apps/venues/utils.py`. Frontend event override: `packages/core/src/app-contexts/dashboard/features/events/advanced/hooks/useEventAdvancedFormFields.ts`.
* Existing Jira was read and matched this customer-side symptom. Its current description does not establish a cause for the Web Box Office error.

**Verification limit:**

High confidence in the customer frontend blocking condition. The agent has not run an off/on browser comparison, confirmed the deployed revision, completed an exchange, or reproduced the Web Box Office error. The supplied JSON does not include the feature-flag targeting, policy record, or individual customer-refund switches; do not mark those as response-verified. The original claim about hiding Exchange even for a non-returnable order follows from the unconditional code check; that particular order state was not proven by this response. No branch comparison or changed-file discovery was performed.

**Data safety and cleanup:**

**No business-data change** during this investigation: existing local files, source, and Jira were read, and the user-authorized Jira description update was saved and verified. No Venue, event, ticket, product, order, credit, or exchange was changed. The original and final business-record state were not re-read live. Preserve the supplied JSON and original sale. The Web Box Office failure's possible financial effects remain unknown; do not repeat a financial submission solely to collect an error before the existing attempt's outcome is understood.

## Investigation classification

| Field | Assessment |
| --- | --- |
| Known issue | SPW-21227; its description was updated and readback verified 2026-10-28. No duplicate was created. |
| Affected proof | Customer retains access to an otherwise eligible exchange after customer-refund enablement. |
| Severity / impact | Existing Jira priority is Major. Customer exchange access is blocked for Venues with the Admin setting on. Web Box Office impact remains reported. |
| Confidence | Source-confirmed customer blocking condition; deployed end-to-end behavior and Web Box Office cause remain unverified. |
| Release decision | Open exchange-access finding; not a verified pass or a proven code-change regression. Product's intended coexistence rule and runtime checks remain required before closing it. |
| Supporting revisions | Backend `f269a96717cb659a2e8b1760c2deea0350421d7f`; frontend `427c676c53be0b584ded080e7fa56627397d8b99`, local HEADs read 2026-10-28. |

## One remaining evidence request

**No data change:** use the error already obtained from the Web Box Office attempt and provide its exact visible message or saved failed response. Do not submit another exchange just to reproduce the error. That response is needed to identify whether it belongs to this issue or a separate failure; it does not block using the revised customer-side draft.

Related feature: [[03 Test Cases/Refunds and Protection/SPW-19666-customer-self-refunds-test-cases|Customer refunds handbook]].
