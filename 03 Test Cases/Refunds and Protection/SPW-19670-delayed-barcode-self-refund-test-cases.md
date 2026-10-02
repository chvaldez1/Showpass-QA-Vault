---
title: Delayed Barcode Customer Self-Refund Test Cases
jira: SPW-19670
status: blocked-source-not-merged
date: 2026-09-24
tags:
  - qa/test-cases
  - refunds
---

# Delayed Barcode Customer Self-Refund Test Cases

> [!important] No Qase-ready manual cases yet
> [SPW-19670](https://showpass.atlassian.net/browse/SPW-19670) calls for a separate Venue setting that lets customers return eligible delayed-barcode tickets after the barcode is released. That setting and its My Orders behavior were absent from the checked-out code on 2026-09-24. There are no runnable cases for this card yet. No Qase access, diff, or browser run was performed.

## Testing Intent

We need to prove that a venue can opt into customer self-return of an otherwise eligible delayed-delivery ticket after its barcode is released, while the default-off setting, customer activation, check-in, cutoff, and refund amount safeguards remain intact.

## Jira Intake Summary

The card requires `Venue.allow_delayed_barcode_automated_returns`, default `False`, alongside the existing `enable_automated_returns`. It uses the existing My Orders return, preview, refund execution, medium/type, and invoice calculations. The setting is an ordinary Venue field, not a waffle feature flag. It explicitly excludes changes to staff refunds, default barcode delivery, and new refund math.

## Sources Reviewed

**Backend:** `/Users/christianvaldez/Documents/Showpass/repos/web-app` — `apps/venues/models/venue_management/venue.py`; `apps/financials/services/invoice/customer_return_eligibility.py`; `apps/financials/api/user_based/viewsets/invoices.py`; `apps/financials/models/invoice_management/invoice.py`. The proposed Venue field was absent locally.

**Frontend:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` — `packages/core/src/app-contexts/user/features/account/features/my-orders/utils/order-actions/return-order.ts`; `ui/modals/return-order/MyOrdersReturnOrderModalSelection.web.tsx`; `data/types/invoice.ts`. The legacy fallback still selects delayed tickets only while no customer-visible barcode is present; no new Venue opt-in field was found.

## Source-backed Behavior

The current enabled customer refund policy evaluates barcode activation according to its own **After barcode delivery** setting. When that policy is disabled, the existing automated-return path is used. A generated barcode and a delivered/activated barcode are different states; the future opt-in must be checked against customer-visible release and API preview/execution separately.

## State-space / Setup Matrix

| Proposed Venue setting | Barcode state | Expected intent from Jira | Current status |
| --- | --- | --- | --- |
| Off | Unreleased | Eligible if all old rules pass | Existing legacy path; needs execution. |
| Off | Released | Blocked | Proposed regression; new field absent. |
| On | Unreleased | Eligible if all old rules pass | Blocked: field absent. |
| On | Released | Eligible if all old rules pass | Blocked: field absent. |
| Either | Activated customer-activation, scanned, refunded, voided, or past cutoff | Blocked | Source-backed existing blockers; combine with new flag after merge. |

## Recommended Test Data

After the field lands, an administrator with Venue edit access can record the original automated-return settings, toggle the exact ordinary Venue field, and restore it. Use separate new paid delayed-delivery tickets before and after barcode release, owned by the same customer, with a refundable card payment, event safely before the legacy cutoff, and no scan or transfer. Record the barcode's visible release state and original receipt values. Preserve completed returns.

## Qase-ready Manual Test Cases

None until the Venue field, serializer response, and customer/preview/POST behavior exist in source. Do not substitute the separate **After barcode delivery** choice on the customer refund policy for this card's Venue opt-in.

## Risk Areas

* A frontend-only opt-in could expose Return order while preview or POST still rejects the ticket.
* A generated barcode could be confused with delivery to the customer.
* Enabling the field for one Venue could affect others or bypass existing activation/check-in/cutoff/payment rules.
* A successful return could credit/refund more than the persisted invoice permits.

## Minimum Execution Set

Blocked until the field lands. Then run off/unreleased, off/released, on/unreleased, on/released, cutoff, activated customer-activation, checked-in, and repeat-return states. Compare preview with completed amount and fresh ticket/refund records.

## Suggested Automated Coverage

Assert default false, venue-scoped serialization, My Orders selection, preview and POST parity before/after release, unrelated venue isolation, activated/scanned/refunded/voided/cutoff blockers, ownership, and no uncharged refund components. Include rollback by setting the field false again.

## Assumptions and Unknowns

* Jira's detailed algorithm is an intended design. The local checkout does not prove it is merged or deployed.
* No new waffle flag or self-service organizer page should be assumed from the card.

## Open Questions

1. Which branch or commits contain the Venue field, migration, nested invoice serializer, and My Orders changes?
2. How is barcode release safely triggered and observed for a manual run without relying on a backend-only generated string?
3. Is the relevant deployed path the legacy automated-return behavior, the new venue policy, or both after the implementation lands?
