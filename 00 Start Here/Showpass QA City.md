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

The local City app presents the agents and their responsibilities. **Runs** is where an assignment lives, including who owns it, whether the agent drives or guides the user, its plan revisions, and its evidence. **Releases** is where the team reviews a release candidate and its supporting evidence. The app uses Next.js, TypeScript, Tailwind, and shadcn/ui with pnpm. [[showpass-qa-city/README|City app setup and capabilities]]

## Agents, roles, and skills

An **agent** is a named assignee in City. A **role** defines the perspective and work it owns. A **skill** gives that role reusable Showpass knowledge and guidance. An **assignment** gives it a specific job.

| Built-in agent | Role and scope |
| --- | --- |
| Public Tester | Browses as a visitor or signed-in Customer, checks Preview and existing Account records, and stops before purchase. |
| Customer Tester | Exercises an authorized test purchase and verifies the saved order and issued items. |
| Organizer Tester | Tests behavior and UX across permitted `/manage/` pages as an Organizer or Venue Employee. It can verify an authorized edit when the save is part of the test. |
| Organizer Builder | Builds or updates the requested configuration across permitted `/manage/` pages, such as Events, Products, Memberships, promotions, and Organization settings. It verifies the saved setup and hands it off. |
| Box Office Tester | Tests authorized staff sales, order lookup, ticket delivery, and Check In as a Venue Employee. |

City lists **Organizer Tester** and **Organizer Builder** separately. They have their own profiles and skills, `showpass-organizer-tester` and `showpass-beef-up-event`. Both can work on the same Dashboard page. “Test Organization contact settings” goes to the Tester. “Configure Organization contact settings for this scenario” goes to the Builder. The Builder can also use the specialized Event or Offering workflows when they fit the assignment. The user's permission and the selected Organization determine which controls either agent can use.

The **QA Lead**, **Release Engineer**, **Backend Master**, and **Frontend Master** are review roles. The QA Lead challenges whether the scenario is realistic, considers alternatives, and signs off on the exact revision. The Release Engineer identifies business exposure and assembles the engineering handoff. The Masters trace the exact scope using the [[01 Repositories/Backend - web-app|backend]] and [[01 Repositories/Frontend - showpass-frontend|frontend]] references.

## Review and scope

Review depth follows the work. A bounded live check or routine beta build gets short Release Engineer review and QA Lead sign-off. High-risk and release work brings in both Masters and requires QA Lead sign-off on the Release Engineer’s handoff. Draft-only work stays at the written-draft scope. A Showpass Event saved as Draft is live test-data setup.

QA Lead approval applies to the reviewed plan. A changed plan needs another decision, and the user's authorization still determines what can happen in Showpass. Across roles, review protects purchase and recovery, fees, reporting, payouts, issued items, and admission where affected. [[06 Prompts/Showpass Release Engineering Handoff|Shared review policy and business cases]]

## Execution and evidence

City uses the local Codex App Server and installed skills for planning and review. **Run in Codex** sends an approved Organizer assignment to its agent's paired chat for execution in the authorized in-app browser. The existing **Organizer builder** chat belongs to the Builder. The Tester can use **Open in Codex** or its own paired chat. **Run approved plan** has its own dedicated local Playwright browser for the supported beta single-day Event Draft and custom-question workflow. Existing Codex access and local tooling support the current prototype. [[showpass-qa-city/README|Execution options and local prerequisites]]

Builders use realistic scenario details and carry verified Showpass record fields forward using backend names. The user supplies Event images. A Public Tester can independently review the saved Event's Preview under its own approved scope. Testers assess the UX alongside functional behavior and report confirmed bugs, usability friction, observations, and blockers with evidence. Competitor examples can inform what to look for. [[06 Prompts/Interactive Browser Release Testing]] · [[06 Prompts/Showpass QA Competitor Comparisons]]

## Examples to build on

- [[03 Test Cases/Events/Northern Cage MMA Draft and Preview - 2026-11-22|MMA Draft and Preview]] shows the Builder and Public Tester handoff with two saved ticket tiers.
- [[03 Test Cases/Events/Toronto Christmas Market City Draft - 2026-11-22|Christmas market]] shows the dedicated runner saving and reopening a Draft with two custom questions.
- [[03 Test Cases/Events/Bouncy House Fun Day for Kids - QA City Draft|Bouncy house]] shows the paired Organizer agent creating and verifying a Draft. That run needed a manual status refresh. Shared run visibility and live progress across sessions are being developed.

For a new role or workflow, document its owner, the scope it can handle, and the evidence it returns. Link its first verified run so a new session can see what was actually exercised.
