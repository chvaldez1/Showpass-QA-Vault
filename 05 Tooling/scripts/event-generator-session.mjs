import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { targetOrigin, assert } from "./event-generator-plan.mjs";

// Run the CLI with the existing repo's tsx runner and tsconfig so its TS helpers
// and aliases resolve. This reads/reuses the repo; it does not edit it.
export async function createSession({ origin, environment }) {
  assert(
    targetOrigin(environment) === origin,
    "Only the selected beta/demo origin is permitted.",
  );
  assert(
    process.env.SITE_URL === origin,
    "SITE_URL must exactly match the selected beta/demo origin before authentication.",
  );
  const userEmail = process.env.SHOWPASS_QA_EMAIL;
  const userPassword = process.env.SHOWPASS_QA_PASSWORD;
  assert(
    userEmail && userPassword,
    "Set SHOWPASS_QA_EMAIL and SHOWPASS_QA_PASSWORD through your existing secret configuration. Credentials are never read from a data plan.",
  );
  const repo = resolve(
    process.env.SHOWPASS_PLAYWRIGHT_REPO ??
      "/Users/christianvaldez/Documents/Showpass/repos/showpass-playwright",
  );
  const requireFromRepo = createRequire(resolve(repo, "package.json"));
  const { request } = requireFromRepo("@playwright/test");
  const { signInUsingAPI } = await import(
    pathToFileURL(resolve(repo, "utils/api-helpers.ts")).href
  );
  const { getLocalCloudflareStorageState, getCloudflareServiceHeaders } =
    await import(
      pathToFileURL(resolve(repo, "fixtures/helpers/cloudflare-access.ts")).href
    );
  const context = await request.newContext({
    baseURL: origin,
    failOnStatusCode: false,
    storageState: getLocalCloudflareStorageState(environment, origin) ?? {
      cookies: [],
      origins: [],
    },
    extraHTTPHeaders: {
      Origin: origin,
      Referer: `${origin}/manage/`,
      ...getCloudflareServiceHeaders(environment, origin),
    },
  });
  // The reused login helper uses a relative URL. Guard it before credentials
  // reach a request, and suppress redirect following for every helper request.
  let loginDiagnostic = { stage: "login" }, requestCount = 0;
  const guardedApi = new Proxy(context, {
    get(target, key) {
      if (
        !["fetch", "get", "post", "put", "patch", "delete", "head"].includes(
          key,
        )
      ) {
        const value = Reflect.get(target, key, target);
        return typeof value === "function" ? value.bind(target) : value;
      }
      return async (path, options = {}) => {
        const url = new URL(path, origin);
        assert(
          url.origin === origin &&
            url.protocol === "https:" &&
            !url.username &&
            !url.password,
          "Cross-host session requests are disabled.",
        );
        const loginRequest = url.pathname === "/api/auth/login/";
        requestCount++;
        const response = await target[key](url.href, {
          ...options,
          maxRedirects: 0,
          maxRetries: 0,
          ...(loginRequest ? { failOnStatusCode: false } : {}),
        });
        if (loginRequest) {
          loginDiagnostic.httpStatus = response.status();
          if (!response.ok()) {
            let body;
            try { body = await response.json(); } catch {}
            loginDiagnostic.responseFields = body && typeof body === "object" ? Object.keys(body) : [];
            const message = JSON.stringify(body ?? "");
            loginDiagnostic.reason = /csrf/i.test(message) ? "csrf_rejected" : /invalid|incorrect|unable to log in|not active/i.test(message) ? "login_rejected" : "http_rejected";
            await response.dispose();
            throw new Error("API login rejected.");
          }
        }
        return response;
      };
    },
  });
  try {
    const csrfToken = await signInUsingAPI(guardedApi, {
      userEmail,
      userPassword,
    });
    return { api: guardedApi, csrfToken, setupRequestCount:requestCount, dispose: () => context.dispose() };
  } catch (error) {
    if (loginDiagnostic.httpStatus === 200) {
      const state = await context.storageState();
      loginDiagnostic.cookieNames = state.cookies.map(cookie => cookie.name);
      loginDiagnostic.reason = "csrf_cookie_unavailable_after_login";
    }
    await context.dispose();
    // Avoid propagating a helper/HTTP error containing login request details.
    const failure = new Error(
      `Beta/demo API login failed (${JSON.stringify(loginDiagnostic)}). No Event generation was attempted.`,
    );
    failure.setupRequestCount=requestCount;
    throw failure;
  }
}
