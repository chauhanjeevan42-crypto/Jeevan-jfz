export type Language = 'hi' | 'en';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  preferredLanguage: Language;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  trainingInterests: string;
  trainingGoals: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExerciseItem {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'running' | 'strength' | 'bodyweight' | 'mobility' | 'silat' | 'judo' | 'conditioning';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string;
  descriptionEn: string;
  descriptionHi: string;
  instructionsEn: string[];
  instructionsHi: string[];
  mistakesEn: string[];
  mistakesHi: string[];
  safetyNotesEn: string;
  safetyNotesHi: string;
  sets?: number;
  reps?: string;
  durationSec?: number;
  restSec?: number;
  videoUrl?: string;
  imageUrl?: string;
  isPublished: boolean;
  createdAt?: string;
}

export interface WorkoutSession {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category: 'hybrid' | 'fitness' | 'martial_arts' | 'running' | 'mobility';
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  exercises: {
    exerciseId: string;
    nameEn: string;
    nameHi: string;
    sets: number;
    reps: string;
    restSec: number;
    durationSec?: number;
  }[];
  isSample: boolean;
  isPublished: boolean;
  createdAt?: string;
}

export interface WorkoutLogEntry {
  id: string;
  userId: string;
  workoutTitle: string;
  category: string;
  durationMinutes: number;
  notes?: string;
  runningDistanceKm?: number;
  runningTimeMinutes?: number;
  personalRecords?: string;
  completedAt: string;
  createdAt?: string;
}

export interface TrainingProgramPlan {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category: 'hybrid' | 'fitness' | 'running' | 'silat' | 'judo' | 'mobility';
  level: 'beginner' | 'intermediate' | 'advanced';
  totalWeeks: number;
  isPublished: boolean;
  isSample: boolean;
  schedule: {
    week: number;
    focusEn: string;
    focusHi: string;
    days: {
      day: number;
      titleEn: string;
      titleHi: string;
      durationMinutes: number;
      restDay: boolean;
    }[];
  }[];
  createdAt?: string;
}

export interface VideoLessonItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category: 'silat' | 'judo' | 'hybrid' | 'strength' | 'conditioning' | 'mobility';
  level: DifficultyLevel;
  duration: string;
  instructor: string;
  youtubeUrl: string;
  videoThumbnail: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt?: string;
}

export interface LessonProgressItem {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  isFavorite: boolean;
  lastWatchedAt?: string;
  updatedAt?: string;
}

export interface AnnouncementItem {
  id: string;
  titleEn: string;
  titleHi: string;
  contentEn: string;
  contentHi: string;
  isPinned: boolean;
  date: string;
  createdAt?: string;
}

export interface AppSettingsData {
  email: string;
  phone: string;
  whatsapp: string;
  youtube: string;
  instagram: string;
  facebook: string;
  aboutBioEn: string;
  aboutBioHi: string;
  coachingPhilosophyEn: string;
  coachingPhilosophyHi: string;
  achievementsEn: string;
  achievementsHi: string;
  updatedAt?: string;
}
