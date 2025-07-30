  "use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Bookmark, Heart } from "lucide-react";
import { Activity as ActivityType, ReadingListItem } from "./types";

export function UserActivityTab() {
  // Dummy data for missing fields (to be replaced with real API calls later)
  const activities: ActivityType[] = [
    { id: "1", description: "Completed course: Introduction to Programming", type: "course_completion", timestamp: new Date() },
    { id: "2", description: "Started streak: Daily Coding Challenge", type: "streak_started", timestamp: new Date() },
    { id: "3", description: "Took quiz: JavaScript Basics", type: "quiz_taken", timestamp: new Date() },
  ];

  const readingList: ReadingListItem[] = [
    { id: "1", articleTitle: "10 Tips for Better Code", category: "Programming", isBookmarked: true, readAt: new Date() },
  ];

  const formatActivityType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>User&apos;s recent actions and system interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
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
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-8 w-8 mx-auto mb-2" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reading List</CardTitle>
          <CardDescription>Articles and content bookmarked by the user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {readingList.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{item.articleTitle}</h4>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.isBookmarked && <Heart className="h-4 w-4 text-red-500" />}
                  <Badge variant="outline" className="text-xs">
                    {item.readAt ? "Read" : "Unread"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 