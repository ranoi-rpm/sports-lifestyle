import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Dumbbell, ChevronRight, BarChart3 } from 'lucide-react';
import {
  exercises,
  muscleGroupLabels,
  equipmentLabels,
  difficultyLabels,
} from '../data/exercises';
import type { MuscleGroup, Equipment, Difficulty } from '../types/exercise';

const difficultyColor: Record<Difficulty, string> = {
  beginner: 'bg-green-500/20 text-green-400 border border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

const muscleEmoji: Record<string, string> = {
  chest: '💪', back: '🔙', shoulders: '🏔️', biceps: '💪',
  triceps: '🦾', forearms: '🤜', abs: '⚡', glutes: '🍑',
  quads: '🦵', hamstrings: '🦿', calves: '🏃', traps: '🦬',
  lats: '🦅', cardio: '❤️',
};

export default function Exercises() {
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | ''>('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        ex.name.toLowerCase().includes(q) ||
        ex.nameEn.toLowerCase().includes(q) ||
        ex.tags.some((t) => t.toLowerCase().includes(q));
      const matchMuscle = !selectedMuscle || ex.primaryMuscle === selectedMuscle || ex.secondaryMuscles.includes(selectedMuscle as MuscleGroup);
      const matchEquip = !selectedEquipment || ex.equipment.includes(selectedEquipment as Equipment);
      const matchDiff = !selectedDifficulty || ex.difficulty === selectedDifficulty;
      return matchSearch && matchMuscle && matchEquip && matchDiff;
    });
  }, [search, selectedMuscle, selectedEquipment, selectedDifficulty]);

  const stats = useMemo(() => {
    const byMuscle: Record<string, number> = {};
    exercises.forEach((e) => {
      byMuscle[e.primaryMuscle] = (byMuscle[e.primaryMuscle] || 0) + 1;
    });
    return byMuscle;
  }, []);

  const clearFilters = () => {
    setSearch('');
    setSelectedMuscle('');
    setSelectedEquipment('');
    setSelectedDifficulty('');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-16 px-4">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-500/20 rounded-xl border border-primary-500/30">
              <Dumbbell className="w-8 h-8 text-primary-400" />
            </div>
            <div>
              <p className="text-primary-400 text-sm font-medium uppercase tracking-wider">База знаний</p>
              <h1 className="text-4xl font-black">База упражнений</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            {exercises.length}+ упражнений с подробным описанием техники, советами и видео
          </p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats).slice(0, 7).map(([muscle, count]) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle === selectedMuscle ? '' : muscle as MuscleGroup)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedMuscle === muscle
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <span>{muscleEmoji[muscle]}</span>
                <span>{muscleGroupLabels[muscle]}</span>
                <span className="text-xs opacity-60">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-dark-800 border border-white/10 rounded-2xl p-5 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[240px]">
              <label className="text-xs text-gray-400 mb-1 block">Поиск</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Жим, приседания, планка..."
                  className="w-full bg-dark-700 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <div className="min-w-[180px]">
              <label className="text-xs text-gray-400 mb-1 block">Мышца</label>
              <select value={selectedMuscle} onChange={(e) => setSelectedMuscle(e.target.value as MuscleGroup | '')}
                className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary-500">
                <option value="">Все мышцы</option>
                {Object.entries(muscleGroupLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="min-w-[180px]">
              <label className="text-xs text-gray-400 mb-1 block">Инвентарь</label>
              <select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value as Equipment | '')}
                className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary-500">
                <option value="">Любой</option>
                {Object.entries(equipmentLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="min-w-[160px]">
              <label className="text-xs text-gray-400 mb-1 block">Уровень</label>
              <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | '')}
                className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary-500">
                <option value="">Любой</option>
                {Object.entries(difficultyLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2.5 bg-dark-700 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                <BarChart3 className="w-4 h-4" />
              </button>
              {(search || selectedMuscle || selectedEquipment || selectedDifficulty) && (
                <button onClick={clearFilters}
                  className="px-4 py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                  Сбросить
                </button>
              )}
            </div>
          </div>
          {filtered.length !== exercises.length && (
            <p className="mt-3 text-sm text-gray-400">
              Найдено: <span className="text-primary-400 font-semibold">{filtered.length}</span> из {exercises.length}
            </p>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-400">Ничего не найдено</p>
            <button onClick={clearFilters} className="mt-4 text-primary-400 hover:underline">Сбросить фильтры</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((ex) => (
              <Link key={ex.id} to={`/exercises/${ex.slug}`}
                className="group bg-dark-800 border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300">
                <div className="h-1.5 bg-gradient-to-r from-primary-500 to-accent-500" />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{muscleEmoji[ex.primaryMuscle]}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColor[ex.difficulty]}`}>
                      {difficultyLabels[ex.difficulty]}
                    </span>
                  </div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-primary-400 transition-colors line-clamp-2">{ex.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{ex.nameEn}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-3">{ex.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="text-xs bg-dark-700 text-gray-300 px-2 py-0.5 rounded-full">{muscleGroupLabels[ex.primaryMuscle]}</span>
                    {ex.equipment.slice(0, 2).map((eq) => (
                      <span key={eq} className="text-xs bg-dark-700 text-gray-300 px-2 py-0.5 rounded-full">{equipmentLabels[eq]}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {ex.sets && ex.reps && (
                      <span><span className="text-primary-400">{ex.sets}</span> × <span className="text-primary-400">{ex.reps}</span></span>
                    )}
                    <span className="flex items-center gap-1 text-primary-400 group-hover:translate-x-1 transition-transform ml-auto">
                      Подробнее <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((ex) => (
              <Link key={ex.id} to={`/exercises/${ex.slug}`}
                className="group flex items-center gap-4 bg-dark-800 border border-white/10 rounded-xl p-4 hover:border-primary-500/50 transition-all">
                <span className="text-2xl">{muscleEmoji[ex.primaryMuscle]}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">{ex.name}</h3>
                  <p className="text-xs text-gray-500">{ex.nameEn} · {muscleGroupLabels[ex.primaryMuscle]}</p>
                </div>
                <div className="hidden sm:flex gap-2">
                  {ex.equipment.slice(0, 2).map((eq) => (
                    <span key={eq} className="text-xs bg-dark-700 text-gray-400 px-2 py-1 rounded-full">{equipmentLabels[eq]}</span>
                  ))}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor[ex.difficulty]}`}>
                  {difficultyLabels[ex.difficulty]}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
