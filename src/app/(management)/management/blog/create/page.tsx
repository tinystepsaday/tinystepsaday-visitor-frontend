"use client"

import { useRouter } from "next/navigation"
import { BlogPostForm } from "@/components/blog/BlogPostForm"
import { useCreateBlogPost } from "@/lib/api/blog"
import { useToast } from "@/hooks/use-toast"

type BlogPostFormData = {
  title: string
  slug: string
  content: string
  excerpt?: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED"
  featuredImage?: string
  readTime?: number
  isFeatured?: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  categoryId?: string
  tagIds?: string[]
}

export default function CreateBlogPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const createMutation = useCreateBlogPost()

  const handleSubmit = async (data: BlogPostFormData) => {
    console.log(data)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await createMutation.mutateAsync(data as any)
      toast({
        title: "Success",
        description: "Blog post created successfully.",
      })
      router.push("/management/blog")
    } catch {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          Create a new blog post with rich content and SEO optimization.
        </p>
      </div>

      <BlogPostForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  )
}
