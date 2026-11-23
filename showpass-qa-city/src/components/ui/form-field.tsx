"use client";

import { useId, type ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FieldAttributes = {
  id: string;
  "data-testid": string;
  "aria-labelledby": string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

export function FormField({
  label,
  error,
  hint,
  testId,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  testId: string;
  children: (attributes: FieldAttributes) => ReactNode;
}) {
  const id = useId();
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const description = [hint && hintId, error && errorId].filter(Boolean).join(" ");

  return (
    <div data-testid={`${testId}-field`} className="grid min-w-0 gap-2">
      <Label id={labelId} htmlFor={id}>{label}</Label>
      {children({
        id,
        "data-testid": testId,
        "aria-labelledby": labelId,
        "aria-invalid": Boolean(error),
        "aria-describedby": description || undefined,
      })}
      {hint && <p id={hintId} className="text-xs leading-relaxed text-muted-foreground">{hint}</p>}
      {error && (
        <p id={errorId} data-testid={`${testId}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
