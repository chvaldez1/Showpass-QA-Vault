import type { BrowserContext, Page, Request, Response, Route } from "playwright";
import { z } from "zod";
import { builderRecordsSchema } from "../workspace/builder-result";
import type { ApprovedDraft, DraftExecutionResult, EventDraft } from "../workspace/event-draft";
import { readLocalState, writeLocalState } from "./authorization";
import { betaOrigin, draftStatus, isCloudflareVerification } from "./beta-browser";

const createPath = "/manage/events/create/";
const eventApi = /^\/api\/venue\/(\d+)\/events\/(?:([A-Za-z0-9_-]+)\/)?$/;
const editorPath = /^\/manage\/events\/([A-Za-z0-9_-]+)\/basic-info\/?$/;
const savedEvent = z.looseObject({
  id: z.number().int().positive(),
  slug: z.string().regex(/^[A-Za-z0-9_-]+$/),
  name: z.string(),
  status: z.string(),
  timezone: z.string(),
  starts_on: z.iso.datetime({ offset: true }),
  ends_on: z.iso.datetime({ offset: true }),
  collect_info_custom_questions: z.array(z.unknown()).nullish(),
});
const journalSchema = z.discriminatedUnion("phase", [
  z.object({ phase: z.literal("creating"), revision: z.number(), venue: z.string() }),
  z.object({
    phase: z.enum(["draft", "saving-questions", "verified"]),
    revision: z.number(), venue: z.string(), slug: z.string().regex(/^[A-Za-z0-9_-]+$/),
  }),
]);
type Journal = z.infer<typeof journalSchema>;

class DraftBlocker extends Error {}

function matchingApi(request: Request) {
  const url = new URL(request.url());
  return url.origin === betaOrigin ? eventApi.exec(url.pathname) : null;
}

function requestBody(request: Request) {
  try {
    return request.postDataJSON() as Record<string, unknown> | null;
  } catch {
    return null;
  }
}

function hasApprovedQuestions(questions: unknown, plan: EventDraft) {
  return Array.isArray(questions) && questions.length === plan.questions.length &&
    questions.every((question, index) => question?.title === plan.questions[index] &&
      question.type === "text" && question.required === false && question.collect_after_checkout !== true &&
      (!question.ticket_types || question.ticket_types.length === 0));
}

