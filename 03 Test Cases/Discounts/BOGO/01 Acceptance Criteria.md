---
title: "BOGO \u2014 Acceptance Criteria"
date: 2026-10-04
tags:
  - qa/bogo
status: Local draft; all cases unexecuted
---

# BOGO — Acceptance Criteria

All criteria below are intake evidence read through Atlassian Rovo. They are mapped to planned verification, not passing results. Ordinary discovery requirements remain planning reviews; source-supported backend V1 and later Organizer/buyer delivery are separate phases. Original Jira criteria are distinguished from derived regression checks in the coverage ledger.

General Rovo Search returned 403 “app is not installed on this instance”; issue-details and JQL reads succeeded. Hierarchy discovery used parent = SPW-19496, parent = SPW-20662 and the named backend/API keys, followed by a descendant-parent query over all discovered cards. The first read returned 21 cards; the follow-up returned no further children. Parent, subtasks, links and comments were read; no issue links were returned. Textual dependencies are retained in each card note. Jira hierarchy and comments can change after this snapshot.

## SPW-19496 — Parent scope

[Jira parent](https://showpass.atlassian.net/browse/SPW-19496) was read with description, status, priority and comments. It is in Discovery, priority Medium. It describes BOGO, different per-item promo amounts, easier catalog selection, and package/group rules; no standalone acceptance checklist was returned. This handbook covers BOGO V1 and its identified configuration delivery, with adjacent one-code/multiple-amount and package enhancements Deferred unless explicitly delivered by a child card. The June planning comment is historical scoping context, not current runtime acceptance.

## Phased V1 and document reconciliation

| Document / recorded requirement | Interpretation for this handbook |
| --- | --- |
| Discounts & BOGO / older Solution Design | Discovery includes codes and buyer split rows; later automatic-only Backend V1 supersedes these execution assumptions |
| Client Interview Handoff | Preparation packet; not proof that client interviews or approvals completed |
| Revised Backend Technical Plan | Automatic, buyer-selected quantities, pooled separate/overlap sets, existing automatic financial behavior; its broad product/membership overview exceeds current ticket source |
| Product Requirements | Organizer-facing setup, same set/no cross-item pooling, products/memberships in selection; record as broader/different phase from implemented Backend V1 |
| Later organizer CRUD section / SPW-20663 comment | Proposed one-event ticket-only independent Buy/Get graph, omitted-rule PATCH and used-purchase lock; another revision required |
| PRD end not after start / plan existing date order | Date equality expectations differ; source/CRUD contract must settle exact boundary in that phase; do not invent a future-date restriction |
| PRD “lowest total discount combination” | Current coordinator chooses lowest-cost next proposal with compatible qualifiers, not a global alternative-allocation optimizer; backend oracle must protect the intended accepted examples |
| Plan says zero contribution not persisted / source reconciliation keeps zero BOGO history | Ordinary zero-value candidates excluded; capped already-selected BOGO provenance can remain for usage/history; keep this distinction in financial verification |

The user clarified that delivery was intended in smaller V1 phases. Differences are documented here as scope/revision notes; they are not reported as deployed defects. Source-based supplementary checks remain useful without requiring every broad discovery capability in Backend V1.

## Supplied planning sources

- [Discounts & BOGO](https://docs.superhuman.com/d/Product-Planning_d8UW6ZhZ3mt/Discounts-BOGO_suDV8fpx)
- [BOGO Solution Design](https://docs.superhuman.com/d/Product-Planning_d8UW6ZhZ3mt/BOGO-Solution-Design_suq7z6VS)
- [BOGO Client Interview Handoff](https://docs.superhuman.com/d/Product-Planning_d8UW6ZhZ3mt/BOGO-Client-Interview-Handoff_suFn7b67)
- [BOGO Backend Technical Plan — Revised](https://docs.superhuman.com/d/Product-Planning_d8UW6ZhZ3mt/BOGO-Backend-Technical-Plan-Revised_su8AspDx)
- [BOGO Product Requirements](https://docs.superhuman.com/d/Product-Planning_d8UW6ZhZ3mt/BOGO-Product-Requirements_su9-1Tvo)

All five page bodies were read; long Solution Design/revised-plan pages were paginated to their ends. PRD Stories/UAT table was read in two pages (101 rows: 12 stories and 89 criteria); terms/examples/confirmed-decision tables were also read. Coda transient authentication messages were retried successfully. Links were used as document context, not live application-browser authorization.

## SPW-19401 — plan (promotions) | scope BOGO promotion support

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-19401-discovery|Canonical detail note]] · Jira status: Complete

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-19401-AC01 | Fan Expo-specific BOGO requirements are documented. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19401-AC02 | Current discount/voucher/promo capabilities are compared against the desired BOGO behavior. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19401-AC03 | Implementation options are broken into one or more dev-ready tickets if platform work is required. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19401-AC04 | Refund/exchange/reporting implications are explicitly captured before implementation. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |

## SPW-19928 — [Fan Expo P2] BOGO Discovery: Update solution design and planning docs

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-19928-planning-documents|Canonical detail note]] · Jira status: Complete

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-19928-AC01 | The design/planning artifact is the current source of truth for BOGO discovery. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19928-AC02 | The doc links the correct Coda sources: Product Planning `Discounts`, Product Planning `Auto Discounts`, `Discounts & BOGO`, and `BOGO Solution Design`. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19928-AC03 | Scope states that BOGO must support code-driven and auto-applied paths. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19928-AC04 | Non-goals and unresolved questions are explicit, especially stacking, reward selection, package behavior, hidden ticket types, and whether reward tickets can ever be auto-added. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19928-AC05 | No implementation tickets are created from this task. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |

## SPW-19929 — [Fan Expo P2] BOGO Discovery: Prepare planning packet for discount owners

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-19929-decision-packet|Canonical detail note]] · Jira status: On Deck

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-19929-AC01 | One decision packet reflects the revised automatic-only scope. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19929-AC02 | Accepted, deferred, and rejected behavior is explicit. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19929-AC03 | The packet links the revised technical plan and its open-decision table. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19929-AC04 | Every open decision has a role owner and a recorded outcome or blocker. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19929-AC05 | No backend delivery tickets are created from this task. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |

