"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Tag, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface BlogPreviewProps {
  title: string
  content: string
  excerpt: string
  thumbnail?: string
  category?: string
  tags: string[]
  author: {
    name: string
    avatar?: string
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    altText?: string
    caption?: string
  }
}

export function BlogPreview({ title, content, excerpt, thumbnail, category, tags, author, seo }: BlogPreviewProps) {
  const currentDate = new Date().toLocaleDateString()

  return (
    <div className="space-y-6">
      {/* SEO Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>SEO Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-blue-600 text-lg hover:underline cursor-pointer">
              {seo.metaTitle || title || "Your Blog Post Title"}
            </div>
            <div className="text-green-700 text-sm">
              https://yourdomain.com/blog/{title?.toLowerCase().replace(/\s+/g, "-") || "your-post-slug"}
            </div>
            <div className="text-gray-600 text-sm">
              {seo.metaDescription || excerpt || "Your blog post description will appear here..."}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Post Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Post Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{category || "Uncategorized"}</Badge>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{currentDate}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{title || "Your Blog Post Title"}</h1>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <span>By {author.name}</span>
            </div>

            {tags.length > 0 && (
              <div className="flex items-center space-x-2">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Thumbnail */}
          {thumbnail && (
            <div className="space-y-2">
              <Image
                src={thumbnail || "/placeholder.svg"}
                alt={title || "Blog post thumbnail"}
                width={100}
                height={100}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Excerpt */}
          {excerpt && (
            <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
              <p className="text-lg italic text-muted-foreground">{excerpt}</p>
            </div>
          )}

          {/* Content Preview */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.replace(/\n/g, "<br />"),
                }}
              />
            ) : (
              <p className="text-muted-foreground italic">Your blog post content will appear here as you type...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 