---
title: Senior QA Integration Passes
date: 2026-10-03
tags:
  - qa/system-handbook
  - qa/integration
status: Test-design guidance; not executed results
---

# Senior QA Integration Passes

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Choose Venue and scenario]] · [[00 Start Here/World-Class Software Quality Standard|Canonical standard]]

Use these after selecting a product walkthrough. They add the rigor needed for a multi-client commerce system: explicit contracts, independent expectations, ownership boundaries, controlled failures, repeatable data, and measurable completion. They are not a claim about a particular company's internal QA practices.

“10x” here means finding an omitted business outcome or risky interaction early and putting durable protection around it. It does not mean running every possible combination, treating all urgency as Critical, or replacing human judgment with a green suite.

## 1. Test the promise across every handoff

Before creating the test Event/Product/Package/Membership, write a small expected-result list.

| Actor or boundary | Concrete Showpass question | Proof to keep |
| --- | --- | --- |
| Organizer configuration | What exactly is being promised, to whom, on which date, with what price/fee and delivery rule? | Saved configuration after reopening, not an unsaved editor |
| Customer selection | Did checkout retain the exact item, child Event, variant, seat, quantity, benefit, and recipient? | Selection and independent expected charge |
| Payment | Did the intended method/account produce the actual final payment outcome once? | Approved test-provider/payment reference and final status |
| Order | Is there exactly one corresponding saved sale? | Original order/Transaction reference |
| Fulfillment | Did every intended Customer/Member receive every promised item? | Exact expected identities and quantities compared with actual issued items |
| Attendee or pickup | Can the recipient actually use the right admission/item? | Real Check In or pickup result, not only lookup |
| Post-purchase | Did the selected adjustment affect only its intended items and money? | Old/new validity, cash/credit, Inventory, adjustment reference |
| Organizer accounting | Can the final result be explained in the relevant report/earnings definition? | Actual file/records reconciled with the known sale and adjustments |

Example: an Organizer creates a Membership Level promising one ticket to each of two Events. The Customer buys one Membership. “One membership exists” is an intermediate check. The final expectation is the correct Member plus one eligible issued ticket for Event A and one for Event B, correct recipient, no duplicate issuance, and usable admission under each Event's rules.

If a promise or policy is unknown, name it precisely and resolve it before claiming a pass. Do not silently invent Refund restocking, transfer validity, or installment admission policy.

### Discover how Customers actually buy

Before inventing a launch matrix, study the Organizer's real offering and approved evidence from a comparable sale: aggregate item combinations and quantities, delivery choices and geography, guest/account mix, entry clients, incomplete checkout stages, support incidents, post-purchase information completion, and adjustment requests. Ask the Organizer/support team what Customers try to do that the basic journey misses. Do not access production analytics or Customer records without authorization; use anonymized aggregates or a supplied sample. Record evidence period, sample limits, and what is still a hypothesis.

Separate two uses of analytics: **existing aggregate behavior helps choose scenarios**; **a new test purchase must produce the expected tracking outcome** where enabled. Neither proves the other. A frequent journey deserves representative coverage; a rare journey that can lose significant money or admission still deserves explicit protection.

For a comic-con launch, consider these hypotheses—not claims about Calgary's saved setup:

| Customer intention | Concrete test design | Handoffs to verify |
| --- | --- | --- |
| Buy VIP Packages for two different Attendees | Select two Packages; choose different merch sizes where offered; supply different Attendee answers | Both Package compositions, fee allocation, stock by variant, answers per person, all promised admission/pickup |
| Ship items somewhere other than billing address | Use a valid allowed destination and a different controlled billing address; separately try a blocked destination then correct it | Address policy, shipping/tax recalculation, retained selection, correct saved recipient and fulfillment queue |
| Decide between ticket combinations | Try the actual supported multi-day/single-day/add-on alternatives, then remove/change quantity before paying | Correct eligibility, repricing, released reservations and final order; no unsupported mixed basket assumed |
| Buy now and complete information later | Guest purchase, leave the deferred information stage, then return through receipt/My Orders | One purchase, recoverable access, honest incomplete state, saved answers and Employee visibility |
| Return for the general on-sale | Keep the VIP order and account from the earlier phase; buy an allowed general-sale item | Original VIP rights unchanged, correct second sale, phase eligibility, stock and attribution |

