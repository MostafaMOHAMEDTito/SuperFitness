import { cva } from "class-variance-authority";

export const buttonVariants = cva(
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