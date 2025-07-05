"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { blogPostSchema } from "@/lib/schemas"
import type { z } from "zod"
import { useBlogPost } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Eye, ArrowLeft } from "lucide-react"
import { MediaSelector } from "@/components/media-selector"
import { BlogPreview } from "@/components/blog-preview"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SharingSettingsModal, type SharingOption } from "@/components/blog/SharingSettingsModal"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { mockCategories } from "@/data/mock-data"
import { DetailPageLoader } from "@/components/ui/loaders"

type BlogPostFormData = z.infer<typeof blogPostSchema>

export default function EditBlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { data: post, isLoading } = useBlogPost(params.id as string)
  
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [featuredImage, setFeaturedImage] = useState<string>("")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false)
  const [previousStatus, setPreviousStatus] = useState<string>("draft")

  const { toast } = useToast()

  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      status: "draft",
      category: "",
      tags: [],
      featuredImage: "",
      seo: {
        metaTitle: "",
        metaDescription: "",
        altText: "",
        caption: "",
      },
    },
  })

  // Update form when post data is loaded
  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        category: post.category,
        tags: post.tags,
        featuredImage: post.thumbnail || "",
        seo: post.seo,
      })
      setTags(post.tags)
      setFeaturedImage(post.thumbnail || "")
      setPreviousStatus(post.status)
    }
  }, [post, form])

  const watchedValues = form.watch()

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    form.setValue("title", title)
    if (!form.getValues("slug")) {
      form.setValue("slug", generateSlug(title))
    }
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag]
      setTags(updatedTags)
      form.setValue("tags", updatedTags)
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
    form.setValue("tags", updatedTags)
  }

  const handleSharingConfirm = async (sharingOption: SharingOption) => {
    setIsSharingModalOpen(false)
    
    // Here you would typically send the sharing option to your API
    console.log("Sharing option selected:", sharingOption)
    
    // Continue with the actual post update
    await updatePost()
  }

  const updatePost = async () => {
    setIsSaving(true)
    try {
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      })

      router.push("/management/blog")
    } catch (error) {
      console.error("Failed to update post:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const onSubmit = async () => {
    const currentStatus = form.getValues("status")
    
    // Check if status is changing from draft to published
    if (previousStatus === "draft" && currentStatus === "published") {
      setIsSharingModalOpen(true)
      return
    }
    
    // For other status changes or if already published, proceed normally
    await updatePost()
  }

  // Update previous status when form status changes
  const handleStatusChange = (newStatus: string) => {
    setPreviousStatus(form.getValues("status"))
    form.setValue("status", newStatus as "draft" | "published" | "archived")
  }

  if (isLoading) {
    return (
      <DetailPageLoader 
        title="Edit Blog Post"
        subtitle="Update your blog post content and settings"
      />
    )
  }

  if (!post) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Blog Post Not Found</h2>
            <p className="text-muted-foreground">The requested blog post could not be found.</p>
          </div>
          <Button onClick={() => router.push("/management/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Blog Post</h2>
          <p className="text-muted-foreground">Update your blog post content and settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Blog Post Preview</DialogTitle>
              </DialogHeader>
              <BlogPreview
                title={watchedValues.title}
                content={watchedValues.content}
                excerpt={watchedValues.excerpt || ""}
                thumbnail={featuredImage}
                category={watchedValues.category}
                tags={tags}
                author={{ name: post.author.name }}
                seo={watchedValues.seo || { metaTitle: "", metaDescription: "", altText: "", caption: "" }}
              />
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => router.push("/management/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" form="blog-post-form" disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form id="blog-post-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                  <CardDescription>The main content of your blog post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post title..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              handleTitleChange(e.target.value)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="post-url-slug" {...field} />
                        </FormControl>
                        <FormDescription>The URL-friendly version of the title</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of the post..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>A short summary that appears in post previews</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockCategories.map((category) => (
                              <SelectItem key={category.id} value={category.slug}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your blog post content here..."
                            className="min-h-[400px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize your post for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="seo.metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO title (max 60 characters)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo.metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="SEO description (max 160 characters)"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={(value) => handleStatusChange(value)} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  {featuredImage ? (
                    <div className="space-y-2">
                      <Image
                        src={featuredImage || "/placeholder.svg"}
                        alt="Featured image"
                        width={100}
                        height={100}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => setFeaturedImage("")}>
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <MediaSelector
                      onSelect={(media) => setFeaturedImage(media.url)}
                      trigger={
                        <Button type="button" variant="outline" className="w-full bg-transparent">
                          Select Featured Image
                        </Button>
                      }
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>

      {/* Sharing Settings Modal */}
      <SharingSettingsModal
        isOpen={isSharingModalOpen}
        onClose={() => setIsSharingModalOpen(false)}
        onConfirm={handleSharingConfirm}
      />
    </div>
  )
}
