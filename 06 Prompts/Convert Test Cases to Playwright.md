# Prompt: Convert Test Cases to Playwright

Start in the sibling [Playwright checkout](../../showpass-playwright/AGENTS.md) and follow its [agent team workflow](../../showpass-playwright/docs/agent-workflows/playwright-team.md). It accepts a prompt, plan, existing branch, or failed run. To start in City, see [[00 Start Here/Showpass QA City#Playwright handoffs]].

## Workflow Selection Guide

Pass the selected behavior and its evidence to the Automation Lead. Use the existing candidate note or repo handoff for the work item. Link its result back to the candidate when requested. Preserve its ID, manual fallback, and unresolved backend or device checks. [[01 Repositories/QA Automation - showpass-playwright]] · [[04 Automation/00 Index]]

```text
Start with AGENTS.md and docs/agent-workflows/playwright-team.md in showpass-playwright.
Work item or branch:
Requested outcome and scope (plan, review, or implementation):
User, starting state, action, and observable expected result:
Existing spec, verified Qase case, source, patch, or run evidence:
Known blockers, approved scope, and stopping point:
```

Use the [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|shared review policy]] for live work or release handoffs. Record local and CI results separately when applicable. Keep failed, skipped, retry-only, and unrun checks visible.
