"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Users, 
  Target, 
  TrendingUp,
  Activity,
  CheckCircle
} from "lucide-react";
import { streaks } from "@/data/streaks";
import Link from "next/link";
import { format, parseISO, differenceInDays } from "date-fns";
import { ChevronLeft } from "lucide-react";

interface StreakAnalyticsManagementClientProps {
  streakId: string;
}

export default function StreakAnalyticsManagementClient({ streakId }: StreakAnalyticsManagementClientProps) {
  const streak = streaks.find(s => s.id === streakId);

  if (!streak) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Streak Not Found</h2>
          <p className="text-muted-foreground">The streak you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild className="mt-4">
            <Link href="/management/streaks">Back to Streaks</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isActive = new Date(streak.endDate) > new Date();
  const daysRemaining = differenceInDays(new Date(streak.endDate), new Date());
  const daysElapsed = differenceInDays(new Date(), new Date(streak.startDate));

  // Mock analytics data
  const analytics = {
    totalParticipants: streak.enrolledCount,
    activeParticipants: Math.floor(streak.enrolledCount * 0.75),
    inactiveParticipants: Math.floor(streak.enrolledCount * 0.25),
    averageStreak: 12,
    longestStreak: 45,
    completionRate: 68,
    dailyCheckIns: 23,
    peakActivityDay: "Monday",
    retentionRate: 85,
    recentActivity: [
      { type: "join", user: "Sarah Wilson", time: "2h ago", action: "joined the streak" },
      { type: "milestone", user: "John Doe", time: "1d ago", action: "completed 30 days" },
      { type: "break", user: "Bob Johnson", time: "3d ago", action: "missed a day" },
      { type: "join", user: "Alice Smith", time: "5d ago", action: "joined the streak" },
    ],
    weeklyStats: [
      { week: "Week 1", participants: 45, checkIns: 156, avgStreak: 5 },
      { week: "Week 2", participants: 67, checkIns: 234, avgStreak: 8 },
      { week: "Week 3", participants: 89, checkIns: 312, avgStreak: 12 },
      { week: "Week 4", participants: 112, checkIns: 445, avgStreak: 15 },
    ],
    topPerformers: [
      { name: "John Doe", currentStreak: 45, totalCheckIns: 67, joinedDate: "2025-01-01" },
      { name: "Jane Smith", currentStreak: 38, totalCheckIns: 58, joinedDate: "2025-01-05" },
      { name: "Mike Johnson", currentStreak: 32, totalCheckIns: 52, joinedDate: "2025-01-10" },
      { name: "Sarah Wilson", currentStreak: 28, totalCheckIns: 45, joinedDate: "2025-01-15" },
    ]
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      join: "default",
      milestone: "secondary",
      break: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/management/streaks" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Streaks Management
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{streak.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{streak.title}</h1>
              <p className="text-muted-foreground">Analytics Dashboard</p>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Ended"}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalParticipants.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.activeParticipants} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {analytics.activeParticipants} of {analytics.totalParticipants}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Daily Check-ins</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.dailyCheckIns}</div>
              <p className="text-xs text-muted-foreground">
                Peak: {analytics.peakActivityDay}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.retentionRate}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Streak Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Streak</span>
                      <span className="font-medium">{analytics.averageStreak} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Longest Streak</span>
                      <span className="font-medium">{analytics.longestStreak} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Progress</span>
                      <span className="font-medium">
                        {Math.round((daysElapsed / streak.durationGoal) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Days Remaining</span>
                      <span className="font-medium">
                        {isActive ? daysRemaining : 0} days
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.weeklyStats.map((week) => (
                      <div key={week.week} className="flex items-center justify-between">
                        <span className="text-sm">{week.week}</span>
                        <div className="text-right">
                          <div className="font-medium">{week.participants} participants</div>
                          <div className="text-xs text-muted-foreground">
                            {week.checkIns} check-ins
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Streak</TableHead>
                      <TableHead>Total Check-ins</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.topPerformers.map((performer, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{performer.name}</TableCell>
                        <TableCell>{performer.currentStreak} days</TableCell>
                        <TableCell>{performer.totalCheckIns}</TableCell>
                        <TableCell>{format(parseISO(performer.joinedDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>
                          <Badge variant="default">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Streak Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">0-7 days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">8-21 days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">22+ days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Check-in Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Most Active Day</span>
                      <span className="font-medium">{analytics.peakActivityDay}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Least Active Day</span>
                      <span className="font-medium">Sunday</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Peak Hour</span>
                      <span className="font-medium">7:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg Session Duration</span>
                      <span className="font-medium">15 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'join' ? 'bg-green-500' :
                        activity.type === 'milestone' ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        {getStatusBadge(activity.type)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 