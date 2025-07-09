"use client";


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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Pause, 
  Users, 
  Calendar, 
  Target, 
  BarChart3,
  Star,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";
import { streaks } from "@/data/streaks";
import Link from "next/link";
import { format, parseISO, differenceInDays } from "date-fns";
import { ChevronLeft } from "lucide-react";

interface StreakDetailsManagementClientProps {
  streakId: string;
}

export default function StreakDetailsManagementClient({ streakId }: StreakDetailsManagementClientProps) {
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

  // Mock participant data
  const participants = [
    { id: "1", name: "John Doe", email: "john@example.com", joinedDate: "2024-01-15", status: "active", currentStreak: 7, totalCheckIns: 25 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", joinedDate: "2024-01-10", status: "active", currentStreak: 12, totalCheckIns: 35 },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", joinedDate: "2024-01-20", status: "inactive", currentStreak: 0, totalCheckIns: 5 },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      suspended: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
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
              <p className="text-muted-foreground">Created by {streak.creatorName}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/management/streaks/${streakId}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Streak
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/management/streaks/${streakId}/analytics`}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pause className="mr-2 h-4 w-4" />
                Suspend Streak
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Streak
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streak.enrolledCount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {participants.filter(p => p.status === 'active').length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streak.rating}</div>
              <p className="text-xs text-muted-foreground">
                {streak.reviewCount} reviews
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isActive ? daysRemaining : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {isActive ? 'days remaining' : 'ended'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((daysElapsed / streak.durationGoal) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {daysElapsed} of {streak.durationGoal} days
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Streak Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{streak.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm">Category</h4>
                      <p className="text-sm text-muted-foreground">{streak.category}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Difficulty</h4>
                      <div className="mt-1">{getDifficultyBadge(streak.difficulty)}</div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Duration</h4>
                      <p className="text-sm text-muted-foreground">{streak.durationGoal} days</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Frequency</h4>
                      <p className="text-sm text-muted-foreground">{streak.checkInFrequency.replace('-', ' ')}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Goals</h4>
                    <div className="space-y-2">
                      {streak.goals.map((goal) => (
                        <div key={goal.id} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{goal.title}</span>
                          {goal.targetHours && (
                            <Badge variant="outline">{goal.targetHours}h</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {streak.guidelines && streak.guidelines.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Guidelines</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {streak.guidelines.map((guideline, index) => (
                          <li key={index}>{guideline}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline & Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Start Date</span>
                      <span className="text-sm text-muted-foreground">
                        {format(parseISO(streak.startDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">End Date</span>
                      <span className="text-sm text-muted-foreground">
                        {format(parseISO(streak.endDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Created</span>
                      <span className="text-sm text-muted-foreground">
                        {format(parseISO(streak.startDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Public</span>
                      <Badge variant={streak.isPublic ? "default" : "secondary"}>
                        {streak.isPublic ? "Yes" : "No"}
                      </Badge>
                    </div>
                    {streak.isPublic && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Requires Approval</span>
                        <Badge variant={streak.requiresApproval ? "default" : "secondary"}>
                          {streak.requiresApproval ? "Yes" : "No"}
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? "Active" : "Ended"}
                      </Badge>
                    </div>
                  </div>

                  {streak.tags && streak.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {streak.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Current Streak</TableHead>
                      <TableHead>Total Check-ins</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{format(parseISO(participant.joinedDate), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{getStatusBadge(participant.status)}</TableCell>
                        <TableCell>{participant.currentStreak} days</TableCell>
                        <TableCell>{participant.totalCheckIns}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pause className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Participation Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Participants</span>
                      <span className="font-medium">{participants.filter(p => p.status === 'active').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Inactive Participants</span>
                      <span className="font-medium">{participants.filter(p => p.status === 'inactive').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Streak</span>
                      <span className="font-medium">
                        {Math.round(participants.reduce((sum, p) => sum + p.currentStreak, 0) / participants.length)} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Check-ins</span>
                      <span className="font-medium">
                        {participants.reduce((sum, p) => sum + p.totalCheckIns, 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg Daily Check-ins</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Peak Activity Day</span>
                      <span className="font-medium">Monday</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Retention Rate</span>
                      <span className="font-medium">85%</span>
                    </div>
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
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New participant joined</p>
                      <p className="text-xs text-muted-foreground">Sarah Wilson joined the streak</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Milestone reached</p>
                      <p className="text-xs text-muted-foreground">John Doe completed 30 days</p>
                    </div>
                    <span className="text-xs text-muted-foreground">1d ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Streak broken</p>
                      <p className="text-xs text-muted-foreground">Bob Johnson missed a day</p>
                    </div>
                    <span className="text-xs text-muted-foreground">3d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{streak.rating}</div>
                      <div className="flex items-center gap-1 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= streak.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{streak.reviewCount} reviews</p>
                    </div>
                  </div>

                  {/* Mock reviews */}
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <span className="font-medium">Alice Johnson</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        &quot;This streak has completely transformed my daily routine. The community support is amazing and the progress tracking keeps me motivated.&quot;
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <span className="font-medium">Mike Chen</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        &quot;Great concept and well-structured. The daily reminders help me stay on track. Would recommend to anyone looking to build better habits.&quot;
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 