import { Button } from "@/components/ui/button";
import { Mars, Venus } from "lucide-react";
import { useTranslations } from "use-intl";
import ProgressArc from "../../components/progress-arc";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Controller, useFormContext } from "react-hook-form";
import type { FormSchema, NextProps } from "../page";


export default function GenderSection({ next, isPending }: NextProps) {
  // Translations
  const t = useTranslations();

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
        <ProgressArc value={1} max={6} />
      </div>

      {/* Middle section: Main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10 text-center -mt-8"
      >
        {/* Titles */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-zinc-800 dark:text-main-foreground font-baloo font-extrabold tracking-wider uppercase">
            {t("TELL-US-ABOUT-YOURSELF")}
          </h1>
          <p className="text-lg text-zinc-800 dark:text-main-foreground ">
            {t("We-Need-To-Know-Your-Gender")}
          </p>
        </div>

        {/* gender selector buttons */}
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(value) => value && field.onChange(value)}
              className="flex gap-5"
            >
              <ToggleGroupItem
                value="male"
                aria-label="Select male"
                className="flex flex-col gap-2 justify-center items-center w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-neutral-700 data-[state=on]:bg-main data-[state=on]:text-white hover:bg-neutral-900 transition-colors duration-200"
              >
                <span className="text-9xl font-light">
                  <Mars className="text-9xl" />
                </span>
                <span className="font-semibold text-base">{t("Male")}</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="female"
                aria-label="Select female"
                className="flex flex-col gap-2 justify-center items-center w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-neutral-700 data-[state=on]:bg-main data-[state=on]:text-white hover:bg-neutral-900 transition-colors duration-200"
              >
                <span className="text-5xl font-light">
                  <Venus />
                </span>
                <span className="font-semibold text-base">{t("Female")}</span>
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        />
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}

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
