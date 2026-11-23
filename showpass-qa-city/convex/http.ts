import { httpRouter } from "convex/server";
import { z } from "zod";
import { convexCommitSchema } from "../src/lib/workspace/convex-schema";
import { qaAccountRoles } from "../src/lib/workspace/schema";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

function isAuthorized(request: Request) {
  const secret = process.env.QA_CITY_CONVEX_SECRET;
  return Boolean(secret && secret.length >= 32 && request.headers.get("Authorization") === `Bearer ${secret}`);
}

const http = httpRouter();
http.route({
  path: "/qa-city/workspace", method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!isAuthorized(request)) return new Response(null, { status: 401 });
    const input = z.discriminatedUnion("action", [
      z.object({ action: z.literal("read"), since: z.number().int().nonnegative().optional() }),
      convexCommitSchema.extend({ action: z.literal("commit") }),
    ]).safeParse(await request.json().catch(() => null));
    if (!input.success) return new Response(null, { status: 400 });
    if (input.data.action === "read") {
      const result = await ctx.runQuery(internal.workspace.read, { since: input.data.since });
      if (result.status !== "ready") return Response.json(result);
      return Response.json({
        ...result,
        qaAccounts: result.qaAccounts && Object.fromEntries(result.qaAccounts.map(({ role, email }) => [role, email])),
      });
    }
    const { expectedVersion, version, qaVenue, qaAccounts, upserts, removed } = input.data;
    const accounts = qaAccounts && qaAccountRoles.flatMap((role) => {
      const email = qaAccounts[role];
      return email ? [{ role, email }] : [];
    });
    const committed = await ctx.runMutation(internal.workspace.commit, {
      expectedVersion, version, qaVenue, qaAccounts: accounts, upserts, removed,
    });
    return committed ? new Response(null, { status: 204 }) : new Response(null, { status: 409 });
  }),
});

export default http;
