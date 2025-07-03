import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/data/blogs";
import BlogPostClient from "@/components/blogs/BlogPostClient";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Tiny Steps A Day",
      description: "The blog post you're looking for doesn't exist or has been moved.",
    };
  }

  return {
    title: `${post.title} | Blog | Tiny Steps A Day`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      "blog",
      "article",
      "personal growth",
      "mindfulness",
      "tiny steps a day"
    ],
    openGraph: {
      title: `${post.title} | Tiny Steps A Day`,
      description: post.excerpt,
      url: `https://www.tinystepsaday.com/blog/${slug}`,
      siteName: "Tiny Steps A Day",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: [post.author.name],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Tiny Steps A Day`,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://www.tinystepsaday.com/blog/${slug}`,
    },
    other: {
      "article:author": post.author.name,
      "article:published_time": post.date,
      "article:section": post.category,
      "article:tag": post.tags.join(", "),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "description": post.author.bio,
      "image": post.author.avatar
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
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.tinystepsaday.com/blog/${slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "timeRequired": post.readTime,
    "commentCount": post.comments.length,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": post.likes
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": post.comments.length
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
