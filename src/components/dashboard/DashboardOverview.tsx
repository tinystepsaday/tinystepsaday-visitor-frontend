/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  Clock, 
  TrendingUp,
  Heart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const DashboardOverview = () => {
  // Mock data
  const stats = [
    {
      title: "Courses in Progress",
      value: 0,
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
      link: "/dashboard/courses"
    },
    {
      title: "Completed Courses",
      value: 0,
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20",
      link: "/dashboard/courses"
    },
    {
      title: "Upcoming Sessions",
      value: 0,
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-900/20",
      link: "/dashboard/sessions"
    },
    {
      title: "Saved Articles",
      value: 0,
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      color: "bg-rose-50 dark:bg-rose-900/20",
      link: "/dashboard/reading-list"
    }
  ];

  const coursesInProgress: any[] = [
    // {
    //   id: 1,
    //   title: "Mindful Living Essentials",
    //   image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    //   progress: 65,
    //   lastActivity: "2 days ago",
    //   totalLessons: 32,
    //   completedLessons: 21,
    //   nextLesson: "Understanding Emotional Reactions",
    //   slug: "mindful-living-essentials"
    // },
    // {
    //   id: 3,
    //   title: "Career Transition Blueprint",
    //   image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    //   progress: 30,
    //   lastActivity: "1 week ago",
    //   totalLessons: 16,
    //   completedLessons: 5,
    //   nextLesson: "Identifying Transferable Skills",
    //   slug: "career-transition-blueprint"
    // },
    // {
    //   id: 8,
    //   title: "Self-Confidence Builder",
    //   image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    //   progress: 10,
    //   lastActivity: "3 days ago",
    //   totalLessons: 10,
    //   completedLessons: 1,
    //   nextLesson: "Overcoming Imposter Syndrome",
    //   slug: "self-confidence-builder"
    // }
  ];

  const upcomingSessions: any[] = [
    // {
    //   id: 1,
    //   title: "Career Guidance Session",
    //   date: "April 25, 2025",
    //   time: "10:00 AM - 11:00 AM",
    //   mentor: "Lisa Rodriguez",
    //   type: "One-on-One",
    //   status: "Confirmed"
    // }
  ];

  const savedArticles: any[] = [
    // {
    //   id: 1,
    //   title: "Finding Inner Peace in a Chaotic World",
    //   date: "April 15, 2025",
    //   category: "Mindfulness",
    //   slug: "finding-inner-peace"
    // },
    // {
    //   id: 5,
    //   title: "Practical Anxiety Management in High-Pressure Situations",
    //   date: "March 20, 2025",
    //   category: "Mental Health",
    //   slug: "anxiety-management"
    // },
    // {
    //   id: 2,
    //   title: "5 Mindful Meditation Techniques for Beginners",
    //   date: "April 10, 2025",
    //   category: "Meditation",
    //   slug: "mindful-meditation-techniques"
    // }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your journey so far.
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, index) => (
          <Card key={index} className="animate-fade-in">
            <CardContent className="px-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                {stat.value > 0 && <Link href={stat.link} className="text-muted-foreground hover:text-primary">
                  <ArrowRight className="h-5 w-5" />
                </Link>}
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Courses In Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Courses In Progress</h2>
          {coursesInProgress.length > 0 && <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/courses">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesInProgress.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-40 w-full overflow-hidden">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  width={120}
                  height={80}
                  className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="px-6">
                <h3 className="font-semibold mb-4 line-clamp-1">
                  {course.title}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last activity: {course.lastActivity}</span>
                    </div>
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 border-t">
                <Button className="w-full" asChild>
                  <Link href={`/courses/${course.slug}`}>
                    Continue Learning
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Upcoming Sessions & Reading List (Side by Side) */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Sessions</CardTitle>
              {upcomingSessions.length > 0 && <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href="/dashboard/sessions">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>}
            </div>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-start p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{session.title}</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                          {session.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {session.date} • {session.time}
                      </div>
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">Mentor:</span> {session.mentor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">No upcoming sessions</p>
                <Button size="sm" asChild>
                  <Link href="/programs">Book a Session</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Reading List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Saved Articles</CardTitle>
              {savedArticles.length > 0 && <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href="/dashboard/reading-list">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedArticles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium line-clamp-1">{article.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.category}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recommended for You */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended For You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {/* <div className="rounded-lg bg-muted/50 p-4 flex items-start">
              <div className="bg-blue-50 p-2 rounded-full mr-3 dark:bg-blue-900/20">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Emotional Intelligence Mastery</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your interests in mindfulness and personal growth.
                </p>
                <Button size="sm" asChild>
                  <Link href="/courses/emotional-intelligence-mastery">
                    View Course
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg bg-muted/50 p-4 flex items-start">
              <div className="bg-purple-50 p-2 rounded-full mr-3 dark:bg-purple-900/20">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Group Meditation Circle</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Weekly virtual sessions to deepen your mindfulness practice.
                </p>
                <Button size="sm" asChild>
                  <Link href="/programs">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
