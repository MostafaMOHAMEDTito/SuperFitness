import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import ProgressArc from "../../components/progress-arc";
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormSchema, NextProps } from "../page";

export default function ActivityLevelSection({ next, isPending }: NextProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const levels = [
    { id: "level1", label: t("Rookie") },
    { id: "level2", label: t("Beginner") },
    { id: "level3", label: t("Intermediate") },
    { id: "level4", label: t("Advance") },
    { id: "level5", label: t("True-Beast") },
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
        <ProgressArc value={6} max={6} />
      </div>

      {/* Middle section: Main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10 text-center -mt-8"
      >
        {/* Titles */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider">
            {t("Your-Regular-Physical-Activity-Level")}
          </h1>
          <p className="text-lg text-neutral-300">
            {t("This-Helps-Us-Create-Your-Personalized-Plan")}
          </p>
        </div>

        {/* Activity level checklist */}
        <div className="w-full max-w-md space-y-4">
          <Controller
            name="activityLevel"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                {levels.map((level) => (
                  <RadioGroupItem
                    key={level.id}
                    value={level.id}
                    className={`p-4 rounded-full border-2 cursor-pointer bg-transparents hover:bg-transparent text-zinc-800 dark:text-main-foreground ${
                      field.value === level.id
                        ? "dark:border-main border-main bg-transparent"
                        : "border-neutral-700 bg-transparent"
                    }`}
                  >
                    {level.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          />
          {errors.activityLevel && (
            <p className="text-red-500 text-sm">
              {errors.activityLevel.message}
            </p>
          )}
        </div>

        {/* Bottom: Next button */}
        <div className="w-full max-w-sm">
          <Button
            disabled={isPending}
            size="lg"
            className="w-full h-14 rounded-full bg-main hover:bg-main-hover text-white font-baloo text-lg disabled:bg-neutral-800 disabled:text-neutral-500 transition-colors"
          >
            {t("register-now")}
          </Button>
        </div>
      </form>
    </div>
  );
}
