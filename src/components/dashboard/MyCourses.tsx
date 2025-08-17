"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Star,
  Clock,
  Calendar,
  Search,
  Filter
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DashboardPageHeader from "./DashboardPageHeader";

const allCourses = [
  {
    id: 1,
    title: "Mindful Living Essentials",
    description: "Learn foundational mindfulness practices to reduce stress and increase presence in your daily life.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    progress: 65,
    status: "in-progress",
    lastActivity: "2 days ago",
    totalLessons: 32,
    completedLessons: 21,
    instructor: "Dr. Sarah Johnson",
    enrolledDate: "March 10, 2025",
    expiryDate: "Lifetime Access",
    certificate: true,
    slug: "mindful-living-essentials",
    category: "Mindfulness",
    enrolled: true
  },
  {
    id: 2,
    title: "Emotional Intelligence Mastery",
    description: "Develop your ability to understand, use, and manage your emotions positively to relieve stress, communicate effectively, and overcome challenges.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    progress: 100,
    status: "completed",
    lastActivity: "1 month ago",
    totalLessons: 12,
    completedLessons: 12,
    instructor: "Michael Chen",
    enrolledDate: "January 15, 2025",
    expiryDate: "Lifetime Access",
    certificate: true,
    slug: "emotional-intelligence-mastery",
    category: "Personal Growth",
    enrolled: true
  },
  {
    id: 3,
    title: "Career Transition Blueprint",
    description: "A comprehensive guide to navigating career changes with confidence, clarity, and purpose, regardless of your age or background.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    progress: 30,
    status: "in-progress",
    lastActivity: "1 week ago",
    totalLessons: 16,
    completedLessons: 5,
    instructor: "Lisa Rodriguez",
    enrolledDate: "February 28, 2025",
    expiryDate: "Lifetime Access",
    certificate: true,
    slug: "career-transition-blueprint",
    category: "Career",
    enrolled: true
  },
  {
    id: 4,
    title: "Relationship Healing & Growth",
    description: "Transform your relationships through improved communication, emotional awareness, and healthy boundary-setting practices.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    progress: 100,
    status: "completed",
    lastActivity: "2 months ago",
    totalLessons: 10,
    completedLessons: 10,
    instructor: "David Wilson",
    enrolledDate: "December 10, 2025",
    expiryDate: "Lifetime Access",
    certificate: true,
    slug: "relationship-healing",
    category: "Relationships",
    enrolled: true
  },
  {
    id: 8,
    title: "Self-Confidence Builder",
    description: "Build unshakable self-confidence through proven psychological techniques, reflective practices, and actionable challenges.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    progress: 10,
    status: "in-progress",
    lastActivity: "3 days ago",
    totalLessons: 10,
    completedLessons: 1,
    instructor: "James Parker",
    enrolledDate: "April 5, 2025",
    expiryDate: "Lifetime Access",
    certificate: true,
    slug: "self-confidence-builder",
    category: "Personal Growth",
    enrolled: true
  }
];

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState(allCourses);

  const filterCourses = (query: string, status: string) => {
    let filteredCourses = allCourses;

    if (status !== "all") {
      filteredCourses = filteredCourses.filter(course => course.status === status);
    }

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    setCourses(filteredCourses);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterCourses(query, activeTab);
  };

  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterCourses(searchQuery, value);
  };

  return (
    <div>
      <DashboardPageHeader title="My Courses" subtitle="Track your progress and continue your learning journey." />

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search courses..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 pl-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <CourseList courses={courses} />
        </TabsContent>

        <TabsContent value="in-progress" className="mt-0">
          <CourseList courses={courses} />
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <CourseList courses={courses} />
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-muted/30 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Expand Your Knowledge?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Discover new courses tailored to your personal and professional growth journey.
        </p>
        <Button size="lg" asChild>
          <Link href="/courses">Explore More Courses</Link>
        </Button>
      </div>
    </div>
  );
};

const CourseList = ({ courses }: { courses: typeof allCourses }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/30 rounded-xl">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or explore our course catalog.
        </p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden flex flex-col">
          <div className="relative h-40 overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              width={120}
              height={80}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {course.status === "completed" ? (
                <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
              ) : course.enrolled ? (
                <Badge variant="outline" className="bg-white text-primary dark:bg-background dark:text-primary">Enrolled</Badge>
              ) : null}
            </div>
          </div>

          <CardContent className="flex-grow p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold line-clamp-1">{course.title}</h3>
            </div>

            {course.status === "in-progress" && (
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </div>
              </div>
            )}

            <div className="text-sm space-y-2">
              <div className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span>
                  {course.status === "in-progress"
                    ? `Last activity: ${course.lastActivity}`
                    : `Completed on: ${course.lastActivity}`}
                </span>
              </div>

              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span>Enrolled: {course.enrolledDate}</span>
              </div>

              <div className="flex items-start">
                <Star className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span>Instructor: {course.instructor}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 border-t bg-muted/30">
            <Button className="w-full" asChild>
              <Link href={`/courses/${course.slug}`}>
                {course.status === "in-progress" ? "Continue Learning" : "Review Course"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyCourses;
