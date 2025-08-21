"use client";

import { useEffect, useState } from "react";
import GradientStrokeText from "@/components/common/stroke-text";
import { fetchCategories, fetchMealsByCategory, fetchMealById } from "@/lib/apis/meals.api";
import type { MealCategory, MealSummary, MealDetail } from "@/lib/apis/meals.api";
import { useLocale } from "use-intl";
import { TabsComponent } from "@/components/common/tabs";

export default function HealthyDetails({ mealId, initialCategory }: { mealId: string; initialCategory: string }) {
    const locale = useLocale();
    const [categories, setCategories] = useState<MealCategory[]>([]);
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [meals, setMeals] = useState<MealSummary[]>([]);
    const [selectedMealId, setSelectedMealId] = useState(mealId);
    const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    useEffect(() => {
        if (!activeCategory) return;
        fetchMealsByCategory(activeCategory).then(setMeals);
    }, [activeCategory]);

    useEffect(() => {
        if (!selectedMealId) return;
        fetchMealById(selectedMealId).then(setSelectedMeal);
    }, [selectedMealId]);

    const ingredients = Array.from({ length: 20 }, (_, i) => {
        const name = selectedMeal?.[`strIngredient${i + 1}`];
        const amount = selectedMeal?.[`strMeasure${i + 1}`];
        return name && name.trim() ? { name, amount: amount || "" } : null;
    }).filter(Boolean) as { name: string; amount: string }[];

    return (
        <main>
            <section className="container mx-auto pt-8 font-baloo dark:text-white dark:bg-[#1E1E1E]">
                <div className={`flex flex-col md:flex-row gap-6 mt-8 ${locale === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    {/* Left side (Tabs and meals list) */}
                    <div className="md:w-1/3 space-y-4 border border-gray-400 dark:border-gray-300 rounded-xl p-1 h-fit">
                        <TabsComponent
                            tabs={categories.map((cat) => ({
                                value: cat.strCategory,
                                label: cat.strCategory,
                                content: (
                                    <div className="rounded-xl overflow-hidden dark:bg-[#1E1E1E] dark:text-white min-w-[280px] md:min-w-[320px] max-h-[500px] overflow-y-auto scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-transparent">
                                        {meals.slice(0, 7).map((meal, index, arr) => (
                                            <div
                                                key={meal.idMeal}
                                                onClick={() => setSelectedMealId(meal.idMeal)}
                                                className="cursor-pointer"
                                            >
                                                <div className="flex gap-3 items-center px-3 py-2 dark:hover:bg-gray-800 hover:bg-gray-300">
                                                    <img
                                                        src={meal.strMealThumb}
                                                        alt={meal.strMeal}
                                                        width={81}
                                                        height={88}
                                                        className="rounded-2xl object-cover shrink-0"
                                                    />
                                                    <div className="w-full">
                                                        <h4 className="font-semibold text-base md:text-lg truncate">
                                                            {meal.strMeal}
                                                        </h4>
                                                        <p className="text-xs dark:text-gray-300 line-clamp-2">
                                                            {cat.strCategoryDescription}
                                                        </p>
                                                    </div>
                                                </div>
                                                {index !== arr.length - 1 && (
                                                    <hr className="border-gray-400" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ),
                            }))}
                            defaultValue={initialCategory}
                            value={activeCategory}
                            onValueChange={setActiveCategory}
                            tabsListClassName="my-4"
                            visibleTabsCount={3}
                        />
                    </div>

                    {/* Right side (Meal details) */}
                    <div className="md:w-2/3 w-full pr-0 md:pr-8">
                        <div className="hidden md:block md:absolute md:-translate-y-1/2 md:top-[88px] md:left-1/2 md:-translate-x-1/2 md:z-20">
                            <GradientStrokeText />
                        </div>

                        {selectedMeal && (
                            <div className="grid grid-rows-1 md:grid-rows-2 gap-6">
                                <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-xl text-white">
                                    <img
                                        src={selectedMeal.strMealThumb}
                                        alt={selectedMeal.strMeal}
                                        className="absolute inset-0 w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 rounded-b-xl">
                                        <h3 className="text-2xl md:text-5xl font-semibold text-center capitalize">
                                            {selectedMeal.strMeal}
                                        </h3>
                                        <p className="text-sm md:text-lg my-2 md:my-4 line-clamp-3">
                                            {selectedMeal.strInstructions}
                                        </p>
                                        <div className="flex flex-wrap gap-2 justify-between text-xs md:text-sm mt-2">
                                            {["Energy", "Protein", "Carbs", "Fat"].map((label) => (
                                                <div
                                                    key={label}
                                                    className="border border-white px-2 py-1 rounded text-center w-[80px] md:w-[100px]"
                                                >
                                                    <span className="block">100{label === "Energy" ? " k" : " G"}</span>
                                                    <span className="text-main font-bold">{label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="relative overflow-visible rounded-xl">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                                        Ingredients
                                    </h3>
                                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm p-3 md:p-4 rounded-xl">
                                        {ingredients.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex justify-between border-b border-gray-500 py-1 ${locale === "ar" ? "flex-row-reverse text-right" : ""}`}
                                            >
                                                <span>{item.name}</span>
                                                <span className="text-main">{item.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}