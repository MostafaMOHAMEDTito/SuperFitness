import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

export const SelectionCard = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full p-4 rounded-lg border-2 text-left flex justify-between items-center transition-all",
      selected
        ? "border-orange-500 bg-orange-500/10"
        : "border-gray-600 hover:border-gray-400"
    )}
  >
    <span className="font-semibold">{label}</span>
    {selected && <Check className="text-orange-500" />}
  </button>
);
