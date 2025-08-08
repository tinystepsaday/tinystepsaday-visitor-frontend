import type {
  BlogPost,
  Course,
  MediaFile,
  User,
  Notification,
  AnalyticsData,
  Student,
  Category,
  Tag,
  UserActivity,
  UserStats,
  UserCourseEnrollment,
  UserStreakEnrollment,
  UserPayment,
  UserSubscription,
  UserConsultation,
  UserMentorship,
  UserQuizResult,
  UserReadingList,
  UserPurchase,
  UserPreference,
} from "@/lib/types"
import { blogPosts } from "./blogs"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "admin",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date("2024-02-25"),
    isActive: true,
    totalLogins: 156,
    lastActivity: new Date("2024-02-25"),
    phone: "+1 (555) 123-4567",
    bio: "System administrator with 5+ years of experience in educational technology.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    socialLinks: {
      twitter: "@johndoe",
      linkedin: "linkedin.com/in/johndoe"
    },
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      newsletter: false
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "editor",
    createdAt: new Date("2024-02-20"),
    lastLogin: new Date("2024-02-24"),
    isActive: true,
    totalLogins: 89,
    lastActivity: new Date("2024-02-24"),
    phone: "+1 (555) 234-5678",
    bio: "Content editor passionate about creating engaging educational materials.",
    location: "New York, NY",
    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      newsletter: true
    }
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "viewer",
    createdAt: new Date("2024-01-10"),
    lastLogin: new Date("2024-02-20"),
    isActive: false,
    totalLogins: 23,
    lastActivity: new Date("2024-02-20"),
    preferences: {
      emailNotifications: false,
      pushNotifications: false,
      newsletter: false
    }
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "subscriber",
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date("2024-02-23"),
    isActive: true,
    totalLogins: 67,
    lastActivity: new Date("2024-02-23"),
    subscriptionTier: "premium",
    subscriptionStatus: "active",
    subscriptionExpiry: new Date("2024-12-31"),
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      newsletter: true
    }
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "learner",
    createdAt: new Date("2024-01-25"),
    lastLogin: new Date("2024-02-25"),
    isActive: true,
    totalLogins: 45,
    lastActivity: new Date("2024-02-25"),
    enrolledCourses: ["course-1", "course-3"],
    completedCourses: ["course-2"],
    totalLearningHours: 28,
    certificates: ["mindfulness-basics"],
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      newsletter: false
    }
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "learner-subscriber",
    createdAt: new Date("2024-02-10"),
    lastLogin: new Date("2024-02-25"),
    isActive: true,
    totalLogins: 34,
    lastActivity: new Date("2024-02-25"),
    subscriptionTier: "basic",
    subscriptionStatus: "active",
    subscriptionExpiry: new Date("2024-11-30"),
    enrolledCourses: ["course-1", "course-2", "course-4"],
    completedCourses: ["course-1"],
    totalLearningHours: 42,
    certificates: ["mindfulness-basics", "stress-management"],
    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      newsletter: true
    }
  }
]

// Mock user activities
export const mockUserActivities: UserActivity[] = [
  {
    id: "1",
    userId: "5",
    type: "course_enrollment",
    description: "Enrolled in Mindfulness Basics course",
    metadata: { courseId: "course-1", courseName: "Mindfulness Basics" },
    timestamp: new Date("2024-02-20")
  },
  {
    id: "2",
    userId: "5",
    type: "course_completion",
    description: "Completed Stress Management course",
    metadata: { courseId: "course-2", courseName: "Stress Management", score: 85 },
    timestamp: new Date("2024-02-18")
  },
  {
    id: "3",
    userId: "5",
    type: "quiz_taken",
    description: "Took Mindfulness Assessment quiz",
    metadata: { quizId: "mindfulness", score: 78, maxScore: 100 },
    timestamp: new Date("2024-02-15")
  },
  {
    id: "4",
    userId: "6",
    type: "streak_joined",
    description: "Joined Daily Meditation streak",
    metadata: { streakId: "meditation", streakName: "Daily Meditation" },
    timestamp: new Date("2024-02-22")
  },
  {
    id: "5",
    userId: "6",
    type: "course_enrollment",
    description: "Enrolled in Advanced Mindfulness course",
    metadata: { courseId: "course-4", courseName: "Advanced Mindfulness" },
    timestamp: new Date("2024-02-21")
  }
]

