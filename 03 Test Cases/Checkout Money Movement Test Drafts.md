# Checkout Money Movement Test Drafts

Draft Qase/manual cases only after source-backed findings are identified in [[02 Feature QA/Checkout Critical Path Gap Analysis]].

Related notes:
- [[06 Prompts/Checkout Recursive Automation Prioritization Worker]]
- [[02 Feature QA/Checkout Automation Mission Control]]
- [[06 Prompts/Checkout Money Movement Exploration Goal]]
- [[02 Feature QA/Checkout Money Movement Risk Scoring]]
- [[04 Automation/Checkout Money Movement Automation Backlog]]
- [[06 Prompts/Showpass QA Test Case Generator]]

## Draft Index

| Local ID | Priority | Score | Title | Source Finding | Qase Status |
| --- | --- | ---: | --- | --- | --- |
| TC-CHK-001 | P0 | 96 | Checkout retry/replay creates one paid outcome | [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Duplicate / Retry / Replay Coverage Does Not Prove One Final Paid Outcome]] | Qase checked; no exact case found |
| TC-CHK-002 | P0 | 92 | Dashboard settlement amount matches checkout total | [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Transaction Detail Total Reconciliation Is Weaker Than It Appears]] | Qase checked; partial related case found |
| TC-CHK-003 | P0 | 94 | Failed payment creates no paid outcome | [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Failed Payment Is Not Proven To Avoid Paid Order, Issued Tickets, Or Inventory Consumption]] | Qase checked; partial related case found |
| TC-CHK-004 | P1 | 90 | Membership hold-link checkout reconciles paid amount and entitlement | [[02 Feature QA/Checkout Critical Path Gap Analysis#P1 - Membership Event-Batch Hold-Link Checkout Lacks Reusable Playwright Fixture Coverage]] | Qase checked; partial related cases found |
| TC-CHK-005 | P0 | 91 | Ticket plus checkout add-on reconciles both fulfillment lines | [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Mixed Ticket Plus Checkout Add-On Coverage Does Not Clearly Prove Both Fulfillment Lines]] | Qase checked; partial related cases found |
| TC-CHK-006 | P0 | 89 | Checkout tracking link prunes unavailable items before paid order | [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Checkout Tracking-Link Unavailable-Item Pruning Is Not Proven Through Paid Order Reconciliation]] | Qase checked; partial related case found |

## Qase Coverage Snapshot

Read-only Qase bulk scan on 2026-07-07:
- Source file: `/private/tmp/qase-checkout-money-cases-all.json`
- Cases scanned: 1566
- Detail file: `/private/tmp/qase-checkout-money-case-details.json`

| Local ID | Qase Result | Reviewed Case IDs | Notes |
| --- | --- | --- | --- |
| TC-CHK-001 | No exact case found | 3287, 4066, 4905 | Generic purchase cases exist; wallet recovery mentions one final order, but no duplicate submit/replay one-paid-outcome case was found. |
| TC-CHK-002 | Partial related case found | 935 | Module-price transaction case checks fee fields/totals, but not the reusable Dashboard `Settlement amount` assertion gap. |
| TC-CHK-003 | Partial related case found | 660, 661, 4905 | Declined payment case says no paid order is created; Affirm case focuses input/error states. Automation still needs source-backed no-paid invoice/ticket/inventory proof. |
| TC-CHK-004 | Partial related cases found | 431, 863, 2868 | Membership holds, batch hold emails, and branded hold checkout exist, but not membership event-batch hold-link purchase reconciliation. |
| TC-CHK-005 | Partial related cases found; no exact case found | 360, 388, 466, 935, 4763, 4817 | Cases cover add-on modal/cart behavior, broad mixed-item attraction purchase, add-on product purchase, transaction item-type rows, and ticket/product refund selection. None clearly proves one paid event-ticket plus checkout add-on order contains both fulfillment lines and final total. Detail file: `/private/tmp/qase-checkout-addon-case-details.json`. |
| TC-CHK-006 | Partial related case found | 4802 | Qase covers checkout-link review with existing basket and unavailable items, but does not clearly prove final paid order, charged total, and fulfillment after unavailable-item pruning. Detail file: `/private/tmp/qase-checkout-tracking-link-case-details.json`. |

## Draft Cases

### TC-CHK-001: WebPublic - Checkout - Duplicate Submit/Replay - Verify One Paid Outcome

