"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Target, 
  Plus,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { streaks } from "@/data/streaks";
import Link from "next/link";
import { differenceInDays } from "date-fns";
import DashboardPageHeader from "./DashboardPageHeader";
import { useAuthStore } from "@/store/authStore";

export default function DashboardStreaksClient() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("enrolled");

  // Mock user enrolled streaks - in real app this would come from user data
  const enrolledStreaks = streaks.slice(0, 3).map(streak => ({
    ...streak,
    userProgress: {
      currentStreak: Math.floor(Math.random() * 30) + 1,
      longestStreak: Math.floor(Math.random() * 50) + 10,
      totalCheckIns: Math.floor(Math.random() * 100) + 20,
      lastCheckIn: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      isEnrolled: true,
      enrollmentDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    }
  }));

  // Mock user created streaks
  const createdStreaks = streaks.slice(3, 5).map(streak => ({
    ...streak,
    creatorId: user?.id || "user-1",
    creatorName: user?.name || "You",
  }));

  const getStatusBadge = (streak: typeof streaks[0]) => {
    const isActive = new Date(streak.endDate) > new Date();
    return (
      <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? "Active" : "Ended"}
      </Badge>
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants = {
      beginner: "default",
      intermediate: "secondary", 
      advanced: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[difficulty as keyof typeof variants]}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </Badge>
    );
  };

  const getProgressPercentage = (streak: typeof streaks[0]) => {
    const daysElapsed = differenceInDays(new Date(), new Date(streak.startDate));
    return Math.min(Math.round((daysElapsed / streak.durationGoal) * 100), 100);
  };

  // const isCreator = (streak: typeof streaks[0]) => {
  //   return streak.creatorId === user?.id;
  // };

  return (
    <div className="space-y-6">
      <DashboardPageHeader 
        title="My Streaks" 
        subtitle="Track your progress and manage your streak challenges" 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enrolled">Enrolled ({enrolledStreaks.length})</TabsTrigger>
          <TabsTrigger value="created">Created ({createdStreaks.length})</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        {/* Enrolled Streaks Tab */}
        <TabsContent value="enrolled" className="space-y-6">
          {enrolledStreaks.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Enrolled Streaks</h3>
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t joined any streaks yet. Start your journey by exploring available challenges.
                </p>
                <Button asChild>
                  <Link href="/streaks">Browse Streaks</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {enrolledStreaks.map((streak) => {
                const progress = getProgressPercentage(streak);
                
                return (
                  <Card key={streak.slug} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{streak.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{streak.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{streak.category}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/streaks/${streak.slug}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/streaks/${streak.slug}/checkin`}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Check In
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {streak.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Current Streak</div>
                          <div className="font-medium">{streak.userProgress.currentStreak} days</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Total Check-ins</div>
                          <div className="font-medium">{streak.userProgress.totalCheckIns}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {getStatusBadge(streak)}
                        {getDifficultyBadge(streak.difficulty)}
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
          )}
        </TabsContent>

        {/* Created Streaks Tab */}
        <TabsContent value="created" className="space-y-6">
          {createdStreaks.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Created Streaks</h3>
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t created any streaks yet. Start inspiring others by creating your own challenge.
                </p>
                <Button asChild>
                  <Link href="/streaks/create">Create Streak</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {createdStreaks.map((streak) => {
                const progress = getProgressPercentage(streak);
                
                                return (
                  <Card key={streak.slug} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{streak.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{streak.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{streak.category}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/streaks/${streak.slug}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/streaks/${streak.slug}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Streak
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/management/streaks/${streak.id}/analytics`}>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Analytics
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {streak.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Overall Progress</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Participants</div>
                          <div className="font-medium">{streak.enrolledCount}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Rating</div>
                          <div className="font-medium">{streak.rating} ⭐</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {getStatusBadge(streak)}
                        {getDifficultyBadge(streak.difficulty)}
                      </div>

                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/streaks/${streak.slug}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href={`/streaks/${streak.slug}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="text-center">
            <Button asChild>
              <Link href="/streaks/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Streak
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* Available Streaks Tab */}
        <TabsContent value="available" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {streaks.slice(5, 8).map((streak) => (
                                <Card key={streak.slug}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{streak.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{streak.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{streak.category}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {streak.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Duration</div>
                      <div className="font-medium">{streak.durationGoal} days</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Participants</div>
                      <div className="font-medium">{streak.enrolledCount}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {getStatusBadge(streak)}
                    {getDifficultyBadge(streak.difficulty)}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/streaks/${streak.slug}`}>
                      Join Streak
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline">
              <Link href="/streaks">View All Available Streaks</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 