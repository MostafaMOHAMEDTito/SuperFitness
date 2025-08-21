"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { CiDumbbell } from "react-icons/ci";
import { CarouselComponent } from "@/components/common/carousel";
import { TabsComponent } from "@/components/common/tabs";
import GradientStrokeText from "@/components/common/stroke-text";
import ClassesDetails from "./details/page";
import { getExercises } from "@/lib/apis/exercises.api";

export default function ClassesPage() {
  // Translation
  const t = useTranslations();

  // States
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Functions
  // Fetch all exercises on component mount
  useEffect(() => {
    getExercises()
      .then((res) => {
        setAllExercises(res.exercises);
      })
      .finally(() => setLoading(false));
  }, []);

  // Group exercises by their target muscle group
  const groupedExercises = Object.entries(
    allExercises.reduce((acc, ex) => {
      const group = ex.target_muscle_group || "Other";
      acc[group] = acc[group] ?? [];
      acc[group].push(ex);
      return acc;
    }, {} as Record<string, Exercise[]>)
  );

  /**
   * Handles exercise selection to show detailed view
   * @param exercise - The selected exercise object
   */
  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise({
      ...exercise,
      difficulty_level: "Beginner", 
    });
  };

  // Prepare tabs data for each muscle group
  const tabs = groupedExercises.map(([group, exs]) => ({
    value: group,
    label: group,
    content: (
      <div className="relative z-10">
        <CarouselComponent
          items={exs.map((ex) => ({
            id: ex._id,
            video: ex.short_youtube_demonstration_link, 
            title: ex.exercise,
            onClick: () => handleExerciseClick(ex),
          }))}
          rows={2}
        />
      </div>
    ),
  }));

  // Loading state UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center dark:bg-[#1E1E1E]">
        <span className="loader" />
      </div>
    );
  }
  return (
    <section className="relative py-20 px-4 font-baloo dark:text-white dark:bg-[#1E1E1E]">
      {/* Header section - only shown when no exercise is selected */}
      {!selectedExercise && (
        <>
          <div className="relative">
            <GradientStrokeText textKey="workouts" />
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 -translate-y-1/2 z-10 text-main font-semibold flex items-center justify-center gap-1">
              <CiDumbbell className="text-2xl" />
              <h6>{t('fitness-class')}</h6>
            </div>
          </div>
          <h2 className="uppercase font-bold text-4xl mb-8 text-center">
            {t('transform-body')}<br />{t('dynamic')} <span className="text-main">{t('upcoming-workouts')}</span>
          </h2>
        </>
      )}

      {/* Conditional rendering: Exercise details or exercise tabs */}
      {selectedExercise ? (
        <ClassesDetails exercise={selectedExercise} />
      ) : (
            <div className="relative z-0 mx-auto w-full"> 
              <TabsComponent
                tabs={tabs}
                tabsListClassName="w-1/2 mx-auto" 
                visibleTabsCount={5}
              />
        </div>
      )}
    </section>
  );
}