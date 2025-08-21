"use client";

import { useEffect, useState } from "react";
import { useLocale } from "use-intl";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { TbArrowRight } from "react-icons/tb";
import GradientStrokeText from "@/components/common/stroke-text";
import { CarouselComponent } from "@/components/common/carousel";
import { TabsComponent } from "@/components/common/tabs";
import { fetchMealsByCategory } from "@/lib/apis/meals.api";
import type { MealSummary } from "@/lib/apis/meals.api";

interface ClassesDetailsProps {
    exercise: Exercise;
}

export default function ClassesDetails({ exercise }: ClassesDetailsProps) {
    // Localization 
    const locale = useLocale();

    // Navigation
    const navigate = useNavigate();

    const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
        exercise.difficulty_level || "Beginner"
    );
    const [recommendedMeals, setRecommendedMeals] = useState<MealSummary[]>([]);
    const [isPlaying, setIsPlaying] = useState(false); 

    const mealCategory = (() => {
        const muscleToMealMap: Record<string, string> = {
            Abdominals: "Beef",
            Glutes: "Chicken"
        };
        return muscleToMealMap[exercise.target_muscle_group] ?? "Seafood";
    })();

    useEffect(() => {
        fetchMealsByCategory(mealCategory)
            .then((meals) => setRecommendedMeals(meals.slice(0, 6)))
            .catch(() => setRecommendedMeals([]));
    }, [mealCategory]);

    const difficultyTabs = ["Beginner", "Intermediate", "Advanced"];

    const embedUrl = (() => {
        const url = exercise.in_depth_youtube_explanation_link;
        if (!url) return "";
        const match = url.match(/youtu\.be\/(.+)$/);
        const videoId = match ? match[1] : "";
        return videoId ? `https://www.youtube.com/embed/${videoId}${isPlaying ? "?autoplay=1" : ""}` : "";
    })();

    return (
        <main>
            <section className="container mx-auto pt-8 font-baloo dark:text-white dark:bg-[#1E1E1E]">
                <div className="hidden md:block md:absolute md:-translate-y-1/2 md:top-[100px] md:left-1/2 md:-translate-x-1/2 md:z-20">
                    <GradientStrokeText textKey="workouts" />
                </div>

                <div className={`flex flex-col md:flex-row gap-6 mt-8 ${locale === "ar" ? "md:flex-row-reverse" : ""}`}>
                    {/* Difficulty selection panel */}
                    <div className="md:w-1/3 space-y-4 border border-gray-400 dark:border-gray-300 rounded-xl p-1 h-fit">
                        <TabsComponent
                            tabs={difficultyTabs.map((diff) => ({
                                value: diff,
                                label: diff,
                                content: (
                                    <div>
                                        {exercise.difficulty_level === diff && (
                                            <div className="cursor-pointer flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-700">
                                                <div>
                                                    <span className="truncate font-medium text-lg mb-1">{exercise.exercise}</span>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        <p>{exercise.prime_mover_muscle}</p>
                                                        <p>{exercise.primary_equipment}</p>
                                                        <p>{exercise.posture}</p>
                                                    </div>
                                                </div>
                                                <FaPlayCircle className="text-xl text-orange-500" />
                                            </div>
                                        )}
                                    </div>
                                ),
                            }))}
                            defaultValue={selectedDifficulty}
                            value={selectedDifficulty}
                            onValueChange={setSelectedDifficulty}
                            tabsListClassName="my-4"
                            visibleTabsCount={3}
                        />
                    </div>

                    {/* Main content area */}
                    <div className="md:w-2/3 w-full pr-0 md:pr-8 relative">
                        <div className="space-y-6">
                            {/* Exercise video player */}
                            <div className="relative h-[300px] md:h-[500px] bg-black rounded-xl overflow-hidden">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={embedUrl}
                                    title={exercise.exercise}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />

                                {/* Animated play button overlay */}
                                {!isPlaying && (
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 z-10 cursor-pointer"
                                        onClick={() => setIsPlaying(true)}
                                    >
                                        <span className="absolute inline-flex w-full h-full rounded-full bg-orange-500 opacity-75 animate-ping"></span>
                                        <span
                                            className="absolute inline-flex w-full h-full rounded-full bg-orange-400 opacity-50 animate-ping"
                                            style={{ animationDelay: "0.3s" }}
                                        ></span>
                                        <span
                                            className="absolute inline-flex w-full h-full rounded-full bg-orange-300 opacity-30 animate-ping"
                                            style={{ animationDelay: "0.6s" }}
                                        ></span>
                                        <FaPlayCircle className="relative text-orange-500 text-5xl" />
                                    </div>
                                )}

                                {/* Video metadata overlay */}
                                {!isPlaying && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 rounded-b-xl">
                                        <h3 className="text-2xl md:text-5xl font-semibold text-center capitalize mb-4 text-white">
                                            {exercise.exercise}
                                        </h3>
                                        <div className="text-gray-500 text-sm md:text-lg">
                                            <p>{exercise.grip} , {exercise.load_position_ending}</p>
                                            <p>{exercise.single_or_double_arm} , {exercise.foot_elevation}</p>
                                            <p>{exercise.continuous_or_alternating_arms} , {exercise.combination_exercises} , {exercise.movement_pattern_1}</p>
                                        </div>
                                        <div className="flex justify-between text-sm md:text-base gap-4 mt-3">
                                            <div className="border border-white px-4 py-2 rounded text-white">30 min</div>
                                            <div className="border border-white px-4 py-2 rounded text-orange-500">200 cal</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Exercise highlights */}
                            <ul className="flex flex-row gap-x-4 text-sm md:text-base my-6 dark:text-white">
                                {Array(3).fill("Expertly designed workout.").map((text, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white border-2 dark:border-white">
                                            <TbArrowRight className="text-base" />
                                        </div>
                                        <span className="font-bold">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Recommended meals carousel */}
                            <h4 className="text-xl md:text-2xl font-bold my-4">Recommendation For You</h4>
                            <div className="w-full">
                                {recommendedMeals.length > 0 && (
                                    <CarouselComponent
                                        rows={1}
                                        items={recommendedMeals.map((meal) => ({
                                            id: meal.idMeal,
                                            image: meal.strMealThumb,
                                            title: meal.strMeal,
                                            onClick: () => navigate("/en/healthy", {
                                                state: {
                                                    mealId: meal.idMeal,
                                                    category: mealCategory,
                                                },
                                            }),
                                        }))}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}