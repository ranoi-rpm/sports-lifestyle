import { useState } from 'react'
import clsx from 'clsx'

export interface Tab {
  id:      string
  label:   string
  icon?:   React.ReactNode
  count?:  number
}

interface TabsProps {
  tabs:       Tab[]
  active?:    string
  onChange?:  (id: string) => void
  children?:  React.ReactNode
  className?: string
  variant?:   'pills' | 'underline'
}

export function Tabs({ tabs, active, onChange, children, className, variant = 'pills' }: TabsProps) {
  const [internal, setInternal] = useState(tabs[0]?.id ?? '')
  const current  = active ?? internal
  const setTab   = (id: string) => { setInternal(id); onChange?.(id) }

  return (
    <div className={className}>
      <div className={clsx(
        'flex gap-1 overflow-x-auto no-scrollbar',
        variant === 'underline' ? 'border-b border-white/10 pb-0' : 'bg-surface p-1 rounded-xl w-fit',
      )}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={clsx(
              'flex items-center gap-1.5 whitespace-nowrap font-semibold transition-all duration-200',
              variant === 'pills'
                ? clsx('px-4 py-2 rounded-lg text-sm',
                    current === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-400 hover:text-white')
                : clsx('px-4 py-3 text-sm border-b-2 -mb-px',
                    current === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-400 hover:text-white'),
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={clsx('text-xs px-1.5 py-0.5 rounded-full',
                current === tab.id ? 'bg-white/20' : 'bg-white/10 text-gray-400',
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
}

export function TabPanel({ id, active, children }: { id: string; active: string; children: React.ReactNode }) {
  return id === active ? <>{children}</> : null
}
