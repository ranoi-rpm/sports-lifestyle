import { Link } from 'react-router-dom'
import { Zap, Instagram, Youtube, MessageCircle } from 'lucide-react'

const LINKS = {
  'Контент': [
    { to: '/exercises',   label: 'Упражнения' },
    { to: '/wiki',        label: 'Вики' },
    { to: '/nutrition',   label: 'Питание' },
    { to: '/videos',      label: 'Видео' },
  ],
  'Инструменты': [
    { to: '/calculators', label: 'Калькуляторы' },
    { to: '/health',      label: 'Здоровье' },
    { to: '/motivation',  label: 'Мотивация' },
    { to: '/community',   label: 'Сообщество' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-black/60 border-t border-white/5 mt-20">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-black text-xl text-white mb-3">
              <Zap className="text-primary" size={22} fill="currentColor" />
              <span>Sport<span className="text-primary">Life</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Твоя энциклопедия спорта, здоровья и активной жизни. Всё что нужно — в одном месте.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Youtube size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">{group}</h4>
              <ul className="space-y-2">
                {items.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-500 hover:text-primary text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Рассылка</h4>
            <p className="text-gray-500 text-sm mb-3">Получай лучшие советы каждую неделю</p>
            <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Email" className="input-base text-sm" />
              <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                Подписаться
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-gray-600 text-xs">
          <span>© 2026 SportLife Wiki. Все права защищены.</span>
          <span>Сделано с ❤️ для спортсменов</span>
        </div>
      </div>
    </footer>
  )
}
