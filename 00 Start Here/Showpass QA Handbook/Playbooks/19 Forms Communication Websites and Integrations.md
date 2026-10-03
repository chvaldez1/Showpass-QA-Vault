---
title: Test Organizer Forms Customer Messaging and Integrations
date: 2026-10-03
tags:
  - qa/system-handbook
status: Source-informed walkthrough; not an executed test result
---

# Test Organizer Forms Customer Messaging and Integrations

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/Showpass QA Handbook/12 Venue Client and Scenario Setup|Venue, client, and scenario setup]] · [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|Source map]]

## What you are testing

The Organizer configures information or communication; the Customer sees the intended content and supplies required information; the Venue Employee can use the saved answers; the actual approved recipient or external service receives the promised result.

Preview, saved content, published website, queued email, delivered email, and processed integration update are separate outcomes.

## Event questions → checkout answers → Employee use

Prepare an isolated Event with one required order/attendee question and one optional question through its supported Order Form & Messaging settings. Record whether each answer belongs to the order, Customer, or individual Attendee; include two tickets with different Attendee answers where supported.

| Step | Action | Data | Expected result |
| --- | --- | --- | --- |
| 1 | As the Organizer, open Manage Events → Edit and configure the supported order/attendee questions. Save, leave, and reopen. | Required/optional questions, labels, choices and limits | Correct configuration persists; question scope and required status are retained. |
| 2 | As the Customer, begin purchase and check where questions are collected. At the configured stage, leave the required answer blank, then provide valid distinct answers. | Controlled Customer/Attendees; before/after payment stage | Missing required information blocks its intended submission; deferred collection does not incorrectly block payment; valid input is retained without mixing Attendees. |
| 3 | Complete the approved purchase and reopen the order. | Independent order reference | Answers are saved on the intended records alongside the correct issued items. |
| 4 | As a correctly authorized Employee, open the relevant order/attendee information or supported export. | Expected answer-to-person mapping | Answers are available where promised and assigned to the right person; restricted users cannot retrieve them. |

Test boundary length, whitespace, Unicode, commas/newlines, upload types/size where supported, and choices changing after an old basket exists. Test actual server rejection as well as client validation in the appropriate API layer. Do not guess that every form supports every field type.

### Paid order → unfinished information → Customer returns → Employee uses answers

Use an Event with the actual enabled post-purchase collection flags and supported question setup. Prepare two different Attendees and record purchaser-level versus per-ticket questions; use Package children only when their actual collection rules apply.

1. As Customer, complete one approved test purchase. Observe the required information stage and the saved paid order separately. Do not claim all information is complete because tickets or a receipt exist.
2. Leave the information stage without completing it. Return through the actual receipt/order link or My Orders. The original order remains recoverable; no new payment is requested merely to answer questions. Record the actual incomplete-state presentation and available controls.
3. Attempt full form submission with a visible required answer missing. Expect a clear field error and no completed-information claim. In a separate supported partial-edit/API test, saving some valid answers may leave the order pending; a successful partial save is not complete submission.
4. Supply distinct valid answers for each Attendee and the purchaser-level questions. Save and reopen from a fresh view. Compare answers per person, complete/pending state and names on issued tickets; compare regenerated wallet names if that path is promised.
5. As a permitted Venue Employee, inspect the same information and the actual relevant export. Confirm answers match the intended order/person and no unrelated Customer's information is exposed.
6. On independent orders, check Customer edits after Event end, Check In and during Transfer against the actual locks. Staff corrections and recipient-held ticket information have different permitted scopes; do not assume identical controls or access to shared purchaser answers.
7. Change the Event's question requirements after an earlier paid order exists. Compare old and new orders: the earlier paid requirement snapshot must not silently adopt the new setup. A historical missing snapshot needs explicit unavailable/pending handling, not invented answers or a false completion result.

Backend response edits do not change billing/shipping, payment, purchaser identity or delivery recipient merely because an Attendee field changed. A later answer edit updates serialized information but does not itself establish a new outbound webhook event. If an external service requires updated answers, trace and test its actual supported update mechanism rather than assuming the original purchase webhook runs again.

## Email configuration → actual Customer delivery

1. As Organizer, configure the supported Venue/Event/Membership email customization: actual available subject, reply-to, message, branding or banner fields.
2. Save and reopen. Use preview to check content/layout, but label it preview-only.
3. Complete the relevant real test purchase/booking/adjustment and inspect the actual email in the controlled recipient inbox.
4. Compare recipient, Event/date/timezone, Customer versus Attendee name, Membership/Package composition, amounts, branding, language, and actual link destinations.
5. Follow the delivered ticket/account links. Correct-looking text is insufficient if the recipient cannot obtain the purchased items.
6. Change a supported override in an independent scenario and test actual inheritance/fallback. Venue, Event, Membership Group, basket customization, and branding do not all resolve identically.

Repeated resend should follow the actual policy, not create new admission. For a controlled send failure, distinguish whether the order succeeded and whether notification recovery is safe; never retry payment simply because email is missing.

## Website and external-integration journey

| Stage | Concrete check |
| --- | --- |
| Organizer edit | Save/reopen supported website/integration settings; preserve unrelated configuration and secrets. |
| Publish | Open the actual owned published destination; compare with preview and intended visibility/cache behavior. |
| Customer action | Follow the intended Event/Product/Membership/Guestlist link and complete the relevant supported flow. |
| External handoff | Inspect the approved test endpoint/provider record for the correct unique business identity and allowed data. |
| External processing | Verify the downstream system applied the update, not merely that Showpass sent a request or received an HTTP success. |
| Failure/retry | In a sandbox, delay/fail/repeat the update; verify visible status, allowed retry, deduplication, and no loss of successful local work. |

## Senior-QA variations

Old/new form clients, mobile keyboard and accessibility, partially saved edits, refresh/back, required-field changes during checkout, Event versus Venue override, purchaser different from Attendee, transfer after email, localization/timezone, marketing consent, permission scope, cache invalidation, and webhook messages arriving out of order.

Use owned websites, approved inboxes and sandbox endpoints only. Do not send test marketing or transactional content to real Customers. Preserve the first order/job reference and mask personal information in evidence.

For every sale, account for enabled analytics, Customer/profile synchronization, referral notifications, abandoned-cart suppression, external admission/booking and outbound webhooks using [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|the purchase completion checklist]]. Check opt-out behavior against the specific channel; consent controls are not universal across all services. Provider payment callbacks are not proof that the Organizer's external system received its purchase update.

**Source route:** B24, B25–B27 and the affected backend form/integration owner in [[00 Start Here/Showpass QA Handbook/11 Sources and Maintenance|the source map]]. Transactional previews use dedicated builders; they are not the normal send path. Generic integration instructions must be bound to that integration's current payload, authentication, retry, and processing contract before execution.

## Source-backed cautions and automation reference

**Business risk:** required customer information is lost, branding/content differs after saving, tickets/emails reach the wrong person, or third-party updates stop while the initiating request succeeds.

**Automation:** Playwright form round-trip and approved inbox/download/endpoint evidence where feasible; backend validation, serialization, authorization, webhook retry/deduplication. Transactional email previews use their own builders and do not prove actual delivery. Source route: B24; affected frontend forms/website/integration callers.
