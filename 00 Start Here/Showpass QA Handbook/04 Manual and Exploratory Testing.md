---
title: Manual and Exploratory Testing
date: 2026-10-01
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Manual and Exploratory Testing

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## How to execute a playbook

The recipes below are reusable test designs, **not standalone Qase-ready cases**. Before execution, bind each to the current client, visible labels, exact required permissions, actual flags, selected test records, expected calculation/policy, deadline, and cleanup. If the selected client lacks a described control, record Not applicable or identify its supported alternative; do not improvise a hidden route.

Each recipe states a starting screen, action, and proof. Use separate runs for clean success and failure/recovery. Any purchase, refund, stock change, check-in, import, or configuration save **changes test data**; use approved isolated records and provider test mode. Preserve original settings and references. Never rerun or refund live customer sales for this handbook.

Before calling a recipe executed, another team member must be able to perform it without source code. Convert it into the canonical `Step Action | Data | Expected Result` format for Qase or a formal run note, applying [[05 Tooling/Qase Test Case Writing Rules]]. Keep implementation details in source/automation notes, not manual steps.

### Apply the basic app checks alongside the domain recipe

These do not replace financial/fulfillment proof. They catch ordinary defects early in whichever Showpass screen changed. Bind values to the real field limits and product labels; do not submit unsafe extreme values to shared data.

| Control or state | Actions to account for | Observable result |
| --- | --- | --- |
| Required input | Submit blank, whitespace, valid value; fix the rejected value and resubmit | Clear relevant message; no partial unwanted save; valid correction succeeds and persists |
| Quantity / amount | Zero, minimum, maximum, just outside each boundary, negative, decimal in whole-number field, pasted value | Actual backend rule honored; no silent unexpected quantity/price change |
| Date / time | Select valid boundary, incompatible dates, clear optional date, reopen; compare relevant timezone | Correct saved date/time and eligibility, not just the visible picker value |
| Search / selector | Search, no results, choose, clear, reopen; keyboard select/Escape where provided | Correct saved identity; no old customer/item retained after clearing or venue switch |
| Modal / drawer | Open, cancel, reopen; dirty form close/discard; nested selection where present | Cancel does not save or consume entitlement; intended state survives or resets according to policy |
| Table / report | Filter, sort, next page, select rows, act on selected rows, empty result | Exact intended records affected; selection does not quietly include hidden/unintended rows |
| Rich content / upload | Realistic formatting/links/file, invalid file where safe, save/reopen/display | Supported content preserved; invalid input rejected; no broken public content or unintended file exposure |
| Slow / failed save | Controlled failure, read the message, reopen saved record before retry | User can determine what saved; no silent loss or duplicate mutation |
| Keyboard / narrow screen | Reach labels, controls, validation, modal close and submit without a pointer; relevant narrow viewport | Workflow remains usable; no inaccessible required field, hidden payment action, or trapped focus |
| Different actor / record | Allowed/denied employee or customer; old/new record; selected venue switch | Correct permission, ownership, and existing-data behavior |

Inventory every meaningful child control of a complex editor/map/form. One representative operation does not cover its untested buttons or states. Classify uncovered children in the ledger.

### Challenge the happy path with realistic stories

Run one focused exploratory story after the planned high-risk checks. Record the starting state, actions, exact observation, and cleanup rather than “exploratory passed.” Examples:

- Customer starts in a widget, adds a package and separate product, signs in late, removes an item, and pays. Does the final order still match what they selected?
- Employee changes venue after finding a customer. Is the customer/credit context correct and authorized before a sale?
- Member renews after owning a seat and receiving earlier benefits. Are the new season's tickets correct without retaining unwanted old ownership?
- Staff see a timeout after terminal payment and return to Transactions. Can they identify the original sale and deliver the tickets without taking payment again?
- Organizer changes fees while a customer already has a basket. Is the supported price policy clear and consistently recorded?

These are hypothesis-driven charters, not claims that every client supports every action. Use the actual supported workflow and stop before an unsafe or unauthorized mutation.

### Include non-functional risk when the change warrants it

| Trigger | Test or review to select | Decision evidence |
| --- | --- | --- |
| Purchase/seat/stock logic, major on-sale, queue changes | Engineering-coordinated isolated concurrent sales and last-unit contention; check final payment/order/ownership agreement | Agreed expected load and completion limits; correct successful/rejected outcomes; no double ownership or unaccounted payments |
| Bulk generation, expiry, imports, callbacks, outbox | Realistic isolated workload with failed/retried targets; inspect oldest pending work and business completion | Agreed deadline/backlog expectations; identity-accounted results and safe retry; task throughput alone is insufficient |
| Pricing/cache/report or schema changes | Existing records and baskets, supported old/new flags, stale/fresh reads, safe migration/backfill evidence | No silent repricing or record loss; projections refresh under the actual supported behavior |
| Authentication, public links, uploads, exports, integrations | Backend authorization/privacy review plus permitted abuse/invalid-input checks using test data | No cross-owner data access, unintended file exposure, or unsafe action; visible button hiding is insufficient |
| Shared UI, forms, mobile, embed, print | Keyboard/accessibility, supported browser/device, connection and app-lifecycle checks | Users can complete the workflow and obtain usable admission; real equipment where required |
| Deployment/flag migration | Review actual enablement, coexistence, rollback and observation plan with engineering | Candidate and rollout configuration known; irreversible sales have reconciliation, not only code rollback |

Do not invent latency, capacity, support, or security guarantees. Agree acceptance criteria and authorized test scope before execution. Load, destructive faults, third-party replay, and security testing must not be improvised against shared or production systems.
