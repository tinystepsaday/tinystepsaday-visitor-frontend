/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StreakProgress from "@/components/streaks/StreakProgress";
import StreakStats from "@/components/streaks/StreakStats";
import StreakTimer from "@/components/streaks/StreakTimer";
import StreakMilestones from "@/components/streaks/StreakMilestones";
import StreakCheckInForm from "@/components/streaks/StreakCheckInForm";
import StreakCalendarView from "@/components/streaks/StreakCalendarView";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Streak } from "@/data/streaks";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface StreakDetailsClientProps {
  streak: Streak;
}

export default function StreakDetailsClient({ streak }: StreakDetailsClientProps) {
  const [checkedDays, setCheckedDays] = useState<Date[]>([
    parseISO(streak.startDate),
    parseISO(streak.lastCheckIn),
  ]);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const handleCheckIn = (data: any) => {
    // toast({
    //   title: "Streak Updated!",
    //   description: "Great job maintaining your streak. Keep it going!",
    // });
    console.log("Check-in data:", data);
    setCheckedDays(prev => [...prev, new Date()]);
  };

  return (
    <div className="container pb-8 mt-20 md:mt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/streaks" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Streaks
        </Link>
        <div className="flex items-center gap-4 mb-8 ">
          <span className="text-4xl">{streak.icon}</span>
          <div>
            <h1 className="text-3xl font-bold mb-2">{streak.title}</h1>
            <p className="text-muted-foreground">{streak.description}</p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Streak Information and Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Streak Information</CardTitle>
              <CardDescription>
                Here&apos;s everything you need to know about this streak challenge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Start Date</span>
                  <span className="font-medium">{format(parseISO(streak.startDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">End Date</span>
                  <span className="font-medium">{format(parseISO(streak.endDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Check-in Frequency</span>
                  <span className="font-medium">{streak.frequency}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Guidelines:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {streak.guidelines.map((guideline, index) => (
                    <li key={index} className="text-muted-foreground">{guideline}</li>
                  ))}
                </ul>
              </div>

              <StreakTimer />
            </CardContent>
          </Card>

          <StreakStats
            enrolledCount={streak.enrolledCount}
            rating={streak.rating}
            reviewCount={streak.reviewCount}
          />

          <Card>
            <CardHeader>
              <CardTitle>Community Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {streak.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.user}</span>
                      <span className="text-muted-foreground text-sm">
                        {format(parseISO(review.date), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="progress" className="mt-10">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="check-in">Check In</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <StreakProgress 
              currentStreak={streak.currentStreak}
              longestStreak={streak.longestStreak}
              startDate={parseISO(streak.startDate)}
              lastCheckIn={parseISO(streak.lastCheckIn)}
            />

            <StreakMilestones 
              milestones={streak.milestones}
              currentStreak={streak.currentStreak}
            />
          </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="check-in">
            <StreakCheckInForm onSubmit={handleCheckIn} />
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <StreakCalendarView 
              checkedDays={checkedDays}
              selectedSubmission={selectedSubmission}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 