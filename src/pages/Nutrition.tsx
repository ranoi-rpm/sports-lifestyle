import { useState, useMemo } from 'react';
import { Search, Clock, Flame, Beef, ChevronRight } from 'lucide-react';
import { allRecipes, topFoods, mealPlans, goalLabels, goalEmoji, categoryLabels } from '../data/nutrition';
import type { DietGoal } from '../types/nutrition';

type Tab = 'recipes' | 'foods' | 'plans';

const goals: DietGoal[] = ['bulk', 'maintain', 'cut'];
const goalColors: Record<DietGoal, string> = {
  bulk:     'bg-green-500/20 text-green-400 border-green-500/30',
  cut:      'bg-red-500/20   text-red-400   border-red-500/30',
  maintain: 'bg-blue-500/20  text-blue-400  border-blue-500/30',
};

function MacroBadge({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`flex flex-col items-center px-3 py-1.5 rounded-lg border ${color}`}>
      <span className="text-xs text-gray-400">{label}</span>
      <span className="font-bold text-sm">{value}г</span>
    </div>
  );
}

function RecipeCard({ recipe, onClick }: { recipe: (typeof allRecipes)[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-dark-800 border border-white/10 rounded-2xl overflow-hidden hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
    >
      <div className="h-1.5 bg-gradient-to-r from-green-500 to-primary-500" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span className="text-2xl">{goalEmoji[recipe.goal[0]]}</span>
          <div className="flex gap-1">
            {recipe.goal.map((g) => (
              <span key={g} className={`text-xs px-2 py-0.5 rounded-full border ${goalColors[g]}`}>
                {goalLabels[g]}
              </span>
            ))}
          </div>
        </div>
        <h3 className="font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{recipe.title}</h3>
        <p className="text-xs text-gray-500 mb-3">{categoryLabels[recipe.category]}</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          <MacroBadge label="Белок" value={recipe.macros.protein} color="bg-blue-500/10 text-blue-400 border-blue-500/20" />
          <MacroBadge label="Жиры"  value={recipe.macros.fat}     color="bg-yellow-500/10 text-yellow-400 border-yellow-500/20" />
          <MacroBadge label="Углев"  value={recipe.macros.carbs}   color="bg-green-500/10 text-green-400 border-green-500/20" />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 font-semibold">{recipe.macros.calories}</span> ккал
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {recipe.prepTime + recipe.cookTime} мин
          </span>
          <span className="flex items-center gap-1 text-primary-400 group-hover:translate-x-1 transition-transform">
            Рецепт <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </button>
  );
}

function RecipeModal({ recipe, onClose }: { recipe: (typeof allRecipes)[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-dark-800 border border-white/10 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-black">{recipe.title}</h2>
            <p className="text-sm text-gray-400">{categoryLabels[recipe.category]}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl leading-none">×</button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { l: 'Ккал', v: recipe.macros.calories, c: 'text-orange-400' },
            { l: 'Белок', v: `${recipe.macros.protein}г`, c: 'text-blue-400' },
            { l: 'Жиры',  v: `${recipe.macros.fat}г`,     c: 'text-yellow-400' },
            { l: 'Углев',  v: `${recipe.macros.carbs}г`,   c: 'text-green-400' },
          ].map(({ l, v, c }) => (
            <div key={l} className="bg-dark-700 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">{l}</p>
              <p className={`font-bold ${c}`}>{v}</p>
            </div>
          ))}
        </div>
        <h3 className="font-bold mb-2">Ингредиенты</h3>
        <ul className="space-y-1 mb-4">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-300">
              <span className="text-primary-400">•</span> {ing}
            </li>
          ))}
        </ul>
        <h3 className="font-bold mb-2">Приготовление</h3>
        <ol className="space-y-2 mb-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-300">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center text-xs font-bold border border-primary-500/30">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        {recipe.tips.length > 0 && (
          <>
            <h3 className="font-bold mb-2">💡 Советы</h3>
            <ul className="space-y-1">
              {recipe.tips.map((tip, i) => (
                <li key={i} className="text-sm text-yellow-300 flex gap-2">
                  <span>✓</span> {tip}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default function Nutrition() {
  const [tab, setTab]           = useState<Tab>('recipes');
  const [search, setSearch]     = useState('');
  const [goalFilter, setGoal]   = useState<DietGoal | ''>('');
  const [selected, setSelected] = useState<(typeof allRecipes)[0] | null>(null);

  const filtered = useMemo(() => {
    let list = allRecipes;
    if (goalFilter) list = list.filter((r) => r.goal.includes(goalFilter as DietGoal));
    if (search.trim()) list = list.filter((r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
    return list;
  }, [goalFilter, search]);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-14 px-4">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #22c55e 0%, transparent 50%), radial-gradient(circle at 70% 50%, #f97316 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
              <Beef className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <p className="text-green-400 text-sm font-medium uppercase tracking-wider">Спортивное питание</p>
              <h1 className="text-4xl font-black">Питание</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">{allRecipes.length} рецептов · Топ-продукты · Готовые планы питания</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8">
          {([['recipes','🍽️ Рецепты'],['foods','🥦 Продукты'],['plans','📊 Планы']] as [Tab, string][]).map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-dark-800 border border-white/10 text-gray-400 hover:text-white'
              }`}>
              {l}
            </button>
          ))}
        </div>

        {tab === 'recipes' && (
          <>
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5 mb-8 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск рецепта..."
                    className="w-full bg-dark-700 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setGoal('')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    goalFilter === '' ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}>Все</button>
                {goals.map((g) => (
                  <button key={g} onClick={() => setGoal(g === goalFilter ? '' : g)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      goalFilter === g ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}>
                    {goalEmoji[g]} {goalLabels[g]}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((r) => (
                <RecipeCard key={r.id} recipe={r} onClick={() => setSelected(r)} />
              ))}
            </div>
          </>
        )}

        {tab === 'foods' && (
          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-2 px-4 text-xs text-gray-500 mb-2">
              <span className="col-span-2">Продукт</span>
              <span className="text-center">Ккал</span>
              <span className="text-center text-blue-400">Белок</span>
              <span className="text-center text-yellow-400">Жиры</span>
              <span className="text-center text-green-400">Углев.</span>
            </div>
            {topFoods.map((food) => (
              <div key={food.id} className="bg-dark-800 border border-white/10 rounded-xl p-4 grid grid-cols-6 gap-2 items-center hover:border-white/20 transition-colors">
                <div className="col-span-2">
                  <p className="font-medium text-white text-sm">{food.name}</p>
                  <p className="text-xs text-gray-500">{food.category} · 100г</p>
                </div>
                <span className="text-center text-sm text-orange-400 font-bold">{food.macrosPer100g.calories}</span>
                <span className="text-center text-sm text-blue-400 font-semibold">{food.macrosPer100g.protein}г</span>
                <span className="text-center text-sm text-yellow-400 font-semibold">{food.macrosPer100g.fat}г</span>
                <span className="text-center text-sm text-green-400 font-semibold">{food.macrosPer100g.carbs}г</span>
              </div>
            ))}
            <p className="text-xs text-gray-500 text-center pt-2">На 100 г продукта</p>
          </div>
        )}

        {tab === 'plans' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {mealPlans.map((plan) => (
              <div key={plan.id} className="bg-dark-800 border border-white/10 rounded-2xl overflow-hidden">
                <div className={`p-5 border-b border-white/5 ${
                  plan.goal === 'bulk' ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  <h3 className="text-xl font-black">{plan.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {goalEmoji[plan.goal]} {goalLabels[plan.goal]} · {plan.calories} ккал/день
                  </p>
                </div>
                <div className="divide-y divide-white/5">
                  {plan.meals.map((meal, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3">
                      <span className="text-xs text-gray-500 w-12 font-mono">{meal.time}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{meal.name}</p>
                      </div>
                      <div className="flex gap-3 text-xs">
                        <span className="text-orange-400">{meal.macros.calories}ккал</span>
                        <span className="text-blue-400">Б{meal.macros.protein}г</span>
                        <span className="text-green-400">У{meal.macros.carbs}г</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-white/5 flex justify-between text-sm">
                  <span className="text-gray-400">Итого за день:</span>
                  <span className="font-bold text-white">
                    {plan.meals.reduce((s, m) => s + m.macros.calories, 0)} ккал ·{' '}
                    Б{plan.meals.reduce((s, m) => s + m.macros.protein, 0)}г
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && <RecipeModal recipe={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
