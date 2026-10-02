# Membership realization link recovery — manual validation

Commit: `e9f30bd8013db88abaea65f1e1a7d7794eeca90e` · SPW-20544. Draft; no execution performed. No Qase read or write for this request.

## Testing Intent

Prove recovery restores the correct ticket-to-revenue links for each membership batch without changing money, accepting an unrelated ticket, or stopping before later batches. This protects reporting traceability and financial ownership. Browser checks alone cannot prove it: the links being repaired are backend fields.

## Minimum Execution Set

For independently prepared UI coverage, start with TC-0 below. It creates two realized batches through two separate benefits, without copying the developer's test setup or deliberately editing database records. It does not establish that missing-link recovery ran.

For direct backend recovery proof, run TC-1, TC-2 with at least one valid missing ticket before the invalid ticket, both TC-3 return paths, and TC-4. Creating an ordinary membership and seeing usable tickets is a smoke check, not recovery proof.

## Recommended Test Data / Preparation

* Use an isolated database running the named commit or a verified build containing it. Financial-chain corruption must never be prepared on shared/live customer records. The local checkout inspected during planning was at a different HEAD; backend files below were read directly from the named commit.
* A backend owner prepares an active seasonal member, a revenue-realizing group, a season purchase, and successful generated batches. Each target ticket must have exactly one matching adjustment by event/ticket type and exactly one negation belonging to the adjustment's invoice and venue. An adjustment allocates membership revenue to an event; its negation balances that allocation against the membership purchase.
* For TC-1, create two separate Issue Tickets benefits for the same level and season before purchase, and send the first paid batch under each benefit with distinct events. The backend maintains allocation separately for each benefit, so both can allocate value from one season purchase. Record batch IDs, ticket IDs, adjustment IDs, negation IDs and the sale ID. A second batch under the same benefit may have no allocation; a hold batch is skipped by realization. Only intentional missing-link/corrupt-chain preparation requires database mutation.
* For transfer checks, retain two original tickets in a batch: one to transfer and one with a missing link. Use real transfer/return workflows, not a manually assigned transfer flag. The customer-group return starts from a completed transfer belonging to that customer group.
* Pause competing scheduled recovery only in the isolated setup while missing links are prepared. Restore its original scheduling after execution.

## State-space / Setup Matrix

| Local label | State | Required proof |
| --- | --- | --- |
| TC-1 | Two batches / one purchase, missing target links | Only target links restored; all ledger values and sibling links preserved; repeat is unchanged |
| TC-2 | Missing link plus one invalid chain/claim | Whole target batch rejected; no partial repair |
| TC-3 | Repeated transfer, sender return, customer-group return, later descendant | Genuine lineage accepted; missing sibling repaired; provenance preserved |
| TC-4 | Healthy, empty, failing and recoverable batches across pages | Full bounded sweep continues; batch size is a page limit |

## Manual Test Cases

### TC-0: Create two realized batches from one membership purchase through the UI

Actor: organization employee with **Manage Memberships** and the customer. Changes test data: creates benefits, purchases one membership and issues tickets. This is independent user-flow regression coverage; it is not proof that the periodic missing-link repair executed.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| In Dashboard → Memberships, prepare a seasonal membership with Revenue realization enabled and one CAD $120.00 level. | No fees, taxes, discounts, credits or payment plan | The selected level and season are available for purchase. |
| In Membership Benefits, add two separate Issue Tickets benefits for that level and the same season, before purchasing. | No other revenue-allocating benefits | Both benefits are saved for the same membership/season. |
| Buy one membership for one customer. Record the sale transaction ID. | CAD $120.00 | One membership purchase exists for that customer and season. |
| Open the first benefit's ticket manager, create its first batch with Event A, select Send tickets that are paid for, save and Send now. | One future event, one ticket | The first batch is sent and the customer receives Event A's ticket. |
| Open the second benefit's ticket manager and send its first paid batch with Event B. | A different future event, one ticket | The second batch is sent for the same member without another membership purchase. |
| As the customer, open My Account → Memberships → the membership → Upcoming. Reopen the original sale as the employee. | Both events and recorded sale | Both tickets are present; the original sale remains CAD $120.00 with no additional customer charge. |
| Record both batch IDs and inspect realization links through an available read-only backend view. If no such view is accessible, leave linkage unverified. | Two original tickets and sale ID | Each original ticket has its own adjustment/negation chain back to the same season purchase. |

