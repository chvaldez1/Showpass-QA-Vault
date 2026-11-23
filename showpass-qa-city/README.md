# Showpass QA City

Run the City from this directory. The local Codex CLI must be on PATH, signed in with ChatGPT, and have included usage available.

```sh
pnpm install
pnpm dev
```

Open [QA City Runs](http://127.0.0.1:3000/runs). Planning uses the local Codex App Server and the installed Showpass skills. The City starts a turn only after Codex confirms included usage and reports that workspace credits are unavailable. The City uses loopback and stores the shared workspace on this Mac.

Choose the assignment's **Review path**. An Event saved in Showpass with the status Draft is live setup.

| Review path | What to do in Runs |
| --- | --- |
| Draft plan only | Select **Prepare draft plan**. City saves the plan with execution Not run. |
| Short review | Prepare the plan, select **Run short review** for the Release Engineer's check, then **Send to QA Lead**. City switches to full review when the plan or short review identifies high risk. |
| Full review | Prepare the plan, select **Scope with Release Engineer**, then run the Backend Master and Frontend Master reviews. Select **Prepare engineering handoff**, then **Send to QA Lead**. |

**Organizer Tester** and **Organizer Builder** have separate assignments and skills. Both cover permitted Organizer Dashboard pages. Assign behavior, access, and UX checks to the Tester. Assign configuration and test-data setup to the Builder. Use **Build area** to choose the Event, Product or Membership, or general Dashboard workflow when the title is ambiguous.

After live plan approval, paired Organizer assignments can use **Run in Codex**. Supported beta Event Draft assignments can use the dedicated City runner when the Builder chat is unpaired. Other assignments can continue through **Open in Codex** or **Copy handoff**. A revised live plan needs fresh review and sign-off. Use **Use full review on the next revision** to raise a short assignment to full review.

### Run an approved Organizer plan in Codex

In `.env.local`, `QA_CITY_ORGANIZER_CODEX_THREAD_ID` pairs the Organizer Builder with its local Codex chat. `QA_CITY_ORGANIZER_TESTER_CODEX_THREAD_ID` optionally pairs the Organizer Tester with its own chat. In Runs, open an assignment approved by the QA Lead after pairing, confirm the plan, and select **Run in Codex**. Runs displays live status, commentary, and browser action labels from the paired chat. The reply appears there after the turn finishes. Review the evidence before using **Record browser result**.

### Run an approved beta Event Draft

For the local browser runner, install Chromium once with `pnpm exec playwright install chromium`. Create an **Organizer Builder** assignment with **Agent drives** and **Event setup**. Supply the beta Organization, an existing Event location, the Event timezone, and a request for a single-day Event Draft with optional Short text questions. The plan shows the proposed Event details and questions before review.

Select **Open beta browser** and sign in to Showpass as an authorized Organizer. City reuses beta-only Cloudflare Access cookies from the sibling Showpass Playwright repo's ignored `playwright/.auth/cloudflare.json`, when available. Set `QA_CITY_BETA_ACCESS_STATE` if that file lives elsewhere. City keeps its separate browser profile and execution checkpoints under `~/Library/Application Support/Showpass QA City` by default.

After QA Lead sign-off, confirm the existing location and access to the migrated Create event and Order form pages, then select **Run approved plan**. City creates the Draft and reopens Order form to verify the optional questions. It records the saved Event fields and gives you the Draft editor link. Ticket setup, artwork, public Preview, checkout, and purchase verification are outside this runner.

Record the outcome in the City. For a passed Event build, paste the saved records and matching beta Preview URL. The City queues a Public Tester assignment to assess and review separately. The builder can also record partial saves with a failed or blocked result. Add your own Event images in Showpass.

## Release engineering

**Releases** always uses full review. Add the candidate, affected workflows, source evidence and executed test evidence. Scope it with the Release Engineer, run the two source reviews, prepare the engineering handoff, and send it to the QA Lead. The City reviews evidence you supply. For a tester plan, include relevant source references or excerpts in the assignment instructions. The installed source-review skills can trace the repositories directly from a Codex workspace. The handoff decision and release recommendation are recorded separately. Revisions keep earlier decisions in history while the current revision waits for its own review. [Vault release workflow](../06%20Prompts/Showpass%20Release%20Engineering%20Handoff.md)

Assignments, plans, reviews, and reported results are shared across browser views connected to the same local City server. Existing browser records import when that view opens City. Saved Codex handoffs can be recovered from their local dispatch records. Open a saved builder result to inspect its JSON. Each record has a City `kind` and a `record` with verified fields from the Showpass backend's venue-based serializers:

| Record | Fields used to carry work forward |
| --- | --- |
| Event | `id`, `slug`, `status`, `starts_on`, `ends_on`, `opens_at`, `collect_info_custom_questions`, `tickettype_set` |
| Product | `id`, `venue`, `is_active`, `product_attributes` |
| Membership Group | `id`, `venue`, `status`, `membership_levels` |
| Membership Benefit | `id`, `membership_group`, `membership_level`, `ticket_type` |

Keep dates in ISO 8601 and prices as two-decimal strings. Leave fields out when they cannot be verified through the authorized workflow. This is a subset of the backend response fields for sharing saved test data. [Backend repository guide](../01%20Repositories/Backend%20-%20web-app.md)

Set `NEXT_PUBLIC_QA_CITY_VAULT_PATH` to the absolute QA Vault path if you want **Open in Codex** to select that project when opening the draft.
