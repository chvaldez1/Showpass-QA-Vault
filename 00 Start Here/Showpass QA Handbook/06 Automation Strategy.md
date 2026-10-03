---
title: Automation Strategy
date: 2026-10-03
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Automation Strategy

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Turn the handbook into durable automation

### Select the correct layer

| Layer | Best responsibility | Not sufficient to prove |
| --- | --- | --- |
| Backend unit/table tests | Pricing math, eligibility, validation, permission rules, rounding | Real client flow or third-party completion |
| Backend integration tests | Database transitions, concurrency, webhook/retry, batches, ledgers | Customer can reach the workflow on each client |
| Frontend component/integration tests | Conditional controls, state, serialization, errors, flag variants | Full payment → saved order → usable ticket |
| Existing Playwright patterns | Browser/Electron journeys, cross-screen persistence, supported downloads, final outcomes | Native SDK/physical hardware, every backend permutation |
| Manual exploratory tests | Complex workflows, misunderstood policies, real-life combinations, usability | Repeatable automated protection unless promoted |
| Physical device/native testing | OS/app/SDK/reader/printer/scanner behavior and payment handoff | All devices from one passing combination |

Use `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright` only as the source of existing browser automation patterns. Do not substitute Playwright for backend truth or infer a missing test from a filename search alone. No tests were run for this handbook.

### Attach automation to the actual walkthrough

An existing seeded purchase proves a different boundary from an Organizer creating the configuration and then purchasing it. Keep that distinction visible when choosing coverage.

| Walkthrough stage | Existing starting point | What to inspect or extend |
| --- | --- | --- |
| Ticket + Product Package purchase | P1 runner delegates to package composable helpers; current config includes SPT-3760, Stripe Custom Connect Card, and expected barcode quantities | Follow the helper/page-object assertions. Compare exact parent/child identities and quantities; add independent internal/absorbed allocation evidence when that is the risk. Barcode count alone is not the complete fee oracle. |
| Membership purchase | P2 runner selects Public Web, Widget, or Web Box Office helpers; assertions live in checkout/Transaction page objects | Inspect every promised Member/Event result, not just purchase totals. Keep Group/Level/benefit setup persistence distinct from purchase of existing configuration. |
| Ticket Credit redemption | P3 purchases a configured flex pack, then spends earned credit; its matrix includes Public Web, Widget, and Web Box Office | Reuse the actual acquire-and-spend journey. A separate configuration test must save eligible assignments, reopen them, and prove their effect; use bounded final usage checks. |
| Exchange | P4 helper starts eligible flows from Customer order or Box Office Transaction and verifies configured totals | Extend through old/new ticket validity, correct Customer, credit/payment, Inventory, and final saved adjustments where not already asserted. Do not replace existing supported exchange-selection data with a duplicate hard-coded journey. |
| Event creation integration | Existing Event cases plus the Event walkthrough | Prove saved configuration reaches Customer checkout and final tickets; a fee-section-presence assertion does not prove fees were charged or allocated correctly. |

These are extension checkpoints, not a declaration that every listed assertion is absent across the repo. Runners can delegate assertions several layers deep; review the exact active config and helpers before estimating a gap.

### Extend existing FAN EXPO journeys through their missing outcomes

The existing [Cleveland configuration](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/client-setup/fan-expo-cleveland/fan-expo-cleveland-vip-config.ts>) includes guest/new/existing Customer paths, Will Call and shipping, billing matching/different from shipping, and questions at confirmation/My Orders. Its [steps](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/client-setup/fan-expo-cleveland/fan-expo-cleveland.steps.ts>) delegate purchase assertions to the shared journey; the shipping-restriction helper checks invalid-address recovery **without purchasing**. Inspect those downstream assertions before calling coverage missing. None was executed for this handbook.

Use those patterns, not Cleveland prices/IDs/policies, for another Organizer/city. Verify its own saved configuration first. Build a short outcome-to-assertion map from [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the completion checklist]] and prioritize:

