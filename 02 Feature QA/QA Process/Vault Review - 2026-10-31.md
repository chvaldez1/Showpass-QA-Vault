---
title: Vault Review - 2026-10-31
date: 2026-10-31
tags:
  - qa/review
  - qa/process
status: Local improvements implemented; team adoption and product outcomes unmeasured
---

# Vault Review — October 31, 2026

The vault has strong testing standards and useful Showpass knowledge. Its biggest opportunity is turning that knowledge into a short, repeatable path from a change to a release decision and dependable automation. The improvements below are implemented locally. They do not establish that any Showpass release is ready or that new product tests are running.

**User direction incorporated, October 31:** The release template now focuses on whether each behavior has a saved Qase case, Full/Partial/None/Unknown coverage, Playwright automation and a planned/executed browser test, with actual results and missing checks. Required owner/sign-off fields were removed. The document health checker, tests and guide were removed; it is not part of the QA workflow. Historical checker validation below describes the initial implementation only.

## Review scope

Reviewed the canonical standard, orientation/indexes, relevant handbook chapters, templates, automation guides and checkpoint samples, tooling, incident-analysis samples, browser-report structure and native/mobile CI notes. Checked maintained-note wikilink targets across the vault. Read the current local Playwright README, implementation/update workflows and package scripts to verify workflow references.

The initial review was a vault/process review, not an exhaustive review of every test field or assertion. It did not run live Jira, Qase, Sentry, CI, browser, device or production checks or change an application repository. The separately requested follow-on implementation below includes a read-only Qase snapshot and scoped Playwright changes; its results and remaining limits are recorded separately. Existing user edits and historical evidence claims were preserved.

## Findings and improvements

