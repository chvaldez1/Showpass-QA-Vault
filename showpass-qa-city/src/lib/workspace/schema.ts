import { z } from "zod";
import { browserResultSchema, builderWorkflows, planReviewModes, qaWorkflows, revisionSchema } from "./qa-workflow";
import { releaseSchema } from "./release";

export const agentKinds = ["browser", "coverage", "triage", "custom"] as const;
export const agentRoles = ["public-tester", "customer-tester", "organizer-tester", "organizer-builder", "box-office-tester"] as const;
export const runModes = ["drive", "guide"] as const;
export const runStatuses = ["queued", "running", "needs-input", "completed", "failed", "cancelled"] as const;

export const runModeLabels = {
  drive: "Agent drives",
  guide: "You drive",
} satisfies Record<(typeof runModes)[number], string>;

export const agentFormSchema = z.object({
  name: z.string().trim().min(1, "Enter an agent name.").max(60),
  kind: z.enum(agentKinds),
  description: z.string().trim().max(240),
});

const assignmentDetails = {
  mode: z.enum(runModes),
  target: z.string().trim().max(180),
  sourceRunId: z.string(),
  reviewMode: z.enum(planReviewModes).optional(),
  builderWorkflow: z.enum(builderWorkflows).optional(),
};

export const runFormSchema = z.object({
  agentId: z.string().min(1, "Choose an agent."),
  title: z.string().trim().min(1, "Enter an assignment title.").max(100),
  instructions: z.string().trim().max(2000),
  ...assignmentDetails,
});

const agentSchema = agentFormSchema.extend({
  id: z.string().min(1),
  role: z.enum(agentRoles).optional(),
});

const savedRunSchema = runFormSchema.extend({
  id: z.string().min(1),
  status: z.enum(runStatuses),
  createdAt: z.iso.datetime(),
  mode: assignmentDetails.mode.default("drive"),
  target: assignmentDetails.target.default(""),
  sourceRunId: assignmentDetails.sourceRunId.default(""),
  sample: z.boolean().default(false),
  workflow: z.enum(qaWorkflows).optional(),
  recoveredCodexRevision: z.number().int().positive().optional(),
  revision: revisionSchema.optional(),
  revisionHistory: z.array(revisionSchema).optional(),
  changeRequest: z.string().max(1000).optional(),
  browserResult: browserResultSchema.optional(),
});

export const workspaceSchema = z.object({
  agents: z.array(agentSchema),
  runs: z.array(savedRunSchema),
  releases: z.array(releaseSchema).default([]),
});

export type AgentFormValues = z.infer<typeof agentFormSchema>;
export type RunFormValues = z.infer<typeof runFormSchema>;
export type AgentKind = AgentFormValues["kind"];
export type AgentRole = (typeof agentRoles)[number];
export type Agent = z.infer<typeof agentSchema>;
export type Run = z.infer<typeof savedRunSchema>;
export type RunStatus = Run["status"];
export type Workspace = z.infer<typeof workspaceSchema>;
