"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { asBuilderWorkflow, browserOutcomeLabels, browserOutcomes, browserResultSchema } from "@/lib/workspace/qa-workflow";
import type { Run } from "@/lib/workspace/schema";

type Outcome = typeof browserOutcomes[number];
const outcomeOptions = browserOutcomes.map((value) => ({ value, label: browserOutcomeLabels[value] }));

export function BrowserResultForm({ result, workflow, pending, onSubmit }: {
  result: Run["browserResult"];
  workflow: NonNullable<Run["workflow"]>;
  pending: boolean;
  onSubmit: (outcome: Outcome, fields: FormData) => void;
}) {
  const [outcome, setOutcome] = useState<Outcome | "">(result?.outcome ?? "");
  const [attempted, setAttempted] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const outcomeRef = useRef<HTMLButtonElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const builderWorkflow = asBuilderWorkflow(workflow);

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
    onSubmit(outcome, fields);
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
      <Button data-testid="run-result-save" type="submit" className="justify-self-start" disabled={pending}>
        {pending ? "Saving…" : "Save result"}
      </Button>
    </form>
  );
}