| Priority | What the review found | Why it matters | Improvement made |
| --- | --- | --- | --- |
| 1 | [[00 Start Here/Showpass QA Handbook/07 Release Confidence]] defines a good decision packet, but there was no reusable release template and the main entry point did not lead through daily execution | The team has to reconstruct the decision summary and may discuss a feature without seeing which candidate/outcomes were actually tested | Added [[00 Start Here/QA Operating Workflow]] and [[03 Test Cases/Release Decision Template]]; linked them from orientation, handbook and report/feature templates |
| 1 | [[06 Prompts/Convert Test Cases to Playwright]] stopped at proposing an implementation; it referenced three missing workflow paths and required status labels the current upstream README no longer uses | An automation request can finish with more planning instead of working protection, or spend time satisfying an obsolete prerequisite | Corrected the paths; separated planning from implementation; added focused execution, cleanup, actual CI status and remaining gaps; kept verified inputs and canonical safety requirements |
| 1 | The checkout planning system has a completed shortlist and useful handoffs, alongside repeated instructions to keep finding planning work | Repeated ranking/synchronization work can consume effort without increasing test protection | Added a bounded-planning rule and a historical-checkpoint notice; retained original IDs, ranking caveats and the worker's planning-only boundary |
| 2 | [[04 Automation/Automation Candidate Template]] covered selectors/data but lacked ownership, layer choice, delivery state, actual execution and CI evidence | A ready packet or test file can be mistaken for current protection; repeated setup blockers remain easy to overlook | Expanded the template and added [[04 Automation/00 Index]] with a practical implementation/verification/maintenance workflow; linked existing queues instead of copying their rankings |
| 2 | [[00 Start Here/Showpass QA Handbook/10 Quality Measures]] lists useful measures, and the lessons chapter already contains concrete learning, but there was no working record for baseline, trial and follow-up decision | The team cannot readily tell whether a new process saves effort or prevents the same harm next time | Added [[00 Start Here/QA Improvement Log]] with unmeasured baselines, three active proposed trials, review points and Keep/Change/Stop decisions; retired the document-checker trial following feedback |
| 2 | Refund guides share basenames with BOGO guides; ten cross-folder links could resolve ambiguously | A tester may start with the wrong preparation and reach the wrong expected result | Qualified 13 refund-guide references with their exact folder paths, including three additional same-folder references for consistency; retained headings and link labels |
| 2 | Fifteen linked seating evidence files are absent locally; a vault-wide filename search did not locate the three screenshots or requested receipt samples | Historical observations and publication claims cannot be rechecked using those local originals | Added an explicit availability warning in [[03 Test Cases/Events/02 Manage/04 Seating#Browser observations — definitions are not executed proof]]; preserved links/dates/results and did not invent replacement proof |
| Retired | An offline document checker was initially added | It added maintenance and rigid template requirements without proving Showpass test coverage | Removed the checker, tests, guide and workflow links after user feedback; release coverage is recorded directly in the note |

These priorities describe process impact, not product defect severity. The review did not confirm a new Showpass bug.

## What to keep

- Business harm, money, inventory, admission, permissions and full lifecycle outcomes already guide scope well.
- The canonical standard separates source expectations, draft/published tests and actual execution. Keep that distinction.
- The handbook covers backend, component, browser, native/device and operational checks. Preserve the right layer for each proof.
- Source tracing, independent financial expectations, recovery and cleanup are strong foundations.
- Existing incident analyses and lessons already challenge old assumptions. Keep learning evidence attached to a real workflow change.

## What is still unproven

| Remaining work | Current state | Where it is tracked |
| --- | --- | --- |
| Use the coverage template on a real candidate | Not run; current Qase, Playwright and browser coverage has not been collected for a release | IMP-01 in [[00 Start Here/QA Improvement Log]] |
| Turn a selected existing automation candidate into current, running CI protection | Not implemented by this vault review; historical rankings were not revalidated | IMP-02 and the existing canonical candidate queues linked from [[04 Automation/00 Index]] |
| Reduce repeated test-data/final-result blockers | Proposed; actual recurring blocker and owner must be selected | IMP-03 |
| Establish release-quality and automation-effort baselines | Not collected | [[00 Start Here/QA Improvement Log#Release measures]] |
| Restore absent seating evidence | Missing locally; original captures/receipts are needed | Availability warning in the seating note; the original evidence gap remains unresolved |
| Document health checker | Removed; no CI integration planned | IMP-04 retired following user feedback |

These are transparent delivery/adoption limits. They do not require repeating this review or expanding a planning loop. At the next real release, start with the existing canonical note and IMP-01, then record what worked and what changed.

## Validation

The following records the initial, now-removed checker's verification. It is historical context, not a required workflow or evidence that Showpass passed. The scan did not validate heading anchors, external URLs or screenshot contents.

| Verification | Actual result |
| --- | --- |
| Checker tests | All 9 passed. No Showpass tests were run. |
| Maintained-note navigation scan | 231 notes checked; no missing/ambiguous note-target errors. Fifteen missing-evidence warnings remain. The scan count includes the new notes. |
| Strict evidence mode | Exited with failure for exactly the 15 absent seating files, as intended. This evidence gap remains unresolved. |
| Release command with the unfilled template | Rejected missing/placeholder context, as intended. |
| Release command with a complete synthetic Blocked row | Document check passed; the outcome remained Blocked with a High-risk warning. Ran from another working directory too. |
| Same synthetic row with Go | Rejected the conflicting recommendation, as intended. |
| Corrected Playwright workflow paths | All three destination files exist in the current local repository. No product test execution claimed. |
| Temporary files | The one synthetic release fixture was created under `/private/tmp`, deleted with `rm` and verified absent. No temporary capture/export files retained. |

No product results or release approval are inferred from these document checks. Obsidian's desktop UI was not opened; note structure and file targets were checked locally, without a desktop render claim.

## Maintenance decision

Keep the current canonical standard. Use the new workflow/templates on actual work, collect the first baseline and evaluate one improvement at a time. Today's tools and process are open to replacement when a bounded trial provides better proof, lower recurring effort or more dependable results. Retiring a redundant step must preserve its distinct business protection.

## Implementation follow-through

**Scope:** The follow-on request asked to implement the accessible improvements. Separate-project permission was subsequently clarified in chat, and the user authorized finishing the Playwright changes already underway. Future edits outside the vault require explicit prior permission; that rule is now in `AGENTS.md`. No changes were committed, pushed or deployed.

### Implemented

| Improvement | Concrete change | Actual verification / remaining limit |
| --- | --- | --- |
| Collect release coverage | Added [[06 Prompts/Release Coverage Review]], linked it from agent instructions, and implemented [[05 Tooling/scripts/collect-release-coverage.mjs]] | Offline collection, live read-only Qase pagination and local snapshot reuse exercised. Six collector tests passed. Search matches remain unreviewed candidates until the agent reads actual case contents and assertions. |
| Reuse controlled test-data cleanup | Connected existing `withOwnedPendingBaskets` to failed-Affirm tests and strengthened its final reads | Requires a captured basket, verifies `invoice_id` is null, expires only its pending reservation and rereads EXPIRED. Static checks/discovery passed; live cleanup remains unrun. New last-seat/member/event preparation was not implemented without a concrete scoped fixture. |
| Strengthen the shared transaction check | The Box Office transaction helper now reads the exact saved invoice and compares `final_amount` with the independently supplied customer total; UI customer/seller/transaction checks remain | Lint/typecheck/formatting passed. Live amount comparison and deliberate wrong-expectation demonstration remain unrun because beta Access could not be reused. Applies to existing shared callers; current client/gateway combinations have not all been executed. |
| Improve failure proof and reporting | Failed-Affirm checks now assert invoice-free basket state and verified expiration; their results no longer upload against successful-purchase SPT-3287 | Five guest WebPublic checks registered in focused DesktopChrome discovery using local configuration. Discovery executed zero test attempts. Widget/authenticated variants remain in the existing suite, but were not run. Provider charges, unrelated invoices and another buyer's ability to purchase remain separate unverified outcomes. |
| Preserve actual run evidence | Browser/Electron configs now include Playwright's built-in JSON reporter and shared release metadata; existing suite artifacts already retain `test-results` | Discovery confirmed local test revision metadata, tracked-change indication and an unknown application build. The collector rejected the actual discovery JSON as execution evidence. Actual execution/CI artifacts remain unrun; no workflow was triggered. |
| Turn escaped bugs into regression work | Added [[06 Prompts/Escaped Bug To Regression]] and linked it from agent instructions | The workflow names the original failure, exact gap, implementation, failure-catching demonstration and current result separately. No incident-specific regression was implemented or executed in this process task. |

### Corrections found by exercising the workflow

**Customer total and venue settlement are different amounts.** The older checkout packet proposed comparing Settlement amount with the expected checkout total. Backend `invoice_cost_breakdown.py` defines `amount_paid` as the amount owed to/by the payee, and its gateway-dependent calculation can differ from the customer's total. Frontend `SaleStyleBreakdown.web.tsx` renders that field as Settlement amount. The implemented customer-total check therefore uses the exact invoice's `final_amount`. Venue settlement still requires a separately established expectation. A correction was added to [[04 Automation/Checkout Playwright Automation Review Checkpoint]] without rewriting its historical ranking.

**An inherited Qase ID is not necessarily the correct test.** The saved definition of SPT-3287 proves a successful public ticket purchase, including accepted payment and created order. The failed-Affirm suite inherited that fixture's ID. Related SPT-660 concerns input validation/Affirm error states; SPT-661 concerns declined card payments. Neither was adopted automatically as a full mapping for this failure-and-expiration journey. The failure tests now use a local failure label, include a coverage-gap annotation and exclude Qase uploads while retaining normal Playwright execution/results. Successful-purchase tests and Qase definitions were left unchanged.

### Coverage and execution example

| Behavior / scenario | Overall coverage | Qase test | Playwright automation | Browser test | Latest results / evidence | Missing checks |
| --- | --- | --- | --- | --- | --- | --- |
| Completed Box Office purchase has the independently expected saved customer total | Partial: shared assertion implemented; supported client/configuration combinations not fully reviewed | Exact generic saved-total case not established by this review. SPT-935 was read as related module-price/absorbed-fee coverage, not treated as a generic amount case | Exact-invoice `final_amount` comparison added to the existing shared transaction check | Existing browser journey; no new executed report for this change | Static validation Passed; live product check Not run | Applicable beta build/session, representative paid/discounted/free shared callers and a deliberate wrong-expectation demonstration |
| Failed Affirm checkout leaves its captured basket invoice-free and releases its reservation | Partial within the broader failed-payment lifecycle; provider-wide and resale-of-stock results are separate | SPT-3287 is unsuitable successful-purchase mapping. Related SPT-660/661 reviewed; failure-specific mapping remains unverified | Existing failure journey now wraps the owned-basket final-state/cleanup helper | Existing WebPublic/Widget browser tests; live execution Not run | Five focused guest WebPublic registrations verified; zero attempts executed | Live error → same-basket no invoice → EXPIRED; separately verify provider charge absence and another buyer's stock where in scope |

### Verification record

- **Qase:** complete snapshot of **2,328 unique SPT cases**, captured **October 31, 2026, 20:23:59 America/Edmonton** (`2026-11-01T02:23:59.907Z`). The settlement query returned 66 candidates; a local reuse for Affirm returned 27 candidates without another API read. These counts mean retrieved candidates, not fully reviewed cases or passes. Comparison focused on SPT-935, SPT-3287, SPT-660 and SPT-661; SPT-3287's large parameter set was summarized rather than exhaustively assessed.
- **Collector:** `node --test "05 Tooling/scripts/collect-release-coverage.test.mjs"` — all six passed. These are tooling tests, including synthetic retry/discovery/snapshot inputs, not Showpass product results.
- **Playwright static checks:** Node 22.21.1 via `.nvmrc`; `npm run lint` — Passed, including ESLint and TypeScript. The initial run incorrectly linted generated trace JavaScript under `.artifacts`; adding that already-ignored artifact directory to ESLint exclusions resolved the noise without changing source rules.
- **Formatting:** targeted Prettier check on the eight changed Playwright files — Passed. `git diff --check` — Passed.
- **Focused discovery:** local configuration, DesktopChrome, failed-Affirm file, WebPublic + Guest — five registrations, corrected local failure labels, zero test attempts. Qase uploads and Slack sending were disabled.
- **Beta execution:** discovery stopped in the existing Cloudflare helper with “Cannot reuse Cloudflare session.” No live purchase, payment failure, refund, invoice mutation or reservation cleanup ran. Personal browser state was not accessed or changed.
- **Metadata:** application build and CI run were null in local discovery, as intended. Test repository identity was retained separately. The collector rejected the actual discovery report as execution evidence.
- **CI:** reporter configuration is implemented locally. Existing CI artifact paths retain its output once this code is used by a real job. No commit, push, workflow launch, Qase write or external message was made.

### Changed Playwright files

The separate repository's unrelated existing edits were preserved. This task changed only:

- `pages/dashboard/box-office/TransactionPage.ts`
- `utils/basket-helpers.ts`
- `tests/core/checkout/events/single-events-affirm-failed.test.ts`
- `fixtures/configs/release-evidence.ts` — new metadata helper
- `playwright.config.ts`
- `playwright.desktop.config.ts`
- `eslint.config.js`
- `docs/agent-workflows/standards/verification-and-reporting.md`

Root: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`. The source revision and local changes are captured by the collector and per-run metadata; no deployed application revision was inferred from them.

**Cleanup:** Temporary complete Qase exports, filtered evidence, discovery JSON, lint log and the three source patch scripts were deleted after recording the useful results. The collector's tests delete their own isolated temporary fixtures. Maintained tools, source changes and this canonical implementation record remain.
