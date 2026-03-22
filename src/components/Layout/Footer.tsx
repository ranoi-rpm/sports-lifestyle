import { Link } from 'react-router-dom'
import { Zap, Instagram, Youtube, MessageCircle, Mail, ArrowRight, Heart } from 'lucide-react'
import { useState } from 'react'

const FOOTER_LINKS = [
  {
    title: 'Тренировки',
    links: [
      { to: '/exercises',              label: 'База упражнений' },
      { to: '/exercises?type=cardio',  label: 'Кардио' },
      { to: '/exercises?type=strength',label: 'Силовые' },
      { to: '/wiki?cat=programs',      label: 'Программы' },
    ],
  },
  {
    title: 'Знания',
    links: [
      { to: '/wiki',                   label: 'Вики-энциклопедия' },
      { to: '/wiki?cat=anatomy',       label: 'Анатомия мышц' },
      { to: '/wiki?cat=supplements',   label: 'Спортпит' },
      { to: '/wiki?cat=training',      label: 'Методики тренинга' },
    ],
  },
  {
    title: 'Питание',
    links: [
      { to: '/nutrition',              label: 'Рецепты' },
      { to: '/calculators#calories',   label: 'Калькулятор TDEE' },
      { to: '/calculators#macros',     label: 'Расчёт макросов' },
      { to: '/nutrition?diet=bulk',    label: 'Набор массы' },
    ],
  },
  {
    title: 'Сервисы',
    links: [
      { to: '/calculators',   label: 'Все калькуляторы' },
      { to: '/videos',        label: 'Видео' },
      { to: '/health',        label: 'Здоровье' },
      { to: '/community',     label: 'Сообщество' },
    ],
  },
]

const SOCIAL = [
  { icon: Instagram,     href: '#', label: 'Instagram' },
  { icon: Youtube,       href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: '#', label: 'Telegram' },
  { icon: Mail,          href: '#', label: 'Email' },
]

export default function Footer() {
  const [email,    setEmail]    = useState('')
  const [subDone,  setSubDone]  = useState(false)

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) { setSubDone(true); setEmail('') }
  }

  return (
    <footer className="bg-black/70 border-t border-white/5 mt-24">
      {/* CTA banner */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-primary/10">
        <div className="container-main py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-extrabold text-xl">Начни путь к лучшей версии себя</h3>
            <p className="text-gray-400 text-sm mt-1">Открой базу упражнений, вики и калькуляторы прямо сейчас</p>
          </div>
          <Link
            to="/exercises"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-primary/30 flex-shrink-0"
          >
            Начать <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-main py-14">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">

          {/* Brand + newsletter (2 cols) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-black text-xl text-white mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              Sport<span className="text-primary">Life</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Твоя энциклопедия спорта, здоровья и активной жизни.
              Всё что нужно — в одном месте.
            </p>

            {/* Social */}
            <div className="flex gap-2 mb-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/5 hover:border-primary/30 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <p className="text-sm font-semibold text-white mb-2">Рассылка советов</p>
            {subDone ? (
              <p className="text-green-400 text-sm flex items-center gap-2">
                <Heart size={14} fill="currentColor" /> Подписка оформлена!
              </p>
            ) : (
              <form onSubmit={handleSub} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Твой email"
                  className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-xl text-sm font-bold transition-colors flex-shrink-0"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Links (4 cols) */}
          {FOOTER_LINKS.map(group => (
            <div key={group.title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-gray-500 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-main py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© 2026 SportLife Wiki. Все права защищены.</span>
          <span className="flex items-center gap-1">
            Сделано с <Heart size={10} className="text-primary" fill="currentColor" /> для спортсменов
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
