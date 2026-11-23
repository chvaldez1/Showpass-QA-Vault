import { z } from "zod";
import { verifyApprovedDraft } from "@/lib/execution/authorization";
import { openBetaBrowser, withBetaBrowser } from "@/lib/execution/beta-browser";
import { runEventDraft } from "@/lib/execution/event-draft-runner";

const requestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("open-browser") }),
  z.object({
    action: z.literal("run"),
    runId: z.uuid(), revision: z.number().int().positive(), executionToken: z.uuid(),
    ready: z.literal(true),
  }),
]);

export async function POST(request: Request) {
  const host = request.headers.get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host) ||
    request.headers.get("origin") !== `http://${host}` ||
    request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ error: "Open Run approved plan from this local City dashboard." }, { status: 403 });
  }
  const text = await request.text();
  let body: unknown;
  try {
    body = text.length <= 2048 ? JSON.parse(text) : null;
  } catch {
    body = null;
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Confirm beta readiness and provide the current plan approval." }, { status: 400 });
  const input = parsed.data;
  try {
    if (input.action === "open-browser") {
      const result = await withBetaBrowser(openBetaBrowser);
      return Response.json({ result });
    }
    const approval = await verifyApprovedDraft(input.runId, input.revision, input.executionToken);
    if (!approval) {
      return Response.json({ error: "The current revision needs QA Lead approval in this City." }, { status: 409 });
    }
    const result = await withBetaBrowser((context) => runEventDraft(context, approval, async () =>
      Boolean(await verifyApprovedDraft(input.runId, input.revision, input.executionToken)),
    ));
    return Response.json({ result });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "The dedicated beta browser could not finish." }, { status: 503 });
  }
}
