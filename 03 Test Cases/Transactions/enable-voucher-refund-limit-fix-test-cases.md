---
title: Voucher Refund Limit Fix - Base and Critical Edge Cases
date: 2026-11-09
tags:
  - qa/test-cases
  - refunds
  - ticket-credits
status: Source-reviewed manual drafts; TC-01 Events and basket smoke prepared in beta; Refund cases not executed or published
---

# Voucher Refund Limit Fix — Base and Critical Edge Cases

**5 standalone Qase-ready drafts; 6 planned runs. No cases were executed. Qase was not queried or changed.** No dedicated case note existed for this switch. The broader [[02 Feature QA/Branch Digests/2026-11-06-develop|develop digest]] and the separate [[02 Feature QA/Refunds and Exchanges/SPW-18708-ticket-credit-uses-after-void|Void investigation]] remain supporting context.

**2026-11-10 preparation update:** TC-01's four Events and Ticket Credit definition were created in beta on **Venue 1786 / Organization 1786-Anime**. All six ticket types reached checkout in four refreshed basket checks; all test baskets were emptied. No confirmed bugs. Customer voucher issuance, purchases and the Refund case itself remain **Not run**. Start with [the copy-ready continuation handoff](#tc01-continuation-handoff), or see [the preparation run and evidence](#tc01-beta-preparation-2026-11-10). Earlier source-review statements below describe the original drafting scope.

## Testing intent and scope

We are testing whether an Employee can refund voucher-discounted tickets, and a Customer can return eligible free tickets, while the correct number of voucher uses becomes available again. This matters because Customers could lose uses they paid for or receive more uses than they should. We will prove it with the Customer's refreshed **Available** balance, completed reuse, selected and untouched tickets, and the saved money records.

| Field | Scope |
| --- | --- |
| Criticality | Money/order state; admission rights; Inventory; financial agreement; overlapping updates. |
| Invariant | Restore the uses belonging to completed eligible Refunds exactly once; preserve other tickets, other vouchers, and the current saved allowance. |
| Actors | Employee with transaction/refund permissions; Customer owning the voucher and orders; setup administrator for owned voucher/configuration preparation and read-only financial proof. |
| Rollout | Global backend switch `enable_voucher_refund_limit_fix` ON, including refund workers. Deployed build and saved switch state are unverified. |
| Breadth | Focused base cases and critical edges: one or several credited lines plus a separate excluded paid line, existing purchases, refreshed balance, exact reuse boundary, successive $0 credited-line Refunds, overlapping mixed-order Refunds, and free returns. |
| Confidence | High for the changed calculation and test definitions; medium for runnable setup/navigation from current source; no live or execution confidence established. |
| Data safety | Future execution changes owned test orders and money records. Use approved payment testing and controlled Customers; preserve completed financial history. This request authorized drafting only. |

**Terms:** A voucher here is a Customer's **Ticket Credit**: a code covering the full ticket price for a limited number of eligible tickets. It is different from money held as **Organizer Credits**. An **order line** groups tickets of the same purchased offering. Selecting two tickets on one line alone cannot prove that uses from several lines are added together. These cases use regular tickets. In TC-01–TC-04, each paid redemption order includes a separate full-price ticket excluded from the credits. Event I issues the code in a separate purchase; it is not a package parent and must stay untouched. TC-05 remains the separate $0 Customer free-return case. Required setup is not a claim that any Customer or order has already been inspected or prepared.

### Owning screens and entry points

| Visible navigation | Source/route evidence | Owning group / proposed Qase placement |
| --- | --- | --- |
| Dashboard → Operations → Box Office → Transactions → order → Refund | `operations-routes.ts`; `BOX_OFFICE.TRANSACTIONS`; transaction Refund action/dialog | This Transactions note; proposed Operations → Box Office → Transactions → Refunds. TC-01–TC-04. |
| Customer account → My Orders → order → Return free tickets | `OrderOptionsList.web.tsx`; free-ticket return modal | Customer → My Orders → Free-ticket returns. TC-05. |
| Customer account → Credits → Ticket Credits | `useAccountNavItems.ts`; `CreditList.web.tsx`; `TicketCreditsContainer.web.tsx` | Supporting balance/reuse proof inside the owning case; no duplicate cases. |

Suite placement is proposed; no Qase tree or suite IDs were read. The older Dashboard shell groups Transactions under **Manage**. The current frontend groups it under **Operations → Box Office**; the cases use that current hierarchy. There were no open Codex in-app tabs when checked, so deployed labels, Organization, role and page could not be verified. No desktop browser was controlled or new session opened.

### Entry points versus outcomes

| Entry point | Starting state | Outcomes selected / disposition |
| --- | --- | --- |
| Employee Refund | Mixed paid redemption order: normal 100% Ticket Credits cover eligible lines; a separate excluded ticket is paid in full | Clean success, retained tickets, cancel before submission, successive completed Refunds, already-refunded selection, refreshed balance and reuse. TC-01–TC-03. |
| Two Employee Refund sessions | Separate mixed redemption orders sharing one normal voucher, each with a separate excluded paid ticket | Both final results and combined balance. TC-04; precise timing guarantees also need backend proof. |
| Customer free return | Eligible $0 voucher-funded tickets; free returns enabled | Selected tickets returned, retained ticket preserved, uses available again without money credit. TC-05. This path processes lines separately and does not replace the Employee multi-line check. |

Other inherited consumers are recorded below; they are not silently treated as executed or covered by these five cases.

## Manual cases

### Dashboard → Operations → Box Office → Transactions → Refund

#### TC-01 — Full mixed-order Refund, refreshed balance and exact reuse boundary

**Title:** Dashboard - Refunds - Restore voucher uses from a mixed order and spend them again

**Description:** Refund one mixed order containing three tickets fully covered by a normal Ticket Credit and one separate full-price ticket. The three uses must return, while the paid ticket adds no voucher use. Spend those restored uses in another mixed order, then check the next use is refused.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Tags:** dashboard, refunds, credits

**Preconditions:**

**Employee and switch**

* Employee permission: **Manage Transactions** (also called **Administer Transactions**).
* Refund permission: **Full Refund** for **Base refund** when refund-type permissions are enabled.
* Global switch: `enable_voucher_refund_limit_fix` = **ON** during the Refund.

**Events and tickets — 1 issuing Event and 3 redemption Events**

* All four Events are published, future, single-date Events in the **same Organization**.
* Use regular electronic tickets without packages or assigned seats. Record actual Event and ticket-type names against the labels below.
* Find ticket setup through Dashboard → Build → Events → edit the Event → Tickets.

| Event | Ticket types and quantities | Role |
| --- | --- | --- |
| Event I | 1 issuing ticket, purchased once | Issues 3 normal Ticket Credits; its order stays untouched. |
| Event A | 3 credited tickets at $10 each, plus 1 different paid ticket at $10 | Original redemption order: 4 tickets on 2 lines. |
| Event B | 3 credited tickets at $10 each, plus 1 different paid ticket at $10 | Spend the restored uses in a second paid redemption order. |
| Event C | At least 1 credited-type ticket available at $10 | Try one extra use after the restored balance is exhausted; leave the attempt unpaid. |

* Events B and C are on sale and have no prior uses of this code; their per-Event allowance must not cause the exhaustion result.
* The paid ticket types at Events A and B are explicitly excluded from the Ticket Credit assignments.

**Normal Ticket Credit — prepare before the redemption order**

* A setup Employee with **Manage Events** can open Dashboard → Promote → Promotions → Ticket credits for this Organization.
* Create a Ticket Credit, enter its name and set **Limit per item, per user** to **3**; save.
* Under **Credits issued by**, use **Add issuing event** to select Event I; set the issuing ticket's credit quantity to **3**.
* Under **Credits redeemable for**, add Events A, B and C; enable only their **credited ticket** types. Leave every **paid ticket** type unselected.
* Save and reopen the assignments to verify the quantities and eligible ticket types.
* As the controlled Customer, buy **one issuing ticket at Event I** using the approved test payment method.
* Open Customer account → Credits → Ticket Credits. Record the resulting code and issuing-order reference; this code is the Customer's voucher.

| Required voucher state before redeeming | Value |
| --- | --- |
| Ticket-price discount | Normal **100%** Ticket Credit |
| Available | 3 |
| Used | 0 |
| Per-Event allowance | 3 |
| Paid ticket eligibility | Excluded; consumes **0** uses |

* Keep the issuing order separate and untouched. Do not change any voucher percentage or reset used balances in Admin.

**Order at the start of the test**

* Complete **one redemption purchase** containing Event A's **3 credited tickets and 1 paid ticket** on two separate lines.
* Checkout must cover all three credited ticket prices and leave the other ticket at $10 before its actual fees/tax.
* Voucher balance after this purchase: **Available = 0; Used = 3**. The paid ticket consumes no use.
* All 4 tickets are unscanned, unrefunded, and have not been transferred or exchanged.
* This mixed order permits **Base refund → Original payment source**.
* Keep another voucher untouched and record its opening Available balance.

**Money and evidence**

