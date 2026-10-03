---
title: Test Bulk Jobs Imports and Recovery by Individual Result
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test Bulk Jobs Imports and Recovery by Individual Result

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Organizer or authorized Employee submits bulk work, understands which rows succeeded, and can recover supported work without duplicate Customers, Memberships, tickets, emails, or charges. A progress bar or green job status is not proof the expected recipients received every promised item.

A resumable import and a provider polling job can share a progress record while having different workers and recovery rules.

## Prepare a deliberately small input

Start with five controlled rows: two valid new records, one valid existing record, one invalid row, and one duplicate/edge row. Define each row's expected result using the selected importer's rules. Use the actual template/required columns; do not assume all importers permit partial success.

For Customer imports, prepare UTF-8 data, mixed-case display names and email, optional/blank fields, and explicit contact/SMS preferences. For Membership benefit batches, list each Member and every promised Event/ticket quantity. Record expected emails/provider side effects separately from local record creation.

## Preview → confirmation → row outcomes

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the permitted Employee, open the selected supported import/bulk tool and upload the prepared file or selection. | Known five-row expectation list | Parsing validates the actual columns, encoding, ownership, and values; unsupported input is clearly rejected. |
| 2 | Review preview errors/warnings and select only intended valid rows where that workflow supports selection. | Exact row identities | Preview has not created the final records. Errors identify the rows and correction needed. |
| 3 | Confirm once and keep the original job reference. | Selected rows | One intended job is accepted; duplicate submit/reuse is handled according to the import contract. |
| 4 | Wait for final job state and obtain success/error results. | Original job, expected rows | Outcome distinguishes complete, partial errors, failure, and interruption as applicable. Counts are accurate and explainable. |
| 5 | Reopen every resulting Customer/Member/Event/order affected by this small input. | Per-row expectation list | Correct identities, values, quantities, and ownership. No valid row silently missing, duplicate, or assigned to another Customer. |
| 6 | Verify any promised downstream effect through its actual test destination. | Approved inbox/provider records | Necessary benefits/notifications/provider updates are present; local save is not substituted for downstream completion. |

## Recovery is a second test, not cleanup

In an engineering-prepared isolated run, interrupt after a known completed batch. Use only the recovery mechanism supported by that execution mode. Compare the original row list against the recovered results: already committed work is not duplicated, remaining eligible work completes, errors remain attributable, and downstream side effects follow the import's explicit policy.

Pause/cancel of a resumable batch may stop at a checkpoint, not immediately. Already committed rows may remain. Do not promise pause/cancel/resume for polling jobs or specialized migrations unless their actual worker supports it. The current backend document explicitly warns that Package migration does not share all ordinary import checkpoint guarantees.

## Senior-QA variations

| Variation | What to prove |
| --- | --- |
| Same input twice or two confirmations | Duplicate policy applies to the actual selected rows, Venue, import type, and job states—not merely a filename warning. |
| Bad encoding or malformed CSV | Clear rejection; no partial unauthorized records. Customer imports require valid UTF-8, with optional BOM. |
| Existing Customer | Email normalization and linked-account precedence follow current rules; display-name casing and explicit preferences are not silently overwritten incorrectly. |
| Blank SMS preference | Current Customer import defaults and overwrite behavior are understood; no unintended marketing message is sent by setting the field. |
| Member benefit batch | Compare every Member against every expected Event/ticket, not just aggregate transaction count. |
| Partial downstream failure | Saved records and missing external effects are separately identified; safe retry does not repeat successful side effects. |
| Job reload/Employee handoff | Another correctly authorized Employee can inspect the same progress/results; wrong Venue cannot. |
| Scale beyond one batch | Exact unique recipient counts, progress checkpoints, memory/runtime expectations, and output integrity are measured in an approved environment. |

## Repairs and operational tools

A repair can change money, identity, admission, or Inventory. Do not run it as an exploratory diagnostic. Require exact targets, approved write scope, read-only preview where supported, before/after reconciliation, recovery plan, and verification of unaffected controls. Do not run scheduled recovery against live jobs just to see whether it helps.

**Source route:** B6, B23. Compare local persistence, provider polling, Member-specific issuance, and notification fanout separately. Bulk boundaries may deliberately differ from single-record creation.

## Source-backed cautions and automation reference

**Business risk:** import/generation/expiry job turns green with missing business results, or rerun duplicates money/tickets and modifies the wrong records. Anchors: SPD-2589, SPD-2646, SPD-2625, SPD-2665.

**Source caution:** import types differ in preview persistence, confirmation ownership, pause/cancel support, transaction scope, and checkpointing. A generic polling UI does not guarantee every job supports the same controls. Do not cancel workers or alter queues in a shared environment.

**Automation:** browser preview/confirm/persistence and row-result assertions; backend row transaction, retry, partial failure, duplicate execution, locks, and outbox tests. Monitoring must detect missing business results, not only task failure. Source route: B6, B23, B1, B2.
