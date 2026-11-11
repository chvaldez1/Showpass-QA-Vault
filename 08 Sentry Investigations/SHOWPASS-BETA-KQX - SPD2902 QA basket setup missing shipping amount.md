---
title: SHOWPASS-BETA-KQX - SPD2902 QA basket setup missing shipping amount
date: 2026-11-10
tags:
  - qa/sentry
  - qa/test-data
aliases:
  - Sentry 7840216674
status: QA setup failure confirmed; customer-facing reproduction not established
---

# SHOWPASS-BETA-KQX — QA basket setup fails before the intended check

## Overview

**A QA script failed while creating a test basket.** It bulk-inserted a basket without a shipping-display amount. Bulk insertion skips the normal basket save methods that fill this value. The connected database rejected the missing amount with a NOT NULL error.

The recorded caller is **`spd2902_beta_qa` → `make_fixture` → `insert` → `TicketBasketQuerySet.bulk_create`**, launched through a Django shell on a script pod. There is no HTTP request or browser transaction in the captured event. This is a confirmed test-data setup failure, not evidence of a failed Customer checkout or a failed **Send QR codes** submission.

**Separate schema discrepancy:** Both the release model and its original migration declare this field nullable, while the captured database requires a value. The exact reason for that disagreement is unverified. No database schema, Admin records or migration state were inspected. Do not assume a missing migration or weaken the constraint to silence the alert.

**Impact:** This attempt could not finish preparing its test basket. It does not establish the outcome of the intended delivery-conversion checks. The failed INSERT did not save that basket; earlier setup records, transaction rollback, subsequent cleanup and later reruns are not established by this snapshot.

