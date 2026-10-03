---
title: Sources and Maintenance
date: 2026-10-03
tags:
  - qa/handbook
status: Source-informed guidance; execution evidence recorded per release
---

# Sources and Maintenance

[[00 Start Here/Showpass QA Handbook/00 Index|Handbook index]] · [[00 Start Here/World-Class Software Quality Standard|Canonical quality standard]]

## Source map and evidence limits

### Foundation and incident evidence

- [[00 Start Here/World-Class Software Quality Standard]] — canonical quality policy.
- [[01 Repositories/Backend - web-app]] and [[01 Repositories/Frontend - showpass-frontend]] — repository source-order and navigation guidance.
- [[02 Feature QA/SPD Dev Support System Gap Analysis - April to September 2026]] — detailed incident/source/coverage analysis; retain its filename as the canonical analysis note.
- [[02 Feature QA/End-to-End Purchase Coverage Matrix]] — companion entry-point/source atlas; mapped paths are not executed coverage.
- [Existing manual QA principles](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/docs/agent-workflows/manual-qa-principles.md>) — upstream principles, not competing vault policy.
- [SPD-2761](https://showpass.atlassian.net/browse/SPD-2761) and [SPD-2770](https://showpass.atlassian.net/browse/SPD-2770) — directly read incident reports used for fee and native-device lessons.
- [Critical Business E2E Tests](https://docs.superhuman.com/d/Dev-Team-Process_dYC2ikYLoK9/Critical-Business-E2E-Tests_su2b0pSE) — previously read visible regression guidance and platform/payment consideration lists. Hidden table contents were not established from the visible read.

Historical context includes 2,584 CSV records from October 2022 to September 2026. The historical pass was summary/title classification; it was **not** a verified root-cause review of all 2,584 descriptions. Detailed 2026 issue/source anchors and the two recent direct Jira reads support the specific lessons. Historical reports are not asserted to be reproducible defects on today's build. Do not infer incident frequency by root cause from this handbook.

### Backend navigation references

These system/domain documents explain boundaries and point to code/tests. Recheck the relevant implementation and flags for the exact change. Paths are navigational references, not copied code or execution evidence.

| Key | Reference and primary use |
| --- | --- |
| B1 | [Ticket basket purchase flow](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_purchase_flow.md>) and [purchase service](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/purchase/ticket_basket_purchase_service.py>) — payment, commit, issuance, recovery, downstream tasks |
| B2 | [Ticket basket lifecycle](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_basket_lifecycle.md>) — counted stock, expiry, holds, purchase states |
| B3 | [Itemized calculations](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/itemized_calculations.md>) — pricing engines and mixed-basket restrictions |
| B4 | [All-items-redeemable packages](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/all_items_redeemable_packages.md>) — item/barcode/redeemability boundaries |
| B5 | [Assigned seating and permissions](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/assigned_seating_and_permissions.md>) — sellability, usage, ownership, projections |
| B6 | [Membership issue-ticket benefits and batches](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/membership_issue_ticket_benefits_and_batches.md>) and [membership lifecycle](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/memberships_lifecycle_and_renewals.md>) — member-specific results, renewal/exit |
| B7 | [Discounts and auto-discounts](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/discounts_and_auto_discounts.md>) — application, limits, permissions, caching; Ticket Credit-specific source anchors in the dev-support analysis |
| B8 | [User and exchange credits](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/user_credits_and_exchange_credits.md>) — ledger and scope |
| B9 | [Gift cards and redemption](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/gift_cards_and_redemptions.md>) — purchase, redemption, advance/accounting |
| B10 | [Refunds and refunders](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/refunds_and_refunders.md>) — asynchronous refunds, eligibility, preview and recovery |
| B11 | [Voids and post-purchase adjustments](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/voids_and_post_purchase_adjustments.md>) — validity versus money reversal |
| B12 | [Package revenue realization](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/package_revenue_realization.md>) and [membership realization](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/membership_revenue_realization.md>) — allocation/statistics versus original values |
| B13 | [Payment plans](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/payment_plans.md>) and [saved methods / setup intents](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/saved_payment_methods_and_setup_intents.md>) — installments, frozen provider ownership, saved method lifecycle |
| B14 | [Products and stock](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/domains/products_and_product_stock.md>) — variant stock, active reservations, stats |
| B15 | [Attraction calendars and inventory](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/attraction_calendars_and_inventory.md>) — recurring and special availability |
| B16 | [Sold-out flags and public availability](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/sold_out_flags_and_public_availability.md>) — public override versus actual inventory |
| B17 | [Venue employee authorization](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/venue_employee_authorization.md>) — effective permissions, venue scope, module/additional authorization |
| B18 | [Widget SDK and embeds](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/widget_sdk_and_embeds.md>) — distinct embedding/host flows |
| B19 | [Ticket resale lifecycle and payouts](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/ticket_resale_lifecycle_and_payouts.md>) — sale, validity, seller payout |
| B20 | [Reporting framework and exports](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/reporting_framework_and_exports.md>) — report jobs, filters, actual files |
| B21 | [Waitlist fulfillment and holds](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/waitlist_fulfillment_and_holds.md>) — eligibility, ordering, allocation differences |
| B22 | [Guestlist bookings and check-ins](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/guestlist_bookings_and_check_ins.md>) — reservation/approval/check-in distinctions |
| B23 | [Import jobs and polling](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/import_job_framework_and_polling.md>) — preview, confirm, per-row transactions/checkpoints |
| B24 | [Transactional email customization and preview](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/transactional_email_customization_and_preview.md>) — preview versus actual send |
| B25 | [Post-purchase responses](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/post_purchase_responses.md>) and [response owner](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/order_questions/post_purchase_responses.py>) — paid snapshots, partial versus complete answers, edit/holder scope, locks and ticket/pass updates |
| B26 | [Completion signal handler](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/signal_handlers.py>) and [basket owner](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/models/order_management/order_basket.py>) — conditional post-purchase fan-out, Membership/task ordering, guest claims, release triggers, rewards and external consumers |
| B27 | [Internal analytics](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/analytics_taxonomy_and_pipeline.md>) and [marketing tags/pixels/CAPI](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/systems/marketing_analytics_tags_pixels_and_capi.md>) — distinct asynchronous/internal, browser/server and attribution paths; no assumed universal consent gate |
| B28 | [Shipping fulfillment](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/shipping_fulfillment/fulfillment_service.py>), [shipping status definitions](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/core/constants/shipping.py>) and [issued-ticket finalization](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/services/fulfillment/issued_ticket_post_purchase_finalization.py>) — shipping versus electronic/pickup, partial order status, auto Check In and pass generation |

### Concrete frontend and automation anchors

| Key | Reference and what to inspect |
| --- | --- |
| F1 | [Box Office checkout hook](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/box-office/checkout/hooks/checkout/useCheckout.ts>) — waits for invoice and post-purchase marker before downstream actions; inspect timeout/reprint and actual issued items separately |
| F2 | [Basket service](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/services/useBasket.ts>) and [fee helpers](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/modules/basket/fees/helpers.ts>) — customer presentation may omit absorbed fees; this is not allocation proof |
| F3 | [Ticket Credit assignment save](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/ticket-credits/utils/assignment-save.ts>) — separate mutations; configuration needs fresh-read and redemption proof |
| F4 | [Native Square reader integration](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/native-modules/ios/square-reader/index.tsx>) and [POS Square utility](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/mobile/src/util/pos/square.tsx>) — native/device path, not browser emulation |
| F5 | [Purchase logger](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/checkout/analytics/logPostPurchase.ts>), [external formatter](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/shared/services/analytics/formatters/external.ts>) and [question-stage telemetry](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/checkout/analytics/logPostPurchaseQuestionStage.ts>) — enabled destinations/attribution, protection exclusion in external revenue, telemetry without answers |
| F6 | [Paid question form](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/public/features/checkout/hooks/usePostPurchaseQuestionStageForm.ts>) and [Fulfillment dialog](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/transactions/ui/components/modals/UpdateFulfillmentModal/UpdateFulfillmentModal.web.tsx>) — completing deferred information and Employee per-item fulfillment actions |
| P1 | [Product package tests](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages/product-package-purchase.test.ts>) and [runner](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/packages/product-package.runner.ts>) — existing purchase composition pattern; inspect exact assertions before extending |
| P2 | [Membership suite runner](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/checkout/memberships/membership-suite.runner.ts>) and [seasonal benefit test](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/dashboard/memberships/create-seasonal-benefit.test.ts>) — purchase and benefit-setup patterns |
| P3 | [Ticket Credit tests](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/ticket-credits/ticket-credits.test.ts>) — existing redemption pattern and configuration assumptions |
| P4 | [Exchange runner](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/core/exchanges/exchange.runner.ts>) — reusable full/itemized Cash/Other exchange paths |
| P5 | [Cleveland VIP configuration](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/client-setup/fan-expo-cleveland/fan-expo-cleveland-vip-config.ts>) and [steps](</Users/christianvaldez/Documents/Showpass/repos/showpass-playwright/tests/client-setup/fan-expo-cleveland/fan-expo-cleveland.steps.ts>) — existing auth/delivery/billing/question variants and a shipping validation-only helper; Calgary settings and final assertion coverage are not inferred |

Initial preparation recorded backend `722638bb02`, frontend `7554193f91`, and Playwright `4f8a9687`. During the 2026-10-02 hands-on revision, the local HEADs were backend `252ab19313`, frontend `2c809125f2`, and Playwright `f470046e`. Sources were rechecked selectively for the revised workflows, not exhaustively against every intervening commit. These identify local checkouts, not verified deployed builds.

The 2026-10-03 checkout-lifecycle revision selectively reviewed backend `252ab19313`, frontend `2c809125f2` and Playwright `e741a6704d`. It added [[00 Start Here/Showpass QA Handbook/14 Checkout and Post-Purchase Coverage|purchase outcome accounting]], production-to-TEA configuration comparison, Customer-behavior/scenario design, phase-transition testing, deferred-question and shipping-fulfillment procedures. The frontend's referenced `docs/references/checkout-v1-v2-working-guide.md` was absent from this checkout; direct current implementation files were used instead. No production configuration or analytics records were read, and consumer-specific adjustment/reversal/deduplication policies were not exhaustively verified.

No application workflow, provider payment, physical-device test, regression suite, Qase write, or production financial operation was executed for this handbook. Source reads and documentation checks do not establish release coverage.

### Hands-on terminology, setup, and form anchors

These additional sources ground the actor names and concrete controls in the walkthroughs. Backend rules remain first; UI labels identify how people reach them. Navigation and flags must still be bound to the actual deployed client.

| Reference | Handbook use |
| --- | --- |
| [Ubiquitous language](</Users/christianvaldez/Documents/Showpass/repos/web-app/UBIQUITOUS_LANGUAGE.md>) | Organizer/Customer identity contexts; Venue versus Event Location; Ticket Item, Membership, Product pickup, and Guestlist Check In boundaries |
| [Venue model](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/models/venue_management/venue.py>) and [employment catalog](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/constants/employment.py>) | Currency/timezone/gateway ownership and exact Employee permission names |
| [Venue Admin](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/venues/admin/venue_admin.py>) | Hidden configuration inspection and save-time gateway/module consequences; comparison guidance is not production access authorization |
| [Organization selector](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/components/navigation/DashboardOrganizationSelectButton.web.tsx>) | Choose the active Organization without assuming multiple employments |
| [Current Event API](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/tickets/api/venue_based/viewsets/events.py>) and [Event fields](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/tickets/events/partials/__create-form.html>) | Actual Event/Ticket Type setup, Save Draft/Publish flow, asynchronous final state; old monolithic Event viewset references are not current |
| [Package delivery controls](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/packages/ui/components/form/TicketPackageDeliveryOptionsSection.web.tsx>) | Send a single barcode, Allow redemption on any included item, and attendee-information collection are distinct supported choices |
| [Membership Levels](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/memberships/ui/pages/detail/MembershipLevelsPage.web.tsx>) | Add Level and the Group/Level/benefit configuration path |
| [Ticket Credit form](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/ticket-credits/ui/components/TicketCreditDefinitionForm.web.tsx>) and [assignments editor](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/ticket-credits/ui/components/TicketCreditAssignmentsEditor.web.tsx>) | Actual limits, issuing/redemption Event selection, and saved-configuration confirmation |
| [Product editor](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/templates/dashboard/inventory/products/_create-edit-form.html>) | Product Info; Variant Name, Inventory, Purchase Limit, SKU, Price |
| [Roles Manager](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/team/ui/pages/PermissionsPage.web.tsx>) and [role editor](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/organization/team/ui/components/RoleManagerSidebar.web.tsx>) | Actual Employee authority setup and persisted role checks |
| [Guestlist actions](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/reservations/ui/components/GuestlistHeaderActions.web.tsx>) and [booking form](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/packages/core/src/app-contexts/dashboard/features/reservations/ui/components/GuestlistReservationForm.web.tsx>) | New guestlist, Submit Guestlist, saved booking rather than ticket admission |
| [Payment Plan builder](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/financials/services/payment_plans/payment_plan_builder.py>) | Actual installment calculation and bound provider gateway; plan setup UI remains client-specific |
| [Persisted Guestlist decision service](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/reservations/services/booking/reservation_decision.py>) | Saved decision and downstream notifications versus an in-memory/compatibility action |
| [Bulk persistence service](</Users/christianvaldez/Documents/Showpass/repos/web-app/apps/main/services/import_job/base_persist_service.py>) | Per-row/batch progress, checkpoints, and terminal results; specialized workers can differ |
| [Backend operability](</Users/christianvaldez/Documents/Showpass/repos/web-app/docs/standards/operability.md>) and [frontend completion lifecycle](</Users/christianvaldez/Documents/Showpass/repos/showpass-frontend/docs/workflows/feature-completion-lifecycle.md>) | Operational visibility, affected clients, rollout/feedback, and risk-based completion rather than merge-only confidence |

Where a current visible control, admin-managed value, deployed flag, or policy was not established, the guide requires it to be bound before execution. Generic instructions for a selected report, integration, Hold type, or Payment Plan are not a claim that every client supplies identical controls.

### Keep this handbook current

Update the relevant recipe when an escaped bug adds a new business failure, a client/flag changes supported behavior, or evidence disproves an expectation. Preserve case IDs and existing notes. Detailed cases and run evidence belong in the feature/run's canonical note; do not turn this handbook into a growing incident log. New product areas should begin with backend rules and actor workflows, then join this map with explicit proof targets and coverage gaps.
