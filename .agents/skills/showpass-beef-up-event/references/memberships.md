# Create or enrich Memberships

Use the shared workflow in SKILL.md and the Handbook's `Playbooks/05 Memberships and Ticket Benefits.md`. Bind this guide to current backend rules and the controls actually deployed in the authorized Dashboard. Local source is preparation evidence, not proof of a live record's values.

## Start with the right records

- **Membership Group:** the overall offering, such as a comedy club or annual attraction pass.
- **Membership Level:** a purchasable option within that Group, with its own price, Inventory, Purchase Limit and visibility.
- **Benefit:** a Group- or Level-scoped rule for discounts, access or ticket issuance. Record exactly which Levels inherit it; do not assume a Level benefit applies to the whole Group.
- **Member:** an actual issued membership belonging to a Customer. Saving a Group, Level or benefit does not create a Member or prove that they can use it.

Use the existing Group for new Levels. When the requested benefit depends on a ticket, plan how to obtain that exact Event and Ticket Type with the Group and Level setup. Reuse a verified owned ticket when it fits. If the bounded lookup has no compatible match, include one supporting Event and one Ticket Type in the approved plan. Use additional Events only when the scenario needs a distinct relationship or state.

## Scenario preset: Monthly Membership with a ticket benefit

Use a monthly Group with a standard and premium Level. For open-ended QA data, start at 19.00 and 29.00 in the verified venue currency, with 20 and 10 spots and a purchase limit of one each. Choose names and descriptions that fit the request. Add one optional question per Member where it gives the checkout tester a meaningful field to verify.

For a premium ticket discount, start at 10% and two uses per Member on one eligible Ticket Type, with the standard Level as the comparison. Use the [single-day Event preset](events.md#scenario-preset-single-day-general-admission) if a supporting fixture is needed. The migrated Single Event discount picker normally searches viewable Events. Verify when it requires a published Event and include publication in the same review only with user authorization. Keep a requested Membership Draft. Confirm the exact selected Event and Ticket Type before saving because selecting an Event may select every type it returns. Reopen the benefit and record both IDs, the owning Level, the percentage, and the limit.

## Readiness and existing Members

Confirm the intended environment, Organization and Group through the authorized Dashboard. Ask the user whether Memberships, **Manage Memberships** permission (`VP_MANAGE_MEMBERSHIPS`) and the relevant test payment/fee setup are ready. Include permissions/modules for selected supporting records. Derive any exact feature-flag values from the chosen behavior and current source; seasonal ticket issuance, renewals and revenue allocation may have additional gates. Do not ask for every membership flag or inspect Admin. Reuse same-scope answers and label them user-confirmed.

Record existing Levels, sales/active Member counts, benefit scope, dates, renewal settings and linked stock before changes. Preserve sold prices and historical entitlements. Benefit edits can affect existing Members and seat/renewal holds: do not treat them as harmless description edits. If an enrichment would change existing Members' rights, renewal behavior, expiry or reserved seats outside the authorized test-data scope, prepare independent safe setup and ask for that specific decision. Do not issue/import Members, trigger ticket batches or send renewal reminders merely to make the configuration look complete.

## Choose meaningful differences

Build a compact plan rather than adding every possible toggle:

| Area | Useful configuration | Fresh proof |
| --- | --- | --- |
| Group | Realistic name, description, existing artwork, visibility and Membership Label | Saved copy and supported sales display agree. Do not invent legal terms or real venue promises. |
| Validity | Appropriate renewal frequency, expiry/timezone or supported season windows | Chosen dates and effective renewal state persist. One-time, lifetime and seasonal models are alternatives; do not combine incompatible models. |
| Levels | A clean standard Level and distinct premium/limited option where useful; prices, finite Inventory, Purchase Limits, visibility | Every selected Level reopens with exact values; sold-price restrictions stay respected. A family name does not prove multiple Members or tickets are issued. |
| Shared benefit | One appropriate Group benefit, such as a limited discount or access allowance | Correct inheritance, eligible items and limits; excluded items stay excluded. |
| Level benefit | A meaningful premium difference with named target items and supported limits | Correct Level/Group scope, benefit type, quantity/usage semantics and exclusions. Avoid duplicate grants unless intentional. |
| Member information | Required identity fields and useful custom questions scoped to the intended Levels | Saved per-Member/per-purchase behavior and assignments. Do not replace required Member identity with an unrelated Event Attendee question. |
| Selling/fulfillment | Supported scoped promotions, upgrade paths, transfer/delivery rules or owned Product associations | Supported relationship and destination; inherited fees recorded. Do not invent an unavailable Level control. |
| Seasons, seating, revenue | Only when the story/case and ready configuration require them | Exact season/map/allocation scope and limitations. These are optional dependencies, not a generic complexity checklist. |

Distinguish scan access, daily scan access, discounts and **Issue Tickets**. They are different benefit types. A discount does not issue a ticket. An Issue Tickets definition may require separate Event/batch configuration and an issued Member before tickets exist. Follow the actual supported flow, not an assumed Event/ticket picker. Assigned seating also needs a compatible map and supported scope; current Level benefit controls need not offer every Group option.

## Build, verify and stop

1. Save/reopen Group details and the chosen validity model. Preserve existing status unless the request or required sales path justifies changing it.
2. Create/update the planned Levels, then reopen each price, Inventory, Purchase Limit and visibility. Verify real currency; never reuse a scan-limit sentinel as unlimited Inventory.
3. Create/reuse the minimum owned discounts, Products or Event/ticket dependencies. Configure benefits at their correct Group/Level scope, with exact eligibility, quantities, limits and season relationships. Reopen both sides of selected relationships.
4. Save/reopen Member information/questions and selected presentation/fulfillment rules. Verify actual inheritance rather than trusting a label or success toast.
5. Hand the receiving tester the saved sellable Levels, prices, quantities and supported public or staff checkout entry.
6. Stop at saved configuration. Record required Member or order dependencies for separately approved purchase, benefit redemption, renewal, transfer or admission jobs.

Record **configuration saved** with verified Group, Level and benefit IDs. Include any still-needed Member or order, observed issues and the next ready assignment.

## Source entry points

Under sibling `web-app`: `docs/domains/memberships.md`; `apps/memberships/models/{groups,levels,benefits,benefit_fields,catalog_fields}.py`; relevant `api/venue_based` serializers/viewsets. Follow selected renewal, member sync or batch behavior only when needed.

Under sibling `showpass-frontend`: `packages/core/src/app-contexts/dashboard/features/memberships/`; Group form field configs, Level form fields, Group/Level Benefits pages and benefit-modal forms. Resolve current controls from these sources; do not hardcode a route/framework or treat the example Group ID as a reusable target.
