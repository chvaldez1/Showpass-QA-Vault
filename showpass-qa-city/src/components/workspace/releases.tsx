"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Disclosure } from "@/components/ui/disclosure";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/hooks/use-workspace";
import { askLocalCodex } from "@/lib/codex/client";
import {
  canRunReleaseStage, engineeringActionLabels, isLegacyReleaseReview, releaseInputSchema, releaseRoles, releaseStages,
  type Release, type ReleaseInput, type ReleaseRevision, type ReleaseStage,
} from "@/lib/workspace/release";
import { saveRelease, saveReleaseStage } from "@/lib/workspace/store";
import { EvidenceList } from "./evidence-list";
import { PageHeader } from "./page-header";

const fields = [
  { name: "title", label: "Release or change", single: true },
  { name: "candidate", label: "Candidate build and environment", single: true },
  { name: "scope", label: "Affected workflows, clients, and Organizations" },
  { name: "backendSource", label: "Backend source evidence", hint: "Add the revision, file or symbol references, and relevant excerpts or findings." },
  { name: "frontendSource", label: "Frontend source evidence", hint: "Add the revision, file or symbol references, and relevant excerpts or findings." },
  { name: "testEvidence", label: "Executed test evidence", hint: "Add results and evidence from this build and configuration. Leave empty if nothing ran." },
] as const satisfies {
  name: keyof ReleaseInput; label: string; single?: boolean; hint?: string;
}[];

function ReleaseForm({ release, onFinish }: { release?: Release; onFinish: () => void }) {
  const [error, setError] = useState("");
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<ReleaseInput>({
    resolver: zodResolver(releaseInputSchema),
    defaultValues: release?.current.input,
  });

  async function submit(input: ReleaseInput) {
    setError("");
    try {
      const previous = release && { id: release.id, number: release.current.number };
      await saveRelease(input, previous);
      onFinish();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t save the release.");
    }
  }

  return (
    <Card className="p-5">
      <form className="grid gap-4" onSubmit={handleSubmit(submit)} noValidate>
        <h2 className="font-semibold">{release ? "New handoff revision" : "New release handoff"}</h2>
        {fields.map((field) => {
          const { name, label } = field;
          const { minLength, maxLength } = releaseInputSchema.shape[name];
          const props = { ...register(name), maxLength: maxLength ?? undefined, required: !!minLength };
          return (
            <FormField key={name} label={label} error={errors[name]?.message}>
              {(control) => "single" in field
                ? <Input {...control} {...props} />
                : <Textarea {...control} {...props} rows={3} placeholder={"hint" in field ? field.hint : undefined} />}
            </FormField>
          );
        })}
        <p className="text-sm text-muted-foreground">City reviews the source and results you provide. Paste only the evidence this review needs.</p>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : release ? "Save new revision" : "Save release"}</Button>
          <Button type="button" variant="outline" onClick={onFinish} disabled={isSubmitting}>Cancel</Button>
        </div>
      </form>
    </Card>
  );
}

function StageResult({ stage, revision }: { stage: ReleaseStage; revision: ReleaseRevision }) {
  if (stage === "backend" || stage === "frontend") {
    const result = revision[stage];
    return result && (
      <>
        <EvidenceList label="Source findings" entries={result.findings} />
        <EvidenceList label="Missing proof" entries={result.gaps} />
      </>
    );
  }
  if (stage === "lead") {
    const result = revision.lead;
    return result && (
      <>
        <p><strong>{result.handoff}</strong> · Revision {revision.number}</p>
        <p><strong>Release recommendation</strong><br />{result.recommendation}</p>
        <p>{result.rationale}</p>
        <EvidenceList label="Next actions" entries={result.nextActions} />
      </>
    );
  }
  const result = revision.engineer;
  if (stage === "intake") {
    const intake = revision.intake;
    return intake && (
      <>
        <p>{intake.scope}</p>
        <EvidenceList label="Questions for the Masters" entries={intake.questions} />
      </>
    );
  }
  return result && (
    <>
      <p>{result.impact}</p>
      <ul className="grid gap-2">
        {result.checks.map((check, index) => (
          <li key={index} className="rounded-lg border p-3">
            <p className="font-medium">{check.businessCase} · {check.result}{check.required && " · Required"}</p>
            <p>{check.scenario}</p>
            <p className="text-muted-foreground">{check.evidence}</p>
            <p>{check.nextAction}</p>
          </li>
        ))}
      </ul>
      <dl className="space-y-2">
        <div><dt className="font-medium">Rollout checks</dt><dd>{result.rollout}</dd></div>
        <div><dt className="font-medium">Stop and recovery</dt><dd>{result.recovery}</dd></div>
        <div><dt className="font-medium">Stakeholder update</dt><dd>{result.communication}</dd></div>
      </dl>
    </>
  );
}

