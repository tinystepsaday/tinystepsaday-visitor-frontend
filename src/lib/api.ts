import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { finalMockBlogPosts, mockCourses, mockMediaFiles, mockNotifications, mockAnalytics } from "@/data/mock-data"
import type { BlogPost, MediaFile } from "@/lib/types"

// Simulate API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Blog Posts API
export const useBlogPosts = (filters?: {
  search?: string
  status?: string
  dateRange?: { from: Date; to: Date }
}) => {
  return useQuery({
    queryKey: ["blogPosts", filters],
    queryFn: async () => {
      await delay(500)
      let posts = [...finalMockBlogPosts]

      if (filters?.search) {
        posts = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
            post.content.toLowerCase().includes(filters.search!.toLowerCase()),
        )
      }

      if (filters?.status) {
        posts = posts.filter((post) => post.status === filters.status)
      }

      if (filters?.dateRange) {
        posts = posts.filter(
          (post) => post.createdAt >= filters.dateRange!.from && post.createdAt <= filters.dateRange!.to,
        )
      }

      return posts
    },
  })
}

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      await delay(300)
      return finalMockBlogPosts.find((post) => post.id === id)
    },
  })
}

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<BlogPost>) => {
      await delay(1000)
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        status: data.status || "draft",
        author: data.author!,
        tags: data.tags || [],
        category: data.category || "",
        seo: data.seo || {
          metaTitle: "",
          metaDescription: "",
          altText: "",
          caption: "",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      }
      finalMockBlogPosts.push(newPost)
      return newPost
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] })
    },
  })
}

// Courses API
export const useCourses = (filters?: {
  search?: string
  status?: string
  category?: string
}) => {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: async () => {
      await delay(500)
      let courses = [...mockCourses]

      if (filters?.search) {
        courses = courses.filter((course) => course.title.toLowerCase().includes(filters.search!.toLowerCase()))
      }

      if (filters?.status) {
        courses = courses.filter((course) => course.status === filters.status)
      }

      if (filters?.category) {
        courses = courses.filter((course) => course.category === filters.category)
      }

      return courses
    },
  })
}

// Media Files API
export const useMediaFiles = (filters?: {
  search?: string
  type?: string
}) => {
  return useQuery({
    queryKey: ["mediaFiles", filters],
    queryFn: async () => {
      await delay(500)
      let files = [...mockMediaFiles]

      if (filters?.search) {
        files = files.filter((file) => file.name.toLowerCase().includes(filters.search!.toLowerCase()))
      }

      if (filters?.type) {
        files = files.filter((file) => file.type === filters.type)
      }

      return files
    },
  })
}

export const useUploadMedia = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { file: File; alt?: string; caption?: string }) => {
      await delay(2000) // Simulate upload time
      const newFile: MediaFile = {
        id: Date.now().toString(),
        name: data.file.name,
        url: URL.createObjectURL(data.file),
        type: data.file.type.startsWith("image/") ? "image" : "document",
        size: data.file.size,
        alt: data.alt,
        caption: data.caption,
        createdAt: new Date(),
      }
      mockMediaFiles.push(newFile)
      return newFile
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mediaFiles"] })
    },
  })
}

// Notifications API
export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      await delay(300)
      return mockNotifications
    },
  })
}

// Analytics API
export const useAnalytics = (dateRange?: { from: Date; to: Date }) => {
  return useQuery({
    queryKey: ["analytics", dateRange],
    queryFn: async () => {
      await delay(800)
      return mockAnalytics
    },
  })
}

// Global Search API
export const useGlobalSearch = (query: string) => {
  return useQuery({
    queryKey: ["globalSearch", query],
    queryFn: async () => {
      await delay(400)
      if (!query) return { posts: [], courses: [], media: [] }

      const posts = finalMockBlogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()),
      )

      const courses = mockCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase()),
      )

      const media = mockMediaFiles.filter(
        (file) =>
          file.name.toLowerCase().includes(query.toLowerCase()) ||
          file.alt?.toLowerCase().includes(query.toLowerCase()),
      )

      return { posts, courses, media }
    },
    enabled: query.length > 2,
  })
} 