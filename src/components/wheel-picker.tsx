import "@ncdai/react-wheel-picker/style.css";
import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";
import { cn } from "@/lib/cn";

function WheelPickerWrapper({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn(
        "w-auto rounded-lg bg-white px-2 shadow-sm ring ring-black/5 dark:bg-zinc-900 dark:ring-white/15",
        "*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md",
        "*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md",
        className
      )}
      {...props}
    />
  );
}

type Option = {
  value: string;
  label: string;
};

interface HorizontalPickerProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function HorizontalPicker({ options, value, onChange }: HorizontalPickerProps) {
  return (
    <WheelPickerWrapper className="overflow-x-auto flex space-x-3 p-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "min-w-[50px] px-5 py-2 rounded-md whitespace-nowrap cursor-pointer select-none transition",
            option.value === value
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
          )}
        >
          {option.label}
        </button>
      ))}
    </WheelPickerWrapper>
  );
}
