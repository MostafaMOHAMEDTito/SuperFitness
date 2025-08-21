import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "flex items-center justify-between w-full px-4 py-2 bg-neutral-900 text-zinc-800 dark:text-main-foreground rounded-xl border border-zinc-800 dark:border-main-foreground transition-colors",
        className
      )}
      {...props}
    >
      <span className="text-sm font-medium">{children}</span>
      <span className="flex items-center justify-center w-5 h-5 rounded-full border border-zinc-800 dark:border-main-foreground">
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-3 w-3 fill-zinc-800 dark:fill-main-foreground" />
        </RadioGroupPrimitive.Indicator>
      </span>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