* Every credited ticket has a saved Customer total of **$0**, including any Customer-paid tax/fees; the paid ticket remains full price.
* Use an approved saved fee setup with a known nonzero Showpass fee on the paid line; record its fee/tax allocation.
* Record the redemption transaction reference, original charge, discount and each fee class.
* Calculate the selected lines' Base refund, refundable tax, retained/returned fees and Showpass earnings from saved values and the Organization's rules.
* The credited tickets contribute **$0 of ticket-price money** to the Refund. Each selected paid ticket contributes its paid base price under Base refund.
* Have read access to the payment provider's test records and Admin → Financials → Invoice items, searchable by redemption transaction reference.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the Customer, open account → Credits → Ticket Credits. | Recorded code | Available is 0 and Used is 3. |
| As the Employee, open Dashboard → Operations → Box Office → Transactions and find the Event A redemption order. | Redemption reference; include its date/Event in the filters | The same Customer, three credited tickets and one full-price paid ticket are shown. |
| Open the order’s actions and select Refund. |  | The Refund transaction dialog opens. |
| Choose Base refund to Original payment source and select both Event A lines. | 3 credited tickets + 1 paid ticket | Both lines are selected; the issuing order is excluded. |
| Compare the total with the independent calculation. | Paid line’s refundable money and actual tax/fee rules | The credited ticket prices add $0; only the paid line contributes paid ticket-price money. |
| Select Refund, then Confirm refund once; wait for completion. |  | The selected four tickets receive one completed Refund. |
| Immediately reload the Customer’s Credits page. | Same code | Available is exactly 3 and Used remains 3; the paid ticket has added no extra use. |
| Reopen the redemption order in Transactions and My Orders. | Original redemption reference | All four selected tickets are refunded; the issuing order is unchanged. |
| Open the original redemption payment in the test provider and its original/Refund Invoice items in Admin → Financials. | Redemption reference and independent calculations | One correct money return exists; fees, tax and Showpass earnings match the rules, without a payout for the credited ticket prices. |
| As the Customer, open Event B and add its three credited tickets and one paid ticket; apply the same code. | 3 credited tickets + 1 excluded paid ticket | The three credited ticket prices are fully covered; the other ticket stays at $10 before actual fees/tax. |
| Complete checkout once and reopen that order in My Orders. | Approved test payment method | One correct mixed order has four usable tickets and one collection of the amount actually due. |
| Reload Credits. | Same code | Available is 0 and Used is 6; neither paid ticket counted as voucher usage. |
| Open Event C, select one credited-type ticket and try the code without paying. | Unused per-Event allowance | No further voucher discount is granted and no extra order or charge is created. |
| Reload Credits and inspect the untouched voucher. | Opening balances | The tested code stays at 0 Available; the other voucher is unchanged. |

**Postconditions:**

* Empty the final unpaid basket. Preserve both redemption orders, the Refund, the issuing order and all payment references.
* Keep the replacement tickets and earned usage history; restore only unrelated setup values changed for the run.

#### TC-02 — Several credited lines plus a separate paid line

**Title:** Dashboard - Refunds - Restore all credited Event uses from a mixed order and keep the unselected Event

**Description:** Refund six credited Event lines and one excluded paid ticket together from one mixed order. Keep the seventh credited Event. The same normal 100% Ticket Credit covers every credited line; the paid ticket restores no use. Run both TicketQuantity values independently, using purchases made before enablement.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

| TicketQuantity | One original redemption order | Refund together | Keep | Available after completion |
| --- | --- | --- | --- | --- |
| TwoPerEvent | 2 credited tickets at each of 7 Events, plus 1 paid ticket: 15 tickets / 8 lines | Events A–F’s 12 credited tickets + the paid ticket: 13 tickets | Event G’s 2 credited tickets | 12 |
| ThreePerEvent | 3 credited tickets at each of 7 Events, plus 1 paid ticket: 22 tickets / 8 lines | Events A–F’s 18 credited tickets + the paid ticket: 19 tickets | Event G’s 3 credited tickets | 18 |

**Tags:** dashboard, refunds, credits

**Parameters:**
TicketQuantity: TwoPerEvent, ThreePerEvent

**Preconditions:**

**Employee and switch**

* Employee permission: **Manage Transactions** (also called **Administer Transactions**).
* Refund permission: **Full Refund** for **Base refund** when refund-type permissions are enabled.
* Global switch: `enable_voucher_refund_limit_fix` = **ON** during the Refund.

**Events and tickets — 1 issuing Event and 7 redemption Events**

* All eight Events belong to the **same Organization**; the redemption Events are published, future, single-date Events.
* Use regular electronic tickets without packages, assigned seats, resale or distributed Inventory.
* Record actual names for Event I and redemption Events A–G. Find their tickets through Dashboard → Build → Events → edit → Tickets.

| Events | Ticket setup | Action during the test |
| --- | --- | --- |
| Event I | One issuing ticket grants 14 uses for TwoPerEvent or 21 for ThreePerEvent | Keep its separate issuing order untouched. |
| Events A, B, C, D, E and F | One credited type per Event; buy 2 or 3 of each | Refund these six credited lines together. |
| Event G | One credited type; buy 2 or 3 | Keep all Event G tickets unrefunded. |
| Event A — additional type | Buy 1 separate $10 paid ticket, excluded from credits | Refund this paid line in the same action as Events A–F’s credited lines. |

* For new preparation, credited tickets are $10 each before the 100% credit; retain and record original prices when selecting historical purchases.
* The paid ticket is a different ticket type from Event A’s credited type, not a separate Event or another credit use.

**Normal Ticket Credit and historical purchase**

* A setup Employee with **Manage Events** opens Dashboard → Promote → Promotions → Ticket credits.
* Configure one normal Ticket Credit: **Limit per item, per user = 2** for TwoPerEvent or **3** for ThreePerEvent.
* Under **Credits issued by**, add Event I and set its issuing ticket’s credit quantity to **14** or **21**, respectively.
* Under **Credits redeemable for**, add Events A–G; enable their credited types and leave Event A’s paid type unselected.
* Save/reopen the assignments. The controlled Customer buys **one issuing ticket**, then verifies the new code under account → Credits → Ticket Credits.
* Before redeeming, verify **Available = 14 / Used = 0** or **Available = 21 / Used = 0**. Keep the normal **100%** ticket-price discount.
* Complete one redemption order containing all seven credited lines and the one paid line; record its reference separately from the issuing purchase.
* This redemption purchase must predate switch enablement. Record the purchase date and enablement time; if suitable history is unavailable, mark that check Blocked.
* Do not change historical prices, voucher percentages or used balances to imitate the required starting state.
* Use independent vouchers/orders for the two TicketQuantity runs and record an untouched second voucher’s opening balance.

**Order at the start of the test**

* One paid redemption order contains **8 lines**: 7 credited Event lines plus 1 excluded paid line at Event A.
* Total tickets: **15** for TwoPerEvent or **22** for ThreePerEvent.
* All tickets are unscanned, unrefunded, and have not been transferred or exchanged.
* Voucher balance: **Available = 0; Used = 14 or 21**. The paid ticket consumed 0 uses.
* The order permits **Base refund → Original payment source**.

**Money and evidence**

* Every credited ticket has a saved Customer total of **$0**, including any Customer-paid tax/fees; the paid ticket remains full price.
* Use an approved saved fee setup with a known nonzero Showpass fee on the paid line; record its fee/tax allocation.
* Record the redemption transaction reference, original charge, discount and each fee class.
* Calculate the selected lines' Base refund, refundable tax, retained/returned fees and Showpass earnings from saved values and the Organization's rules.
* The credited tickets contribute **$0 of ticket-price money** to the Refund. Each selected paid ticket contributes its paid base price under Base refund.
* Have read access to the payment provider's test records and Admin → Financials → Invoice items, searchable by redemption transaction reference.

**Inventory evidence**

* A setup administrator opens Admin → Tickets → Ticket types, finds each credited/paid type and follows **Base inventory**.
* Record **Limit count** (configured stock) and **Remaining count** (tickets left to sell) separately for each type being checked.
* Remaining count must be populated and current; blank or stale values block this proof.
* No unrelated sales or holds may change these ticket counts during the check.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the Customer, open account → Credits → Ticket Credits. | Selected TicketQuantity and code | Available is 0 and Used is 14 or 21. |
| As the Employee, find the original redemption order in Dashboard → Operations → Box Office → Transactions. | Redemption reference; matching date/Event filters | All eight lines and the correct Customer are shown. |
| Select Refund and choose Base refund to Original payment source. |  | The credited and paid ticket lines can be selected. |
| Clear Select all if selected; select the six credited Event A–F lines and Event A’s paid line. | 7 selected lines; 13 or 19 tickets | Event G’s credited line stays unselected. |
| Compare the amount with the independent calculation. | Selected paid line and actual tax/fee treatment | The credited ticket prices contribute $0; the paid line contributes only its permitted return. |
| Select Refund, then Confirm refund once, and wait for completion. |  | All seven selected lines complete in the same Refund action. |
| Immediately reload the Customer’s Credits page. | Selected TicketQuantity | Available is exactly 12 or 18; Used stays 14 or 21. The paid line has restored no extra use. |
| Reopen the redemption order in Transactions and My Orders. | Selected and retained lines | The 12 or 18 credited tickets and one paid ticket are refunded; Event G’s 2 or 3 credited tickets remain usable. |
| Open Admin → Financials → Discounts, find this code and read Per event limit without saving. | Same Voucher Credit | The separate per-Event allowance remains 2 or 3. |
| Reopen each affected type’s Base inventory in Admin → Tickets → Ticket types after Inventory updates complete. | Recorded opening counts | Remaining count rises by 2 or 3 for each credited type at Events A–F and by 1 for Event A’s paid type; Event G and all Limit counts stay unchanged. |
| Inspect the original redemption payment in the test provider and original/Refund Invoice items in Admin → Financials. | Redemption reference; independent money/fee/tax/earnings calculation | One correct money return exists; no credited ticket-price value is paid out or protected fee lost. |
| Reload the untouched second voucher and reopen the issuing order. | Recorded references and opening balance | Both remain unchanged. |

**Postconditions:**