**Priority:** P0  
**Risk score:** 96/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Duplicate / Retry / Replay Coverage Does Not Prove One Final Paid Outcome]]  
**Description:**  
Verify that a checkout path exposed to duplicate submit or replay behavior creates only one paid transaction, one order/invoice, and the expected ticket set.

**Plain QA handoff:**  
Automate one test that tries to submit or replay the same checkout purchase twice. The test passes only if the final state shows one paid transaction, one paid order/invoice, and one issued ticket set.

**Provider decision:**  
Use the existing Authorize.net replay path by default. If Stripe volume is the business priority, create or promote the same duplicate-submit proof for Stripe first.

**Preconditions:**  
- Authorize.net card checkout fixture is available.
- Repro harness can run `diagnostic-replay-purchase` or `throttled-panic-click`.
- Dashboard/API read access is available for final-state verification.

**Postconditions:**  
- Only one paid outcome exists for the completed checkout.
- Purchased tickets match expected quantity and are not duplicated.

**Tags:** checkout, payment, money-movement, duplicate-submit, authorize

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | WebPublic Guest first; Widget or Box Office only if needed |
| PaymentPath | Authorize Card |
| ReproScenario | `diagnostic-replay-purchase`, `throttled-panic-click` |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start checkout from selected surface | Paid ticket with known quantity and total | Basket reaches payment step |
| Trigger duplicate/replay behavior | Existing Authorize repro scenario | Checkout completes or handles duplicate safely |
| Capture invoice data | `invoiceData.id`, `invoiceData.transaction_id`, ticket items | Confirmation matches one invoice |
| Verify transaction uniqueness | Dashboard transaction filter or API by `transaction_id` | Exactly one transaction/order row exists |
| Verify issued items | Expected ticket quantity | No duplicate ticket set is issued |

**Automation handoff refinement:**  
Use `PROOF-CHK-002` as the first implementation contract: keep the first path to WebPublic guest plus `diagnostic-replay-purchase`, carry `invoiceData.transaction_id` and `invoiceData.id` out of the Authorize runner, assert one Dashboard transaction row first, and use venue invoice/invoice-items API proof only for item quantity/detail support. Do not expand to every Authorize surface until this proof is stable.

**Qase mapping:**  
- Existing case: no exact case found; reviewed 3287, 4066, 4905.
- Proposed suite: Checkout / Money Movement / Payment Integrity.
- Write action: None until explicit Qase write authorization.

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog#P0 - AUTO-CHK-002 - Duplicate Submit/Retry Creates One Paid Outcome]]

### TC-CHK-002: Dashboard - Transaction Detail - Settlement Reconciliation - Verify Paid Total

**Priority:** P0  
**Risk score:** 92/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Transaction Detail Total Reconciliation Is Weaker Than It Appears]]  
**Description:**  
Verify that a completed checkout's expected paid total matches the Dashboard transaction detail `Settlement amount`.

**Preconditions:**  
- Box Office checkout can complete with a known expected total.
- Dashboard transaction detail is accessible for the completed invoice.

**Postconditions:**  
- Dashboard transaction detail shows the expected paid total in `Settlement amount`.

**Tags:** checkout, payment, money-movement, dashboard, reconciliation

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | Box Office first |
| Scenario | Discounted checkout with known fees/taxes/total |
| ExpectedAmount | `pricingFeesTaxes.valueOnTransactionPage` |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Complete Box Office checkout | Existing discounted checkout fixture | Purchase succeeds and transaction number is available |
| Open Dashboard transaction detail | Transaction ID or transaction number | Correct transaction detail row opens |
| Verify settlement row | `financial-breakdown-row-Settlement amount` | Row contains expected paid total |

**Automation handoff refinement:**  
Use `PROOF-CHK-004` as the first implementation contract: update `TransactionPage.verifyTransactionDetails` to accept `pricingFeesTaxes`, assert `transactionRow.getByTestId("financial-breakdown-row-Settlement amount")` contains `pricingFeesTaxes.valueOnTransactionPage`, and keep the first proof on an existing Box Office discount caller. Do not add a new checkout scenario for this helper.

**Qase mapping:**  
- Existing case: Partial related case found: Qase 935.
- Gap: Qase 935 checks module-price transaction fee fields/totals, but does not cover the reusable Dashboard `Settlement amount` assertion gap.
- Proposed suite: Checkout / Money Movement / Dashboard Reconciliation.
- Write action: None until explicit Qase write authorization.

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog#P0 - AUTO-CHK-003 - Dashboard Transaction Total Reconciliation]]

### TC-CHK-003: WebPublic - Checkout - Failed Payment - Verify No Paid Outcome

