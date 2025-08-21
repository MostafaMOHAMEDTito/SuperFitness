/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProgressArc from "../../components/progress-arc";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useFormContext } from "react-hook-form";
import type { NextProps } from "../page";

// Create a list of weights from 40 to 200 kg
const weightRange = Array.from({ length: 161 }, (_, i) => i + 40);

export default function WeightSection({ next, isPending }: NextProps) {
  // Translations
  const t = useTranslations();

  // State
  const [api, setApi] = useState<CarouselApi>();
  const [currentWeight, setCurrentWeight] = useState(70);

  // Form handling
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();


  useEffect(() => {
    if (api) {
      api.scrollTo(weightRange.indexOf(currentWeight));
      api.on("select", () => {
        const selected = weightRange[api.selectedScrollSnap()];
        setCurrentWeight(selected);
        setValue("weight", selected);
        console.log("Selected Weight:", selected);
      });
    }
  }, [api, setValue]);

  useEffect(() => {
    if (currentWeight) {
      setValue("weight", currentWeight);
    }
  }, [currentWeight, setValue]);

  // Function
  const getWeightStyle = (weight: number) => {
    const distance = Math.abs(weight - currentWeight);
    if (distance === 0) return "text-main text-6xl font-bold";
    if (distance === 1) return "text-white text-4xl font-semibold";
    if (distance === 2) return "text-neutral-300 text-3xl font-medium";
    return "text-neutral-500 text-2xl font-normal";
  };

  // Handle form submission
  const onSubmit = () => {
    next();
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center space-y-8 p-6 font-sans overflow-hidden">
      {/* Top: Progress indicator */}
      <div className="w-full flex justify-center pt-4">
        <ProgressArc value={3} max={6} />
      </div>

      {/* Middle section: Main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10 text-center w-full"
      >
        {/* Titles (Updated) */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-baloo text-zinc-800 dark:text-main-foreground tracking-wider uppercase">
            {t("What-Is-Your-Weight")}
          </h1>
          <p className="text-lg font-baloo text-zinc-800 dark:text-main-foreground font-medium">
            {t("This-Helps-Us-Create-Your-Plan")}
          </p>
        </div>

        {/* Weight selection bar */}
        <div className="w-full max-w-md relative py-4">
          {/* Indicator and text mark (updated to "Kg") */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full z-10 pointer-events-none">
            <span className="text-main font-baloo text-2xl">{t("Kg")}</span>
          </div>
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-full z-10 pointer-events-none">
            <div className="mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-main"></div>
          </div>

          {/* Carousel Weight */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {weightRange.map((weight) => (
                <CarouselItem key={weight} className="basis-1/5 md:basis-1/5">
                  <div className="p-1">
                    <div className="flex items-center justify-center h-24">
                      <span
                        className={`transition-all duration-300 ${getWeightStyle(
                          weight
                        )} font-baloo`}
                      >
                        {weight}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {errors.weight && (
          <p className="text-red-500 text-sm">
            {errors.weight.message as string}
          </p>
        )}

        {/* Bottom: Follow button */}
        <div className="w-full max-w-sm">
          <Button
            disabled={isPending}
            size="lg"
            className="w-full h-14 rounded-full bg-main text-white font-baloo text-lg hover:bg-main-hover transition-colors"
          >
            {t("Next")}
          </Button>
        </div>
      </form>
    </div>
  );
}
