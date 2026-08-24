---
title: Event Management QA Assignment Matrix
date: 2026-08-24
tags:
  - qa/planning
  - events
  - qase
aliases:
  - Event Management Test Assignments
---

# Event Management QA Assignment Matrix

The Coda-ready assignment table is maintained in [[03 Test Cases/Events/event-management-qa-assignment-matrix.csv|Event Management QA Assignment Matrix CSV]]. It preserves the user's three columns: `Assignee`, `Page / Section / Feature`, and `Coverage`.

The CSV now accounts for every source-backed destination visible in the event-management sidebar plus conditional pages that may not appear for the screenshot fixture. Import the CSV into Coda; do not copy a Markdown or code-block table.

Related analysis:

- [[03 Test Cases/Events/event-management-existing-qase-gap-analysis|Existing Qase coverage, suite placement, and gap analysis]]
- [[03 Test Cases/Events/event-management-new-qase-gap-analysis|Suggested Qase-ready cases]]
- [[03 Test Cases/Events/event-management-csv-to-qase-test-case-map|CSV to existing and new Qase test case map]]

## Assignment Guidance

1. Assign the high-risk overview, lifecycle, permissions, Custom Display Fields, Edit Sellers, and Stats & Info rows first.
2. Existing Branding, Email Customization, Tracking Links, Facebook Integration, Workflow Approval, Email Guests, and Attraction Configuration rows are coverage review or suite-move work—not automatically new-case work.
3. Keep Transactions and Check In execution to the selected-event handoff; their deep feature suites remain separate.
4. Stop Financial Settings and Assigned Seating after page or section presence is proven.
