import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "use-intl";
import { CiDumbbell } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { getExercises } from "@/lib/apis/exercises.api";

export default function WorkOuts() {
  // Translations and locale setup
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Fetching meals data using React Query
  const { data, error } = useQuery<ExercisesResponse>({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [categoryValue, setCategoryValue] = React.useState("Full Body");
  const [dynamicWorkouts, setDynamicWorkouts] = React.useState("Full Body");

  React.useEffect(() => {
    const mapping: Record<string, string> = {
      "Full Body": "Full Body",
      Chest: "Upper Body",
      Arm: "Upper Body",
      Shoulder: "Upper Body",
      Back: "Midsection",
      Legs: "Lower Body",
      Stomach: "Midsection",
    };
    setDynamicWorkouts(mapping[categoryValue] || "Full Body");
    console.log({ mapping: mapping[categoryValue] });
  }, [categoryValue]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Categories for the tabs body
  const categories = [
    "Full Body",
    "Chest",
    "Arm",
    "Shoulder",
    "Back",
    "Legs",
    "Stomach",
  ];

  const filteredExercises =
    categoryValue === "Full Body"
      ? data?.exercises
      : data?.exercises.filter(
          (exercise) => exercise.body_region === dynamicWorkouts
        );

  console.log({ filteredExercises });

  // If there's an error
  if (error)
    return <p className="text-center text-red-500">{t("error-exercises")}</p>;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-[url('/assets/workOuts/WorkOuts.jpg')] bg-cover bg-center min-h-screen w-full dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors duration-300 py-3"
    >
      {/* Title */}
      <div className="-mb-3">
        <h1 className="flex items-center justify-center relative uppercase m-auto bg-clip-text text-6xl text-muted opacity-50 font-bold font-baloo [text-shadow:1px_1px_0_#f3f3f4,4px_4px_0_#9999]">
          {t("workouts")}
          <div className="bg-muted opacity-20 w-full h-full absolute top-0 left-0"></div>
        </h1>
        <div className="flex items-center justify-center gap-2 -mt-8 -mb-1  relative z-20">
          <CiDumbbell className="text-main" />
          <p className="text-main text-xs">{t("fitness-class")}</p>
        </div>
      </div>

      {/* Exercise */}
      <div className=" relative">
        <div className="absolute top-2 left-0 w-full h-1/2 bg-muted/50 backdrop-blur-md pointer-events-none z-10" />
        {/*  Header */}
        <div className=" relative z-20">
          <div className="text-center p-8">
            <h2 className="text-3xl md:text-4xl font-bold leading-snug">
              {t("transform-your-body")} <br />
              <span className="text-main">
                {t("dynamic-upcoming-workouts")}
              </span>
            </h2>
          </div>
          <Tabs
            dir={isArabic ? "rtl" : "ltr"}
            defaultValue="Full Body"
            className="mb-8"
            onValueChange={setCategoryValue}
          >
            <TabsList className="flex justify-center flex-wrap gap-2 px-2 sm:px-0 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-main text-white px-4 py-1 text-sm md:text-xl border border-main rounded-full"
                >
                  {t(category.toLowerCase().replace(/\s+/g, "-"))}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Carousel for Exercise Categories */}
        <div className="px-4 sm:px-8 lg:px-20 py-8 relative z-20">
          <Carousel
            setApi={setApi}
            opts={{
              direction: isArabic ? "rtl" : "ltr",
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {filteredExercises?.map((exercise: Exercise) => (
                <CarouselItem
                  key={exercise._id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-md group h-full">
                    {/* video */}
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        exercise.short_youtube_demonstration_link.split(
                          "youtu.be/"
                        )[1]
                      }`}
                      className="w-full md:h-96 aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                      allow=" picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-black dark:text-white backdrop-blur-md bg-gradient-to-t from-muted/95 to-muted/50">
                      <h3 className="text-lg font-bold ">
                        {exercise.target_muscle_group}
                      </h3>
                      <Link
                        to={
                          exercise.in_depth_youtube_explanation_link ||
                          `https://www.youtube.com/embed/${
                            exercise.short_youtube_demonstration_link.split(
                              "youtu.be/"
                            )[1]
                          }`
                        }
                        target="_blank"
                        className="text-main text-sm mt-1 inline-flex items-center gap-1"
                      >
                        {t("explore")}
                        <span className="bg-main  rounded-full p-1  text-black dark:text-white">
                          <GoArrowUpRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel Indicators */}
            <CarouselPagination
              api={api}
              current={current}
              count={filteredExercises?.length}
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
