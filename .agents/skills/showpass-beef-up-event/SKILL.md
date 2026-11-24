---
name: showpass-beef-up-event
description: Build or enrich authorized test configurations across the Showpass Organizer Dashboard under /manage/. Use for Events, tickets, Products, Memberships, promotions, settings, and other scoped scenario setup. Verify saved configuration and report issues found during setup.
---

# Showpass Organizer Builder

Turn a short request, category or agent-written case into actual saved Showpass setup. Keep the invocation `$showpass-beef-up-event` working for existing prompts. The workflow covers permitted Dashboard configuration. The user's preference is **create the scenario for me**: category first, realistic details, useful complications and connected application reach. Use the fewest records needed and enrich existing records in place. Test-case prerequisites take priority over optional complexity.

## Choose the object and mode

| Request | Load and do |
| --- | --- |
| Create or beef up an Event | [events.md](references/events.md), then selected parts of [scenario-patterns.md](references/scenario-patterns.md). Preserve deep ticket configuration. |
| Create or beef up a Membership | [memberships.md](references/memberships.md). Configure the Group, purchasable Levels and scoped benefits; Events are optional dependencies. |
| Create or beef up Products, discounts, Ticket Credits, Packages or their relationships | [catalog-and-related-config.md](references/catalog-and-related-config.md) and the relevant Handbook playbook. |
| Prepare a case from a note, Qase/Jira case or another chat | [create-from-test-case.md](references/create-from-test-case.md), plus only the required object guides. |
| Another Showpass configuration | Identify its owning Dashboard screen, backend rules and supported workflow first. Apply this shared process without forcing an Event or pretending an unsupported control exists. |

Create mode saves new records. Enrich mode compares the target's saved state with the requested story and fills useful gaps without duplicating records. A request such as “set up a promotion” or “configure Organization contact settings” starts on its owning Dashboard page. Use [Organizer Tester](<../showpass-organizer-tester/SKILL.md>) when the requested result is a behavior or UX assessment. Drafting cases or editing this skill does not authorize live setup. A pasted link is context until the user asks for live creation, changes or inspection; examples supplied for a skill update do not authorize changing those live records.

## Context and authority

Use the QA Vault repository that contains this skill. Read its current `AGENTS.md`, canonical quality standard and Handbook index. Load only the Handbook chapters needed for the selected features. Use the Vault's `01 Repositories/Backend - web-app.md` and `01 Repositories/Frontend - showpass-frontend.md` to locate source for the requested setup. Verify behavior and field rules in the backend and locate the actual controls and entry points in the frontend. Trace only the fields and relationships being configured.

Use the matching Codex in-app browser and its currently documented tools; no desktop apps or external/headless browsers. Use available dedicated integrations when sufficient. Missing access is a specific blocker, not permission to change clients or bypass normal controls.

**Admin access requires explicit user permission, including read-only inspection.** Do not open Django Admin, Dashboard Admin tools or Admin-only records/endpoints to confirm readiness unless the user specifically permits that access. An existing login, pasted Admin link or request to create/test a scenario does not grant it. Do not bypass this boundary through an API or another client. Admin inspection permission does not authorize changes.

A request to create or beef up a named offering or prepare a named test scenario authorizes its necessary owned configuration and compatible supporting records within the user's environment, Organization and test-data scope. Reuse that authorization; do not ask separately for every prerequisite record. Plan-only remains plan-only. Changing this skill does not itself authorize executing a linked case or creating its data.

Flag bugs encountered during setup. Finish at the verified saved configuration. Route a buyer basket or purchase check to Guest Tester or Customer Tester, and a staff sale or Check In to Box Office Tester.

- Preserve existing sold tickets, Members, orders, entitlements, renewal history, historical money, offering identity and requested dates/type. Record current prices, Inventory, timings, inherited settings and saved associations before changing them. Do not rewrite sold ticket timings: custom ticket dates may affect tickets already issued.
- A test hostname alone does not establish disposable records, safe payment mode or permission to send messages. Distinguish owned test data from a real on-sale. Invent plausible content/prices for authorized test setup; do not invent real performers, accessibility provisions, age policies, catering or VIP promises for an actual business event.
- Related setup may create/reuse owned Membership Groups/Levels/benefits, Products, Packages, discounts, Ticket Credit definitions, related Events or other records that the requested scenario requires. Organization-wide settings, global switches and unrelated shared catalog changes remain outside that implication. Never edit another Organizer's records or source repository to finish this setup.
- Verify existing prerequisites within the approved setup scope. Hand a missing purchase, issued entitlement, Refund, transfer, or scan to the role that owns it. Record which prerequisite is missing before calling the scenario ready.

