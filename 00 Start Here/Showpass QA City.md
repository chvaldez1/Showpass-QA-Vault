---
title: Showpass QA City
date: 2026-11-22
tags:
  - qa/city
  - qa/workflow
---

# Showpass QA City

QA City gives Showpass's AI manual testers and assistants a shared way to take assignments, review proposed work, and record evidence. This note describes what we added and what each part owns as the City grows.

## UI

Select a building on the **City map** to see its open assignments, blockers, and next actions. Review queues show tester plans waiting for each review role. Open a queue item to work on its current revision. **Runs** holds the full assignment history, and **Releases** holds candidate reviews. [[showpass-qa-city/README|City app setup and capabilities]]

## Agents, roles, and skills

An **agent** is a named assignee in City. A **role** defines the perspective and work it owns. A **skill** gives that role reusable Showpass knowledge and guidance. An **assignment** gives it a specific job.

Each assignment owns one job, one starting session, and one stopping point. A role can take different jobs in separate assignments. When work crosses into another job or account, hand off the verified record and have the receiving assignment go through the shared review policy. [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|Shared review policy]]

### Codex skill directory

Open the QA Vault as the Codex project and use the skill name in a request. The skills and their supporting files live in this repository under `.agents/skills/`.

| Agent or workflow | Codex skill | Use it for |
| --- | --- | --- |
| Organizer Builder | `$showpass-beef-up-event` · [Skill file](../.agents/skills/showpass-beef-up-event/SKILL.md) | Configure test scenarios across permitted Organizer Dashboard pages and verify saved setup. |
| Organizer Tester | `$showpass-organizer-tester` · [Skill file](../.agents/skills/showpass-organizer-tester/SKILL.md) | Test behavior, permissions, usability, and recovery across permitted Organizer Dashboard pages. |
| Guest Tester | `$showpass-public-tester` · [Skill file](../.agents/skills/showpass-public-tester/SKILL.md) | Test signed-out discovery or guest checkout on an approved public website or widget. An assigned read-only Event Preview can use its authorized Preview session. |
| Customer Tester | `$showpass-customer-tester` · [Skill file](../.agents/skills/showpass-customer-tester/SKILL.md) | Test signed-in discovery, public website or widget checkout, or one Account action. Sending and accepting transfers are separate jobs in the applicable accounts. |
| Box Office Tester | `$showpass-box-office-tester` · [Skill file](../.agents/skills/showpass-box-office-tester/SKILL.md) | Verify one staff operation, such as lookup, sale, Check In, or a specified post-sale action. |
| QA Lead | `$showpass-qa-lead` · [Skill file](../.agents/skills/showpass-qa-lead/SKILL.md) | Challenge plans and independently decide whether to approve the exact revision or engineering handoff. |
| Release Engineer | `$showpass-release-engineer` · [Skill file](../.agents/skills/showpass-release-engineer/SKILL.md) | Review business risks and assemble the engineering handoff. |
| Backend Master | `$showpass-backend-master` · [Skill file](../.agents/skills/showpass-backend-master/SKILL.md) | Trace backend rules, permissions, and saved outcomes for the reviewed revision. |
| Frontend Master | `$showpass-frontend-master` · [Skill file](../.agents/skills/showpass-frontend-master/SKILL.md) | Trace frontend entry points, shared clients, visible behavior, and recovery. |
| Browser QA | `$showpass-qa-tester` · [Skill file](../.agents/skills/showpass-qa-tester/SKILL.md) | Run exploratory checks, focused smoke tests, and regressions in the Codex browser. |
| Qase Police | `$qase-police` · [Skill file](../.agents/skills/qase-police/SKILL.md) | Review manual Qase drafts for reusable setup, independently checkable results, and clear steps. |
| Bug Drafter | `$showpass-bug-drafter` · [Skill file](../.agents/skills/showpass-bug-drafter/SKILL.md) | Turn a verified finding into a copy-ready Jira draft. |
| Regression Investigator | `$showpass-regression-investigator` · [Skill file](../.agents/skills/showpass-regression-investigator/SKILL.md) | Trace failures that differ across records or Organizations to configuration or a code change. |
| Sentry Investigator | `$showpass-sentry-investigator` · [Skill file](../.agents/skills/showpass-sentry-investigator/SKILL.md) | Investigate a Sentry issue through read-only access and trace its impact in source. |
| Branch Digest | `$showpass-branch-digest` · [Skill file](../.agents/skills/showpass-branch-digest/SKILL.md) | Summarize changes between Showpass branches and identify regression checks. |
| Jira and PR explainer | `$deslop-jira-pr` · [Skill file](../.agents/skills/deslop-jira-pr/SKILL.md) | Explain or rewrite Jira and PR descriptions and turn QA checklists into runnable walkthroughs. |

