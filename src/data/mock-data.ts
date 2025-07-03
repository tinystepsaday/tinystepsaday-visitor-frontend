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

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Learn the basics of React development",
    status: "published",
    author: mockUsers[0],
    tags: ["react", "javascript", "tutorial"],
    category: "web-development",
    seo: {
      metaTitle: "Getting Started with React - Complete Guide",
      metaDescription: "Learn React from scratch with this comprehensive guide",
      altText: "React tutorial illustration",
      caption: "React development workflow",
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
    publishedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    slug: "advanced-typescript-patterns",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Explore advanced TypeScript patterns and techniques",
    status: "draft",
    author: mockUsers[1],
    tags: ["typescript", "patterns", "advanced"],
    category: "web-development",
    seo: {
      metaTitle: "Advanced TypeScript Patterns",
      metaDescription: "Master advanced TypeScript patterns",
      altText: "TypeScript code example",
      caption: "Advanced TypeScript patterns",
    },
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-05"),
  },
]

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
      metaTitle: "Complete React Course - Learn React Development",
      metaDescription: "Master React with hands-on projects and real-world examples",
      altText: "React course thumbnail",
      caption: "Complete React development course",
    },
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-20"),
  },
]

export const mockMediaFiles: MediaFile[] = [
  {
    id: "1",
    name: "hero-image.jpg",
    url: "/placeholder.svg?height=400&width=800",
    type: "image",
    size: 245760,
    alt: "Hero section background image",
    caption: "Main hero image for landing page",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "course-thumbnail.png",
    url: "/placeholder.svg?height=300&width=400",
    type: "image",
    size: 156432,
    alt: "Course thumbnail image",
    caption: "Thumbnail for React course",
    createdAt: new Date("2024-01-10"),
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Comment",
    message: "John Doe commented on your blog post",
    type: "info",
    read: false,
    userId: "1",
    createdAt: new Date("2024-02-25"),
  },
  {
    id: "2",
    title: "Course Published",
    message: 'Your course "Complete React Course" has been published',
    type: "success",
    read: true,
    userId: "1",
    createdAt: new Date("2024-02-24"),
  },
]

export const mockAnalytics: AnalyticsData = {
  pageViews: 12543,
  uniqueVisitors: 8932,
  bounceRate: 0.34,
  avgSessionDuration: 245,
  topPages: [
    { page: "/blog/getting-started-with-react", views: 2341 },
    { page: "/courses/complete-react-course", views: 1876 },
    { page: "/blog/advanced-typescript-patterns", views: 1432 },
  ],
  trafficSources: [
    { source: "Organic Search", visitors: 4521 },
    { source: "Direct", visitors: 2341 },
    { source: "Social Media", visitors: 1876 },
    { source: "Referral", visitors: 194 },
  ],
} 