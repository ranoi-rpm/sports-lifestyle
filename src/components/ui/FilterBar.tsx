import clsx from 'clsx'
import { Search } from 'lucide-react'
import { Input } from './Input'

export interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterBarProps {
  search?:       string
  onSearch?:     (q: string) => void
  filters?:      { key: string; label: string; options: FilterOption[] }[]
  values?:       Record<string, string>
  onFilter?:     (key: string, value: string) => void
  placeholder?:  string
  className?:    string
}

export function FilterBar({ search, onSearch, filters, values, onFilter, placeholder, className }: FilterBarProps) {
  return (
    <div className={clsx('flex flex-wrap gap-3 items-center', className)}>
      {onSearch !== undefined && (
        <Input
          value={search ?? ''}
          onChange={e => onSearch(e.target.value)}
          placeholder={placeholder ?? 'Поиск...'}
          leftIcon={<Search size={16} />}
          className="w-64"
        />
      )}
      {filters?.map(f => (
        <select
          key={f.key}
          value={values?.[f.key] ?? ''}
          onChange={e => onFilter?.(f.key, e.target.value)}
          className="bg-surface border border-white/10 text-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary cursor-pointer"
        >
          <option value="">{f.label}</option>
          {f.options.map(o => (
            <option key={o.value} value={o.value} className="bg-dark-2">
              {o.label}{o.count !== undefined ? ` (${o.count})` : ''}
            </option>
          ))}
        </select>
      ))}
    </div>
  )
}

// Chip filters (like tags)
interface ChipFilterProps {
  options:   FilterOption[]
  value:     string
  onChange:  (v: string) => void
  className?: string
}

export function ChipFilter({ options, value, onChange, className }: ChipFilterProps) {
  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => onChange(o.value === value ? '' : o.value)}
          className={clsx(
            'px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150',
            o.value === value
              ? 'bg-primary text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white',
          )}
        >
          {o.label}
          {o.count !== undefined && <span className="ml-1 opacity-60 text-xs">{o.count}</span>}
        </button>
      ))}
    </div>
  )
}
