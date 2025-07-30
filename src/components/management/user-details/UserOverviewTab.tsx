"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, BookOpen, Zap, DollarSign, BarChart3 } from "lucide-react";
import { Activity as ActivityType, Payment, Subscription } from "./types";

export function UserOverviewTab() {
  // Dummy data for missing fields (to be replaced with real API calls later)
  const activities: ActivityType[] = [
    { id: "1", description: "Completed course: Introduction to Programming", type: "course_completion", timestamp: new Date() },
    { id: "2", description: "Started streak: Daily Coding Challenge", type: "streak_started", timestamp: new Date() },
    { id: "3", description: "Took quiz: JavaScript Basics", type: "quiz_taken", timestamp: new Date() },
  ];

  const courseEnrollments = [
    { id: "1", courseName: "Introduction to Programming", progress: 85, completedAt: null, enrolledAt: new Date(), totalTimeSpent: 120 },
    { id: "2", courseName: "Advanced JavaScript", progress: 100, completedAt: new Date(), enrolledAt: new Date(), totalTimeSpent: 180 },
  ];

  const streakEnrollments = [
    { id: "1", streakName: "Daily Coding Challenge", isActive: true, currentStreak: 15, longestStreak: 30, totalCheckIns: 45, enrolledAt: new Date() },
  ];

  const payments: Payment[] = [
    { id: "1", description: "Premium Subscription", amount: 29.99, status: "completed", paymentMethod: "Credit Card", createdAt: new Date(), transactionId: "TXN123" },
  ];

  const subscriptions: Subscription[] = [
    { id: "1", tier: "Premium", monthlyAmount: 29.99, status: "active", startDate: new Date(), endDate: null, autoRenew: true },
  ];

  const quizResults = [
    { id: "1", quizName: "JavaScript Basics", percentage: 85, score: 17, maxScore: 20, level: "intermediate", timeSpent: 25, completedAt: new Date(), certificateEarned: true },
  ];

  const getTotalSpent = () => {
    return payments.reduce((total, payment) => total + payment.amount, 0);
  };

  const getActiveSubscriptions = () => {
    return subscriptions.filter(sub => sub.status === "active");
  };

  const getCompletedCourses = () => {
    return courseEnrollments.filter(course => course.completedAt);
  };

  const getActiveStreaks = () => {
    return streakEnrollments.filter(streak => streak.isActive);
  };

  const formatActivityType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseEnrollments.length}</div>
            <p className="text-xs text-muted-foreground">
              {getCompletedCourses().length} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streaks</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveStreaks().length}</div>
            <p className="text-xs text-muted-foreground">Current challenges</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalSpent().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Results</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizResults.length}</div>
            <p className="text-xs text-muted-foreground">Assessments taken</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {formatActivityType(activity.type)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
            <CardDescription>Current subscription status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getActiveSubscriptions().map((subscription) => (
                <div key={subscription.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{subscription.tier} Plan</p>
                    <p className="text-xs text-muted-foreground">
                      ${subscription.monthlyAmount}/month
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {subscription.status}
                  </Badge>
                </div>
              ))}
              {getActiveSubscriptions().length === 0 && (
                <p className="text-sm text-muted-foreground">No active subscriptions</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 