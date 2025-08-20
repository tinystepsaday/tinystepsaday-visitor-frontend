import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const QuizResultsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 w-full mb-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-80 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      {/* Score Summary */}
      <div className="space-y-6 text-center bg-muted p-6 border border-primary/20 rounded-lg">
        {/* Classification Skeleton */}
        <Skeleton className="h-12 w-64 mx-auto rounded-lg" />
        
        {/* Time and Date Skeleton */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
          <div className="flex items-center gap-2 justify-center">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-20 h-4" />
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="w-48 h-6" />
        </div>
        
        <div className="space-y-4">
          {/* Feedback Text Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>

          {/* Recommendations Skeleton */}
          <div className="space-y-2">
            <Skeleton className="w-40 h-6" />
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Skeleton className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="flex items-start gap-2">
                <Skeleton className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="w-48 h-6" />
        </div>
        
        <div className="space-y-6">
          {/* Courses Section Skeleton */}
          <div className="space-y-3">
            <Skeleton className="w-24 h-6 text-primary" />
            <div className="grid gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <Skeleton className="w-48 h-5" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Products Section Skeleton */}
          <div className="space-y-3">
            <Skeleton className="w-28 h-6 text-primary" />
            <div className="grid gap-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <Skeleton className="w-40 h-5" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Streaks Section Skeleton */}
          <div className="space-y-3">
            <Skeleton className="w-20 h-6 text-primary" />
            <div className="grid gap-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <Skeleton className="w-36 h-5" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Blog Posts Section Skeleton */}
          <div className="space-y-3">
            <Skeleton className="w-28 h-6 text-primary" />
            <div className="grid gap-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <Skeleton className="w-52 h-5" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Skeleton className="w-40 h-12 rounded-md" />
        <Skeleton className="w-44 h-12 rounded-md" />
      </div>
    </div>
  );
};

export default QuizResultsSkeleton;
