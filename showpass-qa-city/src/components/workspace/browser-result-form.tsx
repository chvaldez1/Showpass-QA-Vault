"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { browserFindingsSchema, type BrowserFinding } from "@/lib/workspace/browser-finding";
import { asBuilderWorkflow, browserOutcomeLabels, browserOutcomes, browserResultSchema } from "@/lib/workspace/qa-workflow";
import type { Run } from "@/lib/workspace/schema";
import { FindingFields } from "./browser-findings";

type Outcome = typeof browserOutcomes[number];
const outcomeOptions = browserOutcomes.map((value) => ({ value, label: browserOutcomeLabels[value] }));

export function BrowserResultForm({ result, workflow, pending, onSubmit }: {
  result: Run["browserResult"];
  workflow: NonNullable<Run["workflow"]>;
  pending: boolean;
  onSubmit: (outcome: Outcome, fields: FormData, findings: BrowserFinding[]) => void;
}) {
  const [outcome, setOutcome] = useState<Outcome | "">(result?.outcome ?? "");
  const [attempted, setAttempted] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [findings, setFindings] = useState(result?.findings ?? []);
  const [checkFindings, setCheckFindings] = useState(false);
  const outcomeRef = useRef<HTMLButtonElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const addFindingRef = useRef<HTMLButtonElement>(null);
  const newFindingId = useRef<string>(null);
  const builderWorkflow = asBuilderWorkflow(workflow);
  const parsedFindings = browserFindingsSchema.safeParse(findings);
  const findingErrors: Partial<Record<keyof BrowserFinding, string>>[] = [];
  if (checkFindings && !parsedFindings.success) {
    for (const { path: [index, key], message } of parsedFindings.error.issues) {
      if (typeof index === "number" && typeof key === "string") {
        (findingErrors[index] ??= {})[key as keyof BrowserFinding] = message;
      }
    }
  }

  useEffect(() => {
    outcomeRef.current?.focus();
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (!outcome) {
      setAttempted(true);
      outcomeRef.current?.focus();
      return;
    }
    const fields = new FormData(event.currentTarget);
    const summary = browserResultSchema.shape.summary.safeParse(fields.get("summary"));
    if (!summary.success) {
      setSummaryError(summary.error.issues[0].message);
      summaryRef.current?.focus();
      return;
    }
    if (!parsedFindings.success) {
      setCheckFindings(true);
      return;
    }
    onSubmit(outcome, fields, parsedFindings.data);
  }

  function addFinding() {
    const finding: BrowserFinding = {
      id: crypto.randomUUID(), kind: "suspected-bug", title: "", actual: "", expected: "", impact: "", evidence: "", followUp: "",
    };
    newFindingId.current = finding.id;
    setFindings((current) => [...current, finding]);
  }

  return (
    <form data-testid="run-browser-result-form" className="grid gap-2 border-t pt-3" onSubmit={submit}>
      <FormField testId="run-result-outcome" label="Outcome" error={attempted && !outcome ? "Choose an outcome." : undefined}>
        {(field) => (
          <Select
            {...field}
            ref={outcomeRef}
            value={outcome}
            onValueChange={setOutcome}
            options={outcomeOptions}
            placeholder="Choose an outcome"
            required
          />
        )}
      </FormField>
      <FormField testId="run-result-summary" label="What happened?" error={summaryError}>
        {(field) => <Textarea {...field} ref={summaryRef} name="summary" maxLength={browserResultSchema.shape.summary.maxLength ?? undefined} rows={3} defaultValue={result?.summary} onChange={() => setSummaryError("")} placeholder="What worked, any issues, and the evidence or report link" required />}
      </FormField>
      {workflow === "event-builder" && (
        <FormField testId="run-result-preview" label="Beta Event Preview URL">
          {(field) => <Input {...field} name="preview" type="url" maxLength={1000} defaultValue={result?.preview} />}
        </FormField>
      )}
      {builderWorkflow && (
        <FormField testId="run-result-records" label={builderWorkflow === "organizer-builder" ? "Saved Events, Products or Memberships (optional JSON)" : "Saved Showpass records (JSON)"}>
          {(field) => <Textarea {...field} name="records" rows={5} maxLength={24_000} defaultValue={result?.records ? JSON.stringify(result.records, null, 2) : ""} placeholder="Paste supported saved records returned by the builder in Codex." className="font-mono" />}
        </FormField>
      )}
      <section aria-label="Findings" data-testid="run-result-findings" className="grid min-w-0 gap-3 border-t py-3">
        <h4 className="font-medium">Findings</h4>
        {findings.map((finding, index) => (
          <FindingFields key={finding.id} finding={finding} index={index} errors={findingErrors[index]}
            titleRef={(input) => {
              if (input && newFindingId.current === finding.id) {
                newFindingId.current = null;
                input.focus();
              }
            }}
            onChange={(updated) => setFindings((current) => current.map((entry) => entry.id === finding.id ? updated : entry))}
            onRemove={() => {
              setFindings((current) => current.filter((entry) => entry.id !== finding.id));
              addFindingRef.current?.focus();
            }}
          />
        ))}
        <Button ref={addFindingRef} data-testid="run-add-finding" type="button" variant="outline" className="justify-self-start" disabled={pending} onClick={addFinding}>
          Add finding
        </Button>
      </section>
      <Button data-testid="run-result-save" type="submit" className="justify-self-start" disabled={pending}>
        {pending ? "Saving…" : "Save result"}
      </Button>
    </form>
  );
}
