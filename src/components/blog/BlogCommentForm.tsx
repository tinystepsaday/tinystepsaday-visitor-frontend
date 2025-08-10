"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { usePathname } from "next/navigation"

const commentSchema = z.object({
  content: z.string().min(1, "Comment is required").max(1000, "Comment must be less than 1000 characters"),
})

type CommentFormData = z.infer<typeof commentSchema>

interface BlogCommentFormProps {
  onSubmit: (content: string, parentId?: string) => Promise<void>
  parentId?: string
  onCancel?: () => void
  isReply?: boolean
}

export function BlogCommentForm({ onSubmit, parentId, onCancel, isReply = false }: BlogCommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  })

  const handleFormSubmit = async (data: CommentFormData) => {
    if (!user) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(data.content, parentId)
      reset()
    } catch {
      // Error is handled by parent component
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : pathname
    const loginUrl = `/auth/login?returnUrl=${encodeURIComponent(currentUrl)}`
    const signupUrl = `/auth/signup?returnUrl=${encodeURIComponent(currentUrl)}`
    
    return (
      <Card>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please <a href={loginUrl} className="text-primary hover:underline">log in</a> or <a href={signupUrl} className="text-primary hover:underline">sign up</a> to leave a comment.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={`${user.firstName || ''} ${user.lastName || ''}`.trim()} />
            <AvatarFallback>
              {`${user.firstName || ''} ${user.lastName || ''}`.trim().split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="space-y-2">
                <Textarea
                  {...register("content")}
                  placeholder={isReply ? "Write a reply..." : "Write a comment..."}
                  rows={3}
                  className="resize-none"
                />
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content.message}</p>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (isReply ? "Posting Reply..." : "Posting...") : (isReply ? "Post Reply" : "Post Comment")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
