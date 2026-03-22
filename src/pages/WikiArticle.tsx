import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, ChevronRight, Tag } from 'lucide-react';
import { getArticleBySlug, allWikiArticles, wikiCategoryLabels, wikiCategoryEmoji } from '../data/wiki';

export default function WikiArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? '');

  if (!article) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">📖</div>
        <h1 className="text-2xl font-bold">Статья не найдена</h1>
        <Link to="/wiki" className="flex items-center gap-2 text-accent-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Вернуться в вики
        </Link>
      </div>
    );
  }

  const related = allWikiArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.category === article.category || article.relatedSlugs.includes(a.slug))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="bg-dark-800 border-b border-white/5 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/wiki"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Вики-энциклопедия
          </Link>
          <div className="flex items-start gap-4">
            <span className="text-5xl">{wikiCategoryEmoji[article.category]}</span>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs bg-accent-500/20 text-accent-400 border border-accent-500/30 px-3 py-1 rounded-full">
                  {wikiCategoryLabels[article.category]}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" /> {article.readTime} мин чтения
                </span>
              </div>
              <h1 className="text-3xl font-black">{article.title}</h1>
              <p className="text-gray-400 mt-2 text-lg">{article.summary}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Article content */}
          <div className="lg:col-span-2 space-y-6">
            {article.content.map((section, i) => (
              <div key={i} className="bg-dark-800 border border-white/10 rounded-2xl p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                  <span className="w-2 h-6 bg-accent-500 rounded-full block flex-shrink-0" />
                  {section.heading}
                </h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </div>
            ))}

            {/* YouTube embed */}
            {article.youtubeId && (
              <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                  <BookOpen className="w-5 h-5 text-accent-400" /> Видео по теме
                </h2>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${article.youtubeId}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Tags */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <h3 className="flex items-center gap-2 font-bold mb-3 text-gray-200">
                <Tag className="w-4 h-4 text-accent-400" /> Теги
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-dark-700 text-gray-300 px-3 py-1.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold mb-3 text-gray-200">Похожие статьи</h3>
                <div className="space-y-2">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/wiki/${r.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">{wikiCategoryEmoji[r.category]}</span>
                      <span className="flex-1 text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">
                        {r.title}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-accent-400 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back button */}
            <Link
              to="/wiki"
              className="flex items-center justify-center gap-2 w-full py-3 bg-accent-500/10 border border-accent-500/30 text-accent-400 rounded-xl hover:bg-accent-500/20 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