Source-backed allocation expectation with exactly these two benefits: CAD $60.00 per benefit/event, totaling CAD $120.00. This is an accounting assertion only after inspecting the actual financial rows or a confirmed report showing those allocations; ticket delivery alone cannot prove it.

Create a paid + hold batch as an additional control if useful: the paid batch realizes value, while the unpaid hold batch must not allocate the membership revenue again. It is different coverage from the two-realized-batch scenario.


### TC-1: Recover one batch without touching another batch sharing the purchase

Actor: backend owner, with organization employee/customer for visible checks. Changes test data: temporarily clears selected ticket links and restores them through recovery.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Record all financial rows for the purchase and its adjustments/negations, including amounts, status and advance/payout links. Record both batches' ticket links. | The two prepared batch IDs | A before-state exists for every affected row and ticket. |
| Clear only the realization links of selected tickets in the target batch. Keep their expected adjustment IDs in the execution notes. | Target ticket IDs | Target tickets have missing links; sibling links and financial rows are unchanged. |
| Run recovery for the target batch using the scoped command below. | Target batch ID | Each missing ticket links to its own unique event/type adjustment. |
| Read back both batches and the complete financial chain. Follow negation → adjustment → original ticket → member batch. | Recorded row IDs | The original ticket resolves to the target batch; sibling links, ledger row count, every amount and every advance/payout link are unchanged. |
| Run the same scoped recovery again and read back the same records. | Same batch | No link or financial row changes on repeat. |
| As the customer, open My Account → Memberships and inspect the membership's Upcoming tickets. As the employee, review the original purchase. | Prepared member and sale | Recovery creates no extra tickets, order, charge, refund or void. |

Backend owner command, in `python manage.py shell` in the isolated configured checkout:

```python
from memberships.models import MemberTicketBatch
from memberships.services.revenue_realization.member_ticket_item_realization_link_service import (
    MemberTicketItemRealizationLinkService,
)

batch_id = int(input("Prepared target member ticket batch ID: "))
batch = MemberTicketBatch.objects.get(pk=batch_id)
MemberTicketItemRealizationLinkService.link(batch)
print(list(batch.ticket_items.order_by("id").values(
    "id", "event_id", "type_id", "realization_invoice_item_id"
)))
```

This command repairs one batch directly. It does not run the scheduled sweep or validate queue delivery.

### TC-2: Reject a bad batch before filling any missing links

Actor: backend owner. Changes test data: prepare each corruption separately in an isolated copy; restore the exact before-state afterward.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Prepare a batch with at least two tickets: the lower-ID ticket has a valid chain and missing link; a later ticket has one invalid condition from the table below. Snapshot all ticket links and ledger rows after preparing the condition. | One condition per execution | A valid earlier ticket would be recoverable if validation were not atomic. |
| Invoke the TC-1 scoped command and capture the exception. | Prepared batch ID | `MemberTicketRevenueLinkValidationError` identifies the invalid batch/chain; the call fails. |
| Read back every ticket link and ledger row, then compare with the snapshot taken immediately before recovery. | Entire target batch, related rows and claimant tickets | Even the valid earlier ticket remains unlinked; all pre-existing links and ledger values are unchanged. |
| Restore the preparation changes before trying the next condition. | Recorded before-state | No intentionally malformed data remains from that execution. |

