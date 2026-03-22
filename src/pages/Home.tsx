import { Link } from 'react-router-dom'
import { Zap, BookOpen, Calculator, Dumbbell, Video, Heart, Users, ArrowRight } from 'lucide-react'

const SECTIONS = [
  { icon: Dumbbell,    to: '/exercises',   label: 'Упражнения',    desc: '100+ упражнений с техникой и видео',      color: 'text-primary' },
  { icon: BookOpen,    to: '/wiki',        label: 'Вики',          desc: '60+ статей: мышцы, термины, методики',   color: 'text-accent' },
  { icon: Calculator,  to: '/calculators', label: 'Калькуляторы',  desc: 'БМИ, калории, макросы, норма воды',       color: 'text-green-400' },
  { icon: Heart,       to: '/nutrition',   label: 'Питание',       desc: '40+ рецептов для спортсменов',            color: 'text-pink-400' },
  { icon: Video,       to: '/videos',      label: 'Видео',         desc: 'YouTube и RuTube подборки',               color: 'text-yellow-400' },
  { icon: Users,       to: '/community',   label: 'Сообщество',    desc: 'Общение, советы, поддержка',              color: 'text-purple-400' },
]

const STATS = [
  { value: '100+', label: 'Упражнений' },
  { value: '60+',  label: 'Вики-статей' },
  { value: '5',    label: 'Калькуляторов' },
  { value: '40+',  label: 'Рецептов' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(255,107,53,0.12) 0%, transparent 60%)' }} />
        <div className="relative container-main text-center py-32 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-sm font-semibold mb-6">
            <Zap size={14} fill="currentColor" /> Энциклопедия спорта и здоровья
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 text-balance">
            Живи <span className="gradient-text">Активно</span>.<br />Будь Сильнее.
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            SportLife Wiki — всё о тренировках, питании, здоровье и спортивной науке в одном месте.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/exercises" className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30">
              База упражнений
            </Link>
            <Link to="/wiki" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-3.5 rounded-full transition-all">
              Открыть Вики
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map(({ value, label }) => (
              <div key={label} className="card-base p-4">
                <div className="text-3xl font-black text-primary">{value}</div>
                <div className="text-gray-400 text-sm mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-20 bg-dark-2">
        <div className="container-main">
          <h2 className="section-title text-center">Что есть на сайте</h2>
          <p className="section-subtitle text-center">Полная экосистема для твоего здоровья и прогресса</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTIONS.map(({ icon: Icon, to, label, desc, color }) => (
              <Link key={to} to={to} className="card-base card-hover p-6 group">
                <Icon className={`${color} mb-4`} size={32} />
                <h3 className="text-white font-bold text-lg mb-1">{label}</h3>
                <p className="text-gray-400 text-sm mb-4">{desc}</p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Перейти <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
