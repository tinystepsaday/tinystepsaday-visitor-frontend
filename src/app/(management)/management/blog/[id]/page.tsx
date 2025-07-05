"use client"

import { useParams, useRouter } from "next/navigation"
import { useBlogPost } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Eye, Calendar, User, FolderOpen } from "lucide-react"
import { DetailPageLoader } from "@/components/ui/loaders"
import Image from "next/image"

export default function BlogDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { data: post, isLoading } = useBlogPost(params.id as string)

  if (isLoading) {
    return (
      <DetailPageLoader 
        title="Blog Post Details"
        subtitle="View and manage blog post information"
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
          <h2 className="text-3xl font-bold tracking-tight">Blog Post Details</h2>
          <p className="text-muted-foreground">View and manage blog post information</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.push(`/management/blog/${post.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Post
          </Button>
          <Button variant="outline" onClick={() => router.push("/management/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription className="text-lg mt-2">{post.excerpt}</CardDescription>
                </div>
                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                  {post.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {post.thumbnail && (
                <div className="mb-6">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* SEO Information */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Information</CardTitle>
              <CardDescription>Search engine optimization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Meta Title</label>
                <p className="text-sm text-muted-foreground">{post.seo.metaTitle || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <p className="text-sm text-muted-foreground">{post.seo.metaDescription || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Alt Text</label>
                <p className="text-sm text-muted-foreground">{post.seo.altText || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Caption</label>
                <p className="text-sm text-muted-foreground">{post.seo.caption || "Not set"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Post Information */}
          <Card>
            <CardHeader>
              <CardTitle>Post Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Author</p>
                  <p className="text-sm text-muted-foreground">{post.author.name}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {post.updatedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              {post.publishedAt && (
                <>
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Published</p>
                      <p className="text-sm text-muted-foreground">
                        {post.publishedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline">{post.category}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push(`/management/blog/${post.id}/edit`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Post
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
              >
                <Eye className="mr-2 h-4 w-4" />
                View on Site
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
