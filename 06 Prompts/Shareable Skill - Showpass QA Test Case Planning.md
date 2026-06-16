# Prompt - Move Showpass QA Test Case Planning Into Skill Marketplace

Use this prompt when refactoring the Showpass QA test-case workflow out of the Playwright repo and into a reusable skill in `/Users/christianvaldez/Documents/Showpass/repos/skill-marketplace`.

## Goal

Move the reusable QA test-case planning workflow from:

`/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`

into a shareable skill in:

`/Users/christianvaldez/Documents/Showpass/repos/skill-marketplace`

Then break apart this existing lifecycle reference:

`/Users/christianvaldez/Documents/Showpass/repos/skill-marketplace/skills/local-browser-test-lifecycle/references/test-case-planning.md`

so it no longer owns the reusable test-case-generation logic and only keeps lifecycle-specific pre-development planning, developer handoff, QA review CSV, and signoff guidance.

## Source Docs To Review First

- `showpass-playwright/docs/agent-workflows/showpass-qa-test-case-generator.md`
- `skill-marketplace/skills/local-browser-test-lifecycle/SKILL.md`
- `skill-marketplace/skills/local-browser-test-lifecycle/references/test-case-planning.md`
- `skill-marketplace/skills/local-browser-test-lifecycle/assets/qa-review-test-cases-template.csv`

Also inspect nearby skill-marketplace conventions before editing:

- skill folder structure
- existing `SKILL.md` frontmatter style
- `agents/openai.yaml` style, if present
- validation scripts or marketplace metadata

## Refactor Plan

1. Create a new shareable skill in the skill marketplace.
   - Suggested skill name: `showpass-qa-test-case-planning`
   - Purpose: source-backed Showpass QA test cases, PR QA plans, Qase-ready manual cases, coverage matrices, and Playwright automation candidates.

2. Move reusable test-case planning logic into the new skill.
   - Source-backed QA generation
   - frontend-first PR workflow
   - backend knowledge gap handling
   - state-space coverage
   - checkout/payment/exchange/refund/reporting matrix
   - Qase-ready manual case shape
   - risk prioritization
   - Playwright-friendly automation candidate guidance
   - output expectations for markdown QA plans

3. Split `local-browser-test-lifecycle/references/test-case-planning.md`.
   - Remove or slim down duplicated test-case-generation rules.
   - Keep only lifecycle-specific guidance:
     - `pre_dev_test_planning` intake
     - developer awareness brief
     - QA review CSV artifact creation
     - QA owner/signoff tracking
     - how pre-development planning fits into local browser test lifecycle
   - Point to the new `showpass-qa-test-case-planning` skill/reference for detailed case generation rules.

4. Update the Playwright repo workflow file to become a thin adapter.
   - Keep repo-local defaults only:
     - use the shared marketplace skill for source-backed QA case planning
     - when working in `showpass-playwright`, write PR QA markdown to `qa-test-case-output/<ticket-or-feature>-qa-test-cases.md`
     - include Playwright-friendly scenarios and automation notes
     - follow existing Playwright repo patterns for locators, fixtures, and tests
   - Do not keep a second full copy of the workflow in the Playwright repo.

5. Preserve the vault prompt for now.
   - Do not change `Showpass QA Vault/06 Prompts/Showpass QA Test Case Generator.md` to depend on the new skill until the marketplace refactor is complete and validated.
   - That vault prompt should continue pointing to the current Playwright workflow as canonical during the transition.

## Overlap To Merge Into The New Skill

Both existing docs already agree on these reusable rules. Move these into the new shareable skill:

- Generate practical QA test cases from incomplete or noisy context.
- Use source-backed behavior, not generic QA checklists.
- Do not rely only on PR descriptions, Jira text, or happy-path summaries.
- Inspect `showpass-frontend` routes, components, feature flags, API clients, validation, form state, analytics, and existing tests.
- Use `web-app` when API contracts, permissions, models, side effects, business rules, legacy templates, or backend tests materially affect coverage.
- Cover happy paths, negative paths, edge cases, permissions, feature flags, loading/error/empty states, validation, persistence, and regressions.
- Treat setup choices as part of the test surface when they affect behavior.
- Prefer fewer high-signal cases over exhaustive noise.
- Make assumptions, unknowns, blockers, and source gaps explicit.
- Avoid invented backend behavior and invented selectors.
- Include Playwright automation candidates only when source evidence or existing test patterns support them.

