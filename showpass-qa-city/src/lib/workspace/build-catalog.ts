import { matchesBuild, type BuilderRecord } from "./builder-result";
import type { QaVenue, Run } from "./schema";

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

export function reusableBuilds(runs: Run[], current: Run) {
  const venue = current.qaVenue;
  if (!venue) return [];
  const matchesVenue = (saved?: QaVenue) => saved?.environment.toLowerCase() === venue.environment.toLowerCase() &&
    saved.organization.toLowerCase() === venue.organization.toLowerCase();
  const seen = new Set<string>();
  const counts = { event: 0, product: 0, membership_group: 0 };
  const fixtures = [];
  for (const run of runs) {
    if (run.id === current.id || run.sample || run.status !== "completed" || !matchesVenue(run.qaVenue)) continue;
    if ((run.browserResult?.outcome ?? run.revision?.draftExecution?.outcome) !== "passed") continue;
    for (const { kind, record } of savedBuildRecords(run) ?? []) {
      if (kind === "membership_benefit" || counts[kind] >= 2 || seen.has(`${kind}:${record.id}`)) continue;
      const common = { id: record.id, name: record.name, venue: record.venue };
      const details = "tickettype_set" in record
        ? {
          slug: record.slug, status: record.status, ends_on: record.ends_on,
          ticketTypes: record.tickettype_set?.filter(({ id }) => id).slice(0, 8)
            .map(({ id, name, sale_starts_on, sale_ends_on }) => ({ id, name, sale_starts_on, sale_ends_on })),
        }
        : "product_attributes" in record
          ? { is_active: record.is_active, variants: record.product_attributes?.slice(0, 8).map(({ id, name, sku }) => ({ id, name, sku })) }
          : "membership_levels" in record
            ? { status: record.status, levels: record.membership_levels?.slice(0, 8).map(({ id, name }) => ({ id, name })) }
            : {};
      seen.add(`${kind}:${record.id}`);
      counts[kind]++;
      fixtures.push({ kind, ...common, ...details });
    }
  }
  return fixtures;
}
