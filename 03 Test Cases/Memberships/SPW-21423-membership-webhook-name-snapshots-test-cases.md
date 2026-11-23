---
title: SPW-21423 Membership Webhook Name Snapshots
date: 2026-11-20
updated: 2026-11-23
tags:
  - qa/test-cases
  - memberships
  - api-testing
---

# SPW-21423 Membership Webhook Name Snapshots

**Status** · Five cases published and verified in [SPT → Integrations → Webhooks (suite 193)](https://app.qase.io/project/SPT?suite=193). The other four cases are local drafts. All 19 planned case runs and supporting checks are **Not run**.

**Review** · Draft-only under the [[06 Prompts/Showpass Release Engineering Handoff#Apply the review layer|shared review policy]]. A live assignment or release handoff starts its own review against the selected revision, test scope, and evidence.

## Scope and proof

We are testing whether an Organization's integration can read the correct Membership Group and Level names from Showpass invoice notifications while each link keeps its original purchase references. A wrong link can credit a ticket or renewal to the wrong membership. A changed retry body can give the integration different data for the same notification. We will compare the saved notification and the request body sent to the local receiver with the known member, purchase, and invoice line in the test database.

[SPW-21423](https://showpass.atlassian.net/browse/SPW-21423) was **BETA QA**, Medium, with no comments on November 23. FanThreeSixty requested names on both invoice lines and ticket items. Showpass captures the names for `member_id` at notification creation. A transfer can report a different `current_member_id`. A new event reads the names again, and a retry uses the stored body.

| Scope | Decision |
| --- | --- |
| Risks | Correct order and ticket attribution, asynchronous delivery, Organization isolation, and compatibility with older payloads. |
| Entry paths | Local membership purchase and renewal, ticket generation from a membership benefit, membership or ticket transfer, delivery worker replay, and manual resend. The stored payload is also available in Dashboard → Organization → Integrations → Webhooks → Events to employees with **Developer** permission. |
| Starting states and outcomes | Single or grouped charge, ordinary or benefit ticket, acquired or renewed membership, resolved or unresolved link, same- or different-Organization records, old or new notification, and eligible or ineligible endpoint. The global `enable_membership_webhook_lineage` switch matters for new events. |
| Environment and confidence | Medium. Local backend and frontend source establish the expected behavior. Use generated data in the isolated local test database and capture delivery locally. Dashboard presentation, deployed behavior, public docs, and partner ingestion have no execution evidence here. |
| Outside this change | Payment processors, price and fee settings, capacity, checkout cancellation, signing, and downstream partner processing. Purchase checks compare the original charge and look for duplicates when work replays. |

| Case | What it proves | Jira criteria |
| --- | --- | --- |
| [[#TC-1: Webhooks - Memberships - Include names on single and grouped purchases\|TC-1 Purchase]] | One link per member, with the correct names and original charge IDs. | 1, 2, 8 |
| [[#TC-2: Webhooks - Memberships - Keep original and renewal purchases distinct\|TC-2 Renewal]] | The renewal points to its own charge and previously issued tickets keep their original purchase IDs. | 1–3, 8 |
| [[#TC-3: Webhooks - Memberships - Name the member on a benefit ticket\|TC-3 Generated ticket]] | The ticket points to the charge that granted it. Regular items keep empty arrays. | 1, 2, 8 |
| [[#TC-4: Webhooks - Memberships - Use the source member on transfers\|TC-4 Transfer]] | Both transfer paths use the recorded source member's names. | 1–3, 8 |
| [[#TC-5: Webhooks - Memberships - Report missing names and uncertain purchase links\|TC-5 Missing data]] | Known names and missing names are represented correctly, independently of whether the charge is known. | 1, 3, 8 |
| [[#TC-6: Webhooks - Memberships - Keep membership names within the Organization\|TC-6 Organization isolation]] | A foreign member, group, level, or source purchase cannot leak into the notification. | 3, 6, 8 |
| [[#TC-7: Webhooks - Memberships - Keep saved names on retry and capture updates in new events\|TC-7 Snapshot and retry]] | Old notifications keep their captured names after edits. New notifications read the updated names. | 3, 4, 8 |
| [[#TC-8: Webhooks - Memberships - Resend older notifications with their original fields\|TC-8 Older body]] | A retry preserves the original body, including absent fields. | 5, 8 |
| [[#TC-9: Webhooks - Memberships - Respect existing delivery and linkage settings\|TC-9 Eligibility]] | The existing switch and endpoint subscriptions still control new payloads. | 1, 6, 8 |
| [[#Supporting checks\|Schema, documentation and query counts]] | The consumer contract is accurate and lookups are batched as the number of items or members grows. | 6–8 |

All proof targets above are **Not run**. The November 20 suite review identified SPT-1709 for endpoint setup, SPT-1711 for subscriptions, SPT-1714 for resend, and SPT-5963 for replay after destination or signing key changes. These are reference case definitions. This revision uses the previously verified suite placement.

## Qase publication

The approved batch was created and read back on November 23, 2026. Readback matched the approved titles, suite, tags, and step counts. `ChargeSize` and `TransferKind` were each saved as a Single parameter with both intended values. The three fixed cases have no saved parameters.

| Local case | Saved Qase case | Planned runs | Execution |
| --- | --- | ---: | --- |
| TC-1 | [SPT-6026](https://app.qase.io/project/SPT?case=6026&suite=193) | 2 | Not run |
| TC-2 | [SPT-6027](https://app.qase.io/project/SPT?case=6027&suite=193) | 1 | Not run |
| TC-3 | [SPT-6028](https://app.qase.io/project/SPT?case=6028&suite=193) | 1 | Not run |
| TC-4 | [SPT-6029](https://app.qase.io/project/SPT?case=6029&suite=193) | 2 | Not run |
| TC-7, Dashboard **Resend** | [SPT-6030](https://app.qase.io/project/SPT?case=6030&suite=193) | 1 | Not run |

On November 23, 2026, the Qase Grammar Police rewrites and source-checked Showpass terms were saved to SPT-6026 through SPT-6030. Readback matched the revised titles, descriptions, preconditions, postconditions, and steps. Suite, tags, and Single parameter values match the original publication. The step counts in ID order are 4, 4, 3, 3, and 5. All five cases are **Not run**.

## Qase-ready cases

### TC-1: Webhooks - Memberships - Include names on single and grouped purchases

**Title:** Webhooks - Memberships - Check membership names after purchase

**Description:** Buy a Membership and check what Showpass sends to the webhook receiver. Each link should show the Membership Group and Membership Level from the order and point to the right Member and invoice item (one order line).

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| ChargeSize | What to buy | What to look for |
| --- | --- | --- |
| Single | Buy one `Gold` Membership from the `Community` group. | One invoice item with one Member link. |
| Grouped | In the local checkout test, set the quantity to 2 on a single `Gold` Membership line. | Two Member links on that invoice item. Each has its own Member ID and Membership Purchase ID. |

Place one order for each option.

**Preconditions:**

* Use a local test Organization with a `Community` Membership Group and a `Gold` Membership Level on sale. Use a Membership without a renewal season and pay with simulated payment.
* Set the local global switch `enable_membership_webhook_lineage` to ON. Use one enabled webhook endpoint subscribed to **Purchase** and pointed at the local receiver.
* Work out the expected total from the membership price, quantity, fees, and taxes before checkout.

**Postconditions:**

* Save the order reference and webhook body with the result. Reset the local test data.

**Tags:** memberships, api-testing, transaction-payload

**Parameters:**
ChargeSize: Single, Grouped

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Buy one or two Memberships as shown in the table. After Showpass creates the Members, check the order and open its Purchase webhook event. | | There is one order, one charge for the expected total, and one saved Purchase event for the endpoint. The order has the expected number of Members. |
| Find the membership line under `data.invoice_items` in the webhook body. Look at `membership_links`. | Check the link count for the selected option. | Each link shows `Community` and `Gold`, has status `resolved`, and has `null` for the renewal season. |
| Match each link to its Membership Purchase record and the order. | Compare `member_id`, `current_member_id`, `membership_purchase_id`, `source_invoice_item_id`, and `source_transaction_id`. | Both Member fields identify the Member who received that Membership. The Membership Purchase belongs to that Member and invoice item. The transaction ID matches the order. |
| For `Grouped`, run the local job that creates the Members one more time for the same order. Check the order and webhook events again. | Use the completed order from this run. | There is still one charge for the same total, two Members, two Membership Purchase records, and one Purchase webhook event. |

### TC-2: Webhooks - Memberships - Keep original and renewal purchases distinct

**Title:** Webhooks - Memberships - Check purchase links after renewal

**Description:** Renew a Membership and check what Showpass sends. The renewal should point to its own invoice item. A ticket issued before renewal should still point to the original Membership Purchase.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

**Preconditions:**

* In the local test, turn the global `enable_membership_webhook_lineage` switch ON. Use an enabled webhook endpoint subscribed to **Purchase** and pointed at the local receiver.
* Start with one paid order for a `Gold` membership in the `Community` group. Use a membership that renews without a renewal season. Save the member ID, membership purchase ID, transaction ID, and invoice item ID from this order.
* Set up two Events with one ticket each available through the same membership benefit. Issue the first Event ticket before renewal and save its webhook body.

**Postconditions:**

* Save both order references and the webhook bodies you checked. Reset the local test data.

**Tags:** memberships, renewals, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Renew the `Gold` Membership for the same Member. Read the renewal order and its Membership Purchase record. | Record the Membership Purchase ID, transaction ID, and invoice item ID. | The renewal has its own charge and keeps the same Member ID. |
| Open the renewal's Purchase webhook. Find the renewal line under `data.invoice_items` and read its `membership_links`. | | The link shows `Community` and `Gold`, the same member, and the renewal's purchase ID, transaction ID, and invoice item ID. Its status is `resolved` and its renewal season is `null`. |
| In the local test, create a fresh webhook for the first ticket's invoice. Compare the ticket's link with the copy you saved before renewal. | `data.ticket_items[].membership_links` | Both links show the original membership purchase ID, transaction ID, and invoice item ID. |
| Issue the ticket for the second Event and open its Purchase webhook. | `data.ticket_items[].membership_links` | The second ticket links to the renewal purchase ID, transaction ID, and invoice item ID. |

### TC-3: Webhooks - Memberships - Name the member on a benefit ticket

**Title:** Webhooks - Memberships - Check the membership link on a benefit ticket

**Description:** Issue a ticket through a Membership benefit and check that the webhook links it to the Membership Purchase. Buy a regular ticket separately and check that its membership links are empty.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

**Preconditions:**

* In the local test, turn the global `enable_membership_webhook_lineage` switch ON. Use an enabled webhook endpoint subscribed to **Purchase** and pointed at the local receiver.
* Start with one completed order for a `Gold` membership in the `Community` group. Save the member ID, membership purchase ID, transaction ID, and invoice item ID.
* Use one Event that offers a ticket through the membership benefit and also sells a regular admission ticket.

**Postconditions:**

* Save the membership order reference and both ticket webhook bodies with the result. Reset the local test data.

**Tags:** memberships, tickets, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Issue one ticket through the membership benefit. Open the Purchase webhook for that ticket order. | Find the ticket by its ID. | The webhook includes the issued ticket and the ticket order's own transaction ID. |
| Read the ticket's `membership_links` and compare it with the Membership Purchase record and original order. | `data.ticket_items[].membership_links` | There is one `resolved` link. It shows `Community`, `Gold`, and the original Member ID, Membership Purchase ID, transaction ID, and invoice item ID. The Membership charge stays on the original order. |
| Buy one regular admission ticket on a separate order. Open its Purchase webhook. | Check the ticket under `data.ticket_items` and its order line under `data.invoice_items`. | Both items show `membership_links: []`. |

### TC-4: Webhooks - Memberships - Use the source member on transfers

**Title:** Webhooks - Memberships - Check the original member's names after a transfer

**Description:** Transfer a Membership or a ticket issued through its benefit. Check that the webhook still shows the original Member's Membership Group and Level. In a resolved link, `member_id` is the Member the original purchase was for. Use the table to check who should appear in `current_member_id`.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| TransferKind | What to transfer | Who should appear in `current_member_id` |
| --- | --- | --- |
| Membership | Transfer one paid `Community` / `Gold` membership. In the local test database, give the recipient's membership the group `Recipient Club` and level `Silver` before preparing the webhook. | The recipient member, on the membership line and on the ticket issued for that recipient. |
| BenefitTicket | Issue one Event ticket through a paid `Community` / `Gold` membership. Transfer the ticket to another Customer. Use a transferred ticket that keeps a reference to the original ticket. | The original member who received the benefit ticket before it was transferred. |

Use a separate original purchase for each option.

**Preconditions:**

* Use two test Customers in the local test. Turn the global `enable_membership_webhook_lineage` switch ON.
* Use an enabled webhook endpoint subscribed to **Transfer** and **Transferred**, or capture the body in the local backend test.
* Save both Customers' identities, the original member ID, and the purchase ID, transaction ID, and invoice item ID from the original membership order.

**Postconditions:**

* Save the original order reference and the webhook links you checked. Reset the local test data.

**Tags:** memberships, transfers, api-testing

**Parameters:**
TransferKind: Membership, BenefitTicket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete the transfer to the second Customer and open the **Transfer** webhook for the recipient's invoice. For `Membership`, also issue and capture a ticket through the recipient's transferred Membership. | Look in `data.invoice_items` for the Membership line and `data.ticket_items` for the issued or transferred ticket. | The recipient has the Membership or ticket. The captured webhook includes the matching line or ticket. |
| Read the names and member IDs on each link. | `membership_group_name`, `membership_level_name`, `member_id`, `current_member_id` | The names are `Community` and `Gold`. `member_id` is the original member. `current_member_id` matches the person shown in the table for this option. |
| Compare each link with the original membership order. | `membership_purchase_id`, `source_transaction_id`, `source_invoice_item_id`, `lineage_status` | The link is `resolved` and gives the purchase ID, transaction ID, and invoice item ID from the original order. |

### TC-5: Webhooks - Memberships - Report missing names and uncertain purchase links

**Description:** Verify that a link can report an unknown charge while still naming a member whose identity is known. A new link uses JSON `null` for each name Showpass cannot safely determine.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| LinkState | Local setup | Expected status and names |
| --- | --- | --- |
| UnknownMember | One older membership charge line with no linked member or recorded purchase. | `unavailable`. Both names and both member IDs are `null`. |
| KnownMember | One older charge line with a known `Community` / `Gold` member and no recorded purchase. | `unavailable`. Names are `Community` and `Gold`. |
| ConflictingPurchases | One benefit ticket for one Event with two conflicting purchase records for the known `Community` / `Gold` member. | `ambiguous`. Names are `Community` and `Gold`. |
| LevelWithoutGroup | One identified member on an older charge line with no recorded purchase. The member and `Gold` level both have no group. | `unavailable`. Group name is `null`. Level name is `Gold`. |

Run each value with separate local data, for four runs.

**Preconditions:**

* Use one synthetic Organization. Prepare the selected `LinkState` in the local backend test and capture the invoice body with membership links enabled.
* Prepare a separate `Neighborhood` / `Silver` member in the same Organization with one recorded membership purchase. Record its member, purchase, transaction, and charged line IDs as a control.

**Postconditions:**

* Keep the expected and actual link for each selected state. Reset the local test data.

**Tags:** memberships, api-testing, edge-case

**Parameters:**
LinkState: UnknownMember, KnownMember, ConflictingPurchases, LevelWithoutGroup

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Prepare a new Purchase payload and open the selected charge line or ticket's `membership_links`. | Use the selected `LinkState`. | The item has an explicit link with both name fields present. Each field contains the expected exact string or JSON `null`. |
| Read the member and purchase references on the link. | Member IDs, status, purchase ID, source transaction and charged line IDs | The link uses the selected status and known member identity. For `unavailable` and `ambiguous`, all three purchase and source charge references are `null`. |
| Prepare a notification for the `Neighborhood` / `Silver` charge and inspect its link. | Use the recorded comparison IDs. | The link is `resolved` and shows `Neighborhood`, `Silver`, and the recorded IDs. |

### TC-6: Webhooks - Memberships - Keep membership names within the Organization

**Description:** Verify that a notification can use only authorized membership records from its own Organization. Each variation keeps a valid local comparison so a blank or missing payload cannot pass the test.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| Relationship | Local setup | Expected result for the affected link |
| --- | --- | --- |
| ForeignMember | An older Organization A charge points to an Organization B member. Keep a valid local member attached to the charge. | The foreign member is omitted. The local member's link remains. |
| ForeignGroup | A local member points to the Organization B group. | Both names are `null`. |
| ForeignLevel | A local member keeps the `Community` group and points to the Organization B level. | `Community` and `null`. |
| WrongLocalGroup | A local member keeps the `Community` group and points to a level belonging to a different Organization A group. | `Community` and `null`. |
| ForeignTicketSource | One benefit ticket for one Organization A Event is linked to a local member's batch, whose recorded purchase now points to an Organization B member. | `unavailable` with the local batch member and its local names. Purchase and source charge IDs are `null`. |

Run each value using fresh synthetic records, for five runs.

**Preconditions:**

* Use two synthetic Organizations in the local test database. Give Organization B distinctive group and level names, such as `Other Club` and `Other Tier`.
* Prepare the selected relationship in the local backend test and capture the invoice body with membership links enabled.
* Keep a valid `Community` / `Gold` member in Organization A. Record its member ID and expected status and source references before preparing the selected relationship.

**Postconditions:**

* Keep the relevant JSON and record the expected local IDs used for comparison. Reset the local test data.

**Tags:** memberships, api-testing, edge-case

**Parameters:**
Relationship: ForeignMember, ForeignGroup, ForeignLevel, WrongLocalGroup, ForeignTicketSource

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Prepare a new Organization A invoice payload and inspect the affected invoice line or benefit ticket. | Use the selected `Relationship`. | The result matches the selected setup. No link contains Organization B's member identity, group or level name, or source purchase details. |
| Inspect the valid Organization A comparison. | Local comparison member and its item | The comparison link still returns the local member and `Community` / `Gold`. Its existing purchase links and status are preserved. |

### TC-7: Webhooks - Memberships - Keep saved names on retry and capture updates in new events

**Title:** Webhooks - Memberships - Check saved names after a rename and resend

**Description:** Rename a Membership Group and Level, then resend an earlier Purchase webhook event. The resend should keep the names Showpass saved for that event. The next new event should use the updated names.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Sign in to the local Dashboard with **Developer** permission. Have the employee's password ready for **Resend**.
* Use one test order for a `Gold` Membership in the `Community` group. Turn the local global `enable_membership_webhook_lineage` switch ON. Use one enabled webhook endpoint subscribed to **Purchase** and a receiver that saves the full request body.
* Set up the local test so you can hold the first delivery and create new webhook events for the same order after the names change.

**Postconditions:**

* Save the event IDs and the saved and received bodies you compared. Reset the local test data.

**Tags:** memberships, api-testing, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a Purchase webhook event and hold its first delivery. Copy the saved body and event ID. | Use the `Community` / `Gold` order. | The saved body shows `Community` and `Gold` and links to the member and order line. |
| Rename the group to `Renamed Community` and the level to `Platinum`. Let the first delivery go through and open it in the receiver. | Compare the full body with the saved copy. | The receiver gets the same body, including `Community` and `Gold`. |
| Go to Dashboard → Organization → Integrations → Webhooks → Events. Open the original event. Under **Webhook Attempts**, open the attempt's three-dot menu, choose **Resend**, and enter the employee's password. | Use `webhook_event_uuid` from the first send to identify the event. | **Event will be retried** appears. The same event gets a new delivery attempt. The receiver gets the original body with the original event UUID. |
| Create a new Purchase webhook event for the same order in the local test. Read the new body and reopen the original event. | Compare the event IDs, names, and charge references. | The new event has a new ID and shows `Renamed Community` and `Platinum`, with the same membership purchase and order line. The original event still has the saved body. |
| Move the member to `New Club` and `New Tier` in the local test. Create a third webhook event for the order, then use **Resend** on the first event again. | Compare the third event with the latest send of the first event. | The third event shows `New Club` and `New Tier`. The resend still matches the saved body of the first event. |

### TC-8: Webhooks - Memberships - Resend older notifications with their original fields

**Description:** Verify that Showpass resends older invoices using the exact saved JSON. Older notifications can predate name capture or membership links altogether.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| LegacyShape | Saved body at the start | Expected on resend |
| --- | --- | --- |
| NamesAbsent | A membership charge link has its original IDs and status. Both name keys are absent. | The names stay absent. The existing link stays intact. |
| LinksAbsent | The saved invoice payload has no `membership_links` arrays in its items. | Those arrays stay absent. |

Run each value on a different notification, for two runs.

**Preconditions:**

* Use a local Organization, one enabled test endpoint subscribed to **Purchase**, and a synthetic member with valid current Group and Level names.
* Turn the local global `enable_membership_webhook_lineage` switch ON for delivery.
* Seed one synthetic stored notification with the selected `LegacyShape`. Copy the complete saved JSON and capture the outbound request to the local endpoint.

**Postconditions:**

* Keep the saved and sent legacy JSON and reset the local test data.

**Tags:** memberships, api-testing, notifications

**Parameters:**
LegacyShape: NamesAbsent, LinksAbsent

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Resend the stored notification and compare the received body with the original copy. | Use the existing notification ID and the expected result for `LegacyShape`. | The receiver gets the exact saved JSON, including the selected missing fields. |
| Reopen the stored notification and compare it with the original copy. | Compare the entire saved JSON. | The saved notification remains identical to the legacy copy. |

### TC-9: Webhooks - Memberships - Respect existing delivery and linkage settings

**Description:** Verify that adding membership names preserves the existing endpoint subscription rules and the global membership linkage switch for new invoice notifications.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

**Preconditions:**

* Use two synthetic Organizations and local capture. Organization A owns one paid synthetic `Community` / `Gold` membership invoice with a recorded purchase and no pending publication.
* Organization A has three local endpoints: enabled with **Purchase**, disabled with **Purchase**, and enabled with **Refund** only. Organization B has one enabled **Purchase** endpoint.

**Postconditions:**

* Keep the captured notification counts and payloads. Restore the starting local switch value and reset the local test data.

**Tags:** memberships, api-testing, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| With `enable_membership_webhook_lineage` ON, create a new Purchase notification for the invoice. | Organization A invoice and endpoint set | Only the enabled Organization A Purchase endpoint gets a saved notification. Its charge link contains `Community` and `Gold`. |
| Turn the switch OFF and repeat fresh Purchase notification creation for the same completed invoice. | Use the ordinary invoice notification path. | Only the same eligible endpoint gets a new notification. Its invoice data keeps the existing shape with no `membership_links` fields. |
| Compare the earlier stored notification with its captured copy. | Original notification ID | The earlier body is identical and retains both captured names. |

## Supporting checks

All supporting checks are **Not run**.

### Contract and documentation

1. Validate the sample invoice body against `docs/contracts/invoice-membership-links.schema.json`. Validate each new link against `CapturedMembershipLink` in both `data.invoice_items[]` and `data.ticket_items[]`. The examples should include exact source-member strings, explicit `null`s for an unknown member, and `[]` for an ordinary item.
2. In local copies, remove one name key at a time and replace each name with a number or boolean. The new-link schema must reject each variant. The compatible `MembershipLink` definition must accept an otherwise valid legacy link with both keys omitted. Check that a copied older notification with no `membership_links` also passes the compatible envelope schema.
3. Review the published payload reference for both arrays, source and current member semantics, creation-time snapshots, null handling, retries, and older messages with missing keys. The member lookup API returns current names when queried. Confirm the examples show the same distinctions. The repository contract and guide are present. Publication and deployed behavior still need evidence. [Developer payload reference](https://dev.showpass.com/webhooks/webhooks-payload-invoice-object#membership-purchase-linkage)

### Batched lookups

Run the query-count checks for one versus four distinct members and ticket batches, and one versus eight tickets from the same batch. Count queries around enrichment only, after synthetic records are prepared. Each pair must have equal query counts. In the distinct-member test, both the grouped charge and the tickets must map each member ID to its own names, using `Community` / `Gold` and the three distinct `Club 0` / `Tier 0` through `Club 2` / `Tier 2` pairs. Also verify that two or more subscribed endpoints share the prepared membership data and each gets one saved notification.

## Minimum execution set and local setup

Start with 11 case runs for the main purchase, delivery, and isolation risks. Use TC-1 both values, TC-2, TC-3, TC-4 `Membership`, TC-5 `UnknownMember`, TC-6 `ForeignLevel` and `ForeignTicketSource`, TC-7, TC-8 `NamesAbsent`, and TC-9. Then run the other eight variants and the supporting checks for the full draft. Capture the actual link and event ID for each failure. For each replay, retain the saved and sent JSON for the same event.

Independent purchase check for TC-1 through TC-4. In the isolated local test database, use the webhook's `membership_purchase_id` to find the `MemberPurchase` record and compare its `member_id`, `invoice_item_id`, and `renewal_season_id` with the expected seeded or newly created purchase. The invoice item is the charged line. Read its parent invoice for the transaction reference.

```sql
-- Substitute the membership_purchase_id from the synthetic notification.
SELECT id, member_id, invoice_item_id, renewal_season_id
FROM memberships_memberpurchase
WHERE id = 101;
```

**Remaining proof** · Worker replay is a backend check. Replay the same saved event through the normal worker after the rename and reassignment and compare the complete body with the original. Proving automatic scheduling after an exception needs a separate worker retry test. The published developer reference needs a documentation review. Deployed delivery and FanThreeSixty ingestion are outside the local execution set. Endpoint configuration and generic event subscriptions use the previously reviewed Qase references.

The safest repeatable setup is the backend's isolated Django test database and synthetic records. From the `web-app` root, use the project's local Python environment and a focused test label, for example `python manage.py test memberships.tests.members.test_member_purchase_provenance`. The provenance module mocks outbound transport where needed. Reuse its setup to capture specific payloads or to exercise composite steps. The table lists existing assertions and the extra proof the draft calls for.

| Case | Existing local test entry point | Read alongside the draft |
| --- | --- | --- |
| TC-1 | `test_routed_grouped_purchase_waits_for_worker_then_snapshots_once`, `test_grouped_charge_and_distinct_batches_capture_names_with_bounded_queries`, `test_publication_obligation_survives_switch_change_and_redelivery` | The routed test verifies grouped issuance and one event. Distinct Group/Level pairs sharing a charge are a synthetic stress setup. Capture exact names for the real routed grouped payload when executing. The single-charge publication test verifies saved names and one event. |
| TC-2 | `test_repeat_nonseasonal_renewal_rebinds_access_but_preserves_old_batch`, `test_grouped_purchase_and_renewal_links_match_list_detail_and_webhook` | Existing cases cover purchase attribution, renewal names, and batch links. Capture both ticket bodies in the same renewal run for the case's receipt-level proof. |
| TC-3 | `test_real_generation_snapshots_lineage_before_webhook_publication`, `test_unknown_member_and_ordinary_items_keep_distinct_contracts` | Existing tests cover actual generated notification storage and ordinary ticket arrays. Inspect both ordinary invoice and ticket arrays in the captured regular purchase. |
| TC-4 | `test_names_follow_source_member_instead_of_transfer_recipient`, `test_generated_and_transferred_tickets_join_source_without_changing_money` | These inspect the prepared membership transfer line and ticket paths. A capture from the actual transfer producer provides additional delivery evidence. |
| TC-5 | `test_unknown_member_and_ordinary_items_keep_distinct_contracts`, `test_legacy_membership_line_is_explicitly_unavailable`, `test_missing_or_conflicting_entitlement_sources_are_never_guessed`, `test_unsafe_name_relationships_are_nullable` | The latter includes `no_group`. Match by `member_id` where it is known. |
| TC-6 | `test_unsafe_name_relationships_are_nullable`, `test_generated_ticket_rejects_a_foreign_source_member`, `test_wrong_venue_purchase_is_rejected_without_provenance` | Use two Organization records and distinguish discarded identities from a safe local fallback. |
| TC-7 | `test_stored_names_survive_rename_reassignment_and_delivery_retry` | Exercises worker and manual flags and compares the full stored body. For timing proof, capture while first delivery is paused and compare first delivery after the rename. The worker case checks replay, independently of task scheduler backoff behavior. |
| TC-8 | `test_older_stored_payload_is_delivered_without_adding_name_fields` | Reuse the saved-body comparison for both shapes. The existing test covers `NamesAbsent`. For `LinksAbsent`, remove `membership_links` from the stored synthetic copy before replay. |
| TC-9 | `test_produce__disabled_or_nonmatching_webhooks__creates_no_event_or_task`, `test_produce__stale_enabled_webhook__rechecks_current_configuration`, `test_produce__object_instance_venue_mismatch__does_not_persist_event`, `test_publication_obligation_survives_switch_change_and_redelivery` | Use the producer tests for the eligibility baseline. Check both switch states through the invoice producer. A purchase already queued with membership linkage ON keeps its recorded obligation even if the switch is turned OFF before membership creation finishes. |
| Batched lookups | `test_grouped_charge_and_distinct_batches_capture_names_with_bounded_queries`, `test_enrichment_query_count_does_not_grow_per_ticket`, `test_invoice_enrichment_is_reused_across_endpoints` | These are backend assertions. The browser can show the saved payload, while query counts require the local runner. |

## Sources reviewed

* Backend `web-app` at `62067009a8`. Name resolution in `apps/memberships/queries/members/webhook_lineage.py`, member and charge attribution in `apps/memberships/queries/members/purchase_lineage.py` and `apps/memberships/models/purchase_provenance.py`, notification persistence in `apps/venues/services/webhook/task_producer.py`, and delivery in `apps/venues/tasks/webhooks.py` and `apps/venues/services/webhook/service.py`.
* Qase Grammar Police terminology pass started with [[01 Repositories/Backend - web-app]]. `MemberPurchase` joins a Member to an Invoice item. `Webhook`, `WebhookEvent`, and `WebhookLog` in `apps/venues/models/integrations/webhooks.py` represent the endpoint, the saved event, and a delivery attempt. `apps/tickets/services/transfers/transfer_service.py` sends **Transfer** for the recipient's invoice and **Transferred** for the original invoice.
* Existing automated assertions in `apps/memberships/tests/members/test_member_purchase_provenance.py`, `apps/venues/tests/developer/test_membership_links.py`, and `apps/venues/services/webhook/tests/test_task_producer.py`. The local contract is in `docs/contracts/invoice-membership-links.schema.json` and `docs/systems/membership_webhook_purchase_lineage.md`.
* Frontend `showpass-frontend` at `12a457dd28`. An employee with the **Developer** permission can view stored event data under **Organization → Integrations → Webhooks → Events** and expand it with **Load more**. The receiver or the captured outbound request is the delivery evidence. Playwright's `tests/web/dashboard/organization/integrations/webhooks/coverage.md` documents existing Dashboard setup and logs checks. Use backend tests for payload, isolation, and query assertions.
* [[00 Start Here/World-Class Software Quality Standard]] · [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations]] · [[05 Tooling/Qase Test Case Writing Rules]]
