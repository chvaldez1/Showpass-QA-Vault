---
title: Customer Refund Policy Configuration Test Cases
jira: SPW-19667
status: source-reviewed-not-executed
date: 2026-10-27
tags:
  - qa/test-cases
  - refunds
  - dashboard
---

# Customer Refund Policy Configuration Test Cases

> [!important] Current-page review — 2026-10-27
> **Published and verified:** the cases listed below now match Qase after the approved 21 updates and 14 creates. Required gates, current controls, item setup, and expected results were reviewed in plain language. No purchases, refunds, or scans were executed. The table is the current publication map; older dated records below are history.

| Local draft | Current Qase case | Suite |
| --- | --- | --- |
| TC-1 | [SPT-5250](https://app.qase.io/case/SPT-5250) | 1107 |
| TC-2 | [SPT-5251](https://app.qase.io/case/SPT-5251) | 1107 |
| TC-3 | [SPT-5252](https://app.qase.io/case/SPT-5252) | 1107 |
| TC-4 | [SPT-5798](https://app.qase.io/case/SPT-5798) | 1107 |
| TC-5 | [SPT-5253](https://app.qase.io/case/SPT-5253) | 1107 |
| TC-6 | [SPT-5799](https://app.qase.io/case/SPT-5799) | 1107 |
| TC-7 | [SPT-5254](https://app.qase.io/case/SPT-5254) | 1107 |
| TC-8 | [SPT-5800](https://app.qase.io/case/SPT-5800) | 1107 |
| TC-10 | [SPT-5255](https://app.qase.io/case/SPT-5255) | 1107 |
| TC-13 | [SPT-5801](https://app.qase.io/case/SPT-5801) | 1107 |
| TC-14 | [SPT-5802](https://app.qase.io/case/SPT-5802) | 1107 |
| TC-15 | [SPT-5803](https://app.qase.io/case/SPT-5803) | 1107 |

> [!important] Start here
> This card checks the **Customer refunds** form for an organization and the **Allow customer-initiated refunds** choice on ticket types and products. It checks what can be saved and reopened. It does not ask a customer to return a purchase. Only TC-12 needs a paid order, and that case closes the employee Refund dialog without submitting it. Customer return behavior has its own cases under SPW-19668 and SPW-19671.
>
> Initially drafted without Qase access. On 2026-09-16, six approved cases were created in Qase suite 1091 and their saved fields verified; see Qase publication below. No gap analysis, browser execution, branch comparison, or diff was performed. All cases are unexecuted. Test-data names below are proposed records, not records confirmed to exist.

## Qase publication

Created 2026-09-16 in SPT suite 1091 after user approval. Readback matched all titles, descriptions, prerequisites, postconditions, tags, parameters, and steps. Local labels are retained for the coverage map; they are not part of Qase titles.

| Local draft | Qase case |
| --- | --- |
| TC-1 | [SPT-5250](https://app.qase.io/case/SPT-5250) |
| TC-2 | [SPT-5251](https://app.qase.io/case/SPT-5251) |
| TC-3 | [SPT-5252](https://app.qase.io/case/SPT-5252) |
| TC-5 | [SPT-5253](https://app.qase.io/case/SPT-5253) |
| TC-7 | [SPT-5254](https://app.qase.io/case/SPT-5254) |
| TC-10 | [SPT-5255](https://app.qase.io/case/SPT-5255) |

TC-4, TC-6, TC-8, TC-9, TC-11, and TC-12 remain local only. Publication does not mean the cases have been executed.

On 2026-09-24, the six published cases above were rewritten in plainer product language and updated in place. Qase readback verified the saved wording and steps; suite, tags, parameters, and other case metadata stayed the same. SPT-5254 gained one direct-link permission check. No case was created or deleted.

Current-source review on 2026-10-02 found a new organization-targeted rollout flag and Refund amounts section. The local case prerequisites and TC-1 field list below now reflect those controls. At that review, SPT-5250–SPT-5255 had not yet been updated. On **2026-10-05**, all six were updated in place and moved to [Organizer and Venue (1107)](https://app.qase.io/project/SPT?suite=1107). Readback matched the rollout prerequisites, current Refund amounts field coverage/defaults, all steps, and suite placement. Titles, tags, parameters, and unrelated metadata were preserved. No cases were executed.

## Testing Intent

We are testing whether an organizer can save organization-wide customer refund settings and individual ticket/product participation while values remain valid, independent, and limited to the correct organization; this matters because incorrect configuration can later permit or block the wrong refunds, and we will prove it by reopening saved settings and checking related item screens.

| Field                   | Answer                                                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Criticality bucket      | Permission boundary; configuration supporting refund eligibility.                                                                                         |
| Business invariant      | One organization owns its policy; each ticket type/product owns its on/off choice; saving one must not overwrite another.                                 |
| User or business impact | Organizers configuring refunds and customers whose later refund eligibility depends on those settings.                                                    |
| Failure mode            | Lost settings, stale cutoff fields, wrong organization updates, misleading item status, unauthorized edits.                                               |
| Observable proof        | Save confirmation followed by browser reload, reopened item settings, unchanged comparison records.                                                       |
| Source of truth         | Backend and frontend snapshots at the supplied commits; Jira is intake only.                                                                              |
| Primary surfaces        | Dashboard desktop: modern/legacy Organization settings, ticket Basic info, product Fulfillment; staff Transactions controls; English and French.                                                         |
| In scope                | Defaults, policy/cutoff/restriction saves, item switches/status, discard, copying, permissions, organization isolation, French, legacy settings embed, staff refund controls.      |
| Out of scope            | Refund execution, money movement, fee calculation, shipping/scan effects, approvals, per-event/per-item policy overrides, sold-order migration.           |
| Confidence              | High for configuration contracts; medium for execution setup because deployed revisions, migrations, records, and live navigation have not been verified. |

## Jira Intake Summary

[SPW-19667 — Venue-level refund policy and item refund flags](https://showpass.atlassian.net/browse/SPW-19667) was in **BETA QA** when read. Its description calls itself a stub and mixes configuration with future runtime behavior. The August 12 comment excludes refund-approval requests. The August 28 comment links a demo; the demo was not opened. Linked SPW-19668 and SPW-19669 were In Progress in the issue response.

The cases below are independently derived from source. Customer-facing blocked-reason editing appears in the description but has no field in the reviewed policy model, serializer, or form; it is an open scope question, not an invented test step.

## Proof Target Map

| Target | Why it matters | Cases |
| --- | --- | --- |
| P1: Correct, durable policy settings | Prevent lost or contradictory configuration. | TC-1–TC-4, TC-6, TC-10, TC-11; English/French runs |
| P2: Independent item participation and truthful status | Prevent accidental changes to other items or confusion about the policy switch. | TC-5, TC-9, TC-10, TC-12 |
| P3: Correct employee and organization boundaries | Prevent unauthorized or cross-organization changes. | TC-7, TC-8 |

## PR Details Reviewed

The user-provided PR verification list is the acceptance input for this revision: backend deployment/migrations; `pnpm run next:start` enum generation; disabled defaults; enabled-policy cutoff saves/validation; restriction saves; ticket/product defaults, status and persistence; disabled warnings; unchanged staff controls; permissions; French; and the legacy Customer refunds tab. No PR link or branch diff was requested or inspected.

## Sources Reviewed

Snapshot reads used `git show <commit>:<known-path>` and content searches at the supplied revisions; no changed-file discovery was used. Paths below are relative to these repositories:

The 2026-10-02 current-source check also reviewed backend `apps/venues/utils.py`, `apps/venues/api/venue_based/viewsets/refunds.py`, `apps/venues/models/venue_management/customer_refund_policy.py`, and frontend `packages/core/src/app-contexts/dashboard/features/organization/constants/organization-config.ts` plus `settings/customer-refunds/constants/customer-refund-policy-form-fields.ts`. These newer files establish the rollout gate and Refund amounts fields described below; they do not prove deployment or execution.

* **B:** `/Users/christianvaldez/Documents/Showpass/repos/web-app`, commit `f256abdedc4d6151887ac7f780c4a38a4d063696`.
* **F:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-frontend`, commit `11d42e80a07e0c06578a324c923e1d0af3ccad05`.
* **A:** `/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright`, current local source, automation pattern only.

| Reference | Paths / symbols | Evidence |
| --- | --- | --- |
| B1 | `apps/venues/models/venue_management/customer_refund_policy.py`; `apps/venues/constants/customer_refunds.py` | One policy per venue, defaults, choices, cutoff shape and positive-value constraints. |
| B2 | `apps/venues/api/venue_based/serializers.py` → `VenueBasedCustomerRefundPolicySerializer`; `viewsets.py` → `VenueBasedCustomerRefundPolicyViewSet`; `apps/venues/tests/test_customer_refund_policy_api.py` | Read/update contract, validation, permission and organization boundaries; create/delete unsupported. Tests inspected, not run. |
| B3 | `apps/venues/services/provision_venue_defaults.py`; `misc/scripts/2026/spw_19667_backfill_customer_refund_policies.py`; policy migration `apps/venues/migrations/0277_historicalvenuecustomerrefundpolicy_and_more.py` (located) | New venues get a policy; existing venues need missing-policy backfill. |
| B4 | `apps/tickets/models/event_management/event_ticket_types.py`; `apps/tickets/api/venue_based/serializers/serializers.py`; `apps/inventory/models.py`; `apps/inventory/api/venue_based/serializers.py` (field references) | Ticket type and product flags default off and are exposed through organizer serializers. |
| B5 | `apps/tickets/services/ticket_type_copy_service.py`; `apps/tickets/tests/test_api_venue_based_ticket_type_copy.py` (flag references) | Ticket copy includes customer refund participation. |
| B6 | `apps/financials/api/user_based/serializers.py` → `UserBasedInvoiceReturnSerializer.validate` | Existing customer return path still checks legacy automated-return enablement and invoice/payment eligibility. |
| B7 | `apps/venues/constants/constants.py` | Permission labels and required authentication for Manage Organization Info. |
| F1 | `packages/core/src/app-contexts/dashboard/features/organization/settings/customer-refunds/` → `constants/customer-refund-policy-form-fields.ts`, `utils/customer-refund-policy-utils.ts`, `ui/pages/CustomerRefundPolicyPage.web.tsx` | Visible labels, conditional inputs, clearing hidden cutoff values, save and loading/error states; venue timezone. |
| F2 | Same feature → `ui/components/CustomerRefundPolicyStatusNote.web.tsx`, `data/services/useVenueBasedCustomerRefundPolicyService.ts` | Shared item status text, venue-scoped query, query invalidation after save. |
| F3 | `packages/core/src/app-contexts/dashboard/features/organization/constants/organization-config.ts`; `packages/core/src/app-contexts/dashboard/constants/dashboard-routes/organization.ts` | Organization → Organization settings → Customer refunds; current route `/manage/organization/settings/customer-refunds`. Current source now gates this entry and API with `enable_venue_policy_customer_self_refunds` for the selected organization. |
| F4 | `packages/core/src/app-contexts/dashboard/features/events/ticket-types/basic-info/` → `form-fields.ts`, `utils.ts`, `Page.web.tsx`; `list/EventTicketTypesTable.web.tsx`, `list/EventTicketTypesPageSections.web.tsx` | Basic info toggle, whole-event save contract, add/edit/copy controls. |
| F5 | `packages/core/src/app-contexts/dashboard/features/products/` → `ui/components/form/ProductFulfillmentSection.web.tsx`, `ProductForm.web.tsx`, `useProductFormFields.tsx`; `ui/pages/ProductCreatePage.web.tsx`; `utils/product-form-utils.ts`, `utils/product-record-utils.ts`; `constants/products-detail-config.ts` | Starter creation fields, Fulfillment toggle, defaults and section-specific saving, marketplace permission. |
| A1 | `pages/dashboard/organization/emails/EmailCustomizationPage.ts` | Reusable navigation/page-object and save-response assertion patterns, not existing refund-policy coverage. |

Additional setup sources at the same supplied snapshots:

* Backend `apps/venues/admin/admin.py` → `VenueCustomerRefundPolicyAdmin` (line 254), registered at line 601: searchable organization policy list, Venue lookup, and no add prohibition. `apps/core/admin/mixins.py` → `BaseModelAdmin.has_add_permission` and `BaseHistoryModelAdmin`: ordinary model add permission applies; this policy has no special add restriction. Backend `urls.py` mounts administration at `/admin/`. The model's standard admin list is `/admin/venues/venuecustomerrefundpolicy/`; this is source-derived route information, not a live navigation result.

* Backend `apps/main/models/feature_flags.py` and `apps/main/admin/admin.py` → `FeatureFlagForm`: exact flag activation precedence and administration fields.
* Frontend `packages/core/src/shared/constants/waffle-flags.ts`; event ticket types `list/useEventTicketTypeCopy.ts`: copy and optional event-creation flag names.
* Frontend navigation `packages/core/src/app-contexts/dashboard/components/navigation/DashboardNavBarUserMenu/hooks/route-sections/` → `dashboard-route.ts`, `organization-routes.ts`, `build-routes.ts`: Dashboard entry, permissions, Events module, product pricing-tier gates.
* Frontend `packages/next-app/pages/manage/organization/settings/customer-refunds/index.tsx`: permission-gated policy page without a dedicated feature flag.

PR follow-up sources, read at the same supplied commits:

* Backend `apps/main/templates/venues/settings/_customer-refunds.html`, `edit-organization.html`, and `apps/main/templates/navigation/dashboard/side-menu.html`: legacy tab, permission gate, and Organization Info entry. The embedded URL uses `isLegacy=true&showSidebar=false&showHeader=false`.
* Backend `apps/venues/dashboard/views.py` → `edit`, `apps/core/flags.py`: `enable_organization_settings_nextjs_embed` controls replacement of the old Organization Info screen. Legacy route: `/dashboard/venues/edit/`, from `urls.py`, `apps/main/dashboard/urls.py`, and `apps/venues/dashboard/urls.py`. Use the same site as the selected organization; no record ID is required.
* Backend `apps/main/templates/tickets/dialogs/_edit-ticket-type.html` and `apps/main/templates/dashboard/inventory/products/_create-edit-form.html`: legacy item refund sections/status messages.
* Frontend `DashboardTopBar.tsx`, `NavBarMobileModal.web.tsx`, `useNavBarActions.ts`, and `navigation-translations.ts`: narrow-screen language selection; `shared/assets/locales/fr/dashboard-organization.json`, `dashboard-events.json`, `dashboard-products.json`, `constants.json`: French labels/options.
* Frontend transactions `ui/components/TransactionActions/TransactionActions.web.tsx` and `modals/RefundDialog/RefundDialog.web.tsx`: Refund action, Refund transaction dialog, and Close. TC-12 uses existing eligible orders and does not submit a refund.

Standards: [[00 Start Here/World-Class Software Quality Standard]], [[06 Prompts/Showpass QA Test Case Generator]], [[05 Tooling/Qase Test Case Writing Rules]].

## Source-backed Behavior

**Reviewed 2026-10-27 against current local develop in both repositories; see the Start Here review for exact revisions.**

* The organization rollout flag and Admin **Customer Self Refund Settings** gate access. With the Admin setting off, the employee sees the disabled notice and no editable form; saving is also rejected by the backend.
* The policy has one enable switch plus separate organization ticket and product switches. There is no Customer outcome dropdown. Individual item participation remains separate and saved values survive policy changes.
* New policies start off, with both organization item-type switches on. New individual ticket/product defaults follow whether the policy is on; changing the policy does not rewrite existing item settings.
* Five cutoff shapes remain supported. Absolute needs a date/time in the organization timezone; relative needs a positive whole number and Hours/Days. Switching shapes clears irrelevant details.
* Barcode, fulfillment/shipping, and check-in restrictions are on/off switches; on allows that state but does not bypass the other eligibility checks. The three mixed-order choices are unchanged.
* Refund amounts always shows Automated return medium (Revert Funds / Organizer Credit), Automated return refund type (three ordinary refund types), and Shipping refund rule (four choices), including while the policy is off. The old amount-enable switch and fee multiselect are retired.
* Policy and organization money settings save together. A refused or invalid save must not update only one part. Organization permissions, ownership, and rollout checks still apply.
* With nothing eligible, My Orders hides Return order. Current returns retain the purchased package parent; the previous blanket package-selection failure is not a current expected result. Unsupported Child-revenue packages remain blocked.
* The current amount calculation follows the saved refund type and refund medium plus the shipping rule. A previously reviewed amount cannot be submitted after destination/type/rule changes, even if its total stays equal. Old or incomplete shipping records can require organizer assistance rather than a guessed refund.

## Prerequisites and Recommended Test Data

### Terms

* **Organization / venue:** the organizer account selected in Dashboard; backend code calls it a venue.
* **Ticket type:** a named ticket option within an event, such as General Admission.
* **Product variant:** an option belonging to a product, such as a shirt size. The refund switch belongs to the product, not the variant.
* **Customer-initiated refund:** a refund started by the customer. This differs from an employee refunding an order in Dashboard.
* **Mixed eligibility:** an order containing both refundable and nonrefundable items; here only the saved rule is checked.

### Required flags, modules, and permissions

| Capability                              | Required setup                                                                                                                           | Where / who                                                                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Display the customer refund policy page | `enable_venue_policy_customer_self_refunds` on for selected organization; Manage Organization Info permission; create a missing policy through administration as described below | Dashboard → Organization → Organization settings → Customer refunds. |
| Customer-policy rollout                 | `enable_venue_policy_customer_self_refunds` active for the selected organization                                                          | Showpass Admin → Feature Flags. This gates the policy API and customer-policy behavior.                                        |
| Edit a ticket type's refund switch      | Events module enabled; Manage Events permission                                                                                          | Dashboard → Build → Events → All events → select the event → Tickets → Edit ticket type → Basic info. No separate refund flag. |
| Edit a product's refund switch          | Manage Marketplace permission; organization not on Basic pricing tier                                                                    | Dashboard → Build → Products → All products → select the product → Fulfillment. No shipping flag required.                     |
| Copy a ticket type, TC-9 only           | `enable_ticket_type_copy` active for the organization                                                                                    | Showpass administrator → Feature Flags.                                                                                        |
| Copy a recurring ticket type            | `enable_recurring_ticket_type_copy` in addition to the copy flag                                                                         | Not required for these single-day copy cases.                                                                                  |
| Use the migrated Create event flow      | `enable_event_create_nextjs`                                                                                                             | Optional; not needed to edit the existing event used by these cases.                                                           |
| Turn on the saved policy                | Enable customer refund policy = on                                                                                                       | A setting in Customer refunds, not a feature flag. Default/off-state cases intentionally start with it off.                    |
| Allow paid customer returns | Admin Customer Self Refund Settings on; policy on; relevant organization item-type switch on | Three separate requirements; individual purchased item participation and all other eligibility checks still apply. |
| Include a ticket/product in the policy  | Allow customer-initiated refunds = on                                                                                                    | Ticket type Basic info or product Fulfillment; independent of the policy switch.                                               |

For organization-scoped feature-flag activation, the administrator opens **Feature Flags**, searches the exact flag name, and records its existing values. With **Everyone = Unknown**, add the numeric organization ID to **Included venue ids** and ensure it is absent from **Excluded venue ids**, then select **Save**. Obtain the ID from the organization's administration record. Exclusion wins over all enablement; **Everyone = No** overrides inclusion. A global No/Yes rollout setting must be handled by its owner rather than changed just to execute one case. Refresh Dashboard after an approved flag change. Ordinary organizer permissions do not grant feature-flag administration access. TC-9 needs the copy flag; TC-11 needs the legacy settings routing flag off. `use_manage_page` is not a case prerequisite.

The saved `enable_automated_returns` setting is now required for saving; under rollout its Admin label is **Customer Self Refund Settings**. Shipping & Fulfillment is needed only for delivery setup, not basic form editing. No flags or permissions were changed while drafting these cases.

### Create the organization's policy through administration

A policy is a separate saved configuration record linked to one organization. **Is enabled** is a field on that record; creating the record does not require turning it on.

1. Sign in to **Showpass administration** with a staff account allowed to view/add the **Venue customer refund policy** model. Editing existing records requires change permission too.
2. Open that model's list. Search for the organization's **name or slug** and check whether it already has a record.
3. If the record exists, open it, confirm **Venue**, and record its current settings. Reuse it; do not add a duplicate.
4. If it does not exist, select **Add**. In **Venue**, use the lookup control to select the intended organization by name.
5. Leave **Is enabled** unchecked. Keep both organization ticket/product switches on and **Cutoff type → No cutoff**; leave date/duration fields empty. The former Outcome field is no longer part of this setup.
6. Set **Barcode delivery behavior**, **Fulfillment behavior**, and **Checked in behavior** to **Block customer refunds**. Set **Mixed cart behavior** to **Block when any remaining item is ineligible**.
7. Select **Save**, reopen the record, and confirm the organization and values.
8. Sign in to Dashboard as an employee with **Manage Organization Info**, then open **Organization → Organization settings → Customer refunds** to edit the existing policy through the frontend supplied in this request.

Before employee editing, the administrator enables **Customer Self Refund Settings** on the organization’s **Admin → Venues → Venues** record. The employee then enables the policy through Customer refunds; there is no separate Outcome choice. Do not do that before cases which explicitly test the disabled defaults. Ticket/product participation is configured separately.

**Deployment distinction:** backend source registers this admin model and permits adding it through normal model permissions. The supplied frontend also implements an edit page, but has no policy-creation button. Neither screen has been inspected live. If the administration model or Dashboard page is absent, verify the deployed revision and access permissions; their absence is not a reason to invent another setup step.

**Bulk provisioning, not a manual prerequisite:** new organizations receive a disabled policy automatically. Existing organizations may be populated in bulk using `misc/scripts/2026/spw_19667_backfill_customer_refund_policies.py` after migrations `venues/0277`, `tickets/0365`, and `inventory/0050`. That script is optional when creating the single missing policy in administration. No admin changes, migrations, or backfill were executed during this task.

### Event and ticket types

* Have the organizer/environment owner provide a dedicated, unpublished single-day event **Refund Policy Event** in the selected organization, with no orders or sales, no assigned seating, no packages, no required special integrations, and a valid saved timezone. Use a start date 30 days after execution at 18:00 and an end time of 22:00. Record the actual dates. Full event creation is existing functionality; a pre-created event avoids unrelated event-creation requirements blocking this ticket.
* Open **Dashboard → Build → Events → All events**, select **Edit** for that event, then open **Tickets**. Add a ticket type using **Add ticket type**: name **Refund Ticket**, price **10.00**, inventory **10**. Add a second type **Control Ticket**, price **12.00**, inventory **10**. Select **Save**. Keep the event unpublished and do not purchase either type.
* Use the row's **Edit ticket type** action for each ticket and open **Basic info**. Under **Customer refunds**, verify **Allow customer-initiated refunds** is off initially. If these are existing ticket types, record their original settings before setting them off and saving.
* Record each ticket's name, price, inventory, and refund switch. Keep Control Ticket off; it detects accidental whole-event overwrites when Refund Ticket is saved.

### Product creation

1. In Dashboard, open **Build → Products → All products** and select **Create product**.
2. Enter **Product Name: Refund Policy Product**; choose the recorded category; enter **Variant Name: Standard** and **Price: 5.00**.
3. Select **Create product**. The saved product opens on Basic info.
4. Open **Fulfillment**. Under **Customer refunds**, verify **Allow customer-initiated refunds** is off. Record the existing Delivery, Transfers, and Purchase confirmation choices; do not change them for these cases.
5. Keep this product in the dedicated organization with no purchases. Shipping setup, a shipping address, a second variant, and event add-on attachment are unnecessary for testing this product-owned switch.

### Initial policy settings — reference only

The defaults are listed under Source-backed Behavior for reference. Each case specifies only the starting settings it needs; do not reset the entire policy before every case. TC-1 can use an existing or newly created policy; its purpose is saving changes, not checking first-time defaults. Keep the second organization at its recorded original settings before TC-8 preparation.

## State-space / Setup Matrix

| Axis / entry path | Meaningful values | Coverage decision |
| --- | --- | --- |
| Policy entry | Organization → Organization settings → Customer refunds; freshly reopened page | TC-1–TC-4, TC-6, TC-8; manual-only, unexecuted. |
| Item entry | Existing ticket → Basic info; newly created product → Fulfillment; copied saved ticket | TC-5, TC-9; different creation states explicitly handled in setup. |
| Organization switches | Policy on/off; ticket and product eligibility on/off | TC-1, TC-4, TC-5, TC-15. |
| Cutoff | All five modes; Hours/Days; switch from incompatible saved mode | TC-2. |
| Invalid cutoff | Blank absolute date; blank relative value/unit; zero; negative; recovery to 1 | TC-3. |
| Restriction selects | Each block/allow choice; all three mixed-order choices | TC-4. |
| Roles / tenancy | Policy manager; item manager without policy permission; A versus B | TC-7, TC-8. |
| Save lifecycle | Clean save, reload, disable/re-enable, unsaved reload | TC-1–TC-6. |
| Existing/new records | Existing or newly created policy; saved items; copied ticket | TC-1, item prerequisites, TC-5, TC-9. |
| Refund completion | Allowed/blocked customer request; scanned/shipped/delivered and mixed-order behavior | Deferred to dependent eligibility work; no assertion of runtime support here. |

## PR Verification Scope and How to Execute

The PR adds first-time defaults, English/French checks, disabling the policy while retaining item switches, staff refund controls, and the legacy Organization Info tab. These are reflected in the cases below. Creating an admin policy remains preparation for editing cases; TC-10 alone verifies first-time defaults.

**Local development only:** run the companion backend and apply its migrations, then start the frontend with `pnpm run next:start`; the PR states that this regenerates backend-provided enums. These commands are not steps for an organizer using an already deployed site. Neither command was executed for this draft.

**Policy setup:** enable the organization-scoped rollout flag. In **Admin → Venues → Venues**, save **Customer Self Refund Settings = on**. In **Admin → Venues → Venue customer refund policies**, find the organization or **Add → Venue → select the organization → Save**. Each case lists the required starting values and employee permissions.

**French execution:** cases TC-1–TC-5 and TC-10 have Language: English, French. Run each scenario once in each language. To select French using the source-backed Dashboard control, narrow the browser until the profile button opens **Main menu**, choose **French**, then widen it again for the Desktop checks. The desktop profile menu itself does not expose this language selector in the supplied source. Use the French field names in the table below; dates and numbers stay those specified in the case. Verify labels, options, success messages, errors, and warnings are translated and readable. Restore the original language afterward.

| English control or message | French text from source |
| --- | --- |
| Customer refunds | Remboursements clients |
| Enable customer refund policy | Activer la politique de remboursement client |
| Cutoff type | Type de coupure |
| No cutoff | Aucune date limite |
| Absolute date and time | Date et heure absolues |
| Before event start | Avant le début de l’événement |
| Before item or session start | Avant le début de l’article ou de la séance |
| Manually closed | Fermé manuellement |
| Cutoff date and time | Date et heure limites |
| Time before cutoff reference | Temps avant la référence de coupure |
| Unit | Unité |
| Hours | Heures |
| Days | Jours |
| After barcode delivery | Après la livraison du code-barres |
| After fulfillment or shipping | Après traitement ou expédition |
| After check-in or scan | Après l'enregistrement ou le scan |
| Orders with mixed eligibility | Commandes avec des critères d'éligibilité mixtes |
| Refund eligible items independently | Rembourser séparément les articles admissibles |
| Require the whole remaining order | Exiger la totalité de la commande restante |
| Block when any remaining item is ineligible | Bloquer si un article restant n’est pas admissible |
| Allow customer-initiated refunds | Autoriser les remboursements à l'initiative du client |
| Customer refund policy saved | Politique de remboursement client enregistrée |
| This field is required. | Ce champ est obligatoire. |
| Enter a value of at least 1. | Saisissez une valeur d'au moins 1. |
| The organization's customer refund policy is enabled. | La politique de remboursement des clients de l’organisation est activée. |
| The organization's customer refund policy is disabled. This setting will take effect only after the policy is enabled. | La politique de remboursement des clients de l’organisation est désactivée. Ce paramètre prendra effet seulement après l’activation de la politique. |

## Qase-ready Manual Test Cases

In these cases, **organization** is the Dashboard name for the venue selected in Showpass Admin. The **customer refund policy** holds the organization's rules. A ticket type or product also has its own **Allow customer-initiated refunds** switch. The **cutoff** is when customers must stop requesting refunds. The cases check saved settings; they do not submit customer refunds.

### TC-1: Dashboard - Refunds - Review and save the organization's customer refund settings

**Description:** Open an existing organization policy and inspect the current fields below. Save the policy on and then off; both saved states and all unrelated choices must survive reopening.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| Section | Expected fields and choices |
| --- | --- |
| Customer refund policy | Enable customer refund policy; Allow customer refunds for tickets; Allow customer refunds for products — three on/off switches. |
| Refund cutoff | Cutoff type: No cutoff, Absolute date and time, Before event start, Before item or session start, Manually closed. |
| Conditional cutoff details | Absolute: Cutoff date and time with organization timezone. Relative: Time before cutoff reference and Unit (Hours/Days). No cutoff or Manually closed: no extra fields. |
| Eligibility restrictions | Allow customer refunds after barcode delivery; after fulfillment or shipping; after check-in or scan — three on/off switches. |
| Orders with mixed eligibility | Refund eligible items independently; Require the whole remaining order; Block when any remaining item is ineligible. |
| Automated return medium | Revert Funds; Organizer Credit. |
| Automated return refund type | Base refund; Full refund excluding Showpass fees; Full refund (Showpass fees invoiced). |
| Shipping refund rule | Never refund shipping; Refund after all shipped items sharing the charge are refunded; Refund shipping proportionally; Refund shipping for unshipped items only. |
| Page footer | Save. All three Refund amounts dropdowns remain visible while the policy is off. |

**Tags:** dashboard, refunds

**Parameters:**
Language: English, French

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* For Language, narrow the browser to show **profile → Main menu**, select **English** or **French**, then widen it for the desktop checks. Record the original language; use the matching translated labels.
* Record every displayed value, then save **Enable customer refund policy = off** before starting. No purchase is needed.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. | Language | The four sections and Save are shown in the selected language. |
| Inspect the Customer refund policy switches. |  | The policy is off; the ticket and product switches match their recorded values. |
| Inspect Refund cutoff. | Recorded cutoff and field table | Only the inputs needed by the saved cutoff are displayed with the correct organization timezone. |
| Inspect Eligibility restrictions. | Recorded values | All three restriction switches and Orders with mixed eligibility show the saved choices. |
| Open each Refund amounts dropdown, then close it without selecting a value. | Choices in the field table | Both refund methods, all three refund types, and all four shipping rules are available. |
| Turn on Enable customer refund policy. |  | The policy switch is on and the other values stay as recorded. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload Customer refunds. |  | The policy remains on and the other recorded values are unchanged. |
| Turn off Enable customer refund policy. |  | The switch is off; all Refund amounts dropdowns remain visible. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload Customer refunds. |  | The policy remains off and every other recorded choice is retained. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and language, save and reopen; retain any newly created policy disabled.

### TC-2: Dashboard - Refunds - Change when customer refunds close

**Description:** A cutoff sets the last time a customer may request a refund. For each row below, save the starting choice, change it to the new choice, and reload. The new choice must stay saved, and details from the old choice must not return.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| CutoffScenario | Starting cutoff | New cutoff | New details |
| --- | --- | --- | --- |
| AbsoluteDateTime | Before event start: 48 Hours | Absolute date and time | Today + 14 days at 12:30 |
| EventHours | Absolute date and time | Before event start | 48 Hours |
| EventDays | Absolute date and time | Before event start | 2 Days |
| ItemHours | Absolute date and time | Before item or session start | 24 Hours |
| ItemDays | Absolute date and time | Before item or session start | 1 Day |
| NoCutoff | Before item or session start: 2 Days | No cutoff | No additional fields |
| ManuallyClosed | Absolute date and time | Manually closed | No additional fields |

**Tags:** dashboard, refunds

**Parameters:**
Language: English, French
CutoffScenario: AbsoluteDateTime, EventHours, EventDays, ItemHours, ItemDays, NoCutoff, ManuallyClosed

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* Choose the case's English or French language in Dashboard. On a narrow screen, open the profile button → Main menu → choose the language; then widen the screen again. Check that labels, messages, and errors appear in the chosen language.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. This is a separate record from the Venue page.
* Record the original settings before changing them. In Customer refunds, turn Enable customer refund policy on and Save before preparing the starting cutoff. No customer refund is submitted.
* In Customer refunds, save the Starting cutoff from the selected row. For any absolute cutoff, use today + 14 days at 12:30 in the displayed organization timezone and record the date.
* For the AbsoluteDateTime row, use a computer timezone different from the organization's timezone and record both timezones. The saved cutoff must still show the organization's time.
* In a French run, use the French equivalents of the English control names below. Confirm that messages and errors also appear in French.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. | Chosen row from the cutoff table | The cutoff saved during setup is shown. |
| Select Cutoff type. | New cutoff from the selected row | Only the fields needed for the new cutoff appear. |
| Enter the new cutoff details, if fields are displayed. | New details from the selected row | The date/time or duration matches the row; No cutoff and Manually closed show no extra fields. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload the page. |  | The new cutoff and details remain saved. An absolute date shows the same time in the organization's timezone. |
| Select the old Cutoff type without saving. | Starting cutoff from the chosen row | Its previous date or number does not reappear. |
| Reload without saving. |  | The new saved cutoff is shown again. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Change Dashboard back to its original language.
* Restore the recorded policy choices, save, and reload to confirm. If you created a policy for this case, leave it saved and off.
* Restore the computer timezone if changed.

### TC-3: Dashboard - Refunds - Reject a refund cutoff with missing or invalid details

**Description:** Start with **No cutoff** saved. Try to save each incomplete or invalid choice below. The page must keep **No cutoff** until the missing or invalid value is corrected; the corrected choice must then stay saved after reloading.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| InvalidCutoff | Cutoff type | Invalid entry | Correction |
| --- | --- | --- | --- |
| MissingDateTime | Absolute date and time | Leave Cutoff date and time empty | Today + 14 days at 12:30 in displayed timezone |
| MissingValue | Before event start | Leave Time before cutoff reference empty; select Hours | 1 Hour |
| MissingUnit | Before item or session start | Enter 1; leave Unit unselected | 1 Day |
| ZeroValue | Before event start | Enter 0; select Hours | 1 Hour |
| NegativeValue | Before item or session start | Enter -1; select Hours | 1 Hour |

**Tags:** dashboard, refunds, edge-case

**Parameters:**
Language: English, French
InvalidCutoff: MissingDateTime, MissingValue, MissingUnit, ZeroValue, NegativeValue

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* Choose the case's English or French language in Dashboard. On a narrow screen, open the profile button → Main menu → choose the language; then widen the screen again. Check that labels, messages, and errors appear in the chosen language.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. This is a separate record from the Venue page.
* Record the current policy choices so you can restore them afterward. No order is needed.
* In Customer refunds, set Cutoff type to No cutoff, select Save, and reload. Choose one InvalidCutoff row.
* In a French run, use the French equivalents of the English control names below. Confirm that messages and errors also appear in French.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. |  | No cutoff is shown. |
| Select Cutoff type. | Cutoff type from the selected row | The date or duration fields appear. |
| Enter the incomplete or invalid details. | Invalid entry from the selected row | The entry is displayed or the input prevents the invalid value. |
| Attempt to select Save. |  | The incomplete or invalid cutoff is not saved; a field error or input restriction explains what must be corrected. |
| Reload the page. |  | No cutoff is still saved. |
| Select Cutoff type again. | Cutoff type from the selected row | The date or duration fields appear. |
| Enter the complete corrected details. | Correction from the selected row | The form shows a complete date/time or a duration of 1 with the specified unit. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload the page. |  | The corrected cutoff remains saved. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Change Dashboard back to its original language.
* Restore the recorded policy choices, save, and reload to confirm. If you created a policy for this case, leave it saved and off.
* If the number field changes what you typed, record both the typed number and the displayed number.

### TC-4: Dashboard - Refunds - Save one customer refund rule without changing the others

**Description:** Change one rule for barcode delivery, shipping, check-in, or orders containing both returnable and nonreturnable items. After saving and reloading, that choice must stay saved and the other rules must remain as they were. No order is needed.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| PolicyChoice | Field | New choice | Starting choice |
| --- | --- | --- | --- |
| TicketsAllowed | Allow customer refunds for tickets | On | Off |
| ProductsAllowed | Allow customer refunds for products | On | Off |
| BarcodeAllow | Allow customer refunds after barcode delivery | On | Off |
| ShippingAllow | Allow customer refunds after fulfillment or shipping | On | Off |
| ScanAllow | Allow customer refunds after check-in or scan | On | Off |
| EligibleItemsOnly | Orders with mixed eligibility | Refund eligible items independently | Block when any remaining item is ineligible |
| WholeRemainingOrder | Orders with mixed eligibility | Require the whole remaining order | Block when any remaining item is ineligible |

**Tags:** dashboard, refunds

**Parameters:**
Language: English, French
PolicyChoice: TicketsAllowed, ProductsAllowed, BarcodeAllow, ShippingAllow, ScanAllow, EligibleItemsOnly, WholeRemainingOrder

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* Choose the case's English or French language in Dashboard. On a narrow screen, open the profile button → Main menu → choose the language; then widen the screen again. Check that labels, messages, and errors appear in the chosen language.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. This is a separate record from the Venue page.
* Record the current policy choices so you can restore them afterward. No order is needed.
* Choose one PolicyChoice row. In Customer refunds, save that field to its Starting choice and record all displayed settings.
* In a French run, use the French equivalents of the English control names below. Confirm that messages and errors also appear in French.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. | Chosen row from the settings table | The selected field shows its Starting choice. |
| Change the field listed in the selected row. | New choice | The field shows the new choice. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload the page. |  | The new choice remains saved. |
| Compare the other policy settings with their recorded values. |  | All other settings are unchanged. |
| Change the same field back. | Starting choice | The original choice is selected. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload the page. |  | The Starting choice remains saved. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Change Dashboard back to its original language.
* Restore the recorded policy choices, save, and reload to confirm. If you created a policy for this case, leave it saved and off.

### TC-5: Dashboard - Refunds - Keep a ticket or product refund choice when the organization policy changes

**Description:** With the organization policy off, turn on **Allow customer-initiated refunds** for a ticket type or product and save it. Check that the choice survives a name change and stays on when the organization policy is turned on and then off again. The message beside the item switch must reflect whether the organization policy is on or off.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| ItemType | Entry path | Item | Name field | Save message |
| --- | --- | --- | --- | --- |
| TicketType | Dashboard → Build → Events → All events → Edit the prepared event → Tickets → Edit Refund Ticket → Basic info | Refund Ticket | Name on Basic info | Ticket type basic info updated successfully |
| Product | Dashboard → Build → Products → All products → Refund Policy Product → Fulfillment | Refund Policy Product | Product Name on Basic info | Product saved. |

**Tags:** dashboard, refunds

**Parameters:**
Language: English, French
ItemType: TicketType, Product

**Preconditions:**

* Employee permissions: **Manage Organization Info**, plus **Manage Events** for TicketType or **Manage Marketplace** for Product.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* Choose the case's English or French language in Dashboard. On a narrow screen, open the profile button → Main menu → choose the language; then widen the screen again. Check that labels, messages, and errors appear in the chosen language.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. This is a separate record from the Venue page.
* Record the current policy choices so you can restore them afterward. No order is needed.
* In Customer refunds, save Enable customer refund policy off.
* TicketType: For tickets, enable the Events module. Use an unpublished, nonrecurring event with a saved timezone, future dates, and no sales. In its Tickets page, add **Refund Ticket**, price **10.00**, inventory **10**, then Save; an existing ticket with these conditions can be reused. Also add **Control Ticket**, price **12.00**, inventory **10**, with its refund switch off.
* Product: For products, the organization must be on a non-Basic plan. Open Build → Products → All products → Create product: name **Refund Policy Product**, first saved category alphabetically, variant **Standard**, price **5.00** → Create product. Use a product with no purchases.
* In the selected item’s Customer refunds section, record its switch and save Allow customer-initiated refunds off. Record the name, price, and inventory; for products also record category, Delivery, Transfers, and Purchase confirmation choices.
* In a French run, use the French equivalents of the English control names below. Confirm that messages and errors also appear in French.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the selected item’s refund settings from Dashboard. | Entry path in the ItemType table | The item switch is off and the message says the organization policy is disabled. |
| Turn on Allow customer-initiated refunds. |  | The item switch is on. |
| Select Save. |  | The item save message listed in the table appears. |
| Reload the page. |  | The item switch remains on while the organization-policy message still says disabled. |
| Open the item’s Basic info page. | Same ticket or product | The current item name is shown. |
| Change the item name. | Append Review to the original name | The new name is shown. |
| Select Save. |  | The item save confirmation appears. |
| Reopen the renamed item’s refund settings. | Ticket: Basic info; product: Fulfillment | Allow customer-initiated refunds is still on. |
| Open Dashboard → Organization → Organization settings → Customer refunds. |  | The organization policy is still off. |
| Turn on Enable customer refund policy. | Leave both item-type switches unchanged | The policy switch is on. |
| Select Save. |  | Customer refund policy saved appears. |
| Reopen the renamed item’s refund settings. | Ticket: Basic info; product: Fulfillment | The message now says the organization policy is enabled and the item switch is still on. |
| Open Dashboard → Organization → Organization settings → Customer refunds. |  | The policy is enabled. |
| Turn off Enable customer refund policy. |  | The policy switch is off. |
| Select Save. |  | The policy save confirmation appears. |
| Reopen the renamed item’s refund settings. | Ticket: Basic info; product: Fulfillment | The disabled-policy warning appears and the item switch is still on. |
| Turn off Allow customer-initiated refunds. |  | The item switch is off. |
| Select Save. |  | The item save confirmation appears. |
| Reload the page. |  | The item switch remains off. |
| Compare the other item values with those recorded before editing. | TicketType: also open Control Ticket’s Basic info | Prices, inventories, other recorded settings, and Control Ticket’s off switch are unchanged. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Change Dashboard back to its original language.
* Restore the recorded policy choices, save, and reload to confirm. If you created a policy for this case, leave it saved and off.
* Restore the original item name and switch, save, and reopen. Keep created items without sales and the event unpublished.

### TC-6: Dashboard - Refunds - Discard an unsaved refund setting

**Description:** Change the refund method and shipping rule without saving. Reloading must restore both original choices.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* Save Revert Funds and Never refund shipping, then record the complete saved form.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. |  | Revert Funds and Never refund shipping are shown. |
| Set Automated return medium to Organizer Credit. |  | Organizer Credit is shown as an unsaved choice. |
| Set Shipping refund rule to Refund shipping proportionally. |  | The new shipping choice is shown. |
| Reload the page without selecting Save. |  | Revert Funds and Never refund shipping return; the other recorded settings are unchanged. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

### TC-7: Dashboard - Refunds - Let an employee edit tickets without access to organization refund settings

**Description:** An employee who can edit tickets and products but lacks **Manage Organization Info** can see whether the organization policy is on or off and save a ticket's refund switch. They cannot open the organization's Customer refunds settings to edit that policy.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds, employee-permissions

**Preconditions:**

* The employee being checked has **Manage Events** and **Manage Marketplace**, but does not have **Manage Organization Info** or full administrator access. A separate employee with **Manage Organization Info** prepares the policy and checks it afterward.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. This is a separate record from the Venue page.
* For tickets, enable the Events module. Use an unpublished, nonrecurring event with a saved timezone, future dates, and no sales. In its Tickets page, add **Refund Ticket**, price **10.00**, inventory **10**, then Save; an existing ticket with these conditions can be reused.
* For products, the organization must be on a non-Basic plan. Open Build → Products → All products → Create product: name **Refund Policy Product**, first saved category alphabetically, variant **Standard**, price **5.00** → Create product. Use a product with no purchases.
* The employee preparing the records notes the original values, turns **Enable customer refund policy** off, and saves **Allow customer-initiated refunds** off on both items. Give the restricted employee access to the prepared event.
* The employee preparing the records copies the Customer refunds page link for this organization so the restricted employee can try opening it directly.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Sign in to Dashboard as the employee without Manage Organization Info. |  | The employee can access the prepared event and product. |
| Inspect the Organization navigation. |  | Organization settings does not provide access to edit Customer refunds. |
| Open the Customer refunds link copied during setup. | Same organization | The employee cannot open the policy form or save changes to it. |
| Open Dashboard → Build → Events → All events → Edit the prepared event → Tickets → Edit Refund Ticket → Basic info. |  | The ticket switch is off and the message says the organization policy is disabled. |
| Turn on Allow customer-initiated refunds. |  | The ticket switch is editable and turns on. |
| Select Save. |  | Ticket type basic info updated successfully appears. |
| Reload the page. |  | The ticket switch remains on. |
| Open Dashboard → Build → Products → All products → Refund Policy Product → Fulfillment. |  | The product page also shows the disabled organization-policy message. |
| Sign in as the employee who prepared the records. |  | This employee can access Organization settings. |
| Open Dashboard → Organization → Organization settings → Customer refunds. |  | The organization policy matches the settings recorded before the employee’s edits. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the recorded policy choices, save, and reload to confirm. If you created a policy for this case, leave it saved and off.
* As the employee who prepared the records, restore the item switches, save, and reopen. Keep created items without sales and the event unpublished.

### TC-8: Dashboard - Refunds - Keep customer refund settings separate for two organizations

**Description:** Give two organizations different refund deadlines, refund methods, refund types, and shipping rules. Change the first organization's choices, then return to the second organization. Its settings must remain unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds, employee-permissions

**Preconditions:**

* Employee permission: **Manage Organization Info** in both organizations. Record their names as the first and second organization for this run.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* Both organizations are included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* Admin → Venue customer refund policy: find each organization’s existing record. If missing, Add → select that organization in Venue → leave defaults → Save.
* In Admin → Venues → Venues, save **Customer Self Refund Settings = on** for both organizations and record each original value.
* Record both organizations’ original refund settings. In Customer refunds, save the first organization with **Before event start → 48 Hours**, **Revert Funds**, **Base refund**, and **Never refund shipping**. Save the second with **No cutoff**, **Organizer Credit**, **Full refund excluding Showpass fees**, and **Refund shipping proportionally**. Reload each.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds in the first organization. |  | Its 48 Hours deadline, Revert Funds, Base refund, and Never refund shipping are shown. |
| Select the second organization in the Dashboard organization selector. |  | The second organization is active. |
| Open Organization → Organization settings → Customer refunds. |  | Its No cutoff, Organizer Credit, Full refund excluding Showpass fees, and proportional shipping choices are shown. |
| Select the first organization in the organization selector. |  | The first organization is active. |
| Open Organization → Organization settings → Customer refunds. |  | Before event start, 48 Hours is shown again. |
| Change the first organization's deadline and refund choices. | 24 Hours; Organizer Credit; Full refund (Showpass fees invoiced); Refund shipping for unshipped items only | The four new choices are displayed. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload the page. |  | All four changed choices remain saved in the first organization. |
| Select the second organization in the organization selector. |  | The second organization is active. |
| Open Organization → Organization settings → Customer refunds. |  | No cutoff and all other second-organization settings remain unchanged. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the recorded policy choices, save, and reload to confirm. If you created a policy for this case, leave it saved and off. Repeat for both organizations.

### TC-9: Dashboard - Refunds - Copy a ticket type without linking its refund choice to the original

**Description:** Copy a ticket type whose **Allow customer-initiated refunds** setting is saved on or off. The copy must start with the same setting. Changing the copy must leave the original ticket type unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds, tickets

**Parameters:**
OriginalRefundChoice: Enabled, Disabled

**Preconditions:**

* Employee permission: **Manage Events** and access to the prepared event.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save. This is a separate record from the Venue page.
* For tickets, enable the Events module. Use an unpublished, nonrecurring event with a saved timezone, future dates, and no sales. In its Tickets page, add **Refund Ticket**, price **10.00**, inventory **10**, then Save; an existing ticket with these conditions can be reused.
* Admin → Feature Flags: enable **`enable_ticket_type_copy`** for the selected venue. No recurring-copy flag is needed for this nonrecurring event. Record any flag settings changed.
* In Refund Ticket → Basic info → Customer refunds, record the original switch. Save Allow customer-initiated refunds on for Enabled or off for Disabled, then reload. Record existing ticket names before copying.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Build → Events → All events → Edit the prepared event → Tickets. |  | Refund Ticket is listed. |
| Select Copy ticket type on Refund Ticket. |  | A separate copied ticket type appears. |
| Open the copied ticket’s Edit ticket type action → Basic info. | Record the generated copy name | The copy’s Allow customer-initiated refunds switch matches the selected OriginalRefundChoice. |
| Set the copy’s Allow customer-initiated refunds switch to the opposite value. | Enabled: turn off; Disabled: turn on | The copy shows the opposite value. |
| Select Save. |  | Ticket type basic info updated successfully appears. |
| Reload the copied ticket’s Basic info. |  | The copy retains the new switch value. |
| Reopen the original Refund Ticket’s Basic info. |  | The original ticket retains the switch value saved before copying. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the recorded policy choices, save, and reload to confirm. If you created a policy for this case, leave it saved and off.
* Restore the original ticket’s switch and any feature-flag values changed during preparation.
* Keep the copy in the unpublished event without sales and record its name. Remove only that copy after review if it still has no sales.

### TC-10: Dashboard - Refunds - Check the starting refund settings for a new organization, ticket, and product

**Description:** Inspect an untouched new policy and new ticket/product. The organization policy and individual item switches start off, while the two organization item-type switches start on.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds

**Parameters:**
Language: English, French

**Preconditions:**

* Employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Marketplace**; Events enabled and product access available.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* Use a newly provisioned organization with an untouched policy. In Admin → Venues → Venue customer refund policies, find its record; if missing, Add → choose the organization → Save without editing policy fields. Do not reset an edited policy to imitate defaults.
* Keep the new organization’s refund method and type untouched; their new-organization defaults are Organizer Credit and Full refund excluding Showpass fees.
* Create an unpublished future single-day event. Under Tickets, add one General Admission ticket, price 10.00, inventory 10, without changing its refund switch.
* In Build → Products → All products → Create product, create one product with a saved category and one Standard variant, price 5.00; do not edit its refund switch or purchase it.
* For Language, narrow the browser to show **profile → Main menu**, select **English** or **French**, then widen it for the desktop checks. Record the original language; use the matching translated labels.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. | Language | The current form is shown in the selected language. |
| Inspect the three Customer refund policy switches. |  | The policy is off; Allow customer refunds for tickets and Allow customer refunds for products are both on. |
| Inspect Refund cutoff and Eligibility restrictions. |  | No cutoff is selected; all three restriction switches are off; Block when any remaining item is ineligible is selected. |
| Inspect Refund amounts. |  | Organizer Credit, Full refund excluding Showpass fees, and Never refund shipping are shown; all three dropdowns are visible. |
| Open the new ticket’s Basic info. |  | Allow customer-initiated refunds is off and the organization-policy warning is shown. |
| Open the new product’s Fulfillment page. |  | Allow customer-initiated refunds is off and the organization-policy warning is shown. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Keep the new event unpublished and the products without sales. Restore the original language; retain the policy disabled.

### TC-11: Dashboard - Refunds - Save customer refund settings from the older Organization Info page

**Description:** Open the older Organization Info page and use its Customer refunds tab to save a refund deadline. Open the newer Customer refunds page for the same organization and confirm the deadline matches. The older page is at `/dashboard/venues/edit/` on the same site when its menu link is unavailable.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* In Showpass Admin → Venue customer refund policies, search by organization name. Open its policy; if none exists, select Add → choose the organization in Venue → Save.
* In Showpass Admin → Feature Flags, turn **enable_organization_settings_nextjs_embed** off for this organization so the older Organization Info tabs appear. Record its original value for restoration.
* Open Dashboard → Settings → Organization Info and record the saved refund deadline. If that menu opens the newer settings page, use the older page address in this case's Description.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Settings → Organization Info on the older page. |  | The older settings tabs appear. |
| Select Customer refunds. |  | The refund form appears inside the tab without a second full Dashboard header or sidebar. |
| Select Cutoff type. | Before event start | The duration and unit fields appear inside the tab. |
| Enter Time before cutoff reference. | 48 | 48 is shown. |
| Select Unit. | Hours | Hours is selected. |
| Scroll to Save inside Customer refunds. |  | The form and Save control are reachable without clipping. |
| Select Save. |  | Customer refund policy saved appears. |
| Reload Organization Info and select Customer refunds again. |  | Before event start, 48 Hours is retained. |
| Open the newer Dashboard → Organization → Organization settings → Customer refunds page for the same organization. |  | The same 48 Hours deadline appears. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original cutoff, save, and reload. Restore only feature-flag values changed for this case.
* Retain any policy created during setup with Is enabled off.

### TC-12: Dashboard - Refunds - Keep the employee Refund action available after customer settings change

**Description:** Open an employee's Refund action for a paid order and record its choices and amount. Change the organization's customer refund settings and the ticket or product's **Allow customer-initiated refunds** setting. The employee's Refund action must still show the same choices and amount. Do not submit a refund.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds

**Parameters:**
ItemType: TicketType, Product

**Preconditions:**

* Employee permissions: **Manage Organization Info**, item-editing permission (**Manage Events** or **Manage Marketplace**), and the existing permissions needed to open the selected transaction’s Refund action.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* The selected organization is included in the `enable_venue_policy_customer_self_refunds` rollout flag.
* Admin → Venue customer refund policy: search the organization. Reuse its record, or Add → select Venue → leave defaults → Save.
* Use an existing paid, unrefunded card order containing one ticket for TicketType or one product for Product. Record its transaction identifier from Transactions, the item name, and its event/product editor. Do not use orders with pending refunds or activity by another employee.
* Before editing, record the policy’s Enable customer refund policy, ticket/product switches, and refund method/type values and the item’s Allow customer-initiated refunds value. Use the same employee and order for every comparison.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Transactions and select the recorded order. |  | The order details show the recorded item. |
| Open the transaction action menu and select Refund. |  | Refund transaction opens with the employee’s available refund options. |
| Record the available options and displayed amount. |  | The starting choices and amount are recorded for comparison. |
| Select Close. |  | The dialog closes without submitting a refund. |
| Open Organization → Organization settings → Customer refunds. |  | The policy is shown. |
| Turn on Enable customer refund policy and select Customers cannot initiate refunds. |  | The policy is on with customer refunds blocked. |
| Select Save. |  | The policy save confirmation appears. |
| Open the recorded item’s refund settings. | Ticket: event → Tickets → Edit ticket type → Basic info; product: Fulfillment | The saved item switch is shown. |
| Turn on Allow customer-initiated refunds. |  | The item switch is on. |
| Select Save. |  | The item save confirmation appears. |
| Reopen the same transaction → Refund. |  | The employee still has the recorded refund options and amount. |
| Select Close. |  | No refund is submitted. |
| Reopen the item’s refund settings and turn Allow customer-initiated refunds off. |  | The item switch is off. |
| Select Save. |  | The item save confirmation appears. |
| Reopen the same transaction → Refund. |  | The employee still has the recorded refund options and amount. |
| Select Close. |  | The order remains unrefunded. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and item settings, save, and reopen.
* Do not select the final Refund button; this case verifies controls, not money movement.

### TC-13: Dashboard - Refunds - Showpass has disabled customer self-refunds

**Description:** An organization is in the rollout but Showpass has not enabled Customer Self Refund Settings in Admin. The employee must see the disabled notice and cannot edit this form.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* In Admin → Venues → Venues, find this organization, record Customer Self Refund Settings, turn it off, and Save. Use an organization whose customer-return access is approved for this temporary change.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open Dashboard → Organization → Organization settings → Customer refunds. |  | Customer self-refunds are disabled. Contact Showpass to enable them. is shown. |
| Inspect the content and footer. |  | The editable policy controls and Save are absent. |
| Reload the page. |  | The same notice remains; no customer-refund configuration changed. |

**Postconditions:**

* Restore the recorded Admin setting and reopen Customer refunds. No order or refund was created.

### TC-14: Dashboard - Refunds - Reject saving if Showpass disables self-refunds while the form is open

**Description:** An employee opens the editable form, then an administrator disables customer self-refunds. Saving changes from the open form must fail without saving either the policy or refund method.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

**Tags:** dashboard, refunds

**Preconditions:**

* Employee permission: **Manage Organization Info**.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* Use separate employee and administrator sessions for the same organization. Save policy off, Revert Funds, No cutoff, and Never refund shipping; record these values.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| As the employee, open Dashboard → Organization → Organization settings → Customer refunds. |  | The editable form shows the recorded values. |
| Turn on Enable customer refund policy. |  | The policy change is unsaved. |
| Set Automated return medium to Organizer Credit. |  | The method change is unsaved. |
| As the administrator, turn off Customer Self Refund Settings in Admin → Venues → Venues and Save. | Same organization | The Admin setting is off. |
| As the employee, select Save on the still-open form. |  | Saving is rejected; no successful-save message appears. |
| Reload the employee page. |  | The disabled customer-self-refund notice replaces the form. |
| As the administrator, restore Customer Self Refund Settings to on and Save. |  | The Admin setting is restored. |
| As the employee, reopen Customer refunds. |  | Policy off, Revert Funds, No cutoff, and Never refund shipping are unchanged. |

**Postconditions:**

* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.

### TC-15: Dashboard - Refunds - New ticket and product defaults follow the organization policy

**Description:** Create a new ticket type or product without choosing its refund switch. Its starting choice must follow whether the organization policy is enabled, while existing item choices remain unchanged.

| Platform | View |
| --- | --- |
| Dashboard | Desktop |

| PolicyState | Save Enable customer refund policy as | New item default |
| --- | --- | --- |
| Enabled | On | On, even while the organization item-type switches are off. |
| Disabled | Off | Off. |

**Tags:** dashboard, refunds

**Parameters:**
PolicyState: Enabled, Disabled
ItemType: TicketType, Product

**Preconditions:**

* Preparing employee permissions: **Manage Organization Info**, **Manage Events**, and **Manage Marketplace**. Events and product access are available.
* Enable the organization-scoped `enable_venue_policy_customer_self_refunds` flag.
* In **Admin → Venues → Venues**, an administrator finds the organization and saves **Customer Self Refund Settings = on**. Record its original value.
* In **Admin → Venues → Venue customer refund policies**, search for the organization; reuse its record, or **Add → Venue → select the organization → Save**. Record its original settings.
* Record the original policy and one existing ticket/product refund choice. Save Enable customer refund policy to PolicyState; leave both organization item-type switches off so they cannot be mistaken for the new-item default.
* TicketType: use an unpublished future single-day event without sales; record its name. Product: have one saved category available. No purchase is needed.

| Step Action | Data | Expected Result |
| --- | --- | --- |
| Open the creation form for ItemType. | TicketType: Build → Events → All events → prepared event → Tickets → Add ticket type. Product: Build → Products → All products → Create product. | A new item form opens. |
| Enter the new item details without choosing its customer-refund switch. | Ticket: General Admission, price 10.00, inventory 10. Product: record a new name, choose the saved category, Standard variant, price 5.00. | The item has valid creation details. |
| Select the creation Save action. |  | The new item is created. |
| Reopen its refund settings. | Ticket: Basic info. Product: Fulfillment. | Allow customer-initiated refunds is on for Enabled and off for Disabled. |
| Reopen the existing item recorded before creation. |  | Its previously saved refund choice is unchanged. |

**Postconditions:**

* Have the administrator restore Customer Self Refund Settings to its recorded original value if it was changed for this case.
* Restore the original policy and Admin settings, save, and reopen to confirm. Preserve paid orders, returns, and credit/payment history.
* Keep new items without sales and the event unpublished; record their names.

## Risk Areas and Coverage Ledger

### Missing admin policy — frontend verification

Checked at the supplied frontend and backend commits; no browser or API execution was performed.

* **Page access:** the route requires Manage Organization Info, not an existing policy. Missing admin configuration does not implement a redirect or access-denied screen.
* **Load-error handling:** `CustomerRefundPolicyPage.web.tsx` renders “Failed to load the customer refund policy.” and Try again when `policyQuery.data` is falsy after loading. That branch has no form or Save button. Its page test supplies `data: undefined`.
* **Missing-record mismatch:** backend `VenueBasedCustomerRefundPolicyViewSet.list` returns an empty list when no policy exists. `useModelService.ts` → `useGenericQuery` returns the response body unchanged. An empty JavaScript array is truthy, so it bypasses the page's missing-policy condition. The form builder reads undefined fields from that array and returns a field configuration; the page therefore selects its form/Save branch rather than the intended load-error branch. Actual rendering and save behavior have not been executed.
* **Coverage consequence:** do not state “no admin policy means access denied” or guarantee the load-error message for a missing record. A missing-record case must exercise the actual empty-list response separately from a failed request. This is a source-backed contract mismatch, not a confirmed live defect.

Additional sources: frontend `packages/core/src/shared/services/api/hooks/useModelService.ts` → `useGenericQuery`; `packages/core/src/shared/services/api/abstracts/Repository.ts`; policy `utils/customer-refund-policy-utils.ts` and `ui/pages/CustomerRefundPolicyPage.web.test.tsx`; backend `apps/core/serializers/viewsets.py` → `BaseListModelMixin`.


TC-1 tests saved changes. TC-10 now covers first-time policy and item defaults from the PR; TC-11 covers the legacy tab and TC-12 covers staff refund controls without submitting a refund.

“Manual-only” below means drafted for manual execution, not passed. Existing source tests were read or located, not executed.

| Item / risk | Classification | Evidence and remaining proof |
| --- | --- | --- |
| All policy selects and master switch; save/reopen | Manual-only | TC-1, TC-2, TC-4; needs deployed environment and the selected organization. |
| Conditional date/number/unit inputs; obsolete fields after switching | Manual-only | TC-2, TC-3; B1/B2/F1. |
| Blank, zero, negative, minimum 1 | Manual-only | TC-3; capture control transformations separately from persisted data. |
| Decimal/text/whitespace/paste/spinner behavior and oversized integer | Deferred | Form declares whole numbers and min 1; no product maximum documented. Add focused form/API boundary coverage rather than guessing an upper-bound manual expectation. |
| Date picker typing, calendar navigation, keyboard, timezone/DST extremes | Deferred, except saved timezone round-trip in TC-2 | Shared date control; detailed picker regression is outside this configuration draft. |
| Master switch independent of outcome and item flags | Manual-only | TC-1/TC-5, including enabled status while outcome remains blocking. |
| Item defaults, on/off persistence, unrelated item save and sibling preservation | Manual-only | Ticket/product creation prerequisites and TC-5. |
| Ticket copying and independent copied record | Manual-only | TC-9; B5 and F4. |
| Unsaved reload/discard | Manual-only | TC-6. No promise of a custom discard dialog. |
| Visible policy permissions; item manager can read status | Manual-only | TC-7. |
| Organization switching/cache separation | Manual-only | TC-8; does not prove malicious cross-venue request rejection. |
| Forged cross-venue requests, permission bypass, illegal enum values, incompatible payloads, create/delete rejection, history actor | Deferred to API tests | B2 has focused tests for several of these; run those tests and extend missing cases. No normal organizer control produces these payloads. |
| New-venue provisioning, admin creation, and no-policy state | Blocked pending environment evidence | Admin setup is documented in every case; B3 plus VenueCustomerRefundPolicyAdmin. Admin creation and deployment state have not been executed or verified live. |
| Loading, failed load, Try again, unknown item status, failed save/retry | Deferred | F1/F2 provide these states; controlled failure setup needed to prove error recovery without treating an unavailable environment as a confirmed defect. |
| Policy read during an existing open item editor; concurrent edits | Deferred | Query invalidation exists in F2, but no real concurrent execution evidence. Baseline cases explicitly reopen editors. |
| Recurring events | Deferred | Same Basic info field exists, but recurring inheritance/parent-child propagation was not traced sufficiently for an executable expectation. |
| Product used as event add-on | Deferred | Product owns switch; association-specific UI/setup not traced. No independent add-on policy is claimed. |
| Packages/bundles/vouchers/memberships | Deferred / scope question | Ticket description is ambiguous; no separate manual controls established here. |
| Customer reason-copy editing | Blocked by scope mismatch | Not present in reviewed model/serializer/form; clarify whether removed or follow-up. |
| Customer refund eligibility, fees, scans, delivery, fulfillment, mixed orders | Deferred to SPW-19668/19669/19670 | Configuration save is not runtime or financial proof. |
| Staff/admin refund controls | Manual-only | TC-12 compares the same paid order before/after policy and item changes, without submitting. |
| Legacy customer refunds and completed staff/admin refunds | Deferred | Actual money movement and downstream results require dedicated integration execution; TC-12 does not cover them. |
| Public, Widget, Electron, Mobile Box Office, React Native customer app | Not applicable to these configuration cases | Reviewed controls are Dashboard web; later consumers of eligibility require their own audit. |
| Approval requests and item/event policy override editors | Not applicable | Explicitly excluded by Jira scope/comment; not provided in these forms. |
| Cleanup | Manual-only | Each case restores settings or names the retained copied ticket; no live data was changed during drafting. |

## Minimum Execution Set

1. Run TC-10 in English and French before editing its new policy/items.
2. Run TC-1–TC-5 for every listed scenario in **both English and French**. TC-5 includes disabling the policy again and proving the saved item switch stays on.
3. Run TC-6 for all three screens, TC-7 with the restricted employee, TC-8 with two organizations, and TC-9 with Enabled and Disabled originals.
4. Run TC-11 through the legacy Organization Info tab. Restore its routing flag afterward.
5. Run TC-12 for a ticket order and a product order, closing the employee refund dialog without submitting.

**12 case definitions; 52 executions** across the language and scenario values. Save evidence of the selected language, starting settings, reloaded result, and restoration. Record unavailable records or legacy routes as blocked rather than passed. The missing-policy empty-list issue remains separately documented in the coverage ledger; these PR checks do not prove it fixed.

## Suggested Automated Coverage

* **P1:** Policy model/API tests for defaults, each cutoff shape, minimum and invalid integer values, unknown choices, field omission versus explicit null, and transitions. Assert persisted values and audit actor; use B2 tests as the starting point.
* **P1:** Dashboard form test for clear-on-hide plus whole-number/paste/keyboard behavior, and browser save/reload tests for an absolute cutoff with different browser/venue timezones. Assert the stored instant as well as the displayed time.
* **P2:** Parameterized ticket/product browser tests for defaults, on/off, policy-disabled warning, status refresh, unrelated save, and sibling preservation. Ticket copy must assert distinct IDs and independent values. Product tests should prove a Basic info save does not reset Fulfillment.
* **P3:** Backend permission and cross-venue negative requests; UI tests with real restricted employment. Venue-switch tests must assert both repository request venue and visible loaded values.
* **P1/P2:** Controlled load failure, retry, unknown item-policy status, and mutation failure without false success. Distinguish an accepted write followed by a lost response from a rejected write.
* Reuse A1's page-object/navigation and API-response patterns; use user-facing controls and fresh server reads. Create isolated records and restore settings in teardown. No automation was added or run here.

## PR additions: coverage decisions

| PR requirement | Coverage |
| --- | --- |
| Migrations and local enum regeneration | Local-development setup above; not executed. |
| Safe defaults | TC-10, both languages. |
| Enabled-policy cutoff shapes and cleared irrelevant fields | TC-2, all shapes and both units, both languages. |
| Missing/invalid cutoff validation | TC-3, both languages. |
| Delivery, fulfillment, check-in, mixed-order persistence | TC-4, both languages. |
| Item status/defaults/switch persistence | TC-5 and TC-10, both items and languages. |
| Disable policy; retain saved item values and show warning | TC-5 added disable-and-reopen steps, both items and languages. |
| Employee refund controls unaffected | TC-12; actual refund execution remains deferred. |
| Policy edit permission | TC-7; backend bypass checks remain separate. |
| French | Language parameters on TC-1–TC-5 and TC-10, with source translations above. |
| Legacy settings embed | TC-11; exact routing flag and old navigation documented. |
| Legacy ticket/product forms | Controls confirmed in backend templates; separate legacy item save flows deferred because the PR explicitly calls for the settings embed, not all legacy editors. |

## Assumptions and Unknowns

* The supplied commits are the intended review baseline; neither deployed code nor local branches were compared.
* The organizer can use the migrated Dashboard pages; a legacy page that lacks the new switch does not establish that the configuration is absent from the backend.
* Exact organizations, credentials, category, event, product, and account permissions have not been verified. Proposed names must be created/provided before execution.
* Event creation, account provisioning, and category creation are environment setup dependencies; only the relevant ticket/product configuration paths were traced in detail.
* The supplied 2026-09 commits had no dedicated customer-refunds gate. Current source adds `enable_venue_policy_customer_self_refunds` for the selected organization. The cases now include it; SPT-5250–5255 were updated and their saved prerequisites verified on 2026-10-05.
* No business maximum for relative cutoff duration, runtime boundary inclusivity, blocked-reason contract, or recurring-session eligibility rule is established by this configuration work.
* No actual defect is confirmed. All behavior claims are source-backed; all manual results remain not executed.

## Open Questions

1. Has the deployment included both supplied commits and all three migrations, and can an authorized administrator find or create the policy for each selected organization? This blocks execution if absent, not completion of this draft.
2. Should SPW-19667 acceptance explicitly stop at configuration persistence, with runtime eligibility and money checks accepted under SPW-19668/19669/19670?
3. Was editable blocked-reason copy removed from scope, or is it still missing implementation?
4. Which package, voucher, recurring-session, and add-on association variations must be accepted in this phase? These need source-backed owner/setup rules before adding executable cases.
5. Who owns the legacy/staff refund integration run and dependent customer-refund execution evidence? No configuration-only result should be used as that evidence.
