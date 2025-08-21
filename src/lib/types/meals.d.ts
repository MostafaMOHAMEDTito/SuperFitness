export type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type MealsResponse = {
  categories: MealCategory[];
};
