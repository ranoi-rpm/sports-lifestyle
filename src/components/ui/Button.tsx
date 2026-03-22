import { forwardRef } from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  loading?:  boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  rounded?:  boolean
}

const variants: Record<Variant, string> = {
  primary:   'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 hover:shadow-primary/30',
  secondary: 'bg-surface-2 hover:bg-white/10 text-white border border-white/10',
  outline:   'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost:     'bg-transparent hover:bg-white/5 text-gray-300 hover:text-white',
  danger:    'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20',
}

const sizes: Record<Size, string> = {
  xs: 'px-2.5 py-1   text-xs  gap-1',
  sm: 'px-3.5 py-1.5 text-sm  gap-1.5',
  md: 'px-5   py-2.5 text-sm  gap-2',
  lg: 'px-7   py-3   text-base gap-2',
  xl: 'px-9   py-4   text-lg  gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { variant = 'primary', size = 'md', loading, leftIcon, rightIcon,
    fullWidth, rounded, children, className, disabled, ...props },
  ref
) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={clsx(
      'inline-flex items-center justify-center font-bold transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-dark',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
      rounded ? 'rounded-full' : 'rounded-xl',
      fullWidth && 'w-full',
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  >
    {loading ? <Loader2 size={16} className="animate-spin" /> : leftIcon}
    {children}
    {!loading && rightIcon}
  </button>
))
Button.displayName = 'Button'
