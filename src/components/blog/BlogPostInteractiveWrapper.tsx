"use client";

import { useAuth } from "@/hooks/useAuth";
import BlogPostInteractive from "./BlogPostInteractive";
import type { BlogPost } from "@/lib/types";

interface BlogPostInteractiveWrapperProps {
  post: BlogPost;
}

const BlogPostInteractiveWrapper = ({ post }: BlogPostInteractiveWrapperProps) => {
  const { isLoggedIn } = useAuth();

  // Only show interactive features if user is logged in
  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl px-4 mx-auto w-full mb-12">
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Sign in to like, comment, and share this post
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href={`/auth/login?returnUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : `/blog/${post.slug}`)}`}
              className="text-primary hover:underline"
            >
              Sign In
            </a>
            <span className="text-muted-foreground">or</span>
            <a 
              href={`/auth/signup?returnUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : `/blog/${post.slug}`)}`}
              className="text-primary hover:underline"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <BlogPostInteractive post={post} />;
};

export default BlogPostInteractiveWrapper;