| Invalid condition to prepare | Expected rejection |
| --- | --- |
| No season purchase, or two purchases for the same member/season | No unique purchase |
| Missing adjustment, two matching adjustments, or two intended tickets matching one adjustment | No unique ticket-to-adjustment mapping |
| Missing/duplicate negation, or negation on another invoice/venue | No valid unique negation chain |
| A target ticket already points to a different adjustment | Conflicting existing link is preserved, not overwritten |
| An unrelated ticket claims the adjustment, including another batch | Unrelated claimant rejected |
| Unrelated transfer descendant with no batch but the same adjustment | Null batch/transfer flag is insufficient ownership proof |
| Customer-group return points to an unrelated source transfer or different sale item | Invalid return provenance rejected |
| Detached return has a missing/conflicting retained adjustment, including before a later transfer | Invalid return provenance rejected |

### TC-3: Recover the sibling after transfers and returns

Actor: customer/Group Sales employee with backend owner validating links. Changes test data: transfers ownership and repairs a missing link. Employee requires Group Sales module and **Distribute Group Sale** / **Manage Group Sale** access.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start with two original batch tickets. Retain the first ticket's realization link; have the backend owner clear only the second ticket's link. | Linked original and missing sibling | There is exactly one intended missing sibling link. |
| As the customer, use My Account → Memberships → Upcoming → Transfer tickets to a friend. Complete the claim, then transfer the received ticket again and complete that claim. | Two receiving customers | Production transfer descendants retain the original adjustment. |
| Have the backend owner run TC-1 scoped recovery and compare the links and ledger with the before-state taken after the transfers. | Original batch | The sibling is repaired; original and descendant links and all financial values remain unchanged. |
| Repeat with the sibling link missing and one intermediate transfer ticket's realization link missing, keeping its transfer ancestry intact. | Intermediate ticket ID | Recovery still accepts the legitimate later descendant and repairs the sibling; it does not fill an unrelated intermediate ticket outside the batch. |
| Return the transferred ticket to its sender using the actual return workflow. Clear the sibling link again and repeat recovery. | Completed customer return | The sibling is repaired without losing the original adjustment from legitimate descendants. |
| In a separate customer-group setup, open Dashboard → Box Office → Group sales → the group → transfer history. Open the completed transfer's actions, select Return Tickets, then confirm Return Transfer. | Completed group transfer for the linked original ticket | Tickets return to group inventory through the complete production return workflow. |
| Have the backend owner verify the returned ticket's original sale item, retained adjustment and source transfer, and confirm its `transferred_from` is cleared. Clear the sibling link and run scoped recovery. | Original batch and returned ticket | The sibling is repaired despite cleared ancestry; the returned ticket and financial chain are unchanged by recovery. |
| Transfer that returned ticket again, complete the claim, clear the sibling link and repeat recovery. | Later transfer descendant | Valid provenance still permits recovery; no new ledger rows or money changes occur. |

Backend alternative for the **complete** group return, when the prepared UI flow is unavailable: load the prepared `TicketsTransfer` and employee `User`, then call `ReturnCustomerGroupTransferService().return_transfer(transfer=transfer, returned_by=employee)`. Calling only the low-level clone method does not prove the ancestry-clearing return regression. Record that the return was backend-driven rather than UI-executed.

### TC-4: Process every eligible page and continue after failures

Actor: backend owner. Changes test data: repairs eligible missing links across the entire isolated database.

Prepare eligible batches in ascending ID order: a healthy batch, an empty batch, one invalid batch from TC-2, and two valid batches with missing links. There must be no other recovery candidates when asserting exact counts.

```python
from memberships.tasks import link_unlinked_member_ticket_realization_invoice_items
print(link_unlinked_member_ticket_realization_invoice_items.run(batch_size=1))
```

