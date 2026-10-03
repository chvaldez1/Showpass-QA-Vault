---
title: Quality Measures
date: 2026-10-01
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Quality Measures

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Keep the system honest with useful measures

Review these across releases; agree baselines and targets with the team rather than inventing percentages:

- Escaped **Critical**, **Major**, and **Medium** incidents separately, grouped by failed business promise and client/configuration. Historical priority is not automatically validated impact.
- Share of declared high-risk proof targets with current candidate/configuration execution evidence; separate automation existence from execution.
- Time from detecting a risk to clarifying expectation/testability, and how many harmful defects were found before release.
- Missing or duplicated payment/order/fulfillment outcomes and unaccounted batch recipients, where approved operational evidence exists.
- Quarantined/flaky tests by business outcome lost; first-attempt stability, not only final retry-green rate.
- Open blocked/manual-only device and configuration rows with an owner, last result, and next required evidence.
- Repeated incident families after a fix: regression scenario missing, enabled/deployed state unknown, assertion too shallow, or recovery/detection gap.
- Cleanup failures and shared-data collisions caused by tests.

Use these to improve risk discovery and proof, not to incentivize more test cases or lower reported severity.
