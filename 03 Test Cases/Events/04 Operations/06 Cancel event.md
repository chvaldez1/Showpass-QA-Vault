---
title: Event — Cancel event
date: 2026-10-04
tags:
  - qa/test-cases
  - events
status: Local review draft; not executed or pushed
---

# Cancel event

[[03 Test Cases/Events/event-management-qase-test-cases|Events case index]]

## Safety and remaining gap

SPT-5108/5109 below are existing Qase drafts, **not yet execution-ready**: “reversible test data” is not adequate cancellation setup, and refund preview success is not final refund proof. Cancellation may charge organizer fees, cancel events and start customer refunds. Do not execute their generic submit step on shared data.

Required enhancement before execution: controlled paid orders, exact allowed refund type and permission, preview amounts, applicable organizer-payment setup, whole-series versus occurrence eligibility, submission once, final refund/event/order/ledger readback and unchanged comparison orders. Keep cancelled/refunded data for reconciliation rather than trying to restore it. Backend source confirms locked eligibility checks, credit-memo staging and asynchronous refund effects; source inspection does not prove provider completion.

Sources: [event refund endpoint](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>), [refund service](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/event_management/event_refund.py>).

## Additional existing Qase cases

Read on 2026-10-04. These are existing cases, not new drafts; any local enhancement is labelled separately.

### SPT-5108: Events - Cancel an eligible single event and verify refund submission

**Description:**

Verify the migrated cancellation page calculates a preview and completes an eligible no-charge cancellation.

**Parameters:**
```json
{
  "event_type": "single",
  "refund_outcome": "no-charge"
}
```

**Preconditions:**

Organizer has Events permission; an eligible single event with reversible test data exists; cancellation cutover is enabled.

**Postconditions:**

Event is cancelled only in an isolated test venue or the original state is restored.

**Tags:** dashboard, events, cancellation

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the event cancellation route |  | Page loads without legacy-page error |
| Select the event cancellation scope and review the refund preview |  | Preview reflects the selected event scope and required refund outcome |
| Submit cancellation and confirm |  | Success confirmation appears and the event state is updated |

### SPT-5109: Events - Enforce cancellation eligibility, permission, and recurring-event scope

**Description:**

Verify cancellation is fail-closed for unauthorized or blocked events and that a recurring-event scope cannot reuse stale preview data.

**Parameters:**
```json
{
  "event_type": "recurring",
  "role": "unauthorized-or-authorized"
}
```

**Preconditions:**

Have an unauthorized organizer, a blocked event, and an eligible recurring event or occurrence.

**Postconditions:**

No cancellation is submitted.

**Tags:** dashboard, events, cancellation

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the cancellation route as an unauthorized user |  | Actionable controls are absent or safe denial is shown |
| Open a blocked event cancellation route |  | Blocked reason is shown and no refund is submitted |
| For a recurring event switch between whole-series and occurrence scope |  | Each scope refreshes the preview and stale values are not submitted |

