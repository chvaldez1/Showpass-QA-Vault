"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SelectOption<Value extends string> = { value: Value; label: string };

export type SelectProps<Value extends string> = Pick<ComponentProps<"button">,
  "id" | "ref" | "className" | "disabled" | "onBlur" | "aria-label" | "aria-labelledby" | "aria-invalid" | "aria-describedby"
> & {
  options: readonly SelectOption<Value>[];
  value: string;
  onValueChange: (value: NoInfer<Value>) => void;
  placeholder?: string;
  required?: boolean;
};

export function Select<Value extends string>({
  options, value, onValueChange, placeholder = "Choose an option", required, className, disabled, ...props
}: SelectProps<Value>) {
  const selected = options.find((option) => option.value === value);

  return (
    <SelectPrimitive.Root<Value>
      items={options}
      value={selected?.value ?? null}
      onValueChange={(next) => { if (next !== null) onValueChange(next); }}
      disabled={disabled || !options.length}
      modal={false}
    >
      <SelectPrimitive.Trigger
        {...props}
        data-slot="select-trigger"
        aria-required={required}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-10 w-full min-w-0 justify-between gap-2 border-input px-3 text-left text-base font-normal md:text-sm",
          className,
        )}
      >
        <SelectPrimitive.Value className={cn("min-w-0 truncate", !selected && "text-muted-foreground")}>
          {selected?.label ?? placeholder}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon render={<ChevronDownIcon aria-hidden="true" className="text-muted-foreground" />} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner align="start" alignItemWithTrigger={false} sideOffset={5} className="z-[60]">
          <SelectPrimitive.Popup className="w-(--anchor-width) max-w-(--available-width) rounded-lg border bg-popover text-sm text-popover-foreground shadow-md outline-none">
            <SelectPrimitive.List
              aria-label={props["aria-label"]}
              aria-labelledby={props["aria-labelledby"]}
              className="max-h-[min(16rem,var(--available-height))] overflow-auto overscroll-contain p-1"
            >
              {options.map(({ value: optionValue, label }) => (
                <SelectPrimitive.Item
                  key={optionValue}
                  value={optionValue}
                  className="flex min-h-9 cursor-pointer select-none items-center justify-between gap-2 rounded-md px-2 py-1.5 outline-none wrap-anywhere data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                >
                  <SelectPrimitive.ItemText className="min-w-0">{label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <CheckIcon aria-hidden="true" className="size-4 shrink-0" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
