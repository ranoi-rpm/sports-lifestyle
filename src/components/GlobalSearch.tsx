import { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';

const categoryColors: Record<string, string> = {
  'Упражнения': 'bg-primary-500/20 text-primary-400',
  'Вики':         'bg-accent-500/20   text-accent-400',
  'Питание':       'bg-green-500/20    text-green-400',
  'Продукты':      'bg-emerald-500/20  text-emerald-400',
};

export default function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const results = useSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const grouped = results.reduce<Record<string, typeof results>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-dark-800 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск упражнений, статей, рецептов..."
            className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs text-gray-500 border border-white/10 rounded px-2 py-1 hover:text-white ml-1">
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length < 2 ? (
            <div className="py-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-400">Начните вводить запрос...</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {['жим', 'белок', 'приседания', 'гипертрофия', 'протеин', 'овсянка'].map((s) => (
                  <button key={s} onClick={() => setQuery(s)}
                    className="text-sm bg-white/5 text-gray-300 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-4xl mb-3">🤷</div>
              <p className="text-gray-400">Ничего не нашли по запросу «{query}»</p>
            </div>
          ) : (
            <div className="p-3">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1">{cat}</p>
                  {items.map((r) => (
                    <Link
                      key={r.id}
                      to={r.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl w-8 text-center">{r.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors truncate">{r.title}</p>
                        <p className="text-xs text-gray-500 truncate">{r.subtitle}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[cat] ?? 'bg-white/10 text-gray-400'}`}>
                        {cat}
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-primary-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              ))}
              <p className="text-center text-xs text-gray-600 pt-2">Найдено {results.length} результатов</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
