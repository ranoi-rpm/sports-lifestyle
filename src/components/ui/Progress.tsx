import clsx from 'clsx'

interface ProgressProps {
  value:      number  // 0-100
  max?:       number
  label?:     string
  showValue?: boolean
  color?:     'primary' | 'accent' | 'success' | 'warning' | 'danger'
  size?:      'sm' | 'md' | 'lg'
  animated?:  boolean
  className?: string
}

const colors = {
  primary: 'bg-primary',
  accent:  'bg-accent',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger:  'bg-red-500',
}

const sizes = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

export function Progress({
  value, max = 100, label, showValue, color = 'primary',
  size = 'md', animated, className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label    && <span className="text-sm text-gray-400 font-medium">{label}</span>}
          {showValue && <span className="text-sm font-bold text-white">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-white/10 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={clsx('h-full rounded-full transition-all duration-700', colors[color], animated && 'animate-pulse')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
