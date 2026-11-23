"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogBody, DialogContent, DialogDescription, DialogFormActions,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Disclosure } from "@/components/ui/disclosure";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/hooks/use-workspace";
import type { BuildReference } from "@/lib/workspace/builder-result";
import { jobLabels, jobNeedsFullReview, jobsFor } from "@/lib/workspace/job";
import { pilotAccountsSchema } from "@/lib/workspace/transfer-pilot";
import { locations } from "@/lib/workspace/city";
import { planReviewLabels, planReviewModes } from "@/lib/workspace/qa-workflow";
import { runFormSchema, runModeLabels, runModes, type Agent, type QaVenue, type Run, type RunFormValues } from "@/lib/workspace/schema";
import { queueRun } from "@/lib/workspace/store";

type AssignmentInputs = {
  agents: Agent[];
  runs: Run[];
  agentId: string;
  source?: { runId: string; record: BuildReference; label: string };
  transferPilot?: boolean;
};

const assignmentFormSchema = runFormSchema.extend({
  builderWorkflow: runFormSchema.shape.builderWorkflow.or(z.literal("")).transform((value) => value || undefined),
});

const reviewOptions = planReviewModes.map((value) => ({ value, label: planReviewLabels[value] }));
const modeOptions = runModes.map((value) => ({ value, label: runModeLabels[value] }));
const builderOptions = [
  { value: "", label: "Choose from the assignment title" },
  { value: "event-builder", label: "Event setup" },
  { value: "offering-builder", label: "Product or Membership setup" },
  { value: "organizer-builder", label: "Other Dashboard setup" },
] as const;

