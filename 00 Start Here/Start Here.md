# Start Here

This vault is the local source of truth for Showpass QA standards, test design, browser execution, Qase workflows, and automation planning. Application and Playwright repositories remain the source of truth for product behavior and implementation patterns.

## Put the goals into practice

Our goals are to help the team release with more confidence, automate useful repeatable work, and keep improving how QA works.

- [[00 Start Here/QA Operating Workflow|Run QA from early risk review through release and follow-up]].
- [[06 Prompts/Release Coverage Review|Gather and compare actual Qase, Playwright and browser coverage for a change]].
- [[03 Test Cases/Release Decision Template|See Qase, Playwright and browser coverage, actual results and remaining release checks in one note]].
- [[04 Automation/00 Index|Turn automation candidates into verified, running protection]].
- [[00 Start Here/QA Improvement Log|Measure results and trial better ways of working]].
- [[06 Prompts/Escaped Bug To Regression|Turn a confirmed escaped bug into a verified regression check]].

The [[02 Feature QA/QA Process/Vault Review - 2026-10-31|October 31 vault review]] explains the findings, changes and remaining limits.

## Quality Standard

Read [[00 Start Here/World-Class Software Quality Standard]] before creating QA coverage, executing browser tests, planning automation, triaging a defect, or making a release recommendation.

Use [[00 Start Here/Showpass QA Handbook/00 Index|Showpass QA Master Handbook]] for hands-on Showpass testing: choose the Venue and configuration, create the offering as Organizer, purchase as Customer, verify Attendee/Member fulfillment, and follow Venue Employee post-purchase actions through Inventory and money. Add its senior-QA integration passes and right-layer automation/device checks to catch risks early.

## Main Folders

- [[01 Repositories/Backend - web-app|Backend - web-app]]
- [[01 Repositories/Frontend - showpass-frontend|Frontend - showpass-frontend]]
- [[01 Repositories/QA Automation - showpass-playwright|QA Automation - showpass-playwright]]
- [[02 Feature QA/00 Index|Feature QA]]
- [[03 Test Cases/Test Cases by Feature|Test Cases]]
- [[04 Automation/00 Index|Automation]]
- [[05 Tooling/qasectl|Tooling]]
- [[06 Prompts/Showpass QA Test Case Generator|Prompts]]
- [[09 Appium/Appium|Native/mobile and Safari automation]]

## Basic Workflow

1. Declare the scope, testing intent, proof targets, and data-safety boundaries.
2. Inspect backend behavior as first product source of truth.
3. Confirm how the frontend exposes the behavior and its state-distinct entry paths.
4. Build the coverage contract and account for controls, states, validation, mutations, outcomes, and cleanup.
5. Write or execute focused tests and maintain the coverage ledger.
6. Promote stable high-value coverage into automation.
7. Make one evidence-backed release recommendation.

Flow: Quality standard → Backend behavior → Frontend entry paths → Coverage contract → Test execution → Automation → Release decision.