## SPW-19930 — [Fan Expo P2] BOGO Discovery: Finalize edge cases, acceptance criteria, and QA review

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-19930-edge-case-review|Canonical detail note]] · Jira status: On Deck

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-19930-AC01 | Product and Finance decisions are recorded in the revised technical plan. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19930-AC02 | QA has approved the edge-case matrix and acceptance criteria or documented exact blockers. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19930-AC03 | The first-cohort financial ownership policy is explicit. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19930-AC04 | The required clients and payment providers are named. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19930-AC05 | Test data and environment needs are recorded. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19930-AC06 | SPW-19933 can be re-reviewed against this output. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19930-AC07 | No backend delivery tickets are created until SPW-19933 is approved. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |

## SPW-19931 — [Fan Expo P2] BOGO Discovery: Validate discount use cases beyond Fan Expo

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-19931-client-validation|Canonical detail note]] · Jira status: In Progress

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-19931-AC01 | Candidate clients or segments are identified. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19931-AC02 | Validation notes are captured. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19931-AC03 | The output separates accepted first-release behavior from deferred demand. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19931-AC04 | Client-derived acceptance criteria are ready for SPW-19930. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19931-AC05 | Any recommendation to change the revised scope is explicit and routed to Product. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19931-AC06 | No implementation tickets are created from this task. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |

## SPW-19932 — [Fan Expo P2] BOGO Discovery: Define buyer presentation and checkout behavior

[[03 Test Cases/Discounts/BOGO/Customer/SPW-19932-buyer-presentation|Canonical detail note]] · Jira status: On Deck

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-19932-AC01 | Buyer-facing behavior is approved for every required first-cohort surface. | Planning/document review; no approval/interview/UX delivery claimed. Buyer summary/presentation Blocked on its phase revision. |
| SPW-19932-AC02 | The design uses the backend response as the only calculation authority. | Planning/document review; no approval/interview/UX delivery claimed. Buyer summary/presentation Blocked on its phase revision. |
| SPW-19932-AC03 | Automatic-only behavior and customer-selected quantities are explicit. | Planning/document review; no approval/interview/UX delivery claimed. Buyer summary/presentation Blocked on its phase revision. |
| SPW-19932-AC04 | Assigned-seat visibility is decided. | Planning/document review; no approval/interview/UX delivery claimed. Buyer summary/presentation Blocked on its phase revision. |
| SPW-19932-AC05 | The UX states what can be shown under the approved financial ownership policy. | Planning/document review; no approval/interview/UX delivery claimed. Buyer summary/presentation Blocked on its phase revision. |
| SPW-19932-AC06 | A frontend delivery task may be drafted only after this task and the relevant Finance decision are approved. | Planning/document review; no approval/interview/UX delivery claimed. Buyer summary/presentation Blocked on its phase revision. |
| SPW-19932-AC07 | No frontend implementation ticket is created from this task. | Planning/document review; no approval/interview/UX delivery claimed. Buyer summary/presentation Blocked on its phase revision. |

## SPW-19933 — [Fan Expo P2] BOGO Discovery: Create technical implementation plan

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-19933-technical-gate|Canonical detail note]] · Jira status: Code Review

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-19933-AC01 | Remove the WIP status from the canonical plan. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19933-AC02 | Resolve every open decision or record an accepted blocker with an owner. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19933-AC03 | Reconcile stale code-driven and split-row assumptions in the discovery tickets. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19933-AC04 | Record the first-cohort financial ownership and long-term financial direction. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19933-AC05 | Record the supported clients and payment providers. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19933-AC06 | Record Product, Finance, Engineering, QA, and Operations approval. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19933-AC07 | Verify the draft task boundaries against current code. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |
| SPW-19933-AC08 | Confirm that each future Jira task will contain acceptance criteria, dependencies, tests, rollout notes, and a source-section pointer. | Planning/document review; no approval/interview/UX delivery claimed. Recorded phase distinctions retained in the detail note. |

**Textual dependencies / gates:** * SPW-19929 decision packet. * SPW-19930 QA-reviewed edge-case and acceptance matrix. * SPW-19931 client validation output or an explicit waiver. * SPW-19932 UX decisions for the first public client. * Product and Finance outcomes for every open decision in the canonical source. * Current web-app code verification for the named model, service, serializer, financial, purchase, and post-purchase anchors.

## SPW-20174 — [Fan Expo P2] BOGO Backend: Add Buy/Get discount data models

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20174-data-models|Canonical detail note]] · Jira status: BETA QA

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20174-AC01 | Positive Buy X and Get Y quantities are accepted. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC02 | Zero and invalid quantities are rejected. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC03 | One `Discount` cannot own more than one Buy/Get rule. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC04 | A qualifier ticket type cannot be added twice to one rule. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC05 | A Buy/Get rule rejects a non-BOGO discount and a BOGO discount that does not use `APPLY_TO_EACH`. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC06 | Qualifier and reward ticket types must belong to the owning discount venue. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC07 | `TicketTypeDiscountPermission` behavior remains unchanged. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC08 | Existing `DiscountRule` threshold behavior remains unchanged. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC09 | Existing non-BOGO discounts remain valid. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC10 | Existing usage-limit fields remain available and continue to count rewarded units. No cycle limit or qualifier-usage counter is added. | Admin preparation + model validation/backend tests; legacy TC-L01; unexecuted. |
| SPW-20174-AC11 | Migration forwards, project-state checks, and `makemigrations --check --dry-run` pass. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |
| SPW-20174-AC12 | Focused model tests pass through the dedicated Codex test environment. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |

