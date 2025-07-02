import { Metadata } from "next";
import { getAllBlogPosts } from "@/data/blogs";
import BlogList from "@/components/blogs/BlogList";

export const metadata: Metadata = {
  title: "Blog | Tiny Steps A Day",
  description: "Discover insights and guidance for your personal growth journey. Read articles on mindfulness, meditation, career development, relationships, and more.",
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
    "tiny steps a day"
  ],
  openGraph: {
    title: "Blog | Tiny Steps A Day",
    description: "Discover insights and guidance for your personal growth journey. Read articles on mindfulness, meditation, career development, relationships, and more.",
    url: "https://www.tinystepsaday.com/blog",
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
    title: "Blog | Tiny Steps A Day",
    description: "Discover insights and guidance for your personal growth journey. Read articles on mindfulness, meditation, career development, relationships, and more.",
    images: ["https://www.tinystepsaday.com/cover-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tinystepsaday.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return <BlogList initialPosts={posts} />;
}
