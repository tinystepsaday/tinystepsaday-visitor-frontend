"use client";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { Streak, UserStreakProgress, CheckInActivity } from "@/data/streaks";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface StreakCheckInClientProps {
  streak: Streak;
  userProgress: UserStreakProgress;
}

export default function StreakCheckInClient({ streak, userProgress }: StreakCheckInClientProps) {
  const [activities, setActivities] = useState<CheckInActivity[]>([]);
  const [reflection, setReflection] = useState("");
  const [activeTab, setActiveTab] = useState("checkin");

  const updateActivity = (id: string, field: keyof CheckInActivity, value: string | number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  const calculateHours = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log("Check-in submitted:", { activities, reflection });
    // Reset form
    setActivities([]);
    setReflection("");
  };

  const getProgressPercentage = () => {
    const totalDays = Math.ceil((new Date(streak.endDate).getTime() - new Date(streak.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((new Date().getTime() - new Date(streak.startDate).getTime()) / (1000 * 60 * 60 * 24));
    return Math.min((daysElapsed / totalDays) * 100, 100);
  };

  const getStreakStatus = (date: string) => {
    const checkIn = userProgress.checkIns.find(c => 
      format(parseISO(c.date), 'yyyy-MM-dd') === format(parseISO(date), 'yyyy-MM-dd')
    );
    if (checkIn) {
      return checkIn.completed ? 'completed' : 'partial';
    }
    return 'missed';
  };

  return (
    <div className="container pb-8 mt-20 md:mt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href={`/streaks/${streak.slug}`} className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Streak Details
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl">{streak.icon}</span>
          <div>
            <h1 className="text-3xl font-bold mb-2">{streak.title}</h1>
            <p className="text-muted-foreground">Track your progress and check in</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
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
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(getProgressPercentage())}%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="checkin">Check In</TabsTrigger>
            <TabsTrigger value="progress">Progress Review</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Check In Tab */}
          <TabsContent value="checkin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today&apos;s Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {streak.goals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">{goal.title}</Label>
                      {goal.isRequired && <Badge variant="destructive">Required</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`start-${goal.id}`}>Start Time</Label>
                        <Input
                          id={`start-${goal.id}`}
                          type="time"
                          onChange={(e) => {
                            const activity = activities.find(a => a.goalId === goal.id);
                            if (activity) {
                              updateActivity(activity.id, 'startTime', e.target.value);
                              if (activity.endTime) {
                                const hours = calculateHours(e.target.value, activity.endTime);
                                updateActivity(activity.id, 'hours', hours);
                              }
                            }
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`end-${goal.id}`}>End Time</Label>
                        <Input
                          id={`end-${goal.id}`}
                          type="time"
                          onChange={(e) => {
                            const activity = activities.find(a => a.goalId === goal.id);
                            if (activity) {
                              updateActivity(activity.id, 'endTime', e.target.value);
                              if (activity.startTime) {
                                const hours = calculateHours(activity.startTime, e.target.value);
                                updateActivity(activity.id, 'hours', hours);
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Label htmlFor={`notes-${goal.id}`}>Notes (optional)</Label>
                      <Textarea
                        id={`notes-${goal.id}`}
                        placeholder="How did it go? Any insights or challenges?"
                        onChange={(e) => {
                          const activity = activities.find(a => a.goalId === goal.id);
                          if (activity) {
                            updateActivity(activity.id, 'notes', e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="How did today's activities contribute to your streak goals? What did you learn? How do you feel?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSubmit} size="lg">
                Submit Check-in
              </Button>
            </div>
          </TabsContent>

          {/* Progress Review Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Progress Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userProgress.checkIns.map((checkIn) => (
                    <div key={checkIn.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">
                          {format(parseISO(checkIn.date), 'EEEE, MMMM d, yyyy')}
                        </h3>
                        <Badge variant={checkIn.completed ? "default" : "secondary"}>
                          {checkIn.completed ? "Completed" : "Partial"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {checkIn.activities.map((activity) => {
                          const goal = streak.goals.find(g => g.id === activity.goalId);
                          return (
                            <div key={activity.id} className="bg-muted p-3 rounded">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{goal?.title}</span>
                                <span className="text-sm text-muted-foreground">
                                  {activity.hours.toFixed(2)} hours
                                </span>
                              </div>
                              {activity.notes && (
                                <p className="text-sm text-muted-foreground mt-1">{activity.notes}</p>
                              )}
                            </div>
                          );
                        })}
                        
                        {checkIn.reflection && (
                          <div className="bg-blue-50 p-3 rounded">
                            <h4 className="font-medium text-blue-900 mb-1">Reflection</h4>
                            <p className="text-sm text-blue-800">{checkIn.reflection}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Streak Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="flex gap-1 min-w-max">
                    {/* Day labels */}
                    <div className="flex flex-col gap-1 mr-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="h-3 text-xs text-muted-foreground flex items-center justify-center">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar grid - 7 columns (days) x 53 rows (weeks) */}
                    {Array.from({ length: 53 }, (_, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }, (_, dayIndex) => {
                          // Calculate the date for this cell
                          // Start from Monday (day 1) instead of Sunday (day 0)
                          const today = new Date();
                          
                          // Calculate the Monday of the week that contains today
                          const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
                          const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Convert to Monday-based
                          
                          // Calculate the Monday of the first week we want to show (52 weeks ago)
                          const firstMonday = new Date(today);
                          firstMonday.setDate(today.getDate() + mondayOffset - (52 * 7));
                          
                          // Calculate the date for this specific cell
                          const cellDate = new Date(firstMonday);
                          cellDate.setDate(firstMonday.getDate() + (weekIndex * 7) + dayIndex);
                          
                          const status = getStreakStatus(cellDate.toISOString());
                          const isToday = cellDate.toDateString() === today.toDateString();
                          const isFuture = cellDate > today;
                          
                          return (
                            <div
                              key={dayIndex}
                              className={`w-3 h-3 rounded-sm border ${
                                isFuture ? 'bg-gray-100 border-gray-200' :
                                status === 'completed' ? 'bg-green-500 border-green-600' :
                                status === 'partial' ? 'bg-yellow-400 border-yellow-500' :
                                status === 'missed' ? 'bg-red-400 border-red-500' :
                                'bg-gray-200 border-gray-300'
                              } ${isToday ? 'ring-1 ring-blue-500' : ''}`}
                              title={`${cellDate.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })} - ${status === 'completed' ? 'Completed' : status === 'partial' ? 'Partial' : status === 'missed' ? 'Missed' : 'No activity'}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded-sm"></div>
                    <div className="w-3 h-3 bg-yellow-400 border border-yellow-500 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-500 border border-green-600 rounded-sm"></div>
                    <div className="w-3 h-3 bg-red-400 border border-red-500 rounded-sm"></div>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded-sm"></div>
                      <span className="text-xs">No activity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-400 border border-yellow-500 rounded-sm"></div>
                      <span className="text-xs">Partial</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 border border-green-600 rounded-sm"></div>
                      <span className="text-xs">Completed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-400 border border-red-500 rounded-sm"></div>
                      <span className="text-xs">Missed</span>
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