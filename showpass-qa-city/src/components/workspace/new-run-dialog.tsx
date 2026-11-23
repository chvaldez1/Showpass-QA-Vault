"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogBody, DialogContent, DialogDescription, DialogFormActions,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Disclosure } from "@/components/ui/disclosure";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { planReviewLabels, planReviewModes } from "@/lib/workspace/qa-workflow";
import { runFormSchema, runModeLabels, runModes, type Agent, type Run, type RunFormValues } from "@/lib/workspace/schema";
import { queueRun } from "@/lib/workspace/store";

type AssignmentInputs = {
  agents: Agent[];
  runs: Run[];
  agentId: string;
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

function AssignmentForm({ agents, runs, agentId, onSaved }: AssignmentInputs & { onSaved: () => void }) {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<z.input<typeof assignmentFormSchema>, unknown, RunFormValues>({
      resolver: zodResolver(assignmentFormSchema),
      defaultValues: { agentId, title: "", instructions: "", mode: "drive", target: "", sourceRunId: "", reviewMode: "short", builderWorkflow: "" },
    });
  const reviewMode = useWatch({ control, name: "reviewMode" });
  const selectedAgentId = useWatch({ control, name: "agentId" });
  const selectedAgent = agents.find(({ id }) => id === selectedAgentId);

  async function submit(values: RunFormValues) {
    try {
      await queueRun(selectedAgent?.role === "organizer-builder" ? values : { ...values, builderWorkflow: undefined });
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
          <SelectField
            testId="assignment-agent" control={control} name="agentId" label="Agent" placeholder="Choose an agent" required
            options={agents.map(({ id, name }) => ({ value: id, label: name }))}
          />
          <SelectField
            testId="assignment-review-path" control={control} name="reviewMode" label="Review path" options={reviewOptions}
            hint={reviewMode === "short" ? "High-risk plans switch to full review." : undefined}
          />
        </div>
        <div className="grid items-start gap-4 empty:hidden sm:grid-cols-2">
          {reviewMode !== "draft" && <SelectField testId="assignment-mode" control={control} name="mode" label="Who drives?" options={modeOptions} />}
          {selectedAgent?.role === "organizer-builder" && <SelectField testId="assignment-build-area" control={control} name="builderWorkflow" label="Build area" options={builderOptions} />}
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
        {runs.length > 0 && (
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
  className,
  variant = "default",
}: Omit<AssignmentInputs, "agentId"> & {
  agentId?: string;
  className?: string;
  variant?: "default" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const defaultAgent = agents.find((agent) => agent.id === agentId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        data-testid={agentId ? `new-assignment-${agentId}` : "new-assignment"}
        render={<Button variant={variant} className={className} />}
        aria-label={defaultAgent ? `New assignment for ${defaultAgent.name}` : undefined}
        disabled={agents.length === 0}
      >
        <PlusIcon aria-hidden="true" /> New assignment
      </DialogTrigger>
      <DialogContent testId="new-assignment-dialog" width="lg">
        <DialogHeader>
          <DialogTitle>New assignment</DialogTitle>
          <DialogDescription>Choose who owns the assignment and how to run it. Open the saved assignment to prepare its plan.</DialogDescription>
        </DialogHeader>
        <AssignmentForm agents={agents} runs={runs} agentId={agentId} onSaved={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