#### Supporting skills and related workflows

| Skill | Use it for | Upstream source |
| --- | --- | --- |
| [Find Skills](../.agents/skills/find-skills/SKILL.md) | Find skills and add approved ones to the vault. | [Vercel Skills](https://github.com/vercel-labs/skills/tree/main/skills/find-skills) |
| [Obsidian Markdown](../.agents/skills/obsidian-markdown/SKILL.md) | Edit vault notes, including wikilinks, properties, and callouts. | [Obsidian Skills](https://github.com/obsidianmd/obsidian-skills/tree/main/skills/obsidian-markdown) |
| [Playwright CLI](../.agents/skills/playwright-cli/SKILL.md) | Work with Playwright tests or automate an authorized local browser check. | [Microsoft Playwright CLI](https://github.com/microsoft/playwright-cli) |

Find reusable vault procedures in [[00 Start Here/QA Operating Workflow|QA Operating Workflow]]. For repository-specific work, use the [Playwright workflow index](../../showpass-playwright/docs/agent-workflows/README.md), the [frontend skills](../../showpass-frontend/.agents/skills/), the [backend skills](../../web-app/.agents/skills/), or the [Showpass Skill Marketplace](../../skill-marketplace/skills/README.md).

City lists **Organizer Tester** and **Organizer Builder** separately. Both can work on the same Dashboard page. “Test Organization contact settings” goes to the Tester. “Configure Organization contact settings for this scenario” goes to the Builder. The Builder can also use the specialized Event or Offering workflows when they fit the assignment. The user's permission and the selected Organization determine which controls either agent can use.

The **QA Lead**, **Release Engineer**, **Backend Master**, and **Frontend Master** are review roles. The Masters use the [[01 Repositories/Backend - web-app|backend]] and [[01 Repositories/Frontend - showpass-frontend|frontend]] references to locate evidence for the exact scope.

### Qase Police

**Qase Police** reviews whether another QA can run a draft using only its Qase fields. Give the reviewer the draft and its source notes. They check how to find suitable data, what to record before the run, and whether each expected result can be checked independently. They keep exact Showpass controls and required settings, check whether supported variants can share one Qase Single parameter, and return copy-ready fields with any missing facts identified. [[05 Tooling/Qase Test Case Writing Rules#Qase Police|Review checklist]]

This is a draft review role. In City, open **Qase Police** from **Agents** or select **Qase Review** on the City map. Choose **Review in Codex** and provide the draft or its vault path. You can also invoke `$qase-police` directly in Codex. The [[03 Test Cases/Group Sales and Transfers/spw-21449-required-ticket-transfer-question-test-cases#Manual case|ticket transfer case]] shows the result. Its order-level and per-ticket variants share one case and both are marked **Not run**.

## Review and scope

Review depth follows the work. A bounded live check or routine beta build gets short Release Engineer review and QA Lead sign-off. High-risk and release work brings in both Masters and requires QA Lead sign-off on the Release Engineer’s handoff. Draft-only work stays at the written-draft scope. A Showpass Event saved as Draft is live test-data setup.

QA Lead approval applies to the reviewed plan. A changed plan needs another decision, and the user's authorization still determines what can happen in Showpass. Across roles, review protects purchase and recovery, fees, reporting, payouts, issued items, and admission where affected. [[06 Prompts/Showpass Release Engineering Handoff|Shared review policy and business cases]]

Builders and Testers state what they will verify and when they will stop. Review the safety of gathering that proof on beta. For an isolated Draft or bounded read, the approved plan can verify readiness and gather the expected proof during execution. [[06 Prompts/Showpass Release Engineering Handoff#Plan the proof and stopping point|Plan and proof guidance]]

## Execution and evidence

City uses the local Codex App Server and the QA Vault’s repository skills for planning and review. **Run in Codex** sends an approved Organizer assignment to its agent's paired chat for execution in the authorized in-app browser. The existing **Organizer builder** chat belongs to the Builder. The Tester can use **Open in Codex** or its own paired chat. City retains the dedicated Playwright runner in code and shows its earlier results. [[showpass-qa-city/README|Execution options and local prerequisites]]

For an open-ended build anywhere under `/manage/`, the Builder plans realistic values and settings that give the next tester specific behavior to exercise. A club Membership could have two Levels with different access and a relevant Member question. A Product could have variants with different inventory and pickup choices. A request to configure Organization contact settings stays on the contact section and proves the exact saved values. The Builder reopens the agreed settings and relationships, records any missing proof, and carries verified fields and IDs forward using backend names.

The **Build preset** selects defaults for Events, Products, Memberships, discounts, Ticket Credits, Packages, and other Dashboard setup. **Scenario theme** supplies relevant Sports, Music, Comedy, Seasonal, or Comic Con context for any of those builds. City can infer both from the request and accepts a manual selection. A Product build can use theme-specific variants with distinct SKUs, prices, stock, purchase limits, eligibility, and fulfillment.

City uses the saved QA venue and suggests reusable verified builds in that venue. The Builder plans any required supporting records and explicit beta publication together with the primary setup. In full review, both Masters can start from the same scoped Builder plan before the Release Engineer prepares the handoff for QA Lead sign-off. [[showpass-qa-city/README|City setup and review]] · [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|Shared review policy]]

The user supplies Event images. The Guest Tester can independently review the saved Event's Preview under an approved read-only plan. Testers and builders record findings observed in their assigned job with evidence and any missing proof. [[06 Prompts/Interactive Browser Release Testing]] · [[06 Prompts/Showpass QA Competitor Comparisons]]

For a named Qase case, carry its saved ID, selected parameter, quantities, and expected results across the handoffs. Route public checkout to Guest Tester or Customer Tester based on session state. Box Office Tester owns staff-side checkout. [[06 Prompts/Interactive Browser Release Testing#Run a named Qase case|Named Qase case workflow]]

From **Organizer Workshop**, choose **Start transfer pilot** and supply the buyer and recipient test emails. The Organizer Builder verifies the Event and Ticket Type, then the Customer Tester takes three separately reviewed jobs in order. Buy four tickets, send three from the original buyer account and verify one remains, then accept three in the recipient account. City queues each next job after the previous result is verified. [[06 Prompts/Interactive Browser Release Testing#Builder, purchase and transfer handoff|Transfer evidence and stopping points]]

## Examples to build on

- [[03 Test Cases/Events/Northern Cage MMA Draft and Preview - 2026-11-22|MMA Draft and Preview]] shows the Builder and read-only Preview handoff with two saved ticket tiers.
- [[03 Test Cases/Events/Toronto Christmas Market City Draft - 2026-11-22|Christmas market]] shows the dedicated runner saving and reopening a Draft with two custom questions.
- [[03 Test Cases/Events/Bouncy House Fun Day for Kids - QA City Draft|Bouncy house]] shows the paired Organizer agent creating and verifying a Draft. That run needed a manual status refresh. Shared run visibility and live progress across sessions are being developed.
- [[03 Test Cases/Group Sales and Transfers/Partial Ticket Transfer Pilot - 2026-11-23|Partial ticket transfer pilot]] shows the handoff and sender-side evidence from a separate four-ticket purchase and three-ticket send. The pilot records [SPT-6025](https://app.qase.io/case/SPT-6025) parameter coverage independently.

For a new role or workflow, document its owner, the scope it can handle, and the evidence it returns. Link its first verified run so a new session can see what was actually exercised.
