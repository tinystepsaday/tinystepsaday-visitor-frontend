import React from 'react';

const QuizDetailsSkeleton = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-8 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col gap-4 w-full">
          <div className="flex items-start justify-between w-full gap-2">
            {/* Back Button Skeleton */}
            <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-2">
            {/* Title Skeleton */}
            <div className="h-12 md:h-16 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            {/* Subtitle Skeleton */}
            <div className="h-6 md:h-8 w-full max-w-3xl bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero Section with CTA */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 md:p-8">
        <div className="flex items-center flex-wrap gap-4 mb-6">
          {/* Category Badge Skeleton */}
          <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          {/* Time Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Questions Count Skeleton */}
            <div className="text-center space-y-2">
              <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            {/* Start Button Skeleton */}
            <div className="w-40 h-14 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quiz Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Description */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
            <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
            <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="w-96 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Stats */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
            <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
            <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-18 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-14 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900">
            <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              <div className="text-center">
                <div className="w-48 h-3 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsSkeleton;