* Preserve the issuing order, retained Event G tickets, mixed redemption order and completed Refund.
* Keep separate vouchers/orders for both TicketQuantity runs. Restore only unrelated setup values; do not Void retained tickets or reset voucher history.

#### TC-03 — Cancel, then refund credited lines successively while keeping the paid ticket

**Title:** Dashboard - Refunds - Restore one use per completed credited-line Refund and leave the paid ticket unchanged

**Description:** Start with one mixed order containing three fully credited tickets and one excluded full-price ticket. Closing Refund restores nothing. Refund Event A’s credited line, then Event B’s credited line; each completed $0 Refund restores one use. Keep the paid ticket and Event C’s credited ticket usable. This selects whole lines, not Custom amount.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Tags:** dashboard, refunds, edge-case

**Preconditions:**

**Employee and switch**

* Employee permission: **Manage Transactions** (also called **Administer Transactions**).
* Refund permission: **Full Refund** for **Base refund** when refund-type permissions are enabled.
* Global switch: `enable_voucher_refund_limit_fix` = **ON** during the Refund.

**Events and tickets — 1 issuing Event and 3 redemption Events**

* All four Events are published, future, single-date Events in the **same Organization**.
* Use regular electronic tickets without packages or assigned seats; record actual Event and ticket-type names.
* Find setup through Dashboard → Build → Events → edit the Event → Tickets.

| Event | Ticket types and quantities | Action during the test |
| --- | --- | --- |
| Event I | 1 issuing ticket grants 3 uses | Keep this separate issuing order untouched. |
| Event A | 1 credited $10 ticket | Open/close Refund without submitting, then refund this credited line only. |
| Event B | 1 credited $10 ticket | Refund this credited line in a second action. |
| Event C | 1 credited $10 ticket | Keep unrefunded. |
| Event A — additional type | 1 different $10 paid ticket, excluded from credits | Keep paid and unrefunded through both actions. |

**Normal Ticket Credit — prepare before the redemption order**

* A setup Employee with **Manage Events** can open Dashboard → Promote → Promotions → Ticket credits for this Organization.
* Create a Ticket Credit, enter its name and set **Limit per item, per user** to **1**; save.
* Under **Credits issued by**, use **Add issuing event** to select Event I; set the issuing ticket's credit quantity to **3**.
* Under **Credits redeemable for**, add Events A, B and C; enable only their **credited ticket** types. Leave every **paid ticket** type unselected.
* Save and reopen the assignments to verify the quantities and eligible ticket types.
* As the controlled Customer, buy **one issuing ticket at Event I** using the approved test payment method.
* Open Customer account → Credits → Ticket Credits. Record the resulting code and issuing-order reference; this code is the Customer's voucher.

| Required voucher state before redeeming | Value |
| --- | --- |
| Ticket-price discount | Normal **100%** Ticket Credit |
| Available | 3 |
| Used | 0 |
| Per-Event allowance | 1 |
| Paid ticket eligibility | Excluded; consumes **0** uses |

* Keep the issuing order separate and untouched. Do not change any voucher percentage or reset used balances in Admin.

**Order at the start of the test**

* Complete **one mixed redemption order** containing all 3 credited tickets and the excluded paid ticket: **4 tickets on 4 lines**.
* All 4 tickets are unscanned, unrefunded, and have not been transferred or exchanged.
* Voucher balance: **Available = 0; Used = 3**.
* The order permits **Base refund → Original payment source**.
* Each selected credited line has **$0** money due for return. Keep the paid line unselected during both Refunds.

**Money and evidence**

* Every credited ticket has a saved Customer total of **$0**, including any Customer-paid tax/fees; the paid ticket keeps its original full price.
* Record the redemption transaction reference, original charge, each line's discount, taxes, fees and Showpass earnings.
* The two selected credited lines each have an expected **$0 money return**; the paid line remains untouched.
* Have read access to the payment provider's test records and Admin → Financials → Invoice items, searchable by redemption transaction reference.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the Customer, open account → Credits → Ticket Credits. | Prepared code | Available is 0 and Used is 3. |
| As the Employee, find the mixed redemption order in Dashboard → Operations → Box Office → Transactions. | Redemption reference; matching filters | All three credited lines and the full-price paid line are shown. |
| Open Refund, choose Base refund to Original payment source and select only Event A’s credited line. | Exclude Event A’s separate paid type | Exactly one credited ticket is selected; its money return is $0. |
| Select Close before submitting. |  | No Refund is requested. |
| Reload the redemption order and Customer’s Credits page. | Original references | All four tickets remain usable; no Refund exists and Available stays 0. |
| Reopen Refund, choose Base refund to Original payment source and select only Event A’s credited line. | Expected money return: $0 | The paid line and Events B/C stay unselected. |
| Select Refund, then Confirm refund once, and wait for completion. |  | Only Event A’s credited ticket is refunded; no Customer money is returned. |
| Reload Credits. | Same code | Available is 1 and Used remains 3. |
| Reopen the same order’s Refund dialog and choose Base refund. | Event A’s credited line | The already-refunded credited line cannot be selected for Base refund again. |
| Select only Event B’s credited line and choose Original payment source. | Expected money return: $0 | Event A’s credited line, Event C and the paid ticket are excluded. |
| Select Refund, then Confirm refund once, and wait for completion. |  | Only Event B’s credited ticket receives the second $0 Refund. |
| Reload Credits and reopen the redemption order in Transactions and My Orders. | Original references | Available is 2 and Used remains 3; Event C’s credited ticket and Event A’s paid ticket remain usable. |
| Inspect the original payment in the test provider and the redemption/Refund Invoice items in Admin → Financials. | Original charge and two expected $0 returns | Two intended $0 Refund records exist; no payment refund or money credit was issued, and the paid line’s charge, fees and tax remain unchanged. |
| Reopen the issuing order. | Its separate reference | The original credit-issuing purchase is unchanged. |

**Postconditions:**

* Preserve both $0 Refunds, the issuing order, the retained credited ticket and the paid ticket.
* Do not refund the paid ticket as cleanup or reset voucher usage; restore only unrelated setup values changed for the run.

#### TC-04 — Overlapping mixed-order Refunds sharing one voucher

**Title:** Dashboard - Refunds - Keep both restored quantities when Employees refund mixed orders sharing a voucher

**Description:** Two Employees refund separate mixed orders using the same normal 100% Ticket Credit. One order has two credited tickets plus one paid ticket; the other has three credited tickets plus one paid ticket. Restore exactly five uses and the permitted paid-line money. Keep a third mixed order untouched.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |
| WebPublic | Desktop |

**Tags:** dashboard, refunds, edge-case

**Preconditions:**

**Employees and switch**

* Use two Employees in independent signed-in sessions for the same Organization.
* Each needs **Manage Transactions** (also called **Administer Transactions**).
* Each needs **Full Refund** permission for **Base refund** when refund-type permissions are enabled.
* Global switch: `enable_voucher_refund_limit_fix` = **ON**.

**Events and tickets — 1 issuing Event and 3 redemption Events**

* All four Events are published, future, single-date Events in the **same Organization**.
* Each redemption Event has **two different regular ticket types**: one eligible for credits and one excluded paid type.
* For new preparation, each ticket costs $10 before credit/fees/tax; preserve original prices on existing orders.
* Use electronic tickets without packages, assigned seats, resale or distributed Inventory.
* Find setup through Dashboard → Build → Events → edit → Tickets; record actual Event/type names and order references.

| Event | Separate order | Credited tickets | Excluded paid tickets | Action |
| --- | --- | --- | --- | --- |
| Event I | Issuing order | Issues 6 uses when 1 issuing ticket is bought | Not a redemption order | Keep untouched. |
| Event A | Order A | 2 on one line | 1 on another line | Employee A refunds both lines: 3 tickets. |
| Event B | Order B | 3 on one line | 1 on another line | Employee B refunds both lines: 4 tickets. |
| Event C | Order C | 1 on one line | 1 on another line | Keep both lines untouched: 2 tickets. |

**Normal Ticket Credit — prepare before the redemption order**

* A setup Employee with **Manage Events** can open Dashboard → Promote → Promotions → Ticket credits for this Organization.
* Create a Ticket Credit, enter its name and set **Limit per item, per user** to **3**; save.
* Under **Credits issued by**, use **Add issuing event** to select Event I; set the issuing ticket's credit quantity to **6**.
* Under **Credits redeemable for**, add Events A, B and C; enable only their **credited ticket** types. Leave every **paid ticket** type unselected.
* Save and reopen the assignments to verify the quantities and eligible ticket types.
* As the controlled Customer, buy **one issuing ticket at Event I** using the approved test payment method.
* Open Customer account → Credits → Ticket Credits. Record the resulting code and issuing-order reference; this code is the Customer's voucher.

| Required voucher state before redeeming | Value |
| --- | --- |
| Ticket-price discount | Normal **100%** Ticket Credit |
| Available | 6 |
| Used | 0 |
| Per-Event allowance | 3 |
| Paid ticket eligibility | Excluded; consumes **0** uses |

* Keep the issuing order separate and untouched. Do not change any voucher percentage or reset used balances in Admin.

**Orders at the start of the test**

* Complete **three separate mixed redemption orders** for the same controlled Customer, all using **the exact same code**.
* The three orders contain **6 credited tickets and 3 paid tickets** in total; all 9 are unscanned, unrefunded and not transferred/exchanged.
* Voucher balance: **Available = 0; Used = 6**. None of the three paid tickets consumed a use.
* Orders A and B permit **Base refund → Original payment source**; Order C stays untouched.
* Agree a countdown for both Employees to confirm their different Refunds together.
* No other activity may use this code during the check.

**Money and evidence**

