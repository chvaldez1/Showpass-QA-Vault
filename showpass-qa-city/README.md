# Showpass QA City

Run the City from this directory. The local Codex CLI must be on PATH, signed in with ChatGPT, and have included usage available.

```sh
pnpm install
pnpm dev
```

Open [QA City Runs](http://127.0.0.1:3000/runs). Planning uses the local Codex App Server and the installed Showpass skills. The City starts a turn only after Codex confirms included usage and reports that workspace credits are unavailable. The City uses loopback. Workspace storage uses Convex when configured and the local workspace file otherwise.

## Connect Convex

Use a dedicated QA City project on the Convex Free plan. From this folder, run `pnpm exec convex dev` and select that project's development deployment. This pushes the City schema and functions.

Generate a random server secret of at least 32 characters. Set it on that deployment with `pnpm exec convex env set QA_CITY_CONVEX_SECRET`. Enter it at the prompt or pipe it from a local secret manager. Add the same secret and the deployment's HTTP Actions URL to your private `.env.local`.

```dotenv
QA_CITY_CONVEX_SITE_URL=https://your-deployment.convex.site
QA_CITY_CONVEX_SECRET=your-random-server-secret
```

Restart City and open **Runs**. On first load, an empty Convex workspace imports the saved local workspace, including run history and release reviews. The local file remains as a backup. Convex takes over subsequent workspace saves. Use an empty deployment for the initial import. Codex dispatch receipts, execution approvals, browser sessions, and Showpass passwords stay local.

## Save QA defaults and reuse builds

In **Settings**, save the **QA venue** with the environment, Organization, and optional existing Event location. Assignments copy those values when saved. Clear **Use QA venue** when a run needs a different target. A follow-up assignment inherits its source run's venue when available.

Under **Showpass test accounts**, enter the Showpass test email for each role that needs one. The approved handoff checks for the matching signed-in Codex browser session and respects signed-out scope. Sign in once per browser session and use your password manager's autofill where available. City has no password field and does not read Showpass passwords from `.env.local`.

**Builds** lists the saved Showpass records from runs. Search by record name, ID, type, or venue and use **Use in assignment** to pass that specific record to another agent.

Choose the assignment's **Review path**. An Event saved in Showpass with the status Draft is live setup.

| Review path | What to do in Runs |
| --- | --- |
| Draft plan only | Select **Prepare draft plan**. City saves the plan with execution Not run. |
| Short review | Prepare the plan, select **Run short review** for the Release Engineer's check, then **Send to QA Lead**. City switches to full review when the plan or short review identifies high risk. |
| Full review | Prepare the plan and select **Scope with Release Engineer**. For Builder runs, select **Review backend and frontend** to start both source reviews together. Complete any remaining review, select **Prepare engineering handoff**, then **Send to QA Lead**. |

Plans show what each action will verify, what evidence to capture, and when to stop. QA Lead approval can cover a bounded beta check that gathers its evidence during execution, with preflight checks and stopping conditions in the approved plan. [Shared plan and proof guidance](../06%20Prompts/Showpass%20Release%20Engineering%20Handoff.md#plan-the-proof-and-stopping-point)

**Organizer Tester** and **Organizer Builder** have separate assignments and skills. Both cover permitted Organizer Dashboard pages. Assign behavior, access, and UX checks to the Tester. Assign configuration and test-data setup to the Builder. City chooses a **Build preset** and **Scenario theme** from the request. You can select them explicitly when needed.

City presets cover Events, Products, Memberships, discounts, Ticket Credits, Packages, and other Dashboard setup. Themes cover Sports (including Basketball, Volleyball, Soccer, Football, and MMA), Music (including festivals, Rave or EDM, Folk festivals, and Jazz), Comedy, Seasonal (including Valentine’s, Halloween, and Christmas), and Comic Con. A Product preset includes distinct variants, SKUs, stock, purchase limits, and its actual sales and fulfillment path. Assignment instructions override defaults.

The Builder reviews the primary setup and its required supporting records as one plan. City supplies verified same-venue candidates from saved builds. The plan states how to verify reuse, when to create a supporting record, and which details to reopen after saving. Use **Allow publication of supporting Events named in the approved beta plan** when the dependency needs publication. This selects full review for the assignment. The QA Lead signs off on the whole plan.

Choose one **Job** for each assignment. Guest Tester owns signed-out discovery and guest checkout. Customer Tester owns signed-in discovery, checkout, and Account work, including separate send and accept jobs. Both checkout roles cover public websites and widgets. Box Office Tester chooses one staff job. On the **City map**, select a building for its queue, blockers, and next actions, or use the review queue filters.

### Start the transfer pilot

Select **Organizer Workshop → Start transfer pilot**, enter the buyer and recipient test emails, and save the Builder assignment. The Builder records the verified Event and Ticket Type ID. The Customer Tester buys four tickets and records the issued order, sends three and records the pending transfer and retained ticket, then uses the recipient account to accept and verify three tickets. Each verified result queues the next assignment, which goes through the existing review and QA Lead approval.

After live plan approval, paired Organizer assignments can use **Run in Codex**. Other assignments can continue through **Open in Codex** or **Copy handoff**. A revised live plan needs fresh review and sign-off. Use **Use full review on the next revision** to raise a short assignment to full review.

### Run an approved Organizer plan in Codex

In `.env.local`, `QA_CITY_ORGANIZER_CODEX_THREAD_ID` pairs the Organizer Builder with its local Codex chat. `QA_CITY_ORGANIZER_TESTER_CODEX_THREAD_ID` optionally pairs the Organizer Tester with its own chat. In Runs, open an assignment approved by the QA Lead after pairing, confirm the plan, and select **Run in Codex**. Runs displays live status, commentary, and browser action labels from the paired chat. The reply appears there after the turn finishes. Review the evidence before using **Record browser result**.

### Record a browser result

Use **Record browser result** on the assignment to save the outcome. Use **Add finding** for each suspected bug, confirmed bug, usability issue, observation, or blocker. Record what happened and include the expectation, impact, and evidence you have. Mark missing proof or follow-up on the finding.

For a passed Event build outside the transfer pilot, paste the saved records and matching beta Preview URL. City queues a Guest Tester assignment to review the Preview separately. The Builder can record partial saves with a failed or blocked result. Add your own Event images in Showpass.

### Retained Playwright runner

The dedicated beta Event Draft runner and its local API remain in the project. Past runs still show their saved **Playwright result**. An open assignment approved for that runner needs a revised plan and fresh review before it can run in the Codex browser.

## Release engineering

**Releases** always uses full review. Add the candidate, affected workflows, source evidence and executed test evidence. Scope it with the Release Engineer, run the two source reviews, prepare the engineering handoff, and send it to the QA Lead. The City reviews evidence you supply. For a tester plan, include relevant source references or excerpts in the assignment instructions. The QA Vault’s source-review skills can trace the repositories directly from a Codex workspace. The handoff decision and release recommendation are recorded separately. Revisions keep earlier decisions in history while the current revision waits for its own review. [Vault release workflow](../06%20Prompts/Showpass%20Release%20Engineering%20Handoff.md)

Assignments, plans, reviews, and reported results are shared across browser views connected to the same local City server. Existing browser records import when that view opens City. Saved Codex handoffs can be recovered from their local dispatch records. Open a saved builder result to inspect its JSON. Each record has a City `kind` and a `record` with verified fields from the Showpass backend's venue-based serializers:

| Record | Fields used to carry work forward |
| --- | --- |
| Event | `id`, `slug`, `status`, `starts_on`, `ends_on`, `opens_at`, `collect_info_custom_questions`, `tickettype_set` |
| Product | `id`, `venue`, `is_active`, `product_attributes` |
| Membership Group | `id`, `venue`, `status`, `renewal_frequency`, `renewals_enabled`, `membership_levels` |
| Membership Benefit | `id`, `membership_group`, `membership_level`, `ticket_type` |

Keep dates in ISO 8601 and prices as two-decimal strings. Leave fields out when they cannot be verified through the authorized workflow. This is a subset of the backend response fields for sharing saved test data. [Backend repository guide](../01%20Repositories/Backend%20-%20web-app.md)

Set `NEXT_PUBLIC_QA_CITY_VAULT_PATH` to the absolute QA Vault path so **Open in Codex** and **Review in Codex** open the project that contains the `.agents/skills/` directory. The [City skill directory](../00%20Start%20Here/Showpass%20QA%20City.md#codex-skill-directory) lists the available skills and their source files.
