---
title: SPW-21283 Webhook Privacy Qase Review
date: 2026-11-24
tags:
  - qa/test-cases
  - webhooks
---

# SPW-21283 Webhook Privacy Qase Review

**Status** · Wording drafts for [Qase SPT → Integrations → Webhooks, suite 193](https://app.qase.io/project/SPT?suite=193). This review did not run the scenarios.

A webhook endpoint is the saved destination. A webhook event holds the request body. Each send or resend creates a delivery attempt in **Logs**. The cases check that an employee with **Developer** permission can see useful event and delivery details while credentials stay hidden from those views and application logs. The employee can still copy and rotate the endpoint's **Secret Key** in **Endpoints**.

| Case | What the wording now makes clear |
| --- | --- |
| [SPT-5961](https://app.qase.io/case/SPT-5961) | Compare what the receiver gets with what **Events** and **Logs** show. Signed deliveries hide the receiver's response even if the response is harmless. A suitable historical unsigned log is the comparison. |
| [SPT-5962](https://app.qase.io/case/SPT-5962) | Use a harmless request to prove the application logger is working before treating the absence of a webhook response body as a pass. Check that copying and rotating the key still work. |
| [SPT-5963](https://app.qase.io/case/SPT-5963) | Compare the first delivery and resend of the same event. The new endpoint and key apply to delivery. The saved body stays the same. Follow the same steps for **Send Test** and an ordinary **Purchase**. |

## Proposed Qase wording

### SPT-5961: Dashboard - Webhooks - Check that Events and Logs hide credentials

**Description:** Send a test webhook and a Purchase webhook to a receiver you control. Compare what the receiver gets with what an employee can see in **Events** and **Logs**. Check that the delivery details are still useful and that a safe older response remains readable.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Use an employee with **Developer** permission in a test Organization. Open **Dashboard → Organization → Integrations → Webhooks → Endpoints**.
* Use one enabled endpoint subscribed to **Purchase**. Point **Endpoint URL** at a controlled HTTPS receiver that can save requests and return a harmless response or echo a synthetic value. Add `?token=qa-url-secret#qa-fragment` to the test URL.
* Use one test Event with a regular ticket available for a test purchase. Have a local backend test setup for the nested-field and historical-log checks below. Use synthetic values throughout.

**Postconditions:**

* Reset the test endpoint and receiver. Keep the event IDs, HTTP statuses, and comparison results as evidence. Clear captured test keys and request values from temporary files.

**Tags:**

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the saved endpoint, copy **Secret Key**, and select **Send Test**. Buy one regular ticket to trigger **Purchase**. Open both requests in the receiver. | Keep both event UUIDs for comparison. | The receiver gets both signed requests. The test request includes the saved key and endpoint URL in its body. The Purchase request includes the test order and ticket details. |
| Open **Webhooks → Events** and select the test event. Under **Event data**, select **Load more**. Compare the displayed JSON and `request_data` from the event GET response with the receiver's copy. | Use the event UUID to match the request. | Both views omit `secret` and other credential fields. URLs keep the scheme, host, port if present, and path. User info, query, and fragment are gone. The event and its timestamp are visible. |
| Open **Webhooks → Logs** and compare the delivery details and log API response for both signed requests. Keep the receiver's harmless response for this check. | Inspect `request_headers`, `request_url`, `webhook_event__request_data`, and `response_data`. | Ordinary headers and business fields are visible. Sensitive headers show `[REDACTED]`, URLs omit private parts, and the stored event body shown in the API has its credentials removed. The HTTP status, event UUID, and timestamp are visible. `response_data` is `null` and **Response Body** shows **Response not available**. |
| Set the receiver to echo one synthetic request value at a time. Select **Send Test** again for each echo and open the matching delivery log. | Run once each for a body value, a signature or auth header, and a query value. | The receiver receives the original request value. Each log API response has `response_data: null`. Dashboard shows **Response not available**. |
| In the local backend test, read the seeded event and log through the Organizer API. Compare the saved event and delivery records before and after the reads. | Use nested `secret`, `Api-Key`, and `refresh_token` fields, ordinary `key` and `quantity` fields, `Authorization`, `Cookie`, `X-API-Key`, and the configured signature header. Use a synthetic URL with user info, port `8443`, a query, and a fragment. | Credential fields disappear from nested objects and lists. `key` and `quantity` remain. The URL displays only scheme, host, port, and path. Sensitive headers show `[REDACTED]` and `response_data` is `null`. The saved body, headers, URL, and receiver response still match the originals. |
| Open the seeded historical delivery in **Logs** and check its API response. | The saved body has no sensitive fields, the only header is `Content-Type`, the URL is `https://example.com/hook`, and the receiver response is `accepted`. | The API returns `accepted` in `response_data` and Dashboard shows it under **Response Body**. |

### SPT-5962: Dashboard - Webhooks - Check private responses and Secret Key rotation

**Description:** Check that the Webhooks APIs tell browsers and proxies to avoid storing their responses, and that the app's response-body logger skips them. Confirm an employee with **Developer** permission can still copy and rotate the **Secret Key** and send a signed request.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Preconditions:**

* Use one enabled webhook endpoint in a test Organization, a controlled HTTPS receiver, and an employee with **Developer** permission and their password. Start in **Dashboard → Organization → Integrations → Webhooks → Endpoints**.
* Have access to the test app's backend logs. Confirm that `RequestLogMiddleware` and `CustomColoredLogHandler` are active and that `CUSTOM_LOGGER_ALLOWED_RESPONSE_LENGTH` is above zero. Use a short test window and a Webhooks response that exceeds the configured length limit for the log check.

**Postconditions:**

* Clear temporary key copies. Reset the test endpoint and receiver. Restore any test-only logger settings and save the request identifiers and pass, fail, or blocked result.

**Tags:**

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open browser DevTools → **Network**, enable **Preserve log**, and reload the endpoint editor, **Events**, and **Logs**. Open **Response Headers** on each Webhooks request. | Check the configuration, webhook-events, and webhook-logs GET responses. | The requests succeed. Each `Cache-Control` header includes both `private` and `no-store`. |
| In the endpoint editor, copy **Secret Key**. Compare the copied value with `secret` in the authorized configuration response. | Use the test endpoint only. | **Secret copied!** appears and the values match. |
| Select **Regenerate Code**, confirm with the employee's password, then reload the endpoint editor. Copy the key again. Select **Send Test** and verify the request in the receiver with the new key. | Check the rotation and configuration response headers. | The new key differs from the old key and stays the same after reload. The receiver gets the request and verifies its signature with the new key. Both API responses include `private` and `no-store`. |
| In the test app's log window, make a harmless non-webhook request that normally logs a response body. Find its entry. | Match the request by route, time, or request ID. | A `RESPONSE` body entry proves that the logger is active in the stream you are checking. If you cannot establish that, mark the logging check **Blocked**. |
| Repeat the three Webhooks reads and **Regenerate Code** during the same log window. Find each request in the backend logs. | Include the response larger than the logger limit. | Request and status entries may appear. The response-body logger emits no `RESPONSE` body, JSON, key value, receiver echo, or response-length placeholder for any of these Webhooks requests. |

### SPT-5963: Dashboard - Webhooks - Resend the original event to the updated endpoint

**Description:** Change a webhook's **Endpoint URL** and **Secret Key**, then use **Resend** on an earlier event. The old event body should reach the new receiver. Its new signature should verify with the current key. Do both runs below with separate events and test endpoints.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| Run | How to create the original event | What to check in its body |
| --- | --- | --- |
| Send Test | Select **Send Test** in the endpoint editor. | The receiver's body includes the endpoint details and old test key. **Event data** hides the key. |
| Purchase | Buy one regular ticket for a test Event while the endpoint is subscribed to **Purchase**. | The receiver's body includes the original order and ticket details. |

**Preconditions:**

* Use an employee with **Developer** permission and their password. Open **Dashboard → Organization → Integrations → Webhooks → Endpoints** in a test Organization.
* Prepare one enabled test endpoint per run and two controlled HTTPS receiver URLs, A and B. Reset the first endpoint before starting the second run. Both receivers must capture the exact body and signature header. Use a Showpass signature check that reads the root `id` from the body. Use fresh events so their delivery attempts are within the 15-day window shown in Dashboard.
* Have local backend read access to the saved event and delivery attempt for the final comparison. Keep the old and new test keys only for signature verification during the run.

**Postconditions:**

* Save the event UUID, destination, and comparison results. Reset the test endpoints and receivers. Clear temporary copies containing test keys or raw requests.

**Tags:**

**Steps:**

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Set **Endpoint URL** to receiver A and select **Save**. Copy **Secret Key** as the old key. Create the event for this run, then open the delivery at A and the matching event in **Webhooks → Events**. | Save the exact body, signature header, and event UUID from A for comparison. | A receives a signed request. Its body and the displayed event match the checks for the selected run. |
| Set **Endpoint URL** to receiver B on the same endpoint and select **Save**. Reopen it, select **Regenerate Code**, confirm with the employee's password, and reload the editor. | Copy **Secret Key** as the new key. | The saved URL now points to B and the new key differs from the old key. The original event is still available. |
| Return to the original event in **Webhooks → Events**. Under **Webhook Attempts**, open the attempt's three-dot menu, select **Resend**, and confirm with the employee's password. | Use the original event UUID. | **Event will be retried** appears. A new attempt is recorded for the same event. B receives the resend and A receives no new attempt. |
| Compare the exact body received at B with the original from A. Verify the signature with the new key, then with the old key. | Use the same event body `id` for both signature checks. | The bodies match, including the old key in the **Send Test** body. The new signature verifies with the new key and fails verification with the old key. |
| Open the new attempt in **Logs** and inspect its log API response. Compare the saved event and attempt records before and after opening the views. | Check `request_headers`, `request_url`, `webhook_event__request_data`, and `response_data`. | Private fields and URL parts are hidden, sensitive headers show `[REDACTED]`, and `response_data` is `null`. Ordinary event data and delivery status are visible. The saved records still match their originals. |

## Sources and review limits

* [SPW-21283](https://showpass.atlassian.net/browse/SPW-21283) is Complete. The November 9 Jira comment reports selected beta checks. It does not record completion of all three saved Qase definitions or this wording review.
* [[01 Repositories/Backend - web-app]] at `62067009a8`. `apps/venues/services/webhook/payload_visibility.py` and `apps/venues/api/venue_based/serializers/webhooks.py` define what the event and log reads show. `apps/venues/api/venue_based/viewsets/webhooks.py` defines **Developer** access and response privacy. `apps/core/logging/custom_log_handler.py` controls response logging. `apps/venues/services/webhook/client.py` signs the body's root `id` with the current key and sends the saved body to the current URL. The event UUID identifies the event in Dashboard.
* The seeded event, log and response cases can use `WebhookPayloadVisibilityTestCase` in `apps/venues/tests/webhooks/test_webhook_payload_visibility.py`. Retry expectations are checked in `apps/venues/services/webhook/tests/test_client.py`. Capturing the live receiver and reviewing backend logs require a separately run test.
* Frontend `showpass-frontend` at `12a457dd28`. `EndpointForm.web.tsx`, `EventDetailPage.web.tsx`, `LogsContent.web.tsx`, and `WebhookEventDetailLogTable.web.tsx` confirm the button names and where to find the evidence.
* Scope for a Qase update is title, description, preconditions, steps, and postconditions on the three named cases. Each has empty tags and parameters in Qase. The two run types in SPT-5963 are explained in its Description. Step counts remain 6, 5, and 5.
