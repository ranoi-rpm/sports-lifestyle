import { forwardRef } from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:    string
  error?:    string
  hint?:     string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { label, error, hint, leftIcon, rightIcon, fullWidth, className, id, ...props }, ref
) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{leftIcon}</div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'bg-surface border text-white rounded-xl px-4 py-2.5 w-full',
            'placeholder:text-gray-500 focus:outline-none transition-colors duration-200',
            error ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-primary',
            leftIcon  && 'pl-10',
            rightIcon && 'pr-10',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{rightIcon}</div>
        )}
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {hint  && !error && <p className="text-gray-500 text-xs">{hint}</p>}
    </div>
  )
})
Input.displayName = 'Input'

// Textarea
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((
  { label, error, fullWidth, className, id, ...props }, ref
) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && <label htmlFor={inputId} className="text-sm font-semibold text-gray-300">{label}</label>}
      <textarea
        ref={ref}
        id={inputId}
        className={clsx(
          'bg-surface border text-white rounded-xl px-4 py-3 w-full resize-none',
          'placeholder:text-gray-500 focus:outline-none transition-colors duration-200',
          error ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-primary',
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
})
Textarea.displayName = 'Textarea'

// Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:   string
  error?:   string
  options:  { value: string; label: string }[]
  fullWidth?: boolean
}

export function Select({ label, error, options, fullWidth, className, id, ...props }: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && <label htmlFor={inputId} className="text-sm font-semibold text-gray-300">{label}</label>}
      <select
        id={inputId}
        className={clsx(
          'bg-surface border text-white rounded-xl px-4 py-2.5 w-full',
          'focus:outline-none transition-colors duration-200 cursor-pointer',
          error ? 'border-red-500/60 focus:border-red-500' : 'border-white/10 focus:border-primary',
          className,
        )}
        {...props}
      >
        {options.map(o => (
          <option key={o.value} value={o.value} className="bg-dark-2">{o.label}</option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}
