import clsx from 'clsx'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  label?: string
}

const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10', xl: 'w-16 h-16' }

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <div className={clsx('flex flex-col items-center gap-3', className)}>
      <div
        className={clsx(
          'border-2 border-white/10 border-t-primary rounded-full animate-spin',
          sizes[size],
        )}
      />
      {label && <p className="text-gray-400 text-sm">{label}</p>}
    </div>
  )
}

export function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="xl" label="Загрузка..." />
    </div>
  )
}
