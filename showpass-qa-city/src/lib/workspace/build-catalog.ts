import { matchesBuild, type BuilderRecord } from "./builder-result";
import type { Run } from "./schema";

export const buildKindLabels = {
  event: "Event",
  product: "Product",
  membership_group: "Membership",
  membership_benefit: "Membership benefit",
} satisfies Record<BuilderRecord["kind"], string>;

export function savedBuildRecords(run?: Run) {
  return run?.browserResult?.records ?? run?.revision?.draftExecution?.records;
}

export function sourceRecordsFor(run: Run, source?: Run) {
  if (run.savedSourceRecord) return [run.savedSourceRecord];
  const records = savedBuildRecords(source);
  const reference = run.sourceRecord;
  return reference ? records?.filter((record) => matchesBuild(record, reference)) : records;
}
