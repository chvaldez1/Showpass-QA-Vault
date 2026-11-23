"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { planReviewLabels, planReviewModes } from "@/lib/workspace/qa-workflow";
import { runFormSchema, runModeLabels, runModes, type Agent, type Run, type RunFormValues } from "@/lib/workspace/schema";
import { queueRun } from "@/lib/workspace/store";

type AssignmentInputs = {
  agents: Agent[];
  runs: Run[];
  agentId: string;
};

function AssignmentForm({ agents, runs, agentId, onSaved }: AssignmentInputs & { onSaved: () => void }) {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<RunFormValues>({
      resolver: zodResolver(runFormSchema),
      defaultValues: { agentId, title: "", instructions: "", mode: "drive", target: "", sourceRunId: "", reviewMode: "short" },
    });
  const reviewMode = useWatch({ control, name: "reviewMode" });
  const selectedAgentId = useWatch({ control, name: "agentId" });
  const selectedAgent = agents.find(({ id }) => id === selectedAgentId);

  async function submit(values: RunFormValues) {
    try {
      await queueRun(values);
      onSaved();
      toast.success("Assignment saved. Open it in Runs to prepare the plan.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn’t save the assignment.");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Agent" error={errors.agentId?.message}>
          {(field) => (
            <Select {...field} {...register("agentId")}>
              <option value="">Choose an agent</option>
              {agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
            </Select>
          )}
        </FormField>
        <FormField label="Review path" error={errors.reviewMode?.message}>
          {(field) => (
            <Select {...field} {...register("reviewMode")}>
              {planReviewModes.map((mode) => <option key={mode} value={mode}>{planReviewLabels[mode]}</option>)}
            </Select>
          )}
        </FormField>
      </div>
      {reviewMode === "short" && <p className="text-sm text-muted-foreground">If the plan or Release Engineer finds high risk, City switches it to full review.</p>}
      {reviewMode !== "draft" && (
        <FormField label="Who drives?" error={errors.mode?.message}>
          {(field) => (
            <Select {...field} {...register("mode")}>
              {runModes.map((mode) => <option key={mode} value={mode}>{runModeLabels[mode]}</option>)}
            </Select>
          )}
        </FormField>
      )}
      <FormField label="Title" error={errors.title?.message}>
        {(field) => <Input {...field} {...register("title")} maxLength={100} className="h-10" />}
      </FormField>
      {selectedAgent?.role === "organizer-builder" && (
        <FormField label="Build area" error={errors.builderWorkflow?.message}>
          {(field) => (
            <Select {...field} {...register("builderWorkflow", { setValueAs: (value) => value || undefined })}>
              <option value="">Choose from the assignment title</option>
              <option value="event-builder">Event setup</option>
              <option value="offering-builder">Product or Membership setup</option>
              <option value="organizer-builder">Other Dashboard setup</option>
            </Select>
          )}
        </FormField>
      )}
      {runs.length > 0 && (
        <FormField label="Continue from a run (optional)" error={errors.sourceRunId?.message}>
          {(field) => (
            <Select {...field} {...register("sourceRunId")}>
              <option value="">Start a standalone assignment</option>
              {runs.map((run) => <option key={run.id} value={run.id}>{run.title}</option>)}
            </Select>
          )}
        </FormField>
      )}
      <FormField label="Test target (optional)" error={errors.target?.message}>
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
      <FormField label="Instructions (optional)" error={errors.instructions?.message}>
        {(field) => <Textarea {...field} {...register("instructions")} rows={4} maxLength={2000} />}
      </FormField>
      <DialogFooter>
        <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
        <Button type="submit" disabled={isSubmitting}>Save assignment</Button>
      </DialogFooter>
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
        render={<Button variant={variant} className={className} />}
        aria-label={defaultAgent ? `New assignment for ${defaultAgent.name}` : undefined}
        disabled={agents.length === 0}
      >
        <PlusIcon aria-hidden="true" /> New assignment
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader className="pr-7">
          <DialogTitle>New assignment</DialogTitle>
          <DialogDescription>Choose who owns the assignment and how to run it. Open the saved assignment to prepare its plan.</DialogDescription>
        </DialogHeader>
        <AssignmentForm agents={agents} runs={runs} agentId={agentId} onSaved={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
