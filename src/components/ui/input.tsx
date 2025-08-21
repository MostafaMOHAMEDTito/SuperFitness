import * as React from "react";

import { cn } from "@/lib/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full items-center rounded-full px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border text-zinc-800 dark:text-main-foreground border-zinc-800 dark:border-zinc-200 placeholder:text-zinc-800 dark:placeholder:text-main-foreground font-baloo",
  {
    variants: {
      state: {
        default: "border-zinc-800 dark:border-zinc-200",
        error: "border-red-500 text-red-500 placeholder:text-red-400",
        success: "border-green-500 text-green-600 placeholder:text-green-500",
        disabled: "border-gray-300 text-gray-400 placeholder:text-gray-300",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon,
      state = "default",
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-center gap-2",
            inputVariants({ state, className })
          )}
        >
          {icon && <span className="text-zinc-800 dark:text-main-foreground">{icon}</span>}
          <input
            type={type}
            className="flex-1 bg-transparent text-zinc-800 dark:text-main-foreground border-none outline-none placeholder:text-zinc-800 placeholder:dark:text-main-foreground"
            ref={ref}
            disabled={state === "disabled"}
            {...props}
          />
        </div>
        {errorMessage && state === "error" && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
        {state === "success" && !errorMessage && (
          <p className="mt-1 text-xs text-green-600">Looks good!</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
