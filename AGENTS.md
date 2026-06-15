# Showpass QA Vault Agent Guide

Use this vault as a QA-first workspace for test creation, QA analysis, and automation planning.

## Source Of Truth

- Backend first: `/Users/christianvaldez/Documents/Showpass/repos/web-app`
- Frontend follows backend behavior: `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`
- Playwright automation patterns: `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`

Backend code is the first source of truth for behavior, schemas, APIs, permissions, and validation. Frontend code follows that behavior and shows how users reach it. The Playwright repo shows durable automation patterns.

## Vault Handshake

Agents should keep work aligned with this folder contract:

- `00 Start Here/` - orientation and basic QA workflow.
- `01 Repositories/` - short reference notes for source repositories.
- `02 Feature QA/` - feature-level QA notes and risk analysis.
- `03 Test Cases/` - manual test case templates and drafted cases.
- `04 Automation/` - automation candidate planning.
- `05 Tooling/` - CLI and workflow tool references.
- `06 Prompts/` - reusable prompts and agent workflows.
- `99 Archive/` - old or inactive notes.

## Agent Rules

- Do not move, copy, or mirror repositories into this vault.
- Reference repo paths instead of copying large code snippets.
- Prefer checklists, short workflows, and focused QA notes.
- Capture behavior, risks, test cases, and automation candidates.
- Update notes only when they make QA work easier to repeat.
- Keep notes short enough for both humans and AI agents to scan quickly.