**Priority:** P0  
**Risk score:** 94/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Failed Payment Is Not Proven To Avoid Paid Order, Issued Tickets, Or Inventory Consumption]]  
**Description:**  
Verify that a failed payment returns the buyer to checkout without creating a paid order, issuing usable tickets, or consuming inventory.

**Preconditions:**  
- Failed Affirm checkout path is available.
- Buyer identity or basket context is unique enough for negative Dashboard/API verification.

**Postconditions:**  
- No paid invoice/order exists for the failed attempt.
- No usable tickets are issued for the failed attempt.

**Tags:** checkout, payment, money-movement, failed-payment, affirm

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | WebPublic Guest first |
| PaymentPath | Failed Affirm |
| Verification | Dashboard/API no-paid-outcome check |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Start WebPublic checkout | Paid ticket with known quantity and unique buyer context | Basket reaches payment step |
| Fail Affirm payment | Existing failed-Affirm flow | Buyer returns to payment step with failure message |
| Check paid order state | Buyer/basket context | No paid invoice/order exists |
| Check issued items | Expected ticket quantity | No usable tickets are issued |
| Check inventory state if exposed | Event/ticket inventory context | Failed attempt does not permanently consume inventory |

**Automation handoff refinement:**  
Use `PROOF-CHK-003` as the first implementation contract: keep the first path to WebPublic guest plus failed Affirm, return a failure context from `payWithAffirmExpectingFailure().result()`, carry unique buyer email, event id, ticket type id, `CartResult.itemId`, requested quantity, and expected total, then prove no venue invoice by exact email and no venue invoice-items by `invoice__email`, `event`, and `ticket_type`. Use owner-scoped user ticket item checks only when authenticated ownership or claim context is available.

**Qase mapping:**  
- Existing case: partial related cases 660, 661, 4905.
- Proposed suite: Checkout / Money Movement / Payment Integrity.
- Write action: None until explicit Qase write authorization.

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog#P0 - AUTO-CHK-001 - Failed Payment No Paid Order/Tickets/Inventory]]

### TC-CHK-004: Membership - Hold Link Checkout - Verify Paid Amount And Entitlement

**Priority:** P1  
**Risk score:** 90/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P1 - Membership Event-Batch Hold-Link Checkout Lacks Reusable Playwright Fixture Coverage]]  
**Description:**  
Verify that a generated membership event-batch hold link can be purchased through public hold checkout and reconciles the paid amount, issued entitlement, and inventory or seat state.

**Preconditions:**  
- Member and HOLD membership event batch can be created/generated.
- Generated member can be identified through `/api/user/memberships/members/` using known buyer and membership context.
- Generated member hold link can be retrieved through user membership-benefit issue-ticket data.

**Postconditions:**  
- Hold-link checkout creates one paid order for the expected hold price.
- Member ticket entitlement and inventory/seat state are correct after purchase.

**Tags:** checkout, payment, money-movement, membership, hold-link

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | Membership hold link to public checkout |
| PaymentPath | Card |
| Fixture | HOLD membership event batch with known member price |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Create/generate HOLD membership event batch | Known member, price, expiry | Member ticket batch is generated |
| Identify member id | `/api/user/memberships/members/` filtered by membership context | Intended `member.id` is found without stale-member ambiguity |
| Retrieve hold link | `/api/user/memberships/membership-benefit-issue-tickets/?member={memberId}` | Response includes `member_ticket_batches[].hold_link` |
| Open hold checkout | Normalized hold link | Public checkout opens for held member ticket(s) |
| Complete payment | Card payment | Paid invoice/order is created |
| Verify reconciliation | Expected price, member entitlement, inventory/seat state | Paid amount and entitlement match generated hold |

**Qase mapping:**  
- Existing case: partial related cases 431, 863, 2868.
- Proposed suite: Checkout / Money Movement / Membership.
- Write action: None until explicit Qase write authorization.

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog#P1 - AUTO-CHK-005 - Membership Event-Batch Hold-Link Checkout Reconciliation]]

### TC-CHK-005: WebPublic - Checkout Add-Ons - Verify Ticket And Product Fulfillment

**Priority:** P0  
**Risk score:** 91/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Mixed Ticket Plus Checkout Add-On Coverage Does Not Clearly Prove Both Fulfillment Lines]]  
**Description:**  
Verify that a buyer who purchases an event ticket and adds a product during checkout receives one paid order whose confirmation/order detail includes both the base ticket and the add-on product at the expected total.

