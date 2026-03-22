import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?:   boolean
  glow?:    boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({ hover, glow, padding = 'md', className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-surface rounded-2xl border border-white/5 transition-all duration-200',
        hover && 'cursor-pointer hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10',
        glow  && 'border-primary/30 shadow-lg shadow-primary/15',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('mb-4', className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx('text-white font-bold text-lg', className)} {...props}>{children}</h3>
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('text-gray-400', className)} {...props}>{children}</div>
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('mt-4 pt-4 border-t border-white/5', className)} {...props}>{children}</div>
}