Bind each hypothesis to supported catalog relationships and current backend rules. Do not make every test a cart containing all possible features; incompatible combinations should be tested for clear rejection, not forced to purchase.

### Design scenario charters, not one giant linear script

A charter is a short statement of the Customer's goal and the outcomes the tester must prove. Keep each charter in the canonical run note with:

- Customer/Attendee identities, client, starting phase and saved configuration.
- Exact basket and independent expected amounts/items/recipients.
- Choices to explore: quantities/variants, address correction, back/edit, account transition or deferred answers.
- Required applicable outcomes from [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the purchase completion checklist]].
- A separate order for the selected fulfillment/admission or Refund/Void/Exchange branch, plus an untouched control.
- Evidence, completion deadline, cleanup and explicit coverage gaps.

Run a clean control, then combine deliberately chosen risks. For example, two VIP Packages + different merch variants + absorbed fees + different shipping/billing + deferred Attendee questions follows a plausible fan journey and crosses multiple owners. Explain why this combination matters; use focused tests to isolate any failure. One successful charter is not proof of every permutation.

## 2. Establish controls before stressing the system

Complete one clean allowed path from configuration to final result. Keep a known unaffected record alongside it. Then vary one behavior so a failure is explainable.

For an Event: ordinary paid General Admission first; then one separate order each for Refund, Void, Exchange, admission, and recovery. For Products: track the purchased variant and an untouched variant. For seats: track the target seat and a control seat. For permissions: pair the exact allowed Employee with a denied Employee.

Run exploratory combinations after the baseline, not instead of it. A failure test that eventually succeeds does not replace the clean success proof target.

## 3. Choose configuration combinations deliberately

List the actual values used by affected Venues and supported clients. Mark unsupported combinations Not applicable with source evidence. Use a smaller interaction sample only for lower-risk independent dimensions; explicitly enumerate financial, ownership, and previously escaped interactions.

| Dimension | Example values to verify from current setup | Why it interacts |
| --- | --- | --- |
| Sellable shape | Ordinary ticket, assigned seat, Ticket + Product Package, Membership benefit, Product variant | Different Inventory, descendant issuance, allocation, and adjustment |
| Pricing | Actual supported calculation modes; taxable/non-taxable; Customer-paid/absorbed/internal fee; quantity one/two | Same Customer total can hide incorrect internal allocation |
| Payment | Supported Card/account/API mode, Cash, Other, Free/Comp, credit split, plan | Fee, provider ownership, Refund, and payout paths differ |
| Client | Public Web, embedded/modal Widget, Web Box Office, Electron, public app/webview, POS, Kiosk | Entry controls and final-state/recovery handoffs differ |
| Identity | Guest/signed-in Customer, different Attendee, Member, limited Employee, another Venue | Ownership and authorization are not screen-only behavior |
| Record age/state | New, existing paid order, open basket, pending job, expired/adjusted item | Today's configuration may not govern yesterday's contract |
| Timing | Before/at/after actual cutoff, delayed provider/job, simultaneous competing actions | Eligibility and ownership can change while a screen stays open |

### Example targeted Package matrix

Start with the exact supported Ticket + Product Package and independent fee calculation:

1. Quantity one, ordinary fees, clean Card purchase: complete parent/children and saved money.
2. Quantity two, internal/absorbed fee: compare Customer total **and** each required saved allocation.
3. Supported discount or Ticket Credit interaction: eligibility, price allocation, issued items, final usage.
4. Partial Refund on a separate order: selected child/parent scope, unaffected items, final fee/tax treatment.
5. Affected Box Office/Widget/native client: same business contract, with only that client's supported controls.

This is a targeted example, not complete pricing coverage. Add a row for each changed rule or proven risky interaction. Use backend table-driven tests for the broader financial matrix; existing Playwright should prove real configuration-to-purchase handoffs and the high-risk combinations.

## 4. Compare old data, new data, and an open basket

Prepare three owned records before a supported configuration change: an earlier paid order, an open basket, and a newly started basket afterward.

As Organizer, change the allowed Event price, fee, question, availability, or other affected setting and reopen it. For each record, verify the intended contract:

- Earlier paid order retains its correct historical money, item identity, and validity unless the change explicitly includes it.
- Open basket either keeps or refreshes values under the actual policy; checkout clearly handles an ineligible or changed selection.
- New basket sees the new effective settings.
- Reports, refunds, and delivery still use the correct original or new values.

