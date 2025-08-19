"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { usePublicBlogPosts } from "@/integration/blog";
import { SectionHeader } from "../ui/section-header";

const LatestBlogPosts = () => {
  const { data: blogData, isLoading, error } = usePublicBlogPosts({
    limit: 3,
    sortBy: "publishedAt",
    sortOrder: "desc"
  });

  if (isLoading) {
    return (
      <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Latest Blog Posts" subtitle="Discover insights, tips, and stories from our community" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4" />
                <div className="space-y-3">
                  <div className="bg-muted h-4 rounded w-3/4" />
                  <div className="bg-muted h-4 rounded w-1/2" />
                  <div className="bg-muted h-4 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !blogData?.posts || blogData.posts.length === 0) {
    return (
      <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Latest Blog Posts" subtitle="Discover insights, tips, and stories from our community" />
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              No blog posts available at the moment.
            </p>
            <Button asChild>
              <Link href="/blog">
                Visit Our Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const posts = blogData.posts.slice(0, 3);

  return (
    <section className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Blog Posts"
          subtitle="Discover the latest insights and guidance for your personal growth journey"
          isPageHeader={false}
          centered={true}
        />
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <div key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-border rounded-lg bg-foreground/2 dark:bg-foreground/5">
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Featured Image */}
                {post.featuredImage ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
                    <div className="text-4xl text-muted-foreground">📝</div>
                  </div>
                )}

                <div className="p-6">
                  {/* Category Badge */}
                  {post.category && (
                    <div className="mb-3">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                        style={{
                          backgroundColor: post.category.color || 'hsl(var(--secondary))',
                          color: post.category.color ? 'white' : 'hsl(var(--secondary-foreground))'
                        }}
                      >
                        {post.category.name}
                      </Badge>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="space-y-2">
                    {/* Author */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author.name}</span>
                    </div>

                    {/* Date and Read Time */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : new Date(post.createdAt).toLocaleDateString()
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime || 5} min read</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: tag.color || 'hsl(var(--border))',
                              color: tag.color || 'hsl(var(--foreground))'
                            }}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Posts Link */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/blog" className="inline-flex items-center gap-2">
              View All Blog Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
