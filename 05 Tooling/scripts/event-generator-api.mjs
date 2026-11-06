import { randomUUID } from "node:crypto";
import {
  assert,
  positiveId,
  validatePlan,
  previewPlan,
} from "./event-generator-plan.mjs";

const pause = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
const entityId = (value) =>
  typeof value === "object" && value !== null ? value.id : value;
function equivalent(actual, expected) {
  if (actual === expected) return true;
  if (expected === null || actual == null) return false;
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length)
      return false;
    if (
      expected.every((x) => typeof x === "string") &&
      actual.every((x) => typeof x === "string")
    )
      return [...actual].sort().join("\0") === [...expected].sort().join("\0");
    return expected.every((x, i) => equivalent(actual[i], x));
  }
  if (typeof expected === "object")
    return Object.entries(expected).every(([key, value]) =>
      equivalent(actual[key], value),
    );
  if (typeof expected === "boolean" || typeof actual === "boolean")
    return false;
  if (
    String(expected).trim() !== "" &&
    String(actual).trim() !== "" &&
    Number.isFinite(Number(expected)) &&
    Number.isFinite(Number(actual))
  )
    return Number(actual) === Number(expected);
  if (typeof expected === "string" && /^\d{4}-\d\d-\d\dT/.test(expected))
    return Date.parse(actual) === Date.parse(expected);
  return false;
}
function verify(actual, expected, label) {
  for (const [key, value] of Object.entries(expected))
    assert(
      equivalent(actual[key], value),
      `${label}.${key}: saved value differs or was not returned.`,
    );
}

/** Caller owns the authenticated Playwright APIRequestContext and CSRF token.
 * No browser launching, cookie extraction, production access, publication or purchases.
 * onProgress should durably save the journal, especially before waiting on a job.
 */
