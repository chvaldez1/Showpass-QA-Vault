# Frontend - showpass-frontend

Repo path:
`/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`

Frontend code follows backend schemas, APIs, permissions, and validation while showing how users reach and exercise that behavior.

## What QA Should Inspect

- Routes and navigation paths
- Components involved in the workflow
- Forms, inputs, and submit behavior
- UI validation and error display
- Feature flags and conditional rendering
- API usage and request timing
- User workflows across pages or modals

## QA Notes

- Use frontend findings to build realistic user-facing test steps.
- Compare UI validation with backend validation.
- Note selectors or page structure only when useful for automation.

## Feature-Aligned Test Case Folders

The canonical test-case folder index is [[03 Test Cases/Test Cases by Feature]].

Frontend feature inventory is derived from:

- `packages/core/src/app-contexts/dashboard/features/`
- `packages/core/src/app-contexts/public/features/`
- `packages/core/src/app-contexts/user/features/`
- `packages/core/src/shared/modules/`

The QA folders use product-facing names instead of mirroring the code tree one-to-one. Features shared across Dashboard, Public, User, or shared modules use one test folder.

| Frontend source examples | QA feature folder |
| --- | --- |
| `auth`, `login`, `resend-confirmation` | `Authentication` |
| `assigned-seating`, `assigned-seating-builder`, `assigned-seating-assigner` | `Assigned Seating` |
| `configured-fees`, `custom-fees`, `internal-fees` | `Fees` |
| `custom-forms`, `form-engine` | `Custom Questions` |
| `group-sales`, `transfers` | `Group Sales and Transfers` |
| `credits`, `ticket-credits` | `Ticket Credits` |
| `tickets`, `ticket-types`, `order-pdfs` | `Ticketing` |
| `waitlist`, `waitlists` | `Waitlists` |

Code-only scaffolding is not given a test-case folder unless it exposes independent user behavior. Current exclusions include `caching`, `example-dashboard`, `key-value-params`, `layouts`, `navigation`, `realtime`, `route-placeholders`, `temp-files`, and `tracking-tokens`.

Inventory last aligned with the frontend repository on 2026-07-28.
