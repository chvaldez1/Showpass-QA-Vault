# Category stories, app reach and ticket variation

Use this menu to choose connected, realistic scenarios. It is not a mandate to enable every feature. Discover current controls and backend rules; names/support may differ across Organizer configuration and deployed clients. Existing successful runs are examples, not universal templates.

## Category drives the event

| Category/story | Believable admission and timing | Useful complications and linked areas |
| --- | --- | --- |
| Comedy | Standard rush seating; limited early-bird stock; group admission; VIP early doors; separately named pre-show experience where appropriate | Group minimum and party-name question; required seating acknowledgement; GA → VIP upgrade; limited code; VIP waitlist; merch/pickup where supported. Do not imply early doors changes the main show's start. |
| Concert/live music | General admission; VIP soundcheck at an earlier time; main performance later; seated sections only with an actual supported map | Presale windows, timed release, variant merch, admission/merch bundle, VIP upgrades, ticket delivery delay, distinct scan windows and waitlist/resale where compatible. |
| Workshop/class/conference | Beginner/advanced sessions with different times; main admission versus a named add-on session; student/group tiers where appropriate | Per-Attendee session questions, session Inventory, equipment/Product variants, eligible Membership benefit, multi-session Package only with explicit related Event setup. |
| Festival/community/family | Day admission; family/group quantity rule; a separately timed activity; premium entry when useful | Multi-person guest collection, activity capacity, add-on Products, optional legitimate donation setup, tracking, late-entry/cutoff differences. Keep one-day scope unless multi-day is requested. |
| Sports/attraction | Admission versus a named clinic/session; timed entry or a supported recurring model only when requested | Assigned seats where available, finite session Inventory, bundles/merch, benefits, check-in windows, transfers and supported fulfillment. Do not convert a single Event into recurring dates for variety alone. |
| Theatre/film/food | Performance/screening/seating times with a clear admission story; premium section or actual meal option | Supported seating, realistic meal/merch choices, questions limited to operational need, early sales, group rules and visible arrival instructions. Never invent real catering or accessibility guarantees. |

For fictitious test data, create internally consistent names, copy, price ladders and capacity. For real event data, rely on confirmed business details and isolate proposed extras needing a business decision. Do not invent sensitive personal data, eligibility claims or legal policies.

## Reach across Showpass through this event

Use one compact table in the run note: **Area | Planned setup/record | Why it fits | Saved proof | Execution/result or exact gap**. These are preparation areas; a configured row is not an executed regression test.

| Area | Candidate setup and connection | When proof requires separate execution |
| --- | --- | --- |
| Build/presentation | Category, useful tags, story, imagery, talent association if verified, Location/timezone, doors, important info | Inspect actual public page and picker; preserve original event identity and publication state. |
| Ticket behavior | Timings, Inventory, quantity rules, visibility, passwords/presale, tiered discounts, pay-what-you-can, automatic release, waitlist | Purchase eligibility, release jobs, boundary timing, contention and queue fulfillment need controlled execution. |
| Selling/promotion | Scoped code, early/group pricing, same-event upgrade, tracking links, supported Widget presentation | Code application, upgrade amounts and attribution require the relevant purchase. Do not distribute links or change shared websites automatically. |
| Forms/Customers | Purchaser versus Attendee collection, required/optional questions, varied supported field types and conditional questions, per-ticket applicability, pre-payment acknowledgement, deferred answers | Actual answer retention, profile effects, incomplete-order recovery and exports require test records and execution. Keep sensitive data out of example answers. |
| Products/fulfillment | Existing owned merch with variants/stock; pickup versus supported shipping; linked add-ons | Issued Product, stock change, pickup/shipping and partial fulfillment are separate checks. Do not invent shipping rules or reuse unrelated Products. |
| Packages | Admission plus permitted Product or related Event tickets | Establish actual parent/child Events and quantities, Inventory and guest-information ownership. A label saying “bundle” does not create included items. Related Event creation needs scope. |
| Memberships/credits | Existing eligible Membership benefit, Ticket Credit or discount relationship | Eligibility/redemption and untouched benefits/balances need independent authorized records. Do not change shared membership rules just to include this area. |
| Operations/admission | Custom scan windows and limits, transfer rules, supported seating, waitlist/hold preparation | Physical scans, transfers, seat ownership, holds and fulfillment have distinct side effects and authorization. No auto check-in just to enable another switch. |
| Money/adjustments | Actual inherited taxes/fees/payment mode; scoped prices and discounts; Event/ticket fee or tax overrides when justified and authorized; supported exchange/transfer settings | Payment, fee revenue, Refund/Void/Exchange and stock reconciliation need the canonical gates. No arbitrary fee/processor changes or real payouts. |
| Insights/communications | Tracking sources, saved receipt/PDF/thermal wording, supported email previews, records usable in reports | Delivery, actual printing, exports, report reconciliation and external consumers remain unrun until executed. Do not add recipients or enable sends to widen reach. |

