"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogBody, DialogContent, DialogDescription, DialogFormActions,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { agentFormSchema, agentKinds, type AgentFormValues } from "@/lib/workspace/schema";
import { addAgent } from "@/lib/workspace/store";
import { agentDisplay } from "./agent-display";

const defaults: AgentFormValues = { name: "", kind: "custom", description: "" };
const kindOptions = agentKinds.map((value) => ({ value, label: agentDisplay[value].label }));

export function AddAgentDialog() {
  const [open, setOpen] = useState(false);
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<AgentFormValues>({ resolver: zodResolver(agentFormSchema), defaultValues: defaults });

  async function submit(values: AgentFormValues) {
    try {
      await addAgent(values);
      setOpen(false);
      reset();
      toast.success("Agent added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn’t add the agent.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => {
      setOpen(next);
      if (!next) reset();
    }}>
      <DialogTrigger data-testid="add-agent" render={<Button className="h-10 px-4" />}>
        <PlusIcon aria-hidden="true" /> Add agent
      </DialogTrigger>
      <DialogContent testId="add-agent-dialog">
        <DialogHeader>
          <DialogTitle>Add an agent</DialogTitle>
          <DialogDescription>Save an agent profile in this workspace.</DialogDescription>
        </DialogHeader>
        <form data-testid="add-agent-form" onSubmit={handleSubmit(submit)} noValidate className="flex min-h-0 flex-col">
          <DialogBody data-testid="add-agent-body" className="grid gap-4 border-t">
            <FormField testId="agent-name" label="Name" error={errors.name?.message}>
              {(field) => <Input {...field} {...register("name")} required maxLength={60} className="h-10" />}
            </FormField>
            <SelectField testId="agent-type" control={control} name="kind" label="Type" options={kindOptions} />
            <FormField testId="agent-description" label="Description (optional)" error={errors.description?.message}>
              {(field) => <Textarea {...field} {...register("description")} rows={3} maxLength={240} />}
            </FormField>
          </DialogBody>
          <DialogFormActions testId="add-agent" label="Add agent" pending={isSubmitting} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
