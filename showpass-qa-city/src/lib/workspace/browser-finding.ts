import { z } from "zod";

const findingKinds = ["suspected-bug", "confirmed-bug", "usability", "observation", "blocker"] as const;

export const browserFindingLabels = {
  "suspected-bug": "Suspected bug",
  "confirmed-bug": "Confirmed bug",
  usability: "Usability issue",
  observation: "Observation",
  blocker: "Blocker",
} satisfies Record<(typeof findingKinds)[number], string>;

export const browserFindingSchema = z.object({
  id: z.uuid(),
  kind: z.enum(findingKinds),
  title: z.string().trim().min(1, "Enter a finding title.").max(160),
  actual: z.string().trim().min(1, "Describe what happened.").max(1000),
  expected: z.string().trim().max(1000),
  impact: z.string().trim().max(1000),
  evidence: z.string().trim().max(1000),
  followUp: z.string().trim().max(1000),
}).superRefine((finding, context) => {
  if (finding.kind !== "confirmed-bug") return;
  if (!finding.expected) {
    context.addIssue({ code: "custom", path: ["expected"], message: "Describe the expected behavior for a confirmed bug." });
  }
  if (!finding.evidence) {
    context.addIssue({ code: "custom", path: ["evidence"], message: "Include verification evidence for a confirmed bug." });
  }
});

export const browserFindingsSchema = z.array(browserFindingSchema);
export type BrowserFinding = z.infer<typeof browserFindingSchema>;
