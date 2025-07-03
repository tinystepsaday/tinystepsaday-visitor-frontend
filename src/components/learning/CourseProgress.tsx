"use client"

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  Award, 
  TrendingUp,
  Target
} from "lucide-react";
import { Course } from "@/data/courses";

interface CourseProgressProps {
  course: Course;
  completedLessons: string[];
  activeModule: number;
  activeLesson: number;
}

const CourseProgress = ({ 
  course, 
  completedLessons, 
  activeModule, 
  activeLesson 
}: CourseProgressProps) => {
  const totalLessons = course.curriculum.reduce((total, module) => total + module.lessons.length, 0);
  const progress = (completedLessons.length / totalLessons) * 100;
  
  // Calculate module progress
  const moduleProgress = course.curriculum.map((module, moduleIndex) => {
    const moduleLessons = module.lessons.length;
    const completedModuleLessons = module.lessons.filter((_, lessonIndex) => 
      completedLessons.includes(`${moduleIndex}-${lessonIndex}`)
    ).length;
    return {
      title: module.title,
      progress: (completedModuleLessons / moduleLessons) * 100,
      completed: completedModuleLessons,
      total: moduleLessons
    };
  });

  // Estimate time remaining
  const averageLessonTime = 15; // minutes
  const remainingLessons = totalLessons - completedLessons.length;
  const estimatedTimeRemaining = remainingLessons * averageLessonTime;
  const hoursRemaining = Math.floor(estimatedTimeRemaining / 60);
  const minutesRemaining = estimatedTimeRemaining % 60;

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedLessons.length} of {totalLessons} lessons
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{Math.round(progress)}% Complete</span>
            <span className="text-muted-foreground">
              {remainingLessons} lessons remaining
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Module Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Module Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {moduleProgress.map((module, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {index + 1}. {module.title}
                  </span>
                  {module.progress === 100 && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {index === activeModule && module.progress < 100 && (
                    <Badge variant="secondary" className="text-xs">Current</Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {module.completed}/{module.total}
                </span>
              </div>
              <Progress value={module.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Time Estimates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Estimates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Time Remaining</span>
            <span className="text-sm font-medium">
              {hoursRemaining > 0 && `${hoursRemaining}h `}
              {minutesRemaining}m
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Current Lesson</span>
            <span className="text-sm font-medium">
              {course.curriculum[activeModule].lessons[activeLesson].duration}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Course Duration</span>
            <span className="text-sm font-medium">{course.duration}</span>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      {course.certification && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Course Completion</p>
                <p className="text-xs text-muted-foreground">
                  {progress >= 100 ? "Achieved!" : `${Math.round(progress)}% complete`}
                </p>
              </div>
            </div>
            {progress >= 100 && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Certificate Unlocked</p>
                  <p className="text-xs text-muted-foreground">
                    Download your certificate of completion
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseProgress; 