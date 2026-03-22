import { useMemo } from 'react';
import { exercises } from '../data/exercises';
import { allWikiArticles } from '../data/wiki';
import { allRecipes, topFoods } from '../data/nutrition';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  emoji: string;
  href: string;
  score: number;
}

const muscleEmoji: Record<string, string> = {
  chest: '💪', back: '🔙', shoulders: '🏄', biceps: '💪',
  triceps: '🤾', forearms: '🤜', abs: '⚡', glutes: '🍑',
  quads: '🦵', hamstrings: '🧿', calves: '🏃', traps: '🦛',
  lats: '🦅', cardio: '❤️',
};

const wikiEmoji: Record<string, string> = {
  muscles: '💪', terminology: '📚', methodology: '🎯',
  supplements: '💊', health: '❤️', nutrition: '🥗', equipment: '🏋️',
};

function score(text: string, query: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  const words = q.split(' ').filter(Boolean);
  const matchCount = words.filter((w) => t.includes(w)).length;
  return matchCount > 0 ? (matchCount / words.length) * 40 : 0;
}

export function useSearch(query: string): SearchResult[] {
  return useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const results: SearchResult[] = [];

    // Exercises
    exercises.forEach((ex) => {
      const s = Math.max(
        score(ex.name, query),
        score(ex.nameEn, query),
        ...ex.tags.map((t) => score(t, query))
      );
      if (s > 0) results.push({
        id: `ex-${ex.id}`,
        title: ex.name,
        subtitle: ex.nameEn,
        category: 'Упражнения',
        emoji: muscleEmoji[ex.primaryMuscle] ?? '🏋️',
        href: `/exercises/${ex.slug}`,
        score: s,
      });
    });

    // Wiki
    allWikiArticles.forEach((art) => {
      const s = Math.max(
        score(art.title, query),
        score(art.summary, query),
        ...art.tags.map((t) => score(t, query))
      );
      if (s > 0) results.push({
        id: `wiki-${art.id}`,
        title: art.title,
        subtitle: art.summary.slice(0, 60) + '…',
        category: 'Вики',
        emoji: wikiEmoji[art.category] ?? '📖',
        href: `/wiki/${art.slug}`,
        score: s,
      });
    });

    // Recipes
    allRecipes.forEach((r) => {
      const s = Math.max(
        score(r.title, query),
        ...r.tags.map((t) => score(t, query))
      );
      if (s > 0) results.push({
        id: `rec-${r.id}`,
        title: r.title,
        subtitle: `${r.macros.calories} ккал · Б${r.macros.protein}г`,
        category: 'Питание',
        emoji: '🍽️',
        href: '/nutrition',
        score: s,
      });
    });

    // Foods
    topFoods.forEach((f) => {
      const s = score(f.name, query);
      if (s > 0) results.push({
        id: `food-${f.id}`,
        title: f.name,
        subtitle: `${f.macrosPer100g.calories} ккал/100г`,
        category: 'Продукты',
        emoji: '🥦',
        href: '/nutrition',
        score: s,
      });
    });

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [query]);
}
