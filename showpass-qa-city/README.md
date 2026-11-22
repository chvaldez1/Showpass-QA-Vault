# Showpass QA City

Run the City from this directory. The local Codex CLI must be on PATH, signed in with ChatGPT, and have included usage available.

```sh
pnpm install
pnpm dev
```

Open [QA City Runs](http://127.0.0.1:3000/runs). Planning uses the local Codex App Server and the installed Showpass skills. The City starts a turn only after Codex confirms included usage and reports that workspace credits are unavailable. The City uses loopback and browser storage.

1. Create an Organizer assignment titled **create a single day rave event**.
2. Open the assignment and select **Prepare plan**. The Organizer Builder proposes the setup, including how to prove the Event and ticket types saved.
3. Read the proposal and select **Send to QA Lead**. An independent Codex session reviews this version. Select **Revise plan** for any change and send the replacement plan back for approval.
4. After approval, select **Open in Codex** or **Copy handoff**. The next chat uses the approved plan and confirms the target and permissions before any browser work. Add your own Event images in Showpass.
5. Record the outcome in the City. For a passed Event build, paste the builder's saved records and the matching beta Preview URL. The City queues a linked Public Tester assignment, which needs its own plan and Lead approval. The builder can also record partial saves with a failed or blocked result.

Assignments, plans, reviews, and reported results are stored in the browser. Open a saved builder result to inspect its JSON. Each record has a City `kind` and a `record` with verified fields from the Showpass backend's venue-based serializers:

| Record | Fields used to carry work forward |
| --- | --- |
| Event | `id`, `slug`, `status`, `starts_on`, `ends_on`, `opens_at`, `tickettype_set` |
| Product | `id`, `venue`, `is_active`, `product_attributes` |
| Membership Group | `id`, `venue`, `status`, `membership_levels` |
| Membership Benefit | `id`, `membership_group`, `membership_level`, `ticket_type` |

Keep dates in ISO 8601 and prices as two-decimal strings. Leave fields out when they cannot be verified through the authorized workflow. This is a subset of the backend response fields for sharing saved test data. [Backend repository guide](../01%20Repositories/Backend%20-%20web-app.md)

Set `NEXT_PUBLIC_QA_CITY_VAULT_PATH` to the absolute QA Vault path if you want **Open in Codex** to select that project when opening the draft.
