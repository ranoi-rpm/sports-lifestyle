import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Menu, X, Search, Zap, Dumbbell, BookOpen,
  Calculator, Salad, Video, Heart, Users,
  Flame, ChevronDown, Star
} from 'lucide-react'
import clsx from 'clsx'

// ── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  to:      string
  label:   string
  icon:    React.ElementType
  color:   string
  desc:    string
  children?: { to: string; label: string; badge?: string }[]
}

// ── Nav config ───────────────────────────────────────────────────────────────
const NAV: NavItem[] = [
  {
    to: '/exercises', label: 'Упражнения', icon: Dumbbell, color: 'text-primary',
    desc: '100+ упражнений с техникой и видео',
    children: [
      { to: '/exercises?muscle=chest',    label: 'Грудь' },
      { to: '/exercises?muscle=back',     label: 'Спина' },
      { to: '/exercises?muscle=legs',     label: 'Ноги' },
      { to: '/exercises?muscle=shoulders',label: 'Плечи' },
      { to: '/exercises?muscle=abs',      label: 'Пресс' },
      { to: '/exercises?type=cardio',     label: 'Кардио', badge: 'NEW' },
    ],
  },
  {
    to: '/wiki', label: 'Вики', icon: BookOpen, color: 'text-accent',
    desc: '60+ статей: мышцы, термины, методики',
    children: [
      { to: '/wiki?cat=anatomy',     label: 'Анатомия' },
      { to: '/wiki?cat=training',    label: 'Тренинг' },
      { to: '/wiki?cat=nutrition',   label: 'Питание' },
      { to: '/wiki?cat=supplements', label: 'Добавки' },
      { to: '/wiki?cat=recovery',    label: 'Восстановление' },
      { to: '/wiki?cat=programs',    label: 'Программы', badge: 'HOT' },
    ],
  },
  {
    to: '/calculators', label: 'Калькуляторы', icon: Calculator, color: 'text-green-400',
    desc: 'БМИ, калории, макросы, норма воды',
    children: [
      { to: '/calculators#bmi',       label: 'Индекс массы тела' },
      { to: '/calculators#calories',  label: 'Калории (TDEE)' },
      { to: '/calculators#macros',    label: 'Макросы' },
      { to: '/calculators#water',     label: 'Норма воды' },
      { to: '/calculators#pulse',     label: 'Пульсовые зоны' },
    ],
  },
  {
    to: '/nutrition', label: 'Питание', icon: Salad, color: 'text-pink-400',
    desc: '40+ рецептов для спортсменов',
    children: [
      { to: '/nutrition?type=breakfast',    label: 'Завтрак' },
      { to: '/nutrition?type=pre-workout',  label: 'До тренировки' },
      { to: '/nutrition?type=post-workout', label: 'После тренировки' },
      { to: '/nutrition?diet=bulk',         label: 'Набор массы' },
      { to: '/nutrition?diet=cut',          label: 'Сушка' },
    ],
  },
  {
    to: '/videos', label: 'Видео', icon: Video, color: 'text-yellow-400',
    desc: 'YouTube и RuTube подборки',
  },
  {
    to: '/health', label: 'Здоровье', icon: Heart, color: 'text-red-400',
    desc: 'Сон, восстановление, профилактика',
  },
  {
    to: '/community', label: 'Сообщество', icon: Users, color: 'text-purple-400',
    desc: 'Общение, советы, поддержка',
  },
]

