# Beta widget SDK requires Cloudflare Access

Run: November 15, 2026. Read-only investigation.

The external host loads `https://beta.showpass.com/static/dist/sdk.js`. An HTTP GET with no cookies returned HTTP 302, content type `text/html`, redirecting to Cloudflare Access login. The JavaScript cannot initialize until access is granted. This is a confirmed environment/access blocker; no security vulnerability was demonstrated.

## Scope and checks

| Check | Starting state | Action | Expected proof |
| --- | --- | --- | --- |
| Host SDK configuration | Existing Codex events tab | Read script elements | Exact SDK URL |
| Anonymous SDK response | HTTP client with no cookies | GET SDK URL | Status, content type and sanitized redirect |
| Native Chrome failure | User reports logged out | Not executed by agent | Actual failing SDK network request |

## Test WIDGET-SDK-01 — Identify the SDK URL

**What this tests:** Which environment supplies the host SDK.

**Start here:** `https://chris-showpass-events.lovable.app/events`.

1. Read the existing page script elements and current console warnings/errors.
   - **Expected:** Identify the SDK script URL and whether the current session shows the reported error.
   - **Actual:** Script is `https://beta.showpass.com/static/dist/sdk.js`. Existing Codex page renders beta calendar and tickets. Captured warning/error logs did not include the retry error. No UI actions or login changes were performed. No screenshot was captured for this DOM-only inspection; it does not establish a signed-out UI pass.

## Test WIDGET-SDK-02 — Anonymous SDK request

**What this tests:** Whether the SDK is accessible without a beta access session.

**Start here:** HTTP client with no Cookie header.

1. GET `https://beta.showpass.com/static/dist/sdk.js` without following redirects.
   - **Expected for anonymous embedding:** JavaScript response.
   - **Actual:** HTTP 302 with HTML response, redirecting to `https://showpass.cloudflareaccess.com/cdn-cgi/access/login/beta.showpass.com`. Query tokens are omitted from evidence.
   - **Proof:** [Redacted response evidence](evidence/sdk-cloudflare-access-2026-11-15/evidence.json). HTTP-only check; no UI screenshot applies.

The host bundle retries checking `window.showpass.tickets`; it logs the reported error when the SDK never becomes available. Increasing the retry limit cannot fix an authentication redirect.

## Test WIDGET-SDK-03 — Native Chrome confirmation

**What this tests:** Whether the actual failed browser request matches the anonymous response.

**Start here:** The same Chrome profile where the widget fails. Agent has not accessed native Chrome or changed its session.

1. Open DevTools → Network, enable Preserve log, then reload the events page.
2. Filter `sdk.js` and inspect its status, redirect destination and response type.
   - **Expected if this is the same cause:** Redirect to Cloudflare Access/login, HTML, or a browser error caused by the redirected script.
   - **Actual:** Not run. User reported logged-out Chrome failure; the precise account/access session was not specified.
3. For approved internal beta testing, open `https://beta.showpass.com/` in the same profile and complete the normal Cloudflare Access sign-in if prompted. Return and reload the host page.
   - **Expected:** SDK can load if the browser permits the authenticated cross-site request.
   - **Actual:** Not run. Cross-site cookie restrictions may require a separately supported preview/testing setup.

## Cleanup and recommendations

No website, account, basket, access policy or repository source changes. Existing browser session preserved. Temporary raw response captures were removed after saving the sanitized evidence.

Use approved beta access for internal testing. For public logged-out visitors, use a supported public environment. Loading the production SDK alone does not establish that beta iframe/API access will work. Keep access credentials server-side; do not place them in Lovable client code or disable beta protection.

| Check / scenario | Status | Observed result or exact gap | Go to test |
| --- | --- | --- | --- |
| Host SDK configuration | Passed | Exact beta SDK script observed in host DOM | [WIDGET-SDK-01](#test-widget-sdk-01--identify-the-sdk-url) |
| Anonymous SDK response | Failed | SDK request redirected to Cloudflare login instead of JavaScript | [WIDGET-SDK-02](#test-widget-sdk-02--anonymous-sdk-request) |
| Native Chrome failure | Not run | User-reported failure; native browser Network response still unverified | [WIDGET-SDK-03](#test-widget-sdk-03--native-chrome-confirmation) |
