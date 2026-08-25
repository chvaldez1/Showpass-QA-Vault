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

- [[03 Test Cases/Events/event-management-qase-test-cases|Qase cases, coverage, and gap analysis]]
- [[03 Test Cases/Events/event-management-csv-to-qase-test-case-map|CSV to existing and new Qase test case map]]

## Assignment Guidance

1. Assign the high-risk overview, lifecycle, permissions, Custom Display Fields, Edit Sellers, and Stats & Info rows first.
2. Branding, Email Customization, Tracking Links, Facebook Integration, Email Guests, and Attraction Configuration are now correctly placed for this event-management scope.
3. Keep Transactions and Check In execution to the selected-event handoff; their deep feature suites remain separate.
4. Stop Financial Settings and Map Editor / Assigned Seating after page or section presence is proven.
5. Leave Workflow Approval suite 949 unchanged because it is outside this feature-parity move.
