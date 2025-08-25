import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Heart,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import apiClient from "@/integration/apiClient";
import type { BlogCategory } from "@/lib/types";
import type { BlogPost } from "@/lib/types";
import BlogPageSkeleton from "@/components/blog/BlogPageSkeleton";

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { search, category } = await searchParams;
  const baseTitle = "Blog";
  const baseDescription = "Discover insights and guidance for your personal growth journey. Read articles on mindfulness, meditation, career development, relationships, and more.";

  let dynamicTitle = baseTitle;
  let dynamicDescription = baseDescription;

  if (search) {
    dynamicTitle = `Search: ${search}`;
    dynamicDescription = `Search results for "${search}" on Tiny Steps A Day. Explore articles on personal growth and more.`;
  } else if (category && category !== "all") {
    // Convert slug to display name for metadata
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
    dynamicTitle = `${categoryName} Articles`;
    dynamicDescription = `Explore ${categoryName} articles on Tiny Steps A Day for insights on personal growth and well-being.`;
  }

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [
      "blog",
      "personal growth",
      "mindfulness",
      "meditation",
      "career development",
      "relationships",
      "mental health",
      "spirituality",
      "self-improvement",
      "tiny steps a day",
      ...(category && category !== "all" ? [category.toLowerCase().replace(/-/g, ' ')] : []),
      ...(search ? [search.toLowerCase()] : []),
    ],
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      url: `https://www.tinystepsaday.com/blog${search || category ? `?${new URLSearchParams({ search: search || "", category: category || "" }).toString()}` : ""}`,
      siteName: "Tiny Steps A Day",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://www.tinystepsaday.com/cover-image.jpg",
          width: 1200,
          height: 630,
          alt: "Tiny Steps A Day Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDescription,
      images: ["https://www.tinystepsaday.com/cover-image.jpg"],
    },
    alternates: {
      canonical: `https://www.tinystepsaday.com/blog${search || category ? `?${new URLSearchParams({ search: search || "", category: category || "" }).toString()}` : ""}`,
    },
  };
}

const POSTS_PER_PAGE = 6;

async function getBlogData(search?: string, category?: string, tag?: string, page: number = 1) {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category && category !== "all") params.append("category", category);
    if (tag && tag !== "all") params.append("tag", tag);
    params.append("page", page.toString());
    params.append("limit", POSTS_PER_PAGE.toString());
    params.append("sortBy", "createdAt");
    params.append("sortOrder", "desc");

    const response = await apiClient.get(`/api/blog/public/posts?${params.toString()}`);
    return response as { posts: BlogPost[]; pagination: { total: number; page: number; limit: number; totalPages: number } };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    // Return empty data structure when backend is not available
    return {
      posts: [],
      pagination: {
        total: 0,
        page: 1,
        limit: POSTS_PER_PAGE,
        totalPages: 0
      }
    };
  }
}

