"use client"

import { SectionHeader } from "@/components/ui/section-header";
import StreakCard from "@/components/streaks/StreakCard";

interface StreakItem {
  title: string;
  description: string;
  icon: string;
  enrolled: boolean;
  currentStreak: number;
  startDate: Date;
  lastCheckIn: Date | null;
  enrolledCount: number;
}

interface PopularStreaksProps {
  streaks: StreakItem[];
  onEnroll: (index: number) => void;
  onCheckIn: (index: number) => void;
}

const PopularStreaks = ({ streaks, onEnroll, onCheckIn }: PopularStreaksProps) => {
  // Get top 3 streaks with highest enrollment
  const popularStreaks = [...streaks]
    .sort((a, b) => b.enrolledCount - a.enrolledCount)
    .slice(0, 3);
  
  return (
    <div className="mb-12">
      <SectionHeader 
        title="Popular Streaks" 
        subtitle="Join these trending challenges that are helping others transform"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {popularStreaks.map((streak) => {
          const originalIndex = streaks.findIndex(s => s.title === streak.title);
          return (
            <StreakCard
              key={streak.title}
              title={streak.title}
              description={streak.description}
              icon={streak.icon}
              enrolled={streak.enrolled}
              currentStreak={streak.currentStreak}
              enrolledCount={streak.enrolledCount}
              onEnroll={() => onEnroll(originalIndex)}
              onCheckIn={() => onCheckIn(originalIndex)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularStreaks;
