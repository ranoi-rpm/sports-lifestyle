import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ChevronRight, Clock } from 'lucide-react';
import {
  allWikiArticles,
  wikiCategoryLabels,
  wikiCategoryEmoji,
  searchWiki,
} from '../data/wiki';
import type { WikiCategory } from '../types/wiki';

const categories: WikiCategory[] = [
  'muscles', 'terminology', 'methodology', 'supplements', 'health', 'nutrition', 'equipment',
];

export default function Wiki() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<WikiCategory | ''>('');

  const filtered = useMemo(() => {
    let result = allWikiArticles;
    if (search.trim()) result = searchWiki(search);
    if (activeCategory) result = result.filter((a) => a.category === activeCategory);
    return result;
  }, [search, activeCategory]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    allWikiArticles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-16 px-4">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 50%, #f97316 0%, transparent 50%)',
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent-500/20 rounded-xl border border-accent-500/30">
              <BookOpen className="w-8 h-8 text-accent-400" />
            </div>
            <div>
              <p className="text-accent-400 text-sm font-medium uppercase tracking-wider">База знаний</p>
              <h1 className="text-4xl font-black">Вики-энциклопедия</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            {allWikiArticles.length} статей о мышцах, методиках, добавках и здоровье
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-dark-800 border border-white/10 rounded-2xl p-5 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Гипертрофия, протеин, восстановление..."
              className="w-full bg-dark-700 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === ''
                  ? 'bg-accent-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Все ({allWikiArticles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-accent-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <span>{wikiCategoryEmoji[cat]}</span>
                <span>{wikiCategoryLabels[cat]}</span>
                {stats[cat] && <span className="text-xs opacity-60">({stats[cat]})</span>}
              </button>
            ))}
          </div>
          {filtered.length !== allWikiArticles.length && (
            <p className="mt-3 text-sm text-gray-400">
              Найдено: <span className="text-accent-400 font-semibold">{filtered.length}</span> из {allWikiArticles.length}
            </p>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-xl text-gray-400">Ничего не найдено</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory(''); }}
              className="mt-4 text-accent-400 hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((article) => (
              <Link
                key={article.id}
                to={`/wiki/${article.slug}`}
                className="group bg-dark-800 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-500/50 hover:shadow-lg hover:shadow-accent-500/10 transition-all duration-300"
              >
                <div className="h-1.5 bg-gradient-to-r from-accent-500 to-primary-500" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{wikiCategoryEmoji[article.category]}</span>
                    <span className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-full">
                      {wikiCategoryLabels[article.category]}
                    </span>
                  </div>
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime} мин</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-accent-400 group-hover:translate-x-1 transition-transform">
                      Читать <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-dark-700 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
