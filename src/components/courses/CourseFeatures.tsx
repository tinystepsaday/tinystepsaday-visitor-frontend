"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { BookOpen, Clock, Award, User, Smartphone, Download } from "lucide-react";

interface CourseFeaturesProps {
  course: any;
  totalDuration: string;
}

export function CourseFeatures({ course, totalDuration }: CourseFeaturesProps) {
  return (
    <div className="text-sm space-y-3">
      <p className="text-center text-muted-foreground mb-4">
        30-Day Money-Back Guarantee
      </p>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Total Lessons</span>
          </div>
          <span className="font-medium">{course.lessons}</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Total Duration</span>
          </div>
          <span className="font-medium">{totalDuration}</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Certification</span>
          </div>
          <span className="font-medium">{course.certification ? "Yes" : "No"}</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Level</span>
          </div>
          <span className="font-medium">{course.level}</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center">
            <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Access</span>
          </div>
          <span className="font-medium">Lifetime</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center">
            <Download className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Downloadable</span>
          </div>
          <span className="font-medium">Resources</span>
        </div>
      </div>
    </div>
  );
}
