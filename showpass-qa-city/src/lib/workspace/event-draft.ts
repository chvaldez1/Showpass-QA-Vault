import { z } from "zod";
import { builderRecordsSchema } from "./builder-result";

const label = z.string().trim().min(1).max(180);
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

export const eventDraftSchema = z.strictObject({
  organization: label,
  location: label,
  name: label.max(84),
  description: z.string().trim().min(1).max(4000),
  category: label,
  timezone: label,
  date: z.iso.date(),
  startsAt: time,
  endsAt: time,
  questions: z.array(label).min(1).max(5),
});

export function validateEventDraft(input: z.infer<typeof eventDraftSchema>) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: input.timezone }).format();
  } catch {
    return false;
  }
  return input.startsAt < input.endsAt && new Set(input.questions).size === input.questions.length;
}

export const approvedDraftSchema = z.object({
  runId: z.uuid(),
  revision: z.number().int().positive(),
  draft: eventDraftSchema.refine(validateEventDraft),
});

export const draftExecutionResultSchema = z.object({
  outcome: z.enum(["passed", "blocked"]),
  summary: z.string(),
  editorUrl: z.url().optional(),
  eventId: z.number().int().positive().optional(),
  records: builderRecordsSchema.optional(),
  verifiedQuestions: z.array(z.string()),
});

export type ApprovedDraft = z.infer<typeof approvedDraftSchema>;
export type EventDraft = z.infer<typeof eventDraftSchema>;
export type DraftExecutionResult = z.infer<typeof draftExecutionResultSchema>;
