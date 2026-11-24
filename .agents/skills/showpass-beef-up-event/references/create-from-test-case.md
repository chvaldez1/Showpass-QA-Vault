# Create Showpass setup from a test case

Use when the user asks to create the configuration/setup described by a case, or to prepare its prerequisites. The deliverable is actual saved records and a verified starting state, not another set of setup instructions. Stay within the authorization for configuration versus orders, payments, sends and the action under test.

## Read the case once and extract what must exist

If given a Codex chat, discover and use `read_thread`; read its latest corrections and follow the canonical case note it identifies. Do not use the sidebar title/summary as the case, send messages to the other chat, or reproduce abandoned setup from earlier replies. For Qase/Jira links, use their connected reads and operating rules. An inaccessible source is a named blocker; do not invent its prerequisites.

Extract the selected case/parameter runs into a compact table:

| Need | Record before creating it |
| --- | --- |
| Destination | Environment, Organization, role, supported client, existing mutation/payment scope. |
| Events | Listed count and roles; smallest justified count after the simplification check below; single/recurring status, publication, dates/timezone and sale state. |
| Memberships/catalog | Group/Level roles, benefit scope/inheritance, validity/seasons, Product variants, eligibility and whether an actual issued Member is required. Zero new Events is valid where no Event relationship is needed. |
| Tickets/items | Per-Event ticket types, quantities, prices/currency, Inventory, paid versus free, excluded items, seats/Packages/variants, delivery and ownership. |
| Relationships | Issuing versus redemption assignment; eligible/excluded types; quantity/benefit limits; same Organization; unaffected controls. |
| Starting state | Actual Customer, issued credit/benefit, separate issuing and redemption orders, balance/used amounts, unscanned/unrefunded state and independent orders per run. |
| Dependencies | Exact flags, fees/taxes, permissions, historical timing and approved test payment/recipient setup. Mark current value known or unknown. |
| Stop point | Last prerequisite to prepare; first action under test; records to retain and any incidental cleanup. |

Use values already present in the case. Infer harmless missing naming, category copy and sensible future dates from the authorized context; do not ask the user to restate the document. Preserve required windows relative to Event start, absolute/historical boundaries and money assumptions. Do not invent a currency or transform a precise $0 requirement into “ticket price covered, fees extra.”

Before any scenario creation/update, use this extracted checklist to ask the user whether the prerequisites are ready for the confirmed Venue. This is readiness confirmation, not permission to enter Admin. Never open Admin to fill in the checklist without explicit Admin-access permission. Record exact answers and their source; unknown prerequisites block dependent steps.

If several cases/parameters are requested, use independent Customer entitlements/orders where state would contaminate another run. Share compatible Event/catalog setup when the simplification check shows that it preserves each run's assertions and isolation. Independent orders or Customer entitlements can still be necessary on a shared Event; fewer Events must not merge their balances or histories. If no case is selected, use the smallest base case when the request supports that reading, state the selection and continue; ask when choosing would materially change the expected starting state, money or scope.

## Simplify setup before creating records

Default to the fewest records of each type that still prove the requested behavior. Before extra Groups, Levels, Products or Events, map their roles to distinct proof targets. Reuse one Group with different Levels where compatible; keep separate Groups when validity, renewal or Group-wide benefits must differ. A Membership-only scenario can need no Events. Flag the proposed reduction and preserved proof before creation, then apply the same equivalence rules below. Do not merge actual Members, balances or orders whose independent state is required.

For Events, default to the fewest Events that still prove the requested behavior. A case's Event letters or listed count can describe one possible setup rather than a business requirement. Before creating any Events:

- Map each Event role to the assertion that needs it. Check whether distinct ticket types, separate orders or independent Customer entitlements on one Event preserve that assertion. More tickets or orders alone do not justify more Events.
- Verify the actual scope of relevant limits and state from current backend behavior and authorized configuration: per Event, ticket type, Customer or credit; sale/scan dates; Inventory; issuing/redemption restrictions; Package parent/child relationships; history and unaffected controls. Do not assume separate ticket types avoid an Event-wide limit, or that distinct issuing and redemption orders require distinct Events.
- Retain additional Events only for a concrete reason, such as testing cross-Event behavior, required parent/child Events, incompatible schedules/settings, or a fresh allowance needed to distinguish an exhausted credit from an Event limit. Unknown equivalence is not proof that one Event works; name the missing rule before committing to extra records.
- **Flag simplification before creation.** Give the case's listed count, the smallest supported count, the role/ticket/order mapping and the reason for each remaining Event. Say whether the same assertions survive. When equivalence is established and the user has not explicitly required the original count, proceed with the smaller setup under the standing preference. If fewer Events would change what the case proves, explain the tradeoff and ask for that material decision before dependent creation; do not claim an altered test passes the original case.

