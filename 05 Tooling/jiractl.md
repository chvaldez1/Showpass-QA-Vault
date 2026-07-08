# jiractl

`jiractl` is the vault workflow for reading Jira cards when the user pastes an issue key or Atlassian link. There is no Jira MCP connector available in this session, so use the local read-only script with credentials from `.env`.

## Required Env

`.env` must provide:

```bash
JIRA_BASE_URL=https://showpass.atlassian.net
JIRA_EMAIL=<atlassian-email>
JIRA_API_TOKEN=<jira-api-token>
```

Do not echo tokens or paste credentials into chat.

## Read One Card

Use this when the user pastes a Jira URL or key:

```bash
node "05 Tooling/scripts/jira-read-issue.mjs" "https://showpass.atlassian.net/browse/SPW-12345"
```

The script accepts either a link or key:

```bash
node "05 Tooling/scripts/jira-read-issue.mjs" SPW-12345
```

For local analysis or repeat reads, save the raw Jira response under `/private/tmp`:

```bash
node "05 Tooling/scripts/jira-read-issue.mjs" SPW-12345 --save /private/tmp/jira-SPW-12345.json
```

## Agent Workflow

1. Extract the issue key from the pasted Jira link.
2. Run the script once and summarize the title, status, description, comments, acceptance criteria, and QA risks.
3. If the user wants test cases from the card, continue through [[06 Prompts/Showpass QA Test Case Generator]] instead of stopping at the summary.
4. If network approval is needed, request it for the stable script command instead of ad hoc `curl`.
5. Use Jira as intake context only. Confirm behavior against backend source truth in `/Users/christianvaldez/Documents/Showpass/repos/web-app`, then frontend and Playwright repos as needed.
6. Save raw API output only under `/private/tmp`.

## MCP Note

If a Jira/Atlassian MCP connector becomes available later, prefer that connector for reads. Until then, this script is the supported vault path.
