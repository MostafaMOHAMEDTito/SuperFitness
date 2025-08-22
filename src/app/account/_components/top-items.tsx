import { Loader2, RefreshCcw } from "lucide-react";
import { useTranslations } from "use-intl";

type TopItemsProps = {
  goal: string;
  level: string;
  weight: number;
  isLoading: boolean;
};

export default function TopItems({
  goal,
  level,
  weight,
  isLoading,
}: TopItemsProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const FormattedLevel = level?.includes("1")
    ? "Beginner"
    : level?.includes("2")
    ? "Intermediate"
    : "Advanced";

  const items = [
    {
      title: t("your-goal"),
      onClick: () => {},
      value: goal,
    },
    {
      title: t("level"),
      onClick: () => {},
      value: FormattedLevel,
    },
    {
      title: t("weight"),
      onClick: () => {},
      value: weight,
    },
  ];

  return (
    <div className="flex gap-14 relative z-20 mt-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-6 items-center w-1/3">
          <div className="text-center">
            {/* Main title */}
            <h3 className="text-[32px] font-bold font-baloo text-zinc-800 dark:text-main-foreground">
              {item.title}
            </h3>

            {/* Tap to change button */}
            <button
              type="button"
              className="bg-transparent underline text-base uppercase text-zinc-800 dark:text-main-foreground"
            >
              {t("tap-to-change")}
            </button>
          </div>

          {/* User data */}
          <div className="flex items-center justify-between gap-2 bg-main  border border-zinc-800 py-2 px-3 rounded-2xl dark:text-main-foreground text-base font-medium font-baloo text-zinc-800 w-full">
            {/* If the item is loading, show the loading spinner */}
            {isLoading ? (
              <div className="w-full text-center text-zinc-800 dark:text-main-foreground flex items-center justify-center">
                <Loader2 size={20} className="animate-spin" />
              </div>
            ) : (
              <>
                {/* Item value */}
                <span>{index === 2 ? item.value + " KG" : item.value}</span>

                {/* Icon */}
                <span className="text-zinc-800 dark:text-main-foreground">
                  <RefreshCcw size={20} />
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
