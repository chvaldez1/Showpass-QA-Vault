---
title: "BOGO \u2014 Coverage and Readiness"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# BOGO — Coverage and Readiness

## Proof targets

| Proof target | Named proof |
| --- | --- |
| Selected tickets alone determine valid reward quantity/benefit | TC-C01/C03/C04/C05/C07/C08; backend evaluator oracle |
| One completed sale has one payment, order and requested ticket set | TC-C02/TC-B01; provider finalization/race tests |
| Configuration and permissions never silently broaden eligibility | Admin guide; model/cache/API contract; future organizer phase |
| Saved values survive adjustments and reconcile with history | TC-O01/O02/O03/O04; exchange/transfer integration |
| Compatible promotions consume only supported capacity/value | TC-C09/C11; coordinator/stacking/backend budgets |

Every row is a **planned disposition**, not executed coverage. The ordinary runtime source is re-read after the user’s fresh pull. No diff or branch comparison was used.

## Entry paths and outcomes

| Entry path | Starting state and authority | Outcomes / disposition |
| --- | --- | --- |
| Public event → checkout | Customer selects tickets; user basket repository | Success TC-C02; edits TC-C01/C03; cancel TC-C10; stale/rejection/retry/timeout controlled integration |
| Widget host → embedded checkout | Host/frame/selection handoff; shared public checkout patterns | Same price/order proof planned; Blocked until approved host/event and host state are supplied |
| Web Box Office → selected customer sale | Venue basket and Box office location; employee must not become customer | Cash success TC-B01; customer change/other payment methods backend/integration; provider cancel varies by actual client |
| Internal Admin | Authorized operator builds separate records; graph excluded until complete/public | Create/reopen/update/disable/re-enable Admin procedure; validation/cache backend |
| Discounts Manage → BOGO wizard | Organizer phase; create/header/empty-state/edit/duplicate carry different draft state | Blocked on revision; charters preserve all requested controls |
| Transactions / My Orders / Reports | Completed historical data | Reconciliation/refund/void/history manual; exchange/transfer/physical admission named setup gates |
| Electron / Mobile Box Office / React Native Public | Potential shared behavior but exact consumer/device workflow not bound | Blocked compatibility audit; not declared unsupported or covered by Web Box Office |

## State-space and coverage ledger