// ── Quick search results mock ─────────────────────────────────────────────────
const QUICK: { label: string; to: string; type: string }[] = [
  { label: 'Жим лёжа',        to: '/exercises/bench-press',  type: 'Упражнение' },
  { label: 'Приседания',      to: '/exercises/squat',        type: 'Упражнение' },
  { label: 'Протеин',         to: '/wiki/protein',           type: 'Вики' },
  { label: 'Калькулятор БМИ', to: '/calculators#bmi',        type: 'Инструмент' },
  { label: 'Гипертрофия',     to: '/wiki/hypertrophy',       type: 'Вики' },
  { label: 'Куриная грудка',  to: '/nutrition/chicken',      type: 'Рецепт' },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [query,       setQuery]       = useState('')
  const [scrolled,    setScrolled]    = useState(false)
  const [scrollPct,   setScrollPct]   = useState(0)
  const [activeMenu,  setActiveMenu]  = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate  = useNavigate()
  const location  = useLocation()

  // close on route change
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
    setActiveMenu(null)
  }, [location.pathname])

  // scroll effects
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const el  = document.documentElement
      const pct = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100
      setScrollPct(Math.min(100, pct))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // focus search input
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50)
  }, [searchOpen])

  // keyboard shortcut Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(v => !v)
      }
      if (e.key === 'Escape') { setSearchOpen(false); setActiveMenu(null) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/wiki?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setSearchOpen(false)
    }
  }

  const filtered = query.length > 1
    ? QUICK.filter(q => q.label.toLowerCase().includes(query.toLowerCase()))
    : QUICK

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent z-[60] transition-all duration-100"
        style={{ width: `${scrollPct}%` }}
      />

      <header
        className={clsx(
          'fixed top-0.5 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5'
            : 'bg-transparent',
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-black text-xl text-white flex-shrink-0 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <span>Sport<span className="text-primary">Life</span></span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV.map(item => (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => item.children ? setActiveMenu(item.to) : setActiveMenu(null)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors',
                        isActive ? 'text-primary bg-primary/10' : 'text-gray-300 hover:text-white hover:bg-white/5',
                      )
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={clsx('transition-transform duration-200', activeMenu === item.to && 'rotate-180')}
                      />
                    )}
                  </NavLink>

                  {/* Dropdown */}
                  {item.children && activeMenu === item.to && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-dark-2 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-2 animate-fade-in">
                      <div className="px-3 py-2 mb-1">
                        <item.icon size={16} className={clsx('inline mr-2', item.color)} />
                        <span className="text-xs text-gray-500">{item.desc}</span>
                      </div>
                      <div className="border-t border-white/5 mb-1" />
                      {item.children.map(child => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.label}
                          {child.badge && (
                            <span className={clsx(
                              'text-xs font-bold px-1.5 py-0.5 rounded',
                              child.badge === 'HOT' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent',
                            )}>
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-gray-400 hover:text-white transition-all text-sm"
              >
                <Search size={15} />
                <span className="hidden md:inline">Поиск</span>
                <kbd className="hidden md:inline bg-white/10 text-xs px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </button>

              {/* Motivation link */}
              <Link
                to="/motivation"
                className="hidden md:flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl px-3 py-2 text-sm font-bold transition-all"
              >
                <Flame size={15} fill="currentColor" />
                <span className="hidden lg:inline">Мотивация</span>
              </Link>

              {/* Mobile burger */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-dark-2/98 backdrop-blur-xl border-t border-white/5 max-h-[80vh] overflow-y-auto">
            <div className="container-main py-4 flex flex-col gap-1">
              {NAV.map(item => (
                <div key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors',
                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      )
                    }
                  >
                    <item.icon size={18} className={item.color} />
                    <div>
                      <div>{item.label}</div>
                      <div className="text-xs text-gray-500 font-normal">{item.desc}</div>
                    </div>
                  </NavLink>
                  {item.children && (
                    <div className="ml-10 mt-1 flex flex-wrap gap-1.5 mb-2">
                      {item.children.map(child => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="text-xs bg-white/5 hover:bg-primary/10 hover:text-primary text-gray-400 px-2.5 py-1 rounded-full transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/motivation"
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-primary bg-primary/10 mt-1"
              >
                <Flame size={18} fill="currentColor" /> Мотивация
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Search overlay ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false) }}
        >
          <div className="w-full max-w-2xl bg-dark-2 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <form onSubmit={handleSearch} className="flex items-center gap-3 p-4 border-b border-white/5">
              <Search size={20} className="text-primary flex-shrink-0" />
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Поиск по упражнениям, вики, рецептам..."
                className="flex-1 bg-transparent text-white text-lg placeholder:text-gray-500 focus:outline-none"
              />
              <kbd className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">ESC</kbd>
            </form>

            <div className="p-3">
              <p className="text-xs text-gray-500 px-2 mb-2">
                {query.length > 1 ? `Результаты для «${query}»` : 'Быстрый доступ'}
              </p>
              {filtered.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <Star size={14} className="text-primary flex-shrink-0" />
                  <span className="text-white font-medium flex-1">{item.label}</span>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{item.type}</span>
                </Link>
              ))}
              {query.length > 1 && filtered.length === 0 && (
                <p className="text-center text-gray-500 py-6">Ничего не найдено</p>
              )}
            </div>

            <div className="border-t border-white/5 px-4 py-3 flex items-center gap-4 text-xs text-gray-500">
              <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded">↵</kbd> перейти</span>
              <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded">ESC</kbd> закрыть</span>
              <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded">⌘K</kbd> открыть</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
