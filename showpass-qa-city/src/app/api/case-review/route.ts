import { after } from "next/server";
import { z } from "zod";
import { isLocalCityRequest } from "@/lib/local-request";
import { caseReviewInputSchema } from "@/lib/workspace/case-review";
import { CaseReviewConflict, pauseCaseReview, startCaseReview } from "@/lib/workspace/case-review-server";

const requestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("start"), runId: z.uuid(), number: z.number().int().nonnegative(), input: caseReviewInputSchema.optional() }),
  z.object({ action: z.literal("pause"), runId: z.uuid(), workerId: z.uuid() }),
]);

const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  if (!isLocalCityRequest(request)) return error("Open the local QA City app.", 403);
  const body = await request.text();
  if (body.length > 100_000) return error("Use a smaller set of cases for this assignment.", 413);
  const parsed = requestSchema.safeParse(await new Response(body).json().catch(() => null));
  if (!parsed.success) return error("The test case review request is invalid.", 400);
  const input = parsed.data;
  try {
    if (input.action === "pause") {
      await pauseCaseReview(input.runId, input.workerId);
      return Response.json({ paused: true });
    }
    const run = await startCaseReview(input.runId, input.number, input.input);
    after(run);
    return Response.json({ started: true }, { status: 202 });
  } catch (cause) {
    if (cause instanceof CaseReviewConflict) return error(cause.message, 409);
    return error("City couldn’t update this draft review. Try again on the current revision.", 503);
  }
}
