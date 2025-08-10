"use client"

import { useState } from "react"
import { format } from "date-fns"
import { 
  Calendar, 
  Heart, 
  MessageSquare, 
  Share2, 
  Eye,
  Clock,
  Tag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { usePublicBlogComments, useCreateBlogComment, useToggleBlogLike, useCheckBlogLike } from "@/lib/api/blog"
import { useToast } from "@/hooks/use-toast"
import { BlogCommentForm } from "./BlogCommentForm"
import { BlogCommentList } from "./BlogCommentList"
import type { BlogPost } from "@/lib/types"
import Image from "next/image"

interface BlogPostDetailProps {
  post: BlogPost
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const [showComments, setShowComments] = useState(false)
  const { toast } = useToast()

  const { data: commentsData } = usePublicBlogComments({
    postId: post.id,
    page: 1,
    limit: 10,
  })

  const createCommentMutation = useCreateBlogComment()
  const toggleLikeMutation = useToggleBlogLike()
  const { data: likeData } = useCheckBlogLike(post.id)

  const comments = commentsData?.comments || []
  const isLiked = likeData?.liked || false

  const handleLike = async () => {
    try {
      await toggleLikeMutation.mutateAsync({ postId: post.id })
    } catch {
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleComment = async (content: string) => {
    try {
      await createCommentMutation.mutateAsync({
        content,
        postId: post.id,
      })
      toast({
        title: "Success",
        description: "Comment added successfully.",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleShare = async (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = post.title
    const text = post.excerpt || post.title

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`,
    }

    const shareUrl = shareUrls[platform as keyof typeof shareUrls]
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), "MMMM dd, yyyy")
    } catch {
      return "Invalid date"
    }
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="space-y-4">
          {/* Category */}
          {post.category && (
            <Badge variant="outline" className="text-sm">
              {post.category.name}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author.name}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>

            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={1000}
            height={1000}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between py-6 border-t border-b">
        <div className="flex items-center gap-4">
          <Button
            variant={isLiked ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
            disabled={toggleLikeMutation.isPending}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
            {post.likesCount} {isLiked ? "Liked" : "Like"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            {post.commentsCount} Comments
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Share:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare("twitter")}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare("facebook")}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare("linkedin")}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Comments ({post.commentsCount})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BlogCommentForm onSubmit={handleComment} />
              <Separator />
              <BlogCommentList comments={comments} postId={post.id} />
            </CardContent>
          </Card>
        </div>
      )}
    </article>
  )
}
