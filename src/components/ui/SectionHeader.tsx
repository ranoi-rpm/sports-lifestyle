import clsx from 'clsx'

interface SectionHeaderProps {
  title:       string
  highlight?:  string
  subtitle?:   string
  centered?:   boolean
  className?:  string
  action?:     React.ReactNode
}

export function SectionHeader({ title, highlight, subtitle, centered, className, action }: SectionHeaderProps) {
  const parts = highlight ? title.split(highlight) : [title]
  return (
    <div className={clsx('mb-10', centered && 'text-center', className)}>
      <div className={clsx('flex items-start gap-4', centered && 'justify-center')}>
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {parts[0]}
            {highlight && <span className="text-primary">{highlight}</span>}
            {parts[1]}
          </h2>
          {subtitle && <p className="text-gray-400 text-lg mt-2">{subtitle}</p>}
        </div>
        {action && <div className="ml-auto flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}
