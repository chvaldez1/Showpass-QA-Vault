import { z } from "zod";
import { CodexError } from "@/lib/codex/app-server";
import { codexHandoff, HandoffError } from "@/lib/codex/handoff";
import { readSharedWorkspace } from "@/lib/workspace/shared-server";

const requestSchema = z.object({
  action: z.enum(["launch", "status"]),
  runId: z.uuid(),
  revision: z.number().int().positive(),
  token: z.uuid(),
  authorized: z.literal(true).optional(),
}).refine((input) => input.action !== "launch" || input.authorized === true);

export async function POST(request: Request) {
  const host = request.headers.get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host) ||
    request.headers.get("origin") !== `http://${host}` ||
    request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ error: "Run in Codex is available from this local City dashboard." }, { status: 403 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    body = text.length <= 2048 ? JSON.parse(text) : null;
  } catch {
    body = null;
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Open and authorize the current approved plan." }, { status: 400 });

  try {
    if (parsed.data.action === "launch") {
      const { workspace } = await readSharedWorkspace();
      const run = workspace.runs.find(({ id }) => id === parsed.data.runId);
      if (run?.status !== "needs-input" || run.changeRequest || run.revision?.number !== parsed.data.revision ||
        run.revision.review?.decision !== "approved" || run.revision.codexHandoffToken !== parsed.data.token) {
        return Response.json({ error: "Open the current approved plan on the Mac that approved it." }, { status: 409 });
      }
    }
    return Response.json({ result: await codexHandoff(parsed.data, request.signal) });
  } catch (error) {
    if (error instanceof HandoffError) return Response.json({ error: error.message }, { status: error.status });
    return Response.json({ error: error instanceof CodexError ? error.message : "City couldn’t check the paired Codex chat." }, { status: 502 });
  }
}
