import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { finalMockBlogPosts, mockCourses, mockMediaFiles, mockNotifications, mockAnalytics } from "@/data/mock-data"
import type { BlogPost, MediaFile, FileQueryParams, FileUploadData, FileUpdateData, BulkFileOperationData } from "@/lib/types"
import { fileAPI } from "@/integration/files"

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
        status: data.status || "DRAFT",
        featuredImage: data.featuredImage || "",
        readTime: data.readTime || Math.ceil((data.content || "").split(' ').length / 200),
        views: data.views || 0,
        likesCount: data.likesCount || 0,
        commentsCount: data.commentsCount || 0,
        sharesCount: data.sharesCount || 0,
        isFeatured: data.isFeatured || false,
        publishedAt: data.publishedAt || undefined,
        seoTitle: data.seoTitle || "",
        seoDescription: data.seoDescription || "",
        seoKeywords: data.seoKeywords || [],
        author: data.author || {
          id: "1",
          name: "Unknown Author",
          avatar: "",
        },
        category: data.category || undefined,
        tags: data.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
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
        courses = courses.filter(
          (course) =>
            course.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
            course.description.toLowerCase().includes(filters.search!.toLowerCase()),
        )
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

// File Management API
export const useFiles = (params: FileQueryParams = {}) => {
  return useQuery({
    queryKey: ["files", params],
    queryFn: () => fileAPI.getFiles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useFile = (id: string) => {
  return useQuery({
    queryKey: ["file", id],
    queryFn: () => fileAPI.getFileById(id),
    enabled: !!id,
  })
}

export const useFileStatistics = () => {
  return useQuery({
    queryKey: ["fileStatistics"],
    queryFn: () => fileAPI.getFileStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useMyFiles = (limit: number = 20) => {
  return useQuery({
    queryKey: ["myFiles", limit],
    queryFn: () => fileAPI.getMyFiles(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useFilesByType = (type: string, limit: number = 10) => {
  return useQuery({
    queryKey: ["filesByType", type, limit],
    queryFn: () => fileAPI.getFilesByType(type, limit),
    enabled: !!type,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSearchFiles = (query: string, limit: number = 20) => {
  return useQuery({
    queryKey: ["searchFiles", query, limit],
    queryFn: () => fileAPI.searchFiles(query, limit),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useUploadFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (uploadData: FileUploadData) => {
      return fileAPI.uploadFile(uploadData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] })
      queryClient.invalidateQueries({ queryKey: ["myFiles"] })
      queryClient.invalidateQueries({ queryKey: ["fileStatistics"] })
    },
  })
}

export const useUpdateFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FileUpdateData }) => {
      return fileAPI.updateFile(id, data)
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["files"] })
      queryClient.invalidateQueries({ queryKey: ["file", id] })
      queryClient.invalidateQueries({ queryKey: ["myFiles"] })
    },
  })
}

export const useDeleteFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      return fileAPI.deleteFile(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] })
      queryClient.invalidateQueries({ queryKey: ["myFiles"] })
      queryClient.invalidateQueries({ queryKey: ["fileStatistics"] })
    },
  })
}

export const useBulkFileOperation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (operationData: BulkFileOperationData) => {
      return fileAPI.bulkFileOperation(operationData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] })
      queryClient.invalidateQueries({ queryKey: ["myFiles"] })
      queryClient.invalidateQueries({ queryKey: ["fileStatistics"] })
    },
  })
}

// Legacy media files hook (for backward compatibility)
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
        files = files.filter((file) =>
          file.filename.toLowerCase().includes(filters.search!.toLowerCase()),
        )
      }

      if (filters?.type && filters.type !== "all") {
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
      await delay(2000)
      const newFile: MediaFile = {
        id: Date.now().toString(),
        filename: data.file.name,
        originalName: data.file.name,
        url: URL.createObjectURL(data.file),
        type: data.file.type.startsWith("image/") ? "IMAGE" : "DOCUMENT",
        mimeType: data.file.type,
        size: data.file.size,
        alt: data.alt,
        caption: data.caption,
        isPublic: true,
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockMediaFiles.push(newFile)
      return newFile
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mediaFiles"] })
    },
  })
}

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      await delay(300)
      return mockNotifications
    },
  })
}

export const useAnalytics = (dateRange?: { from: Date; to: Date }) => {
  return useQuery({
    queryKey: ["analytics", dateRange],
    queryFn: async () => {
      await delay(500)
      return mockAnalytics
    },
  })
}

export const useGlobalSearch = (query: string) => {
  return useQuery({
    queryKey: ["globalSearch", query],
    queryFn: async () => {
      await delay(300)
      const results = {
        courses: mockCourses.filter((course) =>
          course.title.toLowerCase().includes(query.toLowerCase()),
        ),
        media: mockMediaFiles.filter((file) =>
          file.filename.toLowerCase().includes(query.toLowerCase()),
        ),
      }
      return results
    },
    enabled: query.length > 0,
  })
} 