Keep a clean standard journey plus distinct alternatives. Useful prepared journeys include one standard admission; multiple Attendees/group order; a timed VIP experience; admission plus a Product; a benefit/code path; and a separate later-change/recovery scenario. Select only supported combinations and avoid stacking every complication into one unreadable basket.

## Ticket configuration: go beyond names and prices

For every selected tier, account for these settings. “Inherits Event” and “not supported” are valid explicit results; empty cells are not evidence.

| Dimension | Choose meaningful differences | Verify after saving |
| --- | --- | --- |
| Custom doors | VIP doors earlier than standard doors, if the experience warrants it | Exact date/time/timezone and fallback on the standard tier; describe arrival clearly. |
| Custom start/end | A separately named pre-show, soundcheck, class/session or other real experience at a different time | Correct ticket/experience display; start < end; day and Event relationship remain intentional. Never move the main show accidentally or rewrite sold tickets. |
| Scan start/end | VIP admission opens earlier; a timed session stops admitting at a deliberate cutoff | Distinguish scan eligibility from displayed doors/start and sale availability; actual scanning remains unrun. |
| Sale start/end | Limited presale, general sale, early-bird cutoff, later release | Exact saved boundaries and any overriding waitlist/release rule; avoid stale date defaults. |
| Inventory | Finite standard/VIP/session/merch stock, shared pools only when verified | Correct pool/capacity and existing sold state; never confuse 0 with a deliberate sold-out limit without checking semantics. |
| Quantity limits | Group minimum, smaller VIP maximum, per-customer cap and Box Office differences | Compatible minimum/maximum/customer constraints; “four-pack” wording must match actual ticket issuance. |
| Access/visibility | Standard public, a valid presale/password tier, seller-only comp, scheduled visibility change if supported | Correct audience and exact access rules. Tracking links must not unintentionally expose seller-only inventory. |
| Price rules | Realistic price ladder, limited code, supported tiered discount or pay-what-you-can | Currency, eligibility, limits and saved rule; comparison price is display-only where implemented. No unsupported stacking assumptions. |
| Delivery/transfer | Ordinary electronic delivery versus a deliberately delayed barcode; allowed transfer count | Release before intended use; correct eligible tier and existing Organization inheritance. Settings do not prove actual delivery or recipient access. |
| Scanning | Default one admission versus explicitly justified re-entry/multi-scan behavior | Actual source semantics; the comedy run required leaving custom scan limit blank for default one, since custom value 1 was rejected. Verify current UI instead of hardcoding that behavior universally. |
| Appearance/messages | Icons, ticket descriptions, PDF/thermal instructions and conditional form help | Wording agrees with selected times, included benefits, seating and quantity rules. |

Example **test-only** timing story for a one-day comedy Event: main show 19:00–20:30; standard doors 18:00; VIP doors 17:30; a separate “Pre-show comedy workshop” ticket 18:00–18:30 with doors/scan opening 17:45. Confirm supported models and scope before adding it, and make clear whether the workshop includes main-show admission. These times are illustrative, not values to paste into every Event. Custom ticket times must not silently promise additional admission.

## UI lessons from the comedy timing run

- The tested public ticket picker automatically appended the custom sale-end date to presale wording. Use a short label such as “First 40 tickets”; keep precise cutoff time/timezone in Description instead of repeating the date in the label. Inspect current public output before applying this tip elsewhere.
- The tested Important info & restrictions ComboBox only created an Enter entry when its input contained no comma. Use separate comma-free notices or semicolons, and verify each appears as a selected entry before continuing. An unchanged query or Enter press is not proof of an added notice; inspect saved state after any unexpected submission and restore unintended changes in the same run.
- For repeated date edits, inspect the live DOM once for stable field-specific date/time controls. Batch deterministic selections for the same verified day, then read back every chosen date/time after the parent save. Do not reuse stale element indices across navigation.

## Keep broad setup fast

- Reuse compatible, owned catalog and configuration; add a record only for a distinct behavior.
- Start with the existing Event/category and a small source search for the uncertain fields. Do not read every Handbook chapter or all ticket code before using ordinary known controls.
- Group edits by owning save, while checking immediate-save exceptions. Wait for actual search/save completion instead of adding fixed sleeps or retrying creates.
- Capture saved proof once per meaningful section, with focused reopen checks for the selected high-risk fields and time relationships. Avoid redundant captures and reopening the same unchanged facts.
- Keep one note and one final results table. End the Builder assignment at verified saved configuration and hand the evidence and next job to the appropriate tester.