* Every credited ticket has a saved Customer total of **$0**, including any Customer-paid tax/fees; the paid ticket remains full price.
* Use an approved saved fee setup with a known nonzero Showpass fee on the paid line; record its fee/tax allocation.
* Record the redemption transaction reference, original charge, discount and each fee class.
* Calculate the selected lines' Base refund, refundable tax, retained/returned fees and Showpass earnings from saved values and the Organization's rules.
* The credited tickets contribute **$0 of ticket-price money** to the Refund. Each selected paid ticket contributes its paid base price under Base refund.
* Have read access to the payment provider's test records and Admin → Financials → Invoice items, searchable by redemption transaction reference.

**Inventory evidence**

* A setup administrator opens Admin → Tickets → Ticket types, finds each credited/paid type and follows **Base inventory**.
* Record **Limit count** (configured stock) and **Remaining count** (tickets left to sell) separately for each type being checked.
* Remaining count must be populated and current; blank or stale values block this proof.
* No unrelated sales or holds may change these ticket counts during the check.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the Customer, open account → Credits → Ticket Credits. | Shared code | Available is 0 and Used is 6. |
| Employee A finds redemption Order A and Employee B finds redemption Order B in Dashboard → Operations → Box Office → Transactions. | Independent sessions; recorded references | Each sees their intended order with one credited line and one excluded paid line. |
| Each opens Refund, chooses Base refund to Original payment source and selects both lines in their order. | A: 2 credited + 1 paid; B: 3 credited + 1 paid | Each preview matches its independent money/fee calculation; only the paid line contributes paid ticket-price money. |
| Each selects Refund to reach confirmation. |  | Both confirmations are ready and neither Refund has completed. |
| On the countdown, both Employees select Confirm refund once. | Different orders A and B | Both Refunds complete without an unexpected failure or lost result. |
| After both complete, immediately reload Credits. | Same code | Available is exactly 5 and Used stays 6; paid tickets added no extra uses. |
| Reopen redemption Orders A, B and C in Transactions and My Orders. | All original references | A’s 3 and B’s 4 tickets are refunded; C’s one credited ticket and one paid ticket remain usable. |
| Reopen each type’s Base inventory in Admin → Tickets → Ticket types after Inventory updates finish. | Opening counts per type | A’s credited Remaining count rises by 2 and paid by 1; B’s credited rises by 3 and paid by 1. Both C types and all Limit counts stay unchanged. |
| Inspect each redemption payment in the test provider and its Invoice items in Admin → Financials. | Independent expected amounts, fees, taxes and earnings | One correct money return exists for A and one for B; C is unchanged and credited ticket prices cause no extra payout. |
| Reopen the separate issuing order. | Issuing reference | Its ticket, payment and credit-issuing history are unchanged. |

**Postconditions:**

* Preserve all issuing/redemption orders, both Refunds, final balance and completion times. If confirmations finished one after another, record that they did not overlap.
* Keep both Order C tickets untouched. Restore only unrelated setup values; do not reset the voucher or delete financial history.

### Customer account → My Orders → Return free tickets

#### TC-05 — Customer returns selected fully voucher-funded tickets

**Title:** Web Public - Refunds - Restore voucher uses after returning selected free tickets

**Description:** A Customer returns two of three free tickets bought with a 100% Ticket Credit voucher. The selected tickets belong to different Events. Their two uses become available again; the third ticket remains usable and no cash or Organizer Credits are issued.

| Platform | View |
| --- | --- |
| WebPublic | Desktop |

**Tags:** public, refunds, credits

**Preconditions:**

**Customer, switch and free-return setting**

* Use one controlled Customer who owns the order and voucher and can sign in to My Orders and Credits.
* No Employee permission is needed for the Customer to return their own tickets.
* Global switch: `enable_voucher_refund_limit_fix` = **ON**.
* A setup administrator with permission to change Venues opens Admin → Venues and finds the selected Organization by name.
* Record **Allow free return**, then set it **ON** if required. This is a saved Venue setting, separate from Customer Self Refund Settings.
* Record **Automated return window** in hours; each Event must start later than this many hours from the test.

**Events and tickets — 3 separate Events**

* All three Events are published, future, single-date Events owned by the **same Organization**.
* Each supplies **one regular admission ticket type**, eligible for the same voucher.
* Use electronic tickets without packages, assigned seats, resale or distributed Inventory.
* Find the ticket setup through Dashboard → Build → Events → edit the Event → Tickets and record the actual Event names.

| Event | Tickets in the order | Action during the test |
| --- | --- | --- |
| Event A | 1 ticket | Return this ticket. |
| Event B | 1 ticket | Return this ticket together with Event A's ticket. |
| Event C | 1 ticket | Keep this ticket. |

**Voucher and $0 purchase**

* Find the Customer's active **Voucher Credit** in Admin → Financials → Discounts by Customer email.

| Voucher setting before purchase | Required value |
| --- | --- |
| Owner | The controlled Customer |
| Limit | 3 total uses |
| Percentage | 100% off each ticket |
| Per event limit | 1 use per Event |
| Eligible tickets | The regular ticket at Events A, B and C |

* For new preparation, use an unused owned voucher; save and reopen these values before purchase.
* Retain its generating voucher relationship; do not reset purchased uses.
* Buy **one ticket at each Event in one completed order** using this voucher.
* The actual saved fee/tax setup must leave **no Customer payment**: order total **$0**. Do not treat a paid order as a free-return order.

**Order at the start of the test**

* All 3 tickets are unscanned, unrefunded, and have not been transferred or exchanged.
* Under a Customer-activation requirement, the tickets have not been activated.
* **Return free tickets** is offered on this order in My Orders.
* Voucher balance: **Available = 0; Used = 3**.
* Record other vouchers' Available balances and the Customer's Organizer Credits and Universal Credits balances.
* Keep this order separate from paid Refund cases.

**Inventory evidence**

* A setup administrator opens Admin → Tickets → Ticket types, finds each Event/ticket and follows **Base inventory**.
* Record **Limit count** (configured stock) and **Remaining count** (tickets left to sell) for all three Events.
* Remaining count must be populated and current; blank or stale values block the Inventory check.
* No other purchases or holds may change these ticket counts during the check.

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Customer account → Credits → Ticket Credits and find the voucher. | Prepared voucher | Available is 0 and Used is 3. |
| Open My Orders and open the prepared $0 order. | Purchase reference | The three intended tickets are shown. |
| Open the order's options and select Return free tickets. | | The Return items dialog opens. |
| Select only the tickets at Events A and B. | 2 tickets across 2 Events | The selection shows exactly two items; Event C is excluded. |
| Select Continue. | | Confirm return lists only the two selected tickets. |
| Choose a displayed Reason for return and select Confirm once. | Record the selected reason | The return completes successfully. |
| Select Done, then immediately reload Credits. | Same voucher | Available is 2 and Used remains 3. |
| Reopen the original order in My Orders. | All three tickets | Only the two returned tickets are unavailable for admission; Event C’s ticket remains usable. |
| Reopen Return free tickets and inspect the eligible selections without submitting. | Same order | The two returned tickets cannot be selected for another return. |
| Close the dialog and reload Credits. | Recorded money-credit and other voucher balances | No money credit is added and other vouchers stay unchanged. |
| Have the setup administrator reopen each ticket's Base inventory in Admin → Tickets → Ticket types. | Opening counts; after the queued Inventory updates finish | Remaining count rises by 1 at each returned Event and stays unchanged at Event C; all Limit count values stay unchanged. |

**Postconditions:**

* Preserve the order, return evidence, two restored uses and retained third ticket. Do not reset the voucher or delete purchase/return records.
* The setup administrator restores Allow free return to its recorded value if changed for this run and reopens the Venue to verify restoration.

## Source review and changed behavior

### Exact comparison

