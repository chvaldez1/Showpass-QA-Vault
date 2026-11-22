"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { agentFormSchema, agentKinds, type AgentFormValues } from "@/lib/workspace/schema";
import { addAgent } from "@/lib/workspace/store";
import { agentDisplay } from "./agent-display";

const defaults: AgentFormValues = { name: "", kind: "custom", description: "" };

export function AddAgentDialog() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
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
      <DialogTrigger render={<Button className="h-10 px-4" />}>
        <PlusIcon aria-hidden="true" /> Add agent
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-md">
        <DialogHeader className="pr-7">
          <DialogTitle>Add an agent</DialogTitle>
          <DialogDescription>Save an agent profile in this workspace.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
          <FormField label="Name" error={errors.name?.message}>
            {(field) => <Input {...field} {...register("name")} maxLength={60} className="h-10" />}
          </FormField>
          <FormField label="Type" error={errors.kind?.message}>
            {(field) => (
              <Select {...field} {...register("kind")}>
                {agentKinds.map((kind) => <option key={kind} value={kind}>{agentDisplay[kind].label}</option>)}
              </Select>
            )}
          </FormField>
          <FormField label="Description (optional)" error={errors.description?.message}>
            {(field) => <Textarea {...field} {...register("description")} rows={3} maxLength={240} />}
          </FormField>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button type="submit" disabled={isSubmitting}>Add agent</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
