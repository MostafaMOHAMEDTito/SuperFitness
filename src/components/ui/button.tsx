import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:transition-all hover:duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF3C00] text-white hover:bg-[#FF3C00]/85 disabled:bg-gray-400",
        outline:
          "border border-[#FF3C00] text-[#FF3C00] hover:bg-[#FF3C00]/10 rounded-[100px] disabled:opacity-50",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:border-zinc-700",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-gray-200 border border-storm-100 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-zinc-500",
      },
      size: {
        default: "h-10 px-4 py-2.5 rounded-[100px]",
        sm: "h-9 px-3 rounded-[100px]",
        lg: "h-11 px-8 rounded-[100px]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {loading && <Loader2 size={18} className="animate-spin" />}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