**Textual dependencies / gates:** * SPW-19933 must be approved before merge or release. * Product and Engineering must reconcile the live plan's product and membership scope with the standalone-ticket boundary used by this task. * Automatic discovery, evaluator logic, promotion coordination, basket recalculation, purchase validation, financial behavior, administration, API work, and rollout controls belong to later slices. * No BOGO behavior may be enabled in production from this task.

## SPW-20175 — [Fan Expo P2] BOGO Backend: Add internal configuration and automatic discovery

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20175-configuration-and-discovery|Canonical detail note]] · Jira status: BETA QA

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20175-AC01 | An internal operator can create, inspect, update, disable, and re-enable a valid ticket BOGO. | Admin preparation, TC-O04 and cache/gate/backend tests; unexecuted. |
| SPW-20175-AC02 | Invalid, incomplete, non-ticket, or cross-venue definitions fail with useful validation errors. | Admin preparation, TC-O04 and cache/gate/backend tests; unexecuted. |
| SPW-20175-AC03 | Switch-off discovery returns no BOGO candidates. | Admin preparation, TC-O04 and cache/gate/backend tests; unexecuted. |
| SPW-20175-AC04 | Discovery does not change regular auto-discount cap behavior. | Admin preparation, TC-O04 and cache/gate/backend tests; unexecuted. |
| SPW-20175-AC05 | Cache construction is bounded and does not issue one query per promotion. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |
| SPW-20175-AC06 | Focused admin, cache, invalidation, ordering, gate, and query-count tests pass. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |

## SPW-20176 — [Fan Expo P2] BOGO Backend: Implement Buy/Get evaluator and coordinator

[[03 Test Cases/Discounts/BOGO/Customer/SPW-20176-allocation|Canonical detail note]] · Jira status: BETA QA

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20176-AC01 | Canonical single- and multi-promotion examples match the revised plan. | TC-C01/C04/C05/C08/C09 plus evaluator/coordinator oracle; unexecuted. |
| SPW-20176-AC02 | Results are invariant to input, queryset, and cache ordering. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |
| SPW-20176-AC03 | Group quantities remain grouped rather than expanding into per-unit objects. | TC-C01/C04/C05/C08/C09 plus evaluator/coordinator oracle; unexecuted. |
| SPW-20176-AC04 | Exhaustive small-state comparisons and randomized comparisons agree with the production algorithm. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |
| SPW-20176-AC05 | Focused tests cover arbitrary X:Y, assigned seats, ties, caps, competing promotions, large quantities, and query-free execution. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |

## SPW-20177 — [Fan Expo P2] BOGO Backend: Integrate automatic basket application and purchase validation

[[03 Test Cases/Discounts/BOGO/Customer/SPW-20177-baskets-and-checkout|Canonical detail note]] · Jira status: BETA QA

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20177-AC01 | BOGO appears and disappears as eligible basket quantities change. | TC-C02/C03/C06/C07/C10/C11 + TC-B01; locked/stale/race/provider backend tests; unexecuted. |
| SPW-20177-AC02 | Multiple BOGOs and compatible discounts persist exact allocations. | TC-C02/C03/C06/C07/C10/C11 + TC-B01; locked/stale/race/provider backend tests; unexecuted. |
| SPW-20177-AC03 | Every switch, venue, date, checkout, and usage gate fails closed. | TC-C02/C03/C06/C07/C10/C11 + TC-B01; locked/stale/race/provider backend tests; unexecuted. |
| SPW-20177-AC04 | Usage limits cap rewarded units and release through existing basket lifecycle behavior. | TC-C02/C03/C06/C07/C10/C11 + TC-B01; locked/stale/race/provider backend tests; unexecuted. |
| SPW-20177-AC05 | Payment setup rejects stale allocations; confirmed payment finalizes saved values. | TC-C02/C03/C06/C07/C10/C11 + TC-B01; locked/stale/race/provider backend tests; unexecuted. |
| SPW-20177-AC06 | Focused API, stacking, usage, concurrency, retry, and callback tests pass. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |

## SPW-20178 — [Fan Expo P2] BOGO Backend: Prove financial lifecycle and operations parity

[[03 Test Cases/Discounts/BOGO/Operations and Post-Purchase/SPW-20178-financial-lifecycle|Canonical detail note]] · Jira status: BETA QA

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20178-AC01 | BOGO values match equivalent current automatic APPLY_TO_EACH discount behavior. | TC-O01/O02/O03/O04; named Exchange/Transfer/financial/backend setup gates; unexecuted. |
| SPW-20178-AC02 | Per-discount amounts reconcile at basket and invoice levels. | TC-O01/O02/O03/O04; named Exchange/Transfer/financial/backend setup gates; unexecuted. |
| SPW-20178-AC03 | Refund, void, exchange, transfer, and usage-release paths preserve existing accounting rules. | TC-O01/O02/O03/O04; named Exchange/Transfer/financial/backend setup gates; unexecuted. |
| SPW-20178-AC04 | Disabling BOGO keeps historical records and confirmed purchases readable. | TC-O01/O02/O03/O04; named Exchange/Transfer/financial/backend setup gates; unexecuted. |
| SPW-20178-AC05 | Metrics use bounded labels. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |
| SPW-20178-AC06 | Focused financial, post-purchase, report/export, disablement, rollback, and provider-finalization tests pass. | Backend/API verification planned and unexecuted; owning tests/receipt in canonical note. |

