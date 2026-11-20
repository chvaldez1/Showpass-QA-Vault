---
title: SPW-21423 Membership Webhook Name Snapshots
date: 2026-11-20
tags:
  - qa/test-cases
  - memberships
  - api-testing
---

# SPW-21423 Membership Webhook Name Snapshots

**Status** · Nine Qase-ready drafts. No executions recorded. Target is [SPT → Integrations → Webhooks (suite 193)](https://app.qase.io/project/SPT?suite=193).

## Scope and proof

FanThreeSixty needs the Membership Group and Level names in the same Showpass notification that identifies the member. The names must match the member represented in each link when Showpass creates the notification. The integration must be able to process retries, older messages, and missing names without looking up a different member or attributing a ticket to the wrong purchase.

[SPW-21423](https://showpass.atlassian.net/browse/SPW-21423) was **BETA QA**, Medium, with no comments when reviewed. The ticket calls for synthetic local data. The proof is the saved notification and the JSON body sent to a local receiver or captured by the backend test. The main risks are incorrect membership or purchase attribution, changed data on retries, broken older messages, and disclosure across Organizations. This review uses local source. Deployment, published developer docs, and partner ingestion are unverified.

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

The suite has nine existing cases. SPT-1709 covers endpoint setup, SPT-1711 covers event subscriptions, SPT-1714 covers generic resend, and SPT-5963 covers replaying the original body when the destination and signing key change. The cases below add membership-specific assertions. Existing cases remain as reference coverage.

## Qase-ready cases

### TC-1: Webhooks - Memberships - Include names on single and grouped purchases

**Description:** Verify that a completed membership purchase produces one link for each member on the charge. A Membership Group is the membership program and a Membership Level is its tier. A webhook is the notification Showpass sends to the Organization's integration.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| ChargeSize | Local order setup |
| --- | --- |
| Single | One membership on one charge line. Use `Community` and `Gold`. |
| Grouped | Two memberships on the same charge line for the same level. Use `Community` and `Gold` for both. |

Run both values with separate orders.

**Preconditions:**

* Use a local Showpass test database and a local receiver or captured send. Use synthetic customers and simulated payment.
* Set the local global switch `enable_membership_webhook_lineage` to ON before purchase.
* The Organization has one enabled webhook endpoint subscribed to **Purchase**.

**Postconditions:**

* Keep the purchase reference, notification ID, and captured JSON with the result. Reset the local test data.

**Tags:** memberships, api-testing, transaction-payload

**Parameters:**
ChargeSize: Single, Grouped

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete the selected local membership purchase and allow membership creation to finish. Record the transaction reference, charged line ID, member IDs, and membership purchase IDs. | Use the quantity for `ChargeSize`. | One order and one charge line exist, with the selected number of members. One Purchase notification is saved for the endpoint. |
| Open the saved notification. Compare the charged line's `data.invoice_items[].membership_links` with the recorded memberships. | Match by `member_id`. | Each member appears once with `Community` and `Gold`, their own `membership_purchase_id`, the correct `current_member_id`, and `lineage_status` of `resolved`. |
| Compare the source fields on each link with the charge. Replay membership processing for the grouped order once. | `source_transaction_id`, `source_invoice_item_id`, `renewal_season_id` | All links point to the recorded charge and use the recorded season, or `null` for a nonseasonal purchase. The grouped replay adds zero members, charges, and notifications. |

### TC-2: Webhooks - Memberships - Keep original and renewal purchases distinct

**Description:** Verify that a renewal notification carries the member's Group and Level names and identifies the renewal charge. A ticket issued before the renewal must keep the purchase that granted it.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

**Preconditions:**

* Use one synthetic Organization and member in a local database. Set `enable_membership_webhook_lineage` to ON and use one enabled local endpoint subscribed to **Purchase**.
* The member has a completed `Community` / `Gold` nonseasonal membership purchase that grants an Event ticket benefit.
* The original order contains one membership. Prepare two separate Events with separate ticket batches for the same benefit. Generate one ticket for the first Event before renewal. Record the original membership purchase ID, transaction reference, and charged line ID.

**Postconditions:**

* Keep both charge references and the relevant notification JSON. Reset the local test data.

**Tags:** memberships, renewals, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete a renewal for the same member on a second order. Record the new purchase ID, transaction reference, and charged line ID. | Renew `Community` / `Gold` for the same member. | The renewal creates a distinct charge and keeps the same member identity. |
| Open the Purchase notification for the renewal and inspect the renewal line's `membership_links`. | `data.invoice_items[]` | The link is `resolved`, includes `Community` and `Gold`, and identifies the member and the renewal purchase, transaction, and line. The season is `null` for this nonseasonal renewal. |
| Read the first Event ticket's saved link. Issue one ticket for the second Event using the same nonseasonal benefit after the renewal and inspect its notification. | `data.ticket_items[]` on the two ticket notifications | The first ticket still points to the original purchase and charge line. The second ticket points to the renewal purchase and charge line. |

### TC-3: Webhooks - Memberships - Name the member on a benefit ticket

**Description:** Verify that Showpass identifies the member and the charge when it issues a ticket from a membership benefit. Compare the result with an ordinary ticket purchase that has no membership attached.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

**Preconditions:**

* Use one local Organization with `enable_membership_webhook_lineage` ON and an enabled local webhook subscribed to **Purchase**.
* One synthetic member has a completed order for one `Community` / `Gold` membership. Record the member ID, purchase ID, charged line ID, and transaction reference.
* One Event in the Organization supplies one benefit ticket and has a regular admission ticket type available for a separate test order.

**Postconditions:**

* Keep the synthetic membership charge and both ticket notification bodies with the result. Reset the local test data.

**Tags:** memberships, tickets, api-testing

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Issue one Event ticket through the member's benefit and open the Purchase notification for the ticket order. | Match the event and issued ticket ID. | The ticket order has its own transaction reference and the notification includes the issued ticket. |
| Read the issued ticket's link and compare it with the membership charge. | `data.ticket_items[].membership_links` | One `resolved` link contains `Community` and `Gold` and the recorded member, membership purchase, original transaction, and charged line IDs. The original membership charge stays on its original order. |
| Make a separate local purchase for one regular admission ticket. Open its Purchase notification and check both item collections. | `data.invoice_items[]`, `data.ticket_items[]` | The regular ticket and its charged line each have `membership_links: []`. |

### TC-4: Webhooks - Memberships - Use the source member on transfers

**Description:** Verify that names follow `member_id`, which identifies the source member for a resolved transfer. `current_member_id` identifies the member associated with the transfer line or ticket batch. A direct ticket transfer can change the ticket holder while keeping the same batch member.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| TransferKind | Local setup |
| --- | --- |
| Membership | Transfer one paid `Community` / `Gold` membership. Give the recipient's associated membership `Recipient Club` / `Silver` in the local setup before creating the test notification. |
| BenefitTicket | Issue one ticket for one Event from a paid `Community` / `Gold` membership. Transfer just the ticket to a second customer. Use the transfer path that drops the direct link to the original ticket batch. |

Run both values with separate source purchases.

**Preconditions:**

* Use one local Organization, synthetic source and recipient accounts, and `enable_membership_webhook_lineage` ON.
* Use an enabled local endpoint subscribed to **Transfer** and **Transferred**, or capture the prepared transfer body in the local backend test.
* Record the source and recipient identities, original membership purchase ID, charged line ID, and transaction reference.

**Postconditions:**

* Keep the relevant captured transfer link and original charge reference. Reset the local test data.

**Tags:** memberships, transfers, api-testing

**Parameters:**
TransferKind: Membership, BenefitTicket

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete the selected transfer for the second customer and open the recipient-side invoice payload. For `Membership`, also capture a benefit ticket generated for the transferred membership. | Check `data.invoice_items[]` for the membership transfer line and `data.ticket_items[]` for the generated or transferred ticket. | The selected recipient has the membership or ticket. The captured data contains the expected transfer line or ticket. |
| Compare `member_id`, `current_member_id`, and both names with the recorded memberships. | `membership_group_name`, `membership_level_name` | `member_id` identifies the original member and the names are `Community` and `Gold`. For `Membership`, `current_member_id` identifies the recipient member. For `BenefitTicket`, it identifies the original batch member. |
| Compare the purchase and charge references on the link with the source order. | `membership_purchase_id`, `source_transaction_id`, `source_invoice_item_id`, `lineage_status` | The link is `resolved` and identifies the original membership purchase and charge. |

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

Run each value with separate local data.

**Preconditions:**

* Use one synthetic Organization. Set `enable_membership_webhook_lineage` to ON and capture the newly prepared invoice body in the local backend test.
* Prepare the selected `LinkState` in the local test database. Keep a separate same-Organization member with complete data as a comparison.

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
| Inspect the comparison member's complete link. | Same Organization, known source purchase and valid group and level | The comparison link is `resolved` and returns its own exact names and purchase references. |

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

Run each value using fresh synthetic records.

**Preconditions:**

* Use two synthetic Organizations in the local test database. Give Organization B distinctive group and level names, such as `Other Club` and `Other Tier`.
* Set the local global `enable_membership_webhook_lineage` switch to ON.
* Give Organization A a valid `Community` / `Gold` member alongside the selected broken relationship. Prepare the broken relationship only in the local backend test.

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

**Description:** Verify that Showpass captures Group and Level names when creating the notification. The same notification must keep those names on first delivery and on retry even when the membership has changed. A new notification reads the names again.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

| RetryMode | How to repeat delivery |
| --- | --- |
| Worker | Run another delivery attempt through the local delivery worker for the same saved notification. |
| Manual | Run the local resend path for the same saved notification. |

Run both values separately.

**Preconditions:**

* Use one local Organization, one synthetic `Community` / `Gold` membership charge, and one enabled endpoint subscribed to **Purchase**.
* Set `enable_membership_webhook_lineage` to ON. Use a local receiver or captured transport that can pause delivery until after the event is saved.

**Postconditions:**

* Keep the original and new notification IDs and the saved and sent JSON used in the comparisons. Reset the local test data.

**Tags:** memberships, api-testing, notifications

**Parameters:**
RetryMode: Worker, Manual

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create a Purchase notification and pause delivery. Save its entire JSON and notification ID. | `Community` and `Gold` | The saved body includes both original names and the correct membership link. |
| Rename the group and level. Deliver the original notification and repeat delivery using the selected `RetryMode`. | Rename to `Renamed Community` and `Platinum`. | The first and repeated delivery bodies equal the original saved JSON. They use the original notification ID and still contain `Community` and `Gold`. |
| Create a separate notification for the same invoice in the local test and read its body. | Create a new event. Keep the original order. | The new notification has a different ID and captures `Renamed Community` and `Platinum`. The original saved body still matches its baseline. |
| Move the represented member to another local group and level. Create a third notification and repeat delivery of the first one. | `New Club` and `New Tier` | The third notification captures `New Club` and `New Tier`. The repeated delivery of the first notification still matches its original JSON. |

### TC-8: Webhooks - Memberships - Resend older notifications with their original fields

**Description:** Verify that a consumer can still receive a previously stored notification whose membership links were saved before the name fields existed.

| Platform | View |
| --- | --- |
| Outbound webhook | Not applicable |

**Preconditions:**

* Use a local Organization, one enabled test endpoint subscribed to **Purchase**, and a synthetic member with valid current Group and Level names.
* Seed one stored notification for the member with a valid legacy membership link and both name keys absent. Retain a copy of that body before delivery.
* Use a local receiver or captured send that can show the entire body.

**Postconditions:**

* Keep the saved and sent legacy JSON and reset the local test data.

**Tags:** memberships, api-testing, notifications

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| With `enable_membership_webhook_lineage` ON, resend the stored notification. | Use the existing notification ID. | The receiver gets the original JSON. Both name keys are still absent, and the original link IDs and status are present. |
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

### Contract and documentation

1. Validate the sample invoice body against `docs/contracts/invoice-membership-links.schema.json`. Validate each new link against `CapturedMembershipLink` in both `data.invoice_items[]` and `data.ticket_items[]`. The examples should include exact source-member strings, explicit `null`s for an unknown member, and `[]` for an ordinary item.
2. In local copies, remove one name key at a time and replace each name with a number or boolean. The new-link schema must reject each variant. The compatible `MembershipLink` definition must accept an otherwise valid legacy link with both keys omitted. Check that a copied older notification with no `membership_links` also passes the compatible envelope schema.
3. Review the published payload reference for both arrays, source and current member semantics, creation-time snapshots, null handling, retries, and older messages with missing keys. The member lookup API returns current names when queried. Confirm the examples show the same distinctions. The repository contract and guide are present. Publication and deployed behavior still need evidence. [Developer payload reference](https://dev.showpass.com/webhooks/webhooks-payload-invoice-object#membership-purchase-linkage)

### Batched lookups

Run the query-count checks for one versus four distinct members and ticket batches, and one versus eight tickets from the same batch. Count queries around enrichment only, after synthetic records are prepared. Both comparisons must have equal query counts and the distinct-member check must return the right names for all four members. Also verify that adding a second subscribed endpoint reuses the prepared membership data and still creates one saved notification per endpoint.

## Minimum execution set and local setup

Run all nine cases as drafted. The parameters yield 19 runs across the nine case definitions. Run the schema, documentation and query checks alongside them. Capture the actual link and event ID for each failure. For retry comparisons retain the saved body and delivered body for the same event. Local transport capture proves the body Showpass passes to delivery. FanThreeSixty processing and the deployed build are outside that proof.

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
| TC-8 | `test_older_stored_payload_is_delivered_without_adding_name_fields` | Seeds the older link and compares the body passed to delivery with the stored JSON. |
| TC-9 | `test_produce__disabled_or_nonmatching_webhooks__creates_no_event_or_task`, `test_produce__stale_enabled_webhook__rechecks_current_configuration`, `test_produce__object_instance_venue_mismatch__does_not_persist_event`, `test_publication_obligation_survives_switch_change_and_redelivery` | Use the producer tests for the eligibility baseline. Check both switch states through the invoice producer. A purchase already queued with membership linkage ON keeps its recorded obligation even if the switch is turned OFF before membership creation finishes. |
| Batched lookups | `test_grouped_charge_and_distinct_batches_capture_names_with_bounded_queries`, `test_enrichment_query_count_does_not_grow_per_ticket`, `test_invoice_enrichment_is_reused_across_endpoints` | These are backend assertions. The browser can show the saved payload, while query counts require the local runner. |

## Sources reviewed

* Backend `web-app` at `62067009a8`. Name resolution in `apps/memberships/queries/members/webhook_lineage.py`, member and charge attribution in `apps/memberships/queries/members/purchase_lineage.py`, notification persistence in `apps/venues/services/webhook/task_producer.py`, and delivery in `apps/venues/tasks/webhooks.py` and `apps/venues/services/webhook/service.py`.
* Existing automated assertions in `apps/memberships/tests/members/test_member_purchase_provenance.py`, `apps/venues/tests/developer/test_membership_links.py`, and `apps/venues/services/webhook/tests/test_task_producer.py`. The local contract is in `docs/contracts/invoice-membership-links.schema.json` and `docs/systems/membership_webhook_purchase_lineage.md`.
* Frontend `showpass-frontend` at `12a457dd28`. An employee with the **Developer** permission can view stored event data under **Organization → Integrations → Webhooks → Events** and expand it with **Load more**. The receiver or the captured outbound request is the delivery evidence. Playwright's `tests/web/dashboard/organization/integrations/webhooks/coverage.md` documents existing Dashboard setup and logs checks. Use backend tests for payload, isolation, and query assertions.
* [[00 Start Here/World-Class Software Quality Standard]] · [[00 Start Here/Showpass QA Handbook/Playbooks/19 Forms Communication Websites and Integrations]] · [[05 Tooling/Qase Test Case Writing Rules]]