Record the chosen count, justification and case-to-record mapping in the existing supporting setup/run note. Preserve the original case definition unless the user requests an edit. Do not cancel, merge or delete already-created Events merely because this review finds a simpler future setup.

## Create the prerequisite chain

1. Search the owned destination and existing canonical note for matching prepared records. Use a recognizable run/scenario prefix and map case labels to actual names/IDs. Reuse a verified match on rerun rather than creating duplicates or editing unrelated records.
2. Create the minimum justified parent records and sellable options through supported controls: Membership Groups/Levels, Products/variants or Events/tickets as required. Load the matching object guide; do not force an Event into every case. Choose the required status, dates and on-sale state. Save/reopen each relevant value and relationship. Avoid copying an enriched Event whose hidden settings would contaminate a simple case.
3. Configure required Ticket Credit definitions, Group/Level benefits, Products or Packages. Verify both sides of each relationship and exclusions. A configured issuing ticket, credit definition or benefit rule is not proof that a Customer received the resulting entitlement.
4. Confirm non-record dependencies with the user and narrowly inspect only authorized Dashboard surfaces. Read-only Admin access requires separate explicit permission before opening any Admin page or Admin-only endpoint. Do not toggle a shared/global switch, change Organization-wide fees or grant permissions merely because the case lists them. Name missing confirmation or scope and stop dependent work; do not describe incomplete prerequisites as ready.
5. Verify existing prerequisite orders or entitlements only within the approved setup scope. Hand missing purchases to the checkout owner. Record the expected starting state and exact missing proof.
6. Hand any basket smoke check to the receiving checkout role with the exact item, quantity, expected eligibility and safe cleanup. Leave the case's prepared starting state intact.
7. Stop before the remaining action under test. For a Refund case this normally means the original redemption order exists and is ready to refund, not that it has already been refunded. For a case testing creation itself, do not pre-create the object under test; prepare its dependencies and leave the creation action unexecuted.

Case text is an intended setup, not proof the supported UI can create it. Trace uncertain rules to current backend and UI. If a required field/control cannot prepare it, mark that dependency blocked and explain the unsupported step instead of inventing an Admin workaround, resetting a real balance or silently weakening the assertion. Never backdate purchases to simulate a required historical order.

## Verify and hand off without another round of setup questions

Update the existing case note's supporting setup/run section, preserving case IDs and definitions. Put an actual-record map and prerequisite status there. Do not rewrite expected results to fit the records that happened to be available.

| Case label | Actual record type and ID or link (Group/Level/benefit/Event/item/Member/Customer/order) | Required value/state | Fresh proof | Status/gap |
| --- | --- | --- | --- | --- |

Label Invoice ID, Invoice item ID, Basket ID, Customer ID, Venue ID and Ticket type ID correctly. Keep issuing orders separate from redemption orders, and avoid exposing full access codes/barcodes. Link the screen that matches the record type. Do not claim a missing ID indicates a deleted record.

Use these milestone words precisely:

- **Configuration created:** required Groups/Levels, Events/tickets, Products and definitions exist as applicable; list any unissued credits, missing purchases, unverified flags or money setup.
- **Buyer proof pending:** name the basket or order check and receiving role. Carry already verified buyer evidence forward with its source.
- **Prerequisites ready:** all required record relationships, actual orders/entitlements and starting balances are freshly verified. State the exact case/parameter and first test action, including where the user starts.
- **Case executed:** the actions/assertions were actually run with evidence under the QA workflow. Creation alone never earns this label.

If user input is truly required, batch only the unresolved facts/authorization into one precise question. Explain the next action it unlocks; do not make the user reconstruct setup from a list of links. Continue independent creation while waiting. Keep completed financial records and useful scenario data for review; clean only authorized incidental data.

## Copy-ready continuation handoff

After preparation, add one self-contained continuation block to the existing canonical note. The user should be able to paste it into the case-writing/testing chat with “These records are created; what do I do now?” without reconstructing the earlier conversation. Do not create a new chat, send a message or make a second report solely to deliver the handoff.

Include only the facts needed to resume:

