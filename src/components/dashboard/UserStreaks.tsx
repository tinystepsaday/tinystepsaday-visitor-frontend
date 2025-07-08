"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users } from "lucide-react";
import { streaks } from "@/data/streaks";
import Link from "next/link";
import DashboardPageHeader from "./DashboardPageHeader";
import { differenceInDays } from "date-fns";

export function UserStreaks() {
  // Get first 2 streaks as enrolled streaks for the user
  const enrolledStreaks = streaks.slice(0, 2);

  const getProgressPercentage = (streak: typeof streaks[0]) => {
    const daysElapsed = differenceInDays(new Date(), new Date(streak.startDate));
    return Math.min(Math.round((daysElapsed / streak.durationGoal) * 100), 100);
  };

  const getStatusBadge = (streak: typeof streaks[0]) => {
    const isActive = new Date(streak.endDate) > new Date();
    return (
      <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? "Active" : "Ended"}
      </Badge>
    );
  };

  return (
    <div>
      <DashboardPageHeader 
        title="My Active Streaks" 
        subtitle="Track your progress on ongoing streak challenges" 
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        {enrolledStreaks.map((streak) => {
          const progress = getProgressPercentage(streak);
          const currentStreak = Math.floor(Math.random() * 30) + 1; // Mock data
          
          return (
            <Card key={streak.slug}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{streak.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{streak.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{streak.category}</p>
                    </div>
                  </div>
                  {getStatusBadge(streak)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {streak.description.substring(0, 100)}...
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">Current Streak</div>
                      <div className="font-medium">{currentStreak} days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-muted-foreground">Participants</div>
                      <div className="font-medium">{streak.enrolledCount}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/streaks/${streak.slug}/checkin`}>
                      Check In
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/streaks/${streak.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/dashboard/streaks">View All My Streaks</Link>
        </Button>
      </div>
    </div>
  );
}
