import StreakEditClient from "@/components/streaks/StreakEditClient";
import { streaks } from "@/data/streaks";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Streak",
  description: "Edit your streak challenge",
};

const getStreak = async (slug: string) => {
  const streak = streaks.find(s => s.slug === slug);
  if (!streak) return notFound();
  return streak;
}

export default async function EditStreakPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const streak = await getStreak(slug);
  
  return <StreakEditClient streakId={streak.id} slug={slug} />;
} 