import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import ProgressArc from "../../components/progress-arc";
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormSchema, NextProps } from "../page";

export default function GoalSection({ next, isPending }: NextProps) {
  // Translations
  const t = useTranslations();

  const goals = [
    { id: "gain weight", label: t("Gain-Weight") },
    { id: "lose weight", label: t("Lose-Weight") },
    { id: "get fitter", label: t("Get-Fitter") },
    { id: "gain flexible", label: t("Gain-More-Flexible") },
    { id: "learn basic", label: t("Learn-The-Basic") },
  ];

  // Form handling
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormSchema>();

  // Handle form submission
  const onSubmit = () => {
    next();
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center space-y-10 p-6 font-sans">
      {/* Top: Progress indicator */}
      <div className="w-full flex justify-center pt-4">
        <ProgressArc value={5} max={6} />
      </div>

      {/* Middle section: Main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10 text-center -mt-8"
      >
        {/* Titles */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-baloo text-zinc-800 dark:text-main-foreground tracking-wider uppercase">
            {t("What-Is-Your-Goal")}
          </h1>
          <p className="text-lg font-baloo text-zinc-800 dark:text-main-foreground font-medium">
            {t("This-Helps-Us-Create-Your-Personalized-Plan")}
          </p>
        </div>

        {/* Goal checklist */}
        <div className="w-full max-w-md space-y-4">
          <Controller
            name="goal"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                {goals.map((goal) => (
                  <RadioGroupItem
                    key={goal.id}
                    value={goal.id}
                    className={`p-4 rounded-full border-2 cursor-pointer text-zinc-800 dark:text-main-foreground ${
                      field.value === goal.id
                        ? "border-main dark:border-main bg-transparent"
                        : "border-neutral-700 bg-transparent"
                    }`}
                  >
                    {goal.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          />
          {errors.goal && (
            <p className="text-red-500 text-sm">{errors.goal.message}</p>
          )}
        </div>

        {/* Bottom: Next button */}
        <div className="w-full max-w-sm">
          <Button
            disabled={isPending}
            size="lg"
            className="w-full h-14 rounded-full bg-main hover:bg-main-hover text-white font-baloo text-lg disabled:bg-neutral-800 disabled:text-neutral-500 transition-colors"
          >
            {t("Next")}
          </Button>
        </div>
      </form>
    </div>
  );
}