| Existing journey to extend | Exact added proof if not already asserted | Appropriate other layer |
| --- | --- | --- |
| Package purchase with shipping and different Attendees | Correct variants/child identities, independent shipping and absorbed/internal allocations, saved destination, answers returned to through My Orders and available to Employee | Backend financial/question-snapshot matrix; external/provider reads require approved access |
| Paid order with deferred answers | Leave stage → reopen original receipt/My Orders → complete two distinct Attendees → fresh persistence; unchanged payment/order/items; required errors and ownership remain correct | Backend full-submit rollback, partial-save pending, recipient scope, locks and old snapshots |
| Purchase then Employee fulfillment/adjustment | One shipping item Fulfilled and another Unfulfilled → fresh partial order status → full status; separate adjustment validates untouched items/money/rights | Backend batch authorization/rollback and consumer-specific reversal; physical shipping/pickup remains separate |
| Supported website/Widget purchase | Retained attribution plus expected browser payload and authorized destination result; receipt reload/answer edit does not create another counted purchase | Formatter/contract and server analytics tests, consumer-specific dedup/retry; browser payload alone is client evidence |

Reuse current page objects and shared journey composition. These are candidate extensions, not implemented tests or an absence claim. If a provider, inbox, analytics destination or financial read is unavailable, mark that assertion Blocked and protect the underlying rule at its owning layer; do not substitute a success toast.

For each candidate, name the setup method, transition under test, independent expected result, approved final read, bounded wait, first-attempt references, and cleanup. If the needed read or fault setup is unavailable, record that proof target as Blocked. Do not weaken the test to a toast and call the gap closed.

### First automation priorities

Priorities are based on business harm and reuse, not a claim of statistically ranked incident causes. Before implementation, inspect current assertions and extend an existing test where it proves the same journey.

| Candidate | Concrete browser journey and assertions | Complementary coverage / blocker |
| --- | --- | --- |
| A. Package fee protection | Buy prepared ticket-plus-product package, quantity >1, one absorbed/internal-fee configuration; assert independent total, final composition, saved fee/tax/earnings allocation, fresh order | Larger pricing-mode/discount/currency matrix belongs in backend. If allocation is not exposed through an approved read, that proof is Blocked—not silently omitted. P1 |
| B. Completed sale stays one sale after lost/delayed client result | Clean baseline separately; controlled uncertain response; reopen original sale before supported retry/recovery; assert one payment, one order, correct issued items, one inventory change | Needs supported fault setup and authorized provider evidence; backend must cover irreversible-payment/local-failure and duplicate callback cases. B1, F1 |
| C. Last seat has one owner and released seat can sell again | Two contexts compete for one isolated seat; assert one successful owned seat and safe rejected buyer; separate abandonment/expiry then purchase by another customer | Needs deterministic seat ownership and expiry setup; backend concurrency/assignment/projection tests. B5 |
| D. Membership benefit completion | Purchase or issue benefits to small known recipient set; reopen each member/event result; compare identities and quantities | Backend partial batch failure/resume and renewal/exit paths. P2 |
| E. Ticket Credit configuration really redeems | Save quantity/eligible items → fresh reopen → eligible redemption → final usage → ineligible/exhausted rejection under allowed role | Existing preseeded-redemption tests do not alone establish setup persistence. F3, P3 |
| F. Exchange/refund preserves money and admission | Existing exchange runner plus old/new validity, net money/credit, released inventory, deterministic export | Backend asynchronous refund/idempotency/settlement; no real payout mutation. P4 |

Hardware remains a named manual/device priority even though it is not in this Playwright table.

### A Playwright test is ready when

- It names the business proof target, client, starting state, actual flags/configuration, and expected independent result.
- Existing page objects/runners/config conventions are reused; selectors reflect stable user-visible behavior or verified stable test hooks.
- Setup uses supported authorized APIs/UI and owned data. It does not bypass the transition being tested.
- Assertions check exact item identities, quantities, amounts, owners, and validity where required—not just non-empty lists or a success toast.
- Fresh reads prove persistence; async completion uses bounded condition-based waits and exposes pending/failure details.
- A mocked response is labeled as client-only coverage. Real provider/order evidence is separately named.
- Expected validation does not swallow unrelated error responses or console failures.
- Test retries cannot create extra charges or corrupt shared stock. Preserve references from the first failed attempt before retry.
- Cleanup restores only owned changes and verifies the final state. API deletion is not proof that user-facing refund/expiry works.
- The focused run and environment are recorded. A test's existence is not execution evidence; a skipped test is not coverage.
- Remaining manual/device/backend/deferred/blocked rows are explicit.

### Test maintenance rules

Fix flaky setup and waits by identifying the actual state dependency, not adding sleeps or weakening assertions. If a test is quarantined, record the lost business proof target, replacement manual check, owner, and restoration condition. Track first-attempt failures separately from retry-pass results. Retire duplicate cases only after verifying no distinct client, ownership, lifecycle, or failure path is lost.
