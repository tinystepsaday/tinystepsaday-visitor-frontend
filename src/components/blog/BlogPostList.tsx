"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  Heart,
  MessageSquare,
  Eye as EyeIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBlogPosts, useDeleteBlogPost } from "@/integration/blog"
import { useToast } from "@/hooks/use-toast"
import type { BlogPostQuery, BlogPost } from "@/lib/types"

interface BlogPostListProps {
  showActions?: boolean
  limit?: number
  filters?: BlogPostQuery
}

export function BlogPostList({ showActions = true, limit = 10, filters }: BlogPostListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Initialize state from URL params or props
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "all")
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("category") || "all")
  const [tagFilter, setTagFilter] = useState<string>(searchParams.get("tag") || "all")
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sortBy") || "createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (searchParams.get("sortOrder") as "asc" | "desc") || "desc"
  )
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"))

  // Sync state with URL params when they change
  useEffect(() => {
    const searchParam = searchParams.get("search") || ""
    const statusParam = searchParams.get("status") || "all"
    const categoryParam = searchParams.get("category") || "all"
    const tagParam = searchParams.get("tag") || "all"
    const sortByParam = searchParams.get("sortBy") || "createdAt"
    const sortOrderParam = (searchParams.get("sortOrder") as "asc" | "desc") || "desc"
    const pageParam = parseInt(searchParams.get("page") || "1")

    setSearch(searchParam)
    setStatusFilter(statusParam)
    setCategoryFilter(categoryParam)
    setTagFilter(tagParam)
    setSortBy(sortByParam)
    setSortOrder(sortOrderParam)
    setCurrentPage(pageParam)
  }, [searchParams])

  // Build query object
  const query: BlogPostQuery = {
    ...filters,
    search: search || undefined,
    status: statusFilter === "all" ? undefined : statusFilter as "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED",
    category: categoryFilter === "all" ? undefined : categoryFilter,
    tag: tagFilter === "all" ? undefined : tagFilter,
    page: currentPage,
    limit,
    sortBy: sortBy as "createdAt" | "updatedAt" | "publishedAt" | "title" | "views" | "likesCount" | "commentsCount",
    sortOrder,
  }

  const { data: postsData, isLoading, refetch } = useBlogPosts(query)
  const deleteMutation = useDeleteBlogPost()

  const posts = postsData?.posts || []
  const pagination = postsData?.pagination

  // Update URL when filters change
  const updateSearchParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    const newUrl = `${typeof window !== 'undefined' ? window.location.pathname : ''}?${params.toString()}`
    router.push(newUrl)
  }

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
    updateSearchParams({ search: value, page: "1" })
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
    updateSearchParams({ status: value, page: "1" })
  }

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value)
    setCurrentPage(1)
    updateSearchParams({ category: value, page: "1" })
  }

  const handleTagFilterChange = (value: string) => {
    setTagFilter(value)
    setCurrentPage(1)
    updateSearchParams({ tag: value, page: "1" })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    updateSearchParams({ sortBy: value })
  }

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value)
    updateSearchParams({ sortOrder: value })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateSearchParams({ page: page.toString() })
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      })
      refetch()
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      DRAFT: "secondary",
      PUBLISHED: "default",
      ARCHIVED: "destructive",
      SCHEDULED: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.toLowerCase()}
      </Badge>
    )
  }

  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), "MMM dd, yyyy")
    } catch {
      return "Invalid date"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={handleCategoryFilterChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {/* Add categories here when available */}
            </SelectContent>
          </Select>
          <Select value={tagFilter} onValueChange={handleTagFilterChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {/* Add tags here when available */}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="updatedAt">Updated Date</SelectItem>
              <SelectItem value="publishedAt">Published Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="views">Views</SelectItem>
              <SelectItem value="likesCount">Likes</SelectItem>
              <SelectItem value="commentsCount">Comments</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={handleSortOrderChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Desc</SelectItem>
              <SelectItem value="asc">Asc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No blog posts found.</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post: BlogPost) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                      {post.isFeatured && (
                        <Badge variant="default" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="h-3 w-3" />
                        <span>{post.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likesCount} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.commentsCount} comments</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(post.status)}
                    {showActions && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => router.push(`/management/blog/${post.id}/edit`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.category && (
                      <Badge variant="outline" className="text-xs">
                        {post.category.name}
                      </Badge>
                    )}
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  {post.readTime && (
                    <span className="text-sm text-muted-foreground">
                      {post.readTime} min read
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, pagination.page - 2)) + i;
                if (pageNum > pagination.totalPages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === pagination.page ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
