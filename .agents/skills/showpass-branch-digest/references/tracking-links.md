# Tracking links

Confirm providers from sanitized remotes every run. Currently backend is Bitbucket `showpass/web-app`; frontend is GitHub `showpass/showpass-frontend`. Never attach a GitHub PR number to the backend repository.

Discover relevant connected tools before a fallback. Prefer the GitHub plugin for GitHub, a connected Bitbucket-capable integration or already authenticated permitted read-only CLI/API for Bitbucket, and Atlassian Rovo for Jira. Do not request tokens, expose credentials, recreate credential readers or open authenticated desktop browsers. If Bitbucket access is unavailable, preserve captured PR links and name the lookup gap.

## Pull requests

- Inspect full target-only commit bodies, existing URLs and explicit PR references, including GitHub merge/squash subjects and Bitbucket `Merged in … (pull request #123)` subjects.
- Prefer provider commit-to-PR associations. Match repository and commits, then inspect title/body, source/destination branches and state. A PR can still be open against the base while its commits are already on the selected branch. Inclusion does not require a merge to `master`/`main`.
- Explicit PR context in a commit supports a **commit-derived link** if provider access is blocked. A bare `#123` could be an issue number; it is insufficient. Direct commits may have no PR.
- GitHub: `https://github.com/<owner>/<repo>/pull/<number>`.
- Bitbucket: `https://bitbucket.org/<workspace>/<repo>/pull-requests/<number>`.
- Deduplicate links inside each change group. Label backend/frontend PRs separately. One change can have several PRs; one PR can contain several distinct changes.

## Jira

- Extract keys from branch names, commits, PR titles/bodies and linked records. Verify relevance; a broad epic or unrelated issue mentioned in a PR is not automatically the implemented requirement.
- Use the connected Atlassian Rovo issue-details tool with `showpass.atlassian.net`, requesting description, status, priority and comments. Resolve cloud ID through that plugin if the hostname is rejected. Batch independent reads where supported.
- Render captured keys as `[SPW-12345](https://showpass.atlassian.net/browse/SPW-12345)`. A failed read means **source-derived; Jira details not verified**; name the access problem once in the evidence section. Do not guess titles or status.
- Keep Jira status separate from code inclusion. Done does not prove deployment; an open ticket does not erase included code. Explain material conflicts.

Each change distinguishes **verified record**, **source-derived link**, **no record found after lookup**, and **lookup blocked**. A failed lookup cannot prove a record does not exist. A verified record does not prove runtime correctness.
