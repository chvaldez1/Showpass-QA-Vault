---
title: Ticket-credit uses after voiding purchased tickets
date: 2026-11-07
tags:
  - qa/investigation
  - ticket-credits
  - void
status: Source-backed Void versus Refund distinction; no new bug confirmed
---

# Ticket-credit uses after voiding purchased tickets

For the ticket/voucher credits discussed here, **Void and Refund/Return must be checked separately**. The user clarified on November 7 that voiding a purchased ticket should not give its voucher use back. This matches the inspected standard Dashboard Void path. No new bug is confirmed.

| Action after using all 3 voucher credits | Ticket result | Voucher Available | Internal limit / completed uses |
| --- | --- | --- | --- |
| Void 2 of the 3 purchased tickets | The selected 2 are voided; the third stays usable | Stays 0 | Limit stays 3; completed uses stay 3 |
| Refund 2 through the supported voucher-restoring path | The selected 2 are returned; the third stays usable | Becomes 2 | Limit increases from 3 to 5; completed uses stay 3 |

The limit is not the displayed number of uses left. Available is calculated as **limit minus completed uses**. Leaving `get_applied()` unchanged is compatible with restoration when a separate Refund operation increases the limit. It does not mean every Void or Return invokes that operation.

The supplied wording, “Void/return the ticket. Verify the voucher limit increments … and get_applied() stays unchanged,” combines different actions. Its source and execution were not provided or verified. Split it into a Dashboard Void check with no voucher-use restoration and a supported Refund/Return check with restoration. Do not infer either result from the adjustment service’s exclusion alone.

[SPW-18708 — ticket credits do not update usage after voiding order items](https://showpass.atlassian.net/browse/SPW-18708) requests restoration after Dashboard Void, but it is **Won’t Do**, with no comments explaining the decision. It is evidence of a historical request, not an accepted current requirement or proof that a live order is broken. The user’s stated expectation is recorded here; it is not presented as independently confirmed global product policy.

**Correction to the earlier framing:** source and Jira corroborate the difference between Void and Refund. They do not confirm a new defect or that credit restoration is required for Dashboard Void. No live order was supplied or tested.

## What was checked

| Check | Result |
| --- | --- |
| Dashboard Void | `BaseVoider.void()` voids the selected tickets and calls `DiscountUsageAdjustmentService.adjust()` for their usage. |
| Ticket/voucher credit | The adjustment service explicitly excludes `DISC_TYPE_VOUCHER_CREDIT` from both direct and multi-discount per-ticket reconciliation. Voiding these tickets therefore does not use the ordinary-discount restoration path. |
| Customer’s balance | `DiscountStatsKey` calculates Available from the voucher’s limit minus completed usage; completed usage comes from the purchased groups’ applied-use counts. A ticket status change alone is not the restoration performed for voucher refunds. |
| Refund | `BaseRefunder.update_voucher_discount_limits()` separately restores voucher allowance. The multi-line fix is controlled by `enable_voucher_refund_limit_fix`. It does not change Dashboard Void. |
| Return Free Tickets | The controller sends voucher-backed tickets through the refund service, while ordinary free/complimentary tickets can use Void. Do not treat this Customer return as the same operation as choosing Void in Dashboard. |
| Comparison | The voucher exclusion exists in inspected local develop and cached origin/master. This does not establish a new develop-only regression. |

## Evidence and limits

- Jira read on November 7, 2026: SPW-18708 description, status, priority and comments. Recorded priority: Medium; not independently reassessed here.
- [SPW-10672 — Free Ticket Return Feature](https://showpass.atlassian.net/browse/SPW-10672) requires ticket credits to be reusable after a supported free-ticket return. Its implementation routes voucher tickets through Refund; it is not evidence that Dashboard Void already restores them.
- [SPD-2874 — FlexPass multi-line refund restoration](https://showpass.atlassian.net/browse/SPD-2874) concerns Refund and separately notes remaining per-event allowance limitations. Restoring an overall balance is not proof that every original Event can be booked again.
- Backend inspected: develop `f9a5c258f3babb13675544fa06ab4117bc222000`; cached origin/master `06c2195c55292a3b4608cce3e2704c58e860ec50`. No fetch/pull performed for this read-only question.
- Affected layer: shared staff Void execution, including clients using the venue invoice Void API. Exact live client, Organization, invoice, voucher and deployed revision are unknown.
- Tests: source and existing test definitions reviewed; no application tests, live reproduction, purchases, Voids or Refunds executed. No source edits or Jira writes made. Do not mark this as a newly confirmed runtime bug or create a duplicate Jira card from this evidence alone.

## Source references

- [Void execution](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/payments/voiders.py:124)
- [Voucher exclusion in usage adjustment](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/discounts/discount_usage_adjustment_service.py:117)
- [Displayed credit balance](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/caching/keys.py:30)
- [Purchased voucher-use counting](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/discount_management/discounts.py:696)
- [Refund-specific voucher restoration](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/payments/refunders/base.py:1720)
- [Free-ticket return routing](/Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/invoice/free_return/free_return_controller.py:51)

The branch-digest Refund example remains a Refund check. Its 3 → 0 → 2 Available-use expectation must not be copied onto Dashboard Void. For the separately stated Void expectation, Available remains 0 after the 2 tickets are voided.
