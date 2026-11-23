# Verify frontend changes

Run `pnpm lint` and `pnpm typecheck` for frontend code changes. Run `pnpm build` when changing routes or build configuration. Use `git diff --check` for whitespace errors.

When browser verification is authorized, use local demo or isolated data and open the affected screen through normal City navigation.

- Exercise the main action and check the resulting route, control state, or saved value. For persistence changes, reopen the affected view and check that the saved change remains visible. Check other views that read the same changed state when relevant.
- Exercise affected conditional controls and recovery paths. Check visible field errors, pending and failed requests, and what happens when the action is attempted again. Compare form validation with the API when either changes.
- For changed dialogs or menus, check the trigger, the open state, keyboard selection or dismissal, and focus after closing. For visual changes, inspect the affected state at desktop and narrow widths and in both themes where relevant.

Use the [Showpass frontend QA reference](../../01%20Repositories/Frontend%20-%20showpass-frontend.md#what-qa-should-inspect) when checking how a City workflow reaches Showpass. Report which checks ran, what passed, and which material behaviors remain unverified.
