// Question types for better type safety
export type QuestionType = "multiple-choice" | "matching" | "true-false" | "fill-in-blank" | "essay"

export interface Question {
  id: string
  type: QuestionType
  question: string
  options: string[]
  correctAnswers: string[]
  explanations: string[]
}

// Exercise difficulty levels
export type ExerciseLevel = "Beginner" | "Intermediate" | "Advanced"

// Exercise categories
export type ExerciseCategory = "Science" | "Environment" | "Education" | "Technology" | "Health" | "History"

export interface Exercise {
  id: string
  title: string
  image: string
  passage: string
  questions: Question[]
  category?: ExerciseCategory
  level?: ExerciseLevel
  duration?: number // in minutes
  description?: string
  completed?: boolean
  score?: number | null
  createdAt?: Date
  updatedAt?: Date
}

// Position interface for better reusability
export interface Position {
  x: number
  y: number
}

export interface VocabularyPopup {
  word: string
  position: Position
  visible: boolean
}

export interface Highlight {
  id: string
  text: string
  note?: string
}

// Word types for better categorization
export type WordType = "noun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "pronoun" | "unknown"

// Vocabulary data structure
export interface VocabularyData {
  pronunciation: string
  meaning: string
  type: WordType
  example: string
  vietnamese: string
}

export interface VocabularyWord {
  word: string
  meaning: string
  pronunciation: string
  example: string
  type: WordType
  saved?: boolean
  liked?: boolean
  vietnamese?: string
  createdAt?: Date
  lastReviewed?: Date
  reviewCount?: number
}

// User progress and statistics
export interface UserProgress {
  exerciseId: string | number
  completed: boolean
  score?: number
  timeSpent?: number // in seconds
  completedAt?: Date
  attempts?: number
}

// Chat message types
export type ChatRole = "user" | "ai" | "system"

export interface ChatMessage {
  role: ChatRole
  message: string
  timestamp?: Date
}

// Settings types
export type FontSize = "S" | "M" | "L"

export interface ReadingSettings {
  eyeProtection: boolean
  fontSize: FontSize
  highlightMode: boolean
  vocabularyMode: boolean
}

// Feedback types
export interface Feedback {
  id: string
  type: "dislike" | "suggestion" | "bug"
  message: string
  submittedAt: Date
  resolved?: boolean
}