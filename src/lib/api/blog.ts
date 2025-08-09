import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "@/integration/apiClient"
import type { 
  BlogPost, 
  BlogPostUpdate, 
  BlogCategory, 
  BlogCategoryUpdate,
  BlogTag,
  BlogTagUpdate,
  BlogComment,
  BlogCommentUpdate,
  BlogLike,
  BlogPostQuery,
  BlogCommentQuery,
  BlogCommentCreate
} from "@/lib/types"

interface PaginationInfo {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface PaginatedResponse<T> {
  posts?: T[]
  comments?: T[]
  pagination: PaginationInfo
}

// Blog Posts
export const useBlogPosts = (query?: BlogPostQuery) => {
  return useQuery({
    queryKey: ["blogPosts", query],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => params.append(key, v))
            } else {
              params.append(key, String(value))
            }
          }
        })
      }
      const response = await apiClient.get<PaginatedResponse<BlogPost>>(`/api/blog/posts?${params.toString()}`)
      return response
    },
  })
}

export const usePublicBlogPosts = (query?: BlogPostQuery) => {
  return useQuery({
    queryKey: ["publicBlogPosts", query],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (query) {
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => params.append(key, v))
            } else {
              params.append(key, String(value))
            }
          }
        })
      }
      const response = await apiClient.get<PaginatedResponse<BlogPost>>(`/api/blog/public/posts?${params.toString()}`)
      return response
    },
  })
}

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      const response = await apiClient.get<BlogPost>(`/api/blog/posts/${id}`)
      return response
    },
    enabled: !!id,
  })
}

export const usePublicBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["publicBlogPost", slug],
    queryFn: async () => {
      const response = await apiClient.get<BlogPost>(`/api/blog/public/posts/${slug}`)
      return response
    },
    enabled: !!slug,
  })
}

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BlogPost) => {
      const response = await apiClient.post<BlogPost>("/api/blog/posts", data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPosts"] })
    },
  })
}

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BlogPostUpdate }) => {
      const response = await apiClient.put<BlogPost>(`/api/blog/posts/${id}`, data)
      return response
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPosts"] })
      queryClient.invalidateQueries({ queryKey: ["blogPost", data.id] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPost", data.slug] })
    },
  })
}

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/api/blog/posts/${id}`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPosts"] })
    },
  })
}

// Blog Categories
export const useBlogCategories = () => {
  return useQuery({
    queryKey: ["blogCategories"],
    queryFn: async () => {
      const response = await apiClient.get<BlogCategory[]>("/api/blog/categories")
      return response
    },
  })
}

export const useBlogCategory = (id: string) => {
  return useQuery({
    queryKey: ["blogCategory", id],
    queryFn: async () => {
      const response = await apiClient.get<BlogCategory>(`/api/blog/categories/${id}`)
      return response
    },
    enabled: !!id,
  })
}

export const useCreateBlogCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BlogCategory) => {
      const response = await apiClient.post<BlogCategory>("/api/blog/categories", data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] })
    },
  })
}

export const useUpdateBlogCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BlogCategoryUpdate }) => {
      const response = await apiClient.put<BlogCategory>(`/api/blog/categories/${id}`, data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] })
    },
  })
}

export const useDeleteBlogCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/api/blog/categories/${id}`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] })
    },
  })
}

// Blog Tags
export const useBlogTags = () => {
  return useQuery({
    queryKey: ["blogTags"],
    queryFn: async () => {
      const response = await apiClient.get<BlogTag[]>("/api/blog/tags")
      return response
    },
  })
}

export const useBlogTag = (id: string) => {
  return useQuery({
    queryKey: ["blogTag", id],
    queryFn: async () => {
      const response = await apiClient.get<BlogTag>(`/api/blog/tags/${id}`)
      return response
    },
    enabled: !!id,
  })
}

export const useCreateBlogTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BlogTag) => {
      const response = await apiClient.post<BlogTag>("/api/blog/tags", data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogTags"] })
    },
  })
}

export const useUpdateBlogTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BlogTagUpdate }) => {
      const response = await apiClient.put<BlogTag>(`/api/blog/tags/${id}`, data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogTags"] })
    },
  })
}

export const useDeleteBlogTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/api/blog/tags/${id}`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogTags"] })
    },
  })
}

// Blog Comments
export const useBlogComments = (query: BlogCommentQuery) => {
  return useQuery({
    queryKey: ["blogComments", query],
    queryFn: async () => {
      const params = new URLSearchParams()
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v))
          } else {
            params.append(key, String(value))
          }
        }
      })
      const response = await apiClient.get<PaginatedResponse<BlogComment>>(`/api/blog/comments?${params.toString()}`)
      return response
    },
    enabled: !!query.postId,
  })
}

export const usePublicBlogComments = (query: BlogCommentQuery) => {
  return useQuery({
    queryKey: ["publicBlogComments", query],
    queryFn: async () => {
      const params = new URLSearchParams()
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v))
          } else {
            params.append(key, String(value))
          }
        }
      })
      const response = await apiClient.get<PaginatedResponse<BlogComment>>(`/api/blog/public/comments?${params.toString()}`)
      return response
    },
    enabled: !!query.postId,
  })
}

export const useCreateBlogComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BlogCommentCreate) => {
      const response = await apiClient.post<BlogComment>("/api/blog/comments", data)
      return response
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogComments"] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogComments"] })
      queryClient.invalidateQueries({ queryKey: ["blogPost", data.postId] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPost"] })
    },
  })
}

export const useUpdateBlogComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BlogCommentUpdate }) => {
      const response = await apiClient.put<BlogComment>(`/api/blog/comments/${id}`, data)
      return response
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogComments"] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogComments"] })
      queryClient.invalidateQueries({ queryKey: ["blogPost", data.postId] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPost"] })
    },
  })
}

export const useDeleteBlogComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/api/blog/comments/${id}`)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogComments"] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogComments"] })
    },
  })
}

// Blog Likes
export const useToggleBlogLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BlogLike) => {
      const response = await apiClient.post<{ success: boolean; message: string }>("/api/blog/likes", data)
      return response
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogPost", variables.postId] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPost"] })
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] })
      queryClient.invalidateQueries({ queryKey: ["publicBlogPosts"] })
    },
  })
}

export const useCheckBlogLike = (postId: string) => {
  return useQuery({
    queryKey: ["blogLike", postId],
    queryFn: async () => {
      const response = await apiClient.get<{ liked: boolean }>(`/api/blog/likes/${postId}`)
      return response
    },
    enabled: !!postId,
  })
}
