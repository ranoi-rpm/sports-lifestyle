import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search, Zap } from 'lucide-react'
import clsx from 'clsx'

const NAV_LINKS = [
  { to: '/exercises',   label: 'Упражнения' },
  { to: '/wiki',        label: 'Вики' },
  { to: '/calculators', label: 'Калькуляторы' },
  { to: '/nutrition',   label: 'Питание' },
  { to: '/videos',      label: 'Видео' },
  { to: '/health',      label: 'Здоровье' },
  { to: '/community',   label: 'Сообщество' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery]     = useState('')
  const navigate              = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/wiki?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5'
          : 'bg-transparent',
      )}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-black text-xl text-white">
            <Zap className="text-primary" size={24} fill="currentColor" />
            <span>Sport<span className="text-primary">Life</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to} to={to}
                className={({ isActive }) =>
                  clsx('px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors',
                    isActive ? 'text-primary bg-primary/10' : 'text-gray-300 hover:text-white hover:bg-white/5')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Поиск..."
                className="input-base pl-9 pr-4 py-2 text-sm w-44 focus:w-56 transition-all"
              />
            </div>
          </form>

          {/* Burger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="lg:hidden text-gray-300 hover:text-white p-2"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-dark-2 border-t border-white/5 py-4 px-6 flex flex-col gap-2">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to} to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                clsx('py-2.5 px-3 rounded-lg font-semibold transition-colors',
                  isActive ? 'text-primary bg-primary/10' : 'text-gray-300')
              }
            >
              {label}
            </NavLink>
          ))}
          <form onSubmit={handleSearch} className="mt-2">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск по сайту..."
              className="input-base w-full"
            />
          </form>
        </div>
      )}
    </header>
  )
}
