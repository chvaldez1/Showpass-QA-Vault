"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Disclosure } from "@/components/ui/disclosure";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/use-workspace";
import { buildKindLabels, savedBuildRecords } from "@/lib/workspace/build-catalog";
import { NewRunDialog } from "./new-run-dialog";

export function BuildLibrary() {
  const { runs, agents } = useWorkspace();
  const [filter, setFilter] = useState("");
  const term = filter.trim().toLowerCase();
  const builds = runs.filter(({ sample }) => !sample).flatMap((run) =>
    (savedBuildRecords(run) ?? []).map((build) => ({ build, run })),
  );
  const visibleBuilds = builds.filter(({ build, run }) => [
    build.record.name, build.record.id, buildKindLabels[build.kind],
    run.title, run.qaVenue?.environment, run.qaVenue?.organization, run.target,
  ].some((value) => String(value ?? "").toLowerCase().includes(term)));

  return (
    <Card data-testid="build-library" className="gap-0 py-0">
      <section aria-label="Saved builds">
        <div className="border-b p-4 sm:p-5">
          <FormField testId="build-search" label="Search saved builds">
            {(field) => <Input {...field} type="search" value={filter} onChange={(event) => setFilter(event.target.value)} className="sm:max-w-sm" />}
          </FormField>
        </div>
        {!visibleBuilds.length ? (
          <p data-testid="build-library-empty" className="p-5 text-sm text-muted-foreground">
            {term ? "No saved builds match this search." : "Verified Event, Product, and Membership records appear here after a builder records them."}
          </p>
        ) : (
          <ul className="divide-y">
            {visibleBuilds.map(({ build, run }) => {
              const id = `${run.id}-${build.kind}-${build.record.id}`;
              return (
                <li key={id} data-testid={`saved-build-${id}`} className="grid min-w-0 gap-3 p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1 wrap-anywhere">
                      <h2 className="font-semibold">{build.record.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {buildKindLabels[build.kind]} · ID {build.record.id}
                        {run.qaVenue && ` · ${run.qaVenue.environment} · ${run.qaVenue.organization}`}
                      </p>
                      <p className="text-sm text-muted-foreground">Saved by {run.title}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <NewRunDialog agents={agents} runs={runs} variant="outline" source={{
                        runId: run.id, label: build.record.name, record: { kind: build.kind, recordId: build.record.id },
                      }} />
                      <ButtonLink data-testid={`build-to-playwright-${id}`} variant="outline"
                        href={`/playwright?${new URLSearchParams({ run: run.id, build: `${build.kind}-${build.record.id}` })}`}>
                        Prepare Playwright handoff
                      </ButtonLink>
                    </div>
                  </div>
                  <Disclosure testId={`saved-build-record-${id}`} label="Saved Showpass record">
                    <pre tabIndex={0} aria-label="Saved Showpass record JSON" className="max-h-64 overflow-auto rounded bg-muted p-2 text-xs">{JSON.stringify(build, null, 2)}</pre>
                  </Disclosure>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </Card>
  );
}