// Mock user stats
export const mockUserStats: Record<string, UserStats> = {
  "5": {
    totalCoursesEnrolled: 2,
    totalCoursesCompleted: 1,
    totalQuizzesTaken: 3,
    totalStreaksJoined: 0,
    totalLearningHours: 28,
    averageQuizScore: 78,
    longestStreak: 0,
    currentStreak: 0,
    lastActivity: new Date("2024-02-25")
  },
  "6": {
    totalCoursesEnrolled: 3,
    totalCoursesCompleted: 1,
    totalQuizzesTaken: 5,
    totalStreaksJoined: 1,
    totalLearningHours: 42,
    averageQuizScore: 82,
    longestStreak: 7,
    currentStreak: 3,
    lastActivity: new Date("2024-02-25")
  }
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "Articles about web development technologies and practices",
    color: "#3B82F6",
    postCount: 15,
    courseCount: 5,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Mobile app development tutorials and guides",
    color: "#10B981",
    postCount: 8,
    courseCount: 3,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "3",
    name: "Data Science",
    slug: "data-science",
    description: "Data science, machine learning, and AI content",
    color: "#8B5CF6",
    postCount: 12,
    courseCount: 4,
    createdAt: new Date("2024-01-10"),
  },
]

export const mockTags: Tag[] = [
  {
    id: "1",
    name: "React",
    slug: "react",
    color: "#61DAFB",
    postCount: 25,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "TypeScript",
    slug: "typescript",
    color: "#3178C6",
    postCount: 18,
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Next.js",
    slug: "nextjs",
    color: "#000000",
    postCount: 12,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    name: "JavaScript",
    slug: "javascript",
    color: "#F7DF1E",
    postCount: 30,
    createdAt: new Date("2024-01-04"),
  },
]

export const mockStudents: Student[] = [
  {
    id: "1",
    user: mockUsers[2],
    enrolledCourses: [],
    totalCoursesCompleted: 3,
    totalHoursLearned: 45,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    user: {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "viewer",
      createdAt: new Date("2024-02-01"),
      isActive: true,
      totalLogins: 67, // Add missing required field
    },
    enrolledCourses: [],
    totalCoursesCompleted: 1,
    totalHoursLearned: 20,
    createdAt: new Date("2024-02-01"),
  },
]

// Convert blogPosts from blogs.ts to match the BlogPost interface
export const mockBlogPosts: BlogPost[] = (blogPosts || []).map((post) => {
  // Parse the date string properly
  const parseDate = (dateStr: string) => {
    try {
      // Handle formats like "April 15, 2025"
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        // Fallback to current date if parsing fails
        return new Date()
      }
      return date
    } catch {
      return new Date()
    }
  }

  return {
    id: post.id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    thumbnail: post.image,
    status: "published" as const, // Default to published since blogs.ts doesn't have status
    author: {
      id: "1", // Default author ID
      name: post.author.name,
      email: "author@example.com",
      avatar: post.author.avatar,
      role: "editor" as const,
      createdAt: new Date("2024-01-01"),
      isActive: true,
      totalLogins: 0, // Add missing required field
    },
    category: post.category,
    tags: post.tags,
    createdAt: parseDate(post.date),
    updatedAt: parseDate(post.date),
    publishedAt: parseDate(post.date),
    seo: {
      metaTitle: post.title,
      metaDescription: post.excerpt,
      altText: post.title,
      caption: post.excerpt,
    },
  }
})

