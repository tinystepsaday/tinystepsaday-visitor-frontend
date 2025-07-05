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
  },
]

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
    name: "hero-image.jpg",
    url: "/placeholder.svg?height=400&width=800",
    type: "image",
    size: 1024000,
    alt: "Hero image for homepage",
    caption: "Beautiful landscape image",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "course-thumbnail.png",
    url: "/placeholder.svg?height=200&width=300",
    type: "image",
    size: 512000,
    alt: "Course thumbnail",
    caption: "Course preview image",
    createdAt: new Date("2024-01-05"),
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