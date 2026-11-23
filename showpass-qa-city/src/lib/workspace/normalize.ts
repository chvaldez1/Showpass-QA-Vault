import { cityAgents } from "./city";
import { asBuilderWorkflow, inferBuilderWorkflow } from "./qa-workflow";
import type { Run, Workspace } from "./schema";

const cityAgentIds = new Set(cityAgents.map(({ id }) => id));

function migrateOrganizerAssignment(run: Run): Run {
  if (run.agentId !== "organizer-tester" || run.workflow) return run;
  const inferred = /^(?:(?:please|can you)\s+)?(?:create|build|make|set up|draft|beef up)\b/i.test(run.title)
    ? inferBuilderWorkflow(run.title) : undefined;
  const workflow = run.revision?.workflow ??
    (inferred === "event-builder" || inferred === "offering-builder" ? inferred : "organizer-tester");
  const builderWorkflow = asBuilderWorkflow(workflow);
  return builderWorkflow
    ? { ...run, workflow, builderWorkflow, agentId: "organizer-builder" }
    : { ...run, workflow };
}

export function normalizeWorkspace(workspace: Workspace): Workspace {
  return {
    ...workspace,
    agents: [...cityAgents, ...workspace.agents.filter(({ id }) => !cityAgentIds.has(id))],
    runs: workspace.runs.map(migrateOrganizerAssignment),
  };
}
