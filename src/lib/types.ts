export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "editor" | "viewer" | "subscriber" | "learner" | "learner-subscriber"
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
  permissions?: UserPermissions
  // Additional fields for enhanced user management
  phone?: string
  bio?: string
  location?: string
  website?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  preferences?: {
    emailNotifications: boolean
    pushNotifications: boolean
    newsletter: boolean
  }
  // Activity tracking
  totalLogins: number
  lastActivity?: Date
  // Subscription info for subscribers
  subscriptionTier?: "free" | "basic" | "premium" | "enterprise"
  subscriptionStatus?: "active" | "cancelled" | "expired" | "pending"
  subscriptionExpiry?: Date
  // Learning info for learners
  enrolledCourses?: string[]
  completedCourses?: string[]
  totalLearningHours?: number
  certificates?: string[]
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

export interface UserActivity {
  id: string
  userId: string
  type: "login" | "course_enrollment" | "course_completion" | "quiz_taken" | "streak_joined" | "message_sent" | "profile_updated" | "payment_made" | "subscription_changed" | "consultation_booked" | "mentorship_applied" | "article_read" | "preference_updated"
  description: string
  metadata?: Record<string, string | number | boolean>
  timestamp: Date
}

export interface UserStats {
  totalCoursesEnrolled: number
  totalCoursesCompleted: number
  totalQuizzesTaken: number
  totalStreaksJoined: number
  totalLearningHours: number
  averageQuizScore: number
  longestStreak: number
  currentStreak: number
  lastActivity: Date
}

// New comprehensive interfaces for user activities
export interface UserCourseEnrollment {
  id: string
  userId: string
  courseId: string
  courseName: string
  courseSlug: string
  enrolledAt: Date
  completedAt?: Date
  progress: number // 0-100
  lastAccessed?: Date
  certificateEarned?: boolean
  certificateId?: string
  totalTimeSpent: number // in minutes
  modulesCompleted: number
  totalModules: number
}

export interface UserStreakEnrollment {
  id: string
  userId: string
  streakId: string
  streakName: string
  streakSlug: string
  enrolledAt: Date
  currentStreak: number
  longestStreak: number
  totalCheckIns: number
  lastCheckIn?: Date
  isActive: boolean
  completedAt?: Date
}

export interface UserPayment {
  id: string
  userId: string
  amount: number
  currency: string
  description: string
  type: "subscription" | "course" | "consultation" | "mentorship" | "product"
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: string
  transactionId: string
  createdAt: Date
  metadata?: {
    courseId?: string
    courseName?: string
    subscriptionTier?: string
    consultationId?: string
    mentorshipId?: string
    productId?: string
  }
}

export interface UserSubscription {
  id: string
  userId: string
  tier: "free" | "basic" | "premium" | "enterprise"
  status: "active" | "cancelled" | "expired" | "pending"
  startDate: Date
  endDate?: Date
  autoRenew: boolean
  paymentMethod: string
  monthlyAmount: number
  currency: string
  features: string[]
  cancelledAt?: Date
  cancellationReason?: string
}

export interface UserConsultation {
  id: string
  userId: string
  consultantId: string
  consultantName: string
  type: "general" | "career" | "life" | "health" | "spiritual"
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  scheduledAt: Date
  duration: number // in minutes
  amount: number
  currency: string
  notes?: string
  feedback?: {
    rating: number
    comment: string
    submittedAt: Date
  }
  meetingLink?: string
  recordingUrl?: string
}

export interface UserMentorship {
  id: string
  userId: string
  mentorId: string
  mentorName: string
  programId: string
  programName: string
  status: "applied" | "accepted" | "in-progress" | "completed" | "cancelled"
  appliedAt: Date
  acceptedAt?: Date
  startDate?: Date
  endDate?: Date
  sessionsCompleted: number
  totalSessions: number
  amount: number
  currency: string
  goals?: string[]
  progress?: string
  feedback?: {
    rating: number
    comment: string
    submittedAt: Date
  }
}

export interface UserQuizResult {
  id: string
  userId: string
  quizId: string
  quizName: string
  quizSlug: string
  score: number
  maxScore: number
  percentage: number
  level: "beginner" | "intermediate" | "advanced" | "expert"
  completedAt: Date
  timeSpent: number // in minutes
  answers: Record<string, string>
  feedback: string
  recommendations: string[]
  certificateEarned?: boolean
  certificateId?: string
}

export interface UserReadingList {
  id: string
  userId: string
  articleId: string
  articleTitle: string
  articleSlug: string
  addedAt: Date
  readAt?: Date
  isBookmarked: boolean
  category: string
  tags: string[]
}

export interface UserPreference {
  id: string
  userId: string
  category: "notifications" | "privacy" | "learning" | "appearance" | "accessibility"
  key: string
  value: string | number | boolean
  updatedAt: Date
}

export interface UserPurchase {
  id: string
  userId: string
  productId: string
  productName: string
  productType: "course" | "ebook" | "workshop" | "tool" | "service"
  amount: number
  currency: string
  purchasedAt: Date
  status: "completed" | "pending" | "refunded"
  downloadUrl?: string
  accessExpiry?: Date
  refundedAt?: Date
  refundReason?: string
} 