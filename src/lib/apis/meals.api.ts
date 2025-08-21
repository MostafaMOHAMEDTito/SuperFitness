import axios from "axios";

export const getMeals = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw new Error("Failed to fetch meals. Please try again later.");
  }
};

export type MealSummary = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

export type MealDetail = {
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strArea: string;
    strCategory: string;
    strMealAlternate: string | null;
    strTags: string | null;
    strYoutube: string | null;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
    // Ingredients and measures
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
    // Allow extra keys
    [key: string]: string | null;
};

export type MealCategory = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
};


export async function fetchCategories(): Promise<MealCategory[]> {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await res.json();
    return data.categories || [];
}

export async function fetchMealsByCategory(category: string): Promise<MealSummary[]> {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await res.json();
    return data.meals || [];
}

export async function fetchMealById(id: string): Promise<MealDetail | null> {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals?.[0] || null;
}
