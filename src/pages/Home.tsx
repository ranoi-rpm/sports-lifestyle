import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap, Dumbbell, BookOpen, Calculator, Salad,
  Video, Heart, Users, ArrowRight, Flame,
  ChevronRight, Star, TrendingUp, Shield, Clock
} from 'lucide-react'
import { SectionHeader } from '@/components/ui'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = Math.ceil(to / 60)
      const id = setInterval(() => {
        start = Math.min(start + step, to)
        setVal(start)
        if (start >= to) clearInterval(id)
      }, 16)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { to: 100, suffix: '+', label: 'Упражнений',   icon: Dumbbell,   color: 'text-primary' },
  { to: 60,  suffix: '+', label: 'Вики-статей',  icon: BookOpen,   color: 'text-accent'  },
  { to: 40,  suffix: '+', label: 'Рецептов',     icon: Salad,      color: 'text-pink-400'},
  { to: 5,   suffix: '',  label: 'Калькуляторов',icon: Calculator, color: 'text-green-400'},
]

const SECTIONS = [
  {
    icon: Dumbbell, to: '/exercises', label: 'База упражнений',
    desc: '100+ упражнений с техникой, видео и мышечными схемами',
    color: 'text-primary', border: 'hover:border-primary/50', glow: 'hover:shadow-primary/10',
    badge: '100+',
  },
  {
    icon: BookOpen, to: '/wiki', label: 'Вики для качков',
    desc: 'Анатомия, термины, методики, добавки — как Wikipedia для спорта',
    color: 'text-accent', border: 'hover:border-accent/50', glow: 'hover:shadow-accent/10',
    badge: '60+',
  },
  {
    icon: Calculator, to: '/calculators', label: 'Калькуляторы',
    desc: 'БМИ, TDEE, макросы, норма воды, пульсовые зоны',
    color: 'text-green-400', border: 'hover:border-green-400/50', glow: 'hover:shadow-green-400/10',
    badge: '5',
  },
  {
    icon: Salad, to: '/nutrition', label: 'Питание',
    desc: 'Рецепты, рационы, советы нутрициолога по БЖУ',
    color: 'text-pink-400', border: 'hover:border-pink-400/50', glow: 'hover:shadow-pink-400/10',
    badge: '40+',
  },
  {
    icon: Video, to: '/videos', label: 'Видео-хаб',
    desc: 'Лучшие тренировки с YouTube и RuTube в одном месте',
    color: 'text-yellow-400', border: 'hover:border-yellow-400/50', glow: 'hover:shadow-yellow-400/10',
    badge: 'NEW',
  },
  {
    icon: Heart, to: '/health', label: 'Здоровье',
    desc: 'Сон, восстановление, профилактика травм и стресс',
    color: 'text-red-400', border: 'hover:border-red-400/50', glow: 'hover:shadow-red-400/10',
    badge: '',
  },
  {
    icon: Flame, to: '/motivation', label: 'Мотивация',
    desc: 'Цитаты, истории успеха и 30-дневный челлендж',
    color: 'text-orange-400', border: 'hover:border-orange-400/50', glow: 'hover:shadow-orange-400/10',
    badge: 'HOT',
  },
  {
    icon: Users, to: '/community', label: 'Сообщество',
    desc: 'Общение, советы и поддержка активных участников',
    color: 'text-purple-400', border: 'hover:border-purple-400/50', glow: 'hover:shadow-purple-400/10',
    badge: '',
  },
]

const FEATURES = [
  { icon: Shield,    title: 'Проверенная информация',  desc: 'Все статьи основаны на научных исследованиях и мнениях экспертов.' },
  { icon: TrendingUp,title: 'Для любого уровня',       desc: 'Новичок или атлет — найдёшь контент под свой уровень подготовки.' },
  { icon: Clock,     title: 'Обновляется постоянно',   desc: 'База данных регулярно пополняется новыми статьями и упражнениями.' },
  { icon: Star,      title: 'Бесплатно навсегда',      desc: 'Весь контент открыт и бесплатен — без регистраций и подписок.' },
]

const QUOTES = [
  { text: 'Твоё тело может всё. Это твой разум нужно убедить.', author: 'Арнольд Шварценеггер' },
  { text: 'Не останавливайся, когда устал. Останавливайся, когда сделал.', author: 'Неизвестный тренер' },
  { text: 'Каждая тренировка делает тебя лучше, чем вчера.', author: 'SportLife' },
  { text: 'Боль временна. Результат — навсегда.', author: 'Рон Коулман' },
]

