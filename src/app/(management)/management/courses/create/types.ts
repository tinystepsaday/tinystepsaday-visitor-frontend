export interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: number
  title: string
  type: "video" | "exercise" | "pdf" | "certificate" | "quiz" | "note"
  duration: string
  content?: string
  videoUrl?: string
  quizId?: string
  noteId?: string
}

export interface Note {
  id: string
  title: string
  content: string
  moduleId?: string
  lessonId?: string
}

export interface Task {
  id: string
  title: string
  description: string
  instructions: string
  dueDate?: Date
  moduleId?: string
}

export interface Instructor {
  id: number
  name: string
  title: string
  bio: string
  avatar: string
  rating: number
  students: number
  courses: number
}

export interface FAQ {
  id: number
  question: string
  answer: string
}

export interface CourseFormData {
  title: string
  slug: string
  description: string
  fullDescription?: string
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  duration: string
  thumbnail?: string
  price: number
  sale?: boolean
  salePrice?: number
  status: "draft" | "published" | "archived"
  category: string
  featured?: boolean
  popular?: boolean
  certification?: boolean
  requirements?: string[]
  instructor: Instructor
  seo?: {
    metaTitle?: string
    metaDescription?: string
    altText?: string
    caption?: string
  }
}

export interface CourseCreationState {
  thumbnail: string
  modules: Module[]
  quizzes: import("@/lib/types").Quiz[]
  notes: Note[]
  tasks: Task[]
  activeTab: string
  selectedQuiz: import("@/lib/types").Quiz | null
  isQuizBuilderOpen: boolean
  isLoading: boolean
  faqs: FAQ[]
  requirements: string[]
  instructor: Instructor
  fullDescription: string
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  duration: string
  featured: boolean
  popular: boolean
  certification: boolean
  sale: boolean
  salePrice?: number
} 