import StreakDetailsClient from "@/components/streaks/StreakDetailsClient";
import { streaks, userStreakProgress } from "@/data/streaks";
import { notFound } from "next/navigation";

const getStreak = async (slug: string) => {
  const streak = streaks.find(s => s.slug === slug);
  if (!streak) return notFound();
  return streak;
}

const getUserStreakProgress = async (streakId: string, userId?: string) => {
  if (!userId) return null;
  return userStreakProgress.find(progress => 
    progress.streakId === streakId && progress.userId === userId
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const streak = await getStreak(slug);

  if (streak) {
    return {
      title: `${streak.title} | Tiny Steps A Day`,
      description: streak.description,
      openGraph: {
        title: `${streak.title} | Tiny Steps A Day`,
        description: streak.description,
        images: ["https://www.tinystepsaday.com/banner-image.jpg"],
        url: `https://www.tinystepsaday.com/streaks/${slug}`,
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
        canonical: `https://www.tinystepsaday.com/streaks/${slug}`,
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
  const { slug } = await params;
  const streak = await getStreak(slug);

  // Check if user is logged in and enrolled
  // Note: In a real app, you'd get the user session here
  // For now, we'll simulate this with a mock user
  const mockUserId = "user1"; // This would come from the session
  const userProgress = await getUserStreakProgress(streak.id, mockUserId);

  return <StreakDetailsClient streak={streak} userProgress={userProgress} />;
}