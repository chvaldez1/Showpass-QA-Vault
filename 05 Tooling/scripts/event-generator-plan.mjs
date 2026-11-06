// Settings-only input. Production identifiers belong in `source`, never in payloads.
export const ORIGINS = Object.freeze({
  beta: "https://beta.showpass.com",
  demo: "https://demo.showpass.com",
});
const EVENT_FIELDS = new Set(
  `name subtitle description starts_on ends_on opens_at timezone categories tags visibility inventory terms refund_policy message post_purchase_message require_terms_acceptance terms_url_link initiate_purchase_button no_ticket_types_message show_on_calendar hide_event_end_time show_inventory_amount info_collect_per_ticket info_collection_type enforce_box_office_info_collection collect_info_post_purchase collect_info_email collect_info_first_name collect_info_last_name collect_info_phone_number collect_info_home_address collect_info_company collect_info_job_title collect_info_student_number collect_info_birthday collect_info_license_plate hide_info_collection_when_purchased_as_package_child max_ticket_quantity_per_user sale_ends_on_default_option date_time_to_be_determined time_to_be_determined transfer_limit image image_banner`.split(
    " ",
  ),
);
const TT_FIELDS = new Set(
  `name description price inventory purchase_limit minimum_purchase_limit box_office_purchase_limit per_user visibility sort_order sale_starts_on_custom sale_ends_on_custom custom_ticket_event_starts_on custom_ticket_event_ends_on custom_ticket_event_opens_at scan_starts_on scan_ends_on regular_price presale_verbiage public_sold_out customer_refund_enabled ticket_transfer_enabled allow_transfer_before_delayed_delivery shipping_type shipping_cost shipping_fee_method combine_shipping shipping_cost_overrides_basket will_call_handling_cost will_call_fee_method combine_will_call_cost e_ticket_handling_cost e_ticket_fee_method combine_e_ticket_cost send_digital_tickets_with_will_call info_collect_per_ticket info_collection_type enforce_box_office_info_collection collect_info_email collect_info_first_name collect_info_last_name collect_info_phone_number collect_info_home_address collect_info_company collect_info_job_title collect_info_student_number collect_info_birthday collect_info_license_plate multiscan_limit time_to_be_determined show_ticket_prices`.split(
    " ",
  ),
);
const PACKAGE_FIELDS = [
  "name",
  "package_type",
  "use_parent_barcode",
  "allow_child_transfers",
  "sub_ticket_revenue_distribution_method",
  "all_items_redeemable",
  "require_guest_info_for_all_items",
];
const LOCATION_FIELDS = new Set([
  "name",
  "street_name",
  "city",
  "province",
  "postal_code",
  "country",
  "position",
  "unit_number",
  "is_venue_location",
]);
const FEE_FIELDS = [
  "fee_added",
  "fee_percent",
  "is_absorbed",
  "item_types",
  "payment_types",
  "purchase_platforms",
  "fee_tax",
];
const QUESTION_FIELDS = new Set([
  "title",
  "type",
  "required",
  "help_text",
  "placeholder",
  "options",
  "collect_after_checkout",
]);
export function targetOrigin(environment) {
  if (!Object.hasOwn(ORIGINS, environment))
    throw new Error("Choose beta or demo. Production is disabled.");
  return ORIGINS[environment];
}
export function assert(condition, message) {
  if (!condition) throw new Error(message);
}
export const positiveId = (value) => Number.isSafeInteger(value) && value > 0;
const object = (value) =>
  value && typeof value === "object" && !Array.isArray(value);
