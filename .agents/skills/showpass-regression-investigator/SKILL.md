---
name: showpass-regression-investigator
description: Investigate a Showpass behavior that fails for one record or Venue but works for another, and determine whether a code change caused it. Use for configuration-versus-regression questions. Hand verified bugs to the Showpass bug drafter.
---

# Showpass Regression Investigator

Find the smallest supported explanation for the difference. A broken outcome can be verified before its cause is known; keep those conclusions separate. Do not turn a suspected code change into a confirmed regression merely because it is recent.

## Ground the investigation

Read the QA Vault's `AGENTS.md`, `00 Start Here/World-Class Software Quality Standard.md`, `01 Repositories/Backend - web-app.md`, and the relevant chapter of `00 Start Here/Showpass QA Handbook/00 Index.md`. The vault is `/Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault`. Follow its browser, Jira, data-safety, evidence, and plain-language rules. Use the backend repository guide to locate source; derive each diagnostic query from the current models and behavior rather than treating the guide as a database schema.

Start from the reported customer or employee outcome: what should appear or happen, what actually happened, and where. Record the affected and working Organizer/Venue, environment, page/client, role, record IDs, event and ticket state, time, and available screenshots or request evidence. Mark missing details as unknown. A screenshot proves what was visible at capture time; it does not prove a setting was saved or a build was deployed. Trace the relevant source and existing QA evidence before asking for missing Venue links, IDs, or repeated configuration checks. After that work, ask for only the specific live fact that would settle a remaining hypothesis; do not pause the source investigation while waiting for it.

## Separate the possible explanations

1. **Identify the effective setup needed to decide the symptom.** Compare saved values for the failing and working records, including inherited Venue or Organizer settings, event/ticket relationships, inventory and availability, sales channel, feature flags, permissions, and rollout state only where source shows they affect the behavior. The user's configuration check is valuable intake evidence; identify the exact remaining distinction instead of asking them to repeat a generic checklist. If a screenshot appears to show a relevant control off, record the discrepancy and continue source tracing; resolve it before calling the behavior a defect.
2. **Trace the decision from backend to display.** Read `/Users/christianvaldez/Documents/Showpass/repos/web-app` first for the model, API, business rule, and serialized response. Then read `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` for the affected page, badge condition, and all clients consuming the shared response. Use `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright` for existing regression evidence when useful. State the exact inputs that should make the outcome appear and every known suppression condition.
3. **Investigate the change.** If a branch or PR is supplied, confirm its base and inspect its exact diff before wider history. Otherwise use focused `git log`, `git blame`, and relevant diffs around the identified condition. Compare before and after behavior with the same inputs. Check whether the candidate commit is actually in the affected environment; if deployment identity is unavailable, label code-change attribution unverified. Include unchanged clients of changed shared behavior.
4. **Challenge the hypothesis.** Compare one failing and one working case with the same relevant state; vary only the suspected condition when safe. Consider configuration, old data shape, inventory timing, cache/stale response, feature rollout, client version, and an intended product rule only when evidence makes them plausible. State what observation would disprove the leading explanation. Do not infer live record values, response contents, or a regression from a URL or screenshot alone.

Use connected service tools for relevant Jira, logs, or record evidence. Follow the vault's browser boundary: a pasted link alone does not authorize opening it, and desktop apps or native browsers are off limits without the user's later explicit permission. If permitted evidence is unavailable, continue source tracing and name the specific gap. Do not change production configuration or customer records to force a reproduction. Any authorized test-data change needs an owned record, original values, a cleanup plan, and proof of restoration.

## Suggest a query when saved state could settle the question

After tracing the relevant backend rule, proactively offer a focused read-only SQL query when the unknown is a saved setting, linked record, status, inventory flag, or rollout configuration. Do this before asking the user to recheck a generic configuration list. A query is useful only when its result can distinguish the current explanations; do not add one to every investigation.

- Verify table names, stored columns, foreign keys, inherited fields, and null/default behavior from current models, migrations, and existing backend queries. A Python property may read another table: for example, `TicketType.sold_out` reads `base_inventory.sold_out`; it is not a `tickets_tickettype.sold_out` column. Trace switch and per-Venue flag evaluation separately instead of assuming they use the same storage or rules.
- Scope the `SELECT` to the supplied record IDs, adding an optional working-record ID for comparison. Select only identifiers, names, and rule inputs needed to explain the symptom. Use explicit columns and preserve missing relationships with suitable joins; explain empty results and null values rather than silently treating them as false. Avoid unnecessary customer data, wide scans, and queries that call functions with side effects.
- Include derived results only when they faithfully model the source rule. Label them `expected_...` or `calculated_...`; they do not prove the actual API response, cache contents, running build, or visible UI. Do not infer historical values or a failed save from one current row.
- Provide copy-ready SQL using known IDs, clearly mark any remaining parameters, name the intended environment, and cite the source files or symbols used to build it. Explain which columns settle the hypothesis and what each materially different result means. Save reusable SQL beside the canonical investigation note and link it; show the query in chat when that makes it easier to use.
- State whether the query is proposed, source-checked, executed by the agent, or returned by the user. Generating SQL does not authorize connecting to a database or running it. Use an already authorized read path when available; otherwise offer the query without requesting credentials. When results arrive, record their provenance/environment/time when known, revise the conclusion, and select the next check from those results.

## Decide and hand off

Classify the result in everyday language:

- **Confirmed bug:** The expected result is established and the wrong result is reproduced through the relevant layer with the effective setup known.
- **Likely code regression:** The bug is confirmed, a candidate change alters the same decision for the same inputs, and that change is present in the affected build. State any remaining alternative explanation.
- **Inconclusive:** Missing saved state, comparable record, deployed revision, or safe execution prevents a defensible conclusion. Give the exact next check.
- **Expected behavior or setup difference:** Cite the rule and the specific differing condition. Correct earlier suspicion if later evidence disproves it.

When a bug is confirmed, use `$showpass-bug-drafter`. Supply it with the exact starting state, numbered reproduction actions, expected and observed result, business impact, environment/date, evidence links, cleanup, source anchors, candidate change and attribution confidence. A verified bug can be drafted even if its causal commit remains unknown. Do not create a Jira issue without separate authorization.

Keep one canonical investigation note under `02 Feature QA/` when a durable note is useful, updating an existing note for the same issue. Put a Sentry-led investigation under `08 Sentry Investigations/` using the Sentry skill. Distinguish source evidence, live observations, and checks not run. End with the finding, whether a code change is actually tied to it, the draft or exact blocker, and the shortest safe next check.
