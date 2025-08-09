"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BlogPostForm } from "@/components/blog/BlogPostForm"
import { useBlogPost, useUpdateBlogPost } from "@/lib/api/blog"
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
  isPublished?: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  categoryId?: string
  tagIds?: string[]
}

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [id, setId] = useState<string>("")

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    getParams()
  }, [params])

  const { data: post, isLoading: isLoadingPost } = useBlogPost(id)
  const updateMutation = useUpdateBlogPost()

  const handleSubmit = async (data: BlogPostFormData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateMutation.mutateAsync({ id, data: data as any })
      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      })
      router.push("/management/blog")
    } catch {
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!id || isLoadingPost) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
        <p className="text-muted-foreground">
          Update your blog post content and settings.
        </p>
      </div>

      <BlogPostForm 
        post={post} 
        onSubmit={handleSubmit} 
        isLoading={updateMutation.isPending} 
      />
    </div>
  )
}