const text = (value) => typeof value === "string" && value.trim().length > 0;
const owns = (value, key) => Object.hasOwn(value, key);
export function missingData(plan) {
  const missing = [];
  if (!object(plan)) return ["A settings plan is required."];
  if (Array.isArray(plan.unresolved))
    missing.push(...plan.unresolved.map((value) => `Unresolved: ${value}`));
  if (!text(plan.destination?.organization_name))
    missing.push("Destination Organization name.");
  if (!text(plan.destination?.currency)) missing.push("Destination currency.");
  if (!Array.isArray(plan.events) || !plan.events.length)
    missing.push("Events and their TT settings.");
  const bundled = (Array.isArray(plan.events) ? plan.events : []).flatMap((e) =>
    (Array.isArray(e.tickets) ? e.tickets : [])
      .filter((t) => t.expected_bundle)
      .map((t) => t.key),
  );
  for (const key of bundled) {
    const pkg = (Array.isArray(plan.packages) ? plan.packages : []).find(
      (p) => p.parent_ticket === key,
    );
    if (!pkg) {
      missing.push(
        `Package for TT ${key}: included TTs, quantities, barcode, guest-information and revenue settings.`,
      );
      continue;
    }
    if (!Array.isArray(pkg.children) || !pkg.children.length)
      missing.push(
        `Package ${pkg.key}: included TT definitions and quantities.`,
      );
    for (const field of PACKAGE_FIELDS)
      if (!object(pkg.settings) || !owns(pkg.settings, field))
        missing.push(`Package ${pkg.key}: ${field}.`);
  }
  return missing;
}
function fields(value, allowed, label) {
  assert(object(value), `${label}: settings are required.`);
  for (const key of Object.keys(value))
    assert(
      allowed.has(key),
      `${label}.${key}: unsupported field; do not silently omit it.`,
    );
}
function amount(value, label, minimum = 0) {
  assert(
    (typeof value === "number" || typeof value === "string") &&
      String(value).trim() !== "" &&
      Number.isFinite(Number(value)) &&
      Number(value) >= minimum,
    `${label}: valid amount required.`,
  );
}
function schedule(settings, timezone, label) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });
  } catch {
    throw new Error(`${label}: valid timezone required.`);
  }
  for (const [key, value] of Object.entries(settings)) {
    if (value === null || !/(?:_on|_at|_on_custom)$/.test(key)) continue;
    assert(
      typeof value === "string" &&
        /(?:Z|[+-]\d\d:\d\d)$/.test(value) &&
        Number.isFinite(Date.parse(value)),
      `${label}.${key}: ISO date with explicit offset required.`,
    );
  }
  for (const [start, end] of [
    ["starts_on", "ends_on"],
    ["sale_starts_on_custom", "sale_ends_on_custom"],
    ["custom_ticket_event_starts_on", "custom_ticket_event_ends_on"],
    ["scan_starts_on", "scan_ends_on"],
  ]) {
    if (settings[start] && settings[end])
      assert(
        Date.parse(settings[start]) < Date.parse(settings[end]),
        `${label}: ${end} must follow ${start}.`,
      );
  }
}

