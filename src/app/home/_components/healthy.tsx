import { getMeals } from "@/lib/apis/meals.api";
import { useQuery } from "@tanstack/react-query";
import { CiDumbbell } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useLocale, useTranslations } from "use-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GoArrowUpRight } from "react-icons/go";
import type { MealCategory, MealsResponse } from "@/lib/types/meals";

export default function Healthy() {
  // Translations and locale setup
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Fetching meals data using React Query
  const { data, error } = useQuery<MealsResponse>({
    queryKey: ["Meals"],
    queryFn: () => getMeals(),
  });

  // If there's an error
  if (error) {
    return (
      <div className="text-center text-red-500">{t("error-loading-meals")}</div>
    );
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-[url('/assets/meals/meals.jpg')] bg-cover bg-center min-h-screen w-full dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors duration-300 py-3"
    >
      <div>
        {/* Title */}
        <div className="-mb-3">
          <h1 className="flex items-center justify-center relative uppercase m-auto bg-clip-text text-6xl text-muted opacity-50 font-bold font-baloo [text-shadow:1px_1px_0_#f3f3f4,4px_4px_0_#9999]">
            {t("healthy")}
            <div className="bg-muted opacity-20 w-full h-full absolute top-0 left-0"></div>
          </h1>
          <div className="flex items-center justify-center gap-2 -mt-8 -mb-1  relative z-20">
            <CiDumbbell className="text-main" />
            <p className="text-main text-xs">{t("healthy-nutritions")}</p>
          </div>
        </div>
        {/* Meals */}
        <div className="relative">
          <div className="absolute top-2 left-0 w-full h-1/2 bg-muted/50 backdrop-blur-md pointer-events-none z-10" />
          {/*  Header */}
          <div className=" relative z-20">
            <p className="uppercase text-4xl font-bold font-baloo text-zinc-900 dark:text-zinc-100 text-center py-10">
              {t("fitness-journey")} <br />
              {t("customized")}{" "}
              <span className="text-main">{t("meal-plans")}</span>{" "}
              {t("for-you")}
            </p>
          </div>

          {/* Carousel for Meal Categories */}
          <div className="px-4 sm:px-8 lg:px-20 py-8 relative z-20">
            <Carousel
              opts={{
                direction: isArabic ? "rtl" : "ltr",
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {data?.categories.map((meal: MealCategory) => (
                  <CarouselItem
                    key={meal.idCategory}
                    className="pl-4 sm:basis-1/2 md:basis-1/3 h-96 "
                  >
                    <div className="relative z-20 h-full flex flex-col rounded-xl overflow-hidden shadow-md group">
                      {/* Image */}
                      <img
                        src={meal.strCategoryThumb}
                        alt={meal.strCategory}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-black dark:text-white backdrop-blur-md bg-gradient-to-t from-muted/95 to-muted/50">
                        <h3 className="text-lg font-bold">
                          {meal.strCategory}
                        </h3>
                        <Link
                          to="healthy"
                          className="text-orange-500 text-sm inline-flex items-center gap-1"
                        >
                          {t("read-more")}
                          <span className="bg-main text-white rounded-full">
                            <GoArrowUpRight />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
