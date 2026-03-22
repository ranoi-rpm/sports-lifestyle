import clsx from 'clsx'

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'purple'
type BadgeSize    = 'sm' | 'md' | 'lg'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?:    BadgeSize
  dot?:     boolean
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/10  text-gray-300',
  primary: 'bg-primary/15 text-primary',
  accent:  'bg-accent/15  text-accent',
  success: 'bg-green-500/15 text-green-400',
  warning: 'bg-yellow-500/15 text-yellow-400',
  danger:  'bg-red-500/15  text-red-400',
  purple:  'bg-purple-500/15 text-purple-400',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2   py-0.5 text-xs',
  md: 'px-2.5 py-1   text-xs',
  lg: 'px-3   py-1   text-sm',
}

export function Badge({ variant = 'default', size = 'md', dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        variants[variant], sizes[size], className,
      )}
      {...props}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', {
        'bg-primary':    variant === 'primary',
        'bg-accent':     variant === 'accent',
        'bg-green-400':  variant === 'success',
        'bg-yellow-400': variant === 'warning',
        'bg-red-400':    variant === 'danger',
        'bg-purple-400': variant === 'purple',
        'bg-gray-400':   variant === 'default',
      })} />
      }
      {children}
    </span>
  )
}

// Difficulty badge helper
const diffMap = {
  beginner:     { label: 'Новичок',      variant: 'success'  as BadgeVariant },
  intermediate: { label: 'Средний',      variant: 'warning'  as BadgeVariant },
  advanced:     { label: 'Продвинутый',  variant: 'danger'   as BadgeVariant },
}

export function DifficultyBadge({ level }: { level: keyof typeof diffMap }) {
  const { label, variant } = diffMap[level]
  return <Badge variant={variant} dot>{label}</Badge>
}
