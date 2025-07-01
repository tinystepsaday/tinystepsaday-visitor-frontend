import StreakProgress from "@/components/streaks/StreakProgress";
import { SectionHeader } from "../ui/section-header";

interface StreakItem {
  title: string;
  currentStreak: number;
  startDate: Date;
  lastCheckIn: Date | undefined;
}

interface ActiveStreaksProps {
  streaks: StreakItem[];
}

const ActiveStreaks = ({ streaks }: ActiveStreaksProps) => {
  if (streaks.length === 0) return null;
  
  return (
    <div className="mb-12">
      <SectionHeader 
        title="Your Active Streaks" 
        subtitle="Track your progress on ongoing streak challenges"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {streaks.map((streak) => (
          <StreakProgress
            key={streak.title}
            currentStreak={streak.currentStreak}
            longestStreak={Math.max(streak.currentStreak, 7)}
            startDate={streak.startDate}
            lastCheckIn={streak.lastCheckIn}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveStreaks;
