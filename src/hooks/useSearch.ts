import { useMemo } from 'react'

export function useSearch<T extends { name?: string; title?: string; tags: string[]; description?: string; summary?: string }>(
  items: T[],
  query: string,
): T[] {
  return useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(item => {
      const searchable = [
        item.name ?? '',
        item.title ?? '',
        item.description ?? '',
        item.summary ?? '',
        ...item.tags,
      ].join(' ').toLowerCase()
      return searchable.includes(q)
    })
  }, [items, query])
}
