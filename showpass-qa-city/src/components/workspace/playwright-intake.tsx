"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PlaywrightIntake({ source = "" }: { source?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [existing, setExisting] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setExisting("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/playwright-handoff", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409) setExisting(result.item);
        throw new Error(result.error || "Could not save this handoff.");
      }
      router.push(`/playwright?item=${encodeURIComponent(result.item)}`);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save this handoff.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} data-testid="playwright-intake" className="grid gap-4">
      <FormField testId="playwright-item-name" label="Work item" hint="Use a ticket key or a short task name.">
        {(field) => <Input {...field} name="item" required maxLength={120} />}
      </FormField>
      <FormField testId="playwright-request" label="What should the team do?" hint="Include the branch, expected behavior, and whether you want a plan, review, or implementation.">
        {(field) => <Textarea {...field} name="request" required maxLength={16000} />}
      </FormField>
      <FormField testId="playwright-evidence" label="Evidence and existing work" hint="Include relevant spec or Qase links, source, findings, or run evidence.">
        {(field) => <Textarea {...field} name="evidence" defaultValue={source} maxLength={64000} />}
      </FormField>
      {error && <p role="alert" data-testid="playwright-intake-error" className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy} data-testid="playwright-save">{busy ? "Saving…" : "Save handoff"}</Button>
        {existing && <ButtonLink href={`/playwright?item=${encodeURIComponent(existing)}`} variant="outline">Open existing handoff</ButtonLink>}
      </div>
    </form>
  );
}
