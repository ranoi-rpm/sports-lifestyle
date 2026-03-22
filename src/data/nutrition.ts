// Главный экспорт базы питания
import { recipesForBulk } from './nutrition-part1';
import { recipesForCut, topFoods, mealPlans } from './nutrition-part2';
import type { Recipe, FoodItem, MealPlan, DietGoal } from '../types/nutrition';

export { recipesForBulk, recipesForCut, topFoods, mealPlans };
export type { Recipe, FoodItem, MealPlan, DietGoal };

export const allRecipes: Recipe[] = [
  ...recipesForBulk,
  ...recipesForCut,
];

export const goalLabels: Record<DietGoal, string> = {
  bulk: 'На массу',
  cut: 'На сушку',
  maintain: 'Поддержание',
};

export const goalEmoji: Record<DietGoal, string> = {
  bulk: '💪',
  cut: '🔥',
  maintain: '⚖️',
};

export const categoryLabels: Record<string, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
  'pre-workout': 'До тренировки',
  'post-workout': 'После тренировки',
};

export function getRecipesByGoal(goal: DietGoal): Recipe[] {
  return allRecipes.filter((r) => r.goal.includes(goal));
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return allRecipes.find((r) => r.slug === slug);
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.toLowerCase();
  return allRecipes.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getMealPlanByGoal(goal: DietGoal): MealPlan | undefined {
  return mealPlans.find((p) => p.goal === goal);
}
