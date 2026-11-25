import { z } from "zod";
import { builderRecordSchema, buildReferenceSchema } from "./builder-result";
import { buildPresetSchema, buildThemeSchema } from "./build-presets";
import { browserResultSchema, builderWorkflows, planReviewModes, qaWorkflows, revisionSchema } from "./qa-workflow";
import { releaseSchema } from "./release";
import { jobSchema } from "./job";
import { pilotInputSchema, transferPilotSchema } from "./transfer-pilot";
import { caseReviewSchema, caseReviewWorkerSchema } from "./case-review";

export const agentKinds = ["browser", "coverage", "triage", "custom"] as const;
export const qaAccountRoles = ["public-tester", "customer-tester", "organizer-tester", "organizer-builder", "box-office-tester"] as const;
export const agentRoles = [...qaAccountRoles, "qase-grammar-police"] as const;
export const qaAccountsSchema = z.partialRecord(z.enum(qaAccountRoles), z.string().trim().pipe(z.email().max(254)));
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
  sourceRecord: buildReferenceSchema.optional(),
  job: jobSchema.optional(),
  reviewMode: z.enum(planReviewModes).optional(),
  builderWorkflow: z.enum(builderWorkflows).optional(),
  buildPreset: buildPresetSchema.optional(),
  buildTheme: buildThemeSchema.optional(),
  publishSupportingEvents: z.boolean().optional(),
};

export const qaVenueSchema = z.object({
  environment: z.string().trim().min(1, "Enter the environment.").max(80),
  organization: z.string().trim().min(1, "Enter the Organization.").max(120),
  location: z.string().trim().max(120),
});

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

const retiredTransferAgentSchema = agentSchema.extend({
  role: z.enum(["transfer-sender", "transfer-recipient"]),
}).transform(() => undefined);

const savedRunSchema = runFormSchema.extend({
  id: z.string().min(1),
  status: z.enum(runStatuses),
  createdAt: z.iso.datetime(),
  mode: assignmentDetails.mode.default("drive"),
  target: assignmentDetails.target.default(""),
  sourceRunId: assignmentDetails.sourceRunId.default(""),
  sample: z.boolean().default(false),
  qaVenue: qaVenueSchema.optional(),
  qaAccountEmail: z.email().optional(),
  pilot: transferPilotSchema.optional(),
  pilotInput: pilotInputSchema.optional(),
  savedSourceRecord: builderRecordSchema.optional(),
  workflow: z.enum(qaWorkflows).optional(),
  recoveredCodexRevision: z.number().int().positive().optional(),
  revision: revisionSchema.optional(),
  revisionHistory: z.array(revisionSchema).optional(),
  caseReview: caseReviewSchema.optional(),
  caseReviewHistory: z.array(caseReviewSchema).optional(),
  caseReviewWorker: caseReviewWorkerSchema.optional(),
  changeRequest: z.string().max(1000).optional(),
  browserResult: browserResultSchema.optional(),
});

export const workspaceSchema = z.object({
  agents: z.array(z.union([agentSchema, retiredTransferAgentSchema]))
    .transform((agents) => agents.filter((agent) => agent !== undefined)),
  runs: z.array(savedRunSchema),
  releases: z.array(releaseSchema).default([]),
  qaVenue: qaVenueSchema.optional(),
  qaAccounts: qaAccountsSchema.optional(),
});

export type AgentFormValues = z.infer<typeof agentFormSchema>;
export type RunFormValues = z.infer<typeof runFormSchema>;
export type AgentKind = AgentFormValues["kind"];
export type AgentRole = (typeof agentRoles)[number];
export type Agent = z.infer<typeof agentSchema>;
export type Run = z.infer<typeof savedRunSchema>;
export type RunStatus = Run["status"];
export type QaVenue = z.infer<typeof qaVenueSchema>;
export type QaAccounts = z.infer<typeof qaAccountsSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
