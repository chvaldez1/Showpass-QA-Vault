---
title: Showpass QA City
date: 2026-11-22
tags:
  - qa/city
  - qa/workflow
---

# Showpass QA City

QA City gives Showpass's AI manual testers and assistants a shared way to take assignments, review proposed work, and record evidence. This note describes what we added and what each part owns as the City grows.

## Find cases and plan a handoff

1. Start at [[03 Test Cases/Test Cases by Feature|03 Test Cases, QA City's knowledge base]]. Find the owning screen or feature, then use [[03 Test Cases/Test Cases by Feature#Connected feature journeys|Connected feature journeys]] to see what the next actor needs to verify.
2. Use the matching walkthrough in the [[00 Start Here/Showpass QA Handbook/00 Index|Showpass QA Master Handbook]] to choose setup, test data and proof. Assign the work using [[#Route short QA prompts]]. When a second actor takes over, name the record that must already exist, its safe reference and verified state, the action that creates or changes the next record, and the exact outcome to verify.
3. Attach the relevant vault note and heading, saved Qase ID and selected parameters when applicable, and the verified setup or run evidence. City brings the handbook’s scenario guidance, journey index and matching feature notes into planning. For draft review, paste the needed case fields and supply the pinned source excerpts for that revision so reviewers can verify the specific behavior.
4. When a link or case is missing, use [[03 Test Cases/Test Cases by Feature#Fill a gap|the gap workflow]]. Put the result in the owning feature note and link it from any affected feature so the next assignment can find it.

### Build a connected scenario

Start in **Organizer Builder** when the request is to design or prepare an Event setup. Choose the linked records and saved settings that make the next test interesting. For each one, state the intended result, what already exists, what to create or update, and what to reopen in Dashboard. Assign purchasing, admission and post-purchase jobs to their own testers using the verified record references. [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes#Start with the setup and follow the records|Scenario design guide]]

For **Draft test cases with review**, include those relationships and state variations in the assignment. Have the test and review roles follow the affected records across the relevant features. Include a clean result and any material negative or recovery branch. [[03 Test Cases/Exchanges/Discounted Package Exchange Scenario|Worked Event build and Package exchange]] · [[06 Prompts/Showpass QA Test Case Generator#Discover and prioritize cases|Case generator guidance]]

## UI

Select a building on the **City map** to see its open assignments, blockers, and next actions. Review queues show tester plans waiting for each review role. Open a queue item to work on its current revision. **Runs** holds the full assignment history, and **Releases** holds candidate reviews. [[showpass-qa-city/README|City app setup and capabilities]]

## Playwright handoffs

Open **Playwright** in City to prepare a prompt, plan, or branch for the [Playwright repo’s Automation Lead](../../showpass-playwright/docs/agent-workflows/playwright-team.md). Choose **Open repo in Codex** for a direct start. From **Runs** or **Builds**, choose **Prepare Playwright handoff** to bring the selected evidence with you. Review the scope and evidence, save the handoff, then select **Open in Codex**. City and the repo team use the same file. **Reload handoff** shows the latest owner, blocker, review, and run result recorded by the team.

The Playwright checkout owns its [agent definitions](../../showpass-playwright/.codex/agents/), skills and handbook. It routes journey questions to the actual user’s QA Tester, code and fixes to the same SDET, and independent diff review to Playwright Police. The [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|shared review policy]] determines when QA Lead signs off. [[showpass-qa-city/README#Playwright automation|Checkout setup and handoffs]]

## Agents, roles, and skills

An **agent** is a named assignee in City. A **role** defines the perspective and work it owns. A **skill** gives that role reusable Showpass knowledge and guidance. An **assignment** gives it a specific job.

Each assignment owns one job, one starting session, and one stopping point. A role can take different jobs in separate assignments. When work crosses into another job or account, hand off the verified record and have the receiving assignment go through the shared review policy. [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|Shared review policy]]

### Route short QA prompts

Every Showpass QA prompt, including a follow-up or a document edit, has an owning role and an independent reviewer. Choose the owner based on the requested outcome and use its skill from the [[#Codex skill directory]]. Honor skills the user names.

For an existing feature, use [[#Find cases and plan a handoff]] to give the owner the relevant case, walkthrough and related checks.

Delegate the review to a separate agent before delivering the result. For an answer or small edit, give one reviewer the exact draft or diff. Ask them to check that it answers the request, stays within scope, and preserves content the user wanted to keep. Use the existing review path for manual drafts, live tests, and release work.

| What the user wants | Role and scope |
| --- | --- |
| “What could go wrong if we make Kiosk mode editable in Admin?” | **Backend Master** traces the setting, permissions, saved behavior, and downstream effects. Use **Frontend Master** where the answer depends on what staff or customers see on a device, including when it picks up the change. Give the concrete failure scenarios and their impact in chat, with any unverified behavior identified. |
| “Why does this work for one Organization but fail for another?” | **Regression Investigator** compares the records, settings, and code. |
| “Can you try it?” | Start with **Customer Tester** for signed-in public or Account work, **Guest Tester** for signed-out public work, **Organizer Tester** for the Organizer Dashboard, or **Box Office Tester** for staff operations. The owner uses the shared **Browser QA** workflow for live checks. |
| “Generate test cases for customer emails in their selected language. Test the customer and venue sides.” | **Customer Tester** owns customer-triggered email cases. **Organizer Tester** traces the saved Venue language, fallback and Organizer-triggered sends. Add **Box Office Tester** or **Guest Tester** when their supported entry points affect the requested outcome. Both Masters verify what controls the language for each in-scope send. The QA Lead sends back cases that omit a required saved value or could pass using the wrong language rule. |
| “Are we ready to release this?” | **Release Engineer** scopes the review and applies the shared review policy. **QA Lead** independently reviews the exact handoff. |

A question about what might go wrong is a source review. Admin access and live testing require the applicable user authorization.

### Tester ownership and progress

The tester is the first point of contact. Name them before writing the plan. Use the requested actor and available session context to choose the role. A public **Join guestlist** modal belongs to the Customer Tester in a signed-in session and the Guest Tester in a signed-out session. If preflight reveals a different actor, pause the affected checks and return the plan to the appropriate tester for review under the shared policy.

**Tester owns the plan → Release Engineer reviews → QA Lead decides → Tester runs the checks → Tester reports the evidence.** The tester handles revisions and stays responsible for the result. See [[#Draft test cases with review]] for the written-case review path.

In **Runs → Current work**, the assignment shows each stage and its owner. During Codex work, share brief progress updates for the owner and scope, plan, review decision, meaningful checks, blockers, and final evidence. Use one update for related actions and keep pending steps visibly pending.

### Codex skill directory

For the vault-owned roles below, open the QA Vault as the Codex project and use the skill name in a request. The skills and their supporting files live in this repository under `.agents/skills/`.

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
| [Playwright CLI](../.agents/skills/playwright-cli/SKILL.md) | Operate Playwright CLI for an authorized browser check. Start automation assignments with the repo team. | [Microsoft Playwright CLI](https://github.com/microsoft/playwright-cli) |

Find reusable vault procedures in [[00 Start Here/QA Operating Workflow|QA Operating Workflow]]. For repository-specific work, start with the [Playwright team workflow](../../showpass-playwright/docs/agent-workflows/playwright-team.md), the [frontend skills](../../showpass-frontend/.agents/skills/), the [backend skills](../../web-app/.agents/skills/), or the [Showpass Skill Marketplace](../../skill-marketplace/skills/README.md).

City lists **Organizer Tester** and **Organizer Builder** separately. Both can work on the same Dashboard page. “Test Organization contact settings” goes to the Tester. “Configure Organization contact settings for this scenario” goes to the Builder. The Builder can also use the specialized Event or Offering workflows when they fit the assignment. The user's permission and the selected Organization determine which controls either agent can use.

The **QA Lead**, **Release Engineer**, **Backend Master**, and **Frontend Master** are review roles. The Masters use the [[01 Repositories/Backend - web-app|backend]] and [[01 Repositories/Frontend - showpass-frontend|frontend]] references to locate evidence for the exact scope.

### Qase Police

**Qase Police** reads each submitted case as a teammate opening it in Qase. Can they find the record, choose the right value, and tell a pass from a failure using that case alone? For each unclear field, the reviewer quotes the wording and supplies a concrete replacement or names the missing fact. Product labels and proof stay in the case. Technical rationale stays in the review notes. [[05 Tooling/Qase Test Case Writing Rules#Qase Police|Review checklist]]

City includes Qase Police in every new draft review. For a separate copy edit, open **Agents → Qase Police → Review in Codex**, select **Qase Review** on the City map, or invoke `$qase-police` with the draft. The [[03 Test Cases/Group Sales and Transfers/spw-21449-required-ticket-transfer-question-test-cases#Manual case|ticket transfer case]] shows how two settings can share one case while retaining different expected results.

## Draft test cases with review

Choose the tester who owns the requested flow. In City, select **Draft test cases with review** as the assignment's **Review path**, then open it in **Runs → Current work**. Paste existing cases to review them as written or leave the field empty for the tester to draft. Give the Masters the relevant repository-relative source paths, with line ranges for long files. Use `@commit` on the first line for an earlier local revision. Select **Start draft review** once. City sends the draft and selected excerpts to your configured Codex account and saves the evidence against each revision.

1. The owning tester drafts the highest-impact journeys. Supporting testers look for a failure their actor could encounter even if the proposed checks passed.
2. The QA Lead lists the outcomes the cases need to prove. For each one, record the actor, the setup or competing settings, and how a broken feature could appear to pass. Include consequential checks from any submitted baseline. Focused questions go to the Masters.
3. The Backend Master traces the rule through the caller or job to the saved or delivered result. The Frontend Master traces the visible control through the request to what the person can see or reopen. Each cites the relevant source and names any missing evidence. City reviewers can inspect only the excerpts supplied for that revision.
4. The Release Engineer reconciles the findings and maps each outcome to quoted setup and results in the submitted case fields. Open **Coverage map** on the revision to see missing or deferred checks, and compare restored, lost or changed proof with the previous revision. Required outcomes carry forward through splits and renumbering. Missing or deferred proof returns to the tester. Where two checks prove the same outcome, propose a combined case or parameter.
5. Qase Police opens one case at a time with only its submitted fields. The reviewer describes the record, action and result as the assigned tester would understand them. If they have to supply any of those instructions themselves, they quote the first obstacle and return it to the owner. City saves each case read before continuing. The QA Lead checks the exact submitted wording at sign-off. A correct technical explanation in a Master's review cannot fill a gap in the case.
6. On **Changes requested**, City saves the decision in **History** and automatically returns fixable issues to the tester. Reviewers revisit their earlier concerns against the new text and evidence. If a fix removed another necessary check, reopen it. Stop at **Ready to use**, a material question the team cannot answer, or a stage that cannot make progress.

Leave City running if you close the tab. Use **Pause review** to stop at the last saved stage, or **Continue review** after supplying requested information. Execution stays **Not run**. Live testing and Qase publication follow their own workflows.

In Codex, use the [[06 Prompts/Showpass QA Test Case Generator|test case generator]] for the owner’s draft and hand the exact revision and supporting evidence to the same roles in separate contexts. The owner revises the same vault note. Record scope, source findings, and the final QA Lead decision for that revision. Use the [[05 Tooling/Qase Test Case Writing Rules#Copy-to-Qase Review Gate|Copy-to-Qase review]] for case fields and format.

## Review and scope

Review depth follows the work. A bounded live check or routine beta build gets short Release Engineer review and QA Lead sign-off. High-risk and release work brings in both Masters and requires QA Lead sign-off on the Release Engineer’s handoff. Draft-only work stays at the written-draft scope. A Showpass Event saved as Draft is live test-data setup.

QA Lead approval applies to the reviewed plan. A changed plan needs another decision, and the user's authorization still determines what can happen in Showpass. Across roles, review protects purchase and recovery, fees, reporting, payouts, issued items, and admission where affected. [[06 Prompts/Showpass Release Engineering Handoff|Shared review policy and business cases]]

Builders and Testers state what they will verify and when they will stop. Review the safety of gathering that proof on beta. For an isolated Draft or bounded read, the approved plan can verify readiness and gather the expected proof during execution. [[06 Prompts/Showpass Release Engineering Handoff#Plan the proof and stopping point|Plan and proof guidance]]

## Execution and evidence

Each City role follows the [QA Vault final output rules](../AGENTS.md#final-outputs). A teammate should be able to open a case or handoff on its own and see where to start, what to do, what they should see, and which results were actually verified.

For exploratory assignments, Testers use whatever the request provides as a starting point and exercise realistic inputs and conditions that could change the user outcome. The Release Engineer and QA Lead check that the plan can expose a failure of that outcome. A test that misses its stated expectation is **Failed**, even when the source explains the result. [[00 Start Here/World-Class Software Quality Standard#11. Finding Classification|How to classify findings]]

For manual tester and builder plans, City uses the local Codex App Server and the QA Vault’s repository skills. **Run in Codex** sends an approved Organizer assignment to its agent's paired chat for execution in the authorized in-app browser. The existing **Organizer builder** chat belongs to the Builder. The Tester can use **Open in Codex** or its own paired chat. City retains the dedicated Playwright runner in code and shows its earlier results. [[showpass-qa-city/README|Execution options and local prerequisites]]

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
