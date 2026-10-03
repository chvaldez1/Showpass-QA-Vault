---
title: Customer Refunds - Start Here
jira: SPW-19666
status: source-reviewed-not-executed
date: 2026-10-02
tags:
  - qa/runbook
  - refunds
---

# Customer refunds — start here

This is the working order for [SPW-19495](https://showpass.atlassian.net/browse/SPW-19495) and its [SPW-19666](https://showpass.atlassian.net/browse/SPW-19666) customer-refund subtasks. Start with [[SPW-19495-acceptance-criteria|all acceptance criteria]] to see what must pass, what needs a special setup, and what remains a source or execution question. **Organization** in Dashboard and **venue** in Admin mean the same business here.

| Order | Who does it | Guide | Jira card and detailed cases |
| --- | --- | --- | --- |
| 1. Prepare the organization | Organizer/Venue Employee plus an Admin for rollout and missing policy record | [[00 Organizer and Venue - How to Test]] | [[SPW-19667-customer-refund-policy-test-cases|SPW-19667]]: form, cutoffs, ticket/product switches, employee access, French and older settings page. |
| 2. Buy orders and inspect return choices | Customer | [[00 Customer - How to Test]] | [[SPW-19668-customer-refund-eligibility-test-cases|SPW-19668]]: allowed, blocked, mixed-order, cutoff and ownership behavior. |
| 3. Check amounts on new compatible orders | Organizer configures; Customer returns; permitted Employee checks Transactions | Same Organizer and Customer guides | [[SPW-19669-customer-refund-amount-rules-test-cases|SPW-19669]]: shipping, fees, preview/final amount. |
| 4. Check delayed barcode delivery | Admin configures Venue; Customer checks My Orders | Customer guide | [[SPW-19670-delayed-barcode-self-refund-test-cases|SPW-19670]]: before/after release, opt-in and blockers. |
| 5. Complete customer acceptance | Customer plus permitted Employee for financial/admission evidence | Customer guide | [[SPW-19671-customer-self-refund-acceptance-test-cases|SPW-19671]]: successful and failed returns, final state and no duplicate. |
| Separate employee path | Venue Employee and role administrator | [[00 Staff Refund Permissions - How to Test]] | [SPW-19326](https://showpass.atlassian.net/browse/SPW-19326): five employee refund-type permissions; separate from customer self-returns. |

The folders below separate **Organizer and Venue**, **Customer**, and **Staff Refunds**. Each Jira card keeps one canonical detail note and its local `TC-*` labels. Six SPW-19667 cases have existing Qase IDs SPT-5250–5255; other local cases have not been published just because they appear here.

**Current source note (2026-10-02):** the earlier “not merged” notices for SPW-19669 and SPW-19670 were based on the 2026-09-24 checkout. The current local backend/frontend now contain the amount controls and delayed-barcode field. That is source evidence, not proof of deployment or execution. The exact customer-policy rollout flag is `enable_venue_policy_customer_self_refunds`, targeted by organization. See each guide for the other settings and permissions. No Qase, live browser, or branch/diff work was done for this reorganization.