[Sentry issue](https://showpass.sentry.io/issues/7840216674/) · [Captured event](https://showpass.sentry.io/organizations/showpass/issues/7840216674/events/4c82800992d64d64ba1ab6c5e9e1fbf3/) · [Related setup ticket SPD-2902](https://showpass.atlassian.net/browse/SPD-2902)

## Affected records

These descriptions come from captured application variables, not an Admin lookup. Numeric foreign-key positions in the database error have not been guessed into record types.

| Detail | Confirmed information or limit |
| --- | --- |
| Sentry project / environment | **Showpass Beta**, slug `showpass-beta`; event environment tag **`production`**. The tag does not independently prove which application database was connected. |
| Release | **36.38.6** |
| Time | **November 10, 2026, 21:00:43.761 UTC / 2:00:43.761 p.m. MST** |
| Venue / Organization name | **QA SPD2902 42f86821c3b2 Child**, from the captured Venue and basket `payment_venue`. |
| Venue ID | **Not captured in the selected named fields.** |
| Associated test account | **Charles Sachet**, from `make_fixture.user` and the basket description. This does not identify the person who launched the script. |
| Customer/User ID | **Not captured in the selected named fields.** |
| Email | **Redacted** in the read-only API response; not needed to identify this setup failure. |
| Event | **QA SPD2902 42f86821c3b2**; Event ID/date **not captured**. |
| Ticket Type | **QA SPD2902 42f86821c3b2**; numeric ID and quantity **not captured**. |
| Product / variant | Product and ProductAttribute both described as **QA SPD2902 42f86821c3b2**; numeric IDs and quantity **not captured**. Their presence in setup does not prove a purchase. |
| Invoice ID / order reference | **Not captured.** The in-memory setup has an Invoice described as `$0.00 Sale for None`; that description does not prove a completed order. |
| Invoice item ID | **Not captured.** |
| Basket ID | No successfully saved Basket ID established. The rejected-row diagnostic starts with `2004794`; do not treat it as a saved basket or an Invoice ID. |
| Original/replacement Exchange or credit IDs | **Not applicable** to this captured basket-setup failure. |

Jira SPD-2902 concerns **FAN EXPO Cleveland: Send QR codes unavailable**, currently BETA QA at the read time. That is the reason for the QA scenario, not the identity of this synthetic Organization. Do not copy the live Cleveland Customer, Venue or Invoice IDs into this Sentry incident. Jira content was read for context; its reported client problem was not independently retested here.

## Test index

- [[#TC-01 — Identify the actual failing operation]] — Recorded failure confirmed through Sentry.
- [[#TC-02 — Compare normal saving with bulk insertion]] — Selected release methods checked locally, without a database.
- [[#TC-03 — Reproduce through the product]] — No established UI-only reproduction; not run.
- [[#BUG-01 — QA setup draft]] — Draft for the setup failure, not a new client-facing defect claim.

## TC-01 — Identify the actual failing operation

**What this tests:** Whether this alert came from a Customer action or test-data preparation.

**Start here:** Read-only Sentry issue/event API. No Admin, browser, impersonation, service-record changes or request replay. All findings below describe the recorded event, not a newly executed script.

1. **Read issue 7840216674 and its retained event.**

   **Expected:** Identify the project, release, time and exception before choosing a reproduction path.

   **Actual — Passed, investigation:** One recorded occurrence, unresolved / High at the read time. Event `4c82800992d64d64ba1ab6c5e9e1fbf3` reports `IntegrityError` / PostgreSQL SQLSTATE **23502**, missing **`tickets_ticketbasket.display_shipping_cost`**. Failed statement duration is **4.16 ms**; this is not a timeout. Environment filters `beta` and an empty value returned no events; `production` returned this event and matches its tag.

2. **Follow the captured caller and inspect only the relevant setup variables.**

   **Expected:** Establish what attempted the INSERT and what input was absent.

   **Actual — Passed, recorded failure identified:** Django shell executes `spd2902_beta_qa`; line **281** calls `make_fixture`, line **129** reaches `insert`, and line **99** reaches `TicketBasketQuerySet.bulk_create` at line **33**, then timestamp-manager bulk creation and Django's INSERT. Captured supplied values include email, expiry date, invoice, payment Venue, status and user; they do not include `display_shipping_cost`. The database confirms that column reached it as NULL. There is no captured request entry or transaction name.

The source context displayed beside the synthetic script frames contains unrelated Django shell lines. It is not a reliable copy of `spd2902_beta_qa`; use its stack names, line numbers and captured variables as evidence, not those context excerpts. The full script was not found in the inspected repositories/vault.

## TC-02 — Compare normal saving with bulk insertion

**What this tests:** Whether the bulk path skips the code that supplies a missing shipping-display amount.

**Start here:** Local read-only backend source at release tag **v36.38.6**, resolved to **cc512cd4933ff441087ca6380ba561d3728aaa7d**. This check changes no application data and does not establish a successful checkout.

1. **Inspect basket save, price-display save and both bulk-create methods in the release source.**

   **Expected:** Normal creation initializes required display values; bulk callers must supply suitable values themselves when bypassing those hooks.

   **Actual — Passed, source trace:** `TicketBasket.save()` calls `_ensure_display_fields_set()` and then its parent save chain. `PriceDisplayFields.save()` explicitly replaces missing shipping, tax and service-fee display amounts with zero. `TicketBasketQuerySet.bulk_create()` lowercases email, and `TimeStampedQuerySet.bulk_create()` adds timestamps; neither performs this price normalization or calls model save.

2. **Evaluate the selected actual release methods with shipping amounts None, 0.00 and 1.25, using in-memory terminal stand-ins instead of a database.**

   **Expected:** Show whether each path initializes or preserves the supplied amount.

   **Actual — Passed, six selected-method checks:** Normal price save changes **None → 0**, preserving **0.00** and **1.25**. The combined bulk methods preserve **None**, **0.00** and **1.25**, while still setting email case and timestamps. No Django model, database, INSERT, basket, payment or email was created. An initial probe wrongly asserted the save method's return value; the corrected probe inspected the changed object and completed all six checks. This is method-level evidence, not a database or full-script reproduction.

**Schema limit:** `PriceDisplayFields.display_shipping_cost` and migration `0184_auto_20230421_1455` both specify **null=True** in this release. `CurrencyField` does not override that setting or supply a default. The actual failing database enforces NOT NULL. Missing initialization explains the submitted NULL; the inspected source alone does not explain that schema discrepancy.

## TC-03 — Reproduce through the product

**What this tests:** Whether an ordinary supported UI action produces this same failure.

**Start here:** **Not established.** The captured action is an internal QA fixture builder, not a visible Dashboard or Customer control. No reliable UI-only reproduction is known.

1. **Keep normal checkout and Send QR codes results separate from this setup alert.** Do not submit a live order or conversion to try to reproduce a script's bulk INSERT failure.

   **Expected:** Repair and verify test preparation before claiming the intended delivery-conversion scenario passed or failed. A separate allowed execution would require the full setup script, confirmed environment/Organization, exact readiness answers, owned data and cleanup scope.

   **Actual — Not run:** No UI action, basket API, script rerun, payment, conversion or confirmation delivery was executed. This captured setup attempt stops before any result from its intended conversion checks. Other attempts and the underlying customer-facing SPD-2902 behavior remain unverified by this investigation.

No screenshots are available because the captured failure is a shell operation and no browser test was run.

## BUG-01 — QA setup draft

**Draft only — no Jira issue or comment has been created. Classification: confirmed QA setup failure; no new customer-facing bug established.**

**Title:** fix (QA setup) | SPD-2902 test basket creation fails before delivery checks

**GIVEN** the SPD-2902 QA setup script is preparing the Organization **QA SPD2902 42f86821c3b2 Child**.

**WHEN** it creates the test basket through its bulk-insert helper without a shipping-display amount.

**THEN** basket creation stops with a missing-value database error for `display_shipping_cost`. Setup should supply valid basket values and finish before the delivery-conversion checks begin.

Recorded November 10, 2026, in the Showpass Beta Sentry project, release 36.38.6. The release source also disagrees with the database about whether that field may be empty; that discrepancy needs a separate authorized schema check. This draft does not claim that a Customer's order or Send QR codes failed in this event.

## Source notes and next engineering action

Use supported basket creation for the QA scenario, or make its bulk helper explicitly initialize the values required by the chosen basket state, including a correct **display_shipping_cost**. Zero is appropriate only when the scenario has no shipping charge; do not overwrite a real shipping amount. Initializing this one field is not proof the rest of the hand-built basket is valid.

Separately reconcile the actual database column constraint with the release model/migration before deciding whether a schema correction is appropriate. There is no evidence here of a recent application commit introducing this event. The relevant price-display source is unchanged between the inspected release tag and current backend HEAD. Attribution wrappers merely report the failed query; `core.database.attribution.attribute_query` is not the demonstrated cause.

- [Normal basket save](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:876>) and [display initialization](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py:763>).
- [Price-display field and save defaults](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/models/price_and_payment_display/price_display.py:13>).
- [Basket bulk creation](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/managers/order_management.py:28>) and [timestamp-only bulk initialization](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/managers.py:296>).
- [Original nullable shipping-display migration](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/migrations/0184_auto_20230421_1455.py:16>).
- [CurrencyField](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/models/fields.py:262>) and [query reporting wrapper](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/database/attribution.py:53>).

Backend inspected: clean develop **7349f8f596328e6f050b9e48df87fa12cb184ab5**. Matching release source was used for the narrow checks. Frontend HEAD **2821f0cd79425d13395861874ae8776862fe82da**, with pre-existing Jumbotron edits preserved; no frontend caller is implicated by this shell-only stack. No repositories were modified.

## Data safety and remaining coverage

Only read-only Sentry/Jira APIs, local source/history reads and in-memory Python method checks were performed. No Admin was accessed, no schema queried, no remote command run and no Showpass data changed. No temporary files were created. Existing user changes were preserved. Cleanup of the original script's earlier setup records is **unverified**; this investigation neither creates nor authorizes deletion of them.

**Readiness:** This setup attempt cannot serve as a passing Send QR codes check. Intended UI behavior, saved delivery changes, unaffected pickup items, confirmation delivery and cleanup remain **Not run / blocked by unavailable complete setup and execution scope**. This is not release sign-off.

## Results

| Check and exact step | Result | Evidence / limit |
| --- | --- | --- |
| [[#TC-01 — Identify the actual failing operation\|TC-01]], steps 1–2 | Confirmed recorded QA setup failure | Script → fixture builder → bulk INSERT; SQLSTATE 23502, 4.16 ms |
| [[#TC-02 — Compare normal saving with bulk insertion\|TC-02]], steps 1–2 | Passed for source/method explanation | Six local selected-method checks; no database or full-script execution |
| [[#TC-02 — Compare normal saving with bulk insertion\|TC-02]], schema limit | Inconclusive origin of schema discrepancy | Release null=True versus captured database NOT NULL; no schema inspection |
| [[#TC-03 — Reproduce through the product\|TC-03]], step 1 | Not run; no UI-only reproduction established | No captured HTTP request; no product action executed |
| Setup repair, intended SPD-2902 checks and cleanup | Not run | Full script and an authorized isolated execution are not available in this investigation |