## SPW-20179 — [Fan Expo P2] BOGO Backend: Integrate the complete MVP and freeze the QA candidate

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20179-integration-freeze|Canonical detail note]] · Jira status: BETA QA

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20179-AC01 | Complete BOGO-focused tests pass from the integration head. | Deferred execution/review receipt; TC-C02/TC-B01/TC-O01 smoke does not replace this engineering criterion. |
| SPW-20179-AC02 | Existing discount regression tests pass in proportion to touched risk. | Deferred execution/review receipt; TC-C02/TC-B01/TC-O01 smoke does not replace this engineering criterion. |
| SPW-20179-AC03 | Every draft PR final head receives a clean independent review. | Deferred execution/review receipt; TC-C02/TC-B01/TC-O01 smoke does not replace this engineering criterion. |
| SPW-20179-AC04 | CI is read back for every PR. | Deferred execution/review receipt; TC-C02/TC-B01/TC-O01 smoke does not replace this engineering criterion. |
| SPW-20179-AC05 | No unresolved in-scope findings remain. | Deferred execution/review receipt; TC-C02/TC-B01/TC-O01 smoke does not replace this engineering criterion. |
| SPW-20179-AC06 | The frozen SHA is recorded for final QA. | Deferred execution/review receipt; TC-C02/TC-B01/TC-O01 smoke does not replace this engineering criterion. |
| SPW-20179-AC07 | No PR is merged or marked ready. | Deferred execution/review receipt; TC-C02/TC-B01/TC-O01 smoke does not replace this engineering criterion. |

## SPW-20180 — [Fan Expo P2] BOGO Backend: Execute final MVP QA and publish verification receipt

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20180-final-verification|Canonical detail note]] · Jira status: On Deck

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20180-AC01 | No in-scope scenario remains FAIL, BLOCKED, or NOT RUN. | Deferred execution/review receipt; All cases NOT RUN; final evidence and release gate required. |
| SPW-20180-AC02 | Every browser-visible flow has start, meaningful-action, and final-result screenshots with stable test IDs. | Deferred execution/review receipt; All cases NOT RUN; final evidence and release gate required. |
| SPW-20180-AC03 | Every image appears in the screenshot manifest and visual newspaper. | Deferred execution/review receipt; All cases NOT RUN; final evidence and release gate required. |
| SPW-20180-AC04 | Any defect reopens implementation, receives a fresh review, creates a new frozen SHA, and reruns affected plus smoke/regression coverage. | Deferred execution/review receipt; All cases NOT RUN; final evidence and release gate required. |
| SPW-20180-AC05 | Production-only checks are identified as release gates rather than claimed as verified. | Deferred execution/review receipt; All cases NOT RUN; final evidence and release gate required. |
| SPW-20180-AC06 | All PRs remain draft and unmerged. | Deferred execution/review receipt; All cases NOT RUN; final evidence and release gate required. |

## SPW-20662 — Redesign Discounts management and add BOGO configuration

[[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20662-discounts-management|Canonical detail note]] · Jira status: Code Review

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20662-AC01 | Discounts Manage is redesigned according to the approved Figma flow. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC02 | The current long auto-discount form is replaced or composed into the guided setup experience without breaking legacy discount flows. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC03 | The flow supports basic information, customer buys, customer gets, limits, active dates, locations, review, save, and edit. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC04 | BOGO configuration uses backend-owned entities and does not create frontend-only eligibility or financial state. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC05 | Existing Discount Code, Bulk Discount, and legacy Auto Discount behavior remains supported. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC06 | Loading, empty, error, disabled, permission, responsive, translated, and accessibility states are covered. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC07 | No public/customer-facing code is changed. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC08 | Known overlapping-BOGO itemized multi-discount rounding limitations are documented. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20662-AC09 | Required architecture, lint, typecheck, tests, builds, and React Doctor checks pass. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |

## SPW-20663 — Define Discounts redesign and BOGO configuration contract

[[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20663-contract|Canonical detail note]] · Jira status: On Deck

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20663-AC01 | Every Figma field/state is mapped to a current component, new component, or backend contract field. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20663-AC02 | The current FormValuesType is not expanded with unstructured BOGO fields. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20663-AC03 | Separate qualifier and reward permission shapes are defined. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20663-AC04 | Create, update, edit hydration, validation, permission, and rollout examples are documented. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20663-AC05 | Reusable existing components are identified for extraction or composition. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20663-AC06 | Unsupported combinations are documented. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20663-AC07 | The overlapping-BOGO rounding limitation and rollout restriction are documented. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20663-AC08 | SPW-20664 and SPW-20665 can proceed without unresolved contract assumptions. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |

## SPW-20664 — Implement redesigned Discounts Manage page and BOGO wizard

