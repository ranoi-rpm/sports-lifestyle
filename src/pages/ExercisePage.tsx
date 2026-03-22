import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Dumbbell, Target, AlertCircle, Lightbulb, Play, Clock, Flame, ChevronRight } from 'lucide-react';
import { exercises, muscleGroupLabels, equipmentLabels, difficultyLabels, categoryLabels } from '../data/exercises';

const difficultyColor: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const muscleEmoji: Record<string, string> = {
  chest: '💪', back: '🔙', shoulders: '🏔️', biceps: '💪',
  triceps: '🦾', forearms: '🤜', abs: '⚡', glutes: '🍑',
  quads: '🦵', hamstrings: '🦿', calves: '🏃', traps: '🦬',
  lats: '🦅', cardio: '❤️',
};

export default function ExercisePage() {
  const { slug } = useParams<{ slug: string }>();
  const ex = exercises.find((e) => e.slug === slug);

  if (!ex) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">🔍</div>
        <h1 className="text-2xl font-bold">Упражнение не найдено</h1>
        <Link to="/exercises" className="flex items-center gap-2 text-primary-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Вернуться к базе
        </Link>
      </div>
    );
  }

  const related = exercises
    .filter((e) => e.id !== ex.id && (e.primaryMuscle === ex.primaryMuscle || e.secondaryMuscles.includes(ex.primaryMuscle)))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="bg-dark-800 border-b border-white/5 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Link to="/exercises" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" /> База упражнений
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-6xl">{muscleEmoji[ex.primaryMuscle]}</span>
              <div>
                <h1 className="text-3xl font-black">{ex.name}</h1>
                <p className="text-gray-400 mt-1">{ex.nameEn}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${difficultyColor[ex.difficulty]}`}>
                    {difficultyLabels[ex.difficulty]}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30">
                    {categoryLabels[ex.category]}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300">
                    {muscleGroupLabels[ex.primaryMuscle]}
                  </span>
                </div>
              </div>
            </div>
            {ex.sets && ex.reps && (
              <div className="flex gap-3">
                <div className="text-center bg-primary-500/20 border border-primary-500/30 rounded-xl px-5 py-3">
                  <p className="text-2xl font-black text-primary-400">{ex.sets}</p>
                  <p className="text-xs text-gray-400">подходов</p>
                </div>
                <div className="text-center bg-accent-500/20 border border-accent-500/30 rounded-xl px-5 py-3">
                  <p className="text-2xl font-black text-accent-400">{ex.reps}</p>
                  <p className="text-xs text-gray-400">повторений</p>
                </div>
                {ex.calories && (
                  <div className="text-center bg-red-500/20 border border-red-500/30 rounded-xl px-5 py-3">
                    <p className="text-2xl font-black text-red-400">{ex.calories}</p>
                    <p className="text-xs text-gray-400">ккал/10мин</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-300 text-lg leading-relaxed">{ex.description}</p>
            </div>

            {/* Technique */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                <Target className="w-5 h-5 text-primary-400" /> Техника выполнения
              </h2>
              <ol className="space-y-3">
                {ex.technique.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center text-sm font-bold border border-primary-500/30">
                      {i + 1}
                    </span>
                    <span className="text-gray-300 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            {ex.tips.length > 0 && (
              <div className="bg-dark-800 border border-yellow-500/20 rounded-2xl p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-400" /> Советы
                </h2>
                <ul className="space-y-2">
                  {ex.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-gray-300">
                      <span className="text-yellow-400 mt-0.5">✓</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Common mistakes */}
            {ex.commonMistakes.length > 0 && (
              <div className="bg-dark-800 border border-red-500/20 rounded-2xl p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                  <AlertCircle className="w-5 h-5 text-red-400" /> Частые ошибки
                </h2>
                <ul className="space-y-2">
                  {ex.commonMistakes.map((err, i) => (
                    <li key={i} className="flex gap-2 text-gray-300">
                      <span className="text-red-400 mt-0.5">✗</span> {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Video */}
            {ex.youtubeId && (
              <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                  <Play className="w-5 h-5 text-primary-400" /> Видео
                </h2>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${ex.youtubeId}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="space-y-4">
            {/* Info card */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4 text-gray-200">Информация</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-400 text-sm">Основная мышца</dt>
                  <dd className="text-sm font-medium">{muscleGroupLabels[ex.primaryMuscle]}</dd>
                </div>
                {ex.secondaryMuscles.length > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400 text-sm">Вторичные</dt>
                    <dd className="text-sm text-right">{ex.secondaryMuscles.map(m => muscleGroupLabels[m]).join(', ')}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-400 text-sm">Инвентарь</dt>
                  <dd className="text-sm text-right">{ex.equipment.map(e => equipmentLabels[e]).join(', ')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400 text-sm">Категория</dt>
                  <dd className="text-sm">{categoryLabels[ex.category]}</dd>
                </div>
              </dl>
            </div>

            {/* Tags */}
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-3 text-gray-200">Теги</h3>
              <div className="flex flex-wrap gap-2">
                {ex.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-dark-700 text-gray-300 px-3 py-1.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold mb-3 text-gray-200">Похожие упражнения</h3>
                <div className="space-y-2">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/exercises/${r.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">{muscleEmoji[r.primaryMuscle]}</span>
                      <span className="flex-1 text-sm text-gray-300 group-hover:text-white transition-colors">{r.name}</span>
                      <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-primary-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
