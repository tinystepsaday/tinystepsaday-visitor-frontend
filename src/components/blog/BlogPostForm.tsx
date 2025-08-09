"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useBlogCategories, useBlogTags } from "@/lib/api/blog"
import { MediaSelector } from "@/components/media-selector"
import Image from "next/image"
import type { BlogPost, BlogCategory, BlogTag } from "@/lib/types"

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(300, "Excerpt must be less than 300 characters").optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED", "SCHEDULED"]),
  featuredImage: z.string().optional(),
  readTime: z.number().int().min(1).optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  seoTitle: z.string().max(60, "SEO title must be less than 60 characters").optional(),
  seoDescription: z.string().max(160, "SEO description must be less than 160 characters").optional(),
  seoKeywords: z.array(z.string()).optional(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
})

type BlogPostFormData = z.infer<typeof blogPostSchema>

interface BlogPostFormProps {
  post?: BlogPost
  onSubmit: (data: BlogPostFormData) => Promise<void>
  isLoading?: boolean
}

export function BlogPostForm({ post, onSubmit, isLoading = false }: BlogPostFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags?.map(t => t.id) || [])
  const [seoKeywords, setSeoKeywords] = useState<string[]>(post?.seoKeywords || [])
  const [keywordInput, setKeywordInput] = useState("")
  const [selectedImage, setSelectedImage] = useState<string>(post?.featuredImage || "")
  const { toast } = useToast()

  const { data: categories = [] } = useBlogCategories()
  const { data: tags = [] } = useBlogTags()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      excerpt: post?.excerpt || "",
      status: (post?.status as "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED") || "DRAFT",
      featuredImage: post?.featuredImage || "",
      readTime: post?.readTime || undefined,
      isFeatured: post?.isFeatured ?? false,
      isPublished: post?.isPublished ?? false,
      seoTitle: post?.seoTitle || "",
      seoDescription: post?.seoDescription || "",
      seoKeywords: post?.seoKeywords || [],
      categoryId: post?.category?.id || "",
      tagIds: post?.tags?.map(t => t.id) || [],
    },
  })

  const watchedTitle = watch("title")

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !post) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setValue("slug", slug)
    }
  }, [watchedTitle, setValue, post])

  const handleFormSubmit = async (data: BlogPostFormData) => {
    try {
      await onSubmit({
        ...data,
        tagIds: selectedTags,
        seoKeywords,
        featuredImage: selectedImage,
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !seoKeywords.includes(keywordInput.trim())) {
      setSeoKeywords([...seoKeywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setSeoKeywords(seoKeywords.filter(k => k !== keyword))
  }

  const addTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId))
  }

  const handleImageSelect = (media: { url: string; alt?: string; caption?: string }) => {
    setSelectedImage(media.url)
    setValue("featuredImage", media.url)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter post title"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  placeholder="post-url-slug"
                />
                {errors.slug && (
                  <p className="text-sm text-red-500">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt")}
                  placeholder="Brief description of the post"
                  rows={3}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-500">{errors.excerpt.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  {...register("content")}
                  placeholder="Write your post content here..."
                  rows={15}
                />
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={watch("status")}
                  onValueChange={(value) => setValue("status", value as "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={watch("isFeatured")}
                  onCheckedChange={(checked) => setValue("isFeatured", checked)}
                />
                <Label htmlFor="isFeatured">Featured Post</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  checked={watch("isPublished")}
                  onCheckedChange={(checked) => setValue("isPublished", checked)}
                />
                <Label htmlFor="isPublished">Published</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Reading Time (minutes)</Label>
                <Input
                  id="readTime"
                  type="number"
                  min="1"
                  {...register("readTime", { valueAsNumber: true })}
                  placeholder="5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Categories & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={watch("categoryId")}
                  onValueChange={(value) => setValue("categoryId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(categories as BlogCategory[]).map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tagId) => {
                    const tag = (tags as BlogTag[]).find(t => t.id === tagId)
                    return tag ? (
                      <Badge
                        key={tagId}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeTag(tagId)}
                      >
                        {tag.name} ×
                      </Badge>
                    ) : null
                  })}
                </div>
                <Select
                  value=""
                  onValueChange={addTag}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {(tags as BlogTag[])
                      .filter(tag => !selectedTags.includes(tag.id))
                      .map((tag) => (
                        <SelectItem key={tag.id} value={tag.id}>
                          {tag.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={selectedImage}
                    alt="Featured image"
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSelectedImage("")
                      setValue("featuredImage", "")
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
              <MediaSelector
                onSelect={handleImageSelect}
              />
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  {...register("seoTitle")}
                  placeholder="SEO optimized title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  {...register("seoDescription")}
                  placeholder="SEO description for search engines"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>SEO Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                  />
                  <Button type="button" onClick={addKeyword} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {seoKeywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => removeKeyword(keyword)}
                    >
                      {keyword} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  )
}