function approvedSchedule(value: unknown, time: string, draft: EventDraft) {
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) return false;
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: draft.timezone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date(value));
  const { year, month, day, hour, minute } = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${year}-${month}-${day} ${hour}:${minute}` === `${draft.date} ${time}`;
}

async function checkOrganization(page: Page, organization: string) {
  if (await isCloudflareVerification(page)) {
    throw new DraftBlocker("Showpass beta requires Cloudflare verification in the dedicated browser. Complete it there if prompted, then retry this plan.");
  }
  const button = page.getByTestId("dashboard-organization-select-button").filter({ visible: true });
  const expected = organization.toLowerCase();
  const active = page.getByTestId("dashboard-organization-select-drawer-handle-select-organization")
    .and(page.locator('[aria-current="true"]'));
  try {
    await button.waitFor({ state: "visible" });
    if ((await button.innerText()).split("\n").some((name) => name.trim().toLowerCase() === expected)) return;
    await button.click({ timeout: 4000 });
    const name = await active.getAttribute("title", { timeout: 5000 });
    await page.keyboard.press("Escape");
    await active.waitFor({ state: "hidden" });
    if (name?.trim().toLowerCase() === expected) return;
  } catch {
    // The organization may require sign-in or selection in the dedicated browser.
  }
  throw new DraftBlocker(`Sign in to the dedicated beta browser and select ${organization} in the migrated Dashboard.`);
}

async function checkOrderFormAccess(page: Page) {
  let check = "open the Organization's migrated Events list";
  try {
    await page.goto(`${betaOrigin}/manage/events/`, { waitUntil: "domcontentloaded" });
    check = "find an editable Event in the Organization's Events list";
    const edit = page.getByTestId("edit-event-action").or(page.getByTestId("edit-event-link"))
      .or(page.getByRole("link", { name: "Edit", exact: true }))
      .filter({ visible: true }).first();
    await edit.click();
    check = "open Order form from the existing Event";
    await page.waitForURL((url) => url.origin === betaOrigin && editorPath.test(url.pathname));
    const editUrl = new URL(page.url());
    const slug = editorPath.exec(editUrl.pathname)?.[1];
    if (!slug) throw new Error("The Event editor did not load.");
    await openOrderForm(page, slug);
    check = "verify the migrated Order form finished loading";
    await page.getByTestId("order-form-footer").waitFor({ state: "visible" });
  } catch {
    const url = new URL(page.url());
    const path = url.origin === betaOrigin ? ` (${url.pathname})` : "";
    throw new DraftBlocker(`City could not ${check}${path}. No Event save was sent.`);
  }
}

async function openOrderForm(page: Page, slug: string) {
  const link = page.getByTestId("nav-event-order-form")
    .or(page.getByRole("link", { name: "Order form", exact: true })).filter({ visible: true }).first();
  const found = await link.waitFor({ state: "visible", timeout: 3000 }).then(() => true, () => false);
  const path = `/manage/events/${slug}/order-form`;
  if (found) await link.click();
  else await page.goto(`${betaOrigin}${path}/`, { waitUntil: "domcontentloaded" });
  await page.waitForURL((url) => url.origin === betaOrigin && [path, `${path}/`].includes(url.pathname));
}

async function chooseDate(page: Page, field: "primaryDate" | "secondaryDate", date: string) {
  const trigger = page.locator(`button#${field}`);
  const label = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", dateStyle: "long" }).format(new Date(date));
  if ((await trigger.innerText()).trim() === label) return;
  await trigger.click();
  const picker = page.getByTestId("input-date-picker-menu-list").and(page.locator('[data-state="open"]'));
  const [year, month] = date.split("-");
  await picker.getByRole("combobox", { name: "Choose the Year" }).selectOption(year);
  await picker.getByRole("combobox", { name: "Choose the Month" }).selectOption(String(Number(month) - 1));
  await picker.locator(`[role="gridcell"][data-day="${date}"]:not([data-outside])`).getByRole("button").click();
  await page.keyboard.press("Escape");
  await picker.waitFor({ state: "detached" });
  if ((await trigger.innerText()).trim() !== label) throw new DraftBlocker("The migrated date picker did not keep the approved date.");
}

async function fillCreateForm(page: Page, draft: EventDraft) {
  await page.getByText("One event", { exact: true }).click();
  await page.getByTestId("name").fill(draft.name);
  const locations = page.getByRole("combobox", { name: "Select event location", exact: true });
  await locations.locator("option").filter({ hasText: draft.location }).first().waitFor({ state: "attached" }).catch(() => {
    throw new DraftBlocker(`The existing Event location "${draft.location}" is unavailable in this Organization.`);
  });
  const options = await locations.locator("option").evaluateAll((entries) => entries.map((entry) => ({
    label: entry.textContent?.trim() ?? "", id: (entry as HTMLOptionElement).value,
  })));
  const locationName = draft.location.toLowerCase();
  const matches = options.filter(({ label, id }) =>
    /^[1-9]\d*$/.test(id) && [label, label.split(" - ")[0], label.split(" | ")[0]]
      .some((name) => name.toLowerCase() === locationName),
  );
  if (matches.length !== 1) {
    const choices = matches.map(({ label }) => label).join(", ");
    throw new DraftBlocker(choices
      ? `Multiple saved locations match "${draft.location}". Specify the full location label in a fresh plan. Matches: ${choices}.`
      : `No saved location matches "${draft.location}" exactly. No Event save was sent.`);
  }
  const locationId = matches[0].id;
  await locations.selectOption(locationId);
  const timezone = page.locator("#timezone-input");
  if (await timezone.inputValue() !== draft.timezone) {
    await timezone.fill(draft.timezone);
    await page.getByRole("option", { name: draft.timezone, exact: true }).click();
  }
  await page.locator("#description").getByRole("textbox").fill(draft.description);
  await chooseDate(page, "primaryDate", draft.date);
  await chooseDate(page, "secondaryDate", draft.date);
  for (const [field, time] of [["startTime", draft.startsAt], ["endTime", draft.endsAt]]) {
    const [hour, minute] = time.split(":");
    const fieldInput = page.getByTestId(field);
    await fieldInput.fill(`${Number(hour) % 12 || 12}:${minute} ${Number(hour) >= 12 ? "PM" : "AM"}`);
    await fieldInput.press("Tab");
  }
  await page.getByPlaceholder("Add a category", { exact: true }).fill(draft.category);
  await page.getByRole("option", { name: draft.category, exact: true }).click();
  return locationId;
}

