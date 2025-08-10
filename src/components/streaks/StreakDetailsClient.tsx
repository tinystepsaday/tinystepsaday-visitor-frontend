
"use client";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Streak, UserStreakProgress } from "@/data/streaks";
import Link from "next/link";
import { ChevronLeft, Lock, Users, Clock, Target, Shield, CheckCircle, Star, MessageSquare, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import StreakReviewForm from "./StreakReviewForm";

interface StreakDetailsClientProps {
  streak: Streak;
  userProgress?: UserStreakProgress | null;
}

export default function StreakDetailsClient({ streak, userProgress }: StreakDetailsClientProps) {
  const { isLoggedIn, user } = useAuthStore();
  
  // Utility function to safely get current pathname
  const getCurrentPathname = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/streaks';
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(streak.reviews);
  const [showJoinNotification, setShowJoinNotification] = useState(false);

  const handleEnroll = () => {
    if (!isLoggedIn) {
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login?redirect=' + encodeURIComponent(getCurrentPathname());
      }
      return;
    }
    
    if (streak.requiresApproval) {
      // Show approval notification
      setShowJoinNotification(true);
      // In a real app, this would send a join request
      console.log("Join request sent for streak:", streak.id);
    } else {
      // Immediately enroll the user
      console.log("Enrolling user in streak:", streak.id);
      // In a real app, this would enroll the user and redirect
      if (typeof window !== 'undefined') {
        window.location.href = `/streaks/${streak.slug}/checkin`;
      }
    }
  };

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    const newReview = {
      id: Date.now(),
      user: user?.username || "Anonymous",
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
    };
    
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    
    // In a real app, this would save to the backend
    console.log("Review submitted:", newReview);
  };

  return (
    <div className="container pb-8 mt-20 md:mt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/streaks" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Streaks
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{streak.icon}</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">{streak.title}</h1>
              <p className="text-muted-foreground">{streak.description}</p>
            </div>
          </div>
          {isLoggedIn && user?.id === streak.creatorId && (
            <Button asChild variant="outline">
              <Link href={`/streaks/${streak.slug}/edit`}>
                Edit Streak
              </Link>
            </Button>
          )}
        </div>

        {/* Join Request Notification */}
        {showJoinNotification && (
          <Alert className="mb-6">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Your request to join this streak has been sent to the creator. You will be notified once approved.
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-primary"
                onClick={() => setShowJoinNotification(false)}
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8">
          {/* Streak Information and Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Streak Information</CardTitle>
              <CardDescription>
                Here&apos;s everything you need to know about this streak challenge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <div className="font-medium">{streak.durationGoal} days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Frequency</span>
                    <div className="font-medium capitalize">{streak.checkInFrequency.replace('-', ' ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Participants</span>
                    <div className="font-medium">{streak.enrolledCount}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 text-muted-foreground">⭐</div>
                  <div>
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="font-medium">{streak.rating}/5</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Goals:</h3>
                  <div className="space-y-3">
                    {streak.goals.map((goal) => (
                      <div key={goal.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium">{goal.title}</div>
                          <div className="text-sm text-muted-foreground">{goal.description}</div>
                          {goal.targetHours && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Target: {goal.targetHours} hours
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Guidelines:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {streak.guidelines.map((guideline, index) => (
                      <li key={index} className="text-muted-foreground">{guideline}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Privacy and Terms */}
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Privacy Notice:</strong> {streak.privacyPolicy}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Enrollment Section */}
          {!userProgress ? (
            <Card>
              <CardHeader>
                <CardTitle>Join This Streak</CardTitle>
                <CardDescription>
                  Ready to start your journey? Join this streak and begin tracking your progress.
                  {streak.requiresApproval && (
                    <div className="mt-2 text-sm text-amber-600">
                      ⚠️ This streak requires creator approval to join.
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>You must be logged in to join this streak</span>
                  </div>
                  <Button onClick={handleEnroll} size="lg" className="w-full">
                    {isLoggedIn ? (streak.requiresApproval ? 'Request to Join' : 'Join Streak') : 'Login to Join'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                              <CardTitle>You&apos;re Enrolled!</CardTitle>
              <CardDescription>
                You&apos;re already part of this streak. Keep up the great work!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                    <div className="text-2xl font-bold text-primary">{userProgress.currentStreak} days</div>
                  </div>
                  <Button asChild>
                    <Link href={`/streaks/${streak.slug}/checkin`}>
                      Check In Today
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Community Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Community Reviews ({reviews.length})
                </div>
                {isLoggedIn && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? "Cancel" : "Write Review"}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showReviewForm && (
                <div className="mb-6">
                  <StreakReviewForm
                    streakId={streak.id}
                    onSubmit={handleReviewSubmit}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              )}
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.user}</span>
                      <span className="text-muted-foreground text-sm">
                        {format(parseISO(review.date), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        {review.rating}/5
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Only show tabs if user is enrolled */}
        {userProgress && (
          <Tabs defaultValue="progress" className="mt-10">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="check-in">Check In</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userProgress.currentStreak}</div>
                      <div className="text-sm text-muted-foreground">Current Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{userProgress.longestStreak}</div>
                      <div className="text-sm text-muted-foreground">Longest Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{userProgress.totalCheckIns}</div>
                      <div className="text-sm text-muted-foreground">Total Check-ins</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {streak.milestones.map((milestone) => (
                      <div key={milestone.days} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{milestone.name}</div>
                          <div className="text-sm text-muted-foreground">{milestone.days} days</div>
                        </div>
                        <Badge variant={milestone.achieved ? "default" : "secondary"}>
                          {milestone.achieved ? "Achieved" : "In Progress"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Check-in Tab */}
            <TabsContent value="check-in">
              <Card>
                <CardHeader>
                  <CardTitle>Check In</CardTitle>
                  <CardDescription>
                    Ready to check in? Head to the check-in page to log your activities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href={`/streaks/${streak.slug}/checkin`}>
                      Go to Check-in Page
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>
                    View your check-in history in calendar format.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href={`/streaks/${streak.slug}/checkin`}>
                      View Calendar
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
} 