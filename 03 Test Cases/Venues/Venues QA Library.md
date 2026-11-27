---
title: Venues QA Library
tags:
  - qa/test-cases
---

# Venues QA Library

Venue or Organization context sets the configuration and data boundary for Dashboard and public profile views. [[03 Test Cases/Test Cases by Feature|Test library]]

## Setup and proof

Name the expected Venue and a contrasting Venue before switching, editing or checking a public page. Compare exact records and settings after reopening the intended context.

## Connected features

- [[03 Test Cases/Organizations/organizer-profile-qase-test-cases]]
- [[03 Test Cases/Organizations/organization-settings-qase-test-cases]]
- [[03 Test Cases/Dashboard/dashboard-manage-page-coverage-gap-analysis#Dashboard → Organization → Settings → Spaces → List]]

## Existing cases

These are saved Qase definitions. Open the case for its current prerequisites, parameters and expected results.

- [SPT-5789](https://app.qase.io/case/SPT-5789) · Dashboard - Spaces - Save a space’s capacity-counter setting
- [SPT-5790](https://app.qase.io/case/SPT-5790) · Dashboard - Spaces - Keep space lists separate when switching venues

## Promoter verification

The promoter verification page opens from a verification invitation for that promoter and Organization. It shows **Verification complete**, **This verification link is invalid**, or a retry message after the attempt. Use a controlled invitation for the intended account and confirm the result against the Organizer's promoter record. Keep the invitation itself out of shared notes. The public UI is in `PromoterVerificationPage.web.tsx` and the backend exposes the promoter record in `apps/venues/api/serializers.py`. This is a source-backed entry for the library. An exact saved Qase case for this verification flow still needs to be identified.
