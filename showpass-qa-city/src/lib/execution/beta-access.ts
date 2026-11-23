import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { BrowserContext } from "playwright";
import { z } from "zod";

const accessCookie = z.object({
  name: z.enum(["CF_Authorization", "CF_Binding", "CF_AppSession"]),
  value: z.string().min(1),
  domain: z.enum(["beta.showpass.com", ".beta.showpass.com"]),
  path: z.string().startsWith("/"),
  expires: z.number(),
  httpOnly: z.boolean(),
  secure: z.literal(true),
  sameSite: z.enum(["Strict", "Lax", "None"]),
});

const accessState = z.object({ cookies: z.array(z.unknown()) });

export async function importBetaAccess(context: BrowserContext) {
  // Match the sibling Showpass Playwright repo's documented local beta session.
  const path = process.env.QA_CITY_BETA_ACCESS_STATE ??
    resolve(process.cwd(), "..", "..", "showpass-playwright", "playwright", ".auth", "cloudflare.json");
  let state: unknown;
  try {
    state = JSON.parse(await readFile(/* turbopackIgnore: true */ path, "utf8"));
  } catch {
    return false;
  }
  const result = accessState.safeParse(state);
  if (!result.success) return false;
  const now = Date.now() / 1000;
  const cookies = result.data.cookies.flatMap((cookie) => {
    const parsed = accessCookie.safeParse(cookie);
    return parsed.success && (parsed.data.expires === -1 || parsed.data.expires > now) ? [parsed.data] : [];
  });
  if (!cookies.some(({ name }) => name === "CF_Authorization")) return false;
  await context.addCookies(cookies);
  return true;
}
