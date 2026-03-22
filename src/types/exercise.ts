export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'abs'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves'
  | 'traps'
  | 'lats'
  | 'cardio'
  | 'hip flexors';

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'cable'
  | 'machine'
  | 'bodyweight'
  | 'kettlebell'
  | 'bands'
  | 'smith'
  | 'ez-bar';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseCategory =
  | 'compound'
  | 'isolation'
  | 'cardio'
  | 'stretching'
  | 'plyometric';

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  category: ExerciseCategory;
  description: string;
  technique: string[];
  tips: string[];
  commonMistakes: string[];
  sets?: string;
  reps?: string;
  youtubeId?: string;
  rutubId?: string;
  calories?: number;
  tags: string[];
}
