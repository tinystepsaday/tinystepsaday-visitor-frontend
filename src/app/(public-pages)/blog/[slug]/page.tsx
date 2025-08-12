import { Metadata } from "next";
import { notFound } from "next/navigation";
import apiClient from "@/integration/apiClient";
import BlogPostContent from "@/components/blog/BlogPostContent";
import type { BlogPost } from "@/lib/types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Force dynamic rendering for blog posts to support real-time interactions
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await apiClient.get<BlogPost>(`/api/blog/public/posts/${slug}`);
    
    if (!post) {
      return {
        title: "Article Not Found | Tiny Steps A Day",
        description: "The blog post you're looking for doesn't exist or has been moved.",
      };
    }

    return {
      title: `${post.title} | Blog `,
      description: post.excerpt || post.seoDescription || post.title,
      keywords: [
        ...(post.seoKeywords || []),
        ...(post.tags?.map((t) => t.name) || []),
        "blog",
        "article",
        "personal growth",
        "mindfulness",
        "tiny steps a day"
      ],
      openGraph: {
        title: `${post.title} | Tiny Steps A Day`,
        description: post.excerpt || post.seoDescription || post.title,
        url: `https://www.tinystepsaday.com/blog/${slug}`,
        siteName: "Tiny Steps A Day",
        locale: "en_US",
        type: "article",
        images: post.featuredImage ? [
          {
            url: post.featuredImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ] : [],
        authors: [post.author?.name || "Tiny Steps A Day"],
        publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | Tiny Steps A Day`,
        description: post.excerpt || post.seoDescription || post.title,
        images: post.featuredImage ? [post.featuredImage] : [],
      },
      alternates: {
        canonical: `https://www.tinystepsaday.com/blog/${slug}`,
      },
      other: {
        "article:author": post.author?.name || "Tiny Steps A Day",
        "article:published_time": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
        "article:section": post.category?.name || "",
        "article:tag": post.tags?.map((t) => t.name).join(", ") || "",
      },
    };
  } catch {
    return {
      title: "Article Not Found | Tiny Steps A Day",
      description: "The blog post you're looking for doesn't exist or has been moved.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  try {
    const post = await apiClient.get<BlogPost>(`/api/blog/public/posts/${slug}`);

    if (!post) {
      notFound();
    }

    // Generate JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.seoDescription || post.title,
      "image": post.featuredImage,
      "author": {
        "@type": "Person",
        "name": post.author?.name || "Tiny Steps A Day",
        "image": post.author?.avatar
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tiny Steps A Day",
        "url": "https://www.tinystepsaday.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.tinystepsaday.com/tinystepsaday-logo.png"
        }
      },
      "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
      "dateModified": post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date(post.createdAt).toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.tinystepsaday.com/blog/${slug}`
      },
      "articleSection": post.category?.name || "",
      "keywords": post.tags?.map((t) => t.name).join(", ") || post.seoKeywords?.join(", ") || "",
      "wordCount": post.content?.split(' ').length || 0,
      "timeRequired": post.readTime || 5,
      "commentCount": post.commentsCount || 0,
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": post.likesCount || 0
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/CommentAction",
          "userInteractionCount": post.commentsCount || 0
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Server-side rendered content for SEO */}
        <BlogPostContent post={post} />
      </>
    );
  } catch (error) {
    console.error("Debug - BlogPostPage: Error occurred:", error);
    notFound();
  }
}