async function readSavedEvent(page: Page, venue: string, slug: string) {
  const address = `${betaOrigin}/manage/events/${slug}/order-form/`;
  await page.goto("about:blank");
  const [data] = await Promise.all([
    page.waitForResponse((response) => {
      const api = matchingApi(response.request());
      return response.request().method() === "GET" && response.ok() && api?.[1] === venue &&
        api[2] === slug;
    }, { timeout: 20_000 }).then((response) => response.json()),
    page.goto(address, { waitUntil: "domcontentloaded" }),
  ]);
  const saved = savedEvent.parse(data);
  if (saved.slug !== slug || saved.status !== draftStatus) throw new DraftBlocker("The saved Event did not reopen as the approved Draft.");
  return saved;
}

function editorUrl(slug: string) {
  return `${betaOrigin}/manage/events/${slug}/basic-info/`;
}

export async function runEventDraft(
  context: BrowserContext, approval: ApprovedDraft, stillApproved: () => Promise<boolean>,
): Promise<DraftExecutionResult> {
  const { draft, runId, revision } = approval;
  const journalFile = `draft-${runId}.json`;
  const previous = await readLocalState(journalFile);
  const checkpoint: { current?: Journal } = { current: previous == null ? undefined : journalSchema.parse(previous) };
  const persist = async (value: Journal) => {
    await writeLocalState(journalFile, value);
    checkpoint.current = value;
  };
  let createLocation: string | undefined;
  let questionTarget: { id: number; slug: string; venue: string } | undefined;
  let migration = false;
  let step = "opening the migrated Dashboard";
  let id: number | undefined;
  let blockedSave: string | undefined;
  const page = await context.newPage();
  const guard = async (route: Route) => {
    const request = route.request();
    const method = request.method();
    if (["GET", "HEAD", "OPTIONS"].includes(method)) return route.fallback();
    const url = new URL(request.url());
    if (url.origin !== betaOrigin || !await stillApproved()) return route.abort();
    if (migration && method === "POST" && url.pathname === "/dashboard/switch/" && request.isNavigationRequest()) {
      migration = false;
      return route.fallback();
    }
    const match = matchingApi(request);
    const body = match && requestBody(request);
    if (!match || !body) {
      if (questionTarget && (method === "PUT" || method === "PATCH")) {
        blockedSave = "The Order form update used an unexpected request format or beta endpoint.";
      }
      return route.abort();
    }
    const [, venue, record] = match;
    if (createLocation && !record && method === "POST" && !checkpoint.current &&
      String(body.location) === createLocation && body.is_recurring !== true &&
      body.status === draftStatus && body.name === draft.name && body.timezone === draft.timezone &&
      approvedSchedule(body.starts_on, draft.startsAt, draft) && approvedSchedule(body.ends_on, draft.endsAt, draft)) {
      createLocation = undefined;
      await persist({ phase: "creating", revision, venue });
      return route.fallback();
    }
    if (questionTarget && venue === questionTarget.venue &&
      (record === String(questionTarget.id) || record === questionTarget.slug) &&
      (method === "PUT" || method === "PATCH") && checkpoint.current?.phase === "draft" &&
      (body.status === undefined || body.status === draftStatus) &&
      (body.name === undefined || body.name === draft.name) &&
      (body.timezone === undefined || body.timezone === draft.timezone) &&
      (body.starts_on === undefined || approvedSchedule(body.starts_on, draft.startsAt, draft)) &&
      (body.ends_on === undefined || approvedSchedule(body.ends_on, draft.endsAt, draft)) &&
      body.info_collect_per_ticket !== true && body.collect_info_post_purchase !== true &&
      hasApprovedQuestions(body.collect_info_custom_questions, draft)) {
      const { slug } = questionTarget;
      questionTarget = undefined;
      await persist({ phase: "saving-questions", revision, venue, slug });
      return route.fallback();
    }
    if (questionTarget && (method === "PUT" || method === "PATCH")) {
      const questions = Array.isArray(body.collect_info_custom_questions) ? body.collect_info_custom_questions : [];
      const approvedNames = questions.filter((question) => draft.questions.includes(question?.title)).length;
      blockedSave = `City blocked the Order form update because its target or settings did not match the approved plan. The form submitted ${questions.length} questions, ${approvedNames} with approved titles. Per-ticket collection: ${String(body.info_collect_per_ticket)}. After-checkout collection: ${String(body.collect_info_post_purchase)}.`;
    }
    return route.abort();
  };
  await page.route("**/*", guard);
  try {
    let journal = checkpoint.current;
    if (journal?.revision !== undefined && journal.revision !== revision) {
      throw new DraftBlocker("This assignment already attempted to save a Draft. Reconcile that Draft before using a revised plan.");
    }
    if (journal?.phase === "creating") throw new DraftBlocker("The earlier Create event request may have saved a Draft. Check beta Events before any new attempt.");
    if (!journal) {
      await page.goto(`${betaOrigin}${createPath}`, { waitUntil: "domcontentloaded" });
      if (new URL(page.url()).pathname.startsWith("/dashboard/")) {
        const button = page.locator('form[action="/dashboard/switch/"]').getByRole("button", { name: "Try the new dashboard", exact: true });
        await button.waitFor({ state: "visible" });
        migration = true;
        await button.click();
        await page.waitForURL(`${betaOrigin}/manage/**`);
        await page.goto(`${betaOrigin}${createPath}`, { waitUntil: "domcontentloaded" });
      }
      await checkOrganization(page, draft.organization);
      if (new URL(page.url()).origin !== betaOrigin || ![createPath, createPath.slice(0, -1)].includes(new URL(page.url()).pathname)) {
        throw new DraftBlocker("The migrated Create event page is unavailable in the selected Organization.");
      }
      await checkOrderFormAccess(page);
      await page.goto(`${betaOrigin}${createPath}`, { waitUntil: "domcontentloaded" });
      await checkOrganization(page, draft.organization);
      step = "filling the migrated Create event form";
      createLocation = await fillCreateForm(page, draft);
      step = "saving the approved Event Draft";
      const [response] = await Promise.all([
        page.waitForResponse((response) => response.request().method() === "POST" && Boolean(matchingApi(response.request()))),
        page.getByRole("button", { name: "Create event", exact: true }).click(),
      ]);
      if (!response.ok()) throw new DraftBlocker(`Create event returned HTTP ${response.status()}. Check the beta Events list before retrying.`);
      const venue = matchingApi(response.request())?.[1];
      await page.waitForURL((url) => url.origin === betaOrigin && editorPath.test(url.pathname), { timeout: 25_000 });
      const slug = editorPath.exec(new URL(page.url()).pathname)?.[1];
      if (!venue || !slug) throw new DraftBlocker("City could not identify the saved Draft.");
      journal = { phase: "draft", revision, venue, slug };
      await persist(journal);
    }
    const { venue, slug } = journal;
    step = "opening the migrated Order form";
    if (![`/manage/events/${slug}/basic-info/`, `/manage/events/${slug}/basic-info`].includes(new URL(page.url()).pathname)) {
      await page.goto(editorUrl(slug), { waitUntil: "domcontentloaded" });
    }
    await checkOrganization(page, draft.organization);
    await openOrderForm(page, slug);
    let saved = await readSavedEvent(page, venue, slug);
    id = saved.id;
    if (saved.name !== draft.name || saved.timezone !== draft.timezone ||
      !approvedSchedule(saved.starts_on, draft.startsAt, draft) || !approvedSchedule(saved.ends_on, draft.endsAt, draft)) {
      throw new DraftBlocker("The reopened Draft details differ from the approved plan.");
    }
    if (!hasApprovedQuestions(saved.collect_info_custom_questions, draft)) {
      if (journal.phase !== "draft" || saved.collect_info_custom_questions?.length) {
        throw new DraftBlocker("The reopened Order form differs from the approved questions. Check the existing Draft before changing it.");
      }
      step = "adding the approved questions in Order form";
      for (const question of draft.questions) {
        await page.getByRole("button", { name: "Add field", exact: true })
          .or(page.getByRole("button", { name: "Add question", exact: true }).and(page.locator('[data-testid$="-during-checkout"]')))
          .click();
        await page.getByTestId("form-builder-add-field-grid").getByText("Short text", { exact: true }).click();
        const title = page.getByTestId("form-builder-element-title");
        await title.fill(question);
        await title.press("Tab");
      }
      step = "saving and reopening Order form";
      questionTarget = { id, slug, venue };
      const save = page.getByTestId("order-form-footer").getByRole("button", { name: "Save", exact: true });
      await Promise.all([
        page.waitForResponse(isSuccessfulEventUpdate),
        save.click(),
      ]);
      await page.getByText("Order form saved", { exact: true }).waitFor({ state: "visible" });
      saved = await readSavedEvent(page, venue, slug);
      if (!hasApprovedQuestions(saved.collect_info_custom_questions, draft)) {
        throw new DraftBlocker("The Order form reopened without the approved questions.");
      }
    }
    await page.getByTestId("order-form-footer").waitFor({ state: "visible" });
    const records = builderRecordsSchema.parse([{ kind: "event", record: {
      id: saved.id, slug: saved.slug, name: saved.name, status: saved.status, venue: Number(venue),
      starts_on: saved.starts_on, ends_on: saved.ends_on, timezone: saved.timezone,
      collect_info_custom_questions: saved.collect_info_custom_questions ?? [],
    } }]);
    await persist({ phase: "verified", revision, venue, slug });
    return {
      outcome: "passed", editorUrl: editorUrl(slug), eventId: id, records,
      verifiedQuestions: draft.questions,
      summary: "Saved and reopened one beta Event in Draft. Verified the single-day schedule and the saved optional questions in the migrated Order form.",
    };
  } catch (error) {
    const journal = checkpoint.current;
    return {
      outcome: "blocked", verifiedQuestions: [], eventId: id,
      editorUrl: journal && "slug" in journal ? editorUrl(journal.slug) : undefined,
      summary: error instanceof DraftBlocker ? error.message
        : blockedSave ?? `City stopped while ${step}. ${journal ? "Check the saved state in the dedicated beta browser." : "No Event save was sent."}`,
    };
  } finally {
    await page.unroute("**/*", guard).catch(() => undefined);
  }
}

function isSuccessfulEventUpdate(response: Response) {
  return ["PATCH", "PUT"].includes(response.request().method()) && Boolean(matchingApi(response.request())?.[2]) && response.ok();
}