[[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20664-wizard|Canonical detail note]] · Jira status: In Progress

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20664-AC01 | Manage page matches the approved Figma structure and visual hierarchy. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC02 | Create Promotion opens the guided wizard. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC03 | The left stepper shows current, completed, and upcoming states. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC04 | Next is blocked or validation feedback is shown when the current step is incomplete. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC05 | Back navigation preserves state and invalidates incompatible downstream choices. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC06 | Customer buys supports approved minimum-spend, quantity, and BOGO conditions. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC07 | Customer gets supports approved ticket/discount reward configuration and BOGO reward targets. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC08 | Qualifying and reward target selectors are independent. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC09 | Limits and active dates match the redesigned card-based step states. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC10 | Keyboard and screen-reader users can operate the stepper, cards, selectors, and footer actions. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC11 | Existing regular, bulk, and legacy auto-discount flows remain functional. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC12 | Component and hook tests plus Storybook coverage are added. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20664-AC13 | No public/customer-facing code changes are included. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |

## SPW-20665 — Connect BOGO Manage-page persistence and edit mode

[[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20665-persistence|Canonical detail note]] · Jira status: On Deck

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20665-AC01 | A supported redesigned promotion can be created successfully. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20665-AC02 | An existing supported discount hydrates correctly into the wizard. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20665-AC03 | Create/update payloads match the confirmed backend contract. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20665-AC04 | Qualifier and reward permissions serialize independently. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20665-AC05 | Server validation and permission errors are actionable, translated, and draft-preserving. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20665-AC06 | Legacy discount records remain readable and editable within supported scope. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20665-AC07 | Contract and integration tests cover create, update, hydration, and error paths. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20665-AC08 | No public API or customer-facing UI change is introduced by this work. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |

## SPW-20666 — Test and roll out the BOGO Manage-page flow

[[03 Test Cases/Discounts/BOGO/Organizer and Venue/SPW-20666-rollout|Canonical detail note]] · Jira status: On Deck

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20666-AC01 | All in-scope Figma Manage-page and wizard states complete visual review. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20666-AC02 | Existing Manage page interactions remain functional. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20666-AC03 | Create, edit, validation, permission, loading, error, cancel, and success paths pass QA. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20666-AC04 | Accessibility review is complete. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20666-AC05 | Required architecture, lint, typecheck, tests, builds, and React Doctor checks pass. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20666-AC06 | Rollout owner, scope, default, rollback path, burn-in window, feedback sources, and retirement criteria are documented. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20666-AC07 | Temporary flags and compatibility code have explicit removal criteria. | Blocked on the Organizer phase revision; TC-L01 protects the current regular flow. Specific contract/control/backend verification is listed in the canonical card note. |

## SPW-20743 — feat Update discounts viewset for BOGO

[[03 Test Cases/Discounts/BOGO/Admin and Support/SPW-20743-organizer-api|Canonical detail note]] · Jira status: Code Review

| Criterion | Original Jira requirement | Planned verification / disposition |
| --- | --- | --- |
| SPW-20743-AC01 | Supports creating, listing/retrieving, updating, and deleting BOGO discounts. | Blocked on the Organizer phase revision; Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20743-AC02 | Follows the existing discount API patterns for validation and permissions. | Blocked on the Organizer phase revision; Specific contract/control/backend verification is listed in the canonical card note. |
| SPW-20743-AC03 | Includes focused coverage for the CRUD operations. | Blocked on the Organizer phase revision; Specific contract/control/backend verification is listed in the canonical card note. |

## Product Requirements — supplementary criterion map

This table maps each supplied PRD criterion independently by its stable Coda row ID. These are document criteria, not original Jira acceptance criteria. They are kept alongside the V1 phase note so broader desired behavior is not lost. All are unexecuted.