Repeat for an existing Membership renewal, saved Payment Plan, or historical payment after a gateway change when those paths are affected. Gateway migrations require engineering-prepared sandbox accounts and explicit ownership evidence; do not change a live Venue gateway to run this pass.

For old/new frontend coexistence, compare final supported outcomes. A legacy route and a new page need not look identical, but neither may silently lose a required setting or promised item.

### Rehearse the on-sale transition with existing data intact

VIP and general on-sale are two states of the same business, not two unrelated new-Event tests. Use the approved TEA time/configuration mechanism and actual eligibility rules; a VIP label alone does not establish a password, Membership, or access restriction.

1. Before VIP opens, check intended visibility and denied purchasing through each affected supported entry. Buy in the VIP phase as an eligible Customer; preserve an ineligible Customer and an open basket for comparison.
2. Keep the paid VIP order, any pending Attendee answers, reserved/open basket, Product stock, credits and tracking context. Reconcile the VIP phase before moving forward; do not reset the Organization into an empty state.
3. Apply the actual general-sale changes through the supported Organizer/setup path. Verify the agreed effective timezone at before/at/after boundaries using approved controlled time, not a changed laptop clock presented as server-time proof.
4. Recheck direct Event, Organizer website/Widget and any affected Employee entry. Cached availability must not grant an unauthorized sale or hide the newly eligible offer; use the actual open-basket price/eligibility policy.
5. Buy a new general-sale order and reopen the earlier VIP order. Compare old/new prices, benefits, questions, barcode timing, balances, Inventory, reports and attribution. Earlier paid entitlements must not be silently rewritten by today's catalog settings.

Also test applicable sales-triggered Ticket Type release separately: release exactly when its configured condition is satisfied, not merely when checkout starts. Launch-volume testing remains an approved engineering/load activity; browser concurrency samples do not certify capacity.

## 5. Put failures at the business boundary

Agree the test fault with engineering and use a sandbox. A browser response interruption proves only client behavior; it does not simulate a server commit failure or native crash.

| Controlled failure point | Concrete scenario | Required result |
| --- | --- | --- |
| Before payment | Customer cancels or approved provider declines | Clear outcome; no unintended charge/fulfilled ticket; reservation follows its release policy |
| Provider succeeded, local completion interrupted | Engineering injects failure at the actual purchase boundary | Payment remains attributable; controlled recovery yields one correct order/items or an explicitly reconciled resolution—not blind repurchase |
| Order saved, child/benefit generation incomplete | One prepared Package/Member target fails | Missing identities are visible; recovery completes only the intended work without duplicating successful items |
| Order complete, email/print fails | Approved inbox/printer failure | Paid order remains usable/findable; delivery recovery does not collect money again |
| Refund submitted, provider result delayed | Supported pending-refund path | Pending is not reported as final; approved final update changes money/validity once under policy |
| Bulk batch interrupted | Worker stops after known committed rows | Resume honors progress and side-effect policy; no lost or duplicated recipients |
| Integration receives duplicate/out-of-order update | Isolated contract test | Duplicate does not repeat a business effect; stale update cannot incorrectly replace a newer state |

Record state immediately after failure, after supported recovery, and after a fresh reopen. Account for orphaned payments, missing items, pending work, notifications, and stock. “Retry passed” without these comparisons is incomplete evidence.

## 6. Test competing actions with exact ownership

Use two independent Customer/Employee sessions and owned isolated resources.

| Competition | What to do | Final invariant to check |
| --- | --- | --- |
| Last seat or stock | Both Customers attempt the same final unit | No oversale/duplicate active owner; losing attempt has a clear payment result; control unit is unchanged |
| Last credit entitlement | Two eligible redemptions use the same remaining allowance | Usage does not exceed the rule; final tickets and money match accepted redemptions |
| Refund versus Check In | Engineering-approved isolated competing transitions | Final state follows the defined ordering/eligibility; no unexplained admitted-and-refunded result |
| Transfer/Resale versus purchase or cancellation | Exercise only supported competing transitions | Exactly the intended active owner and admission remain; no duplicate sale/payout obligation |
| Role revoked while form open | Remove the test permission and attempt save | Server enforces the revocation policy; an old visible button does not grant authority |
| Import confirmation/resume twice | Submit the same approved work concurrently in a controlled test | Duplicate protection and worker ownership prevent repeated committed work |