// Fallback blog posts in case the import fails
const fallbackBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Finding Inner Peace in a Chaotic World",
    slug: "finding-inner-peace",
    content: "<p>In today's fast-paced world, finding inner peace can feel like an impossible task...</p>",
    excerpt: "Discover practical methods to maintain calm and balance in today's fast-paced environment.",
    thumbnail: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    status: "published",
    author: {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "editor",
      createdAt: new Date("2024-01-01"),
      isActive: true,
      totalLogins: 0, // Add missing required field
    },
    category: "Mindfulness",
    tags: ["mindfulness", "inner peace", "stress management"],
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-15"),
    publishedAt: new Date("2024-04-15"),
    seo: {
      metaTitle: "Finding Inner Peace in a Chaotic World",
      metaDescription: "Discover practical methods to maintain calm and balance in today's fast-paced environment.",
      altText: "Finding Inner Peace in a Chaotic World",
      caption: "Discover practical methods to maintain calm and balance in today's fast-paced environment.",
    },
  },
  {
    id: "2",
    title: "5 Mindful Meditation Techniques for Beginners",
    slug: "mindful-meditation-techniques",
    content: "<p>Meditation is one of the most powerful tools we have for cultivating mindfulness...</p>",
    excerpt: "Start your meditation journey with these simple yet powerful techniques anyone can master.",
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    status: "published",
    author: {
      id: "2",
      name: "Michael Chen",
      email: "michael@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "editor",
      createdAt: new Date("2024-01-01"),
      isActive: true,
      totalLogins: 0, // Add missing required field
    },
    category: "Meditation",
    tags: ["meditation", "mindfulness", "beginners"],
    createdAt: new Date("2024-04-10"),
    updatedAt: new Date("2024-04-10"),
    publishedAt: new Date("2024-04-10"),
    seo: {
      metaTitle: "5 Mindful Meditation Techniques for Beginners",
      metaDescription: "Start your meditation journey with these simple yet powerful techniques anyone can master.",
      altText: "5 Mindful Meditation Techniques for Beginners",
      caption: "Start your meditation journey with these simple yet powerful techniques anyone can master.",
    },
  },
]

// Use fallback if the main import is empty
export const finalMockBlogPosts: BlogPost[] = mockBlogPosts.length > 0 ? mockBlogPosts : fallbackBlogPosts

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Course",
    slug: "complete-react-course",
    description: "Master React from beginner to advanced",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 99.99,
    status: "published",
    instructor: mockUsers[0],
    category: "Web Development",
    duration: 1200, // 20 hours
    modules: [],
    quizzes: [],
    notes: [],
    tasks: [],
    students: [],
    seo: {
      metaTitle: "Complete React Course - Learn React from Scratch",
      metaDescription: "Master React development with this comprehensive course",
      altText: "React course thumbnail",
      caption: "Complete React development course",
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
]

