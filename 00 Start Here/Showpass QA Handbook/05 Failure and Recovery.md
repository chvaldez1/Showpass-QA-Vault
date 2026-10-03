---
title: Failure and Recovery
date: 2026-10-01
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Failure and Recovery

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Failure and recovery testing without unsafe experiments

Coordinate engineering-controlled faults in isolated environments. A browser intercept can test the client's reaction to a response; it does not simulate the provider succeeding while the server database rolls back.

| Failure boundary | Safe design | Required final proof |
| --- | --- | --- |
| Payment approved; local save/fulfillment fails | Backend integration fault or isolated supported failure hook | Original payment reconciled; one order/issuance result; no second charge |
| Client loses response after submission | Controlled client disconnection with authorized test sale | Inspect original outcome before retry; correct final order and inventory |
| Callback delivered twice/late | Backend replay against isolated provider event | One intended state change; no duplicate charge, refund, credit, or issuance |
| Batch stops after some recipients | Supported checkpoint/failure setup | Identity-accounted completion on resume; already-complete recipients not duplicated |
| Price/config changes during existing basket | Controlled saved settings and fresh/old baskets | Supported stale-price policy; saved charge/allocation consistent |
| Preview becomes stale before refund | Controlled supported item-state change | Revalidation/new preview; no stale refund authorization |
| Seat/stock competed for | Independent sessions and isolated last unit | One owner/valid sale; clear loser; no stranded reservation |
| Native setting or hardware lifecycle fails | Physical supported device and test payment account | Stable persisted setting and original-sale reconciliation |

For every recovery tool, prove: correct operator permission, exact target preview, before/after records, audit/reference, repeat behavior, and final money/fulfillment/inventory/report agreement. A repair that changes the basket before establishing the original provider result can make the evidence worse.