const stageAction = {
  ...engineeringActionLabels,
  lead: "Send to QA Lead",
} satisfies Record<ReleaseStage, string>;

const stageWaiting = {
  intake: "",
  backend: "Waiting for the Release Engineer to scope the review.",
  frontend: "Waiting for the Backend Master’s findings.",
  engineer: "Waiting for both source reviews.",
  lead: "Waiting for the Release Engineer handoff.",
} satisfies Record<ReleaseStage, string>;

function ReleaseCard({ release }: { release: Release }) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState<ReleaseStage>();
  const [error, setError] = useState("");
  const { current } = release;
  const legacyReview = isLegacyReleaseReview(current);

  async function run(stage: ReleaseStage) {
    if (busy) return;
    setBusy(stage);
    setError("");
    try {
      const result = await askLocalCodex({ action: "release", stage, revision: current });
      await saveReleaseStage(release.id, current.number, stage, result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn’t finish this release stage.");
    } finally {
      setBusy(undefined);
    }
  }

  if (editing) return <ReleaseForm release={release} onFinish={() => setEditing(false)} />;

  return (
    <Card className="min-w-0 gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 wrap-anywhere">
          <h2 className="font-semibold">{current.input.title}</h2>
          <p className="text-sm text-muted-foreground">Revision {current.number} · {current.input.candidate}</p>
        </div>
        <Button variant="outline" onClick={() => setEditing(true)} disabled={!!busy}>Revise handoff</Button>
      </div>
      <p className="text-sm whitespace-pre-wrap wrap-anywhere">{current.input.scope}</p>
      {legacyReview && <p className="text-sm text-muted-foreground">This revision used the earlier review flow. Start a new handoff revision for the full review.</p>}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="grid gap-3 xl:grid-cols-2">
        {releaseStages.map((stage) => (
          <section key={stage} className="min-w-0 space-y-2 rounded-lg border p-3 text-sm wrap-anywhere">
            <h3 className="font-semibold">{stage === "engineer" ? "Release Engineer handoff" : releaseRoles[stage].name}</h3>
            <StageResult stage={stage} revision={current} />
            {canRunReleaseStage(stage, current) && (
              <Button size="sm" onClick={() => void run(stage)} disabled={!!busy}>{stageAction[stage]}</Button>
            )}
            {busy === stage && <p role="status">Working on revision {current.number}…</p>}
            {!legacyReview && !current[stage] && !canRunReleaseStage(stage, current) && (
              <p className="text-muted-foreground">{stageWaiting[stage]}</p>
            )}
          </section>
        ))}
      </div>
      {release.history.length > 0 && (
        <Disclosure label="Earlier revisions">
          <ul className="space-y-2">
            {release.history.map((revision) => (
              <li key={revision.number}>
                <Disclosure label={`Revision ${revision.number} · ${revision.input.candidate} · ${revision.lead?.handoff ?? "Review incomplete"}`}>
                  <p>{revision.input.scope}</p>
                  {releaseStages.map((stage) => revision[stage] && (
                    <section key={stage} className="space-y-2 p-2">
                      <h4 className="font-semibold">{releaseRoles[stage].name}</h4>
                      <StageResult stage={stage} revision={revision} />
                    </section>
                  ))}
                </Disclosure>
              </li>
            ))}
          </ul>
        </Disclosure>
      )}
    </Card>
  );
}

export function Releases() {
  const { releases } = useWorkspace();
  const [adding, setAdding] = useState(false);

  return (
    <>
      <PageHeader
        title="Releases"
        description="Bring source reviews and test evidence to an independent QA Lead decision."
        actions={<Button onClick={() => setAdding(true)} disabled={adding}>New release</Button>}
      />
      {adding && <ReleaseForm onFinish={() => setAdding(false)} />}
      {!adding && !releases.length && <p className="text-sm text-muted-foreground">Create a release handoff for a specific build or change.</p>}
      {releases.map((release) => <ReleaseCard key={release.id} release={release} />)}
    </>
  );
}
