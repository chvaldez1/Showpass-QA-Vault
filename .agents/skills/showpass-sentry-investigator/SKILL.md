---
name: showpass-sentry-investigator
description: Investigate Showpass Sentry issues through read-only API access, trace backend and frontend source, explain impact, and produce practical manual reproduction steps. Use for a supplied Sentry issue or error; live browser execution and code fixes require their own requested scope.
---

# Showpass Sentry Investigator

Apply the [shared engineering review layer](<../../../06 Prompts/Showpass Release Engineering Handoff.md#apply-the-review-layer>) if the work becomes a live assignment or release handoff. Scoped drafting and read-only findings can finish at the requested scope. Reuse existing reviews when supplying evidence for the same revision.

Turn a Sentry issue into an understandable account of what failed, who may be affected, and how a person can try to reproduce it. Distinguish recorded failures, source-backed explanations, likely causes, and checks that have actually been run.

## Boundaries and local context

- Use Sentry's connected tools or its read-only API. Do not inspect or control desktop apps, native Chrome/Dia windows, or desktop screenshots. Do not open Sentry in a browser as an access fallback. A pasted issue or “test this” does not authorize desktop access.
- Default scope is investigation and reproduction instructions. Do not resolve/assign issues, trigger Seer, replay requests, run jobs, send messages, edit Jira/Qase, change production records, or implement fixes without the corresponding user authorization.
- Use the QA Vault repository that contains this skill. Read its `AGENTS.md`, `00 Start Here/World-Class Software Quality Standard.md`, and the relevant Showpass handbook chapters when selecting QA checks. Follow repository `AGENTS.md` instructions.
- Backend truth: the sibling `web-app` checkout. Frontend navigation and clients: the sibling `showpass-frontend` checkout. Existing test patterns when needed: the sibling `showpass-playwright` checkout.
- Read the vault's `01 Repositories/Backend - web-app.md` and `01 Repositories/Frontend - showpass-frontend.md` for repository orientation. Reference source; do not copy repositories.

## Get actual Sentry evidence

Discover the tools currently exposed, including deferred tools. Prefer connected Sentry reads when available. The installed Sentry plugin may supply an API script without exposing a connector tool. Do not mistake an unexported shell token for absent access.

Showpass's established local API configuration is **`~/.config/showpass/sentry.env`**. The bundled wrapper loads its literal Sentry settings without displaying credentials, locates the installed Sentry plugin reader, and uses the configured trusted certificate bundle (default `/etc/ssl/cert.pem` when present). Do not substitute frontend release-upload credentials from `.sentryclirc`: those may lack event-read permission.

```bash
python3 <skill-directory>/scripts/sentry_read.py --org showpass issue-detail <issue-id>
python3 <skill-directory>/scripts/sentry_read.py --org showpass issue-events <issue-id> --environment <observed-environment> --time-range 14d --limit 10
python3 <skill-directory>/scripts/sentry_read.py --org showpass --project <returned-project-slug> event-detail <event-id> --include-entries
```

Replace placeholders before running. Use the issue's returned project slug; a URL's numeric `project` parameter is not a slug. Read issue details first, then representative event details. Confirm the environment from the issue/event; the upstream reader defaults to `prod`, whereas Showpass events often use `production`. Do not silently accept an empty list caused by the wrong environment or a narrow time window. Expand only enough to locate relevant retained events; report retention gaps and sample limits. A grouped issue can contain multiple causes, releases, or affected records.

Use shell pipelines with `jq` or an equivalent local filter to return only what is needed:

- Issue ID/short ID, title, status, priority, total count, first/last seen, project.
- Event ID, exact timestamp/timezone, environment, release, client, transaction, request method/path, relevant non-secret query fields and referring screen.
- Exception type/message, selected application frames, the final exception frame, and relevant background-task identity/retry information. Do not discard a decisive Gunicorn, provider, or framework frame merely because it is outside the app.
- Selected captured values needed to identify the Organizer, Event, offering or starting state. Inspect variable **names** first, then allowlist the necessary values. Do not dump users, all frame variables, request headers/cookies, payloads, or full raw traces. Remove credentials and unnecessary personal data; the upstream redactor alone does not scrub every secret.

Never print tokens, source the credential file with shell tracing enabled, copy credentials into the skill/vault, use `--no-redact`, or disable TLS certificate verification. A restricted network, a certificate problem, and a Sentry 401/403 are separate failures: name the actual failure. Use the permitted network-approval route when required. On 401/403, check the established credential source and report the API denial; do not change access scopes or ask for a token in chat. Integration failure blocks runtime claims, not independent skill/source work.

## Identify the affected Venue, Customer and order

Near the top of the report, give a compact record-details table: Venue ID and Venue/Organization name; Customer name, email and ID when available and needed to locate the record; what is being purchased or exchanged (Event/date, item names, quantities and IDs); original invoice ID/order reference and original items; and replacement basket/invoice/credit IDs when relevant. Include the useful confirmed details in chat. For non-purchase errors, use the corresponding affected employee, screen and record details; mark purchase-only fields not applicable.

Inspect relevant application-frame values even when Sentry user/business tags are empty. Keep original and replacement records separate. An invoice item ID identifies an order line, not its parent invoice; an Event name does not establish the Venue name. A model description is not a complete financial record. Mark missing fields individually as not captured, redacted, not applicable, or blocked by a specific access failure. A narrow correlation through another available read-only integration can fill gaps, but do not bypass redaction, infer identity from unrelated incidents, expose ticket barcodes/credentials, or change records to obtain details.

### Verify the record type before a lookup

Confirm each ID's type from the captured field, model or verified relationship, and retain that type beside the number in chat, tables and instructions: **Invoice ID**, **Invoice item ID**, **Basket ID**, **Customer ID**, or **Venue ID**. Avoid ambiguous numeric “order ID” or “original ID” labels when the record type is not established.

Keep **Invoice ID** and **Invoice item ID** in separate fields. An invoice item is one line of an invoice; only supply the parent Invoice ID from a captured or read relationship. If only the item ID is known, state **Invoice ID: unknown**. Never substitute the item ID.

Before giving an Admin link or search, verify that its destination matches the record type: **Invoices** for an Invoice ID and **Invoice items** for an Invoice item ID. To identify a parent invoice, first open the item and read its **Invoice** field. A missing-record warning from the wrong record type is not evidence that the intended record was deleted.

## Trace the failure through source

1. Record each relevant checkout's branch, revision, and relevant uncommitted changes. Compare the captured release with a locally available matching ref when possible. Do not equate current source with the deployed release or fetch/change branches just to investigate.
2. Start with the exact backend route, task, exception and application frame. Follow permissions, input validation, model/service calls, saved state, side effects and recovery. Then trace the frontend callers and visible navigation. Backend code also contains legacy Angular controllers/templates.
3. Match the full request shape to callers: referring page, event count, pagination, filters, payment/platform values, role, flags and existing record state. An endpoint called “inventory” or a Box Office platform value does not establish which screen the person used.
4. Trace other consumers of shared behavior only as needed to explain plausible impact. Separate observed affected clients from source-supported potential exposure.
5. Challenge the suspected cause. `SystemExit` in Gunicorn `handle_abort` establishes an abort, not automatically the timeout duration, bad fee configuration, or a defect on the application line interrupted. A captured job error does not prove retries exhausted, email delivery failed, or the final order state. Correlate narrowly with other available runtime evidence only when needed and authorized.
6. A GET can calculate and save cached prices or enqueue work. Inspect side effects before calling a manual step “no data change.” Do not replay production requests to learn whether they are safe.

Stop when the evidence supports an actionable explanation and an honest reproduction procedure, or a specific missing fact blocks further progress. Avoid broad feature audits and repeated equivalent captures.

## Give the user a usable manual reproduction

Follow the walkthrough style in the vault's `03 Test Cases/Authentication/public-and-protected-pages-beta-smoke-2026-10-25.md` and `03 Test Cases/Browser Test Report Template.md`. Use these as format references only; their environment, executed results and screenshots are not evidence for a Sentry investigation. Put a short Overview, clickable Test index and plain-language Setup before the walkthroughs. Give each test **What this tests**, **Start here**, and numbered Steps with Expected and Actual beneath every action. Keep API details, stack frames, IDs and source analysis after the walkthroughs, and finish with one linked Results table. Preserve report-local TC IDs and the original investigation/run date when clarifying a note. Newly suggested or unexecuted actions stay Not run. Render real screenshots beside executed steps only when they exist; otherwise state why no screenshot is available. Do not invent screenshots or reuse unrelated images.

Lead with the affected action and what is known. Write everyday product language, with implementation details in supporting source notes. Include:

- **Status:** recorded Sentry failure confirmed; manual reproduction confirmed / not run / inconclusive. Give confidence and the reason. Source tracing is not a manual pass.
- **Start here:** environment/build, actual Organizer and screen, employee role/access, required visible records, relevant flag/page version and state. Include how to reach that state in the numbered actions, using verified visible controls. Say whether the reader can use their own account or why the original employee matters. If the event user object is empty, inspect relevant captured application-frame values such as employment before declaring the actor unknown; allowlist only needed values. Identify unavailable records by their Sentry IDs in supporting data. Do not invent names, current access or permissions.
- **What this tests:** the user's action and the visible outcome it should preserve.
- **Steps:** a numbered walkthrough using visible navigation, exact controls and values. Under each numbered action, include **Expected** and **Actual — Passed / Failed / Blocked / Not run**. Expected describes correct behavior; Actual contains only observed evidence. Keep routes out of manual actions unless navigation itself is tested or no visible navigation exists. Use tables for summary results rather than packing the manual actions into rows.
- **Trigger uncertainty:** state which setup/action is established versus inferred. If two controls can emit the same request, provide separate short attempts and explain the evidence cannot pick between them. Preserve the required old/new page version rather than silently substituting a new page.
- **Safety and stopping point:** distinguish no data change, changes test data, and potentially destructive actions. State relevant automatic writes, owned-data requirements and cleanup. Do not tell the user to change production flags, clear pricing caches, generate load, buy/refund, or trigger real deliveries to force an error. Stop after one focused attempt when repeats could cause load or side effects.
- **Proof:** exact visible symptom and any optional request/event evidence needed to establish the same failure. Do not require the user to understand Sentry to carry out the basic steps. A generic error, successful retry, or unrelated 500 does not prove the same cause.
- **Remaining checks:** clean success and focused regression/recovery checks where relevant, with executed/not-run/blocked labels. Do not present a proposed case as executed coverage or issue severity as release sign-off.

Before handing the reproduction to the user, apply `00 Start Here/World-Class Software Quality Standard.md` → **Executable Reproduction Handoff**. Resolve ordinary setup from source or permitted UI evidence: how to select the Organizer, open the main versus Event-specific page, reveal filters, clear them when applicable, and show a hidden totals/results panel. Name conditional controls and the expected values after setup; do not assume “no filters” or “totals enabled” is already true. Missing access or a different page version gets an exact stop/report outcome, not an instruction to change permissions or flags.

For a timing-dependent attempt, name the last action that starts the load and a justified observation window. Label the window as an investigative limit when no product deadline is established; do not turn one incident's wait into a universal timeout. Distinguish visible amounts/zero from blank or still-loading content. Stop after the bounded attempt without a retry loop. Explain browser filter, display-preference or impersonation-session effects separately from financial/other record changes, including restoration when relevant.

When the user asks what to do next, provide the complete first check in chat: named account/Organizer/screen, exact controls, expected visible result, stop condition and a small set of outcomes to report with local time. A report link alone is insufficient. Say which server facts are confirmed, which manual checks are unrun, and how the result will be correlated. Do not require the user to interpret SQL or Sentry to perform the basic check.

For a timing-dependent or background-only error, say plainly when no reliable UI-only reproduction is known. Offer the closest safe source-backed attempt and identify the missing timing, logs, data or supported admin setup. Do not fabricate determinism or force a UI workflow onto an internal job.

When requesting human verification, follow the vault's no-guessing rule: lead with “I need you to check,” give one prioritized check with its location, exact action, expected choices, safety label and what to report. Say whether it blocks the investigation. Explain what the user does not need to inspect.

## Save and finish

Use one canonical issue note under `08 Sentry Investigations/` in the QA Vault. Do not save Sentry investigations under `02 Feature QA/`. Update an existing issue note in the dedicated folder instead of creating a duplicate. Keep manual steps, recorded facts, likely cause, evidence links, source anchors/revisions, impact, limits and any focused follow-up checks together. For Qase-ready cases or actual browser runs, use the vault's required workflow and report format instead of treating this skill's investigation as executed coverage.

Use the user's local date/timezone, preserving the original Sentry UTC timestamp alongside it. Link the issue/event and exact source files/lines. Keep scratch API output under `/private/tmp`, remove the specific files with `rm` after capturing useful evidence, and verify cleanup. Leave credentials and user-owned files alone.

Finish with the main finding, a link to the note, the manual reproduction status and any concrete blocker. Never claim the skill was tested end-to-end if API access or source tracing was blocked.
