import { useState } from 'react';
import { Calculator, Droplets, Heart, Zap, Scale, ChevronDown } from 'lucide-react';

type CalcTab = 'bmi' | 'calories' | 'macros' | 'water' | 'pulse';

const tabs: { id: CalcTab; label: string; icon: string; color: string }[] = [
  { id: 'bmi',      label: 'БМИ',       icon: '⚖️',  color: 'text-blue-400'   },
  { id: 'calories', label: 'Калории',   icon: '🔥',  color: 'text-orange-400' },
  { id: 'macros',   label: 'Макросы',   icon: '🥩',  color: 'text-green-400'  },
  { id: 'water',    label: 'Вода',      icon: '💧',  color: 'text-cyan-400'   },
  { id: 'pulse',    label: 'Пульс',     icon: '❤️',  color: 'text-red-400'    },
];

/* ─── helpers ─── */
function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: 'Недостаточный вес', color: 'text-blue-400' };
  if (bmi < 25)   return { label: 'Норма',             color: 'text-green-400' };
  if (bmi < 30)   return { label: 'Избыточный вес',    color: 'text-yellow-400' };
  return              { label: 'Ожирение',              color: 'text-red-400' };
}

function mifflin(weight: number, height: number, age: number, sex: 'male' | 'female') {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return sex === 'male' ? base + 5 : base - 161;
}

const activityFactors = [
  { label: 'Сидячий (офис, без тренировок)',       value: 1.2   },
  { label: 'Лёгкая активность (1–2 дня/нед)',      value: 1.375 },
  { label: 'Умеренная (3–5 дней/нед)',             value: 1.55  },
  { label: 'Высокая (6–7 дней/нед)',               value: 1.725 },
  { label: 'Очень высокая (2× в день / физтруд)',  value: 1.9   },
];