async function getCategories() {
  try {
    const response = await apiClient.get("/api/blog/categories");
    return response as BlogCategory[] || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { search, category, tag, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10)) || 1;
  const selectedCategory = category || "all";
  const selectedTag = tag || "all";
  const searchQuery = search || "";

  // Fetch blog posts, categories, and tags
  const [blogData, categories] = await Promise.all([
    getBlogData(searchQuery, selectedCategory, selectedTag, currentPage),
    getCategories(),
  ]);

  const { posts: filteredPosts = [], pagination = { total: 0, page: 1, limit: POSTS_PER_PAGE, totalPages: 0 } } = blogData;

  // Redirect to page 1 if currentPage is invalid or exceeds totalPages
  if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedTag !== "all") params.set("tag", selectedTag);
    params.set("page", "1");
    return notFound();
  }

  // Helper function to build URL with search params
  const buildUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedTag !== "all") params.set("tag", selectedTag);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    return `/blog${params.toString() ? `?${params.toString()}` : ""}`;
  };

  // Prepare categories and tags for display - use slugs for filtering but display names
  const displayCategories = [
    { name: "All Categories", slug: "all" },
    ...categories.map((cat: BlogCategory) => ({ name: cat.name, slug: cat.slug }))
  ];

  // const displayTags = [
  //   { name: "All Tags", slug: "all" },
  //   ...tags.map((tag: BlogTag) => ({ name: tag.name, slug: tag.slug }))
  // ];

  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <div className="container mx-auto px-4 py-16 w-full">
        <SectionHeader
          title="Tiny Steps A Day Blog"
          subtitle="Insights and guidance for your personal growth journey"
          centered
        />

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 mb-12 mt-8 max-w-7xl mx-auto justify-between w-full items-center">
        <div className="flex justify-between items-center w-full gap-4 flex-wrap md:flex-nowrap">
          <form className="relative flex-grow w-full" method="GET" action="/blog">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              name="search"
              placeholder="Search articles..."
              className="pl-10"
              defaultValue={searchQuery}
            />
            {selectedCategory !== "all" && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            {selectedTag !== "all" && (
              <input type="hidden" name="tag" value={selectedTag} />
            )}
            <input type="hidden" name="page" value="1" />
          </form>
          <div className="flex gap-2 flex-wrap pb-2 md:pb-0 w-full">
            {displayCategories.map((cat) => (
              <Button
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                asChild
                className="whitespace-nowrap"
              >
                <Link href={buildUrl({ category: cat.slug === "all" ? "" : cat.slug, page: "1" })}>
                  {cat.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        {/* <div className="flex gap-2 overflow-x-scroll pb-2 md:pb-0 max-w-7xl mx-auto justify-center w-full pl-10">
          {displayTags.map((tag) => (
            <button
              key={tag.slug}
              className={`whitespace-nowrap px-3 text-sm border border-border rounded-full ${selectedTag === tag.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              <Link href={buildUrl({ tag: tag.slug === "all" ? "" : tag.slug, page: "1" })}>
                {tag.name}
              </Link>
            </button>
          ))}
        </div> */}
      </div>


      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div className="mb-16 max-w-7xl mx-auto border border-border rounded-2xl">
          <Link href={`/blog/${filteredPosts[0].slug}`} className="group">
            <div className="rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-full overflow-hidden">
                  <Image
                    src={filteredPosts[0].featuredImage || "/placeholder-blog.jpg"}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={800}
                    height={500}
                    priority
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      {filteredPosts[0].category && (
                        <span
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: filteredPosts[0].category.color || "#6B7280",
                            color: "white"
                          }}
                        >
                          {filteredPosts[0].category.name}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {new Date(filteredPosts[0].createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {filteredPosts[0].excerpt || filteredPosts[0].content.substring(0, 200) + "..."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{filteredPosts[0].likesCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{filteredPosts[0].commentsCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{filteredPosts[0].readTime || 5} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(1).map((post) => (
              <div key={post.id} className="group hover:shadow-lg transition-shadow rounded-2xl border border-border bg-card">
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage || "/placeholder-blog.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
                      width={400}
                      height={200}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.category && (
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: post.category.color || "#6B7280",
                            color: "white"
                          }}
                        >
                          {post.category.name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.commentsCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{post.readTime || 5} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                {currentPage > 1 && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={buildUrl({ page: (currentPage - 1).toString() })}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Link>
                  </Button>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > pagination.totalPages) return null;

                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        size="sm"
                        asChild
                      >
                        <Link href={buildUrl({ page: pageNum.toString() })}>
                          {pageNum}
                        </Link>
                      </Button>
                    );
                  })}
                </div>

                {currentPage < pagination.totalPages && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={buildUrl({ page: (currentPage + 1).toString() })}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 max-w-7xl mx-auto">
          <div className="text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? `No articles found for "${searchQuery}". Try a different search term.`
                : selectedCategory !== "all"
                  ? `No articles found in the "${selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}" category.`
                  : "No articles available at the moment. Check back soon!"
              }
            </p>
          </div>
        </div>
      )}
      </div>
    </Suspense>
  );
}