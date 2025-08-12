import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import type { BlogPost } from "@/lib/types";
import BlogNavigation from "./BlogNavigation";
import RelatedPosts from "./RelatedPosts";
import BlogPostInteractive from "./BlogPostInteractive";

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-12">
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-2 mb-4">
          {post.category && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {post.category.name}
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {post.readTime || 5} min read
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {post.title} 
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between md:flex-row flex-col">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto"
              width={1200}
              height={600}
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <section className="max-w-3xl mx-auto mb-12">
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />
      </section>

      {/* Blog Navigation */}
      {post.navigation && (
        <BlogNavigation navigation={post.navigation} />
      )}

      <BlogPostInteractive post={post} />

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <RelatedPosts posts={post.relatedPosts} currentPostId={post.id} />
      )}
    </div>
  );
};

export default BlogPostContent;
