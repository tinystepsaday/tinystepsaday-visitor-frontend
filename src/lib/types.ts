export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "editor" | "viewer"
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
  permissions?: UserPermissions
}

export interface UserPermissions {
  canCreatePosts: boolean
  canEditPosts: boolean
  canDeletePosts: boolean
  canManageCourses: boolean
  canManageUsers: boolean
  canManageSettings: boolean
  canViewAnalytics: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  thumbnail?: string
  status: "draft" | "published" | "archived"
  author: User
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  seo: {
    metaTitle: string
    metaDescription: string
    altText: string
    caption: string
  }
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnail?: string
  price: number
  status: "draft" | "published" | "archived"
  category: string
  instructor: User
  duration: number
  createdAt: Date
  updatedAt: Date
  modules: Module[]
  quizzes: Quiz[]
  notes: Note[]
  tasks: Task[]
  students: User[]
  seo: {
    metaTitle: string
    metaDescription: string
    altText: string
    caption: string
  }
}

export interface Module {
  id: string
  title: string
  description: string
  order: number
  courseId: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
  order: number
  moduleId: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  instructions: string
  questions: QuizQuestion[]
  settings: QuizSettings
  courseId: string
  createdAt: Date
  updatedAt: Date
}

export interface QuizQuestion {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer" | "essay" | "fill-blank" | "matching"
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
  imageUrl?: string
  order: number
}

export interface QuizSettings {
  passingScore: number
  maxAttempts: number
  timeLimit?: number
  shuffleQuestions: boolean
  shuffleAnswers: boolean
  showCorrectAnswers: boolean
  showScoreImmediately: boolean
  allowReview: boolean
  requirePassword: boolean
  password?: string
  showOneQuestionAtTime: boolean
  preventBacktracking: boolean
  availableFrom?: Date
  availableUntil?: Date
}

export interface Note {
  id: string
  title: string
  content: string
  courseId: string
  moduleId?: string
  lessonId?: string
}

export interface Task {
  id: string
  title: string
  description: string
  instructions: string
  dueDate?: Date
  courseId: string
  moduleId?: string
}

export interface MediaFile {
  id: string
  name: string
  url: string
  type: string
  size: number
  alt?: string
  caption?: string
  createdAt: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
  userId: string
  actionUrl?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  postCount: number
  courseCount: number
  createdAt: Date
}

export interface Tag {
  id: string
  name: string
  slug: string
  color: string
  postCount: number
  createdAt: Date
}

export interface Student {
  id: string
  user: User
  enrolledCourses: Course[]
  totalCoursesCompleted: number
  totalHoursLearned: number
  createdAt: Date
}

export interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  conversionRate: number
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  trafficSources: Array<{ source: string; visitors: number }>
}

export interface SearchResults {
  posts: BlogPost[]
  courses: Course[]
  media: MediaFile[]
} 