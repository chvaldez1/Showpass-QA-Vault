<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Showpass QA City

Follow the parent [QA Vault guide](../AGENTS.md) for Showpass QA and permissions. City is a local Next.js App Router app built with React, TypeScript, Tailwind CSS, and shadcn/ui on Base UI. Use Zod for schemas and request validation. See the [City README](README.md) for setup and operator workflows.

## Commands

Run these from `showpass-qa-city` using the pnpm version pinned in `package.json`.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies. |
| `pnpm dev` | Start City on `127.0.0.1`. |
| `pnpm lint` | Run ESLint. |
| `pnpm typecheck` | Generate Next.js route types and check TypeScript. |
| `pnpm build` | Verify the production build when changing routes or build configuration. |

## Where to work

- `src/app` owns pages and API route handlers. `src/components/workspace` holds the workspace screens, and `src/components/city` holds the 2D and 3D maps. Reuse the primitives in `src/components/ui` and theme tokens in `src/app/globals.css`.
- `src/lib/workspace` owns schemas, workflow state, and persistence. Keep older saved workspaces readable when changing schemas or normalization. Use the demo workspace or a separate `QA_CITY_DATA_DIRECTORY` for local checks that write data.
- `src/lib/codex` handles local Codex App Server calls and handoffs. `src/lib/execution` handles approval and the beta browser runner. Keep server-side integrations behind the local API routes and preserve loopback checks and approval for the current plan revision.

## Playwright automation

Use the sibling [Playwright agent team](../../showpass-playwright/docs/agent-workflows/playwright-team.md) for automation assignments. City prepares the work item and opens its checkout. Maintain the roles, skills, and automation procedure in that repository. See [Playwright automation](README.md#playwright-automation) for local configuration.

## Frontend work

Read these guides when implementing or reviewing a frontend change.

- [Frontend rules](docs/frontend-rules.md) for shared components, React state, accessibility, and workflow behavior.
- [Design guidelines](docs/frontend-guidelines.md) for navigation, layout, UI copy, and responsive screens.
- [Verification](docs/frontend-verification.md) for code checks and browser walkthroughs.
