"use client"

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

interface StreaksListProps {
  streaks: StreakItem[];
  onEnroll: (index: number) => void;
  onCheckIn: (index: number) => void;
}

const StreaksList = ({ streaks, onEnroll, onCheckIn }: StreaksListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {streaks.map((streak, index) => (
        <StreakCard
          key={streak.title}
          title={streak.title}
          description={streak.description}
          icon={streak.icon}
          enrolled={streak.enrolled}
          currentStreak={streak.currentStreak}
          enrolledCount={streak.enrolledCount}
          onEnroll={() => onEnroll(index)}
          onCheckIn={() => onCheckIn(index)}
        />
      ))}
    </div>
  );
};

export default StreaksList;