**Preconditions:**  
- Event checkout exposes a product in Checkout AddOns.
- Base ticket and add-on product have known expected quantities and total.

**Postconditions:**  
- Paid order contains the base event ticket.
- Paid order contains the checkout add-on product.
- Confirmation/order detail total matches the mixed basket.

**Tags:** checkout, payment, money-movement, add-ons, products

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | WebPublic CheckoutAddOns |
| PaymentPath | Card |
| Basket | Event ticket plus product add-on |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Add event ticket | Known ticket type and quantity | Ticket is in basket |
| Add checkout product add-on | Known product variant and quantity | Product is added to same checkout |
| Complete payment | Card payment | One paid order is created |
| Verify order detail | Base ticket, add-on product, expected total | Both fulfillment lines and total match the purchase |

**Qase mapping:**  
- Existing case: partial related cases 360, 388, 466, 935, 4763, 4817; no exact case found.
- Proposed suite: Checkout / Money Movement / Mixed Basket.
- Write action: None until explicit Qase write authorization.

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog#P0 - AUTO-CHK-006 - Mixed Ticket Plus Checkout Add-On Reconciliation]]

**Automation handoff refinement:**  
Use `PROOF-CHK-005` for the first Playwright implementation. Upgrade the existing `CheckoutAddOns` branch to pass both the preserved base ticket details and add-on product details into order confirmation verification, using the existing combined total helper. Add invoice-items API proof only if the UI order detail cannot reliably prove both lines.

### TC-CHK-006: WebPublic - Checkout Link - Verify Unavailable Item Pruning Before Paid Order

**Priority:** P0  
**Risk score:** 89/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#P0 - Checkout Tracking-Link Unavailable-Item Pruning Is Not Proven Through Paid Order Reconciliation]]  
**Description:**  
Verify that a checkout tracking link with partially unavailable configured extras and an existing basket only charges and fulfills the available remaining items.

**Preconditions:**  
- Checkout tracking link has configured ticket extras.
- Existing basket identity can be created or preserved before opening the link.
- At least one configured extra is unavailable and at least one item remains purchasable.
- Requested quantity, removed/unavailable quantity, expected remaining quantity, and expected pruned total are known.

**Postconditions:**  
- Paid order excludes unavailable quantities.
- Charged total matches the available remaining items.
- Confirmation/order detail matches the pruned basket.

**Tags:** checkout, payment, money-movement, tracking-links, inventory

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | WebPublic Checkout Link |
| BasketState | ExistingBasket |
| InventoryState | PartiallyUnavailable |
| PaymentPath | Card |
| QuantityContract | RequestedQuantity / RemovedQuantity / RemainingQuantity |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open checkout tracking link | Existing basket plus configured extras | Review page preserves existing basket identity |
| Allow unavailable-item pruning | Partially unavailable configured extras | Unavailable quantities are shown and removed from purchasable basket |
| Continue checkout | Valid remaining items | Checkout proceeds only with available items |
| Complete payment | Card payment | One paid order is created |
| Verify final order | Expected remaining items and pruned total | Order/confirmation excludes unavailable quantities and total matches charged amount |

**Qase mapping:**  
- Existing case: partial related case 4802.
- Proposed suite: Checkout / Money Movement / Tracking Links.
- Write action: None until explicit Qase write authorization.

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog#P0 - AUTO-CHK-007 - Checkout Tracking-Link Unavailable-Item Paid Outcome]]

## Draft Case Template

```markdown
### TC-#: [Surface] - Checkout - [Money Movement Area] - Verify [Expected Behavior]

**Priority:** P0/P1/P2/P3  
**Risk score:** 0/100  
**Source finding:** [[02 Feature QA/Checkout Critical Path Gap Analysis#heading]]  
**Description:**  

**Preconditions:**  
- 

**Postconditions:**  
- 

**Tags:** checkout, payment

**Parameters:**  

| Parameter | Values |
| --- | --- |
| Surface | Public Checkout |
| PaymentPath | SuccessfulCard |

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
|  |  |  |

**Qase mapping:**  
- Existing case:
- Proposed suite:
- Write action:

**Automation candidate:**  
- [[04 Automation/Checkout Money Movement Automation Backlog]]
```

## Drafting Rules

- Do not draft broad checkout cases until the source finding is specific.
- Prefer one case per materially different money movement risk.
- Keep manual cases readable and Qase-ready.
- Reference source paths instead of copying implementation details.
- Do not create or update Qase cases without explicit confirmation of exact scope.
