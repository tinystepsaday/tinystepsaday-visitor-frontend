"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
}

const  RelatedPosts = ({ posts, currentPostId }: RelatedPostsProps) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Filter out the current post and limit to 3 posts
  const filteredPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  if (filteredPosts.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Related Articles</h3>
        <p className="text-muted-foreground text-lg">
          Discover more insights and stories that might interest you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-border rounded-lg">
            <Link href={`/blog/${post.slug}`} className="block">
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                <h4 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>

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
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime || 5} min read</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {/* {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
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
                    </div>
                  )} */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* View All Posts Link */}
      <div className="text-center mt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View All Blog Posts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default RelatedPosts;
