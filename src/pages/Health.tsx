import { useState } from 'react';
import { Heart, Moon, Shield, Activity, ChevronDown, ChevronUp } from 'lucide-react';

type Section = 'sleep' | 'recovery' | 'injury' | 'stress';

interface AccordionItem { q: string; a: string; }

const sections = [
  { id: 'sleep'    as Section, title: 'Сон и восстановление',   color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
  { id: 'recovery' as Section, title: 'Активное восстановление', color: 'text-cyan-400',   border: 'border-cyan-500/30',   bg: 'bg-cyan-500/10' },
  { id: 'injury'   as Section, title: 'Профилактика травм',      color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' },
  { id: 'stress'   as Section, title: 'Стресс и психология',     color: 'text-pink-400',   border: 'border-pink-500/30',   bg: 'bg-pink-500/10' },
];

const content: Record<Section, { intro: string; tips: string[]; faq: AccordionItem[] }> = {
  sleep: {
    intro: 'Сон — главный анаболический инструмент. 80% гормона роста вырабатывается именно ночью. Без качественного сна ни тренировки, ни питание не дадут полного эффекта.',
    tips: [
      'Спи 7–9 часов в тёмной прохладной комнате (18–20°C)',
      'Убирай экраны за 1 час до сна — синий свет блокирует мелатонин',
      'Ложись и вставай в одно время даже в выходные',
      'Казеин или творог на ночь — медленный белок для мышц',
      'Магний (глицинат) 400 мг перед сном улучшает качество сна',
      'Избегай алкоголя — он разрушает фазы глубокого сна',
    ],
    faq: [
      { q: 'Можно ли тренироваться при недосыпе?', a: 'Лучше снизить интенсивность или пропустить тренировку. Недосып повышает кортизол и риск травм на 60%.' },
      { q: 'Дневной сон полезен?', a: '20–30 минут днём улучшают когнитивные функции. Больше 45 мин — риск инерции сна и проблем ночью.' },
      { q: 'Что если сложно уснуть после вечерней тренировки?', a: 'Снизь интенсивность тренировок после 20:00, прими контрастный душ, выпей ромашковый чай.' },
    ],
  },
  recovery: {
    intro: 'Активное восстановление ускоряет вывод молочной кислоты и снижает крепатуру. Это не отдых на диване — это лёгкое движение.',
    tips: [
      'Лёгкое кардио (20–30 мин ходьбы/велосипеда) на следующий день после тяжёлой тренировки',
      'Контрастный душ: 30 сек холодно / 60 сек тепло, 3–5 циклов',
      'Пенный ролик (foam roller) по 60–90 сек на каждую группу мышц',
      'Растяжка 10–15 мин после тренировки — только статика',
      'Массаж раз в неделю — особенно при больших объёмах',
      'Ванна с солью Эпсома (сульфат магния) снимает DOMS',
    ],
    faq: [
      { q: 'Что такое DOMS?', a: 'Delayed Onset Muscle Soreness — крепатура через 24–48ч. Это нормально, особенно при новых движениях. Не признак хорошей тренировки, а адаптация.' },
      { q: 'Помогают ли ледяные ванны?', a: 'Снижают воспаление краткосрочно, но могут тормозить гипертрофию. Лучше для спортсменов с соревнованиями, не для бодибилдинга.' },
      { q: 'Нужно ли делать растяжку?', a: 'Перед тренировкой — динамическую (разминка). После — статическую. Улучшает мобильность и снижает риск травм.' },
    ],
  },
  injury: {
    intro: 'Большинство травм в зале происходят из-за плохой техники, слишком быстрого прогресса или игнорирования разминки. Профилактика проще и дешевле лечения.',
    tips: [
      'Всегда делай разминку: 5–10 мин кардио + суставная гимнастика',
      'Учи технику с лёгким весом — первые 2–4 недели только форма',
      'Не прибавляй больше 2.5 кг/нед на жиме, 5 кг/нед на становой',
      'Укрепляй мышцы-стабилизаторы: вращательная манжета, VMO, ягодицы',
      'Face pull 3×15 каждую тренировку — защита плеча',
      'При острой боли (≠ дискомфорт) — стоп и врач',
    ],
    faq: [
      { q: 'Как отличить боль от травмы и дискомфорт от нагрузки?', a: 'Дискомфорт — тупой, в мышце, проходит после разминки. Боль от травмы — острая, в суставе/сухожилии, не проходит или усиливается.' },
      { q: 'Можно ли тренироваться с лёгкой болью в суставе?', a: 'Только если не острая боль. Снизь вес, измени технику или упражнение. Не игнорируй — хроника хуже острой травмы.' },
      { q: 'Нужен ли атлетический пояс?', a: 'Только при около-максимальных весах (>85% 1ПМ). Постоянное использование ослабляет кор. Научись без пояса.' },
    ],
  },
  stress: {
    intro: 'Хронический стресс повышает кортизол — это прямой враг мышечного роста. Психологическое восстановление так же важно, как и физическое.',
    tips: [
      'Медитация 5–10 мин/день снижает кортизол на ~20% (по данным исследований)',
      'Ведение дневника тренировок снижает тревожность и повышает мотивацию',
      'Социальные тренировки (партнёр) повышают приверженность на 65%',
      'Не сравнивай себя с другими — сравнивай с собой 3 месяца назад',
      'Периоды деактивации (отпуск от зала 1–2 нед раз в квартал) полезны',
      'Холодный душ по утрам тренирует стрессоустойчивость нервной системы',
    ],
    faq: [
      { q: 'Можно ли тренироваться при сильном стрессе?', a: 'Умеренная тренировка снижает стресс. Но тяжёлая при высоком кортизоле — путь к перетрену. Снизь объём на 40% в стрессовые недели.' },
      { q: 'Как бороться с потерей мотивации?', a: 'Смени программу, найди партнёра, поставь краткосрочную цель (30-дневный челлендж), пересмотри вдохновляющий контент.' },
      { q: 'Нужен ли психолог спортсмену?', a: 'Спортивная психология — законная часть подготовки. Визуализация, аффирмации и работа с установками дают ощутимый результат.' },
    ],
  },
};

function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="bg-dark-700 border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-medium text-sm text-white">{item.q}</span>
            {open === i ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
          </button>
          {open === i && (
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-300 leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const sectionIcons: Record<Section, JSX.Element> = {
  sleep:    <Moon className="w-5 h-5" />,
  recovery: <Activity className="w-5 h-5" />,
  injury:   <Shield className="w-5 h-5" />,
  stress:   <Heart className="w-5 h-5" />,
};

export default function Health() {
  const [active, setActive] = useState<Section>('sleep');
  const sec  = content[active];
  const meta = sections.find((s) => s.id === active)!;

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-14 px-4">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #ec4899 0%, transparent 50%), radial-gradient(circle at 70% 50%, #6366f1 0%, transparent 50%)' }} />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-pink-500/20 rounded-xl border border-pink-500/30">
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
            <div>
              <p className="text-pink-400 text-sm font-medium uppercase tracking-wider">Здоровье</p>
              <h1 className="text-4xl font-black">Здоровье и восстановление</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">Сон, профилактика травм, стресс и активное восстановление</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                active === s.id ? `${s.bg} ${s.border} ${s.color}` : 'bg-dark-800 border-white/10 text-gray-400 hover:bg-dark-700 hover:text-white'
              }`}>
              <span className={active === s.id ? s.color : ''}>{sectionIcons[s.id]}</span>
              <span className="text-xs font-medium text-center leading-tight">{s.title}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className={`bg-dark-800 border ${meta.border} rounded-2xl p-6`}>
              <div className={`flex items-center gap-2 mb-3 ${meta.color}`}>
                {sectionIcons[active]}
                <h2 className="text-xl font-bold">{meta.title}</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{sec.intro}</p>
            </div>

            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">💡 Практические советы</h3>
              <ul className="space-y-3">
                {sec.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-gray-300">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${meta.border} ${meta.color}`}>{i + 1}</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">❓ Частые вопросы</h3>
              <Accordion items={sec.faq} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4 text-gray-200">📊 Ключевые цифры</h3>
              <div className="space-y-3">
                {[
                  { label: 'Сон для роста',      value: '7–9 ч',   color: 'text-indigo-400' },
                  { label: 'Восст. малых мышц',  value: '48 ч',    color: 'text-cyan-400' },
                  { label: 'Восст. ног',         value: '72–96 ч', color: 'text-cyan-400' },
                  { label: 'Кортизол при недосыпе', value: '+21%', color: 'text-red-400' },
                  { label: 'ГР во сне',          value: '80%',     color: 'text-green-400' },
                  { label: 'Дилоад раз в',       value: '4–6 нед', color: 'text-yellow-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className={`text-sm font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-dark-800 border border-yellow-500/20 rounded-2xl p-5">
              <h3 className="font-bold mb-3 text-yellow-400">⚠️ Важно</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Информация носит образовательный характер. При травмах и острых болях — консультируйся с врачом или физиотерапевтом.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
