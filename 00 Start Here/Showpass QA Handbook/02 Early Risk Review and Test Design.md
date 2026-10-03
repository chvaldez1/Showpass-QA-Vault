---
title: Early Risk Review and Test Design
date: 2026-10-01
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Early Risk Review and Test Design

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Catch risk before implementation

### The pre-development risk conversation

Before building or accepting a change, QA, product, and engineering should answer these questions in the feature's existing note:

| Question | Concrete answer needed | Early warning |
| --- | --- | --- |
| What changes for the actor? | One plain-language before/after example | “Refactor only” despite shared pricing, auth, or purchase code changes |
| Which business promise must remain true? | Named outcome and independent expected result | No one can explain correct earnings or ticket ownership |
| Who else calls this behavior? | Backend API/job consumers and client list | Only changed frontend files considered |
| What is committed before the next step can fail? | Payment, saved order, issued items, callbacks, delivery boundaries | “It is all one transaction” used to describe provider plus database plus jobs |
| What happens to existing records? | Old baskets, old orders, historical gateway, saved settings, legacy packages | Only newly created data tested |
| What happens twice or late? | Duplicate submission, retry, callback, resume, delayed fulfillment | “Worker retry will fix it” without duplicate protection |
| Can we observe and recover it? | Correlated references, missing-recipient report, safe recovery owner | Only task success/HTTP status available |
| Can we test it safely? | Named data owner, payment environment, stock ownership, cleanup method | Shared sales data or live money needed without approval |
| Which platform needs real equipment? | Supported build/OS/payment SDK/hardware and assigned tester | “Mobile QA is not available” silently removes the client |

If correct behavior is unresolved, record a Product-expectation question. QA should not invent refund policy, fee taxability, installment access rules, or the supported-device contract.

### Trace the exact change

1. For a branch/PR, verify the intended base and exact diff. For Jira-only planning, follow the vault's no-diff workflow unless branch analysis is requested.
2. Start in backend models, validation, permissions, calculation, purchase/refund services, and jobs. Repository system documents are navigation aids; verify the changed rule in code.
3. Trace frontend callers, flags, saved settings, customer/venue context, and handoffs. Include unchanged clients calling changed shared behavior.
4. Inspect relevant existing backend tests and Playwright assertions. A test title or file presence does not establish the outcome it protects.
5. Record exact source revision, deployed build when known, flags, configuration, expected behavior, evidence gap, and selected playbooks.
6. Define proof targets and the expected result **before** executing. Do not copy the current UI total as the financial oracle.

### Common hidden coupling to challenge

- Saved fee configuration → existing basket price → provider charge → saved item allocation → refund → report/settlement.
- Package relationship → included items → inventory → barcode generation → printing → scan counts → refund descendants.
- Membership lifecycle → member-specific benefits → generated event tickets → seat permissions → revenue allocation.
- Gateway change → new purchases versus existing provider-owned payments, refunds, and installments.
- New frontend screen → shared backend permissions → old web client, mobile, widget, and Electron.
- Successful job → every eligible recipient processed → delivery/stock/earnings correct → safe rerun.

### Make ownership explicit

Assign people for the specific change; the following responsibilities do not assume a dedicated mobile tester or finance tester exists.

| Responsibility | Accountable work |
| --- | --- |
| Product/business-rule owner | Resolve correct fees, refunds, access, eligibility, supported devices, and acceptable residual business harm. |
| Implementing engineer | Explain changed rules/consumers, prove backend transitions, provide safe fault/time control and observable results. |
| QA owner | Select proof targets and risk combinations, execute/challenge user workflows, maintain evidence and uncovered risks. |
| Automation owner | Map existing assertions, add stable regressions at the right layer, report what CI does not prove. |
| Device-test owner | Obtain the affected build/equipment and execute recorded physical-device combinations, even if this is a shared responsibility. |
| Release/operational decision owner | Accept or reject named residual risks; own rollout observation and safe reconciliation/recovery. |

Missing ownership is a risk to resolve before the relevant release gate. “Someone will test it Friday” is not an assigned check.

## Build two lists: entry points and outcomes

### Entry points

The Critical Business E2E document identifies public web, legacy and Next Web Box Office, Electron, embedded/modal/WordPress widgets, public mobile app including webviews, POS, and kiosk. Treat these as the starting inventory, not proof that every combination is supported or already automated.

For the changed behavior, record which clients actually call it and which starting states differ:

- Guest versus signed-in customer; new versus existing Box Office customer.
- Empty basket versus previously selected items; parent and child added together versus sequentially.
- Fresh checkout versus persisted basket; reopen versus uninterrupted session.
- Different venue, lowest permitted employee, saved device setting, enabled/disabled flag.
- Public page versus embedded host versus webview versus desktop app.

Do not assume old/new Box Office, widgets, or mobile are equivalent because they share a component.

### Outcomes

Declare separately: clean success, rejected input, permission denial, cancellation, abandonment/expiry, provider decline, additional authentication, uncertain payment result, delayed completion, retry, duplicate delivery, and recovery. Select only supported controls per client; unsupported combinations are Not applicable with source evidence.

### Use risk combinations instead of every permutation

| Trigger | Must-consider combination | Why one ordinary purchase misses it |
| --- | --- | --- |
| Package fee change | Ticket + product, quantity greater than one, absorbed fee, discount, real pricing mode | Fee applicability can depend on child relationship and allocation |
| Shared purchase change | Existing basket, provider success followed by delayed order/fulfillment, same-sale retry | Financial side effect may survive a later failure |
| Seat change | Two independent buyers, release/expiry, membership-owned seat | Sellability and ownership are separate records |
| Membership batch change | Mixed eligible/ineligible recipients, partial failure, resume | One recipient success hides omissions |
| Credit change | Lowest permitted employee, exhausted balance, eligible and ineligible event | Configuration and redemption are different boundaries |
| Mobile payment change | Persisted toggle, reopen/background, hardware disconnected and reconnected | Native startup and payment SDK are not browser behavior |
| Calendar change | Venue versus customer timezone, cutoff boundary, recurring child date | Parent visibility does not prove the child is purchasable |
| Migration or flag | Old/new path, supported off state, historical records | Fresh enabled data hides backward-compatibility defects |

For each chosen combination, state why it changes behavior. For each excluded combination, state why it is equivalent, unsupported, lower risk, or deferred. Do not silently omit it.
