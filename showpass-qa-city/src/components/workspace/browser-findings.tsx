"use client";

import { Button } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { browserFindingLabels, type BrowserFinding } from "@/lib/workspace/browser-finding";

const kindOptions = (Object.keys(browserFindingLabels) as BrowserFinding["kind"][]).map((value) => ({
  value, label: browserFindingLabels[value],
}));

const detailFields: ReadonlyArray<{
  key: "actual" | "expected" | "impact" | "evidence" | "followUp";
  label: string;
  hint?: string;
}> = [
  { key: "actual", label: "What happened", hint: "Include the screen and the steps that led to it." },
  { key: "expected", label: "Expected behavior" },
  { key: "impact", label: "Impact" },
  { key: "evidence", label: "Evidence", hint: "Add a screenshot reference, report link, or record ID." },
  { key: "followUp", label: "Missing proof or follow-up" },
];

export function FindingFields({ finding, index, errors, titleRef, onChange, onRemove }: {
  finding: BrowserFinding;
  index: number;
  errors: Partial<Record<keyof BrowserFinding, string>> | undefined;
  titleRef: (input: HTMLInputElement | null) => void;
  onChange: (finding: BrowserFinding) => void;
  onRemove: () => void;
}) {
  return (
    <fieldset data-testid="run-finding-fields" className="grid min-w-0 gap-3 rounded-lg border p-3">
      <legend className="px-1 font-medium">Finding {index + 1}</legend>
      <FormField testId="run-finding-kind" label="Type" error={errors?.kind}>
        {(field) => <Select {...field} value={finding.kind} options={kindOptions} onValueChange={(kind) => {
          if (kind) onChange({ ...finding, kind });
        }} />}
      </FormField>
      <FormField testId="run-finding-title" label="Title" error={errors?.title}>
        {(field) => <Input {...field} ref={titleRef} value={finding.title} maxLength={160} onChange={(event) => onChange({ ...finding, title: event.target.value })} required />}
      </FormField>
      {detailFields.map(({ key, label, hint }) => {
        const required = key === "actual" || (finding.kind === "confirmed-bug" && (key === "expected" || key === "evidence"));
        return (
          <FormField key={key} testId={`run-finding-${key}`} label={required ? label : `${label} (optional)`} hint={hint} error={errors?.[key]}>
            {(field) => <Textarea {...field} value={finding[key]} maxLength={1000} rows={2} required={required} onChange={(event) => onChange({ ...finding, [key]: event.target.value })} />}
          </FormField>
        );
      })}
      <Button data-testid="run-finding-remove" aria-label={`Remove finding ${index + 1}`} type="button" variant="outline" className="justify-self-start" onClick={onRemove}>
        Remove finding
      </Button>
    </fieldset>
  );
}

export function ReportedFindings({ findings }: { findings: BrowserFinding[] }) {
  return (
    <Disclosure testId="run-reported-findings" label={findings.length === 1 ? "1 finding" : `${findings.length} findings`}>
      <ul className="grid gap-3">
        {findings.map((finding) => (
          <li key={finding.id} data-testid="run-reported-finding" className="min-w-0 space-y-2 rounded-lg border p-3 wrap-anywhere">
            <p className="font-medium">{finding.title}</p>
            <p className="text-xs text-muted-foreground">{browserFindingLabels[finding.kind]}</p>
            <dl className="space-y-2">
              {detailFields.map(({ key, label }) => finding[key] && (
                <div key={key}>
                  <dt className="font-medium">{label}</dt>
                  <dd className="whitespace-pre-wrap text-muted-foreground">{finding[key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </Disclosure>
  );
}