| Row / story | Requirement summary | Planned proof / phase disposition |
| --- | --- | --- |
| i-ubm3OEu5QL / US-01 | an organizer with access to manage discounts is working in a venue ; they create a discount and choose BOGO  → the setup shows the offer details, eligible items, limits, active dates, and status needed to configure the promotion. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-OqD5QVChh8 / US-01 | an organizer does not have access to manage discounts ; they attempt to create or change a BOGO promotion  → the action is unavailable and the saved promotion remains unchanged. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-78et_UT75H / US-01 | an organizer opens a new BOGO promotion ; the setup first loads  → the promotion is disabled and cannot affect customer baskets until a valid setup is saved and enabled. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-qSKcWZt-eY / US-01 | an organizer has completed a valid BOGO setup ; they save the promotion  → one promotion is created for the venue and reopening it shows the saved values. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-360-66UVoq / US-01 | required BOGO information is missing ; the organizer attempts to save  → the save is blocked, no partial promotion is created, and each affected field shows a clear correction message. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-vY3ozKH3da / US-01 | a promotion identifier is already used in the venue ; the organizer attempts to save the duplicate value  → normal discount validation blocks the save and identifies the field that must be corrected. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-PJJ9ilsRPq / US-01 | an organizer is editing an existing BOGO promotion ; they cancel the edit  → the previously saved promotion remains unchanged. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-wweNvWnu_8 / US-01 | an organizer saves a new or changed BOGO promotion ; the save fails  → no partial change is kept, the previous valid values remain intact, and a clear retry message is shown. | Organizer phase Blocked; backend/Admin validation planned; TC-L01 legacy control |
| i-B85h8RcjtJ / US-02 | an organizer is configuring BOGO eligibility for a venue ; they open the eligible-item selector  → the selector shows the venue’s supported tickets, products, and memberships. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-BZ_i-BtCm4 / US-02 | an organizer opens eligibility for a new BOGO promotion ; the selector loads  → no item is selected by default. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-fB7GETarRB / US-02 | an organizer selects supported items and saves the promotion ; they reopen the eligible-item selector  → the selected items remain selected and unselected items remain ineligible. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-uve_nFXVwM / US-02 | a promotion includes more than one eligible item ; a basket contains quantities of different eligible items  → each item qualifies only its own BOGO reward and quantities from different items are not combined. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-_23fdzRV6k / US-02 | the venue has packages, package components, gift cards, or vouchers ; the organizer configures eligible items  → those unsupported items cannot be selected for BOGO. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-jxE0mcyyrU / US-02 | an item belongs to another venue ; the organizer configures eligible items  → the item cannot be added to the promotion and a clear message explains why. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-aOcUIlatTA / US-02 | no eligible item is selected ; the organizer attempts to save or enable the promotion  → the action is blocked and the organizer is told to select at least one supported item. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-wjN9h4CNhZ / US-02 | an organizer removes an item from an existing BOGO promotion ; they save the change  → new and editable baskets stop qualifying through that item while completed purchases remain unchanged. | Organizer selectors Blocked; TC-C05/C08 and cache/model scoped negatives; product/membership and per-item/no-pooling requirements are phase differences |
| i-H2JUHPA28t / US-03 | an organizer is configuring a BOGO promotion ; they view the offer section  → Buy X, Get Y, reward type, and reward value are clearly shown. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-zim0WatOyG / US-03 | Buy X and Get Y are positive whole numbers and the reward is valid ; the organizer saves the offer  → reopening the promotion shows the same quantities and reward. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-Ovh2EpeT6z / US-03 | Buy X or Get Y is missing, zero, negative, or not a whole number ; the organizer attempts to save  → the save is blocked and each invalid quantity shows a clear correction message. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-HkXPHt0Q53 / US-03 | the reward value is outside the allowed range for its selected type ; the organizer attempts to save  → the save is blocked and the reward field shows a clear correction message. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-ApTiu2Ee7O / US-03 | a valid percentage or fixed-value reward is configured ; an eligible reward is applied  → the rewarded unit receives the configured reduction and all other units keep their otherwise applicable price. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-b88tu34pK8 / US-03 | a fixed-value reward is greater than the eligible item’s remaining price ; the reward is applied  → the item is reduced to zero and never below zero. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-HrTVY5bDCj / US-03 | a Buy 1/Get 1 promotion is active for an eligible item ; the basket quantity changes from one through four  → the rewarded quantities are zero, one, one, and two respectively. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-I9sUqIaAFM / US-03 | a Buy 2/Get 1 promotion is active for an eligible item ; the basket quantity changes from two through six  → quantities two, three, five, and six receive zero, one, one, and two rewards respectively. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-wKlx_iH72f / US-03 | a Buy 1/Get 3 promotion is active for an eligible item ; the basket quantity changes from one through four  → the rewarded quantities are zero, one, two, and three respectively. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-ZfnPSJKaQL / US-03 | eligible units have different prices ; the promotion chooses which unit receives the reward  → the lowest-priced eligible unit receives the reward. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-gOVN4irF5O / US-03 | an organizer changes a saved Buy X/Get Y rule or reward ; they save the change  → new and editable baskets use the new offer while completed purchases keep their recorded values. | TC-C01/C04/C05; wizard save/defaults Blocked; used configuration changes await organizer lock contract |
| i-16Pr7cCO4x / US-04 | an organizer enters valid active dates and usage limits ; they save the promotion  → reopening it shows the same dates and limits. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-d4lCEZ1qFf / US-04 | a promotion’s end time is not after its start time ; the organizer attempts to save  → the save is blocked and the date fields show a clear correction message. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-P_ZHDfiwo2 / US-04 | a usage limit is missing where required or has an invalid value ; the organizer attempts to save  → the save is blocked and the affected limit shows a clear correction message. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-891VjfpPpV / US-04 | a BOGO promotion is disabled or outside its active dates ; an otherwise eligible basket is recalculated  → the promotion does not apply and no new use is recorded. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-X5JEFu1K-q / US-04 | the promotion has reached its global, customer, or event limit ; another otherwise eligible basket is recalculated  → the available reward is reduced or removed so the configured limit is not exceeded. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-PZG8OCZhtN / US-04 | a promotion’s basket limit is lower than the number of unlocked rewards ; the basket is recalculated  → the rewarded quantity is capped at the basket limit, counted in rewarded items. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-1Xz7CtUZqx / US-04 | two purchases compete for the final available use ; both attempt to complete  → only the permitted use completes with BOGO and the other purchase is recalculated without the unavailable savings. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-qqCpO_JUSK / US-04 | a purchase using BOGO fails or is abandoned ; the normal reservation is released  → the attempt does not permanently consume promotion usage. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-VUCCWJDtY0 / US-04 | an organizer changes a saved date or limit ; they save the change  → new and editable baskets use the new value while completed purchases remain unchanged. | TC-C07/C10 + backend date/limits/concurrency; manual dates need supported writer |
| i-NsWT1CnXqj / US-05 | an active BOGO promotion is available and the customer has selected enough eligible items ; the basket is recalculated  → the promotion applies without code entry and its name and savings are shown. | TC-C02/C06; named BOGO labels/summary Blocked on buyer presentation phase |
| i-RknuMpf9SU / US-05 | the customer has selected fewer eligible items than Buy X requires ; the basket is recalculated  → the BOGO promotion does not apply. | TC-C02/C06; named BOGO labels/summary Blocked on buyer presentation phase |
| i-vXlZQgkHTO / US-05 | a customer enters the promotion’s internal identifier as a discount code ; they submit the code  → the code does not activate BOGO and the normal invalid-code message is shown. | TC-C02/C06; named BOGO labels/summary Blocked on buyer presentation phase |
| i-mJlom2xLZN / US-05 | a BOGO promotion applies to the basket ; the customer completes checkout  → the completed order shows the same promotion and discount amount used for payment. | TC-C02/C06; named BOGO labels/summary Blocked on buyer presentation phase |
| i--LwOHWcGX4 / US-06 | a BOGO promotion could reward another item ; the customer has not selected that item  → the item is not added and no basket quantity increases. | TC-C03/C08 + backend seat preservation; no auto-insertion |
| i-JTGMia2tBB / US-06 | the customer adds or removes an eligible item ; the basket is recalculated  → each basket quantity remains exactly what the customer selected. | TC-C03/C08 + backend seat preservation; no auto-insertion |
| i-ml241f9DNS / US-06 | eligible assigned seats are in the basket ; BOGO chooses a rewarded quantity  → the customer’s selected seats are not replaced, added, or removed. | TC-C03/C08 + backend seat preservation; no auto-insertion |
| i-e7wZF7Hkk0 / US-06 | the basket contains items that are not eligible for BOGO ; the promotion applies  → every ineligible item remains unchanged. | TC-C03/C08 + backend seat preservation; no auto-insertion |
| i-Od_2vBWRCh / US-07 | the basket is one eligible item below a reward threshold ; the customer adds the next eligible item  → the newly available reward and updated total are shown. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-tKLQiz21IS / US-07 | the basket currently receives one or more BOGO rewards ; the customer reduces the eligible quantity  → the rewarded quantity and basket total update to match the remaining items. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-jeYov-X8ke / US-07 | the basket qualifies through an eligible item ; the customer removes that item  → the reward that depended on it is removed from the basket. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-B86evhdsWP / US-07 | the customer changes only an item that is not eligible for BOGO ; the basket is recalculated  → the BOGO rewarded quantity is unchanged. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-Vv05OQJYmL / US-07 | a promotion limit depends on the customer ; the basket customer changes  → BOGO eligibility and remaining use are recalculated for the new customer. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-_zvfGQTjgk / US-07 | a compatible discount is added to or removed from a BOGO basket ; the basket is recalculated  → the displayed discounts and payable total update to the current result. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-YIQapD-W6N / US-07 | a saved BOGO basket no longer matches current eligibility or usage ; the customer attempts to pay  → checkout shows the current total or blocks payment until the basket is corrected. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-CNGauyDfyW / US-07 | a basket change requires BOGO recalculation ; the recalculation fails  → the last saved basket remains unchanged and a clear retry message is shown. | TC-C03/C11 + controlled customer/stale/error backend checks |
| i-DAvyMt4BNA / US-08 | two BOGO promotions apply to different eligible items ; the basket qualifies for both  → both promotions apply and each shows its own savings. | TC-C09 + coordinator oracle; exact global-minimum wording is an algorithm/phase note |
| i-HonnCTU_Lu / US-08 | two BOGO promotions compete for the same qualifying item ; the basket does not contain enough separate items for both  → the same item supports only one promotion. | TC-C09 + coordinator oracle; exact global-minimum wording is an algorithm/phase note |
| i-ScjDH6ieUG / US-08 | two BOGO promotions can use the same eligible item ; the basket contains enough separate items for both  → both promotions may apply without reusing an item. | TC-C09 + coordinator oracle; exact global-minimum wording is an algorithm/phase note |
| i-73tnpJBHpd / US-08 | an item has already received a BOGO reward ; another BOGO promotion is evaluated  → the rewarded item is not reused as a qualifying or rewarded item. | TC-C09 + coordinator oracle; exact global-minimum wording is an algorithm/phase note |
| i-pD3uQyw3Qe / US-08 | the basket cannot satisfy every eligible BOGO promotion ; the applied promotions are selected  → the combination with the lowest total discount cost to the organizer is used. | TC-C09 + coordinator oracle; exact global-minimum wording is an algorithm/phase note |
| i-ieL0K3siMP / US-08 | the same basket and promotions are recalculated without any change ; the result is shown again  → the same promotions, rewarded quantities, savings, and total are returned. | TC-C09 + coordinator oracle; exact global-minimum wording is an algorithm/phase note |
| i-dE5Q9p-9YI / US-08 | one applied BOGO promotion becomes unavailable on an editable basket ; the basket is recalculated  → that promotion is removed and the remaining promotions are recalculated using the available items. | TC-C09 + coordinator oracle; exact global-minimum wording is an algorithm/phase note |
| i-8mpyREQmnk / US-09 | the venue allows multiple discounts and BOGO plus a compatible discount qualify ; the basket is recalculated  → both discounts apply through the normal supported stacking behavior. | TC-C11 + incompatible/capped stack backend; richer multi-promotion display phase gap |
| i-TGN2PJ00Ui / US-09 | the venue does not allow the discount combination ; the basket is recalculated  → only a permitted discount result is applied. | TC-C11 + incompatible/capped stack backend; richer multi-promotion display phase gap |
| i-HSMPLOn_gX / US-09 | BOGO and a compatible non-BOGO discount both apply ; the basket is priced  → BOGO is applied first and the other discount applies to the remaining item value. | TC-C11 + incompatible/capped stack backend; richer multi-promotion display phase gap |
| i-_Bf9x_EkEu / US-09 | combined discounts would reduce an item below zero ; the basket is priced  → the total discount is capped at the item’s remaining value. | TC-C11 + incompatible/capped stack backend; richer multi-promotion display phase gap |
| i-0JboAGm8Qz / US-09 | one discount is removed from an editable BOGO basket ; the basket is recalculated  → the removed discount disappears and the savings and total update. | TC-C11 + incompatible/capped stack backend; richer multi-promotion display phase gap |
| i-3jMBiETQYH / US-09 | more than one discount applies to the basket ; the customer views the basket or completed order  → each promotion and its savings are shown through the normal discount presentation. | TC-C11 + incompatible/capped stack backend; richer multi-promotion display phase gap |
| i-7qu8Rm8f7X / US-10 | a completed order contains a BOGO promotion ; an organizer opens a transaction or report that shows discounts  → the BOGO name, rewarded quantity, and discount amount are shown. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-xxUjBraVhi / US-10 | one order contains more than one BOGO promotion ; an organizer views or exports the order  → each promotion and its rewarded quantity and discount amount are shown separately. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-To4VlPwHyP / US-10 | one order contains BOGO and other discounts ; an organizer views or exports the order  → each discount is shown separately and their combined amount matches the order total. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-pZD5Q_xv4A / US-10 | an organizer compares a BOGO report with its completed order ; the values are reviewed  → the merchandise amount, discounts, fees, taxes, and final total match the recorded order. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-wNxnAFXntP / US-10 | an existing export includes discount information ; the export contains BOGO orders  → the same BOGO details are included without changing unrelated order rows. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-21_PNsRK52 / US-10 | a BOGO promotion is later changed, disabled, or deleted ; an organizer views a completed order  → the original BOGO details and purchase values remain unchanged. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-ss_lZoYi0q / US-10 | an organizer does not have access to the relevant transaction or report ; they attempt to view BOGO details  → the information is not shown. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-dJnPx2zqh5 / US-10 | a valid report period contains no BOGO activity ; the organizer runs the report  → the report shows no BOGO results or zero values without an error. | TC-O01/O04 + export/backend; detailed row presentation depends on existing report contract |
| i-nRZW0AIFr4 / US-11 | a staff member with refund permission is on the Transactions page ; they open an order containing BOGO items  → the items can be refunded through the standard Showpass refund flow and their recorded refundable amounts are shown. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-rX7P9hlJKj / US-11 | a BOGO item was free or discounted at purchase ; the staff member refunds the item  → the refund does not exceed the item’s recorded refundable value. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-IqjPnv_9NG / US-11 | an order contains BOGO items and other items ; the staff member refunds only selected items  → the selected items follow the standard refund outcome and every unselected item remains unchanged. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-jF0AZDOegi / US-11 | all refundable items in a BOGO order are selected ; the staff member completes the refund  → the recorded refundable total is returned and normal inventory and customer-confirmation behavior applies. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-K6PVTrM1yM / US-11 | the BOGO promotion has changed since the purchase ; the staff member refunds an item from the historical order  → the refund uses the item’s recorded purchase value rather than the current promotion. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-VkJ2AQZK1x / US-11 | a staff member does not have refund permission ; they view the BOGO order  → the refund action is unavailable and the order remains unchanged. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-huUxOebtkx / US-11 | a BOGO refund is submitted ; the refund fails  → the order remains unchanged and the standard refund retry or support path is shown. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-XdGMjO3lG5 / US-11 | a BOGO refund completes ; the staff member views the transaction or report  → the refund is shown while the original BOGO sale and discount remain in the history. | TC-O02 + backend adjustment permission/failure/full refund/history; saved allocation and provider setup required |
| i-6PNFdssPBg / US-12 | a staff member with exchange permission opens an order containing BOGO items ; they begin an exchange  → the standard Showpass exchange flow shows each selected item’s recorded exchange value. | Exchange manual Blocked on supported controls/values; backend integration and saved-value cap planned |
| i-6-4i0-HYZo / US-12 | a BOGO item was free or discounted at purchase ; the staff member exchanges the item  → the item does not create exchange credit greater than its recorded value. | Exchange manual Blocked on supported controls/values; backend integration and saved-value cap planned |
| i-hw78wqfiz2 / US-12 | the replacement item costs more than the selected BOGO item’s recorded value ; the exchange is priced  → the customer owes the positive difference. | Exchange manual Blocked on supported controls/values; backend integration and saved-value cap planned |
| i-THPlkz5cVg / US-12 | an order contains BOGO items and other items ; the staff member exchanges only selected items  → every unselected item remains unchanged. | Exchange manual Blocked on supported controls/values; backend integration and saved-value cap planned |
| i-2kgACabbT3 / US-12 | the BOGO promotion has changed since the purchase ; the staff member exchanges an item from the historical order  → the exchange uses the item’s recorded purchase value rather than the current promotion. | Exchange manual Blocked on supported controls/values; backend integration and saved-value cap planned |
| i-eHJgdWc47z / US-12 | a staff member does not have exchange permission ; they view the BOGO order  → the exchange action is unavailable and the order remains unchanged. | Exchange manual Blocked on supported controls/values; backend integration and saved-value cap planned |
| i-g3esae_ern / US-12 | a BOGO exchange is submitted ; the exchange fails  → the order remains unchanged and the standard exchange retry or support path is shown. | Exchange manual Blocked on supported controls/values; backend integration and saved-value cap planned |
| i--LWTwY4Vrv / US-12 | Completed exchange shows exchanged items and resulting amounts while retaining original BOGO sale history | Exchange/report backend integration planned; manual Blocked on configured exchange flow |

## Derived regression checks

Quantity transitions, excluded $15 ticket, same-event mixed-price reverse order, value-above-price cap, internal-code rejection, cash attribution, proportional partial-refund usage, historical Is public disablement and legacy description save/reopen are explicit regression checks. They support original acceptance intent but are not additional Jira criteria or evidence of execution. See [[03 Test Cases/Discounts/BOGO/02 Coverage and Readiness|the complete coverage ledger]].
