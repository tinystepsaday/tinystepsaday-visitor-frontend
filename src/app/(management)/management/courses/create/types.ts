export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
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

export interface CourseFormData {
  title: string
  slug: string
  description: string
  thumbnail?: string
  price: number
  status: "draft" | "published" | "archived"
  category: string
  duration: number
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
} 