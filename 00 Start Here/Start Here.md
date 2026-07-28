# Start Here

This vault is the local source of truth for Showpass QA standards, test design, browser execution, Qase workflows, and automation planning. Application and Playwright repositories remain the source of truth for product behavior and implementation patterns.

## Quality Standard

Read [[00 Start Here/World-Class Software Quality Standard]] before creating QA coverage, executing browser tests, planning automation, triaging a defect, or making a release recommendation.

## Main Folders

- [[01 Repositories/Backend - web-app|Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend|Frontend - showpass-frontend]]
- [[01 Repositories/QA Automation - showpass-playwright|QA Automation - showpass-playwright]]
- [[02 Feature QA/Feature Note Template|Feature QA]]
- [[03 Test Cases/Test Cases by Feature|Test Cases]]
- [[04 Automation/Automation Candidate Template|Automation]]
- [[05 Tooling/qasectl|Tooling]]
- [[06 Prompts/Showpass QA Test Case Generator|Prompts]]

## Basic Workflow

1. Declare the scope, testing intent, proof targets, and data-safety boundaries.
2. Inspect backend behavior as first product source of truth.
3. Confirm how the frontend exposes the behavior and its state-distinct entry paths.
4. Build the coverage contract and account for controls, states, validation, mutations, outcomes, and cleanup.
5. Write or execute focused tests and maintain the coverage ledger.
6. Promote stable high-value coverage into automation.
7. Make one evidence-backed release recommendation.

Flow: Quality standard → Backend behavior → Frontend entry paths → Coverage contract → Test execution → Automation → Release decision.