export const mockMediaFiles: MediaFile[] = [
  {
    id: "1",
    filename: "hero-image.jpg",
    originalName: "hero-image.jpg",
    url: "/placeholder.svg?height=400&width=800",
    type: "IMAGE",
    mimeType: "image/jpeg",
    size: 1024000,
    alt: "Hero image for homepage",
    caption: "Beautiful landscape image",
    isPublic: true,
    tags: ["hero", "landscape"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    filename: "product-video.mp4",
    originalName: "product-video.mp4",
    url: "/placeholder.svg?height=300&width=400",
    type: "VIDEO",
    mimeType: "video/mp4",
    size: 5242880,
    alt: "Product demonstration video",
    caption: "How to use our product",
    isPublic: true,
    tags: ["product", "demo"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    filename: "document.pdf",
    originalName: "document.pdf",
    url: "/placeholder.svg?height=200&width=150",
    type: "DOCUMENT",
    mimeType: "application/pdf",
    size: 2048000,
    alt: "Product documentation",
    caption: "Complete user manual",
    isPublic: true,
    tags: ["documentation", "manual"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    filename: "background.jpg",
    originalName: "background.jpg",
    url: "/placeholder.svg?height=600&width=1200",
    type: "IMAGE",
    mimeType: "image/jpeg",
    size: 3072000,
    alt: "Background image",
    caption: "Abstract background pattern",
    isPublic: true,
    tags: ["background", "pattern"],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    filename: "audio-track.mp3",
    originalName: "audio-track.mp3",
    url: "/placeholder.svg?height=100&width=300",
    type: "AUDIO",
    mimeType: "audio/mpeg",
    size: 5120000,
    alt: "Background music",
    caption: "Ambient background music",
    isPublic: true,
    tags: ["audio", "music"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Comment",
    message: "Someone commented on your blog post",
    type: "info",
    read: false,
    createdAt: new Date("2024-02-25"),
    userId: "1",
    actionUrl: "/management/blog/1",
  },
  {
    id: "2",
    title: "Course Published",
    message: "Your course has been successfully published",
    type: "success",
    read: true,
    createdAt: new Date("2024-02-24"),
    userId: "1",
    actionUrl: "/management/courses/1",
  },
]

export const mockAnalytics: AnalyticsData = {
  totalRevenue: 15420.50,
  totalOrders: 234,
  totalCustomers: 189,
  conversionRate: 3.2,
  pageViews: 45678,
  uniqueVisitors: 12345,
  bounceRate: 45.2,
  avgSessionDuration: 180,
  topPages: [
    { page: "/", views: 1234 },
    { page: "/courses", views: 987 },
    { page: "/blog", views: 756 },
  ],
  trafficSources: [
    { source: "Organic Search", visitors: 5678 },
    { source: "Direct", visitors: 3456 },
    { source: "Social Media", visitors: 2345 },
  ],
} 

// Enhanced mock data with comprehensive user activities
export const mockUserCourseEnrollments: UserCourseEnrollment[] = [
  {
    id: "enrollment-1",
    userId: "5",
    courseId: "course-1",
    courseName: "Mindfulness Basics",
    courseSlug: "mindfulness-basics",
    enrolledAt: new Date("2024-02-20"),
    progress: 75,
    lastAccessed: new Date("2024-02-25"),
    totalTimeSpent: 420,
    modulesCompleted: 3,
    totalModules: 4
  },
  {
    id: "enrollment-2",
    userId: "5",
    courseId: "course-2",
    courseName: "Stress Management",
    courseSlug: "stress-management",
    enrolledAt: new Date("2024-01-15"),
    completedAt: new Date("2024-02-18"),
    progress: 100,
    certificateEarned: true,
    certificateId: "cert-001",
    totalTimeSpent: 600,
    modulesCompleted: 5,
    totalModules: 5
  },
  {
    id: "enrollment-3",
    userId: "6",
    courseId: "course-1",
    courseName: "Mindfulness Basics",
    courseSlug: "mindfulness-basics",
    enrolledAt: new Date("2024-02-10"),
    completedAt: new Date("2024-02-20"),
    progress: 100,
    certificateEarned: true,
    certificateId: "cert-002",
    totalTimeSpent: 480,
    modulesCompleted: 4,
    totalModules: 4
  },
  {
    id: "enrollment-4",
    userId: "6",
    courseId: "course-4",
    courseName: "Advanced Mindfulness",
    courseSlug: "advanced-mindfulness",
    enrolledAt: new Date("2024-02-21"),
    progress: 25,
    lastAccessed: new Date("2024-02-25"),
    totalTimeSpent: 120,
    modulesCompleted: 1,
    totalModules: 6
  }
]

export const mockUserStreakEnrollments: UserStreakEnrollment[] = [
  {
    id: "streak-1",
    userId: "6",
    streakId: "meditation",
    streakName: "Daily Meditation",
    streakSlug: "daily-meditation",
    enrolledAt: new Date("2024-02-22"),
    currentStreak: 3,
    longestStreak: 7,
    totalCheckIns: 3,
    lastCheckIn: new Date("2024-02-25"),
    isActive: true
  },
  {
    id: "streak-2",
    userId: "5",
    streakId: "gratitude",
    streakName: "Gratitude Journal",
    streakSlug: "gratitude-journal",
    enrolledAt: new Date("2024-01-20"),
    currentStreak: 0,
    longestStreak: 5,
    totalCheckIns: 8,
    lastCheckIn: new Date("2024-02-15"),
    isActive: false
  }
]

export const mockUserPayments: UserPayment[] = [
  {
    id: "payment-1",
    userId: "4",
    amount: 29.99,
    currency: "USD",
    description: "Premium Subscription - Monthly",
    type: "subscription",
    status: "completed",
    paymentMethod: "Credit Card",
    transactionId: "txn_001",
    createdAt: new Date("2024-02-01"),
    metadata: { subscriptionTier: "premium" }
  },
  {
    id: "payment-2",
    userId: "5",
    amount: 49.99,
    currency: "USD",
    description: "Mindfulness Basics Course",
    type: "course",
    status: "completed",
    paymentMethod: "PayPal",
    transactionId: "txn_002",
    createdAt: new Date("2024-02-20"),
    metadata: { courseId: "course-1", courseName: "Mindfulness Basics" }
  },
  {
    id: "payment-3",
    userId: "6",
    amount: 99.99,
    currency: "USD",
    description: "Career Mentorship Program",
    type: "mentorship",
    status: "completed",
    paymentMethod: "Credit Card",
    transactionId: "txn_003",
    createdAt: new Date("2024-02-15"),
    metadata: { mentorshipId: "mentor-1" }
  }
]

export const mockUserSubscriptions: UserSubscription[] = [
  {
    id: "sub-1",
    userId: "4",
    tier: "premium",
    status: "active",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-12-31"),
    autoRenew: true,
    paymentMethod: "Credit Card",
    monthlyAmount: 29.99,
    currency: "USD",
    features: ["Unlimited courses", "Priority support", "Exclusive content", "Live sessions"]
  },
  {
    id: "sub-2",
    userId: "6",
    tier: "basic",
    status: "active",
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-11-30"),
    autoRenew: true,
    paymentMethod: "Credit Card",
    monthlyAmount: 9.99,
    currency: "USD",
    features: ["Limited courses", "Email support", "Basic content"]
  }
]

export const mockUserConsultations: UserConsultation[] = [
  {
    id: "consultation-1",
    userId: "5",
    consultantId: "consultant-1",
    consultantName: "Dr. Sarah Johnson",
    type: "career",
    status: "completed",
    scheduledAt: new Date("2024-02-15T10:00:00Z"),
    duration: 60,
    amount: 150,
    currency: "USD",
    notes: "Career transition discussion",
    feedback: {
      rating: 5,
      comment: "Excellent session, very helpful insights",
      submittedAt: new Date("2024-02-15T11:30:00Z")
    },
    meetingLink: "https://meet.google.com/abc-defg-hij",
    recordingUrl: "https://recordings.example.com/consultation-1"
  },
  {
    id: "consultation-2",
    userId: "6",
    consultantId: "consultant-2",
    consultantName: "Michael Chen",
    type: "life",
    status: "scheduled",
    scheduledAt: new Date("2024-03-05T14:00:00Z"),
    duration: 45,
    amount: 120,
    currency: "USD",
    notes: "Life balance and stress management"
  }
]

export const mockUserMentorships: UserMentorship[] = [
  {
    id: "mentorship-1",
    userId: "6",
    mentorId: "mentor-1",
    mentorName: "Emily Rodriguez",
    programId: "program-1",
    programName: "Career Transition Program",
    status: "in-progress",
    appliedAt: new Date("2024-02-10"),
    acceptedAt: new Date("2024-02-12"),
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-05-15"),
    sessionsCompleted: 2,
    totalSessions: 12,
    amount: 999.99,
    currency: "USD",
    goals: ["Career transition", "Skill development", "Network building"],
    progress: "Making good progress on career transition goals"
  }
]

export const mockUserQuizResults: UserQuizResult[] = [
  {
    id: "quiz-result-1",
    userId: "5",
    quizId: "mindfulness",
    quizName: "Mindfulness Assessment",
    quizSlug: "mindfulness-assessment",
    score: 78,
    maxScore: 100,
    percentage: 78,
    level: "intermediate",
    completedAt: new Date("2024-02-15"),
    timeSpent: 15,
    answers: {
      "q1": "q1-b",
      "q2": "q2-b",
      "q3": "q3-b"
    },
    feedback: "Good! You have a developing mindfulness practice.",
    recommendations: [
      "Continue your daily practice",
      "Explore advanced meditation techniques",
      "Share your wisdom with others"
    ]
  },
  {
    id: "quiz-result-2",
    userId: "6",
    quizId: "stress",
    quizName: "Stress Level Assessment",
    quizSlug: "stress-level-assessment",
    score: 65,
    maxScore: 80,
    percentage: 81,
    level: "advanced",
    completedAt: new Date("2024-02-20"),
    timeSpent: 12,
    answers: {
      "q1": "q1-c",
      "q2": "q2-a",
      "q3": "q3-b"
    },
    feedback: "Excellent! You have good stress management skills.",
    recommendations: [
      "Maintain your current practices",
      "Consider teaching others",
      "Explore advanced techniques"
    ],
    certificateEarned: true,
    certificateId: "cert-003"
  }
]

export const mockUserReadingList: UserReadingList[] = [
  {
    id: "reading-1",
    userId: "5",
    articleId: "article-1",
    articleTitle: "10 Ways to Practice Mindfulness Daily",
    articleSlug: "10-ways-to-practice-mindfulness-daily",
    addedAt: new Date("2024-02-20"),
    readAt: new Date("2024-02-21"),
    isBookmarked: true,
    category: "Mindfulness",
    tags: ["mindfulness", "daily-practice", "wellness"]
  },
  {
    id: "reading-2",
    userId: "5",
    articleId: "article-2",
    articleTitle: "The Science of Stress Management",
    articleSlug: "science-of-stress-management",
    addedAt: new Date("2024-02-18"),
    isBookmarked: false,
    category: "Stress Management",
    tags: ["stress", "science", "management"]
  },
  {
    id: "reading-3",
    userId: "6",
    articleId: "article-3",
    articleTitle: "Career Transition Strategies",
    articleSlug: "career-transition-strategies",
    addedAt: new Date("2024-02-15"),
    readAt: new Date("2024-02-16"),
    isBookmarked: true,
    category: "Career",
    tags: ["career", "transition", "strategy"]
  }
]

export const mockUserPurchases: UserPurchase[] = [
  {
    id: "purchase-1",
    userId: "5",
    productId: "ebook-1",
    productName: "Mindfulness Workbook",
    productType: "ebook",
    amount: 19.99,
    currency: "USD",
    purchasedAt: new Date("2024-02-10"),
    status: "completed",
    downloadUrl: "https://downloads.example.com/mindfulness-workbook.pdf",
    accessExpiry: new Date("2025-02-10")
  },
  {
    id: "purchase-2",
    userId: "6",
    productId: "workshop-1",
    productName: "Stress Management Workshop",
    productType: "workshop",
    amount: 79.99,
    currency: "USD",
    purchasedAt: new Date("2024-02-05"),
    status: "completed",
    accessExpiry: new Date("2024-05-05")
  }
]

export const mockUserPreferences: UserPreference[] = [
  {
    id: "pref-1",
    userId: "5",
    category: "notifications",
    key: "emailNotifications",
    value: true,
    updatedAt: new Date("2024-02-20")
  },
  {
    id: "pref-2",
    userId: "5",
    category: "notifications",
    key: "pushNotifications",
    value: true,
    updatedAt: new Date("2024-02-20")
  },
  {
    id: "pref-3",
    userId: "5",
    category: "notifications",
    key: "newsletter",
    value: false,
    updatedAt: new Date("2024-02-20")
  },
  {
    id: "pref-4",
    userId: "6",
    category: "learning",
    key: "autoEnroll",
    value: true,
    updatedAt: new Date("2024-02-15")
  },
  {
    id: "pref-5",
    userId: "6",
    category: "appearance",
    key: "theme",
    value: "dark",
    updatedAt: new Date("2024-02-15")
  }
] 