import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  optional?: boolean;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  hint,
  error,
  optional = false,
  children,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="font-meta text-[10px] font-medium tracking-[0.12em] text-ink uppercase"
      >
        {label}
        {optional ? (
          <span className="ml-2 tracking-normal text-muted-copy normal-case">
            Optional
          </span>
        ) : null}
      </Label>
      {hint ? (
        <p id={hintId} className="text-[13px] leading-[1.4] text-muted-copy">
          {hint}
        </p>
      ) : null}
      <div
        className={cn(
          "[&_input]:h-11 [&_input]:rounded-none [&_input]:bg-cream [&_input]:text-base",
          "[&_textarea]:rounded-none [&_textarea]:bg-cream [&_textarea]:text-base",
          "[&_button]:h-11 [&_button]:w-full [&_button]:rounded-none [&_button]:bg-cream",
        )}
      >
        {children}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="font-meta text-[10px] text-liberia">
          {error}
        </p>
      ) : null}
    </div>
  );
}
