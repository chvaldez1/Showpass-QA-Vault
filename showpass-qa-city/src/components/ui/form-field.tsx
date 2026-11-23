"use client";

import { useId, type ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FieldAttributes = {
  id: string;
  "aria-labelledby": string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

export function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: (attributes: FieldAttributes) => ReactNode;
}) {
  const id = useId();
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  return (
    <div className="grid gap-2">
      <Label id={labelId} htmlFor={id}>{label}</Label>
      {children({
        id,
        "aria-labelledby": labelId,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
