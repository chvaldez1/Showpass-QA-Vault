import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium, type BrowserContext, type Page } from "playwright";
import { runtimeDirectory } from "./authorization";
import { importBetaAccess } from "./beta-access";

export const betaOrigin = "https://beta.showpass.com";
export const draftStatus = "sp_event_draft";
const state = globalThis as typeof globalThis & {
  qaCityBetaBrowser?: Promise<BrowserContext>;
  qaCityBetaBusy?: boolean;
};

export async function withBetaBrowser<T>(work: (context: BrowserContext) => Promise<T>) {
  if (state.qaCityBetaBusy) throw new Error("The dedicated beta browser is already running a City assignment.");
  state.qaCityBetaBusy = true;
  try {
    state.qaCityBetaBrowser ??= launchBrowser().catch((error: unknown) => {
      state.qaCityBetaBrowser = undefined;
      throw error;
    });
    return await work(await state.qaCityBetaBrowser);
  } finally {
    state.qaCityBetaBusy = false;
  }
}

async function launchBrowser() {
  const profile = join(runtimeDirectory(), "beta-browser");
  await mkdir(/* turbopackIgnore: true */ profile, { recursive: true, mode: 0o700 });
  let context: BrowserContext;
  try {
    context = await chromium.launchPersistentContext(profile, {
      headless: false,
      acceptDownloads: false,
      serviceWorkers: "block",
      viewport: { width: 1440, height: 960 },
    });
  } catch {
    throw new Error("City could not open its dedicated Chromium browser. Run pnpm exec playwright install chromium if Chromium is missing. Close any other City instance using this profile.");
  }
  context.on("close", () => { state.qaCityBetaBrowser = undefined; });
  context.setDefaultTimeout(10_000);
  context.setDefaultNavigationTimeout(25_000);
  await importBetaAccess(context);
  return context;
}

export async function openBetaBrowser(context: BrowserContext) {
  const page = context.pages()[0] ?? await context.newPage();
  if (page.url() === "about:blank" || await isCloudflareVerification(page)) {
    await importBetaAccess(context);
    await page.goto(`${betaOrigin}/manage/`, { waitUntil: "domcontentloaded" });
  }
  await page.bringToFront();
  if (await isCloudflareVerification(page)) return "Showpass beta is waiting for Cloudflare verification in the dedicated browser.";
  if (new URL(page.url()).pathname.startsWith("/accounts/login")) {
    return "Cloudflare Access passed. Sign in to Showpass beta in the dedicated browser.";
  }
  return "Dedicated beta browser opened. Sign in and select the approved Organization if prompted.";
}

export async function isCloudflareVerification(page: Page) {
  const host = new URL(page.url()).hostname;
  if (host.endsWith(".cloudflareaccess.com") || host === "accounts.google.com") return true;
  if (host !== "beta.showpass.com") return false;
  return /just a moment|attention required|cloudflare/i.test(await page.title().catch(() => "")) ||
    await page.locator("#challenge-running, #challenge-stage, #cf-challenge-running").first().isVisible();
}
