import StreakCheckInClient from "@/components/streaks/StreakCheckInClient";
import { streaks, userStreakProgress } from "@/data/streaks";
import { notFound, redirect } from "next/navigation";

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
      title: `Check In - ${streak.title} | Tiny Steps A Day`,
      description: `Track your progress in ${streak.title}`,
      openGraph: {
        title: `Check In - ${streak.title} | Tiny Steps A Day`,
        description: `Track your progress in ${streak.title}`,
        images: ["https://www.tinystepsaday.com/banner-image.jpg"],
        url: `https://www.tinystepsaday.com/streaks/${slug}/checkin`,
        siteName: "Tiny Steps A Day",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Check In - ${streak.title} | Tiny Steps A Day`,
        description: `Track your progress in ${streak.title}`,
        images: ["https://www.tinystepsaday.com/banner-image.jpg"],
      },
      alternates: {
        canonical: `https://www.tinystepsaday.com/streaks/${slug}/checkin`,
      },
      robots: {
        index: false,
        follow: false,
      },
      metadataBase: new URL("https://www.tinystepsaday.com"),
    };
  }

  return {};
}

export default async function StreakCheckInPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const streak = await getStreak(slug);

  // Check if user is logged in and enrolled
  // Note: In a real app, you'd get the user session here
  const mockUserId = "user1"; // This would come from the session
  const userProgress = await getUserStreakProgress(streak.id, mockUserId);

  // If user is not enrolled, redirect to details page
  if (!userProgress?.isActive) {
    redirect(`/streaks/${slug}`);
  }

  return <StreakCheckInClient streak={streak} userProgress={userProgress} />;
} 