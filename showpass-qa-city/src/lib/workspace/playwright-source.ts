import { savedBuildRecords } from "./build-catalog";
import type { Run } from "./schema";

// Carry just the selected evidence. Execution tokens and account settings stay in City.
export function playwrightSource(run: Run | undefined, build?: string) {
  if (!run || run.sample) throw new Error("The selected City assignment is unavailable.");
  const records = savedBuildRecords(run) ?? [];
  const record = build && records.find(({ kind, record }) => `${kind}-${record.id}` === build);
  if (build && !record) throw new Error("The selected saved build is unavailable.");
  const revision = run.revision;
  const result = run.browserResult ?? revision?.draftExecution;
  return [
    `City run ${run.id} · ${run.title} (${run.status})`,
    run.qaVenue && `Environment: ${run.qaVenue.environment} · ${run.qaVenue.organization}`,
    run.target && `Target: ${run.target}`,
    run.instructions && `Original assignment: ${run.instructions}`,
    revision && `City plan ${revision.number}: ${revision.plan.approach}\n${revision.plan.steps.map((step) => `- ${step.action} → ${step.proof}`).join("\n")}`,
    revision && `Original plan boundary: ${revision.plan.changes} Stop: ${revision.plan.stop} Cleanup: ${revision.plan.cleanup}`,
    revision?.plan.sources.length && revision.plan.sources.join("\n"),
    revision?.review && `QA Lead decision on City plan ${revision.number}: ${revision.review.decision}. ${revision.review.rationale}`,
    result && `Recorded City outcome: ${result.outcome}. ${result.summary}`,
    run.browserResult?.preview && `Browser evidence: ${run.browserResult.preview}`,
    ...(run.browserResult?.findings ?? []).map((f) =>
      [`${f.kind}: ${f.title}`, f.actual, f.expected && `Expected: ${f.expected}`, f.evidence, f.followUp].filter(Boolean).join("\n")),
    record ? `Selected saved build:\n${JSON.stringify(record, null, 2)}` :
      records.map(({ kind, record }) => `${kind} ${record.id}: ${record.name}`).join("\n"),
    run.changeRequest && `Requested revision: ${run.changeRequest}`,
  ].filter(Boolean).join("\n\n");
}
