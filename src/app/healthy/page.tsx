"use client";

import { useEffect, useState } from "react";
import { CarouselComponent } from "@/components/common/carousel";
import { TabsComponent } from "@/components/common/tabs";
import { CiDumbbell } from "react-icons/ci";
import { useTranslations } from "use-intl";
import HealthyDetails from "./deatils/page";
import GradientStrokeText from "@/components/common/stroke-text";
import { fetchCategories, fetchMealsByCategory } from "@/lib/apis/meals.api";
import type { MealCategory, MealSummary } from "@/lib/apis/meals.api";
import { useLocation } from "react-router-dom";

// Carousel for meals in a category
function MealsCarousel({ category, onMealClick }: {
  category: string;
  onMealClick: (id: string, category: string) => void;
}) {
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch meals when category changes
  useEffect(() => {
    fetchMealsByCategory(category)
      .then(setMeals)
      .finally(() => setLoading(false));
  }, [category]);

  // Loader
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center dark:bg-[#1E1E1E]">
        <span className="loader"></span>
      </div>
    );

  // Render meals carousel
  return (
    <CarouselComponent
      items={meals.map((meal) => ({
        id: meal.idMeal,
        image: meal.strMealThumb,
        title: meal.strMeal,
        onClick: () => onMealClick(meal.idMeal, category),
      }))}
      rows={2}
    />
  );
}

export default function HealthyPage() {
  // Translation
  const t = useTranslations();

  // Localization
  const location = useLocation();

  // States
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Read meal and category from navigation state 
  useEffect(() => {
    const state = location.state as { mealId?: string; category?: string } | null;
    if (state?.mealId && state?.category) {
      setSelectedMealId(state.mealId);
      setSelectedCategory(state.category);
    }
  }, [location.state]);

  // Fetch meal categories 
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  // Handle meal click 
  const handleMealClick = (id: string, category: string) => {
    setSelectedMealId(id);
    setSelectedCategory(category);
  };

  // Build tabs for each meal category
  const tabs = categories.map((category) => ({
    value: category.strCategory,
    label: category.strCategory,
    content: (
      <div className="relative z-10">
        <MealsCarousel category={category.strCategory} onMealClick={handleMealClick} />
      </div>
    ),
  }));

  // Loading screen
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center dark:bg-[#1E1E1E]">
        <span className="loader"></span>
      </div>
    );

  return (
    <section className="relative py-8 px-4 font-baloo dark:text-white dark:bg-[#1E1E1E]">
      {/* Header: only shown when no meal is selected */}
      {!selectedMealId && !selectedCategory && (
        <>
          <div className="relative mb-5">
            <GradientStrokeText textKey="healthy" />
            <div className="absolute -bottom-5   right-1/2 translate-x-1/2 -translate-y-1/2 text-main font-semibold flex items-center text-center gap-1 justify-center mb-2">
              <CiDumbbell className="text-2xl" />
              <h6>{t("healthy-nutritions")}</h6>
            </div>
          </div>
          <h2 className="uppercase font-bold text-4xl mb-8 text-center">
            {t("fitness-journey")} <br />
            {t("customized")} <span className="text-main">{t("meal-plans")}</span> {t("for-you")}
          </h2>
        </>
      )}

      {/* Details view if meal is selected; otherwise show category tabs */}
      {selectedMealId && selectedCategory ? (
        <HealthyDetails mealId={selectedMealId} initialCategory={selectedCategory} />
      ) : (
        <div className="relative z-0">
          <TabsComponent
            tabs={tabs}
            tabsListClassName="relative mx-auto w-3/4"
            visibleTabsCount={5}
          />
        </div>
      )}
    </section>
  );
}
