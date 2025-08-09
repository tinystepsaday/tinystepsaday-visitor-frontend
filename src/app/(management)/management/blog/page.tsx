"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogPostList } from "@/components/blog/BlogPostList"
import { useRouter } from "next/navigation"

export default function BlogPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage your blog posts, categories, and tags.
          </p>
        </div>
        <Button onClick={() => router.push("/management/blog/create")}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <BlogPostList showActions={true} />
    </div>
  )
}
