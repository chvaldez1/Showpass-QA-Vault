# Major Critical Jira To Playwright Gap Exhaustive Worker

Use this prompt in a fresh session when you want to mine the exported Major/Critical Jira history and identify the highest-value Playwright automation gaps.

Related notes:
- [[01 Repositories/QA Automation - showpass-playwright]]
- [[01 Repositories/Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend]]
- [[02 Feature QA/Checkout Automation Mission Control]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]

```text
Run an exhaustive Major/Critical Jira to Playwright gap-analysis worker.

Primary question:
What high-value Playwright automation is missing when we compare Major/Critical Jira business incidents against the current showpass-playwright repo?

Main inputs:
- Jira CSV export: /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/assets/csv/major-critical.csv
- Parsed full JSON: /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/assets/json/major-critical.breakdown.json
- Parsed summary JSON: /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/assets/json/major-critical.summary.json
- Playwright repo note: [[01 Repositories/QA Automation - showpass-playwright]]
- Playwright repo path: /Users/christianvaldez/Documents/Showpass/repos/showpass-playwright

Reference repos:
- Backend source of truth: /Users/christianvaldez/Documents/Showpass/repos/web-app
- Frontend user paths: /Users/christianvaldez/Documents/Showpass/repos/showpass-frontend

Operating mode:
- This is a read-only gap-analysis and planning worker.
- Do not write Playwright tests, source code, fixtures, or Qase cases.
- Do not treat Jira priority alone as automation priority.
- Do not trust heuristic JSON scores as final truth; use them only to navigate the CSV.
- Do not create a test for every Jira card.
- Convert repeated cards into business-invariant patterns.

Durable outputs to create or update:
- Worker state JSON: /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/02 Feature QA/Major Critical Playwright Gap Worker State.json
- Gap report: /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/02 Feature QA/Major Critical Playwright Gap Analysis.md
- Automation candidates: /Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/04 Automation/Major Critical Playwright Automation Candidates.md

First pass:
1. Read the summary JSON first.
2. Read the full JSON only for issue-level details.
3. Use the CSV only when JSON text is ambiguous or a card needs exact raw context.
4. Build an initial incident map by business invariant, not by Jira issue key.
5. Start with high and medium `qa_relevance_band` records, but do not ignore low records; group low-signal support/config/data/hardware records and explain why they do or do not affect reusable product behavior.

Business invariant buckets to prioritize:
- money movement, charges, refunds, payment final state
- paid/unpaid order correctness
- ticket issuance, fulfillment, inventory, capacity, holds, and seat ownership
- fees, discounts, credits, gift cards, tax, subtotal, and total reconciliation
- Dashboard, reporting, exports, settlement, payout, and financial reconciliation
- checkout entry paths, Box Office/POS, memberships, packages, waitlists, guestlists, and hold links
- async provider callbacks, webhooks, retries, duplicate submissions, delayed jobs, and background state
- identity, ownership, account claim/connect, and permission/access failures that affect paid orders

Lower-signal patterns:
- one-off scripts or data moves
- imports or CSV cleanup
- configuration/content requests without reusable broken behavior
- hardware/printer/device issues unless they create product-state or payment-state risk
- demo/environment setup

For each incident pattern:
1. List representative Jira keys and summaries.
2. State the business invariant that broke.
3. Search showpass-playwright using `rg` for product terms, existing test names, page objects, fixtures, and helper coverage.
4. Record inspected Playwright paths.
5. Classify coverage as:
   - `Exact coverage found`
   - `Partial coverage found`
   - `No coverage found in inspected files`
   - `Not a Playwright candidate`
   - `Needs product/provider strategy`
6. If behavior is unclear, inspect backend first and frontend second before proposing automation.
7. Propose a representative Playwright candidate only when it would catch a recurring business-invariant failure.

Every proposed automation candidate must include:
- candidate id
- impacted business invariant
- representative Jira keys
- why this matters to business risk
- current Playwright coverage status
- inspected Playwright files
- backend/frontend references if needed
- recommended first Playwright proof
- acceptance criteria
- fixture or helper needs
- what not to test first
- priority: P0 / P1 / P2
- confidence: High / Medium / Low
- open questions or strategy decisions

Scoring guidance:
- P0: direct money movement, paid/unpaid final state, duplicate charge/order/ticket, inventory/seat ownership corruption, or reporting/payout disagreement with strong incident signal and missing/partial Playwright proof.
- P1: important recurring product invariant with partial coverage, fixture complexity, or lower direct money impact.
- P2: useful but lower-risk, mostly covered manually/backend, or unlikely to fail through Playwright.
- Do not promote support-script/config/hardware cards unless they expose reusable product behavior.

Exhaustion policy:
- Process the whole JSON inventory by bucket, not just the top 150 records.
- Keep `processed_issue_keys`, `processed_bucket_ids`, `coverage_classification_counts`, and `remaining_high_signal_count` in the worker state JSON.
- After every batch, update state before writing markdown.
- A batch can be 25-50 Jira records or one full business bucket, whichever is easier to verify.
- Stop only when all high/medium-signal buckets have been classified and low-signal buckets have been grouped, or when the next useful step requires product confirmation, provider/hardware access, secrets, destructive setup, source writes, or Qase writes.

Avoid weak output:
- Do not output generic scenarios like "test checkout with discounts".
- Tie every candidate to a repeated incident pattern or a severe business invariant.
- Prefer one realistic representative Playwright proof over a matrix.
- If a candidate cannot say exactly what assertion would fail, do not promote it yet.

Final report shape:
- Executive answer: top missing Playwright automation areas.
- Incident pattern map: bucket -> Jira keys -> business invariant.
- Coverage map: pattern -> existing Playwright coverage status.
- Recommended automation backlog: ranked P0/P1/P2 candidates.
- Not recommended for Playwright: grouped low-signal cards with reason.
- Open questions: product/provider/business decisions needed.
- Resume checkpoint: where a new session should continue.
```

## Operator Notes

- This is broader than the checkout money-movement worker. It should challenge the existing shortlist with all Major/Critical incident patterns.
- Start from the JSON summary for speed, but verify with the full JSON and source repos before claiming a gap.
- The value is not more cases. The value is a defensible, incident-backed answer to: "What is Playwright missing that would have caught important failures?"
