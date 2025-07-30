"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { CourseEnrollment, StreakEnrollment, QuizResult } from "./types";


export function UserLearningTab() {
  // Dummy data for missing fields (to be replaced with real API calls later)
  const courseEnrollments: CourseEnrollment[] = [
    { id: "1", courseName: "Introduction to Programming", progress: 85, completedAt: null, enrolledAt: new Date(), totalTimeSpent: 120 },
    { id: "2", courseName: "Advanced JavaScript", progress: 100, completedAt: new Date(), enrolledAt: new Date(), totalTimeSpent: 180 },
  ];

  const streakEnrollments: StreakEnrollment[] = [
    { id: "1", streakName: "Daily Coding Challenge", isActive: true, currentStreak: 15, longestStreak: 30, totalCheckIns: 45, enrolledAt: new Date() },
  ];

  const quizResults: QuizResult[] = [
    { id: "1", quizName: "JavaScript Basics", percentage: 85, score: 17, maxScore: 20, level: "intermediate", timeSpent: 25, completedAt: new Date(), certificateEarned: true },
  ];

  const getCompletedCourses = () => {
    return courseEnrollments.filter(course => course.completedAt);
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
            <p className="text-xs text-muted-foreground">Total enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCompletedCourses().length}</div>
            <p className="text-xs text-muted-foreground">Certificates earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(courseEnrollments.reduce((total, course) => total + course.totalTimeSpent, 0) / 60)}
            </div>
            <p className="text-xs text-muted-foreground">Hours spent learning</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quizResults.length > 0
                ? Math.round(quizResults.reduce((total, quiz) => total + quiz.percentage, 0) / quizResults.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Average score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollments</CardTitle>
            <CardDescription>All enrolled courses and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{enrollment.courseName}</h4>
                    <Badge variant={enrollment.completedAt ? "default" : "secondary"}>
                      {enrollment.completedAt ? "Completed" : `${enrollment.progress}%`}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Enrolled: {enrollment.enrolledAt.toLocaleDateString()}</span>
                      <span>{enrollment.totalTimeSpent} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Streak Enrollments</CardTitle>
            <CardDescription>Active and completed streaks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {streakEnrollments.map((streak) => (
                <div key={streak.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{streak.streakName}</h4>
                    <Badge variant={streak.isActive ? "default" : "secondary"}>
                      {streak.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Streak</span>
                      <span>{streak.currentStreak} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Longest Streak</span>
                      <span>{streak.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Check-ins</span>
                      <span>{streak.totalCheckIns}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Enrolled: {streak.enrolledAt.toLocaleDateString()}
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
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>Assessment performance and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizResults.map((quiz) => (
              <div key={quiz.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{quiz.quizName}</h4>
                  <Badge variant={quiz.percentage >= 80 ? "default" : quiz.percentage >= 60 ? "secondary" : "destructive"}>
                    {quiz.percentage}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score</span>
                    <span>{quiz.score}/{quiz.maxScore}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Level</span>
                    <span className="capitalize">{quiz.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Spent</span>
                    <span>{quiz.timeSpent} min</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Completed: {quiz.completedAt.toLocaleDateString()}
                  </div>
                  {quiz.certificateEarned && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Award className="h-4 w-4" />
                      Certificate earned
                    </div>
                  )}
                </div>
              </div>
            ))}
            {quizResults.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No quiz results available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 