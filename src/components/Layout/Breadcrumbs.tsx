import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import clsx from 'clsx'

const LABELS: Record<string, string> = {
  exercises:   'Упражнения',
  wiki:        'Вики',
  calculators: 'Калькуляторы',
  nutrition:   'Питание',
  videos:      'Видео',
  health:      'Здоровье',
  motivation:  'Мотивация',
  community:   'Сообщество',
}

interface BreadcrumbsProps {
  custom?: { label: string; to?: string }[]
  className?: string
}

export default function Breadcrumbs({ custom, className }: BreadcrumbsProps) {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = custom ?? [
    { label: 'Главная', to: '/' },
    ...segments.map((seg, i) => ({
      label: LABELS[seg] ?? decodeURIComponent(seg).replace(/-/g, ' '),
      to:    i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
    })),
  ]

  if (crumbs.length <= 1) return null

  return (
    <nav
      aria-label="Хлебные крошки"
      className={clsx('flex items-center gap-1 text-sm text-gray-500', className)}
    >
      <Link to="/" className="hover:text-primary transition-colors">
        <Home size={14} />
      </Link>
      {crumbs.slice(1).map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} className="text-gray-700" />
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-primary transition-colors capitalize">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-300 capitalize">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
