import clsx from 'clsx'

interface SkeletonProps {
  className?: string
  rounded?:   'sm' | 'md' | 'lg' | 'full'
}

const rounds = { sm: 'rounded', md: 'rounded-lg', lg: 'rounded-xl', full: 'rounded-full' }

export function Skeleton({ className, rounded = 'md' }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'bg-white/5 animate-pulse',
        rounds[rounded],
        className,
      )}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-white/5 p-6 space-y-4">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16" rounded="full" />
        <Skeleton className="h-6 w-20" rounded="full" />
      </div>
    </div>
  )
}

export function ExerciseCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-white/5 p-6 space-y-3">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-32 w-full" rounded="lg" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-14" rounded="full" />
        <Skeleton className="h-6 w-18" rounded="full" />
      </div>
    </div>
  )
}
