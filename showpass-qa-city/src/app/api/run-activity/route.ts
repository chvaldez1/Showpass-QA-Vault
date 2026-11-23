import { createHash } from "node:crypto";
import { readRunActivity } from "@/lib/codex/handoff";
import { isLocalCityRequest } from "@/lib/local-request";
import { codexRevision } from "@/lib/workspace/shared-schema";
import { readSharedWorkspace } from "@/lib/workspace/shared-server";

export async function GET(request: Request) {
  if (!isLocalCityRequest(request)) return Response.json({ error: "Open the local QA City app." }, { status: 403 });

  try {
    const { workspace } = await readSharedWorkspace();
    const candidates = workspace.runs.flatMap((run) => {
      const revision = codexRevision(run);
      return revision ? [{ id: run.id, revision }] : [];
    });
    const results = await Promise.all(candidates.map(async ({ id, revision }) => {
      const status = await readRunActivity(id, revision).catch(() => undefined);
      return status ? [[id, { ...status, revision }]] : [];
    }));
    const body = JSON.stringify(Object.fromEntries(results.flat()));
    const etag = `"${createHash("sha256").update(body).digest("base64url")}"`;
    const headers = { "Cache-Control": "no-store", "Content-Type": "application/json", ETag: etag };
    return request.headers.get("if-none-match") === etag
      ? new Response(null, { status: 304, headers })
      : new Response(body, { headers });
  } catch {
    return Response.json({ error: "City couldn’t load Codex activity." }, { status: 503 });
  }
}
