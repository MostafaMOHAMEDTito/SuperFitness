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
import type { FormSchema, NextProps } from "../page";

// Create a list of heights from 140 to 220 cm
const heightRange = Array.from({ length: 81 }, (_, i) => i + 140);

export default function HeightSection({ next, isPending }: NextProps) {
  // Translations
  const t = useTranslations();

  // State
  const [api, setApi] = useState<CarouselApi>();
  const [currentHeight, setCurrentHeight] = useState(170);

  // Form handling
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormSchema>();

  // Side effects
  useEffect(() => {
    if (api) {
      api.scrollTo(heightRange.indexOf(currentHeight));
      api.on("select", () => {
        const selected = heightRange[api.selectedScrollSnap()];
        setCurrentHeight(selected);
        setValue("height", selected);
        console.log("Selected Height:", selected);
      });
    }
  }, [api, setValue]);

  useEffect(() => {
    if (currentHeight) {
      setValue("height", currentHeight);
    }
  }, [currentHeight, setValue]);

  // Function
  const getHeightStyle = (height: number) => {
    const distance = Math.abs(height - currentHeight);
    if (distance === 0) return "text-orange-500 text-6xl font-bold";
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
        <ProgressArc value={4} max={6} />
      </div>

      {/* Middle section: Main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10 text-center w-full"
      >
        {/* Titles (Updated) */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-baloo text-zinc-800 dark:text-main-foreground tracking-wider uppercase">
            {t("What-Is-Your-Height")}
          </h1>
          <p className="text-lg font-baloo text-zinc-800 dark:text-main-foreground font-medium">
            {t("This-Helps-Us-Create-Your-Personalized-Plan")}
          </p>
        </div>

        {/* Height selection bar */}
        <div className="w-full max-w-md relative py-4">
          {/* Indicator and text mark (updated to "CM") */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full z-10 pointer-events-none">
            <span className="text-orange-500 text-2xl">{t("CM")}</span>
          </div>
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-full z-10 pointer-events-none">
            <div className="mx-auto w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-orange-500"></div>
          </div>

          {/* Carousel Height */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {heightRange.map((height) => (
                <CarouselItem key={height} className="basis-1/5 md:basis-1/5">
                  <div className="p-1">
                    <div className="flex items-center justify-center h-24">
                      <span
                        className={`transition-all duration-300 font-baloo ${getHeightStyle(
                          height
                        )}`}
                      >
                        {height}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {errors.height && (
          <p className="text-red-500 text-sm">{errors.height.message}</p>
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
