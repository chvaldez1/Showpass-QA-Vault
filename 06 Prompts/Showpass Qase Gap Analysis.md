---
title: Showpass Qase Gap Analysis
tags:
  - qa/prompt
  - qase
  - gap-analysis
---

# Showpass Qase Gap Analysis

Compare existing Qase cases with verified product behavior, then deliver **focused, standalone Qase-ready cases**. The analysis supports the cases; the user should not have to read an audit report to execute them.

## Authorities and Scope

Apply [[00 Start Here/World-Class Software Quality Standard]], [[05 Tooling/Qase Test Case Writing Rules]], [[05 Tooling/qasectl]] and `AGENTS.md`. Use [[06 Prompts/Showpass QA Test Case Generator]] for shared source investigation, Jira/PR intake, relevant handbook selection, browser boundaries and Dashboard UI organization. Do not duplicate those rules here.

Default to the requested workflow. Full-page requests account for all relevant controls/states; exact-ID reviews stay within those IDs unless gap/duplicate analysis or a new case is requested. The latest user instruction controls case count and output format. Never preserve an earlier one-case constraint after the user requests a split.

## Procedure

1. **Reuse the evidence and establish the read path.** Find the existing canonical note and preserve user edits. Follow the CLI/API read-path check in [[05 Tooling/qasectl#CLI And API Read Path]] before the first Qase read. Reuse a complete Qase snapshot when project, retrieval time and scope remain applicable; refresh only for changed/missing evidence. Record counts/time/filters briefly. An incomplete read makes absence Unknown, not Missing.
2. **Read the linked suite before comparing coverage.** Apply [[05 Tooling/qasectl#Linked Suite Review]]: read the full contents of every in-scope suite case, including cases hidden by the pasted search filter, before deciding what to split, enhance or add. Record retrieved and fully reviewed counts separately. Then inspect related cases outside the suite. Compare the reviewed setup, parameters, actions and outcomes with backend truth, frontend paths and relevant existing assertions. Follow shared consumers; use selected handbook knowledge and authorized non-saving inspection in an already-open relevant browser. Source, browser observations and executed results remain distinct. Do not describe a suite as read when only its title list or selected cases have been reviewed.
   For replacement pages, embeds and navigation changes, apply [[00 Start Here/World-Class Software Quality Standard#Preserve Access During Page Migrations]] before declaring base coverage complete. Compare previous business functions with replacement paths from the actual user landing page, including moved functions outside the new sidebar. Record visible navigation access separately from direct URL access and screen behavior; preserve navigation scope when deeper owning-screen tests are deferred.
3. **Choose case responsibilities.** Map each distinct proof target to Keep, Enhance, New, Duplicate candidate, or Blocked. Apply [[05 Tooling/Qase Test Case Writing Rules#Case Strength Review]] to existing cases as well as proposed drafts: a matching title or generic rejection is insufficient when the setup and assertions cannot distinguish the business rule being checked. Preserve an existing case's useful coverage; record where it goes if the user requests a split. Check neighboring cases before creating a duplicate.
   For applicable financial and sellable-item scope, use [[00 Start Here/World-Class Software Quality Standard#Financial and Core Transaction Gates]] as the required coverage check. A field-display case cannot stand in for successful saving, purchase, price/fee protection, duplicate-charge prevention or overselling protection. Reuse suitable existing cases; expose missing setup and unverified exceptions instead of assuming the gate is covered.
4. **Split by behavior.** Separate clean success, authentication/navigation, invalid input, permission visibility, saved configuration, pending/rejected completion and recovery when their starting state, actions or expected result differ. Do not put a successful flow followed by a second validation/recovery test inside one case. Parameterize repeated actions with different data only when one short mapping and one step set remain easy to follow.
5. **Write the cases first.** Each case has one clear purpose, ordinary product language, complete fields, exact necessary setup and observable expected results. A typical focused case has a handful of steps; split when a person must change goals, switch actors repeatedly, or follow long conditional instructions. This is a readability check, not a hard step-count limit.
6. **Account for remaining work.** Use one compact table after the cases to map proof targets, existing IDs, proposed local labels and planned/blocked/deferred/manual-only/not-applicable scope with reasons. Keep inaccessible setup and unresolved expectations out of supposedly runnable cases; name the exact missing fact instead of inventing fault injection, flags, record fields or outcomes.
7. **Review each copied case alone.** Apply the Copy-to-Qase Review Gate. Check all Description mappings, Preconditions, Steps and Postconditions without the surrounding note. Verify Markdown with the reusable Qase parser locally when useful, without contacting Qase or preparing an apply operation. Preserve full case fields when revising from feedback.

## Deliverable

Maintain **one active note**, normally `03 Test Cases/<feature>/<feature-or-scenario>-qase-test-cases.md`. Reuse an existing canonical filename even when it ends in `-qase-gap-analysis.md`; change its title/layout instead of leaving a parallel draft. Do not overwrite a template.

Order the note as follows:

1. **Brief result:** what coverage was checked, which cases need enhancement/addition, and whether anything blocks execution. Keep it to a few lines and a short case index if useful.
2. **Qase-ready cases:** full fields, grouped by visible page/workflow. For Dashboard pages follow [[03 Test Cases/Test Cases by Feature#Dashboard UI Organization]]. Mark proposed updates with real `SPT-*` IDs and uncreated cases with local `TC-*` headings. Keep those labels and suite/write commentary outside the Qase Title and execution fields.
3. **Supporting notes:** a compact coverage/traceability table, exact source revisions, Qase query completeness, evidence conflicts, execution limits and retained browser findings. Use a collapsed Obsidian callout for lengthy source/evidence detail. Retain evidence and cleanup facts; do not put giant source tables before the cases.

For a PR review, make the compact case index distinguish direct PR checks from regression checks and identify Keep/Update/Create with the real Qase ID once published. Keep proposed local labels separate from assigned IDs. After an approved push, update that same index and publication record rather than leaving the user to reconstruct the result from historical previews.

Do not require an executive report, separate inventories and matrices repeating the same facts, a fixed full-product scenario matrix, or a second output file. Canonical scope/proof/evidence obligations still apply and can be satisfied by a compact coverage table and supporting notes.

## Case Readability Rules

- Give each case a descriptive title and one principal result. Do not bundle new registration, pending verification, admin-only fields and failure recovery into one large test.
- For package work, apply [[05 Tooling/Qase Test Case Writing Rules#Package Events And Guest Information]]. Make the parent event, different child events, included quantities and any separate regular ticket explicit in each case. A single Venue's saved setup does not establish coverage of all supported package configurations.
- When splitting a large case, show a short old-ID → enhanced/new-ID map and retain every useful scenario. Keep answer preservation, clean purchase, quantity controls, rejected increases, removal and financial calculation checks focused. Give technical follow-ups readable titles and supported setup, or leave them clearly marked as developer/API checks.
- Put Platform/View in Description. Mention relevant page versions, account states, timezones and selected runs there; do not turn every context choice into a Qase parameter or repeat every axis in every case.
- Use zero parameters when context notes suffice; use one small parameter for repeated data-driven checks when it improves execution. Keep dependent choices together and state the selected run rule.
- Use readable Single parameters only for meaningful setup variations, explain every value in Description, and verify their actual saved Qase structure after an approved push. Review the full changed set, not only the cases that already had parameters. Never report a pending draft or stored definition as an executed pass.
- Include only essential permissions, gates, starting records and safe data in Preconditions. Repeat essential setup inside each standalone case, not generic workflow commentary.
- Put one observable action and result in each step. Name visible controls; keep implementation terms and source links in supporting notes.
- Distinguish Qase-ready **case content** from live execution and setup availability. Known missing setup is explicitly Blocked; a pasted link or a saved case definition is not a pass.

## Qase Writes

This is a read-only workflow. Local case drafts and parser checks do not authorize creating, changing, moving or deleting Qase cases/suites. A later write follows [[05 Tooling/qasectl]]: exact-scope preview, user confirmation, reusable batch script where applicable and readback verification. Never silently narrow an existing case or delete a duplicate.

## Quick Start

```text
Use [[06 Prompts/Showpass Qase Gap Analysis]].
Compare Qase coverage for [feature/page/workflow], including [known IDs if any].
Deliver focused Qase-ready cases in the existing canonical note.
[Add required clients, roles, configurations or scope limits only when needed.]
```