function AssignmentForm({ agents, runs, agentId, source, transferPilot, defaultBuyer, qaVenue, onSaved }: AssignmentInputs & {
  defaultBuyer?: string; qaVenue?: QaVenue; onSaved: () => void;
}) {
  const [useQaVenue, setUseQaVenue] = useState(true);
  const [buyerEmail, setBuyerEmail] = useState(defaultBuyer ?? "");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [accountError, setAccountError] = useState("");
  const { register, control, setError, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<z.input<typeof assignmentFormSchema>, unknown, RunFormValues>({
      resolver: zodResolver(assignmentFormSchema),
      defaultValues: {
        agentId, title: transferPilot ? "Prepare the partial ticket transfer Event" : "",
        instructions: "", mode: "drive", target: "", sourceRunId: source?.runId ?? "",
        reviewMode: "short", builderWorkflow: transferPilot ? "event-builder" : "",
      },
    });
  const reviewMode = useWatch({ control, name: "reviewMode" });
  const selectedAgentId = useWatch({ control, name: "agentId" });
  const selectedAgent = agents.find(({ id }) => id === selectedAgentId);
  const availableJobs = jobsFor(selectedAgent?.role);
  const selectedJob = useWatch({ control, name: "job" });
  const job = availableJobs.length === 1 ? availableJobs[0] : selectedJob;
  const fullReview = reviewMode !== "draft" && jobNeedsFullReview(job);
  const sourceRunId = useWatch({ control, name: "sourceRunId" });
  const venue = sourceRunId ? runs.find(({ id }) => id === sourceRunId)?.qaVenue : qaVenue;

  async function submit(values: RunFormValues) {
    if (availableJobs.length > 1 && (!job || !availableJobs.includes(job))) {
      setError("job", { message: "Choose one job for this assignment." });
      return;
    }
    const accounts = transferPilot ? pilotAccountsSchema.safeParse({ buyerEmail, recipientEmail }) : undefined;
    if (accounts && !accounts.success) {
      setAccountError(accounts.error.issues.some(({ path }) => path[0] === "buyerEmail")
        ? "Enter a valid buyer test email." : "Enter a valid, different recipient test email.");
      return;
    }
    try {
      await queueRun({
        ...values, job: availableJobs.length ? job : undefined, sourceRecord: source?.record,
        builderWorkflow: selectedAgent?.role === "organizer-builder" ? values.builderWorkflow : undefined,
      }, useQaVenue, accounts?.data);
      onSaved();
      toast.success("Assignment saved. Open it in Runs to prepare the plan.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn’t save the assignment.");
    }
  }

  return (
    <form data-testid="new-assignment-form" onSubmit={handleSubmit(submit)} noValidate className="flex min-h-0 flex-col">
      <DialogBody data-testid="new-assignment-body" className="grid gap-4 border-t">
        <FormField testId="assignment-title" label="Title" error={errors.title?.message}>
          {(field) => <Input {...field} {...register("title")} required maxLength={100} className="h-10" />}
        </FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          {agentId ? (
            <p data-testid="assignment-locked-agent" className="self-center text-sm font-medium">{selectedAgent?.name}</p>
          ) : <SelectField
            testId="assignment-agent" control={control} name="agentId" label="Agent" placeholder="Choose an agent" required
            options={agents.map(({ id, name }) => ({ value: id, label: name }))}
          />}
          <SelectField
            testId="assignment-review-path" control={control} name="reviewMode" label="Review path"
            options={transferPilot ? reviewOptions.filter(({ value }) => value !== "draft") : reviewOptions}
            hint={fullReview ? "This job requires full review before live work." : reviewMode === "short" ? "High-risk plans switch to full review." : undefined}
          />
        </div>
        <div className="grid items-start gap-4 empty:hidden sm:grid-cols-2">
          {availableJobs.length > 1 && <SelectField testId="assignment-job" control={control} name="job" label="Job" required
            options={availableJobs.map((value) => ({ value, label: jobLabels[value] }))} />}
          {reviewMode !== "draft" && <SelectField testId="assignment-mode" control={control} name="mode" label="Who drives?" options={modeOptions} />}
          {selectedAgent?.role === "organizer-builder" && !transferPilot && <SelectField testId="assignment-build-area" control={control} name="builderWorkflow" label="Build area" options={builderOptions} />}
        </div>
        <FormField testId="assignment-target" label="Test target (optional)" error={errors.target?.message}>
          {(field) => (
            <Input
              {...field}
              {...register("target")}
              maxLength={180}
              placeholder="Environment, Event, or order reference"
              className="h-10"
            />
          )}
        </FormField>
        <FormField testId="assignment-instructions" label="Instructions (optional)" error={errors.instructions?.message}>
          {(field) => <Textarea {...field} {...register("instructions")} rows={4} maxLength={2000} />}
        </FormField>
        {venue && (
          <Checkbox data-testid="assignment-use-qa-venue" checked={useQaVenue} onChange={(event) => setUseQaVenue(event.target.checked)}>
            Use QA venue · {venue.environment} · {venue.organization}{venue.location && ` · ${venue.location}`}
          </Checkbox>
        )}
        {source && <p data-testid="assignment-selected-build" className="text-sm text-muted-foreground">Saved build · {source.label}</p>}
        {transferPilot && (
          <fieldset className="grid gap-3 rounded-lg border p-3">
            <legend className="px-1 text-sm font-medium">Transfer pilot accounts</legend>
            <p className="text-xs text-muted-foreground">The Customer Tester buys four tickets. The same account sends three. The recipient uses a separate test account.</p>
            <FormField testId="pilot-buyer-email" label="Buyer test email">
              {(field) => <Input {...field} type="email" maxLength={254} value={buyerEmail} onChange={(event) => setBuyerEmail(event.target.value)} required />}
            </FormField>
            <FormField testId="pilot-recipient-email" label="Recipient test email">
              {(field) => <Input {...field} type="email" maxLength={254} value={recipientEmail} onChange={(event) => setRecipientEmail(event.target.value)} required />}
            </FormField>
            {accountError && <p role="alert" className="text-sm text-destructive">{accountError}</p>}
          </fieldset>
        )}
        {!source && !transferPilot && runs.length > 0 && (
          <Disclosure testId="assignment-source" label="Continue from a run (optional)">
            <SelectField
              testId="assignment-source-run" control={control} name="sourceRunId" label="Previous run"
              options={[{ value: "", label: "Start a standalone assignment" }, ...runs.map(({ id, title }) => ({ value: id, label: title }))]}
            />
          </Disclosure>
        )}
      </DialogBody>
      <DialogFormActions testId="new-assignment" label="Save assignment" pending={isSubmitting} />
    </form>
  );
}

export function NewRunDialog({
  agents,
  runs,
  agentId = "",
  source,
  transferPilot = false,
  className,
  variant = "default",
}: Omit<AssignmentInputs, "agentId"> & {
  agentId?: string;
  className?: string;
  variant?: "default" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const { qaVenue, qaAccounts } = useWorkspace();
  const assignableAgents = agents.filter(({ role }) => !role || !locations[role].codexPrompt);
  const defaultAgent = assignableAgents.find((agent) => agent.id === agentId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        data-testid={transferPilot ? "start-transfer-pilot" : source ? `new-assignment-build-${source.record.recordId}` : agentId ? `new-assignment-${agentId}` : "new-assignment"}
        render={<Button variant={variant} className={className} />}
        aria-label={!transferPilot && defaultAgent ? `New assignment for ${defaultAgent.name}` : undefined}
        disabled={assignableAgents.length === 0}
      >
        <PlusIcon aria-hidden="true" /> {transferPilot ? "Start transfer pilot" : source ? "Use in assignment" : "New assignment"}
      </DialogTrigger>
      <DialogContent testId="new-assignment-dialog" width="lg">
        <DialogHeader>
          <DialogTitle>{transferPilot ? "Start transfer pilot" : "New assignment"}</DialogTitle>
          <DialogDescription>{transferPilot ? "Queue the Builder first. Each verified result unlocks the next role’s plan and review." : "Choose who owns the assignment and how to run it. Open the saved assignment to prepare its plan."}</DialogDescription>
        </DialogHeader>
        <AssignmentForm agents={assignableAgents} runs={runs} agentId={defaultAgent?.id ?? ""} source={source}
          transferPilot={transferPilot} defaultBuyer={qaAccounts?.["customer-tester"]} qaVenue={qaVenue} onSaved={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