| Declared item / state | Risk | Planned coverage | Evidence / gap |
| --- | --- | --- | --- |
| 1:1, 2:1, 1:3, 3:2 below/at/above boundaries | Wrong discount | Manual-only TC-C01 | Numeric independent table; unexecuted |
| Other positive X:Y, large values, complete/partial Get | Hardcoded ratios/performance | Backend planned | evaluator.py; small-state exhaustive/randomized oracle and grouped quantity tests |
| Same set / mixed ticket types / mixed prices | Wrong pool/reward | Manual-only TC-C05 | Source pools types; PRD phase difference noted |
| Separate Buy/Get sets | Unrequested tickets | Manual-only TC-C08 | One-event source support; no automatic insertion |
| Overlap Buy/Get set, constrained reward-only capacity | Self-qualification | Backend planned | Explicit disjoint-unit oracle; no extra confusing manual duplication |
| Equal-price ties / input-order invariance | Unstable benefit | Backend planned; TC-C05 reverse-order amount check | Stable group/seat IDs; exact seat financial ownership not implied |
| 25% / $7 / value above price | Overdiscount | Manual-only TC-C04 | Merchandise cap; fees/tax separate |
| Multiple disjoint BOGOs | Missing offer | Backend/integration planned | Independent pools and per-discount totals; each active offer discovered |
| Shared qualifier / consumed reward across BOGOs | Reuse | Manual-only TC-C09; backend planned | Coordinator consumes physical capacity; cost then ID order |
| Priority ties and flexible/constrained qualifier reservation | Lost feasible offer | Backend planned | No user-configurable priority field; local coordinator not a global allocation search |
| Compatible manual Apply to each stack / remove | Wrong amount | Manual-only TC-C11 | Global manual/auto gate plus ordinary venue gates |
| Compatible auto/tiered/membership controls | Unapproved stacking | Backend planned | Existing combinations only; item caps/rounding/zero contributions |
| Apply once or basket-wide discount | Invalid stacking | Backend planned | Suppresses BOGO; unsupported combination is Not applicable as a successful combined offer |
| Customer-entered BOGO identifier | Accidental activation | Manual-only TC-C06 | Both manual API code fields rejected |
| Auto-added rewards / cross-order qualification / clawback | Scope expansion | Not applicable to Backend V1 | Explicit exclusions; keep deferred demand in planning |
| Basket cap | Excess use | Manual-only TC-C07 | Rewarded units, not cycles |
| Global / customer / event cap; zero/unlimited boundary | Excess use | Backend/integration planned | Saved purchaser/email identity and group scope; controlled seed/expiry setup |
| Last-use concurrent purchases | Double use | Backend planned | Locked purchase boundary; rejected basket must refresh, not silently charge a different total |
| Active date windows / exact boundaries / timezone | Wrong activation | Backend planned; manual date-bound Blocked | Admin dates read-only; supported writer missing locally |
| All rollout gates / tier / allowlist / checkout locations | Unintended sale | Backend planned; Admin preparation | Exact keys and scopes in Admin guide |
| New basket after promotion disable | Stale benefit | Manual-only TC-O04 | Owned Is public update; global switch testing engineering-only |
| Existing basket GET after switch change | Unintended repricing | Backend planned | GET read-only; full PUT recalculates/cleans; saved confirmed finalization differs |
| Add/remove/quantity/ineligible item edits | Stale savings | Manual-only TC-C03 | Fresh response and reload; no GET recalculation claim |
| Customer / email / seat / discount change | Wrong scope/ownership | Backend/integration planned | Actual customer identity and selected seat sets preserved; fault/data setup needed |
| Packages/components/recurring/issued links/non-ticket items | Unsupported rewards | Backend planned; successful reward Not applicable | Cache/model/application exclusion; unrelated items must retain normal behavior |
| Complimentary/auto-generated/waitlist/payment plan | Unsupported context | Backend planned; successful reward Not applicable | _can_evaluate guards; payment plan anywhere suppresses BOGO |
| Public clean purchase | Money/fulfillment | Manual-only TC-C02 | Approved payment evidence, saved order, delivery, inventory |
| Cash clean sale | Attribution/issuance | Manual-only TC-B01 | Customer + Cash + one transaction + inventory |
| Customer abandons before payment | Leaked use | Manual-only TC-C10 | Exact normal expiry/release deadline required |
| Decline/retry/cancel/timeout/unknown completion | Duplicate charge | Blocked controlled integration | Approved fault setup, provider method and original-reference read required |
| Stale allocations before payment | Wrong charge | Backend planned | Locked revalidation rejects changes; purchase must not proceed on stale price |
| Confirmed/delayed/duplicate callback | Repricing/duplicate order | Backend/provider integration planned | Saved purchase finalization; test payment provider and replay harness required |
| Fees/tax/absorbed/internal fees/credits/rounding | Financial loss | Backend matrix planned; manual component proof Blocked until worksheet | Equivalent current automatic discount policy; not all fees disappear on a reward |
| Shipping and related catalog items | Wrong charge/delivery | Backend/integration planned | Shipping only if genuinely configured/supported; no invented BOGO product eligibility |
| Saved invoice/report/export/usage | Wrong attribution | Manual-only TC-O01 | Existing CSV BOGO type and code provenance; report name/filters supplied per deployment |
| Separate Refund | Excess money return | Manual-only TC-O02 | Saved allocation read and allowed refund type; unknown rounded amount blocks execution |
| Separate Void | Invalidity/cash confusion | Manual-only TC-O03 | Void Paid Items; no cash return; cap usage release |
| Exchange | Excess credit / duplicate replacement | Blocked manual; backend integration planned | Exact supported event/control and independent exchange values required |
| Transfer | Duplicate ownership / history loss | Manual-only charter; Blocked for Qase | Controlled recipient/acceptance policy and actual Transfer offer required |
| Check In / physical device | Invalid admission | Manual-only, Blocked | Supported device, scan permission, ticket barcode/read capability required |
| Historical switch-off / delete / retype | Lost saved values | TC-O04; backend historical export/finalization planned | Deletion/retyping are API/internal scenarios, not routine manual cleanup |
| Diagnostics/metrics/cache query count | Invisible inconsistency | Backend planned | Bounded labels; no private IDs in metric labels; saved group/invoice mismatch diagnostics |
| BOGO CRUD/used-config lock/list permission | Bad partial config | Blocked on organizer API revision | SPW-20743 and proposed contract; local serializer absent |
| Wizard defaults/fields/conditional controls | Bad setup | Blocked on frontend revision | Organizer inventory: quantities/targets/value/limits/dates/locations/review |
| Manage tabs/filter/search/page/actions | Lost legacy workflows | TC-L01 + supplementary manual charter | BOGO actions blocked; old source and newer Jira comment distinguished |
| Keyboard/screen reader/translation/responsive/error | Inoperable setup | Blocked wizard; current legacy manual charter | Need actual new components/rendered states to bind exact cases |
| Migration / review / CI / final freeze | Wrong build confidence | Deferred engineering receipt | No execution or PR checks authorized; final gate not claimed |
| Restore configuration / preserve financial records | Data safety | Manual postconditions / Admin guide | Only owned changes; fresh reopen required; never delete orders as cleanup |

## Automation and evidence plan

Use backend model/cache/evaluator/serializer/purchase/financial tests for validation, combinatorial math, database locking and provider replays. Use existing Playwright checkout composition for the small clean browser set; assert independent amounts, API acceptance and persisted order/tickets rather than only toasts. Native hardware requires actual device proof. Each run must record prepared record names/IDs, role/permissions, gate snapshot, currency/timezone, prices/charges, original order and payment references, expected/actual outcomes, start/action/final screenshots and restoration evidence.

## Readiness

**Local drafting complete; execution not started.** No confirmed runtime defect is reported. Missing local organizer/buyer contracts are revision/phase gaps. Every planned check is unexecuted, deferred, manual-only, blocked or not applicable above; none is claimed passed. Release decision: **Decision blocked by named missing execution evidence** — exact candidate/deployment, completed high-risk purchase/lifecycle proofs and engineering/release gate receipts.

No user action is required to finish the handbook. Future run owners supply the intended V1 phase/build, controlled sales data, independent component worksheet, supported report/adjustment/device setup and provider evidence. The actor guides say exactly which proof depends on each missing input.
