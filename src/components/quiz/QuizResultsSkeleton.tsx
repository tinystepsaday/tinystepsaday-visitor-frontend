import React from 'react';

const QuizResultsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 w-full mb-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="h-10 w-80 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
      </div>

      {/* Score Summary */}
      <div className="space-y-6 text-center bg-gray-100 dark:bg-gray-800 p-6 border border-primary/20 rounded-lg">
        {/* Classification Skeleton */}
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        
        {/* Time and Date Skeleton */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          {/* Feedback Text Skeleton */}
          <div className="space-y-3">
            <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Recommendations Skeleton */}
          <div className="space-y-2">
            <div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-6">
          {/* Courses Section Skeleton */}
          <div className="space-y-3">
            <div className="w-24 h-6 bg-primary rounded animate-pulse"></div>
            <div className="grid gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="w-48 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Section Skeleton */}
          <div className="space-y-3">
            <div className="w-28 h-6 bg-primary rounded animate-pulse"></div>
            <div className="grid gap-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="w-40 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Streaks Section Skeleton */}
          <div className="space-y-3">
            <div className="w-20 h-6 bg-primary rounded animate-pulse"></div>
            <div className="grid gap-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="w-36 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Blog Posts Section Skeleton */}
          <div className="space-y-3">
            <div className="w-28 h-6 bg-primary rounded animate-pulse"></div>
            <div className="grid gap-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="w-52 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="w-40 h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="w-44 h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default QuizResultsSkeleton;