const POPULAR_WIKI = [
  { slug: 'hypertrophy',  title: 'Гипертрофия мышц',      cat: 'Тренинг' },
  { slug: 'protein',      title: 'Белок и его роль',       cat: 'Питание' },
  { slug: 'progressive-overload', title: 'Прогрессия нагрузки', cat: 'Методика' },
  { slug: 'sleep',        title: 'Сон и восстановление',   cat: 'Здоровье' },
  { slug: 'creatine',     title: 'Креатин: полный гайд',   cat: 'Добавки' },
  { slug: 'bench-press',  title: 'Техника жима лёжа',      cat: 'Упражнение' },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  // Auto-rotate quotes
  useEffect(() => {
    const id = setInterval(() => setQuoteIdx(i => (i + 1) % QUOTES.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-2 via-dark to-dark" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,107,53,0.13) 0%, transparent 60%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(0,212,255,0.06) 0%, transparent 50%)'
        }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative container-main text-center py-32 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 text-primary text-sm font-bold mb-8">
            <Zap size={14} fill="currentColor" />
            Энциклопедия спорта и здоровья
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Живи{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                Активно
              </span>
            </span>
            .<br />
            Будь{' '}
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Сильнее
            </span>
            .
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            SportLife Wiki — самая полная база знаний о тренировках, питании,
            здоровье и спортивной науке на русском языке.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-3 justify-center flex-wrap mb-16">
            <Link
              to="/exercises"
              className="group flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40 text-base"
            >
              <Dumbbell size={18} />
              База упражнений
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/wiki"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold px-8 py-4 rounded-full transition-all text-base"
            >
              <BookOpen size={18} />
              Открыть Вики
            </Link>
            <Link
              to="/calculators"
              className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 border border-accent/20 text-accent font-bold px-8 py-4 rounded-full transition-all text-base"
            >
              <Calculator size={18} />
              Калькуляторы
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map(({ to, suffix, label, icon: Icon, color }) => (
              <div key={label} className="bg-white/3 border border-white/8 backdrop-blur-sm rounded-2xl p-5 group hover:border-white/15 transition-all">
                <Icon size={22} className={`${color} mb-2 mx-auto`} />
                <div className={`text-3xl font-black ${color}`}>
                  <Counter to={to} suffix={suffix} />
                </div>
                <div className="text-gray-500 text-xs mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
          <span className="text-xs">Прокрути вниз</span>
          <ChevronRight size={16} className="rotate-90" />
        </div>
      </section>

      {/* ── SECTIONS GRID ── */}
      <section className="py-24 bg-dark-2">
        <div className="container-main">
          <SectionHeader
            title="Всё что нужно "
            highlight="в одном месте"
            subtitle="Полная экосистема для твоего здоровья и прогресса"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTIONS.map(({ icon: Icon, to, label, desc, color, border, glow, badge }) => (
              <Link
                key={to} to={to}
                className={`group relative bg-surface rounded-2xl border border-white/5 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${border} ${glow}`}
              >
                {badge && (
                  <span className={`absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full ${
                    badge === 'HOT' ? 'bg-primary/20 text-primary' :
                    badge === 'NEW' ? 'bg-accent/20 text-accent' :
                    'bg-white/10 text-gray-400'
                  }`}>{badge}</span>
                )}
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className={color} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                <span className={`text-sm font-semibold flex items-center gap-1 ${color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                  Перейти <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SPORTLIFE ── */}
      <section className="py-24 bg-dark">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                title="Почему "
                highlight="SportLife?"
                subtitle="Мы собрали всё необходимое, чтобы твой путь в спорте был проще и эффективнее."
              />
              <div className="space-y-5">
                {FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 group">
                    <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/wiki"
                className="mt-8 inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                Открыть Вики <ArrowRight size={16} />
              </Link>
            </div>

            {/* Popular wiki preview */}
            <div className="space-y-3">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4">Популярные статьи</p>
              {POPULAR_WIKI.map(({ slug, title, cat }) => (
                <Link
                  key={slug}
                  to={`/wiki/${slug}`}
                  className="flex items-center gap-4 bg-surface hover:bg-surface-2 border border-white/5 hover:border-primary/20 rounded-xl px-5 py-4 transition-all group"
                >
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-white font-medium flex-1">{title}</span>
                  <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full flex-shrink-0">{cat}</span>
                  <ChevronRight size={14} className="text-gray-600 group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              ))}
              <Link
                to="/wiki"
                className="flex items-center justify-center gap-2 text-primary text-sm font-bold mt-4 hover:gap-3 transition-all"
              >
                Все статьи <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE CAROUSEL ── */}
      <section className="py-20 bg-dark-2 overflow-hidden">
        <div className="container-main">
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="text-6xl text-primary/20 font-black leading-none mb-4">&ldquo;</div>
            <div className="min-h-[100px] flex flex-col items-center justify-center">
              <p className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-4 transition-all">
                {QUOTES[quoteIdx].text}
              </p>
              <p className="text-primary font-semibold">— {QUOTES[quoteIdx].author}</p>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === quoteIdx ? 'bg-primary w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 30-DAY CHALLENGE ── */}
      <section className="py-20 bg-dark">
        <div className="container-main">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-dark-2 border border-primary/20 rounded-3xl p-10 md:p-16 text-center">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 80% 50%, #00d4ff 0%, transparent 50%)'
            }} />
            <div className="relative">
              <span className="text-5xl mb-4 block">🏆</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                30-дневный челлендж
              </h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                Присоединись к марафону здоровья! Каждый день — новое задание.
                Трансформируй своё тело и привычки за 30 дней.
              </p>
              <Link
                to="/motivation"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-black px-10 py-4 rounded-full text-lg transition-all hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <Flame size={20} fill="currentColor" />
                Начать челлендж
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 bg-dark-2">
        <div className="container-main max-w-2xl text-center">
          <SectionHeader
            title="Будь в "
            highlight="курсе"
            subtitle="Лучшие советы, новые статьи и тренировки — раз в неделю на почту"
            centered
          />
          {subDone ? (
            <div className="text-green-400 text-lg font-bold flex items-center justify-center gap-2">
              ✅ Отлично! Ты в списке. Скоро пришлём первое письмо.
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubDone(true) }}
              className="flex gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Твой email"
                className="flex-1 bg-surface border border-white/10 text-white rounded-full px-5 py-3.5 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-primary/30 flex-shrink-0"
              >
                Подписаться
              </button>
            </form>
          )}
          <p className="text-gray-600 text-xs mt-4">Без спама. Отписаться можно в любой момент.</p>
        </div>
      </section>

    </div>
  )
}
