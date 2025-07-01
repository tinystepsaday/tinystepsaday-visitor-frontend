"use client"

import StreakCard from "@/components/streaks/StreakCard";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UserStreaks() {
  return (
    <div>
      <SectionHeader
        title="My Active Streaks"
        subtitle="Track your progress on ongoing streak challenges"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <StreakCard
          title="Meditation Streak"
          description="Daily mindfulness practice"
          icon="🧘"
          enrolled={true}
          currentStreak={7}
          enrolledCount={1250}
          onEnroll={() => {}}
          onCheckIn={() => {}}
        />
        <StreakCard
          title="Reading Streak"
          description="Build a daily reading habit"
          icon="📚"
          enrolled={true}
          currentStreak={3}
          enrolledCount={890}
          onEnroll={() => {}}
          onCheckIn={() => {}}
        />
      </div>
      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/streaks">View All Streaks</Link>
        </Button>
      </div>
    </div>
  );
}