| Source | Reviewed revision / boundary |
| --- | --- |
| Supplied backend commit | `7500b306af5749a9506e7a486c45aed819b924cb`, message “Merged in SPD-2874-voucher-refund-limits (pull request #12348)”. Locally this commit has one parent, so the exact reviewed change is parent `d0d36b8fae0e2d94fed6407869c3bc37afb02aeb` → supplied commit. No base branch was guessed. |
| Current backend | `develop`, `f9a5c258f3babb13675544fa06ab4117bc222000`; relevant current restoration code checked against the supplied change. |
| Current frontend | `codex/fix-city-search-clear-selection`, `c44b4130ddeea650269415fa6ea1f92b73022446`; pre-existing discovery-component edits are unrelated and were left untouched. This is navigation/caller evidence, not a matching deployed feature branch. |
| Playwright reference | `6547798389ca868f654ff3d866f02a353698f546`; `tests/core/ticket-credits/ticket-credits.test.ts` has existing checkout-journey setup. No assertion from this review establishes the multi-line Refund protection. |
| Live environment | Unknown; no open Codex in-app browser. No purchases, Refunds, returns, switches or records changed. |

The commit changes only `apps/core/flags.py`, `apps/financials/payments/refunders/base.py`, and adds `apps/financials/tests/payments/refunders/test_voucher_limit_restoration.py`. It adds no UI fields, APIs, permissions or migrations.

**Manual setup revision:** TC-01–TC-04 use normal 100% Ticket Credits plus excluded paid tickets. The existing backend API-test definitions prepare partial-discount vouchers in code; they do not prove these revised mixed orders were created or passed. TC-03 selects only $0 credited lines while retaining the paid line; current `BaseRefunder` allows first-time $0 Refunds and `CreditRefunder` skips a zero-amount card refund.

**What changes with the switch ON:** refunded order lines sharing a Voucher Credit are grouped by voucher; their applied uses are summed and added to a fresh locked voucher record. Vouchers are locked in ID order. A finite saved allowance is increased; an unlimited allowance is left unlimited. The Customer balance cache is cleared only after the transaction commits. With the switch OFF, the old per-line update and cached-balance behavior remain.

**What the Customer should see:** Available rises by the completed restored quantity. Used remains the historical completed-use count. The internal Limit also rises; it must not be mistaken for remaining Available uses. The per-Event allowance is unchanged, so reuse checks deliberately choose eligible Events with unused allowance. Restoration does not promise repeat booking of the original Event.

**Which callers matter:** the Employee invoice Refund endpoint queues `InvoiceRefundExecutionService`, then uses payment-specific refunders inheriting `BaseRefunder`. Restoration runs when both payment reversal and refund-invoice creation are enabled. Current card/Square paths can defer finalization; the final job/provider result matters, not initial acceptance. Customer free-return routing sends voucher-backed tickets through refunders, processing selected lines separately. Customer paid self-returns can also reach the same helper. Internal Exchange calculations with payment reversal disabled do not qualify merely because they use a refunder. Dashboard Void uses `BaseVoider`; voucher uses are excluded from ordinary usage reconciliation.

### Supporting files and handbook sections

Repository roots: [[01 Repositories/Backend - web-app|backend]] `/Users/christianvaldez/Documents/Showpass/repos/web-app`; [[01 Repositories/Frontend - showpass-frontend|frontend]] `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`. Paths below are relative to those roots.

| Evidence | Files / selected guidance |
| --- | --- |
| Restoration, display and limits | Backend `apps/financials/payments/refunders/base.py:573,1720`; `apps/financials/caching/keys.py`; `apps/financials/models/discount_management/discounts.py` (`generate_credits`, `get_quantity_used`); user discount serializer/viewset; `apps/tickets/api/serializers/general.py:get_ticket_type_ids_permitted_for_discount,get_discountable_groups` for excluding paid types. Zero-amount payment handling: `apps/financials/payments/refunders/credits.py:perform_refund`. |
| Employee request and final execution | Backend `apps/financials/api/venue_based/viewsets/invoices.py`; `apps/financials/services/invoice/async_execution.py`; `apps/financials/tasks/refunds.py`; refund constants and `apps/venues/constants/employment.py`. |
| Free/paid Customer returns and exclusions | Backend `apps/financials/services/invoice/user_free_return.py`; `free_return/free_return_controller.py`; `free_return/free_returns_service.py`; `user_invoice_return.py`; `apps/financials/models/invoice_management/invoice.py:get_partial_return_refunders`; `apps/financials/services/discounts/discount_usage_adjustment_service.py`. |
| Supported Admin proof/setup | Backend `apps/financials/admin/discounts.py`; `apps/financials/admin/forms/discounts.py`; `apps/financials/admin/invoices.py:61`. Invoice items exposes separate fee, tax, final-amount and amount-company-earned values. Inventory proof: `apps/tickets/admin/ticket_types.py`, `apps/tickets/admin/inventory.py`, `apps/tickets/models/inventory_management/inventory_venue.py` and `apps/tickets/models/event_management/event_ticket_types.py`; the maintained Remaining count can require a post-commit update. Frontend `features/events/ticket-types/list/EventTicketTypesTable.web.tsx` documents the Sold statistic’s 15-minute refresh. An Invoice item ID is an order line, not an Invoice ID. |
| Current visible navigation | Frontend `packages/core/src/app-contexts/dashboard/components/navigation/DashboardNavBarUserMenu/hooks/route-sections/operations-routes.ts`; user `features/account/hooks/useAccountNavItems.ts`. Backend old-shell reference `apps/main/templates/navigation/dashboard/side-menu.html`. |
| Employee controls and job completion | Frontend Dashboard `features/transactions/ui/components/TransactionActions/TransactionActions.web.tsx`, `modals/RefundDialog/{RefundDialog,RefundForm,RefundConfirmation,InvoiceItemsList}.web.tsx`; `ui/hooks/useRefundDialog.ts`; `shared/repositories/invoice/VenueBasedInvoiceRepository.ts`. |
| Normal Ticket Credit preparation | Frontend Dashboard `components/navigation/DashboardNavBarUserMenu/hooks/route-sections/promote-routes.ts`; `features/ticket-credits/ui/components/TicketCreditDefinitionForm.web.tsx`, `TicketCreditAssignmentsEditor.web.tsx`, issuing/redemption Events tables. These expose issuing quantities and redemption ticket-type selection, not a percentage control. |
| Customer controls and balances | Frontend user `features/account/features/credits/ui/components/{CreditList,TicketCreditsContainer}.web.tsx`; My Orders `ui/components/OrderOptionsList.web.tsx`; `components/ReturnFreeTicketsModal` selection and confirmation components. |
| Canonical workflow | [[00 Start Here/World-Class Software Quality Standard]]; [[06 Prompts/Showpass QA Test Case Generator]]; [[05 Tooling/Qase Test Case Writing Rules]]; [[05 Tooling/qasectl]]; [[03 Test Cases/Test Cases by Feature#Dashboard UI Organization]]. |
| Applied handbook sections | [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup\|actors, permissions and safe setup]]; [[00 Start Here/Showpass QA Handbook/Playbooks/06 Discounts and Ticket Credits\|issue/use/restore distinct from money credit]]; [[00 Start Here/Showpass QA Handbook/Playbooks/08 Refunds Voids and Exchanges\|selected versus retained tickets and money]]; [[00 Start Here/Showpass QA Handbook/03 Evidence and Expected Results\|independent amounts]]; [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes#5. Put failures at the business boundary\|failure boundaries]] and [[00 Start Here/Showpass QA Handbook/13 Senior QA Integration Passes#6. Test competing actions with exact ownership\|overlapping actions]]; [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage\|applicable final-order, admission and financial effects]]. |

## Proof targets and coverage decisions

All case mappings below are **planned manual coverage, not executed results**. Backend tests are existing definitions read in source; neither their current run nor CI status was checked. No Qase coverage assessment is claimed.

| Item / proof target | Risk | Coverage decision | Evidence / remaining check |
| --- | --- | --- | --- |
| Clean Refund of one credited line plus one paid line | Basic restoration or mixed-line separation stops working | Manual-only: TC-01 | Refund both lines: restore 3 uses, never 4; verify the paid-line money return. |
| Exhausted balance viewed before Refund; fresh read after completion | Customer keeps seeing zero for the 600-second cache lifetime | Manual-only: TC-01–TC-04 | Added backend `test_refund__warm_customer_balance__shows_restored_credits` definition; run status unknown. |
| Add all six returned credited Event lines plus exclude the paid line from restored uses | Only one line's uses come back | Manual-only: both TC-02 values | Added `test_refund__six_invoice_lines__restores_all_credits_and_preserves_retained_game` definition uses both reported quantities. The manual setup now adds a separate excluded paid line and uses normal 100% credits; the automated definition is not an executed proof of that mixed setup. |
| Existing order after enablement | Rollout works only for new purchases | Manual-only: TC-02 | Needs recorded purchase before enablement; unavailable history is Blocked, not an assumed pass. |
| Retained ticket/other voucher, per-Event limit | Restoration changes unrelated rights or removes restrictions | Manual-only: TC-01–TC-05 as specified | Current helper groups by voucher ID and leaves per_event_limit unchanged. |
| Spend restored uses; reject the next use | Balance display is right but actual allowance is wrong | Manual-only: TC-01 | Complete a new mixed redemption purchase with 3 credited tickets and 1 excluded paid ticket; leave the exhausted extra attempt unpaid. |
| Cancel before submission | Merely opening Refund restores rights | Manual-only: TC-03 | Fresh order/balance read after Close. |
| Successive Refunds and already-refunded line | Uses or money restored twice | Manual-only: TC-03 | UI selection restriction plus two completed $0 Refund records; paid line and provider charge stay unchanged. Does not prove duplicate callbacks. |
| Two Refunds sharing a voucher | One Employee's update overwrites the other | Manual-only: TC-04; deterministic lock proof Deferred to backend run | Added `test_restore__competing_limit_update__waits_and_uses_committed_limit` uses a locked competing allowance update. Manual timing cannot prove the same interleaving. |
| Completed free-ticket return | Customer loses voucher rights after self-return | Manual-only: TC-05 | Current free-return controller and per-line refunders; not proof of the Employee aggregation bug. |
| Refund money, fees/tax, earnings and Inventory | Correct-looking uses conceal incorrect money or admission rights | Manual-only: paid-case financial steps and retained-ticket checks | Provider result, original/adjustment Invoice items and fresh Base inventory counts required. The Tickets table’s Sold statistic can lag by 15 minutes and is not immediate stock proof. Missing breakdown/access is Blocked. TC-03 proves two credited-line $0 Refunds leave the paid line unchanged; TC-05 remains the separate Customer free-return path. |
| Server failure after restoration, before commit | Failed Refund grants uses or refreshes a balance that should not change | Deferred to backend execution | Added `test_restore__outer_transaction_rolls_back__preserves_limit_and_cached_balance` checks allowance, cache and ticket rollback. No safe manual failure control is exposed; browser interruption is insufficient. |
| Global switch OFF | New behavior leaks into disabled rollout | Deferred: existing backend definition | `test_restore__switch_disabled__preserves_legacy_limit_and_cache_behavior`; legacy wrong multi-line result is documented by that test, not the desired ON expectation. No manual global toggling in this scope. |
| Unlimited allowance, missing voucher, zero applied uses, non-voucher discount | Guard branches add uses incorrectly or crash | Deferred to focused backend assertions | New helper guards these paths; the added test file does not establish all their execution. Not separate base manual cases. |
| Partial ticket quantity within one order line / Custom amount | Restored uses may differ from selected ticket count | Deferred; expected quantity needs separate source/product review | Helper sums the selected line's purchased groups. These cases deliberately refund complete lines and do not claim per-ticket proration coverage. |
| Customer paid self-refund | Unchanged consumer reaches the shared helper with policy-specific choices | Deferred manual variant | `UserInvoiceReturnService` uses full or per-line refunders; requires its own policy/destination setup. TC-05 covers free return only. |
| Electron/mobile Employee clients, legacy Dashboard and originating sales clients | Shared backend change affects clients with unchanged files | Deferred client validation | Invoice Refund API is shared. Current Dashboard caller traced; exact native/legacy controls and builds not verified. Do not add unsupported Platform rows or infer native success from Dashboard. |
| Delayed provider completion, repeated jobs/callbacks and retries | Early/double restoration or duplicate money return | Deferred integration proof | Current BaseRefunder/provider finalization paths are affected consumers; require controlled provider/worker setup and final balance/payment evidence. A completed manual action does not cover replays. |
| Dashboard Void; internal calculation-only Exchange | Wrongly expect uses restored by another action | Not applicable to this switch's restoration cases | `BaseVoider` is separate; internal Exchange disables payment reversal. Do not substitute either for Refund. Broader actual Exchange behavior is outside this focused request. |
| Item/rate-card create/edit validation; price-boundary changes | Unrelated setup changes expand the task | Deferred broader regression | Diff adds no item/pricing form or rate-card change. Use known saved prices/fee rules for the selected purchases; these cases do not certify those editors. |
| Oversell contention, physical devices, packages, shipping, installments, external fulfillment and report exports | Unrelated lifecycle combinations overwhelm a focused pack | Deferred / not selected | Select regular unscanned electronic tickets without these features for this pack; do not interpret their omission as tested coverage. Inventory and saved financial records remain required within the selected cases. |
| Cleanup | Test preparation alters shared settings or erases history | Manual-only: each case's Postconditions | Restore only recorded owned setup values; preserve orders, Refunds/returns and earned usage. No cleanup was needed during drafting. |

## Minimum execution set and remaining work

Run **TC-01; TC-02 TwoPerEvent; TC-02 ThreePerEvent; TC-03; TC-04; TC-05**: six runs across five case definitions. Prioritize TC-02 first for the original lost-uses risk, then TC-01 for immediate visibility and actual reuse. Both TC-02 quantities remain part of the selected set; this is not a full settings/payment/client matrix.

Before execution, establish the deployed revision, saved ON state, approved payment/test-data scope, actual issued normal codes and mixed redemption orders (including historical data for TC-02), exact fee/tax/earnings expectations, provider/Admin read access and Inventory update completion/evidence. If required setup or final evidence is unavailable, record the affected assertion Blocked. No release decision is supported by this drafting task.

Keep exact lock timing, rollback and replay checks at the backend/integration layer. Reuse the added `test_voucher_limit_restoration.py` definitions and existing Ticket Credit checkout setup before adding automation; the existing definitions have not been run here. No source changes, CI jobs, Jira reads/writes, or Qase reads/writes were performed.

**Copy-to-Qase review:** each case has its own Title, Description, Platform/View table, permissions, flag, data, Steps, Tags and Postconditions. Preconditions are split into short setup sections with per-case Event/ticket tables, voucher values and the exact starting order. Event letters are local labels; record the actual Event names. TC-01–TC-04 now explicitly separate Event I’s issuing purchase from the mixed redemption orders, and identify credited versus excluded paid ticket types. TC-05 remains a $0 free return. No percentage edits or newly executed purchases are claimed. TC-02 has one mapped Single parameter with two values; other cases have no artificial parameters. Titles and execution fields contain no local TC labels or Jira references. Suite IDs and duplicate status remain unknown because Qase access was explicitly excluded. Static Markdown/field review only; no Obsidian UI rendering was performed.

---

<a id="tc01-beta-preparation-2026-11-10"></a>
## TC-01 beta preparation and basket smoke — 2026-11-10

**What worked:** Four future, single-date Events are live in **1786-Anime, Venue ID 1786**. The saved Ticket Credit issues three uses and selects only A/B/C's credited admissions. All six ticket types reached checkout in four basket checks, survived refresh and were removed afterward.

**Confirmed bugs:** None in the executed creation, assignment and basket checks. The legacy Angular creation page previously reached under 1859 was not itself evidence of a defect; the user switched to 1786, whose current creation form was used successfully.

**What remains unverified:** No issuing purchase, Customer voucher, original mixed order, credited $0 fee outcome, Refund, restored-use purchase or exhausted-code attempt was executed. This is prepared Event/configuration data plus basket smoke, **not a passing run of the Refund case or a release decision**.

<a id="tc01-continuation-handoff"></a>
### Continuation handoff — these Events exist; what happens next?

Copy the block below into the chat handling the next part. It describes the verified state on **2026-11-10**, not a fresh inspection. Creating this handoff did not run another browser check or authorize a purchase/Refund.

```text
Continue TC-01: “Dashboard - Refunds - Restore voucher uses from a mixed order and spend them again.” These Events already exist. Read the case and preparation report, reuse the saved records, and tell me the first unfinished step and exactly how to do it.

Canonical case, run results and screenshots:
/Users/christianvaldez/Documents/Showpass/repos/Showpass QA Vault/03 Test Cases/Transactions/enable-voucher-refund-limit-fix-test-cases.md
Use the original TC-01 case near the top; the preparation report's TC-01–TC-07 IDs are separate smoke-check labels.

Environment: beta.showpass.com.
Venue ID: 1786. Dashboard Organization: 1786-Anime, under 2218-chris-parent-org. Use 1786, not the earlier Venue 1859.

Created Events — all Live / Selling now as last verified on 2026-11-10:
I: TC01 Credit Refund I - Three Use Pass - Nov 2026
https://beta.showpass.com/manage/events/tc01-credit-refund-i-three-use-pass-nov-2026/overview/
Nov 24, 2026, 7–8 PM EST. Three Use Credit Pass (Ticket type ID 1629355).

A: TC01 Credit Refund A - Original Mixed Order - Nov 2026
https://beta.showpass.com/manage/events/tc01-credit-refund-a-original-mixed-order-nov-2026/overview/
Nov 25, 2026, 7–8 PM EST. A Credited Admission (1629356) and A Paid Admission - No Credit (1629357).

B: TC01 Credit Refund B - Reuse Mixed Order - Nov 2026
https://beta.showpass.com/manage/events/tc01-credit-refund-b-reuse-mixed-order-nov-2026/overview/
Nov 26, 2026, 7–8 PM EST. B Credited Admission (1629358) and B Paid Admission - No Credit (1629359).

C: TC01 Credit Refund C - Exhaustion Check - Nov 2026
https://beta.showpass.com/manage/events/tc01-credit-refund-c-exhaustion-check-nov-2026/overview/
Nov 27, 2026, 7–8 PM EST. C Credited Admission (1629360).

All six ticket types: CAD 10 base price, inventory 20 each, Public, regular electronic tickets. Event timezone America/Toronto; saved Location chris-professional-tier-1786 in Calgary. No Packages or assigned seats.

Ticket Credit definition ID 280992:
https://beta.showpass.com/manage/ticket-credits/280992/
Name: TC01 Credit Refund - Three Uses - Nov 2026.
Saved limit per item, per user: 3. One I pass issues 3 uses. Only the credited admissions in A/B/C are enabled for redemption; both paid admissions are excluded. Assignments survived reload. This is a definition, NOT an actual Customer-issued code.

Already tested: actual checkout Review lines persisted after refresh for I ×1; A credited ×3 + paid ×1; B credited ×3 + paid ×1; C credited ×1. Every test line was removed and each empty basket verified after refresh. No voucher was applied. No confirmed bugs in those checks. Last visible stock: I 20, A 40, B 40, C 20.

User-confirmed readiness for 1786: global enable_voucher_refund_limit_fix ON; Ticket Credits and required employee permissions ready; approved test payment/fee setup ready. Treat these as user confirmations, not Admin-verified values. Reuse them unless the Venue, relevant setup or task conditions have changed.

Not prepared/executed: no issuing purchase, Customer code, comparison voucher baseline, original A purchase, Refund, B reuse purchase or C exhausted-code attempt from this run. Customer identity for the financial test and specific payment authorization still need establishing. Customer/Invoice/transaction/code IDs are therefore not available from this run.

Next missing prerequisite: one controlled Customer must buy ONE I pass, receive 3 uses, and then complete A's mixed purchase using that same code. Before any purchase, obtain only the missing controlled-Customer/payment details and explicit transaction authorization, including the approved amount or spending limit. Do not ask me to reconfirm the same three readiness answers without a relevant change.

The A basket must fully cover all 3 credited tickets INCLUDING their Customer-paid fees/tax and leave the separate paid admission full price. If this cannot be proved from the actual code and saved totals, stop and report the exact gap; do not change shared fees, flags or balances. Keep the I issuing order untouched and establish an untouched comparison voucher before the Refund test.

No Admin access, including read-only pages or Admin-only APIs. No new Events, recreation, merging, cancellation or deletion is needed for continuation. A future minimum-Event design review does not authorize changing these existing records. Purchases and Refunds have NOT been authorized by this handoff. A request for “what next?” means explain the next step, not execute financial actions.

After the original A order exists, continue with the original TC-01 steps: balance 0 Available / 3 Used; approved full mixed-order Refund; immediate restoration to exactly 3 Available; approved B mixed purchase with the same code; then C's unpaid exhausted-code attempt. Keep payment/fee evidence separate from basket smoke. The case's Admin financial-evidence check remains blocked unless I separately permit access or suitable authorized evidence is available; do not claim full financial verification from Dashboard totals alone.

Start your reply with: what is already done, the first missing prerequisite, and one concrete next action with its screen, exact ticket/quantity, expected result and stop point. Separate steps I can perform from actions you are authorized to execute. Update this same note with new evidence instead of creating a competing report.
```

**First next action, when continuing manually:** Establish the controlled Customer and approved test-payment scope. Then open **Event I → BUY TICKETS**, select **1 Three Use Credit Pass**, and open checkout Review. The previous uncredited preview was CAD 15.26, but check the fresh total before committing; the saved base price is CAD 10. **Stop before submitting payment until the specific purchase is authorized.** After an approved completed purchase, Customer account → **Credits → Ticket Credits** must show the resulting code with **Available 3 / Used 0**. Keep the code private; record the issuing transaction reference in this note.

### Run setup and permission boundary

- **Environment:** beta.showpass.com, 2026-11-10; deployed revision unknown. Codex in-app browser, desktop view, signed in as Christian Valdez. No desktop app/browser was controlled.
- **Organization:** User switched from 1859 to **1786** and explicitly confirmed all three readiness prerequisites for 1786. The Organization selector showed **2218-chris-parent-org → 1786-Anime**. Public Event pages also showed 1786-Anime.
- **User-confirmed readiness:** Global `enable_voucher_refund_limit_fix` ON; Ticket Credits and needed employee permissions enabled; approved payment/fee setup ready. These confirmations were not independently verified through Admin. Successful Event and credit saves additionally demonstrated access to those specific Dashboard actions.
- **Allowed changes:** Create this case's Events, tickets and credit definition; make unpaid basket reservations and remove them. **No Admin access**. No shared flag, gateway, fee-rule or Organization setting changes. No payments, orders, Refunds, messages, Jira or Qase writes.
- **Finishing point:** Saved relationships, refreshed checkout lines and restored empty basket. Existing basket checked first and was empty. No user basket items needed preservation.
- **Saved defaults:** Existing Location **chris-professional-tier-1786**, 8500 Macleod Trail SE, Calgary. All Events use **America/Toronto**, 7:00–8:00 PM EST, CAD and Comedy. The Calgary Location and Eastern Event timezone are the actual saved combination. Shared contact/refund wording and add-ons were inherited and left unchanged.

### Created records

Every ticket type below has inventory **20**, base price **CAD 10.00**, Public visibility and regular e-Ticket delivery. All Events are Live / Selling now. A and B each have total capacity 40; I and C each have capacity 20. Event numeric IDs were not exposed in the screens used; links identify the exact Events.

| Case role and Event | Date, 2026 | Ticket type | Ticket type ID | Credit assignment |
| --- | --- | --- | --- | --- |
| [I — TC01 Credit Refund I - Three Use Pass - Nov 2026](https://beta.showpass.com/manage/events/tc01-credit-refund-i-three-use-pass-nov-2026/overview/) | Nov 24 | Three Use Credit Pass | 1629355 | Issues 3 uses per pass |
| [A — TC01 Credit Refund A - Original Mixed Order - Nov 2026](https://beta.showpass.com/manage/events/tc01-credit-refund-a-original-mixed-order-nov-2026/overview/) | Nov 25 | A Credited Admission | 1629356 | Eligible |
| A, same Event | Nov 25 | A Paid Admission - No Credit | 1629357 | Excluded |
| [B — TC01 Credit Refund B - Reuse Mixed Order - Nov 2026](https://beta.showpass.com/manage/events/tc01-credit-refund-b-reuse-mixed-order-nov-2026/overview/) | Nov 26 | B Credited Admission | 1629358 | Eligible |
| B, same Event | Nov 26 | B Paid Admission - No Credit | 1629359 | Excluded |
| [C — TC01 Credit Refund C - Exhaustion Check - Nov 2026](https://beta.showpass.com/manage/events/tc01-credit-refund-c-exhaustion-check-nov-2026/overview/) | Nov 27 | C Credited Admission | 1629360 | Eligible |

**Ticket Credit definition:** [TC01 Credit Refund - Three Uses - Nov 2026](https://beta.showpass.com/manage/ticket-credits/280992/), **definition ID 280992**. This is the normal Ticket Credit creation flow; no partial percentage was configured. It is not a Customer-issued code. Limit per item, per user = **3**; issuing quantity = **3**; one issuing ticket type and three redemption ticket types. Actual voucher discount/fee behavior remains untested until a controlled code exists.

### Run test index

These IDs belong only to this preparation report; they are separate from the five Refund-case draft labels above.

- [TC-01 — Creation and publication](#prep-tc-01)
- [TC-02 — Saved Ticket Credit assignments](#prep-tc-02)
- [TC-03 — Issuing-pass basket](#prep-tc-03)
- [TC-04 — Event A mixed basket](#prep-tc-04)
- [TC-05 — Event B mixed basket](#prep-tc-05)
- [TC-06 — Event C basket](#prep-tc-06)
- [TC-07 — Remaining purchase and Refund proof](#prep-tc-07)

<a id="prep-tc-01"></a>
### TC-01 — Creation and publication

**What this tests:** The case's four separate Events and six required ticket types can be saved and put on sale.

**Start here:** Dashboard, Christian Valdez, Organization 1786-Anime selected. The user's readiness confirmations apply to Venue 1786. Another employee needs Manage Events; missing access is a stopping condition, not authorization to change permissions.

1. **Create Events I and A.** On Create event select **One event**. Enter each exact name/date in the records table, the saved Location, 7:00–8:00 PM and Comedy. Create the Event. In its section menu select **Tickets**, add the listed ticket types, set inventory 20 and price 10.00, then **Save**. Select **Publish event → Publish now → Publish now** in the confirmation.

   **Expected:** Distinct saved Events show Live / Selling now with the requested date, CAD currency and capacity 20 for I / 40 for A.

   **Actual — Passed:** Both saved successfully. The refreshed basket evidence in TC-03/TC-04 below additionally shows the exact ticket names, prices, dates and separate A lines.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-i-live.jpg" alt="Event I live with 20 tickets and CAD currency" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-a-live.jpg" alt="Event A live with capacity 40" width="600" style="max-width:100%;height:auto;">

2. **Create B from A and C from I using Clone event.** Enter B's exact name and Nov 26 date; clone, change its description and both ticket names to the B names, and save. Clone I for C with its exact name and Nov 27 date; change its description and ticket name to C Credited Admission, and save. Publish each using **Publish event → Publish now → Publish now**.

   **Expected:** B has two 20-stock CAD 10 ticket types; C has one. Both Events show their own correct dates and Live / Selling now.

   **Actual — Passed:** Clones opened as drafts. Names and descriptions were corrected and saved; copied inventory/prices were retained. Publication succeeded. TC-05/TC-06 prove the resulting public ticket lines and dates.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-b-tickets.jpg" alt="Saved Event B ticket names, inventory and prices" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-c-live.jpg" alt="Event C live on November 27 with 20 tickets" width="600" style="max-width:100%;height:auto;">

<a id="prep-tc-02"></a>
### TC-02 — Saved Ticket Credit assignments

**What this tests:** Purchasing one issuing pass is configured to grant three uses, and paid admissions are excluded from redemption.

**Start here:** Dashboard → Promote → Ticket credits, Organization 1786-Anime; the four Events above already saved.

1. **Create and assign the credit.** Select **Create ticket credit**, enter **TC01 Credit Refund - Three Uses - Nov 2026**, set **Limit per item, per user = 3**, and save. Under **Credits issued by**, add Event I and set Three Use Credit Pass to **3**. Under **Credits redeemable for**, add A, B and C. Turn off A Paid Admission - No Credit and B Paid Admission - No Credit; keep each credited admission on. Save, reload and inspect all assignments.

   **Expected:** One issuing Event/ticket type, quantity 3; three redemption Events/ticket types; both paid switches off; limit still 3.

   **Actual — Passed:** All values remained after reload and again on the final visit. No Customer code was generated.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/credit-assignments.jpg" alt="Reloaded credit definition with three issuing uses and only A B C credited tickets eligible" width="600" style="max-width:100%;height:auto;">

<a id="prep-tc-03"></a>
### TC-03 — Issuing-pass basket

**What this tests:** One issuing pass can reach checkout, survive refresh and be removed without purchasing it.

**Start here:** Public Event I, signed in as Christian Valdez. Before reserving, checkout showed **Oops! Your cart is empty!**. Source review confirmed the supported Review **Remove** action and its confirmation; no basket clear or sign-out was used.

1. **Check the baseline, then select one pass.** Open Event I → **BUY TICKETS**, set Three Use Credit Pass quantity to **1**, follow **Checkout 1**, and select **Continue** on Add-ons to reach Review. Refresh checkout and use **Continue** to return to Review.

   **Expected:** Empty starting basket; then exactly one Event I pass dated Nov 24 at 7:00 PM EST, quantity 1, CAD 10 base price, no duplicate after refresh.

   **Actual — Passed:** Exactly one expected line. Visible subtotal CAD 10; total CAD 15.26 including inherited fees/tax. Fee correctness and credit issuance were not tested.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-baseline-empty.jpg" alt="Checkout empty before any test additions" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-i-refreshed.jpg" alt="Refreshed issuing-pass checkout with quantity one" width="600" style="max-width:100%;height:auto;">

2. **Remove the pass.** Select its **Remove** control; confirm the dialog naming **1x Three Use Credit Pass**. Wait for empty checkout, refresh and inspect it again. Open I's Dashboard Overview.

   **Expected:** Basket remains empty after refresh; no sale; original stock available.

   **Actual — Passed:** Empty message persisted. Overview showed **0 sold / 20 remaining**, CAD 0 revenue. No payment or order submission.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-i-cleanup.jpg" alt="Empty checkout after removing the pass and refreshing" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-i-stock-after.jpg" alt="Event I overview after basket cleanup" width="600" style="max-width:100%;height:auto;">

<a id="prep-tc-04"></a>
### TC-04 — Event A mixed basket

**What this tests:** The original-order items can reach checkout together as three eligible admissions and one separate excluded paid admission.

**Start here:** Public Event A, same Customer/session; TC-03's refreshed empty basket. No issued voucher exists, so this check does not apply one.

1. **Build and refresh the mixed basket.** Select **BUY TICKETS**; set **A Credited Admission = 3** and **A Paid Admission - No Credit = 1**. Follow **Checkout 4 → Continue** to Review. Refresh checkout and return to Review with **Continue**.

   **Expected:** Two Event A lines on Nov 25 at 7:00 PM EST: 3 × CAD 10 and 1 × CAD 10; subtotal CAD 40; no duplicate/substituted items. Saved eligibility remains as proven in TC-02.

   **Actual — Passed:** Exactly those two lines and quantities persisted. Total CAD 61.04 before any voucher. No claim of $0 credited tickets: a controlled issued code is still required.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-a-refreshed.jpg" alt="Refreshed Event A basket with three credited admissions and one paid admission on separate lines" width="600" style="max-width:100%;height:auto;">

2. **Remove both lines.** Use **Remove**, confirm **3x A Credited Admission**; then remove and confirm **1x A Paid Admission - No Credit**. Refresh the empty checkout. Open A's Overview afterward.

   **Expected:** Empty basket after refresh; 0 sold and original capacity available.

   **Actual — Passed:** Empty message persisted; Overview showed **0 sold / 40 remaining**, CAD 0 revenue.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-a-cleanup.jpg" alt="Event A basket empty after both removals and refresh" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-a-stock-after.jpg" alt="Event A with zero sold and forty remaining after cleanup" width="600" style="max-width:100%;height:auto;">

<a id="prep-tc-05"></a>
### TC-05 — Event B mixed basket

**What this tests:** The later reuse-order items are also purchasable together at the intended quantities, before applying an actual restored voucher.

**Start here:** Public Event B, same Customer/session; TC-04's refreshed empty basket.

1. **Build and refresh B's mixed basket.** Select **BUY TICKETS**; set **B Credited Admission = 3** and **B Paid Admission - No Credit = 1**. Follow **Checkout 4 → Continue**, refresh checkout, then **Continue** back to Review.

   **Expected:** Exactly two Event B lines on Nov 26 at 7:00 PM EST, quantities 3 and 1, CAD 10 each and CAD 40 subtotal.

   **Actual — Passed:** Expected quantities, date, separate lines and subtotal persisted; visible total CAD 61.04. No voucher applied and no order created.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-b-refreshed.jpg" alt="Refreshed Event B basket containing the intended three plus one quantities" width="600" style="max-width:100%;height:auto;">

2. **Remove both B lines.** Confirm removal of **3x B Credited Admission**, then **1x B Paid Admission - No Credit**. Refresh empty checkout; open B's Overview afterward.

   **Expected:** Empty basket after refresh; no sale and original capacity available.

   **Actual — Passed:** Empty message persisted. Overview showed **0 sold / 40 remaining**, CAD 0 revenue.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-b-cleanup.jpg" alt="Event B basket empty after cleanup and refresh" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-b-stock-after.jpg" alt="Event B with zero sold and forty remaining after cleanup" width="600" style="max-width:100%;height:auto;">

<a id="prep-tc-06"></a>
### TC-06 — Event C basket

**What this tests:** C's eligible admission can reach checkout independently; a later exhausted-code refusal will not merely reflect an unavailable ticket.

**Start here:** Public Event C, same Customer/session; TC-05's refreshed empty basket. C initially displayed 20 Tickets Remaining.

1. **Add and refresh one C admission.** Select **BUY TICKETS**, set **C Credited Admission = 1**, follow **Checkout 1 → Continue**, refresh checkout and **Continue** back to Review.

   **Expected:** One C line on Nov 27 at 7:00 PM EST, quantity 1, CAD 10 base price; no duplicate after refresh.

   **Actual — Passed:** Expected line persisted. Visible subtotal CAD 10 and total CAD 15.26. No voucher or exhausted-use attempt was submitted.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-c-refreshed.jpg" alt="Refreshed Event C checkout showing one eligible admission" width="600" style="max-width:100%;height:auto;">

2. **Remove C's line.** Confirm **1x C Credited Admission**, refresh the empty checkout, then return to C → **BUY TICKETS** without selecting a quantity.

   **Expected:** Empty basket after refresh; original stock remains available.

   **Actual — Passed:** Empty message persisted; ticket picker again displayed **20 Tickets Remaining** and quantity 0. Closed the picker afterward.

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/basket-c-cleanup.jpg" alt="Final checkout empty after C removal and refresh" width="600" style="max-width:100%;height:auto;">

   <img src="../../99%20Archive/QA%20Evidence/ticket-credits/tc01-beta-1786-2026-11-10/event-c-stock-after.jpg" alt="C showing all twenty tickets available again and no selected quantity" width="600" style="max-width:100%;height:auto;">

<a id="prep-tc-07"></a>
### TC-07 — Remaining purchase and Refund proof

**What this tests:** The full original TC-01 outcome, beyond Event creation and unpaid basket smoke.

**Start here:** The prepared records above. The controlled Customer's issued code and completed original order do not yet exist from this run.

1. **Issue and prepare the original order — Not run.** Still needed: approved purchase of one I pass, resulting Customer code with Available 3 / Used 0, untouched comparison voucher, then one completed A mixed purchase. Verify credited tickets' entire saved Customer totals are $0, excluded paid ticket stays full price, actual fees/tax/Showpass earnings, unscanned status and code Available 0 / Used 3. The user confirmed fee/payment readiness, but basket smoke without a code cannot establish these outcomes.
2. **Run Refund and exact reuse boundary — Not run.** Still needed: original TC-01's completed Refund, immediate balance read, unchanged issuing/comparison records, provider and authorized financial evidence, completed B reuse purchase and C's unpaid exhausted-code rejection. **Admin remains forbidden** unless the user later explicitly authorizes that access; the original case's Admin financial evidence step is not permission to open it.

### Postconditions, evidence and limits

- Preserved four live Events, six ticket types and credit definition 280992 for later use. Final browser page is the saved credit assignments.
- All four test baskets were removed through supported line-specific controls and each empty state verified after refresh. No temporary code or add-on was applied. Visible post-cleanup stock: I 20, A 40, B 40, C 20. These are supported UI observations, not an audit of internal reservation counters.
- Visible fees, **without a credit**, were CAD 1.95 Processing fee + CAD 1 Host fee + CAD 0.93 Service fees + CAD 1.29 QST + CAD 0.09 PST per CAD 10 ticket. Four-ticket baskets showed CAD 61.04 total. These observations are not independent certification of the Organization's fee rules, provider charge or Showpass earnings.
- Screenshots are local, ignored evidence under `99 Archive/QA Evidence/ticket-credits/tc01-beta-1786-2026-11-10/`. No routine raw browser dumps or temporary scratch files were retained. No Admin screenshots were used as this run's readiness evidence.
- Supporting read-only cleanup check: frontend `ReviewItemGroup.web.tsx` exposes **Remove items from cart?** confirmation; the public checkout route is defined in `packages/next-app/pages/checkout/index.tsx`. Product UI, fresh checkout and stock observations supply the execution proof above.
- No automated tests or CI were run; this task changed beta test data and this note, not application source. No Jira bug draft was necessary because no product failure was confirmed.

### Preparation-run results

The requested creation and basket scope passed. Full Refund-case readiness remains incomplete until the unrun purchase/code/financial prerequisites and execution evidence are supplied. No release sign-off is implied.

| Check and step | Status | Bug | Observed result / remaining proof |
| --- | --- | --- | --- |
| [TC-01 — Creation, steps 1–2](#prep-tc-01) | Passed | — | Four distinct live Events; six CAD 10, 20-stock ticket types. |
| [TC-02 — Assignments, step 1](#prep-tc-02) | Passed | — | Saved limit 3, issuance 3, A/B/C eligible only; paid admissions off after reload. |
| [TC-03 — I basket, steps 1–2](#prep-tc-03) | Passed | — | One pass persisted; removed; refreshed empty basket and 20 remaining. |
| [TC-04 — A basket, steps 1–2](#prep-tc-04) | Passed | — | 3 + 1 on two lines persisted; removed; refreshed empty basket and 40 remaining. |
| [TC-05 — B basket, steps 1–2](#prep-tc-05) | Passed | — | 3 + 1 on two lines persisted; removed; refreshed empty basket and 40 remaining. |
| [TC-06 — C basket, steps 1–2](#prep-tc-06) | Passed | — | One admission persisted; removed; refreshed empty basket and 20 available. |
| [TC-07 — Issuance/original order, step 1](#prep-tc-07) | Not run | — | No purchase, issued Customer code, $0 credited totals or original paid order. |
| [TC-07 — Refund/reuse/exhaustion, step 2](#prep-tc-07) | Not run | — | No Refund, money return, restored-use purchase or exhausted-code attempt. |
| [TC-07 — Admin financial evidence, step 2](#prep-tc-07) | Blocked | — | Explicit no-Admin boundary; no attempt made. |