/* ─── sub-components ─── */
function InputRow({ label, value, onChange, unit, min, max, step = 1 }: {
  label: string; value: number; onChange: (v: number) => void;
  unit: string; min: number; max: number; step?: number;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-primary-500"
        />
        <div className="w-24 text-right">
          <span className="text-white font-bold text-lg">{value}</span>
          <span className="text-gray-400 text-sm ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub, color = 'text-primary-400' }: {
  label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="bg-dark-700 border border-white/10 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

/* ─── BMI ─── */
function BmiCalc() {
  const [weight, setWeight] = useState(80);
  const [height, setHeight] = useState(178);
  const bmi = weight / (height / 100) ** 2;
  const cat = bmiCategory(bmi);
  const idealMin = Math.round(18.5 * (height / 100) ** 2);
  const idealMax = Math.round(24.9 * (height / 100) ** 2);
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <InputRow label="Вес" value={weight} onChange={setWeight} unit="кг" min={40} max={200} />
        <InputRow label="Рост" value={height} onChange={setHeight} unit="см" min={140} max={220} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ResultCard label="Ваш ИМТ" value={bmi.toFixed(1)} color={cat.color} />
        <ResultCard label="Категория" value={cat.label} color={cat.color} />
      </div>
      <div className="bg-dark-700 border border-white/10 rounded-xl p-4">
        <p className="text-sm text-gray-400">Идеальный вес для вашего роста</p>
        <p className="text-xl font-bold text-green-400 mt-1">{idealMin} – {idealMax} кг</p>
      </div>
      <div className="text-xs text-gray-500 bg-dark-700 rounded-xl p-4 space-y-1">
        <p>⚖️ &lt;18.5 — Дефицит | 18.5–24.9 — Норма | 25–29.9 — Избыток | ≥30 — Ожирение</p>
        <p className="text-yellow-500/70">⚠️ ИМТ не учитывает состав тела — у мышечных людей может быть завышен</p>
      </div>
    </div>
  );
}

/* ─── Calories (Mifflin-St Jeor) ─── */
function CaloriesCalc() {
  const [weight, setWeight]     = useState(80);
  const [height, setHeight]     = useState(178);
  const [age, setAge]           = useState(25);
  const [sex, setSex]           = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal]         = useState<'bulk' | 'cut' | 'maintain'>('maintain');

  const bmr  = mifflin(weight, height, age, sex);
  const tdee = Math.round(bmr * activity);
  const target = goal === 'bulk' ? tdee + 300 : goal === 'cut' ? tdee - 400 : tdee;

  return (
    <div className="space-y-6">
      {/* sex toggle */}
      <div className="flex gap-2">
        {(['male', 'female'] as const).map((s) => (
          <button key={s} onClick={() => setSex(s)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              sex === s ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            {s === 'male' ? '♂ Мужчина' : '♀ Женщина'}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <InputRow label="Вес"    value={weight} onChange={setWeight} unit="кг"  min={40} max={200} />
        <InputRow label="Рост"   value={height} onChange={setHeight} unit="см"  min={140} max={220} />
        <InputRow label="Возраст" value={age}   onChange={setAge}   unit="лет" min={14} max={80} />
      </div>
      {/* activity */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Уровень активности</label>
        <select value={activity} onChange={(e) => setActivity(Number(e.target.value))}
          className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary-500">
          {activityFactors.map((a) => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>
      </div>
      {/* goal */}
      <div className="flex gap-2">
        {([['bulk','💪 Масса'],['maintain','⚖️ Поддержание'],['cut','🔥 Сушка']] as const).map(([g, l]) => (
          <button key={g} onClick={() => setGoal(g)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
              goal === g ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ResultCard label="Базальный (BMR)" value={Math.round(bmr).toString()} sub="ккал/день" color="text-gray-300" />
        <ResultCard label="TDEE" value={tdee.toString()} sub="ккал/день" color="text-yellow-400" />
        <ResultCard label="Цель" value={target.toString()} sub="ккал/день"
          color={goal === 'bulk' ? 'text-green-400' : goal === 'cut' ? 'text-red-400' : 'text-primary-400'} />
      </div>
      <div className="text-xs text-gray-500 bg-dark-700 rounded-xl p-4">
        <p>📐 Формула Миффлина-Сан Жеора — наиболее точная для большинства людей (±10%).</p>
      </div>
    </div>
  );
}

/* ─── Macros ─── */
function MacrosCalc() {
  const [calories, setCalories] = useState(2500);
  const [goal, setGoal] = useState<'bulk' | 'cut' | 'maintain'>('maintain');

  const ratios = {
    bulk:     { p: 0.30, f: 0.25, c: 0.45 },
    cut:      { p: 0.40, f: 0.30, c: 0.30 },
    maintain: { p: 0.30, f: 0.30, c: 0.40 },
  };
  const r = ratios[goal];
  const protein = Math.round((calories * r.p) / 4);
  const fat     = Math.round((calories * r.f) / 9);
  const carbs   = Math.round((calories * r.c) / 4);

  return (
    <div className="space-y-6">
      <InputRow label="Суточные калории" value={calories} onChange={setCalories} unit="ккал" min={1200} max={5000} step={50} />
      <div className="flex gap-2">
        {([['bulk','💪 Масса'],['maintain','⚖️ Норма'],['cut','🔥 Сушка']] as const).map(([g, l]) => (
          <button key={g} onClick={() => setGoal(g)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
              goal === g ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ResultCard label="Белок" value={`${protein} г`} sub={`${Math.round(r.p * 100)}% ккал`} color="text-blue-400" />
        <ResultCard label="Жиры"  value={`${fat} г`}     sub={`${Math.round(r.f * 100)}% ккал`} color="text-yellow-400" />
        <ResultCard label="Углеводы" value={`${carbs} г`} sub={`${Math.round(r.c * 100)}% ккал`} color="text-green-400" />
      </div>
      {/* visual bar */}
      <div className="rounded-xl overflow-hidden h-5 flex">
        <div className="bg-blue-500"   style={{ width: `${r.p * 100}%` }} />
        <div className="bg-yellow-500" style={{ width: `${r.f * 100}%` }} />
        <div className="bg-green-500"  style={{ width: `${r.c * 100}%` }} />
      </div>
      <div className="flex gap-4 text-xs text-gray-400 justify-center">
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full" /> Белок</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500 rounded-full" /> Жиры</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full" /> Углеводы</span>
      </div>
    </div>
  );
}

/* ─── Water ─── */
function WaterCalc() {
  const [weight, setWeight]   = useState(80);
  const [activity, setActivity] = useState<'low' | 'medium' | 'high'>('medium');
  const [climate, setClimate]   = useState<'cold' | 'normal' | 'hot'>('normal');

  const base = weight * 35;
  const actAdd  = activity  === 'low' ? 0 : activity  === 'medium' ? 500 : 1000;
  const climAdd = climate   === 'cold' ? -200 : climate === 'normal' ? 0 : 400;
  const total   = Math.round((base + actAdd + climAdd) / 100) * 100;
  const glasses = Math.round(total / 250);

  return (
    <div className="space-y-6">
      <InputRow label="Вес" value={weight} onChange={setWeight} unit="кг" min={40} max={200} />
      <div>
        <label className="block text-sm text-gray-400 mb-2">Активность</label>
        <div className="flex gap-2">
          {([['low','🛋️ Низкая'],['medium','🚶 Средняя'],['high','🏋️ Высокая']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setActivity(v)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                activity === v ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}>{l}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-2">Климат</label>
        <div className="flex gap-2">
          {([['cold','❄️ Холод'],['normal','☀️ Норма'],['hot','🌡️ Жара']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setClimate(v)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                climate === v ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ResultCard label="Суточная норма" value={`${(total / 1000).toFixed(1)} л`} color="text-cyan-400" />
        <ResultCard label="Стаканов (250 мл)" value={`${glasses} шт`} color="text-cyan-400" />
      </div>
      <div className="bg-dark-700 border border-cyan-500/20 rounded-xl p-4 text-xs text-gray-400 space-y-1">
        <p>💧 Базовая норма: 35 мл × кг веса</p>
        <p>🏋️ Тренировка: +500–1000 мл</p>
        <p>🌡️ Жара: +400 мл | ❄️ Холод: −200 мл</p>
      </div>
    </div>
  );
}

/* ─── Pulse zones ─── */
function PulseCalc() {
  const [age, setAge]       = useState(25);
  const [restHR, setRestHR] = useState(65);

  const maxHR = 220 - age;
  const hrr   = maxHR - restHR; // Heart Rate Reserve (Karvonen)

  const zones = [
    { name: 'Восстановление',  pct: [50, 60],  color: 'bg-blue-500',   emoji: '😴' },
    { name: 'Жиросжигание',    pct: [60, 70],  color: 'bg-green-500',  emoji: '🔥' },
    { name: 'Аэробная',        pct: [70, 80],  color: 'bg-yellow-500', emoji: '🏃' },
    { name: 'Анаэробная',      pct: [80, 90],  color: 'bg-orange-500', emoji: '⚡' },
    { name: 'Максимальная',    pct: [90, 100], color: 'bg-red-500',    emoji: '🚀' },
  ];

  const karvo = (pct: number) => Math.round(restHR + hrr * (pct / 100));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <InputRow label="Возраст"        value={age}    onChange={setAge}    unit="лет" min={14} max={80} />
        <InputRow label="ЧСС в покое"   value={restHR} onChange={setRestHR} unit="уд/мин" min={40} max={100} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ResultCard label="Максимальный пульс" value={`${maxHR}`} sub="уд/мин" color="text-red-400" />
        <ResultCard label="Резерв ЧСС" value={`${hrr}`} sub="уд/мин" color="text-orange-400" />
      </div>
      <div className="space-y-2">
        {zones.map((z) => {
          const lo = karvo(z.pct[0]);
          const hi = karvo(z.pct[1]);
          const width = z.pct[1] - z.pct[0];
          return (
            <div key={z.name} className="bg-dark-700 border border-white/10 rounded-xl p-3 flex items-center gap-3">
              <span className="text-xl w-8 text-center">{z.emoji}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-white">{z.name}</span>
                  <span className="text-gray-400 font-mono">{lo}–{hi} уд/мин</span>
                </div>
                <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${z.color} rounded-full`}
                    style={{ width: `${width * 2}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-500 w-14 text-right">{z.pct[0]}–{z.pct[1]}%</span>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 bg-dark-700 rounded-xl p-4">
        <p>📐 Метод Карвонена: ЧСС = ЧСС_покоя + (ЧСС_макс − ЧСС_покоя) × %</p>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function Calculators() {
  const [active, setActive] = useState<CalcTab>('bmi');

  const panels: Record<CalcTab, JSX.Element> = {
    bmi:      <BmiCalc />,
    calories: <CaloriesCalc />,
    macros:   <MacrosCalc />,
    water:    <WaterCalc />,
    pulse:    <PulseCalc />,
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-14 px-4">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 40% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 60% 50%, #06b6d4 0%, transparent 50%)' }}
        />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary-500/20 rounded-xl border border-primary-500/30">
              <Calculator className="w-8 h-8 text-primary-400" />
            </div>
            <div>
              <p className="text-primary-400 text-sm font-medium uppercase tracking-wider">Инструменты</p>
              <h1 className="text-4xl font-black">Калькуляторы</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">БМИ, калории, макросы, норма воды и пульсовые зоны</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                active === t.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-dark-800 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
          {panels[active]}
        </div>
      </div>
    </div>
  );
}
