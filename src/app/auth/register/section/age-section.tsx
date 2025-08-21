/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import ProgressArc from "../../components/progress-arc";
import { useFormContext } from "react-hook-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { FormSchema, NextProps } from "../page";
import { cn } from "@/lib/utils/utils";

// Range of ages from 22 to 60
const ageRange = Array.from({ length: 39 }, (_, i) => 22 + i);

export default function AgeSection({ next, isPending }: NextProps) {
  // Translations
  const t = useTranslations();

  // State
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentAge, setCurrentAge] = useState<number>(25);

  // Form handling
  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<FormSchema>();

  useEffect(() => {
    if (!api) return;

    const index = ageRange.indexOf(currentAge);
    if (index !== -1) api.scrollTo(index);

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentAge(ageRange[selectedIndex]);
    };

    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (currentAge) {
      setValue("age", currentAge);
    }
  }, [currentAge, setValue]);

  // Function
  const getAgeStyle = (age: number) => {
    const distance = Math.abs(age - currentAge);
    if (distance === 0) return "text-main text-6xl font-bold";
    if (distance === 1) return "text-white text-4xl font-semibold";
    if (distance === 2) return "text-neutral-300 text-3xl font-medium";
    return "text-neutral-500 text-2xl font-normal";
  };

  // Handle form submission
  const onSubmit = async () => {
    setValue("age", currentAge);
    const valid = await trigger("age");
    if (valid) next();
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center space-y-10 p-6 font-sans">
      {/* Top: Progress indicator */}
      <div className="w-full flex justify-center pt-4">
        <ProgressArc value={2} max={6} />
      </div>

      {/* Middle section: Main content */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col items-center gap-10 text-center -mt-8"
      >
        <div className="flex flex-col items-center gap-10 text-center w-full">
          {/* Titles */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-zinc-800 dark:text-main-foreground font-baloo font-extrabold tracking-wider uppercase">
              {t("How-Old-Are-You")}
            </h1>
            <p className="text-lg text-zinc-800 dark:text-main-foreground font-baloo">
              {t("This-Helps-Us-Create")}
            </p>
          </div>

          {/* Age Section */}
          <div className="w-full max-w-md relative py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full z-10 pointer-events-none">
              <span className="text-lg text-main font-baloo">
                {t("Years-Old")}
              </span>
            </div>
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-full z-10 pointer-events-none">
              <div className="mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-main"></div>
            </div>

            {/* Carousel age */}
            <Carousel
              setApi={setApi}
              opts={{ align: "center", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {ageRange.map((age) => (
                  <CarouselItem key={age} className="basis-1/5 md:basis-1/5">
                    <div className="p-1">
                      <div
                        className="flex items-center justify-center h-24 cursor-pointer"
                        onClick={() => setCurrentAge(age)}
                      >
                        <span className={cn(getAgeStyle(age), "font-baloo")}>{age}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Bottom: Next button */}
        <div className="w-full max-w-sm">
          <Button
            size="lg"
            disabled={isPending}
            className="w-full h-14 rounded-full bg-main hover:bg-main-hover text-white font-baloo text-lg disabled:bg-neutral-800 disabled:text-neutral-500 transition-colors"
          >
            {t("Next")}
          </Button>
        </div>
      </form>
    </div>
  );
}