export async function generateEvent({
  plan,
  api,
  csrfToken,
  onProgress = () => {},
  timeoutMs = 120000,
}) {
  plan = structuredClone(plan);
  const { origin } = validatePlan(plan); // Must finish before the first request.
  assert(
    api && typeof api.fetch === "function",
    "Supply an authenticated Playwright APIRequestContext.",
  );
  assert(
    typeof csrfToken === "string" && csrfToken.length > 0,
    "Supply its current CSRF token; never save it in the plan or journal.",
  );
  assert(
    Number.isFinite(timeoutMs) && timeoutMs >= 1000 && timeoutMs <= 300000,
    "timeoutMs must be 1–300 seconds.",
  );
  const journal = {
    ...previewPlan(plan),
    mode: "apply",
    state: "preflight",
    events: [],
    packages: [],
    fees: [],
    networkRequests: 0,
    unverified: [
      "Checkout, internal rate cards, fulfillment and admission are not exercised.",
    ],
  };
  const eventMap = new Map(),
    ticketMap = new Map(),
    packageMap = new Map(),
    locationMap = new Map(),
    feeBaselines = new Map();
  let base;
  const deadline = Date.now() + timeoutMs;
  const report = async () => onProgress(structuredClone(journal));
  async function call(method, path, data, allowed = [200]) {
    assert(
      (base && path.startsWith(base)) ||
        (method === "GET" && /^\/api\/celery\/[a-zA-Z0-9_-]+\/$/.test(path)) ||
        (method === "GET" && path === "/api/user/venues/employments/"),
      "Unexpected API route.",
    );
    const url = new URL(path, origin);
    assert(
      url.origin === origin && url.protocol === "https:",
      "Cross-host requests are disabled.",
    );
    assert(
      Date.now() < deadline,
      "Generator deadline expired; inspect the journal before retrying.",
    );
    journal.networkRequests++;
    const response = await api.fetch(url.href, {
      method,
      data,
      headers: {
        Origin: origin,
        Referer: `${origin}/manage/events/`,
        "X-CSRFToken": csrfToken,
      },
      maxRedirects: 0,
      maxRetries: 0,
      failOnStatusCode: false,
      timeout: Math.max(1, Math.min(30000, deadline - Date.now())),
    });
    try {
      const status = response.status();
      assert(
        allowed.includes(status),
        `${method} ${path}: HTTP ${status}; redirects and automatic retries are disabled.`,
      );
      if (method === "OPTIONS") return response.headers().allow ?? "";
      if (status === 404 || status === 204) return null;
      const body = await response.body();
      assert(
        body.length <= 4 * 1024 * 1024,
        "API response exceeded four MiB; request a narrower record.",
      );
      try {
        return JSON.parse(body.toString("utf8"));
      } catch {
        throw new Error(
          `${method} ${path}: expected JSON; check authentication or Access authorization.`,
        );
      }
    } finally {
      await response.dispose();
    }
  }
  async function settled(data, stage) {
    if (!data?.job_id) return data;
    const jobId = String(data.job_id);
    assert(/^[a-zA-Z0-9_-]+$/.test(jobId), "Invalid background-job ID.");
    journal.pending = { stage, jobId };
    await report();
    for (;;) {
      const job = await call("GET", `/api/celery/${jobId}/`);
      if (job.state === "SUCCESS") {
        delete journal.pending;
        return typeof job.data === "string" ? JSON.parse(job.data) : job.data;
      }
      assert(
        !["FAILURE", "REVOKED"].includes(job.state),
        `${stage}: background job ${job.state}; preserve the partial Draft and inspect the journal.`,
      );
      await pause(Math.min(750, Math.max(1, deadline - Date.now())));
    }
  }
  function readTicket(event, key) {
    const wanted = ticketMap.get(key);
    const matches = (event.tickettype_set ?? []).filter(
      (tt) => tt.id === wanted.id,
    );
    assert(
      matches.length === 1,
      `TT ${key}: saved identity missing or ambiguous.`,
    );
    return matches[0];
  }
  function matchingFees(tt, fee) {
    const byName = (tt.venue_custom_fees ?? []).filter(
      (row) =>
        row.fee_name === fee.definition.name &&
        row.fee_type === fee.definition.type,
    );
    const matches = byName.filter((row) =>
      Object.entries(fee.value).every(([key, value]) =>
        key === "item_types"
          ? value.every((item) => (row.item_types ?? []).includes(item))
          : equivalent(row[key], value),
      ),
    );
    return { byName, matches };
  }
  try {
    // All readiness reads finish before any new record is created.
    const employmentBody = await call("GET", "/api/user/venues/employments/");
    const employments = Array.isArray(employmentBody)
      ? employmentBody
      : employmentBody.results;
    assert(Array.isArray(employments), "Employment results unavailable.");
    const matchingEmployments = employments.filter((e) =>
      plan.destination.venue_id === null
        ? e.venue?.name === plan.destination.organization_name &&
          e.venue?.currency === plan.destination.currency
        : e.venue?.id === plan.destination.venue_id,
    );
    assert(
      matchingEmployments.length === 1,
      "Expected exactly one matching beta/demo Organization employment; supply its verified Venue ID if names are ambiguous.",
    );
    const employment = matchingEmployments[0];
    assert(positiveId(employment.venue.id), "Employment Venue ID unavailable.");
    plan.destination.venue_id = employment.venue.id;
    journal.venueId = employment.venue.id;
    base = `/api/venue/${plan.destination.venue_id}/`;
    verify(
      employment.venue,
      {
        name: plan.destination.organization_name,
        currency: plan.destination.currency,
      },
      "Destination Organization",
    );
    for (const permission of [
      "manage_events",
      ...(plan.fees.some((f) => f.mode === "ensure")
        ? ["manage_financials"]
        : []),
    ])
      assert(
        employment.no_restrictions === true ||
          employment.permissions?.includes(permission),
        `Missing employee permission: ${permission}.`,
      );
    const routes = [
      `${base}events/`,
      ...(plan.packages.length ? [`${base}events/ticket-types/packages/`] : []),
      ...(plan.fees.some((f) => f.mode === "ensure")
        ? [`${base}financials/custom-fees/`]
        : []),
    ];
    await Promise.all(
      routes.map(async (path) =>
        assert(
          (await call("OPTIONS", path))
            .split(",")
            .map((x) => x.trim())
            .includes("POST"),
          `${path}: create is unavailable.`,
        ),
      ),
    );
    await Promise.all(
      plan.events.map(async (event) => {
        const slug = `qa-${plan.run_key}-${event.key}`;
        assert(
          (await call(
            "GET",
            `${base}events/${slug}/`,
            undefined,
            [200, 404],
          )) === null,
          `Event ${slug} already exists. Inspect it instead of retrying creation.`,
        );
        if (event.location.existing_id) {
          const location = await call(
            "GET",
            `${base}events/locations/${event.location.existing_id}/`,
          );
          assert(
            entityId(location.venue) === plan.destination.venue_id,
            "Location belongs to another Venue.",
          );
        }
      }),
    );
    journal.state = "creating";
    await report();
    for (const event of plan.events) {
      const locationKey = JSON.stringify(event.location);
      let locationId =
        event.location.existing_id ?? locationMap.get(locationKey);
      const entry = {
        key: event.key,
        slug: `qa-${plan.run_key}-${event.key}`,
        state: "creating",
        tickets: [],
      };
      journal.events.push(entry);
      if (!locationId) {
        const location = await call(
          "POST",
          `${base}events/locations/`,
          event.location,
          [200, 201],
        );
        assert(positiveId(location.id), "Created Location ID unavailable.");
        locationId = location.id;
        locationMap.set(locationKey, locationId);
        entry.createdLocationId = locationId;
        await report();
      }
      const payload = {
        ...event.settings,
        status: "sp_event_draft",
        is_recurring: false,
        slug_custom: entry.slug,
        location: locationId,
        tickettype_set: event.tickets.map((t) => t.settings),
      };
      entry.state = "submitting";
      await report();
      const created = await settled(
        await call("POST", `${base}events/`, payload, [200, 201]),
        `create Event ${event.key}`,
      );
      if (positiveId(created?.id)) {
        entry.id = created.id;
        entry.returnedSlug = created.slug;
        await report();
      }
      assert(
        positiveId(created.id) &&
          created.slug === entry.slug &&
          entityId(created.venue) === plan.destination.venue_id,
        "Event response identity does not match the requested Draft.",
      );
      entry.id = created.id;
      entry.url = `${origin}/manage/events/${created.slug}/basic-info/`;
      entry.state = "created";
      eventMap.set(event.key, { entry, expected: payload, questions: [] });
      for (const tt of event.tickets) {
        const matches = (created.tickettype_set ?? []).filter(
          (row) => row.name === tt.settings.name,
        );
        assert(
          matches.length === 1 && positiveId(matches[0].id),
          `TT ${tt.key}: unique created identity unavailable.`,
        );
        ticketMap.set(tt.key, { id: matches[0].id, eventKey: event.key });
        entry.tickets.push({ key: tt.key, id: matches[0].id });
      }
      await report();
      if (event.questions.length) {
        const questions = event.questions.map((q) => ({
          ...q.settings,
          id: randomUUID(),
          ticket_types: q.ticket_keys.map((key) => ticketMap.get(key).id),
        }));
        await settled(
          await call("PATCH", `${base}events/${entry.id}/`, {
            collect_info_custom_questions: questions,
          }),
          `questions for ${event.key}`,
        );
        eventMap.get(event.key).questions = questions;
      }
    }
    for (const pkg of plan.packages) {
      const parentId = ticketMap.get(pkg.parent_ticket).id;
      const payload = {
        ...pkg.settings,
        parent_ticket_type_id: parentId,
        sub_ticket_types: pkg.children.map((child) => ({
          parent: { id: parentId },
          child: { id: ticketMap.get(child.ticket).id },
          ticket_count: child.ticket_count,
          parent_ratio: child.parent_ratio,
          percent_allocation_for_package: child.percent_allocation_for_package,
        })),
      };
      const created = await call(
        "POST",
        `${base}events/ticket-types/packages/`,
        payload,
        [200, 201],
      );
      assert(positiveId(created.id), "Package ID unavailable.");
      journal.packages.push({
        key: pkg.key,
        id: created.id,
        parentTicketId: parentId,
      });
      packageMap.set(pkg.key, { id: created.id, payload });
      await report();
    }
    for (const fee of plan.fees) {
      const ticket = ticketMap.get(fee.ticket),
        event = eventMap.get(ticket.eventKey);
      if (!feeBaselines.has(ticket.eventKey))
        feeBaselines.set(
          ticket.eventKey,
          await call("GET", `${base}events/${event.entry.id}/`),
        );
      const current = feeBaselines.get(ticket.eventKey);
      const { byName, matches } = matchingFees(
        readTicket(current, fee.ticket),
        fee,
      );
      if (matches.length === 1 && byName.length === 1) {
        journal.fees.push({
          ticket: fee.ticket,
          name: fee.definition.name,
          state: "reused",
          feeId: matches[0].venue_custom_fee,
        });
        await report();
        continue;
      }
      assert(
        byName.length === 0 && fee.mode === "ensure",
        `TT ${fee.ticket}: ${fee.definition.name} is missing, conflicting or duplicated. No shared rate was modified.`,
      );
      const created = await call(
        "POST",
        `${base}financials/custom-fees/`,
        {
          ...fee.definition,
          is_active: true,
          fee_values: [
            {
              ...fee.value,
              description: `QA ${plan.run_key} ${fee.ticket}`,
              ticket_type: ticket.id,
              event: null,
            },
          ],
        },
        [200, 201],
      );
      assert(positiveId(created.id), "Created custom fee ID unavailable.");
      journal.fees.push({
        ticket: fee.ticket,
        name: fee.definition.name,
        state: "created",
        feeId: created.id,
      });
      await report();
    }
    journal.state = "verifying";
    await report();
    await Promise.all(
      [...locationMap].map(async ([settings, id]) => {
        const location = await call("GET", `${base}events/locations/${id}/`);
        assert(
          entityId(location.venue) === plan.destination.venue_id,
          "Created Location ownership differs.",
        );
        verify(location, JSON.parse(settings), `Location ${id}`);
      }),
    );
    await Promise.all(
      plan.events.map(async (event) => {
        const saved = eventMap.get(event.key);
        let fresh = await call("GET", `${base}events/${saved.entry.id}/`);
        while (fresh.save_pending || fresh.async_save) {
          await pause(750);
          fresh = await call("GET", `${base}events/${saved.entry.id}/`);
        }
        const { tickettype_set, location, slug_custom, ...settings } =
          saved.expected;
        settings.slug = slug_custom;
        assert(
          entityId(fresh.venue) === plan.destination.venue_id &&
            entityId(fresh.location) === location,
          "Saved Event ownership/Location differs.",
        );
        for (const key of ["image", "image_banner"])
          if (settings[key]) {
            assert(
              typeof fresh[key] === "string" && fresh[key].length > 0,
              `${key}: saved artwork missing.`,
            );
            delete settings[key];
          }
        verify(fresh, settings, `Event ${event.key}`);
        assert(
          fresh.tickettype_set?.length === event.tickets.length,
          `Event ${event.key}: unexpected TT count.`,
        );
        for (const tt of event.tickets)
          verify(
            readTicket(fresh, tt.key),
            { ...tt.settings, is_bundle: tt.expected_bundle },
            `TT ${tt.key}`,
          );
        if (saved.questions.length)
          verify(
            fresh,
            { collect_info_custom_questions: saved.questions },
            `Event ${event.key}`,
          );
        for (const fee of plan.fees.filter(
          (f) => ticketMap.get(f.ticket).eventKey === event.key,
        )) {
          const { byName, matches } = matchingFees(
            readTicket(fresh, fee.ticket),
            fee,
          );
          assert(
            byName.length === 1 && matches.length === 1,
            `TT ${fee.ticket}: effective ${fee.definition.name} did not match after saving.`,
          );
        }
        saved.entry.state = "verified";
      }),
    );
    await Promise.all(
      plan.packages.map(async (pkg) => {
        const record = packageMap.get(pkg.key),
          fresh = await call(
            "GET",
            `${base}events/ticket-types/packages/${record.id}/`,
          );
        assert(
          fresh.parent_ticket_type?.id === record.payload.parent_ticket_type_id,
          "Package parent identity differs.",
        );
        verify(fresh, pkg.settings, `Package ${pkg.key}`);
        assert(
          fresh.sub_ticket_types?.length === pkg.children.length,
          "Package child count differs.",
        );
        for (const expected of record.payload.sub_ticket_types) {
          const matches = fresh.sub_ticket_types.filter(
            (row) => row.child?.id === expected.child.id,
          );
          assert(
            matches.length === 1,
            "Package child identity missing or duplicated.",
          );
          verify(
            matches[0],
            expected,
            `Package ${pkg.key} child ${expected.child.id}`,
          );
        }
      }),
    );
    journal.state = "verified";
    await report();
    return structuredClone(journal);
  } catch (error) {
    journal.state = journal.events.length ? "partial" : "blocked";
    journal.error = error.message;
    try {
      await report();
    } catch {
      journal.journalWriteFailed = true;
    }
    const failure = new Error(
      `${error.message} No automatic retry or deletion was attempted.`,
      { cause: error },
    );
    failure.journal = structuredClone(journal);
    throw failure;
  }
}
