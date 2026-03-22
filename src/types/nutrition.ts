export type MealCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'pre-workout'
  | 'post-workout';

export type DietGoal = 'bulk' | 'cut' | 'maintain';

export type CuisineType = 'russian' | 'asian' | 'mediterranean' | 'american' | 'universal';

export interface Macros {
  calories: number;
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  category: MealCategory;
  goal: DietGoal[];
  cuisine: CuisineType;
  macros: Macros;
  servings: number;
  prepTime: number;  // minutes
  cookTime: number;  // minutes
  ingredients: string[];
  steps: string[];
  tips: string[];
  tags: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  macrosPer100g: Macros;
  notes: string;
}

export interface MealPlan {
  id: string;
  title: string;
  goal: DietGoal;
  calories: number;
  meals: MealPlanEntry[];
}

export interface MealPlanEntry {
  time: string;
  name: string;
  recipeSlug?: string;
  macros: Macros;
}