## Important Differences To Preserve

Move these from the Playwright workflow into the new skill:

- PR/frontend-change workflow
- `showpass-frontend` inspection before generating QA plans
- backend knowledge gap handling
- explicit state-space model before writing cases
- checkout/payment/exchange/refund/reporting coverage axes
- grouped Qase-ready markdown case output
- `qa-test-case-output/<ticket-or-feature>-qa-test-cases.md` as a Playwright repo adapter default, not as the global skill default

Keep these in `local-browser-test-lifecycle`:

- `pre_dev_test_planning` mode
- compact intake ask for Jira/designs/docs/Qase links/repo access/QA owner
- source review order for product intent and existing Qase before code
- developer awareness brief
- QA review CSV creation and required columns
- QA signoff status and handoff wording

## Suggested New Skill Shape

Create:

```text
skills/showpass-qa-test-case-planning/
  SKILL.md
  references/
    case-planning.md
    checkout-state-space.md
  agents/
    openai.yaml
```

Use fewer files if the marketplace convention prefers a smaller skill. Keep `SKILL.md` concise and put detailed matrices or examples in `references/`.

### Suggested `SKILL.md` Responsibility

The new `SKILL.md` should answer:

- when to use the skill
- how to choose between PR QA planning and general Showpass QA case planning
- which sources to inspect
- when to inspect frontend first vs backend
- when to read reference files
- what outputs are expected

### Suggested `references/case-planning.md` Responsibility

Own the reusable detailed workflow:

- intake and source review
- frontend inspection guide
- backend knowledge-gap rules
- risk-based coverage model
- manual case shape
- assumptions and unknowns
- regression coverage
- automation candidate guidance

### Suggested `references/checkout-state-space.md` Responsibility

Own the high-risk matrix for:

- checkout surfaces: WebPublic, WebBoxOffice, Widget
- tender types: card, cash, other payment type, user/account credit, exchange credit, gift card, free/complimentary
- item mixes: tickets, assigned seats, products, packages, memberships, donations, protection, shipping, fees, taxes
- customer and basket context
- lifecycle state
- downstream transaction, settlement, reporting, export, email, and webhook surfaces

## Suggested `local-browser-test-lifecycle` Split

After the new skill exists, rewrite:

`skills/local-browser-test-lifecycle/references/test-case-planning.md`

so it says, in effect:

- In `pre_dev_test_planning`, use `showpass-qa-test-case-planning` to draft the actual cases and coverage matrix.
- This lifecycle reference owns the wrapper around those cases:
  - intake completeness
  - QA review CSV
  - developer awareness brief
  - QA clarification list
  - QA owner/signoff status
  - handoff wording
- Do not duplicate the detailed case-generation matrix here.

## Validation Checklist

- The new skill contains all reusable Playwright workflow behavior.
- `local-browser-test-lifecycle` no longer duplicates the full case-generation workflow.
- The Playwright workflow file is a thin adapter, not a second source of truth.
- `assets/qa-review-test-cases-template.csv` still supports the lifecycle CSV workflow.
- Skill frontmatter has only `name` and `description`.
- Any marketplace `agents/openai.yaml` metadata matches the new skill behavior.
- Existing vault prompt `06 Prompts/Showpass QA Test Case Generator.md` still points to the current Playwright workflow until the migration is intentionally completed.
- Run the marketplace validation command if one exists.

## Final Report To User

Report:

- files changed in `skill-marketplace`
- whether the Playwright workflow was slimmed to an adapter
- whether `local-browser-test-lifecycle` now delegates test-case generation
- validation command run and result
- any remaining manual migration step
