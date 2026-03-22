// ─── Exercise ───────────────────────────────────────────────────────────────
export type MuscleGroup =
  | 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps'
  | 'forearms' | 'abs' | 'glutes' | 'quads' | 'hamstrings'
  | 'calves' | 'traps' | 'lats' | 'full-body'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ExerciseType = 'strength' | 'cardio' | 'flexibility' | 'hiit' | 'olympic'
export type Equipment = 'barbell' | 'dumbbell' | 'machine' | 'cables' | 'bodyweight' | 'kettlebell' | 'bands'

export interface Exercise {
  id: string
  slug: string
  name: string
  nameEn: string
  category: ExerciseType
  difficulty: Difficulty
  muscles: MuscleGroup[]
  musclesSecondary: MuscleGroup[]
  equipment: Equipment[]
  description: string
  technique: string[]
  tips: string[]
  mistakes: string[]
  videoYoutube?: string
  videoRutube?: string
  image?: string
  tags: string[]
  calories?: number
}

// ─── Wiki ────────────────────────────────────────────────────────────────────
export type WikiCategory =
  | 'anatomy' | 'training' | 'nutrition' | 'supplements'
  | 'recovery' | 'terminology' | 'programs' | 'health'

export interface WikiArticle {
  id: string
  slug: string
  title: string
  category: WikiCategory
  summary: string
  content: WikiSection[]
  tags: string[]
  relatedSlugs: string[]
  videoYoutube?: string
  videoRutube?: string
  updatedAt: string
}

export interface WikiSection {
  heading: string
  body: string
}

// ─── Nutrition ───────────────────────────────────────────────────────────────
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre-workout' | 'post-workout'
export type DietType = 'bulk' | 'cut' | 'maintain' | 'vegan' | 'keto'

export interface Recipe {
  id: string
  slug: string
  name: string
  mealType: MealType
  diet: DietType[]
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime: number
  ingredients: string[]
  steps: string[]
  tags: string[]
}

// ─── Video ───────────────────────────────────────────────────────────────────
export type VideoSource = 'youtube' | 'rutube'
export type VideoCategory = 'workout' | 'nutrition' | 'motivation' | 'technique' | 'health'

export interface Video {
  id: string
  title: string
  source: VideoSource
  videoId: string
  category: VideoCategory
  description: string
  tags: string[]
}

// ─── Community ───────────────────────────────────────────────────────────────
export interface Comment {
  id: string
  articleSlug: string
  author: string
  text: string
  likes: number
  createdAt: string
}

// ─── Search ──────────────────────────────────────────────────────────────────
export type SearchResultType = 'exercise' | 'wiki' | 'recipe' | 'video'

export interface SearchResult {
  type: SearchResultType
  slug: string
  title: string
  description: string
  category: string
}
