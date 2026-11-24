# Create or enrich Events

Use the shared readiness, authorization, save/reopen and reporting workflow in SKILL.md. Load [scenario-patterns.md](scenario-patterns.md) when Event or ticket examples help the assigned setup.

For an existing Event, enrich it in place. When creation is requested, create new Events through the supported workflow, including saving and the case's required publication/sale state. Do not substitute an existing event just to avoid creation or make the user follow a setup recipe. Keep a one-day show one-day. **Use the fewest Events needed.** Review a case's listed Event count as proposed setup, then apply the simplification check in [create-from-test-case.md](create-from-test-case.md) before creating Events. Preserve separate Events when their distinct identity or state is part of the assertion. Separate orders or ticket types do not automatically require separate Events.

Choose a concise story: who attends, what they buy, when they arrive, what staff must fulfill, and what complications matter. Use [scenario-patterns.md](scenario-patterns.md) for category ideas, the app reach map and ticket variations. Prices, capacity and named experiences must fit the actual setup; examples are not defaults.

Find and update the existing canonical note for this Event/request before creating a new one. Record original values and existing related IDs there. On reruns, compare desired versus saved state and enrich existing records; do not create another HAHA10/VIP/merch record simply because the skill ran again.

## Scenario preset: Single-day General Admission

Use the saved QA Organization, location and venue currency. For an open date, choose a suitable upcoming day with time to set up the sale in the venue's timezone. Commit one local start and end date. For a simple evening scenario, use 7–10 p.m. and one General Admission ticket at 25.00 with 30 spots unless the requested story or test needs different amounts or tiers. Set a clear sale window and reopen it with the ticket name, price, inventory and Event ID. Leave artwork to the user.

If this Event supplies a single eligible ticket for another record, keep exactly one ticket unless the scenario needs an eligible versus excluded comparison. Use the status the dependency actually supports. When publication is both authorized and required, include it in the same plan, verify the agreed discovery and sale-window settings first, and reopen the Event after publication.

## Select connected features and ticket differences

In test-case mode, build the case's prerequisite map first and follow the case-specific reference. Required prices, ticket/order quantities, eligibility, fees, timing, flags, historical states and independent runs override open-ended enrichment ideas below. Minimize Event count only where those requirements and proof targets remain intact. Do not add Packages, assigned seating, discounts or delayed admission when the case explicitly excludes them. Prepare an optional rich variant separately only when requested.

Show a compact scope table before mutations: area / planned configuration / why it fits / proof and cleanup. Include the chosen Event count and the reason for each extra Event. **Flag a test case that could be simplified before creating extra Events:** state its listed count, the proposed smaller count, which roles can share an Event and what proof is preserved or would change. Proceed with a supported equivalent simplification under this standing preference; ask only when an unresolved choice changes the test's purpose or an explicit user requirement. Do not silently weaken the case or wait for routine approval when equivalence is established. Record the chosen mapping and any variation in the canonical note; do not rewrite the original case unless requested.

Use the reference's reach map to account for Event presentation, ticket behavior, selling/promotion, forms, Products/Packages, benefits, admission/fulfillment, money and reporting. Select broadly where supported and useful. When prior setup notes are readily available, prefer useful features not already represented across the user's Events; do not repeat the comedy recipe or start an exhaustive historical audit. Mark remaining areas deferred, unsupported, incompatible or blocked with a concrete reason. Avoid limiting the exercise to the Basic info page or the same six tiers every time.

**Ticket configuration is a primary deliverable.** Vary behaviors as well as names/prices. Actively include appropriate ticket-specific doors, start/end times, sale periods and scan windows in owned test data. Examples: a pre-show experience, a later workshop session, or VIP early arrival. Explain what each time means; an earlier door time is not a different performance start. A scan window controls admission, not sales or the advertised schedule.

Build a ticket table before saving: ticket/experience, price/Inventory, Event start/end, custom ticket start/end, custom doors, sale start/end, scan start/end, quantity limits, visibility/access, delivery/transfer/scan rules. Use `inherits Event` for genuine inheritance. Define timezone and exact day, including midnight boundaries; do not use arbitrary dates just to fill fields. Keep at least one clean standard admission path.

Check combinations against source and the actual saved configuration. Examples: minimum ≤ maximum ≤ relevant customer limit; comp tiers not accidentally public; discounted tiers not unintentionally discounted again; upgrade target in the correct Event; waitlist/resale compatibility; waitlist cutoff precedence over sale end; barcode release/scan timing compatible with arrival. Choose optional extra rules only when they create a distinct useful journey.
