import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Comment } from '@/types'

interface AppStore {
  // Search
  searchQuery: string
  setSearchQuery: (q: string) => void

  // Favorites
  favorites: string[]
  toggleFavorite: (slug: string) => void
  isFavorite: (slug: string) => boolean

  // Comments
  comments: Comment[]
  addComment: (comment: Comment) => void
  likeComment: (id: string) => void
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      favorites: [],
      toggleFavorite: (slug) => set(s => ({
        favorites: s.favorites.includes(slug)
          ? s.favorites.filter(f => f !== slug)
          : [...s.favorites, slug]
      })),
      isFavorite: (slug) => get().favorites.includes(slug),

      comments: [],
      addComment: (comment) => set(s => ({ comments: [...s.comments, comment] })),
      likeComment: (id) => set(s => ({
        comments: s.comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c)
      })),
    }),
    { name: 'sportlife-storage' }
  )
)
