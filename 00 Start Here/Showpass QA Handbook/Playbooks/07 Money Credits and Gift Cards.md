---
title: Issue, Spend, and Adjust Customer Credit or a Gift Card
date: 2026-10-02
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Issue, Spend, and Adjust Customer Credit or a Gift Card

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

**Roles:** Customer purchaser/recipient; Organizer configures Gift Card offering; allowed Venue Employee issues/inspects credit and adjustments. Money credit, Exchange credit, Gift Card code and Ticket Credit are different records/workflows.

## Prepare
Record opening Customer balance/history, ownership, Venue/item restrictions, expiry, currency and expected split payment. For Gift Cards, define denomination/value, delivery recipient, and the actual Organizer advance/redemption accounting policy.

Use a controlled purchaser and a different controlled recipient when testing gift delivery. Use one eligible item and one excluded item. Do not use live gift codes or send to real Customers.

## Customer purchases and recipient obtains the Gift Card
| Step Action | Data | Expected Result |
| --- | --- | --- |
| As Organizer, open the Gift Cards offering and supported create/edit action. | Saved denomination/value and restrictions | Correct Venue and allowed setup. |
| Save and reopen the offering. | Same Gift Card | Value, eligibility and delivery settings persist. |
| As Customer, open the offering on the sales client. | Named value | Correct price/currency and recipient options. |
| Enter controlled recipient details and complete purchase. | Purchaser and recipient | One paid order; gift belongs/delivers to intended recipient under the configured rules. |
| Open actual delivered Gift Card or supported recipient view. | Controlled recipient inbox/account | Usable code/value; not merely a preview or queued send. |
| As recipient, open an eligible item and apply Gift Card. | Known credit value | Correct allowed reduction and any residual payment. |
| Finish checkout and reopen balance/history and order. | Same recipient | Debit once; correct remaining value; usable purchased items. |
| Inspect Organizer accounting for purchase and redemption. | Both order references | Original collected money not counted again as external cash; advance/redemption allocation follows actual policy. |

## Customer spends money or Exchange credit
| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Customer credit history through the supported Customer/Employee view. | Actual owned balance | Correct owner, scope, expiry, opening value. |
| Apply credit in eligible checkout. | Known amount | Correct allowed spend and external payment split. |
| Complete and reopen order/history. | Same attempt | One debit, correct remaining value, intended fulfilled items. |
| Attempt excluded or excessive spend separately. | Ineligible item or beyond balance | Supported rejection/split behavior; no unintended negative balance or cross-owner use. |

## Adjustments and senior-QA passes
Use independent orders for Refund to original method, Refund to credit, Void and Exchange where supported. Compare original debit, returned cash, new credit, remaining balance and ticket validity. A Customer balance can be correct while Organizer payout is wrong—inspect both.

Test recipient distinct from purchaser, expired/restricted credit, multiple quantity, credit plus discount/fees, historical invoice origin, lowest Employee permission, and retries. For concurrent last-balance spending or duplicate adjustment replay, use backend/isolated engineering setup and prove one intended spend/issuance.

## Finish
Preserve purchaser/recipient, code references without exposing usable secrets in shared notes, opening/closing balances, orders, financial allocation and adjustment evidence. Restore only owned configuration; do not erase credit history to hide a mismatch.

## Source-backed cautions and automation reference

**Business risk:** the wrong customer can spend credit; retries debit twice; refunds create extra money; gift-card advance/redemption pays the organizer twice. Anchor: SPD-2337.

**Automation:** browser owner/eligibility/balance journey; backend ledger/concurrency/refund/payout permutations. A correct customer balance does not prove organizer settlement. Source route: B8, B9, B10.
