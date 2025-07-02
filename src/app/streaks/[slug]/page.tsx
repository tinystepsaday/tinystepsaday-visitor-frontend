import StreakDetailsClient from "@/components/streaks/StreakDetailsClient";
import { streaks } from "@/data/streaks";
import { notFound } from "next/navigation";

const getStreak = async (slug: string) => {
  const streak = streaks.find(s => s.slug === slug);
  if (!streak) return notFound();
  return streak;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params here
  const streak = await getStreak(slug);

  if (streak) {
    return {
      title: `${streak.title} | Tiny Steps A Day`,
      description: streak.description,
      openGraph: {
        title: `${streak.title} | Tiny Steps A Day`,
        description: streak.description,
        images: ["https://www.tinystepsaday.com/banner-image.jpg"],
        url: `https://www.tinystepsaday.com/streaks/${slug}`, // Use slug directly
        siteName: "Tiny Steps A Day",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${streak.title} | Tiny Steps A Day`,
        description: streak.description,
        images: ["https://www.tinystepsaday.com/banner-image.jpg"],
      },
      alternates: {
        canonical: `https://www.tinystepsaday.com/streaks/${slug}`, // Use slug directly
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      metadataBase: new URL("https://www.tinystepsaday.com"),
    };
  }

  return {};
}

export default async function StreakDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params here
  const streak = await getStreak(slug);

  return <StreakDetailsClient streak={streak} />;
}