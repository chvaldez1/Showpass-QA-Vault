"use client";

import { useController, type Control, type FieldPathByValue, type FieldValues } from "react-hook-form";
import { FormField } from "@/components/ui/form-field";
import { Select, type SelectProps } from "@/components/ui/select";

export function SelectField<Values extends FieldValues, Output extends FieldValues, Value extends string>({
  control, name, label, ...props
}: Pick<SelectProps<Value>, "options" | "placeholder" | "required" | "disabled"> & {
  control: Control<Values, unknown, Output>;
  name: FieldPathByValue<Values, string | undefined>;
  label: string;
}) {
  const { field, fieldState } = useController({ control, name });
  return (
    <FormField label={label} error={fieldState.error?.message}>
      {(attributes) => (
        <Select
          {...attributes}
          {...props}
          ref={field.ref}
          onBlur={field.onBlur}
          value={typeof field.value === "string" ? field.value : ""}
          onValueChange={field.onChange}
        />
      )}
    </FormField>
  );
}
