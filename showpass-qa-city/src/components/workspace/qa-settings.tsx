"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/use-workspace";
import { cityAgents } from "@/lib/workspace/city";
import { qaAccountRoles, qaAccountsSchema, qaVenueSchema, type QaAccounts, type QaVenue } from "@/lib/workspace/schema";
import { saveQaAccounts, saveQaVenue } from "@/lib/workspace/store";

function VenueForm({ venue }: { venue?: QaVenue }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QaVenue>({
    defaultValues: venue ?? { environment: "Showpass beta", organization: "", location: "" },
    resolver: zodResolver(qaVenueSchema),
  });
  const fields = [
    { name: "environment", label: "Environment", maxLength: 80 },
    { name: "organization", label: "Organization", placeholder: "1859-qa-cad", maxLength: 120 },
    { name: "location", label: "Event location (optional)", placeholder: "CN Tower", maxLength: 120 },
  ] as const;

  return (
    <form data-testid="qa-venue-form" className="grid gap-4" onSubmit={handleSubmit(async (values) => {
      try {
        await saveQaVenue(values);
        toast.success("Default QA venue saved");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Couldn’t save the QA venue.");
      }
    })}>
      {fields.map(({ name, label, maxLength, ...attributes }) => (
        <FormField key={name} testId={`qa-venue-${name}`} label={label} error={errors[name]?.message}>
          {(field) => <Input {...field} {...register(name)} {...attributes} maxLength={maxLength} required={name !== "location"} />}
        </FormField>
      ))}
      <Button type="submit" data-testid="qa-venue-save" className="justify-self-start" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save default venue"}
      </Button>
    </form>
  );
}

function AccountForm({ accounts }: { accounts?: QaAccounts }) {
  const [errors, setErrors] = useState<Partial<Record<(typeof qaAccountRoles)[number], string>>>({});
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(qaAccountRoles.flatMap((role) => {
      const value = String(data.get(role) ?? "").trim();
      return value ? [[role, value]] : [];
    }));
    const parsed = qaAccountsSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map(({ path }) => [path[0], "Enter the Showpass test email for this role."])));
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      await saveQaAccounts(parsed.data);
      toast.success("Showpass test accounts saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn’t save the test accounts.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form data-testid="qa-accounts-form" className="grid gap-4" onSubmit={submit}>
      {qaAccountRoles.map((role) => (
        <FormField key={role} testId={`qa-account-${role}`} label={role === "public-tester" ? "Guest Tester Preview" : cityAgents.find(({ id }) => id === role)?.name ?? role} error={errors[role]}>
          {(field) => <Input {...field} name={role} type="email" maxLength={254} defaultValue={accounts?.[role]} />}
        </FormField>
      ))}
      <Button type="submit" data-testid="qa-accounts-save" className="justify-self-start" disabled={saving}>
        {saving ? "Saving…" : "Save test accounts"}
      </Button>
    </form>
  );
}

export function QaSettings() {
  const { qaVenue, qaAccounts } = useWorkspace();
  return (
    <>
      <Card data-testid="qa-venue-settings" className="gap-4 p-5 sm:p-6">
        <div className="space-y-1">
          <h2 className="text-base font-semibold">QA venue</h2>
          <p className="text-sm text-muted-foreground">New assignments use this default. Each run keeps its own copy.</p>
        </div>
        <VenueForm key={JSON.stringify(qaVenue)} venue={qaVenue} />
      </Card>
      <Card data-testid="qa-account-settings" className="gap-4 p-5 sm:p-6">
        <div className="space-y-1">
          <h2 className="text-base font-semibold">Showpass test accounts</h2>
          <p className="text-sm text-muted-foreground">Set a default test email for signed-in assignments. Guest discovery and checkout start signed out. The Guest Tester uses its email only for authorized Preview.</p>
        </div>
        <AccountForm key={JSON.stringify(qaAccounts)} accounts={qaAccounts} />
      </Card>
    </>
  );
}