## Review before live setup

Share the plan revision and follow the [shared engineering review layer](<../../../06 Prompts/Showpass Release Engineering Handoff.md#apply-the-review-layer>). Use short review for ordinary reversible beta setup and full review when the setup exercises a high-risk rule such as fees, inventory, or timed admission. Wait for independent QA Lead sign-off on the exact live plan. A written configuration draft stays at draft scope. Use the [QA Lead workflow](<../showpass-qa-lead/SKILL.md#tester-and-lead-handoff>). A changed plan returns through the same review layer.

Name the exact records and fields you will reopen to verify. State what changes and cleanup are in scope, what completes the build, and when you will stop early. Use the [plan and proof guidance](<../../../06 Prompts/Showpass Release Engineering Handoff.md#plan-the-proof-and-stopping-point>) for a bounded beta preflight and saved proof.

## 1. Establish the story and baseline

Confirm target host, Organization, target record type/ID or creation destination and editing access once. Use the established authorized session/destination rather than asking for them again; do not assume a previous task's Organization owns a new case. Infer the category from the request, case and saved offering. Ask only for a genuinely missing target or decision that materially blocks safe work.

**Readiness comes before creating/updating scenario data and is a question for the user by default.** Derive a short checklist from the selected case and current source, then ask whether the exact required flags/modules, employee permissions and relevant test payment/fee conditions are enabled or ready for the confirmed Venue. Ask for ON/OFF/unknown or equivalent clear answers, bundled once; reuse answers already provided for this scope. Do not say “all flags are enabled,” infer saved values from source or inspect Admin to answer the question yourself.

Record user confirmations as **user-confirmed**, separate from values verified through authorized Dashboard controls. Unknown/unsuitable prerequisites block dependent creation or testing; explain the exact gap and continue only independent authorized work. If a necessary Admin read remains, ask for permission naming the specific page/record and purpose, then wait. Do not change shared flags, permissions, fees or gateways to resolve readiness without the corresponding explicit authorization.

For an existing offering, enrich it in place after recording its baseline. For creation, use the supported workflow and requested status. Choose a concise story: who buys, what they receive, when they may use it, what staff must fulfill and which complications matter. Find and update the existing canonical note for this request before creating another. On reruns, verify existing IDs before creating replacements.

## 2. Plan a reusable setup

For an open-ended build, choose realistic values and connected settings that give the next tester a specific behavior to exercise. Name the buyer or staff job, the exact values and combinations you will save, and which settings, limits or relationships make the outcome possible. A club Membership might give its two Levels meaningful differences in benefits and collect a relevant Member question. A Product might have variants with different stock and purchase limits. A promotion might have a defined audience, valid dates and item eligibility. Reuse compatible records and keep the record count small while giving the scenario useful behavior.

For a targeted change, configure the requested fields on their owning screen. For Organization contact settings, for example, verify the agreed values in the contact section and record where they are used. Follow an explicit smoke-test scope or other constraint as written.

Start with the behavior the next role needs to exercise. Use the matching scenario preset when the request leaves fields open. Apply the saved QA venue and location, the user's constraints, and the selected guide together. Resolve scenario choices in the proposed plan so execution can use exact values.

Plan required supporting records in the same review. Set a bounded lookup for compatible owned records, then propose the smallest new setup if the first lookup cannot supply the needed relationship. Decide whether the dependent picker requires a particular status before creating the supporting record. Include any authorized publication in the review up front.

Map the selected settings and relationships to fresh saved proof and authorized cleanup. Include the handoff target, what the next role can exercise, and any prerequisite that role still needs.

For a test case, map required prices, quantities, eligibility, fees, timing, flags, historical states and independent runs first. Follow the simplification check in [create-from-test-case.md](references/create-from-test-case.md): flag the listed count versus the smallest supported count **before creating extra Events, Groups or other records**. Proceed with a proven equivalent smaller setup under the standing preference; ask only if the choice changes the test's purpose or an explicit requirement. Preserve separate records and orders where identity, balances, history or settings are part of the proof. Do not rewrite the case to fit available data.

Account for presentation, sellable options, forms, eligibility/benefits, promotions, fulfillment/admission, money and reporting wherever they apply. Record unsupported, incompatible, deferred or blocked areas with a reason. Use prior runs as examples, not a fixed recipe or proof of whole-app coverage.

## 3. Build efficiently through supported controls

- Inventory existing values and relevant capabilities in one focused pass. Reuse source anchors, saved records and evidence. Read additional source only for a rule or dependency that remains uncertain.
- Follow the selected object guide's dependency order: parent configuration → sellable options → eligibility/benefit relationships → forms and presentation → fresh reads and supported sales path. A Membership starts with its Group and Levels; it does not start by creating Events. Adapt to actual immediate-save controls and shared prerequisites.
- In case mode, dependency order can extend to issuing/redemption relationships → actual Customer-issued entitlement → required starting order/balance. Find and verify existing prerequisite records before creating replacements. Stop preparation before the first tested action.
- Batch deterministic edits within one form. Commit an exact option when a time, location or other input uses a picker. Capture one focused readback after each logical save. Prefer stable observed names and labels, and inspect fresh UI when the next branch depends on a result.
- For asynchronous search, wait for and read the exact matching result, including record identity, Organization and relevant Event/season dates, before selecting. A typed query or first stale option is not selection proof.
- **Continue/Done may only update the parent form.** Save the owning page too. Wait for its actual completion signal and ready state before navigating/reloading; a still-visible row does not prove a pending save finished. Record immediate saves separately: discarding a dialog may not reverse them.
- Avoid restarting after an interruption. Re-establish the current tab, saved state and existing IDs first. Before retrying a create/save, check whether it already succeeded. Correct a known validation problem and verify the resulting save; do not repeat an ambiguous money-, access- or Inventory-changing action blindly.
- Leave Event artwork for the user. Focus on the requested saved configuration and its evidence.

## 4. Verify the selected setup, then stop

After each logical save, obtain fresh saved proof by reopening/reloading or a permitted read. Verify **all selected values and relationships**, especially ticket-specific times, Group versus Level benefit scope, member information/question applicability, inherited versus overridden fields, prices, variant Inventory, limits, eligibility, season/expiry and offer destinations. A success toast alone does not establish every field persisted.

Give the next tester the saved Event or offering ID, exact ticket type or variant, sale settings, and any missing readiness. Hand off optional Preview, basket, purchase, issuance and admission checks as separate assignments. Use the [findings guidance](references/basket-checks-and-findings.md#flag-bugs-without-derailing-setup) for issues observed during setup.

If a field fails to stick, investigate the specific control and try a supported correction within the plan. Finish independent setup and report the exact gap. Call the build complete once you have reopened and verified the agreed settings and relationships. Report partial saves, failed checks and blockers with their evidence. Leave downstream tests to the receiving role.

Record suspected bugs, confirmed failures, usability issues and blockers observed during setup. Keep evidence with the affected record. Apply the Showpass bug-drafter workflow if a confirmed issue needs a Jira-ready draft.

Keep requested changes for review. Restore only incidental test mutations within authorized cleanup scope. Leave the useful target editor open. Store screenshots locally under the Vault's ignored QA Evidence folder, embed them beside the relevant walkthrough, and follow the Vault's browser-report format in one note. Capture meaningful saved sections in the same pass; do not replay mutations just for nicer evidence.

Final response: list the verified saved configuration, exact record IDs and links, evidence, findings, and any remaining prerequisites. Hand off one concrete next action to the receiving role and keep unexecuted checks marked Not run.


**Always provide a continuation handoff after creating/updating offerings or scenario data.** Save a short, copy-ready “These records exist; what do I do next?” block in the same canonical note and link it in the final reply. It must stand alone in another chat: destination and record links, saved setup, last verified date, completed checks, bugs/cleanup, unfinished work and the first exact next action with its expected result and stop point. Include current authorization boundaries and confirmed readiness without expanding permission or asking the same questions again. A request for next-step guidance does not itself authorize executing it. For a case-specific handoff, follow [create-from-test-case.md](references/create-from-test-case.md#copy-ready-continuation-handoff).
