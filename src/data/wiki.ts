// Главный экспорт всей вики-базы
import { wikiMuscles } from './wiki-part1';
import { wikiTerminology } from './wiki-part2';
import { wikiSupplements } from './wiki-part3';
import { wikiHealth } from './wiki-part4';
import type { WikiArticle, WikiCategory } from '../types/wiki';

export { wikiMuscles, wikiTerminology, wikiSupplements, wikiHealth };
export type { WikiArticle, WikiCategory };

export const allWikiArticles: WikiArticle[] = [
  ...wikiMuscles,
  ...wikiTerminology,
  ...wikiSupplements,
  ...wikiHealth,
];

export const wikiCategoryLabels: Record<WikiCategory, string> = {
  muscles: 'Мышцы',
  terminology: 'Терминология',
  methodology: 'Методики',
  supplements: 'Добавки',
  health: 'Здоровье',
  nutrition: 'Питание',
  equipment: 'Инвентарь',
};

export const wikiCategoryEmoji: Record<WikiCategory, string> = {
  muscles: '💪',
  terminology: '📖',
  methodology: '🔬',
  supplements: '💊',
  health: '❤️',
  nutrition: '🥦',
  equipment: '🏋️',
};

export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return allWikiArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: WikiCategory): WikiArticle[] {
  return allWikiArticles.filter((a) => a.category === category);
}

export function searchWiki(query: string): WikiArticle[] {
  const q = query.toLowerCase();
  return allWikiArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}
