---
title: Event — Email guests
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Email guests

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Existing cases

The full SPT-5012–5018 cases are in [[03 Test Cases/Events/04 Operations/email-guests-feature-parity-test-cases|Email guests cases]]. Keep that one canonical case file. SPT-5115/5116 overlap those cases; their short native-page steps do not add delivery proof.

Scope: recipient ticket selection, optional subject, message editor, PDF attachment, status/refund controls, validation, pending review versus submission success. Only controlled recipient inboxes may be used. Inbox delivery, recipient deduplication and refund completion are distinct backend integration gaps, not proven by a success message.

Source: [Email guests page](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/events/email-guests/ui/pages/EventEmailGuestsPage.web.tsx>).