export function validatePlan(plan) {
  assert(
    object(plan) && plan.format === "showpass-event-generation-v2",
    "Expected a showpass-event-generation-v2 plan.",
  );
  targetOrigin(plan.destination?.environment);
  const gaps = missingData(plan);
  assert(
    gaps.length === 0,
    `Missing required data before generation:\n- ${gaps.join("\n- ")}`,
  );
  assert(
    plan.destination.venue_id === null || positiveId(plan.destination.venue_id),
    "destination.venue_id: beta/demo Venue ID or null to resolve one exact matching employment.",
  );
  assert(
    text(plan.destination.organization_name) &&
      /^[A-Z]{3}$/.test(plan.destination.currency),
    "Destination Organization name and currency required.",
  );
  assert(
    /^[a-z0-9][a-z0-9-]{0,47}$/.test(plan.run_key ?? ""),
    "run_key: unique lowercase letters, numbers and hyphens, at most 48 characters.",
  );
  assert(
    plan.finish === "keep_draft",
    "Only keep_draft is supported. No publication, purchases or automatic deletion.",
  );
  assert(
    Array.isArray(plan.events) && plan.events.length > 0,
    "At least one Event is required.",
  );
  assert(
    Array.isArray(plan.packages),
    "packages: explicitly supply an array, including [] for ordinary tickets.",
  );
  assert(
    Array.isArray(plan.fees),
    "fees: explicitly supply effective fee expectations, or [] if intentionally omitted.",
  );
  assert(
    Array.isArray(plan.omissions),
    "omissions: list deliberately excluded settings, including [] when none.",
  );
  assert(
    Array.isArray(plan.unresolved) && plan.unresolved.every(text),
    "unresolved: explicitly supply missing required details, or [] when none.",
  );
  const events = new Map(),
    tickets = new Map(),
    packageParents = new Set();
  for (const event of plan.events) {
    assert(
      /^[a-z][a-z0-9-]{0,39}$/.test(event.key ?? "") && !events.has(event.key),
      "Each Event needs a unique key (lowercase letters/numbers/hyphens).",
    );
    fields(event.settings, EVENT_FIELDS, `Event ${event.key}`);
    assert(
      text(event.settings.name) &&
        event.settings.starts_on &&
        event.settings.ends_on,
      `Event ${event.key}: name and dates required.`,
    );
    schedule(event.settings, event.settings.timezone, `Event ${event.key}`);
    assert(
      plan.run_key.length + event.key.length + 4 <= 100,
      "Generated slug is too long.",
    );
    for (const image of ["image", "image_banner"])
      if (event.settings[image] != null)
        assert(
          /^data:image\/(?:png|jpeg|svg\+xml);base64,[A-Za-z0-9+/=]+$/.test(
            event.settings[image],
          ),
          `${image}: use an inline test image; remote image URLs are disabled.`,
        );
    if (positiveId(event.location?.existing_id))
      assert(
        Object.keys(event.location).length === 2 &&
          event.location.environment === plan.destination.environment,
        "Existing Location references need their matching environment; never carry beta IDs into demo or vice versa.",
      );
    else {
      fields(event.location, LOCATION_FIELDS, `Event ${event.key} Location`);
      assert(
        [
          "name",
          "street_name",
          "city",
          "province",
          "country",
          "postal_code",
        ].every((k) => text(event.location[k])),
        `Event ${event.key}: complete Location address required.`,
      );
      const coordinates = String(event.location.position)
        .split(",")
        .map(Number);
      assert(
        coordinates.length === 2 &&
          coordinates.every(Number.isFinite) &&
          Math.abs(coordinates[0]) <= 90 &&
          Math.abs(coordinates[1]) <= 180 &&
          coordinates.some((n) => n !== 0),
        `Event ${event.key}: valid Location coordinates required.`,
      );
    }
    assert(
      Array.isArray(event.tickets) && event.tickets.length > 0,
      `Event ${event.key}: tickets required.`,
    );
    const names = new Set();
    for (const tt of event.tickets) {
      assert(
        text(tt.key) && !tickets.has(tt.key),
        "TT keys must be unique across the whole plan.",
      );
      fields(tt.settings, TT_FIELDS, `TT ${tt.key}`);
      assert(
        text(tt.settings.name) && typeof tt.expected_bundle === "boolean",
        `TT ${tt.key}: name and expected_bundle required.`,
      );
      assert(
        !names.has(tt.settings.name),
        `Event ${event.key}: TT names must be unique so returned IDs can be mapped safely.`,
      );
      names.add(tt.settings.name);
      amount(tt.settings.price, `TT ${tt.key} price`);
      assert(
        Number.isSafeInteger(tt.settings.inventory) &&
          tt.settings.inventory > 0,
        `TT ${tt.key}: positive capacity required.`,
      );
      schedule(tt.settings, event.settings.timezone, `TT ${tt.key}`);
      const start =
        tt.settings.custom_ticket_event_starts_on ?? event.settings.starts_on;
      const end =
        tt.settings.custom_ticket_event_ends_on ?? event.settings.ends_on;
      assert(
        Date.parse(start) < Date.parse(end),
        `TT ${tt.key}: effective ticket end must follow its start.`,
      );
      tickets.set(tt.key, { ...tt, eventKey: event.key });
    }
    assert(
      Array.isArray(event.questions),
      `Event ${event.key}: questions array required.`,
    );
    for (const question of event.questions) {
      fields(question.settings, QUESTION_FIELDS, `Event ${event.key} question`);
      assert(
        text(question.settings.title) &&
          typeof question.settings.required === "boolean",
        "Question title and required setting must be explicit.",
      );
      assert(
        Array.isArray(question.ticket_keys) &&
          question.ticket_keys.length > 0 &&
          question.ticket_keys.every(
            (k) => tickets.get(k)?.eventKey === event.key,
          ),
        "Question TT references must belong to their new Event.",
      );
      assert(
        ["select", "checkbox_group", "text", "textarea"].includes(
          question.settings.type,
        ),
        "Unsupported question type: supply a supported contract first.",
      );
      if (["select", "checkbox_group"].includes(question.settings.type))
        assert(
          Array.isArray(question.settings.options) &&
            question.settings.options.length > 0 &&
            question.settings.options.every(
              (o) => Object.keys(o).length === 1 && text(o.text),
            ),
          "Choice questions need complete option text.",
        );
    }
    events.set(event.key, event);
  }
  const packageKeys = new Set();
  for (const pkg of plan.packages) {
    assert(
      text(pkg.key) && !packageKeys.has(pkg.key),
      "Package keys must be unique.",
    );
    packageKeys.add(pkg.key);
    assert(
      tickets.get(pkg.parent_ticket)?.expected_bundle &&
        !packageParents.has(pkg.parent_ticket),
      `Package ${pkg.key}: one declared bundle parent required.`,
    );
    packageParents.add(pkg.parent_ticket);
    fields(pkg.settings, new Set(PACKAGE_FIELDS), `Package ${pkg.key}`);
    assert(
      PACKAGE_FIELDS.every((k) => owns(pkg.settings, k)),
      `Package ${pkg.key}: missing barcode, guest-information or revenue settings.`,
    );
    assert(
      pkg.settings.package_type === "tpt_preset",
      "Custom-choice packages need their option graph; this generator currently supports preset packages only.",
    );
    assert(
      ["parent", "uniform", "proportional"].includes(
        pkg.settings.sub_ticket_revenue_distribution_method,
      ),
      "Explicit supported package revenue method required.",
    );
    for (const k of [
      "use_parent_barcode",
      "all_items_redeemable",
      "require_guest_info_for_all_items",
      "allow_child_transfers",
    ])
      assert(
        typeof pkg.settings[k] === "boolean" || pkg.settings[k] === null,
        `Package ${pkg.key}.${k}: explicit boolean or null required.`,
      );
    assert(
      !pkg.settings.allow_child_transfers || pkg.settings.use_parent_barcode,
      "Child transfers require the parent barcode.",
    );
    assert(
      Array.isArray(pkg.children) && pkg.children.length > 0,
      `Package ${pkg.key}: included TTs and quantities are missing.`,
    );
    const children = new Set();
    for (const child of pkg.children) {
      assert(
        tickets.has(child.ticket) &&
          child.ticket !== pkg.parent_ticket &&
          !tickets.get(child.ticket).expected_bundle &&
          !children.has(child.ticket),
        "Package children must be unique, declared ordinary TTs. Layered packages are unsupported.",
      );
      children.add(child.ticket);
      assert(
        Number.isSafeInteger(child.ticket_count) && child.ticket_count > 0,
        "Package ticket_count must be positive.",
      );
      assert(
        owns(child, "parent_ratio") &&
          owns(child, "percent_allocation_for_package"),
        "Package child ratio and revenue allocation must be explicit (null is allowed).",
      );
      assert(
        child.parent_ratio === null ||
          (Number.isSafeInteger(child.parent_ratio) && child.parent_ratio > 1),
        "Invalid package parent_ratio.",
      );
      if (child.percent_allocation_for_package !== null) {
        amount(child.percent_allocation_for_package, "Package allocation");
        assert(
          Number(child.percent_allocation_for_package) <= 1,
          "Package allocation must be a fraction, not a percentage.",
        );
      }
    }
  }
  for (const [key, tt] of tickets)
    assert(
      !tt.expected_bundle || packageParents.has(key),
      `TT ${key} is a bundle but its package contents/settings are missing.`,
    );
  const feeKeys = new Set();
  for (const fee of plan.fees) {
    assert(
      tickets.has(fee.ticket) && ["inherit", "ensure"].includes(fee.mode),
      "Fee needs a declared TT and mode inherit/ensure.",
    );
    assert(
      text(fee.definition?.name) &&
        ["fee", "tax"].includes(fee.definition.type),
      "Explicit organizer fee/tax definition required.",
    );
    const feeKey = JSON.stringify([
      fee.ticket,
      fee.definition.name,
      fee.definition.type,
    ]);
    assert(!feeKeys.has(feeKey), "Duplicate fee expectation for the same TT.");
    feeKeys.add(feeKey);
    assert(
      Object.keys(fee.definition).every((k) => ["name", "type"].includes(k)),
      "Fee definition contains unsupported fields.",
    );
    fields(fee.value, new Set(FEE_FIELDS), "Fee value");
    assert(
      FEE_FIELDS.every((k) => owns(fee.value, k)),
      "Complete fee amount, payer, tax, payment and channel settings required.",
    );
    for (const k of ["fee_added", "fee_percent", "fee_tax"])
      amount(fee.value[k], `Fee ${k}`);
    assert(
      typeof fee.value.is_absorbed === "boolean",
      "Fee payer must be explicit.",
    );
    assert(
      Array.isArray(fee.value.item_types) &&
        fee.value.item_types.includes("ticket") &&
        (fee.mode === "inherit" ||
          JSON.stringify(fee.value.item_types) === '["ticket"]'),
      "Created fees must target tickets only; inherited rules may also cover other items.",
    );
    assert(
      Array.isArray(fee.value.payment_types) &&
        fee.value.payment_types.length > 0 &&
        fee.value.payment_types.every((x) => ["cash", "card"].includes(x)),
      "Fee payment methods must be cash/card.",
    );
    assert(
      Array.isArray(fee.value.purchase_platforms) &&
        fee.value.purchase_platforms.length > 0 &&
        fee.value.purchase_platforms.every((x) =>
          ["online", "in_person"].includes(x),
        ),
      "Fee channels must be explicit.",
    );
  }
  return {
    origin: targetOrigin(plan.destination.environment),
    events,
    tickets,
  };
}

export function previewPlan(plan) {
  const { origin, tickets } = validatePlan(plan);
  return {
    mode: "preview",
    origin,
    organization: plan.destination.organization_name,
    venueId: plan.destination.venue_id,
    runKey: plan.run_key,
    finish: plan.finish,
    events: plan.events.map((e) => ({
      key: e.key,
      name: e.settings.name,
      slug: `qa-${plan.run_key}-${e.key}`,
      tickets: e.tickets.map((t) => ({
        key: t.key,
        name: t.settings.name,
        price: t.settings.price,
        capacity: t.settings.inventory,
        bundle: t.expected_bundle,
      })),
    })),
    ticketCount: tickets.size,
    packageCount: plan.packages.length,
    feeCount: plan.fees.length,
    omissions: plan.omissions,
    networkRequests: 0,
  };
}