* Expected first result: `{'candidates': 3, 'linked': 2, 'failed': 1}`. Counts represent batches, not tickets. Healthy/empty pages are skipped without ending the sweep; the failing batch does not prevent both later batches being repaired.
* Repeat: `{'candidates': 1, 'linked': 0, 'failed': 1}` while the malformed batch remains unchanged. Healthy repairs do not become candidates again.
* Prepare a fully linked batch with a missing or duplicate negation: it is still selected and fails validation. A ticket having a non-null link is not enough to mark its chain healthy.
* For the initial-ID-bound acceptance check, a backend owner needs a controlled pause after the sweep captures its initial maximum ID. Add a new higher-ID eligible batch during that pause; it must wait until the next run. Ordinary UI timing cannot reliably prove this boundary. This remains a backend/manual diagnostic or automated check, not an inferred pass from a quick sweep.
* `.run()` is synchronous. Separately observe the scheduled task on the default queue at the configured 15-minute schedule and confirm successful execution/logs. Waiting 15 minutes without completion evidence is not proof.

## Risk Areas / Source-backed Behavior

Atomicity applies per batch. One rejected batch does not undo earlier successful batches in the sweep. Only missing intended batch-ticket links are filled. Recovery validates identity/provenance and chain uniqueness; it does not recreate financial rows, fix corrupt money, or change advance offsets. SPW-20545 advance linkage is outside this commit's scope.

## Sources Reviewed

Exact-commit backend root: `/Users/christianvaldez/Documents/Showpass/repos/web-app`.

* `apps/memberships/services/revenue_realization/member_ticket_item_realization_link_service.py`: batch-scoped selection, unique chain checks, transaction, transfer traversal and return provenance.
* `apps/memberships/services/revenue_realization/recover_unlinked_member_ticket_realization_invoice_items.py`: candidate pages, cursor, initial upper bound, isolated failures and counters.
* `apps/memberships/services/revenue_realization/managers.py`, `generators.py`, `apps/memberships/services/member_batch_generation/member_batch_generator.py`: separate benefit allocations; first allocated paid batch per benefit; hold batches skip realization.
* `apps/memberships/managers/member_batch_generation.py`: eligibility and malformed linked-chain selection.
* `apps/memberships/tasks/revenue_realization.py`, `settings.py`: task adapter, default queue and 15-minute schedule.
* `apps/tickets/services/transfers/return_customer_group_transfer.py`: complete atomic return workflow.
* `apps/financials/tests/services/revenue_realization/test_member_ticket_item_realization_link_service.py`, `apps/memberships/tests/revenue_realization/test_member_ticket_realization_link_recovery_service.py`: preparation and regression examples; reviewed, not executed.

Frontend root: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend` (current local source, not a commit-specific frontend build).

* `packages/core/src/app-contexts/user/features/account/features/memberships/components/SeasonEvent/SeasonEvent.web.tsx`: **Transfer tickets to a friend**.
* `packages/core/src/app-contexts/dashboard/features/box-office/group-sales/ui/components/TransferHistoryItem/TransferHistoryItem.web.tsx`, `ui/pages/GroupSalesHistoryPage.web.tsx`, `constants/box-office-groups-config.ts`: return controls, API call and Group Sales access.

Guidance: [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]]. These are backend-assisted manual checks, not newly created Qase cases.

## Assumptions and Unknowns / Open Questions

The execution environment, prepared historical batch data, customer-group return setup and worker availability have not been verified. Deployment and persisted outcomes remain unexecuted. A backend owner must identify the prepared IDs and approve corruption setup in the isolated database before these checks can run. No branch comparison, diff, live browser testing or database mutation was performed while preparing this guide.

## Suggested Automated Coverage

Retain the supplied source regressions for unique/malformed chains, foreign claimants, repeated transfers and full group returns, including conflicting retained adjustment provenance. Automate query-page limits and the initial-ID-bound race; manual UI observations cannot establish these query guarantees. Run the stated backend test modules separately from lint/contracts: the supplied pasted command combines distinct commands and is not a single valid test invocation.

## Correction to the initial manual plan

The two-batch financial state can be built independently through two separate Issue Tickets benefits on one season purchase; it is not necessarily historical data and does not require asking the developer to provide their test setup. UI regression coverage and direct missing-link recovery proof remain separate claims.
