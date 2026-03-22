import clsx from 'clsx'

interface AvatarProps {
  name:       string
  src?:       string
  size?:      'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes  = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-2xl' }
const colors = ['bg-primary','bg-accent','bg-green-500','bg-purple-500','bg-yellow-500','bg-pink-500']

function colorFor(name: string) {
  return colors[name.charCodeAt(0) % colors.length]
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className={clsx(
      'rounded-full flex items-center justify-center font-bold text-white overflow-hidden flex-shrink-0',
      sizes[size],
      !src && colorFor(name),
      className,
    )}>
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : initials
      }
    </div>
  )
}