- Case title/parameter and canonical case/run-note path; distinguish case IDs from report-local smoke IDs.
- Environment, exact Organization/Venue and last verification date; actual record links and typed IDs, Level/ticket/variant names, quantities/prices, benefit/definition IDs and role mapping. State any simplification and its effect on proof; reuse existing records before proposing more Groups, Events or other records.
- Saved relationships and relevant timing/limits; user-confirmed readiness separately from observed values. Distinguish a definition from an issued Customer code and name missing Customer/order state. Never include full access codes, barcodes or credentials.
- Completed setup and evidence, findings, cleanup, and the exact next role. Mark unexecuted buyer and case actions Not run.
- The first unfinished prerequisite or test action: exact starting screen, item/quantity/control, expected visible result, stop point and only the genuinely missing input/authorization. Reuse valid readiness answers. A fresh read may be needed after time/configuration changes, but do not recreate data or rerun completed mutations merely to regain context.
- Boundaries for the next agent/person: what is authorized, what needs a new decision, no-Admin or other restrictions, and records that must stay untouched. A handoff carries evidence and existing scope; it does not grant new payments, Refunds, sends or Admin access. If the user asks only “what next?”, explain the action before executing it.

Also give a brief ordered path after the immediate action so the user understands how setup reaches the test's starting state and then the assertion. Reference the full case instead of duplicating its entire walkthrough. End the delivery with a reusable one-line prompt pointing to this exact handoff section. Keep later progress in the same note and update the handoff when saved state changes.

## Worked intake: voucher refund limit cases

The user supplied [Draft voucher refund limit cases](codex://threads/01a1c1ef-dbb0-77b3-834d-b48e0ad2c12b). Its canonical note is `03 Test Cases/Transactions/enable-voucher-refund-limit-fix-test-cases.md`. Re-read its selected case and latest corrections when executing; this summary is a design example, not saved test data.

The current **TC-01 draft lists four future single-date Events in the same Organization**. Treat these as roles to review before creation, not a fixed four-Event recipe:

| Draft role | Setup to preserve in the chosen mapping |
| --- | --- |
| Event I — issuing | One issuing ticket; its separate purchase issues three normal Ticket Credit uses. Keep that order untouched. |
| Event A — initial redemption | Credited admission at 10 plus a different full-price admission at 10. Initial order needs three credited tickets and one excluded paid ticket on two lines. |
| Event B — later reuse | Same credited/paid type separation; keep eligible stock on sale for the test's later reuse purchase. Do not pre-purchase the reuse order. |
| Event C — exhaustion boundary | At least one eligible credited-type ticket at 10; no prior per-Event use of this code. Do not pre-purchase the boundary attempt. |

First flag whether these roles could share fewer Events. A one-Event version is a candidate, not an established equivalent: verify issuing/redemption compatibility and the exact allowance scope across the original purchase, Refund, reuse and exhaustion attempt. Keep a fresh Event where needed to prove credit exhaustion independently of an already-used allowance, or when cross-Event use is itself the proof target. State the justified count before creating anything.

Verify the actual currency; the case writes prices as `$10`. Create a **normal 100% Ticket Credit** with **Limit per item, per user = 3**. Use the chosen role-to-record mapping: link the issuing ticket under **Credits issued by** with quantity 3 and only the credited types for initial redemption, reuse and exhaustion under **Credits redeemable for**. Paid types stay unselected. Do not revive the abandoned 50% Admin-edit proposal from older chat replies.

The definition is only configuration. To reach the test's starting state, the controlled Customer must actually receive a code from the issuing purchase, initially **Available 3 / Used 0**, and complete Event A's mixed redemption order, reaching **Available 0 / Used 3**. The case additionally requires the credited lines to total **0 including Customer-paid fees/tax**, a full-price paid line with the required fee evidence, an untouched second voucher, and the global switch `enable_voucher_refund_limit_fix` ON. Ask the user to confirm the required switch, permissions and payment/fee readiness before creating the scenario; do not inspect Admin to answer this without explicit permission. Verify resulting records only within authorized access or state the exact gap. Do not claim ready from published Events and assignments alone. Stop before the Refund, later reuse and exhaustion attempt.

Other cases have different prerequisites. **TC-02** currently describes an issuing Event plus seven redemption Events; review which Event distinctions its assertions actually require before reproducing that count. It still requires independent vouchers/orders for TwoPerEvent and ThreePerEvent and purchases predating switch enablement. New Events cannot manufacture that history. **TC-05** requires an eligible $0 Customer order and actual free-return settings; a paid mixed order is not a substitute. Do not create every case's records when only the base scenario is requested.
