"use client"

import { useState } from "react"
import { format } from "date-fns"
import { MessageSquare, Reply, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BlogCommentForm } from "./BlogCommentForm"
import { useAuth } from "@/hooks/useAuth"
import { useDeleteBlogComment, useCreateBlogComment } from "@/integration/blog"
import { useToast } from "@/hooks/use-toast"
import type { BlogComment } from "@/lib/types"

interface BlogCommentListProps {
  comments: BlogComment[]
  postId: string
  onCommentAdded?: () => void
}

export function BlogCommentList({ comments, postId, onCommentAdded }: BlogCommentListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()
  const deleteMutation = useDeleteBlogComment()
  const createCommentMutation = useCreateBlogComment()

  const handleCommentSubmit = async (content: string, parentId?: string) => {
    try {
      await createCommentMutation.mutateAsync({
        content,
        postId,
        parentId
      })
      
      toast({
        title: "Success",
        description: parentId ? "Reply posted successfully!" : "Comment posted successfully!",
      })
      
      // Close reply form if it was a reply
      if (parentId) {
        setReplyingTo(null)
      }
      
      // Notify parent component to refresh comments
      if (onCommentAdded) {
        onCommentAdded()
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (commentId: string) => {
    try {
      await deleteMutation.mutateAsync(commentId)
      toast({
        title: "Success",
        description: "Comment deleted successfully.",
      })
      
      // Notify parent component to refresh comments
      if (onCommentAdded) {
        onCommentAdded()
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), "MMM dd, yyyy 'at' h:mm a")
    } catch {
      return "Invalid date"
    }
  }

  const renderComment = (comment: BlogComment, isReply = false) => (
    <div key={comment.id} className={`space-y-4 ${isReply ? "ml-8 border-l-2 border-muted pl-4" : ""}`}>
      <div className="flex gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>
            {comment.author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            {user && (user.id === comment.author.id || user.role === "admin") && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-6 w-6 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="text-sm">{comment.content}</p>
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo(comment.id)}
              className="h-6 px-2 text-xs"
            >
              <Reply className="mr-1 h-3 w-3" />
              Reply
            </Button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {replyingTo === comment.id && (
        <div className="ml-8">
          <BlogCommentForm
            onSubmit={handleCommentSubmit}
            parentId={comment.id}
            onCancel={() => setReplyingTo(null)}
            isReply={true}
          />
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  )

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-8">
      {comments.map((comment) => renderComment(comment))}
    </div>
  )
}
