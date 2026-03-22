import { useState } from 'react';
import { Zap, Quote, RefreshCw, Trophy, Target, Flame } from 'lucide-react';

const quotes = [
  { text: 'Боль временна. Гордость от победы — вечна.', author: 'Хулио Иглесиас' },
  { text: 'Не считай дни. Делай дни счётными.', author: 'Марк Твен' },
  { text: 'Единственное место, где успех приходит до труда — это словарь.', author: 'Винстон Черчилль' },
  { text: 'Не важно, насколько медленно ты движешься — главное, что ты не останавливаешься.', author: 'Конфуций' },
  { text: 'Дисциплина — это делать то, что нужно, даже когда не хочется.', author: 'Джоко Виллинк' },
  { text: 'Твоё тело может значительно больше, чем ты думаешь.', author: 'Дьюан Джонсон' },
  { text: 'Успех — это сумма ежедневных усилий.', author: 'Игорь Стравинский' },
  { text: 'Хочешь измениться — начни с себя.', author: 'Махатма Ганди' },
  { text: 'Ты не устанешь, пока не победишь.', author: 'Арнольд Шварценеггер' },
  { text: 'Боль проходит. Гордость остаётся.', author: 'Фил Хитс (Navy SEAL)' },
  { text: 'Прогресс начинается там, где заканчивается зона комфорта.', author: 'Джон Максвелл' },
  { text: 'Страх убивает больше мечтей, чем неудача.', author: 'Уин Грецки' },
];

const challenges = [
  { id: 1, title: '30-дневная планка',       emoji: '🧘', days: 30, desc: 'Каждый день +5 сек. Начал с 60 сек.', color: 'border-blue-500/30 bg-blue-500/10' },
  { id: 2, title: '100 отжиманий в день',     emoji: '💪', days: 21, desc: 'Разбей на подходы по 10–25. Рост через 21 день.', color: 'border-orange-500/30 bg-orange-500/10' },
  { id: 3, title: 'Утром без телефона',       emoji: '🌅', days: 14, desc: 'Вставай на 30 мин раньше. Тренировка до завтрака.', color: 'border-yellow-500/30 bg-yellow-500/10' },
  { id: 4, title: '2 л воды в день',          emoji: '💧', days: 30, desc: 'Отслеживай в приложении. Почувствуй разницу.', color: 'border-cyan-500/30 bg-cyan-500/10' },
  { id: 5, title: 'Без пропущенных тренировок', emoji: '🔥', days: 30, desc: 'Ни одна тренировка не пропущена. Даже 5 мин.', color: 'border-red-500/30 bg-red-500/10' },
  { id: 6, title: 'Новое упражнение каждую неделю', emoji: '🌟', days: 42, desc: 'Добавляй 1 новое упражнение каждую неделю.', color: 'border-purple-500/30 bg-purple-500/10' },
];

const legends = [
  { name: 'Арнольд Шварценеггер', emoji: '🏆', fact: 'Начал тренироваться в 15 лет. Переехал в США с $20 в кармане.' },
  { name: 'Рони Колеман', emoji: '🥇', fact: '5-кратный олимпийский чемпион. Тренировался 2 раза в день ещё в 60 лет.' },
  { name: 'Серена Уильямс', emoji: '🎾', fact: '23 титула БОЛЬШОГО Шлема. Чемпион, когда другие ещё рождались.' },
  { name: 'Майкл Джордан', emoji: '🍎', fact: 'Был отчислен из школьной команды. Ответил на это тысячами часов тренировок.' },
  { name: 'Елена Исинбаева', emoji: '🤺', fact: 'Чемпионка мира по тяжёлой атлетике. Начала в  11 лет.' },
  { name: 'Усейн Болт', emoji: '⚡', fact: 'Самый быстрый человек в истории. 9.58 сек на 100м. Тренировался только 2 часа в день.' },
];

export default function Motivation() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, number>>({});

  const nextQuote = () => setQuoteIdx((i) => (i + 1) % quotes.length);
  const q = quotes[quoteIdx];

  const toggleDay = (challengeId: number, day: number) => {
    setProgress((prev) => {
      const key = challengeId * 100 + day;
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = 1;
      return next;
    });
  };

  const getDone = (challengeId: number, total: number) =>
    Array.from({ length: total }, (_, i) => progress[challengeId * 100 + i + 1] ? 1 : 0).reduce<number>((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="relative bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800 border-b border-white/5 py-14 px-4">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 50%, #eab308 0%, transparent 50%)' }} />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <p className="text-yellow-400 text-sm font-medium uppercase tracking-wider">Инспирация</p>
              <h1 className="text-4xl font-black">Мотивация</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">Цитаты, челленджи и легенды — всё, чтобы не останавливаться</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold">Цитата дня</h2>
          </div>
          <div className="relative bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
            <div className="text-6xl text-yellow-500/20 absolute top-4 left-6 font-serif leading-none">“</div>
            <p className="text-2xl font-medium text-white leading-relaxed relative z-10 mb-4">{q.text}</p>
            <p className="text-yellow-400 font-semibold">— {q.author}</p>
            <button onClick={nextQuote} className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-yellow-400 transition-colors" title="Следующая">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-1 justify-center mt-3">
            {quotes.map((_, i) => (
              <button key={i} onClick={() => setQuoteIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === quoteIdx ? 'bg-yellow-400 w-4' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold">Челленджи</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((ch) => {
              const done = getDone(ch.id, ch.days);
              const pct  = Math.round((done / ch.days) * 100);
              return (
                <div key={ch.id}
                  className={`border rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] ${
                    activeChallenge === ch.id ? ch.color + ' ring-1 ring-white/20' : 'bg-dark-800 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setActiveChallenge(activeChallenge === ch.id ? null : ch.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{ch.emoji}</span>
                    <span className="text-xs text-gray-400">{ch.days} дней</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">{ch.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{ch.desc}</p>
                  <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{done}/{ch.days} дней · {pct}%</p>
                  {activeChallenge === ch.id && (
                    <div className="mt-4 flex flex-wrap gap-1" onClick={(e) => e.stopPropagation()}>
                      {Array.from({ length: ch.days }, (_, i) => i + 1).map((day) => {
                        const isDone = !!progress[ch.id * 100 + day];
                        return (
                          <button key={day} onClick={() => toggleDay(ch.id, day)}
                            className={`w-7 h-7 rounded text-xs font-medium transition-all ${
                              isDone ? 'bg-green-500 text-white' : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
                            }`}>
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold">Легенды спорта</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {legends.map((l) => (
              <div key={l.name} className="bg-dark-800 border border-white/10 rounded-2xl p-5 hover:border-yellow-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{l.emoji}</span>
                  <h3 className="font-bold text-white">{l.name}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{l.fact}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold">Факты, которые мотивируют</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '66', label: 'дней', sub: 'до формирования привычки', color: 'text-yellow-400' },
              { value: '1%', label: 'в день', sub: 'рост = x37 за год', color: 'text-green-400' },
              { value: '80%', label: 'успеха', sub: 'зависит от системы', color: 'text-blue-400' },
              { value: '21', label: 'минута', sub: 'достаточно для начала', color: 'text-orange-400' },
            ].map(({ value, label, sub, color }) => (
              <div key={label} className="bg-dark-800 border border-white/10 rounded-2xl p-5 text-center">
                <p className={`text-4xl font-black ${color}`}>{value}</p>
                <p className="text-sm font-medium text-white mt-1">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