Repeat from fresh reads and inspect both attempts. Browser timing is nondeterministic; backend integration tests must cover the actual locking/transition guarantees. Never call two browser clicks a load test.

## 7. Use relationships to catch wrong results

These checks supplement independently calculated examples. Apply them only where the current business rules support the relationship.

- Reopening a saved Event must not change its values, published status, or create another Event.
- An Employee sale made for a Customer must not make the Employee the Customer or credit owner.
- A read-only refresh or report generation must not charge money, consume a benefit, or create admission.
- Retrying the same completed job/message through its supported idempotent path must not repeat its business effect.
- Buying two units follows the actual per-item/per-order fee and rounding formula; do not assume every charge simply doubles.
- Changing an absorbed fee may change internal allocation without changing the Customer-visible total.
- Transferring ownership must not silently create an additional sold seat or ticket.
- Reprinting a ticket must not create another paid order or additional admission allowance.
- A partial adjustment preserves unrelated items and the control order.

A relation failing is an investigation signal. Establish the actual policy and current persisted result before reporting a confirmed defect.

## 8. Add accessibility, scale, and operational visibility where they matter

**Accessibility:** complete required setup/checkout by keyboard; labels and errors must identify the field; focus must return after a modal; narrow screens must expose the payment/submit action. Use supported browser/device and appropriate component/audit tooling. Automated accessibility checks do not replace the real workflow.

**Scale:** agree representative on-sale concurrency, bulk size, completion time, and allowable backlog with engineering. Use isolated data and approved load tooling, not a production experiment or hundreds of improvised Playwright purchases. Measure successful and rejected outcomes, oldest pending work, exact unique recipients, and money/Inventory consistency.

**Observability:** ensure the original order/job/payment reference lets an authorized operator distinguish pending, failed, and complete. In approved test evidence, correlate provider outcome, saved record, downstream task, and final items. The backend operability standard uses Datadog for runtime visibility and Sentry for server failures; do not leak card data, secrets, or Customer personal information into logs.

**Rollout:** review actual feature-flag scope and affected client cohorts. Test disabled/enabled behavior and supported old/new coexistence where applicable. A code rollback does not reverse Customer charges, Refunds, or issued tickets; the business recovery plan needs reconciliation.

These checks use the same declared acceptance criteria and evidence rules as the canonical standard; do not invent a latency or support guarantee.

## 9. Convert the strongest findings into durable protection

| Finding | Durable protection to consider |
| --- | --- |
| Wrong math or fee allocation | Backend calculation examples across actual pricing modes plus one full-path Package purchase |
| Saved setting never affects checkout | Organizer save/reopen → Customer purchase Playwright journey |
| Charge/order disagreement | Backend purchase/reconciliation fault tests plus supported browser lost-result recovery |
| Missing Member/Event recipients | Backend batch failure/resume plus exact Member benefit assertions in the existing suite |
| Cross-Venue or stale role access | Backend/API authorization tests plus allowed/denied visible workflow |
| Physical setting crash or unreadable print | Named native/device regression and actual hardware evidence; browser checks only for the supported web boundary |

Use [[00 Start Here/Showpass QA Handbook/06 Automation Strategy|existing automation references]]. Inspect assertions before saying coverage is absent. Do not create a second test if extending the existing journey proves the same outcome. Keep the new test's independent expected result, safety, completion, and cleanup explicit.

## 10. Finish with an honest coverage statement

List the selected walkthrough, client/build/configuration, exact proof targets, checks executed, deviations, remaining gaps, and final data state. Use the canonical coverage statuses rather than “everything looks good.” Keep Critical, Major, and Medium separate and assess actual business harm.

These passes are stronger only when someone can repeat them and explain what they prove. No screenshots, process labels, or test counts compensate for missing final money, recipient, Inventory, or admission evidence.

## Sources for this approach

Showpass-specific foundations: [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|backend/frontend/automation map]], [backend terminology](</Users/christianvaldez/Documents/Showpass/repos/web-app/UBIQUITOUS_LANGUAGE.md>), [backend operability standard](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/standards/operability.md>), and [frontend feature-completion lifecycle](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/docs/workflows/feature-completion-lifecycle.md>). The canonical quality standard governs risk modeling and evidence. Enterprise-style techniques here are applied test-design guidance, not externally benchmarked claims.
